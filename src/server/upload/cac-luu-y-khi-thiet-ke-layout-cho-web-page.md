Thiết kế layout cho một web page mang tính nghệ thuật hơn là tính kỹ thuật, không có một công thức cụ thể nào để mark up nội dung HTML và thiết kế CSS chuẩn xác nhất. Và thiết kế của web page này có thể lại không phù hợp với web page khác. Thiết kế layout là quá trình chúng ta tích lũy thông qua kinh nghiệm, học cách hoạt động của các thuộc tính CSS và luyện tập nhiều chính là cách giúp chúng ta có thể thiết kế một layout tốt hơn cho các webpage.

Tuy nhiên, có một vài lưu ý mà bạn luôn cần quan tâm khi thiết kế mọi layout. Đây không phải là những công thức để bạn có thể học và làm ra ngay một layout, nhưng đây là những gì bạn nên luôn nghĩ đến khi bắt đầu thiết kế một layout cho web page.

# 1. Bắt đầu với nội dung

Rất nhiều người sẽ muốn nhảy ngay vào những gì đẹp đẽ - chọn màu sắc, font chữ, icon, ảnh,... Tuy nhiên nếu bắt đầu bằng những hiệu ứng màu mè như vậy chẳng khác gì bạn đang đặt một cỗ xe ngựa lên trước rồi mới buộc con ngựa vào phía sau cái xe vậy. thành phần quan trọng nhất của một webpage là nội dung: tiêu đề, các đoạn văn, những bức ảnh chính, link điều hướng, video,... và tất cả những gì mà đưa người dùng đến website của bạn. Họ muốn đọc, học và trải nghiệm những gì website của bạn đề cập tới. Nội dung chính là "vua", vậy bạn nên nghĩ đến việc website sẽ hiển thị những nội dung gì trước khi nghĩ đến việc nó nên trình bày với màu sắc, font chữ nào. Suy cho cùng, nếu như bạn tạo ra một chiếc hộp 3D tuyệt vời nhưng chẳng có gì chứa trong đó thì chiếc hộp đó cũng chỉ vô dụng.

Thêm vào đó, nội dung của một page nên định hướng cho việc design layout của page đó. Ví dụ như homepage của bạn sử dụng để quảng bá dịch vụ của công ty mình thì bạn nên làm bổi bật nội dung của dịch vụ đó lên, có thể là bằng một bức ảnh lớn chụp về đội ngũ nhân viên thân thiện của công ty và một vài trích dẫn từ những khách hàng hài lòng với dịch vụ họ đã được trải nghiệm. Hãy luôn thiết kế layout dựa trên nội dung.

# 2. Mobile first

Ngày nay smartphone và máy tính bảng đã trở nên rất phổ biến, vì vậy việc trích xuất những key cần hiển thị để phù hợp cho các màn hình cỡ nhỏ mà không làm mất đi nội dung trang web là một điều hết sức cần thiết. Mobile first design là bắt đầu với nội dung của bạn, sắp xếp chúng hiển thị một cách hợp lý với các màn hình nhỏ trước, sau đó tùy chỉnh dần lên các màn hình cỡ lớn hơn và thêm những hiển thị đẹp mắt, phức tạp dần vào những màn hình cỡ lớn. Lưu ý là nội dung đưa đến cho mọi cỡ màn hình gần như tương đương nhau, chỉ khác nhau ở cách hiển thị.

Luôn nhớ rằng web site của bạn sẽ được truy cập bởi nhiều người khác nhau, sử dụng smartphone, máy tính bảng hoặc PC, và không phải ai cũng cần scroll màn hình qua một page dài chứa đầy đủ toàn bộ các hiển thị màu mè. Thay vì cố gắng nhồi nhét mọi thứ được hiển thị trên một màn hình 24inch vào một màn hình 5inch, hãy lược bỏ thông tin không cần thiết để người sử dụng dễ tiếp cận với nội dung chính.

# 3. Xây dựng bản phác thảo

Khi bạn lựa chọn được những nội dung cần hiển thị, giờ đến bước bạn tổ chức nó theo một cách dễ nhìn hơn. Một vài người sẽ nhảy ngay vào bước code HTML: tạo các div, thêm header, article, footer,... Điều này thường được gọi là "thiết kế ngay trên browser" vì bạn thiết kế layout bằng HTML.

Tuy nhiên, trước khi nhảy vào code HTML, bạn nên phác thảo cách đặt nội dung của mình vào các vị trí trên page trước. Bạn không cần mọi thứ cầu kỳ, chỉ cần giấy và bút chì là ổn. Vì web design là đặt các nội dung vào một box (các thẻ div hoặc các thẻ HTML khác) và đặt các box đó vào các vị trí trên page. Vậy nên hãy phát thảo các box, sắp xếp chúng nhanh trên giấy là cách tốt nhất để chúng ta thử các kiểu page layout khác nhau. Bằng cách này chúng ta có thể nhanh chóng tìm ra vị trí thích hợp để đặt nội dung, kích cỡ lớn nhỏ của các box và tone tổng thể (tối hay sáng).

Bạn có thể dùng các ứng dụng đồ họa để vẽ bản phác thảo như Photoshop, Illustrator,... tuy nhiên hãy nhớ rằng đừng dành quá nhiều thời gian để tạo ra những hiệu ứng hình ảnh. Ở bước này chúng ta cần giữ mọi thứ đơn giản nhất có thể, còn những hiệu ứng đó ta có thể thay bằng cách design chúng trên CSS để tránh làm mất thời gian. 

# 4. Xác định các box

Một khi bạn đã có bản phác thảo, đó là lúc chúng ta nên nghĩ tới việc sử dụng HTML và CSS để dựng nên bản phác thảo đó trên web. Khi nhìn vào bản phác thảo, ta sẽ nhận ra những nhóm element nào có thể gộp chung lại thành các box.

Khi vẽ phác thảo, ta thường vẽ các border và một tiêu đề cho một box, từ đó ta nhận ra được các box riêng biệt. Khi nhận ra được các box đó thì ta có thể sử dụng một `<div>` để xác định box đó, sau đó thêm các element khác vào trong.
    
Ngoài ra, khi ta thấy các phần content được chia thành các cột nằm cạnh nhau thì mỗi phần content đó cũng được chứa trong một box riêng biệt.
    
Việc xác định các box sẽ giúp chúng ta xây dựng được layout một cách rõ ràng, maintain được HTML và CSS.
    
# 5. Đi theo Flow

Các HTML tag thường không tự nằm cạnh nhau hoặc trên dưới theo như layout mà ta tưởng tượng. Thường thì HTML tag hoạt động như là text trong các phần mềm xử lý văn bản: nó điền cho đến hết dòng rồi xuống dòng mới, hết trang thì sang trang mới. 

Tuy nhiên, các block-level tag sẽ tự động chiếm hết dòng, vậy nên khi thiết kế các box mà nằm trên dưới nhau thì ta không cần phải can thiệp bằng CSS mà chỉ cần đưa các `<div>` liên tiếp nhau theo flow mà ta muốn thì nó sẽ tự trở thành các box nằm trên dưới liên tiếp.

# 6. Nhớ sử dụng background image

Khi sử dụng một bức ảnh chiếm toàn bộ background của page, hoặc tạo một banner có một số người sử dụng tag `<img>`. Tuy nhiên thuộc tính background-image cung cấp một cách khác để thêm ảnh vào làm ảnh nền cho element thay cho tag `<img>`. Thuộc tính này không chỉ để tiết kiệm một chút bytes khi tải HTML mà còn làm đơn giản đi một số khó khăn khi tạo layout.

Ví dụ như khi tạo banner, ta cần chữ hoặc form nằm trên ảnh. Nếu như sử dụng tag `<img>` thì ta phải chỉnh position của các `<p>` hoặc `<form>` một cách khá phức tạp để nó có thể nằm đè lên tag `<img>`. Thay vào đó thì việc sử dụng background-image sẽ khiến mọi việc đơn giản hơn nhiều.

# 7. Chia nhỏ layout

Khi layout đủ lớn, nếu không chia nhỏ công việc từ đoạn thiết kế đến coding thì bạn có thể sẽ tạo nên một mớ hỗn độn. Vậy nên việc chia nhỏ layout để tiếp tục thiết kế và coding sau khi tạo ra một bản phác thảo tổng thể là rất quan trọng.

Bạn có thể chia ra header, footer, sidebar, main (chia tiếp thành các section),... Thiết kế và coding từng phần rồi ghép chúng lại với nhau để tạo nên một layout hoàn chỉnh, tương tự như trò chơi ghép hình.

# 8. Đừng quên margin và padding

Đôi khi cách đơn giản nhất lại là cách hiệu quả nhất. Không phải lúc nào bạn cũng cần các kỹ thuật CSS phức tạp để di chuyển một element vào một vị trí cụ thể. Hãy lưu ý rằng padding và margin chỉ là các khoảng trống, vậy nên khi sử dụng các thuộc tính này bạn có thể di chuyển các element vào đúng vị trí.

Trở lại với ví dụ về banner, khi đặt một headline vào trong div banner với một background image có trước. Để di chuyển headline vào giữa banner đó, ta có thể đơn giản sử dụng margin và padding để đẩy headline đó vào mà không cần phải sử dụng các kỹ thuật phức tạp.

# Nguồn bài viết

https://www.amazon.com/CSS3-Missing-David-Sawyer-McFarland/dp/1449325947