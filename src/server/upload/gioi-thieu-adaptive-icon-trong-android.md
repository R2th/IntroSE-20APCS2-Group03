Android 8.0 (API level 26) vừa giới thiệu Adaptive Icon, có thể hiển thị nhiều hình dạng trên các kiểu thiết bị khác nhau. 
Ví dụ: một Adaptive Icon có thể hiển thị hình tròn trên một thiết bị OEM và hiển thị hình vuông trên một thiết bị khác. 
Mỗi thiết bị OEM cung cấp một mặt nạ, sau đó hệ thống sẽ sử dụng để hiển thị tất cả các biểu tượng thích ứng với cùng một hình dạng. 
Adaptive Icon cũng được sử dụng trong các phím tắt, ứng dụng Cài đặt, hộp thoại chia sẻ và màn hình tổng quan.




## Tạo Adaptive Icon trong XML

Để thêm Adaptive Icon vào ứng dụng bằng XML, hãy bắt đầu bằng cách cập nhật thuộc tính android: icon trong file Android Manifest ứng dụng của bạn để chỉ định tài nguyên sẽ dùng đến.

Bạn cũng có thể xác định một tài nguyên drawable bằng cách sử dụng thuộc tính android: roundIcon.


Bạn chỉ được sử dụng thuộc tính android: roundIcon nếu bạn yêu cầu nội dung biểu tượng khác cho mặt nạ tròn, ví dụ: việc xây dựng thương hiệu cho biểu trưng của bạn dựa trên hình tròn. 
Đoạn mã sau minh họa cả hai thuộc tính trên:

```
<application
    …
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    …>
</application>
```


Tiếp theo, bạn phải tạo tài nguyên có thể vẽ thay thế trong ứng dụng của mình để sử dụng với Android 8.0 (API level 26) trong res / mipmap-anydpi / ic_launcher.xml.


Sau đó, bạn có thể sử dụng phần tử <adaptive-icon> để xác định foreground và background cho các biểu tượng của mình. 
Các phần tử bên trong <foreground> và <background> đều hỗ trợ thuộc tính android: drawable.
    
```
<adaptive-icon>
    <background android:drawable="@color/ic_background"/>
    <foreground android:drawable="@mipmap/ic_foreground"/>
</adaptive-icon>
```

Bạn cũng có thể định nghĩa các phần tử nền và nền trước là các phần tử bằng cách đặt chúng trong các phần tử <foreground> và <background>.

## Min SDK là 26

Vì Adaptive Icon chỉ được sử dụng trên API 26+, bạn có thể dựa vào các tính năng có sẵn trên API này, đặc biệt là VectorDrawable.

Việc sử dụng các vectơ là tốt nhất vì nó cho phép chúng ta xác định được drawable một lần trong một định dạng rất nhỏ gọn. 
Điều đó có nghĩa là hình ảnh sẽ sắc nét ở mọi độ phân giải.

Dưới đây là ví dụ về việc triển khai 'long-shadow' bằng cách sử dụng gradient xuyên tâm với nhiều điểm dừng màu :

```
<vector ...>
  <path android:name="long-shadow"
        android:pathData="...">
    <aapt:attr name="android:fillColor">
      <gradient
          android:type="radial"
          android:centerX="54"
          android:centerY="54"
          android:gradientRadius="76.37">
        <!-- 15% black from center to 32% stop -->
        <item android:offset="0.0" android:color="#26000000" />
        <item android:offset="0.32" android:color="#26000000" />
        <!-- 2% black at 62% stop -->
        <item android:offset="0.62" android:color="#05000000" />
        <!-- fade to transparent -->
        <item android:offset="1.0" android:color="#00000000" />
      </gradient>
    </aapt:attr>
  </path>
  ...
</vector>
```

![](https://images.viblo.asia/32beeecb-c275-4a0a-a4b5-82a33036b234.png)

## Sử dụng làm Shortcut

Adaptive Icon không chỉ dành riêng cho biểu tượng ứng dụng, chúng cũng được sử dụng cho phím tắt ứng dụng (shortcut).

Các shortcut có thể được ghim vào màn hình chính để chúng phù hợp với các biểu tượng ứng dụng.

![](https://images.viblo.asia/9a463094-70dc-4d7e-a74e-c216dd574144.png)