# Console (8)
Những phần trước ([xem thêm](https://viblo.asia/p/chrome-devtools-console-tool-p1-3Q75w90JZWb)) chỉ là các công cụ lọc thông tin cho phần này nên bạn biết phần này quan trọng như thế nào rồi đó.
Đầu tiên thì nó là một nơi để hiển thị log, nơi mà các thông báo về các vấn đề của trang web có thể được show ra.
Sau đó nó cũng là nơi thực thi các lệnh javascript.

## Xử lý
### Running JavaScript với page hiện tại
`Console` là một [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). 

Bạn có thể chạy `javascript` trong tab `Console` để tương tác với trang web đang hiển thị 

Ví dụ chạy 1 đoạn lệnh javascipt để lấy nội dung của một thẻ trong trang web:

`document.querySelector('h1.article-content__title').textContent;`

![](https://images.viblo.asia/57ef44a2-b2d9-4291-8675-00d93ad1b02e.png)


hoặc 

`$('h1.article-content__title').textContent;`
![](https://images.viblo.asia/2b8e89da-7ef8-42ab-a43c-86a8e1f0b043.png)

Khi bạn gõ đến `$('h1.article-content__title')` thì bên trang web cũng đã xác định được tag đang được chọn và bôi đen nó.

Nếu bạn gõ thêm chấm vào `$('h1.article-content__title').`chrome sẽ gợi ý các hàm hay phương thức có thể thực hiện với nó. 

Hoặc bạn cũng có thể ấn mũi tên chỉ lên để lấy các câu lệnh vừa chạy trước đó.

Hay đơn giản chỉ là `Ctrl + space` để xem gợi ý câu lệnh mà bạn có thể thực hiện.

Tương tự như những IDE tiên tiến nhất.

Nếu bạn gõ 1 string `"xin chao!"` rồi enter nó sẽ trả về 1 string cho bạn, nếu bạn gán giá trị cho một biến `a = 3` nó sẽ trả về giá trị biến và lưu một biến vào bộ nhớ tạm thời cho bạn. 

Do có thể lấy được các thành phần của trang web ra một cách dễ dàng và `Console` có toàn quyền truy cập vào trang của bạn nên bạn cũng có thể chỉnh sửa các thành phần này. Thử gõ `$('h1.article-content__title').innerText = "xin chao!";` và xem lại tiêu đề bài viết này nào.  :upside_down_face:

**Note**

Ngoài ra `console` còn có các biến được lưu trữ sẵn khi bạn click vào 1 thẻ nào đó trong tab `element`

![](https://images.viblo.asia/fbd328c9-f2d8-4e76-b4d8-268cbe1c7808.gif)

Ta thấy được chrom sẽ hỗ trợ 5 biến tạm là $0, $1, $2, $3, $4 để lưu trữ các lần click gần nhất theo kiểu stack, click gần nhất là $0 và xa dần.

Bạn có thể xử lý javascript với các biến này như với các thẻ thông thường.

### Running javascript bất kỳ
Chạy JavaScript tùy ý không liên quan đến trang.

**Tạo một hàm**

ví dụ bạn tạo ra 1 hàm add(a, b)
```javascript
function add(x, y) {
  return x + y;
};
```

sau đó bạn thực hiện nó với 2 tham số truyền vào là 12 và 14:
```
add(12, 14);
```
Kết quả trả về sẽ là 26!

![](https://images.viblo.asia/89b9149e-5d6a-4669-aa66-f4acc5e95f3d.png)

**ECMAScript**

Chrome  hỗ trợ cả các hàm có trong tiêu chuẩn [ECMA](https://en.wikipedia.org/wiki/ECMAScript) của JavaScript. 

ví dụ một hàm mình hay sử dụng như `JSON.stringify` để `Chuyển đổi một đối tượng JavaScript thành một chuỗi` 
![](https://images.viblo.asia/7b1c228a-2e2e-4e91-9268-c73742892f0b.png)

hay hàm`JSON.parse` để chuyển một chuỗi vào chrome để dễ dang đọc..
![](https://images.viblo.asia/d8721937-ef41-4476-82ed-dd3bd562f28e.png)

Kết quả trả về được Chrome hiển thị một cách thật dễ nhìn, có thể chuột phải vào kết quả trả về và `Store as global variable` để lưu một value của Json trả về.

### Console API Reference

Chắc làm JavaScript không ai không biết `console`. Tác dụng là khi chạy sẽ hiển thị được trên trình duyệt những gì mình muôn.

**console.assert(expression, object)**

Log level: Error

Viết một lỗi vào `console` khi biểu thức expression có giá trị là false.

```javascript
a = 5;
b = 6;
console.assert(a > b, a, b);
> Assertion failed: 5 6
```

**console.clear();**

Clears console.

**console.count([label])**

Log level: Info

Viết số lần đếm đã được gọi ở cùng một dòng và với cùng một nhãn. Gọi console.countReset ([label]) để đặt lại số đếm.
thường sử dụng để đếm số lần lặp lại của một vòng lặp và show ra giá trị của một nhãn nào đó trong vòng lặp.

```javascript
console.count('a');
> a: 1
console.count('a');
> a: 2
console.count('a');
> a: 3
```

**console.countReset([label])**

đặt lại giá trị cho nhãn

```
console.countReset('a');
```

**console.log(object [, object, ...])**, **console.debug(object [, object, ...])**, **console.warn(object [, object, ...])**, **console.info(object [, object, ...])**, **console.error(object [, object, ...])**

In ra giá trị muốn hiển thị vào `console`

```javascript
var playerOne = 120;
var playerTwo = 130;
var playerThree = 140;
var playerFour = 150;
var playerFive = 160;

console.log("Console.log" + " " +  playerOne);
console.debug("Console.debug" + " " +playerTwo);
console.warn("Console.warn" + " " + playerThree);
console.info("Console.info" + " " + playerFour);
console.error("Console.error" + " " + playerFive);
```
****
![](https://images.viblo.asia/7ffa4402-c30a-4c37-bd16-bea7e43c6a4e.png)

console.log: text màu đen và không có icon

console.warn: text màu vàng và có icon cảnh báo

console.error: text màu đỏ và có icon cảnh báo

**console.dir(object)**

Log level: Info

In ra một kiểu JSON của đối tượng được chỉ định. 
![](https://images.viblo.asia/f3fe6b3d-33ea-44a9-af35-5997d32f2cf1.png)

**console.dirxml(node)**

Log level: Info

In ra một cây XML của một nút

![](https://images.viblo.asia/d36bd8f3-0380-4816-b7bf-3389e068e99e.png)

**console.table(array)**

Log level: Info

Hiển thị log dữ liệu dưới dạng bảng

```javascript
console.table([
  {
    first: 'René',
    last: 'Magritte',
  },
  {
    first: 'Chaim',
    last: 'Soutine',
    birthday: '18930113',
  },
  {
    first: 'Henri',
    last: 'Matisse',
  }
]);
```
![](https://images.viblo.asia/c310e824-69f7-4201-b3ca-b59f457efffc.png)

**console.time([label])** và **console.timeEnd([label])**

thường đi với nhau để đếm thời gian chạy từ lúc `console.time` đến lúc `console.timeEnd`

```javascript
console.time();
for (var i = 0; i < 100000; i++) {
  let square = i ** 2;
}
console.timeEnd();
> default: 6.56494140625ms
```


## Hiển thị

Một cách sử dụng cũng rất hay của Console là dùng để đọc các tài liệu dài có cấu trúc, các mảng, Json,...
Copy thứ bạn muốn đọc vào `console` và enter, chrome sẽ sắp xếp và hiển thị một cách có cấu trúc - tuyệt đẹp cho bạn, bên cạnh đó còn có nhiều thông số bổ xung cần thiết như count của mảng.

![](https://images.viblo.asia/80c3fe0a-dc5d-4aea-8970-842dd92ceed2.png)

![](https://images.viblo.asia/8ea8db8f-5f06-4a41-bb53-8208d204a377.png)

# Kết luận

Cảm ơn mọi người đã đọc bài của mình :hugs::hugs:

Tài liệu tham khảo: [developers.google.com](https://developers.google.com/web/tools/chrome-devtools/console)