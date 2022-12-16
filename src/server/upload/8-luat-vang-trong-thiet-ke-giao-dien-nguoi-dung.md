# Tổng quan
Thiết kế giao diện người dùng là 1 trong những phần quan trọng của 1 dự án phần mềm, bởi lẽ đây là thành phần trực tiếp tương tác với người sử dụng, trực tiếp đại diện cho chất lượng cũng như độ ổn định của ứng dụng/website. Ngoài các tính năng, 1 bộ giao diện người dùng chất lượng là 1 trong những điểm quan trọng quyết định đến việc người dùng có tiếp tục muốn sử dụng ứng dụng/trang web của bạn hay không.

Trong 1 nghiên cứu năm 1987, cuốn sách Designing the User Interface đã nêu lên 8 luật "vàng" trong thiết kế giao diện người dùng. Đã qua hơn 30 năm, nhưng sự đúng đắn của những quy luật này vẫn được chứng minh và áp dụng vào các dự án phần mềm hiện nay. Tuân theo những rules sau đây sẽ đem lại 1 giao diện tốt, dễ sử dụng và dễ mở rộng cho dự án của bạn. Trong bài viết này, ta hãy cùng tìm hiểu và nắm rõ chúng.

# 8 luật "vàng"
## 1. Xây dựng giao diện thống nhất và đồng nhất
Các thành phần và trạng thái tương tự trong 1 hệ thống giao diện cần có sự đồng nhất, Ví dụ: các pop up, các hình dạng cửa sổ, màu sắc, cách thông báo tới người dùng, các thao tác với các chức năng tương tự nhau, ...
Điều này rất quan trọng trong việc đem lại 1 trải nghiệm thống nhất và xuyên suốt với người dùng. 1 bộ giao diện "biến hóa khôn lường" sẽ khiến người dùng khó ghi nhớ, khó phân biệt các miền chức năng khi sử dụng, cũng như làm mất đi sự đồng bộ của cả hệ thống.

![](https://images.viblo.asia/5e97d38f-0683-4acb-8859-c036b0573032.png)

Mỗi dialog được thiết kế đẹp, nhưng khi sử dụng chung cùng 1 ứng dụng, chúng trở nên rối, thiếu đồng bộ

![](https://images.viblo.asia/308f0862-ff2c-4bdf-9c0b-2549ea78dba2.png)

Các dialog được thiết kế thống nhất đem lại trải nghiệm tốt hơn cho người dùng

## 2. Rút ngắn các công việc quen thuộc bằng phím tắt
Đối với những người dùng thường xuyên sử dụng ứng dụng, việc truy cập 1 chức năng được sử dụng với tần suất cao qua nhiều bước trung gian sẽ khiến họ cảm thấy chán, cũng như giảm đi trải nghiệm người dùng. Người thiết kế giao diện cần sử dụng các Phím tắt, hay các nút bấm truy cập nhanh, lệnh, ... hoặc cho phép người dùng tìm kiếm chức năng nhanh thông qua gợi ý, giọng nói, cử chỉ,... để rút ngắn các thao tác lặp lại, tăng sự hứng thú và tiện lợi cho người dùng.

![](https://images.viblo.asia/be10f8de-60ab-42d3-b72c-e687a5c47d19.png)

Điển hình là google chrome, với các short cut có thể được tạo để truy cập các trang web nhanh hơn

## 3. Cung cấp phản hồi cho các thao tác
Sẽ thật khó chịu khi bạn click vào 1 button và không có điều gì xảy ra, hay khi bạn submit 1 form chứa đầy data và không nhận được thông báo hay phản hồi gì. Những phản hồi lại với thao tác người dùng mang lại cảm giác ứng dụng có sự " sống", và họ có thể yên tâm rằng các thao tác của mình sẽ luôn được ghi nhận và xử lý, thay vì chỉ như đang thao tác trên 1 bức ảnh 2D nhàm chán. 

Những thao tác nhỏ thường đi với các phản hồi nhỏ, như rung, hay hiệu ứng view. Còn với những thao tác lớn hơn như Submit 1 form, hay truy cập các chức năng,.. giao diện cần có phản hồi và thông báo lại với các tương tác đó.

![](https://images.viblo.asia/b028a671-7771-4cab-ab08-c3b573b52e6d.gif)

Ví dụ về phản hồi khi bấm và vuốt của 1 trang web

## 4. Chia nhỏ các tập hành động
Với những thao tác gồm nhiều giai đoạn, cần chia nhỏ các hành động đó thành từng nhóm, và cung cấp phản hồi sau mỗi nhóm với người dùng. Điều này đem lại cảm giác yên tâm và thoải mái cho họ khi trải nghiệm giao diện ứng dụng.

## 5. Dễ dàng khắc phục lỗi
Đối với 1 ứng dụng hoặc website có nhiều tính năng, việc giao diện có lỗi là chuyện không thể tránh khỏi. Do đó, giao diện cần được thiết kế để dễ dàng khắc phục lỗi, tránh việc tạo ra các lỗ hổng ảnh hưởng đến dữ liệu và logic,... Cũng như hõ trợ người dùng thao tác lại trong các trường hợp lỗi phát sinh.

## 6. Cho phép đảo ngược các hành động
Trong nhiều trường hợp người dùng thao tác nhầm lẫn với các form, hay các giai đoạn của 1 chức năng, giao diện cần cung cấp tính năng đảo ngược lại hành động trước đó. Việc này sẽ giúp người dùng có thể sửa lại và lấy lại các thông tin cần thiết.

![](https://images.viblo.asia/90a30a66-38c2-45e2-83b7-6a9fb157fcca.png)
![](https://images.viblo.asia/b9c69847-373e-49bd-8b2b-a45588ee34e1.jpg)

2 Ví dụ về Undo với giao diện mobile

## 7. Hệ thống phục vụ con người và con người nắm quyền làm chủ
Người dùng hệ thống, đặc biệt là những người dùng thường xuyên luôn được xem là có quyền kiểm soát ứng dụng. Bộ giao diện cần hướng người dùng và phục vụ người dùng. Người dùng sẽ thường xuyên khởi tạo & bắt đầu các thao tác, hành động, chứ không phải chỉ phản hồi lại hệ thống. Giao diện cũng cần cũng cấp các tùy biến theo mong muốn của người dùng, giúp tăng trải nghiệm và sự làm chủ đối với ứng dụng/website.

## 8. Giảm tải cho "bộ nhớ ngắn hạn"
Việc giao diện hiển thị quá nhiều thông tin, màu sắc, bố cục quá sặc sỡ, rối rắm hay các hiệu ứng màu mè sẽ khiến người dùng nhanh chóng cảm thấy mệt mỏi vì cùng lúc phải chú ý quá nhiều thông tin trên màn hình, cũng như làm rối tiêu điểm khi người dùng muốn tìm kiếm chức năng hoặc đơn giản là 1 nút bấm nào đó. Nội dùng và lượng thông tin hiển thị trên giao diện cần ngắn gọn, đơn giản, tập trung vào các thông tin chính, tránh làm quá tải "bộ nhớ ngắn hạn" của người dùng. 

Sử dụng các màu sắc không quá rực rỡ và tương phản cao cũng sẽ giúp cho người dùng lâu không bị mỏi và rối mắt. Màu sắc theo phong cách Gradient đang được sử dụng nhiều và được cho là sẽ không khiến người dùng bị rối và mỏi do màu sắc được thay đổi mượt mà thay vì cố định 1 mảng màu solid.

![](https://images.viblo.asia/e4be3bdf-3326-4c4c-b3a8-4f60a3312024.jpg)

Giao diện đơn gián, sáng sủa

![](https://images.viblo.asia/6ec22a2a-ac90-4376-af25-56a25c55bc20.png)

Và giao diện rối với quá nhiều thông tin

# Kết luận
Trên đây chỉ là những luật chung nhất, tổng quát nhất khi thiết kế giao diện cho 1 hệ thống phần mềm. Nếu quá cứng nhắc tuân theo các luật lệ, giao diện của bạn sẽ trở nên nhàm chán và nhạt nhẽo. Giao diện ngày này dần dần trở nên đẹp hơn, sống động hơn, 1 ứng dụng không còn đơn giản chỉ hiển thị những thông tin Basic để thao tác, mà yếu tố nghệ thuật, hiện đại đã được ưu tiên rất nhiều. Vì thế, việc tùy biến giao diện mang những phong cách riêng cũng là 1 cách tiếp cận người dùng hiệu quả. Cuối cùng thì, 1 bộ giao diện đẹp không có nghĩa là nó tốt, và ngược lại, 1 bộ giao diện tốt không phải lúc nào cũng đẹp.

Chúc các bạn thiết kế được những bộ giao diện người dùng chất lượng và hiệu quả.

Nguồn tài liệu: Designing the User Interface - Ben Shneiderman

Nguồn ảnh minh họa: Internet