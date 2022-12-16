## Introduction
Quá trình khám phá những kì quan cái Kotlin cung cấp cho các nhà phát triển Android, tôi đã đi qua một ngôn ngữ với tính năng tốt cái có thể đơn giản hóa và tăng cường tính dễ đọc về mã nguồn của tôi: Các constructors với các tham số mặc định.

Tôi sẽ không đi sâu vào chi tiết(Có các bài viết về nó) nhưng tổng quát đó là sự thay thế cho việc viết những loại constructors của Android Custom Views:

```
class MyCustomView : View {
  constructor(context: Context) : super(context)
  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
  constructor(context: Context, attrs: AttributeSet?, attributeSetId: Int) : super(context, attrs, attributeSetId)
}
```

Giờ đây, bạn có thể(nhưng không nên) viết như thế này:

```
class MyCustomView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr)
```

Điều này gọi tới mẫu dài nhất của constructor của view cha với một tổ hợp của các giá trị truyền vào và các giá trị mặc định cho mỗi tham số bị thiếu.

Đoạn code này chạy, nhưng nó tạo ra một cặp các giả định cái không làm app của bạn crash, thay vào đó, chúng sẽ làm cho các views của bạn thực hiện những hành vi không đúng(lỗi font, sizes, vv,...) và có thể dẫn đến sự tiêu tốn thời gian cho những phiên debugging.

## Assumption 1: Default values
Lần đầu tiên tôi sử dụng kĩ thuật này, nó đã làm việc, bởi vì các giá trị mặc định tôi đã sử dụng trong MyCustomView(null hoặc 0) phù hợp với cái lớp của view cha sử dụng.

Vấn đề bắt đầu bộc lộ khi lớp cha sử dụng các giá trị mặc định khác, ở đây là các giá trị mặc định cho constructor thứ hai trong lớp Android Toolbar:

```
public class Toolbar extends ViewGroup {
  public Toolbar(Context context, @Nullable AttributeSet attrs) {
    this(context, attrs, R.attr.toolbarStyle);
  }
}
```

Tôi có thể làm việc xoay quanh điều này bằng cách sao chép các giá trị mặc định đơn giản từ lớp của Android này cho MyCustomView, và sử dụng **R.attr.toolbarStyle** thay cho **0**.

Vấn đề với quá trình làm việc xoay quanh này đó là nó giả định rằng lớp của Android sẽ không bao giờ **thay đổi giá trị mặc định** cho thuộc tính style.

## Assumption 2: constructor call chain
Constructor rút gọn của Kotlin bỏ qua tất cả các constructors ngay lập tức trong view cha. Đây là vấn đề tế nhị hơn nhưng nó có thể chứng minh các rủi ro khi chúng ta sử dụng kĩ thuật này nhằm gọi một constructor của lớp cha cái không thuộc về chúng ta.

Tôi đang giả định rằng tất cả các constructors trong Android Java class đơn giản gọi mỗi các khác không kèm theo logic mở rộng ngoại trừ cái dài nhất với tát cả các tham số được gọi(xem Toolbar Java constructor được gọi ở đây). Nhưng Google không hứa thực hiện điều này với tất cả các Android Views và nhất quán qua tất cả các phiên bản Android.

Hình dung mã nguồn này được phát hành với các phiên bản tiếp theo của Android X:\

```
public class Toolbar extends ViewGroup {
  public Toolbar(Context context, @Nullable AttributeSet attrs) {
    this(context, attrs, getToolbarStyle());
  }
  
  private static int getToolbarStyle() {
    return (BuildConfig.VERSION_CODE >= Build.VERSION_CODES.O) ? R.attr.newCompatToolbarStyle : R.attr.toolbarStyle;
  }
}
```

Giờ đây, lớp MyCustomView mất hoàn toàn logic mới và phương thức gọi lớp đã được triển khai trong Android class bởi vì tôi đã giả định rằng Google sẽ không bao giờ **thay đổi hành vi của các constructors**.

## Conclusion
Để tránh việc phải viết các phương thức với các tham số mặc định trong Kotlin nếu phương thức của bạn đang gọi một phương thức được nạp chồng cái không thuộc về mã nguồn của bạn. Nó là một giải pháp đơn giản và an toàn nhằm dừng lại những giả định về các thư viện và frameworks chúng ta không kiểm soát.

## Source
https://blog.q42.nl/the-danger-of-assumptions-kotlin-with-android-custom-views-adb79bf2da45

## Reference
[1. Building a custom view - tictactoe](https://viblo.asia/p/building-a-customview-tictactoe-djeZ1GGQ5Wz) <br />
[2. Custom Android Views.](https://viblo.asia/p/custom-android-views-Qbq5QppRlD8)