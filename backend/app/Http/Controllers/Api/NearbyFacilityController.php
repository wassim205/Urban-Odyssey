<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NearbyFacility;
use Illuminate\Http\Request;

class NearbyFacilityController extends Controller
{
    public function index(Request $request)
    {
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        $radius = $request->input('radius', 3); // default 3km

        if (!$latitude || !$longitude) {
            return response()->json(['error' => 'Latitude and longitude are required.'], 400);
        }

        $haversine = "(6371 * acos(cos(radians($latitude)) 
                        * cos(radians(latitude)) 
                        * cos(radians(longitude) - radians($longitude)) 
                        + sin(radians($latitude)) 
                        * sin(radians(latitude))))";

        $facilities = NearbyFacility::select('*')
            ->selectRaw("$haversine AS distance")
            ->having("distance", "<=", $radius)
            ->orderBy("distance")
            ->get();

        return response()->json($facilities);
    }
}
