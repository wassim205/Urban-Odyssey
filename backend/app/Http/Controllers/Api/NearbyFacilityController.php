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
}
