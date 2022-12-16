Tiếp nối bài viết trước, [Cấu hình Nginx Server như thế nào?](https://viblo.asia/p/cau-hinh-nginx-server-nhu-the-nao-ByEZko0xZQ0). Trong bài viết này, mình sẽ giới thiệu về Dynamic Routing trong NGINX.

**1. Prefix match**

Mình sẽ cấu hình file **nginx.conf** như sau:

```
events {

}

http {

    include /etc/nginx/mime.types; 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location /user {
            return 200 "Hello User!\n";
        }        
    }
}
```

Và hãy nhớ rằng, mỗi khi cấu hình xong hãy sử dụng câu lệnh:
```
nginx -t # Kiểm tra xem file cấu hình có bị lỗi không?
nginx -s reload # Khởi động lại Nginx 
```

Block directive **location** luôn nằm trong block directive **server**, có thể có nhiều **location** ở trong **server**. 

Bây giờ mình gửi request tới `nginx-tutorial.test/uesr`, kết quả nhận được là:

![](https://images.viblo.asia/0133b237-5127-47ca-98cd-71ac5dfc27a7.png)

Bây giờ, mình gửi một request khác tới `nginx-tutorial.test/user1`, kết quả nhận được là:

![](https://images.viblo.asia/7a5faaa2-19a0-424b-95c9-e4b8d52cb728.png)

Kết quả giống như nhau. Bởi vì khi mình sử dụng **location /user**, NGINX sẽ match tất cả URI bắt đầu bằng /user và trả về cùng 1 response là: **Hello User!**. Đây được gọi là **prefix match**.

**2. Exact match**

Mình sẽ cấu hình file **nginx.conf** như sau:

```
events {

}

http {

    include /etc/nginx/mime.types; 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location = /user {
            return 200 "Hello User!\n";
        }        
    }
}
```

Và gửi request tới `nginx-tutorial.test/uesr`, kết quả là:

![](https://images.viblo.asia/a2c34559-7486-4b59-9fa2-6979b7fe67f5.png)

Và nếu mình gửi request tới `nginx-tutorial.test/uesr1`, kết quả là:

![](https://images.viblo.asia/0c345869-0d6b-492c-b589-d70589ed5e3e.png)

Như vậy là 2 kết quả khác hẳn nhau, không giống như ở **prefix match**. Khi mình sử dụng **location = /user**, thì có nghĩa NGINX sẽ chỉ match với URI là **/user** và trả về status code **200**, nội dung là **Hello User!.** Nếu gửi những request khác, thì sẽ trả về status code là **404**. Đây được gọi là **exact match**.

**3. Regex match**

Ngoài 2 kiểu là **prefix match**, và **exact match**, thì có một kiểu nữa là **regex match**. NGINX sẽ match với những URI thỏa mãn biểu thức chính quy mà chúng ta quy định. Ví dụ, mình sửa đổii file **nginx.conf** như sau:

```
events {

}

http {

    include /etc/nginx/mime.types; 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location ~ /user[0-9] {
            return 200 "Hello User!\n";
        }        
    }
}

```
Khi mình sử dụng **location ~ /user[0-9]**, NGINX sẽ match với những URI thoả mãn biểu thức chính quy **user[0-9]** và trả về status code là **200** với nội dung là: **Hello User!**. Ví dụ:

![](https://images.viblo.asia/cd005a3a-4f08-4d03-8b84-67372b0f62fa.png)

Nếu những URI, không thỏa mãn biểu thức chính quy, thì NGINX sẽ trả về kết quả như sau:

![](https://images.viblo.asia/7c322974-840f-4ccf-b660-e19a727356aa.png)

Có một chú ý nữa là, NGINX sẽ ưu tiên **regex match** trước, rồi mới đến **prefix match**. Có nghĩa là, nếu URI thỏa mãn **regex match** và **prefix match** thì sẽ trả về response của **regex match**. Cụ thể, mình sửa file **nginx.conf** như sau:

```
events {

}

http {

    include /etc/nginx/mime.types; 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location  /user1 {
                return 200 "This is prefix match.\n";
        }

        location ~ /user[0-9] {
            return 200 "This is regex match.\n";
        }        
    }
}

```

Và khi mình gửi request tới `nginx-tutorial.test/user1`, kết quả trả về là:

![](https://images.viblo.asia/ae08af0c-7373-4c65-bdac-d579ed8b28cc.png)

Response trả về là của **regex match**.

NGINX cho phép chúng ta thay đổi thứ tự ưu tiên này, bằng cách sử dụng **^~** trong **prefix match**, cụ thể như sau:

```
events {

}

http {

    include /etc/nginx/mime.types; 

    server {
        listen 80;
        server_name nginx-tutorial.test;

        location ^~ /user1 {
                return 200 "This is prefix match.\n";
        }

        location ~ /user[0-9] {
            return 200 "This is regex match.\n";
        }        
    }
}
```
 Và một lần nữa, mình gửi request tới `nginx-tutorial.test/user1`, kết quả trả về là response của **prefix match** :
 
 ![](https://images.viblo.asia/e3bdc361-bda3-4ab7-b6ba-7f795b5c6527.png)

**4. Biến trong NGINX**

Biến trong NGINX cũng giống như trong các ngôn ngữ lập trình khác. Chúng ta có thể dùng directive **set** để khai báo biến và gán giá trị cho nó, với cú pháp như sau:
```
set $<variable_name> <variable_value>
```
Và NGINX cũng cung cấp sẵn một số biến, các bạn có thể tham khảo thêm tại đấy: [Alphabetical index of variables
](https://nginx.org/en/docs/varindex.html).

Biến trong NGINX có 3 kiểu là:
- String
- Integer
- Boolean

Mình cấu hình file **nginx.conf** như sau:

![](https://images.viblo.asia/1bac95aa-0c76-4b72-a932-29e5ec0a4978.png)

Và gửi một request tới: `nginx-tutorial.test/user?name=DucLS`, kết quả trả về là:

![](https://images.viblo.asia/43ed9b77-93d6-4e46-8762-37eaf78fc52c.png)

Các biến **$host**, **$uri**, **$args** là những biến có sẵn NGINX cung cấp.
- $host: Lưu trữ hostname của server.
- $uri: Lưu trữ URI.
- $args: Lưu trữ query prams.

**5. Redirect và Rewrite**

Mình sửa file **nginx.conf** như sau:

```
events {

}


http {
    include /etc/nginx/mime.types;

    server {
	listen 80;

	server_name nginx-tutorial.test;

	root /var/www/html/nginx-handbook-projects/static-demo;

	location = /index_page {
	   return 307 /index.html;
	}
	
	location = /about_page {
	   return 307 /about.html;
	}
    }
}
```

Và khi mình gửi request tới `nginx-tutorial.test/index_page`, NGINX sẽ redirect mình tới `nginx-tutorial.test/index.html`. Cụ thể như sau:

![](https://images.viblo.asia/bdae7d4d-b79c-4de6-88e5-c58d76d0a1c6.png)

NGINX trả về với status code là **307**, và điều hướng tới `nginx-tutorial.test/index.html`. Khi sử dụng **redirect**, NGINX sẽ thay đổi URL trên browser. Ngoài **redirect**, còn có một cách khác là sử dụng **rewrite**.

Với **rewrite**, mình sẽ sửa file **nginx.conf** như sau:

```
events {

}


http {
    include /etc/nginx/mime.types;

    server {
	listen 80;

	server_name nginx-tutorial.test;

	root /var/www/html/nginx-handbook-projects/static-demo;

	rewrite /index_page /index.html;

	rewrite /about_page /about.html;
    }
}
```

Khi mình gửi request tới `nginx-tutorial/test/index_page`, kết quả sẽ như sau:

![](https://images.viblo.asia/45eb99c7-931d-4a86-ad60-55f27e7e49c3.png)

Như các bạn có thể thấy, NGINX trả về với status code là **200**, với nội dung của page **index.html** nhưng URL lại không bị thay đổi.

Đó là sự khác nhau giữa sử dụng **redirect** và **rewrite**. Khi sử dụng **redirect**, NGINX sẽ thay đổi URL trên browser, còn đối với **rewrite**, NGINX sẽ ngầm điều hướng tới page mà mình config, và giữ nguyên URL.


**6. Kết thúc**

Trong bài viết này mình đã giới thiệu về Dynamic Routing trong NGINX, và 3 dạng của nó là:
- prefix match.
- exact match.
- regex match.

Biến trong NGINX, cách khai báo biến, và một số biến NGINX cung cấp sẵn.

Sự khác nhau giữa **redirect** và **rewrite**, và cách sử dụng.

Trong bài tiếp theo, mình sẽ hướng dẫn các bạn [Cách cấu hình NGINX thành Reverse Proxy](https://sal.vn/Df6aYx).