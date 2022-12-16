Bản gốc: [アジャイル開発とウォーターフォール開発の違いは何？アジャイル開発の手法や意味も要チェック](https://backlog.com/ja/blog/what-is-agile-and-waterfall/) 

Việc cung cấp đến tay khách hàng sản phẩm mang tính linh hoạt, tốc độ, có thể đáp ứng nhanh với mọi yêu cầu từ người dùng là vô cùng quan trọng trong quá trình xây dựng phần mềm hiện nay.

Trong số đó, mô hình phát triển Agile nổi lên như một phương pháp phát triển mới đang được chú ý trong những năm gần đây.

Trong bài viết này, tôi sẽ giải thích cặn kẽ ý nghĩa, phương thức phát triển Agile, sự khác biệt, những điểm thuận lợi, khó khăn của mô hình Agile so với mô hình Waterfall.

## Phát triển Agile là gì?

Chắc chắn có rất nhiều người đã nghe qua về mô hình phát triển Agile, nhưng thực sự chưa biết Agile là phương thức phát triển như thế nào.

Ở đây, tôi sẽ giải thích chi tiết ý nghĩa của phát triển Agile.

### Định nghĩa

Phát triển Agile là phương pháp phát triển dự án để xây dựng hệ thống và phát triển phần mềm. Dịch sang tiếng Nhật, Agile có nghĩa là "nhanh chóng" và "linh hoạt".

So với các phương pháp phát triển dự án khác, phương pháp phát triển này rút ngắn đáng kể thời gian phát triển, do đó nó được đặt tên là "agile". Ngoài ra, một đặc tính vô cùng quan trọng là phương pháp này thực hiện lặp đi lặp lại các bài test trong một khoảng thời gian ngắn, thông qua đó có thể phát triển dự án với tốc độ nhanh chóng.

### Phát triển Agile - Kiểu gia tăng lặp đi lặp lại

Như đã nói ở trên, phát triển Agile có đặc tính là thời gian phát triển rất nhanh chóng. Nó tiến triển thông qua quy trình phát triển "kiểu gia tăng lặp đi lặp lại" bổ sung ngày càng nhiều chức năng trong khoảng thời gian lặp lại ngắn từ một tuần đến một tháng. Phát triển Agile phù hợp với các dự án như phát triển phần mềm và ứng dụng, trong đó specs có khả năng thay đổi hoặc các tính năng mới có khả năng được thêm vào.

Tiếp theo, tôi sẽ giải thích về flow phát triển Agile, trong đó sẽ sử dụng ví dụ về "phát triển phần mềm" cho các bạn dễ hình dung. 

Muốn dùng phương pháp phát triển Agile để phát triển phần mềm, trước hết cần lên kế hoạch chốt các specs lớn. Tiếp đó, sẽ tiến hành phát triển bằng cách sử dụng một chu trình được gọi là "Iteration". Lại nói một chút về chu trình "Iteration" này, bằng cách phân chia thành các đơn vị phát triển nhỏ hơn, luồng Lập kế hoạch - Thực hiện design, implement, test - Release chức năng sẽ liên tục lặp đi lặp lại, luồng đó được gọi là "Iteration".

Các lần lặp lại thường được thực hiện trong một khoảng thời gian ngắn, chẳng hạn như một tuần đến một tháng và các tính năng mới được release ứng với mỗi lần lặp lại này.

## Sự khác biệt giữa phát triển Agile và Waterfall

Một phương thức phát triển khác cũng hay được đặt lên bàn cân so sánh với Agile chính là mô hình phát triển Waterfall.

Ở đây, tôi sẽ giải thích qua về phát triển Waterfall, từ đó so sánh ưu nhược điểm so với mô hình phát triển Agile.


### Phát triển Waterfall - Kiểu phân chia quy trình

Trong phát triển Waterfall, chúng ta sẽ tiến hành phát triển sau khi chia quá trình thành "Lập kế hoạch", "Design", "Implement" và "Test". Để dễ hiểu, tôi lại sử dụng "phát triển phần mềm" làm ví dụ.

Ở giai đoạn lập kế hoạch ban đầu, bắt buộc phải chốt được toàn bộ các chức năng sẽ phát triển của sản phẩm phần mềm. Mỗi quá trình "Lập kế hoạch", "Design", "Implement" và "Test" được phụ trách bởi một PIC chỉ định, phải tạo tài liệu ở quy trình trước đó và bàn giao cho quy trình tiếp theo.

Trong phát triển Waterfall, phần mềm chỉ có thể được sử dụng sau khi tất cả các bước trên này được hoàn thành thành công.

### So sánh giữa phát triển Agile và phát triển Waterfall

**1. Phương pháp đối ứng hướng đến Khách hàng**

Phát triển Agile cho phép khách hàng có thể request thay đổi yêu cầu hoặc bổ sung specs bất kỳ lúc nào trong quá trình phát triển. 

Trong phát triển Waterfall, khách hàng phải thực hiện thay đổi specs và các yêu cầu đặc tả khác trước khi bắt đầu phát triển. Tức là, Khách hàng cũng không biết chắc liệu ý kiến của mình đã được bên phía phát triển phản ánh đúng và đầy đủ hay chưa cho đến khi quá trình phát triển kết thúc.

**2. Phương pháp đối ứng hướng đến thay đổi requirement**

Trong mô hình phát triển Agile, do sẽ phát triển cho mỗi lần lặp (Iteration), do vậy nó có thể thay đổi linh hoạt trong suốt thời gian phát triển. Ngược lại, trong phát triển Waterfall, các yêu cầu phải được chốt trước khi phát triển.

**3. Cung cấp dịch vụ**

Phát triển Agile có thể cung cấp dịch vụ ở mỗi lần lặp (Iteration) nên sẽ nhanh chóng. Còn phát triển Waterfall chỉ cho phép cung cấp dịch vụ sau khi đã hoàn thành toàn bộ các quy trình, do vậy sẽ tốn thời gian hơn.

**4. Tính bắt buộc phải có tài liệu**

Trong mô hình phát triển Agile không bắt buộc phải có tài liệu, tuy nhiên nếu đó là một phương thức truyền đạt thông tin hiệu quả thì vẫn nên tạo tài liệu.

Ngược lại, với mô hình phát triển Waterfall, tài liệu cần được tạo cho mỗi quy trình và được kết nối với quy trình tiếp theo. Ngoài ra, tài liệu cũng có vai trò như là evidence của dự án sau khi toàn bộ quá trình hoàn tất.

**5. Tần suất test**

Mô hình phát triển Agile yêu cầu việc test thường xuyên ứng với từng implement, còn mô hình Waterfall thì việc kiểm tra chỉ được thực hiện trong giai đoạn test.

**6. Ai là người phát triển?**

Trong phát triển Agile, mỗi kỹ sư sẽ thực hiện công việc phát triển của mình mà không cần phải có một lĩnh vực chuyên môn cụ thể; nhưng với mô hình Waterfall, bắt buộc phải có một người phụ trách từng quy trình.

**7. Phát triển nguồn lực**

Trong phát triển Agile, bạn sẽ học hỏi thực tế thông qua các phát triển lặp đi lặp lại. Vì phải chịu trách nhiệm đối với tất cả các vòng phát triển, bạn sẽ có nhiều kinh nghiệm cũng như dễ dàng thích ứng hơn trong nhiều lĩnh vực. Còn phát triển Waterfall thiên về việc sử dụng người có chuyên môn, kinh nghiệm nên việc đào tạo/tuyển dụng nhân lực tương đối dễ dàng.

**8. Phương pháp cải thiện quy trình**

Trong phát triển Agile, có thể cải thiện quy trình cho mỗi lần lặp; nếu lần này không ổn, hoàn toàn có thể cải thiện ở những lần tiếp theo.

Tuy nhiên, với phát triển Waterfall, chúng ta chỉ có thể nhìn ra được những điểm cần cải thiện sau khi dự án hoàn thành, do đó chỉ có thể đúc rút, áp dụng kinh nghiệm cho các dự án tiếp theo.

## Phát triển Agile/Waterfall - Ưu nhược điểm

![](https://images.viblo.asia/24e76234-619a-4d99-8c74-d9ea5d47dd90.png)
### Ưu nhược của mô hình phát triển Agile

- Ưu điểm: Mô hình phát triển Agile thực hiện phát triển và cung cấp lặp đi lặp lại, do vậy có thể cung cấp sản phẩm và các tính năng mới cho người dùng với tốc độ nhanh hơn. Việc vừa phát triển vừa đồng thời phản ánh yêu cầu thực của người dùng vào sản phẩm hiển nhiên có lợi cho cả phía phát triển và phía người dùng. 

- Nhược điểm: Do quá linh hoạt nên nếu không thường xuyên rà soát lại phương châm ban đầu rất dễ bị chệch hướng phát triển.

### Ưu nhược của mô hình phát triển Waterfall

- Ưu điểm: Dễ dàng lập kế hoạch phát triển và dự trù ngân sách. Ngoài ra, người chịu trách nhiệm phát triển cho mỗi quy trình là người có chuyên môn cao, cơ bản không yêu cầu bất kỳ công nghệ nào khác ngoài quy trình, nên việc đào tạo/tuyển dụng nhân lực tương đối dễ dàng.

- Nhược điểm: Sau khi sản phẩm đã hoàn thành, nếu phát hiện ra vấn đề/điểm bất cập trong giai đoạn đầu, sẽ tốn nhiều thời gian và chi phí phát triển lại.

## Lời kết

Phát triển Agile, thường được sử dụng trong lĩnh vực công nghệ thông tin, là một trong những phương pháp xây dựng hệ thống và phát triển phần mềm. Luồng "Lập kế hoạch", "Design", "Implement" và "Test" được lặp lại nhiều lần trong một khoảng thời gian ngắn bằng cách phân chia phát triển thành các đơn vị nhỏ.

Ưu điểm của phát triển Agile là tốc độ và tính linh hoạt, còn lợi thế của phát triển Waterfall là dễ dàng estimate và đào tạo nguồn nhân lực. Nếu bạn đã đọc đến đây và quan tâm đến phát triển Agile, hãy thử xem xét áp dụng phát triển Agile vào dự án của mình nhé.