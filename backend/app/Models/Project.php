<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'goal',
        'start_date',
        'end_date',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $with = [
        'user',
        'e_files',
    ];

    public function e_files()
    {
        return $this->belongsToMany(EFile::class, 'project_e_files');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
