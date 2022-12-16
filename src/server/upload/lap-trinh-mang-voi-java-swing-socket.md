Xin chào mọi người trong bài này mình sẽ hướng dẫn các bạn thiết kế ra 1 form đơn giản có gửi nhận dữ liệu với Java Swing + Socket, IDE mình sử dụng là Eclipse mọi người nhé.
### 1. Cài đặt windowbuilder để lập trình giao diện Java Swing
Để cài đặt được windowbuilder trên Eclipse ta chọn Help -> Eclipse Marketplace
![](https://images.viblo.asia/c7fa40e6-52d5-4412-ac77-da3b6df2304b.png)
Sau đó trên thanh tìm kiếm ta gõ tìm "windowbuilder" và nhấn cài đặt. Ở đây mình đã cài đặt rồi nên trạng thái hiển thị sẽ là Installed
![](https://images.viblo.asia/ae3700e0-60b9-4443-8292-bef304ea5f18.png)
Sau khi đã cài đặt xong khi tạo mới 1 file ta nhấn vào package New -> Other
![](https://images.viblo.asia/a46c54ed-a941-45b1-88f5-9a73df3e1103.png)
Tiếp theo ta tìm đến WindowBuilder -> Swing Designer -> JFrame
![](https://images.viblo.asia/9351e1f7-c785-4446-9177-e111da884f87.png)

Ta đặt tên cho file rồi nhấn Finish
![](https://images.viblo.asia/ecec487b-accd-4043-bd0c-69da346bd6a0.png)

Để có thể kéo thả ta chuyển sang tab Designer . Tại đây có rất nhiều thành phần, mọi người có thể lên mạng đọc thêm về các dùng ở đây mình sẽ đi qua nhanh về luồng từ dàn giao diện và kết nối với socket, đầu tiên layout mình sẽ chọn là GridBagLayout, tiếp đó mình kéo thêm 2 JLabel, 1 JtextFeild, 1 JButton![](https://images.viblo.asia/ef9a702c-aac2-46ba-a70c-7fa780ca5db0.png)
Ta click vào từng phần tử để đặt Variable cho dễ thao tác và xử lý trong code
![](https://images.viblo.asia/255f9656-0744-4d66-9825-a77bf717fc1a.png)
Để gán sự kiện click chuột cho nút gửi ta nhấn chuột phải vào nút gửi -> Add event handler -> mouse -> mouseClicked
![](https://images.viblo.asia/0e03d565-999b-4677-8bd6-3c8d16ef75ab.png)
Vầy là đã xong phần giao diện và gán sự kiện đơn giản. Tiếp theo ta sẽ xử lý phần code
### 2. Socket
#### 2.1. Luồng truyền nhận dữ liệu
![](https://images.viblo.asia/c5d00dfc-42eb-446f-a85e-5233292a6c12.png)
#### 2.2. Khởi tạo đầu server
```
        ServerSocket server_socket = new ServerSocket(6543);
		/// Khởi tạo Socket và chấp nhận kết nối từ đối tượng Socket Server.
		Socket socket = server_socket.accept();
		/// Tạo luồng đọc dữ liệu vào từ client
		DataInputStream din = new DataInputStream(socket.getInputStream());
		// Tạo luồng in dữ liệu trả ra cho client
		DataOutputStream dout = new DataOutputStream(socket.getOutputStream());
```
#### 2.3. Nhận tin và phản hồi
```
// Vòng lặp nghe dữ liệu từ client
while (true) {
try {
		String str_in = din.readUTF();
		System.out.println("client says: " + str_in);
		// Trả về kết quả
		dout.writeUTF("Server Received Data:"+str_in);
		dout.flush();
	} catch (IOException e1) {
		// TODO Auto-generated catch block
		status = false;
		e1.printStackTrace();
	}
}
```
#### 2.4. Client kết nối và gửi tin
```
Socket client = new Socket("localhost",6543);
DataOutputStream dout = new DataOutputStream(client.getOutputStream());
DataInputStream din = new DataInputStream(client.getInputStream());
try {
		String message = txtNoiDung.getText().toString();
		dout.writeUTF(message);
		String output = din.readUTF();
		lbKq.setText(output);
} catch (IOException e2) {
		// TODO Auto-generated catch block
		e2.printStackTrace();
}
```
### 3. Source Code
Link: https://github.com/baonv-dev/socket_java_swing