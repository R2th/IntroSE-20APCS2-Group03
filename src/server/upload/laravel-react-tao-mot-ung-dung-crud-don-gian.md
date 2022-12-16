Bài viết này dành cho những bạn nào đang bắt tay vào học cách sử dụng kết hợp Laravel và React.
Qua việc làm 1 app CRUD, các bạn sẽ hiểu được luồng hoạt động cơ bản. Bắt đầu nào!
# 1. Backend:
## 1.1. Khởi tạo
Đầu tiên, chúng ta sử dụng composer để khởi tạo project với Laravel phiên bản mới nhất (ở đây của mình là Laravel 8):
```
composer create-project --prefer-dist laravel/laravel laravel-react-crud
```
Di chuyển vào thư mục chứa project:
```
cd laravel-react-crud
```

## 1.2. Config database
Để kết nối app với database, ta mở file .env và sửa một số thông tin của DB_DATABASE, DB_USERNAME, DB_PASSWORD sao cho phù hợp với database của mình.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud
DB_USERNAME=root
DB_PASSWORD=
```
## 1.3. Tạo Model, Controller và Route
```
php artisan make:model Expense --migration --resource --controller
```
Vào thư mục database/migrations và mở file migration vừa được tạo lên, sửa code như sau:
```javascript
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('description');
            $table->integer('amount');
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
        Schema::dropIfExists('expenses');
    }
}

```
Ta vừa viết migration để tạo bảng Expense, với các trường như sau:
{bảng contact}

Chạy câu lệnh migrate để tạo bảng trong database:
```
php artisan migrate
```
Migrate chạy thành công sẽ hiển thị như sau:
![](https://images.viblo.asia/6e8e9a1f-4739-42be-9c77-97744ac7c2fe.png)
Sau khi migrate thành công, bảng Expense sẽ xuất hiện trong database. 
Tiếp theo, ta thêm các routes vào file routes/api.php để kết nối với Controllers. File này sau đó sẽ có nội dung như sau:
```javascript
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/expenses', 'ExpenseController@index')->name('expenses.all');

Route::post('/expenses', 'ExpenseController@store')->name('expenses.store');

Route::get('/expenses/{expense}', 'ExpenseController@show')->name('expenses.show');

Route::put('/expenses/{expense}', 'ExpenseController@update')->name('expenses.update');

Route::delete('/expenses/{expense}', 'ExpenseController@destory')->name('expenses.destroy');
```
Mình đang sử dụng Laravel 8, trong phiên bảng này, thuộc tính $namespace trong RouteServiceProvider mặc định được đặt là null. Do đó, sẽ không có prefix namespace nào được thực hiện bởi Laravel. Định nghĩa controller route (trong file routes/api.php sẽ được xác định bằng cú pháp chuẩn của PHP như sau:
```javascript
Route::get('/expenses', [ExpenseController::class, 'index'])
```
Tuy nhiên, mình quen sử dụng prefix giống Laravel 7.x nên sẽ thêm thuộc tính $namespace vào RouteServiceProvider (app/Providers/RouteServiceProvider.php) như sau:
```javascript
Route::prefix('api')
                ->middleware('api')
                ->namespace('App\Http\Controllers')
                ->group(base_path('routes/api.php'));
```
Tiếp theo, ta định nghĩa từng hành động trong file app/Http/Controllers/ExpenseController.php
```javascript
class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $expenses = Expense::all();
        return response()->json($expenses);
    }

   

    /**
     * Store a newly created resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $expense = Expense::create($request->all());
        return response()->json(['message'=> 'expense created', 
        'expense' => $expense]);
    }

    /**
     * Display the specified resource.
     *
     * @param  AppExpense  $expense
     * @return IlluminateHttpResponse
     */
    public function show(Expense $expense)
    {
        return $expense;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  AppExpense  $expense
     * @return IlluminateHttpResponse
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @param  AppExpense  $expense
     * @return IlluminateHttpResponse
     */
    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $expense->name = $request->name();
        $expense->amount = $request->amount();
        $expense->description = $request->description();
        $expense->save();
        
        return response()->json([
            'message' => 'expense updated!',
            'expense' => $expense
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  AppExpense  $expense
     * @return IlluminateHttpResponse
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();
        return response()->json([
            'message' => 'expense deleted'
        ]);
        
    }
}
```
Tiếp theo, ta chỉ định những thuộc tính có thể được thay đổi nội dung trong database (mass-assign) bằng cách thêm các thuộc tính đó vào biến $fillable trong file app/Models/Expense.php:
```javascript
<?php


namespace App;


use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'amount'
    ];
}
```

Vậy là xong phần back-end, bây giờ ta chạy ứng dụng bằng câu lệnh `php artisan serve`, sau đó mở Postman để thử.
## 1.4. Test API bằng Postman
Do chưa có dữ liệu gì nên ta sẽ gọi đến api http://localhost:8000/api/expenses/ bằng phương thức POST trước.

Nhập url của API vào và chọn phương thức POST.
Để truyền dữ liệu vào API, chọn Body -> x-www-form-urlencoded và thêm các trường (KEY) cùng với giá trị (VALUE) của các trường đó.

API sẽ được gọi và lưu các giá trị này vào database. Khi lưu thành công, kết quả sẽ hiện ra như sau:
![](https://images.viblo.asia/db00db2c-f0c3-438a-a43d-672c8a5bcd1e.png)
Bây giờ database đã có dữ liệu, ta gọi API GET để lấy dữ liệu ra xem sao:
![](https://images.viblo.asia/9da7090f-00f9-4e98-97b5-91ac47994da8.png)
Kết quả ra giống với dữ liệu vừa được ghi vào.

Các bạn có thể thử với những API còn lại :) 
# 2. Frontend
## 2.1. Khởi tạo
Backend đã xong, giờ chúng ta hoàn thành nốt frontend, sử dụng ReactJS. Chạy câu lệnh sau để tạo khung sườn cơ bản (scaffold) cho React:
```
composer require laravel/ui
php artisan ui react
```
Sau đó compile assets bằng các lệnh sau:
```
npm install
npm run dev
```
Tiếp theo, ta cài đặt một số dependency cần thiết:
```
npm install react-router@2.8.1
npm install react-bootstrap
npm install sweetalert2 --save
```
## 2.2. Tạo components
Ở đây ta sẽ tạo các components và sử dụng axios để gọi API, tương tác với phía backend.
Trong thư mục components, tạo 3 components sau:
* create-expense.component.js
* edit-expense.component.js
* expenses-listing.component.js
và một component con:
* ExpenseTableRow.js

Tiếp theo, nhập nội dung cho các file này:

create-expense.component.js:
```javascript
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import ExpensesList from './expenses-listing.component';
import Swal from 'sweetalert2';


export default class CreateExpense extends Component {
      constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
    this.onChangeExpenseAmount = this.onChangeExpenseAmount.bind(this);
    this.onChangeExpenseDescription = this.onChangeExpenseDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      description: '',
      amount: ''
    }
  }

  onChangeExpenseName(e) {
    this.setState({name: e.target.value})
  }

  onChangeExpenseAmount(e) {
    this.setState({amount: e.target.value})
  }

  onChangeExpenseDescription(e) {
    this.setState({description: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
     const expense = {
      name: this.state.name,
      amount: this.state.amount,
      description: this.state.description
    };
    axios.post('http://localhost:8000/api/expenses/', expense)
      .then(res => console.log(res.data));
    // console.log(`Expense successfully created!`);
    // console.log(`Name: ${this.state.name}`);
    // console.log(`Amount: ${this.state.amount}`);
    // console.log(`Description: ${this.state.description}`);
    Swal.fire(
  'Good job!',
  'Expense Added Successfully',
  'success'
)

    this.setState({name: '', amount: '', description: ''})
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Row> 
            <Col>
             <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={this.state.name} onChange={this.onChangeExpenseName}/>
             </Form.Group>
            
            </Col>
            
            <Col>
             <Form.Group controlId="Amount">
                <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" value={this.state.amount} onChange={this.onChangeExpenseAmount}/>
             </Form.Group>
            </Col>  
           
        </Row>
            

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" type="textarea" value={this.state.description} onChange={this.onChangeExpenseDescription}/>
        </Form.Group>
       
        <Button variant="primary" size="lg" block="block" type="submit">
          Add Expense
        </Button>
      </Form>
      <br></br>
      <br></br>

      <ExpensesList> </ExpensesList>
    </div>);
  }
}

```
edit-expense.component.js:
```javascript
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditExpense extends Component {

  constructor(props) {
    super(props)

    this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
    this.onChangeExpenseAmount = this.onChangeExpenseAmount.bind(this);
    this.onChangeExpenseDescription = this.onChangeExpenseDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      amount: '',
      description: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/expenses/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          amount: res.data.amount,
          description: res.data.description
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeExpenseName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeExpenseAmount(e) {
    this.setState({ amount: e.target.value })
  }

  onChangeExpenseDescription(e) {
    this.setState({ description: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const expenseObject = {
      name: this.state.name,
      amount: this.state.amount,
      description: this.state.description
    };

    axios.put('http://localhost:8000/api/expenses/' + this.props.match.params.id, expenseObject)
      .then((res) => {
        console.log(res.data)
        console.log('Expense successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Expense List 
    this.props.history.push('/expenses-listing')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeExpenseName} />
        </Form.Group>

        <Form.Group controlId="Amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={this.state.amount} onChange={this.onChangeExpenseAmount} />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeExpenseDescription} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Expense
        </Button>
      </Form>
    </div>);
  }
}
```
ExpenseTableRow.js:
```javascript
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class ExpenseTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteExpense = this.deleteExpense.bind(this);
    }

    deleteExpense() {
        axios.delete('http://localhost:8000/api/expenses/' + this.props.obj.id)
            .then((res) => {
                console.log('Expense removed deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.amount}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    <Link className="edit-link" to={"/edit-expense/" + this.props.obj.id}>
                       <Button size="sm" variant="info">Edit</Button>
                    </Link>
                    <Button onClick={this.deleteExpense} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}
```
expenses-listing.component.js:
```javascript
import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ExpenseTableRow from './ExpenseTableRow';


export default class ExpenseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/expenses/')
      .then(res => {
        this.setState({
          expenses: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.expenses.map((res, i) => {
      return <ExpenseTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper"> 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
```
Tạo landing page bằng file resources/js/app.js:
```javascript
import React from "react";
import ReactDOM from 'react-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EditExpense from "./components/edit-expense.component";
import ExpensesList from "./components/expenses-listing.component";
import CreateExpense from "./components/create-expense.component";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar>
          <Container>

            <Navbar.Brand>
              <Link to={"/create-expense"} className="nav-link">
              Expense manager
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-expense"} className="nav-link">
                  Create Expense
                </Link>
                <Link to={"/expenses-listing"} className="nav-link">
                  Expenses List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateExpense} />
                <Route path="/create-expense" component={CreateExpense} />
                <Route path="/edit-expense/:id" component={EditExpense} />
                <Route path="/expenses-listing" component={ExpensesList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}

```
Sau đó, chỉnh sửa phần body của file resources/views/welcome.blade.php để kết nối với file app.js qua id "app":
```javascript
<body>
   <div id="app"></div>
   <script src="{{asset('js/app.js')}}" ></script>
</body>
```
Sau đó, ta sử dụng câu lệnh `npm run watch` để chạy front-end.
# 3. Thành quả
Chúng ta đã xong cả Backend và Frontend. Bây giờ mở đường dẫn http://localhost:8000/ lên và chiêm ngưỡng thành quả.
![](https://images.viblo.asia/5c743ba5-46d2-4c07-aa2a-0f013bec39f2.png)
Đây là toàn bộ code: https://github.com/dantokoro/laravel-react-crud.git

Chúc các bạn học tập vui vẻ :D
# Tài liệu tham khảo:
1. https://codesource.io/build-a-crud-application-using-laravel-and-react/
2. https://www.itsolutionstuff.com/post/laravel-5-simple-crud-application-using-reactjs-part-1example.html
3. https://www.itsolutionstuff.com/post/laravel-5-simple-crud-application-using-reactjs-part-2example.html
4. https://www.itsolutionstuff.com/post/laravel-5-simple-crud-application-using-reactjs-part-3example.html