# 1. Giới thiệu
 Khi làm dự án đôi lúc chúng ta phải đối mặt với vấn đề liên quan đến thông tin của các Quốc Gia khác nhau. Và đương nhiên bạn có thể search google thông tin của quốc gia bạn cần rồi tự thêm vào dự án của mình. Tuy nhiên, việc này sẽ tốn nhiều time của bạn. 
 
 Để giải quyết vấn đề này, hôm nay mình sẽ giới thiệu cho các bạn biết về [`gem countries`](https://github.com/hexorx/countries) 
 
Nó là một tập hợp tất cả các thông tin hữu ích của mọi quốc gia trong tiêu chuẩn `ISO 3166`. Nó chứa thông tin: 
 * Quốc gia theo tiêu chuẩn [ISO 3166-1](https://vi.wikipedia.org/wiki/ISO_3166-1) 
 * Tiểu bang / phân khu theo tiêu chuẩn [ISO 3266-2](https://vi.wikipedia.org/wiki/ISO_3166-2)
 * Tiền tệ theo tiêu chuẩn [ISO 4217](https://vi.wikipedia.org/wiki/ISO_4217)
 * Số điện thoại theo tiêu chuẩn [E.164](https://en.wikipedia.org/wiki/E.164). 
 
 Từ những thông tin trên thì về cơ bản chúng ta đã giải quyết được những vấn đề liên quan đến Quốc gia trong dự án của mình rồi.
 
 # 2. Cài đặt
* Cách 1: ```gem install countries```
* Cách 2: 
     Thêm vào Gemfile:
     ```
     gem 'countries'
     ```
     và chạy 
     ```
     bundle install
     ```
 # 3. Lấy thông tin của Quốc Gia
 Đầu tiên là khởi tạo object Quốc Gia và từ đó bạn có thể lấy được các thông tin khác liên quan đến Quốc Gia này
 
 ``` ruby
 united_states = ISO3166::Country.new('US')
 ```

### 3.1 Mã quốc gia
Thông thường dùng 2 loại sau: alpha2, alpha3
```ruby
united_states.alpha2 # => "US"
united_states.alpha3 # => "USA"
```
### 3.2 Name
```ruby
united_states.name # => "United States"
```
### 3.3 Location
Thông tin liên quan đến location
```ruby
united_states.latitude # => "38 00 N"
united_states.longitude # => "97 00 W"
united_states.latitude_dec # => 39.44325637817383
united_states.longitude_dec # => -98.95733642578125

united_states.region # => "Americas"
united_states.subregion # => "Northern America"
```

### 3.4 Thông tin Phân khu/ Tiểu bang
``` ruby
united_states.subdivisions # Phân khu
united_states.states # Tiểu bang
```

### 3.5 Timezone (optional)
Để xác định được timezone thì cần cài đặt thêm `gem tzinfo`  vì `gem countries` không support phần này

Sau khi cài đặt ta có thể get những thông tin thường gặp sau:
```ruby
united_states.timezones.zone_identifiers
united_states.timezones.zone_info
united_states.timezones
```

### 3.6 Thông tin về phone number
``` ruby
united_states.country_code # => "1"
united_states.national_destination_code_lengths # => 3
united_states.national_number_lengths # => 10
united_states.international_prefix # => "011"
united_states.national_prefix # => "1"
```

# Kết luận
Vì nó là 1 loại spec đặc thù liên quan đến Quốc gia. Nên có thể bạn sẽ chưa thấy cần thiết khi dùng.
Tuy nhiên hi vọng có thể nhớ đc key word `gem countries` để khi cần. có thể tìm ra gem support này 1 cách nhanh chóng.

## Tài liệu tham khảo
https://github.com/hexorx/countries