Hê lô những người anh em, như tiêu đề bài viết có nói AdonisJs mang dòng máu Nodejs nhưng lại có hình hài Laravel  vì sao vậy ?
Cùng tìm hiểu để biết tại sao nhé.
# Giới thiệu
AdonisJs  là một NodeJs  framework  MVC nó kế thừa những tính năng nổi bật của nodeJs nhưng lại được thiết kế giống Framework laravel
## Điểm mạnh
Nhờ thừa hưởng, kết hợp những tính năng nổi bật của nodeJs và laravel nên AdonisJs khá mạnh mẽ.
* Tương tác mạnh mẽ trong cơ sở dữ liệu hỗ trợ tốt PostgreSQL, SQLite, MySQL, MariaDB, Oracle, MSSQL
* Api và cơ chế xác thực
* Dẽ dàng gửi mail với SMTP hoặc các dịch vụ khác
* Cho phép validate input đầu vào
* Bảo mật cao
* Dễ dàng mở rộng
* Tương tác tốt với file excel, doc ...
* Code tổ chức theo mô hình MVC
## Cài đặt
### Yêu cầu 
ở phiên bàn 4.1 thì yêu cầu như sau
* Node.js >= 8.0.0
* npm >= 3.0.0
### Cài đặt thông qua  AdonisJs CLI
Cài đặt bằng lệnh
```
npm install -global @adonisjs/cli
```
Tiếp tục tạo project bằng lệnh
```
adonis new name-project
```
![](https://images.viblo.asia/1f299727-d2e6-43a4-a982-3b010b3ad420.png)
sau khi cài đặt xong project thì ta cd vào thư mục project và run project bằng lệnh
```
adonis serve name-project
```
Truy cập vào cổng đã run bạn sẽ thấy welcome page.
## Cấu trúc thư mục
Sau khi cài đặt thành công  thì ta mở code lên xem thử cấu trúc thư mục. 
![](https://images.viblo.asia/373c3a5e-e488-474c-a80f-edd020739c02.png)
### App
Đầu tiên là thư mục app, đây là nơi chứa các Controller, Models, Validators

về cơ bản các Controller, Models, cũng giống như trong laravel, còn Validators tương ứng với validate Request trong laravel

**Controller**
Là nơi sử lý các logic

ta có thể xem qua một controller hoàn chỉnh đầy đủ chức năng thêm , xem, sửa, xóa

``` php
'use strict'

const Post = use('App/Models/Post')

const { validate } = use('Validator') 

class PostController {

  async index({ view }) {
    const posts = await Post.all()

    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async show({ params, view }) {
    const post = await Post.find(params.id)

    return view.render('posts.details', {
      post: post
    })
  }

  async create({ view }) {
    return view.render('posts.add')
  }

  async store({ request, response, session }) {
    // Validate input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if(validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new Post()

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post Added!' })

    return response.redirect('/posts')
  }

  async edit({ params, view }) {
    const post = await Post.find(params.id)

    return view.render('posts.edit', {
      post: post
    })
  }

  async update({ params, request, response, session }) {
    // Validate input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if(validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await Post.find(params.id)

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notification: 'Post Updated!' })

    return response.redirect('/posts')
  }

  async destroy({ params, session, response }) {
    const post = await Post.find(params.id)

    await post.delete()

    session.flash({ notification: 'Post Deleted!' })
    
    return response.redirect('/posts')
  }
}

module.exports = PostController
```
**Validators**
nơi kiểm tra dữ liệu đầu vào của các request 
ví dụ: file validate storeUser
```php
'use strict'

const BaseValidate = use('App/Validators/BaseValidate')

class StoreUser extends BaseValidate {
  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      is_admin: 'boolean',
      gender: 'in:male,female,other',
    }
  }
}

module.exports = StoreUser

```
**Lucid Model**

Model cũng hỗ trợ Relationships tương tự như laravel bao gồm:
* Has One
* Has Many
* Belongs To
* Belongs To Many
* Many Through
* Querying data
* EagerLoading
* Lazy eager loading
* Filtering data
* Counts
* Inserts, Updates & Deletes
cách định nghĩa các quan hệ trong model cũng rất đơn giản 
ví dụ quan hệ 1-1 giữa bảng users với bảng profiles
```
const Model = use('Model')
​
class User extends Model {
  profile () {
    return this.hasOne('App/Models/Profile')
  }
}
​
module.exports = User
```
### Config

Đây là thư mục chứa các thiết lập cấu hình cho project, có sẵn các cấu hình session, database, auth...

Có thể tạo các file config khác rất thuận tiện cho việc thay đổi các thiết lập.
### Database

Đây là thư mục quản lý database, các thao tác với các bảng dữ liệu, tạo dữ liệu mẫu..

Adonis có sử dụng được cả Query builder và Eloquen ORM như laravel. và hỗ trợ tốt PostgreSQL, SQLite, MySQL, MariaDB, Oracle, MSSQL

tạo bảng bằng lệnh đơn giản

`adonis make:migration BlogPost`

### Public

Chứa các tài nguyên mà trình duyệt (browser) có thể truy cập như JS, CSS, hình ảnh...

### Resources

Thư mục resources chứa các chứa các file view xuất giao diện người dùng.

có thể tạo một file view bằng lệnh `adonis make:view home`

### Start

bao gồm 

**app** : nơi đăng ký các providers, đăng ký commands và aliases

**kernel** : nơi đăng ký các HTTP Middleware 

**router**: nới định nghĩa các HTTP routes

router Adonis cũng theo chuẩn REST conventions, tất cả router của ứng dụng được đăng ký ở start/routes.js

router sử dụng HTTP methods (get, post, put, path, delete

Ví dụ

tạo 1 router phương thức GET
```
Route.get('/', async () => {
})
```
tạo 1 router phương thức POST
```
Route.post('/', async () => {
})
```
tạo 1 router phương thức put/patch
```
Route.put('/', async () => {
})

Route.patch('/', async () => {
})
```
tạo 1 router phương thức DELETE
```
Route.delete('/', async () => {
})
```



## Kết bài
AdonisJs là một Framework mới và rất mạnh mẽ, đây cũng là một gợi ý để bạn tìm tòi thêm 1 Framework mới, nếu bạn đã biết sẵn laravel thì tiếp cận nó khá đơn giản. Cảm ơn mn.