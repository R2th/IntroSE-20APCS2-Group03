Bạn có thể áp dụng filter cho toàn bộ phần tử HTML khá dễ dàng với thuộc tính filter. Nhưng điều gì sẽ xảy ra nếu bạn muốn áp dụng bộ lọc chỉ cho background image của một phần tử?
Có các thuộc tính CSS dành riêng cho background image, như chế độ hòa trộn nền (thuộc tính background-blend-mode) - nhưng việc pha trộn màu (blend) và các bộ lọc màu (filter) là không giống nhau. 

Dưới dây mình sẽ hướng dẫn các bạn làm điều đó với việc sử dụng **pseudo-element**.

### CSS
```
.element {
  position: relative;
}
.element::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url(image-to-be-filtered.jpg);
  filter: grayscale(100%);
}
.element-inside {
  /* Sử dụng position relative sẽ làm cho nó xếp chồng lên trên thẻ ::before */
  position: relative;
}
```

### HTML
```
<div class="element">
  <div class="element-inside">
    element
  </div>
</div>
```

### Demo
Dưới đây là một tool khá hay để các bạn có thể thử nghiệm của tác giả **Dan Wilson**

{@codepen: https://codepen.io/danwilson/pen/dqZvmx/}