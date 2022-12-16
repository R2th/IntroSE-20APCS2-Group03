Với mỗi một kiểm thử viên chắc không xa lạ gì khi viết testcase theo hàng ngang,hàng dọc hay checklist. Mỗi một cách viết có những ưu nhược điểm khác nhau và vào tính chất của từng dự án, nội dung của specs mà kiểm thử viên có thể lựa chọnviết testcase theo kiểu test hàng ngang, hàng dọc hay checklist. Bài viết này sẽ giới thiệu đến các bạn cách sử dụng checklist trong quá trình tạo testcase

**1. Checklist là gi?**

Checklist – Là một danh sách các đầu mục chức năng/ nghiệp vụ cần kiểm tra trong một thủ tục hay quy định nhất định. Nó giúp cho người kiểm thử nắm bao quát được tổng thể các chức năng trong 1 object & Đánh giá được trường hợp pass or fail. Từ bộ checklist sẽ được bóc tách chia thành nhiều ca kiểm thử (testcase)

**2. Tại sao phải sử dụng checklist trong kiểm thử?**

Checklist có thể bảo đảm tất cả các yêu cầu của client sẽ được đảm bảo trong quy trình kiểm thử

Checklists cón thể đảm bảo rằng phần mềm được kiểm tra với mức bao phủ cần thiết

Checklists có thể giảm bớt bỏ quên lỗi cho tester

Checklist có thể giúp công việc kiểm thử đảm bảo mức đúng đắn/ chính xác cho phần mềm

Checklist có thể giúp tester bao quát được vùng kiểm thử

Checklist có thể giúp tester nhìn rõ thấy quy trình kiểm thử

Checklist có thể tăng cường sự phối hợp giữa các nhóm tham gia khác liên quan tới nhau trong quy trình kiểm thử phần mềm

**3. Cách xây dựng một checklist**

Tùy vào tính chất từng dự án mà sẽ xây dựng lên checklist với các tiêu chí test khác nhau.
Nếu khách hàng không quy định và không có mẫu sẵn thì tùy vào từng sự nhìn nhận của mỗi kiểm thử viên sẽ xây dựng checklist với các tiêu chí khác nhau. Có thể nêu một số ví dụ cụ thể để hiểu rõ hơn về các tiêu chí trong checklist:

**a. Xây dựng check list gồm GUI, FUNCTION, STRESS TEST:**

**Nội dung test GUI:**

Kiểm tra layout có thích hợp với specs không

Kiểm tra giá trị default(Initial value)

Kiểm tra maxlength: xem khi đạt đến giá trị max thì hiển thị có bị lỗi, vỡ, chồng chéo lên nhau không

**Nội dung test Funtion:**

Kiểm tra hoạt động đúng của chức năng

Kiểm tra hoạt động khi đưa đầu vào là invalid

Kiểm tra hoạt động khi đưa đầu vào là valid

Kiểm tra hoạt động khi compare các trường

Xác nhận người dùng không thể chèn thông tin đầu vào trên các danh sách drop-down list
Kiểm tra tất cả các link liên kết

Xác nhận tất cả các trường texbox, các button liên quan đến việc di chuyển giữa các màn hình/ tab/pages

Xác nhận thanh navigation “Tabs” được trỏ đến vị trí thích hợp khi có lệnh

**Nội dung Stress test:**

Kiểm tra hoạt động của hệ thống khi click vào button nhiều lần

Kiểm tra hoạt động của hệ thống khi cùng một lúc có lượng lớn user sử dụng

Kiểm tra hoạt động của hệ thống khi up nhiều dữ liệu cùng lúc

**b. Xây dựng checklist dựa trên các tiêu chí như User experience , Information and visibility, Navigation, Site links, Search fields**

***User experience***

Kiểm tra định dạng các thông tin hiển thị đúng theo specs không

Kiểm tra / xác nhận rằng các chức năng chính hoạt động đúng

Kiểm tra/ xác nhận người dùng nhận được các thông báo lỗi cho các thông tin không hợp lệ VD: thông tin đăng nhập

Kiểm tra hoạt động của tất cả các buttons, checkboxes, radio buttons.. khi click

Kiểm tra/ xác nhận việc hiển thị thông tin pop-up trước khi ứng dụng được thay đổi

Kiểm tra/ xác nhận người dùng có thể sử dụng thông tin liên hệ có sẵn

Kiểm tra/ xác nhận rằng website tương thích với nhiều kích thước độ phân giải màn hình khác nhau

***Information and visibility***

Kiểm tra/ xác nhận các trường không cho phép chọn phải ở dạng disable

Kiểm tra/ xác nhận rằng người dùng nhận đươc thông báo lỗi khi thao tác có lỗi xảy ra không hợp lệ

Xác nhận rằng bạn có không gian hiển thị giữa các thông báo, các trường, các label … một cách hợp lý

Xác nhận rằng tất cả các hình ảnh/ video phải có mô tả thích hợp.

Xác nhận rằng nội dung của bạn không có lỗi chính tả

Xác nhận rằng những thông tin quan trọng phải được định dạng nổi bật

Chắc chắn rằng nội dung của bạn luôn được cập nhật

Xác nhận tất cả các pages/ grids phải có title

***Navigation***

Xác nhận thanh navigation “Tabs” được trỏ đến vị trí thích hợp khi có lệnh

Kiểm tra/ xác nhận người dùng di chuyển thuận tiện các phím tabs/ pages với các option trả về tab/page hiện tại có những gì

Kiểm tra/ xác nhận thanh cuộn “scrolling” phải sẵn có trong vùng thích hợp

Kiểm tra/ xác nhận người dùng không thể chèn thông tin đầu vào trên các danh sách “drop-down” list

Kiểm tra tất cả các link liên kết

Kiểm tra/ xác nhận tất cả các trường textbox, các button liên quan đến việc di chuyển giữa các tabs/ pages với nhau

Site links

Chắc chắn các chức năng chính phải được cấu hình như các button chứ không phải dạng link liên kết.

Kiểm tra/ xác nhận tất cả các link hoạt động đúng mong muốn

Kiểm tra các link liên kết được đánh dấu bởi màu sắc thích hợp

***Search fields***

Xác nhận rằng phải có màn hình hiển thị thông báo thích hợp nếu kết quả search trả về null

Kết quả tìm kiếm được hiển thị tương ứng với thuộc tính kết quả tìm kiếm

Kiểm tra kết quả tìm kiếm trả về có chứa cả đối tượng gần giống với kết quả tìm kiếm

Xác nhận rằng người dùng có thể lọc kết quả tìm kiếm với một vài tiêu chí tìm kiếm khác nhau

Kiểm tra/ xác nhận rằng phải có thông báo khi keysearch có kí tự đặc biệt

Kiểm tra rằng trong kết quả tìm kiếm không bị trùng lặp kết quả

Xác định trang hiển thị kết quả tìm kiểm phải rõ ràng, chính xác

**4. So sánh ưu nhược điểm của Checklist, test ngang, test dọc**

**a. Checklist:**

***Ưu điểm:***

Ngắn gọn, đảm báo tính đúng đắn, chính xác cho phần mềm kiểm thử

Giúp tester nhìn thấy rõ và bao quát quy trình kiểm tra

Mất ít thời gian phù hợp những dự án có specs thay đổi nhiều, lượng công việc lớn

**Nhược điểm:**

Cần phải nắm rõ specs thì kiểm thử viên mới tiến hành test được

Kiểm thử viên cần khả năng nhìn nhận, tạo ra các trường hợp kiểm thử dựa trên quan điểm test ở checklist

Sẽ khó khăn cho những bạn kiểm thử viên mới vì trong checklist không có thao tác rõ ràng

**b. Testcase kiểu ngang:**

**Ưu điểm:**

Mô tả chi tiết rõ ràng các bước thực hiện test, kết quả mong đợi cho từng funtion

Dễ theo dõi luồng và hoạt động của từng chức năng lớn của hệ thống

Dễ dàng tham gia test kể cả với những kiểm thử chưa có kinh nghiệm

Không cần nắm rõ hết specs cũng có thể thực hiện kiểm tra

**Nhược điểm:**

Tốn nhiều thời gian để tạo

Kiểm thử viên sẽ khó bao quát hệ thống khi nhìn vào test case ngang

Vì các bước rất chi tiết nên dễ tạo cảm giác ỉ lại vào testcase cho kiểm thử viên

Số lượng testcase nhiều nên nhiều khi dễ bị trùng lặp testcase, quan điểm

**c. Testcase dọc:**

**Ưu điểm:**

Thời gian tạo nhanh

Dễ bao quát toàn bộ chức năng

Khả năng bao phủ lớn, hạn chế bỏ xót trường hợp test

Với nhiều trường hợp test như search thì tạo test case dọc giúp việc tạo dễ dàng và nhanh chóng

**Nhược điểm:**

Khó xem xác nhận kết quả mong đợi cho từng trường hợp

Gây cảm giác khó khăc cho những kiểm thử viên chưa từng làm quen với test dọc

Không mô tả chi tiết rõ ràng các bước thực hiện test như trong test case ngang, cũng không chỉ ra quan điểm test như trong checklist

**Tài liệu tham khảo **

https://www.softwaretestinghelp.com/software-testing-qa-checklists/
https://www.softwaretestinghelp.com/sample-test-cases-testing-web-desktop-applications/