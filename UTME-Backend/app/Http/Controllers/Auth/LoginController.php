<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
  

    public function  login(Request $request)
    {

        // Validate the incoming request data
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255|exists:users,email',
            'password' => 'required|string|min:8'
        ],["email.exists" => "The provided email does not exist in our records."]);

        try {

          // if no user found  return an error response
            if (!Auth::attempt($validatedData)) {
                    return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
            }

            // Login in user
            if (Auth::attempt($validatedData)) {
                $user = Auth::user();

                return response()->json([
                    'status' => 'success',
                    'message' => 'User logged in successfully',
                    'user' => $user
                ], 200);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Authentication failed'], 401);
            }
        }catch(\Illuminate\Validation\ValidationException $ve) {   // Catch validation exceptions and return a structured error response

            // Return a JSON response with the validation errors and a 422 Unprocessable Entity status code
            return response()->json(['status' => 'error', 
                                      'message' => 'Validation Error: ' ,
                                      'errors' => $ve->errors()
                                      ], 422);

        }catch (\Exception $e) { // Catch any other exceptions and return a generic error response with the exception message
            return response()->json(['status' => 'error', 'message' => 'Server Error: ' . $e->getMessage()], 500);
        }
    }


}
