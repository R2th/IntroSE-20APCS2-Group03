Nguồn [https://stackjava.com/category/websocket](https://stackjava.com/category/websocket)
## WebSocket là gì?
[WebSocket](https://stackjava.com/websocket/websocket-la-gi-huong-dan-java-websocket-code-vi-du.html) là một kiểu [Reverse Ajax](https://stackjava.com/javascript/reverse-ajax-la-gi.html) hỗ trợ giao tiếp real time giữa client với server
Ở bài này mình sẽ làm ví dụ:
Tạo 1 server websocket để gửi nhận dữ liệu
Tạo project chạy phía client, nhắn tin cho nhau thông qua websocket
## Tạo Dynamic Web Project (Server)
Mình sử dụng tomcat + java web để là Server WebSocket (Server chat) (Các bạn có thể dùng các application khác như Jetty, GlassFish thay vì dùng tomcat)

![](https://stackjava.com/wp-content/uploads/2018/04/websocket-java-desktop-chat-1.png)


**Tạo ServerEnpoint**
```
package stackjava.com.websocket5.server;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chatRoomServer")
public class ChatRoomServerEndpoint {

	static Set<Session> users = Collections.synchronizedSet(new HashSet<>());

	@OnOpen
	public void handleOpen(Session session) {
		users.add(session);
	}

	@OnMessage
	public void handleMessage(String message, Session userSession) throws IOException {
		String username = (String) userSession.getUserProperties().get("username");
		if (username == null) {
			userSession.getUserProperties().put("username", message);
			userSession.getBasicRemote().sendText("System: you are connectd as " + message);
		} else {
			for (Session session : users) {
				session.getBasicRemote().sendText(username + ": " + message);
			}
		}
	}

	@OnClose
	public void handleClose(Session session) {
		users.remove(session);
	}

	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();
	}

}

```
Annotation `@ServerEndpoint(value = “/chatRoomServer”)` định nghĩa đây là một server WebSocket với đường dẫn là /chatRoomServer

Các annotation `@OnOpen, @OnMessage, @OnClose, @OnError` định nghĩa các method xử lý các sự kiện.
Set<Session> users sẽ lưu thông tin tất cả các client đã kết nối với server

Khi client gửi message lần đầu, server sẽ lấy đó làm username, message gửi lần thứ 2 sẽ được gửi tới tất cả các client khác.

(Để gửi message riêng cho user nào đó bạn có thể kiểm tra và so sánh username trong session mới gửi, ví dụ gửi message tới user ‘kai’ thì kiểm tra session nào có username = ‘kai’ thì mới gửi)

**File view: chạy ở phía client**
File view này dùng để chat qua trình duyệt web.
```
<!DOCTYPE html>
<html>
<head>
<title>Demo websocket</title>
</head>
<body>	
		<h2>Demo WebSocket Chat Room</h2>
		<input id="textMessage" type="text" />
		<input onclick="sendMessage()" value="Send Message" type="button" /> <br/><br/>
		
		<textarea id="textAreaMessage" rows="10" cols="50"></textarea>

		<script type="text/javascript">
			var websocket = new WebSocket("ws://localhost:8080/WebSocketChatServer/chatRoomServer");
				websocket.onopen = function(message) {processOpen(message);};
				websocket.onmessage = function(message) {processMessage(message);};
				websocket.onclose = function(message) {processClose(message);};
				websocket.onerror = function(message) {processError(message);};

			function processOpen(message) {
				textAreaMessage.value += "Server connect... \n";
			}
			function processMessage(message) {
				console.log(message);
				textAreaMessage.value += message.data + " \n";
			}
			function processClose(message) {
				textAreaMessage.value += "Server Disconnect... \n";
			}
			function processError(message) {
				textAreaMessage.value += "Error... " + message +" \n";
			}

			function sendMessage() {
				if (typeof websocket != 'undefined' && websocket.readyState == WebSocket.OPEN) {
					websocket.send(textMessage.value);
					textMessage.value = "";
				}
			}

		</script>
</body>
</html>
```
Khi mở trang nó sẽ tự động kết nối tới server websocket: ws://localhost:8080/WebSocket2/chatRoomServer

**Demo chat qua trình duyệt web**

![](https://stackjava.com/wp-content/uploads/2018/04/websocket-chat-room-2.gif)

## Tạo Maven Project (Client Java Desktop)

![](https://stackjava.com/wp-content/uploads/2018/04/websocket-java-desktop-chat-2.png)

Các thư viện sử dụng:
```
<dependency>
  <groupId>javax.websocket</groupId>
  <artifactId>javax.websocket-client-api</artifactId>
  <version>1.0</version>
</dependency>
<dependency>
  <groupId>org.glassfish.tyrus</groupId>
  <artifactId>tyrus-client</artifactId>
  <version>1.1</version>
</dependency>
<dependency>
  <groupId>org.glassfish.tyrus</groupId>
  <artifactId>tyrus-container-grizzly</artifactId>
  <version>1.1</version>
</dependency>
```

`javax.websocket-client-api` cung cấp api websocket cho client

`org.glassfish.tyrus` là thư viện thực hiện cài đặt websocket api (thư viện này có sẵn trong server GlassFish)

Mình không sử dụng websocket api của tomcat cho client vì mấy thư viện websocket của tomcat nó lại gọi tới các thư viện khác của tomcat nên khá lằng nhằng.

**Định nghĩa ClientEndpoint**

Mỗi khi nhận được message từ server nó sẽ thêm message đó vào text area chỉ định trước đó.

```
package stackjava.com.websocketchatclient.client;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.swing.JTextArea;
import javax.websocket.ClientEndpoint;
import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;

@ClientEndpoint
public class MyClientEndpoint {
	
	private Session session = null;
	private JTextArea textAreaMessage;

	public MyClientEndpoint(JTextArea textAreaMessage) throws URISyntaxException, DeploymentException, IOException {
		URI uri = new URI("ws://localhost:8080/WebSocketChatServer/chatRoomServer");
		ContainerProvider.getWebSocketContainer().connectToServer(this, uri);
		this.textAreaMessage = textAreaMessage;
	}
	
	@OnOpen
	public void handleOpen(Session session) {
		this.session = session;
		System.out.println("Connected to Server!");
	}

	@OnMessage
	public void handleMessage(String message) {
		System.out.println("Response from Server: " + message);
		textAreaMessage.append(message + "\n");
	}

	@OnClose
	public void handleClose() {
		System.out.println("Disconnected to Server!");
	}

	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();
	}
	
	public void sendMessage(String message) throws IOException {
		this.session.getBasicRemote().sendText(message);
	}
	
	public void disconnect() throws IOException {
		this.session.close();
	}
	
}

```

**File MainApp.java (Chạy ứng dụng)**
```
package stackjava.com.websocketchatclient.mainapp;

import java.awt.EventQueue;
import java.io.IOException;
import java.net.URISyntaxException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.border.EmptyBorder;
import javax.websocket.DeploymentException;

import stackjava.com.websocketchatclient.client.MyClientEndpoint;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class MainApp extends JFrame {
	private static final long serialVersionUID = 1L;
	private JPanel contentPane;
	private JTextField textFieldMessage;
	private JButton btnSendMessage;
	private JTextArea textAreaMessage;
	private MyClientEndpoint client;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainApp frame = new MainApp();
					frame.setVisible(true);
					UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
					SwingUtilities.updateComponentTreeUI(frame);
					
					frame.connectWebSocketServer();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public MainApp() {
		setTitle("WebSocket Chat Room - Client Java");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 440, 256);
		this.contentPane = new JPanel();
		this.contentPane.setToolTipText("");
		this.contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(this.contentPane);
		this.contentPane.setLayout(null);
		
		this.textFieldMessage = new JTextField();
		this.textFieldMessage.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				sendMessage();
			}
		});
		this.textFieldMessage.setBounds(10, 11, 250, 20);
		this.contentPane.add(this.textFieldMessage);
		this.textFieldMessage.setColumns(10);
		
		this.btnSendMessage = new JButton("Send Message");
		this.btnSendMessage.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				sendMessage();
			}
		});
		this.btnSendMessage.setBounds(281, 10, 132, 23);
		this.contentPane.add(this.btnSendMessage);
		
		this.textAreaMessage = new JTextArea();
		this.textAreaMessage.setBounds(10, 54, 403, 154);
		this.contentPane.add(this.textAreaMessage);
	}
	
	public void connectWebSocketServer() throws URISyntaxException, DeploymentException, IOException {
		this.client = new MyClientEndpoint(textAreaMessage);
	}
	
	public void sendMessage() {
		String message = textFieldMessage.getText();
		try {
			this.client.sendMessage(message);
			textFieldMessage.setText("");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

```

**Demo:**
Start Project Web trên server tomcat:

Start client (bạn có thể start hoặc nhiều client để chat cùng lúc)

![](https://stackjava.com/wp-content/uploads/2018/04/websocket-java-desktop-chat-5.gif)


Okay, Done!

Download code ví dụ trên [tại đây](https://stackjava.com/websocket/code-vi-du-ung-dung-chat-voi-websocket-java-desktop.html): 


Nguồn [https://stackjava.com/category/websocket](https://stackjava.com/category/websocket)