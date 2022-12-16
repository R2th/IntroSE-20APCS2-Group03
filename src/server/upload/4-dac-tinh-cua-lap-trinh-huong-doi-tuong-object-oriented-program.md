Lập trình hướng đối tượng quá quen thuộc rồi bạn nào học lập trình đều phải học, đi phỏng vấn cũng vậy hỏi suốt(chắc cái này tùy vào vị trí tuyển dụng chủ yếu junior chắc chắn sẽ hỏi).nó là nền tảng cho hầu hết các design pattern hiện nay.Bài viết này đúc rút kinh nghiệm thực tế và độ hiểu của mình về OOP.
Lập trình hướng đối tượng là một kỹ thuật lập trình cho phép lập trình viên tạo ra các đối tượng trong code để trừu tượng hóa các đối tượng thực tế trong cuộc sống.

![](https://images.viblo.asia/e8e24a71-54dd-4b1d-94c0-3862a46683b9.png)

### **Tính đóng gói (Encapsulation):** 
Là cách để che dấu những tính chất xử lý bên trong của đối tượng, những đối tượng khác không thể tác động trực tiếp làm thay đổi trạng thái  chỉ có thể tác động thông qua các method public của đối tượng đó.
Mình sẽ tạo ra 2 class để thể hiện điều này:

![](https://images.viblo.asia/c62d0823-54b5-44de-97a4-cca30bf21fca.png)

xem cách thể hiện bằng code dưới đây :
**class hinhchunhat**
```java
using System;
namespace oop
{
    class hinhchunhat
    {
        private int height;
        private int width;

        public hinhchunhat(int newHeight, int newWidth) {
            height = newHeight;
            width = newWidth;
        }

        public int tinhdientich() {
            return height * width;
        }
    }
}
```

* height và width ở đây chính là các tính chất (**properties**) của đối  tượng **class** **hinhchunhat**
* **tinhdientich()** là method được public nhằm mục đích tương tác với các đối tượng khác.
Tạo một **class Program** với method **static** để run, xem cách tương tác và thay đổi tính chất  của đối tượng thông qua các method public như nào:

```java
using System;
namespace oop
{
    class Program 
    {
        static void Main(string[] args)
        {
            //thay doi properties (height, width) cua doi tuong thong qua method public
            hinhchunhat hcn = new hinhchunhat(10, 5);

            //lay du lieu thong qua method public
            Console.WriteLine("Dien tich cua {0} la: " + hcn.tinhdientich(),hcn);
            Console.ReadLine();
        }
    }
}
```

Output: 

![](https://images.viblo.asia/f8f9fbf0-71c5-4d7d-825e-3f590d040e5d.png)

Như vậy khi ta muốn thay đổi các tính chất (properties) không thể tương tác trực tiếp với properties mà phải thông qua các method public được định nghĩa bên trong class
* không thể biết luồng xử lý logic bên trong của đối tượng
### **Tính kế thừa (Inheritance):**
Là kỹ thuật cho phép kế thừa lại những tính năng mà một đối tượng khác đã có, giúp tránh việc code lặp dư thừa mà chỉ xử lý công việc tương tự.

* Kế thừa một cấp (Single level Inheritance): Với một class cha và một class con
* 
![](https://images.viblo.asia/34255d9b-0f23-4a8d-a7e2-e6b788d38d99.png)

```java
using System;
namespace oop
{
    class hinhdang
    {
        private void showColor()
        {
            Console.WriteLine("Mau hong");
        }
        public void showType()
        {
            Console.WriteLine("Day la hinh chu nhat");
        }
    }
}

using System;
namespace oop
{
    class Program : hinhdang
    {
        static void Main(string[] args)
        {
            Program pg = new Program();
            pg.showType();
            //pg.showColor(); khong the truy cap private method
            Console.ReadLine();
        }
    }
}
```

Output:

![](https://images.viblo.asia/676aec1b-c536-4b41-a5ea-288ad908ea56.png)

Trong class Program không hề có method **showType()** nhưng vẫn có thể truy cập sử dụng nó bằng cách kế thừa lại method của **class hinhdang**
**Kế thừa nhiều cấp (Multiple level Inheritance):** Kế thừa  nhiều class.

![](https://images.viblo.asia/8286fb2e-a6c1-4cca-a770-e83236f340ce.png)

Ở diagram trên mình viết thêm class mausac và chuyển private  method showColor() sang class mausac  thành public method.

```java
using System;
namespace oop
{
    class hinhdang
    {
        public void showType()
        {
            Console.WriteLine("Day la hinh chu nhat");
        }
    }
}
using System;
namespace oop
{
    class mausac : hinhdang
    {

        public void showColor()
        {
            Console.WriteLine("Mau hong");
        }
    }
}
using System;
namespace oop
{
    class Program : mausac
    {
        static void Main(string[] args)
        {
            Program pg = new Program();
            pg.showType();
            pg.showColor();
            Console.ReadLine();
        }
    }
}
```
Output:

![](https://images.viblo.asia/b7c52389-87a1-4551-9ac9-120feeaf309b.png)

**class Program** chỉ kế thừa **class mausac** nhưng vẫn có thể truy cập method **showType()** được viết trong **class hinhdang**, đây chính là hình thức kế thừa nhiều cấp,rất tiện đúng không?

### **Tính đa hình (Polymorphism ):** 
Là một đối tượng thuộc các lớp khác nhau có thể hiểu cùng một thông điệp theo cách khác nhau.

Ví dụ đa hình trong thực tế: Mình có 2 con vật: chó, mèo hai con vật này khi nhận được mệnh lệnh  là **"hãy kêu"** thì chó kêu "gâu gâu",  mèo kêu "meo meo".

Ví dụ trên cả 2 con vật đều hiểu chung một thông điệp **"hãy kêu"** và thực hiện theo cách riêng của chúng.

Trong code để thể hiện tính đa hình có 2 cách:
1. Method Overloading (compile time polymorphism)
2. Method Overriding (run time polymorphism)
* **Method Overloading :** là cách nạp chồng các method có cùng tên nhưng khác tham số

![](https://images.viblo.asia/45c54d95-5000-4c81-a56a-10ac2cce4c44.png)

Tạo 1 **class Program** gồm 2 method **Print()** có tham số khác nhau (hai method này được gọi là medthod overloading)

```java
using System;
namespace oop
{
    class Program
    {
        static void Print(object o)
        {
            Console.WriteLine("Object overload called");
        }
        static void Print(string a)
        {
            Console.WriteLine("String overload called");
        }

        static void Main(string[] args)
        {
            object o = "hello";
            Print(o);
            Console.ReadLine();
        }
    }
}
```
Output:

![](https://images.viblo.asia/2fbac49f-b898-48fa-a7b9-c64e4d065b49.png)

Ở đây **Print(object)** được gọi vì **o** là loại **object**, để xác định method nào được gọi ra chúng xác định bằng loại param hoặc số lượng param chuyền vào.
* **Method Overriding:**  Đây là một phương pháp được ghi đè lại các method ảo của một lớp cha nào đó(được khai báo bằng từ khóa virtual).

Để thể hiện phương pháp này cần dùng 2 từ khóa:
* **virtual** :từ khoá dùng để khai báo 1 phương thức ảo (có thể ghi đè được).
* **override**: từ khoá dùng để đánh dấu phương thức ghi đè lên phương thức của lớp cha.

![](https://images.viblo.asia/985e9f93-c28f-405f-932b-c56e85f193fd.png)

Tạo ra 3 class **Animal**,**Dog**,**Cat**

```java
using System;
namespace oop
{
    class Animal
    {
        public void Speak()
        {
            Console.WriteLine("Animal is speaking...");
        }
    }
}
using System;
namespace oop
{
    class Dog: Animal
    {
       
       public new void Speak(){
            Console.WriteLine("Dog speaks go go");
       }
    }
}
using System;
namespace oop
{
    class Cat:Animal
    {
        public new void Speak()
        {
            Console.WriteLine("Cat speaks meo meo");
        }
    }
}
using System;
namespace oop
{
    class Program
    {

        static void Main(string[] args)
        {
            Animal dog = new Dog();
            dog.Speaking();
            Animal cat = new Cat();
            cat.Speaking();
            Console.ReadLine();
        }
    }
}
```
Output:

![](https://images.viblo.asia/4ef110ab-cf88-4133-a44a-c90aa1034066.png)

Như bạn có thể thấy ở trên mình không dùng đến 2 từ khóa là **virtual** và **override**, mặc dù mình khởi tạo lớp **Dog** và sử dụng method **Speak()** kết quả in ra dữ liệu của method trong lớp **Animal** như vậy không thể hiện được tính đa hình.

Sau đây mình sẽ sử dụng 2 từ khóa **virtual** và **override**:

```java
using System;
namespace oop
{
    class Animal
    {
        public virtual void Speak()
        {
            Console.WriteLine("Animal is speaking...");
        }
    }
}
using System;
namespace oop
{
    class Dog: Animal
    {
       override
       public void Speak(){
            Console.WriteLine("Dog speaks go go");
       }
    }
}
using System;
namespace oop
{
    class Cat : Animal
    {
        override
        public void Speak()
        {
            Console.WriteLine("Cat speaks meo meo");
        }
    }
}
using System;
namespace oop
{
    class Program
    {
        static void Main(string[] args)
        {
            Animal dog = new Dog();
            dog.Speak();
            Animal cat = new Cat();
            cat.Speak();
            Console.ReadLine();
        }
    }
}
```

Output:

![](https://images.viblo.asia/2866944d-7ff0-460d-9dca-86c59e104983.png)

Khi sử dụng **virtual** và **override** kết quả đã thể hiện được tính đa hình, lúc này từ khóa **override** đã được ưu tiên và ghi đè phương thức ảo từ lớp cha, khi các đối tượng gọi chung phương thức **Speak()** nó sẽ được trỏ tới phương thức tương ứng của mỗi đối tượng được khởi tạo.

### **Tính trừu tượng(Abstraction):**
Là phương pháp trừu tượng hóa định nghĩa lên những hành động, tính chất của loại đối tượng nào đó cần phải có.
Ví dụ khi bạn định nghĩa một lớp động vật(Animal), Animal thì có rất nhiều loại, làm sao để xác định đó là một loại động vật? lúc này bạn sẽ hình dung trong đầu động vật có những tính chất hành vi cơ bản nhất định phải có như ăn, nói khi bất kỳ một developer nào định viết một đối tượng thuộc lớp động vật sẽ kế thừa lại lớp Animal có 2 hành vi ăn, nói,đối tượng được tạo ra có thể khác nhau như chó hoặc mèo nhưng đều có những hành vi của động vật là ăn và nói.
**=>** Trong ví dụ trên nhìn vào hành vi ăn và nói của chó và mèo ta có thể khẳng định nó thuộc lớp động vật. Vậy chốt lại rõ làng tính trừu tượng ở đây sinh ra chủ yếu để trừu tượng hóa và định nghĩa các tính chất hành vi phải có để xác định đó là đối tượng gì dựa vào tính chất hành vi của đối tượng.
**=>** Các method trừu tượng đều rỗng không thực hiện bất kỳ hành vy nào, hành vy sẽ được triển khai cụ thể do các đối tượng kế thừa.
**=>** Viết xong đoạn trên không biết các bạn đọc có hiểu không @@ thấy có vẻ lan man quá, vì chưa có kinh nghiệm @@, nói chung định nghĩa một phần phải thực hành nhiều coder mà, thực hành nhiều tự các bạn sẽ hiểu ra :)).

Tiếp tục nhé ^^ trong c# có 2 phương pháp để triển khai tính trừu tượng này:
1. Abstract class
* trong abstract class có 2 loại method:
    * abstract method (là method rỗng không thực hiện gì)
- method thường (là vẫn có logic trả về data hoặc thực thi hành động nào đó, nó được sử dụng cho mục đích dùng chung)

![](https://images.viblo.asia/681136d2-a09e-42f3-b35f-abd4f796d349.png)

Abstract class Animal và 2 class Dog, Cat kế thừa lại những method được public
2. **Interface** : Khá giống với abstract class nhưng interface không phải là class, trong interface chỉ  có khai báo những method/properties trống không có thực thi, thực thi sẽ được thể hiện trong các lớp kế thừa, interface giống như một cái khung mẫu để các lớp implement và follow.

![](https://images.viblo.asia/d704c89c-b46e-4787-a6ae-93c811cca67f.png)

Tạo 2 interface IAnimal,Interface2 và 2 class Pig,Bird kế thừa 2 interface

Trước mình học đến phần này thấy rất khó hiểu thằng abstract class và interface không biết khi nào dùng interface hay abstract class sự khác nhau của nó là gì, có abstract class rồi còn sinh ra interface làm gì? chi tiết hơn mình viết trong bài: [Khác nhau giữa abstract class và interface khi nào dùng chúng](https://viblo.asia/p/khac-nhau-giua-abstract-class-va-interface-khi-nao-dung-chung-1Je5Edb4lnL)
bài này mình chỉ viết về 4 đặc tính của OOP thôi, viết dài quá nhìn lại không muốn đọc rồi :)).

=> Nói chung phải thực hành nhiều làm vài dự án thực tế, sau bài này tạo luôn mấy cái demo về chức năng gì đó(thêm, sửa, xóa sinh viên chẳng hạn làm theo mô hình này) mới hiểu rõ được tự trải nghiệm bao giờ cũng hơn.
=> Chốt lại bài viết này là đúc rút từ kinh nghiệm thực tế của mình mấy cái hình ảnh diagram hay code đều là tự mình cắt ra trên visual 2017 không phải ảnh mạng nhé trừ cái ảnh đầu tiên, nên sẽ có những sai sót các bạn cứ đóng góp ý kiến gạch đá thoải mái nhé, mình sẽ còn update ^^