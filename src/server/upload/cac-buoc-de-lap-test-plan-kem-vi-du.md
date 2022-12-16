### 1. Test Plan là gì?
Test Plan là một tài liệu chi tiết phác thảo chiến lược kiểm thử, Mục tiêu kiểm thử, tài nguyên (nhân lực, phần mềm, phần cứng) cần thiết để kiểm thử, schedule kiểm thử, Dự toán kiểm thử và deliver.
Test Plan đóng vai trò là một kế hoạch chi tiết để tiến hành các hoạt động kiểm thử phần mềm như một quy trình xác định, được giám sát và kiểm soát từng bước bởi Test Manager.

Hãy bắt đầu với kịch bản sau :
Trong một cuộc họp, bạn muốn thảo luận về Test Plan với các thành viên trong nhóm, nhưng họ không quan tâm.
![](https://images.viblo.asia/509f2091-9dc6-4ebd-b1de-7d0ee276f94a.jpg)

Trong trường hợp như vậy, bạn sẽ làm gì? Chọn câu trả lời của bạn theo hình bên dưới: 
![](https://images.viblo.asia/4917c2aa-6958-472c-9229-5d248f133b28.jpg)

A) Tôi là Manager hãy làm mọi thứ như tôi nói

B) OK, để tôi  giải thích tại sao chúng ta cần lập Test Plan

### 2. Tầm quan trọng của Test Plan

Lập Test Plan có nhiều lợi ích

* Test Plan giúp chúng ta xác định effort cần thiết để xác nhận chất lượng của ứng dụng đang kiểm thử
* Giúp những người ngoài nhóm kiểm thử như nhà phát triển, quản lý doanh nghiệp, khách hàng hiểu chi tiết về kiểm thử.
* Tes Plan hướng dẫn suy nghĩ của chúng ta. Nó giống như một cuốn sách quy tắc, cần phải được tuân theo.
* Các khía cạnh quan trọng như Test Estimation, Test Scope, Chiến lược test được ghi lại trong Test Plan, do đó, nhóm quản lý có thể xem xét và sử dụng lại cho các dự án khác.

### 3. Làm thế nào để lập Test Plan

Như bạn đã biết thì lập Test Plan là nhiệm vụ quan trọng nhất của Quy trình quản lý kiểm thử. Thực hiện theo 7 bước dưới đây để tạo một kế hoạch kiểm tra theo IEEE 829

1. Analyze the product - Phân tích sản phẩm
2. Design the Test Strategy - Lập chiến lược kiểm thử
3. Define the Test Objectives - Xác định mục tiêu kiểm thử 
4. Define Test Criteria - Xác định tiêu chí kiểm thử
5. Resource Planning - Hoạch định nguồn lực
6. Plan Test Environment - Kế hoạch môi trường kiểm thử
7. Schedule & Estimation - Lịch trình & Dự toán
8. Determine Test Deliverables - Quyết định deliver sản phẩn

![](https://images.viblo.asia/920e2a9f-7ea1-4b09-84cc-e0a9335fd29e.png)

***Step 1_Phân tích sản phẩm (Analyze the product)***

Làm thế nào để có thể kiểm thử một sản phẩm mà không có bất kỳ thông tin về nó? Câu trả lời là không thể. Bạn phải tìm hiểu kỹ một sản phẩm trước khi kiểm thử nó.
Sản phẩm đang được kiểm thử là trang web ngân hàng Guru99. Bạn nên nghiên cứu khách hàng và người dùng cuối để biết nhu cầu và mong đợi của họ từ ứng dụng
* Who will use the website? (Ai sẽ sử dụng trang web?)
* What is it used for? (Nó được dùng để làm gì?)
* How will it work? (Nó sẽ làm việc như thế nào?)
* What are software/ hardware the product uses? (Phần mềm / phần cứng sản phẩm sử dụng là gì?)

Bạn có thể sử dụng phương pháp sau để phân tích trang web

![](https://images.viblo.asia/1c82c113-20c8-4e23-9662-0adf71bfa1a2.jpg)

Bây giờ chúng ta hãy áp dụng kiến thức trên vào một sản phẩm thực tế: 
Phân tích banking website : http://demo.guru99.com/V4

![](https://images.viblo.asia/695e45a5-2f5f-4c5e-a646-ae16ef365902.gif)

Bạn nên xem qua trang web này và xem xét tài liệu sản phẩm. Đánh giá tài liệu sản phẩm giúp bạn hiểu tất cả các tính năng của trang web cũng như cách sử dụng nó. Nếu bạn không rõ ràng về bất kỳ mục nào, bạn có thể confirm với khách hàng, nhà phát triển, nhà thiết kế để có thêm thông tin.

***Step 2_Xây dựng chiến lược kiếm thử (Develop Test Strategy)***
Test Strategy (Chiến lược kiểm thử) là một bước quan trọng trong việc lập Test Plan. Tài liệu Test Strategy, là tài liệu high-level, thường được phát triển bởi Test Manager. 

Tài liệu này định nghĩa:
* Mục tiêu kiểm thử của dự án và các phương tiện để đạt được chúng
* Xác định effort và chi phí kiểm thử. 
Quay lại dự án của bạn, bạn cần phát triển Test Strategy để kiểm thử trang web ngân hàng đó. Bạn nên làm theo các bước dưới đây :
![](https://images.viblo.asia/fcd8a333-d94c-4ea5-95c7-93f2100c6dcb.png)

    ***Step 2.1_Định nghĩa phạm vi của kiểm thử (Define Scope of Testing)***
    
    Trước khi bắt đầu bất kỳ hoạt động kiểm thử nào, phải biết phạm vi kiểm thử. Bạn phải suy nghĩ kỹ về nó.
    
    - Các thành phần của hệ thống sẽ được kiểm thử (phần cứng, phần mềm, phần mềm trung gian, v.v.) được định nghĩa là "in scope (trong phạm vi)"
    - Các thành phần của hệ thống sẽ không được kiểm thử cũng cần được xác định rõ ràng là "out of scope (ngoài phạm vi)".
    
    Xác định scope của dự án kiểm thử của bạn là rất quan trọng đối với tất cả các bên liên quan. Một scope chính xác giúp bạn
    - Cung cấp cho mọi người một sự chắc chắn và thông tin chính xác về kiểm thử mà các bạn đang làm
    - Tất cả các thành viên dự án sẽ có một sự hiểu biết rõ ràng về những gì được kiểm thử và những gì không
   
      **Làm thế nào để xác định scope kiểm thử của dự án ?**
     
      Để xác định scope, bạn phải :
   
      - Precise customer requirement (Nắm được yêu cầu chính xác của khách hàng) 
      - Project Budget (Ngân sách dự án)
      - Product Specification (Đặc điểm kỹ thuật sản phẩm)
      - Skills & talent of your test team (Kỹ năng & trình độ của nhóm kiểm thử của bạn)
   
      Bây giờ nên xác định rõ ràng "in scope" và "out of scope" của kiểm thử.
   
      Theo thông số kỹ thuật yêu cầu phần mềm, dự án Guru99 Bank chỉ tập trung vào kiểm thử tất cả các chức năng và giao diện bên ngoài của trang web Guru99 Bank (in scope)
      
       Kiểm thử nonfunctional như stress, performance hoặc logical database sẽ không được kiểm thử (out of scope)

      **Vấn đề khó khăn khi xác định scope của dự án**

      Khách hàng muốn bạn kiểm thử API. Nhưng ngân sách dự án không cho phép làm như vậy. Trong trường hợp như vậy bạn sẽ làm gì?
  
      Trong trường hợp như vậy, bạn cần thuyết phục khách hàng rằng API Test là extra work và sẽ tiêu tốn resources đáng kể. Cung cấp cho họ dữ liệu hỗ trợ về lập luận của bạn. Nói với họ nếu API Test là "in-scope" thì budget sẽ tăng thêm số tiền XYZ.
  
      Khách hàng đồng ý và theo đó các phạm vi mới, ngoài phạm vi các mục là :
      - Các mục in-scope : Functional Testing, API Test
      - Các mục out of scope : Database Testing, hardware và bất kỳ giao diện bên ngoài nào khác


  ***Step 2.2_Xác định loại kiểm thử (Identify Testing Type)***
        
  Testing Type là một quy trình kiểm thử tiêu chuẩn mang lại kết quả kiểm thử  dự kiến.

  Mỗi Testing Type được xây dựng để xác định một loại lỗi sản phẩm cụ thể. Nhưng, tất cả các Testing Type đều nhằm đạt được một mục tiêu chung. Phát hiện sớm tất cả các lỗi trước khi phát hành sản phẩm cho khách hàng.

  Các Testing Type thường được sử dụng được mô tả như hình dưới đây : 
  
  ![](https://images.viblo.asia/dac6d8f3-4644-45ad-8c5c-0158c6b04541.png)
  
  Có rất nhiều Testing Type để kiểm thử sản phẩm phần mềm. Nhóm của bạn không thể có đủ effort để xử lý tất cả các loại kiểm thử. Nếu là Test Manager, bạn phải đặt mức độ ưu tiên của các Testing Type.
  
  Testing Type nào nên được tập trung để kiểm thử ứng dụng web?
  
  Testing Type nào nên được bỏ qua để tiết kiệm chi phí?
  
    ```
    Bây giờ hãy thực hành với dự án của bạn. Sản phẩm bạn muốn kiểm tra là banking website.
    Những loại thử nghiệm nào bạn nên tập trung trong trường hợp này?
    Chọn tất cả những gì áp dụng
    A) Unit Testing
    B) API Testing
    C) Integration Testing
    D) System Testing
    E) Install/Uninstall Testing
    F) Agile testing
    ```
  
  ***Step 2.3_Tạo và lưu trữ tài liệu về Risk & Issues (Document Risk & Issues)***
  
  Risk là sự kiện không chắc chắn xảy ra trong tương lai nhưng có xác suất xảy ra và có khả năng thua lỗ. Khi Risk thực sự xảy ra, nó sẽ trở thành issue.
  
  Trong bài viết phân tích Risk và Solution, bạn đã tìm hiểu về phân tích Risk chi tiết và xác định các Risk tiềm ẩn trong dự án.
  
  Trong QA Test Plan, bạn sẽ ghi lại những Risk đó
  
  | Risk | Giải pháp giảm tránh Risk |
  | -------- | -------- |
  | Thành viên trong nhóm thiếu các kỹ năng cần thiết để kiểm thử trang web. | Lập kế hoạch khóa training để nâng cao kỹ năng của các thành viên | 
  | Project schedule quá eo hẹp; thật khó để hoàn thành dự án này đúng hạn| Đặt mức độ ưu tiên (Test Priority) cho từng hoạt động kiểm thử.  | 
  | Test Manager có kỹ năng quản lý kém | Lập kế hoạch đào tạo cho manager | 
  | Thiếu hợp tác ảnh, ảnh hưởng tiêu cực đến năng suất của thành viên | Khuyến khích mỗi thành viên trong nhóm thực hiện nhiệm vụ của mình và truyền cảm hứng cho họ để họ nỗ lực nhiều hơn. |
  | Dự toán ngân sách sai và vượt chi phí | Thiết lập scope trước khi bắt đầu công việc, chú ý nhiều đến việc lập planning dự án và liên tục theo dõi và đo lường tiến độ |
  
  ***Step 2.4_Tạo Test Logistics***
  
  Trong Test Logistics, Test Manager cần trả lời các câu hỏi sau:
  - Ai sẽ là người thực hiện kiểm thử (Who will test)?
  - Khi nào sẽ thực hiện kiểm thử (When will the test occur)?
  
  **Ai sẽ là người thực hiện kiểm thử (Who will test) ?**
  
  Bạn có thể không biết tên chính xác của Tester, nhưng phân loại Tester có thể được xác định.
  
  Để chọn thành viên phù hợp với task cụ thể, bạn phải xem xét nếu khả năng của họ có đủ điều kiện cho task hay không, cũng như ước tính ngân sách dự án. Lựa chọn thành viên sai cho task có thể gây ra các dự án thất bại hay chậm trễ.
  
  Người có các kỹ năng sau là lý tưởng nhất để thực hiện kiểm thử phần mềm:
  - Khả năng hiểu quan điểm của khách hàng
  - Mong muốn chất lượng tốt
  - Chú ý đến chi tiết
  - Tinh thần hợp tác tốt

  Trong dự án của bạn, thành viên người mà sẽ chịu trách nhiệm thực hiện kiểm thử là Tester. Dựa trên ngân sách dự án, bạn có thể chọn thành viên trong nội bộ hoặc thuê người ngoài làm Tester. 
  
  **Khi nào sẽ thực hiện kiểm thử (When will the test occur) ?**
  
  Các hoạt động kiểm thử phải được kết hợp với các hoạt động phát triển liên quan.
  Bạn sẽ bắt đầu kiểm thử khi bạn có tất cả các mục yêu cầu được hiển thị trong hình dưới đây :

  ![](https://images.viblo.asia/90c633cf-6cc5-4c3e-8a40-a5edc266736e.png)
  
***Step 3_Xác định đối tượng kiểm thử (Define Test Objective)***

Test Objective (Đối tượng kiểm thử) là mục tiêu tổng thể và thành tích của việc thực hiện kiểm thử. Test Objective là tìm ra càng nhiều lỗi phần mềm càng tốt; đảm bảo rằng phần mềm được kiểm tra không có lỗi trước khi phát hành.

Để xác định Test Objective, bạn nên thực hiện 2 bước sau :
- Liệt kê tất cả các tính năng phần mềm (functionality, performance, GUI…) có thể cần kiểm thử.
- Xác định mục tiêu hoặc mục đích của kiểm thử dựa trên các tính năng trên

Hãy  áp dụng các bước này để tìm Test Objective của dự án kiểm thử Guru99 Bank của bạn

Bạn có thể chọn phương thức ‘TOP-DOWN' để tìm các tính năng của trang web có thể cần kiểm thử. Trong phương pháp này, bạn chia nhỏ ứng dụng đang kiểm thử thành component và sub-component.

Trong chủ đề trước, bạn đã phân tích các thông số kỹ thuật yêu cầu và duyệt qua trang web, do đó bạn có thể tạo Mind-Map để tìm các tính năng của trang web như sau :

![](https://images.viblo.asia/c063fec8-b607-41fe-9664-a91cc4d0c7e0.png)

Hình này thể hiện tất cả các tính năng mà trang web của Guru99 có thể có.

Dựa trên các tính năng trên, bạn có thể xác định Test Objective của dự án Guru99 như sau :

- Kiểm tra xem liệu chức năng của trang web Gur99 (Account, Deposit…) có hoạt động như mong đợi mà không có bất kỳ error hoặc bug nào trong môi trường business thực không ?
- Kiểm tra xem giao diện bên ngoài của trang web như UI có hoạt động như mong đợi và đáp ứng nhu cầu của khách hàng không ?
- Xác minh usability của trang web. Những chức năng đó có thuận tiện cho người dùng hay không?

***Step 4_Xác định tiêu chí kiểm thử (Define Test Criteria)***

Test Criteria (Tiêu chí kiểm thử) là một tiêu chuẩn hoặc quy tắc mà theo đó một quy trình kiểm thử hoặc đánh giá kiểm thử có thể được dựa trên. Có 2 loại Test Criteria như sau :

*   **Tiêu chí đình chỉ kiểm thử (Suspension Criteria)**

    Xác định các tiêu chí đình chỉ kiểm thử quan trọng cho một bài kiểm thử. Nếu các tiêu chí đình chỉ kiểm thử được đáp ứng trong quá trình kiểm thử, chu kỳ kiểm thử hoạt động sẽ bị đình chỉ cho đến khi các tiêu chí được giải quyết.
    
    Ví dụ: Nếu các thành viên trong nhóm của bạn báo cáo rằng có 40% trường hợp kiểm thử thất bại, bạn nên tạm dừng kiểm thử cho đến khi nhóm phát triển sửa chữa tất cả các trường hợp thất bại.
    
    ![](https://images.viblo.asia/c43ad136-8335-42ee-8ff5-87c829f734d9.png)
    
*   **Tiêu chí kết thúc kiểm thử (Exit Criteria)**
    
    Tiêu chí kết thúc kiểm thử xác định các tiêu chí thể hiện sự hoàn thành thành công của giai đoạn kiểm thử. Các tiêu chí kết thúc kiểm thử là kết quả được nhắm đến là mục tiêu của thử nghiệm và là cần thiết trước khi tiến hành giai đoạn phát triển tiếp theo. Ví dụ: 95% của tất cả các trường hợp kiểm thử quan trọng phải Pass.
    Một số phương pháp xác định tiêu chí kết thúc kiểm thử  là bằng cách xác định run rate và pass rate được nhắm mục tiêu.
    - Run rate là tỷ lệ giữa số các trường hợp kiểm thử được thực hiện / tổng số trường hợp kiểm thử của đặc tả kiểm thử. Ví dụ: đặc tả kỹ thuật kiểm tra có tổng số 120 TCs, nhưng Tester chỉ thực hiện 100 TCs, vì vậy Run rate là 100/120 = 0,83 (83%)
    - Pass rate là tỷ lệ giữa số lượng các trường hợp kiểm thử pass / Số lượng các trường hợp kiểm thử được thực hiện. Ví dụ: trong hơn 100 TCs được thực thi, có 80 TCs đã pass, do đó, Pass rate là 80/100 = 0,8 (80%)
    
    Dữ liệu này có thể được lấy trong các tài liệu Test Metric.
    
    Run rate bắt buộc là 100% trừ khi có lý do rõ ràng.
    
    Pass rate phụ thuộc vào phạm vi dự án, nhưng đạt được Pass rate cao là một mục tiêu.
    
    Ví dụ: Nhóm của bạn đã thực hiện các kiểm thử. Họ báo cáo kết quả kiểm thử cho bạn và họ muốn bạn xác nhận Exit Criteria.
    
    ![](https://images.viblo.asia/501a55bd-2d04-44ef-b838-3618b6b8904a.jpg)
    
    Trong trường hợp trên, Run rate là bắt buộc là 100%, nhưng nhóm kiểm thử chỉ hoàn thành 90% các trường hợp kiểm thử. Điều đó có nghĩa là Run rate không được thỏa mãn, vì vậy KHÔNG xác nhận Exit Criteria
    
***Step 5_Lập kế hoạch resource (Resource Planning)***

Resource plan là một bản tóm tắt chi tiết của tất cả các loại tài nguyên cần thiết để hoàn thành nhiệm vụ của dự án. Resource có thể là con người, thiết bị và vật liệu cần thiết để hoàn thành một dự án

Việc lập Resource plan là yếu tố quan trọng của việc lập Test Plan vì giúp xác định số lượng Resource (nhân viên, thiết bị…) được sử dụng cho dự án. Do đó, Test Manager có thể lập lịch trình & dự toán chính xác cho dự án.

Phần này đại diện cho các resource được đề xuất cho dự án của bạn.

* **Human Resource**

  Bảng sau đây đại diện cho các thành viên khác nhau trong nhóm dự án của bạn :
  
  | NO | Member | Tasks |
  | -------- | -------- | -------- |
  | 1 | __Test Manager__| Quản lý toàn bộ dự án <hr> Xác định phương hướng dự án <hr> Có được tài nguyên phù hợp|
  | 2 | __Tester__| Xác định và mô tả các techniques/tools/automation architecture.<hr> Xác minh và đánh giá Phương pháp tiếp cận (Test Approach). <hr> Thực hiện các bài kiểm thử, Log results, Report defects. <hr> Tester có thể là thành viên in-sourced hoặc out-sourced, dựa trên ngân sách dự án. <hr> Đối với nhiệm vụ yêu cầu kỹ năng thấp, bạn nên chọn các thành viên thuê ngoài để tiết kiệm chi phí dự án. |
  | 3 | __Developer in Test__ | Triển khai thực hiện test cases, test program, test suite, ... |
  | 4 | __Test Administrator__ | Xây dựng và đảm bảo Test Environment và tài sản được quản lý và duy trì. <hr>  SupportTester sử dụng Test Environment để thực hiện kiểm thử |
  | 5 | __SQA members__ | Phụ trách đảm bảo chất lượng. <hr> Kiểm tra để xác nhận xem quy trình kiểm thử có đáp ứng các yêu cầu không. |
  
 
*  **Tài nguyên hệ thống (System Resource)**

    Để kiểm thử, một ứng dụng web, bạn nên lập kế hoạch cho các resources như các bảng sau:
    
      | NO | Resources  | Mô tả |
      | -------- | -------- | -------- |
      | 1      |  Server| Cài đặt ứng dụng web đang kiểm thử. <hr> Điều này bao gồm một web server, database server và application server riêng nếu có.|
      | 2      | Test tool | Testing tool là tự động hóa kiểm thử, mô phỏng hoạt động của người dùng, tạo kết quả kiểm thử. <hr> Có rất nhiều testing tool mà bạn có thể sử dụng cho dự án này như Selenium, QTP, ... |
      | 3      | Network | Bạn cần một Network bao gồm mạng LAN <hr> và Internet để mô phỏng môi trường thực của người dùng và doanh nghiệp. |
      | 4      | Computer | PC mà người dùng thường sử dụng để kết nối web server |
    
***Step 6_Lập kế hoạch Môi trường kiêm thử (Plan Test Environment)***

* **Test Environment là gì ?**
    
    Test Environment là một thiết lập của phần mềm và phần cứng mà nhóm kiểm thử sẽ thực hiện các trường hợp kiểm thử. Test Environment bao gồm môi trường business và người dùng thực tế, cũng như môi trường vật lý, chẳng hạn như máy chủ, môi trường chạy giao diện người dùng.
    
* **Làm thể nào để cài đặt Test Environment**
    
    Quay lại dự án của bạn, làm thế nào để bạn thiết lập môi trường kiểm thử cho banking website?
    
    Để hoàn thành nhiệm vụ này, bạn cần có sự hợp tác chặt chẽ giữa Test Team và Development Team
    
    ![](https://images.viblo.asia/71a15246-3133-4d3d-ab3a-e24ecb2e0ec7.png)
    
    Bạn nên hỏi developer một số câu hỏi để hiểu rõ về ứng dụng web đang kiểm thử. Đây là một số câu hỏi được đề nghị. Tất nhiên, bạn có thể hỏi những câu hỏi khác nếu bạn cần.
    - Kết nối người dùng tối đa mà trang web này có thể xử lý cùng một lúc là gì?
    - Yêu cầu phần cứng / phần mềm để cài đặt trang web này là gì?
    - Máy tính của người dùng có cần bất kỳ cài đặt cụ thể nào để duyệt trang web không?
   
   Hình dưới đây mô tả môi trường thử nghiệm của banking website www.demo.guru99.com/V4
   
   ![](https://images.viblo.asia/17ccab35-2561-45bd-9eb1-b21ca02f3e80.jpg)
   
***Step 7_Schedule & Estimation***

Trong bài viết [Test Estimation](https://viblo.asia/p/software-test-estimation-techniques-step-by-step-guide-aWj539o8Z6m), bạn đã sử dụng một số kỹ thuật để estimate effort để hoàn thành dự án. Bây giờ bạn nên bao gồm estimate đó cũng như schedule lên Test Planning.

Trong giai đoạn Test Estimation, giả sử bạn chia toàn bộ dự án thành các task nhỏ và thêm dự toán cho từng nhiệm vụ như dưới đây :

![](https://images.viblo.asia/036d6add-b238-4b86-9a76-2101a7204e1d.png)

Sau đó, bạn tạo schedule để hoàn thành các task này.

Lập schedule là một thuật ngữ phổ biến trong quản lý dự án. Bằng cách tạo một schedule vững chắc trong Test Planning, Test Manager có thể sử dụng nó làm công cụ để theo dõi tiến độ dự án, kiểm soát chi phí vượt mức.

Để tạo project schedule, Test Manager cần một số loại đầu vào như dưới đây:
- **Employee và project deadline :** Ngày làm việc, deadline của dự án, resource sẵn có là những yếu tố ảnh hưởng đến schedule.
- **Project estimation :** Dựa trên estimation, Test Manager biết thời gian hoàn thành dự án là bao lâu. Vì vậy, họ có thể làm cho project schedule thích hợp.
- **Project Risk :** Hiểu rủi ro giúp Test Manager thêm đủ thời gian vào project schedule để xử lý rủi ro.

Hãy thực hành với một ví dụ:

Giả sử ông chủ muốn hoàn thành dự án Guru99 trong một tháng, bạn đã ước tính effort cho từng task trong Test Estimation. Bạn có thể tạo schedule như dưới đây:

![](https://images.viblo.asia/60071688-8006-4a87-85e4-54faf58df625.png)

***Step 8_Deliver sản phẩm thử nghiệm (Test Deliverables)***

Deliver sản phẩm thử nghiệm là danh sách tất cả các tài liệu, tool và các thành phần khác phải được phát triển và duy trì để hỗ trợ effort kiểm thử.

Có các sản phẩm kiểm thử khác nhau ở mọi giai đoạn của vòng đời phát triển phần mềm.

![](https://images.viblo.asia/9f0fed4c-4664-4808-b562-22309acc652d.png)

Test deliverables được cung cấp trước giai đoạn kiểm thử.

- Tại liệu Test plan.
- Tài liệu Test cases.
- Test Design specifications.

Test deliverables được cung cấp trong quá trình kiểm thử
- Test Scripts
- Simulators (Mô phỏng).
- Test Data
- Test Traceability Matrix (Kiểm thử Matrix truy xuất nguồn gốc)
- Error logs và nhật ký hoạt động.

Test deliverables được cung cấp sau khi chu kỳ kiểm thử kết thúc.
- Kết quả / Báo cáo kiểm thử (Test Results/reports)
- Defect Report
- Hướng dẫn quy trình cài đặt / kiểm thử
- Release notes

### Nguồn Tham khảo:
https://www.guru99.com/what-everybody-ought-to-know-about-test-planing.html