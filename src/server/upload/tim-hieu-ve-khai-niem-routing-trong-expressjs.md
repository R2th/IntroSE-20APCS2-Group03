**Module** trong nodejs là một tập hợp các hàm chức năng được gói trong 1 hoặc nhiều file Javascript, và sẽ được tái sử dụng trong một ứng dụng Nodejs. Nói nôm na, module có thể hiểu như một library nếu bạn đã từng học qua .net hoặc Java. Một module có thể là một tập thư viện có sẵn, hoặc ta cũng có thể tạo mới để sử dụng.

Để sử dụng một module, ta có cú pháp như sau :

```
var http = require("http");
```

Đoạn code này tạo ra một tham chiếu của module **http** có sẵn được cài đặt thông qua npm và gán nó vào biến **http**. Sau này, thông qua biến **http** ta có thể sử dụng một số public method và property của module, ví dụ :

```
http.createServer().listen(8000);
var listStatusCodes = http.STATUS_CODES;
...
```

Những hàm và thuộc tính này đã được khai báo sẵn, và được public thông qua từ khóa export để có thể được sử dụng ngay ở bên ngoài module(Ở trạng thái mặc định sẽ là private khi khai báo với từ khóa var) :

```
export var STATUS_CODES: {
        [errorCode: number]: string | undefined;
        [errorCode: string]: string | undefined;
};

export function createServer(requestListener?: (request: IncomingMessage, response: ServerResponse) => void): Server;
```

**Router** là phương thức khai báo để đáp lại requrest từ client, nó có thể hiểu tương tự như một Request mapping. Nói đơn giản hơn là định nghĩa URL cho trang web mà người dùng sẽ tương tác. Một số định nghĩa router thường dùng :

Định nghĩa cho trường hợp người dùng nhập URL cơ bản : http://localhost:3000/
```
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
```
Định nghĩa cho trường hợp người dùng nhập URL chi tiết hơn : http://localhost:3000/test
```
router.get('/test', function(req, res, next) {
  res.render('index', { title: test page' });
});
```

Định nghĩa cho trường hợp người dùng nhập URL chi tiết với tham số truyền vào : http://localhost:3000/url-with-parameter?id=123&name=John
```
router.get('/url-with-parameter/', function(req, res, next) {

  var id = req.param('id');
  var name = req.param('name');
  var student = {
    studentId: 11111,
    age: 20 
  };
  res.render('url-with-parameter',
   { title: 'url-with-parameter page',
    id : id,
    name : name, 
    description : "param with parameter name in url",
    student : student
   });
});
```

Định nghĩa cho trường hợp người dùng nhập URL với tham số là 1 pattern đặc thù : http://localhost:3000/url-with-parameter2/123/John
```
router.get('/url-with-parameter2/:id/:name', function(req, res, next) {

  var id = req.params.id;
  var name = req.params.name;
  res.render('url-with-parameter', { title: 'url-with-parameter page', id : id, name : name, description : "param as pattern in url" });
});
```

Cuối cùng là public đối tượng router thông qua cú pháp :
```
module.exports = router;
```

Để truy xuất giá trị bên view, nơi đã được nhận parameter từ module truyền qua. Ta có thể làm như sau với cú pháp của template engine **jade** đi kèm với **Expressjs**:
extends layout

```
block content
  h1= title
  p Welcome to #{title}
  p description : #{description}
  p Id : #{id}
  p Name : #{name}
  p Student with student Id is #{student.studentId} has age : #{student.age}
```
**Kết quả :**


-----


![](https://images.viblo.asia/53a8560e-9e2c-4e6e-a648-95a654d4c192.png)

Ngoài phương thức GET, POST, còn tồn tại một số http methods như : HEAD, PUT, PATCH, DELETE, OPTIONS.

-----

Nguồn : https://expressjs.com/en/guide/routing.html