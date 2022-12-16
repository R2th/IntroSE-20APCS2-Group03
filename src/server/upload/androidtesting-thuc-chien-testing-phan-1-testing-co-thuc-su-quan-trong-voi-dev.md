Xin chào các bạn đã quay trở lại với bài chia sẻ của mình. 

Sau 1 thời gian "vắt tay lên trên trán mở mộng" thì hôm nay mình sẽ cùng các bạn bước chân vào 1 series khá đau đầu và hại não về Testing và cụ thể hơn series này sẽ giới thiệu về `Testing trong Android`. Hi vọng mọi người sẽ cùng mình đi đến cuối series nha. Let's go....

# 1. Testing là gì và tại sao phải thực hiện chúng ?
- Hiện nay có rất nhiều tài liệu nói về testing, cũng có nhiều định nghĩa được nêu ra để giúp chúng ta hiểu hơn về testing. Tuy nhiên bài viết này mình không muốn lan man mà sẽ cùng các bạn chia sẻ một cách đơn giản nhất có thể.
- **Testing hay Software Testing (Kiểm thử phần mềm) có thể hiểu theo một cách dễ hiểu như sau**: 

    `Kiểm thử phần mềm là quá trình thực thi một hệ thống phần mềm để xác định xem phần mềm có chạy đúng với đặc tả không và môi trường hoạt động có đúng yêu cầu hay không.`
- **Software Testing sinh ra nhằm mục đích gì ?**
     + Nhằm xác định và phát hiện nhiều lỗi nhất có thể trong phần mềm
     + Sau khi sửa lỗi được tìm thấy và kiểm tra lại, làm cho phần mềm được testing đạt đến một mức chấp nhận được về chất lượng.
     + Thực hiện các yêu cầu về testing một cách hiệu quả trong phạm vi thời gian, ngân sách cho phép.
     + Biên dịch ra check list để sử dụng trong công tác phòng chống lỗi.

- **Vậy tại sao chúng ta phải thực hiện testing cho phần mềm của mình ?**
    + Để cung cấp 1 sản phần chất lượng cho người dùng, cũng như tránh doanh nghiệp phát triển phần mềm dính vào những rắc rối mà phần mềm lỗi mang lại thì chúng ta bắt buộc phải thực hiện testing trong quá trình sản xuất phần mềm, ứng dụng.
    + Giúp phát hiện lỗi sớm và giúp khắc phục nó một cách nhanh chóng, hiệu quả.
    + Một sản phẩm đã được testing sẽ đảm bảo độ tin cậy, tính bảo mật và hiệu suất cao cũng như tiết kiệm thời gian và chi phí cho khách hàng và người sử dụng. Chỉ cần một lỗi nhỏ hoặc một thiếu sót cũng có thể gây ra các thiệt hại lớn về kinh tế, con người,... 
    + Tạo sự an toàn cho code khi có sự thay đổi, bất kỳ thay đổi sai nào được diễn ra ở code sẽ được phát hiện khi chạy test.
    + Hạn chế công việc phức tạp và chuyên môn sâu của lập trình viên đối với QA.
    + Giúp tiết kiệm được thời gian của lập trình viên khi tái sử dụng lại code mà đã được testing.

# 2. Các cấp độ của Testing trong Android
![](https://images.viblo.asia/f3fb9075-1a74-43fc-bd66-ddcd0d67883c.png)


### 2.1 Unit Test
- **Unit testing** (Kiểm thử đơn vị) là hoạt động kiểm thử nhỏ nhất. Kiểm thử thực hiện trên các hàm hay các thành phần riêng lẻ. 
    - **Đơn vị** được hiểu là các thành phần nhỏ nhất của phần mềm có thể kiểm thử được. Ví dụ: Các hàm, lớp, phương thức, thủ tục,...
    - Để viết được Unit Testing cần có hiểu biết về thiết kế chương trình và code.
    - Unit Testing thường được thực hiện bởi lập trình viên thay vì kiểm thử viên.
    - Mục tiêu của Unit Testing là đảm bảo cho những thành phần đơn vị hoạt động đúng như mong muốn.
 - **Một số đặc điểm của Unit Testing**
     + Test unit riêng biệt, không ảnh hưởng và không phụ thuộc vào unit khác.
     + Code Unit test ngắn gọn và dễ hiểu về input và output
     + Đặt tên phương thức trong class test phải rõ ràng để làm rõ mục đích của phương thức đó là test cái gì. (tên phương thức dài cũng không ảnh hưởng gì miễn sao rõ ràng)
 - **Unit Testing trong Android được hỗ trợ bởi 1 số thư viện :** 
     + [Robolectric](http://robolectric.org/)
     + [Mockito](https://github.com/mockito/mockito)
### 2.2 Integration Test
- **[Integration Test](http://tryqa.com/what-is-integration-testing/#Integration_Testing_Types_or_Approaches)** (kiểm thử tích hợp) là một giai đoạn trong kiểm thử phần mềm và  được thực hiện sau khi đã thực hiện kiểm thử đơn vị. Mỗi module phần mềm riêng biệt được kết hợp lại và kiểm thử theo nhóm. 
    + Đầu vào của Integration test là các module đầu vào đã được kiểm thử đơn vị, nhóm chúng vào các tập hợp lớn hơn rồi áp dụng các ca kiểm thử đã được định nghĩa trong kế hoạch kiểm thử tích hợp vào tập hợp đó.
    + Kiểm thử tích hợp nhằm phát hiện lỗi giao tiếp xảy ra giữa các thành phần cũng như lỗi của bản thân từng thành phần (nếu có)
    + Thành phần của Integration Test có thể là : các module, các ứng dụng riêng lẻ, các ứng dụng client/server trên cùng 1 mạng.
- Dù đã có Unit Testing tuy nhiên một số nguyên nhân sau sẽ cho các bạn thấy Integration Test cũng rất cần thiết, quan trọng:
    + Một Module nói chung được thiết kế bởi một lập trình viên có hiểu biết và logic lập trình có thể khác với các lập trình viên khác. Kiểm thử tích hợp là cần thiết để đảm bảo tính hợp nhất của phần mềm.
    + Tại thời điểm phát triển module vẫn có thể có thay đổi trong spec của khách hàng, những thay đổi này có thể không được kiểm tra ở giai đoạn unit test trước đó.
    + Giao diện và cơ sở dữ liệu của các module có thể chưa hoàn chỉnh khi được ghép lại.
    + Khi tích hợp hệ thống các module có thể không tương thích với cấu hình chung của hệ thống.
    + Thiếu các xử lý ngoại lệ có thể xảy ra.
- **Một số phương pháp, chiến lược của Integration Test:**
    + [Big Bang](http://tryqa.com/what-is-big-bang-integration-testing/)
    + [Top-Down](http://tryqa.com/what-is-integration-testing/#2_Top-down_Integration_Testing)
    + [Bottom-Up](http://tryqa.com/what-is-integration-testing/#3_Bottom_up_Integration_Testing)
    + [Incremental](http://tryqa.com/what-is-incremental-testing-in-software/)
    + [Sandwich](http://tryqa.com/what-is-integration-testing/#5_Sandwich_Integration_Testing)
    + [Functional](http://tryqa.com/what-is-functional-testing-testing-of-functions-in-software/)
### 2.3 Sự khác nhau giữa Integration Testing vs Unit Testing


|  Unit Testing | Integration Testing |
| -------- | -------- | 
| Kiểm tra đơn vị được thực hiện để xác nhận xem đơn vị mã có hoạt động như mong đợi hay không     | Kiểm tra tích hợp được thực hiện để xác nhận nếu các mô-đun khác nhau hoạt động như mong đợi, khi được tích hợp với nhau     |
| Trong kiểm thử đơn vị, đơn vị không phụ thuộc vào bất kỳ thứ gì bên ngoài đơn vị được kiểm tra     | Trong thử nghiệm Tích hợp, các thành phần có thể có sự phụ thuộc lẫn nhau vào nhau hoặc các hệ thống bên ngoài     |
| Kiểm thử đơn vị được thực hiện bởi lập trình viên     | Thử nghiệm tích hợp được thực hiện bởi nhóm thử nghiệm     |
| Kiểm thử đơn vị là kiểm thử đầu tiên được thực hiện     | Kiểm thử tích hợp thường được thực hiện trước khi kiểm thử hệ thống và sau kiểm thử đơn vị.     |

### 2.4 UI Testing
- **UI Testing** tập trung vào khía cạnh giao diện người dùng và tương tác của ứng dụng với người dùng. Nhận biết và hành động dựa trên tương tác đầu vào của người dùng là ưu tiên hàng đầu trong quá trình kiểm tra và xác thực UI. Bạn cần đảm bảo rằng ứng dụng của mình không chỉ nhận dạng được đầu vào mà còn hoạt động tương ứng với đầu vào đó.
- Là một lập trình viên, bạn nên có thói quen kiểm tra các tương tác của người dùng để đảm bảo rằng người dùng không gặp phải kết quả không mong muốn hoặc có trải nghiệm kém khi tương tác với ứng dụng của bạn.
- UI testing  có thể giúp bạn nhận ra các tương tác đầu vào. Trong đó đầu vào không mong đợi sẽ được xử lý một cách khéo léo hoặc sẽ kích hoạt xác thực đầu vào.
- **Có 2 cách thực hiện UI Testing:**
    + Manual testing
    + Automated testing
- **Thư viện hỗ trợ UI Testing trong Android :**  [Espresso](https://developer.android.com/training/testing/espresso/)

#  3. Làm thế nào để viết Tests tốt ?
### 3.1 Thực hiện Test Driven Development
- **Test Driven Development (TDD) :** là mô hình phát triển với trọng tâm hướng về việc kiểm thử. TDD được xây dựng theo hai tiêu chí: Test-First (Kiểm thử trước) và Refactoring (Điều chỉnh code). Trong đó có mố số yêu cầu được đặt ra:
    + Developer soạn thảo các kịch bản cho yêu cầu đó trước tiên và chạy thử kịch bản đó lần đầu tiên. Hiển nhiên, việc chạy thử sẽ đưa ra 1 số kết quả thất bại vì hiện tại chức năng đó chưa được xây dựng (từ kết quả đó, ta cũng kiểm tra được là kịch bản kiểm thử đó được viết đúng hay sai )
    + Dựa vào expect của kịch bản kia, developer sẽ xây dựng source code vừa đủ để lần chạy thứ 2 của kịch bản đó thành công.
    + Nếu trong lần chạy thứ 2 vẫn thất bại, điều đó có nghĩa là thiết kế chưa ổn và developer lại chỉnh sửa code và chạy lại kịch bản đến khi thành công
    + Khi kịch bản kiểm thử chạy thành công, developer tiến hành chuẩn hóa đoạn code và tiếp tục với kịch bản kiểm thử tiếp theo. Việc chuẩn hóa bao gồm thêm các comment, loại bỏ các dư thừa, tối ưu các biến…
    
![](https://images.viblo.asia/644dd953-5c48-4fe6-80df-3d227b867c8f.gif)

### 3.2  Viết Unit Test riêng biệt, độc lập
- **Tiến hành test riêng biệt :** Tất cả các class nên được test riêng biệt. Thực hiện các bài test đơn giản. Các test đầu tiên bạn viết nên đơn giản nhất. Chúng nên là những thứ gì đó dễ dàng và nhanh chóng minh họa chức năng của các bạn.
- **Test độc lập**: Khi viết Unit Test thì các bài test không bao giờ nên phụ thuộc vào nhau. Nếu các bài test của bạn phải được chạy theo một thứ tự cụ thể, thì bạn cần thay đổi các bài test của mình.
### 3.3 Tạo test case trước khi thực hiện code unit test
- Một số phương pháp tạo test cace mà các bạn có thể tham khảo
    + [Phân vùng tương đương](https://freetuts.net/ky-thuat-phan-tich-gia-tri-bien-va-phan-vung-tuong-duong-1591.html)
    + [Phân vùng giá trị biên](https://freetuts.net/ky-thuat-phan-tich-gia-tri-bien-va-phan-vung-tuong-duong-1591.html)
    + [Bảng quyết định](https://freetuts.net/ky-thuat-kiem-thu-bang-quyet-dinh-1592.html)

# Kết luận
- Phần 1 này chủ yếu mình giới thiệu một số khái niệm và tầm quan trọng của việc testing trong lập trình nói chung và Android nói riêng. Phần 2 chúng ta sẽ cùng đi sâu hơn về từng phần mình đã giới thiệu ở trên bài viết nha.
- Bài viết trên là cá nhân tìm hiểu nên có thể đúng, có thể sai, mong được mọi người góp ý.
- Cảm ơn mọi người đã đọc bài của mình. Cùng đón chờ bài viết **Phần 2** của mình nhé.
- Tài liệu tham khảo:
    - http://tryqa.com/what-is-integration-testing/
    - https://google-developer-training.github.io/android-developer-fundamentals-course-concepts-v2/unit-2-user-experience/lesson-6-testing-your-ui/6-1-c-ui-testing/6-1-c-ui-testing.html
    - https://lcdung.top/tong-quan-ve-tdd-va-bdd-trong-kiem-thu-phan-mem-voi-goc-nhin-cua-mot-developer/