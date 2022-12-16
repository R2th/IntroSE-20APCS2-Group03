Đa phần người dùng khi truy cập một trang web nếu có tốc độ quá chậm thì hầu như họ sẽ chuyển sang trang khác hoặc không muốn truy cập lại, chúng ta dễ bị nản bởi thời gian load ảnh, video mà mất tới vài giây. Để tăng tốc độ tải thì chúng ta sẽ sử dụng cache, nó làm giảm độ trễ, tăng tốc độ tải resources, giảm bớt công việc cho server, tiết kiệm chi phí, ...

# Giới thiệu
Bạn có thể hiểu đơn giản cache là bộ nhớ đệm, nó có thể là phần cứng hoặc phần mềm được sử dụng để lưu trữ dữ liệu tạm thời. Theo như mình biết thì việc Caching được lưu vào cache dưới dạng nhị phân. Thay vì với mỗi request, server lại phải trả về những tài nguyên thường xuyên được sử dụng thì chúng ta sẽ lưu trữ chúng vào cache, những lần load sau thì người dùng sẽ lấy những tài nguyên đã được lưu vào cache, giúp giảm công việc phải làm cho server.

## Thuật ngữ
Trước khi đi vào chi tiết thì mình sẽ nói qua những thuật ngữ được sử dụng trong bài:

- **Client**: phía người gửi request.
- **Origin Server**: chứa tất cả nội dung theo yêu cầu của client và thực hiện các request.
- **Stale Content**: nội dung đã cached và hết hạn.
- **Fresh Content**:  là nội dung có sẵn trong cache và chưa hết hạn.
- **Cache Validation**: kiểm tra tính hợp lệ của nội dung được lưu trong cache và cập nhật nó khi hết hạn.
- **Cache Invalidation**: là quá tình loại bỏ nội dung cũ trong cache.

## Caching Locations
Web cache có thể share hoặc private phụ thuộc vào mục đích sử dụng, dưới đây là list caching locations:

- Browser Cache
- Proxy Cache
- Reverse Proxy Cache

# Browser Cache
Bạn có thể nhận thấy rằng khi bạn nhấp vào nút back trong trình duyệt của mình, sẽ mất ít thời gian hơn để tải trang so với thời gian tải trong lần tải đầu tiên, đây là cache của trình duyệt được sử dụng. Browser cache là một trong những nơi được sử dụng thường xuyên nhất cho caching.

Browser cache bị giới hạn chỉ một người dùng và không giống như các loại cache khác, nó có thể được lưu private.

# Proxy Cache
Không giống như Browser Cache phục vụ một người dùng, bộ đệm proxy có thể phục vụ hàng trăm người dùng khác nhau truy cập vào cùng một nội dung và chúng thường được triển khai ở cấp độ rộng hơn.

# Reverse Proxy Cache
Reverse Proxy Cache hoặc surrogate cache được triển khai gần với origin server để giảm tải cho server. Không giống như Proxy Cache được ISP triển khai để giảm mức sử dụng băng thông trong network, surrogates hoặc reverse proxy caches được triển khai gần với origin server bởi server administrators để giảm tải cho server.

Mặc dù bạn có thể kiểm soát được reverse proxy caches, nhưng cũng không thể tránh hoặc kiểm soát browser và proxy caches. Nếu như website không được cấu hình đúng cách, nó vẫn sẽ được cached bằng cách sử dụng bất kỳ giá trị mặc định nào được set trên cache.

# Caching Headers
Vậy làm cách nào để kiểm soát web cache ? Bất cứ khi nào server trả về dữ liệu, nó sẽ đi kèm với HTTP headers để "hướng dẫn" cache được lưu trữ như thế nào và nó phải phù hợp để lưu trữ content.

# Expires
Expires nhằm mục đích cho biết cache có thời hạn lưu trữ là bao lâu, ví dụ:
```
Expires: Sun, 14 Jun 2020 22:28:50 GMT
```
Cần lưu ý là ngày không được lớn hơn 1 năm so với hiện tại và nếu format sai, nội dung cũng được coi là đã cũ. Ngoài ra, thời gian trên cache cũng phải được đồng bộ với thời gian trên server.

# Cache-Control
Cache-Control xác định thời gian và nội dung được lưu trong cache như thế nào. Giá trị có nó có thể đặt được nhiều, hãy xem xét đặt giá trị sao cho phù hợp.

## Private
Đặt cache thành `private` có nghĩa là content sẽ không được lưu trong bất kỳ proxies nào và nó sẽ chỉ được cached bởi client.
```
Cache-Control: private
```
Đừng nhầm lẫn rằng setting header sẽ làm cho data được an toàn hơn, bạn vẫn cần sử dụng SSL.

## Public
Nếu set là `public`, ngoài việc lưu cache ở phía client, nó còn có thể được cache bởi proxies, phục vụ nhiều người dùng khác.
```
Cache-Control: public
```

## no-store
`no-store` xác định content sẽ không được lưu vào cache

## no-cache
`no-cache` cho biết rằng chace có thể được duy trì nhưng content được lưu trong cache sẽ được validate lại từ server.
```
Cache-Control: max-age=3600, no-cache, public
```

## max-age: seconds
`max-age` xác định số giây cho mỗi content sẽ được cache. Ví dụ, nếu `cache-control` trông như thế này:
```
Cache-Control: max-age=3600, public
```
Nó có nghĩa là content được public và có thời hạn là 60 phút.

## s-maxage: seconds
`s-maxage` với `s-` là viết tắt của shared. Lệnh này đặc biệt nhằm vào các bộ nhớ cache được public. Giống như `max-age`
, nó cũng lấy ra số giây được lưu vào cache. Nếu có, nó sẽ ghi đè `max-age` và `expires` header cho việc shared caching.
```
Cache-Control: s-maxage=3600, public
```

## must-revalidate
`must-revalidate` thỉnh thoảng xảy ra khi bạn gặp vấn đề về network và content không thể lấy về từ server, browser có thể phục vụ content cũ mà không cần validation.

Nếu có lệnh này, nó có nghĩa là content cũ không được phục vụ trong mọi trường hợp và dữ liệu phải được re-validated từ phía server trước khi phục vụ.
```
Cache-Control: max-age=3600, public, must-revalidate
```

## proxy-revalidate
`proxy-revalidate` gần giống với `must-revalidate` nhưng nó chỉ định cho shared hoặc proxy caches.

## Mixing values
Bạn có thể combine chúng theo nhiều cách khác nhau, tuy nhiên `no-cache/no-store` và `public/private` là ngoại lệ. Nếu bạn đặt cả `no-store` và `no-cache`, `no-store` sẽ được ưu tiên hơn `no-cache`.
```
Cache-Control: no-store, no-cache
```
Đối với `private/public`, với bất kì request nào chưa được xác thực, cache được coi như là `public` và với bất kỳ cache nào đã được xác thực thì sẽ được coi như là `private`.

# Validators
Nãy giờ mình chỉ nói về cách content được lưu trong cache được coi là mới, nhưng chưa nói về cách client validateion từ server. Bây giờ mình sẽ nói về các headers sử dụng cho mục đích này:

## ETag
Etag đã được giới thiệu trong HTTP/1.1, nó chỉ là một cái để định danh duy nhất mà server attach với một số resource. Etag sau đó được sử dụng bởi client  đẻ thực hiện các request HTTP có điều kiện.

Bạn có thể hiểu là: "Hãy cung cấp cho tôi resource này nếu ETag không giống với ETag mà tôi có" và content được download chỉ khi Etag không hợp lệ.

Method mà ETag được tạo không được chỉ mô tả trong HTTP docs và thường một số hàm băm sử dụng để gán etag cho từng version của resource. Có 2 loại etag đó là mạnh và yếu:
```
ETag: "j82j8232ha7sdh0q2882" - Strong Etag
ETag: W/"j82j8232ha7sdh0q2882" - Weak Etag (prefixed with `W/`)
```
- ETag mạnh có nghĩa là 2 resouces là hoàn toàn giống nhau và không có sự khác biệt nào giữa chúng. Trong khi một ETag yếu có nghĩa là 2 tài nguyên mặc dù không hoàn tòan giống nhau nhưng có thể được coi là giống nhau.

## Last-Modified
Server có thể bao gồm `Last-Modified` header cho biết ngày và thời gian mà một số content được sửa đổi lần cuối.
```
Last-Modified: Wed, 15 Mar 2017 12:30:26 GMT
```

Khi content đã cũ, client sẽ tạo request có điều kiện bao gồm thời gian sửa đổi lần cuối mà nó có trong header có tên là `If-Modified-Since` tới server để update `Last-Modified`, nếu nó matches với ngày mà client có, `Last-Modified`cho content được update để được coi là mới trong n giây nữa. Nếu `Last-Modified` nhận được không khớp với cleint, content sẽ được tải lại từ server và replace với content mà client có.
```
If-Modified-Since: Wed, 15 Mar 2017 12:30:26 GMT
```

# Tổng kết
Không có quy tắc vàng hoặc các tiêu chuẩn về caching policy, mỗi application đều khác nhau và bạn cần phải xem xét những option phù hợp nhất cho ứng dụng. Hy vọng bài viết sẽ hữu ích cho bạn. Happy coding !!! <3 <3 <3