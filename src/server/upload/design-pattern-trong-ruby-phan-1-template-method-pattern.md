# Design pattern là gì?
Trong lĩnh vực phần mềm, design pattern là một giải pháp có thể được tái sử dụng để giải quyết một vấn đề phát sinh phổ biến khi thiết kế phần mềm. Một design pattern không trực tiếp xử lí hoàn toàn vấn đề, design pattern không phải là một đoạn code. Nó là một đoạn mô tả hay một template cung cấp cho bạn "cách xử lí vấn đề", và nó có thể sử dụng trong nhiều tình huống khác nhau.
Nếu bạn chưa quen với design pattern, chắc hẳn định nghĩa trên sẽ làm khó bạn. Vậy nên chúng ta sẽ tiến thẳng vào nội dung chính: Một vài design pattern và cụ thể là đối với Ruby.
## Template pattern
Hãy tưởng tượng bạn có một đống code phức tạp - có thể chứa thuật toán khó, hoặc một mớ code bù xù, hay đơn giản là một thứ gì đó đủ khó để bạn chỉ muốn code nó một lần duy nhất, sau đó viết vài cái UT và vứt nó ở đấy. Vấn đề là một lúc nào đó, bạn muốn sử dụng lại đoạn code này nhưng muốn đâu đó ở phần giữa của đoạn code phải xử lí khác đi. Đôi khi phải xử lí như thế này, đôi khi phải xử lí như thế kia. Tệ hơn, bạn biết trong tương lai sẽ có thêm một vài trường hợp tương tự. Ví dụ bạn có một đoạn code để in ra Report với định dạng HTML như sau:
```
class Report
    def initialize
        @title = 'Monthly Report'
        @text = [ 'Things are going', 'really, really well.' ]
    end
    
    def output_report
        puts('<html>')
        puts(' <head>')
        puts(" <title>#{@title}</title>")
        puts(' </head>')
        puts(' <body>')
        @text.each do |line|
            puts(" <p>#{line}</p>" )
        end
        puts(' </body>')
        puts('</html>')
    end
end
```
Và yêu cầu nó in report một cách đơn giản
```
report = Report.new
report.output_report
```
**Nhưng không may**, chỉ một vài tháng sau đó, bạn nhận được yêu cầu mới: report không chỉ dưới định dạng HTML mà còn có thể là RTF (plain text). Một giải pháp nhanh gọn sẽ là viết thêm vào classs Report cũ như sau:
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
            puts(" <title>#{@title}</title>")
            puts(' </head>')
            puts(' <body>')
        else
            raise "Unknown format: #{format}"
        end
        @text.each do |line|
            if format == :plain
                puts(line)
            else
                puts(" <p>#{line}</p>" )
            end
        end
        if format == :html
            puts(' </body>')
            puts('</html>')
        end
    end
end
```
Version này sẽ ổn về mặt vận hành, nhưng trông nó không khác gì một cục chỉ rối. Phần code xử lí plain text bị đan xen với phần code xử lí HTML. Tệ hơn, vào một ngày đẹp trời bạn phải xử lí thêm một vài định dạng khác, bạn sẽ lại phải thêm code vào class Report, điều này sẽ rất rủi ro vì bạn sẽ thay đổi code cũ và làm nó trở nên rối rắm hơn. 
Một cách ngắn gọn, nổ lực ban đầu để xử lí thêm định dạng plain text theo cách trên đã vi phạm nguyên tắc của design pattern: **Trộn lẫn code thay đổi vào code không thay đổi**
### Tách những thứ không cần thay đổi ra
Cách để xử lí tình huống trên là thiết kế lại để tách rời code cho các formats khác nhau. Mấu chốt ở đây là chúng ta phải xác định rằng bất kể định dạng nào được hệ thống xử lí - plain text hay HTML, hoặc có thể là PostScript - Cơ bản, Report sẽ giữ nguyên:
1. Output thông tin header, yêu cầu bởi mỗi format nhất định
2. Output tiêu đề
3. Output từng dùng của report
4. Output phần kết nếu có, tuỳ vào định dạng
Với tư duy trên đây là thứ chúng ta cần, một abstrac Report class như sau:
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
 Tất nhiên đây không phải hoàn toàn là abstract class. Đơn giản vì ruby không hỗ trợ abstract class, hay abstract method. Chúng ta chỉ đang dùng cách raise exception để tiếp cận gần nhất với định nghĩa abstract method của các ngôn ngữ khác.
 Sau đó, chúng ta có thể xây dựng các class con để xử lí từng định dạng. Với HTML sẽ là:
 ```
 class HTMLReport < Report
    def output_start
        puts('<html>')
    end
    
    def output_head
        puts(' <head>')
        puts(" <title>#{@title}</title>")
        puts(' </head>')
    end
    
     def output_body_start
        puts('<body>')
    end

    def output_line(line)
        puts(" <p>#{line}</p>")
    end

    def output_body_end
        puts('</body>')
    end

    def output_end
        puts('</html>')
    end
end
 ```
 Còn đây là với version plain text:
 ```
 class PlainTextReport < Report
    def output_start; end

    def output_head
        puts("**** #{@title} ****")
        puts
    end
    
    def output_body_start; end
    
    def output_line(line)
        puts(line)
    end
    
    def output_body_end; end

    def output_end; end
end
 ```
 Sử dụng chúng như sau:
 ```
 report = HTMLReport.new
report.output_report

report = PlainTextReport.new
report.output_report
```
Khi cần thêm format mới bạn chỉ cần thừa kế từ class Report và chỉnh sửa các method của nó. Việc này sẽ không ảnh hưởng tới các format có sẵn.
Chúng ta có sơ đồ cho Template Method pattern như sau:
![image.png](https://images.viblo.asia/53ab3855-2e9a-4012-bedf-f158169ac862.png)

Cơ bản sẽ có một hoặc nhiều method template, chính là method output_report trong ví dụ trên. Sẽ đóng vai trò xử lí logic. Các method còn lại (các method cần được override) sẽ là các hook method, chúng sẽ được xử lí khác nhau đối với từng class con, và nhiệm vụ của các developer đến sau sẽ chỉ là tạo subclass và viết lại các method này. 
### Vậy lúc nào nên sử dụng Template pattern?
Một vài bài viết và sách mình đã đọc qua chỉ đề cập ở mức độ chung chung như: "Bạn nên code thứ gì đấy general hơn là specific". Chứ không hề nói rõ. Ví dụ như:
- Thay vì ```class Car < Object```. Ta chuyển thành ```class Car < Vehicle``` và ```class Vehicle < Object```
- Hoặc có thể hơn thế ```class Vehicle < MovableObject``` và ```class MovableObject < Object```
Theo bản thân mình nghĩ mức độ áp dụng Template pattern là tuỳ vào trường hợp, tình huống. Chỉ cần tránh lạm dụng -  tránh bắt buộc subclass phải cung cấp quá nhiều method là được
## Tổng kết
Vậy là chúng ta đã tìm hiểu xong design pattern đầu tiên, và có lẽ cũng là cái đơn giản nhất trong bộ design pattern mà mình muốn giới thiệu trong series này. 
Tóm lại, Template pattern đơn giản là một cách để linh hoạt áp dụng một thuật toán, quy trình xử lí cho nhiều phần code ở nhiều chỗ khác nhau bằng cách gói gọn thuật toán, quy trình xử lí đấy trong một class base, và sử dụng nó thông qua các subclasses. Hãy hiểu như thế này: class base đơn giản chỉ cung cấp quy trình, còn phương thức xử lí sẽ do các subclass quyết định. 
Trên đây là toàn bộ về Template pattern.
Cảm ơn các bạn đã đọc đến đây. Hẹn gặp lại các bạn ở các design pattern khác ở các bài viết tiếp theo
### Nguồn tham khảo 
- Sách Design Patterns in Ruby của tác giả Russ Olsen