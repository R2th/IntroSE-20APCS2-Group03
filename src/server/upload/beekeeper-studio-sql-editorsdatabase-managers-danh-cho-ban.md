# 1. Lời mở đầu
Chào mọi người, sau chuỗi ngày dài để Viblo đóng mạng nhện thì cuối cùng mình cũng ngoi lên viết bài rồi 🙄

Hiện nay, có khá nhiều SQL Editors mã nguồn mở và Database Managers được cộng đồng tin tưởng sử dụng như Datapine SQL Editor, Microsoft SQL Server Management Studio Oracle SQL Developer, MySQL Workbench, RazorSQL,... Hầu hết đã quá quen thuộc với chúng ta rồi, nhưng ở bài viết này, mình sẽ giới thiệu với mọi người một công cụ mang tên **Beekeeper Studio**, giờ thì cùng mình tìm hiểu xem nó có những gì nhé :D 

# 2. Beekeeper Studio
![](https://images.viblo.asia/790ae06f-602e-4975-bca8-c0df9533e915.png)

## 2.1 Giới thiệu
Beekeeper Studio là trình soạn thảo SQL đa nền tảng và trình quản lý cơ sở dữ liệu có sẵn cho Linux, Mac và Windows được viết bằng `VueJS`. Beekeeper Studio được xây dựng và duy trì bởi tác giả **Matthew Rathbone**. Có một điều khá thú vị là **Matthew Rathbone** không phải là DBA hay Server Administrator, chỉ đơn giản là anh ấy phải tương tác với CSDL hằng ngày mà lại cảm thấy không có một ứng dụng SQL client đa nền tảng dễ tiếp cận và phù hợp nên anh đã tạo ra Beekeeper Studio (release phiên bản đầu tiên vào năm 2020) với mục đích cá nhân mà thôi =)). Hiện nay, Beekeeper Studio đã đạt được khoảng 9,8k star trên [Github](https://github.com/beekeeper-studio/beekeeper-studio).

![](https://images.viblo.asia/5bcf6722-fce2-4aa4-8eda-8a59d3c24c51.png)

Beekeeper Studio hiện có 2 phiên bản dành cho người sử dụng:
- **Beekeeper Studio Community Edition**: Đây là phiên bản mã nguồn mở của Beekeeper Studio. Nó là một ứng dụng quản lý CSDL đầy đủ các tính năng cơ bản, hoàn toàn miễn phí và là mã nguồn mở. (Mình không có tiền nên chỉ dùng bản này thôi nhé :v) 
- **Beekeeper Studio Ultimate Edition**: Phiên bản thương mại của Beekeeper Studio với các tính năng bổ sung như hình trên và được cung cấp giấy phép thương mại thân thiện với doanh nghiệp. Mua Ultimate Edition là cách tốt nhất để hỗ trợ Beekeeper Studio (bạn có thể sử dụng miễn phí 14 ngày để trải nghiệm trước khi thanh toán).

Beekeeper Studio tương thích với đa số các CSDL nổi tiếng như: 
* SQLite
* MySQL
* MariaDB
* Postgres
* CockroachDB
* SQL Server
* Amazon Redshift
* Oracle (chỉ dành cho gói Ultimate)

![](https://images.viblo.asia/bff734b2-d6bd-472d-9f9f-91ec8802ff34.png)

## 2.2 Tính năng
Beekeeper Studio cung cấp rất nhiều tính năng hữu ích cho chúng ta sử dụng thông qua giao diện trực quan và tương tác đơn giản chỉ bằng vài cú click chuột:

### Connect Through Firewalls
![](https://images.viblo.asia/c54c856f-0c44-4395-abfb-4530fec5705c.png)

Cùng với các kết nối thông thường thì Beekeeper Studio có thể mã hóa kết nối bằng SSL hoặc tunnel qua SSH. Khi lưu mật khẩu kết nối, Beekeeper Studio sẽ mã hóa mật khẩu đó để giữ an toàn cho chúng ta.

### SQL Auto Completion
![](https://images.viblo.asia/ed4a4112-4654-47fa-8ae7-4410dde4cc7d.gif)

Beekeeper Studio Editor cung cấp các đề xuất syntax highlighting và tự động hoàn thành câu truy vấn để chúng ta có thể làm việc nhanh chóng và dễ dàng hơn.
Tổ hợp phím mặc định để bạn kích hoạt thủ công suggestions là `Ctrl+Space`, hoặc `Cmd+Space`.

### Open Lots of Tabs
![](https://images.viblo.asia/1c30f6dc-182a-4ecc-96ec-62e7350ea972.png)

Dễ dàng đa nhiệm bằng cách mở multiple tabs để có thể làm việc nhanh chóng mà không cần phải chuyển cửa sổ. Bảng DDL và chế độ xem dữ liệu cũng có các tab của riêng chúng.

### Run Contexts

![](https://images.viblo.asia/67d14a84-826d-454c-a3c4-28bba464ce78.gif)

Với những câu Big Query SQL hoặc Sub Query gồm nhiều câu truy vấn trong cùng 1 tab editor, bạn có thể chỉ muốn chạy một câu truy vấn nhỏ trong số đó mà thôi. Vơi Beekeeper thì đơn giản, nó cho phép bạn:

* **Run**: Chạy tất cả truy vấn (mặc định) 
* **Run current**: Chỉ chạy truy vấn hiện tại (Beekeeper đánh dấu truy vấn để cho bạn biết truy vấn nào được chạy) 
* **Run Selection**: Chỉ chạy truy vấn được chọn.

### Save SQL Queries For Later
![](https://images.viblo.asia/ad2d0e84-9323-4bbe-b5db-d5d424067204.png)

Dễ dàng lưu và sắp xếp các truy vấn thường xuyên sử dụng để có thể sử dụng lại chúng trên tất cả các kết nối của mình.

### Query Parametes
![](https://images.viblo.asia/5b6e6513-4f26-4cb0-a918-53e466f81919.gif)

Chúng ta có thể tham số hóa các truy vấn và Beekeeper sẽ để bạn nhập các giá trị của tham số khi bạn chạy câu truy vấn đó. Bạn có thể sử dụng hai loại cú pháp: `:variable` hoặc `$1`.

### Edit Table Data
![](https://images.viblo.asia/607e3210-1f8c-4612-98b0-9266ccc598b0.png)

Chỉnh sửa bảng nhanh chóng và đơn giản bằng giao diện trực quan.

### Edit Table Schemas
![](https://images.viblo.asia/58f4b28f-1b0c-484e-aa7a-9e33fa698a5d.png)

Tạo, chỉnh sửa và xóa các cột, index và quan hệ của bảng bằng giao diện trực quan.

### Export Data
![](https://images.viblo.asia/48ed63cd-ed2a-4bdd-8b2c-fc3f83dc3ba1.png)

Xuất dữ liệu sang dạng CSV, JSON, JSONL hoặc SQL chỉ với một vài cú click chuột đơn giản. Tùy chọn áp dụng các bộ lọc để chỉ xuất dữ liệu mà chúng ta cần.

### Keyboard Shortcuts

Beekeeper cung cấp các phím tắt chung giúp quá trình sử dụng thuận tiện hơn:
* New Window `Ctrl + Shift + N`
* New Tab `Ctrl + T`
* Close Tab `Ctrl + W`
* Format Query `Ctrl + Shift + F`
* Run Query `Ctrl + Enter`

### Other features

Ngoài các tính năng nổi bật ở trên mà Beekeeper Studio nhắc tới ở trang chủ, bản Community còn cung cấp rất nhiều các tính năng khác như:
* Connect database từ URL.
* Có thể sắp xếp và lọc dữ liệu của bảng để luôn lấy được dữ liệu chúng ta cần.
* Có thể xem lại lịch sử truy vấn.
* Có Dark theme thân thiện, dễ nhìn (bản Ultimate có Solarized Theme).
* Dễ dàng chuyển đổi giữa các connections.
* ...
# 3. Cài đặt
Giờ thì hãy cùng mình cài đặt và sử dụng Beekeeper, ở đây mình chỉ hướng dẫn cài bản Community vì nó hoàn toàn miễn phí, các bạn hãy truy cập [tại đây](https://docs.beekeeperstudio.io/installation) và lựa chọn cài đặt phù hợp với hệ điều hành của máy bạn nhé. Bạn nào dùng Ubuntu như mình thì có thể mở Terminal lên và chạy các lệnh sau:

```
# Install our GPG key
wget --quiet -O - https://deb.beekeeperstudio.io/beekeeper.key | sudo apt-key add -

# add our repo to your apt lists directory
echo "deb https://deb.beekeeperstudio.io stable main" | sudo tee /etc/apt/sources.list.d/beekeeper-studio-app.list

# Update apt and install
sudo apt update
sudo apt install beekeeper-studio
```

Chỉ với vài bước đơn giản là chúng ta đã có thể cài đặt Beekeeper Studio về máy để sử dụng =))
# 4. Sử dụng

Sau khi đã cài đặt thành công, hãy tìm và mở ứng dụng Beekeeper Studio có trong máy của bạn lên.

![](https://images.viblo.asia/312d1ca4-4d5d-47ad-b3c5-235669334fc1.png)

Với giao diện đơn giản như vậy, bạn đã có thể bắt đầu tạo connection với cơ sở dữ liệu của bạn được rồi đó. Bạn có thể click `Import from URL` và nhập `Host:Port` tương ứng với Database của bạn. Hoặc bạn cũng có thể lựa chọn connect type tương ứng với loại CSDL của bạn, ở đây mình chọn Postgres với Port là 5432. Các thông tin còn lại thì bạn hãy điền tương ứng với config database của bạn nhé (phần config SSL bạn cũng có thể set config ngay tại đây). Lưu ý chút là nếu bạn sử dụng Docker để build database image thì hãy chạy `docker inspect NAME|ID` để lấy chính xác IPAddress điền vào Host nhé :D

![](https://images.viblo.asia/424c92d3-9f9a-4b57-aa18-054d8b3008d2.png)

Sau khi đã điền đầy đủ thông tin, để check xem thông tin mà bạn điền đã matching với thông tin của database hay chưa, bạn hãy click vào **Test**, nếu message báo rằng ***Connection looks good!*** tức là thông tin đã chính xác. Lúc này bạn chỉ cần click vào **Connect** để tiến hành kết nối với Database của bạn.

![image.png](https://images.viblo.asia/1df10a68-7a5c-493b-a49a-f0d5596e9cd0.png)

Giờ thì bạn đã có thể thực hiện các câu truy vấn và quản lý CSDL thông qua Beekeeper Studio rồi đó, với những tính năng mà mình đã giới thiệu phía trên, hãy sử dụng xem Beekeeper Studio có đem lại trải nghiệm tốt hay không nhé =))

# 5. Kết luận
Qua bài viết thì mình cũng đã giới thiệu tới mọi người một công cụ SQL Editors/Database Managers mang tên Beekeeper Studio rồi. Tuy nhiên, đây là công cụ khá mới nên việc đem so sánh với các anh lớn như MySQL Workbench, Oracle SQL Developer, Microsoft SQL Server Management Studio,... có vẻ khá khập khiễng :v Nhưng với việc đáp ứng các tác vụ truy vấn và quản lý CSDL mức cơ bản thì Beekeeper Studio đem lại trải nghiệm khá tốt đối với mình. 

Beekeeper Studio Community hoàn toàn miễn phí và quá trình cài đặt vô cùng đơn giản nên mọi người hãy thử cài và sử dụng nó xem sao nhé :D Ngoài ra, Beekeeper Studio là một ứng dụng mã nguồn mở nên nếu muốn trở thành một contributor cho Beekeeper Studio thì hãy tham khảo guide [này](https://github.com/beekeeper-studio/beekeeper-studio#contributing-to-beekeeper-studio) nhé :D

# 6. Tham khảo
More tools by Beekeeper Studio:
* [SQL Query Formatter](https://sqltools.beekeeperstudio.io/format)
* [Visual SQL Table Builder ](https://sqltools.beekeeperstudio.io/build)
* [SQL Code Examples](https://sqltools.beekeeperstudio.io/dialects)

Trang chủ Beekeeper Studio: https://www.beekeeperstudio.io/

Github: https://github.com/beekeeper-studio/beekeeper-studio

Documentation: https://docs.beekeeperstudio.io/

*Cảm ơn các bạn đã dành thời gian theo dõi bài viết của mình! 😉*