### Giới Thiệu
### 1. SOLID là gì?
Trong OOP có 4 tính chất đặc biệt: trừ tượng, đóng gói, đa hình và kế thừa. Hầu hết lập trình viên đều đã biết các tính chất này của OOP, nhưng cách thức để phối hợp các tính chất này với nhau để tăng hiệu quả của ứng dụng thì không phải ai cũng nắm được. Một trong những chỉ dẫn để giúp chúng ta sử dụng được OOP hiệu quả hơn đó là nguyên tắc SOLID. Về cơ bản, SOLID là một bộ 5 chỉ dẫn đã được nhắc tới từ lâu bởi các nhà phát triển phần mềm giúp cho developer viết ra những đoạn code dễ đọc, dễ hiểu, dễ maintain, được đưa ra bởi Bob Martin và Michael Feathers.

SOLID là viết tắt của 5 chữ cái đầu trong 5 nguyên tắc:
* Single responsibility priciple (SRP)
* Open/Closed principle (OCP)
* Liskov substitution principe (LSP)
* Interface segregation principle (ISP)
* Dependency inversion principle (DIP) 

### 2. Nguyên tắc trách nhiệm đơn lẻ (Single Responsibility Principle)
Một class chỉ nên thực hiện một công việc. Nói cho dễ hiểu thì một class chỉ nên thực hiện một công việc, thay vì thực hiện nhiều việc trong một class thì chúng ta có thể cho mỗi class thực hiện một công việc.
```
class Blogger{
    public void writerblog(){
        writer();
    }
    public void readblod(){
        read();
    }
}
```
Với việc chia nhỏ ra ta thấy ta có thể dễ dàng gọi đến lớp tương ứng với từng công việc, nó cũng dễ hơn khi maintain code và không phải sửa ở lớp chính quá nhiều, các đối tượng đã được tách biệt hoàn toàn về nhiệm vụ.
```
class writerblog{
    public void writer(){
    }
};
class readblog{
    public void read(){
    }
};
```
### 3. Nguyên tắc đóng mở (The Open-Closed Principle)
Theo nguyên tắc này mỗi khi ta muốn thêm chức năng cho chương trình, chúng ta nên viết class mới mở rộng class cũ bằng cách kế thừa hoặc sở hữu class cũ chứ không nên sửa đổi class cũ. Việc này dẫn đến tình trạng phát sinh nhiều class, nhưng chúng ta sẽ không cần phải test lại các class cũ nữa, mà chỉ tập trung vào test các class mới, nơi chứa các chức năng mới.

Ví dụ khi trang web muốn tăng một số cơ chế nhuận bút mới chúng ta thường sẽ thêm thuộc tính cho class Blogger
```
class Blogger{
    private string name;
    private int post;
    int pasalary(){
        if(this->post == 3)
            return salary;
         if(this->post == 4)
            return salary * 1.2;
         if(this->post == 5)
            return salary * 1.5;
    }
}
```
Theo cách làm trên hoàn toàn đúng. Tuy nhiên, nếu bạn thiết kế chương trình như thế này thì thực sự có nhiều điểm không hợp lí lắm, nếu chúng ta lại có thêm 1 kiểu nhuận bút nữa thì sao, khi đó chúng ta lại phải vào sửa lại hàm để đáp ứng dược nhu cầu mới hay sao? Code mới lúc đó sẽ ảnh hưởng tới code cũ, như vậy có khả năng là sẽ làm hỏng luôn code cũ, …

Rõ ràng là chúng ta nên có một phương pháp an toàn và thân thiện hơn. 
```
Class Blogger{
       private string name;
       private int post;
       int paysalary(){
           return salary;
       }
}
class Postedfourposts extends Blogger{
    int paysalary(){
        return salary * 1.2;
    }
}
```
Có thể thấy rằng, cách thiết kế này làm cho lớp Blogger trở nên: ĐÓNG với mọi sự thay đổi bên trong, nhưng luôn MỞ cho sự kế thừa để mở rộng sau này. Trong tương lai, khi nhu cầu mở rộng chương trình xuất hiện, có thêm nhiều đối tượng nữa cần xử lí thì chúng ta chỉ cần thêm lớp mới là sẽ giải quyết được vấn đề, trong khi vẫn đảm bảo được chương trình có sẵn không bị ảnh hưởng, nhờ đó mà hạn chế được phạm vi test, giúp giảm chi phí phát triển. Đó cũng là một trong những lợi ích ở khía cạnh dễ bảo trì sản phẩm.

### 4. Nguyên tắc phân vùng Liskov (The Liskov Substition Principle)
Nội dung nguyên tắc này là: Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình. 

Ví dụ khi ta muốn viết một chương trình để mô tả các loài chim bay được nhưng chim cánh cụt không bay được. Vì vậy khi viết đến hàm chim cánh cụt thì khi gọi hàm bay của chim cánh cụt, ta sẽ quăng NoFlyException.
```
public class Bird{
    public virtual void Fly() {Console.Write("Fly");}
}
public class Eagle{
    public override void Fly() {Console.Write("Eagle Fly");}
}
public class Penguins{
    public override void Fly() { throw new NoFlyException(); }
}
```
Tuy nhiên, quay laị vòng lặp for ở hàm main, nếu như trong danh sách các con chim đó mà có một con chim cánh cụt thì sao? Chương trình mình sẽ quăng Exception vì chương trình của chúng ta đã vi phạm Liskov substitution principle.

Để có thể giải quyết vấn đề này ta sẽ tách class chim cánh cụt ra một interface riêng.

### 5. Nguyên tắc phân tách giao diện (Interface Segregation Principle)
Nội dung: Nếu Interface quá lớn thì nên tách thành các interface nhỏ hơn, với nhiều mục đích cụ thể.
```
interface Study{
    function studyEnglish();
    function studyProgammingLanguage();
}
class NormalStudent implements Study{
    function studyEnglish(){
    }
    function studyProgammingLanguage(){
        return NULL;
     }
}
class InformationTechnologyStudents implements Study{
    function studyEnglish(){
    }
    function studyProgammingLanguage(){
    }
}
  
class EconomicsStudent implements Study, EconomicsStudy{
    function studyEnglish(){
    }
    function studyMath(){
    }
    function studyPhilosophy(){
    }
}
class TechnologyStudent implements Study, InformationInfTechnologyStudy{
    function studyEnglish(){
    }
    function studyMath(){
    }
    function studyProgammingLanguage(){
    }
}
```
```
interface Study{
    function studyEnglish();
    function studyMath();
 }
 interface InformationInfTechnologyStudy{
     function studyProgammingLanguage();
 }
 interface EconomicsStudy{
     function studyPhilosophy();
 }
```
Với thiết kế này, chúng ta không còn phải lo lắng tới việc phải implement những hàm không cần thiết, cũng sẽ dễ dàng kiểm soát được việc mở rộng hơn. Trong tương lai, nếu phát sinh thêm nhiều môn học riêng việc triển khai cũng dễ dàng và tường minh hơn rất nhiều.

### 6. Nguyên tắc đảo ngược phụ thuộc (Dependency inversion principle)
DIP là nguyên tắc cuối cùng cũng là nguyên tắc khó hiểu nhất trong SOLID. Nội dung nguyên tắc này là các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại (Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)

Ví dụ: Khi ta thiết kế một chương trình gửi thông báo từ email đến user
```
public class EmailSender{
    public void SendEmail(){
        //Send email
    }
}

public class Notification{
    private EmailSender _email;
    public Notification(){
        _email = new EmailSender();
    }
    public void Send(){
        _email.SendEmail();
    }
}
```
Nhưng bây giờ khách hàng muốn gởi cả SMS và Email đến cho user, bạn phải làm sao?

Tạo một lớp SMSSender và chỉnh sửa class Notificaiton. Như vậy bạn vi phạm một lúc hai nguyên tắc, Dependency Inversion về sự đảo ngược phụ thuộc và Open close principle. Software đóng cho việc thay đổi nhưng mở cho việc mở rộng.

Để thỏa mãn hai nguyên tắc trên, bạn phải Refactoring code theo chiều hướng giảm sự phụ thuộc cứng bằng cách tạo ra một interface ISender dùng chung giữa hai class EmailSender và SMSSender.
```
public class EmailSender : ISender{
    public void Send(){
        //Send email
    }
}
public class SMSSender : ISender{
    public void Send(){
        //Send SMS
     }
 }
 public class Notification{
     private ICollection<ISender> _senders;
     public Notificaiton(ICollection<ISender> senders){
         _senders = senders;
     }
     public void Send(){
         foreach (var message in _senders){
             message.Send();
         }
     }
}
```

Giờ đây class Notificaiton phụ thuộc mềm vào interface ISender, nếu khách hàng yêu cầu thêm một phương thức để chuyển tin nhắn ta có thể thêm vào dễ dàng bằng cách sử dụng interface ISender.
### 7. Kết Luận
Trên đây là những nguyên tắc này sẽ đưa chúng ta tới một cảnh giới mới của việc thiết kế phần mềm, khi tuân theo những nguyên tắc này chương trình của chúng ta bây giờ đã linh động, rành mạch hơn, dễ bảo trì hơn, dễ mở rộng hơn, có tính kế thừa cao,…. Hy vọng bài viết sẽ giúp ích cho bạn trong công việc!
Tham Khảo:
http://code4fun.vn/code4fun/page/17/