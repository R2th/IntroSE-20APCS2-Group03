Chắc hẳn các bạn đã quen với  trạng thái `:focus` rồi phải không, thế còn `:focus-within` bạn hiểu thế nào về trạng thái này?
## focus-within là gì?
`:focus-within` là một pseudo selector đại diện cho thành phần nhận focus hoặc chứa một thành phần nhận focus. Nói cách khác, nó sẽ trỏ đến một thành phần mà chính thành phần ấy chứa mọi thằng con mà có `:focus`.

## Cách hoạt động của focus-within

Hãy xem qua ví dụ dưới đây:

HTML
```
<form action="#">
  <div class="item">
    <label>Full name:</label>
    <input type="text"/>
  </div>
  <div class="item">
    <label>Age:</label>
    <input type="text"/>
  </div>
  <div class="item">
    <label>Address:</label>
    <input type="text"/>
  </div>
</form>
```

CSS
```
form:focus-within {
  background: yellow;
}
```

{@codepen: https://codepen.io/thang21/pen/ZwzeLm}

Khi click vào các `input` bên trong `form`, thì background của form sẽ đổi sang màu vàng. Vì `input` là các thuộc tính con của `form` và đều có thuộc tính focus. 

Hãy xét tới một ví dụ khác, giả sử bạn muốn có một thẻ `input` nằm bên trong thẻ `div`
HTML
```
<div class="inputholder">
  <input class="inputholder__input" type="text"/>
</div>
```

CSS
```
.inputholder {
  ....
  
  &:focus-within {
    border: 1px solid blue;
  }
}
```

Khi chúng ta click vào phần `input` thì style của thẻ div bên ngoài cụ thể là div `inputholder` sẽ thay đổi style, cách này khiến cho chúng ta có thể style cho những input nào có style phức tạp, thì chúng ta có thể thay thế bằng 1 thẻ div thay vì style trên thẻ input

{@codepen: https://codepen.io/thang21/pen/rPBygB}

## Browser Support
![](https://images.viblo.asia/ed49dd3b-fb99-4d19-a32b-0f8cf6d4fc66.png)
Theo dữ liệu từ [Caniuse](https://caniuse.com/#feat=css-focus-within)  thì thuộc tính này được support ở hầu hết mọi trình duyệt, tuy nhiên IE vẫn chưa hỗ trợ thuộc tính này. 

Vậy là hôm nay các bạn đã biết thêm một thuộc tính mới khá hữu ích phải không nào!
Chúc các bạn học tốt!