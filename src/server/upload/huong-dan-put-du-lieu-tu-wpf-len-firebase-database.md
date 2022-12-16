![](https://images.viblo.asia/93a42995-897d-40e4-b623-38147f791abd.png)

Chào các bạn!

Như đã hẹn, mỗi tháng 1 bài, hôm nay mình sẽ hướng dẫn các bạn upload dữ liệu từ ứng dụng viết bằng Wpf lên Firebase Database.

Tại sao lại có bài viết này? Đó là khi chúng ta tạo ra những ứng dụng, muốn backup dữ liệu nhưng lại không có hệ thống server (vì nhiều lý do, không có kinh phí, không có khả năng xây dựng server database...), vậy thì Firebase đang free database là thứ đơn giản gọn nhẹ cho bạn đó ;)

Vậy việc của chúng ta là gì? Đầu tiên bạn cần xem lại bài toán của mình, bài toán đặt ra là chúng ta đang có 1 ứng dụng viết bằng Wpf (c#), chúng ta có dữ liệu trong ứng dụng, tất nhiên lưu dưới local thoải mái, tuy nhiên tránh rủi ro như hỏng ổ cứng, mất điện nhưng vẫn cần xem lại data trên điện thoại... Vậy thì chúng ta sẽ cần backup dữ liệu lên 1 cloud nào đó, tốc độ không quá quan trọng, điều quan trọng là bảo mật và FREEEEEEEEEEEEEEEEEEEE. Firebase chính là điều bạn cần lúc này!

Tiếp theo, chúng ta cần hiểu 1 chút rằng Firebase sẽ không free mãi mãi, nó có giới hạn lưu lượng của chúng ta, tuy nhiên hãy nhớ, database của Firebase là dạng Json, vì vậy nó cũng rất nhẹ, đây lại là hệ thống backup vì vậy chúng ta không cần phải luôn gọi nó, chỉ cần gọi khi dữ liệu cần lưu lại, và vì thế nó là hoàn hảo trong trường hợp này! ;)

Ok, lý do thì vô kể, nhưng cứ coi như những gì mình vừa lập luận là đúng cho nó không bị loãng topic nhé :v

Vào việc!

### Bước 1: Object hóa dữ liệu.
- Trong C#, chúng ta có thể định nghĩa các kiểu dữ liệu, hay có thể hiểu là chúng ta sẽ gom nhiều dữ liệu vào thành 1 gói với định danh nhất định, trong làm game mình gọi nó là 1 Object :D
- Việc Object hóa nó sẽ giúp ta quản lý dữ liệu tốt hơn, hướng đối tượng hơn, và cũng chính là việc cần làm trước khi chúng ta biến chúng thành Json để đẩy lên trên Firebase. (Nhắc lại lần nữa database của Firebase là Json)
- Các bạn khởi tạo những Class có chứa các dữ liệu bạn cần lưu. Ví dụ sau:

```
public class AppSettings
    {
        public string appName { get; set; }
        public string pathIcon { get; set; }
        public string pathBackground { get; set; }
        public string languageCode { get; set; }
    }
```

- Các bạn có thể thấy, mình đã tạo ra 1 class có tên là AppSettings, bên trong class này sẽ chứa các dữ liệu mình cần để cấu hình cho ứng dụng Wpf như tên ứng dụng, đường dẫn tới ảnh Icon, đường dẫn tới ảnh background, hay code ngôn ngữ mà người dùng chọn.

### Bước 2: Chuyển đổi Object sang Json.
- Chúng ta sẽ tạo dữ liệu tạm cho phần cài đặt của ứng dụng như sau:

```
AppSettings appSettings;
public MainWindow()
        {
            InitializeComponent();
            appSettings = new AppSettings();
            appSettings.appName = "WpfAndFirebase";
            appSettings.pathIcon = @".\Images\Icon.png";
            appSettings.pathBackground = @".\Images\Background.png";
            appSettings.languageCode = "vi-VN";
        }
```

- Tiếp theo chúng ta Convert nó qua Json bằng JsonConvert (hàng của Mic các bạn cứ yên tâm mà dùng thôi):

```
string ConvertToJson(Object _object) {
        string jsonData = JsonConvert.SerializeObject(_object);
        return jsonData;
    }
```

- Rồi gọi phương thức ConvertToJson sau khi đã khởi tạo dữ liệu xong:

```
AppSettings appSettings;
public MainWindow()
        {
            ....
            appSettings.languageCode = "vi-VN";
            string appSettingsJson = ConvertToJson(appSettings);
        }
```

### Bước 3: Đẩy dữ liệu lên Firebase.
- Đầu tiên các bạn cần tạo 1 ứng dụng trên Firebase, sau đó tạo 1 database, rồi setting rule cho phù hợp với nhu cầu sử dụng, những cái này khá đơn giản Firebase sẽ hướng dẫn từng bước 1 dễ như ăn kẹo ;)
- Tiếp theo chúng ta lấy 1 đường link tới database trên Firebase có dạng như sau:
```
https://abcxyz.firebaseio.com/{_parent}.json
```
- với abcxyz chính là tên database của bạn (trên Firebase mở ra sẽ thấy có).
- parent chính là tên của node root của bạn, ví dụ bạn có thể đặt là Settings.
- Sau đó bạn tạo phương thức PushToFirebase như sau:

```
public void PushToFirebase(string _parent, string _jsonData)
        {
                HttpWebRequest request = HttpWebRequest.CreateHttp($"https://abcxyz.firebaseio.com/{_parent}.json");
                request.Proxy = null;
                request.Method = "PUT";
                request.ContentType = "application/json";
                var buffer = Encoding.UTF8.GetBytes(_jsonData);
                request.ContentLength = buffer.Length;
                Stream newStream = request.GetRequestStream();
                newStream.Write(buffer, 0, buffer.Length);
                //// Close the Stream object.
                newStream.Close();
        }
```

- Đầu tiên chúng ta tạo request tới Firebase.
- Sau đó chúng ta định nghĩa phương thức của nó là Put (các bạn có thể dùng Post tùy nhu cầu của bạn, Post sẽ sinh ra 1 node root mã ngẫu nhiên, ở đây mình không thích vậy vì vậy mình dùng Put)
- Tiếp theo các bạn convert Json qua Bytes.
- Cuối cùng các bạn ghi dữ liệu lên trên Firebase thông qua Stream (nhớ đóng Stream sau khi sử dụng xong).

### Bước 4: Tăng mức độ bảo mật.
- Như ở trên các bạn có thể thấy việc put dữ liệu lên rất đơn giản, và gần như không có ràng buộc nào, ai cũng có thể put được nếu có được link db của bạn.
- Chúng ta có thêm 1 tham số nữa sẽ giúp chúng ta giải quyết vấn đề này, đó chính là secret key.
- Các bạn lấy secret key trên Firebase như trong bài hướng dẫn trước đây của mình [LINK](https://viblo.asia/p/huong-dan-tuong-tac-google-sheet-va-firebase-database-GrLZDkDVKk0)
- Sau đó trong phần đuôi của link database ở trên các bạn thêm đoạn sau vào giúp mình : ?auth=SECRET_KEY (SECRET_KEY là cái key bạn lấy được trên Firebase của bạn ấy nhé)!
- Cuối cùng các bạn có thể set rule trên Firebase của mình cả read và write là false nhưng ứng dụng vẫn hoàn toàn làm việc bình thường, và ai có link của dadabase của bạn thì họ cũng ko thể put dữ liệu lên giống ứng dụng của bạn được! (tất nhiên nếu họ cũng lấy được cả secret key thì toang thật rồi ông Giáo ạ :v )

### Toàn bộ code như sau:

```
AppSettings appSettings;
public MainWindow()
        {
            InitializeComponent();
            appSettings = new AppSettings();
            appSettings.appName = "WpfAndFirebase";
            appSettings.pathIcon = @".\Images\Icon.png";
            appSettings.pathBackground = @".\Images\Background.png";
            appSettings.languageCode = "vi-VN";
            string appSettingsJson = ConvertToJson(appSettings);
            PushToFirebase("Settings",appSettingsJson);
        }
        
string ConvertToJson(Object _object) {
        string jsonData = JsonConvert.SerializeObject(_object);
        return jsonData;
    }
    
public void PushToFirebase(string _parent, string _jsonData)
        {
                HttpWebRequest request = HttpWebRequest.CreateHttp($"https://abcxyz.firebaseio.com/{_parent}.json?auth=SECRET_KEY");
                request.Proxy = null;
                request.Method = "PUT";
                request.ContentType = "application/json";
                var buffer = Encoding.UTF8.GetBytes(_jsonData);
                request.ContentLength = buffer.Length;
                Stream newStream = request.GetRequestStream();
                newStream.Write(buffer, 0, buffer.Length);
                //// Close the Stream object.
                newStream.Close();
        }
```

```
public class AppSettings
    {
        public string appName { get; set; }
        public string pathIcon { get; set; }
        public string pathBackground { get; set; }
        public string languageCode { get; set; }
    }
```

Chúc các bạn thành công nhé!

P/s: trước đây khi biết tới Google Script có thể làm việc với Google Sheet mình vẫn hay dùng nó làm nơi lưu trữ dữ liệu free mà bảo mật rất tốt, nhưng sau này biết tới Firebase mình thấy tốc độ của Firebase nhanh hơn rất nhiều vì vậy mình ưu tiên dử dụng Firebase hơn :D