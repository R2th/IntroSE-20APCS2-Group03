![](https://images.viblo.asia/322d9a12-0896-46fd-b3ce-d28e052895fb.jpg)


Chào các bạn, trong bài này mình sẽ viết về tool Eyewitness. Eyewiteness có tính năng chính là chụp hình lại giao diện trang web sau đó tạo một report thông qua file .html. Ngoài tính năng chụp giao diện trang web eyewitness còn phát hiện ra trang web đó có sử dụng tài khoản mật khẩu mặc định hay không. Theo như cảm nhận và đánh giá cá nhân của mình thì tool này rất hữu ích. Tool này chỉ có một tính năng chính nên không cần phải giới thiệu nhiều. Bây giờ ta sẽ tìm hiểu cách cài đặt và thực hiện một demo nhỏ.

# Cài đặt eyewitness
Tool hoạt động thông qua dòng lệnh trên cả môi trường Windows và Linux.

**Windows**

Đối với Windows ta tải file **EyeWitness.exe** về và chạy. [Link tải](https://github.com/FortyNorthSecurity/EyeWitness/releases/tag/v20210205.1)

**Sử dụng**

```
EyeWitness.exe --help
EyeWitness.exe --bookmarks
EyeWitness.exe -f C:\Path\to\urls.txt
EyeWitness.exe --file C:\Path\to\urls.txt --delay [timeout in seconds] --compress
```

**Linux**
Nếu bạn sử dụng linux thì bạn thực hiện theo bước sau:
1. Clone source code: `git clone https://github.com/FortyNorthSecurity/EyeWitness.git`
2. Chạy file setup.sh trong thư muc Python

**Sử dụng**

```bash
python3 EyeWitness.py -f filename --timeout optionaltimeout
```

# Thực hiện demo
Việc cài đặt tool EyeWitness rất đơn giản không có gì khó khăn. Sau khi đã cài đặt EyeWitness thành công tiếp đến là phần thực hiện demo. Mình sẽ sử dụng trang web viblo.asia cho phần demo này.

Đầu tiên mình sẽ lấy tất cả tên miền liên quan đến viblo.asia cho vào một file. Có nhiều tool hỗ trợ tìm kiếm tên miền, nhưng mình quen sử dụng assetfinder của tomnomnom. Để lấy tất cả tên miền mình chạy lệnh sau

```bash
echo viblo.asia | assetfinder -subs-only | tee viblo.asia.txt
```

![](https://images.viblo.asia/35e6f03a-e9d3-430b-8a66-3e716c8ee7ad.png)

Trong câu lệnh trên mình sử dụng tùy chọn `-subs-only` là do mình chỉ muốn lấy ra những tên miền có dạng ***.viblo.asia**.

Sau khi đã có danh sách các tên miền việc tiếp theo mình làm đó là lọc ra những domain còn sống. Để làm việc này cũng có nhiều tool, mình dùng tool httprobe của tomnomnom luôn cho tiện.

```bash
cat viblo.asia.txt | httprobe -c 100 | tee viblo.asia.alive.txt
```

![](https://images.viblo.asia/3f50574e-f1b2-405d-8564-4c1473ba8cbf.png)

Trong câu lệnh trên mình sử dụng tùy chọn `-c` để chỉ định số luồng thực thi. Sau khi chạy xong câu lệnh trên mình đã có một file chứa toàn bộ domain có thể truy cập. Tiếp theo là mình sẽ thưc hiện chụp ảnh trang web thông qua tool EyeWitness.

```bash
eyewitness -f viblo.asia.alive.txt --threads 100 --delay 2 --timeout 10
```

![](https://images.viblo.asia/cddeaff2-871e-40ca-886e-be298c836454.png)

Trong câu lệnh trên mình sử dụng 3 tùy chọn:
+ `--threads` chỉ định số luồng
+ `--delay` chỉ định số giây nghỉ giữa các lần chụp màn hình
+ `--timeout` timeout của trang web

Sau khi tool chạy xong nó sẽ hỏi có muốn xem báo cáo không? Nếu chọn **y** là có, còn **n** là không.

![](https://images.viblo.asia/5fcfa3b5-dd9c-4afb-acf2-ad8c2720be1f.png)

Và dưới đây là kết quả của tool.

![](https://images.viblo.asia/c90f505e-a3ba-4a34-8e62-9e0cf69783c3.png)

Báo cáo có hình ảnh của tên miền, thông tin header và địa chỉ IP. Những thông tin này rất hữu ích khi ta phân tích một trang web.

Phần chia sẻ tool của mình kết thúc ở đây. Cảm ơn và hẹn gặp lại!