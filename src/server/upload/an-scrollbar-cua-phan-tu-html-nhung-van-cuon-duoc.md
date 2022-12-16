Đôi khi chúng ta cần ẩn thanh cuộn của phần tử HTML. Việc này nhằm tăng tính thẩm mỹ hay tuân theo thiết kế.
Có nhiều cách để làm được nhưng dưới đây là một trong những cách đơn giản mình đã thử. Bằng cách sử dụng CSS với pseudo selector.

Để xuất hiện scrollbar, mình sử dụng *max-height*.

`
.box ul {
    max-height: 100px;
    overflow: auto;
    ...
}
`

```
<div class="scroll">
    <ul>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
    </ul>
</div>
```

{@codepen: https://codepen.io/dat08/pen/qBdaXLY}

Bằng cách này trình duyệt tự động thêm scrollbar.
Bây giờ mình sẽ thêm một số thuộc tính và pseudo để ẩn nó đi:

```
.box ul {
    width: 200px;
    max-height: 100px;  
    background: orange;

    overflow: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}

.box ul::-webkit-scrollbar { 
  width: 0 !important;
  display: none; 
}
```
{@codepen: https://codepen.io/dat08/pen/YzXGrXM}

**Một cách khác nữa là đẩy scroll sang phải ở child div.**

```
.box {
  width: 200px;
  height: 100px;  
  background: orange;
  overflow: hidden;
}

.box ul {
  height: 100%;
  margin-right: -20px;
  overflow-y: scroll;
}
```

{@codepen: https://codepen.io/dat08/pen/zYGKEBj}

Kết quả là scrollbar đã ẩn đi nhưng vẫn scroll được.

Tham khảo: stackoverflow  :sweat_smile: