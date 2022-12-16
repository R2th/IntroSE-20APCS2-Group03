### I. Introduce 
- Chào mọi người, kết nối Bluetooth là điều không còn gì xa lạ, trong bài viết này, chúng ta sẽ cùng tìm hiểu workflow , đồng thời tìm cách xây dựng một ứng dụng sử dụng phương thức truyền dữ liệu giữa 2 devices thông qua bluetooth bằng Kotlint.
- Ứng dụng của chúng ta sẽ đơn giản, tập trung vào chức năng truyền dữ liệu và có mô tả như sau: người dùng nhập một chuỗi string đầu vào và gửi nó đến cùng một ứng dụng trên thiết bị android khác, phía nhận sẽ đọc tin nhắn và gắn nó vào màn hình. 
### II. Workflow
- Nhìn chung, truyền dữ liệu qua bluetooth không có nhiều khác biệt so với truyền qua các kênh khác:
    - Bên nhận tạo ra một server chờ đợi để clients kết nối
    - Bên gửi bắt đầu kết nối, sau đó cả hai bên sẽ nhận được sockets để truyền dữ liệu
    - Cuối cùng, các bên trao đổi dữ liệu
 - Trong thế giới của Bluetooth, nó thường được thực hiện như mô tả ở sơ đồ dưới đây: 
 
 ![](https://images.viblo.asia/731f086b-2fdc-4d96-88cd-8b607553011b.png)

- Bên nhận tạo ra một Server Controller chạy trong thread riêng của nó, sau đó Server Controller sẽ tạo ra một service listener xác định bởi tên và UUID. Clients sau đó sẽ sử dụng UUID để truy cập vào một Service cụ thể. Listener tạo ra một Server Socket được đặt vào trạng thái chờ đợi, sử dụng method accept().
- Mặt khác, Client sẽ khởi tạo một kết nối đến một device được chỉ định mà đang cố gắng truy cập tới Service, được xác định bởi UUID. Khi một kết nối được thành lập, method accept() được gọi, sẽ trả về một đối tượng socket, được sử dụng để tạo ra một Server thread để giao tiếp với Client.
- Khi trao đổi kết thúc, cả hai bên cần đóng socket.
### III. Implementation

 Với flow bên trên, chúng ta sẽ cùng implement nó với Kotlint.
- Trước tiên, hãy tạo ra một lớp BluetoothServerController:
```
val uuid: UUID = UUID.fromString("8989063a-c9af-463a-b3f1-f21d9b2b827b")
class BluetoothServerController(activity: MainActivity) : Thread() {
    private var cancelled: Boolean
    private val serverSocket: BluetoothServerSocket?
    private val activity = activity

    init {
        val btAdapter = BluetoothAdapter.getDefaultAdapter()
        if (btAdapter != null) {
            this.serverSocket = btAdapter.listenUsingRfcommWithServiceRecord("test", uuid) // 1
            this.cancelled = false
        } else {
            this.serverSocket = null
            this.cancelled = true
        }

    }

    override fun run() {
        var socket: BluetoothSocket

        while(true) {
            if (this.cancelled) {
                break
            }

            try {
                socket = serverSocket!!.accept()  // 2
            } catch(e: IOException) {
                break
            }

            if (!this.cancelled && socket != null) {
                Log.i("server", "Connecting")
                BluetoothServer(this.activity, socket).start() // 3
            }
        }
    }

    fun cancel() {
        this.cancelled = true
        this.serverSocket!!.close()
    }
}
```
- Có ba điều then chốt trong đoạn code trên cho phép Server (được đánh dấu với các số comment)  :
1. Tạo server socket,  xác định bởi các uuid, trong class constructor
2. Khi thread thực thi bắt đầu, chờ kết nối Client sử dụng phương thức accept()
3. Khi kết nối với clientđược thành lập, method accept() sẽ trả về một BluetoothSocket, tham chiếu và cho phép truy cập vào các luồng input và output.  Chúng ta sẽ sử dụng socket này để start thread Server
- Tiếp theo, chúng ta sẽ tạo class BluetoothServer như bên dưới: 
```
class BluetoothServer(private val activity: MainActivity, private val socket: BluetoothSocket): Thread() {
    private val inputStream = this.socket.inputStream
    private val outputStream = this.socket.outputStream

    override fun run() {
        try {
            val available = inputStream.available()
            val bytes = ByteArray(available)
            Log.i("server", "Reading")
            inputStream.read(bytes, 0, available)
            val text = String(bytes)
            Log.i("server", "Message received")
            Log.i("server", text)
            activity.appendText(text)
        } catch (e: Exception) {
            Log.e("client", "Cannot read data", e)
        } finally {
            inputStream.close()
            outputStream.close()
            socket.close()
        }
    }
}
```
- Bên trong phương thức run của class, chúng ta chỉ cần đọc một message từ client và add nó vào screen. 
- Và cuối cùng, ta sẽ tạo class Client như sau:
```
class BluetoothClient(device: BluetoothDevice): Thread() {
    private val socket = device.createRfcommSocketToServiceRecord(uuid)

    override fun run() {
        Log.i("client", "Connecting")
        this.socket.connect()

        Log.i("client", "Sending")
        val outputStream = this.socket.outputStream
        val inputStream = this.socket.inputStream
        try {
            outputStream.write(message.toByteArray())
            outputStream.flush()
            Log.i("client", "Sent")
        } catch(e: Exception) {
            Log.e("client", "Cannot send", e)
        } finally {
            outputStream.close()
            inputStream.close()
            this.socket.close()
        }
    }
}
```
- Nó chỉ đơn giản là cố gắng truy cập service của các device được chọn, được xác định một lần nữa thông qua UUID. Sau khi kết nối, sử dụng luồng đầu ra của socket để gởi một tin nhắn mà người dùng đã gõ vào hộp thoại input 
- Để kích hoạt server, chỉ cần chạy như sau trong phương thức onCreate của activity: 
```
BluetoothServerController(this).start()
```  
- Để gửi tin nhắn, mã ứng dụng sẽ cung cấp cho người dùng danh sách các thiết bị khả dụng và một khi người dùng đã chọn thiết bị nơi họ muốn gửi tin nhắn trong câu hỏi mục chọn xử lý sự kiện sẽ thực hiện cuộc gọi sau:
```
BluetoothClient(device).start()
```
- Các biến device ở đây giữ các object của class BluetoothDevice, đại diện cho device được chọn bởi user. 
- Source code đầy đủ ở [đây](https://github.com/ikolomiyets/bluetooth-test), các bạn có thể tham khảo.
### IV. Conclusion 
- Như vậy chúng ta đã tìm hiểu được flow hoạt động cũng như thực hiện xong các bước để xây dựng nên một ứng dụng, sử dụng phương thức truyền dữ liệu thông qua kết nối bluetooth.
-  Bài viết có sử dụng nguồn tham khảo: https://medium.com/@ikolomiyets/transferring-data-between-android-devices-over-bluetooth-with-kotlin-3cab7e5ca0d2
-  Cảm ơn các bạn đã theo dõi, xin chào và hẹn gặp lại.