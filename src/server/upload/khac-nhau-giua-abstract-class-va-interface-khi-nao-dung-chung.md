Nhắc đến **Interface** và **abstract class** hãy nhớ 2 từ này khá clear rồi, Khi sử dụng **Interface** là bạn **Implement** còn sử dụng **abstract class** là bạn **extend**
* **Interface:**
    * Không phải là class.
    * Chỉ chứa những method/properties trống không có thực thi.
    * Nó giống như một khuôn mẫu, một khung để để các lớp implement và follow.
    * Các lớp có thể implements nhiều interface.
    * Là một contract, các class implement phải triển khai các method theo như interface đã định nghĩa.
* **Abstract class:**
    * Khá giống Interface nhưng nó có thể làm nhiều việc hơn.
    * Có 2 loại method là abstract method và method thường:
        * abstract method là method trống không có thực thi.
        * method thường là method có thực thi.
    * Các lớp chỉ có thể kế thừa một Abstract class
    * Hướng đến tính năng và những tính năng có thực thi được sử dụng làm hàm chung cho các class extend.

Đi vào ví dụ bằng code cho từng loại nhé:
**Interface**

![](https://images.viblo.asia/5bb305ff-9a3f-4d53-923c-f33b001fbcee.png)

Tạo 2 interface IAnimal,Interface2 và 2 class Pig,Bird kế thừa 2 interface

```csharp
namespace oop
{
    interface IAnimal
    {
        void Speak();
        void Eat();
        int X { get; set; }
    }
}
```
```csharp
namespace oop
{
    interface Interface2
    {
        int Method1();
    }
}
```
```csharp
using System;

namespace oop
{
    class Pig : IAnimal,Interface2
    {
        public void Eat()
        {
            Console.WriteLine("Lợn ăn cám...");
        }

        public void Speak()
        {
            Console.WriteLine("Lợn kêu ec ec...");
        }

        public int X { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public int Method1()
        {
            throw new NotImplementedException();
        }
    }
}
```
```csharp
using System;
namespace oop
{
    class Bird : IAnimal, Interface2
    {
        public void Eat()
        {
            Console.WriteLine("Chim ăn sâu...");
        }
        
        public void Speak()
        {
            Console.WriteLine("Chim hót chip chip...");
        }

        public int X { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public int Method1()
        {
            throw new NotImplementedException();
        }
    }
}
```
```csharp
using System;

namespace oop
{
    class Program
    {

        static void Main(string[] args)
        {
            Pig p = new Pig();
            Bird b = new Bird();
            p.Speak();
            p.Eat();

            b.Speak();
            b.Eat();
            Console.ReadLine();
        }
    }
}
```

Output:

![](https://images.viblo.asia/f7f453c4-2b92-4d83-a155-b09d0907ef13.png)

Kết quả thực thi của class Pig, Bird sau khi implement các method của interface.

Ở demo trên mình tạo ra 2 interface IAnimal và Interface2 tiếp theo là 2 class Pig,Bird implement 2 interface.

* Rồi đầu tiên bạn thấy điều gì trong interface? tất cả các method đều trống, không xử lý gì hết.
* Các class **Pig**, **Bird** bắt buộc phải implement tất cả các method trong interface
* Có thể Implement nhiều interface

**Abstract class:**

![](https://images.viblo.asia/b27cafeb-ab9a-41d3-ad4e-5625e0e2cb5b.png)

Abstract class Animal có 2 method là abstract method(Speak) và method thường(Eat), class Dog và Cat kế thừa lại abstract method

Triển khai code:

```csharp
using System;

namespace oop
{
    abstract class Animal
    {
        public abstract void Speak();

        public virtual void Eat(string something)
        {
            Console.WriteLine("Eat " + something);
        }
    }
}
```
```csharp
using System;

namespace oop
{
    class Dog : Animal
    {
        public override void Speak()
        {
            Console.WriteLine("Dog speaks go go");
        }
    }
}
```
```csharp
using System;

namespace oop
{
    class Cat : Animal
    {
        public override void Speak()
        {
            Console.WriteLine("Cat speaks meo meo");
        }
    }
}
```

Output:

![](https://images.viblo.asia/ef634e02-8918-4d06-aa38-17fcc9c2b2ff.png)

Như demo trên mình tạo abstract class Animal gồm 2 method, một abstract method và một method thường có thực thi.
Có thể thấy là class **Dog**, **Cat** chỉ có thể extend một abstract class, và chỉ phải implement những abstract method còn những method thường không implement vẫn có thể sử dụng, ở trên mình viết method **Eat()** với từ khóa virtual nên class **Dog**, Cat có thể override lại.

Sau 2 demo trên các bạn rút ra được ưu điểm, nhược điểm, hay khi nào dùng **interface** hoặc **abstract** class không @@.
Mình thấy thế này :
* **Ưu điểm:**
    * *Interface*
        * Có thể kế thừa nhiều interface(tính đa hình).
        * Xây dựng được bộ khung mẫu mà các lớp phải follow theo.
        * Giúp quản lý tốt, nắm bắt được các chức năng phải có cho một đối tượng nào đó.
    * *Abstract class*
        * Có thể linh động các method. giống như một class thông thường.
        * Các class extend có thể override hoặc không override các method thường.
*  **Nhược điểm:**
    *  *Interface:*
        *  Mỗi khi định nghĩa thêm tính năng, các class impelement nó đồng lọat phải thêm tính năng đó, khả năng cao sẽ không có xử lý gì.
    * *Abstract class*
        * Không thể extend nhiều abstract class.
* **Khi nào sử dụng chúng:**
    * **Interface :** Khi bạn muốn tạo dựng một bộ khung chuẩn gồm các chức năng mà những module hay project cần phải có. Giống như sau khi nhận requirement của khách hàng về team ngồi với nhau và phân tích các đầu mục các tính năng của từng module, sau đó triển khai vào code viết các interface như đã phân tích,để các bạn dev có thể nhìn vào đó để thực hiện đủ các tính năng (khi đã implement rồi thì không sót một tính năng nào ^^).
    * **Abstract class:** Giống như demo trên bạn có thể hiểu khi định nghĩa một đối tượng có những chức năng A,B,C trong đó tính năng A,B chắc chắn sẽ thực thi theo cách nào đó, còn tính năng C phải tùy thuộc vào đối tượng cụ thể là gì, như đối tượng Dog, Cat tuy chúng đều có thể phát ra âm thanh nhưng âm thanh là khác nhau. Vì vậy method Speak() là abstract method để chỉ ra rằng tính năng này còn dang dở chưa rõ thực thi, các lớp extend phải hoàn thành nốt tính năng này, còn những tính năng đã hoàn thành vẫn sử dụng như bình thường đây là những tính năng chung.


Xong rồi haiz hơi rối @@ bạn đọc xong cho mình ý kiến nhé. thank you :D

=> Lý thuyết thì một phần căn bản phải practice và practice nhiều @@


Các bạn có thể tham khảo thêm ở đây nhé:

https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interface
https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/abstractt