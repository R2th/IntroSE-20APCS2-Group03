### navigation và exception

Jetpack có navigation component như một sự thống nhất về cách điều hướng cho phong cách single activity. Các function của navigation có vẻ rất là ổn áp khi mà các output đc định nghĩa rõ @NonNull hay @Nullable. Tuy nhiên lỗi các bạn sẽ phải gặp nhiều là tuy return NonNull, nhưng rất nhiều fun của navigation có throw exception, và là nguyên nhân chính gây ra lỗi app, crash khi dùng navigation.

Ví dụ:
```
@NonNull
public static NavController findNavController(@NonNull Fragment fragment) {

có exception sau:

@throws IllegalStateException if the given Fragment does not correspond with a {@link NavHost} or is not within a NavHost.
```
Lỗi này khi compile ko thấy đâu, runtime gặp mới biết crash à.

Để sửa thì chỉ có lưu ý hơn thông tin hàm mà chúng ta sử dụng, cụ thể ở đây là `findNavController`

### SafeArguments

```
class HomeFragment 
private val args: HomeFragmentArgs by navArgs()
```

dùng cái này trong navGraph thì chuẩn bài rồi, ko cần check null như với arguments, tuy nhiên nếu mà bạn dùng HomeFragment ở một chỗ khác ko phải qua navGraph thì sao nhỉ, ví dụ add hay replace như hồi xưa mà ko có arguments ấy, lúc đó thì exception nhé, lưu ý mà xử lý cho đúng thôi,

Lỗi này khi compile ko thấy đâu, runtime gặp mới biết crash à.

Để sửa thì chỉ dùng đúng chỗ hoặc phải đồng bồ safeArgs với hàm Fragment.newInstance(), cách đồng bộ này hơi mất công.

### fragment trong các navGraph khác nhau

Giả sử có xml Graph1, dùng Fragment F1 có action A1

Ở xml Graph2, vẫn Fragment F1 nhưng ko khai báo A1

Trong code đang ở Graph2 mà gọi F1.A1 thì vẫn đc, compule cũng ko lỗi luôn, runtime gặp mới biết crash à.

Để sửa cái này thì nên đồng bộ các action, argument của chung 1 fragment trong các graph khác nhau để khi sử dụng đỡ bị conflict, khi sử dụng trong code cũng ko cần lưu ý nhiều.

Navigation componenet đúng là tiện lợi hơn nhưng khi sử dụng các bạn hãy lưu ý đến hết các exception của nó nhé.