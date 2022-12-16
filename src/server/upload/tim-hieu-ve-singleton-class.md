I. Khái niệm 
Ví dụ: 
```
foo = String.new
foo.class #String
foo.length # 0
foo.tan # NoMethodError
```
Ở đây ta tạo đối tượng foo thuộc lớp String, sau đó ta gọi được phương thức "length", nhưng với phương thức "tan" sẽ thông báo NoMethodError

Đến với ví dụ tiếp theo
```
 foo = String.new
 def foo.tan
     puts "My name's Tan"
 end
 foo.tan # My name's Tan
```
 
 Ở đây ruby tìm ra được phương thức "tan". Câu hỏi đặt ra phương thức này thuộc lớp nào
 Câu trả lời cho câu hỏi này là khi ta tạo một Object từ một class, sẽ có một lớp nằm ở giữa được gọi là Singleton Class được sinh ra, 
 và khi ta thực hiện foo.tan thì có nghĩa là ta đang thêm một Method có tên là "tan" và singletonclass của Object foo thuộc Class String
 
 II. Để hiểu rõ ví dụ trên ta có thể nhìn vào sơ đồ bên dưới
 ![](https://images.viblo.asia/0d4901eb-fc8a-4870-9ce5-3b6c4d6b9d2f.png)
 III. Cách tạo singleton method 
 Với module
```
 module Cin
  def cin
    "Tam biet!"
  end
end

foo = String.new
foo.extend Cin
foo.cin    => "Tam biet!
```

Mở singleton class
```
foo = String.new
class << foo
  def cin
    "Tam biet!"
  end
end
foo.cin   => "Tam biet!"
```

Đặt tên trực tiếp
```
foo = String.new
def foo.cin
   "Tam biet!"
end
foo.cin	=> "Tam biet!"
```
IV. Kết luận
Phần tìm hiểu của mình về singleton_class còn khá là sơ sài và có thể mình cũng chưa hiểu chính xác. Mong mọi người góp ý để bài viết trở nên hữu ích hơn nữa.

Cảm ơn sự quan tâm của mọi người dành cho bài viết.

Tài liệu tham khảo
[(https://viblo.asia/p/nhung-ung-dung-thuc-te-cua-singleton-class-trong-ruby-4P856g71KY3)]