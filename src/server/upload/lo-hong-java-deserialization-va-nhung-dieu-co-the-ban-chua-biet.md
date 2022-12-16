# Tản mạn 
Về lỗ hổng Java deserialization này mình cũng có tìm hiểu một thời gian rồi nhưng mình chưa viết bài viết nào tổng hợp lại về nó cả. Hơn nữa thì có một số bài viết khác cũng khá là đầy đủ về lỗ hổng này cũng như cách tiếp cận về nó như [series gồm 3 phần The Art of Deserialization Gadget Hunting](https://sec.vnpt.vn/2020/02/co-gi-ben-trong-cac-gadgetchain/). Hôm nay thì mình sẽ giới thiệu về lỗ hổng java deserialization thông qua làm một bài ctf vòng loại cuộc thi sinh viên với an toàn thông tin ASIAN năm 2020 do anh [@PeterJson](https://twitter.com/peterjson?s=20) ra đề.  Trước khi đi vào lỗ hổng thì hãy cùng đi lại 1 số khái niệm cơ bản nhé. 
# Serialization là gì?
![](https://images.viblo.asia/9308df85-d2a8-40a0-9127-3d97b9a5756f.png)

Serialization đơn giản chỉ là cơ chế chuyển đổi trạng thái của một đối tượng (object) (giá trị các thuộc tính trong object) thành một mảng byte (byte stream). Mảng byte này đại diện cho class của object, phiên bản của object, và trạng thái của object. Mảng byte này có thể được sử dụng giữa các máy ảo JVM đang chạy cùng code truyền / đọc các object. Ngược lại Deserialization là quá trình xây dựng lại các byte này thành một đối tượng. Nó chủ yếu được sử dụng trong các công nghệ Hibernate, RMI, JPA, EJB và JMS.

# Tại sao Serialization lại cần thiết? 
Hiện nay một ứng dụng điển hình sẽ có nhiều thành phần và sẽ được phân phối trên các hệ thống và mạng khác nhau. Trong Java, mọi thứ được biểu diễn dưới dạng các đối tượng. Nếu hai thành phần Java muốn giao tiếp với nhau, cần phải có một cơ chế để trao đổi dữ liệu. Mỗi đối tượng trong Java sẽ có các kiểu đối tượng khác nhau gây khó khăn trong việc trao đổi dữ liệu. Do đó, cần phải có một giao thức chung chung và hiệu quả để chuyển đối tượng giữa các thành phần. Serialization được định nghĩa cho mục đích này, và các thành phần Java sử dụng giao thức này để chuyển các đối tượng. Như vậy trong Java, khi trao đổi dữ liệu giữa các thành phần khác nhau (giữa các module cùng viết bằng Java) thì dữ liệu được thể hiện dưới dạng byte.Quá trình serilization hoàn toàn độc lập với platform (không phụ thuộc vào hệ điều hành) nên việc chuyển đổi giữa byte và object giữa các module được đảm bảo.

# Lỗ hổng Java deserialization là gì?
Theo như **PortSwigger** thì "Deserialization không an toàn là khi dữ liệu do người dùng kiểm soát được deserialize bởi một trang web. Điều này có khả năng cho phép kẻ tấn công thao túng các đối tượng được serialize để truyền dữ liệu có hại vào code ứng dụng.
Thậm chí có thể thay thế một đối tượng được serializee bằng một đối tượng của một lớp hoàn toàn khác. Đáng báo động, các đối tượng của bất kỳ lớp nào có sẵn cho trang web sẽ được deserialize và khởi tạo, bất kể lớp nào được mong đợi. Vì lý do này, deserialization không an toàn đôi khi được gọi là lỗ hổng "**object injection**".

Một đối tượng của một lớp không mong muốn có thể gây ra một ngoại lệ. Tuy nhiên, đến lúc này, thiệt hại có thể đã được thực hiện. Nhiều cuộc tấn công dựa trên quá trình deserialization được hoàn thành trước khi quá trình deserialization kết thúc. Điều này có nghĩa là chính quá trình deserialization có thể bắt đầu một cuộc tấn công, ngay cả khi chức năng riêng của trang web không tương tác trực tiếp với đối tượng độc hại".
Tác động của lỗ hổng deserialization không an toàn có thể rất nghiêm trọng bởi vì nó cung cấp một điểm xâm nhập vào hệ thống. Nó cho phép kẻ tấn công sử dụng lại mã ứng dụng hiện có theo những cách có hại, dẫn đến nhiều lỗ hổng khác, thường là thực thi mã từ xa (RCE).

Ngay cả trong trường hợp không thể thực thi mã từ xa, việc deserialize không an toàn có thể dẫn đến leo thang đặc quyền, truy cập tệp tùy ý và tấn công từ chối dịch vụ. 

# Write up ascis_rmi_v1
Bài ctf này rất dễ chủ yếu giới thiệu cho các bạn hướng tiếp cận với lỗ hổng java deserialization mà thôi. Source của bài này các bạn có thể tải tại [đây](https://drive.google.com/file/d/1Gfwhs0K-sNEQtNtHNK2gZz9IDdrpyOHF/view). . Sau khi tải về và giải nén các bạn đọc file `how_to_run.txt` để biết cách build local. Cụ thể

* Build local
* using the given jdk:
* java -jar ascis_service1.jar
* How to comunicate with server?
* java -jar ascis_player.jar [ip] [port] player
* Flag in /home/service/flag.txt, good luck!

Như các bạn thấy thì ta được cung cấp 2 file jar là `ascis_player.jar` và `ascis_service1.jar` đồng thời cũng cho chúng ta luôn file `jdk-8u131`. Về phần cài đặt jdk mình sẽ không nhắc lại nữa. Các bạn tự cài đặt nhé. Vì bài này khá lâu rồi nên mình không lấy được flag cũng như connect đến server được nữa nên mình hướng dẫn làm trên local thôi nhé. Chú ý port ở đây là 1099

![](https://images.viblo.asia/cfd8377f-cc99-4c61-9312-e5a545a5644e.png)

Về cơ bản thì khi ta nhập tên palyer vào sẽ hiện thông báo **WELCOME {player} to ASCIS 2020 !**. OK đến đoạn hay rồi đây. Chúng ta sẽ tiến hành debug bằng công cụ intelij. Đầu tiên các bạn tạo mới 1 project bằng intelij. Sau đó add 2 file jar mà tác giả cung cấp vào lib của project. Sau khi import xong sẽ như thế này

![](https://images.viblo.asia/7be96463-aa0c-496b-8701-30e957c43aa7.png)

Check qua source code của `ascis_service1.java` chú ý tới class `Player`

![](https://images.viblo.asia/3a160e5f-ea82-4fd8-8b40-482c414cb456.png)



Trong class này có 1 method là toString. Nội dung của method là check xem Player có phải admin hay không, nếu là admin thì sẽ thực hiện command `private String logCommand = "echo \"ADMIN LOGGED IN\" > /tmp/log.txt";`. Rõ ràng nếu ta control được giá trị của biến `isAdmin` là true và giá trị của `logCommand` thì ta hoàn toàn có thể RCE được server.

Đến đây thì có lẽ các bạn sẽ có câu hỏi là biến private trong java thì làm sao có thể sửa được. Câu trả lời là có thể được nhé. Chúng ta sẽ dùng reflection để có thể thay đổi giá trị của các biến private. Cụ thể về reflection trong java các bạn tự google tìm hiểu thêm nhé. Ok chúng ta đã biết điểm trigger được RCE rồi, lại vấn đề nữa, làm sao chúng ta có thể đến được lớp này, và cách thức xây dựng payload như thế nào. 

Ở đây ta có nhiều cách để xác định xem là sẽ đi từ đâu đến được method toString này. Quên nhắc 1 chút là về cách khai thác lỗ hổng này là chúng ta đi tìm các phương thức có gọi đến nhau và lắp ghép chúng lại thành 1 chuỗi cuộc gọi phương thức gọi là `gadget chain` . Để có thể hoàn thành chain chúng ta cần quan tâm tới những phương thức mà chúng ta có thể control được các tham số truyền vào.

Quay lại với bài ctf của chúng ta. Như đã nói có nhiều cách để tìm chain đến được method toString kia. Cách mình dùng đó là dùng tool `gadget inspector` để tìm. Về cách hoạt động cũng như modified tool để hoạt động tốt hơn có lẽ mình sẽ có 1 bài viết khác. 

![](https://images.viblo.asia/fe22350f-a937-4f3c-91f2-7b573bc438a9.png)

Sau khi chạy tool chúng ta có kết quả trong 1 file txt

![](https://images.viblo.asia/b40ed9be-be48-4ed5-ac16-9ecf9aed9305.png)

Như vậy để có thể rce được thì source của chúng ta sẽ là class `BadAttributeValueExpException`.  Phân tích kĩ hơn vì sao lại đi từ lớp này, trong intelij các bạn nhảy vào method `readObject` của class `BadAttributeValueExpException`

![](https://images.viblo.asia/21c46457-fa58-41b9-817c-83ddac9bc343.png)

Nếu thay valObj ở đây thành đối tượng của lớp `Player` như vậy khi thực thi code sẽ thành `Player.toString` và command được thực hiện. Để ý thêm 1 điều nữa, là chúng ta đang cố gắng xây dựng 1 đối tượng mà sau khi server thực hiện deserialization payload của chúng ta sẽ được thực thi nên khi gửi lên server chúng ta sẽ sử dụng method `login` thay vì method `sayHello` lí do bởi vì method `login` nhận param là 1 Object. 

![](https://images.viblo.asia/c60dab48-f508-47d2-ad64-41f19772f8b4.png)


Mình đã xây dựng payload như sau, chi tiết mình đã comment trong code. Chú ý ở đây là mình viết lại lớp  `ASCISPlayer` và thay thế trực tiếp các biến như serverIp, serverPort và name để có thể chạy trực tiếp trên Intelij. 

![](https://images.viblo.asia/4e6b66b1-c53d-4d9e-8a0f-d9d58c1ce586.PNG)

Khi chạy chương trình trên màn hình calc đã được bật ra chứng tỏ payload của chúng ta đã làm việc

![](https://images.viblo.asia/e50077e6-17bd-4bf1-9a2c-d598f30764a8.png)

Cần phải nói thêm là ở đây mình thiết lập lại môi trường trên windows nên các bạn làm trên linux có thể thay thế `calc` bằng các command khac như `nslookup` hay `ping` để chứng minh OOB chẳng hạn. Tuy nhiên khi mình tham gia cuộc thi sinh viên với an toàn thông tin ASEAN thì môi trường của tác giả là docker ubuntu. Rất tiếc cho mình đợt đó là mình làm ổn trên local rồi nhưng do không biết serve chạy docker nên mình thử qua OOB không được, mình tưởng là sai hóa ra docker không có sẵn mấy lệnh đó sad :((. Về sau thì được biết là dùng reveseShell Java. Các bạn có thể tham khảo link sau: [https://github.com/welk1n/ReverseShell-Java](https://github.com/welk1n/ReverseShell-Java)

# Tổng kết
Bài viết đến đây là kết thúc, nếu bạn nào nghiêm túc nghiên cứu về lỗ hổng này mình khuyên nên đọc hết series của a Jang bên VNPT [https://sec.vnpt.vn/2020/02/co-gi-ben-trong-cac-gadgetchain/](https://sec.vnpt.vn/2020/02/co-gi-ben-trong-cac-gadgetchain/). Nói rất cụ thể về các bước cũng như debug các gadget chain thông thường. Cũng do có bài viết cụ thể thế này rồi nên 1 số kiến thức mình không có nhắc lại trong bài viết của mình. Hẹn gặp các bạn ở bài viết tiếp theo