Nginx là một Web Server phổ biến, quen thuộc đối với những Web Developer. Nginx hoạt động mạnh mẽ với hiệu suất cao, khả năng xử lí nhiều request đồng thời một lúc mà lại tốn ít tài nguyên. Ngoài việc được sử dụng là một Web Server, Nginx còn được sử dụng như là một Load Balancer và Reverse Proxy. Trong bài viết này, mình sẽ hướng dẫn cách cấu hình Nginx thành một Web Server như thế nào.

**1. Chuẩn bị**
- Trong bài viết này, máy tính mình sử dụng với hệ điều hành Ubuntu 20.04.
- Cài đặt Docker.
- Mình sẽ không sử dụng Nginx trực tiếp trên máy tính của mình, mà mình sẽ sử dụng Docker. Để khởi tạo container với image Nginx, mình sẽ sử dụng câu lệnh sau:
```
docker container run -p 8080:80 --name nginx_tutorial nginx
```
- Và khi khởi tạo container thành công, dùng trình duyệt web với URL sau: **localhost:8080** để kiểm tra xem đã khởi tạo thành công hay chưa? Kết quả như sau thì sẽ là thành công:

![](https://images.viblo.asia/1c828351-4579-4706-99b0-3aa348617a7f.png)


**2. Cấu hình Nginx**

Đầu tiên mình sẽ chui vào Container mình vừa khởi tạo, bằng câu lệnh sau:

```
docker container exec -it nginx_tutorial bash
```

![](https://images.viblo.asia/34efe7fa-17d4-4055-9618-0a07b63c7e47.png)

Những file cấu hình Nginx, thường có đuôi file là .conf và nằm trong thư mục /etc/nginx:

![](https://images.viblo.asia/b677ed38-ada4-4b89-950d-af612bac2509.png)

Và file cấu hình chính cho Nginx là file **nginx.conf**, xem nội dung file này bằng câu lệnh: `cat nginx.conf`:

![](https://images.viblo.asia/b06c913e-12b1-4582-b896-7c38401a2130.jpeg)

Để cấu hình Nginx, chúng ta sẽ tập trung vào file **nginx.conf**, và mình sử dụng Nano editor để chỉnh sửa file này.

**Lưu ý: Container này sẽ không có sẵn Nano editor và chúng ta sẽ phải cài thêm bằng câu lệnh sau:** 
```
apt-get update
apt-get install nano
```

Sửa đổi file **nginx.conf**, với nội dung như sau:

```
events {

}

http {

    server {

        listen 80;
        server_name nginx-tutorial.test;

        return 200 "Hello World!\n";
    }

}
```

Nếu như bạn đã làm việc với REST API thì cũng đoán được, với cấu hình như trên, Web Server sẽ trả về response với status code là: **200**, với nội dung là: **Hello World!**.

Và thêm một dòng vào file **/etc/hosts** với nội dung như sau: `127.0.0.1	nginx-tutorial.test`

![](https://images.viblo.asia/22a397b5-fb4e-47d1-80a6-4952ce12395d.png)

Để kiểm tra xem file cấu hình có bị lỗi không, mình sẽ sử dụng câu lệnh sau: `nginx -t`

![](https://images.viblo.asia/a4e0f711-a2e9-4d70-84f8-7cfdec6062d6.png)

Để Nginx có thể nhận được file cấu hình, mình sẽ sử dụng câu lệnh sau: `nginx -s reload`

![](https://images.viblo.asia/91c6fd65-02fd-4ede-94b0-1ee539b510f3.png)

Và mình sử dụng câu lệnh sau, để gửi request tới web server: `curl -i nginx-tutorial.test`

**Lưu ý: Để cài đặt curl, mình sử dụng câu lệnh sau: apt-get install curl**

Và kết quả Web Server trả về là:

![](https://images.viblo.asia/2abde994-52c8-416d-9412-625d7ca12072.png)

**3. Hiểu về Directive và Context trong Nginx**

Ở phần  trước, mình đã hướng dẫn các bạn viết một file cấu hình đơn giản trong Nginx. Trong cấu hình Nginx có 2 thuật ngữ quan trọng là **directive** và **context**.

Mọi thứ trong file config Nginx, đều là **directive**. **Directive** gồm có 2 loại là:
- Simple Directive
- Block Directive

Simple Directive bao gồm **directive name** và **tham số**, ngăn cách nhau bởi dấu cách và kết thúc bằng dấu chấm phẩy. Ví dụ với file config trên, simple directive là:
- **listen 80;**: lắng nghe trên cổng 80.
- **server_name nginx-tutorial.test;** đặt tên web server là nginx-tutorial.test.
- **return 200 "Hello World!\n";**: trả về status code là 200 và với nội dung: Hello World!.

Block directive tương tự với simple directive ngoại trừ việc thay vì kết thúc bằng dấu chấm phẩy thì block directive kết với cặp ngoặc nhọn **{ }**. Block directive có thể chứa những directive khác ở trong nó, được gọi là **context**. Ví dụ như **events**, **http**,... Có 4 context chính trong Nginx:

- **events { }**: Dùng để thiết lập cấu hình toàn cục. Và trong mỗi 1 file config, sẽ chỉ có duy nhất một context **events**.
- **http{ }**: Dùng để cấu hình Nginx xử lý các request HTTP và HTTPS. Và cũng như **events**, mỗi 1 file config sẽ chỉ có một **http**.
- **server{}**: Nằm trong context **http**, được sử dụng để cấu hình cho từng virtual host. Có thể có nhiều context **server** trong context **http**.
- **main**: Context **main** chính là file cấu hình.

Để có thể tạo nhiều virtual host trên Nginx mình sẽ sử dụng kết hợp simple directive là **listen** và block directive **server { }**, mình sẽ chỉnh sửa file **nginx.conf** với nội dung như sau:

```
events {

}

http {
    server {
        listen 80;
        server_name nginx-tutorial.test;

        return 200 "Hello, this response from port 80!\n";
    }


    server {
        listen 8080;
        server_name nginx-tutorial.test;

        return 200 "Hello, this response from port 8080!\n";
    }
}
```
Hãy nhớ rằng, mỗi khi thay đổi file cấu hình, hãy kiểm tra xem file cấu hình đã hợp lệ hay chưa bằng câu lệnh: **nginx -t** và reload lại Nginx với câu lệnh: **nginx -s reload**

Bây giờ nếu, mình gửi request tới **nginx-tutorial.test:80**, mình sẽ nhận được response là:

![](https://images.viblo.asia/748e51e6-4aa6-4fbc-9857-b47433e34c90.png)

Và mình gửi request tới **nginx-tutorial.test:8080**, mình sẽ nhận được response là:

![](https://images.viblo.asia/2a6c5d4c-b086-4e1e-ac03-ffc15163f0d4.png)

**4. Cấu hình Nginx để load những trang web tĩnh**

Mình sẽ lưu trang web tĩnh ở trong thư mục **/var/www/html**, và clone source code vào trong thư muc này:

```
git clone https://github.com/fhsinchy/nginx-handbook-projects.git
```

Sau khi tải clone source code về xong, mình sẽ sửa file nginx.conf với nội dung như sau:

```
events {

}

http {
    server {
        listen 80;
        server_name nginx-tutorial.test;

        root /var/www/html/nginx-handbook-projects/static-demo;
    }
}
```

Khi cấu hình như vậy, khi có một request gửi tới, Nginx sẽ tìm kiếm file **index.html** ở trong thư mục **/var/www/html/nginx-handbook-projects/static-demo**, và trả về cho client. Dùng trình duyệt và truy cập vào **localhost:8080**, kết quả như sau:

![](https://images.viblo.asia/254de78b-29e6-4225-9182-877c8059d645.png)

Và nhận thấy rằng, file CSS đang không hoạt động, để Nginx có thể đọc được file CSS, chúng ta sẽ cấu hình như sau:

```
events {

}

http {

    types {
        text/html html;
        text/css css;
    }
    
    server {
        listen 80;
        server_name nginx-tutorial.test;

        root /var/www/html/nginx-handbook-projects/static-demo;
    }
}
```

Và kết quả là:

![](https://images.viblo.asia/62ba13c1-c16a-449c-9fe8-feac77b37c62.png)

Vậy là file CSS đã hoạt động. 

Nhưng với một trang web sẽ có rất nhiều file định dạng khác như như là html, css, jpg, jpeg,.. Ở trong thư mục **/etc/nginx** có một file là **mime.types**, sẽ bao gồm các định dạng file khác nhau và thay vì sử dụng block directive **types**, mình sẽ sử dụng simple directive **include** ở trong file **nginx.conf**, như sau:


```
events {

}

http {

    include /etc/nginx/mime.types;
    
    server {
        listen 80;
        server_name nginx-tutorial.test;

        root /var/www/html/nginx-handbook-projects/static-demo;
    }
}
```

Và kết quả là:

![](https://images.viblo.asia/2f47d995-28ed-4624-98fa-f94a205b6019.png)

**5. Lời kết**

Trong bài này mình đã hướng dẫn các bạn cách cấu hình Nginx một cách đơn giản:
- Giới thiệu về 2 thuật ngữ file cấu hình Nginx là: directive và context.
- Cấu hình virtual host.
- Cách cấu hình Nginx đọc những định dạng file khác nhau.

Trong bài tiếp theo mình sẽ hướng dẫn cách cấu hình [Dynamic Routing trong NGINX](https://viblo.asia/p/dynamic-routing-trong-nginx-Do754dMW5M6).
Những bài viết khác có thể sẽ hữu ích cho các bạn:
- [Reverse Proxy với NGINX](https://viblo.asia/p/cach-cau-hinh-nginx-thanh-reverse-proxy-aWj53jkQl6m)
- [Load Balancing với NGINX](https://viblo.asia/p/load-balancing-voi-nginx-bWrZnVxnZxw)