## Overview

Trong bài viết sẽ tạo mộ ứng dụng web thực thi gửi tin nhắn sử dụng tính năng `Websocket` với `Spring Framework 5.0`. `Websocket` là kết nối 2 chiều, song công, liên tục giữa máy chủ và trình duyệt. Sau khi Websocket được thiết lập kết nối, kết nối vẫn mở cho đến khi client hoặc máy chủ quyết định đóng kết nối này.

Các case sử dụng có thể khi một ứng dụng liên quan nhiều user liên lạc với nhau, từ server đến client chẳng như notification, chat. Chúng ta sẽ build một ứng dụng đơn giản nhận notification sử dụng [STOMP](https://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol) messaging với Spring để tạo tương tác qua web khi có một notification được tạo sẽ push message cho các client đã subscribed.

## Coding

### Dependencies
Trước tiên cần thêm các dependency vào `build.gradle.kts` như sau

``` kotlin
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.5.1"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    kotlin("jvm") version "1.5.10"
    kotlin("plugin.spring") version "1.5.10"
}

group = "dev.hlk"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib")

   // Swagger OpenAPI
    implementation("org.springdoc:springdoc-openapi-ui:1.5.9")
    implementation("org.springdoc:springdoc-openapi-kotlin:1.5.9")

    // Websocket
    implementation("org.springframework:spring-websocket:5.3.8")
    implementation("org.springframework:spring-messaging:5.3.8")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}
```

Sau khi thêm cần phải build lại bằng command `./gradlew build` hoặc qua nút ![](https://images.viblo.asia/fa2c98ce-9a5f-4539-a1e2-e376761d7775.png)
 reload của IDEA Intellij
### WebSocket Configuration
Tạo một file config cho Websocket:

``` kotlin
// config/WebSocketConfig.kt
@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig : WebSocketMessageBrokerConfigurer {
    override fun configureMessageBroker(registry: MessageBrokerRegistry) {
        registry.apply {
            enableSimpleBroker("/topic")
        }
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.apply {
            addEndpoint("/notification").withSockJS()
        }
    }
}
```

WebSocketConfig được thêm annotation `@Configuration` để chỉ rằng nó là một configuration class, `@EnableWebSocketMessageBroker` bật tính năng xử lý Websocket message bởi một message broker.

Method `configureMessageBroker()` thực thi method mặc định trong `WebSocketMessageBrokerConfigurer` để config message broker. Nó bắt đầu gọi `enableSimpleBroker()` để bật một message broker đơn giản trong bộ nhớ chứa tin nhắn cho client với đích có prefix `/topic`.

Method `registerStompEndpoints()` đăng ký Websocket endpoint mở cho SockJS client kết nối qua `/notification`.

### Web Controller
Tạo controller `NotificationWebController` trong `/controller/web/NotificationWebController.kt` dành cho view.

``` kotlin
@Controller
class NotificationWebController {
    @GetMapping("/notifications")
    fun index() = ModelAndView("notifications/index")
}
```

### API Controller
Tạo controller `NotificationController` trong `/controller/api/NotificationController.kt` dành cho việc push notification.

``` kotlin
@RestController
class NotificationController(
    private val notificationService: NotificationService
) {
    @PostMapping("/pushNotification")
    fun pushNotification(@RequestBody payload: NotificationDao): Boolean {
        return notificationService.send(payload)
    }
}
```

### Client
Với server-side đã tạo thì bên client cần có phần nhận notification từ server.

Để có thể dùng `views` cần phải config thêm trong application.yml
 ``` yml
 spring:
  mvc:
    view:
      prefix: /views/
      suffix: .html
  ```
Tạo một `index.html` trong `resources/static/views/notifications/index.html`.

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Websocket</title>

    <!-- CSS -->
    <link rel="stylesheet" href="../../css/app.css">
    <link rel="stylesheet" href="../../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../../css/bootstrap/bootstrap-grid.min.css">
    <link rel="stylesheet" href="../../css/bootstrap/bootstrap-reboot.min.css">

    <!-- JS -->
    <script src="../../js/jquery.min.js"></script>
    <script src="../../js/bootstrap/popper.min.js"></script>
    <script src="../../js/bootstrap/bootstrap.bundle.min.js"></script>
    <script src="../../js/bootstrap/bootstrap.min.js"></script>
    <script src="../../js/sockjs.js"></script>
    <script src="../../js/stomp.js"></script>
    <script src="../../js/timeago.full.min.js"></script>
    <script src="../../js/app.js"></script>
</head>
<body>
<h2>Notifications</h2>
<ul id="notifications"></ul>

<div class="toast" id="js-toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <path style="fill:#FF8A1E;" d="M174.74,430.93c0,44.878,36.382,81.07,81.26,81.07l22.261-103.331L174.74,430.93z"/>
            <path style="fill:#FF562B;" d="M256,512c44.878,0,81.26-36.192,81.26-81.07L256,408.669V512L256,512z"/>
            <polygon style="fill:#FFA418;" points="34.846,364.142 34.846,430.93 256,430.93 278.261,341.881 "/>
            <path style="fill:#FFBE11;" d="M256,0C176.159,0,111.837,59.674,99.965,136.479c-5.683,36.763-25.84,146.535-25.84,146.535  l204.137,22.261L256,0z"/>
            <g><path style="fill:#FF8A1E;" d="M437.877,283.016c0,0-20.158-109.774-25.842-146.537C400.162,59.674,335.841,0,256,0v305.277   L437.877,283.016z"/>
                <polygon style="fill:#FF8A1E;" points="256,341.881 256,430.93 477.154,430.93 477.154,364.142  "/>
            </g>
            <path style="fill:#FFD460;" d="M256,283.016H74.123c-23.905,18.925-39.277,48.417-39.277,81.126H256l22.261-40.563L256,283.016z"/>
            <path style="fill:#FFA418;" d="M437.877,283.016H256v81.126h221.154C477.154,331.433,461.781,301.941,437.877,283.016z"/>
            <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
        </svg>

        <strong class="js-toast-title mr-auto"></strong>
        <small class="js-toast-timestamp"></small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body js-toast-content"></div>
</div>
</body>
</html>
```

Tạo `app.js` trong `resources/static/js/app.js`
``` js
let stompClient = null;

function connect() {
    let socket = new SockJS("/notification");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe("/topic/notifications", function (notification) {
            showNotification(JSON.parse(notification.body));
        });
    });

    // Reconnect socket
    socket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    }
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function showNotification(notification) {
    let elem = document.createElement("li");
    let data = "Title: " + notification.title
        + " - Timestamp: " + notification.timestamp
        + " - Content: " + notification.content;
    elem.appendChild(document.createTextNode(data));
    $("#notifications").append(elem);
    $('#js-toast').on('show.bs.toast', function () {
        let that = $(this);
        let header = that.children(".toast-header");
        header.children(".js-toast-timestamp").text(timeago.format(Date.parse(notification.timestamp)))
        header.children(".js-toast-title").text(notification.title);
        that.children(".js-toast-content").text(notification.content);
    })
    $(".toast").toast("show");
}

$(function () {
    disconnect();
    connect();
    $(".toast").toast({
        delay: 2000 // ms
    });
});

// Disconnect on close tab
window.onbeforeunload = function () {
    disconnect();
};
```

- Phần chính trong đoạn JS là `connect()` và `showNotification()`
- `connect()` function sử dụng [SockJS](https://github.com/sockjs) và [stomp.js](http://jmesnil.net/stomp-websocket/doc/) mở kết nối đến `/notifications`, là endpoint SockJS server chờ các kết nối. Khi kết nối thành công, client sẽ subscribe đến đích `/topic/notifications` phần mà server sẽ publish. Khi nhận notification DOM sẽ chền vào list và có sử dụng [Toasts](https://getbootstrap.com/docs/4.3/components/toasts/) của bootstrap để làm popup.
- `showNotification()` function nhận nội dung message để hiển thị.
- `socket.onclose(function(){})` phụ vụ cho việc kết nối lại với server khi server fail/restart.

## Demo
Trong demo này cho thấy các trình duyệt nhận notification sau khi thao tác qua swagger gọi 1 API endpoint `/notifications` và nội dụng gồm `title, content, timestamp`.
{@embed: https://www.youtube.com/watch?v=7hEVVZdnQJI}

Cảm ơn các bạn đã đọc bài viết. :wink:
#### References
- [Spring WebSockets](https://docs.spring.io/spring-framework/docs/5.3.8/reference/html/web.html#websocket)
- [Using WebSocket to build an interactive web application](https://spring.io/guides/gs/messaging-stomp-websocket/)
- [Intro to WebSockets with Spring](https://www.baeldung.com/websockets-spring)
-  [SockJS](https://github.com/sockjs)
-  [stomp.js](http://jmesnil.net/stomp-websocket/doc/)