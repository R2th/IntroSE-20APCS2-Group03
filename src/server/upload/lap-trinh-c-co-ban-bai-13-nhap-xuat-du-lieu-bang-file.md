Từ đầu khóa học, chúng ta luôn luôn nhập dữ liệu vào từ bàn phím, và trả ra kết quả trên cửa sổ console (nói một cách dễ hiểu là kết quả hiển thị trực tiếp lên cửa sổ thực thi chương trình). Tuy nhiên, trong một số kỳ thi lập trình (đặc biệt là ở Việt Nam), và xa hơn là trong công việc lập trình sau này, có những lúc dữ liệu nhập vào rất nhiều và lớn, việc nhập bằng tay là không khả thi. Khi đó, dữ liệu thường sẽ được sinh ra sẵn và đặt trong một file text nào đó. Nhiệm vụ của người làm bài là nhận dữ liệu từ file text đó, thiết kế thuật toán sau đó đưa kết quả ra một file text tương đương (hoặc vẫn đưa kết quả ra cửa sổ thực thi - tùy vào yêu cầu bài toán). Rất may mắn là ngôn ngữ C/C++ cung cấp những cú pháp rất đơn giản để thực hiện nhập - xuất dữ liệu bằng file. Có hai phương pháp để làm điều này.

# I. Sử dụng hàm `freopen()` trong thư viện `<cstdio>`

Với những người sử dụng editor Code::Blocks, đặc biệt là trong lĩnh vực lập trình thi đấu, hàm `freopen()` thực sự rất tiện lợi trong việc nhập xuất dữ liệu bằng file. Cú pháp sử dụng như sau:

```cpp
freopen({Tên_file}, {Định_dạng_nhập_xuất}, {Luồng_vào_ra});
```

Khi cần sử dụng nhập xuất dữ liệu bằng file, hàm này thường sẽ được lập trình viên thêm vào ở ngay đầu tiên trong hàm `main()` của chương trình. Tuy nhiên, các đối số của nó thì có hơi phức tạp, giờ chúng ta cùng phân tích:
- ***{Tên_file}:*** Là tên của file dữ liệu dùng để nhận dữ liệu đầu vào hoặc viết kết quả ra. File này có thể có nhiều phần mở rộng khác nhau, như `.inp`, `.out`, `.dat`, `.in`, `.ou`,...Tùy vào đề bài yêu cầu sử dụng định dạng gì thì chúng ta sử dụng định dạng đó.
- ***{Định_dạng_nhập_xuất}:*** Là một chữ cái quy định rằng file dữ liệu này dùng để làm gì. Có $5$ định dạng nhập xuất sau đây:
	![](https://cdn.ucode.vn/uploads/2247/images/ifNiDyrj.png)   	Thông thường, trong lập trình thi đấu chúng ta sẽ chỉ lưu  tâm tới hai định dạng là `"r"` và `"w"`, do dữ liệu chỉ được nhập vào từ một file và in ra một file khác cùng tên (nhưng khác phần mở rộng).
- ***{Luồng_vào_ra}:*** Là một trong hai luồng `stdin` hoặc `stdout`. Nếu như file dùng để đọc dữ liệu vào thì ta chọn luồng là `stdin`, ngược lại thì chọn `stdout`.

***Ví dụ minh họa:*** Ví dụ dưới đây là một bài thi trong kỳ thi HSG Tin học với yêu cầu nhập dữ liệu từ file có phần mở rộng là `.inp` và in kết quả ra file có phần mở rộng là `.out`:


	
![](https://cdn.ucode.vn/uploads/2247/images/FQKpqNCb.png)


Đề bài yêu cầu nhập dữ liệu từ file `Chinhphuong.inp` và đưa kết quả ra file `Chinhphuong.out` sau khi tính toán. Vậy, ta chỉ cần thêm hai hàm `freopen()` ở đầu hàm `main()`:

```cpp
#include <cstdio>
#include <iostream>

using namespace std;

int main()
{
    freopen("Chinhphuong.inp", "r", stdin);
    freopen("Chinhphuong.out", "w", stdout);
   
    int N;
    cin >> N;

    for (int i = 1; i <= N; ++i)
        cin >> a[i];

    // Các câu lệnh khác trong chương trình có thể tiếp tục...
}
```

# II. Sử dụng các kiểu dữ liệu `ifstream`, `ostream` và `fstream` trong thư viện `<iostream>`

## 1. Khai báo các file input và output

Ngoài cách sử dụng `freopen()`, C++ còn cung cấp sẵn ba lớp dưới đây để hỗ trợ đọc/ghi dữ liệu từ file:
- `ifstream`: Sử dụng để đọc dữ liệu từ file.
- `ofstream`: Sử dụng để ghi dữ liệu ra file.
- `fstream`: Sử dụng để vừa đọc và ghi dữ liệu bằng file.

Để sử dụng được các lớp này (chúng giống như các kiểu dữ liệu vậy), các bạn cần khai báo hai thư viện: Thư viện `<iostream>` cho hai lớp `ifstream` và `ofstream`, thư viện `<fstream>` cho lớp `fstream`. Kế đến, các bạn tạo ra một đối tượng dùng để kiểm soát file dữ liệu theo cú pháp:

```cpp
ifstream {Tên_biến_file_input};
ofstream {Tên_biến_file_output};
fstream {Tên_biến_file_vừa_input_vừa_output};
```

Chẳng hạn, ta có thể khai báo ra ba biến kiểm soát file input và output như sau:

```
ifstream input_file; // File để đọc dữ liệu vào.
ofstream output_file; // File để ghi dữ liệu ra.
fstrean io_file; // File để vừa đọc vừa ghi dữ liệu.
```

## 2. Mở một file để làm việc

Sau khi khai báo các đối tượng file, chúng ta cần mở nó ra để tiến hành đọc/ghi dữ liệu. Để làm việc này, ta sử dụng cú pháp:

```cpp
{Tên_biến_file}.open("{Tên_file_cần_mở}", {Chế_độ_mở});
```

Trong đó, ***{Tên_biến_file}*** là tên biến mà các bạn đã khai báo để kiểm soát file, ***"{Tên_file_cần_mở}"*** là file trong máy tính mà các bạn muốn sử dụng, còn ***{Chế_độ_mở}*** là lựa chọn để mở file đó ra và làm gì với nó. Dưới đây là một số chế độ mở file phổ biến:


	
![](https://cdn.ucode.vn/uploads/2247/images/hXZiwQpz.png)


Ví dụ, sử dụng các biến file đã khai báo ở mục $2.1,$ các bạn có thể mở một file bất kỳ như sau:

```cpp
input_file.open("sample_input.inp", ios::in);
output_file.open("sample_output.out", ios::out);
```

Mặc định đường dẫn của file sẽ được trỏ vào thư mục của project hiện tại bạn đang làm việc, nghĩa là file dữ liệu các bạn muốn mở ra phải nằm trong cùng thư mục của project đó. Nếu như bạn muốn mở một file ở ngoài project thì cần chỉ rõ đường dẫn của nó, chẳng hạn như: `"D:\C++\SampleInput\sample_input.txt"`.

Một file có thể được mở với nhiều chế độ kết hợp cùng nhau, sử dụng toán tử `|`. Chẳng hạn, ta có thể mở các file đã khai báo ở mục $1$ ở một hoặc nhiều chế độ như sau:

```cpp
output_file.open("sample_output.out", ios::out | ios::app);
```

Nếu như khi khi mở file mà các bạn để trống mục ***{Chế_độ_mở},*** hệ thống sẽ tự động tạo chế độ mặc định cho nó. Các class `ifstream`, `ofstream` và `fstream` đều đã có chế độ mặc định:


![](https://cdn.ucode.vn/uploads/2247/images/vESzXdjY.png)


Nếu cẩn thận hơn nữa, trước khi thao tác với file, các bạn có thể kiểm tra xem file đó đã mở thành công hay chưa bằng cú pháp:

```cpp
{Tên_biến_file}.is_open(); // Trả về true nếu file đã mở thành công, ngược lại trả về false.
```

## 3. Thao tác đọc/ghi dữ liệu bằng file

Sau khi một file đã mở thành công, chúng ta có thể đọc/ghi dữ liệu bằng file đó thông qua các toán tử `<<` và `>>` giống như hai câu lệnh `cin` và `cout` khi nhập xuất bằng luồng vào ra chuẩn. Cú pháp như sau:

```cpp
{Tên_biến_file_input} >> {Tên_biến_nhập_vào};
{Tên_biến_file_output} << {Dữ_liệu_xuất_ra};
```

Chẳng hạn như:

```cpp
input_file >> n;
output_file << "Hello World";
```

Các quy tắc nhập xuất lúc này giống hệt như khi thao tác với các câu lệnh `cin` và `cout` nên sẽ không có gì cần bàn luận thêm ở đây. Nếu muốn tìm hiểu thêm chi tiết về các thao tác trong nhập xuất dữ liệu bằng `fstream`, các bạn có thể đọc thêm ở link: https://www.cplusplus.com/doc/tutorial/files/

## 4. Đóng file sau khi sử dụng xong

Trong lập trình thi đấu, thao tác này thường không cần thiết vì việc đọc/ghi dữ liệu từ file chỉ diễn ra một lần duy nhất khi chạy chương trình. Tuy nhiên, trong các dự án lớn, thì sau khi hoàn thành việc đọc/ghi dữ liệu từ một file, các bạn cần đóng nó lại để các file đó lại có thể được mở ra sử dụng trong các tiến trình khác, đồng thời bảo toàn dữ liệu của chúng. Cú pháp để đóng một file như sau:

```cpp
{Tên_biến_file}.close();
```

Tựu chung lại, đọc và ghi dữ liệu bằng file có thể được thực hiện theo hai cách trên. Tuy nhiên, đối với phạm vi lập trình thi đấu, sử dụng hàm `freopen()` sẽ được ưa thích hơn vì đơn giản, dễ nhớ. 

# III. Tài liệu tham khảo

- https://cachhoc.net/2017/11/10/lap-trinh-c-bai-17-nhap-xuat-file-trong-cc/
- https://codelearn.io/sharing/su-dung-file-sieu-co-ban-voi-cpp