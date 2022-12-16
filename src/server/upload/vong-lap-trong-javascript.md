![image.png](https://images.viblo.asia/8e8e8975-9e43-49a1-b705-43a27da4240a.png)

Nhắc đến vòng lặp thì hầu hết các ngôn ngữ lập trình nào cũng có và JavaScript thì cũng không phải là ngoại lệ. Vòng lặp đóng vai trò quan trọng trong hầu hết các ngôn ngữ lập trình, nó giúp giải quyết được các bài toán trong thực tế, đồng thời cũng giúp rút gọn code hơn. Giới thiệu sơ về công dụng của vòng lặp như thế là đủ rồi, chúng ta bắt tay vào tìm hiểu các vòng lặp trong JavaScript thôi nào 😉.

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/vong-lap-trong-javascript/

## I. Vòng lặp for

### 1. Vòng lặp for cơ bản

Cú pháp cơ bản của vòng lặp `for` như sau:

```
for ([initialization]; [condition]; [final-expression]) {
   // code ở đây
}
```

Giải thích:

**initialization** (Khởi tạo): Được thực thi trước khi vòng lặp `for` bắt đầu, biểu thức này dùng để khởi tạo bộ đếm của vòng lặp. Khi kết thúc vòng lặp nó sẽ được giải phóng.

**condition** (Điều kiện): Ở đây ta có thể đặt điều kiện cho vòng lặp, mỗi lần thực thi vòng lặp `for` thì nó sẽ check điều kiện này, nếu điều kiện trả về `true` thì sẽ thực hiện block code trong vòng lặp `for` và nếu trả về `false` thì sẽ dừng vòng lặp `for`.

**final-expression**: Biểu thức này được thực thi sau mỗi lần lặp, dùng để tăng hoặc giảm bộ đếm của vòng lặp.

Cùng đi vào ví dụ cho dễ hiểu nè 😊.

```
var arr = [ 1, 2, 3 ];
for (var i = 0; i <= arr.length; i++) {
    console.log(arr[i]);
}
//--> output: 1 2 3 undefined
```

**Một số lỗi thường mắc phải:** Một số bạn mới học sẽ không tránh khỏi việc gặp một vài lỗi nhỏ khi sử dụng vòng lặp `for`, như ví dụ trên.

Trường hợp gặp lỗi ở ví dụ trên là do ta duyệt mảng theo giá trị `index` của mảng, nhưng duyệt vượt qua giá trị `index` trong mảng nên dẫn đến kết quả in ra cuối cùng bị `undefined`.

```
\\Value arr: 1, 2, 3
\\Index arr: 0, 1, 2
```

Để fix lỗi trên ta chỉ cần đặt lại điều kiện cho vòng lặp for thành `i < arr.length` hoặc `i <= arr.length - 1`

```
var arr = [ 1, 2, 3 ];
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
//--> output: 1 2 3
```

### 2. Vòng lặp for...in

Ngoài vòng lặp `for` cơ bản trên, ta còn có vòng lặp `for...in`. Nó được dùng để duyệt các phần tử của một `object` bất kỳ thông qua các `key` của `object` đó.

**Lưu ý:** `object` phải là `object` đếm được và nó không dùng cho việc duyệt mảng.

```
let user = { fname: 'Alice', lname: 'Zuberg', age: 18 };
let merge_Text = '';
for (let x in user) {
  merge_Text += user[x] + ' '
}
console.log(merge_Text);
//--> output: Alice Zuberg 18
```

### 3. Vòng lặp for...of

Vòng lặp `for...of` dùng để duyệt qua các **value** của **interable object** (đối tượng có thể lặp lại) như Array, String, Map, Set, Arguments object...

Ví dụ với array nhé 😉

```
let peoples = ['Kirito', 'Asuna', 'Alice'];
let listed = '';
for (let value of peoples) {
  listed += value + ', '
}
console.log(listed);
//--> output: Kirito, Asuna, Alice,
```

## II. Vòng lặp while

Ngoài `for` thì ta còn có thể sử dụng vòng lặp `while` nữa nè. Với `while`, nó sẽ kiểm tra điều kiện trước rồi mới thực thi các dòng code bên trong nó nếu điều kiện trả về `true` và tất nhiên sẽ dừng vòng lặp nếu điều kiện trả về `false` hoặc gặp lệnh `break`.

Cú pháp của while khá dơn giản nè.

```
while(condition) {
	//code ở đây
}
```

Ví dụ:

```
var i = 1;
while (i < 10) 
{
	console.log(i);
    i++; //Tăng bộ đếm của vòng lặp lên 1
}
//--> output: 1 2 3 4 5 6 7 8 9
```

**Lưu ý:** không giống như `for` việc tăng bộ đếm nằm trên cùng một hàng và bắt buộc phải có thì mới chạy, `while` bạn phải tăng hoặc giảm bộ đếm của vòng lặp tùy theo mục đích của bạn ở bên trong nó và `while` vẫn sẽ chạy ngay cả khi ta không tăng bộ đếm của vòng lặp, tuy nhiên nó sẽ **lặp vô hạn** đấy nhé, "be careful" 😁.

## III. Vòng lặp do...while

Một câu lệnh khác dùng để thực hiện các vòng lặp đó là `do...while`. Khác với `for` và `while`, `do...while` thực thi code bên trong khối lệnh trước rồi mới check điều kiện ở cuối mỗi lần lặp.

Cú pháp của nó cũng đơn giản thôi nè.

```
do {
	//code ở đây
} while(condition);
```

Ví dụ:

```
let a = 1;
let sum = 0;
do {
  sum += a;
  a++; // Tăng bộ đếm
} while (a <= 10);
console.log(sum);
//--> output: 55
```

Lưu ý: Tương tự như `while` , bạn cũng phải tăng hoặc giảm bộ đếm theo mục đích của bạn để vòng lặp được thực thi. Nếu bạn không tăng hoặc quên thì nó sẽ **lặp vô hạn** đó nha 😉.

## IV. Tìm hiểu về continue và break

Hai câu lệnh này thường được sử dụng bên trong vòng lặp hoặc các câu lệnh điều khiển.

* **continue**: Khi gặp lệnh này trong vòng lặp, nó sẽ dừng thực thi các câu lệnh còn lại của vòng lặp và bắt đầu một vòng lặp mới.
* **break**: Trong vòng lặp, khi gặp lệnh này, vòng lặp sẽ kết thúc mặc cho điều kiện có đúng đi chăng nữa.

Ví dụ với **break**

```
var i = 1;
while(i < 10){
	if(i == 6){break;}
	console.log(i);
    i++;
}
//--> output: 1 2 3 4 5
```

Ví dụ với **continue**

```
var i = 1;
while(i < 10){
	if( i == 2 || i == 4 || i == 6 || i == 8){
		i++;
		continue;
	}
	console.log(i);
	i++;
}
//--> output: 1 3 5 7 9
```

## V. Tổng kết

Trên đây là toàn bộ những kiến thức căn bản về vòng lặp trong JavaScript cần phải nắm vững khi làm việc với nó. Hy vọng bài viết này sẽ giúp ích cho các bạn và nhớ thực hành nhiều mới giúp bạn nhớ và nắm chắc kiến thức nhé 😉.

Cảm ơn các bạn đã đọc 🤗.