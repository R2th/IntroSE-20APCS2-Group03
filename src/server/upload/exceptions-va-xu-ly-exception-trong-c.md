## 1. Mô tả
Các tính năng xử lý **exception** của ngôn ngữ C# giúp bạn đối phó với bất kỳ tình huống bất ngờ hoặc ngoại lệ nào xảy ra khi một chương trình đang chạy. Xử lý **exception** sử dụng các từ khóa **try**, **catch** và **finally**  để thử các hành động có thể không thành công, để xử lý các trường hợp thất bại khi bạn quyết định rằng làm như vậy là hợp lý và để dọn dẹp tài nguyên sau đó. Các **exception** có thể được tạo bởi thời gian chạy ngôn ngữ chung (CLR), .NET hoặc các thư viện của bên thứ ba hoặc bởi code của ứng dụng của bạn. Các ngoại lệ được tạo bằng cách sử dụng từ khóa **throw**.

Trong nhiều trường hợp, một  **exception** có thể được đưa ra không phải bởi một phương thức mà code của bạn đã gọi trực tiếp, mà bởi một phương thức khác nằm sâu hơn trong đó. Khi một  **exception** được **throw** xảy ra, CLR sẽ giải phóng bộ nhớ, tìm kiếm một phương thức có khối **catch** cho loại **exception** cụ thể và nó sẽ thực thi khối **catch** đầu tiên nếu được tìm thấy. Nếu nó không tìm thấy khối bắt thích hợp ở bất kỳ đâu, nó sẽ kết thúc quá trình và hiển thị thông báo cho người dùng.

Trong ví dụ này, một phương pháp kiểm tra phép chia cho 0 và bắt lỗi. Nếu không có biện pháp xử lý ngoại lệ, chương trình này sẽ kết thúc với một lỗi SplitByZeroException đã được xử lý.
```C#
public class ExceptionTest
{
    static double SafeDivision(double x, double y)
    {
        if (y == 0)
            throw new DivideByZeroException();
        return x / y;
    }

    public static void Main()
    {
        // Input for test purposes. Change the values to see
        // exception handling behavior.
        double a = 98, b = 0;
        double result;

        try
        {
            result = SafeDivision(a, b);
            Console.WriteLine("{0} divided by {1} = {2}", a, b, result);
        }
        catch (DivideByZeroException)
        {
            Console.WriteLine("Attempted divide by zero.");
        }
    }
}
```

## 2. Tổng quan về Exception

**exception** có các thuộc tính sau:

* Ngoại lệ là kiểu đều bắt nguồn từ System.Exception.
* Sử dụng khối  **try** xung quanh các câu lệnh có thể tạo ra các **exception**.
* Khi một **exception** xảy ra trong khối **try**, luồng điều khiển sẽ chuyển đến trình xử lý ngoại lệ được liên kết đầu tiên có ở bất kỳ đâu trong ngăn xếp cuộc gọi. Trong C #, từ khóa catch được sử dụng để định nghĩa một trình xử lý ngoại lệ.
* Nếu không có trình xử lý **exception** nào cho một **exception** nhất định, chương trình sẽ ngừng thực thi với một thông báo lỗi.
* Đừng bắt một **exception** trừ khi bạn có thể xử lý nó và để ứng dụng ở trạng thái đã biết. Nếu bạn bắt System.Exception, hãy ném lại nó bằng cách sử dụng từ khóa **throw** ở cuối khối catch.
* Nếu một khối **catch** xác định một biến **exception**, bạn có thể sử dụng nó để lấy thêm thông tin về loại **exception** đã xảy ra.
* Các **exception** có thể được tạo một cách rõ ràng bởi một chương trình bằng cách sử dụng từ khóa **throw**.
* Các đối tượng **exception** chứa thông tin chi tiết về lỗi, chẳng hạn như trạng thái của ngăn xếp cuộc gọi và mô tả về lỗi.
* Mã trong khối **finally** được thực thi ngay cả khi một **exception** được ném ra. Sử dụng khối **finally** để giải phóng tài nguyên, chẳng hạn như để đóng bất kỳ luồng hoặc tệp nào đã được mở trong khối **try**.

## 2. Sử dụng Exception
Trong C#, các lỗi trong chương trình tại thời điểm chạy được truyền thông qua chương trình bằng cách sử dụng một cơ chế được gọi là **exception**. Các **exception** được đưa ra bởi code của chương trình gặp lỗi và bị bắt bởi code có thể sửa lỗi. Các **exception** có thể được **throw** bởi thời gian chạy .NET hoặc bằng code của chương trình. Khi một **exception** được xuất ra, nó sẽ truyền lên ngăn xếp cuộc gọi cho đến khi một câu lệnh **catch** cho **exception** được tìm thấy. Các **exception** chưa được xử lý được xử lý bởi một trình xử lý **exception** chung được cung cấp bởi hệ thống hiển thị dialog.

Các **exception** được đại diện bởi các lớp dẫn xuất từ Exception. Lớp này xác định loại **exception** và chứa các thuộc tính có thông tin chi tiết về **exception**. Việc xuất ra một exception bao gồm việc tạo một instance của một lớp dẫn xuất **exception**, cấu hình tùy chọn các thuộc tính của **exception**, sau đó xuất đối tượng bằng cách sử dụng từ khóa **throw**. Ví dụ:
```C#
using System;
using System.IO;

namespace Exceptions
{
    public class CatchOrder
    {
        public static void Main()
        {
            try
            {
                using (var sw = new StreamWriter("./test.txt"))
                {
                    sw.WriteLine("Hello");
                }
            }
            // Put the more specific exceptions first.
            catch (DirectoryNotFoundException ex)
            {
                Console.WriteLine(ex);
            }
            catch (FileNotFoundException ex)
            {
                Console.WriteLine(ex);
            }
            // Put the least specific exception last.
            catch (IOException ex)
            {
                Console.WriteLine(ex);
            }
            Console.WriteLine("Done");
        }
    }
}
```

Trước khi khối **catch** được thực thi, thời gian chạy sẽ kiểm tra các khối **finally**. Các khối **finally** cho phép lập trình viên dọn dẹp mọi trạng thái không rõ ràng có thể còn sót lại từ khối **try** bị hủy bỏ hoặc giải phóng bất kỳ tài nguyên bên ngoài nào (chẳng hạn như trình xử lý đồ họa, kết nối cơ sở dữ liệu hoặc luồng tệp) mà không cần đợi bộ thu gom rác trong thời gian chạy để hoàn thiện các đối tượng. Ví dụ:

```C#
static void TestFinally()
{
    FileStream? file = null;
    //Change the path to something that works on your machine.
    FileInfo fileInfo = new System.IO.FileInfo("./file.txt");

    try
    {
        file = fileInfo.OpenWrite();
        file.WriteByte(0xF);
    }
    finally
    {
        // Closing the file allows you to reopen it immediately - otherwise IOException is thrown.
        file?.Close();
    }

    try
    {
        file = fileInfo.OpenWrite();
        Console.WriteLine("OpenWrite() succeeded");
    }
    catch (IOException)
    {
        Console.WriteLine("OpenWrite() failed");
    }
}
```

Nếu WriteByte () xuất ra một exception, code trong khối **try** thứ hai cố gắng mở lại file sẽ không thành công nếu tệp.Close () không được gọi và file sẽ vẫn bị khóa. Bởi vì các khối **finally** được thực thi ngay cả khi một **exception** được xuất ra, khối **finally** trong ví dụ trước cho phép file được đóng chính xác và giúp tránh lỗi.

Nếu không tìm thấy khối **catch** tương thích nào trên ngăn xếp cuộc gọi sau khi một **exception** được xuất ra, một trong ba điều sẽ xảy ra: <br>
* Nếu **exception** nằm trong **Finalize**, **Finalize**  sẽ bị hủy bỏ và base finalizer, nếu có, sẽ được gọi.
* Nếu ngăn xếp cuộc gọi chứa một phương thức khởi tạo static hoặc một trình khởi tạo statuc, thì một TypeInitializationException sẽ được xuất ra, với **exception** ban đầu được gán cho thuộc tính InnerException của **exception** mới.
* Nếu đạt đến điểm bắt đầu của thread, thì thread đó sẽ bị kết thúc.