<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * This file is a design template for a stronger UTME user schema.
     * It includes the user table plus payment and exam history tables.
     * Use it as a guide when updating your backend schema.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Student full name
            $table->string('email')->unique(); // Login email
            $table->string('phone')->nullable(); // Optional phone number
            $table->timestamp('email_verified_at')->nullable(); // Verified email
            $table->string('password'); // Hashed password

            $table->boolean('is_paid')->default(false); // true when user has active payment
            $table->string('plan_name')->nullable(); // e.g. 'monthly', 'yearly', 'free'
            $table->timestamp('paid_until')->nullable(); // expiry date for paid access
            $table->string('payment_status')->nullable(); // e.g. 'active', 'expired', 'pending'

            $table->string('role')->default('student'); // e.g. student, admin
            $table->string('avatar_url')->nullable(); // Profile image link if used in app
            $table->json('meta')->nullable(); // Optional extra data: { preferred_language, referral_code }

            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('user_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            $table->string('transaction_ref')->nullable(); // Gateway reference or invoice ID
            $table->string('payment_gateway')->nullable(); // e.g. stripe, flutterwave, paypal
            $table->decimal('amount', 10, 2)->default(0); // Paid amount
            $table->string('currency', 10)->default('NGN');
            $table->string('status')->default('pending'); // pending, succeeded, failed, refunded
            $table->string('plan_name')->nullable(); // copied from users at payment time
            $table->timestamp('paid_at')->nullable(); // when payment succeeded
            $table->timestamp('expires_at')->nullable(); // access expiry after this payment
            $table->json('meta')->nullable(); // raw response or extra info

            $table->timestamps();
        });

        Schema::create('exam_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            $table->string('subject'); // e.g. mathematics, physics, english
            $table->string('exam_type')->nullable(); // e.g. utme, post-utme
            $table->string('exam_year')->nullable(); // e.g. 2024

            $table->integer('total_questions')->default(0);
            $table->integer('correct_answers')->default(0);
            $table->integer('wrong_answers')->default(0);
            $table->integer('score')->nullable(); // computed score or percentage
            $table->string('result')->nullable(); // e.g. pass, fail, completed

            $table->timestamp('started_at')->nullable(); // when the session began
            $table->timestamp('finished_at')->nullable(); // when the exam/test ended
            $table->integer('duration_seconds')->nullable(); // how long the user took
            $table->json('details')->nullable(); // optional breakdown, question IDs, answers, stats

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_histories');
        Schema::dropIfExists('user_payments');
        Schema::dropIfExists('users');
    }
};
