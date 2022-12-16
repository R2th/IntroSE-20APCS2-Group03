Chúng ta đã biết rằng kiểm thử hộp đen liên quan đến việc kiểm tra 1 hệ thống mà không biết rõ được thiết kế bên trong của nó. Kiểm tra hộp đen là một cách kiểm tra khá phổ biến . Tuy nhiên, có sự phức tạp thường thấy rằng số lượng điều kiện thử nghiệm có thể lên đến hàng trăm biến thể. Vậy làm thế nào để chúng ta giữ tổng số trường hợp kiểm tra ở mức tối thiểu và vẫn đảm bảo về chất lượng kiểm thử ? Rất ít kỹ thuật hộp đen được phát triển để giải quyết sự phức tạp này, vì cần cả đến thời gian thử nghiệm và khoa học. Tuy nhiên , có một phương pháp mà hôm nay chúng ta sẽ đề cập đến : Kỹ thuật phân vùng tương đương. Kỹ thuật này phần nào giải quyết được bài toán này.

### * Phân vùng tương đương là gì?
### * Làm thế nào để phân vùng tương đương?
### * Cạm bẫy của nó là gì?

### Phân vùng tương đương là gì?

Phân vùng tương đương là một kỹ thuật kiểm tra hộp đen áp dụng cho tất cả các cấp độ kiểm tra. Hầu hết chúng ta, những người không biết điều này vẫn sử dụng nó một cách không chuẩn chỉnh mà không hề nhận ra. Thực tế có những quy tắc được xác định có thể làm cho nó hữu ích và khoa học hơn.

Ý tưởng đằng sau kỹ thuật này chính là chia một tập hợp các điều kiện kiểm tra thành các nhóm hoặc các tập hợp giống nhau. Phân vùng thường xảy ra cho các đối tượng thử nghiệm, bao gồm đầu vào, đầu ra, giá trị bên trong, giá trị liên quan đến thời gian và cho các tham số giao diện. Phân vùng tương đương còn được gọi là phân vùng lớp tương đương. Nó hoạt động trên một số giả định:

* Hệ thống sẽ xử lý tất cả các biến đầu vào thử nghiệm trong một phân vùng theo cùng một cách.
* Nếu một trong các điều kiện đầu vào vượt qua, thì tất cả các điều kiện đầu vào khác trong phân vùng cũng sẽ vượt qua.
* Nếu một trong các điều kiện đầu vào thất bại, thì tất cả các điều kiện đầu vào khác trong phân vùng cũng sẽ thất bại.

Thành công và hiệu quả của phân vùng tương đương nằm ở chỗ các giả định trên có giá trị hợp lý như thế nào. Chúng tôi sẽ thảo luận chi tiết về điều này trong phần sau của bài viết với các ví dụ thực tế trong đó các giả định này đúng hoặc sai.

### Vậy làm thế nào để phân vùng tương đương?

Bây giờ chúng ta đã có một ý tưởng hợp lý về phân vùng tương đương : 

Hãy xem xét rằng bạn đang điền vào một mẫu đơn đăng ký trực tuyến cho một thành viên phòng tập thể dục. Các tiêu chí quan trọng nhất để có được một thành viên là gì? Tất nhiên, tuổi! 
Hầu hết các phòng tập thể dục có tiêu chí độ tuổi từ 16-60, nơi bạn có thể độc lập có được tư cách thành viên mà không cần bất kỳ sự giám sát nào. Nếu bạn nhìn vào mẫu thành viên dưới đây, bạn sẽ cần điền tuổi trước. Sau đó, tùy thuộc vào việc bạn ở trong khoảng 16-60, bạn có thể đi xa hơn. Nếu không, bạn sẽ nhận được một thông báo rằng bạn không thể đăng ký thành viên .

![](https://images.viblo.asia/cd7a220a-0de5-4109-a7d5-f3413f0ae182.jpg)

Nếu chúng ta phải kiểm tra trường tuổi này, thông thường sẽ cho chúng ta biết rằng chúng ta cần kiểm tra các giá trị trong khoảng từ 16-60 và các giá trị nhỏ hơn 16 và một số giá trị lớn hơn 60. Nghe có vẻ rất dễ để tìm ra, nhưng điều không rõ ràng ở đây  là có bao nhiêu kết hợp chúng ta cần kiểm tra để nói rằng chức năng hoạt động an toàn ?

* <16 có 15 kết hợp từ 0-15 và nếu bạn kiểm tra các giá trị âm, thì có thể thêm một số kết hợp khác
* 16-60 có 45 kết hợp
* > 60 có 40 kết hợp (nếu bạn chỉ thực hiện đến 100)

Chúng ta có nên kiểm tra tất cả hơn 100 kết hợp này không? Chắc chắn có nếu chúng ta có thời gian vô hạn và chi phí hoàn toàn không phải là vấn đề. Còn trên thực tế chúng ta không bao giờ có thể làm điều đó vì luôn có thời gian tối thiểu để thử nghiệm.

Ngoài ra, chúng tôi cần đảm bảo rằng chúng tôi tạo các trường hợp thử nghiệm tối thiểu với phạm vi thử nghiệm tối đa.  Hãy cùng chúng tôi xem cách phân vùng tương đương sẽ giải quyết vấn đề này.

Bước đầu tiên trong phân vùng tương đương là phân chia (phân vùng) các giá trị đầu vào thành các bộ phân vùng hợp lệ và không hợp lệ. Tiếp tục ví dụ tương tự phân vùng của chúng tôi sẽ như dưới đây -

![](https://images.viblo.asia/9c9c1a6a-0316-4ad1-9543-6b58ba7d5e63.png)

* Phân vùng hợp lệ là các giá trị nên được chấp nhận bởi thành phần hoặc hệ thống được thử nghiệm. Phân vùng này được gọi là phân vùng tương đương hợp lệ.

* Phân vùng không hợp lệ là các giá trị nên bị từ chối bởi thành phần hoặc hệ thống được kiểm tra. Phân vùng này được gọi là phân vùng tương đương không hợp lệ.

Vậy chúng ta nên làm gì sau khi biết các phân vùng này? Tiền đề của kỹ thuật này hoạt động dựa trên giả định rằng tất cả các giá trị trong phân vùng sẽ hoạt động theo cùng một cách. Vì vậy, tất cả các giá trị từ 16-60 sẽ hành xử theo cùng một cách. Điều tương tự cũng xảy ra với bất kỳ giá trị nào nhỏ hơn 16 và các giá trị lớn hơn 60. Như vậy, chúng tôi chỉ kiểm tra 1 điều kiện trong mỗi phân vùng và giả sử rằng nếu nó hoạt động /không hoạt động, phần còn lại của phân vùng sẽ hoạt động theo cùng một cách.

Điều kiện thử nghiệm của chúng tôi trong trường hợp như vậy có thể là:

* Nhập tuổi = 5
* Nhập tuổi = 20
* Nhập tuổi = 65
Nếu bạn thấy, 3 điều kiện kiểm tra này sẽ cover hơn 100 điều kiện . Bằng cách áp dụng kỹ thuật này, chúng tôi đã giảm đáng kể các trường hợp thử nghiệm của mình, nhưng độ che phủ vẫn cao.

Các phân vùng này có thể được chia thành các phân vùng phụ nếu cần - Hiểu rõ hơn chúng ta sẽ mở rộng ví dụ tương tự về tư cách thành viên phòng tập thể dục. Hãy giả sử rằng nếu bạn 16-20 tuổi hoặc 55-60 tuổi, có một yêu cầu bổ sung để đính kèm bằng chứng tuổi của bạn trong khi gửi biểu mẫu thành viên. Trong trường hợp này, phân vùng của chúng tôi sẽ trông như dưới đây-

![](https://images.viblo.asia/722872bf-6637-4326-8566-7decc7839aec.png)

VP1, VP2 và VP3 đều là các phân nhóm hợp lệ dựa trên các yêu cầu bổ sung. Vậy điều kiện kiểm tra chúng ta sẽ bổ sung thành : 

* Nhập tuổi = 5
* Nhập tuổi = 18
* Nhập tuổi = 30
* Nhập tuổi = 58
* Nhập tuổi = 65

5  điều kiện này sẽ bao gồm tất cả các yêu cầu mà chúng tôi có cho lĩnh vực tuổi. Tất nhiên, bạn có thể sử dụng bất kỳ giá trị nào khác từ mỗi phân vùng tùy thích.

Chúng tôi cần đảm bảo rằng phân vùng của chúng tôi là duy nhất và không chồng chéo. Mỗi giá trị mà bạn lấy chỉ thuộc về một phân vùng.

Khi chúng tôi sử dụng các phân vùng tương đương không hợp lệ, thử nghiệm của chúng sẽ xảy ra riêng lẻ và không được kết hợp với các phân vùng khác hoặc sẽ dẫn đến inputs tiêu cực. 
Ví dụ: nếu bạn có trường tên chấp nhận 5-15 ký tự (a-z). Nếu bạn cố gắng nhập abc @, điều này sẽ gây ra lỗi, nhưng chúng tôi không biết lỗi đó là do chúng tôi đã nhập bốn ký tự, hay nó là vì chúng tôi đã sử dụng ký tự  @. Do đó, kết hợp hai phân vùng không hợp lệ hoặc giá trị âm, chúng tôi sẽ che giấu nguyên nhân gốc thực sự.

Để đạt được độ bao phủ 100%, chúng tôi nên đảm bảo rằng trường hợp thử nghiệm của chúng tôi bao gồm tất cả các phân vùng đã xác định. Chúng ta có thể đo phạm vi kiểm tra phân vùng tương đương là số lượng phân vùng được kiểm tra bởi ít nhất một giá trị chia cho tổng số phân vùng được công nhận.


### Cạm bẫy

Bây giờ chúng ta đã biết phân vùng tương đương hữu ích như thế nào, hãy để cố gắng hiểu một số cạm bẫy của nó.

Thành công của phân vùng Tương đương phụ thuộc vào khả năng tạo phân vùng chính xác của chúng tôi. Nghe có vẻ đơn giản phải không? Nếu bạn đào sâu hơn, bạn sẽ nhận ra rằng chúng tôi đang thử nghiệm ứng dụng dưới dạng hộp đen. Do đó, khả năng của chúng tôi để tạo giới hạn phân vùng cho những gì được gọi trong yêu cầu. Chúng tôi không có hiểu biết về thiết kế và những gì nhà phát triển sẽ mã hóa.

Nếu chúng ta lấy ví dụ về phòng tập thể dục của mình - Hãy giả sử nhà phát triển đã viết dưới đây logic-

Nếu (tuổi> 16 và Tuổi <60)

{Cho phép người dùng gửi biểu mẫu}

Bạn có thấy vấn đề ở đây không? Yêu cầu cho biết tuổi phải lớn hơn hoặc bằng 16. Nếu chúng ta đi theo quy tắc phân vùng, chúng ta có thể bỏ lỡ việc kiểm tra 16 làm giá trị. Ngoài ra, phân vùng không phân phối các giá trị âm khác như nhập các ký tự không phải là số (@, abc, v.v.). Vì vậy, trong khi phân vùng giúp chúng tôi giảm thiểu các trường hợp thử nghiệm của mình để tối đa hóa phạm vi cover , chúng tôi cần lưu ý rằng nó không bao gồm tất cả các kết hợp cần thiết để kiểm tra ứng dụng thành công.

Thảo luận về việc sử dụng các kỹ thuật như Phân tích giá trị biên để che giấu một số cạm bẫy của việc sử dụng phân vùng một mình đã nêu trong link bài viết dưới đây :
https://viblo.asia/p/phan-tich-gia-tri-bien-ky-thuat-trong-kiem-thu-hop-den-3Q75w8mJKWb


Refer link :
https://www.toolsqa.com/software-testing/istqb/equivalence-partitioning/