![](https://images.viblo.asia/064c7ce1-0536-4d7a-8ab5-53d550a4327b.png)

Đáng ra bài viết này phải được đăng trước 2 bài về Hook Android Native, nhưng không bao giờ là quá muộn để viết bài, cũng không bao giờ là quá muộn để đọc bài viết. Vì thế trong bài viết này, chúng ta sẽ cùng tìm hiểu về cách hook vào phần mã nguồn Java của một ứng dụng Android.

# Hook mã nguồn Java
Việc hook vào phần mã nguồn Java đơn giản hơn nhiều so với hook vào mã nguồn Native. Với mã nguồn Native chúng ta sẽ gặp những vấn đề cần giải quyết bằng kỹ thuật dịch ngược, kiểu dữ liệu hạn chế,... thì với phần mã nguồn Java, những thứ này đều dễ hơn nhiều. Nếu phần mã nguồn Native có nhiều API khác nhau để hỗ trợ chúng ta làm 1 việc là tìm địa chỉ hàm cần hook, chúng ta có thể tùy từng trường hợp để lựa chọn các API cần thiết, thì khi hook vào phần mã nguồn Java chúng ta chỉ cần quan tâm đến 2 API chính, đó là:
- **Java.choose()**
- **Java.use()**

Hai API này sẽ hỗ trợ chúng ta hook thẳng vào bất cứ hàm nào chúng ta muốn, và chúng ta chỉ cần biết tên hàm đó là được.

## 1. API Java.choose()
API Java.choose() hoạt động theo nguyên lý tìm kiếm các Object được tạo sẵn trên vùng nhớ Heap. 

![](https://images.viblo.asia/45e0f120-27b3-4ecb-87dc-46e67995bb67.png)

Khi học về lập trình hướng đối tượng (OOP), có thể chúng ta đã được nghe về ví dụ khuôn làm bánh - một ví dụ dễ hiểu để hình dung về mối quan hệ và điểm khác nhau giữa Class và Object. Class là một cái khuôn, với cái khuôn này chúng ta có thể cắt bột thành các hình dạng tương tự nhau. Những mảnh bột này sau đó có thể được chế biến thành các loại bánh khác nhau, có cái rắc thêm bột chocolate, có cái thêm nho khô, có cái lại được phủ bơ trước khi nướng. Những chiếc bánh này đều là các Object, tuy chúng khác nhau nhưng giữa chúng chắc chắn vẫn có điểm chung được hình thành vì tạo ra từ cùng một khuôn.

![](https://images.viblo.asia/df3eac68-464b-4bc3-83d9-c1e684e78192.gif)

Khi các Object được tạo ra từ Class, chúng sẽ được đặt trong vùng nhớ heap cho tới khi được huỷ để giải phóng bộ nhớ. API Java.choose() sẽ tìm kiếm trên heap xem có Object nào được tạo ra từ Class chúng ta cần hook vào chưa. Nếu tìm thấy thì nó sẽ hook vào cho chúng ta.

Với nguyên lý hoạt động như này thì Java.choose() thường được sử dụng để sử dụng lại các hàm. Lúc này chúng ta có thể gọi lại hàm nhiều lần, thử truyền vào các 
đối số khác nhau,... qua đó hiểu hơn về cách hàm này hoạt động. Chúng ta cũng có thể gọi lại hàm để lấy được ra những giá trị chúng ta muốn. VD như gọi lại hàm giải mã và truyền vào đúng dữ liệu mã hoá, từ đó lấy được bản gốc.

API này có 2 event là:
- **onMatch**: được thực hiện mỗi khi tìm thấy một instance (mình hiểu đơn giản là một đối tượng sinh ra từ Class, mỗi Object đều độc lập nên chúng là các instance).
- **onComplete**: được thực hiện khi hoàn thành tìm ra toàn bộ các instance.

Vì thế nếu muốn hook vào các hàm thì chúng ta nên viết trong onMatch.

## 2. API Java.use()
Khác với Java.choose() chỉ lấy bánh, API Java.use() xử lý triệt để bằng cách kiểm soát cái khuôn. Lúc này muốn tạo ra bánh mới, huỷ bánh vừa tạo đi, thay đổi một chút trong khuôn bánh thì đều được. Hiểu đơn giản thì Java.use() cho phép chúng ta thay đổi logic của hàm ngay từ lúc nó được tạo ra bằng cú pháp **new**. Vì thế thường thì chúng ta sẽ sử dụng API này nhiều hơn.

![](https://images.viblo.asia/9516d9f4-0c7e-4a2e-b6d9-b4f4ff6d8ef1.png)

API này không có event nào cả, đơn giản là chúng ta muốn viết lại nội dung hàm như nào thôi. Chúng ta sẽ sử dụng như sau:

```javascript
// frida -U -l hook.js -f <tên-package>
Java.perform(function () {
    // Hook 1 hàm của class
    Java.use("tên-class").<tên-hàm>.implementation = function() {
        // Nội dung thực hiện khi hook thành công
    };
    
    // Hook nhiều hàm cùng class
    var hookClass = Java.use("tên-class");
    hookClass.<tên-hàm-1>.implementation = function() {
        // Nội dung thực hiện khi hook thành công
    };
    hookClass.<tên-hàm-2>.implementation = function() {
        // Nội dung thực hiện khi hook thành công
    };
    
    // Hook hàm có tham số
    Java.use("tên-class").<tên-hàm>.implementation = function(var_1, var_2,...) {
        // Nội dung thực hiện khi hook thành công
    };
});
```

Trong trường hợp hàm chúng ta muốn hook có những hàm overloading thì chúng ta cần chỉ rõ hàm muốn hook bằng cách khai báo rõ số lượng và kiểu tham số.

```javascript
Java.perform(function () {
    // Hook 1 hàm của class
    Java.use("tên-class").<tên-hàm>.override("kiểu-biến-1", "kiểu-biến-2",...).implementation = function(var_1, var_2,...) {
        // Nội dung thực hiện khi hook thành công
    };
});
```

Để dễ hình dung thì mình sẽ lấy bài [KGB messenger](https://viblo.asia/p/write-up-kgb-messenger-phan-tich-va-giai-thich-chi-tiet-07LKXWEJ5V4) mà mình từng viết write up làm ví dụ. Trong bài write up này mình đã làm theo cách patch app nhằm vượt qua 2 điều kiện để có thể sử dụng app.

![](https://images.viblo.asia/full/db661b56-d683-4341-ba02-a4a51d2a7048.png)

2 điều kiện kiểm tra dựa vào kết quả của 2 hàm **System.getProperty** và hàm **System.getenv**:
- System.getProperty phải trả về chuỗi **Russia**.
- System.getenv phải trả về chuỗi **RkxBR3s1N0VSTDFOR180UkNIM1J9Cg==**.

Chúng ta sẽ dùng script như sau:

```javascript
Java.perform(function () {
    console.log("[-] Starting hook com.tlamb96.spetsnazmessenger");

    var hookSystem = Java.use("java.lang.System");
    hookSystem.getProperty.overload("java.lang.String").implementation = function(var_1) {
        console.log("   OK  Bypassed [getProperty] check")
        return "Russia";
    };
    hookSystem.getenv.overload("java.lang.String").implementation = function(var_1) {
        console.log("   OK  Bypassed [getenv] check")
        return "RkxBR3s1N0VSTDFOR180UkNIM1J9Cg==";
    };
});
```

{@embed: https://www.youtube.com/watch?v=FF2q5-tnywU}

Với 2 API này thì cơ bản chúng ta đã có thể hook vào các hàm của một ứng dụng Android rồi. Trong thực tế thì tuỳ từng ứng dụng khác nhau, logic code khác nhau mà chúng ta sẽ cần chọn xem nên hook vào hàm nào để đạt được mục đích. Không đâu xa, ngay trong ví dụ bên trên thôi. Trong phần vượt qua khâu đăng nhập của ứng dụng có 1 hàm kiểm tra mật khẩu nhập vào bằng hàm **com.tlamb96.kgbmessenger.LoginActivty.j()** mà mình không hook vào được để bỏ qua việc kiểm tra mật khẩu. Mặc dù hàm j() này chỉ hash lại mật khẩu nhập vào, sau đó so sánh với một chuỗi password có trong strings.xml, kết quả trả về là true/false. Hàm này có thể hook vào được, nhưng khi mình sửa cho hàm mặc định trả về true thì ứng dụng lại sập :v 

Kết hợp với kỹ thuật hook native ở 2 bài trước thì cơ bản chúng ta đã hook vào được khá nhiều ứng dụng Android rồi. Hiện tại Flutter có thể sắp thành meta, hi vọng trong tương lai mình có cơ hội viết 1 vài bài về hook ứng dụng Flutter.