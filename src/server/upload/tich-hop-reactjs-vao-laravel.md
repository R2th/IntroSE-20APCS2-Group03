Chào mn, trong bài viết này mình xin chia sẻ cho các bạn cách để tạo một project đơn giản kết hợp giữa Reactjs và Laravel.
Trước khi đi cụ thể vào từng bước để tạo một project thì có chút yêu cầu về hệ thống và kiến thức mà mình nghĩ các bạn sẽ cần phải có: 

- Có kiến thức cơ bản về Laravel, ReactJs
- Máy đã cài Php, Composer, Mysql, Nodejs , Mysql Workbench (có thể là những trình quản lý tương đương hoặc bạn có thể sử dụng command nếu bạn nắm vững)


Kết thúc bài viết bạn sẽ làm được những điều sau:

- How to connect Laravel API to ReactJS
- How to define Laravel and ReactJS Project structure.
- How to use Laravel Mix to make ReactJS Scaffold.

# Các bước cài đặt

Ở đây, mình sẽ làm 1 app đơn giản bao gồm hiển thị danh sách, thêm, sửa, xóa bài viết.
## Initial

Đầu tiền ta chạy lệnh khởi tạo 1 project laravel nhé :
```
$ composer create-project laravel/laravel laravel-reactjs
```

![](https://images.viblo.asia/5d06627e-1b02-4191-9099-11e93c8fb5f1.png)

Sau đó, cd vào thư mục gốc của project, sử dụng lệnh preset để chỉ định **framework js** muốn sử dụng  (ở đây mình dùng reactjs) :

Đối với Laravel 7+ 
```
composer require laravel/ui
php artisan ui react
```

Đối với Laravel 5.5+ 
```
php artisan preset react
```

Sau khi cài đặt xong, chúng ta cần cài đặt các phụ thuộc Javascript project của chúng ta. Mặc định, file package.json đã có sẵn, nên chúng ta chỉ cần gõ lệnh sau để lấy các gói của NPM ( có thể dùng yarn để thay thế ):
```
npm install
```

Bây giờ chúng ta thay đổi database, vào MySQL work bench và tạo một database. Tiếp đến file .env và nhập nội dung database bạn vừa tạo vào.
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_reactjs
DB_USERNAME=root
DB_PASSWORD=mysql
```

À còn một việc nữa, đó là ở đây mình sẽ sử dụng arrow function khi viết code js nên cần phải tạo 1 file .babelrc trong source code của project. Nội dung file sẽ như sau:

```php
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

Nếu không có đoạn "@babel/plugin-proposal-class-properties" mà bạn sử dụng arrow function thì sẽ gặp lỗi khi run watch.

## Tạo model và migration
Những thiết lập cơ bản đã xong, giờ chúng ta cần chuẩn bị db để có thể lưu dữ liệu. Nhưng đã giới thiệu thì mình sẽ chỉ làm chức năng thêm sửa xóa bài viết. Vậy ở đây mình sẽ chỉ cần 1 bảng posts
```
php artisan make:model Post -m
```
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('content');
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
        Schema::dropIfExists('posts');
    }
}
```
Model Post của mình sẽ như sau:
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
    ];
}
```
Xong xuôi mọi thứ thì migrate thôi:
```
php artisan migrate
```
## Tạo Router API
Ở đây mình sẽ tạo api đơn giản, không có authenticate đâu nhé. Trong file api.php, mình sẽ tạo nhưng route để xử lý những hành động cơ bản:
```php
Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('', 'PostController@index')->name('index') //Danh sách;
    Route::post('', 'PostController@store')->name('store') //Lưu;
    Route::get('{post}', 'PostController@show')->name('show') //Chi tiết;
    Route::post('{post}', 'PostController@update')->name('update') //Cập nhập;
    Route::post('delete/{post}', 'PostController@delete')->name('delete') //Xóa;
});
```
Tạo thêm PostController nè:
```
php artisan make:controller PostController
```
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderBy('id', 'desc')->get();

        return response()->json($posts, 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $post = Post::create($data);

        return response()->json($post, 200);
    }

    public function show(Post $post)
    {
        return response()->json($post, 200);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->all();
        $post->update($data);

        return response()->json($post, 200);
    }

    public function delete(Post $post)
    {
        $post->delete();
        $posts = Post::orderBy('id', 'desc')->get();

        return response()->json($posts, 200);
    }
}
```

Mình sẽ không validate dữ liệu ở backend nha. Ở đây vì chúng ta đang tạo api nên tất các kết quả trả về đều phải để dưới dạng json.
## Tạo wildcard route
Ở file web.php, mình sẽ viết như sau:

```php
Route::get('{path?}', 'RenderSpaView')->where('path', '[a-zA-Z0-9-/]+');
```
Mục đích làkhi bạn gõ chuỗi url bất kì nào thỏa mạn điều kiện regex trên đều sẽ chạy vào file RenderSpaView.

Giờ thì phải tạo file RenderSpaView:
```
php artisan make:controller RenderSpaView
```
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RenderSpaView extends Controller
{
    public function __invoke()
    {
        return view('spa-view');
    }
}
```
Giờ trong view mình sẽ tạo file spa-view.blade.php
```php
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel & React</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app"></div>

<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
```
## Tạo các components
### App Component
Giờ bạn hãy mở thư mục resources/js/components sẽ thấy 1 file Example.js, hãy đổi file này thành App.js. Và bạn vào trong file resources/js/app.js, thay đoạn require('./components/Example') thành require('./components/App') nhé. Giờ chúng ta sẽ phải cài thư viện: react-router-dom (là một thư viện định tuyến tiêu chuẩn trong react)

```
npm install react-router-dom
```

Ta cũng sẽ cài *ant-design* (thư viện này sẽ hỗ trợ chúng ta code frontend một cách đơn giản hơn)

```
npm install antd
```

Và đây sẽ là code trong file App.js của mình

```php
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    Hello
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
Giờ bạn hãy chạy
```
php artisan serve
npm run watch
```
Truy cập vào đường dẫn http://127.0.0.1:8000/ xem thử kết quả nhé 😄, nếu bạn thấy chữ hello thì tức là đã thành công rồi đó.

### Header component
Giờ chúng ta sẽ cần một chiếc Header đơn giản nhỉ, mình sẽ vào đây: https://ant.design/components/page-header/ và tham khảo chút. Tạo 1 file Header.js, mình sẽ để nút thêm bài viết để có thể chuyển tới trang tạo bài viết
```php
import React from 'react';
import {Link} from 'react-router-dom'
import {PageHeader, Button} from 'antd';

class Header extends React.Component {
    render() {
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Bài viết"
                    extra={[
                        <Link to='create'>
                            <Button key="1" type="primary">
                                Thêm bài viết
                            </Button>
                        </Link>
                    ]}
                />
            </div>
        );
    }
}

export default Header;
```

Giờ quay lại App.js và thêm component Header nào, không còn Hello nữa đâu nhé

```php
import Header from './Header';

<BrowserRouter>
    <div>
        <Header />
    </div
</BrowserRouter>
```
### AddPost component
Giờ chúng ta cần 1 view để thêm bài viết, vậy mình sẽ tạo ra Add.js
```js
import React from 'react';
import axios from 'axios'
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

class Add extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = e => {
        e.preventDefault();
        const {form, history} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                axios.post('/api/posts', values)
                    .then(response => {
                        history.push('/')
                    })
                    .catch(error => {
                       console.log(error);
                    })
            }
        });
    };

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;

        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Tên bài viết">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Vui lòng nhập tên bài viết!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Nội dung">
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }],
                    })(<TextArea rows={6} />)}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedAdd = Form.create({ name: 'addForm' })(Add);

export default WrappedAdd;
```

Về việc tạo ra những thành phần trong form thì bạn có thể đọc ở đây để rõ thêm nhé: https://ant.design/components/form/. Ở trong function handleSubmit, mình cần kiểm tra xem có bất kì lỗi gì không, nếu không có thì sẽ gửi 1 request api để thêm dữ liệu. Nếu các bạn từng làm quen với các frontend framework như angular hay vue thì chắc cũng không xa lạ gì với axios. Còn nếu không thì bạn có thể đọc qua ở đây: Giới thiệu về axios. Ở đây nếu thêm thành công thì mình sẽ quay trở lại trang chủ, còn phát hiện lỗi thì sẽ log lỗi đó ra console.

Và giờ hãy quay lại App.js để bổ sung thêm route này nhé

```js
import Add from './Add';


<Header />
<Switch>
    <Route path='/create' component={Add} />
</Switch>
```

Bạn hãy thử ấn nút thêm bài viết và tạo thử 1 bài viết xem đã chạy tốt chưa nhé 😄
### ListPost component
Thêm được rồi thì phải có danh sách hiển thị chứ đúng không? Mình sẽ tạo List.js và chức năng xóa bài viết nhé
```php
import React from 'react';
import {Link} from 'react-router-dom'
import {Button, List} from 'antd';
import axios from 'axios'

class ListPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get('/api/posts').then(response => {
            this.setState({
                data: response.data
            })
        })
    }

    deletePost = (id) => {
        axios.post(`/api/posts/delete/${id}`)
            .then(response => {
                alert('Xoa thanh cong');
                this.setState({
                    data: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {
        const {data} = this.state;

        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.content}
                        />
                        <Link to={`edit/${item.id}`}>
                            <Button type="primary">
                                Chỉnh sửa
                            </Button>
                        </Link>
                        <Button type="danger" onClick={() => this.deletePost(item.id)}>
                            Xóa
                        </Button>
                    </List.Item>
                )}
            />
        );
    }
}

export default ListPosts;
```

Trong componentDidMount mình sẽ gọi api để lấu dữ liệu và lưu data lấy về vào trong state. Còn ở function deletePost thì mình sẽ gọi tới api xóa, xóa thành công thì sẽ có alert, fail sẽ log ra. Và đừng quên thêm route trong App.js nhé và hãy chạy thử các chức năng đã hoàn thiện xem sao

```js
import LitsPosts from './List';

<Switch>
    <Route exact path='/' component={ListPosts} />
    <Route path='/create' component={Add} />
</Switch>
```

### EditPost component

Cố lên nào, tới component cuối cùng rồi. Thật ra thì bạn có thể sử dụng lại Add.js và thêm một thuộc tính isUpdate vào trong props để phân biệt giữa add và edit. Nhưng mình cứ tách ra nhé. Tạo file Edit.js

```js
import React from 'react';
import axios from 'axios'
import {Form, Input, Button} from 'antd';

const {TextArea} = Input;

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const {match} = this.props;

        axios.get(`/api/posts/${match.params.id}`).then(response => {
            this.setState({
                data: response.data
            })
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const {form, history, match} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                axios.post(`/api/posts/${match.params.id}`, values)
                    .then(response => {
                        alert('thanh cong');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    };

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        const {data} = this.state;

        return (
            <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={this.handleSubmit}>
                <Form.Item label="Tên bài viết">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Vui lòng nhập tên bài viết!'}],
                        initialValue: data.title
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Nội dung">
                    {getFieldDecorator('content', {
                        initialValue: data.content,
                        rules: [{required: true, message: 'Vui lòng nhập nội dung bài viết!'}],
                    })(<TextArea rows={6}/>)}
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button type="primary" htmlType="submit">
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedEdit = Form.create({name: 'editForm'})(Edit);

export default WrappedEdit;
```

Ở đây ở trong phần render sẽ khác so với Add một chút là sẽ có thêm initialValue, thuộc tính này sẽ nhận vào giá trị mặc định ban đầu. Trong componentDitMount mình sẽ gọi api lấy dữ liệu, và mình dùng thuộc tính match trong props để xác định xem id của bài viết. Phần handleSubmit thì cũng gần tương tự như Add thôi.

## Done
Vậy là chia sẻ của mình kết thúc rồi, mong rằng sẽ giúp cho các bạn phần nào. Vì mình cũng không có nhiều thời gian, nên cũng không làm được chỉnh chu, nếu có sai sót mong mọi người bỏ qua cho mình.