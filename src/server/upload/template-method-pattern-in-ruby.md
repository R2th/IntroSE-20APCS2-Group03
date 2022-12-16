# Template Method pattern là gì?
Template Method pattern cho phép chúng ta định nghĩa một **khung xương** của một thuật toán, trong khi đó việc triển khai lại nằm ở các Class kế thừa.
Template Method cũng cấp các bước cần thiết để hoàn thành một công việc nào đó. Bản thân nó sẽ thực hiện bất kỳ step mà không thay đổi. Các Class con sẽ thực hiện các bước còn thiếu. và có sự thay đổi.
![](https://images.viblo.asia/b039985c-878d-47ad-beaa-3df595f343d6.png)

Nó thực sự là pattern đơn giản, chỉ đơn thuần là là class con tận dụng các method từ các class cha, và có thể override chúng theo ý muốn.

# Khi nào thực áp dụng nó ?
Nó thật sự hữu ích, bất cứ lúc nào bạn có một thuật toán, thuật toán đó có một hoặc nhiều steps cần thay đổi, hoặc khi bạn có 2 thuật toán khá giống nhau chỉ các khau một hoặc hai step.

# Một ví dụ cụ thể nhé :D
Giả sử có một task bảo chúng ta phải viết code để tạo ra một bản report cho công ty và sau đó gửi email đến cho các bên liên quan với format HTML.
Nó sẽ dc thực hiện như sau: 
```
class Report
  def generate_report!
    retrieve_financial_data
    format_report
    send_to_stakeholders
  end

  private

  def retrieve_financial_data
    # thực hiện việc lấy data
  end

  def format_report
    # lấy data và sắp xếp với format HTML
  end

  def send_to_stakeholders
    # gửi mail để các bên liên quan.
  end
end
```

Nó thật sự đơn giản và làm việc tốt cho đến khi một yêu cầu mới xuất hiện. Không phải tất cả các bên liên quan để đọc với format HTML, mà họ thích plain text hơn. 
Vâng, chúng ta cần chỉnh sửa lại để nó có thể hỗ trợ thêm format. Class của chúng ta có nhiều steps để thực hiện, và cái chúng ta cần thay đổi là ở format_report step.
Để hoàn thành nó chúng ta sẽ tạo biến nó thành class abstract bằng việc raising một error nếu class kế thực không thực hiện step đó. 
Chúng ta thay đổi như sau:

```
class ReportTemplate
  def generate_report!
    retrieve_financial_data
    format_report
    send_to_stakeholders
  end

  private

  def retrieve_financial_data
    # lấy data và sắp xếp với format HTML
  end

  def format_report
    raise NotImplementedError
  end

  def send_to_stakeholders
    # gửi mail để các bên liên quan.
  end
end
```

Chúng ta sẽ tạo một cặp class con kế thừa là thực hiện

```
class TextReport < ReportTemplate
  def format_report
    # sắp xếp data vào trong plain text report
  end
end

class HTMLReport < ReportTemplate
  def format_report
    # sắp xếp data vào trong HTML report
  end
end
```

Bầy giờ bất cứ client nào của report để có thể call TextReport hoặc HTMLReport phụ thuộc vào version họ muốn. Với cách design này có có thể đơn giản hơn và an toàn hơn để thay đổi trong tương lai.
Cấu trúc của chúng ta sẽ như sau: 
![](https://images.viblo.asia/c90a9c09-2635-4837-b431-121d5134a578.png)

# Tóm lại :
Template Pattern giúp chúng ta thể hiện sự liên quan phục thuộc code cụ thể rõ ràng hơn. và dễ dàng thay đổi và an toàn hơn trong tương lai.
Template Pattern khá mạnh mẽ để giữ code của chúng ta SOLID và DRY. Nó tốt khi bạn có một thuật toán cần thay đổi nhưng chỉ một phần tạo một context khác.