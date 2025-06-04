<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Get the authenticated User
     */
    public function me()
    {
        return $this->sendResponse(Auth::user(), 'User retrieved successfully');
    }

    /**
     * Login a user
     */
    public function login(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        // Get the credentials
        $credentials = $request->only(['email', 'password']);

        // Check the credentials
        if (!$token = Auth::attempt($credentials)) {
            return $this->sendError('Invalid credentials', [], 401);
        }

        $user = Auth::user();

        $data = [
            'token' => $token,
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => $user
        ];
        return $this->sendResponse($data, 'User logged in successfully');
    }

    /**
     * Register a new user
     */
    public function register(Request $request){
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->assignRole('user');
        $user->roles;

        $token = Auth::login($user);

        return $this->sendResponse([
            'token' => $token,
            'user' => $user
        ], 'User registered successfully');
    }


    /**
     * Logout a user
     */
    public function logout(){
        Auth::logout();
        return $this->sendResponse([], 'User logged out successfully');
    }
}
