# Bắt đầu
Hí anh em, Hôm nay lại là một ngày chủ nhật, lại lôi lap ra để tiếp tục lên cho anh em 1 con bài về String trong java nhaaaaaaa <3

Chắc hẳn khi các bạn học java thì các bạn phải học qua những thứ cơ bản như data type,variables,loop..v..v.. đúng khum nào? Và trong đó có 1 thứ cực kỳ quan trọng trong java và trong bất kỳ ngôn ngữ lập trình nào, đó chính là **String** và trong java có thêm khái niệm **String pool** vậy thì hôm nay chúng ta cùng tìm hiểu xem nó là gì nhé!

# String là gì?
 Đầu tiên chúng ta cùng lướt qua xem string trong java  nó là cái gì đã nhé!
 
 - **String** là một kiểu dữ liệu trong java thuộc dòng họ kiểu dữ liệu nguyên thuỷ (Primitive type) như: int, double, float, char ...v..v.. Nhưng String có điểm khác biệt với các kiểu nguyên thuỷ trên đó là String là một kiểu biến tham chiếu (Reference type)
 - **String** là bất biến (immutable class) có nghĩa là vùng nhớ và giá trị sau khi khởi tạo sẽ không thay đổi. Tại sao lại là bất biến thì mình sẽ có 1 bài viết về nó sắp tới nhaaaa
 - Có 2 cách để khởi tạo một biến String
     - cách 1: sử dụng từ khoá String : `String str = "Value";`
     - cách 2: khởi tạo đối tượng String với toán tử new: `String str = new String("Value");`

2 cách này khác nhau như thế nào thì mình sẽ cùng tìm hiểu ngay bây giờ nhé!

# String pool là gì? 

Hãy nhìn vào tấm hình bên dưới, bạn nhận ra điều gì không? mình nghĩ là bạn đã nhận ra điều gì đó? Vậy chúng ta cùng tìm hiểu String pool nhé!

![](https://images.viblo.asia/44537daf-310c-4a04-a44b-ed21b4b62849.png)

Như trên thì chúng ta cũng có nhắc đến 2 cách tạo String đúng khum nào!

> - Có 2 cách để khởi tạo một biến String
> 
>     - cách 1: sử dụng từ khoá String : `String str = "Value";`
>     - cách 2: khởi tạo đối tượng String với toán tử new: `String str = new String("Value");`



Cách bạn khởi tạo String cũng sẽ liên quan đến việc sử dụng String pool, cụ thể khi bạn khởi tạo theo cách 1 `String str = "Value";` thì java sẽ chọc vào String pool để tìm xem trong bộ nhớ đã có ô nhớ nào tồn tại giá trị được khởi tạo hay chưa, nếu có rồi nó sẽ thực hiện tham chiếu vào ô nhớ đó, nếu chưa có thì sẽ thực hiện tạo mới và thực hiện tham chiếu, hơi khó hiểu nhỉ ^^ ví dụ trên cho dễ hiểu nhé!

- Ở ảnh trên chúng ta thực hiện khởi tạo biến `String s1 = "Apple";` lúc này sẽ chưa có ô nhớ nào chứa value "Apple" nên String sẽ ko tìm thấy để tham chiếu, thế nên nó sẽ tạo mới ô nhớ có chưa value = "Apple" sau đó tham chiêu đến nó!
- Sau đó mình tiếp tục khởi tạo biến String s2 `String s3 = "Apple";` lúc này String pool sẽ tìm xem trong bộ nhớ  đã có ô nhớ nào có chứa value = "Apple" chưa, à lúc này nó tìm thấy rồi nè, vậy nên nó sẽ không khởi tạo mới một ô nhớ có chứa value là "Apple" nữa mà thực hiện tham chiếu s3 vào ô nhớ này luôn. Nhờ vào việc tham chiếu nên s3 sẽ không phải tạo mới một ô nhớ khác, việc này tránh làm lãng phí cũng như làm tràn bộ nhớ!
- Vì s1 và s3 cùng tham chiếu đến cùng một địa chỉ ô nhớ vùng nhớ heap nên s1 == s3

Tiếp theo khi bạn khởi tạo biến String với toán tử new thì sẽ khác với cách 1:

  - Ở ví dụ trên: `String s2 = new String(“Mango”);`  dòng này sẽ tạo 1 ô nhớ ở Java Heap Space có giá trị là “Mango”, biến s2 này sẽ tham chiếu địa chỉ của ô nhớ đó.

- Và nếu có: `String s4 = new String(“Mango”);` tương tự dòng này cũng sẽ tạo 1 ô nhớ khác ở Java Heap Space cũng có giá trị là “Mango” (không giống ở trên là sẽ tìm ô nhớ nào có giá trị như vậy rồi tham chiếu đến nhé), biến s4 này sẽ tham chiếu đến địa chỉ của ô nhớ mới.

- Và vì s2 và s4 ko tham chiếu đến cùng địa chỉ ô nhớ  ở vùng nhớ heap nên s2 != s4


# Kết
Như vậy là chúng ta đã tìm hiểu String pool là gì rồi! vậy hãy mở máy lên và thử áp dụng String pool xem nó thay đổi như thế nào nhé!

Cảm ơn các bạn đã dành thời gian để đọc bài viết này!