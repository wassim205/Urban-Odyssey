<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\NearbyFacility;
use App\Models\Place;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function getMonthlyVisitsAnalytics()
{
    try {
        $visits = DB::table('visits')
            ->selectRaw('EXTRACT(MONTH FROM created_at) as month, COUNT(*) as total_visits')
            ->whereRaw('EXTRACT(YEAR FROM created_at) = ?', [now()->year])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $formattedData = collect(range(1, 12))->map(function ($month) use ($visits) {
            $visit = $visits->firstWhere('month', $month);
            return [
                'name' => date('M', mktime(0, 0, 0, $month, 1)),
                'visits' => $visit ? $visit->total_visits : 0,
            ];
        });

        return response()->json($formattedData, 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error fetching monthly visits analytics.',
            'error' => $e->getMessage(),
        ], 500);
    }
}
}
