Nếu sử dụng ***VueJS***, có lẽ không ít lần bạn cũng vào [VueJS Document](https://vuejs.org/) để đọc nhỉ. Một trang có giao diện tuy đơn giản nhưng được bố trí cực kì hợp lý và dễ nhìn. 

**[Evan You](https://github.com/yyx990803)**, con người đúng sau thành công của VueJS, đã xây dựng toàn bộ trang document đó bằng ***VuePress***.

# Vuepress là gì ?
Tóm gọn, **VuePress** là một trình tạo ra site tĩnh.
![](https://images.viblo.asia/42ee78fe-1264-4f4a-9d99-e1941a7c0c9a.png)

Như đã được nói ở trên, mục đích ban đầu của **Vuepress** là tạo ra những trang tối ưu cho việc hiển thị tài liệu, nhưng tuy vậy, ta không bị bó hẹp ở thiết kế mặc đình mà có thể thiết kế lại theo ý thích của mình.

Mỗi trang ***VuePress*** có một pre-rendered HTML tĩnh riếng, do đó, không chỉ loading cực kì nhanh, mà lại có thể SEO tốt nũa. 

Tuy mới xuất hiện nhưng đã nhận được nhũng phản hồi tích cực từ cộng đồng developer cũng người dùng.

# Tại sao lại sử dụng VuePress

## 1. VuePress sử dụng Vue components và Markdown

VuePress chuyển đổi các cú pháp Markdown sang HTML giúp chúng ta có thể viết bài một cách dễ dàng ( Giống như gì Viblo đang làm :joy::joy::joy: ). Bạn có thể hoàn toàn copy bài viết của bản thân mình từ Viblo sang VuePress hoặc ngược lại. 
![](https://images.viblo.asia/f31240c5-d7b5-486c-9601-5a38dfc5d7b6.png)

Bên cạnh đó, bạn có thể sử dụng Vue Component ngay trong file Markdown. Nó giúp chúng ta có thể tạo nhưng tính năng mà chỉnh mình trang web chúng ta có.

## 2. VuePress hỗ trợ đa ngôn ngữ


Bạn có thể tạo các tùy chọn ngôn ngữ cho trang web của mình một cách rất dễ dàng.

## 3. Có theme mặc định long lanh

Như mình đã nói, trang chủ của VueJS đơn giản, có bố cục rất liền mạch, sạch sẽ. Và đây cũng là giao diện mặc định của VuePress khi ta khởi tạo. Tuy vậy VuePress cung cấp cho ta nhưng tùy chỉnh từ cơ bản như thay đổi màu đến việc thiết kế lại toàn bộ giao diện.
## Tại sao lại chọn VuePress thay vì NuxtJS

Nếu bạn đang làm VueJS, chắc hẳn bạn đã nghe đến tên [NuxtJs](https://nuxtjs.org/) . NuxtJS cũng là một "server-rendered universal JavaScript webapps". Ta có thể tạo những trang tĩnh như VuePress bằng gõ lệnh :
>nuxt generate

Nuxt sẽ điều hướng theo những route của chúng ta đến nhưng file dưới dạng HTML đã được server render sẵn.
Ta có thể nói rằng những gì VuePress làm được thì NuxtJs đều làm được, vậy tại sao lại sinh ra Nuxt?

Đó chính là do mục tiêu của hai thứ hướng đến khác nhau. NuxtJs sinh ra để tạo những Web App bù đặp những thiếu sót do VueJs như khả năng SEO kém,... Con VuePress sinh ra đơn giản chỉ là một công cụ viết Document nhỏ gọn, đơn giản.

# Bắt đầu với VuePress
## Cài đặt VuePress
VuePress là một ứng dụng của node, do đó chúng ta phải cài qua npm hoặc yarn. Ta mở terminal lên và gõ

> npm i -g vuepress

Để chạy vuepress ta có 2 câu lệnh :
*  vuepress dev : Dành cho môi trường phát triển, sẽ tự đọng reload lại ứng dụng khi ta thay đổi source code.
*  vuepress build: Dành khi ta muốn deploy trang web của mình lên server.

Để tạo ra 1 document, ta đơn giản chỉ cần tạo 1 file README.md  như này::
```:README.md
# Chào bạn tới VuePress
VuePress thật dễ phải không
```
Sau đó, ta bắt đầu khởi động development server bằng câu lệnh :
> vuepress dev

Và ta sẽ thu được kết quả như sau:

![](https://images.viblo.asia/31ef2861-887e-4d58-b1ed-4ddbdee6147a.png)

Trong phần tiếp theo, mình sẽ hướng dẫn các bạn tạo một trang blog cá nhân bằng VuePress

# Tài liệu tham khảo
[https://vuepress.vuejs.org/](https://vuepress.vuejs.org/)