**Thiên kiến xác nhận (Xu hướng nhận thức) trong kiểm thử phần mềm: Bạn đã bị ảnh hưởng chưa?**

Ngành kiểm thử phần mềm đang chuyển động với tốc độ chóng mặt với những tiến bộ công nghệ nhằm đảm bảo: Chất lượng với tốc độ ánh sáng.

“Continuous Integration, Digital transformation, life-cycle automation, shifting quality to the left to minimize costs” (tạm dịch: Kiểm thử tích hợp liên tục, chuyển đổi kỹ thuật số, tự động hóa vòng đời kiểm thử, chuyển chất lượng sang trái để giảm thiểu chi phí), là một số từ thật kỳ diệu đang xoay tròn quanh nhau. Trong khi chúng ta nói về những điều này, câu hỏi cơ bản - "Tại sao và làm sao mà chúng ta bị sót bug khi kiểm thử?" vẫn tiếp tục được nghe và mãi vẫn chưa có câu trả lời rõ ràng cho nó.

Mặc dù tất cả chúng ta đều nghĩ rằng mình rất logic, có cấu trúc cơ sở và hợp lý, một thực tế đang buồn là tất cả chúng ta đều chịu ảnh hưởng của xu hướng nhận thức - thứ ảnh hưởng đến quá trình suy nghĩ của chúng ta trong cuộc sống hàng ngày và cả công việc chuyên môn của chúng ta.

### Xu hướng nhận thức - Giới thiệu

Theo định nghĩa từ Wikipedia: " [Thiên kiến xác nhận](https://vi.wikipedia.org/wiki/Thi%C3%AAn_ki%E1%BA%BFn_x%C3%A1c_nh%E1%BA%ADn) (còn gọi là thiên kiến (thiên lệch) khẳng định) là một khuynh hướng của con người ưa chuộng những thông tin nào xác nhận các niềm tin hoặc giả thuyết của chính họ. 

Con người biểu hiện thiên kiến hoặc định kiến này khi họ thu thập hoặc ghi nhớ thông tin một cách có chọn lọc, hay khi họ diễn giải nó một cách thiên vị, thường đi kèm với sự từ chối xem xét các góc nhìn khác. Ảnh hưởng của thiên kiến xác nhận mạnh hơn đối với các vấn đề liên quan tới cảm xúc, hoặc những đức tin đã ăn sâu vào tâm thức.

Người ta cũng có xu hướng diễn dịch bằng chứng không rõ ràng để ủng hộ cho lập trường có sẵn của họ."

Với chừng đó khái niệm cũng đủ cho bạn hiểu sơ qua Xu hướng nhận thức là gì rồi chứ. Vậy thì làm thế nào mà nó tác động đến suy nghĩ và ý nghĩa của nó đối với những người kiểm thử trong thế giới kiểm thử phần mềm?

Khi những người kiểm thử tiếp cận bất kỳ loại thử nghiệm nào, họ đã bị ảnh hưởng bởi những thành kiến của chính họ - đóng khung những suy nghĩ và phán đoán dựa trên: cần tìm những gì, nơi sẽ có những nguy cơ tiềm ẩn, ai đang phát triển nó, toàn bộ lịch sử của chương trình, v.v. Và danh sách cứ thế kéo dài.

Chúng ta cần phải biết về các loại sai lệch khác nhau trong nhận thức, để chúng ta có thể nhận thức rõ hơn và thực sự nghĩ đến việc quản lý chúng một cách hiệu quả trong làm việc.

### Các loại Xu hướng nhận thức trong kiểm thử phần mềm thường thấy:

![](https://images.viblo.asia/ff5e6119-bc80-4344-982a-be3b4f12c602.png)

#### 1. Resemblance Bias - Xu hướng tương đồng

**Dễ dàng đánh giá một tình huống dựa trên sự giống nhau của một tình huống tương tự đã từng xảy ra.**

Ví dụ: Là một người kiểm thử, vấn đề tôi thường gặp nhất đó là: Tester thường có xu hướng nghĩ rằng lỗi này hay xảy ra ở ứng dụng web thì khi bắt đầu kiểm tra ứng dụng khác chúng ta lại quá tập trung vào những vấn đề mà bạn từng gặp, thay vì  phân bố đồng đều cho việc kiểm tra ưng dụng. Điều này có lợi khi bạn có thể phòng tránh được sự lặp lại của lỗi, nhưng lại hại nhiều hơn là bạn không có đủ thời gian để kiểm thử những trường hợp khác nếu như bạn không phân bố được công việc.

Hoặc nếu bạn nghĩ vấn đề này nó chả bao giờ xảy ra đâu, hồi trước bạn từng kiểm thử ở ứng dụng cũ cả trăm lần rồi lần nào cũng Passed, thì làm sao mà nó lại Failed được.

Chúng ta, với tư cách là người kiểm thử, một cách tự nhiên thì sẽ chỉ tìm ra những lỗi tương tự tùy thuộc vào bản chất của dự án. Thật không may, vì bản chất này, đôi khi chúng ta có xu hướng bỏ lỡ những điều rõ ràng nhất chỉ vì tâm trí của chúng ta không cho phép chúng ta nghĩ tới điều đó.

#### 2. Congruence Bias - Xu hướng đồng quy

**Đây là hành vi mà tâm trí của chúng ta từ chối suy nghĩ cho các lựa chọn thay thế.**

Điều đó có nghĩa là, người kiểm thử luôn có xu hướng chỉ kiểm tra những trường hợp mong muốn, kết quả là các [trường hợp tiêu cực](https://www.softwaretestinghelp.com/what-is-negative-testing/) sẽ bị bỏ lỡ.

Khi các tài liệu kiểm thử - testcase đang được viết, chúng ta có xu hướng bao quát, kiểm tra được toàn bộ tài liệu Requirement dự án với những mong muốn từ khách hàng và bỏ lỡ các trường hợp tiêu cực trong kiểm thử, bởi vì không phải toàn bộ các luồng kiểm thử tiêu cực đều được liệt kê trong tài liệu.

Chúng tiềm ẩn trong những yêu cầu, tài liệu của khách hàng và thực tế là không thể ghi lại được tất cả các hành vi của người dùng khi sử dụng.

#### 3. Confirmation Bias - Xu hướng xác nhận

**Đây là một xu hướng tìm kiếm và giải thích thông tin bằng cách xác nhận niềm tin và giả thuyết của chính mình đã có.**

Thông thường, trong kiểm thử, chắc chắn rằng chúng ta sẽ có những tình huống mà chúng ta nghĩ rằng source code do developer đặc biệt nào đó mặc định sẽ có nhiều bug hơn bình thường, do đó chúng ta dành nhiều thời gian để kiểm thử lại mô-đun do anh ta phát triển.

Khi bạn chịu ảnh hưởng từ nhận thức này, thì bạn dễ dàng vô tình bỏ qua những lỗi từ nhà phát triển khác.

#### 4. Hiệu ứng đám đông

![](https://images.viblo.asia/08ef8e66-49af-4e75-81e4-9b80e0acd9c4.jpg)

**Hiệu ứng đám đông khẳng định hành vi hoặc niềm tin khi lan truyền trong số đông người.**

Khi một lượng người nhất định tin vào một cái gì đó là đúng đắn, thì nó sẽ tự động tăng xác suất người khác cũng tin như vậy. Điều này xảy ra thường xuyên trong cuộc sống hàng ngày của chúng ta.

Một ví dụ phổ biến nhất là khi chúng ta mua một sản phẩm hay xem một bộ phim. Thay vì chúng ta độc lập lựa chọn theo nhu cầu, tiêu chí của chính mình thì chúng ta lại thường tin vào lựa của đa số người khác.

Chính xác thì hành vi tương tự cũng được hình thành trong khi thực hiện kiểm thử. Trong một nhóm phát triển, khi có một số người cảm thấy rằng một mô-đun hay một chức năng/màn hình gì đó có ít lỗi thì người trong nhóm cũng vô tình có xu hướng tin như vậy và trọng tâm của mọi người dành cho nó khi thực hiện kiểm thử giảm đi đáng kể.

#### 5. In-Attentional Blindness - Không chú ý vào điểm mù

**Đây là một hành vi mà dưới góc nhìn là một Tester - chúng ta thường tập trung vào những thức trước mặt và bỏ qua mất những lỗi nghiêm trọng.
**

Ví dụ trong một hoàn cảnh cụ thể: Khi bạn tham gia một bữa tiệc, bạn yêu cầu mọi người đếm số người tham gia và bao nhiêu nam, nữ. Thì chắc chắc hiện tượng tự nhiên là họ sẽ chỉ mải tập trung vào những thứ trước mắt mà quên đi những điều khác cũng quan trọng không kiếm ngay bên cạnh, kiểu như có rất nhiều người mặc áo màu sắc khác nhau, hay có một số nhân vật quan trọng vắng bữa tiệc mà không ai để ý.

Liên hệ vào trong việc kiểm thử phần mềm, ví dụ, bạn được một developer đưa cho một màn hình mới toanh và nhờ bạn kiểm tra, việc bạn mải tập trung vào màn hình mới này có thể gây cho bạn xao nhãng thứ khác hoặc bỏ sót những bug quan trọng, hoặc những bug ảnh hưởng từ màn hình đó mà ra.

![](https://images.viblo.asia/bd15fca9-786d-4563-93f0-b5698b8ce143.jpg)

### Kết luận

Hy vọng bạn sẽ có cái nhìn rõ ràng hơn về Xu hướng nhận thức trong kiểm thử phần mềm, ảnh hưởng của nó và những gì có thể đạt được khi bạn có thể loại bỏ được những ảnh hưởng xấu.

Và một thực tế quan trọng cần nhận ra là chúng ta mù quáng trước những thành kiến của **chính mình**, trong khi chúng ta có thể xác định rõ những thành kiến của người khác. Tuy nhiên, chúng ta có thể có ý thức hơn và khi ở một mức độ lớn, chúng ta có thể mở rộng suy nghĩ nhiều hơn về những điều này bất cứ khi nào cần thiết.


-----

Nguồn: https://vi.wikipedia.org/wiki/Thi%C3%AAn_ki%E1%BA%BFn_x%C3%A1c_nh%E1%BA%ADn

https://www.softwaretestinghelp.com/cognitive-bias-in-software-testing/

https://spiderum.com/bai-dang/Thien-kien-xac-nhan-Nguyen-nhan-cho-nhung-quyet-dinh-sai-lam-ban-hay-mac-phai-trong-cuoc-song-7wu