# **I. Đinh nghĩ về CSS Gird ?**
- CSS Grid Layout (được biết đến như "Grid") đang trong quá trình phát triển, và cũng như bạn sẽ thấy trình duyệt hỗ trợ cho nó khá ít ỏi ở thời điểm hiện tại. Hiện tại để bắt đầu sử dụng nó, bạn sẽ hoặc là cần phải sử dụng IE11 (dù cái này sử dụng một phiên bản cũ hơn của bản đặc tả kỹ thuật), Microsoft Edge, Chrome Canary hoặc Firefox Nightly.

# **II. Đinh nghĩa Grid Container là gì?**
 - Mỗi bố cục các trang web hoặc ứng dụng bạn tạo ra (hoặc thấy) về bản chất là những chiếc hộp được đặt trong những đường ranh giới xác định.
 - Hiểu đơn giản, grid chỉ là "những đường kẻ". Những đường kẻ ngang và dọc xác định vị trí của các phần tử được thiết kế khác nhau. Bạn sẽ quen với grid nếu bạn đã sử dụng các phần mềm thiết kế như photoshop hoặc sketch. Trong bối cảnh của CSS Grid layout, một Grid container là phần tử cha chứa tất cả các phần tử nằm trong grid. Grid container xác định vị trí ban đầu của các đường kẻ trong grid, cả dọc và ngang.
 
#  **III. Đinh nghĩa Grid Line là gì?**
![](https://images.viblo.asia/064f5916-5f86-405d-a3cc-982a940d11e1.png)
 
 Bố cục bao gồm một grid container với các phần tử ở bên trong

![](https://images.viblo.asia/41f30d87-71a3-4f3d-ab84-0cd220deabf2.png)

# **IV. Làm thế nào để đinh nghĩ một Grid ?**
-  Giống như Flexbox, mọi thứ bắt đầu với display: grid hoặc display: inline-grid cho phiên bản inline. Ví dụ, để biến một div thành một grid container:
```
div {
    display: grid;
}
```

Làm thế nào để tạo các cột và dòng?
Để tạo các cột và các dòng trong một grid container, chúng ta sẽ sử dụng 2 thuộc tính mới: grid-template-columns và grid-template-rows.
Vậy sử dụng chúng như thế nào? Khá đơn giản.
grid-template-columns định nghĩa vị trí của các cột. grid-template-rows định nghĩa vị trí của các dòng.
Bạn truyền giá trị vào các thuộc tính này, và chúng tạo ra các dòng và các cột.
Xem ví dụ:

```
grid-template-columns: 100px 200px 300px
```

Đoạn code này sẽ tạo thành 3 cột mới trong grid container. Cột đầu tiên có độ rộng 100px, cột tiếp theo 200px và cột cuối 300px.

![](https://images.viblo.asia/fd9374a8-1d3c-4eb7-8ef4-e6675a0b1b04.png)

```
grid-template-rows: 100px 200px 300px
```
Đoạn code này sẽ tạo 3 dòng mới trong grid container như hình dưới đây:

![](https://images.viblo.asia/53f7344d-0d70-4019-8667-74ada992b4b4.png)

Bây giờ đặt chúng cùng nhau, bạn sẽ có một grid hoàn chỉnh với các dòng và cột đã được định nghĩa.
```
grid-template-columns: 100px 200px 300px
grid-template-rows: 100px 200px 300px
```

# **V. Lời kết :**
 - Đây không phải là bài giới thiệu hết kiến thức CSS Grid mà 1 bài chỉ giới thiệu làm sao đó để các bạn hiểu và tiếp cận CSS 1 cách hiệu quả , cơ bản và dễ hiểu nhất 
 - Trong bốn phần của bài viết này, tôi sẽ chỉ cho bạn 20% cần thiết để làm được 80% những gì bạn có thể làm với CSS Grid layout.
 - CSS Grid layout rất phức tạp. Theo ý kiến của tôi, nó phức tạp hơn Flexbox. 
 - Tài liệu tham khảo 
    + https://css-tricks.com/snippets/css/complete-guide-grid/
    + https://gridbyexample.com/examples/