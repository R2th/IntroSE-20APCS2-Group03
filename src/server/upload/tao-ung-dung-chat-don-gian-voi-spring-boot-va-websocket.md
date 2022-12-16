Trong bài viết này, bạn sẽ tìm hiểu cách sử dụng API WebSocket với Spring Boot và sau đó xây dựng một ứng dụng trò chuyện nhóm đơn giản.

WebSocket là một giao thức truyền thông giúp cho việc thiết lập kênh truyền thông hai chiều giữa máy chủ và máy khách.
WebSocket hoạt động bằng cách thiết lập kết nối HTTP liên tục với máy chủ và sau đó nâng cấp nó lên kết nối websocket hai chiều bằng cách gửi Upgrade header.
WebSocket được hỗ trợ trong hầu hết các trình duyệt web hiện đại và cho các trình duyệt không hỗ trợ, chúng tôi có các thư viện cung cấp dự phòng cho các kỹ thuật khác như Comet  và HTTP Long Polling.
Vâng, bây giờ chúng ta đã biết websocket là gì và nó hoạt động như thế nào, hãy bắt đầu triển khai ứng dụng trò chuyện của chúng ta.

## Tạo ứng dụng

Hãy sử dụng Spring Boot CLI để khởi tạo ứng dụng của chúng ta. Kiểm tra [tài liệu Spring Boot chính thức](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html#getting-started-installing-the-cli) để biết hướng dẫn về cách cài đặt Spring Boot CLI.
Khi bạn đã cài đặt Spring Boot CLI, gõ lệnh sau vào terminal của bạn để tạo project:

```
$ spring init --name=websocket-demo -dependencies=websocket websocket-demo
```

Nếu bạn không muốn cài đặt Spring Boot CLI, đừng lo, bạn có thể sử dụng [công cụ web Spring Initializer](http://start.spring.io/) để tạo dự án. Làm theo các bước dưới đây để tạo dự án bằng Spring Initializer 
1. Truy cập [http://start.spring.io/](http://start.spring.io/).
2. Nhập giá trị Artifact cho là websocket-demo.
3. Thêm Websocket vào dependencies section.
4. Nhấp vào Generate Project để tải xuống project.
5. Giải nén tệp zip đã tải xuống.

## WebSocket Configuration

Bước đầu tiên là cấu hình websocket endpoint và message broker.  Tạo package `config` trong `com.example.websocketdemo`. Sau đó tạo mới class `WebSocketConfig`  bên trong package `config` với nội dung như sau:

```
package com.example.websocketdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }
}
```

Annotation `@EnableWebSocketMessageBroker` được dùng để bật tính năng WebSocket server. Chúng ta thực hiện implement interface `WebSocketMessageBrokerConfigurer`  và cung cấp việc triển khai thực hiện một số phương thức của nó để cấu hình kết nối websocket. 

Trong phương thức đầu tiên, chúng ta đăng ký một websocket endpoint mà các máy khách sẽ sử dụng để kết nối với máy chủ websocket của chúng ta.

Lưu ý việc sử dụng `withSockJS()` với endpoint configuration. SockJS được sử dụng để bật tùy chọn dự phòng cho các trình duyệt không hỗ trợ websocket.

Bạn có thể đã nhận thấy từ STOMP trong tên phương thức. Những phương pháp này đến từ Spring frameworks STOMP implementation. STOMP là viết tắt của Simple Text Oriented Messaging Protocol. Nó là một giao thức nhắn tin xác định định dạng và quy tắc trao đổi dữ liệu.

Tại sao chúng ta cần STOMP? Vâng, WebSocket chỉ là một giao thức truyền thông. Nó không xác định những thứ như - Cách gửi thư chỉ cho những người dùng đã đăng ký một chủ đề cụ thể hoặc cách gửi thư đến một người dùng cụ thể. Chúng tôi cần STOMP cho các chức năng này.

Trong phương pháp thứ hai, chúng tôi đang định cấu hình nhà môi giới tin nhắn sẽ được sử dụng để định tuyến thư từ một khách hàng này đến ứng dụng khách khác.

Dòng đầu tiên xác định rằng các thư có đích bắt đầu bằng “/app” sẽ được định tuyến đến các phương thức xử lý tin nhắn (chúng tôi sẽ sớm xác định các phương thức này).

Và, dòng thứ hai định nghĩa rằng các thông điệp có đích bắt đầu bằng “/topic” nên được định tuyến tới nhà môi giới tin nhắn. Nhà môi giới tin nhắn sẽ phát các tin nhắn đến tất cả các khách hàng được kết nối đã đăng ký một chủ đề cụ thể.

Trong ví dụ trên, Chúng tôi đã kích hoạt một nhà môi giới thông báo trong bộ nhớ đơn giản. Nhưng bạn được tự do sử dụng bất kỳ nhà môi giới thư đầy đủ tính năng nào khác như [RabbitMQ](https://www.rabbitmq.com/stomp.html) hoặc [ActiveMQ](http://activemq.apache.org/stomp.html).

## Tạo model ChatMessage

`ChatMessage` model là nơi chứa tin nhắn sẽ được trao đổi giữa khách hàng và máy chủ. Tạo một package `model` bên trong package `com.example.websocketdemo`, sau đó tạo class `ChatMessage` bên trong package `model` với nội dung như sau:
```
package com.example.websocketdemo.model;

public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
```

## Tạo Controller để gửi và nhận tin nhắn

Chúng tôi sẽ xác định các phương thức xử lý tin nhắn trong bộ điều khiển của chúng tôi. Những phương pháp này sẽ chịu trách nhiệm nhận tin nhắn từ một khách hàng và sau đó phát sóng nó cho người khác.
Tạo mới package `controller` bên trong package `com.example.websocketdemo` và sau đó tạo class `ChatController` với nội dung như sau:
```
package com.example.websocketdemo.controller;

import com.example.websocketdemo.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, 
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

}
```

Nếu bạn gọi lại từ cấu hình websocket, tất cả các tin nhắn được gửi từ các máy khách có đích đến bắt đầu bằng `/app` sẽ được định tuyến tới các phương thức xử lý tin nhắn được chú thích bằng `@MessageMapping`.
Ví dụ, một thư có đích `/app/chat.sendMessage` sẽ được định tuyến tới phương thức `sendMessage()` và một thư có đích `/app/chat.addUser` sẽ được định tuyến tới phương thức `addUser()`.

## Thêm WebSocket Event listeners
Chúng tôi sẽ sử dụng trình xử lý sự kiện để lắng nghe kết nối socket và ngắt kết nối các sự kiện để chúng tôi có thể ghi lại các sự kiện này và cũng phát chúng khi người dùng tham gia hoặc rời khỏi phòng trò chuyện -

```
package com.example.websocketdemo.controller;

import com.example.websocketdemo.model.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if(username != null) {
            logger.info("User Disconnected : " + username);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatMessage.MessageType.LEAVE);
            chatMessage.setSender(username);

            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}
```

Chúng tôi đã phát sự kiện người dùng tham gia trong phương thức `addUser()` được xác định bên trong ChatController. Vì vậy, chúng tôi không cần phải làm bất cứ điều gì trong sự kiện SessionConnected.
Trong sự kiện SessionDisconnect, chúng tôi đã viết mã để trích xuất tên người dùng từ websocket session  và phát sóng sự kiện người dùng rời khỏi cho tất cả các khách hàng được kết nối.

## Tạo giao diện người dùng

Tạo các thư mục và tệp sau đây bên trong thư mục `src/main/resources`:
```
static
  └── css
       └── main.css
  └── js
       └── main.js
  └── index.html     
  ```
  
  Thư mục `src/main/resources/static` là vị trí mặc định cho các tệp tĩnh trong Spring Boot.
  
###   1. Creating the HTML - index.html
  Tệp HTML chứa giao diện người dùng để hiển thị các tin nhắn trò chuyện. Nó bao gồm các thư viện sockjs và stomp javascript.
  SockJS là một máy khách WebSocket cố gắng sử dụng các WebSockets nguyên bản và cung cấp các tùy chọn dự phòng thông minh cho các trình duyệt cũ không hỗ trợ WebSocket. STOMP JS là ứng dụng stomp cho javascript.
  Sau đây là mã hoàn chỉnh cho index.html -
  ```
  <!DOCTYPE html>
<html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
      <title>Spring Boot WebSocket Chat Application</title>
      <link rel="stylesheet" href="/css/main.css" />
  </head>
  <body>
    <noscript>
      <h2>Sorry! Your browser doesn't support Javascript</h2>
    </noscript>

    <div id="username-page">
        <div class="username-page-container">
            <h1 class="title">Type your username</h1>
            <form id="usernameForm" name="usernameForm">
                <div class="form-group">
                    <input type="text" id="name" placeholder="Username" autocomplete="off" class="form-control" />
                </div>
                <div class="form-group">
                    <button type="submit" class="accent username-submit">Start Chatting</button>
                </div>
            </form>
        </div>
    </div>

    <div id="chat-page" class="hidden">
        <div class="chat-container">
            <div class="chat-header">
                <h2>Spring WebSocket Chat Demo</h2>
            </div>
            <div class="connecting">
                Connecting...
            </div>
            <ul id="messageArea">

            </ul>
            <form id="messageForm" name="messageForm">
                <div class="form-group">
                    <div class="input-group clearfix">
                        <input type="text" id="message" placeholder="Type a message..." autocomplete="off" class="form-control"/>
                        <button type="submit" class="primary">Send</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
    <script src="/js/main.js"></script>
  </body>
</html>
  ```
  
###  2. JavaScript - main.js
  Bây giờ, hãy thêm javascript cần thiết để kết nối với websocket endpoint và gửi và nhận tin nhắn. Trước tiên, hãy thêm mã sau vào tệp `main.js` và sau đó chúng ta sẽ khám phá một số phương pháp quan trọng trong tệp này -
  ```
  'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)
```

###   3. Adding CSS - main.css
 Cuối cùng, thêm các kiểu sau vào tệp main.css -
 ```
 * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
html,body {
    height: 100%;
    overflow: hidden;
}
body {
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.58;
    color: #333;
    background-color: #f4f4f4;
    height: 100%;
}
body:before {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #128ff2;
    content: "";
    z-index: 0;
}
.clearfix:after {
    display: block;
    content: "";
    clear: both;
}
.hidden {
    display: none;
}
.form-control {
    width: 100%;
    min-height: 38px;
    font-size: 15px;
    border: 1px solid #c8c8c8;
}
.form-group {
    margin-bottom: 15px;
}
input {
    padding-left: 10px;
    outline: none;
}
h1, h2, h3, h4, h5, h6 {
    margin-top: 20px;
    margin-bottom: 20px;
}
h1 {
    font-size: 1.7em;
}
a {
    color: #128ff2;
}
button {
    box-shadow: none;
    border: 1px solid transparent;
    font-size: 14px;
    outline: none;
    line-height: 100%;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    min-height: 38px;
}
button.default {
    background-color: #e8e8e8;
    color: #333;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
}
button.primary {
    background-color: #128ff2;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}
button.accent {
    background-color: #ff4743;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
}
#username-page {
    text-align: center;
}
.username-page-container {
    background: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    border-radius: 2px;
    width: 100%;
    max-width: 500px;
    display: inline-block;
    margin-top: 42px;
    vertical-align: middle;
    position: relative;
    padding: 35px 55px 35px;
    min-height: 250px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: -160px;
}
.username-page-container .username-submit {
    margin-top: 10px;
}
#chat-page {
    position: relative;
    height: 100%;
}
.chat-container {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    margin-top: 30px;
    height: calc(100% - 60px);
    max-height: 600px;
    position: relative;
}
#chat-page ul {
    list-style-type: none;
    background-color: #FFF;
    margin: 0;
    overflow: auto;
    overflow-y: scroll;
    padding: 0 20px 0px 20px;
    height: calc(100% - 150px);
}
#chat-page #messageForm {
    padding: 20px;
}
#chat-page ul li {
    line-height: 1.5rem;
    padding: 10px 20px;
    margin: 0;
    border-bottom: 1px solid #f4f4f4;
}
#chat-page ul li p {
    margin: 0;
}
#chat-page .event-message {
    width: 100%;
    text-align: center;
    clear: both;
}
#chat-page .event-message p {
    color: #777;
    font-size: 14px;
    word-wrap: break-word;
}
#chat-page .chat-message {
    padding-left: 68px;
    position: relative;
}
#chat-page .chat-message i {
    position: absolute;
    width: 42px;
    height: 42px;
    overflow: hidden;
    left: 10px;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 42px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    font-style: normal;
    text-transform: uppercase;
}
#chat-page .chat-message span {
    color: #333;
    font-weight: 600;
}
#chat-page .chat-message p {
    color: #43464b;
}
#messageForm .input-group input {
    float: left;
    width: calc(100% - 85px);
}
#messageForm .input-group button {
    float: left;
    width: 80px;
    height: 38px;
    margin-left: 5px;
}
.chat-header {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #ececec;
}
.chat-header h2 {
    margin: 0;
    font-weight: 500;
}
.connecting {
    padding-top: 5px;
    text-align: center;
    color: #777;
    position: absolute;
    top: 65px;
    width: 100%;
}

@media screen and (max-width: 730px) {

    .chat-container {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
    }
}
@media screen and (max-width: 480px) {
    .chat-container {
        height: calc(100% - 30px);
    }
    .username-page-container {
        width: auto;
        margin-left: 15px;
        margin-right: 15px;
        padding: 25px;
    }
    #chat-page ul {
        height: calc(100% - 120px);
    }
    #messageForm .input-group button {
        width: 65px;
    }
    #messageForm .input-group input {
        width: calc(100% - 70px);
    }
    .chat-header {
        padding: 10px;
    }
    .connecting {
        top: 60px;
    }
    .chat-header h2 {
        font-size: 1.1em;
    }
}
```

## Running the application

Bạn có thể chạy ứng dụng Spring Boot bằng cách gõ lệnh sau vào terminal của bạn -
```
mvn spring-boot:run
```
Ứng dụng Spring Boot’s chạy mặc định tại cổng 8080. Bạn có xem ứng dụng tại địa chỉ http://localhost:8080.

## Sử dụng RabbitMQ làm message broker

Nếu bạn muốn sử dụng một message broker đầy đủ tính năng như RabbitMQ thay vì in-memory message broker đơn giản thì chỉ cần thêm các phụ thuộc sau vào tệp pom.xml của bạn -
```
<!-- RabbitMQ Starter Dependency -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>

<!-- Following additional dependency is required for Full Featured STOMP Broker Relay -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-reactor-netty</artifactId>
</dependency>
```

Khi bạn đã thêm các phụ thuộc ở trên, bạn có thể bật message broker RabbitMQ trong tệp `WebSocketConfig.java` như thế này -
```
public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.setApplicationDestinationPrefixes("/app");

    // Use this for enabling a Full featured broker like RabbitMQ
    registry.enableStompBrokerRelay("/topic")
            .setRelayHost("localhost")
            .setRelayPort(61613)
            .setClientLogin("guest")
            .setClientPasscode("guest");
}
```

## Kết luận

Xin chúc mừng các bạn! Trong hướng dẫn này, chúng ta đã xây dựng được một ứng dụng trò chuyện chính thức từ đầu bằng cách sử dụng Spring Boot và WebSocket.


Bài viết được dịch từ: [https://www.callicoder.com/spring-boot-websocket-chat-example/](https://www.callicoder.com/spring-boot-websocket-chat-example/)