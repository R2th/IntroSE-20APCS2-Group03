Bài viết này chia sẻ cách mình tạo một ứng dụng ToDo đơn giản với FeathersJS ở phía server và ReactJs ở Client. Mình sẽ đi vào một số phần chính là cách cài đặt, và sử dụng FeathersJS client với ReactJS như thế nào mà thôi, nên bài viết sẽ bỏ qua khá nhiều phần như xác thực dữ liệu, hiệu ứng, ...

# Cài đặt

Tạo thư mục cho dư án:
```
mkdir todo
cd todo && mkdir server
cd server
feathers generate app
```

![](https://images.viblo.asia/8738f37f-fba5-4be4-b899-ec34d531f1d1.gif)


Tạo service Tasks:

```
feathers generate service
```

![](https://images.viblo.asia/c72c91cb-e1c7-4359-adbd-8c0b9cf36dd1.gif)


Sửa file `src/models/tasks.model.js`:
    
```js
const schema = new Schema({
    text: { type: String, required: true },
    status: { type: String, enum: ['unfinished', 'finished', 'removed'], default: 'unfinished' },
    user: { type: String, required: true, ref: 'users', index: true }
}, {
    timestamps: true
});
```

[github](https://github.com/hungkieu/Feathers-React-Todo-App/blob/master/server/src/models/tasks.model.js)

![](https://images.viblo.asia/5c019d35-bb9f-4a79-b10f-1e2a2c3ccaea.png)

Vậy là xong server rồi đấy  :)

Tiếp theo với Client, trong todo folder:
```
npx create-react-app client
cd client
yarn add @feathersjs/feathers @feathersjs/rest-client @feathersjs/authentication-client
```



cài đặt Feathers:

```js
// src/feathers.js

import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import authentication from '@feathersjs/authentication-client';

const app = feathers();
const restClient = rest('http://localhost:3030');
app.configure(restClient.fetch(window.fetch));
app.configure(authentication({
  storageKey: 'authentication'
}));

export default app;
```

[github](https://github.com/hungkieu/Feathers-React-Todo-App/blob/master/client/src/feathers.js)

Xong phần cài đặt để có thể sử dụng Feathers trên client, giờ mình có thể bắt tay vào code React rồi :v:

# Giao diện mẫu
![](https://images.viblo.asia/ba18ba8f-6b60-48b3-a791-05af4d1e6cfb.png)

# Viết Code
Cài đặt thêm một số thư viện:

* react-router-dom
* material-ui
* moment

## Đăng nhập và đăng ký

Đăng ký:
```js
const handleSubmitForm = async (data) => {
    await feathers.service('users').create(data);
    SignUpSuccess();
}

const SignUpSuccess = () => {
    history.push('/signin');
}
```

[github](https://github.com/hungkieu/Feathers-React-Todo-App/blob/master/client/src/containers/SignUp/index.js)

Đoạn code bên dưới để xử lý phần đăng nhập:

```js
const handleSubmitForm = async data => {
    try {
      const response = await feathers.authenticate({
        strategy: 'local',
        ...data
      });
      signInSuccess(response);
    } catch {
      alert('Sign In Failed!');
      setCurrentUser(undefined);
    }
};

const signInSuccess = ({ user }) => {
    setCurrentUser(user);
    history.push('/');
};
```

[github](https://github.com/hungkieu/Feathers-React-Todo-App/blob/master/client/src/containers/SignIn/index.js)

Đăng nhập khi đã có accessToken trong localStorage:
```js
useEffect(() => {
    const reAuthenticate = async () => {
      const response = await feathers.reAuthenticate();
      if (response && response.user) {
        setCurrentUser(response.user);
      }
    }

    const authenticate = async () => {
      const accessToken = await feathers.authentication.getAccessToken();
      if (accessToken) {
        await reAuthenticate();
      }
      setLoading(false);
    };

    authenticate();
}, []);
```

[github](https://github.com/hungkieu/Feathers-React-Todo-App/blob/master/client/src/containers/App/index.js)

Tổng hợp lại thành cái sơ đồ cho mọi người xem:

![](https://images.viblo.asia/69323637-d970-4a8b-8134-992c1843c5cd.png)

## Tasks

Lấy toàn bộ task:

```js
useEffect(() => {
    const loadTasks = async () => {
      const response = await feathers.service('tasks').find({
        query: {
            user: user._id,
            $sort: { status: -1, updatedAt: -1 }
        }
      });

      setTasks(response.data);
    };

    loadTasks();
}, [task, user._id]);
```
Đoạn code `[task, user._id]` này nghĩa là khi task thay đổi thì mình sẽ load lại toàn bộ danh sách task, mình sử dụng cách này để lấy lại danh sách task khi thêm, và sửa trạng thái task.

Thêm task mới:

```js
const addTask = async data => {
    const response = await feathers
      .service('tasks')
      .create({ user: user._id, ...data });
    setTask(response);
};
```

Thay đổi trạng thái:

```js
const getTask = (id, tasks) => tasks.find(task => id === task._id);

const changeStatusTask = async id => {
    const task = getTask(id, tasks);
    const status = task.status === 'finished' ? 'unfinished' : 'finished';
    const response = await feathers
      .service('tasks')
      .patch(id, { status });
    setTask(response);
};
```

[github](https://github.com/hungkieu/Feathers-React-Todo-App/blob/master/client/src/containers/Home/index.js)
# Kết quả
![](https://images.viblo.asia/d1ea201f-3323-48c5-8dca-cf745f4a4e80.gif)

Repo github: https://github.com/hungkieu/Feathers-React-Todo-App

Mình tóm tắt bài viết với các ý chính như sau:
1. Sử dụng Feathers Client với ReactJS.
2. Xác thực người dùng.
3. Thêm, sửa, xóa.

Cảm ơn vì đã đọc bài viết của mình :bow: