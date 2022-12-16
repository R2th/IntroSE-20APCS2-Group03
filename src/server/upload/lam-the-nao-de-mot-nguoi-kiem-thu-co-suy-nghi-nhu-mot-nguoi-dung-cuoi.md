Bối cảnh: Trong một nhà hàng, một gia đình có 3 người đến - cha mẹ và một đứa trẻ mới biết đi. Sau khi đặt bánh pizza yêu thích nhất, gia đình nghỉ ngơi và trẻ mới bắt đầu chơi đùa bằng đũa đặt trên bàn. Cậu bé thích chúng và quyết định ăn bữa tối của mình chỉ bằng đũa.

Cậu bé tuyên bố mong muốn của mình ,và cha mẹ, bận rộn trong cuộc nói chuyện, đồng ý yêu cầu đó. Khi pizza được phục vụ, đứa trẻ mới bắt đầu sử dụng đũa và đã thất bại nhiều lần trong việc đưa pizza vào miệng. Đột nhiên, cha mẹ nhận thấy và ra lệnh cho cậu bé không dùng đũa. Cậu bé không thuyết phục vì cha mẹ đã đồng ý với mong muốn của mình trước đó. Khi cha mẹ bắt đầu dạy về ăn pizza với dao và nĩa, cậu bé đã đặt câu hỏi nhưng con chỉ muốn ăn nó bằng đũa và tại sao nó lại sai? Và trong khi sử dụng đũa khi không thể ăn pizza ưa thích của mình, cậu bé thiếu kiên nhẫn và cuối cùng đã ném đũa ra và quyết định không ăn pizza nữa. Các bậc cha mẹ, nản lòng, không thể làm gì cả và bữa tối của gia đình đã trở thành thời điểm tồi tệ nhất trong ngày.



![](https://images.viblo.asia/2490e0cb-079a-4f25-bbf0-6556d60e0cac.jpg)




Bây giờ, hãy thay thế một số từ trong đoạn trên như sau và suy nghĩ lại về nó:

* Cha mẹ: Nhóm quản lý dự án bao gồm các nhà phân tích nghiệp vụ, nhân viên bán hàng, quản lý phát triển và đội kiến trúc.
* Cậu bé: Khách hàng / người dùng cuối
* Pizza: sản phẩm / ứng dụng
* Đũa: mistake

Ứng dụng yêu thích nhất chỉ là yêu thích cho đến khi người dùng không mắc lỗi và không thấy hành vi tồi tệ nhất của ứng dụng. Sau khi có kinh nghiệm, người dùng không bao giờ quay lại ứng dụng. Vì vậy, với tư cách là người kiểm thử, cần phải hiểu được suy nghĩ của người dùng, cách anh ta phải cư xử, anh ta có thể làm gì với ứng dụng, điều gì là sai lầm tồi tệ nhất và nhiều hơn nữa?

Hầu hết thời gian, tôi đã được hỏi tại các diễn đàn cũng như các thành viên trong nhóm về cách nhân rộng trải nghiệm của người dùng trong khi kiểm thử. Câu trả lời của tôi luôn luôn đơn giản - Hãy là một người dùng :)

Mặc dù nó dễ nói hơn là thực hiện, đây là thời điểm thích hợp cho ngành công nghiệp kiểm thử phần mềm di chuyển theo hướng cách mạng, nơi mà trải nghiệm và phản hồi của người dùng quan trọng hơn bất cứ điều gì khác.

Làm thế nào để một người kiểm thử có suy nghĩ như một người dung cuối

Dưới đây là một số ví dụ điển hình về hành vi như một người dùng cuối và tìm kiếm sự bất ngờ, tôi đã quan sát thấy trong vài ngày qua:



**1) Trong khi kiểm tra trường ngày, khi người dùng chọn hoặc nhập giá trị ngày chính xác theo cách thủ công, nó đã làm việc tốt. Nhưng khi người dùng nhập vào một giá trị hoàn toàn không chính xác như 12/00 / / và nhấp vào OK, có một thông báo lỗi về giá trị ngày không hợp lệ.**

Bây giờ người dùng nhập sai ngày nhưng refresh trang. Chuyện gì sẽ xảy ra? Vâng, nhiều bạn có thể đoán được những gì sẽ xảy ra, nhưng bạn có thể nghĩ ra những gì xảy ra với ứng dụng không? Sau khi làm refresh trang, giá trị mà người dung nhập sai đó được lưu trong một cơ sở dữ liệu .

Vì vậy, .. .. người thử đã nhân rộng người dùng ở đây, bạn đồng ý chứ?


**2) Trong khi thử nghiệm một ứng dụng, nơi mà workflow là submit nhiều form theo một thứ tự, nếu làm theo thứ tự, nó sẽ làm việc tốt. Nhưng nếu người dùng cố gắng back về form thứ 3 từ form thứ 5?**

Một lần nữa, thay vì suy nghĩ về những gì sẽ xảy ra, chúng ta hãy xem những gì sẽ xảy ra ...



![](https://images.viblo.asia/3dd4ec92-8b7e-4be5-8630-8be1593f5e69.jpg)



Người kiểm thử đã chết lặng nhưng cảm thấy tự hào khi tự biến mình thành người sử dụng ... ..Bạn đồng ý chứ?



**3) Sau khi đăng nhập thành công, người dùng nhấp vào nút quay lại của trình duyệt. Một lần nữa, chúng ta hãy xem những gì đã xảy ra ...**


![](https://images.viblo.asia/7e3a7d38-cb67-41ab-bde6-94e74f21981f.jpg)

Các thông tin cần phải xóa đi nhưng nó đã không được xóa, trên trang Login , một user nhấp vào link “Forgot your password” Hãy nhớ rằng người sử dụng đã đăng nhập vào hệ thống và đã ở trang Login bằng việc nhấp vào button back trên trình duyệt, nhưng khi nhấp vào link  "Forgot your passwork"nó lại điều hướng người dung đến trang Home page của ứng dụng


**4) Sau khi quan sát URL cho trang tìm kiếm (http: //x.x.x.x: y / # / Search) của ứng dụng, người thử nghiệm đã sửa đổi URL như http: //x.x.x.x: y / # / Search / test? và bạn có thể nghĩ rằng những gì đã xảy ra?**

Vâng, ứng dụng đã bị lỗi và một lần nữa người kiểm thử chuyển sang người dùng ... .. Tôi hy vọng bạn sẽ không không đồng ý.

Kết luận:
Qua các ví dụ trên, tôi đã chuyển tải đủ những gì tôi muốn.

Thực sự, kiểm tra không có nghĩa là kiểm tra luồng công việc của ứng dụng và cũng không có nghĩa là phá vỡ ứng dụng, nhưng nó chắc chắn có nghĩa là kiểm thử trải nghiệm của người dùng ngay cả khi anh ta mắc lỗi.

Về Tác giả: Bài đăng này được viết bởi thành viên nhóm STH Bhumika Mehta. Cô là trưởng nhóm dự án, có hơn 10 năm kinh nghiệm trong lĩnh vực kiểm thử phần mềm. Cô đánh giá cao ý tưởng tốt và đổi mới và rủi ro . Và tất nhiên ghét công việc con người và môi trường đơn điệu,

Và vâng, chúng ta hãy biến người kiểm thử chúng ta thành những người dùng cuối  ...bạn đồng ý chứ? :)

Vì vậy ... chúng tôi muốn nghe thêm ví dụ như những điều này từ bạn và cũng muốn có ý kiến của bạn.