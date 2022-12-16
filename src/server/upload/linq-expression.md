Chúng ta đã biết rằng biểu thức lambda có thể được gán cho kiểu ủy nhiêm Func hoăc Action để sử lý trong bộ nhớ collection. Trình biên dịch .NET chuyển đổi biểu thức được gán cho Func hoặc Action thành mã thực thi tại thời gian biên dịch. 
Linq giơi thiệu một loại mới có tên gọi là Expression đại diện cho biểu thức lambda mạnh mẽ. Nó có nghĩa là biểu thức lambda cũng có thể được gán cho loại Expression<TDelegate>. Trình biên dich .NET chuyển đổi biểu thức lambda được gán cho biểu thức Expression<TDelegate>  thành một cây biểu thức  Expression thay vì mã thực thi. Cây biểu thức này được sử dụng để Linq truy vấn từ xa cấu trúc dữ liệu, xây dựng một truy vấn thời gian chạy từ nó (như Linq-to-Sql, entity framework hoặc bất ky một truy vấn Linq nào khác mà có interface là IQueryable<T>.
Hình minh họa dưới đây mình họa cho sự khác biệt khi biểu thức lambda được gán cho ủy nhiêm Func hoặc Action và Expression trong Linq.
    
![](https://images.viblo.asia/cd6b03f9-b44d-4e02-924d-afac885ed702.png)

    
**Định nghĩa một Expression**
    
   Chúng ta khai báo một namespace System.Linq.Expressions và sử dụng một class Expression<TDelegate> để định nghĩa một Expression. Expression<TDelegate> yêu cầu là loại ủy nhiêm Func hoặc Action.
Vd: bạn có thể gán một biểu thức lambda cho một biến là isTenAger với kiểu là Func delegate như sau:
    
```
public class Student 
{
    public int StudentID { get; set; }
    public string StudentName { get; set; }
    public int Age { get; set; }
}

Func<Student, bool> isTeenAger = s => s.Age > 12 && s.Age < 20;
```
 bây giờ ta chuyển biểu thức loại Func trên thành Expression bằng cách gói Func với Expresstion như sau:           
                                                               
  `Expression<Func<Student, bool>> isTeenAgerExpr = s => s.age > 12 && s.age < 20;`
                                                               
 theo cách tương tự, bạn cũng có thể gói một ủy nhiêm Action<t> với một Expression nếu nó không có giá trị trả về.
    
`Expression<Action<Student>> printStudentName = s => Console.WriteLine(s.StudentName);`
    
  **Gọi một Expression**
    
   Bạn có thể gọi một ủy nhiệm được gói trong một Expression giống như cách gọi một ủy nhiệm, nhưng trước tiên bạn phải dịch nó bằng phương thức Compile(). Compile() trả về một một ủy nhiệm của Func hoặc Action mà bạn có thể gọi nó như cách gọi một ủy nhiệm.

```
 Expression<Func<Student, bool>> isTeenAgerExpr = s => s.age > 12 && s.age < 20;

//compile Expression using Compile method to invoke it as Delegate
Func<Student, bool>  isTeenAger = isTeenAgerExpr.Compile();
            
//Invoke
bool result = isTeenAger(new Student(){ StudentID = 1, StudentName = "Steve", Age = 20});
```
    
**Cây Expression**
    
Cây Expression, như cái tên được đề cập, không có gì ngoài cấu trúc dữ liệu của nó được sắp xếp giống như hình cây. Mỗi nút trong cây biểu thức là một biểu thức. Vd: môt cây biểu thức được dùng trong biểu diễn một biểu thức toán học x,y trong đó x,y sẽ được biêu diễn dưới dạng một biểu thức và được sắp xếp trong một cấu trúc hình cây.
cây biểu thức là một biểu diễn trong bộ nhớ của biểu thức lambda. Nó chứa các yếu tố của một thực tế truy vấn, không phải là một kết quả của truy vấn.
cây biểu thức làm cho cấu trúc cảu lambda tường minh và rõ ràng hơn. Ta có thể tương tác với dữ liệu trong cây biểu thức giống như bất kỳ với dữ liệu nào khác.
Vd:  ta hãy xét một hàm isTeenAgerExpr sau:
    
`Expression<Func<Student, bool>> isTeenAgerExpr = s => s.age > 12 && s.age < 20;` 
                                                                                 
                                                                                
trình biên dich sẽ chuyển đổi biểu thức trên thành như sau:      
                                                                                 
```
    Expression.Lambda<Func<Student, bool>>(
        Expression.AndAlso(
            Expression.GreaterThan(Expression.Property(pe, "Age"), Expression.Constant(12, typeof(int))),
            Expression.LessThan(Expression.Property(pe, "Age"), Expression.Constant(20, typeof(int)))),
                new[] { pe });
```
    
ta cũng có thể xây dụng một cây biểu thức bằng tay, xét ví dụ lambda đơn giản sau:
    
`      Func<Student, bool> isAdult = s => s.age >= 18;`

ủy nhiệm này được xây dựng bằng tay như sau:
    
```
 public bool function(Student s)
 {
          return s.Age > 18;
 }
```
    
ta xem thêm một ví dụ về cây Expression qua đoan code sau:
    
```
ParameterExpression pe = Expression.Parameter(typeof(Student), "s");

MemberExpression me = Expression.Property(pe, "Age");

ConstantExpression constant = Expression.Constant(18, typeof(int));

BinaryExpression body = Expression.GreaterThanOrEqual(me, constant);

var ExpressionTree = Expression.Lambda<Func<Student, bool>>(body, new[] { pe });

Console.WriteLine("Expression Tree: {0}", ExpressionTree);
		
Console.WriteLine("Expression Tree Body: {0}", ExpressionTree.Body);
		
Console.WriteLine("Number of Parameters in Expression Tree: {0}", 
                                ExpressionTree.Parameters.Count);
		
Console.WriteLine("Parameters in Expression Tree: {0}", ExpressionTree.Parameters[0]);
```
    
Output:
```
Expression Tree: s => (s.Age >= 18)
Expression Tree Body: (s.Age >= 18)
Number of Parameters in Expression Tree: 1
Parameters in Expression Tree: s
```