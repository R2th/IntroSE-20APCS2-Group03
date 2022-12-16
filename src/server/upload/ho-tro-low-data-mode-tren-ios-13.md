Cùng với iOS 13, Apple đã cho ra mắt tính năng Low Data Mode. Tính năng này cho phép người dùng giới hạn lượng dữ liệu mạng có thể sử dụng bởi các ứng dụng trên điện thoại. Tính năng này có thể được thiết lập trong ứng dụng Settings. Khi tính năng Low Data Mode được bật, các ứng dụng trên điện thoại sẽ điều tiết lưu lượng mạng cho phù hợp với nhu cầu trong trường hợp kết nối mạng chậm hay không ổn định.

Đối với các nhà phát triển, Apple khuyến nghị nên áp dụng Low Data Mode cho các chức năng không có hoặc có ít ảnh hưởng tới trải nghiệm người dùng, ví dụ: giới hạn lượng dữ liệu prefetching và syncing để tránh tạo các request mà kết quả không được hiển thị cho người dùng.

# Thiết lập Low Data Mode cho từng request
Chúng ta có thể thiết lập Low Data Mode cho từng request bằng cách:
```
guard let url = URL(string: "https://someresource.com")
  else { return }
 
var request = URLRequest(url: url)
request.allowsConstrainedNetworkAccess = false
```
Khi request này được gửi đi với chế độ Low Data Mode được bật, nó sẽ trả về lỗi URLError với thuộc tính networkUnavailableReason là .constrained. Vì vậy, bất cứ khi nào request thất bại với lỗi như trên, chúng ta có thể yêu cầu một tài nguyên chiếm dụng ít dung lượng hơn (ví dụ ảnh có độ phân giải thấp hơn):
```
URLSession.shared.dataTask(with: request) { data, response, error in
  if let error = error {
    if let networkError = error as? URLError, networkError.networkUnavailableReason == .constrained {
      // make a new request for a smaller image
    }
        
    // The request failed for some other reason
    return
  }
 
  if let data = data, let image = UIImage(data: data) {
    // image loaded succesfully
    return
  }
 
  // error: couldn't convert the data to an image
}
```

# Thiết lập Low Data Mode cho toàn bộ URLSession
Việc thiết lập Low Data Mode cho từng request là cực kỳ nhàm chán và mệt mỏi, khi mà số lượng request trong một ứng dụng có thể lên tới hàng trăm loại. May mắn là chúng ta có thể thiết lập việc khống chế truy cập mạng ở chế độ dữ liệu thấp cho toàn bộ `URLSession`. Chúng ta cần khởi tạo một instance `URLSession` riêng thay vì sử dụng instance `URLSession.shared`:
```
var configuration = URLSessionConfiguration.default
configuration.allowsConstrainedNetworkAccess = false
let session = URLSession(configuration: configuration)
```

# Thiết lập Low Data Mode cho dữ liệu đa phương tiện
Dữ liệu đa phương tiện (âm thanh, video, …) là một nguồn tiêu tốn tài nguyên rất lớn trong mỗi ứng dụng. Để áp dụng giới hạn Low Data Mode cho dữ liệu này, chúng ta chỉ cần gán `AVURLAssetAllowsConstrainedNetworkAccessKey` thành *false* và `AVPlayer` sẽ tự động giải quyết phần việc còn lại:
```
guard let mediaUrl = URL(string: "https://yourdomain.com/media.mp4")
  else { return }
 
let asset = AVURLAsset(url: mediaUrl, options: [AVURLAssetAllowsConstrainedNetworkAccessKey: false])
```

Bên cạnh việc hỗ trợ Low Data Mode, Apple cũng giới thiệu một cách ngăn chặn việc sử dụng quá nhiều dung lượng bởi ứng dụng. Chúng ta có thể thiết lập thuộc tính `allowsExpensiveNetworkAccess` cho `URLSession` hay `URLRequest`, hoặc `AVURLAssetAllowsExpensiveNetworkAccessKey` cho `AVURLAsset`.

# Tài liệu tham khảo
https://www.donnywals.com/supporting-low-data-mode-in-your-app/#targetText=Together%20with%20iOS%2013%2C%20Apple,available%20in%20the%20settings%20app.