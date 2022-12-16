![](https://images.viblo.asia/9858eafc-e548-4428-ad1e-3189f6997cc8.jpeg)

GitHub Copilot là một pair programmer thế hệ tiếp mới, được hỗ trợ bởi AI cho phép bạn viết code nhanh hơn trong khi tránh những lỗi thường gặp. Là một lập trình viên, tôi thấy điều này rất thú vị vì nó mang đến một bộ tính năng mới so với các công cụ hiện có.

Tuy nhiên, mới chỉ vài ngày kể từ khi Copilot được giới thiệu và nó vẫn đang ở giai đoạn preview. Vì vậy, trong bài viết này, tôi sẽ khám phá các tính năng của GitHub Copilot và thảo luận về cách nó sẽ thay đổi cách chúng ta viết mã.

## GitHub Copilot — Your AI-Powered Pair Programmer

Xem demo cách GitHub Copilot hoạt động
https://twitter.com/github/status/1409883156333879300?s=20

GitHub Copilot được xây dựng dựa trên thuật toán tạo ngôn ngữ dựa trên AI Codex, do OpenAI tạo ra. Công ty nghiên cứu này nổi tiếng với các mô hình AI tạo ngôn ngữ mạnh mẽ như GPT-3.

Cho dù bạn đang làm việc trên một ngôn ngữ mới hay chỉ học viết mã, GitHub Copilot sẽ giúp bạn tìm ra cách của mình mà không cần liên tục tìm kiếm câu trả lời trên Internet

> Be it a set of comments or an existing code, as you type, GitHub Copilot adapts to the way you write code and auto-complete the code snippet or the entire function.

Nó giúp bạn nhanh chóng khám phá các cách thay thế để giải quyết vấn đề, viết test và khám phá các API mới bằng cách đưa kiến thức bạn cần vào tầm tay của bạn.

> The suggestions given by the GitHub Copilot are backed by billions of lines of code that users have publicly contributed to GitHub

Khi nói đến các tính năng, có 3 điều làm cho nó nổi bật so với các công cụ tương tự khác. Vì vậy, chúng ta hãy xem xét chi tiết 3 tính năng đó!

## Tính năng của Copilot

### Speaks all the Languages You Love

GitHub Copilot được thiết kế để hoạt động với một tập hợp lớn các framework và ngôn ngữ

> The current technical preview works exceptionally well for Python, JavaScript, TypeScript, Ruby, and Go languages

Hơn nữa, chúng ta có thể mong đợi rằng sự hỗ trợ về ngôn ngữ và framework này sẽ được tăng lên trong các phiên bản tiếp theo, biến nó thành một công cụ toàn cầu.

### You’re the Pilot

Dù GitHub Copilot gợi ý gì, bạn sẽ luôn chịu trách nhiệm với tư cách là nhà phát triển. Nếu bạn không thích đề xuất đầu tiên mà nó đưa ra, nó sẽ cung cấp cho bạn nhiều lựa chọn thay thế hơn.

> You can go through the alternative suggestions, decide on what to accept and reject, and do manual edits to the suggested code. And as you use it understands your style and adapts to you.

### Extends Your Editor

> GitHub Copilot is currently available as a Visual Studio Code extension and works wherever the VS Code works.

Có thể là máy của bạn hoặc trong Không gian đám mây trên GitHub, khi bạn cung cấp chuỗi tài liệu, nhận xét, tên chức năng hoặc toàn bộ mã, GitHub Copilot sẽ đưa ra nhiều đề xuất trong tầm tay của bạn

> Lưu ý: Trong thời gian preview, nó chỉ cung cấp miễn phí cho một số người thử nghiệm có giới hạn. Nếu đủ may mắn, bạn sẽ có thể lấy một trong những điểm miễn phí [từ đây](https://github.com/features/copilot/signup).

![](https://images.viblo.asia/8de803e4-35c4-4618-81de-8241e5b21d79.png)

Bên cạnh đó, tiện ích mở rộng này sẽ gửi ngữ cảnh từ editor của bạn tới dịch vụ GitHub Copilot, dịch vụ này sử dụng thuật toán Codex để tổng hợp và đưa ra các đề xuất. Sau đó, khi bạn nhập, Copilot sẽ đề xuất các đoạn code mà bạn có thể thêm hoặc từ chối bằng một lần nhấp nút

## Điểm tốt và xấu của Copilot

Có một pair programmer ảo giúp bạn tiết kiệm thời gian và tập trung,  phải không? Tuy nhiên, sự tiếp nhận mà GitHub Copilot nhận được không hoàn toàn hài lòng. Hãy xem lý do của điều đó

### Ưu điểm của GitHub Copilot

* **Không chỉ là tự động hoàn thành** GitHub Copilot do Codex cung cấp không phải là ứng dụng đầu tiên thuộc loại này. Cho dù ngữ cảnh của bạn nằm trong chuỗi tài liệu, nhận xét, tên hàm hay chỉnh mã, Copilot sử dụng ngữ cảnh bạn đã cung cấp và tổng hợp mã để khớp, giúp nó hiểu nhiều ngữ cảnh hơn hầu hết các trợ lý mã hiện có.
* **Tự động điền mã lặp lại** Bạn mệt mỏi với việc viết các mẫu mã lặp đi lặp lại? GitHub Copilot hoạt động tuyệt vời để nhanh chóng tạo ra các mẫu mã lặp lại. Bạn chỉ cần cung cấp một vài ví dụ, và Copilot sẽ chăm sóc và tạo phần còn lại.
* **Tạo phương án thay thế** Khi bạn viết một dòng mã, Copilot sẽ hiển thị cho bạn danh sách các phương án thay thế. Bạn có thể chọn một trong số chúng hoặc bám vào mã của mình nếu bạn nghĩ nó tốt hơn. Dù thế nào, Copilot cũng sẽ học hỏi và cố gắng thích ứng với phong cách của bạn.
* **Giúp thực hiện các bài test mà tốn ít công sức** Kiểm thử phần mềm là xương sống của bất kỳ dự án phần mềm mạnh mẽ nào. Nhập một gói thử nghiệm đơn vị và GitHub Copilot sẽ đề xuất các thử nghiệm phù hợp với mã của bạn.
* **Bao gồm tất cả các ngôn ngữ bạn yêu thích** Mặc dù, trong bản preview của Github, Copilot hoạt động đặc biệt tốt cho Python, TypeScript, JavaScript, Ruby và Go, nó hiểu được nhiều ngôn ngữ hơn. Nó có thể hỗ trợ bạn tìm kiếm với hầu hết mọi thứ.

### Nhược điểm của GitHub Copilot

* **Bản chất nổi tiếng về chất lượng**  GitHub Copilot tạo ra các đề xuất dựa trên tệp hiện tại sử dụng nó làm ngữ cảnh. Tuy nhiên, nó không thể kiểm tra mã của chính nó, nghĩa là nó thậm chí có thể không chạy hoặc biên dịch.
> Moreover, since Copilot is trained using the publicly available code on GitHub for years, the suggestions can contain depreciated versions of libraries and frameworks.

* **Vi phạm các vấn đề bản quyền** GitHub Copilot đang sử dụng hàng tỷ mã có sẵn công khai để đào tạo công cụ. GitHub tuyên bố rằng các đề xuất có thể chứa nguyên văn từ tập dữ liệu huấn luyện trong khoảng 0,1% thời gian. Một trong những lo ngại quan trọng liên quan đến Copilot là nó có thể vi phạm bản quyền hoặc mã nguồn mở để sử dụng cho mục đích thương mại mà không được cấp phép thích hợp.
* **Sẽ không giúp bạn trở thành một lập trình viên giỏi** Điều này giống như hai mặt của đồng xu. Mặc dù từ một phía, công cụ này sẽ giúp bạn tăng năng suất và nhận được các đề xuất để rút kinh nghiệm. Nhưng mặt khác, điều này tương tự như copy paste từ Stackoverflow. Ít nhất trong Stackoverflow, bạn có nỗ lực thực sự để tìm ra thứ bạn cần, nơi bạn sẽ tìm hiểu thêm bằng cách tìm kiếm.

## Cuối cùng

GitHub Copilot sẽ mở ra cánh cửa cho nhiều thay đổi trong ngành, nhưng mức độ mà những thay đổi đó sẽ thuận lợi hay bất lợi vẫn chưa rõ.

### Nó sẽ tốt hơn theo thời gian

Gần đây, hiệu suất của Copilot đã được đánh giá dựa trên một tập hợp các hàm Python, có phạm vi kiểm tra tốt trong các kho lưu trữ mã nguồn mở. Nhóm đã xóa các chức năng và chỉ giữ lại tên hàm và chuỗi doc. Copilot có thể điền đúng 43% trong lần thử đầu tiên và độ chính xác tăng lên 57% sau mười lần thử. Tương tự như hầu hết các công cụ AI, Copilot cũng trở nên thông minh hơn theo thời gian dựa trên dữ liệu mà nó thu thập từ người dùng.

> [CNBC](https://www.cnbc.com/2021/06/29/microsoft-github-copilot-ai-offers-coding-suggestions.html) states that when a user accepts or rejects a Copilot’s suggestion, Copilot’s machine learning model will use that feedback to enhance its future suggestions

Như GitHub gợi ý, Copilot thực sự là pair programmer của bạn. Nó giúp bạn viết mã nhanh hơn và tốn ít công việc hơn, và đổi lại, nó học hỏi từ phản hồi của bạn để cải thiện các đề xuất của nó. Ai biết được, có thể khi nó học được, GitHub Copilot sẽ trở nên giống con người hơn trong tương lai

### Công việc của chúng tôi không bị đe dọa

Ngoài ra, tôi thấy rằng nhiều người đã nêu ra lo ngại rằng có nguy cơ GitHub Copilot có thể ảnh hưởng đến công việc của các lập trình viên trong tương lai.

> Personally, I don’t believe that AI, no matter how advanced it is, will be able to replace humans, at least in the near future.

AI sẽ trở nên đáng tin cậy và hiệu quả hơn trong việc viết mã chất lượng và một ngày nào đó nó sẽ trở thành đối tác viết mã tốt hơn. Tuy nhiên, các lập trình viên sẽ vẫn quan trọng vì giá trị thực tế của họ đóng góp vào cả việc xây dựng mọi thứ và biết những gì cần xây dựng

### Có rất nhiều câu hỏi chưa được trả lời

Trong phiên bản đầu tiên này, các đề xuất mã do GitHub Copilot đưa ra có thể chứa lỗi, nội dung không phù hợp, xúc phạm hoặc có thể mã thậm chí không có ý nghĩa gì. Nhưng GitHub hứa hẹn sẽ sửa chữa những sai sót của nó khi nó được cải thiện theo thời gian. Sau khi ra mắt GitHub Copilot, nó đã nhận được nhiều đánh giá trái chiều từ các chuyên gia, và nhiều câu hỏi đã được đặt ra và nhiều câu hỏi khác sẽ tiếp tục được đưa ra

> Will GitHub Copilot will manage to overcome its current flaws? Will companies adopt Copilot despite its security issues and copyright infringement? Is this the beginning of AI overtaking the programmer’s job?

Vâng, tất cả các câu trả lời của bạn sẽ phải chờ đợi. Vì vậy, thay vào đó, chúng ta hãy theo dõi xem công nghệ sẽ đưa chúng ta đến đâu trong tương lai. Tuy nhiên, bất chấp những vấn đề mà tôi đã nêu rõ, GitHub Copilot sẽ là một cột mốc quan trọng và sẽ đóng một vai trò quan trọng trong cuộc sống hàng ngày của hàng triệu lập trình viên trong tương lai.

Nguồn [https://blog.bitsrc.io](https://blog.bitsrc.io)