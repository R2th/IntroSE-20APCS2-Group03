Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/developerinsider/best-ios-development-tips-and-tricks-6c42c1d208c1

### 1. Theo dõi thời gian built của XCode
Nếu bạn không biết chính xác thời gian *built* của *project*, bạn có thể kích hoạt chức năng dưới đây trong XCode
```
defaults write com.apple.dt.Xcode ShowBuildOperationDuration -bool YES
```

![](https://images.viblo.asia/22a91e33-8cad-4895-8c35-81c7e7cc8077.png)

### 2. Cải thiện tốc độ built của Swift project
Trong ghi chú của bản phát hành *XCode 9.2*  có đề cập đến một chức năng thử nghiệm có thể cải thiện thời gian *built* của *Swift*, chức năng này được kích hoạt như sau
```
defaults write com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively -bool NO
```
Chú ý: đây mới chỉ là chức năng thử nghiệm, nó có thể làm tăng bộ nhớ trong quá trình *built*.

### 3. Sử dụng Simulator trong chế độ Full-Screen cùng với XCode
Để có thể chạy *XCode* và *iPhone Simulator* cùng nhau trong chế độ *Full-Screen* có lẽ là tính năng tôi yêu thích nhất của *XCode 9*. Bạn chỉ cần thự hiện lệnh sau trên *Terminal* để kích hoạt tính năng này:
```
defaults write com.apple.iphonesimulator AllowFullscreenMode -bool YES
```

[![Youtube Video](https://img.youtube.com/vi/YFPUgQpUmuE/0.jpg)](https://www.youtube.com/watch?v=YFPUgQpUmuE "Youtube Video")

Nếu bạn muốn sử dụng các tính năng bí mật khác của *Simulator* bạn có thể kích hoạt các tính năng ẩn sau **Internals menu**. Bạn phải tạo một thư mục rỗng với tên là **AppleInternal** trong thư mục gốc bằng lệnh dưới đây, sau đó khởi động lại *Simulator*
```
sudo mkdir /AppleInternal
```
Một *menu* mới sẽ xuất hiện.

![](https://images.viblo.asia/a2f9142e-6da3-4f29-a299-bde74fe46b0f.png)

### 4. Capture video sử dụng Simulator
Bạn có thể chụp một *screenshot* hoặc quay một video của *Simulator window* dùng tiện ích dòng lệnh *xcrun*. Để tiến hành record một video bạn có thể thực thi lệnh dưới đây:
```
xcrun simctl io booted recordVideo <filename>.<file extension>.
```
Ví dụ:
```
xcrun simctl io booted recordVideo appvideo.mov
```
Bấm *Ctrl + c* để dừng việc record video. Vị trí mặc định lưu video vừa record là thư mục hiện hành trên *Terminal*.
### 5. Chia sẻ file giữa Simulator và Finder
Từ *XCode 9*, *Simulator* có *Finder extension* cái mà sẽ cho phép bạn chia sẻ trực tiếp file từ *Finder*. Tuy nhiên, việc kéo thả file vào *Simulator* dường như nhanh hơn.

[![Youtube Video](https://img.youtube.com/vi/G7gpQQ49mhA/0.jpg)](https://www.youtube.com/watch?v=G7gpQQ49mhA "Youtube Video")

Bạn cũng có thể làm tương tự với ảnh và video dùng lệnh *simctl* như sau:
```
xcrun simctl addmedia booted <PATH TO FILE>
```

### 6. Dùng vân tay cho sudo
Nếu bạn muốn dùng vân tay cho việc nhập mật khẩu của lệnh *sudo*, trên Macbook Pro chỉnh sửa */etc/pam.d/sudo* và thêm lệnh sau lên trên đầu:
```
auth sufficient pam_tid.so
```
Và bạn có thể sử dụng vân tay thay cho việc nhập mật khẩu của lệnh *sudo*

### 7. Debug các ràng buộc AutoLayout với Sound Notification
Đây là một cách rất hữu hiệu để debug các ràng buộc AutoLayout. Bạn chỉ việc truyền tham số **UIConstraintBasedLayoutPlaySoundOnUnsatisfiable** , và *XCode* sẽ phát ra âm thanh khi các ràng buộc bị lỗi trong khi chương trình chạy.
```
-_UIConstraintBasedLayoutPlaySoundOnUnsatisfiable YES
```

[![Youtube Video](https://img.youtube.com/vi/G_fuCXMChp8/0.jpg)](https://www.youtube.com/watch?v=G_fuCXMChp8 "Youtube Video")

### 8. Xoá các Simulator không còn được sử dụng trong XCode nữa.
Đây là một lệnh nhỏ dùng để xoá tất cả các *Simulator* không còn khả dụng trong XCode nữa.
```
xcrun simctl delete unavailable
```