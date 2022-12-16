### Câu trả lời là có
Bạn có thể lồng nhiều `@media` hay `@support` mà không cần dùng đến CSS preprocessor. Cứ viết như `CSS` bình thường là được. 


Ví dụ như này :


```CSS
@supports(--a: b) {
  @media (min-width: 1px) {
    body {
      background: red;
    }
  }
}
```



Hoặc như này :



```CSS
@media (min-width: 1px) {
  @supports(--a: b) {
    body {
      background: green;
    }
  }
}
```


Bạn viết theo kiểu nào cũng được, và còn có thể lồng sâu hơn nữa :


```CSS
media (min-width: 2px) {
  @media (min-width: 1px) {
    @supports (--a: b) {
      @supports (display: flex) {
        body {
          background: pink;
        }
      }
    }
  }
}
```


Nếu lồng quá nhiều logic như này sẽ khiến việc phát triển và sửa khó khăn hơn rất nhiều nên các bạn hay cẩn thận khi dùng nhé !
Cảm ơn vì đã đọc.