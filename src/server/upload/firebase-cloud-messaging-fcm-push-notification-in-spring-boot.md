# Firebase Cloud Messaging
Firebase Cloud Messaging (FCM) is a cross-platform messaging solution that lets you reliably deliver messages at no cost.
Using FCM, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement and retention. For use cases such as instant messaging, a message can transfer a payload of up to 4KB to a client app. [Read details](https://firebase.google.com/docs/cloud-messaging).

# Push notification using FCM
Now we will build an FCM push notification application using Spring Boot. At first we need to generate Firebase SDK admin key.

## Firebase SDK admin key
Got to firbase console: https://console.firebase.google.com/u/0/

* Create a new project  
* Generate new private key (*Project settings -> Service accounts -> Generate new private key*)
![](https://images.viblo.asia/7271bae3-135a-4b1e-9d5c-6a6b60b6a78c.png)

## Spring Boot application
Lets create a new Spring Boot project. Here is our project structure 
![](https://images.viblo.asia/2fdcf78b-1014-42be-866b-b79b122ba8ad.png)


Put generated Firebase Admin SDK JSON file inside project *src/main/resources* .  Here is application.properties.

```
app.firebase-config=fcm-test-62dad-firebase-adminsdk-3pd7w-bdaed458f4.json
````

We need to add Firebase dependencies in  *pom.xml*.

```
<dependency>
    <groupId>com.google.firebase</groupId>
    <artifactId>firebase-admin</artifactId>
    <version>6.9.0</version>
</dependency>
```

initialize Firebase app:
```
    @Value("${app.firebase-config}")
    private String firebaseConfig;

    private FirebaseApp firebaseApp;

    @PostConstruct
    private void initialize() {
        try {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfig).getInputStream())).build();

            if (FirebaseApp.getApps().isEmpty()) {
                this.firebaseApp = FirebaseApp.initializeApp(options);
            } else {
                this.firebaseApp = FirebaseApp.getInstance();
            }
        } catch (IOException e) {
            log.error("Create FirebaseApp Error", e);
        }
    }
```

### Push notification to device token
To send Push notification to device token, we just need device token and notification data.

**Controller:**
```
    @PostMapping("/token")
    public String sendPnsToDevice(@RequestBody NotificationRequestDto notificationRequestDto) {
        return notificationService.sendPnsToDevice(notificationRequestDto);
    }
```

**Dto:**
```
@Data
public class NotificationRequestDto {

    private String target;
    private String title;
    private String body;
}
```

**Service:**
```
    public String sendPnsToDevice(NotificationRequestDto notificationRequestDto) {
        Message message = Message.builder()
                .setToken(notificationRequestDto.getTarget())
                .setNotification(new Notification(notificationRequestDto.getTitle(), notificationRequestDto.getBody()))
                .putData("content", notificationRequestDto.getTitle())
                .putData("body", notificationRequestDto.getBody())
                .build();

        String response = null;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            log.error("Fail to send firebase notification", e);
        }

        return response;
    }
```

### Push notification to topic
To send Push notification to topic, at first we need to subscribe to topic by device token. So process will be subscribe to a topic by device token, send push notification by topic, we can unsubscribe from topic as well.

**Controller:**

```
    @PostMapping("/subscribe")
    public void subscribeToTopic(@RequestBody SubscriptionRequestDto subscriptionRequestDto) {
        notificationService.subscribeToTopic(subscriptionRequestDto);
    }

    @PostMapping("/unsubscribe")
    public void unsubscribeFromTopic(SubscriptionRequestDto subscriptionRequestDto) {
        notificationService.unsubscribeFromTopic(subscriptionRequestDto);
    }
    @PostMapping("/topic")
    public String sendPnsToTopic(@RequestBody NotificationRequestDto notificationRequestDto) {
        return notificationService.sendPnsToTopic(notificationRequestDto);
    }
```

**Dto:**
```
@Data
public class NotificationRequestDto {

    private String target;
    private String title;
    private String body;
}
```

**Service:**

```
    public void subscribeToTopic(SubscriptionRequestDto subscriptionRequestDto) {
        try {
            FirebaseMessaging.getInstance(firebaseApp).subscribeToTopic(subscriptionRequestDto.getTokens(),
                    subscriptionRequestDto.getTopicName());
        } catch (FirebaseMessagingException e) {
            log.error("Firebase subscribe to topic fail", e);
        }
    }

    public void unsubscribeFromTopic(SubscriptionRequestDto subscriptionRequestDto) {
        try {
            FirebaseMessaging.getInstance(firebaseApp).unsubscribeFromTopic(subscriptionRequestDto.getTokens(),
                    subscriptionRequestDto.getTopicName());
        } catch (FirebaseMessagingException e) {
            log.error("Firebase unsubscribe from topic fail", e);
        }
    }
    
    public String sendPnsToTopic(NotificationRequestDto notificationRequestDto) {
        Message message = Message.builder()
                .setTopic(notificationRequestDto.getTarget())
                .setNotification(new Notification(notificationRequestDto.getTitle(), notificationRequestDto.getBody()))
                .putData("content", notificationRequestDto.getTitle())
                .putData("body", notificationRequestDto.getBody())
                .build();

        String response = null;
        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            log.error("Fail to send firebase notification", e);
        }

        return response;
    }
```

## Summary
Here in this post we tired to cover Firebase Cloud Messaging integration using Spring Boot. Scource code available in [GitHub](https://github.com/MuhammadTamzid/fcm-demo) .