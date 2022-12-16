![](https://images.viblo.asia/31bddef8-c1dd-43c1-9be7-5c28942642bf.png)

Bạn có đang dùng Heroku - 1 PaaS (Platform as a Service) đơn giản, được nhiều người biết đến không? Trước đây chưa lâu, tôi đã thử nó để dựng Web Application và thấy rất tiện lợi. Tuy vậy, tôi vẫn băn khoăn: giá mà có 1 tool nào đó có thêm Machine power, và mình có thể sử dụng tùy ý, dễ dàng hơn thì tốt biết mấy.

Sau nhiều lần lân la tìm hiểu, thì tôi thấy có 1 phần mềm đáp ứng được các yêu cầu trên của tôi. Đó chính là [Dokku](https://github.com/dokku/dokku) . Đây là bản Clone của Heroku, với nền tảng Docker.
Chính vì có nền tảng Docker, người dùng có thể tùy ý lựa chọn Cloud, dựng Server cho VPS.  Trong bài viết này, tôi xin giới thiệu tới các bạn các bước khi sử dụng[ SAKURA Cloud ](https://cloud.sakura.ad.jp/?_ga=2.239117445.740425605.1516854096-1856959150.1514276892)để chạy Dokku.

### Dựng Server Ubuntu trên Cloud Sakura

![](https://images.viblo.asia/c77d0e4b-f1d3-4b95-9146-70dbb0cd86a8.png)

Click vào button **追加**/Add
Dokku hiện đang hỗ trợ Ubuntu 12.04 x64 và 14.04 x64 . Nếu nói về LTS, vì đây tôi chọn 14.04.  nên đã đăng ký Ubuntu Server 14.04 LTS 64bit（Stadard Set）vào Archive là xong.
Ubuntu Server 14.04 LTS Chọn 64bit （Standard Set）

![](https://images.viblo.asia/82104972-8a86-4dbd-a2ee-f0f01ea649e2.png)

Sau đó, tôi đăng ký Public key, và khởi động Server. Server được dựng xong chỉ sau vài phút.

### Install Dokku

Sau khi Server đã được dựng xong, sẽ Login vào bằng SSH. Do đã đăng ký Public key nên bạn có thể login.
```

$ ssh ubuntu@server_ip_address
```

Bạn cần đổi server_ip_address thích hợp. Sau khi login vào server, bạn chạy câu lệnh sau:
```

$ wget -qO- https://raw.github.com/progrium/dokku/v0.2.3/bootstrap.sh | sudo DOKKU_TAG=v0.2.3 bash
```
Lúc này,  lần đầu tiên không chạy trôi chảy nhưng việc setup sẽ hoàn tất khi bạn chạy lần 2.

### Chọn Address

Khi bạn Deploy 1 app có tên là app1 bằng Dokku, thì nó sẽ chạy bằng sub domain như kiểu là http://app1.example.com . Vì vậy, bạn cần quyết định, chọn tên domain trước.
Setting: Bạn có thể thay đổi  /home/dokku/VHOST. Ví dụ: Nếu bạn định dùng dokku.moongift.jp thì sẽ Setting như dưới đây.

`#echo "dokku.moongift.jp" > /home/dokku/VHOST`

### Setting Public Key

Setting Public key để access vào Responsitory. 
Nếu đã có account trên GitHub, thì bạn nên sử dụng phần hướng dẫn cài đặt trong bài viết sau đây thì sẽ tiện hơn  [Nhập môn docker – Dokku  – Qiita ](https://qiita.com/udzura/items/8b7ffaa1c0ec9994e7ef#3-2)

`#curl https://github.com/GITHUB_USERNAME.keys | sudo sshcommand acl-add dokku DESC`

Trong mục GITHUB_USERNAME: chọn tên của mình, phần DESC : chọn phần giải thích  phù hợp.
Như vậy là bạn đã hoàn tất các khâu chuẩn bị rồi đó.

### Thử Deploy với app node.

Sau đây, tôi xin demo cho các bạn dễ hình dung. ở đây, tôi đang sử dụng [heroku/node-js-sample](https://github.com/heroku/node-js-sample). Dưới đây là các thao tác tôi tự  thực hiện trên môi trường Local.
```
$ git clone git@github.com:heroku/node-js-sample.git
$ cd node-js-sample
$ git remote add progrium dokku@server_address:node-js-app
$ git push progrium master
```

**server_address** : bạn hãy chọn địa chỉ mà trước đó bạn đã chọn trên VHOST. Khi push, thì /home/dokku sẽ được tự động tạo ra trên Responsitory của Git và Deploy tự động chạy. Check log sẽ thấy như sau:
```
$ git push progrium master
Counting objects: 378, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (304/304), done.
Writing objects: 100% (378/378), 209.77 KiB | 0 bytes/s, done.
Total 378 (delta 45), reused 378 (delta 45)
-----> Cleaning up ...
remote: Cloning into '/tmp/tmp.NO73c0jCC6'...
-----> Building node-js-app ...
remote: warning: You appear to have cloned an empty repository.
remote: done.
remote: HEAD is now at 97a7c5c... wording
   	Node.js app detected
-----> Requested node range:  0.10.x
-----> Resolved node version: 0.10.30
-----> Downloading and installing node
-----> Writing a custom .npmrc to circumvent npm bugs
-----> Installing dependencies
   	express@4.8.3 node_modules/express
   	├── utils-merge@1.0.0
     	:
   	└── send@0.8.1 (ms@0.6.2, mime@1.2.11, finished@1.2.2)
-----> Caching node_modules directory for future builds
-----> Cleaning up node-gyp and npm artifacts
-----> No Procfile found; Adding npm start to new Procfile
-----> Building runtime environment
-----> Discovering process types
   	Procfile declares types -> web
-----> Releasing node-js-app ...
-----> Deploying node-js-app ...
=====> Application deployed:
   	http://node-js-app.dokku.moongift.jp
 
To dokku@dokku.moongift.jp:node-js-app
 * [new branch]  	master -> master
```

Sau khi Deploy xong, bạn sẽ access vào được URL đang được hiển thị ra.

![](https://images.viblo.asia/2280c564-7041-42bd-8987-2235d14c71b6.png)

Như vậy là phần deploy đã được thực hiện hoàn toàn tự động.

### Docker

Các bạn có thể confirm xem app đã được deploy hay chưa bằng câu lệnh của docker 

```
$ sudo docker ps
CONTAINER ID    	IMAGE                  	COMMAND            	CREATED         	STATUS     	     PORTS                 	NAMES
e1cdd1502e87    	dokku/node-js-app:latest   /bin/bash -c '/start   2 hours ago     	Up 2 hours      	0.0.0.0:49153->5000/tcp   suspicious_nobel
```
Các bạn cũng có thể check ảnh nữa

| REPOSITORY  | TAG | IMAGE ID |CREATED |VIRTUAL SIZE |
| -------- | -------- | -------- |-------- |-------- |
| dokku/node-js-app     | latest      | 780d7dcbbb19     |2 hours ago     |885.3 MB     |
| progrium/buildstep     | latest      | 47f25c200541     |2 hours ago     |866.4 MB     |


Bạn có thể thấy rằng: Docker Container được dựng theo dạng từng đơn vị của App bạn vừa Deploy. Vì vậy, bạn có thể thấy rằng: Kể cả khi Resource ở trạng thái “bị quản lý ở mức độ thích hợp” do Secure  thì bạn vẫn có thể vận hành, chạy App.

### TÓM TẮT

Hiện tại Dokku hỗ trợ tất cả các buildparks của Heroku như "Ruby, Node.js, Clojure, Python, Java, Gradle, Grails 3.x, Scala, Play 2.x, PHP,Go" nên bạn có thể sử dụng các config ứng dụng của bạn tương tự như của heroku app để deploy ứng dụng của mình trên Dokku.

Thứ hai: Chỉ cần push lên Repository của Github là bạn đã có thể build được Web server.  Ngoài ra, khác với Hereku, Sub Domain của Dokku rất dễ hiểu nên khi quản lý cũng dễ dàng hơn. Tuy nhiên, các bạn cũng cần chú ý, do nó không có màn hình quản lý.

Trên đây là những lưu ý của cá nhân tôi khi sử dụng Dokku. Các bạn hãy dùng thử và trải nghiệm Dokku nha.

[progrium/dokku](https://github.com/dokku/dokku)