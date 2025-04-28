<?php

namespace App\Http\Controllers\Api\admin;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController
{
    public function index()
    {
        try {
            $categories = Category::all();

            return response()->json(['categories' => $categories], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while fetching categories.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPlaceCategoriesAnalytics()
    {
        try {
            $categories = Category::withCount('places')
                ->orderBy('places_count', 'desc')
                ->take(5)
                ->get();

            $data = $categories->map(function ($category) {
                return [
                    'name' => $category->name,
                    'place_count' => $category->places_count,
                ];
            });

            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching place categories analytics.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
