Bạn bắt đầu học **Javascript**, bạn sẽ học theo sách, tutorial, video... nhưng chắc dù cách nào đi nữa, khái niệm đầu tiên bạn sẽ nghe/thấy được về **Javascript** là Javascript hỗ trợ `first-class functions`.

Có thể bạn sẽ chưa hiểu đó là gì, nhưng bạn vẫn có thể code ầm ầm, vậy khái niệm này có gì quan trọng, hiểu được nó sẽ giúp ích như thế nào trong lập trình Javascript. Chúng ta cùng tìm hiểu khái niệm **first-class functions** trong Javascript ở bài viết hôm nay nhé.

Thật ra là bạn dùng chúng hằng ngày đấy :D

![](https://image.slidesharecdn.com/functional-programing-in-js-slides-170614081828/95/functional-programing-in-javascript-lite-intro-4-638.jpg?cb=1507643435)

>Có thể hiểu khái niệm này như sau: Functions (hàm) trong Javascript có thể được lưu trữ như biến, truyền như là tham số vào hàm khác, là kết quả trả về của một hàm, lưu trữ dữ liệu hay thậm chí là có thuộc tính riêng như đối tượng (objects).

Đây là khái niệm cần phải nắm rõ nếu bạn muốn hiểu được các tính năng nâng cao hơn trong Javascript như: higher order functions, decorate functions, callbacks hay nhiều tính năng khác....

Giờ chúng ta sẽ đi qua từng khái niệm với từng ví dụ cụ thể để hiểu rõ hơn nhé!

Mình sẽ dùng hàm `inHoa` để in chữ ra màn hình:

```js
function inHoa(text) {
    return text.toUpperCase() + '!'
}
>>> inHoa('hello')
'HELLO!'
```

## Functions là Objects

Trong 8 [kiểu dữ liệu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) của Javascript thì có đến 7 kiểu dữ liệu nguyên thủy (Boolean, Null, undefined, Number, BigInt, String và Symbol) thì tất cả các dữ liệu còn lại đều là Objects, và Functions cũng không phải là ngoại lệ.

Vì vậy, ta có thể gán hàm `inHoa` cho 1 biến khác:
```js
var otherInHoa = inHoa
```
Ở đây thì hàm `inHoa` chưa được gọi nhé. Nó tạo ra biến có tên `otherInHoa` và trỏ đến đối tượng mà hàm có tên `inHoa` đang trỏ tới. Bạn có thể gọi hàm `otherInHoa` cho kết quả tương tự:
```js
>>> otherInHoa('hello')
'HELLO!'
```
`inHoa` và `otherInHoa` giờ là 2 hàm tách biệt nhau hoàn toàn, xem ví dụ sau sẽ rõ:
```js
inHoa = undefined

>>> inHoa('hello?')
Uncaught TypeError: inHoa is not a function

>>> otherInHoa('hey')
'HEY!'
```

## Functions có thể được lưu trữ như dữ liệu

Bạn có thể lưu hàm trong mảng như sau:
```js
var funcs = [Math.max, Math.min]
>>> funcs
(2) [ƒ, ƒ]
	0:  ƒ max()
	1:  ƒ min()
```
Làm việc với nó như bình thường:
```js
funcs.forEach(f => console.log(f.name))
// max
// min
```

## Functions có thể được truyền như tham số vào hàm khác

Mình sẽ viết tiếp 1 hàm khác là `chao` để hiển thị một lời chào ra màn hình, tất nhiên hiển thị lời chào không không thì quá đơn giản,để phức tạp hơn một chút thì mình sẽ in hoa lời chào trước khi in.

Chợt nhớ lại là ở trên mình đã viết hàm `inHoa` rồi, giờ chỉ việc dùng lại thôi chứ code chi cho mệt :D

```js
function chao(func) {
    var greeting = func('Hi, I am a Javascript programmer')
    console.log(greeting)
}
```

Ở đây, tham số mình muốn truyền vào cho hàm `chao` cũng là một hàm khác (trong ví dụ này là `inHoa`):

```js
>>> chao(inHoa)
'HI, I AM A JAVASCRIPT PROGRAMMER!'
```

Tất nhiên trong trường hợp bạn muốn in thường hay nữa in nữa thường thì chỉ cần truyền tên hàm vào cho `chao`:

```js
function inThuong(text):
    return text.toLowerCase() + '...'

>>> chao(inThuong)
'hi, i am a javascript programmer...'
```

Khái niệm này khá hay phải không nào, nó cho phép chúng ta thay đổi hành vi và kết quả của một hàm mà không hề thay đổi code bên trong hàm đó. Hay còn được biết đến cái tên gọi hoành tá tràng hơn là _higher-order functions_. Có thể mình sẽ tìm hiểu chi tiết ở các bài viết sau.

Một trong các ví dụ phổ biến nhất của _higher-order functions_ là các hàm trong Array như: `map, filter, reduce...`

Chúng ta có thể truyền hàm `inHoa` như là 1 tham số vào trong hàm `map`:

```js
['hello', 'hey', 'hi'].map(inHoa)
>>> ['HELLO!', 'HEY!', 'HI!']
```

## Functions có thể chứa bên trong hàm khác

Hàm trong Javascript có thể được định nghĩa (chứa trong) 1 hàm khác. Hoặc chúng còn có thể được gọi như là  _nested functions_  hay  _inner functions_. Xem ví dụ:

```js
function dinhDang(text) {
    function inThuong(t) {
        return t.toLowerCase() + '...'
    }
    return inThuong(text)
}

>>> dinhDang('Hello, World')
'hello, world...'
```

Điều gì đã xảy ra ở đây? Mỗi lần chúng ta gọi hàm `dinhDang`, nó sẽ define một hàm `inThuong` mới và gọi hàm đó. Kiểm tra xem mình có chém gió không:

```js
>>> inThuong('Yo')
Uncaught ReferenceError: inThuong is not defined

>>> dinhDang.inThuong
undefined
```

Nhưng chắc bạn không dễ dãi như thế, bạn muốn truy cập hàm `inThuong` bên ngoài hàm `dinhDang`? Đơn giản thôi, nhớ lại khái niệm đã học, functions cũng là objects, vậy ta thử return nó xem sao.

Cho thêm phần kịch tính thì mình sẽ thêm 1 hàm inner là `inHoa` nữa nhé, hàm `getDinhDang` sẽ phụ thuộc vào tham số truyền vào mà sẽ return là `inHoa` hay `inThuong`:

```js
function getDinhDang(volume) {
    function inThuong(text) {
        return text.toLowerCase() + '...'
    }
    function inHoa(text) {
        return text.toUpperCase() + '!'
    }
    if (volume > 0.5) return inHoa
    else return inThuong
}
```

Chú ý là hàm `getDinhDang`  không thật sự _gọi_ các hàm inner—nó chỉ đơn giản là dựa vào tham số `volume` truyền vào và trả về giái trị của _function object_ mà thôi:

```js
>>> getDinhDang(0.3)
ƒ inThuong(text) {
    return text.toLowerCase() + '...'
}

>>> getDinhDang(0.7)
ƒ inHoa(text) {
    return text.toUpperCase() + '!'
}
```
Bạn có thể gọi trực tiếp function trả về hay gán nó cho 1 biến khác nữa cũng chẳng có vấn đề gì:

```js
var dinhDangInHoa = getDinhDang(0.7)
dinhDangInHoa('Hello')
// 'HELLO!'
```

Tới đây thì bạn thấy Javascript quả thật là vi diệu đúng không? Không hoàn toàn là thế, khái niệm này là của `first-class functions` và Javascript chỉ là 1 trong nhiều ngôn ngữ hổ trợ nó mà thôi chứ Javascript thì vẫn sida nhé :D

Bài viết hôm nay chắc cũng khá là dài rồi. Hẹn gặp lại các bạn ở phần 2. Hy vọng mọi người sẽ hiểu những gì mình muốn gửi gấm :D.

Ghé thăm [blog](https://duthaho.com) của mình để ủng hộ nhé!