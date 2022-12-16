Series Golang:
* [[Series Golang]1: Golang là gì? Tại sao nên dùng golang?](https://viblo.asia/p/series-golang1-golang-la-gi-tai-sao-nen-dung-golang-Eb85ozM2l2G) **<= Bạn đang ở đây**
* [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO)
* [[Series Golang]3: Tăng tốc - Golang - Struct, Pointer, Receiver, Interface](https://viblo.asia/p/series-golang3-tang-toc-golang-struct-pointer-receiver-interface-ORNZqp63K0n)
* [[Series Golang]4: Golang - Concurrency, Goroutines, Channels](https://viblo.asia/p/series-golang4-golang-concurrency-goroutines-channels-vyDZOBAaKwj)

Lời mở đầu: Người xưa có câu: `Biết mình biết ta, trăm trận trăm thắng`. Đầu tiền mình cần phải xác định đối thủ - Golang là gì, nó như thế nào mà bàn dân thiên hạ dạo gần đây kháo nhau về nó. Xem đối thủ này có xứng tầm để các anh em dày công nghiên cứu hay không. Cùng bắt đầu nhé.

## 1. Golang là gì?

Golang là ngôn ngữ biên dịch, do Google phát triển, nó được kì vọng sẽ là ngành công nghệ phần mềm khai thác nền tảng multicore của bộ xử lí và hoạt động đa nhiệm tốt hơn.
 Ngôn ngữ C++ khi vận hành nhận khá nhiều [chỉ trích](https://en.wikipedia.org/wiki/Criticism_of_C%2B%2B) vì một số vấn đề như:
* Ngôn ngữ C++ đa hình nhưng không hoàn chỉnh, tương thích ngược với ngôn ngữ C
* Thời gian biên dịch lâu: interface giữa source files là header files, mỗi lần header file bị thay đổi thì tất cả source sẽ bị biên dịch lại.

Từ những nhược điểm của ngôn ngữ C++, cộng với nhu cầu thực tế của Google. Vào tháng 9 năm 2007, ba kĩ sư của google là Robert Griesemer, Rob Pike và Ken Thompson đã tạo ra một ngôn ngữ lập trình riêng phù hợp hơn với workflows của google. Tới năm 2009, Go được công bố rộng rãi và trở thành open-source. Tới năm 2014, dropbox chuyển đổi backend của họ từ code python qua go. Go phát hành nhiều bản cập nhập, có nhiều cột mốc sự kiện đáng nhớ (Các bạn có thể xem thêm [ở đây](https://assets.website-files.com/5e305a6cb7083222527a89cc/5f22b6f5f90ddf2c8c270951_why%20use%20golang__.png)). Có khá nhiều ông lớn công nghệ chuyển sang sử dụng golang như: google, apple, facebook, docker, BBC, new york times(Trích nguồn uptech.team).
Khác với những ngôn ngữ khác, Golang ban đầu được hình thành dựa theo ngôn ngữ C. Nếu các bạn đã từng làm với golang sẽ thấy nó khá giống với C, Go cũng có struct, cũng có con trỏ, cũng có truyền tham chiếu và truyền tham khảo… Tuy nhiên Golang có nhiều tính năng được vượt trội hơn nhiều so với C. Đối với ngôn ngữ C, bạn phải tự quản lý việc thu hồi vùng nhớ sau khi cấp phát, nhưng Golang sẽ giúp bạn làm việc đó một cách tự động, hạn chế những rủi ro và lỗi không đáng có. Vì Golang được phát triển bởi google - ông lớn công nghệ, nên không quá ngạc nhiên khi golang được sử dụng rộng rãi. Youtube, chrome, earth, android sdk được viết bằng go.

Không quá ngặc nhiên khi Ryan Dahi - lập trình viên đầu tiên của Node.js Javascript runtime, Deno Javascript và TypeScript runtime đã dành lời khen có cánh cho Go: “if you’re building a server, I can’t imagine using anything other than Go”. Hay TJ Holowaychuk - người tạo ra Express.js cũng nói rằng: “If you’re doing distributed work then you’ll find Go’s expressive concurrency primitives very helpful”

## 2. Mức lương của golang:

Theo nhiều khảo sát mình thu thập được, mức lương trung bình của Golang có thể được xếp vào top những ngôn ngữ lập trình được trả cao nhất, cao hơn hẳn so với Java, javascript, python.
Theo [techrepublic](https://www.techrepublic.com/article/the-programming-languages-and-skills-that-pay-the-best-in-2019/) năm 2018, mức lương trung bình một năm của Golang developer là 132.827$, trong khi với java chỉ là 105,164$(*Đây là lương của lập trình viên nước ngoài*). Với python, thu nhập của lập trình viên chỉ 103,587$ một năm. Chúng ta có thể thấy lương của Golang developer cao hơn gần 30% so với lương của lập trình viên Java hay python
![](https://images.viblo.asia/b7772b91-f935-4d60-a243-01dc3bc910cc.png)


Tuy nhiên khảo sát của [stackoverflow](https://insights.stackoverflow.com/survey/2019#top-paying-technologies) năm 2019, mức lương Golang developer ở Mỹ vào khoảng 136.000$, đứng sau Scala với 143.000$ và Clojure với 139.000$. Tuy nhiên Golang vẫn bỏ xa Java với chỉ 118.000$
![](https://images.viblo.asia/514bb0ad-2726-44da-a210-ef5f78c74fe6.png)

Golang hiện tại vẫn đang thuộc vào top những ngôn ngữ lập trình được trả lương cao nhất bởi vì những tính năng nỗi trội của Golang, nhu cầu thị trường và sự thiếu hụt nhân sự. Vậy nên mình vẫn tin trong vài năm tới, Golang vẫn sẽ giữ vững ngôi vị của mình trong bảng xếp hạng mức lương. 

## 3. Lợi ích

**Performance:**

Java khá nỗi tiếng với việc có thể chạy ở bất kì nền tảng nào, từ Linux, Window, Android, IOS… nhờ có virtual machine. Code của java sẽ được biên dịch qua bytecode và chạy bằng virtual machine. Tuy có lợi ích là chạy được đa nền tảng, nhưng vì phải chạy qua virtual machine, nên performance của Java sẽ gặp vấn đề với các tác vụ phức tạp.
Đến với Golang, đây cũng ngôn ngữ biên dịch, code sẽ được biên dịch trực tiếp sang ngôn ngữ máy. Sự đơn giản là trái tim của golang. Golang biên dịch nhanh, chạy nhanh, và cũng nhanh để học. Golang không có kế thừa, không có class. Golang không có VM riêng(Không có virtual machines) nó có thể biên dịch trực tiếp qua mã máy(machine code).
Golang đã chứng minh được mình có hiệu suất hơn hẳn so với những ngôn ngữ khác. [Benchmarksgame-team.pages](https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/go.html) đã tiến hành so sánh Golang với nhiều ngôn ngữ khác. Họ triển khai thí nghiệm trên hai máy có chung cấu hình, mỗi máy sẽ chạy một ngôn ngữ để cùng giải quyết một bài toán nào đó. Đầu tiên là Go(version 1.17) vs Java(openjdk 17 2021-09-14). Với bài toán n-body, Golang chỉ tiêu tốn 6.38s trong khi Java phải cần tới 6.77s, hơn nữa Golang tiêu tốn ít tài nguyên ram, cpu hơn Java, đối thủ Python thì lại thua thảm hại với 120,99s. Với bài toán mandebrot, Golang cần 3.73s để xử lí, trong khi Java cần 4.12s. 

**Concurrency:**

Một trong những lí do nên sử dụng Go bởi vì nó hỗ trợ rất tốt concurrency. Concurrency của golang cho phép nhiều tác vụ khác nhau chạy cùng lúc một cách song song. Goroutines của golang là một hàm cơ bản có thể chạy một cách đồng thời và độc lập nhau.
Goroutines chỉ chiếm 2 kb của memory, điều này làm nó mở rộng một cách nhanh chóng. Java cũng có cơ chế chạy đa luồng(java threads) cho phép chúng xử lý một cách đồng thời nhiều tác vụ, tuy nhiên nó hoạt động theo cơ chế blocking, và tiêu tốn rất nhiều bộ nhớ. Golang lại hoạt động theo cơ chế non-blocking. Về mặt kỹ thuật, bạn có thể chạy hàng tỉ Goroutines mà không bị crash hệ thống. Go có thể hiểu một cách đơn giản là sự kết hợp đa luồng truyền thống của java và non-blocking của javascript

**Garbage collection**

Golang có fast garbage collector, nó giúp cho việc phát triển và chạy nhanh giảm thiểu lỗi thiếu memory. Trong khi với C, khi bạn cấp phát vùng nhớ, bạn cần phải thu hồi lại vùng nhớ khi không sử dụng. Nếu không thu hồi có thể dẫn tới lỗi tràn bộ nhớ.

**Công cụ hỗ trợ lập trình toàn diện**

Nếu bạn đã từng dùng javascript, chắc chắn bạn đã biết qua về npm registry. Khi bạn cần dùng một package nào đó, bạn sẽ lên npm registry để tìm kiếm. Hay khi bạn muốn chia sẽ package của bạn cho cộng đồng, bạn cũng sẽ publish package của bạn lên npm registry. Bạn phải trải qua công đoạn publish package của mình. Nếu bạn làm việc với java, bạn thường phải cài các IDE khá nặng như Eclipse hay IntelliJ IDEA, các IDEs này khá nặng và đôi lúc phải mất hàng giờ để cài đặt. Điều này có thể làm nản chí đối với những bạn mới bắt đầu học lập trình. Nhưng khi bạn đến với Golang, mọi chuyện sẽ dễ dàng hơn. Golang là một mã nguồn mở, ai cũng có thể download được từ github. Khi bạn cần sử dụng các thư viện, plugin, bạn có thể sử dụng trực tiếp từ github, không cần phải trải qua công đoạn publish lên npm registry.

Cross plaform và dễ dàng maintain

Golang hỗ trợ tương thích đa nền tảng

## 4. Điểm yếu:

Golang cung cấp garbage collector, tuy là điểm mạnh nhưng nó cũng là điểm yếu của Go. Bạn không thể quản lí memory thủ công.

Mặc dù Golang đã phát triển từ năm 2009, tuy nhiên tính tới thời điểm hiện tại, Golang vẫn được xếp vào loại ngôn ngữ tương đối trẻ. Các lập trình viên khi dùng Golang có thể phải chật vật với các thư viện.

**Golang không hỗ trợ generic function:** Một function là một khối code gồm input, đoạn xử lý, trả về output. Generic function là tập hợp các function khác nhau có cùng tên, nhưng khác kiểu input trong suốt thời gian biên dịch.
Khi làm với golang, bạn phải tạo ra nhiều function khác nhau với các kiểu của tham số khác nhau. Điều này có thể làm giảm khả năng reusable code và giảm hiệu quả trong quá trình phát triển

## 5. Kết luận:

Trên đây là tổng quan về Go, lịch sử hình thành, những điểm mạnh và điểm yếu của Golang. Golang trong tương lai có thể ra các bản release mới khắc phục những yếu điểm và bổ sung nhiều tính năng mới hơn.

Trên đây là những gì mình tìm hiểu, tổng hợp trên mạng. Mong giúp ích cho các bạn.
Ở phần tiếp theo mình sẽ tổng hợp về cách cài đặt, CLI cơ bản, cách khai báo biến, Map trong Golang ở bài [[Series Golang]2: Vượt chướng ngại vật - Golang](https://viblo.asia/p/series-golang2-vuot-chuong-ngai-vat-golang-eW65GBwxlDO). Các bạn cùng đón đọc nhé.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé