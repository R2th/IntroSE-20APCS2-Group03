Chào các bạn!<br> 
Nối tiếp [Circuit3](https://viblo.asia/p/express-basic-f1tours-project-circuit3-refactor-routes-E375z2rJ5GW). Hôm nay, chúng ta tiếp tục đến với chặng 4 của "F1 Tours" nhé.
Trong phần này, mình sẽ thêm các chức năng xử lý User.<br>
# 1. Thêm chức năng xử lý User:
Tương tự như Tour, các routes User cũng sẽ xử lý như vậy.  Việc thêm chức năng cho User cũng là một cách để luyện tập để nhuần nhuyễn hơn cách xử lý routes. Mình sẽ tự viết lại thay vì copy/paste nhé. <br>
Tạo file *users.json* với cấu trúc tương tự *f1tours.json* trong thư mục *data*. Thêm vào *app.js* như sau:
```javascript
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users
    }
  })
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }


  res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  })
};

const createUser = (req, res) => {
  const newUserId = users.length + 1;
  const newUser = Object.assign({id: newUserId}, req.body);

  users.push(newUser);

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const updatingUser = users.find(el => el.id === id);
  if (!updatingUser) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  Object.assign(updatingUser, req.body);

  tours.map(r => (updatingUser.id == r.id) || r);

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: updatingUser
      }
    })
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteUser = users.find(el => el.id === id);
  if (!deleteUser) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainUsers = users.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(remainUsers), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: null
      }
    })
  });
};

app
  .route('/api/f1/users')
  .get(getAllUsers)
  .post(createUser)

app
  .route('/api/f1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

```

# 2. Xử lý routes với Router middlewave:
Ở phần trước mình đã giới thiệu về 2 cách refactor routes. Phần này, mình sẽ xử lý routes bằng cách sử dụng Router middlewave trong Express. Về cơ bản có thể hình dung middlewave là một tập hợp một hoặc nhiều ứng dụng hỗ trợ việc xử lý request và response. Khi phát sinh một request đến server, thông qua middlewave stack (tập hợp các middlewave), các thành phần trong request sẽ được xử lý ví dụ như định dạng params trong request, ghi log request,... và thông thường cuối cùng sẽ có middlewave Router tiếp tục xử lý và trả về response dựa trên request.<br>
Chỉnh sửa phần routes *app.js* như sau:
```javascript
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllF1Tours)
  .post(createAF1Tour)

tourRouter
  .route('/:id')
  .get(getAF1Tour)
  .patch(updateAF1Tour)
  .delete(deleteAF1Tour)

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/f1/tours', tourRouter);
app.use('/api/f1/users', userRouter);
```
Mình khai báo *tourRouter* và *userRouter* bằng *express.Router()* (middlewave sẵn có trong Express). Sau đó thay thế các định nghĩa này vào, thay vì *app.route(...)...* sẽ là *tourRouter.route(...)...*.<br>
Tuy nhiên, trong *route* mình không khai báo */api/f1/tours hoặc /api/f1/tours/:id* mà chỉ có */ và /:id*. Mình sẽ giải thích ngay sau đây. <br>
Để sử dụng middlewave, mình cần khai báo bằng *app.use(...)*. Bằng cách khai báo *app.use('/api/f1/tours', tourRouter)*, mình đã thêm vào middlewave stack phần xử lý cho request khi match đến route */api/f1/tours*. Có thể xem *'/api/f1/tours'* đóng vai trò là đường dẫn cha, sẽ chứa 2 đường dẫn con là */ và /:id*, tương đương với */api/f1/tours/ và /api/f1/tours/:id*.  Giải thích tương tự cho *userRouter* nhé. <br>
Kiểm tra lại một lượt, và mọi thứ hoạt động trơn tru đúng không nào. :v: 
# 3. Phần kế tiếp:
Circuit4 đến đây xin kết thúc. Phần kế tiếp mình sẽ tái cấu trúc lại toàn bộ code để có thể dễ dàng quản lý và gọn gàng hơn. Các bạn cùng đón đọc nhé. <br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- Và một số nguồn khác* <br>