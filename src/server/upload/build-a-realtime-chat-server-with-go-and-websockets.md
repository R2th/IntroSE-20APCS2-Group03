# Giới thiệu
Các ứng dụng web hiện đại ngày càng trở nên phức tạp. Người dùng thường được chào đón bằng những trải nghiệm hấp dẫn. Cập nhật trang trong thời gian thực mà không cần người dùng phải gọi đến máy chủ hoặc làm mới trình duyệt của họ. Trong những ngày đầu, các nhà phát triển dựa vào các yêu cầu AJAX để tạo các ứng dụng khá gần với thời gian thực. Bây giờ họ có thể sử dụng sức mạnh của WebSockets để tạo ra các ứng dụng thời gian thực hoàn toàn.

Trong bài viết này, chúng ta sẽ tạo ra một ứng dụng chat thời gian thực bằng cách sử dụng ngôn ngữ lập trình Go và WebSockets. Giao diện người dùng sẽ được viết bằng HTML5 và VueJS.  Và giả định là chúng ta đã có những hiểu biết cơ bản về ngôn ngữ Go, JavaScript và HTML5. Và cũng giả định rằng bạn có một chút kinh nghiệm làm việc với VueJS.
Để bắt đầu với Go, bạn có thể xem hướng dẫn tuyệt vời trên trang web chính thức của Go. https://tour.golang.org/welcome/1. 
Và đối với Vue bạn có thể xem loạt video miễn phí tuyệt vời của Jeffrey Way tại Laracasts. https://laracasts.com/series/learn-vue-2-step-by-step
# WebSokets là gì?
Các ứng dụng web thông thường được phục vụ bằng cách sử dụng ít nhất một hoặc nhiều yêu cầu tới máy chủ HTTP. Một phần mềm ứng dụng khách, thông thường trình duyệt web gửi yêu cầu tới máy chủ và máy chủ gửi trả lại phản hồi. Phản hồi thường là HTML mà trình duyệt sau đó hiển thị dưới dạng trang web. Stylesheets, mã JavaScript và hình ảnh cũng có thể được gửi trả lời để hoàn thành toàn bộ trang web. Mỗi yêu cầu và phản hồi là một phần của những kết nối riêng biệt và một trang web lớn như Facebook thực thế có thể thực hiện hàng trăm kết nối này chỉ để hiển thị một trang duy nhất.
AJAX hoạt động giống như vậy. Sử dụng JavaScript, các nhà phát triển có thể đưa ra yêu cầu tới máy chủ HTTP cho các mẩu thông tin nhỏ và sau đó cập nhật một phần của trang web dựa trên phản hồi. Điều này tất cả có thể được thực hiện mà không cần phải làm mới trình duyệt. Dù vậy điều này vẫn còn một số các hạn chế.

Mỗi kết nối HTTP yêu cầu / phản hồi được đóng lại sau phản hồi và để nhận được bất kỳ thông tin mới nào thì một kết nối khác phải được thực hiện. Máy chủ thì không thể biết khi nào máy khách đang tìm kiếm thông tin mới mà không có một yêu cầu mới đến nó. Một kỹ thuật để tạo các ứng dụng AJAX có vẻ thời gian thực là chạy các yêu cầu AJAX trong một vòng lặp theo thời gian. Sau một khoảng thời gian được đặt, ứng dụng có thể chạy lại yêu cầu tới máy chủ để xem có bản cập nhật nào cần được phản ánh trong trình duyệt hay không. Ý tưởng này tốt cho các ứng dụng nhỏ nhưng không thực sự hiệu quả lắm. Và thế là WebSockets đã có đất diễn của riêng mình.
WebSockets là một phần của a proposed standard được tạo ra bởi Internet Engineering Task Force (IETF). Đặc tả đầy đủ về cách thực hiện WebSockets được trình bày chi tiết trong RFC6455. Tài liệu định nghĩa một WebSocket như sau:

`“Giao thức WebSocket cho phép giao tiếp hai chiều giữa một máy khách đang chạy mã không tin cậy trong một môi trường được kiểm soát tới một máy chủ từ xa đã chọn tham gia giao tiếp từ mã đó.”`

Nói cách khác, một WebSocket là một kết nối luôn luôn mở và cho phép một máy khách và máy chủ gửi tin nhắn qua lại cho nhau. Máy chủ có thể đẩy thông tin mới đến máy khách bất cứ khi nào nó thấy cần thiết và máy khách có thể thực hiện tương tự với máy chủ.

## WebSockets trong JavaScript
Hầu hết các trình duyệt hiện đại đều hỗ trợ WebSockets trong quá trình triển khai JavaScript của chúng. Để khởi tạo một kết nối WebSocket từ trình duyệt, bạn có thể sử dụng đối tượng JavaScript WebSocket đơn giản như thế này.

```
var ws = new Websocket("ws://example.com/ws");
```

Đối số duy nhất bạn cần là một URL đến nơi kết nối WebSocket sẽ được máy chủ chấp nhận. Yêu cầu bản chất là một yêu cầu HTTP khởi tạo nhưng tôi sử dụng "ws: //" hoặc "wss: //" để có kết nối an toàn. Điều này cho phép máy chủ biết rằng tôi đang cố tạo một kết nối WebSocket mới. Sau đó, máy chủ sẽ "nâng cấp" kết nối với kết nối hai chiều liên tục giữa máy khách và máy chủ.
Khi một đối tượng WebSocket mới được tạo và kết nối được tạo thành công, chúng ta có thể sử dụng phương thức "send ()" để gửi văn bản tới máy chủ và định nghĩa một hàm xử lý trên thuộc tính "onmessage" của WebSocket để xử lý các tin nhắn được gửi từ máy chủ . Điều này sẽ được giải thích sau trong mã ứng dụng trò chuyện của tôi.

## WebSockets trong Go
WebSockets không được thêm vào như là một phần của thư viện chuẩn Go nhưng may mắn là có một vài package của bên thứ ba giúp ta làm việc với WebSockets một cách dễ dàng. Trong bài viết này, chúng ta sẽ sử dụng một package có tên là "gorilla / websocket", là một phần của tập các package phần mềm Gorilla Toolkit phổ biến để tạo các ứng dụng web trong Go. Để cài đặt nó, chỉ cần chạy như sau.

```
$ go get github.com/gorilla/websocket
```

# Xây dựng máy chủ
Phần đầu tiên của ứng dụng này sẽ là máy chủ. Nó sẽ là một máy chủ HTTP đơn giản xử lý các yêu cầu. Nó sẽ phục vụ mã HTML5 và JavaScript của chúng ta cũng như hoàn thành việc thiết lập các kết nối WebSocket từ các máy khách. Xa hơn, máy chủ cũng sẽ theo dõi từng kết nối WebSocket và các tin nhắn trò chuyện chuyển tiếp được gửi từ một máy khách đến tất cả các máy khách khác được kết nối bởi WebSocket. Bắt đầu bằng cách tạo một thư mục trống mới sau đó bên trong thư mục đó, tạo một thư mục "src" và "public". Bên trong thư mục "src", tạo một tệp có tên "main.go".

Đầu tiên là một số thiết lập. Chúng ta bắt đầu ứng dụng giống như tất cả các ứng dụng Go khác và xác định tên package của chúng ta, trong trường hợp này là "main". 
Tiếp theo, tôi nhập một số package hữu ích. "log" và "net / http" đều là một phần của thư viện chuẩn và sẽ được sử dụng để ghi lại lịch sử (duh) và tạo một máy chủ HTTP đơn giản. Package cuối cùng, "github.com/gorilla/websocket", sẽ giúp chúng ta dễ dàng tạo và làm việc với các kết nối WebSocket của chúng ta.

```
package main

import (
        "log"
        "net/http"

        "github.com/gorilla/websocket"
)
```
Hai dòng tiếp theo là một số biến toàn cục sẽ được phần còn lại của ứng dụng sử dụng. Dùng các biến toàn cục thường là một cách tồi nhưng tôi sẽ sử dụng chúng lần này để đơn giản hóa. Biến đầu tiên là một map trong đó key là một con trỏ tới một WebSocket. Value chỉ là một giá trị boolean. Value không thực sự cần thiết nhưng tôi đang sử dụng map vì nó dễ dàng hơn mảng để nối và xóa các mục.

Biến thứ hai là một kênh sẽ hoạt động như một hàng đợi cho các tin nhắn được gửi bởi client. Sau đó trong mã, tôi sẽ xác định một goroutine để đọc tin nhắn mới từ kênh và sau đó gửi chúng cho các client khác kết nối với máy chủ.

```
var clients = make(map[*websocket.Conn]bool) // connected clients
var broadcast = make(chan Message)           // broadcast channel
```

Tiếp theo chúng ta tạo một thể hiện của một Upgrader. Đây chỉ là một đối tượng với các phương thức để lấy một kết nối HTTP thông thường và nâng cấp nó lên một WebSocket như chúng ta sẽ thấy trong mã sau.

```
// Configure the upgrader
var upgrader = websocket.Upgrader{}
```

Chúng ta sẽ định nghĩa một đối tượng để lưu giữ các nội dung các tin nhắn của chúng ta. Đó là một cấu trúc đơn giản với một số thuộc tính địa chỉ email, tên người dùng username và nội dung tin nhắn message. Chúng tôi sẽ sử dụng email để hiển thị một hình đại diện duy nhất được cung cấp bởi dịch vụ Gravatar thông dụng.
Các văn bản được bao quanh bởi backticks chỉ là siêu dữ liệu giúp Go chuyển đổi đối tượng Message thành JSON và ngược lại.
```
// Define our message object
type Message struct {
        Email    string `json:"email"`
        Username string `json:"username"`
        Message  string `json:"message"`
}
```

Điểm đầu vào chính của bất kỳ ứng dụng Go nào luôn là hàm "main ()". Mã này khá đơn giản. Trước tiên chúng ta tạo một static fileserver và liên kết với route "/" để khi người dùng truy cập trang web, họ sẽ có thể xem index.html và bất kỳ nội dung nào. Trong ví dụ này, tôi sẽ có tệp "app.js" cho mã JavaScript của tôi và "style.css" đơn giản.

```
func main() {
        // Create a simple file server
        fs := http.FileServer(http.Dir("../public"))
        http.Handle("/", fs)
```

Route tiếp theo mà chúng ta muốn định nghĩa là "/ws" là nơi chúng ta sẽ xử lý bất kỳ yêu cầu nào để khởi tạo một WebSocket. Chúng tôi truyền vào đó một hàm gọi là "handleConnections" mà chúng ta sẽ định nghĩa sau.

```
func main() {
    ...
        // Configure websocket route
        http.HandleFunc("/ws", handleConnections)
```

Trong bước tiếp theo, chúng ta bắt đầu một goroutine gọi "handleMessages". Đây là một quá trình đồng thời sẽ chạy song song với các phần còn lại của ứng dụng và sẽ chỉ nhận tin nhắn từ kênh phát sóng từ trước và truyền chúng cho khách hàng qua kết nối WebSocket tương ứng của họ.

```
func main() {
    ...
        // Start listening for incoming chat messages
        go handleMessages()
```

Sau đó, tôi in một thông báo và khởi động máy chủ web. Nếu có bất kỳ lỗi nào, tôi sẽ ghi lại chúng và thoát khỏi ứng dụng.

```
func main() {
    ...
        // Start the server on localhost port 8000 and log any errors
        log.Println("http server started on :8000")
        err := http.ListenAndServe(":8000", nil)
        if err != nil {
                log.Fatal("ListenAndServe: ", err)
        }
}
```

Tiếp theo chúng ta cần tạo hàm để xử lý các kết nối WebSocket đến. Đầu tiên chúng ta sử dụng phương thức "Upgrade ()" của upgrader để thay đổi yêu cầu GET ban đầu của chúng ta thành đầy đủ trên WebSocket. Nếu có lỗi, chúng tôi sẽ ghi lại nó nhưng không thoát khỏi ứng dựng. Bạn cũng nên lưu ý tuyên bố defer. Đây là cách gọn gàng để cho Go biết đóng kết nối WebSocket của chúng ta khi hàm trả về. Điều này tiết kiệm cho chúng ta bằng cách viết nhiều câu lệnh "Close ()" tùy thuộc vào cách hàm trả về.

```
func handleConnections(w http.ResponseWriter, r *http.Request) {
        // Upgrade initial GET request to a websocket
        ws, err := upgrader.Upgrade(w, r, nil)
        if err != nil {
                log.Fatal(err)
        }
        // Make sure we close the connection when the function returns
        defer ws.Close()
```
Tiếp theo, chúng ta đăng ký một máy khách mới bằng cách thêm nó vào map "client" toàn cục mà chúng ta đã tạo trước đó.

```
func handleConnections(w http.ResponseWriter, r *http.Request) {
    ...
        // Register our new client
        clients[ws] = true
```

Một vòng lặp vô hạn liên tục chờ đợi một thông điệp mới được ghi vào WebSocket, unserializes nó từ JSON thành một đối tượng Message và sau đó đưa nó vào kênh phát sóng. Sau đó, goroutine "handleMessages ()" của chúng ta có thể gửi nó cho tất cả những người khác được kết nối.
Nếu có một số loại lỗi với việc đọc từ socket, chúng tôi giả sử client đã bị ngắt kết nối vì một lý do nào đó. Chúng ta ghi lại lỗi và xóa khách hàng đó khỏi map toàn cục "client" để chúng ta không cố gắng đọc hoặc gửi thư mới cho client đó.

Một điều cần lưu ý là các hàm xử lý tuyến đường HTTP được chạy dưới dạng goroutine. Điều này cho phép máy chủ HTTP xử lý nhiều kết nối đến mà không phải chờ kết nối khác hoàn tất.

```
func handleConnections(w http.ResponseWriter, r *http.Request) {
    ...
        for {
                var msg Message
                // Read in a new message as JSON and map it to a Message object
                err := ws.ReadJSON(&msg)
                if err != nil {
                        log.Printf("error: %v", err)
                        delete(clients, ws)
                        break
                }
                // Send the newly received message to the broadcast channel
                broadcast <- msg
        }
}
```
Phần cuối cùng của máy chủ là hàm "handleMessages ()". Đây chỉ đơn giản là một vòng lặp liên tục đọc từ kênh "broadcast" và sau đó chuyển tiếp thông điệp tới tất cả các máy khách của qua kết nối WebSocket tương ứng của chúng. Một lần nữa, nếu có một lỗi bằng cách ghi vào WebSocket, chúng ta đóng kết nối và loại bỏ nó khỏi map "clients".

```
func handleMessages() {
        for {
                // Grab the next message from the broadcast channel
                msg := <-broadcast
                // Send it out to every client that is currently connected
                for client := range clients {
                        err := client.WriteJSON(msg)
                        if err != nil {
                                log.Printf("error: %v", err)
                                client.Close()
                                delete(clients, client)
                        }
                }
        }
}
```
# Xây dựng máy khách
Ứng dụng trò chuyện sẽ không hoàn thành nếu không có giao diện người dùng đẹp mắt. Chúng ta sẽ tạo một giao diện đơn giản, sạch sẽ bằng cách sử dụng một số HTML5 và VueJS. Tôi cũng sẽ tận dụng lợi thế của một số thư viện như Materialize CSS và EmojiOne cho một số style đẹp và biểu tượng cảm xúc.

Bên trong thư mục "public", tạo một tệp mới có tên là "index.html".

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Chat</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/emojione/2.2.6/assets/css/emojione.min.css"/>
    <link rel="stylesheet" href="/style.css">

</head>
```
Tiếp theo chỉ là giao diện. Nó chỉ là nơi để xử lý lựa chọn một tên người dùng và gửi tin nhắn cùng với hiển thị tin nhắn trò chuyện mới. Chi tiết làm việc với VueJS nằm ngoài phạm vi của bài viết này nhưng hãy xem tài liệu nếu bạn chưa quen.

```
<body>
<header>
    <nav>
        <div class="nav-wrapper">
            <a href="/" class="brand-logo right">Simple Chat</a>
        </div>
    </nav>
</header>
<main id="app">
    <div class="row">
        <div class="col s12">
            <div class="card horizontal">
                <div id="chat-messages" class="card-content" v-html="chatContent">
                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="joined">
        <div class="input-field col s8">
            <input type="text" v-model="newMsg" @keyup.enter="send">
        </div>
        <div class="input-field col s4">
            <button class="waves-effect waves-light btn" @click="send">
                <i class="material-icons right">chat</i>
                Send
            </button>
        </div>
    </div>
    <div class="row" v-if="!joined">
        <div class="input-field col s8">
            <input type="email" v-model.trim="email" placeholder="Email">
        </div>
        <div class="input-field col s8">
            <input type="text" v-model.trim="username" placeholder="Username">
        </div>
        <div class="input-field col s4">
            <button class="waves-effect waves-light btn" @click="join()">
                <i class="material-icons right">done</i>
                Join
            </button>
        </div>
    </div>
</main>
<footer class="page-footer">
</footer>
```
Sau đó chỉ là nhập tất cả các thư viện JavaScript cần thiết để bao gồm Vue, EmojiOne, jQuery và Materialize. Chúng ta cũng cần một thư viện MD5 để lấy URL cho avatar từ Gravatar. Điều này sẽ được giải thích tốt hơn khi chúng ta giải quyết mã JavaScript. Cuối cùng, "app.js", là mã tùy chỉnh của chúng ta.
```
<script src="https://unpkg.com/vue@2.1.3/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/emojione/2.2.6/lib/js/emojione.min.js"></script>
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
<script src="/app.js"></script>
</body>
</html>
```
Tiếp theo, tạo một tệp có tên "style.css" trong thư mục "public". Ở đây chúng ta custom css.
```
body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

main {
    flex: 1 0 auto;
}

#chat-messages {
    min-height: 10vh;
    height: 60vh;
    width: 100%;
    overflow-y: scroll;
}
```

Phần cuối cùng của client là code JavaScript. Tạo một tệp mới trong thư mục "public" có tên là "app.js".

Như với bất kỳ ứng dụng VueJS nào chúng ta bắt đầu bằng cách tạo một đối tượng Vue mới. Tôi gắn nó vào một div với id của "#app". Điều này cho phép bất kỳ thứ gì trong div đó có phạm vi với thể hiện Vue đã tạo. Tiếp theo chúng ta định nghĩa một vài biến.
```
new Vue({
    el: '#app',

    data: {
        ws: null, // Our websocket
        newMsg: '', // Holds new messages to be sent to the server
        chatContent: '', // A running list of chat messages displayed on the screen
        email: null, // Email address used for grabbing an avatar
        username: null, // Our username
        joined: false // True if email and username have been filled in
    },
```
Vue cung cấp một thuộc tính được gọi là "created", nghĩa là một hàm mà bạn định nghĩa để xử lý bất cứ điều gì bạn muốn ngay sau khi thể hiện Vue được tạo ra. Điều này rất hữu ích cho bất kỳ công việc thiết lập nào bạn cần làm cho ứng dụng. Trong trường hợp này, chúng ta muốn tạo một kết nối WebSocket mới với máy chủ và tạo một trình xử lý khi các tin nhắn mới được gửi từ máy chủ. Tôi lưu trữ WebSocket mới trong biến "ws" được tạo trong thuộc tính "data".

Phương thức "addEventListener ()" là một hàm sẽ được sử dụng để xử lý các tin nhắn đến. Chúng ta mong muốn tất cả các tin nhắn là một chuỗi JSON vì vậy tôi phân tích cú pháp để nó là một đối tượng theo nghĩa đen. Sau đó, chúng ta có thể sử dụng các thuộc tính khác nhau để định dạng một dòng thông điệp đẹp hoàn chỉnh với một hình đại diện. Phương thức "gravatarURL ()" sẽ được giải thích sau. Ngoài ra, chúng tôi đang sử dụng một thư viện tiện lợi được gọi là EmojiOne để phân tích cú pháp mã biểu tượng cảm xúc. Phương thức "toImage ()" sẽ biến các mã biểu tượng cảm xúc đó thành hình ảnh thực tế. Ví dụ: nếu bạn nhập ": robot:", nó sẽ được thay thế bằng biểu tượng cảm xúc rô bốt.
```
created: function() {
        var self = this;
        this.ws = new WebSocket('ws://' + window.location.host + '/ws');
        this.ws.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            self.chatContent += '<div class="chip">'
                    + '<img src="' + self.gravatarURL(msg.email) + '">' // Avatar
                    + msg.username
                + '</div>'
                + emojione.toImage(msg.message) + '<br/>'; // Parse emojis

            var element = document.getElementById('chat-messages');
            element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
        });
    },
```

Thuộc tính " methods" là nơi tôi định nghĩa bất kỳ chức năng nào tôi muốn sử dụng trong ứng dụng VueJS. Phương thức "send" xử lý việc gửi tin nhắn đến máy chủ. Trước tiên, chúng tôi đảm bảo rằng tin nhắn không trống. Sau đó, chúng tôi định dạng thông báo dưới dạng đối tượng và sau đó "stringify ()" để máy chủ có thể phân tích cú pháp. Chúng tôi sử dụng một mẹo nhỏ của jQuery để thoát HTML và JavaScript khỏi mọi tin nhắn đến. Điều này ngăn chặn một số loại injection attacks
```
methods: {
        send: function () {
            if (this.newMsg != '') {
                this.ws.send(
                    JSON.stringify({
                        email: this.email,
                        username: this.username,
                        message: $('<p>').html(this.newMsg).text() // Strip out html
                    }
                ));
                this.newMsg = ''; // Reset newMsg
            }
        },
```
Function "join" sẽ đảm bảo người dùng nhập email và tên người dùng trước khi họ có thể gửi bất kỳ tin nhắn nào. Một khi họ join, tôi đặt join bằng "true" và cho phép họ bắt đầu trò chuyện.

```
join: function () {
            if (!this.email) {
                Materialize.toast('You must enter an email', 2000);
                return
            }
            if (!this.username) {
                Materialize.toast('You must choose a username', 2000);
                return
            }
            this.email = $('<p>').html(this.email).text();
            this.username = $('<p>').html(this.username).text();
            this.joined = true;
        },
```
Hàm cuối cùng là một hàm trợ giúp nhỏ để lấy URL avatar từ Gravatar. Phần cuối cùng của URL cần phải là chuỗi được mã hóa MD5 dựa trên địa chỉ email của người dùng. MD5 là một thuật toán mã hóa một chiều để nó giúp giữ email riêng tư trong khi đồng thời cho phép email được sử dụng như một định danh duy nhất.
```
        gravatarURL: function(email) {
            return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
        }
    }
});
```
**Chạy ứng dụng**

Để chạy ứng dụng, mở một cửa sổ console và đảm bảo rằng bạn đang ở trong thư mục "src" của ứng dụng, sau đó chạy lệnh sau.
```
$ go run main.go
```

Tiếp theo, mở trình duyệt web và nhập đường dẫn "http://localhost:8000". Màn hình trò chuyện sẽ được hiển thị và giờ đây bạn có thể nhập email và tên người dùng.
![](https://images.viblo.asia/e29fa108-3fbe-402d-818a-70d56a4c0026.png)
Để xem cách ứng dụng hoạt động với nhiều người dùng, chỉ cần mở một tab hoặc cửa sổ trình duyệt khác và điều hướng đến "http: // localhost: 8000". Nhập một email và tên người dùng khác. Thay phiên nhau gửi tin nhắn từ cả hai cửa sổ.

![](https://images.viblo.asia/da7ec405-b379-4193-80b6-92ab79babad9.png)
# Tổng kết
Đây chỉ là một ứng dụng trò chuyện cơ bản nhưng có nhiều cải tiến khác mà bạn có thể thực hiện cho nó. Bạn có thể nghịch với mã nguồn để thêm một số tính năng khác, xem liệu bạn có thể triển khai thông báo hoặc thông báo riêng tư khi người dùng mới tham gia hoặc rời khỏi cuộc trò chuyện hay không. Không gì là giới hạn cả!

Tôi hy vọng bạn thấy điều này hữu ích và bây giờ được truyền cảm hứng để bắt đầu tạo các ứng dụng thời gian thực của riêng bạn bằng cách sử dụng WebSockets và Go.

Toàn bộ source code của ứng dụng được lưu tại [đây](https://github.com/tuanhnt1712/go-realtime-chat)

Nguồn tham khảo: https://scotch.io/bar-talk/build-a-realtime-chat-server-with-go-and-websockets