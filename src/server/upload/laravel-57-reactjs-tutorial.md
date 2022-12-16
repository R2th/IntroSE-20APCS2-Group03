Trong tutorial này, chúng ta sẽ tìm hiểu react, react-route cũng như flow hoạt động của react trong laravel.

### Step 1: Setup Laravel
```
composer create-project --prefer-dist laravel/laravel laravel_react
```
#### config .env
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react_demo
DB_USERNAME=root
DB_PASSWORD=root
```
```
php artisan key:generate
php artisan migrate
```



### Step 2: Setup ReactJS Frontend


```
php artisan preset react
npm install
```
#### edit welcome.bale.php
```
<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="container">
        <div id="example"></div>
    </div>
    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>

```

```
npm run watch
```

khi run lệnh trên mỗi khi bạn save file nó sẽ auto biên dịch mã javascript đến thư mục `public/js/app.js`

```
php artisan serve
```
![](https://images.viblo.asia/900a5954-42cf-41e1-af15-1221268fc836.png)


#### install react-router

React-router được dùng để giúp việc dẫn hướng UI đồng bộ với URL.

Trong React, chỉ có 1 file HTML được gọi. Bất cứ khi nào người dùng nhập 1 đường dẫn mới, thay vì lấy dữ liệu từ server, Router sẽ chuyển sang 1 Component khác ứng với mỗi đường dẫn mới. Đối với người dùng thì họ đang chuyển qua lại giữa nhiều trang nhưng thực tế, mỗi Component đơn lẻ sẽ được render lại phụ thuộc đường dẫn

[Tìm hiểu react router v4](https://viblo.asia/p/tim-hieu-react-router-v4-WAyK81QmZxX)

```js
npm install react-router-dom --save
```

File app.js

```js
require('./bootstrap');
require('./components/Example');
```

#### edit `resources/js/components/Example.js`
```js
// resources/js/components/Example.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter , Link} from 'react-router-dom';
import RouterPath from './RouterPath';

export default class Example extends Component {
    render() {
        return (
            <HashRouter>
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                            <div className="container">
                                <a className="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
                                <div className="collapse navbar-collapse" id="navbarResponsive">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link js-scroll-trigger" to={'/'}>Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link js-scroll-trigger" to={'/about'}>About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link js-scroll-trigger" to={'/product'}>Product</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link js-scroll-trigger" to={'/topic'}>Topic</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div style={{ margin: '100px' }}><RouterPath/></div>
                </div>
            </HashRouter >
        )
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(
        <Example/>,
        document.getElementById('example'));
}


```
#### Create Home.js
path: resources/js/components/pages/Home.js
```js
import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (<div>
            <h1>Welcome to Home!</h1>
        </div>)
    }
}

export default Home

```

#### Create `About.js`
path: resources/js/components/pages/About.js
```js
import React, {Component} from 'react';

class About extends Component {
    render() {
        return (<div>
            <h1>Welcome to About!</h1>
        </div>)
    }
}

export default About
```

#### Create `Product.js`
path: resources/js/components/pages/Product.js

```
import React, {Component} from 'react';

class Product extends Component {
    render() {
        return (<div>
            <h1>Welcome to Product!</h1>
        </div>)
    }
}

export default Product

```

#### Create `Topic.js`
path: resources/js/components/pages/Topic.js

```
import React, {Component} from 'react';

class Topic extends Component {
    render() {
        return (<div>
            <h1>Welcome to Topic!</h1>
        </div>)
    }
}

export default Topic

```


#### Create `RoutePath.js`
path: resources/js/components/RoutePath.js

```js
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Topic from "./pages/Topic.js";
import Product from "./pages/Product";

class RouterPath extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/product' component={Product}/>
                    <Route exact path='/topic' component={Topic}/>
                </Switch>
            </main>
        )
    }
}

export default RouterPath

```

![](https://images.viblo.asia/21a91857-430f-406b-a3d6-ffdaac077fb0.png)
![](https://images.viblo.asia/0980bdbc-ab05-4ca1-9267-2347d98cb50f.png)
![](https://images.viblo.asia/1e3ef1b0-4928-4d55-affc-1f011aeb2ee1.png)

### Step 3: Create API

**Create products Table and Model**

```
php artisan make:migration create_products_table
```

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('body');
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
        Schema::dropIfExists('products');
    }
}
```
**Create model**
```php
php artisan make:model Product
```

```php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title', 'body'
    ];
}
```

**Create Web Route and API Route**

```php

Route::get('/', function () {
    return view('welcome');
});

Route::resource('products', 'ProductController');
```

**Create Controller**

```php
php artisan make:controller ProductController --resource
```

```php
namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

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
        $product = new Product([
            'title' => $request->get('title'),
            'body' => $request->get('body')
        ]);
        $product->save();


        return response()->json('Product Added Successfully.');
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
        $product = Product::find($id);

        return response()->json($product);
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
        $product->title = $request->get('title');
        $product->body = $request->get('body');
        $product->save();

        return response()->json('Product Updated Successfully.');
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
        $product->delete();
        
        return response()->json('Product Deleted Successfully.');
    }
}
```

#### Update file Product.js

```js
import React, {Component} from 'react';
import axios from 'axios';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', products: ''};
    }
    componentDidMount() {
        axios.get('http://localhost:8000/products')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        if(this.state.products instanceof Array){
            return this.state.products.map(function(object, i){
                return (
                    <tr key={i}>
                        <td>
                            { i }
                        </td>
                        <td>
                            { object.title }
                        </td>
                        <td>
                            { object.body }
                        </td>
                        <td>
                            <form>
                                <input type="submit" value="Edit" className="btn btn-success"/>
                            </form>
                        </td>
                    </tr>
                );
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Products List - Demo</h1>

                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <input type="submit" value="Add Product" className="btn btn-success"></input>
                    </div>
                    </div><br />
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Product Title</td>
                        <td>Product Body</td>
                        <td width="200px">Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                        { this.tabRow() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Product

```


![](https://images.viblo.asia/95489f51-2f53-4a31-b9dc-b3c60453c64c.png)

Như vậy mình đã hướng dẫn qua cách sử dụng cũng như cách hoạt động của react, react-route trong laravel, hy vọng sẽ giúp ích chp bạn. 
Thank you!!!