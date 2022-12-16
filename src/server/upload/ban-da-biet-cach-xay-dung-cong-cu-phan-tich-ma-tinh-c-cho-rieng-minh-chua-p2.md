Ở phần trước ta đã hiểu được mọi thứ cơ bản của Roslyn như: syntax tree, syntax node, token, trivia... để có thể xây dựng cho riêng mình một công cụ phân tích mã tĩnh. Tuy nhiên mọi thứ chỉ đang dừng lại ở mức phân tích cú pháp. Với những kiến thức trên ta có thể tìm các lỗi về cú pháp như tên method, tên class không tuân theo quy tắc đặt tên chẳng hạn. Tuy nhiên với những lỗi phức tạp hơn ta cần công cụ mạnh mẽ hơn. Đó `Data Flow Analysis` và `Control Flow Analysis`, đây chính là thứ chúng ta sẽ bàn luận trong bài viết này.
# Data Flow Analysis

API này có thể được sử dụng để kiểm tra cách các biến được đọc và ghi trong một khối mã nhất định. Trong trường hợp bạn muốn viết một chương trình hoặc một extension nhằm ghi lại toàn bộ mọi thứ xảy ra với một biến nhất định như là biến đó có được đọc ở đâu không, có được gán giá trị lại ở đâu không thì API này dành cho bạn. 

Hãy cùng xem xét vòng lặp sau, và ta sẽ xem xét xem `Data Flow Analysis` sẽ làm được những gì.

```csharp
var tree = CSharpSyntaxTree.ParseText(@"
public class Sample
{
   public void Foo()
   {
        int[] outerArray = new int[10] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4};
        for (int index = 0; index < 10; index++)
        {
             int[] innerArray = new int[10] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 };
             index = index + 2;
             outerArray[index – 1] = 5;
        }
   }
}");
 
var Mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);
 
var compilation = CSharpCompilation.Create("MyCompilation",
    syntaxTrees: new[] { tree }, references: new[] { Mscorlib });
var model = compilation.GetSemanticModel(tree);
 
var forStatement = tree.GetRoot().DescendantNodes().OfType<ForStatementSyntax>().Single();
DataFlowAnalysis result = model.AnalyzeDataFlow(forStatement);
```

Tại đây chúng ta đã truy cập vào đối tượng  `DataFlowAnalysis`. Đối tượng này chứa nhiều thuộc tính quan trọng nhưng có lẽ thuộc tính quan trọng nhất của đối tượng này là `Successded`. Nó cho chúng ta biết rằng việc phân tích luồng dữ liệu đã hoàn tất thành công hay là chưa. Trong trường hợp mã không hợp lệ về mặt ngữ nghĩa, cú pháp, thì có thể việc phân tích sẽ không thành công.

Đối tượng này có một số thuộc tính thú vị khác như:

* `AlwaysAssigned`: Tập các biến cục bộ mà giá trị luôn được gán bên trong một vùng. 
* `ReadInside`: Tập các biến cục bộ được đọc bên trong một vùng.
* `WrittenOutside`: Tập các biến cục bộ được viết bên ngoài một vùng.
* `WrittenInside`: Tập các biến cục bộ được viết bên trong một vùng.
* `VariablesDeclared`: Tập các biến cục bộ được khai báo trong một vùng. Lưu ý rằng vùng này phải được giới hạn bởi phần thân của phương thức hoặc bộ khởi tạo của trường, vì vậy, các tham số sẽ không được đưa vào kết quả.

Quay lại với đoạn code ở trên. Sau khi chạy phân tích, kết quả chúng ta có được như sau:

**AlwaysAssigned: index**
`index` luôn được gán vì nó được chứa trong bộ khởi tạo của vòng lặp for.

**WrittenInside: index, innerArray**
Cả `index` và `innerArray` đều được ghi giá trị trong vòng lặp. Cần lưu ý một điểm rẳng `outerArray` không phải là `WrittenInside`. Bởi vì khi chúng ta thay đổi mảng, chúng ta không thay đổi tham chiếu có trong các biến của `outerArray`.

**WrittenOutside: outerArray, this**
`outerArray` rõ ràng được ghi  bên ngoài vòng lặp for.

Tuy nhiên, điều ngạc nhiên ở đây là khi `this` xuất hiện trong danh sách `WrittenOutside`. `this` được truyền dưới dạng một tham số cho class và các thành viên của nó.

**ReadInside: index, outerArray**
Rõ ràng là giá trị của `index` được đọc trong vòng lặp.

Điều ngạc nhiên ở đây là `outerArray` được coi là "read" bên trong vòng lặp vì chúng ta không đọc trực tiếp giá trị của nó. Tôi nghĩ rằng, trước tiên chúng ta phải đọc giá trị của `outerArray` để tính toán `offset` và truy xuất địa chỉ chính xác cho phần tử đã cho của mảng. Vì vậy, nó đang thực hiện một loại "đọc ngầm" bên trong vòng lặp ở đây.

**VariablesDeclared: index, innerArray**
Điều này khá đơn giản. `index` được khai báo trong bộ khởi tạo vòng lặp và `innerArray` trong phần thân của vòng lặp for.

Có lẽ các bạn đã hiểu qua về cách sử dụng API này. Hãy cũng đi đến một thứ gì đó hay ho nhé

## Đặt bài toán

Bạn muốn xác định các biến được khai báo nhưng không được dùng ở bất kì chỗ nào cả. Vậy ta sẽ phải làm thế nào?

Tôi nghĩ rằng, một biến không bao giờ được dùng khi mà nó không được `readInside` hay là `readOutside`. Hãy cùng xem xét đoạn code sau và kiểm tra lại suy nghĩ của tôi nhé

```csharp
public class Sample
{
   public void Foo()
   {
        
        int[] outerArray = new int[10] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4};
        for (int index = 0; index < 10; index++)
        {
             int a;
             int[] innerArray = new int[10] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 };
             index = index + 2;
             outerArray[index – 1] = 5;
        }
   }
}
```
Nêu như suy đoán của tôi là đúng như vậy thì kết quả sẽ trả về biến `a` và `innerArray`không được sử dụng. Và sau đây là đoạn code dùng để kiểm tra suy đoán của tôi.

```csharp


using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Linq;

public class ifwalker : CSharpSyntaxWalker
{

    public static bool IsNeverUsed(LocalDeclarationStatementSyntax localDeclaration,
                        SemanticModel semanticModel,
                        DataFlowAnalysis dataFlowAnalysis)
    {
        if (dataFlowAnalysis.ReadInside.Contains(
                semanticModel.GetDeclaredSymbol(localDeclaration.Declaration.Variables.First()))
            )
            return false;

        return true;
    }
    static void Main(string[] args)
    {
        var tree = CSharpSyntaxTree.ParseText(@"
public class Sample
{
   public void Foo()
   {
        
        int[] outerArray = new int[10] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4};
        for (int index = 0; index < 10; index++)
        {
             int a;
             int[] innerArray = new int[10] { 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 };
             index = index + 2;
             outerArray[index – 1] = 5;
        }
   }
}");

        var Mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);

        var compilation = CSharpCompilation.Create("MyCompilation",
            syntaxTrees: new[] { tree }, references: new[] { Mscorlib });
        var model = compilation.GetSemanticModel(tree);


        var localStatement = tree.GetRoot().DescendantNodes().OfType<LocalDeclarationStatementSyntax>().ToArray();
        DataFlowAnalysis result = model.AnalyzeDataFlow(tree.GetRoot().DescendantNodes().OfType<ForStatementSyntax>().Single());
        foreach (var localvariable in localStatement)
        {
            
            if (IsNeverUsed(localvariable,model,result))
            {
                
                Console.WriteLine(string.Format("Variable {0} is declared but never used",
                                localvariable.Declaration.Variables.First().Identifier));
            }
        }

    }
}
```
kết quả như sau:

![image.png](https://images.viblo.asia/c09468c3-0efb-44ab-9950-9e303211d7a9.png)

Vậy suy đoán của tôi là đúng, các bạn có thể mở rộng và tìm những thứ hay ho nhé. 

Rồi tiếp theo ta sẽ đến một phần khác đó là `Control Flow Analysis`.

# Control Flow Analysis

`Control Flow Analysis`  (Phân tích luồng điều khiển) được sử dụng để hiểu các điểm vào và ra (entry, exit point) khác nhau trong một khối mã và để trả lời các câu hỏi về khả năng truy cập. Nếu chúng ta đang phân tích một method, chúng ta có thể quan tâm đến tất cả các điểm mà chúng ta có thể `return` từ method. Nếu chúng ta đang phân tích vòng lặp, chúng ta có thể quan tâm đến tất cả những điểm chúng ta `break` hoặc `continue`.

Chúng ta kích hoạt `Control Flow Analysis` thông qua một method trên SemanticModel. Điều này trả về một đối tượng `ControlFlowAnalysis` cho chúng ta để hiển thị các thuộc tính sau:

* `EntryPoints` - Tập các câu lệnh bên trong vùng là đích của các nhánh bên ngoài vùng đó.

* `ExitPoints` - Tập các câu lệnh bên trong một vùng jump đến các vị trí bên ngoài vùng.

* `EndPointIsReachable` - Trả về true khi và chỉ khi có thể truy cập được phần cuối của câu lệnh cuối cùng hoặc toàn bộ vùng không chứa câu lệnh nào.

* `StartPointIsReachable` - Cho biết liệu một vùng có thể bắt đầu bình thường hay không.

* `ReturnStatements` - Tập hợp các câu lệnh `return` trong một vùng.

* `Succeeded` - Trả về true khi và chỉ khi phân tích thành công. 


Một ví dụ đơn gian cho cách sử dụng của `Control Flow Analysis` như sau:

```csharp
var tree = CSharpSyntaxTree.ParseText(@"
    class C
    {
        void M()
        {
            for (int i = 0; i < 10; i++)
            {
                if (i == 3)
                    continue;
                if (i == 8)
                    break;
            }
        }
    }
");

var Mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);
var compilation = CSharpCompilation.Create("MyCompilation",
    syntaxTrees: new[] { tree }, references: new[] { Mscorlib });
var model = compilation.GetSemanticModel(tree);

var firstFor = tree.GetRoot().DescendantNodes().OfType<ForStatementSyntax>().Single();
ControlFlowAnalysis result = model.AnalyzeControlFlow(firstFor.Statement);

Console.WriteLine(result.Succeeded);            //True
Console.WriteLine(result.ExitPoints.Count());    //2 – continue, and break
```

Trong ví dụ trên, giá trị trả về của thuộc tính `Succeeded` là True tức là việc phân tích luông điều khiển đã thành công, và thuộc tính `ExitPoints` có 2 phần tử đó chính là continue và break, đây là 2 điểm giúp chúng ta có thể thoát vòng lặp hiện tại.

Ngoài ra, chúng ta có thể chỉ định hai câu lệnh và phân tích các câu lệnh giữa hai câu lệnh. Ví dụ sau minh họa điều này và cách sử dụng `EntryPoints`:

```csharp
var tree = CSharpSyntaxTree.ParseText(@"
class C
{
    void M(int x)
    {
        L1: ; // 1
        if (x == 0) goto L1;    //firstIf
        if (x == 1) goto L2;
        if (x == 3) goto L3;
        L3: ;                   //label3
        L2: ; // 2
        if(x == 4) goto L3;
    }
}
");

var Mscorlib = MetadataReference.CreateFromFile(typeof(object).Assembly.Location);
var compilation = CSharpCompilation.Create("MyCompilation",
syntaxTrees: new[] { tree }, references: new[] { Mscorlib });
var model = compilation.GetSemanticModel(tree);

//Choose first and last statements
var firstIf = tree.GetRoot().DescendantNodes().OfType<IfStatementSyntax>().First();
var label3 = tree.GetRoot().DescendantNodes().OfType<LabeledStatementSyntax>().Skip(1).Take(1).Single();

ControlFlowAnalysis result = model.AnalyzeControlFlow(firstIf, label3);
Console.WriteLine(result.EntryPoints);      //1 – Label 3 is a candidate entry point within these statements
Console.WriteLine(result.ExitPoints);       //2 – goto L1 and goto L2 and candidate exit points
```

Trong ví dụ trên, chúng ta đang thực hiện phân tích luông điều khiển giữa câu lệnh if đầu tiên cho đến nhãn L3. Kết quả trả về của `EntryPoints` chỉ có 1 đó chính là nhãn L3. Nếu bạn thắc mắc vì sao L3 lại là `EntryPoints` ở đây thì hãy nhớ lại định nghĩa về `EntryPoints`. Đó là tập các lệnh là đích đến của các lệnh khác ở ngoài vùng chứa nó. 

Để ý kĩ hơn thì bạn có thể thấy rằng ở lệnh if thứ 4 ta có thể nhảy đến L3. Kết quả của `ExitPoints` là 2, điều này là hiển nhiên khi lệnh if thứ 1 và 2 đều có thể cho ta nhảy ra khỏi vùng mà ta đang xét.

Cuối cùng, chúng ta sẽ xem xét trả lời các câu hỏi về khả năng tiếp cận. Trong đoạn code sau đây, cả start points và end points đều không thể truy cập được:

```csharp
var tree = CSharpSyntaxTree.ParseText(@"
    class C
    {
        void M(int x)
        {
            return;
            if(x == 0)                                  //-+     Start is unreachable
                System.Console.WriteLine(""Hello"");    // |
            L1:                                            //-+    End is unreachable
        }
    }
");

var Mscorlib = PortableExecutableReference.CreateFromAssembly(typeof(object).Assembly);
var compilation = CSharpCompilation.Create("MyCompilation",
    syntaxTrees: new[] { tree }, references: new[] { Mscorlib });
var model = compilation.GetSemanticModel(tree);

//Choose first and last statements
var firstIf = tree.GetRoot().DescendantNodes().OfType<IfStatementSyntax>().Single();
var label1 = tree.GetRoot().DescendantNodes().OfType<LabeledStatementSyntax>().Single();

ControlFlowAnalysis result = model.AnalyzeControlFlow(firstIf, label1);
Console.WriteLine(result.StartPointIsReachable);    //False
Console.WriteLine(result.EndPointIsReachable);      //False
```
Chúng ta đang xem xét phân tích luồng điều khiển từ câu lệnh if cho đến nhãn L1. Rõ rằng `StartPointIsReachable` trả về false do ngay khi đến câu lệnh if, chiwng trình đã return rồi. Tương tự như thế thì `EndPointIsReachable` cũng trả về false.

# Kết
Đến đây tôi đã giới thiệu cho các bạn hầu hết các kiến thức về Roslyn API để các bạn có thể xây dựng cho mình công cụ phân tích mã tĩnh như ý muốn. Tôi cũng rất muốn giới thiệu thêm về taint tracking trong roslyn, tuy nhiên thì nó là một máy phân tích phức tạp mà tôi còn chưa hiểu rõ ràng, nên tôi sẽ hẹn các bạn vào 1 dịp khác. Cảm ơn các bạn!

# Tài liệu tham khảo
[https://joshvarty.com/learn-roslyn-now/](https://joshvarty.com/learn-roslyn-now/)