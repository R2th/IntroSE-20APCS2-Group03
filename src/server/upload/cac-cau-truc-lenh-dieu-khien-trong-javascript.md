![image.png](https://images.viblo.asia/d4fdab69-3719-41fc-bbed-83716c7a744d.png)

Bất  kỳ một ngôn ngữ lập trình nào cũng có các câu lệnh được xây dựng sẵn dùng để thực thi các dòng code theo các yêu cầu được chỉ định, JavaScript cũng không ngoại lệ. Không dài dòng nữa, chúng ta cùng nhau tìm hiểu cấu trúc lệnh điều khiển hay `if...else` và `switch...case` trong JavaScript sẽ như thế nào nè, bắt đầu thôi 😉.

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/cac-cau-truc-lenh-dieu-khien-trong-javascript/

## I. Câu lệnh if...else

### 1. Câu lệnh if

Đối với câu lệnh `if...else` không nhất thiết phải có `else` khi có `if` nhé 😄, mà ta có thể sử dụng `if` độc lập nè.

```
if(condition){
	//code ở đây
}
```

**Condition** hay điều kiện ở đây là một đoạn code  hay một mệnh đề mà kết quả của nó trả về `true/false` . Ở đây, nếu **condition** mà trả về `true` thì sẽ thực thi đoạn code bên trong block code của `if` nè 😉.

```
let a = 5, b = 10;

if(a < b) {
	console.log('a < b');
}
```

### 2. Câu lệnh else

Với else thì hơi khác if một chút là muốn có else thì phải có if trước đó, tức là khi điều kiện của mệnh đề if trước nó không đúng thì câu lệnh else mới được thực thi nè 😁, cấu trúc sẽ như sau.

```
if(condition) {
	// condition = true thì code ở đây sẽ chạy
} else {
	// condition = false thì code ở đây sẽ chạy
}
```

Ví dụ:

```
let a = 5, b = 10;

if(a > b) {
	console.log('a > b');
} else {
	console.log('a <= b');
}
// --> result: a <= b
```

### 3. Kết hợp if...else lồng nhau

Với ví dụ trên thì kết quả cuối cùng vẫn không được rõ cho lắm đúng không nè 😀, ta vẫn chưa biết được khi nào `a` thực sự bằng `b` hay khi nào `a` thực sự nhỏ hơn `b`. Đừng quá lo lắng, ta có thể lồng câu lệnh `if...else`  nhiều lần để có thể 'cover' hết được các trường hợp có thể xảy ra nè 😊😉.

Để cover được hết các trường hợp của ví dụ trên, ta làm như sau:

```
let a = 5, b = 10;

if(a > b) {
	console.log('a > b');
} else {
    if(a === b) {
		console.log('a = b');
	} else {
        console.log('a < b');
	}
}
// --> result: a < b
```

Đơn giản phải không nào 😉.

### 4.If...else rút gọn

Chúng ta còn có thể rút gọn câu lệnh `if...else` bằng toán tử 3 ngôi mà mình có giới thiệu trong bài trước, cấu trúc như sau:

```
Điều kiện ? block code 1 : block code 2
```

Nếu điều kiện đúng thì thực hiện block code 1, ngược lại thì thực hiện block code 2, cùng đi vào ví dụ nhé 😉.

```
let a = 2;
a % 2 == 0 ? console.log("a là số chẵn") : console.log("a là số lẻ")
//--> result:  a là số chẵn
```

## II. Câu lệnh switch...case

`switch...case` hay còn được gọi là câu lệnh rẽ nhánh, nó thường được dùng để giải quyết các bài toán có các điều kiện cố định, cấu trúc của nó như sau:

```
switch(condition) {
    case value 1:
    	//block code
		break;
    case value 2:
    	//block code
		break;
	case value 3:
    	//block code
		break;
    default:
        //block code
        break;
}
```

Giải thích tý nè 😁:

* **condition**: là biến mà ta muốn kiểm tra để rẽ nhánh.
* **value1, value2,...**: là các giá trị tại các nhánh điều kiện mà ta muốn kiểm tra.
* **default**: là trường hợp mặc định sẽ trả về nếu không thỏa các `case` bên trên.
* **break**: có tác dụng dừng vòng lặp hay câu lệnh kiểm tra điều kiện trong chương trình.

Cùng đi vào ví dụ cho dễ hiểu nè 😁

```
let a = 5;

switch(a) {
    case 0:
    	console.log("Không");
		break;
    case 1:
    	console.log("Một");
		break;
	case 2:
    	console.log("Hai");
		break;
    case 3:
    	console.log("Ba");
		break;
    case 4:
    	console.log("Bốn");
		break;
    case 5:
    	console.log("Năm");
		break;
    default:
        console.log("Không thỏa mãn");
        break;
}

//--> result: Năm
```

Đơn giản, dễ hiểu phải không nè 🤣.

## III. Tổng kết

Bài viết này mình đã giới thiệu cho các bạn về câu lệnh `if...else` hoạt động như thế nào, cách tùy biến nó, `if...else` rút gọn, câu lệnh rẻ nhánh `switch...case` và cách sử dụng rồi nè. Hy vọng các bạn sẽ hiểu rõ về chúng hơn và có thể áp dụng vào các bài tập hay dự án của các bạn. Bài tiếp theo chúng ta sẽ cùng nhau tìm hiểu [Vòng lặp trong JavaScript nhé](https://200lab.io/blog/vong-lap-trong-javascript/) 😉. Cảm ơn các bạn đã đọc 🤗!