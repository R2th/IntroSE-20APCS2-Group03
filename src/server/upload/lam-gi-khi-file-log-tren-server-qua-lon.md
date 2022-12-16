Bạn có một vấn đề. Nhưng đó không chỉ là một vấn đề thôg thường. Bạn có một trong những loại vấn đề khó chịu nhất trong thế giới kỹ thuật. Theo cách nói đơn giản nhất, bạn đang cố mở một file log quá lớn. Nhưng nó mãi không chịu mở ra.

Bạn cần tìm thứ gì đó từ file log và bạn phải đợi, chờ đợi và chờ đợi.

Sau một khoảng thời gian, text editor của bạn crash. Bạn hi vọng nó chỉ là đen thôi, đỏ quên đi. Thế là bạn lại thử lại, đợi 15 phút tiếp theo trước khi nó crash. Vậy là bạn đã lãng phí 30 phút cuộc đời chỉ để tìm cách mở một file log. Và bạn sẽ còn tốn nhiều thời gian nữa nếu bạn không thể giải quyết triệt để được gốc rễ của vấn đề - bạn vẫn chưa làm một trong những công việc đơn giản nhất mà bạn có thể tưởng tượng ra để giải quyết vấn đề trên.

Chúng ta hãy tìm hiểu xem làm thế nào có thể xử lý vấn đề trên, bắt đầu với hướng giải quyết nhanh nhất, đơn giản nhất.

## Hãy thử với nhiều loại Tool khác nhau

Nếu bạn mở file log và bị crash trên một editor, bạn có thể thử Notepad, một editor phổ biến và nhẹ. Ngoài ra bạn có thể sử dụng các editor khác đã được cài đặt sẵn trong từng hệ điều hành:

- Với Windows, bạn có thể sử dụng WordPad. Nếu bạn có đủ memory để tải được kích thước của file mà bạn muốn xem/sửa, WordPad sẽ xử lý được. 
- Với Mac, hãy dùng Vim. Nó cũng có đủ khả năng để mở file lớn nếu bạn có đủ Memory. Ngoài ra, nó còn hỗ trợ tính năng search rất tốt.
- Đối với Linux thì có nhiều lựa chọn khác nữa, nhưng bạn cũng có thể dùng Vim. Nếu không, bạn có thể sử dụng tail -X với X là số dòng mà bạn muốn xem.

Ít nhất thì những tool trên đã phần nào giải quyết được vấn đề của bạn. Và bạn có thể xem được file mà không phải đợi đến khi nó có thể hoặc không crash.

## Download và sử dụng một Text Editor cho việc này

Nếu bạn có nhiều sự kiên nhẫn hơn, bạn có thể ngồi tự vấn lại rằng việc mở fie log này là tình huống chỉ xảy ra một lần hay nó là việc bạn sẽ thường xuyên phải làm trong thời gian sắp tới. Nếu là mệnh đề phía sau, bạn sẽ muốn chủ động hơn với các tool trong toolbox của mình. Và tôi cũng sẽ gợi ý bạn làm điều này kể cả khi bạn gặp tình huống này chỉ một lần. Việc làm quen với một powerful text editor mới không có hại gì cho bạn cả.

Số lượng các ứng viên cho text editor quá nhiều để liệt kê ra ở đây. Nhưng [Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_text_editors) đã có một trang nói về điều này, bao gồm cả file size có thể mở được cho từng loại editor.

Nếu việc giải quyết vấn đề mở file lớn không quá gấp về thời gian, bạn hoàn toàn có thể thong thả tìm hiểu. Tất nhiên bạn nên tìm cách giải quyết vấn đề trước. Rồi sau đó, hãy dành một khoảng thời gian để đánh giá các lựa chọn text editor của mình. Tìm một loại tool có thể mở file lớn và có những tính năng khác nữa có thể hỗ trợ cho bạn. Hãy thử một số trong đó.

Nếu bạn không thể tránh khỏi việc đối mặt với các file lớn trong thời gian sắp tới, hãy chủ động lên kế hoạch để giải quyết nó trước.

## Chia nhỏ file log của bạn

Bây giờ chúng ta sẽ tìm hiểu cách làm nào khác sâu sắc hơn và có nhiều ý nghĩa hơn. Chúng ta đã tìm hiểu các hướng giải quyết liên quan đến việc mở file của bạn. Nhưng ta cũng có thể giải quyết bằng cách tác động trực tiếp lên file.

Đầu tiên, hãy tạo một bản sao của file (trong lúc đợi copy ra thì hãy làm việc gì khác, vì nó sẽ khá tốn thời gian của bạn). Suy cho cùng, thì bạn sẽ không muốn làm gì ảnh hưởng đến file gốc đâu.

Sau khi copy xong, bạn có thể thiết lập để chia nhỏ file ra. Trong [thread câu hỏi](https://superuser.com/questions/94083/how-to-split-large-file-on-windows) này đã liệt kê một số các gợi ý để thực hiện việc này. Bạn có thể tìm hiểu về các tool mà bạn có thể download hoặc bạn có thể học thêm về những câu lệnh mới.

Tuy nhiên, nếu sử dụng cách này, bạn đơn giản chỉ cần chia nhỏ file ra thành những file bé gấp 10, 100 lần so với file gốc và có thể mở được bằng text editor của mình. Nhưng rõ ràng việc tìm kiếm trong từng file một là rất bất tiện. Những nó vẫn còn đỡ hơn là bạn phải tốn thời gian chờ đợi để rồi text editor bị crash.

## Parse file log của bạn

Việc tạo ra file log để cả máy và người có thể hiểu được là rất quan trọng. Nói rộng ra, ta cần những kỹ thuật sau:

- Đơn giản hoá format của các mục log
- Thêm cả timestamp
- Đánh tag và chia category
- Sử dụng cặp key-value

Nếu file log được lưu dưới dạng này, ta có thể sử dụng nó. Thay vì mở nó bằng editor và thực hiện search, bạn có thể viết một đoạn script để parse nó và lấy thông tin mà bạn cần. Cũng không cần kiến thức quá cao siêu để làm việc này.

Bạn cũng có thể sử dụng những tool có sẵn để parse file log của bạn thành những thông tin có ý nghĩa. Ở [đây](https://www.scalyr.com/help/parsing-logs)

## Sử dụng Log Aggregator

Bạn có thể tập hợp tất cả log của bạn vào một nơi, parse chúng và lấy các thông từ đó, thậm chí có thể hình ảnh hoá (visualize) chúng. Và [đây](https://www.scalyr.com/product) là một công cụ làm chính xác điều này cho bạn.