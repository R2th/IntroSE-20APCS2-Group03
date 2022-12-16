Tiếp nối bài viết Tản mạn về Nhập Môn Lập Trình(phần 1), hôm nay chúng ta sẽ đến với phần 2. Ở phần 2 này chúng ta sẽ lần lượt bàn về các vấn đề còn lại trong nội dung môn học Nhập Môn Lập Trình nhé! 

Link phần 1 bài viết: https://viblo.asia/p/tan-man-ve-nhap-mon-lap-trinh-phan-1-ByEZkAoq5Q0

## 7. Dữ liệu có cấu trúc (struct) và mảng (array):
**a. Dữ liệu có cấu trúc (struct):**

*Struct là gì?*

Struct cũng là một `kiểu dữ liệu`, tuy nhiên kiểu dữ liệu này đặc biệt ở chỗ sẽ do bạn `tự định nghĩa` ra bằng cách sử dụng các kiểu dữ liệu có sẵn trong `C/C++`. 

![Struct in C](https://images.viblo.asia/61c8d1fa-0e3a-4dc4-a409-1a08c101edbb.jpg)

*Vậy khi nào thì dùng struct?*

Hãy nghĩ tới viễn cảnh bạn cần lưu thông tin một nhân viên trong công ty. Một nhân viên sẽ bao gồm các thông tin `họ tên`, `ngày sinh`, `lương`, `phòng ban`, `ngày gia nhập công ty`, `người quản lí`. Dĩ nhiên bạn hoàn toàn có thể dùng các biến rời rạc để lưu các thông tin trên, tuy nhiên để code dễ đọc và dễ quản lí bạn nên tạo ra struct `Employee` để quản lí các thông tin trên.

![struct syntax](https://images.viblo.asia/14e4082e-79e2-4c67-9ca3-5190fb66f761.png)

<div align="center">(Cú pháp để tạo ra struct)</div>

> ⚡ Để đọc thêm về struct, bạn có thể xem ở đây: https://www.programiz.com/c-programming/c-structures

Ơ, vậy chung quy lại thì struct cũng là một kiểu dữ liệu, thế thì kích thước của kiểu dữ liệu này là bao nhiêu? Làm một thử nghiệm nhỏ nhé, thử chạy đoạn chương trình sau đây:
```c
#include <iostream>
using namespace std;
struct MyStruct{
    double x; // size = 8
    double y; // size = 8
};

int main()
{
    cout << sizeof(MyStruct);
    return 0;
}
```
Kết quả trả ra là 16 đúng không, thế thì có lẽ nào kích thước của struct sẽ bằng tổng kích thước các thành phần cấu thành nên nó. Cũng đoạn code trên, nhưng thử sửa lại struct `MyStruct` tí nhé!
```c
struct MyStruct{
    int x; // size = 4
    double y; // size = 8
};
```
Nếu giả thuyết của chúng ta đúng thì kết quả trả ra là 12 đúng không? Tuy nhiên, kết quả chúng ta thu được lần này vẫn là 16. 

![size of struct](https://images.viblo.asia/dc019ab5-0184-489c-b1ae-c47043b9f0ec.jpg)

Vậy thì cách tính kích thước một struct là như thế nào? Thực ra để phục vụ cho việc di chuyển nhanh trên bộ nhớ máy tính, các trình biên dịch (compiler) sẽ thêm phần padding cho các biến dữ liệu trong struct (để hiểu hơn về vấn đề này chúng ta sẽ tìm hiểu nó ở môn `Hệ thống máy tính`). Trong trường hợp này, hiểu đơn giản thì trên bộ nhớ sẽ tạo ra sẵn các ô nhớ có kích thước bằng 8 (con số này có thể khác ở các trình biên dịch khác nhau), và sẽ tìm cách đẩy các biến vào theo thứ tự với nguyên tắc là một biến (có kích thước kiểu dữ liệu không vượt quá 8) không nằm trên 2 ô nhớ.
Xét trường hợp đầu tiên, 2 biến kiểu double sẽ được đưa vào ô nhớ theo thứ tự sau:

![struct example1](https://images.viblo.asia/1eab0c79-23a8-44e8-94b4-7beceb576d75.png)

Ở trường hợp tiếp theo, 2 biến kiểu int và double sẽ được đưa vào ô nhớ theo thứ tự sau:

![struct example2](https://images.viblo.asia/4208c328-204e-41c8-a1df-4c877516761c.png)

Điều này lí giải cho nguyên nhân vì sao ở trường hợp sau kích thước của `myStruct` vẫn là `16`.

> ⚡ Bên cạnh struct, có một kiểu dữ liệu khá giống với struct là `union`, bạn có thể đọc về union ở đây: https://www.geeksforgeeks.org/union-c/ 

⚡ Nắm vững struct sẽ tạo một tiền đề tốt cho bạn để học môn `Phương pháp Lập trình hướng đối tượng(OOP)` sau này đấy!

**b. Mảng (array):**

*"Mảng là một loại cấu trúc dữ liệu trong ngôn ngữ lập trình C/C++, nó lưu trữ một tập hợp tuần tự các phần tử cùng kiểu với độ dài cố định."*

![Array](https://images.viblo.asia/0635ca02-d31f-4f19-b790-17224bfdefb6.png)

Đa phần ở các ngôn ngữ (vẫn có một số ngoại lệ), mảng có chỉ số bắt đầu từ `0`.

![Array index meme](https://images.viblo.asia/605fe44d-df89-4aa3-bf13-f414bbcd20d7.png)

*Cú pháp khai báo và khởi tạo một mảng:*

![Init Array](https://images.viblo.asia/8f59b20b-b865-406b-8746-92570c1fdc94.png)

<div align="center">(Tạm thời ta sẽ chưa quan tâm đến cách khai báo cuối cùng trong hình trên)</div>

***

Để truy xuất đến một phần tử trong mảng ta sử dụng toán tử `[]`

![Array access](https://images.viblo.asia/cb57d15a-54d1-471a-b98b-8df6e1acf1d3.png)


*Ví dụ về nhập, xuất mảng trong C:*
```c
#include <stdio.h>
int main(){
    int a[100]; // declare an array

    int n; // real size of your array
    printf("Nhap kich thuoc mang: ");
    scanf("%d",&n);
    
    //input values for array
    for(int i = 0; i < n; i++){
        printf("Nhap a[%d]: ",i);
        scanf("%d",&a[i]);
    }

    printf("\nPHAN TU SAU KHI NHAP VAO MANG:\n");
    //print values in array
    for(int i = 0; i < n; i++){
        printf("a[%d] = %d \n",i, a[i]);
    }
}
```

> ⚡ Sau khi có kiến thức về mảng, bạn hãy viết một chương trình thực hiện công việc sau, tạo ra một mảng `HocSinh`, `HocSinh` có cấu trúc như sau: 
```c
struct HocSinh{
    char[8] idNumber;
    char[50] name;
    double avgGrade;
}
```
Chương trình cho phép người dùng nhập vào thông tin n HocSinh và xuất ra thông tin HocSinh có điểm trung bình cao nhất.

Bạn đã thấy mảng số nguyên, mảng `HocSinh`,... vậy câu hỏi đặt ra là có mảng của mảng không? Đây là vấn đề về `mảng nhiều chiều`, cụ thể hơn, bạn có thể xem ở đây: https://quantrimang.com/mang-array-trong-cplusplus-156212https://www.programiz.com/c-programming/c-multi-dimensional-arrays

## 8. Hàm (function):

*Hàm là gì?* 

> *"Hàm trong C là một tập hợp các xử lý nhằm thực hiện một chức năng cụ thể nào đó trong chương trình."*
    Hàm có thể nhận một số tham số đầu vào (hoặc không có tham số đầu vào) và trả ra kết quả.
    
![Hàm](https://images.viblo.asia/b54a43c6-239f-4017-a88d-71d350aba9e9.png)

Để dễ hình dung ta có thể nhìn hình vẽ trên, hàm sẽ như một chiếc máy xay sinh tố nhận đầu vào là `trái cây (input)` và trả ra kết quả là `những ly nước trái cây (output)`.

![main meme](https://images.viblo.asia/69e6daaf-131e-4178-8237-6669f834f037.jpg)

<div align="center" >  (Cú pháp tạo hàm trong C/C++) </div>

*** 

Khoan, hình như chúng ta đã thấy cú pháp tương tự thế này ở đâu đó rồi nhỉ? Chính xác đấy bạn, hàm `main` chúng ta viết đó giờ cũng có cấu trúc giống thế này đấy. Còn về câu hỏi tại sao hàm `main` lại `return 0` thì bạn có thể có được câu trả lời ở đây: https://stackoverflow.com/questions/21494929/why-return-0-from-main-in-a-c-program. Ngoài ra, không chỉ `main`, chúng ta cũng đã từng dùng các hàm được xây dựng sẵn trong `C/C++` đấy, bạn có nhận ra đó là các hàm nào không?

*Vậy dùng hàm để làm gì?*
* Trước hết, hàm giúp code của bạn dễ đọc và dễ bảo trì hơn. Thử tưởng tượng toàn bộ code của bạn được viết trong hàm `main`.

![main meme](https://images.viblo.asia/11face64-4819-471d-8580-52acc6331976.jpg)

Khi đó với các chương trình lớn, đoạn code của bạn sẽ phình to ra, và việc phát hiện lỗi ở chương trình này chắc chắn là không dễ dàng chút nào.
* Tránh việc *Phát minh lại cái bánh xe*. Thử tưởng tượng bạn cần làm việc `kiểm tra một số có phải là số nguyên tố hay không?`, đoạn chương trình làm việc này có thể được viết như sau: 
```c
//... check n is prime?
int flag = 1 // n is prime

if (n <= 2)
    flag = 0;
 
// Check from 2 to square root of n
for (int i = 2; i <= sqrt(n); i++)
    if (n % i == 0){
        flag = 0;
        break;
    }
if(flag == 1){
    cout << "n là số nguyên tố!" << endl;
}
else{
    cout << "n không là số nguyên tố!" << endl;
}      
 
//...
```
Như vậy cứ mỗi lần cần kiểm tra số nguyên tố bạn sẽ phải bê nguyên đống code này theo. Và bỗng một ngày một ngày đẹp trời, bạn nhận ra rằng ở đoạn code này khi `n = 2` sẽ cho ra kết quả *không là số nguyên tố* và lỗi nằm ở chỗ `if(n <= 2)` cần đổi thành `if(n < 2)` thế là bạn lại phải đi sửa lại từng chút một nơi có đoạn code này. Với hàm bạn chỉ cần đơn giản là gọi lại hàm ở những nơi cần xử lí, và nếu cần chỉnh sửa thì cũng chỉ cần sửa ở một chỗ.  

***Lưu ý khi sử dụng hàm***:
> ⚡ Bạn thử dự đoán kết quả đoạn chương trình sau và chạy thử để kiểm chứng nhé!
```c
#include<iostream>
using namespace std;

void increaseByOne(int number){
    number++;
}

int main(){
    int a = 7;
    increaseByOne(a);
    cout << a << endl;
    return 0;
}
```

![Reference type meme](https://images.viblo.asia/6b709992-76f6-4eec-9100-a3d670d6a880.jpg)

* Sau khi chạy thử bạn thấy biến a không thay đổi giá trị đúng không? Đây là vấn đề về `tham trị(pass by value)` và `tham chiếu(pass by reference)`, hiểu đơn giản thì khi bạn truyền `a` vào hàm `increaseByOne` thì hàm sẽ tạo ra một biến `number` và gán giá trị của `a` cho `number`, và dĩ nhiên việc tăng giá trị của `number` lên 1 sẽ chẳng ảnh hường gì đến giá trị của `a`. Giải pháp của vấn đề này đó là bạn có thể truyền dữ liệu theo kiểu tham chiếu trong `C++`. Chúng ta sẽ bàn sâu về vấn đề này hơn ở môn `Kỹ thuật lập trình`. Khi đó hàm `increaseByOne` có thể viết lại như sau:

```c
void increaseByOne(int &number){
    number++;
}
```

* Tên hàm cần đặt rõ ràng và dễ hiểu, tránh những tên hàm khó hiểu và chung chung. Bởi trên thực tế, có thể ngay lúc code bạn có thể hiểu được hàm đó có công dụng gì, nhưng hãy tưởng tượng 1 tháng sau gặp lại đoạn chương trình đó bạn có nhớ được hàm đó có nhiệm vụ gì không (chưa kể nếu code với nhóm, các thành viên trong nhóm sẽ phải mất kha khá thời gian để đọc và hiểu công dụng các hàm bạn viết đấy).

![Only God knows meme](https://images.viblo.asia/03a6c111-4a86-46b4-8dae-626263e7773c.jpg)

![Function name meme](https://images.viblo.asia/3f384aac-3a3e-4be9-b1ac-4250db1193a2.png)

<div align="center">(Không tới mức này, nhưng khi đặt tên hàm hãy nghĩ đến bản thân ở tương lai nhé.)</div>

***

* Tuân thủ các quy tắc đặt tên biến, tên hàm ở https://google.github.io/styleguide/ . Ngoài ra không riêng gì ở C/C++, khi học một ngôn ngữ mới bạn cũng nên tuân thủ các quy tắc ứng với các ngôn ngữ khác nhau ở đây!
> ⚡ Sau khi có kiến thức về hàm bạn hãy thử làm một số bài tập nhỏ sau nhé:
```c
* Viết hàm int sumToN(int n) trả ra giá trị tổng các số từ 1 đến n.
* Viết hàm bool isPrime(int n) kiểm tra xem n có phải là số nguyên tố hay không?  
* Viết hàm bool isTriangular(double a, double b, double c) kiểm tra xem 3 độ dài a, b, c có thể là 3 độ dài của 3 cạnh 1 tam giác hay không?
```
> ⚡ Ngoài ra, bạn có thể làm thêm các bài tập của thầy Nguyễn Tấn Trần Minh Khang ở đây: https://www.studocu.com/vn/document/truong-dai-hoc-mo-ha-noi/lap-trinh-c/1000-bai-tap-c-ren-luyen-code/24661181
## 9. Làm việc với tập tin (file):
Chúng ta đã biết đến cách lấy dữ liệu từ bàn phím, xuất dữ liệu ra màn hình. Và tiếp theo chúng ta sẽ tiếp cận với một cách nhập xuất dữ liệu mới.

![Write read file](https://images.viblo.asia/d929a434-8841-4d69-afb9-1770eab129f2.png)

Điều đó nghĩa là thay vì lấy dữ liệu từ bàn phím, ta có thể lấy dữ liệu từ file. Thay vì xuất dữ liệu ra màn hình, ta có thể xuất dữ liệu ra file.

Trong phạm vi của môn học này, ta chỉ bàn đến file text.

*Tại sao phải sử dụng file?*
* Trước hết, với việc xuất dữ liệu ra màn hình, dữ liệu sẽ bị mất khi bạn tắt chương trình. Với file thì không như thế, dữ liệu của bạn vẫn sẽ được lưu lại trong file. 
* Với việc nhập nhiều dữ liệu, việc nhập liệu từ bàn phím là rất mất thời gian và đôi khi là bất khả thi, lúc này thì việc lấy dữ liệu từ file là một giải pháp để giải quyết vấn đề.
* Với việc dữ liệu được lưu ra file, ta có thể dễ dàng di chuyển dữ liệu tới các nơi khác, từ máy này sang máy khác.

Để đọc ghi file trong C++, ta có thể sử dụng thư viện fstream.

Cụ thể hơn về file, về cách đọc ghi file, các chế độ mở file,... các bạn có thể tìm thấy ở bài viết sau: https://www.guru99.com/cpp-file-read-write-open.html#:~:text=You%20can%20read%20information%20from,use%20the%20ifstream%2F%20fstream%20object.

> ⚡ Bạn nhớ bài tập nhập vào thông tin n học sinh và in ra thông tin học sinh có điểm trung bình cao nhất ở trên không? Thử làm lại nó với dữ liệu đầu vào được đọc từ file input.txt và xuất kết quả ra file output.txt nhé!
## Kết:
Trên đây là bài viết chia sẻ về những kiến thức bạn sẽ được học ở môn Nhập môn Lập trình (nội dung môn học có thể khác nhau đôi chút tùy vào mỗi trường). Ngoài ra để tham khảo, hiểu sâu hơn các vấn đề, bạn có thể tìm đọc cuốn `Bí kíp luyện lập trình C - Q1 ` của thầy Vũ Quốc Hoàng - sách đã được thầy cho phép chia sẻ công khai phục vụ cho mục đích học tập, chia sẻ. 

Cảm ơn bạn đã dành thời gian đọc bài viết, mong những chia sẻ của mình có thể giúp các bạn phần nào trên con đường trở thành một developer. Nếu bài viết có gì sai sót, mình hi vọng nhận được những ý kiến đóng góp từ các bạn. Chúc các bạn học tốt! Hẹn gặp lại các bạn ở bài viết sau.