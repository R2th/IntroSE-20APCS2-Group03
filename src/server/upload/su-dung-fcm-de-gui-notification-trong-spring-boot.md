# Sử dụng FCM để gửi notification trong Spring boot

<br>
<br>
<br>

### 1. Giới thiệu về FCM

<br>

Firebase Cloud Messaging (FCM) là một dịch vụ miễn phí của Google. Thông qua FCM, nhà phát triển ứng dụng có thể gửi thông điệp một cách nhanh chóng, an toàn tới các thiết bị cài đặt ứng dụng của họ.


### 2. Cách thức hoạt động của FCM

<br>

![](https://images.viblo.asia/65eba160-b49f-46fc-a665-282beee5a762.PNG)


<br>

Mô hình hoạt động của FCM. Đơn giản FCM hoạt động nhờ 3 thành phần:

1. Publisher: Nguồn gửi notification, đây chính là server API mà chúng ta sẽ cài đặt
2. FCM Server: Đây là API trung gian giữa Publisher và Client App có nhiệm vụ tiếp nhận Notification từ Publisher và push Notification tới client. Ngoài ra nó cũng tiếp nhận message đăng kí device token từ client.
3. Client app: Thiết bị nhận notification, cự thể ở đây là các thiết bị Android

<br>

Ở bài này, chúng ta sẽ đứng ở vai trò publisher để cài đặt thiết lập FCM. Cụ thể chúng ta sẽ thiết lập nó trong Project Spring boot.

### 3. Cài đặt FCM

<br>

***Bước 1:*** Trong Firebase console
<br>

https://console.firebase.google.com/u/0/

<br>

![](https://images.viblo.asia/c22a61c8-c17c-435e-b07a-4969e14d481f.PNG)

<br>

Chúng ta tạo mới một project trên firebase

<br>

![](https://images.viblo.asia/b65e0884-b768-40e4-bfd3-55f1aaf9c370.PNG)

<br>

Continue ->

<br>

![](https://images.viblo.asia/5b46d5e0-dd73-433a-b7bc-cdc72cd2cb0d.PNG)

<br>
<br>

***Bước 2:*** Tạo private key để sử dụng Firebase Admin SDK. Đây là SDK sẽ được thêm vào trong project Spring boot

*Project settings -> Service accounts -> Generate new private key*

<br>

![](https://images.viblo.asia/381b169a-2faa-4e5b-b5aa-13f43b908e37.PNG)

<br>

Tiếp theo

<br>

![](https://images.viblo.asia/eb3a721c-665d-4b1c-b254-14f60fc69639.PNG)

<br>

Tiếp theo

<br>

![](https://images.viblo.asia/19f6f7fc-8a0b-40da-8e65-030448889afa.PNG)

<br>

Ta sẽ nhận được một file json

<br>

![](https://images.viblo.asia/b669cd42-173b-4cea-b561-0d64fc5ad243.PNG)

<br>

### 4. Thêm và sử dụng Firebase Admin SDK

<br>

***Bước 1:*** Tạo project Spring boot

<br>

![](https://images.viblo.asia/5228d7d7-7955-4934-9381-3f7788ba40e4.PNG)

<br>

***Bước 2:*** Copy file Json mà mình tạo được từ bước Generate new private key vào resource và config file application.properties như sau

<br>

![](https://images.viblo.asia/78fdfe69-a7d4-4234-80e0-3773273ac594.PNG)

<br>

***Bước 3:*** Thêm dependency sau

```
<dependency>
  <groupId>com.google.firebase</groupId>
  <artifactId>firebase-admin</artifactId>
  <version>6.9.0</version>
</dependency>
```

## * Cấu trúc project

<br>

![](https://images.viblo.asia/c81eb888-b023-4af5-b4ae-8f34116dedd1.PNG)

<br>

**File: PushNotificationController**

```
@RestController
public class PushNotificationController {

    @Autowired
    private FCMService fcmService;

    @PostMapping("/notification")
    public String sendSampleNotification(@RequestBody PnsRequest pnsRequest) {
        return fcmService.pushNotification(pnsRequest);
    }
}
```

**File: PnsRequest**

```
public class PnsRequest {
    private String fcmToken;
    private String content;

    public String getFcmToken() {
        return fcmToken;
    }

    public void setFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
```

**File: FCMInitializer**

```
@Service
@Log4j
public class FCMInitializer {
    @Value("${app.firebase-configuration-file}")
    private String firebaseConfigPath;

    @PostConstruct
    public void initialize() {
        log.info("Start init");
        try {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())).build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                log.info("Firebase application has been initialized");
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
```

**File: FCMService**

```
@Service
public class FCMService {

    public String pushNotification(PnsRequest pnsRequest) {
        Message message = Message.builder()
                .putData("content", pnsRequest.getContent())
                .setToken(pnsRequest.getFcmToken())
                .build();

        String response = null;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
        }
        return response;
    }
}
```

**Kết quả test:**

<br>

![](https://images.viblo.asia/ca358b43-5a61-4d82-b9ea-03f59376943d.PNG)

<br>

### Vậy là mình đã hướng dẫn mọi người cách thêm FCM vào trong project Spring boot. Hi vọng bài viết này sẽ hữu ích với mọi người.