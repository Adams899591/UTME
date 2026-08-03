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
        Schema::create('physics', function (Blueprint $table) {
            $table->id(); // Corresponds to "id" (Auto-incrementing BIGINT)
            
            $table->text('question'); // The main question text
            $table->json('option'); // Stores options {"a": "...", "b": "..."} clean & flexibly
            
            $table->string('answer', 10); // Stores correct option key (e.g., 'a', 'b', etc.)
            $table->text('solution')->nullable(); // Detailed explanation (optional/nullable)
            
            $table->text('section')->nullable(); // Section name if present
            $table->text('image')->nullable(); // Path/URL to an image if present
            
            $table->string('examtype')->nullable(); // e.g., 'utme', 'post-utme'
            $table->string('examyear')->nullable(); // e.g., '2010'
            
            $table->timestamps(); // Created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('physics');
    }
};
