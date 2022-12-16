Tất cả developer chắc hẳn ai cũng đã đau đầu về việc deploy một ứng dụng lên internet. Hôm nay tôi sẽ giới thiệu với các bạn các deploy một ứng dụng rails và react lên Heroku là như thế nào. 

# Heroku
Về cơ bản là bạn đang sử dụng Amazon theo 1 cách nào đó, đơn giản vì Heroku sử dụng Amazon EC2. Heroku đã support khá nhiều các ngôn ngữ khác nhau và rất thuận tiện cho một người mới sử dụng. 

https://devcenter.heroku.com/start
# Chuẩn bị 

1. Hãy chắc chắn code mới nhất của bạn đã nằm trên **GitHub**.
2. Đã có tài khoản trên [**Heroku**](https://id.heroku.com/login)
3. Đã cài đặt [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
4. Kiểm tra tên ứng dụng của bạn có khả dụng hay không. (Khi tạo heroku sẽ check giúp bạn)

![](https://images.viblo.asia/be8d3eab-16be-499a-b3e3-77b8291b22b4.png)

5. Đảm bảo Ruby version của bạn [tương thích với Heroku](https://devcenter.heroku.com/articles/ruby-support#supported-runtimes)

# Deploy Backend: Rails API
Khi deploy lên Heroku, chúng ta cần lưu ý rằng mình làm việc đúng với loại sơ sở dữ liệu. Mặc định, Heroku sẽ sử dụng PostgreSQL (làm việc tốt nhất) nên hãy đảm bảo rằng code của bạn sử dụng PostgresSQL. Tuy nhiên, Heroku cũng cung cấp các add-on để hỗ trợ làm việc với các hệ quản trị cơ sở dữ liệu khác như **MySQL**, sẽ cần phải setup một chút để có thể sử dụng được. Các bạn có thể tham khảo tại [link](https://devcenter.heroku.com/articles/cleardb) để có thể sử dụng MySQL. 

Sau khi đã setup xong xuôi hãy bắt đầu với các bước sau để deploy. 

### Đăng nhập Heroku
```bash
$ heroku login
```

### Khởi tạo Heroku project

```bash
$ heroku create demo-deploy-rails-api

Creating app... done, demo-deploy-rails-api
https://demo-deploy-rails-api.herokuapp.com/ | https://git.heroku.com/demo-deploy-rails-api.git

$ git config --list | grep heroku

remote.heroku.url=https://git.heroku.com/demo-deploy-rails-api.git
remote.heroku.fetch=+refs/heads/*:refs/remotes/heroku/*
```

### Setup các giá trị biến môi trường

Kiểm tra config:

```bash
$ heroku config

GITHUB_USERNAME: joesmith
OTHER_VAR:    production

$ heroku config:get GITHUB_USERNAME

joesmith
```

Thêm config:
```bash
$ heroku config:set GITHUB_USERNAME=joesmith

Adding config vars and restarting myapp... done, v12
GITHUB_USERNAME: joesmith
```

Xóa config:
```bash
$ heroku config:unset GITHUB_USERNAME

Unsetting GITHUB_USERNAME and restarting myapp... done, v13
```

### Đẩy code lên heroku

```bash
$ git add .

$ git commit -m "first heroku commit"

$ git push heroku master
```

### Tạo dữ liệu

```bash
$ heroku run rake db:migrate

$ heroku run rake db:seed
```

### Mở app

```bash
$ heroku open
```

### Xem logs

```bash
$ heroku logs
```

Bạn cũng có thể xem toàn bộ log bằng cách thêm option `--tail` như sau

```bash
$ heroku logs --tail
```

### Console

```bash
$ heroku run rails console 
```

### Lưu ý

Hãy đảm bảo rằng bạn đã setup [rack-cors](https://github.com/cyu/rack-cors) đầy đủ trên môi trường production để React app có thể thao tác một cách dễ dàng. 
# Deploy Frontend: React App

Với một React app, chúng ta cần phải đảm bảo chính xác version cho **npm** và **node**. Đầu tiên hãy cũng check lại một lượt:

```bash
$ npm -v

$ node -v
```

Về cơ bản một file package.json của chúng ta sẽ như thế này:
```json
{
  “name”: “demo-deploy-react-app”,
  “version”: “0.1.0”,
  “private”: true,
  “engines”: {
     “npm”: “6.4.1”,
     “node”: “10.12.0”
  },
  “dependencies”: {
     “react”: “16.7.0”,
     “react-dom”: “16.7.0”,
     “react-redux”: “6.0.1”,
     “react-router-dom”: “4.3.1”,
     “react-scripts”: “2.1.8”,
     “redux”: “4.0.1”
  },
  “scripts”: {
     “start”: “react-scripts start”,
     “build”: “react-scripts build”,
     “test”: “react-scripts test”,
     “eject”: “react-scripts eject”
  }
}
```

Tiếp theo chúng ta sẽ tiến hành deploy lên Heroku

### Đăng nhập Heroku

```bash
$ heroku login
```

### Khởi tạo Heroku project

```bash
$ heroku create demo-deploy-react-app

Creating app... done, demo-deploy-react-app
https://demo-deploy-react-app.herokuapp.com/ | https://git.heroku.com/demo-deploy-react-app.git

$ git config --list | grep heroku

remote.heroku.url=https://git.heroku.com/demo-deploy-react-app.git
remote.heroku.fetch=+refs/heads/*:refs/remotes/heroku/*
```

### Đẩy code lên heroku

```bash
$ git add .

$ git commit -m "first heroku commit"

$ git push heroku master
```

Mặc định heroku sử dụng nhánh master để run code. Nên trường hợp bạn không sử dụng nhánh master để deploy mà sử dụng nhánh khác thì có thể sử dụng lệnh như sau

```bash
$ git push heroku working_branch:master
```

Trong suốt quá trình làm việc, khi bạn có bất kì thay đổi nào thì hãy thực hiện lại việc deploy như sau:

```bash
$ git add .

$ git commit -m "task name"

$ git push heroku master
```

### Mở app

```bash
$ heroku open
```

# Sử dụng Heroku web

Từ đầu tới giờ chúng ta đã làm quen với các thao tác deploy bằng terminal. Tuy nhiên có một cách đơn giản hơn nếu như bạn sử dụng GitHub. 

Tất cả bạn phải làm là đăng nhập vào tài khoản Heroku của bạn.  Chọn vào "New"

![](https://images.viblo.asia/4fd521b9-da7c-4702-b766-457d6b2451b1.png)

Sau đó chọn tên cho ứng dụng của bạn

![](https://images.viblo.asia/be8d3eab-16be-499a-b3e3-77b8291b22b4.png)

Sau khi nhấp vào tạo, bạn sẽ được chào đón bằng bảng điều khiển cho ứng dụng bạn vừa tạo. Chuyển tới tab "Deploy"

![](https://images.viblo.asia/59a2630f-acee-43cd-ad48-22ffc930edcc.png)

Lựa chọn đồng bộ hóa tài khoản Github của bạn với Heroku.
![](https://images.viblo.asia/dffe20f2-dc0a-4e53-be61-9227c11187d8.png)

Sau khi đồng bộ hóa tài khoản Github, bạn có thể tìm kiếm repo mà bạn muốn đồng bộ hóa với Heroku bằng cách cuộn xuống "**App connected to Github**" và tìm kiếm kho lưu trữ mà bạn muốn đồng bộ hóa.

Bạn cũng có thể thiết lập **automatic deployment**, hệ thống sẽ tự động deploy mỗi khi nhánh **master** có thay đổi

Trên đây là tất cả mọi thứ về deploy với Heroku. Bài viết được tham khảo từ [nguồn](https://medium.com/coding-in-simple-english/deploying-rails-react-app-to-heroku-35e1829242ab). Cảm ơn các bạn đã theo dõi