# CSS Box-sizing
Xin chào các bạn, hôm nay mình sẽ tìm hiểu về thuộc tính Box-sizing của css. Để hiểu rõ tính ứng dụng, cũng như tác dụng của nó khi thêm vào thì mình xin đưa ra một ví dụ như sau:

Mình sẽ tạo 1 thẻ `<div class="box">Đây là nội dung bài viết</div>`
Thêm luôn cho nó css:
```
.box{
    width: 100px;
    height: 100px;
    color: white;
    background-color: darkorchid;
}
```

![](https://images.viblo.asia/60bcc62c-de0a-47e0-8416-bc6618addea0.png)

Bây giờ mình muốn thêm padding vào cho content nó không có sát vào lề:
```
.box{
    width: 100px;
    height: 100px;
    color: white;
    background-color: darkorchid;
    padding: 16px;
}
```

![](https://images.viblo.asia/99f54268-84d5-4ad0-a25c-1b4e8b644b37.png)

Mọi người thấy vấn đề xảy ra không? Size mình design cho box là 100x100 px nhưng bây giờ nó + thêm padding vào là 132x132 px. Mình sẽ xử lí vấn đề này theo kiểu củ chuối nha, mình sẽ trừ đi 32px vào `width` và `height`:
```
.box{
    width: 68px;
    height: 68px;
    color: white;
    background-color: darkorchid;
    padding: 16px;
}
```
Vấn đề được giải quyết nhưng mình lại muốn thêm `border: 2px solid black` thì sao?
```
.box{
    width: 68px;
    height: 68px;
    color: white;
    background-color: darkorchid;
    padding: 16px;
    border: 2px solid black;
}
```

![](https://images.viblo.asia/bdfffd6f-b265-4c5f-b4e7-5592168dad1f.png)

Cái box của mình lại tăng tổng kích thước lên 104x104 px. Quá bực phải không, không lẽ lại tiếp tục trừ thêm? Không sao Box-sizing sẽ giải quyết vấn đề này :v: 
```
.box{
    width: 100px;
    height: 100px;
    color: white;
    background-color: darkorchid;
    padding: 16px;
    border: 2px solid black;
    box-sizing: border-box;
}
```

![](https://images.viblo.asia/7e9909ae-891a-4951-aba3-f86d9e1f2b7d.png)

Đấy cái box của mình lại cứ 100x100 px mà không phải tính toán cho mệt thân. Lúc này cái box-sizing sẽ hiểu và tính toán kích thước box của mình bằng với border + padding + kích thước content của mình. Nhưng padding không được 
quá kích thước khai báo cho element nhá, nếu quá thì không có tác dụng đâu

# Tổng kết
`box-sizing: border-box;`
Dùng để giữ kích thước khai báo ban đầu.
Nhưng padding chỉ được khai báo trong phạm vi cho phép nếu không sẽ không sử dụng được tính năng này.

Mặc định thì `box-sizing: content-box;`

`box-sizing: unset;`
Dùng để huỷ tính năng box-sizing:border-box;

Mọi người có thể tìm hiểu thêm tại: https://www.w3schools.com/jsref/prop_style_boxsizing.asp