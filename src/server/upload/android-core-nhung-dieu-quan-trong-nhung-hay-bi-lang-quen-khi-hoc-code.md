# Giới thiệu
* Chào các bạn. Như tiêu đề đã đề cập, bài viết hôm nay mình sẽ không nói về những điều "xa xa" như các bài viết trước đây nữa. Mình sẽ viết về những thứ căn bản - những lỗi mà chúng ta hay mắc phải trong quá trình code android và hay bỏ qua khi học code. Nói là căn bản vậy thôi chứ mình đã được học và code Android gần 2 năm và đến nay mới phát hiện ra những lỗ hổng như vậy =)). Nào, bắt đầu thôi.

# Thân bài
## 1. Tham chiếu - tham trị.
* Có thể nhiều bạn đã biết đến 2 khái niệm này. Nó không chỉ ở Android và còn nhiều ngôn ngữ khác cũng có. Thật ra thì... mình đã được học nó khi còn là sinh viên, và đã quên sạch (chắc lúc đó không dùng nhiều nên đã trả chữ lại hết cho thầy cô =)) ) cho đến khi mình bị bắt bug liên quan đến lỗi này và chả hiểu tại sao, thôi thì tranh thủ ôn lại luôn :D
### Tham trị
* Cùng xem đoạn code dưới đây:

```
// Java code
public class DemoJava {
    public static void main(String[] args) {
        int a = 5;
        System.out.println("a= " + a);
        changeNumber(a);
        System.out.println("a= " + a);
    }

    private static void changeNumber(int a) {
        a = 9;
    }
}
```
Bây giờ thử đoán kết quả xem, chúng ta có 1 var a = 5, nên lúc println lần đầu sẽ cho ra kết quả là 5. Sau đó, thay đổi giá trị biến a với hàm `changeNumber` bằng 9. println lại kết quả 1 lần nữa.
Đây là output:
```
a= 5
a= 5
```
Có gì ngạc nhiên không? ban đầu a = 5, mình đã biến đổi a = 9 ở  `changeNumber()` và... tại sao a vẫn là 5 sau khi đã biến đổi? Well, một bé bug đã được sinh ra nếu chúng ta nghĩ theo hướng này. 

![](https://images.viblo.asia/0821e390-4e7d-4d2a-bd21-298722c90943.png)


Nguyên nhân là vì phương thức  `changeNumber()` nhận tham số giá trị (kiểu int) là 5, chứ không phải nhận địa chỉ biến, nên bản thân biến ngoài hàm không bị tác động, biến a của hàm main vẫn là 5. Biến a ở method `changeNumber()` là một địa chỉ mới được gán, những thay đổi của biến a trong method này chẳng liên quan gì đến a trong main cả. Và đó được gọi là **tham trị** :D  
* Lưu ý :
    * Trong Java thì tham trị là của các kiểu nguyên thủy gồm: **byte, short, int, long, float, double, boolean, char** . 
    * Trong Kotlin thì cách thay đổi giá trị của tham trị trong method khác đã bị chặn bằng cách làm cho biến tham số là kiểu `val` nên không thể compile được, đó là lý do mình phải demo bằng Java =)) .

### Tham chiếu :
* Cùng xem đoạn code dưới đây :

```
data class User(var name: String, var age: Int, var job: String = "")

fun main() {
    val user1 = User("User1", 10, "Coder")
    val user2 = user1
    user2.name = "User2"
    user2.job = "Sale"
    println(user1)
    println(user2)
}
```
* Chúng ta có user1 có name là "User1", job là "Coder" và user2 được gán từ user1, bây giờ chúng ta sẽ thay đổi user2 có name là "User2" và job là "Sale" và sau đó print user1 và user2 ra. 
* Đây là output:

```
User(name=User2, age=10, job=Sale)
User(name=User2, age=10, job=Sale)
```
* Nhìn vào output ta có thể thấy user1 đã bị thay đổi name và job, chuyện gì đã sảy ra ở đây ? Rõ ràng là chúng ta chỉ thay đổi name và job của user2 nhưng mà user1 cũng bị ảnh hưởng. Và một bug nữa đã được khai sinh nếu ta làm như thế này =))
* Nguyên nhân gây việc này là object user2 hiện chỉ đang trỏ đến địa nhớ của user1 chứ không có một cùng nhớ riêng. Giống như việc bạn đang thay đổi nội thất bên trong căn nhà mà bạn quên mất rằng mình đang ở ké nhà người khác vậy. Và chúng ta gọi user2 là biến đang **tham chiếu** đến user1.

* Chúng ta có thể trực tiếp thấy rằng cách hoạt động của tham chiếu là đối lập với tham trị trong sample dưới đây :
```
main(){
    val user1 = User("User1", 10, "Coder")
    rename(user1)
    println(user1)
}

fun rename(user: User) {
    user.name = "User2"
}

// output : User(name=User2, age=10, job=Coder)
```
* Tham chiếu chỉ bao gồm các kiểu Object, khác với tham trị là các kiểu dữ liệu nguyên thủy.
* Ngoài ra tham chiếu còn có tác động với list :
```
main(){
    val list1 = mutableListOf(1, 2, 3, 4)
    val list2 = list1
    list2.remove(2)
    println(list1)
    println(list2)
}

// output : 
//  [1, 3, 4]
//  [1, 3, 4]
```
Tham chiếu - tham trị nhìn qua có vẻ đơn giản. Nhưng trong một dự án với rất nhiều file source, việc nhầm lẫn về 2 khái niệm này trong khi code có thể gây ra những bug nghiêm trọng khó để phát hiện và debug. 
![](https://images.viblo.asia/dae4a2a4-97b9-4667-8a44-b8234e9d0f3e.png)


## 2. ArrayList vs LinkedList:
* Cả ArrayList và LinkedList đều là implement của List Interface và duy trì thứ tự chèn. Cả hai đều là class không đồng bộ.
* Có nhiều sự khác biệt giữa lớn nhất giữa ArrayList và LinkedList  là
    * **ArrayList** thì quản lý các phần tử bằng index. Nghĩa là ta sẽ thao tác với một phần tử bằng cách dựa vào index của nó trong list.
    * **LinkedList** sử dụng một danh sách liên kết đôi để lưu trữ các phần tử.  Nghĩa là ta sẽ thao tác với một phần tử bất kỳ dựa vào những liên kết với các phần tử đứng cạnh nó.

* Chính vì sự khác biệt này làm cho mỗi thứ có một ưu và nhược điểm khác nhau. Quan sát về độ phức tạp dưới đây để thấy ưu và nhước điểm của ArrayList và LinkedList:

![](https://images.viblo.asia/8f4086be-fac9-4dc3-bb84-f28e7f8a0afe.png)
* Chúng ta có thể dễ dàng nhận ra khi thao tác với các phần tử đầu tiên của ArrayList như insertFirst, deleteFirst, ... đều có độ phức tạp cao là O(n) so với độ phức tạp thấp LinkedList là O(1). Nguyên nhân là vì khi insertFirst hay deleteFirst ở ArrayList không đơn giản chỉ là thêm vào hay xóa đi phần tử mà nó còn phải đánh lại index cho các phần tử khác, vì lúc này thứ tự của ArrayList đã bị thay đổi 

![](https://images.viblo.asia/69ba6c90-66d1-45f4-a1cd-8335b1a578d4.png)


* Chúng ta có thể hình dung thông qua hình ở trên: khi xóa phần từ đầu tiên có index là 0 giá trị là 23, với ArrayList các phần tử khác sẽ bị thụt lùi lại một index. Còn với LinkedList đơn giản chi là xóa đi nên độ phức tạp thấp. Và tất nhiên độ phức tạp càng thấp đồng nghĩa với việc performance càng cao :D .

Hẳn là trước nay chúng ta đã rất quen thuộc với ArrayList và rất ít khi sử dụng LinkedList, việc hiểu rõ ưu và nhược điểm của 2 class này có thể giúp chúng ta linh hoạt hơn trong việc cải thiện performance.

## 3. Set collection và `equals()`, `hashCode()`
* Set là một interface kế thừa Collection interface trong java. Trong quá trình làm việc mình thấy `Set` ít khi được sử dụng hơn `List` . Nếu chưa biết hoặc đã quên công dụng của `Set` thì các bạn hãy xem Sample dưới đây:

```
fun main() {
    var numberSet = setOf(1, 2, 2, 3, 4, 5, 3)
    var numberList = listOf(1, 2, 2, 3, 4, 5, 3)
    println("Set: $numberSet")
    println("List: $numberList")
}
// Output:  
//    Set: [1, 2, 3, 4, 5]
//    List: [1, 2, 2, 3, 4, 5, 3]
```

* Chúng ta có thể dễ dàng nhận thấy rằng mặc dùng cùng truyền các phần tử giống nhau cho 2 biết là numberSet và numberList, nhưng numberSet chỉ lưu các phần tử không trùng nhau, loại bỏ đi những phần tử trùng, trong khi đó thì `List`  thì giữ lại toàn bộ phần tử. Và đây cũng là công dụng chính của `Set`. 
* Set được triển khai bởi Hashset, LinkedHashset, Treeset hoặc EnumSet. Các bạn có thể xem tại [đây](https://viettuts.vn/java-collection/set-trong-java) nếu muốn tìm hiểu rõ hơn.
* Trong sample trên với các phần từ là kiểu Int thì vấn đề có về khá là dễ dàng, chỉ cần compare các phần tử với nhau và bỏ trùng. Vậy nếu các phần tử là Object thì sao :

```
fun main() {
    var userSet = setOf(
        User("User1", 14, "Coder"),
        User("User2", 18, "Coder"),
        User("User2", 18, "Coder"),
        User("User3", 15, "Coder"),
        User("User3", 18, "Sale")
    )
    println("Set: $userSet")
}
```

Output:
```
Set: 
[User(name=User1, age=14, job=Coder), 
User(name=User2, age=18, job=Coder), 
User(name=User3, age=15, job=Coder), 
User(name=User3, age=18, job=Sale)]
```
* Chúng ta có thể thấy là dường như `Set`  đã đi sâu vào và compare cả những field ở các phần tử với nhau và cho ta kết quả tuyệt đối như trên. Ví dụ như có cùng field name nhưng khác age hoặc job thì là khác nhau, chỉ cần có một field khác thì là khác nhau. 
* Vậy bài toán đặt ra ở đây là chúng ta chỉ muốn `Set` compare một field xác định giữa các phần tử thôi thì sao? Ví dụ như ở sample trên thì sẽ compare field age. Tức là sẽ không có User nào trùng độ tuổi trong output trên.
* Và đây là cách mình làm, chúng ta có thể kế thừa 2 method là hashCode() và equalsTo() trong class User như sau :

```
data class User(val name: String, val age: Int, val job: String) {
    override fun hashCode(): Int {
        return age.hashCode()
    }

    override fun equals(other: Any?): Boolean {
        return this.age == (other as User).age
    }
}
```
* Và lúc này output đã như những gì chúng ta mong đợi :
```
Set:
[User(name=User1, age=14, job=Coder), 
User(name=User2, age=18, job=Coder), 
User(name=User3, age=15, job=Coder)]
```
* Qua đây chúng ta có thể thấy thằng `Set` thực hiện compare giữa 2 đối tượng dựa trên method `hasCode()` và `equalsTo()`. Để hiểu rõ hơn về 2 method các bạn có thể tham khảo ở [đây](https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html)
* Nếu có thời gian mình sẽ đào sâu tìm hiểu về cách hoạt động cũng như ứng dụng của 2 method này trong bài viết tới. Bây giờ thì mình ngừng thôi, dài quá rồi =))


# Kết luận
* Trong bài viết này mình đã đề cập lại vài vấn đề khá căn bản khi học Android core, hi vọng nó có thể giúp ích cho các bạn trong quá trình lập trình.
* Mình còn nhiều nội dung muốn chia sẻ thêm về những kiến thức "core" này, tuy nhiên thời lượng bài viết cũng có giới hạn và viết dài quá sẽ gây nhàm chán khi đọc :) . Nếu được ủng hộ mình sẽ tiếp tục viết về những kiến thức này trong các bài viết tiếp theo. 
* Nếu có bất kỳ chưa ổn bạn hãy để lại nó ở dưới phần comment. Chào thân ái và quyết thắng!