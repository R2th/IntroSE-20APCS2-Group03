# Cách sử dụng đơn giản với các biến trong CSS
Để sử dụng một biến CSS, trước tiên chúng ta cần khai báo một biến. Các biến CSS có thể nhận bất kỳ giá trị CSS nào.
Tôi có ví dụ như sau:
```
div { background-color: green; }
```
Đây là cách duy nhất để gán giá trị cho các thuộc tính trong CSS thuần túy bởi vì cho đến gần đây, CSS không có biến. Các biến CSS cho phép chúng tôi tạo các giá trị tùy chỉnh của riêng mình để mã của chúng tôi dễ hiểu và dễ chỉnh sửa hơn.
Cũng giống như mọi thứ khác trong CSS, bạn có thể phân chia các thuộc tính tùy chỉnh của mình cho các phần của tài liệu.
Tôi có ví dụ như sau
```
<html>
  <style>
    .blue-text {
      --color: blue;
    }
    .red-text {
      --color: red;
    }
    .my-text {
      color: var(--color);
    }
  </style>
  <body>
    <div class="blue-text">
      <div class="my-text">This will be blue</div>
    </div>
    <div class="red-text">
      <div class="my-text">This will be red</div>
    </div>
  </body>
</html>
```

Kết quả:

![image.png](https://images.viblo.asia/d56f3b23-5f69-41c9-9808-fffbeb66b826.png)

Và bạn thậm chí có thể thay đổi giá trị thuộc tính tùy chỉnh bằng JavaScript
```
<html>
  <style>
    .blue-text {
      --color: blue;
    }
    .red-text {
      --color: red;
    }
    .my-text {
      color: var(--color);
    }
  </style>
  <body>
    <div class="blue-text">
      <div class="my-text">
        This will be green
      </div>
      <div class="red-text">
        <div class="my-text">
          This will be red
        </div>
      </div>
    </div>
    <script>
      const blueTextDiv = document.querySelector('.blue-text')
      blueTextDiv.style.setProperty('--color', 'green')
    </script>
  </body>
</html>
```
Kết quả:

![image.png](https://images.viblo.asia/c84c95ae-e3ff-47b6-9e5f-d7f80d32c05b.png)

# Kết luận
Khi bạn đã nắm vững kiến thức cơ bản về CSS, việc kết hợp các biến CSS vào project của bạn sẽ giúp bạn tiết kiệm rất nhiều thời gian trong tương lai. Từ những chỉnh sửa nhỏ đến những thương hiệu hoàn chỉnh, sẽ rất hữu ích nếu bạn định dạng CSS của mình theo cách có thể đọc và sửa đổi một cách nhanh chóng và trơn tru.Tất nhiên, những khái niệm tôi đã giải thích chỉ là những điều cơ bản. Kiểm soát các biến của bạn bằng JavaScript, thử nghiệm với hàm calc () và xem bạn đưa ra những dự án hấp dẫn, có chuyển đổi cao nào.
Hy vọng rằng thông qua những ví dụ đơn giản này sẽ giúp bạn hiểu và quen dần với CSS. 

Tài liệu tham khảo
https://kentcdodds.com/blog/super-simple-start-to-css-variables