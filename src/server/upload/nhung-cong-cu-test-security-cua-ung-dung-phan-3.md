**1. Những yếu tố quyết định việc lựa chọn các công cụ test an ninh**

Trong [phần 1](https://viblo.asia/p/nhung-cong-cu-test-security-cua-ung-dung-phan-1-L4x5xwXwlBM) và [phần 2](https://viblo.asia/p/nhung-cong-cu-test-security-cua-ung-dung-phan-2-WAyK8pV6KxX), chúng ta đã tìm hiểu qua về những công cụ test an ninh (AST) và phân tích khi nào sẽ sử dụng chúng và sử dụng chúng như thế nào trong trường hợp cụ thể của một vòng đời phát triển phần mềm. Trong phần này, chúng ta sẽ đi sâu vào những yếu tố mang tính quyết định để cân nhắc khi nào lựa chọn một công cụ ASTvà đưa ra sự hướng dẫn dưới hình thức những danh sách có thể tham khảo hay còn gọi là những checklist.

Trước khi nhìn vào những sản phẩm AST xác định, bạn nên xác định lớp nào của các công cụ AST là phù hợp cho ứng dụng của bạn. Để tiến hành xác định điều này, có nhiều yếu tố sẽ giúp bạn quyết định lớp nào, loại nào của các công cụ AST để sử dụng. Mình sẽ trình bày một vài yếu tố nổi bật nhất bên dưới đây. Chúng sẽ là những yếu tố mang tính hỗ trợ và hướng dẫn bạn đưa ra quyết định. Tuy các yếu tố này sẽ được trình bày và thảo luận riêng, chúng thực tế liên quan đến nhau và cùng được đưa ra cân nhắc trong quá trình đưa ra quyết định.

![](https://images.viblo.asia/53e4803e-2f10-4156-a2e4-c442058465ab.png)

Bạn cũng cần giữ trong tâm trí rằng không có một kiểu công cụ nào có thể chỉ ra tất cả vấn đề, bởi vậy một quá trình kiểm tra dài với sự kết hợp của nhiều công cụ được khuyến cáo. Tuy vậy, những yếu tố sẽ được đưa ra ở đây là với mục đích lựa chọn một công cụ AST để thực hiện quá trình kiểm tra an ninh tự động trước khi thêm các công cụ khác vào môi trường. Nhìn chung, những công cụ AST đầu tiên được sử dụng sẽ là các công cụ SAST, DAST và SCA. Đó là các công cụ ở đáy của tháp ở hình bên trên. Sau cùng, quyết định tốt nhất là bắt đầu thực hiện việc test và sử dụng bất kỳ công cụ nào, tuy nhiên một vài yếu tố sẽ giúp bạn đưa ra quyết định một cách hiệu quả hơn và sẽ được liệt kê bên dưới.

![](https://images.viblo.asia/1fe0a82c-f5d4-4ce0-af67-050e16f03fbe.png)

***1.1. Authorship (Tác giả)***

Thuật ngữ Authorship trong phạm vi của việc test an ninh ứng dụng ám chỉ tác giả hay người phát triển mã nguồn một cách ước lượng. Điển hình, mã nguồn có thể được phát triển nội bộ bởi chính bên trong tổ chức hoặc có thể hoàn toàn được phát triển bên ngoài bởi bên thứ ba. Tuy nhiên, có nhiều kịch bản phát triển khác như trường hợp một vài phần của mã nguồn được phát triển bên ngoài bởi nhiều bên thứ ba khác nhau và sau đó được ghép lại cùng mã nguồn đã được phát triển nội bộ. Kiến thức, hiểu biết về mô hình tác giả này có thể ảnh hưởng đến các chiến lược test ứng dụng. Bạn luôn có thể lựa chọn sử dụng đồng thời các công cụ SAST và DAST để thực hiện test an ninh cho ứng dụng mà không cần quan tâm đến tác giả hoặc những người đã là ra nó. Tuy nhiên, khi bạn phải lựa chọn một kiểu công cụ đơn lẻ làm điểm khởi đầu cho quá trình test, tác giả có thể là một yếu tố mang tính quyết định. 

* Nếu ứng dụng được viết hoàn toàn hoặc phần lớn nội bộ bên trong tổ chức, những công cụ SAST nên là lựa chọn đầu tiên. Những công cụ SAST là mềm dẻo nhất và nên được sử dụng bất kỳ nơi nào có thể.
* Nếu ứng dụng được viết bởi một bên thứ 3 và được chuyển lại như một file thực thi, những công cụ DAST sẽ là lựa chọn đầu tiên.
* Những ứng dụng phát triển nội bộ cũng có xu hướng dễ dàng hơn trong việc ứng dụng  các công cụ sửa lỗi, phân tích bao phủ và ASTO hơn là những file thực thi do bên thứ 3 thực hiện.

Các bạn có thể tham khảo thêm mô hình chi tiết bên dưới.

![](https://images.viblo.asia/4ed0f240-c9ca-4ba3-8b2f-78567ec37052.png)

***1.2. Source Code Availability (Sự sẵn sàng của mã nguồn)***

Nếu mã nguồn là sẵn sàng, các công cụ SAST là lựa chọn tốt nhất. Nếu mã nguồn không sẵn sàng, các công cụ DAST là tốt nhất để sử dụng.

Nếu mã nguồn sẵn sàng và những yếu tố khác cho phép, cả 2 kiểu công cụ SAST và DAST nên được sử dụng. Các công cụ IAST và các công cụ lai cũng trở thành một sự lựa chọn trong trường hợp này. 

Nếu ứng dụng được viết bởi một bên thứ 3 và mã nguồn là không sẵn sàng, những công cụ test mở (fuzzing) và các công cụ negative-testing và các kỹ thuật khác nên được sử dụng kết hợp với các công cụ DAST truyền thống.

Nếu ứng dụng được viết bởi bên thứ 3 và mã nguồn là sẵn sàng, những công cụ build và so sánh nên được sử dụng để kiểm tra file thực thi đã nhận được có chính xác như file build ra từ mã nguồn đã nhận được hay không.

***1.3. Third-Party Components (Những thành phần bên thứ 3)***

Nếu ứng dụng sử dụng nhiều các thành phần và những thư viện của bên thứ 3 hoặc có dùng chúng trong những vị trí quan trọng, những công cụ SCA là sự lựa chọn đầu tiên, thậm chí trước cả các công cụ SAST. Các công cụ SCA sẽ giúp tìm các thành phần mà không được nghĩ đang được sử dụng trong ứng dụng. Vì nguyên nhân này, các công cụ SCA cũng nên được sử dụng ở bất cứ nơi nào có thể.

Nếu ứng dụng sử dụng it hoặc không sử dụng thành phần của bên thứ 3, các công cụ SAST là lựa chọn đầu tiên.

Nếu ứng dụng được phát triển hầu hết trong nội bộ và có sử dụng một vài thư viện ngoài, các công cụ SAST và SCA nên được sử dụng đồng thời.

Nếu ứng dụng được viết bởi một bên thứ 3 và bạn không chắc chắn về các thư viện đang sử dụng, bạn nên sử dụng kết hợp công cụ SCA và DAST.

***1.4. Development Model and Target Platform (Mô hình phát triển và nền tảng đích)***

Nền tảng đích ở đây ám chỉ đến môi trường và gói kỹ thuật nơi ứng dụng được phát triển. Nếu nền tảng đích là di động thì những công cụ test cho thiết bị di động sẽ được ưu tiên nhất. Nếu ứng dụng hướng đến việc phát triển trên đám mây (cloud) thì các công cụ ASTaaS có thể là sự lựa chọn bởi vì nó dễ dàng tích hợp với nhiều dịch vụ đám mây khác nhau. Nếu ứng dụng được phát triển cho Internet công cộng, những công cụ DAST được khuyến cáo sử dụng vì chúng có thể sẽ phải nhận những cuộc tấn công mũ đen (black-hat attack) từ bất kỳ ai trên mạng.

* Nếu bạn đang sử dụng mô hình phát triển phần mềm truyền thống theo mô hình nước chảy (waterfall software development life cycle - waterfall SDLC) thì những công cụ SAST và DAST là phù hợp.
* Nếu bạn đang sử dụng cách thức Agile, các công cụ IAST và các công cụ lai lại là sự lựa chọn phù hợp hơn bởi việc sử dụng các công cụ SAST và DAST là tốn kém thời gian.
* Trong một quá trình theo mô hình phát triển và chuyển giao liên tục (CI/CD), các công cụ IAST và các công cụ lai cũng phù hợp hơn, nhưng thông thường, các cong cụ SCA là quan trọng nhất trong mô hình phát triển này nếu những thành phần bên thứ 3 được sử dụng thường xuyên.
* Nếu ứng dụng được phát triển bởi một bên thứ 3 thì mô hình phát triển sẽ không phải yếu tố quyết định, do đó bạn có thể lựa chọn kiểu công cụ ASTaaS.
* Nếu mô hình Agile và CI/CD được sử dụng và những thành phần, thư viện bên thứ 3 được sử dụng thì việc sử dụng những công cụ SCA là bắt buộc và nên được đưa vào ngay từ đầu.

***1.5. Integration Level (Mức tích hợp)***

Yếu tố mức độ tích hợp thể hiện khả năng thêm những công cụ AST vào vòng đời phát triển. Nguyên tắc chung ở đây là dịch trái - tích hợp các công cụ AST ngày khi có thể vào quá trình phát triển.

* Nếu các công cụ có thể được tích hợp sớm vào quá trình phát triển, các công cụ SAST và DAST được khuyến cáo.
* Nếu các công cụ không thể được tích hợp sớm vào quá trình phát triển thì sử dụng công cụ DAST kết hợp với các công cụ test mờ và test negative.
* Nếu trong trường hợp không thể tích hợp các công cụ test an ninh vào vào đời phát triển phần mềm, cân nhắc sử dụng các công cụ ASTaaS.
* Nếu ứng dụng được phát triển bởi bên thứ 3 và hướng đến dịch vụ đám mây, và nếu những công cụ test an ninh không thể được tích hợp vào quy trình phát triển, thì cần sử dụng các công cụ ASTaaS tập trung vào DAST và SCA.

***1.6. Compliance (Sự tuân thủ)***

Những quá trình và việc điều khiển an ninh của ứng dụng thường được chỉ định bởi các chính sách, hợp đồng, và luật lệ. Một vài ví dụ chung có thể liệt kê như Risk Management Framework (RMF), Federal Information Security Management Act (FISMA), Health Insurance Portability and Accountability Act (HIPAA),Sarbanes-Oxley Act (SOX), payment-card industry (PCI) compliance, Control Objectives for Information and Related Technology (COBIT), và International Organization for Standardization (ISO) 9000.

* Nếu bạn không thấy bạn có bất kỳ chuẩn nào cần theo, cân nhắc những danh sách như OWASP Top 10,SANS Top 25, và CERT Coding Standards. Bởi vì nhiều chỉ thị bao hàm sự lưu trữ và sự bảo vệ liên quan đến dữ liệu, những bộ quét an ninh cho cơ sở dữ liệu là rất hữu dụng. Các công cụ sửa lỗi và ASTO cũng rất hữu dụng để sinh ra các báo cáo.
* Nếu ứng dụng được viết nội bộ sử dụng mô hình phát triển nước chảy (waterfall SDLC) và những báo cáo được yêu cầu, sử dụng nhiều công cụ SAST kết hợp với các công cụ sửa lỗi và các công cụ quét cơ sở dữ liệu.

***1.7. Prior Findings or Incidents (Các tìm kiếm hoặc các vấn đề xảy ra trước đó)***

Nếu bạn có hiểu biết và lưu lại những điểm yếu của ứng dụng trước đó, bạn có thể sử dụng chúng để xây dựng chiến lược của bạn cho việc test ứng dụng.

Nếu ứng dụng của bạn đã từng bị khai thác trước đây bởi một lỗ hổng bảo mật đã biết, bạn cần chắc chắn đã sử dụng một công cụ SCA đủ mạnh hoặc sử dụng nhiều công cụ một lúc.

Nếu việc review code phát hiện nhiều điểm yếu trong mã nguồn thực tế, bạn cần thực hiện đưa các công cụ SAST vào sớm trong quá trình phát triển.

Nếu ứng dụng được viết nội bộ và là một ứng dụng web, nhưng bạn cũng xây dựng một phiên bản di động cái mà phải nhận nhiều phần nàn từ khách hàng về lỗi và việc ứng dụng bị sập (crash), bạn cần sử dụng các công cụ SAST, DAST kết hợp các công cụ test an ninh cho di động (MAST). Hãy nhớ rằng những lỗi crash là con đường chính dẫn đến các lỗ hổng trong tương lai.

**2. Tổng kết**

Việc kiểm tra từng yếu tố đã liệt kê ở trên sẽ giúp bạn xây dựng một danh sách các kiểu công cụ có thể sử dụng để cân nhắc. Những hệ số được trình bày riêng ở trên nhưng sẽ cần được cân nhắc cùng nhau khi đưa ra quyết định. Một vài yếu tố có thể dẫn bạn đến một kiểu công cụ xác định nhưng một vài yếu tố khác lại đẩy bạn ra khỏi những kiểu công cụ đó. Về lý tưởng, bạn sẽ cần thực hiện sự kết hợp sử dụng của các công cụ. Các công cụ SAST, DAST và SCA nên được sử dụng ở bất kỳ nơi nào có thể. Các công cụ IAST và công cụ lai có thể được sử dụng nếu cần một sự bao phủ rộng hơn.
Trong những trường hợp nơi mà chỉ một hoặc hai kiểu công cụ được cân nhắc, những yếu tố mang tính quyết định đã trình bày ở trên nên có thể giúp bạn biết ưu tiên những gì mình cần làm. Tuy vậy, cần luôn lưu ý rằng việc có sự hiểu biết lớn về các công cụ truyền thống như SAST, DAST, SCA là hữu ích trong việc đưa ra quyết định đối với các công cụ cấp cao hơn như MAST, IAST và ASTaaS. Các công cụ sửa lỗi, test bao phủ và ASTO có thể nâng cao thực thi và hiệu quả của những công cụ AST khác nhưng thường không phải sự lựa chọn đầu tiên để thực hiện.
Sau khi đã lựa chọn được loại công cụ phù hợp, bạn sẽ cần tiếp tục cân nhắc các yếu tố khác để lựa chọn ra đúng các công cụ AST cụ thể để sử dụng. Các yếu tố cần cân nhắc sẽ bao gồm ngân sách, ngôn ngữ phát triển, gói kỹ thuật cần sử dụng, những đối tượng kỹ thuật, thời gian và nhân lực cần để thực hiện việc test an ninh, và nhiều yếu tố khác.

**3. Liên kết tham khảo**

https://insights.sei.cmu.edu/sei_blog/2018/07/10-types-of-application-security-testing-tools-when-and-how-to-use-them.html

https://insights.sei.cmu.edu/sei_blog/2018/08/decision-making-factors-for-selecting-application-security-testing-tools.html