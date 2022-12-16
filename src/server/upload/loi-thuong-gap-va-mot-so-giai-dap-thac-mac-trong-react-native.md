Mưa đã có ô, nắng đã có mủ, bọ bug đã có Viblo :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:


![](https://images.viblo.asia/108c1397-bdd0-4162-87f5-fed719ade312.jpg)

Có rất nhiều loại bọ bug , dười đây là một số liệt kê các loại bọ bug thường gặp nhé. Follow me =)) 
# 1. Run xcodebuild và trả về lỗi 65.
Trạng thái lỗi .

```
Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65. 
To debug build logs further, consider building your app with Xcode.app, by opening BBGame.xcodeproj
```

Ngoài việc xây dựng ứng dụng của bạn bằng Xcode IDE, bạn còn có tiện ích dòng lệnh xcodebuild có sẵn cho bạn với các bản react native hiện tại . Giả sử mã tự biên dịch tốt, công cụ này sẽ cho bạn biết là ok và báo success . ví dụ, nếu bạn thiếu hồ sơ cung cấp trong xcode  hoặc một vấn đề lỗi gì đó.

Khi nhận được mã 65, bản dựng sẽ thất bại mà không có lời giải thích nào trong build log cả . Vậy mình cần chú ý các điểm sau .
### Cách giải quết 1.

- **Giải quyết:** Luôn chắc chắn Xcode của bạn được cập nhật đầy đủ !
- **Mẹo chuyên nghiệp :** Đừng update Xcode từ cửa hàng của Apple mà hãy luôn luôn làm điều đó bằng cách tải về các bản cập nhật chính thức  từ trang web chính của Apple.
- **Trang web chính thức :** https://developer.apple.com/download/more/
- **Về lý do** không update Xcode từ Store Apple thì theo mình là như sau .

Tải xuống của mình đã bị pending nhiều lần. Mình đã phải xóa bộ nhớ cache của cửa hàng ứng dụng, khởi động lại trình nền của cửa hàng ứng dụng và khởi động lại máy tính của mình nhiều lần. Sau khi kết thúc tải thì nó chỉ cập nhật được 1 phần bổ sung của bản cập nhật. Đó là tình trạng con máy của mình khi update .

Kiểu như này. Khi bạn cập nhật là nó dựa vào bản đang có và update thêm 2,5G data bổ sung (ví dụ ) . Quá trình tải trên AppleStore không có thông số cụ thể là đả tải về được bao nhiêu dử liệu, khi bạn tắt máy hoặc màn hình ở trạng thái ngủ thì nó sẽ ngừng download và công việc trở lại khi máy của bạn sẵn sàng trở lại . 
Khi các máy chủ của Apple bị quá tải, họ bắt đầu cung cấp các mẫu dữ liệu nhỏ thủ công thông qua các gói bản địa vào máy tính của bạn. Apple muốn theo phong cách cung cấp dữ liệu chậm ngoài và điều đó có thể gây rắc rối .


Còn đối với việc bạn tải trức tiếp thì khỏi phải nói rùi. Vừa đầy đủ, biết chính xác lượng data tải về, và điều quan trọng nó không chặn bạn sử dựng Xcode phiên bản củ để tránh mất 1 khoảng thời gian đáng tiếc mà bạn không muốn để phí phạm .
### Cách giải quyết 2.
Mở Xcode sau đó chọn **File -> Project Setting** . Ở phía dưới mục **Per-User Project Setting** bạn click vào button **Advanced...** Và cuối cùng tích chọn **Xcode Default** 

Đó là 2 cách giải quyết của mình để fix xong cái bug ngu người này =)) 
# 2. Crash App khi build device mà đang connect internet.
Vấn đề này là vấn đề của RN được xây dựng để build trong giai đoạn bản Gỡ lỗi nhưng lại thay đổi nó thành bản Phát hành làm cho nó hoạt động vẫn còn phụ thuộc vào build script nên bị crack . Xem điều này để biết chi tiết.

### Cách giải quyết .

**xCode Product → Scheme → Edit Scheme**

Chuyển thành bản build Debug là được nhé .

# 3. Unable to load script from assets index.android.bundle on windows

Lỗi này thường là lỗi của android. Khi bạn build nhưng source của bạn chưa được biên dịch để phía native hiểu nên phát sinh .

### Cách giải quyết .

Trong thư mục dự án
```
mkdir android/app/src/main/assets
```

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

```
react-native run-android
```

Tên tệp đã thay đổi từ **index.android.js** thành **index.js**

# 4. Nếu dùng redux-persist mà bị Warning Async Storage.

### Cách giải quyết .

Sự thay đổi  không còn cho phép người dùng bản địa xâm nhập từ **'redux-persist/lib/storage'**. 

Thay vào đó, hãy sử dụng nhập AsyncStorage từ **import AsyncStorage from '@react-native-community/async-storage'**


# 5. Không dùng AsyncStorage để lưu dữ liệu nhạy cảm

AsyncStorage không an toàn cho dữ liệu nhạy cảm. 

AsyncStorage chỉ đơn giản là lưu dữ liệu vào tài liệu trên ổ cứng của điện thoại và do đó bất kỳ ai có quyền truy cập vào hệ thống tệp của điện thoại đều có thể đọc dữ liệu đó. 

Ít nhất là trên iOS, đúng là dữ liệu chỉ có sẵn cho ứng dụng đã viết nó, vì chính sách sandboxing của Apple. Điều này không ngăn chặn iPhone đã bẻ khóa với quyền truy cập root vào hệ thống tệp để nhận bất kỳ thứ gì họ muốn, vì AsyncStorage không mã hóa bất kỳ dữ liệu nào của nó. 

Nhưng nói chung, không lưu dữ liệu nhạy cảm vào AsyncStorage, vì lý do tương tự bạn không nên mã hóa dữ liệu nhạy cảm trong mã javascript của bạn, vì nó có thể dễ dàng được biên dịch và đọc ngược lại.

### Cách giải quyết .

Đối với dữ liệu người dùng hoặc ứng dụng rất nhạy cảm, bạn có thể thử một số nội dung như

https://github.com/oblador/react-native-keychain trên iOS (sử dụng iOS Keychain) 

Hoặc https://github.com/classapp/react-native-sensitive-info cho cả Android và iOS (sử dụng Tùy chọn chia sẻ Android và Keychain iOS).


# 7. 'config.h' file not found

### Cách giải quyết .

Đóng cửa sổ Xcode.
Sau đó ra terminal của bạn 

`cd <Project-Folder>/node_modules/react-native/third-party/glog-0.3.4`

Tiếp chạy dòng lệnh 

` ./configure`


Chạy tiếp  

`make`

Và cuối cùng chạy 

`make install`


Mở Xcode và thử build lại project nhé .
Hi vọng nó giải quyết được issuse của bạn .
    
 # 8. Cách mở react native debug với CLI 
 
 ### Cách giải quyết .
`open "rndebugger://set-debugger-loc?host=localhost&port=8081"`
    
    
# 9.  Error: Could not find iPhone 6 simulator 
    
Có nhiều nguyên nhân cho lỗi này.Nhưng tôi đả đúc kết lại 1 điều là :

 ### Cách giải quyết .
 
Vì các phiên bản củ, chưa cậph nhật version của react-native bên bạn có thể setting thủ công để build được áp bằng cách :

Vào thư mục chứa file này và open nó lên  `node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js `


Bạn quan sát trong source code có đoạn này 

> if (!version.startsWith('iOS') && !version.startsWith('tvOS'))

CHuyển nó thành
to

> if (!version.startsWith('com.apple.CoreSimulator.SimRuntime.iOS') && !version.startsWith('com.apple.CoreSimulator.SimRuntime.tvOS'))

Hi vọng nó chạy tốt đối với trường hợp của các bạn =))

# 10.  Bóng đổ style 

Một số trang web hay hổ trợ cho bạn trong style khi buildding app react native nhé . (love)

 ### Cách giải quyết .
 
 Bóng đổ :  https://ethercreative.github.io/react-native-shadow-generator/



Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . :heart_eyes::+1::+1::+1: