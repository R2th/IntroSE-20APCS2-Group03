# Json Web Token là gì ?
JSON Web Token (JWT) là một chuẩn mở (RFC 7519) định nghĩa một cách nhỏ gọn và khép kín để truyền một cách an toàn thông tin giữa các bên dưới dạng đối tượng JSON.

Thông tin này có thể được xác minh và đáng tin cậy vì nó có chứa chữ ký số. JWTs có thể được ký bằng một thuật toán bí mật (với thuật toán HMAC) hoặc một public / private key sử dụng mã hoá RSA.

Ví dụ về mã token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6ImFkbWluIiwiaWF0IjoxNTk3NTQ2MzQyLCJleHAiOjE1OTc1NDc3ODJ9.Dqq0EEgF1xOYlnY8tVU31h9jkInztJVt8NEPEavG1ZU

## Tại sao cần sử dụng Json Web Token (JWT)
Đây là 1 vấn đề quan trọng về bảo mật khi phát triển một restful api ([restful api là gì](https://viblo.asia/p/restful-api-la-gi-1Je5EDJ4lnL)). 

Ví dụ: Bạn có 1 url rest api: https://domain.com/users/getAll để lấy tất cả thông tin của user trong ứng dụng. Nếu ai cũng có thể truy cập vào thì sẽ dẫn tới nhiều vấn đề bảo mật người dùng. Cho nên mới cần phải sử dụng Json Web Token để giải quyết vấn đề đó. Nào, bắt đầu thực hiện thôi.

## Các bước thực hiện JWT trong Restfull Api NodeJs
1. Setup ứng dụng NodeJs
2. Thực hiện route để người dùng truyền username và password lên serve để đăng nhập
3. Nếu thành công, serve random để tạo 1 mã token gửi về client
4. Client thực hiện lưu token vào trình duyệt (cookie, sessionStorage, ...)
5. Khi thực hiện request lên serve, client gửi theo token để thực hiện vấn đề xác thực
6. Serve nhận request từ client, xác thực xem token có đúng không, nếu đúng thì cho đi tiếp, nếu không thì dừng lại.

## Xây dựng ứng dụng NodeJs cơ bản
**index.js**
```js
const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Serve is listening in ${port}`);
});
```

Chạy ứng dụng bằng lệnh
```
node index.js
```

Mở ứng dụng trên trình duyệt: http://localhost:4000/
![](https://images.viblo.asia/8e89b8d1-a0c4-4ff8-ae89-e3a59fc7d52d.png)

## Cài đặt pakeage 
```
npm install jsonwebtoken --save
```

**index.js**
```js
const express = require('express');
const jwt    = require('jsonwebtoken');
const config = require('./configurations/config');
const app = express();
const port = 4000;

app.set('Secret', config.secret);

//middleware được sử dụng để nhận các request từ client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json('Hello world');
});

app.listen(port, () => {
    console.log(`Serve is listening in ${port}`);
});
```

**configurations/config.js**
```js
module.exports = {
    secret: 'monthlyReport'
}
```

Vậy là cơ bản đã hoàn thiện việc setup.

## Thực hiện đăng nhập 
Tạo ra 1 route để sử lý việc đăng nhập, ở ví dụ này mình viết các logic bên trong route và giả sử usernam là 'admin' và password bằng '12345' để các bạn dễ dàng theo dõi. Nhưng trong thực tế, các bạn nên viết theo mô hình MVC để code sạch sẽ, dễ bảo trì hơn nhé.

```js
app.post('/users/login', (req, res) => {
    if (req.body.username === 'admin') {
        if (req.body.password === '12345') {
            
            const payload = {
                check: true,
                authorization: 'admin' // gán giá trị để phân quyền cho token này
            }

            let token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // set token tồn tại trong 24 giờ
            });

            res.json({
                message: 'Loggin successfully!',
                token: token  // gửi token về client khi đăng nhập thành công 
            })

        } else {
            res.json({error: 'Password wrong!'});
        }
    } else {
        res.json({error: 'User not found!'});
    }
});
```

Giờ chạy để xem kết quả nhé:
![](https://images.viblo.asia/668211c5-90c2-462b-b840-0219082f995a.png)

Đã có token được trả về, bây giờ chỉ cần lấy token đó và lưu trên trình duyệt để sử dụng trong các request tiếp theo

## Thực hiện xác thực token
 Tạo ra 1 middleware để kiểm tra token
 
```js
const protectedRoutes = express.Router();

// đăng ký route
app.use('/products', protectedRoutes);

// sử dụng middleware cho tất cả các route products
protectedRoutes.use((req, res, next) => {
    let { token } = req.body;

    if (token) {
        jwt.verify(token, app.get('Secret'), (err, decode) => {
            if (eror) {
                return res.json({error: 'Error token!'});
            } else {
                req.decoded = decoded;  // lưu request để sử dụng cho route khác
                next();
            }
        });
    } else {
        res.json({error: 'No token!'});
    }
});


// viết 1 route để lấy dữ liệu 
protectedRoutes.get('/getAll', (req, res) => {
    let products = [
        {id: 1, name: 'Samsung Galaxy Note 10'},
        {id: 2, name: 'Iphone X'},
        {id: 3, name: 'Oppo A37'},
    ];

    res.json(products);
});
```

**Bây giờ thử thôi nào**

Trường hợp không có token:

![](https://images.viblo.asia/d86b466c-fdc8-40db-b77f-6a17d3bda28f.png)

Trường hợp có token:

![](https://images.viblo.asia/43fde38d-bfc9-4041-80d9-6313e73eaa65.png)

## Kết luận
Bài này tôi thao khảo từ [topdev](https://topdev.vn/blog/xac-thuc-rest-api-voi-jwt/) mong rằng bạn có thể hiểu được phần nào vấn đề xác thực Json Web Token để ứng dụng vào dự án của các bạn đảm bào việc bảo mật, an toàn. Cảm ơn các bãn đã theo dõi