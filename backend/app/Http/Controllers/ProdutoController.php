<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index()
    {
        return response()->json(Produto::all());

        $limit = $request->query('limit');
        $perPage = $request->query('per_page', 10);
        
        if ($limit) {
                $produtos = Produto::latest()->take($limit)->get();
                return response()->json($produtos);
            }

        $produtos = Produto::latest()->paginate($perPage);
            return response()->json($produtos);
    }

    public function store(Request $request)
    {
        $produto = Produto::create($request->all());
        return response()->json($produto, 201);
    }

    public function show($id)
    {
        $produto = Produto::findOrFail($id);
        return response()->json($produto);
    }

    public function update(Request $request, $id)
    {
        $produto = Produto::findOrFail($id);
        $produto->update($request->all());
        return response()->json($produto);
    }

    public function destroy($id)
    {
        Produto::destroy($id);
        return response()->json(['message' => 'Produto removido com sucesso!']);
    }
}
