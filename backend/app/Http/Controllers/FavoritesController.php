<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Place;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoritesController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $favorites = Favorite::where('user_id', Auth::id())
            ->with('place')
            ->orderBy('created_at', 'desc')
            ->get();
            if ($favorites->isEmpty()) {
                return response()->json([
                    'status' => 'empty',
                    'message' => 'No favorite places selected.'
                ]);
            }

            return response()->json([
                'status' => 'success',
                'data'   => $favorites
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Something went wrong while fetching favorites.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'city'    => 'nullable|string',
                'country' => 'nullable|string',
                'name'     => 'required|string',
                'lat'      => 'required|numeric',
                'lng'      => 'required|numeric',
            ]);

            $place = Place::firstOrCreate(
                ['external_id' => $request->external_id],
                [
                    'name'        => $request->name,
                    'city'        => $request->city,
                    'country'     => $request->country,
                    'latitude'    => $request->lat,
                    'longitude'   => $request->lng,
                    'image_url'   => $request->image_url,
                    'address'     => $request->address,
                    'category'    => $request->category,
                    'description' => $request->description,
                    'source'      => $request->source,
                ]
            );

            $existingFavorite = Favorite::where('user_id', Auth::id())
                ->where('place_id', $place->id)
                ->first();

            if ($existingFavorite) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'This place is already in your favorites.'
                ], 422);
            }

            $favorite = Favorite::create([
                'user_id'  => Auth::id(),
                'place_id' => $place->id,
            ]);

            return response()->json([
                'status'  => 'success',
                'message' => 'Place added to favorites.',
                'data'    => $favorite->load('place')
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Something went wrong while adding favorite.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }


    public function show($id): JsonResponse
    {
        try {
            $favorite = Favorite::where('id', $id)
                ->where('user_id', Auth::id())
                ->with('place')
                ->first();

            if (! $favorite) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Favorite not found.'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data'   => $favorite
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Something went wrong while retrieving the favorite.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $favorite = Favorite::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (! $favorite) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Favorite not found.'
                ], 404);
            }

            $favorite->delete();

            return response()->json([
                'status'  => 'success',
                'message' => 'Favorite removed successfully.'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Something went wrong while removing the favorite.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function toggle(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'place_id' => 'required|exists:places,id',
            ]);

            $favorite = Favorite::where('user_id', Auth::id())
                ->where('place_id', $request->place_id)
                ->first();

            if ($favorite) {
                $favorite->delete();

                return response()->json([
                    'status'      => 'success',
                    'message'     => 'Place removed from favorites.',
                    'is_favorite' => false
                ]);
            }

            $favorite = Favorite::create([
                'user_id'  => Auth::id(),
                'place_id' => $request->place_id
            ]);

            return response()->json([
                'status'      => 'success',
                'message'     => 'Place added to favorites.',
                'is_favorite' => true,
                'data'        => $favorite->load('place')
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Something went wrong while toggling favorite.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    public function checkStatus($placeId): JsonResponse
    {
        try {
            $isFavorite = Favorite::where('user_id', Auth::id())
                ->where('place_id', $placeId)
                ->exists();

            return response()->json([
                'status'      => 'success',
                'is_favorite' => $isFavorite
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Something went wrong while checking favorite status.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
}
