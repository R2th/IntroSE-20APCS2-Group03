**Javascript, trên thực tế mang lại cho lập trình viên rất nhiều những hiểu lầm, mặc dù tâm ảnh hưởng của loại ngôn ngữ này rất rộng và được áp dụng rộng rãi ở hầu hết các website. Không nói đến việc mọi người cho rằng Javascript có liên quan đến Java, hay người dùng có thể thực hiện kiểm soát truy cập mà không có các lớp hay không,  còn rất nhiều quan niệm sai lầm về Javascript, một trong những ngôn ngữ lập trình thông dụng nhất thế giới**


-----

Một trong những đặc trưng lớn nhất của Javascript cũng là điểm yếu của ngôn ngữ này: Javascript là một ngôn ngữ dễ để áp dụng. Khi bạn áp dụng thực tế đó vào nhu cầu sử dụng Javascript, bạn sẽ trở thành 1 lập trình viên hoặc 1 designer sử dụng 1 ngôn ngữ mà không có sự hiểu biết đầy đủ và đúng đắn. Dần dần, hầu hết người mới sẽ ngộ ra rằng "À, đây không phải là Java" và Javascript cũng không phải một ngôn ngữ "đồ chơi", nhưng trong bài viết này, tôi sẽ trình bày 5 quan niệm sai lầm lớn hơn. Có những quan niệm mặc dù là hiển nhiên, nhưng vẫn cần được lưu tâm, đặc biệt là đối với những người mới.

# Cho rằng tất cả người dùng đều bật Javascript
Khi mà bạn mới bắt đầu tập tọe với việc lập trình web, có một xu hướng giả định rằng tất cả mọi người đều lướt web giống cách mà bạn làm: với cùng 1 trình duyệt web, một chiếc màn hình độ phân giải cao và một đường truyền mạng ổn định. Tất nhiên là không phải như vậy rồi. Đặc biệt, có 1 bộ phận lớn người dùng không sử dụng chung trình duyệt với bạn, và có 1 bộ phận nhỏ trong không thể chạy Javascript trên trình duyệt. Một trong những lí do có thể là:

- Họ đang sử dụng 1 thiết bị không hỗ trợ Javascript
- Họ chủ động tắt Javascript trên trình duyệt
- Họ sử dụng các tiện ích chặn Javascript (ví dụ như NoScript trên Firefox)

Dù lý do là gì đi chăng nữa, lập trình viên cũng nên lường trước được trường hợp này khi phát triển 1 trang web. Điều này có nghĩa là bạn cần phải tuân thủ tăng cường tiến độ: trước hết xây dựng 1 chức năng tối thiểu, và sau đó nâng cao chức năng bằng Javascript. Trong 1 vài trường hợp hiếm hoi mà trang web yêu cầu bắt buộc phải có Javascript, hãy thông báo 1 cách rõ ràng cho người dùng biết rằng để thực thi tác vụ này thì Javascript là bắt buộc.

# Cho rằng Javascript sẽ tăng cường bảo mật cho website
Có cơ số lập trình viên nhầm lẫn cho rằng Javascript có thể tăng cường tính bảo mật của trang web. Ở đây chúng ta sẽ xét về phía phương diện client-side. Trên thực tế client-side Javascript không thể được sử dụng như 1 công cụ bảo mật vì 1 lí do đơn giản: Javascript có thể bị vô hiệu hóa. Nếu trang web của bạn sử dụng Javascript vì mục đích bảo mật, chẳng hạn như xác thực 1 biểu mẫu, thì tất cả những gì tin tặc phải làm đơn giản chỉ là vô hiệu hóa Javascript để phá vỡ bảo mật. Việc xác thực biểu mẫu bằng Javascript sẽ mang lại sự tiện lợi cho người dùng, nhưng các biện pháp bảo mật bên phía server luôn thật sự cần thiết.

# Sử dụng các framework (ví dụ như Jquery) mà không cần hiểu về Javascript
Sự phát triển của framework ngày nay đã góp phần củng cố vị thế của Javascript. Với jquery, các lập trình viên có thể tạo ra các đoạn code cross-browser đáng tin cậy đã phần này dẫn đến 1 quan niệm sai lầm rằng họ có thể làm việc với framework này mà không cần hiểu thực sự về Javascript. Không may, điều này có thể là tiền đề của nhiều ứng dụng web hoạt động kém hiệu quả và thiếu bảo mật.

Framework là một công cụ để đẩy nhanh việc phát triển phần mềm. Nhưng framework không phải là 1 sự thay thế hoàn toàn cho 1 ngôn ngữ chính thống. Trên thực tế, thiếu hiểu biết về nền tảng của ngôn ngữ và quá trình phát triển, việc sử dụng framework sẽ khó khăn hơn rất nhiều, và điều này trái ngược hoàn toàn với mục đích ban đầu của framework.

# Cho rằng việc viết code Javascript đa trình duyệt là khó
Khoảng 15 năm trước, số lượng trình duyệt web chưa nhiều với số lượng phiên bản kém đa dạng, nên sẽ dễ dàng hơn cho lập trình viên nắm bắt khả năng của các trình duyệt về mặt tính năng hoặc bugs. Vì nhiều lí do, các lập trình viên hình thành thói quen viết code hướng đến 1 trình duyệt nhất định. Điều này liên quan đến một cách tiếp cận được gọi là *browser detection* hoặc *browser sniffing* (nhận biết trình duyệt):
```javascript
if (navigator.appName == 'Netscape' { // It's Netscape!
    if (parseInt(navigator.appVersion) >= 4) { // At least version 4!
    } 
    else { // It's an earlier version. Bah!
    }
} 
else { // Let's assume it's IE?
}
```
Vào thời điểm đó, điều này có thể là 1 ý tưởng hay ho, nhưng với mỗi phiên bản nâng cấp của trình duyệt, code có thể sinh lỗi hoặc trở nên vô dụng. Khi các trình duyệt mới được phát triển, chúng có thể không tương thích với các đoạn mã trên, mặc dù các trình duyệt mới có thể sẽ thực thi các mục đích của đoạn mã đó tốt hơn (nếu có thể thực thi).

Cho đến nay, các trình duyệt thường được sử dụng bao gồm Chrome, Firefox, Internet Explorer, Opera và Safari. Danh sách này không để cập đến các trình duyệt ít phổ biến hoặc các trình duyệt được tích hợp vào các thiết bị không thông dụng, chẳng hạn như trình đọc điện tử, điện thoại di động hay các hệ thống gaming. Hơn nữa, các trình duyệt này đi kèm với rất nhiếu phiên bản. Nói riêng IE đã tồn tại các phiên bản 6, 7, 8 và 9. Điều này có thể khiến các nhà phát triển nảy sinh suy nghĩ viết code để tương thích với hầu hết các trình duyệt với ngần đó phiên bản sẽ rất khó khăn, nếu không muốn nói là không thể. Sự thật là việc viết code trở nên dễ dàng hơn bao giờ hết nhờ vào một sự thay đổi rõ ràng và tài tình được gọi là: *object detection* (nhận biết đối tượng).

Để lấy ví dụ, chúng ta xét phương thức ```trim()``` của đối tượng String, được thêm vào trong **ECMAScript 5**. Nhiều trình duyệt hiện đại hỗ trợ phương thức này , tuy nhiên IE thì không (hoặc đã từng không hỗ trợ). Thay vì kiểm tra tên trình duyệt để biết liệu phương thức này có thể sử dụng được không thì chỉ cần kiểm tra xem phương thức đó liệu có tồn tại hay không:
```javascript
if (typeof someStr.trim == 'function') { // Safe to use!
```
Đó là tất cả những gì cần làm. Nếu thuộc tính được đề cập là phương thức, nó có thể sử dụng, như 1 phương thức. Cách tiếp cận này đơn giản, an toàn và hoàn toàn đáng tin cậy. 

# Không biết rằng bạn có thể tự tạo các object tùy chỉnh trong Javascript
Javascript là một ngôn ngữ lập trình hướng đối tượng , điều đặc biệt ở đây là nó prototype-based chứ không phải class-based. Điều này nghĩa là mọi biến mà bạn tạo ra dựa trên một nguyên mẫu đối tượng chứ không phải được định nghĩa theo class. Điều này cũng có nghĩa là bạn không thể định nghĩa các lớp của riêng bạn làm cơ sở cho 1 biến. Do đó, nhiều người mới làm quen với ngôn ngữ cho rằng họ không thể tự tạo 1 object trong Javascript, và đây là 1 sai lầm. Trên thực tế điều này hoàn toàn có thể, và có nhiều cách tiếp cận:

Để khởi tạo 1 object đơn, chỉ cần định nghĩa 1 đối tượng chung với các thuộc tính và phương thức đi kèm:
```javascript
var me = {
    firstName: 'Larry',
    age: 54,
    doSomething: function() {
        // Method code.
    }
};
```

Trong nhiều trường hợp, giải pháp này là tốt, nhưng nó không cho phép bạn tạo nhiều phiên bản của cùng 1 kiểu đối tượng. Để làm điều đó, bạn phải sử dụng hàm khởi tạo. Hàm khởi tạo được định nghĩa như bất kì hàm nào khác trong Javascript nhưng với 2 ngoại lệ:
- Thông thường, hàm khởi tạo bắt đầu bằng 1 chữ cái in hoa
- Hàm không nên có câu lệnh return

Hàm khởi tạo thường có một số đối số có giá trị để phân biệt một thể hiện với một thể hiện khác. Trong định nghĩa hàm, từ khóa này được sử dụng để lưu trữ các giá trị đó trong các biến của cá thể hiện tại:
```javascript
function Person(firstName, age) {
    this.firstName = firstName;
    this.age = age;
    doSomething: function() {
        // Method code.
    }
}
```
Và để tạo object ta sử dụng toán tử ```new``` trước khi gọi hàm:
```javascript
var me = new Person('Larry', 54);
```
Bây giờ chúng ta có biến ```me``` là 1 object thuộc kiểu ```Person```. Chúng ta tạo thêm 1 biến nữa thuộc kiểu này:
```javascript
var you = new Person('Samantha', 45);
```
Chúng ta có thể dùng các biến này tùy thích, truy cập vào các thuộc tính và phương thức của chúng:
```javascript
me.firstName; // Larry
you.age; // 45
```

# Kết luận
Mặc dù JavaScript là một trong những ngôn ngữ lập trình được sử dụng rộng rãi và quan trọng nhất, có nhiều quan niệm sai lầm về nó. Tất nhiên thì ngôn ngữ nào cũng có những quan niệm sai lầm và sự lạm dụng, đặc biệt là với người mới, nhưng nói riêng Javascript thì khả năng truy cập của ngôn ngữ này là yếu tố gia tăng vấn đề. Tôi hy vọng rằng bài viết này đã giúp bạn loại bỏ được một quan niệm sai lầm hoặc có thể là hai. Nếu có thì đừng xấu hổ, bởi *không bao giờ là quá muộn để học*!


-----
*Bài viết được tham khảo tại: http://www.peachpit.com/articles/article.aspx?p=1843879*