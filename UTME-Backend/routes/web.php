<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ResponseController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/questions-by-year', [ResponseController::class, 'getQuestionsByYear']);


// http://localhost:8000/questions-by-year?subject=chemistry&type=utme

// http://localhost:8000/questions-by-year?subject=mathematics&type=utme