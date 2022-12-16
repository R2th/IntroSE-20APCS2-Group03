# Giới Thiệu:
*    Khi lập trình IOS ta thuờng xuyên phải làm việc ở các môi truờng khác nhau ví dụ như môi truờng develop hay production
*    Giữa hai môi truờng đều có sự khác nhau về cấu hình và thuờng thấy nhất là server url. Để có thế phát triển hoặc test app. Trên môi truờng develop ta sẽ sử dụng development server, và khi chúng ta release app, chúng ta cần phải chuyển đổi sử dụng server url từ development thành production
*    Việc này cũng khá đơn giản, bạn chỉ cần tạo một biến chưa chưa server url, khi cần thay đổi theo môi truờng bạn chỉ việc thay đổi biến đó, nhưng cách này sẽ có nhuợc điểm:
        
        1. Bạn phải thay đổi code của bạn nhiều lần mỗi khi bạn cần phải thay đổi cấu hình server cho từng môi truờng.
        2. Những lúc làm việc, bạn không chắc app mình đang trỏ vào url nào, bạn cần phải kiểm tra lại code của mình.

* Để giải quyết các vấn đề trên, bài viết này sẽ huớng dẫn các bạn cách thiết lập cấu hình theo từng môi truờng.

# Get Started:
* Chúng ta sẽ có 3 buớc chính:
    1. Add user defined setting trong target build setting của bạn.
    2. Thêm key trong file infor.plist sử dụng url mà bạn đã định nghĩa trong build setting.
    3. Đọc value thông qua file Info.plist trong code của bạn.

### 1. Adding Build Settings in Xcode:
*    Chọn project của bạn trong "Project Navigator", sau đó chọn target, chọn build setting và click "+" icon trên thanh bar để add user setting.

![](https://images.viblo.asia/9ffe1b05-222f-40ed-a063-31e11e4373d7.png)

* Ở đây chúng ta sẽ tạo cấu hình url server theo từng môi truờng nên sẽ đặt tên cho setting mới là "SERVER_URL". Mở chi tiết setting mới này bằng cách nhấn mũi tên. sau đó ta double click vào từng môi truờng và điền url server tuơng với môi truờng đó.

![](https://images.viblo.asia/d086a600-50a6-48c4-b374-225f5e827f4f.png)

* Buớc tiếp theo ta sẽ add key vào info.plist

### 2. Adding a Key in Info.plist:
* Ta chọn file info.plist từ project navigationbar trong xcode. Di chuyển chuột đến hàng cuối cùng và click "+" để thêm một property. Nhập "ServerUrl" vào trong key và "$(SERVER_URL)" vào phần value. File info.plist của bạn sẽ như vậy.

![](https://images.viblo.asia/c3d38020-1082-4161-b62d-f78706561d0e.png)

* Tại đây chúng ta đã truy cập giá trị cho cấu hình build mà ta vừa thêm. Khi khởi chạy, những gì trong $() sẽ đuợc thay thế theo giá trị mà ta đã định nghĩa ở trong build setting.

### 3. Read the value via Info.plist:
* Class Bundle cung cấp cho ta một method giúp truy cập giá trị đuợc định nghĩa trong file info.plist với key tuơng ứng

```
let serverUrl = Bundle.main.object(forInfoDictionaryKey: “ServerURL”) as! String
print(serverUrl)
```

* Thêm đoạn code trên vào hàm applicationDidFinishLaunching trong file AppDelegate để test.
* Các bạn hãy lựa chọn môi truờng build theo huớng dẫn sau, url Server sẽ thay đổi theo từng môi truờng.

![](https://images.viblo.asia/dbfcaa0b-7860-4415-adcc-84f43efda3de.png)
![](https://images.viblo.asia/72d2d9f8-1047-47b9-bf99-73214e005222.png)

* References: https://medium.com/@hassanahmedkhan/defining-your-own-settings-in-xcode-build-settings-1bd71539ea4f