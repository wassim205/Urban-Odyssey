<?php

use App\Http\Controllers\api\admin\DashboardController;
use App\Http\Controllers\api\admin\PlacesController;
use App\Http\Controllers\api\admin\UsersController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\NearbyFacilityController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\ReviewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoritesController::class, 'index']);
    Route::post('/favorites', [FavoritesController::class, 'store']);
    Route::get('/favorites/{id}', [FavoritesController::class, 'show']);
    Route::delete('/favorites/{id}', [FavoritesController::class, 'destroy']);
    // Route::post('/favorites/toggle', [FavoritesController::class, 'toggle']);
    // Route::get('/favorites/check/{placeId}', [FavoritesController::class, 'checkStatus']);
});

Route::get('/nearby-facilities', [NearbyFacilityController::class, 'index']);

Route::get('/reviews', [ReviewsController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    Route::get('/dashboard/users', [UsersController::class, 'index']);
    Route::delete('dashboard/users/{id}', [UsersController::class, 'destroy']);
    Route::post('dashboard/users', [UsersController::class, 'store']);
    Route::put('dashboard/users/{id}', [UsersController::class, 'update']);

    Route::get('/places', [PlacesController::class, 'index']);
    Route::post('/places', [PlacesController::class, 'store']);
    Route::put('/places/{id}', [PlacesController::class, 'update']);
    Route::delete('/places/{id}', [PlacesController::class, 'destroy']);
    
    Route::get('/reviews', [ReviewsController::class, 'index']);
    Route::post('/reviews', [ReviewsController::class, 'store']);
    Route::put('/reviews/{id}/approve', [ReviewsController::class, 'approve']);
    Route::put('/reviews/{id}/reject', [ReviewsController::class, 'reject']);
    Route::delete('/reviews/{id}', [ReviewsController::class, 'destroy']);
});
