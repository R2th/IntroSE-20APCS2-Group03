# Giới thiệu
Khi làm 1 web các bạn có thể thấy sẽ tốn một cơ số thời gian để làm phần admin, vậy có cách nào giúp chúng ta tiết kiệm thời gian cho việc này không? Câu trả lời là có, nếu các bạn biết kết hợp giữa JSON API của wordpress, nôm na các bạn dễ hiểu là, wordpress đóng vai trò làm trang admin để các bạn quản lý content, và cũng chính wordpress sẽ trả ra cho các bạn các API JSON để các bạn dùng với các nền tảng khác nhau

# WordPress JSON API
Json API là 1 plugin đã được tích hợp sẵn trong các phiên bản wordpress gần đây. Nó cung cấp cho chúng ta các API lấy dữ liệu ví dụ như: lấy data bài post, lấy data categories ... Và nó cho phép chúng ta cho thể hook custome tuỳ ý

Ví dụ lấy chi tiết 1 bài post có id **2023** như sau:

https://khongbietcode.com/wp-json/wp/v2/posts/2023

Ta sẽ được kết quả
![](https://images.viblo.asia/e6c8dc83-9462-4100-8e08-fab515b71fce.png)



Hay như ta muốn lấy danh sách các categories

https://khongbietcode.com/wp-json/wp/v2/categories

Ta được kết quả
![](https://images.viblo.asia/b8e9e42e-298b-4321-8082-9e7044594a33.png)

Như vậy chỉ với 2 API trên chúng ta hoàn toàn có thể đưa sang 1 nền tảng khác để thực hiện viết 1 blog cơ bản, có categories và posts

# Thao tác với post
Json API cung cấp cho ta các phương thức để có thể dễ dàng CRUD post khi bạn cấp quyền

```php
#Definition
GET /wp/v2/posts
#Example Request
$ curl https://khongbietcode.com/wp-json/wp/v2/posts 

#Create post
POST /wp/v2/posts

#Update post
 POST /wp/v2/posts/<id>
#Example Request
$ curl -X POST https://khongbietcode.com/wp-json/wp/v2/posts/<id> -d '{"title":"My New Title"}'

#Delete post
 DELETE /wp/v2/posts/<id>
#Example Request

$ curl -X DELETE https://khongbietcode.com/wp-json/wp/v2/posts/<id> 
```

# Thao tác với categories
Json API cũng cung cấp cho ta các phương thức để có thể dễ dàng CRUD categories khi bạn cấp quyền

```php
#Definition
GET /wp/v2/categories
#Example Request
$ curl https://khongbietcode.com/wp-json/wp/v2/categories 

#Create category
POST /wp/v2/categories

#Update category
 POST /wp/v2/categories/<id>
#Example Request
$ curl -X POST https://khongbietcode.com/wp-json/wp/v2/categories/<id>

#Delete category
 DELETE /wp/v2/posts/<id>
#Example Request

$ curl -X DELETE https://khongbietcode.com/wp-json/wp/v2/categories/<id> 
```

# Kết luận
Với các API được cung cấp từ JSON API của wordpress, bạn đã thấy đơn giản hoá vấn đề chưa, các bạn có thể xử dụng ngay lập tức các api và xây dựng trang admin bằng wordpress chỉ trong vòng có 30 phút, thời gian còn lại có thể ngồi viết frontend bằng laravel, hay reactjs ... Bài sau mình xây dựng demo 1 blog nho nhỏ sử dụng admin là wordpress và frontend dùng Laravel nhé :D