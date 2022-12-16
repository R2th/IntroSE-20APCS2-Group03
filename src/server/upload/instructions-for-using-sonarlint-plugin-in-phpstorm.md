# **1.Introduction**
**SonarLint** là một plugin giúp bạn phát hiện và khắc phục các vấn đề về chất lượng khi bạn viết code.
Nó cung cấp thông tin cho bạn hiểu các vấn đề được tìm thấy và giải thích tại sao nó là một vấn đề. Đối với các bạn mới lập trình hay đã có kinh nghiệm nên sử dụng **plugin** này để hiểu và viết mã tốt hơn.

Đối với các dự án, nên áp dụng **SonarLint** vào dự án như một phần trong **checklist** để giảm thiểu thời gian review code, tránh các lỗi không cần thiết, nâng cao chất lượng dự án.

Để đọc thêm tài liệu thì có thể truy cập tại đây [SonarLint](https://www.sonarlint.org/)

**IDE** và ngôn ngữ lập trình được hỗ trợ:

### Eclipse
* Java
* JavaScript
* PHP
* Python

### IntelliJ IDEA
* Java
* JavaScript
* Python
* Kotlin
* Ruby
* PHP

### Visual Studio
* JC#
* VB.Net
* C/C++
* JavaScript

### VS Code
* JavaScript
* TypeScript
* HTML
* PHP
* Python
* Apex
# **2.Prerequisites**
Ở bài viết này mình sẽ install **SonarLint** plugin trên **Phpstorm** nhé , nên cần phải install **IDE** này trước!

Link [download](https://www.jetbrains.com/phpstorm/download/#section=linux) tại đây 
# **3.Getting Started**
### Install SonarLint plugin
Khởi động **Phpstorm** , **vào File -> Settings ->Plugins**

![](https://images.viblo.asia/743f9df1-3a43-44f4-9c65-f78a5359d148.png)

Tiếp theo tiến hành **install** và khởi động lại **Phpstorm**, dưới góc trái của IDE sẽ xuất hiện  dòng chữ  **SonarLint** như hình ảnh sau:

![](https://images.viblo.asia/a4b1c0d6-5c3e-4995-b70a-cdccb799496a.png)

# **4.Testing**
Bây giờ sẽ là phần bá đạo nhất của plugin này nhé! 
```
function check($scp, $uid)
{
    if (Auth::user()->hasRole('admin')) {
        return true;
    } else {
        switch ($scp) {
            case 'public':
                return true;
                break;
            case 'private':
                if (Auth::user()->id === $uid)
                    return true;
                break;
            default:
                return false;
        }
        return false;
    }
}
```

Tiếp theo hãy nhấn vào dòng chữ **SonarLint**  ở phía dưới góc trái màn hình

![](https://images.viblo.asia/66fb36b9-6ea3-4dfe-87cb-13327bb6ec01.png)

 **SonarLint**  sẽ phân tích đoạn code trên và gợi ý cho bạn cách khắc phục các vấn đề mà nó phát hiện được.
 
1. Control structures should use curly braces
2. Functions should not contain too many return statements

Khi bạn rê chuột lên chỗ màu vàng **Sonarlint** đánh dấu, bạn sẽ thấy gợi ý giải thích cho bạn biết bạn sao nó là vấn đề.

![](https://images.viblo.asia/9f9ca176-d8f4-4fb8-ad52-5553f47e6089.png)

Khi bạn click vào dòng màu vàng **Sonarlint** đánh dấu, bạn sẽ thấy icon bóng đèn màu vàng, điểm sáng gợi ý cách sữa  vấn đề đó. 

![](https://images.viblo.asia/7204dda1-7d1d-4065-be6e-3d43fcf5a74d.png)

Trên đây là những chia sẻ cơ bản về sử dụng **SonarLint**. Còn rất nhiều vấn đề khác, các bạn có thể tìm hiểu thêm trong quá trình code. Nếu bạn chưa cài plugin **SonarLint** thì nên cài ngay bây giờ để áp dụng vào việc học lập trình cũng như áp dụng vào dự án. Mình đảm bảo các bạn sẽ nhận được rất nhiều điều hay từ nó.