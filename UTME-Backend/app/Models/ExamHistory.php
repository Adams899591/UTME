<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamHistory extends Model
{
      protected $guarded = [];

    // Add this to handle automatic array-to-json casting
    protected $casts = [
        'user_answers' => 'array',
        'subjects' => 'array', // <-- Automatically casts subjects array to JSON and back
        'passed' => 'boolean',
    ];
}
