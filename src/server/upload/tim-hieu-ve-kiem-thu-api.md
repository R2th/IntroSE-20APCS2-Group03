## API là gì? 


Để tìm hiểu về vấn đề kiểm thử API và Web Service thì việc đầu tiên chúng ta cần định nghĩa : API là gì và nó hoạt động như thế nào?
Giao diện lập trình ứng dụng hoặc API, hoạt động để kết nối ứng dụng với web và với các API khác.

Một ứng dụng được tạo thành từ ba phần thiết yếu lý tưởng nên có thể làm việc và giao tiếp theo cách được phân đoạn, vì vậy, một ứng dụng có thể được hoán đổi cho một phần khác:

**Cấp dữ liệu ( Data Tier)**: Dữ liệu được lấy từ cơ sở dữ liệu và hệ thống tệp và sau đó được lưu trữ.

**Cấp Logic ( Logic Tier):** Bộ não của ứng dụng, xử lý dữ liệu giữa các lớp, điều phối ứng dụng, xử lý các lệnh và đưa ra các quyết định logic. Lớp này được tạo bởi API.

**Cấp trình bày (Presentation Layer)**: Lớp trên cùng của ứng dụng này là giao diện người dùng, dịch các tác vụ thành thứ mà người dùng hiểu.

![](https://images.viblo.asia/7adeaa45-9005-4cc8-aca7-d744dffdd550.png)

Nói cách khác, API là bộ não của thế giới kết nối của chúng ta. Nó là tập các công cụ, giao thức, tiêu chuẩn và mã kết nối thế giới số của chúng ta với nhau. API cho phép các công ty trở nên nhanh nhẹn hơn, để mọi thứ di động và mọi thứ hoạt động cùng nhau theo cách tích hợp, hợp lý.

Do đó, việc Testing API là việc kiểm thử các API và tích hợp chúng xem chúng có làm việc trơn tru hay không. Hình thức kiểm thử này chủ yếu tập trung vào việc sử dụng phần mềm để thực hiện cuộc gọi API để nhận được kết quả trước khi khảo sát và ghi lại phản hồi của hệ thống. Quan trọng nhất, việc kiểm thử này xác định API có trả về một phản hồi đầu ra đúng theo yêu cầu hay không. 
Kết quả đầu ra thường là 1 trong 3 điều sau:
Trạng thái Pass hoặc Fail
Thông tin dữ liệu
Một cuộc gọi đến API khác

Tuy nhiên, đôi khi cũng có thể sẽ có trường hợp không có output, điều này khẳng định rằng vai trò của Tester là vô cùng quan trọng đối với quy trình phát triển ứng dụng. Vì API là trung tâm dữ liệu cho nhiều ứng dụng cho nên việc kiểm thử API giúp tăng độ bao phủ và tính chính xác cho quá trình kiểm thử.
Trong việc kiểm thử API, việc xác định pass/fail cho kịch bản test là rất khó, tuy nhiên dựa vào kết quả so sánh dữ liệu API trả về sau khi gọi API sẽ giúp Tester xây dựng kịch bản test chính xác hơn.

Kiểm tra API là một trong những phần khó khăn nhất trong toàn bộ chuỗi kiểm thử phần mềm bởi vì nó hoạt động hàng ngày để đảm bảo cho cuộc sống số của chúng ta có thể chạy liền mạch và hiệu quả. Trong khi các developer có xu hướng chỉ kiểm thử các phần liên quan đến chức năng thì Tester chịu trách nhiệm kiểm thử toàn bộ cả các chức năng riêng lẻ và những phần liên quan từ đầu tới cuối để đảm bảo chất lượng sản phẩm.

## Tại sao kiểm thử API lại quan trọng?

Tất cả các loại phần mềm đều cần phải xác định được lỗi và những vấn đề, mâu thuẫn có thể xảy ra khi release sản phẩn ra thị trường. Và rõ ràng ta có thể thấy là việc đầu tư chi phí cho kiểm thử sẽ ổn hơn nhiều là tiết kiệm chi phí mà lại release ra một sản phẩm kém chất lượng và không an toàn ra thị trường.

**Dưỡi đây là một số ví dụ điển hỉnh của việc kiểm tra bảo mật mà có thể khiến API gặp trục trăc:**

API là những gì mang lại giá trị cho ứng dụng. Đó là những gì làm cho điện thoại của chúng ta trở lên "thông minh" và đó là những gì hợp lý hóa quy trình kinh doanh.
Nếu bất kỳ API nào không hoạt động hiệu quả, API sẽ không bao giờ được chấp nhận, bất kể đó là API miễn phí và mở hay API bạn tính phí cho mỗi cuộc gọi hoặc nhóm cuộc gọi.
Điều tệ hơn, nếu một API bị phá vỡ vì các lỗi không được phát hiện, nó không chỉ có thể phá vỡ một ứng dụng đơn lẻ mà là một chuỗi các quy trình nghiệp vụ được đặt cho nó.

## Những việc cần làm để bắt đầu test API thủ công:

Phần đầu tiên của thử nghiệm API liên quan đến việc thiết lập môi trường thử nghiệm, với tập hợp các thông số cần thiết xung quanh API.
Điều này liên quan đến việc cấu hình cơ sở dữ liệu và máy chủ cho các yêu cầu của ứng dụng. Khi bạn đã thiết lập môi trường thử nghiệm API của mình, hãy thực hiện cuộc gọi API ngay lập tức để đảm bảo không có gì bị hỏng trước khi bạn tiếp tục bắt đầu thử nghiệm kỹ lưỡng hơn.

Bạn có thể bắt đầu kết hợp dữ liệu ứng dụng của mình với các bài kiểm tra API để đảm bảo rằng API hoạt động như mong đợi đối với các cấu hình đầu vào có thể đã biết. Xem ví dụ về Thử nghiệm REST này cho người mới bắt đầu để giúp hiển thị trực quan.

Tiếp theo, bạn cần phải tự tổ chức xung quanh bài kiểm tra API. 

***Bắt đầu bằng cách tự hỏi mình những câu hỏi sau:***

1. Đối tượng mục tiêu của bạn là ai? Người tiêu dùng API của bạn là ai?
2. API nào nên được sử dụng trong môi trường nào?
3. Bạn đang thử nghiệm những khía cạnh nào?
4. Chúng tôi đang thử nghiệm những vấn đề gì?
5. Các ưu tiên của bạn để kiểm tra là gì?
6. Điều gì được cho là sẽ xảy ra trong hoàn cảnh bình thường?
7. Điều gì có thể xảy ra trong những hoàn cảnh bất thường?
8. Những gì được định nghĩa là một đèo hoặc thất bại? Dữ liệu nào là đầu ra mong muốn? Chuỗi sự kiện là gì?
9. API này có thể tương tác với API nào khác?
10. Ai trong nhóm của bạn chịu trách nhiệm kiểm tra cái gì?

***Sau khi bạn đã tạo các yêu cầu và ranh giới thử nghiệm này, bạn cần phải quyết định những gì bạn muốn kiểm tra API của mình. Đây là một số loại thử nghiệm API phổ biến:***

1. Kiểm tra chức năng - API hoạt động về mặt kỹ thuật.
2. Kiểm tra tính khả dụng - API dễ làm việc.
3. Kiểm tra độ tin cậy - API có thể được kết nối liên tục và dẫn đến kết quả nhất quán.
4. Tải thử nghiệm - API có thể xử lý một số lượng lớn các cuộc gọi.
5. Kiểm tra sáng tạo - API có thể xử lý được sử dụng theo nhiều cách khác nhau.
6. Kiểm tra bảo mật - API đã xác định các yêu cầu bảo mật bao gồm xác thực, quyền và kiểm soát truy cập. Xem một số mẹo bảo mật API để bảo vệ dữ liệu quan trọng.
7. Kiểm tra thành thạo - API làm tăng những gì các nhà phát triển có thể làm.
8. Kiểm tra tài liệu API - còn được gọi là kiểm tra khám phá, tài liệu API dễ dàng hướng dẫn người dùng.

***Các thử nghiệm chắc chắn sẽ khác nhau nhưng dưới đây là các ví dụ kiểm tra API phổ biến:***

1. Kiểm tra các giá trị trả lại API dựa trên điều kiện đầu vào.
2. Xác minh xem API không trả lại bất kỳ điều gì hoặc kết quả sai.
3. Xác minh xem API có kích hoạt một số sự kiện khác hoặc gọi API khác không.
4. Xác minh xem API có đang cập nhật bất kỳ cấu trúc dữ liệu nào không.

## Nên kiểm thử API thủ công hay dùng công cụ automation?

Kiểm tra tự động hóa API so với kiểm tra thủ công là gì? Kiểm tra tự động hóa API là khi bạn sử dụng một công cụ, trong khi kiểm tra thủ công API đang viết mã của riêng bạn để kiểm tra API. Kiểm tra API là một trong những lĩnh vực mà thử nghiệm tự động hóa được khuyến khích cao, đặc biệt là trong thế giới của DevOps, phát triển nhanh và chu kỳ phân phối liên tục.

***Thử nghiệm API có thể được tự động hóa ở đâu?***

1. Kiểm tra chức năng API.
2. Tạo các tải dữ liệu động để đưa vào thử nghiệm API của bạn.
3. Lặp lại thiết kế thử nghiệm.
4. Phân tích phạm vi kiểm tra chức năng của bạn để biết bạn đang thiếu gì.
5. Ad-hoc thử nghiệm.
6. Sử dụng dòng lệnh để nối các bài kiểm tra của bạn với hệ thống xây dựng của bạn.
7. Lật nhanh giữa nhiều môi trường, bao gồm môi trường phát triển, thử nghiệm và dàn dựng.
8. Kiểm tra các giao thức trong một khung duy nhất, thống nhất.
9. Sử dụng nhiều tập hợp dữ liệu cùng một lúc để bao gồm các kịch bản thử nghiệm khác nhau.
10. Như với tất cả tự động hóa, tăng tốc quá trình thử nghiệm tổng thể.
11. Lỗi kiểm tra, nơi bạn ném lỗi bắt buộc tại API để hiểu cách nó sẽ phản ứng.
12. Thử nghiệm bằng nhiều ngôn ngữ

Tất nhiên, kiểm tra API tự động có thể được thực hiện trong nhiều điều kiện, đặc biệt khi bạn bị ép thời gian, làm cho nó trở lên tố hơn khi bạn đang theo chu kỳ phát hành phần mềm liên tục. Tự động kiểm tra API thậm chí cho phép bạn thử nghiệm song song với quá trình code.

Tuy nhiên, trong một số trường hợp nhất định, giống như nơi API kết nối Internet với tất cả mọi thứ, gần như không thể thực hiện tự động kiểm tra. Thật hữu ích khi sử dụng tự động hóa nếu các cuộc gọi API đang trả lại các câu trả lời đúng, nhưng, ít nhất là bây giờ, bạn vẫn cần một người để đảm bảo rằng những kết nối thật sự đã được mở. Chắc chắn việc internet đã kết nối với tất cả mọi thứ sẽ dẫn chúng ta đến mức hiểu biết cao hơn, nhưng rất khó có khả năng là một cỗ máy hay thậm chí một con người có thể dự đoán tất cả các trường hợp sử dụng, mọi rủi ro bảo mật và mọi sự tích hợp dù đã cố gắng. Đó là lý do tại sao công việc của người thử nghiệm không bao giờ có thể hoàn toàn tự động như kiểm tra thủ công sẽ luôn đóng vai trò quan trọng.

Tương tự, kiểm tra khả năng sử dụng API cũng phải tiếp tục là ưu tiên kiểm tra thủ công, khi bạn làm việc để dogfood API của mình, hãy đảm bảo tạo trải nghiệm nhà phát triển tốt hơn và đơn giản hơn.

### Những kiểm thử API nào tốt nhất nên được thực hiện?   

Bạn đã tạo kế hoạch thử nghiệm API của riêng mình. Bây giờ, bạn nên có danh sách các quy tắc để theo dõi để giúp thử nghiệm thành công nhất có thể:

* Thử nghiệm đầu tiên cho kết quả điển hình hoặc thông thường, cho những gì xảy ra nhất quán và những gì không xảy ra.
* Thêm hiệu suất tải nặng cho hệ thống thông qua một loạt các bài kiểm tra tải API.
* Kiểm tra thất bại. Tiếp tục làm việc và làm việc cho đến khi bạn nhận được một đầu ra Fail, đảm bảo rằng API không thành công và ổn định.
* Nhóm các trường hợp thử nghiệm theo loại thử nghiệm.
* Lựa chọn tham số phải được đề cập rõ ràng trong chính trường hợp kiểm tra.
* Ưu tiên các cuộc gọi hàm API để người kiểm thử có thể dễ dàng kiểm tra một cách kịp thời.
* Giới hạn các bài kiểm tra từ càng nhiều biến càng tốt bằng cách giữ cho nó càng tách biệt càng tốt.
* Tự động hóa việc tạo tài liệu API với một tiêu chuẩn như Swagger, nhưng sau đó chạy qua các thử nghiệm, đảm bảo tài liệu có ý nghĩa đối với tất cả các cấp trải nghiệm người dùng.
* Ném bất cứ thứ gì bạn có thể vào API để kiểm tra xem nó xử lý các vấn đề và tải không lường trước được như thế nào.
* Thực hiện trình tự cuộc gọi được lên kế hoạch tốt.
* Sau đó, hãy sáng tạo! Đối với phạm vi kiểm tra hoàn chỉnh, hãy tạo các trường hợp thử nghiệm cho tất cả các kết hợp đầu vào API có thể có.
* Sử dụng lại các thử nghiệm của bạn để theo dõi các API của bạn trong Sản xuất.
* Tự động hóa bất cứ điều gì bạn có thể.
Nhưng hãy tin vào bản năng của bạn nếu có điều gì đó không ổn!

Refernce link: https://smartbear.com/learn/api-testing/what-is-api-testing/