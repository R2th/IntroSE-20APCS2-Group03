![](https://images.viblo.asia/d65be3dc-a1c5-4f82-99ad-474b539c49d5.jpg)
Đây là bài dịch, bài gốc mời các bạn xem ở đây: https://tutorialzine.com/2015/03/15-must-know-chrome-devtools-tips-tricks


-----


Google Chrome là trình duyệt web phổ biến nhất được các nhà phát triển web sử dụng ngày nay. Hầu hết các bạn đã quen thuộc với nhiều tính năng như chỉnh sửa CSS, debug javascript... Trong bài viết này, tôi sẽ chia sẻ với bạn 15 mẹo thú vị giúp bạn tận dụng tối đa Google Chrome.
<h2>1.<strong> Chuyển đổi nhanh các file</strong></h2>
Nếu bạn từng dùng Sublime Text, chắc hẳn tính năng được dùng nhiều nhất là: "Go to anything". Và thật tuyệt là DevTools cũng có. Nhấn Ctrl + P (Cmd + P trên Mac) khi DevTools được mở, để tìm kiếm nhanh và mở bất kỳ tệp nào trong dự án của bạn.

![](https://tutorialzine.com/media/2015/03/1.gif)

<h2>2. Tìm kiếm trong source code</h2>
Nhưng còn nếu bạn muốn tìm kiếm trong source code? Để tìm kiếm trong tất cả các file được tải trên trang, nhấn Ctrl + Shift + F (Cmd + Opt + F). Phương pháp tìm kiếm này cũng hỗ trợ cả Regular expressions.

![](https://tutorialzine.com/media/2015/03/2.SearchAll.gif)

<h2>3. Chuyển đến dòng cụ thể</h2>
Sau khi bạn mở một file trong tab Sources, DevTools cho phép bạn dễ dàng chuyển đến bất kỳ dòng nào trong đó bằng cách nhấn Ctrl + G cho Windows và Linux, (hoặc Cmd + L dành cho Mac) và nhập số dòng của bạn.

![](https://tutorialzine.com/media/2015/03/3.JumpToLine.gif)
Một cách khác nữa là nhấn Ctrl + O và gõ ":" với số dòng bạn mong muốn.
<h2>4. Chọn phần tử trong Console</h2>
DevTools Console hỗ trợ một số  biến và hàm để chọn các phần tử DOM như sau:
<ul>
	<li>$() - viết ngắn gọn của cho <strong>document.querySelector(). </strong>Trả về phần từ đầu tiên tương ứng với CSS selector.</li>
	<li>$$() - viết ngắn gọn của <strong>document.querySelectorAll()</strong>. Trả về mảng các phần tử tương ứng với CSS selector.</li>
	<li>$0 - $4 - Danh sách 5 phần tử DOM mà bạn đã chọngần đây, $0 là phần tử gần nhất.</li>
</ul>

![](https://tutorialzine.com/media/2015/03/4..gif)


Đọc thêm về Console ở đây: <a href="https://developer.chrome.com/devtools/docs/commandline-api" target="_blank" rel="noreferrer noopener">Command Line API</a>
<h2><strong>5. Sử dụng multiple carets & selections</strong></h2>
Một tính năng Sublime Text khác cũng xuất hiện. Trong khi chỉnh sửa một tập tin, bạn có thể thiết lập nhiều dấu bằng cách giữ Ctrl (Cmd cho Mac) và bấm vào nơi bạn muốn chúng, do đó cho phép bạn viết ở nhiều nơi cùng một lúc.

![](https://tutorialzine.com/media/2015/03/5.MultipleSelectClick.gif)
<h2><strong>6. Lưu trữ Log</strong></h2>
Bằng cách chọn tùy chọn Preserve Log trong console, bạn có thể làm cho console DevTools tiếp tục lưu logs thay vì xóa nó sau mỗi lần tải trang. Điều này rất tiện lợi khi bạn muốn điều tra các lỗi hiển thị ngay trước khi trang được tải xong.

![](https://tutorialzine.com/media/2015/03/6.PreserveLog.gif)

<h2><strong>7. Hiển thị với format đẹp hơn</strong></h2>
Chrome's Developer Tools có trình làm đẹp code được tích hợp sẵn sẽ giúp bạn trả lại code đã minify theo định dạng có thể đọc được. Nút Pretty Print nằm ở dưới cùng bên trái của file hiện đang được mở trong tab Sources.

![](https://tutorialzine.com/media/2015/03/7.PrettyPrint.gif)

<h2><strong>8. Chế độ các thiệt bị</strong></h2>
DevTools bao gồm một chế độ mạnh mẽ để phát triển các trang thân thiện với thiết bị di động. Video này từ Google trải qua hầu hết các tính năng chính của nó như thay đổi kích thước màn hình, mô phỏng cảm ứng và trình mô phỏng kết nối mạng kém.

<a href="https://www.youtube.com/watch?v=FrAZWiMWRa4" target="_blank" rel="noreferrer noopener">https://www.youtube.com/watch?v=FrAZWiMWRa4</a>
<h2><strong>9. Cảm biến mô phỏng thiết bị</strong></h2>
Một tính năng thú vị khác của Device mode là tùy chọn để mô phỏng các cảm biến của thiết bị di động như màn hình cảm ứng và gia tốc kế. Bạn thậm chí có thể giả mạo vị trí địa lý của mình. Các bạn có thể trải nghiệm bằng cách vào tab <strong>Sensors</strong> từ phần More tools.

![](https://tutorialzine.com/media/2015/03/9.Sensors.gif)

<h2><strong>10. Lựa chọn màu sắc</strong></h2>
Khi chọn màu trong trình chỉnh sửa Styles, bạn có thể nhấp vào bản xem trước màu và bộ chọn sẽ mở lên. Khi bộ chọn màu được mở, nếu bạn di chuột qua trang của mình, con trỏ chuột của bạn sẽ biến thành kính lúp để chọn màu có độ chính xác pixel.

![](https://tutorialzine.com/media/2015/03/10.ColorPicker.gif)

<h2><strong>11. Chọn trạng thái phần tử</strong></h2>
DevTools có một tính năng mô phỏng các trạng thái CSS như <code>:hover</code> and <code>:focus</code> trên phần tử giúp chúng ta dễ dàng viết css cho chúng.

![](https://tutorialzine.com/media/2015/03/11.SimulateHover.gif)

<h2><strong>12. Visualize the shadow DOM</strong></h2>

Trình duyệt web xây dựng những thứ như textboxes, buttons và inputs từ các yếu tố cơ bản khác thường bị ẩn khỏi chế độ xem. Tuy nhiên, bạn có thể chuyển đến Settings -> General and toggle <strong> Show user agent shadow DOM </strong>, sẽ hiển thị chúng trong tab elements. Bạn thậm chí có thể viết kiểu riêng cho chúng, mang lại cho bạn nhiều quyền kiểm soát hơn.

![](https://tutorialzine.com/media/2015/03/12.ShadowDOM.gif)

<h2>13. Chọn phần tử giống nhau</h2>
Nếu bạn nhấn Ctrl + D (Cmd + D) trong khi chỉnh sửa các tệp trong tab sources, lần xuất hiện tiếp theo của từ hiện tại cũng sẽ được chọn, giúp bạn chỉnh sửa chúng đồng thời.

![](https://tutorialzine.com/media/2015/03/13.MultiSelect.gif)

<h2>14. Thay đổi format màu</h2>
Sử dụng Shift + Click trên phần xem trước màu để chuyển từ qua lại giữa rgba hsl và hexadecimal format.

![](https://tutorialzine.com/media/2015/03/14.ColorFormat.gif)


<h2>15. Chỉnh sửa local files qua workspace</h2>
Workspaces là một tính năng mạnh mẽ của Chrome DevTools, biến nó thành một IDE thực sự. Workspaces khớp các tệp trong tab sources với tệp dự án local của bạn, vì vậy bây giờ bạn có thể chỉnh sửa và lưu trực tiếp mà không phải copy/paste các thay đổi của mình vào editor nữa.


Đọc thêm về Workspaces ở: <a href="https://developer.chrome.com/devtools/docs/workspaces" target="_blank" rel="noreferrer noopener">đây</a>.