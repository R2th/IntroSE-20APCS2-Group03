![](https://images.viblo.asia/4721e812-f80b-401f-b8eb-6439d0aeacf7.png)

Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về Adhoc Testing, các loại Adhoc Testing, sự cần thiết của Adhoc Testing, các cách thực hiện Adhoc Testing hiệu quả và ưu/nhược điểm của Adhoc Testing

### **1. Adhoc Testing là gì?**

Adhoc Testing là phương pháp kiểm thử không theo cách thông thường, không có tài liệu yêu cầu, kế hoạch, testcase. Kiểu test này không theo bất cứ loại kỹ thuật test nào.

Tester thực hiện test ngẫu hứng ứng dụng mà không có bất kỳ testcase nào được viết ra cũng như bất kỳ một tài liệu mô tả bussiness nào và dựa vào kiến thức sâu rộng về hệ thống, ứng dụng đang test. Do đó, sự thành công của kiểm thử Adhoc phụ thuộc vào khả năng của người kiểm thử. Việc tìm ra các khiếm khuyết chỉ dựa trên trực giác của người kiểm thử.

Mục đích chính là cố gắng tìm lỗi và những thiếu sót mà không được phát hiện ra theo cách test truyền thống.

Adhoc Testing là phương pháp kiểm thử phần mềm ít chính thức nhất vì bị chỉ trích là không có cấu trúc, khó tái hiện lỗi vì không có test case nào cũng như khó kiểm soát

### **2. Tại sao cẩn thực hiện Adhoc Testing?**

Chúng ta tiến hành kiểm thử Adhoc khi tất cả các loại kiểm thử được thực hiện. Nếu thời gian cho phép thì chúng ta sẽ kiểm tra tất cả các trường hợp negative trong quá trình kiểm thử adhoc.

Khi phát hành sản phẩm ra thị trường, chúng ta nên tiến hành thử nghiệm Adhoc vì khách hàng không bao giờ sử dụng ứng dụng theo trình tự / có hệ thống. Vì vậy, chúng ta sẽ kiểm tra ứng dụng theo phương pháp kiểm thử Adhoc bằng cách kiểm tra ngẫu nhiên.

Adhoc Testing thường được sử dụng nhiều nhất trong kiểm thử ứng dụng hoặc trò chơi. Bất cứ ứng dụng hay trò chơi nào cũng cần đến việc kiểm thử ngẫu nhiên nhằm đoán được đến mức tối đa hành vi của users mà test cases dù có viết kỹ thế nào cũng không thể lường được hết.

### **3. Các loại kiểm thử Adhoc**

Kiểm thử Adhoc có thể được phân làm 3 loại dưới đây:

**3.1 Buddy Testing**

- Buddy Testing - Thử nghiệm bạn thân được thực hiện với ít nhất hai thành viên: một thành viên đến từ nhóm thử nghiệm (Tester/QA) và một thành viên khác thuộc nhóm phát triển (Dev).
- Khi kiểm thử đơn vị được thực hiện, lúc này chúng ta sẽ thực hiện kiểm thử Buddy. Loại kiểm thử này giúp người phát triển (Dev) sẽ hiểu được quan điểm test của Tester, nắm bắt tất cả các trường hợp kiểm thử khác nhau để có thể thay đổi thiết kế sớm trong trường hợp cần thiết, đồng thời Tester sẽ hiểu được thiết kế của modul, giúp họ tránh được việc thiết kế các kịch bản không hợp lệ, và phát triển các trường hợp kiểm tốt hơn.

**3.2 Pair testing**

Trong loại thử nghiệm này, hai người kiểm thử sẽ làm việc cùng nhau để kiểm tra phần mềm, nơi họ có thể chia sẻ ý tưởng của mình và xác định các lỗi hoặc khiếm khuyết trong ứng dụng.

**3.3 Monkey testing**

Kiểm thử được thực hiện ngẫu nhiên mà không có bất kỳ trường hợp kiểm thử nào nhằm phá vỡ hệ thống.

### **4. Các cách thực hiện Adhoc Testing hiệu quả**

**4.1 Tiếp cận Ad-Hoc testing bằng cách -Tìm kiếm nhóm khiếm khuyết**

Theo nguyên lý kiểm thử 80-20, nhóm lỗi được tìm ra thường tập trung vào một khu vực trên hệ thống, nơi có khả năng xảy ra số lượng lỗi lớn nhất. Khi thực hiện Ad-hoc testing, tester có thể thử kịch bản xem có thể tìm thấy lỗi ở những khu vực khác nhau hay không. Có người có thể tìm ra nhóm khiếm khuyết bằng cách phân tích lịch sử kiểm thử bằng test case đã được thực hiện trước đó, cũng có người tìm ra bằng cách dự đoán nơi có khả năng xảy ra lỗi.

**4.2 Chú ý Sự tác động qua lại giữa các bộ phận cấu thành**

Sự tác động qua lại, ảnh hưởng lẫn nhau giữa các chức năng con trên hệ thống là một kịch bản thường thấy khi có lỗi xảy ra. Khi thực hiện Ad-hoc testing, tester có thể chỉ ra sự ảnh hưởng đó giữa các module với nhau, từ đó tìm ra những trạng thái bất bình thường của hệ thống.

**4.3 Suy nghĩ như một developer**

Khi thực hiện Ad-hoc testing, nếu suy nghĩ như một developer, nhìn vào hệ thống và thử nghĩ xem mình có thể làm gì, làm như thế nào khi phải phát triển chức năng này, và tester sẽ biết được liệu có phần nào của chức năng hoặc một yêu cầu nào đó đối với chức năng đó có bị thiếu không. Sau đó kiểm tra code và có thể sẽ tìm ra lỗi.

**4.4 Kinh nghiệm của người kiểm thử**

Trong Ad-hoc testing, tester có kinh nghiệm bao giờ cũng tìm ra được nhiều lỗi hơn là người mới vì người đó đã từng test nhiều hệ thống khác nhau, cũng có thể là đã test những hệ thống tương tự nên thu thập được kinh nghiệm và sự hiểu biết để thực hiện Ad-hoc testing. Ghi chú, góp nhặt là phương pháp tốt để tích lũy kinh nghiệm.

**4.5 Học cách sử dụng những công cụ khác**

Hiện nay có một số công cụ giúp tìm ra khiếm khuyết như công cụ debug, profilers hay task monitors, vì vậy học cách sử dụng những công cụ này có thể khiến cho vấn đề trở nên đơn giản hơn rất nhiều.

**4.6 Ghi lại những gì đã tìm được**

Hãy ghi lại những lỗi, khiếm khuyết mà mình tìm ta được, ghi rõ cả chức năng, khi nào thì lỗi xảy ra…Những record này sẽ giúp cho developer và cả tester trong tương lai khi họ phát triển những hệ thống hoặc ứng dụng khác. Cũng nên ghi lại những lỗi do người khác tìm ra chứ không phải mình tìm ra, để có cơ sở tham khảo về sau.

### **5. Ưu điểm của Adhoc testing**

* Thích hợp cho tiến hành kiểm tra ngẫu nhiên và tiết kiệm chi phí trong giai đoạn đầu phát triển phần mềm.
* Tester có thể sử dụng các phương pháp sáng tạo khác nhau để kiểm thử phần mềm.
* Nâng cao, cải thiện test cases, giúp tạo ra các trường hợp thử nghiệm tốt hơn và giúp chất lượng sản phẩm tốt hơn.
* Không yêu cầu tạo bất kỳ tài liệu nào nên giúp giảm gánh nặng thêm cho Tester. Tester có thể tập trung vào việc thực sự hiểu được kiến trúc cơ bản.
* Đưa ra kết quả nhanh chóng.

### **6. Nhược điểm của Adhoc testing**

* Thiếu tài liệu
* Thiếu tính khả dụng của thông tin nhạy cảm của dự án.
* Tester không được báo trước những lỗi đã có trước.
* Không có tài liệu tham khảo để hướng dẫn cho tester.
* Yêu cầu kiểm tra trình độ và kỹ năng tester để thực hiện thêm thử nghiệm kiểm soát chất lượng dẫn đến tăng chi phí hoạt động.
* Vấn đề tiềm tàng có thể không bị phát hiện.
* Khó hoặc không thể tái hiện bug trong các lần thử tiếp theo nếu được yêu cầu cung cấp thông tin.
* Không có cách nào để tính toán thời gian và effort để đầu tư vào loại thử nghiệm này.

### **7. Kết luận**

Mặc dù thực hiện Ah-hoc testing là hoàn toàn ngẫu hứng nhưng người thực hiện cần phải có đủ kiến thức cũng như kinh nghiệm để phán đoán các kịch bản khác nhau có thể xảy ra với hệ thống hoặc ứng dụng, hoặc game đang cần test. Người thực hiện test cũng cần phải có hiểu biết chính xác và sâu sắc về đối tượng đang test để biết trường hợp nào là lỗi, khiếm khuyết do developer, do hành vi của người dùng, trường hợp nào là hạn chế của hệ thống (không thể khắc phục)…để có phương án cải thiện.

*Tài liệu tham khảo tại:*

https://www.javatpoint.com/adhoc-testing

https://www.tutorialspoint.com/software_testing_dictionary/adhoc_testing.htm

https://www.guru99.com/adhoc-testing.html