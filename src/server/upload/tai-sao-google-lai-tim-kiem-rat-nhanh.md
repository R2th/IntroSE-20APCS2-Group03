Vào thời đại công nghệ như ngày nay thì việc tìm kiếm thông tin cũng trở nên rất quan trọng. Thử hỏi nếu 1 ngày Google không hoạt động thì thế giới sẽ như thế nào nhỉ? Chắc mình sẽ bị rơi vào thời kì đồ đá mất.

Dùng nhiều Google nhưng nhiều lúc băn khoăn không biết vì sao Google lại tìm kiếm cho ra kết qủa nhanh như vậy.

![](https://images.viblo.asia/4d3b435d-dffa-4ced-89b5-1d82b0734380.png)

Chỉ với từ khoá “**lập trình hướng đối tượng**” mà Google trả về trong 0.42 giây trong tổng 60 triệu kết quả. Quá nhanh.

Không chỉ tốc độ trả về nhanh mà kết quả trả về cũng khá gần với mục đích tìm kiếm của người dùng nên Google đã trở thành 1 trong những công cụ có lẽ mạnh nhất trên thế giới.

Vậy cùng nhau tìm hiểu xem vì sao Google lại trả về kết quả nhanh đến như vậy nhé.

Mục đích của bài viết:

* Giúp các bạn có cái nhìn chung về 1 công cụ tìm kiếm nó gồm những bộ phận nào, vì sao nó hoạt động lại nhanh đến như vậy.
* Bài viết sẽ không giải thích sâu về từng bộ phận, mà chỉ nói qua về từng bộ phận để ai cũng có thể hiểu được.

## Kiến trúc Search Engine

![](https://images.viblo.asia/55f1ecd6-c653-4992-a0b6-e8f9498315c9.jpg)

**Search Engine** gồm 3 bộ phận chính. Đó là **Search Server**, **Index**, **Search Backend**.

Trong đó:

* Search Server đảm nhiệm việc trả về kết quả tìm kiếm cho người dùng.
* Seach Backend đảm nhiệm việc thu thập thông tin toàn bộ website trên toàn thế giới.
* Index giống như 1 cơ sở dữ liệu được sử dụng bởi Search Server và Search Backend.

Nhiệm vụ chính của Search Server là trả về kết quả tìm kiếm của người dùng nhanh nhất có thể. Bởi vì nếu không trả về ngay lập tức mà mất 10s, 1 phút, 2 phút mới trả về kết quả thì quả thực sẽ không thể trở thành 1 công cụ tìm kiếm được. Do đó Search Server sẽ được thiết kế để trả về kết quả nhanh nhất có thể.

Mặt khác, nhiệm vụ của Search Backend thì khác hoàn toàn với Search Server. Cho dù xử lí mất 5p, 10p hay 1 tiếng đi chăng nữa thì cũng không thành vấn đề. Miễn là nó thu thập dữ liệu từ toàn bộ website trên toàn thế giới và tạo ra Index mà Search Server dễ dùng là được.

Nhiệm vụ chính của thằng Index là lưu thông tin toàn bộ dữ liệu đã được thu thập từ Search Backend. Khi người dùng tìm kiếm, Search Server chỉ cần tìm trong Index và trả về kết quả là xong. Chứ không phải lúc đó mới bắt đầu đi thu thập dữ liệu và trả về đâu nhé.

Ví dụ như khi tìm kiếm với từ khoá “**lập trình**” thì khi đó từ khoá “**lập trình**” đã có sẵn trong Database (hay là Index) của Google rồi. Và nó chỉ trả về kết quả là xong.

Chính vì điều đó mà khiến cho Search Server luôn trả về kết quả ngay tức khắc là vì thế.

Đến đây ít nhiều chúng ta cũng đã hiểu được vì sao Google lại hoạt động nhanh đến thế. Vậy chúng ta thử đi tìm hiểu xem cụ thể bên trong nó hoạt động như nào nhé.

## Search Server thì tốc độ là số 1

![](https://images.viblo.asia/d090fb53-4aea-4529-b7f5-d7ec247406a8.jpg)

Bây giờ chúng ta thử tìm hiểu xem Search Server hoạt động thế nào nhé.

Về cơ bản thì Search Server nó cũng không khác gì Web Server cả. Nó chủ yếu đảm nhiệm những nhiệm vụ chính sau:

* Quản lí truyền thông với người dùng
* Phân tích request từ người dùng
* Tìm kiếm thông tin cần thiết từ Index
* Trả kết quả về cho người dùng

Quay lại với ví dụ bên trên, giả sử như người dùng tìm kiếm với từ khoá “lập trình”. Khi đó lúc này ở Index đã thực sự có kết quả về “lập trình” rồi. Và Search Server chỉ cần lấy kết quả từ Index trả về cho người dùng là xong nhiệm vụ.

Trong trường hợp mà Index không có kết quả nào, thì khi đó Search Search trả về kết quả là “Hiện tại không tìm thấy kết quả nào” đến cho người dùng.

**Do đó việc tổ chức dữ liệu trong Index để làm sao mà Search Server có thể lấy nhanh nhất là 1 điều vô cùng quan trọng.**

## Search Backend luôn chuẩn bị trước dữ liệu

![](https://images.viblo.asia/1f53db93-35cb-44ee-a6a7-5de7e3b0fefd.jpg)

So với Search Server thì Search Backend quả thực nó phức tạp hơn rất nhiều. Về cơ bản Search Backend sẽ bao gồm 2 thành phần chính đó là “Crawling” và “Tạo Index“.

**Crawling** là có nhiệm vụ đi thu thập toàn bộ trang web trên toàn thế giới về để xử lý. Vì công việc này vô cùng mất thời gian nên nó đã phân tách ra thành nhiều bộ phận con hơn để xử lý, đó là Crawler.

Hiện nay trên toàn thế giới chắc phải có đến tỉ tỉ website mất. Vậy mà Google đi thu thập từng đó website về để phục vụ cho người dùng thì quả thực quá kinh khủng.

Nhưng vì quá trình crawl, thu thập đến việc tạo Index là vô cùng mất thời gian. Nên bạn nào có blog riêng mà sau khi viết bài xong, search trên Google nó không ra là vì thế. Phải đợi Google crawl đến trang web của mình thì lúc đó các bạn search trên Google mới ra được.

Những trang web mà Crawler thu thập sẽ lưu tạm thời vào 1 nơi giống như cơ sở dữ liệu, cái này được gọi là Repository (kho).

**Bộ phận tạo Index (Index Creation)** sẽ lấy trang web từ Repository ra để phân tích, xử lý và cuối cùng là tạo ra Index để cho Search Server dùng.

Đối với Search Engine thì đây là 1 công việc vô cùng vô cùng mất thời gian. Chính vì luôn có thằng tạo trước dữ liệu như vậy mà đã làm cho Google luôn trả về kết quả ngay như tức thì.

**Vậy khi nào thì Google sẽ crawl trang web của mình?**

Với trang web nào nhiều người yêu thích, nội dung chất lượng thì luôn luôn được ưu tiên crawl trước. Những trang web nào nội dung kém chất lượng thì sẽ mất tầm 3 đến 1 tuần mới được crawl.

**Làm thế nào để thúc Google crawl trang của mình?**

Google cung cấp [1 trang](https://search.google.com/search-console/welcome) để gửi yêu cầu thực hiện crawl. Chỉ cần vào đó đăng kí tên website, gửi nội dung trang muốn crawl là được. Còn nếu không thực hiện thì mình khẳng định sẽ mất tầm từ 3 đến 7 ngày mới được crawl.

## Index là linh hồn của việc tìm kiếm

![](https://images.viblo.asia/8ac7cc91-c136-4d5c-a8e3-b4a7bf2a6763.jpg)

Nhiệm vụ chính của Index là lưu dữ liệu 1 cách an toàn và giúp Search Server trả về kết quả nhanh nhất có thể. Để dễ hình dùng thì chúng ta có thể xem Index như là 1 Database.

Trong Index có rất nhiều thông tin, phù hợp với nhiều mục đích tìm kiếm khác nhau.

Ở trong 1 Search Engine thì Index chính là 1 “cấu trúc dữ liệu” mà chỉ có Search Engine mới có thể hiểu được.

Nên việc thiết kế Index như nào, tổ chức dữ liệu ra sao để cho Search Server có thể query và trả về kết quả nhanh nhất có thể là điều vô cùng quan trọng. Và bài hôm nay mình sẽ không đi sâu vào giải thích cách tổ chức dữ liệu của Index nữa. Vì như thế có thể sẽ rất dài và càng làm cho bài viết trở nên phức tạp.

Nên tạm thời mình sẽ dừng ở đây.

## Tổng kết

1 Search Engine sẽ bao gồm 3 bộ phận sau:

* Search Server: nhận yêu cầu từ người dùng, truy vấn trong Index để lấy kết quả và trả kết quả về cho người dùng.
* Search Backend: Có nhiệm vụ đi thu thập thông tin của toàn bộ trang web trên toàn thế giới, phân tích, xử lý và tạo ra Index để dùng cho Search Server. Search Backend này hoạt động 24/24 không ngừng nghỉ.
* Index giống như 1 database được **tổ chức dữ liệu hợp lý** giúp cho Search Server có thể truy vấn 1 cách nhanh nhất có thể.

Các bạn thấy thế nào? Đã hình dung được tại sao mà Google luôn trả về kết quả nhanh như vậy chưa ak?

Mặc dù bài viết này không giúp các bạn tạo ra được 1 Search Engine nhưng ít nhiều cũng giúp các bạn có 1 chút hình dung Search Engine nó làm việc như thế nào.

Và đây là quyển mình đã tham khảo. Mình tìm mãi không thấy quyển tiếng anh đâu. Nên nếu ai biết tiếng nhật thì mình khuyên nên đọc quyển này. Theo mình cảm nhận khá là hay. Từ việc Search Engine làm việc thế nào cho đến việc tổ chức lưu dữ liệu ra sao, tối ưu server thế nào để cho chi phí vận hành là thấp nhất…

![](https://images.viblo.asia/a13767a3-59b6-4db6-97c7-99593cf1661a.jpg)

Nói chung là khá hay. Đọc để biết thêm thông tin. Sau khi có thông tin rồi thì đi chém mới ra gió ra bão được. 😀

Nguồn: [https://nghethuatcoding.com/2019/05/12/tai-sao-google-lai-tim-kiem-rat-nhanh/](https://nghethuatcoding.com/2019/05/12/tai-sao-google-lai-tim-kiem-rat-nhanh/)

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

👉👉👉 [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.