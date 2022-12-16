Đối với các bạn đang dùng smart phone chắc đều đã được tiếp xúc với công nghệ nhận diện khuôn mặt, một ví dụ dễ thấy nhất đó là các ứng dụng chụp ảnh, hoặc dùng nhận khuôn mặt để mở khóa màn hình. Vậy để tạo ra một ứng dụng nhận diện khuôn mặt liệu có khó không thì hôm nay mình sẽ mang đến cho các bạn một công cụ vô cùng tiện ích được phát triển bời Google. Đó chính là Google Firebase ML Kit.

[Firebase ML Kit](https://firebase.google.com/products/ml-kit/)  là một tập hợp các Api cho phép tích hợp machine learning vào các ứng dụng điện thoại, gần đay đã được cải tiến để hỗ trợ phát hiện đường viền khuôn mặt. Nhờ tính năng mạnh mẽ này mà chúng không còn phải giới hạn hình chữ nhật gần đúng cho việc phát hiện khuôn mặt. Thay vào đó chúng ta có thể làm việc với một số lượng lớn các tọa độ mô tả chính xác hình dạng khuôn mặt được phát hiện và các mốc trên khuôn mặt, chẳng hạn như mắt, môi và lông mày.
Nó cho phép người dùng dễ dàng tạo các ứng dụng có tích hợp AI, giúp thực hiện các tác dụng phức tạp lien quan đến thị giác máy tính như hoán đổi khuôn mặt, nhận diện cảm xúc hoặc áp dụng trang điểm kỹ thuật số.

Trong bài viết này, mình sẽ hướng dẫn các bạn cách sử dụng tính năng phát hiện đường viền khuôn mặt của ML Kit để tạo ứng dụng android có thể làm nổi bật khuôn mặt trong ảnh.
# 1. Yêu cầu
- Android studio phiên bản mới nhất
- Thiết bị android hoặc máy ảo có API > 23 (Android O)
# 2. Tích hợp Firebase và ML Kit vào dự án
Firebase đã được tích hợp sẵn trong android studio nên bạn có thể dễ dàng import nó vào dự án của mình
- Đầu tiên các bạn chọn Tools -> Firebase
- Chọn cửa sổ Analytics và nhấn Connect to Firebasae.
![](https://images.viblo.asia/85793665-bff4-4144-b3ed-87415934ebd4.png)
- Đợi đến khi kết nối thành công -> chọn Add analytics to your app để thêm các thư viện cần thiết cho ứng dụng của mình

Khi bạn đã tích hợp thành công Firebase vô ứng dụng của mình thì trong file `build.gradle` sẽ được thêm thư viện như sau:
```
implementation 'com.google.firebase:firebase-core:16.0.4'
```
Để có thể sử dụng được ML Kit để nhận diện khuôn mặt bạn cần thêm 2 thư viện như sau: 
```
implementation 'com.google.firebase:firebase-ml-vision:18.0.1'
implementation 'com.google.firebase:firebase-ml-vision-face-model:17.0.2'
```
Và cuối cùng thêm thư viện Picasso để có thể tải cũng như hiển thị các hình ảnh
```
implementation 'com.squareup.picasso:picasso:2.71828'
```

Phát hiện đường viền khuôn mặt của ML Kit's luôn chạy cục bộ trên thiết bị của người dùng. Theo mặc định, các model marchine learning của ML Kit sẽ được tải xuống khi người dùng lần đầu tiên mở ứng dụng. Tuy nhiên, để cải thiện trải nghiệm người dùng, minh khuyên bạn nên bắt đầu tải xuống ngay khi người dùng cài đặt ứng dụng. Để làm như vậy. bạn chỉ cần thêm thẻ `<meta-data>` sau vào tệp `manifet` 
```
<meta-data
    android:name="com.google.firebase.ml.vision.DEPENDENCIES"
    android:value="face" />
```
# 3 Tọa giao diện cho ứng dụng
Bạn sẽ cần một số widgets cho ứng dụng của mình: Edittext cho phép người dùng nhập vào URL của bức ảnh, Image View để hiển thị hình ảnh
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
# 4. Tải và hiển thị hình ảnh từ mạng
Với thư viện Picasso, tải xuống và hiển thị hình ảnh từ trên internet là một công việc vô cùng đơn giản. Đầu tiên, gọi phương thức` load ()` để chỉ định URL của hình ảnh bạn muốn tải xuống, sau đó gọi phương thức  `into()` để chỉ định ImageView mà bạn muốn hiển thị hình ảnh đã tải xuống.

Tất nhiên, bạn phải gọi cả hai phương thức chỉ sau khi người dùng nhập xong URL. Do đó, hãy đảm bảo bạn gọi chúng bên trong một đối tượng OnEditorActionListener được đính kèm với tiện ích EditText mà bạn đã tạo ở bước trước. Đoạn mã sau chỉ cho bạn cách làm như vậy:
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
![](https://images.viblo.asia/67747c22-cb3f-4d0f-8395-41ae01d39313.png)
# 5. Tạo một Face Contour Detector
Để có thể làm việc với dữ liệu về khuôn mặt, bạn cần phải tạo một đối tượng FirebaseVisionFaceDetector. Tuy nhiên, vì nó không phát hiện các đường viền của khuôn mặt một cách mặc định nên bạn cần phải tạo thêm một đối tượng FirebaseVisionFaceDetectorOptions và cấu hình các thuộc tính cần thiết cho nó.
```
val detectorOptions =
        FirebaseVisionFaceDetectorOptions.Builder()
            .setContourMode(
                FirebaseVisionFaceDetectorOptions.ALL_CONTOURS
            ).build()
```
Bây giờ, bạn có thể sử dụng đối tượng VisionFaceDetector của Firebase ML Kit thông qua phương thức `getVisionFaceDetector() ` để tạo ra công cụa phát hiện đường viền khuôn mặt
```
val detector = FirebaseVision
                        .getInstance()
                        .getVisionFaceDetector(detectorOptions)
```
# 6. Thu thập tọa độ
The Face contour detector không thể trực tiếp sử dụng ảnh được hiển thị bở ImageView của bạn. Thay vào đó, nó hy vọng bạn sẽ truyền một đối tượng FirebaseVisionImage cho nó. Để tạo một đối tượng như vậy, bạn phải chuyển đổi ảnh thành đối tượng Bitmap. Đoạn mã sau chỉ cho bạn cách làm như vậy:
```
val visionImage = FirebaseVisionImage.fromBitmap(
    (photo.drawable as BitmapDrawable).bitmap
)
```

Bây giờ bạn có thể gọi phương thức `DetInImage ()` của trình phát hiện để phát hiện các đường viền của tất cả các khuôn mặt có trong ảnh. Phương thức này chạy không đồng bộ và trả về một danh sách các đối tượng FirebaseVisionFace nếu nó hoàn thành.
```
detector.detectInImage(visionImage).addOnSuccessListener {
    // More code here
}
```
Khi các khuôn mặt được phát hiện, bạn có thể thao tác với nó thông qua danh sách các khuôn mặt được phát hiện trong phương thức `onSuccess()`. Mỗi khuôn mặt có một số lượng lớn các điểm đường viền liên quan đến nó. Để có quyền truy cập vào các điểm đó, bạn phải gọi phương thức getContour (). Phương pháp này có thể trả về các điểm đường viền của một số mốc trên khuôn mặt khác nhau. Chẳng hạn, nếu bạn truyền hằng số LEFT_EYE cho nó, nó sẽ trả về các điểm bạn cần để phác thảo mắt trái. Tương tự, nếu bạn chuyển UPPER_LIP_TOP cho nó, bạn sẽ nhận được các điểm được liên kết với cạnh trên của môi trên.

Trong hướng dẫn này, mình sẽ sử dụng hằng số FACE vì chúng tôi muốn làm nổi bật khuôn mặt. Đoạn mã sau cho bạn biết cách in tọa độ X và Y của tất cả các điểm có dọc theo các cạnh của mỗi mặt:
```
it.forEach {
    val contour = it.getContour(FirebaseVisionFaceContour.FACE)
    contour.points.forEach {
        println("Point at ${it.x}, ${it.y}")
    }
 
    // More code here
}
```

# 7. Vẽ các đường bao quanh khuôn mặt
Để làm nổi bật các khuôn mặt được phát hiện, chúng ta chỉ cần vẽ các đường bao quanh chúng bằng các điểm đường viền. Để có thể vẽ các đường viền đó, bạn sẽ cần một bản sao của các hình ảnh 
```
val mutableBitmap = 
        (photo.drawable as BitmapDrawable).bitmap.copy(
            Bitmap.Config.ARGB_8888, true
        )
```
Vẽ các đường dẫn bằng cách sửa đổi trực tiếp các pixel của bitmap có thể khó. Vì vậy, hãy tạo một canvas 2D mới cho nó bằng cách chuyển nó đến hàm tạo của lớp Canvas.

Ngoài ra, tạo một đối tượng Paint để chỉ định màu của các pixel bạn muốn vẽ trên canvas. Đoạn mã sau chỉ cho bạn cách tạo một canvas để bạn có thể vẽ các pixel màu đỏ mờ:
```
val canvas = Canvas(mutableBitmap)
 
val myPaint = Paint(Paint.ANTI_ALIAS_FLAG)
myPaint.color = Color.parseColor("#99ff0000")
```
Cách dễ nhất để vẽ các đường viền của khuôn mặt là sử dụng lớp `Path`. Bằng cách sử dụng các phương thức `moveTo` và `lineTo()` để có thể vẽ các hình phức tạp tren canvas
Bây giờ, để vẽ hình dạng của khuôn mặt, hãy gọi phương thức moveTo() và truyền tọa độ của các điểm trên đường viền khuôn mặt.
```
val path = Path()
path.moveTo(contour.points[0].x, contour.points[0].y)
contour.points.forEach {
    path.lineTo(it.x, it.y)
}
path.close()
```
Cuối cùng, chỉ cần vẽ lại và hiển thị nó lên imagView là được:
```
canvas.drawPath(path, myPaint)
photo.setImageBitmap(mutableBitmap)
```
# 8. Tổng kết
Với ML Kit API, bạn có thể dễ dàng tạo ra các ứng dụng hỗ trợ AI có thể thực hiện các công việc phức tạp như hoán đổi khuon mặt, phát hiện cảm xúc hoặc trang điểm kỹ thuật số.
API phát hiện đường viền khuôn mặt có thể xử lý tối đa năm khuôn mặt trong ảnh. Tuy nhiên, để có tốc độ và độ chính xác tối đa, tôi khuyên bạn chỉ nên sử dụng nó với những bức ảnh có một hoặc hai khuôn mặt.
Tham khảo: https://code.tutsplus.com/tutorials/detecting-face-contours-with-firebase-ml-kit--cms-32264