## 1. Mô hình kinh doanh theo quan điểm tùy chỉnh
Đôi khi, để tiết kiệm thời gian và tránh mã trùng lặp, chúng tôi quyết định sử dụng lại trong chế độ xem của chúng tôi, các mô hình tương tự mà chúng tôi sử dụng trong các mô hình mạng và cơ sở dữ liệu của mình.

Chúng tôi sử dụng userApiClient để lấy thông tin người dùng của mình từ phụ trợ:

Về thành công, chúng tôi nhận được mô hình:


Tại sao điều này là xấu?
Lý do quan trọng nhất khiến chúng tôi không nên sử dụng lại các mô hình phụ trợ của mình là vì chúng tôi có một phần khác của ứng dụng. Chúng tôi đang ghép giao diện người dùng của mình với phản hồi điểm cuối và bây giờ chúng tôi cần điểm cuối đó để hiển thị UI.
Mô hình phụ trợ có thể có nhiều thông tin hơn nhu cầu xem của chúng tôi . Độ phức tạp thêm. Thông tin thêm có nghĩa là, độ phức tạp thêm. Trong ví dụ trên, chúng tôi có thể đã sử dụng một mô hình đơn giản hóa:

Chúng ta không nên thay đổi UI của mình chỉ vì điều đó chắc chắn không đúng, phần phụ trợ của chúng ta sẽ thay đổi, chúng ta cần sẵn sàng cho nó. một cái gì đó thay đổi trong phần phụ trợ.

Làm thế nào để khắc phục nó?
Chúng ta sẽ cần tạo một mô hình UI và một phương thức để chuyển đổi mô hình phụ trợ thành mô hình UI.

Trong ví dụ của chúng tôi, chúng tôi sẽ chuyển đổi UserModel thành UserUIModel và chuyển nó dưới dạng tham số cho UserView :


Thiết kế mới của chúng tôi ngăn chúng tôi gửi dữ liệu không cần thiết đến chế độ xem và xem chúng tôi sử dụng lại quan điểm của mình bất cứ nơi nào chúng ta cần chúng.

## 2. Quan điểm nguyên khối
Bạn đã bao giờ mở một tệp bố cục và thấy một tài liệu khổng lồ chứa tất cả giao diện người dùng của hoạt động? Thật không may, đây là một mẫu rất phổ biến trong Android gây cho chúng tôi rất nhiều rắc rối.

Tại sao điều này là xấu?
Nó đi ngược lại ba nguyên tắc của chúng tôi:

Những tập tin này thực sự khó đọc , quá nhiều thông tin và quá nhiều lớp thành phần sống cùng nhau.
Kiểm tra tích hợp là tuyệt vời nhưng chúng trộn lẫn giao diện người dùng và logic kinh doanh, làm cho khó biết nguyên nhân cơ bản của nguyên nhân là gì Những lỗi này có thể được nhìn thấy trong giao diện người dùng của chúng tôi, chúng tôi chỉ bật các thử nghiệm UI . Các thử nghiệm này có thể phát hiện các sự cố trong UI của chúng tôi ở mức độ chi tiết tốt hơn so với các thử nghiệm tích hợp thông thường.
Theo thời gian, các thành phần trùng lặp sẽ bắt đầu chuyển hướng, gây ra sự không nhất quán trong ứng dụng của chúng tôi. Chúng tôi không thể sử dụng lại các phần riêng lẻ của xml , điều này buộc chúng tôi phải sao chép và dán.
Làm thế nào để khắc phục nó?
Chúng ta nên phá vỡ giao diện của mình. Chúng ta nên phá vỡ giao diện người dùng của mình thành các phần nhỏ hơn, theo cách tương tự, chúng ta xây dựng các DAO, mô hình và ứng dụng khách phụ trợ cho logic kinh doanh của chúng ta .

Chế độ xem tùy chỉnh và thẻ <include> và <merge> là những người bạn tốt nhất của chúng tôi. Việc sử dụng một thành phần UI được sử dụng lại để tách nó ra khỏi Xml nguyên khối có thể gây ra vấn đề nghiêm trọng. Vào thời điểm đó, giao diện người dùng của chúng tôi sẽ được kết hợp chặt chẽ với hoạt động / đoạn của chúng tôi, làm cho công cụ tái cấu trúc trở nên khó khăn hơn và gây nguy hiểm cho các chức năng hiện có của ứng dụng.

Chúng ta hãy xem một ví dụ lấy cảm hứng từ một bố cục thực dễ đọc hơn:


Có một số lớp bố trí lồng nhau, làm cho khó hiểu vị trí của từng thành phần được đặt. Không có ý kiến, rất khó để biết các thẻ khác nhau có liên quan như thế nào và những gì họ đại diện.

Trong xml, chúng ta có thể xác định ít nhất 6 thành phần UI được xác định rõ. Hãy xem cách bố trí này sẽ trông như thế nào nếu chúng ta tạo chế độ xem tùy chỉnh cho các thành phần này:


Trong triển khai mới này, các ý kiến ​​không còn cần thiết vì mã của chúng tôi là tự mô tả .

Nó sẽ không yêu cầu thay đổi một lớp so với tất cả các hoạt động của chúng tôi bằng cách sử dụng phương pháp nguyên khối.

Cách tiếp cận của Groupon về việc ưu tiên các thành phần UI nhỏ hơn các xml nguyên khối, nó được lấy cảm hứng từ cuốn sách Thiết kế nguyên tử của Brad Frost. Tôi khuyên bạn nên xem cuốn sách này, đặc biệt nếu bạn đam mê UI.

## 3. Logic kinh doanh trong chế độ xem tùy chỉnh
Ở điểm trước, chúng tôi đã nói về lợi ích của việc sử dụng chế độ xem tùy chỉnh, chúng tôi không phải là công cụ tuyệt vời nhưng nếu chúng tôi không sử dụng chúng một cách cẩn thận, họ có thể là con dao hai lưỡi. dễ dàng. Thêm nhật ký, kiểm tra AB và đưa ra quyết định logic có thể đang tìm kiếm một cách tuyệt vời để ngăn chặn mã của chúng tôi nhưng thực tế không phải vậy.

Tại sao điều này là xấu?
Một trình xem được triển khai tốt để người dùng sử dụng lại chúng . Thứ tự là sử dụng lại chúng . Chúng tôi có thể tái sử dụng, chúng nên duy trì đơn giản và không tin vào logic kinh doanh. Chế độ xem chỉ nên nhận trạng thái và hiển thị trạng thái mà không đưa ra bất kỳ quyết định nào.
Bảo hiểm tự động hóa tốt, ở cấp độ xem, sẽ giúp chúng tôi phát hiện các tác dụng phụ không mong muốn trước đó của các nhà tái cấu trúc và thay đổi mã trong giao diện người dùng của chúng tôi.
Làm thế nào để khắc phục nó?
Nếu bạn sử dụng MVP , mọi loại logic đều thuộc về Người thuyết trình . Nếu bạn thích MVVM , logic của bạn nên là một phần của ViewModel của bạn.

Tại groupon , chúng tôi đã phát hiện ra rằng MVI và dữ liệu một chiều truyền theo cách kinh doanh nên là một phần của Ý định của chúng tôi , sẽ tạo ra một đối tượng trạng thái bất biến , sẽ được hiển thị theo quan điểm của chúng tôi.

Nếu bạn quan tâm đến các luồng dữ liệu đơn hướng và cách triển khai bài viết Pratyush Kshirsagar và Yichen WU Giao tiếp xem chéo bằng Grox . Họ làm rất tốt việc giải thích cách các luồng dữ liệu đơn hướng có thể giúp chúng tôi xây dựng giao diện người dùng của chúng tôi .

## 4. Tối ưu hóa quá mức
Tại thời điểm này, bạn có thể đã nhận ra rằng chúng tôi chưa nói về hiệu suất. Bạn thậm chí có thể ngạc nhiên rằng chúng tôi thậm chí không coi hiệu suất là một trong những nguyên tắc của chúng tôi đối với các UI tốt.

Rốt cuộc, đó là lý do tại sao chúng tôi sử dụng các ngôn ngữ lập trình cấp cao thay vì viết mã trình biên dịch hiệu quả hơn.

ConstrainLayout là một công cụ tuyệt vời, Trong Android, bố cục lồng nhau và thuế kép là hai vấn đề lớn ảnh hưởng đến hiệu suất của giao diện người dùng của chúng tôi. Bố cục ConstrainLayout là một công cụ tuyệt vời, Bố cục ConstrainLayout và tránh bố cục lồng nhau. mạnh hơn RelativeLayout và nó không phải chịu thuế kép . Vấn đề, như thường lệ, xảy ra khi chúng ta đưa điều này đến mức cực đoan.

Dựa trên tất cả các bài viết và bài nói chuyện mà chúng tôi đã nghe, chúng tôi có thể quyết định rằng chúng tôi sẽ triển khai UI của hoạt động của mình chỉ bằng một ConstraintLayout .

Tại sao điều này là xấu?
Bằng cách xây dựng tất cả giao diện người dùng của chúng tôi trong một ConstraintLayout , chúng tôi đang tạo ra một giao diện người dùng nguyên khối . Như chúng tôi ở trên, khó đọc , khó kiểm tra và tạo mã không thể sử dụng lại .
Chúng tôi sẽ không xử lý tệp UI một xml của chúng tôi. Chúng tôi sẽ không bao giờ xem xét việc xây dựng logic nghiệp vụ của mình trong lớp hoạt động / phân đoạn. Chính xác là những lý do tương tự áp dụng cho việc không xây dựng tệp UI một xml của chúng tôi.
Làm thế nào để khắc phục nó?
Thử nghiệm của chúng tôi nên được cho chúng tôi biết khi chúng tôi gặp sự cố và chúng tôi chỉ nên tạo một Bạn sẽ ngạc nhiên bởi số lần xảy ra sự cố hiệu suất UI do logic ràng buộc của chúng tôi làm quá nhiều hoặc do mã của chúng tôi làm mới UI nhiều hơn mức cần thiết.

## 5. Bỏ qua giao diện người dùng của chúng tôi trong đánh giá mã
Việc xem lại mã là khó khăn, tốn thời gian và để làm cho nó tồi tệ nhất, các tệp xml không dễ hiểu (đặc biệt là các xml nguyên khối). Vì những lý do đó, chúng tôi có xu hướng bỏ qua UI của chúng tôi khi xem xét mã.

Tại sao điều này là xấu?
Giao diện người dùng ứng dụng của chúng tôi phù hợp, giao diện người dùng sạch sẽ và có cấu trúc tốt có thể là sự khác biệt giữa người dùng ở lại hoặc rời khỏi ứng dụng của chúng tôi.
Chúng tôi không coi UI của mình là công dân hạng nhất . UI của chúng tôi là một nửa ứng dụng của chúng tôi, dành thời gian xem xét xml và quan điểm, ít nhất, cũng quan trọng như xem xét logic kinh doanh của chúng tôi.
Làm thế nào để khắc phục nó?
Có một vài điều chúng ta có thể làm để cải thiện quá trình xem xét của mình.

Là người đánh giá:

Hoàn toàn ổn khi nhận ra rằng chúng tôi không thể hiểu xml . Bạn có thể không có ngữ cảnh phù hợp hoặc giao diện người dùng quá phức tạp. Yêu cầu trợ giúp từ tác giả của mã.
Đừng cảm thấy tồi tệ khi yêu cầu tác giả chia xml thành các chế độ xem nhỏ hơn . Bạn sẽ làm tương tự với lớp lớn hoặc phương thức lớn.
Bắt đầu đánh giá mã với giao diện người dùng . Như tôi đã nói, các tệp xml là phần khó nhất để xem xét, đừng chờ đợi để mệt mỏi để bắt đầu đọc chúng.
Chúng ta có / cần độ cao trong các nút của mình không? Hoặc hình ảnh động của chúng ta có đúng thời lượng không?
Là một người đánh giá:

Thêm ảnh chụp màn hình giao diện người dùng của bạn trong Yêu cầu kéo của bạn . Điều này sẽ giúp nhóm của bạn xem lại mã nhanh hơn.
Yêu cầu nhà thiết kế của bạn là đồng minh lớn nhất của bạn. Yêu cầu họ xem lại UI của bạn càng sớm trong chu kỳ phát triển càng tốt.
Tránh các tệp xml nguyên khối . Tôi không thể nói điều này đủ, các thành phần UI nhỏ sẽ tốt hơn và dễ xem xét hơn.
Bắt đầu với giao diện người dùng của bạn . Bắt đầu bất kỳ tính năng mới nào bằng cách tạo Yêu cầu kéo dành riêng cho giao diện người dùng của bạn. Bằng cách này, bạn biết rằng giao diện người dùng của bạn sẽ có 100% sự chú ý của người đánh giá.

nguồn: https://android.jlelse.eu/how-to-maximize-androids-ui-reusability-5-common-mistakes-d40c43ae5e06