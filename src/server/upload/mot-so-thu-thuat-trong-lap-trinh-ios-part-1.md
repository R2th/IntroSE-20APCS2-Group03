# 1. Hiển thị thời gian build trên Xcode
Nếu bạn đang không biết project của mình build trong vòng bao lâu, bạn có thể enable tính năng hiển thị build time trên Xcode bằng cách thực hiện câu lệnh sau trong Terminal:

```
defaults write com.apple.dt.Xcode ShowBuildOperationDuration -bool YES
```

Kết quả thu được sẽ như sau:
![](https://images.viblo.asia/9d89a2c1-5f04-49a7-85ba-2c4cd7aaebfb.png)

# 2. Cải thiện thời gian build của Swift project
Trong Release notes của Xcode 9.2 có đề cập đến một tính năng đang được thử nghiệm có thể cải thiện được thời gian build của project Swift, người dùng có thể kích hoạt nó thông qua "BuildSystemScheduleInherentlyParallelCommandsExclusively", trong Terminal chúng ta gõ câu lệnh như sau:

```
defaults write com.apple.dt.Xcode BuildSystemScheduleInherentlyParallelCommandsExclusively -bool NO

```

Lưu ý: Theo như Release notes cũng có nói việc sử dụng tính năng thử nghiệm này có thể làm tăng mức sử dụng bộ nhớ khi build project.

# 3. Sử dụng Simulator ở chế độ Full-Screen
Với Xcode 9 bạn có thể chạy Xcode và Simulator cùng lúc ở chế độ Fullscreen. Bạn có thể thực hiện lệnh sau trong Terminal để enable tính năng này:

```
defaults write com.apple.iphonesimulator AllowFullscreenMode -bool YES

```

Bạn có thể xem video sau để hình dung rõ nét hơn [https://www.youtube.com/watch?v=38LNXk_oTak](https://www.youtube.com/watch?v=38LNXk_oTak)

Ngoài ra nếu bạn muốn sử dụng thêm một vài tính năng ẩn của Simulator, bạn có thể bật Apple hidden Internals menu bằng cách tạo một thư mục rỗng có tên "AppleInternal" ở thư mục Root với chạy câu lệnh dưới đây và khỏi động lại Simulator:

```
sudo mkdir /AppleInternal

```
Một menu sẽ hiện ra như sau:

![](https://images.viblo.asia/2ca9f8e8-a9e3-41a2-928a-e2ced4da85eb.png)

# 4. Quay video màn hình của Simulator:
Chắc hẳn không ít trong số các bạn đều đã biết sử dụng tổ hợp phím Cmd+S để chụp ảnh Screenshot của Simulator. Bằng câu lệnh sau đấy chúng ta có thể quay lại video màn hình của Simulator:

```
xcrun simctl io booted recordVideo <filename>.<file extension>.

```

Ví dụ như sau:

```
xcrun simctl io booted recordVideo Demovideo.mov

```

Nhấn tổ hợp phím "Control+C" để dừng quay video. Thư mục mặc định mà video sẽ được lưu là thư mục hiện tại trên Terminal.

# 5. Share file đến Simulator từ Finder

Từ Xcode 9, Simulator đã được trang bị Finder extension cho phép chúng ta chia sẻ file ngay từ của sổ Finder, tuy nhiên thao tác drag và drop một file từ Finder vào Simulator là tiện dụng hơn cả:

Thao khảo video sau để hình dung rõ hơn về cách hoạt động:
[https://www.youtube.com/watch?v=G7gpQQ49mhA](https://www.youtube.com/watch?v=G7gpQQ49mhA)

Tuy nhiên với ảnh/video bạn có thể sử dụng cách đơn giản hơn với câu lệnh simctl như sau:

```
xcrun simctl addmedia booted <PATH TO FILE>

```

# 6. Sử dụng vân tay để cấp quyền sudo
Nếu bạn muốn sử dụng dấu vân tay để cấp quyền mỗi khi sử dụng lệnh sudo trên Macbook Pro (tất nhiên là Macbook của bạn phải là phiên bản có hỗ trợ vân tay) thì bạn có thể sửa file /etc/pam.d/sudo và thêm dòng sau vào:

```
auth sufficient pam_tid.so

```

Chúc mừng, bây giờ bạn đã có thể sử dụng dấu vân tay để sudo.

# 7. Debug cho AutoLayout constraints với Sound Notification
Và đây là một cách tuyệt vời để debug các constraint của AutoLayout. Trong build scheme, chỉ cần truyền vào đối số "UIConstraintBasedLayoutPlaySoundOnUnsatisfiable" trong "Argument passed on Launch" và Simulator sẽ phát ra âm thanh khi các ràng buộc bị lỗi khi chạy.

![](https://images.viblo.asia/1abba4fe-097a-425d-932a-c8e2e7df5eea.png)

Tham khảo video sau để rõ hơn cách thực hiện: [https://www.youtube.com/watch?time_continue=2&v=G_fuCXMChp8](https://www.youtube.com/watch?time_continue=2&v=G_fuCXMChp8)

# 8. Loại bỏ các Simulator không khả dụng:

Các Simulator không khả dụng ở đây là các simulator không còn được support bởi version hiện tại của Xcode mà chúng ta đang sử dụng, chỉ cần sử dụng lệnh sau để loại bỏ chúng:

```
xcrun simctl delete unavailable

```


Trên đây tôi vừa đề cập đến 8 tricks nhỏ trong lập trình iOS các bạn có thể dùng đến, vậy đâu là cách mà các bạn đã/đang/sẽ/yêu thích sử dụng, đừng ngại comment/chia sẻ/góp ý bằng cách comment bên dưới.