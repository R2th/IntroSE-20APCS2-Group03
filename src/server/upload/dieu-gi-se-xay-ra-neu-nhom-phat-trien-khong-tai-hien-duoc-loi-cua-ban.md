![](https://images.viblo.asia/b707793f-ab77-4db7-9825-a8e4c418cbcf.png)

Kiểm thử và đảm bảo chất lượng phần mềm là một quy trình phức tạp, đòi hỏi sự tận tâm, chuyên môn kỹ thuật, chú ý đến từng chi tiết và hàng giờ làm việc. Người kiểm thử là những người tìm hiểu sâu về sản phẩm và có tác động lớn đến kết quả cuối cùng của dự án. Đó là lý do tại sao điều quan trọng là chủ sở hữu sản phẩm không chỉ hiểu rõ tầm quan trọng của kiểm thử phần mềm, mà còn hiểu cả những vấn đề đặc biệt để giao tiếp hiệu quả hơn. Bài viết này tập trung vào các vấn đề tái hiện lỗi mà chỉ những kiểm thử viên mới hiểu, điều mà không phải lúc nào cũng tốt cho chất lượng dự án phần mềm.

# “Không thể tái hiện được lỗi ”  :  Chúng ta đang làm sai ở đâu ?

Nhiều người kiểm thử phần mềm sớm hay muộn cũng gặp phải sự cố khi khách hàng / nhóm phát triển của họ không thể tái hiện được lỗi đã báo cáo, lỗi mà bạn đã dành nhiều thời gian và công sức mới điều tra được. Bạn đã cố gắng rất nhiều để báo cáo lại một cách rõ ràng và ngắn gọn, nhưng họ vẫn khẳng định rằng "không thể tái hiện".

>Mâu thuẫn trong giao tiếp là lý do hàng đầu khiến mọi người trong nhóm không thể tái hiện được lỗi. Đó có thể là một bản tóm tắt lỗi khá mơ hồ hay là một bản tóm tắt lỗi mà không ai muốn đọc 
>

Lý do tại sao một người gặp khó khăn khi tái tạo một lỗi cũng có thể là do hành động của người kiểm thử. Ví dụ: họ có thể đã cung cấp một bản tóm tắt lỗi mơ hồ, liệt kê các bước không chắc chắn hoặc đính kèm một tệp đính kèm vô ích, không chứng minh lỗi chính xác hoặc hoàn toàn khiến người khác không muốn mở. Thậm chí tệ hơn, nếu bạn không kiểm tra việc tái hiện lỗi trước khi báo cáo và lỗi này đã không còn xuất hiện sau khi bộ nhớ cache được xóa.

Trong trường hợp bạn không chắc chắn rằng lỗi đã được báo cáo chính xác cũng như người dùng cuối ứng dụng có thể tìm thấy lỗi đó, bạn không có lựa chọn nào khác ngoài việc đề phòng nó. Điều này đạt được thông qua giao tiếp với stakeholders rằng chúng ta có thể điều tra và sửa lỗi đó trong tương lai.

Vì vậy, những câu hỏi bạn nên hỏi nhóm QA của mình là gì để tìm hiểu lý do tại sao họ không tái hiện được lỗi của bạn?

1. Bạn và nhóm phát triển có sử dụng cùng các môi trường thử nghiệm (nền tảng, trình duyệt, phiên bản trình duyệt, thiết bị, hệ điều hành, độ phân giải màn hình) không?
2. 2 bên đã sử dụng loại kết nối Internet nào?
3. Họ đã tính tất cả các điều kiện tiên quyết do bạn chỉ định và các bước để tái tạo lỗi chưa?
4. Kết quả mong đợi của bạn khi sử dụng phần mềm có phù hợp với những điều này của nhóm cũng như kết quả mong đợi được nêu trong các yêu cầu của dự án không?
5. Bạn hoặc nhómphát triển có sử dụng bất kỳ ứng dụng của bên thứ ba hoặc tiện ích mở rộng trình duyệt nào có thể ảnh hưởng đến hiệu suất của phần mềm không? 

Do vậy, hãy xem xét tất cả những câu hỏi này chi tiết hơn.

Trước hết, trong đa số các trường hợp, họ không đọc hết báo cáo lỗi của bạn. Trong trường hợp tốt nhất, một người đang cố gắng tái tạo lỗi của bạn chỉ qua bản tóm tắt lỗi và tệp đính kèm . Đó là lý do tại sao không có gì lạ khi một số các thuộc tính báo cáo lỗi thường bị bỏ sót. Và điều này thật đáng tiếc.

### Môi trường thử nghiệm của bạn có phù hợp không?

Bạn phải chỉ định môi trường chính xác để nhóm phát triển tái hiện lỗi của bạn.

Người ta cho rằng khi tái hiện lại 1 lỗi, môi trường tái hiện đã được nêu trong phần mô tả. Do đó, bạn phải kiểm tra lại xem đồng nghiệp của bạn đang cố gắng tái tạo lỗi có đang sử dụng cùng một nền tảng để làm điều đó hay không (trình duyệt, thiết bị, hệ điều hành, độ phân giải màn hình, tất nhiên nếu đây lỗi dành riêng cho môi trường) như bạn đã làm.

Ví dụ: Đã có trường hợp kiểm thử viên báo cáo một lỗi chỉ tái hiện được trên iPhone 6 mà không tái hiện được trên phiên bản nào khác. Đó là lý do tại sao người kiểm thử này chỉ định môi trường cụ thể trong mô tả báo cáo lỗi. Một lập trình viên xử lý lỗi đó đã không chú ý đến chi tiết là lỗi chỉ có thể được nhìn thấy trên một thiết bị cụ thể (Iphone 6). Lập trình viên này cố gắng tái hiện bug trên iphone 7 nên không thể tái hiện được lỗi. 

### Bạn và nhóm thử nghiệm đã sử dụng loại kết nối Internet nào?

Phần lớn, một câu hỏi như vậy nên được hỏi về các lỗi liên quan đến thiết bị, vì loại kết nối Internet (wi-fi, 3G, 4G, v.v.) có thể ảnh hưởng đến hiệu suất của ứng dụng hoặc trang web, do vậy thông tin này thực sự quan trọng và phải được làm rõ.

### Nhóm thử nghiệm đã tính tất cả các điều kiện tiên quyết do bạn chỉ định và các bước để tái tạo lỗi chưa?

Quay trở lại vấn đề nhóm thử nghiệm không chú ý đầy đủ đến bản báo cáo lỗi và tệp đính kèm của nó, thiếu một số thông tin quan trọng.

Thông thường, các nhân viên có năng lực có xu hướng nghĩ rằng họ đã thành thạo chức năng của dự án đến mức họ không cần phải kiểm tra các bước để tái hiện và điều kiện tiên quyết một cách kỹ lưỡng. Đó là lý do tại sao cần kiểm tra lại chính xác cách các nhà phát triển đã cố gắng tái tạo lỗi của bạn, liệu họ có bỏ sót một bước nào không hoặc không tính đến bất kỳ điều kiện tiên quyết nào.

![](https://images.viblo.asia/8ad6ba46-54c3-4fa3-b79a-347fa1c95e07.png)


### Kết quả mong đợi của bạn về các thao tác sử dụng phần mềm có phù hợp với những điều này của nhóm cũng như kết quả thử nghiệm mong đợi được nêu trong các yêu cầu của dự án không?

Bạn đã báo cáo lỗi vì nó không khớp với kết quả mong đợi được chỉ định trong các yêu cầu, hoặc thậm chí là những lỗi không được chỉ định, nhưng bạn biết chính xác chức năng sẽ hoạt động như thế nào dựa trên kinh nghiệm của bạn, tiêu chuẩn chung hoặc kiến thức thông thường. Bạn nên thảo luận vấn đề này với đồng nghiệp của mình. Có thể ai đó trong nhóm đang dựa vào thông tin không chính xác về kết quả mong đợi của các thao tác sử dụng phần mềm.

### Bạn hoặc nhóm của bạn có sử dụng bất kỳ ứng dụng bên thứ ba hoặc tiện ích mở rộng trình duyệt nào có thể ảnh hưởng đến hiệu suất của phần mềm không?

Và câu hỏi cuối cùng cần thảo luận là câu hỏi có thể được hỏi từ người đã báo cáo lỗi. Đôi khi, một số ứng dụng nhất định có thể xung đột với nhau. Đương nhiên, điều này gây ra lỗi phần mềm mà các nhà phân tích QA phân loại là lỗi. Ngay cả VPN cũng có thể ảnh hưởng đến công việc. Hoặc chẳng hạn, bạn sử dụng máy ảo để kiểm tra, bạn phải đảm bảo rằng trong quá trình tái hiện lỗi, không có ứng dụng của bên thứ ba có thể ảnh hưởng đến hiệu suất của sản phẩm đã thử nghiệm, vì điều này có thể làm sản phẩm kém ổn định hơn so với nền tảng gốc hoặc chính trình duyệt. 

## Kết luận 

Mục đích của người kiểm tra phần mềm là đảm bảo chức năng phần mềm ổn định và không có lỗi, cố gắng ngăn người dùng phát hiện lỗi. Nếu bạn tìm thấy một lỗi và cho rằng đó là lý do nghiêm trọng để hủy phát hành sản phẩm, và nhóm phát triển không thể tái tạo nó, bạn chắc chắn nên tìm ra lý do bằng cách hỏi những câu hỏi được liệt kê ở trên. Điều này không chỉ giúp định hình danh tiếng nghề nghiệp của bạn, mà còn ảnh hưởng đến hình ảnh của toàn bộ bộ phận QA trong mắt nhóm phát triển. Khỏi phải nói về vị thế của công ty trước người dùng cuối - một thứ mong manh khó có được nhưng lại dễ dàng đánh mất chỉ qua một sai lầm.