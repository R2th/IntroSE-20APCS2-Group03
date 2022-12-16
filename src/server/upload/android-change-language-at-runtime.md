# Overview
Thay đổi ngôn ngữ trong Android, 1 chủ đề nghe đã quá quen thuộc và đơn giản đối với mỗi lập trình viên Android. Tuy nhiên, chủ đề này vẫn đang được thảo luận sôi nổi giữa các nhà phát triển (developers) do API và behavior  thay đổi thường xuyên. Mục tiêu của bài viết này là thu thập tất cả các mẹo và giải quyết tất cả các cạm bẫy trong quá trình triển khai chức năng này. 

Thay đổi ngôn ngữ trên Android trong thời gian thực (on runtime) chưa bao giờ được khuyến khích hoặc ghi nhận chính thức. Resource framework sẽ tự động chọn tài nguyên phù hợp nhất với thiết bị. Hành vi như vậy là đủ cho các ứng dụng phổ biến, vì vậy chỉ cần đảm bảo rằng bạn có lý do chính xác để thay đổi nó trước khi tiếp tục.

Có rất nhiều bài báo và câu trả lời trên Stack Overflow nhưng chúng thường thiếu đủ lời giải thích. Do đó, khi chức năng này bị deprecated (không dùng được), các nhà phát triển(developers) không thể dễ dàng sửa chữa nó do API lộn xộn và nhiều thứ không dùng nữa. Chắc chắn chúng ta không muốn rơi vào cùng một cái bẫy, phải không? Đó là lý do tại sao mình muốn đi từng bước đến giải pháp cuối cùng.

Les't go :D

# Getting started
> Đảm bảo rằng bạn đã quen thuộc với các khái niệm sau: **Resources**, **Configuration**, and **Locale**.

Về mặt kỹ thuật, để có get được dữ liệu **localized** , người ta sử dụng **Resources**  với bộ **Locale**  mong muốn trong **Configuration**. Về cơ bản, có ba loại tài nguyên bạn nên lo lắng:
- resources from Activity.getResources
- resources from Application.getResources
-  **the top level resources**

**the top level resources** được tạo cho một gói(package) cụ thể trong quá trình khởi tạo ứng dụng. Ví dụ: tiêu đề của Activity được khai báo trong tệp Manifest của bạn được load chính xác từ các resources này. Thông thường, tất cả các resources này đều giống nhau, nhưng không phải lúc nào cũng vậy.

Hãy xem cách chúng ta có thể thay đổi ngôn ngữ trên các cấp API khác nhau.

## Up through API level 16
Thay đổi ngôn ngữ trong giai đoạn này là khá đơn giản. Hãy xem xét đoạn mã sau:

```java
public class LocaleManager {

    public static void setLocale(Context c) {
        setNewLocale(c, getLanguage(c));
    }

    public static void setNewLocale(Context c, String language) {
        persistLanguage(c, language);
        updateResources(c, language);
    }

    public static String getLanguage(Context c) { ... }

    private static void persistLanguage(Context c, String language) { ... }

    private static void updateResources(Context context, String language) {
        Locale locale = new Locale(language);
        Locale.setDefault(locale);

        Resources res = context.getResources();
        Configuration config = new Configuration(res.getConfiguration());
        config.locale = locale;
        res.updateConfiguration(config, res.getDisplayMetrics());
    }
}
```

Chúng ta có một lớp LocaleManager bao bọc một logic của việc thay đổi ngôn ngữ ứng dụng. Hãy tập trung vào phương pháp ***updateResources***. Tất cả những gì ở đây là cập nhật tài nguyên thông qua ***updateConfiguration***  với cấu hình bao gồm ngôn ngữ mong muốn.

Có vẻ là OK rồi đấy, nhưng bạn có thể hỏi khi nào gọi nó. Phần này hơi phức tạp một chút:

- Nơi đầu tiên sẽ là màn hình “Cài đặt” (Setting) hoặc bất kỳ nơi nào bạn sử dụng để thay đổi ngôn ngữ trong ứng dụng của mình. Lưu ý rằng sau khi thay đổi ngôn ngữ, bạn vẫn phải reload các chuỗi đã được tìm nạp theo cách thủ công. Chúng ta sẽ nói về cách thực hiện chính xác ở cuối phần này.
- Những nơi khác là **onCreate** và **onConfigurationChanged** trong **Application**. Android đặt lại ngôn ngữ cho các **top level resources** trở về mặc định của thiết bị vào mỗi lần khởi động lại ứng dụng và thay đổi cấu hình. Vì vậy, hãy đảm bảo rằng bạn thực hiện cập nhật mới ở đó.

> Bên cạnh đó, bạn nên lưu thông tin về một ngôn ngữ đã chọn trong một số vùng lưu trữ (storage) để lấy lại khi cần. SharedPreferences là một lựa chọn tốt.


### Settings screen
Quay lại trường hợp với màn hình “Cài đặt” của bạn. Hãy tưởng tượng rằng bạn đã dành một chút thời gian để chơi xung quanh ứng dụng của mình và sau đó thay đổi ngôn ngữ trong màn hình cài đặt của bạn. Activity hiện tại và các Activity khác trong ngăn xếp phía sau đã sử dụng ngôn ngữ trước đó để hiển thị nội dung. Bạn phải làm mới chúng bằng cách nào đó. Cách đơn giản nhất là clear task hiện có và bắt đầu tác vụ (task) mới. Đây chính xác sẽ là lúc cạm bẫy đầu tiên ập đến. :D

**Cạm bẫy 1**. Title của Activity không được dịch hoặc trộn lẫn với các ngôn ngữ khác nhau!<br>
Refs: https://miro.medium.com/max/350/1*RwUZFzrcFmfwvI3p_o9lhA.gif

Sau khi thay đổi ngôn ngữ, Title Activity đôi khi không được dịch đúng cách ngay cả khi đã khởi động lại Activity.

Mình đã mất một khoảng thời gian để tìm hiểu chuyện gì đang xảy ra. Trong khi khởi chạy một Activity, tiêu đề của nó (được khai báo trong tệp kê khai) đang được tải từ các tài nguyên cấp cao nhất(**top level resources**) và được lưu vào bộ nhớ đệm (**cached**). Đó là lý do của việc nhận được cùng một tiêu đề cho lần tiếp theo và bỏ qua một ngôn ngữ mới bạn đã đặt.

- Vậy làm sao để giải quyết vấn đề này?? How to reproduce???

Hãy tưởng tượng rằng ngôn ngữ thiết bị của bạn là tiếng Anh và ứng dụng của bạn bao gồm ba Activity: **A**, **B** và **C**. Bạn bắt đầu hoạt động **A** và sau đó mở **B**. Tiêu đề cho cả hai Activity đang được lưu vào bộ nhớ đệm. Trong activity **B**, bạn thay đổi ngôn ngữ sang tiếng Ukraina và bắt đầu activity **C**. Tại thời điểm này, tiêu đề cho **A** và **B** được lưu vào bộ nhớ đệm bằng tiếng Anh trong khi nó bằng tiếng Ukraina cho **C**.

> Lưu ý rằng hành vi (behavior) này có liên quan đến tất cả các cấp API.

- Vậy, hướng giải quyết sẽ là xóa cache?? How to clear the cache???

Cách đơn giản nhất là khởi động lại quy trình ứng dụng của bạn (kiểm tra ProcessPhoenix) ngay sau khi bạn cập nhật ngôn ngữ. Tuy nhiên, nó có thể không được chấp nhận đối với một số ứng dụng vì nó là một tác vụ khá nặng và không mang lại trải nghiệm người dùng liền mạch.

> Lưu ý rằng thay đổi cấu hình cũng sẽ xóa bộ nhớ cache. Một cách hack khác là sử dụng Java Reflection API. Nhân tiện, các bạn hãy chia sẻ nếu bạn có cách nào tốt hơn nhé

Thay vào đó, bạn có thể đặt tiêu đề theo cách thủ công trong **onCreate** bằng cách sử dụng local activity resources và không phụ thuộc vào các thực thể(entities) được lưu trong bộ nhớ cache. Bạn có thể muốn sử dụng một giải pháp thay thế trong BaseActivity của mình.

## API level 17
Tại thời điểm này, Android giới thiệu  bidirectional layouts  cùng với một thay đổi nhỏ trong resources API.

Kể từ đó, thay vì sửa đổi trực tiếp biến ngôn ngữ, bạn nên sử dụng phương thức setLocale bổ sung đặt hướng bố cục bên trong.

```java
    private static void updateResources(Context context, String language) {
        ...
        if (Build.VERSION.SDK_INT >= 17) {
            config.setLocale(locale);
        } else {
            config.locale = locale;
        }
        res.updateConfiguration(config, res.getDisplayMetrics());
    }
```

## API level 25
Tại thời điểm này, **updateConfiguration** for Resources không còn được dùng nữa để thay thế cho ***createConfigurationContext*** (đã được thêm vào trong API 17).

Vậy chúng ta thay đổi điều gì bây giờ? Về cơ bản, thay vì cập nhật các resources hiện có, bạn cần tạo một Ngữ cảnh(**Context**) mới với các resources được cấu hình phù hợp và đặt nó làm base cho *Application*  và *Activity* thông qua *attachBaseContext*. Do đó, tất cả các lệnh gọi getResources sẽ được ủy quyền cho các resources mới thay vì **top level**.
```java
public class LocaleManager {
    ...
    private static Context updateResources(Context context, String language) {
        Locale locale = new Locale(language);
        Locale.setDefault(locale);

        Resources res = context.getResources();
        Configuration config = new Configuration(res.getConfiguration());
        if (Build.VERSION.SDK_INT >= 17) {
            config.setLocale(locale);
            context = context.createConfigurationContext(config);
        } else {
            config.locale = locale;
            res.updateConfiguration(config, res.getDisplayMetrics());
        }
        return context;
    }
}
```

```java
public class App extends Application {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(LocaleHelper.setLocale(base));
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        LocaleManager.setLocale(this);
    }
    ...
}
```

```java
public abstract class BaseActivity extends AppCompatActivity {
    
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(LocaleHelper.setLocale(base));
    }
    ...
}
```

TÓM LẠI, chúng ta sẽ sử dụng:
- *updateConfiguration* for API < 17
- *createConfigurationContext* for API ≥17

Mình đã hoang mang khi title activity cũng không được dịch lại đối với API ≥17. Lần này có chuyện gì vậy?

![](https://images.viblo.asia/8bed348f-0dc1-427d-9e93-8594f6f8ae4f.jpeg)

**Cạm bẫy 2**. Title của Activity không được dịch bằng createConfigurationContext!<br>

Chúng ta hãy kiểm tra những gì chúng ta đã làm từng bước để tìm ra vấn đề:
- Chúng ta tạo một Context đặc biệt sở hữu một instance localized Resources mới.
- Chúng ta đặt Context này làm base cho một application và activity thông qua *attachBaseContext*.

à đây rồi! Bạn có nhớ các tài nguyên cấp cao nhất (**top level resources**) mà chúng ta đã nói trước đây không? Có vẻ như không có cách nào để cập nhật chúng với sự trợ giúp của *createConfigurationContext*. Do đó, ứng dụng sử dụng ngôn ngữ mặc định để get titles.

Vậy có những tùy chọn nào để khắc phục hành vi này:
- Sử dụng *updateConfiguration*  cho tất cả các cấp API để cập nhật các tài nguyên cấp cao nhất bỏ qua việc ngừng sử dụng (deprecation).
- Sử dụng *updateConfiguration* cho API <17 và *createConfigurationContext* cho API ≥17 để tôn trọng việc không dùng nữa (deprecation). Như một tác dụng phụ, bạn phải đặt tiêu đề của Activity trong onCreate theo cách thủ công bằng cách sử dụng local Resources.

> Lưu ý rằng bạn phải gọi *attachBaseContext* trong các *components*  khác như Dịch vụ (Service) để cập nhật tài nguyên cho chúng. Một cạm bẫy khác của việc sử dụng *createConfigurationContext* là bạn không thể thực sự cập nhật tài nguyên cho Ứng dụng sau khi bạn thay đổi ngôn ngữ trong thời gian chạy(runtime) vì *attachBaseContext*  không bao giờ được gọi lại. Do đó, bạn phải khởi động lại ứng dụng để cập nhật tài nguyên.

Haizz, khá mệt rồi mà vẫn chưa tìm ra lối thoát.

Tiếp tục, hãy kiểm tra phần API cấp 26 để đưa ra quyết định cuối cùng nhé.

> Lưu ý rằng *applyOverrideConfiguration* có thể được sử dụng như một giải pháp thay thế cho *attachBaseContext*. Nó thực hiện điều tương tự nhưng chỉ tồn tại cho Activity.

## API level 26
Từ API 25 trở đi, application  và activities của bạn chia sẻ cùng một tài nguyên (hay còn gọi là tài nguyên cấp cao nhất) theo mặc định. Có nghĩa là một lệnh gọi *updateConfiguration* từ bất kỳ context nào sẽ cập nhật các tài nguyên (resource). Tuy nhiên, bắt đầu từ API 26, tài nguyên cho một application và một activity là các thực thể riêng biệt, vì vậy bạn cần cập nhật chúng riêng biệt tương ứng (ví dụ: trong onCreate of your Application và BaseActivity).

# Conclusions
Hãy tổng hợp và xem cuối cùng chúng ta có những lựa chọn nào nhé:
- Sử dụng *updateConfiguration* cho tất cả các cấp API trong onCreate of Application và BaseActivity của bạn để cập nhật các tài nguyên bỏ qua việc không dùng nữa (deprecation). Hãy nhớ giải quyết vấn đề bộ nhớ cache trong trường hợp này.
- Sử dụng *updateConfiguration* cho API <17 và *createConfigurationContext* cho API ≥17 để tôn trọng việc không dùng nữa (deprecation). Ngoài ra, bạn phải đặt tiêu đề Hoạt động theo cách thủ công bằng cách sử dụng tài nguyên cục bộ (xem Phụ lục A).

Vậy bạn chọn phương án nào?? Hãy quyết định nhé :D

<br><br><br>
**Appendix A (Phụ lục A)**

Đây là một giải pháp khả thi để đặt tiêu đề activiity bằng cách sử dụng phiên bản Tài nguyên cục bộ. Nó có ý định phá vỡ sự phụ thuộc vào bộ nhớ cache và các tài nguyên cấp cao nhất.
```java
public abstract class BaseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        resetTitle();
    }

    private void resetTitle() {
        try {
            int label = getPackageManager().getActivityInfo(getComponentName(), GET_META_DATA).labelRes;
            if (label != 0) {
                setTitle(label);
            }
        } catch (NameNotFoundException e) { ... }
    }
    ...
}
```

<br><br><br>
- Tài liệu tham khảo: https://proandroiddev.com/change-language-programmatically-at-runtime-on-android-5e6bc15c758