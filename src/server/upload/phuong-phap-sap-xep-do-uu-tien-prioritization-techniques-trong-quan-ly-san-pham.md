Việc sắp xếp độ ưu tiên cho product backlog là một trong những mối quan tâm hàng đầu của Product Manager, bởi nguồn lực mà đội phát triển có luôn luôn ít hơn các tính năng mà các stakeholders mong muốn, và trách nhiệm của Product Manager là sắp xếp độ ưu tiên cho các tính năng dựa theo giá trị mà nó đem lại cho người dùng & tổ chức. Trong một danh sách dài các tính năng cần phát triển, Product Manager phải đưa ra quyết định yêu cầu nào sẽ được ưu tiên phát triển trước, yêu cầu nào cần tập trung nguồn lực để ra thị trường càng sớm càng tốt, yêu cầu nào có độ ưu tiên thấp & được phát triển sau, vv. 

Có rất nhiều phương pháp sắp xếp độ ưu tiên cho product backlog. Tùy thuộc vào đặc điểm của sản phẩm, đội phát triển, development stage của sản phẩm, vv mà Product Manager lựa chọn phương pháp cho sản phẩm của mình. 
Bài viết này sẽ chia sẻ về một số phương pháp sắp xếp độ ưu tiên, & các lưu ý khi lựa chọn phương pháp

### 1. Phương pháp định lượng & dựa trên yếu tố bên ngoài (External & Quantitative techniques) - The Kano Model 
Phương pháp Kano Model đánh giá độ ưu tiên của chức năng dựa trên mức độ hài lòng của người dùng đối với tính năng.
Kano Model đánh giá mỗi tính năng trên 2 tiêu chí
**Satisfaction**: mức độ hài lòng của người dùng
**Functionality**: mức độ phức tạp, chi phí để phát triển tính năng
    
![](https://images.viblo.asia/2684d22b-324c-42f4-9000-7a25952286c0.png)

Khi ứng dụng Kano Model, Product Manager thường tiến hành khảo sát người dùng. Với mỗi tính năng, người dùng sẽ trả lời 2 câu hỏi:
* Mức độ hài lòng nếu chức năng này được phát triển 
* Mức độ hài lòng nếu chức năng này không được phát triển

Dựa trên câu trả lời của người dùng, các tính năng được phân thành 4 loại:
* **Performance**: các tính năng làm tăng mức độ hài lòng nếu được phát triển
* **Must-be**: các tính năng mà người dùng coi là tối thiểu, nếu có không giúp tăng mức độ hài lòng, nhưng nếu không có sẽ gây thất vọng
* **Attractive**: các tính năng nằm ngoài yêu cầu của người dùng, nếu không có không gây thất vọng, nếu có sẽ giúp tăng mức độ hài lòng lên rất nhiều 
* **Indifferent**: các tính năng dù có hay không không ảnh hưởng tới sự hài lòng của người dùng

Thông thường, các tính năng sẽ được sắp xếp theo thứ tự ưu tiên sau: **Must-Be > Performance > Attractive > Indifferent.**

### 2. Phương pháp định tính & dựa trên yếu tố bên ngoài (External & Qualitative techniques) - Story Mapping

Story Mapping là một trong những phương pháp phổ biến nhất được Product Manager sử dụng.
Story Mapping là một đồ thị gồm 2 đường
* 	**Usage sequence**: là đường nằm ngang, các user story được sắp xếp theo thứ tự thực hiện bởi người dùng 
* 	**Criticality**: là đường nằm dọc, các user story được xếp từ trên xuống dưới dựa theo mức độ quan trọng. Các story có cùng mức độ quan trọng được xếp ngang hàng 

Các story liên quan đến cùng 1 hoạt động có thể gom lại thành “Activities”  
Để lựa chọn các user story cho từng release, Product Manager kẻ đường nằm ngang, gom các story có cùng mức độ quan trọng với nhau cho cùng 1 release. Nhược điểm của phương pháp này là khó sử dụng trong bối cảnh thị trường & sản phẩm biến động liên tục, khi Product Manager không thể có tầm nhìn dài hạn cho sản phẩm.

![](https://images.viblo.asia/5d5eff21-542c-454c-a9f8-83ed46290c9b.png)
![](https://images.viblo.asia/13b3656d-49f8-436c-a56b-cc3481d370eb.png)

### 3. Phương pháp định lượng & dựa trên yếu tố bên trong tổ chức (Internal & Quantitative techniques) - Financial Analysis
Việc phát triển sản phẩm hay dự án mới trong doanh nghiệp thường xuất phát từ mục đích tăng doanh thu hoặc giảm chi phí. Do đó, trong nhiều trường hợp, việc sắp xếp độ ưu tiên sẽ dựa trên giá trị kinh tế mà chức năng/dự án đem lại.
Có 4 loại mục tiêu tài chính mà ta thường gặp:
* **New revenue**: tạo ra doanh thu
* **Incremental revenue**: tăng nguồn thu bằng cách khiến người dùng hiện tại chi nhiều hơn
* **Retained revenue**: tăng nguồn thu bằng cách giữ chân người dùng hiện tại
* **Cost savings**: giảm chi phí vận hành

Tùy vào mục tiêu tài chính mà công ty đang hướng tới, Product Manager sắp xếp độ ưu tiên cho chức năng. Một số chỉ số tài chính khác thường được phân tích khi sử dụng phương pháp này: Net Present Value (NPV), Internal Rate of Return (IRR), Discounted Payback Period, vv

### 4. Phương pháp định tính & dựa trên yếu tố bên trong tổ chức (Internal & Qualitative techniques) - Systemico Model
Với quan điểm “do less [of what doesn’t matter], deliver more [of what does]”, phương pháp Systemico Model lấy người dùng làm trọng tâm, việc phát triển phải hướng tới việc tạo ra giá trị cho người dùng, giúp người dùng đạt được mục đích khi sử dụng sản phẩm (user’s goal), và loại trừ các yêu cầu tính năng dư thừa, đem lại ít giá trị.
Phương pháp phân tích & thiết kế ứng dụng truyền thống thường lấy ứng dụng làm trọng tâm (application-centric), tức là xác định xem ứng dụng sẽ trông ra sao, hoạt động như thế nào, & người dùng sẽ tương tác với ứng dụng ra sao. Phương pháp Systemico Model tiếp cận theo một hướng khác, đi từ việc xác định tại sao chúng ta cần xây dựng ứng dụng này, mục tiêu mà người dùng cần đạt được khi sử dụng ứng dụng, từ đó mới xác định xem chúng ta sẽ xây dựng ứng dụng ra sao. Để làm được điều này, Product Manager cần xác định user’s goal, các tính năng có giá trị & cần được ưu tiên chính là các tính năng giúp người dùng đạt được user’s goal.
Sau khi xác định các tính năng cần phát triển, Product Manager sẽ chia các tính năng này thành 4 loại, dựa trên mức độ tương tác của người dùng với từng tính năng (engagement)
* **Core**: là các tính năng phục vụ nhu cầu sử dụng cơ bản nhất của người dùng. Đây là các tính năng mà người dùng coi là tối thiểu, tiêu chuẩn cần có. Ví dụ, chức năng login, logout.
* **Use**: là các tính năng tăng cường trải nghiệm người dùng, nếu thiếu các tính năng này sản phẩm chỉ có sức hút tối thiểu với người dùng. Ví dụ, hiển thị danh sách sản phẩm ở trang thương mại điện tử
* **Engage**: là các tính năng thu hút người dùng, khiến người dùng quay lại và sử dụng sản phẩm thường xuyên hơn. Ví dụ, đánh giá sản phẩm
* **Explore**: là các tính năng giúp tăng sự thu hút của sản phẩm, khiến người dùng muốn tìm hiểu về sản phẩm nhiều hơn là các tương tác ban đầu. Ví dụ, gợi ý sản phẩm liên quan    

![](https://images.viblo.asia/1e6c06ad-8bc3-4be3-b979-87e9e245d810.jpg)

Đối với sản phẩm phát triển mới, bản release đầu tiên có thể chỉ bao gồm các tính năng Core là đủ. Sau bản release đầu tiên, đội phát triển sẽ thu về được các feedback từ người dùng thật, từ đó xác nhận lại tính chính xác của user’s goal/engagement ban đầu, chỉnh sửa danh sách tính năng, & sắp xếp lại thứ tự ưu tiên cho release tiếp theo. 

Tóm lại, key concept của Systemico Model là: Càng release sản phẩm sớm, càng nhận được feedback từ người dùng sớm, bạn càng có cơ hội cải thiện sản phẩm sớm hơn.

### 5. Các yếu tố ảnh hưởng đến việc lựa chọn phương pháp sắp xếp độ ưu tiên
Các phương pháp dựa trên yếu tố bên ngoài (external techniques) phù hợp khi 
* Product Manager cần đánh giá khái quát (high-level) một danh sách lớn các chức năng có thể phát triển 
* Product Manager muốn tìm hiểu, “khai phá” (explore) nhu cầu người dùng thực, để từ đó tạo product backlog, đặc biệt với các sản phẩm mới trong quá trình xây dựng ý tưởng 
* Product Manager quan tâm tới kết quả cần đạt được (outcome) là gì, hơn là việc thực hiện ra sao & chi phí-doanh thu thế nào (how)
* Product Manager muốn sự tham gia của các stakeholder khác trong việc định hình sản phẩm, & đạt được sự đồng thuận của stakeholder dành cho thứ tự ưu tiên của backlog

Các phương pháp dựa trên yếu tố bên trong (internal techniques) phù hợp khi 
* Đánh giá chi tiết hơn các chức năng đã được xác định từ external techniques
* Sắp xếp ưu tiên cho 1 product backlog đã được đồng thuận từ stakeholder là phù hợp với nhu cầu của người dùng & tổ chức
* Dự án/sản phẩm phát triển nội bộ, hoặc không cần quan tâm nhiều tới yếu tố thị trường
* Cần sắp xếp nhanh độ ưu tiên giữa các chức năng có độ ưu tiên thấp  

### 6. Đó là với đội phát triển sản phẩm, vậy các dự án outsource đang sắp xếp độ ưu tiên ra sao?
Thông thường, đội dự án outsource ít có sự tiếp xúc với thị trường & người dùng thật. Product backlog trong dự án outsource thường là các backlog đã được khách hàng sắp xếp độ ưu tiên ở mức high-level. Các yếu tố được cân nhắc thường là: chi phí, nguồn lực, rủi ro. Do đó, dự án outsource thường áp dụng các internal techniques, hai phương pháp được sử dụng khá thường xuyên là Value vs Risk,  Value vs Cost.

### 7. Keynote
> Don’t prioritize user needs over business needs. While user needs are incredibly important, they won’t matter if they don’t end up driving business.”—Drew Davidson

* Khó để xác định ngay phương pháp nào phù hợp với sản phẩm nào. Một Product Manager có thể thử sử dụng nhiều phương pháp cho tới khi chọn được phương pháp tối ưu nhất, hoặc thậm chí sử dụng kết hợp nhiều phương pháp cho cùng 1 sản phẩm.
* Việc sắp xếp độ ưu tiên không chỉ diễn ra một lần. Độ ưu tiên phải thường xuyên được đánh giá lại sau mỗi lần release, mỗi lần nhận feedback từ khách hàng, & điều chỉnh sao cho đảm bảo các tính năng đem lại giá trị nhất luôn được ưu tiên 
*  Việc sắp xếp độ ưu tiên không phải trách nhiệm của mình Product Manager. Feedback từ người dùng, ý kiến chuyên môn từ đội phát triển hoặc các stakeholder khác đều là nguồn thông tin quý giá để Product Manager cân nhắc. 
* Cần cân bằng giữa phương pháp định lượng & định tính. Dù kết quả định lượng có vẻ có tính thuyết phục hơn, thì thực tế các con số vẫn mang tính ước lượng, & không phản ánh hết mọi thông tin. 
* Không nên đặt mong muốn của người dùng lên trên nhu cầu kinh doanh. Bởi lẽ, xét cho cùng, mục đích của sản phẩm là để đạt được mục tiêu kinh doanh; thỏa mãn nhu cầu người dùng sẽ vô nghĩa nếu nó không giúp tổ chức đạt được mục tiêu kinh doanh 

***Nguồn tham khảo***
* https://www.uxmatters.com/mt/archives/2013/12/the-best-ways-to-prioritize-products-and-features.php
* https://barryoreilly.com/the-systemico-model/
* https://foldingburritos.com/product-prioritization-techniques/