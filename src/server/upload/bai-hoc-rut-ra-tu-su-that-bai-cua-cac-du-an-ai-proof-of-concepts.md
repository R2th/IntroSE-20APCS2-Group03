(Bài viết này được viết dựa trên bài viết [9 Lessons learned from failed AI PoCs](https://medium.com/predict/lessons-learned-from-failed-ai-pocs-d888fe7ffbe) nhưng thay vì dịch lại hoàn toàn, mình viết lại cả bằng góc nhìn và quan điểm cá nhân.)
# PoCs - Proof of Concepts
**Proof of concepts**([PoCs](https://en.wikipedia.org/wiki/Proof_of_concept)) hiểu đơn giản là việc hiện thực hóa một phương pháp hoặc một ý tưởng nhất định để chứng minh tính khả thi của giải pháp và tiềm năng của nó trong thực tế. Một PoC thường nhỏ và có thể hoàn thành hoặc không vì đơn giản, nó chỉ là một thử nghiệm để khẳng định tính khả thi, để biết dừng sớm nếu thất bại. Thực tế, thời gian dự kiến thực hiện một dự án PoC là khoảng 2 tuần đến 1 tháng, tùy vào độ phức tạp của PoC. Trong phát triển phầm mềm, các dự án PoC thường sẽ cố gắng trả lời các câu hỏi như:

1. Công nghệ này sẽ đáp ứng nhu cầu nào của chúng ta/người dùng?
2. Sản phẩm này sẽ hoạt động chứ và nó sẽ hoạt động như thế nào?
3. Người dùng sẽ làm việc hiệu quả với việc sử dụng công nghệ mới này chứ? Liệu họ có quan tâm tới nó?
4. Giải pháp được đưa ra có khả thi?
5. Etc

AI PoC là các dự án PoC có áp dụng trí tuệ nhân tạo. Thông qua các AI PoC, các công ty cố gắng chứng mình rằng một giải pháp AI trên thực tế sẽ cắt giảm chi phí, cải thiện trải nghiệm người dùng hoặc bằng một cách này đó sẽ là điểm khác biệt cho doanh nghiệp.

AI PoC thường được thực hiện trên các thuật toán khá đơn giản bằng cách sử dụng dữ liệu đào tạo có sẵn hoặc sử dụng các bộ dữ liệu nội bộ ở quy mô nhỏ. Mục tiêu chính là chỉ ra rằng một thuật toán có thể được đào tạo để giải quyết một trường hợp cụ thể với một lượng nhỏ dữ liệu đào tạo. Nếu dự án PoC thành công, họ tiếp tục tiến hành giai đoạn product.

Sau một vài dự án AI PoCs, tôi đã nhận ra rằng việc thực hiện các dự án AI PoC là khá dễ dàng, kết quả đạt được khá tích cực ngay cả khi chúng ta mới chỉ đang ở những giai đoạn đầu của dự án, nhưng đồng thời, rất khó để mở rộng những AI PoCs đó trở thành một sản phẩm thực sự, ứng dụng cho toàn danh nghiệp và đạt đến giai đoạn sản phẩm thương mại hóa được. Đa phần các dự án PoC không thể đạt được tới giai đoạn product và chỉ số ít có thể đạt được tới giai đoạn phát hành.

Năm 2019, nhiều công ty đã bắt đầu áp dụng các giải pháp trí tuệ nhân tạo với kết quả ấn tượng nhưng chỉ một số ít đã phát triển các tính năng AI một cách toàn diện và mang lại giá trị gia tăng thực sự cho công ty. Vì suy nghĩ lối mòn trong cách tư duy về các PoC khác(không phải AI PoCs), nhiều dự án AI PoC đã rơi vào bế tắc sau khi hoàn thành và chuyển sang giai đoạn product. Sự khác biệt giữa AI PoC và AI product khiến nhiều công ty bối rối do chất lượng của mô hình khó có thể cải thiện trong giai đoạn product, sự khác biệt giữa môi trường thử nghiệm và thực tế, yêu cầu về khả năng mở rộng hệ thống, thời gian phản hồi,... Do đó, để thành công, các dự án AI cần phải suy nghĩ lớn ngay từ đầu bằng cách xem xét cấu trúc công ty, khách hàng, quy mô công ty, quy trình làm việc nội bộ và phân tích sợ bộ giải pháp một cách bài bản để giảm thiểu rủi ro.

Trong bài viết này, chúng ta sẽ cùng điểm qua những lý do chính mà theo tôi dẫn đến sự thất bại của các dự án PoC. Hy vọng thông qua bài viết này, bạn sẽ có được cái nhìn đúng đắn hơn về các dự án PoCs để có thể có được những dự án PoCs thành công, có khả năng phát triển thành các awesome product.

# 9 nguyên nhân dẫn đến sự thất bại của các PoCs
## 1. Dữ liệu
Khi làm việc với các tổ chức hay công ty, tôi nhận ra rằng chỉ một phần nhỏ những người có quyền ra quyết định tại tổ chức, công ty đó hiểu đầy đủ tầm quan trọng của việc có một bộ dữ liệu tốt. Một bộ dữ liệu tốt mà tôi muốn đề cập là một bộ dữ liệu được quản lý tốt, chuẩn bị một cách kỹ lưỡng để huấn luyện mô hình AI.

Việc thiếu dữ liệu tốt cho huấn luyện này dễ dàng là một trong những rào cản lớn nhất đối với việc chuyển từ một **Proof of Concept** thành một sản phẩm thực sự, có thể đưa vào sử dụng thực tế. Đó không chỉ là rào cản, đó còn thực sự là một nỗi đau của doanh nghiệp.

Khi làm việc với các tổ chức lớn, doanh nghiệp lớn, vấn đề lại không phải là không có đủ dữ liệu mà là dữ liệu đó bị khóa và khó truy cập, sử dụng. Sẽ rất mất nhiều thời gian để thu thập dữ liệu cần thiết vì bạn cần giải thích, thuyết phục rất nhiều người khác, trước tiên là các cấp quản lý khác nhau của bạn, sau đó là những người trực tiếp cung cấp dữ liệu cho bạn. Tất cả các thuật toán học máy đề sẽ không hoạt động nếu dữ liệu của bạn bị cứng nhắc, khác biệt quá nhiều với dữ liệu thực tế.

Một vấn đề khác liên quan tới dữ liệu chính là chất lượng của dữ liệu.

> Chất lượng của dữ liệu chính là sự phù hợp của dữ liệu đó với mục đích sử dụng của nó trong các bối cảnh nhất định. Chất lượng của dữ liệu được xác định bởi các yếu tố như độ chính xác, tính đầy đủ, độ tin cậy, mức độ liên quan và mức độ cập nhật của nó. 

Các vấn đề về chất lượng dữ liệu có thể có nhiều dạng, ví dụ:

1.  Dữ liệu bị thiếu giá trị hoặc không hợp lệ
2.  Dữ liệu không nhất quán(đơn vị đo lường, không gian quy chiếu)
3.  Dữ liệu không mang tính bao phủ, chưa đủ tổng quát
4.  Dữ liệu nhiễu hoặc không đúng định dạng
5.  Dữ liệu có quá nhiều bản sao trùng lặp
6.  Etc.

Tôi tin rằng nếu công ty mà bạn đang làm việc đang phải vật lộn với quá nhiều vấn đề về chất lượng dữ liệu thì điều đó có nghĩa là công ty đó chưa sẵn sàng cho việc thực hiện, triển khai các dự án AI. Thật vậy, chi phí và rắc rối của việc thu thập và chuẩn bị dữ liệu thường gây khá nhiều bất ngờ cho các công ty. Họ thường nghĩ, để công ty có thể phát triển sang lĩnh vực AI, chỉ cần tuyển dụng, xây dựng một nhóm những người có khả năng, kiến thức về lĩnh vực AI là đủ. Khi đòi hỏi dữ liệu, nhiều cung bậc bối rối được thể hiện.

Dựa trên kinh nghiệm của tôi, các công ty lần đầu tiên theo đuổi sang lĩnh vực Machine learning thường thiếu hiểu biết chuyên môn về việc dữ liệu nào là cần thiết cho các mô hình học máy và chuẩn bị dữ liệu thế nào là tốt, có lợi cho các hệ thống học máy. Việc tạo ra dữ liệu chất lượng cao không chỉ liên quan đến việc định dạng lại dữ liệu cho đúng format của một thư viện nào đó hoặc sửa lỗi: Dữ liệu cần được dán nhãn để có thể cung cấp cho máy học được cách đưa ra các quyết định trong tương lai.

> **Học từ thất bại:**
>
> Dự án AI đầu tiên của chúng tôi thực hiện với khách hàng là một dự án về AI làm cho một đơn vị tại Nhật Bản. Việc tìm hiểu yêu cầu khách hàng, đặc điểm của bài toán được chúng tôi tìm hiểu khá kĩ. Các giải pháp khả thi được đề xuất. Bản demo được đưa ra. Chúng tôi tự tin về tính khả thi của bản PoC. Điểm khá rủi ro ở đây là phía đơn vị khách hàng không cho phép chúng tôi truy cập vào nguồn dữ liệu thực của họ, chúng tôi phải tự tạo dữ liệu huấn luyện sao cho giống thật nhất. Và không ngoài dự kiến, dữ liệu huấn luyện chúng tôi đã tạo trước đây hoàn toàn khác xa với dữ liệu thực tế. Những gì chúng tôi chuẩn bị trước đây không thể dùng cho sản phẩm thực tế, vì đơn giản, người dùng cuối họ không làm như chúng tôi đã làm. Dự án bị chững lại, chúng tôi phải quay lại tìm hiểu cách mà người dùng cuối sẽ sử dụng product của chúng tôi để từ đó làm ra nguồn dữ liệu huấn luyện phù hợp nhất. Thật may, sự phát hiện là kịp thời.

## 2. Tham gia cuộc chơi như một người hiểu luật
Thực ra sai lầm này khiến nhiều PoCs thất bại, không thể tiến tới giai đoạn product vẫn là vấn đề liên quan tới dữ liệu. Quyền sở hữu dữ liệu thường bị đánh giá thấp trong các dự án AI. Nhiều lần, tôi nhận thấy rằng các công ty đang sử dụng dữ liệu khách hàng của họ khi chưa được phép hoặc dữ liệu thực sự thuộc sở hữu của các công ty khác mà không có quá trình xin phép, yêu cầu và cam kết giữa các bên khi sử dụng dữ liệu. Một khi họ đã có là họ sẽ dùng, bất kể dữ liệu đó được lấy từ đâu. Điều quan trọng cần nhớ là một công ty có quyền truy cập thông tin dữ liệu, không có nghĩa là công ty có thể sử dụng nó theo bất kỳ cách nào mà họ muốn. Hãy là một người chơi hiểu luật và đúng luật.

Các tập đoàn lớn đã bắt đầu kiểm soát lại việc những dữ liệu nào đã được đưa vào các mô hình học máy của họ. Không chỉ có General Data Protection Regulation ([GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation)) của châu Âu, các luật tương tự đã được mở rộng ở nhiều nơi khác, kể cả ở Việt Nam. Dữ liệu đang trở thành một trách nhiệm cũng như một tài sản của các tổ chức, công ty và cả của cá nhân.

Đây là một vấn đề mà tôi thấy còn chưa được quan tâm ở Việt Nam. Thực sự nó đã bị bỏ lơ với nhiều doanh nghiệp. Tôi biết nhiều doanh nghiệp, startup ở Việt Nam còn đang sống bằng việc phân tích dữ liệu tự crawl từ các mạng xã hội, thông tin cá nhân được mua bán qua lại giữa các bên cho quá trình phân tích rồi lại bán cho doanh nghiệp khác. Ngay trong tháng 7 này, tôi cũng có làm một bản PoC đơn giản và có cơ hội được trình bày nó với một anh "boss" từ Mỹ về để đánh giá sản phẩm. Ý tưởng ban đầu hình thành trong đầu tôi là sản phẩm này sẽ tổng hợp dữ liệu từ nhiều bên và nó sẽ là kênh trung gian phân phối nó đến với người dùng cuối bằng một trải nghiệm hoàn toàn khác. Để thực hiện bản PoC này, tôi buộc crawl dữ liệu từ các bên thứ 3, tổng hợp và phân tích. Việc crawl này khá đơn giản và tôi đã nghĩ khi lên product, luồng làm việc vẫn như vậy nhưng câu hỏi của anh kia đã làm tôi suy nghĩ.

> Bạn được cấp quyền vào cơ sở dữ liệu của các bên thứ 3 chứ?
> Bạn đang crawl trái phép, họ sẵn sàng kiện bạn khi bạn đủ lớn. Hãy nghĩ đến việc hợp tác, kết hợp với họ thay vì làm những điều trái phép.
> 

Vậy nên, nếu đã sẵn sàng tham gia cuộc chơi, hãy sẵn sàng tham gia như một người chơi hiểu luật.

## 3. Sự kỳ vọng
Trước khi bắt đầu một dự án AI mới, tôi thường hỏi các cấp quản lý trong công ty của mình kiên nhẫn đến mức nào với dự án này và họ trông chờ điều gì khi dự án kết thúc. Một PoC cho kết quả thành công nhưng không thể lên product vì một lý do kỹ thuật nào đấy, với tôi, đó vẫn là một PoC thất bại. Đừng bao giờ quá kỳ vọng vào kết quả của một PoC(nó có thể thành công hoặc thất bại) nhưng nên kỳ vọng vào tương lai của nó nếu thực sự muốn làm. Kết quả trên PoC có thể khá tốt, nhưng chưa chắc nó đã đủ khả năng để trở thành sản phẩm. Việc định hướng giải pháp ban đầu là cực kì quan trọng và ảnh hưởng rất nhiều tới tương lai của một PoC. Nếu đã quyết định tham gia vào cuộc chơi, hãy nghĩ xa hơn đến tương lai của nó, hãy vẽ lên một bức tranh và trả lời những câu hỏi:

1. Sau khi hoàn thành PoC, lộ trình tiếp theo là gì? Tập người dùng có đủ lớn để chúng ta đầu tư nghiên cứu?
2. Dự án này thực sự cần thiết? Người dùng thực sự thích thú với nó? Nó thực sự hiệu quả giúp giảm thiếu chi phí cho một vấn đề nào đó?
3. Sản phẩm này có thực sự tạo ra giá trị gia tăng cho công ty? Giá trị business của nó có đủ lớn hay đóng góp đủ lớn cho cộng đồng?
4. Nếu số lượng người dùng tăng lên gấp 100, 1000 thậm chí là 10.000 lần thì giải pháp hiện tại vẫn đáp ứng được yêu cầu của hệ thống chứ?
5. Etc.

Nhiều công ty cố gắng làm các sản phẩm PoC để khẳng định mình, xong khi PoC kết thúc lại rơi vào trạng thái vô định, không biết mình phải làm gì tiếp theo, không biết PoC này mang lại giá trị gia tăng gì cho công ty và chắc chắn, PoC đó sẽ mãi chỉ là PoC, nó sẽ chết yếu trong tương lai ngắn bất kể kết quả đạt được có tốt đến đâu. Trước khi làm một dự án PoC, hãy định hình một tương lai cho nó.

Khi tôi nghe những người có quyền ra quyết định tại công ty yêu cầu hoàn thành PoC hoạt động được với kết quả chấp nhận được trong hai tuần với một dự án tương đối phức tạp, tôi khá băn khoăn. Văn hóa của một công ty cần hỗ trợ việc thử nghiệm, đặt câu hỏi, học hỏi và thất bại trước khi bắt đầu thực sự làm một **AI Proof of Concept**. Chúng ta làm R&D, chắc chắn chúng ta phải có những thử nghiệm sai lầm, chắc chắn có những thất bại. Những thử nghiệm sai lầm là kinh nghiệm quý giá đưa ta đến những giải pháp tốt hơn. Tuy nhiên, việc phân tích kỹ lương ban đầu, việc không ngừng đặt câu hỏi, quan sát những sai lầm của người khác trước đó giúp ta giảm thiểu những sai lầm. Nếu thấy có dấu hiệu của một PoC không thành công, hãy giảm bớt sự kỳ vọng và đóng gói sự thất bại thật sớm, đừng để nó kéo dài.

Một vấn đề cũng liên quan đến sự kỳ vọng dẫn đến sự thất bại của các PoC là đến từ đội phát triển. Tư duy lối mòn, kỳ vọng quá cao vào các phương pháp cũ, workflow cũ, không chịu thay đổi dẫn đến tự thất bại của các PoC khi lên product. Bạn có thể dễ dàng đạt được 90% độ chính xác cho PoC sau 1 tuần làm việc, nhưng khi trong giai đoạn phát triển product, không có gì khẳng định bạn có thể cái tiến độ chính xác thêm 1% trong suốt 3 tháng tiếp theo.

> Thành công trong trí tuệ nhân tạo đòi hỏi phải có một cam kết thử nghiệm nhanh nhưng cũng cần có một định hướng chính xác và lâu dài.
> 

Nói chung, tôi khuyên bạn nên tập trung vào các trường hợp sử dụng kinh doanh được và dễ dàng chuyển đổi trong quy trình làm việc, các phương pháp thử nghiệm hiện có. Quá nhiều dự án AI không có kết quả kinh doanh có thể nhìn  thấy được.

Một dự án thành công cần có thời gian, nguồn lực và nhiều dữ liệu liên quan. Mong đợi sự chính xác ở cấp độ con người khi bắt đầu hoặc yêu cầu kết quả tức thời sẽ chỉ làm tăng khả năng thất bại của bạn. Team của bạn và các cấp quản lý của bạn cần hiểu và có thể có một kế hoạch điều chỉnh ngân sách và kỳ vọng hợp lý cho các dự án này. Nhìn chung, việc cung cấp các kế hoạch kinh doanh từ các sáng kiến trí tuệ nhân tạo thường mất nhiều thời gian hơn dự kiến.

## 4. Khả năng mở rộng
Hãy nhớ rằng, tính chất của một PoC và một Product là hoàn toàn khác nhau. Một điều cần quan tâm khi bạn muốn đưa PoC thành product chính là khả năng mở rộng của nó. Theo tôi, một AI product thông thường sẽ cần quan tâm đến 3  yếu tố:
1. Độ chính xác
2. Thời gian để tạo một inference.
3. Tài nguyên duy trì product

Tôi thường khuyên các công ty nên cân nhắc đến khả năng kiểm soát về công nghệ trước khi bắt đầu một AI PoC cụ thể. Bạn sẽ không thể chắc chắn được là một dự án AI sẽ dễ dàng đạt được độ chính xác 98%. Đừng bắt đầu nó với hy vọng mơ hồ rằng nó có thể sẽ được cải tiến hiệu suất một cách nhanh chóng. Nhưng các dự án PoC, người ta thường tập trung vào cải tiến độ chính xác và có những định hướng sẵn để cải thiện độ chính xác đó nên tôi không lo lắng việc này lắm. Cái tôi muốn tập trung vào là 2 ý sau: Thời gian để tạo một inference và tài nguyên để duy trì product đó. Điều mà ít được quan tâm nhất trong giai đoạn đầu của dự án.

Điều mà tôi muốn nói là khả năng mở rộng với dữ liệu lớn. Thật vậy, điều quan trọng là phải nhớ rằng AI của bạn có thể sẽ phải xử lý nhiều dữ liệu hơn trong giai đoạn product. Giải pháp sẽ tiếp tục hoạt động nếu khối dữ liệu hoặc số người dùng tăng theo thời gian? Bạn sẽ bắt người dùng đợi 1 khoảng thời gian bao lâu để có được kết quả phản hồi từ hệ thống của bạn. Bạn có một thuật toán tốt, độ chính xác lên tới 99% nhưng để thực hiện được một inference bạn cần khoảng thời gian là 1s. Ở giai đoạn làm PoC, mọi thứ bạn cảm thấy tươi đẹp. Nhưng khi lên product, số lượng người dùng quá lớn, lượng dữ liệu yêu cầu hệ thống của bạn phải xử lý tại một thời điểm quá lớn khiến mọi điều trở lên tồi tệ. Bạn xử lý tình huống này như thế nào?

Cuối cùng là tài nguyên duy trì product đấy. Ở giai đoạn hình thành PoC, tất cả mọi thứ bạn làm đều rất tuyệt vời nhưng trên 1 con Tesla T4 và bạn muốn để vận hành product, bạn yêu cầu một hệ thống phần cứng tương tự để đảm bảo chất lượng? Câu trả lời đa phần là không, tùy thuộc vào business value của bạn. AI được sinh ra để làm giảm bớt chi phí vận hành hệ thống, nếu tăng thì bạn đừng bao giờ nghĩ giải pháp của bạn được đưa vào áp dụng thực tiễn.

Hãy nhỡ rằng, trước khi nghĩ đến việc triển khai giải pháp, hãy nghĩ đến khả năng mở rộng của nó.

## 5. Kích thước và tính chất của PoC của bạn
Đó là chìa khóa để bắt đầu PoC của bạn với mục tiêu và tài nguyên được xác định rõ. Một dự án đầy tham vọng sẽ đòi hỏi nhiều nỗ lực kỹ thuật và một số thay đổi về tổ chức nhân sự. Tổ chức của bạn đã sẵn sàng cho một khoản đầu tư và thay đổi như vậy?

Sự thật là nếu doanh nghiệp của bạn không có bộ dữ liệu sạch thì tôi thực sự khuyên bạn nên bắt đầu với việc làm sạch và tổ chức lại dữ liệu một cách căn bản trước khi tiến hành khởi chạy AI PoC. Để thực hiện được một dự án AI PoC thành công, các tổ chức phải chọn các bộ dữ liệu rõ ràng và nhất quán, tập trung vào chất lượng và danh mục các loại dữ liệu cần thiết.

Một lý do khác là tại sao bạn nên có một PoC được xác định rõ là bạn cần giữ cho nó phù hợp với mục tiêu kinh doanh, mục tiêu doanh nghiệp của bạn. Thật vậy, rất dễ bị cám dỗ bởi các dự án nghe có vẻ hay và thú vị ở góc độ khoa học(dự đoán cảm xúc bằng ánh mắt chẳng hạn) nhưng không có tác dụng thực sự và quyết định đến doanh nghiệp của bạn. PoC của bạn có thể thất bại vì rất nhiều lý do(do thiếu dữ liệu, độ chính xác chưa cao,...) và đó là lý do tại sao bạn cần tập trung vào các dự án cụ thể với các giá trị gia tăng thực sự.

Nếu công ty của bạn không thể đặt tên cho vấn đề họ đang cố gắng giải quyết bằng AI, rất có thể họ sẽ thất bại.

Hãy tập trung vào phân tích, hiểu thật kĩ dự án PoC của bạn trước khi bắt đầu để có kế hoạch thực hiện nó một cách chính xác và cân đổi nguồn lực, tài nguyên một cách hợp lý. Hãy trả lời các câu hỏi:

1. Chúng ta cần những tài nguyên gì để thực hiện PoC này? (máy móc, dữ liệu,..)
2. Chúng ta cần bao nhiêu người trong khoảng thời gian bao lâu để thực hiện PoC này?
3. Những người thực hiện là ai? Có yêu cầu, kỹ năng gì đặc biệt đối với từng người không?(xử lý ảnh, xử lý ngôn ngữ, xử lý âm thanh,...)
4. Etc.

## 6. Quá trình thực hiện
Mặc dù các dự án PoC thường diễn ra trong khoảng thời gian khá ngắn nhưng việc kiểm soát, quản lý trong quá trình thực hiện cũng vẫn vô cùng quan trọng. Thời gian càng ngắn càng đòi hỏi việc phân chia nguồn lực sao cho hợp lý và tối ưu.

Trong một dự án AI, quá trình thực hiện có thể bị ảnh hưởng bởi các mô hình của bạn. Có thể bạn đề xuất một mô hình và nghĩ nó tốt nhưng thực tế lại không như bạn nghĩ, bạn phải nhanh chóng chuyển hướng ngay lập tức. Những mô hình này vẫn phải đảm bảo tương lai khả thi được sử dụng trong product thực tế.

Hay giữ mô hình của bạn luôn đơn giản và có thể thay đổi, chuyển hướng một cách nhanh chóng.

## 7. AI Accuracy / Available Data
Mục đích của một dự án AI là đạt đến độ chính xác rất cao. Tuy nhiên, mức độ chính xác nào là đủ cho công ty của bạn. Trong dự án mới nhất của tôi, chúng tôi đã đạt độ chính xác 95%, thật may nó là đủ cho tác vụ mà tôi đang giải quyết. Ở những dự án khác, có thể con số 98% cũng có thể là không đủ. Các công ty phải đánh giá mức độ tin cậy trong hệ thống AI của mình so với rủi ro và chi phí phải bỏ ra cho mỗi lần hệ thống dự đoán sai. Chi phí phải bỏ ra khi hệ thống đưa ra một dự đoán sai là quá nhiều cho công ty mặc dù những nỗ lực của đội phát triển đã là tốt nhất có thể thì hệ thống đó cũng không được triển khai vào thực tế.

Theo tôi, điều quan trọng là phải làm rõ ngay từ đầu rằng việc đạt được độ chính xác 100% là không thể vì không chỉ lý do kỹ thuật mà còn vì trong quá trình huấn luyện hệ thống của mình, chúng tôi đang cố hết sức với những dữ liệu có sẵn và thực tế có thể có những dữ liệu hệ thống ít gặp hoặc chưa gặp bao giờ.

Một vấn đề liên quan là việc **overfitting**. Nghe có vẻ ấn tượng khi có một mô hình chính xác 99%, nhưng nếu nó hoạt động không tốt trong các điều kiện khác, ngữ cảnh khác thì bạn cũng có thể sử dụng tốt hơn với một mô hình chính xác và đơn giản hơn 70%.

Tôi nhận thấy rằng trong hầu hết các dự án của tôi, lượng dữ liệu tiếp tục tăng trong quá trình phát triển và đây là một điều cần xem xét khi bắt đầu. Ý tôi là, đừng quên rằng giải pháp của chúng ta sẽ phải xử lý nhiều dữ liệu hơn trong khi vấn giữ được độ chính xác rất cao.
Thực tế, nhiều team, nhiều công ty không cố gắng nhìn nhận sự hạn chế trong mô hình của mình để cố gắng tìm cách giải quyết nó; thậm chí còn chưa có bước đánh giá một cách chính xác và khách quan độ chính xác của PoC của mình. Đây chính là nguyên nhân dẫn đến sự thất bại của những dự án đó và có thể các dự án đó mãi sẽ không được triển khai vào thực tế.
## 8. PoC Evaluation
Vòng đời của một dự án AI thực sự là không bao giờ kết thúc. Thật vậy, trong các dự án PoC, luôn có thể cải thiện dự đoán(độ chính xác) của mô hình. Tuy nhiên, trong bối cảnh PoC, công ty hy vọng bạn sẽ cung cấp phiên bản đầu tiên của giải pháp tại một thời điểm xác định. Các công ty có xu hướng quên rằng điều này đòi hỏi nguồn nhân lực và tài nguyên máy tính với chi phí như phát triển một product thực sự. Tôi thực sự khuyên bạn nên xác định rõ các nguyên tắc để cả hai bên đều biết các tiêu chí thành công liên quan đến PoC.(Độ chính xác của một mô hình AI là gì). Công ty yêu cầu bạn thực hiện một PoC trong vòng 2 tuần với độ chính xác chấp nhận được. Vậy chấp nhận được là bao nhiêu phần trăm, đánh giá như thế nào bạn cần phải định nghĩa rõ ngay từ đầu. Nếu không định nghĩa ngay từ đầu, có thể bạn sẽ rơi vào tình trạng PoC kéo dài không có hồi kết.

Trong thực tế, nếu bạn không có đủ thời gian để khám phá, thí nghiệm một vài mô hình khác nhau, bạn có thể bỏ lỡ mô hình phù hợp nhất với tập dữ liệu cụ thể của mình. Đồng thời, bạn không thể cố gắng cải thiện mô hình thêm một phần trăm.

## 9. Time Window
Trong các dự án AI, sự hiểu biết của chúng ta về thế giới đến từ dữ liệu, sự hiểu biết của máy tính về thế giới cũng đến từ dữ liệu. Tuy nhiên, trong một số dự án, chúng ta có xu hướng quên đi chi tiết quan trọng này. Thách thức thực sự là tính toán tốc độ thay đổi của thế giới.

Trong một dự án trước đây của tôi về sự đoán sự biến động trong thế giới tài chính, mô hình đã được huấn luyện qua dữ liệu từ một cửa sổ thời gian nhỏ trước đó(từ năm 2008-2015) và do đó, nó không biết cách xử lý các sự kiện xảy ra không thường xuyên đặc biệt là thế giới tài chíng luôn đầy dẫy những biến động không thể kiểm soát.

Quyết định chiến lược về việc chọn cửa sổ thời gian thích hợp để nắm bắt mức độ thay đổi phù hợp cho doanh nghiệp của bạn. Dữ liệu được nhóm nghiên cứu học máy và những người đang sử dụng kết quả đầu ra của mô hình phân tích, chọn lựa dựa trên một số phân tích thăm dò. Bạn không thể sử dụng một mô hình được huấn luyện trên các bài báo của năm 2018 để dự đoán tình hình xăng dầu dựa trên dữ liệu báo chí của năm 2019. Mọi thứ đã quá thay đổi rồi.

Câu hỏi đặt ra là, mô hình của bạn hiện giờ đã tốt nhưng bạn có đảm bảo tương lai nó cũng sẽ chất lượng như vậy? Nếu có sự thay đổi từ các yếu tố bên ngoài, bạn, team bạn cần làm gì để cập nhật lại mô hình cho phù hợp.

> Đừng đợi đến khi kết thúc dự án AI mới suy nghĩ về time window mà mô hình của bạn nên xem xét.
> 

# Tóm lại: Làm thế nào để có một PoC thành công
Một AI PoC có thể thất bại vì nhiều lý do, tôi hy vọng qua bài viết này, bạn đã hiểu rõ hơn về cách làm cho dự án AI của bạn thành công thông qua những sai lầm của các dự án PoC thất bại thường mắc phải. Cuối cùng, làm thế nào để có một PoC thành công, sự chuyển tiếp từ PoC project lên Product project cần những yếu tố gì thì chúng ta sẽ thảo luận khi khác. Bài này dài lắm rồi.

# Tham khảo
Bài viết này được viết dựa trên bài viết [9 Lessons learned from failed AI PoCs](https://medium.com/predict/lessons-learned-from-failed-ai-pocs-d888fe7ffbe) nhưng thay vì dịch lại hoàn toàn, mình viết lại cả bằng góc nhìn và quan điểm cá nhân.

Cảm ơn mọi người vì đã đọc bài. Có gì sai sót xin hãy để lại comment bên dưới một cách lịch sự, chúng ta cùng trao đổi.