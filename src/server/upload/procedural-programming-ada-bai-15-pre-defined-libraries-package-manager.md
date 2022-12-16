Có một sự thật khá thú vị về `Ada` - đó là không có bất kỳ ai hay bất kỳ tổ chức nào thực sự sở hữu ngôn ngữ này. Và tổ chức `DoD` của Mỹ thì lại chỉ nhìn nhận `Ada` như một bản cấu hình tiêu chuẩn để xây dựng một ngôn ngữ lập trình hiện đại. Cũng giống như `ECMA International` chỉ nhìn nhận `ECMA` là một bản cấu hình tiêu chuẩn để triển khai môi trường cho các ngôn ngữ lập trình đa nền tảng như `JavaScript`, `Dart`, `C#`, `Eiffel`, `C++`, v.v... 

Điều đó có nghĩa là tính năng của các ngôn ngữ trên sẽ còn tùy thuộc vào môi trường phát triển đặc định mà chúng ta sử dụng, như các trình thông dịch `interpreter` hay các trình biên dịch `compiler`. Và đối với `Ada` nói riêng thì cũng có các trình biên dịch được tạo ra bởi các tổ chức khác nhau, hướng tới những môi trường ứng dụng cụ thể với các bộ tài nguyên mặc định có phần khác nhau đôi chút.

## Predefined Libraries

Ở đây. chúng ta có các thư viện theo cấu hình tiêu chuẩn tối thiểu mà các môi trường phát triển cần phải triển khai đầy đủ, bao gồm:

- [`Standard`](https://en.wikibooks.org/wiki/Ada_Programming/Libraries/Standard) - thư viện chứa định nghĩa các kiểu dữ liệu cơ bản như `Interger`, `Float`, `Boolean`, `Char`, `String`, v.v...
- [`Ada`](https://en.wikibooks.org/wiki/Ada_Programming/Libraries/Ada) - thư viện cung cấp các công cụ hỗ trợ thao tác đối với các kiểu dữ liệu cơ bản đã được định nghĩa trong thư viện `Standard`.
- [`Interfaces`](https://en.wikibooks.org/wiki/Ada_Programming/Libraries/Interfaces) - cung cấp các công cụ giao tiếp với các ngôn ngữ khác: `C`, `Cobol`, `Fortran`.
- [`System`](https://en.wikibooks.org/wiki/Ada_Programming/Libraries/System) - cung cấp các công cụ liên quan đến việc quản lý tài nguyên của hệ thống sẽ vận hành phần mềm được xây dựng: bộ nhớ đệm `RAM` hay `Cache`, bộ nhớ lưu trữ dài hạn `Storage`, vi xử lý đa nhân `Multiprocessor`.

`GNAT` mà chúng ta đang sử dụng trong Sub-Series này là trình biên dịch được thiết kế hướng đến lớp ứng dụng bao gồm cả lập trình nhúng `embedded` và lập trình phổ thông `general`. Vì vậy nên chúng ta còn có thêm một thư viện được định nghĩa cùng tên: [`GNAT`](https://en.wikibooks.org/wiki/Ada_Programming/Libraries/GNAT).

Thư viện này cung cấp một số công cụ thay thế ở cấp độ trừu tượng cao hơn so với các thư viện tiêu chuẩn để quản lý các tiến trình vận hành code `task`, hay làm việc với các kiểu dữ liệu tập hợp như `String`, `Heap Table`... và các thuật toán sắp xếp dữ liệu đã được triển khai sẵn ví dụ như `Bubble Sort`, `Heap Sort`... và cả những công cụ giao tiếp cho các ứng dụng mạng `network` như `Sockets`, `Stream`...

Nhân tiện thì chúng ta có thể tìm thấy các chi tiết triển khai ngôn ngữ `Ada` trong môi trường `GNAT` được lập tài liệu đầy đủ ở đây: [`GNAT Reference Manual`](https://docs.adacore.com/gnat_rm-docs/html/gnat_rm/gnat_rm/implementation_defined_aspects.html). Trong đó thì có phần nói về các thuộc tính [`Attributes`](https://docs.adacore.com/gnat_rm-docs/html/gnat_rm/gnat_rm/implementation_defined_attributes.html) được định nghĩa sẵn cũng rất quan trọng. Các chỉ mục còn lại như `Pragma` hay `Aspect` thì bạn có thể sẽ không cần phải quan tâm tới trừ khi chạm vào lớp ứng dụng lập trình nhúng `embedded`.

## Package Manager

Trong tiến trình xây dựng phần mềm, ngoài việc sử dụng các thư viện được định nghĩa sẵn của một ngôn ngữ lập trình thì chúng ta thường sẽ cần phải sử dụng thêm những thư viện hỗ trợ khác được thiết kế đặc định hướng tới lớp ứng dụng mong muốn. Việc tải về một thư viện code được chia sẻ đâu đó và tích hợp vào `project Ada` khá đơn giản với cấu trúc khai báo trong tệp cấu hình của `project` như chúng ta đã biết.

```learn_ada.gpr
project Learn_Ada is
   for Languages use ("Ada", "C");
   for Source_Dirs use ("src/**");
   for Object_Dir use "obj";
   for Main use ("main.adb");
   -- for Library_Name use "compiled_pkg";
   -- for Library_Kind use "Dynamic";
   -- for Library_Dir use "lib";
end Learn_Ada;
```

Trong code ví dụ ở trên thì các dòng code khai báo được `comment` ở những dòng cuối cùng là để mô phỏng cú pháp khai báo một thư viện có tên là `compiled_pkg`, kiểu thư viện đã được biên dịch được gọi là `Dynamic`, và cuối cùng là đường dẫn tới thư mục chứa thư viện đó tính từ thư mục gốc của `project` đang chứa thư mục `src`.

Đây là tính năng quản lý `project` mà trình `gprbuild` của `GNAT` cung cấp: rất trực quan và dễ sử dụng. Tuy nhiên nếu đem so sánh với các công cụ mà chúng ta đã biết qua các Series Tự Học Lập Trình trước đó thì quá trình quản lý các thư viện bổ sung như thế này khá thủ công. Đơn cử là với `npm` thì chúng ta chỉ cần gõ lệnh `install package` và các tệp code của thư viện cần cài đặt sẽ được tự động tải về kèm theo đó là thao tác khai báo trong tệp `package.json` của `project` cũng sẽ được tự động thực hiện.

![](https://images.viblo.asia/26f2dcdb-7cd2-4f8b-96a1-2aedef1355c6.PNG)

Mới đây thì một `project` có tên là [`Alire (Ada Lirary Repository)`](https://alire.ada.dev/) - tạm dịch là "Kho lưu trữ và quản lý các thư viện code Ada" - đã xuất hiện và được biết đến trong cộng đồng những lập trình viên yêu thích ngôn ngữ này. Các thư viện `library` được `Alire` gọi với một cái tên khác là [`crate`](https://alire.ada.dev/crates.html) và có số lượng tổng hợp hiện tại là khoảng hơn 300 `crate` đã được `publish` bằng `Alire`.

Bạn có thể tải về tệp cài đặt `Alire` mới nhất cho các hệ điều hành `Windows`, `Linux`, v.v... tại đây: [Alire Releases](https://github.com/alire-project/alire/releases). Đối với `Windows` thì sau khi chạy tệp cài đặt và hoàn thành, chúng ta sẽ cần phải khai báo biến môi trường mới trỏ tới thư mục `C:\Program Files\Alire\bin`. Trong trường hợp bạn thay đổi thư mục cài đặt mặc định thì cần tìm tới thư mục đó và copy đường dẫn dạng đầy đủ như vậy. Còn đối với `Linux` thì sau khi giải nén tệp tải về, chúng ta sẽ cần di chuyển tệp thực thi `alr` tới thư mục `usr/bin`.

Sau khi đã hoàn tất thao tác cài đặt và khai báo biến môi trường thì chúng ta đã có thể mở cửa sổ dòng lệnh và gõ `alr` để kiểm tra kết quả. Nếu bạn đang sử dụng `Windows` thì có thể sẽ nhận được thông báo cài đặt thêm `msys2` và cứ chọn `(Y)es` để quá trình cài đặt được tự động. Sau đó bạn sẽ thấy danh sách liệt kê các câu lệnh hỗ trợ bởi `alr`.

![image.png](https://images.viblo.asia/74076c3f-fe5d-447d-b639-0d8fd4aa5978.png)

Để khởi tạo một `crate` - có nghĩa là một `project` - được quản lý bởi `alr`, chúng ta gõ lệnh:

- `alr init --bin project_name` - để khởi tạo một ứng dụng `application`.
- `alr init --lib project_name` - để khởi tạo một thư viện `library`.

Hãy thử tạo một ứng dụng `hello_alire`:

```CMD|Terminal.io
alr init --bin hello_alire
```

Nếu như máy tính của bạn chưa cài đặt `Git` trước đó, thì `alr` sẽ hiện thông báo gợi ý cài đặt thêm trước khi thực thi câu lệnh này. Sau đó thì thư mục `hello_alire` sẽ được khởi tạo với các tệp quản lý cơ bản và thông báo thành công trong cửa sổ dòng lệnh.

![image.png](https://images.viblo.asia/3faeef44-66d9-4e09-bb65-18e21841f8e5.png)

Và chúng ta có cấu trúc căn bản của một `project` quản lý bởi `alr` bao gồm:

- `01` tệp cấu hình `project` cho `gprbuild` - bởi vì `alr` thực ra là trình quản lý `project` và điều khiển lệnh bên dịch qua `gprbuild`.
- `01` tệp khai báo quản lý cho `alr` có tên là `alire.toml`.
- `01` thư mục `src` để chứa các tệp code cho `gprbuild` như đã biết trước đó.
- `01` thư mục `share` để chứa các thư viện bên ngoài được tải thêm về bằng `alr`.

```hello_alire.folder
.
├── alire.toml
├── hello_alire.gpr
└── src
    └── hello_alire.adb
```

Bây giờ chúng ta hãy thử chỉnh sửa lại code mở đầu và chạy thử `project` bằng `alr`:

```src/hello_alire.abd
with Ada.Text_IO; use Ada.Text_IO;

procedure Hello_Alire is
   --
begin
   Put_Line ("Hello, Alire !");
end Hello_Alire;
```

```CMD|Terminal.io
cd hello_alire
alr build
```

Khi chạy lệnh `alr build` lần đầu thì chúng ta sẽ được hỏi một vài thông tin về phiên bản `GNAT` muốn sử dụng, và bạn hãy cứ chọn phiên bản `gnat_native` và `gprbuild` mới nhất trong danh sách lựa chọn được in ra.

![image.png](https://images.viblo.asia/f2f83dfb-8f70-4d6d-897e-9c404f8d1310.png)

Sau khi thiết lập xong `alr build` sẽ tiến hành điều khiển `gprbuild` biên dịch code và tạo ra thêm các thư mục:

- `config` - chứa các tệp cấu hình lưu thông tin thiết lập môi trường phát triển bao gồm hệ điều hành và phiên bản của `gnat_native` và `gprbuild`.
- `obj` - chứa các tệp code đã được biên dịch.
- `bin` - chứa tệp khởi chạy tương ứng với hệ điều hành đang sử dụng.

Lúc này chúng ta có thể chạy chương trình bằng cách trỏ trực tiếp tới tệp thực thi trong thư mục `bin` hoặc chạy lệnh `alr run`

```CMD|Terminal.io
alr run

Note: Building hello_alire/hello_alire.gpr...
gprbuild: "hello_alire.exe" up to date
Build finished successfully in 0.83 seconds.
Hello, Alire!
```

Oh, như vậy là câu lệnh `alr run` cũng sẽ tự động kích hoạt `alr build` để chắc chắn `project` đang được phiên dịch với code mà chúng ta viết mới nhất. Bây giờ chúng ta sẽ thử thao tác cài đặt một thư viện tên là `libhello` từ kho lưu trữ của `Alire`.

```CMD|Terminal.io
alr with hello

Requested changes:

   + libhello ^1.0.1 (add)

Changes to dependency solution:

   + libhello 1.0.1 (new)

Do you want to proceed?
[Y] Yes  [N] No  (default is Yes) Y
```

Lúc này sẽ có sự thay đổi nội dung ở thư mục `alire` bởi thư viện `libhello` sẽ được tải về và lưu trữ cục bộ ở đó dành cho `project hello_alire` mà chúng ta đang xem xét. Thêm vào đó là trong nội dung của tệp khai báo `alire.toml` sẽ có thêm mục `depends-on` liệt kê thư viện hỗ trợ mà `project` đang sử dụng.

```alire.toml
name = "hello_alire"
description = "Shiny new project"
version = "0.1.0-dev"

authors = ["Thinh Tran"]
maintainers = ["Thinh Tran <thinhtranhnvn@gmail.com>"]
maintainers-logins = ["thinhtranhnvn"]

executables = ["hello_alire"]
[[depends-on]]
libhello = "^1.0.1"
```

Bây giờ ở tệp khởi chạy `hello_alire.adb`, chúng ta sẽ thay thế code đang có bằng cách sử dụng thư viện `libhello`.

```src/hello_alire.adb
with Libhello;

procedure Hello is
   --
begin
   Libhello.Hello_World;
end Hello;
```

```CMD|Terminal.io
alr run

Note: Building hello_alire/hello_alire.gpr...
Compile
   [Ada]          hello_alire.adb
hello_alire.adb:4:11: warning: file name does not match unit name, should be "hello.adb" [enabled by default]
Bind
   [gprbind]      hello_alire.bexch
   [Ada]          hello_alire.ali
Link
   [link]         hello_alire.adb
Build finished successfully in 1.28 seconds.
Hello, world!
```

Ở thời điểm hiện tại, chúng ta đã có trong tay đầy đủ các công cụ phát triển phần mềm bằng ngôn ngữ `Ada`, bao gồm:

- Các yếu tố cú pháp phổ biến của ngôn ngữ `Ada`
- Các thư viện đã được định nghĩa và tích hợp sẵn với trình biên dịch `gnatmake`
- Trình quản lý gói cài đặt `Alire`

Như đã nói trước đó thì mình không có ý định hướng đến ứng dụng lập trình nhúng hay lập trình web với ngôn ngữ `Ada`, mà chỉ muốn sử dụng `Ada` để làm tiêu chuẩn tham khảo mô hình Lập Trình Thủ Tục `Procedural Programming`. Vì vậy nên có lẽ ở thời điểm này, để chọn một `project` nho nhỏ và tìm cách biểu hiện tư duy `Procedural` trong code thì một ứng dụng `CLI` sẽ là lựa chọn phù hợp nhất.

Nếu bạn có đôi chút thời gian, hãy cùng xem cách xây dựng một ứng dụng `Tic-Tac-Toe` trên giao diện cửa sổ dòng lệnh `CLI` được triển khai bằng ngôn ngữ `Ada` và mô hình lập trình `Procedural Programming` có đặc trưng gì đáng chú ý.

(chưa đăng tải) [[Procedural Programming + Ada] Bài 16 - CLI Tic-Tac-Toe Project](#)