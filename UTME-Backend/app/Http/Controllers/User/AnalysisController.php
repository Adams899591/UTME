<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ExamHistory;
use App\Models\User;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
       public function fetchUserAnalysis(Request $request, $userId){


        $user = User::find($userId);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 401);
        }


        $passedExam =    ExamHistory::where('user_id', $userId)->where("passed", true)->count();
        $failedExam =    ExamHistory::where('user_id', $userId)->where("passed", false)->count();
        $totalExam = $passedExam + $failedExam;
       
            return response()->json([
                'status' => 'success', 
                'message' => 'User Analysis Fetched Successfully',
                "passedExam" => $passedExam,
                "failedExam" => $failedExam,
                "totalExam" => $totalExam
                ], 200);


    }
}
