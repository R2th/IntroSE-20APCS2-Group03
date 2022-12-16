Với nền tảng web hiện đại bây giờ có một yếu tố rất rất quan trọng ảnh huởng trực tiếp đến sự thành công của trang web đấy chính là giao diện. Trong quá trình phát triển chúng ta đã quá quen với những bộ phát triển giao diện như là Bootstrap, Foundation, Bulma. Đây hầu như là những bộ giao diện gần như là hoàn chỉnh nhất rồi. 
Vậy Tailwind sinh ra để làm gì???

![](https://images.viblo.asia/2961a11f-bc5a-4334-a5a4-f1a446ba77cc.jpeg)
# Tailwind CSS là gì?
### Tailwind CSS is a utility-first CSS framework
Theo như định nghĩa trên trang chủ Tailwind thì nó là một utility-first CSS framework. Nghe có vẻ khó hiểu nhỉ :D :D :D
Trong quá trình sử dụng thì mình đúc rút ngắn gọn lại như sau:
> **Tailwind CSS là một Framework mà các thuộc tính css đã được viết sẵn và gán thành 1 class riêng, khi dùng chỉ cần gọi class mà không cần viết css riêng nữa**

Example:
```
<div class="md:flex">
  <div class="md:flex-shrink-0">
    <img class="rounded-lg md:w-56" src="https://sun-asterisk.com">
  </div>
  <div class="mt-4 md:mt-0 md:ml-6">
    <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">Marketing</div>
    <a href="#" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Finding customers for your new business</a>
    <p class="mt-2 text-gray-600">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
  </div>
</div>
```

Theo như ví dụ trên thì chúng ta ko hề phải viết một dòng css nào mà vẫn có được giao diện mong muốn. 

![](https://images.viblo.asia/4ed57e5a-5bd3-448d-bb0f-d30a2be2c4dd.png)

Cách cài đặt thì mn có thể tham khảo tại đây: https://viblo.asia/p/tailwind-css-07LKXNYplV4

# Ưu điểm của Tailwind CSS
Ưu điểm nhìn thấy rõ nhất của Tailwind CSS đấy là
- Người sử dụng có thể chẳng phải viết đến 1 dòng css nào mà vẫn có giao diện tùy biến theo mong muốn. 
- Style, màu sắc, font chữ hiện đại, phù hợp với phong cách web hiện đại
- Cách đặt tên class dễ hiểu, 1 class đại diện cho 1 thuộc tính. Tailwind CSS có gần như đủ gần 85% thuộc tính css.
- Sử dụng Flex nên rất dễ chia Layout
- Dễ cài đặt, dễ sử dụng, document của Tailwind rất dễ hiểu.
Tailwind CSS phù hợp cho các dự án nhỏ, người dùng tuỳ biến nhiều, cần làm nhanh giao diện. Trong khi nếu bạn Bootstrap mà không tuỳ biến gì thì trong web của bạn sẽ đúng đậm chất Bootstrap. còn với Tailwind thì khi mỗi người dùng sẽ ra mỗi giao diện khác nhau mà không hề đụng hàng.

# Nhược điểm của Tailwind CSS
- Khi sử dụng tailwind thì bạn bạn đang phải sử dụng số class cực kì nhiều, số class sẽ tương ứng với với số thuộc tính mà bạn muốn cài đặt
- Khi dùng font-size hoặc màu sắc vẫn đang còn phải custom lại bằng css riêng. 
- Chưa có những bộ mixin khi muốn set nhiều thuộc tính cần thiết.

# Kết luận
Sau khi đọc bài viết này mong rằng mn sẽ ko so sánh Tailwind CSS và Bootstrap nữa. Tailwind CSS không có những components xây dựng sẵn như Bootstrap. Tailwind CSS vẫn chỉ là CSS Framework thôi, chỉ dành những bạn nào muốn xây dựng nhanh giao diện thôi.