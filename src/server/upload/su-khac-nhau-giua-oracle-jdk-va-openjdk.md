Chắc rằng bất cứ ai bắt đầu tìm hiểu về Java cũng sẽ phải cài đặt JDK bộ công cụ cung cấp môi trường phát triển phần mềm cho các ứng dụng Java. JDK bao gồm JRE (Java Runtime Environment), và một số công cụ khác hỗ trợ cho quá trình phát triển ứng dụng Java.

Đa số các bạn tìm kiếm và download JDK của Oracle. Tuy nhiên vẫn còn một phiên bản JDK khác với tên gọi OpenJDK và chúng ta cùng tìm hiểu xem chúng khác nhau như thế nào nha.

## Lịch sử phát triển java SE
Dưới đây là lịch sử phát triển của Java SE (phiên bản tiêu chuẩn), ngoài ra đi kèm sẽ có các phiên bản Enterprise và Micro).

* JDK Beta – 1995
* JDK 1.0 – January 1996
* JDK 1.1 – February 1997
* J2SE 1.2 – December 1998
* J2SE 1.3 – May 2000
* J2SE 1.4 – February 2002
* J2SE 5.0 – September 2004
* Java SE 6 – December 2006
* Java SE 7 – July 2011
* Java SE 8 (LTS) – March 2014
* Java SE 9 – September 2017
* Java SE 10 (18.3) – March 2018
* Java SE 11 (18.9 LTS) – September 2018
* Java SE 12 (19.3) – March 2019

Các phiên bản được in nghiêng với ý nghĩa không còn được hỗ trợ bởi oracle. LTS – Long-Term-support nghĩa là hỗ trợ dài hạn.

Các bạn có thể thấy rằng các phiên bản Java SE được phát hành xấp xỉ mỗi 2 năm một lần, cho đến phiên bản Java SE 6 cần 5 năm để lên Java SE 7 và thêm 3 năm để phát hành phiên bản Java SE 8, một trong những phiên bản được sử dụng nhiều nhất hiện nay.


 
Kể từ Java SE 10, các phiên bản phát hành có thể cách nhau 6 tháng, và mỗi 3 năm sẽ có một phiên bản được hỗ trợ dài hạn.

Java SE 11 hiện đang là phiên bản cao nhất được hỗ trợ dài hạn (LTS), và Java SE 8 sẽ nhận được các bản update miễn phí cho đến tháng 12 năm 2020 để sử dụng cho mục đích phi thương mại.


 
Oracle khuyến khích sử dụng các JDK của những phiên bản Java SE được hỗ trợ dài hạn như Java SE 8  và 11.

Trước đây các phiên bản JDK được gọi là SUN JDK, về sau khi oracle mua lại  Sun Microsystems vào năm 2010 thì nó có thể tên chính thức là JDK.

## OpenJDK
Từ phiên bản Java SE 7, một cộng đồng phát triển mã nguồn mở đặt tên là OpenJDK dựa trên Java SE 7. Các interface của từng các version mới vẫn được Oracle định nghĩa nhưng chúng ta sẽ có 2 phiên bản triển khai từ OpenJDK với sự hỗ trợ từ cộng đồng và 1 phiên bản đến từ Oracle.

OpenJDK là một phiên bản mã nguồn mã miễn phí được phát triển dựa trên Java SE. Nó được phát hành lần đầu tiên vào năm 2007 bởi Microsystems. Phát triển dựa trên phiên bản Java SE 7.


 
Giống như Oracle, OpenJDK phát hành phiên bản mới mỗi 6 tháng. Chúng ta cùng xem qua quá trình phát triển của OpenJDK.

* OpenJDK 6 project – based on JDK 7, but modified to provide an open-source version of Java 6
* OpenJDK 7 project – 28 July 2011
* OpenJDK 7u project – this project develops updates to Java Development Kit 7
* OpenJDK 8 project – 18 March 2014
* OpenJDK 8u project – this project develops updates to Java Development Kit 8
* OpenJDK 9 project – 21 September 2017
* JDK project release 10 – 20 March 2018
* JDK project release 11 – 25 September 2018
* JDK project release 12 – Stabilization phase
## So sánh Oracle JDK với OpenJDK
Trong phần này chúng ta sẽ so sánh sự khác nhau giữa Oracle JDK và OpenJDK theo từng tiêu chí dưới đây.

### Thời gian phát hành
Mặc dù Oracle mới đây đã công bố phát hành 6 tháng mỗi lần, thế nhưng chỉ sau khoảng 3 năm mới có một phiên bản LTS. Trong khi OpenJDK phát hành 6 tháng cho mỗi version mới.

Oracle sẽ hỗ trợ dài hạn cho các phiên bản họ phát hành trong khi OpenJDK chỉ hỗ trợ trong thời gian phiên bản đó được phát hành cho đến khi có phiên bản mới, đồng nghĩa nó chỉ hỗ trợ tầm 6 tháng.

### Giấy phép
Oracle JDK được cấp giấy phép Oracle Binary Code License Agreement trong khi OpenJDK là OpenJDK has the GNU General Public License (GNU GPL) version 2 with a linking exception.

### Hiệu năng
Về quá trình cập nhật phiên bản mới thì không có sự khác biệt giữa Oracle JDK và OpenJDK vì mỗi phiên bản mới được phát hành đều sẽ có 2 phiên bản triển khai của oracle và openjdk.

Nhưng về mặt hiệu suất, Oracle tốt hơn OpenJDK, họ chú trọng vào độ ổn định để hỗ trợ các khách hàng là các cá nhân, doanh nghiệo etc. Ngược lại OpenJDK, các phiên bản được phát hành thường xuyên hơn, vì vậy đôi khi chúng ta vấn đề. Tất nhiên OpenJDK là một phiên bản phát triển bởi cộng đồng, nếu các bạn đủ khả năng và hứng thú với cuộc chơi thì đừng ngại sử dụng OpenJDK. 

### Sự phổ biến và cộng đồng
Oracle JDK được phát triển bởi Oracle Corporation như là một sản phẩm của công ty. Trong khi OpenJDK cũng được Oracle tham gia phát triển, ngoài ra còn có một cộng đồng cùng tham gia phát triển OpenJDK. Các công ty lớn như Red Hat, Azul Systems, IBM, Apple Inc etc cũng tham gia tích cực vào sự phát triển của OpenJDK.

Trước đây phiên bản JDK của oracle được sử dụng nhiều hơn, tuy nhiên gần đây đã có sự thay đổi lớn. Điển hình là Android Studio và IntellIJ IDEA sử dụng Oracle JDK nhưng giờ đây họ đã chuyển sang sử dụng OpenJDK. Mặt khác các hệ điều hành lớn từ nhánh Linux như Ubuntu, Fedora, Red Hat sử dụng OpenJDK là trình triển khai Java SE mặc định.

## Những sự thay đổi từ Java 11
Chúng ta có thể thấy trên Oracle Blog có nói đến một số thay đổi quan trọng kể từ phiên bản Java 11. Oracle sẽ thay đổi giấy phép với sự kết hợp giấy phép mã nguồn mã  GNU General Public License v2, with the Classpath Exception (GPLv2+CPE) và  commercial license khi sử dụng Oracle JDK trong các ứng dụng doanh nghiệp. 

Oracle’s kit cho Java 11 sẽ cảnh báo khi sử dụng  -XX:+UnlockCommercialFeatures option, trong khi sử dụng option này với  OpenJDK sẽ dẫn đến lỗi.
Oracle JDK cho phép sử dụng data log trong Advanced Management Console tool.
Oracke yêu cầu thư viện thứ 3  cryptographic providers để xác nhận giấy phép. Trong khi OpenJDK nó chỉ là một tùy chọn.

Nguồn tham khảo

[https://shareprogramming.net/su-khac-nhau-giua-oracle-jdk-va-openjdk/](https://shareprogramming.net/su-khac-nhau-giua-oracle-jdk-va-openjdk/)