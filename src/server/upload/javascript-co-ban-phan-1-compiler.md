JavaScript là một trong những ngôn ngữ lập trình phổ biến nhất hiện nay. Có thể bạn chưa quen với nó hoặc có thể bạn đã sử dụng nó trong nhiều năm. Nhưng bạn không thể phủ nhận rằng có rất nhiều thứ quan trọng, những thứ được sử dụng rộng rãi nhất trên toàn thế giới đều được viết bằng JavaScript (hoặc những framework của nó). Nhưng câu hỏi đặt ra là bạn đã hiểu ngôn ngữ lập trình mạnh mẽ, nhưng đôi khi lại khó hiểu này đến mức nào?

Bạn có bao giờ tự hỏi làm thế nào các câu lệnh lập trình đó báo cho máy tính biết nó phải làm gì?

> Các câu lệnh như a = a + 2 đơn giản cho con người khi đọc và viết, nhưng chúng lại khiến cho máy tính không thể hiểu được một cách trực tiếp

Để máy tính có thể hiểu được ngôn ngữ lập trình, sẽ cần một trình dịch (biên dịch hoặc thông dịch) để giải mã những đoạn code của bạn thành các đoạn mà máy tính có thể hiểu được.

Đối với một số ngôn ngữ lập trình, việc dịch các dòng lệnh thường được thực hiện lần lượt, từ trên xuống dưới, từng dòng một mỗi khi chương trình được chạy. Đó được gọi là trình **thông dịch**.

Đối với một số ngôn ngữ khác, một bản dịch phải được tạo sẵn trước khi chạy, được gọi là **biên dịch**, vì vậy khi chương trình chạy sau đó, những gì đang chạy thực sự là các đoạn mã máy tính đã được biên dịch và sẵn sàng hoạt động.

Người ta thường khẳng định rằng JavaScript được thông dịch vì code JavaScript của bạn được thực thi ngay lập tức mỗi khi nó chạy. Nhưng điều đó không hoàn toàn chính xác.  JavaScript engine thực sự đã biên dịch chương trình một cách cực kì nhanh và sau đó ngay lập tức chạy code đã biên dịch.

Trong bài viết này, chúng ta sẽ tìm hiểu về một số khái niệm cần thiết sẽ giúp bạn hiểu những gì thực sự xảy ra ở tầng bên dưới. Đến cuối bài viết, bạn sẽ hiểu rõ ràng về những gì thực sự xảy ra khi bạn viết JavaScript.

Một số khái niệm chúng ta sẽ tìm hiểu trong bài viết này:

1. **Syntax Parsers**
2. **Lexical Environments**
1. **Execution Contexts**

# Syntax Parsers

> Một chương trình đọc code của bạn và xác định nó sẽ thực hiện việc gì và liệu cú pháp của đoạn code có hợp lệ hay không

Khi bạn viết code JavaScript, không tự nhiên mà nó tự chỉ cho máy tính biết phải làm gì. Chỉ là bạn bị cách ly khỏi tất cả những việc đó. Việc của bạn là viết code, nhưng đã có người khác đã build các chương trình chuyển đổi mã JavaScript của bạn thành thứ mà máy tính có thể hiểu được.

Các chương trình đó được gọi là **complier** (trình biên dịch), tuy nhiên cũng có đôi khi chúng cũng liên quan đến thông dịch.

Trình thông dịch và trình biên dịch thực hiện việc đọc **từng ký tự một** trong code của bạn và xác định xem cú pháp có hợp lệ hay không! Sau đó, nó thực hiện các cú pháp đó theo mã mà máy tính có thể hiểu được.

Đó là tất cả về Syntax Parsers:
>Khi bạn viết code, sẽ có một chương trình sẽ chuyển những gì bạn viết thành thứ máy tính có thể hiểu được.

### Đại loại nó sẽ như thế này:

![](https://images.viblo.asia/cc120821-d04d-44be-a28a-34f02957fe67.png)

Giả sử bạn viết một hàm với một biến bên trong nó. Hàm và biến này sẽ được lưu trữ vào trong bộ nhớ máy tính. Nó cũng sẽ được dịch từ những gì bạn đã viết - thứ mà con người dễ đọc - thành những gì máy tính có thể hiểu được.

Có một trình biên dịch hoặc thông dịch nằm giữa thứ mà bạn viết và thứ mà máy tính có thể hiểu được. Đó được gọi là Syntax Parsers.

Nó sẽ đi qua lần lượt các ký tự trong đoạn code của bạn, **từng kí tự một** kiểu **f /u/ n/ c/ t/ i/ o/ n**. Và nó sẽ nhận ra đây là một function. Vì thế sau đó nên có một dấu cách, rồi những kí tự giữa dấu cách đó và dấu ngoặc tròn () sẽ là tên của function.

Trong ví dụ trên, **Greet** là thứ máy tính đọc được giữa dấu cách và dấu ngoặc nhọn, cho nên nó sẽ hiểu đó là tên của function.

Tất cả điều này đều được dịch bởi một hệ thống mà một người nào đó đã viết ra. Trong quá trình dịch, các lập trình viên viết lên nó có thể còn thực hiện một số thứ khác nữa. Hãy nhớ rằng, code JavaScript của bạn không phải là thứ được đưa trực tiếp vào máy tính! Nó được đã được biên dịch trên đường đi.

# Lexical Environments
> Từ Lexical ở đây mang nghĩa liên quan đến từ hoặc cú pháp (hiểu nôm na là Lexical là `câu từ, từ vựng`, trong bối cảnh này, nó liên quan đến `tên biến`).

Lexical Environments tồn tại trong một ngôn ngữ lập trình mà trong đó, việc bạn viết code ở đâu là ảnh hưởng đến kết quả, nói cách khác, vị trí đoạn code là quan trọng. Điều này nghĩa là thế nào?

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code

Theo định nghĩa của ES, Lexical Environment là một định dạng đặc biệt dùng để định nghĩa liên hệ giữa định danh (tên biến, tên function) với giá trị tương ứng của nó, dựa trên cấu trúc nesting của ES.

Để nói về Lexical Environments, nó thực sự khó hiểu, chúng ta sẽ tìm hiểu về nó trong bài viết ở những phần sau. **Hiện tại, khi nói về Lexical Environments của một cái gì đấy trong code - Chúng ta nói về một object đặc biệt, dùng để liên kết định danh của biến và giá trị của nó.**

Dưới đây chúng ta có **function Greet()** với một biến **msg** bên trong nó. Biến này được đặt bên trong function, và liên quan đến lưu trữ giá trị.

![](https://images.viblo.asia/b5b80295-ef9f-48e6-8eeb-c5b6217d4389.png)

Trong các ngôn ngữ lập trình mà Lexical Environments là quan trọng, khi bạn nhìn thấy một cái gì đó được viết trong code, bạn sẽ tưởng tượng được ra nó thực sự sẽ liên kết với nhau như thế nào trong bộ nhớ của máy tính.

Nó sẽ tương tác với các chức năng và phần tử khác của chương trình. Bởi vì trình biên dịch chuyển đổi code của bạn sang các cấu trúc khác, vị trí bạn viết một đoạn code sẽ rất quan trọng.

# Execution Contexts

> Một Wrapper giúp quản lý code đang chạy

Để giúp quản lý code đang chạy, cần có rất nhiều lexical environments. Nhưng cái hiện đang thực sự chạy được quản lý thông qua cái được gọi là **Execution Context**.

**Ngay sau khi** bạn bắt đầu chạy đoạn code của mình, bạn sẽ tạo ra một thứ gọi là **Global Execution Context**:

- Một Thread Execution: Bao gồm Parse và Excute code **từng dòng một**
- Bộ nhớ live của các biến và dữ liệu: Được gọi là Global Variable Environment

Các biến mà có thể gọi ở bất kì đâu trong code được gọi là Global Variable Environment.

Khi bạn excute một **function**, bạn sẽ tạo mới một **Execution Context** bên trong **Global Execution context**:

- Một Thread Execution: Chúng đi qua đoạn code trong function, **từng dòng một**
- Một bộ nhớ cục bộ (Variable Environment): nơi các biến được định nghĩa trong function sẽ được lưu trữ.

![](https://images.viblo.asia/bc6b8b88-06e8-4c17-b22a-a06de95168f7.png)

Execution Context bao gồm 2 giai đoạn:
- Giai đoạn Khởi tạo - Creation Phrase: các function và biến được assign vào bộ nhớ máy tính
- Giai đoạn Thực thi - Execution Phrase: các function và biến được thực thi

Trong ảnh phía trên, bạn có thể thấy, tồn tại một **Global Execution Context** lớn nằm trên cùng, bên trong nó sẽ là một Execution Context độc nhất của **function Greet** đã được khởi tạo.

Mỗi khi bạn tạo một function mới, một Execution Context độc nhất mới sẽ được khởi tạo, và nó sẽ vẫn được bọc trong Global Execution Context.

Chúng ta sẽ không đi sâu vào chi tiết của hai giai đoạn. Nó chứa những thứ ngoài sức tưởng tượng để trình bày trong bài viết này. Anyway, Execution Context chứa code bạn đã viết và nó cũng chạy code của bạn.

Nhớ rằng, Code của bạn được dịch, được xử lý bởi một đống tính năng khác - một chương trình mà một ai đó đã viết. Đó là quá trình code của bạn được thực thi.

Bây giờ để hiểu đơn giản, khi chúng ta nói về **Execution Context**, hãy nghĩ về nó như một wrapper giúp bạn quản lý code bạn đang chạy. Hãy xem nó như một nơi (scope) mà code của bạn **được thực thi** từng dòng một. JavaScript runtime duy trì một stack của Execution Context và Execution Context hiện diện ở đầu stack này là Execution Context hiện đang được thực thi.


# Tổng kết
- Đoạn code bạn viết không phải là cái được thực thi trực tiếp, JavaScript engine sẽ xử lý đoạn code và đưa ra quyết định.
- **Syntax Parser** là một chương trình giúp đọc code của bạn và xác định xem cú pháp có hợp lệ hay không.
- **Lexical Environment** là một object đặc biệt, dùng để liên kết định danh của biến và giá trị của nó
- **Execution Context** là một wrapper giúp bạn quản lý code đang chạy.

<br>

**[Phần 2: JavaScript "cơ bản" (Phần 2): Lexical Environment - Thứ cần biết để hiểu về Closures](https://viblo.asia/p/javascript-co-ban-phan-2-lexical-environment-thu-can-biet-de-hieu-ve-closures-RnB5pjyJZPG)**