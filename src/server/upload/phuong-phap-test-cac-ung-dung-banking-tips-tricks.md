Hiện nay, đặc thù của phần mềm đóng vai trò lớn trong việc phát triển chiến lược kiểm thử phần mềm chất lượng cao. Nếu sản phẩm quá phức tạo đối với hàng ngàn bên liên quan, thì quá trình kiểm thử sẽ cần nhiều thời gian, nguồn lực, và giám sát công việc một cách liên tục. Trong đó thì quá trình test ứng dụng Banking là một case ví dụ điển hình.

Từ những kiến thức thu thập được trong ngành ngân hàng, thì những hệ thống này có thể được chia làm ba loại chính:
- Phần mềm dành cho nhân viên ngân hàng;
- Phần mềm dành cho khách hàng của ngân hàng;
- Platform cho phát triển phần mềm banking

Banking CRM thích hợp (phần mềm Customer Relationship Management - Quản trị quan hệ khách hàng) lưu trữ toàn bộ thông tin khách hàng, từ việc kí những hợp đồng liên quan cho tới khi hoàn thành hợp đồng. 

Khi test những ứng dụng phần mềm banking, chúng ta sẽ phải đối mặt với những vấn đề ảnh hưởng lớn tới công việc và không phải lúc nào cũng phụ thuộc vào bản thân tester. Ví dụ như, khả năng hoàn thành task tốt và đúng hạn.

Sau đây là những điểm quan trọng có thể giúp các banking tester tránh những trở ngại thường gặp khi test các ứng dụng banking.

## UI và UX

Những nhân viên ngân hàng thường có thiếu sót về kỹ năng đọc viết trên máy tính (Điều này tuy không dễ tiếp nhận, nhưng là sự thật), vậy nên giao diện họ làm việc phải cực kỳ thân thiện với người dùng. Đây là một điểm nên chú ý.

Vậy nên, test giao diện người dùng (UI) và trải niệm người dùng (UX) hiển nhiên là việc cực kỳ quan trọng - trải niệm của người dùng tốt sẽ dẫn đến sự hài lòng của khách hàng. Để đạt được kết quả này thì chúng ta cần nhiều dịch vụ test UI/UX. Giao diện ngân hàng nên có các thuộc tính đồ hoạ đơn giản (Các nút, các biểu tượng, các trường, drop-down list,...) cũng như có các tooltip gợi ý tương ứng./

Điều này giúp tiết kiệm rất nhiều thời gian cho các nhân viên ngân hàng và kèm theo đó là phản ứng tích cực từ phía khách hàng. Trong khi đó, đội ngũ QA tham gia vào việc đảm bảo chất lượng phần mềm sẽ nhận được những phản hồi tích cực. Bằng cách này, UI và UX phải được đội ngũ QA đầu tư test một cách kỹ lưỡng. Bởi những yếu tố này chính là những yếu tố mà người dùng tiếp cận đến đầu tiên chứ không phải các xử lý nghiệp vụ phức tạp cũng như hệ thống chạy bên trong ứng dụng.

## Chức năng

Như đã đề cập trước đó, Banking CRM là một hệ thống rất lớn với hàng ngàn các bên liên quan giữa các module. Bằng cách này, tất cả các xử lý bên ngoài và bên trong liên quan đến banking chain phải được tạo, tích hợp, cập nhật và cuối cùng là xoá thành công. 

Để đảm bảo các chức năng này hoạt động một cách hoàn hảo nhất, thì tất cả các phần phụ thuộc và các section biên phải được test một các kỹ lưỡng. Bởi việc sửa một phần chức năng có thể ảnh hưởng tới các module gọi chức năng này. Một phương pháp phổ biến hiện nay là sử dụng ma trận truy xuất RTM (Requirement Traceablity Matrix). Đây là một trong những phương pháp hữu ích và tối ưu nhất để kiểm thử các chức năng của các phần mềm banking

Một ví dụ cơ bản về các bước tạo nên RTM trong quá trình test:
Step 1: "Xác thực login, khi ID và mật khẩu được nhập chính xác, sẽ login thành công"

![](https://images.viblo.asia/70a4e8d1-e3c6-4dde-8667-682919830b9e.png)

Step 2: Xác định yêu cầu kỹ thuật của test case đang được xác thực, giả sử trong test case thì, yêu cầu T94 đang được xác thực 

![](https://images.viblo.asia/6b16f666-76c6-4925-836c-b8a526aab45d.png)

Step 3: Note lại yêu cầu kỹ thuật (T94) này lại vào trong Test case

![](https://images.viblo.asia/dfe89655-be72-4ef2-ac71-d9e7c75fd776.png)

Step 4: Xác nhận yêu cầu nghiệp vụ mà yêu cầu kỹ thuật này được định nghĩa.

![](https://images.viblo.asia/d1b5c5a1-1543-4324-b8df-4091c412b1f0.png)

Step 5: Note lại yêu cầu nghiệp vụ này lại vào trong Test case

![](https://images.viblo.asia/9863f199-adca-4d66-881e-596428cf347c.png)

Step 6 Làm toàn bộ các bước trên đối với tất cả Test case. Sau đó tổng hợp lại thành 3 cột và Ma trận truy xuất yêu cầu đã được hoàn thành.

![](https://images.viblo.asia/ba863f67-a7e4-4a21-a58e-4b0443a63daa.png)


## Load và Performance

Theo ý kiến cá nhân của tôi, một trong những vấn đề lớn nhất những nhân viên ngân hàng gặp phải khi làm việc với phần mềm banking đều có liên quan tới Performance - hiệu suất. Thông thường, những vấn đề này ảnh hưởng rất lớn đến nhân viên ngân hàng, và kéo theo đó, là đem đến cảm giác không thoải mái cho khách hàng.

Tần suất xuất hiện những lỗi này có thể do một lượng lớn người dùng sử dụng phần mềm cũng như nhiều thuật toán được chạy đồng thời. Hệ thống thường xuyên được update cũng có thể ảnh hưởng tới tính thống nhất và toàn vẹn giữa các chức năng của phần mềm banking.

Những hệ quả kéo theo, nhỏ nhất sẽ là mức độ hài lòng thấp tới từ phía khách hàng. Hoặc lớn hơn, sẽ là rò rỉ dữ liệu người dùng hoặc những hoạt động của ngân hàng (Dữ liệu người dùng có thể được lưu không phù hợp hoặc mất hoàn toàn).

Load, performance, và stress testing rất được khuyến khích nhằm tránh các vấn đề liên quan tới tính chính xác của phần mềm. Các phương pháp này giúp dự đoán và hạn chế các rủi ro có thể xảy ra mà người dùng có thể gặp phải khi sử dụng phần mềm banking với khối lượng công việc rất lớn.

## Security
### Banking Software

Tất cả các công ty làm việc với data khách hàng đều phải đảm bảo được tính bảo mật, toàn vẹn và bảo vệ toàn bộ thông tin khách hàng trước mọi rủi ro rò rỉ data khách hàng. Đặc biệt trong lĩnh vực ngân hàng, tính bảo mật được đòi hỏi rất cao. Data người dùng không chỉ là những thông tin cá nhân của khách hàng, còn là các giao dịch tài chính, đây là những thông tin vô cùng giá trị. Bởi vậy, các phần mềm banking phải đủ đáp ứng các tiêu chí này, và cung cấp cho khách hàng sự bảo vệ dữ liệu ở mức độ cao nhất.

Các kỹ sư QA đang làm việc với phần mềm banking cần phải có kiến thức chuyên môn sâu về test tính bảo mật và tham gia phát triển chiến lược test toàn diện. Tester không chỉ kiếm tra những chức năng trong phần mềm cần thiết mà còn cần dự đoán trước các rủi ro có thể xảy ra trong tương lai.

Cụ thể, các ngân hàng hiện nay còn cung cấp tới cho người dùng bảo mật nhiều lớp ngoài mật khẩu, mã OTP, hay cao hơn nữa là bảo mật vân tay và bảo mật nhân dạng (Face id). Với sự phát triển công nghệ bảo mật ngày một nhanh, những hình thức bảo mật này được tích hợp ngay trên chính thiết bị của người dùng. các kỹ sư QA cần nắm rõ các phương thức bảo mật tân tiến khi làm việc với những phần mềm banking hiện nay.

### Online Banking

Khi test các hệ thống banking, đặc biệt với hệ thống online banking hiện nay hoạt động trực tuyến 24/7. Lúc này, sử dụng các tool để test các case về Load, performance, và stress là rất cần thiết. Với một website nhỏ, quy mô người dùng hàng ngày sẽ khoảng vài nghìn. Nhưng với phần mềm banking, đặc biệt là online banking, các giao dịch lên tới hàng chục triệu giao dịch trong một ngày và có thể cao hơn thế nữa. Đây là vấn đề rất lớn các kỹ sư QA phải đối mặt khi làm việc với các hệ thống ngân hàng ngày nay.

### Nền tảng tạo phần mềm Banking

Để phù hợp với các nguyên tắc tương tự với các phần mềm banking nói chung. Tôi xin đề xuất những quan điểm dưới đây khi test các nền tảng phần mềm banking:

**Đầu tiên**, chúng ta cần hiểu rằng nền tàng phát triển phần mềm banking là một phần không thể thiếu đối với phần mềm. Bằng cách này, chất lượng của nền tảng banking sẽ quyết định chất lượng sản phẩm banking nói chung. Một nền tảng chất lượng cao sẽ đảm bảo việc phát triển một phần mềm an toàn, ổn định và hấp dẫn người dùng. 

**Thứ hai**, những chủ sở hữu các phần mềm banking, cũng như người dùng trong tương lai, tin rằng các ứng dụng banking sẽ đáp ứng hoàn toàn những mong đợi của họ. Do đó, trước khi bắt đầu quá trình test, các kỹ sư QA nên điều tra các sản phần này dưới những khía cạnh như: Kinh doanh, kỹ thuật và từ quan điểm của người dùng. Cần chú ý tới các module phần mềm và toàn bộ những bên phụ thuộc (ở đây, chúng ta đã đề cập sử dụng ma trận truy xuất nguồn gốc như đã nói ở trên).

**Và cuối cùng**, đừng quên định nghĩa và tổ chức các phương pháp test cần thiết. Cần kiểm tra xem có thể cài đặt và gỡ bỏ những ứng dụng trên nền tảng banking hay không ( Với bất kỳ driver, hay trình duyệt web nào). Tester cần test phần mềm banking để tránh những conflict khác nhau mà người dùng có thể gặp phải khi sử dụng phần mềm. Tất cả các chức năng phần mềm banking cần phục vụ người dùng và giúp người dùng thực thi công việc một các hiệu quả nhất với effort thấp nhất. 

**Kết luận**

Các phần mềm banking, dù là trên nền tảng website hay nền tảng mobile. Thì những phần mềm này đều thực thi những data vô cùng nhạy cảm của người dùng, vậy nên security test là bắt buộc. Với một phần mềm có tính phổ biến cao như phần mềm banking. Các QA/Tester cũng chính là những end user, trải nghiệm phần mềm banking này hàng ngày. Vì vậy, các kỹ sư QA không chỉ tập trung vào việc tìm kiếm lỗi mà còn cần tìm cách cải thiện sản phẩm, đáp ứng với nhu cầu ngày một cao của thị trường.


Nguồn: https://testfort.com/blog/how-to-test-banking-applications-tips-tricks
https://testfort.com/blog/how-to-ensure-your-mobile-banking-app-is-tested-thoroughly
https://www.guru99.com/traceability-matrix.html