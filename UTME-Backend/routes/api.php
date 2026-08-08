<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\User\AnalysisController;
use App\Http\Controllers\User\ExamHistoryController;
use App\Http\Controllers\User\PracticeController;
use App\Http\Controllers\User\SaveHistoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix("auth")->group(function () {
    Route::post("login", [LoginController::class, "login"]);
    Route::post("register", [RegisterController::class, "register"]);
    // Route::post("logout", [LogoutController::class, "logout"])->middleware('auth:sanctum');
});



Route::prefix("user")->group(function () {
    Route::post("practice/{userId}", [PracticeController::class, "fetchedPracticeCources"]);
    Route::post("exam-history/{userId}", [ExamHistoryController::class, "fetchExamHistory"]);
    Route::post("save-exam-history/{userId}", [SaveHistoryController::class, "saveExamHistory"]);
    Route::post("alalysis/{userId}", [AnalysisController::class, "fetchUserAnalysis"]);
});