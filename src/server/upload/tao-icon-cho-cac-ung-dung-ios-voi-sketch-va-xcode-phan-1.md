Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/sketch-app-sources/painless-icon-generation-for-ios-apps-with-sketch-and-xcode-part-1-a169794aac8b

*Cách tạo tất cả kích thước biểu tượng cho ứng dụng iOS của bạn sau vài giây.*

![](https://images.viblo.asia/77d02bf7-9fb3-41c8-8e32-0169a58e756a.jpeg)

Chúng ta đã phải dành khá nhiều thời gian cho việc tạo các icon cho ứng dụng iOS. Một bộ icon tôi tạo trên XCode, cần đến 18 kích cỡ khác nhau. Vấn đề thực sự ở đây là chúng ta không chỉ làm việc này một lần, chúng ta phải tạo lại bộ icon này mỗi lần thiết kế cho icon đó thay đổi, và mỗi khi bạn cần một bộ icon mới. Trước đây, bạn biết rằng chúng ta phải dành hàng giờ để tạo, cắt, dán các icon khác nhau vào trong XCode.
Tôi đã suy nghĩ đến một quá trình có thể xuất ra bộ icon từ Sketch vào trong XCode một cách nhanh chóng hơn, thậm chí cho cả những icon mới. Bạn không cần là một Designer (mặc dù bạn có thể yêu cầu sự trợ giúp Designer của bạn để thiết lập Sketch), và bạn không cần thêm bất kì công cụ nào nữa của Sketch và XCode. Hãy đọc phần tiếp theo để biết cách làm thế nào nhé.

### Tổng quan
Bài viết này gồm có 3 phần.
Trong phần đầu này, tôi sẽ hướng dẫn các bạn cách thiết lập icon trên một **artboard** trong Sketch, và cách và cách cắt chúng để có thể xuất được ra toàn bộ các icon mà bạn cần trong một lần. Tôi sẽ trình bày cho bạn cách tạo lại bộ icon nếu thiết kế của icon đó có sự thay đổi, hoặc khi bạn cần thêm một icon với kích thước mới . Tôi sẽ đưa cho bạn một số gợi ý để tăng tốc quá trình bằng các cài đặt trước, và tôi sẽ giải thích cách làm việc của chúng.
Trong phần 2, tôi sẽ mô tả cách thiết lập kết nôi bộ icon của ứng dụng trong XCode với các file icon đã được xuất ra từ Sketch.
Trong phần 3, tôi sẽ chia sẻ với bạn một số gợi ý thiết lập artboard trong Sketch để quản lý nhiều icon cùng một lúc.

### Tạo bộ icon của bạn
#### Tạo một icon trong Sketch
Để bắt đầu, chúng ta cần một phiên bản **vector** của icon trên một artboard trong Sketch. Tôi dùng artboard có kích thước 180x180, nhưng bạn có thể sử dụng bất kì kích thước nào bạn muốn. 
Nó nên là một file vector vì chúng có thể được xuất ra bất kì kích thước nào. Nếu bạn chỉ có ảnh bitmap, tôi đặc biệt khuyên bạn nên sử dụng phiên bản vector, thậm chí bạn có thể phải vẽ lại nó. Việc này có lợi về lâu dài về sau vì bạn có thể phải xuất ra các file có kích thước lớn hơn trong tương lai, và nó cũng để để thiết lập hơn.
![Một icon vector đơn giản trên artboard trong Sketch.](https://images.viblo.asia/eda82c54-110e-4a5b-9471-b386f1505d39.png)

#### Slice artboard
Để tạo ra tất cả các kích thước khác nhau cần thiết cho bộ icon của bạn, chúng ta sẽ tạo một **slice** . Bạn có thể tìm thấy nhiều thông tin hơn về **slices** trong [Sketch documentation](https://www.sketchapp.com/docs/exporting/slices/), nhưng cơ bản **slice** cho phép bạn xuất một khu vực của artboard với nhiều kích thước khác nhau.
Một cách nhanh chóng để tạo một **slide** với tất cả các kích thước bạn cần là cắt và dán chúng vào các thiết lập có sẵn. Nếu bạn chưa có, hãy tải về từ link sau [](https://github.com/gllittler/Painless-icon-generation-for-iOS-apps) và mở file */Sketch/Snowflake icon.sketch* 
1. Chọn slice (được gọi là *my-icon/icon* trong file mẫu)
2. Chuột phải và **Copy**
3. Đi tới icon mới của bạn và chọn artboard của nó
4. Chuột phải và chọn **Paste Over**
5. Di chuyển và thay đổi kích thước của slice sao cho nó cùng kích thước với artboard của bạn và vị trí tại (0, 0)

![](https://images.viblo.asia/587fb04c-a37a-440b-b560-b4577e0e7802.png)
![](https://images.viblo.asia/0c096d8d-dae0-45d8-9ba7-9d25e5fe07ff.png)

#### Export slice bạn vừa tạo
Việc còn lại của bạn là tiến hành xuất slice bạn vừa tạo.
1. Click vào nút *Export my-icon/icon...* 
2. Chọn folder chứa file
3. Click *Export*

![](https://images.viblo.asia/9191e2a2-8d2c-49eb-9130-d41cf12bd09b.png)
Tìm trong output folder chọn ở bước 2 bạn sẽ thấy một folder tên là *my-icon*, trong folder này sẽ chứa toàn bộ các icon mà bạn cần. Chúc mừng! Giờ chúng ta đã sẵn sàng cho việc import vào XCode.
Nếu bạn muốn học thêm về việc bảo trì bộ icon của bạn và cách thức chúng hoạt động, hãy tiếp tục theo dõi trong phần dưới đây. Nếu bạn muốn giữ nó đơn giản, hay chuyển sang phần 2 để import bộ icon vừa export vào XCode.

#### Đặt tên cho slice của bạn
Tên của slice của bạn khá quan trọng. Trong [Sketch documentation](https://www.sketchapp.com/docs/exporting/slices/) có viết về một mẹo nhỏ:
> Nếu bạn dùng một dấu gạch chéo (/) trong tên của layer, nó sẽ đặt slide vào môt folder mới. Ví dụ: nếu slice của bạn tên là foo/bar.png, nó sẽ tao một folder tên là foo đầu tiên, sau đó tạo một ảnh tên là bar.png trong đó.
Tôi đã đặt tên slice của tôi là *my-icon/icon*. *my-icon* là tên folder, và bạn có thể đặt tên là bất kì gì bạn muốn. *icon* sẽ là dạng tên của các icon cụ thể của bạn. Nếu bạn luôn dùng *icon*, các ảnh png được export sẽ luôn có cùng tên, nó sẽ giúp cho việc thiết lập bộ icon trong XCode được nhanh hơn. Bạn sẽ biết trong phần 2.
Bạn có thể sáng tạo với việc đặt tên slice, và trong phần 3, tôi sẽ cho bạn một số gợi ý để giúp bạn export các icon trực tiếp trong XCode.

### Bảo trì icon của bạn
#### Thay đổi thiết kế của icon
Nếu icon của bạn có thay đổi design:
1. Thực hiện các thay đổi trong artboard của bạn
2. Chọn slice
3. Click lại vào nút **Export** 
Bạn đã vừa tạo lại bộ icon mới trong nháy mắt.

#### Thêm kích thước mới vào icon của bạn
Nếu yêu cầu về kích thước thay đổi:
1. Thêm kích thước mới vào slice (xem phần dưới **Giải thích cách slice được thiết lập**)
2. Click lại vào nút **Export** 
Bạn lại vừa tạo lại bộ icon mới trong nháy mắt.

#### Tăng tốc quy trình làm việc của bạn với một thiết lập sẵn slice (slice preset)
Việc sử dụng một slice preset sẽ giúp bạn có thể thiết lập một slice với một click. Tôi khuyến khích bạn sử dụng slice preset nếu bạn tạo và bảo trì nhiều hơn một icon.
Để tạo slice preset của bạn:
1. Chọn một slice đã được thiết lập từ trước
2. Click vào nút slice preset và chọn **Create Preset...**
3. Đặt tên preset mới của bạn là *iOS icons* 
![](https://images.viblo.asia/46818add-979e-474d-9d89-7e3ea4200098.png)
![](https://images.viblo.asia/246cfacb-b4e3-4bdd-b15d-ddce414738c9.png)

Để sử dụng preset mới của bạn để slice một icon mới:
1. Thêm một slice vào artboard tại vị trí 0, 0 và có cùng kích thước với artboard.
2. Đặt tên cho slice mới này, ví dụ *my-icon/icon*
3. Click vào nút slice preset và áp dụng preset của bạn
![](https://images.viblo.asia/fdc3f61f-d496-4628-9d9e-16eb7ab53b14.png)
Giờ thì slice của bạn có tất cả các kích thước từ preset của bạn. Bạn có thể sử dụng một preset để thay thế các kích thước trong bất kì slice nào, vì vậy nếu bạn thêm một số kích thước mới vào một slice đã có, bạn không cần phải xoá nó và bắt đầu lại từ đầu, bạn chỉ cần áp dụng preset.

#### Cách để thêm kích thước mới vào slice
Mỗi một hàng trong slice sẽ export một kích thước cho bộ icon của bạn. Để tìm ra kích thước bạn cần, hãy xem các placeholder trong một bộ icon trong Xcode.
![](https://images.viblo.asia/547dee6c-f1f0-4a5c-9783-1ca1023abae6.png)

Tính các kích thước của icon bạn cần bằng cách nhân kích thước *pts* của placeholder với hệ số kích thước (1 cho 1x, 2 cho 2x, 3 cho 3x). Ví dụ cho icon 20pt và hệ số 3x, bạn cần một icon có kích thước 20x3=60. Hộp kích thước trong slice sẽ là *60h* ( h nó lên rằng Sketch sẽ giãn các icon khi export theo chiều cao) 

![](https://images.viblo.asia/82037577-46ed-4311-aeca-f10bae4158b5.png)

*suffix* được thêm vào tên của slice khi bạn export nó. Cụ thể nó là cho iPhone hay iPad, kích thước theo *pts* và hệ số, ví dụ: -iPhone20@3x. Điều này sẽ giúp chúng ta dễ sắp xếp các icon với các placeholder icon trong XCode hơn.

### Tổng kết
Trong phần này, tôi đã giới thiệu cách thiết lập icon của bạn trong Sketch, để bạn có thể export một bộ icon đầy đủ từ một artboard một cách nhanh chóng. Giờ chúng ta đã có các icons, chuyển sang phần 2 để import chúng vào XCode.