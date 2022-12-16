#  1. Mở đầu
Khi bắt đầu làm quen với `Bootstrap ` chúng ta thường có 2 cách để áp dụng:

* Lên trang chủ của bootstrap và tải file `bootstrap.min.css` rồi import từ server của mình.
* Sử dụng link Bootstrap CDN
 
    ![](https://images.viblo.asia/47d2b5c7-e00c-4819-a70d-6953aa063f2d.png)

Vậy tại sao lại tồn tại một cái link dài ngoằng được gọi là CDN kia? Nó là cái gì và vì sao nó thường được sử dụng?

# 2. CDN là gì?
`CDN` là từ viết tắt của `Content Delivery Network`  nó là môt hệ thống máy chủ trên toàn cầu được đặt ở nhiều nơi có chức năng lưu trữ và cung cấp dữ liệu là các bản sao của các trang tĩnh bên trong website cho người dùng. Mỗi máy chủ được gọi là một `PoP`(Points of Presence), khi người dùng truy cập vào website `PoP` sẽ gửi các file tĩnh cho người dùng.

Để hiểu hơn về CDN ta xem xét 2 cách đã được nêu ra trong phần mở đầu:

1. Cách thông thường không sử dụng `CDN`: Với cách này ta lưu trữ một file `bootstrap.min.css` tại server chính của website (origin server). Khi người dùng truy cập vào website người dùng sẽ connect trực tiếp tới origin server để lấy file `bootstrap.min.css` về để sử dụng.
 ![](https://images.viblo.asia/3e169fd5-4f75-4949-903a-350e3709cd73.png)


2.  Sử dụng `CDN`: Với cách này ngoài origin server chúng ta có thêm các server con (`PoP`) để chứa các file tĩnh như ảnh, video, CSS, JS. Trong ví dụ đang nói đến chính là file `bootstrap.min.css`. Khi người dùng truy cập vào website thay vì connect tới origin server, client sẽ tìm đến một `Pop` gần nhất với client để lấy dữ liệu là file `bootstrap.min.css`.

![](https://images.viblo.asia/ee2d8136-f836-4d91-a8b2-efbff481182e.png)

Thông qua ví dụ trên ta có thể đoán được ngay ưu điểm dễ nhận ra nhất khi sử dụng CDN đó là giúp cho website có tốc độ tải nhanh hơn xét trên một phạm vi lớn . Khi sử dụng CDN client có thể tìm đến `Pop` gần nó nhất để lấy dữ liệu thay vì phải kết nối tới origin server có thể có khoảng cách rất xa so với client.

# 3.  Những ưu điểm khi sử dụng CDN
Ngoài khả năng tăng tốc độ tải trang khi truy cập website `CDN` còn có nhiều ưu điểm khác như:
* **Giảm băng thông cho Origin Server:** 

    Khi sử dụng CDN origin server được giảm tải do các client có thể gửi request lên một server khác qua đó có thể giảm thiểu được hiện tượng quá tải.
*  **Caching:** 

    Ngoài việc sử dụng để lưu trữ những file tĩnh . Một số CDN có thể được sử dụng để cache kết quả từ server (dynamic caching). Người dùng có thể lấy dữ liệu từ cache của CDN thay vì từ origin server. Việc làm này vừa giúp đặt tốc độ cao vừa giúp tiết kiệm băng thông.
* **Tăng tính ổn định của hệ thống:** 

    Bằng cách sử dụng nhiều server trên thế giới, khi một server gặp sự cố thì người dùng vẫn có thể truy cập được dữ liệu từ một server khác.

* **Dễ dàng quản lý các phiên bản:**

    Các dịch vụ CDN thường cung cấp chức năng quản lý phiên bản (version control) do đó việc quản lý các phiên bản cần được gửi tới cho người dùng được quản lý một cách dễ dàng và thuận tiện hơn.
    
 # 4. Một số lưu ý khi sử dụng dịch vụ CDN
#####   Những trường hợp nên sử dụng dịch vụ CDN:
*    Máy chủ của website đặt xa người dùng.
*    Lượt truy cập lớn.
*    Có nhiều lượt truy cập trên nhiều quốc gia và vùng lãnh thổ.

##### Không phải lúc nào việc sử dụng CDN cũng cho kết quả tốt:
Trong nhiều trường hợp việc sử dụng CDN không những không giúp cải thiện về tốc độ mà còn làm giảm tốc độ. Ví dụ như khi website có server chính được đặt tại Việt Nam và đối tượng phục vụ là người Việt Nam nhưng lại sử dụng dịch vụ CDN không hỗ trợ `PoP` tại Việt Nam khi đó việc sử dụng CDN sẽ dẫn tới phản tác dụng.

##### Một số dịch vụ CDN phổ biến:

* Amazon CloudFront
* MaxCDN
* Akamai CDN
* SoftLayer
* CDNSun
* CacheFly