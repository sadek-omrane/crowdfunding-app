<?php

namespace App\Http\Controllers;

use App\Models\Testmonial;
use Illuminate\Http\Request;

class TestmonialController extends Controller
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

        $partners = Testmonial::offset($offset)
            ->limit($limit)
            ->get();

        return $this->sendResponse($partners, 'Testmonials list retrieved successfully.', $params);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'e_file_id' => 'required|exists:e_files,id',
            'content' => 'required',
            'rating' => 'required|integer|between:1,5',
        ]);

        $partner = Testmonial::create($request->all());

        return $this->sendResponse($partner, 'Testmonial created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Testmonial $testmonial)
    {
        return $this->sendResponse($testmonial, 'Testmonial retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testmonial $testmonial)
    {
        $request->validate([
            'name' => 'required',
            'e_file_id' => 'required|exists:e_files,id',
            'content' => 'required',
            'rating' => 'required|integer|between:1,5',
        ]);

        $testmonial->update($request->all());

        return $this->sendResponse($testmonial, 'Testmonial updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testmonial $testmonial)
    {
        $testmonial->delete();

        return $this->sendResponse(null, 'Testmonial deleted successfully.');
    }
}
