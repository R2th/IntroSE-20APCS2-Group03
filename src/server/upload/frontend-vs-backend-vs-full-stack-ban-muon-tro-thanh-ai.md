Lĩnh vực Web Development luôn tăng trưởng và nhu cầu nhân lực trong lĩnh vực này chưa bao giờ hết hot. Nếu bạn là một web developer thì không phải lo "cạp đất mà ăn".  
Các công nghệ phát triển web cũng tăng dần qua thời gian, liên tục sinh ra công nghệ mới. ASP, PHP, Python, Ruby on Rails.... Và việc bạn chọn học ngôn ngữ nào cũng tuỳ thuộc khá nhiều vào việc bạn muốn phụ trách mảng nào trong lĩnh vực này: Frontend, Backend hay cả hai.
Hôm nay chúng ta cùng tản mạn đôi điều về những vai trò trong lĩnh vực này nhé: Frontend vs Backend vs Full Stack.  

## Nhìn lại thời nguyên thuỷ
Hãy bắt đầu hành trình của chúng ta bằng cách tìm hiểu cách thông tin được hiển thị từ một trang web trên màn hình của bạn. Tất cả các trang web đều sử dụng HTML để xử lý cấu trúc của website, cũng như hiển thị nội dung của nó. Bạn có thể coi HTML (Hypertext Markup Language) như bộ xương của website thực tế.  
Quay lại những ngày đầu của web, đây là cách hầu hết các trang web hoạt động. File HTML tĩnh sẽ phải được cập nhật bất cứ khi nào web developer muốn hiển thị thông tin mới trên trang web. Điều này dẫn đến việc developer liên tục phải làm lại các file HTML để hiển thị thông tin mới trên màn hình của người dùng.  
Lúc đầu, điều này có vẻ không phải là một idea tồi , thế nhưng, bạn cần cập nhật một website thường xuyên như thế nào? Vài lần 1 tuần? Chắc chắn, phương pháp này hoạt động tốt đối với các website nhỏ với thông tin hạn chế và cập nhật không thường xuyên (ví dụ như blog cá nhân chẳng hạn), nhưng đối với các website như [www.nytimes.com](https://www.nytimes.com/) thì sao? Vào năm 2013, The New York Times đã xuất bản khoảng 350 tin bài, tạo ra 17 triệu lượt xem trang mỗi ngày! Hãy tưởng tượng bạn phải tạo 350 file mới mỗi ngày với một bài viết khác nhau trên mỗi file. Nếu chạy bằng cơm thì chắc cần đâu đó khoảng vài chục ông IT chỉ riêng cho việc update nội dung website chứ chẳng đùa. :sweat_smile:  
Tất nhiên, New York Times không hoạt động bằng cách xuất bản các bài báo mới trên các trang web riêng lẻ, mà bằng cách tạo một “template” trong đó data (trong trường hợp này là các bài báo) có thể được chèn vào các phần chính xác của trang web. Vậy, nếu chúng ta không đưa các bài viết thực tế vào file HTML, thì làm cách nào để chúng ta lưu trữ dữ liệu của mình? Đây là chỗ mà chúng ta phân biệt giữa các trang web tĩnh và trang web động.  
Một trang web động sẽ sử dụng database để lưu trữ tất cả các bài báo dưới dạng văn bản, cũng như file HTML để hiển thị thông tin từ database. Chúng ta có thể bắt đầu coi hai thực thể này là back-end và front-end của website. Bản thân HTML không thể lấy bất kỳ thông tin nào từ database. Chúng ta cần sử dụng ngôn ngữ phía server để lấy thông tin đó và đưa nó vào các file HTML. Một trong những ngôn ngữ lập trình phía server phổ biến và được sử dụng rộng rãi nhất trên web hiện nay là PHP, viết tắt của PHP: Hypertext Pre-processor.  
Thế là đến đây chúng ta có: 
* Các bài báo có trong database 
* Mã PHP để lấy thông tin 
* HTML để hiển thị lên trang web  

Chúng ta có thể bắt đầu ghi nhận một tiến trình tuyến tính ở đây:  
Database chứa tất cả thông tin → PHP lấy thông tin đó ra khỏi database và xử lý → HTML hiển thị thông tin đã xử lý lên màn hình.  
Đây là cách hầu hết các trang web tin tức hiện đại hoạt động hiện nay. Còn với các trang web có tương tác từ phía người dùng (như là trang thương mại điện tử) thì có cả chiều ngược lại:   
Người dùng thao tác lên màn hình  → PHP xử lý thông tin để chuẩn bị cho việc cập nhật thông tin vào database → thông tin được cập nhật vào database.  
Không cần phải lưu trữ tất cả thông tin trên trang web thực tế, các developer có thể dành nhiều thời gian hơn để tối ưu hóa giao diện thực tế của trang web (chăm lo cho UX) thay vì lo lắng về nội dung.  
Từ đây, chúng ta chia việc phát triển web thành 2 nhánh chính: Frontend Development  và Backend Development.  
## Front-End Web Development  
Một front-end web developer chủ yếu phụ trách giao diện người dùng và phong cách của trang web. Các ngôn ngữ được sử dụng phổ biến nhất mà "người chơi web hệ front-end" sử dụng là: HTML, CSS3, cũng như JavaScript. Ba ngôn ngữ này rất cần thiết cho bất kỳ front-end web developer nào và rất quan trọng trong việc xác định thiết kế thực tế của một trang web.   
![](https://images.viblo.asia/753560cb-17d1-47db-85d4-2e4c758fed58.png)  
Nếu chúng ta coi HTML như một bộ xương của trang web của mình, chúng ta có thể nghĩ CSS (Cascading Style Sheets) như quần áo vậy. Mọi người muốn thể hiện gu thời trang của họ theo cách riêng của họ và CSS cho phép chúng ta làm điều đó bằng cách xác định trước các phần nhất định của trang web là một phong cách nhất định. Banner màu cam, menu flyout, main content chiếm 75% chiều rộng,  side-menu luôn hiển thị.... tất cả những việc này đều là nhiệm vụ của CSS. Còn JavaScript thì giúp trang web của chúng ta trở nên rất linh hoạt. Bạn có thể hiển thị popup message, show ngày giờ, tính toán ngay tại trang web mà không cần request tới server...
## Back-End Web Development
Mặc dù có một trang web đẹp mắt hiển nhiên là điều cần thiết, nhưng việc hiển thị trang web một cách mượt mà, nhanh chóng và chính xác cũng cực kỳ quan trọng. Đó chính là lĩnh vực của back-end developer.  
Các công nghệ web back-end thường được sử dụng là: Python, Ruby và PHP. Xử lý backend giúp hiển thị thông tin lên trang web HTML, cập nhật chỉnh sửa thông tin trở xuống database.  
Ví dụ, bất cứ khi nào bạn cập nhật status của mình trên Facebook, thông tin bạn gửi sẽ được lưu trữ trong database, không phải trên trang web thực tế. Khi bạn cập nhật status đó, thì nội dung cập nhật cũng được update vào database, và trang facebook của bạn được tải rất nhanh, vì trang HTML không đổi, chỉ có nội dung hiển thị là thay đổi mà thôi, nên không cần tải lại HTML hay CSS làm gì nữa. 
Nôm na có thể nói, website của ta là một nhà hàng, mà front-end là người phục vụ bàn (và cả giữ xe), còn back-end chính là đầu bếp (và thu ngân nữa). Thế là dễ hiểu nhất. Đầu bếp tạo ra 1 bữa ăn chất lượng, và phục vụ bàn sẽ đảm nhiệm việc mang lại cho thực khách trải nghiệm tuyệt vời nhất có thể.  

## Full-Stack Web Development
Và nếu bạn có ý định trở thành Web Developer, bạn sẽ không ít lần phải đối diện câu hỏi: mình nên học ngôn ngữ phát triển web nào?  
Không chỉ có một ngôn ngữ mà bạn nên học, và cũng không tồn tại “một công nghệ chủ đạo” mà mọi người đều sử dụng mọi lúc mọi nơi. Thay vào đó, để tạo thành 1 website tốt, ta cần nhiều công nghệ, mỗi công nghệ đảm nhiệm một số tính năng, và kết hợp lại để tạo ra một sản phẩm tuyệt vời.  
Và giờ đây, chúng ta tiếp cận với khái niệm Full-Stack Web Development.    
Vai trò của full-stack web developer trong sự phát triển của website nằm ở cả front-end và back-end. Trong trường hợp này, "stack" mang ý nghĩa như là layer. Một full-stack web developer có kiến thức chuyên môn về tất cả các layer dùng trong phát triển một trang web. Điều này bao gồm, nhưng không giới hạn ở: server, client và hosting, data model, UI/UX, cũng như nhu cầu thực tế của doanh nghiệp.  
Trở thành full-stack web developer, bạn có thể bắt đầu lập kế hoạch cho các project của mình bằng cách tìm những công cụ nào thực hiện công việc tốt nhất cho nhiệm vụ của mình. Bạn cần phải nhận biết được một số ngôn ngữ nổi trội hơn ở một số khía cạnh nhất định và đó là cách nó nên được nhìn nhận. Thay vì tập trung vào một giải pháp đơn lẻ, một chiều, bạn nên có kinh nghiệm trong mọi khía cạnh của phát triển web.  
Tất nhiên, học nhiều ngôn ngữ và công nghệ web là cách tốt nhất để thực hiện điều đó, nhưng bạn cần lưu ý: tìm hiểu các công nghệ / ngôn ngữ được sử dụng rộng rãi và phổ biến nhất, đơn giản là vì bạn càng có nhiều hỗ trợ cho sản phẩm của mình thì càng tốt.  
Nói tóm lại, back-end hay front-end đều tốt, và full-stack là xịn hơn cả. :grin:  
## Kết
 Công nghệ web nói riêng và IT nói chung luôn luôn phát triển không ngừng, và nếu bạn muốn trở thành Front-End Developer, Back-End Developer hay Full-Stack Developer thì cũng sẽ phải liên tục cập nhật công nghệ phát triển web mới. Và bạn có thể yên tâm là developer ngành web sẽ không bao giờ sợ đói :grinning:.

## Tham khảo
Đây là một bài dịch, bạn có thể xem bài gốc tại đây.  
https://www.codingdojo.com/blog/frontend-vs-backend-vs-full-stack