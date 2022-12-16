Bài trước chúng ta đã tìm hiểu, cài đặt và sử dụng [JWT xác thực người dùng](https://viblo.asia/p/laravel-55-reactjs-phan-2-su-dung-jwt-xac-thuc-nguoi-dung-Ljy5Ved9lra). , bài tiếp theo chúng ta sẽ cùng tìm hiểu sử dụng JWTxác thực và phân trang ứng dụng.

##### Tạo bảng products run command:

> php artisan make:migration create_table_products

##### Cập nhật database/migrations create_table_products

```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableProducts extends Migration
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
            $table->string('name');
            $table->string('description');
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
        Schema::drop('products');
    }
    
}

```

##### Tạo bảng products run command

> php artisan migrate

##### Tạo models Product

> php artisan make:model Product

Tạo  dữ liệu phân cho phân trang sử dụng faker. Thêm vào function run() DatabaseSeeder.php
```
public function run() {
         \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \DB::statement('TRUNCATE TABLE products');
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $faker      = Faker\Factory::create('vi_VN');
        foreach (range(0, 50) as $indexOfProduct) {
        DB::table('products')->insert([
                'name'        => $faker->unique()->name,
                'description' => $faker->sentence,
            ]);
            echo 'Products ' . $indexOfProduct . PHP_EOL;
        }
        echo "End Product";
    }
```
##### Tạo dữ liệu trên run command cmd:
> php artisan db:seed

##### Cài đặt thư viện  phân trang.

> npm install react-js-pagination

##### Thêm & cập nhât file /products/index.js

```
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import TableRow from './TableRow';
import Pagination from "react-js-pagination";

class Index extends Component {

    constructor(props) {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwt');
        super(props);
        this.state = {
            value: '',
            items: '',
            activePage: 0,
            itemsCountPerPage: 0,
            totalItemsCount: 0,
            pageRangeDisplayed: 5,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {

        axios.get('http://localhost/blog/public/api/products?page=' + this.state.activePage)
            .then(response => {
                this.setState({
                    items: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                });
            })
    }
    handlePageChange(pageNumber) {
        axios.get(http://localhost/blog/public/api/products?page=' + pageNumber)
            .then(response => {
                this.setState({
                    items: response.data.data,
                    activePage: response.data.current_page,
                });
            })
    }


    tabRow() {
        if (this.state.items instanceof Array) {
            return this.state.items.map(function (object, i) {
                return <TableRow
                    obj={object} st={this.state} key={i} index={i}
                />;
            }, this)
        }
    }

    render() {
        return (
            <div>
                <h1>Items</h1>
                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/add">Add item</Link>
                    </div>
                </div>
                <br/>
                <table className="table table_custom">
                    <thead>
                    <tr>
                        <th className='width-15 text-center'>#</th>
                        <th className='width-25'>name</th>
                        <th className='width-15'>description</th>
                        <th className='width-15'>create_at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

export default Index
```
##### Thêm & cập nhât file /products/TableRow.js
```
import React, {Component} from 'react';

class TableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.created_at}
                </td>

            </tr>
        );
    }
}

export default TableRow;
```

##### Cập nhât routes/RouterPath.js
```
import React, {Component} from 'react';
import Home from '../view/Home/Home'
import {Route, Switch} from 'react-router-dom';
import CreateItem from '../view/Item/Add';
import ListItem from '../view/Item/index';
import EditItem from '../view/Item/Edit';
import Login from '../view/Auth/login';

class RouterPath extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/index' component={ListItem}/>
                    <Route exact path='/login' component={Login}/>
                </Switch>
            </main>
        )
    }
}

export default RouterPath
```

##### Tạo ProductsController

> php artisan make:controller ProductsController --resource

##### Cập nhật function index() ProductsController
```
    public function index()
    {
        $items = Product::paginate(10);
        return response()->json($items);
    }
```
##### Cập nhật file Example.js 

```
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Redirect} from 'react-router-dom';
import RouterPath from '../routes/RouterPath';

export default class Example extends Component {
    render() {
        let login = localStorage.getItem('jwt');
        if (!login) {
            console.log('here');
            return (
                <HashRouter>
                    <div>
                        <Redirect to='login'/>
                        <RouterPath/>
                    </div>
                </HashRouter>
            )
        }
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/index'}>List</Link>
                        </li>
                    </ul>
                    <RouterPath/>
                </div>
            </HashRouter>
        )
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(
        <Example/>,
        document.getElementById('example'));
}

```
##### Cập nhật routes/api.php
```
Route::group(['middleware' => ['jwt-auth']], function () {
    Route::resource('products', ProductsController::class);
});
Route::post('/login', 'ApiController@login');
```
##### Build source
> npm run dev
##### Kết  quả:
http://localhost/blog/public
Tiến hành đăng nhập với user đã có từ phần trước.

Usernam: user@gmail.com

Password: secret

Đăng  nhập thành công sẽ được chuyển đến màn hình list.