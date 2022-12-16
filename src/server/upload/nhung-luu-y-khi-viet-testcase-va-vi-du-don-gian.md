Trong quá trình kiểm thử phần mềm giai đoạn thiết kế test case và viết ra được bộ testcase hiệu quả có thể tái sử dụng được để tiết kiệm được nhiều thời gian trong các giai đoạn sau của test cũng như hạn chế tối đa việc lọt bug đóng vai trò rất quan trọng, ảnh hưởng trực tiếp đến kết quả kiểm thử.

Để viết được testcase trước tiên cần hiểu testcase là gi?

Một test case đơn giản là một tập hợp các bước cần được thực hiện để kiểm tra các chức năng riêng biệt trong ứng dụng khi test.

# I. Dưới đây là một số lưu ý để viết testcases hiệu quả 

#  1. Quy ước đặt tên cho testcase

  Nên đặt theo một cách dễ hiểu cho chính người tạo cũng như người sưr dụng để testcase đó. Thương thì tên test case nên thể hiện được tên của module, hoặc chức năng mà bạn sẽ test trong test case đó

Ví dụ

Có một dự án là “AC” có chức năng “Login”.

Bây giờ mình muốn viết một test case để kiểm tra xem người dùng có thể đăng nhập vào trang web sử dụng email và mật khẩu không.

Theo đó, thay vì đặt tên test case là TC_01, mình có thể sử dụng quy ước đặt tên cho testcase của mình để khi nhìn vào ta sẽ có một gợi ý ngắn gọn những gì mà test case đó sẽ test.


TC_01_AC_Login_Success or,

TC_01_AC_Valid_Case,...

*=> Tóm lại khi đặt tên ta nên đặt làm sao cho cho nó có liên quan đến dự án, module, chức năng của test case đó. Tùy thuộc vào mỗi dự án ta cũng sẽ có những cách đặt tên phù hợp và dễ quan sát hơn.*

# 2. Miêu tả test case

Miêu tả của test case là phần mà bạn sẽ mô tả chi tiết tất cả những gì mà bạn sẽ thực hiện để test 

“Miêu tả” ở đây có thể hiểu đơn giản là  “Mình sẽ test những gì”?

Bao gồm: Phần mềm cần được test những gì? trên những môi trường nào? cần những dữ liệu nào để test? 

*=>Tóm lại:  Bạn cần cố gắng đưa ra nhiều thông tin cần thiết nhất có thể trong phần miêu tả test case.*

Những thông tin này có thể là:
- Kiểm thử được thực hiện/ hành vi được xác minh
- Điều kiện tiên quyết và các giả định (nếu có sự phụ thuộc)
- Dữ liệu test sẽ được sử dụng
- Chi tiết về môi trường test (nếu có)
- Tool test có thể được sử dụng 



### Điều kiện tiên quyết và các giả định

Khi viết test case, bạn nên kiểm tra tất cả các giả định có thể dùng cho một test case và bất kì điều kiện nào cần có trước khi thực hiện test. Ví dụ:

- Những sự phụ thuộc vào dữ liệu người dùng (ví dụ: người dùng nên đăng nhập vào hệ thống, trang nào người dùng nên bắt đầu…)
- Những sự phụ vào môi trường test
- Những setup đặc biệt cần có trước khi test
- Những phụ thuộc giữa các test case với nhau: test case cần thực hiện trước hoặc sau những test case khác.

*=> Tóm lại: Hãy cố gắng liệt kê tất cả các thông tin cần thiết nhất có thể có về các giả định cũng như điều kiện cần trước khi thực hiện test*

### Dữ liệu đầu vào trước khi test

Việc xác định dữ liệu đầu vào trước khi test tiêu tốn khá nhiều thời gian, có một số trường hợp việc tạo data nó chiếm phần lớn thời gian trong giai đoạn test. Nhưng cũng có khi việc tạo mới hoặc tạo lại dữ liệu lại tốn it thời gian hơn so với việc xác minh kết quả. 

Để dễ dàng và tiết kiệm thời gian hơn khi test hãy cố gắng đưa những dữ liệu test sẽ được sử dụng cho việc kiểm thử vào trong phần miêu tả hoặc tại các bước đặc tả của test case như vậy sẽ ko mất thời gian để bạn và những người tester khác phải mất công tìm dữ liệu khi test.

Ví dụ như:

- Trong một số trường hợp nếu dữ liệu test có thể được sử dụng lại nhiều lần, bạn có thể ghi rõ để sử dụng cho việc kiểm thử. Nếu test chỉ liên quan đến một vài giá trị được kiểm thử, bạn có thể chọn ra các  khoảng giá trị hoặc mô tả cụ thể giá trị nào được test cho trường hợp nào. Tương tự cho các trường hợp ngược lại. Test với từng giá trị là không thực tế nên bạn có thể chọn một vài giá trị từ phân vùng mà có giá trị bao phủ tốt cho test case (sử dụng kỹ thuật phân vùng tương đương và phân tích giá trị biên để tạo testcase)

# 3. Đảm bảo tất cả các điểm cần được kiểm tra trong các bước thiết kế test

Một phần quan trọng khác để viết được test case tốt là các bước xác minh xem testcase đã  bao phủ được tất cả các điểm chức năng của hệ thống hay chưa?

=> Các bước thiết kế test không chỉ đảm bảo luồng chức năng mà còn phải đảm bảo mỗi điểm chức năng cũng cần được kiểm tra.

Bằng việc so sánh các test case với tài liệu (spec, usecase, kịch bản người dùng,...) của dự án, bạn có thể xác định được test case có thể đảm bảo được các trường hợp cần kiểm tra.


# 4. Đính kèm các tài liệu liên quan

Như đã nói ở trên,  hãy cố gắng đính kèm tài liệu liên quan nếu có vào test case. Nếu dự án của bạn không có quá nhiều sự thay đổi thì có thể đính kèm nó vào từng bước test. Nhưng nếu nó bao gồm một phần đặc biệt trên màn hình, rất khó để ghi lại trong từng bước test thì hãy đính kèm tài liệu đặc tả hoặc thiết kế màn hình tới các bước cụ thể đó.

# 5. Kết quả mong đợi

Một test case tốt cần phải ghi một cách rõ ràng kết quả mong đợi của ứng dụng hoặc hệ thống. Mỗi bước thiết kế test cần chỉ ra rõ ràng những gì bạn mong đợi như là đầu ra của bước kiểm tra đó.

Nên trong khi viết test case hãy cố gắng chỉ ra cụ thể trang nào, màn hình là kết quả mong đợi khi test và bất kì sự thay đổi nào trong mong đợi như  đầu ra được tạo ở phần back-end của hệ thống hoặc cơ sở dữ liệu. (ví dụ:  sự tạo mới một đối tượng thì đối tượng đó cần được thêm vào bảng dữ liệu).

Bạn có thể đính kèm màn hình hoặc tài liệu đặc tả tới các bước liên quan để chỉ ra được hệ thống cần xử lý đúng như những gì trong tài liệu yêu cầu.

# 6. Chia các test case chức năng đặc biệt trong một nhóm

Để viết test case hiệu quả, bạn nên cân nhắc việc chia test case của bạn thành các nhóm nhỏ theo nhóm các trình tự đặc biệt như cách xử lý của trình duyệt, kiểm tra cookie, test tính khả dụng, web service, kiểm tra điều kiện lỗi.

Nếu bạn cố gắng để viết testcase hiệu quả, bạn nên viết những test case chức năng riêng.

Cụ thể như test case để kiểm tra điều kiện lỗi nên được viết riêng với test case chức năng và nên có các bước kiểm tra thông báo lỗi. Hoặc khi viết testcase cho các chức năng đặc thù có nhiều sự kết hợp điều kiện đầu vào, bạn có thể chia thành các nhóm nhỏ hơn.

Ví dụ: Nếu bạn cần kiểm tra xem chức năng đăng nhập cho ứng dụng nào đó với dữ liệu đầu vào không đúng, bạn có thể chia việc test chức năng đăng nhập không hợp lệ thành các nhóm sau:

- Kiểm tra email-id không đúng

- Kiểm tra mật khẩu không đúng

- Kiểm tra trường email-id trống…

# 7. Dễ đọc và dễ hiểu

Bất kì dự án nào khi làm việc thì người thiết kế testcase có thể sẽ không phải là người thực hiện test chính vì vậy test case nên dễ hiểu và dễ đọc, chi tiết cho tất cả mọi người.
Vì trong quá trình test người viết ra testcase có thể nghỉ vì một lý do nào đó hoặc chuyển qua dự án khác nếu bạn viết testcase mà chỉ mình bạn hiểu thì có thể bạn sẽ phải dành hết thời gian để giải thích những gì bạn viết.
Nên tốt hơn hãy làm nó đúng ngay lần đầu tiên: 

- Đơn giản và dễ hiểu với mọi người (bao gồm bạn)
- Rõ ràng, chi tiết, bạn không phải đang viết bài luận (nếu bạn thấy test case có nhiều bước thì nên tách thành test case mới).
- Đảm bảo đủ các trường hợp.
# 8. Kiểm tra lại

Test case đóng một vai trò quan trọng trong vòng đời test, vì vậy việc đảm bảo nó đúng và hợp chuẩn trở nên rất cần thiết – điều này sẽ được xác định qua quá trình kiểm tra lại testcase

=> Kiểm tra lại test case có thể thực hiện giữa những người tester trong team, leader của đội kiểm thử, người phân tích nghiệp vụ chức năng, lập trình viên, chủ sản phẩm hoặc các bên liên quan.

Một lưu ý nhỏ cho quá trình này đó là cần xác định một vài điều kiện cần có trước khi bắt đầu kiểm tra lại vì quá trình kiểm tra lại cũng có thể gây hại.

# 9. Có thể sử dụng lại

- Luôn đặt tiêu chí khi viết test case làm sao cho chúng có thể được sử dụng lại trong tương lai cho các dự án khác, nhóm khác. Trước khi viết test case cho một dự án nào đó bạn nên kiểm tra lại xem có test case nào được viết rồi. nó sẽ giúp bạn tiết kiệm được nhiều thời gian.

- Cũng như thế, nếu bạn có test case sẵn có được viết trước đó ở cùng module, bạn nên chỉnh sửa lại chúng cho phù hợp với module thay vì viết mới . Nhưng cách này ko phải lúc nào bạn cũng có thể áp dụng đặt biệt như dự án mới có nghiệp vụ khác hoàn toàn.
- Cũng như vậy, nếu bạn cần một test case cụ thể để thực hiện test case khác, bạn có thể thực hiện đơn giản bằng cách gọi đến test case đã tồn tại trong phần điều kiện trước hoặc ở bước thiết kế test.

# 10. Bảo trì và cập nhật

Điều này rất quan trọng để chắc chắn rằng test case luôn được cập nhật theo những thay đổi mới theo yêu cầu từ phía khach hàng và những cải thiện tốt hơn cho ứng dụng. Luôn chú ý cập nhật test case đã tồn tại trước đó trước khi bạn bắt đầu viết hoặc thêm test case mới hoặc ngày cả trong quá trình test.

=> Tóm lại trong trường hợp có bất kì sự thay đổi nào tới chức năng đã tồn tại, bạn phải cập nhật test case đã tồn tại thay vì viết mới để tránh việc dư thừa và bạn luôn có một một testcase cập nhật mới nhất phù hợp với những thay đổi.

# 11. Điều kiện đầu ra

Điều kiện đầu ra cơ bản là đặc tả các kết quả bạn cần kiểm tra sau khi thực hiện test. Ngoài ra điều kiện đầu ra cũng được sử dụng để đưa ra hướng dẫn phục hồi lại hệ thống với trạng thái gốc cho nó không ảnh hưởng đến việc test sau này.

Ví dụ: nếu bạn đề cập những thay đổi được tạo ra tới tập dữ liệu test cho nó, được sử dụng cho testcase sau này cho cùng chức năng.


# II. Ví dụ đơn giản

Dưới đây mình sẽ viết một ví dụ đơn giản về testcase cho màn hình tạo mới một đối tượng với yêu cầu như sau:

- Tạo mới một ghi chú với 5 item là title, content, file, button save, button cancel với các thiết kê như hình bên dưới

![](https://images.viblo.asia/9059801b-0088-481d-85f5-36d2c12d3540.png)

- yêu cầu cụ thể như hình dưới đây:

![](https://images.viblo.asia/751229c6-b7a9-4ac0-981a-aa03d27903c5.png)

- Testcase:

![](https://images.viblo.asia/f262febc-d9a6-4efe-8f65-0c5ca1b9fc88.png)
![](https://images.viblo.asia/d9cd2711-030d-45b0-9deb-e861b2a3f1f7.png)

=> Nhìn vào testcase trên các bạn có thể thấy định hướng viết của mình sẽ là đi từ:
+ Check các giá trị khởi tạo của màn hình: check hiển thị của các item 
+ Check các event của màn hình: save, cancel
# Kết luận
Hy vọng bài viết trên sẽ giúp các bạn viết được bộ testcase tốt cho dự án của mình

*Nguồn tham khảo: http://quicksoftwaretesting.com/test-case-writing-tips/*