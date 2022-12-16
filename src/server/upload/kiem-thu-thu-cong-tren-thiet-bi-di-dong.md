Trong thời đại DevOps,  “manual” test có thể nghe như một thuật ngữ xấu. Nhưng manual tests vẫn có một vai trò quan trọng, ngay cả đối với các tổ chức đã thực hiện thành công tự động hóa hầu hết các tasks.

Không ở đâu nhận thấy lợi ích của kiểm thử thủ công rõ ràng hơn trong phát triển phần mềm di động. Dưới đây là tầm quan trọng của kiểm thử thủ công cho thiết bị di động và cách thực hiện chúng.

### **1. Tại sao phải kiểm thử thủ công trên di động?**
Mặc dù kiểm thử tự động có thể tự động hóa hầu hết các case kiểm thử cần thiết để phát hành phần mềm, kiểm thử thủ công được sử dụng bởi các nhóm QA để chạy đầy đủ các case còn lại mà automation không chạy tới và đảm bảo rằng sản phẩm cuối cùng thực sự hoạt động như dự đoán bằng cách xem cách mà người dùng cuối thực sự sử dụng ứng dụng như thế nào.

Trong bối cảnh của kiểm thử thiết bị di động, các case kiểm thử thủ công thường phải trả lời các câu hỏi như:
* Có phải tất cả các thành phần trong design được sắp xếp một cách đúng và đẹp mắt ?
* Có dễ dàng để sử dụng các thành phần của ứng dụng với ngón tay hay không ?
* Vẫn còn dễ dàng nếu người dùng chỉ sử dụng một tay hay không ?

Bằng cách thực hiện kiểm thử thủ công, ta có thể biết được các phản ứng của người dùng khi ta kiểm thử các chức năng của ứng dụng. Từ đó cũng sẽ có các giải pháp để khắc phục những khó khăn khi thực hiện các tác vụ trên thiết bị.
### 2. Làm thế nào để thực hiện kiểm thử thủ công trên di động hiệu quả 
Để thực hiện case kiểm thử thủ công, bạn phải tổ chức và chuẩn hóa công việc kiểm thử. Bằng cách thực hiện các bước này, bạn có thể lặp lại chúng trong bất kỳ chức năng nào có luồng hoạt động giống nhau và cũng có thể tái hiện lỗi nếu cần thiết.

Nếu không có chuẩn hóa, thì chỉ cần đi vòng vòng và hy vọng tìm được một cái gì đó sai để bắt bug. Tuy nhiên có kế hoạch và có tổ chức kiểm thử sẽ tiết kiệm thời gian, và sẽ dễ dàng tái hiện bug hơn. Dưới đây là một vài bước cần làm theo để tạo các bài kiểm thử thủ công:

**2.1. Lên bản kế hoạch kiểm thử**

Hầu hết mọi thứ bắt đầu với một kế hoạch tốt, và kiểm thử cũng không ngoại lệ. Bước đầu tiên khi chuẩn bị kiểm thử là lên kế hoạch cho các bước sẽ bao gồm các cases kiểm thử và lộ trình để thực hiện chúng.

**2.2. Kiểm thử**

Với các kiểm thử đã lên kế hoạch, hãy chạy nó. Kiểm tra mọi thứ trong kế hoạch, lưu ý các bước đã sử dụng và hoạt động của từng thời điểm để tránh nhầm lẫn khi kiểm thử được chạy lại.

Khi một lỗi xuất hiện, hãy thử tái hiện tất cả các bước giống như cách đã làm lần đầu tiên. Xác định nguyên nhân gây ra lỗi. (Có phải đó chỉ là lỗi của con người ?)

**2.3. Ghi lỗi**

Log bug là điều cần thiết để có thể dễ dàng tái hiện. Tái hiện bug đó cho developers để giúp tìm hiểu nguyên nhân gây ra lỗi. Sau khi giải quyết từng vấn đề, thực hiện tất cả các kiểm thử để xác minh rằng không có gì sai nữa. Sử dụng một công cụ thích hợp để chia sẻ kết quả kiểm tra của bạn với QA và nhóm phát triển, lưu lại lịch sử các case kiểm thử và các issues.

**2.4. Lặp lại**

Chúng ta sẽ phải lặp lại tất cả các bước kiểm thử một lần nữa sau khi có bất kỳ đoạn code nào được sửa, ghi lại các case kiểm thử chính xác ngay từ khi bắt đầu và ghi lại bất kỳ thay đổi nào, điều đó sẽ làm giảm tỷ lệ lỗi của các case kiểm thử thủ công.

**2.5. Lựa chọn thiết bị**

Chọn các thiết bị khác nhau để thực hiện các case kiểm thử. Hãy thử trên các môi trường khác nhau như các dòng máy, nền tảng và hệ điều hành khác nhau. Cần chú ý bất cứ khi nào có thể nhận thấy sự khác biệt về phần cứng và phần mềm, kiểm tra phiên bản của phần mềm phụ trợ và lưu ý nếu có sự khác biệt giữa các bản cập nhật. Khi đó thường có sự khác biệt giữa màn hình và độ phân giải, việc kiểm tra xem ứng dụng có phản hồi đúng hay không là bắt buộc. (Đôi khi, chúng ta chỉ có thể thấy điều này với kiểm thử thủ công.)

**2.6. Kết luận**

Mặc dù kiểm thử trên thiết bị di động thường được tự động hóa, nhưng nó sẽ luôn luôn mượt mà hơn khi sử dụng cả kiểm thử thủ công để tăng trải nhiệm người dùng và làm cho ứng dụng có chất lượng cao hơn. Ngay cả khi có thể thực hiện hầu hết các kiểm thử theo cách tự động, vẫn thiếu công nghệ để tự động hóa hoàn toàn một số loại kiểm thử, chẳng hạn như các loại kiểm thử về khả năng tiếp cận và khả năng sử dụng. Kiểm thử thủ công cũng cho phép theo dõi phản ứng của người dùng, xem vấn đề có thể nằm ở đâu và tính năng nào người dùng thích hơn.

Để bắt đầu, bạn chỉ cần làm theo các bước ở trên để thực hiện kiểm thử thủ công trên thiết bị di động. Để quá trình kiểm thử trở nên tốt hơn, bạn cần tập trung vào việc kiểm tra các thiết bị đáp ứng tốt nhất theo nhu cầu của đối tượng mục tiêu và duy trì các tiêu chuẩn nhất quán khi kiểm thử thủ công trên di động.

**Nguồn dịch**: https://saucelabs.com/blog/manual-testing-on-mobile-devices