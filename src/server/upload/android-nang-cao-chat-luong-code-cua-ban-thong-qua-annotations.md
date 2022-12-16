# Add annotations vào project của bạn
Tất cả mọi developer đều mong muốn trở thành developer giỏi, và tôi cũng vậy, t vẫn luôn luôn muốn cải thiện từng dòng code của mình từng ngày một. 
> Anyone can write code that a computer can understand. Good programmers write code that humans can understand — Martin Fowler
> 
Và annotation là một trong số cách đó. Hôm nay mình sẽ hướng dẫn để sử dụng annotation một cách hiệu quả để có thể cải thiện code của bạn nhé

Có rất nhiều cách để sử dụng annotations, nhưng hôm nay chúng ta sẽ nói về làm sao để sử dụng annotation một cách hiệu quả để có thể cải tiến từng dòng code của các bạn.
Hiện nay, Android đã chính thức cung cấp thư viện support annotation các bạn có thể include thư viện bằng dependency như dưới đây 
1. Open the SDK Manager bằng cách click vào SDK Manager trên thanh toolbar hoặc chọn Tools > Android > SDK Manager.
2. Click vào tab SDK Tools .
3. Mở Support Repository và check vào Android Support Repository checkbox.
4. Click OK
5. Download và cài đặt gói Android Support Repository
6. Add thư viện support -annotatión vào prọect thông qua dependency bằng cách thêm đoạn code sau vào khối block ```dependencies ``` trong file ```app/build.gradle```
```
compile ‘com.android.support:support-annotations:x.x.x’
```
Version hiện tại mới nhất là ```24.2.0```

7. Click ```Sync Now```

# Một số annotation mạnh mẽ và hiệu quả.
## Nullness annotation
```@Nullable``` và ```@Nonnull``` annotatión được sử dụng để kiểm tra khả năng null của một biến, một tham số hoặc một kiểu dữ liệu trả về

```@Nullable```: Annotation này chỉ ra rằng biến, tham số hoặc kiểu dữ liệu được đánh dấu CÓ thể null

```@Nonnull```: Annotation này chỉ ra rằng biến, tham số hoặc kiểu dữ liệu được đánh dấu KHÔNG thể null

Còn null là gì các bạn có thể hình dung qua bức ảnh sau 

![](https://images.viblo.asia/12ca9669-2159-4578-a1d6-925fd0657def.jpg)

Ví dụ
```
    @NonNull
    public View getView(@NonNull String s1, @NonNull String s2) {
        // s1 can be null
        // s2 should not be null
        // it must return non null view
        TextView view = new TextView(this);
        view.setText(s1);
        view.append(s2);
        return view;
    }
```
Và khi bạn gọi menthod vừa rồi như thế này
```
 View view = getView("Toản Doãn", null);
```
thì trong quá trình kiểm tra code, Android Studio sẽ cảnh báo bạn rằng biến ```s2``` không thể bị null.
Vậy làm sao để có thể kiểm tra code.

## Cách kiểm tra chất lượng code.
Để kiểm tra code các bạn sử dụng Android Studio và làm như sau
Click vào Analyze > Inspect Code > Click OK và xem kết quả như hình sau

![](https://images.viblo.asia/cfc42741-18e9-4082-92fe-dc9e5ff21574.png)

Như trong ví dụ trên của mình thì Android Studio đã hiển thị lỗi 
"Passing "null" argument to parrameter annotated as @NotNull"
để sửa lỗi này thì các bạn chỉ cần sửa lại câu lệnh cho đúng là được

## Resource annotations
Như các bạn đã biết thì Android có reference tới resource như là drawble resource, string resource và tất cả cả resource này được truy xuất thông qua 1 id là R.id có giá trị làmột kiểu int. 
Để viết một hàm đơn giản sử dụng resource các bạn có thể khai báo cho tham số là kiểu int như sau
```
 public void setText(TextView text, int strResource) {
        text.setText(strResource);
    }
```

Tuy nhiên để có thể định nghĩ chính xác biến ```strResource``` phải là resource thì các bạn có thể đánh dấu biến int đó thông qua annotation @StringRes như sau
```
public void setText(TextView text, @StringRes int strResource) {
        text.setText(strResource);
    }
```

và ngay sau đó khi các bạn sử dụng menthod ```      setText(view, 1);``` thì Android Studio (AS) sẽ thông báo lỗi cho các bạn như sau

![](https://images.viblo.asia/3199bd81-c2eb-4acd-ac58-09417d8f6385.png)

## Thread annotations
Thread annotations định nghĩa xem menthod được đánh dấu annotation sẽ được chạy trên luồng nào.
Các Thread annotations được hỗ trợ gồm có

```
@MainThread

@UiThread

@WorkerThread

@BinderThread

@AnyThread
```

Với một số hàm nhất định các bạn có thể định nghĩa Thread annotations cho nó để đảm bảo rằng nó được chạy trên 1 thread mà các bạn mong muốn. Trường hợp mình hay sử dụng đó là việc connect api hay query database buộc phải nằm trên một Worker Thread và mình sẽ đánh giấu nó với annotation ```@WorkerThread```

```
    @WorkerThread
    private void connectApi() {
        // todo something on main thread like update ui
    }
```

## Value constraint annotations
Trong một số trường hợp nhất định, chúng ta cần giới hạn khoảng và size của tham số truyền vào, Android support annotation đã cung cấp cho chúng ta 3 annotation thông dụng để làm việc đó
```
@IntRange: Xác định  parameter truyền vào là kiểu int và nằm trong 1 khoảng nào đó
@FloatRange: Xác định  parameter truyền vào là kiểu float và nằm trong 1 khoảng nào đó
@Size
```
Dưới đây là ví dụ về @IntRange để đảm bảo rằng giá trị truyền vào chỉ có thể trong khoảng từ 0-255
```
    public void setAlpha(@IntRange(from = 0, to = 255) int alpha) {

    }
```

## Permission annotations
Sử dụng annotation @RequiresPermission  để xác nhận permision của hệ thông đã được cấp phát trước khi sử dụng 1 menthod nào đó chưa.
Để  xác nhận một quyền duy nhất trong danh sach một số quyền chúng ta có từ khóa ```anyOf```, để  xác nhận một danh sách các quyền chúng ta sử dụng từ khóa ```allOf ```
ví dụ
```
@RequiresPermission(Manifest.permission.SET_WALLPAPER)
public abstract void setWallpaper(Bitmap bitmap) throws IOException;
```
Đảm bảo hệ thống đã cấp phát quyền SET_WALLPAPER trước khi sử dụng
hay chúng ta có ví dụ về coppy file từ bộ nhớ
```
@RequiresPermission(allOf = {
    Manifest.permission.READ_EXTERNAL_STORAGE,
    Manifest.permission.WRITE_EXTERNAL_STORAGE})
public static final void copyFile(String dest, String source) {
    ...
}
```
Nếu bạn gọi các menthod này mà không xin cấp quyền trong menifest sẽ có warning.

Ngoài ra các bạn cũng có thể tự tạo các annotation cho chính ứng dụng của các bạn, mình sẽ có một bài viết hướng dẫn cách viết annotation trong bài viết tiếp theo.

Bài viết có tham khảo các nguồn
https://developer.android.com/studio/write/annotations.html
https://blog.mindorks.com/improve-your-android-coding-through-annotations-26b3273c137a

Cám ơn các bạn đã theo dõi!