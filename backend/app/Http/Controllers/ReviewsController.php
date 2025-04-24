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
    // List reviews for a specific facility
    public function index()
    {
        try {
            // $facility = NearbyFacility::findOrFail($facilityId);
            $reviews = Review::with(['facility', 'user'])->get();
            return response()->json(['reviews' => $reviews]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to fetch reviews.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // Admin or moderator can update review status
    // public function updateStatus(Request $request, $reviewId)
    // {
    //     $validated = $request->validate([
    //         'status' => [new Enum(ReviewStatus::class)],
    //     ]);

    //     $review = Review::findOrFail($reviewId);
    //     $review->status = $validated['status'];
    //     $review->save();

    //     return response()->json($review);
    // }
}
