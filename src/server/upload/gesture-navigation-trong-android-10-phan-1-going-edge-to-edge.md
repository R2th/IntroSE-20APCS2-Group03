Từ Android Q, một system navigation mới đã được thêm, cho phép người dùng có thể back, điều hướng về home screen hay kích hoạt trợ lý ảo bằng cách sử dụng gesture.

![](https://images.viblo.asia/0d32fec7-3f22-4cd9-92d7-1eecd6a98e07.gif)

Bằng cách điều hướng hệ thống bằng cử chỉ, ứng dụng của chúng ta có thể có nhiều không gian hơn để hiển thị trên màn hình. Điều này có thể giúp tạo ra trải nghiệm tốt hơn khi sử dụng ứng dụng cho người dùng.

Bài viết này là bài đầu tiên trong series nhỏ của mình tập trung vào việc giúp developer có thể hỗ trợ gesture navigaton system trong ứng dụng. Series sẽ bao gồm các topic sau:

1. Going edge to edge: cho phép ứng dụng của bạn vẽ trên toàn bộ màn hình
2. Xử lý việc overlap với system UI
3. Xử lý việc xung đột với system gesture
4. Các tình huống phổ biến và cách giải quyết.

Bây giờ chúng ta sẽ bắt đầu với phần đầu tiên: Going edge to edge.

# Edge to Edge
Tôi sử dụng thuật ngữ edge to edge để mô tả các ứng dụng có giao diện chiếm toàn bộ màn hình để tăng không gian hiển thị của ứng dụng. Các ứng dụng thường có status bar ở trên cùng và ở dưới cùng là thanh điều hướng.

Bằng edge to edge các ứng dụng sẽ ở phía sau system bar. Điều này cho phép giao diện ứng dụng của bạn được mở rộng ra để mang lại trải nghiệm tốt cho người dùng.

Trong thực tê, bạn cần chú ý 2 điều:

## Ứng dụng nằm sau navigation bar

Đầu tiên, và quan trọng nhất để cân nhắc việc hỗ trợ gesture navigation đó là UI sẽ được vẽ sau thanh navgation bar. Bởi vì navigation bar đã được thu nhỏ lại và đặt ở lớp trên cùng. Hiện tại, các ứng dụng được khuyến nghị việc vẽ đằng sau navigation bar khi chạy trên Android Q để có một UX hấp dẫn và hiện đại hơn.

Khi ứng dụng chạy trên Android P hoặc cũ hơn, việc vẽ sau navigation bar là một lựa chọn, cho phép ứng dụng quyết định điều gì đó có ý nghĩa. Điều đó nói rằng, gần như các APi cần thiết hoạt động cho tới API level 21 (hoặc AndroidX xử lý các khác biệt). Do đó, lượng công việc cần làm để support thiết bị Android dưới Android Q là không nhiều. Những người dùng sử dụng các phiên bản trước Android Q cũng nhận được các trải nghiệm tốt hơn. 

## Vẽ đằng sau status bar
 
Thứ 2 là thứ chúng ta thấy ở trên cùng của màn hình, đó là status bar. Hiện nay điều này được đề xuất nếu nó có ý nghĩa cho content và layout. Điều này nghĩa là gì? Một ví dụ của layout phù hợp với việc UI được vẽ đằng sau status bar là ứng dụng các đối tượng chiếm toàn bộ chiều rộng. Đối với nhà phát triển điều này nghĩa là chúng ta đang sử dụng một thứ gì đó như appbar layout được gắn cố định ở trên cùng của màn hình.

Mặt khác, nếu ứng dụng của bán có một list các item và có một toolbar được đặt cố định vị trí ở trên cùng, việc vẽ UI đằng sau status bar có thể không mang nhiều ý nghĩa. Một quy tắc tương tự như việc ứng dụng nằm sau navigation bar đó là nó cũng là một sự lựa chọn cho các thiết bị chạy các phiên bản Android trước android Q.

# Implementation
Có 3 bước chính để implement drawing "edge-to-edge"

## 1. Request để ứng dụng có thể chiếm toàn màn hình.
Bước đầu tiên là yêu cầu hệ thống đặt UI của ứng dụng ra đằng sau các system bar (theo phương y). API chúng ta sử dụng cho việc này là  setSystemUiVisibility()  trên view, với một vài flag. Những flag cần chú ý là:

```Koltin
view.systemUiVisibility = 
    // Tells the system that the window wishes the content to
    // be laid out at the most extreme scenario. See the docs for
    // more information on the specifics
    View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
    // Tells the system that the window wishes the content to
    // be laid out as if the navigation bar was hidden
    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
```

Sau bước này UI sẽ ful screen và đặt đằng sau navigation bar.

![](https://images.viblo.asia/438a3988-9781-464b-b08d-53f1af7204b9.png)

## 2. Change system bar color

Bởi vì ứng dụng của chúng ta đã chiếm trọn màn hình, bây giờ chúng ta cần thay đổi màu của các system bar để có thể thấy content đằng sau chúng.

### Android Q

Khi chạy trên Android Q công việc của chúng ta chỉ đơn giản là set màu của system bar để nó trở nên hoàn toàn trong suốt.

```Kotlin
<!-- values-v29/themes.xml -->
<style name="Theme.MyApp">
    <item name="android:navigationBarColor">
        @android:color/transparent
    </item>

    <!-- Optional, if drawing behind the status bar too -->
    <item name="android:statusBarColor">
        @android:color/transparent
    </item>
</style>
```

Trên Android Q, hệ thống chịu trách nhiệm hoàn toàn trong việc xử lý các nội dung nằm trên system bar để người dùng có thể thấy được chúng (time, icon, drag handle,...)  trong tất cả các navigation mode. Điều này có nghĩa là chúng ta không cần tự mình làm gì với chúng. Trong thực tế , hệ thống sẽ làm một trong hai điều

#### Thay đổi màu của content sao cho phù hợp

Nội dung chứa trên các system bar sẽ thay đổi màu dựa vào content đằng sau nó. Có nghĩa là nếu content đằng sau nó có màu sáng thì nó sẽ có màu tối. Ngược lại nó sẽ có màu sáng khi nội dung đằng sau nó có màu tối. Điều này được gọi là dymamic color adaptation.

#### Translucent scrim

Ngoài ra, hệ thống cũng có thể sẽ sử dụng một translucent scrim đằng sau system bar. Một điều cần chú ý đó việc translucent scrim chỉ được xảy ra nếu targetVersion là 29. Nếu ứng dụng của bạn target SDK là 29 hoặc nhỏ hơn, automatic scrim sẽ không được hiển thị, và một transparent navigation được hiển thị.

Cả 2 hành động trên xảy ra để đảm bảo rằng người dùng luôn luôn thấy nội dung của system bar. Hệ thống lựa chọn action nào phụ thuộc vào một vài yếu tố. Scrim sẽ được sử dụng nếu:

* One of button mode được sử dụng
* Trong gesture navigation mode, và nhà cung cấp thiết bị lựa chọn việc disable dynamic color adaptation. Một lý do hợp lý để làm việc này là bởi cấu hình của ứng dụng không đủ mạnh mẽ để xử lý color adaptatio

Nếu không, dynamic color adaptation sẽ được sử dụng.

#### Disable system bar protection trong Androd Q.

Nếu bạn không muốn hệ thống làm bất kỳ action tự động nào để bảo vệ nội dung trên system bar, bạn có thể disable chúng bằng cách thiết lập:

`android:enforceNavigationBarContrast` và/hoặc `android:enforceStatusBarContras` thành false trong theme của bạn.

### Android P trở vè trước

Nếu bạn quyết định cũng áp dụng go edge-to-edge trên các thiết bị trước Android Q, bạn nên set translution system bar color để bảo vệ nội dung hiển thị trên system bar. Một black scrim với 70% opacity để sử dụng với theme mà sử dụng dark system bar.

```Kotlin
<!-- values/themes.xml -->
<style name="Theme.MyApp">
    <item name="android:navigationBarColor">
        #B3FFFFFF
    </item>
</style>

<!-- values-night/themes.xml -->
<style name="Theme.MyApp">
    <item name="android:navigationBarColor">
        #B3000000
    </item>
</style>
```

# Kết

Trên đây là cách implement  một ứng dụng với một UI chiếm toàn bộ màn hình. Hi vọng có thể giúp bạn phần nào trong quá trình phát triển ứng dụng.

Cảm ơn các bạn đã theo dõi.

# Tham khảo

Bài viết có tham khảo từ nguồn: https://medium.com/androiddevelopers/gesture-navigation-going-edge-to-edge-812f62e4e83e