![](https://images.viblo.asia/c8b5b3f6-ea9b-46ea-b2a2-50811c2ff3e7.jpeg)
# 1. man

Câu lệnh Linux đầu tiên nên học là `man` (viết tắt của "manual") . Câu lệnh này giúp bạn biết được chức năng của tất cả các câu lệnh  Linux commands. Ví dụ bạn muốn biết về câu lệnh `ls` chỉ cần gõ theo cú pháp :
```js
man ls
```
Đây là kết quả bạn nhận được 
![](https://images.viblo.asia/3b9b3535-299c-48bd-857d-e85ddbb7b6b7.png)

# 2. grep
```js
grep "some string" file
```
Câu lệnh `grep` (viết tắt của "global regular expression print") dùng để tìm kiếm 1 string trong file, kết quả trả về là những dòng chứa string tương ứng. Ví dụ: 
![](https://images.viblo.asia/ddbcafe6-a633-406b-b097-241e3e83d568.png)

Ngoài ra ta còn có thể đếm số dòng chứa kí tự đang tìm kiếm với tùy chọn `-c` (count)
![](https://images.viblo.asia/2f431471-f15a-43d4-9d9f-4e1d22b036e9.png)
Bên cạnh đó grep còn cung cấp rất nhiều tùy chọn khác nhau. Đọc thêm tại [đây](http://man7.org/linux/man-pages/man1/grep.1.html)
![](https://images.viblo.asia/47edf0bd-8402-486a-b52c-6c02773161c8.jpeg)
# 3. ls
```js
ls
```
`ls` (viết tắt của "list directory contents") liệt kê danh sách các file và thư mục của đường dẫn hiện tại. 
![](https://images.viblo.asia/e7f54051-a254-4b20-809a-331aac9764e1.png)
Các thư mục được in đậm hơn các file.
Ngoài ra còn có các tùy chọn :

`ls -l`: Hiển thị chi tiết các files và folders của đường dẫn hiện tại:
![](https://images.viblo.asia/25a1be99-0d88-4b00-8480-b0b001a5ed0d.png)
`ls -a`: Hiển thị tất cả các files và folders, bao gồm cả các file ẩn:
![](https://images.viblo.asia/aaaba119-006e-4af0-9d35-99a8f854d39a.png)
# 4. pwd
Câu lệnh `pwd` (print working directory) đơn giản in ra đường dẫn đến thư mục làm việc hiện tại
![](https://images.viblo.asia/59176ac6-e532-4f32-a4a2-abfca3e0cedf.png)
# 5. cat
Câu lệnh `cat` ( viết tắt của "concatenate") hiển thị nội dung của file trên terminal. Điều này nhanh hơn nhiều nếu bạn muốn đọc file so với mở bằng editor. 
![](https://images.viblo.asia/29cfdc86-e7c4-49a0-85a6-a9a8266795a9.png)

# 6. touch
```js
touch somefile
```
Câu lệnh `touch` dùng  để tạo mới file trống không có nội dung. 
![](https://images.viblo.asia/e8b78418-d29a-4fde-b654-b4b0bb0c4140.png)
Trong ví dụ trên ta tạo mới 1 file index.js. Tuy nhiên vì file rỗng nên câu lệnh `cat` không trả về kết quả gì cả.
# 7. rm
```js
rm someFile
```

Đã có câu lệnh tạo mới ắt phải có câu lệnh xóa rồi. Câu lệnh `rm` giúp ta xóa 1 file chỉ định.
![](https://images.viblo.asia/1f2e6010-b76c-4600-aad2-89eb7b0dc697.png)

Ngoài ra để xóa 1 thư mục ta chỉ cần thêm flag `-rf` 
```js
rm -rf some-directory
```
# 8. find
```js
find path -name filename
```
Câu lệnh `find` giúp ta tìm kiếm nhanh 1 file hoặc 1 thư mục, nó đăc biệt hữu dụng  khi làm việc trong 1 project lớn với hàng trăm files và folders khhác nhau
![](https://images.viblo.asia/ef66cbe7-1a9f-48fc-8ff3-d24695d6d506.png)
Ngoài ra câu lệnh `find` còn giúp ta tìm kiếm những loại file nhất định trong thư mục. Ví dụ nếu ta muốn tìm tất cả các `.js` file. 

```js
find . -name "*.js"
```

![](https://images.viblo.asia/d5ec10e0-3af2-4fbf-80a7-a8125ffaf2c9.png)

# 9. mv
```js
mv somefile /to/some/other/path
```
`mv` (move) là câu lệnh cho phép ta chuyển file từ thư mục này đến thư mục khác. Nó có thể chuyển 1 file, nhiều file hoặc thậm chí cả thư mục.
![](https://images.viblo.asia/faab8a79-aa7c-404c-ab36-abe081c274d1.png)
# 10. echo
```js
echo "some text"
```
Câu lệnh `echo` cho phép ta hiển thị 1 chuỗi lên terminal
![](https://images.viblo.asia/522ab333-89aa-4c07-bb86-80e1fe1946f9.png)
Ngoài ra thì `echo` còn được dùng để hiển thị các biến môi trường như `$USER, $HOME, $PATH`:
![](https://images.viblo.asia/033d4284-030b-463b-9dc2-6e7ba02b9835.png)

# Kết luận
Hy vọng bài viết trên giúp bạn thuận tiện hơn trong việc thao tác với terminal khi lập trình. Hẹn gặp lại mọi người trong những bài viết sau!
# Sources
https://devopscube.com/list-of-linux-commands-every-developer-should-know/
https://medium.com/better-programming/here-are-11-console-commands-every-developer-should-know-54e348ef22fa