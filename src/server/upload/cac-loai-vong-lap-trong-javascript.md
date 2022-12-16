Vòng lặp là một thành phân vô cùng quan trọng của các ngôn ngữ lập trình và thường sẽ là một trong những thứ được lập trình viên tiếp cận đầu tiên. Hẳn lập trình viên nào cũng quen với các loop phổ biến như **for**, **while** . Javascript thì cũng tương tự như vậy, tuy nhiên nó còn thêm một đống thứ kéo theo và đôi lúc không biết nó giúp ích cho dev hay lại chính là nguyên nhân tạo thêm bug. Trong bài viết mở đầu cho series **Loop**, mình sẽ giới thiệu về các loại vòng lặp trong Javascript

![](https://images.viblo.asia/f07ee891-403b-44db-bd0a-05f25a8562b9.png)

## For loop
<hr>

Đầu tiên hẳn sẽ là loop phổ biến nhất và có phần lớn trong các ngôn ngữ lập trình : **for**

Với vòng lặp **for** ta sẽ khởi tạo biến đếm, kiểm tra điều kiện và tăng hoặc giảm biến được thực hiện trên cùng một dòng, do đó khá dễ dàng cho những người mới tiếp cận để debug và cũng giảm khả năng sinh ra lỗi

### Cú pháp
```javascript:js
for ([initialization];[condition];[final-expression]){
   Block of code
}
```

### Ví dụ

```javascript:js
for(var i = 0; i < 10; i++) {
    console.log(i)
}
```

### Kết quả
```css:js
0
1
2
...
9
```

## While loop
<hr>

Bên cạnh **for** thì **while** cũng là một trong những vòng lặp tương đối basic. Câu lệnh while tạo ra một vòng lặp thực thi một khối lệnh (block of code) cho đến khi điều kiện vẫn đúng.

### Cú pháp

```javascript:js
while (condition) {
  Block of code
}
```

### Ví dụ
```objectivec:js
var i = 0;
while(i < 10) {
    console.log(i);
    i++;
}
```

### Kết quả

```css:js
0
1
2
...
9
```

## Do ... While
<hr>
**do-while** về cơ  bản khá giống với **while**, chúng chỉ khác nhau duy nhất. Đối với **Do While** dù điều kiện lặp như thế nào thì đoạn code vẫn được chạy ít nhất 1 lần còn nếu điều kiện thỏa mãn thì sẽ tương tự như  **While** : tạo ra thêm vòng lặp

### Cú pháp

```javascript:js
do {
    Block of code
 }
while (condition);
```

### Ví dụ
```css:js
var i = 10;
do {
    console.log(i);
    i++;
}
while ( i > 10 && i < 12)
```

### Kết quả
```shell
10
11
```

## forEach()
<hr>

Hàm này thì có vẻ đã không quá còn basic như những hàm phía trên nữa. **forEach** sẽ lặp lại từng phần tử trong mảng theo thứ tự index và thực thi **function** được truyền vào. Lưu ý rằng **forEach** sẽ không thực thi **function** đầu vào cho các phần tử không có giá trị

### Cú pháp
```javascript:js
arrayName.forEach(function(currentValue, index, array){
    function body
})
```

Hàm được truyền vào **forEach** sẽ nhận tối đa 3 đối số đầu vào: 
* currentValue:  Giá trị đang được vòng lặp xử lý
* index: Chí số của giá trị (**currentValue**) trong mảng 
* array: toàn bộ array đang gọi đến **forEach**

### Ví dụ

```javascript:js
var arr=[10, 20, "hi", ,{}];

arr.forEach(function(item, index){
    console.log(' arr['+index+'] is '+ item);
});
```

### Kết quả
```shell:JS
arr[0] is 10
arr[1] is 20
arr[2] is hi
arr[4] is [object Object]
```

Lưu ý rằng bạn không nhất thiết phải truyền toàn bộ 3 đối số vào, chỉ truyền vào những đối số cần thiết.

Nhìn qua thì thấy **forEach** khá là đem lại nhiều điều đơn giản cho lập trình viên, không cần quan tâm đến khởi tạo biến đếm, điều kiện dừng .... Tuy nhiên trong đó cũng tiềm tàng khá nhiều điều hay ho mà mình sẽ trình bày trong phần tiếp theo của series

## Map
<hr>
Tiếp tục là một hàm sẽ giúp bạn loop các phần tử của một Array. Tuy nhiên **map** sẽ tạo ra một mảng mới chứ không phải thực thi với mảng gọi đến nó như **forEach**.

### Cú pháp

```javascript:js
var newArray= oldArray.map(function (currentValue, index, array){
    //Return element for the newArray
});
```

Tương tự như **forEach**, **map** cũng lấy 3 tham số đầu vào 

* currentValue:  Giá trị đang được vòng lặp xử lý
* index: Chí số của giá trị (**currentValue**) trong mảng 
* array: toàn bộ array đang gọi đến **forEach**

### Ví dụ

```javascript:js
var num = [1, 5, 10, 15];
var doubles = num.map(function(x) {
   return x * 2;
});
```

### Kết quả
```rust:js
(4) [2, 10, 20, 30]
```

Có thể thấy thì hàm này thường để dùng khi muốn thay đối giá trị toàn bộ mảng tạo ra một thực thể mới chứ không đơn thuần dùng để truy xuất.

## For...in
<hr>

Vòng lặp này có đôi chút khác biệt với các hàm phía trên, **For ... in** mục đích chủ yếu được dùng để loop trong một **object** chứ không phải **array** . Số lượng vòng lặp sẽ tương ứng với số lượng thuộc tính của **object**

Mỗi **array** cũng là một object đặc biệt, do đó ta vẫn có thể sử đụng **for...in** cho **array**, tuy nhiên key sẽ tương ứng với giá trị **index** của từng phần tử

### Cú pháp

```js
for (variableName in object) {
    Block of code
}
 ```

 ### Ví dụ
 ```js
var obj = {a: 1, b: 2, c: 3};    
for (var prop in obj) {
    console.log('obj.'+prop+'='+obj[prop]);
};
 ```

 ### Kết quả
 ```js
 obj.a=1
obj.b=2
obj.c=3
 ```

 **for...in** không được khuyến khích sử dụng với những mảng  mà thứ tự index của nó quan trọng. 

 Thêm một ví dụ:

 ```js
var arr = [];
arr[2] = 2;
arr[3] = 3;
arr[0] = 0;
arr[1] = 1;
 ```
 Với ví  dụ trên được loop bởi **forEach** thì kết quả sẽ theo thứ tự là 0, 1, 2, 3 còn với **for...in** thì sẽ không đảm bảo như vậy.

 Thêm một điều nữa, với **for...in**, nó sẽ duyệt qua cả những thuộc tính kế thừa của object . Do đó nếu muốn chỉ duyệt qua thuộc tính riêng của object thì cú pháp cần thay đổi một chút

 ```js
 for(var prop in obj){
    if(obj.hasOwnProperty(prop)){
        Code block here
    }
}
 ```

## for...of
<hr>
Vòng lắp được ra mắt trong phiên bản ES6. Hàm này có thể sử dụng để duyệt phần lớn các đối tượng từ Array, String, Map, WeakMap, Set ,...

### Cú pháp

```c:js
for (variable of iterable) {
  Block of code
}
```

### Ví dụ

```css:js
var str= 'paul';
for (var value of str) {
console.log(value);
}
```

### Kết quả
```cpp:js
"p"
"a"
"u"
"l"
```

### Một ví dụ khác
```js
let itobj = new Map([['x', 0], ['y', 1], ['z', 2]]);

for (let kv of itobj) {
  console.log(kv);
}
// ['x', 0]
// ['y', 1]
// ['z', 2]

for (let [key, value] of itobj) {
  console.log(value);
}

//0
//1
//2
 ```

 Bài viết được tham khảo trực tiếp và có chính sửa tại bài viết [All type of loops in JavaScript, a brief explanation](http://voidcanvas.com/all-type-of-loops-in-javascript-a-brief-explanation/)