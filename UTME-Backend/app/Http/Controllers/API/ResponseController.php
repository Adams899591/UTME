<?php

// namespace App\Http\Controllers\API;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Facades\Log;

// class ResponseController extends Controller
// {
//     /**
//      * Fetch 40 questions for each year for a specific subject and exam type.
//      *
//      * Example Route Usage:
//      * GET /api/questions-by-year?subject=chemistry&type=utme
//      */
//     public function getQuestionsByYear(Request $request)
//     {

//         Log::info('Fetching questions by year with parameters: ', $request->query());
//         // 1. Validate query parameters or set defaults
//         $subject = $request->query('subject', 'chemistry');
//         $type = $request->query('type', 'utme');
        
//         // 2. Define the range of years you want to fetch questions for
//         // (Adjust the start and end years according to your needs)
//         $years = range(2001, 2024); 

//         $accessToken = 'ALOC-e2f6bfb00e588f569276';
//         $allQuestionsByYear = [];

//         Log::info('Starting to fetch questions for years: ', $years);
//         // 3. Loop through each year and make an API request
//         foreach ($years as $year) {
//             $response = Http::withHeaders([
//                 'AccessToken' => $accessToken,
//             ])->get('https://questions.aloc.com.ng/api/v2/q/2', [
//                 'subject' => $subject,
//                 'type'    => $type,
//                 'year'    => $year,
//             ]);


//             Log::info("Fetched questions for year: $year, Status: " . $response->status());
//             if ($response->successful()) {
//                 $data = $response->json();

//                 // Store the questions returned for this year
//                 $allQuestionsByYear[$year] = $data['data'] ?? [];
//             } else {
//                 Log::warning("Failed to fetch questions for year: $year");
//                 // If a year fails or has no data, return an empty array for that year
//                 $allQuestionsByYear[$year] = [];
//             }
//         }

//         // 4. Return the consolidated response grouped by year
//         return response()->json([
//             'status' => 'success',
//             'subject' => $subject,
//             'type' => $type,
//             'total_years_fetched' => count($allQuestionsByYear),
//             'data' => $allQuestionsByYear,
//         ]);
//     }
// }














namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\Pool;

class ResponseController extends Controller
{
    /**
     * Fetch questions for each year for a specific subject and exam type.
     *
     * Example Route Usage:
     * GET /api/questions-by-year?subject=chemistry&type=utme
     */
    public function getQuestionsByYear(Request $request)
    {
        // Prevent PHP from timing out at 60 seconds
        set_time_limit(300);

        Log::info('Fetching questions by year with parameters: ', $request->query());

        // 1. Validate query parameters or set defaults
        $subject = $request->query('subject', 'chemistry');
        $type = $request->query('type', 'utme');
        
        // 2. Define the range of years
        $years = range(2001, 2024); 

        $accessToken = 'ALOC-e2f6bfb00e588f569276';
        $allQuestionsByYear = [];

        Log::info('Starting to fetch questions for years: ', $years);

        // 3. Fetch all years concurrently in parallel
        $responses = Http::pool(function (Pool $pool) use ($years, $accessToken, $subject, $type) {
            return array_map(function ($year) use ($pool, $accessToken, $subject, $type) {
                return $pool->timeout(120)
                            ->withHeaders(['AccessToken' => $accessToken])
                            ->get('https://questions.aloc.com.ng/api/v2/q/40', [
                                'subject' => $subject,
                                'type'    => $type,
                                'year'    => $year,
                            ]);
            }, $years);
        });

        // 4. Process parallel responses and log progress
        foreach ($responses as $index => $response) {
            $year = $years[$index];

            if ($response instanceof \Throwable) {
                Log::error("Exception occurred while fetching year $year: " . $response->getMessage());
                $allQuestionsByYear[$year] = [];
                continue;
            }

            Log::info("Fetched questions for year: $year, Status: " . $response->status());

            if ($response->successful()) {
                $data = $response->json();
                $allQuestionsByYear[$year] = $data['data'] ?? [];
            } else {
                Log::warning("Failed to fetch questions for year: $year");
                $allQuestionsByYear[$year] = [];
            }
        }

        // 5. Return consolidated JSON response
        return response()->json([
            'status' => 'success',
            'subject' => $subject,
            'type' => $type,
            'total_years_fetched' => count($allQuestionsByYear),
            'data' => $allQuestionsByYear,
        ]);
    }
}