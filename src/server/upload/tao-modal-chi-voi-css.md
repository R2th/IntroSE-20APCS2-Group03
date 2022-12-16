## Giới thiệu
Với dân frontend thì ai cũng biết đến modal của bootstrap rồi, chắc ai cũng tự hỏi boostrap đã làm như nào. Trong bài này mình sẽ giới thiệu cách làm modal, nhưng không phải của bootstrap, mà = css =))

## Lý thuyết
Modal sẽ gồm 2 thứ, 1 cái nút để ấn thì show modal, 2 là modal :v 
Nếu dùng js thì chỉ cần bắt event click vào nút rồi thêm xóa class vào modal rồi css để nó ẩn hiện là xong, nhưng chỉ với html css thì sao?
Thật may là html có bộ đôi label - input
```
<label for="control-modal">Click to show modal</label>
```
```
<input id="control-modal" type="checkbox" />
```
Khi dùng 1 thẻ label với att for = id của 1 input checkbox như trên, click vào label cũng đồng nghĩa với việc tick vào checkbox.
Ta sẽ tận dụng việc này để css cho modal
```
<body>
    <input />
    <label>Button</label>
    <div class="modal">
        ...
    </div>
```
Click label -> input:checked ~ .modal {}

Làm nào

{@embed: https://codepen.io/dfly25e/pen/bGpmxwe}

Mình vừa làm sơ sơ theo lý thuyết đã đưa ra, cũng khá ok và đơn giản nhỉ?! 
Chúc vui vẻ :v: