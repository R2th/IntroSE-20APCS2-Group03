# Smoke testing và Sanity testing 

![](https://images.viblo.asia/51cee24f-f1ed-4342-bfae-10bff5e32ef6.jpg)


### 1. Smoke testing là gì?

Smoke testing là một loại kiểm thử phần mềm được thực hiện sau khi có một bản build mới, để đảm bảo rằng các chức năng chính, quan trọng của phần mềm vẫn hoạt động bình thường. Công việc này được thực hiện để phát hiện các vấn đề nghiêm trọng sớm nhất có thể, trong trường hợp phát hiện vấn đề, bản build đó sẽ bị từ chối, và không được bàn giao cho giai đoạn kiểm thử tiếp theo, do đó sẽ giúp tránh lãng phí thời gian cho cả người kiểm thử và phát triển. Trong smoke testing, các test case được chọn sẽ bao phủ được hầu hết các tính năng, thành phần chính quan trọng của sản phẩm phần mềm.

Ví dụ: Trong một ứng dụng web, có các chức năng như đăng nhập, trang chủ, tạo mới hồ sơ, gửi hồ sơ, quản lý hồ sơ,… Để có thể thực hiện được các thao tác trên hệ thống bạn cần phải đăng nhập vào ứng dụng thành công, tuy nhiên sau bản build thì một vài vấn đề xảy ra làm cho người dùng không thể login vào hệ thống được. Hay là đăng nhập được nhưng chức năng tạo mới hay gửi hồ sơ đi không thực hiện được. Đây là những tính năng quan trọng của hệ thống, vì vậy việc thực hiện smoke test trước khi bàn giao sẽ phát hiện sớm và fix sớm những vấn đề cơ bản này, thay vì phải bàn giao, thực hiện cài cắm cấu hình các thứ xong rồi bắt đầu kiểm thử thì mới phát hiện ra, gây lãng phí khá nhiều thời gian.

Vòng đời của Smoke testing
* Smoke testing pass -> bản build sẽ được chấp nhận để tiếp tục test sâu hơn 
* Smoke testing fail -> bản build sẽ bị reject để cho đến khi các vấn đề được fix
        
Smoke test được sử dụng trong các kịch bản dưới đây:

* Được thực hiện bởi developers trước khi đưa bản build cho team tester
* Được thực hiện bởi tester trước khi họ thực hiện test chi tiết hơn
* Được thực hiện để đảm bảo rằng những tính năng cơ bản của ứng dụng hoạt động đúng như mong đợi

Ưu nhược điểm của Smoke testing

* Ưu điểm: 
1. Dễ dàng thực hiện
2. Giảm thiểu rủi ro
3. Bug được phát hiện ở giai đoạn rất sớm
4. Tiết kiệm effort, thời gian và tiền bạc
5. Chạy nhanh nếu tự động
6. Rủi ro và vấn đề tích hợp ít nhất
7. Cải thiện chất lượng toàn bộ hệ thống

* Nhược điểm:
1. Smoke test không thể thay thế cho kiểm thử chi tiết
2. Loại kiểm thử này phù hợp nhất nếu bạn có thể tự động hóa thời gian dành cho việc test thủ công các test case, đặc biệt là các project lớn
### 2. Sanity testing là gì?
Sanity testing cũng là một loại kiểm thử phần mềm, Sanity testing được thực hiện sau khi nhận được bản build, ở bản build này một số chức năng của phần mềm được chỉnh sửa, cập nhật do yêu cầu hoặc một số lỗi nào đó đã được sửa, việc này để kiểm tra nhanh các trạng thái hoặc thay đổi đó có ảnh hưởng đến các tính năng khác hay không, có đáp ứng như mong đợi hay không? Nếu các vấn đề được tìm thấy, bản build sẽ không được đưa tới giai đoạn kiểm thử chi tiết hơn tiếp theo, giúp giảm thiểu thời gian và các chi phí khác.

Ví dụ: trong ứng dụng ví dụ bên trên, ở bản build trước có phát hiện ra lỗi liên quan đến việc gửi hồ sơ do phân quyền sai nên hồ sơ được gửi đi nhưng lại gửi không đúng người nhận, ở bản build này bug này đã được sửa, sanity test ở đây sẽ kiểm tra nhanh việc chỉnh sửa chức năng này có liên quan đến các chức năng, vai trò khác hay không? Nhưng vẫn cần phải lưu ý rằng mình sẽ chỉ kiểm tra những phần có liên quan nhất, không sa đà chi tiết quá vào việc kiểm thử chức năng, giao diện gửi hồ sơ hay những chức năng đã ổn định khác, vì thời gian dành cho sanity test là không nhiều.

Ưu nhược điểm của Sanity testing
* Ưu điểm:
1. Tiết kiệm nhiều thời gian và effort bởi vì Sanity testing tập trung vào một hoặc hai chức năng
2. Không mất effort đưa nó vào tài liệu bởi vì nó thường không được ghi
3. Nó giúp xác định các đối tượng thiếu phụ thuộc
4. Nó được sử dụng để verify rằng một chức năng nhỏ của ứng dụng vẫn hoạt động đúng sau thay đổi nhỏ.
* Nhược điểm:
1. Sanity testing chỉ focus vào các câu lệnh và các function của phần mềm
2. Nó không đi đến mức cấu trúc thiết kế vì vậy rất khó để dev tìm ra cách fix những bug được tìm thấy trong sanity testing
3. Trong Sanity testing, việc test chỉ được thực hiện cho một vài chức năng hạn chế, vì vậy nếu có vấn đề xảy ra với những chức năng khác thì sẽ khó để bắt chúng
4. Sanity testing thường không được ghi lại vì vậy việc tham khảo cho tương lai là không có sẵn.

### 3. Một vài so sánh cơ bản giữa Smoke và Sanity testing



| Smoke testing | Sanity testing | 
| -------- | -------- |
|Smoke testing được thực hiện để đảm bảo rằng các chức năng quan trọng của phần mềm vẫn hoạt động bình thường   | Sanity testing được thực hiện để xác định các chức năng hoạt động đúng như yêu cầu, thiết kế sau khi có một vài thay đổi nhỏ, hoặc sau khi fix 1 bug nào đó.     | 
| Mục đích của Smoke testing đó là kiểm tra sự “ổn định” của hệ thống để có thể tiến hành các bước kiểm thử nghiêm ngặt hơn     | Mục đích của sanity testing là kiểm tra sự hoạt động “hợp lý” của hệ thống để có thể tiến hành các bước kiểm thử nghiêm ngặt hơn     | 
| Kiểm thử này thường được thực hiện bởi đội phát triển (Developer) hoặc đội kiểm thử (tester)    | Sanity testing thì thường được thực hiện bởi đội kiểm thử   | 
| Smoke test thường được lưu thành các tài liệu cố định hoặc các script để có thể chạy tự động (Bởi vì đơn giản, khi các chức năng lớn quan trọng của hệ thống sẽ được định hình ổn định trước tiên, và mỗi lần build thì đều phải đảm bảo hoạt động của các chức năng đó thì mới được coi là build thành công, vì vậy việc tài liệu hóa hoặc viết script là việc cần thiết nên làm)     | Đối với Sanity testing, do tính không ổn định trước những yêu cầu và các vấn đề phát sinh khác nên sẽ không có tài liệu cụ thể hay script nào được dựng sẵn cả.   | 
| Smoke testing được thực hiện trước giai đoạn kiểm thử hồi quy   | Sanity testing được thực hiện trước giai đoạn kiểm thử hồi quy và sau giai đoạn Smoke testing.     | 
| Smoke testing sẽ kiểm tra tổng thể toàn bộ hệ thống   | Sanity testing kiểm tra từng phần hệ thống.  | 

Bài viết trên đây là những khái quát cơ bản về Smoke testing và Sanity testing, hi vọng có thể giúp tester có thể phần nào hiểu về Smoke testing và Sanity testing để có thể áp dụng được trong dự án thực tế 


--------------------------------------------------------------------------

Nguồn tham khảo
https://www.guru99.com/smoke-sanity-testing.html