<?php

namespace App\Http\Controllers;

use App\Models\NearbyFacility;
use App\Models\Review;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReviewsController extends Controller
{

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        try {
            $validated = $request->validate([
                'facility_id' => 'required|exists:nearby_facilities,facility_id',
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'nullable|string',
            ]);

            $review = Review::create([
                'user_id' => Auth::id(),
                'facility_id' => $validated['facility_id'],
                'rating' => $validated['rating'],
                'comment' => $validated['comment'] ?? null,
                'status' => 'pending',
            ]);

            return response()->json($review, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error creating review: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while creating the review.'], 500);
        }
    }

    public function index()
    {
        try {
            $reviews = Review::with(['facility', 'user'])->get();
            return response()->json(['reviews' => $reviews]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reviews.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function approve($id)
    {
        $review = Review::findOrFail($id);
        $review->status = 'approved';
        $review->save();

        return response()->json(['message' => 'Review approved successfully.']);
    }

    public function reject($id)
    {
        $review = Review::findOrFail($id);
        $review->status = 'rejected';
        $review->save();

        return response()->json(['message' => 'Review rejected successfully.']);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully.']);
    }
}
