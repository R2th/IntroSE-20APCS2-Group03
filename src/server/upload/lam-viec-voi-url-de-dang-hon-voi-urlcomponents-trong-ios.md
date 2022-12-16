# I. Giới thiệu

Hiện nay, việc tương tác với server là điều gần như ứng dụng mobile nào cũng có. Tương tác với server nhiều cũng đồng nghĩa với việc chúng ta phải làm việc với url nhiều. Để tạo một url là việc tương đối đơn giản, chúng ta chỉ cần gọi hàm URL(string: ) và ném vào hàm này url string để tạo URL. Tuy nhiên, để phân tích các thành phần trong url, và lấy ra các thành phần đó, hoặc thêm một vài thành phần nào đó vào url thì lại là một chuyện khác. Trong bài viết này, tôi xin giới thiệu về URLComponents, thứ sẽ giúp chúng ta làm việc với URL đơn giản hơn trong iOS

# II. Nội dung

## 1. Cấu trúc url

Đầu tiên, chúng ta cần tạo 1 Playground để tiện viết sample code và tìm hiểu về nội dung bài. Các bạn mở Xcode, chọn file -> New -> Playground -> đặt tên bất kỳ cho playground và bấm create để tạo.

Bây giờ, chúng ta cần tìm hiểu về cấu trúc của 1 url. Cấu trúc của url có dạng như hình sau:

![](https://images.viblo.asia/e34b3ae6-c630-46cc-a8d4-17709a9a231f.png)

Đây là dạng full gồm tất cả các component của url. Thông thường, chúng ta thường gặp các url có dạng như sau:

```swift
http://viblo.asia/test/path
```

trong url trên:
* scheme: http
* hostname: viblo.asia
* path: test/path

Trong iOS, cụ thể là với ngôn ngữ Swift, struct URL đã bao gồm rất nhiều property, trong đó có các property là các component của url, vì thế chúng ta có thể lấy các thành phần của url ra một cách dễ dàng.

Các bạn mở playground lên và thêm code như sau:
```Swift
var url = URL(string: "http://viblo.asia/test/path")!

print(url.scheme)
print(url.host)
print(url.path)
print(url)
```

Kết quả của đoạn code này hiển thị ngay bên phải playground như hình sau:

![](https://images.viblo.asia/c5e07813-5a15-457f-9e41-53b767b84214.png)

Như chúng ta thấy, việc lấy các component trong url là rất đơn giản, khi sử lý các bạn chỉ cần chú ý về optional của các property trong URL là được. 

Tuy nhiên, nếu giờ chúng ta muốn thay đổi host của url bên trên thì sao? các bạn thử thêm code sau vào playground ngay bên dưới đoạn code bên trên:

```Swift
url.host = "framgia.com.vn"
```

Lúc này, chúng ta sẽ nhận được lỗi, với nội dung lỗi đại loại là property host là dạng property get-only, chúng ta chỉ có thể get chứ không thể set value cho property này. Vậy là chúng ta không thể thay đổi các component của url. Khi chúng ta rơi vào trường hợp này, chúng ta cần thay đổi một hoặc nhiều component của url, thì đây là lúc chúng ta cần dùng đến URLComponents

## 2. URLComponents

Như đã nói ở trên, khi chúng ta cần làm việc nhiều hơn với các component trong URL, chúng ta cần sử dụng URLComponents. Có nhiều cách để tạo một instance của URLComponents, chúng ta có thể tạo trực tiếp từ URL. Bây giờ, để giải bài toán thay đổi host ở bên trên, các bạn thêm code sau vào playground:

```Swift
var components = URLComponents(url: url, resolvingAgainstBaseURL: true)
components?.host = "framgia.com.vn"

print(components?.url)
```

Kết quả, chúng ta có một url mới như sau:

```
http://framgia.com.vn/this/is/test/path
```

Ok, vậy là chúng ta đã có thể thay đổi host trong url. ngoài host ra, các bạn còn có thể thay đổi, thêm, bớt các component khác của url.

```Swift
components?.path = "/this/is/test/path"
print(components?.url)
```


Việc thêm các components vào url khi sử dụng URLComponents rất đơn giản, chúng ta không phải thêm các ký tự như “?”, “#”, “:”,… vào component. Ví dụ, để thêm fragment, chúng ta làm như sau:
```Swift
components?.fragment = "fragment"

print(components?.url)
```

Kết quả chúng ta có được url như sau:
```
http://framgia.vn/this/is/test/path#fragment
```
Bên trên, chúng ta không cần thêm ký tự “#” vào fragment, ký tự này sẽ được tạo ra bởi URLComponents. Việc thêm query vào URLComponents có phần phức tạp hơn một chút, nhưng vẫn hết sức đơn giản như sau:

```Swift
let queryItemToken = URLQueryItem(name: "token", value: "12345")
let queryItemQuery = URLQueryItem(name: "query", value: "test query")
components?.queryItems = [queryItemToken, queryItemQuery]

print(components?.url)
```

Kết quả url nhận được:
```
http://framgia.vn/this/is/test/path?token=12345&query=test%20query#fragment
```

Như các bạn thấy ở kết quả trên, việc quản lý url trở nên cực kỳ đơn giản, chúng ta không còn phải thêm thủ công các ký tự như “?”, “#”, “&”,… để phân tách từng component của url, không phải mất công ngồi kiểm tra xem format trong url của mình đã đúng chưa. Tất cả việc bây giờ cần làm là ném các phần component vào các phần tương ứng của URLComponents, và việc quản lý các component thì để URLComponents lo.

# III. Tổng kết

Trên đây tôi đã giới thiệu với các bạn về các components của URL, về URLComponents và cách sử dụng URLComponents trong iOS. Hi vọng bài viết này sẽ giúp ích được các bạn khi làm việc với URL trong quá trình phát triển ứng dụng.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này. Have a nice day ^_^!