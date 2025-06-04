<?php

namespace  App\Http\Services;

use App\Models\EFile;
use Illuminate\Support\Facades\Storage;

class EFileService
{


    public function __construct()
    {
    }

    static public function upload($file): EFile{
        $name = $file->getClientOriginalName();
        $path = $file->store('files');

        $eFile = EFile::create([
            'name' => $name,
            'path' => $path,
            'type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);

        return $eFile;
    }

    static public function delete($id){
        $eFile = EFile::find($id);
        if(!$eFile){
            return false;
        }
        Storage::disk('local')->delete($eFile->path);
        $eFile->delete();
        return true;
    }
}
