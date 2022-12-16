© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Microservice: Từ lý thuyết đến thực tiễn](https://viblo.asia/s/P0lPmr9p5ox)

## 1) Monolithic Architecture
Thời còn sinh viên, chúng ta đã quen thuộc với việc phát triển sản phẩm với mô hình Monolithic, hiểu đơn giản toàn bộ code được đóng gói và phát triển trên duy nhất một project/source code. Số lượng thành viên dao động từ 1 - 5 người. Khi giảng có yêu cầu mới, team sẽ thảo luận chia task và thực hiện implement, build and run và thấy không có gì magic ở đây cả, mọi thứ vẫn perfect. 

> Từ đó, có một vài kết luận khi triển khai Monolithic Architecture với ưu điểm như sau:
> - Quá trình phát triển sản phẩm đơn giản, thay đổi code, build và deploy trên duy nhất một project. Không mất nhiều công để set up môi trường.
> - Phát triển trên ngôn ngữ duy nhất nên chỉ cần nắm sâu và chắc ngôn ngữ đó là giải quyết được hầu hết các vấn đề.

## 2) Real life 
Cuộc đời lại không màu hường như khi ta còn cắp sách tới trường. Các dự án thực tế luôn có xu hướng vận động không ngừng, requirement thay đổi mỗi ngày. Từ đó dẫn đến việc team size tăng lên, thêm người mới nhưng họ chưa có cái nhìn sâu sắc về hệ thống. 

> Nếu 50 developers cùng phát triển một dự án trên một project/source coe (dự án siêu to khổng lồ) duy nhất thì sẽ có vấn đề gì xảy ra. Ta có thể thấy ngay được có một vài rủi ro sau:
> - Project code bằng Java nhưng không thể tuyển đủ head count ngay lập tức. Khó, khả năng dự án phải pending hoặc 1 dev phải làm công việc của 2, 3 người.
> - Về mặt business, phải đảm bảo tất cả các dev hiểu về hệ thống để maintain/implement/fix bug nhanh chóng, chính xác. Trên thực tế, source code quá lớn và chi phí để làm những điều kể trên không nhỏ.
> - Với source code lớn và nhân lực nhiều như vậy, việc push code diễn ra và diễn ra hàng ngày hoặc hàng giờ. Từ đó dẫn đến rủi ro về conflict code, thay vì implement thì sẽ cùng nhau resolve :sweat_smile:.

Như vậy, sẽ có vài hạn chế khi triển khai Monolithic Architecture nhưng chủ yếu là về mặt con người và cách thức hoạt động. 

> Chúng ta sẽ tiếp tục bàn đến khó khăn về mặt technical:
> - Khi update code, phải thực hiện việc build và deploy lại toàn bộ hệ thống dẫn tới mất nhiều thời gian, giảm tính sẵn sàng (availability). Tuy nhiên, thực tế khi triển khai chúng ta luôn deploy nhiều instance (horizontal scale) và sẽ thực hiện deploy từng node một nên đây không phải vấn đề không thể giải quyết.
> - Khi server gặp sự cố, toàn bộ hệ thống sẽ sập. Như cách triển khai ở trên, sẽ có nhiều instance nên việc một node sập cũng không ảnh hưởng lớn, các node còn lại vẫn có thể xử lý được request (trừ khi nó đang xử lý business logic, với trường hợp này thì bất kì kiến trúc sẽ gặp khó khăn không chỉ riêng Monolithic). Nếu đảm bảo code đủ tốt thì sẽ không cần quá lo lắng về vấn đề này.
> - Vì toàn bộ hệ thống sử dụng chung một ngôn ngữ nên sẽ phụ thuộc vào ngôn ngữ đó. Sẽ có trường hợp tính năng này nếu implement với Golang sẽ rất mạnh nhưng lại không làm điều đó vì đang sử dụng C#. Như vậy không tận dụng tối đa được sức mạnh của đa ngôn ngữ.
> - Khi áp dụng horizontal scale (deploy multiple instance) sẽ phát sinh vấn đề đó là có những thành phần không bắt buộc phải scale nhưng vì áp dụng Monolithic nên phải scale toàn bộ hệ thống, dẫn đến việc lãng phí tài nguyên, tốn một ít lúa.

## 3) Mircoservice Architecture
Từ những lý do trên mà Microservice Architecture ra đời. Hiểu một cách đơn giản nhất, Microservice là chia service phần to thành service nhỏ hơn. Cụ thể cách chia như thế nào mình sẽ đề cập ở bài sau.

Vấn đề đầu tiên được giải quyết rất tốt đó là việc quản lý công việc và con người với team size lớn.
Vẫn là 50 developers với bài toán E-commerce bao gồm nhiều các chức năng từ đặt hàng, kiểm tra kho hàng, thanh toán, theo dõi/hủy đơn, chat với seller, review/comment sản phẩm... Áp dụng Microservice, chia bài toán lớn thành những bài toán nhỏ hơn để dễ dàng hơn trong việc quản lý, phát triển sản phẩm.

> Với tư tưởng đó, ta có thể phân thành các team:
> - Order team: 10 developers. Giải quyết phần order.
> - Payment team: 10 developers. Giải quyết phần thanh toán.
> - Inventory team: 10 developers. Giải quyết phần kiểm tra lượng hàng còn lại xem có tạo được order không.
> - Một vài team khác tùy thuộc theo cách phân chia bài toán...

Việc nhân sự đi và đến rất thường xuyên xảy ra. Các thành viên mới chỉ cần nắm sơ bộ tổng quan về hệ thống, tiếp theo đó là đọc source code, tài liệu của team để hiểu được hệ thống hoạt động như thế nào, implement/refactor ra sao. Từ đó trực tiếp rút ngắn thời gian training, giảm cost của dự án.

> Vấn đề liên quan đến con người và cách tổ chức đã được giải quyết. **Với cá nhân mình, đây là ưu điểm mạnh mẽ nhất mà kiến trúc Microservice đem lại**. Thay vì quản lý từ cấp trung ương, ta sẽ quản lý ở cấp địa phương bao gồm quận, huyện, phường, xã...

Bên cạnh đó, không thể thiếu được những ưu điểm về mặt technical mà Microservice đem lại. Theo dõi phần sau để có cái nhìn cụ thể hơn nhé.

## 4) Monolithic vs Microservice
Mục đích chính của phần này là tổng kết lại sự khác biệt, thuận lợi, khó khăn của cả hai kiến trúc Monolithic và Microservice.
### 4.1) Monolithic Architecture
**Ưu điểm**
- Đơn ngôn ngữ nên phát triển đơn giản, source code tập trung. Có rất nhiều framework hỗ trợ.
- Việc debug và test dễ dàng hơn so với Microservice vì chỉ trên một IDE, một project.
- Performance tốt hơn nếu được triển khai đúng đắn (code xịn). Lý do: giao tiếp giữa các service trong Mircoservice sẽ có độ trễ nhất định (bài sau). 
- Yêu cầu về infrastructure không phức tạp. 

**Nhược điểm**
- Theo thời gian, source code sẽ phình lên nhanh chóng (requirement change, refactor, fix bug...) dẫn đến việc người mới mất nhiều thời gian để tìm hiểu.
- Không tận dụng được lợi thế của các ngôn ngữ khác, tốn chi phí để thay đổi ngôn ngữ nếu dự án quá lớn. 
- Deployment sẽ tốn nhiều cost, do source code lớn  thời gian deploy dài. 
- Scale up đơn giản nhưng tốn chi phí cho những phần không cần scale trong hệ thống.

### 4.2) Microservice Architecture
**Ưu điểm**
- Vì chia thành các bài toán nhỏ hơn nên source code cũng nhỏ hơn, dễ dàng thay đổi cập nhật. Vòng đời phát triển sản phẩm nhanh hơn.
- Deployment nhanh hơn, độc lập giữa các service. Các team phát triển nhanh hơn và ít phụ thuộc vào nhau.
- Các issue nếu xảy ra trong 1 service thì sẽ có ít ảnh hưởng hơn tới các service còn lại. Các service còn lại vẫn hoạt đồng bình thường (tuy nhiên không đảm bảo hệ thống hoạt động đúng đắn, phải có các giải pháp để xử lý những vấn đề này).
- Tận dụng được điểm mạnh đa ngôn ngữ để áp dụng cho từng service một cách phù hợp.

**Nhược điểm**
- Rất phức tạp để  thiết kế và triển khai. Yêu cầu kĩ thuật rất cao và đã có kinh nghiệm về hệ thống.
- Performance chậm hơn do việc giao tiếp giữa các service.
- Yêu cầu kiến thức về domain, business tốt để phân chia thành các service nhỏ sao cho phù hợp.
- Vấn đề liên quan đến vận hành và xử lý, nếu một hoặc nhiều service down thì sẽ giải quyết thế nào.
- Yêu cầu infrastructure phức tạp. Không chỉ quản lý các service trong Microservice mà phải quản lý cả các hệ thống liên quan khác. Ví dụ: Message broker, Logging...

## 5) Khi nào nên sử dụng kiến trúc nào
Đúc kết lại, phần quan trọng nhất sẽ nằm ở đây. Chúng ta có thể dựa trên một vài điều kiện dưới đây để quyết định xem nên áp dụng mô hình nào. 

### 5.1) Monolithic Architecture
- Yêu cầu của bài toán nhỏ, khả năng mở rộng trong tương lai ít, đối tượng người dùng không nhiều.
- Team size nhỏ, kinh nghiệm và kiến thức chưa nhiều.
- Yêu cầu phát triển thần tốc, càng nhanh càng tốt.

### 5.2) Microservice Architecture
- Team size lớn và rất lớn, đủ nguồn nhân lực có kiến thức và kinh nghiệm để phát triển.
- Bài toán lớn, khả năng mở rộng và phát triển mạnh mẽ, đối tượng người dùng là rất nhiều hoặc có tiềm năng phát triển cực lớn trong tương lai.
- Muốn thử sức mình với những điều mới mẻ.

### 5.3) Kết luận
No silver bullet, không có mô hình nào có thể giải quyết triệt để được những hạn chế của mô hình kia. Nó sẽ tùy thuộc và cơ cấu tổ chức, bài toán, đặc biệt là kĩ năng và kinh nghiệm của team để quyết định lựa chọn kiến trúc nào.

Chúng ta đã nói về Microservice rất nhiều, nhưng trào lưu thực tế hiện nay, các nhà phát triển đang quay trở lại với mô hình Monolithic vì những ưu điểm của nó và những nhược điểm của Microservice, các vấn đề phải xử lý khi làm việc với Microservice thật sự rất phức tạp và đau đầu. Ý kiến của bạn về vấn đề này như thế nào, hãy để lại bình luận phía dưới nhé.

### Reference
- https://microservices.io/
- [Microservice patterns](https://www.amazon.com/Microservices-Patterns-examples-Chris-Richardson/dp/1617294543)
- [Microservice in action](https://www.amazon.com/Microservices-Action-Morgan-Bruce/dp/1617294454)

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)