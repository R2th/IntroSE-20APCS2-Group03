Extension ược hiểu là những tiện ích mở rộng của trình duyệt web nhằm bổ sung tính năng cho trình duyệt cũng như cung cấp thêm nhiều tuỳ chọn cá nhân khi sử dụng trình duyệt cho người dùng. 

IE và Firefox có những extension từ rất sớm, tuy nhiên do sự phát triển mạnh mẽ của Google cũng như Google Chrome khiến lượng lập trình viên quan tâm đến nó ngày càng lớn, và extension dành cho Chrome cũng không nằm ngoài sự quan tâm đó. 

Hiện nay số lượng extension trong cửa hàng của Chrome rất lớn và không ngừng tăng. Đã bao giờ bạn tự hỏi tạo ra được một thứ như vậy có khó không? Vậy hãy thử tìm hiểu xem cách xây dựng chúng như thế nào ở dưới đây nhé.

*Đây là bài viết xây dựng một extension từ đầu, vì vậy chúng ta nên nắm được những kiến thức  tổng quát. Tuy nhiên, trong bài có sử dụng ReactJs, nếu bạn đã sử dụng ReactJs hay đang tìm hiểu thì càng tốt, còn chưa thì hãy thử xem sao.*

# Cấu trúc của một Chrome Extension
## Tổng quan
Extension được xây dựng từ các file html, css, js, ... 

Về cơ bản có thể tưởng tượng nó giống như một giao diện website cơ bản, tuy nhiên cấu trúc của extension có khác một chút. Cụ thể:
#### Giao diện hiển thị
Giao diện hiển thị của một extension được chia làm hai phần chính:
1. Browser action: bao gồm nút mở popup và popup, thường được tạo ra khi cần những hành động tương tác đến hầu hết các trang khác.
![](https://images.viblo.asia/eca29205-3ff6-4262-9cc7-ba43e1e65072.png)
*Danh sách các icon extension của mình...*
![](https://images.viblo.asia/ce93f310-9722-494c-9e13-c02695c051b1.png)
*Khi click vào icon Chat++ sẽ mở ra giao diện popup*
3. Page action: gồm những trang web được tạo ra khi cần những hành động tương tác riêng đến trang nào đó.
    ![](https://images.viblo.asia/1661267e-f086-4844-b37f-68e52be26a49.png)
    *Từ popup Chat++ bấm Setting*
#### Files
1. manifest.json: đây là file quan trọng có định dạng json chứa những thông tin cơ bản về cấu hình của một extension để trình duyệt Chrome có thể nhận dạng.
Ví dụ: phiên bản manifest, tên extension, các file js theo chức năng, những trang web mà extension có thể tương tác đến, ... 
```json
{
    // Ví dụ về cấu trúc của file manifest.json
    "manifest_version": 2,
    "short_name": "",
    "name": "",
    "version": "",
    "permissions": ["tabs"],
    "background": {
        "scripts": ["js/background.js"]
    },
    "content_scripts": [
        {
        "matches": ["https://abc.xyz/*"],
        "css": [],
        "js": ["js/content/app.js"]
        }
    ],
    "browser_action": {
        "default_popup": "public/popup.html",
        "default_title": ""
    },
    "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
}

```
2. Các file html, css, js,... để xử lý ngầm và tạo ra giao diện

## Cấu trúc
![](https://images.viblo.asia/c1430ba3-b869-46bd-a82d-d4dee0530789.png)
Từ file manifest.json trên kia, bạn có thể mường tượng ra cấu trúc của một extension sẽ có những phần chính:
#### UI page
Extension có thể chứa những trang HTML thông thường nhằm hiển thị UI của extension.
Ví dụ như một browser action có một popup cũng xây dựng bằng html. Ngoài ra khi sử dụng tabs.create hoặc window.open() có thể tạo ra override page html khác.

Có thể xem lại hai hình ảnh của Chat++ extension ở trên để có thể thấy cụ thể.
#### Background
![](https://images.viblo.asia/05c867bb-bf07-4862-90b3-c65cf3c626f4.png)
Background gồm những đoạn script điều khiển các sự kiện, ví dụ trình duyệt kích hoạt, đóng tab, mở tab, ...
#### Content script
![](https://images.viblo.asia/a19ed8b8-03c2-40ff-87d4-8b5b15329be0.png)
Đây là những đoạn script giúp tương tác trực tiếp tới website được khai báo trong manifest, nó sẽ giúp bạn lấy thông tin, thêm sửa xoá các trường tuỳ ý, điều mà script trong background không làm được.

Vậy content script có thể tương tác với background script hay không? Các bạn có thể xem hình dưới:

![](https://images.viblo.asia/f6807b34-0bf1-43eb-9241-753e1ca8328d.png)
Content script không hoàn toàn độc lập với background và popup. Nó có thể trao đổi thông điệp với extension thực hiện những công việc khác nhau.


# ReactJs 
Sau khi đã hiểu sơ qua cấu trúc của một extension, các bạn có thể thấy extension được tạo ra chủ yếu bằng code js, ở đây ReactJs về bản chất vẫn là js nên mình muốn thử làm khác bình thường một chút, phần vì muốn tận dụng cấu trúc components khá là tiện, và còn để ... luyện tay =)) 

Một số yếu tố cơ bản cần nắm được khi sử dụng:
#### Components
* Tách UI thành nhiều phần có tính tương tác cao
* Có trạng thái và có thể sử dụng lại
#### JSX
* Cho phép viết các mã HTML trong Javascript
* Nhanh hơn: tối ưu khi biên dịch sang javascript
* An toàn hơn: biên dịch trước khi chạy, dễ phát hiện lỗi

#### DOM ảo
![](https://images.viblo.asia/725dafbe-1b51-42f3-a81a-c158bc1c570e.png)

*Các bạn có thể tham khảo thêm ở bài viết [này](https://viblo.asia/p/hieu-sao-ve-virtual-dom-trong-reactjs-bWrZngDblxw) để hiểu cụ thể hơn về DOM ảo*
#### State vs Props
* Props: giúp các component tương tác với nhau, component nhận input gọi là props, và trả thuộc tính mô tả những gì component con sẽ render. Prop là bất biến.
* State: thể hiện trạng thái của ứng dụng, khi state thay đồi thì component đồng thời render lại để cập nhật UI.

# Xây dựng extension (Phần sau)
Mình sẽ tiếp tục cập nhật phần 2 - Từng bước xây dựng một extension bằng ReactJs từ việc khởi tạo project cho đến đưa extension lên trình duyệt sớm. Cám ơn các bạn đã theo dõi.

Tham khảo: https://developer.chrome.com/extensions

Update: Phần 2 [Xây dựng một Chrome Extension bằng ReactJs - Xem điểm cá nhân Unipos](https://viblo.asia/p/xay-dung-mot-chrome-extension-bang-reactjs-xem-diem-ca-nhan-unipos-3P0lPQOn5ox)