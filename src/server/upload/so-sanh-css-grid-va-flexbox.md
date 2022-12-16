## Tổng quan
Hiện nay, tất cả mọi thứ chúng ta thấy trên internet được chứa đựng trong các trang web (website). Những trang web đều chứa một nội dung nhất định về một lĩnh vực nào đó trong cuộc sống và chúng ta cần một bố cục trình bày phù hợp cho trang web của mình. Ngày nay, công nghệ ngày càng phát triển cho phép chúng ta duyệt web trên bất kỳ thiết bị, bất kỳ kích thước màn hình từ lớn tới nhỏ và nội dung trang web phải hiển thị đáp ứng trên từng thiết bị, kích thước màn hình. Từ đó khái niệm responsive website đã ra đời.

CSS luôn được sử dụng để thiết kế bố cục và giao diện của các trang web, nhưng việc tạo ra các bố cục gồm nhiều cột phức tạp là điều khó khăn để làm việc ổn định và chính xác trên các trình duyệt. Trước đây, chúng ta thường sử dụng tables, float, position và inline-block để dựng bố cục cho trang web có bố cục đơn giản. Để giải quyết các vấn đề phức tạp về bố cục, chúng ta thường sử dụng các thuộc tính bố cục đáp ứng thích hợp có sẵn trong trình duyệt như Flexbox, CSS Grid và Bootstrap trở nên phổ biến nhất và được hỗ trợ rộng rãi trên tất cả các nền tảng và trình duyệt.

Trong bài viết này, chúng ta cùng nhau tìm hiểu các khái niệm cơ bản của Flexbox và CSS Grid, khi nào nên chọn cái nào cho phù hợp để dựng layout website. Qua đó chúng ta sẽ thấy được cái nhìn tổng quan về 2 thuộc tính này. 

## CSS Flexbox
Flexbox (hộp linh hoạt) là một phương pháp trình bày để bố trí, sắp xếp và phân bổ không gian giữa các mục trong một thùng chứa(container) ngay cả khi kích thước của chúng không xác định hoặc kích thước động. 

![](https://images.viblo.asia/5cec81cf-5249-4078-9f3c-ca4d6c88b5e4.png)

Ý tưởng chính của Flexbox là cung cấp cho thùng chứa (container) khả năng thay đổi các phần tử bên trong nó về mặt chiều rộng, chiều cao, thứ tự hiển thị của nó để lấp đầy không gian có sẵn. ( Phù hợp với tất cả các loại thiết bị hiển thị và kích thước màn hình ).

Một flex container chứa các phần tử bên trong nó có khả năng lấp đầy khoảng trống có sẵn hoặc thu nhỏ chúng để ngăn tràn (overflow). Nó cung cấp sự sắp xếp tốt hơn của các phần tử trên trang. Đây là mô hình dựng layout một chiều, cung cấp sự phân bố không gian giữa các mục trong giao diện và khả năng căn chỉnh mạnh mẽ. 

## CSS Grid
CSS Grid là một phương pháp bố trí CSS được phát triển dưới dạng bố cục hai chiều của các mục trên trang web hoặc ứng dụng, có nghĩa là nó có thể quản lý cả cột và hàng.

CSS Grid vượt trội hơn trong việc chia một trang thành nhiều phần hoặc xác định mối tương quan về kích thước, vị trí và lớp.

![](https://images.viblo.asia/183c34b6-8210-4bb8-9b5b-445392ee4bd3.png)

Giống tables, CSS Grid cho phép chúng ta sắp xếp các thành phần theo cột và hàng. Tuy nhiên, nhiều bố cục có thể đạt được hoặc dễ dàng hơn với CSS Grid so với bảng. Ví dụ, một phần tử nằm trong container của CSS Grid có thể tự đặt chúng sao cho chúng thực sự chồng chéo và lớp, giống như thuộc tính position trong CSS.

## So sánh CSS Grid và Flexbox

**1.** CSS Grid là hệ thống dựng layout 2 chiều, có nghĩa là chúng ta có thể xử lý theo cột và hàng, không giống như Flexbox là hệ thống layout 1 chiều. ( xử lý theo 1 cột hoặc 1 hàng ).

**2.** Điểm khác biệt cốt lõi giữa CSS Grid và Flexbox đó là: CSS Grid tiếp cận theo hướng nội dung còn Flexbox tiếp cận theo hướng bố cục (layout). Nếu bạn biết được rõ trước nội dung mình cần trình bày hãy dùng CSS Grid ngược lại thì chọn CSS Flexbox. 

**3.** Flexbox phù hợp với các website có layout đơn giản, CSS Grid phù hợp với website có layout phức tạp hơn.

**4.** Nếu bạn chỉ cần dựng layout theo 1 hàng hoặc 1 cột thì Flexbox sẽ phù hợp hơn. Ngược lại, nếu bạn muốn xác định lưới và điều chỉnh nội dung theo 2 chiều - CSS Grid sẽ là lựa chọn của bạn. 

![](https://images.viblo.asia/b4acefbc-0048-42bd-9c34-b58e8607b5c7.jpeg)

## Hỗ trợ trình duyệt

Hầu hết các trình duyệt web hiện đại hiện nay đều hỗ trợ cả CSS Grid và Flexbox. Các hình ảnh bên dưới hiển thị phân tích chi tiết về hỗ trợ trình duyệt cho Grid & Flexbox.

![](https://images.viblo.asia/4617912e-047e-4d77-b745-7342c80b0799.png)

![](https://images.viblo.asia/8fb51920-4aa4-44e2-a183-745052091ece.png)

**Tài liệu tham khảo:** https://medium.com/youstart-labs/beginners-guide-to-choose-between-css-grid-and-flexbox-783005dd2412