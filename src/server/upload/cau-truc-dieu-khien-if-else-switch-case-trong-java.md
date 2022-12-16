### 1. if - else
#### 1.1 Khái niệm
* Trong hầu hết các ngôn ngữ lập trình cấu trúc điều khiển if - else sẽ kiểm tra kết quả của 1 điều kiện và dựa vào kết quả đó để thực hiện các hành động tương ứng.

#### 1.2 Cấu trúc
* Ta có cấu trúc if - else đầy đủ như sau:
```
// Cấu trúc if - else đầy đủ.

if(điều kiện) {
    hành động 1
} else {
    hành động 2
}
```

* Ở đây `điều kiệu` bên trong if là một biểu thức toán học có kết quả là kiểu boolean (true/false)
* Nếu `điều kiện` đúng (true) thì thực hiện `hành động 1`, ngược lại, điều kiện sai (false) thì thực hiện `hành động 2`.

![Screen Shot 2022-08-10 at 16.50.52.png](https://images.viblo.asia/122aa7c0-7d0b-4ecd-a120-a4989a581f62.png)

* Tương tự, ta có cấu trúc if - else if - else:
```
// Cấu trúc if - else if - else.

if (điều kiện 1) {
    hành động 1
} else if (điều kiện 2) {
    hành động 2
} else {
    hành động 3
}
```

* `điều kiệu 1` bên trong if là một biểu thức toán học có kết quả là kiểu boolean (true/false)
* Nếu `điều kiện 1` đúng (true) thì thực hiện `hành động 1`, ngược lại, `điều kiện 1` sai (false) thì thực hiện kiểm tra `điều kiện 2`
* Nếu `điều kiện 2` đúng (true) thì thực hiện `hành động 2`, ngược lại, `điều kiện 2` sai (false) thì thực hiện `hành động 3`.

* Tương tự, chúng ta có thêm 2 cấu trúc khác như sau:
```
// Cấu trúc if khuyết else.

if(điều kiện) {
    hành động 1
}
```

```
// Cấu trúc if - else lồng nhau.

if(điều kiện 1) {
    if (điều kiện 2) {
        hành động 1
     } else {
         hành động 2
      }
} else {
    hành động 3
}
```

### 2. switch - case
#### 2.1 Khái niệm
* Cấu trúc điều khiển `switch - case` sẽ kiểm tra kết quả của 1 điều kiện và dựa vào kết quả đó để thực hiện các hành động tương ứng.

#### 2.2 Cú pháp
```
switch (biểu_thức) {
	case giá_trị_1:
		Lệnh 1;
		break;
	case giá_trị_2:
		Lệnh 2;
		break;
	...
	case giá_trị_n:
		Lệnh n;
		break;
	default:
        Lệnh 0;
}
```

* `biểu_thức` trả về một giá trị, kết quả là một số nguyên, chuỗi hoặc một ký tự.
* Giá_trị_1, giá_trị_2,..., giá_trị_n là các biểu thức hằng, nguyên hoặc ký tự và chúng phải khác nhau.
* Khi mà `biểu thức` trả về một  `giá trị` thì sẽ thực hiện lệnh bên trong `case`  có giá trị tương ứng.
* Khi mà `biểu thức` trả về  `giá trị`mà không có trong các case thì sẽ thực hiện lệnh trong `default`.

![Screen Shot 2022-08-10 at 17.35.30.png](https://images.viblo.asia/5a4c9116-839c-4333-9cc7-c686fb945e82.png)

* Lệnh `break` là để nhảy ra khỏi lệnh `switch`, nếu không có lệnh này cấu trúc `switch` sẽ duyệt cả các trường hợp phía dưới cho đến hết.
* Khi không sử dụng từ khóa `break` trong mệnh đề `switch-case`. Điều này có nghĩa là các khối lệnh sau `case có giá trị` phù hợp sẽ được thực thi.
* Lưu ý là khối `default` là không bắt buộc có ở cấu trúc `switch case` trong Java, tức là bạn có thể viết cũng được mà không viết cũng không bị lỗi.

![Screen Shot 2022-08-10 at 20.32.46.png](https://images.viblo.asia/a3386f8b-529b-402a-9d99-99b4732196d2.png)

### 3. Khi nào dùng if-else, khi nào dùng switch-case ?
* Vậy khi nào thì cần dùng `switch - case` thay vì `if - else`:
    *  Chúng ta có số trường hợp cần xử lý lớn hơn 3 thì khi đó chúng ta nên sử dụng `switch - case` để dễ dàng kiểm tra và xử lý.
    *  Khi trường hợp `biểu_thức` và `giá_trị` phải có giá trị cụ thể (số nguyên, ký tự...).
* Lưu ý: đối với một bài toán sử dụng  `switch - case` thì có thể thay thế bằng `if - else`, nhưng ngược lại một bài toán sử dụng  `if - else` thì chưa chắc có thể thay thế bằng  `switch - case`