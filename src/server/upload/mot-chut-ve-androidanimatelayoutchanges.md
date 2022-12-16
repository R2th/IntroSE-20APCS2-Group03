# `android:animateLayoutChanges` là gì?
***Nó là một cách "magical" để animate các thay đổi trong các ViewGroup của bạn. Cái này có từ API 11 (aka Honeycomb).***



-----
# Giới thiệu:

Cùng xem qua [docs](https://developer.android.com/training/animation/layout), thực chất nó sử dụng một đối tượng [LayoutTransition](https://developer.android.com/training/animation/layout) mà có thể set ở bất kỳ ViewGroup nào bằng cách sử dụng phương thức `setLayoutTransition` và set là `true`, ViewGroup được cung cấp với một đối tượng mặc định LayoutTransition như đoạn code sau: [code](https://android.googlesource.com/platform/frameworks/base/+/refs/heads/master/core/java/android/view/ViewGroup.java#653). 


-----


# Cùng thử áp dụng nào:
Giả sử chúng ta có layout sau:
![](https://images.viblo.asia/ff664b3e-bc71-47c8-a299-3428e146e8a1.png)

code:
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/llRoot"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:animateLayoutChanges="true"
    android:background="@android:color/holo_blue_bright"
    android:gravity="center"
    android:orientation="horizontal"
    android:padding="10dp">

    <ImageView
        android:layout_width="48dp"
        android:layout_height="48dp"
        android:src="@mipmap/ic_launcher"/>

    <TextView
        android:id="@+id/tvText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="some text"
        android:textAppearance="?android:attr/textAppearanceMedium"/>

</LinearLayout>
```

**Mình cũng set thuộc tính `android:animateLayoutChanges` là true**. Bây giờ, nếu chúng ta muốn thay đổi text thành thứ gì đó dài hơn khi khi click lên nó:
```java
final TextView tv = (TextView) findViewById(R.id.tvText);
tv.setOnClickListener(new View.OnClickListener() {
  @Override
  public void onClick(View v) {
    tv.setText("Some longer text");
  }
});
```
Kết quả của đoạn code trên (view bị giật - cứng):
![](https://images.viblo.asia/ff9c5a87-a2b4-406a-8a16-3828c712f09e.gif)
Mặc dù mình đã thêm thuộc tính `android:animateLayoutChanges` vào `LinearLayout` để thay đổi không kích hoạt một animation. Để sửa điều này, hãy thêm đoạn code sau:
```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
  ((ViewGroup) findViewById(R.id.llRoot)).getLayoutTransition()
          .enableTransitionType(LayoutTransition.CHANGING);
}
```
> Như bạn nhìn thấy, phương thức `enableTransitionType` đã được thêm vào trong API 16 (JellyBean). Tuy nhiên, tại thời điểm mình viết bài viết này, API 16 hiện tại đang chiếm 98,40% các thiết bị nên nó thực sự không phải là vấn đề.

Ngon (view nuột nà rồi nè):
![](https://images.viblo.asia/37771f17-767c-41da-9f91-cd12292580b1.gif)
Sau đây là những gì docs chính thức nói về flag LayoutTransition.CHANGING:
> Một flag biểu thị animation mà chạy trên các item mà thay đổi vì một layout thay đổi (không phải bởi vì các item được thêm vào hoặc loại bỏ khỏi container). Loại transition này mặc định không được bật; nó có thể được bật thông qua `enableTransitionType(int)`.


Một flag khác được thêm vào cùng thời điểm `LayoutTransition` (API 11) và `LayoutTransition.CHANGING` được thêm vào cùng thời điểm `enableTransitionType` (API 16).

# Kết bài:
Tài liệu chính thức của google cũng không đề cập đến performace đối với mỗi loại flag hoặc lưu ý khi sử dụng `LayoutTransition`, vì thế chúng ta có thể thừa nhận rằng sử dụng nó là an toàn :D Tuy nhiên, nếu có vấn đề gì xảy ra, bạn có thể cung cấp cách triển khai `LayoutTransition` của bạn hoặc triển khai thứ gì đó theo cách của bạn.