# **Lời nói đầu**
Đầu tiên, bài viết này mình viết với mục đích chia sẻ kiến thức của mình về **cookies**. Cách chia sẻ của mình là cố gắng diễn tả vấn đề sao cho thật **hài hước và dễ hiểu**, giúp các bạn nhớ lâu và việc học trở nên không nhàm chán, chứ không phải là không tôn trọng người đọc.

Vì vậy, việc này có thể sẽ không phù hợp với một số bạn, nên nếu có vấn đề gì về kiến thức hoặc cách diễn đạt của mình, các bạn có thể góp ý cho mình bằng cách comment phía dưới. 

**Cảm ơn các bạn rất nhiều!.**

## 1. HTTP Cookies là gì?

![](https://images.viblo.asia/1a7c54ef-2554-4bc6-8e40-4eecb0dfe31f.png)

**Http Cookies**, thường được gọi là **cookies (bánh)**. Từ thuở ban đầu dự định sử dụng vào việc lưu trữ thông tin session ở phía client. Theo bản chất, cookies sẽ được gắn với một tên miền (domain) cụ thể. 

Câu chuyện ra đời của cookies khá là hấp diêm, ý lộn hấp dẫn.



> Ngày xửa ngày xưa, có một cô nàng tên là **Netscape**, rất xinh đẹp và còn zin =))). 
> Cô ấy yêu say đắm một anh chàng tên **Server**. Vào một ngày kia, khi tình yêu đã chớm nở, cô gửi cho anh chàng một cái request (với header là hãy làm gì em đi!).
> 
> Không bỏ qua cơ hội ngon ăn, anh chàng server gửi ngay một response, anh check hàng (mất zin, ẹc) và đồng ý cho Netscape vào phòng.
> 
> Sẽ chẳng có gì để nói nếu 2 tiếng sau đó, cô nàng Netscape đi ra ngoài đổ rác và quay lại gõ cửa yêu cầu được quay trở lại phòng, trớ trêu thay, anh chàng server đã **mất đi trí nhớ của mình và lại đòi check hàng** **Netscape**. Vì quá bực tức với độ điếm thúi của server, cô nàng Nestcape đã lấy một ít bánh (**cookies**) còn sót trong thùng rác, ghi vào đó cặp `name value` rằng `checkroi: 2tiengtruoc`. Ngay khi nhận được bánh, server lập tức hiểu rằng đã check hàng, và nó cho Netscape vào. **Từ đó cookies ra đời**.
> 



Vừa rồi là câu chuyện về sự ra đời của cookies do mình tự bịa, còn ngắn gọn thì cookies được phát minh bởi Netscape, với mục đích ban đầu là để cung cấp bộ nhớ cho máy chủ và trình duyệt web. =)))

## 2. Mày vừa mới troll tao đấy!, thế có những loại cookies nào, dùng nó làm gì?.

Tất nhiên, với câu chuyện ra đời hết sức xàm xí, ý lộn có lí của cookies thì về cơ bản cookies có thể được phân làm ***hai loại*** chính:

* **Session cookies (phiên cookies)**: cookies này được giữ lại ở trình duyệt và sẽ bị **xóa bỏ khi đóng trình duyệt**. Khi cửa sổ trình duyệt mới được mở lại, người dùng sẽ phải cung cấp lại các chứng thực của mình.

* **Persistent cookies (coookies liên tục)**: cookies này được giữ ở trình duyệt cho **tới khi hết hạn** hoặc được **xóa một cách thủ công**. Các trang web sẽ ghi nhớ các chứng thực ngay cả khi người dùng đóng trình duyệt. 



-----


![](https://images.viblo.asia/6da1ce60-9597-4689-902a-902826f9a294.png)

-----

Ứng dụng **quan trọng nhất** của cookies là giữ cho người dùng đăng nhập khi họ duyệt từ trang này qua trang khác. Một số trang web thương mại điện tử thì **sử dụng cả session cookies và persistent cookies** để **tạo sự liền mạch** cho giỏ hàng khi mua sắm.

## 3. Hai loại, fine!. Thế nó hoạt động như thế nào?.
			
Nghiêm túc lại nè. 

Khi người dùng truy cập vào trang web lần đầu tiên, **trang web sẽ tạo ra bản ghi** của nó và **lưu vào cookies trên trình duyệt** của người dùng. Lúc này cookies chỉ là một dòng văn bản ngắn, nó không chứa bất cứ thông tin nào về người dùng hoặc máy của người dùng. Thay vào đó, nó chứa URL của trang web đã đặt cookie.


Khi người dùng quay lại và lướt web, mỗi trang mới mà người dùng truy cập, trình duyệt sẽ **tìm kiếm cookies**. Nếu URL của cookies khớp với URL của trang web, trang web sẽ truy xuất thông tin máy chủ bằng cách sử dụng thông tin lấy được từ **cookies**.

Bằng cách này, trang web có thể nâng cao trải nghiệm người dùng, hạn chế phải lặp đi lặp lại nhiều hoạt động của người dùng.
Một số trang web cũng có thể sử dụng **cookies** để nâng cao trải nghiệm người dùng, người dùng mới có thể thấy phiên bản mới của trang web, trong khi người dùng cũ lại thấy phiên bản trước đó.


Các bạn có thể theo dõi **hình dưới:**

-----
![](https://images.viblo.asia/b84f08a3-4f79-40b1-96a6-7a8354d6d156.jpg)

-----

## 4. Biết là dùng vậy rồi!. Thế bánh có nhiều thứ không?.

Bánh ngon thì nhiều thứ =))).
Một vài thứ làm nên bánh đây:
* **Name**: Một tên duy nhất dùng để định danh (bánh đậu xanh, bánh pía, vân vân). Tên cookies không    phân biệt chữ hoa và chữ thường, vậy nên việc sử dụng banhPIA và BanhPia là giống nhau. Tuy nhiên, trong thực tế ta nên phân biệt hoa thường cho cookies, vì một số phần mềm trên server có thể sẽ phân biệt hoa thường. Ngoài ra tên cookies phải được mã hóa URL (URL encoded).
* **Value**: giá trị được lưu trữ trong cookies, giá trị này cũng nên được mã hóa URL.
* **Domain**: là domain mà cookies chúng ta hợp lệ (bánh not for everyone), mọi thứ được gửi hoặc được sử dụng từ domain này sẽ kèm theo cookies.
* **Path:** đường dẫn được chỉ định trong domain (địa chỉ ship bánh), nơi mà cookies sẽ được gửi đến server.
* **Expiration**: Đây là dấu thời gian, nó cho biết lúc nào cookies sẽ bị xóa (bánh có hạn sử dụng, không thể ăn mãi được). Mặc định thì tất cả cookies sẽ bị xóa khi ta tắt trình duyệt. Tuy nhiên, ta có thể xác định thời gian cố định để xóa, giá trị này được đặt theo định dạng GMT (Wdy, DD-Mon-YYYY HH:MM:SS GMT). Việc này giống như trang web cung cấp bánh sẽ nói với bạn rằng bánh của tao còn hạn tới ngày đó, giờ đó chứ không hết hạn sớm thế. =))). Sau thời gian được quy định, cookies sẽ bị xóa ngay lập tức (vứt bánh).
* **Secure Flag**: cờ an toàn, với mục đích chỉ gửi cookies nếu kết nối SSL được sử dụng. Ví dụ: khi gửi request tới https://www.vietcombank.com.vn thì nên gửi kèm thông tin cookies, còn tới http://www.vietcombank.com.vn thì không.

Hình dưới là một số cookies được lưu trữ khi truy cập stackoverflow.com.

-----
![](https://images.viblo.asia/65427dc1-6b6a-4dcc-aa69-6393979ab964.png)
-----

## 5. Thử một cái xem nào, nhắc tới bánh đói bụng quá!.
Ở bài viết này, mình sẽ lấy ví dụ bằng hình ảnh, còn chi tiết về code mình sẽ phân tích cụ thể ở bài viết sau.
Ví dụ đầu tiên thường gặp khi sử dụng cookies là xác thực (authentication). Khi chúng ta đăng nhập ở một website.

**Luồng thực hiện:**

![](https://images.viblo.asia/531258a9-483a-4597-a56a-5634ec1d181a.png)

**Bước 1:**
 Gửi request method POST yêu cầu đăng nhập tới website (ví dụ github), thông tin là username và password, việc đầu tiên server thực hiện là xác thực tài khoản này.

![](https://images.viblo.asia/c5a9af42-718d-4ab5-829a-19b4f800711d.png)

**Bước 2:**
Sau khi xác thực thành công, server sẽ cấp token, lưu trữ vào cookies, ở đây là giá trị usersession

![](https://images.viblo.asia/2fef35c3-10b6-42f8-bb65-abd6af6391e5.png)

**Bước 3:**
Khi quay lại trang web, server sẽ thực hiện method GET. Method này thực hiện lấy nhiều thông tin, một trong số đó là usersession

![](https://images.viblo.asia/f22903b1-ea66-4c67-8931-da8286cecafc.png)

**Bước 4:** Dựa vào thông tin usersession này, server sẽ xác thực và di chuyển thẳng tới trang dashboard

## 6. Bánh có độc không? (thử rồi mới nói, ẹc).

Khi chúng ta thiết lập một cookies mới, nó sẽ được gửi kèm theo các request tới domain mà nó được khởi tạo. Việc hạn chế này đảm bảo **thông tin lưu trữ trong cookies được an toàn**, chỉ có người được cấp phép mới được tiếp cận và **không thể truy cập bởi domain khác** (ship bánh nhầm cmn địa chỉ).

Vì cookies được lưu trữ trên phía client, nên dù bánh có ngon, ta cũng không thể ăn quá nhiều. Số lượng cookies trên mỗi domain là **có giới hạn**!.

Hạn chế này đảm bảo rằng cookies sẽ không bị sử dụng sai mục đích và chiếm quá nhiều dung lượng đĩa (**disk space**).

Mặc dù bị giới hạn, nhưng **số lượng cookies** tối đa trên mỗi domain cũng thay đổi qua các phiên bản của trình duyệt.
* **Internet Explorer 6** trở về trước thì tối đa là **20 cookies**
* **Internet Explorer 7** trở về sau thì tối đa là **50 cookies** (sau khi có bản vá từ Microsoft)
* **Firefox** là **50 cookies**
* **Chorme và safari** thì **không giới hạn** cho số cookies

Để đọc thêm các bài viết hay và bổ ích tại blog của mình ([kieblog.vn](https://kieblog.vn))
Các bạn có thể tham khảo thêm bài viết [này ](https://viblo.asia/p/luu-tru-cookie-hai-hay-khong-hai-naQZReyqKvx) (tác giả: Pham Thi Kim Oanh)
## 7. Tổng kết.

**Cookies** là một phần của **Web Storage interface**, cũng là một phần thiết yếu của internet. Thiếu đi nó các trang web sẽ ít tương tác với người dùng, trải nghiệm người dùng trên trang web cũng bị giảm đi đáng kể. Vậy mới nói, nếu không có một **tình yêu mãnh liệt** giữa Server và Nestcape, làm sao chúng ta có **cookies** ngày hôm nay. 



![](https://images.viblo.asia/c99bb372-852d-450f-9e3a-94841f126690.jpg)