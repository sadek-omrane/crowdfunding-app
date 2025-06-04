<?php

namespace App\Http\Controllers;

use App\Models\PageContent;
use Illuminate\Http\Request;

class PageContentController extends Controller
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

        $pages = PageContent::offset($offset)
            ->limit($limit);
        if ($status) {
            $pages->where('status', $status);
        }
        $pages = $pages->get();

        return $this->sendResponse($pages, 'Liste des pages récupérée avec succès.', $params);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'slug' => 'required|unique:page_contents',
            'status' => 'required|in:draft,published,archived',
        ]);

        $page = PageContent::create($request->all());

        return $this->sendResponse($page, 'Page créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PageContent $pageContent)
    {
        return $this->sendResponse($pageContent, 'Page récupérée avec succès.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PageContent $pageContent)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'slug' => 'required|unique:page_contents,slug,' . $pageContent->id,
            'status' => 'required|in:draft,published,archived',
        ]);

        $pageContent->update($request->all());

        return $this->sendResponse($pageContent, 'Page mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PageContent $pageContent)
    {
        $pageContent->delete();

        return $this->sendResponse(null, 'Page supprimée avec succès.');
    }
}
