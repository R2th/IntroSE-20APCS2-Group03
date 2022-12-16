Chắc hẳn Design Patterns không còn xa lạ gì với dân code nữa, bài này mình tổng hợp một số mẫu Creational Pattern và cách ứng dụng nó vào trong code ruby.
## Template Method Pattern
### Problem
Mìnhnh có một đoạn code phức tạp, nhưng có một chút cần thay đổi.
### Solution
Ý tưởng chung của Template Method Pattern là xây dựng một `abstract base class` với `skeletal method`,  xử lý những chỗ cần thay đổi bằng cách thực hiện các cuộc gọi đến các `abstract methods` được định nghĩa bởi các `subclasses` cụ thể. `Abstract base class` kiểm soát việc xử lý mức cao hơn và các `subclasses` chỉ cần điền vào các chi tiết.

### Example
Giả sử mình phải tạo một báo cáo HTML:
```
class Report
  def initialize
    @title = 'Monthly Report'
    @text = ['Things are going', 'really, really well.']
  end

  def output_report
    puts('<html>')
    puts(' <head>')
    puts("<title>#{@title}</title>")
    puts(' </head>')
    puts(' <body>')
    @text.each do |line|
      puts("<p>#{line}</p>")
    end
    puts(' </body>')
    puts('</html>')
  end
end
```
Sau này, mình phải thêm một định dạng mới: plain text. Mình có thể truyền định dạng dưới dạng tham số và quyết định hiển thị dựa trên nó:
```
class Report
  def initialize
    @title = 'Monthly Report'
    @text = ['Things are going', 'really, really well.']
  end

  def output_report(format)
    if format == :plain
      puts("*** #{@title} ***")
    elsif format == :html
      puts('<html>')
      puts(' <head>')
      puts("<title>#{@title}</title>")
      puts(' </head>')
      puts(' <body>')
    else
      raise "Unknown format: #{format}"
    end
    @text.each do |line|
      if format == :plain
        puts(line)
      else
        puts("<p>#{line}</p>")
      end
    end
    if format == :html
      puts(' </body>')
      puts('</html>')
    end
  end
end
```
Code xử lý cả hai định dạng bị rối và thậm chí tệ hơn, nó không thể mở rộng được (nếu mình muốn thêm một định dạng mới thì sao?).
Phải `refactor code` thôi :(. Trong hầu hết các báo cáo, luồng cơ bản là như nhau bất kể định dạng.  Output header, output title,  output từng dòng của báo cáo và output bất kỳ theo định dạng. Chúng ta có thể tạo một `abstract base class` thực hiện tất cả các bước đó nhưng để lại các chi tiết cho `subclasses`:
```
class Report
  def initialize
    @title = 'Monthly Report'
    @text = ['Things are going', 'really, really well.']
  end

  def output_report
    output_start
    output_head
    output_body_start
    output_body
    output_body_end
    output_end
  end

  def output_body
    @text.each do |line|
      output_line(line)
    end
  end

  def output_start
    raise 'Called abstract method: output_start'
  end

  def output_head
    raise 'Called abstract method: output_head'
  end

  def output_body_start
    raise 'Called abstract method: output_body_start'
  end

  def output_line(line)
    raise 'Called abstract method: output_line'
  end

  def output_body_end
    raise 'Called abstract method: output_body_end'
  end

  def output_end
    raise 'Called abstract method: output_end'
  end
end
```
Sau đó mình có thể định nghĩa một `subclasses` - `PlainTextReport` thực hiện các chi tiết:
```
class PlainTextReport < Report
  def output_start
  end

  def output_head
    puts("**** #{@title} ****")
  end

  def output_body_start
  end

  def output_line(line)
    puts(line)
  end

  def output_body_end
  end

  def output_end
  end
end
```
```
report = PlainTextReport.new
report.output_report
```
## Factory
### Problem
Chúng ta cần tạo các đối tượng mà không phải chỉ định lớp chính xác của đối tượng sẽ được tạo.
### Solution

Factory pattern là một specialization của Template pattern. Mình đầu bằng cách tạo một `base class` nơi mà mình không đưa ra quyết định "lớp nào". Bất cứ khi nào cần tạo một đối tượng mới nó sẽ gọi một phương thức được định nghĩa trong một `subclasses`. Vì vậy, tùy thuộc vào `subclasses` mà mình sử dụng (factory), mình sẽ tạo các đối tượng của class đó (products). 
### Example
Cùng mô phỏng cuộc sống trong một cái ao có rất nhiều vịt:
```
class Pond
  def initialize(number_ducks)
    @ducks = number_ducks.times.inject([]) do |ducks, i|
      ducks << Duck.new("Duck#{i}")
      ducks
    end
  end

  def simulate_one_day
    @ducks.each {|duck| duck.speak}
    @ducks.each {|duck| duck.eat}
    @ducks.each {|duck| duck.sleep}
  end
end

pond = Pond.new(3)
pond.simulate_one_day
```
Nhưng làm thế nào mô hình ao của mình nếu mình muốn có ếch thay vì vịt? Trong phần triển khai ở trên, mình đang chỉ định trong trình khởi tạo của Pond rằng nó nên được lấp đầy bằng vịt. Vì vậy, mình sẽ viết lại nó để quyết định tạo ra loại động vật nào được đưa ra trong một `subclass`:
```
class Pond
  def initialize(number_animals)
    @animals = number_animals.times.inject([]) do |animals, i|
      animals << new_animal("Animal#{i}")
      animals
    end
  end

  def simulate_one_day
    @animals.each {|animal| animal.speak}
    @animals.each {|animal| animal.eat}
    @animals.each {|animal| animal.sleep}
  end
end

class FrogPond < Pond
  def new_animal(name)
    Frog.new(name)
  end
end
```
Cùng tạo một cái ao có 3 con ếch nào :thinking: 
```
pond = FrogPond.new(3)
pond.simulate_one_day
```
## Singleton
### Problem
Chúng ta cần có một instance duy nhất của một lớp nhất định trên toàn bộ ứng dụng
### Solution
Trong mẫu Singleton, quyền truy cập vào hàm tạo bị hạn chế để không thể khởi tạo. Vì vậy, việc tạo ra một instance duy nhất được thực hiện bên trong class và được tổ chức dưới dạng một biến class. Nó có thể được truy cập thông qua một getter trên ứng dụng.
### Example
Cùng xem việc thực hiện một lớp logger:
```
class SimpleLogger
  attr_accessor :level

  ERROR = 1
  WARNING = 2
  INFO = 3
  
  def initialize
    @log = File.open("log.txt", "w")
    @level = WARNING
  end

  def error(msg)
    @log.puts(msg)
    @log.flush
  end

  def warning(msg)
    @log.puts(msg) if @level >= WARNING
    @log.flush
  end

  def info(msg)
    @log.puts(msg) if @level >= INFO
    @log.flush
  end
end
```
Logging là một tính năng được sử dụng trên toàn bộ ứng dụng, do đó, điều hợp lý là chỉ nên có một phiên bản duy nhất của bộ ghi. Mình có thể đảm bảo rằng không thể khởi tạo lớp SimpleLogger hai lần bằng cách đặt hàm tạo của nó thành `private`:
```
class SimpleLogger

  # Lots of code deleted...
  @@instance = SimpleLogger.new

  def self.instance
    return @@instance
  end

  private_class_method :new
end

SimpleLogger.instance.info('Computer wins chess game.')
```
Chúng ta có thể có làm tương tự bằng cách `include` mô-đun Singleton, để tránh trùng lặp mã nếu chúng ta tạo một số singletons:
```
require 'singleton'

class SimpleLogger
  include Singleton
  # Lots of code deleted...
end
```

## Builder
### Problem
Chúng ta cần tạo một đối tượng phức tạp khó cấu hình.
### Solution
The Builder pattern encapsulates the construction logic of complex objects in its own class. It defines an interface to configure the object step by step, hiding the implementation details.
Builder pattern đóng gói logic xây dựng của các đối tượng phức tạp trong class riêng của nó. Nó định nghĩa một interface để configure đối tượng từng bước, ẩn đi các chi tiết thực hiện.
### Example
Hãy tưởng tượng rằng bạn phải xây dựng một hệ thống theo dõi các thành phần của một Computer.
```
class Computer
  attr_accessor :display
  attr_accessor :motherboard
  attr_reader :drives
  
  def initialize(display=:crt, motherboard=Motherboard.new, drives=[])
    @motherboard = motherboard
    @drives = drives
    @display = display
  end
end
```
Việc tạo ra một đối tượng Computer có thể trở nên thực sự phức tạp, ví dụ như Motherboard cũng là một đối tượng:
```
class CPU
  # Common CPU stuff...
end

class BasicCPU < CPU
  # Lots of not very fast CPU-related stuff...
end

class TurboCPU < CPU
  # Lots of very fast CPU stuff...
end

class Motherboard
  attr_accessor :cpu
  attr_accessor :memory_size

  def initialize(cpu=BasicCPU.new, memory_size=1000)
    @cpu = cpu
    @memory_size = memory_size
  end
end
```
Quá trình building  một `Computer` có thể bình phàm như sau :
```
# Build a fast computer with lots of memory...
motherboard = Motherboard.new(TurboCPU.new, 4000)

# ...and a hard drive, a CD writer, and a DVD
drives = []
drives << Drive.new(:hard_drive, 200000, true)
drives << Drive.new(:cd, 760, true)
drives << Drive.new(:dvd, 4700, false)
computer = Computer.new(:lcd, motherboard, drives)
```
Hoặc có thể thực thực hiện đơn giản hơn nhiều bằng cách gói gọn logic building trong một class
```
class ComputerBuilder
  attr_reader :computer

  def initialize
    @computer = Computer.new
  end

  def turbo(has_turbo_cpu=true)
    @computer.motherboard.cpu = TurboCPU.new
  end

  def display=(display)
    @computer.display=display
  end

  def memory_size=(size_in_mb)
    @computer.motherboard.memory_size = size_in_mb
  end

  def add_cd(writer=false)
    @computer.drives << Drive.new(:cd, 760, writer)
  end

  def add_dvd(writer=false)
    @computer.drives << Drive.new(:dvd, 4000, writer)
  end

  def add_hard_disk(size_in_mb)
    @computer.drives << Drive.new(:hard_disk, size_in_mb, true)
  end
end
```

```
builder = ComputerBuilder.new
builder.turbo
builder.add_cd(true)
builder.add_dvd
builder.add_hard_disk(100000)
```
Code mẫu được tham khảo tại http://designpatternsinruby.com/