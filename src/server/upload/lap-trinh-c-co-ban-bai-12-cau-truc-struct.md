# I. Kết hợp các dữ liệu khác kiểu với nhau

Xét trường hợp chúng ta cần lưu trữ thông tin của nhiều cuốn sách trong thư viện, mỗi cuốn sách có nhiều loại thông tin như: Tiêu đề, tác giả, thể loại và ID. Trong các kiểu dữ liệu nguyên thủy ta đã học, không có kiểu nào có thể lưu trữ cùng lúc nhiều thông tin như thế. Khi đó, lập trình viên sẽ phải tìm cách tạo ra các kiểu dữ liệu mới để lưu trữ tất cả thông tin của một cuốn sách (là kiểu dữ liệu tự định nghĩa - đã đề cập các bài trước). Trong C++, ***Cấu trúc (struct)*** và ***Lớp (class)*** chính là hai loại dữ liệu hỗ trợ cho người dùng làm như vậy. 

Tuy nhiên, trong phạm vi của lập trình cơ bản, `struct` sẽ được sử dụng chủ yếu trong việc tạo ra các kiểu dữ liệu tự định nghĩa, và mức độ sử dụng cũng rất đơn giản. Ta có thể hiểu `struct` là một dạng ***bản ghi***, dùng để lưu trữ những thông tin chung nhất của nhiều đối tượng dữ liệu, ví dụ như mọi bản ghi của các sinh viên đại học trong hệ thống của nhà trường đều phải có tên, mã số sinh viên, ngày tháng năm sinh và ngành học; hoặc như ví dụ về lưu trữ các cuốn sách ở trên,...

# II. Định nghĩa một cấu trúc

## 1. Định nghĩa và khai báo các biến cấu trúc

Để định nghĩa một cấu trúc, ta sử dụng cú pháp như sau:

```cpp=
struct {Tên_cấu_trúc}
{
    {Định_nghĩa_thành_viên_1};
    {Định_nghĩa_thành_viên_2};
    ...
    {Định_nghĩa_thành_viên_n};
} {Danh_sách_các_biến_cấu_trúc};
```

Trong đó, ***{Tên_cấu_trúc}*** là một định danh tùy ý người dùng đặt (thông thường tên cấu trúc sẽ viết hoa chữ cái đầu tiên). ***{Định_nghĩa_thành_viên}*** là một khai báo biến nào đó ở các kiểu dữ liệu khác nhau, còn ***{Danh_sách_các_biến_cấu_trúc}*** là các định danh tên biến.

***Ví dụ:*** Định nghĩa một cấu trúc $\text{Books}$ lưu thông tin về tên, tác giả, thể loại và ID của một cuốn sách, sau đó khai báo ba biến cấu trúc thể hiện ba cuốn sách:

```cpp=
struct Books
{
    int book_id;
    string book_name, author, category; 
} book_1, book_2, book_3;
```

Ngoài cách khai báo liền các biến cấu trúc như trên, người dùng có thể khai báo biến cấu trúc ở bất kỳ đâu trong chương trình bằng cú pháp: `{Tên_cấu_trúc} {Tên_biến_cấu_trúc};` như ví dụ dưới đây:

```cpp=
int main()
{
    Books book_1, book_2, book_3;
	
    return 0;
}
```

## 2. Khai báo các biến cấu trúc với từ khóa `typedef`

Từ khóa `typedef` là một từ khóa rất hữu ích trong lập trình thi đấu, nó giúp người dùng đặt ra các tên mới cho những kiểu dữ liệu, bao gồm cả kiểu dữ liệu nguyên thủy lẫn kiểu dữ liệu người dùng tự định nghĩa. Bạn có thể định nghĩa một `struct` với tên cố định bằng cú pháp:

```cpp=
typedef struct
{
	{Định_nghĩa_các_thành_viên_của_cấu_trúc};
} {Tên_cấu_trúc};
```

Ví dụ, cấu trúc $\text{Books}$ ở trên có thể viết lại như sau:

```cpp=
typedef struct 
{
    int book_id;
    string book_name, author, category; 
} Books;
```

Kể từ khai báo này trở đi, các biến cấu trúc cũng có thể được khai báo bằng cú pháp giống như khai báo một biến kiểu nguyên thủy thông thường:

```cpp=
Books book_1, book_2, book_3;
```

Tuy nhiên, cách khai báo này với `struct` không quá phổ biến vì nó không giúp cho lập trình viên giảm được về công sức lập trình. Chỉ khi ta có những kiểu dữ liệu quá dài, ví dụ như `pair` hay `unsigned long long` mà không muốn viết dài như vậy, thì từ khóa `typedef` sẽ phát huy tác dụng, bằng cách đặt lại tên mới ngắn gọn hơn cho kiểu đó:

```cpp=
typedef unsigned long long ULL;

int main()
{
    ULL a, b; // Thay vì khai báo unsigned long long thì có thể sử dụng định danh ULL.
}
```

# III. Các thao tác với cấu trúc

## 1. Truy cập các thành viên của một biến cấu trúc

Để truy cập tới các thành viên trong một cấu trúc, ta sử dụng cú pháp sau:

```
{Tên_biến_cấu_trúc}.{Tên_thành_viên}
```

Khi truy cập theo cách này, người dùng có thể sử dụng thành viên được truy cập tới như một biến đơn thông thường, kết hợp vào các phép toán và câu lệnh khác nhau. Ví dụ, ta có thể nhập xuất tên sách của biến cấu trúc $\text{book\_1}$ có kiểu là $\text{Books}$ bằng cú pháp:

```cpp=
int main()
{
    Books book_1;

    cin >> book_1.book_name;	
    cout << book_1.book_name;
}
```

## 2. Gán giá trị cho một biến cấu trúc

Biến cấu trúc cung cấp một phép toán gán rất hữu ích. Khi muốn gán giá trị cho các thành viên của một biến cấu trúc gồm $n$ thành viên, ta có thể sử dụng cú pháp sau:

```cpp
{Tên_biến_cấu_trúc} = { {Giá_trị_1}, {Giá_trị_2},..., {Giá_trị_n} };
```

Khi đó, các ***{Giá_trị_1}, {Giá_trị_2},..., {Giá_trị_n}*** sẽ lần lượt được gán cho các ***{Thành_viên_1}, {Thành_viên_2},..., {Thành_viên_n}*** của biến `struct`. Lấy ví dụ:

```cpp=
#include <bits/stdc++.h>

using namespace std;

struct Books
{
    string book_name;
    int book_id, cost;
};

int main()
{
    Books book_1 = {"Truyện Cổ tích Việt Nam", 1, 25000}; // Gán giá trị cho các thành viên cấu trúc.
    
    cout << "Mã số sách là: " << book_1.book_id << endl;
    cout << "Tên sách là: " << book_1.book_name << endl;
    cout << "Giá bán sách: " << book_1.cost << endl;
}
```

Biên dịch và chạy đoạn chương trình trên, ta có kết quả là:

```
Mã số sách là: 1
Tên cuốn sách là: Truyện Cổ tích Việt Nam
Giá bán sách: 25000
```

## 3. Truyền cấu trúc vào hàm như một tham số

Ta có thể truyền cấu trúc vào hàm dưới dạng một tham số giống như những biến thông thường, và cũng sẽ có truyền tham chiếu hoặc truyền tham trị. Cú pháp truyền không có gì khác biệt:

```cpp
{Kiểu_hàm} {Tên_hàm}( {Tên_cấu_trúc} {Tên_biến_tham_số} )
```

Nếu như muốn truyền tham chiếu, chỉ cần thêm toán tử `&` phía trước tên biến tham số. Còn các đối tượng trong cấu trúc thì chỉ giống như biến thông thường nên có thể kết hợp với các câu lệnh như các biến.

***Ví dụ:*** Dưới đây là một đoạn chương trình cho phép nhập vào chiều dài và chiều rộng của $N$ hình chữ nhật khác nhau và sử dụng một hàm để tính diện tích của các hình chữ nhật đó:

```cpp=
#include <bits/stdc++.h>

using namespace std;

struct Rectangle // Cấu trúc lưu thông tin về hình chữ nhật.
{
    int length; // Chiều dài.
    int width; // Chiều rộng.
    int area; // Diện tích.
} rec[50]; // Định nghĩa một mảng chứa các hình chữ nhật.

void get_area(Rectangle & rec) // Tính diện tích của một HCN.
{
    rec.area = rec.length * rec.width;
}

int main()
{
    cin >> N;
    for (int i = 1; i <= N; ++i)
    {
	cin >> rec[i].length >> rec[i].width;

	get_area(rec[i]); // Truyền tham trị để cập nhật trực tiếp diện tích lên thành viên area của biến rec[i].
    }
    
    for (int i = 1; i <= N; ++i)
    {
        cout << "Diện tích hình chữ nhật thứ " << i << " là: ";
	cout << rec[i].area << endl;
    }
}  
```

Hãy thử biên dịch và chạy chương trình trên với Input dưới đây:

```
3
15 16
10 5
3 4
```

Chúng ta sẽ thu được output như sau:

```
Diện tích hình chữ nhật thứ 1 là: 240
Diện tích hình chữ nhật thứ 2 là: 50
Diện tích hình chữ nhật thứ 3 là: 12
```

# IV. Bài tập minh họa

## 1. Quản lý sinh viên

### Đề bài

Định nghĩa một cấu trúc **Student** để quản lý sinh viên của một lớp học gồm $N$ sinh viên khác nhau. Các thông tin cần quản lý bao gồm: ***Mã số sinh viên, Năm sinh, Điểm thi giữa kỳ, Điểm thi cuối kỳ, Điểm trung bình, Xếp hạng***. Cho trước các thông tin: ***Mã số sinh viên, Năm sinh, Điểm thi giữa kỳ, Điểm thi cuối kỳ*** của $N$ sinh viên theo thứ tự từ $1$ tới $N$.

Hãy viết các hàm thực hiện các công việc sau:
- Đưa ra số lượng sinh viên có năm sinh từ $1999$ trở về sau.
- Tính điểm trung bình của mỗi sinh viên theo công thức:
$$\text{Điểm trung bình} = 0.3 \times \text{(Điểm giữa kỳ)} + 0.7 \times \text{(Điểm cuối kỳ)}$$ 
Sau đó tính xếp hạng của từng sinh viên theo quy tắc:
- Nếu $\text{Điểm TB} < 4.0$ thì xếp loại $D$.
- Nếu $4.0 \le \text{Điểm TB} < 6.0$ thì xếp loại $C$.
- Nếu $6.0 \le \text{Điểm TB} < 8.0$ thì xếp loại $B$.
- Trường hợp còn lại xếp loại $A$.

-------
- Đưa ra số lượng sinh viên xếp loại $A$ và số lượng sinh viên xếp loại $D$.
- Đưa ra số thứ tự của các sinh viên có điểm trung bình lớn hơn $4.0$ và nhỏ hơn $8.0$. Nếu không có sinh viên nào thì đưa ra một số $0$ duy nhất.

### Ý tưởng

Đây là một bài tập khá quen thuộc với các bạn mới học lập trình.

Ý tưởng rất đơn giản, chỉ cần tạo một `struct` lưu các thông tin như đề bài yêu cầu, sau đó viết ra các hàm:
- Kiểm tra một sinh viên có sinh từ năm $1999$ trở về trước không.
- Tính điểm trung bình của một sinh viên.
- Xếp hạng một sinh viên dựa trên điểm số.

Hai yêu cầu còn lại có thể làm trong quá trình nhập và xử lý thông tin của các sinh viên.

### Cài đặt

```cpp=
#include<bits/stdc++.h>

using namespace std;

struct student
{
    int student_code;
    int year_of_birth;
    double mid_term_point, final_point;
    double average_point;
    char ranking;
} students[51];

// Nhập dữ liệu một sinh viên.
void input(student &S) 
{
    cin >> S.student_code >> S.year_of_birth;
    cin >> S.mid_term_point >> S.final_point;
}

// Kiểm tra một sinh viên có phải sinh năm 1999 trở về sau không.
int year_of_birth_1999(student S) 
{
    if (S.year_of_birth >= 1999)
        return 1;
    else
        return 0;
}

// Tính điểm trung bình cho một sinh viên.
void count_average_point(student &S) 
{
    S.average_point = S.mid_term_point * 0.3 + S.final_point * 0.7;
}

void set_rank(student &S) // Xếp hạng cho sinh viên.
{
    if (S.average_point < 4.0)
        S.ranking = 'D';
    else if (4.0 <= S.average_point && S.average_point <= 6.0)
        S.ranking = 'C';
    else if (6.0 <= S.average_point && S.average_point <= 8.0)
        S.ranking = 'B';
    else
        S.ranking = 'A';
}

int main()
{
    int N;
    cin >> N;

    // Số sinh viên có năm sinh lớn hơn 1999, xếp loại A và xếp loại D;
    int cnt_1999 = 0, cnt_A = 0, cnt_D = 0; 
    // Lưu số thứ tự các sinh viên có điểm tb lớn hơn 4.0 và nhỏ hơn 8.0.
    vector < int > index_list; 
    for (int i = 1; i <= N; ++i)
    {
        input(students[i]);

        cnt_1999 += year_of_birth_1999(students[i]);
        count_average_point(students[i]);
        set_rank(students[i]);


        if (students[i].ranking == 'A')
            ++cnt_A;
        else if (students[i].ranking == 'D')
            ++cnt_D;

        if (4.0 < students[i].average_point && students[i].average_point < 8.0)
            index_list.push_back(i);
    }

    // Xuất kết quả ra màn hình.
    cout << cnt_1999 << endl;
    cout << cnt_A << ' ' << cnt_D << endl;
    if (index_list.empty())
        cout << 0;
    else for (int index: index_list)
        cout << index << ' ';
}
```

## 2. Tam Giác

### Đề bài

Khai báo một cấu trúc lưu thông tin về một tam giác (tọa độ ba đỉnh) trong mặt phẳng $Oxy$. 

Hãy viết các hàm sau:
- Hàm nhập tọa độ đỉnh cho tam giác.
- Hàm kiểm tra xem ba điểm đã nhập vào có thỏa mãn là ba đỉnh của một tam giác hay không?
- Hàm tính diện tích tam giác.
- Hàm tính chu vi tam giác.

### Ý tưởng

Trước tiên tạo ra một cấu trúc để biểu diễn điểm trên mặt phẳng tọa độ $Oxy,$ gồm hoành độ và tung độ.

Sau đó tạo thêm một cấu trúc nữa để biểu diễn một tam giác, gồm ba trường lưu ba điểm của tam giác.

Công việc còn lại rất đơn giản, chỉ cần viết ra các hàm theo đúng yêu cầu của đề bài là xong. Các bạn chỉ cần ghi nhớ hai công thức quan trọng cần sử dụng trong bài:

- Tính khoảng cách giữa hai điểm $(x_1, y_1)$ và $(x_2, y_2)$ trên mặt phẳng $Oxy$:

    $$\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$$
    
- Tính diện tích tam giác với tọa độ ba đỉnh lần lượt là $(x_1, y_1), (x_2, y_2)$ và $(x_3, y_3)$:

    $$\frac{\big|(x_2 - x_1) \times (y_3 - y_1) - (x_3 - x_1) \times (y_2 - y_1)\big|}{2}$$

### Cài đặt

```cpp=
```cpp
#include <bits/stdc++.h> // Khai báo luôn các thư viện cho ngắn gọn.

using namespace std;

struct point
{
    int x, y;
};

struct triangle
{
    point p1, p2, p3;
};

// Nhập tọa độ điểm trong tam giác.
void input(triangle &t)
{
    cin >> t.p1.x >> t.p1.y;
    cin >> t.p2.x >> t.p2.y;
    cin >> t.p3.x >> t.p3.y;
}

// Tính khoảng cách giữa hai điểm trên mặt phẳng tọa độ.
double distance(point p1, point p2)
{
    return sqrt((p1.x - p2.x) * (p1.x - p2.x) * 1.0 + (p1.y - p2.y) * (p1.y - p2.y) * 1.0);
}

// Kiểm tra xem ba điểm đã nhập vào có thỏa mãn là một tam giác hay không.
bool check_triangle(double d1, double d2, double d3)
{
    return (d1 > 0 && d2 > 0 && d3 > 0 && d1 + d2 > d3 && d1 + d3 > d2 && d2 + d3 > d1);
}

// Tính chu vi tam giác.
double calc_perimeter(double d1, double d2, double d3)
{
    return d1 + d2 + d3;
}

// Tính diện tích tam giác.
double calc_area(triangle t)
{
    return 0.5 * fabs((t.p2.x - t.p1.x) * (t.p3.y - t.p1.y) * 1.0 - (t.p3.x - t.p1.x) * (t.p2.y - t.p1.y) * 1.0);
}

int main()
{
    Triangle t;
    input(t);

    if (!check_triangle(t))
        cout << "NO";
    else
        cout << "YES" << endl << fixed << setprecision(3) << calc_perimeter(t) << ' ' << calc_area(t);
}
```

# V. Tài liệu tham khảo

- https://viettuts.vn/lap-trinh-cpp/struct-trong-cpp
- https://quantrimang.com/cau-truc-du-lieu-trong-cplusplus-156248
- https://laptrinhcanban.com/cpp/lap-trinh-cpp-co-ban/kieu-cau-truc-trong-cpp/kieu-cau-truc-trong-cpp/