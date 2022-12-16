# 1. Introduction
The best way to start learning a new programming language or a framwork is building a simple application. In this post, I'm gonna walk you through some simple steps to create a TodoList application using Laravel framework. The laravel version that I'm using at the time writing this post is Laravel 6.

# 2. Implementation
I assumed that you already have `mysql` database and the lastest `Composer` installed on your machine, if not, you can get them easily by following this post: [Laravel installation](https://laravel.com/docs/6.x/installation)

First, let's create our scaffolding laravel application by issuing this command:
```
composer create-project --prefer-dist laravel/laravel todoapp
```

After that, in your mysql database, create a database named `todoapp` and then finish configuring the `.env` file for connecting our application with the newly created database.

```
DB_DATABASE=todoapp
DB_USERNAME=root  //your database username
DB_PASSWORD= //your database password
```

Now, inside your `routes/web.php`,  declaring a resourceful route:

```php
Route::resource('tasks', 'TaskController');
```

With this single route declaration, laravel framework is gonna define seven routes for us:
```
+--------+-----------+-------------------+---------------+---------------------------------------------+--------------+
| Domain | Method    | URI               | Name          | Action                                      | Middleware   |
+--------+-----------+-------------------+---------------+---------------------------------------------+--------------+
|        | GET|HEAD  | tasks             | tasks.index   | App\Http\Controllers\TaskController@index   | web          |
|        | POST      | tasks             | tasks.store   | App\Http\Controllers\TaskController@store   | web          |
|        | GET|HEAD  | tasks/create      | tasks.create  | App\Http\Controllers\TaskController@create  | web          |
|        | GET|HEAD  | tasks/{task}      | tasks.show    | App\Http\Controllers\TaskController@show    | web          |
|        | PUT|PATCH | tasks/{task}      | tasks.update  | App\Http\Controllers\TaskController@update  | web          |
|        | DELETE    | tasks/{task}      | tasks.destroy | App\Http\Controllers\TaskController@destroy | web          |
|        | GET|HEAD  | tasks/{task}/edit | tasks.edit    | App\Http\Controllers\TaskController@edit    | web          |
+--------+-----------+-------------------+---------------+---------------------------------------------+--------------+
```

The next thing to do is generating a migration, running the following command:
```
php artisan make:migration create_tasks_table
```
This command will give us a migration file inside the `database/migrations` folder, update the content of the file as following:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('body');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
```
Saved and running this command:
```
php artisan migrate
```
Checking our database, we should see a tasks table with corresponding table columns. Now, we need to create a controller to connect those two pieces: database and routes. Running the following command:
```
php artisan make:controller TaskController --resource --model=Task
```
Because we didn't have the Task model yet, the laravel framework will ask us to create the Task model

```
A App\Article model does not exist. Do you want to generate it? (yes/no) [yes]:
> yes
```
just type yes and enter. That command will give us a controller:  `Http/Controllers/TaskController.php` and `Http/Task.php`
Inside the Task model, adding the `$fillable` property:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'body'];
}
```
This property will allow use to use the mass create/update feature.

Now, let's update the Task controller:
```php
<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::get();
        return view('tasks.index', compact('tasks'));
    }

    public function create()
    {
        return view('tasks.create');
    }

    public function store(Request $request)
    {
        Task::create([
            'title' => $request->input('title'),
            'body' => $request->input('body')
        ]);
        return redirect()->action('TaskController@index');
    }

    public function show(Task $task)
    {
        return view('tasks.show', compact('task'));
    }

    public function edit(Task $task)
    {
        return view('tasks.edit', compact('task'));
    }

    public function update(Request $request, Task $task)
    {
        $task->update([
            'title' => $request->input('title'),
            'body' => $request->input('body')
        ]);
        return redirect()->route('tasks.index');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('tasks.index');
    }
}
```
Then, creating a `layouts/app.blade.php` as the master page:
```php
<html>
    <head>
        <title>Todo</title>
    </head>
    <body>
        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```
Finally, views of the tasks controller inside the `views/tasks`
```php
#views/tasks/index.blade.php
@extends('layouts.app')

@section('content')
    <p>List of tasks</p>
    <div>
      <a href="{{ route('tasks.create')}}">Create</a>
    </div>
      @foreach($tasks as $task)
        <p>
          <a href="{{ route('tasks.show', ['task'=> $task->id]) }}">{{ $task->title }}</a> <br>
          <form action="{{ route('tasks.destroy', $task->id)}}" method="post">
             @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
            <a href="{{ route('tasks.edit', ['task'=> $task->id]) }}">Edit</a>
          </form>
        </p>
        <hr>
      @endforeach
@endsection
```

```php
#views/tasks/create.blade.php
@extends('layouts.app')

@section('content')
    <p>Create new task</p>
    <form action="{{ route('tasks.store') }}" method="post">
      @csrf
      <div>
        <label>title</label>
        <input type="text" name="title">
      </div>
      <div>
        <label>body</label>
        <input type="text" name="body">
      </div>
      <button>Submit</button>
    </form>
@endsection
```

```php
#views/tasks/edit.blade.php
@extends('layouts.app')

@section('content')
    <p>Update task</p>
    <form action="{{ route('tasks.update', $task->id ) }}" method="post">
      @csrf
      @method('PATCH')
      <div>
        <label>title</label>
        <input type="text" name="title" value="{{ $task->title }}">
      </div>
      <div>
        <label>body</label>
        <input type="text" name="body" value="{{ $task->body }}">
      </div>
      <button>Submit</button>
    </form>
@endsection
```

```php
#views/tasks/show.blade.php
@extends('layouts.app')

@section('content')
    <p>Update new task</p>
    <div>
    {{ $task->title }}
    </div>
    <div>
    {{ $task->body }}
    </div>
@endsection
```

Done!!
# 3. Conclusion
Just by making this small application, we have walked through many core concepts of the Laravel framework, from migration to controller and view, from mysql database to php code. In the next post, we're gonna learn to deal with database relation and authentication in Laravel. Thanks for reading.