# Lời mở đầu:
**Thomas Paine**- triết gia nổi tiếng người Anh từng nói: 

"**An army of principles can penetrate where an army of soldiers cannot**"

("Đội quân nguyên tắc có thể xuyên thủng cả những nơi mà đội quân con người không thể")

Trong bất cứ lĩnh vực nào, việc tuân theo những nguyên tắc (được đúc rút, tích lũy bởi nhiều người, đúng đắn sau một thời gian dài) sẽ làm cho công việc có thể thực hiện dễ dàng hơn, tránh được những sai lầm mà người đi trước đã mắc phải.

Và những nguyên tắc cơ bản trong lập trình dưới đây đã được áp dụng và chứng minh sự đúng đắn trong một thời gian dài, vì vậy hãy làm theo để công việc "múa phím" của bạn dễ dàng hơn.

# Một số nguyên tắc cơ bản:
## Nguyên tắc KISS (Không phải hôn hít gì đâu):
**KISS = Keep It Simple Stupid**

**KISS** có nhiều biến thể khác nhau như "**Keep It Short and Simple**", "**Keep It Simple and Straightforward**" và "**Keep It Small and Simple**". 

Tựu chung lại, hàm ý của nó vẫn hướng về một sự đơn giản và rõ ràng trong mọi vấn đề. Và như vậy, sự đơn giản là mục đích trọng tâm trong thiết kế, còn những cái phức tạp không cần thiết thì nên tránh. 

Trong lập trình, **KISS** nghĩa là hãy làm cho mọi thứ (mã lệnh của bạn) trở nên đơn giản và dễ nhìn hơn. Hãy chia nhỏ vấn đề ra những bài toán nhỏ đơn giản hơn, viết mã để xử lý nó, biến nó thành các lớp và các hàm riêng biệt, đừng để một lớp hay một phương thức có hàng trăm dòng lệnh, hãy để nó trở về con số chục thôi. 

Đừng viết những lớp hay phương thức theo kiểu spaghetti hay all-in-one (tất cả trong một) như dao thụy sĩ, hãy để mọi thứ thật đơn giản để bạn luôn có thể hiểu được, và kết hợp chúng với nhau để giải quyết được các bài toán lớn.

## Nguyên tắc YAGNI:
**YAGNI = You Aren’t Gonna Need It**

Là những lập trình viên, đôi khi chúng ta suy nghĩ quá nhiều về tương lai của dự án nên chúng ta code thêm thật nhiều tính năng “phòng khi chúng ta cần đến nó” hay  “Cuối cùng chúng ta sẽ dùng đến nó”. Ý nghĩ này sai hoàn toàn. Bạn đã không cần đến nó thì bạn sẽ không cần đến nó trong hầu hết tất cả các trường hợp! “**You Aren’t Gonna Need It!**”.

Nếu bạn nghĩ một chức năng sẽ hữu dụng trong tương lai, hãy cứ bình tĩnh và xem lại những công việc đang chờ bạn giải quyết ngay. Bạn không thể lãng phí thời gian của mình để code những tính năng mà bạn sẽ phải sửa nó hay thay đổi nó bởi vì nó không phù hợp với nhu cầu của khách hàng, hay trong trường hợp xấu nhất là nó sẽ không được sử dụng đến.

--> tốt nhất là hãy giải quyết thành công vấn đề hiển hiện trước mắt đã, khách hàng không vẽ việc cho bạn thì bạn cũng đừng tự vẽ việc cho mình :P

## Nguyên tắc DRY:
**DRY = Don’t Repeat Yourself**

Nguyên tắc DRY chỉ ra rằng nếu chúng ta đang muốn viết nhiều đoạn code giống nhau ở nhiều chỗ khác nhau, thay vì copy và paste đoạn code đó, chúng ta hãy đưa đoạn code đó vào một phương thức riêng sau đó gọi phương thức này từ những chỗ chúng ta cần gọi.

Quen quen đúng không, vì nó giống như tính chất **kế thừa** trong lập trình hướng đối tượng OOP mà chúng ta đã quá quen thuộc rồi :D
## Nguyên tắc SOLID:
### 1. Single responsibility principle
- **Nội dung**: `Một class chỉ nên giữ 1 trách nhiệm duy nhất 
(Chỉ có thể sửa đổi class với 1 lý do duy nhất)`

- **VD**:
```
public class ReportManager()
{
   public void ReadDataFromDB();
   public void ProcessData();
   public void PrintReport();
}
```

- Class này giữ tới 3 trách nhiệm: Đọc dữ liệu từ DB, xử lý dữ liệu, in kết quả. Do đó, chỉ cần ta thay đổi DB, thay đổi cách xuất kết quả, … ta sẽ phải sửa đổi class này. Càng về sau class sẽ càng phình to ra. 

--> Theo đúng nguyên lý, ta phải tách class này ra làm 3 class riêng. Tuy số lượng class nhiều hơn những việc sửa chữa sẽ đơn giản hơn, class ngắn hơn nên cũng ít bug hơn.
### 2. Open/closed principle
- **Nội dung**: `Có thể thoải mái mở rộng 1 class, nhưng không được sửa đổi bên trong class đó 
(open for extension but closed for modification)`
- Theo nguyên lý này, mỗi khi ta muốn thêm chức năng,.. cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa hoặc sở hữu class cũ) không nên sửa đổi class cũ.
### 3. Liskov Substitution Principle
- **Nội dung**: `Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình`
- **VD**: Hãy tưởng tượng bạn có 1 **class cha** tên **Vịt**. Các **class VịtBầu**, **VịtXiêm** có thể kế thừa class này, chương trình chạy bình thường. Tuy nhiên nếu ta viết **class** **VịtChạyPin**, cần pin mới chạy được. Khi class này kế thừa class Vịt, vì không có pin không chạy được, sẽ gây lỗi. Đó là 1 trường hợp vi phạm nguyên lý này.
### 4. Interface Segregation Principle
- **Nội dung**: `Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể`
- Nguyên lý này khá dễ hiểu. Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method. Khi tách interface ra thành nhiều interface nhỏ, gồm các method liên quan tới nhau, việc implement và quản lý sẽ dễ hơn.


### 5. Dependency inversion principle
- **Nội dung**: 
    - Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
   Cả 2 nên phụ thuộc vào **abstraction**.
   - **Interface** (**abstraction**) không nên phụ thuộc vào chi tiết, mà ngược lại.
( Các **class** giao tiếp với nhau thông qua **interface**, 
không phải thông qua **implementation**.)

- **VD**:
    - Chúng ta đều biết 2 loại đèn: **đèn tròn** và **đèn huỳnh quang**. Chúng **cùng có đuôi tròn**, do đó ta có thể thay thế đèn tròn bằng đèn huỳnh quanh cho nhau 1 cách dễ dàng.
    - Ở đây, **interface** chính là đuôi tròn, **implementation** là bóng đèn tròn và bóng đèn huỳnh quang. Ta có thể swap dễ dàng giữa 2 loại bóng vì ổ điện chỉ quan tâm tới **interface** (đuôi tròn), không quan tâm tới **implementation**.
# Kết:
Trên đây là một số nguyên tắc nổi tiếng trong lập trình mà mình biết và hiểu được nên muốn chia sẻ với các bạn. Phần SOLID có lẽ sẽ hơi khó hiểu nếu biết đến lần đầu, nhưng dần dần áp dụng vào bài toán thực tế thì các bạn sẽ dễ "ngấm" hơn.

Hẹn gặp lại các bạn trong các bài viết tiếp theo.
# Tài liệu tham khảo:
https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/

https://trello.com/c/nVYxJS6h/68-nguy%C3%AAn-l%C3%BD-kiss-trong-l%E1%BA%ADp-tr%C3%ACnh