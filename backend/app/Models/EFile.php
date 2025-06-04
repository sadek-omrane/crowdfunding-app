<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EFile extends Model
{
    protected $fillable = [
        'name',
        'path',
        'type',
        'size',
        'created_at',
        'updated_at',
    ];

}
