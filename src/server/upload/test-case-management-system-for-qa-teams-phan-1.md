Như các bạn đã biết, khi tạo bộ test case hay checklist thì chúng ta có rất nhiều tool để quản lý. Hôm nay tôi giới thiệu cho các bạn 1 tool quản lý testcase, checklist và có thể thống kê được số liệu khá thuận tiện đó là : Tool Qase

Tool này giúp dễ dàng quản lý các testcase, tạo plan test và thực hiện chạy test với tư cách cá nhân hoặc trong một nhóm. Tool có bản free cho chúng ta dùng các  chức năng cơ bản như tạo plan test, checklist,  testcase, phân chia từng nhóm case để test và extract, thống kê kết quả..., và có một số các tính năng nâng cao thì bắt buộc phải mất phí.

![](https://images.viblo.asia/ae99ddd7-afcf-43a0-a337-5534d336b6ba.png)

**1.  Cách tạo project:** Tên project bạn làm việc hay bạn có thể đặt tên cho bộ testcase này sao cho dễ hiểu.

Click vào Create new project

![](https://images.viblo.asia/ebc26586-edbf-44ec-8ee6-5d42c493b65f.png)

Tại mh new project các bạn input project name, project code, description. Sau đó click Create Project. sẽ tới màn hình tạo các trường hợp kiểm thử.

![](https://images.viblo.asia/fdc42795-fc9b-4543-bb51-50d687580f74.png)
![](https://images.viblo.asia/a65b9147-0032-42c9-8340-8a3967b4d919.png)

**2. Reposition**: Trong đây bạn có thể tạo
+ Suite ( big function, medium function, small function..), 
+ Create các testcase tương ứng, hoặc có thể import testcase đã có sẵn vào.

![](https://images.viblo.asia/524c693f-d706-4204-9099-8a348efdb2da.png)

**2.1. Create Suite**:

Bạn có thể chia viết testcase thành các function hay màn hình để dễ quản lý. Thì tạo suite này chính là việc tạo big function nào đó. 

![](https://images.viblo.asia/ae04e811-b56b-4a1f-a73e-0e61aa355fb5.png)

Suite name: tương ứng với big function (1)

Parent suite: Trường hợp tạo medium function thì sẽ chọn parent suite là big function (1) đã tạo lúc trước. Để giúp nhanh chóng thì tool có hỗ trợ các tính năng như copy, duplicate, edit, xóa suite rất thuận tiện như hình sau

![](https://images.viblo.asia/6ade0393-1de9-4454-9245-c191eac436c8.png)

**2.2. Create testcase**: Phần  này chúng ta cũng sẽ các trường hợp kiểm thử như bình thường. Nhưng nó có hỗ trợ thêm các tính năng như đánh trọng số, phân loại case thuộc nhóm gì để dễ fiter khi test hay extract 1 nhóm chức năng.

![](https://images.viblo.asia/4fa02461-6252-4c54-b285-3797efafef4d.png)

* Title: Overview nội dung cần check ở case đó. Viết ngắn gọn dễ hiểu.
* Suite: chọn tới big function
* Severity: các mức có thể đánh trọng số cho case đó
*Blocker
Critical
Major
Normal
Minor
Trivial*

* Priority : Mức độ ưu tiên

*High
Medium
Low*

* Type: case này thuộc kiểu loại test nào

* Functional: Case này thuộc loại test gì
    + Smoke
    + Regression
    + Security
    + Usability
    + Performance
    + Acceptance
    
* Milestone
* Behavior
*Positive
Negative
Destructive

* Description
* Conditions: Input các điều kiện để có thể thực hiện case đó.
    + Pre-conditions
    + Post-conditions
* Attachments
* Steps to reproduce
   + Action: Các step để thực hiện case
   + Expected result: Kết quả mong đợi.

Dưới đây là vidu cho 1 đoạn testcase để cho các bạn hình dung rõ hơn.
![](https://images.viblo.asia/d8340672-c97e-4693-8fea-f15926051c1d.png)

![](https://images.viblo.asia/b9840162-1aba-41bc-8bf9-b00f5e7b5c1d.png)

Phần này tôi chỉ hướng dẫn các bạn cách tạo function và testcase. Phần tiếp sẽ giới thiệu về cách chạy test, fill kết quả, export nhóm testcase mong muốn.