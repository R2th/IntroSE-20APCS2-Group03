## Tại sao cần marketing 1 bug?

Điều đầu tiên xuất hiện trong đầu tôi khi tối viết bài này là những lời của Cem Kaner – “Tester giỏi không phải là 1 người tìm ra nhiều bug nhất hoặc làm cho nhiều lập trình viên bối rối nhất. Tester giỏi là người mà nhận được nhiều bug đã được fix nhất.”

## Sự khác biệt giữa việc tìm ra thật nhiều bug và nhận được thật nhiều bug đã fix là gì?

Không phải bất kỳ bug nào được log vào 1 hệ thống bug management đều sẽ được fix bởi dev phải không? Câu trả lời là Không. Các yếu tố như thời gian để đưa sản phẩm ra thị trường, thời gian để hoàn thành dự án đúng tiến độ và các dev làm việc không theo lịch trình… buộc các công ty phải phát hành sản phẩm với 1 vài bug mà không ảnh hưởng lớn đến người dùng.

Ai mang niềm tin để các bộ phận quản lý tuyên bố rằng các bug trong sản phẩm sẽ không ảnh hưởng tới niềm tin của khách hàng, sự tin cậy và quyền lợi của các bên liên quan? – Các kỹ sư test hay là các team test – nhiệm vụ của mỗi kỹ sư test là nhận được các bug đã được fix mà nó có thể ảnh hưởng tiêu cực đến chất lượng sản phẩm.

Theo tôi, mức độ ưu tiên của các bug phần lớn phụ thuộc vào cách mà 1 vấn đề được trình bày bởi các tester với các team dev và các team quản lý.

Hãy nghĩ về nó giống như việc quảng cáo và marketing các vấn đề - điều này bao gồm 2 bước:

1. Viết và report các bug thật chính xác

2. Hiểu rõ mọi thứ về bug, bất kỳ chi tiết nào khác đều có thể được giải thích rõ hơn

![](https://images.viblo.asia/6cefc150-0ca4-45cc-b70a-f3acf0ec772f.jpg)

## Nghệ thuật report bug

Đúng vậy, report bug là 1 nghệ thuật. Cách mà 1 bug được viết thể hiện kỹ năng kỹ thuật, phạm vi chuyên môn và khả năng giao tiếp của 1 kỹ sư test.

Thường thì 1 bug sẽ chứa đựng những thông tin sau:

1. Tóm tắt bug

2. Các bước giả lập

3. Các tệp đính kèm (Snapshot, log file…)

4. Khả năng tái tạo của bug

5. Mức độ nghiêm trọng của bug

6. Software version, thông tin môi trường

7. Thông tin khác dựa trên các yêu cầu của tổ chức

Một lưu ý quan trọng: luôn đào sâu để tìm được nguyên nhân gốc rễ của vấn đề và report nó. Chẳng hạn, 1 lỗi đăng nhập đơn giản với sự kết hợp chính xác của username và password có thể liên quan tới các lý do như:

1. Thông tin đăng nhập không được xác thực

2. Các vấn đề timeout của mạng trong trường hợp của các login từ xa

3. Hệ thống có thể coi tất cả CAPS như là non-CAPS

Vì vậy, là 1 tester bạn cần giải mã được sự khác nhau trong khi làm các bản tóm tắt bug:

* “Không thể đăng nhập với username và password chính xác”

* “Không thể đăng nhập với username và password, khi username và password chứa đựng 1 hỗn hợp của bảng chữ cái CAPS và non-CAPS.”

Mô tả sau là 1 mô tả rất rõ ràng về vấn đề. Bằng việc này, bạn sẽ không chỉ tăng uy tín của bạn mà còn report thực tế 1 vấn đề thay vì 1 triệu chứng.

Bây giờ, chúng ta hãy xem từng lĩnh vực liên quan trong 1 bug report và thảo luận các khía cạnh quan trọng trong từng lĩnh vực:

### 1. Tóm tắt bug

Tóm tắt bug sẽ cần cung cấp 1 quick snapshot của chính xác vấn đề. Nó phải chính xác và định hướng tốt.

Ví dụ:

Ngoài lý thuyết, tôi sẽ cố gắng giải thích với các ví dụ.

Hãy giả sử 1 mô đun login đơn giản. Hãy giả sử vấn đề là 1 user mới truy cập 1 website không thể login với password mặc định của mình. Khi tôi trình bày kịch bản tương tự cho nhiều sinh viên mà tôi đang đào tạo trong giai đoạn ban đầu, đã có 1 vài câu trả lời về tóm tắt bug. Dưới đây là 1 vài ví dụ:

* “User mới không thể login”

* “User login không làm việc như mong đợi”

* “User không thể login với password chính xác”

Từ các ví dụ trên, bạn có thể chọn 1 báo cáo mà thực sự mô tả vấn đề không? Tôi không nghĩ vậy. Tóm tắt sẽ cần luôn đưa ra 1 thông tin hoàn chỉnh về kịch bản lỗi.

Hãy xem các mẫu sau:

* “User mới không thể login với password mặc định đã được cung cấp qua email hoặc 1 SMS”

Như bạn có thể thấy, từ mẫu trên 1 dev có thể hiểu rõ ràng vấn đề là gì và ở đâu.

Bởi vậy, hãy cố gắng tìm chính xác những từ để mô tả tóm tắt mà cung cấp được thông tin trực tiếp. Phải tránh nhưng cấu nói chung chung như “không hoạt động chính xác”, “không làm việc như mong đợi”…

### 2. Các bước tái tạo và các tệp đính kèm

Các bug không thể tái tạo luôn đặt phía sau mặc dù chúng có thể quan trọng. Do đó, hãy cẩn thận viết và mô tả chính xác các bước.

Các bước sẽ cần chính xác giống như khi nó dẫn đến vấn đề. Đối với các bug liên quan đến function, mẫu sau là ví dụ tốt nhất.

Ví dụ:

Hãy xem trên cùng 1 vấn đề đã được nêu trong phần trước.

1. Tạo 1 user mới sử dụng tùy chọn Sign Up trong home page. (Ví dụ Username: HelloUser)

2. 1 email và 1 SMS sẽ nhận được với 1 password mặc định. Email ID và số điện thoại cho SMS được cung cấp trong khi đang tạo user trong bước #1. (ví dụ email: HelloUser@hello.com, ví dụ Mobile number: 444-222-1123)

3. Lựa chọn tùy chon Login trong home page

4. Trong miền username, cung cấp Username được cung cấp trong bước #1

5. Trong miền password, cung cấp password mặc định nhận được qua 1 email hoặc SMS

6. Kích vào nút Sign In 

7. Kết quả mong đợi: User sẽ có thể login với username và password được cung cấp và điều hướng tới trang User Account 

8. Kết quả thực tế: Message “Invalid Username /Password” đã hiển thị.

Nếu bất cứ thông tin nào không được cung cấp trong ví dụ trên, sau đó nó sẽ dẫn đến lỗ hổng truyền thông và dev sẽ không thể giả lập vấn đề. Các bước phải cụ thể và chi tiết với dữ liệu mẫu mà bạn đang sử dụng test.

Nếu có thể, hãy cung cấp 1 snapshot của cái gì bạn thấy chính xác trên màn hình. Cách này, nó sẽ không chỉ cung cấp 1 cái nhìn tốt về vấn đề tới các dev mà còn là bằng chứng về kết quả test của bạn.

Các test case non-functional như stress, stability hay các test case về performance ngoài các chi tiết trên, thông tin về các kịch bản mà dẫn tới stress cho hệ thống có thể được report. Ngoài ra, có 1 vài hệ thống mà các report log cho mỗi hoạt động được thực hiện. Các log thường in các mục được cung cấp bởi các dev trong code của họ. Bất cứ khi nào 1 mô đun được thực hiện, các log tương ứng sẽ được in và hiển thị. Khi các log là available, nó sẽ giúp các dev rất nhiều trong việc giả lập vấn đề.

### 3. Tái tạo bug

1 vấn đề lớn hay nhỏ sẽ được ưu tiên dựa trên khả năng tái tạo. Nó có thể là luôn luôn thấy, thi thoảng, hiếm khi hay thậm chí chỉ 1 lần. 1 vấn đề mà luôn giả lập được sẽ được ưu tiên cao hơn phần còn lại.

![](https://images.viblo.asia/503e9904-136c-48d4-9833-a7134bb72f65.jpg)

Vì vậy, nhiệm vụ của 1 kỹ sư test là theo dõi chính xác kịch bản các vấn đề mà luôn luôn giả lập được. Đôi khi có thể có 1 vài vấn đề nằm ngoài kiểm soát của 1 kỹ sư test, điều này dẫn đến 1 vấn đề chỉ giả lập được 1 vài lần trong nhiều thử nghiệm. Trong các trường hợp như vậy, 1 kịch bản cụ thể được thực hiện cùng với số lần vấn đề được nhìn thấy trong suốt các thử nghiệm đó.

Điều này, lần lượt sẽ bổ sung niềm tin vào các bug report được đề cập bởi bạn. 1 lần nữa, điều này cải thiện uy tín của bạn như 1 tester. Tôi sẽ đưa cho bạn về những lý do để có 1 danh tiếng tốt ở phần sau.

### 4. Mức độ nghiêm trọng của bug

Mức độ nghiêm trọng chắc chắn là 1 trong những ảnh hưởng lớn nhất đến độ ưu tiên bug.

Sau đây là các loại khác nhau về mức độ nghiêm trọng. Hãy lưu ý rằng đây chỉ là các mẫu chung và nó khác nhau giữa các công ty.

* Mức độ nghiêm trọng 1 - Hiển thị stopper - đối với các bug nghiêm trọng, mà không được sửa, người dùng sẽ không thể tiếp tục sử dụng phần mềm và không có cách khắc phục nào

* Mức độ nghiêm trọng 2 - Cao - đối với các bug tương tự như Mức độ nghiêm trọng 1, nhưng có một cách giải quyết

* Mức độ nghiêm trọng 3 - Trung bình

* Mức độ nghiêm trọng 4 - Thấp

* Mức độ nghiêm trọng 5 - Thường.


Chẳng hạn, hãy so sánh hai vấn đề tương tự. 

Trong các set-top box của chúng tôi, rất ít nhà cung cấp dịch vụ cung cấp thông tin tần số của dịch vụ như được điều chỉnh hiện tại. Hãy giả sử rằng tần số được hiển thị là 100 MHz thay vì 100,20 MHz. Điều này có thể không ảnh hưởng đến việc người dùng xem các dịch vụ của người dùng nhưng có thể ảnh hưởng đến việc chẩn đoán giám sát của các set-top. Do đó, điều này có thể được trình bày như là một vấn đề nghiêm trọng mức 3.

Giả sử một vấn đề tương tự trong lĩnh vực ngân hàng: Nếu số dư tài khoản của bạn được hiển thị là 100 đô la, thay vì 100,20 đô la, hãy tưởng tượng tác động của vấn đề. Đây phải là một khuyết điểm nghiêm trọng mức 1. Như bạn có thể thấy trong cả hai trường hợp, vấn đề rất giống nhau là UI không hiển thị các chữ số sau dấu thập phân. Nhưng, tác động khác nhau tùy theo lĩnh vực liên quan.

## Tham gia hiệu quả vào các cuộc họp kiểm soát software version 

Thông thường, mỗi tổ chức có quy trình riêng để điều tra và ưu tiên các bug. Nói chung, một cuộc họp sẽ diễn ra vào các khoảng thời gian cụ thể trong suốt dự án để thảo luận về các bug và ưu tiên như nhau.

Quá trình trong suốt các cuộc họp như sau:

1. Query danh sách các bug từ hệ thống quản lý bug theo mức độ nghiêm trọng.

2. Nhìn vào bản tóm tắt và thảo luận về tác động của bug đối với trải nghiệm của người dùng bằng việc sử dụng một sản phẩm phần mềm.

3. Dựa trên đánh giá rủi ro và tác động, đặt mức độ ưu tiên và gán bug cho dev phù hợp để fix tương tự.

Trong bước # 2, bắt buộc là mọi kỹ sư test phải phản biện tác động của Bug đối với trải nghiệm người dùng nếu không bug sẽ không nhận được mức độ ưu tiên xứng đáng. Rốt cuộc, các tester xem xét quan điểm của người dùng để viết các test case và test sản phẩm.

Xem xét vấn đề của ví dụ trên về việc không hiển thị các chữ số sau dấu thập phân trong lĩnh vực ngân hàng. Đối với một dev, nó có vẻ như là một vấn đề ít nghiêm trọng hơn. Anh ta có thể lập luận rằng thay vì khai báo biến là một số nguyên, anh ấy đã khai báo như là một số thực để giải quyết vấn đề và do đó ít nghiêm trọng hơn.

Nhưng là một tester, vai trò của bạn là giải thích tình huống của khách hàng. Quan điểm của bạn nên là cách người dùng sẽ phàn nàn trong kịch bản này. Tester nên nói rằng điều này sẽ gây hoang mang cho người dùng khi khách hàng mất tiền của họ.

## Ảnh hưởng của việc không marketing một bug đúng cách

Nếu một bug không được market đúng cách, nó sẽ tạo ra các vấn đề như:

* Priority thiếu chính xác

* Sự chậm trễ trong việc fix các vấn đề quan trọng

* Product release có khuyết điểm nghiêm trọng

* Phản hồi tiêu cực của khách hàng

* Lám mất giá trị thương hiệu

Ngoài tất cả các lý do nêu trên, xây dựng danh tiếng kỹ sư test của bạn là rất quan trọng. Nó giống như phát triển một giá trị thương hiệu cho chính bạn.

Trong giai đoạn đầu sự nghiệp của bạn, nếu bạn có thể giữ số lượng “cannot reproduce” hoặc “Need more info” hoặc “Not a valid Bug” hoặc thay đổi severity của bạn thấp nhất có thể, đến 1 giai đoạn các bug của bạn sẽ không bị soi xét và chúng sẽ được gán trực tiếp cho dev phù hợp để được fix.

Để phát triển giá trị thương hiệu đó và giành được sự tin tưởng của nhóm của bạn và nhóm phát triển / hoặc các nhóm quản lý, bạn phải phát triển một số kỹ năng kỹ thuật về kiến thức test, phạm vi và kỹ năng giao tiếp.

## Kết luận

Bất kỳ sản phẩm hoặc dịch vụ nào dù lớn hay nhỏ luôn bị ràng buộc bởi thất bại nếu không có quảng cáo phù hợp. Sau khi một thương hiệu được thành lập, bất kỳ sản phẩm nhỏ nào cũng có thể trở thành super hit với người dùng.

Phải nói rằng, quảng cáo quá mức một sản phẩm cũng có thể gây tổn hại đến danh tiếng.

Vì vậy, một bug phải luôn được viết một cách rõ ràng, ngắn gọn và chính xác để nó đưa ra một vị trí chính xác của bug trong bản đồ extensive/exhaustive software. Tôi nhắc lại rằng điều này không chỉ cải thiện chất lượng phần mềm mà còn giảm chi phí test và phát triển phần mềm đến một mức độ tuyệt vời.

Tham khảo: [https://www.softwaretestinghelp.com/bug-reporting-get-your-bugs-fixed/?fbclid=IwAR2jE9J3WWe6sm4hylEwPwnRE56r4BmcqYE4eUF7IvEToLQgK2XZ3TdkCWI](https://www.softwaretestinghelp.com/bug-reporting-get-your-bugs-fixed/?fbclid=IwAR2jE9J3WWe6sm4hylEwPwnRE56r4BmcqYE4eUF7IvEToLQgK2XZ3TdkCWI)