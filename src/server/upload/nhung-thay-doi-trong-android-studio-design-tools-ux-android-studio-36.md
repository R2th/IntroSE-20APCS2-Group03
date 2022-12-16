Trong bài viết này, tôi muốn giới thiệu đến các bạn những tiều thay đổi của Design Editor trong Android Studio 3.6. Cùng tìm hiểu xem điểu gì đã khiến nó thay đổi và thử làm một vài thứ thú vị với sự thay đổi trên.  Bắt đầu thôi nào :triumph:.


-----


# Giới thiệu về Design Tools Split View. 
Trong Android Studio 3.6, có sự thay đổi cách bạn chuyển đổi giữa các chế độ "editting" cho các file thiết kế (file xml). Thay vì chọn giữa các trình soạn thảo "Text" và "Design" (Hình 1) bằng cách chọn tab tương ứng ở góc dưới bên trái, giờ đây chúng ta mở các tệp thiết kế chỉ trong Design editor, có ba chế độ khác nhau (Hình 2).
![](https://images.viblo.asia/39897db6-2c8c-45ee-bd56-18d82c87832e.gif)
*Hình 1*
![](https://images.viblo.asia/c379ec3d-f39d-4a77-860a-bdf0c626a836.gif)
*Hình 2*

Bạn có thể chọn các chế độ sau bằng cách nhấp vào các nút tương ứng ở góc trên bên phải của trình chỉnh sửa hoặc bằng cách sử dụng phím tắt (Ctrl + Shift + Left/Right Arrow nếu bạn đang ở trên máy Mac hoặc Alt + Shift + Left/Right Arrow trên Window, Ubuntu):

* Code : cung cấp chức năng của trình soạn thảo văn bản XML.  
* Design : bao gồm chế độ xem chứa trình chỉnh sửa thiết kế (ví dụ: biểu đồ điều hướng, bố cục) có thể được sử dụng để chỉnh sửa tệp bằng đồ họa.  
* Split: hiển thị cả Code và Design cạnh nhau, để bạn có thể xem trước thiết kế của mình trong khi chỉnh sửa code.

Bạn có thể cảm thấy chế độ Split giống với chế độ "editing" khi mở preview trong phiên bản trước. Tuy nhiên chúng có một số khác biệt mà ta sẽ tìm hiểu ngay sau dâyd.

## Giữ nguyên trạng thái của từng file - Preserving the state of each file
Như đã đề cập ở trên, chế độ Split là sự ketes hợp giữa chế độ Design và Code. Nếu bạn đang xem một file resource bằng chế độ Split thì kho chuyển sang chế độ Design để chỉnh sửa resource bằng các công cụ  "graphical tools", thì trạng thái của "design editor" sẽ vẫn được duy trì, như mức thu phóng và các lựa chọn.

Chỉnh sửa song song nhiểu file resource là tình huống mà tôi hay bạn đều đã gặp. Mỗi file có các nhu cầu chỉnh sửa khác nhau, có file ở chế độ Design, file ở chế độ Code, file thì ở chế độ Split (Hình 3). Trình editor hiện giờ giữ trạng thái biên tập của mỗi tệp, vì vậy bạn có thể chuyển đổi giữa các tệp mà không lo mất trạng thái xem trước.
![](https://images.viblo.asia/ffa67835-b5d9-494a-9d2a-8ccd2c9dbcbb.gif)
*Hình 3*

Trong các phiên bản trước, trạng thái cửa sổ Preview sẽ được đặt lại bất cứ khi nào bạn chuyển tệp.  Hãy tưởng tượng bạn đang chỉnh sửa một số tệp A ở chế độ "Text" và đã phóng to trên cửa sổ Preview, sau đó chuyển sang chỉnh sửa tệp B ở chế độ "Design".  Chuyển về tệp A sẽ đặt lại trạng thái Preview, mặc dù tệp B không sử dụng Preview (Hình 4).
![](https://images.viblo.asia/c76be767-348a-407a-b6da-8ab707799411.gif)
*Hình 4*
## Cửa sổ Preview sẽ bị loại bỏ
Bạn có thể xem trước file resource của mình bằng chế độ Split mới được thêm, do đó cửa sổ Preview đã được loại bỏ.  Trước đây, Android Studio đã hiển thị cửa sổ công cụ này mỗi khi bạn mở file resource bằng trình soạn thảo "Text".  Nếu bạn thay đổi trình soạn thảo thành Design hoặc mở tệp non-resource, Preview sẽ được ẩn đi (Hình 5).  Vì không có cửa sổ công cụ nào khác trong Android Studio / IntelliJ không chia sẻ hành vi tương tự, điều này có thể gây nhầm lẫn.
![](https://images.viblo.asia/984ae164-21ec-42f7-8e9e-b6071ae0c641.gif)
*Hình 5*

## Split view có tất cả các tool windows
Nói về tool windows, chế độ Split chứa tất cả các tool windows mà bạn thấy trong chế độ Design. Trong các phiên bản trước, cửa sổ Preview chỉ cung cấp cửa sổ công cụ Palette, điều đó có nghĩa là bạn cần chuyển đổi qua lại từ Text + Preview sang Design để xem cây thành phần của bạn.
# Hỗ trợ Navigation Editor
Ngoài các thay đổi ở trên, Android Studio 3.6 còn được cải thiện hỗ trợ xem trước cho nhiều loại tệp tài nguyên hơn. Như, chúng ta có thể mở các file "navigation graph" trong chế độ Split chỉnh sửa các tệp này trong khi đồng thời xem trước kết quả trong Navigation Editor. Điều này đặc biệt hữu ích cho các đồ thị (graph) lớn và phức tạp. Ví dụ, nếu bạn có nhiều lớp biểu đồ lồng nhau, bạn có thể cần phải chuyển đổi giữa các trình soạn thảo "Design" và "Text" một vài lần để khớp một đoạn cụ thể trong code của bạn với phần đồ họa tương ứng của nó, như được minh họa trong Hình 6. Bây giờ bạn chỉ cần nhấp vào thẻ &lt;Fragment	&gt; trên phần XML để hiển thị fragment trong phần đồ họa, ngay cả khi nó nằm trong biểu đồ lồng nhau, như trong Hình 7. Tương tự, bạn có thể dễ dàng tìm thấy các phần tử trong một  navigation graphs lớn  bằng cách chọn thành phần quan tâm trong phần đồ họa của trình soạn thảo. Con trỏ văn bản sẽ nhảy đến thẻ XML tương ứng.

![](https://images.viblo.asia/67591a93-77fa-4209-85eb-da2d1253bbac.gif)

*Hình 6*

![](https://images.viblo.asia/56f345a9-cd13-416b-9db6-478ffb985a07.gif)

*Hình 7*

# Hỗ trợ Drawable
Android Studio 3.6 cung cấp tùy chọn để mở một drawable trong chế độ Design để trình soạn thảo văn bản không chiếm không gian UI  Điều này rất hữu ích, ví dụ, nếu bạn cần phóng to nhiều để kiểm tra một asset cụ thể.

Trước đây, bạn chỉ có thể mở các drawable bằng trình soạn thảo XML, nơi sẽ cung cấp tùy chọn xem trước drawable bằng cửa sổ Preview.  Hình 8 và Hình 9 cho thấy một ví dụ về việc xác minh vector drawable path một cách chi tiết trước và sau khi Android Studio giới thiệu các thay đổi UX cho trình soạn thảo thiết kế, tương ứng.
![](https://images.viblo.asia/1bfcabbb-7e9d-4579-9830-ee4df7a3a431.gif)

*Hình 8*

![](https://images.viblo.asia/a870bf47-68f6-4817-aa9e-4c6dfa87b7ff.gif)

*Hình 9*

-----
Ngoài ra bạn có thể làm một số thứ hay ho với Android Studio 3.6
# Floating Preview Window

1. Bấm chuột phải vào tab của tệp bạn muốn "float".  
1. Trong context menu, nhấp vào Split Vertically.  Một phiên bản khác của tệp sẽ mở trong một tab riêng biệt theo phân chia dọc.
1. Kéo tab mới bên ngoài Android Studio để tạo cửa sổ nổi.
1. Trong tab mới, chọn Chế độDesign để làm cho cửa sổ này hoạt động như bản Floating Previewi của bạn.

![](https://images.viblo.asia/4461cfe0-3d65-4593-9d63-9f1db38d15cd.gif)

# Vertical Preview Window
Bạn có thể theo dõi các bước trong hình sau
![](https://images.viblo.asia/2968b94f-2c97-4a55-abc1-c851373336e3.gif)

Cảm ơn bạn đã theo dõi bài viết.

[Tham khảo ](https://medium.com/androiddevelopers/android-studio-design-tools-ux-changes-split-view-dcde75e88a0c)