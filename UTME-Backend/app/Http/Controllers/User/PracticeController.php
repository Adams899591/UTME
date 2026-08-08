<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Accounting;
use App\Models\User;
// 1. Import your models here (make sure the paths match your app structure)
use App\Models\Biology;
use App\Models\Chemistry;
use App\Models\CivilEducation;
use App\Models\Commerce;
use App\Models\CRK;
use App\Models\CurrentAffair;
use App\Models\Economic;
use App\Models\English;
use App\Models\EnglishLit;
use App\Models\Geography;
use App\Models\Physics;
use App\Models\Government;
use App\Models\IRK;
use App\Models\Mathematics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PracticeController extends Controller
{
    public function fetchedPracticeCources(Request $request, $userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 401);
        }

        if (!is_array($request->selectedCourses)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid selectedCourses format'], 400);
        }

        $allQuestions = [];

        foreach ($request->selectedCourses as $course) {
            Log::info("Selected Course: " . $course);

            // 1. Get the correct Model class name for this course
            $modelClass = $this->getModelForCourse($course);

            if (!$modelClass) {
                // Skip if the course isn't recognized
                continue;
            }

            if ($user->payment_status == "paid") {  
                // 2. Fetch 20 random records using the Eloquent Model
                $questions = $modelClass::inRandomOrder()
                    ->limit(20)
                    ->get();
            }else {
                // Fetch the first 10 questions sequentially using the Eloquent Model
                $questions = $modelClass::orderBy('id', 'desc')
                    ->limit(10)
                    ->get();
            }




            // 3. Store them grouped by course name
            $allQuestions[$course] = $questions;
            
            // Log::info("000000000000000000000000000");
            // Log::info($allQuestions[$course]);
        }

        return response()->json([
            'status' => 'success',
            'data' => $allQuestions
        ], 200);
    }

    /**
     * Helper function to map course names to their Eloquent Model classes.
     */
    private function getModelForCourse($course)
    {
        return match (strtolower(trim($course))) {
            'biology' => Biology::class,
            'chemistry' => Chemistry::class,
            'physics' => Physics::class,
            'mathematics' => Mathematics::class,
            'english language' => English::class,
            'government' => Government::class,
            'literature in english' => EnglishLit::class,
            'economics' => Economic::class,
            'accounting' => Accounting::class,
            'commerce' => Commerce::class,
            'geography' => Geography::class,
            // 'insurance' => Insurance::class,
            'christian religious knowledge' => CRK::class,
            'islamic religious knowledge' => IRK::class,
            'civic education' => CivilEducation::class,
            'current affairs' => CurrentAffair::class,
            default => null, // Fallback if model doesn't exist
        };
    }
}