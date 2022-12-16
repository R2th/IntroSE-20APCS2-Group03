![](https://images.viblo.asia/06f0b6de-6490-4f45-b91e-601c2a04da67.jpg)
## 1. Khái niệm Coding Conventions?
- `Coding conventions` là một tập hợp các quy tắc được định nghĩa ra để quy ước quá trình code trong một dự án. 
- Thường được xây dựng sau khi quá trình phân tích yêu cầu hệ thống, dựa vào các nhóm chức chức năng của một hệ thống.
- Project manager sẽ dựng một bộ khung `Coding Conventions` cho toàn dự án cũng như team leader có thể dựng lên từng bộ `Coding Conventions` cho team mình dựa trên bộ khung gốc.
- Nhờ có  `Coding conventions` , những các thành viên trong dự án có thể hiểu đọc hiểu code của nhau dễ dàng hơn
- Thuận tiện hơn cho những developer khác khi họ tìm hiểu dự án các dự án cũ để phát triển thêm
- Dựng lên một bộ quy tắc để thống nhất chung cho hệ thống hoặc dự án.

## 2. Coding Convetions trong C#
### 2.1. Quy tắc đặt tên
- Có 3 kiểu đặt tên thông dụng nhất

| Kiểu | Mô tả | Ví dụ |
| -------- | -------- | -------- |
| Pascal Case     | Chữ cái đầu tiên trong từ định danh và chữ cái đầu tiên của mỗi từ nối theo sau phải được viết hoa. Sử dụng Pascal Case để đặt tên cho một tên có từ 3 ký tự trở lên.     | CodingConvention     |
| Camel Case | Chữ cái đầu tiên trong từ định danh là chữ thường và chữ cái đầu tiên của mối từ nối theo sau phải được viết hoa. | codingConvention |
| Uppercase     | Tất cả các ký tự trong từ định danh phải được viết hoa. Sử dụng quy tắc này đối với tên định danh có từ 2 ký tự trở xuống | System.IO  |

- Tóm tắt cách sử dụng các quy tắc

|Loại | Kiểu đặt tên |Ví dụ	 |Ghi chú |
| -------- | -------- | -------- | -------- |
| Tên biến     | Camel Case	     |  firstName     |Danh từ    |
| Hằng số     | Uppercase	     |  FIRST_WEEK_DAY     |Có gạch chân giữa các từ    |
|Tên class, enum     | Pascal	 Case	     |   CreateUser     |Danh từ    |
| Tham số	     | Camel Case	     |  displayTime     |Danh từ    |
| Thuộc tính  | Pascal Case	     |  BackgroundColor	     |Danh từ    |
|Phương thức| Pascal Case	     |  GetAge()     |Động từ    |
| Sự kiện	     | Pascal Case	     |  SelectedIndexChanged|Có hậu tố EventHandler |
| Giao diện (interface)		     | Pascal Case	     |  IButtonControl	|Có tiền tố I |

- Tránh thêm các tiền tố hoặc hậu tố dư thừa vô nghĩa

| Không nên | Nên | 
| -------- | -------- |
|` enum BorderEnum { ... }`     | `enum Boder { ... }`     | 
|`class CHuman { ... }`     | `class Human { ... }`     | 
- Không thêm tên lớp chứa vào tên thuộc tính

| Không nên | Nên | 
| -------- | -------- |
|`Animal.WeightAnimal`     | `Animal.Weight`     | 

- Tên biến, phương thức bool phải thể hiện được  ý nghĩa nếu trả về true hoặc false. Nên sử dụng tiền tố “Is” “Can” “Has” trước tên biến, phương thức.

| Không nên | Nên | 
| -------- | -------- |
|`bool CheckAdmin(int n) { }`     | `bool IsAdmin(int n) { }`     | 
|`bool Expired() { }`     | `bool IsExpired() { }`     | 
|`bool checked = true;;`     | `bool isChecked = true;`     | 

- Không dùng các tên giống nhau(chỉ phân biệt kiểu chữ in hoa hay thường) Ta khó nhận ra các định danh nhất là khi trong cùng ngữ cảnh và chỉ phân biệt các định danh bằng kiểu chữ in hoa/thường.
- Không tạo 2 namespace cùng tên và chỉ khác nhau ở kiểu chữ viết(chữ hoa/Chữ thường), ví dụ:

```
Namespace SunAsterisk
Namespace sunAsterisk
```
- Không nên xây dựng 1 phương thức với các tham số có cùng tên và chỉ khác nhau kiểu chữ, ví dụ:
```
void MyFunction(string a, string A)
```

Không xây dựng 1 kiểu với các tên property giống nhau và chỉ phân biệt ở kiểu chữ, ví dụ:
```
int Color {get, set}
int COLOR {get, set}
```

- Không đặt tên các phương thức có cùng tên và chỉ khác nhau ở kiểu chữ, ví dụ:
```
void total()
void Total()
```

### 2.2. Tiền tố một số control

Bắt buộc đặt tên cho tất cả các control có tham gia xử lý dưới nền. Một số control được đặt theo kiểu Pascal với phần tiền tố như sau:

| Control | Tiền tố |Ví dụ |
| -------- | -------- | -------- |
| Panel     | pnl     | pnlGroup     |
| Check box     | chk     | chkReadOnly     |
| Combo box     |  drop-down list box     | cbo	cboEnglish     |
| Button     | btn     | btnExit     |
| Dialog     | dlg     | dlgFileOpen     |
| Form     | frm     | frmEntry     |
| ....................     | .................................    | ..........................     |

### 2.3. Quy định phân bố mã nguồn
- Mỗi file mã nguồn chỉ chứa duy nhất một class. Tên class chính phải trùng với tên file mã nguồn. Ví dụ: Class Student sẽ được chứa trong file Student.cs.
- Với các kiểu enum, struct độc lập đơn giản ngoài class có thể được khai báo trong một file mã nguồn riêng hoặc trong file mã nguồn của class khác.
- Interface phải được khai báo trong một file mã nguồn riêng.
- Thứ tự khai báo:

**Chú thích tên chương trình, tác giả, v.v**
```
/// Working System Manage
/// WSM
/// © 2019 Bởi Sun-asterisk   
```
**Khối khai báo thư viện**
```
using System.Data;
using System.Drawing;   
```
**Khai báo namespace**
```
namespace SQLBackup
```
**Khai báo các struct/enum độc lập (nếu có)**
```
public enum HumanClass { A, B, C, D, E }
```
**Khai báo lớp chính**
```
public class Student : Human
{

}
```

### 2.4. Quy ước viết câu lệnh
- Mỗi câu lệnh riêng rẽ trên một dòng.

**Không nên**
```
private int x = 3, y = 5;
if (a > b) a++;
else b++;
```
**Nên**
```
private int x = 3;
private int y = 5;
if (a > b)
    a++;
else
    b++;
```

- Đối với biến kiểu bool, tránh dùng phép so sánh với true hoặc false.
**Không nên**
```
if (isValidFirst == true
    && isValidSecond == true)
    DoSomeThing();
 
if (item.IsValid() == false)
    item.Remove();
```
**Nên**
```
if (isValidFirst 
        && isValidSecond)
    DoSomeThing();
 
if (!item.IsValid())
    item.Remove();
```

### 2.5. Khối mã nguồn
- Sử dụng cặp dấu { } để đánh dấu một khối mã nguồn. Mỗi dấu ngoặc nằm trên một dòng (Ngoại lệ, kiểu enum, thuộc tính gọn hoặc khởi tạo giá trị cho mảng có thể không cần).

- Trong các lệnh if, for, foreach, ... nếu chỉ có một lệnh thì có thể không cần đánh dấu khối mã nguồn.
**Không nên**
```
void Swap(ref int a, ref int b)
{   int c = a;
    a = b;
    b = c;
}
 
void Swap(ref int a, ref int b) {
    int c = a;
    a = b;
    b = c;
}
```
**Nên**
```
void Swap(ref int a, ref int b)
{
    int c = a;
    a = b;
    b = c;
}
```

### 2.6. Thụt đầu dòng và cách khoảng
* Viết cách vào một khoảng tab đối với các lệnh nằm trong khối lệnh { }.
* Viết cách vào một khoảng tab đối với lệnh ngay sau if, else, while, for, foreach.
* Viết cách một khoảng trắng xung quanh các toán tử 2 ngôi và 3 ngôi. 
* Viết cách một khoảng trắng sau dấu “,” và “;”

### 2.7. Chú thích
Nên comment trên những đoạn code khó hiểu hoặc chức năng đặc biệt. Ngôn ngữ sử dụng để chú thích phải đồng bộ xuyên suốt chương trình. Chọn một trong hai ngôn ngữ: tiếng Việt Unicode có dấu hoặc tiếng Anh. 

Quy định chú thích: 
* Chỉ sử dụng // và /// để chú thích. Không dùng /* */.
* Có chú thích trên đầu mỗi file source code mô tả chương trình, chức năng của chương trình, tác giả, v.v...
* Khối xử lý dữ liệu: Có chú thích trên mỗi class, mỗi phương thức, mỗi thuộc tính của class mô tả chức năng, tham số, v.v...
* Khối xử lý giao diện: Có chú thích mô tả chức năng trên mỗi phương thức không phải event, hàm Main.

Các kiểu chú thích:
* Chú thích đơn giản dùng cho:
* Đoạn code phức tạp
* Mô tả trong thân hàm
* Mô tả field
* Đoạn code được người không phải tác giả sửa đổi

### 2.8. Ngôn ngữ sử dụng
- Luôn luôn sử dụng kiểu dữ liệu C# thay vì kiểu dữ liệu .NET.

**Không nên**
```
Int32 month;
Double real;
String name;
UInt64 fact;
```
**Nên**
```
int month;
double real;
string name;
ulong fact;
```

### Nguồn tham khảo:
https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions
http://cunglaptrinh.blogspot.com/2016/10/quy-dinh-viet-code-trong-csharp.html