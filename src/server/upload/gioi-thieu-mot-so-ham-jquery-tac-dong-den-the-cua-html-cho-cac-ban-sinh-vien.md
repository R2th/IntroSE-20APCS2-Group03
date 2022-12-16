### Lời nói đầu.
Hôm nay tôi nói về các sử dụng một số hàm tác động đến các thẻ của html trong jquery. Tôi hy vọng bài viết này có thể giúp ích được cho các bạn sinh viên mới làm quen với jquery.
    
```
mục lục: <br>
1, Hàm append().<br>
2, Hàm prepend().<br>
3, Hàm after().<br>
4, Hàm before().<br>
5, Hàm empty().<br>
6, Hàm remove().<br>
7, Lời kết.<br>
```

### 1, Hàm append().
-Hàm append() trong Jquery có tác dụng chèn thêm nội dung vào phía sau của thành phần cần tác động.<br>
Cú Pháp:<br>
`$('selector').append(content);`
Trong đó: content là nội dung mà các bạn cần thêm.<br>

VD:<br>
`$('p').append('<b>Toidicode.com</b>');` <br>

[demo](https://toidicode.com/live/?id=211)

### 2, Hàm prepend().
-Hàm prepend() trong Jquery có tác dụng chèn thêm nội dung vào đầu của thành phần cần tác động. <br>

Cú Pháp:<br>

`$('selector').prepend(content);`
Trong đó: content là nội dung mà các bạn cần thêm.<br>

VD:<br>

`$('p').prepend('<b>Toidicode.com</b>, ');`

[demo](https://toidicode.com/live/?id=212)

### 3, Hàm after().
-Hàm after() trong Jquery có tác dụng chèn nội dung vào phía sau của thành phần cần tác động. <br>

Cú Pháp:<br>

`$('selector').after(content);`
Trong đó: content là nội dung mà các bạn cần thêm.

VD:

`$('p').after('<div style="background:red;">Toidicode.com</div>');`
[demo](https://toidicode.com/live/?id=213)

### 4, Hàm before().
-Hàm before() trong Jquery có tác dụng chèn thêm nội dung vào phía trước của thành phần cần tác động.<br>

Cú Pháp:<br>

`$('selector').before(content);`
Trong đó: content là nội dung mà các bạn cần thêm.<br>

VD:<br>

`$('p').before('<div style="background:red;">Toidicode.com</div>');`

[demo](https://toidicode.com/live/?id=214)

### 5, Hàm empty().
-Hàm empty() trong Jquery có tác dụng làm trống nội dung của thành phần cần tác động.<br>

Cú Pháp:<br>

`$('selector').empty();`
VD:<br>

`$('p').empty();`
[demo](https://toidicode.com/live/?id=215)


### 6, Hàm remove().
-Hàm remove() trong Jquery có tác dụng xóa các thành phần vừa được chọn.<br>

Cú Pháp:<br>

`$('selector').remove(argument);`
Trong đó:<br>

Nếu để trống hàm remove() thì là xóa hết các thành phần bên trong thành phần cần chọn.<br>
Nếu muốn xóa các thành phần cụ thể thì chỉ cần liệt kê các thành phần cần xóa trong hàm remove().<br>
VD: Xóa tất cả các thẻ p.<br>

`$('p').remove();`
[demo](https://toidicode.com/live/?id=216)

VD: Xóa tất cả các thẻ p có class là 'demo'.<br>

`$('p').remove('.demo');`
[demo](https://toidicode.com/live/?id=217)

VD: Xóa tất cả các thẻ p có class là 'demo' hoặc id là 'des'.<br>

`$('p').remove('.demo, #des');`
[demo](https://toidicode.com/live/?id=218)

### 7, Lời kết.
Như vậy Tôi đã giới thiệu qua 8 hàm tác động đến thẻ của HTML.Tôi nghĩ nó rất có ích cho các bạn mới làm quen với Jquery. Cảm ơn các bạn đã quan tâm đến bài viết của mình.