# **1.Định nghĩa**
Abstract Factory cung cấp một đối tượng bằng cách ẩn đi những sự phức tạp đằng sau nó, có nghĩa là chúng ta có một số lớp phức tạp nào đó mà được sử dụng theo từng ngữ cãnh cụ thể chúng có thể có một số chức năng, thuộc tính thống nhất theo một mô hình nào đó, có thể là một số lớp cấu trúc từ một lớp abstract, chúng ta sẽ kết hợp chúng lại để xử lý trong một lớp, mà ở đó mọi công việc xử lý được diễn ra và chỉ trả về những cái cần thiết, điều này giúp mô hình chặt chẽ và dễ dàng để sử dụng.
# **2.Cấu trúc**
![](https://images.viblo.asia/70450b35-f413-4bf3-9b8a-76f9df0276d1.png)

* AbstractFactory: định nghĩa một giao tiếp cho thao tác khởi tạo các "sản phẩm" ảo (AbstractProduct)
* ConcreteFactory: thực thi giao tiếp AbstractFactory để tạo ra đối tượng cụ thể
* AbstractProduct: định nghĩa một lớp ảo cho một loại đối tương "sản phẩm"
* Product: kế thừa từ từ lớp "sản phẩm" ảo AbstractProduct, các lớp Product định nghĩa từ đối tượng cụ thể
* Client: sử dụng các lớp AbstractFactory và AbstractProduct trong hệ thống
# **3.Ví dụ**
```php
<?php

namespace AbstractFactory;

class ConcreteFactory1 implements AbstractFactory
{
    public function createProductA(): AbstractProductA
    {
        return new ConcreteProductA1();
    }

    public function createProductB(): AbstractProductB
    {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 implements AbstractFactory
{
    public function createProductA(): AbstractProductA
    {
        return new ConcreteProductA2();
    }

    public function createProductB(): AbstractProductB
    {
        return new ConcreteProductB2();
    }
}

interface AbstractProductA
{
    public function usefulFunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA
{
    public function usefulFunctionA(): string
    {
        return "The result of the product A1.";
    }
}

class ConcreteProductA2 implements AbstractProductA
{
    public function usefulFunctionA(): string
    {
        return "The result of the product A2.";
    }
}

interface AbstractProductB
{
  
    public function anotherUsefulFunctionB(AbstractProductA $collaborator): string;
}

class ConcreteProductB1 implements AbstractProductB
{
    public function usefulFunctionB(): string
    {
        return "The result of the product B1.";
    }

    public function anotherUsefulFunctionB(AbstractProductA $collaborator): string
    {
        $result = $collaborator->usefulFunctionA();

        return "The result of the B1 collaborating with the ({$result})";
    }
}

class ConcreteProductB2 implements AbstractProductB
{
    public function usefulFunctionB(): string
    {
        return "The result of the product B2.";
    }

    public function anotherUsefulFunctionB(AbstractProductA $collaborator): string
    {
        $result = $collaborator->usefulFunctionA();

        return "The result of the B2 collaborating with the ({$result})";
    }
}

function clientCode(AbstractFactory $factory)
{
    $product_a = $factory->createProductA();
    $product_b = $factory->createProductB();

    print($product_b->usefulFunctionB() . "\n");
    print($product_b->anotherUsefulFunctionB($product_a) . "\n");
}

print("Client: Testing client code with the first factory type...\n");
clientCode(new ConcreteFactory1());

print("\n");

print("Client: Testing the same client code with the second factory type...\n");
clientCode(new ConcreteFactory2());
```
* **Output**
```
Client: Testing client code with the first factory type...
The result of the product B1.
The result of the B1 collaborating with the (The result of the product A1.)

Client: Testing the same client code with the second factory type...
The result of the product B2.
The result of the B2 collaborating with the (The result of the product A2.)
```
# **4.Lời kết**
Như vậy mình đã giới thiệu xong đến mọi người về abstract factory pattern rồi. Về phần series này nó sẽ rất trừu tượng nên để hiểu rõ được thì các bạn cần phải nắm chắc được các kiến thức về OOP.