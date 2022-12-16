![](https://images.viblo.asia/a64b40fa-5e52-49a4-b9fa-b783b3500983.png)

Bài [Part 1](https://viblo.asia/p/bat-dau-voi-ml-cho-mot-mobile-dev-part-1-djeZ1DMRKWz) mình đã giới thiệu tổng quan về ML và tại sao não bộ của chúng ta lại là nguồn cảm hứng cho ML. Nhưng làm thế nào để có thể tạo ra một cỗ máy có thể học được mô phỏng theo bộ não của chúng ta?
Bài viết này sẽ đưa ra những câu trả lời đơn giản về cách tạo mô hình cho phép máy tính lấy dữ liệu, đưa ra kết luận và cải thiện khả năng đưa ra kết luận. 
Loại quả ưa thích của mình là dâu tây, vậy bài toán mình đặt ra ở đây là viết một phần mềm có thể chụp ảnh, trả về kết quả là trong ảnh đó có dâu tây hay không?
# Đây liệu có phải là dâu tây hay không?
Nếu bạn có con, khi bạn dạy cho con nhận biết đây là quả dâu tây, bạn sẽ làm thế nào? 
![](https://images.viblo.asia/3d8c6de2-7cdd-4ea9-858b-ece40cd4ada8.png)

Thường là chúng ta sẽ đưa ra một bức ảnh, và nói "Đây là quả dâu tây!"
Hoặc là bạn sẽ mô tả, quả dâu tây là quả màu đỏ, có lá màu xanh, tròn ở đỉnh và nhọn ở dưới...
Con bạn sẽ nhìn vào ảnh, chú ý đến những tính năng mà bạn miêu tả, nó có những đặc điểm như vậy nên nó sẽ là quả dâu tây, và khi gặp những quả khác có những đặc điểm như thế sẽ đưa ra kết luận : "Đó là quả dâu tây!"

Có một sự thật là ngay cả khi bạn không miêu tả những đặc điểm trên thì não bộ của trẻ cũng sẽ tìm ra những điểm đặc biệt nhiều hơn những gì bạn miêu tả để chúng nhận biết, đó là cách não bộ hoạt động, thực sự thì não bộ là một cỗ máy thật kỳ diệu đúng không?

Hãy đi sâu một chút vào quá trình não bộ hoạt động và tìm ra cách để làm một bộ máy tương tự nhé.
# Tạo ra một bộ máy đưa ra kết luận

Ở part 1, chúng ta đã biết bộ não của chúng ta làm việc với một mạng lưới thần kinh, vậy nên để tạo một mô hình tương tự như máy, chúng ta nên tạo ra Mạng Thần Kinh Nhân Tạo - ANN.
# Lớp đầu vào
Một hình ảnh quả dâu quá phức tạp để tạo thành một đầu vào cho máy, chúng ta cần tìm các tính năng của nó, giống như làm cho em bé vậy. Vì vậy, đầu vào của chúng ta sẽ không phải là hình ảnh mà là một list các tính năng của quả dâu.

Để đơn giản, chúng ta chỉ tập trung vào 3 tính năng chính : màu đỏ, hoa văn và lá ở trên.
Đối với mỗi tính năng đó, chúng ta hãy dành một tế bào thần kinh nhân tạo để đại diện cho nó.

Một tế bào thần kinh chỉ chứa một chút dữ liệu, mỗi tế bào sẽ nhận được một số, một điểm để giữ. Ta có thể ví dụ: 

- Màu đỏ trong ảnh là bao nhiêu?
- Lá ở phần trên cùng chiếm bao nhiêu?
- Phần mô hình theo hạt chiếm bao nhiêu?

![](https://images.viblo.asia/78781476-9827-4fd5-addc-829ae64cb322.jpeg)

** Các số liệu trên chỉ là ví dụ.
Như vậy chúng ta đã tạo ra được : đầu vào là danh sách các tế bào thần kinh nhân tạo, đại diện cho các tính năng đước trích xuất từ hình ảnh.

Chúng ta có thể gọi danh sách các tế bào thần kinh là - Lớp đầu vào.
# Tính toán lớp ở giữa
Tiếp theo, chúng ta sẽ tạo một tế bào thần kinh khác, có thể hiểu như sau:
Chúng ta biết các tính năng của quả dâu nhưng không biết tầm quan trọng của từng tính năng với sai số của kết luận cuối cùng : màu đỏ chiếm bao nhiêu thì đúng là quả dâu, lá trên cùng chiếm bao nhiêu thì đúng là quả dâu.
Tương tự như não bộ, các tế bào thần kinh của chúng ta có có các xung (cường độ mạnh nhẹ), vậy trên tế bào thần kinh nhân tạo cũng thế, có các trọng số để thay cho điều đó. Bạn hãy xem ảnh sau:

![](https://images.viblo.asia/1843f12a-fa6f-4816-937c-678788df7bc8.jpeg)

Lúc đầu thông số còn nhỏ, chưa thể chắc chắn trọng số của mỗi tính năng, ta sẽ đoán.

![](https://images.viblo.asia/97390cd0-3ab8-4b03-8e02-605fb07d2781.jpeg)

Sau đó chúng ta sẽ quyết định điều chỉnh một số chỗ sai lệnh với một con số, ở đây là (0.7)
Chúng ta sẽ nhận được một điểm cuối cùng và lưu vào các tế bào thần kinh để giữ.

![](https://images.viblo.asia/7f5e78d4-43f5-46dd-ac4e-eea75beb10c4.jpeg)

Chúng ta làm tương tự cho các tế bào thần kinh khác ở lớp giữa. Các trọng số sẽ khác nhau, độ lệch và điểm số cũng sẽ khác nhau.

![](https://images.viblo.asia/39b715c4-21dd-4db5-918a-b9d68b2fee09.jpeg)
# Lớp đầu ra
Tính toán đã xong, vậy đầu ra như thế nào? Làm thế nào từ các điểm trên ta có thể ra được kết luận đó có phải là quả dâu tây hay không?
Chúng ta cần phải tạo ra một loại tế bào thần kinh khác, được đánh dấu theo nhãn. Về cơ bản nó cũng giống như tính toán ở lớp giữa nhưng sẽ là đầu ra. 

![](https://images.viblo.asia/69e97154-c2be-43b1-a215-da00da8a4a9c.jpeg)

Điều duy nhất khác là kết quả giờ không phải là một con số, nó còn thể hiện xác suất của hình ảnh là quả dâu tây hay không theo nhãn hiệu mà tế bào thần kinh đại diện.

![](https://images.viblo.asia/29c2e359-d604-44f6-9bce-8b6b14632558.jpeg)

Trong ví dụ này, tế bào thần kinh đại diên cho một quả dâu tây có xác suất 87%, vì vậy ta có thể nói rằng, chúng tôi chắc chắn 87% đây là quả đâu tây.
# Áp dụng mô hình

Thử áp dụng ANN trên một đối tượng khác - ví dụ là quả táo.

![](https://images.viblo.asia/a7a07a51-30fb-4b6a-833d-c51f4bd80cf6.jpeg)

Các trọng số và phương trình chúng ta sử dụng là giống nhau cho bất cứ hình ảnh nào, tuy nhiên do đầu vào là khác nhau nên điểm số của lớp giữa và lớp đầu ra cũng khác nhau.

Trong ví dụ trên, lớp đầu ra tính được : “80% không phải là quả dâu tây”
Như vậy là chúng ta đã có một mô hình học, đây là một ví dụ cơ bản nhất về cách xây dựng mô hình ML.

![](https://images.viblo.asia/e6b3c430-b6f9-4958-ae87-f412233b1e3e.gif)

Nhưng bạn đang nghĩ là: “các con số này là bặt đặt ra và làm thế nào để có thể tin tưởng được chúng” 

Hãy xem phần 3 để biét rõ hơn về “Learning” và ta sẽ trả lời được câu hỏi trên, hẹn gặp lại.

[Nguồn](https://medium.com/google-developer-experts/whos-afraid-of-machine-learning-part-2-making-a-machine-that-can-learn-a3c6d2715e26)