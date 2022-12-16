![Intel AMD 64 core meme](https://images.viblo.asia/f5a164d7-4bb5-4f70-bff3-1c824eab3b6d.png)

Ở bài viết này, mình muốn cùng các bạn tìm hiểu và làm rõ hơn khái niệm về *nhân* (core) và *luồng* (thread) trong khoa học máy tính, và đi tìm câu trả lời cho các câu hỏi hay gặp suốt ngày trên các mạng xã hội, diễn đàn công nghệ như:
- Core và Thread khác nhau ở chỗ nào?
- Có phải CPU có 1 core tức là chỉ chạy được một phần mềm/một thread một thời điểm mà không làm được việc gì khác?
- Có phải CPU càng nhiều core thì càng mạnh?

# Core (hay nhân CPU)
![CPU cores](https://images.viblo.asia/728fb38d-7920-4c22-ab4d-dde2e60350b5.jpg)

Khái niệm về Core (nhân) hết sức dễ hiểu. Mỗi nhân là từng đơn vị xử lý của chiếc vi xử lý, có khả năng độc lập xử lý một dãy các chỉ dẫn. Đương nhiên, nếu vi xử lý của bạn càng có nhiều nhân thì tức là mỗi nhân có thể nhận các chỉ dẫn khác nhau và *thực thi song song* các chỉ dẫn đó.

Rõ ràng là với vi xử lý có càng nhiều nhân, thì tức là tiềm năng xử lý của bộ vi xử lý đó càng mạnh. Tuy nhiên, vẫn còn rất nhiều câu hỏi khác về nhân vi xử lý:
- Một vi xử lý Snapdragon 2.0 GHz với 8 nhân liệu có nghĩa là nó mạnh gấp 8 lần vi xử lý một nhân tương đương? Hay nói cách khác, ta có thể cho rằng $8 * 2.0 = 16.0$ GHz?
- Một vi xử lý Intel Core i5 với 2 nhân, 4 luồng nghĩa là sao? Nó liệu có mạnh ngang bằng một vi xử lý 4 nhân thông thường?

Hãy đọc tiếp những phần phía dưới, mình sẽ cùng các bạn từ từ làm rõ.

# Hyperthreading
![Công nghệ hyperthreading của CPU](https://images.viblo.asia/514ee69a-d791-466d-be29-57f89350ee75.png)

*Siêu phân luồng* (Hyperthreading) là tên gọi riêng của Intel cho kỹ thuật gọi là *Simultaneous Multithreading* (SMT). Công nghệ này cho phép mỗi nhân thực (physical core) của vi xử lý có thể hiện diện như 2 *nhân ảo* (logical core) đối với hệ điều hành. **Nếu bạn thấy một vi xử lý mà có ghi thông tin là *2 nhân, 4 luồng xử lý* hay *6 nhân 12 luồng* thì tức là vi xử lý của bạn có hỗ trợ SMT.** AMD cũng có thuật ngữ riêng cho các vi xử lý có hỗ trợ SMT của họ là *CMT* (Cluster-based Multithreading). Tuy nhiên ở trong bài này, mình sẽ tạm dùng tên gọi *Hyperthreading* vì nó phổ biến hơn.

## CPU thread và OS thread
Đây là một điều dễ gây nhầm lẫn với nhiều người. *CPU thread* chính là các **logical core**, tức là các nhân của CPU mà hệ điều hành nhìn thấy. Hệ điều hành hiểu những CPU thread này ngang với những nhân CPU thực sự, và bắt đầu giao cho những nhân này xử lý các "tác vụ" là những OS thread.

**Với một vi xử lý có *6 nhân 12 luồng* thì tức là bạn đang có 12 *CPU thread*, hay 12 *logical core*** khác nhau. Hệ điều sẽ được phép lên lịch tối đa 12 *OS thread* riêng biệt vào những core này. Trong cùng một thời điểm, những OS thread đó sẽ được các nhân xử lý (hầu như) song song.

Với vi xử lý trên thì số lượng *CPU thread* chỉ là 12 mà thôi. Tuy nhiên, số lượng *OS thread* thì lại được quản lý bởi hệ điều hành và có thể được tạo bao nhiêu tuỳ thích, có thể **có lên đến hàng ngàn *OS thread* khác nhau** tuỳ vào các chương trình mà bạn chạy.

**Lưu ý nhỏ**: khi ai đó chỉ nhắc đến từ *thread*, thì trong đa phần trường hợp, người ta đang ám chỉ đến *OS thread*!

## Hyperthreading có thực sự giúp gấp đôi số nhân?
Hay nói cách khác, **một vi xử lý được cho là có *2 nhân 4 luồng*, liệu hiệu năng có tương đương với một vi xử lý *4 nhân 4 luồng***, giả sử những thông số khác đều tương tự nhau? Nếu không, tại sao người ta còn dùng hyperthreading? Để trả lời câu hỏi này, ta phải đào sâu hơn tý về cách mà công nghệ *hyperthreading* hoạt động. Một vài thông tin mà mình tìm hiểu được như sau:

Từng nhân CPU có khả năng thực thi các chỉ dẫn cực nhanh (tính bằng nanosecond). Nhưng đôi khi, việc thực thi của CPU bị trì hoãn (stall) vì nhiều lý do khác nhau, ví dụ như *cache missing*. Ví dụ như trong trường hợp đó, các lệnh chỉ dẫn sẽ phải được nạp lại từ bộ nhớ chính (RAM) vào cache của CPU. Vì bộ nhớ RAM rất chậm nếu so sánh với *CPU cache*, thao tác này (đối với CPU) là tương đối lâu và tạo cho CPU rất nhiều thời gian rảnh rỗi. Trong khoảnh khắc ngắn này, CPU đáng lẽ có thể thực thi thêm hàng trăm chỉ dẫn nữa.

Các nhân CPU hỗ trợ *hyperthreading* sẽ nhận tập lệnh chỉ dẫn của lên tới 2 *OS thread* khác nhau. Tuy mỗi nhân thực (physical core) này thực chất vẫn chỉ hỗ trợ thực thi tập lệnh từ 1 *OS thread* trong cùng một thời điểm, nhưng khác với nhân thông thường, nó lại có đến 2 bộ *thanh ghi* (register) hoàn toàn độc lập. Khi gặp các sự kiện như *cache missing* khi thực thi lệnh ở một *OS thread*, thay vì chờ không, nhân CPU này có thể nhanh chóng chuyển sang thực thi dãy lệnh ở OS thread kia ngay lập tức. Việc chuyển đổi này là cực nhanh vì nhân CPU này đã có 2 bộ thanh ghi riêng biệt, không mất công như *context switch* ở cấp độ hệ điều hành.

Như vậy, ***hyperthreading* không phải là kỹ thuật giúp tăng gấp đôi số nhân (hay như gấp đôi hiệu năng) của vi xử lý**, mà là giúp tận dụng triệt để khoảng thời gian rảnh rỗi của từng nhân CPU, giúp tăng đối đa throughput của vi xử lý.

## Làm sao để so sánh hiệu năng giữa các CPU có/không có hyperthreading?
Ví dụ một bài toán như: giữa hai vi xử lý **AMD Ryzen 3 3300X** (4 nhân 8 luồng), và vi xử lý **AMD Ryzen 5 3500** (6 nhân 6 luồng) có giá tiền rất tương đồng nhau. Vậy nên chọn mua vi xử lý nào hơn?

Thoạt nhìn qua, bạn có thể thấy *Ryzen 3 3300X* có hỗ trợ hyperthreading hẳn hoi, còn *Ryzen 5 3500* vì lý do mờ ám nào đó lại thiếu mất công nghệ này. Đọc ở phần trên, bạn đã biết rằng hyperthreading không giúp x2 số nhân, nên không thể dùng phép so sánh 8 > 6 và kết luận ngay rằng *3300X* nhanh hơn được. Vậy làm sao để so sánh?

***Hyperthreading* thực chất việc có cải thiện hiệu năng nhiều hay ít còn phụ thuộc vào từng trường hợp, thường là cải thiện từ 20% đến 30% hiệu năng của CPU.** Như vậy, ta có thể làm một phép toán nhanh: trong trường hợp tận dụng được 100% sức mạnh đa nhân, nếu *3500* có 6 nhân thực giúp hiệu năng tăng gấp 6 lần, thì với *3300X* có 4 nhân 8 luồng sẽ cho hiệu năng tăng xấp xỉ $4 * 1.3 = 5.2$ lần (trong trường hợp tốt nhất). Như vậy, *3300X* dù có *hyperthreading* vẫn cho hiệu năng thua thiệt hơn so với *3500*.

# OS Scheduling và Context Switch
![Speed mirage in The Flash](https://images.viblo.asia/c56efe40-f3b7-4b7e-813e-957567642a66.jpg)

Đọc đến đây, chúng ta đã có thể hiểu rằng, với vi xử lý có một nhân thì chỉ có thể chạy được duy nhất 1 thread trong cùng một thời điểm. Nhưng mình vẫn nhớ rằng **thời xưa mình dùng máy tính có chip *Intel Pentium IV* chỉ có một nhân duy nhất, tuy nhiên máy tính của mình vẫn có thể cùng một lúc vừa nghe nhạc, vừa giải nén file, vừa lướt Web chăm nông trại,...** Rút cuộc làm thế nào mà chỉ với **duy nhất một nhân** của chip *Pentium IV* lại làm được nhiều việc một lúc như thế??

Trong phim bộ *The Flash*, các speedster là những người có khả năng di chuyển rất nhanh. Một trong các plot twist chính của mùa đầu bộ phim liên quan đến việc **một speedster có thể nhanh đến mức có thể tạo ra "ảo ảnh" và ở 2 nơi cùng một lúc**:

![Demo](https://media.giphy.com/media/PYCKWwJTUjbEwi0nu0/giphy.gif)

So với nhận thức thông thường của con người, **vi xử lý của máy tính cũng là một thứ đặc biệt nhanh**. Tuy chỉ có thể thực thi một tác vụ tại một thời điểm, nhờ cơ chế *lên lịch* của hệ điều hành mà chỉ một nhân CPU có thể qua lại xử lý rất nhiều thread khác nhau. Khi một thread được CPU xử lý đủ lâu, hệ điều hành sẽ tạm dừng việc xử lý thread này lại và đưa một thread kế tiếp trong hàng đợi cho CPU xử lý. Quá trình này diễn ra **đủ nhanh đến mức gây cho chúng ta *ảo giác* rằng các tác vụ đang được chạy *song song***! Nhờ vậy, tuy chỉ với một nhân CPU, hệ điều hành vẫn có thể đạt được đa nhiệm như thường.

Cơ chế được dùng để hệ điều hành chuyển qua lại các thread được gọi là **Context Switch**. Khi tiến hành *Context Switch*, hệ điều hành sẽ tạm dừng thực thi một thread, lưu lại trạng thái thực thi của CPU và các thanh ghi rồi lưu vào RAM, sau đó khôi phục các trạng thái và bắt đầu thực thi thread kế tiếp trong hàng đợi. Nó khá tương đồng với *hyperthreading* nhưng lại là ở cấp độ hệ điều hành, và chậm hơn nhiều so với *hypertheading* do phải thao tác đọc/ghi trạng thái các thanh ghi bằng bộ nhớ RAM. 

Như vậy, để máy tính có thể đa nhiệm, vi xử lý có nhiều nhân là điều hoàn toàn không cần thiết, mà chỉ cần một nhân đủ nhanh là được rồi.

# CPU càng nhiều nhân thực (physical core) thì càng mạnh?
Một chiếc điện thoại với con chip SoC *Snapdragon 625* với xung nhịp 2.0 GHz và 8 nhân, vậy có phải trong mọi trường hợp mình đều áp dụng được phép tính $2.0 * 8 = 16.0$ GHz?

Câu trả lời đơn giản là **không phải trong mọi trường hợp**.

Trong máy tính, có nhiều bài toán mà các chương trình hỗ trợ xử lý đa luồng, chia công việc lớn thành các công việc nhỏ chạy qua nhiều OS thread khác nhau, ví dụ từ bài toán đơn giản như nhân 2 ma trận, cho đến dựng video,... Nhưng cũng có những bài toán mà có tính chất "công việc này phụ thuộc vào kết quả của công việc kia", điển hình như tính số fibonacci thứ $n$ hay giải mã dạng mã hoá AES CBC, những dạng bài toán này buộc phải thực hiện trên một nhân duy nhất. Vài trường hợp khác thì các chương trình có tiềm năng xử lý đa luồng, nhưng người lập trình lại không hỗ trợ hoặc không triệt để.

Tuy nhiên, nếu thiết bị của bạn có chạy nhiều các chương trình cùng một lúc, thì việc có nhiều nhân vẫn đem lại lợi thế đáng kể, do mỗi chương trình đều được chạy trên một hay nhiều *OS thread* riêng biệt và chắc chắn tận dụng được đa nhân CPU.

# Kết bài
Trên đây là những kiến thức mà mình tìm hiểu được. Tuy vậy, các thông tin chắc chắn còn nhiều chỗ chưa chính xác hay thiếu sót, hy vọng được các bạn để lại góp ý ở phần bình luận ở cuối bài viết ^^

Một vài nguồn tham khảo:
- [Simultaneous multithreading - Wikipedia](https://en.wikipedia.org/wiki/Simultaneous_multithreading)
- [What is hyper-threading? How does it different from multithreading?](https://www.quora.com/What-is-hyper-threading-How-does-it-different-from-multithreading/answer/Travis-Casey-4)
- [Context Switch - Wikipedia](https://en.wikipedia.org/wiki/Context_switch)
- [How is multitasking possible even if it's just context switching and finish all processes simultaneously?](https://stackoverflow.com/questions/47385216/how-is-multitasking-possible-even-if-its-just-context-switching-and-finish-all)