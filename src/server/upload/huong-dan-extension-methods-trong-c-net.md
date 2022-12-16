![](https://images.viblo.asia/b2e10cd7-99ab-447f-9ccf-620211623251.jpg)

# Giới thiệu
Vào cuối 2007, **C# 3.0** được release với 1 vài tính năng nổi trội. Phiên bản này là 1 bước nhảy vọt của C#, bỏ xa 1 đoạn với ngôn ngữ cạnh tranh lúc đó là Java.
Những tính năng đó bao gồm:

* LINQ
* Lambda Expressions
* Expression trees
* Anonymous types
* Extension methods
* And some others

Có thể thấy là tập các tính năng mới C# 3.0 được tạo ra xoay quanh **LINQ**. Mỗi tính năng đều được sử dụng ở **LINQ**, và nó được dùng ở những cú pháp chuỗi trong các method (fluent-syntax) mà chúng ta thường dùng hôm nay.
Hãy nói về **Extension method**. Nó thường được dùng nhiều trong **LINQ**. Bất kì operation như Select, Where, OrderBy,... đều là 1 exension method. Những method này có thể được sử dụng với collections như array, List<T> và Dictionary<T>, thậm chí những method này không được thực sự có trong những class đó. Thật thú vị. 

**Extension method** làm cho code của chúng ta đẹp hơn rất nhiều. Hãy xem so sánh dưới đây

```CSharp
public IEnumerable<Customer> WithExtensionMethods(List<Customer> customers)
{
    return customers
        .Where(c => c.Age > 30 && c.Age < 40)
        .Where(c => c.Gender == "Male")
        .OrderBy(c => c.Transactions);
}
 
public IEnumerable<Customer> WithoutExtensionMethods(List<Customer> customers)
{
    return Enumerable.OrderBy(Enumerable.Where(
        Enumerable.Where(customers, c =>  c.Gender == "Male"), 
        c=>c.Age > 30 && c.Age < 40), //where
        c=>c.Transactions);//orderBy
}
```
 Có thể thấy **extension methods** thật tuyệt, nhưng khi nào chúng ta nên sử dụng? khi nào không nên? 

#  Extension Methods Guidelines
1. Sử dụng extension method khi chức năng extend liên quan đển extended type. Ví dụ, method date.AddDays(numDays) là hợp lí vì nó extends DateTime, kết quả trả về cũng là DateTime. Nhưng không hợp lí ở 1 trường hợp khác ví dụ days.AddToDate(date) mà extends int, method truyền vào date có vẻ không liên quan lắm.
    
2. Sử dụng extension methods dựa trên interface để thêm những chức năng common vào class không có common base class. Đây chính là cách mà LINQ method dùng để làm việc với IEnumrable interface

3. Nên có lý do hợp lí để sử dụng extension method thay vì 1 instance method. Chẳng hạn khi dealing với class mà không phải bạn tạo ra, như class từ 1 third party library. Ví dụ, bạn có thể extend **FileInfo** từ .NET framework
    
```CSharp
   public static int CountLines(this FileInfo fileInfo)
{
    return File.ReadAllLines(fileInfo.FullName).Length;
}
```
    
4. Bạn có thể sử dụng extension method để giảm sự phụ thuộc (achieve separation of concerns) khi bạn không muốn phụ thuộc vào 1 yếu tố nào đó với extended type. Ví dụ, bạn muốn extend Customer với method như bên dưới
```CSharp
public static AdjustLastSeen(this Customer customer, TimeZoneManager timeZoneManager)
{
    // ...
}
```
Ở trường hợp trên, nếu bạn không muốn Customer phụ thuộc vào TimeZoneManager, bạn có thể làm như trên với extension method.
    
5. Bằng cách sử dụng extention methods với 1 return type, bạn có thể có được cú pháp của functional programming syntax. Ví dụ:
```CSharp
public static IEnumerable<Customer> AboveAge(this IEnumerable<Customer> customers, int age)
{
    return customers.Where(c => c.Age > age);
}
 
public static IEnumerable<Customer> OnlyMale(this IEnumerable<Customer> customers)
{
    return customers.Where(c => c.Gender == "Male");
}
 
public static IEnumerable<Customer> OnlyFemale(this IEnumerable<Customer> customers)
{
    return customers.Where(c => c.Gender == "Female");
}
 
// usage:
var potentialBuyers = customers.AboveAge(42).OnlyFemale();
```
6.  Khi bạn không chắc chắn loại (Type) class nào nên extend, thì đừng dùng extension method. Ví dụ, để xây 1 cái nhà từ gạch (brick) và vữa (mortar) thì tôi có thể extend brick bằng cách brick.BuildHouse(mortar), hoặc cũng có thể extend mortar bằng cách mortar.BuildHouse(brick). Bởi vì cả 2 đều có vẻ phù hợp, lúc này không nên dùng extension method.
    
7. Tránh có state trong extension methods. Cũng giống như không nên có state trong static class.
    
8. Tránh extending primitives. Có 1 số nguyên nhân, như ở #1 thì nó khá khó để tìm thấy methods mà liên quan đến primitive.
    
9. Nhóm extension method cho những loại giống nhau trong cùng 1 class. Như vậy sẽ rất dễ tìm những method đó trong code. Bên cạnh đó thì nó có những điểm chung là đều liên quan đến extended type.
    
# Kết bài
   **Extension methods** là tính năng đột phát trong C#. Cho phép chúng ta viết code đẹp hơn, dễ đọc dễ hiểu hơn. Cho phép code viết theo functionally styped programming, rất cần thiết trong 1 ngôn ngữ hướng đối tượng.