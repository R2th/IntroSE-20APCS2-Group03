![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)

# Mở đầu
**Linux** đang ngày càng phổ biến trên toàn thế giới, nó len lỏi vào hầu hết các hệ thống máy tính cũng như các thiết bị công nghệ thông dụng ngày nay. Điều đặc trưng đầu tiên khi người ta nhắc đến **Linux** là cách mà người ta sử dụng nó. Khác với hệ thống máy tính chạy hệ điều hành **Windows** chủ yếu dùng giao diện đồ họa, hay **macOS** dùng kết hợp cả đồ họa và dòng lệnh thì với **Linux**, phần lớn thời gian người ta làm việc sẽ là trên hệ thống dòng lệnh. 

Mọi công việc cần xử lý trên **Linux** đều có thể thông qua hệ thống dòng lệnh để hoàn thành, từ khó đến dễ, từ đơn giản đến phức tạp. Qua thời gian, để tránh việc phải gõ đi gõ lại các câu lệnh dài dòng và khó nhớ, con người bắt đầu chuyển qua sử dụng các file `Shell Script` để đẩy nhanh tốc độ công việc. Thường thì các file này sẽ có kích cỡ từ vài dòng đến vài trăm dòng. Tuy nhiên với những công việc đơn giản không nhất thiết phải viết  vào file để thực thi. Và ngày nay người ta thường sẽ viết sẵn những cú pháp ngắn và kết hợp với alias để tạo thành một câu lệnh đơn giản hiệu quả. Những cú pháp này thường gọi là **One-Liner**.

Sau đây mình sẽ giới thiệu 1 số cú pháp sưu tầm và biên soạn để giúp cho công việc trên hệ thống dòng lệnh của người dùng **Linux** trở nên đơn giản hơn.

# Các lệnh hữu ích
### Lọc các tiến trình sử dụng nhiều bộ nhớ
Command: `ps aux | awk '{if ($5 != 0 ) print $2,$4,$6,$11}' | sort -k2nr | head -n10`

![](https://images.viblo.asia/c401e340-b21f-4222-aa2e-5eacf2941cb2.png)

* `ps aux` sẽ lấy ra tất cả tiến trình được tạo bởi người dùng hiện tại
* `awk` sẽ in ra các giá trị tương ứng ở cột PID($2, id của tiến trình), %MEM($4, tỉ lệ bộ nhớ thực tế sử dụng), RSS($6, số byte bố nhớ thực tế sử dụng) và COMMAND($11, câu lệnh thực thi chính của tiến trình)
* `sort` sẽ sắp xếp lại các dòng dữ liệu, -k2 tức là sắp xếp theo cột thứ 2 %MEM, -n là sắp xếp số học, -r là đảo ngược để lấy kết quả giảm dần
* `head -n10` để lấy 10 dòng đầu tiên, cũng là 10 tiến trình tiêu thụ nhiều bộ nhớ nhất.

### Cú pháp lấy ra những câu lệnh thường xuyên được sử dụng nhất (với Bash Shell)
Command: `cat ~/.bash_history | tr "\|\;" "\n" | sed -e "s/^ //g" | cut -d " " -f 1 | sort | uniq -c | sort -nr | head -n 15`

![](https://images.viblo.asia/32faedc1-1721-46f8-a63d-a4269c09bbcd.png)

* Các câu lệnh đã gõ sẽ được lưu trữ trong file `~/.bash_history`
* `uniq` -c để đếm số lượng lệnh trùng lặp
* `cut` để giới hạn các cột sẽ hiển thị
* `sort` để sắp xếp các câu lệnh theo số lần sử dụng

### Cú pháp dùng để xóa các dòng trống trong file
Command: `sed -i '/^$/d'`

![](https://images.viblo.asia/165544bf-a21d-407b-a3b7-6bb0ceef0014.png)

Trước khi xóa file có rất nhiều dòng trống

![](https://images.viblo.asia/915338bf-d18b-4a4d-8f04-1a2b2b442bad.png)

Và sau khi xóa thì không còn dòng trống nào nữa

### Đổi tên toàn bộ file trong thư mục để chuyển các space thành underscore
Thông thường khi thao tác với file mà tên có khoảng trắng thì sẽ bất tiện cho người dùng, cần chèn thêm dấu backsplash `\` để sử dụng.
Command: `for i in *; do mv "$i" ${i// /_};done`

![](https://images.viblo.asia/53a40ea3-8820-40a1-adb3-040480d7f043.png)

Trước khi đổi tên, rất bất tiện khi thao tác

![](https://images.viblo.asia/b65fdc36-bd61-41df-8367-16b163c559e1.png)

Sau khi đổi tên đã thao tác dễ dàng hơn

### Cú pháp tắt nhanh một web server đang hoạt động
Command: `pgrep -f tcp://[IP]:[PORT] | xargs kill -9` 

![](https://images.viblo.asia/8f28e6b7-4565-401f-91a5-6868df0dbcfd.png)

Server đang chạy

![](https://images.viblo.asia/8f28e6b7-4565-401f-91a5-6868df0dbcfd.png)

Kết hợp xargs và kill để đóng server

### Lấy tên của dự án dựa vào github repository
Command: `git remote get-url framgia | grep -o "\/[a-zA-Z0-9_\-]\+\.git" | sed -E "s/^\/|\.git$//g"`
* Lệnh `git remote get-url` để lấy ra url của repository
* `grep -o` sẽ lấy ra đoạn text bắt đầu với splash `/` và kết thúc bởi `.git`
* `sed` sẽ xóa ký tự `/` và `.git` đi.

![](https://images.viblo.asia/b9df9c0f-9ff7-4cb1-86c5-496d989f4694.png)

Ở đây mình có 2 remote repository, mình sẽ lấy ra tên của dự án dựa vào repository `framgia`

![](https://images.viblo.asia/b633fdb9-ae3b-4395-a366-6da3c853a4b4.png)

Kết quả như sau.

### Dùng git xóa tất cả các file với tên cho trước ở cây thư mục hiện tại khỏi cached
Command: `find . -name [file_name] -exec git rm --ignore-unmatch --cached {} +`

Giả sử mình có các file với tên `.keep` dùng khi muốn push các thư mục rỗng lên `github`

![](https://images.viblo.asia/e1e3fda3-352c-499b-b773-a930ea4873aa.png)

Sau khi xử lý với lệnh trên, tất cả các file .keep sẽ được chuyển vào trạng thái **untracked**

![](https://images.viblo.asia/797d8487-5e29-4061-8688-bb5e6b00b245.png)

# Kết luận
Trên đây là một số lệnh **One-liner** mình sưu tầm và biên soạn được dùng để nâng cao hiệu suất làm việc trên dòng lệnh **Linux**. Cảm ơn mọi người đã đọc.

# Tài liệu tham khảo
* https://itnext.io/increase-developer-productivity-with-unix-bash-command-one-liners-2973bccd7600
* https://onceupon.github.io/Bash-Oneliner/
* http://www.bashoneliners.com/oneliners/popular/