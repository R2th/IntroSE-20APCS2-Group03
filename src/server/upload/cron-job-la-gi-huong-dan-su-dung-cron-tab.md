# 1. Cron job là gì?
Cron là chương trình để xử lý các tác vụ lặp đi lặp lại ở lần sau. Cron Job đưa ra một lệnh để lên lịch “làm việc” cho một hành động cụ thể, tại một thời điểm cụ thể mà cần lặp đi lặp lại.

Vậy nó giúp ích được gì cho chúng ta ? Giả sử ứng dụng của bạn có chức năng lưu tạm file, vậy mỗi lần người dùng lưu tạm miết vậy và không dùng, đến một lúc nào đó nó sẽ đầy và tốn dùng lượng. Lúc này bạn cần một công việc tự động là 3 ngày nó sẽ dọn các file tạm đó đi.  Do đó, đối với các công việc định kì, lặp đi lặp lại thì cron là giải pháp hoàn hảo.

Cron là một [daemon](http://www.linfo.org/daemon.html), nghĩa là nó hoạt động dưới nền để thực thi những tác vụ không cần tương tác. Trong Windows, bạn đã quen với tiến trình chạy nền gọi là **Services**.

File cron là file text đơn giản chứa các lệnh được chạy trong thời gian cụ thể. File crontab mặc định trong hệ thống là **/etc/crontab** và nằm trong thư mục crontab **/etc/cron.*/**. Chỉ quản trị viên hệ thống mới có thể chỉnh sửa file crontab trên hệ thống.

# 2. Những điều cơ bản về Cron job
Bạn có thể tạo và chỉnh sửa cron jobs bằng các phương pháp khác nhau. Trong bài hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách làm bằng **Linux Shell Prompt** `(Terminal)`.

Để chính sửa file cron tab, ta gõ lệnh như sau : `crontab -e`
Nếu linux của bạn lần đầu mở crontab, thì nó sẽ bảo bạn chọn editor để làm việc với file này.
![](https://b29.vn/storage/image_contents/H9iLFHCAQZSDgqr5qdmX4DBHpD509npRRNn23bvA.png)
Lúc này, sau khi chọn xong thì một file như bên dưới hiện ra. Như trong hình là chưa có cron job nào cả
![](https://b29.vn/storage/image_contents/0nHuSWOwSqm8uZrqCT6fNpRAQJBHQ2I6Ntiauly5.png)

## 1. Cấu trúc cơ bản 
Cơ bản là một lệnh cron job sẽ có 2 thành phần chính đó chính là: schedule và command. Đây là cách viết lệnh:

```bash
* * * * * /bin/sh clear.sh
```

Trong đó :

 - `* * * * *` : là thời gian, chúng ta sẽ tìm hiểu ý nghĩa của nó ở phần dưới
 - `/bin/sh clear.sh` : là chạy file sh `clear.sh`
 
## 2. Cú pháp
Thì cú pháp của nó sẽ biểu thị như sau : 

| * | * | * | * | * | Command |
| :--------:| :--------:| :--------:| :--------:| :--------:| :--------:|
| phút <br/> **1 - 59**  | giờ  <br/> **0 - 23** | ngày <br/> **1 - 31** |  tháng <br/>  **1 - 12**  | thứ <br/> **0 - 7**    |  Command  <br/> **/script/clean.sh** |  

Tóm tắt :
- **Minute** – phút của giờ mà lệnh sẽ chạy, trong khoảng từ 0 đến 59
- **Hour** – dựa trên giờ mà lệnh sẽ chạy, trong khoảng từ 0 đến 23
- **Day of the month** – dựa trên ngày của tháng mà bạn muốn chạy lệnh, trong khoảng từ 1 đến 31
- **Month** – dựa trên tháng mà lệnh cụ thể chạy, trong khoảng từ 1 đến 12
- **Day of the week** – dựa trên ngày của tuần mà bạn muốn chạy lệnh, trong khoảng từ 0 đến 7

Ngoài ra còn các cú pháp chi tiết hơn như sau :
- **Dấu hoa thị (*)** – để xác định tất cả tham số được lên lịch
- **Dấu phẩy (,)** – để duy trì 2 hoặc nhiều lần thực thi một lệnh
- **Dấu gạch nối (-)** – để xác định khoảng thời gian thiết lập lần thực thi một lệnh
- **Dấu gạch chéo (/)** – để tạo khoảng thời gian nghỉ cụ thể
- **Cuối cùng (L)** – cho mục đích cụ thể là chỉ định ngày cuối cùng của tuần trong tháng. Ví dụ, 3L nghĩa là thứ tư cuối cùng.
- **Ngày trong tuần (W)** – để xác định ngày trong tuần gần nhất. Ví dụ, 1W nghĩa là nếu ngày 1 là thứ 7, lệnh sẽ chạy vào thứ hai (ngày 3)
- **Hash (#) **– để xác định ngày của tuần, theo sau bởi số chạy từ 1 đến 5. Ví dụ, 1#2 nghĩa là ngày thứ Hai thứ hai.
- **Dấu chấm hỏi (?)** – để để lại khoảng trống

## 3. Ví dụ
```bash
#Chạy vào lúc 3 giờ hàng ngày
0 3 * * *  /script/clean.sh
#Chạy vào lúc 17h ngày chủ nhật hàng tuần
0 17 * * sun /scripts/clean.sh
#Cứ 8 tiếng là chạy
0 */8 * * * /scripts/clean.sh
#Cứ 30 phút chạy một lần
*/30 * * * * /script/clean.sh
# Cứ 5 phút lúc 5AM, bắt đầu lúc 5:10 AM.
10-59/5 5 * * *  /script/clean.sh
# Cứ chạy vào tháng 1,2,5 mỗi năm
* * * 1,2,5 *  /script/clean.sh
# Cứ chạy vào ngày đầu tiên của tháng
0 0 1 * *   /script/clean.sh
```

Ngoài ra, chúng ta còn cách short-hand như sau :
- **Chạy hàng tháng** `@monthly  /script/clean.sh`
- **Chạy hàng tuần** `@weekly  /script/clean.sh`
- **Chạy hàng ngày** `@daily  /script/clean.sh`

1 trang web khá hay là https://crontab.guru. Crontab cho phép bạn nhập vào cấu hình và đưa ra kết quả ở dạng giải thích: “At every minute“, “At 00:00“, … khá dễ hiểu.

# Kết
Qua bài viết này, mong rằng các bạn hiểu hơn về cách cấu hình crontab. Cảm ơn các bạn đã theo dõi bài viết, mong các bạn ủng hộ mình trong những bài viết khác.

Tham khảo : [https://b29.vn/bai-viet/cron-job-la-gi-huong-dan-su-dung-cron-tab?id=40](https://b29.vn/bai-viet/cron-job-la-gi-huong-dan-su-dung-cron-tab?id=40)