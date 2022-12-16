Chào các bạn, trong [bài viết trước](https://viblo.asia/p/lam-the-nao-de-bo-sung-chi-tiet-cho-user-story-bJzKmVDwZ9N) mình có đề cập đến các cách để bổ sung chi tiết cho user story, một trong số đó chính là chia nhỏ user story đó thành nhiều user story nhỏ hơn. Trong bài viết đó, do phải đề cập đến nhiều cách thức bổ sung chi tiết cho 1 user story nên mình chưa đi sâu được vào kỹ thuật phân tách user story này, nên hôm nay quyết định viết thêm một bài khác nhằm chia sẻ kỹ hơn với các bạn.

Đầu tiên thì mình xin phép gửi tới các bạn tấm hình sẽ bao gọn kiến thức của bài viết này
![1_gMdImBM-FfOav2Cvbl4Eew.png](https://images.viblo.asia/5d300c49-10c7-4f6e-b729-55434dfa8c59.png)

# 1. Chia nhỏ theo vai trò người dùng
Đối với 1 user story thì bản thân nó đã chỉ tập trung vào một đối tượng người dùng cụ thể, vậy thì còn chia nhỏ gì ở đây nhỉ? Tuy nhiên, vai trò người dùng mình muốn nhắc đến ở đây là vai trò của các người dùng liên quan đến "câu truyện" mà người dùng trong phần "as ..." đang phải thực hiện.

Nghe hơi lằng nhằng nhỉ, thử ví dụ như thế này nhé:
* Chúng ta có 1 người dùng là quản lý phòng
* Người dùng thứ 2 là nhân viên sales
* Người dùng thứ 3 là nhân viên IT

Ok, giờ ta có 1 user story như sau: Là một quản lý phòng, tôi muốn quản lý tiến độ làm việc của nhân viên để tôi có thể đánh giá năng suất làm việc của họ

Nào, giờ thì với nhân viên sales và nhân viên IT, liệu tiến độ làm việc của họ có giống nhau không? (VD: đối với nhân viên sales là số lượng hợp đồng chốt được tính theo KPI, còn nhân viên IT thì là số feature hoàn thiện) Rõ ràng việc quản lý tiến độ làm việc của hai đối tượng này khác nhau, nên ta cần phải tách ra: 
* Là một quản lý phòng, tôi muốn quản lý tiến độ làm việc của nhân viên sales để ....
* Là một quản lý phòng, tôi muốn quản lý tiến độ làm việc của nhân viên IT để ....

Khi đó chúng ta sẽ hình dung được cách đánh giá giữa 2 nhân viên này khác nhau, qua đó dễ dàng phân chia tính năng hơn

# 2. Chia nhỏ theo workflows
Cách này thường dành cho những story khá lớn, việc thực hiện cần chia ra nhiều bước khác nhau. 

Để thực hiện chia nhỏ user story loại này, đầu tiên chúng ta nên đưa ra workflow dưới dạng các diagram với từng thành phần tham gia, với từng step cụ thể tạo thành một bức tranh chung. Sau đó ta thực hiện phân tách ra thành các user story ứng với từng hoặc một vài step trong workflow đó để team dễ control công việc cũng như task được chia nhỏ ra.

VD: Là một nhân viên, tôi muốn xin nghỉ phép trên hệ thống, để tôi có thể thực hiện nghỉ phép trong trường hợp cần thiết

Ta sẽ chia nhỏ ra như sau:
* Là một nhân viên, tôi muốn tạo đơn xin nghỉ phép trên hệ thống, để tôi có thể thông báo đến cấp trên về việc nghỉ phép của mình
* Là một trưởng phòng, tôi muốn duyệt đơn xin nghỉ phép của nhân viên trên hệ thống, để tôi có thể cho phép nhân viên nghỉ
* Là một nhân viên, tôi muốn nhận được thông báo đơn xin nghỉ phép của mình đã được duyệt, để tôi biết rằng cấp trên đã cho phép tôi nghỉ

# 3. Chia nhỏ theo data type
Cách này mình thấy hay áp dụng nhất cho những hệ thống mang tính chất quốc tế một chút (đây là kinh nghiệm cá nhân, chứ mình không đảm bảo là chỉ những hệ thống mang tính chất quốc tế mới dùng nhé, bản thân mình cũng chưa được trải nghiệm làm việc trên nhiều hệ thống nên không dám chắc). Phần này mình sẽ lấy ví dụ luôn:

ABC là một hệ thống cung cấp công thức nấu ăn cho người dùng, hiện nó đang phát triển mạnh tại Anh và Mỹ. Tuy nhiên, hệ đo lường về khối lượng, độ dài,... của 2 nước này lại khác nhau, nên ta có vụ phân tách user story như sau:

User story ban đầu: Là một người dùng, tôi muốn lấy được công thức nấu ăn với định lượng chính xác, để tôi có thể thực hiện món ăn ngon nhất có thể

Ta sẽ tách được ra như sau:
* Là một người dùng tại Anh, tôi muốn lấy được công thức nấu ăn với định lượng chính xác theo hệ đo lường Anh quốc, để tôi...
* Là một người dùng tại Mỹ, tôi muốn lấy được công thức nấu ăn với định lượng chính xác theo hệ đo lường Metric, để tôi...

# 4. Chia nhỏ theo dữ liệu đầu vào
Kiểu chia nhỏ này thường hay áp dụng cho các ô search (đa phần là vậy), ngoài ra là các chức năng chạy theo điều kiện từ dữ liệu đầu vào. Ta sẽ dựa trên dữ liệu mà người dùng nhập/lựa chọn để phân tách user story tương ứng. Ví dụ user story như sau:

Là một người mua sắm, tôi muốn tìm kiếm sản phẩm, để tôi có thể mua được sản phẩm thích hợp với mong muốn của mình

Ta sẽ phân tách được ra thế này:
* Là một người mua sắm, tôi muốn tìm kiếm sản phẩm theo mức giá, để tôi có thể mua được sản phẩm thích hợp với túi tiền của mình
* Là một người mua sắm, tôi muốn tìm kiếm sản phẩm theo màu sắc, để tôi có thể mua được sản phẩm thích hợp với thẩm mỹ của mình

# 5. Chia nhỏ theo browser/platform
Khi làm sản phẩm, luôn có những quy định ban đầu rằng chúng ta sẽ hỗ trợ những nền tảng nào, tuy nhiên sẽ xuất hiện những trường hợp với từng tính năng cụ thể, ta chỉ muốn nó xuất hiện trên một vài nền tảng cụ thể. Lúc này ta có thể chia nhỏ nó dạng như này:
* Là một người dùng, tôi muốn cập nhật ảnh đại diện của mình bằng trình duyệt trên máy tính, để....
* Là một người dùng, tôi muốn cập nhật ảnh đại diện của mình bằng ứng dụng trên điện thoại, để....

Hoặc chia nhỏ theo loại trình duyệt luôn, kiểu 1 số chức năng ta sẽ không thể build nó trên IE nhưng trong yêu cầu ban đầu xây dựng hệ thống vẫn phải support IE, ta sẽ ghi rõ các trình duyệt được hỗ trợ:
* Là một người dùng, tôi muốn cập nhật video đại diện của mình bằng trình duyệt Chrome, để....
* Là một người dùng, tôi muốn cập nhật video đại diện của mình bằng trình duyệt Cốc Cốc, để....

# Tạm kết
Trên đây mình đã đề cập đến 5 cách để chia nhỏ user story, tuy nhiên trong hình vẽ ở đầu bài thì vẫn còn phân chia theo business rules, acceptance criteria & operations nữa nên hẹn các bạn quay lại ở phần 2 nhé. Mình muốn chia nhỏ 2 phần để có thêm thời gian nghiên cứu kỹ hơn về 3 cách còn lại.

## Nguồn bài viết
1. https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories
2. https://ancaonuta.medium.com/how-to-split-user-stories-b55f20ea0a4e
3. https://techbeacon.com/app-dev-testing/practical-guide-user-story-splitting-agile-teams