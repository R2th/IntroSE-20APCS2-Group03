Các list danh sách trong html như ol, ul như chúng ta hay dùng thì có khả năng đánh số tự động. Tuy nhiên với các thuộc tính liên quan đến counter thì ta có thể làm được, không nhất thiết phải là một list mà là nhiều phần tử khác cũng có thể dùng được nữa. Ví du:

```html
<body>
  <section></section>
  <section></section>
  <section></section>
  <section></section>
</body>
```

**counter**
```css
body {
  counter-reset: my-awesome-counter;
}
section {
  counter-increment: my-awesome-counter;
}
section:before {
  content: counter(my-awesome-counter);
}
```

Mỗi <section> tương ứng sẽ bắt đầu bằng "1", "2", "3", "4".

Chúng ta có thể control được style của số đếm này bằng dấu "." hoặc "," tùy vào nhu cầu, thậm chí là truyển bộ đếm thành hệ số la mã cũng được.: 

**Roman Counter**
```css
section:before {
  content: counter(my-awesome-counter, upper-roman);
}
```

{@codepen: https://codepen.io/buiduccuong30051989/full/yEjMmP/}

Nói chung, mỗi phần tử của một list sẽ có thể có nhiều bộ đếm,  chức năng counter() (số ít) có thể được sử dụng để đưa ra một bộ đếm, thì các hàm counters () (số nhiều) dùng để đếm các bộ đếm lồng nhau. Nó giống như là danh mục của một cuốn sách ấy, sẽ có 1 , 1.1, 1.1.1
Ví dụ: 

```css
ul {
    list-style: none;
    counter-reset: nestedCounter;
  }  
  ul li {
    counter-increment: nestedCounter;
    line-height: 1.4;
  }  
  ul li:before {
    content: counters(nestedCounter, ".") " - ";
    font-weight: bold;
  }
```

{@codepen: https://codepen.io/buiduccuong30051989/full/vrjmyO/}