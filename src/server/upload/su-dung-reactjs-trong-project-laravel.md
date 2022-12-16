Trong thời gian gần đây, Single Page App (SPA) đang rất được các dev ưa chuộng vì nó làm tăng trải nghiệm của người dùng rất là nhiều. Từ trước tới giờ mình cũng rất ít khi tìm hiểu về các framework js. Nhưng để bắt kịp xu thế thì mình cũng đã tự mày mò tìm hiểu chút ReacJs :D. Và với nên tảng là một người học Laravel và Laravel cũng hỗ trợ việc sử dụng ReactJs, sau khi tìm hiểu một chút thì mình cũng có thể sử dụng được ReactJs để tạo một SPA đơn giản trong một project Laravel. Hôm nay viết bài này chia sẻ với mọi người chút, nếu bạn nào muốn tìm hiểu thì có thể đọc qua, còn ai thấy mình sai ở đâu thì mình mong các bạn góp ý để mình viết :D

# Một vài yêu cầu
Để thực hiện được demo này thì có chút yêu cầu về hệ thống và kiến thức mà mình nghĩ các bạn sẽ cần phải có

* Có kiến thức cơ bản về Laravel, ReactJs
* Máy đã cài PHP, npm, Composer, Laravel, MySQL, PHP MyAdmin (có thể là những trình quản lý tương đương hoặc bạn có thể sử dụng command nếu bạn nắm vững)

# Mô tả demo
Ở demo này, mình sẽ làm 1 SPA đơn giản bao gồm hiển thị danh sách, thêm, sửa, xóa bài viết
![](https://images.viblo.asia/41ee5e40-a961-45a2-b82e-de1ea2e12b68.gif)

# Bắt đầu
Đầu tiên chúng ta cần tạo 1 project Laravel:
```
laravel new demo-reactjs
```

Sau đó, bạn hãy truy cập vào source code của project, sử dụng lệnh preset để chỉ định framework js muốn sử dụng:
```
php artisan preset react
```

Và sau đó chạy:
```
npm install
```

Tiếp tới thì chúng ta cần config file `.env`. Mọi người có kiến thức cơ bản về Laravel đều biết điều này rồi nên mình sẽ không nói lại nữa nhé. À còn một việc nữa, đó là ở đây mình sẽ sử dụng arrow function khi viết code js nên cần phải tạo 1 file `.babelrc` trong source code của project. Nội dung file sẽ như sau:
```
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
Nếu không có đoạn `"@babel/plugin-proposal-class-properties"` mà bạn sử dụng arrow function thì sẽ gặp lỗi khi run watch (Cái này lúc làm thử mình cũng mới biết :D)

# Tạo model và migration
Những thiết lập cơ bản đã xong, giờ chúng ta cần chuẩn bị db để có thể lưu dữ liệu. Nhưng đã giới thiệu thì mình sẽ chỉ làm chức năng thêm sửa xóa bài viết. Vậy ở đây mình sẽ chỉ cần 1 bảng `posts`
```
php artisan make:model Post -m
```

Vì không cần những bảng khác nên mình sẽ xóa tất cả các file trong `migrations`, chỉ giữ lại file để migrate bảng `posts`
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

Model `Post` của mình sẽ như sau: 
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

# Tạo API
Ở đây mình sẽ tạo api đơn giản, không có authenticate đâu nhé :D Nếu bạn muốn chăm chút hơn cho project này thì có thể xem cách tạo authenticate api với laravel của mình ở bài này nhé : [API Authentication với passpost trong Laravel 5.8](https://viblo.asia/p/api-authentication-voi-passpost-trong-laravel-58-aWj534r8K6m)

Trong file `api.php`, mình sẽ tạo nhưng route để xử lý những hành động cơ bản:
```php
Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('', 'PostController@index')->name('index') //Danh sách;
    Route::post('', 'PostController@store')->name('store') //Lưu;
    Route::get('{post}', 'PostController@show')->name('show') //Chi tiết;
    Route::post('{post}', 'PostController@update')->name('update') //Cập nhập;
    Route::post('delete/{post}', 'PostController@delete')->name('delete') //Xóa;
});
```

Giờ thì phải tạo `PostController`:
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
Do làm demo nhanh nên mình sẽ không validate dữ liệu ở backend :D các bạn thông cảm nha. Ở đây vì chúng ta đang tạo api nên tất các kết quả trả về đều phải để dưới dạng json

# Tạo wildcard route
Ở file `web.php`, mình sẽ viết như sau:
```php
Route::get('{path?}', 'RenderSpaView')->where('path', '[a-zA-Z0-9-/]+');
```
Đoạn này có nghĩa là sao, tức là tất cả những chuỗi url nào thỏa mạn điều kiện regex trên đều sẽ chạy vào file `RenderSpaView`.  Ở đây là mình đang để tất cả mọi trường hợp

Giờ thì phải tạo file `RenderSpaView`:
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
Giờ trong view mình sẽ tạo file `spa-view.blade.php`
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

# Tạo  các components
## App Component
Giờ bạn hãy mở thư mục `resources/js/components` sẽ thấy 1 file `Example.js`, hãy đổi file này thành `App.js`. Và bạn vào trong file `resources/js/app.js`, thay đoạn `require('./components/Example')` thành `require('./components/App')`  nhé. Giờ chúng ta sẽ phải cài thư viện: `react-router-dom` (là một thư viện định tuyến tiêu chuẩn trong react) 
```
npm install react-router-dom
```
`ant-design` (thư viện này sẽ hỗ trợ chúng ta code frontend một cách đơn giản hơn)
```
npm install antd
```

Và đây sẽ là code trong file `App.js` của mình
```javascript
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
```
Và
```
npm run watch
```
Truy cập vào đường dẫn `http://127.0.0.1:8000/` xem thử kết quả nhé :D, nếu bạn thấy chữ hello thì tức là đã thành công rồi đó

## Header component
Giờ chúng ta sẽ cần một chiếc Header đơn giản nhỉ,  mình sẽ vào đây: https://ant.design/components/page-header/ và tham khảo chút.
Tạo 1 file Header.js, mình sẽ để nút thêm bài viết để có thể chuyển tới trang tạo bài viết
```javascript
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
Giờ quay lại `App.js` và thêm component `Header` nào, không còn Hello nữa đâu nhé
```javascript
import Header from './Header';


<BrowserRouter>
    <div>
        <Header />
    </div
</BrowserRouter>
```

## Add component
Giờ chúng ta cần 1 view để thêm bài viết, vậy mình sẽ tạo ra `Add.js`
```javascript
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

Về việc tạo ra những thành phần trong form thì bạn có thể đọc ở đây để rõ thêm nhé: https://ant.design/components/form/. Ở trong function `handleSubmit`, mình cần kiểm tra xem có bất kì lỗi gì không, nếu không có thì sẽ gửi 1 request api để thêm dữ liệu. Nếu các bạn từng làm quen với các frontend framework như angular hay vue thì chắc cũng không xa lạ gì với `axios`. Còn nếu không thì bạn có thể đọc qua ở đây: [Giới thiệu về axios](https://viblo.asia/p/gioi-thieu-ve-axios-mot-http-client-dua-tren-promise-cua-javascript-maGK7MeOlj2). Ở đây nếu thêm thành công thì mình sẽ quay trở lại trang chủ, còn phát hiện lỗi thì sẽ log lỗi đó ra console.

Và giờ hãy quay lại `App.js` để bổ sung thêm route này nhé
```javascript
import Add from './Add';


<Header />
<Switch>
    <Route path='/create' component={Add} />
</Switch>
```

Bạn hãy thử ấn nút thêm bài viết và tạo thử 1 bài viết xem đã chạy tốt chưa nhé :D

## List component
Thêm được rồi thì phải có danh sách hiển thị chứ đúng không? Mình sẽ tạo `List.js` và chức năng xóa bài viết nhé
```javascript
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

Trong `componentDidMount` mình sẽ gọi api để lấu dữ liệu và lưu data lấy về vào trong state. Còn ở function `deletePost` thì mình sẽ gọi tới api xóa, xóa thành công thì sẽ có alert, fail sẽ log ra. Và đừng quên thêm route trong `App.js` nhé và hãy chạy thử các chức năng đã hoàn thiện xem sao
```javascript
import LitsPosts from './List';

<Switch>
    <Route exact path='/' component={ListPosts} />
    <Route path='/create' component={Add} />
</Switch>
```

## Edit component
Cố lên nào, tới component cuối cùng rồi. Thật ra thì bạn có thể sử dụng lại `Add.js` và thêm một thuộc tính `isUpdate` vào trong `props`  để phân biệt giữa add và edit. Nhưng mình cứ tách ra nhé. Tạo file `Edit.js`
```javascript
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

Ở đây ở trong phần render sẽ khác so với `Add` một chút là sẽ có thêm `initialValue`, thuộc tính này sẽ nhận vào giá trị mặc định ban đầu. Trong `componentDitMount` mình sẽ gọi api lấy dữ liệu, và mình dùng thuộc tính `match` trong `props` để xác định xem id của bài viết. Phần `handleSubmit` thì cũng gần tương tự như `Add`  thôi.

# Kết luận
Vậy là demo đã hoàn thành rồi, mong rằng sẽ giúp ích cho các bạn được phần nào :D Vì mình cũng không có quá nhiều thời gian làm demo này nên chưa chăm chút cho nó được lắm. Các bạn nên làm chi tiết hơn để tìm hiểu được nhiều thứ hơn nhé

Tham khảo: https://blog.pusher.com/react-laravel-application/