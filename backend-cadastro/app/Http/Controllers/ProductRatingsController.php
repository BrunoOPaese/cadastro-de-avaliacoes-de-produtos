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
            $rating = Product::findOrFail($product_id);
            $ratings = $rating->productRatings()->get();
            return response()->json($ratings, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'produto não encontrado'], 404);
        }
    }

    public function show($product_id, $id) {
        try {
            $rating = ProductRatings::findOrFail($id);
            return response()->json($rating, 200);
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

        $rating = new ProductRatings();
        $rating->name = $request->input('name');
        $rating->comment = $request->input('comment');
        $rating->grade = $request->input('grade');
        $rating->product_id = $product_id;

        $rating->save();

        return response()->json(['message' => 'Avaliação criada com sucesso'], 201);
    }

    public function update(Request $request, $product_id, $id) {
        try {
            $rating = ProductRatings::findOrFail($id);
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

        $rating->name = $request->input('name');
        $rating->comment = $request->input('comment');
        $rating->grade = $request->input('grade');
        

        $rating->save();

        return response()->json(['message' => 'produto atualizado com sucesso'], 200);
    }

    public function destroy($product_id, $id) {
        try {
            $rating = ProductRatings::findOrFail($id);
            $rating->delete();
            return response()->json($rating, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Eegistro não encontrado'], 404);
        }
    }
}
