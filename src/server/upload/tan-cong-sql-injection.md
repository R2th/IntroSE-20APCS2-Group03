![](https://images.viblo.asia/4cb0e73b-8b31-4469-bc1b-c43d72abe087.jpeg)

`Lưu ý: Không thử tấn công website, hệ thống của cá nhân, tổ chức khác bằng phương pháp này, mọi hành vi như vậy đều là vi phạm pháp luật Việt Nam. Bài viết chỉ nhằm mục đích học hỏi, mọi hành vi phá hoại không được khuyến khich.`

**Vì một Việt Nam không còn Bug.**

# 1. SQL injection là gì?
SQL injection hay còn gọi là SQLi, được nhắc đến đầu tiên khi bàn luận về các lỗ hổng trên ứng dụng web. SQLi đã xuất hiện từ rất lâu nhưng hiện nay nó vẫn còn tồn tại và gây ảnh hượng nặng nề đối với ứng dụng web. Do thời thế thay đổi, người người, nhà nhà đã chuyến sang dùng FrameWork nên lỗi chỉ xuất hiện trên các FrameWork này thôi. Nên công việc tìm ra lỗi SQLi là rất khó ( không phải là không tìm được).

**Vậy, SQLi là gì?**

Để có cái hiểu đúng đắn cũng như các thông tin khác chi tiết bạn hãy lên [SQLi at wikipedia](https://en.wikipedia.org/wiki/SQL_injection).

Đối với mình thì hiểu theo cách đơn giản như sau:
```
SQLi là lỗi cho phép ta chèn các ký tự đặc biệt đã phá vỡ, điều khiển câu truy vấn theo ý muốn của ta.
```
Vì đây không còn là lỗi quá mới nên sẽ có rất nhiều nói về lý thuyết SQLi, nên mình sẽ không đi vào phần lý thuyết mà mình sẽ đưa ví dụ để chúng ta có thể hiểu hơn về nó.

Một vài link nói về SQLi:

* https://www.acunetix.com/websitesecurity/sql-injection/
* https://www.owasp.org/index.php/SQL_injection
* https://portswigger.net/web-security/sql-injection
* https://whitehat.vn/threads/tim-hieu-ve-sql-injection-va-cach-phong-chong.11591/
* https://viblo.asia/p/tim-hieu-ve-sql-injection-testing-RQqKLv90l7z

Trên đây là link tham khảo, có cả tiếng anh và tiếng Việt. Mình nghĩ nên đọc tiếng anh cho nhiều chữ và dữ hiểu.
# 2. Phân loại
Theo như dân gian thì sQLi được chia ra làm 2 loại chính: SQLi (Hay còn gọi là SQLi bình thường), Blind SQLi
## 2.1. Normal SQLi
Normal SQLi là loại khi ta truy vấn thì ứng dụng web có trả ra kết quả phù hợp với câu truy vấn đó. Từ đó, ta có thể dựa vào kết quả đó mà phán đoán được rằng câu truy vấn của ta đã phù hợp hay chưa.

![](https://images.viblo.asia/24be1662-8cff-4f05-bb66-813663b3b842.png)

Ví dụ, trong lab trên ta có ô nhập `ID` để kiểm tra thông tin của người nào đó trong hệ thống. Nếu có `ID` đó trên hệ thống, hệ thống sẽ hiển thị thông tin ra cho ta. Nếu không có thì sẽ không hiển thị gì như hình dưới.

![](https://images.viblo.asia/bb441f48-c8a7-48aa-9948-390bb987bc01.png)

Để ý trong URL ở 2 hình trên, hình 1 mình nhập vào `ID=1` và hình 2 mình nhập `ID=6` kết quả của 2 hình khác nhau. Một thằng cho ra thông tin còn 1 thằng thì không.

Bây giờ ta sẽ tiến hành khai thác. Những đoạn dữ liệu nhập vào để tiến hành khai thác ta gọi là payload.

Ta có thể tìm payload phù hợp với mình, còn mình sẽ sử dụng bộ payload lượm được trên GG: https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection

![](https://images.viblo.asia/784134d2-61a8-45d4-a933-6afa1dd09fa3.png)

Đối với loại này, có thể khi khai thác ứng dụng web sẽ thông báo ra lỗi ( cái này là do hệ thống chưa tắt chức năng thông báo lỗi). Từ những thông tin bắn ra từ lỗi sẽ giúp ta dễ dàng hơn trong việc khai thác.

Sử dụng các đoạn payload phù hợp, mình đã in ra thông tin tên các cột trong bảng `users`.

![](https://images.viblo.asia/e6d799a6-ad00-40df-8bca-5ac727c72d64.png)

Giờ chỉ còn việc hãy lấy thông tin `user` và `password` của admin nữa thôi. :)
## 2.2 Blind SQLi
Ở trên, mình đã nói rất chi tiết về ví vụ của `normal SQLi`. Trong phần này mình sẽ nói qua về lý thuyết cách khai thác Blind SQLi. Còn về phần ví dụ mình sẽ để một bài sau để nói về nó cho có món :satisfied:.

Nghe cái tên chắc ta cũng mường tượng phần nào về nó rồi phải không. Blind SQLi là loại mà ta có truy vấn đúng hay sai thì kết quả vẫn không hiển thị lên cho người dùng thấy. Từ đây ta cần phải sử dụng một vài thủ thuật đê tiến hành khai thác. Ta có các kỹ thuật để khai thác blind SQLi như: time-base, TRUE/FALSE

Phần này mình sẽ nói chi tiết trong bài sau!
# 3. Tổng hợp link đính kèm
* https://www.acunetix.com/websitesecurity/sql-injection/
* https://www.owasp.org/index.php/SQL_injection
* https://portswigger.net/web-security/sql-injection
* https://dev.mysql.com/doc/refman/5.7/en/
* https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection