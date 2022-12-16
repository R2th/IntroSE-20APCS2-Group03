Trong bài viết này mình sử dụng websocket trong java để tạo ứng dụng chat, trong bài viết này tôi sẽ hướng dẫn cách tạo máy chủ/máy khách(mở, đóng session, gửi/nhận message....) . Cách gửi tin mã hoá/giải mã
# Các thư viện sử dụng
## java lib
* [javax.websocket](https://docs.oracle.com/javaee/7/api/javax/websocket/package-summary.html)
* [org.projectlombok](https://projectlombok.org/)
* [jsonp](https://javaee.github.io/jsonp/)
## server lib
[org.glassfish.tyrus](https://tyrus-project.github.io/)
Bên cạnh sử dụng lib trên bạn có thể sử dụng tomcat, jetty...
Nào giờ bắt đầu...
# Data model
## Dữ liệu tin nhắn
```
package io.github.ngocitbk.websocket.model;

import lombok.Data;

import java.util.Date;

@Data
public class Message {

    private String content;
    private String sender;
    private Date received;
}
```

**Decoder**

## Messages sẽ được mã hoá/giải mã bằng JSON format truyền giữa client và server
```
package io.github.ngocitbk.websocket.model;

import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import java.io.StringReader;
import java.util.Date;

public class MessageDecoder implements Decoder.Text<Message> {

    @Override
    public void init(final EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public Message decode(final String textMessage) throws DecodeException {
        Message message = new Message();
        JsonObject jsonObject = Json.createReader(new StringReader(textMessage)).readObject();
        message.setContent(jsonObject.getString("message"));
        message.setSender(jsonObject.getString("sender"));
        message.setReceived(new Date());
        return message;
    }

    @Override
    public boolean willDecode(final String s) {
        return true;
    }

}
```

**Encoder**

```
package io.github.ngocitbk.websocket.model;

import io.github.ngocitbk.websocket.util.JsonUtil;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class MessageEncoder implements Encoder.Text<Message> {

    @Override
    public void init(final EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(final Message message) throws EncodeException {
        return JsonUtil.formatMessage(message.getContent(), message.getSender());
    }

}
```

MessageEncoder dùng thư viện json của java để thực hiện, trên là mô hình dữ liệu được truyền giữa server và client

# Server side

```
@javax.websocket.server.ServerEndpoint(value = "/chat", encoders = MessageEncoder.class, decoders = MessageDecoder.class)
public class ServerEndpoint {

    static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void onOpen(Session session) {
        System.out.println(format("%s joined the chat room.", session.getId()));
        peers.add(session);
    }

    @OnMessage
    public void onMessage(Message message, Session session) throws IOException, EncodeException {
        String user = (String) session.getUserProperties().get("user");
        if (user == null) {
            session.getUserProperties().put("user", message.getSender());
        }
        if ("quit".equalsIgnoreCase(message.getContent())) {
            session.close();
        }

        System.out.println(format("[%s:%s] %s", session.getId(), message.getReceived(), message.getContent()));

        //broadcast the message
        for (Session peer : peers) {
            if (!session.getId().equals(peer.getId())) { // do not resend the message to its sender
                peer.getBasicRemote().sendObject(message);
            }
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException, EncodeException {
        System.out.println(format("%s left the chat room.", session.getId()));
        peers.remove(session);
        //notify peers about leaving the chat room
        for (Session peer : peers) {
            Message chatMessage = new Message();
            chatMessage.setSender("Server");
            chatMessage.setContent(format("%s left the chat room.", (String) session.getUserProperties().get("user")));
            chatMessage.setReceived(new Date());
            peer.getBasicRemote().sendObject(chatMessage);
        }
    }

}
```

Client sẽ mở connection đến server và sẽ tạo ra 1 session nối giữa server và client, toàn bộ thông tin message trao đổi giữa client <-> server đều được thực hiện mã hoá và giải mã ở hàm **onMesssage**
Bạn định nghĩa endpoint(url) ở đây **@javax.websocket.server.ServerEndpoint**

## Client side

```
@javax.websocket.ClientEndpoint(encoders = MessageEncoder.class, decoders = MessageDecoder.class)
public class ClientEndpoint {

    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat();

    @OnOpen
    public void onOpen(Session session) {
        System.out.println(format("Connection established. session id: %s", session.getId()));
    }

    @OnMessage
    public void onMessage(Message message) {
        System.out.println(format("[%s:%s] %s", simpleDateFormat.format(message.getReceived()), message.getSender(), message.getContent()));
    }

}
```

Client sẽ open connection và send/received message với server

# How to run
## Start server thôi
```
public class Server {

    public static void main(String[] args) {

        org.glassfish.tyrus.server.Server server = new org.glassfish.tyrus.server.Server("localhost", 8887, "/ws", ServerEndpoint.class);

        try {
            server.start();
            System.out.println("Press any key to stop the server..");
            new Scanner(System.in).nextLine();
        } catch (DeploymentException e) {
            throw new RuntimeException(e);
        } finally {
            server.stop();
        }
    }

}
```

Trên mình sẽ start server ở port 8887, tất cả client sẽ đi qua port đó, ở phía server mình có thể đăng ký được nhiều ServerEndpoint (hình như ko giới hạn :))

![](https://images.viblo.asia/250bf685-4fec-4073-a37b-5b730ed43bd5.png)

## Start client để check giao tiếp client <->server 

```
public static final String SERVER = "ws://localhost:8887/ws/chat";

    public static void main(String[] args) throws Exception {
        ClientManager client = ClientManager.createClient();
        String message;

        // connect to server
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to Tiny Chat!");
        System.out.println("What's your name?");
        String user = scanner.nextLine();
        Session session = client.connectToServer(ClientEndpoint.class, new URI(SERVER));
        System.out.println("You are logged in as: " + user);

        // repeatedly read a message and send it to the server (until quit)
        do {
            message = scanner.nextLine();
            session.getBasicRemote().sendText(formatMessage(message, user));
        } while (!message.equalsIgnoreCase("quit"));
    }
```

Clinet connect server thông qua **SERVER = "ws://localhost:8887/ws/chat"**, đây là 1 dạng địa chỉ websocket.

Chạy ra client giao tiếp với nhau:
![](https://images.viblo.asia/1655c47e-9000-40d8-8ad5-6dc6c1d0f2ce.png)
![](https://images.viblo.asia/f98acf91-1f65-41b7-b6e7-6086a113e470.png)

Trong bài viết này bạn thấy việc sử dụng java để tạo websocket chát rất đơn giản, bạn có thể dùng nhiều thứ để tạo ví dụ như nodejs...

Source code: https://github.com/ngodinhngoc/websocket