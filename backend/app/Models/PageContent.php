<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = [
        'title',
        'content',
        'slug',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'content' => 'json',
    ];
}
