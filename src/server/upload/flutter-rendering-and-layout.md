### 1. Mở đầu
Bài viết này của mình sẽ mô tả về quá trình rendering trong Flutter, là một loạt các bước mà Flutter thực hiện để chuyển đổi hệ thống phân cấp (hierachy) của các widget thành các pixel thực tế được vẽ trên màn hình. Chúng ta bắt đầu thôi!
### 2. Flutter's rendering model
Ta thử đặt ra câu hỏi: Nếu Flutter là một framework đa nền tảng (cross-platform), thì làm thế nào nó có thể cung cấp hiệu suất tương đương với các framework nền tảng đơn lẻ?

Sẽ rất hữu ích nếu ta bắt đầu bằng cách nghĩ về cách các ứng dụng Android truyền thống hoạt động. Khi vẽ, trước tiên ta gọi mã code Java của framework Android. Các thư viện hệ thống Android cung cấp các thành phần chịu trách nhiệm vẽ chính chúng vào một đối tượng Canvas, mà Android sau đó có thể kết xuất bằng Skia, một công cụ đồ họa được viết bằng C / C ++ gọi CPU hoặc GPU để hoàn thành bản vẽ trên thiết bị.

Các framework đa nền tảng thường hoạt động bằng cách tạo một lớp trừu tượng trên các thư viện giao diện người dùng Android và iOS native bên dưới, và cố gắng giải quyết những vấn để riêng cho mỗi nền tảng. Mã code ứng dụng thường được viết bằng ngôn ngữ thông dịch như JavaScript, ngôn ngữ này phải tương tác với các thư viện hệ thống như: Android base trên Java hoặc iOS base trên Objective-C để hiển thị giao diện người dùng. Tất cả điều này làm tăng thêm chi phí, đặc biệt là khi có nhiều tương tác giữa giao diện người dùng và logic ứng dụng.
![](https://images.viblo.asia/466ac7da-9f91-4cfe-b44a-a740da9e260b.jpeg)
Ngược lại, Flutter giảm thiểu những điều trừu tượng đó, bỏ qua các thư viện UI widget hệ thống để có lợi cho bộ widget của chính nó. Ngôn ngữ Dart vẽ hình ảnh của Flutter được biên dịch thành native code, sử dụng Skia để rendering. Flutter cũng nhúng bản sao Skia của riêng mình vào một phần của công cụ, cho phép developers nâng cấp ứng dụng của họ để luôn cập nhật những cải tiến hiệu suất mới nhất ngay cả khi điện thoại chưa được cập nhật phiên bản Android mới. Điều này cũng đúng với Flutter trên các native platforms khác, chẳng hạn như iOS, Windows hoặc macOS.
### 3. From user input to the GPU (quá trình input từ user cho đến GPU)
Nguyên tắc overriding mà Flutter áp dụng cho quá trình rendering là simple is fast (đơn giản nhanh chóng). Flutter có một đường dẫn đơn giản về cách dữ liệu truyền đến hệ thống, như được hiển thị trong sơ đồ trình tự sau:

![](https://images.viblo.asia/8041b847-3a9b-4ca1-9831-897d01a48be0.png)

Quá trình này sẽ có 7 bước đơn giản như trên, nôm na ta có thể hiểu:
- user input: phản hồi với các hành vi của user khi họ gõ bàn phím, chạm vào màn hình, ...
- animation: giao diện người dùng được kích hoạt bởi dấu tích của một timer, timer như kiểu là một thắng nắm giữ thời gian có giới hạn
- build: mã code của ứng dụng tạo các widget trên màn hình.
- layout: sau khi build xong thì định vị và kích thước của các element trên màn hình.
- paint: sau đó chuyển đổi các elements thành một hình ảnh rõ ràng, visual
- composition: sắp xếp các visual elements theo thứ tự được vẻ, ở đây là theo chồng.
- rasterize: biến đổi output thành các GPU render instructions, bạn có thể hiểu là thành dữ liệu đầu vào cho GPU

Chúng ta hay xem xết một số phases một cách chi tiết hơn, đó là build, layout, ... :
### 4. Build: from Widget to Element
Hãy xem xét một đoạn code dưới đây thể hiện một thế thống phân cấp (hierarchy) widget đơn giản.
```Dart
Container(
  color: Colors.blue,
  child: Row(
    children: [
      Image.network('https://www.example.com/1.png'),
      Text('Trump'),
    ],
  ),
);
```
Khi Flutter cần render phân đoạn này, nó sẽ gọi phương thức build (), phương thức này trả về một subtree của widget - hiển thị giao diện người dùng dựa trên trạng thái ứng dụng hiện tại. Trong quá trình này, phương thức build () có thể giới thiệu các widget mới, nếu cần, dựa trên trạng thái của nó. Ví dụ như đoạn code trên, Container có color và các child properties. 

Đối với đoạn code trên, ta lick vào để xem mã nguồn của color, tìm sẽ có đoạn này:
```Dart
if (color != null)
      current = ColoredBox(color: color!, child: current);
```
Khi mà color khác null, Container sẽ chèn một ColoredBox đại diện cho color.

Tương tự, các widget Image và Text cũng có thể chèn các widget con như RawImage và RichText trong quá trình build. Do đó widget cuối cùng trong hệ thống kế thừa có thể sâu hơn những gì mà mã code thể hiện, như hình minh hoạ này:
![](https://images.viblo.asia/c94b01b0-45ae-43a1-b9aa-91613a5a7fb6.png)
(Bạn có thể kiểm tra tree qua một công cụ debug chẳng hạn như Flutter inspector, một phần của Dart DevTools. Bạn có thể thấy một cấu trúc sâu hơn đáng kể so với những gì trong code mà ta viết)

Trong suốt pha build, Flutter dịch các widget được thể hiện bằng code thành một element tree tương ứng, vỡi mỗi element cho mỗi widget. Mỗi element đại diện cho một phiên bản cụ thể của widget ở một vị trí nhất định của hệ thống tree hierachy. Có 2 loại elements cơ bản:
- **ComponentElement**, là một element gốc, host cho các elements khác
- **RenderObjectElement**, một element tham gia vào các pha như layout (bố trí) hoặc paint (vẽ)

![](https://images.viblo.asia/f21bd1bd-0705-47a5-842e-8f41fc43319f.png)
**RenderObjectElement** là trung gian giữa **Widget** và **RenderObject**, RenderObject là cái chúng ta sẽ đề cập sau.

Element của bất kỳ một Widget nào cũng có thể được tham chiếu thông qua BuildContext của nó, là phần tử điểu khiển vị trí của widget trong tree. Đây là một context trong một lời gọi như Theme.of(context) và được cung cấp cho phương thức build() dưới dạng một tham số.

Vì các widget là bất biến, bao gồm cả các mối quan hệ cha-con giữ các nút, nên có bất kỳ thay đổi nào đối với widget tree (chẳng hạn như thay đổi Văn bản ('Trump) thành Văn bản ('Joe Biden') trong ví dụ trước) sẽ khiến một tập hợp các đối tượng widget mới được trả về. Nhưng điều đó không có nghĩa là các phần đại diện cơ bạn phải được xây dựng lại. Các elements bền vững từ frame này sang frame khác và do đó đóng một vai trò hiệu suất quan trọng, cho phép Flutter hoạt động như thể widget hierchy hoàn toàn có thể sử dụng một lần trong khi lưu vào bộ nhớ đệm cơ bản của nó. Bằng cách chỉ xem qua các widget đã thay đổi, Flutter có thể chỉ xây dựng lại các phần elements - cái mà yêu cầu cấu hình lại. 
### 5. Layout and rendering
Hầu như sẽ không có một ứng dụng nào chỉ vẽ một widget duy nhất. Do đó một phần quan trọng của bất kỳ một UI framework nào là khả năng bố trí một cách hiệu quả hệ thống hierchy widgets, xác định kích thước và vị trị của từng element trước khi chugns được hiện thị trên màn hình. 

Lớp cơ sở cho mọi nút trong render tree là **RenderObject**, đối tượng định nghĩa một mô hình trừu tượng cho bố cục và tô vẽ (layout and painting). Điều này cực kỳ chung chung: nó không cam kết với một số kích thước cố định hoặc thậm chí một hệ toạ độ Descartes. Mỗi RenderObject biết cha mẹ của nó nhưng biết rất ít về con cái của nó ngoài cách "thăm" chúng và những ràng buộc của chúng. Điểu này cung cấp cho RenderObject đủ trừu tượng để có thể xử lý nhiều trường hợp sử dụng khác nhau.

Trong pha build, Flutter tạo hoặc cập nhật một đối tượng kế thừa từ **RenderObject** cho mỗi **RenderObjectElement** trong element tree.  RenderObject là nguyên thuỷ: **RenderParagraph** render text, **RenderImage** renders image, và **RenderTransform** áp dụng một phép biến đổi trước khi vẽ con của nó.
![](https://images.viblo.asia/5dd88f20-7b1e-453d-b338-77247f55bbf4.png)

Hầu hết các widget trong Flutter được hiển thị bởi một đối tượng kế thừa từ lớp con **RenderBox**, đại diện cho một RenderObject có kích thước cố định trong không gian Descartes 2D. RenderBox cung cấp cơ sở của một box constraint model, thiết lập chiều rộng và chiều cao tối thiểu và tối đa cho mỗi widget sẽ được hiện thị. 

Để thực hiện bố cục, Flutter sẽ đi qua render tree theo chiều dọc theo chiều sâu và passes down size constraints từ cấp độ gốc sang cấp độ con. Khi con xác định được kích thước của nó, nó phải tôn trọng những ràng buộc mà cha đã đưa ra. Những đứa con phản hồi bằng cách chuyển một kích thước (passing up a size) cho đối tượng cha trong các ràng buộc đã thiết lập
![](https://images.viblo.asia/e3f116c8-ba47-47dc-b057-21b08f3b2b40.png)
Vào cuối quá trình đi xuyên qua mọi ngóc ngách của cái cây này, mọi đối tượng đều có kích thước xác định trong các ràng buộc của đối tượng cha và sẵn sàng được vẽ bằng cách gọi phương thức paint().

Mô hình box constraint rất mạnh mẽ, như một cách để bố trí các đối tượng trong thời gian O(n):
- Cha có thể chỉ định kích thước của một đối tượng con bằng cách đặt các ràng buộc tối đa và tối thiểu cho cùng một giá trị. Ví dụ: đối tượng hiển thị trên cùng trong ứng dụng điện thoại giới hạn kích thước con của nó là kích thước của màn hình. (Các thành phần con có thể chọn cách sử dụng không gian đó. Ví dụ, chúng có thể chỉ căn giữa những gì chúng muốn hiển thị trong các ràng buộc đã định sẵn.)
- Cha có thể quy định chiều rộng của con nhưng con linh hoạt theo chiều cao (hoặc quy định chiều cao nhưng linh hoạt theo chiều rộng). Một ví dụ trong thế giới thực là khi bạn viết 1 dòng văn bản, có thể phải phù hợp với một ràng buộc cố định theo chiều ngang nhưng thay đổi theo chiều dọc lại tùy thuộc vào số lượng văn bản.

Mô hình này hoạt động ngay cả khi một đối tượng con cần biết nó có bao nhiêu dung lượng để quyết định nó sẽ hiển thị nội dung của nó như thế nào. Bằng cách sử dụng LayoutBuilder widget, đối tượng con có thể kiểm tra các ràng buộc được truyền xuống và sử dụng các ràng buộc đó để xác định cách nó sẽ sử dụng chúng, ví dụ:
```Dart
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      if (constraints.maxWidth < 600) {
        return OneColumnLayout();
      } else {
        return TwoColumnLayout();
      }
    },
  );
}
```
### 6. Tổng kết.
Qua bài viết này thì mình đã chia sẻ cách cơ bản cơ chế mà Flutter rendering và layout để xây dựng UI như thế nào. Cảm ơn bạn đã theo dõi bài viết. Hẹn gắp lại :)

Tham khảo: https://flutter.dev/