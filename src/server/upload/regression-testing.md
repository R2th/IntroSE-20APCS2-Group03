https://www.professionalqa.com/regression-testing-vs-retesting


### 1. Regression testing là gì?

![](https://images.viblo.asia/dde56319-3146-432e-adef-8196897bcd90.png)<br>
*Regression testing là gì?*

Regression Testing nhằm tìm cách phát hiện và khắc phục các lỗi hoặc sự cố phần mềm mới trong các khu vực chức năng và phi chức năng hiện có của hệ thống trong trường hợp nâng cấp, sửa lỗi, thay đổi cấu hình và bất kỳ thay đổi nhỏ hoặc thay đổi lớn nào được nêu ra trong hệ thống trong quá trình sửa lỗi. 

Về cơ bản, các kiểm thử hồi quy đang được thực hiện sau mỗi lần sửa đổi hoặc thay đổi được đưa vào ứng dụng phần mềm để đảm bảo rằng những thay đổi mới này không có tác động đến các chức năng cũ & cốt lõi hiện có.

Phạm vi kiểm thử hồi quy phụ thuộc vào lượng thay đổi được đưa ra trong code. Nếu thay đổi nhỏ, một tập hợp các trường hợp kiểm thử tối thiểu sẽ đủ để thực hiện các kiểm thử hồi quy. Trong khi đối với số lượng thay đổi lớn, các trường hợp kiểm thử chọn lọc dựa trên đầu vào của nhà phát triển đối với sửa đổi được thực hiện có thể là giải pháp tiết kiệm thời gian và tiền bạc.

**Ví dụ về Regression testing**

![](https://images.viblo.asia/f985ca37-85d0-47ca-8181-ba05b9416aa4.png)<br>
*Regression Testing Example*

Có một ứng dụng phần mềm với chức năng: A + B . Khi kiểm thử ứng dụng, một lỗi được xác định và phát hiện. Các bản sau đó bao gồm các thay đổi để giải quyết bug đó. Tuy nhiên, trong quá trình loại bỏ lỗi, chức năng hiện có của ứng dụng cũng bị ảnh hưởng: B-A . Do đó, kiểm tra hồi quy được thực hiện để đánh giá xem các chức năng hiện có có bị ảnh hưởng hay không cùng với sự xuất hiện của bất kỳ lỗi mới hoặc sự cố nào trong trường hợp thay đổi và sửa lỗi.

Hơn nữa, chúng ta cũng có thể thấy rằng trong quá trình nâng cấp hoặc bổ sung tính năng mới; C , các chức năng hiện có của ứng dụng; A + B đã bị ảnh hưởng với sự thay đổi chức năng; A * B . Ở đây, các kiểm tra hồi quy cũng được thực hiện trên ứng dụng phần mềm để tìm hiểu xem các chức năng hiện có có bị ảnh hưởng hay không.

### 2. Khi nào thực hiện kiểm thử hồi quy?

Kiểm thử hồi quy thường được thực hiện trong suốt [vòng đời kiểm thử phần mềm](https://viblo.asia/p/quy-trinh-kiem-thu-phan-mem-software-testing-life-cycle-stlc-Qbq5QLvmlD8) ở mỗi cấp độ khác nhau; "Đơn vị" , "Tích hợp" , "Hệ thống" và "Chấp nhận" . Tuy nhiên, nên thực hiện kiểm thử hồi quy khi xảy ra các sự kiện sau:

* Sau khi sửa lỗi được xác định và phát hiện (s).
* Sửa đổi mã dựa trên nhu cầu và yêu cầu.
* Bổ sung bất kỳ tính năng và chức năng mới hoặc nâng cấp.
* Các bản vá và thay đổi trong cấu hình.

### 3. Các bước để tiến hành kiểm tra hồi quy?

Một cách tiếp cận cơ bản để thực hiện kiểm tra hồi quy bao gồm các hành động sau:

Thực hiện lại các thử nghiệm đã được tiến hành.
So sánh kết quả kiểm tra cũ và kết quả kiểm tra mới.

### 4. Các loại kiểm tra hồi quy

1. Kiểm tra / Kiểm tra hồi quy chức năng: Các kiểm tra này thực hiện chương trình hoàn chỉnh với nhiều đầu vào khác nhau. Bài kiểm tra có thể là một loạt các đầu vào chương trình, thậm chí có thể bao gồm một cơ chế tự động để kiểm soát các chuyển động và nhấp chuột.

1. Kiểm tra hồi quy đơn vị / Kiểm tra: Họ thực hiện các chức năng riêng lẻ, chương trình con hoặc phương thức đối tượng. Kiểm thử có thể là một tập hợp các hàm riêng biệt trong chính mã hoặc lớp trình điều khiển liên kết với mã mà không làm thay đổi mã đang được kiểm tra.

Ngoài các bài kiểm tra chức năng và đơn vị, các bài kiểm tra hồi quy có thể được phân loại thành hai loại nữa như chi tiết dưới đây:

* Các xét nghiệm hồi quy từng phần .
* Kiểm tra hồi quy hoàn chỉnh .

### 5. Làm thế nào để kiểm tra hồi quy?

Kiểm tra hồi quy có thể được thực hiện, sử dụng các phương pháp sau:

1. Chiến lược kiểm tra lại tất cả: Cách tiếp cận này chỉ đơn giản liên quan đến việc thực hiện lại tất cả các trường hợp hoặc bộ kiểm tra hiện có và có sẵn. Tuy nhiên, cần phải đề cập đến việc xem xét và thực hiện toàn bộ " bộ kiểm tra hồi quy" sẽ đòi hỏi một lượng lớn thời gian, tiền bạc và tài nguyên.
2. Các trường hợp kiểm tra chọn lọc: Kiểm tra lại tất cả các trường hợp kiểm tra, có vẻ không khả thi. Một cách tiếp cận khác, có thể là lựa chọn số lượng hạn chế các trường hợp thử nghiệm, dựa trên nhu cầu và yêu cầu. Hơn nữa, lựa chọn này, có thể được xem xét thêm theo hai loại:
Trường hợp kiểm tra có thể sử dụng lại.
Trường hợp kiểm tra lỗi thời.
1. Ưu tiên các trường hợp thử nghiệm: Ưu tiên thực hiện khôn ngoan các trường hợp thử nghiệm dựa trên các yêu cầu nghiệp vụ, các chức năng thiết yếu và thường được sử dụng làm giảm đáng kể bộ thử nghiệm hồi quy.