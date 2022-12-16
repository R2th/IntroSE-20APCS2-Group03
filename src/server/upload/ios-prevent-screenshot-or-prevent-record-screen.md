# I. Vấn đề
Nhóm mình gặp phải một vấn đề là làm thế nào để ngăn chặn người dùng chụp màn hình hay quay video trên iOS. Tức nhiên là loại bỏ những trường hợp như dùng 1 máy khác để quay hay chụp hình rồi. Thì sau một thời gian tìm hiểu, nhóm mình đã đi đến kết luận thế này. Tức nhiên nếu ai có phương pháp giải quyết, nhóm mình cũng muốn tiếp thu.<br/>
# II. Chặn chụp màn hình
Tại thời điểm hiện tại, nhóm mình tìm hiểu thì kết quả là gần như 100% là không thể ngăn chặn việc chụp màn hình trên iOS.<br/>
Nhóm có nghĩ ra một vài phương pháp hoặc cũng đã thử nhiều hướng dẫn dựa theo tài liệu nhưng vẫn không được.<br/>

##  1. allowScreenShot

> https://www.emergingdefense.com/blog/2019/2/4/ios-secure-development-guide<br/>
> (trang 73) https://developer.apple.com/business/documentation/Configuration-Profile-Reference.pdf<br/>

Nhóm mình đã thử và không thấy kết quả.<br/>

## 2. Sửa lại ảnh sau khi chụp

> https://developer.apple.com/documentation/uikit/uiapplication/1622966-userdidtakescreenshotnotificatio<br/>
> https://developer.apple.com/documentation/photokit/phphotolibrary<br/>

Sử dụng notification userDidTakeScreenshotNotification và PHPhotoLibrary. <br/>
* Sử dụng observer để bắt sự kiện, sau khi chụp hình.
* Sau khi chụp, sử dụng PHPhotoLibrary, để tiến hành truy cập vào photo để thay đổi ảnh vừa chụp.

Kết quả:
* Có thể thay đổi ảnh vừa chụp nhưng app lúc nào cũng hiện thị alert confirm. Nên điều này là không đáp ứng được 100% yêu cầu.

![](https://images.viblo.asia/3c3d22b9-1ca6-4a6c-aa5a-62984a418c5a.PNG)

# III. Chặn quay phim
## 1. capturedDidChangeNotification

> https://developer.apple.com/documentation/uikit/uiscreen/2921652-captureddidchangenotification

Sử dụng notification capturedDidChangeNotification và UIScreen.main.isCaptured. 
Lưu ý là chỉ áp dụng từ iOS 11 trở lên. 

Kết quả: dựa trên nhưng event đó chúng ta có thể thực hiện việc chê thông tin nhạy cảm. Mặc dù không thể được như Netfix hay HBO nhưng vẫn coi như là tạm chấp nhận được.

## 2. FairPlay Streaming

Tài liệu:<br/>
https://developer.apple.com/streaming/fps/<br/>

> Secure the delivery of streaming media to devices through the HTTP Live Streaming (HLS) protocol. Using FairPlay Streaming (FPS) technology, content providers, encoding vendors, and delivery networks can encrypt content, securely exchange keys, and protect playback on iOS, tvOS, and macOS.

Bộ SDK này thì nhóm mình chưa có cơ hội thử nghiệm, tuy nhiên theo tìm hiểu thì nó có vẻ chỉ áp dụng cho video streaming và cần liên hệ Apple để Apple ưu ái.

# IV. Khác
Ngoài các cách trên thì nhóm cũng có research ra https://screenshieldkit.com. Xem qua demo có vẻ được. Tuy nhiên có vẻ như một điều nhóm mình không tin tưởng vào SDK này lắm. Vì các bài blog toàn từ năm 2018 trở về trước, không thấy các hãng công nghệ sử dụng, không public Price và đồng thời tìm hiểu trên https://stackoverflow.com. Có người bình luận rằng, nó cũng sử dụng FairPlay Streaming.

# V. Kết luận
Nhóm chỉ thực hiện việc chặn quay màn hình, còn chặn chụp hình thì gần như bó tay trên iOS. Đó là khó khăn cho iOS nhưng Android thì có vẻ như thuận lợi hơn khi đã hỗ trợ từ API 1 thì phải.<br/>

Một số nguồn:<br/>
https://developer.apple.com/business/documentation/Configuration-Profile-Reference.pdf<br/>
https://www.emergingdefense.com/blog/2019/2/4/ios-secure-development-guide<br/>
https://screenshieldkit.com<br/>
https://medium.com/nomtek/screenshot-preventing-on-mobile-apps-9e62f51643e9<br/>
https://github.com/hawkup/react-native-prevent-screenshot<br/>
https://www.netguru.com/codestories/how-to-prevent-users-from-taking-screenshots<br/>