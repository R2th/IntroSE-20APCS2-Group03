Xin chào tất cả các bạn, thật là vui khi chúng ta lại được gặp nhau trong những bài viết về chủ đề AI. Ngày hôm nay không giống như mọi lần, không phải là bàn luận về một bài toán cụ thể nào đó, cũng không phải là những câu hỏi hay sử dụng khi phỏng vấn kĩ thuật (khi nào có thời gian mình sẽ viết tiếp sau). Nhưng chủ đề ngày hôm nay mình muốn bàn luận đến mang tính chất gần gũi với việc làm môt bài toán thực tế hơn và điều này mình nghĩ rằng sẽ rất có ích cho các đội dự án hoặc các bạn đang có theo đuổi việc làm AI trong thực tế. Đây không phải là một quy trình chung cho tất cả các team nhưng là một quy trình gồm các bước mà mình nghĩ nó khá phù hợp cho một ứng dụng phần mềm có triển khai với AI mà các bạn có thể tham khảo. Ok không dài dòng thêm nữa chúng ta sẽ bắt đầu ngay thôi. 

# Step 1: Hiểu rõ được yêu cầu của bài toán 

Đây là một bước rất quan trọng, AI là một lĩnh vực không phải quá mới nhưng không thể thừa nhận rằng khá nhiều người đang hiểu sai về nó. Có thể mức độ hiểu sai của họ về mặt yêu cầu bài toán hoặc sức mạnh của công nghệ này. MÌnh đã thấy có rất nhiều người nói về AI như một cái gì đó rất cao siêu, vượt quá cả khả năng của con người thậm chi làm được cả những việc mà chỉ có Chúa mới có thể làm được như dùng AI để khiến Ngọc Trinh phải cầu hôn bạn vậy. Và vì còn khá nhiều những hiểu lầm như vậy nên khi làm việc với khách hàng (đặc biệt là những khách hàng non-tech) thì chuyện nhận được các yêu cầu (specs) trên trời là chuyện rất bình thường. Việc bạn cần phải làm đó là giải thích, phân tích và đưa ra những yêu cầu chính xác giữa mình và khách hàng. Cần phải cân nhắc giữa mức độ khả thi của kĩ thuật và mức độ hiệu quả trên thực tế bởi vì bản chất không có một mô hình AI nào cho độ chính xác tuyệt đối cả. Chúng ta cần phải cam kết được những tỉ lệ (con số) nhất định về độ chính xác của mô hình trước khi bắt tay vào thực hiện một bài toán. 

![](https://i.udemycdn.com/course/750x422/1414522_fc7d.jpg)

# Step 2: Thiết kế hệ thống tổng quan

Đây là một bước rất quan trọng khi làm bất kì một phần mềm nào. Về cơ bản bạn cần phải trả lời được các câu hỏi sau để thiết kế hệ thống cho phù hợp:

* **Input / output của hệ thống là gì?** đây chính là câu hỏi mà bạn cần phải trả lời đầu tiên điều đó chứng tỏ bạn đang hiểu rất rõ về yêu cầu của bài toán. Ví dụ bài toán nhận diện chữ viết tay thì input và output là gì? Có nhiều bạn sẽ trả lời ngay rằng tất nhiên input là một ảnh và output chính là chữ viết tay. Ồ nghe có vẻ đơn giản đó nhưng đó chính là đứng ở góc nhìn của người dùng cuối. Còn ở góc nhìn kĩ thuật bạn cần phải làm rõ được input và output này. Ví dụ đầu vào có thể là một hình ảnh (dạng file) hoặc đường dẫn (URL), hoặc là một chuỗi Base64 được encode. Đâu ra của hệ thống của thể là một JSON chứa kết quả là chữ được nhận dạng trong ảnh đó. Với từng yêu cầu đó chúng ta sẽ thiết kế hệ thống sao cho phù hợp. 
* **Hệ thống được chạy trên nền tảng nào?** có nhiều bạn ngay từ khi nhận được yêu cầu của bài toán là xây dựng hệ thống nhận diện khuôn mặt thì đã lao ngay vào tìm kiếm dữ liệu rồi training mô hình sao cho đạt kết quả cao nhất. Bạn ta sử dụng một mạng CNN lên đến mấy chục triệu tham số để đạt được kết quả tốt nhất và vỗ ngực tự hào rằng mô hình của mình ngon lắm và có thể đưa vào thực tế dùng ngay. Tuy nhiên đến lúc chạy thực trên một con Rapsbery Pi thì vừa khởi động chương trình một phát đã đơ luôn cả hệ thống do mô hình quá nặng, chưa nói gì đến dự đoán của tốt hay không? Thế nên bạn cần phải define rõ ràng môi trường để thực hiện và triển khai bài toán. Bạn có thể thực hiện các thí nghiệm với hàng chục GPU khủng nhưng không có nghĩa rằng bạn cũng phải yêu cầu điều đó trên môi trường test. 
* **Việc cập nhật dữ liệu mới diễn ra như thế nào?** Một mô hình AI được làm ra có thể đúng và tốt tại thời điểm hiện tại nhưng không có nghĩa rằng nó sẽ đúng và tốt trong tương lai khi dữ liệu thay đổi liên tục. Vì vậy chúng ta cần phải quan tâm đến việc cập nhất dữ liệu mới như thế nào.  Việc cập nhật mô hình khi dữ liệu thay đổi là một bài toán khá dài và chúng ta sẽ bàn sâu hơn trong các phần tiếp theo. Tuy nhiên việc thiết kế hệ thống phải đảm bảo được mô hình AI của bạn luôn luôn đáp ứng được với những dữ liệu cập nhật liên tục. 
# Step 3: Làm survey các phương pháp thực hiện bài toán

Có một thực trạng của những người mới học hoặc mới làm về AI là quá chú trọng vào việc thử nghiệm các mô hình (model) nhưng lại quên mất một việc mà chúng ta vẫn hay làm từ lúc còn chân ướt chân ráo vào lĩnh vực này đó là tìm kiếm và survey các giải pháp. Kể cả khi bạn đã có kinh nghiệm với các bài toán tương tự thì cũng đừng nên nhảy vào thử nghiệm các mô hình ngay mà hãy nên làm survey các phương pháp để thực hiện vấn đề đó trước. 

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlK1UH-0V2Gbz3OgGoueuAiy6Rcbu_z3K5KZAeWn2PtE6ZacYS)

## Lợi ích của việc làm survey 
Điều này có một vài các lợi ích như sau:

* **Update được công nghệ mới:** kể cả khi bạn đã có kinh nghiệm về vấn đề này rất nhiều năm nhưng không có nghĩa rằng phương pháp bạn sử dụng luôn luôn mới. Việc làm các survey bản chất là lục lọi, tìm kiếm tất cả các phương pháp từ mới đến cũ cho bài toán hiện tại nên một lẽ dĩ nhiên bạn sẽ có cơ hội tiếp xúc với các công nghệ mới. Hãy tưởng tượng nếu bạn đang làm môt mô hình Speech to Text thì những người trước đây chưa biết Deep Learning sẽ chỉ nghĩ đến GMM, HMM mà thôi. Sẽ chẳng có gì thay đổi trong hệ thống của họ nếu như họ không liên tục khảo sát các công nghệ mới. 
* **Có thêm được background về vấn đề** không ai có thể tự tin rằng mình có đầy đủ background (kiến thức nền tảng) của mọi vấn đề cả, chính từ việc làm survey sẽ giúp cho bạn phải đọc qua rất nhiều paper, rất nhiều blog kĩ thuật rồi từ chúng lại được liên kết với rất nhiều paper hoặc reference khác để giúp bạn lấy thêm các kiến thức. 
* **Tìm ra được những giải pháp mới** nếu như bạn đang đi vào trong một lối mòn về công nghệ thì việc làm survey có thể sẽ giúp cho bạn có được những ý tưởng và hướng giải quyết mới cho một vấn đề đặt ra. 

## Các nguồn có thể survey 
Vậy một câu hỏi đặt ra đó là làm survey ở những nguồn nào. Sau đây là một số kênh mà các bạn có thể tham khảo:

* **Các paper, journal tại các hội thảo chuyên ngành** đối với một lĩnh vực mang nhiều yếu tố học thuật như AI thì việc tìm kiếm thông tin từ các paper là một điều không thể thiếu. Có rất nhiều bạn không hình thành được thói quen đọc các paper và cũng hơi lười đọc vì những ngôn từ trong đó không trực quan và dễ hiểu như đọc một tutorial về công nghệ chẳng hạn. Tuy nhiên việc đọc paper chính là nơi chứa nhiều các thông tin nhất vì không phải vấn đề nào bạn cũng có thể có tutorial theo kiểu step by step và không phải vấn đề nào được đem ra làm tutorial cũng là giải pháp tốt nhất. Tuy nhiên việc đọc các paper cũng cần phải có lọc lựa để tránh việc đọc phải những **shit paper** gây mất thời gian và lạc hướng.  Tốt nhất bạn nên tìm kiếm paper tại các hội thảo công nghệ top đầu của linh vực đó hoặc follow các nhà xuất bản nổi tiếng trong lĩnh vực như IEEE hay Springer... 
* **Textbook** việc đọc sách cho bạn những khái niệm tổng quan nhất về lĩnh vực đang nghiên cứu dù có thể chưa phải là những kiến thức mới nhất như paper. Tuy nhiên những thông tin đưa ra trong các textbook là chuẩn chỉnh, không phải lo lắng về chất lượng. 
* **Blog công nghệ** đôi lúc bạn cũng có thể tham khảo các blog công nghệ với một vài bài viết liên quan đến lĩnh vực mà bạn đang làm. Tuy nhiên một nhược điểm của các dạng blog này thường mang tính chất **hướng dẫn** nhiều hơn nên việc để hiểu sâu về một vấn đề thì nó khó có thể đáp ứng tốt được. Chưa kể các nội dung trên các blog này thường không đưa ra cho chúng ta các **best solution**. Điều nãy cũng dễ hiểu thôi, muốn có giải pháp tốt bạn phải bỏ công sức ra mà nghiên cứu. **No free lunch**
* **Github** bạn có thể tham khảo các giải pháp được trình bày trong các repo publish trên giithub và điều này có một lợi thế đó là bạn có thể đọc trực tiếp source code và thử cài đặt chúng. Đây cũng là một hướng hay nếu như được kết hợp với một paper cụ thể nào đó. Điều này làm cho chúng ta thấy hứng thú hơn là việc ngồi đọc paper. Tuy nhiên mình vẫn khuyên mọi người nên đọc paper kết hợp với việc chạy code để tránh rơi vào tình trạng không hiểu bản chất của vấn đề dẫn đến việc chạy được nhưng khó có thể **maintainance** nếu có yêu cầu thay đổi. 

Sau khi làm survey xong chúng ta sẽ lựa chọn phương pháp và thử triển khai để chọn ra các phương pháp tốt nhất với bài toán của chúng ta.

## Ví dụ về một mẫu survey

Một mẫu survey trong một bài toán AI cụ thể nên có các phần sau:

* **Tên của nghiên cứu**: Tên của nghiên cứu mà chúng ta đang survey và nên đi kèm theo đường dẫn trên mạng (nếu có)
* **Liên kết liên quan  đến nghiên cứu** Nếu có những references liên quan đến nghiên cứu hiện tại thì cần phải liệt kê rõ ràng những references và những khái niệm liên quan đến nó. 
* **Mục đích chính của nghiên cứu** mô tả khái quát nhất mục đích của nghiên cứu sau khi survey, thường là bản tóm tắt những công việc được làm trong nghiên cứu đó. 
* **Các kết quả đạt được** nêu ro các kết quả đạt được của nghiên cứu, lưu ý là kết quả sẽ được thực hiện trên một tập dữ liệu nhất định và để tránh hiểu nhầm thì phải ghi rõ tập dữ liệu đó là gì. 
* **Ưu điểm nhược điểm, mức độ phù hợp với bài toán** đánh giá một cách tổng quát nhất ưu điểm nhược điểm và mức độ phù hợp với bài toán hiện tại. 

# Step 4: Làm dữ liệu 

![](http://www.cloudgarage.in/wp-content/uploads/2017/08/data-ML-service.png)
Có một sự thật không thể chối cãi rằng việc làm dữ liệu là bước quan trọng nhất của mọi hệ thống AI. Bạn có thể sử dụng một mô hình đơn giản để giải quyết vấn đề miễn là bạn có một tập dữ liệu đủ tốt. Việc làm dữ liệu cũng thường ngôn của team bạn rất nhiều thời gian và tỉ mỉ. Bạn có thể nghiên cứu thật kĩ bài toán của mình và lựa chọn chiến lược làm dữ liệu cho phù hợp. Dưới đây là một số cách bạn có thể tham khảo:

* **Tìm kiếm, xin hoặc mua các tập dữ liệu có sẵn** với một số bài toán bạn vẫn có thể thực hiện bằng cách này tuy nhiên có một số nhược điểm đó là không phải lúc nào bạn cũng tìm ra được tập dữ liệu đúng với bài toán của mình, hoặc có thể tìm ra nhưng không dễ gì xin hoặc mua được. Một điều nữa là những tập data đó chưa chắc đã đáp ứng được nhu cầu chất lượng trong sản phẩm mà bạn đang yêu cầu.
* **Tự tạo dữ liệu** việc tự tạo dữ liệu giúp bạn kiểm soát được chất lượng của dữ liệu hơn và giúp chúng ta chủ động focus vào đúng domain mà yêu cầu bài toán đang hướng tới. Tuy nhiên công việc này cũng khiến cho chúng ta mất khá nhiều thời gian, bạn có thể thực hiện theo cách là làm trên toàn bộ dữ liệu hoặc làm trên một phần của dữ liệu rồi training mô hình để dự đoán phần dữ liệu còn lại sau đó validate lại dữ liệu đó. Tuỳ vào khối lượng công việc và độ lớn của nhân lực mà chúng ta lựa chọn chiến lược cho phù hợp nhưng dù làm theo cách nào đi chăng nữa thì bạn vẫn phải **đảm bảo được sự chính xác của dữ liệu. Điều này là điểu quan trọng nhất.**

# Step 5: Training các model 

![](https://devblogs.nvidia.com/wp-content/uploads/2017/04/dl_workflow.png)

Sau khi lựa chọn các phương pháp training và thực hiện trên các tập dữ liệu thì việc cần làm tiếp theo đó là training các mô hình. Rất nhiều bạn coi đây là một bước quan trọng nhất nhưng quên mất rằng bước này chỉ trở nên quan trọng nhất nếu như bạn đã làm tốt các bước phía trên.  Bạn nên chia team ra thành các team nhỏ để training các mô hình khác nhau, làm các thí nghiệm và so sánh kết quả. Việc training các mô hình tuỳ thuộc vào bài toán nhưng vẫn có thể có một vài quy tắc chung cho nó. Dưới đây là một vài quy tắc mà bạn có thể áp dụng trong dự án của mình:

* **Nếu có thể hãy thử transfer learning trước** với các bài toán của bạn nếu tìm được các pretrained model thì lời khuyên là nên thử nghiệm chúng với phương pháp **transfer learning** trước. Điều này khiến cho thời gian để validate được kết quả trở nên nhanh chóng hơn nữa việc transfer từ một mô hình pretrained thường đem lại kết quả tốt hơn và thời gian training thường là nhanh hơn so với việc training cùng một mô hình đó nhưng các tham số được khởi tạo từ đầu. 
* **Hạn chế tối đa việc phụ thuộc qua lại giữa các mô hình** việc phụ thuộc qua lại giữa các mô hình là điều không thể tránh khỏi trong một dự án lớn. Bạn hãy tưởng tượng một ví dụ về hệ thống nhận diện giấy tờ số (chứng minh thư, sổ đỏ, hộ chiếu ...) chẳng hạn. Sau một hồi làm survey bạn đưa ra một thiết kế tổng quan cho hệ thống như sau:

    * **Step 1: Phân loại giấy tờ** một mô hình classification được sử dụng để tự động nhận dạng loại giấy tờ tuỳ thân của bạn. Độ chính xác là 95%
    * **Step 2: Crop giấy tờ** một mô hình sử dụng để crop và align lại giấy tờ với độ chính xác là 98%
    * **Step 3: Extract các thông tin** một mô hình object detection được sử dụng để extract thông tin từ giấy tờ đó với độ chính xác 90%
    * **Step 4: OCR** một mô hình nhận dạng chữ in được sử dụng để nhận dạng chữ trong giấy tờ với độ chính xác là 90%
    
    Điều này sẽ không có gì đáng nói nếu như độ chính xác của các bước phía sau phụ thuộc hoàn toán và độ chính xác của các bước trước đó, tức là output của bước trước được lấy làm input của bước sau. Các bạn phải hết sức cẩn thận và hạn chế tối đa mức độ phụ thuộc này. Ví dụ thay vì phải phân loại giấy tờ thì bạn có thể tách ra thành từng mô đun ở phía giao điện sao cho người dùng bắt buộc phải upload đúng loại giấy tờ. Điều này làm giảm thiệu rủi ro của hệ thống hơn.  Và càng làm giảm được sự phụ thuộc này thì việc training mô hình càng trở nên chính xác hơn. 

* **Cân bằng giữa độ chính xác và tốc độ** việc điều chỉnh cân bằng giữa độ chính xác và tốc độ là một điều cần cân nhắc khi lựa chọn training các mô hình, tuỳ thuộc vào yêu cầu bài toán của bạn mà lựa chọn training một mô hình cho phù hợp. 
* **Phải cân nhắc đến bước deploy** điều này cần được làm rõ và cân nhắc kĩ trước khi training, có một số mô hình chỉ có khả năng chạy tốt khi có GPU (Ví dụ như CuDNNLSTM trong Keras chẳng hạn) mà khi convert sang CPU thì kết quả bị kém đi hoặc tệ hơn là không thể sử dụng trên các device khác. Điều đó giúp bạn có một tư duy tìm hiểu trước về môi trường deploy trước khi tiến hành training mô hình. 

# Step 6: Đánh giá các mô hình 

Việc đánh giá các mô hình cần phải được quy định trong nội bộ của team và đảm bảo các yếu tố sau:

* **Xây dựng tập dữ liệu test chuẩn chỉnh** dữ liệu test phải đảm bảo cover được tối đa các trường hợp có thể gặp được trong thực tế. Phải được xây dựng tỉ mỉ và độc lập với quá trình trianing mô hình. 
* **Độc lập hoàn toàn dữ liệu test** Dữ liệu test là độc lập hoàn toàn và không thể sử dụng trực tiếp hoặc gián tiếp (tạo ra các biến thể rất nhỏ) trong bước training mô hình. Việc phân chia bộ test có thể sử dụng chung cho cả team để đảm bảo tính khách quan giữa các model. Việc test trên tập test là một bước khá quan trọng để đánh giá môt mô hình có thực sự tốt và có thể sử dụng trên thực tế hay không.
* **Luôn sử dụng Confusion Matrix cho phân lớp** điều này giúp cho mô hình phân lớp được đánh giá khách quan hơn và giúp chúng ta tìm ra được các đặc trưng của từng model. Ví dụ model A dự đoán tốt hơn cho class 1, model B dự đoán tốt hơn cho class 2 .... và điều đó rất thuận lợi cho quá trình ensemble các mô hình sau này. 
![](https://www.researchgate.net/profile/Meng-Han_Hu/publication/324504393/figure/tbl1/AS:631571585441798@1527589808038/Average-evaluation-metrics-of-the-two-deep-learning-models-and-the-five-traditional.png)
* **End users is the best** kể cả việc test trên tập test có thể giúp bạn nghiệm thu được application đối với khách hàng thì cũng không có gì khẳng định được mô hình của bạn sẽ chạy tốt tương tự trên thực tế. Luôn luôn có hệ thống lắng nghe feedback từ phía user để tìm ra được các hướng improve cho bài toán của mình. 

# Step 7: Deploy hệ thống
![](https://cdn-images-1.medium.com/max/1200/1*02b-LWLJxV0Lp8r-KksWyw.png)

Sau tất cả, mục đích cuối cùng mà người dùng mong muốn là được trải nghiệm một sản phẩm AI trên thực tế mà không cần mất quá nhiều kĩ thuật. Đó chính là bước chúng ta deploy mô hình. Việc deploy một hệ thống mô hình AI cũng không khác quá nhiều so với các hệ thống khác nó vẫn phải đảm bảo được các yếu tố cốt lõi:

* **Hạn chế tối đa down time** trong quá trình deploy thì việc có xảy ra down-time là điều không thể tránh khỏi nên tất cá các phương pháp deploy của chúng ta cũng như việc cập nhật mô hình phải đảm bảo được hạn chế tối đa thời gian đó. Điều này cũng đồng nghĩa với việc service của chúng ta có thể hoạt động được tối đa thời gian của nó. (Up time xấp xỉ 100%)
* **Phải cân nhắc đến thời gian predict** đã hơn một lần trong bài viết này mình đề cập đến vấn đề test time điều đó chứng tỏ rằng đây là một trong những yếu tốt khá quan trọng trong đa số các bài toán hiện tại khi mà mục tiêu real time đang được rất nhiều ứng dụng quan tâm đến. 
* **Phải có hệ thống lưu trữ lại dữ liệu và kết qủa của mô hình** việc theo dõi được két quả của mô hình giúp chúng ta lên kế hoạch phù hợp để update mô hình cho phù hợp. Vì như đã nói ở đầu thì không có một mô hình nào đảm bảo không bao giờ sai tại mọi thời gian, mọi không gian. Thế nên việc lưu trữ lại những dữ liệu trrong thực tế giúp chúng ta bổ sung thêm được các case mới lạ, chưa có trong lịch sử. 
* **Khả năng scale dễ dàng** việc deploy phải đảm bảo được sao cho việc scale up hệ thống trở nên dễ dàng hơn và đảm bảo tối đa các rủi ro trong quá trình scale up . Điều này giúp cho ứng dụng của chúng ta có khả năng mở rộng trong mọi điều kiện và hoàn cảnh. 
# Step 8: Keeping Your Models Up-To-Date

![](https://cdn.business2community.com/wp-content/uploads/2014/04/image0012.jpg)
Nếu bạn lướt web, bạn sẽ tìm thấy nhiều hướng dẫn chỉ cho bạn cách training và evaluate các mô hình AI. Bạn thậm chí có thể tìm thấy các tutorial dạy cho bạn cách deploy các mô hình đó và  dự đoán từ các ứng dụng người dùng cuối của bạn. Tuy nhiên, bạn sẽ khá khó khăn để tìm các tài liệu chỉ cho bạn cách duy trì các hệ thống AI đó. Bạn phải trả lời các câu hỏi như:

* Làm thế nào để bạn đảm bảo dự đoán của bạn tiếp tục chính xác? 
* Làm thế nào để bạn giữ cho các mô hình của bạn cập nhật với dữ liệu mới?

Hãy lấy ví dụ về dự đoán giá nhà. Giá nhà thay đổi mọi lúc. Dữ liệu bạn đã sử dụng để đào tạo mô hình học máy dự đoán giá nhà sáu tháng trước có thể cung cấp dự đoán sai bét cho ngày hôm nay. Đối với giá nhà, điều bắt buộc là bạn phải có thông tin cập nhật để đào tạo các mô hình của mình. Khi thiết kế một hệ thống AI trong thực tế, điều quan trọng là phải hiểu cách dữ liệu của bạn sẽ thay đổi theo thời gian. Một hệ thống có kiến trúc tốt sẽ tính đến điều này và phải có kế hoạch để giữ cho các mô hình của bạn được cập nhật thích ứng với dữ liệu mới. Có hai giải pháp mà bạn có thể lựa chọn cho hệ thống của mình. 

## Training thủ công 

Về cơ bản chúng ta sẽ thực hiện lại các bước đã làm cho dữ liệu mới để giúp cho mô hình học tốt hơn. Việc này khá là mất thời gian và sẽ gặp phải một chút khó khăn nếu như team bạn có những người mới vào dự án thì bạn sẽ phải mất thời gian để đọc hiểu mô hình và luồng dữ liệu. Hơn nữa việc đặt thời gian training lại mô hình cũng rất thủ công như training hằng ngày, hằng tuần, hằng tháng .... và bạn đều phải phân chia resource cho việc đó. Tuy nhiên phương pháp này có một ưu điểm đó là khi bạn tự đào tạo lại các mô hình của mình, bạn có thể khám phá một thuật toán mới hoặc một bộ feature mới của dữ liệu cung cấp độ chính xác được cải thiện.

## Continuous learning

Một cách khác để giữ cho các mô hình của bạn được cập nhật là có một hệ thống tự động để liên tục đánh giá và đào tạo lại các mô hình của bạn. Loại hệ thống này thường được gọi là **continuous learning** và thường được thiết kế như sau:

* Lưu dữ liệu đào tạo mới khi bạn nhận được nó. Ví dụ: nếu bạn đang nhận được giá nhà cập nhật trên thị trường, hãy lưu thông tin đó vào cơ sở dữ liệu.
* Khi bạn có đủ dữ liệu mới, kiểm tra độ chính xác của nó đối với mô hình cũ của bạn.
* Nếu bạn thấy độ chính xác của mô hình của bạn có độ chính xác giảm theo thời gian, hãy sử dụng dữ liệu mới hoặc kết hợp dữ liệu mới và dữ liệu đào tạo cũ để xây dựng và triển khai một mô hình mới.


Lợi ích khi thiết kế hệ thống này là nó có thể cập nhật liên tục và hoàn toàn tự động. Một số cloud như IBM Watson cũng hỗ trợ hình thức re training này.  Trong bước thiết kế hệ thống bạn nên làm rõ điều này trước để cân nhắc về infra. Bạn cũng có thể kêt hợp giữa hai phương pháp trên để đạt được kết quả tối ưu. 
# Kết luận 

Qua bài viết này mình hi vọng có thể đem đến cho mọi người một cái nhìn tổng quan khi thực hiện một project liên quan đến AI trong thực tế. Đó không phải là những gì đó quá hàn lâm nhưng gần gũi với các anh em làm kĩ thuật. Rất mong nhận được sự đóng góp ý kiến từ mọi người.