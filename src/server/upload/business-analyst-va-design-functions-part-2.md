### Làm thế nào để biến ý tưởng của khách hàng thành UI và function -- có thể lập trình được (programmable) và có thể kiểm thử được (testable)

Bước 1: Logic và core function
Mỗi ý tưởng nhằm 1 mục đích nhất định. Lấy ví dụ từ idea này:
*AI Taste Predictor Playlists based on users genre, sub genre, votes*
Đây là một app nghe nhạc, khách hàng muốn sau khi user nghe nhạc, khi gần hết bài hát, hệ thống sẽ tự suggest next song. Vậy core function ở đây là:
1. Suggest next song dựa vào 1 thuật toán


Bước 2: Break down core function
Dựa vào core function ta catch up ở trên, ta cần đặt câu hỏi để break down nhỏ hơn và mường tượng flow và cách thức hoạt đông của function
Cùng 1 ví dụ trên, ta có những câu hỏi:
1. Dựa vào đâu để suggest next song:
--> Ta sẽ phải có list bài hát phù hợp và ranking, sau đó hiển thị top ranking order decs
--> Ranking theo tiêu chí gì? Thường là điểm (points)
--> Chấm điểm point như nào? --> Cần thiết kế matrix chấm điểm bài hát (brain-storm với team)
--> Matrix này dựa trên các tiêu chí nào? Như idea thì sẽ dựa trên user's genre, sub-genre - like và dislike
--> Có cần lưu vào database các tiêu chí trên ko ko (cần tham kháo dev team)? --> Chắc chắn có, như giả định bên trên thì bảng user sẽ có thêm những column chứa thông tin (hoặc là 1 bảng mới có relationship với bảng user?)
--> UI lấy thông tin như nào? --> Thiết kế UI/UX cho việc lấy thông tin genre, sub-genre...
--> Hiển thị suggested next song như nào? (Trường hợp này ta dựa vào kinh nghiệm sử dụng app, cụ thể tôi đã nhìn thấy trên youtube suggest song)
--> Logic next song: có cần lưu database ko--> (cần tham khảo dev team) --> Trường hợp này ko cần lưu database, chỉ cần query ra dựa vào điểm số
--> Các vấn đề khác: Suggested song ko nên hiển thị những bài hát mà user đã nghe --> Hệ thống cần có 1 cách thức nào đó nhận biết bài hát user đã nghe (1 trường nhận dạng đã nghe chẳng hạn)


Bước 3: Viết document design/draft mockup và review/static test
Hmm, bước 2 thì thực sự là vất vả rồi, Coi như đã hoàn thành 60% công việc design function. Nhưng không nên chủ quan, ta nên review với team để có cái nhìn đa chiều về function cũng như flow mà đã thiết kế ở bước 2. Chỉnh sửa và viết ra final document

Bước 4: UI chi tiết
Khi có kết quả bước 3, ta bắt tay vào vẽ UI chi tiết (ở dạng mock-up tất nhiên vì BA ko phải là designer, ko thể vẽ chi tiết đến tận pixel)

Bước 5,6 và tiếp tục: tùy từng công ty ta có thể đưa kết quả bước 4 cho designer, hoặc nếu đã có UI có sẵn thì thực ra dev có thể tự vẽ được dựa vào các element. model sẵn có. Cuối cùng là viết User story

END.