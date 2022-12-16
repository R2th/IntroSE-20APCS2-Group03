Nội dung dưới đây được dịch từ blog https://www.solstice.com/fwd/blocks-and-memory-management-stack-vs-heap với mục đích phi lợi nhuận.

Với ARC, làm việc với blocks đã dễ dàng hơn, nhưng vẫn còn một số vấn đề chúng ta có thể gặp phải nếu chúng ta không hiểu cách chúng làm việc. Trong khi blocks có thể tricky setup và quản lý trong code, chúng là một trong số những công cụ mạnh mẽ nhất, đặc biết là khi làm việc với các task bất đồng bộ. Sau đây là những concpets mà chúng ta cần hiểu trước khi chúng ta đi vào sâu hơn:

**+/ Memory:**

- Stack: Đây là cách nhanh nhất để đọc và ghi các variables đối với compiler. Luôn có 1 private stack ở mỗi thread. Các threads chia sẻ thông tin thông qua heap. Khi chúng ta nhảy vào một scope mới (khai báo bằng dấu {} trong ObjC), compilẻ sẽ tạo không gian cho nó trong stack, khi scope này kết thúc (return từ một phương thức hay vào một bracket đóng), compiler giải phóng tất cả các space đã được cấp phát trong stack cho scope này bằng cách đưa con trỏ stack trỏ về vị trí trước đó ở trong scope của cha. Kết quả là, không có cách nào giữ lại các objects đã được cấp phát trong stack: các đối tượng sẽ bị giải phóng khi scope kết thúc không cần biết là bạn làm gì.

- Heap: thì khác nhau đối với mỗi ứng dụng, và nó được chia sẻ giữa tất cả các luồng. Nó là một cấu trúc đơn giản khi bạn đặt các đối tượng mà chúng sẽ không bao giờ được giải phóng cho tới khi bạn (hoặc ARC) làm việc đó một cách thủ công. Nó chậm hơn stack nhưng lại có rất nhiều ưu điểm:
. Nó có thể yêu cầu nhiều không gian nếu nó cần (nếu stack tràn bộ nhớ thì ứng dụng của bạn sẽ bị crash với một ngoại lệ stackoverflow)
. Và bạn có thể xoá bất kỳ object nào mà không ảnh hưởng gì tới các đối tượng khác (trong stack điều này là không thể, vì bạn push và pop mọi thứ theo một thứ tự xác định).

**+/ Blocks**: Vậy làm sao blocks phù hợp với bức tranh này? Well, blocks là đối tượng duy nhất trong Objective-C được cấp phát mặc định trong stack. Vì sao? Bởi vì compiler luôn thích cấp phát mọi thứ trong stack (nó nhanh hơn), nhưng nó chỉ có thể làm việc đó nếu nó biết chính xác kích thước cần cấp phát. Chỉ có các giá trị plain (như con trỏ) có thể được cấp phát trong stack. Blocks có kích thước cố định. Bạn không thể thay đổi một block sau khi tạo ra nó. Blocks là hằng số trong suốt quá trình thực thi. Chúng là một đoạn mã cần được thực thi nhanh, vì vậy chúng là những ứng cử viên hoàn hảo cho stack.
Chúng ta có thể chuyển một block và heap hay không? Để có thể chuyển nó sang scope khác, biết răngf nó sẽ không bao giờ được giải phóng trừ khi chúng ta làm điều đó thủ công? Có thể, sử dụng “copy”. Bất cứ khi nào bạn gửi một message “copy” cho một block, nó sẽ chuyển vào heap (nếu nó không có ở đó). Tuy nhiên, bạn sẽ phải chịu trách nhiệm giải phóng nó (nếu sử dụng ARC, thì nó sẽ làm việc này thay bạn, giống như nó làm với tất cả các property khác).

Bạn có thể viết [myBlockVariable copy] nếu nó là một biến địa phương, hoặc có thể trực tiếp set nó trong khai báo nếu nó là một property, giống như thế này:
@property (copy, nonatomic) void (^myBlockVariable) ();

Ghi nhớ: Nếu bạn sử dụng retain thay vì copy đối với một block, nó sẽ hoạt động nếu block đã có sẵn trong heap. Nhưng, nếu block ở trong stack (như mặc định), bạn không thể retain nó.
Block sẽ được tống cổ một khi nó “out of scope” không cần biết bạn retain nó bao nhiêu lần. Để giữ lại block vượt qua scope của chính nó thì bạn nên sử dụng copy. Sử dụng copy nhiều hơn một đối với cùng một đối tượng sẽ không copy nó nhiều lần, nó chỉ tăng retain count của đối tượng đó ở trong heap.

Rule1: Nếu bạn đang tạo một block mà sẽ được thực thi ở một class khác (phần lớn các trường hợp) bạn không cần copy nó. Đấy là trách nhiệm của receivers, không phải của bạn. Reciever cũng sẽ giải phóng nó sau khi xong việc.

Rule2: Nếu bạn đang tạo/nhận một block để thực thi trong class của bạn từ những scopes khác. Sử dụng copy và set nó bằng nil khi bạn xong việc.

**+/ Retain circle**: Cách sử dụng self trong blocks.
Có một vấn đề về bộ nhớ khác khi tham chiếu tới các properties bên trong một block. Cách duy nhất một block có thể chắc chắn các đối tượng được nó sử dụng sẽ luôn sẵn sàng đó là retain chúng. Nếu một block đang sống trong memory, các đối tượng mà block đó sử dụng trong code sẽ có sẵn, ít nhất là cho đến khi block được giải phóng.

Nếu self (class của bạn) có một property là một block, self sẽ là một con trỏ strong trỏ tới block.
Nếu đoạn mã bên trong block tham chiếu đến self theo bất kỳ cách nào (trực tiếp hay self.property hay [self someMethod]), thì block sẽ trỏ đến self:
![](https://images.viblo.asia/adeb9868-4d3d-48b2-8909-b433d9e62b10.jpg)

Vì vậy, self không bao giờ được giải phóng khi cha nó được giải phóng; bởi vì còn một con trỏ strong trỏ tới nó và block của chúng ta sẽ không bao giờ được giải phóng bởi vì nó còn một con trỏ strong trỏ tới nó từ self. Nếu block còn sống trong stack bởi vì không ai gửi một message “copy” tới nó, chúng ta sẽ không gặp vấn đề vì block sẽ tự động được giải phóng khi nó out of scope, và việc giữ lại self bởi block cũng sẽ được giải quyết. Vấn đề là bạn không biết rằng block có đang ở stack hay không. Nếu block sống trong heap, chúng ta có thể tránh tình huống này bằng cách giải phóng block (gán nó bằng nil) khi chúng ta xong việc. Vấn đề ở đây là bạn luôn muốn block của mình còn sống trong khi class còn sống. bạn không tạo một block để gọi nó duy nhất một lần, phải không?

Vậy hướng giải quyết là gì?
Luôn sử dụng một con trỏ weak tới self trong blocks:
__weak __typeof(self) weakself = self; //weakself sẽ không bao giờ giữ lại bất kỳ đối tượng nào.

Tất nhiên bạn đang nói về một nguy cơ ở đây vì bạn không giữ lại các đối tượng mà sẽ được sử dụng trong tương lai. Bạn nên chắc căhns rằng self (và các properties của nó) sẽ vẫn còn sống mỗi khi bạn gọi block của mình từ class khác. Nếu không, bạn sẽ nhận được một lỗi bad access memory/

Nếu bạn bẻ gãy bất cứ luật nào được nói ở trên thì mã của bạn vẫn sẽ hoạt động, nếu như bạn đang dùng ARC. Tuy nhiên, Apple khuyến cáo sử dụng những luật này để đảm bảo an toàn 100%.