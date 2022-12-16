### 1. Vòng lặp while.
#### 1.1 Khái niệm
* Vòng lặp while được dùng để thực hiện một lệnh hay một khối lệnh với số lần lặp chưa xác định trước.
* Với vòng lặp while thì điều kiện lặp được kiểm tra trước khi thực hiện thân của vòng lặp.
#### 1.2 Cú pháp
```
while (điều_kiện_lặp) {
    // Các lệnh
}
```
* điều_kiện_lặp: là điều kiện để xác định điều kiện lặp. Có giá trị là true hoặc false.
* Các lệnh nằm trong cặp dấu {} là thân của vòng lặp.
* Lưu ý:
    * Vòng lặp while kiểm tra điều kiện trước rồi mới thực hiện các câu lệnh trong thân vòng lặp nên nếu ngay từ đầu `điều_kiện_lặp` đã có giá trị false thì vòng lặp while sẽ không được thực hiện bất cứ lần nào.
    * Nếu `điều_kiện_lặp` có giá trị là true và không thay đổi thì vòng lặp while sẽ trở thành vòng lặp vô hạn.
    * Để dừng vòng lặp while thì bên trong while cần có lệnh làm thay đổi giá trị của `điều_kiện_lặp` thành false hoặc sử dụng lệnh break.

![Screen Shot 2022-08-12 at 14.24.29.png](https://images.viblo.asia/9a1c5af5-5f5d-47b9-8076-484ec9fe94ac.png)

### 2. Vòng lặp do - while
#### 2.1 Khái niệm
* Cũng giống với vòng lặp do - while được dùng để thực hiện một lệnh hay một khối lệnh với số lần lặp chưa xác định trước.
* Nhưng khác với while, do - while chỉ kiểm tra điều kiện lặp sau khi thân vòng lặp đã được thực hiện một lần.

#### 2.2 Cú pháp
```
do {
	// Các lệnh
} while (điều_kiện_lặp);
```
* điều_kiện_lặp: là điều kiện để xác định điều kiện lặp. Có giá trị là true hoặc false.
* Các lệnh nằm trong cặp dấu {} là thân của vòng lặp.
* Lưu ý: khác với while, vòng lặp do - while thực hiện các câu lệnh trong thân vòng lặp trước rồi mới kiểm tra điều kiện nên các câu lệnh nằm trong thân vòng lặp sẽ được thực hiện ít nhất là một lần. Sau đó, tùy theo kết quả của biểu thức điều kiện, chương trình sẽ tiếp tục thực hiện hoặc thoát ra khỏi vòng lặp.
* Ví dụ: như ví dụ dưới đây, mặc dù ngay từ đầu điều kiện đã sai nhưng lệnh in ra màn hình vẫn được thực hiện 1 lần.

![Screen Shot 2022-08-12 at 16.31.00.png](https://images.viblo.asia/d47f27ea-3f05-4336-87ef-48ea8c8ec5dc.png)