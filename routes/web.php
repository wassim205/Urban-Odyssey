<?php

use Illuminate\Support\Facades\Route;
Route::get('/', function () {
    return view('index');  // This is the layout view for React
});

Route::get('/register', function () {
    return view('index');  // React will handle the route and show the Register component
});

Route::get('/login', function () {
    return view('index');  // React will handle the route and show the Login component
});

// Optionally, if you have an authenticated route for dashboards
Route::get('/dashboard', function () {
    return view('index');  // React will handle the dashboard route
});