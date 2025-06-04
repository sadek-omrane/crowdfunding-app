<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    protected $fillable = [
        'name',
        'e_file_id',
        'created_at',
        'updated_at',
    ];
}
