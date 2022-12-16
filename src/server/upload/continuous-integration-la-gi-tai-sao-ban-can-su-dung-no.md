![](https://images.viblo.asia/498f3061-e19b-4720-9ca6-9c490287f305.png)

Mặc dù không phải tất cả mọi dự án đều có thể đạt được thành công lớn, nhưng vẫn có những phương pháp và thói quen có thể giúp tăng đáng kể cơ hội thành công của một dự án và làm cho việc phát triển trở thành một trải nghiệm thoải mái hơn. Một trong những thói quen đó chính là sử dụng Tích hợp liên tục (Continuous Integration - sau đây tôi sẽ gọi ngắn gọn là CI)

Ban đầu nó được sử dụng như là một công việc của extreme programming, và mục đích chính của nó là để ngăn chặn các vấn đề liên quan đến tích hợp và để tránh [Integration Hell](https://www.solutionsiq.com/agile-glossary/integration-hell/).

Chúng ta hãy cùng xem Continuous Integration là gì và làm thế nào mà nó có thể giúp chúng ta trở thành một lập trình viên tốt hơn!

Trong bài này ta sẽ tìm hiểu về:

* CI là gì?
* Lợi ích của việc sử dụng CI
* Các yêu cầu
* Tìm hiểu kỹ hơn về các server CI
* Trách nhiệm của bạn khi sử dụng CI
* Continuous Integration vs Continuous Delivery
* Những khó khăn tiềm ẩn

Kiến thức này sẽ giúp cho bạn thực hiện hiệu quả hơn so với việc bạn bước chân vào thế giới CI mà không hiểu điều gì. Sau khi bạn đã hiểu được CI là gì, ta sẽ tìm hiểu những công cụ CI mạnh nhất và chọn giải phát thích hợp nhất với bạn.

Nếu bạn quan tâm đến việc phát triển mobile app hơn, bạn cũng có thể xem danh sách các Top CI tool cho mobile

## Vậy Continuous Integration là gì?

Continuous Integration là một thực hành của việc liên tục tích hợp những thay đổi tạo ra với project và test lại nó hàng ngày hoặc thường xuyên hơn.

Martin Fowler định nghĩa như sau:

> Continuous Integration là một thực hành trong phát triển phần mềm trong đó các thành viên của một đội tích hợp công việc của họ một cách thường xuyên,  thường thì mỗi người sẽ tích hợp ít nhất là hàng ngày - dẫn tới có nhiều tích hợp trong một ngày. Mỗi sự tích hợp sẽ được kiểm định lại bởi một build tự động (bao gồm cả test) để phát hiện ra lỗi tích hợp càng sớm càng tốt. Nhiều người nhận thấy rằng hướng làm việc này giúp giảm thiểu đáng kể các vấn đề khi tích hợp và cho phép một đội phát triển có thể viết phần mềm nhanh hơn.
> 

Tự động hoá việc build, test và deploy của bạn có thể làm giảm bớt nhiều vấn đề đau đầu và thường gặp trong các dự án. Có một phương pháp đáng tin cậy trong việc tích hợp những thay đổi thường xuyên hơn giúp bạn đảm bảo rằng có thể tìm thấy lỗi sớm hơn sau này. Có vấn đề xuất hiện ngay trong ngày demo chỉ vì kết quả của một số phần bạn đã triển khai một vài tháng trước và không có cơ hội thích hợp để kiểm tra các phần khác trong hệ thống của bạn không phải là một điều dễ chịu.

Tất cả chúng ta có thể đồng ý rằng việc để xảy ra vấn đề ngay trong ngày thực hiện việc demo là một trải nghiệm không hề dễ chịu. CI có thể giúp bạn giảm thiểu nó. Rất nhiều.

Chúng ta hãy xem một vòng đời CI cơ bản sẽ trông như thế nào:

![](https://images.viblo.asia/8faaabf3-6ff2-406c-b840-b2580e8e635a.png)

## Lợi ích của việc sử dụng CI

Sử dụng CI đem lại rất nhiều lợi ích, có thể kể đến như sau:

- **Giảm rủi ro tích hợp**:  làm việc trên các dự án có nghĩa là nhiều người đang làm việc trên các task riêng biệt hoặc các phần của mã nguồn. Càng nhiều người, sự tích hợp càng nguy hiểm. Tùy thuộc vào vấn đề thực sự tồi tệ như thế nào, việc sửa lỗi và giải quyết vấn đề có thể thực sự gây ra phiền phức và có thể có nghĩa là có nhiều thay đổi đối với mã nguồn. Thực hiện tích hợp hàng ngày hoặc thậm chí thường xuyên hơn có thể giúp giảm thiểu các loại vấn đề này ở mức tối thiểu.

- **Chất lượng code cao hơn**: Không cần phải lo lắng về các vấn đề xảy ra và tập trung nhiều hơn vào các tính năng của hệ thống giúp ta viết ra sản phẩm có chất lượng cao hơn.

- **Code trên version control luôn hoạt động**: Nếu bạn commit phần nào đó làm hỏng việc build, bạn và đội của bạn sẽ nhận ra điều này ngay lập tức, và vấnd dề sẽ được giải quyết trước khi ai đó kéo code lỗi về

- **Giảm tranh luận gay gắt giữa các thành viên trong đội**: Có một hệ thống khách quan tại chỗ giúp giảm tần suất cãi nhau giữa các thành viên

- **Giúp thành viên kiểm thử đỡ đau đầu hơn**: Có nhiều version và build của mã nguồn giúp chia cắt và tìm kiếm bug một cách hiệu quả, giúp công việc của đội kiểm thử dễ dàng hơn.

- **Giảm thời gian deploy**: Deploy dự án là một công việc rất nhàm chán và tốn thời gian, và việc tự động hoá quá trình này là rất cần thiết

- **Tăng sự tự tin và tinh thần**: Mọi người không làm việc hiệu quả nếu luôn thường trực nỗi sợ làm hỏng cái gì đó, và họ có xu hướng tạo ra kết quả tốt hơn và có thể tập trung năng lượng làm việc hơn nếu không phải lo lắng về những hậu quả có thể xảy ra từ hành động của họ.

Một tác dụng phụ của những lợi ích trên đó là thành viên mới có thể hoà nhập với đội của mình dễ dàng hơn. Có một cái nhìn rõ ràng về quá trình build có thể tăng tốc sự thích ứng của thành viên mới đối với nhóm của mình.

## Yêu cầu

Bạn có thể đang tự hỏi yêu cầu để cài đặt hệ thống CI mà bạn cần là gì. Nếu bạn muốn cài đặt CI server trên môi trường của chính bạn, trước tiên bạn sẽ cần một số thứ.

Yêu cầu đầu tiên là bạn cần có Version Control System (VCS). Điều này là bắt buộc. VCS cung cấp một phương pháp đáng tin cậy để tập trung hoá và bảo tồn những thay đổi mà bạn tạo ra trong dự án theo thời gian.

Nếu bạn sử dụng giải pháp tại chỗ, một yêu cầu khác là bạn phải có một server bổ sung hoặc workstation hoặc ít nhất là một máy ảo. Có một chiếc máy không bị lỗi để cài đặt hệ thống là một trong những điều quan trọng thiết yếu.

Nếu bạn không muốn bị rắc rối với server hay máy ảo, có nhiều giải pháp hosted CI tool giúp đảm bảo sự bảo trì của toàn bộ quy trình và cho phép mở rộng dễ dàng.
Điểm yếu của các hệ thống hosted đó là thường thiếu các tuỳ chọn thiết lập trong khi các tool self-hosted có đầy đủ.

Nếu bạn muốn sử dụng tuỳ chọn self-hosted, bạn sẽ cần cài đặt một trong nhiều CI tool có sẵn.

Về mặt kỹ thuật, CI tool không bắt buộc được dùng, cũng giống như IDE không nhất thiết phải có cho việc phát triển phải mềm, nhưng việc implement sẽ khó hơn đáng kể nếu không có một tool như thế.

Những CI tool được biết đến rộng rãi nhất gồm có Jenkins, TeamCity, Bamboo, Go... Bạn có thể tìm hiểu thêm về [top các CI tool có sẵn](https://code-maze.com/top-8-continuous-integration-tools/)

## Continuous Integration Servers

Continuous integration server (còn được gọi là build server,  CI server) là một phần mềm tập trung hoá tất cả các hoạt động CI của bạn và cung cấp một môi trường ổn định và đáng tin cậy cho bạn để xây dựng dự án trên đó. CI server có khả năng tuỳ chỉnh cao và sẵn sàng để build nhiều dự án trên nhiều nền tảng khác nhau.  Chạy builds và tests là tính năng cở bản nhất của mọi build server.

Những điều quan trọng nhất cần xem xét khi sử dụng CI server là phải có một máy không lỗi được chuẩn bị để cài đặt. Có một môi trường trung tính, không bị ảnh hưởng bởi các công cụ không cần thiết, các biến môi trường và các cấu hình khác, là rất quan trọng cho việc sử dụng thành công CI server và CI tổng thể. Nếu không thể cài đặt máy vật lý cho CI server, bạn có thể thiết lập môi trường ảo và sử dụng nó như phương án cuối cùng.

Việc sử dụng các máy phát triển mà không thiết lập môi trường ảo có thể sẽ khiến bạn có các giả định và kết quả sai. Khi bạn triển khai ứng dụng cho một máy khác, bạn có khả năng có thể gặp sự cố mới.

Typically CI server uses a version control system like Subversion or Git or any other to pull your project files. It monitors your project’s repository and on the successful commit it pulls the changes and performs the tasks you defined previously for that project. Upon completion of the tasks, CI server sends feedback to the relevant project members with the details of the build. Checking out the latest version of your project, running the build scripts, running the tests, and sending notifications are the most basic functionalities of the CI servers.
Thông thường CI server sử dụng một version control system như Subversion hoặc Git hoặc bất kỳ hệ thống nào khác để pull file từ project của bạn. Nó giám sát repository của dự án của bạn và dựa trên các commit đã được gửi, nó pull các thay đổi và thực hiện các tác vụ mà bạn đã xác định trước đó cho project. Sau khi hoàn thành các task, máy chủ CI gửi phản hồi cho các thành viên dự án có liên quan với các chi tiết của bản build. Kiểm tra phiên bản mới nhất của dự án của bạn, chạy build script, chạy test và gửi thông báo là các chức năng cơ bản nhất của CI server.

Bên cạnh đó, các tính năng như code analysis, code coverage, code quality report, agent pooling, pipelines, build comparisons, tích hợp IDE, hỗ trợ công cụ của bên thứ ba và nhiều công cụ khác khiến CI server rất linh hoạt và thoải mái khi sử dụng.

## Tài liệu tham khảo
https://code-maze.com/what-is-continuous-integration/