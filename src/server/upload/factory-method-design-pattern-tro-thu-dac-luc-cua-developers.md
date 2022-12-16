![](https://images.viblo.asia/fa6170a7-ffd8-44a4-940f-2ccc47849fcd.png)

## 1. Giới thiệu
Factory method (hay còn gọi là virtual constructor) là một mẫu thiết kế thuộc nhóm Creational Patterns – những mẫu thiết kế cho việc khởi tạo đối tượng của lớp
Khi chúng ta muốn tạo ra một object của một type nào đấy, nhưng chúng ta không biết rõ mình sẽ phải tạo ra cái gì, mà nó phải dựa vào một số điều kiện business logic đầu vào để tạo ra object tương ứng, thì chúng ta có thể sử dụng Factory Method này.

#### Định nghĩa
Factory Method cung cấp một interface, phương thức trong việc tạo nên một đối tượng (object) trong class. Nhưng để cho class con kế thừa của nó có thể ghi đè để chỉ rõ đối tượng (object) nào sẽ được tạo. Factory method giao việc khởi tao một đối tượng (object) cụ thế cho lớp con (subclass)
#### Mục đích:
* Tạo ra một cách khởi tạo object mới thông qua một interface chung
* Che giấu quá trình xử lý logic của phương thức khởi tạo
* Giảm sự phụ thuộc, dễ dàng mở rộng
* Giảm khả năng gây lỗi compile
![](https://images.viblo.asia/6ed7d8a5-7e91-4666-8156-1a0676b2c912.png)

## 2. Mục đích ra đời
Giả sử ta có 3 class Dog, Cat, Duck cùng implement interface Animal. 
![](https://images.viblo.asia/1ea931d6-4432-4990-ab2a-94ea05b47913.png)

Khi mà chúng ta muốn khởi tạo ra một object có type là Animal, nhưng mà ta chưa biết sẽ phải tạo ra con chó, mèo hay con vịt mà nó phụ thuộc vào một số điều kiện, hoàn cảnh cụ thể nào đó. Thì thông thường ta sẽ khởi tạo như thế này.
```javascript
IAnimal animal;

if (...) {
    animal = new Dog();
} else if (...) {
    animal = new Cat();
} else if (...) {
    animal = new Duck();
}
```
Nhưng mà nếu như chúng ta cần sử dụng những logic để tạo ra object này ở nhiều nơi khác nhau, thì những đoạn code này sẽ bị lặp đi lặp lại.

Đặc biệt là khi chúng ta muốn thay đổi, chỉnh sửa hay mở rộng, ta đều phải sửa tất cả những nơi có logic đó gây mất thời gian và dễ bị sót hay lỗi.
![](https://images.viblo.asia/02bc95d1-e578-4cd3-9853-1a35e0dd25e9.png)

Từ đó thì Factory Method ra đời, với vai trò là một cái interface với một method mà nó sử dụng để gói cái việc khởi tạo một object vào cái method đó. Tức là chúng ta sẽ đưa ra những cái business logic để khởi tạo ra những object này vào 1 cái factory method

Khi đó nó sẽ giúp cho code của chúng ta được gọn đi rất là nhiều so với việc sử dụng logic đấy ở nhiều nơi khác nhau. Đặc biệt là nó giúp code của bạn có tính đa hình, có nghĩa là tùy vào từng trường hợp cụ thể, chúng ta có thể chọn sử dụng factory method với parameter khác nhau để quyết định khởi tạo ra object nào.
```java
public class AnimalFactory {
    public static IAnimal CreateAnimal(AnimalType type)
    {
        IAnimal animal = null;
        switch (type) {
            case AnimalType.Cat:
                animal = new Cat();
                break;
            case AnimalType.Dog:
                animal = new Dog();
                break;
            case AnimalType.Duck:
                animal = new Duck();
                break;
        }
        return animal;
    }
}
```

## 3. Kiến trúc
![](https://images.viblo.asia/87b847da-a31e-47ba-83c5-3b4090d80893.png)

Các thành phần trong mô hình:
* Product : Định nghĩa một khuôn mẫu (interface) của các đối tượng mà factory method tạo ra.
* Concreteproduct: các lớp được cài đặt khuôn mẫu product.
* Creator:
* Khai báo factory method, trả về kiểu đối tượng thuộc kiểu product. Creator cũng có thể định nghĩa một cài đặt mặc định của factory method mà giá trị trả về là một đối tượng concreteproduct mặc định.
* Gọi factory method để tạo đổi tượng kiểu product.
* ConcreteCrator: ghi đè factory method để trả về một instance của concreteproduct.
## 4. Ưu & nhược điểm
#### Ưu điểm
* Che giấu quá trình xử lý logic của phương thức khởi tạo
* Hạn chế sự phụ thuộc giữa creator và concrete products
* Dễ dàng mở rộng, thêm những đoạn code mới vào chương trình mà không cần phá vỡ các đối tượng ban đầu
* Giúp gom các đoạn code tạo ra product vào một nơi trong chương trình, nhờ đó giúp dễ theo dõi và thao tác.
* Giảm khả năng gây lỗi compile, trong trường hợp chúng ta cần tạo một đối tượng mà quên khai báo lớp, chúng ta cũng có thể xử lý lỗi trong Factory và khai báo lớp cho chúng sau.

=> Vì những đặc điểm trên nên factory pattern thường được sử dụng trong các thư viện (người sử dụng đạt được mục đích tạo mới object và không cần quan tâm đến cách nó được tạo ra)

#### Nhược điểm
* Source code có thể trở nên phức tạp hơn mức bình thường do đòi hỏi phải sử dụng nhiều class mới có thể cài đặt được pattern này.
* Việc refactoring ( tái cấu trúc ) một class bình thường có sẵn thành một class có Factory Method có thể dẫn đến nhiều lỗi trong hệ thống, phá vỡ sự tồn tại của clients
* Factory method pattern lệ thuộc vào việc sử dụng private constructor nên các class không thể mở rộng và kế thừa
## 5. Khi nào thì sử dụng 
Factory method được sử dụng khi:
* Chúng ta có một super class với nhiều class con và dựa trên đầu vào, chúng ta cần trả về một class con. Mô hình này giúp chúng ta đưa trách nhiệm của việc khởi tạo một lớp từ phía người dùng (client) sang lớp Factory, giúp tiết kiệm tài nguyên hệ thống vì nhờ vào việc tái sử dụng các object đã có thay vì xây dựng lại mỗi phần có thêm product
* Chúng ta không biết sau này sẽ cần đến những lớp con nào nữa. Khi cần mở rộng, hãy tạo ra sub class và implement thêm vào factory method cho việc khởi tạo sub class này.

## 6. Source code minh họa với C#
```csharp
    public interface IPizza
    {
        decimal GetPrice();
    }
    public class HamAndMushroomPizza : IPizza
    {
        private decimal price = 8.5M;
        public decimal GetPrice() { return price; }
    }

    public class DeluxePizza : IPizza
    {
        private decimal price = 10.5M;
        public decimal GetPrice() { return price; }
    }

    public class SeafoodPizza : IPizza
    {
        private decimal price = 11.5M;
        public decimal GetPrice() { return price; }
    }

    public class PizzaFactory
    {
        public enum PizzaType
        {
            HamMushroom, Deluxe, Seafood
        }
        public IPizza CreatePizza(PizzaType pizzaType)
        {
            IPizza pizza = null;
            switch (pizzaType)
            {
                case PizzaType.HamMushroom:
                    pizza = new HamAndMushroomPizza();
                    break;
                case PizzaType.Deluxe:
                    pizza = new DeluxePizza();
                    break;
                case PizzaType.Seafood:
                    pizza = new SeafoodPizza();
                    break;
            }
            return pizza;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {

            PizzaType type = PizzaType.Seafood;
            IPizza pizza;

            //nomarl
            if (type == PizzaType.Seafood)
            {
                pizza = new SeafoodPizza();
            }
            else if (type == PizzaType.Deluxe)
            {
                pizza = new DeluxePizza();
            }
            else
            {
                pizza = new HamAndMushroomPizza();
            }

            // by Factory method 
            //pizza = PizzaFactory.CreatePizza(type);
            Console.WriteLine(pizza.GetPrice().ToString());
        }
    }
```
## 7. Design Pattern liên quan
* Abstract factory: thường được sử dụng cùng factory method
* Prototypes: không yêu cầu phân lớp từ creator. Tuy nhiên, chúng thường yêu cầu khởi tạo trên lớp product. Creator sử dụng Initialize để khởi tạo đối tượng.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern