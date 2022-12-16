1. Gem maxminddb để làm gì ?
2. Ưu điểm và nhược điểm của gem
3. Sử dụng gem trong rails
4. Kết

# 1. Gem maxminddb để làm gì ?
- Gem maxminddb cho phép tìm kiếm thông tin về một IP cụ thể, hỗ trợ việc tìm kiếm chính xác các thông tin : country, IPv4, IPv6, city, domain,...
- Các tính năng của maxminddb xác định vị trí và các đặc điểm khác của người dùng Internet cho nhiều ứng dụng bao gồm cá nhân hóa nội dung, phát hiện gian lận, nhắm mục tiêu quảng cáo, phân tích lưu lượng truy cập, tuân thủ, nhắm mục tiêu theo địa lý, hàng rào địa lý và quản lý quyền kỹ thuật số.
-  Hiện nay có khoảng hơn 5.000 doanh nghiệp trên toàn thế giới sử dụng maxminddb.
# 2. Ưu điểm và nhược điểm của gem
### Ưu điểm:
- Độ chính xác định vị địa lý IP rất cao (99%)
- Dữ liệu maxminddb bao gồm 99% địa chỉ IP đang sử dụng.
- Dữ liệu được cập nhật hàng tuần.
- Không phải lo lắng về việc lưu trữ dữ liệu trên máy chủ local hoặc triển khai các bản cập nhật. Được truy cập thông qua API hoặc tải lên tệp thủ công.
### Nhược điểm:
- MaxMind cung cấp dữ liệu thông minh IP cho chúng ta một khối lượng lớn. Bằng cách lưu trữ cơ sở dữ liệu tại local, bạn sẽ loại bỏ được chi phí và mỗi truy vấn khá nhanh.
- Vì dữ liệu được đặt trên local nên dữ liệu sẽ không được cập nhật thường xuyên nhưng chúng ta có thể tải dữ liệu thủ công miễn phí tại [đây](https://dev.maxmind.com/geoip/geoip2/geolite2/)

-![](https://images.viblo.asia/baf6e43e-6471-4ab5-ba2b-cea8abe2b078.png)
# 3. Sử dụng gem trong rails
*Thêm dòng này vào Gemfile trong ứng dụng của bạn:*
```
gem 'maxminddb'
```
*Bundle để cài đặt*
```
$ Bundle install
```
*hoặc có thể cài đặt*
```
$ gem install maxminddb
```
Vậy là đã xong chúng ta có thể test thử trên rails c:
```
ret = db.lookup('74.125.225.224')

ret.found? # => true
ret.country.name # => 'United States'
ret.country.name('zh-CN') # => '美国'
ret.country.iso_code # => 'US'
ret.city.name(:fr) # => 'Mountain View'
ret.subdivisions.most_specific.name # => 'California'
ret.location.latitude # => -122.0574
```
# 4. Kết
- Ngoài ra các bạn cũng có thể sử dụng một số gem tương tự để kiểm tra IP: geocoder, geoip,...
- https://github.com/alexreisner/geocoder
- https://github.com/cjheath/geoip

Đây là những kiến thức mình tìm hiểu được về maxminddb, chúc các bạn thành công.