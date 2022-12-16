## 1. GIỚI THIỆU MẠNG MÁY TÍNH

![](https://images.viblo.asia/2b600a47-f91b-47d7-abb0-ba0a114c5684.png)

Mạng máy tính hay hệ thống mạng (tiếng Anh: computer network hay network system), được thiết lập khi có từ 2 máy vi tính trở lên kết nối với nhau để chia sẻ tài nguyên: máy in, máy fax, tệp tin, dữ liệu...
Một máy tính được gọi là tự hoạt (autonomous) nếu nó có thể khởi động, vận hành các phần mềm đã cài đặt và tắt máy mà không cần phải có sự điều khiển hay chi phối bởi một máy tính khác.
Các thành phần của mạng có thể bao gồm:
Các hệ thống đầu cuối (end system) kết nối với nhau tạo thành mạng, có thể là các máy tính hoặc các thiết bị khác. Nói chung hiện nay ngày càng nhiều các loại thiết bị có khả năng kết nối vào mạng máy tính như điện thoại di động, PDA, tivi,...
Môi trường truyền (media) mà các thao tác truyền thông được thực hiện qua đó. Môi trường truyền có thể là các loại dây dẫn (dây cáp), sóng điện từ (đối với các mạng không dây).
Giao thức truyền thông (protocol) là các quy tắc quy định cách trao đổi dữ liệu giữa các thực thể.

## 2. CÁC KIẾN THỨC CƠ BẢN VỀ MẠNG MÁY TÍNH
### 2.1. Mô hình 7 tầng OSI
Mô hình kết nối hệ thống mở được Tổ chức quốc tế chuẩn hóa ISO (International Organizaiton for Standardization) đưa ra nhằm cung cấp một mô hình chuẩn cho các nhà sản xuất và cung cấp sản phẩm viễn thông áp dụng theo để phát triển các sản phẩm viễn thông. Ý tưởng mô hình hóa được tạo ra còn nhằm hổ trợ cho việc kết nối giữa các hệ thống và modun hóa các thành phần phục vụ viễn thông.
2.1.1. Chức năng của mô hình OSI:
-	Cung cấp kiến thức về hoạt động của kết nối liên mạng.
-	Đưa ra trình tự công việc để thiết lập và thực hiện một giao thức cho kết nối các thiết bị trên mạng.
Mô hình OSI còn có một số thuận lợi sau:
-	Chia nhỏ các hoạt động phức tạp của mạng thành các phần công việc đơn giản.
-	Cho phép các nhà thiết kế có khả năng phát triển trên từng modun chức năng.
-	Cung cấp các khả năng định nghĩa các chuẩn giao tiếp có tính tương thích cao ”plug and play” và tích hợp nhiều nhà cung cấp sản phẩm.
2.1.2. Cấu trúc mô hình OSI
Mô hình cấu trúc OSI gồm 7 lớp (level), mỗi lớp thực hiện các chức năng riêng cho hoạt động kết nối mạng.

![](https://images.viblo.asia/7d465de0-f84f-471d-81ce-dc713b5ac680.png)

Mô tả 7 lớp OSI. 4 lớp đầu định nghĩa cách thức cho đầu cuối thiết lập kết nối với nhau để trao đổi dữ liệu. 3 lớp trên dùng để phát triển các ứng dụng để đầu cuối kết nối với nhau và người dùng.
Các lớp trên
-	Application layer : đây là lớp cao nhất trong mô hình. Nó là nơi mà người sử dụng hoặc kết nối các chương trình ứng dụng với các thủ tục cho phép truy nhập vào mạng.
-	Presentation layer : Lớp presentation cung cấp các mã và chức năng để chuyển đổi mà được cung cấp bởi lớp ứng dụng. Các chức năng đó đảm bảo rằng dữ liệu từ lớp ứng dụng trong  một hệ thống có thể được đọc bởi lớp ứng dụng của một hệ thống khác. VD : dùng để mã hóa dữ liệu từ lớp ứng dụng: như mã hóa ảnh jpeg, gif. Mã đó cho phép ta có thể hiện lên trang web.
-	Session layer : được sử dụng để thiết lập, duy trì và kết thúc phiên làm việc giữa các lớp presentation. Việc trao đổi thông tin ở lớp này bao gồm yêu cầu dịch vụvà đáp ứng yêu cầu của các ứng dụng trên thiết bị khác.
Các lớp dưới
4 lớp dưới của mô hình OSI sử dụng để định nghĩa làm thế nào để dữ liệu được truyền đi trong các dây nối vật lý, các thiết bị mạng và đi đến trạm đầu cuối, cuối cùng là đến các lớp ứng dụng. Ở đây ta chỉ quan tâm đến 4 lớp cuối. Và sẽ xem xét từng lớp một cách chi tiết giao thiếp giữa các lớp trong mô hình OSI:
Sử dụng phương pháp protocal stack để kết nối giữa hai thiết bị trong mạng. Protocalstack là một tập hợp các quy định dùng để định nghĩa làm thế nào để dữ liệu truyền qua mạng.

![](https://images.viblo.asia/52baedc3-489d-49ae-a000-08acfaf288d7.png)

### 2.2	Họ giao thức TCP/IP

![](https://images.viblo.asia/c8eae46b-0d73-4cba-8871-f00719a6031c.png)

Application: Xác nhận quyền, nén dữ liệu và các dịch vụ cho người dùng.
Transport: Xử lý dữ liệu giữa các hệ thống và cung cấp việc truy cập mạng cho các ứng dụng.
Network: Tìm đường cho các packet.
Link: Mức OS hoặc các thiết bị giao tiếp mạng trên một máy tính.

Một số điểm khác nhau của TCP/IP và mô hình OSI
-	Lớp ứng dụng trong TCP/IP xử lý chức năng của lớp 5,6,7 trong mô hình OSI
-	Lớp transport trong TCP/IP cung cấp cớ chế UDP truyền không tin cậy, transport trong OSI luôn đảm bảo truyền tin cậy
-	TCP/IP là một tập của các protocols (một bộ giao thức)
-	TCP/IP xây dựng trước OSI

Quy trình đóng gói dữ liệu trong mô hình TCP/IP như sau:

![](https://images.viblo.asia/d92e9d96-7eb5-455c-aa7c-98d581cf833d.png)

### 2.3	So sánh giữa hai giao thức TCP và UDP

![](https://images.viblo.asia/f50b6955-b4d8-469a-986e-4a2f70fca094.png)

TCP (Transmission Control Protocol - "Giao thức điều khiển truyền vận")
Là một trong các giao thức cốt lõi của bộ giao thức TCP/IP. Sử dụng TCP, các ứng dụng trên các máy chủ được nối mạng có thể tạo các "kết nối" với nhau, mà qua đó chúng có thể trao đổi dữ liệu hoặc các gói tin. Giao thức này đảm bảo chuyển giao dữ liệu tới nơi nhận một cách đáng tin cậy và đúng thứ tự. TCP còn phân biệt giữa dữ liệu của nhiều ứng dụng (chẳng hạn, dịch vụ Web và dịch vụ thư điện tử) đồng thời chạy trên cùng một máy chủ.
UDP (User Datagram Protocol)
Là một trong những giao thức cốt lõi của giao thức TCP/IP. Dùng UDP, chương trình trên mạng máy tính có thể gởi những dữ liệu ngắn được gọi là datagram tới máy khác. UDP không cung cấp sự tin cậy và thứ tự truyền nhận mà TCP làm,  các gói dữ liệu có thể đến không đúng thứ tự hoặc bị mất mà không có thông báo. Tuy nhiên UDP nhanh và hiệu quả hơn đối với các mục tiêu như kích thước nhỏ và yêu cầu khắt khe về thời gian. Do bản chất không trạng thái của nó nên nó hữu dụng đối với việc trả lời các truy vấn nhỏ với số lượng lớn người yêu cầu.

## 3. LẬP TRÌNH MẠNG .NET FRAMEWORK
### 3.1. Socket không hướng kết nối (UDP Socket)
Socket là một giao diện lập trình ứng dụng (API) mạng.
Thông qua giao diện này chúng ta có thể lập trình điều khiển việc truyền thông giữa hai máy sử dụng các giao thức mức thấp là TCP, UDP…
-	Các loại socket
    * Socket hướng kết nối (TCP ).
    * Socket không hướng kết nối (UDP).
    * Raw Socket.

![](https://images.viblo.asia/74a8a25a-50f7-466c-9273-c34d121503c4.png)

-	Đặc điểm của Socket không hướng kết nối (UDP)
    * Hai tiến trình liên lạc với nhau không kết nối trực tiếp.
    * Thông điệp gửi đi phải kèm theo địa chỉ của người nhận.
    * Thông điệp có thể gửi nhiều lần.
    * Người gửi không chắc chắn thông điệp tới tay người nhận.
    * Thông điệp gửi sau có thể đến đích trước thông điệp gửi trước đó.
-	Số hiệu của cổng Socket
    * Để có thể thực hiện các cuộc giao tiếp, một trong hai quá trình phải công bố số hiệu cổng của socket mà mình sử dụng.
    * Mỗi cổng giao tiếp thể hiện một địa chỉ xác định trong hệ thống. Khi quá trình được gán một số hiệu cổng, nó có thể nhận dữ liệu gửi đến cổng này từ các quá trình khác.
    * Quá trình còn lại cũng yêu cầu tạo ra một socket.

![](https://images.viblo.asia/a61bbd79-36ae-4559-8358-648853ec3db7.png)

-	Rất nhiều ứng dụng trên Internet sử dụng UDP. Dựa trên các ưu và nhược điểm của UDP chúng ta có thể kết luận UDP có ích khi:
Sử dụng cho các phương thức truyền broadcasting và multicasting khi chúng ta muốn truyền tin với nhiều host.
    * Kích thước datagram nhỏ
    * Không cần thiết lập liên kết
    * Không cần truyền lại các gói tin
    * Ứng dụng không gửi các dữ liệu quan trọng
    * Băng thông của mạng đóng vai trò quan trọng
Lớp UDPClient
Giao thức UDP (User Datagram Protocol hat User Define Protocol) là một giao thức phi kết nối (Connectionless) có nghĩa là một bên có thể gửi dữ liệu cho bên kia mà không cần biết là bên đó đã sẵn sang hay chưa? (Nói cách khác là không cần thiết lập kết nối giữa hai bên khi tiến hành trao đổi thông tin). Giao thức này không tin cậy bằng giao thức TCP nhưng tốc độ lại nhanh và dễ cài đặt. Ngoài ra, với giao thức UDP ta còn có thể gửi các gói tin quảng bá (Broadcast) cho đồng thời nhiều máy.
Trong .NET, lớp UDPClient(nằm trong System.Net.Sockets) đóng gói các chức năng của giao thức UDP.

| Method |  |
| -------- | -------- | 
| UdpClient()     | Tạo mới đối tượng (thể hiện) mới của lớp UDPClient. | 
| UdpClient(AddressFamily)     | Tạo một đối tượng (thể hiện) mới của lớp UDPClient. Thuộc một dòng địa chỉ (AddressFamily) được chỉ định.    |
| UdpClient(Int32) | Tạo một UdpClient và gắn (bind) một cổng cho nó. |
| UdpClient(IPEngPoint) |Tạo một UdpClient và gắn (bind) một IPEndPoint (gán địa chỉ IP và cổng) cho nó.|
| UdpClient(Int32, AddressFamily)|Tạo một UdpClient và gán số hiệu cổng AddressFamily|
| UdpClient(String, Int32) |Tạo một UdpClient và thiết lập một trạm từ xa mặc định.|

| Method |  |
| -------- | -------- | 
| BeginReceive     | Nhận dữ liệu không đồng bộ từ máy ở xa. | 
| BeginSend     | Gửi không đồng bộ dữ liệu tới máy ở xa. | 
| Close     | Đóng kết nối| 
| Connect     | Thiết lập một Default remote host. | 
| EndReceive     | Kết thúc nhận dữ liệu không đồng bộ ở trên. | 
| EndSend     | Kết thúc việc gửi dữ liệu không đồng bộ ở trên. | 
| Receive     | Nhận dữ liệu (đồng bộ) do máy ở xa gửi. (Đồng bọ có nghĩa là các lệnh ngay sau lệnh Receive chỉ được thực thi nếu Receive đã nhận được dữ liệu về. Còn nếu chưa nhận được-dù chỉ một chút-thì nó vẫn cứ chờ (blocking)). | 
| Send     | Gửi dữ liệu (đồng bộ) cho máy ở xa. |

## 4. XÂY DỰNG ỨNG DỤNG CLIENT/SERVER NHẬN HÌNH ẢNH TỪ CAMERA GỬI VỀ MÁY TÍNH
Method gửi ảnh từ Camera lên Server.
```
// Gửi ảnh từ camera lên Server
private void GuiDl()
        {
            while (true)
            {
                try
                {
                    UdpClient send = new UdpClient();
                    IPEndPoint iepRemote = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 6969);
                    byte[] data1=new byte[1024];
                    string camera = "ca1";
                    byte[] data = new byte[1024];
                    data = Encoding.ASCII.GetBytes(camera);
                    if (anh != null)
                    {
                        try
                        {
                            Image tam = ResizeByWidth(anh, 100);
                            data1 = imageToByteArray(tam);
                            byte[] data2 = Combine(data, data1);
                            client.send(data2);
                            data2 = null;
                            send.Close();
                        }catch (Exception e)  {}
                   }
                }catch (Exception e) {}
                Thread.Sleep(sleep);
            }
        }

```

Method cắt ảnh.
```
public Image ResizeByWidth(Image img, int width)
{
     // lấy chiều rộng và chiều cao ban đầu của ảnh
     int originalW = img.Width;
     int originalH = img.Height;
     // lấy chiều rộng và chiều cao mới tương ứng với chiều rộng truyền vào của ảnh (nó sẽ giúp ảnh của chúng ta sau khi resize vần giứ được độ cân đối của tấm ảnh
     int resizedW = width;
     int resizedH = (originalH * resizedW) / originalW;
     // tạo một Bitmap có kích thước tương ứng với chiều rộng và chiều cao mới
     Bitmap bmp = new Bitmap(resizedW, resizedH);

     // tạo mới một đối tượng từ Bitmap
     Graphics graphic = Graphics.FromImage((Image)bmp);
     graphic.InterpolationMode = InterpolationMode.High;

     // vẽ lại ảnh với kích thước mới
     graphic.DrawImage(img, 0, 0, resizedW, resizedH);

     // gải phóng resource cho đối tượng graphic
     graphic.Dispose();
     // trả về anh sau khi đã resize
     return (Image)bmp;
}

```

Method chuyển ảnh thành byte
```
//Chuyển ảnh thành byte
private byte[] imageToByteArray(Image imageIn)
{
     MemoryStream ms = new MemoryStream();
     imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
     return ms.ToArray();
}

```

Server nhận và gửi dữ liệu.
```
String loi = "loi";
String kiemtra = "";
String[] chuoi = null;
Program p = new Program();
//Nhận dữ liệu từ Client gửi lên
UdpClient receiver = new UdpClient(6969);
IPEndPoint iep = new IPEndPoint(IPAddress.Any, 0);
byte[] data = new byte[1024];
data = receiver.Receive(ref iep);
kiemtra = Encoding.ASCII.GetString(data);
String moi = kiemtra;
kiemtra = kiemtra.Substring(0, 3);
Console.WriteLine("nhan duoc du lieu tu Client {0}", kiemtra );
if (kiemtra.Equals("log"))
{
       //XỬ lý chuổi khi đăng nhập
       chuoi = p.Cahtchuoi(data);
       //Kiểm tra CSDL
       data = p.Kiemtracsdl(chuoi[0], chuoi[1]);
}
//Gửi dữ liệu về Client
iep = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 9696);
receiver.Send(data, data.Length, iep);
kiemtra = null;
while (true)
{
        try
        {
               //Nhận dữ liệu từ ClientCamera gửi lên
               data = receiver.Receive(ref iep);
                    
               kiemtra = Encoding.ASCII.GetString(data);
               kiemtra = kiemtra.Substring(0, 3);
               Console.WriteLine("nhan duoc du lieu tu Client {0}", data.Length);
               if (kiemtra.Equals("log"))
               {
                       //XỬ lý chuổi khi đăng nhập
                        chuoi = p.Cahtchuoi(data);
                        //Kiểm tra CSDL
                        data = p.Kiemtracsdl(chuoi[0], chuoi[1]);
                }
                //Gửi dữ liệu về ClientPhone
                iep = new IPEndPoint(IPAddress.Parse("127.0.0.1"), 9696);
                receiver.Send(data, data.Length, iep);
                kiemtra = null;
         }
         catch (Exception e) { }      
}

```

Method nhận dữ liệu từ Server gửi đến
```
//Nhận dữ liệu từ Server gửi đến
        private void NhanDl()
        {
            while (true)
            {
                try
                {
                    byte[] tencam = null;
                    byte[] data = clPhone.Receive(Port);
                    //Chuyển byte thành chuỗi
                    String kiemtra = Encoding.ASCII.GetString(data);
                    int m = data.Length;
                    //Lấy tên Camera
                    tencam = data.Take(3).ToArray();
                    //Lấy dữ liệu ảnh
                    data = data.Skip(3).Take(m - 3).ToArray();
                    String ten = Encoding.ASCII.GetString(tencam);
                    string kiemtra1 = kiemtra.Substring(0, 3);
                    String chuoi = kiemtra.Substring(3);
                    byte[] data1 = Encoding.ASCII.GetBytes(chuoi);
                    //Kiểm tra dữ liệu nhận về
                    if (!(kiemtra1.Equals("tat"))&&ten.Equals("ca1"))
                    {
                        //Hiển thị ảnh lên PictureBox
                        pictureBox1.Image = byteArrayToImage(data);
                    }
                }
                catch (Exception e) { }
            }
        }

```

Method chuyển byte thành ảnh
```
private Image byteArrayToImage(byte[] byteArrayIn)
        {
            Image returnImage = null;
            try
            {
                MemoryStream ms = new MemoryStream(byteArrayIn);
                returnImage = Image.FromStream(ms);     
            }
            catch (Exception e) { }
            return returnImage;
        }

```

## 5. DEMO
### CLIENT 1

![](https://images.viblo.asia/13d6885f-316e-45c5-bbea-57a62775dddb.png)
![](https://images.viblo.asia/6d71c3ff-11dc-4492-af48-6879df461654.png)

### SERVER
![](https://images.viblo.asia/d27a19fc-a57e-4c14-88fa-06307aaaa05b.png)

### CLIENT 2

![](https://images.viblo.asia/ee3010f6-8d04-4819-b97d-5a41cd30dc8d.png)