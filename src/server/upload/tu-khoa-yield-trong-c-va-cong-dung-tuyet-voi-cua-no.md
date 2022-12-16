# IEnumerable là gì? 

Trong CSharp khi làm việc với array, chúng ta thấy được những hạn chế của nó là phải có size, phải viết các functional count, insert, delete …. Bởi thế , csharp sinh ra một số interface phục vụ , như IEnumerable, ICollection, IList, IQueryable . Tất cả đều thuộc về name space System.Collections. IEnumerable là 1 mảng chỉ có thể đọc, không thể thêm hay bớt phần tử, chỉ duyệt theo một chiều, từ đầu tới cuối mảng.



# Từ khoá Yield? 
Từ khóa yield báo hiệu cho trình biên dịch rằng phương thức mà nó xuất hiện là một khối lặp (iterator block). Trình biên dịch tạo ra một lớp để implement hành vi được thể hiện trong khối lặp. Trong khối lặp, từ khóa yield được sử dụng cùng với từ khóa return để cung cấp giá trị cho đối tượng liệt kê (enumerator object). Đây là giá trị được trả về. Từ khóa yield cũng được sử dụng break để báo hiệu kết thúc lặp (iteration).

Phương thức có sử dụng từ khóa yield bắt buộc phải trả về kiểu dữ liệu là IEnumerable.

Ví dụ, Ta muốn lấy ra tất cả vị trí xuất hiện của số 7 trong collection "listData":

```SQL
using System;
using System.Collections.Generic;
 
namespace Phan.Cao.Khoa
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create new object List<string>
            List<int> listData = new List<int>() { 6, 7, 3, 3, 1, 7, 4, 3, 7, 2, 8, 5, 7, 4 };
 
            // Display all position number 7 in list object 
            foreach (var index in GetListIndex1(listData, 7))
                Console.Write(index + " ");
 
            foreach (var index in GetListIndex2(listData, 7))
                Console.Write(index + " ");
 
            // Output: 1 5 8 12
        }
 
        // Usually Dev use this scenario
        private static List<int> GetListIndex1(List<int> listData, int valueFind)
        {
            List<int> listIdx = new List<int>();
            for (int ii = 0; ii < listData.Count; ii++)
            {
                if (listData[ii] == valueFind)
                    listIdx.Add(ii);
            }
            return listIdx;
        }
 
        // Use yield
        private static IEnumerable<int> GetListIndex2(List<int> listData, int valueFind)
        {
            for (int ii = 0; ii < listData.Count; ii++)
            {
                if (listData[ii] == valueFind)
                    yield return ii;
            }
        }
    }
}
```

Nhìn 2 function thì có vẻ giống nhau. Dùng Yield thì tiết kiệm dc 2 dòng code thôi mà :D
nhưng về performance khác nhau rõ đấy. Vì trong quá trình runtime, chương trình sẽ nhảy qua lại giữa 2 phương thức “Main” và “GetListIndex2” để lấy giá trị, mà không phải tốn bộ nhớ để tạo một biến “listIdx” để lưu trữ như làm theo cách thông thường. Do đó, đối với dữ liệu lớn thì điều này là một sự cải thiện hiệu năng đáng kể.

**Bản chất hoạt động của Yield là:**
* Mỗi khi tìm thấy giá trị số “7” trong mảng “listData” thì nó sẽ return giá trị đó, nhưng không thoát khỏi method “GetListIdx2” ngay lập tức, mà sẽ đánh dấu lại vị trí lặp đó.
* Sau khi return giá trị ra, thì nó sẽ tiếp tục quay lại vào bên trong vòng lặp, tiếp tục lặp đến vị trí tiếp theo từ vị trí đã đánh dấu trước đó để tiếp tục tìm kiếm,…

# Phân biệt Return và Yield Return? 
Như chúng ta đã biết từ khóa return sẽ kết thúc method, trả ra kết quả và ko chạy thêm bất kì câu lệnh gì phía sau:

```SQL
public int GetNumber() {
    return 5; 
}
Console.WriteLine(GetNumber());  // Output: 5
```

Nhưng khi dùng yield ta có thể viết như này: 
```SQL
public IEnumerable<int> GetNumber()
{
    yield return 5;
    yield return 10;
    yield return 15;
}
foreach (int i in GetNumber())
    Console.WriteLine(i);   // Output: 5 10 15
```

Wow ngạc nhiên chưa nó in ra được 3 kết quả lận. Vì sao vậy :
* Khi gọi method GetNumber, lấy phần từ đầu tiên, chương trình chạy tới dòng lệnh số 3, lấy ra kết quả là 5, in ra console.
* Duyệt tiếp phần từ tiếp theo, chương trình chạy vào dòng lệnh số 4, lấy kết quả 10, in ra màn hình.
* Tương tự với phần tử cuối cùng, sau khi in ra, chương trình kết thúc.

# Sử dụng Yield khi nào? 
* Khi cần function của bạn trả về một danh sách read-only, chỉ đọc, không được thêm bớt xóa sửa thì ta dùng Yield return.
* Nhiều khi đang maintain một source code và giải bài toán input đầu vào là 1 collection dạng IEnumerable và thêm sửa xoá collection đó một cách nhanh nhất mà không cần chuyển kiểu. Thì chắc chắn phải dùng Yield.

# Những method common để thêm sửa xoá phần tử trong IEnumerable? 

Add

```SQL
public static IEnumerable<T> Add<T>(this IEnumerable<T> enumerable, T value)
{
    foreach (var item in enumerable)
        yield return item;

    yield return value;
}
```
or:

```SQL
public static IEnumerable<T> Add<T>(this IEnumerable<T> enumerable, T value)
{
    return enumerable.Concat(new T[] { value });
}
```
Insert

```SQL
public static IEnumerable<T> Insert<T>(this IEnumerable<T> enumerable, int index, T value)
{
    int current = 0;
    foreach (var item in enumerable)
    {
        if (current == index)
            yield return value;

        yield return item;
        current++;
    }
}
```
or

```SQL
public static IEnumerable<T> Insert<T>(this IEnumerable<T> enumerable, int index, T value)
{
    return enumerable.SelectMany((x, i) => index == i ? new T[] { value, x } : new T[] { x });
}
```
Replace

```SQL
public static IEnumerable<T> Replace<T>(this IEnumerable<T> enumerable, int index, T value)
{
    int current = 0;
    foreach (var item in enumerable)
    {
        yield return current == index ? value : item;
        current++;
    }
}
```
or

```SQL
public static IEnumerable<T> Replace<T>(this IEnumerable<T> enumerable, int index, T value)
{
    return enumerable.Select((x, i) => index == i ? value : x);
}
```
Remove

```SQL
public static IEnumerable<T> Remove<T>(this IEnumerable<T> enumerable, int index)
{
    int current = 0;
    foreach (var item in enumerable)
    {
        if (current != index)
            yield return item;

        current++;
    }
}
```
or

```SQL
public static IEnumerable<T> Remove<T>(this IEnumerable<T> enumerable, int index)
{
    return enumerable.Where((x, i) => index != i);
}
```

Trong phương thức chính chúng ta gọi như sau:

```SQL
IEnumerable<int> collection = new int[] { 1, 2, 3, 4, 5 };

var added = collection.Add(6);              // 1, 2, 3, 4, 5, 6
var inserted = collection.Insert(0, 0);     // 0, 1, 2, 3, 4, 5
var replaced = collection.Replace(1, 22);   // 1, 22, 3, 4, 5 
var removed = collection.Remove(2);         // 1, 2, 4, 5
```

Bài viết tham khảo từ nguồn: 

https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/yield