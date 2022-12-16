# Giới thiệu

&emsp;&emsp;Có thể nói, phát triển phần mềm là một trong những công việc sáng tạo nhất trong lịch sử nhân loại. Thật vậy, lập trình viên không hề bị gò bó bởi các giới hạn trong cuộc sống thực tế như các định luật vật lý; chúng ta có thể tạo ra những thế giới ảo kỳ thú và thực hiện các hành động không khả thi trong đời thật. Lập trình không yêu cầu năng khiếu thể chất hay sự phối hợp điêu luyện như nhảy ba-lê và bóng bầu dục, mà tất cả những gì cần thiết để lập trình là một tâm hồn sáng tạo và khả năng tổ chức những ý nghĩ. Nếu bạn có thể hình dung ra một hệ thống, thì bạn chắc hẳn có thể triển khai thực hiện nó trên một chương trình máy tính.<br>
&emsp;&emsp;Điều này có nghĩa rằng giới hạn lớn nhất khi viết một phần mềm là khả năng thấu hiểu những hệ thống mà chúng ta đang thực hiện.  Khi một chương trình được phát triển và bổ sung thêm nhiều tính năng, nó trở nên phức tạp, với những ràng buộc không đáng kể giữa các thành phần của nó. Qua một thời gian, sự phức tạp tích tụ và khiến lập trình viên gặp khó khăn khi chỉnh sửa hệ thống vì phải duy trì trong đầu tất cả những thông tin cần thiết. Việc này làm chậm quá trình phát triển phần mềm và dẫn đến lỗi (bugs), điều lại khiến việc phát triển chậm hơn nữa và tiêu tốn thêm tiền của. Trong vòng đời của bất kì chương trình nào, sự gia tăng của sự phức tạp là không thể tránh khỏi. Chương trình càng lớn, càng nhiều người tham gia làm việc với nó, thì càng khó để quản lý sự phức tạp.<br>
&emsp;&emsp;Ngày nay có rất nhiều công cụ tốt giúp chúng ta trong việc đối phó với sự phức tạp khi phát triển phần mềm, tuy nhiên, chỉ sử dụng công cụ là không đủ. Nếu chúng ta muốn việc viết phần mềm trở nên dễ dàng hơn, để có thể xây dựng những hệ thống mạnh mẽ với ít chi phí hơn, thì ta phải tìm cách để khiến phần mềm trở nên đơn giản hơn. Sự phức tạp vẫn sẽ tăng theo thời gian, mặc cho những nỗ lực tốt nhất của ta, nhưng thiết kế đơn giản hơn cho phép chúng ta xây dựng những hệ thống mạnh mẽ và lớn hơn, trước khi sự phức tạp trở nên khó kiếm soát.<br>
&emsp;&emsp;Tất cả những điều trên là phần giới thiệu trong cuốn sách [Philosophy of Software Design](https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201) của John Ousterhout. Cuốn sách này được phát hành vào tháng 4 năm 2018, và trở thành một trong những cuốn sách được khuyên đọc cho mọi lập trình viên với nhiều đánh giá cao từ các lập trình viên kỳ cựu. Bản thân tác giả hiện tại đang là giáo sư chuyên ngành Khoa học máy tính tại đại học Stanford. Ông cũng là tác giả của ngôn ngữ lập trình TCL và được biết đến với nhiều công trình nghiên cứu về hệ điều hành phân tán và hệ thống lưu trữ. Cuốn sách Philosophy of Software Design (Triết lý trong phát triển phần mềm) được John đánh giá như là một sự phản chiếu những kinh nghiệm cá nhân của mình, và ông muốn truyền đạt nó với mục tiêu là giúp người đọc có được những kỹ thuật làm giảm sự phức tạp khi xây dựng hệ thống phần mềm.<br>
&emsp;&emsp;Cá nhân tôi đã đọc xong quyển sách này và muốn giới thiệu nó đến tất cả mọi người trong cộng đồng lập trình viên Việt Nam, đặc biệt là các bạn sinh viên, freshers hay juniors. Tôi nghĩ thậm chí seniors cũng không nên bỏ qua, bởi khi tác giả giới thiệu những nội dung trong cuốn sách tới các kỹ sư phần mềm tại Google, vẫn có rất nhiều người phải trầm trồ. Bài viết này là những ghi chú tóm tắt của tôi trong và sau quá trình đọc Philosophy of Software Design của tác giả John Ousterhout.<br>

# Bản chất của sự phức tạp

&emsp;&emsp;Chúng ta đang đối đầu với sự phức tạp, và đầu tiên ta phải hiểu được kẻ thù của mình bằng cách trả lời các câu hỏi sau:
* "Sự phức tạp" chính xác là gì? 
* Hệ thống như thế nào được xem là phức tạp một cách không cần thiết?  
* Điều gì khiến cho hệ thống trở nên phức tạp?

&emsp;&emsp;Ở phần này, chúng ta sẽ trả lời cách câu hỏi trên ở mức độ trừu tượng, còn mức độ cụ thể sẽ nằm ở những phần sau.

## Định nghĩa

> Sự phức tạp, là mọi thứ liên quan đến cấu trúc của một hệ thống phần mềm, khiến cho việc hiểu hay thay đổi hệ thống đó gặp khó khăn.

&emsp;&emsp;Ví dụ: Khó để hiểu được cách một đoạn code làm việc, hay không rõ phải sửa những phần nào trong code khi thay đổi một tính năng.<br>
&emsp;&emsp;Nói một cách khác, một hệ thống phần mềm khó hiểu hay khó chỉnh sửa thì được coi là phức tạp. Ngược lại, nếu nó dễ hiểu và dễ thay đổi, thì được coi là đơn giản. Bạn cũng có thể hiểu sự phức tạp theo chi phí và lợi nhuận: trong một hệ thống phức tạp, việc triển khai một cải tiến nhỏ cũng phải tốn nhiều công sức, thời gian; còn trong một hệ thống đơn giản, cải tiến lớn hơn có thể được triển khai với ít chi phí và công sức hơn. Mọi người thường sử dụng từ "phức tạp" để miêu tả các hệ thống lớn với nhiều tính năng, nhưng nếu có thể làm việc trên các hệ thống đó một cách dễ dàng,  thì theo mục đích của cuốn sách và bài viết này, nó không được coi là phức tạp.<br>
&emsp;&emsp;Người đọc sẽ thấy rõ sự phức tạp hơn là bản thân người viết. Nếu bạn viết một đoạn code và nó trông đơn giản với bạn nhưng người khác nghĩ nó là phức tạp, vậy thì nó là phức tạp. Trong tình huống này, tốt hơn là tìm hiểu nguyên nhân khiến cho đoạn code phức tạp đối với người đọc. Công việc của một lập trình viên không chỉ là viết code sao cho hoàn thành tác vụ và bản thân dễ làm việc, mà còn là viết code sao cho người khác có thể cùng làm việc một cách dễ dàng.

## Biểu hiện của sự phức tạp

&emsp;&emsp;Một hệ thống phức tạp có các triệu chứng sau đây:
* **Thay đổi trên diện rộng (Change amplification)**: Một thay đổi tưởng chừng đơn giản lại yêu cầu chỉnh sửa ở nhiều nơi khác nhau.<br>
Ví dụ: Một website bao gồm nhiều trang khác nhau, các trang đều có màu nền giống nhau và mã màu sắc được ghi rõ ở mỗi trang. Khi muốn thay đổi màu nền cho website, lập trình viên phải thay đổi mã màu ở tất cả các trang hiện có. Thay vì cách làm này, người lập trình viên có thể tạo một biến, tại một vị trí trung tâm nào đó, chứa giá trị là mã màu nền và trỏ tới biến đó ở mỗi trang. Như vậy, chỉ một thay đổi ở biến màu nền kia là toàn bộ màu nền ở tất cả các trang sẽ cùng được thay đổi.
* **Khối lượng kiến thức (Cognitive load)**: Khối lượng kiến thức chỉ ra lượng thông tin mà một lập trình viên cần biết để hoàn thành một tác vụ. Khối lượng kiến thức lớn nghĩa là lập trình viên phải dành nhiều thời gian để học những kiến thức được yêu cầu, và rủi ro tạo ra bugs là rất lớn nếu người đó lỡ mất một vài thứ quan trọng.<br>
Ví dụ: Hàm cấp phát bộ nhớ của C trả về một con trỏ, trỏ đến bộ nhớ được cấp phát và người gọi hàm cần giải phóng bộ nhớ đó sau khi không sử dụng nữa, nếu không sẽ gây ra lỗi rò rỉ bộ nhớ. Điều này làm tăng khối lượng kiến thức mà người lập trình viên cần để sử dụng hàm.<br>
Khối lượng kiến thức tăng lên theo nhiều cách, như là các APIs với nhiều phương thức, các biến toàn cục, sự không nhất quán và ràng buộc giữa các modules.  Những người thiết kế hệ thống đôi khi cho rằng sự phức tạp được đo bởi số dòng code, rằng một cách cài đặt ngắn hơn thì được coi là đơn giản hơn, và nếu chỉ cần vài dòng code là có thể tạo ra một sự thay đổi, thì hẳn sự thay đổi đó là đơn giản. Tuy nhiên, cách nhìn này đã bỏ qua cái giá liên quan đến khối lượng kiến thức. Đôi khi, một cách tiếp cận yêu cầu nhiều dòng code hơn lại thực sự đơn giản hơn, bởi nó giảm đi khối lượng kiến thức.
* **Ẩn số không xác định (Unknown unknowns)**: Ẩn số không xác định có nghĩa là không xác định được một cách rõ ràng, rằng đoạn code nào cần được thay đổi để hoàn thành một tác vụ, hay thông tin nào một lập trình viên cần để thực hiện thành công tác vụ đó.<br>
Ví dụ: Quay trở lại với ví dụ website. Khi lập trình viên sử dụng một biến trung tâm để xác định mã màu nền, việc thay đổi màu nền trên toàn bộ các trang trở nên đơn giản. Tuy nhiên, một vài trang trong đó sử dụng màu tương phản cho font, và màu font này lại được ghi rõ ở từng trang. Nếu màu nền thay đổi, thì màu font cũng phải thay đổi theo. Thật không may là lập trình viên không nhận ra điều này, nên anh ta chỉ thay đổi mỗi màu nền. Và kể cả khi anh ta nhận ra vấn đề, thì cũng phải tìm kiếm ở từng trang để biết được trang nào sử dụng màu font tương phản.

&emsp;&emsp;Trong ba triệu chứng trên, ẩn số không xác định là tệ nhất, bởi nó là thứ bạn cần biết, nhưng lại không có cách nào để tìm ra nó là gì hay để biết liệu nó có phải là vấn đề hay không. Bạn sẽ không tìm ra nó cho đến khi bugs xuất hiện sau khi thay đổi được tạo ra. Thay đổi trên diện rộng cũng rất phiền toái, nhưng miễn là nó rõ ràng rằng đoạn code nào cần được thay đổi, hệ thống sẽ hoạt động một khi tất cả thay đổi được hoàn thành. Tương tự, khối lượng kiến thức lớn sẽ làm tăng chi phí thay đổi của hệ thống, nhưng miễn là nó rõ ràng thông tin nào cần biết, thì thay đổi sẽ có khả năng cao vẫn là chính xác.<br>
&emsp;&emsp;Một trong những mục tiêu quan trọng của một thiết kế tốt là hệ thống phải minh bạch, rõ ràng. Điều này ngược lại với khối lượng kiến thức lớn và ẩn số không xác định. Các phần sau sẽ trình bày các kĩ thuật khiến cho code trở nên minh bạch hơn.

## Nguồn gốc của sự phức tạp

&emsp;&emsp;Sự phức tạp của một hệ thống do hai tác nhân gây ra: 
* **Các ràng buộc (Dependencies)**: Theo mục đích của cuốn sách và bài viết, một ràng buộc tồn tại khi không thể hiểu hay chỉnh sửa một đoạn code một cách độc lập. Nghĩa là, đoạn code A liên kết với đoạn code B bằng một cách nào đó, và đoạn code B phải được xem xét hoặc chỉnh sửa khi đoạn code A được thay đổi. 
Ràng buộc là phần cơ bản trong phần mềm và ta không thể loại bỏ hoàn toàn. Trong thực tế, ta cố ý tạo ra những ràng buộc như một phần của quy trình thiết kế phần mềm. Tuy nhiên, một trong những mục đích của thiêt kế phần mềm là giảm số lượng ràng buộc và làm cho chúng trở nên đơn giản và rõ ràng nhất có thể.
* **Sự mờ mịt (Obscurity)**: Sự mờ mịt xuất hiện khi thông tin quan trọng không được thể hiện rõ ràng. Một  ví dụ đơn giản là tên của biến mang ý nghĩa quá rộng và không truyền tải được thông tin hữu ích, cụ thể như: time. Sự mờ mịt cũng thường đi đôi với ràng buộc, khi một ràng buộc tồn tại một cách không minh bạch. Sự không nhất quán cũng là tác nhân dẫn đến sự mờ mịt: nếu một tên biến được dùng cho nhiều mục đích khác nhau, thì lập trình viên khó mà xác định được mục đích của biến với tên đó là gì.

## Sự phức tạp tăng trưởng dần dần

&emsp;&emsp;Sự phức tạp không được gây ra bởi một lỗi nghiêm trọng, nó tích tụ từ nhiều phần nhỏ. Một ràng buộc hay một sự mờ mịt, dường như chẳng làm ảnh hưởng lớn đến khả năng bảo trì của hệ thống phần mềm. Sự phức tạp xuất hiện khi hàng trăm, hay hàng nghìn ràng buộc và sự mờ mịt tích dồn lại theo thời gian. Đến cuối cùng, có quá nhiều vấn đề nhỏ mà mỗi thay đổi trong hệ thống đều bị ảnh hưởng bởi chúng.<br>
&emsp;&emsp;Bản tính tăng trưởng dần dần này khiến ta khó quản lý sự phức tạp. Một chút phức tạp gây ra bởi thay đổi hiện tại không là vấn đề gì, tuy nhiên nếu tất cả lập trình viên đều làm việc theo cách đó thì sự phức tạp sẽ tích tụ lớn lên nhanh chóng. Khi đó, sẽ rất khó để loại bỏ được sự phức tạp của hệ thống, bởi vì chỉ thay đổi một ràng buộc hay loại bỏ một sự mờ mịt sẽ chẳng mang lại sự khác biệt đáng kể.

# Code hoạt động thôi là không đủ

&emsp;&emsp;Một trong những yếu tố quan trọng của một thiết kế phần mềm tốt là tư duy bạn áp dụng khi tiếp cận một vấn đề. Rất nhiều tổ chức khuyến khích tư duy chiến thuật, tập trung vào các tính năng sao cho chúng hoạt động được nhanh nhất có thể. Tuy nhiên, nếu bạn muốn một thiết kế tốt, bạn phải tuân thủ cách tiếp cận của tư duy chiến lược, tức là đầu tư thời gian để sửa lỗi và tạo ra thiết kế tốt.

## Lập trình chiến thuật (Tactical programming)

&emsp;&emsp;Hầu hết lập trình viên tiếp cận vấn đề với tư duy chiến thuật. Trong cách tiếp cận này, mục tiêu là làm cái gì đó hoạt động, ví dụ như tạo tính năng mới hay sửa bug. Nếu bạn lập trình chiến thuật, bạn cố gắng để hoàn thành tác vụ nhanh nhất có thể và không dành nhiều thời gian để tìm kiếm thiết kế tốt nhất. Khi đó bạn chấp nhận thêm vào một vài sự phức tạp nho nhỏ, miễn là tác vụ được hoàn thành nhanh chóng. Và đây chính là cách mà một hệ thống trở nên phức tạp, bởi như ở phần trước ta đã nói: sự phức tạp tăng trưởng dần dần.

## Lập trình chiến lược (Strategic programming)

&emsp;&emsp;Bước đầu tiên để trở thành một lập trình viên giỏi là nhận ra rằng **code hoạt động thôi là không đủ**. Việc thêm vào sự phức tạp không cần thiết để hoàn thành tác vụ nhanh chóng là không thể chấp nhận được, vì điều quan trọng nhất là kiến trúc lâu dài (long-term structure) của hệ thống. Vì vậy, bạn không nên coi code hoạt động là mục tiêu chính, mà phải là tạo ra một thiết kế tốt, và tất nhiên là phải hoạt động được. Đây chính là lập trình chiến lược.<br>
&emsp;&emsp;Lập trình chiến lược cần có sự đầu tư thời gian và tư duy. Những đầu tư này ban đầu sẽ làm chậm hơn một chút, nhưng sẽ tăng tốc bạn trên đường dài, như hình minh hoạt bên dưới:
![](https://images.viblo.asia/aee70d4b-2090-4dc7-bd4e-2c7fb9970c1c.jpeg)

## Đầu tư bao nhiêu?

&emsp;&emsp;Đầu tư một khoảng thời gian và tư duy lớn ban đầu cho toàn bộ hệ thống sẽ không hiệu quả, bởi đây là phương pháp thác nước. Thay vào đó, thiết kế lý tưởng của một hệ thống có xu hướng hiện ra dần dần theo thời gian, khi bạn có tăng thêm kinh nghiệm làm việc với hệ thống đó. Do vậy, cách tiếp cận tốt nhất là tiến hành nhiều đầu tư nhỏ vào thiết kế, một cách liên tục. John Ousterhout cho rằng số lượng hợp lý là dành 10-20% toàn bộ thời gian phát triển phần mềm của bạn. 

# Kết luận
&emsp;&emsp;Ở bài viết này, chúng ta đã cùng tìm hiểu về những khái niệm trừu tượng liên quan đến sự phức tạp của thiết kế phần mềm. Ở phần sau, chúng ta sẽ tìm hiểu về các kỹ thuật để giảm sự phức tạp của hệ thống.