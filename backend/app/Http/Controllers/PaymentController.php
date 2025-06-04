<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
   // payment controller using cashier stripe


   // create payment intent
    public function createPaymentIntent(Request $request)
    {
         $request->validate([
              'amount' => 'required|numeric',
         ]);

         $amount = $request->amount;

         $paymentIntent = $request->user()->pay($amount);

         return $this->sendResponse($paymentIntent, null);
    }
}
