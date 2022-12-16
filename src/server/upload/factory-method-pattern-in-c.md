# Giới thiệu
Trong bài trước thì mình đã giới thiệu về **"Builder Pattern in C#"**, hôm nay thì mình xin tiếp tục giới thiệu về 1 pattern trong **"Creational Patterns"**, đó chính là **Factory Method**.

# Định nghĩa
**Factory Method** được sử dụng để định nghĩa interface tạo ra một object, nhưng chỉ để subclass quyết định class nào được sử dụng để tạo object theo class đó. Nó có thể được dùng tạo class interface trước và chỉ rõ class concrete sau.
Độ sử dụng thường xuyên: ***Rất cao***
Để hiểu rõ hơn về pattern này thì chúng ta sẽ cùng xem giải thích và ví dụ nhé.

# UML Diagram
![](https://images.viblo.asia/275af147-f6ef-448c-b66d-05dc0c657137.gif)

## Các thành phần
Các class và object tham gia vào pattern này bao gồm:
- **Product **(Page)
      + xác định interface của object mà factory method tạo ra
- **ConcreteProduct** (*SkillsPage, EducationPage, ExperiencePage*)
      + các class implements Product interface
- **Creator** (*Document*)
      + khai báo factory method, trả về 1 object là loại product cụ thể. Creator có thể là factory method mặc định trả về ConcreteProduct object mặc định
      + có thể gọi factory method để tạo ra Product object
- **ConcreteCreator** (*Report, Resume*)
     + override factory method để trả về instance của ConcreteProduct
# Cấu trúc code trong C#
```
using System;
 
namespace DoFactory.GangOfFour.Factory.Structural
{
  /// <summary>

  /// MainApp startup class for Structural 

  /// Factory Method Design Pattern.

  /// </summary>

  class MainApp

  {
    /// <summary>

    /// Entry point into console application.

    /// </summary>

    static void Main()
    {
      // An array of creators

      Creator[] creators = new Creator[2];
 
      creators[0] = new ConcreteCreatorA();
      creators[1] = new ConcreteCreatorB();
 
      // Iterate over creators and create products

      foreach (Creator creator in creators)
      {
        Product product = creator.FactoryMethod();
        Console.WriteLine("Created {0}",
          product.GetType().Name);
      }
 
      // Wait for user

      Console.ReadKey();
    }
  }
 
  /// <summary>

  /// The 'Product' abstract class

  /// </summary>

  abstract class Product

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class ConcreteProductA : Product

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class ConcreteProductB : Product

  {
  }
 
  /// <summary>

  /// The 'Creator' abstract class

  /// </summary>

  abstract class Creator

  {
    public abstract Product FactoryMethod();
  }
 
  /// <summary>

  /// A 'ConcreteCreator' class

  /// </summary>

  class ConcreteCreatorA : Creator

  {
    public override Product FactoryMethod()
    {
      return new ConcreteProductA();
    }
  }
 
  /// <summary>

  /// A 'ConcreteCreator' class

  /// </summary>

  class ConcreteCreatorB : Creator

  {
    public override Product FactoryMethod()
    {
      return new ConcreteProductB();
    }
  }
}
```

Kết quả 
```
Created ConcreteProductA
Created ConcreteProductB
```
# Cấu trúc code trong dự án thực tế
```
using System;
using System.Collections.Generic;
 
namespace DoFactory.GangOfFour.Factory.RealWorld
{
  /// <summary>

  /// MainApp startup class for Real-World 

  /// Factory Method Design Pattern.

  /// </summary>

  class MainApp

  {
    /// <summary>

    /// Entry point into console application.

    /// </summary>

    static void Main()
    {
      // Note: constructors call Factory Method

      Document[] documents = new Document[2];
 
      documents[0] = new Resume();
      documents[1] = new Report();
 
      // Display document pages

      foreach (Document document in documents)
      {
        Console.WriteLine("\n" + document.GetType().Name + "--");
        foreach (Page page in document.Pages)
        {
          Console.WriteLine(" " + page.GetType().Name);
        }
      }
 
      // Wait for user

      Console.ReadKey();
    }
  }
 
  /// <summary>

  /// The 'Product' abstract class

  /// </summary>

  abstract class Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class SkillsPage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class EducationPage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class ExperiencePage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class IntroductionPage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class ResultsPage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class ConclusionPage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class SummaryPage : Page

  {
  }
 
  /// <summary>

  /// A 'ConcreteProduct' class

  /// </summary>

  class BibliographyPage : Page

  {
  }
 
  /// <summary>

  /// The 'Creator' abstract class

  /// </summary>

  abstract class Document

  {
    private List<Page> _pages = new List<Page>();
 
    // Constructor calls abstract Factory method

    public Document()
    {
      this.CreatePages();
    }
 
    public List<Page> Pages
    {
      get { return _pages; }
    }
 
    // Factory Method

    public abstract void CreatePages();
  }
 
  /// <summary>

  /// A 'ConcreteCreator' class

  /// </summary>

  class Resume : Document

  {
    // Factory Method implementation

    public override void CreatePages()
    {
      Pages.Add(new SkillsPage());
      Pages.Add(new EducationPage());
      Pages.Add(new ExperiencePage());
    }
  }
 
  /// <summary>

  /// A 'ConcreteCreator' class

  /// </summary>

  class Report : Document

  {
    // Factory Method implementation

    public override void CreatePages()
    {
      Pages.Add(new IntroductionPage());
      Pages.Add(new ResultsPage());
      Pages.Add(new ConclusionPage());
      Pages.Add(new SummaryPage());
      Pages.Add(new BibliographyPage());
    }
  }
}
```
Kết quả
```
Resume -------
 SkillsPage
 EducationPage
 ExperiencePage

Report -------
 IntroductionPage
 ResultsPage
 ConclusionPage
 SummaryPage
 BibliographyPage
```

# Kết luận
**Factory Melthod** là 1 pattern được sử dụng rất rộng rãi và hữu dụng trong rất nhiều dự án, nên các bạn có thể cân nhắc để áp dụng Pattern này vào nếu thấy hợp lí. Cảm ơn các bạn đã đọc bài.
Bài viết có tham khảo từ nguồn: http://www.dofactory.com/net/factory-method-design-pattern