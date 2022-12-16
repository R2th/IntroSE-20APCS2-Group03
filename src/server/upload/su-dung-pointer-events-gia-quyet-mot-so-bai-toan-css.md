*Chắc hắn mọi người người đã từng mong muốn làm thế nào để xử lý sự kiện hover của phần tử con nhưng nó nhưng thay vì thay đổi thuộc tính của bản thân nó ta lại muốn thay đổi phần tử cha hay các phàn tử ngang hàng của nó.

giả sửa ta có đoạn mà html:*
```

<ul>
  
  <li class="one">Child one</li>
  <li class="two" >Child two</li>
  <li class="three" >Child three</li>
  <li class="four">Child four</li>
  <li class="five">Child five</li>
  <li class="six">Child six</li>
</ul>

```
### Yêu cầu 1

  Bài toán sẽ dễ dàng nếu như khi hover vào bất kì phần tử li nào thì background của ul thay đổi, nhưng bây giờ ta chỉ muốn duy nhất khi hover vào phần tử thứ 3 thì background của ul mới thay đổi.

- Sử dụng pointer-events
Thuộc tính pointer-events của CSS hạn chế con trỏ chuột:
  + click chuột vào bất kỳ đối tượng nào
  + không hiển thị icon mặc định (tùy thuộc vào trình duyệt)
  + sự kiện liên quan đến CSS hover
  + không cho phép hàm JavaScript click (onlick) chạy

[Tài liệu về pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)

ở ul ta thêm thuộc tính:

```

ul {
  pointer-events: none;
}

```

ở phần tử thứ 3 ta thêm thuộc tính:

```

.three {
  pointer-events: auto;
}

```

ở đây ta chỉ cần thêm huộc tính hover ở phần tử ul nữa là được:
```

ul:hover{
  background: red;
}

```

[Link ví dụ Codepend](https://codepen.io/anon/pen/WYGaqO)

### Yêu cầu 2: Giả sử ta có đoạn mà html

 ```
<div class="parent">
    <div class="child">Child</div>
</div>

```

Yêu cầu thay vì như bài toán phía trên bây giờ apply sự kiện hover cho phần tử child nhưng không apply cho parrent

- Theo cách thông thường ta sẽ thêm một thẻ html ngang hang với phần thử child:

```
<div class="parent">
    <div class="child">Child</div>
    <div class="overwrite">Child</div>
</div>

```

và style cho nó:

```
.parent { width: 400px; height:400px; position: relative; z-index: 998; }
.parent:hover { background-color: green; }

'child {width: 200px; height:200px; position: relative; z-index: 1000; }

.child:hover { background-color: blue; }

.overwrite {
  position: absolute;
  top: 0; 
  left: 0; 
  z-index: 999;
  width: inherit;
  display: none;
  ...
}

.child:hover ~ .overwrite { display: block; }

```


[Link ví dụ Codepend](https://codepen.io/anon/pen/oQzJRd)

nhưng nếu ta sử dụng pointer-events:

Ta sẽ giữ nguyện được đoạn mà html ban đầu:

```

<div class="parent">
    <div class="child">Child</div>
</div>

```
  
```
.parent {
  pointer-events: none;
...
}

.child {
  pointer-events: auto;
 ...
}

.child:hover { background-color: blue; }

```

Ta thấy việc sử dụng pointer-events dễ dàng và tối ưu hơn, điểm trừ duy nhất của thuộc tính này là một số trình duyệt thấp không hỗ trợ.

### Tài liệu tham khảo:
https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events

https://medium.com/@erinannette/css-pointer-events-simple-clever-hovers-with-just-a-few-lines-of-code-d44a14a4e06f