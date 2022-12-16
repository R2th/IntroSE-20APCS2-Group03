![](https://images.viblo.asia/17183818-5bbe-4da4-9c40-3b0f768dc2e5.png)

Xin chào các bạn!

Nếu bạn nào đã quen với mô hình MVC thì có thể nhận ra ngay, công cụ express-generator giúp chúng ta tạo ra ứng dụng gần như giống với MVC gồm thư mục **views**, **routes** mà mình đã giải thích ở [bài trước](https://chauit.com/tao-khung-ung-dung-express-bang-express-generator/). Trong bài này, mình sẽ đi chi tiết hơn về MVC và chia sẻ cho các bạn cách để vận hành Express đúng theo đúng mô hình MVC nhé.
### 1. Tổng quan mô hình MVC
Mô hình MVC (Model – View – Controller) là một kiến trúc phần mềm hay mô hình thiết kế được sử dụng trong kỹ thuật phần mềm. Nó giúp tách ứng dụng thành 3 phần khác nhau: Model (Xử lý dữ liệu), View (Hiển thị) và Controller (Điều khiển). Mỗi thành phần có một nhiệm vụ riêng biệt và độc lập với nhau.

* Model

>  Dùng để cung cấp dữ liệu, thực hiện kết nối, các thao tác với dữ liệu như: thêm, sửa, xóa, lọc ,… truy vấn dữ liệu trong database, tương tác với dữ liệu hay hệ quản trị cơ sở dữ liệu.

* View
> Đảm nhận việc hiển thị thông tin, giúp người dùng tương tác với hệ thống. Hiểu một cách đơn giản, nó là tập hợp các file HTML.

* Controller
> Giữ nhiệm vụ tiếp nhận điều hướng các yêu cầu từ người dùng, giúp lấy dữ liệu đúng với những thông tin cần thiết nhờ vào các nghiệp vụ lớp Model cung cấp và hiển thị các dữ liệu đó ra cho người dùng.


Đây là một cách đơn giản để mô tả lại luồng sự kiện được xử lý trong MVC:

– User tương tác với View như nhập form, click submit.

– Controller nhận và điều hướng chúng đến đúng phương thức xử lý ở Model.

– Model nhận thông tin và thực thi các yêu cầu.

– Khi Model hoàn tất xử lý, View sẽ nhận kết quả từ Model và hiển thị lại cho người dùng.

Việc tách riêntg vai trò của **Controller**, **Model** và **View** giúp cho cho chúng ta phân định rõ ràng các công việc xử lý nghiệp vụ, xử lý dữ liệu và trình bày dữ liệu. Do vậy việc cập nhật chỉnh sửa một thành phần không làm ảnh hưởng đến các thành phần khác. Cùng với đó là rất nhiều tiện lợi mà mô hình MVC mang lại.
### 2. MVC trong Express
Với epress-generator, chúng ta đã có sẵn 2 thư mục **views** chứa các file template (ví dụ .ejs), các file này được dùng để hiển thị dữ liệu, tương tự với phần Views trong MVC, thư mục **routes** dùng để chuyển hướng các URL đến các hàm xử lý tương ứng, tương tự thành phần controller trong MVC.

**Bonus**: Thông thường ở thư mục routes, với dự án vừa và lớn, chúng ta sẽ có rất nhiều routes, mỗi route lại có các function xử lý đi kèm, dẫn đến việc cập nhật, bổ sung đường dẫn rất khó khăn, khó quản lý (nhìn xấu nữa :D). Vì vậy, ta sẽ tạo thêm một thư mục để chứa code các function xử lý cho các routes này, thường đặt tên là **Controller**.

Ta có 3 – 2 = 1, vậy còn thiếu 1 thành phần nữa để ứng dụng express của chúng ta vận hành theo đúng mô hình MVC đó chính là model. Ví dụ trong phần tiếp theo sẽ cho các bạn trực quan hơn về **model** nhé.
### 3. Ứng dụng Quản lý diary.
Bây giờ chúng ta sẽ xây dựng ứng dụng quản lý nhật ký đơn giản bằng mô hình MVC nhé.

Ứng dụng này có các chức năng: xem, thêm, sửa, xóa bài nhật ký.
Phân tích ứng dụng:

* Views: chứa các file .ejs để render ra các màn hình chức năng tương ứng.
* Model: Chứa file diary.model.js – xây dựng kiến trúc, các thao tác thêm, xóa, sửa nhật ký
* Controller: Gồm 2 thư mục routes (đảm nhận việc định nghĩa các đường dẫn, các function xử lý), controller (đảm nhận việc thực thi, chứa code các function tương ứng được định nghĩa ở routes.

Bắt đầu hiện thực bằng code nào!

Trước khi code, các bạn lưu ý:
Xem [bài trước](https://chauit.com/tao-khung-ung-dung-express-bang-express-generator/), để có thể tạo được ứng dụng với express-generator (nếu quên :v).

Vào VS code, mở terminal lên và tạo ứng dụng diary-app: `express -e diary-app`

(Giải thích các dòng code thì mình đã comment rõ ràng trong đó nên mình sẽ không đi giải thích lại ở dưới file code đâu nhé)

Cấu trúc thư mục của mình:![](https://images.viblo.asia/f55c1b5b-d2a6-46d8-b7a6-04dbd8c2f8c2.png)
Tức là các bạn sẽ tạo thêm 2 thư mục controller và models cùng cấp với routes, views, thư mục diary (chứa các file ejs cho từng chức năng), partials (chức header, footer của ứng dụng) là thư mục con của views, cùng các file tương ứng.

Trước tiên, ta sẽ đi tạo database cho ứng dụng và các function truy vấn cần thiết. Chúng ta tạo một mảng có tên diary dùng để lưu trữ các nhật ký, mỗi bài nhật ký sẽ có:

> id (khóa chính)
> 
> title (tiêu đề)
> 
> content (nội dung)

Ứng dụng này sẽ lưu trong RAM (cho tiện :v), nên mỗi lần tắt/ khởi động server thì dữ liệu sẽ mất :D, trong các bài sau mình sẽ hướng dẫn các bạn kết nối với cơ sở dữ liệu nhé.
**models/diary.model.js:**
```
/*
    SCHEMA be like:
    structure:
    {
        id: [Primary key] Number (Auto increase),
        title: String,
        content: String
    }

    //Example instance:
    diary = [
        {
            id: 1,
            title: diaryTitle1,
            content: diaryContent1,
        },
        {
            id: 2,
            title: diaryTitle2,
            content: diaryContent2,
        },
        ...
    ]

*/

// Khởi tạo mảng diary - lưu các instance diary
var diary = [];
// Tạo biến đếm ids - hỗ trợ việc auto increase primary key (id)
var ids = 1;

// thêm mới bài nhất ký
function diaryAdd(title, content) {
    id = ids;
    diary[id] = {id: ids, title: title, content: content};
    ids ++;
}

// cập nhật bài nhật ký
function diaryUpdate(id, title, content) {
    diary[id] = {id: id, title: title, content: content}
}

// xóa bài nhật ký
function diaryDelete(id) {
    delete diary[id];
}

// lấy danh sách các id trong mảng bài nhật ký
function diaryGetListID() {
    return Object.keys(diary);
}

// lấy chi tiết bài nhật ký bằng id
function diaryGetDetail(id) {
    return diary[id];
}

module.exports = {
    diaryAdd,
    diaryUpdate,
    diaryDelete,
    diaryGetListID,
    diaryGetDetail
}
```

Trang chủ, chúng ta sẽ custom lại file index.js (routes/index.js) và file index.ejs (views/index.ejs)
**routes/index.js:**
```
var express = require('express');
var router = express.Router();
const Diary = require('../models/diary.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  // truy vấn db lấy ra tất cả các id của bài viết
  const data = Diary.diaryGetListID();
  
  // sau khi có được mảng id các bài viết, ta sẽ lấy chi tiết từng bài viết một theo từng id 
  // và lưu vào mảng result
  const result = data.map((id) => {
    return Diary.diaryGetDetail(id)
  });

  // render  và truyền mảng result sang file index.ejs
  res.render('index', {result: result});
});

module.exports = router;
```
Đây là trang chủ của ứng dụng chúng ta, có chức năng hiển thị và quản lý các bài nhật ký.

Tiếp, chúng ta tạo ra router “/diary/” trong **routes/diary.route.js:**
```
var express = require('express');
var router = express.Router();
const diaryController = require('../controller/diary.controller');

//route get/post form thêm mới nhật ký
router.get('/add', diaryController.getDiaryCreate);
router.post('/add', diaryController.postDiaryCreate);

//route get xem chi tiết nhật ký
router.get('/detail/:id', diaryController.getDiaryDetail);

//route get/post cập nhật bài nhật ký
router.get('/update/:id', diaryController.getDiaryUpdate);
router.post('/update/:id', diaryController.postDiaryUpdate);

//route get/post xóa bài nhật ký
router.get('/delete/:id', diaryController.getDiaryDelete);
router.post('/delete/:id', diaryController.postDiaryDelete);

module.exports = router;
```
Thực hiện code các function xử lý trong **controller/diary.controller.js:**
```
const Diary = require('../models/diary.model');

/*Get và post tạo bài viết nhật ký mới*/
exports.getDiaryCreate = (req, res, next) => {
    res.render('./diary/diaryAdd');
}

exports.postDiaryCreate = (req, res, next) => {
    //Lấy tất cả dữ liệu được gửi từ form (method POST)
    const data = req.body;
    //insert vào db
    Diary.diaryAdd(data.title, data.content);
    res.redirect('/');
}

// xem chi tiết bài nhật ký
exports.getDiaryDetail = (req, res, next) => {
    //lấy id từ params (method GET)
    const ID = req.params.id;
    //truy vấn db để dữ liệu bài viết theo id
    const data = Diary.diaryGetDetail(ID);
    res.render('./diary/diaryDetail', {data: data});
}

/*Get và post cập nhật bài viết nhật ký*/
exports.getDiaryUpdate = (req, res, next) => {
    //lấy id từ params (method GET)
    const ID = req.params.id;
    //truy vấn db để dữ liệu bài viết theo id
    const data = Diary.diaryGetDetail(ID);
    res.render('./diary/diaryUpdate', {data: data});
}

exports.postDiaryUpdate = (req, res, next) => {
    //lấy id từ params (method GET)
    const ID = req.params.id;
    //Lấy tất cả dữ liệu được gửi từ form (method POST)
    const data = req.body;

    //update lại db dữ liệu đã nhận theo id bài viết
    Diary.diaryUpdate(ID, data.title, data.content);
    res.redirect('/');
}

/*Get và post xóa bài viết nhật ký*/
exports.getDiaryDelete = (req, res, next) => {
    //lấy id từ params (method GET)
    const ID = req.params.id;
    ////truy vấn db để dữ liệu bài viết theo id
    const data = Diary.diaryGetDetail(ID);
    res.render('./diary/diaryDelete', {data: data});
}

exports.postDiaryDelete = (req, res, next) => {
    //lấy id từ params (method GET)
    const ID = req.params.id;
    //delete bài viết khỏi db theo id bài viết
    Diary.diaryDelete(ID);
    res.redirect('/');
}
```
Sau khi đã xong phần backend, ta đi triển khai code frontend.

Trước tiên, ta tạo thư mục partials để chứa code cho header và footer của ứng dụng (các file frontend chức năng khác sẽ include 2 file này => tổ chức gọn code, dễ bảo trì, quản lý):

**views/partials/header.ejs:**
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='/stylesheets/diary.css' />
    <!--Bootstrap lib-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
     <!--End Bootstrap lib-->
</head>
<body>
```
**views/partials/footer.ejs:**
```
<footer>
    <p>Copyright © 2021 Chauit.com</p>
</footer>
</body>
</html>
```
Tại thư mục: views/diary, tạo ra các file:

**diaryAdd.ejs:**
```
<% include ../partials/header%>
    <div>
        <a href="/">Quay lại</a>
    </div>
    <h3 class="diary-title">Thêm mới nhật ký</h3>
    <div class="add-diary">
        <%# Form tạo bài nhật ký mới%>
        <%# Nhớ thêm method="POST" vào form%>
        <form method="POST">
            <div class="form-group">
                <label for="title">Tiêu đề</label>
                <%# Đế ý thuộc tính: name="title" (phải có)%>
                <input type="text" class="form-control" id="title" name="title" placeholder="Nhập tiêu đề nhật ký">
            </div>
            <div class="form-group">
                <label for="content">Nội dung</label>
                <%# Đế ý thuộc tính: name="content" (phải có)%>
                <textarea  class="form-control" id="content" name="content" placeholder="Nhập nội dung nhật ký" rows="5" cols="33"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Thêm mới</button>
        </form>
    </div>

<% include ../partials/footer%>
```
**diaryDetail.ejs:**
```
<% include ../partials/header%>
    <div>
        <a href="/">Trở lại</a>
    </div>
    <div id="content">
        <%# Load data truyền từ backend ra frontend%>
        <h2 class="diary-title"><%-data.title%></h2>
        <p class="diary-content"><%-data.content%></p>
    </div>

<% include ../partials/footer%>
```
**diaryUpdate.ejs:**
```
<% include ../partials/header%>
    <div>
        <a href="/">Trở lại</a>
    </div>
    <h3 class="diary-title">Chỉnh sửa nhật ký</h3>
    <div class="add-diary">
        <%# Form cập nhật bài nhật ký - truyền data vào các input tương ứng%>
        <%# Nhớ thêm method="POST" vào form%>
        <form method="POST">
            <div class="form-group">
                <label for="title">Tiêu đề</label>
                <%# Đế ý thuộc tính: name="title" (phải có)%>
                <input type="text" class="form-control" id="title" name="title" value="<%-data.title%>">
            </div>
            <div class="form-group">
                <label for="content">Nội dung</label>
                <%# Đế ý thuộc tính: name="content" (phải có)%>
                <textarea  class="form-control" id="content" name="content" rows="10" cols="33"><%-data.content%></textarea>
            </div>

            <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
    </div>

<% include ../partials/footer%>
```
**diaryDelete.ejs:**
```
<% include ../partials/header%>
    <div>
        <a href="/">Trở lại</a>
    </div>
    <div>
        <%# Form xóa bài nhật ký%>
        <%# Nhớ thêm method="POST" vào form%>
        <form method="POST">
            Bạn muốn xóa bài nhật ký: <strong><%-data.title%></strong> ?
            <button type="submit" class="btn btn-primary">Xóa</button>
        </form>
    </div>

<% include ../partials/footer%>
```
Gần xong để ra trình diễn rồi, trang điểm một chút css nào.

**stylesheets/diary.css:**
```
/**/
.add-diary {
    padding: 50px;
    padding-top: 10px;
}
.diary-title {
    text-align: center;
}
.diary-content {
    text-align: justify;
    padding: 5px;
    margin: 20px 50px;
}
footer {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
```
Xong xuôi, chúng ta khởi động server và xem thành quả nào: `npm start`

Trang chủ: http://localhost:3000/

![](https://images.viblo.asia/31d44cb7-5ee7-42bf-9e69-37685188480e.png)

Thêm mới: http://localhost:3000/diary/add

![](https://images.viblo.asia/8fc944e1-3e69-4f74-9200-9f39ce0830dc.png)

![](https://images.viblo.asia/a5a2af99-7019-49a1-85c0-132a6dda5f06.png)

Các bạn có thể sử dụng chức năng chỉnh sửa, xóa nhật ký nữa.
### 4. Source code trên github
Các bạn có thể tham khảo souce code ứng dụng diary-app tại: https://github.com/chauitcode/diary-app

Đến đây mình cũng kết thúc bài chia sẻ. Hy vọng qua bài này, các bạn đã nắm được khái niệm, kiến thức và triển khai được mô hình MVC trong Express.

Nếu có thắc mắc gì hay góp ý, mong các bạn để lại comment để mình phản hồi và cập nhật nhanh nhất có thể. Cảm ơn các bạn đã dành thời gian theo dõi <3 <3

Hẹn mọi người vào bài tiếp theo!!! Xin cáo từ :xD

(Bài viết gốc: https://chauit.com/mvc-trong-express/)