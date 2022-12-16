## Mở đầu

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chào các bạn, lời đầu tiên chúc các bạn đọc có một ngày làm việc vui vẻ và hiệu quả.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Như các bạn đã biết chúng ta là những người tạo ra các trang web, hay các ứng dụng tiện ích nhằm phục vụ cho người dùng một cách hiệu quả nhất. Nhưng không phải lúc nào cũng vừa code vừa có thể đánh giá được nó có chạy tối ưu hay chưa, hoặc ứng dụng của mình đã chay nhanh chưa. Nên ở đây mình chia sẻ một chút về làm thế nào ứng dụng của mình nhanh hơn (Mình lấy ứng dụng web làm ví dụ nhé ).

## Một số nguyên nhân làm web của bạn chậm
Trong khi làm dự án mình đã đúc kết được một số nguyên nhân gây ra hệ thống của mình chậm. Mình sẽ liệt kê trước và giải quyết ở phần sau.
1. Chúng ta sử dụng quá nhiều câu truy vấn mà không tối ưu chúng .
2. Trang web của bạn đang chứa nhiều file js, css, image, các phần tử web tĩnh....
3. Các dữ liệu load đi load lại nhiều lần.
4. Một số hệ thống chậm nguyên nhân từ server.
## Một số phương pháp giúp trang web chạy nhanh hơn
**Ở đây mình chia sẻ những gì mình gặp phải và đã giải quyết theo dự án mình từng làm, bạn đọc có thể bổ sung, góp ý để chúng ta có thêm kiến thức**  :heart_eyes::stuck_out_tongue_closed_eyes:
### 1. Chúng ta sử dụng quá nhiều câu truy vấn mà không tối ưu chúng
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trong lúc ta code việc lấy dữ liệu trong database chúng ta cũng phải chú ý lấy làm sao để tránh lấy dư thừa. Tại sao lại như vậy, vì khi chúng ta lấy không có chọn lọc, các dữ liệu chúng ta không cần cũng được lấy ra theo, và từ đó cứ tích tụ lại gây ra nặng cho hệ thống và nguyên nhân gây ra hệ thống chậm.

**Ví dụ:**
Mục đích của mình của cần lấy `id` của `jobs` 

```sql
SELECT * FROM jobs
```

Thay vì mình dùng câu truy vấn trên để lấy mỗi `id` thôi thì mình sẽ dùng câu truy vấn này 

```sql
SELECT id FROM jobs
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trên là mình đã chỉ ra mình cần gì thì mình lấy ra cái đó, và tiếp theo mình xin chia sẻ chúng ta không nên dùng những câu truy vấn lặp lại mà gộp chúng lại.

**ví dụ**

Mình muốn lấy `id` và `name` trong `skills` dựa theo `id`  job mình truyền vào.

Mình có một mảng  ``` $jobIds = [1, 2, 3, 4, 5];```

như bình thường chúng muốn lấy `id` và `name` thì chúng ta 
```php 
foreach ($jobIds as $jobId) { 
    $query = 'SELECT id, name FORM skills WHERE jobId = ' . $jobId;
  }
  ```
  nhưng chúng ta có thể lấy dữ liệu trên bằng câu truy vấn này 
  
  ```php 
     $query = 'SELECT id, name FROM skills WHERE jobId IN (1, 2, 3, 4, 5)';
   ```
   và câu hỏi đặt ra làm thế nào mình có thể lấy giá trị của mảng kia truyền vào chỗ `IN` kia
   ```php 
   $value = '';
   foreach ($jobIds as $jobId) { 
     $value += $jobId . ',';
  }
  ```
  hoặc 
```php
  $value = implode(', ', $jobIds );
  ```
  và sau đó ta có câu truy vấn
  ```php
  $query = 'SELECT id, name FROM skills WHERE jobId IN ( ' . $value . ' )';
  ```
phương pháp trên còn có tên gọi là `Truy vấn N + 1`

### 2. Trang web của bạn đang chứa nhiều file js, css, image, các phần tử web tĩnh....
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nếu trang web của bạn đang chứa nhiều js, css , image thì đây cũng một vấn khá để quan tâm.

Bạn có thể `CDN` để đưa các phần tử đó vào web của mình thay vì bạn để trực tiếp. Có nghĩa là bạn để các phần tử đó ở một server khác hoặc đã có sẵn do các server khác cung cấp.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ngoài ra các bạn hãy sử dụng file `.min` ví dụ như `jquery.min.js` thay vì sử dụng `jquery.js`. 
Vì sao lại vậy, vì tất cả các file `.min` đều được xóa tất  cả các khoảng trắng, có nghĩa là file đó chỉ có một dòng code duy nhất, như vậy web của chúng ta đọc chúng rất nhanh.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Một điều nữa, image bạn đang sử dụng cũng có tác động ít nhiều đến tốc độ web chạy..Bạn hãy lựa chọn đuôi image phù hợp và kết hợp nén image để giảm dung lượng của image. Mình giới thiệu qua còn chi tiết như nào các bạn tìm hiểu thêm nhé..mình có để một số link liên quan ở bên dưới.
### 3. Các dữ liệu load đi load lại nhiều lần
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trang web của bạn có dữ liệu load đi load lại từ database nhiều lần vì sao vậy, ví dụ bạn là một người dùng khi vào một trang chủ của một web bất kì, tại trang chủ tất cả dữ liệu được load ra từ database, khi bạn quay lại trang chủ lần sau thì lại chui vào database để lấy dữ liệu ra. Cứ lặp đi lặp lại và số lượng người dùng tăng thì trang web của bạn rất chậm và có thể bị sập.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Phương pháp mình đề cập tới đó là bạn hãy sử dụng `cache`, vấn đề là bạn sẽ làm gì với nó.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vâng chúng ta sẽ tổng quan lại trang web xem dữ liệu nào dùng đi dùng lại nhiều lần, chúng ta thấy thích hợp thì `cache` chúng lại. Vì sao lại phải `cache` đơn giản mình dùng thấy khi cache toàn bộ dữ liệu mình `cache` đều được lưu lại, và lấy thẳng từ đó ra k phải chui vào database để lấy nữa.

Điều này làm giảm số lượng câu truy vấn đi rất nhiều.

Theo mình được biết bây giờ có 3 dạng cache phổ biến: `Cache file `, `memcache`, `redis`
### 4. Một số hệ thống chậm nguyên nhân từ server
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Một số nguyên nhân xuất phát từ server, trong thời gian chạy dự án mình đã phát hiện web của mình chạy chậm hơn mọi ngày, sau một loạt kiểm tra thì mình phát hiện `Ram` của server đang bị chiếm nhiều, và mình đã `restart` lại server sau đó thấy web chạy lai nhanh.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qua điều này mình thấy rằng nếu server của mình chạy khá lâu thì chúng ta cũng nên chăm sóc nó để nó chạy tốt.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ngoài ra các bạn cũng nên kiểm tra cấu hình của server có đáp ứng được web của bạn chạy ổn định không, qua theo dõi và kiểm tra thì bạn sẽ thấy được. Và tùy thuôc vào nhà cung cấp có chất lượng thế nào nhé các bạn.

## Kết luận
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ở trên mình đã đưa ra một số nguyên nhân gây hệ thống chậm và phương pháp để giải quyết nó. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tất cả là do mình trong quá trình làm dự án và một số kiến thức tìm hiểu được. Bạn đọc có kiến thức nào thêm hoặc bổ sung thì giúp mình thêm nhé.. Chúng ta cùng chung mục đích là xây dựng và phát triển những ứng  dụng có tiện ích cho người dùng cũng như chúng ta.

## Tài liệu tham khảo
Các bạn có thể tìm các tài liệu rất nhiều trên `google` nhưng ở đây mình đưa ra một số tài liệu

Tài liệu tối ưu ảnh 

https://viblo.asia/p/toi-uu-hoa-hinh-anh-cho-trang-web-L4x5xwDalBM

Cache


https://redis.io/documentation


https://memcached.org/


https://sudo.vn/chia-se/huong-dan-cache-website-chay-php-bang-cach-don-gian-nhat.html