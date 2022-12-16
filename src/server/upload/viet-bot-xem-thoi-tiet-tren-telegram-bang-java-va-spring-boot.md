### Telegram
Telegram là ứng dụng nhắn tin tập trung vào tốc độ và bảo mật, nó siêu nhanh, đơn giản và miễn phí. Bạn có thể sử dụng Telegram cùng lúc trên nhiều thiết bị, tin nhắn được đồng bộ đồng thời trên tất cả các thiết bị: điện thoại, máy tính bảng hay máy tính.

Với Telegram, bạn có thể gửi tin nhắn, hình ảnh, video, file (bất kỳ loại nào từ doc, zip đến mp3...) cũng như tạo group lên tới 200.000 người hoặc tạo kênh để phát sóng nội dung đến số lượng khán giả không bị giới hạn. Bạn có thể gửi tin nhắn cho các số điện thoại có trong danh bạ, tìm người dùng theo username của họ. Telegram giống như sự kết hợp giữa SMS và email, có thể giải quyết tất cả những nhu cầu nhắn tin cá nhân hoặc công việc của bạn. Ngoài tất cả những tính năng trên, Telegram còn hỗ trợ các cuộc gọi thoại được mã hóa đầu cuối.

### Bot Telegram là gì? 
Bot Telegram là giống như một robot có sẵn trong ứng dụng nhằm giúp người dùng tạo lập và quản lý các bot. Nếu bạn lần đầu biết đến Bot API Telegram thì hãy truy cập vào trang web này để biết thêm thông tin.

Người dùng có thể điều khiển các bot để nhận thông báo và tin tức; tạo các công cụ tùy chỉnh; trải nghiệm trò chơi; tích hợp với các dịch vụ như Gmail Bot, GIF Bot, Wiki Bot,… Đặc biệt là sử dụng Bot Father để thực hiện tạo New Bot. Việc cài đặt Bot không khó như nhiều người suy nghĩ. Bạn có thể dễ dàng thực hiện việc này ngay cả khi bạn sử dụng điện thoại hay máy tính.  

### Hướng dẫn tạo Bot Telegram

1. Sau khi đăng nhập với tai khoản Telegram, chúng ta truy cập đến đường dẫn [BotFather](https://t.me/botfather). Click vào button Start, màn hình sẽ hiển thị một list các command để có thể giao tiếp

![](https://images.viblo.asia/4b9ad873-9a5b-4953-a855-11ac2de0f0d2.png)


2. Trong đoạn văn bản đó, bạn hãy nhấn /newbot – create a new bot.
3. Tiếp theo, bạn nhập tên cho newbot của bạn tùy ý thích. Nhấn Enter
4. Tiếp theo, Botfather sẽ yêu cầu bạn nhập tên người dùng cho bot của bạn. Botfather sẽ thông báo trên màn hình bạn đã tạo thành công new bot bao gồm đường link dẫn đến bot mới và mã HTTP API Telegram.

![](https://images.viblo.asia/01e8a330-81f7-40a5-86a5-ff7523fa5f99.png)

### Xây dựng Bot xem thời tiết bằng Java và Spring Boot

**1. Khởi tạo ứng dụng Spring Boot**

Đầu tiên chúng ta cần khởi tạo ứng dụng Spring Boot mới tại đây: [Spring Initializr](https://start.spring.io/)

- Mục Project: chọn **Gradle Project**
- Mục Language: chọn **Java**
- Mục Group: có thể nhập tuỳ ý, ở đây mình để mặc định là **com.example**
- Mục Artifact: có thể nhập tuỳ ý, mình sẽ nhập là **weatherbot**
- Mục Name: đây là tên của ứng dụng. Nhập **weatherbot**
- Mục Description: mô tả cho ứng dụng, có thể nhập tuỳ ý
- Mục Package name: để mặc định là **com.example.weatherbot**, các bạn có thể thay đổi nếu muốn
- Mục Packaging: chọn **Jar**
- Mục Java: **11**. Chung ta chọn Java 11 thay vì java 8 để có thể sử dụng HTTP Client API sẵn có trong JDK 11
- Phần Dependencies:  Chúng ta chọn thêm thư viện Lombok

![](https://images.viblo.asia/463aa74d-c3a6-4a34-bf8c-e427841e5134.png)

Sau đó nhấn **Generate**, projects sẽ được tải về máy.

**2. Cấu hình cho Bot**

Các thư viện sử dụng để xây dựng Bot:

- **TelegramBots**: Thư viện java để tạo Telegram Bot. Link github: https://github.com/rubenlagus/TelegramBots
- **Simple Telegram Command Bot Spring Boot Starter**: Project do mình tự xây dựng hỗ trợ tự động cấu hình nhanh ứng dụng Spring Boot điều khiển Bot Telegram tự động trả lời tin nhắn khi nhận được lệnh từ người dùng. Link github: https://github.com/ndanhkhoi/simple-telegram-command-bot-spring-boot-starter

Thêm dependencies vào file **build.gradle**:

```gradle
...
repositories {
	...
	maven { url 'https://jitpack.io' }
}

...

dependencies {
    ...
	implementation 'org.telegram:telegrambots:6.1.0'
	implementation 'com.github.ndanhkhoi:simple-telegram-command-bot-spring-boot-starter:2022.10.05'
}
```

Thêm cấu hình bot: tiến hành đổi tên file **application.properties** thành  **application.yml**, sau đó thêm vào đoạn cấu hình sau:

```yaml
khoinda:
  bot:
    username: {username}
    token: {token}
    bot-route-packages:
        - {package}
```

Trong đó:

* **{username}**: là username của bot chúng ta đã khai báo ở trên với Bot's Father
* **{token}**: là mã HTTP API Telegram mà Bot's Father đã sinh ra ở bước trên
* **{package}**: là tên package chứa các class xử lý việc trả lời tin nhắn của Bot. Ở đây chúng ta điền packge name đã khai báo lúc khởi tạo ứng dụng: **com.example.weatherbot**

Tới bước này thì Bot của chúng ta đã có thể xử lý 1 số lệnh mặc định có sẵn như: **/start, /help**

Tiến hành chạy thử ứng dụng: mở terminal, chạy lệnh sau:

```shell
./gradlew bootRun # hoặc gradlew bootRun nếu chạy trên CMD
```

Ứng dụng sau khi khởi chạy thành công

![](https://images.viblo.asia/f2289b6f-3fc9-48f6-b785-eb39194bcc04.png)

Test thử Bot, mở Telegram, truy cập vào link Bot do Bot's Father sinh ra và nhấn thử các lệnh /start và /cmd:

![](https://images.viblo.asia/623e76c1-eedf-4233-83c6-fda0b02c8cb6.png)



**3. Viết hàm xử lý Bot trả lời tự động khi nhận được lệnh xem thời tiết**

Trong package **com.example.weatherbot**, tiến hành tạo 1 class mới với tên **WeatherRoute**

```java

@BotRoute
@Slf4j
public class WeatherRoute {



}
```

Trong đó:

* @Slf4j: là annotation của Lombok hỗ trợ ghi log trong ứng dụng
* @BotRoute: là annotation của Simple Telegram Command Bot Spring Boot Starter, đánh dấu đây là class chứa các hàm xử lý khi Bot nhận nhận được tin nhắn

Thông tin thời tiết chúng ta sẽ tiến hành lấy từ https://wttr.in/  - một trang web open source cho phép lấy thông tin thời tiết hiện tại ở các địa điểm khác nhau. Chi tiết trên [Github](https://github.com/chubin/wttr.in)

Do cần lấy thông tin thời tiết từ API nên chúng ta sẽ tiến hành khai báo 1 HTTP Client để sử dụng

```java
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();
```

Sau đó tiền hành viết hàm xử lệnh cho Bot

```java
    @CommandDescription("Xem thời tiết")
    @CommandMapping(value = "/weather", parseMode = MessageParseMode.HTML, allowAllUserAccess = true)
    public String getCurrentWeather(Update update, @CommandBody(description = "Tên thành phố") String cityName) {
        if (cityName != null && !cityName.isBlank()) {
            try {
                String urlString = "https://vi.wttr.in/" + URLEncoder.encode(cityName, StandardCharsets.UTF_8) + "?m?T?tqp0";
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(urlString))
                        .GET()
                        .build();
                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
                String body = response.body();
                String result = body.substring(body.indexOf("<pre>") + 5, body.indexOf("</pre>"));
                return TelegramMessageUtils.wrapByTag(result, TelegramTextStyled.CODE);
            }
            catch (Exception ex) {
                log.error("Có lỗi xảy ra", ex);
                return "Có lỗi xảy ra";
            }
        }
        else {
            return "Vui lòng nhập tên thành phố !";
        }
    }
```

Các annotations của Simple Telegram Command Bot Spring Boot Starter sử dụng trong đoạn code này:

*  @CommandDescription: mô tả cho lệnh
*  @CommandMapping: đánh dấu phương thức này là phương thức xử lý khi Bot nhận được lệnh nào đó. Thuộc tính *value = "/weather"*  cho biết phương thức này sẽ xử lý lệnh **/weather**, *parseMode = MessageParseMode.HTML* đánh dấu tin nhắn phản hồi sẽ được gửi dạng HTML, *allowAllUserAccess = true* cho phép lệnh này có thể được gọi bởi tất cả các user
*  @CommandBody: Đánh dấu param này sẽ lưu giá trị của đối số truyền cho lệnh

Kết quả trả về của hàm sẽ là nội dung tin nhắn được phản hồi cho người dùng.

Nội dung class WeatherRoute sau khi hoàn thiện: 

```java
@BotRoute
@Slf4j
public class WeatherRoute {

    private static final HttpClient httpClient = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @CommandDescription("Xem thời tiết")
    @CommandMapping(value = "/weather", useHtml = true, allowAllUserAccess = true)
    public String getCurrentWeather(Update update, @CommandBody(description = "Tên thành phố") String cityName) {
        if (cityName != null && !cityName.isBlank()) {
            try {
                String urlString = "https://vi.wttr.in/" + URLEncoder.encode(cityName, StandardCharsets.UTF_8) + "?m?T?tqp0";
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(urlString))
                        .GET()
                        .build();
                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
                String body = response.body();
                String result = body.substring(body.indexOf("<pre>") + 5, body.indexOf("</pre>"));
                return TelegramMessageUtils.wrapByTag(result, TelegramTextStyled.CODE);
            }
            catch (Exception ex) {
                log.error("Có lỗi xảy ra", ex);
                return "Có lỗi xảy ra";
            }
        }
        else {
            return "Vui lòng nhập tên thành phố !";
        }
    }

}
```

Tiến hành chạy lại ứng dụng:

```shell
./gradlew bootRun # hoặc gradlew bootRun nếu chạy trên CMD
```

Test thử Bot:

Truy cập vào bot và chat lệnh sau:

```
/weather Cần Thơ
```

Kết quả như sau:

![](https://images.viblo.asia/a3146822-cfc8-4753-b299-85b4e14f8940.png)

### Tổng kết

Như vậy là chúng ta đã tạo xong Bot Chat Telegram đơn giản cho phép xem thông tin thời tiết hiện tại theo địa điểm. Các bạn có thể phát triển thêm cấc chức năng khác cho Bot bằng cách thêm các hàm @CommandMapping để xử lý các lệnh khác.
Ngoài ra [Simple Telegram Command Bot Spring Boot Starter](https://github.com/ndanhkhoi/simple-telegram-command-bot-spring-boot-starter) còn cung cấp các tuỳ chọn khác như gửi file, gửi voice chat, phân quyền user gọi lệnh, .... Mình sẽ viết cụ thể hơn vào các bài sau. Cảm ơn các bạn đã theo dõi. See you next time!

### Các nguồn tham khảo:

* https://core.telegram.org/bots/api
* https://github.com/rubenlagus/TelegramBots