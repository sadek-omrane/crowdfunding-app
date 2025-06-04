<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
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

        $partners = Partner::offset($offset)
            ->limit($limit)
            ->get();

        return $this->sendResponse($partners, 'Partners list retrieved successfully.', $params);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'e_file_id' => 'required|exists:e_files,id',
        ]);

        $partner = Partner::create($request->all());

        return $this->sendResponse($partner, 'Partner created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Partner $partner)
    {
        return $this->sendResponse($partner, 'Partner retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        $request->validate([
            'name' => 'required',
            'e_file_id' => 'required|exists:e_files,id',
        ]);

        $partner->update($request->all());

        return $this->sendResponse($partner, 'Partner updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner)
    {
        $partner->delete();

        return $this->sendResponse(null, 'Partner deleted successfully.');
    }
}
