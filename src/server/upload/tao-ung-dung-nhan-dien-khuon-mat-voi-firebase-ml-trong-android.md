[Firebase ML Kit](https://firebase.google.com/products/ml-kit/), một bộ sưu tập API cục bộ và dựa trên đám mây để thêm khả năng học máy vào ứng dụng dành cho thiết bị di động, gần đây đã được cải tiến để hỗ trợ phát hiện đường viền khuôn mặt. 

Nhờ tính năng mạnh mẽ này, bạn không còn phải giới hạn mình với hình chữ nhật gần đúng khi nhận diện khuôn mặt nữa. 
Thay vào đó, bạn có thể làm việc với một số lượng lớn tọa độ mô tả chính xác hình dạng khuôn mặt được phát hiện và các mốc trên mặt, chẳng hạn như mắt, môi và lông mày.

Điều này cho phép bạn dễ dàng tạo các ứng dụng hỗ trợ AI có thể thực hiện các tác vụ liên quan đến máy tính phức tạp như trao đổi khuôn mặt, nhận biết cảm xúc hoặc áp dụng trang điểm kỹ thuật số.

## Nhận diện khuôn mặt

- Chuẩn bị :

* Phiên bản Android Studio mới nhất.
* Một thiết bị chạy Android API level 23 trở lên.

## 1. Set up Project

Bởi vì ML Kit là một phần của nền tảng Firebase, bạn sẽ cần một project Firebase để có thể sử dụng nó trong Android Studio. Để tạo một tài khoản, mở **Tools > Firebase >** kích hoạt **Firebase Assistant**.

Tiếp theo, mở phần **Analytics** và nhấn nút **Connect**. 
Trong hộp thoại bật lên, nhập tên cho project Firebase mới của bạn, chọn quốc gia bạn đang ở và nhấn nút **Connect**.

![](https://images.viblo.asia/b80bb930-962b-4654-ad11-d1f028c439f1.png)

Khi bạn có kết nối thành công, hãy nhấn nút **Add analytics to your app** để trợ lý có thể thực hiện tất cả các thay đổi cấu hình liên quan đến Firebase cần thiết trong project Android Studio của bạn.

Tại thời điểm này, nếu bạn mở file **build.gradle** của mô-đun ứng dụng, trong số các thay đổi khác, bạn sẽ thấy dependency sau đây hiện diện trong đó:

```
implementation 'com.google.firebase:firebase-core:16.0.4'
```

Để có thể sử dụng tính năng phát hiện đường viền của ML Kit, bạn sẽ cần thêm hai phụ thuộc: 
+ một cho phiên bản mới nhất của thư viện ML Vision 
+ và một cho mô hình khuôn mặt ML Vision. 

```
implementation 'com.google.firebase:firebase-ml-vision:18.0.1'
implementation 'com.google.firebase:firebase-ml-vision-face-model:17.0.2'
```

Trong hướng dẫn này, bạn sẽ làm việc với các hình ảnh từ xa. Để dễ dàng tải xuống và hiển thị các hình ảnh như vậy, hãy sử dụng thư viện [Picasso](http://square.github.io/picasso/):

```
implementation 'com.squareup.picasso:picasso:2.71828'
```

Phát hiện đường viền khuôn mặt của ML Kit luôn chạy cục bộ trên thiết bị của người dùng. 
Theo mặc định, mô hình học máy thực hiện dò tìm đường viền khuôn mặt được tự động tải xuống lần đầu tiên người dùng mở ứng dụng của bạn. 

Tuy nhiên, để cải thiện trải nghiệm người dùng, chúng ta nên bắt đầu tải xuống ngay sau khi người dùng cài đặt ứng dụng của bạn. 
Để làm như vậy, thêm thẻ <meta-data> sau vào tệp AndroidManifest.xml:

```
<meta-data
    android:name="com.google.firebase.ml.vision.DEPENDENCIES"
    android:value="face" />
```

## 2. Tạo layout

Bạn sẽ cần ba widget trong layout của ứng dụng: 

- EditText : nơi người dùng có thể nhập vào URL của một bức ảnh trực tuyến.
- ImageView : để hiển thị ảnh.
- Button : để bắt đầu quá trình phát hiện đường viền khuôn mặt. 
 
 Ngoài ra, bạn sẽ cần một widget RelativeLayout để định vị ba widget. Vì vậy, hãy thêm code sau vào tệp XML layout cho Activity :
 
```
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="16dp">
 
    <EditText android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:hint="Image URL"
              android:imeOptions="actionGo"
              android:inputType="textUri"
              android:id="@+id/user_input" />
 
    <Button android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Detect contours"
            android:layout_alignParentBottom="true"
            android:id="@+id/action_button" />
 
    <ImageView android:layout_width="match_parent"
               android:layout_height="match_parent"
               android:id="@+id/photo"
               android:layout_below="@+id/user_input"
               android:layout_above="@id/action_button"
               android:scaleType="centerCrop"/>
 
</RelativeLayout>
```

## 3. Download và hiển thị hình ảnh

Với thư viện Picasso, việc tải xuống và hiển thị một hình ảnh chỉ cần gọi hai phương pháp. 
Đầu tiên, gọi đến phương thức load() để chỉ định URL của hình ảnh bạn muốn tải xuống, sau đó gọi đến phương thức into() để chỉ định ImageView mà bạn muốn hiển thị hình ảnh đã tải xuống.

Dĩ nhiên, bạn phải gọi cả hai phương thức sau khi người dùng nhập xong URL. Cụ thể như sau :

```
user_input.setOnEditorActionListener { _, action, _ ->
    if(action == EditorInfo.IME_ACTION_GO) {
        Picasso.get()
            .load(user_input.text.toString())
            .into(photo)
        true
    }
    false
}
```

## 4. Tạo Face Contour Detector

Khi click vào Button, các tác vụ nhận diện khuôn mặt sẽ được thực thi.
Chúng ta xử sẽ xử lí sự kiện onClick :

```
action_button.setOnClickListener {
 
    // Rest of the code goes here
     
}
```

Để có thể làm việc với dữ liệu khuôn mặt, bạn phải tạo đối tượng **FirebaseVisionFaceDetector**. 
Tuy nhiên, bởi vì nó không phát hiện các đường viền của các khuôn mặt theo mặc định, bạn cũng phải tạo một đối tượng **FirebaseVisionFaceDetectorOptions** có thể cấu hình nó để làm như vậy.

Tạo một instance của lớp **FirebaseVisionFaceDetectorOptions**.**Builder**, gọi phương thức **setContourMode()** của nó, 
và truyền hằng số **ALL_CONTOURS** đến nó để xác định rằng bạn muốn phát hiện các đường nét của tất cả các khuôn mặt hiện diện trong các hình ảnh của bạn.

```
val detectorOptions =
        FirebaseVisionFaceDetectorOptions.Builder()
            .setContourMode(
                FirebaseVisionFaceDetectorOptions.ALL_CONTOURS
            ).build()
```

Bây giờ bạn có thể truyền đối tượng **detectorOptions** cho phương thức **getVisionFaceDetector()** của lớp **FirebaseVision** của ML Kit để tạo ra bộ nhận diện đường viền khuôn mặt.

```
val detector = FirebaseVision
                        .getInstance()
                        .getVisionFaceDetector(detectorOptions)
```

## 5. Thu thập dữ liệu tọa độ

Bộ nhận diện khuôn mặt không thể trực tiếp sử dụng ảnh đang được hiển thị trên ImageView. Vì vậy, bạn phải truyền vào nó một đối tượng **FirebaseVisionImage**. 
Để tạo một đối tượng như vậy, bạn phải chuyển đổi ảnh thành Bitmap. Thực hiện như sau:

```
val visionImage = FirebaseVisionImage.fromBitmap(
    (photo.drawable as BitmapDrawable).bitmap
)
```

Bây giờ bạn có thể gọi phương thức **detectInImage()** của detector để phát hiện các đường nét của tất cả các khuôn mặt hiện diện trong bức ảnh. 
Phương thức này chạy không đồng bộ và trả về một danh sách các đối tượng FirebaseVisionFace nếu nó hoàn tất.

```
detector.detectInImage(visionImage).addOnSuccessListener {
    // More code here
}
```

Bên trong hàm ónuccess, bạn có thể sử dụng vòng lặp qua danh sách các khuôn mặt được phát hiện. 
Mỗi khuôn mặt có một số lượng lớn các điểm đường viền liên kết với nó. 

Để truy cập vào các điểm đó, bạn gọi phương thức **getContour()**. Phương thức này có thể trả về các điểm đường viền của một số mốc trên khuôn mặt khác nhau. 
Ví dụ, nếu bạn truyền hằng số **LEFT_EYE** đến nó, nó sẽ trả về các điểm bạn sẽ cần để phác thảo con mắt trái. 
Tương tự, nếu bạn truyền **UPPER_LIP_TOP** vào nó, bạn sẽ nhận được các điểm liên kết với cạnh trên của môi trên.

Trong hướng dẫn này, chúng ta sẽ sử dụng hằng số **FACE** vì chúng ta muốn làm nổi bật khuôn mặt cần nhận diện. 
Đoạn code sau đây cho bạn thấy cách in tọa độ X và Y của tất cả các điểm hiện diện dọc theo các cạnh của mỗi khuôn mặt:

```
it.forEach {
    val contour = it.getContour(FirebaseVisionFaceContour.FACE)
    contour.points.forEach {
        println("Point at ${it.x}, ${it.y}")
    }
 
    // More code here
}
```

Nếu bạn chạy ứng dụng ngay bây giờ và sử dụng một hình ảnh có ít nhất một khuôn mặt trong đó, bạn sẽ thấy cửa sổ Logcat như sau :

![](https://images.viblo.asia/9420216b-494d-48d0-97dc-10d9999a5264.png)

## 6. Vẽ đường nhận diện xung quanh khuôn mặt

Để làm nổi bật các khuôn mặt được phát hiện, chúng ta chỉ cần vẽ các đường quanh chúng bằng cách sử dụng các điểm đường bao. 
Để có thể vẽ các đường dẫn như vậy, bạn sẽ cần một bản sao có thể thay đổi của bitmap ImageView . 
Tạo ra bằng cách gọi phương thức **copy()** của nó.

```
val mutableBitmap = 
        (photo.drawable as BitmapDrawable).bitmap.copy(
            Bitmap.Config.ARGB_8888, true
        )
```

Vẽ các đường dẫn bằng cách sửa đổi trực tiếp các pixel của bitmap có thể khó. Vì vậy, tạo một canvas 2D mới cho nó bằng cách truyền nó tới hàm khởi tạo của lớp Canvas.

Ngoài ra, tạo một đối tượng Paint để chỉ định màu của các pixel bạn muốn vẽ trên canvas. 
Code sau đây cho bạn thấy cách tạo canvas mà bạn có thể vẽ các pixel màu đỏ mờ:

```
val canvas = Canvas(mutableBitmap)
 
val myPaint = Paint(Paint.ANTI_ALIAS_FLAG)
myPaint.color = Color.parseColor("#99ff0000")
```