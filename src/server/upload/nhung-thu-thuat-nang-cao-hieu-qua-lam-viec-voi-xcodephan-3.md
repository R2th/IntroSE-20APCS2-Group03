Trong các số trước, tôi đã giới thiệu các thủ thuật nâng cao hiệu quả làm việc với xcode, hi vọng nó thực sự giúp ích và cải thiện được hiệu quả làm việc của các bạn. Trong số lần này, mình sẽ giới thiệu các bạn sử dụng base project cho các dự án. 
Trong quá trình xây dựng và phát triển của dự án ngoài việc chọn lựa công nghệ, lựa chọn các thư viện phù hợp với dự án,.. thì việc xây dựng base project là việc rất quan trọng và là công việc đầu tiên phải thực hiện trước khi bạn bắt tay vào những task củ thể.
### Lợi ích việc sử dụng base project:
- Xây dựng cấu trúc project để project được quản lý các folder, file dễ dàng, dễ hiểu hơn(điều này rất có lợi cho thành viên mới vào dễ dàng làm quen và nhanh chóng nắm bắt được project)
- base project áp dụng nhiều dự án, trông sẽ chuyên nghiệp hơn
- base project giúp các thành viên trong team đọc code của nhau dễ hiểu và phát triển phần mềm nhanh trong hơn.
### Các bước sử dụng base project có sẵn:
![](https://images.viblo.asia/f5ca7e82-a6fa-4c47-a787-2ba537d79f18.png)
Ở đây, chúng ta có project base là project "SyncCloud". Sau đây, mình sẽ đổi tên từ project base này sang một tên project mới mà vẫn giữ nguyên các trúc file và các file tiện ích có sẵn trong project. 
Đầu tiên, chúng ta sửa tên của file .xcworkspace sang tên file chúng ta mong muốn. Vd: đổi tên "SyncCloud" sang "RenameProject".

Bước 2, chúng ta mở file RenameProject.xcworkspace và tiến hành rename file .xcodeproj. Như trên hình, mình đang đổi tên sang "RenameProject"
![](https://images.viblo.asia/09b979cd-2000-4f0f-bff2-6f8529982a0a.png)

Sau khi đổi tên, Xcode sẽ hỏi chúng ta muốn rename các target, plist liên quan đên .xcodeproj mà chúng ta vừa đổi. chúng ta chọn "Rename"

![](https://images.viblo.asia/15b204d3-7b76-4e4b-bf46-ac37eeac41bf.png)
Bước 3, đổi tên các folder sang tên project mới

Bước 4, chọn manage scheme như hình dưới:

![](https://images.viblo.asia/47bd7fa8-bd98-4a71-9c6f-5a9be321df29.png)

Sau đó ta tiến hành đổi tên target scheme và chỉnh lại container scheme đó. như ở hình dưới mình đã đổi tên từ SyncCloud sang "RenameProject"

![](https://images.viblo.asia/84545453-29c4-4244-bd90-479338a08ae7.png)

Như vậy, mình đã kết thúc cách sử dụng project base có sẵn cho các dự án bạn muốn tận dụng những thứ bạn đã thiết lập có trong project base của bạn.