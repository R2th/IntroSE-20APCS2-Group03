Kiểm thử phần mềm bao gồm nhiều lĩnh vực nơi có thể xác minh hoặc xác thực chức năng phần mềm. Đôi khi, các khía cạnh phi chức năng non-functional) trở nên ít liên quan đến các khía cạnh chức năng (functional). Chúng không được thực hiện đồng thời trong quá trình kiểm thử phần mềm.

Bài viết này giải thích các lợi ích bổ sung về chất lượng của sản phẩm phần mềm trong các tình huống khác nhau trong vòng đời kiểm thử phần mềm khi cả functional and non-functional đều được thực hiện đồng thời.

# 1. Khác biệt nhanh giữa Performance Testing và Functional Testing
![](https://images.viblo.asia/5e4bc4c1-f1f5-4ac7-b71c-f219e4d33c2d.png)

| NO | Functional Testing (Kiểm thử chức năng) | Performance Testing (Kiểm thử hiệu năng) |
| -------- | -------- | -------- |
| 1     | Để xác minh tính chính xác của phần mềm với các đầu vào xác định so với đầu ra dự kiến     | Để xác minh hành vi của hệ thống ở các điều kiện tải khác nhau    |
| 2     | Nó có thể là thủ công hoặc tự động| Nó có thể hoạt động tốt hơn nếu được tự động     |
| 3     | Một người dùng thực hiện tất cả các hoạt động     | Một số người dùng thực hiện các thao tác mong muốn     |
| 4     | Sự tham gia cần thiết từ Khách hàng, Tester và Developer     | Cần có sự tham gia của khách hàng Tester, Developer, Management team     |
| 5     | Môi trường kiểm thử quy mô sản xuất không bắt buộc và requirements là tối thiểu     | Yêu cầu gần với môi trường kiểm thử sản xuất và một số cơ sở để đưa vào load|


# 2. Tại sao Performance Testing và Functional Testing nên được thực hiện đồng thời?

Functional Testing trở nên quan trọng hơn nhiều đối với bất kỳ phần mềm phát hành trước. Xác minh và xác nhận dựa trên kết quả thực tế trong môi trường sản xuất hoặc kiểm thử được nhân rộng là nơi kiểm thử thường xảy ra.

## Khiếm khuyết rò rỉ có thể trở thành một trong những vấn đề lớn nhất:

Người tester có trách nhiệm hơn các Developers về chất lượng sản phẩm. Về cơ bản, họ không muốn sản phẩm được kiểm thử bị rò rỉ khiếm khuyết. Người tester thường có xu hướng chỉ thực hiện Functional Testing để đạt được điều này.

![](https://images.viblo.asia/9cd45f59-8ec5-4726-85bd-54c0f65b0122.jpg)

### Sau đây là cuộc trò chuyện giữa Test Manager and a Tester :

(Test Manager được gọi là 'TM' và Tester là 'TR')

TM : Này bạn thân, chúng ta đang làm thế nào trong kiểm thử sản phẩm 'A'?

TR : Chúng tôi đang tiến hành theo một cách thức lớn hơn.

TM : Điều đó thật tuyệt vời... Và phạm vi của chúng tôi về Performance Testing trong khi Functional Testing đang được thực thi là gì?

TR : Chúng tôi không bao gồm chúng, các sản phẩm của chúng tôi được cho là chỉ trong khu vực chức năng chứ không phải trên khu vực phi chức năng. Ngoài ra, môi trường kiểm thử chúng tôi đang sử dụng không phải là bản sao chính xác của sản phẩm.

### Có một vài câu hỏi từ cuộc trò chuyện trên được xem xét:

- Kiểm tra chức năng có một yếu tố phụ thuộc vào hiệu suất?
- Điều gì xảy ra nếu hiệu suất của phần mềm bị suy giảm, nhưng việc phân phối sản phẩm xảy ra mà không kiểm tra hiệu suất?
- Kiểm thử hiệu năng - nó có cùng tồn tại trong quy trình kiểm thử chức năng không?

Nó đã trở thành một thông lệ chung cho những người tester không làm việc trên các khía cạnh phi chức năng trừ khi họ được yêu cầu làm như vậy. Việc tránh kiểm tra phi chức năng là điều phổ biến cho đến khi khách hàng báo cáo sự cố với hiệu suất của phần mềm đang được kiểm tra.

### Vì vậy, có 2 câu hỏi để bạn xem xét:

- Hiệu suất - nó có ảnh hưởng đến kiểm thử chức năng?
- Chúng tôi có tiếp tục kiểm tra hiệu suất như một phân phối riêng biệt, ngay cả khi điều đó làm khách hàng lo lắng không?

## Kiểm tra hiệu suất là quan trọng !

Phần mềm hoạt động dựa trên các kiến ​​trúc khác nhau và các mô hình sau, bao gồm:

1. Mô hình trả lời yêu cầu
2. Hệ thống dựa trên giao dịch
3. Hệ thống dựa trên tải
4. Hệ thống dựa trên sao chép dữ liệu

Hành vi kiểm tra chức năng của mô hình hệ thống được đề cập ở trên phụ thuộc vào hiệu suất của hệ thống.

![](https://images.viblo.asia/5bcff8b3-a69d-406d-8adf-362dcd9e6746.jpg)

Quan điểm tự động hóa đòi hỏi nhiều sự chú ý đối với kiểm hiệu suất.

### Sau đây là cuộc trò chuyện giữa Test Manager and a Tester :

(Test Manager được gọi là 'TM' và Tester là 'TR')

CL : Đi đến giải pháp mà chúng tôi đã yêu cầu, tôi hy vọng sẽ có nhiều lần lặp lại kiểm thử đang diễn ra.

TM : Vâng, điều này có thể được thực hiện. Như bạn đã nói, sẽ có xác suất cao hơn của kiểm thử lặp, chúng tôi muốn đề xuất tự động hóa để đối phó với kiểm thử chức năng (regression - hồi quy).

CL : OK tuyệt vời, xin vui lòng gửi cho chúng tôi cách tiếp cận của bạn để chúng tôi có thể phê duyệt điều này. Tự động hóa sẽ có đầu ra cao hơn nhiều với nỗ lực tối thiểu.

TM : Chính xác. Chúng tôi sẽ làm việc theo cách tiếp cận và lấy lại cho bạn bằng [Proof of Concept](https://en.wikipedia.org/wiki/Proof_of_concept).

Từ cuộc trò chuyện trên, rõ ràng nhu cầu của khách hàng là tối ưu hóa hiệu quả.

# 3. Case study

Công ty ABC làm việc trong một dự án phát triển Phần mềm A. Kiểm tra phần mềm A đang được thực hiện bởi công ty XYZ.

Hợp đồng cho Công ty ABC và XYZ có một số hạn chế cho sự hợp tác của họ. Bất kỳ cuộc thảo luận nào giữa hai công ty nên diễn ra một lần một tuần hoặc ba lần một tháng. Hệ thống hoạt động trên một mô hình của chế độ đáp ứng yêu cầu (request-response mode). Giai đoạn phát triển đã được hoàn thành bởi Công ty ABC.

Bây giờ là lúc để Công ty XYZ thực hiện kiểm thử chức năng chính thức trên Phần mềm A. XYZ bắt đầu làm việc với kiểm thử  Phần mềm A. Họ đã kiểm tra kỹ lưỡng về phần mềm và đã đưa ra 'Đi' trực tiếp sau 2 chu kỳ kiểm thử.

Mặc dù có chứng chỉ chất lượng từ team kiểm thư, việc triển khai trực tiếp không diễn ra tốt đẹp. Có rất nhiều lỗi hậu kỳ. Có một số lượng lớn các vấn đề mà khách hàng gặp phải, bao gồm cả sự phá vỡ chức năng cho các quy trình kinh doanh từ đầu đến cuối.

Vậy bây giờ vấn đề là gì?

![](https://images.viblo.asia/6593fa66-4fd9-416f-833d-30cf9fce17dc.jpg)

- Đây có phải là một vấn đề với sự hạn chế về sự hợp tác giữa nhóm phát triển và thử nghiệm không?
- Có phải là các yêu cầu không được nắm bắt 100%?
- Có phải sản phẩm không được kiểm tra trong môi trường thử nghiệm thích hợp?
- Hoặc bất kỳ nguyên nhân khác?

## Sau khi nghiên cứu và phân tích cẩn thận, những điều sau đây đã được suy ra :

![](https://images.viblo.asia/38430b33-5c52-4f09-aa53-db55d0258d9a.png)

1. Có một vài trong số các ứng dụng phụ thuộc và phụ thuộc lẫn nhau có vấn đề về hiệu năng trong khi tìm nạp các phản hồi.
2. Các đầu vào kiểm thử được sử dụng là không tuyệt đối.
3. Sự mạnh mẽ của phần mềm không được quan tâm.
4. Rất nhiều vấn đề đồng bộ giữa nhiều ứng dụng độc lập.
5. Việc kiểm thử phần mềm đã thực hiện nhiều công việc lại không được xem xét.
6. Ngoài kiểm tra hệ thống, kiểm tra tích hợp hệ thống phải được thực hiện.
7. Một khoảng cách thời gian tối thiểu giữa hai lần lặp thử nghiệm phải được cung cấp. Điều này là để kiểm tra lại các lỗi đã xác định trước đó.
8. Tất cả các lỗi được xác định trong các lần lặp trước nên được sửa trong lần lặp hiện tại.

Team Kiểm thử đã thực hiện tất cả các hành động được đề xuất và có một số lượng lớn các khiếm khuyết được phát hiện trong thời gian ngắn.

### Quan sát:

1. Lịch trình thực hiện trực tiếp của phần mềm được cải thiện đáng kể bằng cách tối ưu hóa thời gian chu kỳ kiểm tra.
2. Có sự tiến bộ tốt trong việc tối ưu hóa chất lượng phần mềm. Do đó, có một sự sụt giảm rất lớn trong các support tickets sau khi thực hiện.
3. Công việc làm lại bị giảm và nó đang kiểm thử lặp lại thay vì làm lại. Giữa các lần lặp khác nhau, có sự cải thiện tốt hơn về chất lượng được quan sát.

# 4. Phần kết luận
![](https://images.viblo.asia/c5274029-308a-4624-b6da-e60076992b44.jpg)

Thực hiện kiểm tra phi chức năng trong quá trình thực hiện kiểm tra chức năng là lợi thế hơn và sẽ thêm nhiều lợi ích hơn cho chất lượng phần mềm tổng thể. Điều này sẽ xác định các lỗi hiệu suất (bị giới hạn trong môi trường kiểm thử và phụ thuộc) và do đó sẽ giảm các tình huống giả định vấn đề chức năng.

Lập kế hoạch đầy đủ để thực hiện kiểm tra chức năng và phi chức năng (ở mức tối thiểu) phải được thực hiện để giữ mối quan hệ chặt chẽ giữa các bên liên quan khác của dự án.

Nguồn tham khảo:
https://www.softwaretestinghelp.com/functional-testing-and-performance-testing/