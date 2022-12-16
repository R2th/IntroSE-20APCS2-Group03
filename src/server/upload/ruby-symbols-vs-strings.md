Symbol là một định nghĩa không còn quá xa lạ trong Ruby. Tuy nhiên khi bắt đầu với Ruby, hẳn các bạn sẽ có 10 vạn câu hỏi vì sao về Symbol: Symbol là gì? Tại sao không phải là String?, Symbol vs String khác nhau cái gì?, ....

Bài viết hôm nay mình xin được giới thiệu đôi chút về Symbol, và sự khác nhau giữa Symbol và String trong Ruby.

### Symbol là gì?

Symbol được định nghĩa như là "scalar value objects used as identifiers, mapping immutable strings to fixed internal values." Hiểu đơn giản, symbol là **immutable string** (chuỗi bất biến), thường được dùng để đại diện cho danh tính của đối tượng. Trong lập trình, một object bất biến là một object không thể thay đổi, nó được sinh ra và giữ nguyên giá trị cho đến khi bị destroy.

![](https://images.viblo.asia/d9fc1b5d-ffe5-4aba-ada9-75e1d0817231.png)

Ví dụ trên cho ta thấy, giá trị biến `str` là một String có thể thay đổi bằng cách cộng chuỗi để được một string mới. Nhưng không thể làm điều tương tự với biến `sym` là một Symbol, bởi vì Symbol là một object bất biến.

### Tại sao lại là Symbol mà không phải là String?

Bản chất bất biến của Symbol khiến cho chúng rất có giá trị trong lập trình, bởi vì khi làm việc với những object có thể thay đổi sẽ rất dễ phát sinh các bug khó phát hiện. Vì vậy sử dụng Symbol thay vì String sẽ hạn chế được vấn đề này.

Một sự khác biệt đáng kể khác giữa String và Symbol là cách chúng được lưu trữ trong bộ nhớ.

![](https://images.viblo.asia/b06bb8e4-2dad-4b27-b78f-92866e0e345e.png)

Dễ thấy, mỗi khi một String được khai báo, nó sẽ được cấp phát một vùng nhớ mới, mặc dù trước đó đã tồn tại một chuỗi y hệt. Tuy nhiên với Symbol thì ngược lại, một symbol được khai báo sẽ được cấp phát một vùng nhớ, và chúng sẽ tồn tại ở đó, sau đó chúng ta có khai báo thêm các symbol y hệt, thì nó vẫn sẽ dùng giá trị đã tồn tại trước đó chứ không cấp phát vùng nhớ mới.

![](https://images.viblo.asia/a5fae1e9-4f44-44f6-8549-0fa92a493549.png)

String có thể làm giảm performance của chương trình nếu các String được tạo ra và hủy liên tục trong khi chúng ta hoàn toàn có thể tận dụng những chuỗi có giá trị giống nhau.

Vì vậy, tùy vào trường hợp cụ thể, nếu có thể hãy sử dụng Symbol thay vì String để cải thiện hiệu quả của chương trình

### Khi nào thì sử dụng Symbol

Jim Weirich - người phát minh ra Rack tóm tắt cách sử dụng khác nhau giữa String và Symbol như sau: **"Nếu nội dung văn bản của đối tượng là quan trọng, hãy sử dụng String. Nếu danh tính của đối tượng là quan trọng, hãy sử dụng Symbol"**

Symbol tỏ ra có ích khi bạn cần một mã định danh duy nhất để lưu giữ một giá trị, ví dụ như một key trong hash. Nếu bạn sử dụng String cho key của hash thì những cái key này sẽ khác nhau về object cũng như nơi lưu trữ trong bộ nhớ.

![](https://images.viblo.asia/d91c6507-008d-435f-b11e-b54a6878ea21.png)

Ở đây h1 và h2 đều sử dụng key là `"name"` nhưng key này lại được lưu ở các vùng nhớ khác nhau. Điều này sẽ trở nên tồi tệ nếu chương trình phình to ra. Để giải quyết vấn đề này thì hãy sử dụng Symbol cho key của hash

![](https://images.viblo.asia/2c3be540-b775-4898-a921-c5e43a1edc52.png)

*Tuy nhiên vấn đề về key String của Hash nêu trên đã được Ruby xử lý từ version 2.2.0. Tất cả các key trong hash đều được .freeze và tái sử dụng thay vì cấp phát vùng nhớ mới, [https://ruby-doc.org/core-2.2.0/Hash.html#method-i-store-label-Element+Assignment](https://ruby-doc.org/core-2.2.0/Hash.html#method-i-store-label-Element+Assignment)*

Một ví dụ khác sử dụng Symbol là danh tính của đối tượng trong Ruby là getter và setter methods

```ruby
class MyClass
  attr_accessor :name
end

obj = MyClass.new
obj.name = "CanhLQ"
obj.name
=> "CanhLQ"
```

Nếu một giá trị không cần sự thay đổi, hãy sử dụng Symbol thay vì String.

Hi vọng các bạn hiểu rõ hơn về Symbol và String trong Ruby. Thank for your reading!

Bài viết tham khảo từ: https://medium.com/@lcriswell/ruby-symbols-vs-strings-248842529fd9