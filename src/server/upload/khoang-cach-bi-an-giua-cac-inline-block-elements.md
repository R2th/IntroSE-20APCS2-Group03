Inline-block là một thuộc tính rất hữu ích đối với các anh em kỹ sư phần mềm, nhưng có một vấn đề về thuộc tính này mà không phải ai cũng biết, ngay cả với những người đã làm lâu năm. Đó chính là khoảng cách "bí ẩn" giữa các "Inline-Block" elements đứng cạnh nhau.

HTML:
```html
<nav>
    <a href="#">inline-block ele no1</a>
    <a href="#">inline-block ele no2</a>
    <a href="#">inline-block ele no3</a>
</nav>
```

CSS:
```css
nav a {
    display: inline-block;
    padding: 6px;
    background: #1E1F26;
    color: white;
}
```

Kết quả:
![](https://images.viblo.asia/e5cb54f9-c013-4d52-8436-617fee42801b.png)

Như hình trên, ta có thể thấy các khoảng nhỏ nhất rõ ràng nằm giữa các thẻ a mang thuộc tính inline-block và có lẽ không một kỹ sư front-end nào lại muốn điều này xảy ra cả. Thực ra các khoảng trống này không phải là bug, cơ bản là các khoảng trống này hoạt động tương tự như khoảng trống giữa các chữ khi bạn gõ văn bản vậy, nếu ta loại bỏ khoảng trống giữa các thẻ a thì ta sẽ không thấy các khoảng trống trên nữa, nhưng rõ ràng như vậy thì source code của chúng ta sẽ trở nên khá là khó nhìn.

```html
<nav>
    <a href="#">inline-block ele no1</a><a href="#">inline-block ele no2</a><a href="#">inline-block ele no3</a>
</nav>
```

Kết quả:
![](https://images.viblo.asia/4012f4a5-a56b-4568-9beb-43e4dfc6ea7a.png)

Ok, dưới đây sẽ là một số cách để loại bỏ các khoảng trống "ma" này khỏi trang web của chúng ta.

### 1. loại bỏ khoảng trống:
Như mình vừa đề cập ở trên, ta có thể loại bỏ khoảng cách giữa các thẻ a bằng cách viết các thẻ a liền nhau.

Hoặc, ta cũng có thể loại bỏ các khoảng trống giữa các thẻ a bằng cách "comment" các khoảng trống đó đi.

HTML:
```html
<nav>
    <a href="#">inline-block ele no1</a><!-- 
     --><a href="#">inline-block ele no2</a><!-- 
     --><a href="#">inline-block ele no3</a>
</nav>
```

### 2. Sử dụng margin:
Ta có thể áp dụng giá trị âm cho margin left hoặc right để "dấu" các khoảng trống không mong muốn đi.

CSS:
```css
nav a {
    display: inline-block;
    margin-right: -4px;
}
```

### 3. Bỏ qua các thẻ đóng:
Bỏ qua các thẻ các thẻ đóng cũng sẽ giải quyết vấn đề này, nhưng có lẻ sẽ chẳng ai dùng nó đâu :D.

HTML:
```html
<nav>
    <a href="#">inline-block ele no1
    <a href="#">inline-block ele no2
    <a href="#">inline-block ele no3
</nav>
```

### 4. Sử dụng font-size:
Cách này khá là hay và tiện. Ta sẽ gán font-size bằng 0 cho element cha của các inline-block elements.

HTML:
```css
nav {
    font-size: 0;
}

nav a {
    display: inline-block;
    font-size: 15px;
}
```

### 5. Cách cách xử lý khác:
Thay vì sử dụng inline-block để dóng các element theo hàng ngang thì ta hoàn toàn có thể sử dụng các cách tiếp cận đơn giản, hiệu quả và hiện đại hơn như sử dụng **FlexBox** hoặc đơn giản nhất là **Float**.

Vậy là chúng ta vừa tìm hiểu về một điều khá thú vị và kỳ quặc của thuộc tính inline-block trong css. Qua đây, mình hy vọng bài viết có thể giúp mọi người hiểu và biết được thêm các cách xử lý khi gặp phải tình huống trên.