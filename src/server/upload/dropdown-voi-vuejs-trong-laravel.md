Hôm nay mình sẽ giới thiệu các bạn cách lấy dữ liệu đổ vào dropdown sử dụng vuejs trong laravel.

Bắt đầu nào.
## Bước 1:Cài đặt ứng dụng Laravel 5.8
Các bạn vào command gõ lệnh dưới đây để tạo project 
```
composer create-project --prefer-dist laravel/laravel blog
```
## Bước 2:Tạo bảng Country  
Trong bước này chúng ta thực hiện tạo migrate bằng câu lệnh:
```
php artisan make:migration create_countries_table
```
Nó sẽ sinh ra file create_countries_table.php trong đường dẫn "database/migrations" và chúng ta sẽ vào file đó và copy nội dung sau đây.
```
<?php
   
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
    
class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });
   
        Schema::create('states', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('country_id');
            $table->string('name');
            $table->timestamps();
        });
    }
   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
        Schema::dropIfExists('states');
    }
}
```

Sau khi copy nội dung vào file xong chúng ta vào command chạy lệnh sau để tạo bảng.
```
php artisan migrate
```
## Bước 3:Tạo model Country  và state Model

Vào Command chạy lệnh:
```
php artisan make:model Country
```
**app/Country.php**
```
<?php
  
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Country extends Model
{
      
}
```
Sau đó chạy tiếp: 
```
php artisan make:model State
```
**app/State.php**
```
<?php
  
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class State extends Model
{
      
}
```
## Bước 4: Tạo API
Trong bước này mình sẽ tạo 2 API lấy dữ liệu
**routes/api.php**
```
Route::get('getCountries', 'APIController@getCountries');
Route::get('getStates', 'APIController@getStates');
```
**Tạo APIController**

Trong bước này mình sẽ tạo ra 2 phương thức trong **app/Http/Controllers/APIController.php**
```
<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
use App\Country;
use App\State;
  
class APIController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function getCountries()
    {
        $data = Country::get();
   
        return response()->json($data);
    }
   
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function getStates(Request $request)
    {
        $data = State::where('country_id', $request->country_id)->get();
   
        return response()->json($data);
    }
}
```
## Bước 5: Cấu hình NPM

Trong bước này, trước tiên chúng ta phải thêm thiết lập của vue js và sau đó cài đặt npm, vì vậy hãy chạy lệnh dưới đây trong dự án của bạn.

**Cài đặt vue:**

```
php artisan preset vue
```

**Cài đặt vue:**

```
npm install
```
## Bước 6: Cập nhật Components
**resources/assets/js/components/ExampleComponent.vue**
```
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Vue Dependent Dropdown Example - ItSolutionStuff.com</div>
  
                    <div class="card-body">
                        <div class="form-group">
                            <label>Select Country:</label>
                            <select class='form-control' v-model='country' @change='getStates()'>
                              <option value='0' >Select Country</option>
                              <option v-for='data in countries' :value='data.id'>{{ data.name }}</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Select State:</label>
                            <select class='form-control' v-model='state'>
                              <option value='0' >Select State</option>
                              <option v-for='data in states' :value='data.id'>{{ data.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
   
<script>  
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return {
                country: 0,
                countries: [],
                state: 0,
                states: []
            }
        },
        methods:{
            getCountries: function(){
              axios.get('/api/getCountries')
              .then(function (response) {
                 this.countries = response.data;
              }.bind(this));
         
            },
            getStates: function() {
                axios.get('/api/getStates',{
                 params: {
                   country_id: this.country
                 }
              }).then(function(response){
                    this.states = response.data;
                }.bind(this));
            }
        },
        created: function(){
            this.getCountries()
        }
    }
</script>
```
## Bước 7: Cập nhật welcome.blade.php
**resources/views/welcome.blade.php**
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel Vue Dependent Dropdown Example - ItSolutionStuff.com</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="app">
            <example-component></example-component>
        </div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>
```
Bây giờ bạn phải chạy lệnh bên dưới để cập nhật tệp app.js:
```
npm chạy dev
```
Chúc bạn thành công.

## Tài liệu tham khảo: https://itsolutionstuff.com/post/laravel-vue-dependent-dropdown-exampleexample.html