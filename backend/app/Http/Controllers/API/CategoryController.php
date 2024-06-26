<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }

    public function allCategory()
    {

        $category = Category::where('status', '1')->get();
        return response()->json([
            'status' => 200,
            'category' => $category
        ]);
    }
    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No category id found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'meta_title' => 'string|required|max:191',
            'meta_keyword' => 'max:191',
            'meta_description' => 'max:191',
            'slug' => 'required|string|max:191',
            'name' => 'required|string|max:191'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ]);
        } else {
            $category = Category::find($id);
            if ($category) {


                $category->meta_title = $request->input('meta_title');
                $category->meta_description = $request->input('meta_description');
                $category->meta_keyword = $request->input('meta_keyword');
                $category->slug = $request->input('slug');
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->status = $request->input('status') == true ? 1 : 0;

                if($request->hasFile('image')){
                    $path=$category->image;
                    if(File::exists($path))
                    {
                        File::delete($path);
                    }
                    $file=$request->file('image');
                    $extenstion=$file->getClientOriginalExtension();
                    $fileName=time().'.'.$extenstion;
                    $new_path='uploads/categories/';
                    $file->move($new_path,$fileName);
                    $category->image=$new_path.$fileName;
                }

                $category->save();

                return response()->json([
                    'status' => 200,
                    'message' => "Category updated successfully"
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Category with $id not found"
                ]);
            }
        }

    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meta_title' => 'string|required|max:191',
            'meta_keyword' => 'max:191',
            'meta_description' => 'max:191',
            'slug' => 'required|string|max:191',
            'name' => 'required|string|max:191'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);
        } else {
            $category = new Category();
            $category->meta_title = $request->input('meta_title');
            $category->meta_description = $request->input('meta_description');
            $category->meta_keyword = $request->input('meta_keyword');
            $category->slug = $request->input('slug');
            $category->name = $request->input('name');
            $category->description = $request->input('description');
            $category->status = $request->input('status') == true ? 1 : 0;

            if($request->hasFile('image')){
                $path=$category->image;
                if(File::exists($path))
                {
                    File::delete($path);
                }
                $file=$request->file('image');
                $extenstion=$file->getClientOriginalExtension();
                $fileName=time().'.'.$extenstion;
                $new_path='uploads/categories/';
                $file->move($new_path,$fileName);
                $category->image=$new_path.$fileName;
            }

            $category->save();

            return response()->json([
                'status' => 200,
                'message' => "Category added successfully"
            ]);
        }


    }

    public function destory($id)
    {
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Category deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ]);
        }
    }
}