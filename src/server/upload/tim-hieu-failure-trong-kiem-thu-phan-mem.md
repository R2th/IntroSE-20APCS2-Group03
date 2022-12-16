Nếu theo hoàn cảnh và môi trường, defects trong ứng dụng hay sản phẩm được thực thi thì dẫn đến lỗi hệ thống đó là failure - thất bại. 
Không phải tất cả các lỗi dẫn đến Failure, một số có thể từ những dòng code đen và làm cho đội ngũ phát triển có thể không bao giờ nhận thấy chúng. Ví dụ: Defects trong code không hoạt động sẽ không bao giờ dẫn đến Failure(thất bại). Nó không chỉ là defects dẫn đến Failure. Failure cũng có thể được gây ra vì những lý do khác như sau: 
* Do các điều kiện môi trường cũng như vụ nổ bức xạ, từ trường mạnh, từ trường điện tử hoặc ô nhiễm có thể gây ra lỗi trong phần cứng. Những lỗi đó có thể ngăn chặn hoặc thay đổi việc thực hiện phần mềm.
* Lỗi cũng có thể phát sinh do lỗi của con người khi tương tác với phần mềm, có thể nhập sai giá trị đầu vào hoặc đầu ra .
* Cuối cùng,  Failure cũng có thể do yếu tố chủ quan ai đó cố tình gây ra lỗi trong hệ thống.

Sự khác biệt giữa **Error**, **Defect** và **Failure** trong kiểm thử phần mềm:

**Error**:  Những lỗi do lập trình viên gây ra được gọi là "Error". Điều này có thể xảy ra vì những lý do sau:
* Do một số nhầm lẫn trong việc tìm hiểu chức năng của phần mềm.
* Do một số tính toán sai lệch giữa các giá trị khởi tạo.
* Bởi vì phán đoán sai về bất kỳ giá trị nào đó , v..v,

**Defect**: Các lỗi được dẫn ra từ bên trong code của lập trình viên được gọi là Defect. Điều này có thể xảy ra vì một số sai sót của người lập trình.

**Failure**: Nếu trong một số trường hợp, các lỗi này được người kiểm thử(Tester) thực hiện trong quá trình kiểm tra thì nó sẽ dẫn đến lỗi được gọi là Failure Software.

![](https://images.viblo.asia/e95718d6-baa4-41b1-890f-412d99b8d4c7.png)


Một số điểm quan trọng cần biết:

1. Khi người kiểm thử đang thực hiện kiểm tra, họ có thể quan sát thấy một số khác biệt trong hành vi của tính năng hoặc chức năng, nhưng điều này không phải do Failure. Điều này có thể xảy ra do dữ liệu kiểm tra nhập vào không chính xác, người kiểm thử có thể không nhận thức được tính năng hoặc chức năng hoặc có thể do môi trường xấu. Vì những lý do của sự cố đó đều được báo cáo chúng được gọi là Incident Report . Vấn đề hoặc tình huống cần phân tích hoặc làm rõ thêm được gọi là sự cố. Để xử lý các sự cố, lập trình viên cần phân tích rằng liệu sự cố này có xảy ra do Failure hay không.
2. Không nhất thiết rằng Defects hoặc Bugs được phát hiện trong những sản phẩm phần mềm. Để hiểu rõ hơn về điều đó, có thể lấy ví dụ: Một  Bug hoặc Defect cũng có thể được phát hiện bởi một nhà phân tích kinh doanh. Defect hiện diện trong các thông số kỹ thuật cũng như đặc điểm kỹ thuật yêu cầu và những thiết kế về thông số kỹ thuật cũng có thể được phát hiện trong quá trình đánh giá. Khi Defect hoặc Bug được phát hiện trong quá trình đánh giá không thể dẫn đến lỗi do phần mềm chưa được thực thi.
3. Những Defect hoặc Bugs này được báo cáo không có nghĩa đổ trách nhiệm cho các nhà phát triển hoặc bất kỳ thành viên nào trong đội phát triển mà là để đánh giá chất lượng của sản phẩm. Chất lượng sản phẩm là vô cùng quan trọng và được đặt lên hàng đầu. Để có được sự tin tưởng của khách hàng, điều đó rất quan trọng để cung cấp sản phẩm chất lượng đúng thời gian.

**Kết luận**

 Qua bài viết chúng ta đã hiểu sự khác nhau giữa Error, Defect và Failure , điều nổi bật ở bài viết hơn cả đó chính là một khái niệm không hề quen thuộc như Error hay Defect mà là một khái niệm về sự khác biệt kết quả thực tế và kết quả mong đợi của hệ thống trong kiểm thử phần mềm đó là Failure . Hy vọng bài viết sẽ giúp ích được cho các bạn !
 
 Tài liệu tham khảo: http://tryqa.com/what-is-a-failure-in-software-testing/