Trong **[lập trình C# căn bản](https://tienanhvn.blogspot.com/2019/10/lap-trinh-c-can-ban.html)** , Toán tử logic được sử dụng để thực hiện thao tác logic giữa hai toán hạng như AND, OR và KHÔNG dựa trên các yêu cầu của chúng tôi. Các toán tử logic sẽ luôn làm việc với các biểu thức Boolean (đúng hoặc sai) và trả về các giá trị Boolean.

Các toán hạng trong toán tử logic C# phải luôn chỉ chứa các giá trị Boolean nếu không Toán tử logic sẽ đưa ra lỗi.
Bảng sau liệt kê các loại toán tử khác nhau có sẵn trong các toán tử quan hệ c #.

Nếu bạn quan sát bảng trên, nếu bất kỳ một giá trị toán hạng nào trở thành sai, thì toán tử AND logic sẽ trả về false, giống như cách toán tử OR logic sẽ trả về true, nếu bất kỳ một giá trị toán hạng nào trở thành đúng.

Trong trường hợp nếu chúng tôi sử dụng toán tử logic logic trong các ứng dụng c # của mình, nó sẽ trả về kết quả như hiển thị bên dưới cho các đầu vào khác nhau.

Sau đây là ví dụ về toán tử logic trong c#.
```
using System;
namespace Tienanhvn
{
    class Program
    {
        static void Main(string[] args)
        {
            int x = 15, y = 10;
            bool a = true, result;
            // AND operator
            result = (x <= y) && (x > 10);
            Console.WriteLine("AND Operator: " + result);
            // OR operator
            result = (x >= y) || (x < 5);
            Console.WriteLine("OR Operator: " + result);
            //NOT operator
            result = !a;
            Console.WriteLine("NOT Operator: " + result);
            Console.WriteLine("Press Enter Key to Exit..");
            Console.ReadLine();
        }
    }
}
```
Kết quả của chươ
Kết quả của chương trình:
Nguon: https://tienanhvn.blogspot.com/2019/10/toan-tu-logic-cshap.html