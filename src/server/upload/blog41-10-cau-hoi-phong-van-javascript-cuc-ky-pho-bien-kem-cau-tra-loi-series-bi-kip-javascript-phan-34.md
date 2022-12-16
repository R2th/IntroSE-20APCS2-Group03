![image.png](https://images.viblo.asia/c4110d31-047c-4fda-84a9-e96c5087117d.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Bài này mình sẽ chụp hình chứ không copy code bỏ vào bài viết. Để các bạn có cơ hội gõ lại thay vì copy paste.
Có thể khi các bạn đọc qua sẽ có lúc không hiểu nhưng chỉ cần gõ lại và debug là hiểu ngay.
[Bạn nào lười setup debug trong vscode thì dùng editor online luôn cũng okay.](https://jsbin.com/)

**1\. Tìm tần suất xuất hiện của các phần tử trong mảng**
=========================================================

**Cách 1** : Sử dụng `Reduce` của mảng
-------------------------------------------------

![image.png](https://images.viblo.asia/81dcffc9-1f1e-42b7-8a7b-37014f78ef58.png)

**Phương pháp 2** : Sử dụng một Object và một vòng For
-----------------------------------------

![image.png](https://images.viblo.asia/f3adb22d-2d21-42e6-819b-0f7ed0ab21e6.png)

**2\. Nhóm các đối tượng theo một thuộc tính nhất định**
=================================================================
Ví dụ nhóm theo độ tuổi

![image.png](https://images.viblo.asia/8382dae4-077d-4cda-afc2-d595b0286351.png)

**3\. Kiểm tra một chuỗi có được đóng mở bằng các cặp ngoặc ko.**
==============================================================
Lưu ý trong VD bên dưới việc xóa các ký tự là `space` (ký tự khoảng trắng) chỉ là trường hợp cụ thể của vd này.
  - Trường hợp tổng quát hơn bao gôm nhiều ký từ khác thì cũng sử dụng regex xóa toàn bộ các ký tự không phải là đóng mở ngoặc.
  - Kết quả đâu vào sau khi clean sẽ luôn có dạng một chuỗi "chỉ bao gồm các ký tự dấu ngoặc"

![image.png](https://images.viblo.asia/cf6edc96-359e-4695-8440-784ccaaf621d.png)

**4\. Tìm các cặp phần tử mảng mà tổng bằng giá trị đã cho (Two Sum)**
==========================================================================================

![image.png](https://images.viblo.asia/7ccc1072-7ea8-4911-85ed-c2cc3c804f01.png)

**5\. Tìm số còn thiếu trong mảng chưa sắp xếp với độ phức tạp O(n)**
=====================================================================

**Phân tích thuật toán**
--------------
Cách tìm rất đơn giản chỉ cần cộng từ 1-a.length+1 và trừ toàn bộ số trong mảng a đó đi là được.

![image.png](https://images.viblo.asia/43e6222e-cc72-4c65-b8a8-de9d7479d524.png)

**6\. Tìm số còn thiếu trong mảng đã sắp xếp với độ phức tạp O(n)**
===================================================================
Số thứ i được cho là bị thiếu nếu như nó thõa mãn 2 trường hợp:
1. Số tiếp theo trừ nó phải bằng 1
2. Và số tiếp theo phải tồn tại

![image.png](https://images.viblo.asia/b7e08db0-69c3-4d95-a835-2e3a3e7027b6.png)

**7\. Tìm phần tử lớn thứ n trong mảng đã sắp xếp**
===================================================

![image.png](https://images.viblo.asia/3400bc92-2502-427b-ad95-72e942264702.png)

**8\. Loại bỏ các giá trị trùng lặp khỏi một mảng và trả về các giá trị duy nhất ở độ phức tạp O(n).**
======================================================================================================

![image.png](https://images.viblo.asia/5fd394bd-8a05-4d9f-8079-78b54a3af4ad.png)

**9\. In tất cả các phần tử trùng lặp của một mảng**
====================================================

![image.png](https://images.viblo.asia/8c71673e-b298-42fc-bb94-b7174e0abb4f.png)

**10\. Thu thập sách từ mảng đối tượng và trả về danh sách các đầu sách dưới dạng một mảng**
=====================================================================================

![image.png](https://images.viblo.asia/2196737e-3e56-415c-a77c-5bc5a05fe2c8.png)

**Roundup**
=====================================================================================
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

**Ref**
=====================================================================================
* https://tuan200tokyo.blogspot.com/2022/11/blog41-10-cau-hoi-phong-van-javascript.html