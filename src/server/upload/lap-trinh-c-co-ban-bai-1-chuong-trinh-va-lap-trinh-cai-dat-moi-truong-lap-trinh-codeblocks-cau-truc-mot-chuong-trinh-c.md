# I. Khái niệm về chương trình và lập trình

## 1. Ngôn ngữ lập trình và chương trình dịch

Máy tính điện tử hoạt động dựa trên sự ra lệnh của con người, tuy nhiên nó không hiểu được ngôn ngữ thông thường của con người sử dụng. Để diễn tả các thuật toán cho máy tính hiểu được, người ta sử dụng một tập các lệnh được chuẩn hóa theo một hệ thống quy tắc riêng, được gọi là ***ngôn ngữ lập trình***.

Có ba loại ngôn ngữ lập trình:
- ***Ngôn ngữ máy (Machine language):*** Các lệnh được mã hóa bằng các kí hiệu $0 - 1,$ là ngôn ngữ mà máy tính sử dụng. Chương trình được viết bằng ngôn ngữ máy có thể được nạp vào bộ nhớ và sử dụng luôn.
- ***Hợp ngữ (Assembly language):*** Còn gọi là ngôn ngữ lập trình bậc thấp, kết hợp giữa mã máy và các từ viết tắt tiếng Anh để diễn tả câu lệnh.
- ***Ngôn ngữ lập trình bậc cao (High-level programming language):*** Là ngôn ngữ sử dụng các từ khóa gần với ngôn ngữ tiếng Anh để mô tả thuật toán. Ngôn ngữ lập trình bậc cao rất dễ viết do gần với ngôn ngữ tự nhiên. Tùy vào mức độ trừu tượng hóa mà ngôn ngữ lập trình bậc cao được định nghĩa là cao tới cấp nào. Trong khóa học này, chúng ta sẽ tập trung nghiên cứu ngôn ngữ lập trình bậc cao trung cấp, cụ thể là ngôn ngữ C++ (tiền thân là C, nên người ta thường viết C/C++).

Để chuyển đổi chương trình được viết bằng ngôn ngữ lập trình bậc cao sang chương trình mà máy tính có thể thực thi được, người ta sử dụng một chương trình đặc biệt gọi là ***chương trình dịch***. Chương trình dịch nhận đầu vào là một chương trình viết bằng ngôn ngữ lập trình bậc cao, thực hiện chuyển đổi sang ngôn ngữ máy. Có hai loại chương trình dịch:
- ***Chương trình thông dịch (Interpreter):*** Chương trình dịch sẽ kiểm tra tính đúng đắn của câu lệnh tiếp theo trong chương trình nguồn, sau đó chuyển đổi câu lệnh đó sang ngôn ngữ máy và thực thi nó. Như vậy, quá trình chuyển đổi được diễn ra luân phiên, chương trình dịch sẽ dịch và thực hiện từng câu lệnh một.
- ***Chương trình biên dịch (Compiler):*** Chương trình dịch sẽ duyệt, phát hiện lỗi, kiểm tra tính đúng đắn của mọi câu lệnh trong chương trình nguồn, sau đó mới tiến hành dịch toàn bộ chương trình nguồn sang ngôn ngữ máy và có thể lưu trữ để sử dụng lại khi cần thiết. 

Thông thường, các môi trường làm việc của các ngôn ngữ lập trình sẽ tích hợp sẵn chương trình dịch và các tính năng về soạn thảo, lưu trữ, theo dõi biến số,...Đối với C/C++, chúng ta có thể sử dụng các môi trường như: CodeBlocks, Sublime Text, Visual Studio Code,...đều được.

## 2. Khái niệm về lập trình

Mọi bài toán có thuật toán đều có thể giải được bằng máy tính điện tử. Các bước để giải một bài toán trên máy tính gồm có: Xác định bài toán, Xây dựng hoặc lựa chọn thuật toán khả thi, và sau cùng là lập trình.

Lập trình là việc sử dụng cấu trúc dữ liệu và tập các lệnh của ngôn ngữ lập trình cụ thể để mô tả dữ liệu và diễn đạt các thao tác của thuật toán.

# II. Giới thiệu ngôn ngữ lập trình C++

## 1. C++ là gì

Ngôn ngữ lập trình C++, được phát triển bởi Bjarne Stroustrup vào năm $1979$ là một ngôn ngữ lập trình ***bậc trung*** (kết hợp giữa các đặc điểm của ngôn ngữ lập trình bậc thấp và bậc cao), cung cấp khả năng lập trình hướng cấu trúc và hướng đối tượng. Thực ra, C++ là một bản nâng cấp của ngôn ngữ C, được phát triển dựa trên chính ngôn ngữ C nên nó vẫn mang phong cách lập trình hướng cấu trúc như C và hỗ trợ thêm phong cách lập trình hướng đối tượng. Vì thế, người ta thường gọi hai ngôn ngữ này bởi một cái tên chung là C/C++.

Bởi vì là ngôn ngữ được phát triển từ C, nên ngôn ngữ C++ vẫn có đầy đủ các câu lệnh và cú pháp của ngôn ngữ C. Trong khi lập trình C++, nhiều trường hợp chúng ta vẫn sử dụng các cú pháp của C và đặc biệt, trong lập trình thi đấu thì phong cách lập trình hướng cấu trúc của C (chia chương trình ra thành nhiều hàm nhỏ - mỗi hàm phụ trách một công việc cụ thể) vẫn được giữ nguyên vì tính đơn giản và phát huy được tốc độ trong quá trình giải các bài toán. Các file được viết bằng ngôn ngữ C++ đều có phần mở rộng là `.cpp`.

## 2. Tại sao lại lựa chọn C++ trong lập trình thi đấu

Học sinh - sinh viên thường chọn hai ngôn ngữ chủ đạo trong lập trình thi đấu là Pascal và C++. Tuy nhiên, trong những năm trở lại đây thì xu hướng sử dụng Pascal ngày càng giảm, ngược lại số lượng người sử dụng C++ ngày càng tăng lên. Có một vài nguyên nhân chính khiến cho C++ được ưa chuộng trong lập trình thi đấu nói riêng và trong lập trình nói chung:
- ***Dễ tiếp cận:*** Cú pháp của C++ rất dễ để tiếp cận, gần với ngôn ngữ đời thường và rất tường minh. Học sinh - sinh viên khi mới học lập trình khi tiếp cận với C++ phần lớn sẽ cảm thấy đơn giản hơn khi sử dụng C++ làm phương tiện để tiếp nhận các kiến thức về thuật toán.
- ***Hiệu năng cực kỳ cao:*** Đây là ưu thế lớn của C++, đặc biệt là trong lập trình thi đấu khi các bài toán đều có ràng buộc về thời gian thực thi chương trình, yêu cầu có một ngôn ngữ hiệu quả về thời gian chạy. Đối chiếu với một người bạn của nó là Python, ta sẽ thấy ngay tốc độ chạy của hai ngôn ngữ này là khác biệt, mặc dù Python là một ngôn ngữ có cú pháp rất ngắn gọn nhưng tốc độ chạy lại lâu hơn C++.
- ***Thư viện hỗ trợ người dùng:*** Trong C++ có rất nhiều thư viện cung cấp các hàm dựng sẵn, hỗ trợ người dùng tối đa trong khi lập trình, đặc biệt là các thuật toán và cấu trúc dữ liệu. Việc sử dụng thành thạo các thư viện trong C++ sẽ "nối dài khả năng lập trình" của học sinh - sinh viên.

# III. Cài đặt môi trường lập trình Code::Blocks và tạo chương trình đầu tiên

## 1. Cài đặt Code::Blocks

Để lập trình ngôn ngữ C++, chúng ta sẽ cần có một chương trình soạn thảo và chương trình biên dịch ngôn ngữ. Phần mềm Code::Blocks vừa tích hợp việc soạn thảo ngôn ngữ C++ và trình biên dịch, đồng thời có giao diện khá đẹp nên được rất nhiều học sinh - sinh viên lựa chọn sử dụng. Trong giáo án này, các bạn sẽ được hướng dẫn các thao tác lập trình C++ bằng Code::Blocks.

Đầu tiên, truy cập vào địa chỉ sau: https://www.codeblocks.org/ - là trang chủ của phần mềm Code::Blocks. Giao diện của trang web sẽ hiện lên như hình bên dưới. Bấm vào mục **Dowloads** ở góc bên trái màn hình.

<img src="https://cdn.ucode.vn/uploads/2247/images/XqrUrXdT.png">

Chọn vào mục **Dowload the binary release**:

<img src="https://cdn.ucode.vn/uploads/2247/images/cWxAedXm.png">

Lựa chọn phiên bản phù hợp cho hệ điều hành máy tính của bạn. Trong giáo trình này sử dụng hệ điều hành Windows, đối với các hệ điều hành khác các bạn làm hoàn toàn tương tự:

<img src="https://cdn.ucode.vn/uploads/2247/images/LqJRYcKk.png">

Danh sách các bản cài đặt sẽ hiện ra sau khi bạn lựa chọn hệ điều hành. Hãy tải về file cài đặt có tích hợp trình biên dịch mingw của C++. Nếu hệ điều hành máy tính của bạn là 64 bit, lựa chọn đường link phía trên; nếu là 32 bit thì lựa chọn đường link phía dưới. Bạn có thể sử dụng một trong hai nguồn tải là **FossHub** hoặc **Sourceforge.net** đều được. Nhấn vào link, chờ khoảng 5s là các bạn có thể tải về file cài đặt.

<img src="https://cdn.ucode.vn/uploads/2247/images/KOwAfVXt.png">

Sau khi tải về, các bạn khởi chạy file cài đặt Code::Blocks.

<img src="https://cdn.ucode.vn/uploads/2247/images/hjhQDRxc.png">

Bấm **Next** để tiếp tục.

<img src="https://cdn.ucode.vn/uploads/2247/images/qQxcqKUo.png">

Bước này bấm vào **I Agree** để chấp nhận điều khoản cài đặt và tiếp tục.

<img src="https://cdn.ucode.vn/uploads/2247/images/fRaAoKCu.png">

Bước này cần lựa chọn các option cài đặt. Các bạn cứ để mặc định rồi bấm vào **Next**.

<img src="https://cdn.ucode.vn/uploads/2247/images/WHVeZrCh.png">

Bây giờ các bạn hãy lựa chọn thư mục mà bạn muốn cài đặt Code::Blocks vào:
- Thư mục $(1)$ là vị trí cài đặt mặc định tại ổ C: `C:\Program Files\CodeBlocks`.
- Phần $(2)$: Các bạn bấm vào *Browse** để thay đổi thư mục cài đặt.
- Cuối cùng bấm vào **Install** $(3)$ để bắt đầu cài đặt.

<img src="https://cdn.ucode.vn/uploads/2247/images/bcmLkhQC.png">

Quá trình cài đặt mất khoảng vài phút. Sau khi cài đặt xong, các bạn bấm vào **Finish** để kết thúc cài đặt.

<img src="https://cdn.ucode.vn/uploads/2247/images/FknEGkgz.png">

## 2. Tạo project và chương trình C++ đầu tiên

Sau khi cài đặt xong Code::Blocks, các bạn khởi chạy chương trình và sẽ thấy giao diện như hình bên dưới. Khi chạy Code::Blocks lần đầu, phần mềm sẽ hỏi các bạn có muốn đặt luôn nó làm phần mềm mặc định cho các file C++ hay không. Mình khuyên các bạn nên chọn **No** (dòng đầu tiên), vì biết đâu sau này chúng ta sẽ chuyển sang dùng một phần mềm soạn thảo C++ khác.

<img src="https://cdn.ucode.vn/uploads/2247/images/hGBzUNvZ.png" >

Kế đến, các bạn chọn **File** $\rightarrow$ **New** $\rightarrow$ **Project** để tạo một dự án trong CodeBlocks.

<img src="https://cdn.ucode.vn/uploads/2247/images/ssPhIpxn.png">

Một khung như hình bên dưới sẽ hiện ra. Các bạn cần lựa chọn loại dự án của mình. Trong Code::Blocks hỗ trợ lập trình rất nhiều dự án khác nhau. Đối với lập trình thi đấu, các bạn hãy lựa chọn **Console Application**.

<img src="https://cdn.ucode.vn/uploads/2247/images/eLRgysyh.png">

Lựa chọn ngôn ngữ là C++ rồi nhấn **Next**.

<img src="https://cdn.ucode.vn/uploads/2247/images/FGSQByuo.png">

Điền tên của dự án vào mục **Project title**. Sau đó chọn nơi lưu trữ dự án bằng cách nhấn vào dấu `...` ở bên cạnh phần **Folder to create project in**. Các bạn nên chọn một folder cố định làm nơi lưu trữ các dự án C++ của mình, sau đó sẽ tạo các dự án mới hoặc buổi học mới trong một folder cố định đó thôi, để tránh dữ liệu bị lưu trữ lộn xộn. Tiếp tục nhấn **Next**.

<img src="https://cdn.ucode.vn/uploads/2247/images/mQCjRwdp.png">

Nhấn vào finish để tiến hành tạo dự án.

<img src="https://cdn.ucode.vn/uploads/2247/images/EzGQsYBO.png">

Giao diện chương trình sẽ hiện ra như hình bên dưới. Ở đây do mình để chế độ màn hình màu đen nên mới có giao diện đen. Còn ban đầu khi cài đặt thì mặc định Code::Blocks sẽ có giao diện nền trắng. Các bạn quan sát ở thanh công cụ bên trái:
- Phần **C++_First_Program** chính là tên dự án mà mình vừa tạo ra. 
- Mục **Sources** bên trong chứa các file chương trình của dự án. Mặc định sẽ có một file` main.cpp`, các bạn bấm vào file này sẽ hiện ra một chương trình như bên dưới. 

<img src="https://cdn.ucode.vn/uploads/2247/images/WkHjYHmW.png">

Để chạy chương trình, trước tiên các bạn nhấn tổ hợp phím **Ctrl - F9** để biên dịch chương trình, sau đó nhấn tổ hợp phím **Ctrl - F10** để chạy chương trình. Hoặc các bạn có thể chỉ nhấn phím **F9** để vừa biên dịch và chạy chương trình đồng thời. Giao diện phần chạy chương trình sẽ hiện lên như sau:

<img src="https://cdn.ucode.vn/uploads/2247/images/BLUxluaz.png">

Các bạn cũng có thể loại bỏ file `main.cpp` này ra khỏi project và tạo ra những file chương trình mới của mình để làm những bài mới chẳng hạn. Để làm điều đó, các bạn nhấn chuột phải vào tên file chương trình hiện tại, chọn **Remove file from project**. 

<img src="https://cdn.ucode.vn/uploads/2247/images/FAEcfgkm.png">

Sau đó nhấn tổ hợp phím **Ctrl - Shift - N** để tạo ra một file chương trình mới. Chọn **Yes** để thêm file này vào project và nhớ lưu tên file với phần mở rộng là `.cpp` nhé!

<img src="https://cdn.ucode.vn/uploads/2247/images/WjVUdlTr.png">

## 3. Vài lưu ý nhỏ khi lập trình C++ với Code::Blocks

Để lập trình hiệu quả, khoa học với Code::Blocks, đặc biệt là với các bạn mới học, mình có một số lời khuyên đúc kết từ kinh nghiệm cá nhân như sau:
- Đừng ngại tạo ra các project mới khi làm việc. Chẳng hạn, với những bạn mới học, thì mỗi buổi học các bạn nên tạo ra một project mới, và lưu các file bài tập mình làm trong buổi học đó ở project tạo ra. Làm như vậy sẽ giúp các bạn kiểm soát tốt bài tập của mỗi buổi và không cần tìm kiếm mất thời gian mỗi khi cần xem lại.
- Đừng để nhiều file chương trình trong thư mục **Sources**. Đôi khi điều này sẽ gây ra những lỗi biên dịch không đáng có.
- Các bạn có thể chỉnh sửa giao diện của Code::Blocks theo ý mình. Hãy chọn mục **Settings** $\rightarrow$ **Editor** và điều chỉnh giao diện theo ý mình. Có rất nhiều thứ có thể điều chỉnh như: Font chữ, cỡ chữ, điều chỉnh màu chữ và màu cho các từ khóa của hệ thống,..Nhưng hãy để cỡ chữ khoảng $14$ để dễ nhìn code, từ đó dễ dàng chỉnh sửa các lỗi sai của mình.

# IV. Cấu trúc chương trình C++

## 1. Cấu trúc tổng thể của một chương trình

Một chương trình được viết bằng ngôn ngữ lập trình bậc cao, nhìn chung sẽ gồm hai phần: ***phần khai báo*** và ***phần thân***:
- ***Phần khai báo:*** Hình dung chúng ta chuyển nhà tới một địa điểm mới, và sau đó cần khai báo các thông tin cá nhân cho công an địa phương. Tương tự như vậy, trước khi đi vào lập trình một chương trình, ta cần khai báo những thứ mà mình sẽ sử dụng trong chương trình đó, bao gồm: Tên chương trình, thư viện, các hằng, biến và chương trình con. Đối với ngôn ngữ C/C++, có một cải tiến rất thuận lợi đó là người dùng được quyền khai báo ở bất kỳ đâu trong chương trình, miễn là khai báo trước khi sử dụng một thứ gì đó.
- ***Phần thân:*** Bao gồm các dãy lệnh được đặt trong một cặp kí hiệu mở đầu và kết thúc. Các câu lệnh phải được phân tách với nhau bằng dấu `;`. Đối với C/C++, các lệnh được đặt trong cặp dấu ngoặc nhọn `{}`.

## 2. Các thành phần của một chương trình C++

### 2.1. Phần khai báo

#### **Khai báo thư viện**

***Định nghĩa thư viện:*** Một ngôn ngữ lập trình thường có sẵn một số thư viện cung cấp các chương trình đã được xây dựng sẵn. Để sử dụng chúng, cần khai báo thư viện chứa các chương trình đó. 
***Cú pháp khai báo:*** 

```cpp
#include <{Tên_thư_viện}>
```

***Ví dụ:*** 

```cpp
#include <iostream>
```

Trong C++ có rất nhiều thư viện khác nhau, mỗi thư viện có tác dụng riêng. Tuy nhiên, đối với lập trình thi đấu chúng ta chỉ sử dụng một số thư viện. Một cách nhanh để khai báo tất cả các thư viện trong C++, đó là cú pháp `#include <bits/stdc++.h>`.

#### **Từ khóa `define` và `typedef`**

##### **Từ khóa `define`**

***Tác dụng:*** Sử dụng để định nghĩa một tên mới cho một kiểu dữ liệu, một câu lệnh, một hàm hoặc đơn giản là một giá trị nào đó, với mục đích giúp viết chương trình ngắn gọn, đẩy nhanh quá trình làm việc. Thông thường những khai báo bằng `define` sẽ được viết ngay sau khi khai báo thư viện. Kể từ sau khi khai báo, các tên mới có thể được sử dụng thay cho tên cũ, đồng thời tên cũ vẫn không bị mất đi.
***Cú pháp:*** 

```cpp
#define {Tên_mới} {Tên_cũ}
```

***Ví dụ:*** 

```cpp
#define infinity 1e9
```

Câu lệnh này định nghĩa cho tên $\text{infinity}$ mang giá trị là $10^9,$ và từ sau khai báo này, tên $\text{infinity}$ có thể sử dụng thay cho số $10^9$.

##### **Từ khóa `typedef`**

- ***Tác dụng:*** Khác với `define`, từ khóa `typedef` có phạm vi sử dụng hẹp hơn. Nó chỉ được dùng để định nghĩa lại một tên mới cho những ***kiểu có sẵn*** hoặc những kiểu đã được người dùng định nghĩa. Chúng ta không thể sử dụng `typedef` để tạo ra một tên mới cho những giá trị tùy ý, mà phải là những từ khóa của C++.

- ***Cú pháp:*** 

```cpp
typedef {Tên_kiểu_có_sẵn} {Tên_mới};
```

- ***Ví dụ:*** 

```cpp
typedef long long LL;
```

#### **Khai báo không gian tên (`namespace`)**

***Định nghĩa `namespace`:*** Về bản chất, `namespace` định nghĩa một phạm vi sử dụng hàm. Giả sử trong khi lập trình, người dùng gọi ra một hàm $F$ nào đó, nhưng có tới $2$ thư viện có chung hàm tên là $F$ (tất nhiên với chức năng khác nhau). Vậy làm sau để chương trình biết rằng người dùng cần sử dụng hàm $F$ nào? Khái niệm `namespace` ra đời để phục vụ cho mục đích phân biệt ngữ cảnh sử dụng một hàm, một cái tên nào đó. C/C++ cung cấp một `namespace` tiêu chuẩn (`std`) đã được xây dựng sẵn để giúp người dùng sử dụng các hàm và lệnh trong thư viện chuẩn của C++. 

***Cú pháp khai báo:*** 

```cpp
using namespace {Tên_namespace}
```

***Ví dụ:*** 

``` cpp
using namespace std; 
```

### 2.2. Phần thân

Bao gồm các hàm của chương trình, trong đó bắt buộc có duy nhất một hàm `main()`, hay còn gọi là ***hàm thực thi***. Trong quá trình biên dịch, chương trình dịch sẽ đi vào dịch các câu lệnh trong hàm `main()` đầu tiên, vì vậy mọi hàm con của chương trình đều phải được gọi ra trong hàm `main()` nếu như muốn được thực thi.

Các ***câu lệnh*** trong phần thân chương trình luôn luôn kết thúc bằng dấu `;`.

Trong các hàm sẽ bao gồm các ***lệnh đơn*** hoặc các ***khối lệnh***. Một ***khối lệnh*** là một cụm gồm các lệnh liên quan tới nhau, được đặt trong một cặp ngoặc `{}`. Thuật ngữ ***câu lệnh*** được sử dụng để chỉ chung cho câu lệnh đơn và khối lệnh.

Đôi khi chúng ta cần chú thích cho một đoạn chương trình nào đó để diễn giải cho người đọc, khi đó ta sử dụng ***comment***. Có hai dạng comment: Dạng khối - được đặt trong cặp dấu `/*` và `*/`, và dạng dòng đơn - bắt đầu bằng cặp dấu `//`. Khi biên dịch, những gì viết trong comment sẽ được trình biên dịch bỏ qua.

## 3. Chương trình C++ đầu tiên

Chương trình dưới đây là một chương trình C++ in ra dòng thông báo `Hello World` trên màn hình chương trình. Bạn đọc chưa cần hiểu ý nghĩa thực sự của các câu lệnh, chỉ cần đọc để biết cấu trúc một chương trình C++ trông sẽ như thế nào!

```cpp
/*
    Đây là comment dạng khối.
    Những gì viết trong này sẽ được bỏ qua khi biên dịch.
*/
// Đây là comment dòng đơn.

#include <iostream> // Khai báo thư viện, iostream là thư viện nhập xuất.
#define program_name "example" // Khai báo định nghĩa cho tên program_name

using namespace std; // Khai báo không gian tên.

int main() // Hàm thực thi.
{  
    cout << "Hello World!"; // Một lệnh đơn.

    return 0; // Trả ra giá trị cho hàm, sẽ học ở một bài khác.  
} 
```

Biên dịch và chạy chương trình trên sẽ cho ra kết quả như sau:

```markdown
Hello World!
```

# V. Tài liệu tham khảo

- https://download.vn/huong-dan-cai-dat-va-su-dung-code-blocks-cho-nguoi-moi-bat-dau-13118
- Sách Giáo khoa Tin học $11$.