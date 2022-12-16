# Giới thiệu
Trong bài trước thì mình đã giới thiệu về **"Prototype Pattern in C#"**, hôm nay thì mình xin tiếp tục giới thiệu về 1 pattern trong **"Creational Patterns"**, đó chính là **Singleton**.

# Định nghĩa
Hẳn đây là 1 pattern mà được rất nhiều anh em sử dụng. 
**Singleton** được sử dụng để đảm bảo chỉ có 1 object duy nhất của class được tạo ra.
Độ sử dụng thường xuyên: ***Rất cao***

Để hiểu rõ hơn về pattern này thì chúng ta sẽ cùng xem giải thích và ví dụ nhé.

# UML Diagram
![](https://images.viblo.asia/e59e2e60-39e1-4299-bc2a-8b61f5f5e5ee.gif)

## Các thành phần
Các class và object tham gia vào pattern này bao gồm:
- **Singleton**   (LoadBalancer)
    * định nghĩa 1 method để client chỉ có thể access duy nhất 1 instance của class được tạo ra. 
    * chịu trách nhiệm tạo ra và duy trì unique object 

# Cấu trúc code trong C#
```
using System;
 
namespace DoFactory.GangOfFour.Singleton.Structural
{
  /// <summary>

  /// MainApp startup class for Structural

  /// Singleton Design Pattern.

  /// </summary>

  class MainApp

  {
    /// <summary>

    /// Entry point into console application.

    /// </summary>

    static void Main()
    {
      // Constructor is protected -- cannot use new

      Singleton s1 = Singleton.Instance();
      Singleton s2 = Singleton.Instance();
 
      // Test for same instance

      if (s1 == s2)
      {
        Console.WriteLine("Objects are the same instance");
      }
 
      // Wait for user

      Console.ReadKey();
    }
  }
 
  /// <summary>

  /// The 'Singleton' class

  /// </summary>

  class Singleton

  {
    private static Singleton _instance;
 
    // Constructor is 'protected'

    protected Singleton()
    {
    }
 
    public static Singleton Instance()
    {
      // Uses lazy initialization.

      // Note: this is not thread safe.

      if (_instance == null)
      {
        _instance = new Singleton();
      }
 
      return _instance;
    }
  }
}
```

Kết quả 
```
Objects are the same instance
```
# Cấu trúc code trong dự án thực tế
```
using System;
using System.Collections.Generic;
using System.Threading;
 
namespace DoFactory.GangOfFour.Singleton.RealWorld
{
  /// <summary>

  /// MainApp startup class for Real-World 

  /// Singleton Design Pattern.

  /// </summary>

  class MainApp

  {
    /// <summary>

    /// Entry point into console application.

    /// </summary>

    static void Main()
    {
      LoadBalancer b1 = LoadBalancer.GetLoadBalancer();
      LoadBalancer b2 = LoadBalancer.GetLoadBalancer();
      LoadBalancer b3 = LoadBalancer.GetLoadBalancer();
      LoadBalancer b4 = LoadBalancer.GetLoadBalancer();
 
      // Same instance?

      if (b1 == b2 && b2 == b3 && b3 == b4)
      {
        Console.WriteLine("Same instance\n");
      }
 
      // Load balance 15 server requests

      LoadBalancer balancer = LoadBalancer.GetLoadBalancer();
      for (int i = 0; i < 15; i++)
      {
        string server = balancer.Server;
        Console.WriteLine("Dispatch Request to: " + server);
      }
 
      // Wait for user

      Console.ReadKey();
    }
  }
 
  /// <summary>

  /// The 'Singleton' class

  /// </summary>

  class LoadBalancer

  {
    private static LoadBalancer _instance;
    private List<string> _servers = new List<string>();
    private Random _random = new Random();
 
    // Lock synchronization object

    private static object syncLock = new object();
 
    // Constructor (protected)

    protected LoadBalancer()
    {
      // List of available servers

      _servers.Add("ServerI");
      _servers.Add("ServerII");
      _servers.Add("ServerIII");
      _servers.Add("ServerIV");
      _servers.Add("ServerV");
    }
 
    public static LoadBalancer GetLoadBalancer()
    {
      // Support multithreaded applications through

      // 'Double checked locking' pattern which (once

      // the instance exists) avoids locking each

      // time the method is invoked

      if (_instance == null)
      {
        lock (syncLock)
        {
          if (_instance == null)
          {
            _instance = new LoadBalancer();
          }
        }
      }
 
      return _instance;
    }
 
    // Simple, but effective random load balancer

    public string Server
    {
      get

      {
        int r = _random.Next(_servers.Count);
        return _servers[r].ToString();
      }
    }
  }
}
```
Kết quả
```
Same instance

ServerIII
ServerII
ServerI
ServerII
ServerI
ServerIII
ServerI
ServerIII
ServerIV
ServerII
ServerII
ServerIII
ServerIV
ServerII
ServerIV
```

# Kết luận
**Singleton** là 1 pattern được sử dụng rất rộng rãi và hữu dụng trong rất nhiều dự án, vì vậy hãy cân nhắc sử dụng, đây là 1 pattern rất hay vì nó tạo ra duy nhất 1 instance cho 1 class.
Cảm ơn các bạn đã đọc bài.

Bài viết có tham khảo từ nguồn: http://www.dofactory.com/net/singleton-design-pattern