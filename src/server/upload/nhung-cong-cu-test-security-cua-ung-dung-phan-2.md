Ở [phần 1](https://viblo.asia/p/nhung-cong-cu-test-security-cua-ung-dung-phan-1-L4x5xwXwlBM), mình đã giới thiệu về các công cụ kiểm tra sự an toàn của phần mềm và phân loại chúng thành các nhóm cụ thể theo sơ đồ hình tháp, từ những công cụ nền móng ở đáy tháp đến các công cụ nâng cao ở đỉnh tháp. Trong phần này, mình sẽ nói về cách thức để lựa chọn loại công cụ kiểm tra an toàn nào là phù hợp với từng trường hợp cụ thể.

**1. Selecting Testing Tool Types**

Có nhiều hệ số để cân nhắc khi nào nên lựa chọn những loại công cụ kiểm tra an toàn nào. Nếu bạn vẫn phân vân nên bắt đầu việc lựa chọn này như thế nào, quyết định tốt nhất bạn có thể thực hiện là bắt đầu sử dụng thử những công cụ này. Tương ứng với kết quả từ một bài thực hành an ninh được Microsoft tiến hành năm 2013, có đến 76% những người phát triển ở Mỹ thực hiện quá trình lập trình ứng dụng của họ theo một cách thức không an toàn và 40% những người phát triển phần mềm nói rằng sự an toàn của phần mềm không phải là ưu tiên hàng đầu của họ. Chúng tôi rất mong bạn có thể cố gắng để không rơi vào nhóm phần trăm đã được thống kê này.

Sẽ có những hệ số sẽ giúp bạn xác định sẽ sử dụng những loại nào của những công cụ kiểm tra an toàn (AST - Application Security Testing) và xác định những sản phẩm như thế nào thì phù hợp với một lớp công cụ AST nào đó. Tuy nhiên, bạn cũng cần lưu ý sẽ không có một công cụ đơn lẻ nào có thể giải quyết tất cả mọi vấn đề. Bởi như chúng ta đã nói ở phần 1, sự an toàn không phải là một sự lựa chọn nhị phân, ở đó hoặc là an toàn hoặc là không an toàn, mà mục đích là giảm thiểu những nguy cơ và rủi ro. Thông thường, một quá trình chạy dài với sự kết hợp của nhiều công cụ được khuyến cáo.

Trước khi đi tìm những sản phẩm AST xác định, bước đầu tiên là cần xác định những kiểu nào của những công cụ AST là phù hợp với ứng dụng của bạn. Thông thường, đến tận khi ứng dụng của bạn đã phát triển đến một mức có độ tinh vi và phức tạp cao thì những công cụ AST tại đáy của tháp, được tô màu xanh ở hình bên dưới, sẽ được sử dụng. Đó là những công cụ phổ biến nhất và sẽ giúp chỉ ra hầu hết các điểm yếu chung nhất của ứng dụng.

![](https://images.viblo.asia/2012454a-6884-4f90-9518-53287d7cb00b.png)

Sau khi bạn thành thạo và có nhiều kinh nghiệm hơn, bạn có thể cân nhắc sử dụng thêm một vài công cụ ở lớp thứ 2 tính từ đáy tháp, cái được thể hiện bằng màu xanh ở hình bên dưới. Có thể dẫn ra một ví dụ như nhiều công cụ test cho những nền tảng di động (MAST - Mobile Application Security Testing) cung cấp những framework cho bạn để viết những script tùy biến phục vụ việc test. Với việc có một chút kinh nghiệm với các công cụ DAST truyền thống, bạn sẽ có thể viết những script test này tốt hơn. Và mở rộng hơn, nếu bạn có kinh nghiệm với tất cả những lớp công cụ tại đáy của tháp, bạn sẽ có được một vị trí tốt hơn để có thể đàm phán những thuật ngữ và những đặc điểm của một hợp đồng ASTaaS - Application Security Testing as a Service. 

![](https://images.viblo.asia/ecb4656f-8b0d-4e1d-ae1a-cdf6e38060fa.png)

Việc quyết định sử dụng 3 loại công cụ test an ninh ở đỉnh trên cùng của tháp dựa trên việc cân nhắc về các yêu cầu về quản lý và tài nguyên dựa trên những đánh giá kỹ thuật. 

Nếu bạn chỉ có khả năng lựa chọn và sử dụng một công cụ AST duy nhất, dưới đây là những hướng dẫn chi tiết cho bạn để lựa chọn:

* Nếu ứng dụng được viết bởi chính bạn hoặc bạn có quyền truy cập đến mã nguồn, một điểm khởi đầu tốt là chạy một công cụ test an toàn dạng tĩnh (SAST) và kiểm tra các vấn đề về mã nguồn và việc tuân thủ các tiêu chuẩn coding. Trên thực tế, việc sử dụng các công cụ SAST là điểm bắt đầu chung cho việc phân tích code ban đầu.

* Nếu ứng dụng không được viết bởi bạn hoặc bạn không có quyền truy cập đến mã nguồn, các công cụ test an toàn dạng động (DAST) sẽ là sự lựa chọn tốt nhất.

* Bất kể bạn có quyền truy cập đến mã nguồn hoặc không, nếu ứng dụng sử dụng nhiều thành phần từ bên thứ 3 hoặc mã nguồn mở thì việc sử dụng các công cụ phân tích phần mềm Software Composition Analysis (SCA) là sự lựa chọn tốt nhất. Về lý tưởng, các công cụ SCA sẽ được chạy song song với các công cụ SAST và DAST. Tuy nhiên, nếu tài nguyên hệ thống chỉ cho phép chạy một công cụ thì những công cụ SCA với việc hỗ trợ nhiều thành phần từ bên thứ 3, sẽ giúp kiểm tra các lỗ hổng tốt hơn.

Đối với quá trình phát triển lâu dài, việc tích hợp các công cụ AST trong quá trình phát triển nên giúp tiết kiệm thời gian và nỗ lực nhờ việc phát hiện ra các vấn đề sớm hơn. Tuy vậy, việc áp dụng các công cụ AST lại yêu cầu một vài đầu tư ban đầu về thời gian và tài nguyên. Hướng dẫn vừa trình bày ở trên sẽ giúp bạn có một điểm khởi đầu phù hợp nhất với những gì bạn có. 

Sau khi bạn đã sử dụng các công cụ AST, chúng sẽ sinh ra rất nhiều kết quả và chúng ta phải quản lý và tương tác với chúng. Khi bạn mong muốn phân tích kết quả này với một công cụ nào đó, một yêu cầu tất yếu đặt ra là đưa thêm những công cụ mong muốn vào trong môi trường của bạn. 

Mô hình tham chiếu bên dưới mô tả chi tiết nơi mà những công cụ test an ninh được sử dụng trong một dự án phát triển kiểu CI/CD (Continuous Integration and Continuous Delivery) hay quá trình tích hợp và chuyển giao diễn ra liên tục. Mô hình tham chiếu này không hướng đến việc bắt buộc phải đưa tất cả các công cụ test an ninh vào trong môi trường phát triển mà hướng đến việc mô tả nơi nào những kiểu cụ thể của những công cụ test an ninh sẽ phù hợp để sử dụng và nó sẽ giúp bạn ra quyết định và có tác dụng như một bản đồ chỉ đường. 

![](https://images.viblo.asia/827d7923-747d-4930-8f2c-c8a3895848a9.png)

Nội dung của mô hình tham chiếu có thể được mô tả chi tiết như sau: 

* Đầu tiên, người phát triển sẽ commit mã nguồn lên server, sau đó các công cụ test an ninh dạng tĩnh (SAST) và các công cụ phân tích phần mềm (SCA) sẽ cần được sử dụng để phát hiện các vấn đề. 
* Nếu quá trình test sử dụng SAST và SCA phát hiện lỗi, một báo cáo về lỗi sẽ được tổng hợp, chuyển qua các công cụ sửa lỗi và ASTO rồi chuyển lại cho người phát triển để sửa chữa. 
* Nếu quá trình test sử dụng SAST và SCA không phát hiện lỗi, mã nguồn sẽ được dịch và build thành file ứng dụng và ứng dụng được kiểm tra bằng các công cụ DAST và IAST. 
* Nếu quá trình test sử dụng DAST và IAST phát hiện lỗi, một báo cáo về lỗi sẽ lại được tổng hợp, chuyển qua các công cụ sửa lỗi và ASTO rồi chuyển lại cho người phát triển để sửa chữa. 
* Nếu quá trình test sử dụng DAST và IAST không phát hiện lỗi, ứng dụng chạy sẽ được release. 
* Xuyên suốt quá trình phát triển và kiểm tra an ninh, việc sử dụng các công cụ kiểm tra an ninh cho cơ sở dữ liệu (Database Security Scanner) cũng được sử dụng để đảm bảo việc thao tác với cơ sở dữ liệu của ứng dụng luôn đảm bảo an toàn.

**2. Liên kết tham khảo**

https://insights.sei.cmu.edu/sei_blog/2018/07/10-types-of-application-security-testing-tools-when-and-how-to-use-them.html

https://insights.sei.cmu.edu/sei_blog/2018/08/decision-making-factors-for-selecting-application-security-testing-tools.html

-----

Mình xin kết thúc phần 2 của bài viết ở đây. Trong phần tiếp theo, mình sẽ đi sâu hơn vào phân tích hết sức chi tiết và cụ thể những hệ số mang tính quyết định đến việc lựa chọn các công cụ kiểm tra an toàn.