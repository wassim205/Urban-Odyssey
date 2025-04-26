<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\NearbyFacility;
use App\Models\Place;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::where('role_id', 2)->count();
        $totalPlaces = Place::all()->count();
        $totalReviews = Review::all()->count();
        $totalAddedToFavorite = Favorite::all()->count();
        $popularPlaces = Place::withCount('favorites')
            ->orderBy('favorites_count', 'desc')
            ->take(5)
            ->get();

        $users = User::all();

        return response()->json([
            "total_users" => $totalUsers,
            "total_places" => $totalPlaces,
            "total_reviews" => $totalReviews,
            "total_favorites" => $totalAddedToFavorite,
            "popular_places" => $popularPlaces,
            "users" => $users
        ]);
    }

    public function destroyUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function storeUser(Request $request)
    {
        try {
            $validated = $request->validate([
                'username' => 'required|string|unique:users',
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'role_id' => 'required|integer|exists:roles,id',
            ]);

            $user = User::create([
                'username' => $validated['username'],
                'firstname' => $validated['firstname'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'role_id' => $validated['role_id'],
            ]);

            return response()->json(['user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $validated = $request->validate([
                'username' => 'required|string|unique:users,username,' . $id,
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $id,
                'role_id' => 'required|integer|exists:roles,id',
            ]);

            $user->update($validated);

            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
