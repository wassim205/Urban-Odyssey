<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NearbyFacility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NearbyFacilityController extends Controller
{
    public function index(Request $request)
    {
        try {
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');
            $radius = $request->input('radius', 3);

            if (!$latitude || !$longitude) {
                return response()->json(['error' => 'Latitude and longitude are required.'], 400);
            }

            $haversine = "(6371 * acos(cos(radians(?)) 
                            * cos(radians(latitude)) 
                            * cos(radians(longitude) - radians(?)) 
                            + sin(radians(?)) 
                            * sin(radians(latitude))))";

            $bindings = [$latitude, $longitude, $latitude];

            $facilities = NearbyFacility::select('nearby_facilities.*')
                ->selectRaw("$haversine AS distance", $bindings)
                ->whereRaw("$haversine <= ?", array_merge($bindings, [$radius]))
                ->orderByRaw("$haversine ASC", $bindings)
                ->with([
                    'reviews' => function ($query) {
                        $query->where('status', 'approved')
                            ->latest()->limit(3)->with(['user:id,username']);
                    }
                ])
                ->get();

            return response()->json($facilities);
        } catch (\Exception $e) {
            Log::error('Error fetching nearby facilities: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching nearby facilities.'], 500);
        }
    }


    public function adminIndex()
    {
        try {
            $facilities = NearbyFacility::all();
            return response()->json(['facilities' => $facilities], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch facilities.'], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        try {
            $facility = NearbyFacility::create($validated);
            return response()->json(['facility' => $facility], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add facility.'], 500);
        }
    }

    public function update(Request $request, NearbyFacility $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        try {
            $facility->update($validated);
            return response()->json(['facility' => $facility], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update facility.'], 500);
        }
    }

    public function destroy(NearbyFacility $facility)
    {
        try {
            $facility->delete();
            return response()->json(['message' => 'Facility deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete facility.'], 500);
        }
    }
}
