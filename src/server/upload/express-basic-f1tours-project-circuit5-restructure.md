Chào các bạn! Nối tiếp [Circuit4](https://viblo.asia/p/express-basic-f1tours-project-circuit4-them-cac-chuc-nang-xu-ly-user-va-xu-ly-routes-bang-router-middlewave-ORNZqDX8K0n). Hôm nay, chúng ta tiếp tục đến với chặng 5 của "F1 Tours" nhé!
Trong phần này, mình sẽ tái cấu trúc lại *F1Tours*.<br>
# 1. Tái cấu trúc F1Tours:
## Quản lý routes trong thư mục Routes:
Bằng việc quản lý các routes vào các module riêng, mình sẽ mang các routes vào thư mục *Routes* để quản lý như cấu trúc sau:<br>

![](https://images.viblo.asia/bae69d16-c382-4860-9d17-f293d7f00a63.png)

Mang toàn bộ phần routes và các functions riêng quan của *tourRoutes* vào file *tourRoutes.js*, và *userRoutes* vào file *userRoutes.js* trong thư mục Routes. Nội dung của mỗi file như sau:

```
tourRoutes.js

const express = require('express');

const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/f1tours.json`));

const getAllF1Tours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
};

const getAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }


  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
};

const createAF1Tour = (req, res) => {
  const newF1Id = tours.length + 1;
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
};

const updateAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const updatingTour = tours.find(el => el.id === id);
  if (!updatingTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  Object.assign(updatingTour, req.body);

  tours.map(r => (updatingTour.id == r.id) || r);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
};

const deleteAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteTour = tours.find(el => el.id === id);
  if (!deleteTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};

const router = express.Router();

router
  .route('/')
  .get(getAllF1Tours)
  .post(createAF1Tour)

router
  .route('/:id')
  .get(getAF1Tour)
  .patch(updateAF1Tour)
  .delete(deleteAF1Tour)

module.exports = router;

======================
userRoutes.js

const express = require('express');

const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

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

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
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

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
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

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(remainUsers), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: null
      }
    })
  });
};

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

 module.exports = router;
```
Và trong *app.js*, mình require 2 module *tourRoutes* và *userRoutes* để xử lý routes. Nội dung *app.js* như sau:
```
const express = require('express');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());


app.use('/api/f1/tours', tourRouter);
app.use('/api/f1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});

```
## Quản lý các functions xử lý trong routes trong thư mục controllers:
Nhận thấy các functions xử lý trong routes của tour và user là khá nhiều. Để có thể mở rộng các function hoặc xử lý routes cần tách riêng việc xử lý routes và routes riêng lẽ. Việc này giúp mình dễ dàng quản lý và phát triển ứng dụng hơn.<br>
Cấu trúc thư mục như sau:

![](https://images.viblo.asia/6e8ddd88-89de-45c6-adc4-b492d430c2f2.png)

Mình sẽ mang toàn bộ các functions trong trong routes của tour và user sang controller tương ứng là *tourController.js* và *userController.js*. Nội dung 2 controller này như sau:
```
tourController.js

const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/f1tours.json`));

exports.getAllF1Tours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
};

exports.getAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }


  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
};

exports.createAF1Tour = (req, res) => {
  const newF1Id = tours.length + 1;
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
};

exports.updateAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const updatingTour = tours.find(el => el.id === id);
  if (!updatingTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  Object.assign(updatingTour, req.body);

  tours.map(r => (updatingTour.id == r.id) || r);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
};

exports.deleteAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteTour = tours.find(el => el.id === id);
  if (!deleteTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};


=============
userController.js

const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users
    }
  })
};

exports.getUser = (req, res) => {
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

exports.createUser = (req, res) => {
  const newUserId = users.length + 1;
  const newUser = Object.assign({id: newUserId}, req.body);

  users.push(newUser);

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  });
};

exports.updateUser = (req, res) => {
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

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: updatingUser
      }
    })
  });
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteUser = users.find(el => el.id === id);
  if (!deleteUser) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainUsers = users.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(remainUsers), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: null
      }
    })
  });
};

```

Trong *tourController* và *userController*, mình sẽ export tất cả functions để có thể sử dụng chúng trong routes. Và trong routes, mình sẽ require *tourController* và userController như sau:
```
tourRoutes.js

const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllF1Tours)
  .post(tourController.createAF1Tour)

router
  .route('/:id')
  .get(tourController.getAF1Tour)
  .patch(tourController.updateAF1Tour)
  .delete(tourController.deleteAF1Tour)

module.exports = router;

============
userRoutes.js

const express = require('express');

const userController = require('./../controllers/userController');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

 module.exports = router;
```

## Quản lý riêng server và app:
Cũng giống như việc quản lý *routes* và *controller*, việc quản lý riêng *server* và *app* cũng giúp cho việc quản lý các nội dung liên quan đến *server* và *app* được dễ dàng và thuận tiện hơn.<br>
Mình tạo file *server.js* cùng cấp với *app.js* và chuyển phần lắng nghe server và port trong app ra quản lý ở *server.js*.
```
server.js

const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});

```
Lúc này việc khởi động server sẽ thực hiện start bằng *server.js*. Thay vì mở terminal và gọi *nodemon server.js*, mình sẽ sử dụng scripts npm để chạy.<br>
Trong *package.json*, phần *scripts*, mình sẽ sửa lại:
```
"scripts": {
    "start": "nodemon server.js"
  }
```
Lúc này, mình chỉ cần gõ trong terminal:
```
npm start
```
Và thế là xong. Dùng *curl* test lại các api để chắc chắn chúng vẫn hoạt động trơn tru nhé.
# 2. Phần kế tiếp:
Circuit5 đến đây xin kết thúc. Các bạn cùng đón đọc bài kế tiếp nhé. <br>
*Cảm ơn các bạn đã đọc bài viết của mình.* <br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.* <br>
***Nguồn tham khảo***:<br>
*- Expressjs.com*<br>
*- Udemy.com* <br>
*- Và một số nguồn khác* <br>
***Cập nhật link github [F1Tours](https://github.com/dtmhdev89/ExpressSample_F1Tours) để các bạn dễ dàng theo dõi hơn***