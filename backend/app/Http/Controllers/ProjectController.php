<?php

namespace App\Http\Controllers;

use App\Http\Services\EFileService;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $params = $request->all();
        $limit = isset($params['limit']) ? $params['limit'] : 20;
        $page = isset($params['page']) ? $params['page'] : 1;
        $offset = ($page - 1) * $limit;
        $status = isset($params['status']) ? $params['status'] : null;
        $key = isset($params['key']) ? $params['key'] : null;

        $projects = Project::when($status, function ($query, $status) {
                return $query->where('status', $status);
            })->when($key, function ($query, $key) {
                return $query->where('name', 'like', "%$key%");
            })
            ->where('status', '!=', 'draft')
            ->offset($offset)
            ->limit($limit)
            ->get();

        return $this->sendResponse($projects, 'Liste des projets récupérée avec succès.', $params);
    }

    public function myProjects(Request $request)
    {
        $params = $request->all();
        $limit = isset($params['limit']) ? $params['limit'] : 20;
        $page = isset($params['page']) ? $params['page'] : 1;
        $offset = ($page - 1) * $limit;
        $status = isset($params['status']) ? $params['status'] : null;
        $key = isset($params['key']) ? $params['key'] : null;

        $projects = Project::when($status, function ($query, $status) {
                return $query->where('status', $status);
            })->when($key, function ($query, $key) {
                return $query->where('name', 'like', "%$key%");
            })
            ->offset($offset)
            ->limit($limit);

        if(Auth::check()){
            $user = User::find(Auth::id());
            if($user->hasRole('user')){
                $projects = $projects->where('user_id', Auth::user()->id);
            }
        }

        $projects = $projects->get();

        return $this->sendResponse($projects, 'Liste des projets récupérée avec succès.', $params);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'goal' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'status' => 'required|in:draft,published,successful,failed',
            'e_files' => 'nullable|array',
        ]);

        $user = User::find(Auth::id());
        if($user->hasRole('user')){
            $request['user_id'] = Auth::id();
        }
        $project = Project::create($request->all());


        $efile_ids = array_column($request->e_files, 'id');
        $project->e_files()->attach($efile_ids);

        $project->load('e_files');

        return $this->sendResponse($project, 'Projet créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('e_files');
        return $this->sendResponse($project, 'Projet récupéré avec succès.');
    }

    /**
     * get similar project
     */
    public function similar(Project $project)
    {
        // for now we will get a random project
        $similar = Project::where('id', '!=', $project->id)
            ->where('status', 'published')
            ->with(['e_files'])
            ->inRandomOrder()
            ->first();

        return $this->sendResponse($similar, 'Projets similaires récupérés avec succès.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'goal' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'status' => 'required|in:draft,published,successful,failed',
            'e_files' => 'required|array',
        ]);

        $project->update($request->all());

        $efile_ids = array_column($request->e_files, 'id');
        $project->e_files()->sync($efile_ids);

        $project->load('e_files');

        return $this->sendResponse($project, 'Projet mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return $this->sendResponse([], 'Projet supprimé avec succès.');
    }
}
