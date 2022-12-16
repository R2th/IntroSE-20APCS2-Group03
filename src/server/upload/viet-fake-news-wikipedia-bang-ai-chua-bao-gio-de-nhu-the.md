Xin chào các bạn, hôm nay mình sẽ hướng dẫn viết Fake new bằng AI với văn phong y hệt wikipedia.

# 1. Giới thiệu sơ về NLP
Đầu tiên, nếu bạn muốn thực hành luôn thì có kể bỏ qua các phần dẫn nhập mà xuống ngay luôn phần thực tế, phần này mình sẽ giới thiệu chút để các bạn thấy hứng thú có thể tự nghiên cứu thêm.

Trí tuệ nhân tạo (**AI**) rất là rộng với với các mảng kiến thức khác nhau, và ngày nay thì một trong những hướng nghiên cứu mạnh nhất chính là Mạng nơ ron nhân tạo (**Neural Network**) với học sâu (**Deep Learning**) là hướng chủ đạo trong ngành. Các ứng dụng lớn của học sâu có thể kể đến như là:
- **Xử lý hình ảnh**: phân tích ảnh sang từ ngữ, nhận diện hình ảnh, phân loại, ...
- **Xử lý ngôn ngữ**: dịch máy, phân tích tiếng nói, sinh ngôn ngữ, tóm tắt văn bản, ...

Trong **xử lý ngôn ngữ tự nhiên**, các cách tiếp cận hiện đại sử dụng Mạng nơ ron nhân tạo tỏ ra vượt trội so với các cách tiếp cận cổ điển (cây ast, lexical, grammar, ...) vì nó có thể tự học mà không cần đòi hỏi nhiều công sức cũng như độ chính xác rất cao.

Sinh văn bản là một tác vụ của AI mà từ đầu vào là 1 câu ngắn, hay vài keyword, ta có thể tạo nên một văn bản hoàn chỉnh với đầy đủ ngữ pháp và có ngữ nghĩa hợp lý. Đại diện cho tác vụ này chính là mô hình **GPT**, được phát triển bởi **OpenAI** và tới nay đã có 3 phiên bản ra đời với độ khủng ngày càng gia tăng. Với sự tăng cao về độ lớn mô hình, GPT ngày càng trở nên tinh xảo và hoàn thiện, khi sử dụng sẽ cho ta cảm giác như nó thật sự hiểu được ngữ nghĩa của từng thành phần trong câu.

Giới thiệu sơ qua tổng quan vậy thôi, chi tiết các bạn có thể tìm hiều qua các keyword mình đã tô đậm trong bài.

Mô hình được sử dụng trong bài này là **GPT2** đã được huấn luyện qua bộ dữ liệu **wikipedia tiếng Việt**. Các bạn có thể sử dụng nó để sinh văn bản như ví dụ của mình, hoặc tiếp tục sử dụng mô hình trong các tác vụ khác phù hợp với mục tiêu của các bạn (downstream task).

# 2. Thực hành
Mình có tạo sẵn 1 Notebook Google Colab ở [đường đẫn này](https://colab.research.google.com/drive/1LGXE39Fu7Ek-EyP5t0KJHlbbtayYGxMn?usp=sharing). Các bạn có thể bấm vào và chạy các ví dụ trong bài 1 cách nhanh nhất hoặc có thể chỉnh sửa theo ý muốn, nếu muốn lưu lại các chỉnh sửa thì nhớ tạo bản sao trong drive của các bạn.

Đầu tiên thì mô hình gốc của mình được đặt ở trang Huggingface tại [link này](https://huggingface.co/danghuy1999/gpt2-viwiki). Nếu các bạn thấy thích thì có thể vào like ủng hộ mình. Huggingface cũng là nơi lưu trữ các mô hình ngôn ngữ hiện đại lớn nhất mà mình biết, cũng như rất dễ để sử dụng và học tập. Chi tiết các bạn có thể xem thêm tại [trang chủ Huggingface](https://huggingface.co/).

Khi mở file colab ở trên lên, bạn sẽ thấy giao diện như sau:

![Giao diện chạy colab GPT2 viwiki](https://images.viblo.asia/c7b8697b-5412-442e-97a1-c295ab9bdbbb.png)

Bấm vào mũi tên **(>)** 3 section đầu. Lần đầu chạy sẽ hiện lên thông báo như vầy: 

![](https://images.viblo.asia/fb0324a0-f012-44d6-94ef-7c5f19c6e278.png)


Vì Notebook của mình chỉ để chạy mô hình nên các bạn cứ tự tin mà bấm **Run anyway** nhé (nếu không thì tự tạo file rồi copy qua chạy cũng được).

Tiếp theo thay đổi tham số chạy, bao gồm **chuỗi mở đầu (text)**, **độ dài mỗi câu (max_length)** và **số câu trả về (num_return_sequences)**:

![](https://images.viblo.asia/a474718d-d212-4847-af7a-ef9b06b70c97.png)

Sau khi đã chỉnh sửa, chạy block trên bằng cách bấm **(>)** .

Cuối cùng thì bấm vào chạy block cuối cùng thôi và chờ đợi mô hình sinh kết quả. Sau khoảng tầm 30s tùy thuộc vào tham số, kết quả trả về có thể ví dụ như sau:

![](https://images.viblo.asia/a2172599-99ed-4e6b-a3ec-c93e9bbf137d.png)

Kết quả sinh ra được 3 đoạn văn khác nhau với văn phong y hệt như Wikipedia tiếng Việt vậy, bạn có thể chỉnh sửa lại nội dung bằng tham số tùy theo ý thích của bạn.

Và đó là demo ví dụ về mô hình của mình, bạn có thể sử dụng nó để làm ý tưởng viết văn gì đó, hoặc để dùng nó cho các mục đích học thuật khác. Nếu thấy hay có thể vào [link này](https://huggingface.co/danghuy1999/gpt2-viwiki) để like ủng hộ mình nhé.