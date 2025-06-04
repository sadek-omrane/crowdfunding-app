<?php

namespace App\Http\Controllers;

use App\Http\Services\EFileService;
use App\Models\EFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EFileController extends Controller
{
    public function __construct()
    {
    }
    //upload file
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
        ]);

        $file = $request->file('file');
        $eFile = EFileService::upload($file);

        return $this->sendResponse($eFile, 'Fichier téléchargé avec succès.');
    }

    // read file from private storage
    public function read($id){
        $eFile = EFile::find($id);
        if(!$eFile){
            return $this->sendError('Fichier non trouvé.', [], 404);
        }
        $path = storage_path('app/private/'.$eFile->path);
        return response()->file($path);
    }

    //delete file
    public function delete($id){
        if(!EFileService::delete($id)){
            return $this->sendError('Fichier non trouvé.', [], 404);
        }
        return $this->sendResponse(null, 'Fichier supprimé avec succès.');
    }
}
