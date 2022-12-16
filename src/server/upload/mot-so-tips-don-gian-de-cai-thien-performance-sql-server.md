Khi còn là một lập trình viên chưa có nhiều kinh nghiệm, công việc của tôi trong các project khá đơn giản. Chỉ là CRUD 1 số chức năng trong chương trình. 
Các câu lệnh SQL viết ra đơn giản chỉ là dăm ba câu update, insert, delete, select dữ liệu với một hoặc 2 bảng....
Sau này khi đã bớt gà đi một chút. Tôi được assign vào các dự án phức tạp hơn. Ban đầu thì tôi cứ nghĩ là performance chỉ phụ thuộc vào các dòng code.  Code viết tốt thì chạy càng nhanh. 
Mọi chuyện chẳng có gì để nói cho tới lúc khách hàng sử dụng chương trình một thời gian và họ bảo với chúng rôi rằng chúng tôi cần cải thiện performance. 
Bây giờ chúng tôi mới lục lọi lại xem nguyên nhân là tại sao. Sau 1 hồi loay hoay, tôi phát hiện ra rằng code của tôi hoàn toàn ổn. Vấn đề là nằm ở SQL. 
Một điều rất đơn giản mà một người lập trình viên thiếu kinh nghiệm hay gặp phải. Đó là khi tiếp cận vào code chúng tôi quá tập trung vào framework, coding convention, ....
Mà không lường trước 1 điều là sau 1 thời gian sử dụng chương trình số lượng record trong 1 table lên vài triệu.
Hãy thử tưởng tượng ntn nhé. Khi bạn bấm nút tìm kiếm. Bạn mất đến gần 10 s để có thể hiện thị kết quả trên màn hình. 
Một con số khủng khiếp phải không nào. Khi debug vào chương trình thời gian để xử lý SQL lên đến 8s. 
Ban đầu, khi số lượng record trong table truy vấn còn ít thì SQL sẽ execute rất nhỏ nên bạn sẽ không thấy được case này. 
Vậy câu hỏi đặt ra là có phải số lượng record tăng lên thì query sẽ chậm đi. Vậy thì đúng rồi quan tâm làm gì nữa. Nhiều lên thì chậm đi vấn đề tất yếu mà, care làm gì...
Đúng vậy nhiều lên thì lục lọi lâu hơn, tuy nhiên không phải lúc nào nhiều cũng chậm đâu nhé. Nguyên nhân sâu xa hơn có thể là do chính bạn đấy. Vì sao ư. 
Vì chính câu query của bạn quá lỏm.  Sau đây tôi sẽ giới thiệu một vài cách để làm việc với SQL bớt lỏm đi nhé =))

**1/ Index**

Index, quá easy phải không nào. Muốn nhanh thì đánh index thôi. Vậy có khi nào các bạn phân vân là  đánh ntn, hay thích field nào thì đánh luôn. 
Ở bài này tôi sẽ không nói lại về index là gì, và index có bao nhiêu loại nhé (cái này thì tràn lan rồi). Dưới đây tôi sẽ chỉ cho các bạn biết là nên đánh khi nào, field nào thôi. 
![](https://images.viblo.asia/4d061793-47e9-4a61-a92c-f45154307a75.png)

**2/ Coding Loop Query**

Các bạn đã bao giờ nghe đến khái niệm n+1 queries chưa.  Đơn giản thôi, bạn chạy 1 vòng for với 1000 vòng lặp 
trong mỗi vòng lặp bạn lại gọi một hoặc nhiều xử lý đến Database.  Tính sơ sơ thì đoạn code của bạn đã access hơn cả ngàn lần đến DB rồi đấy. Không cần phải giải thích thì bạn cũng biết chỗ này nguy hiểm ra sao rồi nhóe

> for (int i = 0; i < 1000; i++)
> {
>     SqlCommand cmd = new SqlCommand("INSERT INTO TBL (A,B,C) VALUES...");
>     cmd.ExecuteNonQuery();
> }

Vì vậy, hãy cố xử lý trong 1 câu query thôi nhé.

**3/ Sử dụng Subqueries**

Đã bao giờ bạn viết 1 query như bên dưới   

> SELECT c.Name, 
>        c.City,
>        (SELECT CompanyName FROM Company WHERE ID = c.CompanyID) AS CompanyName 
> FROM Customer c

Vấn đề nằm ở SELECT CompanyName FROM Company WHERE ID = c.CompanyID) AS CompanyName 

Câu lệnh này sẽ chạy theo kiểu row by row và làm giảm đi performance đáng kể. 
Để giải quyết vấn đề này chúng ta có thể sử dụng JOIN như câu query bên dưới 

> SELECT c.Name, 
>        c.City, 
>        co.CompanyName 
> FROM Customer c 
> 	LEFT JOIN Company co
> 		ON c.CompanyID = co.CompanyID
        
**4/ Select***

Khi muốn lấy thông tin của tất cả nhân viên, thường thì các bạn ít kinh nghiệm sẽ viết như sau: 

> SELECT * FROM Employees 

Đối với 1 table chỉ vài collums thì việc này không vấn đề gì. Nhưng khi vào các project lớn. Các Table không đơn giản chưa một vài thông tin đâu. mà có khi lên tới vài chục, vài trăm collum.
Riêng kéo để xem hết các collum trong table này đã mệt rồi chứ đừng nói đến việc select  cả vài chục collum của cả triệu record.
Vì vậy, để tăng performance hãy chỉ lấy ra những thông tin cần thiết thôi nhé, như câu query dưới đây chẳng hạn : 

> SELECT FirstName, City, Country FROM Employees

**5/ Sử dụng bảng tạm Temp Table**

Temp Table thường được sử dụng trong các câu truy vấn phức tạp. Nếu bạn có thể viết được 1 câu query đơn giản thì hãy làm như vậy. Hạn chế sử dụng Temp table có thể nhé.
Thường thì chúng ta sẽ sử dụng bảng tạm để làm 1 cầu nối trung gian để có để get được kết quả cuối cùng.
Khi bạn join 2 bảng với số lượng record khổng lồ. Bạn có thể tăng performance bằng các sử dụng bảng tạm. Hãy đẩy dữ liệu vào bảng tạm với câu condition cụ thể. Sau đó hãy thực hiện lệnh join
Lúc này bảng tạm sẽ có số lượng record ít hơn hẳn so với table ban đầu nên quá trình lấy dữ liệu nhanh hơn.

Tuy nhiên có 1 số điều lưu ý khi sử dụng bảng tạm để query của bạn có thể chạy nhanh nhất có thể :
    + Đánh Index cho tất cả các bảng tạm
    + Tránh sử dụng select * khi dùng bảng tạm
    + Drop ngay bảng tạm nếu không sử dụng nữa
    
**6/ Sử dụng EXISTS**
   
   Nếu bạn muốn check 1 record nào đó đã tốn tại hay chưa hãy sử dụng EXISTS() thay vì COUNT() hay IN() 
   
   Count() và in() sẽ run toàn bộ table, tính toán và đưa ra quyết định. còn EXISTS thì return ngay khi thỏa điều kiện
   
**7/ Sử dụng CASE/WHEN hoặc function() trên Where**
   
   Việc sử dụng case/when hoặc function bất kỳ trên where sẽ làm chậm đi performance đáng kể 
   Lý giải cho việc này thì case/when hoặc function sẽ được gọi trên mỗi record được thao tác.
   Lý do tiếp nữa là việc dử dụng case/when hoặc function sẽ làm mất đi index của collum đó. 
   
   
   
 **Và còn rất nhiều cách để cải thiện performance cho 1 câu queries nữa.(các bạn có thể google ... để tìm hiểu thêm ).  Nhưng ở đây tôi chỉ giới thiệu cho các bạn các lỗi hay gặp và thực sự làm giảm performance 1 cách nghiêm trọng.**