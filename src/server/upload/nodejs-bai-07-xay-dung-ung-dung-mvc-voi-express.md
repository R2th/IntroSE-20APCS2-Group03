> Trong các bài trước chúng ta đã tìm hiểu sơ qua về Express, trong phần này chúng ta sẽ dùng Express để xây dựng một ứng dụng ghi chú đơn giản, sử dụng mô hình MVC.
## Mô hình MVC trong Express
Bản thân Express không được xây dựng theo mô hình MVC, nhưng module express-generator dùng để tạo một project Express thì lại tạo cho chúng ta một ứng dụng gần như là giống với MVC bởi vì các project này tồn tại 2 thứ:

Nếu bạn đã từng dùng các hệ điều hành Linux thì có lẽ bạn sẽ biết đến các trình gửi yêu cầu HTTP là wget hoặc curl. Chúng ta sẽ viết đoạn code mô phỏng trình wget.

* Thư mục views chứa các file template (file có phần mở rộng là .ejs), các file này được dùng để hiển thị dữ liệu, tức là tương tự với phần Views trong MVC.
* Thư mục routes được dùng để chuyển hướng các URL đến các hàm xử lý tương ứng, tức là tương tự với Controller trong MVC.

Vậy thì để ứng dụng của chúng ta vận hành theo đúng mô hình MVC thì thành phần còn thiếu là **Model**. Model có chức năng lưu trữ dữ liệu, thay đổi/cập nhật dữ liệu, hỗ trợ truy vấn dữ liệu. Và dĩ nhiên là code lưu trữ model cũng nên được lưu trong một thư mục riêng tách rời với views và routes.

## Tạo ứng dụng Notes
Chúng ta sẽ xây dựng ứng dụng Notes (quản lý ghi chú) đơn giản.

Đầu tiên chúng ta tạo project:
```
quang.hoa@hellboy:~$ sudo npm install -g express-generator
quang.hoa@hellboy:~$ express --view=ejs notes
quang.hoa@hellboy:~$ express --view=ejs ~/Projects/Node/notes
quang.hoa@hellboy:~$ cd ~/Projects/Node/notes
quang.hoa@hellboy:~/Project/Node/notes$ npm install
```
để chạy thử ứng dụng:
```
quang.hoa@hellboy:~/Project/Node/notes$ npm start
```
kết quả sẽ như hình dưới:
![](https://images.viblo.asia/5cb976b7-f5af-4dcc-8d81-a4e496877b73.png)
    1
**Tạo model**
Trong thư mục gốc của project, chúng ta tạo một thư mục có tên models nằm chung với các thư mục views, routes… Trong thư mục models, chúng ta tạo một file có tên notes.js với nội dung sau đây:

models/notes.js
```
var notes = [];
exports.update = exports.create = function(key, title, body) {
    notes[key] = { title: title, body: body };
}
 
exports.read = function(key) {
    return notes[key];
}
 
exports.destroy = function(key) {
    delete notes[key];
}
 
exports.keys = function() {
    return Object.keys(notes);
}
```

Trong đoạn code trên chúng ta tạo một mảng có tên notes dùng để lưu trữ các ghi chú, mỗi ghi chú bao gồm key (id), title (tiêu đề) và body (nội dung). Trong phần này chúng ta chỉ thực hiện lưu trữ trong bộ nhớ RAM cho đơn giản, tức làm mỗi lần tắt/khởi động server thì các ghi chú sẽ bị xóa, trong các phần sau chúng ta sẽ sử dụng cơ sở dữ liệu để lưu dữ liệu.

Ở đoạn code trên hàm update và hàm create giống nhau vì ở đây chúng ta chưa sử dụng cơ sở dữ liệu, trong các phần sau khi sử dụng cơ sở dữ liệu thì các hàm này sẽ phải tách ra.

Mỗi ghi chú sẽ được quản lý bằng key (khóa hay id).

**Tùy chỉnh trang chủ**

Đầu tiên chúng ta tạo một file có tên notes.js trong thư mục routes rồi để đó, chúng ta sẽ viết file này sau. Tiếp theo trong file app.js chúng ta thêm dòng sau vào cùng với các dòng require() ở đầu file:

app.js
```
...
var notes = require('./routes/notes');
...
```
Tiếp theo, cũng như trong các phần trước, chúng ta tách phần trang web ra thành các file top.ejs, bottom.ejs để có thể dùng một cách linh hoạt khi cần.

Trong thư mục views chúng ta tạo các file top.ejs, bottom.ejs như sau:

views/top.ejs
```
<html>
<head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
    <h1><%= title %></h1>
    <div class='navbar'>
    <p>
        <a href='/'>Home</a> | <a href='/noteadd'>ADD Note</a>
    </p>
    </div>
```
Chúng ta in tiêu đề trang chủ và 2 đường link đến trang '/' và '/noteadd', trang /noteadd sẽ được viết sau.

views/bottom.ejs
```
</body>
</html>
```
Sau đó chỉnh lại file index.ejs như sau:

views/index.ejs
```
<% include top %>
<%
    var keys = notes.keys();
    if(keys) {
        keys.forEach(function(key) {
            var note = notes.read(key);
            %><p><%= key %>:
                <a href="/noteview?key=<%= key %>"><%= note.title %></a>
            </p><%
        });
    }
%>
<% include bottom %>
```
Trong file index.ejs, chúng ta có dùng đến biến notes, chúng ta dùng biến này để lấy key của từng ghi chú, sau đó hiển thị một đường link đến key đó, biến notes sẽ được gửi đến từ hàm render() nào đó, và đó sẽ là dòng code routing trong file routes/index.js, chúng ta sửa lại file routes/index.js như sau:

routes/index.js
```
var express = require('express');
var router = express.Router();
var notes = require('../models/notes');
 
/* GET home page. */
 
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Notes', notes: notes });
});
 
module.exports = router;
```
Chúng ta thêm dòng require() đến module models/notes, sau đó truyền vào lời gọi res.render() để file index.ejs có thể sử dụng.

Đến đây chúng ta có thể chạy thử ứng dụng:
```
quang.hoa@hellboy:~/Project/Node/notes$ npm start
```
![](https://images.viblo.asia/00a0829d-5778-46dc-96e4-012129e69193.jpg)
Ở đây chúng ta chỉ thấy trang chủ và 2 đường link trống không, vì chúng ta chưa tạo một ghi chú nào cả. Khi bấm vào ADD Note thì sẽ có lỗi xảy ra vì chúng ta cũng chưa viết code cho trang này.

**Tạo ghi chú**

Do đó bây chúng ta sẽ thêm phần tạo ghi chú.

Trong file app.js chúng ta thêm dòng sau cùng với các dòng routing khác:

app.js
```
...
app.use('/noteadd', notes.add);
...
```
Trong file routes/notes.js, chúng ta thêm đoạn code sau:

routes/notes.js
```
var notes = require('../models/notes');
exports.add = function(req, res, next) {
    res.render('noteedit', {
        title: "Add a note",
        docreate: true,
        notekey: "",
        note: undefined
    });
}
```
Đoạn code trên rất đơn giản, chúng ta dùng hàm res.render() để gọi file noteedit.ejs và truyền các tham số title, docreate, notekey, note vào file này rồi trả về cho người dùng. Ở đây tham số docreate có cho biết chúng ta đang cập nhật hay tạo mới một ghi chú, nếu là cập nhật thì tham số note sẽ là một đối tượng nào đó, còn tạo mới thì đối tượng này rỗng (undefined), trong phần cập nhật ghi chú chúng ta sẽ hiểu rõ thêm 2 tham số này,.

Tiếp theo trong thư mục views, chúng ta tạo file noteedit.ejs với nội dung như sau:

views/noteedit.ejs
```
<% include top %>
<form method='POST' action='/notesave'>
    <input type='hidden' name='docreate' value='<%= docreate ? "create" : "update"%>'>
    <p>Key: <input type='text' name='notekey' value='<%= note ? notekey : "" %>'></p>
    <p>Title: <input type='text' name='title' value='<%= note ? note.title : "" %>'></p>
    <br/>
    <textarea rows=5 cols=40 name='body'><%= note ? note.body : "" %></textarea>
    <br/>
    <input type='submit' value='Submit' />
</form>
<% include bottom %>
```
Như chúng ta đã biết, cả phần tạo và cập nhật ghi chú dùng chung một hàm, và dùng chung một template là file noteedit.ejs. Ở đây chúng ta tạo một form có các trường để nhập dữ liệu cho một ghi chú, nếu thao tác là cập nhật thì chúng ta điền các dữ liệu có sẵn vào các trường này, người dùng chỉ việc thay đổi các trường cần thiết, nếu là tạo mới thì các trường này sẽ rỗng.

Form này sẽ gửi đến trang /notesave, và form này dùng phương thức POST để gửi, do đó bây giờ chúng ta phải làm thêm trang này. Trong file app.js chúng ta thêm dòng sau:

app.js
```
...
app.post('/notesave', notes.save);
...
```
Tiếp theo trong file routes/notes.js chúng ta thêm đoạn code sau để xử lý đương dẫn /notesave:

routes/notes.js
```
exports.save = function(req, res, next) {
    if (req.body.docreate === 'create') {
        notes.create(req.body.notekey,
                     req.body.title,
                     req.body.body);
    } else {
        notes.update(req.body.notekey,
                     req.body.title,
                     req.body.body);
    }
    res.redirect('/noteview?key='+req.body.notekey);
}
```
Đoạn code trên cũng rất đơn giản, chúng ta kiểm tra tham số docreate là gì, nếu là tạo mới (create) thì chúng ta tạo một phần tử mới trong mảng notes bằng phương thức notes.create(), nếu là cập nhật thì chúng ta cập nhật notes.update().

Sau đó chúng ta chuyển hướng trang web đến trang /noteview.

Và bởi vì form truyền lên theo phương thức POST lên dữ liệu sẽ nằm trong thuộc tính req.body được tạo từ module bodyParser. Trong file app.js Express đã tự động thêm module này cho chúng ta trong dòng app.use(bodyParser.json());

Bạn có thể chạy lại project và có thể bấm nút ADD Note để tạo ghi chú mới. Khi bấm vào nút submit thì bạn sẽ được một trang báo lỗi 404, đơn giản là vì chúng ta chưa làm trang /noteview.

Tuy nhiên nếu về lại trang Home thì chúng ta vẫn thấy ghi chú đã được thêm vào và đã hiển thị lên trang chủ.

**Xem ghi chú**

Bây giờ chúng ta sẽ làm trang /noteview để xem chi tiết một ghi chú.

Trong file app.js chúng ta thêm dòng sau:

app.js
```
...
app.use('/noteview', notes.view);
...
```
Trong file routes/notes.js chúng ta thêm đoạn code sau:

routes/notes.js
```
exports.view = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('noteview', {
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
}
```
Đoạn code trên sẽ xử lý đường dẫn URL /noteview, ở đây chúng ta phải kiểm tra trước khi trả về dữ liệu cho trình duyêt, bằng cách kiểm tra xem khóa có rỗng hay không, sau đó trong hàm res.render() chúng ta cũng kiểm tra xem title có rỗng hay không để trả về dữ liệu cho thích hợp. Bởi vì người dùng có thể nhập đường dẫn bằng tay chứ không chỉ có dùng chuột để click vào đường link trên trang web.

Cuối cùng chúng ta tạo một file có tên noteview.ejs trong thư mục views với nội dung như sau:

views/noteview.ejs
```
<% include top %>
<h3><%= note ? note.title : "" %></h3>
<p><%= note ? note.body : "" %></p>
<p>Key: <%= notekey %></p>
<% if (notekey) { %>
    <hr/>
    <p>
        <a href="notedestroy?key=<%= notekey %>">Delete<a/>
        <a href="noteedit?key=<%= notekey %>">Edit</a>
    </p>
<% } %>
<% include bottom %>
```
Các đoạn code trên sẽ chịu trách nhiệm hiển thị nội dung ghi chú. Ngoài ra còn hiển thị 2 đường link đến trang /notedestroy dùng để xóa ghi chú và /noteedit dùng để chỉnh sửa ghi chú.

Tuy nhiên nếu click vào 2 đường link đó thì chúng ta sẽ được một trang báo lỗi 404, lý do cũng đơn giản là vì chúng ta chưa viết hàm routing cho 2 đường dẫn này.

**Chỉnh sửa ghi chú**

Trong file app.js chúng ta thêm dòng sau:

app.js
```
...
app.use('/noteedit', notes.edit);
...
```
Trong file routes/notes.js chúng ta thêm đoạn code sau:

routes/notes.js
```
exports.edit = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('noteedit', {
        title: note ? ("Edit " + note.title) : "Add a Note",
        docreate: note ? false : true,
        notekey: req.query.key,
        note: note
    });
```
Như bạn đã biết, cả 2 hàm tạo và chỉnh sửa đều dùng chung một template là file notedit.ejs, do đó ở đây chúng ta không cần phải tạo một file .ejs nào khác. Khác với hàm tạo ghi chú, ở đây chúng ta nhận được một key của một ghi chú có sẵn, chúng ta sẽ truyền dữ liệu của ghi chú này vào các tham số trả về. Đầu tiên chúng ta khai báo một biến note có giá trị undefined, sau đó chúng ta tìm đối tượng ghi chú trong mảng notes dựa theo key, nếu tìm thấy thì truyền vào hàm res.render(), nếu không thì chúng ta truyền các tham số giống như khi tạo mới một ghi chú. Như thế sẽ phòng ngừa được việc người dùng nhập đường dẫn bằng tay lên trình duyệt và đưa đường dẫn sai.

Bây giờ bạn có thể thực hiện cập nhật ghi chú.

**Xóa ghi chú**

Tương tự với các chức năng trên, đầu tiên chúng ta thêm dòng sau vào file app.js:

app.js
```
...
app.use('/notedestroy', notes.destroy);
...
```
Tiếp theo trong file routes/notes.js, chúng ta thêm đoạn code sau:

routes/notes.js
```
exports.destroy = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('notedestroy', {
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
}
```
Cũng tương tự như các hàm khác, ở đây chúng ta kiểm tra xem dữ liệu gửi lên có hợp lệ hay không rồi trả về trong trang /notedestroy.

Kế tiếp chúng ta tạo file notedestroy.ejs trong thư mục views như sau:

views/notedestroy.ejs
```
<% include top %>
<form method="POST" action='notedodestroy'>
    <input type='hidden' name='notekey' value='<%= note ? notekey : "" %>'>
    <p>Delete <%= note.title %> ?</p>
    <br/>
    <input type="submit" value="DELETE" />
    <a href="/noteview?key=<%= notekey %>">Cancel</a>
</form>
<% include bottom %>
```
Ở đây chúng ta hiển thị một form cho người dùng xác nhận việc xóa file, form này sẽ gửi đến đường dẫn /notedodestroy với phương thức POST. Do đó bây giờ chúng ta phải xử lý đường dẫn này.

Đầu tiên chúng ta thêm dòng sau vào file app.js:

app.js
```
...
app.post('/notedodestroy', notes.dodestroy);
...
```
Tiếp theo chúng ta thêm đoạn code này vào file routes/notes.js:

routes/notes.js
```
exports.dodestroy = function(req, res, next) {
   notes.destroy(req.body.notekey);
   res.redirect('/');
}
```
Đoạn code trên sẽ xóa ghi chú ra khỏi mảng notes rồi chuyển hướng về trang '/'.

Bây giờ chúng ta có thể sử dụng chức năng xóa được rồi.

Tham khảo: https://devskill.org/express-generator