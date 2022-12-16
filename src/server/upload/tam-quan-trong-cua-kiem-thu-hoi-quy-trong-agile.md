# Kiểm thử hồi quy là gì 
![](https://images.viblo.asia/c6f12dbe-802a-4159-bbec-add9a5129ca7.jpg)

* Kiểm thử hồi quy là 1 loại kiểm thử quan trọng để đảm bảo rằng bất kỳ phần code thêm mới nào không ảnh hưởng tới chức năng đang có của sản phẩm.
* Cách thức kiểm thử này cho phép Tester xác định ra các lỗi trong bản build khi mà code có sự thay đổi và đảm bảo rằng các tính năng và chức năng hoạt động liền mạch. Kiểm thử hồi quy cơ bản là phương thức kiểm thử black box mà đảm bảo bất kỳ sự thay đổi về code nào trong sản phẩm sẽ không bị ảnh hưởng tới chức năng của hệ thống.

# Khi nào thì nên kiểm thử hồi quy 
![](https://images.viblo.asia/179053f5-55da-4737-ba78-98578d32ba18.jpg)


Kiểm thử hồi quy nên được thực hiện trên bản build mới khi mà có 1 sự thay đổi đáng kể trong chức năng gốc thậm chí là chỉ khi sửa 1 lỗi duy nhất. Nó thường được thực hiện sau khi các xác minh thay đổi hay các chức năng mới được thêm vào và nên được kiểm thử lặp lại với mọi chức năng mới. Trong hầu hết các điều kiện thì nó được coi là kiểm thử lại của việc kiểm thử và phương pháp kiểm thử này nên được thực hiện trong nhiều tình huống khác nhau như: 

*  Khi có sự cải tiến sản phẩm
* Khi các bản vá lỗi được thêm vào 
* Khi có những thay đổi nhỏ trong cấu hình phần mềm 
* Khi code được sửa đổi do có tính năng mới được thêm vào
* Khi các thay đổi được làm với bất kỳ chức năng đang tồn tại nào hay bất kỳ bản vá lỗi nào
* Khi có tích việc tích hợp với những sản phẩm khác
* Khi các thay đổi code được làm để tăng hiệu năng

Cụ thể là, tất cả các trường hợp trên nên được kiểm thử hồi quy để đảm bảo tất cả các tính năng không bị ảnh hưởng dù có những thay đổi mới.

Theo các phương pháp thực hành Agile và DevOps, kiểm thử hồi quy đóng vai trò quan trọng vì việc kiểm tra liên tục chính là chìa khóa của sự thành công của các phương pháp này để duy trì tính ổn định của sản phẩm. Các Testers tiếp tục đi theo phương pháp kiểm thử shift-left để đảm bảo việc kiểm thử hiệu quả được thực hiện cùng với sự phát triển phần mềm.

Hơn nữa, các nhóm sử dụng kiểm thử hồi quy để đảm bảo các chức năng được tiếp tục giữ nguyên ngay cả khi các tính năng mới được phát triển trong mỗi sprint.
 
**Bây giờ thì hãy thử tìm hiểu về các loại kiểm thử hồi quy khác nhau nhé!**

# Các loại kiểm thử hồi quy

**Kiểm thử hồi quy Unit:**
![](https://images.viblo.asia/44df4f3c-1de3-4611-8f97-42a6334a28c7.jpg)

Đây là 1 loại kiểm thử hồi quy quan trọng nên được thực hiện trong suốt giai đoạn kiểm thử Unit cái mà kiểm thử code như 1 đơn vị duy nhất. Hình thức kiểm thử hồi quy này có cách tiếp cận hẹp và tập trung vào các đơn vị code riêng lẻ.

**Kiểm thử hồi quy 1 phần:**
![](https://images.viblo.asia/eef49ddb-4932-41cd-8480-f596a3afb698.jpg)

Hình thức kiểm tra hồi quy này được thực hiện để kiểm tra các vấn đề khi thực hiện các thay đổi nhỏ đối với code. Tiến trình kiểm thử này đảm bảo hệ thống hoạt động bình thường ngay cả sau khi thêm code mới hoặc khi có những thay đổi code nhỏ.


**Kiểm thử hồi quy toàn bộ:**
![](https://images.viblo.asia/88a6c158-eabb-4313-b593-7a89d7b3e2f7.jpg)


Đây là một phương pháp kiểm tra hồi quy toàn diện mà liên quan đến việc kiểm tra các đơn vị đã thay đổi và cả bất kỳ tính năng cũ nào của ứng dụng đang có. Nó thường được sử dụng để kiểm thử khi mà có nhiều thay đổi code đã được thực hiện. Việc kiểm thử này phải được thực hiện trước bất kỳ đợt release hoặc phân phối sản phẩm lớn nào để đảm bảo tất cả các chức năng của sản phẩm vẫn tiếp tục hoạt động trơn tru.

**Kiểm thử hồi quy Build-level:**
![](https://images.viblo.asia/db07e77e-e03b-4f9b-918c-5a20649b3425.jpg)

Phương pháp này tương ứng với kiểm thử trong bản build thứ hai của bản chuẩn bị phát hành và thường được thực hiện khi một số thay đổi code được thực hiện trên các bản build. 
 
 
 
# Ý nghĩa của kiểm thử hồi quy trong Agile
![](https://images.viblo.asia/1a53e56e-45ff-4a97-a4b6-1a8d3e60c0b7.jpg)


Phương pháp Agile xoanh quanh các tiến trình lặp đi lặp lại và thực hiện trong thời gian ngắn với các chu kỳ sprint ngắn và có các tính năng riêng biệt đối với mỗi chu kỳ. Đặc biệt là, chu kỳ kiểm thử cũng nên thực hiện trong thời gian ngắn để duy trì sự cân bằng thích hợp với mỗi sprint này và các chu kỳ kiểm thử lặp lại theo sau chúng. Hồi quy là lặp đi lặp lại mà @@

Cơ bản thì, phương thức Agile thì nhanh và năng động và phát triển các tính năng riêng biệt trong 1 thời gian ngắn. Vậy nên điều cần thiết là các chu kỳ kiểm thử cũng phải song hành với nhau để triển khai các tính năng mới sau khi kiểm thử chúng.

Theo đúng nghĩa thì việc phát triển được thực hiện trên một tính năng và về cơ bản thì việc kiểm thử phải được thực hiện trên tất cả các tính năng mới và cũ đã được phát triển trước đó. Nó có 1 sự ưu tiên và cần thiết mà với mỗi bản build mới, việc kiểm thử hồi quy phải được thực hiện để đảm bảo rằng việc bổ sung hoặc cải tiến code thì không làm ảnh hưởng đến chức năng của các tính năng hiện có của sản phẩm.

Do đó, kiểm thử hồi quy có tầm quan trọng riêng của nó và quá trình kiểm thử này đảm bảo các chức năng không bị ảnh hưởng cho mọi bản build . Quá trình kiểm thử hồi quy này rất quan trọng đối với sự thành công của sản phẩm vì nó đảm bảo tất cả các chức năng hoạt động phù hợp với các yêu cầu được đưa ra trong một môi trường Agile.

# Lợi ích của việc kiểm thử hồi quy được thực hiện trong môi trường Agile


*  Giúp xây dựng một sản phẩm ổn định khi quá trình kiểm thử được thực hiện trong các sprint của môi trường Agile để kiểm tra xem liệu các chức năng mới được phát triển hoặc các chức năng hiện có đang hoạt động theo yêu cầu hay không
* Xác định sớm bất kỳ lỗi chức năng nào trong vòng đời phát triển sản phẩm và đảm bảo giải quyết được các lỗi này nhanh hơn
* Việc tự động kiểm thử hồi quy trong tiến trình Agile giúp giảm thiểu việc phải làm lại và giúp cho Tester có thời gian cho các hoạt động kiểm thử quan trọng khác
* Kiểm thử hồi quy hiệu quả trong Agile giúp cải thiện chất lượng tổng thể của sản phẩm cùng với việc đảm bảo trải nghiệm người dùng tuyệt vời

Hơn nữa, trong các kịch bản Agile với các thay đổi lặp đi lặp lại, nhiều chu kỳ xây dựng thường xuyên và các thay đổi liên tục được thêm vào ứng dụng. Do đó, để kiểm thử những thay đổi thường xuyên này, thì việc kiểm thử hồi quy phần mềm nên được thực hiện trong các thực hành Agile.

Do đó, để kiểm thử hồi quy 1 thành công trong Agile thì các nhóm QA nên tuân thử theo các thực hành kiểm thử hồi quy tốt nhất và xây dựng các bộ kiểm thử hồi quy hiệu quả ngay từ khi bắt đầu phát triển sản phẩm phần mềm để đảm bảo tất cả các chức năng hoạt động hiệu quả.

# Các thực tiễn tốt nhất cần tuân theo đối với kiểm thử hồi quy trong Agile

**1. Xác định các chiến lược kiểm thử hồi quy hiệu quả**

- Thu thập tất cả các Testcase
- Xác định các cải tiến có thể được thực hiện đối với các testcase
- Ước tính thời gian cần thiết để thực hiện các testcase này
- Phác thảo xem cái có thể được tự động hóa và cái nào sẽ được kiểm thử thủ công

**2. Tiến  hành smoke test và sanity test**

![](https://images.viblo.asia/0f307764-c78d-4e50-bb11-5f04e36dced9.jpg)


Cần phải tiến hành smoke và sanity test trước khi kiểm thử hồi quy thực sự được tiến hành, vì nó tiết kiệm thời gian cho các nhóm kiểm thử. Sanity test đảm bảo chạy qua các chức năng cơ bản của ứng dụng và smoke test được sử dụng để kiểm thử quy trình làm việc ban đầu, chẳng hạn như trang đăng nhập và khởi động. Hai bài kiểm thử ban đầu này có thể được sử dụng để phân loại xem liệu ứng dụng đang có quá thiếu sót hay hoạt động tốt, và sau đó quá trình kiểm tra hồi quy thực tế có thể được thực hiện.

**3.  Tận dụng kiểm thử tự động**

![](https://images.viblo.asia/b204dd70-b1a2-4bf1-80f1-7e94eed7f5e9.jpg)


Vì mọi chu trình release cần kiểm thử hồi quy để đảm bảo các sự phát triển mới không phá hỏng bất kỳ những tính năng mới nào, thật lý tưởng nếu như đưa kiểm thử tự động vào để tiết kiệm thời gian và công sức của Tester. Về mặt hiệu quả, nếu việc chạy song song quá trình kiểm thử hồi quy tự động được thực hiện, thì quá trình này có thể tiết kiệm đáng kể thời gian và cải thiện chất lượng phần mềm.

Kiểm thử hồi quy tự động làm cho quá trình kiểm thử hiệu quả hơn nhiều vì việc chạy đi chạy lại các kiểm thử tương tự nhau 1 cách thủ công của các Tester là điều khá tẻ nhạt. Tự động hóa có thể giải phóng tài nguyên và quá trình tự động hóa này có thể được sử dụng để giảm bớt các nhiệm vụ tẻ nhạt và lặp đi lặp lại như thế. 

**4. Duy trì và cập nhật các gói hồi quy 1 cách thường xuyên**

Về cơ bản, các gói hồi quy là 1 tập hợp các testcase mà được thực thi với bản cập nhật phần mềm mới cho mọi tính năng. Gói hồi quy này bao gồm các testcase đã được viết bằng cách sử dụng tài liệu đặc tả yêu cầu. Vì thế cần phải cập nhật các testcase này khi mà có thay đổi về các tính năng hoặc khi có các thay đổi mới và cũng cần thiết phải duy trì các testcase này để đảm bảo kết quả thử nghiệm hiệu quả.

**5. Áp dụng kiểm thử hồi quy hoàn chỉnh**

![](https://images.viblo.asia/cfe8b641-8aba-450e-b637-6ce5aed89825.jpg)

Kiểm thử hồi quy toàn diện là điều cần thiết và nên được thực hiện và nó phải bao quát được tất cả các điều kiện quan trọng. Loại kiểm thử hồi quy cuối cùng này nên được thực hiện để xác nhận rằng chức năng không bị thay đổi và bị ảnh hưởng do các thay đổi code mới. Việc kiểm thử này chứng tỏ các tester đã đưa ra được tín hiệu màu xanh để có thể chuyển code lên môi trường production.

**6. Thực hiện kiểm thử liên tục**

Trong Agile, việc kiểm thử liên tục là xương sống để đảm bảo chất lượng phần mềm. Quá trình này có trạng thái "fail fast" và "fail often" thông qua kiểm thử liên tục, do đó các lỗi sẽ được sửa 1 cách nhanh chóng. Những lỗi này được sửa trước khi giao hàng với ảnh hưởng ít nhất đến phần mềm. Hơn nữa, việc tích hợp và phân phối liên tục trong Agile & DevOps yêu cầu kiểm thử liên tục với kiểm thử hồi quy tự động. 

Do đó, ngay cả đối với bất kỳ phần mềm được phát triển nào mà yêu cầu một số thay đổi hoặc sửa đổi theo thời gian và nhu cầu, thì các bản cập nhật được triển khai sẽ là cần thiết cho các nhóm QA để đảm bảo rằng tất cả các tính năng đang hoạt động hoàn hảo. Để đạt được sự ổn định chức năng này cho mọi tính năng thì kiểm thử hồi quy cần được áp dụng.

# Kết luận

Các doanh nghiệp ngày nay cần những phần mềm chất lượng để mang lại trải nghiệm tuyệt vời cho khách hàng, đồng thời họ cần chu kỳ phát hành ngắn hơn. Do đó việc áp dụng kiểm thử hồi quy trong Agile và DevOps đảm bảo cung các sản phẩm chất lượng được ra thị trường đúng thời hạn bởi tất cả các tính năng đều được kiểm tra từ đầu đến cuối để đảm bảo sản phẩm chất lượng. 

Vậy thì còn chần chờ gì nữa, hãy áp dụng và kiểm chứng kết quả xem sao nhé!

Bài được dịch từ link:  https://www.testingxperts.com/blog/regression-testing-agile#Best%20Practices%20to%20follow%20for%20Regression%20Testing%20in%20Agile