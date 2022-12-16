# Tối ưu hoá kích thước ứng dụng IOS - Cần thiết hay không
Bạn có biết rằng so với tệp nhị phân bạn đã tải lên và kích thước cuối cùng của ứng dụng sau khi được phê duyệt cho App Store có thể lớn hơn một chút. Kích thước này tăng lên khi App Store thực hiện xử lý bổ sung trên ipa của bạn bằng cách thêm DRM để ngăn vi phạm bản quyền ứng dụng và cải tiến lại ipa.

![](https://images.viblo.asia/5c6e63ed-a906-4f8e-94fb-a5a298de33df.gif)

Trong quá trình lập trình và nhất là trong quá trình đẩy ứng dụng của mình lên AppStore, sẽ có rất nhiều vấn đề nảy sinh trong đó vấn đề về kích thước ứng dụng cũng là một vấn đề đáng chú ý của người lập trình bởi không chỉ ảnh hưởng đến quá trình đẩy ứng dụng mà còn ảnh hưởng đến user của chính ứng dụng mà bạn đẩy lên.

Sẽ không ai muốn tải một ứng dụng với dung lượng quá lơn trong khi mình laị đang sử dụng 3G hay phải ngồi hàng giờ liền chỉ để đợi down ứng dụng về máy để cài đặt. Chính vì thế bài hôm nay chúng ta sẽ đi vào tối ưu hoá kích thước ứng dụng để phục vụ cho nhưng yêu cầu như vậy. Nhưng làm như thế nào? 
Chúng ta cùng xem nhé!

## 1. Tối ưu hoá kích thước tải xuống và cài đặt của ứng dụng

 khi tối ưu hoá cho ứng dụng thì chúng ta cần đo kích thước tải xuống và cài đặt của ứng dụng trước 
 
1. Nhận tệp app_name.ipa của bạn (tức là ipa phân phối Adhoc)
2. Đổi tên tệp app_name.ipa thành app_name.zip
3. Giải nén tệp đã đổi tên (lệnh terminal “giải nén PATH_TO_FOLDER / { tên tệp nén của bạn}. Zip”)
4. Thư mục được giải nén là Payload, mở thư mục và nhấp chuột phải vào app_name và chọn “Hiển thị nội dung gói”
5. Gói chứa tất cả tài nguyên của bạn (hình ảnh, xib, bảng phân cảnh, phông chữ, v.v.)
6. Tìm ra tất cả các tài nguyên mà bạn không yêu cầu và xóa chúng

Để tìm các tài nguyên không sử dụng chúng ta sử dụng công cụ [LSUnusedResources](https://github.com/tinymind/LSUnusedResources)

![](https://images.viblo.asia/f52070ee-9fd9-4d7e-bffc-0c85972f468d.png)

## 2. sử dụng asset catalog và bitcode
Chắc chắn rằng tất cả các image , pdf hay asset đê cho biết nôi dung dành cho thiết bị nào để đảm bảo hình ảnh hay tài liệu sẽ được tải xuống riêng theo từng thiết bị định nghĩa tránh trường hợp tải tất sẽ sinh ra kích thước lớn.
Nếu ứng dụng hỗ trợ từ ios 10 trở lên thì có thể không cần thêm các image 1x vào asset, hay thay vì sử dụng các ảnh png thì chúng ta sử dụng các ảnh định dạng pdf và set universal để có thể sử dụng trên tất cả các loại thiết bị sẽ tối ưu được dung lượng app.

Đó là với asset catalog còn về bitcode thì sao?
Bitcode là một công nghệ của apple cho phép biên dịch lại ứng dụng của mình để giảm kích thước, nó là một lựa chọn khi archive ứng dụng trước khi đẩy lên appstore.

Bằng cách bật bitcode, bạn đảm bảo rằng tất cả hiệu suất / tối ưu hóa được thực hiện trong khung LLVM sẽ biên dịch lại ứng dụng của bạn mà không yêu cầu bạn tải lên lại ứng dụng, điều này sẽ làm giảm kích thước ứng dụng của bạn trong các bản cập nhật LLVM trong tương lai.

## 3. kiểm tra Target build setting cho release
Chắc chắn rằng bạn đã chọn optimization  level cho release configuration là **Fastest, Smallest **
![](https://images.viblo.asia/46864377-17f2-4eb3-a01c-71a484e55f3e.png)

 bạn có thể xem nhiều hơn về release configuration ở đây [Release configuration](https://medium.com/@guyeldar/setting-up-multiple-build-configurations-for-your-xcode-project-c237265e8324)
 
 ## 4. On-Demand resources
  ta sẽ set các nội dung chỉ khi nào cần mới bắt đầu load về, đây là một cách để tối ưu hoá dung lương ứng dụng của bạn
  có một hướng dẫn khá đầy đủ cho việc này của apple
  https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/index.html#//apple_ref/doc/uid/TP40015083-CH2-SW1
  
Tải xuống các tài nguyên (Video, Hình ảnh, Nội dung Trò chơi, v.v.) khi được yêu cầu. Bạn có thể tạo asset packs và club cho tất cả các tài nguyên của mình để có thể tải xuống sau này. asset packs không được bao gồm như một phần của ứng dụng của bạn, do đó điều này không làm tăng kích thước ứng dụng của bạn. asset packs này có thể được tải xuống khi cần thiết.

Danh sách hiển thị các loại tài nguyên theo yêu cầu được hỗ trợ và cho biết liệu các loại đó có được đưa vào mục tiêu dưới dạng file hay asset catalog hay không.
![](https://images.viblo.asia/2d041aaf-fd8b-440d-a00a-90898e42714d.png)

 ## 5. Frameworks/Pods
 
 Ứng dụng của bạn có thể tăng kích thước nhanh chóng khi bạn sử dụng Frameworks/Pods nên trong quá trình xây dựng hãy cân nhắc xem Frameworks/Pods nào cần dùng và không cần dùng và nếu tối thiểu có thể custom lại nó hay triển tjgai xây dựng tương tự để giảm dung lượng thì hãy cân nhắc.
 
 ## 6. App thinning
 Theo như tài liệu của apple thì 
>  App thinning is a technology that ensures that an app’s IPA file only contains resources and code that’s necessary to run the app on a particular device. This ensures that the app downloaded on devices will have only required resources.

Các ứng dụng được tải xuống từ App-Store đã đượcApp thinning. Vì vậy, các nội dung không bắt buộc đối với thiết bị người dùng sẽ không được tải xuống. Điều đó có nghĩa là iPhone X của tôi sẽ chỉ tải xuống hình ảnh 3x, theo mặc định, điều này sẽ tăng tốc độ tải xuống của tôi và giảm kích thước ứng dụng

 ## 6. Giảm kích thước của các bản cập nhật ứng dụng
 
Thay  vì tải xuống lại cả tập thì apple chỉ duy trì một gói cập nhật . Tạo ra một gói tối ưu hoá chỉ chứa nội dung đã thay đổi giữ các phiên bản ứng dụng của bạn. Việc tránh sửa đổi không cần thiết đối với tệp sẽ giúp bạn giảm thiếu kích thước của gói cập nhật ứng dụng.
  
 Trên đây là một số hướng và mục lưu ý để làm giảm kích thước ứng dụng giúp trở nên tối ưu hơn. Mong sẽ giúp được các bạn
 Bài viết tham khảo từ: [https://medium.com/flawless-app-stories/app-size-reduction-903a04646e3a](https://medium.com/flawless-app-stories/app-size-reduction-903a04646e3a)