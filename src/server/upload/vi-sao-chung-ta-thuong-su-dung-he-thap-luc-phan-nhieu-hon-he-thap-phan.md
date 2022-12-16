Với những người học và làm việc trong ngành Công nghệ thông tin thì hệ cơ số 16 chắc không phải xa lạ gì. Ngay từ khi học các môn cơ sở trên trường, hoặc là trong quá trình tìm hiểu trên mạng, chúng ta đã được giới thiệu về khái niệm Hệ đếm và 4 hệ đếm cơ bản:
- Hệ thập phân (Decimal)
- Hệ nhị phân (Binary)
- Hệ bát phân (Octal)
- Hệ thập lục phân (Hexadecimal)

Trong 4 hệ đếm cơ bản kia thì hệ thập phân là thường gặp nhất, đây là hệ cơ số chúng ta thường dùng trong tính toán. Tiếp theo là hệ nhị phân thì cũng thấy nhiều vì đây là hệ cơ số máy tính sử dụng.  
Nằm giữa 2 hệ cơ số đó là Hex. Việc "nằm giữa" này cũng là cái cảm nhận của cá nhân mình thôi. Nhưng chắc chắn là công dụng và sự phổ biến của Hex cũng không kém cạnh gì Dec và Bin.

### Chúng ta có thể thấy Hex ở đâu ?

Điểm qua một số tác dụng của Hex:
- Để hiển thị màu trên web, chúng ta biểu diễn mã màu [#RRGGBB](https://htmlcolorcodes.com/) dưới dạng Hex.
- Để xác định địa chỉ trong bộ nhớ, chúng ta sử dụng 8 ký tự Hexa với 32bit OS ([12 ký tự Hex với 64bit OS](https://en.wikipedia.org/wiki/X86-64#Canonical_form_addresses)).
- Địa chỉ [MAC](https://www.geeksforgeeks.org/introduction-of-mac-address-in-computer-network/) của các thiết bị mạng được tạo thành từ 12 ký tự Hex.
- Hiển thị thông báo lỗi: địa chỉ ô nhớ xảy ra lỗi được biểu diễn dưới dạng hexa, giúp lập trình viên dễ dàng hơn trong việc tìm và sửa lỗi.
- Sử dụng trong mã hóa. 

Và còn nhiều nữa ...   
Nếu bạn code Assembly và chơi CTF mảng RE thì sẽ phải làm việc với hex rất nhiều.

### Tại sao Hex lại được sử dụng nhiều như vậy ?

Như mình đã nói ở trên thì Hex "nằm giữa" Dec và Bin. Tại sao lại nói như vậy ?  
Vì Dec dễ sử dụng hơn với con người, còn máy tính thì chỉ hiểu Bin. Hex thì thân thiện với con người hơn Bin. **Đọc, viết và sử dụng Hex trong tính toán thì tiện hơn so với Bin**, nhưng vẫn không bằng sử dụng Dec.  

Tuy Dec dễ sử dụng nhưng để chuyển đổi Bin -> Dec thì không tiện như chuyển đổi từ Bin -> Hex. Việc **dễ dàng chuyển đổi Bin <==> Hex** là ưu điểm đầu tiên khiến Hex được sử dụng nhiều.  
Vì 2^4 = 16 nên mỗi 4 bit đều có thể được biểu diễn bằng 1 ký tự Hex, 1 byte được biểu diễn bằng 2 ký tự Hex. Điều này là cố định, trong khi với Dec thì không như vậy.

Ưu điểm thứ hai là chúng ta **có thể biểu diễn 1 số nguyên lớn dưới dạng Hex với số lượng ký tự cần sử dụng là rất ít**. Không gian (số lượng ký tự) cần sử dụng để biểu diễn giá trị dưới dạng Hex ít hơn 4 lần so với khi biểu diễn dưới dạng Bin. Con số này ít hơn khi đem Hex so sánh với Dec, nhưng vẫn là một ưu điểm mà Hex vượt trội hơn so với Dec và Bin.

![](https://images.viblo.asia/a3d09143-7404-4ce2-8ee9-56bdbf346066.png)
Nhìn vào biểu đồ trên, dễ thấy rằng cần phải thêm 1 chữ số nữa để biểu diễn giá trị khi đạt các mốc:
- Dec: 10, 100, 1000, ....
- Bin: 2, 8, **16**, 32, 64, 128, **256**, ....
- Hex: **16**, **256**, ....

=> Các hệ cơ số thuộc tập hợp sau là thích hợp để biểu diễn thay thế cho Bin:
![](https://images.viblo.asia/664e15c8-5c2b-4fa2-bede-48342e4e7ca3.PNG)


### Tại sao không sử dụng các hệ cơ số lớn hơn ?

Qua những lý do vừa đề cập, chúng ta dễ dàng nhận ra rằng: khi sử dụng hệ cơ số X để biểu diễn giá trị, với X thuộc tập hợp F thì X càng lớn sẽ càng tiết kiệm không gian hơn trong khi vẫn đảm bảo dễ dàng chuyển đổi Base 2 <==> Base X.

Thế thì tại sao vẫn là Base 16 mà không sử dụng Base 128, Base 256 ?

Câu trả lời nằm ở số lượng ký tự dùng để biểu diễn. Hex sử dụng 16 ký tự 0-9A-F.  
Base n thì cần sử dụng n ký tự khác nhau để biểu diễn giá trị. Trong bảng ASCII chỉ có 128 ký tự, và một số ký tự không hiển thị được. Như vậy nếu không sử dụng Hex thì chỉ có thể sử dụng các hệ cơ số sau: 8, 32 và 64

1 ký tự Oct biểu diễn 3 bit Bin.  
1 ký tự B32 biểu diễn 5 bit Bin.  
1 ký tự B64 biểu diễn 6 bit Bin.

Cả 3 hệ cơ số trên đều không thể biểu diễn trọn vẹn 1 byte nhị phân được. Như vậy, trong tất cả các lựa chọn thì chỉ có 1 hệ cơ số duy nhất đủ ưu điểm để biểu diễn thay cho hệ nhị phân, đó chính là Hex.

Tham khảo từ các nguồn sau:
- [Uses of Hexadecimal](https://teachcomputerscience.com/uses-of-hexadecimal/)
- [Why do we use hexadecimal?](https://medium.com/@savas/why-do-we-use-hexadecimal-d6d80b56f026)