# Lời nói đầu
-----Xin chào các bạn mình tên là Vinh, hiện tại đang là một lập trình viên Nodejs 

Đây là một bài viết mang tính chất chia sẻ, đánh giá một phía từ mình, nên có những nhận định từ phía mình và mình mới tập viết nên nhiều khi trình bày nội dung chưa rõ ràng, còn dài dòng, có sai sót mong các bạn cũng bỏ qua.
Do có thể có các bạn các anh/chị/em xem bài nên mình xin gọi chung là mọi người hoặc các bạn nhé thông cảm cho em/anh/tớ 😁.

Trong đợt dịch  này các bạn đang làm ở nhà, công ty, hay là trong khu cách ly :sweat_smile: ? Riêng mình thì làm ở nhà gần một tuần rồi. Bắt đầu sao ta? À, để mình kể cho các bạn nghe một câu chuyện xàm xí của mình: Như mọi ngày mình ở nhà nghe bài :"Sài Gòn hôm nay mưa" thì khi đang chill như thế mình cũng có suy nghĩ linh tinh, nghĩ về công việc, crush của mình rồi tình hình thế giới, rồi mình chợt nghĩ về cái đại dịch này, cái thứ khiến mình phải ở ru rú trong nhà gần một tuần (nghĩ thôi mà thấy chán) 

Thế là bản năng anh hùng mình trổi dậy mình suy nghĩ cách để bảo vệ mọi người trước cái đại dịch này, nhưng mà trên cuộc đời này mõi người sẽ có một sứ mệnh riêng và dường như sứ mệnh của mình không phải người dẫn dắt dặp tắt cái dịch này ( ảo tưởng thôi mọi người ai mà không có quyền ước mơ đúng không nhỉ ? ^^)
![](https://images.viblo.asia/c731f058-34df-4133-9c7c-5d527f48bcb5.png)

Và rồi mình nghĩ đến thế mạnh của mình – lập trình, bằng cách tạo các app, hệ thống hữu dụng cho mọi người như bluezone - một app rất có ích cho cộng đồng. Thì ngoài những app như vậy mình còn nghĩ đến các công nghệ xác định lịch trình của các bệnh nhân, hay những app giúp các bác sĩ tìm ra vaccine, hay là dự đoán ổ dịch kiểu kiểu vậy,...

Rồi sau một loạt các ý nghĩ mình lại muốn làm một app là ghi lại lịch trình di chuyển của mọi người từ đó cảnh báo các khu F1, truy tìm nhanh các F khác, cũng như dự đoán được các ổ dịch dựa vào các lịch trình di chuyển cũng như tần suất, xu hướng di chuyển của những người trong khu vực đó. Vì bây giờ mọi người cũng có khá nhiều cổng thông tin về bệnh dịch rồi, nhưng chưa có một ứng dụng nào hiệu quả để tổng hợp lại và phân tích từ cả đống dữ liệu đó để dự đoán, dự báo.

Ok đó là ý tưởng của mình. Nào, bây giờ mọi người bắt tay cùng mình vào tìm hiểu và sử dụng để xem thứ gì đã giúp mình làm nên làm ý tưởng này nhé.

# Lên ý tưởng về sản phẩm hạn chế lây lan covid và đặt vấn đề
![](https://images.viblo.asia/d9ed2646-0f10-4a6f-8dd9-82c26229de94.jpeg)

-----Theo mình nghĩ, thì chắc khó có ai ghi lại được cái lịch trình di chuyển của mình nhỉ ) kiểu đi mấy chỗ "ẩn danh" thì ai lại muốn đưa lên app bao giờ. Rồi nếu bắt họ bật định vị để lấy vị trí như cái game “Pokemon go” thì cũng không hay cho lắm (tốn pin với khá là bất tiện), vì mình thấy chính bản thân mình cũng vậy, mỗi lần cái app nào bắt dùng vị trí là mình lười sử dụng luôn :3

------Mà thôi, mình lấy bối cảnh là một điều kiện đẹp tất cả mọi người số đông tự nguyện ngày nào đi làm về cũng ghi lịch trình lên cái app này nhé ^^

Mục đính cuối cùng của app mình muốn là :
* Người dùng ghi lại được lịch trình của mình: có thể ghi bằng tay hoặc bật định vị ứng dụng sẽ tự ghi (nếu có bệnh cũng dễ dàng công khai lịch trình mình cho mọi người hơn)_
* Dựa vào việc app có thể vẽ các lịch trình của tất cả mọi người thành biểu đồ và từ đó dễ dàng truy vết F1, F2
* Thông báo khi có những ca lây nhiễm gần đó và dựa vào đặc tính của khu vực đó để cảnh báo mức độ lấy lan (ví dụ: bạn cách ngõ bị phong toả là 2km mà trong 2km đó có một cây xăng, một cái bách hoá xanh đông người mà bạn cũng hay đến thì cần cảnh báo mức độ nguy hiểm 70 %)
* Dựa vào những lịch trình của những người dân trong khu vực mà dự đoán ổ dịch. Ví dụ: Từ vụ một tổ chức giáo phái nào đó đã lan bệnh  nếu chúng ta biết trước tập tính giáo phái, xu hướng của họ thì ta có thể dự đoán họ sẽ hay lui đến đâu và từ đó có thể dự đoán được ổ dịch (chức năng phân tích dữ liệu và dự đoán)

Ở đây, chúng ta có 3 vấn đề chính là :
* 	Ghi chép lại lịch trình: mình nghĩ cái này dễ csdl nào cũng ghi được
* 	Tạo những mối quan hệ phức tạp có tính linh động thông tin di chuyển đối tượng gồm: người di chuyển, địa điểm, và những đối tượng này liên hệ với nhau qua các mối quan hệ như: nơi đến, làm việc tại, A là bạn B, A và C chung nhà,....
* 	Dự đoán được kết quả dựa vào các mối quan hệ (ví dụ A là vợ B, C là bạn B mà C bị bệnh covid --> B1 F1-->A1 F2, Hoặc là khu dân cư Gò Vấp hay đổ xăng ở cây xăng nào --> khu vực nguy hiểm)
# Chọn cách thức giải quyết và công nghệ
Mọi người cùng mình tư duy nhé:

------Theo mình thấy, với vấn đề xây dựng một app dạng cộng đồng, social như vầy thì cần những cơ sở dữ liệu linh động để liên tục thay đổi các mối quan hệ cũng như cách lấy dữ liệu thì ở đây mình không so sánh nhưng theo mình biết, họ sẽ ưu tiên những cơ sở dữ liệu không ràng buộc, phi quan hệ. NoSQL (thật sự khi code mình thấy cũng phải ràng buộc bằng logic của mình để đảm bảo tính đúng đắng của một số cặp dữ liệu)

------Được rồi chúng ta đã biết được nhóm cơ sở dữ liệu sẽ sử dụng rồi, tiếp theo là cách gợi ý hay dự đoán nghe ra thì có vẻ phải dùng AI, hay Meachine learning. Khoan đã! Thật sự chúng ta có nên hoặc có thể sử dụng AI và ML ở đây, liệu mình có đủ kinh nghiệm để phối hợp các thuật toán cũng như tận dụng được hết các cách thức đã có trước, và thời gian để xong một sản phẩm AI, ML thật sự là lâu - mình nghĩ vậy. Nhưng theo mình nghĩ, app của chúng ta đang xây dựng hướng theo kiểu thu thập dữ liệu hơn, có nghĩa mình sẽ làm dạng bước đầu tiên trong AI hay ML là làm sạch dữ liệu chính app này của chúng ta sẽ thu thập dữ liệu và làm sạch

Vậy thì gợi ý theo kiểu gì?

------Riêng mình nếu với những chức năng mình liệt kê ở trên cũng có một cách khác thực mà không cần đến ML hay AI đó là Graph Database. đúng Graph Database chứ không phải GraphQL nhé mọi người. Tại sao mình lại chọn Graph Database vì nó có trong một số đồ án của mình có sử dụng )) , nói vậy thôi chứ cũng dựa vào các nguyên nhân mình nói ở trên nhé mọi người

# Sử dụng Neo4j trong app này như thế nào
Chúng ta sẽ sử dụng Neo4J (đây là một dạng Graph Database), vậy Neo4J là gì?
Thì có trang https://neo4j.com/ để các bạn có thể vào đọc kỹ hơn. Ở đây mình sẽ lướt nhanh định nghĩa cho các bạn nếu có thời gian mình sẽ làm một bài kỹ hơn về Neo4j

--- Định nghĩa:
*  Dựa và ý tưởng là xây dựng dựa trên đồ thị,  trong đó các dữ liệu về đối tượng ( sản phẩm, người dùng,..) được thể hiện bằng một node trong đồ thị

*  Còn các mối quan hệ là các dấu. --->   và ------    và <-----  hoặc là. <------>  để thể hiện mối quan hệ (relationships) ở đây bạn có thể đánh độ nặng cho mối quan hệ
 (ví dụ A--[friends : 5 ]-->B, A--[friends : 15]-->C         A với B là bạn những bạn thường đánh 5 điểm, A với C là bận thân đánh 15 điểm)

* Là cơ sở dữ liệu dạng đồ thị thường được sử dụng trong việc mô tả các mạng thông tin như mạng xã hội, mạng cảm biến,… các dạng mà ở đó thông tin được mô tả như một thực thể (một đỉnh) trên một đồ thị có hướng


 ![](https://images.viblo.asia/84a28732-2a26-46c4-957c-cd7b009068cc.png)

Ở đây mình có xây dựng một ví dụ về neo4j :
 
 ![](https://images.viblo.asia/cc0804ef-18fe-4cc6-99f2-36aefd445886.png)

 
 
  Và Neo4j sử dụng các thuật toán tìm đường đi, thuật toán liên quan đến đồ thị để sử dụng trong câu query.Đó cũng là thế mạnh của Neo4j dựa vào lỗi là đồ thị mà thanh niên này vô tư sử dụng được các thuật toán dạng đồ thị giúp việc tính toán dự đoán cũng trở nên dễ dàng hơn các cơ sở dữ liệu loại khác).
   
 Về thuật toán trong Neo4j thì theo mình tìm hiểu có các nhóm thuật toán sau.
![](https://images.viblo.asia/504733cd-82aa-454a-904f-32e645fe13e5.png)


Nhìn các nhóm thuật toán này khá hấp dẫn, mình chắc là các bạn cũng đang loé lên trong đầu vài ý tưởng khi nhìn vào đống này :smile::smile::smile:

Ở đây có 5 nhóm thuật toán nhưng trong app mình  sẽ áp dụng một vài nhóm thuật toán thôi
* Chúng ta có thể tìm được những người tiếp xúc với với bệnh qua các địa điểm, sao đó taọ thành các mối quan hệ F1, F2,  (ở đây dùng logic hay những câu query bình thường ta đã có thể cập nhật được)
* Sau đó sử dụng thuật toán  community detection (phân cụm cộng đồng  *mình tạm dịch vậy*  :satisfied:)

![](https://images.viblo.asia/81443a6d-5da7-4cf5-83b8-c4295c6a506a.png)

Ở thuật toán này sẽ dựa vào các đặt tính, các mối quan hệ mà sẽ đưa ra được các cụm khác nhau dựa vào các đặt tính, mối quan hệ đó (ví dụ  : Cụm A : những người dân có mối quan hệ gần mức độ 1 so với bệnh nhân, Cụm B: những người có mức độ gần gủi thấp hơn mức độ :2 chẳng hạn)

Áp dụng tính chất này ta có thể phân được các cụm bệnh nhân khác nhau để dễ quan xát quản lý theo dõi
* Và thuật toán prediction link mình tạm gọi dự đoán mối quan hệ thì có một ví dụ như hình dưới đây

![](https://images.viblo.asia/814e3f54-c360-44e4-bd50-c3d09dafdfdc.png)
Nhờ vào mối quan hệ giữa mọi người với nhau ta có thể dự đoán mối quan hệ tiếp theo giữa hai người khác nhau.
Cùng ý tưởng đó có thể sử dụng thiết kể để dự đoán được những người sẽ có nguy cơ lây nhiễm trong cộng đồng dựa vào đó để thông báo và nhắc nhở


Bây giờ mình sẽ chọn nhanh hai đối tượng là : Người , và địa điểm (sau này mọi người có thể phát triển thêm các nhóm đối tượng khác)

![](https://images.viblo.asia/c731f058-34df-4133-9c7c-5d527f48bcb5.png)


Như trên hình vẽ các bạn cũng có thể thấy khi tổ chức lưu thì các node và mối quan hệ sẽ được thể hiện như trên
nhìn vào đồ thị chúng ta có thể sử dụng các câu query tìm đường đi ngắn nhất để dự đoán được mức mình đang là F mấy 

Tiếp theo chúng ta sử dụng thuật toán dự đoán của Neo4j cung cấp (các bạn có thể vào trang chủ neo4j để hiểu thuật toán hơn) nhưng đơn giản mà nói thuật toán sẽ tìm trong đồ thị những mối quan hệ gần nhau để dự đoán các mối quan hệ tiếp theo đó
Cũng như sử dụng nhóm thuật toán  community detection phân cụm cộng đồng để tìm ra cụm những nhóm người và mức độ có nguy cơ nhiểm khác nhau.

Các thuật toán này sẽ được chạy vào cuối ngày cho việc phân tích dự đoán để có đầy đủ dử liệu trong ngày mạng lại sự đúng đăn hơn

Chúng ta cũng có thể phát triển thêm các Node các đối tượng như Nhân viên, phương tiện,.... để có thể phục vụ chi tiết bài toán mình đặt ra hơn

# Kết
-------Đó là tất cả  ý tưởng về app giúp hạn chế dịch covid của mình, các bạn cảm thấy như thế nào về ý tưởng điên rồ nay :satisfied:

Sau cùng mục đích mình là  mình muốn là chia sẽ cho các bạn ý tưởng điên rồ của mình và  cũng muốn  giới thiệu sơ sơ cho các bạn về cơ sở dữ liệu Neo4j là gì ?
Trong bài viết có một số cách thiết kế hay nhận định chủ quan theo ý cuả mình có thể sai có thể đúng nên mình cũng rất mong mọi người thương góp ý mà có ghét cũng đừng buôn lời cay đắng :)))

Mình sẽ kết phần 1 ở đây nếu có nhiều bạn quan tậm mình sẽ làm phần 2  phân tích chi tiết hơn về Neo4j về các thuật toán cũng như về ý tưởng này.

Cảm ơn mọi người đã nhẫn nạy mà xem đến đây :sweat_smile::pray::pray::pray:
 
 Một số nội dung hình ảnh từ. :  https://neo4j.com/