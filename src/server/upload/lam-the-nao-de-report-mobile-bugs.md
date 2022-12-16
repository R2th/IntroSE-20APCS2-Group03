Trong quá trình kiểm thử Mobile, nếu bạn tìm thấy một lỗi trong ứng dụng di động, bạn cần báo cáo để sửa nó. Bug report yêu cầu một số thông tin cần thiết và đủ cho developer có thể tái tạo và fixed nó. Báo cáo lỗi rất quan trọng đối với product owner, product manager và các developer . Đầu tiên, một bug report sẽ nói với các product owner, product manager về các vấn đề họ đã không nhận thức được. Bug report cũng giúp xác định có thể các tính năng mới không ai nghĩ đến và, cuối cùng nhưng không kém phần quan trọng, nó cung cấp thông tin hữu ích về cách khách hàng có thể sử dụng phần mềm một cách suông sẻ nhất. Tất cả thông tin này có thể được sử dụng để cải thiện phần mềm của bạn.

Một bug report nên chứa càng nhiều thông tin càng tốt để xác định, tái tạo và sửa lỗi, đừng cố gắng thêm các thông tin không cần thiết. Một điểm quan trọng khác là bạn chỉ nên mô tả một lỗi cho mỗi bug report. Vậy làm thế nào để có thể report Mobile bugs hiệu quả và các developers sẽ chấp nhận những bugs của mình. Hãy cũng tôi tìm hiểu nhé!
![](https://images.viblo.asia/37b00034-17ea-43fc-b71f-6ebf58c6b54e.jpg)

**1. Bug ID:**

Một bug phải có một định danh duy nhất như một số hoặc một kết hợp các ký tự hoặc số. Nếu bạn sử dụng một công cụ quản lý lỗi (jira, redmine...), công cụ đó sẽ xử lý Bug ID cho bạn. Nếu không, hãy nghĩ về một hệ thống ID duy nhất cho bạn

**Example:**

•Không nên: 123 là một ID duy nhất, nhưng bạn có thể có một vài các dự án có ID giống nhau

•Nên: AppXYZ-123 là tốt hơn bởi vì bạn đang kết hợp một ID với tên viết tắt dự án và một con số

**2. Description - Mô tả:**

Tạo một mô tả ngắn nhưng có ý nghĩa để cung cấp cho developer một cái nhìn tổng quan nhanh về những gì đã sai mà không đi vào chi tiết. Bạn nên ví dụ bao gồm mã lỗi hoặc một phần của ứng dụng trong đó xảy ra lỗi.

**Example:**

•Không nên: “The app crashed”, “White page”, “Saw an error”, “Bug”

•Nên: “Page not found 404 on detail screen”, “Timeout, when sending a search request"...

**3. Step to reproduce - Các bước để tái hiện:**

Đây là một trong những điểm quan trọng nhất. Cung cấp chính xác các bước cùng với dữ liệu đầu vào về cách tái tạo bug. Nếu bạn có thể cung cấp loại thông tin này, bug sẽ rất dễ fixed trong hầu hết các trường hợp.

**Example:**

•Không nên: “Tôi đã cố gắng để thực hiện hành động search”

•Nên: "Khởi tạo ứng dụng và nhập từ khóa vào trường nhập liệu tìm kiếm. Nhấn nút tìm kiếm và bạn sẽ thấy mã lỗi 783 trên trang tiêu đề kết quả tìm kiếm.

**5. Expected Result - Kết quả mong muốn:**

Trong phần này bạn nên mô tả những gì bạn mong đợi xảy ra khi lỗi xảy ra.

**Example:**

•Không nên: “Nó nên hoạt động." , "Tôi đã không gặp phải sự cố.”

•Nên: "Tôi dự kiến sẽ thấy một trang kết quả tìm kiếm với một danh sách có thể cuộn của 20 mục."

**6. Actual Result - Kết quả thực tế:**

Điều gì đã xuất hiện khi bugs xảy ra? Viết xuống dưới kết quả thực tế, những gì đã sai hoặc lỗi đó là trả lại.

**Example:**

•Không nên: “Nó chỉ không hoạt động."

•Nên: "Trang kết quả tìm kiếm trống." hoặc là "Xuất hiện mã lỗi 567 trên trang kết quả tìm kiếm."

**7. Workaround / Add information - Giải pháp thay thế / Thêm thông tin:**

Nếu bạn đã tìm thấy một cách để tiếp tục sử dụng ứng dụng khi xảy ra bugs đó, hãy giải thích các bước của bạn. Những bước này rất quan trọng để giúp developer fixed bug mà không gây ra các issues khác hoặc chỉ ra một cách mà chúng ta có thể tiếp tục testing, tránh làm mất thời gian vì issue đó . Trên mặt khác, một cách giải quyết có thể rất hữu ích cho nhóm hỗ trợ khách hàng để giúp khách hàng tiếp tục sử dụng ứng dụng cho đến khi lỗi được sửa chữa.

**Example:**

•Không nên: “Tôi đã tìm thấy một cách giải quyết."

•Nên: "Nếu bạn đặt thiết bị ở chế độ ngang, nút tìm kiếm được kích hoạt và người dùng có thể tìm kiếm lần nữa."

**8. Reproducible - Xác suất xảy ra:**

Nếu bạn tìm thấy một lỗi có thể lặp lại, thì điều đó thật tốt, nhưng nó có xảy ra đối với mọi bugs? Nếu điều đó xảy ra mọi bugs, thì điều đó thật tuyệt vời, developer có thể nhanh chóng fixed nó. Nhưng nếu lỗi chỉ xảy ra với xác suất 10, 20 phần trăm, nó khó tìm hơn nhiều. Hãy chắc chắn rằng bạn cung cấp thông tin này, vì nó rất hữu ích cho developers và sẽ ngăn chặn họ close bug với lời bình luận rằng bug không thể tái hiện.

**Example:**

•Không nên: “"Đôi khi nó xảy ra."

•Nên: "Lỗi này xảy ra với xác suất 2/10 lần search"

**9. Operating System, Mobile Platform and Mobile Device - Hệ điều hành, nền tảng di động và thiết bị di động:**

Áp dụng tương tự như trên cho hệ điều hành, nền tảng di động và thiết bị di động. Viết ra hoạt động hệ thống, nền tảng di động và thiết bị có lỗi xảy ra.

**Example:**

•Không nên: “Xảy ra trên Android” or “Xảy ra trên iOS”

•Nên: "Android, Version 4.1.2 Google Nexus 4” or “iOS, Version 6.1 iPhone 4S"

**10. Software Build Version - Bản build của phần mềm:**

Một thông tin thực sự hữu ích khác làbản build hiện tại của ứng dụng nơi xảy ra lỗi. Có thể bạn đã tìm thấy sự cố trong phiên bản 1.2, nhưng đã có
phiên bản mới hơn có sẵn trong đó lỗi đã được sửa. Điều này sẽ ngăn developer lãng phí thời gian bằng cách cố gắng tái tạo một bug mà đã được fixed.

**Example:**

•Không nên: “Không có thông tin”

•Nên: “App build version 1.2.3”

**11. Severity - Mức độ:**

Mỗi lỗi bạn tìm cần setting một mức độ nghiêm trọng. Công cụ quản lý bug sẽ cung cấp cho bạn một số loại hoặc bạn phải xác định chúng với team của bạn. Nó quan trọng để xác định bug ở mức độ nghiêm trọng vì developers sẽ dựa vào nó ưu tiên thời gian fixed bug của họ sao cho phù hợp và các bug quan trọng sẽ được fixed trước. Nếu thông tin này là không được cung cấp, phải mất nhiều thời gian hơn để tìm đúng lỗi cần được sửa trước khi phát hành. Mặc định mức độ nghiêm trọng là: Quan trọng, Cao, Trung bình và Thấp.

**Example:**

•Không nên: “Không có thông tin”

•Nên: “Critical” or “Medium”

**12. Bug Category - Danh mục bug:**

Bên cạnh mức độ nghiêm trọng, loại bugs cũng rất hữu ích. Product owner hoặc developer có thể lọc theo danh mục để có cái nhìn tổng quan về tình trạng hiện tại của lỗi cho mỗi loại. Ví dụ, nếu có rất nhiều lỗi UX, đây có thể là một chỉ số về UI/UX kém hoặc còn thiếu một chuyên gia thiết kế trong nhóm, nghĩa là ứng dụng cần một số cải tiến thiết kế hơn.

**Example:**

•Không nên: “Không có thông tin”

•Nên: "Functionality” or “UX” or “Performance”

**13. Screenshot or Video - Ảnh chụp màn hình hoặc video đính kèm:**

Bất cứ khi nào bạn tìm thấy một lỗi, cố gắng chụp màn hình hoặc một video để cung cấp cho nhà phát triển nhiều thông tin hơn. Khi cung cấp ảnh chụp màn hình, hãy sử dụng công cụ chỉnh sửa ảnh để đánh dấu lỗi trong ảnh chụp màn hình. Một video cũng là một cách tuyệt vời để mô tả một lỗi mà bạn đã gặp. 

**Example:**

•Không nên: “No screenshots or videos attached” or “Screen-shot1.png”

•Nên: “01_InsertSearchTerm.png, 02_SearchResult-PageWithError.png”

**14. Log Files - Tập tin đính kèm:**

Nếu ứng dụng của bạn gặp sự cố hoặc đóng băng, hãy kết nối thiết bị với máy tính và log các files nơi xảy ra sự cố. Nếu bạn không thể làm được điều đó, hãy nhờ sự hỗ trợ từ dev. Các thông tin này cực kỳ hữu ích cho dev để giúp họ biết ngay trong class nào có lỗi hay lỗi đã xảy ra tại sao. 

**Example:**

•Không nên: “Không có thông tin nào”

•Nên: “Tập tin đính kèm tập tin vào báo cáo.”

**15. Tester who found the Bug:**

Viết tên của bạn hoặc tên của tester đã tìm thấy bugs. Developers hoặc product owners có thể có một số câu hỏi về lỗi được báo cáo và tất nhiên họ sẽ muốn liên lạc trực tiếp với tester đã tìm ra vấn đề. Trong hầu hết các trường hợp, điều này được tự động thực hiện bởi hệ thống quản lý bug nơi mỗi người dùng có cho riêng mình tài khoản. Nếu không, hãy chắc chắn rằng bạn đã thêm địa chỉ email của bạn

**Example:**

•Không nên: “Không có thông tin nào”

•Nên: “Phong Nguyễn" or "nguyen.thanh.phong@gmail.com"

>>>
**Note:**
Mình cũng đã note lại một vài điều lưu ý khi viết Bugs report:

• Trước khi báo cáo, điều quan trọng không kém là kiểm tra xem liệu bug đó đã được báo cáo hay chưa?

Khi một bug bị trùng lặp (duplicate) nó sẽ là một gánh nặng trong chu kỳ test. Việc này sẽ làm mất thời gian của tester và cả developers.

• Đọc lại báo cáo bug trước khi nhấn nút submit

Đọc lại tất cả các câu, từ và các bước được dùng trong báo cáo lỗi. Nếu có bất kỳ câu nào tạo ra sự mơ hồ có thể dẫn đến hiểu nhầm, tester phải thay thế các từ ngữ này để tránh gây hiểu lầm và để báo cáo lỗi rõ ràng hơn.

• Không sử dụng ngôn ngữ gây tổn thương người đọc

Sẽ tốt hơn khi tester vừa tìm ra lỗi vừa không dùng các từ ngữ gây tổn thương đến dev hoặc bất kỳ người nào đọc báo cáo.

**KẾT LUẬN:**

Mỗi tester hoặc mỗi công ty sẽ có những cách viết bugs report khác nhau, nhưng theo mình tất cả các bước trên đều sẽ có trong những bugs report. 

Hy vọng mọi người sẽ thích bài viết này của mình.

#Bài viết có sử dụng tư liệu trong cuốn sách : "Hands-on Mobile App Tesing" của Daniel Knott và website : "https://bugclipper.com/blog/how-to-report-mobile-bugs-effectively/