1. [Tạo một ứng dụng nhỏ sử dụng server là Nodejs và DB là Mysql (Phần 1)](https://viblo.asia/p/tao-mot-ung-dung-nho-su-dung-server-la-nodejs-va-db-la-mysql-phan-1-m68Z0L02ZkG)
2. Tạo một ứng dụng nhỏ sử dụng server là Nodejs và DB là Mysql (Phần 2)
# Mở đầu
> Tiếp nối bài hôm trước hôm nay mình sẽ giới thiệu đến các bạn cách làm việc với Nodejs để làm một website đầy đủ chức năng cơ bản. Trong bài này các bạn có thể biết cách lấy dữ liệu thông qua 2 method chính là post và get để thực hiện chức năng Create, Edit và Delete Books sử Nodejs.
> 

# Các kiến thức cần chuẩn bị
### 1. Module Url
- Cài đặt
        ```
        npm install --save url
        ```
 - Khái niệm:  Module URL cung cấp các tiện ích để phân giải và phân tích URL. Nó có thể được truy cập bằng cách sử dụng các method sau:
![](https://images.viblo.asia/d9b1d8d2-0f59-4dbe-935d-9a57862825f7.JPG)
 
###  2. Module Query String
- Cài đặt `npm install --save querystring`
-  Module Query String  cung cấp cách phân tích chuỗi truy vấn URL
![](https://images.viblo.asia/8457231c-c34b-4d2f-b400-f98d9c26aaad.JPG)



# Làm thế nào lấy data mà user truyền lên thông qua method post và get
Như các bạn đã biết client truyền data lên server thông qua phương thức HTTP request với 2 method chính là post và get. Cũng như các ngôn ngữ server khác Nodejs cũng hỗ trợ các cách lấy data từ request hoặc từ body. 
###         Method Get
 Nếu user truy cập thông qua url sau: `http://localhost:8080/default.htm?year=2017&month=february` thì chúng ta có thể dùng url để phân tích nó như sau:

    
  ```
    var http = require('http')  
    var url = require('url')  

    http.createServer(function (req, res) {  

        var queryString = url.parse(req.url, true)  
        console.log(q.host) //returns 'localhost:8080'
        console.log(q.pathname) //returns '/default.htm'
        console.log(q.search) //returns '?year=2017&month=february'
        var qdata = q.query //returns an object: { year: 2017, month: 'february' }
        console.log(queryString)  

    }).listen(8000)  
    
```
     
###     Method Post
Nếu user có 1 form insert Books như sau:
![](https://images.viblo.asia/179ae353-c566-4bf7-b887-97ee04a3c3dc.png)
> Như các bạn đã biết nếu sử dụng method Post thì data sẽ được truyền lên server thông qua Form Data tức nó sẽ không hiển thị với người dùng nên để lấy data dạng này chúng ta sẽ làm như sau:

```
var http = require('http') 
var { parse } = require('querystring') //đây là cách khai báo khi mình muốn dùng 1 function nào của module thay vì lấy tất cả
var body = ''
 http.createServer(function (req, res) { 
     req.on('data', (data) => {
             body += data
      })

      req.on('end', () => {
            body = parse(body)
            console.log(body
      })
 }).listen(8000) 
```

## Chú ý: 
> Bất kỳ ngôn ngữ server nào như PHP, Java, Ruby .... nếu các bạn biết cách lấy data từ method GET và method POST thì các bạn có thể làm một vài chức năng cơ bản đối với ngôn ngữ đó.
# Hoàn thiện ứng dụng với các chức năng create, update và delete.
### Chuẩn bị cấu trúc dự án
![](https://images.viblo.asia/963a96c3-a711-4c2e-9d00-47b471367e21.JPG)
Mình xin nói chút về cách thức tổ chức cấu trúc dự án của mình bao gồm 1 file create.ejs, update.ejs và form_books.ejs. Đối với các bạn là lập trình viên mới vào nghề thì các sẽ thấy lạ bời vì mình tập trung các trường sử dụng cho cả form create và update để sau có thêm hay xóa trường thì mình sẽ fix nhanh hơn

**Tại file create.js**
```
<% include ../layout/header %>
    <div class="row" style="margin-top: 1%; margin-bottom: 1%;">
        <div class="col-md-2 col-md-offset-11">
            <a href="/books" class="btn btn-success">List</a>
        </div>
    </div>
    <div class="panel panel-default" style="margin-top: 2%;">
        <div class="panel-heading">Create Book</div>
        <div class="panel-body">
            <div class="col-md-12">
               <form action="/books/store" method="post" class="form-horizontal">
                   //mình sẽ include form book ở đây
                 <% include form_books %>
                 <div class="form-group">
                   <div class="col-sm-offset-11 col-sm-10">
                     <button type="submit" name="create" class="btn btn-info">Create</button>
                   </div>
                 </div>
               </form>
            </div>
        </div>
    </div>

<% include ../layout/footer %>

```

**Tại file update.ejs**
```
<% include ../layout/header %>
    <div class="row" style="margin-top: 1%; margin-bottom: 1%;">
        <div class="col-md-2 col-md-offset-11">
            <a href="/books" class="btn btn-success">List</a>
        </div>
    </div>
    <div class="panel panel-default" style="margin-top: 2%;">
        <div class="panel-heading">Edit Book</div>
        <div class="panel-body">
            <div class="col-md-12">
               <form action="/books/update/<%=  book[0].id %>" method="post" class="form-horizontal">
                //mình sẽ include form book ở đây
                 <% include form_books %>
                 <div class="form-group">
                   <div class="col-sm-offset-11 col-sm-10">
                     <button type="submit" name="update" class="btn btn-info">Update</button>
                   </div>
                 </div>
               </form>
            </div>
        </div>
    </div>

<% include ../layout/footer %>

```

**Tại file form_books.ejs:**

Ở đây mình có dùng so sánh tồn tại của book. Nếu book không tồn tại thì đó là create còn nếu có tồn tại thì lúc đó user đang truy cập vào màn hinh edit như vậy mình có thể sử dụng một file cho 2 action
```
value="<%= typeof(book) !== 'undefined' ? book[0].name : null  %>">
```

```
<div class="form-group">
    <label class="control-label col-sm-2" for="name">Name:</label>
    <div class="col-sm-10">
        <input type="text" name="name" class="form-control" id="name" placeholder="Enter name" required value="<%= typeof(book) !== 'undefined' ? book[0].name : null  %>">
    </div>
</div>

<div class="form-group">
    <label class="control-label col-sm-2" for="author">Author:</label>
    <div class="col-sm-10">
        <input type="text" name="author" class="form-control" id="author" placeholder="Enter author" required value="<%= typeof(book) !== 'undefined' ? book[0].author : null  %>">
    </div>
</div>

<div class="form-group">
    <label class="control-label col-sm-2" for="description">Description:</label>
    <div class="col-sm-10">
        <textarea name="description" class="form-control" id="description" cols="10" rows="5" placeholder="Enter description"><%= typeof(book) !== 'undefined' ? book[0].description : null  %></textarea>
    </div>
</div>

```
--> Sau khi chuẩn bị view xong thì mình sẽ thực hiện các chức năng sau

### 1. Chức năng insert mới books
**Xử lý ở server.js**
Mình sẽ thực hiện 2 bước đó là :
- Step 1:  Lấy data từ form (mình đã giới thiệu trên)

- Step 2: Xử lý và insert vào DB 
```
var body = '';
req.on('data', (data) => {
    body += data;
});

req.on('end', () => {
    body = parse(body)
    var fields = []
    var values = []
    var bindParams = []
    //check fiels and value in  request to insert to DB
    for (const key in body) {
        if (key != 'create') {
            fields.push(key)
            values.push(`${body[key]}`)
            bindParams.push('?')
        }
    }

    //generate sql insert
    let sql = `INSERT INTO books (${fields.join(',')})  VALUES (${bindParams.join(',')})`
    // connect DB to create book
    con.connect(function(err) {
        con.query(sql, values, function (err, result, fields) {
        if (err) throw err;
             // request về page list books khi insert success
            res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/books' });

            return res.end();
        });
    });
});
```

### 2. Trả về màn hình edit khi user click vào http://localhost:8000/edit/1

![](https://images.viblo.asia/56e6ac9a-90c2-41ea-a8b7-8bff7a775493.png)
Xử lý chức năng này mình cũng cần 3 bước
- Step 1: Lấy được id của books 
Vì id được truyền ở url mà không phải param nên ta lấy như sau.
```
var param = request.pathname.split('/')
var idBook = param[param.length - 1]
```
- Step 2: Lấy data của id đó từ DB

Cũng như bài trước thì render view sẽ thông qua một hàm đó là 
```
function renderHTML(path, response, data = {}) {
    var htmlContent = fs.readFileSync(path, 'utf8');
    data.filename = path;

    var htmlRenderized = ejs.render(htmlContent, data);
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.end(htmlRenderized);
}
```

```
let sql = `SELECT * FROM books WHERE id = ?`
// connect DB to create book
con.connect(function(err) {
    con.query(sql, [idBook], function (err, result, fields) {
        if (err) throw err;
            // console.log(result[0].name)
            res.writeHeader(200, {"Content-Type": "application/json"});
            renderHTML('./view/books/update.ejs', res, {book: result});
        });
    });
```
- Step 3 đổ ra view và show cho user
```
<div class="form-group">
    <label class="control-label col-sm-2" for="name">Name:</label>
    <div class="col-sm-10">
        <input type="text" name="name" class="form-control" id="name" placeholder="Enter name" required value="<%= typeof(book) !== 'undefined' ? book[0].name : null  %>">
    </div>
</div>
```
Tương tự cho các trường khác ở đây mình sẽ dùng `book[0].name` lấy dữ liệu vì khi trả về nó là một array.
### 3. Thực hiện update dữ liệu (cũng tương tự create) nhưng chỉ khác ở chỗ sau:
- Step 1: Lấy được id của books (tương tự edit book)
- Step 2: Lấy data từ form (mình đã giới thiệu trên)
- Step 3: Update data vào DB:
```
var fields = []
var values = []
//check fiels and value in  request to insert to DB
for (const key in body) {
    if (key != 'update' ) {
        fields.push(`${key} = ?`)
        var value = Number.isInteger(parseInt(body[key])) ? parseInt(body[key]) : `${body[key]}`
        values.push(value)
    }
}

//generate sql insert
let sql = `UPDATE books  SET ${fields.join(' , ')}  WHERE  id = ${idBook}`
// connect DB to create book
con.connect(function(err) {
    con.query(sql, values, function (err, result, fields) {
        if (err) throw err;
            res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/edit/' + idBook });

            res.end();
        });
    });
});
```
### 4. Delete một books
- Step 1: Lấy id book từ form (mình đã giới thiệu trên)
- Step 2: Update data vào DB:
```
let sql = `DELETE FROM books WHERE  id = ${idBook}`
// connect DB to create book
con.connect(function(err) {
    con.query(sql, values, function (err, result, fields) {
        if (err) throw err;
            res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/books' });

            res.end();
        });
    });
});
```
# Kết thúc
Vậy là chúng ta có thể tạo một website cơ bản thông qua Nodejs  nhưng còn những vấn đề như validation data, hay cấu trúc project bằng mô hình MVC, .... rất nhiều thứ nữa thì website mới đạt chuẩn để dùng được. Hy vọng các bạn có thể học hỏi nhiều thứ từ bài viết này. Hẹn gặp các bạn ở phần 3 :D