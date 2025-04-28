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

        return response()->json([
            "total_users" => $totalUsers,
            "total_places" => $totalPlaces,
            "total_reviews" => $totalReviews,
            "total_favorites" => $totalAddedToFavorite,
            "popular_places" => $popularPlaces,
        ]);
    }
}
 