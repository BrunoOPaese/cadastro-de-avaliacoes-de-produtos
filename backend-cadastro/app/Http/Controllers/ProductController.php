<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Product;

class ProductController extends Controller
{
    public function __construct()
    {
        
    }

    public function index() {
        $products = Product::all();
        return response()->json($products, 200);
    }

    public function show($id) {
        try {
            $product = Product::findOrFail($id);
            return response()->json($product, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Eegistro não encontrado'], 404);
        }
    }

    public function create(Request $request) {
        $rules = [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'active' => 'required|boolean'
        ];
        
        $messages = [
            'name.required' => 'O atributo name é obrigatório',
            'description.required' => 'O atributo description é obrigatório',
            'price.required' => 'O atributo price é obrigatório',
            'price.numeric' => 'O atributo price é numerico',
            'active.required' => 'O atributo active é obrigatório',
            'active.boolean' =>  'O atributo active é booleano'
        ];

        $this->validate($request, $rules, $messages);

        $product = new Product();
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->active = $request->input('active');

        $product->save();

        return response()->json(['message' => 'produto cadastrado com sucesso'], 201);
    }

    public function update(Request $request, $id) {
        try {
            $product = Product::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'produto não encontrado'], 404);
        }
        $rules = [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'active' => 'required|boolean'
        ];
        
        $messages = [
            'name.required' => 'O atributo name é obrigatório',
            'description.required' => 'O atributo description é obrigatório',
            'price.required' => 'O atributo price é obrigatório',
            'price.numeric' => 'O atributo price é numerico',
            'active.required' => 'O atributo active é obrigatório',
            'active.boolean' =>  'O atributo active é booleano'
        ];

        $this->validate($request, $rules, $messages);

        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->active = $request->input('active');

        $product->save();

        return response()->json(['message' => 'produto atualizado com sucesso'], 200);
    }

    public function destroy($id) {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json($product, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => $id], 404);
        }
    }
}
