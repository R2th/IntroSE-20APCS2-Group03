> Chắc hẳn bạn đã không ít lần từng thấy Android Studio cảnh báo về điều gì đó liên quan đến tham số đầu vào của hàm mà bạn đã ghi đè, nhưng lại không phải trong code của bạn. Như sau:

![](https://cdn-images-1.medium.com/max/800/1*Jev9_jEd8gCwtuqsD_khsg.png)

> Vậy tham số annotation `@NonNull`có ý nghĩa gì, và nó đến từ đâu?

# Thư viện Support Annotations
- Những annotation sẽ giúp bạn viết những ràng buộc có ý nghĩa cho các API của bạn. `@NonNull` chỉ là một ví dụ nhỏ trong gói **Android Support Annotations**, ngoài ra trong đó còn rất nhiều loại khác giúp đỡ bạn trong lúc code.
- Nói đơn giản hơn, những annotation này sẽ quy định những đầu vào giống nhau và chỉ đích danh được một loại tham số nào được truyền vào. Ví dụ như bạn chỉ muốn truyền tài nguyên nhất định vào đó, hệ thống sẽ báo lỗi nếu người khác cố tình truyền tham số không được phép vào đó.
- Android Studio có thể sử dụng các annotation này để tránh cho bạn những sự cố ngoài ý muốn như: **NPEs, unresolved resources, threading issues** trong lúc biên dịch chương trình của bạn.
- Trước khi sử dụng các annotation, bạn cần phải thêm phụ thuộc của nó vào tệp **app’s compile dependencies** :
```
compile 'com.android.support:support-annotations:23.0.1'
```
> Lưu ý rằng: bắt đầu từ phiên bản 20 của thư viện **support**, thư viện **support-v4** phụ thuộc vào thư viện **support-annotations** nên bạn không cần phải đưa chúng vào nữa. Nếu bạn có bất kì một thư viện nào phụ thuộc vào thư viện **support-v4**, giả sử như thư viện **appcompat-v7** thì cũng coi như là bạn đã cài đặt xong.


# Annotations
Annotation có rất nhiều loại và mỗi loại có một công dụng khác nhau đối với code của bạn. Vậy nên chúng ta hãy cùng tìm hiểu từng loại và cách dùng nhé.

## Nullability
- Có 2 loại annotation nullability là `@NonNull` và `@Nullable`, chúng có thể được sử dụng cho các trường, tham số của hàm, phương thức (trong trường hợp chúng có tham chiếu đến giá trị trả về).
- Tất nhiên là chúng sẽ có sự khác nhau nhất định, nếu là `@NonNull` thì nó có ý nghĩa là giá trị của nó sẽ không bao giờ được **null**, ngược lại thì `@Nullable` lại cho phép giá trị null xuất hiện, vì vậy bạn phải chống lại các giá trị null cho nó. Lưu ý rằng annoation `@Nullable` chỉ nên được sử dụng khi nó có thể là null trong điều kiện bình thường, không phải là nhận giá trị null khi bạn sử dụng chúng bị sai.

## Resource
- Khi bạn truyền vào resource ID, nó trông giống như một giá trị dạng **Integer** bình thường. Không có cách nào để có thể biết được bạn đã truyền vào một số nguyên hay là một resource color cả. Việc đó sẽ được giải quyết bằng **annotation resource**  khi bạn đã chú thích rõ ràng một đầu vào cụ thể.
- Để giải quyết vấn đề này, bạn có thể thêm bất kì ID của resource nào ( `@AnyRes`) hoặc là chỉ định một resource cụ thể ( `@*Res`) thì bộ công cụ sẽ phát hiện ra tại thời điểm compile time.
- Có một loạt các annotation dành cho resource như: `@AnimatorRes`, `@AnimRes`, `@AnyRes`, `@ArrayRes`, `@AttrRes`, `@BoolRes`, `@ColorRes`, `@DimenRes`, `@DrawableRes`, `@FractionRes`, `@IdRes`, `@IntegerRes`, `@InterpolatorRes`, `@LayoutRes`, `@MenuRes`, `@PluralsRes`, `@RawRes`, `@StringRes`, `@StyleableRes`, `@StyleRes`, `@XmlRes`

## Values
- Tương tự như cách bạn có thể đánh dấu các số nguyên là resource ID, bạn có thể đánh dấu nó chỉ định là một màu ( với annotation là `@ColorInt`) hoặc giá trị của chúng phải nằm trong một phạm vi nhất định.
- Ví dụ để chỉ định một phạm vi cho số nguyên bạn có thể sử dụng annotation `@IntRange`, tương tự như `@FloatRange`. Bạn thậm chí còn có thể chỉ định kích thước dự kiến của mảng bằng các sử dụng annotation `@Size`.

## TypeDefs
- Như các bạn có thể thấy, Android framework sẽ ưu tiên các flag là số nguyên cho dạng `enum`. Việc này được thực hiện để tiết kiệm bộ nhớ, vì các giá trị enum là các thể hiện đối tượng và chiếm nhiều bộ nhớ hơn một kiểu `int` cơ bản.
- Mặt khác, bạn sẽ mất đi các kiểu an toàn của type và kiểm tra các loại giá trị nào có thể kết hợp với nhau được.
- Chính vì vậy, bạn có thể sử dụng các annotation `@interface`và `@IntDef` (hoặc sử dụng `@StringDef` để biểu thị các chuỗi thay thế) để xác định một dạng enum ảo mà sau đó bạn có thể sử dụng để đánh dấu các ký hiệu int như thể chúng là 1 enum.
> Bạn có thể tham khảo thêm về [Creating Enumerated Annotations](https://developer.android.com/studio/write/annotations#enum-annotations) của nhà phát triển Android để biết thêm chi tiết triển khai `TypeDefs`. Cũng lưu ý rằng, mặc định các annotation này chỉ được giả sử một trong các loại được phép. Nếu bạn muốn có thể kết hợp nhiều giá trị `@IntDef` với nhau, bạn cần phải đặt flag thành true cho `@IntDef`.

## Proguard
- Trong tương lai, bạn có thể tự động tạo quy tắc proguard bằng cách đơn giản chỉ cần sử dụng annotation `@Keep`. 

## Thread safety
- Việc chỉ định công việc chạy trên một luồng cụ thể giờ đã dễ dàng hơn với annotation. Chúng ta có thể chỉ định từng luồng khác nhau như: `@UiThread`, `@MainThread`, `@WorkerThread`, `@BinderThread`.
- Sự khác nhau giữa `@MainThear` và `@UiThread` là một ứng dụng chỉ có một luồng chính, cũng là một luồng UI, nhưng mà có thể sinh ra thêm nhiều luồng UI khác nhau (một trên mỗi cửa sổ tab). Thông thường bạn sẽ gắn các sự kiện vòng đời với **Main Thread** và gắn tất cả các logic UI với **Ui Thread**.

## Bits and bobs
Trong phần này chúng ta sẽ xem xét số còn lại trong gói, để phân biệt ra các loại khác nhau. Tập hợp các annotation này mà tôi gọi là **architecture annotations**. Nó xác định một hợp đồng mà code của bạn nên tôn trọng khi gọi vào một số phương thức hoặc chỉ cung cấp một số ngữ cảnh trên một vài API nhất định.
- Annotation `@CallSuper` đang nói rõ rằng khi bạn ghi đè một phương thức từ superclass, bạn phải gọi tơi **super**. Điều này chỉ làm cho code của bạn rõ ràng hơn và hiển thị cảnh báo cho developer mà thôi, nhưng cũng nên có trường hợp này.
- Annotation `@CheckResult` được nhận xét thực tế rằng giá trị trả về của một phương thức không nên bỏ qua, vì nó cho phép bạn chỉ định cách sử dụng được đề xuất bởi IDE và sẽ có cảnh báo nếu nó bị vi phạm. 
- Cuối cùng, chúng ta có annotation `@VisibleForTesting`. Nó không hẳn được sử dụng bới IDE mọi lúc. Điều này là không rõ ràng lý do tại sao một phương thức, một lớp có phạm vi rộng hơn mức cần thiết: bạn sử dụng nó để phục vụ cho việc Test. Mặc dù bạn luôn phải giảm thiểu sự cần thiết cho việc này, nhưng thật tốt cho các developer khác biết rằng bạn đã để phương thức đó là public thay vì private.

-----

Chúc các bạn sử dụng annotation cho code của mình một cách hoàn hảo nhất.

Bài viết có nguồn từ: https://tips.seebrock3r.me/annotations-to-support-your-contracts-609ff259d5df