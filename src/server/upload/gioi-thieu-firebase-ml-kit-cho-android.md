[Firebase ML Kit](https://firebase.google.com/docs/ml-kit/) là một thư viện cho phép bạn sử dụng dễ dàng và với mã rút gọn, sử dụng một loạt các mô hình linh hoạt, chính xác cao trong các ứng dụng Android. 
Hầu hết các models mà nó cung cấp đều có thể sử dụng ở cả local lẫn trên Google Cloud.


Hiện tại, các mô hình trong Firebase ML Kit chỉ giới hạn cho các tác vụ liên quan đến tầm nhìn-của máy tính, chẳng hạn như nhận dạng ký tự quang học, quét mã vạch và phát hiện đối tượng.

Trong hướng dẫn này, mình sẽ chỉ cho bạn cách thêm Firebase ML Kit vào project Android Studio và sử dụng một số API cơ sở của nó.

## Chuẩn bị

* Phiên bản Android Studio mới nhất.
* Một thiết bị hoặc máy ảo chạy Android API 21 trở lên.
* Một tài khoản Firebase.
* Một tài khoản Google Cloud.

## 1. Tạo Firebase project

Để sự dụng Firebase trong ứng dụng, bạn phải tạo một Firebase project trên trang chủ của nó.
Vì vậy, đăng nhập vào [Firebase Console](https://console.firebase.google.com/) , chọn nút **Add project** .

![](https://images.viblo.asia/ff77ef33-3f71-429d-941c-64fe67feb42c.png)

Trong hộp thoại, hãy đặt tên cho Project và nhấn nút **Create project** :

![](https://images.viblo.asia/e4c88a9c-e603-412f-8628-eac81f9d602b.png)

Sau vài giây, bạn sẽ thấy một thông báo cho bạn biết rằng dự án mới đã sẵn sàng. Nhấn nút **Continue** để tiếp tục.

Trong màn hình tiếp theo, vào phần **Develop** và nhấp vào liên kết **ML Kit** để xem tất cả các dịch vụ mà ML Kit cung cấp.

![](https://images.viblo.asia/e3b25ea6-0710-498e-9296-e17ce628300d.png)

Trong hướng dẫn này, chúng ta sẽ sử dụng ba dịch vụ: nhận dạng văn bản, nhận diện khuôn mặt và ghi nhãn hình ảnh. 
Bạn không phải thực hiện bất kỳ bước nào để kích hoạt chúng một cách rõ ràng nếu bạn định làm việc với chỉ các mô hình cục bộ đi kèm với ML Kit. 
Tuy nhiên, trong hướng dẫn này, chúng ta sẽ sử dụng cả hai mô hình cục bộ và dựa trên đám mây. Vì vậy, hãy nhấp vào liên kết sử dụng **Cloud API** tiếp theo.

Bây giờ bạn sẽ được đưa đến bảng điều khiển Google Cloud, nơi bạn có thể chỉ cần nhấn nút **Enable** được hiển thị trong phần Cloud Vision API để kích hoạt các mô hình dựa trên đám mây. 
Tuy nhiên, lưu ý rằng thao tác này sẽ chỉ hoạt động nếu bạn đã bật thanh toán cho tài khoản Google Cloud của mình.

![](https://images.viblo.asia/202926e1-5373-4c20-9663-942a8a44eb06.png)

## 2. Thiết lập Android Studio project

Trước khi bạn bắt đầu sử dụng API Firebase ML Kit, bạn phải thiết lập kết nối giữa Android Studio project và Firebase project mà bạn đã tạo ở bước trước đó. 
Để làm như vậy, hãy mở Android Stuiod => Tools => Firebase.

Firebase Assistant hiện không có bất kỳ hỗ trợ nào cho ML Kit. Tuy nhiên, bằng cách sử dụng nó để thêm Firebase Analytics, bạn vẫn có thể tránh thiết lập kết nối theo cách thủ công. 
Do đó, hãy mở phần **Analytics**, nhấp vào liên kết **Log an Analytics event** và nhấn nút **Connect to Firebase**.

Trong hộp thoại bật lên, hãy đảm bảo bạn chọn tùy chọn **Choose an existing Firebase or Google project** và chọn dự án Firebase mà bạn đã tạo.

![](https://images.viblo.asia/747ab977-7eab-429d-b912-7cd27b81064d.png)

Nhấn nút **Connect to Firebase** . Tại thời điểm này, Assistant sẽ tự động tải xuống file google-services.json, chứa API keys và project IDs, bạn hãy thêm file này vào module app của ứng dụng.

Sau khi kết nối được thiết lập, hãy đảm bảo bạn nhấn nút **Add Analytics to your app** để thêm các dependencies Firebase khác vào build.gradle của mô-đun ứng dụng.

Tiếp theo, để thực sự thêm thư viện ML Kit, hãy mở  **build.gradle** và nhập vào các dependencies sau:

```
implementation 'com.google.firebase:firebase-ml-vision:16.0.0'
implementation 'com.google.firebase:firebase-ml-vision-image-label-model:15.0.0'
```

Để download và hiển thị ảnh từ internet, chúng ta sử dụng thư viện Picasso :

```
implementation 'com.squareup.picasso:picasso:2.5.2'
```

Ngoài ra, hãy thêm thư viện [Anko](https://github.com/Kotlin/anko) để sử dụngKotlin vừa súc tích vừa trực quan.

```
implementation 'org.jetbrains.anko:anko-commons:0.10.5'
```

Theo mặc định, các mô hình local của Firebase ML Kit chỉ được tự động tải xuống thiết bị của người dùng khi cần. 
Nếu bạn muốn chúng được tải xuống ngay khi ứng dụng của bạn được cài đặt, hãy thêm code sau vào tệp AndroidManifest.xml:

```xml
<meta-data
    android:name="com.google.firebase.ml.vision.DEPENDENCIES"
    android:value="text,face,label" />
```

## 3. Định nghĩa một Layout

Trong hướng dẫn này, chúng ta sẽ tạo một ứng dụng cho phép người dùng nhập URL của hình ảnh và thực hiện nhận dạng văn bản, phát hiện khuôn mặt và thao tác ghi nhãn hình ảnh trên chúng. 
Do đó, giao của ứng dụng phải có  EditText, nơi người dùng có thể nhập vào URL và 3 Button cho phép họ chọn hoạt động họ muốn thực hiện.

Bạn có thể thêm ImageView để hiển thị hình ảnh.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
 
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Image URL"
        android:id="@+id/image_url_field"
        android:imeOptions="actionDone"
        android:inputType="textUri"/>
 
    <ImageView
        android:layout_width="match_parent"
        android:layout_height="300dp"
        android:id="@+id/image_holder"
        android:layout_below="@+id/image_url_field"
        android:layout_marginTop="10dp"
        android:scaleType="centerInside"/>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:layout_alignParentBottom="true">
        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="0.33"
            android:text="Text"
            android:onClick="recognizeText"/>
        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="0.33"
            android:text="Faces"
            android:onClick="detectFaces"/>
        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="0.33"
            android:text="Labels"
            android:onClick="generateLabels"/>
    </LinearLayout>
 
</RelativeLayout>
```

![](https://images.viblo.asia/2a64be83-108c-436b-abf3-b724f2028700.png)

Trong file XML ở trên, bạn có thể nhận thấy rằng mỗi Button có một thuộc tính onClick trỏ đến một phương thức xử lý sự kiện khi nhấp chuột. 
Những phương thức đó chưa tồn tại, vì vậy hãy tạo chúng trong Activity của bạn .

```kotlin
fun recognizeText(v: View) {
    // To do   
}
 
fun detectFaces(v: View) {
    // To do
}
 
fun generateLabels(v: View) {
    // To do
```

## 4. Hiển thị hình ảnh

Khi người dùng nhấn phím **Done** sau khi nhập URL của hình ảnh vào EditText, ứng dụng của chúng ta phải tải xuống hình ảnh và hiển thị nó lên ImageView.
Vì vậy, hãy thêm code sau vào hàm onCreate() của Activity :

```kotlin
image_url_field.setOnEditorActionListener { _, action, _ ->
    if (action == EditorInfo.IME_ACTION_DONE) {
        Picasso.with(ctx).load(image_url_field.text.toString())
                .into(image_holder)
        true
    }
    false
}
```

## 5. Nhận dạng văn bản

Firebase ML Kit có các lớp dò tìm riêng biệt cho tất cả các hoạt động nhận dạng hình ảnh khác nhau mà nó cung cấp. 
Để nhận dạng văn bản, bạn phải sử dụng lớp FirebaseVisionTextDetector, phụ thuộc vào mô hình cục bộ hoặc sử dụng lớp FirebaseVisionCloudTextDetector, phụ thuộc vào mô hình dựa trên đám mây. 
Bây giờ, hãy sử dụng cái cũ. Nó nhanh hơn nhiều, và nó có thể xử lý văn bản được viết trong bảng chữ cái Latinh.

Một bộ dò ML Kit yêu cầu đầu vào của nó sẽ ở dạng một đối tượng FirebaseVisionImage. 
Để tạo một đối tượng như vậy, tất cả những gì bạn cần làm là gọi phương thức fromBitmap() của lớp FirebaseVisionImage và truyền một bitmap tới nó.

Đoạn code sau, phải được thêm vào bộ xử lý sự kiện recognText() mà chúng ta đã tạo trước đó, chỉ cho bạn cách chuyển đổi hình ảnh đang được hiển thị trong ImageView thành bitmap, sau đó tạo ra đối tượng FirebaseVisionImage từ nó:

```kotlin
val textImage = FirebaseVisionImage.fromBitmap(
        (image_holder.drawable as BitmapDrawable).bitmap
)
```

Tiếp theo, để có được một tham chiếu đến một đối tượng FirebaseVisionTextDetector, bạn phải sử dụng một cá thể FirebaseVision.

```kotlin
val detector = FirebaseVision.getInstance().visionTextDetector
```

Bây giờ bạn có thể bắt đầu quá trình nhận dạng văn bản bằng cách gọi phương thức detectInImage() và truyền đối tượng FirebaseVisionImage tới nó. 
Bởi vì phương thức chạy không đồng bộ, nó trả về một đối tượng Task. 
Do đó, để có thể xử lý kết quả khi nó trả về, bạn phải đính kèm một đối tượng OnCompleteListener vào nó. Dưới đây là cách thực hiện:

```kotlin
detector.detectInImage(textImage)
        .addOnCompleteListener {
            // More code here
        }
```

Bên trong listener, bạn sẽ có quyền truy cập vào danh sách các đối tượng Block. Nói chung, mỗi Block có thể được coi là một phần riêng biệt được phát hiện trong hình ảnh. 
Bằng cách xem xét các thuộc tính văn bản của tất cả các đối tượng Block, bạn có thể xác định tất cả các văn bản đã được phát hiện. 

Code sau đây cho bạn thấy làm thế nào để làm như vậy :

```kotlin
var detectedText = ""
it.result.blocks.forEach {
    detectedText += it.text + "\n"
}
```

Hãy hiển thị văn bản bằng hộp thoại như sau :

```kotlin
runOnUiThread {
    alert(detectedText, "Text").show()
}
```

Trong đoạn code trên, hàm runOnUiThread() đảm bảo cho hàm alert() chạy trên thread chính của ứng dụng.

Cuối cùng, một khi bạn đã hoàn thành việc sử dụng detector, bạn phải nhớ gọi phương thức close() của nó để giải phóng tất cả các tài nguyên mà nó nắm giữ.

```kotlin
detector.close()
```

Nếu bạn chạy ứng dụng ngay bây giờ, hãy nhập URL của hình ảnh chứa nhiều văn bản và nhấn nút Văn bản, bạn có thể thấy dịch vụ nhận dạng văn bản của ML Kit sẽ hoạt động.

![](https://images.viblo.asia/351e285c-8596-413c-86f3-b5844cd1c909.png)

## 6. Nhận diện khuôn mặt

Hầu hết các lớp Dectector cuar Firebase ML Kit đều có các phương thức giống hệt nhau. 
Điều đó có nghĩa là phát hiện khuôn mặt trong một hình ảnh không quá khác biệt với việc nhận dạng văn bản. 

Tuy nhiên, lưu ý rằng ML Kit hiện chỉ cung cấp một mô hình cục bộ để phát hiện khuôn mặt, có thể được truy cập bằng lớp FirebaseVisionFaceDetector. 
Bạn có thể nhận được một tham chiếu đến một thể hiện của nó bằng cách sử dụng lớp FirebaseVision.

Thêm đoạn code sau vào trong phương thức detectFaces() :

```kotlin
val detector = FirebaseVision.getInstance().visionFaceDetector
```

Gọi phương thức detectInImage() một lần nữa và truyền một bitmap tới nó, bạn có thể bắt đầu quá trình nhận diện khuôn mặt không đồng bộ. 
Bằng cách sử dụng OnCompleteListener gắn liền với đối tượng Task nó trả về, bạn có thể dễ dàng biết khi quá trình hoàn tất.

```kotlin
detector.detectInImage(FirebaseVisionImage.fromBitmap(
            (image_holder.drawable as BitmapDrawable).bitmap
        )).addOnCompleteListener {
            // More code here        
        }
```

Bên trong listener, bạn sẽ có quyền truy cập vào danh sách các đối tượng FirebaseVisionFace, chứa các tọa độ của các hình chữ nhật để đóng khung các khuôn mặt được phát hiện. 
Bây giờ chúng ta hãy vẽ các hình chữ nhật đó trên một bản sao của ảnh gốc đã được xử lý.

Để tạo một bản sao của bitmap ảnh gốc, bạn phải sử dụng phương thức copy() của nó như dưới đây:

```kotlin
var markedBitmap =
    (image_holder.drawable as BitmapDrawable)
            .bitmap
            .copy(Bitmap.Config.ARGB_8888, true)
```

Tiếp theo, để có thể vẽ trên bitmap mới, bạn phải tạo các đối tượng Canvas và Paint cho nó. Sử dụng một màu hơi trong suốt cho các hình chữ nhật sẽ hợp lí.

```kotlin
val canvas = Canvas(markedBitmap)
val paint = Paint(Paint.ANTI_ALIAS_FLAG)
paint.color = Color.parseColor("#99003399")
                            // semi-transparent blue
```

Lúc này, bạn đơn giản chỉ cần lặp qua danh sách các đối tượng FirebaseVisionFace và sử dụng các thuộc tính boundingBox của chúng để vẽ các hình chữ nhật trên các khuôn mặt được nhận diện.

```kotlin
it.result.forEach {
    canvas.drawRect(it.boundingBox, paint)
}
```

Cuối cùng, đừng quên truyền Bitmap mới vào ImageView :

```kotlin
runOnUiThread {
    image_holder.setImageBitmap(markedBitmap)
}
```
![](https://images.viblo.asia/10ba7a5a-9b74-4d6b-8ef5-5011ecf45226.png)