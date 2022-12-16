## Giới thiệu
Wicket đã được phát triển từ năm 2004 và trở thành Apache Project từ năm 2007. Trong những năm này, Wicket đã chứng minh rằng nó là một giải pháp vững chắc và có gía trị để xây dựng enterprise web applications.
Các Core Developer của Wicket đã thực hiện những công việc tuyệt vời để tạo ra Framework này và họ vẫn tiếp tục cải thiện nó sau khi release. Tuy nhiên Wicket không bao giờ cung cấp tài liệu miễn phí, thậm chí nếu bạn có thể tìm trên Internet rất nhiều ví dụ và các bài viết về technical (phần ở ở hai trang web [Wicket Examples Site](http://examples8x.wicket.apache.org/index.html) và [Wicket in Action](http://wicketinaction.com/) ) thì tình trạng thiếu tài liệu vẫn xảy ra khi tham khảo các trang web này.
Đó là một vấn đề của Wicket bởi vì rất nhiều Framework phổ biến khác (như Spring, Hibernate hoặc Struts) cung cấp khối lượng lớn các tài liệu free, điều này đóng giúp rất lớn cho sự thành công của các Framework này cũng như cho các Developer.
Hướng dẫn này dành cho Wicket 8. Tuy nhiên nếu bạn sử dụng version Wicket cũ hơn, bạn cũng có thể đọc hướng dẫn này để tìm hiểu về Wicket. Nhưng sẽ có một vài đoạn mã code không chạy được đối với version cũ hơn. Khi đó, bạn hãy tiếp tục tham khảo các tài liệu về version Wicket của mình nhé.

## Tổng quan và tìm hiểu về Component Oriented Framework
Component Oriented Framework khác với Classic Web Framework ở chỗ chúng xây dựng một mô hình các trang yêu cầu  ở phía máy chủ và HTML sẽ gửi trở lại cho client được tạo ra theo mô hình này. Bạn có thể nghĩ về mô hình này như là một nghịch đảo của JavaScript DOM, nghĩa là
1. Nó được xây dựng trên máy chủ
2. Nó được xây dựng trước khi HTML gửi đến client
3. Mã HTML được tạo ra sử dụng mô hình này.

![](https://images.viblo.asia/3858c21e-1fc2-4ace-9830-28143f8e8f1a.png)

*Lược đồ chung vè xử lý yêu cầu trang cho một Component Oriented Framework*

Với lược đồ này, các web pages và thành phần html (forms, input controls, links, ...) là các class instances thuần túy. Các Pages là các class instances mà chúng tồn tại bên trong JVM heap và chúng ta có thể xử lý chúng giống như chúng ta làm việc với bất kỳ Java Class nào. Cách tiếp cận này rất giống với cách mà các GUI Frameworks (như Swing hoặc SWT) làm việc với destop windows và các components của chúng. Wicket và các Component Oriented Frameworks mang đến cho việc phát triển web cùng một kiểu abstraction mà các GUI Frameworks cung cấp khi chúng ta xây dựng một Destop Application. Hầu hết các Frameworks này làm ẩn chi tiết các giao thức HTTP và có thể giải quyết vấn đề về stateless một cách đơn giản.

## Lợi ích của Component Oriented Framework trong phát triển Web
Đến thời điểm này, một vài người có thể vẫn thắc mắc tại sao OOP lại quan trọng trong việc phát triển web và lợi ích nó có thể mang lại cho developers. Hãy review nhanh về lợi ích chính mà mô hình này có thể mang lại cho chúng ta:
* **Mỗi Web Page là một đối tượng:**  Web pages không chỉ là file text gửi đến client. Chúng là một object instances và chúng ta có thể sử dụng OOP để thiết kế Web Page và các thành phần chúng nó. Đối với Wicket, chúng ta thậm chí có thể áp dụng tính kế thừa cho HTML markup để xây dựng một layout thích hợp cho applications.
* **Chúng ta không phải lo lắng về state của application:** 
Các Pages và Components có thể được coi như là stateful entities. Chúng là những JAVA Object và chúng có thể tự giữ trạng thái trong chính nó và refer đến các objects khác. Chúng ta có thể ngừng lo lắng về việc theo dõi user data chưa trong HTTOSession và chúng ta có thể bắt đầu quản lý chúng một cách tự nhiên và minh bạch.
* **Testing Web Application dễ dàng hơn:** 
Các Pages và Components là các Object thuần túy, bạn có thể sử dụng JUnit để test behavior trong mỗi page để đảm bảo rằng chúng hoạt động như mong đợi. Wicket có tập hợp các Classes hữu ích cho Unit Testing mô phỏng tương tác người dùng với Web Pages, vì thế chúng ta có thể viết acceptance tests chỉ sử dụng JUnit mà không phải sử dụng bát kì Test Framework nào khác.

## Wicket với các Component Oriented Framework khác
Wicket không phải là Component Oriented Framework duy nhất sẵn có trong hệ sinh thái Java. Một trong số các đối thử của Wicket, chúng ta có thể kể đến GWT (từ Google), JSF (từ Oracle), Vaadin (từ Vaadin Ltd.),... Tuy cả Wicket và các Framework khác đều có những ưu điểm và khuyết điểm riêng, nhưng có một vài lý do giải thích cho việc vì sao chúng ta nên chọn Wicket:
* **Wicket là open source 100%:** 
Wicket là một dự án Apache hàng đầu và nó không phụ thuộc vào bất kỳ công ty tư nhân nào. Bạn không phải lo lắng về những thay đổi về licensing trong tương lai, Wicket luôn release theo Apache license 2.0 và chúng luôn là free.
* **Wicket là một dự án hướng cộng đồng:** Wicket team luôn hỗ trỡ và thúc đẩy đối thoại với người dùng Framework thông qua hai danh sách liên lạc (User và Developer) và một Apache JIRA (Hệ thống theo dói vấn đề). Hơn thế nữa, giống như bất kỳ dự án Apache, Wicket định hướng chú trọng đến feedbacks của người dùng và các tính năng được đề suất.
* **Wicket chỉ sử dụng JAVA và HTML thuần túy:** Hầu hết các Web Framework buộc người dùng sử dụng các tags đặc biệt hoặc sử dụng servier side code trong HTML markup. Điều này khá trái ngược với concept phần tách các presentation và business logic và nó dẫn đến sự khó hiểu trong mã code trong các Pages. Trong Wicket, chúng ta không phải quan tâm đến việc tạo ra HTML trong Page của chúng ta và không phải sử dụng bất kì tag nào ngoài các tag HTML. Tất cả chúng ta phải làm là gắn các Component (Java instances) vào các Tag HTML bằng cách sử dụng một attribute đơn giản là wicket:id (Tôi sẽ giải thích cách dùng này trong phần sau)
* **Đối với Wicket, chúng ta có thể dễ dàng sử dụng JavaBeans và POJO trong các tầng web:** Một trong những nhiệm vụ khó chịu và dễ gây lỗi nhất trong phát triển Web là thu thập vào Input đầu vào của User thông qua form và giữ lại giá trị của form fields khi updated với giá trị được chèn trước đó. Điều này đòi hỏi số lượng lớn các mã code để trích xuất đầu vào từ các tham số, phân tích chúng thành các loại Java và lưu chúng bằng một vài loại biến. Trên đây mới chỉ là một nửa công việc mà chúng ta cần làm. Hơn thế nữa, hầu hết các form của chúng ta sử dụng JavaBean hoặc POJO làm đối ượng sao lưu, nghĩa là chúng ta phải map thủ công các form fields với các object fields tương ứng và ngược lại. Wicket có thể giải quyết vấn đề này bằng một cơ chế trực quan và linh hoạt bằng cách sử dụng một convention thông qua cách configuration. Với cơ chế này, việc thu thập đầu vào cũng như theo dõi sự thay đổi giá trị đầu vào trở nên dễ dàng và minh bạch hơn, bỏ qua công đoạn map thủ công với rất nhiều rủi ro gây nên lỗi hệ thống.
* **Không cần XML phức tạp:** Wicket thiết kế giảm thiểu số lượng configuration file cần thiết để chạy application. Không cần file XML nào ngoại trừ file web.xml mô tả việc deployment (Không áp dụng đối với Servlet 3 hoặc version mới nhất)

## Tổng kết
Trên đây, tôi đã giới thiệu một cách sơ lược nhất về cơ chế và ưu điểm của Wicket. Vào các bài viết sau, tôi sẽ đi sâu hơn về cách sử dụng Wicket. 
Cảm ơn các bạn đã đón đọc và theo dõi

### Tài liệu tham khảo
https://ci.apache.org/projects/wicket/guide/8.x/single.html#_benefits_of_component_oriented_frameworks_for_web_development