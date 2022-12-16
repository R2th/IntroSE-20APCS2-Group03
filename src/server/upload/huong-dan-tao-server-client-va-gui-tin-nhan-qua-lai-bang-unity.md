![](https://images.viblo.asia/c725e3a8-b034-4663-8163-c46e494c50d7.jpg)

Chào các bạn, hôm nay mình xin giới thiệu với các bạn cách tạo 1 ứng dụng có thể gửi tin nhắn với nhau bằng unity.

Ở trong khuôn khổ bài viết này, mình chỉ giới hạn ở việc hướng dẫn cách tạo và gửi 1 tin nhắn cơ bản, nhưng từ bài viết này mình tin các bạn có thể ứng dụng nó vào rất nhiều dự án khác nhau, nhất là những dự án làm game cần server và client mà lại chỉ biết dev bằng unity ;)

ok, chúng ta bắt đầu nhé!

Bài viết này chúng ta sẽ sử dụng Unity Networking (UNET) để thuận tiện cho quá trình phát triển.

Bước 1: Tạo kiểu dữ liệu truyền tin.
- Chúng ta cần tạo ra 1 kiểu tin nhắn để client và server có thể sử dụng và đọc ra dữ liệu trong đó.
- Nó được kế thừa từ class MessageBase của UNET.

```
using UnityEngine.Networking;

public class DDCMessage : MessageBase
{
    public string message;
}
```

Bước 2: Tạo server.

Chúng ta sẽ tạo ra server với :
- Cổng kết nối là 9999 (tùy bạn muốn sử dụng cổng nào, yêu cầu không được có 2 server trên 1 mạng có cùng 1 cổng đang bật).
- Giới hạn số client có thể đồng thời kết nối tới là 10 (việc giới hạn cũng tùy nhu cầu và mục đích sử dụng của bạn).
- Việc gửi tin sẽ được quy định bằng 1 giá trị gọi là MsgType (Ngoài những MsgType mặc định như connect, disconnect,... chúng ta có thể tự thêm những ID mình muốn để quản lý).
- Quản lý các tin nhắn trả về bằng cách đăng ký các Handler để nhận biết các loại tin trả về khác nhau.

```
using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class Server : MonoBehaviour {

    int port = 9999;
    int maxCon = 10;

    // roomID sử dụng để gửi nhận tin nhắn giữa server và client
    short roomID = 1234;

    void Start () {
        CreateServer();
    }    

    void CreateServer() {
        // Đăng ký quản lý các sự kiện và tin nhắn trả về
        RegisterHandlers ();

        var config = new ConnectionConfig ();
        // Thêm các kênh dịch vụ được hỗ trợ.
        config.AddChannel (QosType.ReliableFragmented);
        config.AddChannel (QosType.UnreliableFragmented);

        var ht = new HostTopology (config, maxCon);

        if (!NetworkServer.Configure (ht)) {
            Debug.Log ("Không tạo được máy chủ, lỗi do config.");
            return;
        } else {
            // Tạo cổng kết nối
            if(NetworkServer.Listen (port))
                Debug.Log ("Server tạo thành công, cổng kết nối: " + port);   
            else
                Debug.Log ("Không thể tạo server trên cổng kết nối: " + port);    
        }
    }

    void OnApplicationQuit() {
        NetworkServer.Shutdown ();
    }

    private void RegisterHandlers () {
        // Unity có các tin nhắn trả về khác nhau theo MsgType
        NetworkServer.RegisterHandler (MsgType.Connect, OnClientConnected);
        NetworkServer.RegisterHandler (MsgType.Disconnect, OnClientDisconnected);

        // Tin nhắn nhận được từ roomID sẽ được đưa tới OnMessageReceived.
        NetworkServer.RegisterHandler (roomID, OnMessageReceived);
    }

    // Khi có 1 kết nối thành công tới, hàm này sẽ được gọi.
    void OnClientConnected(NetworkMessage netMessage)
    {
        // Bạn có thể tạo 1 tin nhắn gửi lại cho client để chúc mừng họ đã kết nối thành công.
        DDCMessage messageContainer = new DDCMessage();
        messageContainer.message = "Chúc mừng bạn tới với thế giới này!";

        // Chỉ gửi tin nhắn cho chính client vừa kết nối tới bằng connectionId
        NetworkServer.SendToClient(netMessage.conn.connectionId,roomID,messageContainer);

        // Hoặc bạn có thể tạo 1 nhắn nhắn thông báo cho tất cả những client khác biết về việc có 1 client vừa kết nối tới.
        messageContainer = new DDCMessage();
        messageContainer.message = "Thế giới vừa đón thêm 1 thành viên mới!";

        // Gửi tin nhắn tới tất cả những client đã kết nối tới roomID này.
        NetworkServer.SendToAll(roomID,messageContainer);
    }

    // Khi có 1 kết nối bị ngắt thì hàm này sẽ được gọi
    void OnClientDisconnected(NetworkMessage netMessage)
    {
        
    }

    // Bạn có thể gửi và nhận bất kì loại tin nào miễn sao nó được kế thừa từ MessageBase
    // Client và server có thể được viết bởi những người khác nhau, nhưng chúng cần được sử dụng gói tin giống nhau, như ví dụ bài này là DDCMessage
    void OnMessageReceived(NetworkMessage netMessage)
    {
        var objectMessage = netMessage.ReadMessage<DDCMessage>();
        Debug.Log("Bạn vừa nhận được tin nhắn: " + objectMessage.message);
    }
}
```

Bước 3: Tạo client.

Chúng ta sẽ tạo ra client với :
- Cổng kết nối là 9999 (Cần phải đặt cổng giống với server mới có thể kết nối).
- Địa chỉ mạng (IP) cần được sử dụng để client có thể biết kết nối tới đâu để tìm thấy server (chính là ip của server).
- Việc gửi tin sẽ được quy định bằng 1 giá trị gọi là MsgType (Ngoài những MsgType mặc định như connect, disconnect,... chúng ta có thể tự thêm những ID mình muốn để quản lý).
- Quản lý các tin nhắn trả về bằng cách đăng ký các Handler để nhận biết các loại tin trả về khác nhau.

```
using System;
using UnityEngine;
using UnityEngine.Networking;


public class Client : MonoBehaviour
{
    int port = 9999;
    string ip = "192.168.2.3";

    // roomID sử dụng để gửi nhận tin nhắn giữa server và client
    short roomID = 1234;

    // Tạo ra đối tượng client
    NetworkClient client;

    public Client ()
    {
        CreateClient();
    }

    void CreateClient()
    {
        var config = new ConnectionConfig ();

        // Thêm các kênh dịch vụ được hỗ trợ.
        config.AddChannel (QosType.ReliableFragmented);
        config.AddChannel (QosType.UnreliableFragmented);

        // Tạo client và config cho nó.
        client = new NetworkClient ();
        client.Configure (config,1);

        // Đăng ký quản lý các sự kiện và tin nhắn trả về
        RegisterHandlers();

        // Kết nối tới server bằng IP và Port
        client.Connect (ip, port);
    }

    void RegisterHandlers () {
        // Tin nhắn nhận được từ roomID sẽ được đưa tới OnMessageReceived.
        client.RegisterHandler (roomID, OnMessageReceived);
        
        // Unity có các tin nhắn trả về khác nhau theo MsgType
        client.RegisterHandler(MsgType.Connect, OnConnected);
        client.RegisterHandler(MsgType.Disconnect, OnDisconnected);
    }

    // Khi có 1 kết nối thành công tới, hàm này sẽ được gọi.
    void OnConnected(NetworkMessage message) {        
        // Bạn có thể tạo 1 tin nhắn gửi cho server để nói rằng bạn đã sẵn sàng cho những hành giao tiếp tiếp theo.
        DDCMessage messageContainer = new DDCMessage();
        messageContainer.message = "Tôi đã sẵn sàng giao tiếp!";

        // Gửi tới server thông qua roomID
        client.Send(roomID,messageContainer);
    }

    // Khi có 1 kết nối bị ngắt thì hàm này sẽ được gọi
    void OnDisconnected(NetworkMessage message) {

    }

    // Tin nhắn nhận được từ server sẽ được quản lý tại đây.
    void OnMessageReceived(NetworkMessage netMessage)
    {
        var objectMessage = netMessage.ReadMessage<DDCMessage>();

        Debug.Log("Bạn vừa nhận được tin nhắn: " + objectMessage.message);
    }
}
```

Sau bài này, bạn đã có thể tự tạo cho mình cấu trúc game server client, và cũng đã biết cách gửi, nhận tin nhắn giữa client và server, mình hi vọng nó có thể được các bạn ứng dụng nhiều hơn nữa trong các dự án sắp tới.
Chúc các bạn thành công!

Bài viết được tham khảo nguồn: https://riptutorial.com/unity3d/example/20116/creating-a-server--a-client--and-sending-a-message-