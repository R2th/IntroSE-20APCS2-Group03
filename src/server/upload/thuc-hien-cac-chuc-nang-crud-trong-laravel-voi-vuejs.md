Xin chào mọi người.Vuejs chắc không còn xa lạ gì với dân lập trình nữa nhỉ? vậy nên trong bài này mình sẽ không đi sâu vào tìm hiểu Vuejs là gì nhé.nếu bạn nào muốn tìm hiểu kỹ và chi tiết hơn về Vuejs thì các bạn có thể vào trang Vuejs.org để tìm hiểu.Thực tế Vuejs  là một framework dùng để xây dựng giao diện phía ngươi dùng,đang được sử dụng rất nhiều trong thời gian vài năm trở lại đây. Với những ưu điểm như: tài liệu đơn giản, dễ học,tăng tốc độ quá trình học, và đặc biệt Vuejs còn được tích hợp sẵn vào laravel.Có thể nói Vuejs và Laravel là cặp đôi hoàn hảo :)))
    Bài này mình sẽ hướng dẫn các bạn sử dụng các chức năng CRUD trong laravel  kết hợp với Vuejs.Đây là những chức năng có thể nói là cơ bản nhất khi sử dụng Laravel với Vuejs.Mình cùng bắt đầu nhé.
# CRUD với Vuejs
## Tạo project laravel mới,cài đặt Vue

các bạn mở cửa sổ CMD và chạy lệnh sau để khởi tạo project

```composer create-project --prefer-dist laravel/laravel CRUD_VUEJS "5.5.*"```


```
php artisan make:auth
```


## Cài đặt các plugin
sau khi khởi tạo xong laravel project thì các bạn chạy lệnh 

```npm install ```


để cài đặt Vue nhé.
tiếp đó sẽ chạy lệnh :

`npm install vue-resource  --save`

sau khi cài đặt xong vue thì các bạn hãy tạo hoặc thêm những file như sau đây:
##cấu hình file resource/asset/js/app.js
tại file app.js các bạn hãy cấu hình như sau để gọi đến các thư viện `Vue`
```
Vue.component('example', require('./components/ExampleComponent.vue'));


Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name = "csrf-token"]').attr('content');


import customer from './components/customers.vue'
const app = new Vue({
    el: '#app',
    components : {
    	customer
    }
});
```

## Tạo file
### customer.blade.php

Các bạn hãy tạo file `resource/views/customer.blade.php`. trong file giao diện này chúng ta sẽ gọi đến component `<customers></customers>`

```
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                   <customers></customers>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

```
### customers.vue
trong thư mục `resource/asset/js/components/ ` các bạn hãy tạo file `customers.vue`.


```
<template>
    <div>
        <form v-on:submit.prevent="createCustomer" method="post">
            <div v-bind:class="{ 'form-groupm': true, 'has-error' : errors.name }">
            <label>Name</label>
            <input type="text" v-model="customer.name" class="form-control">
            <span class="help-block" v-for= "error in errors.name" v-text="error">{{ error }}</span>
            </div>
            <div v-bind:class="{ 'form-groupm': true, 'has-error' : errors.email }">
                <label>Email</label>
                <input type="text" v-model="customer.email" class="form-control">
                <span class="help-block" v-for= "error in errors.email" v-text="error">{{ error }}</span>
            </div>
            <div v-bind:class="{ 'form-groupm': true, 'has-error' : errors.sex_id }">
                <label>Sex </label>
                <select class="form-control" v-model="customer.sex_id">
                    <option v-for="sex in sexes" v-bind:value="sex.id" v-text="sex.sex"></option>
                </select>
                <span class="help-block" v-for= "error in errors.sex_id" v-text="error">{{ error }}</span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Create New Customer">
            </div>
        </form>
        <table class=" table table-striped table-bordered table-condensed">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Sex</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <customer v-for = "customer in customers" v-bind:customer= "customer" @delete-customer="deleteCustomer"
                @update-customer="fetchCustomer">
                    
                </customer>
            </tbody>
            
        </table>
    </div>
</template>

<script>
    import customer from './customer.vue';
    export default {
        data() {
            return {
                customers : [],
                sexes : [],
                errors : [],
                customer : {
                    name : '',
                    email : ''
                }
            }
        },
        components : {
            customer
        },

        created() {
            this.fetchCustomer();
            this.fetchSex();
        },

        methods : {
            fetchCustomer() {
                this.$http.get("customer").then(response => { this.customers = response.data.customers });
             
            },
            fetchSex() {
                this.$http.get("sex").then(response => { this.sexes = response.data.sexes });
               
            },
            createCustomer(){
                this.$http.post('customer/', this.customer).then(response => {
                    this.customers.push(response.data.customer);
                    this.customer = {name: '', email : '', sex_id : '' }
                    if(this.errors) {
                        this.errors=[];
                    }
                    console.log(response.data);
                }, response=> {
                    this.errors= response.data.errors;
                });
            },
            deleteCustomer(customer){
                this.$http.delete("/customer/" + customer.id).then(response => {
                    //ham indexOf la dung de lay vi tri(chi so) cua tung gia tri trong mang
                    let index = this.customers.indexOf(customer);
                    if(confirm('do you really want to delete this customer?')) {
                        this.customers.splice(index,1);
                        console.log(response.data);
                    }
                    
                })
            }
        }
    }
</script>

```

Tại file `resource/asset/components/customers.vue` chúng ta sẽ thực hiện đẩy view ra ngoài giao diện và thực hiện CRUD.

```
data() {
            return {
                customers : [],
                sexes : [],
                errors : [],
                customer : {
                    name : '',
                    email : '',
                    sex_id : ''
                }
            }
        },
```
Phương thức data này chứa các thuộc tính của customers. sử dụng `directive v-model `để chúng ta lấy giá trị khi người dùng nhập thông tin vào một ô input tương ứng. ví dụ như:
```
<input type="text" v-model="customer.name" class="form-control">
```
Thì sau khi người dùng nhập thông tin vào thẻ input này thì thuộc tính customer.name sẽ được gán cho giá trị mà người dùng vừa nhập vào đó.Tương tự với các thuộc tính và ô input khác.

Trong thẻ `<form></form> `thì chúng ta sử dụng directive v-on để bắt sự kiện khi người dùng click vào button submit. chúng ta sử dụng `Event Modifiers`  `.prevent` để tránh load lại trang khi chúng ta click button. Khi người dùng click button submit thì phương thức `createCustomer() `sẽ được gọi đến. Và phương thức này được chúng ta định nghĩa trong methods object.

```
createCustomer(){
                this.$http.post('customer/', this.customer).then(response => {
                    this.customers.push(response.data.customer);
                    this.customer = {name: '', email : '', sex_id : '' }
                    if(this.errors) {
                        this.errors=[];
                    }
                    console.log(response.data);
                }, response=> {
                    this.errors= response.data.errors;
                });
            },
```

Phương thức này sẽ sử lý dữ liệu với Controller thông qua phương thức ` this.$http.post('customer/', this.customer)`. trong đó `customer/` đường dẫn đến file xử lý logic.(cụ thể ở đây là hàm trong controller). `this.customer` thuốc tính sẽ chứa những dữ liệu người dùng nhập vào thông qua directive v-model. nếu kết quả trả về là đúng thì thuộc tính customers sẽ được đẩy thêm giá trị vào trong mảng thông  qua câu lệnh  ` this.customers.push(response.data.customer);`.

Chúng ta sẽ tạo một child component là customer để thực hiện hiển thị dữ liệu ra ngoài giao diện.vào khi đó tại parent component(chính là customers.vue) chúng ta sẽ import   child component thông qua câu lệnh `import customer from './customer.vue';`. và sẽ gọi tới compoent này :
```
 <tbody>
                <customer v-for = "customer in customers" v-bind:customer= "customer" @delete-customer="deleteCustomer"
                @update-customer="fetchCustomer">
                    
                </customer>
            </tbody>
```


### customer.vue


chúng ta tạo child component resource/asset/components/customer.vue.

```
<template>
    <tr>
        <td>
            <input type="text" v-model="editForm.name" class="form-control" v-if="edit">
            <span v-else>{{ customer.name }}</span>
        </td>

        <td>
            <input type="text" v-model="editForm.email" class="form-control" v-if="edit">
            <span v-else>{{ customer.email }}</span>
        </td>

        <td>
            <select v-model="editForm.sex_id" v-if="edit" class="form-control">
                <option v-for="sex in sexes" :value="sex.id" v-text="sex.sex"></option>
            </select>
            <span v-else>{{ customer.sex }}</span>
        </td>

        <td>
            <button @click="editCustomer" type="button" class="btn btn-info btn-xs" 
            v-if="!edit">
            Edit</button>

            <button @click="cancelCustomer" type="button" class="btn btn-default btn-xs" 
            v-if="edit">
            Cancel</button>

            <button type="button" class="btn btn-info" @click="updateCustomer(customer, editForm)" v-if="edit">Update</button>

            <button type="button" @click="$emit('delete-customer', customer)" class="btn btn-danger btn-xs" v-if="!edit">Delete</button>
        </td>
    </tr>
</template>

<script>
    export default {
        props : ['customer'],
        data(){
            return {
                edit : false,
                sexes : [],
                editForm : {
                    name : '',
                    sex_id : '',
                    email : ''
                }
            }
        },

        methods : {
            editCustomer(){
                this.edit= true;
                this.editForm.name = this.customer.name;
                this.editForm.sex_id = this.customer.sex_id;
                this.editForm.email = this.customer.email;
                this.$http.get("sex").then(response => { this.sexes = response.data.sexes });
            },

            cancelCustomer(){
                this.edit = false;
                this.editForm.name='';
                this.editForm.sex_id='';
                this.editForm.email='';
            },

            updateCustomer(oldCustomer, newCustomer){
                this.$http.patch("/customer/" + oldCustomer.id, newCustomer).then(response => {
                    this.$emit('update-customer');
                    this.cancelCustomer();
                    console.log(response.data);
                })
            }
        }
    }
</script>
```

Tại customer component thì chúng ta có sử dụng `props`. props sẽ chứa các thuộc tính `customer` do parent component chuyền xuống. và các hàm `editCustomer()`, ` updateCustomer`,`cancelCustomer()` sẽ được gọi đến khi chúng ta click vào các button. `this.$emit('update-customer');` và `$emit('delete-customer', customer)` là 2 sự kiện mà child component đẩy lên phía parent component xử lý.

 ```
props : ['customer'],
        data(){
            return {
                edit : false,
                sexes : [],
                editForm : {
                    name : '',
                    sex_id : '',
                    email : ''
                }
            }
        },
```

Các bạn có để ý trong `customers.vue` chúng ta có đoạn code:
```
<customer v-for = "customer in customers" v-bind:customer= "customer" @delete-customer="deleteCustomer"
                @update-customer="fetchCustomer">
                    
                </customer>
```

`v:bind:customer `  chính là chúng ta sẽ gán giá trị của thuộc tính customer(giá trị props được truyền xuống child component ) bằng với  giá trị của customer được lấy ra thông qua vòng lặp `v-for="customer in customers"`.`@update-customer="fetchCustomer"` và `@delete-customer="deleteCustomer"` là hành động `$emit` được child component gửi lên parent component.


### customerController.php
Tạo file app\Http\controllers\ customerController.php.  trong controller này sẽ chứa các hàm xử lý để trả dữ liệu về phía component. 


```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Sex;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::join('sexes','sexes.id', '=', 'customer.sex_id')
                    ->selectRaw('customer.id,
                        customer.name,
                        customer.email,
                        sexes.id as sex_id,
                        sexes.sex')->get();
        return response()->json(["customers" => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
                'name' => 'required',
                'email' => 'required|email'
        ]);
        $customer = Customer::create($request->all());
        return response()->json(['customer' => $customer, 'message' => 'customer is created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        $customer->update($request->all());
        return response()->json(['message' => 'updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Customer::destroy($id);
        return response()->json(['message' => 'deleted successfully']);
    }

    public function sex() {
        return response()->json(['sexes' => Sex::all()]);
    }
}
```
### Customer.php
Các bạn hãy tạo Customer.php Model
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer';
    protected $fillable = ['name', 'email', 'sex_id'];
    public $timestamps = false;
}

```

###  Sex.php
Tạo Sex.php Model
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sex extends Model
{
    
}

```

### routes/web.php
cấu hình file routes/web.php như sau.

```
Route::get('/', function () {
    return view('customer');
});

Route::resource('customer', 'CustomerController');
Route::get('sex', 'CustomerController@sex');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
```
### CSDL 
Csdl chúng ta sẽ tạo ra 2 bảng là bảng Customer và Sexes

bảng customer:

![](https://images.viblo.asia/1f96525f-4f7c-4e8c-9d3e-ec19627d2e9c.png)



bảng sexes:


![](https://images.viblo.asia/35b03bd8-7cd3-4184-8734-638aa4eb0919.png)


# Kết quả 
Sau khi tạo xong những file trên. ban chạy thử chương trình.
kết quả bạn nhận được sẽ như thế này:

![](https://images.viblo.asia/c89f5d16-2422-4096-a0f4-f283cf702378.png)

chương trình này đã có đầy đủ những chức năng CRUD và đã sử dụng Vuejs để xây dựng giao diện.Việc sử dụng Vuejs để xây dựng giao diện web giúp cho trang việc thiết kế nhanh hơn khá nhiều với việc không phải viết quá nhiều code so với với xây dựng giao diện thông thương. Và lợi ích tiếp theo đó là Trang web để nên động hơn và chúng ta hoàn toàn không phải load lại trang,tạo sự thích thú hơn đối với người dùng.Sau bài này hi vọng các bạn hiểu và ứng dụng được cơ bản CRUD của laravel với Vuejs.Các bạn hãy làm theo và luyện tập thêm để hiểu rõ hơn nữa tại sao nó lại như thế nhé.