## Giới thiệu
Tooltips là chú thích tuyệt vời để bổ sung và làm phong phú trải nghiệm người dùng cung cấp gợi ý và thêm thông tin cho người dùng. Có rất nhiều plugin JavaScript cung cấp chức năng này, nhưng nếu bạn không muốn sử dụng các thư viện đó, thì có thể xử lý nó chỉ bằng cách sử dụng sử dụng data attributes của HTML và môt số CSS đơn giản.
## Cách thực hiện
* **HTML**

    Đầu tiên chúng ta tạo ra một link hoặc một button với HTML, trong đó sẽ thiết lập nội dung của tooltip bằng cách truyền vào data attributes của thẻ html đó.
    
    `<a href="#" data-c-tooltip="I’m the c-tooltip text">c-tooltip</a>`
    
    
*    **CSS**

        Tiếp theo ta sẽ CSS cho thẻ HTML trên bằng cách sử dung ::after và ::before để tạo ra 1 hình chữ nhât đơn giản với nội dụng sử dụng data-c-tooltip trong thẻ HTML, và mũi tên phía dưới của tooltips.
        
```
data-c-tooltip]:after {
  z-index: 1000;
  padding: 8px;
  width: 160px;
  background-color: #000;
  background-color: rgba(51, 51, 51, 0.9);
  color: #fff;
  content: attr(data-c-tooltip);
  font-size: 14px;
  line-height: 1.2;
}
[data-c-tooltip]:before {
  z-index: 1001;
  border: 6px solid transparent;
  background: transparent;
  content: "";
  margin-left: -6px;
  margin-bottom: -12px;
  border-top-color: rgba(51, 51, 51, 0.9)
}
```

Sau đó ta CSS tạo  hiêu ứng sau khi hover và ta sẽ được kết quả như ảnh:
![](https://images.viblo.asia/9f04c207-4678-42e4-a8a8-08d0914cb2fc.png)
## Custom Tooltips

Ngoài ra ta có  thể tao ra tooltips ở các vị trí khác nhau như trên, dưới, trái, phải bằng cách thêm attributes tooltip-position và css cho attributes đó

Ví dụ với tooltips ở bên trái:

* **HTML**

    `<a href="#" data-c-tooltip="I’m the c-tooltip text" tooltip-position ="left">c-tooltip</a>`
*    **CSS**
```
[tooltip-position='left']:before,
[tooltip-position='left']:after {
  right: 100%;
  bottom: 50%;
  left: auto;
}
[tooltip-position='left']:before {
  margin-left: 0;
  margin-right: -12px;
  margin-bottom: 0;
  border-top-color: transparent;
  border-left-color: #000;
  border-left-color: rgba(51, 51, 51, 0.9);
}
[tooltip-position='left']:hover:before,
[tooltip-position='left']:hover:after,
[tooltip-position='left']:focus:before,
[tooltip-position='left']:focus:after {
  -webkit-transform: translateX(-12px);
  -moz-transform: translateX(-12px);
  transform: translateX(-12px);
}
```

Với các vị trí khác nhau ta làm tương tự  như ví dụ trên, các bạn có thể tham khảo demo bên dưới:

{@embed: https://codepen.io/TrinhThang/pen/zeydMr}


Như vậy, sau bài viết này, các bạn có thể tạo ra tooltips mà không cần sử dụng thư viện hay plugin bên ngoài mà chỉ cần HTML và CSS cơ bản

Chúc các bạn thành công!