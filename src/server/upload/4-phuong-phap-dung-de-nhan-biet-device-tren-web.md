Đôi khi trên Web Site bạn không được phép làm công việc nhận định xem user đang access bằng device nào.
Tuy nhiên việc nhận định loại device lại là 1 nhân tố quan trọng giúp bạn tạo ra một page được tối ưu nhất về mặt hiển thị tùy thuộc theo từng loại device

Dưới đây sẽ đưa ra 4 cách để giúp bạn nhận định được loại device. 
Việc nhận định device ở đây không chi tiết, cụ thể đến mức độ nhận định loại máy, mà chỉ ngừng lại ở mức độ phán đoán xem là smart phone hay PC, là Android hay IOS.


### 1.User Agent

Trên browser sẽ luôn có thông tin thể hiện việc bạn là ai. Và thông tin này có thể get kể cả ở phía client hay server.
Bạn có thể get bằng cách dưới đây:

```
//Server(php)
$userAgent = $_SERVER['HTTP_USER_AGENT'];
//Client(javascript)
var userAgent = navigator.userAgent;
```

Bạn có thể get được loại browser, OS, tên thiết bị. Do đó, đây là thông tin rất hữu ích.
Tuy nhiên, thông tin User Agent này có thể bị giả mạo một cách tùy ý khi browser gửi lên server.
Ví dụ, mặc dù bạn đang access từ một chiếc PC nhưng bạn hoàn toàn có thể fake thông tin User Agent như thể bạn đã access từ một chiếc IPhone.
Do đó, thông tin User Agent get từ server hoàn toàn không thể đảm bảo được độ tin cậy.
Mặt khác, thông tin User Agent get từ phía client lại khó bị giả mạo hơn nên có thể nói nó có độ tin cậy cao hơn.

Nếu bạn muốn thực hiện việc nhận định device với độ tin cậy cao thì nên get thông tin ở phía client.

Tuy nhiên, cách này có 1 điểm khá phiền phức đó là: bạn không thể chỉ nhận định loại device chỉ đơn giản bằng cách tìm xem từ khóa của bạn có trong thông tin User Agent đó ko bằng chuỗi Regex được (ví dụ, không thể chỉ đơn giản check xem có từ Android trong thông tin User Agent hay không)
Mà bạn cần phải biết trước trên device đó sẽ get được thông tin User Agent như thế nào.

Ngoài ra, có trường hợp khi đặc tính device thay đổi thì thông tin User Agent kèm theo cũng thay đổi. Do đó, khi đặc tính thay đổi thì nhiều khi sẽ dẫn đến việc quy trình nhận định device cũng thay đổi.

Đối với smart phone có nhiều loại User Agent thì nên tham khảo Home page để biết chính xác loại máy nào sẽ có thông tin User Agent như thế nào.


### 2.Độ lớn của màn hình

Đây là một thông số vật lý, có vai trò rất quan trọng trong việc nhận định device.
Từ độ lớn màn hình ta có thể phân chia loại device tùy theo độ lớn màn hình được đánh giá theo đơn vị inch: smart phone (4 ~ 7 inch), tablet (khoảng 10 inch), PC (khoảng trên 13 inch)
Thông tin này không hẳn là không giả mạo được, tuy nhiên so với việc giả mạo thông tin User Agent thì việc giả mạo thông tin độ lớn màn hình thấp hơn nhiều.

Thông tin này cơ bản được get từ phía client. Vì browser không thể gửi thông tin độ lớn màn hình lên server được nên chắc chắn không thể get từ server được.

### 3.Loại OS

Chúng ta có thể get được thông tin OS mà browser đang chạy bằng JavaScript

```
//Client side(javascript)
var os = navigator.platform;
```

Vì browser không gửi thông tin OS lên server nên cơ bản là chúng ta sẽ không get được thông tin OS của client từ server
Thông tin này khó bị giả mạo nên độ tin cậy của nó khá cao.
Giả sử chúng ta giả mạo User Agent trên window khiến người xem hiểu nhầm loại device là một thiết bị iOS, nhưng khi thực hiện get thông tin OS với câu lệnh `navigator.platform` thì kết quả nhận được vẫn sẽ là “win64”.

Do đó, với thông tin này chúng ta có thể nhận được “liệu thông tin User Agent có đang bị giả mạo hay không?”.

### 4.Chức năng support

Những browser khác nhau sẽ có sự khác biệt ở các chức năng mà nó support. Đặc biệt, đối với chức năng mới thì việc coding sẽ còn nhiều thiếu sót tùy theo browser. Nếu chúng ta nắm bắt và biết được điều đó thì nó sẽ trở thành căn cứ giúp chúng ta nhận định loại device.

Tuy nhiên, trên những browser không support vẫn có thể escape chức năng không support hoặc thực hiện phân nhánh chuyên sâu hơn bằng cách kết hợp với những thông tin khác.
Ví dụ như, chúng ta có thể xác nhận tình trạng coding tại mục “IcantUser” để nhận định property, method được sử dụng trong biểu thức điều kiện

Tuy nhiên cách này không được khuyến khích sử dụng do tính chất của nó là “nếu browser thay đổi thì thông tin này cũng không thể sử dụng cho việc nhận định loại device được nữa.

### Tóm lại
Cách có độ tin cậy cao nhất, đơn giản nhất để nhận định loại device là dựa trên thông tin User Agent, độ lớn màn hình đã get từ client theo chuẩn OS đã get ở server side.
Tuy nhiên nếu có phương pháp để giả mạo nội dung của obejct navigator thì phương pháp này không thể tin cậy được nữa.

Có điều việc giả mạo thông tin này lại vô cùng khó khăn, đồng thời cũng không có lợi ích gì, vì thế cho đến nay ít trường hợp xảy ra về việc giả mạo thông tin này.

Do đó, về độ tin cậy thì chúng ta có thể tin tưởng và sử dụng các phương pháp trên để nhận định được loại device với độ chính xác cao.