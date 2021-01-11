<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Product;
use App\ProductRatings;

class ProductRatingsController extends Controller
{
    public function __construct()
    {
        
    }

    public function index($product_id) {
        try {
            $product = Product::findOrFail($product_id);
            $ratings = $product->ratings()->get();
            return response()->json($ratings, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'produto não encontrado'], 404);
        }
    }

    public function show($product_id, $id) {
        try {
            $product = ProductRatings::findOrFail($id);
            return response()->json($product, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Eegistro não encontrado'], 404);
        }
    }

    public function create(Request $request, $product_id) {
        $rules = [
            'name' => 'required',
            'comment' => 'required',
            'grade' => 'required|numeric',
        ];
        
        $messages = [
            'name.required' => 'O atributo name é obrigatório',
            'comment.required' => 'O atributo comment é obrigatório',
            'grade.required' => 'O atributo grade é obrigatório',
            'grade.numeric' => 'O atributo grade é numerico'
        ];

        $this->validate($request, $rules, $messages);

        $product = new ProductRatings();
        $product->name = $request->input('name');
        $product->comment = $request->input('comment');
        $product->grade = $request->input('grade');
        $product->active = $request->input('active');

        $product->save();

        return response()->json(['message' => 'Avaliação criada com sucesso'], 201);
    }

    public function update(Request $request, $product_id, $id) {
        try {
            $product = ProductRatings::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'produto não encontrado'], 404);
        }
        $rules = [
            'name' => 'required',
            'comment' => 'required',
            'grade' => 'required|numeric',
        ];
        
        $messages = [
            'name.required' => 'O atributo name é obrigatório',
            'comment.required' => 'O atributo comment é obrigatório',
            'grade.required' => 'O atributo grade é obrigatório',
            'grade.numeric' => 'O atributo grade é numerico'
        ];

        $this->validate($request, $rules, $messages);

        $product = new Product();
        $product->name = $request->input('name');
        $product->comment = $request->input('comment');
        $product->grade = $request->input('grade');
        $product->active = $request->input('active');

        $product->save();

        return response()->json(['message' => 'produto atualizado com sucesso'], 200);
    }

    public function delete($product_id, $id) {
        try {
            $product = ProductRatings::findOrFail($id);
            $product->delete();
            return response()->json($product, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Eegistro não encontrado'], 404);
        }
    }
}
