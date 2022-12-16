Ở phần này chúng ta sẽ tiếp tục đến với việc quản lý bộ nhớ, một việc mà ai cũng ghét =))

# Quản lý bộ nhớ

Quản lý bộ nhớ là một trong những phần quan trọng nhất mà chúng ta phải thông thạo cho dù làm việc với bất kì ngôn ngữ nào. Java đơn giản cho phép "gabage collector" quản lý việc đó. Objective-C đòi hỏi bạn phải hiểu về "reference counting" và công việc mà ARC thực hiện. Trong C++, nó lại là cả một vấn đề lớn.
Trước tiên, để hiểu về quản lý bộ nhớ trong C++, bạn cần tìm hiểu về "stack" và "heap". Kể cả khi bạn cho rằng bạn hiểu về nó thì mình khuyên bạn vẫn nên đọc lại lời giải thích dưới đây, bạn vẫn có thể học lại được gì đó.
- Stack : là một phân vùng bộ nhớ để chạy chương trình, Nó được giới hạn kích thước và được sử dụng bởi chương trình để lưu trữ dữ liệu. "Stack" làm việc theo cơ chế "push/pop", khi một hàm chạy, nó đẩy dữ liệu vào trong "stack", và sau đó, khi hàm kết thúc, nó phải kéo hết chỗ dữ liệu được đưa vào đấy ra ngoài. Do đó, bộ nhớ "stack" không bị tràn.
- Heap : cũng là một phân vùng bộ nhớ tồn tại cho chương trình hoạt động. Nó không được giới hạn và sẽ lớn dần khi chương trình chạy. Đây là nơi mà chương trình lưu trữ dữ liệu được dùng ở bên ngoài scope của hàm. Và nếu như dữ liệu của bạn lớn thì nó buộc phải lưu ở heap, nếu lưu ở stack có thể sẽ xảy ra trường hợp bị tràn bộ nhớ.

Dưới đây là ví dụ về stack và heap.

![](https://images.viblo.asia/2a1970d2-ac89-471b-9cfe-fbee905e31de.png)

Ở đây, "stackInt" dùng bộ nhớ ở stack, sau khi hàm này kết thúc, bộ nhớ chứa giá trị "5" sẽ tự động được thu hồi.

Tuy nhiên, "heapInt" lại dùng bộ nhớ ở heap, gọi "malloc" để phân bộ nhớ đúng kích cỡ để lưu một giá trị "int" trong heap. Nhưng bởi vì heap được quản lý bởi người phát triển nên cần phải gọi "free" để tự mình giải phóng bộ nhớ đấy nếu không muốn bị leak memory.

Trong Objective-C, bạn chỉ có thể tạo một object trong heap, bạn sẽ nhận được một thông báo biên dịch lỗi nếu như bạn cố tình tạo object trong stack. 

![](https://images.viblo.asia/eb0dc0fd-d7fd-4945-bdb3-dc8ed3bb80e5.png)

Đó là lý do tại sao bạn luôn nhìn thấy dấu hoa thị ở trong Objective-C, tất cả các object đều được tạo ở trong heap và bạn phải trỏ đến các object đó. Căn nguyên của việc này do trong Objective-C sử dụng reference counting, object buộc phải ở trong heap để có thể kiểm soát nó chặt chẽ.

Trong C++, bạn có thể lựa chọn lưu trữ dữ liệu trong stack hoặc heap, tuy nhiên, bạn lại phải tự mình quản lý bộ nhớ đó. Đưa dữ liệu vào stack sẽ được giải phóng tự động, nhưng khi bắt đầu sử dụng heap, bạn phải quản lý nó nếu không sẽ rất tiềm tàng khả năng bị leak dữ liệu.

# C++ new và delete

C++ đem đến cho chúng ta một cặp từ khoá để giúp cho việc quản lý vùng nhớ trên heap dễ dàng.
Tạo object như sau

![](https://images.viblo.asia/c4f0677e-3fe1-4736-bd7c-a3ffccf07718.png)

Khi bạn làm việc xong với object, xoá đi như sau.

![](https://images.viblo.asia/5b2db66f-316e-451b-a899-44ccca901082.png)

Thực tế, nó còn hoạt động với cả kiểu tuyến tính trong C++.

![](https://images.viblo.asia/ea49a06f-002a-41e4-8b50-97cfd515ed14.png)

Bạn có thể mường tượng nó giống như là khởi tạo và huỷ object giống như trong Objective-C. Khởi tạo trong C++, sử dụng "new Person()", giống với "[[Person alloc] init]" trong Objective-C.
Không có từ khoá nào tương đồng với "delete" trong Objective-C, Tuy nhiên, huỷ một object trong Objective-C được điều khiển trong lúc chạy khi giá trị retain của object còn lại bằng 0. Nhớ rằng, C++ không có cơ chế "reference counting", bạn phải tự huỷ object đó khi bạn xong việc với object đó.

Bây giờ bạn đã có một cái nhìn toàn cảnh về việc quản lý bộ nhớ trong C++, việc quản lý bộ nhớ trong C++ tốn nhiều thời gian và sức lực hơn trong Objective-C, bạn phải thực sự để ý và làm chủ được nó.

![](https://images.viblo.asia/4b852942-cbac-46ad-99cf-8e7e09b2a0c6.png)

# Truy cập vào object trong stack và heap

Bạn đã tìm hiểu object có thể được tạo trong stack hoặc heap trong C++. Tuy nhiên, có một lưu ý nhỏ nhưng quan trọng đó là cách truy cập vào biến và function như thế nào.

Khi sử dụng stack object, bạn phải sử dụng dấu (.) , trong heap bạn phải sử dụng dấu mũi tên (->).

![](https://images.viblo.asia/104f43ec-5eb7-442b-83d4-5626f9e2b2c6.png)

Bạn có thể thấy dấu mũi tên được sử dụng với con trỏ "this", tương đương với con trỏ "self" trong Objective-C.

![](https://images.viblo.asia/456fac8f-bf8c-4cab-a6da-043a3dd1105d.png)

Trong Objective-C, nếu bạn gọi hàm từ một con trỏ nil, ứng dụng vẫn chạy bình thường.

![](https://images.viblo.asia/76767535-f094-4f2a-bdf0-fa64dfb09e57.png)

Tuy nhiên, trong C++ nếu bạn cố tình gọi hoặc truy cập vào một con trỏ NULL, ứng dụng sẽ bị crash.

![](https://images.viblo.asia/2f012e70-b088-44d3-9dea-bd222c1ffc14.png)

# Tham chiếu

Khi bạn truyền một object vào trong một hàm, bạn sẽ truyền bản sao chép của object đó chứ không phải chính nó.

![](https://images.viblo.asia/52b4bca4-7185-45d9-a138-a144c88e57f8.png)

Điều là vô cùng hiển nhiên và không có gì lạ. Nhưng hãy quan sát sự thay đổi sau với việc truyền một object vào hàm.

![](https://images.viblo.asia/034865ee-076e-4d68-9359-76a2f75cea55.png)

Có thể bạn sẽ ngạc nhiên. Nhưng nếu bạn để ý rõ hơn, thực sự là không có gì khác biệt cả. Điều xảy ra ở đây là việc một bản sao chép của object "Foo" đã được đưa vào trong hàm chứ không phải chính object đó.

Đôi khi, bạn thực sự muốn truyền chính object đó vào trong hàm. Một cách làm đó là thay đổi hàm để nhận tham số là con trỏ, thay vì là object. Nhưng sau đó bạn sẽ phải thêm nhiều code mỗi khi bạn gọi hàm.

C++ thêm một định nghĩa cho phép bạn truyền tham số theo kiểu "tham chiếu". Điều này nghĩa là không có bản sao nào được tạo; điều này trái ngược với ví dụ trên nhằm ví dụ việc truyền giá trị.

Rất dễ để thay đổi việc truyền tham số thành tham chiếu; bạn chỉ cần dùng đấu địa chỉ bằng cách thêm (&) đằng trước biến trong hàm.

![](https://images.viblo.asia/c32a8f13-0c61-4e99-8d3f-b89e5eefa59f.png)

Nó cũng hoạt động với cả biến nằm ngoài class.

![](https://images.viblo.asia/ef393613-d8b1-47a0-8b78-a0f73f01fd15.png)

Truyền tham chiếu rất hữu dụng và có thể tăng hiệu năng. Điều này thể hiện rõ nhất đối với những object lớn, ví dụ như là một danh sách lớn.

# Kế thừa

Đã là một ngôn ngữ hướng đối tượng thì không thể thiếu kế thừa, và C++ cũng không nằm ngoài việc đó. Dưới đây là ví dụ biểu diễn việc kế thừa trên Objective-C

![](https://images.viblo.asia/3f4048fc-079c-4d9d-bbe1-db4cefabf5b1.png)

Điều tương tự trong C++

![](https://images.viblo.asia/1468103b-4bab-45eb-bb0a-7185032b7974.png)

Điều khác biệt duy nhất là trong C++ phải thêm từ khoá "public". Ở đây, "Employee" kế thừa công khai từ "Person". Điều này nghĩa là tất cả thuộc tính và hàm của "Person" nằm công khai trong "Employee".

Nếu bạn thay đổi "public" thành "private" thì tất cả thuộc tính của "Person" sẽ trở thành "private" trong "Employee".

Đó chỉ là phần dễ ở trong C++, C++ khác Objective-C ở chỗ C++ cho phép đa kế thừa. Điều này cho phép một class có thể kế thừa từ nhiều class.

![](https://images.viblo.asia/6b1f9d25-ddc7-4869-a506-d72b9bfa9eb6.png)

Ở ví dụ này, có hai class cha và một class được kế thừa từ cả hai. Điều này nghĩa là  "PlayerManager" có khả năng truy cập vào tất cả thuộc tính và hàm của các class cha đó. Nhưng trong Objective-C lại không thể.

Nhưng ở Objective-C có một trick để giả lập việc đa kế thừa đó là "protocols". Mặc dù nó không giống hoàn toàn với đa kế thừa nhưng cả hai cách để hướng đến một việc đó là một cơ chế để liên kết và sử dụng lại.

Protocol có điểm khác biệt là nó không có phần "implement"; nó chỉ khai báo một interface cho class.

![](https://images.viblo.asia/d51885f7-f546-4423-aab5-41f6de25344c.png)

Mặc dù đa kế thừa có điểm hay nhưng nó đem lại khá nhiều phiền toái. Cứ giả sử rằng cả hai lớp cha của bạn đều có các thuộc tính và hàm khác nhau, hoàn toàn có thể dẫn ta đến việc khó hiểu và sử dụng sai mục đích. Cho nên dù có là ở C++, ta cũng nên tránh đa kế thừa bằng mọi cách có thể.

![](https://images.viblo.asia/ddddcd4a-b9e2-4eae-9c9b-4c0d9b41c5fd.png)


Ở phần sau, chúng ta sẽ tìm hiểu sâu hơn về đặc tính của class và các mẫu trước khi tìm hiểu đến các thư việc có sẵn trong Objective-C++.

Ref: https://www.raywenderlich.com/62989/introduction-c-ios-developers-part-1