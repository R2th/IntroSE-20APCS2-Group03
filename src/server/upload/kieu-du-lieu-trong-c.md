# Dẫn nhập

Ở bài [BIẾN TRONG C#](https://viblo.asia/p/bien-trong-c-Az45b4wwZxY) chúng ta đã tìm hiểu về biến và có một thành phần không thể thiếu khi khai báo biến – Đó là kiểu dữ liệu. Bài học hôm nay chúng ta sẽ cùng tìm hiểu chi tiết về KIỂU DỮ LIỆU TRONG C#.

# Nội dung

Để đọc hiểu bài này tốt nhất các bạn nên có kiến thức cơ bản về các phần:

* Cấu trúc lệnh của C# viết trên nền Console Application.
* [Cấu trúc nhập xuất của C# trên nền Console Application.](https://viblo.asia/p/nhap-xuat-co-ban-trong-c-console-application-E375z4O6ZGW)
* [Biến trong C#.](https://viblo.asia/p/bien-trong-c-Az45b4wwZxY)

Trong bài học này, chúng ta sẽ cùng tìm hiểu các vấn đề:

* Kiểu dữ liệu là gì? Tại sao phải có kiểu dữ liệu?
* Phân loại kiểu dữ liệu và ý nghĩa của từng kiểu dữ liệu.
* Ví dụ chương trình sử dụng một số kiểu dữ liệu.

# Kiểu dữ liệu là gì? Tại sao phải có kiểu dữ liệu?

### Định nghĩa

Kiểu dữ liệu được định nghĩa như sau:

* Là tập hợp các nhóm dữ liệu có cùng đặc tính, cách lưu trữ và thao tác xử lý trên trường dữ liệu đó.
* Là một tín hiệu để trình biên dịch nhận biết kích thước của một biến (ví dụ như int là 4 bytes, sẽ được trình bày ở phần sau) và khả năng của nó (ví dụ biến kiểu int chỉ có thể chứa được các số nguyên).
* Là thành phần cốt lõi của một ngôn ngữ lập trình.

### Tại sao phải có kiểu dữ liệu?

* Như trong định nghĩa đã trình bày, phải có kiểu dữ liệu để nhận biết kích thước và khả năng của một biến.
* Nhằm mục đích phân loại dữ liệu. Nếu như không có kiểu dữ liệu ta rất khó xử lý vì không biết biến này kiểu chuỗi hay kiểu số nguyên hay kiểu số thực, . . .

# Phân loại kiểu dữ liệu và ý nghĩa của từng kiểu dữ liệu

Một biến khi khai báo kiểu dữ liệu tham chiếu thì vùng nhớ của biến đó chỉ chứa địa chỉ của đối tượng dữ liệu và lưu trong bộ nhớ Stack.

Đối tượng dữ liệu thực sự được lưu trong bộ nhớ Heap.

Một số kiểu dữ liệu thuộc kiểu tham chiếu: object, dynamic, string và tất cả các kiểu dữ liệu do người dùng định nghĩa. (sẽ được trình bày ở những bài sau

![](https://images.viblo.asia/6a88dae9-d816-4c7b-b756-6d37a1866b1d.png)

Hình ảnh trên minh họa cho kiểu dữ liệu giá trị và kiểu dữ liệu tham chiếu: (đây chỉ là hình ảnh mang tính chất minh họa cho các bạn hiểu về cách lưu trữ của )

* Trong hình biến a được khai báo là kiểu int nên vùng nhớ được lưu trên Stack và lưu giá trị 10.
* Biến b được khai báo là kiểu string nên vùng nhớ trên Stack chỉ lưu địa chỉ đối tượng dữ liệu (0xccc) còn đối tượng dữ liệu thực sự được lưu trên Heap (ô nhớ có địa chỉ 0xccc có giá trị là “Kteam”).

Bộ nhớ Stack và bộ nhớ Heap: Cả hai đều là bộ nhớ trên RAM nhưng cách tổ chức, quản lý dữ liệu cũng như sử dụng thì rất khác nhau:

**Stack**:

* Vùng nhớ được cấp phát khi chương trình biên dịch.
* Được sử dụng cho việc thực thi thread (khái niệm về thread sẽ được trình bày trong bài THREAD TRONG C# ), khi gọi hàm (khái niệm về hàm sẽ được trình bày trong bài sau CẤU TRÚC HÀM CƠ BẢN TRONG C#), các biến cục bộ kiểu giá trị và tự động giải phóng khi không còn sử dụng nữa.
* Kích thước vùng nhớ Stack là cố định và chúng ta không thể thay đổi.
* Khi vùng nhớ này không còn đủ dùng thì sẽ gây ra hiện tượng tràn bộ nhớ (stack overflow). Hiện tượng này xảy ra khi nhiều hàm lồng vào nhau hoặc gọi đệ quy nhiều lần dẫn đến không đủ vùng nhớ (khái niệm đệ quy sẽ được trình bày trong bài sau CẤU TRÚC HÀM CƠ BẢN TRONG C#).

**Heap**:

* Vùng nhớ được cấp phát khi chạy chương trình.
* Vùng nhớ Heap được dùng cho cấp phát bộ nhớ động (cấp phát thông qua toán tử new, sẽ được trình bày trong bài sau TOÁN TỬ TRONG C#)
* Bình thường vùng nhớ trong Heap do người dùng tự giải phóng nhưng trong C# điều này được hỗ trợ mạnh mẽ bởi bộ tự động thu gom rác (Garbage Collection). Vì thế việc giải phóng vùng nhớ sẽ được thực hiện tự động.
* Kích thước vùng nhớ Heap có thể thay đổi được. Khi không đủ vùng nhớ để cấp phát thì hệ điều hành sẽ tự động tăng kích thước vùng nhớ Heap lên.

Trong phạm vi bài học hôm nay chúng ta chỉ tìm hiểu qua các kiểu dữ liệu dựng sẵn cơ bản những kiểu dữ liệu còn lại chúng ta sẽ tìm hiểu trong các bài học sau. Ý nghĩa của một số kiểu dữ liệu cơ bản:

![](https://images.viblo.asia/dc9b2e28-2846-446c-976a-09b018abb98c.png)

* Khác với những kiểu dữ liệu trên, string là kiểu dữ liệu tham chiếu và dùng để lưu chuỗi ký tự.

### Một số lưu ý khi sử dụng các kiểu dữ liệu trên:

Khác với những kiểu dữ liệu trên, string là kiểu dữ liệu tham chiếu và dùng để lưu chuỗi ký tự. Trong phạm vi bài học hôm nay chúng ta chỉ tìm hiểu qua các kiểu dữ liệu dựng sẵn cơ bản những kiểu dữ liệu còn lại chúng ta sẽ tìm hiểu trong các bài học sau.

Ý nghĩa của một số kiểu dữ liệu cơ bản:

* Kiểu dữ liệu có miền giá trị lớn hơn sẽ chứa được kiểu dữ liệu có miền giá trị nhỏ hơn. Như vậy biến kiểu dữ liệu nhỏ hơn có thể gán giá trị qua biến kiểu dữ liệu lớn hơn (sẽ được trình bày trong phần tiếp theo).
* Giá trị của kiểu char sẽ nằm trong dấu ‘ ’ (nháy đơn).
* Giá trị của kiểu string sẽ nằm trong dấu “ ” (nháy kép).
* Giá trị của biến kiểu float phải có chữ F hoặc f làm hậu tố.
* Giá trị của biến kiểu decimal phải có chữ m hoặc M làm hậu tố.
* Trừ kiểu string, tất cả kiểu dữ liệu trên đều không được có giá trị null:
    * Null là giá trị rỗng, không tham chiếu đến vùng nhớ nào.
    * Để có thể gán giá trị null cho biến thì ta thêm ký tự ? vào sau tên kiểu dữ liệu là được. Ví dụ: int? hay bool? . . .

# Ví dụ chương trình sử dụng kiểu dữ liệu

Ví dụ 1: Khai báo biến với các kiểu dữ liệu đã học.

```
static void Main(string[] args)
        {
            // Kiểu số nguyên
            byte BienByte = 10;
            short BienShort = 10;
            int BienInt = 10;
            long BienLong = 10;

            // Kiểu số thực
            float BienFloat = 10.9f; // Giá trị của biến kiểu float phải có hậu tố f hoặc F. 
            double BienDouble = 10.9; // Giá trị của biến kiểu double không cần hậu tố.
            decimal BienDecimal = 10.9m; // Giá trị của biến kiểu decimal phải có hậu tố m.

            // Kiểu ký tự và kiểu chuỗi
            char BienChar = 'K'; // Giá trị của biến kiểu ký tự nằm trong cặp dấu '' (nháy đơn).
            string BienString = "Kteam"; // Giá trị của biến kiểu chuỗi nằm trong cặp dấu "" (nháy kép).

            Console.ReadKey();
        }
```

Các bạn chú ý vào cách khai báo, khởi tạo giá trị cho các biến.

Ví dụ 2: Một số thao tác liên quan đến biến và kiểu dữ liệu.

```
static void Main(string[] args)
        {
            // Kiểu số nguyên
            byte BienByte = 3;
            short BienShort = 9;
            int BienInt = 10;
            long BienLong = 0;

BienLong = BienByte; // BienLong có kiểu dữ liệu lớn hơn BienByte nên giá trị BienByte có thể gán qua cho BienLong
            Console.WriteLine(" BienLong = " + BienLong);

            BienLong = BienInt; // tương tự như trên
            Console.WriteLine(" BienLong = {0}", BienLong);
            
            BienShort = BienByte; // tương tự như trên
            Console.WriteLine(" BienShort = " + BienShort);
            
            BienInt = BienShort; // tương tự như trên
            Console.WriteLine(" BienInt = " + BienInt);

            Console.ReadKey();
        }
```

Ở ví dụ này chúng ta kiểm chứng lại xem việc gán giá trị từ biến có kiểu dữ liệu nhỏ hơn sang biến có kiểu dữ liệu lớn hơn có được hay không. Và kết quả sau khi chạy chương trình:

![](https://images.viblo.asia/9b147232-c5b6-4bed-822a-abe527efd3bc.png)

Qua kết quả chạy, ta thấy giá trị của các biến thay đổi nên việc gán giá trị như vậy là có thể được.

Ví dụ 3: Những lỗi cần lưu ý.

```
static void Main(string[] args)
        {
            int a;
            Console.WriteLine(" a = " + a); // Lỗi vì biến a không thể sử dụng khi chưa có giá trị.

            int b = 10.9; // Lỗi vì b là biến kiểu số nguyên nên không thể nhận giá trị ngoài số nguyên.

byte c = 1093; // Lỗi vì c là biến kiểu byte mà kiểu byte có miền giá trị từ -128 đến 127 nên không thể nhận giá ngoài vùng này được.

string d = 'K'; // Lỗi vì không thể gán giá trị ký tự vào biến kiểu chuỗi được mặc dù chuỗi có thể hiểu là tập hợp nhiều ký tự. Có thể sửa bẳng cặp dấu "" thay vì ''. 

            long e = null; // Lỗi vì không thể gán null cho biến kiểu long, int, byte, . . .
            long? f = null; // Cách khắc phục là thêm dấu ? vào sau kiểu dữ liệu. Lúc này kiểu dữ liệu của f là long?

            int g = 10;
byte h = g; // Lỗi vì giá trị của biến có kiểu dữ liệu lớn hơn không thể gán cho biến có kiểu dữ liệu nhỏ hơn mặc dù trong trường hợp này ta thấy số 10 đều có thể gán cho 2 biến.

            string k = "Kteam";
Console.WriteLine(" k = " + K); // Lỗi vì phía trên khai báo biến k còn khi sử dụng là biến K (C# có phân biệt chữ hoa, thường cần lưu ý để tránh gặp lỗi)

            Console.ReadKey();
        }
```

Chương trình này là minh họa những lỗi thường gặp khi làm việc với biến và kiểu dữ liệu. Các bạn cần lưu ý để tránh những lỗi cơ bản này.

# Kết luận

Nội dung bài này giúp các bạn nắm được:

* Khái niệm về kiểu dữ liệu và tại sao lại phải sử dụng kiểu dữ liệu.
* Phân loại kiểu dữ liệu và ý nghĩa của các kiểu dữ liệu dựng sẵn cơ bản.
* Phân biệt giữa bộ nhớ Stack và Heap.
* Ví dụ chương trình sử dụng kiểu dữ liệu và những lỗi lập trình thường gặp về phần này.

Bài học sau chúng ta sẽ cùng tìm hiểu một khái niệm tiếp theo đó là TOÁN TỬ TRONG C#.