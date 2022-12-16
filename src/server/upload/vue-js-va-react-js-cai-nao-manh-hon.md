![](https://images.viblo.asia/4f091624-d78c-4d8b-9934-83e8b74e6115.jpg)

Các Frontend dev đã sử dụng rất nhiều các tools, thảo luận về các tool này và tranh luận cái nào tốt nhất và dễ dàng phát triển nhất trong mọi cuộc chiến . Đó là lý do tại sao quyết định khôn ngoan nhất mà người ta có thể đưa ra là tự mình kiểm tra các Framwork js khác nhau và chọn cái gì là tốt nhất để hoàn thành các nhiệm vụ của mình. Đây là những gì lập trình viên làm khi họ muốn đánh giá một cái gì đó.

Cho đến ngày nay, có hai framework js phổ biến ( cùng với framework Node js ) được hầu hết các nhà phát triển đánh giá cao đó là React.js và Vue.js.  Nhưng cái nào thì tốt hơn? Nó phụ thuộc vào những nhiệm vụ bạn sẽ giải quyết. Hãy xem xét các mặt mạnh và yếu của mọi công cụ - nó có thể giúp bạn đưa ra lựa chọn đúng: **Vue** hoặc **React** .


# Vue.Js & React.Js - Mô tả chung và điểm tương đồng

Trước khi bạn tiến hành so sánh Vue.Js vs React , hãy đảm bảo rằng bạn hiểu rõ những công cụ này được sử dụng để làm gì và khả năng của chúng bao gồm những gì. Cả hai đều liên quan đến JavaScript libraries hoặc frameworks và cả hai đều được sử dụng trong thiết kế giao diện. Ngoài mục đích chung, hai frameworks còn có một số điểm chung khác:

* Cả Vue.Js và React.Js đều dựa trên mô hình Virtual DOM.
* Cấu trúc dựa trên thành phần và khả năng reactivity là các tính năng đặc biệt của cả hai công cụ.
* Chúng được thiết kế để làm việc với thư viện gốc, trong khi tất cả các tác vụ bổ sung được chuyển sang các thư viện khác.
* Đồng thời, có sự khác biệt nhất định giữa hai công cụ. Ví dụ, nhiều nhà phát triển đề cập đến cơ sở hạ tầng hỗ trợ rộng rãi và nhiều công cụ trực quan trong số những lợi ích của việc sử dụng React.Js . Ngoài ra, các nhà phát triển ứng dụng web nói rằng React Native dễ sử dụng hơn cho việc tạo ứng dụng.

Nếu chúng ta sử dụng một cụm từ cơ bản thì “Hello, world”, được tất cả các lập trình viên trên toàn thế giới sử dụng để kiểm tra ngôn ngữ lập trình, chúng ta sẽ thấy rằng code này ngắn hơn một chút và đơn giản với Vue.

### Hello World trong Vue:

```js
<!DOCTYPE html>
<html>
<head>
    <title>Vue Hello World</title>
    <script src="https://vuejs.org/js/vue.min.js"></script>
</head>
<body>
    <div id="app">
        {{ message }}
    </div>
     <script>
         new Vue({
              el: '#app',
              data: {
                  message: 'Hello from Vue'
                }
         });
         </script>
</body>
</html>
```

### Hello World trong React:

```js
<!DOCTYPE html>
<html>
    <head>
        <title>React Hello World</title>
        <script src="https://fb.me/react-15.0.0.js"></script>
        <script src="https://fb.me/react-dom-15.0.0.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
   </head>
   <body>
       <div id="greeting"></div>
       <script type="text/babel">
           var Greeting = React.createClass({
               render: function() {
                   return (
                      <p>Hello from React</p>
                   )
               }
           });
           ReactDOM.render(
                <Greeting/>,
                 document.getElementById('greeting')
           );
       </script>
   </body>
</html>
```

Nhưng nó không có nghĩa là khuôn khổ này là tốt hơn, không phải trong mọi trường hợp. Hãy xem xét các ưu điểm và nhược điểm của cả hai công cụ một cách chi tiết.

# Điểm mạnh và điểm yếu của Vue.Js và React.Js

Rất nhiều designer và dev app nhất trí nói rằng thích sử dụng Vue.Js trong các tình huống sau:

### Bạn tạo web apps với templates.

Trong Vue, một hành động bắt buộc là thêm các thuộc tính vào layout HTML. Nó giống như ràng buộc dữ liệu trong Angular. Một trong những ưu điểm của Vue.Js là quá trình tạo ứng dụng nhanh hơn và đơn giản hơn nhờ vào template Vue.js. Một ví dụ về các ứng dụng như vậy là một ứng dụng trong đó người ta có thể thay đổi tên của button được hiển thị bằng một click chuột.

Đối với React, nó không sử dụng các templates, vì vậy để thực hiện tác vụ này, người ta cần khởi chạy DOM trong JS. Nó sẽ mất nhiều thời gian và nỗ lực hơn. Nếu bạn sẽ làm việc với các templates, bạn cần biết HTML nâng cao. Nhưng một số hàm đơn giản có thể được viết bằng HTML và JS tiêu chuẩn.

### Bạn cần một cái gì đó đơn giản và hiệu quả

Bạn có thể tải lên một app được viết bằng Vue ngay từ trình duyệt của mình mà không cần dịch chuyển. Nhờ vậy, library Vue có thể được thêm vào mà không gặp vấn đề gì với toàn bộ dự án.
Thiết kế của Vue nói chung đơn giản hơn. Ví dụ, xử lý value trong Vue khác với xử lý value trong React. Do đó, React phân tích cả các hành động trước và hiện tại và sau đó thêm dữ liệu liên quan vào DOM dựa trên kết quả phân tích. Vì lý do này, bạn không thể thay đổi bất kỳ value trực tiếp.

Trong framework Vue, bạn có thể thay đổi value dễ dàng. Nó tự động thực hiện các thay đổi có liên quan trong DOM mỗi khi thay đổi value. Giải pháp này khá hiệu quả, nhưng nó có ít nhất một nhược điểm nếu so với React. Vue không thể theo dõi chỉnh sửa và xóa dữ liệu, đôi khi có thể là một vấn đề.

### Bạn cần một ứng dụng nhỏ nhưng nhanh chóng

Cơ chế hoạt động của cả hai framework là tương tự nhau: một DOM ảo được tạo và đồng bộ hóa với DOM thực. Khi giá trị trong DOM ảo được thay đổi, những thay đổi này sẽ tự động được chuyển sang DOM thực.

Quá trình này có thể được tối ưu hóa trong cả hai hệ thống. Nhưng trong Vue, nó hoạt động nhanh hơn, trong khi size của thư viện tự nó ít hơn - chỉ 25,6 kb. Tổng kích thước của React lớn gấp đôi - 37,4 kb DOM cộng với 11,4 kb của thư viện. Tuy nhiên, trong số các ưu điểm của React.JS là một loạt các tùy chọn API rộng hơn.

Là một khung lớn hơn, nặng hơn và phức tạp hơn, React.JS được khuyến nghị sử dụng trong các tình huống sau:

### Bạn muốn phát triển một ứng dụng lớn

Như chúng ta đã tìm thấy trước đây, nhiều dev thích Vue để tạo các app nhỏ. Nhưng React chắc chắn tốt hơn cho các app lớn hơn đang phát triển. 

Tại sao lại React.JS ? Nó có xu hướng linh hoạt hơn và điều chỉnh. Như chúng ta biết, Vue sử dụng các templates, giúp quá trình phát triển đơn giản và nhanh hơn. 

Nhưng khi một ứng dụng lớn, những lợi ích này có xu hướng biến thành nhược điểm. Việc sử dụng các templates thường làm cho việc tái cấu trúc một app là không thể hoặc quá phức tạp. 

Code của React với các templates JS có thể tái sử dụng và khi bạn tạo ứng dụng React , bạn có thể dễ dàng cấu trúc lại nó trong tương lai.

### Bạn muốn phát triển cả apps web và mobile apps

React cung cấp thư viện React Native, có thể được sử dụng để phát triển các ứng dụng di động trong JS. Nó trông rất giống với React.JS, vì vậy nếu bạn biết cách sử dụng React, bạn sẽ nhanh chóng hiểu cách sử dụng nó. 

React Native cho phép tạo một ứng dụng di động hoạt động mà không cần bất kỳ kiến thức và kỹ năng chuyên môn nào.

### Bạn muốn có một technical hỗ trợ tốt và 1 loạt các giải pháp có sẵn

Mặc dù cả Vue và React đều là các frameworks phổ biến, mức độ phổ biến của phần sau lớn hơn vô cùng - 2,5 triệu lượt tải xuống so với 225 nghìn của Vue mỗi tháng.

Nó có ý nghĩa gì trong thực tế? framework được thảo luận rộng rãi trên các forums và trên phương tiện truyền thông xã hội. Bạn sẽ tìm thấy một loạt các hướng dẫn và giải pháp có sẵn, manuals và guides. 

Cuối cùng, React được tạo bởi một nhóm các dev chuyên nghiệp từ Facebook, điều đó có nghĩa là bạn sẽ nhận được sự support tuyệt vời nếu bạn có bất kỳ câu hỏi nào.

![](https://images.viblo.asia/40dceb27-17da-47b1-bfcd-6004840c9d53.png)

# Điểm mấu chốt

Vue.JS và React.JS là hai công cụ phổ biến dành cho các dev có nhiều điểm chung. Chúng tương đối nhẹ, nhanh và linh hoạt. Cả hai đều sử dụng DOM ảo và nhanh chóng đồng bộ hóa nó với DOM thực. Tuy nhiên, có một số khác biệt tinh tế giữa các frameworks.

### Vue có những ưu điểm sau so với React:

* Nó nhỏ hơn và nhanh hơn;
* Templates thuận tiện đơn giản hóa quá trình phát triển;
* Nó đơn giản hơn về mặt cú pháp.

### React có những ưu điểm sau so với Vue:

* Cho phép linh hoạt hơn trong các ứng dụng lớn đang phát triển.
* Dễ kiểm tra hơn.
* Thích hợp cho việc tạo mobile apps.
* Thêm thông tin và giải pháp có sẵn.

Nhưng dù sao, cách tốt nhất để chọn tool tốt nhất để giải quyết các vấn đề cụ thể là kiểm tra các options khác nhau. Vì vậy, hãy thử cả hai để đưa ra lựa chọn. :D