**1. Em có thể mô tả life cycle của một bug ?**



![](https://images.viblo.asia/b6ff7b08-ac40-4879-9185-2f468b696da4.png)

Nguồn hình: https://itguru.vn/blog/wp-content/uploads/2020/03/Sofware-Testing-Life-Cycle-292x300.png


**2. Regression Testing là gì ? Khi nào thì nên regression testing ?**

:sunflower: VD: có tổng 100 testcases ( 60 testcases PASS, 40 testcase FAIL ), sau khi fix xong 40 testcases FAIL => Test lại toàn bộ 100 testcases

**3. Em có thể giải thích functional-testing và non-functional testing ?**

:sunflower: *functional-testing:* Kiểm tra chức năng của một phần mềm, thực hiện bằng tay. Ví dụ khi đăng nhập thì cần có textbox để nhập thông tin vào

:sunflower: *non-functional testing:* Liên quan đến các vấn đề hiệu suất, bảo mật, giao diện,... Thực hiện bằng tool. Ví dụ khi login thì sau 5 giây có login thành công hay không


**4. Smoke test là gì? Khi nào cần ?**
:sunflower: Các khuyết điểm được nhận diện ở giai đoạn đầu, tìm ra lỗi quan trọng 

**5. Em đã bao giờ viết test case mà không có requirement chưa, trong trường hợp đó thì em đưa ra những solution nào để giải quyết ?**
:sunflower: Trao đổi với khách hàng, nếu không có khách hàng thì trao đổi Project Manager ( PM ), Business Analyst ( BA )

**6. Em có biết về  và Branch Testing không ?**
:sunflower: Boundary Testing: Test 2 giá trị min, max
Branch Testing: Kỹ thuật kiểm thử, tất cả các nhánh (branch) của chương trình sẽ được kiểm tra ít nhất một lần. Thực hiện bởi các developer

**7. Em có thể nêu các thành phần cơ bản của 1 test case?**
:sunflower: 
- Tc ID
- Tc Items
- Priority
- Asignee
- Step by Step
- Pre condition
- Test Data
- Expected results
- Actual result: pass/fail
- Comments

**8. Bạn sẽ làm gì khi developer nói là không thể tái tạo được lỗi của bạn ?**
:sunflower: Trao đổi với developer, ngồi lại với nhau liệt kê lại từng step một, xem có sai sót gì không, quên clear cache chẳng hạn,....

**9. Kiểm thử hệ thống là gì ?**
:sunflower: Là một phương pháp theo dõi và đánh giá hành vi của sản phẩm hoặc hệ thống phần mềm hoàn chỉnh đã được tích hợp đầy đủ, dựa vào đặc tả và các yêu cầu chức năng được xác định trước. 

**10. Kỹ thuật phân vùng tương đương (equivalence partitioning) là gì ?**
:sunflower: Là chia thành nhiều vùng mà mỗi vùng thuộc có cùng thuộc tính giống nhau.
VD: Login in: pass word 6 - 10 ký tự
- vùng hợp lệ 6 <= x <= 10 
- vùng không hợp lệ: <6, >10, để trống

**11. Black box testing là gì? White box testing là gì ?**
:sunflower: 
- Black Box: chỉ biết được giá trị input, output. Áp dụng cho người không biết technical mindset
EX: Test login nếu success thì login thành công, ngược lại thì show ra message thông báo lỗi
- White Box: biết được thiết kế cấu trúc giải thuật bên trong  và thực hiện các công việc. Áp dụng cho developer, technical mindset 
EX: khi developer viết unit test 

**12. Test plan là gì? Trình bày nội dung của test plan ?**
:sunflower: Là tài liệu tổng quan về việc kiểm thử 1 project đặc tả: 
+ Phạm vi dự án, hướng tiếp cận, quy trình kiểm thử
+ Tài nguyên và nhân lực cần có, các tính năng cần được test và không cần phải test
+ Các công cụ và môi trường test cần có. Test plan là cơ sở để test các sản phẩm / phần mềm trong một dự án

**13. Test scenario là gì? Khác gì so với testcase ?**
:sunflower: Test Scenario là tập hợp các testcase để test 1 form hoặc function, chỉ nêu mục đích, không chỉ ra các step cụ thể

:sparkler: Chú ý: sau mỗi chiếc :sunflower: là câu trả lời chất hơn ly dừa tắc 

Trong cuộc sống gặp nhau là một cái duyên, biết đâu một ngày nào đó chúng ta va vào nhau !

![](https://images.viblo.asia/34f46cb5-57e2-4200-bb69-483a2e05e85f.png)

[Hướng dẫn tìm bài viết của @dtttthong bằng từ khoá] : DDTCMT

*Các nội dung liên quan bên dưới comment.*