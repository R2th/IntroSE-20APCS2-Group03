1. Giới thiệu
2. Khi nào nên sử dụng handlebars js và tại sao nên sử dụng nó
3. Handlebars js hoạt động như thế nào
4. Kết luận

# 1. Giới thiệu ?
-  Handlebars.js là một công cụ phía máy khách (mặc dù nó cũng có thể được sử dụng trên máy chủ) công cụ tạo khuôn template cho JavaScript
-  Handlebars.js được viết bằng JavaScript, Handlebars.js là trình biên dịch nhận bất kỳ biểu thức HTML và biên dịch chúng thành hàm JavaScript,  Hàm JavaScript này nhận một tham số, một đối tượng, dữ liệu của bạn, và nó trả về một chuỗi có các giá trị HTML và thuộc tính của đối tượng được chèn vào HTML.
# 2. Khi nên sử dụng handlebars.js và tại sao nên sử dụng nó ?
### *Khi nào nên sử dụng công cụ tạo template JavaScript?*
Chúng ta nên sử dụng một JavaScript templating engine handlebars.js khi: 
* Bạn sử dụng một javascript front-end framework như: backbone.js, ember.js, jquery,.... Hầu hết các framework javascript đều  dựa vào templating egines
* View trong ứng dụng của bạn sẽ được cập nhật thường xuyên, đặc biệt là kết quả của các thay đổi đối với dữ liệu từ server thông qua API REST hoặc từ dữ liệu trên máy khách
* Ứng dụng của bạn có nhiều tương tác
* Bạn đang phát triển một ứng dụng web có nhiều lượt truy cập
* Bạn muốn quản lý dễ dạng nội dung của mình
### *Tại sao nên sử dụng handlebars.js*
* Nó là một trong những templateing engines được sử dụng phổ biến nhất
* Nó là một phần mở rộng của ngôn ngữ Mustache Javascript templating, nó thay thế Mustache.js
*Những lý do bạn nên sử dụng Handlerbars.js như sau:*
    - Handlebars là một trong những công cụ tiên tiến nhất, giàu tính năng và phổ biến trong tất cả  Javascript templating engines.
    - Handlebars là templating engine không có logic, có nghĩa là có rất ít hoặc không có logic trong các template HTML mà bạn sử dụng.
    - Nó giữ cho các trang HTML của bạn đơn giản, sạch sẽ và sẽ tách biệt khỏi các tệp javascript dựa trên logic và handlebars phục vụ tốt mục đích này
Tóm lại, học Handlebars.js ngây từ bây giờ là một sự đầu tư và là một sự lựa chọn sáng suốt giúp bạn lập trình hiệu quả hơn bây giờ và bạn sẽ dễ dàng thích nghe với các JS frameworks
# 3. Handlebars hoạt động như thế nào ?
Như đã nói trong phần giới thiệu: Handlebars.js là trình biên dịch được xây dựng bằng javascript, lấy bất kỳ biểu thức HTML và handlebars nào và biên dịch chúng thành hàm javascript. Hàm javascript này sau đó nhận một tham số, một đối tượng, dữ liệu của bạn và nó trả về một chuỗi HTML với các giá trị của thuộc tính đối tượng được chèn vào HTML. 

**3 Bộ phận chính của Handlebars templating:**

***Biểu thức của Handbars.js:***

Một biểu thức handlebars đơn giản được viết như thế này (trong đó, nội dụng của content có thể là một biến hoặc một hàm trợ giúp với các thông số hoặc không có tham số)

```{{ content }}```

hoặc như thế này nếu biểu thức nằm trong khối:
```
 {{#each}} 
    HTML content and other Handlebars expresion go here.
 {{/each}}
```
Với biểu thức handlebars HTML. Biến customerName là thuộc tính sẽ được truy xuất bởi hàm handlebars.compile:
```
 Name: {{ customerName }} 
```
Dưới đây là ví dụ về một thẻ script Handlebars:
```
<div> Name: {{ headerTitle }} </div>
```

***Biểu thức của Handbars.js:***

Phần chính thứ 2 trong Handlebars templating là dữ liệu bạn muốn  hiển thị trên trang.Bạn chuyển một dữ liệu đối tượng tới hàm handlebars, đối tượng dữ liệu được gọi là bối cảnh. Và đối tượng này có thể bao gồm tất cả các mảng, chuỗi, số, các đối tượng khác hoặc kết hợp tất cả đối tượng này
Nếu đối tượng dữ liệu có một mảng các đối tượng, bạn có thể sử dụng hàm Handlebars mỗi vòng lặp để lặp lại mảng và bối cảnh hiện tại được đặt cho từng mục trong mảng
Dưới đây là các ví dụ về việc thiết lập đối tượng dữ liệu và cách lặp nó trong handlebars:
- Đối tượng dữ liệu với mảng đối tượng:
```
//đối tượng customers có một mảng các đối tượng mà chúng ta sẽ chuyển tới handlebars:
var theData = {customers:[{firstName:”Michael”, lastName:”Alexander”, age:20}, {firstName:”John”, lastName:”Allen”, age:29}]};
```
- Bạn có thể sử dụng vòng lặp để lặp lại đối tượng của customers như thế này:
```
 {{#each customers}} 
      <li> {{ firstName }} {{ lastName }} </li>
 {{/each}}
```
hoặc nếu bạn chuyển đối tượng customers dưới dạng một mảng các đối tượng, chúng ta có thể sử dụng câu lệnh khối như thế này:
```
 {{#customers}} 
     <li> {{ firstName }} {{ lastName }} </li>
 {{/customers}}
```
đối tượng dữ liệu kiểu string:
```
var theData = {headerTitle:"Shop Page", weekDay:”Wednesday”};
```
***Hàm biên dịch:***
Đoạn mã cuối cùng mà chúng ta cần cho việc tạo template của handlebars xử lý 2 bước sau:
1. Biên dịch template với hàm handlebars. 
2. Sau đó, sử dụng hàm được biên dịch đó để gọi đối tượng dữ liệu được truyền cho nó (nó lấy một đối tượng dữ liệu làm tham số duy nhất của nó). Và điều này sẽ trả về một chuỗi HTML với các giá trị đối tượng được chèn vào HTML.

Tóm lại: 
Hàm Handlebars.compile lấy mẫu làm tham số và nó trả về hàm JavaScript. Sau đó, chúng tôi sử dụng hàm được biên dịch này để thực thi đối tượng dữ liệu và trả về một chuỗi có HTML và các giá trị đối tượng được thêm vào. Sau đó chúng ta có thể chèn chuỗi vào trang HTML.
# 4. Kết luận
 Đây là những kiến thức mình tìm hiểu được về handlebars.js, ngoài ra các bạn có thể tham khảo thêm link dưới đây:
 https://handlebarsjs.com/