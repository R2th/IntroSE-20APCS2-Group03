### Mở đầu
Xin chào các bạn , tiếp tục với series vuex, bài trước mình đã giới thiệu về Vue Router, hôm nay mình sẽ hướng dẫn các bạn làm một ứng dụng nhỏ với những kiến thức cơ bản add, edit, delete, show với Vuex sử dụng server api dùng Laravel.
### Chuẩn bị

Chú ý: Bài này thực hành nhiều nên sẽ có nhiều code (cẩn thận hoa mắt :D): <br>
Đầu tiên chúng ta sẽ cài Laravel và vuex, vue router như sau: (mình sử dụng Laravel 5.8 nhé)
```shell:js
composer create-project --prefer-dist laravel/laravel example 5.8 //cài laravel 
```
Vào thư mục example install các package js. 
```php:js
cd example
npm install
```
Để chạy được lệnh npm các bạn cần cài Nodejs và npm nhé.
Tiếp theo chạy câu lệnh để cài đặt vue router
```shell:js
npm install --save vue-router
```
Và cuối cùng Vuex :D
```markdown:js
npm install --save vuex
```
VueX được biết đến như một thư viện giúp bạn quản lý trạng thái các component trong VueJS, đây cũng là nơi lưu trữ tập trung cho tất cả các component trong một ứng dụng với nguyên tắc trạng thái chỉ có thể được thay đổi theo kiểu có thể dự đoán. (Trong phần này mình sẽ không đi sâu về lý thuyết về Vuex là gì, có gì hay như nào, các bạn tự tìm hiểu trên google nhé :D)

cài thư viện axios để call api nữa:

```markdown
npm install --save axios
```

Nói dài dòng vậy thôi nhưng bạ cứ copy lệnh vào terminal là chạy vù vù nhanh lắm :D.

#### Chuẩn bị API
Trong bài này mình sẽ tạo ứng dụng thêm, sửa xóa, xem product nhé. 
Config database tại file .env
```python:js
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

- Tạo model và migration cho Product:
```php
php artisan make:model Product -m
//câu lệnh này sẽ tạo ra cho chúng ta cả model và migration
```
- Vào file migration sửa lại như sau:
```php
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('price');
            $table->timestamps();
        });
    }
```
 Đơn giản vậy thôi nhé. :D
-  Vào file Model Product sửa lại fillable như sau:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price'
    ];
}

```
- Sau đó chạy lệnh để laravel tạo table vào db nhé.
```php
php artisan migrate
```
- Tiếp theo tạo một resource controller cho product:
```php
php artisan make:controller ProductController -r
```
- Ta chuẩn bị luôn các API cho việc thêm, sửa, xóa và xem product nhé. <br>

Vào file ProducController sửa lại như sau: <br>

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products  = Product::all();

        return response()->json($products);
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
        $product = Product::create($request->all());

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found']);
        }

        return response()->json($product);
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
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found']);
        }

        $product->update($request->all());

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found']);
        }

        $product->delete();

        return response()->json('delete success');
    }
}
```
Vậy là xong phần API. Tiếp đến sẽ đến phần FE là Vuex nhé. 
### Giao diện FE Vuex
Cấu trúc thư mục sẽ chia như sau: (Các bạn có thể tổ chức lại theo các cách khác mà bạn muốn)
![](https://images.viblo.asia/7919b2c1-033d-4b08-9658-dd86dac462c5.png)
##### api
Thư mục này sẽ lưu lại các route về api của project.
##### components
Thư mục này dùng để chứa các component của vue
##### routers
Thư mục này dùng để chứa các router của project
##### stores
Thư mục này sẽ chứa các file store của Vuex <br>

Vào chi tiết của thư mục sẽ như sau:
![](https://images.viblo.asia/ace18f16-e126-4b55-93be-d21d0ed45626.png)
- Đầu tiên các bạn tạo file view tại resources/view/product.balde.php:
```php
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Product</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <script type="text/javascript">
        window.Laravel = {!! json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
            ]) !!};
    </script>
</head>
<body>
    <div id="app"></div>

    <script src="/js/app.js"></script>
</body>
</html>
```
Bạn có thể đọc qua bài về vue router của mình tại [đây](https://viblo.asia/p/laravel-vuejs-vue-router-63vKjGXRZ2R) để hiểu chi tiết hơn nhé.
- Vào file routes/api.php:
```php
Route::resource('products', 'ProductController');
```
- Vào file routes/web.php:
```php
Route::view('/{any}', 'product')
    ->where('any', '.*');
```
Mục đích là khi ta vào bất kì route nào thì đều vào file view là product.

- Các bạn vào file api sửa lại như sau:

```javascript:js
const RESOURCE_PRODUCT = '/api/products';

export {
    RESOURCE_PRODUCT,
};
```
- Tiếp đến vào components/layouts/App.vue <br>

Xây dựng component root cho project.
```html:js
<template>
        <div class="container">
            <Header/>
            <router-view></router-view>
        </div>
</template>

<script>
    import Header from './Header';
    export default {
        components: {
            Header
        }
    }
</script>
```
- file components/layouts/Header.vue

Tạo Header cho project
```js
<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	    <div class="collapse navbar-collapse" id="navbarNav">
		    <ul class="navbar-nav">
		        <li class="nav-item active">
		        	<router-link
                        class="nav-link"
                        :class="[{active: $route.name === 'productIndex'}]"
                        :to="{name: 'productIndex'}"
                    >
                        List Product
                    </router-link>
			    </li>
			    <li class="nav-item">
			    	<router-link
                        class="nav-link"
                        :class="[{active: $route.name === 'productCreate'}]"
                        :to="{name: 'productCreate'}"
                    >
                        Create
                    </router-link>
			    </li>
		    </ul>
	    </div>
	</nav>
</template>

<script>
	export default {}
</script>
```

- Vào components/product/Create.vue

Component sửa product:
```js
<template>
	<div class="">
		<form @submit.prevent="add">
		    <div class="form-group">
			    <label for="name">Name</label>
			    <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name product" />
		    </div>
		    <div class="form-group">
			    <label for="price">Price</label>
			    <input v-model="price" type="text" class="form-control" id="price" placeholder="Enter price" />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>

<script>
	export default {
	    data: function () {
	        return {
	            name: '',
                price: '',
            }
        },
		methods: {
		    add: function() {
                this.$store.dispatch('product/addProduct', {
                    name: this.name,
                    price: this.price,
                });
                this.$router.push({name: 'productIndex'});
            }
        }
	}
</script>
```
- File components/product/Edit.vue

Component sửa product

```js
<template>
	<div class="">
		<form @submit.prevent="add">
		    <div class="form-group">
			    <label for="name">Name</label>
			    <input v-model="name" type="text" class="form-control" id="name" placeholder="Enter name product" />
		    </div>
		    <div class="form-group">
			    <label for="price">Price</label>
			    <input v-model="price" type="text" class="form-control" id="price" placeholder="Enter price" />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</template>

<script>
	export default {
	    data: function () {
	        return {
	            name: '',
                price: '',
            }
        },
		methods: {
		    add: function() {
                this.$store.dispatch('product/addProduct', {
                    name: this.name,
                    price: this.price,
                });
                this.$router.push({name: 'productIndex'});
            }
        }
	}
</script>
```
- file components/product/List.vue

component sẽ hiển thị danh sách product

```js
<template>
	<div>
		<div class="m-4">
			<h4>List Product</h4>
		</div>
		<table
            v-if="products.length"
            class="table table-hover">
			<thead>
			    <tr>
			        <th scope="col">#</th>
			        <th scope="col">Name</th>
			        <th scope="col">Price</th>
			        <th scope="col">Action</th>
			    </tr>
			</thead>
			<tbody>
			    <tr v-for="(product, index) in products" :key="product.id">
			        <th scope="row">{{ index+1 }}</th>
			        <td>{{ product.name }}</td>
			        <td>{{ product.price }}</td>
			        <td>
                        <router-link class="btn btn-primary" :to="`/products/edit/${product.id}`">Edit</router-link>
                        <input @click="deleteProduct(product.id)" class="btn btn-danger" type="button" value="Delete" />
                    </td>
			    </tr>
			</tbody>
		</table>
        <div v-else>
            <h4 class="text-center">No product</h4>
        </div>
	</div>
</template>

<script>
	export default {
	    name: 'List',
        data: function() {
	        return {}
        },
       computed: {
           products () {
               return this.$store.state.product.products;
           }
        },
        created: function () {
            this.$store.dispatch('product/fetch');
        },
        methods: {
            deleteProduct: function (id) {
	            let result = confirm('Are you sure');

	            if (!result) {
                    return;
                }

                this.$store.dispatch('product/deleteProduct', id);
            }
        }
    }
</script>
```
- Tiếp đến vào routers/productRouter.js

File này sẽ chứa các router của product

```javascript:js
const productRouter = [
    {
        path: '/products',
        component: () => import ('../components/product/List'),
        name: 'productIndex',
    },
    {
        path: '/products/create',
        component: () => import ('../components/product/Create'),
        name: 'productCreate',
    },
    {
        path: '/products/edit/:id',
        component: () => import ('../components/product/Edit'),
        name: 'productEdit',
    },
];

export default productRouter;
```

- FIle routers.js

File này sẽ import rất cả các router của project vào.
```javascript:js
import productRouter from './productRouter';

const routes = [
    ...productRouter,
];

export default routes;
```
- Tiếp đến các bạn vào stores/productStore.js <br>

File này sẽ chứa các method xử lý liên quan đến product:

```javascript:js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {RESOURCE_PRODUCT} from '../api/api';

Vue.use(Vuex);

const productStore = {
    namespaced: true,
    state: {
        products: [],
        product: {},
    },
    mutations: {
        FETCH(state, products) {
            state.products = products;
        },
        FETCH_ONE(state, product) {
            state.product = product;
        },
    },
    actions: {
        fetch({ commit }) {
            return axios.get(RESOURCE_PRODUCT)
                .then(response => commit('FETCH', response.data))
                .catch();
        },
        fetchOne({ commit }, id) {
            axios.get(`${RESOURCE_PRODUCT}/${id}`)
                .then(response => commit('FETCH_ONE', response.data))
                .catch();
        },
        deleteProduct({}, id) {
            axios.delete(`${RESOURCE_PRODUCT}/${id}`)
                .then(() => this.dispatch('product/fetch'))
                .catch();
        },
        editProduct({}, product) {
            axios.put(`${RESOURCE_PRODUCT}/${product.id}`, {
                name: product.name,
                price: product.price,
            })
            .then();
        },
        addProduct({}, product) {
            axios.post(`${RESOURCE_PRODUCT}`, {
                name: product.name,
                price: product.price,
            })
                .then();
        }
    }
};

export default productStore;
```

- File stores/store.js

File này sẽ import tất cả các store của project:
```javascript:js
import productStore from "./productStore";
import Vuex from 'vuex';

const stores = new Vuex.Store({
    modules: {
        product: productStore,
    }
});

export default stores;
```

- Và cuối cùng là file app.js
```javascript:js
require('./bootstrap');

window.Vue = require('vue');

import App from './components/layouts/App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers/routers';
import store from './stores/store';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
});
window.events = new Vue();

const app = new Vue({
    el: '#app',
    template: '<App/>',
    render: h => h(App),
    router,
    store: store,
});
```

Quay lại terminal và chạy:
```sql:js
npm run dev
or 
npm run watch (để theo dõi có file thay đổi webpack sẽ build lại cho mình luôn)
```
Và ra ngoài trình duyệt test thử xem nào:
![](https://images.viblo.asia/7de4e1ab-74cb-471d-9862-5ab2b52154c5.png)
Ngon rồi, mới đầu chưa có product nào nên nó hiện chưa có. :D <br>

Vào create, edit, delete thử xem nào :v 
![](https://images.viblo.asia/550e503c-93fe-4d57-8bdc-dec6c857a80f.gif)
### Kết
Trên đây là những hướng dẫn cơ bản để học và  thực hành  với Vuex. 
Các bạn có thể xem chi tiết về repo của mình tại [đây](https://github.com/loind-1875/viblo/tree/vuex)