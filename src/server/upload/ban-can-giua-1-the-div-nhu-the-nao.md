## Tổng quan ví dụ
Với những bạn mới học HTML, CSS cơ bản, việc **căn giữa** 1 thẻ HTML có thể trở nên khó khăn.<br>
Với việc tự học và tham khảo, tôi đúc rút được vài cách **căn giữa 1 thẻ HTML** dễ nhất, hiệu quả nhất.<br>
Ở đây, ta quy ước **căn giữa** là căn giữa cả theo **chiều ngang** và **chiều dọc** nhé.


<br>Ta có một trang HTML đơn giản với cấu trúc sau:
<br>
```
<div class="parent">
        <div class="child"></div>
</div>
```

<br>Và phần CSS ban đầu:
```
body {
	margin: 0;
	padding: 0;
}
.parent {
	background-color: #3a3845;
	width: 100vw;
	height: 100vh;

}
.child {
    background-color: #f7ccac;
	width: 200px;
	height: 200px;
    
}
```

* Thẻ cha với class `parent` chiếm toàn bộ trang web
* Thẻ con với class `child` (màu hồng) đang nằm ở góc trên bên trái

![image.png](https://images.viblo.asia/03d29c0c-3d04-46ed-ab37-13ce681d7f3f.png)

Bây giờ, ta sẽ cùng căn giữa thẻ con nhé.
## Sử dụng thuộc tính position + transform
Code CSS có thêm một chút style:
```
.parent {
	background-color: #3a3845;
	width: 100vw;
	height: 100vh;

    /* additional style */
    position: relative;
}

.child {
	background-color: #f7ccac;
	width: 200px;
	height: 200px;

    /* additional style */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

Thẻ cha ta có thuộc tính `position: relative`, thẻ con ta có thuộc tính `position: absolute` cùng với `left`, `right`, `transform` như trên, ta đạt được:

![image.png](https://images.viblo.asia/478ec4fe-9353-4c83-8d18-028b90272b83.png)

## Sử dụng Flexbox
Code CSS chỉ thay đổi ở thẻ cha:
```
.parent {
	background-color: #3a3845;
	width: 100vw;
	height: 100vh;

    /* additional style */
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
	background-color: #f7ccac;
	width: 200px;
	height: 200px;
}
```

`display: flex` biến thẻ cha thành Flex container, `justify-content: center` căn giữa các thẻ con theo chiều ngang, `align-items: center` căn giữa các thẻ con theo chiều dọc:

![image.png](https://images.viblo.asia/23599fe9-0afe-451c-9843-608b6fe47043.png)

Flexbox còn nhiều thuộc tính và khái niệm nữa, nhưng trong ví dụ này bạn chỉ còn 3 dòng code là đạt được hiệu quả nha😄

## Kết
Tuỳ vào từng tình huống mà ta dùng các cách một cách linh hoạt nhất. Khi không thể sử dụng cách 1 thì ta dùng cách 2 và ngược lại.<br>
Đây chỉ là 2 cách mà tôi cho là hay nhất, còn nhiều cách khác, các bạn hãy Google thêm nhé.<br>
Nếu được thì tôi ưu tiên sử dụng **Flexbox**, vì vừa nhanh, vừa tiện, còn các bạn thì sao?