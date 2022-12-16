## Giới thiệu

MySQL rất phổ biến và là một trong những hệ quản trị cơ sở dữ liệu quan hệ được sử dụng rộng rãi nhất. Được viết bằng C và C ++, nó được phát triển và phát hành bởi Oracle Corporation vào giữa năm 1995. Kể từ đó sự phổ biến của nó ngày một tăng lên. Lý do đằng sau sự phổ biến ngày càng tăng đó là vì nó là mã nguồn mở và rất dễ sử dụng, đồng thời tích hợp rất dễ dàng với các ứng dụng và công cụ web khác nhau. LAMP (Linux, Apache, MySQL, PHP) là sự kết hợp rất phổ biến và là xương sống của vô số các ứng dụng web trên thế giới.

Có rất nhiều ứng dụng MySQL GUI dành cho người dùng Windows nhưng nếu bạn đang làm việc trên Ubuntu thì trong bài viết này, mình sẽ giới thiệu cho các bạn 4 ứng dụng MySQL tốt nhất mà bạn có thể sử dụng trên Ubuntu và các phiên bản linux khác.

## 1. DataGrip

DataGrip là một công cụ quản trị cơ sở dữ liệu đa nền tảng được phát triển và xuất bản bởi JetBrains, công cụ này rất phổ biến để phát triển các công cụ cho lập trình viên và nhà phát triển phần mềm. Nó đi kèm với các công cụ quản lý cơ sở dữ liệu phổ biến khác nhau như Amazon Redshift, Apache Hive, Azure SQL Database, Microsoft SQL Server và bao gồm cả MySQL.

![](https://images.viblo.asia/6956c371-6bcf-4d98-8247-09cad74d3cbc.png)

Nói về các tính năng, nó có giao diện người dùng rất thân thiện mà bạn sẽ thấy rất dễ sử dụng, biên dịch mã theo ngữ cảnh, phát hiện lỗi tự động và tích hợp kiểm soát phiên bản. Ngoài ra, nó còn có trình soạn thảo văn bản mạnh mẽ rất thông minh và tiên tiến, các chủ đề sáng và tối, giao diện có thể tùy chỉnh cao và hỗ trợ nhập/xuất rất linh hoạt.

![](https://images.viblo.asia/54098b4a-1b01-4700-8fec-3a2f63973208.png)

DataGrip có mọi thứ mà người quản trị cơ sở dữ liệu cần, nhưng có một thứ có thể thu hút bạn sử dụng các ứng dụng khách khác và điều này làm cho nó không miễn phí và hơi đắt tiền :D

Chúng ta có thể cài đặt DataGrip với dòng lệnh sau

```
sudo snap install datagrip --classic
```

## 2. DBeaver

DBeaver là một công cụ quản trị cơ sở dữ liệu SQL client miễn phí và đa nền tảng (mình đang dùng thằng này và cảm thấy rất tốt :v: ). Nó được phát triển bởi cộng đồng mã nguồn mở, đặc biệt dành cho các developer, lập trình viên SQL, quản trị viên cơ sở dữ liệu và nhà phân tích.

![](https://images.viblo.asia/8bc7a8a3-05ea-4a52-8d3d-e4ab50deb455.png)

Ngoài MySQL, nó hỗ trợ các công cụ quản lý cơ sở dữ liệu được sử dụng rộng rãi khác như PostgreSQL, SQLite, Firebird, Oracle và nhiều công cụ khác. Nó đi kèm với giao diện người dùng đơn giản nhưng hấp dẫn, rất dễ sử dụng.

Nói về các tính năng, nó cung cấp kết nối với nhiều nguồn dữ liệu khác nhau, trình tạo truy vấn trực quan, trình duyệt siêu dữ liệu, sơ đồ ER, tìm kiếm dữ liệu và siêu dữ liệu và trình soạn thảo SQL.

![](https://images.viblo.asia/c421d805-c012-423a-984d-2e0ff31c3d3c.png)

Bạn có thể download DBeaver tại [đây](https://dbeaver.io/download/)

## 3. SQL SQuirreL

SQuirreL SQL là một công cụ quản trị cơ sở dữ liệu đa nền tảng cung cấp trình soạn thảo mã đi kèm với biên dịch mã và highlight cú pháp cho SQL.

![](https://images.viblo.asia/9415fc9a-78d8-48d6-b5e0-c8d6bdd27cf4.png)

Đây là ứng dụng SQL client giàu tính năng, hỗ trợ xử lý các phiên cùng lúc với nhiều cơ sở dữ liệu, các template do người dùng tự quyết định, v.v. Đây là công cụ đơn giản và nhẹ mà bạn sẽ thấy rất đáng tin cậy và hữu ích.

SQuirrel SQL có thể được tải xuống và cài đặt trực tiếp từ Ubuntu Software Center.

## 4. Emma

Emma là một công cụ quản lý cơ sở dữ liệu đơn giản và rất nhẹ được phát triển cho Linux và các bản phân phối của nó như Ubuntu. Nó là một công cụ lý tưởng cho người mới bắt đầu trong lĩnh vực lập trình cơ sở dữ liệu và quản trị cơ sở dữ liệu.

![](https://images.viblo.asia/db532578-bf3c-49ae-a1d4-195cd26f80ec.png)

Để cài đặt emma trên Ubuntu, hãy chạy lệnh sau trong Terminal hoặc bạn có thể cài đặt trực tiếp nó từ Ubuntu Software Center.

```
sudo apt-get install emma
```

**Đây là 4 ứng dụng MySQL Clients theo mình là rất tốt mà các bạn có thể cài đặt trên Ubuntu và các bản phân phối Linux khác. Hy vọng bài viết này sẽ giúp các bạn tìm được phần mềm MySQL Clients hợp cạ với mình nhé.**