<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exam_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('total_score');
            $table->integer('max_score');
            $table->integer('percentage');
            $table->boolean('passed');
            $table->integer('time_spent_seconds'); // Stores the duration
            $table->json('user_answers')->nullable();
            $table->json('subjects')->nullable();
            // $table->json('user_answers')->nullable(); // Stores the userAnswers object securely as JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_histories');
    }
};
