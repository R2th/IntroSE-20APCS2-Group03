Heroku
Heroku cung cấp dịch vụ máy chủ trong việc deploy ứng dụng. Điều tuyệt vời ở Heroku là trang này bạn có thể sử dụng dịch vụ hoàn toàn miễn phí với các ứng dụng web không yêu cầu tốc độ truy cập cao hay dung lượng lớn.

### Kiến thức cơ bản

Để làm việc với heroku bạn cần chuẩn bị một số kiến thức cơ bản như

Sử dụng git command

Đã tạo 1 tài khoản trên heroku. https://signup.heroku.com/?c=70130000001x9jFAAQ

Cài đặt thành công heroku cli. Nếu bạn chưa cài đặt vui lòng lựa chọn phiên bản và cài đặt tại đây

Biết sử dụng một trong các ngôn ngữ mà heroku support tại đây

   Oke nếu bạn đã chuẩn bị đẩy đủ các điều kiện trên thì ta sẽ bắt đầu ngay thôi
   
   Chú ý: Trong phạm vi bài viết này mình sẽ hướng dẫn các bạn deploy ứng dụng lên heroku trên nền tảng nodejs các nền tảng khác cũng tương tự.
   
Bạn có thể tham khảo tài liệu trên trang chủ của heroku.

https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

Bắt đầu với Node.js trên Heroku Tooloku

Tải xuống và cài đặt và Thiết lập, hãy thực hiện chính xác, sau đó bạn có thể chạy heroku từ dòng lệnh.

```
$ heroku
Usage: heroku COMMAND [--app APP] [command-specific-options]
...
```

Thực hiện login từ heroku như sau

```
$ heroku login
Enter your Heroku credentials.
Email: hoanghung.ict@gmail.com
Password (typing will be hidden):
Authentication successful.
```

thực hiện logout Heroku.

```
heroku logout
 Local credentials cleared.
```
 
sử dụng git sao chép ứng dụng nodejs được cung cấp dưới dạng mẫu

```

git clone https://github.com/heroku/node-js-getting-started.git
```
```

$ heroku create
Creating gentle-reaches-3456... done, stack is cedar-14
https://gentle-reaches-3456.herokuapp.com/ | https://git.heroku.com/gentle-reaches-3456.git
Git remote heroku added
$
$ git remote -v
heroku  https://git.heroku.com/gentle-reaches-3456.git (fetch)
heroku  https://git.heroku.com/gentle-reaches-3456.git (push)
origin  https://github.com/heroku/node-js-getting-started.git (fetch)
origin  https://github.com/heroku/node-js-getting-started.git (push)
$
$ git push heroku master
Counting objects: 375, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (295/295), done.
Writing objects: 100% (375/375), 208.74 KiB | 0 bytes/s, done.
Total 375 (delta 50), reused 375 (delta 50)
...
...
$ heroku ps:scale web=1
Scaling dynos... done, now running web at 1:1X.
$ heroku open
```

Xác nhận quá trình  được triển khai 

Tail

```
$ heroku log --tail
2014-12-12T11:10:13.958570+00:00 heroku[router]: at=info method=GET path="/" host=gentle-reaches-3456.herokuapp.com request_id=005ea777-e7b0-4e6a-a659-e291afc2d634 fwd="126.54.29.38" dyno=web.1 connect=1ms service=3ms status=304 bytes=130
```

apps:info

```

 heroku apps:info
=== gentle-reaches-3456
Dynos:         1
Git URL:       https://git.heroku.com/gentle-reaches-3456.git
Owner Email:   hiyuzawa@gmail.com
Region:        us
Repo Size:     211k
Slug Size:     5M
Stack:         cedar-14
Web URL:       https://gentle-reaches-3456.herokuapp.com/
Workers:       0
updating...done. Updated to 3.20.0
```

cmd PS

```
$ heroku ps
=== web (1X): `node index.js`
web.1: up 2014/12/12 20:09:48 (~ 9m ago)
```

### Chế độ bảo trì
Trong khi ở chế độ bảo trì, bạn có thể kích hoạt chế độ bảo trì tích hợp của HEROKU khi ở chế độ bảo trì, ứng dụng của bạn là một trang bảo trì tĩnh cho tất cả khách truy cập.

Trong khi chế độ bảo trì được kích hoạt, mã lỗi H80 được trả về trong nhật ký của bạn.


```

$ heroku maintenance:on
Enabling maintenance mode for gentle-reaches-3456... done
```
Tắt chế độ bảo trì 

```
$ heroku maintenance:off
Disabling maintenance mode for myapp... done
```

Để kiểm tra trạng thái bảo trì hiện tại của ứng dụng:

```
$heroku maintenance
off
```

Chế độ bảo trì và dynos
Web dynos tiếp tục chạy, nhưng các bộ định tuyến của Heroku chặn tất cả các yêu cầu HTTP đến với chúng Dynos của các loại khác (chẳng hạn như dynos worker ) cũng tiếp tục chạy và bạn có thể chạy dynos một lần như bình thường.

run

```
$ heroku run bash
Running `bash` attached to terminal... up, run.4882
~ $
~ $ ls
Procfile  README.md  app.json  index.js  node_modules  package.json  public  vendor
~ $ exit
$
```

Procfile. Với Procfile trong ứng dụng Root

```

$ cat Procfile
web: node index.js
```

releases

```
$ heroku releases
=== gentle-reaches-3456 Releases
v4  Deploy 8c8b5ac   hiyuzawa@gmail.com  2014/12/12 20:33:15 (~ 1m ago)
v3  Deploy 1adc26f   hiyuzawa@gmail.com  2014/12/10 23:25:32
v2  Enable Logplex   hiyuzawa@gmail.com  2014/12/10 23:22:44
v1  Initial release  hiyuzawa@gmail.com  2014/12/10 23:22:43
$
$ heroku release:rollback v3
```

Biến môi trường
```

$ heroku config:set name=hiyuzawa
Setting config vars and restarting gentle-reaches-3456... done, v9
name: hiyuzawa
$ heroku config:get name
hiyuzawa
$ heroku config
=== gentle-reaches-3456 Config Vars
name: hiyuzawa

Bây giờ bạn có thể tham khảo process.env.name từ nodejs
Để xem env này trong môi trường phát triển cục bộ, hãy sử dụng foreman.

```
```

$ more .env
name=hiyuzawa
$ foreman start
20:52:20 web.1  | started with pid 26689
20:52:21 web.1  | Node app is running at localhost:5000
```

Đừng quên thêm file .gitignore 

```

$ cat .gitignore
node_modules
.env
```


Tài liệu tham khảo: 

https://qiita.com/hiyuzawa/items/0c17de747b27b99907d0
https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction