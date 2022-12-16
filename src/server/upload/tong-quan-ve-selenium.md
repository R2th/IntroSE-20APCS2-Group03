## Giới thiệu
Selenium là một open-source và là một tool kiểm thử phần mềm tự động, hỗ trợ test cho web application. Nó có khả năng hoạt động trên các browsers và hệ điều hành khác nhau. Selenium không chỉ là một tool duy nhất mà còn là một tổ hợp tools giúp tester thực hiện automation test các ứng dụng trên nền tảng web hiệu quả hơn.
Hãy cùng tìm hiểu từng tool trong bộ Selenium và cách sử dụng chúng:

| No | Tool | Mô tả |
| -------- | -------- | -------- |
| 1     | Selenium IDE     | Selenium Integrated Development Environment (IDE) là một plugin của Firefox giúp tester ghi lại các hành động theo một quy trình nào đó mà tester cần test  |
| 2     | Selenium RC     | Selenium Remote Control (RC) là framework testing hàng đầu cho phép tester test các hành động phức tạp hơn trên browser và thực thi tuyến tính chúng. Nó sử dụng toàn bộ sức mạnh của các ngôn ngữ lập trình như Java, C#, PHP, Python, Ruby và PERL để tạo ra các bài test phức tạp hơn cho hệ thống |
| 3     | Selenium WebDriver     | Selenium WebDriver là kế nhiệm thành công từ Selenium RC, có thể gửi commands trực tiếp đến browser và truy xuất kết quả |
| 4     | Selenium Grid     | Selenium Grid là một tool sử dụng để chạy đồng thời các bộ test qua các máy và browser khác nhau giúp giảm thiểu thời gian thực hiện |

## Ưu điểm của Selenium
QTP và Selenium là những tools được sử dụng nhiều nhất trong thị trường automation testing. Do đó, ta sẽ so sánh những ưu điểm của Selenium thông qua QTP.

| Selenium | QTP | 
| -------- | -------- | 
| Selenium là một tool open-source     | QTP là một tool thương mại  và phải bỏ phí để mua licenses.    | 
| Có thể mở rộng cho rất nhiều các công nghệ khác nhau     | Có limited add-on và cần add-on cho mỗi một công nghệ   | 
| Có khả năng thực thi scripts trên các browser khác nhau      | Có thể chạy test trê các version nhất định của Firefox, IE và Chrome  | 
| Có thể thực thi script trên các hệ điều hành khác nhau      | Chỉ làm việc với Windows  | 
| Hỗ trợ thiết bị mobile     | Hỗ trợ thiết bị mobile với sự hỗ trợ của tool thứ ba  | 
| Thực hiện kiểm tra trong browser nên không cần focus trong khi script đang chạy    | Cần focus trong khi thực thi script vì tool thực thi trên browser | 
| Có thể thực hiện test song song khi sử dụng Selenium Grids     | CQTP không thể thực thi test song song, tuy nhiên tester có thể thực thi song song bằng cách tích hợp QTP và QC. QC cũng là một tool thương mại.  | 

## Nhược điểm của Selenium
Ta sẽ tiếp tục so sánh những nhược điểm của Selenium đối với QTP


| Selenium | QTP | 
| -------- | -------- | 
|  Chỉ hỗ trợ các ứng dụng base trên web    | Có thể test cả web và ứng dụng desktop     | 
|  Không có tính năng như Object Repository/Recovery Scenario    | QTP có tích hợp Object Repository và recovery scenarios.   | 
|  Không có IDE nên khi develop script sẽ không nhanh như QTP    | Có IDE trực quan nên việc phát triển automation trở nên nhanh hơn   | 
|  Không thể truy cập vào các điều khiển trong browser    | Có thể truy cập vào các điều khiển trong browser như favorites bar, backward, và forward button.   | 
|  Không có test report default    | Có sẵn default test result trong tool   | 
|  Để parameterization, người dùng phải dựa vào ngôn ngữ lập trình   |  Parameterization được tích hợp và dễ dàng thực thi  |