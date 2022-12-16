![](https://images.viblo.asia/7f584367-37a7-4b31-a396-1e083119efaf.jpg)

Chào mọi người, trong bài viết hôm nay mình xin cố gắng đi sâu vào một khái niệm mà có lẽ tất cả chúng ta đã từng gặp và sử dụng khá nhiều trong công việc đặc biệt là trong các thao tác với files và ảnh. Đó là khái niệm `base64` hay thường được gọi đầy đủ là `base64 encoding` có thể nhiều khi bạn cũng từng thắc mắc là làm sao chúng ta có thể upload một file ảnh, làm sao để lưu được một ảnh vào trong database thay vì chỉ lưu đường dẫn của ảnh đó. Đôi khi cố gắng tìm hiểu một thứ gì đó cũ cũ cũng khá là thú vị :D
## 1. Khái niệm
**base64** là phương thức convert dạng mã hóa 2 chiều từ `binary` sang `string` để có thể gửi đi được trong network một cách dễ dàng. Các binary lúc này sẽ được thể hiện bằng các ký tự mã ASCII .

![](https://images.viblo.asia/10c21f56-d39a-42e4-8e82-b8b3a3fb68cd.png)

Sự ra đời của `base64` bắt nguồn từ việc mong muốn gửi một ảnh quả Email dùng chuẩn SMPT, tuy nhiên chuẩn SMTP chỉ cho phép chuyển các ký tự ASCII dùng 7 bit có giá trị từ 0- 127. Nhưng một tệp nhị phân bao gồm các byte có giá trị 0-255 vậy trước tiên chúng ta cần convert nó để có thể sử dụng được SMTP.

Rõ ràng mã ASCII có 128 giá trị nhưng tại sao lại là `base64` mà không phải `base128`, đơn giản là vì không phải 128 mã ASCII đều có thể được sử dụng. Ví dụ CR/LF tương ứng là 13 và 10 trong mã ASCII được sử dụng để biểu thị việc kết thúc dòng trong SMTP cho nên việc sử dụng cặp ký tự này là không cần thiết và còn nhiều cặp tương tự như vậy nên thay vì sử dụng 128 (7bits) chúng ta sẽ sử dụng 64 (6 bits) để thể hiện dữ liệu.

## 2. Base64 hoạt động như thế nào?
Để hiểu hơn và khái niệm `base64` mà không phải `base69` chúng ta cùng xem ví dụ sau để hiểu rõ hơn về cơ chế convert dữ liệu từ binary sang string như thế nào.

Quá trình thực hiện theo 4 bước.
1. Dữ liệu nhị phân được sắp xếp theo từng khối 24 bit (3 byte) liên tục.
2. Mỗi đoạn 24 bit được nhóm thành bốn phần 6 bit mỗi phần.
3. Mỗi nhóm 6 bit được chuyển đổi thành các giá trị ký tự Base64 tương ứng của chúng. Mã hóa Base64 chuyển đổi ba octet thành bốn ký tự được mã hóa. (mỗi octet có 8bits dữ liệu)
4. Người nhận sẽ phải đảo ngược quá trình này để khôi phục thông điệp ban đầu

Thật thú vị là các ký tự giống nhau sẽ được mã hóa khác nhau, tùy thuộc vào vị trí của chúng trong 3 octet để tạo ra 4 ký tự.

Và một image sau khi bị `base64` sẽ kiểu như vậy

> TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlz
IHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2Yg
dGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGlu
dWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRo
ZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=

Các bạn thấy quen chứ ? :D


> 3 octet lại tạo ra 4 ký tự


Bảng mã convert `base64` [a-zA-Z0-9+/]

![](https://images.viblo.asia/34d0c7db-c157-4890-8367-54e71041285e.png)

Cùng xem qua ví dụ sau để hiểu rõ hơn về cách convert của `base64` nhé.
Giả sử chúng ta có string là:  **rav**

Binary tương ứng của string trên là : 01110010   01100001   01110110

Bước đầu tiên là chúng ta chia 3 octet trên thành nhóm 6 bít

Binary 011100   100110   000101   110110

Từ đó số thập phân tưng ứng với 4 nhóm mới sẽ là : 28  38  5  54

Từ bảng trên chúng ta sẽ có được chuỗi ký tự sau khi mã hóa tương ứng như sau:

28 = c

38 = m

5 = F

54 = 2

Vì thế **rav** sau khi qua `base64` sẽ thành **cmF2**

Nhưng điều gì sẽ sảy ra nếu số byte không chia hết cho 3, ví dụ 4 byte thì chúng ta sẽ có tất cả 4x8=32 bits. Sau khi chia làm từng nhóm 6 bits chúng ta sẽ được 5 nhóm và còn thiếu 4 bit để đủ 1 nhóm.

Ví dụ với string : **rave**

Binary - 01110010 01100001 01110110 01100101

3 byte đầu tiên của chúng tôi mã hóa giống nhau. Nhưng 8 bit cuối cùng không phân chia hết. Vì vậy, để mã hóa trong base64 chúng ta thực  cần 12 bit. Các bit còn lại được đệm bằng số không. Cái kết như sau :

Binary 01110010 01100001 01110110 01100101 011001 010000


Decimal 25 16


Base64 Z Q

Nhưng dù thêm hay bớt, có vay có trả chúng ta vẫn thiếu 2 ký tự, cho nên kết thúc chuỗi mã hóa chúng ta phải có ký tự đệm cho nó. trong MIME RFC ký tự đệm là **=**

Kết quả sau khi mã hóa base64 chúng ta được : **cmF2ZQ==**

Cuối cùng chúng ta có thể thấy cứ 3 byte lại bị mã hóa thành 4 ký tự cho nên việc gửi mail hoặc gửi ảnh bị giới hạn dung lượng cũng vì lẽ đó, hoặc chúng ta không nên lưu trực tiếp base64 vào database cho dù điều đó là có thể.

## 3. Kết luận
Trên đây là một số tìm hiểu của mình về `base64` và còn khá nhiều kiến thức xoay quanh nó mà mình chưa ngâm cứu hết được. Hy vọng thông qua bài viết này các bạn đã phần nào hiểu được thứ mà vẫn chung chăn gối với mình bấy lâu nay. Mọi kiến thức đều là đi nhặt lượm nên chỗ nào nhặt chưa sạch thì cũng mong các bạn thông cảm. Cảm ơn các bạn đã đón đọc :D

## 4. Tài liệu tham khảo
https://en.wikipedia.org/wiki/Base64

https://www.quora.com/Why-do-we-use-Base64