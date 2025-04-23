<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class FavoritesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

    /**
     * Get all favorites for the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $favorites = Favorite::where('user_id', Auth::id())
            ->with('place')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $favorites
        ]);
    }

    /**
     * Store a newly created favorite in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'place_id' => 'required|exists:places,id',
        ]);

        // Check if already favorited
        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('place_id', $request->place_id)
            ->first();

        if ($existingFavorite) {
            return response()->json([
                'status' => 'error',
                'message' => 'This place is already in your favorites'
            ], 422);
        }

        $favorite = Favorite::create([
            'user_id' => Auth::id(),
            'place_id' => $request->place_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Place added to favorites',
            'data' => $favorite->load('place')
        ], 201);
    }

    /**
     * Display the specified favorite.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id): JsonResponse
    {
        $favorite = Favorite::where('id', $id)
            ->where('user_id', Auth::id())
            ->with('place')
            ->first();

        if (!$favorite) {
            return response()->json([
                'status' => 'error',
                'message' => 'Favorite not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $favorite
        ]);
    }

    /**
     * Remove the specified favorite from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $favorite = Favorite::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$favorite) {
            return response()->json([
                'status' => 'error',
                'message' => 'Favorite not found'
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Favorite removed successfully'
        ]);
    }

    /**
     * Toggle favorite status for a place.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle(Request $request): JsonResponse
    {
        $request->validate([
            'place_id' => 'required|exists:places,id',
        ]);

        $favorite = Favorite::where('user_id', Auth::id())
            ->where('place_id', $request->place_id)
            ->first();

        if ($favorite) {
            // If favorite exists, remove it
            $favorite->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Place removed from favorites',
                'is_favorite' => false
            ]);
        } else {
            // If favorite doesn't exist, add it
            $favorite = Favorite::create([
                'user_id' => Auth::id(),
                'place_id' => $request->place_id
            ]);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Place added to favorites',
                'is_favorite' => true,
                'data' => $favorite
            ], 201);
        }
    }

    /**
     * Check if a place is favorited by the authenticated user.
     *
     * @param  int  $placeId
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkStatus($placeId): JsonResponse
    {
        $isFavorite = Favorite::where('user_id', Auth::id())
            ->where('place_id', $placeId)
            ->exists();

        return response()->json([
            'status' => 'success',
            'is_favorite' => $isFavorite
        ]);
    }
}
