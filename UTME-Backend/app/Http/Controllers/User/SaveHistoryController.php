<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ExamHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SaveHistoryController extends Controller
{
    public function saveExamHistory(Request $request, $userId)
    {
        // Log::info($request->all());

        $validatedData = $request->validate([
            'totalScore' => 'required|integer',
            'maxScore' => 'required|integer',
            'percentage' => 'required|integer',
            'passed' => 'required|boolean',
            'timeSpentSeconds' => 'required|integer',
            'subjects' => 'required|array',
            'userAnswers' => 'required|array',
        ]);

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }

        try {
            // Save everything cleanly in one go
            ExamHistory::create([
                'user_id' => $userId,
                'total_score' => $validatedData['totalScore'],
                'max_score' => $validatedData['maxScore'],
                'percentage' => $validatedData['percentage'],
                'passed' => $validatedData['passed'],
                'time_spent_seconds' => $validatedData['timeSpentSeconds'],
                'user_answers' => $validatedData['userAnswers'],
                'subjects' => $validatedData['subjects'], // <-- Saved directly as a JSON array
            ]);

            Log::info("00000000000 Success 000000000000000");

            return response()->json([
                'status' => 'success', 
                'message' => 'User History Saved Successfully',        
            ], 200);

        } catch (\Exception $e) {
            Log::error("Failed to save exam history: " . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Internal server error while saving history'
            ], 500);
        }
    }
}