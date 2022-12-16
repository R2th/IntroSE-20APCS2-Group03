Delegate là gì?
Delegate là một khái niệm quen thuộc trong C#, .NET, nó  tương tự như con trỏ hàm trong C++. Delegate được dùng để tạo một bao đóng (encapsulation) cho bất kì phương thức nào, phù hợp (kiểu trả về, tham số) do delegate định nghĩa ra. Delegate có thể triệu gọi phương thức bất kì nơi nào: từ đối tượng này đến đối tượng kia, từ thread này sang thread kia,… Delegate có thể được truyền vào làm tham số của các phương thức.

Dưới đây là ví dụ delegate sử dụng trong C#
```
    public delegate int CalculateSomething(int x,int y);
 
    public static void Main(string[] args)
    {
        Math m=new Math();
        CalculateSomething obj = (x,y)=>x+y;
 
        int value=obj(1,2);
 
        Console.WriteLine(value); // output: 3
    }
```

Delegate cho phép ta design class tách biệt được khai báo method và việc implement method đấy. Điều này tương tự như việc ta sử dụng interface để định nghĩa method và cài đặt phần implement của method đấy tại các class kế thừa. 
```
interface ICalculate{  
    int apply(int x,int y);  
}  
  
class CalculateSum implements ICalculate{  
    int apply(int x,int y){
        return x + y;
    }
}
```

Từ trước java 8, Java không tồn tại kiểu khai báo này tương tự như Delegate trong C#, bởi lẽ nghĩ rằng delegate là không cần thiết, những gì delegate cần, chúng ta đã có thể implement bằng cách sử dụng interface. 

Tuy nhiên, nhu cầu sử dụng trực tiếp một function dưới dạng tham số, con trỏ hàm dần trở lên rõ ràng trong các trường hợp sau:
- Sử dụng event design pattern
- Method được sử dụng là method tĩnh, không quan tâm đến các thuộc tính, phương thức khác trên đối tượng đang triển khai phương thức.
- Cần linh hoạt trong việc implement method thực hiện
- Và việc implement cần ngắn ngọn hơn nữa.

Và java 8 đưa vào functional interface để hỗ trợ define ra duy nhất một function, điêu này giúp interface này hoạt động gần giống vs delegate trong C#.
```
@FunctionalInterface
public interface Functional<R,T> {
    R apply(T t);
}
```
Chúng ta có thể viết như sau:
```
public delegate int CalculateSomething(int x,int y);
// tương ứng vs
public BiFunction<Integer, Integer, Integer> CalculateSomething;
```
Điều này giúp Java có thể implement source code được theo cách Functional Programing.
Java 8 đã support define sẵn một số function thường dùng:

```
public interface Consumer<T> {
    void accept(T t);
}

public interface Predicate<T> {
    boolean test(T t);
}

public interface Supplier<T> {
    T get();
}

public interface Function<T, R> {
    R apply(T t);
}

public interface BiFunction<T, U, R> {
     R apply(T t, U u);
}

.... và lamba
```

Tuy functional interface trong java 8 chưa thật sự giống vs khái niệm delegate trong C#, nhưng nó cũng đã đáp ứng được khá nhiều nhu cầu lập trình làm việc với method.