Chrome là trình duyệt web phổ biến nhất trên thế giới, với gần 2/3 người dùng thích nó hơn các trình duyệt khác 🌎 Ngoài việc là trình duyệt được sử dụng nhiều nhất, nó còn là một trợ thủ đắc lực cho tester,  Nếu bạn làm việc trên web testing, bạn có thể sử dụng nhiều trình duyệt để kiểm tra trình duyệt chéo. Nhưng bạn có thể làm được nhiều việc hơn là chỉ chạy ứng dụng trong trình duyệt. Bạn có thể sử dụng Công cụ dành cho nhà phát triển Chrome(Developer Tools) để biết thêm thông tin về hành vi của ứng dụng hoặc thậm chí thay đổi hành vi của ứng dụng, 

**Mục lục**
* Truy cập công cụ dành cho nhà phát triển
* Elements tab
* Giám sát các yêu cầu HTTP từ tab Network
* Mô phỏng hiệu suất mạng bằng Developer Tools
* Thiết bị giả lập
* Làm việc với Cookie
* Chụp ảnh chụp màn hình từ Chrome Developer Tools
* Trợ giúp với localization testing
* Kết luận

## 1. Truy cập công cụ dành cho nhà phát triển

Công cụ dành cho nhà phát triển là một ngăn mở ra trong cửa sổ Chrome và cung cấp cho bạn nhiều thông tin khác nhau về tab hiện tại. Để mở nó, bạn có thể vào menu Tùy chỉnh và điều khiển Google Chrome (hay còn gọi là menu kebab) và nhấp vào Công cụ khác -> Công cụ dành cho nhà phát triển, bạn có thể nhấn phím tắt Ctrl + Shift + I hoặc nhấn phím F12. Thao tác này sẽ gắn ngăn DevTools vào tab đang mở và bạn có thể chọn vị trí đặt nó hoặc để nó mở dưới dạng một cửa sổ riêng biệt.

## 2. Elements tab
 
Tab này cho phép bạn kiểm tra thông tin về các phần tử web, thông qua kiểu DOM và CSS. Nó đặc biệt hữu ích cho việc kiểm tra tự động hóa web vì nó có thể giúp xác định các bộ định vị tốt nhất cho các phần tử web.

Bạn có thể lấy XPath hoặc bộ chọn CSS của một phần tử từ DevTools, bằng cách nhấp chuột phải vào phần tử đó trong tab Elements và chọn Copy -> Copy XPath hoặc Copy -> Copy Selector. Bạn cũng có thể sử dụng chức năng tìm kiếm (Ctrl + F) để tìm kiếm các phần tử cụ thể trong DOM. Tìm kiếm không chỉ áp dụng cho văn bản thuần túy mà còn cho phép bạn lọc ngay cả bằng các bộ chọn CSS phức tạp hoặc XPath, đồng thời hiển thị số lượng kết quả phù hợp. Điều này có thể hữu ích khi xác minh rằng bộ định vị xác định các phần tử chính xác và cũng để xem số lượng phần tử phù hợp với một bộ định vị cụ thể:

![](https://images.viblo.asia/e3b16e0d-1bb8-4f97-8109-a0532eed3aab.png)

## 3. Giám sát các yêu cầu HTTP từ tab Network

Tab Mạng của Công cụ dành cho nhà phát triển hiển thị thông tin về tất cả các lệnh gọi HTTP. Tại đây, bạn có thể thấy các tiêu đề, nội dung yêu cầu, mã phản hồi và nội dung, thậm chí cả thời gian phản hồi. Bạn có thể kiểm tra chúng để kiểm tra xem máy khách có gửi đúng request hay không và máy chủ trả về phản hồi chính xác.

URL và nội dung yêu cầu thậm chí có thể được sao chép để sử dụng cho quá trình kiểm tra API sau này, sử dụng các công cụ như Postman. Bạn cũng có thể xem liệu có request không cần thiết nào được gửi khi trang đang được tải hay không, hoặc nếu trang chậm, để xác định request nào đang ảnh hưởng đến hiệu suất.

Để thực hiện việc này trong tab Mạng, hãy đảm bảo rằng trước tiên bạn nhấp vào nút Ghi. Sau đó, thực hiện các bước bên trong ứng dụng của bạn. Tab Mạng sẽ hiển thị tất cả các request đã gửi:

![](https://images.viblo.asia/43536927-b4d0-46d7-9c54-a8241dfbbb3c.png)

Bạn có thể nhấp vào từng yêu cầu để xem chi tiết:

URL yêu cầu
* tiêu đề yêu cầu và phản hồi
* phương thức yêu cầu và mã phản hồi
* yêu cầu và cơ quan phản hồi
* Ở cuối tab, bạn cũng có thể xem số lượng yêu cầu đã gửi, lượng dữ liệu đã gửi và thời gian tải.

 Cột Waterfall cung cấp trình bày trực quan về các giai đoạn của yêu cầu, tức là thời gian mỗi yêu cầu mất bao nhiêu và thời gian nó được gửi và hoàn thành. Điều này có thể cung cấp cho bạn một ý tưởng tốt về request nào được song song và request nào không, điều này có thể hữu ích trong việc xác định các vấn đề về hiệu suất.
 
##  4. Mô phỏng hiệu suất mạng bằng Developer Tools

Bạn có thể sử dụng tab Performance để theo dõi mỗi sự kiện diễn ra trong bao lâu. Tại đây, hãy bắt đầu ghi, sau đó thực hiện các thao tác bạn muốn theo dõi và dừng ghi khi bạn hoàn thành các bài kiểm tra. Theo mặc định, hộp kiểm Ảnh chụp màn hình được bật. Điều này có nghĩa là bạn sẽ nhận được ảnh chụp màn hình của mọi khung hình đã ghi. Từ đây, bạn có thể chọn các phần của bản ghi để xem chi tiết về chúng:

![](https://images.viblo.asia/5d779095-248b-43be-9c7a-2ec845d45072.png)

Nhưng điều thú vị hơn nữa là bạn có thể mô phỏng nhiều kết nối mạng khác nhau để xem ứng dụng web bạn đang thử nghiệm hoạt động như thế nào trong các trường hợp khác nhau. Theo mặc định, trình duyệt sẽ sử dụng cài đặt máy của bạn, vì vậy cài đặt mạng và CPU của bạn. Tuy nhiên, bạn có thể chọn mô phỏng kết nối Internet chậm hơn, CPU chậm hơn hoặc thậm chí không có kết nối Internet. Điều này có thể đặc biệt hữu ích trong việc hiểu cách ứng dụng hoạt động trong điều kiện thực tế.

![](https://images.viblo.asia/bee6710c-15fd-4ffc-a065-194f18538e5e.png)

## 5. Thiết bị giả lập

Mặc dù nó sẽ không mô phỏng các điều kiện hoạt động bình thường của thiết bị di động, nhưng bạn có thể kiểm tra giao diện của ứng dụng trên các màn hình khác nhau. Để thực hiện việc này, hãy đi tới Cài đặt (hoặc nhấn F1 khi ở trong Developer Tools) -> Devices

![](https://images.viblo.asia/84ac93eb-58b1-4cc5-a7b8-6968bb56586b.png)

## 6. Làm việc với Cookie

Trong ứng dụng web, cookie là các mẩu thông tin được lưu trữ trên máy cục bộ, chứa dữ liệu nhận dạng được gửi đến máy chủ, vì vậy ứng dụng sẽ hiển thị nội dung được cá nhân hóa. Chúng được sử dụng để làm cho các trang tải nhanh hơn và cũng để lưu trữ thông tin quan trọng, chẳng hạn như nội dung của một giỏ hàng.

*  name
*  value
*  expiration date

Và điều tốt là chúng ta có thể thấy tất cả thông tin này trong Chrome DevTools, trong tab Applications . Tại đây, trên menu bên trái, bạn có thể mở rộng nút Cookies và xem danh sách ứng dụng. Chọn một trang web sẽ mở các cookie được lưu trữ cho nó, với thông tin chi tiết về nó. Bạn có thể xóa cookie khỏi đây hoặc chỉnh sửa giá trị của chúng và xem ứng dụng hoạt động như thế nào sau những thay đổi:

![](https://images.viblo.asia/4b50fd21-9ab0-4da3-a1aa-24d516403b23.png)

## 7. Chụp ảnh chụp màn hình từ Chrome Developer Tools

Developer Tools cũng cho phép bạn lấy ảnh chụp màn hình của trang web / ứng dụng web. Nếu bạn nhấn Ctrl + Shitft + P trong DevTools và lọc theo "ảnh chụp màn hình", bạn sẽ nhận được 4 tùy chọn:

![](https://images.viblo.asia/80c519e4-c0eb-46fa-9cf8-0240eb4205db.png)

* Capture area screenshot - cho phép bạn chọn khu vực của trang để lưu (tương tự như Công cụ cắt của Windows)
* Capture full size screenshot - sẽ tạo một bản sao hình ảnh của toàn bộ trang, bao gồm cả những phần không được xem
* Capture node screenshot - tạo ảnh chụp màn hình của phần tử được đánh dấu, trong tab Phần tử
* Capture screenshot - sẽ chụp ảnh màn hình của một phần của trang hiện đang xem

##  8. Trợ giúp với localization testing

Nếu ứng dụng của bạn đã được bản địa hóa và bạn muốn đảm bảo rằng ứng dụng hoạt động tốt ở các quốc gia và ngôn ngữ khác nhau, bạn có thể thay đổi ngôn ngữ của trình duyệt. Để thực hiện việc này, hãy mở Customize và control DevTools (menu kebab bên cạnh Settings), nhấp vào More Tools, sau đó nhấp vào Sensors:

![](https://images.viblo.asia/e80d171c-7f53-447b-a7ba-8d21269bd856.png)

Thao tác này sẽ tải danh sách các vị trí có sẵn, trong đó có các vị trí địa lý được chọn, ngôn ngữ và múi giờ. Bạn cũng có thể tạo vị trí tùy chỉnh của mình (bằng cách nhấn nút Quản lý và điền tất cả thông tin cho vị trí mong muốn).

![](https://images.viblo.asia/25de0837-f5dd-405d-9add-14116041582f.png)

## Kết luận

Kiểm tra web có thể rất phức tạp và ngay cả khi bạn chỉ thực hiện kiểm tra thủ công, bạn vẫn có thể sử dụng các công cụ khác nhau để trợ giúp bạn. Một tính năng quan trọng không nên bị đánh giá thấp là Công cụ dành cho nhà phát triển từ Google Chrome. Bài viết này đề cập đến một số công cụ quan trọng nhất mà chúng tôi có thể sử dụng với tư cách là người kiểm tra với những gì được Google cung cấp theo mặc định mà không cần cài đặt tiện ích mở rộng hoặc các ứng dụng của bên thứ ba khác.
 
 Bài viết được tham khảo từ : https://blog.testproject.io/2021/06/02/chrome-developer-tools-for-web-testers/