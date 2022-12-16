# 1. Lời mở đầu
Vốn xuất thân là dân ngoại đạo nhưng có đam mê với IT. Mình đã mày mò học lập trình trong một thời gian khá dài để có thể trở thành một lập trình viên Android. Nay rảnh lôi sách vở ra học lại và nhân tiện chia sẻ đến cho những bạn đang có ước mơ trở thành một Software Engineer và đặc biệt là những bạn đã lỡ một lần đò học nhầm ngành như mình :D. 

Mình chủ yếu sử dụng ngôn ngữ Kotlin trong công việc nên series này mình viết dựa trên Kotlin, từ cấu trúc dữ liệu, giải thuật hay các ví dụ làm app Android mình sẽ đều sử dụng Kotlin. OK, bắt đầu bước đầu tiên với Kotlin là cài tool :D
# 2. Cài đặt tool lập trình Kotlin
Chào mừng bạn đến với series "Trở thành lập trình viên với ngôn ngữ Kotlin"! Trong bài đầu tiên này, bạn sẽ cần thiết lập một môi trường để cho phép bạn lập trình bằng ngôn ngữ Kotlin và làm việc với các đoạn code example trong mỗi bài viết của series này. Để thiết lập môi trường lập trình Kotlin bạn cần download 2 thứ:

1/ JDK (Java Development Kit): [download](https://www.oracle.com/java/technologies/javase-downloads.html)

2/ IntelliJ IDEA IDE: [download](https://www.jetbrains.com/idea/download/#section=windows)

Về phần cài đặt JDK và IntelliJ IDEA IDE kèm với khởi tạo project Kotlin đầu tay, vì bài viết này khá dài nên mình xin giới hạn, không hướng dẫn cụ thể, các bạn có thể dễ dàng tìm kiếm cách cài đặt và khởi tạo project đầu tiên. Có thể tham khảo ở các link sau: 

[Hướng dẫn cài đặt JDK và IntelliJ IDEA IDE](https://www.youtube.com/watch?v=TK86xfy_T-M)

[Hướng dẫn khởi tạo project đầu tiên trong IntelliJ IDEA IDE](https://kotlinlang.org/docs/tutorials/jvm-get-started.html)

# 3. Hello Kotlin!
Hy vọng, bạn đã cài đặt được IntelliJ IDEA, bây giờ chúng ta sẽ cùng nhau code những dòng code đầu tiên bằng Kotlin. Đầu tiên là tạo file để code. 

![](https://images.viblo.asia/b528b70a-f68c-469c-ac3b-47b3d9ea0fc5.png)

Đặt tên file đó là app. Chọn Kind là File. Sau khi click OK, bạn đã có 1 file `app.kt`, các file code của Kotlin có đuôi là `.kt`

![](https://images.viblo.asia/834d3cf1-fbfa-4b41-9879-f59a8ae411e2.PNG)

Cái vùng Editor trong ảnh là vùng dùng để viết code. 

![](https://images.viblo.asia/5dc9cc06-ed66-4a27-9c9a-8c2f5c1fb3d9.PNG)

Bây giờ thử gõ từ `main` rồi gõ phím `Tab`. Tool sẽ tự sinh ra code như này.

![](https://images.viblo.asia/4acf6a44-6825-4011-9a97-74863431d0ef.png)

Từ khóa `fun` là viết tắt của function (tức là hàm, như kiểu hàm số ấy :D). Hàm là gì, mình sẽ giới thiệu ở bài tiếp theo. Sau từ khóa `fun` là từ `main`, đây chính là tên của hàm. Hàm `main` này là nơi mà khi run project thì tool nó sẽ chạy các dòng code được viết trong hàm main, cụ thể là bên trong 2 dấu ngoặc `{ }`. Bây giờ ta thử viết dòng code đầu tiên là `println("Hello World!")` bên trong hàm main này và chạy thử nhé.

![](https://images.viblo.asia/b32def4a-bb58-43f5-8675-50efdc91f7cc.png)

Cách run chương trình.

![](https://images.viblo.asia/e31ca372-e914-4ec4-b5b2-091709e10d5d.png)

Cách xem kết quả của dòng code trên. Nhìn xuống khu vực dưới của tool IntelliJ, bạn sẽ thấy dòng chữ `Hello World!` được in ra. Đây chính là kết quả của dòng code trên. Còn dòng `"Process finished with exit code 0"` có nghĩa là chương trình đã chạy xong. Một khi dòng `"Process finished with exit code 0"` chưa được in ra tức là chương trình vẫn chưa chạy xong. Như vậy bạn đã hiểu được cách tạo ra những dòng code và cách run chương trình và xem kết quả. Congratulations! 

![](https://images.viblo.asia/a88955c8-9b5f-4174-b4b5-7c8bbaffa70c.png)

Trước khi nhảy vào viết code Kotlin và tạo ra những phần mềm awesome thì bạn cần phải hiểu cách hoạt động của máy tính. Cũng như cách máy tính hiểu cái đống code mà bạn viết để tạo ra một phần mềm awesome.
# 4. Máy tính hoạt động như thế nào
Một máy tính dù có hiện đại hay là thứ đồ cổ, dù cồng kềnh hay nhỏ gọn như chiếc smart watch bạn đang đeo thì nó cũng hoạt động theo *4 bước* sau: 

*Bước 1*: **INPUT**: nhận dữ liệu đầu vào. Ví dụ như khi mình đang gõ bài viết này từ bàn phím, thì máy tính nó đang nhận dữ liệu mình đưa vào hoặc khi bạn touch vào màn hình cảm ứng thì bạn cũng đang truyền dữ liệu đầu vào cho máy tính,... hoặc gần gũi hơn theo trend hiện nay là khi bạn dùng ứng dụng FaceApp để open ảnh chuẩn man của bạn vào ứng dụng FaceApp, rồi click vào chỗ hãy biến ta thành con gái.

![](https://images.viblo.asia/49084124-2604-4c00-a1c3-2bc2a9d0508d.jpg)

*Bước 2*: **STORAGE**: lưu trữ dữ liệu đầu vào mà bạn vừa truyền vào cho nó ở bước 1. Như ví dụ FaceApp thì tấm ảnh chuẩn man của bạn chính là input và máy tính nó sẽ lưu lại các thông tin của tấm ảnh.

*Bước 3*: **PROCESSING**: xử lý dữ liệu đầu vào đó. Ví dụ máy in nó sẽ xử lý cái đống text này ra 1 trang A4. Như ví dụ trên thì FaceApp sẽ xử lý ảnh đó để có thể biến bạn thành con gái.

*Bước 4*: **OUTPUT**: trả về kết quả cho bạn. Ví dụ: máy in sẽ trả bạn bản A4 có đầy đủ text trên đó hay màn hình hiển thị cái text mà bạn vừa gõ. Đó đều là output. Như ví dụ trên thì tấm ảnh chuẩn gái mà FaceApp show ra trước mắt bạn chính là output.

![](https://images.viblo.asia/c369c774-f1b6-484c-adfc-54904a1d7fb7.png)

Tóm lại, cách nó hoạt động chỉ đơn giản là đầu tiên máy tính sẽ nhận dữ liệu INPUT từ bạn, sau đó STORAGE dữ liệu đó, tiếp theo sẽ PROCESSING dữ liệu đó để cho ra OUTPUT.

![](https://images.viblo.asia/2b5d1a1a-f2cf-4fbb-b08b-6fb0e04374c0.gif)

Oh như vậy, nếu mình muốn tính phép tính 3 + 7. Chỉ cần nhập vào máy tính 3 + 7 rồi bảo: "Ê máy tính tính giúp tui cái phép tình này". Máy tính sẽ trả lời là: "Sorry, I don't understand". Vì sao vậy?. Vì nó có phải là một con người như mình đâu mà hiểu ngôn ngữ của mình, mình nhìn thì thấy đây là số 1 cộng với số 1 nhưng máy tính nó có biết số 1, cái dấu cộng kia là cái quái gì đâu. Nó chỉ có điện điện và điện (electricity) với mạch mạch và mạch (circuit) chứ có phải như con người đâu mà đòi nó hiểu ngôn ngữ của con người :v. 

Vậy sao nó có thể lưu trữ, tính toán và trả kết quả như đã nói ở 4 bước trên?

# 5. Cách máy tính lưu trữ, xử lý thông tin, hệ nhị phân (binary)
Máy tính nó sử dụng điện để lưu trữ thông tin, trong một cái mạch nếu ở đâu có dòng điện đi qua, nó sẽ đại diện là ON mà người ta quy ước nó là `số 1`. Ngược lại, nơi không có dòng điện đi qua, nó sẽ hiểu là OFF, người ta quy ước nó là `số 0`. Tóm lại máy tính chỉ hiểu bật hay tắt dòng điện trong mạch (circuit) (bật là 1 và tắt là 0). Như chúng ta đã học đếm từ lớp 1, có 10 chữ số từ 0 -> 9 nên người ta gọi nó là hệ thập phân. Vậy hệ chỉ có 2 chữ số 0 và 1 thì người ta gọi là **hệ nhị phân (binary)** thôi.

![](https://images.viblo.asia/1eea3211-8ddb-40e7-bf40-09af7edcc22d.PNG)

![](https://images.viblo.asia/33b72749-65c5-4f39-a87b-902a2efb4b6b.PNG)

![](https://images.viblo.asia/8cb3cbc0-b4ac-4e92-a6f8-0d1026c27e29.png)

Con người chúng ta có thể hiểu các chữ số từ 0 -> 9 hay hệ thập phân (decimal), nhờ 10 chữ số này mà ta có thể biểu diễn mọi số trên đời. Ví dụ số 900 có 1 chữ số 9 ở hàng 100, 1 chữ số 0 ở hàng 10 và 1 số 0 ở hàng 1 nên `900 = 9 * 100 + 0 * 10 + 0 * 1`

![](https://images.viblo.asia/3cc2fe87-65a6-47a3-bad7-2d784bc3ccef.png)

Nếu để ý sẽ thấy **hàng trước sẽ bằng hàng liền sau nó nhân thêm 10**. Hàng 1000, hàng 100, hàng 10, hàng 1. Đó là hệ thập phân đó :)

Còn máy tính chỉ hiểu 2 chữ số 0 với 1 hay hệ nhị phân (binary), vậy nếu mình muốn đưa dữ liệu là số 10 vào thì sao nó hiểu. Nó biểu diễn được chứ: số 10 của con người, máy tính sẽ hiểu là 1010. Nếu hệ 10 có quy tắc hàng trước sẽ bằng hàng liền sau nó nhân thêm 10 thì **hệ 2 cũng có quy tắc hàng trước sẽ bằng hàng liền sau nó nhân thêm 2**. Hệ 10 có hàng 100, hàng 100, hàng 10, hàng 1 thì tương tự **hệ 2 sẽ có hàng 8, hàng 4, hàng 2, hàng 1**. Nếu hệ 10 biểu diễn số `10 = 1 * 10 + 0 * 1` thì hệ 2 biểu diễn `10 (hệ 10) = 1 * 8 + 0 * 4 + 1 * 2 + 0 * 1`. Vậy ta biểu diễn số 10 (hệ 10) sang hệ 2 sẽ là 1010 :)

![](https://images.viblo.asia/1085294e-7a8e-45a9-a8c6-b8c8fb9c6e41.PNG)

![](https://images.viblo.asia/c44350c6-4a62-467d-b3c2-e0799cb96c3f.PNG)

Còn số 900 (hệ 10) ta sẽ hiểu là `11 1000 0100 (1 * 512 + 1 * 256 + 1 * 128 + 0 * 64 + 0 * 32 + 0 * 16 + 0 * 8 + 1 * 4 + 0 * 2 + 0 * 1)`. Vậy bạn đã tin rằng **tất cả các số trên đời, máy tính đều có thể hiểu chỉ với 0 và 1 chưa** :D
# 6. Bit - Đơn vị biểu diễn thông tin
Như vậy, chúng ta đã biết máy tính lưu trữ thông tin qua 1 dãy số toàn 0 và 1. Mà lưu trữ thì phải đo lường được, phải có đơn vị chứ đúng ko :). 
> Mỗi con số 0 hoặc 1 mà máy tính lưu được gọi là 1 đơn vị thông tin hay **1 bit** (bit là viết tắt của binary degit). 

Như số 10 = 1010 có 4 chữ số là 1, 0, 1, 0, vậy là máy tính mất 4 bit để lưu trữ số 10, tương tự sẽ mất 10 bit để lưu số 900. Đơn vị lớn hơn bit, đơn vị lớn hơn bit là **byte**, 1 byte = 8 bit. Ngoài ra ta còn có: **KB (kilobyte)**, 1 KB = 1024 byte, **MB (megabyte)**, 1 MB = 1024 KB, **GB** (gigabyte, cái mà chúng ta hay hỏi: "máy tính mi RAM mấy ghi, ổ cứng mấy ghi =))") và 1 GB = 1024 MB.

Khoan đã, máy tính chỉ hiểu số, vậy còn text và dấu cộng trong ví dụ 3 + 7, hoặc như Ví dụ FaceApp trên là ảnh thì làm sao máy tính nó hiểu?
# 7. Tất cả dữ liệu đều trở thành số
Để chuyển đổi text sang số, ta chỉ cần quy ước mỗi chữ cái, mỗi ký tự đặc biệt nào đó là một con số riêng biệt. Ví dụ chữ **A** ta quy ước cho nó là **số 65 (hệ 10)** thì nó chính là **100 0001 (hệ 2**). Vậy máy tính đã có thể hiểu được chữ A (easy). Tương tự các chữ khác cũng thế, ta có nguyên một bảng mã quy đổi như thế này gọi là **ASCII** (đọc là át-xơ-ki) ([tham khảo bảng mã ASCII](https://vi.wikipedia.org/wiki/ASCII)). Bảng mã ASCII chỉ sử dụng **8 bit** để mã hóa text thành số, vì chỉ có 8 bit nên nó chỉ có thể biểu diễn 1 dãy 8 slot, mỗi slot là 0 hoặc 1: 0000 0000 -> 1111 1111. Theo Toán tổ hợp học hồi lớp 11 thì ta có 8 slot, mỗi slot có 2 cách chọn (là 0 hoặc 1), vậy nên có 2 ^ 8 = 256 dãy số 01xxxxxx có 8 chữ số đôi một khác nhau :D. Giải thích đem Toán ra khó hiểu quá (yaoming), nhưng tóm cái quần lại là Bảng mã ASCII chỉ giúp mã hóa được 256 ký tự la tinh thành số để máy hiểu. Điều đó có nghĩa là tiếng Việt như ă, â, ê, ơ, đ,.. hoặc tiếng Nhật như 気持ち(kimochi) thì máy tính nó sẽ méo hiểu (so sad). Đừng lo, vì đã có 1 bảng mã khác tên là **Unicode sử dụng 16 bit để mã hóa text sang nhị phân**. Tức là nó có thể mã hóa được 2 ^ 16 = 65536 ký tự khác nhau và nhiêu đó dư sức để cho máy tính hiểu được tất cả ngôn ngữ trên thế giới này :D

Đối với ảnh thì sao, ảnh chính là 1 **tập hợp các pixel**. Mỗi ô vuông trong ảnh mario dưới đây đại diện cho 1 pixel. 

![](https://images.viblo.asia/7c7a5205-1ef4-4bff-b9d5-fd21d9139224.png)

Mỗi pixel sẽ có 1 màu, có pixel màu đỏ (chỗ cái mũ của mario), có pixel màu đen (chỗ cái râu), có pixel màu vàng (chỗ 2 cái vếu của mario) ,... tạo thành lưới pixel để hình thành ra tấm ảnh mario. Mỗi màu sẽ mang trong mình 3 con số đại diện cho **R (Red), G (Green), B (Blue)**. Ví dụ màu hồng pastel như ảnh dưới sẽ có Red = 255, Green = 209, Blue = 220

![](https://images.viblo.asia/d0196188-f39d-4e18-a844-30d7511e8cb3.png)

Vậy ảnh cũng có thể chuyển đổi thành số thôi nên máy tính cũng có thể hiểu. Tương tự video hay âm thanh thì nó cũng đều có thể được biểu diễn thành các con số nên máy tính cũng có thể hiểu :D. 

Tóm lại là khi ta hát, hay đàn mà để máy tính nhận dạng được giọng hát của ta và xuất bản nó ra thành file mp3 để ta mở loa ta nghe. Thì đầu tiên âm thanh ta hát hoặc đàn sẽ được chuyển đổi sang 1 dãy số 0101010101xxxx và máy tính sẽ hiểu dãy số này và lưu trữ, xử lý được chúng nhờ cả đống mạch(circuit) bên trong mỗi máy tính

![](https://images.viblo.asia/8eca4f1e-108a-452d-91c0-462199ec5249.gif)

Tóm tắt lại 4 bước: Input, Storage, Processing, Output bằng 1 tấm ảnh nhé, 1 tấm ảnh hơn triệu lời nói nảy giờ :D

![](https://images.viblo.asia/16c5ab82-a3b8-412f-8d96-e3eeef047e07.gif)

Đây cũng là chính là cách máy tính hoạt động.

# 8. Code hoạt động như thế nào
Viết mã (coding) giống như viết một công thức. Bạn cung cấp dữ liệu đầu vào và cung cấp cho máy tính một công thức từng bước (step-by-step) để máy tính xử lý chúng.
Ví dụ ra lệnh cho máy tính tính phép tính 2 + 3 sau đó lấy kết quả nhân tiếp cho 5 rồi in ra kết quả.

Bước 1: Tính 2 + 3 bằng mấy
Bước 2: Lấy kết quả của bước 1 nhân với 5
Bước 3: In kết quả hiển thị ra màn hình.

Tất nhiên **các lệnh này phải viết theo dãy số binary 01010101xxx nhé**. Vì máy tính chỉ hiểu 010101xxx mà thôi :D. Còn các lệnh mình viết trên được gọi là mã code giả (**pseudo-code**), nó không phải là ngôn ngữ lập trình nhưng nó đại diện cho thuật toán. Cái công thức 3 bước này được gọi là thuật toán (**algorithm**). Thuật toán hiểu nôm na là một công thức, 1 tập hợp các lệnh để diễn đạt cho máy tính thực thi để giải quyết một vấn đề, một bài toán nào đó.

![](https://images.viblo.asia/a7af4cff-bb79-4e88-aba0-197f4dd9b58d.gif)

Khoan đã, nếu muốn nhập chữ A vào máy tính, ta phải nhập dãy này vào sao 100 0001, quả thật là ác mộng vì dãy số vừa dài vừa khó nhớ. 
Lập trình ra cái app để chat bằng các dòng code binary thế này có khi mất cả đời :v. Vì vậy nên chúng ta mới cần đến các ngôn ngữ lập trình như Kotlin. Chúng ta có thể ra lệnh cho máy tính bằng các dòng code dễ hiểu dễ đọc như tiếng Anh - ngôn ngữ của con người mà máy tính vẫn có thể hiểu được. 

Ví dụ mình muốn máy tính in ra dòng chữ `Hello World!`. Chỉ cần gõ dòng code: `println("Hello World!")`

![](https://images.viblo.asia/ad5583ba-e696-4af9-ad5a-d5404fe39da1.png)

Hay muốn máy tính nó `vẽ hình chữ nhật` chỉ cần gõ lệnh `rect`

![](https://images.viblo.asia/1893dead-8031-4ec9-ba96-54892e85bbd8.gif)

Để làm được điều này, Kotlin phải dịch mã code bạn viết thành mã máy chính là dãy 0101xxxx để máy tính hiểu những lệnh bạn ghi trong file source code và xử lý.

![](https://images.viblo.asia/f6c872df-cab5-4916-a5f4-750680718186.png)

File màu vàng `.c` đó chính là file source code bạn viết bằng ngôn ngữ C (còn viết bằng ngôn ngữ Kotlin thì nó sẽ có đuôi `.kt`), file đó được compiler dịch sang mã máy để máy tính hiểu và thực thi. Nói chung là ngôn ngữ lập trình như là phiên dịch viên vậy, nó giúp chúng ta dịch từ ngôn ngữ của ngôn người sang ngôn ngữ máy để máy tính hiểu. Chỉ vậy thôi :D

# Kết luận
Có vẻ như bài 1 mình viết hơi dài, gần như là những kiến thức trọng tâm trong môn Kiến trúc máy tính. Những kiến thức này là hành trang rất cần thiết trên hành trình trở thành một Software Engineer. Bài tiếp theo chúng ta sẽ sử dụng tool IntelliJ IDEA, viết những dòng code Kotlin để có thể tạo ra Awesome Software!

# Tham khảo:
https://www.youtube.com/watch?v=QXjU9qTsYCc&feature=share&fbclid=IwAR2MEtbyBPupRG4_-OREZMUKAxxgqVaeffmas4Z1fhwhYoRSOIqRD4nh-Ws

https://www.khanacademy.org/computing/computer-science/computers-and-internet-code-org/how-computers--work/v/khan-academy-and-codeorg-introducing-how-computers-work

Đọc tiếp phần 2: [Bài 2: Biến, Kiểu dữ liệu và Hàm (Variables & Data types & Function)](https://viblo.asia/p/tro-thanh-lap-trinh-vien-voi-ngon-ngu-kotlin-bai-2-bien-kieu-du-lieu-va-ham-variables-data-types-function-L4x5x3kYlBM)