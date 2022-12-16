# Mở đầu
- Việc sử dụng Library để `navigation` giữa các màn với nhau, đã giúp ích cho các `dev` đặc biệt là những `newbie` rất nhiều vì nó kiểu như mì ăn liền `import` rồi sử dụng, nhưng cũng đem lại 1 hạn chế đó chế đó là các bạn quên mất và không biết nguồn gốc của nó, ví dụ như vấn đề mình sẽ đề cập trong bài viết này,  Với những bạn mới tiếp xúc với thư viện mới như Navigation Components thì việc truyền dữ liệu qua lại giữa các `fragment` là vô cùng mới mẻ và khác lạ. Với bài viết ngày hôm nay, bây giờ mình sẽ hướng dẫn các bạn truyền dữ liệu qua lại `fragment` khi sử dụng Navigation Components nhé. Trước khi đọc bài này mình nên nghĩ các bạn nên có kiến thức 1 xíu về  `Bundle`,`Arguments` trong `Android`.
# Cài đặt
- Để thao tác và làm theo hướng dẫn của mình thì các bạn cần import 1 số thứ nhé, và đặc biệt các bạn phải biết và đã sử dụng Navigation Components, mình cũng có 1 bài hướng dẫn sử dụng NV các bạn có thể tham khảo nhé :v: 
*Để chuyển dữ liệu giữa các đích, trước tiên hãy xác định đối số bằng cách thêm đối số vào đích nhận nó bằng cách làm theo các bước sau:
1. Trong **Navigation editor** Điều hướng , bấm vào đích nhận đối số.
2. Trong bảng **Attributes** , nhấp vào Thêm ( **+** ).
3. Trong cửa sổ  **Add Argument Link**  đối số xuất hiện, hãy nhập tên đối số, loại đối số, đối số có thể null hay không và giá trị mặc định, nếu cần.
4. Nhấp vào  **Add** . Lưu ý rằng đối số bây giờ xuất hiện trong danh sách **Arguments** trong bảng **Attributes** .
5. Tiếp theo, nhấp vào hành động tương ứng đưa bạn đến điểm đến này. Trong bảng  **Attributes** , bây giờ bạn sẽ thấy đối số mới được thêm của mình trong phần **Argument Default Values** .
6. Bạn cũng có thể thấy rằng đối số đã được thêm vào trong XML. Nhấp vào tab Văn bản để chuyển sang chế độ xem XML và nhận thấy rằng đối số của bạn đã được thêm vào đích nhận đối số. Một ví dụ đã được biểu diễn ở dưới:
```
 <fragment android:id="@+id/myFragment" >
     <argument
         android:name="myArg"
         app:argType="integer"
         android:defaultValue="0" />
 </fragment>
```
*Supported argument types:
-Thư viện điều hướng hỗ trợ các loại đối số sau:
![](https://images.viblo.asia/e2bf675b-9944-4483-b066-91ef0bb143cb.PNG)
Nếu kiểu đối số hỗ trợ giá trị null, bạn có thể khai báo giá trị mặc định là null bằng cách sử dụng android: defaultValue = "@ null".

Khi bạn chọn một trong các kiểu tùy chỉnh, hộp thoại  `Select Class` sẽ xuất hiện và nhắc bạn chọn lớp tương ứng cho kiểu đó. Tab ` Project` cho phép bạn chọn một lớp từ dự án hiện tại của bạn.

Bạn có thể chọn `<inferred type>` để thư viện Điều hướng xác định kiểu dựa trên giá trị được cung cấp.

Bạn có thể kiểm tra `Array` để chỉ ra rằng đối số phải là một mảng của giá trị `Type`đã chọn. Lưu ý những điều dưới đây:

Mảng enums và mảng tham chiếu tài nguyên không được hỗ trợ.
Mảng hỗ trợ giá trị `nullable`, bất kể hỗ trợ giá trị `nullable` của kiểu cơ bản. Ví dụ: sử dụng `app: argType = "integer []"` cho phép bạn sử dụng `app: nullable = "true"` để chỉ ra rằng việc truyền một mảng `null` là có thể chấp nhận được.
Mảng hỗ trợ một giá trị mặc định duy nhất, `"@null"`. Mảng không hỗ trợ bất kỳ giá trị mặc định nào khác.
*Override a destination argument in an action:
-Các đối số cấp độ đích và giá trị mặc định được sử dụng bởi tất cả các hành động điều hướng đến đích. Nếu cần, bạn có thể ghi đè giá trị mặc định của một đối số (hoặc đặt một đối số nếu nó chưa tồn tại) bằng cách xác định một đối số ở cấp hành động. Đối số này phải cùng tên và cùng kiểu với đối số được khai báo trong đích.

XML bên dưới khai báo một hành động với đối số ghi đè đối số cấp đích từ ví dụ trên:
```
<action android:id="@+id/startMyFragment"
    app:destination="@+id/myFragment">
    <argument
        android:name="myArg"
        app:argType="integer"
        android:defaultValue="1" />
</action>
```
*Use Safe Args to pass data with type safety
- Phần này mình sẽ nói cho các bạn tiếp phần sau nhé: 
Làm theo ví dụ trên các bạn sẽ truyền được Argument giữa các fragment với nhau rồi!!
Source: https://developer.android.com/guide/navigation/navigation-pass-data