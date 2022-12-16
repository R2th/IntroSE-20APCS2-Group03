Bài viết được dịch từ nguồn: https://hackernoon.com/introduction-to-reactgrid-and-its-unique-features-cx363z6a

![](https://images.viblo.asia/e9500fce-cfe1-49c9-928d-676cca7f1257.png)

ReactGrid là một React component cho phép bạn thêm action giống như bảng tính vào ứng dụng của mình. Nó được tạo ra để đáp ứng một nhóm hẹp
mà các sản phẩm khác không phải là giải pháp thích hợp.

Có các bảng dữ liệu như Handsontable hoặc ag-Grid. Các bản ghi này hiển thị từng hàng một và cung cấp các phương pháp lọc, sắp xếp và nhóm khác nhau. Trong 90% trường hợp, chức năng này hoàn toàn
vừa đủ.

Sau đó, có các thành phần web bảng tính như KendoUI hoặc dhtmlx hiển thị các trang tính Excel thông thường trong trình duyệt. Họ có thể giải thích các công thức và cung cấp các tính năng chỉnh sửa phong phú cho
người dùng.

ReactGrid  không giới hạn ở mô hình dựa trên bản ghi mà mỗi hàng phải có cùng lược đồ. Component này cho phép bạn tạo các bảng có hình dạng bất kỳ trông giống như trang tính Excel. Ngoài ra, nó tích hợp tốt với
mô hình xử lý dữ liệu do React cung cấp.

## When do you need ReactGrid in your app?

ReactGrid được tạo ra để giải quyết các vấn đề mà chúng tôi, những nhà phát triển web, không hài lòng với các giải pháp bảng tính hoặc lưới dữ liệu hiện có. Bạn phải muốn trình bày dữ liệu của mình theo một cách khác thường hơn
hơn một lần, ví dụ:

- Tạo một trường chỉ tổng hợp các giá trị từ những địa điểm đã chọn
- Tạo ra sự kết hợp giữa action và reaction
- Hiển thị dữ liệu phi cấu trúc, ví dụ: MongoDB
- Sắp xếp hoặc nhóm dữ liệu có cấu trúc khác thường với nhau
- Thao tác với các thay đổi dữ liệu theo cách do bạn hoàn toàn kiểm soát
- Chuyển giải pháp được triển khai trong bảng tính sang một ứng dụng đóng

![](https://images.viblo.asia/c6332a00-5c70-4c47-ace0-215619ec79af.png)

## Reactivity with arbitrary cell placement

Để cho thấy sự khác biệt, chúng tôi đã tạo một biểu đồ đơn giản.

- vertical - react - một khái niệm được lấy trực tiếp từ thư viện React.js. Trong hầu hết các trường hợp, bạn nên làm theo mẫu.

- hàng ngang - vị trí ô tùy ý, mỗi hàng có cùng một schema. Component cho phép bạn đặt bất kỳ ô nào ở bất kỳ đâu. Chúng tôi đã tập trung vào một cell schema được kiểm soát bởi cell template engines. Templating là một tính năng mạnh mẽ cho phép bạn xác định hành vi của ô dựa trên state hiện tại và state tương lai của nó.

![](https://images.viblo.asia/2a32787b-f051-4f31-88db-a6665107a8ac.png)

Khác với ag-Grid, Handsontable, cần phải xử lý các sự kiện thông qua self-callback. Việc implement một sự kiện thay đổi ô cơ bản phụ thuộc vào việc implement của bạn. 

Nội dung của ReactGrid chỉ được hiển thị trong trường hợp khi dữ liệu hiển thị có các điều kiện đã thay đổi hoặc bổ sung, chẳng hạn như số lượng hàng cố định đã thay đổi và các cột đã xuất hiện.

Các ví dụ khác có thể bao gồm xử lý cuộn (liên tục theo phạm vi hiển thị để cuộn ảo), lấy nét ô, xử lý các hành động của người dùng như sao chép và dán dữ liệu. ReactGrid hoạt động hoàn hảo ngay cả khi bạn hiển thị một lượng lớn ô - 10 000, 20 000, 100 000 không phải là vấn đề lớn.

![](https://images.viblo.asia/fbbc3162-3497-490a-b375-e1c6107a4519.png)

Các component chứa ReactGrid (AppComponent) có dữ liệu của nó, trong đó chế độ grid view sẽ được tạo.

Render view đã sẵn sàng để xử lý các sự kiện đến từ người dùng, ví dụ: các thay đổi trong trình chỉnh sửa ô. Tuy nhiên, component vẫn hoạt động ở chế độ readonly vì cần cập nhật dữ liệu để thay đổi các nội dung. Ví dụ, chúng ta có thể làm điều này bằng cách triển khai
Hàm onCellsChanged (ví dụ đến từ các tài liệu ReactGrid).

## Touch devices friendly

ReactGrid hoạt động hoàn hảo với các trình duyệt web hiện đại. Tương tự đối với device cùng với màn hình cảm ứng. Với ReactGrid, một component giống bảng tính thân thiện với thiết bị di động, bạn có thể sử dụng ứng dụng của mình và trải nghiệm năng suất tương tự như trên desktop.

## ReactGrid is NOT…

Bạn có thể thắc mắc tại sao sản phẩm của chúng tôi “không có” nhiều các chức năng, chẳng hạn như nhóm, sắp xếp, lọc?

Vấn đề về công thức, thanh công cụ và tọa độ? ReactGrid là một component trong đó chúng tôi chỉ thực hiện các action được biết đến từ các bảng tính điển hình. Mục đích của chúng tôi không phải là tạo ra Excel tiếp theo, mà là tạo bất cứ thứ gì bạn thích xung quanh nó bằng cách sử dụng API.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.