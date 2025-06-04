<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectEFiles extends Model
{
    protected $fillable = [
        'project_id',
        'e_file_id',
        'created_at',
        'updated_at',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function eFile()
    {
        return $this->belongsTo(EFile::class);
    }
}
