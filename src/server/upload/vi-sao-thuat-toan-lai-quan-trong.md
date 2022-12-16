![](https://images.viblo.asia/d4c23413-cb1b-4b1b-b6bc-9befc093496f.jpg)
# Giới thiệu
Bước đầu tiên, chúng ta hướng tới sự hiểu biết về lý do tại sao nghiên cứu và kiến ​​thức về thuật toán lại rất quan trọng và xác định chính xác ý nghĩa của thuật toán.

Theo cuốn **Giới thiệu về thuật toán** (Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein): “Thuật toán là bất kỳ quy trình tính toán rõ ràng nào có đầu vào (input) là giá trị hoặc tập hợp các giá trị, và đầu ra (output) là giá trị hoặc tập hợp các giá trị.”

Có rất nhiều phiên bản đời thực của Thuật Toán: Một kịch bản, lời thoại Phim chi tiết có input là các diễn viên, trường quay, nhà sản xuất => output là bộ phim. Hoặc, một dự luật kinh tế của một quốc gia với đầu vào là nhân lực, vật lực, mối quan hệ, tài nguyên thiên nhiên => output là lương thực và công ăn việc làm cho người dân của nước đó trong 50 năm. Gần gũi hơn, một tấm bản đồ hướng dẫn rõ ràng đường đi để hoàn thành một cuộc du hành trong thành phố cũng là một phiên bản đời thực của Thuật Toán.
Ngay cả một phép tính cộng hai số với nhau cũng có thể gọi là một thuật toán, cho dù nói như vậy là hơi cẩu thả.

Một số thuật toán, như thuật toán sắp xếp từ lớn đến nhỏ, nó rất trực quan để đưa vào tư duy logic và kĩ năng giải quyết vấn đề của chúng ta. Nhưng có một vài thuật toán sẽ phức tạp hơn, chúng ta vẫn cần nghiên cứu để chúng làm các khối xây dựng giải quyết vấn đề logic hiệu quả hơn trong tương lai.

Trong tự nhiên, hiếm khi chúng ta thấy một hình tròn hay một hình vuông tuyệt đối để mà áp dụng công thức tính diện tích cho chúng (gì nhỉ, bình phương và số Pi phải không). Nhưng các kĩ sư rất hay phải tính diện tích các hồ nước hoặc các mảnh đất quá lớn và méo mó. Bằng quan sát và chia nhỏ chúng chúng thành những hình dạng tương tự như các hình tuyệt đối, một kĩ sư sẽ dễ dàng tính được diện tích của một cái hồ hay mảnh đất từ những công thức mà họ đã biết. Họ đã lập trình, bấm máy tính hay giấy bút viết để làm, không biết, chỉ chắc chắn là họ làm được nhờ có được công thức – chính là một phiên bản của Thuật Toán.

Ví dụ này minh họa cho việc các Thuật Toán (dù là phức tạp hay không) đóng vai trò là các khối tư duy hữu ích để giải quyết các vấn đề logic chúng ta gặp trong tương lai hiệu quả hơn.

Vậy còn ngôn ngữ lập trình, ví dụ như Java, nó có liên quan gì?

Một đoạn mã (code), ví dụ như Java, để tìm ra những sản phẩm hay những tin tức đang được quan tâm nhất trên Internet chẳng hạn, được gọi là một triển khai của một thuật toán cụ thể. Ngôn ngữ lập trình có ý nghĩa là công cụ triển khai các thuật toán để nó hoạt động trên máy tính. Chúng ta chọn Java cho khóa học này vì “công cụ” này tiện dụng hơn cho người tạo khóa học, chứ không phải vì Java có gì đó nổi trội so với ngôn ngữ khác.

# Phân tích thời gian chạy
Một trong những khía cạnh quan trọng nhất của thuật toán là nó nhanh như thế nào. Thường thì rất dễ dàng đưa ra một thuật toán để giải quyết vấn đề, nhưng nếu thuật toán quá chậm, thì cũng vô ích về tính hữu dụng.

Nếu tính tốc độ của thuật toán theo thời gian thực mà chúng ta đang cảm nhận. Thì tốc độ này còn bị phụ thuộc vào nơi mà thuật toán đó chạy (trên máy tính xịn, máy tính dởm) và những chi tiết khác cho việc triển khai nó (đầu vào ít hay nhiều sai sót) – Cho nên, chúng ta thường nói về thời gian chạy liên quan đến kích thước của đầu vào.

Ví dụ: Có một thuật toán, đầu vào bao gồm N số nguyên, thuật toán sẽ có thời gian chạy tỉ lệ với một hàm số của N, ví dụ N 2, khi đó thời gian chạy được gọi là tỉ lệ với N 2, được biểu thị là O (N 2 ).
Điều này tức là nếu bạn dùng Java để triển khai thuật toán nói trên ở máy tính với đầu vào có kích thước N, sẽ mất C * N 2 giây, trong đó C là một hằng số không thay đổi và không liên quan gì tới N.

Tuy nhiên, thời gian thực hiện thuật toán có thể thay đổi do các yếu tố khác với kích thước của đầu vào N. Ví dụ như thuật toán sắp xếp, nếu N số nguyên đầu vào đã có xu hướng được sắp xếp trước, thì thời gian sắp xếp sẽ nhanh hơn nhiều so với việc N số đầu vào lúc đầu là ngẫu nhiên. Vì thế, chúng ta sẽ thường nghe rằng có “Thời gian chạy trường hợp xấu nhất” và “Thời gian chạy trường hợp trung bình”.

Thời gian chạy trường hợp xấu nhất là trong mọi trường hợp, N số đầu vào dường như đã ngấm ngầm được chỉ định để thuật toán không có bước nào được nghỉ ngơi. Còn Thời gian chạy trường hợp trung bình là thời gian trung bình đo được trong tất cả các đầu vào có thể. Quá trình xác định thời gian chạy trường hợp xấu nhất và trường hợp trung bình cho một thuật toán nào đó đôi khi cũng gặp khó khăn, vì thường không thể chạy thuật toán trên tất cả các đầu vào có thể hoặc không nghĩ ra được những đầu vào chống lại sự nghỉ ngơi của thuật toán. Khi gặp khó khăn trong việc này, hãy tìm kiếm tài liệu online để ước tính các giá trị đó cho thuật toán của bạn.

Đối với một máy tính hạng thường, Thời gian hoàn thành gần đúng cho các thuật toán với N = 100 như sau:
![](https://images.viblo.asia/ebc5da06-1dd9-4689-b287-8dd83f47dc52.png)
Bài học là: Nếu tìm ra một thuật toán để tìm ra 100 cô bạn gái và nó có thời gian O (2^N) thì đừng thử chạy nó, mất 1000 năm, chiếc máy tính sẽ bị phân hủy vào không khí trước khi in ra danh sách các cô gái cho bạn.

# Sắp xếp
Sắp xếp là ví dụ tốt về một thuật toán thường được sử dụng bởi các nhà khoa học máy tính. Cách đơn giản nhất để sắp xếp một dãy các số nguyên là bắt đầu bằng cách xóa số nhỏ nhất khỏi hàng và đặt nó lên vị trí đầu tiên ở một hàng mới. Sau đó loại bỏ số nhỏ nhất tiếp theo, đặt nó tiếp theo của hàng mới, và cứ thế tới cuối cùng thì hàng mới là dãy số được sắp xếp. Thật không may, thuật toán này là O (N 2 ), có nghĩa là lượng thời gian cần thiết tỷ lệ thuận bình phương của số lượng số trong dãy ban đầu. Nếu bạn phải sắp xếp một tỷ số, thuật toán này sẽ mất nhiều năm để sắp xếp xong cho dù chạy trên máy tính mạnh nhất.

May mắn thay, có một số thuật toán tốt hơn (ví dụ quicksort, heapsort và mergesort) đã được phát minh qua nhiều năm, nhiều trong số đó có thời gian chạy là O (N * Log (N)). Điều này đưa số lượng hoạt động cần thiết để sắp xếp một tỷ số xuống một con số hợp lý mà ngay cả một máy tính để bàn giá rẻ cũng có thể thực hiện. Thay vì thời gian một tỷ bình phương, các thuật toán này chỉ cần thời gian khoảng 30 tỷ, nhanh hơn khoảng 30 triệu lần so với cách ban đầu.

# Con đường ngắn nhất
Các thuật toán để tìm ra con đường ngắn nhất từ ​​điểm này đến điểm khác đã được nghiên cứu trong nhiều năm. Các ứng dụng rất nhiều, nhưng cho phép mọi thứ đơn giản bằng cách nói rằng chúng ta cần tìm con đường ngắn nhất từ ​​điểm A đến điểm B trong một thành phố chỉ với một vài con đường và ngã tư.

Có khá nhiều thuật toán khác nhau đã được phát triển để giải quyết các vấn đề như vậy, tất cả đều có những lợi ích và nhược điểm khác nhau. Trước khi chúng ta đi sâu vào chúng, hãy xem xét một thuật toán ngây thơ – một thuật toán thử mọi con đường có thể đi được – sẽ mất bao lâu để chạy. Nếu thuật toán xem xét mọi con đường có thể từ A đến B (không đi theo vòng tròn), thì nó sẽ không chạy xong khi chúng ta còn sống, ngay cả khi A và B đều ở trong một thị trấn nhỏ. Thời gian chạy của thuật toán này theo cấp số nhân theo kích thước của đầu vào, nghĩa là nó là O (C^N) đối với một số C.

Một trong những thuật toán nhanh nhất để giải quyết vấn đề này có thời gian chạy là O (E V Log (V)), trong đó E là số lượng đoạn đường và V là số lượng giao lộ. Với máy tính thông thường, thuật toán sẽ mất khoảng 2 giây để tìm con đường ngắn nhất trong thành phố có 10.000 nút giao và 20.000 đoạn đường (thường có khoảng 2 đoạn đường trên mỗi giao lộ). Thuật toán, được gọi là Thuật toán của Djikstra, khá phức tạp và yêu cầu sử dụng cấu trúc dữ liệu được gọi là hàng đợi ưu tiên (Prioriry Queue). Tuy nhiên, với các ứng dụng ngày nay, thời gian chạy này vẫn quá chậm đối với số giao lộ của Việt Nam hay một nước nào đó.

Các lập trình viên thường cố gắng làm tốt hơn bằng cách sử dụng phương pháp phỏng đoán. Heuristic là một gần đúng của một kết quả đúng tuyệt đối, nó thường được tính toán bằng một thuật toán riêng. Trong bài toán con đường ngắn nhất, ví dụ, rất hữu ích khi biết khoảng cách từ một điểm tới điểm đích B. Biết điều này cho phép phát triển các thuật toán nhanh hơn (như A *, một thuật toán đôi khi chạy nhanh hơn đáng kể so với thuật toán của Djikstra) và vì vậy các lập trình viên đưa ra các phương pháp phỏng đoán để ước tính giá trị này.

Làm như vậy không phải lúc nào cũng cải thiện thời gian chạy của thuật toán trong trường hợp xấu nhất, nhưng nó làm cho thuật toán nhanh hơn trong hầu hết các trường hợp trong thế giới thực. Tính hữu dụng vẫn cần được ưu tiên.

# Các thuật toán gần đúng
Tuy nhiên, đôi khi, ngay cả thuật toán tiên tiến nhất, với các heuristic tiên tiến nhất, trên các máy tính nhanh nhất vẫn cứ là quá chậm. Trong trường hợp này, buộc phải hy sinh tính chính xác của Output. Thay vì cố gắng để có được con đường ngắn nhất, chúng ta đôi khi quyết định sẽ hài lòng khi tìm thấy một con đường dài hơn 10% so với con đường ngắn nhất.

Trong thực tế, có khá nhiều vấn đề quan trọng mà thuật toán tạo ra kết quả tối ưu lại không sử dụng được cho hầu hết các mục đích vì quá chậm. Nhóm nổi tiếng nhất của những vấn đề này được gọi là NP, viết tắt của đa thức không xác định (đừng lo lắng NP có nghĩa là gì). Khi một vấn đề được cho là NP, điều đó có nghĩa là không ai biết một cách tốt để giải quyết chúng một cách tối ưu cho thực tế.

Một ví dụ điển hình của vấn đề NP là bài toán Nhân Viên Bán Hàng. Một nhân viên bán hàng muốn tới gặp N khách hàng và anh ta biết đi từ chỗ người khách này tới chỗ người khách kia hết bao lâu. Câu hỏi là “anh này có thể gặp hết tất cả khách hàng của mình nhanh nhất là bao lâu?”. Thuật toán được biết đến có thể giải chính xác bài toán này sẽ chạy hết cả thiên niên kỷ – và chúng ta tin là nó mãi chậm như vậy – nên các lập trình viên sẽ tìm kiếm các thuật toán đủ nhanh và mang lại kết quả tốt nhất có thể.

# Thuật toán ngẫu nhiên
Có một cách tiếp cận cho một số vấn đề là ngẫu nhiên hóa một thuật toán theo một cách nào đó. Mặc dù làm như vậy không cải thiện thuật toán trong trường hợp xấu nhất, nhưng nó thường tạo ra các thuật toán rất tốt trong trường hợp trung bình.

Quicksort là một ví dụ tốt về thuật toán thường sử dụng ngẫu nhiên. Trong trường hợp xấu nhất, quicksort sắp xếp một dãy số trong thời gian O (N 2 ), trong đó N là số lượng số trong dãy. Tuy nhiên, nếu tính ngẫu nhiên được kết hợp vào một bước của Quicksort, thì khả năng trường hợp xấu nhất xảy ra gần như zero trong đời thực và về trung bình quicksort có thời gian chạy là O (N Log (N)).

Nhiều thuật toán sắp xếp khác đảm bảo thời gian chạy của O (N Log (N)), ngay cả trong trường hợp xấu nhất, nhưng chúng chậm hơn trong trường hợp trung bình ở ngoài đời thực. Các thuật toán đều có thời gian chạy ở dạng C * N Log (N) (C là hằng số với mỗi thuật toán), quicksort có hệ số C nhỏ nhất trong trường hợp trung bình, vì thế nhìn chung QuickSort là thuật toán sắp xếp nhanh nhất trong trường hợp trung bình. Do đó không lấy làm lạ khi trong Java 8, QuickSort là hàm sắp xếp mặc định của Arrays (mảng).

Một thuật toán khác sử dụng các số ngẫu nhiên là tìm trung vị của dãy số (số mà sẽ đứng ở giữa nếu dãy đó được sắp xếp) có thời gian chạy trung bình là O (N). Đây là một cải tiến đáng kể so với việc sắp xếp dãy và lấy số ở giữa, lấy O (N * Log (N)). Tất nhiên, có một vài thuật toán cụ thể (nhưng không có ngẫu nhiên hóa) tìm ra trung vị với thời gian O (N), nhưng thuật toán ngẫu nhiên thường vẫn chiến thắng về tính đơn giản và tốc độ trong trường hợp trung bình.

# Nén
Một lớp thuật toán khác xử lý các tình huống như nén dữ liệu. Loại thuật toán này không có đầu ra dự kiến được ​​(như thuật toán sắp xếp), thay vào đó là cố gắng tối ưu hóa theo một số tiêu chí. Trong trường hợp nén dữ liệu, thuật toán (ví dụ LZW) cố gắng làm cho dữ liệu đầu vào bị nén còn càng ít byte càng tốt mà vẫn có thể được giải nén về dạng ban đầu.

Trong một số trường hợp, loại thuật toán này sử dụng các kỹ thuật làm cho đầu ra ở mức độ tốt nhưng không giải nén về ban đầu được, đổi lại khả năng nén cao hơn. Ví dụ, nén JPG và MP3, cả hai đều nén dữ liệu theo cách làm cho kết quả cuối cùng có chất lượng thấp hơn so với bản gốc, nhưng chúng tạo ra các tệp dung lượng nhỏ hơn nhiều, bản nén chỉ cần vẫn giữ được các yếu tố phục vụ cho thực tiễn thì vẫn được cho là tốt. Hai thuật toán này tuân theo cùng một nguyên tắc nhưng khác nhau đáng kể về chi tiết vì tính chất của chúng khác nhau (nén hình ảnh so với âm thanh).

# Tầm quan trọng của việc hiểu biết thuật toán
Chúng ta cần trở thành một nhà khoa học máy tính chứ không chỉ là một Coder. Vì vậy điều quan trọng là phải hiểu tất cả các loại thuật toán này để ta có thể sử dụng chúng đúng cách.

Nếu bạn đang làm việc trên một phần mềm quan trọng, bạn có thể sẽ cần phải ước tính tốc độ của nó. Một ước tính sẽ rất kém chính xác nếu không có sự hiểu biết về phân tích thời gian chạy. Hơn nữa, bạn cần hiểu chi tiết về các thuật toán có liên quan để bạn có thể dự đoán liệu có trường hợp đặc biệt nào mà phần mềm của bạn có thể hoạt động quá chậm không.

Bạn cũng hay gặp phải vấn đề chưa được nghiên cứu trước đây. Trong những trường hợp này, bạn phải đưa ra một thuật toán mới, hoặc áp dụng một thuật toán cũ theo một cách mới. Bạn càng biết nhiều về các thuật toán thì bạn càng có nhiều cơ hội tìm ra một cách tốt để giải quyết vấn đề.

Còn lại, trong hầu hết trường hợp, một vấn đề mới là kết hợp của nhiều vấn đề cũ chồng chéo lên nhau, khi đó bạn sẽ cần có một sự hiểu biết cơ bản về các vấn đề cũ. Hiểu biết rộng về thuật toán sẽ hữu dụng vào lúc này, bạn sẽ không cần quá nhiều nỗ lực để giải quyết.

Ví dụ về việc này:

Một lớp học nhận được M nhiệm vụ, mỗi nhiệm vụ dành cho một học sinh và một học sinh chỉ được làm tối đa 1 nhiệm vụ, khi thực hiện xong nhà trường sẽ chấm điểm mức độ hoàn thành từ 1-100.
Lớp chỉ có N học sinh, bạn là giáo viên chủ nhiệm và bạn hiểu rõ học sinh của mình. Với mỗi nhiệm vụ, bạn biết rõ từng đứa sẽ làm nó tốt đến đâu (theo thang điểm 1 – 100). Giờ thì bạn cần giao nhiệm vụ sao cho sau khi hoàn thành thì lớp sẽ nhận được số điểm tối đa.

Có thể bạn sẽ chọn lần lượt những cặp (nhiệm vụ, học sinh) mang lại điểm số tiềm năng nhất cho đến khi không còn học sinh hay nhiệm vụ để giao thêm. Phương pháp này sẽ cho một kết quả khá tốt, nhưng bạn sẽ không tự tin.
Hãy xem thử nếu M = 2 và N = 2 và:
Điểm (học sinh 1, nhiệm vụ 1) = 80;
Điểm (học sinh 1, nhiệm vụ 2) = 40;
Điểm (học sinh 2, nhiệm vụ 1) = 60;
Điểm (học sinh 2, nhiệm vụ 2) = 10;

Nếu theo cách trên, bạn sẽ chọn ra cặp (học sinh 1, nhiệm vụ 1) trước, và cặp (học sinh 2, nhiệm vụ 2) sau => Lớp bạn sẽ đạt 90 điểm. Nhưng rõ ràng kết quả (học sinh 1, nhiệm vụ 2) + (học sinh 2, nhiệm vụ 1) = 100 lại tốt hơn.
Bạn làm sao biết được sẽ có những tình huống nào nữa, nếu số học sinh và nhiệm vụ có thể lên tới con số 100?

Trong trường hợp này, hóa ra có một thuật toán được gọi là “Cặp ghép Cực đại” được áp dụng trực tiếp cho vấn đề này. Mặc dù thoạt nhìn qua thì thì tại mỗi lần ghép một đôi, việc chọn một bộ (học sinh, nhiệm vụ) đồng thời có điểm cao mà vẫn mang lại kết quả hoàn hảo khi chọn những bộ đôi tiếp theo dường như là không thể.
Nhưng có một số thuật toán, mà tại mỗi bước bạn được phép điều chỉnh các bước trước đó theo một nguyên tắc nhất định thì sẽ mang lại kết quả cuối cùng tốt nhất. Một trong số đó đã giải quyết tuyệt đối được vấn đề này, bạn chỉ có thể tìm ra nó thông qua kiến ​​thức và hiểu biết về thuật toán có sẵn mới có thể phát hiện ra những nguyên tắc như vậy.

# Thêm ví dụ thực tế
Các vấn đề xảy ra trong thế giới thực thường đòi hỏi nhiều thuật toán tiên tiến. Hầu hết mọi thứ bạn làm với máy tính đều dựa vào một cách/thuật toán mà ai đó đã làm việc rất chăm chỉ để tìm ra. Ngay cả ứng dụng đơn giản nhất trên máy tính hiện đại cũng không thể thực hiện được nếu không sử dụng thuật toán đằng sau hậu trường để quản lý bộ nhớ và tải dữ liệu từ ổ cứng.

Có hàng tá ứng dụng của các thuật toán phức tạp, nhưng chúng ta sẽ thảo luận về hai Bài toán mà chúng đòi hỏi vận dụng rất thuần thục các thuật toán đã biết. Đầu tiên được gọi là bài toán Lưu Lượng Cực Đại (Maximum Flow) và thứ hai liên quan đến Quy Hoạch Động (Dynamic Programming) – một kỹ thuật thường để giải quyết các vấn đề mà nghe qua không thể tìm ra một thuật toán chạy nhanh được.

# Luồng cực đại (Maximum Flow)
Bài toán Luồng Cực Đại yêu cầu chúng ta phải xác định một lưu lượng lớn nhất có thể chuyển từ nơi này đến nơi khác trong một mạng lưới. Cụ thể hơn, trong cuộc chiến tranh lạnh với Liên Xô trong những năm 1950, Hoa Kỳ muốn biết Liên Xô có thể cung cấp hàng hóa nhanh chóng như thế nào thông qua mạng lưới đường sắt tới các quốc gia vệ tinh ở Đông Âu.
Ngoài ra, đề chuẩn bị cho chiến tranh có thể xảy ra, Hoa Kỳ cũng muốn biết cách nào là dễ dàng nhất để chia cắt các quốc gia vệ tinh khỏi Liên Xô, vốn đang giao thương trực tiếp cũng bởi mạng lưới đường sắt này.

Hóa ra hai vấn đề này có liên quan chặt chẽ với nhau, và việc giải Luồng Cực Đại cũng đồng thời giải được bài toán về cách thức rẻ nhất để cắt Liên Xô khỏi các vệ tinh.

Thuật toán hiệu quả đầu tiên để tìm ra Luồng Cực Đại được hình thành bởi hai nhà khoa học máy tính, tên là Ford và Fulkerson, nó sau đó được đặt tên là Ford-Fulkerson và trở thành một trong những thuật toán nổi tiếng của khoa học máy tính. Từ 1950 đến nay, có một số cải tiến đối với thuật toán Ford-Fulkerson để làm cho nó nhanh hơn, một số trong đó rất phức tạp.

Kể từ khi vấn đề được đặt ra, nhiều ứng dụng bổ sung của nó đã được phát hiện. Thuật toán có sự liên quan rõ ràng với Internet, trong đó việc lấy càng nhiều dữ liệu càng tốt từ máy này qua máy khác là điều rất quan trọng. Nó cũng xuất hiện trong tối ưu nguồn lực doanh nghiệp. Ví dụ: nếu bạn có N nhân viên và M công việc, thuật toán Luồng Cực Đại sẽ cho bạn biết cách chia việc cho nhân viên của mình sao cho hiệu quả đạt được là tốt nhất. Hoặc, thành phố có N nút giao thông, cần tính được lưu lượng giao thông tối đa, nếu lưu lượng này quá nhỏ hơn số lượng đầu xe, Thành phố sẽ ra lệnh cấm bớt các phương tiện cồng kềnh trong giờ cao điểm.

# So sánh chuỗi
Nhiều lập trình viên cả đời không bao giờ phải động tới một thuật toán Quy Hoạch Động (Dynamic Programming). Tuy nhiên, Quy Hoạch Động xuất hiện trong một số thuật toán quan trọng. Một thuật toán mà hầu hết các lập trình viên có thể đã sử dụng, mặc dù họ có thể không biết nó: tìm sự khác biệt giữa hai chuỗi. Cụ thể hơn, nó tính toán số lần chèn, xóa và chỉnh sửa tối thiểu cần thiết để chuyển đổi một chuỗi kí tự C1 thành chuỗi C2.

Ví dụ: hãy xem xét hai chuỗi, C1 = “AABAA” và C2 = “AAAB”. Để chuyển đổi chuỗi C1 thành chuỗi C2, điều đơn giản cần làm là xóa kí tự B ở giữa và thay đổi kí tự A cuối cùng thành B. Thuật toán này có nhiều ứng dụng, bao gồm phân tích sự giống nhau của các chuỗi DNA hoặc phát hiện đạo văn. Hình thức mà nhiều lập trình viên sử dụng nó là so sánh hai phiên bản của cùng một tệp mã nguồn: thuật toán này có thể cho người lập trình biết dòng mã nào đã bị xóa, dòng nào được chèn và dòng nào được sửa đổi để từ phiên bản này sang phiên bản tiếp theo.

Nếu không có Quy Hoạch Động, chúng ta sẽ phải xem xét một số lượng biến đổi theo cấp số nhân để có được từ chuỗi này sang chuỗi khác, quá trình có thể lên tới cả một ngàn năm. Tuy nhiên, lập trình động tạo ra một thuật toán với thời gian chạy chỉ có O (N * M), trong đó N và M là số phần tử trong hai chuỗi.

# Kết luận
Các thuật toán khác nhau mà mọi người nghiên cứu cũng đa dạng như các vấn đề mà họ giải quyết. Tuy nhiên, trong hầu hết trường hợp thì bài toán mà bạn đang cố gắng giải quyết có nhiều khía cạnh tương tự như các Bài toán đã biết.
Bằng cách liên tục phát triển sự hiểu biết tốt về một loạt các thuật toán, bạn sẽ có thể chọn giải pháp đúng cho một bài toán và áp dụng đúng cách.
Hãy nhớ về bài toán “Người Bán Hàng” cần đi gặp 100 khách hàng. Một lập trình viên thông minh và giàu kinh nghiệm sẽ khuyên Người Bán Hàng chỉ cần bỏ ra 30 phút để tìm ra một lịch trình để đi gặp đủ 100 khách trong thời gian đủ tốt. Còn đối với một lập trình viên non nớt kinh nghiệm đang cố gắng tìm ra một lịch trình tối ưu tuyệt đối, sẽ mất hơn 100 năm, và Người Bán Hàng chỉ có thể đi gặp cháu nội các khách hàng của anh ta mà thôi.

Có rất nhiều bài toán, mặc dù chúng có vẻ phi thực tế, nhưng để giải quyết nó thì lại đòi hỏi một bộ kiến thức thuật toán xuất hiện mỗi ngày trong thế giới thực. Những bài toán ít thực tế ấy đóng vai trò trau dồi những bộ thuật toán hữu ích hơn.

Tôi hi vọng ngần này là đủ để chỉ ra sự cần thiết của việc dành thời gian lập trình cho Thuật Toán.

Tại [beecost.com](http://beecost.com/install?pub=tuan&utm_content=blog_algorithms&utm_source=blog_viblo) – nơi chúng tôi làm một tiện ích extension cho trình duyệt web, giúp tự động review hàng hóa, đánh giá uy tín người bán, để mọi người khi cần mua sắm online sẽ yên tâm và tiết kiệm hơn.
Chúng tôi biết được mức giá cả trong cả năm trước của từng sản phẩm, vấn đề đặt ra là: Từ lịch sử giá của một sản phẩm, làm thế nào để biết giá của nó có đáng để mua hay không?
👉 Lời giải của vấn đề được đặt tên “Phân loại theo trung vị”.

Chúng tôi liên tục chia sẻ các bài về thuật toán xử lý dữ liệu về thương mại điện tử của [beecost.com](http://beecost.com/install?pub=tuan&utm_content=blog_algorithms&utm_source=blog_viblo), thực thi bằng Java trong khuôn khổ Engineer Blog này.

_ _ _

Tham khảo:

Introduction to Algorithms, Thomas H. Cormen – Charles E. Leiserson – Ronald L. Rivest – Clifford Stein.

Algorithms, Robert Sedgewick – Keven Wayne.

TopCoder.Com, Competitive Programming Tutorials.

SCJP Sun Certified Programmer for Java 6 Study Guide, Kathy Sierra – Bert Bates.

OCA Java SE 8 Programmer I Certification guide, Mala Gupta.

Nguồn: https://engineer.beecost.com/buoc-dau-tien-huong-toi-su-hieu-biet-ve-ly-do-tai-sao-nghien-cuu-va-kien-%e2%80%8b%e2%80%8bthuc-ve-thuat-toan-rat-quan-trong-la-xac-dinh-chinh-xac-y-nghia-cua-thuat-toan-theo/