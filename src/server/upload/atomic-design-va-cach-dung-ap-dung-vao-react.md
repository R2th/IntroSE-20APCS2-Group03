Chào các bạn, trong chuỗi ngày ở nhà chống dịch thì mình tình cờ đọc được một bài viết về [Atomic web design](https://bradfrost.com/blog/post/atomic-web-design/). Theo mình đánh giá thì thấy bài viết rất là hay nên cũng bon chen tìm hiểu để lên đây chia sẽ, chém gió với mọi người về nó luôn :)<br>
Bên cạnh đó thì mình cũng có vài ví dụ về cách áp dụng **Atomic design** vào trong React để các bạn dễ hình dung hơn. Chứ nhìn chữ không cũng khô khan lắm :v: <br>
# Atomic design là gì?
**Atomic Design** được nhà thiết kế **Brad Frost** đưa ra vào năm 2013 và giới thiệu trong cuốn sách cùng tên mà bạn có thể đọc miễn phí ở [đây](https://atomicdesign.bradfrost.com/). Theo đó, Atomic design được nhà thiết kế định nghĩa như sau:
> Atomic design là một phương pháp bao gồm năm giai đoạn riêng biệt làm việc cùng nhau để tạo ra các hệ thống thiết kế giao diện theo cách phân cấp và có chủ ý hơn.

Trong đó năm giai đoạn của Atomic design là:
* Atoms
* Molecules
* Organisms
* Templates
* Pages

![](https://images.viblo.asia/a483ae16-749d-4270-9960-3c3d63f1e418.png)

Mỗi giai đoạn trong số năm giai đoạn đóng một vai trò quan trọng trong hệ thống phân cấp của việc thiết kế giao diện. Bây giờ chúng ta hãy đi sâu vào từng giai đoạn để tìm hiểu nhé.
## Atoms
Nếu nguyên tử là khối xây dựng cơ bản của vật chất, thì **Atoms** sẽ đóng vai trò là khối xây dựng cơ bản nhất trong giao diện của chúng ta. <br>Các **atoms** này bao gồm các phần tử HTML cơ bản như labels, inputs, buttons và những phần tử khác mà không thể chia nhỏ thêm được nữa.<br>
Đặc điểm của **atoms** là rất trừu tượng. Các bạn sẽ rất khó hình dung nó là gì cho đến khi bạn đặt nó vào một **molecules** cụ thể.

![](https://images.viblo.asia/9984366b-dd65-405f-877e-ae6373c916a7.png)
## Molecules
**Molecules** là những nhóm nguyên tử liên kết với nhau và là những đơn vị cơ bản nhỏ nhất của một khối. Ví dụ như các bạn có thể kết hợp giữa button và input để tạo thành một group search chẳng hạn hoặc có thể kết hợp nhiều checkbox lại thành một group checkbox, ... <br>
Khi kết hợp với nhau, những **Atoms** này sẽ trở nên có mục đích thay vì vẫn còn trừu tượng như trước. <br>Các **molecules** này có các đặc tính riêng của chúng và đóng vai trò là xương sống của trong hệ thống Atomic design.

![](https://images.viblo.asia/25b85107-8e8d-44b8-a5d7-26209da6bb0e.png)
## Organisms
Các **molecules** cung cấp cho chúng ta các khối để làm việc và bây giờ chúng ta có thể kết hợp chúng với nhau để tạo thành các **organisms**. Những **organisms** này tạo thành các phần riêng biệt của giao diện.<br>

![](https://images.viblo.asia/5ad7c1e8-d6ae-4a13-a565-80b38271a1e6.png)

Như các bạn đã thấy ở ví dụ trên thì mình đã kết hợp 3 **molecules** là: *Logo, Menu, GroupSearch* để tạo ra được một **Organisms** là *Header*.<br>
Việc xây dựng từ **molecules** đến **organisms** được khuyến khích để tạo ra các thành phần độc lập, di động và có thể tái sử dụng được.
## Templates
**Templates** là các đối tượng cấp trang đặt các thành phần vào một bố cục và làm rõ cấu trúc nội dung cơ bản của thiết kế.
Các bạn cần phải kết hợp các **organisms** để tạo thành các phần của một trang. Đó là nơi chúng ta bắt đầu thấy được thiết kế ở các giai đoạn kết hợp với nhau và bắt đầu thấy chúng hoạt động :). <br>

![](https://images.viblo.asia/ce79a51c-a012-4766-a449-60bb7deb2813.png)

Ở ví dụ trên thì mình đã đặt các **organisms** là *Header, BreadCrumb, Content, ...* vào trong một *ExampleTemplate*. Và kết quả là mình được một template như thế này, các bạn thấy nó ngầu chưa :v:<br>

![](https://images.viblo.asia/3cfd45ba-328d-4d49-aaf2-6b3cfffdffcc.png)

Ở giai đoạn này, bạn sẽ chỉ việc quan tâm tới kết quả cuối cùng, điều sẽ ảnh hưởng rất nhiều tới ý kiến của khách hàng, sếp và các đồng nghiệp thân thương của bạn. <br>
Các **organisms** được kết hợp với nhau, tái sử dụng để tạo ra một giao diện hoàn chỉnh với bố cục khớp thiết kế.
## Pages
Các **pages** là các trường hợp cụ thể của các **templates**. Tại đây, các nội dung dạng ô chứa sẽ được thay thế bằng nội dung đại diện thực sự để mô tả chính xác những gì mà người dùng sẽ thấy.
Các **pages** là mức độ trung thực cao nhất và vì chúng hữu hình nhất nên thường là nơi hầu hết mọi người dành phần lớn thời gian của họ để đánh giá.

Giai đoạn **pages** rất cần thiết vì nó là nơi các bạn kiểm tra tính hiệu quả của hệ thống Atomic design. Xem mọi thứ trong ngữ cảnh cho phép các bạn có thể sửa đổi các **molecules**, **organisms** và **templates** nhằm giải quyết tốt hơn bối cảnh thực của việc thiết kế.
Và đây là thành quả cuối cùng của mình sau khi thêm các nội dung thực sự vào thay cho các ô chứa ở giai đoạn **templates**.

![](https://images.viblo.asia/47708403-11e6-4c64-9da2-c46ff6b480de.png)

Dưới đây là nguyên vẹn cấu trúc folder của mình, tất nhiên là sẽ có một vài thành phần mình chưa dùng hết ở page này nhưng chắc chắn sẽ được dùng ở những page khác thôi :)

![](https://images.viblo.asia/2423bdec-6c4c-42a4-a998-e010fef4640e.png)

# Tổng kết
Một trong những lợi thế lớn nhất mà **Atomic design** mang lại là khả năng chuyển đổi nhanh chóng giữa trừu tượng và cụ thể. Các bạn đồng thời có thể thấy được cách giao diện của mình được chia nhỏ thành các thành phần nhỏ nhất của chúng và cũng có thể xem cách các thành phần đó kết hợp với nhau để tạo nên trải nghiệm cuối cùng của bạn.<br>
Tất nhiên thì việc lựa chọn một cấu trúc thiết kế như thế nào cho tối ưu thì còn phải tùy thuộc vào từng dự án cụ thể mà các bạn gặp nữa. Theo mình thấy thì với kiểu thiết kế như thế này sẽ giúp dự án của chúng ta dễ kiểm soát cũng như maintain hơn khi scale dự án ngày càng lớn. <br>
Trên đây là tất cả những gì mình nghiên cứu được từ cuốn sách của tác giả [Brad Frost](https://bradfrost.com/). Hy vọng sẽ giúp các bạn có thêm một sự lựa chọn mới nữa cho việc phân chia cấu trúc thư mục dự án. Mọi góp ý các bạn xin vui lòng để lại phía dưới phần bình luận nha.<br>
Cảm ơn các bạn đã theo dõi. Chào thân ái và quyết thắng.:heart_eyes::heart_eyes::heart_eyes:
# Tham khảo
https://bradfrost.com/blog/post/atomic-web-design/
<br>
https://atomicdesign.bradfrost.com/chapter-2/