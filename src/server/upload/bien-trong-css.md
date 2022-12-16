# Biến trong CSS là gì ? 
Chắc hẳn các bạn khi nghe về cách sử dụng biến trong CSS sẽ nghĩ ngay đến các CSS Preprocessors như SASS hay LESS. Hoặc nếu không thì cũng suy nghĩ sử dụng biến trong CSS làm sao mà được nhỉ ?

Sau một thời gian dùng biến với SASS mình có tìm tòi và nghiên cứu liệu trong CSS thuần có thể sử dụng biến không nhỉ mà không cần phải dùng SASS hay LESS.

Nếu được như thế thì tiện lắm, các bạn mới học chưa biết cách dùng SASS hay LESS thì có thể học cách sử dụng biến trong CSS để làm quen trước sau này vào làm với SASS hay LESS đỡ bỡ ngỡ khi sử dụng biến.

Vì thế hôm nay mình xin chia sẻ những kiến thức về biến trong CSS để các bạn có thể hiểu rõ nó như thế nào, cách dùng ra sao nhé.

Biến trong css gồm có 2 loai : **Global Scope**  và **Local Scope** 
 - Glocal Scope cho phép bạn truy cập mọi nơi 
và Local Scope chỉ nằm trong bộ chọn cụ thể của bạn 

![](https://images.viblo.asia/d4ea6e1f-6e73-4848-b996-b7365e5918f3.png)


```css

:root {
  /* 1. Defining in Global Scope */
  --color: red;
  /* 2. Available in all selector*/
  color: var(--color); /* red */
}

.local {
  /* 1. Defining in Local Scope */
  --color: blue;
  /* 2. Scoped to the .local class only */
  color: var(--color); /* blue */
}

```

# Mã Css trùng lặp 
```css

.subtitle {
  color: #999;
}
.subtext {
  color: #999;
}

```

Điều này gây khó chịu cho mình khi làm việc với css 

# Sử dụng SCSS để giải quyết vấn đề nói trên 
```css

$secondary-color: #999;
.subtitle {
  color: $secondary-color;
}
.subtext {
  color: $secondary-color;
}

```

Đó là tất cả sự tuyệt vời , nhưng sau đó bạn phải đối phó với việc cài SCSS cho dự án của bạn , nhưng đối với nhưng dự án yêu cầu dùng CSS và yêu cầu minhg sử dụng biến để code 1 cách chuyên nghiệp thì developer phải quyết ra làm sao 

# Sử dụng biến trong CSS 
```CSS

:root {
  --secondary-color: #999;
}
.subtitle {
  color: var(--secondary-color);
}
.subtext {
  color: var(--secondary-color);
}

```

# CSS Variable Syntax
### 1. Khai báo biến trong css

```css
--variable-name: some-value;
```

### 2.  Sử dụng biến trong CSS 
```css
css-property: var(--variable-name);
```


# Phạm vi biến trong CSS
### 1. Global Scope 

```css

:root {
  --primary-color: #000;
}
h1 {
  color: var(--primary-color);
}


```

### 2.Local Scope

```css
h2 {
  --h2-color: #999;
  color: var(--h2-color);
}
h3 {
  /* No Effect */
  color: var(--h2-color);
}

```

# Ví dụ 
### 1.Đặt nhiều giá trị trong biến 

```css

:root {
  --margin: 10px 20px;
}
div {
  margin: var(--margin);
}

```

### 2.Đặt một giá trị trong biến 

```css

:root {
  --value: 5;
}
div {
  padding: var(--value) px; /* 5px */
}

```

# Overriding CSS Variable Values
```css

root {
  --default-color: pink;
}
.content {
  /* Override the global css variable */
  --default-color: green;
}
p {
  color: var(--default-color);
}
<p>Default "Pink" color</p>
<div class="content">
  <p>Overridden "Green" color</p>
</div>

```

# Kết bài :
Thông qua bài này mình hi vọng sẽ giúp các bạn phần nào hiển về biến trong CSS  .Trên đây là bài viết ngắn mình muốn giới thiệu cho mọi người về biến trong CSS. Xin cảm ơn mọi người đã đọc bài viết.

# Tài liệu tham khảo 
https://medium.com/swlh/css-variables-618b156777ce