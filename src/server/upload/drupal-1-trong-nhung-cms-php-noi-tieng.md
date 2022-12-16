Hôm nay mình giới thiệu 1 chút về 1 trong những cms nổi tiếng nhất và hay được dùng nhiều nhất hiện nay, đó là **Drupal**.

![](https://images.viblo.asia/e8e18e29-8a82-4c62-89fc-dbe0e843aae3.png)

# 1. Drupal là gì
- Đây là một hệ quản trị nội dung (CMS) được phát triển từ năm 2000 bởi Dries Buytaert, nhà phát triển web người Bỉ. Tên gọi đầu tiên của Drupal là Dorp, tiếng Hà Lan nghĩa là ngôi làng, nhưng bị gõ nhầm đổi thành Drop.
- Drupal được phát triển qua nhiều giai đoạn, đến nay bản mới nhất là Drupal 8 với nhiều đặc điểm nổi trội.
- Drupal được dùng để phát triển với nhiều mục đích (giới thiệu công ty, ecomerce, travel...). Sự linh hoạt trong thiết kế cấu trúc giúp drupal dễ dàng sử dụng và mở rộng. Một vài trang web đang sử dụng drupal để phát triển như:

    - https://www.london.gov.uk/
    - https://www.gouvernement.fr/
    - https://www.nbc.com/
    - http://www.mtv.co.uk/

# 2. Cài đặt Drupal
Drupal 8 tương đối dễ dàng cho việc cài đặt, các bạn tải drupal tại trang chủ https://www.drupal.org/ và làm theo các bước sau:

<br/>


**B1:** Giải nén vào thư mục đặt source code của bạn (mình đặt tại /var/www/html/drupal/drupal8)



![](https://images.viblo.asia/d24c54f4-a64b-4e92-b0b2-7a404a2157cb.png)
    
**B2:** Tạo database.

![](https://images.viblo.asia/42e69ec5-8e87-45f7-b3cd-8882a5e5a6af.png)

**B3:** Cài đặt. 

Các bạn vào đường dẫn trên local để thực hiện các bước cài đặt. Việc cài đặt drupal khá dễ dàng do màn hình hướng dẫn rất trực quan và dễ làm, chỉ việc điền các thông tin về database là các bạn sẽ hoàn tất việc cài đặt.

1.  Chọn ngôn ngữ cài đặt sau đó ấn "save and continue"

![](https://images.viblo.asia/13e7e12f-bfee-4278-beb6-f26dfa2a3376.png)


2. Chọn cách cài đặt (mình chọn standard) sau đó ấn "save and continue"

![](https://images.viblo.asia/8222aab4-8c5f-4e18-8b62-1d09a449af76.png)


3. Tiến trình cài đặt drupal

![](https://images.viblo.asia/9c723148-e40a-4722-9180-efcfd5dc937b.png)


4. Setting cho website, tại đây bạn sẽ điền thông tin quản trị ban đầu của website. Sau công đoạn này ta sẽ có 1 website đơn giản được làm bằng drupal 8


![](https://images.viblo.asia/24d5cc0f-58a3-460a-b787-91022edc39cb.png)

5. Demo

![](https://images.viblo.asia/2c27f8df-ca16-40c0-a600-354625e407c7.png)

# 3. Dashboard Drupal 8
- **Content types**: Nếu các bạn từng xây dựng một trang admin với framework (laravel, cakephp,....) hoặc sử dụng 1 cms nào đó trước đây (wordpress, joomla ..) thì khi sang dùng với drupal 8 bạn sẽ thấy đây là 1 công cụ quản trị cực mạnh, nó cho phép người dùng tạo các dạng content khác nhau (post, page, product ...), trong drupal gọi đó là **content types**
- **Block layout**: cho phép người dùng tạo các block link hoạt, ở wordpress chúng ta sử dụng widget để hiển thị các block theo ý muốn thì trong drupal ta dùng **Block layout**
- Ngoài 2 cái trên thì trong **Structure** của drupal còn có views, taxonomy, menu, các bạn xem ở hình dưới đây

![](https://images.viblo.asia/118a7474-4e88-403a-9032-5e3dad367713.png)

- Drupal còn nổi tiếng với việc phân quyền tới tận **chân răng** của hệ thống

Với các mục đích khác nhau bạn có thể tạo và phân quyền thực sự linh hoạt cho người dùng khi sử dụng drupal

![](https://images.viblo.asia/f948f162-f474-418e-af6f-f0d67f6c6c67.png)

# 4. Dev Drupal 8
Để phát triển code bằng drupal cũng không khó, vì cộng đồng khá lớn, nhưng chúng ta cần nắm được cấu trúc viết module và theme của drupal, drupal được đánh giá là khó học hơn so với wordpress và joomla, nhưng về bảo mật thì drupal được đánh giá khá cao trong các cms nổi tiếng hiện nay.

# 5. Tổng kết
Mình vừa giới thiệu với các bạn về Drupal, một trong những cms mạnh mẽ nhất hiện nay, có thể nói bạn đang nghĩ mình sẽ làm gì, thì drupal cũng có giải pháp cho bạn, nếu biết tận dụng bạn sẽ tiết kiêm được khá nhiều thời gian so với việc xây dựng bằng một framework nào đó. Nếu Nhà Trắng của Mỹ dùng Drupal làm platform để xây dựng website thì bạn cũng có thể dùng Drupal để làm 1 sản phẩm cho bạn :D.

Bài tiếp theo mình sẽ hướng dẫn các bạn phát triển 1 module nho nhỏ để hiểu drupal hơn.