## Vòng lặp là gì
- Vòng lặp là một hành động lặp đi lặp lại theo một nguyên tắc nhất định
- Đối với javascript chúng ta có những kiểu vòng lặp sau `for`, `forEach`, `while` và `do-while`

## Vòng lặp `for`
```
for (bienkhoitao; dieukienthucthi ; buocnhay) { 
	# code...
}
```
Trong đó
* `bienkhoitao`: là giá trị khởi tạo ban đầu của vòng lặp.
* `dieukienthucthi`: là điều kiện mà vòng lặp được phép chạy
* `buocnhay`: là khoảng đệm nhảy của mỗi vòng lặp

Vòng lặp for vô tận :
Muốn có vòng lặp for vô tận chúng ta để trống điều kiện thứ 2

cú pháp
```
for (var i = 0; ; i++) {
    //code
}
```

## Vòng lặp do-while
Đây là vòng lặp để lặp dữ liệu khi không xác định được điều kiện dừng lặp chính xác và nó` thực thi câu lệnh trước rồi mới kiểm tra điều kiện sau`
```
do {
    // code
} while (condition);
```
- `condition` là điều kiện để dừng vòng lặp, nếu bằng false thì vòng lặp sẽ dừng, ngược lại true thì vòng lặp chạy tiếp
VD 1:  
```
do {
	document.write(1);
} while(false);
```
VD2: Thực hiện in ra các số từ 1 đến 10 bằng vòng lặp do-while.
```
var i = 1;
do {
	document.write(i+ '<br>');
	i++;
} while(i <= 10);
```

## Vòng lặp `while`
Giống như vòng lặp `do-while`, `while` sử dụng để lặp dữ liệu khi không biết chính xác điều kiện dừng lặp là gì. Khác với `do-while`, `while` sẽ kiểm tra điều kiện xong thì mới thực thi câu lệnh
```
while (condition) {
		//code
}
```
- `condition` là điều kiện để dừng vòng lặp, nếu bằng false thì vòng lặp sẽ dừng, ngược lại true thì vòng lặp chạy tiếp

VD: in ra các số từ 1 đến 10 bằng while
```
var i = 1;
while(i <= 10){
	document.write(i);
	i++;
}
```
## Vòng lặp `forEach`
Khác với các loại trên `forEach` sử dung để lặp các phần tử trong array theo thứ tự.

cú phap:

`array.forEach(function(currentValue, index, arr), thisValue)`

- `array` là mảng cần lặp
- `currentValue` là giá trị phần tử hiện tại
- `index` là vị trí của phần tử hiện tại
- `arr` là đối tượng mảng thuộc về phần tử hiện tại
- `thisValue` là giá trị được sử dụng giống như `this` khi thực hiện `callback`

## Vòng lặp jquery
Nó giống như forEach, thao tác cả mảng và đối tượng
```
var arr = ['JS', 'Loop', 'forEach'];
 
$.each(arr, function(key, value) {
  console.log(key + ' - ' + value);
});
```

- `arr` là mảng cần lặp
- `key` là vị trí của phần tử
- `value` là giá trị hiện tại của phần tử

## Vòng lặp lồng nhau
Giống như câu lệnh điều kiện thì vòng lặp hoàn toàn có thể lồng nhau
VD: vòng lặp `for` lồng nhau
```
for(i = 0; i <= 10; i++) {
	for(j = i ; j <= 10; j++) {
		document.write('*');
	}
	document.write('<br>');
}
```

Những loại khác tương tự như for

## Kết
Mình đã giới thiệu với các bạn về các loại vòng lặp trong javascript. Hẹn gặp mọi người ở bài viết sau