# Giới thiệu
Trong bài trước thì mình đã giới thiệu về **"Factory Method Pattern in C#"**, hôm nay thì mình xin tiếp tục giới thiệu về 1 pattern trong **"Creational Patterns"**, đó chính là **Prototype**.

# Định nghĩa
**Prototype** được sử dụng để tạo ra object từ 1 object nguyên mẫu, bằng cách copy các thuộc tính của object đó.
Độ sử dụng thường xuyên: ***Khá cao***

Để hiểu rõ hơn về pattern này thì chúng ta sẽ cùng xem giải thích và ví dụ nhé.

# UML Diagram
![](https://images.viblo.asia/b4f67586-ca37-4857-b53d-fbe6dfb4ade7.gif)

## Các thành phần
Các class và object tham gia vào pattern này bao gồm:
- **Prototype**  (*ColorPrototype*)
      + Khai báo interface cho phép clone bản thân nó
- **ConcretePrototype**  (*Color*)
      + implements method từ interface để clone chính nó
- **Client**  (*ColorManager*)
      + tạo ra object mới bằng cách gọi prototype để clone nó

# Cấu trúc code trong C#
```
using System;
 
namespace DoFactory.GangOfFour.Prototype.Structural
{
  /// <summary>

  /// MainApp startup class for Structural

  /// Prototype Design Pattern.

  /// </summary>

  class MainApp

  {
    /// <summary>

    /// Entry point into console application.

    /// </summary>

    static void Main()
    {
      // Create two instances and clone each

 
      ConcretePrototype1 p1 = new ConcretePrototype1("I");
      ConcretePrototype1 c1 = (ConcretePrototype1)p1.Clone();
      Console.WriteLine("Cloned: {0}", c1.Id);
 
      ConcretePrototype2 p2 = new ConcretePrototype2("II");
      ConcretePrototype2 c2 = (ConcretePrototype2)p2.Clone();
      Console.WriteLine("Cloned: {0}", c2.Id);
 
      // Wait for user

      Console.ReadKey();
    }
  }
 
  /// <summary>

  /// The 'Prototype' abstract class

  /// </summary>

  abstract class Prototype

  {
    private string _id;
 
    // Constructor

    public Prototype(string id)
    {
      this._id = id;
    }
 
    // Gets id

    public string Id
    {
      get { return _id; }
    }
 
    public abstract Prototype Clone();
  }
 
  /// <summary>

  /// A 'ConcretePrototype' class 

  /// </summary>

  class ConcretePrototype1 : Prototype

  {
    // Constructor

    public ConcretePrototype1(string id)
      : base(id)
    {
    }
 
    // Returns a shallow copy

    public override Prototype Clone()
    {
      return (Prototype)this.MemberwiseClone();
    }
  }
 
  /// <summary>

  /// A 'ConcretePrototype' class 

  /// </summary>

  class ConcretePrototype2 : Prototype

  {
    // Constructor

    public ConcretePrototype2(string id)
      : base(id)
    {
    }
 
    // Returns a shallow copy

    public override Prototype Clone()
    {
      return (Prototype)this.MemberwiseClone();
    }
  }
}
 
```

Kết quả 
```
Cloned: I
Cloned: II
```
# Cấu trúc code trong dự án thực tế
```
using System;
using System.Collections.Generic;
 
namespace DoFactory.GangOfFour.Prototype.RealWorld
{
  /// <summary>

  /// MainApp startup class for Real-World 

  /// Prototype Design Pattern.

  /// </summary>

  class MainApp

  {
    /// <summary>

    /// Entry point into console application.

    /// </summary>

    static void Main()
    {
      ColorManager colormanager = new ColorManager();
 
      // Initialize with standard colors

      colormanager["red"] = new Color(255, 0, 0);
      colormanager["green"] = new Color(0, 255, 0);
      colormanager["blue"] = new Color(0, 0, 255);
 
      // User adds personalized colors

      colormanager["angry"] = new Color(255, 54, 0);
      colormanager["peace"] = new Color(128, 211, 128);
      colormanager["flame"] = new Color(211, 34, 20);
 
      // User clones selected colors

      Color color1 = colormanager["red"].Clone() as Color;
      Color color2 = colormanager["peace"].Clone() as Color;
      Color color3 = colormanager["flame"].Clone() as Color;
 
      // Wait for user

      Console.ReadKey();
    }
  }
 
  /// <summary>

  /// The 'Prototype' abstract class

  /// </summary>

  abstract class ColorPrototype

  {
    public abstract ColorPrototype Clone();
  }
 
  /// <summary>

  /// The 'ConcretePrototype' class

  /// </summary>

  class Color : ColorPrototype

  {
    private int _red;
    private int _green;
    private int _blue;
 
    // Constructor

    public Color(int red, int green, int blue)
    {
      this._red = red;
      this._green = green;
      this._blue = blue;
    }
 
    // Create a shallow copy

    public override ColorPrototype Clone()
    {
      Console.WriteLine(
        "Cloning color RGB: {0,3},{1,3},{2,3}",
        _red, _green, _blue);
 
      return this.MemberwiseClone() as ColorPrototype;
    }
  }
 
  /// <summary>

  /// Prototype manager

  /// </summary>

  class ColorManager

  {
    private Dictionary<string, ColorPrototype> _colors =
      new Dictionary<string, ColorPrototype>();
 
    // Indexer

    public ColorPrototype this[string key]
    {
      get { return _colors[key]; }
      set { _colors.Add(key, value); }
    }
  }
}
```
Kết quả
```
Cloning color RGB: 255,  0,  0
Cloning color RGB: 128,211,128
Cloning color RGB: 211, 34, 20
```

# Kết luận
**Prototype** là 1 pattern được sử dụng khá rộng rãi và hữu dụng trong rất nhiều dự án, nên các bạn có thể cân nhắc để áp dụng Pattern này vào nếu thấy hợp lí. 
Lưu ý là method ***Object.MemberwiseClone***  chỉ tạo ra 1 bản shallow copy của object hiện tại. Nên phân biệt rõ shallow copy và deep copy để hiểu được dữ liệu thật của các bạn sẽ là như thế nào. Các bạn có thể tham khảo ở đây https://msdn.microsoft.com/en-us/library/system.object.memberwiseclone(v=vs.110).aspx

Bài viết có tham khảo từ nguồn: http://www.dofactory.com/net/prototype-design-pattern