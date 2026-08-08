<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ExamHistory;
use App\Models\User;
use Illuminate\Http\Request;

class ExamHistoryController extends Controller
{
    public function fetchExamHistory(Request $request, $userId){


        $user = User::find($userId);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 401);
        }

        $userHistory = ExamHistory::where('user_id', $userId)->latest()->get();
       
            return response()->json([
                'status' => 'success', 
                'message' => 'User History Fetched Successfully',
                "data" => $userHistory
                ], 200);


    }
}
