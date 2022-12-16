# Đặt vấn đề 
Trên thực tế trong các bài báo bạn đọc hàng ngày hoặc là những báo cáo về doanh số của một công ty chúng ta đều có những bảng biểu hay những hình ảnh, biểu đồ, ... để miêu tả về số liệu. Những cái đó đều được gọi tắt bằng 1 từ " Data Visualization", như vậy bạn đã thấy được Visualization cực kỳ quan trọng đúng không? Vậy việc trực quan hóa dữ liệu như thế nào để những người khác nhìn vào có thể hiểu được những con số vô tri vô giác kia đang muốn nói gì với chúng ta. Bên cạnh đó cũng góp phần tận dụng tối đa những gì mà công ty mình đang có hay đơn giản hơn là tận dụng được dữ liệu tốt nhất để model cuả mình trainning hiệu quả hơn. Bởi vì khi chúng ta thực sự hiểu sâu sắc về dữ liệu mà mình đang có thì chúng ta đã gần như thành công được một nửa rồi =))).

# Một graphic tốt tạo nên một câu chuyện thú vị với data
Khi tạo nên một graphic, điều quan trọng nhất là phải hiều biểu đồ đó dùng để làm gì . Thực chất, chúng ta sẽ không tạo nên một biểu đồ mà mô tả hoàn hảo về toàn bộ dữ liệu của mình có. Bởi vì tập dữ liệu của chúng ta thường quá lớn (kích cỡ lớn, nhiều yếu tố), để mô tả mọi điểm dữ liệu trên một single graph. Thay vào đó, nhà phân tích thường chọn những yếu tố để đưa vào một hình ảnh trực quan để xác định các pattern và xu hướng trong tập dữ liệu một cách có hiệu quả nhất. Việc suy nghĩ tại sao và như thế nào graphics được tạo ra sẽ giúp chúng ta một chút để đưa ra những quyết định đó. 

Thực chất data chỉ là tập hợp những con số được thu thập, nó chỉ có ý nghĩa khi chúng ta sử dụng đồ thị hay biểu đồ để mô tả hay còn được gọi là trực quan hóa theo cách của mỗi người để đưa ra kết luận về một giả thuyết hoặc có thể đưa ra được xu hướng trong tương lai để tạo nên các quyết định. Vì vậy việc thực hiện visualization data rất quan trọng bởi nó giúp các công ty, doanh nghiệp đưa ra được những quyết định quan trọng. 

# Tại sao chúng ta kể một câu chuyện?
Theo dạng câu hỏi "why" câu trả lời thường được trả lời theo 2 loại: 
- để xác định patterns trong tập dữ liệu, hoặc
- để giải thích những pattern này cho người khác
Đây là những lí do đằng sau việc tạo ra: **exploratory và explanatory graphics**. Exploratory graphics thường là những hình ảnh rất đơn giản về dữ liệu chúng ta có, được xây dựng để xác định patterns trong tập data mà có thể chúng ta chưa biết đến sự tồn tại của nó. Ví dụ về đồ họa đơn giản, biểu diễn hàm tuổi của cây dựa vào chu vi: 
![](https://images.viblo.asia/e241927b-0c16-4fea-8cd4-464fda48e430.png)

Hình ảnh biểu diễn ở trên không có gì là quá phức tạp: 2 biến ( circumference và age) và 35 điểm biểu diễn trên graph. Ở đây cho chúng ta thấy tại sao sự phát triển của cây thay đổi theo tuổi tác. Tuy nhiên nó cũng đã cho chúng ta thấy một xu hướng đang tồn tại ở trong data ( 2 biến có cùng xu hướng). Trong khi đó explanatory graphs là tất cả về các whys. Khi một exploratory graphic tập trung vào xác định patterns ở vị trí đầu tiên, một exploratory graphic nhằm giải thích tại sao chúng xảy ra và chúng ta sẽ sử dụng những xu hướng mình tìm được vào việc gì. Exploratory graphic để cung cấp dẫn chứng về sự tồn tại của patterns và cung cấp một lời kêu gọi hành động. Ví dụ như, chúng ta có thể mô phỏng lại đồ thị bên trên theo hình dưới đây để giải thích rõ ràng hơn cho xu hướng đó: 

![](https://images.viblo.asia/c5034394-12be-425d-995e-168b4a3b35fe.png)

Ở đây muốn đặc biệt đứa tiêu đề: "Orange tree growth tapers by year 4" , như ở phần trên chúng ta đã nhắc tới "A good graphic tells a story". Cũng như, bất kỳ mỗi một tiêu đề bạn đưa ra để mô tả về biểu đồ hay hình vẽ. Vì vậy hãy sử dụng tiêu để của bạn để chuyển bất kỳ thông điệp nào mà bạn mong muốn vào đồ thị bất cứ khi nào nó có ý nghĩa hoặc nếu không thì nên xóa hoàn toàn. 

Điểm quan trọng ở đây không phải là explanatory graphics nổi trội hơn exploratory graphics, hay exploratory graphics chỉ dành cho nhà phân tích. Ví dụ exploratory graphics thường được sử dụng cho báo cáo định kỳ để xác định xu hướng mà thị trường hiện có, hy vọng sẽ thúc đẩy phân tích mạnh mẽ hơn để xác định các whys. Thay vào đó, thông điệp là việc biết mục đích cuối cùng mà đồ thị muốn biểu diễn - liệu nó có thể giúp xác định các patterns trong vị trí đầu tiên hoặc giải thích cách cùng đến đó - có thể giúp bạn quyết định đưa ra những yếu tố nào cần được được đưa vào để kể một câu chuyện mà graphic của bạn được thiết kế để giải quyết.


##  Làm thế nào để chúng ta kể một câu chuyện?
Một sự xem xét khác quan trọng hơn khi nghĩ về thiết kế graph là thực tế cách bạn để câu chuyện của mình, bao gồm những nhân tố mà bạn sẽ sử dụng và data bạn biểu diễn. Mục đích để người đọc hoặc người xem có thể hiểu rõ hơn về dữ liệu mà bạn đang có. 
# Các kiểu data và biểu đồ thường dùng tương ứng
## Textual data
Khi dữ liệu ở dạng này, nó thường rất tốt để tìm thấy một từ đã sử dụng hoặc ý nghĩa của đoạn văn là gì. Một cách phù hợp để trực quan hóa dữ liệu dạng này là WorldCloud. WorldCloud mang những từ thường xuyên xuất hiện đặt ở trung tâm và mở rộng chúng, giúp chúng ta hiểu rõ hơn về ý tưởng được miêu tả trong đoạn văn bản. 

![](https://images.viblo.asia/e91a8116-8bab-4691-9860-f6ea525eec27.png)
Hình: WorldCloud

Ví dụ trên được lấy từ tập dataset của twitter. Hình ảnh này cho chúng ta thấy tình yêu là thuật ngữ tích cực thường xuyên nhất được sử dụng trong các tweet. 
## Mixed data
Khi data của chúng ta bao gồm số hoặc bất kỳ kiểu nào khác, chúng ta cần biết những kiểu nào quan trọng và có khả năng cung cấp được nhiều thông tin nhất từ tập data.
Ở đây sẽ sử dụng tập Titanic để ví dụ: 

![](https://images.viblo.asia/7a5ecce3-27a8-4e2a-8c07-9fe1d0b1936f.png)

![](https://images.viblo.asia/8bae3b9b-1ba3-4ae3-812b-996c03a247bb.png)

Theo như biểu đồ ở trên, chúng ta có thể thấy Phụ nữ và hành khách có vé hạng nhất có xu hướng có cơ hội sống sót cao hơn đàn ông những người thuộc thành viên của phi hành đoàn hoặc những thành viên có vé hạng thấp hơn. 
Có phải là những gì đã thực sự xảy ra ở trên tàu Titanic? 

Có một cách khác để visualize dạng dữ liệu này là bằng cách thử vẽ một đồ thị đa biến. Tập dữ liệu được sử dụng cho phác họa và tập dữ liệu hiệu suất và thông số kỹ thuật xe ô tô được biểu diễn ở hai hình bên dưới:

![](https://images.viblo.asia/4d157929-5a84-4d3f-b540-5887746df9f5.png)

![](https://images.viblo.asia/ad8e9497-47fb-438b-998c-da310bd251f6.png)

Dựa vào 2 hình vẽ trên chúng ta có thể thấy những chiếc xe có trọng lượng nặng hơn quá trình chế tạo sẽ chậm hơn những chiếc xe có thân nhẹ hơn. 
## Numeric data
Khi gặp loại dữ liệu này, chúng ta thường nên tìm kiếm các xu hướng hoặc các đường mô tả những con số này. Hình cảnh phù hợp nhất với dạng dữ liệu số này là biểu đồ line hoặc step như hình dưới đây: 
![](https://images.viblo.asia/dca7678d-d8ee-4d11-b527-a599822646cf.png)

Biểu đồ trên cho chúng ta thấy sự tăng giá tại một điểm thu hút địa phương cho người lớn và trẻ em. Bên cạnh đó còn biểu diễn sự tăng trưởng cũng như thay đổi qua từng năm.
## Stocks
Dạng dữ liệu chứng khoán hay cổ phiếu hiện giờ có một lượng lớn người quan tâm. Dạng dữ liệu thị trường chứng khoán, cổ phiếu thường dưới dạng time series của các giá trị số, nếu là một nhà đầu tư thì phải theo dõi sự biến động theo từng giờ từng ngày của dạng data này. Thường sẽ sử dụng biểu đồ Canlestick để biểu diễn một cách trực quan nhất: 
![](https://images.viblo.asia/44c410a7-ff05-4314-af34-284a3bccbee1.gif)

Ở đây lấy ví dụ về cổ phiếu Tesla. Các biểu đồ nến có thể được sử dụng để điều động qua từng ngày và xem theo từng mức thấp và cao của cổ phiếu. Điều này giúp chúng ta đưa ra được quyết định đầu tư tốt hơn dựa trên xu hướng hiện tại hoặc quá khứ. 
Như hình trên cho chúng ta thấy, tháng 2 năm 2016 có một sự giảm đối với cổ phiếu Tesla này. Bây giờ chúng ta có thể sử dụng thông tin này để hiểu các điều kiện thị trường và tình hình kinh tế đưa ra quyết định vể cổ phiếu của họ. 

## Geographic data
Khi chúng ta có dữ liệu liên quan đến các vị trí và khu vực cụ thể, chúng ta nên sử dụng bản đồ để thêm sự rõ ràng và ý nghĩa cho các phân tích. 

![](https://images.viblo.asia/2f11f461-ddf1-40aa-930e-e095c5fc5b26.png)

Trong ví dụ trên, chúng ta có thể thấy các quốc gia đã tham gia và kết quả của World Cup 2002 như thế nào. Đức có số bàn thắng nhiều nhất và trở thành một trong những đội nổi bật nhất trong mùa giải này. 
# Kết Luận

Ban đầu khi bắt đầu học AI mình cứ luôn nghĩ việc khó khăn nhất là tạo model để train. Tuy nhiên sau cuộc thi Recsys 2018 mình đã suy nghĩ khác, việc hiểu dữ liệu mình đang có và tận dụng được những gì mình có một cách tối đa và hiệu quả nhất mới là quan trọng. Khi Visualize data chúng ta có thể tìm được ra những nhân tố  nào quan trọng và nhân tố nào không cần thiết. Việc Visualize data cũng giúp chúng ta hiểu rõ hơn về data mình đang có và phải xử lý data như thế nào sao cho phù hợp với yêu cầu đầu vào để đạt được kết quả tốt nhất. 
Ở bài viết này, phải nói đúng hơn là bài dịch này. Mình đã kết hợp 2 bài về Data Visualization mình có trích dẫn ở bên dưới. Cảm ơn các bạn đã đọc hết bài viết của mình, mình xin nhận mọi gạch đá ạ. 
# Reference 
https://towardsdatascience.com/the-art-and-science-of-data-visualization-6f9d706d673e
https://www.analyticsvidhya.com/blog/2017/10/art-story-telling-data-science/data