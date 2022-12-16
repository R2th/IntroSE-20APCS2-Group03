> Cha Matz đẻ ra cái ruby cho phép thực thi meta-programming,
> 
> món này được cái là code ăn xổi dễ chơi dễ trúng thưởng,
> 
> code ngắn gọn và cool ngầu,
> 
> vào tay các đấng tay to thì như phép màu kì diệu,
> 
> còn đa phần để lại một mùi thum thủm khó quên.
> 
> Ơ vậy thì tóm lại là dùng hay không ta?

### Monkey Patching


-----


Hay còn được gọi là kĩ thuật "Open Class", mục đích cơ bản là thêm hoặc thay đổi hành vi của một class ở __run-time__. 
Ví dụ:



- Tôi có 1 đoạn code:
```ruby

    a = 1.to_s            # "1"
    b = 2.to_s            # "2"
    (a + b).to_i == 12    # true

```

- Tôi có 1 yêu cầu:
```ruby

    # hiển thị kết quả thành "_1_" đê!
    1.to_s   # "_1_"

```
- Tôi monkey-patch:

```ruby

    class Fixnum
      def to_s
        # thêm _ vào đầu và cuối kết quả
      end
    end

```

- Bùm! Nát code
```ruby

    a = 1.to_s           # "_1_" => ngon
    b = 2.to_s           # "_2_" => vẫn ngon!
    (a + b).to_i == 12   # false => :v ....

```

Cái vấn đề của monkey patching: do ảnh hưởng của nó là global nên sẽ dẫn đến trường hợp sửa chỗ này thì hỏng chỗ nọ, hay một ngày đẹp trời include thêm một thư viện xịn xịn vào project và mọi thứ rối tung lên, chỉ đơn giản là họ cũng dùng monkey patch cùng tên.
Vậy nên, một là sử dụng monkey patch một cách cẩn thận và chắc cú không bị xung đột với ai hết (khó), hoặc là dùng cái dưới đây.

### Decorator Pattern


-----



Đơn giản là gói class cần mở rộng vào một class mới, rồi thêm mọi thay đổi vào class mới đó, như vậy là nước sông không phạm nước giếng

```ruby

class MyFixnum < SimpleDecorator # built-in ruby
   def to_s
     # thêm _ vào đầu và cuối kết quả
   end
end

```

Như vậy, ta có thể sử dùng hàm mới như sau:
```ruby

a = MyFixnum.new(1).to_s  # "_1_" => ngon
b = MyFixnum.new(2).to_s  # "_2_" => vẫn ngon!
(a + b).to_i == 12        # true  => tuyệt vời!!

```


### Kết


-----

Monkey-patching là một kỹ thuật tuyệt vời, nó giúp ta thay đổi code dễ dàng hơn.

Tuy nhiên bên cạnh đó các thay đổi đều có tính global nên cũng khá nguy hiểm khi sử dụng, vì vậy hãy cân nhắc sử dụng decorator để tránh khỏi các tiềm ẩn gây lỗi về sau.

Ngoài ra thì cứ dùng monkey-patch nhưng viết document cẩn thận cũng là một cách hay, nhưng như vậy sẽ phải để ý thật kỹ mỗi khi thêm thư viện ngoài vào project.


### Extra


-----



* Class SimpleDelegator có từ đời ruby 1.9
* Monkey-patch hiện đã được thêm cơ chế `refine`, tuy được hứa hẹn là giúp monkey-patch an toàn hơn, nhưng do quá rối rắm nên đã bị lãng quên.
* Monkey-patch được sử dụng tương đối nhiều trong Rails, ví dụ như là Hash#slice, Object#present?, Time#zone etc.
* Gem tiêu biểu sử dụng decorator pattern là [Draper](https://github.com/drapergem/draper), dùng để decorate các view helpers, có thể include thằng này thoải mái mà không sợ bị hỏng patch đã viết từ trước.