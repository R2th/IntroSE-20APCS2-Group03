## Một cấu trúc theme lý tưởng
Chúng ta có một dark theme, một light theme, cũng như một light theme với một dark toolbar.

![](https://images.viblo.asia/19616335-1881-4194-8e41-83300bf5e9fa.png)

Thực tế hóa ra chúng tôi có nhiều hơn ba chủ đề - chúng tôi có 22 chủ đề và hệ thống phân cấp chủ đề trông như sau. Mỗi ô vuông đại diện cho một chủ đề, trong đó các mũi tên cho biết các chủ đề kế thừa lẫn nhau như thế nào, nhưng khi chúng tôi kiểm tra các cách sử dụng, nó không rõ ràng tại sao một màn hình sử dụng một biến thể cụ thể so với một biến thể khác và một số sử dụng tất cả:

![](https://images.viblo.asia/cb80a560-c4a3-4bbc-b163-2cfab862d97a.png)

Ứng dụng này đang phát triển nhanh chóng. Ở lần tính cuối cùng, chúng tôi đã có khoảng 130 activities và 300 fragments, được phát triển bởi 18 kỹ sư Android, trải rộng trên nhiều nhóm phát hành một bản phát hành mới, mỗi tuần, vì vậy, có thể hiểu được cách chúng tôi đến vị trí này.

Điều khó khăn nhất là chúng tôi có hai trees. Điều này có nghĩa là thật dễ dàng để thêm một lỗi liên quan đến chủ đề vào một tree chứ không phải tree khác, và điều tương tự cũng xảy ra đối với việc sửa lỗi.

Những gì chúng tôi muốn là một cái gì đó gần hơn với cấu trúc được trình bày:

![](https://images.viblo.asia/c6d12638-acf7-4afc-941b-2ac927f0a867.gif)

Có một tree duy nhất với bốn layers:
* app theme
* base theme
* platform theme
* framework theme

### App theme
Ở dưới cùng là các chủ đề ứng dụng, chúng tôi áp dụng ở cấp độ activity:

* `Theme.Monzo.Light`
* `Theme.Monzo.Dark`

Chủ đề ứng dụng chủ yếu sẽ chứa các giá trị cho các thuộc tính màu, như `colorPrimary`, `colorSurface` và `android:colorBackground`. Ví dụ: `android:colorBackground` được định nghĩa là **navy** trong `Theme.Monzo.Dark` nhưng nó là **off-white** trong `Theme.Monzo.Light`.

```
<style name="Theme.Monzo.Light" parent="Base.Theme.Monzo">
    <item name="android:colorBackground">@color/off_white</item>
    <item name="colorOnBackground">@color/navy</item>
    <item name="colorSurface">@color/white</item>
    <item name="colorOnSurface">@color/navy</item>
    <item name="colorPrimary">@color/off_white</item>
    <item name="colorOnPrimary">@color/navy</item>
    <!-- ... -->
</style>

<style name="Theme.Monzo.Dark" parent="Base.Theme.Monzo">
    <item name="android:colorBackground">@color/navy</item>
    <item name="colorOnBackground">@color/white</item>
    <item name="colorSurface">@color/dark_grey</item>
    <item name="colorOnSurface">@color/white</item>
    <item name="colorPrimary">@color/navy</item>
    <item name="colorOnPrimary">@color/white</item>
    <!-- ... -->
</style>
```

Khi tất cả các views và layouts chỉ tham chiếu các thuộc tính màu từ các chủ đề của chúng tôi, thì việc thêm chế độ “night-mode” vào ứng dụng trở nên tầm thường: chúng ta có thể ghi đè các chủ đề ứng dụng này trong thư mục tài nguyên `values-night` với một bộ giá trị màu khác nhau.

### Base theme
Chủ đề cơ sở của chúng tôi, `Base.Theme.Monzo`, là nơi chúng tôi ghi đè hoặc xác định kiểu mặc định cho views và thuộc tính text appearance.

Layer này thường không chứa các tham chiếu đến các màu cụ thể. Thay vào đó, tài nguyên style được sử dụng ở đây sẽ tham chiếu các thuộc tính từ các chủ đề ứng dụng.

```
<style name="Base.Theme.Monzo" parent="Platform.Theme.Monzo">
    <!-- ... -->
    <item name="tabStyle">@style/Widget.Monzo.TabLayoutLegacy</item>
    <item name="textInputStyle">@style/Widget.Monzo.TextInputLayout</item>
    <item name="toolbarStyle">@style/Widget.Monzo.Toolbar</item>
    <!-- ... -->
</style>
```

Tránh sử dụng màu sắc được hardcoded trong layer này, có nghĩa là mọi thứ phổ biến cho tất cả các chủ đề đều có thể ở đây.

### Platform theme
Layer chủ đề nền tảng (platform theme) cho phép chúng tôi tính toán các thuộc tính cụ thể của API. Sử dụng qualifiers tài nguyên, chúng tôi có thể chỉ định một chủ đề nền tảng khác nhau cho các phiên bản Android khác nhau.

```
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <style name="Platform.V23.Theme.Monzo" parent="Platform.V21.Theme.Monzo">
        <!-- Attributes which are only available from API 23 -->
    </style>

    <style name="Platform.Theme.Monzo" parent="Platform.V23.Theme.Monzo" />

</resources>
```

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
  
    <style name="Platform.V21.Theme.Monzo" parent="Theme.MaterialComponents.Light.NoActionBar" />

    <style name="Platform.Theme.Monzo" parent="Platform.V21.Theme.Monzo" />
  
    <!-- ... -->

</resources>
```

![](https://images.viblo.asia/d48706f9-2957-4d8e-adb3-3ff101b65023.png)

Điều này hoạt động dựa trên các nguyên tắc sau:

* Chủ đề cơ sở phụ thuộc vào `Platform.Theme.Monzo`
* `Platform.Theme.Monzo` được định nghĩa trong mỗi nhóm tài nguyên nơi chúng ta cần các thuộc tính dành riêng cho phiên bản
* Mỗi phiên bản của Platform.Theme.Monzo phụ thuộc vào tài nguyên chủ đề dành riêng cho phiên bản, ví dụ: `Platform.V23.Theme.Monzo`
* Các tài nguyên chủ đề dành riêng cho phiên bản kế thừa từ các tài nguyên dành riêng cho phiên bản cũ hơn, trừ khi nó khởi động minSdkVersion trong trường hợp đó, nó sẽ phụ thuộc vào framework theme

### Framework theme
Chúng tôi đã chọn Theme.MaterialComponents.Light.NoActionBar làm framework theme để kế thừa. Chủ đề khung (framework theme) cung cấp nhiều giá trị mặc định hợp lý để chúng tôi không thể chỉ định mọi thứ.

## Renaming and pruning trees
Với rất nhiều themes và styles, thật khó để biết bắt đầu từ đâu. Một phần của khó khăn này nằm ở chỗ nó không rõ ràng về cách sử dụng các chủ đề bởi vì nó không rõ ràng về tài nguyên style nào là chủ đề. Chúng tôi quyết định áp dụng một quy ước đặt tên nghiêm ngặt để giúp chúng tôi điều hướng trạng thái hiện tại của ứng dụng.

Quy tắc đầu tiên chúng tôi đồng ý là tận dụng ký hiệu dấu chấm nếu có thể, bảo lưu việc sử dụng parent rõ ràng chỉ trong hai trường hợp:
* khai báo theme overlay, nơi chúng tôi không muốn kế thừa bất kỳ thuộc tính nào
* thay đổi không gian tên khi kế thừa từ một style từ một family khác

Điều này làm cho nó thực sự dễ dàng để xem nguồn gốc của một chủ đề bằng cách loại bỏ sự gián tiếp:

![](https://images.viblo.asia/508a3feb-443b-4149-bee1-bc108f6dd19d.gif)

Ref: https://medium.com/monzo-bank/refactoring-android-themes-with-style-restructuring-themes-15230569e50