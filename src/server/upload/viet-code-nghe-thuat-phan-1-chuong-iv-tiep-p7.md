### Sử dụng column alignment nếu hữu ích
Các edge (cạnh) và column (cột) thẳng giúp người đọc dễ dàng lướt qua code hơn.<br>
Đôi lúc bạn có thể sử dụng  “column alignment”  để làm cho code dễ đọc hơn. Ví dụ, ở trong phần trước, bạn có thể căn lề và gióng hàng các tham số cho method *CheckFullName()*:
```
CheckFullName("Doug Adams"  , "Mr. Douglas Adams" , "");
CheckFullName(" Jake Brown ", "Mr. Jake Brown III", "");
CheckFullName("No Such Guy" , ""                  , "no match found");
CheckFullName("John"        , ""                  , "more than one result");
```
Trong đoạn code này, thật dễ dàng hơn để phân biệt các tham số thứ hai và thứ ba để *CheckFullName()*.<br>
Đây là một ví dụ đơn giản với một nhóm lớn các định nghĩa biến:<br>
```
// Extract POST parameters to local variables
details  = request.getParameter("details")
location = request.getParameter("location")
phone    = equest.getParameter("phone")
email    = request.getParameter("email")
url      = request.getParameter("url")
```
Như bạn có thể nhận thấy, definition thứ ba có lỗi typo (*equest* thay vì *request*). Những lỗi như thế này càng rõ rệt hơn khi mọi thứ được sắp xếp gọn ghẽ.<br>
Trong *wget* codebase, các command-line option có sẵn (có hơn 100 cái) đã được liệt kê như sau:
```
commands[] = {
 ...
 { "timeout",          NULL,                 cmd_spec_timeout },
 { "timestamping",     &opt.timestamping,    cmd_boolean },
 { "tries",            &opt.ntry,            cmd_number_inf },
 { "useproxy",         &opt.use_proxy,       cmd_boolean },
 { "useragent",        NULL,                 cmd_spec_useragent },
 ...
};
```
Cách tiếp cận này làm cho list có thể lướt qua và chuyển tiếp giữa các cột một cách dễ dàng.
#### Bạn có nên dùng Column Alignment?
Các column edge cung cấp các "hàng rào trực quan", giúp cho việc lướt qua code dễ dàng hơn. Nó là một ví dụ điển hình về việc "làm cho code có chức năng giống nhau trông giống nhau".<br>
Nhưng một số lập trình viên không thích điều đó. Một lý do là phải mất nhiều công sức hơn để setup và maintain các alignment (như bỗng dưng lại phải bỏ ra thêm công sức để refactor lại code, tiềm ẩn rủi ro cho các dòng code đã chạy ổn định :sweat_smile:).
Một lý do khác là nó tạo ra một "diff" khác lớn hơn khi thực hiện các thay đổi, một thay đổi tại một dòng có thể khiến năm dòng khác phải thay đổi theo (chủ yếu chỉ là chỉnh lại whitespace).<br>
Lời khuyên của chúng tôi là hãy thử nó. Theo kinh nghiệm của chúng tôi, nó không mất nhiều công sức như các lập trình viên lo sợ. Và nếu đúng (là mất công sức) như vậy, bạn chỉ cần đơn giản là dừng lại.
### Chọn một order có ý nghĩa và sử dụng nó một cách nhất quán
Có nhiều trường hợp mà thứ tự của code không làm ảnh hưởng đến tính chính xác. Ví dụ, năm định nghĩa biến này có thể được viết theo bất kỳ thứ tự nào:
```
// Extract POST parameters to local variables
details  = request.getParameter("details")
location = request.getParameter("location")
phone    = request.getParameter("phone")
email    = request.getParameter("email")
url      = request.getParameter("url")
```
Trong những tình huống như thế này, sẽ rất hữu ích nếu đặt chúng theo một thứ tự có ý nghĩa, không chỉ là random. Dưới đây là một số ý tưởng:

* Khớp thứ tự của các biến với thứ tự của các trường *<input>* trên form HTML tương ứng.
* Sắp xếp biến từ “quan trọng nhất” đến “ít quan trọng nhất.”
* Sắp xếp biến theo thứ tự bảng chữ cái.

Dù là thứ tự nào, bạn cũng nên sử dụng cùng một thứ tự trong suốt code của mình. Sẽ rất khó hiểu khi thay đổi thứ tự sau này:
```
UserInfo userInfo = new UserInfo(
    details,
    phone, // Ơ, cái 'location' bay đâu rồi??
    email,
    url,
    location // Tại sao cái 'location' lại ở đây nhể?
)
```
### Sắp xếp các khai báo thành các khối
Não bộ của chúng ta vốn tư duy theo nhóm và hệ thống phân cấp, vì vậy bạn có thể giúp người đọc nhanh chóng "nuốt" code của mình bằng cách tổ chức theo cách đó.<br>
Ví dụ, đây là một interface cho một frontend server, với toàn bộ khai báo method của nó:
```
public interface FrontendServer {
    void viewProfile(HttpRequest request);
    void openDatabase(String location, String user);
    void saveProfile(HttpRequest request);
    String extractQueryParam(HttpRequest request, String param);
    void replyOK(HttpRequest request, String html);
    void findFriends(HttpRequest request);
    void replyNotFound(HttpRequest request, String error);
    void closeDatabase(String location);
}
```
Code này không phải là tệ, nhưng cách bố trí chắc chắn không giúp người đọc "nuốt" được tất cả các method đó. Thay vì liệt kê tất cả các phương thức trong một khối khổng lồ, chúng nên được tổ chức hợp lý thành các nhóm, như thế này:
```
public interface FrontendServer {
    // Handlers
    void viewProfile(HttpRequest request);
    void saveProfile(HttpRequest request);
    void findFriends(HttpRequest request);
    
    // Request/Reply Utilities
    String extractQueryParam(HttpRequest request, String param);
    void replyOK(HttpRequest request, String html);
    void replyNotFound(HttpRequest request, String error);
    
    // Database Helpers
    void openDatabase(String location, String user);
    void closeDatabase(String location);
}
```
Phiên bản này dễ "nuốt" hơn nhiều. Nó cũng dễ đọc hơn, mặc dù có nhiều dòng code hơn. Lý do là bạn có thể nhanh chóng tìm ra những section chính và sau đó đọc detail của từng section khi cần thiết.
### Chia nhỏ code thành những "đoạn văn"
Văn bản (thuần túy) được chia thành các đoạn vì một số lý do:
* Đó là một cách để nhóm các idea tương tự lại với nhau và tách chúng ra khỏi các idea khác.
* Nó cung cấp một "bàn đạp" trực quan—không có nó, nó rất dễ bị mất vị trí trên trang.
* Nó giúp chuyển hướng từ đoạn này sang đoạn khác thuận tiện hơn.

Code cũng nên được chia thành các "đoạn văn" vì những lý do tương tự. Ví dụ, không ai thích đọc một một mảng code như thế này:
```
// Import the user's email contacts, and match them to users in our system.
// Then return a list of those users that he/she isn't already friends with.
private Set<Friends> getSuggestFriends(User user) {
    List<Friends> friends = user.getFriends();
    Set<String> friendEmails = friends.stream().map(Friends::getEmail).collect(Collectors.toSet());
    List<Contacts> contacts = user.getContacts();
    Set<String> contactsEmails = contacts.stream().map(Contacts::getEmail).collect(Collectors.toSet());
    Set<String> nonFriendEmails = getNonFriendEmails(friendEmails, contactsEmails);
    Set<Friends> suggestedFriends = getFriendsByEmail(nonFriendEmails);
    return suggestedFriends;
}
```
Đoạn code có thể trông không rõ ràng, nhưng bạn có thể thấy rõ ràng là function này trải qua một số bước khác biệt. Vì vậy, sẽ rất hữu ích khi chia các dòng code đó thành các đoạn:
```
private Set<Friends> getSuggestFriends(User user) {
    // Get the user's friends' email addresses.
    List<Friends> friends = user.getFriends();
    Set<String> friendEmails = friends.stream().map(Friends::getEmail).collect(Collectors.toSet());

    // Import all email addresses from this user's email account.
    List<Contacts> contacts = user.getContacts();
    Set<String> contactsEmails = contacts.stream().map(Contacts::getEmail).collect(Collectors.toSet());

    // Find matching users that they aren't already friends with.
    Set<String> nonFriendEmails = getNonFriendEmails(friendEmails, contactsEmails);
    Set<Friends> suggestedFriends = getFriendsByEmail(nonFriendEmails);

    return suggestedFriends;
}
```
Lưu ý rằng chúng tôi cũng đã thêm một comment tóm tắt cho mỗi đoạn code, điều này cũng giúp người đọc có thể đọc lướt nhanh qua code. (Đọc *Chương V, Biết phải comment những gì.*)<br>
Cũng như với văn bản, có thể có nhiều cách để chia nhỏ code, và các lập trình viên có thể thích (chia nhỏ) những đoạn code dài hơn hoặc ngắn hơn.
### Style cá nhân so với tính nhất quán
Có một số lựa chọn thẩm mỹ nhất định, chung quy là theo style cá nhân. Ví dụ, nơi dấu ngoặc mở cho định nghĩa một class sẽ như này:
```
class Logger {
    ...
}
```
hoặc
```
class Logger
{
    ...
}
```
Nếu style này được chọn thay vì style kia, thì nó cũng không ảnh hưởng đáng kể đến khả năng đọc của codebase. Nhưng nếu hai style này được trộn lẫn xuyên suốt code, nó sẽ ảnh hưởng đến khả năng đọc.<br>
Chúng tôi đã làm việc với nhiều dự án mà chúng tôi cảm thấy rằng team đã sử dụng style “sai”, nhưng chúng tôi vẫn follow theo các convention dự án, bởi vì chúng tôi biết rằng sự nhất quán là khá quan trọng.
> ##### KEY IDEA: 
> ##### ***Style nhất quán quan trọng hơn style “đúng”.***
<br><br>
![](https://images.viblo.asia/77102420-e9a4-4285-8c88-f1e5d35bb982.png)
### Tổng kết
Mọi người đều thích đọc code mà có tính thẩm mỹ. Bằng cách “định dạng” code của bạn một cách nhất quán và có ý nghĩa, code của bạn có thể được đọc dễ hơn và nhanh hơn.<br>
Dưới đây là những kỹ thuật cụ thể mà chúng ta đã thảo luận:
* Nếu có nhiều khối code đang làm những chức năng giống nhau, cố gắng làm cho chúng có "hình bóng" giống nhau.
* Sắp xếp các phần của code vào “column” có thể làm cho mã dễ đọc lướt qua.
* Nếu code đã nói A, B và C ở một nơi, thì đừng nói B, C và A ở một nơi khác. Chọn một trật tự có ý nghĩa và gắn bó với nó.
* Sử dụng các dòng trống để tách các khối lớn thành các "đoạn văn".
<br>
<br>
#### Kết (P7)
Chương IV đến đây là kết thúc, ở phần tiếp theo mình sẽ giới thiệu chương V của cuốn sách, hẹn gặp lại các bạn ở phần sau :)
<br> [Series Viết code "nghệ thuật"](https://viblo.asia/s/series-viet-code-nghe-thuat-o754jLL0ZM6)
<br> Tài liệu tham khảo: *The art of readable code by Dustin Boswell and Trevor Foucher*