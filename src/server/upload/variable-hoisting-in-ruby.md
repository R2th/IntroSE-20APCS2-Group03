Bạn là một ruby developer, bạn đã làm việc với ruby đã nhiều năm hay nhiều dự án khác nhau, nhưng đã bao giờ bạn nghe thấy hay tìm hiểu về thuật ngữ   "Hoisting" trong ruby bao giờ chưa ? Hôm nay mình và các bạn sẽ đi tìm hiểu về thuật ngữ  "Hoisting" hay gọi cách khác là Variable hoisting in Ruby
. Trước khi đi vào bài viết thì mình muốn chia sẻ một chút rằng, tại sao mình lại viết bài về nội dung này, vì trong một dự án mà mình đang phát triển mình đã gặp phải một bài toán hết sức khó hiểu và mất khoảng vài giờ nghiên cứu và tìm hiểu thì mình đã tìm ra câu trả lời và biết được về thuật ngữ Variable hoisting in Ruby. Sau đây mình sẽ chia sẻ tới các bạn về vấn đề mình đã gặp phải và cơ chế của Hoisting trong ruby.

![](https://images.viblo.asia/cefbf168-6967-4243-9bc7-0ee3a07959a0.jpeg)

# 1. Hosting là gì ?

What is hoisting?  dịch sang tiếng việt là "Cẩu hàng" thật khó hiểu và khó để có thể nói rõ hàm ý của thuật ngữ này 

Khi nói về khả năng lưu trữ biến trong ruby, về cơ bản nó là cơ chế của ngôn ngữ,  trong bối cảnh của Ruby, khai báo và định nghĩ các biến đối với chúng ta thì không có gì là khó hiểu và mới mẻ phải không ạ, chắc hẳn ai cũng đã nắm rõ được những kiến thức cơ bản này, nhưng có một vài điều kỳ quặc mà trong Ruby mà bạn nên biết.

 
# 2.  Bit of weirdness

Tôi có một đoạn code ví dụ như sau, tạo 1 file và thực hiện đoạn mã: 

```ruby 
# weird_1.rb
puts x
```

và rõ ràng rồi ở đây chúng ta sẽ có một lỗi, chắc chắn rằng `x` ở đây sẽ chưa được khởi tạo và sẽ có lỗi xảy ra:

```ruby
NameError: undefined local variable or method `x' for main:Object
```

Điều này là dĩ nhiên rồi phải không, nhưng hãy khoan và xem tiếp nhé :

Tiếp theo tôi sẽ thử 1 đoạn mã khác như sau :

```ruby
# weird_2.rb
if true
  x = 1
end
puts x
```

ở đây giá trị của biến `x` sẽ là 1 nhưng chúng ta mong đợi , và đây giờ hay xem nhé :

Khi tôi thay đổi đoạn mã 1 chút thành:
```ruby 
# weird_3.rb
if false
  x = 1
end
puts x
```

Điều gì sẽ xảy ra ở đây ??? báo lỗi rằng:
```ruby 
NameError: undefined local variable or method `x' for main:Object
```

hay nil, hay có thể là 1 , nếu bạn chúng ta chạy đoạn mã này thì giá trị của x ở đây chúng ta sẽ nhận được là `nil`  thật khó hiểu phải không ?
nếu bạn không tin điều đó hay thử như sau :

```ruby
# weird_4.rb
puts x.class
#=> NilClass
```

bạn thấy không, nếu chúng ta gọi một biến không xác định thì kết quả chúng ta sẽ nhận được một mã lỗi `NameError`. Thế nhưng, chúng ta khai báo một biến và xác định biến đó trong phần mã sẽ không được chạy, thì chúng ta sẽ nhận được một giá chị là `nil` hay vì đó là một mã lỗi `NameError`.

Thật khó hiểu chuyện gì đang xảy ra ở đây =)). Quay lại trường hợp mà tôi đã gặp phải :
 
 
 đoạn mã của tôi như sau:
 
 ```ruby
     if file_type == :PDF
        page_count = Pdfinfo.new(in_data[:up_file].path).page_count
      end
      @example.update_columns(pages: Pdfinfo.new(file.path).page_count)
 ```

 như một cách bình thừogn trong trường hợp này nếu `file_type` kia không có giá trị là `PDF` mà một bất kỳ giá trị nào khác thì 
 biến `page_count` khi không được khởi tạo và ngay sau đó dòng `update` sẽ gây ra lỗi khi biến  `page_count` chưa được định danh, nhưng không nó vẫn update một cách mượt mà và chẳng có điều gì xảy ra ở đây cả. Điều này khiến tôi và mọi người trong team hết sức ngạc nhiên và khó hiểu, để tìm đáp án cho sự ngạc nhiên này mà chúng tôi đã biết đến khái niệm hay thuật ngữ `Hoisting` hay `Variable hoisting` trong ruby. Ở đây các bạn có thể hiểu một cách đơn giản như sau :
 + Trường hợp này sẽ xảy ra đồng thời (type check pass) nên về thực thế biến này sẽ được khởi tạo ở đầu trương trình, nôm na hơn một chút tức là: 
   Mặc dù mình viết code đến dòng 999 mới khởi tạo biến X, nhưng trên thực tế, khi chạy trương trình, biến X đã được khởi tạo ngay từ dòng 1.
  <hr>
 Còn đây  sẽ là trường hợp sẽ gây ra lỗi như một cách bình thường chúng ta suy nghĩ : 
  
  ```
If something 
  x = 2
else 
  x += 1
end
```

ở case này,  biến chỉ ko khởi tạo nếu nó nằm trong 2 nhánh code ko bao giờ xảy ra đồng thời, và sẽ gây ra lỗi trương trình.

# 3. Tổng Kết

Nghe có vẻ hơi khó tin nhưng thực sự nó không quá phứ tạp như mọi người nghĩ. Tuy nhiên có thể đây là điều kỳ quặc mà chúng ta hầu hết chưa từng gặp phải, "magic" ở đây được thực hiện bởi trình phân tích của Ruby.

Về cơ bản, khi trình phân tích cú pháp chạy qua mệnh đề IF trước tiên nó sẽ khai báo biến cho dù rằng nó có thực sự được thực thi hay không, có nghĩ là khi chương trình thấy x = 1, nó sẽ thực sự khai báo biến bằng cách gán cho nó bằng `nil` để trình thông dịch tìm ra liệu dòng x = 1 có bao giờ được thực thi hay không. Và một điều chú ý rằng, đừng nhầm lẫn giữa trình phân tích cú pháp với trình thông dịch. Trình phân tích cú pháp nó không hề quan thêm liệu `x` có bao giờ nhận giá trị nil hay không. Công dụng của trình phân tích cú pháp chỉ là xem qua mã, tìm bất kỳ biến cụ bộ nào và phân bổ "Không Gian" cho các biến đó. Ở mặt khác trình thông dịch sẽ đi theo đường logic của chương trình và xem liệu khi nào `x` sẽ nhận một giá trị và hành động trên nó. Và cuối cùng không kém quan trọng , nếu như bạn biết và tính năng lưu trữ trong JS, điều đáng nói là tính năng lưu trữ của RUBY khác nhiều. Trong RUBY, mọi biến chỉ có sẵn sau dòng mà biến đã được gán, bất kể rằng dòng đó có được thực thi hay không.