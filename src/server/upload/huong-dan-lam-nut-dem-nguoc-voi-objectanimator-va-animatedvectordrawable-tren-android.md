*Khi làm ứng dụng native, nhiều người trong chúng ta thường tránh hoặc trì hoãn việc xử lý animation cho các thành phần trên UI. Lý do chính đó là xử lý animation trên các ứng dụng native không chỉ yêu cầu hiểu biết về kĩ thuật mà còn cần rất nhiều khả năng tưởng tượng để hình dung cần phải code như thế nào mới có thể tạo ra animation đúng như design. Anh em thường không ngại những kĩ thuật khó, những task tay to, nhưng khi động đến vấn đề phải tưởng tượng hình ảnh thì anh em hay nghĩ, “Ui chà, hay là để mai nhỉ”. Trong bài viết này, mình sẽ trình bày lần lượt bước xử lý một animation đơn giản giúp anh em cảm thấy dễ thở hơn với những task như thế này.*

**Yêu cầu:** Làm animation đếm ngược cho nút ghi âm trong một ứng dụng Android. 

**Kết quả cần đạt:** Như hình bên dưới

![](https://images.viblo.asia/bf83adf1-dabc-47f4-b8bb-4c6af482241c.gif)

# 1. Chuẩn bị # 
Android cung cấp rất nhiều thư viện hỗ trợ làm Animation, cá nhân mình thích sử dụng ObjectAnimator và AnimatedVectorDrawable bởi khả năng kết hợp mạnh mẽ của chúng. Chúng ta cũng có thể viết animation trong file XML hoặc trong file Java/Kotlin, tuy nhiên mình thích viết trong XML hơn vì nó đúng với tư tưởng tách biệt view và logic ra 2 phần riêng biệt.

Phân tích animation này ta thấy:
* Có 2 loại animation khá rõ ràng: 
    * Animation biến đổi từ icon này sang icon khác
    * Animation phóng to/ thu nhỏ nút bấm
* 2 loại animation này chạy song song, chia thành 3 lần, mỗi lần animation kết thúc cách nhau 1 giây.

Đầu tiên hãy liệt kê ra những bước phải làm:
* Đảm bảo bạn có đủ 4 drawable dạng vector HOẶC 4 file SVG HOẶC 4 pathData tương ứng với 4 icon thay đổi trong từng trạng thái
* Xây dựng các file cần thiết:
    * **animator/anim_record_transform.xml** để mô tả ObjectAnimator cho animation transform thuộc tính pathData từ ảnh vector này sang ảnh vector khác
    * **animator/anim_record_scale.xml** để mô tả ObjectAnimator cho animation phóng to/ thu nhỏ của nút ghi âm tương ứng với từng số đếm ngược
    * **drawable/ic_record_animated.xml** để mô tả AnimatedVectorDrawable và khai báo những thành phần sẽ animate trong vector drawable tương ứng kèm với animation của chúng

Mình đã chuẩn bị sẵn các file trong repo Git, các bạn có thể lên xem [TẠI ĐÂY](https://github.com/trunghq3101/animation-heart-rate-button)
# 2. Dựng animation chuyển đổi icon # 
Cấu trúc file của chúng ta sẽ như sau:
```
// animator/anim_record_transform.xml

<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    <objectAnimator
        android:startOffset="0"
        android:duration="400"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:propertyName="pathData"
        android:valueFrom=""
        android:valueTo=""
        android:valueType="pathType" />
</set>
```

Trong đó:
* **set**: Sử dụng để nhóm các ObjectAnimator lại với nhau, ta có thể quy định trình tự thực hiện animation trong các ObjectAnimator là *sequentially* (lần lượt) hay *together* (cùng một lúc)
* **objectAnimator**: Mô tả các thuộc tính của 1 animation kiểu ObjectAnimator. Mỗi objectAnimator tương ứng với 1 animation sẽ chạy trên UI

Bên trong objectAnimator thường có các thuộc tính sau: 
* **duration**: Thời gian chạy animation
* **propertyName**: Tên thuộc tính sẽ áp dụng animation
* **valueFrom**: Giá trị ban đầu của property
* **valueTo**: Giá trị kết thúc của property sau khi chạy animation xong
* **valueType**: Kiểu giá trị
* **interpolator**: Hàm biểu thị tốc độ thực hiện animation theo thời gian
* **startOffset**: Thời gian chờ animation bắt đầu tính từ lúc animation trước đó kết thúc

Để làm animation biến đổi từ icon này sang icon khác, chúng ta cần thực hiện animation trên thuộc tính pathData của vector drawable

**pathData** là một string mô tả quá trình vẽ lên một thành phần cấu tạo lên vector. Một ảnh vector bao gồm nhiều thành phần được gọi là path, mỗi path được mô tả bởi nhiều thuộc tính như màu sắc bên trong, màu sắc viền, độ dày viền, … và quan trọng nhất là thuộc tính pathData. Trong bài này chúng ta không cần hiểu quá sâu, chỉ cần biết rằng khi chuyển đổi từ icon này sang icon khác bằng cách áp dụng animation lên thuộc tính pathData sẽ đem lại hiệu ứng rất mượt mà :D

Để biết **valueFrom** và **valueTo** của pathData khi chuyển đổi từ icon này sang icon khác là gì, chúng ta sử dụng công cụ [ShapeShifter](https://shapeshifter.design/). Android yêu cầu dữ liệu pathData của 2 icon đang chuyển đổi phải khớp từng điểm với nhau và rất khó để khớp dữ liệu pathData của 2 icon khác nhau nếu đọc thủ công. 

Cách sử dụng ShapeShifter để lấy giá trị valueFrom và valueTo từ pathData của icon micro sang icon số 3 như sau:

{@embed: https://www.youtube.com/watch?v=nrYxbHvF2Hw&feature=youtu.be}

Sau khi có valueFrom và valueTo rồi, chúng ta sẽ điền vào file anim_record_countdown để hoàn thành ObjectAnimator đầu tiên như sau:

```
// animator/anim_record_transform.xml

<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    <objectAnimator
        android:duration="400"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:propertyName="pathData"
        android:valueFrom="M 38.366 48.663 C 38.366 50.401 38.366 52.139 38.366 53.877 C 38.366 54.82 37.602 55.584 36.658 55.584 C 35.716 55.584 34.951 54.82 34.951 53.877 C 34.951 52.139 34.951 50.401 34.951 48.663 C 32.708 48.402 30.633 47.592 28.862 46.371 C 27.092 45.151 25.626 43.519 24.603 41.615 C 23.58 39.71 23 37.533 23 35.219 C 23 34.277 23.764 33.512 24.707 33.512 C 25.65 33.512 26.415 34.277 26.415 35.219 C 26.415 38.014 27.547 40.545 29.379 42.376 C 31.211 44.208 33.741 45.34 36.536 45.34 C 36.618 45.34 36.7 45.34 36.781 45.34 C 37.014 45.34 37.245 45.333 37.474 45.317 C 37.703 45.302 37.93 45.279 38.155 45.248 C 38.379 45.218 38.602 45.18 38.821 45.135 C 39.041 45.09 39.258 45.038 39.472 44.979 C 39.686 44.92 39.897 44.854 40.106 44.782 C 40.314 44.71 40.519 44.631 40.721 44.545 C 40.923 44.46 41.121 44.368 41.316 44.27 C 41.511 44.172 41.702 44.068 41.89 43.959 C 42.077 43.849 42.261 43.733 42.44 43.612 C 42.62 43.491 42.795 43.364 42.966 43.232 C 43.137 43.099 43.304 42.962 43.466 42.819 C 43.628 42.677 43.785 42.529 43.938 42.376 C 44.091 42.224 44.238 42.066 44.381 41.904 C 44.524 41.742 44.661 41.575 44.794 41.404 C 44.926 41.233 45.053 41.058 45.174 40.878 C 45.295 40.699 45.411 40.515 45.521 40.328 C 45.63 40.14 45.734 39.949 45.832 39.754 C 45.93 39.559 46.022 39.361 46.107 39.159 C 46.192 38.957 46.271 38.752 46.344 38.544 C 46.416 38.336 46.482 38.124 46.541 37.91 C 46.6 37.696 46.652 37.479 46.697 37.259 C 46.742 37.04 46.78 36.817 46.81 36.593 C 46.84 36.368 46.864 36.141 46.879 35.912 C 46.895 35.683 46.902 35.452 46.902 35.219 C 46.902 34.277 47.667 33.512 48.61 33.512 C 49.553 33.512 50.317 34.277 50.317 35.219 C 50.317 42.159 45.095 47.879 38.366 48.663 C 38.366 48.663 38.366 48.663 38.366 48.663 M 28.976 35.219 L 28.976 26.683 C 28.976 22.44 32.415 19 36.658 19 L 36.658 19 C 40.902 19 44.342 22.44 44.342 26.683 L 44.342 35.219 C 44.342 39.463 40.902 42.902 36.658 42.902 C 32.415 42.902 28.976 39.463 28.976 35.219"
        android:valueTo="M 39.635 48.373 C 39.305 48.532 38.961 48.672 38.604 48.792 C 38.246 48.911 37.875 49.011 37.49 49.091 C 37.105 49.17 36.706 49.23 36.294 49.27 C 35.881 49.31 35.455 49.33 35.015 49.33 C 34.223 49.33 33.431 49.231 32.639 49.033 C 31.847 48.835 31.154 48.571 30.56 48.241 C 29.746 47.801 29.339 47.207 29.339 46.459 C 29.339 45.931 29.526 45.447 29.9 45.007 C 30.274 44.567 30.725 44.347 31.253 44.347 C 31.693 44.347 32.166 44.512 32.672 44.842 C 33.618 45.568 34.663 45.931 35.807 45.931 C 36.489 45.931 37.138 45.761 37.754 45.419 C 38.37 45.078 38.87 44.584 39.255 43.934 C 39.641 43.285 39.833 42.543 39.833 41.707 C 39.833 40.519 39.475 39.595 38.761 38.935 C 38.045 38.275 37.182 37.945 36.17 37.945 C 35.73 37.945 35.345 37.989 35.015 38.077 C 34.685 38.165 34.487 38.22 34.421 38.242 C 33.849 38.418 33.376 38.506 33.002 38.506 C 32.518 38.506 32.133 38.336 31.847 37.995 C 31.561 37.654 31.418 37.23 31.418 36.724 C 31.418 36.416 31.473 36.141 31.583 35.899 C 31.693 35.657 31.88 35.393 32.144 35.107 C 33.849 33.248 35.554 31.389 37.259 29.53 C 35.081 29.53 32.903 29.53 30.725 29.53 C 30.197 29.53 29.757 29.354 29.405 29.002 C 29.053 28.65 28.877 28.21 28.877 27.682 C 28.877 27.176 29.053 26.753 29.405 26.412 C 29.757 26.07 30.197 25.9 30.725 25.9 C 34.091 25.9 37.457 25.9 40.823 25.9 C 41.483 25.9 41.989 26.081 42.341 26.445 C 42.693 26.808 42.869 27.286 42.869 27.88 C 42.869 28.408 42.605 28.936 42.077 29.464 C 40.603 31.092 39.129 32.72 37.655 34.348 C 37.655 34.348 37.655 34.348 37.655 34.348 C 38.865 34.392 39.938 34.744 40.873 35.404 C 41.807 36.064 42.528 36.928 43.034 37.995 C 43.54 39.062 43.793 40.2 43.793 41.41 C 43.793 43.016 43.43 44.419 42.704 45.617 C 41.978 46.816 40.955 47.735 39.635 48.373 M 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951"
        android:valueType="pathType" />
</set>
```

Tương tự, sử dụng ShapeShifter với 2 icon tiếp theo ta sẽ lấy được 2 cặp valueFrom và valueTo cho 2 ObjectAnimator còn lại. Mình đặt thời gian startOffset cho 2 animation tiếp theo là 600, duration là 400. Như vậy khi animation chạy xong sẽ vừa tròn 1 giây.

```
// animator/anim_record_transform.xml

<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    <objectAnimator
        android:duration="400"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:propertyName="pathData"
        android:valueFrom="M 38.366 48.663 C 38.366 50.401 38.366 52.139 38.366 53.877 C 38.366 54.82 37.602 55.584 36.658 55.584 C 35.716 55.584 34.951 54.82 34.951 53.877 C 34.951 52.139 34.951 50.401 34.951 48.663 C 32.708 48.402 30.633 47.592 28.862 46.371 C 27.092 45.151 25.626 43.519 24.603 41.615 C 23.58 39.71 23 37.533 23 35.219 C 23 34.277 23.764 33.512 24.707 33.512 C 25.65 33.512 26.415 34.277 26.415 35.219 C 26.415 38.014 27.547 40.545 29.379 42.376 C 31.211 44.208 33.741 45.34 36.536 45.34 C 36.618 45.34 36.7 45.34 36.781 45.34 C 37.014 45.34 37.245 45.333 37.474 45.317 C 37.703 45.302 37.93 45.279 38.155 45.248 C 38.379 45.218 38.602 45.18 38.821 45.135 C 39.041 45.09 39.258 45.038 39.472 44.979 C 39.686 44.92 39.897 44.854 40.106 44.782 C 40.314 44.71 40.519 44.631 40.721 44.545 C 40.923 44.46 41.121 44.368 41.316 44.27 C 41.511 44.172 41.702 44.068 41.89 43.959 C 42.077 43.849 42.261 43.733 42.44 43.612 C 42.62 43.491 42.795 43.364 42.966 43.232 C 43.137 43.099 43.304 42.962 43.466 42.819 C 43.628 42.677 43.785 42.529 43.938 42.376 C 44.091 42.224 44.238 42.066 44.381 41.904 C 44.524 41.742 44.661 41.575 44.794 41.404 C 44.926 41.233 45.053 41.058 45.174 40.878 C 45.295 40.699 45.411 40.515 45.521 40.328 C 45.63 40.14 45.734 39.949 45.832 39.754 C 45.93 39.559 46.022 39.361 46.107 39.159 C 46.192 38.957 46.271 38.752 46.344 38.544 C 46.416 38.336 46.482 38.124 46.541 37.91 C 46.6 37.696 46.652 37.479 46.697 37.259 C 46.742 37.04 46.78 36.817 46.81 36.593 C 46.84 36.368 46.864 36.141 46.879 35.912 C 46.895 35.683 46.902 35.452 46.902 35.219 C 46.902 34.277 47.667 33.512 48.61 33.512 C 49.553 33.512 50.317 34.277 50.317 35.219 C 50.317 42.159 45.095 47.879 38.366 48.663 C 38.366 48.663 38.366 48.663 38.366 48.663 M 28.976 35.219 L 28.976 26.683 C 28.976 22.44 32.415 19 36.658 19 L 36.658 19 C 40.902 19 44.342 22.44 44.342 26.683 L 44.342 35.219 C 44.342 39.463 40.902 42.902 36.658 42.902 C 32.415 42.902 28.976 39.463 28.976 35.219"
        android:valueTo="M 39.635 48.373 C 39.305 48.532 38.961 48.672 38.604 48.792 C 38.246 48.911 37.875 49.011 37.49 49.091 C 37.105 49.17 36.706 49.23 36.294 49.27 C 35.881 49.31 35.455 49.33 35.015 49.33 C 34.223 49.33 33.431 49.231 32.639 49.033 C 31.847 48.835 31.154 48.571 30.56 48.241 C 29.746 47.801 29.339 47.207 29.339 46.459 C 29.339 45.931 29.526 45.447 29.9 45.007 C 30.274 44.567 30.725 44.347 31.253 44.347 C 31.693 44.347 32.166 44.512 32.672 44.842 C 33.618 45.568 34.663 45.931 35.807 45.931 C 36.489 45.931 37.138 45.761 37.754 45.419 C 38.37 45.078 38.87 44.584 39.255 43.934 C 39.641 43.285 39.833 42.543 39.833 41.707 C 39.833 40.519 39.475 39.595 38.761 38.935 C 38.045 38.275 37.182 37.945 36.17 37.945 C 35.73 37.945 35.345 37.989 35.015 38.077 C 34.685 38.165 34.487 38.22 34.421 38.242 C 33.849 38.418 33.376 38.506 33.002 38.506 C 32.518 38.506 32.133 38.336 31.847 37.995 C 31.561 37.654 31.418 37.23 31.418 36.724 C 31.418 36.416 31.473 36.141 31.583 35.899 C 31.693 35.657 31.88 35.393 32.144 35.107 C 33.849 33.248 35.554 31.389 37.259 29.53 C 35.081 29.53 32.903 29.53 30.725 29.53 C 30.197 29.53 29.757 29.354 29.405 29.002 C 29.053 28.65 28.877 28.21 28.877 27.682 C 28.877 27.176 29.053 26.753 29.405 26.412 C 29.757 26.07 30.197 25.9 30.725 25.9 C 34.091 25.9 37.457 25.9 40.823 25.9 C 41.483 25.9 41.989 26.081 42.341 26.445 C 42.693 26.808 42.869 27.286 42.869 27.88 C 42.869 28.408 42.605 28.936 42.077 29.464 C 40.603 31.092 39.129 32.72 37.655 34.348 C 37.655 34.348 37.655 34.348 37.655 34.348 C 38.865 34.392 39.938 34.744 40.873 35.404 C 41.807 36.064 42.528 36.928 43.034 37.995 C 43.54 39.062 43.793 40.2 43.793 41.41 C 43.793 43.016 43.43 44.419 42.704 45.617 C 41.978 46.816 40.955 47.735 39.635 48.373 M 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951"
        android:valueType="pathType" />
    <objectAnimator
        android:startOffset="600"
        android:duration="400"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:propertyName="pathData"
        android:valueFrom="M 42.704 45.617 C 41.978 46.816 40.955 47.735 39.635 48.373 C 39.305 48.532 38.961 48.672 38.604 48.792 C 38.246 48.911 37.875 49.011 37.49 49.091 C 37.105 49.17 36.706 49.23 36.294 49.27 C 35.881 49.31 35.455 49.33 35.015 49.33 C 34.223 49.33 33.431 49.231 32.639 49.033 C 31.847 48.835 31.154 48.571 30.56 48.241 C 29.746 47.801 29.339 47.207 29.339 46.459 C 29.339 45.931 29.526 45.447 29.9 45.007 C 30.274 44.567 30.725 44.347 31.253 44.347 C 31.693 44.347 32.166 44.512 32.672 44.842 C 33.618 45.568 34.663 45.931 35.807 45.931 C 36.489 45.931 37.138 45.761 37.754 45.419 C 38.37 45.078 38.87 44.584 39.255 43.934 C 39.641 43.285 39.833 42.543 39.833 41.707 C 39.833 40.519 39.475 39.595 38.761 38.935 C 38.045 38.275 37.182 37.945 36.17 37.945 C 35.73 37.945 35.345 37.989 35.015 38.077 C 34.685 38.165 34.487 38.22 34.421 38.242 C 33.849 38.418 33.376 38.506 33.002 38.506 C 32.518 38.506 32.133 38.336 31.847 37.995 C 31.561 37.654 31.418 37.23 31.418 36.724 C 31.418 36.416 31.473 36.141 31.583 35.899 C 31.693 35.657 31.88 35.393 32.144 35.107 C 33.849 33.248 35.554 31.389 37.259 29.53 C 36.823 29.53 36.388 29.53 35.952 29.53 C 35.517 29.53 35.081 29.53 34.645 29.53 C 34.21 29.53 33.774 29.53 33.339 29.53 C 32.903 29.53 32.467 29.53 32.032 29.53 C 31.596 29.53 31.161 29.53 30.725 29.53 C 30.197 29.53 29.757 29.354 29.405 29.002 C 29.053 28.65 28.877 28.21 28.877 27.682 C 28.877 27.176 29.053 26.753 29.405 26.412 C 29.757 26.07 30.197 25.9 30.725 25.9 C 34.091 25.9 37.457 25.9 40.823 25.9 C 41.483 25.9 41.989 26.081 42.341 26.445 C 42.693 26.808 42.869 27.286 42.869 27.88 C 42.869 28.408 42.605 28.936 42.077 29.464 C 40.603 31.092 39.129 32.72 37.655 34.348 C 37.655 34.348 37.655 34.348 37.655 34.348 C 38.865 34.392 39.938 34.744 40.873 35.404 C 41.807 36.064 42.528 36.928 43.034 37.995 C 43.54 39.062 43.793 40.2 43.793 41.41 C 43.793 41.945 43.753 42.458 43.672 42.948 C 43.591 43.438 43.47 43.906 43.309 44.351 C 43.148 44.796 42.946 45.218 42.704 45.617 M 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951"
        android:valueTo="M 42.506 45.37 C 43.034 45.37 43.474 45.546 43.826 45.898 C 44.178 46.25 44.354 46.69 44.354 47.218 C 44.354 47.724 44.178 48.148 43.826 48.489 C 43.474 48.83 43.034 49 42.506 49 C 40.636 49 38.766 49 36.896 49 C 35.026 49 33.156 49 31.286 49 C 30.714 49 30.263 48.824 29.933 48.472 C 29.603 48.12 29.438 47.669 29.438 47.119 C 29.438 46.569 29.636 46.085 30.032 45.667 C 30.332 45.347 30.631 45.026 30.931 44.706 C 31.231 44.386 31.531 44.065 31.831 43.745 C 32.13 43.424 32.43 43.104 32.73 42.784 C 33.029 42.463 33.329 42.143 33.629 41.822 C 33.929 41.502 34.228 41.182 34.528 40.861 C 34.828 40.541 35.128 40.221 35.428 39.9 C 35.727 39.58 36.027 39.26 36.327 38.939 C 36.627 38.619 36.926 38.298 37.226 37.978 C 38.04 37.098 38.684 36.212 39.157 35.322 C 39.63 34.431 39.866 33.611 39.866 32.863 C 39.866 32.665 39.852 32.472 39.824 32.285 C 39.796 32.097 39.753 31.915 39.697 31.738 C 39.641 31.561 39.57 31.39 39.486 31.224 C 39.401 31.057 39.303 30.896 39.19 30.74 C 39.078 30.585 38.951 30.434 38.81 30.289 C 38.106 29.563 37.292 29.2 36.368 29.2 C 35.73 29.2 35.087 29.415 34.438 29.843 C 33.788 30.273 33.2 30.839 32.672 31.543 C 32.276 32.071 31.77 32.335 31.154 32.335 C 30.67 32.335 30.224 32.148 29.817 31.774 C 29.41 31.4 29.207 30.982 29.207 30.52 C 29.207 30.19 29.317 29.855 29.537 29.514 C 29.757 29.172 30.087 28.782 30.527 28.342 C 31.363 27.506 32.331 26.835 33.431 26.329 C 34.531 25.823 35.587 25.57 36.599 25.57 C 38.051 25.57 39.327 25.878 40.427 26.494 C 40.794 26.699 41.132 26.93 41.443 27.187 C 41.753 27.444 42.035 27.726 42.29 28.034 C 42.544 28.342 42.77 28.676 42.968 29.035 C 43.166 29.394 43.331 29.77 43.463 30.161 C 43.595 30.552 43.694 30.959 43.76 31.382 C 43.826 31.805 43.859 32.243 43.859 32.698 C 43.859 34.04 43.502 35.42 42.786 36.84 C 42.072 38.258 41.109 39.617 39.899 40.915 C 38.502 42.4 37.105 43.885 35.708 45.37 C 37.974 45.37 40.24 45.37 42.506 45.37 C 42.506 45.37 42.506 45.37 42.506 45.37 M 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951"
        android:valueType="pathType" />
    <objectAnimator
        android:startOffset="600"
        android:duration="400"
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:propertyName="pathData"
        android:valueFrom="M 36.599 25.57 C 38.051 25.57 39.327 25.878 40.427 26.494 C 40.794 26.699 41.132 26.93 41.443 27.187 C 41.753 27.444 42.035 27.726 42.29 28.034 C 42.544 28.342 42.77 28.676 42.968 29.035 C 43.166 29.394 43.331 29.77 43.463 30.161 C 43.595 30.552 43.694 30.959 43.76 31.382 C 43.826 31.805 43.859 32.243 43.859 32.698 C 43.859 34.04 43.502 35.42 42.786 36.84 C 42.072 38.258 41.109 39.617 39.899 40.915 C 38.502 42.4 37.105 43.885 35.708 45.37 C 37.974 45.37 40.24 45.37 42.506 45.37 C 42.506 45.37 42.506 45.37 42.506 45.37 C 43.034 45.37 43.474 45.546 43.826 45.898 C 44.178 46.25 44.354 46.69 44.354 47.218 C 44.354 47.724 44.178 48.148 43.826 48.489 C 43.474 48.83 43.034 49 42.506 49 C 40.636 49 38.766 49 36.896 49 C 35.026 49 33.156 49 31.286 49 C 30.714 49 30.263 48.824 29.933 48.472 C 29.603 48.12 29.438 47.669 29.438 47.119 C 29.438 46.569 29.636 46.085 30.032 45.667 C 30.332 45.347 30.631 45.026 30.931 44.706 C 31.231 44.386 31.531 44.065 31.831 43.745 C 32.13 43.424 32.43 43.104 32.73 42.784 C 33.029 42.463 33.329 42.143 33.629 41.822 C 33.929 41.502 34.228 41.182 34.528 40.861 C 34.828 40.541 35.128 40.221 35.428 39.9 C 35.727 39.58 36.027 39.26 36.327 38.939 C 36.627 38.619 36.926 38.298 37.226 37.978 C 38.04 37.098 38.684 36.212 39.157 35.322 C 39.63 34.431 39.866 33.611 39.866 32.863 C 39.866 32.665 39.852 32.472 39.824 32.285 C 39.796 32.097 39.753 31.915 39.697 31.738 C 39.641 31.561 39.57 31.39 39.486 31.224 C 39.401 31.057 39.303 30.896 39.19 30.74 C 39.078 30.585 38.951 30.434 38.81 30.289 C 38.106 29.563 37.292 29.2 36.368 29.2 C 35.73 29.2 35.087 29.415 34.438 29.843 C 33.788 30.273 33.2 30.839 32.672 31.543 C 32.276 32.071 31.77 32.335 31.154 32.335 C 30.67 32.335 30.224 32.148 29.817 31.774 C 29.41 31.4 29.207 30.982 29.207 30.52 C 29.207 30.19 29.317 29.855 29.537 29.514 C 29.757 29.172 30.087 28.782 30.527 28.342 C 31.363 27.506 32.331 26.835 33.431 26.329 C 33.798 26.16 34.159 26.02 34.516 25.907 C 34.873 25.795 35.225 25.711 35.572 25.654 C 35.919 25.598 36.262 25.57 36.599 25.57 M 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951"
        android:valueTo="M 38.084 25.9 C 38.634 25.9 39.096 26.093 39.47 26.477 C 39.844 26.863 40.031 27.341 40.031 27.913 C 40.031 28.549 40.031 29.185 40.031 29.82 C 40.031 30.456 40.031 31.092 40.031 31.728 C 40.031 32.364 40.031 32.999 40.031 33.635 C 40.031 34.271 40.031 34.907 40.031 35.543 C 40.031 36.178 40.031 36.814 40.031 37.45 C 40.031 38.086 40.031 38.722 40.031 39.357 C 40.031 39.993 40.031 40.629 40.031 41.265 C 40.031 41.901 40.031 42.536 40.031 43.172 C 40.031 43.808 40.031 44.444 40.031 45.08 C 40.031 45.715 40.031 46.351 40.031 46.987 C 40.031 47.13 40.018 47.267 39.992 47.399 C 39.966 47.53 39.926 47.655 39.874 47.775 C 39.822 47.895 39.757 48.008 39.678 48.116 C 39.6 48.224 39.508 48.326 39.404 48.422 C 38.986 48.807 38.469 49 37.853 49 C 37.237 49 36.731 48.807 36.335 48.422 C 36.256 48.345 36.185 48.265 36.121 48.18 C 36.058 48.096 36.002 48.008 35.955 47.916 C 35.907 47.824 35.868 47.728 35.836 47.629 C 35.804 47.529 35.781 47.426 35.765 47.319 C 35.749 47.212 35.741 47.101 35.741 46.987 C 35.741 46.615 35.741 46.242 35.741 45.87 C 35.741 45.497 35.741 45.125 35.741 44.752 C 35.741 44.38 35.741 44.008 35.741 43.635 C 35.741 43.263 35.741 42.89 35.741 42.518 C 35.741 42.145 35.741 41.773 35.741 41.401 C 35.741 41.028 35.741 40.656 35.741 40.283 C 35.741 39.911 35.741 39.538 35.741 39.166 C 35.741 38.794 35.741 38.421 35.741 38.049 C 35.741 37.676 35.741 37.304 35.741 36.931 C 35.741 36.559 35.741 36.187 35.741 35.814 C 35.741 35.442 35.741 35.069 35.741 34.697 C 35.741 34.324 35.741 33.952 35.741 33.58 C 35.741 33.207 35.741 32.835 35.741 32.462 C 35.741 32.09 35.741 31.717 35.741 31.345 C 35.059 31.763 34.377 32.181 33.695 32.599 C 33.365 32.797 33.013 32.896 32.639 32.896 C 32.089 32.896 31.622 32.687 31.236 32.269 C 30.852 31.851 30.659 31.389 30.659 30.883 C 30.659 30.707 30.683 30.537 30.729 30.372 C 30.776 30.206 30.846 30.047 30.939 29.893 C 31.127 29.585 31.374 29.343 31.682 29.167 C 32.513 28.672 33.343 28.177 34.173 27.682 C 35.004 27.187 35.834 26.692 36.665 26.197 C 37.039 25.999 37.512 25.9 38.084 25.9 C 38.084 25.9 38.084 25.9 38.084 25.9 M 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 L 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951 C 36.659 30.951 36.659 30.951 36.659 30.951"
        android:valueType="pathType" />
</set>
```

Chúng ta sẽ tạm chuyển qua file AnimatedVectorDrawable để nhanh chóng nhìn thấy thành quả trước khi tiếp tục làm animation phóng to/ thu nhỏ nút bấm

# 2. Dựng AnimatedVectorDrawable

Cấu trúc file của chúng ta sẽ như sau:

```
// drawable/ic_record_animated.xml

<?xml version="1.0" encoding="utf-8"?>
<animated-vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_record">
    <target
        android:animation="@animator/anim_record_transformation"
        android:name="icMic" />
</animated-vector>
```

Trong đó:
* **android:drawable** sẽ trỏ tới file vector drawable sẽ chạy animation
* **target** : môt tả đối tượng sẽ được gắn animation
* **android:animation** trỏ tới file animator sẽ được gắn vào đối tượng
* **android:name** là tên thành phần của vector drawable sẽ được gắn animation

Chú ý **icMic** chính là tên path hình icon micro trong file **ic_record** mà mình đã cung cấp cho các bạn ngay từ đầu bài

```
<path
            android:name="icMic"
```

Khi đã khai báo xong, chúng ta đặt drawable này làm srcCompat cho ImageView và gắn sự kiện click cho ImageView:

```
class MainActivity : AppCompatActivity(), View.OnClickListener {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        imageRecord.setOnClickListener(this)
    }

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onClick(v: View?) {
        val animateRecord = (v as ImageView).drawable as AnimatedVectorDrawable
        animateRecord.start()
    }
}
```

Kết quả như sau:

![](https://images.viblo.asia/9a97c910-fb1f-40b4-a65f-20b2d156f74f.gif)

# 3. Dựng animation phóng to / thu nhỏ
Cấu trúc file tương tự với file animator ở bước 1

```
// animator/anim_record_scale.xml

<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    
    // Lần 1
    
        // Thu nhỏ
        <set android:ordering="together">

            // Animation thu nhỏ chiều X
            <objectAnimator .../>

            // Animation thu nhỏ chiều Y
            <objectAnimator .../>
        
        </set>
        
        // Phóng to
        <set android:ordering="together">

            // Animation phóng to chiều X
            <objectAnimator .../>

            // Animation phóng to chiều Y
            <objectAnimator .../>
        
        </set>
    
    // Lần 2
        <set android:ordering="together">
            <objectAnimator .../>
            <objectAnimator .../>
        </set>
        <set android:ordering="together">
            <objectAnimator .../>
            <objectAnimator .../>
        </set>
    
    // Lần 3
        <set android:ordering="together">
            <objectAnimator .../>
            <objectAnimator .../>
        </set>
        <set android:ordering="together">
            <objectAnimator .../>
            <objectAnimator .../>
        </set>
</set>
```

Tuy nhiên hãy để ý rằng bên trong set cha, mình đã thêm vào 3 set con, mỗi set con gồm 2 animation thể hiện cho 1 lần "nháy" nút bấm. Chúng ta cần phải cài đặt như sau:
* Để làm animation phóng to / thu nhỏ, chúng ta cần áp dụng animation lên property **scaleX** và **scaleY**. 
* 2 animation ở trục X và trục Y phải chạy đồng thời để icon được scale cả 2 chiều cùng lúc, vì vậy chúng ta sẽ cho chúng vào 1 nhóm trong thẻ set và đặt **ordering** là **together**. 
* Như vậy cho 1 lần "nháy" nút bấm, cần **2 set animation** gồm tổng cộng **4 animation**:
- Animation phóng to: gồm animation phóng to chiều X và phóng to chiều Y
- Animation thu nhỏ: gồm animation phóng to chiều X và phóng to chiều Y
* Giá trị **valueFrom** ban đầu của icon ở trạng thái bình thường là 1, ở đây mình sẽ thu nhỏ xuống **valueTo** = 0.8 kích thước ban đầu và sau đó lập tức phóng to trở lại.
* Vì cần thu nhỏ trước, phóng to sau nên mình đặt animation thu nhỏ và animation phóng to theo thứ tự lần lượt, và đặt **ordering** của set chứa cả 2 set này là **sequentially**.
* Giá trị **duration** cho mỗi animation mình đặt là **200**, bằng 1 nửa thời gian của animation chuyển đổi icon. Như thế việc thu nhỏ + phóng to sẽ bắt đầu lúc icon bắt đầu chuyển đổi và kết thúc đúng vào lúc nó chuyển đổi xong, tạo sự nhịp nhàng ăn khớp cho animation. Điểm này rất quan trọng và cũng là điểm khó nhất khi làm animation, đó là chúng ta phải tưởng tượng ra đâu là mốc thời gian hợp lý để bắt đầu và kết thúc animation. Có lẽ chỉ có làm thật nhiều mới đem lại cho chúng ta kinh nghiệm xử lý phần này được.

File animation gồm 1 cặp animation thu nhỏ + phóng to bây giờ sẽ trông như thế này:

```
// animator/anim_record_scale.xml

<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    
    // Lần 1
    
        // Thu nhỏ
        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />
        </set>
        
        // Phóng to
        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />
        </set>
   
</set>
```

Bởi vì có 3 lần chuyển đổi icon (từ mic -> 3, từ 3 -> 2, từ 2  -> 1) nên chúng ta cũng sẽ cần thêm 2 bộ animation như thế này nữa. Nội dung của 2 bộ tiếp theo cũng giống hệt với bộ animation chúng ta vừa tạo, chỉ có 1 điểm khác là mình phải thêm thuộc tính startOffset cho chúng. Giá trị **startOffset** được đặt bằng với startOffset của bên animation chuyển đổi icon, đảm bảo chúng hoàn toàn khớp nhau.
Cuối cùng file của chúng ta sẽ như sau:

```
// animator/anim_record_scale.xml

<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:ordering="sequentially">
    
    // Lần 1
    
        // Thu nhỏ
        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />
        </set>
        
        // Phóng to
        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />
        </set>
   
   // Lần 2
       <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:startOffset="600"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:startOffset="600"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />
        </set>

        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />
        </set>
        
    // Lần 3
        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:startOffset="600"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:startOffset="600"
                android:valueFrom="1.0f"
                android:valueTo="0.8f"
                android:valueType="floatType" />
        </set>

        <set android:ordering="together">
            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleX"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />

            <objectAnimator
                android:duration="200"
                android:interpolator="@android:anim/accelerate_decelerate_interpolator"
                android:propertyName="scaleY"
                android:valueFrom="0.8f"
                android:valueTo="1.0f"
                android:valueType="floatType" />
        </set>
</set>
```

Chúng ta còn 1 việc cuối cùng đó là khai báo animation này trong file xml mô tả AnimatedVectorDrawable mà chúng ta đã tạo ra ở bước 2:

```
// drawable/ic_record_animated.xml

<?xml version="1.0" encoding="utf-8"?>
<animated-vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_record">
    <target
        android:animation="@animator/anim_record_transformation"
        android:name="icMic" />
    <target
        android:animation="@animator/anim_record_scale"
        android:name="icRecord" />
</animated-vector>
```

Chú ý **icRecord** là tên group trong icon **ic_record** mà mình đã cung cấp cho các bạn ngay từ đầu bài

Và cuối cùng  đây là thành quả mà chúng ta đã làm được qua bài viết này, một animation rất mượt mà được tạo ra hoàn toàn bằng XML:

![](https://images.viblo.asia/bf83adf1-dabc-47f4-b8bb-4c6af482241c.gif)

*Vậy là chúng ta đã cùng nhau làm xong animation đầu tiên. Lưu ý rằng có nhiều cách làm animation trong Android và đây không phải là cách tối ưu nhất. Các bạn hãy thử thách bản thân bằng cách tìm ra những cách ngắn và tối ưu hơn nhé!*