## I. Giới thiệu
Trong gia công phần mềm (Outsourcing) bước khởi đầu là vô cùng quan trọng. Sẽ không cường điệu quá khi nói khởi đầu sẽ quyết định tới 80% khả năng tỷ lệ thành công. 

Rất nhiều nhân viên kinh doanh sau khi chốt được dự án đã nói với các kỹ sư phần mềm là: “Việc sau này sẽ do các chú xử nhé. Cố gắng lên!” 

Tuy nhiên ngoài vấn đề tiền bạc ra, họ chẳng bao giờ phải trải qua vô vàn cực khổ khi làm dự án cả. 

Vì vậy, việc hợp tác chặt chẽ giữa bộ phân kinh doanh với bộ phận phát triển để xây dựng đề án thực hiện dự án là điều rất quan trọng để đảm bảo hạn chế triệt để những thiệt hại trong quá trình làm dự án. Điều đó góp phần quyết định dự án có thể thành công hay không ngay từ bước đầu tiên. 

Vì vậy nên mới nói khởi đầu là bước đệm quan trọng để gặt hái thành công sau này. 
Đặc biệt một trong những yếu tố hàng đầu quyết định yếu tố thành công dự án đó là **ĐIỀU KIỆN TIỀN ĐỀ** xây dựng trong quá trình làm báo giá (Estimation).

##  II. Tại sao lại cần điều kiện tiền đề
Công việc báo giá thường được thực hiện theo lộ trình cơ bản như sau:

![](https://images.viblo.asia/81b738de-f897-4272-b4ff-d196cad0021d.PNG)

Khi thực hiện báo giá, người ta thường dựa vào một số giả định nào đó để ước lượng công việc thực hiện. 

Như trong sơ đồ trên, các kỹ sư thường chỉ ước lượng số giờ làm việc của họ, mặc dù trong đầu họ chưa định hình rõ điều kiện tiền đề mà đã đưa ra con số báo giá mất rồi. 

Đối với việc phát triển hệ thống thì rất ít trường hợp dự án đã chốt requirement rõ ràng ngay từ đầu, hầu hết các dự án đều trong tình trạng mập mờ, chưa clear yêu cầu chức năng một cách rõ ràng. Vì vậy sau này khi phát triển dự án thức tế, những yêu cầu chức năng dần dần lộ ra và phát sinh, khiến công việc của dự án trở nên lẫn lộn phức tạp và chồng chéo cồng kềnh.

Để tránh điều đó xảy ra, cần phải xác nhận rõ với khách hàng về điều kiện tiền đề là tiền đề để tiến hành phát triển dự án trong tình trạng yêu cầu chức năng mang tính tạm thời. Không có lý do gì mà bạn lại không nêu rõ ra, đó là điều đương nhiên với bất kỳ quy trình làm việc nào, nên bạn nhất định phải ghi rõ ràng, đầy đủ nhất có thể về điều kiện tiền đề vào trong báo giá.

## III. Những điều kiện tiền đề nên quy định sẵn

### 1. Về phạm vi đối tượng báo giá

Chỉ định rõ ràng phạm vi đối tượng của hệ thống bạn đang báo giá tại thời điểm thực hiện báo giá. 
Cần vạch rõ đối tượng phát triển là gì software, hardware hay middleware hay là phần nào trong hệ thống? 
Ngoài ra cần chỉ rõ các hệ thống liên kết với hệ thống phát triển lần này. Các chức năng nào sẽ thuộc phạm vi báo giá…

### 2. Về phạm vi ngoài đối tượng báo giá

Nhiều người cho rằng điều này không cần thiết bởi vì đã mô tả rõ phạm vi đối tượng ở mục 1 rồi. Nhưng thực ra để loại bỏ những phần mơ hồ, chúng ta nên viết rõ cả những đối tượng không thuộc phạm vi của báo giá. Về phạm vi phát triển của hệ thống, rất khó để thể hiện bằng câu chữ văn bản, vì vậy để dễ hiểu hơn, bạn nên vẽ sơ đồ cấu trúc hệ thống, v.v. Sau đó xác định rõ bạn sẽ thực hiện hoặc sẽ không thực hiện bất kỳ công việc nào không xuất hiện trong sơ đồ đó (ví dụ: tạo tài liệu hướng dẫn sử dụng, di chuyển dữ liệu).

### 3. Công nghệ sử dụng

Nếu về ngôn ngữ lập trình thì ghi rõ là sử dụng Java hay Ruby; nếu về cloud, thì sử dụng AWS hay Azure; nếu là Java thì dùng framework nào; nếu là AWS thì dùng dịch vụ gì? Hãy xác định rõ ràng các công nghệ đó. Dưới đây là một ví dụ cho một ứng dụng web:

> Ví dụ:
> 
> Sau đây là điều kiện tiền đề công nghệ sử dụng để phát triển hệ thống này.
> 
> * 　Ngôn ngữ phát triển (Server): Java(1.7)
>  
> * 　Framework: Play framework2.0 beta
>  
> * 　Ngôn ngữ phát triển  (UI): HTML5, CSS3, javascript
>  
> * 　Framework: jQuery(1.4)
>  
> * 　Cloud service: AmazonWebService
>  
> * 　Service sử dụng: EC2 (OS: AmazonLinux 32Bit InstanceType: Small), S3, RDS (mysql)
>           
> * 　AP server: Tomcat(7.0)

Mặc dù không thể quyết định chi tiết tất cả tại thời điểm báo giá. Nhưng đây là tiền đề quan trọng đưa ra giả định tạm thời ở thời điểm làm báo giá. Việc mô tả càng nhiều càng tốt về công nghệ sử dụng để đảm bảo các công nghệ cơ bản sẽ không bị thay đổi khi dự án bắt đầu, tránh việc thay đổi công nghệ gây ảnh hưởng tới quá trình làm dự án.

### 4. Quy trình phát triển

Có rất nhiều quy trình phát triển trong phát triển hệ thống như thác nước, agile, iterative model. Quyết định sẽ áp dụng quy trình nào trong quá trình phát triển và làm thế nào để tiến hành công việc một cách trôi chảy và ít rủi ro nhất.

### 5. Thời gian phát triển

Thậm chí với một dự án 1 man-month thì thời gian phát triển có thể hoàn toàn khác nhau, có thể thực hiện trong vòng một tháng hay mười tháng đều được. Vì vậy, cần quy định rõ thời gian thực hiện dự án, đưa ra giả định của từng công đoạn, bao gồm thời gian bắt đầu dự án, kết thúc dự án và thời gian chấp nhận của khách hàng.

> [Ví dụ]
> 
> *Thời gian dự kiến thực hiện dự án là từ ngày 1 tháng 2 năm 20xx đến ngày 30 tháng 6 năm 20xx. Nếu thời gian bắt đầu bị trì hoãn, cần phải điều chỉnh lại lịch trình và báo giá chi phí phát sinh riêng dựa trên thống nhất ý kiến với công ty khách hàng.
> 
> *Thời gian chấp nhận của khách hàng được giả định là hai tuần kể từ ngày bàn giao sản phẩm cuối cùng.
> 
> *Lịch trình tổng quát của dự án được giả định tại thời điểm ngày 10 tháng 1 năm 20xx. Nếu có vấn đề gì phát sinh phải làm lại gây ảnh hưởng tới tiến độ dự án thì cần phải điều chỉnh lại lịch trình  và báo giá chi phí phát sinh riêng dựa trên thống nhất ý kiến với công ty khách hàng.

### 6. Yêu cầu chức năng

Các yêu cầu chức năng của dự án ở giai đoạn báo giá thường không rõ ràng. Ngoài ra, cũng có nhiều trường hợp một dự án được thực hiện đồng thời bởi nhiều công ty phát triển, và các công ty kia cũng chưa nắm rõ được yêu cầu của họ. Đối với những yêu cầu không rõ ràng, hãy xem xét và viết tiền đề cho chức năng cần thực hiện. Dưới đây là một số ví dụ về các yêu cầu:

> Ví dụ:
> 
> *Chúng tôi giả định rằng chúng tôi sử dụng API XXX cho chức năng YYY.
> 
> *Nếu các yêu cầu và chức năng mới được thêm hoặc thay đổi trong lần phát triển hệ thống này, thì cần phải điều chỉnh lại lịch trình và báo giá chi phí phát sinh riêng dựa trên thống nhất ý kiến với công ty khách hàng.
> 
> *Nếu thời gian bắt đầu công việc bị thay đổi do sự chậm trễ công việc của công ty bạn hoặc các công ty phát triển khác, cần phải điều chỉnh lại lịch trình và báo giá chi phí phát sinh riêng dựa trên thống nhất ý kiến với công ty khách hàng.
> 

### 7. Phương pháp vận hành dự án

Ai sẽ quản lý tiến độ dự án và xúc tiến phát triển dự án? Điều này cần quy định rõ ràng để đảm bảo dự án được quản lý chặt chẽ và tiến hành tuần tự suôn sẻ. Việc quản lý sẽ giúp dự án biết được khi nào các tài liệu sẽ được cung cấp, ai là người thực hiện công việc gì, thực hiện trong bao lâu và khi có vấn đề phát sinh cần giải quyết như thế nào. Đây là một ví dụ:

> Ví dụ:
> 
> *Việc lập kế hoạch, xúc tiến và quản lý tiến độ của dự án sẽ được thực hiện bởi PM của 2 bên công ty.
> 
> *Thông tin cần thiết để phát triển sẽ được cung cấp vào ngày AAA được chỉ định bởi công ty khách hàng.
> 
> *Các vấn đề phát sinh, cần đưa ra quyết định đối ứng sẽ được thực hiện bởi nhóm dự án trong vòng một ngày.

Nếu không chỉ định rõ người quản lý dễ gây ra rối loạn khi có thay đổi yêu cầu dự án, lịch trình thực hiện dự án khiến công việc dự án bị gián đoạn, không thể thực hiện được.

### 8. Cơ sở hạ tầng

Phát triển hệ thống cần xây dựng môi trường phát triển và môi trường mạng. Bạn sẽ mua hay bạn sẽ mượn nó? Cần suy nghĩ cẩn thận rồi hãy quyết định. Bạn phải chắc chắn rằng bạn không phải bỏ ra vài chục triệu mua phần mềm trung gian mà bạn có thể mượn nó được. Sau đây là một ví dụ:

> Ví dụ:
> 
> *Làm việc phát triển trong công ty của chúng tôi, chúng tôi sẽ xây dựng một môi trường trên máy chủ ảo của chúng tôi và thực hiện kiểm thử trên đó.
> 
> *Làm việc phát triển trong công ty của chúng tôi, chúng tôi sẽ sử dụng Stub để liên kết với dịch vụ AAA và thực hiện kiểm thử trên đó.
> 
> *Chúng tôi giả định rằng môi trường để thực hiện kiểm thử sẽ dựa hoàn toàn trên thông tin được cung cấp bởi công ty của bạn.
> 

### 9. Kiểm thử (Test)

Nếu bạn không quyết định chính xác phải làm gì khi kiểm thử và thời gian thực hiện kiểm thử, thì khối lượng công việc khi kiểm thử sẽ bị đội lên rất nhiều với mức độ chóng mặt. Bạn có thể đưa ra giả định càng nhiều mẫu kiểm thử càng tốt và kết hợp trên nhiều hệ điều hành, trình duyệt, thiết bị đầu cuối, v.v. cho các hệ thống Web và các dự án di động. 

Khi làm báo giá bạn cần mô tả và quy định rõ ràng các phiên bản, các trình duyệt sẽ sử dụng để kiểm thử. Vì nếu không làm vậy thì chúng hoàn toàn có thể được cập nhật trong quá trình phát triển dự án. Dưới đây là một số điều kiện tiền đề trong kiểm thử và mẫu thử nghiệm (test pattern).

> Ví dụ: Công việc kiểm thử
> 
> Chúng tôi sẽ thực hiệm các kiểm thử sau đây.
> 
> * Unit test
> * Combination test
> * Comprehensive test
> * Stress test
> * Security test
> 
> Unit test sử dụng XUnit để đo phạm vi bao phủ.
> 
> Unit test không thực hiện thu thập bằng chứng và tạo báo cáo kết quả kiểm tra.

> Ví dụ: Test pattern
> 
> Thực hiện kiểm thử trên các môi trường sau:
> 
> * OS
> 
> ・ Windows 7 64 bit
> 
> ・ Windows XP SP2 32 bit
> 
> ・Hệ điều hành Mac 10.7
> 
> * Browser:
> 
> ・ IE 9
> 
> ・Chrome 17

### 10. Sản phẩm bàn giao (Deliverables)

Hầu hết các sản phẩm gia công phần mềm đều phải bàn giao cho khách hàng. Bạn hãy đề ra các giả định về danh sách sản phẩm và mức độ chi tiết của sản phẩm bàn giao để dự án không phải rơi vào hoàn cảnh "chúng tôi không làm tài liệu XXX này, chúng tôi chỉ làm tài liệu YYY này thôi" ở giai đoạn cuối cùng của dự án. 

Nếu được bạn có thể đưa ra mức độ sản phẩm bàn giao bằng template nội dung của các tài liệu thiết kế như "sơ đồ trình tự", "sơ đồ lớp", "tài liệu thiết kế cơ bản" và "tài liệu thiết kế chi tiết", tài liệu kiểm thử như "kết quả báo cáo kiểm thử", "evidence".

## IV. Tóm tắt
Tùy vào chính sách của mỗi công ty, mà điều kiện tiền đề sẽ khác nhau, nhưng về cơ bản sẽ bao gồm các thông tin trên. Đặc biệt là mục 6 và mục 7 là điều không thể thiếu. Rất khó để đưa ra một tài liệu chính xác và đầy đủ ngay từ đầu dự án, nhưng để giảm bớt những phần mơ hồ giữa khách hàng và bên phát triển cần phải đưa ra các thông tin tiền đề phát triển. Điều quan trọng là tất cả các thành viên liên quan tới dự án bao gồm nhân viên kinh doanh, kỹ sư và quản lý đều phải nhận thức được các điều kiện tiền đề rồi mới bắt đầu dự án. 

Như tôi đã nói phía trên Điều kiện tiền đề là điều quan trọng tiên quyết cho thành công của dự án về sau. Tuy nhiên, tôi nghĩ rằng việc thực hiện dự án một cách thực tế quan trọng hơn rất nhiều để chúng ta thiết lập, gây dựng mối quan hệ vững chắc đáng tin cậy với khách hàng. Thành công của dự án nằm ở chất lượng sản phẩm chúng ta tạo ra và niềm tin gặt hái được từ khách hàng.