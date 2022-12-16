Trong thời gian gần đây, công đồng lập trình web thường nhắc đến một framework có tên Vue.js cũng như bàn luận rất nhiều về các ưu điểm của nó khi so sánh với các framework đã có mặt từ rất lâu như  React (được hỗ trợ bởi Facebook), Angular (được hỗ trợ bởi Google)... Vậy Vue.js là gì? tại sao nó phát triển một cách mạnh mẽ như vậy, câu trả lời có trong phần tiếp theo.

## Vue.js là gì?
Vue (phiên âm /vjuː/, đọc giống như từ view) là một framework Javascript tiên tiến trong xây dựng giao diện người dùng, không giống như các framework khác, Vue được xây dựng từ những dòng code cơ bản nhất nhằm tối ưu tốc độ. Thư viện của Vue chỉ tập trung vào lớp hiển thị, rất đơn giản để tiếp cận và dễ dàng tích hợp vào các hệ thống khác. Vue cũng có khả năng cung cấp các ứng dụng web đơn trang Single Page Application (SPA) cho phép kết hợp với nhiều các công cụ hiện đại, như Laravel chẳng hạn.

Vue.js được sử dụng để xây dựng giao diện người dùng giống như React (sử dụng bởi Facebook), Angular (được hậu thuẫn bởi Google), Ember… Tuy nhiên, Vue.js có tốc độ tạo trang (render) rất nhanh và chiếm khá ít bộ nhớ. Chúng ta có thể xem bảng benchmark các framework Javascript nổi tiếng nhất hiện nay, Vue có một thứ hạng không tồi chút nào.

![](https://images.viblo.asia/c1067102-0be8-4609-9b9a-59a854de24de.png)
Vue.js mới chỉ ra mắt năm 2015, nhưng Vue.js đã sớm khẳng định mình và sớm trở thành người thay thế Angular và React, đây cũng chính là lý do Laravel giới thiệu Vue.js trong thiết lập mặc định.

## Mô hình MVVM
MVVM là viết tắt của Model-View-ViewModel là một mô hình được áp dụng trong framework Vue.js.
![](https://images.viblo.asia/852c3bf1-2600-4965-b827-02f2fbcf3966.jpg)
Trong mô hình này, dữ liệu mỗi khi được "gán" vào View hoặc Model sẽ đều được Vue.js tự động gắn cho phần còn lại. Tức là khi dữ liệu thay đổi ở Model nó sẽ tự động được "cập nhật" sang View và khi người dùng thay đổi dữ liệu trên View (ví dụ nhập liệu vào ô địa chỉ email chẳng hạn) thì dữ liệu cũng được tự động cập nhật ngược lại Model. Trong cộng đồng Vue.js thường gọi mô hình này với một thuật ngữ khác là two-way data binding, tạm gọi là gán dữ liệu hai chiều. Chúng ta sẽ cùng tìm hiểu mô hình này trong ví dụ đầu tiên sử dụng Vue.js ở phần tiếp theo.
## Ví dụ đầu tiên sử dụng framework Vue.js
```
<!DOCTYPE html>
<html>
<head>
    <title>Ví dụ đầu tiên Vue.js - allaravel.com</title>
</head>
<body>
    <div id="app">
        <h1>{{ message }}</h1>
        <input v-model="message">
    </div>
    <script src="https://vuejs.org/js/vue.min.js"></script>
    <script type="text/javascript">
        new Vue({
            el: '#app',
            data: {
                message: 'Xin chào, tôi là Vue.js'
            }
        })
    </script>
</body>
</html>
```
Bạn tới trang này để xem kết quả [jsFiddle](https://jsfiddle.net/allaravel/mkLv5v5z/2/)

Ngay từ đầu, đối tượng **message** trong Model có giá trị “**Xin chào, tôi là Vue.js**” ngay lập tức giá trị của nó được hiển thị lên thẻ **<h1>** trên View thông qua cú pháp **{{ message }}**. 
    
Ô nhập liệu **<input>** cũng được gán với đối tượng **message**, do vậy ngay khi thay đổi giá trị trong thẻ **<input>** này, DOM Listener sẽ cập nhật giá trị đối tượng **message** ngược lại Model, và cũng ngay lập tức giá trị của đối tượng **message** cũng được cập nhật đến các View có tham chiếu đến **message**, mà ở đây là thẻ **<h1>**.

Ví dụ đầu tiên này đã phần nào giúp bạn hiểu được mô hình ***MVVM*** hay thuật ngữ gán dữ liệu hai chiều (two-way data binding). Tạm khép lại việc viết code trong Vue.js trong bài viết này.
    
## Kiến thức cần thiết cho Vue.js
Sử dụng Vue.js nói riêng hay phát triển các ứng dụng web nói chung đòi hỏi khá nhiều các kiến thức cơ bản khác nhau, dưới đây là các kiến thức bạn **nên** có khi làm việc với Vue.js. Có thể có một số kiến thức không liên quan trực tiếp nhưng trong khuôn khổ loạt bài viết về Vue.js của Allaravel, bạn nên tìm hiểu:


| Kiến thức | Mô tả | Mức độ quan trọng | Độ khó |
| -------- | -------- | -------- |  --------
| HTML     | Ngôn ngữ này là nền tảng khi thiết kế web     | 6     | 5
| CSS     | Ngôn ngữ này giúp cho website của bạn đẹp hơn, đặc biệt khi hiện nay website cần thiết kế cuốn hút.     | 6     | 6    
| JavaScript     | Ngôn ngữ này giúp cho người dùng tương tác với website thuận tiện hơn     | 9    | 8
| PHP     | Giúp các website có nội dung liên tục thay đổi theo dữ liệu nằm trong Cơ sở dữ liệu.     | 7     | 8
| Fw Laravel     | Với framework này, việc phát triển một ứng dụng bằng PHP trở lên thật đơn giản     | 7     | 7

Nói chung nếu bạn xác định trở thành một lập trình viên web thì tất cả những kiến thức ở trên là cần thiết, "không bổ dọc thì bổ ngang". :smiley::smiley:
    
## So sánh Vue.js với jQuery
jQuery là một thư viện JavaScript có thể chạy trên nhiều trình duyệt được thiết kế để đơn giản hóa các kịch bản HTML phía máy khách, nó hoàn toàn miễn phí và là phần mềm mã nguồn mở. jQuery được giới thiệu lần đầu tiên vào năm 2006 bởi John Resig, hiện nay jQuery là thư viện JavaScript phổ biến nhất, nó có mặt ở hơn 60% trong 100 nghìn website có thứ hạng đầu tiên. Cú pháp jQuery được thiết kế để dễ dàng "duyệt" qua tài liệu, lựa chọn các thành phần DOM, tạo các hiệu ứng hoạt họa, quản lý sự kiện và phát triển các ứng dụng Ajax. Đa số các lập trình viên web đều biết đến jQuery, như vậy bạn có thể tưởng tượng ra độ phổ biến cũng như hữu ích của jQuery. Tuy nhiên, khi các ứng dụng web ngày càng phát triển với độ phức tạp cao ví dụ như ứng dụng mạng xã hội Facebook, ứng dụng Gmail... các ứng dụng dạng đơn trang SPA, việc sử dụng jQuery khiến mã nguồn không thể kiểm soát được. Vue.js là một sự lựa chọn tiếp theo mà sau loạt bài giới thiệu về Vue.js này, bạn sẽ phải thốt lên "Thật kỳ diệu, thật tuyệt vời".
    
Chúng ta hãy thử viết ví dụ Hello world của Vue.js bằng jQuery xem thế nào và cùng phân tích nhé:
    
```
<!DOCTYPE html>
<html>
<head>
    <title>Ví dụ đầu tiên Vue.js chuyển đổi sang jQuery- allaravel.com</title>
</head>
<body>
    <h1>Xin chào, tôi là Vue.js</h1>
    <input type="text" value="Xin chào, tôi là Vue.js">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $("input").on("change blur keyup mouseup", function() {
                $("h1").text(($(this).val())); 
            });
        });
    </script>
</body>
</html>
```
Bạn xem ở đây [jsFiddle](https://jsfiddle.net/allaravel/ry79ong1/2/)    
    
Khi bạn trải nghiệm sẽ thấy giống với ví dụ đầu tiên sử dụng Vue.js, tuy nhiên cảm nhận có độ lag chút xíu hơn so với Vue.js tuy nhiên không phải vấn đề lớn. Vậy tại sao phải thay thế jQuery bởi Vue.js.

Chúng ta cùng xem xét vấn đề sau nhé. Giả sử bạn muốn cập nhật giá trị của ô nhập liệu **<input>** đến 100 thẻ **<h1>** khi đó bạn cần phải gán giá trị của 100 thẻ <h1> đó trong sự kiện thay đổi nội dung của <input> nếu sử dụng jQuery, với Vue.js bạn chẳng cần làm gì cả, 100 chứ 1000 thẻ <h1> cũng vậy, thay đổi dữ liệu ở Model tự động nó gán sang View.
    
Trên đây mới chỉ là vấn đề về số lượng, hãy xem tiếp logic sau, giả sử có hàng trăm thẻ **<input>** cùng thay đổi giá trị message và hiển thị lên hàng trăm thẻ **<h1>**, với jQuery khi viết code thật sự các sự kiện sẽ chồng lấn nhau và rất có khả năng dẫn đến treo cứng, giống như vài năm trước Facebook cũng đã từng không kiểm soát nổi trạng thái chồng chéo giữa các thành phần và cuối cùng phải sử dụng đến mô hình MVVM để giải quyết vấn đề này
    
## So sánh Vue.js với các framework cùng dạng
Hiện nay có rất nhiều các framework Javascript mạnh mẽ, kể đến có React (hậu thuẫn bởi Facebook), Angular (hậu thuẫn bởi Google), Ember, Riot, Polymer... tuy nhiên Vue.js đang là sự lựa chọn lý tưởng cho các ứng dụng web ở mức to vừa. Có mấy lý do như sau:

* Hiệu năng Vue.js là thực sự đáng nể so với các đối thủ khác.
* Vue.js có dung lượng tải cực bé do đã tách một số phần ra khỏi core như Vuex, vue-router... nó giúp cải thiện tốc độ tải của toàn trang.
* Một lý do mà nhiều người tìm đến với Vue.js là tính đơn giản, dễ học, dễ áp dụng đặc biệt cho những người chưa có nhiều kiến thức nền.
* Vue.js luôn học hỏi và tích hợp những gì tốt nhất từ các framework khác, nó cũng giống như framework Laravel nổi tiếng, luôn thay đổi và luôn tốt hơn.
    
Vue.js cũng có những yếu điểm, thứ nhất đội ngũ phát triển có hạn nên không thể có những tính năng để phát triển các hệ thống cực lớn, đấy là mình nghe đồn vậy chứ thực tế chưa kinh qua dự án nào mà không dùng được Vue.js. Thứ hai, Vue.js do Evan You, một người Mỹ gốc Trung Quốc phát triển đầu tiên, có một số bạn không thích nhưng mình thấy Trung Quốc mấy năm gần đây phát triển CNTT cực mạnh và chúng ta nên học tập họ.
    
## Kết luận
Có rất nhiều thông tin được đề cập nhưng trong phần này bạn chỉ cần quan tâm đến mô hình MVVM hay gán dữ liệu hai chiều được sử dụng trong Vue.js. Bạn cũng yên tâm đây Vue.js rất dễ tìm hiểu, mình sẽ cố gắng sắp xếp kiến thức logic nhất, bên cạnh đó trong các phần tiếp theo, với mỗi bài viết sẽ có một vài bài tập nhỏ cho các bạn để vận dụng kiến thức được nhớ lâu hơn.
    
Cảm ơn các bạn đã đọc bài viết của mình:grinning: