Xin chào các bạn. Hôm nay mình sẽ tiếp tục  series về Vuejs. Hôm nay mình sẽ giới thiệu với các bạn cách để Triển khai ứng dụng Vue lên máy chủ VPS với Nginx.

---

## Giới thiệu

Việc triển khai ứng dụng VueJS của bạn lên trên máy chủ VPS bằng Nginx sẽ khá là khó nếu bạn không làm đúng cách. Dưới
đây mình sẽ giới thiệu chi tiết với các bạn cách tạo một ứng dụng mới vào kết nối nó lên máy chủ VPS với Nginx.


## Chuẩn bị Server

Đầu tiền.Cần chuẩn bị một server Ubuntu và có thể kết nối với server bằng quyền `root`.Tiếp theo thì 
hãy cập nhật lại Ubuntu trước để đảm bảo tất cả đều ở trạng thái mới nhất :

``` html
$ apt update
```

Tiếp theo hãy cài đặt Nginx là server :

``` html
$ apt install nginx
```

Giờ để cài đặt Vue thì trước tiên cần cài đặt `npm`:

``` html
$ apt install npm
```

Bây giờ thì cài đặt VueJS nhé :

``` html
npm i -g vue-cli@2.9.6
```

Để quyền `root` của Nginx để trỏ vào dự án VueJS mà lát nữa chúng ta sẽ tạo.Đầu tiên mở file cài đặt cảu Nginx lên :

``` html
$ nano /etc/nginx/sites-available/default
```

Tìm đến dòng này nhé :

``` html
root /var/www/html;
```

Và giờ hãy sửa lại nó nhé. (dưới đây là tên thư mục dự án VueJS của tôi. Các bạn hãy thay nó bằng tên thư mục dự án VueJS  mà 
các bạn sẽ tạo nhé):

``` html
root /var/www/html/project/dist;
```

Lưu file lại và khởi động lại Nginx nhé :

``` html
$ systemctl restart nginx
```

## Triển khai một ứng dụng VueJS cơ bản đến Server
vào  thư mục `/var/www/html` vào tạo một ứng dụng Vuejs cơ bản bằng webpack:

``` html
$ cd /var/www/html
```

Sau đó cài đặt một ứng dụng VueJS với tên là "testVuejs":

``` html
$ vue init webpack testVuejs
```

vào thư mục "testVuejs":

``` html
$ cd project
```

Giờ sẽ tiến hành xây dựng ứng dụng VueJS:

``` html
$ npm run build
```

Giờ ứng dụng VueJS của bạn đã sẵn sàng sử dụng. Bạn có thể truy cập nó bằng tên miền của mình hoặc địa chỉ IP của server.

## Kết Luận

Như vậy thì việc triên khai một ứng dụng VueJS lên máy chủ VPS là không quá khó. Việc quan trọng là bạn cần trỏ máy chủ Nginx đến đúng dự án VueJS của bạn mà thôi. Sau đó hãy xây dựng ứng dụng VueJS bên trong nó.



---


Như vậy là mình đã giới thiệu các bạn những bước cơ bản để Triển khai một ứng dụng VueJS cơ bản đến server Nginx. Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---
### Tham Khảo chi tiết hơn

https://cli.vuejs.org/guide/deployment.html