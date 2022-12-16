# Giới thiệu
![](https://images.viblo.asia/804b1331-8150-4c99-a7dc-ac79780f4af3.jpg)

Mình giả sử các bạn đã có một kiến thức khá tốt về cách serialization một đối tượng trong java . Nhưng quá trình serialization và deserialization thực sự diễn ra như thế nào? Các bạn đã bao giờ tìm hiểu về vấn đề này chưa?. Trong bài viết này mình sẽ trình bày rõ về cách mà java xử lý khi các bạn thực hiện serialization cũng như deserialization.   

# Quá trình serialization trong java diễn ra như thế nào?
Nói chung, thuật toán serialization thực hiện như sau: 

1. Viết ra siêu dữ liệu (metadata - mô tả) của lớp được liên kết với đối tượng.
1. Đệ quy viết ra mô tả của các lớp cha cho đến khi tìm thấy java.lang.object.
1. Khi kết thúc việc viết thông tin siêu dữ liệu, nó sẽ bắt đầu với dữ liệu thực tế được liên kết với đối tượng. Nhưng lần này, bắt đầu từ lớp cha trên cùng.
1. Đệ quy ghi dữ liệu liên quan đến đối tượng, bắt đầu từ lớp cha nhỏ nhất đến lớp lớn nhất.


Để dễ hiểu hơn ta sẽ đi vào ví dụ và giải thích từng phần: 


**Sample serialized object** 

![](https://images.viblo.asia/58915237-aea9-4b5d-a540-6f957c88a7f7.png)

Ví dụ này là một ví dụ đơn giản. Nó serialize một đối tượng kiểu **serialTest**, kế thừa lớp **Parent** và có một thuộc tính là đối tượng của lớp **contain**. Sau khi thực hiện Serialize đối tượng trên chúng ta đọc file temp.out (Sử dụng công cụ HxD hoặc các công cụ khác )

**AC ED 00 05 73 72 00 0A 53 65 72 69 61 6C 54 65
73 74 05 52 81 5A AC 66 02 F6 02 00 02 49 00 07
76 65 72 73 69 6F 6E 4C 00 03 63 6F 6E 74 00 09
4C 63 6F 6E 74 61 69 6E 3B 78 72 00 06 70 61 72
65 6E 74 0E DB D2 BD 85 EE 63 7A 02 00 01 49 00
0D 70 61 72 65 6E 74 56 65 72 73 69 6F 6E 78 70
00 00 00 0A 00 00 00 42 73 72 00 07 63 6F 6E 74
61 69 6E FC BB E6 0E FB CB 60 C7 02 00 01 49 00
0E 63 6F 6E 74 61 69 6E 56 65 72 73 69 6F 6E 78
70 00 00 00 0B**

Hãy phân tích chi tiết các byte có trên:

>**AC ED: STREAM_MAGIC**. Chỉ định rằng đây là một giao thức serialization.

>**00 05: STREAM_VERSION**. Phiên bản của serialization.

>**0x73: TC_OBJECT**. Chỉ định rằng đây là một đối tượng mới

Bước đầu tiên của thuật toán serialization là viết mô tả của lớp được liên kết với một đối tượng. trong ví dụ trên chúng ta serialize một đối tượng kiểu serialTest, do đó thuật toán bắt đầu bằng cách viết mô tả của lớp SerialTest.

>**0x72: TC_CLASSDESC**. Chỉ định rằng đây là một lớp mới.

>**00 0A**: Độ dài của tên lớp.

>**53 65 72 69 61 6c 54 65 73 74: serialTest**, tên của lớp.

>**05 52 81 5A AC 66 02 F6: serialVersionUID**, định danh phiên bản serialization của lớp này.

>**0x02: Various flags**. Cờ này nói rằng đối tượng hỗ trợ serialization.

>**00 02**: Số trường trong lớp này.

Tiếp theo, thuật toán sẽ viết mô tả cho  trường **int version = 66**.

>**0x49: Mã loại trường**:.49 đại diện cho `"I"`, viết tắt của Int.

>**00 07:** Chiều dài của tên trường.

>**76 65 72 73 69 6F 6E: version**, tên của trường.


Và sau đó thuật toán viết mô tả  trường tiếp theo, **contian con = new contain ();**. Đây là một đối tượng, vì vậy nó sẽ viết chữ ký JVM chuẩn của trường này.

>**0x74: TC_STRING**. Đại diện cho một chuỗi mới.

>**00 09:** Chiều dài của chuỗi.

>**4C 63 6F 6E 74 61 69 6E 3B: Lcontain**;, chữ ký JVM chuẩn.

>**0x78: TC_ENDBLOCKDATA**, kết thúc dữ liệu khối tùy chọn cho một đối tượng.

Bước tiếp theo của thuật toán là viết mô tả của lớp **Parent**, đây là lớp cha ngay trên của **SerialTest**.

>**0x72: TC_CLASSDESC**. Chỉ định rằng đây là một lớp mới.

>**00 06:** Chiều dài của tên lớp.

>**70 61 72 65 6E 74: Parent**, tên của lớp

>**0E DB D2 BD 85 EE 63 7A: serialVersionUID**, định danh phiên bản serialization của lớp này.

>**0x02: Various flags**. Cờ này nói rằng đối tượng hỗ trợ serialization.

>**00 01:** Số lượng trường trong lớp này.

Bây giờ thuật toán sẽ viết mô tả trường cho lớp **Parent**. Lớp này có một trường, **int ParentVersion = 100;**.

>**0x49: Mã loại trường**. 49 đại diện cho "I", viết tắt của Int.

>**00 0D:** Độ dài của tên trường.

>**70 61 72 65 6E 74 56 65 72 73 69 6F 6E: ParentVersion**, tên của trường.

>**0x78: TC_ENDBLOCKDATA**, kết thúc dữ liệu khối cho đối tượng này.

>**0x70: TC_NULL**, đại diện cho thực tế là không còn lớp cha phía trên nữa vì ta đã đạt đến đỉnh của hệ thống phân cấp lớp.


Cho đến bây giờ, thuật toán serialization đã viết mô tả của lớp được liên kết với đối tượng và tất cả các lớp cha của nó. Tiếp theo, nó sẽ ghi dữ liệu thực tế liên quan đến đối tượng. Nó viết mô tả cho thành viên lớp cha trước:

**00 00 00 0A: 10**, giá trị của **ParentVersion**.

Sau đó, nó chuyển sang **serialTest**.

**00 00 00 42: 66**, giá trị của **version**.

Một vài byte tiếp theo khá là thú vị. Thuật toán cần viết thông tin về đối tượng **contain :contain con = new contain()**

Hãy nhớ rằng, thuật toán serialization chưa viết mô tả lớp cho lớp **contain**. Đây là nơi để viết mô tả này.

>**0x73: TC_OBJECT**, chỉ định một đối tượng mới.

>**0x72: TC_CLASSDESC**. chỉ định 1 lớp mới

>**00 07**: Độ dài của tên lớp.

>**63 6F 6E 74 61 69 6E: contain**, tên của lớp.

>**FC BB E6 0E FB CB 60 C7: serialVersionUID**, định danh phiên bản secủa lớp này.

>**0x02: Various flags**. Cờ này nói rằng đối tượng hỗ trợ serialization.

>**00 01:** Số lượng trường trong lớp này.

Tiếp theo, thuật toán phải viết mô tả cho trường duy nhất của lớp contain, **int containVersion = 11;**.

>**0x49: Mã loại trường**. 49 đại diện cho "I", viết tắt của Int.

>**00 0E**: Độ dài của tên trường.

>**63 6F 6E 74 61 69 6E 56 65 72 73 69 6F 6E: containVersion**, tên của trường.

>**0x78: TC_ENDBLOCKDATA**. kết thúc dữ liệu khối cho đối tượng này.


Tiếp theo, thuật toán kiểm tra xem lớp **contain** có bất kỳ lớp cha nào không. Nếu có, thuật toán sẽ bắt đầu viết mô tả lớp đó; nhưng trong trường hợp này không có lớp cha, vì vậy thuật toán viết **TC_NULL**.

>**0x70: TC_NULL.**

Cuối cùng, thuật toán ghi dữ liệu thực tế liên quan đến lớp **contain**.

**00 00 00 0B: 11**, giá trị của containerVersion.

# Quá trình deserialization trong java diễn ra như thế nào?

Phần trên mình đã giới thiệu chi tiết cách mà quá trình serilaization hoạt động. Vậy còn quá trình ngược lại (deserialization) thì diễn ra như thế nào?. Đã bao giờ bạn thắc mắc làm thế nào mà JVM tạo được đối tượng mà không gọi constructor (hàm tạo của chúng )? Ok. Và đây là chính xác những gì diễn ra:

1. Bất kì lớp cha nào của đối tượng phải serializable và nếu không serializable thì phải tồn tại constructor mặc định (không tham số ).
1. Trong quá trình deserializaion, lớp cha của lớp chứa đối tượng sẽ được tìm kiếm đầu tiên cho đến khi tìm thấy 1 lớp không được serializable và tồn tại constructor mặc định. JVM sẽ khởi tạo đối tượng rỗng của lớp đó.
1. Nếu tất cả các lớp cha đều được serializble thì JVM sẽ tiếp cận lớp Object và tạo đối tượng của lớp đó. 
1. Sau khi gọi constructor mặc định của lớp đó JVM sẽ không gọi bất kì constructor nào khác nữa.
1. Sau khi tạo đối tượng rỗng, JVM sẽ thiết lập trường static của nó trước, sau đó đọc chuỗi byte và sử dụng metadata của lớp để thiết lập kiểu dữ liệu cũng như các thông tin khác của đối tượng.
1. Tiếp theo JVM gọi phương thức readObject() mặc định(nếu chưa bị ghi đè ngược lại sẽ gọi phương thức readObject() đã được ghi đè ) có nhiệm vụ đặt các giá trị từ byte stream vào đối tượng.
1. Sau khi readObject() hoàn thành thì đối tượng mới được tạo ra. Lưu í cần phải ép kiểu về đối tượng chúng ta serialized. 

# Tham khảo
[https://www.infoworld.com/article/2072752/the-java-serialization-algorithm-revealed.html](https://www.infoworld.com/article/2072752/the-java-serialization-algorithm-revealed.html)

[https://www.infoworld.com/article/2072752/the-java-serialization-algorithm-revealed.html](https://www.infoworld.com/article/2072752/the-java-serialization-algorithm-revealed.html)