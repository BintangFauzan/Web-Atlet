<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cabor;
use Exception;
use Illuminate\Http\Request;

class CaborController extends Controller
{
    public function index(){
        $cabor = Cabor::with('team')->latest()->paginate(15);
        return response()->json([
            'status' => true,
            'data' => $cabor
        ]);
    }

    public function store(Request $request){
       try{
         $validate = $request->validate([
            'nama_cabor' => 'required'
        ]);
        $cabor = Cabor::create($validate);
        return response()->json([
            'status' => true,
            'message' => 'Berhasil tambah cabor',
            'data' => $cabor
        ]);
       }catch(Exception $err){
        return response()->json([
            'status' => false,
            'message' => 'Gagal tambah cabor',
            'error' => $err->getMessage()
        ]);
       }
    }

    public function update(Request $request, $id){
        try{
            $validate = $request->validate([
                'nama_cabor' => 'required'
            ]);
            $cabor = Cabor::findOrFail($id);
            $cabor->update($validate);

            return response()->json([
                'status' => true,
                'messsage' => 'Berhasil update data',
                'data' => $cabor
            ]);
        }catch(Exception $err){
            return response()->json([
                'status' => false,
                'message' => 'Gagal update cabor',
                'error' => $err->getMessage()
            ]);
        }
    }

    public function destroy($id){
        $cabor = Cabor::findOrFail($id);
        $cabor->delete();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil hapus cabor',
            'data' => $cabor
        ]);
    }
}
