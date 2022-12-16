Mỗi ứng dụng, theo một cách nào đó, khác với những ứng dụng khác. Các nhà thiết kế sản phẩm có thể đạt được điều đó bằng cách tạo các  view tùy chỉnh, tận dụng các micro-animations, vẽ các illustrations tuyệt đẹp, v.v. Và trong số tất cả chúng, có một thay đổi có thể thay đổi ngay giao diện ứng dụng của bạn và đó là phông chữ tùy chỉnh. Hãy xem xét kỹ hơn chúng và khám phá cách tốt nhất để sử dụng phông chữ tùy chỉnh trong dự án Android của bạn.

### Tầm quan trọng của Phông chữ
Với phông chữ phù hợp, bạn có thể tạo niềm tin giữa người dùng và sản phẩm, làm cho các quy trình dễ dàng hơn và thậm chí mang lại sự tin tưởng cho người dùng khi sử dụng sản phẩm.

Vì vậy, khi designer muốn thay đổi phông chữ trong ứng dụng, tốt hơn hết bạn nên tin tưởng và sử dụng nó. May mắn thay, toàn bộ quá trình đều dễ dàng và chúng ta có 2 cách để thực hiện việc này.

### Android Downloadable Fonts
Downloadable fonts là một tính năng rất hay của Android. Nó cho phép ứng dụng của bạn sử dụng phông chữ tùy chỉnh mà không cần có phông chữ đó trong APK của bạn. Do đó, ứng dụng của bạn chiếm ít bộ nhớ hơn, điều này thật tuyệt vời cho người dùng.

![](https://images.viblo.asia/4be79499-1f2c-451d-9436-eee88b08a010.png)

Nói một cách ngắn gọn, Android có một ứng dụng cung cấp phông chữ chuyên làm việc với các phông chữ (truy xuất và lưu vào bộ nhớ cache) và các ứng dụng của chúng ta có thể yêu cầu và sử dụng chúng.

Vì vậy, hãy tưởng tượng rằng chúng ta viết tài liệu kỹ thuật và muốn sử dụng phông chữ open-sans. Cách dễ nhất để tạo phông chữ có thể tải xuống là với sự trợ giúp của Android Studio.

![](https://images.viblo.asia/48ba0c9f-3a85-4418-bfcf-18ec6e973a7d.png)

Chọn một số TextView trong design editor và click vào “More fonts” trong thuộc tính font-family. Tại đây, bạn sẽ tìm thấy danh sách các phông chữ có thể tải xuống từ thư viện phông chữ của google.

![](https://images.viblo.asia/3dc3116d-0285-42c3-9a43-d72378f9cafc.png)

Tìm open-sans, chọn “Create downloadable font” và nhấn OK. Tại thời điểm này, Android Studio sẽ tạo tất cả các tệp cần thiết cho phông chữ này: open_sans.xml, font_certs.xml và preloaded_fonts.xml.

![](https://images.viblo.asia/5de49bd5-ccbe-4303-b3db-44c2da825d2d.png)

open_sans.xml mô tả phông chữ chúng ta muốn sử dụng, font_certs.xml xác minh danh tính ứng dụng của nhà cung cấp phông chữ và preloaded_fonts.xml trợ giúp bằng cách tải trước phông chữ cho ứng dụng của chúng ta.

Tại thời điểm này, chúng ta đã sẵn sàng sử dụng phông chữ mới, chỉ cần áp dụng nó vào TextView của bạn hoặc sử dụng nó theo style:

```
<TextView
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:fontFamily="@font/open_sans"
  android:text="Technical Documentation"
  android:textSize="20sp"
  app:layout_constraintBottom_toBottomOf="parent"
  app:layout_constraintLeft_toLeftOf="parent"
  app:layout_constraintRight_toRightOf="parent"
  app:layout_constraintTop_toTopOf="parent" />
```

Một cách rất dễ dàng và hiệu quả để sử dụng phông chữ tùy chỉnh. Tuy nhiên, nó sẽ không hoạt động trong mọi trường hợp vì chỉ có phông chữ google. Điều gì sẽ xảy ra nếu một designer muốn sử dụng phông chữ Manrope và bạn không thể tìm thấy nó như một phông chữ có thể tải xuống? Cách duy nhất là thêm nó theo cách thủ công.

### Thêm phông chữ tùy chỉnh theo cách thủ công
Giải pháp này sẽ hoạt động cho mọi trường hợp, nhưng thật không may, chúng ta cần có một phông chữ trong resources của mình. Yêu cầu designer của bạn cung cấp tệp phông chữ (hoặc tải xuống), tạo thư mục res/font và thêm phông chữ:

![](https://images.viblo.asia/bd784be5-d649-49e5-a6e2-3a9365095c5b.png)

Bây giờ chúng ta cần tạo một resource cho phông chữ được thêm vào. Ta sẽ gọi nó là res/font/manrope_font.xml:

```
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  xmlns:tools="http://schemas.android.com/tools"
  tools:targetApi="o">

  <font
    android:font="@font/manrope_regular"
    android:fontStyle="normal"
    android:fontWeight="400"
    app:font="@font/manrope_regular"
    app:fontStyle="normal"
    app:fontWeight="400" />
</font-family>
```

Bạn có cần thêm một phông chữ bold không? Các bước giống nhau: thêm phông chữ và sau đó thêm phần tử `<font>` vào manrope_font.xml.

```
<font
  android:font="@font/manrope_bold"
  android:fontStyle="normal"
  android:fontWeight="700"
  app:font="@font/manrope_bold"
  app:fontStyle="normal"
  app:fontWeight="700" />
```

Sau bước này, chúng ta có một resource phông chữ và có thể sử dụng nó trong các view và style của chúng ta:

```
<TextView
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:fontFamily="@font/manrope_font"
  android:text="Technical Documentation"
  android:textSize="20sp"
  app:layout_constraintBottom_toBottomOf="parent"
  app:layout_constraintLeft_toLeftOf="parent"
  app:layout_constraintRight_toRightOf="parent"
  app:layout_constraintTop_toTopOf="parent" />
```

### Kết luận
Phông chữ rất quan trọng và trong bài viết này, chúng ta đã giới thiệu 2 cách thêm và sử dụng phông chữ tùy chỉnh trong ứng dụng Android.  Khuyến khích các phông chữ có thể tải xuống vì nó hiệu quả hơn và chỉ chọn theo cách thủ công nếu bạn có phông chữ không có sẵn trong các phông chữ có thể tải xuống.

Ref: https://vladsonkin.com/2-best-ways-to-use-custom-fonts-in-android/