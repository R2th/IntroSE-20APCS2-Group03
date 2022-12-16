![](https://images.viblo.asia/ef9ac7f3-d691-4ac3-bbac-0bb5f03b2e82.png)
Xin chào anh em, lâu lắm rồi do công việc dự án ở công ty cái nào cũng gấp gáp nên không có nhiều thời gian viết bài chia sẻ những kiến thức mà mình đã học hỏi được. Hôm nay tiết trời có một chút sương sương lạnh, không khí thật trong lành nên mình xin được làm một bài chia sẻ cũng sương sương thôi =)) Mong anh em đọc thấy hay thì upvote còn không hay thì đừng có downvote nhé, mình buồn.

Như các bạn biết đấy, khi mới code thì chúng ta thường quan tâm đến việc chương trình ta viết ra nó chạy được hay không mà quên mất việc làm sao cho đoạn mã code mình vừa type ra sử dụng được sau này. Hay là liệu đối với code như này liệu có đúng chuẩn convention hay chưa ? Ok một cái rất quan trọng khi chúng ta bắt đầu làm dự án ở công ty đó chính là cần có một chuẩn convention để mọi người follow cho dễ, code sao cho sạch đẹp, tránh được những code smell. Trong bài viết ngày hôm nay thì mình xin được chia sẻ tới mọi người thế nào là `Code Smell` và một số các kỹ thuật `Refactoring` mà chúng ta hay thường gặp nhé. Nó rất cơ bản và đơn giản thôi, chúng ta nếu tránh được những lỗi này thì sẽ giúp cho chúng ta trở thành những developer chuyên nghiệp hơn. 

# 1. Code Smell
## 1.1 Thế nào là Code Smell ?
Thì theo chị `wikipedia` thì chị ý định nghĩa như sau:

`In computer programming, a code smell is any characteristic in the source code of a program that possibly indicates a deeper problem`

Mình có thể nói theo cách của mình như sau:
* Nó không phải là `Bug`
* Nó không sau về mặt technical
* Nó không làm cho chương trình không chạy được

==>  Nói túm lại **Code Smell** nó là những điểm yếu trong thiết kế code, nó không mở rộng được tính năng, khó debug, nguy cơ gặp bug rất là cao.
## 1.2 Một vài Code Smell thường gặp

### Biến
Chúng ta hay đặt tên biến như sau:
* Tên biến không có ý nghĩa và khó hiểu: vd $a, $b
* Không sử dụng cùng tự vựng cho biến: lúc đặt tiếng anh, lúc đặt tiếng việt
* Đặt tên biến khó tìm kiếm
* Thêm những nội dung không cần thiết:

![](https://images.viblo.asia/782dde57-8a96-4d73-8673-1fe8673e482b.png)

trong class Car thì ai cũng hiểu là `$carMake, $carModel, $carColor` đểu là các thuộc tính của `Car`. Chúng ta nên đặt tên biến ngắn gọn và dễ hiểu như sau

![](https://images.viblo.asia/49206284-5c2b-4115-adf3-7f8d54473d46.png)
* Sử dụng đối số mặc định thay vì phải kiểm tra bằng biểu thức mặc định

![](https://images.viblo.asia/9bf3679b-fb74-4857-adfa-4200fbff8720.png)

![](https://images.viblo.asia/66b4b42e-0079-4029-8d5c-3b0a1d747e73.png)
### Hàm
* Tham số truyền vào hàm quá nhiều: chúng ta nên truyền vào hàm 3,4 tham số là nhiều rồi, không nên truyền quá nhiều tham số vào hàm nhé.
* Hàm thực hiện quá nhiều chức năng: thông thường hàm chỉ thực hiện một chức năng là cách viết hàm clear và đẹp nhất, các bạn nên cố gắng sử dụng `if-else switch-case` tổi thiểu trong một hàm, vì khi chúng ta đã sử dụng đến nó chắc chắn hàm đó sẽ thực hiện nhiều chức năng.
*  Tên hàm khó đoán ra hàm ấy có chức năng gì
*  Hàm chứa nhiều cấp trừu tượng: Khi bạn có dộ trừu tượng nhiều hơn một cấp thì hàm thưởng phải làm quá nhiều việc.

![](https://images.viblo.asia/faac3f90-9e73-4c3a-a447-06bd3ec77221.png)
*  Hay sử dụng cờ như là một đối số của hàm

![](https://images.viblo.asia/bfb4ee16-ae59-4606-a558-3ad718afaaa3.png)
* Hàm thực hiện quá nhiều chức năng và điều kiện: Điều này nó cũng khó cho các bạn, vì mọi người sẽ thắc mắc rằng làm thế nào để làm gì đó mà thiếu `if-else` được. Chúng ta cứ luôn nhớ mỗi hàm chỉ nên thực hiện một chức năng mà thôi. Dưới đây là một ví dụ tồi cho việc viết hàm làm quá nhiều chức năng.

![](https://images.viblo.asia/955db4d3-7952-4c7c-bf2e-75349e73efd2.png)
### Đối tượng
* Không sử dụng tính chất đóng gói trong hướng đối tượng

![](https://images.viblo.asia/65150711-e25b-46f0-8d65-637b83dd7427.png)

Nếu chúng ta sử dụng thì code chúng ta phải như sau

![](https://images.viblo.asia/96e7d0a2-34a2-4cb3-ac66-9e0abe9812fb.png)
* Không sử dụng thuộc tính phương thức private/protected

![](https://images.viblo.asia/a41bc298-6285-4070-9e54-629c84e6622c.png)

Chúng ta nên thêm những thuộc tính co phương thức hoặc cho thuộc tính của class. Đoạn mã tốt sẽ như sau

![](https://images.viblo.asia/bf20cb26-2990-43e0-87d6-3bb3133a8269.png)

Mình đã vừa nêu ra `Code Smell` nó là cái gì và một số các case mà các bạn hay mắc phải khi code. Phần 2 mình sẽ nói đến nguyên tắc thiết kế nhé.
# 2. Nguyên tắc thiết kế
## 2.1 Định nghĩa
`Nguyên tắc thiết kế phần mềm` là một tập hợp các hướng dẫn giúp chúng ta tránh khỏi một thiết kế tồi. Ba đặc điểm quan trọng của một thiết kế phần mềm xấu ta nên tránh:
* Tính cứng nhắc: tức là khó có thể thay đổi vì mỗi khi ta thay đổi thì nó ảnh hướng quá nhiều đến phần khác của hệ thống
* Tính bất ổn định: tức là khi bạn thực hiện một sự thay đổi nào đó, phần thay đổi đó sẽ có thể gây phá vỡ hệ thống
* Tính kém linh hoạt: tức là ta khó có thể tái sử dụng lại trong các ứng dụng khác bởi nó không thể tách rời khỏi các ứng dụng hiện hành
## 2.2 Nguyên tắc SOLID
**Single responsibility princible**

Nguyên tắc này ý muốn nói rằng một class chỉ nên giữ một trách nhiệm duy nhất. Nếu không thì càng về sau class đó sẽ bị phình to ra chúng ta rất khó để thay đổi.
```PHP
public class Data()
{
    public function read();
    public function import();
    public function export();
}
```
Ta thấy rằng class trên có 3 trách nhiệm liền theo đó về sau class sẽ còn phình to ra nữa. Theo đúng nguyên lý ở trên chúng ta nên tách class trên thành 3 class nhỏ hơn sao cho mỗi class giữ một trách nhiệm duy nhất.
```PHP
public class readData() {...}
public class passData() {...}
public class exportData() {...}
```
**Open/closed principle**

Chúng ta có thể thoải mái mở rộng một class nhưng không được sửa đổi bên trong class đó. Mỗi khi ta muốn thêm chức năng cho chương trình, ta nên viết class mới mở rộng class cũ ra, không nên sửa đổi class cũ.

**Liskov Substitution Principle**

Nguyên lý này ta có thể phát biểu như sau: các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.
VD như ta có class `Human` có các class con là `Male` và `Female`. Nhưng nếu các bạn viết `Manikin` thì khi kế thừa class `Human` nó sẽ gây lỗi vì `Manikin` không phải thực thể sống, vi phạm nguyên lý.

**Interface Segregation Principle**

Chúng ta thay vì dùng một interface lớn, ta nên tách thành nhiểu interface nhỏ với nhiều mục đích khác nhau. Ví dụ chúng ta có một interface với 100 method , việc implement sẽ khá cực khổ ngoài ra các class nó không dùng hết hay override lại được hết tất cả method trong interface này. Khi chúng ta tách interface ra thành nhiều interface nhỏ, gồm các nhóm method liên quan tới nhau, việc implement và quản lý sẽ dễ dàng hơn.

**Dependency inversion principle**

Các module cấp cao không nên phụ thuộc vào các module cấp thấp và ngược lại. Cả hai nên phụ thuộc vào `abstraction`. Interface không nên phụ thuộc vào chi tiết mà ngược lại , các class giao tiếp thông qua interface, không phải thông qua implementation.

Ví dụ sạc samsung có thể sạc các dòng samsung galãy, A5, A7, ... Nó là interface , implementation các dòng samsung chứ không quan tâm tới cách thức sạc của mỗi dòng là gì.
## 2.3 Nguyên tắc YAGNI
Nguyên tắc này muốn nói lên chúng ta chỉ cần tập trung xây dựng chức năng vấn đề tại thời điểm hiện tại, không nên tự vẽ ra những chức năng có thể được sử dụng đến.
## 2.4 Nguyên tắc KISS
Nguyên tắc này mang hàm ý muốn nói hãy làm cho mọi thứ trở nên đơn giản hơn để bạn có thể luôn hiểu được. Hãy viết ra những dòng code thật dễ hiểu và đơn giản. Hãy để số lượng dòng code của một lớp hay phương thức ở con số hàng chục thôi đừng viết hàng trăm hàng nghìn dòng code trong một file, thực sự kém sang lắm.
## 2.5 Nguyên tắc DRY
Nguyên tắc này muốn nói là chúng ta đừng lặp lại một đoạn mã nào mà hãy đóng gói nó thành phương thức riêng. Đến khi cần chỉ cần gọi tên nó ra thôi.

# 3. Các kỹ thuật Refactoring
## 3.1 Thế nào là refactor code ?
`Refactor` là các thao tác tùy chỉnh code nhằm cải thiện nó mà không thay đổi chức năng ban đầu.
## 3.2 Một số các kỹ thuật refactor thường dùng
**Tách method**

Khi chúng ta code ra một method điều mà chúng ta quan tâm đầu tiên đó chính là method đó chỉ nên làm một nhiệm vụ duy nhất tránh sử dụng các từ khóa `if-else, switch-case` nhiều trong method đó. Nhưng điều đó có vẻ rất khó đúng không các bạn ? Tiếp theo chung ta không nên viết một method quá dài , hàng mấy trăm dòng code trong một method đó là chứng tỏ method của chúng ta có vấn đề rồi, nên tách method ra.

Hoặc có thể đơn giản chúng ta tìm ra một đoạn code nào lặp lại nhiều lần ở các method chúng ta dùng và tách thành một method, điều đó giúp bạn không bị lặp code.

**Tách class**

Đây là kỹ thuật được áp dụng cho những class lớn. Ta biết đấy, những phương thức và dữ liệu nào có liên quan đến nhau sẽ được gom vào một class. Tuy nhiên khi chúng ta thiết kế class, có những lúc chúng ta thêm rất nhiều method vào class đó nhưng chẳng liên quan gì đến class đó cả. Đây là lúc chúng ta nên áp dụng kỹ thuật tách class. Chúng ta xem có những thành phần nào liên quan tới nhau mà không còn phụ thuộc vào class lớn đó nữa thì tách hẳn ra một class khác.

**Đơn giản hóa biểu thức**

Chúng ta thử xem đoạn code dưới đây nhé

![](https://images.viblo.asia/59288cfe-1b44-4b34-8735-3c37b293e8bd.png)

Nhìn trông phức tạp đúng không các bạn, chắc hẳn nếu như các bạn dev nào mới code thì vẫn có thể code theo như này, cái gì có thể là nhét hết vào biểu thức điều kiện. Vậy code sạch đẹp hơn chúng ta sẽ code như sau
![](https://images.viblo.asia/ac89f602-9b44-475f-a325-621c4c6e37a2.png)

**Tham số hóa method**

![](https://images.viblo.asia/60a9964d-3b90-4db3-a7a2-916374e7c96b.png)

Code đẹp hơn sẽ như sau

![](https://images.viblo.asia/ed296b73-c8b0-4c9a-a41c-9df47165e83b.png)

**Kéo method từ lớp con lên lớp cha**

Việc chúng ta kéo method và thuộc tính từ lớp con lên lớp cha có liên quan tới tính chất kế thừa trong lập trình hướng đối tượng. Chúng ta sẽ kéo những thành phần nào có đặc điểm chung giống nhau của các lớp con kế thừa từ một cha lên class cha.

![](https://images.viblo.asia/28528f09-2c63-467c-a8ff-4a6393559d89.png)

Ta thấy có phương thức `chuVi()` là chung của hai lớp con nên ta sẽ kéo phương thức này lên lớp cha

**Kéo method từ lớp cha xuống lớp con**

Cũng giống như phương pháp trên nhưng chỉ khác nhau là thay vì kéo lên ta lại kéo xuống. Chúng ta tìm ra những thành phần mà chỉ có ích cho một lớp con dùng trong những lớp con còn lại.

![](https://images.viblo.asia/0d04ae1f-a8d9-4982-99ef-85ce46951c6d.png)

 Như các bạn thấy đấy thì phương thức `Bay()` chỉ hữu ích cho mỗi lớp con `ConChim` thôi mà lại không hữu ích cho những lớp con kế thừa còn lại nên chúng ta sẽ kéo function `Bay()` xuống lớp `ConChim`
 # 4. Kết luận
 Vậy qua một số những kiến thức cơ bản ở trên mong rằng cũng giúp ích cho các bạn code clean hơn, tránh được các code smell hơn. Cảm ơn các bạn đã đọc bài chia sẻ của mình.