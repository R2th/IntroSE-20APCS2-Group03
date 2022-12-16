Là một web developer, chắc hẳn chúng ta đã nghe và biết đến hai khái niệm XSS và SQL Injection rồi đúng không ạ? Nhưng chắc phần nhiều cũng chỉ dừng lại ở mức nghe và áp dụng vào code để tránh hai vấn đề này trong dự án. Nay mình xin phép quay demo chi tiết để mọi người có cái nhìn rõ ràng hơn về nó. Cách khai thác nó và nó có thể làm được gì nếu như chúng ta không cẩn thận. Cùng bắt đầu xem lại khái niệm và video demo nhé.

> Demo trong bài viết này được thực hiện ở môi trường lý tưởng (làm ra để có thể khai thác được). Còn môi trường trong thực tế thì có thể sẽ khác, khó hơn và không dễ như những gì có trong video.

# XSS

> **XSS** (**Cross Site Scripting**) là một kiểu tấn công cho phép hacker chèn những đoạn script độc hại (thông thường là Javascript hoặc HTML) vào website và sẽ được thực thi ở phía người dùng (trong trình duyệt của người dùng).

Về khái niệm và cách khai thác thì chúng ta có thể tìm kiếm trên mạng. Có rất nhiều bài viết giới thiệu về nó. Nên mình chỉ viết lại khái niệm cơ bản của XSS. Giờ chúng ta đi luôn vào video demo nhé:

{@embed: https://www.youtube.com/watch?v=YtMkpfWi60A}

Cách phòng tránh XSS đơn giản nhất là chúng ta hãy luôn escape dữ liệu do người dùng nhập vào trước khi hiển thị ra. Thông thường thì chúng ta chỉ cần quan tâm mấy ký tự cơ bản như: `<`, `>`, `"`, `'`, `{` và `}` là đủ. Mình sẽ giới thiệu một đoạn code đơn giản để escape nhé:

```javascript
function escapeHTML(string) {
    return string.replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\"", "&quot;")
        .replace("'", "&apos;")
        .replace("{", "&lcub")
        .replace("}", "&rcub");
}
```

# SQL Injection

> SQL injection là một kỹ thuật cho phép những kẻ tấn công lợi dụng lỗ hổng của việc kiểm tra dữ liệu đầu vào trong các ứng dụng web và các thông báo lỗi của hệ quản trị cơ sở dữ liệu trả về để inject (tiêm vào) và thi hành các câu lệnh SQL bất hợp pháp. SQL injection có thể cho phép những kẻ tấn công thực hiện các thao tác, delete, insert, update, v.v. trên cơ sở dữ liệu của ứng dụng, thậm chí là server mà ứng dụng đó đang chạy. SQL injection thường được biết đến như là một vật trung gian tấn công trên các ứng dụng web có dữ liệu được quản lý bằng các hệ quản trị cơ sở dữ liệu như SQL Server, MySQL, Oracle, DB2, Sysbase...
> 
> Nguồn: Wiki

Trong demo này mình sử dụng SQLMap basic để khai thác. Trong thực tế thì chúng ta muốn khai thác tốt hơn thì phải sử dụng nhiều tùy chọn nâng cao nữa (nhưng mình cũng chỉ dùng được basic thôi :smiley:). Để làm demo này mình đã không escape dữ liệu người dùng nhập vào trước khi thực hiện truy vấn. Chúng ta cùng xem nhé:

{@embed: https://www.youtube.com/watch?v=NSNgK_tbQWg}

Các phòng tránh SQL Injection đơn giản nhất cũng là luôn escape dữ liệu do người dùng nhập vào trước khi thực hiện truy vấn. Tùy ngôn ngữ và framework bạn sử dụng nó sẽ có những cơ chế khác nhau.

# Cookie và Session
> Phần này là phần bonus, không liên quan đến bài viết :laughing:

Khái niệm Cookie và Session bạn có thể tìm kiếm ở trên mạng. Mình sẽ không giới thiệu nữa. Phần này mình sẽ show luôn demo là bạn có thể làm  được gì khi có Session của người khác.

> Mình đã logout tài khoản Github rồi nên bạn không cần mất công ngồi nhập lại cái `user_session` để thử login vào tài khoản của mình đâu nhá :rofl: 

{@embed: https://www.youtube.com/watch?v=zQt-j327tBU}

Rất may là những Cookie này rất khó để đọc được bằng JavaScript (trong trường hợp ăn cắp bằng XSS) khi nó được đánh dấu là **HttpOnly**.

> If one cookie is HttpOnly, it cannot be accessed by client JavaScript, which means hackers cannot read the cookie value and send it to his own server, not even know whether this cookie exist.

# Lời kết

Đến đây là kết thúc bài viết của mình. Có vẻ khá ngắn nhưng mình hy vọng nó đủ để cho mọi người có cái nhìn chi tiết hơn về những khái niệm hay được nhắc tới. Bài viết được viết dựa trên những hiểu biết hạn hẹp của bản thân. Có gì không đúng mong mọi người nhẹ nhàng góp ý cho mình (vì thằng bé dễ bị tổn thương bởi những lời nói nặng nề :rofl:) :smile:!

Chào thân ái và quyết thắng :wave:!

> Original post: https://namnv609.cf/posts/web-security-basic-xss-va-sql-injection.html