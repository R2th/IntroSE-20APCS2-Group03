## Giới thiệu
Mình tin là nhiều bạn chán ngấy UI checkbox mặc định, nó bé và thô, nên nay mình sẽ hướng dẫn tạo animated checkbox = svg + css đơn giản mà nhìn nuột nà

{@embed: https://codepen.io/dfly24s/pen/wvWLyLd}

## Code
Lý thuyết của cái này cũng giống bất kì cách custom style checkbox nào mà bạn search được trên mạng, đó là mình sẽ ẩn cái checkbox mặc định đi và đè lên 1 cái mask và style cho cái mask này, vấn đề còn lại chỉ là làm sao ghép hiệu ứng cho cái icon check nữa thôi.
Mình sẽ dùng svg vì svg có thể áp dụng animation, 1 thuộc tính css có sẵn nên việc thiết kế sẽ đơn giản. Tất cả những gì bạn cần biết trong ví dụ này chỉ là thuộc tính stroke của svg

```
svg {
  ...

  #path {
    ...
    stroke-width: 10px;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    opacity: 0;
  }
}
```

```
@keyframes tick {
  from {
    stroke-dashoffset: 1000;
  }
 
  to {
    stroke-dashoffset: 0;
  }
}
```

khi input:checked thì svg sẽ được áp dụng animation tick như trên, cái từ 'offset' dịch ra chắc mn cũng hình dung được rồi, nghĩ đơn giản là cái hình dấu tick nó bị 'offset' đi từ trái qua phải, khi input checked thì remove dần dần offset về 0 để dấu tick hiện lên.

## Kết luận
Tất cả chỉ có thế, rất đơn giản mà nhìn cũng ra gì phết phải không nào, hãy thử nâng cấp cho hoành tráng hơn nhé!