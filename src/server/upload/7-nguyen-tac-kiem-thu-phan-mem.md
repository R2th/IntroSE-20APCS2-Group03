Bài viết này giới thiệu tới bạn 7 Nguyên tắc kiểm tra phần mềm cơ bản mà một tester nên biết.

Hãy cùng tìm hiểu các nguyên tắc kiểm tra với ví dụ video sau:

{@embed: https://www.youtube.com/watch?v=rFaWOw8bIMM}

**Background**

Điều quan trọng là bạn phải đạt được kết quả kiểm thử tối ưu trong khi tiến hành kiểm thử phần mềm mà không đi chệch mục tiêu. Nhưng làm thế nào để xác định được bạn đang theo đúng chiến lược kiểm thử? Để làm được điều đó, bạn cần phải tuân theo một số nguyên tắc kiểm  thử cơ bản. Dưới đây là bảy nguyên tắc kiểm thử phổ biến được thực hành rộng rãi trong ngành kiểm thử phần mềm.

Để hiểu điều này, hãy xem xét một tình huống trong đó bạn đang di chuyển một tệp từ thư mục A sang thư mục B.
Hãy nghĩ về tất cả các cách có thể để bạn có thể kiểm tra điều này.
Ngoài các tình huống thông thường, bạn cũng có thể kiểm tra các điều kiện sau
Cố gắng di chuyển tệp khi nó đang mở
Bạn không có quyền bảo mật để dán tệp vào Thư mục B
Thư mục B nằm trên ổ đĩa dùng chung và dung lượng lưu trữ đã đầy.
Thư mục B đã có một tệp trùng tên, thực tế là danh sách dài vô tận
Hoặc giả sử bạn có 15 trường đầu vào để kiểm tra, mỗi trường có 5 giá trị khả thi, số lượng kết hợp cần kiểm tra sẽ là 5 ^ 15
Nếu bạn đã kiểm tra toàn bộ các kết hợp có thể có của dự án THỜI GIAN THI CÔNG & CHI PHÍ sẽ tăng theo cấp số nhân. Chúng ta cần các nguyên tắc và chiến lược nhất định để tối ưu hóa nỗ lực kiểm tra

Dưới đây là 7 nguyên tắc mà 1 tester cần biết:
# 1) Kiểm thử hoàn toàn là điều không thể
Đúng! Không thể kiểm thử hết tất cả mọi thứ. Thay vào đó, chúng ta cần lượng kiểm thử  tối ưu dựa trên đánh giá rủi ro của ứng dụng.
Và câu hỏi triệu đô là, làm thế nào để bạn xác định rủi ro này?
Để trả lời câu hỏi này, hãy làm một ví dụ:
Theo bạn, thao tác nào dễ khiến Hệ điều hành của bạn bị lỗi nhất?
Tôi chắc chắn rằng hầu hết các bạn sẽ đoán được, mở 10 ứng dụng khác nhau cùng một lúc.
Vì vậy, nếu bạn đang kiểm thử một hệ điều hành , bạn sẽ nhận ra rằng các khiếm khuyết có thể được tìm thấy trong hoạt động đa tác vụ và cần được kiểm tra kỹ lưỡng, điều này đưa chúng ta đến nguyên tắc tiếp theo của chúng tôi Phân cụm khiếm khuyết

# 2) Phân cụm khiếm khuyết
Phân cụm khiếm khuyết cho biết rằng một số lượng nhỏ các mô-đun chứa hầu hết các lỗi được phát hiện. Đây là ứng dụng của Nguyên tắc Pareto để kiểm thử phần mềm: khoảng 80% các vấn đề được tìm thấy trong 20% các mô-đun.
Bằng kinh nghiệm, bạn có thể xác định các mô-đun rủi ro như vậy. Nhưng cách tiếp cận này có những vấn đề riêng. Nếu các bài kiểm tra giống nhau được lặp đi lặp lại nhiều lần, cuối cùng các trường hợp kiểm thử giống nhau sẽ không còn tìm thấy lỗi mới nữa.

# 3) Nguyên lý thuốc trừ sâu
Việc sử dụng lặp đi lặp lại cùng một hỗn hợp thuốc trừ sâu để diệt trừ côn trùng trong quá trình canh tác theo thời gian sẽ dẫn đến việc côn trùng phát triển khả năng kháng thuốc. Do đó, thuốc trừ sâu trên côn trùng không hiệu quả. Điều này cũng áp dụng cho kiểm thử phần mềm. Nếu cùng một tập hợp các thử nghiệm lặp đi lặp lại được tiến hành, phương pháp này sẽ vô dụng trong việc phát hiện ra các khuyết tật mới.

Để khắc phục điều này, các trường hợp thử nghiệm cần được thường xuyên xem xét & sửa đổi, bổ sung các trường hợp thử nghiệm mới & khác nhau để giúp tìm ra nhiều khiếm khuyết hơn.

Người kiểm tra không thể chỉ phụ thuộc vào các kỹ thuật kiểm tra hiện có. Anh ta phải liên tục tìm kiếm để cải tiến các phương pháp hiện có nhằm làm cho việc kiểm tra hiệu quả hơn. Nhưng ngay cả khi những công việc khó khăn và vất vả này được thực hiện trong quá trình kiểm thử, bạn không bao giờ có thể khẳng định sản phẩm của mình là không có lỗi. Để chứng minh luận điểm này, hãy cùng xem video ra mắt công khai Windows 98
{@embed: https://www.youtube.com/watch?v=eKy9fV_zX_o}

Bạn nghĩ rằng một công ty như MICROSOFT đã không kiểm tra hệ điều hành của họ một cách kỹ lưỡng và sẽ mạo hiểm danh tiếng của họ chỉ để thấy hệ điều hành của họ gặp sự cố trong thời gian ra mắt công chúng?

# 4) Thử nghiệm cho thấy sự hiện diện của các khuyết tật
Do đó, nguyên tắc tiếp theo là Kiểm thử sự hiện diện của các khiếm khuyết, tức là Kiểm thử phần mềm làm giảm xác suất các lỗi chưa được phát hiện còn lại trong phần mềm nhưng ngay cả khi không tìm thấy lỗi nào, nó không phải là bằng chứng về tính đúng đắn.
Nhưng nếu bạn làm việc chăm chỉ hơn, thực hiện mọi biện pháp phòng ngừa và làm cho sản phẩm phần mềm của bạn 99% không có lỗi. Và phần mềm không đáp ứng được nhu cầu & yêu cầu của khách hàng.
Điều này dẫn chúng ta đến nguyên tắc tiếp theo của chúng ta, trong đó nói rằng- Không có lỗi

# 5) Sự vắng mặt của lỗi - ngụy biện

Có thể phần mềm 99% không có lỗi vẫn không sử dụng được. Điều này có thể xảy ra nếu hệ thống được kiểm tra kỹ lưỡng nhưng yêu cầu lại bị sai. Kiểm thử phần mềm không chỉ là tìm ra các khiếm khuyết mà còn để kiểm tra xem phần mềm có đáp ứng được các nhu cầu của doanh nghiệp hay không. Việc không có Lỗi chính là một Lỗi. Việc tìm kiếm và sửa chữa các lỗi sẽ không hữu ích nếu bản dựng hệ thống không sử dụng được và không đáp ứng nhu cầu & yêu cầu của người dùng.
Để giải quyết vấn đề này, nguyên tắc kiểm tra tiếp theo nói rằng nên Kiểm thử sớm

# 6) Kiểm thử sớm
Kiểm thử sớm - Kiểm thử nên bắt đầu càng sớm càng tốt trong Vòng đời phát triển phần mềm. Sao cho mọi khiếm khuyết trong yêu cầu hoặc giai đoạn thiết kế đều được ghi nhận trong giai đoạn đầu. Sẽ rẻ hơn nhiều nếu sửa lỗi trong giai đoạn đầu của thử nghiệm. Nhưng người ta nên bắt đầu thử nghiệm sớm như thế nào? Bạn nên bắt đầu tìm lỗi ngay khi các yêu cầu được xác định. Tìm hiểu thêm về nguyên tắc này trong hướng dẫn đào tạo sau.

# 7) Kiểm thử phụ thuộc vào hoàn cảnh
Kiểm tra phụ thuộc vào ngữ cảnh, về cơ bản có nghĩa là cách bạn kiểm thử một trang web thương mại điện tử sẽ khác với cách bạn kiểm thử một ứng dụng offline nào đó. Tất cả các phần mềm được phát triển không giống nhau. Bạn có thể sử dụng một cách tiếp cận, phương pháp, kỹ thuật và loại kiểm thử khác nhau tùy thuộc vào loại ứng dụng. Ví dụ: thử nghiệm, bất kỳ hệ thống POS nào tại một cửa hàng bán lẻ sẽ khác với thử nghiệm một máy ATM.

Có một lầm tưởng rằng: "Các nguyên tắc chỉ để tham khảo. Tôi sẽ không sử dụng chúng trong thực tế."
Điều này rất không đúng sự thật. Các Nguyên tắc Kiểm thử sẽ giúp bạn tạo Chiến lược Kiểm thử hiệu quả và soạn thảo các trường hợp kiểm thử bắt lỗi.

Nhưng việc học các nguyên tắc sát hạch cũng giống như học lái xe lần đầu.

Ban đầu, khi bạn học lái xe, bạn chú ý đến từng thứ như chuyển số, tốc độ, xử lý ly hợp, ... Nhưng với kinh nghiệm, bạn chỉ tập trung vào việc lái xe, những thứ còn lại đến tự nhiên. Như vậy bạn thậm chí còn tổ chức các cuộc trò chuyện với những hành khách khác trên xe.

Điều này cũng đúng đối với các nguyên tắc kiểm tra. Những tester có kinh nghiệm đã nội tại hóa những nguyên tắc này đến mức họ áp dụng chúng ngay cả khi không cần suy nghĩ. Do đó, lầm tưởng rằng các nguyên tắc không được sử dụng trong thực tế đơn giản là không đúng.

Tham khảo: https://www.guru99.com/software-testing-seven-principles.html