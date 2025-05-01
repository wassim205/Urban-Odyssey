<?php

namespace App\Http\Controllers\api\admin;

use App\Models\User;
use Illuminate\Http\Request;


class UsersController
{
    public function index()
    {
        try {
            $users = User::all();
    
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while fetching users.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
   

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'username' => 'required|string|unique:users',
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'role_id' => 'required|integer|exists:roles,id',
            ]);

            $user = User::create([
                'username' => $validated['username'],
                'firstname' => $validated['firstname'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'role_id' => $validated['role_id'],
            ]);

            return response()->json(['user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $validated = $request->validate([
                'username' => 'required|string|unique:users,username,' . $id,
                'firstname' => 'required|string',
                'lastname' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $id,
                'role_id' => 'required|integer|exists:roles,id',
            ]);

            $user->update($validated);

            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the user.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}