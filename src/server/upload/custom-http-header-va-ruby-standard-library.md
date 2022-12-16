### Vấn đề
Một ngày nọ tại nơi làm việc, tôi nhận được thông báo từ một trong những nhà cung cấp bên thứ ba rằng tất cả các cuộc gọi api cho họ đều bị từ chối một cách âm thầm. Họ đưa ra lời giải thích rằng một trong những headers HTTP được sử dụng để cung cấp chính khóa api, (chúng ta hãy gọi nó API-KEY) đã được gửi không chính xác.

Họ muốn header là một chữ thường như `api-key` nhưng chúng tôi đã bắt đầu gửi nó bằng API-KEY viết hoa. Điều này sẽ không xảy ra vì chúng tôi đã có một bản vá tại chỗ, để xử lý tình huống này.

### Thông tin cơ bản về header HTTP và Net::HTTP

Theo RFC https://www.w3.org/Protocols/rfc2616/rfc2616.html, header http không phân biệt chữ hoa chữ thường, có nghĩa là ứng dụng đích phải có thể hiểu cả chữ hoa và chữ thường.

```
Each header field consists of a name followed by a colon (“:”) and the field value. Field names are case-insensitive
```

Vì đối với hầu hết các ứng dụng, header http không phân biệt chữ hoa chữ thường. Library netwwork tiêu chuẩn của Ruby NET::HTTP chuyển đổi mọi header thành chữ hoa, đây không phải là vấn đề đối với hầu hết các apis của bên thứ ba.

Nhiều library phổ biến như Httparty sử dụng Net::HTTP làm phụ trợ.

Nhưng đôi khi chúng ta cần gửi một header http cụ thể mà không có bất kỳ sửa đổi nào.

Để ngăn header keys http bị sửa đổi bởi NET::HTTP, tôi đã sử dụng giải pháp này từ https://calvin.my/posts/force-http-header-name-lowercase

Hoạt động tốt.

```ruby
class ImmutableKey < String 
         def capitalize 
               self 
         end 
 end
```

Và sử dụng key trên như sau
```ruby
{ ImmutableKey.new("api-key"): 'SECRET-KEY' } 
```

Theo bên thứ ba, điều này bắt đầu xảy ra từ một thời điểm cụ thể và sau đó nó xảy ra với tôi, dòng thời gian khớp hoàn toàn với việc nâng cấp rails của chúng tôi từ rails 4 lên rails 5. Để xác minh linh cảm, tôi đã chạy lại cùng một mã trong cả hai version 4 và 5 với đăng nhập gỡ lỗi HTTParty và vâng, nó đã ở đó. Header đã được viết hoa trong rails box mới.

```ruby
# Rails 4 box
opening connection to thirdparty.com:443...
starting SSL for thirdparty.com:443...
SSL established

<- POST "/endpoint HTTP/1.1\r\napi-key: 'SECRET'
```
```ruby
# Rails 5 box
opening connection to thirdparty.com:443...
starting SSL for thirdparty.com:443...
SSL established

<- POST "/endpoint HTTP/1.1\r\nAPI-KEY: 'SECRET'
```
Nhưng tại sao điều đó lại xảy ra, suy nghĩ đầu tiên của tôi là kiểm tra phiên bản gem của httparty và mặc dù có sự cố từ .0.14 lên 0.17, việc gỡ lỗi thêm đã chứng minh rằng httparty không phải là vấn đề và sự đột biến của các form đang xảy ra tại Net::HTTP.

https://github.com/jnunemaker/httparty/blob/99751ac98af929b315c74c2ac0f5ffa09195f7ae/lib/httparty/request.rb#L213

```ruby
def setup_raw_request
   @raw_request = http_method.new(request_uri(uri))
   @raw_request.body_stream = options[:body_stream] if options[:body_stream]
    
   if options[:headers].respond_to?(:to_hash)
      headers_hash = options[:headers].to_hash
    
   @raw_request.initialize_http_header(headers_hash)
   # If the caller specified a header of 'Accept-Encoding', assume they want to
   # deal with encoding of content. Disable the internal logic in Net:HTTP
   # that handles encoding, if the platform supports it.
   if @raw_request.respond_to?(:decode_content) && (headers_hash.key?('Accept-Encoding') || headers_hash.key?('accept-encoding'))
     # Using the '[]=' sets decode_content to false
     @raw_request['accept-encoding'] = @raw_request['accept-encoding']
   end
end
```
Cụ thể là dòng này
```ruby
@raw_request.initialize_http_header(headers_hash
```

Vì vậy, nếu NET::HTTP là vấn đề ở đây thì tại sao việc nâng cấp rails lại phá vỡ nó?

Đó là do nâng cấp phiên bản ruby, trước đó chúng tôi đã sử dụng ruby `2.1.3` và với việc nâng cấp rails, chúng tôi đã chuyển sang ruby `2.5.2`, có nghĩa là thư viện tiêu chuẩn cũng có một số thay đổi.

Vì vậy, hãy xem sự khác biệt giữa hai phiên bản

Phiên bản ruby `2.1.3` cũ hơn có
```ruby
def each_capitalized
    block_given? or return enum_for(__method__)
    @header.each do |k,v|
      yield capitalize(k), v.join(', ')
    end
  end

  alias canonical_each each_capitalized

  def capitalize(name)
    name.split(/-/).map {|s| s.capitalize }.join('-')
  end
```

Trong khi ruby `2.5` giới thiệu commit này https://github.com/ruby/ruby/commit/1a98f56ae14724611fc8f7c220e470d27f6b57e4 đã giới thiệu một số thay đổi đối với phương pháp chú thích hóa cơ bản bằng cách sử dụng `to_s`

```ruby
name.to_s.split(/-/).map {|s| s.capitalize }.join('-')
```

Điều này đã khiến lớp ImmutableString của chúng tôi trả về một đối tượng chuỗi mới thay vì một đối tượng của lớp ImmutableString với capitalized frozen.

```ruby
ImmutableKey("new").class # ImmutableKey
ImmutableKey("new").to_s.class # String
ImmutableKey("new").to_str.class # String
```

### Fix

Khắc phục là làm cho `to_s` và `to_str` trả về bản thân để đối tượng trả về là một instance của ImmutableKey thay vì base string class
```ruby
class ImmutableKey < String 
         def capitalize 
               self 
         end 
         
         def to_s
          self 
         end 
         
         alias_method :to_str, :to_s
 end
```
note: nếu bạn đang sử dụng gem faraday bạn cần thêm 1 method downcase nữa, vì gem faraday downcase tất cả key rồi mới đẩy sang HTTP::NET
```ruby
class ImmutableKey < String 
         def capitalize 
               self 
         end 
         
         def to_s
          self 
         end 
         
         def downcase
          self
         end
         
         alias_method :to_str, :to_s
 end
```

Như vậy chúng tôi đã custom NET::HTTP để truyền key vào header như chúng tôi mong muốn, hy vọng có thể giúp ích cho các bạn

link tham khảo: https://jatindhankhar.in/blog/custom-http-header-and-ruby-standard-library/