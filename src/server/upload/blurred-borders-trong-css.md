Một ngày nào đó chúng ta muốn làm mờ border của một thành phần, không có tính năng hay nền tảng web tích hợp đơn giản nào chúng ta có thể tiếp cận. Nhưng chúng ta có thể hoàn thành nó với một thủ thuật CSS nhỏ.

Đây là những gì chúng ta sẽ nhận được:
![](https://images.viblo.asia/07df7033-54b5-4191-93a6-a1cc21cfd511.jpg)

Chúng ta hãy xem làm thế nào chúng ta có thể code ra hiệu ứng này, làm thế nào chúng ta có thể cải thiện nó với các góc tròn bo viền, hỗ trợ để nó hoạt động trên nhiều trình duyệt.

## Code đường viền mờ cơ bản

```
$b: 1.5em; // border-width

div {
  border: solid $b rgba(#000, .2);
  height: 50vmin;
  max-width: 13em;
  max-height: 7em;
  background: url(oranges.jpg) 50%/ cover 
                border-box /* background-origin */
                padding-box /* background-clip */;
}
```

Đoạn mã trên cho chúng ta kết quả như sau:

{@embed: https://codepen.io/thebabydino/pen/xBWjqO}

Tiếp theo, chúng ta thêm một phần tử giả định bao phủ toàn bộ border-box và được đặt phía sau (z-index: -1). Chúng ta cũng làm cho phần tử giả này kế thừa đường viền và nền của phần tử cha, sau đó chúng ta thay đổi màu đường viền thành trong suốt.

```
$b: 1.5em; // border-width

div {
  position: relative;
  /* same styles as before */
  
  &:before {
    position: absolute;
    z-index: -1;
    /* go outside padding-box by 
     * a border-width ($b) in every direction */
    top: -$b; right: -$b; bottom: -$b; left: -$b;
    border: inherit;
    border-color: transparent;
    background: inherit;
    background-clip: border-box;
    content: ''
  }
}
```

Bây giờ chúng ta cũng có thể thấy nền phía sau đường viền 

{@embed: https://codepen.io/thebabydino/pen/ywKjGN}

Bước tiếp theo là làm mờ pseudo-element. 

{@embed: https://codepen.io/thebabydino/pen/gEeKaE}