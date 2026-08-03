<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Chemistry;

class ChemistrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Your JSON data on ground
        $json = [
            "status" => "success",
            "subject" => "englishlit",
            "type" => "utme",
            "total_years_fetched" => 24,
            "data" => [
                "2001" => [
                    [
                        "id" => 487,
                        "question" => "In William Morris The Proud King...",
                        "option" => ["a" => "aabbcc", "b" => "ababbcc", "c" => "abcdee", "d" => "abccddeeff"],
                        "section" => "Question section text...",
                        "image" => "",
                        "answer" => "b",
                        "solution" => "",
                        "examtype" => "utme",
                        "examyear" => "2019"
                    ]
                ],
                "2002" => [
                    [
                        "id" => 487,
                        "question" => "In William Morris The Proud King...",
                        "option" => ["a" => "aabbcc", "b" => "ababbcc", "c" => "abcdee", "d" => "abccddeeff"],
                        "section" => "Question section text...",
                        "image" => "",
                        "answer" => "b",
                        "solution" => "",
                        "examtype" => "utme",
                        "examyear" => "2019"
                    ]
                ]
            ]
        ];

        // Loop through each year key
        foreach ($json['data'] as $yearKey => $questionsArray) {
            
            // Loop through each question inside that year
            foreach ($questionsArray as $q) {
                
                Chemistry::create([
                    'question'  => $q['question'],
                    'option'    => $q['option'],       // Saves directly into your json column
                    'answer'    => $q['answer'],
                    'solution'  => $q['solution'] ?? null,
                    'section'   => $q['section'] ?? null,
                    'image'     => $q['image'] ?? null,
                    'examtype'  => $q['examtype'] ?? null,
                    'examyear'  => $q['examyear'] ?? $yearKey,
                ]);
                
            }
        }
    }
}









// namespace Database\Seeders;

// use Illuminate\Database\Seeder;
// use App\Models\Question;

// class QuestionSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // Your JSON data on ground
//         $json = [
//             "status" => "success",
//             "subject" => "englishlit",
//             "type" => "utme",
//             "total_years_fetched" => 24,
//             "data" => [
//                 "2001" => [
//                     [
//                         "id" => 487,
//                         "question" => "In William Morris The Proud King...",
//                         "option" => ["a" => "aabbcc", "b" => "ababbcc", "c" => "abcdee", "d" => "abccddeeff"],
//                         "section" => "Question section text...",
//                         "image" => "",
//                         "answer" => "b",
//                         "solution" => "",
//                         "examtype" => "utme",
//                         "examyear" => "2019"
//                     ]
//                 ]
//             ]
//         ];

//         // Loop through each year key
//         foreach ($json['data'] as $yearKey => $questionsArray) {
            
//             // Loop through each question inside that year
//             foreach ($questionsArray as $q) {
                
//                 Question::create([
//                     'question'  => $q['question'],
//                     'option'    => $q['option'],       // Saves directly into your json column
//                     'answer'    => $q['answer'],
//                     'solution'  => $q['solution'] ?? null,
//                     'section'   => $q['section'] ?? null,
//                     'image'     => $q['image'] ?? null,
//                     'examtype'  => $q['examtype'] ?? null,
//                     'examyear'  => $q['examyear'] ?? $yearKey,
//                 ]);
                
//             }
//         }
//     }
// }