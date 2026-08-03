<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class English extends Model
{
          /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    // If 'option' is stored as a JSON array in the database, 
    // cast it automatically so Laravel handles it properly:
    protected $casts = [
        'option' => 'array',
    ];
}
