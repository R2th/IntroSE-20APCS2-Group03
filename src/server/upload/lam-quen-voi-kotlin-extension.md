Xin chào các bạn, hôm nay chúng ta sẽ tìm hiểu về một tính năng mới khác của Kotlin có tên là "Extension". Sử dụng extension, chúng ta sẽ có thể thêm hoặc xóa một số method function ngay cả khi không kế thừa hoặc sửa đổi chúng. Các phần mở rộng được giải quyết theo static. Nó không thực sự sửa đổi lớp hiện có, nhưng nó tạo ra một hàm có thể gọi bằng cách sử dụng dấu chấm trước tên hàm.

## Function Extension

Trong phần mở rộng hàm, Kotlin cho phép định nghĩa một phương thức bên ngoài main class. Trong ví dụ sau, chúng ta sẽ thấy cách extension được triển khai ở level function.

```
class Alien{ 
 var skills : String= "null" 
 fun printMySkills(){ 
  print(skills) 
 }   
} 
fun main(args: Array<String>) { 
 var  a1= Alien() 
 a1.skills="JAVA" 
 //a1.printMySkills() 
  
 var  a2= Alien() 
 a2.skills="SQL" 
 //a2.printMySkills() 
  
 var  a3= Alien() 
 a3.skills=a1.addMySkills(a2) 
 a3.printMySkills() 
} 
fun Alien.addMySkills(a:Alien):String{ 
 var a4=Alien() 
 a4.skills=this.skills + " " +a.skills 
 return a4.skills 
}
```

Trong ví dụ trên, chúng ta không có bất kỳ phương thức nào bên trong class "Alien" có tên là **addMySkills()**, tuy nhiên chúng ta vẫn đang implement cùng một phương thức ở một nơi khác bên ngoài class này, đây là điều kỳ diệu của extension.

Đoạn mã trên sẽ in ra kết quả như sau:

```
JAVA SQL
```
    
## Object Extension
    
Kotlin cung cấp một cơ chế khác để triển khai static function của Java. Điều này có thể đạt được bằng cách sử dụng từ khóa "companion object". Sử dụng cơ chế này, chúng ta có thể tạo ra một đối tượng của một lớp bên trong một phương thức gốc và sau này chúng ta có thể gọi phương thức đó bằng cách sử dụng tham chiếu của tên lớp. Trong ví dụ sau, chúng ta sẽ tạo một "companion object":

```
fun main(args: Array<String>) { 
    println("Heyyy!!!"+A.show()) 
}  
class A{ 
    companion object{ 
        fun show():String{ 
            return("You are learning Kotlin from viblo.asia") 
        } 
    } 
}
```
    
Đoạn mã trên sẽ in ra kết quả như sau:

```
Heyyy!!! You are learning Kotlin from viblo.asia
```
    
Ví dụ trên có vẻ giống như static trong Java, tuy nhiên, trong real-time chúng ta đang tạo một đối tượng dưới dạng một biến thành viên của cùng lớp đó. Đây là lý do tại sao nó cũng được bao gồm trong thuộc tính extension và có thể được gọi cách khác là object extension. Về cơ bản, bạn đang mở rộng đối tượng của cùng một lớp để sử dụng một số hàm thành viên.

Mình xin phép dừng bài viết lại ở đây, bài viết bao gồm 1 chút lý thuyết và ví dụ minh họa, hi vọng điều này sẽ hữu ích. Cảm ơn các bạn.