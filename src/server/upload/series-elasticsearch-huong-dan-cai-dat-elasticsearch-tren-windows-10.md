References: https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-windows-10.html

(Xem thêm: [Hướng dẫn Elasticsearch](https://stackjava.com/elasticsearch))

(Xem thêm: [Hướng dẫn cài đặt Elasticsearch trên Ubuntu 16.04](https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-ubuntu-16-04.html))

## Yêu cầu

Elasticsearch yêu cầu Java 8 trở lên, do đó trước khi cài Elasticsearch, hãy chắc chắn rằng bạn đã cài Java version >= 8 trên máy rồi nhé.

(Xem lại: [cài Java, JDK trên windows](https://stackjava.com/install/cai-dat-java-9-cai-dat-bien-moi-truong-java.html))

## Cài đặt Elasticsearch
Ở đây mình cài đặt trên windows nên sẽ sử dụng bản cài đặt `.msi` tại https://artifacts.elastic.co/…elasticsearch-6.3.2.msi.

Để download các phiên bản khác các bạn truy cập vào: https://www.elastic.co/downloads/elasticsearch


**Các bước cài đặt Elasticsearch**


Click đúp vào file `.msi` vừa tải về

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-1.png)

Phần cấu hình directories (các thư mục chứa data, config hay các files log) mình để mặc định, các bạn có thể sửa lại theo ý của mình nhé.

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-2.png)

Phần cấu hình elasticsearch, mình start nó bằng tay nên sẽ chọn “Do not install as a service” tức là khi nào cần thì mới bật

còn mục “Install as a service” thì nó sẽ cài đặt elasticsearch giốn như 1 service của windows, và sẽ tự động start khi mở máy.

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-3.png)

Phần cấu hình elasticsearch mình để mặc định (Các bạn có thể sửa theo ý muốn nhé

Ví dụ port 9200 bị trùng với ứng dụng nào rồi thì sửa lại

Máy thừa ram mà muốn elasticsearch chạy nhanh thì cung cấp nhiều bộ nhớ cho nó)
![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-4.png)

Phần plugin thì mình không cài gì cả. (Mình sẽ hướng dẫn các plugin của elasticsearch sau)

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-5.png)

Mình dùng bản communiy nên chọn license là basic.

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-6.png)

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-7.png)

Kết quả: sau khi cài đặt thành công, các bạn truy cập bin của folder cài đặt và click đúp vào file elasticsearch.exe để chạy elasticsearch

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-8.png)

Để kiểm tra lại elasticsearch đã chạy chưa, và các thông tin cấu hình thì các bạn mở trình duyệt web và truy cập địa chỉ `127.0.0.1:9200`

![](https://stackjava.com/wp-content/uploads/2018/07/install-elasticsearch-9.png)


__Okay, Done!

Các phần tiếp theo mình sẽ hướng dẫn thực hiện đưa dữ liệu vào elasticsearch, đánh index và truy vấn, code ví dụ java với elasticsearch

References:
https://stackjava.com/elasticsearch/huong-dan-cai-dat-elasticsearch-tren-windows-10.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html