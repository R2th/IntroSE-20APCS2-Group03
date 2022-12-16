Các ứng dụng có kích thước tải xuống và cài đặt nhỏ hơn có nhiều khả năng được cài đặt và duy trì cài đặt hơn, đặc biệt là ở các thị trường mới nổi. Với trình biên dịch R8, giờ đây bạn có hỗ trợ toàn diện hơn để đạt được điều đó thông qua việc thu nhỏ, xáo trộn và tối ưu hóa.
Trong bài đăng này, chúng tôi cung cấp tổng quan về các tính năng có sẵn trong R8, việc giảm kích thước mã mà bạn có thể mong đợi và chỉ ra cách bật các tính năng này trong R8.
# R8 tính năng thu nhỏ
R8 cung cấp bốn tính năng được thiết kế để giảm kích thước ứng dụng Android của bạn:
Tree shaking: Sử dụng phân tích mã tĩnh để tìm và loại bỏ mã không thể truy cập và các loại không có thông tin.
Optimization: Tối ưu hóa mã cho kích thước bằng cách loại bỏ mã chết, nội tuyến chọn lọc, loại bỏ đối số không sử dụng và hợp nhất lớp.
Identifier renaming hay còn gọi là obfuscation: Sử dụng tên ngắn và thu nhỏ package namespace.
Reducing debug information: Chuẩn hóa thông tin gỡ lỗi và nén thông tin số dòng.
# Tại sao chúng ta cần R8 shrinking
Khi bạn viết một ứng dụng, tất cả mã phải phục vụ một mục đích và triển khai các tính năng trong ứng dụng. Tuy nhiên, hầu hết các ứng dụng sử dụng thư viện của bên thứ ba, chẳng hạn như Jetpack, OkHttp, Guava, Gson và Google Play Services, và các ứng dụng được viết bằng Kotlin luôn bao gồm thư viện chuẩn Kotlin. Khi bạn sử dụng một trong các thư viện của bên thứ ba này, thường chỉ một phần rất nhỏ của mỗi thư viện riêng lẻ được sử dụng trong ứng dụng của bạn. Không thu hẹp, tất cả mã thư viện được giữ lại trong ứng dụng của bạn.
Mã của bạn cũng có thể lớn hơn mức cần thiết vì mã dài dòng đôi khi cải thiện khả năng đọc và khả năng bảo trì: ví dụ: bạn có thể cố gắng sử dụng các tên biến có ý nghĩa và builder pattern để giúp người khác xem xét và hiểu mã của bạn dễ dàng hơn. Nhưng những pattern này phải đánh đổi bằng kích thước code - quá là điều bình thường luôn, code bạn viết nhiều khả năng cần shrinking.
# Bật tính năng R8 shrinking cho ứng dụng
Để R8 thu nhỏ ứng dụng của bạn cho các bản dựng phát hành, hãy đặt minifyEnable thành true trong tệp build.gradle chính của ứng dụng, như sau:

```
android {
  buildTypes {
    release {
      minifyEnabled true
    }
  }
}
```
# R8 sẽ giảm kích thước ứng dụng đi bao nhiêu?
R8 có thể giảm đáng kể kích thước ứng dụng của bạn. Ví dụ: ứng dụng Google I / O năm ngoái có dung lượng 18,55 MB với 150.220 phương thức và 3 tệp dex trước khi thu nhỏ. Sau khi thu nhỏ, ứng dụng giảm xuống còn 6,45 MB với 45.831 phương thức và 1 tệp dex. R8 tiết kiệm 65% kích thước dex (đo bằng Android Studio 3.5.1 và ứng dụng mẫu IOSched ở  [commit](https://github.com/google/iosched/commit/7b1e6c3f1efcca6bd25d2ca10a1b839eb51eb0b1) này).

# Thuật toán shrinking cơ bản
Để đơn giản hơn, hãy lấy một ví dụ về một chương trình độc lập bằng ngôn ngữ lập trình Java:

```
class com.example.JavaHelloWorld {
  private void unused() {
    System.out.println("Unused");
  }

  private static void greeting() {
    System.out.println("Hello, world!");
  }

  public static void main(String[] args) {
    greeting();
  }
}
```

Điểm vào của chương trình là phương thức static void main, mà ta chỉ định bằng cách sử dụng keep rule sau:

```
-keep class com.example.JavaHelloWorld {
      public static void main(java.lang.String[]);
}
```

Thuật toán thu nhỏ R8 hoạt động như sau:
Đầu tiên, nó theo dõi tất cả các mã có thể truy cập từ các điểm vào nổi tiếng của chương trình - các điểm vào này được xác định bởi các quy tắc giữ R8. Ví dụ, trong ví dụ mã Java này, R8 sẽ bắt đầu ở phương thức chính.
Trong ví dụ này, R8 theo dõi từ phương thức chính đến phương thức chào. Phương thức chào gọi vào thời gian chạy, vì vậy việc truy tìm dừng lại ở đó.
Khi truy tìm hoàn tất, R8 sử dụng một tối ưu hóa được gọi là rung cây để loại bỏ mã không sử dụng. Trong ví dụ này, rung cây sẽ xóa phương thức không được sử dụng vì bước theo dõi của R8 phát hiện rằng phương pháp đó không thể truy cập được từ bất kỳ điểm nhập nổi tiếng nào.
Tiếp theo, R8 đổi tên số nhận dạng thành tên ngắn hơn chiếm ít dung lượng hơn trong tệp DEX. Trong ví dụ, R8 có thể đổi tên lời chào phương thức thành tên ngắn hơn a:

```
class com.example.JavaHelloWorld {

  private static void a() {
    System.out.println("Hello, world!");
  }

  public static void main(String[] args) {
    a();
  }
}
```

sau đó,việc tối ưu hóa code cuối sẽ được áp dụng. Một trong số này là inlining khi điều đó dẫn đến ít mã hơn. Trong ví dụ này, việc di chuyển trực tiếp phần thân của phương thức a vào main sẽ làm cho mã nhỏ hơn:

```
class com.example.JavaHelloWorld {

  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}
```

Như bạn có thể thấy, mã kết quả nhỏ hơn nhiều so với mã gốc.

# Chuẩn bị một ứng dụng cho R8 shrinking
Giống như một chương trình Java độc lập, một ứng dụng Android có một số entry points thường gặp : activities, services, content providers, and broadcast receivers. Công cụ aapt2 xử lý các entry points này cho bạn bằng cách tạo các quy tắc lưu giữ dựa trên tệp Android Manifest của bạn.
Ngoài các điểm đầu vào thường gặp này, có các quy tắc lưu giữ tiêu chuẩn khác cần thiết cho các ứng dụng Android. Các quy tắc này được cung cấp bởi Android Gradle Plugin trong tệp cấu hình mặc định mà bạn chỉ định khi định cấu hình build cho mình:

```
android {
  buildTypes {
    release {
      minifyEnabled true
      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
    }
  }
}
```

# Reflection trong code
Reflection dẫn đến các code entry points mà R8 không nhận ra khi truy tìm code của bạn. Hãy nhớ rằng Reflection  cũng có thể xảy ra trong các thư viện của bên thứ ba và vì thư viện của bên thứ ba là một phần của ứng dụng của bạn. Các thư viện có thể đi kèm với các quy tắc riêng của chúng, nhưng hãy nhớ rằng nhiều thư viện không được viết bằng Android hoặc có shrinking riêng, vì vậy chúng có thể cần cấu hình bổ sung.
Lấy ví dụ này về một lớp Kotlin với một trường được gọi là tên và một phương thức chính tạo một cá thể và tuần tự hóa cá thể đó thành JSON:

```
class Person(val name: String)

fun printJson() {
   val gson = Gson()
   val person = Person("Søren Gjesse")
   println(gson.toJson(person))
}
```

Sau khi thu nhỏ mã, việc chạy chương trình sẽ xuất ra một đối tượng JSON trống {}. Điều này là do R8 chỉ nhìn thấy tên trường như được viết (điều này xảy ra trong hàm constructor Person) nhưng không bao giờ đọc, vì vậy R8 loại bỏ nó. Person cuối cùng không có trường nào gây ra đối tượng JSON trống. Tuy nhiên, trường được đọc bởi Gson serializer, nhưng Gson sử dụng kỹ thuật Reflection để làm như vậy, vì vậy R8 không thấy rằng trường này được đọc.
Để giữ trường name, hãy thêm quy tắc keep trong tệp proguard-rules.pro của bạn:

```
-keep class com.example.myapplication.Person {
    public java.lang.String name;
}
```

Quy tắc này hướng dẫn R8 không đụng vào trường được gọi là name trong class Person. Với điều này, việc chạy code sẽ cung cấp đối tượng JSON dự kiến là {“name”:”Søren Gjesse”}

Cuối cùng, khi thiết lập dự án của bạn, hãy đảm bảo thêm tệp proguard-rules.pro vào cấu hình build.gradle của bạn:
```
android {
  buildTypes {
    release {
      minifyEnabled true
      proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'),
                    'proguard-rules.pro'
    }
  }
}
```