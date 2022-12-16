1. Khái niệm con trỏ là gì?

Nếu bạn là coder sử dụng C#, java, Swift ... thì có thể bỏ qua bài này nhưng nếu bạn là coder C++ hoặc nếu thích thì có thể tham khảo và cho mình xin ý kiến.

Bài này mình sẽ đề cập đến một vấn đề khá phức tạp nhưng lại có rất nhiếu ý nghĩa trong lập trình C++. Nó cũng là nguyên nhân của rất nhiều vấn đề trong lập trình C++. Đó chính là con trỏ.

<br/>
Theo định nghĩa:

> In computer science, a pointer is a programming language object that stores the memory address of another value located in computer memory.
> [*Wikipedia*]
 
 <br/>
Dịch: Trong khoa học máy tính, một con trỏ là một đối tượng lập trình, nó lưu địa chỉ ô nhớ của một ô nhớ chưa giá trị khác trong máy tính.

<br/>
<br/>
Để đơn giản, các bạn hãy hiểu rằng: Mỗi một ô nhớ trong máy tính là một căn nhà. Thường thì mỗi nhà sẽ có một địa chỉ nhà riêng biệt gồm số nhà, xã, huyện, tỉnh tương ứng. Và số nhà này được ghi trong một cuốn sổ của của phòng địa chính từng vùng. Vậy thì, cuốn sổ ghi địa chỉ mỗi căn hộ tương ứng chính là một con trỏ, nó lưu địa chỉ căn nhà mà chúng ta đang đề cập đến.

2. Ví dụ và phân tích

Đầu tiên chúng ta sẽ xét đoạn code dưới đây

```
int main()
{
    /*Poiter ==> address / reference / variable ==> Value*/
    int a = 5;
    int *p_a = &a;

    cout << "Value kept by variable a is    : " << a << endl;
    cout << "Address of variable a is       : " << &a << endl;

    cout << "Value kept by poiter p_a is    : " << *p_a << endl;
    cout << "Reference kept by poiter p_a is: " << p_a << endl;
    cout << "Address of poiter p_a is       : " << &p_a << endl;
}
```
Kết quả sẽ in ra:
> Value kept by variable a is    : 5
> 
> Address of variable a is       : 0x7ffeef3e431c
> 
> Value kept by poiter p_a is    : 5
> 
> Reference kept by poiter p_a is: 0x7ffeef3e431c
> 
> Address of poiter p_a is       : 0x7ffeef3e4320

Bạn có thấy gì đặc biệt trong đoạn code ví dụ trên không, kết quả in ra:
> Address of variable a is       : 0x7ffeef3e431c
> 
> Reference kept by poiter p_a is: 0x7ffeef3e431c

Hay là ```*p_a = &a```
Chắc chắn các bạn sẽ thắc mắc, thế thì có gì đặc biệt, chả phải trong code cũng đã viết ```int *p_a = &a``` rồi còn gì.
Đúng rồi, vậy các bạn hãy thử thay đổi đoạn code trên thế này xem sao:
```
int main()
{
    /*Poiter ==> address / reference / variable ==> Value*/
    int a = 5;
    int *p_a = 0x7ffeef3e431c;
}
```
Build, run and see!!
Vâng, các bạn sẽ chẳng thể đến bước run được đâu, bởi vì compiler sẽ không chịu build đoạn code trên cho các bạn. Vì sao? Vì ```int *p_a``` là một con trỏ, và nó sẽ chỉ lưu địa chỉ của một biến khác chứ không đơn thuần là một con số như cái mà đoạn code ban đầu đã in ra.

Quay lại ví dụ miếng đất ở mục 1, cuốn sổ của phòng địa chính cũng sẽ phải được lưu ở đâu đó. Khi này, ở trên bộ muốn biết được chỉ nhà, vườn mỗi hộ dân, họ không tội gì lại tạo ra một cuốn sổ khác và lưu hết toàn bộ địa chỉ nhà vườn của tất cả người dân Việt Nam. Họ sẽ tạo ra một cuốn sổ khác và lưu địa chỉ nơi chứa cuốn sổ ban đầu. Đây là ví dụ con trỏ bậc 2.

<br/>
Trong code sẽ như sau:

```
int **p_b = &p_a;
```
Cứ như vậy ta có thể tạo ra con trỏ bậc 3, 4, ..., n. Nhưng mà thôi, bậc 2 cũng đã đủ đau đầu lắm rồi.

3. Lưu ý khi sử dụng con trỏ.

Có nhiều tài liệu ghi chú vấn đề về việc khởi tạo và hủy đối tượng khi sử dụng con trỏ. Điều này là để chương trình đảm bảo chương trình chạy đúng và không xảy ra những hệ lụy nghiêm trọng khi sử dụng sai.

Trong phần lớn các sự cố, khi sử dụng sai con trỏ chương trình sẽ chỉ hoạt động sai hay là crash app. Khi crash liên quan đến con trỏ, thường các bạn sẽ được gặp một thông báo lỗi trong quá trình debug là **SIGSEGV** hay **Signal 11**. Nếu có backtrace, coredump ... các bạn sẽ dễ dàng tìm ra lỗi ở đoạn nào. Tuy nhiên, trong trường hợp nghiêm trọng hơn, lỗi này có thể gây sụp đổ hoàn toàn hệ thống và xóa luôn hệ điều hành khỏi máy tính của bạn :D

Một vấn đề nữa, khi xóa một con trỏ thì mọi người sẽ phải đưa con trỏ trỏ về ```null_ptr```. Điều này đơn giản chỉ là để sử dụng code convention là check null khi sử dụng nó. Một khi xóa con trỏ mà quên không trỏ về ```null_ptr``` các bạn sẽ không thể check được con trỏ đã bị xóa hay chưa. Và khi đã trỏ về ```null_ptr``` rồi, các bạn vẫn cần check ```null_ptr``` trước khi sử dụng, nếu không, các bạn sẽ gặp ngay **SIGSEGV** và có thể bốc hơi luôn cả hệ thống

4. Nó phức tạp và nguy hiểm như thế vậy tại sao lại cần có con trỏ?

Cái này thì thật khó mà trả lời, mình có thể đưa ra cho bạn một vài ví dụ như sau nhé. Ai thấy phù hợp thì làm theo thôi. Miễn sao build được và app chạy được là ok :D

* Giả sử như bạn có một biến lưu nội dung bài viết này. Cơ mà nội dung bài này lại quá lớn, nó chiếm đến quá 50% dung lượng bộ nhớ của bạn. Trong một điều kiện khác bạn cần tạo ra một biết sử dụng nội dung y chang cái nội dung bài này. Nhưng vì nội dung bài này đã chiếm > 50% bộ nhớ rồi nên bạn không thể tạo thêm một biến nữa có nội dung tương tự (chưa kể đến các thành phần khác). Giờ phải làm sao? Trường hợp này mà bạn dùng con trỏ refer đến cái biến chứa nội dung bài thì sao :D :D :D Chỉ tốn thêm 1 ô nhớ cho cái này thôi. Đơn giản quá hà!
* Hay bạn có hai app cần chia sẻ dữ liệu cho nhau qua bộ nhớ dùng chung, con trỏ sẽ giúp 2 app này có thể đọc và ghi trên cùng 1 vùng nhớ để chia sẻ dữ liệu.
* Và còn nhiều nhiều ứng dụng khác nữa.

Tài liệu tham khảo:
* https://en.wikipedia.org/wiki/Pointer_(computer_programming)

<br/>
Mr. Ếch!!!