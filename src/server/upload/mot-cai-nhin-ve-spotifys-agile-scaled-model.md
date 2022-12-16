# Lời mở đầu

Hẳn là các dev hiện nay không mấy ai xa lạ với agile (agile methodology - phương pháp phát triển phần mềm linh hoạt), và scrum một trong những quy trình phát triển phần mềm phổ biến nhất phát sinh từ nó. Với các ưu thế của nó mang lại, scrum là sự lựa chọn hoàn hảo cho các dự án có size nhỏ và vừa. Tuy nhiên đối với các dự án lớn và phức tạp, scrum là không đủ đáp ứng và lúc này cái chúng ta cần chính là agile scaling model - phương pháp phát triển phần mềm theo mô hình nhân rộng linh hoạt.

Agile scaling model cung cấp cho chúng ta những hướng dẫn chi tiết về cách tổ chức, các quy định, kỹ thuật và quy trình làm việc để đảm bảo cho việc quản lý và vận hành một dự án lên tới hàng trăm hoặc hàng ngàn người. Đây là điều mà scrum khó mà có thể làm được. HIện nay một số agile scaling model phổ biến có thể nhắc tới như SAFe (Scaled Agile Framework), LeSS (Large Scaled Scrum), Nexus Framework by Scrum.org for Scaling Scrum và Spotify agile model. Đây là 4 scaling model phổ biến nhất và nếu so sánh khó có thể chọn ra đâu là framework tốt nhất. Nhưng một khi đã so sánh, bạn có thể nhận ra một framework hoàn toàn khác biệt so với những framework khác và bài viết này sẽ viết về framework khác biệt đó. Vâng đúng với tiêu đề, đó là Spotify agile model. 3 framework như SAFe, LeSS hay Nexus đều giữ cho mình những vị trí như Product Owner và Scrum Master, điều này nói lên sự giống nhau giữ chúng chính là đều dựa trên scaling scrum. Còn Spotify không làm như thế. Họ tổ chức theo một cách khác, đưa những khác niệm mới vào và làm nên sự khác biệt.

Vậy còn chờ gì nữa, triển thôi.



# Về Spotify’s Agile Scaled Model 

Spotify là một dịch vụ cung cấp nhạc nổi tiếng hiện nay. Với quy mô ban đầu chỉ nằm ở mức nhỏ bây giờ họ đã khoảng 4000 nhân viên và tầm 100 team vận hành. Một trong những yếu tố mang đến thành công của họ chính là việc quản lý, vận hành hệ thống theo phương pháp agile và đương nhiên, thêm một số tùy biến mang phong cách riêng trong việc scaling agile để tạo nên một dấu ấn riêng - Spotify's agile scaled model.

Spotify's agile scaled model đặt ra một chuẩn mực cho các công ty khởi nghiệp và thậm chí cả những công ty đã có danh tiếng có mục tiêu chung tập trung vào sự đổi mới sáng tạo và đẩy nhanh việc phân phối sản phẩm của họ ra thị trường. Mặc dù nó không đáp ứng hoạt động tốt cho mọi doanh nghiệp nhưng nó vẫn khuyến khích các doanh nghiệp điều chỉnh mô hình theo cách phù hợp hơn với họ. Spotify's agile scaled model góp phần thúc đẩy nhanh hơn cho việc đạt mục tiêu của dự án và thay đổi mindset của những người tham gia. Đây là điều tất nhiên vì nó là một phương pháp agile không hề giống với bất cứ ai.

## Cấu trúc chính của Spotify Model


![](https://images.viblo.asia/38010a4c-5db5-43f2-9607-b6f1d89a7595.jpg)


* **Squads** 

Tương tự như scrum teams, Spotify định nghĩa mỗi team của mình là một **squad**. Mỗi squad bao gồm từ 6-12 người làm việc tập trung trên một chức năng chuyên biệt. Một squad phải đảm bảo tính tự chủ, tự tổ chức và tự quản lý. Điều đó có nghĩa mà mỗi squad có thể chọn cho mình một quy trình phát triển phần mềm riêng, có thể là scrum hoặc là bất cứ thứ gì khác nhưng nó phải đảm bảo apply một  MVP technique (Most Viable Product technique).

Mỗi squads sẽ cần có một người tư vấn (Agile Coach) để giúp cho squad đi đúng hướng và cải thiện cách làm việc của mỗi member. Người tư vấn ở đây có thể là Product Owner, hoặc thậm chí là tribe lead (giới thiệu ở phần tiếp theo) - những người mà nắm rõ chức năng phương hướng cũng như nhiệm vụ của mỗi feature area. Họ đảm nhận vai trò chính trong các buổi retro cũng như sprint planning meetings để đảm bảo squad vận hàng hiệu quả.

Mỗi squad đều có thể liên hệ trực tiếp đến các bên liên quan (stakeholders) mà không cần thông qua bất cứ bên trung gian nào.


* **Tribes** 

Nhiều squad hoạt động chung trên một feature area có thể gọp chung tạo thành một **tribe**. Mỗi tribe có thể từ 40-150 thành viên nhưng lý tưởng nhất là rơi vào khoảng 100 member. Với size lên tới mức 3 chữ số thì tất nhiên tribe cần cho mình người đứng đầu, đó là tribe lead. 

Tribe lead sẽ là người chịu trách nhiệm chính trong việc tạo ra môi trường làm việc sáng tạo và đẩy cao năng suất làm việc của các squad. Bên cạnh đó tribe lead cũng có thể là một thành viên của một squad.


* **Chapter** 

Đây là một khái niệm phân cấp rất thú vị - phân cấp ngang trong sơ đồ hệ thống. Các bạn có thể tham khảo ở ảnh đính kèm phía trên để dễ hiểu hơn. Mỗi squad tất nhiên sẽ có một key member hay một chuyên gia trong lĩnh vực mà squad đang đảm nhận. Tập hợp các chuyên gia này ở mỗi squad trong một tribe thì được gọi là một **chapter**. Nên nhớ là trong một tribe các bạn nhé. Bởi vì các chapter chỉ nên đảm nhận một lĩnh vực để phát huy hết khả năng của mình. 

Chapter cũng cần một chapter lead để quản lý các member trong một chapter. Nghe có vẻ hơi thừa nhưng vị trí chapter lead sẽ đóng góp vai trò rất quan trọng trong việc phát triển của các member trong chapter. Họ là người support cũng như người tạo ra đòn bẩy như đặt ra các challenges để các member có thể phát triển lên một tầm cao mới. Bởi vì như các bạn đã biết một chuyên gia muốn phát triển thêm thì khó như thế nào rồi đấy. Bên cạnh đó chapter lead cũng là người có tiếng nói trong việc tuyển dụng và kỹ thuật trong dự án.


* **Guild** 

yeah y như trong game vậy, rốt cuộc ngoài cuộc sống dev chúng ta cũng có một guild để thuộc về. **Guild** là một tổ chức bao gồm các thành viên có cùng chung một sở thích. Các thành viên có thể ở bất kì squad, chapter hay tribe nào, chỉ cần có chung sở thích chung chí hướng, họ đều có thể thành lập và là thành phần của một guild. 

Mỗi guild đều có một vị trí quan trọng đó là điều phối viên (Coordinator). Đây là người tổ chức, kêu gọi các thành viên và điều hành các cuộc họp trong guild. Nhưng các bạn không nên nhầm lẫn điều phối viên là guild master. Với guild thì không có khái niệm phân cấp nên cũng không có cái gọi là guild master đâu nhé. 

Mục đích chính của việc có guild thì tương tự như với chapter đó là giải quyết các vấn đề bất đồng giữa các team (squad hay tribe...), giúp giữ được tính minh bạch chính xác của thông tin, chức năng, nhiệm vụ... Nó là cầu nối để đồng bộ giữa các team, giúp các team luôn giữ được sự liên kết và tập trung. Hoặc đôi khi là giúp đỡ nhau trong bất cứ việc gì. Hãy luôn nhớ dự án là việc của một tập thể không phải việc của bất cứ một cá nhân nào nên khi bạn gặp bất cứ issue gì mà bạn không thể giải quyết, chapter cũng không thể giải quyết, thì hãy kêu gọi guild, người đông thế mạnh là đây.

À còn có một lưu ý là guild không phải là nơi để giải trí đâu nhé, không phải là guild bóng đá hay guild ăn nhậu gì đâu. Guild mục đích chính là kết nối giữa các feature area để giải quyết các bài toán integration, là các diễn đàn chia sẽ kiến thức, trao đổi các case study. Ví dụ các chapter muốn giao lưu với nhau có thể thông qua guild sự kiện để tổ chức một giải hackathon, ctf... hay nếu có mâu thuẩn gì giữa các solution thì có thể nhờ guild tester kiểm chứng. 

* **Trio** 

Một **trio** là một dạng đặc thù của một tribe. Như hình vuông là dạng đặc biệt của hình chữ nhật vị. Một tribe được gọi là một trio khi nó có 3 leader bao gồm design lead, product area lead và tribe lead


* **Alliance** 

Một **Alliance** được tạo bởi 3 trio. 3 trio chứ không phải là 3 tribe nhé. Và đương nhiên để bảo đảm thì Alliance cũng phải có 3 vị trí design lead, product area lead và tribe lead.

* **Chief Architect** 

Cuối cùng là vị trí quan trọng nhất - **Chief Architect**. Vì là Chief nên tất nhiên vị trí này do 1 người đảm nhiệm. Đây là người vạch ra tầm nhìn về kiến trúc hệ thống, tham mưu cho việc design cũng như giải quyết các vấn đề về system architecture.  Cứ cái gì liên quan đến kiến trúc hệ thống thì Chief Architect sẽ đóng vài trò quyết định. Chẳng hạn như sẽ dùng dịch vụ cloud nào, xây dụng hệ thống CI/CD ra làm sao... 

Chief Architect có quá nhiều thứ phải xử lý nên để giảm tải áp lực cho Chief Architect thì chúng ta sẽ cần một nhóm các **system owner**, người sẽ chịu trách nhiệm chính trong việc giám sát, kiểm tra các vấn đề liên quan đến sự vận hành của hệ thống. System owner sẽ được chia thành 2 phần là dev và ops và đưa ra các nhiệm vụ cụ thể sẽ được giao cho các tribe phân về cho các squad xử lý. Tất nhiên các system owner phải thông qua Chief Architect để có thể quyết định cấu trúc của hệ thống.



## Lợi ích của Spotify Model

Phần này mình chắc không cần nói nhiều, về lợi ích thì Spotify’s Agile Scaled Model hoàn toàn mang cho mình lợi ích của agile (hay chính scrum). Một số lợi ích có thể kể đến như:

* Đẩy nhanh hiệu suất
* Giảm thiểu những quy trình phức tạp do hệ thống quản lý phân tầng mang đến
* Giải quyết hiệu quả các bài toán thử thách ngắn hạn
* Hạn chế tối đa sự phụ thuộc cũng như việc điểu khiển
* Linh hoạt trong việc giải quyết vấn đề, giúp mọi issue có thể ra đi dễ dàng và nhanh chóng hơn
* Giữ tính rõ ràng và minh bạch trong tất cả các lĩnh vực
* Thúc đẩy sự phát triển của tất cả mọi người
* Phù hợp với hầu hết các môi trường làm việc.

## Một số điểm cần nắm khi áp dụng Spotify Model

Có một đặc điểm quan trọng khi áp dụng agile đó chính là tính tự chủ. Spotify agile scaling model cũng không ngoại lệ, tính tự chủ phải được đặt trên hàng đầu và bên cạnh đó cũng cần có sự tin tưởng và một số điểu sau:

* Phải có kiến thức tốt về agile và scrum (hay bất cứ quy trình hiệu quả nào phát sinh từ agile), đây là yếu tốt cốt lõi. Phải nắm được agile thì mới scaling agile được
* Tiêu chuẩn hóa quy định cho các team, phải phân biệt rõ ràng giữa các squad, tribe, chapter, guild. 
* Có hệ thống quản lý tin cậy, đầy năng lực và luôn đổi mới trong tư duy chiến lượt. Lập kế hoạch, vận hành và theo dõi hợp lý thông qua các kênh trực tiếp
* Đảm bảo tính liên kết trong từng đơn vị. Sự liên kết này nên hướng đến chiến lượt của sản phẩm, tính năng của sản phẩm
* Chấp nhận thất bại và đề ra chiến lượt phục hồi tốt hơn là phòng tránh chúng. Nên nhớ humans make mistake. 


# Lời kết

Nên nhớ Spotify thành công như ngày hôm nay không phải dựa trên bất cứ phép màu nào mà là do chính họ đã có một mô hình phát triển đúng đắn. Tuy nhiên không phải cứ áp dụng cách của họ và bạn sẽ thành công. Những gì chúng ta học được chỉ là cơ sở phát triển của chúng ta sau này. Có thể dự án, công ty của bạn chưa thực sự phù hợp với mô hình này. Nhưng chúng ta hoàn toàn có thể dựa trên nó thay thế một số điểm chưa phù hợp, thêm vào những cái hay ho của chúng ta, tạo ra một mô hình của riêng chúng ta. Đáng để thử đấy chứ. 

Cảm ơn các bạn đã đọc đến đây. 
Chúc một ngày tốt lành.

**Nguồn tham khảo dịch:** https://medium.com/scaled-agile-framework/exploring-key-elements-of-spotifys-agile-scaling-model-471d2a23d7ea