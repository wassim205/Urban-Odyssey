<?php

namespace App\Http\Controllers\api\admin;

use App\Models\Place;
use App\Models\User;
use Illuminate\Http\Request;


class PlacesController
{
    public function index()
    {
        try {
            $places = Place::all();

            return response()->json(['places' => $places], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while fetching places.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'city' => 'nullable|string',
                'country' => 'nullable|string',
                'description' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                'image_url' => 'nullable|url',
                'address' => 'nullable|string',
                'category' => 'nullable|string',
            ]);

            $place = Place::create($validated);

            return response()->json(['place' => $place], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the place.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $place = Place::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string',
                'city' => 'nullable|string',
                'country' => 'nullable|string',
                'description' => 'nullable|string',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
                'image_url' => 'nullable|url',
                'address' => 'nullable|string',
                'category' => 'nullable|string',
            ]);

            $place->update($validated);

            return response()->json(['place' => $place], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the place.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $place = Place::findOrFail($id);
            $place->delete();

            return response()->json(['message' => 'Place deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the place.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
