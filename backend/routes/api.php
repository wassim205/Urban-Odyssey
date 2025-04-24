<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\FavoritesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/favorites', [FavoritesController::class, 'index']);
    Route::post('/favorites', [FavoritesController::class, 'store']);
    Route::get('/favorites/{id}', [FavoritesController::class, 'show']);
    Route::delete('/favorites/{id}', [FavoritesController::class, 'destroy']);
    Route::post('/favorites/toggle', [FavoritesController::class, 'toggle']);
    Route::get('/favorites/check/{placeId}', [FavoritesController::class, 'checkStatus']);
});