Chào các bạn, ở bài viết trước chúng ta đã tạo được hiệu ứng di chuyển cho các hạt, bây giờ sẽ là phần quan trọng nhất và cũng là công việc cuối cùng để hoàn thành hiệu ứng "Liên kết hạt (particle)" đó là tạo liên kết giữa các hạt.

* Để liên kết các hạt với nhau chúng ta sẽ nối hai hạt gần nhau bằng một đoạn thẳng
* Chúng ta sẽ định nghĩa ra một khoảng cách nhất định và tính khoảng cách giữa các hạt, nếu hai hạt bất kỳ cách nhau một khoảng bằng hoặc nhỏ hơn khoảng cách mà chúng ta quy định thì sẽ vẽ một đoạn thẳng để nối hai điểm đó.
* Bản chất việc tính khoảng cách giữa hai điểm rất đơn giản, do các điểm được vẽ dựa trên tọa độ x, y nên có thể áp dụng công thức:

    Khoảng cách giữa A( x1 , y1 ), và B( x2 , y2 ) = Căn bậc hai [ ( x2 - x1 )^2 + ( y2 - y1 )^2 ]
  
* Chúng ta sẽ viết thêm một function linkNode, tham số nhận vào là node1 và node2 ký hiệu **n1** và **n2**.
* Trong function này chúng ta sẽ tính khoảng cách giữa hai node theo công thức bên trên và gán giá trị tính được vào biến **dist**.

```javascript
...
PAR.fn.linkNode = function (n1, n2) {
    var dx = n1.x - n2.x,
    dy = n1.y - n2.y,
    dist = Math.sqrt(dx * dx + dy * dy);
}
...
```

* Tiếp theo chúng ta thêm vào thuộc tính **options** các giá trị **nodeLinkSize**, **lineSize**, **lineColor**

```javascript
...
this.defaultOptions = {
    ...
    nodeLinkSize: options.nodeLinkSize ? options.nodeLinkSize : 200,
    lineColor: options.lineColor ? options.lineColor : 'rgba(255,255,255,0.5)',
    lineSize: options.lineSize ? options.lineSize : 'random',
};
...
```

* **nodeLinkSize** chính là khoảng cách tối đa mà hai node sẽ được liên kết với nhau
* Bây giờ chúng ta sẽ kiểm tra khoảng cách giữa hai node, nếu nhỏ hơn hoặc bằng giá trị **nodeLinkSize** thì sẽ vẽ một đoạn thẳng nối giữa hai node.
* Độ dày và màu của đoạn thẳng được xác định bởi thuộc tính **lineSize** và **lineColor**
```javascript
...
PAR.fn.linkNode = function (n1, n2) {
    var dx = n1.x - n2.x,
    dy = n1.y - n2.y,
    dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= PAR.defaultOptions.nodeLinkSize) {
        PAR.ctx.beginPath();
        if (PAR.defaultOptions.nodeType === 'rect') {
            PAR.ctx.moveTo(n1.x + (n1.r / 2), n1.y + (n1.r / 2));
            PAR.ctx.lineTo(n2.x + (n2.r / 2), n2.y + (n2.r / 2));
        } else if (PAR.defaultOptions.nodeType === 'circle') {
            PAR.ctx.moveTo(n1.x, n1.y);
            PAR.ctx.lineTo(n2.x, n2.y);
        }
        if (typeof PAR.defaultOptions.lineSize === 'string' && PAR.defaultOptions.lineSize === 'random') {
            PAR.ctx.lineWidth = Math.random() * PAR.defaultOptions.lineSize;
        } else if (typeof PAR.defaultOptions.lineSize === 'number') {
            PAR.ctx.lineWidth = PAR.defaultOptions.lineSize;
        }
        PAR.ctx.strokeStyle = PAR.defaultOptions.lineColor;
        PAR.ctx.stroke();
        PAR.ctx.closePath();
    }
}
...
```

* Cuối cùng tại phương thức **update** chúng ta sẽ duyệt qua tất cả các **node** và gọi phương thức **linkNode**
```javascript
...
PAR.fn.update = function () {
    ...
    for (var i = 0; i < PAR.nodes.length; i++) {
        var node = PAR.nodes[i];
        ...
        for (var j = i + 1; j < PAR.nodes.length; j++) {
            var node2 = PAR.nodes[j];
            PAR.fn.linkNode(node, node2);
        }
    }
}
...
```

Xem lại ví dụ: [Demo](https://jsbin.com/rekefoh/edit?html,js,output)

Video: [Youtube](https://www.youtube.com/watch?v=DAOXLCrvQQA)

Vậy là chúng ta đã hoàn thành hiệu ứng liên kết hạt (particle). Chúc các bạn code vui vẻ và có thể áp dụng hiệu ứng này vào nhiều mục đích khác.