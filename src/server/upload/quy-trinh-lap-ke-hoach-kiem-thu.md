# Mục tiêu
* Tìm hiểu quy trình lập kế hoạch kiểm thử
* Hiểu cách các thành phần lập kế hoạch kiểm thử liên kết với nhau như thế nào 
* Tìm hiểu cách viết test script

# Các thành phần chính, quan trọng trong việc lập kế hoạch 

* Chiến lược kiểm thử 
* Lập kế hoạch kiểm thử mức cao 
* Test scripts 
* Test Cases 
* Test data 

Sau đây chúng ta sẽ đi vào từng thành phần

1. Chiến lược kiểm thử
Đây là tài liệu ghi lại cách tiếp cận kiểm thử cho các thành phần còn lại . Các chiến lược kiểm thử có thể được phát triển rất sớm trong một dự án và chỉ yêu cầu thông tin ban đầu để có thể viết. Bất cứ khi nào một loại dự án hoặc công nghệ mới đang được  kiểm thử, chiến lược kiểm thử là một trong những tài liệu quan trọng nhất cần thiết lập và cho ra đời sớm nhất. 
 
2. Lập kế hoạch kiểm thử mức cao 
Đây là tài liệu mô tả cho việc kiểm thử "ai, cái gì, khi nào, ở đâu và như thế nào". Kế hoạch kiểm thử có thể được phát triển ở nhiều mức độ khác nhau, nhưng chúng tôi sẽ tập trung chủ yếu ở cấp độ dự án hoặc hệ thống trong phạm vi tài liệu này.

3. Kiểm thử mức chi tiết hơn ( Test scripts, Test cases, Test data) 
Kế hoạch kiểm thử mức cao sẽ cho thấy các function và thuộc tính nào của ứng dụng sẽ được kiểm thử. Các mô tả kiểm thử chi tiết thể hiện các thử nghiệm này theo nghĩa là người kiểm thử  có thể thực thi hoặc có thể được viết test scripts để có thể thực hiện kiểm thử tự động. 
Chúng tôi sẽ xem xét làm thế nào để phát triển tất cả các thành phần trên và hiển thị các ví dụ của mỗi thành phần.

# Các nhiệm vụ (tasks) chính trong việc lập kế hoạch kiểm thử 

* Phát triển chiến lược kiểm thử
* Xác định mục tiêu kiểm thử
* Xác định các nguồn lực cần thiết
* Lập kế hoạch môi trường kiểm thử 
* Xác định thủ tục kiểm thử (Test Procedures)
* Xác định các function cần kiểm thử
* Xác định các giao diện cần kiểm thử
* Viết Test Scripts 
* Xác định Test cases 
* Thiết kế Test Data 
* Xây dựng Test maxtric 
* Thiết lập Test schedules 
* Giả định thông tin 
* Kết thúc việc lập kế hoạch

## Nhiệm vụ 1: Phát triển chiến lược kiểm thử 
* Định nghĩa các khía cạnh riêng của kiểm thử
*  Xác định
- Nhân tố quan trọng tạo nên thành công của dự án (Critical Success Factors - CSF)
- Loại ứng dụng
- Loại dự án
- Loại môi trường
- Phạm vi kiểm thử
- Rủi ro (Criticality)

* Xác định 
- Ai sẽ là người kiểm thử 
- Khi nào kiểm thử sẽ được tiến hành 
- Kết hợp các yếu tố 
    - Chi phí 
    - Lịch trình (schedule) 
    - Phạm vi (scope) 
    - Chất lượng 

Chiến lược kiểm thử là tài liệu cấp cao mô tả tính chất cơ bản và các khía cạnh riêng của kiểm thử. Chiến lược kiểm thử là một công cụ để giao tiếp để mọi người trong dự án biết cách kiểm thử sẽ được tiến hành. Các chiến lược kiểm  thử có thể được xây dựng sớm trong dự án cho phép kiểm thử tiến hành một cách sớm nhất 
Một chiến lược kiểm thử điển hình sẽ xác định:

**1. Nhân tố quan trọng tạo nên thành công của dự án (Critical Success Factors - CSF)**

Các nhân tố quan trọng tạo nên thành công của dự án là các thuộc tính của một ứng dụng phải có mặt để nó được coi là thành công. Ví dụ về CSF bao gồm tính chính xác, khả năng sử dụng, độ tin cậy, tính di động, khả năng tương tác và bảo mật. Các CSF liên quan trực tiếp đến kiểm tra các rủi ro và rủi ro dự án.
Điều quan trọng là chỉ chọn 4 hoặc 5 yếu tố quan trọng, vì mỗi yếu tố sẽ yêu cầu các công cụ, con người và quy trình cụ thể.

**2. Loại ứng dụng**
Mô tả mục đích và mục tiêu của ứng dụng, chẳng hạn như: batch, on-line, web-base, Windows 32 bit, thương mại điện tử, truy cập dữ liệu, mạng nội bộ của công ty, extranet của khách hàng, v.v.

**3. Loại môi trường**
Mô tả loại môi trường hoạt động hoặc nền tảng ứng dụng sẽ tùy thuộc vào. Có thể bao gồm môi trường người dùng, cũng như môi trường vật lý, chẳng hạn như ngoài trời, truy cập công cộng, quyền truy cập bị giới hạn, v.v.

**4. Phạm vi kiểm thử**
Mô tả cái sẽ được test và không được test 

**5.  Rủi ro (Criticality)**

Là bất kỳ khía cạnh nào của ứng dụng được kiểm thử làm tổ chức bị ảnh hưởng, mất mát. 

## Nhiệm vụ 2: Xác định mục tiêu kiểm thử 

* Xác định những gì sẽ được kiểm thử ở mức cao (high level) 
* Tốt nhất nên dựa trên yêu cầu 
* Ngoài ra có thể dựa trên: 
    * Quy trình và nghiệp vụ 
    * Nhu cầu của khác hàng 
    * Những chức năng cơ bản

Mục tiêu kiểm thử nên liên quan trực tiếp đến các mục tiêu của dự án hoặc hệ thống. Đối với mỗi hệ thống hoặc mục tiêu của dự án, cần có mục tiêu kiểm thử.
Bạn có thể chọn để xác định mục tiêu kiểm thử của hệ thống bằng cách chia nhỏ các chức năng hoặc vùng chức năng. Trong việc thiết lập các mục tiêu kiểm thử, xác định tất cả những điều mà kiểm thử nên hoàn thành. Trong trường hợp lý tưởng, các mục tiêu kiểm thử sẽ dựa trên chi tiết được xác định yêu cầu. Tuy nhiên, người kiểm thử thường không nhận được mức độ chi tiết trong các yêu cầu để viết mục tiêu. Thay vào đó, các mục tiêu kiểm thử có thể thu được từ:


* Quy trình và nghiệp vụ

   Ví dụ, bạn cần biết khách hàng sẽ đặt một số loại giao dịch hoặc yêu cầu một số dịch vụ nhất định ...

* Nhu cầu của khác hàng 

   Bạn cần biết khách hàng cần có phản hồi nhanh với các yêu cầu hoặc có thể huỷ giao dịch 

* Những chức năng cơ bản

   Một số chức năng cơ bản cần cho phần mềm ví dụ như: tìm kiếm, các nút (buttons), controls...

## Nhiệm vụ: Xác định các chức năng cần kiểm thử 

* Dựa trên yêu cầu
  Các yêu cầu cảu ứng dụng hoặc hệ thống thường được văn bản hoá, đó chính là nguồn tốt nhất để tìm ra các chức năng cần được kiểm thử. Tuy nhiên các yêu cầu này có thể thường xuyên được thay đổi. Do đó quy trình kiểm thử cần phải đáp ứng được với sự thay đổi yêu cầu này
* Dựa trên chức năng hoạt động/ nghiệp vụ của toàn hệ thống 
* Các sự kiện (events) của hệ thống 
* Các chức năng trong hệ thống nhà cung cấp 
* Mục  đích Thương mại 

Ví dụ về tài liệu kế hoạch kiểm thử với các chức năng cần kiểm thử 

Hệ thống: Hệ thống lương 



| # | Các chức năng cần kiểm thử | Mức độ ưu tiên|
| -------- | -------- | -------- |
| 1    | Tính toàn tỉ lệ phải trả    |High    |
|2    | Tính toán ngày nghỉ    |High    |
| 1    | Ứng dụng tỉ lệ thuế    |High    |

![](https://images.viblo.asia/2e6a8cc4-5d42-4946-a9f7-2e5c88dad0c3.png)

## Nhiệm vụ: Xác định giao diện cần kiểm thử 

Xác định cần kiểm thử giao diện như thế nào, kết nối giữa các thành phần bên trong, bên ngoài hệ thống. 

## Nhiệm vụ: Viết Test script

Kịch bản kiểm thử (test script) là một công cụ rất hữu ích để kiểm tra phần mềm trực tuyến tương tác. Kịch bản kiểm thử thêm một mức độ nghiêm ngặt hỗ trợ hiệu suất kiểm thử, giúp tiết kiệm đáng kể công sức so với kiểm thử thủ công. Việc lựa chọn có viết test cript hay không phụ thuộc vào nguồn lực có sẵn cũng như kế hoạch kiểm thử của mỗi tổ chức. 
Nếu kiểm thử được thực hiện bởi một người khác với người thiết kế test , test scripts một điều cần thiết để truyền tải chính xác những gì nên được thực hiện trong việc thực hiện kiểm thử. 
Ngoài ra, test scripts cho phép kiểm thử lặp đi lặp lại . Điều này là cần thiết nếu một lỗi được tìm thấy và cần được kiể tra lại 
Một lợi ích lớn khác của  test scirpts là chúng ghi lại việc kiểm thử. Nếu có bao giờ nghi ngờ sau khi kiểm thử về chức năng nào đó, test scripts có thể được xem lại, tham chiếu một cách hữu hiệu. 

Ví dụ về test scripts 
![](https://images.viblo.asia/159d9b85-ad8f-493f-ba08-fdf71e69777b.png)

(Còn tiếp)

Bài viết được dịch lại từ nguồn: http://www.riceconsulting.com/public_pdf/STBE-WM-demo.pdf