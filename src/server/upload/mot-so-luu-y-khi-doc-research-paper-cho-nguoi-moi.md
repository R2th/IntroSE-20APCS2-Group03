### 1. Tổng Quan:

Việc đọc reasearch paper ( từ sau mình sẽ dùng là paper cho ngắn ) rất quan trọng nếu bạn muốn hiểu sâu về một phương pháp hoặc một thuật toán nào đó trong Machine Learning hay Deep Learning. Đây là một công việc nghe như đơn giản những thật sự lại không đơn giản một chút nào hết. Một số người khi mới làm quen với 2 lĩnh vực này, chưa có kinh nghiệm chọn lựa paper để đọc hoặc cách đọc paper thiếu hiệu quả gây lãng phí thời gian cũng như công sức. Trong bài viết này, mình sẽ chỉ ra một số sai lầm của người mới, cũng như đưa ra một số kỹ thuật cơ bản giúp tăng khả năng tiếp thu các tri thức và tiết kiệm thời gian khi đọc một paper. Để dễ hiểu hơn, chúng ta sẽ lần lượt trả lời các câu hỏi sau: 

   - **Cấu trúc chung của một paper ?**
   - **Chọn những paper như thế nào để đọc ?**
   - **Đọc như thế nào cho hiệu quả ?**

### 2. Cấu trúc chung của một paper:

Mỗi tổ chức hay cá nhân khi công bố một paper đều có những cách thức riêng của mình để trình bày paper đó, tuy nhiên hầu hết các paper đều tuân theo một format chung dưới đây.

- **Title (*)** : là phần tiêu đề của paper, là mục thường đề cập đến tên các phương pháp hay mô hình và các tác giả của paper đó.
- **Abstract (*)** : là phần tóm lược nội dung của paper. Các phương pháp, vấn đề chính và kết quả của paper đều sẽ được khái quát trong phần này.
- **Introduction (*)** : là phần nêu các vấn đề có trong paper, có thể là những thiếu sót còn tồn tại ở những mô hình hay phương pháp trước đó và đề cập khái quát đến phương pháp, và cách giải quyết có trong paper này.
- **Related Work**: Là phần đề cập đến các nghiên cứu có liên quan đến topic mà paper đang hướng tới.
- **Model / Method / Approach (*)**:  là phần nội dung chính của paper, các nghiên cứu có trong paper sẽ được mô tả chi tiết trong mục này.
- **Results** : là phần đưa ra kết quả của những nghiên cứu có trong paper, thường là được so sánh với kết quả những mô hình hay phương pháp đã có trước đó.
- **Conclusion (*)** :  Là phần tổng kết lại nội dung chính có trong paper.
- **References** :  Là phần trích dẫn của paper.

Trong đó những mục mình đánh dấu (*)  là những mục quan trọng liên quan tới nội dung chính của paper mà các bạn cần phải hết sức lưu ý tới. Ngoài ra trong một paper có thể có thêm các phần khác nữa như **Discussion** hay **Appendix** bạn có thể xem qua các phần này sau.

### 3. Chọn những paper như thế nào để đọc:

Mỗi một topic có trong Machine Learning hay Deep Learning đều có một số lượng paper rất lớn và số lượng này tăng một cách nhanh chóng mỗi năm cho nên việc đọc hết các paper trong một topic được coi là bất khả thi !?

![](https://images.viblo.asia/4a2b2bef-62bf-4258-99dc-97fc26441349.png )
<p align="center">
        Figure1. Số lượng paper được submit tại một số hội nghị nổi tiếng những năm gần đây.
</p>

Không những thế, đọc paper một cách vô tội vạ có thể khiến chúng ta bị loãng kiến thức, xa rời đi khỏi topic mà chúng ta đang nghiên cứu và tệ hơn còn có những paper thâm chí không đem lại cho ta tri thức mà ngược lại khi đọc nó còn khiến chúng ta hiểu sai bản chất, lệch lạc trong lối suy nghĩ. Điều này đặc biệt thường xuyên xảy ra với những người mới học Machine Learning hay Deep Learning, họ sẵn sàng bỏ cả ngày trời để đọc một paper mà họ vớ được trên mạng internet mà thậm chí không cần biết nó có thật sự hữu ích cho họ không. Việc này khiến công sức và thời gian bị lãng phí rất nhiều. Từ đây chúng ta có thể rút ra được sai lầm đầu tiên. **Thiếu kinh nghiệm hoặc không biết trích lọc các paper để đọc**

Có thể nhiều bạn sẽ tự hỏi là làm cách nào để chọn ra các paper có nội dung tốt, đáng đọc và bỏ qua các paper có nội dung chưa tốt và không nên đọc phải không nào. Để trả lời câu hỏi này, trước tiên chúng ta cần phải nhận biết được các loại paper đã.

Thường thì các paper trong một topic nào đó sẽ được phân loại thành 3 nhóm sau đây:

- **The groundbreaking papers** : đây được coi như là những "Top paper" và thường là những paper đầu tiên đề cập đến những nghiên cứu có ứng dụng rộng rãi, hoặc những ý tưởng rất thú vị. Những paper này thường được công bố bởi những kỹ sư đến từ những tổ chức hay trường đại học có danh tiếng (eg. Google, Facebook hay đại học Stanford, ...) hoặc từ những nhóm hay một số trường đại học đã tham gia nghiên cứu về vấn đề này trong nhiều năm. Những paper này có thể có chỉ số trích dẫn (cited) rất cao.
-  **The copycat papers** : một số nhóm theo dõi và sử dụng những nghiên cứu từ các groundbreaking papers và thêm vào một số cải tiến lên đó, công bố một kết quả vượt qua được nghiên cứu ban đầu. Tuy nhiên có nhiều paper trong số này thiếu số liệu phân tích thống kê thích hợp và kết luận sai các cái tiến đã thực sự đánh bại được nghiên cứu ban đầu. Những gì mà paper của họ mang lại thậm chí có thể không nhiều hơn các cải tiến bổ sung phức tạp. Tuy nhiên không phải mọi copycat paper đều tệ, có một số rất tốt, nhưng con số này rất hiếm.
-  **The garbage papers** : Đây là những paper được viết rất cẩu thả, nội dung chả đâu vào đâu, thường thì những paper này được viết bởi những người thiếu kinh nghiệm. hoặc chưa đầu tư đủ thời gian, công sức vào việc nghiên cứu. 

Nói đến đây chắc các bạn cũng đoán được rằng chúng ta nên chọn những paper nào để đọc rồi đúng không. Trước hết bạn hãy cố gắng tìm đọc các **groundbreaking papers**,  bạn có thể search google xem một paper có phải là  **groundbreaking papers** hay không thông qua việc xem thông tin về tác giả, nếu tác giả là kỹ sư đến từ những công ty công nghệ hoặc các trường đại học hàng đầu thế giới như Google, Facebook, Microsoft hay Standford, ... hoặc đã từng là tác giả của một top paper khác, thì có khả năng đó là một top paper. 

![](https://images.viblo.asia/2b1011c8-32f1-482a-932e-cf4c1fc108a1.png)
<p align="center">
     Figure 2: Resnet - một trong những top paper nổi tiếng của Deep Learning.
</p>

Hoặc kiểm tra số lượng trích dẫn, nếu paper đó có số lượng trích dẫn lớn, thì nhiều khả năng nó cũng là một top paper (đương nhiên con số trích dẫn cũng chỉ mang tính tương đối, vì các top paper được công bố nhiều năm trước có thể sẽ có số lượng trích dẫn chênh lệch rất nhiều so với một top paper được công bố trong những năm gần đây) hoặc nếu đã có kinh nghiệm đọc thì tốt hơn hết là bạn có thể vào và đọc lướt qua nội dung của paper đó rồi đánh giá cũng được.

![](https://images.viblo.asia/25f6e924-38d7-4668-84c7-b782e542fb32.png)

<p align="center">
     Figure 3: Số lượng trích dẫn "khủng khiếp" của Resnet.
</p>

Trong nhiều trường hợp, nếu bạn không thể tìm được một top paper trong topic bạn đang tìm hiểu, thì vẫn sẽ là ổn nếu bạn bắt đầu từ một copycat paper, sau khi đọc một lượt hay cố gắng kiểm tra các trích dẫn có trong paper, có khả năng sẽ có top paper được trích dẫn trong copycat paper bạn đang đọc đó.

Nếu bạn là một newbie vừa mới "chân ướt chân ráo" bước vào một topic cụ thể nào đó, đang cần một cái nhìn tổng quan nhất về các nghiên cứu hay phương pháp đã có trong topic này thì mình gợi ý việc đọc loại paper thứ 4 đó chính là **survey paper**. Survey paper là loại paper tổng hợp một cách khái quát các kiến thức, nghiên cứu có trong một lĩnh vực nào đó, thường thì các paper này không đi sâu vào chi tiết các phương pháp mà chỉ liệt kê đánh giá các nghiên cứu đã có trước đó. Và nhiều khả năng trong các survey paper sẽ trích dẫn đến các top paper có trong topic bạn đang tìm hiểu, hãy chú ý nhé.

*Tham khảo thêm ở đây* :
- https://github.com/floodsung/Deep-Learning-Papers-Reading-Roadmap
- https://github.com/terryum/awesome-deep-learning-papers

### 4. Đọc như thế nào cho hiệu quả:

Một sai lầm nữa của những người mới học Machine Learning hay Deep Learning khi đọc một paper đó là họ **đọc từ đầu tới cuối và không bỏ sót gì cả**.  Đối với những paper ngắn từ 8 tới 10 trang thì mình không phản đối cách đọc này, tuy nhiên với những paper dài tới 20 hoặc 30 trang thì đây lại là một câu truyện hoàn toàn khác. Cố gắng đọc hết mọi thứ trong nhiều trường hợp điều này không phải là tốt, ngược lại nó còn có thể khiến bạn quên đi các phần kiến thức quan trọng có trong paper và gây lãng phí thời gian. Để khắc phục được vấn đề này, hãy cố gắng học cách trích lọc ra các thông tin cần thiết và loại bỏ những thứ không cần thiết đi.

![](https://images.viblo.asia/528cbe72-4ebd-426c-961c-9310a2f83bec.png)

<p align="center">
     Figure 4: Original paper của LSTM dài tới 32 trang.
</p>


Như đã nêu ở trên, các mục như **Title, Abstract, Introduction, Method/ Model** và **Conclusion** là những phần liên quan trực tiếp tới nội dung chính của paper. Đây là những phần quan trọng bạn không được phép bỏ qua và phải đọc cho thật kỹ. Những phần như **Related Works** hay **Result** bạn có thể bỏ qua được, tuy nhiên nếu bạn mới nghiên cứu về topic của paper thì tốt nhất nên check cả những phương pháp hay nghiên cứu được đề cập tới trong phần **Related Works** nữa, như vậy sẽ giúp bạn có cái nhìn tổng quan hơn về kiến thức có liên quan tới paper này còn nếu bạn đã biết những thứ trong phần này rồi thì có thể bỏ qua cũng được, hoặc khi bạn muốn implement lại thuật toán của paper này thì phần **Result** chính là thứ bạn dùng để so sánh kết quả, và nhiều khi tác giả cũng sẽ để các Hyper Parameters của mô hình nằm trong phần này đó. 

Tuy vào mỗi trường hợp, bạn hãy cố gắng quyết định phần nào được giữ lại và phần nào bị bỏ đi nhé. Và hãy cố gắng bỏ qua những phần mang tính ứng dụng và không liên quan gì nhiều tới nội dung chính của paper. Ví dụ như bạn đang đọc một đoạn :"Deep convolutional neural networks have led to a series of breakthroughs for image classification .. " thì phần này chủ yếu nói về hiệu quả của Deep Neural Network với Image Classification bạn có thể skip qua câu khác luôn cũng được, cứ như vậy ta cũng có thể tiết kiệm được kha khá thời gian, cũng như bỏ qua những phần thông tin không mang nhiều ý nghĩa.

Và cuối cùng, mình xin chia sẻ với các bạn một phương pháp đọc paper mà mình vẫn thường dùng có tên là **3 lần đọc**. Đúng với tên gọi của nó, chúng ta sẽ đọc paper trong 3 lần, mỗi lần chúng ta sẽ đọc theo một cách khác nhau và hi vọng sau lần đọc thứ 3, chúng ta có thể nắm được phần lớn các tri thức có trong paper.

#### Lần 1: Đọc Lướt

Lần đọc đâu tiên sẽ giúp cho bạn có cái nhìn tổng quan về các tri thức cũng như ý tưởng chính có trong paper. Trong lần đọc đầu tiên này, bạn hãy thực hiện các bước sau:

- Đọc thật cẩn thận phần **Title**, **Abstract** và **Introduction** của paper.
- Xem qua tất cả các hình ảnh trong paper nếu có.
- Đọc tất cả các đề mục có trong phần **Model/ Method** và bỏ qua phần nội dung chi tiết.
- Đọc cần thận phần **Conclusion**.
- Lướt qua phần **References** xem có paper nào bạn từng đọc qua rồi được trích dẫn không.
- Bỏ qua các phần chứa công thức toán.

Sau lần đọc đầu tiên này, các bạn hãy cố gắng trả lời những câu hỏi sau đây:

- Đây là loại paper gì? ( **groundbreaking** hay **copycat** )
- Vấn đề được tác giả đưa ra trong paper là gì ?
- Phương pháp, mô hình mà tác giả dùng để giải quyết vấn đề đó ?
- Hiệu quả của các phương pháp,mô hình đó ra làm sao ?

Dựa trên việc trả lời những câu hỏi trên, bạn sẽ có được cái nhìn tổng quan về các nội dung chính có trong paper, dựa vào đó bạn có thể quyết định là nên đọc tiếp paper này hay là bỏ qua nó và chuyển qua một paper khác. Lần đọc đầu tiên diễn ra rất nhanh, các bạn có thể hoàn thành phần này chỉ trong khoảng 10 tới 15 phút.

#### Lần 2: Đọc + Ghi Chép

Ở lần đọc, thứ 2 chúng ta sẽ củng cố lại kiến thức tổng quát thu được ở lần đọc đầu tiên đồng thời bắt đầu tiến vào chi tiết các giải pháp, mô hình được nêu trong paper. Để tránh việc đọc trước quên sau, các bạn nên có một quyển vở để ghi chép lại những nội dung chính của mỗi phần trên.

Trong lần thứ 2, các bạn hãy thực hiện các bước sau:

- Đọc + ghi chép lại những ý chính có trong phần **Title**, **Abstract** và **Introduction**.
- Đọc + ghi chép  lại các ý chính có trong phần **Model/ Method**. Chép lại minh họa của các mô hình hay phương pháp nếu cần thiết.
- Chép lại các công thức toán có trong paper nếu có.
- Check cẩn thận phần **References**, đánh dấu những paper có liên quan tới kiến thức chính.
- Đọc + ghi chép các ý chính của phần **Conclusion**.

Sau lần đọc thứ 2 này, chúng ta sẽ dừng ở mức "biết" một cách tương đối các phương pháp, mô hình được nêu trong paper. Nếu bạn nghĩ mình đã đủ kiến thức và mong muốn hiểu sâu các phương pháp đó, hãy tiến vào lần đọc thứ 3, nếu không hãy tạm dừng nó lại và chuyển qua đọc một paper khác mà bạn đã đánh dấu là có liên quan tới kiến thức chính trong paper này mà bạn chưa hiểu được.  Lần đọc thứ 2 thường diễn ra khoảng từ 1 tới 2 tiếng.


#### Lần 3: Đọc Hiểu

Ở lần đọc thứ 3 này, chúng ta sẽ tiến hành đọc lại paper kết hợp cùng với các ghi chép mà chúng ta đã thực hiện ở lần đọc thứ 2. Hãy đọc cẩn thận các công thức toán hoặc chứng minh lại cần thiết, hiểu rõ những hình minh họa có trong paper.  Với mục tiêu là  chúng ta sẽ phải hiểu và trả lời được một số câu hỏi chi tiết hơn ví dụ như sau đây.
- Các công thức toán được hiểu như thế nào ?
- Ground Truth của mô hình được xây dựng như thế nào ?
- Data Flow khi đưa dữ liệu qua mô hình ?
- Hàm lỗi mà mô hình sử dụng ?
- Mô hình có kiến trúc như thế nào ?
- Metric dùng để đánh giá ?
- .....

Sau lần thứ 3 này, bạn sẽ có thể thật sự nắm được các kiến thức và phương pháp có trong paper. Đây cũng là phần tốn thời gian nhất, tuy vào lượng và  kiến thúc và mức độ tiếp thu của mỗi người mà phần này có thể diễn ra trong một vài ngày, hoặc dài hơn là một tuần.

Với quan điểm của mình, hãy thực hiện 2 lần đọc trong trường hợp chỉ muốn biết được mô hình cũng như phương pháp có trong paper, và thực hiện 3 lần đọc trong trường hợp bạn muốn hiểu sâu hoặc implement lại paper này. Và hãy nhớ rằng, bạn không cần thiết phải nhớ tất cả các chi tiết cụ thể có trong paper, vì bạn có thể xem lại nó mỗi khi nào bạn cần, quan trọng là bạn biết mình cần xem cái gì trong paper đó.

Trên đây là những kinh nghiệm mà mình đúc kết được trong quá trình đọc một paper, cũng như tham khảo được ở trên mạng. Cảm ơn các bạn đã theo dõi.

### 5. Tham khảo

- http://codecapsule.com/2012/01/18/how-to-implement-a-paper/
- https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf
- https://towardsdatascience.com/guide-to-reading-academic-research-papers-c69c21619de6
- https://www.youtube.com/watch?v=733m6qBH-jI