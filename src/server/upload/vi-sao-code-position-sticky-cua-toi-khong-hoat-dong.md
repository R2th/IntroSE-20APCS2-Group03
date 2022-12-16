## Position sticky là gì
Position sticky là một thuộc tính lai giữa position relative và fixed. Element sẽ hiển thị giống position relative cho đến khi vượt qua một điểm cụ thể, element đó sẽ "sticky" vào viewport tương tự như position fixed.

Phần giải thích của mình có thể hơi khó hiểu. Mọi người có thể thấy được sự hữu dụng của `position: sticky` qua ví dụ được lấy từ [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky_positioning)

{@embed: https://codepen.io/simevidas/pen/JbdJRZ}

## Cách sử dụng
Để áp dụng position sticky cho một element, mọi người chỉ cần thêm `position: sticky;` cùng với ít nhất 1 trong 4 thuộc tính vị trí `left`, `top`, `right`, `bottom`.

Ở ví dụ này, element có class `sticky` sẽ "dính" vào viewport khi khoảng cách đến `top` là 20px.
```
.sticky {
    position: sticky;
    top: 20px;
}
```

## Vì sao code `position: sticky;` của tôi không hoạt động?
Nếu mọi người gặp vấn đề không thấy element `sticky` của mình hoạt động đúng. Hãy thử tìm xem có element cha nào của element `sticky` có thuộc tính `overflow: scroll, auto hoặc hidden` hay không. Có thể là element cha ở bất kì cấp nào, không chỉ là element cha trực tiếp (thường là thẻ `<body>` sẽ có thuộc tính `overflow-x: hidden`). 

Ở ví dụ này, mọi người có thể thấy box `sticky` đúng như mong muốn cho đến khi click vào button "Bật tắt ..." bên dưới.

{@embed: https://codepen.io/lesontung1996/pen/RwZeaRK}