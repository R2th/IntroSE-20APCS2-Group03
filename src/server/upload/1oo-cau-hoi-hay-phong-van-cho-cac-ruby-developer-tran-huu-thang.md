1. **Framwork là gì**?
là các đoạn code đã được viết sẵn, cấu thành nên một bộ khung và các thư viện lập trình được đóng gói
2. **Ruby on rails là gì ?**
* Ruby On rails là một Framework cho phép phát triển ứng dụng Web gồm 2 phần cơ bản:
* Phần ngôn ngữ Ruby: "Ruby là một ngôn lập trình mã nguồn mở, linh hoạt, với một sự nổi bật về sự đơn giản dễ dùng và hữu ích. Nó có cú pháp "tao nhã" và tự nhiên dễ đọc và dễ dàng để viết".
* Phần Framework Rails bao gồm nhiều thư viện liên kết.
3. **ActiveRecord là gì?**
 là 1 ruby gem đóng vai trò là ORM
4. **ORM là gì?**
viết tắt là Object Relational Mapping, nó giúp chuyển đổi dữ liệu giữa các hệ thống không tương thích trong lập trình hướng đối tượng. Nói cách khác, nó là cầu nối giữa DB và Rails, giúp truy xuất dữ liệu bằng các câu lệnh đơn giản mà Rails cung cấp
5. **Action Cable là gì?**
 nó là phương thức để thực hiện lập trình web socket trong Rails
6. **ActiveJob là gì?**
Nó là 1 Ruby gem phục vụ cho việc thiết lập các jobs chạy ngầm trong 1 Rails app
7. **Filter trong controller là gì?**
 Filter là phương thức chạy trước, chạy sau hoặc chạy cùng với các action trong controller
8. **Strong Parameters là gì?**
giống như 1 bộ lọc các giá trị được phép thay đổi trong params gửi lên
9. **Dùng nested attributes chưa?**
dùng để tạo thuộc tính của bản ghi này thông qua bản ghi khác. Để dùng nó trong Rails thì model phải khai báo accepts_nested_attributes_for, trong view dùng fields_for và trong controller accept attribute như images_attributes: [:id, :url]
10. **Phân biệt preload, include, eager_load và joins**
 Khác nhau khi truy vấn có quan hệ. Preload: Truy vấn 2 câu SQL Include: khi include không thôi thì giống preload, khi include có where với đk bảng liên kết thì sẽ là left joins Eager_load: left joins join: inner join include kết hợp với references sẽ giống như eager_load
11. **Phân biệt find, find_by, find_by!, where**
 - find_by: thực hiện tìm tiếm với điều kiện nào đó, nếu tìm thấy, trả về 1 object, nếu không tìm thấy thì trả về nil.
 - find_by!: tương tự với find_by, tuy nhiên nếu không tìm thấy thì sẽ trả về Exception ActiveRecord::RecordNotFound
- where: cũng thực hiện với tìm kiếm với điều kiện nào đó, nếu tìm thấy sẽ trả về một relation model, nếu không tìm thấy sẽ trả về realtion rỗng.
12. **Phân biệt take, limit, first, last**
* các hàm như find, find_by, take, first, last đều trae về các object model, nghĩa là chỉ cần gọi đến hàm đó, thì câu lệnh sql sẽ được thực thi ngay lập tức, k theo cơ chế Lazy Evaluation.
13.  **Khác nhau giữa .nil? .empty? .blank? và .present?**
- .nil? là một hàm của Object, nên tất cả các object kế thừa từ Object mặc định đều có hàm nil?
-  chỉ có nil object trả về true khi gọi nil?
- .empty? là function có sẵn của String, Array, Hash
- Hiểu một cách đơn giản thì .empty? sẽ trả về true nếu:
- string.length == 0
- array.length == 0
- hash.length == 0
- blank? là một hàm rất thú vị của Rails, cũng như được sử dụng rất thường xuyên (cùng với .present?)
- Theo như mô tả trong source code: một object được coi là blank nếu như nó false, empty hoặc là 1 chuỗi chỉ gồm các khoảng trắng.
14. **Phân biệt delete và destroy**
- Khi gọi delete một active record thì chỉ đơn thuần gọi câu lệnh sql trong DB, mọi thứ như là các hàm before_destroy, after_destroy và gọi callback destroy các dependent sẽ không được thực thi.
- Khi gọi destroy thì các hàm before, after_destroy và callback ở các dependent sẽ được thực thi theo thứ tự sau: 
- Gọi hàm before_destroy nếu được khai báo
- Xóa object
- Nếu bạn xét "dependent: delete" thì các object liên kết tới object này gọi hàm delete và xóa chỉ bằng câu lệnh sql. Còn nếu bạn xét "dependent: destroy" thì các object liên kết tới object này sẽ lặp lại các bước từ gọi hàm before_destroy, xóa object,... với chính nó.
- Gọi hàm after_destroy nếu được khai báo.
15. **Phân biệt update_attribute, update_attributes, update_column, update_columns, update, update!**
a) update(attribute_name: value)
- Là một instance method
- Cập nhật một hoặc nhiều thuộc tính của bản ghi
- Có kiểm tra validations, chạy callbacks
- Trả về True/False
- Trường updated_at được cập nhật nếu thành công
- update! raise exception nếu có lỗi xảy ra
 ```javascript
 user = User.find_by id: 1
 user.update name: "Hanh", email: "hanh@gmail.com"
 ```
 b) update(id, attributes)
- Là một class method
- Cập nhật thuộc tính của bản ghi với id truyền vào, có thể cập nhật nhiều bản ghi cùng lúc
- Validations, callbacks được gọi khi cập nhật
- Trả về bản ghi đó dù cập nhật thành công hay không
- Trường updated_at được cập nhật nếu thành công
 ```objectivec
 # Cập nhật một bản ghi
User.update(1, name: "Hanh", email: "hanh@gmail.com")
# Cập nhật nhiều bản ghi
* User.update([1,2], [{name: "Hanh", email: "hanh@gmail.com"}, {name: "Huong", email: "huong@gmail.com"}])
* ```
c) update_attribute(attribute_name, value)
Chỉ cập nhật một thuộc tính của bản ghi
- Bỏ qua validations, vẫn chạy callbacks
- Trả về True/False
d) Trường updated_at được cập nhật
- update_attributes(attribute_name: value)
- Giống với update(attribute_name: value) ở mục c phía trên
- update_attributes! raise exception nếu cập nhật không thành công
e) update_column(attribute_name, value)
- Cập nhật trực tiếp một thuộc tính trong cơ sở dữ liệu
- Validations, callbacks đều bị bỏ qua khi cập nhật
- Trả về True/False
- Trường updated_at không được cập nhật
 ```javascript
 user = User.find_by id: 1
 user.update_column :name, "Hanh"
 ```
 f) update_columns(attribute_name: value)
- Cập nhật trực tiếp một hoặc nhiều thuộc tính trong cơ sở dữ liệu
-  Bỏ qua cả validations và callbacks
- Trả về True/False
- Trường updated_at không được cập nhật
 ```javascript
user = User.find_by id: 1
 user.update_columns name: "Hanh", email: "hanh@gmail.com"
 ```
16. **Class là gì?**
- Trong lập trình hướng đối tượng, lớp là một chương trình-mã-khuôn mẫu có thể mở rộng được để tạo các đối tượng, cung cấp giá trị khởi tạo cho trạng thái và hiện thực của hàn vi. 
- Lập trình hướng đối tượng (tiếng Anh: Object-oriented programming, viết tắt: OOP) là một mẫu hình lập trình dựa trên khái niệm "công nghệ đối tượng", mà trong đó, đối tượng chứa đựng các dữ liệu, trên các trường, thường được gọi là các thuộc tính; và mã nguồn, được tổ chức thành các phương thức.
17. **Sự khác nhau giữa Class và Module?**
*- Module nó giống như 1 cái thư viện, có thể sử dụng nơi nào cần nó, còn class nó chỉ được sử dụng thông qua đối tượng thể hiện của nó. Class có tính kế thừa còn module thì không. Ngược lại, module có thể include vào bất cứ nơi nào trong khi class thì chỉ có thể sử dụng thông qua object, ...
18.  **Lập trình hướng đối tượng là gì ?**
- là một phương pháp lập trình mà mọi hoạt động đều thể hiện trên các Object.
19. **Tính đóng gói**
- Tức là trạng thái của đối tượng được bảo vệ không cho các truy cập từ code bên ngoài như thay đổi trong thái hay nhìn trực tiếp. Việc cho phép môi trường bên ngoài tác động lên các dữ liệu nội tại của một đối tượng theo cách nào là hoàn toàn tùy thuộc vào người viết mã.Đây là tính chất đảm bảo sự toàn vẹn, bảo mật của đối tượng Trong Java, tính đóng gói được thể hiện thông qua phạm vi truy cập (access modifier)3 từ khóa private, protected, public
20. **Tính trừu tượng**
- Tính trừu tượng là một tiến trình ẩn các chi tiết trình triển khai và chỉ hiển thị tính năng tới người dùng.Tính trừu tượng cho phép bạn loại bỏ tính chất phức tạp của đối tượng bằng cách chỉ đưa ra các thuộc tính và phương thức cần thiết của đối tượng trong lập trình.Tính trừu tượng giúp bạn tập trung vào những cốt lõi cần thiết của đối tượng thay vì quan tâm đến cách nó thực hiện.Trong Java, chúng là sử dụng abstract class và abstract interface để có tính trừu tượng.
21.  **Tính kế thừa**
- Đối tượng này có các thuộc tính chung với đối tượng khác -> A kế thừa B A có các thuộc tính và các phương thức public và protected của B và của riêng A
22. **Tính đa hình**
-  Đối tượng thuộc các lớp khác nhau có thể hiểu cùng một thông điệp theo các cách khác nhau.Ví dụ: Trong Shape có nhiều hình vẽ khác nhau như Circle, ... Tính diện tích chúng khác nhau, chạy chung phương thức calArea(). Ở mỗi class con viết đè phương thức calArea() theo cách khác nhau.Chuyển kiểu lên và chuyển kiểu xuống (downcasting và upcasting)2
23.  **3 cơ chế của OOP**
- Public: Thể hiện và con nó có thể truy cập
-  Protected: Chỉ thằng con nó có thể truy cập
-  Private: Không cho ai truy cập Tất nhiên là chỉ tính kế thừa và ngoài class, con trong class thì truy cập tất rồi :v: 
24.  **Hàm khởi tạo-hàm dựng**
- Hàm khởi tạo cũng là một hàm bình thường nhưng có điểm đặc biệt là nó luôn luôn được gọi tới khi ta khởi tạo một đối tượng. Hàm khởi tạo có thẻ có tham số hoặc không có tham số, có thể có giá trị trả về hoặc không. Ở một hàm bình thường khác bạn cũng có thể gọi lại hàm khởi tạo được và hàm khởi tạo cũng có thể gọi một hàm bình thường khác.
25. **Hàm hủy**
- Hàm hủy là hàm tự động gọi sau khi đối tượng bị hủy, nó thường được sử dụng để giải phóng bộ nhớ chương trình. Trong đối tượng hàm hủy có thể có hoặc không.
26. **Phân biệt class và object**
- Class là một khuôn mẫu để tạo ra object 
- Object là 1 thể hiện được đặt tên của class
27.  **Interface và Abstract class khác nhau như thế nào?**
– Abstract class : là một class cha cho tất cả các class có cùng bản chất. ... Hiểu đơn giản như một thằng con (child class) chỉ có thể là con của một thằng cha, có tính cách giống cha (abstract class) nó. 
– Interface : là một chức năng mà bạn có thể thêm và bất kì class nào.
28. **INNER JOIN**
* trả về hàng khi có một sự phù hợp trong tất cả các bảng được join
29. **LEFT JOIN**
* trả về tất cả bản ghi bảng bên trái, ngay cả khi không có sự phù hợp trong bảng bên phải, còn những bản ghi nào của bảng bên phải phù hợp với bảng trái thì dữ liệu bản ghi đó được dùng để kết hợp với bản ghi bảng trái, nếu không có dữ liệu sẽ NULL.
30. **RIGHT JOIN**
- trả về tất cả các hàng từ bảng bên phải, ngay cả khi không có sự phù hợp nào ở bảng bên trái.
31.  **Phân biệt WHERE và HAVING**
-  Where : Là câu lệnh điều kiện trả kết quả đối chiếu với từng dòng .
-  Having : Là câu lệnh điều kiện trả kết quả đối chiếu cho nhóm (Sum,AVG,COUNT,...)
-> Vì vậy mà sau GROUP BY thì sẽ chỉ dùng được Having, còn Where thì KHÔNG dùng được sau GROUP BY
32. **Các loại index trong sql**
- Index là một cấu trúc dữ liệu đặc biệt dưới dạng bảng tra cứu mà Database Search Engine có thể sử dụng để giúp việc truy vấn dữ liệu trong database được thực hiện hiệu quả hơn.
- Hiểu đơn giản, một chỉ mục là một con trỏ tới dữ liệu trong một bảng, giống như mục lục trong một cuốn sách để tra cứu đến các trang sách
- Có bao nhiêu loại index trong MySQL?
- Có hai loại index chính trong MySQL, đó là Clustered Index và Non-clustered Index
- Mở rộng từ 2 loại trên Unique Index Primary Index Secondary Index
33.  **Cách đánh index trong sql**
- MySQL cung cấp các kiểu đánh index đó là: B-Tree, Hash, R-Tree và bitmap index
- B-Tree index
-  Dữ liệu index được tổ chức và lưu trữ theo dạng cây, tức là có gốc, nhánh và lá. Giá trị của các node được tổ chức tăng dần từ trái qua phải.
-   Khi truy vấn dữ liệu thì việc tìm kiếm trong B-Tree là một quá trình đệ quy, bắt đầu từ root node và tìm kiếm tới nhánh và lá, đến khi tìm được tất cả dữ liệu thỏa mãn với điều kiện truy vấn thì mới dùng lại.
-   B-Tree index được sử dụng trong các biểu thức so sánh dạng: =, >, >=, <, <=, BETWEEN và LIKE. B-Tree index thường được sử dụng cho những column trong bảng khi muốn tìm kiếm giá trị nằm trong một khoảng nào đó.
-   Hash index
-   Dữ liệu index được tổ chức theo dạng key - value được liên kết với nhau.
-   Khi hash index làm việc nó sẽ tự động tạo ra một giá trị hash của cột rồi xây dựng B-Tree theo giá trị hash đó. Giá trị này có thể trùng nhau, và khi đó node của B-Tree sẽ lưu trữ một danh sách liên kết các con trỏ trỏ đến dòng của bảng.
-   Hash index chỉ sử dụng trong các biểu thức toán tử là = và <>, không có phép tìm kiếm gần đúng, tìm kiếm trong một khoảng giá trị hay sắp xếp, không thể tối ưu hóa toán tử ORDER BY bằng việc sử dụng Hash index bởi vì nó không thể tìm kiếm được phần từ tiếp theo trong Order.
* R-Tree index
- MyISAM hỗ trợ các chỉ mục không gian, mà bạn có thể sử dụng với các loại một phần như GEOMETRY. Không giống như các chỉ mục B-Tree, các chỉ mục không gian không yêu cầu các mệnh đề WHERE của bạn hoạt động trên tiền tố ngoài cùng bên trái của chỉ mục.
34. **Lợi, hại của việc đánh index**
- Mặc dù việc sử dụng các chỉ mục nhằm mục đích để nâng cao hiệu suất của Database nhưng đôi khi bạn nên tránh dùng chúng. Một nguyên tắc chung là tạo index cho tất cả mọi thứ được tham chiếu trong các phần WHERE, HAVING và ORDER BY của các truy vấn SQL.
-   Index cho việc tìm kiếm giá trị duy nhất
-   Index cho khóa ngoài để tối ưu hóa việc tìm kiếm
-   Index cho giá trị được sắp xếp xảy ra thường xuyên
-   Cần xem xét các điểm sau để quyết định có nên sử dụng chỉ mục hay không:
-   Các chỉ mục không nên được sử dụng trong các bảng nhỏ.
-   Bảng mà thường xuyên có các hoạt động update, insert.
-   Các chỉ mục không nên được sử dụng trên các cột mà chứa một số lượng lớn giá trị NULL.
-   Không nên dùng chỉ mục trên các cột mà thường xuyên bị sửa đổi.
35. **giống nhau interface với abstract**
* Đều không thể tạo đối tượng trực tiếp từ 1 abstract hoặc interface Đều có thể khai báo các phương thức nhưng không thực hiện chúng
* Đều bao gồm các phương thức abstract Đều được thực thi từ các class con hay còn gọi kế thừa, dẫn xuất.
36.  **khác nhau interface với abstract**
-  Abstract cho phép khai báo field còn interface thì không.
-  Abstract có thể có thân hàm hoặc không còn interface thì chỉ có khai báo thân hàm thì không.
-  Abstract có chứa contructor còn interface thì không.
-  Abstract có thể xác định modifier còn interface mặc định public
37. **Hiểu biết về RESTful**
- Restful API chính là một tiêu chuẩn dùng trong việc thiết kế API dành cho các trang web. Mọi tiêu chuẩn này được dùng để thiết kế web, đồng thời quản lý các resource. Nền tảng này chú trọng vào tài nguyên hệ thống ví dụ như là tệp văn bản, ảnh, âm thanh, video, hoặc dữ liệu di động,… Nó cũng bao gồm các trạng thái tài nguyên được định dạng và truyền tải qua HTTP. 
38. **Post và get khác nhau**
- cơ bản thì 1 thằng giấu params, 1 thằng khoe params
39. **PATCH và PUT khác nhau thế nào?**
- PATCH nó như bản vá, bạn cập nhất trường nào thì gửi trường đó lên. Còn PUT như bản thay thế, cập nhật thì gửi luôn các trường không đổi
40. **Gắn sự kiện, hủy sự kiện trong js**
- Có khá nhiều cách bind(), addEventListener(), unbind(), removeEventListener(), ...
41.  **Cơ chế ajax**
- ajax (Asynchronous JavaScript and XML) – một khái niệm không hề xa lạ với dân lập trình web. Nó là một kỹ thuật xử lý giúp chúng ta tạo ra sự sinh động cho Website của mình mà không reload lại trang. Ajax là sự kết hợp của một nhóm các công nghệ có sẵn trong Javascript sau đây:
- HTML & CSS: Hiển thị thông tin
- DOM (Document Object Model): Tương tác với thông tin được hiển thị thông qua Javascript
- XMLHttpRequest: Trao đổi dữ liệu với Sever một cách không đồng bộ
- XML: Là định dạng cho dữ liệu truyền Ajax đóng vai trò làm trung gian giữa Client và Server tạo nên sự mượt mà cho ứng dụng Web của chúng ta.
42.  **Bạn biết gì về getter và setter trong Ruby?**
- Một getter cho phép truy cập một biến instance.
-  Một setter cho phép thiết lập một biến instance. 
43. **Tại sao nó "Hầu hết mọi thứ trong Ruby đều là đối tượng (object)?"**
- Trong lập trình hướng đối tượng, một đối tượng là một thể hiện của một lớp. Trong Ruby, tất cả các lớp là các thể hiện của Lớp Class. Ví dụ:
-  7.class => Fixnum
-  7.class.class => Class
-  Một vài thứ không phải là đối tượng như block (khối), method (phương thức) và conditional statements (câu lệnh điều kiện if, else...). Câu hỏi này được đặt ra để xem liệu bạn có hiểu hầu hết mọi thứ trong Ruby đều hoạt động tương tự nhau, điều này giúp Ruby dễ tiếp thu hơn các ngôn ngữ khác.
44.  **Ruby là ngôn ngữ lập trình có kiểu tĩnh hay động?**
- Ruby là ngôn ngữ động. Đây là lý do tại sao bạn có thể thay đổi loại biến khi thực thi code. Trong Ruby, các dòng mã dứoiư đây chạy từng dòng một mà không gây ra lỗi.
45. **Điều gì xảy ra khi bạn gọi một phương thức trong Ruby?**
- Khi một method được gọi, Ruby sẽ xử lý lần lượt 2 công việc: tìm kiếm và thực thi. Đầu tiên nó sẽ tìm kiếm method bằng cách đi vào class của object (đối tượng), sau đó hãy di chuyển từ class đó đến class cha mà nó kế thừa, rồi từ class cha đó lại tiếp tục di chuyển đến class cha tiếp theo, cho đến khi gặp class tổ tiên cuối cùng là Object. Trên đường đi đó, nếu nó tìm được method đang được gọi thì sẽ dừng tìm kiếm và thực thi method đó. Nếu đến class cha cuối cùng vẫn không tìm thấy thì sẽ trả về method_missing và kết thúc tìm kiếm.
46. **Làm thế nào để lấy ra danh sách các routes của một ứng dụng Rails?**
- Mở terminal và chạy lệnh:
-  $ rake routes
47. **Gemfile là gì?**
- Gemfile là một tệp nằm trong thư mục gốc của dự án, nơi đặc tả các dependencies (theo mình hiểu là các gem - thư viện) trong một ứng dụng Ruby.
48.  **Gemfile.lock là gì?**
- Gemfile.lock là một tệp nằm trong thư mục gốc của dự án, nó chứa chính xác phiên bản của các gem được cài đặt. Nếu một máy khác clone dự án, nó cũng sẽ được cài đặt các phiên bản gem tương tự. Ngược lại, Gemfile không cần chỉ định phiên bản cụ thể của gem và sẽ cài đặt phiên bản mới nhất cho gem đó.
49. **Kể tên một số design patern (mẫu thiết kế) Rails bạn đã sử dụng**
- Có một số design patern trong Rails bao gồm các service objects, value objects, form objects, query objects, view objects, policy objects và decorators.
50. **Sự khác biệt giữa count, length và size?**
- count: Thực hiện một truy vấn SQL để đếm số lượng bản ghi. Method này hữu ích nếu số lượng bản ghi có thể đã thay đổi trong DB so với bộ nhớ.
-  length: Trả về số lượng items trong collection của bộ nhớ. Nó nhanh hơn so với count vì không có database transaction nào được thực hiện. Nó cũng có thể được sử dụng để đếm các ký tự trong một chuỗi.
-  size: Đây là một alias của length và được sử dụng tương tự
51.  **Rails quản lý trạng thái database như thế nào?**
- Sau khi các file migration được generate và thêm intructions (các chỉnh sửa đối với các thuộc tính của bảng), các intructions này hướng dẫn ActiveRecord cách để sửa đổi trạng thái cơ sở dữ liệu hiện có.
52. **Bạn đã từng implement chức năng phân quyền như thế nào?**
-  Phân quyền - Authorization (không nhầm lẫn với xác thực - authentication) liên quan đến việc cho phép các kiểu người dùng khác cấp thì có quyền truy cập khác nhau trong một ứng dụng. Một vài gems như Pundit và CanCanCan có thể dùng để implement chức năng này.
53. **Callback là gì?**
- Callbacks là một phương thức của Active Record, nó sẽ được gọi tới vào một thời điểm nào đó trong vòng đời của một đối tượng. Callback thường được dùng để thực thi các phương thức logic trước hoặc sau khi đối tượng có một sự thay đổi nào đó, ví dụ như create, update, delete,...Chúng thường được sử dụng song song với việc validate dữ liệu để đảm bảo rằng việc vào ra dữ liệu database là hoàn toàn chính xác. Tuy nhiên nếu sử dụng Callback không hợp lí thì sẽ tạo ra một số trường hợp xấu gây ảnh hưởng đến quá trình test và debug.
-  Callbacks được sử dụng trực tiếp cùng với những phương thức ActiveRecord như là create, save, update, destroy của các bản ghi trong database.
54.  **Intializers trong Rails là gì?**
- Intializers chứa logic cấu hình và chỉ chạy khi ứng dụng được khởi động. Điều này có nghĩa là máy chủ Rails (Rails server) cần được khởi động lại nếu Intializers được thay đổi. Chúng tồn tại trong thư mục/config /intializers.
55.  **Khi nói "Fat models, skinny controllers" nghĩa là đang nói đến điều gì?**
- Logic nghiệp vụ nên được đặt trong models, không phải controllers. Điều này giúp dễ dàng để unit test và tái sử dụng logic được hiệu quả hơn.
- Controllers chỉ đơn thuần là truyền thông tin giữa models và views.
-  Điều này thường được đưa ra như lời khuyên cho các Dev Rails mới. Nó không thực sự được khuyến nghị, đặc biệt là trong các ứng dụng lớn
56.  **Sự khác biệt giữa các class method và instance methods là gì?**
- Các class method có sẵn trên các lớp và các instance method có sẵn trong các instance (tất nhiên). Chúng thường được sử dụng cho các mục đích khác nhau.
- Đối với một lớp, Article, một instance method có thể đếm số lượng từ trong phần thân của một Article cụ thể. Trong khi một class method có thể đếm số lượng bài viết của một tác giả cụ thể trên tất cả các article (chú ý sự khác biệt về phạm vi).
- Các class method được ký hiệu là def self.method_name
57. **PORO là gì?**
- PORO là viết tắt của "Plain Old Ruby Object".
- Mặc dù hầu hết mọi thứ trong Ruby là đối tượng, ActiveRecord cũng có xu hướng sử dụng rất nhiều đối tượng phức tạp. Vì vậy, thuật ngữ PORO thường dùng để nhấn mạnh một đối tượng nhỏ, đơn giản được sử dụng để hỗ trợ logic nghiệp vụ.
58. **Ruby có cho phép đa kế thừa không?**
- Ruby không cho phép kế thừa từ nhiều hơn một lớp cha, nhưng nó có cho phép các mixing các module với include và extend.
59. **Ruby là ngôn ngữ định kiểu mạnh hay yếu?**
- Ruby là ngôn ngữ định kiểu mạnh. Sẽ có lỗi xảy ra nếu bạn cố gắng thực hiện hello hello + 3.
- Nhìn vào JavaScript, ta sẽ thấy JavaScript là ngôn ngữ định kiểu yếu, với ví dụ trên nó sẽ cho ra hết quả là "hello3".
60.  **ActiveRecord là gì?**
- ActiveRecord là một ORM (object-relational mapping) ánh xạ model với các bảng cơ sở dữ liệu. Nó đơn giản hóa việc thiết lập một ứng dụng vì chúng ta không còn phải viết SQL trực tiếp để tải, lưu hoặc xóa các đối tượng. Nó cũng cung cấp một số biện pháp bảo vệ chống lại SQL injection.
61. **Khi nào bạn dùng "self" trong Ruby?**
- Sử dụng self khi định nghĩa và gọi các phương thức của lớp.
- Trong một lớp, self tham chiếu đến lớp hiện tại, vì vậy nó được cần thiết khi một phương thức lớp gọi một phương thức lớp khác.
- self.class.method là bắt buộc khi một biến instance gọi đến một phương
62.  **Rack là gì?**
- Rack là một API nằm giữa máy chủ web và Rails. Nó cho phép cắm và hoán đổi các framework như Rails với Sinatra hoặc các máy chủ web như Unicorn với Puma.
63. **MVC là gì?**
- MVC (Model-View-Controller) là mô hình thiết kế sử dụng trong kỹ thuật phần mềm. Nó chia việc xử lý thông tin thành ba phần.*
- Mô hình quản lý dữ liệu và logic. Chế độ xem hiển thị thông tin. Bộ điều khiển nhận đầu vào và chuẩn bị dữ liệu cho một mô hình hoặc chế độ xem
64. **Block trong Ruby là gì?**
- Một block là đoạn mã giữa hai dấu ngoặc nhọn, {...} hoặc giữa do và end.
- Các block có phạm vi riêng, các biến được xác định bên trong block thì chỉ có giá trị sử trong block đó và không thể truy cập bên ngoài. Nhưng các biến được định nghĩa bên ngoài block có thể được sửa đổi bên trong block.
 `{|x| puts x} # a block`
65. **Sự khác biệt giữa proc và lambda là gì?**
-  Cả procs và lambdas đều là các khối được lưu trữ nhưng cú pháp và hành vi hơi khác nhau.
=  Một lambda trả về từ chính nó nhưng một proc trả về từ phương thức bên trong nó.
ruby
```ruby
 def method_proc
 thing = Proc.new { return 1}
 thing.call
 return 2
 end
 def method_lambda
 thing = lambda { return 1}
 thing.call
 return 2
 end
 puts method_proc # => 1
puts method_lambda # => 2
```
- Lưu ý rằng method_proc trả về 1 vì việc gọi proc kết thúc quá trình thực thi trong phương thức 
66.  **yield  trong Ruby là gì?**
* yield thực thi code được truyền vào method đó thông qua 1 block. Nó thường được sử dụng trong các tệp layouts trong ứng dụng Rails.
67. **content_for dùng để làm gì?**
- Nó cho phép xác định và hiển thị nội dung trong các views. Điều này rất hữu ích để định nghĩa content ở một chỗ và render nó ở nhiều nơi khác nhau.
68.  **Sự khác nhau giữa Hash và Json?**
- Hash là một lớp Ruby, một tập hợp các cặp keyvalue, nó cho phép truy cập các value bằng các key. JSON là một chuỗi ở định dạng cụ thể để gửi dữ liệu.
69.  **Active Job là gì?**
- Cho phép tạo các background job và sắp xếp chúng trên các back ends như Delayed :: Job hoặc Sidekiq. Nó thường được sử dụng để thực thi mã mà không cần phải thực thi trong luồng chính của web. Một trường hợp sử dụng phổ biến là gửi email thông báo cho người dùng.
70. **Spring là gì?**
- Spring là một application preloader. Nó giữ cho ứng dụng chạy ở chế độ nền nên không cần khởi động bất cứ khi nào bạn chạy migration hoặc rake.
71.  **asset pipeline là gì?**
- Asset pipeline cung cấp một framework cho phép kết nối, nén hay rút gọn các file CSS hay JS trong project. Ngoài ra có thể compile các assets trong ngôn ngữ khác (CoffeeScript, Sass, ERB) sang JavaScript và CSS. Các assets của gem trong application cũng sẽ được asset pipeline combine lại.
72.  **Bạn quản lý xác thực trong Rails như thế nào?**
- devise
73. **splat operator là gì?**
- Splat được sử dụng khi bạn không muốn chỉ định trước số lượng đối số được truyền cho một phương thức. 
74. **Sự khác nhau giữa include và extend là gì?**
- cả hai đều là các mixin cho phép chèn mã từ một mô-đun khác.
- Nhưng *include cho phép truy cập mã đó thông qua các class method, trong khi extend* cho phép truy cập mã đó thông qua các instance
75.  **Sự khác nhau giữa load và require?**
- load chạy một tệp khác, ngay cả khi nó đã có trong bộ nhớ.
-  request sẽ chỉ chạy một tệp tin khác một lần, bất kể bạn yêu cầu nó bao nhiêu lần.
76.  **Khác nhau giữa class và module?**
- Một class có các thuộc tính và phương thức. Bạn có thể tạo một instance của một class.
- Mô-đun chỉ là một tập hợp các phương thức và hằng số mà bạn có thể kết hợp với mô-đun hoặc class khác.
77. **Scope là gì?**
- Scope là logic truy vấn ActiveRecord mà bạn có thể định nghĩa bên trong một model và gọi ở nơi khác.
- Việc định nghĩa scope có thể hữu ích hơn thay vì phải sao chép cùng một logic ở nhiều nơi trong ứng
78. **Sự khác nhau giữa biến class và biến instance?**
- Các biến instance được ký hiệu bắt đầu bằng @, là một một thể hiện của một lớp. Việc thay đổi giá trị của một thuộc tính trên một instance không ảnh hưởng đến giá trị thuộc tính của các instance khác.
- Các biến class ký hiệu bắt đầu bằng @@, biến class thì nó available trong tất cả các instances của class đó. Có nghĩa là tất cả các object mà được instantiated từ class đó được sử dụng. Vì vậy, việc thay đổi biến trên một instance sẽ ảnh hưởng đến biến đó cho tất cả các instance của lớp.
 ```ruby
 class Coffee
@@likes = 0
def like
 @@likes += 1
 end
 def likes
 puts @@likes
 end
 end
 coffee_one = Coffee.new
 coffee_two = Coffee.new
 coffee_one.like
 coffee_two.like
coffee_one.likes
 => 2
 ```
- Lưu ý : biến class có thể được cập nhật bởi bất kỳ instance nào của lớp.
79.  **Khác nhau giữa collect, map và collect?**
- Cả ba phương thức trên đều lấy đối số là block.
- select: Được sử dụng để lấy một tập hợp con của một collection. Việc gọi .select! sẽ làm thay đổi collection ban đầu.
- i = [1,2,3,4,5]
-  i.select {|x| x % 2 == 0}
- => [2, 4]
-  map: Thực hiện một hành động trên từng phần tử của một tập hợp và xuất ra một tập hợp được cập nhật. Việc gọi .map! sẽ làm thay đổi collection ban đầu.
-  i = [1,2,3,4,5]
-  i.map {|x| x+1}
-  => [2,3,4,5,6]
- collect: là một alias của .map và hoạt động tương tự.
80.  **CRUD verbs và các action trong Rails?**
-  verb | action
---------------
- GET | index
- GET | new
- POST | create
- GET | show
- GET | edit
- PATCH/PUT | update
- DELETE | destroy
 81. **Định nghĩa một route cho một hành động create mà không sử dụng "resources"**
- Với resources: resources :photos.
- Không có resources: post '/photos', to: 'photos#create', as: :create_photo.
82. **Ba levels của access control là gì?**
-  public: Bất kỳ đối tượng nào cũng có thể gọi phương thức này.
-  protected: Chỉ lớp đã định nghĩa phương thức và các lớp con của nó mới có thể gọi phương thức.
-  private: Chỉ bản thân đối tượng mới có thể gọi phương thức này.
83. **Bạn sử dụng các singleton trong Ruby như thế nào?**
- Singleton là một mẫu thiết kế chỉ cho phép một lớp có một thể hiện. Điều này thường được nhắc đến trong Ruby, nhưng Ruby đi kèm với một mô-đun cho nó.
 ```ruby
require 'singleton'
class Thing
include Singleton
end
puts Thing.instance
 ```
84.  **Sự khác biệt giữa render và redirect_to**
- Gọi tới render sẽ tạo một response đầy đủ trả về cho browser. Nếu không chỉ rõ render trong controller action, Rails sẽ tự động tìm kiếm và render template tương ứng dựa vào tên controller action.
- Khác với render công việc của redirect_to là điều hướng browser, yêu cầu browser tạo một request mới đến một URL khác. Ví dụ: redirect_to photos_url. Hoặc tới một website khác redirect_to "https://google.com".
85. **Các thuật toán sắp xếp (Sort)**
- selection sort tìm phần tử nhỏ nhất cho lên đầu, tìm nhỏ nhất trong phần còn lại đến hết
- bubble sort (đổi chỗ 2 phần tử -> đơn giản nhất)
- insertion sort so sánh 2 cặp số gần nhau, a < b cho a lên trước. Tiếp đến so sánh b và c,...
- merge sort chia để trị, chia mảng thành nhỏ nhất (1 phần tử) -> tổ hợp các phần tử lại bằng cách so sánh chúng -> gộp thành mảng đã sắp xếp
- quick sort chọn phần tử chốt -> chia thành 2 phần lớn hơn và nhỏ hơn phần tử chốt bảng cách so sánh -> sắp xếp đệ quy 2 phần đó -> kết quả
86. **Asset Pipeline là gì?**
- Asset pipeline cung cấp một framework cho phép kết nối, nén hay giảm bớt những tài nguyên về CSS hay JS. Nó còn cho phép chúng ta có thể viết CSS, JS bằng một số ngôn ngữ khác nữa như CoffeeScript, Sass hay ERB.
- Các file assets trong ứng dụng được kết nối một cách tự động cùng với những assets chứa trong gem. Asset pipeline được thực hiện bởi gem sprockets-rails , thông thường khi khởi tạo ứng dụng rails nó sẽ mặc định được enable. Rails tự động thêm vào các gem sass-rails, coffee-rails và uglifier được sử dụng bởi sprockets cho phép nén các asset.
87. **Làm thế nào để getter và setter trong Ruby?**
- dùng get_name(), set_name(name).
- các từ khóa attr_reader, attr_writer, attr_accessor.
88. **Nêu một vài phương thức thực thi hàm trong ruby?**
- dùng .method_name. Tuy nhiên, khi bạn có method_name là 1 string hay 1 cái symbol thì trong Ruby có vài cách gọi thú vị khác như:
-  .send(:method_name)
-  .send("method_name")
-  .method(:method_name).call
-  .method("method_name").call
89. **.nil?,Coding Convention là gì**
- nil? là một phương thức được định nghĩa trên Object và NilClass.
- coding conventions là tập hợp những nguyên tắc chung khi lập trình nhằm làm cho code dễ đọc, dễ hiểu, do đó dễ quản lý, bảo trì hơn.
90. **HTTP response status codes**
- Informational responses (100–199)
-  Successful responses (200–299)
-  Redirection messages (300–399)
-  Client error responses (400–499)
-  Server error responses (500–599)
91. **Sự khác nhau giữa bảng tạm cục bộ (Local) và bảng tạm toàn cầu (Global) là gì?**
- Một bảng tạm cục bộ tồn tại trong một kết nối. Khi kết thúc kết nối thì bảng tạm này tự động được xóa. Tên của bảng tạm Local được bắt đầu bằng ký tự #
- Một bảng tạm toàn cầu tồn tại vĩnh viễn trong db nhưng các hàng của nó biến mất khi kết nối đóng lại. Tên bảng tạm Global được bắt đầu bằng #
92. **Tối ưu hóa truy vấn là gì?**
-  Là một quá trình, trong đó hệ thống cơ sở dữ liệu so sánh các chiến lược truy vấn khác nhau và chọn truy vấn với chi phí thấp nhất.
93. **Sự khác biệt giữa các lệnh TRUNCATE, DELETE và DROP?**
-  DELETE: xóa một hoặc tất cả các hàng từ một bảng dựa trên điều kiện và có thể phục hồi
- TRUNCATE: xóa tất cả các hàng từ một bảng bằng cách phân bổ các trang bộ nhớ và không thể phục hồi
- DROP: xóa hoàn toàn một bảng từ cơ sở dữ liệu
94. **Thứ tự của SQL SELECT?**
- Thứ tự các mệnh đề SQL SELECT là: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. Trong đó SELECT, FROM là bắt buộc.
95. **NOMALIZATION – Chuẩn hóa là gì?**
-  Quá trình thiết kế bảng để giảm thiểu sự thừa số liệu được gọi là chuẩn hóa. Chúng ta cần chia một cơ sở dữ liệu thành hai hay nhiều bảng và xác định các mối quan hệ giữa chúng
96. **Các mối quan hệ trong ruby on rails**
- [Link document ](https://viblo.asia/p/quan-he-cua-rails-trong-ruby-JQVkVzRYkyd)
97. **Polymorphic relationships là gì cho ví dụ**
- Polymorphic relationships là một chủ đề bạn sẽ hầu như không đề cập suy nghĩ tới trừ khi bạn thực sự cần chức năng đó.
- Polymorphic relationship là nơi một mô hình có thể thuộc về nhiều mô hình khác trên một association.
* Ví dụ điển hình về điều này là bạn có nhiều thứ có thể được comment, ví dụ như một dự án, một tác vụ hoặc một tệp đính kèm...
- Trong mỗi trường hợp, một comment nó có ý nghĩa chỉ có một model comment duy nhất. 
98. **98. N+1 là gì ? Khắc phục như thế nào ?**
- Có nhiều cách để làm giảm số lượng câu query, trong đó có 1 cách phổ biến là sử dụng includes. Include sử dụng eager load với các bảng có quan hệ với model khác. Cụ thể ở đây là khi dùng includes, ta đã sử dụng preload hay left outer join tuỳ vào các trường hợp khác nhau.
99. **Ruby có hàm khởi tạo contructor không ?  có hàm gì**
- Ruby không sử dụng từ khóa constructor mà sử dụng initialize để khởi tạo hàm dựng
100. **Filter , Strong Parameters, là gì?**
- Filter là phương thức chạy trước, chạy sau hoặc chạy cùng với các action trong controller
- Strong Parameters giống như 1 bộ lọc các giá trị được phép thay đổi trong params gửi lên