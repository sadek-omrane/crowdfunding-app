<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testmonial extends Model
{
    protected $fillable = [
        'name',
        'e_file_id',
        'content',
        'rating',
        'created_at',
        'updated_at',
    ];
}
