Trong [phần 4](https://viblo.asia/p/phan-tich-nhung-cong-cu-test-phan-mem-tot-nhat-phan-4-Az45bxNOZxY), mình đã giới thiệu về những công cụ hỗ trợ quá trình setup test và hạ tầng test (Test Setup & Infrastructure). Phần này mình sẽ tiếp tục phân tích vai trò và liệt kê những công cụ hỗ trợ test trên nền tảng di động (Mobile Testing) và những công cụ hỗ trợ theo dõi bug (Bug Tracking) theo như đã phân loại trước đó.

![](https://images.viblo.asia/9fddd74f-6086-40f5-b18c-8ef61d0386d7.png)

**8. Những công cụ hỗ trợ test trên nền tảng di động (Mobile Testing Tools)**

* Việc kiểm thử trên thiết bị di động đang có mức độ quan trọng ngày càng tăng lên do việc sử dụng những thiết bị di động đang không ngừng tăng lên. Với việc có nhiều kiểu khác nhau của ứng dụng (native, hybrid, mobile web) và được phát triển trên nhiều hệ điều hành khác nhau, việc kiểm thử các ứng dụng di động tỏ ra là một công việc khó khăn. Những công cụ hỗ trợ kiểm thử trên thiết bị di động sử dụng những framework hỗ trợ test được tự động hóa để giúp làm đơn giản quá trình này. 

* Các bạn có thể tham khảo thêm bài viết “Mobile Testing: A New Animal Needs New Strategy” để có thêm cái nhìn bao quát hơn về chiến lược có thể áp dụng đối với việc kiểm thử trên thiết bị di động.

* Để chi tiết hơn, mình sẽ lựa chọn và phân tích sâu hơn vào những công cụ hỗ trợ kiểm thử các phần mềm trên thiết bị di động bên dưới.

**8.1. Keynote DeviceAnywhere**

**1. Tóm tắt**

Mang đến những thiết bị thực, bao gồm điện thoại và máy tính bảng cho việc test di động. DeviceAnyWhere là một phần của bộ công cụ test di động lớn hơn của Keynote, cung cấp những khối hỗ trợ test tự động, xây dựng những bài test chấp nhận, test hồi quy, test thăm dò, test bất thường (acceptance, regression and explorative and negative testing).

***2. Giao diện phần mềm***
 
 ![](https://images.viblo.asia/88a1f15e-f049-4001-93af-0a9c43a89bd7.png)

***3. Đặc điểm chính***

* Sử dụng những thiết bị thật và cung cấp việc hỗ trợ những thiết bị mới ngay sau khi chúng ra mắt.
* Tích hợp với những công cụ CI (Continuous Integration) hàng đầu như Appium, Selenium.
* Mang đến nhiều mức giá khác nhau.

***4. Những điều bạn cần biết***

Keynote DeviceAnyWhere cho phép quá trình kiểm thử được diễn ra tự động với việc hỗ trợ một số lượng lớn thiết bị và nhiều công cụ tích hợp đi kèm cho phép công cụ làm việc trơn tru với một quá trình phát triển Agile.

***5. Những liên kết review***

http://www.keynote.com/solutions/testing/mobile-testing

***6. Giá***

Bắt đầu tại 200$ trên một dự án với 5 mức giá khác nhau. Tìm hiểu thêm về giá tại đây https://appexperience.sigos.com/pricing-options-manual-testing/

**8.2. TestPlant eggPlant Mobile**

***1. Tóm tắt***

Cho phép test trên cả thiết bị thật và thiết bị mô phỏng và là một phần của bộ công cụ eggPlant lớn hơn của TestPlant. EggPlant Mobile sử dụng cách thức mô hình hóa các chức năng UI dựa trên ảnh để đơn giản hóa quá trình test di động trên nhiều thiết bị và nhiều nền tảng.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/48aea9aa-32dd-4ee8-a1b3-1c6e26a8072b.png)

***3. Đặc điểm chính***

* Gắn kết với một môi trường TestPlant lớn hơn như TestPlant Mobile Device Farm, để hỗ trợ việc mở rộng test.
* Hỗ trợ truy cập cả thiết bị thực và thiết bị mô phỏng.
* Hỗ trợ nhiều thiết bị (bao gồm iOS, Android, Windows và BlackBerry) và nhiều nền tảng khác nhau.

***4. Những điều bạn cần biết***

TestPlant eggPlant Mobile hỗ trợ test tự động cho các ứng dụng trên thiết bị di động với việc hỗ trợ nhiều thiết bị và nền tảng, hỗ trợ cả thiết bị thật và thiết bị mô phỏng.

***5. Những liên kết review***

http://www.testplant.com/eggplant/testing-tools/eggplant-mobile-eggon/

***6. Giá***

Không có thông tin giá cụ thể, nhưng các bạn có thể tìm hiểu thêm về bản quyền và giá ở đây https://eggplant.io/

**8.3. Appium**

***1. Tóm tắt***

Là một Framework test tự động mã nguồn mở hỗ trợ cho việc kiểm thử trên thiết bị di động. Appium sử dụng giao thức WebDriver để hỗ trợ kiểm thử cho các ứng dụng iOS và Android và làm việc với nhiều kiểu ứng dụng khác nhau (native, hybrid và mobile web). Nó cũng hỗ trợ đầy đủ khả năng truy cập đến các back-end API và hỗ trợ nhiều ngôn ngữ lập trình khác nhau.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/6c105536-c873-4d2f-94e8-09cfbe2c48fa.png)

***3. Đặc điểm chính***

* Sử dụng cả thiết bị thực và thiết bị mô phỏng.
* Hỗ trợ tất cả các framework, công cụ và ngôn ngữ.
* Hỗ trợ đa nền tảng.

***4. Những điều bạn cần biết***

Appium là một framework mã nguồn mở cho phép việc test tự động đối với các ứng dụng native, hybrid và mobile web trên nền tảng iOS và Android. Nó không yêu cầu cần phải chỉnh sửa code và hỗ trợ test trên bất kỳ ngôn ngữ nào.

***5. Những liên kết review***

http://appium.io/
https://www.itcentralstation.com/products/appium

**9. Những công cụ hỗ trợ theo dõi bug: (Bug Tracking Tools)**

* Những công cụ theo dõi bug giúp làm đơn giản hóa quá trình xác định, quản lý và báo cáo các bug phần mềm. Những công cụ này làm tăng sức mạnh của sự tương tác, ghi lại và báo cáo những bug thành luồng tuần tự và giúp chắc chắn các thông tin luôn nhất quán.

* Bên dưới mình sẽ lựa chọn để phân tích cụ thể 3 công cụ hỗ trợ theo dõi và dò tìm bug điển hình.

**9.1. Bugzilla**

***1. Tóm tắt***

Một công cụ theo dõi bug mã nguồn mở đã vượt qua những sự phát triển thông thường. Bugzilla mang đến khả năng theo dõi bug và những thay đổi trong mã nguồn, hỗ trợ tương tác giữa các thành viên trong nhóm phát triển, đưa lên những bản vá và hỗ trợ review, ngoài ra còn hỗ trợ khả năng tích hợp email và nhiều chức năng khác.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/856b6ad3-dbcb-447b-9212-9583db336f12.png)

***3. Đặc điểm chính***

* Hỗ trợ dò tìm những bug giống nhau một cách tự động.
* Hỗ trợ khả năng quản trị, bao gồm những tùy biến và những đặc điểm an ninh.
* Cho phép đặt lịch gửi báo cáo và chỉnh sửa bug theo email.

***4. Những điều bạn cần biết***

Bugzilla là một công cụ theo dõi bug mã nguồn mở và hoàn toàn miễn phí. Nó mang đến nhiều khả năng khác nhau liên quan đến việc theo dõi bug và tương tác giữa các người dùng. Hiện nay, nó vẫn đang được phát triển một cách tích cực.

***5. Những liên kết review***

https://www.bugzilla.org/
https://www.g2crowd.com/products/bugzilla/reviews

***6. Giá***

Bugzilla là một công cụ miễn phí.

**9.2. Atlassian JIRA**

***1. Tóm tắt***

Mang đến khả năng theo dõi các bug và các vấn đề phát sinh khác như một phần của bộ công cụ quản lý rủi ro lớn hơn từ Atlassian. JIRA mang đến khả năng lập kế hoạch, theo dõi, phát hành, đưa ra báo cáo và hỗ trợ cả những luồng công việc thông thường cũng như ngoại lệ. Nó cũng hỗ trợ tích hợp với nhiều công cụ test và các add-on khác nhau của Atlassian.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/15df32c5-0ccc-4012-8f94-03eb2fd89f29.png)

***3. Đặc điểm chính*** 

* Cung cấp những báo cáo Agile và hỗ trợ lập kế hoạch.
* Hỗ trợ tích hợp với nhiều công cụ phát triển và hơn 1000 add-ons
* Mang đến những tùy chọn phát triển đám mây, máy chủ và trung tâm dữ liệu.

***4. Những điều bạn cần biết***

JIRA cung cấp khả năng theo dõi bug đi kèm với những khả năng quản lý rủi ro khác nhau cái mà có thể giúp nó được sử dụng rộng rãi trong quá trình phát triển phần mềm. Nó có thể xem như một giải pháp toàn diện với việc hỗ trợ nhiều công cụ tích hợp khác nhau.

***5. Những liên kết review***

https://www.atlassian.com/software/jira
https://www.g2crowd.com/products/jira/reviews
https://www.softwareadvice.com/project-management/atlassian-jira-profile/
https://www.getapp.com/project-management-planning-software/a/jira/reviews/

***6. Giá***

Bắt đầu tại 10$ trên một người dùng với 9 mức giá khác nhau. Các bạn có thể tham khảo thêm giá tại đây https://www.atlassian.com/licensing/jira-software

**9.3. FogCreek FogBugz**

***1. Tóm tắt***

Mang đến khả năng dò tìm bug như một phần của bộ công cụ hỗ trợ tương tác và dò tìm công việc lớn hơn. FogBugz hỗ trợ quản lý công việc, dò tìm theo thời gian, lập lịch thông minh, hỗ trợ email, tương tác tài liệu, đưa ra các báo cáo lỗi. Nó cũng giúp quản lý quá trình phát triển Agile, review và quản lý mã nguồn.

***2. Giao diện phần mềm***
 
![](https://images.viblo.asia/61750a91-6c04-4591-8c3e-ffd35fbf3ab5.png)

***3. Đặc điểm chính***

* Mang đến những tùy chọn phát triển onsite hoặc cloud.
* Cho phép chỉnh sửa vấn đề theo lô.
* Cho phép tùy chỉnh những luồng công việc, những kiểu trường hợp và những trạng thái.
* Cung cấp một cộng đồng lớn với việc lắng nghe phản hồi trực tiếp từ khách hàng.
* Hỗ trợ việc xuất các báo cáo lỗi tự động.

***4. Những điều bạn cần biết***

FogBugz cung cấp khả năng dò tìm bug cũng như dò tìm các công việc khác nhau cũng như khả năng hỗ trợ tương tác khiến nó ngày càng được ứng dụng rộng rãi trong quá trình phát triển phần mềm. Nó thực sự là một công cụ hỗ trợ tương tác rất thân thiện.

***5. Những liên kết review***

https://www.fogcreek.com/fogbugz/

***6. Giá***

Bắt đầu tại 20$ trên tháng với 2 mức giá khác nhau. Các bạn có thể tham khảo thêm giá tại đây.

-----

Bài viết mình xin phép kết thúc ở đây. Trong phần sau mình sẽ viết tiếp về kiểu công cụ hỗ trợ test tự động cuối cùng và khá thú vị (Niche Testing) và về những công cụ test đang được phát triển và sẽ sớm ra mắt trong tương lai. Cảm ơn các bạn đã đọc bài dịch của mình.

Liên kết tham khảo: https://www.qasymphony.com/blog/100-plus-best-software-testing-tools/