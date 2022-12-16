# Lời mở đầu

Tạo ra một ứng dụng android là một điều rất dễ dàng, nhưng tạo ra một ứng dụng thật sự tốt, sử dụng tài nguyên của hệ thống một cách hiệu quả thì lại không. Với những kinh nghiệm trải qua một vài ứng dụng thì mình để ý thấy mọi người tập trung nhiều vào các tính năng, các hàm và quan trọng đầu tư cho giao diện người dùng rất nhiều. 

Chúng ta thường có thói quen tập trung vào những thứ có tác động trực quan hơn là dành thời gian cho những thứ gì đó mà ngay từ đầu chúng ta đã không nhìn thấy chúng. Một ứng dụng tốt không chỉ có giao diện đẹp mắt, chạy đúng mà còn phải chạy nhanh, tiêu tốn tài nguyên ít nhất có thể. Trong quá trình làm dự án, có nhiều lý do dẫn đến những vấn đề liên quan đến bộ nhớ có thể gây hiện tượng lag giật tạo cảm giác khó chịu cho trải nghiệm người dùng, dẫn đến việc “Đập đi xây lại” hoặc phải maintain gặp rất nhiều khó khăn.

## GC ( Garbage Collector ) là bạn của chúng ta, nhưng không phải lúc nào cũng vậy 

![](https://images.viblo.asia/49c2ddec-af8c-4198-96a3-8f141a664b7c.png)

Java là một ngôn ngữ mạnh mẽ. Trong android, chúng ta không viết code bằng C/C++, nơi ở đó chúng ta phải quản lý toàn bộ phần bộ nhớ và phân phối lại bộ nhớ của chính mình. Nghe đã thấy rất rắc rối và khó khăn. Rất may, Java biết làm thế nào để xóa mớ hỗn độn trong bộ nhớ do mình tạo ra. 

Vậy một câu hỏi đặt ra là “Java có một hệ thống quản lý bộ nhớ chuyên dụng, nó sẽ xóa các phân vùng bộ nhớ dư thừa khi không sử dụng. Vậy tại sao chúng ta vẫn cần phải quan tâm đến những điều này. Phải chăng GC chưa được tối ưu hay nó đang có BUG”

Không. Chắc chắn là không. Bộ thu gom rác ( Garbage Collector ) vẫn hoạt động bình thường và làm tốt công việc thu gom các phân vùng bộ nhớ không sử dụng. Vì vậy, do lỗi của chúng ta trong quá trình code gây ra mớ hỗn độn này, có thể có gì đó vẫn đang liên kết với các phân vùng đó mà chúng ta không biết làm GC không thể xóa được.

## GC hoạt động như thế nào?

Trước khi tiếp tục hành trình đi tìm rò rỉ bộ nhớ, bạn cần biết một chút về cách thức hoạt động của GC. Khái niệm này khá đơn giản nhưng những gì đằng sau nó lại rất phức tạp. Chúng ta sẽ đi từ đơn giản trước.

![](https://images.viblo.asia/d3890b93-9709-4782-86fe-f041c5a117cb.jpg)

Mỗi ứng dụng android đều có điểm bắt đầu là nơi các đối tượng bắt đầu được khởi tạo và các phương thức được gọi. Chúng ta có thể xem điểm khởi đầu này là gốc của cây bộ nhớ ( root of memory tree ). Một số đối tượng giữ một tham chiếu đến root trực tiếp. Và các đối tượng khác được tạo ra từ chúng giữ tham chiếu tới đối tượng này ( như hình trên )

Do đó, một chuỗi các tham chiếu được hình thành và tạo ra cây bộ nhớ. Vì vậy bộ nhớ thu gom rác GC sẽ đi từ gốc và truyền tai đến các đối tượng trực tiếp hoặc gián tiếp liên kết với root. Vào cuối quá trình này, một số đối tượng chưa bao giờ được GC truy cập. Đó là rác trong ứng dụng của bạn và đó là đủ điền kiện để được dọn bới GC.

Đi sâu vào một chút, Java Garbage Collector chạy như một Daemon Thread ( nghĩa là một thread có độ ưu tiên thấp chạy dưới background để cung cấp dịch vụ cho các luồng người dùng hoặc thực hiện các tác vụ của JVM ). Đôi khi GC nhìn tất cả các object trong bộ nhớ Heap và xác định xem đối tượng nào không còn bất kỳ tham chiếu nào đến nó nữa . Sau đó những đối tượng không còn được tham chiếu này sẽ bị xóa ra khỏi bộ nhớ và giành khoảng trống trong bộ nhớ cho một đối tượng mới được khởi tạo. Chúng ta có thể hiểu quy trình thu gom rác của GC bằng phương pháp đơn giản dưới đây

**1. Đánh dấu** : GC nhận biết đối tượng nào đang được sử dụng và không còn bất kỳ tham chiếu nào đến nó nữa.
**2. Xóa thông thường** : GC sẽ xóa tất cả các đối tượng không còn tham chiếu và dành không gian trống trong bộ nhớ cho các đối tượng mới.
**3. Xóa và nén** : Bạn tưởng tượng bộ nhớ ở bước 2 sau khi xóa các đối tượng không còn sử dụng sẽ như "lỗ chỗ như một cái tổ ong". Nên nó sẽ được "dồn" lại, đồng nghĩa với các object vẫn còn đang được sử dụng sẽ nằm ở các ô nhớ sát nhau tại phần bắt đầu của bộ nhớ Heap. Quá trình này giúp cấp phát bộ nhớ cho các đối tượng mới hiệu quả về dễ dàng hơn.

![](https://images.viblo.asia/185c628e-f7ca-42e1-b698-71475ac3fca0.png)

Theo biểu đồ, ta thấy tuổi hoạt động của object được chia thành 2 nhóm : **Young  generation** - thế hệ "trai trẻ", **old generation** - thế hệ "già".

    -Young generation - thế hệ "trẻ": nhóm này lại được chia thành 2 nhóm con là eden (khởi thủy) và survivor (sống sót). Nhóm survivor lại được chia thành 2 nhóm nhỏ hơn là S0 và S1. Các object mới được khởi tạo sẽ nằm trong nhóm Eden. Sau 1 chu kỳ hoạt động của garbage collector, object nào "sống sót" sẽ được chuyển sang nhóm survivor. Sự kiện các object ở nhóm Young generation được thu hồi bởi Garbage collector được xem là minor event.
    -Old generation - thế hệ "già" : nhóm này chứa các object chuyển từ young generation (tất nhiên với thời gian hoạt động đủ lâu, mỗi bộ garbage collector sẽ định nghĩa bao nhiêu được coi là "lâu"). Sự kiện các object ở nhóm Old generation được thu hồi bởi garbage collector được xem là major event.

## Vậy, MemoryLeak là gì?

Cho đến giờ chắc chắn các bạn cũng hình dung cách mà GC hoạt động như thế nào. Bây giờ chúng ta sẽ tập trung vào rò rỉ bộ nhớ
Nói một cách đơn giản, khi bạn giữ một đối tượng quá lâu trong bộ nhớ sau khi nó đã được phục vụ xong cho một mục đích nào đó rồi. Một đối tượng nó cũng có lifecycle của riêng mình, sau khi sử dụng xong nó sẽ phải nó lời tạm biệt và rời khỏi bộ nhớ. Nhưng nếu một số đối tượng khác đang nắm giữ đối tượng này ( trực tiếp hoặc gián tiếp ) thì trình thu gom rác không thể thu gom nó. chính điều này gây ra rò rỉ bộ nhớ.

Nhưng không phải tất cả rò rỉ bộ nhớ đều gây “tổn thương” cho ứng dụng của bạn. Có một vài rò rỉ bộ nhớ rất nhỏ và có trong một số framework chính của android mà bạn không thể hoặc không cần phải sửa nó. Những điều này có tác động tối thiểu đến ứng dụng của bạn và có thể bỏ qua nó một cách an toàn. Bên cạnh đó có những thứ đang phá vỡ ứng dụng của bạn, làm cho ứng dụng của bạn lag, chậm đây là điều mà bạn cần phải quan tâm.

## Tại sao bạn lại cần phải thực sự để tâm đến MemoryLeak

Không ai trong chúng ta muốn sử dụng **một ứng dụng chậm, tụt hậu, tiêu tốn nhiều bộ nhớ và đôi khi bị treo sau một vài phút sử dụng**. Nó sẽ gây trải nghiệm không tốt cho người dùng, và nếu lâu hơn bạn có thể mất luôn người dùng đó.
![](https://images.viblo.asia/6ec4db5d-a2ba-4fd0-8e5b-43e04f8888bf.png)

Khi người dùng tiếp tục sử dụng ứng dụng của bạn, bộ nhớ Heap cũng tiếp tục tăng và nếu có MemoryLeak trong ứng dụng của bạn, thì vùng bộ nhớ không được sử dụng đó sẽ không được GC giải phóng. Vì vậy bộ nhớ Heap sẽ tăng liên tục cho đến khi đạt đến ngưỡng có thể phân bổ cho ứng dụng của bạn. Gây ra một điều cực kỳ tồi tệ đó chính là OOM (out of memory) và dẫn đến crash ứng dụng.

Và bạn cũng cần phải nhớ việc thu gom rác là một quá trình rất nặng, mỗi khi GC hoạt động ứng dụng của bạn có thể bị block UI nếu lâu quá sẽ dẫn đến ANR (Application not responding). Vì vậy bộ thu gom rác càng ít thì ứng dụng của bạn càng tốt và ngược lại. Khi mà ứng dụng của bạn đang chạy và bộ nhớ Heap tăng dần lên thì một GC ngắn sẽ được khởi động và xóa những đối tượng không còn sử dụng ngay lập tức. Những GC ngắn này chạy trên một luồng riêng biệt và không làm chậm ứng dụng của bạn

## Tổng kết

Qua bài viết này mình xin chia sẻ một số tìm hiểu của mình về cơ chế bộ xử lý rác ( Garbage Collector ) trong Java và một số khái niệm về MemoryLeak. Trong phần sau chúng ta sẽ tiếp tục tìm hiểu về MemoryLeak, cách tìm và xử lý chúng một cách hiệu quả
Cám ơn các bạn đã đọc, có điều gì không đúng rất mong được sự góp ý của mọi người

## Tài liệu tham khảo
- https://platformengineer.com/java-ecosystem-java-memory-model
- https://medium.com/platform-engineer/understanding-java-garbage-collection-54fc9230659a