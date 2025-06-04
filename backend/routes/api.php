<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\EFileController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestmonialController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => ['api'],
    'prefix' => 'auth'
], function ($router) {
    // auth:api
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

//users
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'users'
], function ($router) {
    Route::get('/', [UserController::class, 'index']);
});

// projects
Route::group([
    'middleware' => ['api'],
    'prefix' => 'projects'
], function ($router) {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/my-projects', [ProjectController::class, 'myProjects']);
    Route::get('/{project}', [ProjectController::class, 'show']);
    Route::get('/{project}/similar', [ProjectController::class, 'similar']);
    Route::group(['middleware' => ['auth:api']], function () {
        Route::post('/', [ProjectController::class, 'store']);
        Route::put('/{project}', [ProjectController::class, 'update']);
        Route::delete('/{project}', [ProjectController::class, 'destroy']);
    });
});


// efiles
Route::group([
    'middleware' => ['api'],
    'prefix' => 'efiles'
], function ($router) {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/upload', [EFileController::class, 'upload']);
        Route::delete('/{id}', [EFileController::class, 'delete']);
    });
    Route::get('/{id}', [EFileController::class, 'read']);

});


//pages
Route::group([
    'middleware' => ['api'],
    'prefix' => 'page-contents'
], function ($router) {
    Route::get('/', [PageContentController::class, 'index']);
    Route::get('/{pageContent}', [PageContentController::class, 'show']);
    Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
        Route::post('/', [PageContentController::class, 'store']);
        Route::put('/{pageContent}', [PageContentController::class, 'update']);
        Route::delete('/{pageContent}', [PageContentController::class, 'destroy']);
    });
});

//partners
Route::group([
    'middleware' => ['api'],
    'prefix' => 'partners'
], function ($router) {
    Route::get('/', [PartnerController::class, 'index']);
    Route::get('/{partner}', [PartnerController::class, 'show']);
    Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
        Route::post('/', [PartnerController::class, 'store']);
        Route::put('/{partner}', [PartnerController::class, 'update']);
        Route::delete('/{partner}', [PartnerController::class, 'destroy']);
    });
});

//testmonials
Route::group([
    'middleware' => ['api'],
    'prefix' => 'testmonials'
], function ($router) {
    Route::get('/', [TestmonialController::class, 'index']);
    Route::get('/{testmonial}', [TestmonialController::class, 'show']);
    Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
        Route::post('/', [TestmonialController::class, 'store']);
        Route::put('/{testmonial}', [TestmonialController::class, 'update']);
        Route::delete('/{testmonial}', [TestmonialController::class, 'destroy']);
    });
});


//payments
Route::group([
    'middleware' => ['api'],
    'prefix' => 'payments'
], function ($router) {
    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
    });
});


// test routes
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});
