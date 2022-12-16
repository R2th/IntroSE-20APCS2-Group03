- Bài viết được dịch từ bài [The Arguments Forwarding shorthand in Ruby 2.7](https://medium.com/rubycademy/the-arguments-forwarding-shorthand-in-ruby-2-7-af32d58c223b) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/700/0*l_dH4e79UGicD44s)

-----
> Cách toán tử 3 chấm `...` có thể được sử dụng để tự động chuyển tiếp các đối số đến một lệnh gọi phương thức khác.

Trong Ruby, xảy ra trường hợp một phương thức chuyển tiếp trực tiếp các đối số tới một phương thức khác.

```ruby
class Exporter
  def self.run(*args, **kwargs, &blk)
    new(*args, **kwargs, &blk).execute
  end

  def initialize(*args, **kwargs, &blk)
  end

  def execute
  end

  private_class_method :new
end

Exporter.run(1, 2, 3, foo: :bar)
```
Ở đây, chuyển tiếp  `*args, **kwargs, &blk` là không cần thiết và nó ảnh hưởng đến khả năng đọc của mã. Để khắc phục vấn đề này, Ruby 2.7 đã giới thiệu *tốc ký chuyển tiếp đối số*:
```ruby
class Exporter
  def self.run(...)
    new(...).execute
  end

  def initialize(*args, **kwargs, &blk)
    p args, kwargs
  end

  def execute
  end

  private_class_method :new
end

Exporter.run(1, 2, 3, foo: :bar) # => args = [1,2,3], kwargs = {foo: :bar}
```
Trong ví dụ trên, mọi thứ được chuyển đến `Exporter.run` sẽ được chuyển tiếp sang `new`. Khi `new` gọi `initialize` thì `Exporter#initialize` sẽ nhận tất cả các đối số được chuyển đến lệnh gọi của `Exporter.run`.

Bây giờ, điều gì sẽ xảy ra nếu như `Exporter.run` cần thao tác các đối số để khởi tạo đúng *exporter*?
```ruby
class Exporter
  def self.run(type, ...)
    CSVExporter.new(...).execute if type == :csv
  end

  def initialize(*args, **kwargs, &blk)
    p args, kwargs
  end

  def execute
  end

  private_class_method :new
end

class CSVExporter
  def execute
    # CSV export implementation
  end
end

Exporter.run(:csv, foo: :bar)
```
kết quả:
```
syntax error, unexpected def self.run(type, ...)
                                            ^^^
```

Thật vậy, các đối số chuyển tiếp tốc ký không thể trộn lẫn với các đối số khác và nó cũng không thể bị hủy.

Việc cải tiến tính năng ở trên đang được thảo luận kể từ tháng 12 năm 2019.

---

Vì vậy, ***điều gì sẽ xảy ra nếu bạn vẫn muốn thao tác các đối số trước khi chuyển tiếp*** chúng đến một cuộc gọi phương thức khác?

Ý định: trong phương thức `Exporter.run`, chúng ta khai báo một `proc` có 2 đối số:

* `*_`: đối số thông thường (không sử dụng trong block)
* `**kwarg`: các đối số dưới dạng *keywords* 

Trong block này, chúng ta kiểm tra xem *type* được truyền làm đối số từ khóa có được `Exporter` đưa vào whitelisted hay không. Nếu vậy, chúng ta khởi tạo exporter phù hợp bằng cách chuyển tiếp tất cả các đối số sử dụng viết tắt *Argument Forwarding shorthand* — chúng ta khởi tạo `Exporter::CSVExporter` trong trường hợp này. Cuối cùng, chúng ta gọi phương thức `generate_export ` trên đối tượng exporter đã khởi tạo.

Block được chuyển tới proc của chúng ta có thể thao túng các đối số vì *Argument Forwarding shorthand* được chuyển để `call`. Vì vậy, các đối số để `call` được truyền trực tiếp làm các đối số của block. (đoạn này chả hiểu gì)

---

To be continue ... **Cập nhật với: Ruby 3**
hỗ trợ các đối số đầu tiên
```
def method_missing(meth, ...)
  send(:"do_#{ meth }", ...)
end
```