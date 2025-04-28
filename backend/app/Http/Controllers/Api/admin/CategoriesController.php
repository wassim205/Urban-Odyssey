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
}
