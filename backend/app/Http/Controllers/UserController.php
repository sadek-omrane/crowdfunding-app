<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
        $key = isset($params['key']) ? $params['key'] : null;

        $users = User::offset($offset)
            ->limit($limit);

        if ($key) {
            $users = $users->where('name', 'like', "%$key%");
        }

        $users = $users->get();

        return $this->sendResponse($users, 'Liste des utilisateurs récupérée avec succès.', $params);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
