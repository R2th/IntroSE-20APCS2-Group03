AWK là một ngôn ngữ lập trình thông dịch. Nó rất mạnh mẽ và được thiết kế đặc biệt để xử lý văn bản. Nó được đặt tên bằng cách viết tắt các chữ cái đầu tiên của các tác giả: Aho, Weinberger và Kernighan.
Sử dụng điển hình của AWK:
- Xử lý văn bản
- Tạo báo cáo văn bản được định dạng
- Thực hiện các phép toán số học
- Tìm kiếm text trong file
# Cài đặt AWK
AWK có sẵn theo mặc định trên hầu hết các bản phân phối GNU / Linux. Bạn có thể sử dụng lệnh which awk để kiểm tra xem awk có trên hệ thống của bạn hay không. Trong trường hợp không có AWK, hãy cài đặt như sau:
```
sudo apt-get update
sudo apt-get install gawk
```
# Workflow
AWK tuân theo một quy trình làm việc Read, Execute, Repeat. Sơ đồ sau mô tả workflow làm việc của AWK
![](https://images.viblo.asia/88b42407-5330-4406-9aa6-e1dca7937fb2.jpg)
1. Read
AWK đọc mội dòng từ input (file, pipe, or stdin) and lưu trữ trong bộ nhới.
2. Excute
Tất cả các lệnh AWK được áp dụng tuần tự từ đầu đến cuối. Theo mặc định, AWK thực hiện các lệnh trên mọi dòng.
3. Repeat
Quá trình này lặp lại cho đến khi file kết thúc
- AWK xem 1 file text giống như bảng dữ liệu, bao gồm các bản ghi và các trường, Khoảng cách giữa các đoạn text là một cột, Awk chỉ làm việc với các file text.
# AWK Command Line
```
awk [options] file 
```
1. Hiển thị mặc đinh
```
awk '{print;}' log/development.log | grep GET
```
![](https://images.viblo.asia/585b5e36-9ad3-4af4-8743-68cd4fcc2158.png)
2. Hiển thị các dữ liệu mong muốn
- AWK coi các space là column, AWK còn có thể sử dụng cùng với grep, $number là column muốn lấy.
```
grep "POST" log/development.log | awk '{print $2, $3, $5, $6, $7 $8}'
```
![](https://images.viblo.asia/ca38ae9c-251d-4b91-94ed-21e12b018bf1.png)
3. Toán tử điều kiện
```
grep "POST" log/development.log | awk '$7 ~ /2019-09-14/'
```
![](https://images.viblo.asia/9728e62b-f003-45ad-84b9-8975579446ac.png)

Tôi mới giới thiệu cơ bản về AWK, hy vọng có thể giới thiệu cho mọi người biết thêm về một công cụ để giúp bạn gia tăng tốc độ làm việc và trở nên hiệu quả hơn trên môi trường linux.. AwK là một ngôn ngữ thông dịch để tìm hiểu về AWK mọi người có thể tìm hiểu thêm ở đây https://www.tutorialspoint.com/awk/index.htm, Tutorial này sẽ hướng dẫn rất chi tiết về AWK.
Happy coding!