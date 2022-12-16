Nguồn: https://levelup.gitconnected.com/the-problem-you-solve-is-more-important-than-the-code-you-write-d0e5493132c6

-----
Các lập trình viên dường như đã quên mục đích thực sự của phần mềm, đó là giải quyết một vấn đề thực tế.
<br>
<br>

50 năm trước, vào năm 1968, Hội nghị việc làm về Kỹ thuật phần mềm đã được tổ chức, được Ủy ban Khoa học NATO tài trợ. Vào thời điểm đó, mọi người bắt đầu nhận thấy phần mềm đã trở thành một phần cơ bản của xã hội. Tuy nhiên, nó cũng trở nên quá khó hiểu. Sau hội nghị đó, lập trình bắt đầu thật sự trở thành một ngành công nghiệp. Nó bắt đầu rời khỏi sự kiểm soát của các nhà doanh nghiệp.
<br>
<br>
Dù cho lập trình đã tiến một bước dài kể từ đó, đâu đó vẫn tồn tại một vấn đề về ranh giới giữa công việc kinh doanh với phát triển phần mềm (programming) - hay "kỹ nghệ" (engineering) như cái cách người ta gọi nó lần đầu trong hội nghị. Nếu các lập trình viên trở nên quá tập trung vào công việc phát triển, họ có thể quên mất mục đích đằng sau phần mềm mà họ đang viết. Họ có thể không thấy các giải pháp tiềm ẩn mà nó không tốn một dòng code nào.
<br>
<br>
Đây là một ví dụ.
<br>
<br>
Đã có một startup xây dựng một thiết bị mà sẽ cho phép một người mở khóa cửa ngôi nhà của họ bằng cách sử dụng Bluetooth. Giao diện trực quan để giao tiếp với thiết bị là một tiện ích, hiển thị ngay cả khi điện thoại bị khóa. Nó có một nút gọi là "Mở cửa."
<br>
<br>
Khi người dùng đến gần nhà hơn, họ sẽ lấy điện thoại, tìm tiện ích và sau đó nhấp vào nút để mở.
<br>
<br>
Ai đó nhìn vào workflow đó và hỏi:
<br>
> Nếu chúng tôi đang sử dụng Bluetooth và giả sử bất cứ ai có điện thoại đều có thể vào nhà, tại sao chúng ta cần phải khiến người đó lấy điện thoại và nhấn nút? Hãy để cửa tự mở khóa khi phát hiện thiết bị đang tiếp cận trong khoảng cách 1 mét. Bằng cách này, chúng tôi không cần phải trả chi phí để thiết kế và lập trình một giao diện trực quan!

<br>
Câu chuyện Bluetooth là một ví dụ tuyệt vời về tập trung vào mục tiêu (narrow focus): Mục đích là để mở khóa cửa với nỗ lực tối thiểu. Nó không có ý nghĩa để thiết kế một giao diện trực quan nếu các có cảm biến không dây (ND: Bluetooth).
<br>
<br>
Nếu bạn biết những gì doanh nghiệp đang cố gắng đạt được và giá trị của người dùng là gì, bạn có thể hợp nhất kiến thức đó với kiến thức của bạn về những gì có thể làm bằng công nghệ. Chỉ sau đó bạn sẽ có đủ thông tin để đưa ra câu trả lời tốt hơn và kết luận rằng một giao diện đôi khi không cần thiết cho một sản phẩm.
<br>
<br>
Đó là một ví dụ tuyệt vời về cách giải quyết vấn đề trong lập trình mà không cần phải viết thêm bất kỳ một đoạn code nào nào ngoài code cho chức năng mở khóa. Tuy nhiên, giống như Nợ Kỹ Thuật (Technical Debt: https://levelup.gitconnected.com/how-to-use-technical-debt-in-your-favor-98bae475ba68), không có gì nên được sử dụng như một cái cớ để viết những đoạn code tào lao.
<br>

> *Không phải mọi code đều đáng để viết*

<br>
Đôi khi, sửa chữa cho một lỗi nghiêm trọng có thể không phải là một ưu tiên. Nếu bạn là một trao đổi tiền điện tử (crypto exchange) và hệ thống của bạn cho phép một khoản tiền gửi trùng lặp xảy ra một lần, can thiệp của con người có thể là giải pháp chi phí/lợi ích tốt nhất nếu chi phí để khắc phục vấn đề là cao.
<br>
<br>
Sự cân bằng giữa Mức độ nghiêm trọng và Mức độ ưu tiên nhắc tôi về một mô hình mà một đồng nghiệp đã cho tôi thấy gần đây. Nó được gọi là Ma trận Ưu tiên, một mô hình hai chiều có thể được sử dụng để ưu tiên các lỗi dựa trên số lượng người dùng mà nó ảnh hưởng đến
 và mức độ nghiêm trọng.

![](https://cdn-images-1.medium.com/max/800/1*fLA3Xc_7sNVsCI2E_E8LGg.png)

Một hình ảnh mô tả Ma trận Ưu tiên hai chiều. Trục Y đại diện cho cột có chú thích "Người dùng bị ảnh hưởng" chứa các giá trị "một", "một số" và "tất cả". Trục X đại diện cho cột có chú thích "Mức độ nghiêm trọng" chứa các giá trị "thẩm mỹ", "bất tiện" và "ngừng hoạt động". Mức độ ưu tiên của lỗi ít nhiều quan trọng theo vị trí trên trục. Ví dụ, nếu một lỗi là thẩm mỹ và ảnh hưởng đến một người dùng, mức độ ưu tiên là 4; nếu một lỗi ngăn chặn công việc của ai đó và ảnh hưởng đến một số người dùng, mức độ ưu tiên là 1; nếu một lỗi ngăn chặn công việc của người khác và ảnh hưởng đến tất cả người dùng, nó có ưu tiên tối đa với giá trị bằng 0.
Vấn đề tiền gửi trùng lặp duy nhất được mô tả trước đó rơi vào danh mục sự bất tiện ảnh hưởng đến một người dùng. Do đó, ưu tiên 3.
<br>

> *Không phải mọi lỗi đều đáng sửa.*

<br>

Một điều rất phổ biến là các lập trình viên đều cố gắng viết script cho tất cả mọi thứ. Tuy nhiên, một số tác vụ lặp lại có thể không đáng tự động hóa. Bạn không cần dành thời gian để viết code nếu bạn che giấu các kiến ​​thức nền tảng về cách hoạt động của lệnh cơ bản.
<br>
<br>
Có sự khác biệt giữa việc đóng gói logic phức tạp và trừu tượng hóa kiến ​​thức hữu ích. Đôi khi, thông tin phải được làm rõ ràng để có thể hiểu được. Nếu bạn cố trừa tượng hoá chúng, chúng có thể có hiệu ứng ngược lại và khó hiểu hơn.
<br>
<br>
Sẽ hữu ích hơn khi sử dụng một số loại lệnh cấp thấp trong CLI hơn là lệnh cấp cao mà lại trừu tượng, chẳng hạn như Git alias.

<br>

> *Không phải mọi lệnh đều đáng giá.*

<br>

Nhiều năm trước, tôi đã làm việc trong một dự án sử dụng Phân phối gia tăng (Incremental Delivery). Đó là một hệ thống xác minh danh tính sẽ yêu cầu người dùng gửi một số dữ liệu cá nhân để được xác minh bởi nhà cung cấp bên thứ ba.
<br>
<br>
Có một tính năng là validate lĩnh vực yêu thích mà team muốn xây dựng. Tuy nhiên, câu chuyện về validate đã không được ưu tiên cho các kế hoạch chạy nước rút khi deadline trở nên gần hơn và gần hơn. Cuối cùng, team đã phát hiện ra rằng ngay từ đầu cái validate này chẳng có ý nghĩa gì.
<br>
<br>
Đây là lý do: Xác thực là bắt buộc!
<br>
<br>
Thông tin cung cấp cần phải chính xác vì chính lợi ích của người dùng. Nếu người dùng cung cấp dữ liệu sai, chúng sẽ không được xác thực và sẽ không thể sử dụng hệ thống. Bên cạnh đó, hầu hết các trình duyệt đều hỗ trợ xác thực HTML tiêu chuẩn đủ tốt.
<br>
<br>
Trong trường hợp xấu hơn, người dùng không thể tự xác minh sẽ gọi hỗ trợ để được xác minh theo cách thủ công.

<br>

> *Không phải mọi tính năng đều đáng giá.*

<br>

Là một lập trình viên, nếu bạn hiểu vấn đề bạn đang cố gắng giải quyết, bạn sẽ có khả năng đưa ra code tốt hơn và đôi khi không cần dòng code nào cả. Bạn không phải là Code Monkey được trả tiền để viết các ký tự trên màn hình. Bạn là một chuyên gia được trả tiền để giải quyết vấn đề.
<br>
<br>
Tuy nhiên, nếu bạn cố gắng giải quyết mọi vấn đề với công nghệ mà không suy nghĩ, như thể code là một viên đạn bạc, bạn sẽ gặp khó khăn để hiểu điều gì mang lại giá trị cho khách hàng và đưa ra những ý tưởng tốt.
<br>
<br>
Mục đích của bạn và mục đích của code bạn viết là tạo ra giá trị và làm cho thế giới hiện tại trở thành một nơi tốt hơn, chứ không phải để đáp ứng cái nhìn vị kỷ của bạn về những gì thế giới nên có.
<br>
<br>
Có câu nói rằng: "Nếu tất cả những gì bạn có là một cái búa, tất cả mọi thứ sẽ trông giống như một cái đinh."
<br>
<br>
Tốt hơn là nên có một cái đinh trước rồi bạn có thể xem xét sự cần thiết của một cái búa.
<br>
<br>
Tức là, nếu ngay từ đầu bạn cần một cái đinh ...