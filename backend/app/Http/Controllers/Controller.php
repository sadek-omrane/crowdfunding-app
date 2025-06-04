<?php

namespace App\Http\Controllers;

abstract class Controller
{


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    //send reponse
    public function sendResponse($result, $message, $attributes = [])
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
            'attributes' => $attributes
        ];
        return response()->json($response, 200);
    }

    //send error response
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

}
