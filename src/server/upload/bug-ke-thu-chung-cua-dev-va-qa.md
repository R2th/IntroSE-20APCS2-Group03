Lập trình viên (Dev) và Kiểm thử viên (Tester) dường như là 2 chiến tuyến không hồi kết trong ngành công nghệ thông tin. Mặc dù mục đích của cả 2 chiến tuyến đều là mong muốn sản phẩm tốt hơn, nhưng do 2 cái nhìn khác nhau mà chúng ta hay xảy ra mâu thuẫn. Nhưng du là thế cả 2 bên đều có chung 1 kẻ thù, đó là Bug. Vậy bug là gì và tại sao nó lại tồn tại. Bài viết này mong rằng sẽ giúp các bạn QA mới vào ngành sẽ hiểu rõ hơn về bug

## Bug là gì?

![](https://images.viblo.asia/c4225a04-01b0-44f3-be17-9b037107cec0.png)

Theo như từ điển của ISTQB, Bug hay còn gọi là defect là nguyên nhân làm cho phần mềm hay hệ thống hoạt động không như mong muốn, có thể là sai code, sai requirement, hay là sự hoạt động không giống như mong đợi của khách hàng. Trong quá trình thực hiện test, bug nào tester cũng sẽ log lại, ghi lại để dev có thể biết được chỗ mà đang xảy ra lỗi, biết được các bước tái hiện lại bug đó. Nhưng không phải vậy mà bug nào các bạn cũng phải dồn ép dev fix ngay cho bạn được. Mọi bug đều được phân chia theo mức độ nghiêm trọng và mức độ ưu tiên để có chúng ta có cái nhìn tổng quát rằng bug nào thì cần phải sửa ngay và bug nào có thể để sau.

## Mức độ nghiêm trọng và mức độ ưu tiên

### 1.	Mức độ nghiêm trọng:
Là mức độ mà các defect có thể ảnh hưởng trực tiếp tới phần mềm, từ ảnh hưởng nặng nề hay là ảnh hưởng nhẹ. Hãy xem hình ảnh phía dưới để phần nào hiểu hơn về mức độ nghiêm trọng của defect
![](https://images.viblo.asia/e10b1196-2983-4acf-800a-d51e23be29c3.jpg)
Tùy vào hệ thống log bug mà công ty bạn đang dùng, các mức độ sẽ có đôi chút khác nhau, dưới đây mình sẽ chia các mức độ theo hệ thống redmine:

-   **Blocker**: Lỗi này là các lỗi có sự dây chuyền phức tạp với các chức năng khác. Khi bạn tìm ra lỗi này mà hắn đang ngăn chặn bạn tiếp tục test những testcase phía dưới hãy để vào danh mục blocker. Blocker bug có thể là lỗi từ server, từ các thiết bị phục vụ cho việc vận hành phần mềm, hay là các chức năng có tính liên kết tới nhau
-	**Critical**: Là các lỗi hay defect có thể làm dừng hoản toàn chương trình hay hệ thống, hay là lỗ hổng về bảo mật làm mất dữ liệu của khách hàng, hoặc có thể là chức năng chính của phần mềm không thể nào hoạt động. Với những loại defect như vậy ta sẽ để là Critical.
-	**Major**: Các lỗi này cũng là những lỗi làm chương trình hay các chức năng bị ngừng hoạt động, tuy nhiên vẫn có cách để thay thế và chấp nhận được. Khi đó chúng ta sẽ đặt mức độ ưu tiên ở Major.
-	**Moderate**: Các defect không làm chương trình bị ngừng hoạt động nhưng kết quả trả lại không chính xác, không đầy đủ so với kết quả mong đợi, đây sẽ là mức độ mà bạn muốn đặt các bug đó vào.
-	**Minor**: Các defect này thường là các lỗi về giao diện, nó không cho chúng ta kết quả như thiết kế nhưng có thể sửa dễ dàng.

Ngoài ra, bonus thêm 1 mức độ nghiêm trọng nên các bạn nên biết

-  **Catastrophic**: Loại defect này làm ngưng trệ hệ thống, làm cho hệ thống chạy sai hoàn toàn, có ảnh hưởng không nhỏ tới người dùng, hay nặng nề hơn là tính mạng con người. Riêng với mức độ này, bạn hãy theo link này để tham khảo những lỗi kinh hoàng đã xảy ra và nó là minh chứng tại sao QA chúng ta lại phải biết được sự phân chia mức độ nghiêm trọng: https://raygun.com/blog/costly-software-errors-history/

### 2.	Mức độ ưu tiên
Chuyển tới mức độ ưu tiên, đây sẽ là thứ tự mà dev nhìn vào để fix bug vậy nên bạn phải hiểu được bug mà mình tìm thấy có mức độ ưu tiên nào.
Việc làm này sẽ làm giảm được chi phí fix bug cho những bước tiếp theo và giữ được danh dự cho công ty mà bạn đang làm. Cũng ngư mức độ nghiêm trọng, tùy vào công cụ quản lý bug mà công ty bạn sử dụng có thể khác với những mức độ mình sẽ chia sẻ dưới đây (hệ thông quản lý bug redmine). Có 5 mức độ ưu tiên đó là:

-   **Immediate**: Các defect ảnh hưởng nặng nề tới hệ thống hay phần mềm mà dự án bạn đang làm, hay ảnh hưởng tới hình ảnh của công ty, với các defect này bạn hãy liệt ngay vào danh sách Immediate để dev có thể fix ngay.
-   **Urgent**: Cũng gần giống với Immediate, cần phải fix ngay nhưng có thể cập nhật vào phiên bản sau của sản phẩm
-	**High**: Là các defect mà ảnh hưởng trực tiếp tới phần mềm, kéo theo các tính năng khác cũng bị lỗi. Các bug này cần được sửa càng sớm càng tốt.
-	**Medium**: Các defect này khi xảy ra nhưng các chức năng khác của hệ thống vẫn hoạt động được mà không bị bug này làm ảnh hưởng. Có thể chờ bản build mới hay phiên bản mới của sản phẩm ra rồi bắt đầu fix bug này
-	**Low**: Cũng là những defect cần được sửa nhưng không nhất thiết phải sửa ngay, có thể để lại sau do nó không ảnh hưởng lớn tới sản phẩm.

### 3.	Sự kết hợp của mức độ ưu tiên và mức độ nghiêm trọng:
![](https://images.viblo.asia/621b49ad-5c81-463c-8461-fdd86b2e107a.jpg)

**Độ ưu tiên cao và độ nghiêm trọng cao**: Thường là những lỗi xảy ra do crash app hay dead page, những lỗi này ngăn chặn người dùng có thể sử dụng phần mềm một cách trơn chu do vậy chúng ta đặt nó vào mức độ ưu tiên cao và mức độ nghiêm trọng cao

**Độ ưu tiên cao và độ nghiêm trọng thấp**: Như đã nói ở trên những defect có độ nghiêm trọng thấp thường là các lỗi về phần thiết kế UI/UX, mặc dù vậy nhưng khi phần giao diện này là lỗi chính tả như viết sai tên công ty, sai tên cán bộ cấp cao thì lập tức mức độ ưu tiên của defect phải được để mức độ ưu tiên cao và sửa chữa ngay lập tức

**Độ ưu tiên thấp và độ nghiêm trọng cao**: 1 bug bạn tìm được có khả năng làm trang web bị crash mỗi khi nhấn vào link đó, nhưng link này chỉ là link quảng cáo, tần suất khả năng mà người dùng có thể click vào link đó là rất thấp, thế nên chúng ta có thể để defect đó có độ ưu tiên thấp và độ nghiêm trọng cao

**Độ ưu tiên thấp và độ nghiêm trong thấp**: Là những defect về chính tả thông thường không liên quan tới công ty như dòng thông báo sai chính tả, ngữ pháp sai. Bất kỳ những lỗi nào bạn tìm được mà có mô tả như trên, bạn hãy tự tin để vào danh mục những lỗi có độ ưu tiên thấp và độ nghiêm trọng thấp

**Là một kiểm thử viên, bạn hãy nhớ rằng mình là người làm tốt cho sản phẩm cũng như dev vậy, hãy thể hiện bạn là người biết ân cần và nhẹ nhàng bằng cách hiểu rõ hơn về mức độ nghiêm trọng của bug hay mức độ ưu tiên của bug để giảm gánh nặng 1 phần cho dev, họ cũng giống như chúng ta vậy, họ làm hết sức mình để mang lại 1 sản phẩm tuyệt vời nhất cho khách hàng.**

Tài liệu tham khảo: http://softwaretestingfundamentals.com/defect-priority/, http://softwaretestingfundamentals.com/defect-severity/