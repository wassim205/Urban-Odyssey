<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username'  => 'required|string|unique:users',
            'firstname' => 'required|string',
            'lastname'  => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:6',
        ]);

        // Check if there are no users yet
        $role_id = (User::count() === 0) ? 1 : 2;

        $user = User::create([
            'username'  => $validated['username'],
            'firstname' => $validated['firstname'],
            'lastname'  => $validated['lastname'],
            'email'     => $validated['email'],
            'password'  => bcrypt($validated['password']),
            'role_id'   => $role_id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 201);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No authenticated user found.'
                ], 401);
            }

            // Revoke all tokens for the user
            $user->tokens()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully.'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong during logout.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function authUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'No authenticated user found.'
            ], 401);
        }

        $favorites = Favorite::where('user_id', $user->id)
            ->with('place')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'user'   => $user,
            'favorites' => $favorites->isEmpty() ? [] : $favorites
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'username' => 'required|string|unique:users,username,' . $user->id,
        ]);

        $user->update($validated);

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|min:6|confirmed',
        ]);

        if (!Hash::check($validated['currentPassword'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        $user->update(['password' => Hash::make($validated['newPassword'])]);

        return response()->json(['message' => 'Password changed successfully']);
    }

    public function updatePreferredCategories(Request $request)
    {
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $validated = $request->validate([
            'preferred_categories' => 'required|array',
        ]);

        $user->update(['preferred_categories' => json_encode($validated['preferred_categories'])]);
    
        return response()->json([
            'message' => 'Preferred categories updated successfully',
            'preferred_categories' => $validated['preferred_categories'], // Return as array
        ]);
    }

    public function deleteAccount()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
