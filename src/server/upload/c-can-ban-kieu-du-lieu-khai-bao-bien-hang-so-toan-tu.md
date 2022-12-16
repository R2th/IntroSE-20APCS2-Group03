### 1. Kiểu dữ liệu

- Khi học bất kỳ ngôn ngữ lập trình nào ta đều phải học kiểu dữ liệu của ngôn ngữ đó. Vậy Kiểu dữ liệu là gì?

    Kiểu dữ liệu là tập hợp các nhóm dữ liệu có đặc điểm chung: đặc tính, cách lưu trữ và thao tác xử lý.
Ví dụ một số kiểu dữ liệu cơ bản trong c#: kiểu đúng sai (bool), kiểu chuỗi (string), kiểu số nguyên (int), kiểu enum....
Chúng ta sẽ đi vào cụ thể từng kiểu dữ liệu ở phần bên dưới.

- Có 2 loại kiểu dữ liệu trong c#:

    **Kiểu dữ liệu tham trị (value type)** thì vùng nhớ của biến và giá trị sẽ được lưu trữ ở cùng 1 nơi - bộ nhớ stack. Một số kiểu dữ liệu tham trị như: int, long, float, double, decimal, bool, char.
    
    **Kiểu dữ liệu tham chiếu (reference type)**  thì vùng nhớ của biến sẽ được lưu ở 1 nơi - bộ nhớ stack. Giá trị sẽ được lưu ở 1 vùng nhớ khác - bộ nhớ heap. Một số kiểu dữ liệu tham chiếu như: object, string, dynamic.

     
- Để hiểu rõ 2 kiểu dữ liệu này ta cần phân biệt vùng nhớ **heap** và **stack**:
    
    **Stack:** 
     - Vùng nhớ được cấp phát khi biên dịch chương trình. (complie) 
     - Kích thước vùng nhớ stack cố định và không thể thay đổi.
     - Khi vùng nhớ stack không đủ sẽ gây hiện tượng tràn bộ nhớ. (stack overflow)
   
   **Head:**
     - Vùng nhớ được cấp phát khi chạy chương trình (runtime).
     - Kích thước vùng nhớ head được cấp phát động và được quản lý dọn dẹp bởi Garbage collection trong c#.
     - Kích thước vùng nhớ head có thể thay đổi được, do hệ điều hành quản lý cấp phát vùng nhớ.

- 1 số kiểu dữ liệu cơ bản:

| Kiểu dữ liệu | Kích thước | Mô tả |
| -------- | -------- | -------- |
| int     | 4 bytes     | Lưu trữ số nguyên có dấu từ -2,147,483,648 đến 2,147,483,647     |
| long     | 8 bytes     | Lưu trữ số nguyên có dấu từ -9,223,372,036,854,775,808 đến 9,223,372,036,854,775,807     |
| float     | 4 bytes     | Lưu trữ số thực có giá trị từ ±1.5 x 10^-45 đến ±3.4 x 10^38, khoảng xấp xỉ 6-9 chữ số thập phân     |
| double     | 8 bytes     | Lưu trữ số thực có giá trị từ ±5.0 × 10−324 đến  ±1.7 × 10^308, khoảng xấp xỉ 15 chữ số thập phân     |
| float     | 16 bytes     |  Lưu trữ số thực có giá trị từ ±1.0 x 10-28 đến ±7.9228 x 10^28, khoảng xấp xỉ 28-29 chữ số thập phân       |
| bool     | 1 bit     | Lưu trữ giá trị true, false    |
| char     | 2 bytes     | Lưu trữ ký tự, được bao quanh bởi nháy đơn    |
| string     | 2 bytes mỗi ký tự     | Lưu trữ chuỗi liên tiếp các kỹ tự, được bao quanh bởi nháy kéo    |


 Note: String là kiểu dữ liệu tham chiếu.
 
 
### 2. khai báo biến, hằng số
 
 - Biến trong lập trình cũng tương tự như biến trong toán học. Biến dùng để lưu trữ dữ liệu để xử lý logic tính toán và biến có thể thay đổi.
 
 Cú pháp khai báo biến:
> type variableName = value;

Ví dụ:
```csharp
string name = "John";
Console.WriteLine(name);
```

```csharp
int myNum = 15;
Console.WriteLine(myNum)
```
```csharp
int myNum;
myNum = 15;
Console.WriteLine(myNum);
```

```csharp
int myNum = 5;
double myDoubleNum = 5.99D;
char myLetter = 'D';
bool myBool = true;
string myText = "Hello";
```


- Hằng là một biến không thay đổi giá trị trong suốt chương trình và bắt buộc phải khởi tạo giá trị khi khai báo. Const là hàm số thực thi (compile) có giá trị bắt buộc phải gán khi khai báo.
Const chỉ dùng cho kiểu dữ liệu nguyên thủy, không thể dùng cho kiểu tham chiếu.

```csharp
const int myNum = 15;
myNum = 20; // error
```

Ngoài ra ta có thể dùng readonly để khai báo hằng số trong c#. Có thể gọi readonly là hằng số runtime có giá trị được gán giá trị lúc khai báo hoặc trong hàm khởi tạo.
Có thể dùng readonly để khai báo hằng số kiểu tham chiếu.
```csharp
using System;

namespace MyApplication
{
  class Program
  {
    static void Main(string[] args)
    {
      int myNum = 15;
      myNum = 20;
      
      Test t = new Test(2);
      Console.WriteLine(t.datetime);
    }
  }
  
  public class Test{
  	public readonly DateTime datetime =  new DateTime(2015, 12, 31);
    
    public Test(int month)
    {
    	datetime =  new DateTime(2015, 12, month);
    }
    
  }
}
```

### 3. Toán tử (operator)
- Toán tử dùng để thực hiện các hoạt động trên biến. Có các loại toán tử sau: toán tử toán học (Arithmetic Operators), toán tử gán bằng (Assignment Operators), toán tử so sánh (Comparison Operators), toán tử luận lý (Logical Operators).

 **Toán tử toán học(Arithmetic Operators)**
 
- Toán tử cộng (+) dùng để cộng hai giá trị.
```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x + y);  
```
   - Toán tử trừ (-) dùng để trừ hai giá trị.

```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x - y);  
```


 - Toán tử nhân (*) dùng để nhân hai giá trị.
```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x * y);  
```


- Toán tử chia (/) dùng để chia lấy phần nguyên giá trị này cho giá trị khác.
```csharp
      int x = 12;
      int y = 3;
      Console.WriteLine(x / y);
```

- Toán tử chia (%) dùng để chia lấy phần dư của giá trị này cho giá trị khác.

```csharp
      int x = 5;
      int y = 2;
      Console.WriteLine(x % y);  
```
- Toán tử tăng 1 đơn vị (++) dùng để tăng giá trị lên 1.
```csharp
      int x = 5;
      x++;
      Console.WriteLine(x);  
```
- Toán tử giảm 1 đơn vị (--) dùng để giảm giá trị xuống 1.
```csharp
      int x = 5;
      x--;
      Console.WriteLine(x); 
```
    
**Toán tử gán bằng (Assignment Operators)**
- Toán tử =
```csharp
      int x = 5;
      Console.WriteLine(x); 
```
- Toán tử +=

```csharp
      int x = 5;
      x += 3;
      Console.WriteLine(x);
```

- Toán tử -=

```csharp
      int x = 5;
      x -= 3;
      Console.WriteLine(x); 
```

- Toán tử *=
```csharp
      int x = 5;
      x *= 3;
      Console.WriteLine(x);
```
- Toán tử /=
```csharp
      double x = 5;
      x /= 3;
      Console.WriteLine(x); 
```

- Toán tử /=

```csharp
      double x = 5;
      x /= 3;
      Console.WriteLine(x); 
```

**Toán tử so sánh (Comparison Operators)**
- Toán tử == so sánh bằng
```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x == y);  // returns False because 5 is not equal to 3
```

- Toán tử != so sánh không bằng
```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x != y);  // returns True because 5 is not equal to 3
```

- Toán tử > so sánh lớn hơn
```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x > y); // returns True because 5 is greater than 3
```

- Toán tử < so sánh nhỏ hơn
```csharp
      int x = 5;
      int y = 3;
      Console.WriteLine(x < y); // returns False because 5 is not less than 3
```

- Tương tự cho toán tử <= và >=.



**Toán tử luận lý (Logical Operators)**
- Toán tử và && trả về true nếu cả 2 vế điều kiện đều true.
```csharp
      int x = 5;
      Console.WriteLine(x > 3 && x < 10); // returns True because 5 is greater than 3 AND 5 is less than 10
```

- Toán tử hoặc ||  trả về true nếu 1 trong 2 vế điều kiện true.
```csharp
      int x = 5;
      Console.WriteLine(x > 3 || x < 4); // returns True because one of the conditions are True (5 is greater than 3, but 5 is not less than 4)
```

- Toán tử not ! đảo ngược kết quả. Nếu true sẽ đảo thành false và ngược lại.
```csharp
      int x = 5;
      Console.WriteLine(!(x > 3 && x < 10)); // returns False because ! (not) is used to reverse the result
```

### Tham khảo:

https://www.w3schools.com/cs/cs_data_types.php

https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types

https://www.w3schools.com/cs/cs_variables.php

https://www.w3schools.com/cs/cs_operators.php