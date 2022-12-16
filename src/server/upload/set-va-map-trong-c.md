## I. Kiểu dữ liệu Set trong C++
### 1. Khái niệm kiểu dữ liệu set
$Set$ là một dạng cấu trúc dữ liệu dùng để lưu trữ các phần tử không trùng lặp và được sắp xếp theo thứ tự tăng dần hoặc giảm dần. (Mặc định trong $set$ là tăng dần và chúng ta có thể viết lại hàm so sánh theo mục đích của chúng ta)

Trong môn Toán lớp $6$, chúng ta đã tiếp xúc với khái niệm tập hợp, và biết đến tính chất không có hai phần tử nào trùng nhau trong một tập hợp. Và kiểu dữ liệu $set$ có tính ưu việt hơn so với một tập hợp, ngoài tính chất không có hai phần tử nào giống nhau mà $set$ còn có tính tự sắp xếp các phần tử (Có thể rút gọn một số công đoạn sắp xếp của bài toán).
### 2. Sử dụng container set
Để sử dụng container $set$ bạn cần khai báo:
```c
#include<set>
```
Để khai báo một biến kiểu $set$, ta có công thức chung sau:
```c
set<kiểu dữ liệu> tên biến;

stack<int> a;
stack<vector<int>> b;
```
Ví dụ về viết lại hàm thay đổi thứ tự sắp xếp các phần tử trong $set$:
```c
struct cmp{
	bool operator() (int a,int b) {return a>b;}
};
// khai báo thêm biến cmp
set<int, cmp> s;
```
### 3.Các phép toán cơ bản của set
* Khi duyệt các phần tử của $set$, ta sử dụng con trỏ, khai báo như sau:
```c
set<kiểu dữ liệu>::iterator it; // khai báo con trỏ it
```
* Thêm một phần tử vào $set$:
```c
s.insert(a); // thêm phần tử a vào set
```
* Trả về số phần tử của $set$:
```c
s.size();
```
* Kiểm tra $set$ rỗng hoặc không:
```c
s.empty(); // trả về true nếu rỗng, false nếu không rỗng
```
* Xóa tất cả phần tử của $set$:
```c
s.clear();
```
* Kiểm tra một giá trị có tồn tại trong $set$ hoặc không, nếu có sẻ trả về con trỏ trỏ đến $x$, nếu không trả về ```s.end()```:
```c
s.find(x);
```
* Để xóa phần tử $x$ trong $set$:
```c
s.erase(x);
```
* Xóa phần tử thứ $k$ trong $set$:
```c
set<int>::iterator it = s.begin(); // tạo con trỏ trỏ vào phần tử đầu tiên
advance(it,k); // trỏ đến số thứ k trong s
s.erase(it); //  xóa phần tử thứ k
```
* Con trỏ trỏ đến vị trí phần tử nhỏ nhất mà lớn hơn khóa $x$, nếu không tìm thấy trả về vị trí ```s.end()```:
```c
s.upper_bound(x);
```
* Con trỏ trỏ đến vị trí phần tử nhỏ nhất mà lớn hơn hoặc bằng khóa $x$, nếu không tìm thấy trả về vị trí ```s.end()```:
```c
s.lower_bound(x);
```
## II. Kiểu dữ liệu Map trong C++
### 1. Khái niệm kiểu dữ liệu map
$Map$ là một kiểu dữ liệu với mỗi phần tử là ánh xạ giữa yếu tố key (khóa) với giá trị (value) của nó. Tương tự $set$, $map$ không chứa hai phần tử nào giống nhau và các phần tử trong $map$ được sắp xếp theo một thứ tự nào đó. Mỗi phần tử trong $map$ có yếu tố $key$ dùng để xác định $value$ của nó, điều này cũng có nghĩa là $key$ và $value$ có thể có kiểu khác nhau.

### 2. Sử dụng container map
Để sử dụng container $map$ bạn cần khai báo:
```c
#include<map>
```
Để khai báo một biến kiểu $map$, ta có công thức chung sau:
```c
map<kiểu dữ liệu, kiểu dữ liệu> tên biến;

map<int, int> a;
map<char, int> b;
```
Ví dụ về viết lại hàm thay đổi thứ tự sắp xếp các phần tử trong $map$:
```c
struct cmp{
	bool operator() (char a, char b) {return a>b;}
};
// khai báo thêm biến cmp
map<char, int, cmp> m;
```
### 3.Các phép toán cơ bản của map
* Trả về kích thước hiện tại của $map$:
```c
m.size();
```
* Kiểm tra $map$ có rỗng hoặc không:
```c
m.empty(); // trả về true nếu map rỗng, false nếu không rỗng
```
* Truy cập phần tử trong $map$:
```c
m[x]; // truy cập value của khóa x
```
* Chỉnh sửa phần tử trong $map$ (phần tử chỉnh sửa phải ở dạng "cặp"):
```c
m.insert(x);
```
* Xóa phần tử trong $map$:
```c
m.erase(x);
```
* Xóa tất cả phần tử trong $map$:
```c
m.clear();
```
* Con trỏ trỏ đến vị trí phần tử nhỏ nhất mà lớn hơn khóa $x$, nếu không tìm thấy trả về vị trí ```m.end()```:
```c
m.upper_bound(x);
```
* Con trỏ trỏ đến vị trí phần tử nhỏ nhất mà lớn hơn hoặc bằng khóa $x$, nếu không tìm thấy trả về vị trí ```m.end()```:
```c
m.lower_bound(x);
```
## III. Phân biệt set và map
* Mỗi phần tử của $set$ chỉ lưu một giá trị là khóa, trong khi mỗi phần tử của $map$ lưu hai giá trị là khóa và giá trị của khóa.
* Ta thường sử dụng $map$ cho các bài toán có các giá trị liên quan mật thiết với nhau.
* $map$ sử dụng giá trị $key$ để xác định các phần tử, còn $set$ là tập hợp các $key$.