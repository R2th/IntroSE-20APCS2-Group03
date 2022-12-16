![](https://images.viblo.asia/d5f37f52-7d7d-4441-ac3c-13b09fe28311.jpg)

Hầu hết tất cả các ứng dụng đều có chức năng tìm kiếm cho phép người dùng tương tác với nội dung trang web. Số lượng kịch bản để kiểm tra form tìm kiếm là không giới hạn. Vì vậy bạn cần cân nhắc nhiều yếu tố khi thực hiện kiểm thử. 7 điều dưới đây có thể được coi là điểm chính cho kiểm thử chức năng tìm kiếm của trang web.

#### 1. Đầu tiên là chuẩn bị tài liệu trước khi thử nghiệm chức năng tìm kiếm
![](https://images.viblo.asia/b3e090d8-f2fa-4a0d-b4de-b83f429f4889.jpg)
*  Tạo tài liệu lưu trữ tất cả dữ liệu sẽ được nhập vào ô tìm kiếm.
*  Xác định các lớp tương đương và giá trị biên.
* Làm rõ yêu cầu của chức năng tìm kiếm: tìm kiếm tài liệu, tìm kiếm từ trong tài liệu, tìm kiếm hình ảnh...
* Kết quả tìm kiếm hiển thị kích thước hình ảnh hay tài liệu?
* Bất kỳ tính năng tìm kiếm nâng cao nào như lựa chọn loại tài liệu hoặc hình ảnh để tinh chỉnh tìm kiếm có sẵn?
* Một tập hợp các đầu vào thông dụng, được trình bày dưới đây:
    * A-Z
    * a-z
    * 0-9
    * { [ ( ~ ! @ # $ % ^ & * ` | \ : " ; ' < > ? , . ⁄ * - + ) ] }
    * Blank spaces
    * XSS, SQL, JavaScript, HTML injections.

Tìm kiếm trang web trong cửa hàng trực tuyến - là một trong những chức năng chính, vì vậy đây là một ví dụ về các trường hợp cần được kiểm tra.

#### 2. Thiết kế
*  Khối tìm kiếm - hiển thị trên trang và có sẵn mà không cần cuộn lên, ngay cả trên máy tính xách tay với màn hình có độ phân giải thấp.
*  Khối tìm kiếm tương tự như các khối tìm kiếm quen thuộc trong các công cụ tìm kiếm Google, Yahoo, Bing vv
* Khối tìm kiếm có trên tất cả các trang (tùy theo đặc tả).
* Khối tìm kiếm bao gồm:
    * Mẫu để nhập truy vấn tìm kiếm
    * Nhập văn bản vào trường nhập
    * Nút "Tìm kiếm"
    * Khối lựa chọn khu vực tìm kiếm
    * Ví dụ về truy vấn tìm kiếm
* Kích thước của trường tìm kiếm đầu vào cho phép nhập văn bản dài (khoảng bao nhiêu từ).

#### 3. Chức năng
*  Sự hiện diện của lựa chọn khu vực tìm kiếm - Danh mục sản phẩm, bài viết và đánh giá.

*  Các văn bản trong hộp văn bản thông báo về các mặt hàng tìm thấy và số lượng hàng hoá.

*  Văn bản trong trường nhập sẽ biến mất khi bạn nhập ký tự đầu tiên và xuất hiện lại, nếu trường nhập vào trống.

* Có thể thay đổi cụm từ tìm kiếm.

* Từ gợi ý tìm kiếm thay đổi tùy theo lựa chọn của khu vực tìm kiếm.

* Lỗi trong layout bàn phím được chuyển đổi khi bạn gõ.

* Tự động hoàn thành tìm kiếm phải xuất hiện sau khi nhập 2-3 ký tự đầu tiên và cung cấp tìm kiếm dựa trên các từ điển từ khóa và Thống kê các yêu cầu tìm kiếm.

* Truy vấn tự động hoàn thành được cung cấp được xếp hạng theo tần suất và mức độ cạnh tranh của hàng hóa.

* Tìm kiếm dự đoán chứa một số kết quả tìm kiếm.

#### 4. Kết quả tìm kiếm - Thiết kế
![](https://images.viblo.asia/d0ccc908-7383-4569-b29e-fe0a45f5b155.jpg)

* Kết quả tìm kiếm hiển thị rõ ràng và không lộn xộn với quảng cáo kèm theo.

*  Kết quả tìm kiếm có cấu trúc khối và chứa:

    * Đơn vị của đặc tả yêu cầu (phương pháp tìm kiếm, vùng tìm kiếm, từ đồng nghĩa)
    * Khối kết quả tìm kiếm ngắn (cách thức và địa điểm được tìm thấy) trong một hoặc hai dòng
    * Định dạng của đơn vị đầu ra (tiêu đề / danh sách / giá cả) và phân loại (tiêu chuẩn / giá / theo nhãn hiệu / theo thứ tự bảng chữ cái)
    * Khối các danh mục / mục được tìm thấy có tiêu đề
    * Khối các đề xuất ("những người đang tìm kiếm nó cũng đang tìm kiếm ... sau đó đã mua ...", "những người đang tìm kiếm ... và xem ...")
    * Khối  "Bảng thuật ngữ" giúp hiểu mô tả hàng hóa và quyết định mua
  
  #### 5. Kết quả tìm kiếm - chức năng
* Lỗi trong bố cục bàn phím được điều chỉnh "khi đang di chuyển" và kết quả được hiển thị cho truy vấn tìm kiếm chính xác.

* Kết quả tìm kiếm phải chứa số lượng kết quả tìm kiếm được tìm thấy.

* Kết quả tìm kiếm cung cấp số lượng kết quả tìm kiếm được tìm thấy trong nhóm các khu vực tìm kiếm: danh mục sản phẩm, thương hiệu, v.v., trong đó mỗi kết quả là một URL.

* Kết quả tìm kiếm có mô tả ngắn, giá cả, hình ảnh hàng hóa và nút "Mua".

* Phím tắt. Nếu hàng hóa đã được chỉ định trong cài đặt của admin như là "Hàng mới (New)", "Hàng giảm giá (Sale)" v.v., chúng cũng phải được hiển thị mọi trường hợp.

* Kết quả tìm kiếm bao gồm các công cụ sàng lọc tìm kiếm ở định dạng tìm kiếm nâng cao. Ví dụ (mở trong một cửa sổ mới).

* Một cái tìm kiếm nâng cao được gọi là: "Hiển thị tùy chọn tìm kiếm" cho phép bạn mở rộng / thu gọn các công cụ sàng lọc tìm kiếm.

* URL kết quả tìm kiếm sẽ được thay đổi động sau khi thực hiện các bộ lọc mới.

* Các trang kết quả tìm kiếm và bộ lọc bị đóng bởi các công cụ tìm kiếm.

* Kết quả tìm kiếm phải chứa một khối truy vấn tìm kiếm đã nhập trước đó.

#### 6. Kết quả tìm kiếm phủ định - chức năng
* Có một hình thức phản hồi khi không có kết quả tìm kiếm nào.

* Các biến thể của điều chỉnh yêu cầu được cung cấp.

* Các tùy chọn có sẵn cho tìm kiếm thay thế - thư mục, danh sách theo thứ tự chữ cái của các danh mục, thương hiệu, thuật ngữ.

* Các đề xuất được cá nhân hóa dựa trên các yêu cầu trước đó và khu vực tìm kiếm khách quan được cung cấp.

![](https://images.viblo.asia/05083b5b-3e63-4e8f-8799-fc00c8944412.jpg)

#### 7. Chuẩn bị kết quả tìm kiếm (Tóm tắt) và chú ý đến các chi tiết bổ sung
* Đừng bỏ qua kết quả chỉ vì chúng đã xuất hiện.

* Kiểm tra số lượng kết quả trên mỗi trang.

* Kết quả tìm kiếm sẽ được hiển thị theo bất kỳ tiêu chí cụ thể nào, ví dụ: mức độ phổ biến, được xem nhiều nhất, bảng chữ cái ... hoặc bất kỳ tiêu chí nào khác được nói đến trong các yêu cầu.

* Các thư tương ứng sẽ được hiển thị khi không có kết quả tìm kiếm.

* Thời gian phản hồi tìm kiếm.

* Kiểm tra tìm kiếm người dùng đã đăng nhập và khách.

Chúng tôi hy vọng bài viết này hữu ích cho bạn. Bạn hãy thêm bất kỳ trường hợp bổ sung nào mà bạn cảm thấy có thể nâng cao danh sách này.

***Bài viết được tham khảo và dịch từ nguồn: https://www.deviqa.com/blog/7-things-to-test-in-your-search-form***