Lệnh grep được sử dụng để tìm kiếm văn bản. Nó tìm kiếm tệp nhất định cho các dòng có chứa kết quả khớp với các chuỗi hoặc từ đã cho. Đây là một trong những lệnh hữu ích nhất trên Linux và hệ thống giống Unix.
### Tìm chuỗi trong file
Tìm kiếm bất kỳ dòng nào có chứa từ trong tên tệp, đây là lệnh cơ bản nhất hay sử dụng: `grep "chuỗi" filename`
![](https://images.viblo.asia/dc243c69-932d-4641-854a-3e1163bb6e45.png)
### Tìm kiếm không phân biệt chữ hoa chữ thường
Dùng thêm ký tự -i trước chuỗi cần tìm:
```
grep -i "chuỗi" filename
```
![](https://images.viblo.asia/a09cc31e-f05e-4a3a-a453-ca2e15336f8c.png)
### Tìm kiếm tất cả các tệp trong thư mục hiện tại và trong tất cả các thư mục con
Dùng thêm ký tự -r trước chuỗi cần tìm:
```
grep -r "chuỗi" filename
```
![](https://images.viblo.asia/d2e210a0-12e4-430c-bd6c-42a99663f56c.png)
### Tìm kiếm và hiển thị tổng số lần chuỗi cần tìm xuất hiện trong file
Dùng thêm ký tự -c trước chuỗi cần tìm:
```
grep -c "chuỗi" filename
```
![](https://images.viblo.asia/ef6bde39-ab02-4337-a9dd-76fbb52f23f0.png)
### Hiển thị số dòng trước chuỗi được tìm kiếm
Dùng ký tự -B và số dòng cần hiển thị:
```
grep -B2 "chuỗi" filename
```
![](https://images.viblo.asia/0091434e-eaff-4571-9bf8-a46d1374c6c4.png)
### Hiển thị số dòng sau chuỗi được tìm kiếm
Dùng ký tự -A và số dòng cần hiển thị:
```
grep -A2 "chuỗi" filename
```
![](https://images.viblo.asia/fde557ea-f980-4c92-97ba-75fd0aaeef08.png)
### Kết hợp nhiều option
Có thế kết hợp nhiều option trong môt lần tìm để có kết quả mong muốn:
```
grep -B2 -A2 "chuỗi" filename
grep -B2 -A2 "chuỗi" filename | grep "chuỗi2"
```
### Kết hơp grep và ps ux
KIểm tra một chương trình nào đó có đang chạy hay không
```
ps ux | grep ten chương trinh
```
![](https://images.viblo.asia/d4a19eeb-68f8-4236-8917-3d6976d36579.png)
Trên đây là những lệnh cơ bản về grep trong linux, nó sẽ rất hữu ích trong ứng dụng phát triển (Điều tra nguyên nhân lỗi server, hành vi của người dùng, ...)
Happy coding