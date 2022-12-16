Khi thay đổi version của SQL server thì khái niệm mà chúng ta thường được nghe đến là Compatibility Levels. Vậy Compatibility Levels là gì và nó có ảnh hưởng như thế nào khi chúng ta thay đổi giá trị setting của nó. Trong bài viết này mình sẽ cùng tìm hiểu về nó để hi vọng có thể hiểu được lý do vì sao ứng dụng của mình có thể gặp phải error khi upgrade phiên bản database. 
## Compatibility Levels là gì
   Giả sử bạn đã cài đặt SQL Server 2012 trên một server mới của bạn. Phiên bản SQL Server 2012 này chứa một hoặc nhiều cơ sở dữ liệu mà bạn cần mainten theo thời gian. Nói SQL Server 2012 đang chạy trên server này không có nghĩa là tất cả database trong đó đều là của SQL Server 2012.
    Đối với những ứng dụng dùng database ở SQL Server 2008 chẳng hạn, ta có thể để database đó ở SQL Server 2012, rồi chỉnh compatibility level về SQL Server 2008, như vậy có thể tận dụng được những chức năng quản lý cao cấp của SQL 2012 mà vẫn hỗ trợ được ứng dụng cũ.
    Để xem compatibility level của một database, click phải vào database trong SQL Server Management Studio và chọn Properties, click vào Options tab xem như hình dưới
![](https://images.viblo.asia/adb7a7c3-ad87-43b3-a360-6ebc7feabb60.png)
    Hoặc bạn có thể xem compatibility level của database bằng cách chạy query select giá trị cột compatibility_level column của bảng sys.databases
```
USE YourDatabaseName;
GO
SELECT compatibility_level
FROM sys.databases WHERE name = 'YourDatabaseName';
GO
```
   Lý do chính để có compatibility level là để cho phép tương thích ngược(Backward Compatibility). Mỗi compatibility level có bộ tính năng riêng và bạn phải lập trình lại chúng khi phát triển ứng dụng có sử dụng database. Nếu bạn muốn chuyển database sang instance mới của SQL Serve nhưng lúc đó có tương thích ngược thì bạn phải đảm bảo compatibility level giữ nguyên. Nhưng đôi khi bạn buộc phải thay đổi nó vì instance mới của SQL Server có thể không còn hỗ trợ nữa. SQL Server instance có quan hệ với version của SQL Server mà bạn đã cài trên server. Ví dụ, nếu bạn cài SQL Server 2008 bạn có instance của SQL Server 2008. Nếu cài SQL Server Express 2014 bạn có instance của SQL Server Express 2014. Trong quá trình cài đặt bạn có thể đặt tên cho instance của mình. Bạn nên đặt tên có chứa version (VD:  SQL2016) như nhìn vào tên bạn có thể biết compatibility levels mà nó hổ trợ. Bảng bên dưới mô tả các phiên bản chính của SQL Server và các compatibility level mặc định và được hỗ trợ của chúng.   
| SQL Server Version  | Database Engine Version |Default Compatibility Level |Supported Compatibility Levels|
| -------- | -------- | -------- |-------- |
| SQL Server 2019    | 15      |  150      |150, 140, 130, 120, 110, 100 |
| SQL Server 2017(14.x)    | 14      |  140      |140, 130, 120, 110, 100 |
| Azure SQL Database single database/elastic pool  | 12      |  140      |150, 140, 130, 120, 110, 100 |
| Azure SQL Database managed instance | 12      |  140      |150, 140, 130, 120, 110, 100 |
| SQL Server 2016 (13.x)    | 13      |  130      |130, 120, 110, 100 |
| SQL Server 2014 (12.x)   | 12      |  120      |120, 110, 100 |
| SQL Server 2012 (11.x)   | 11      |  110      |110, 100, 90 |
| SQL Server 2008 R2    | 10.5    |  100      |100, 90, 80 |
| SQL Server 2008 | 10     |  100      |100, 90, 80 |
| SQL Server 2005 (9.x)| 9     |  90      | 90, 80 |
| SQL Server 2000 | 8     |  80      |80 |

## Ảnh hưởng khi thay đổi Compatibility Level
   Việc thay đổi Compatibility Level sẽ làm thay đổi bộ tính năng của database. Sẽ thêm một số chức năng mới nhưng đồng thời một số chức năng cũ sẽ bị xóa đi. Ví dụ: Mệnh đề FOR BROWSE không được phép trong các câu lệnh INSERT và SELECT INTO ở Compatibility Level 100 nhưng nó được cho phép nhưng bị bỏ qua ở Compatibility Level 90. Vì vậy, nếu ứng dụng của bạn sử dụng tính năng này, sự thay đổi này có thể đưa ra kết quả không mong muốn. (Chi tiết về các điểm khác nhau giữa các Compatibility Level thì bạn có thể đọc ở link tham khảo note ở cuối bài.)
### Trước khi thay đổi Compatibility Level
   Không bao giờ thay đổi Compatibility Level trong khi người dùng đang kết nối. Tốt hơn là bạn nên làm theo các bước sau để thực hiện đúng công việc:
1.  Thay đổi database sang mode single-user
2.  Thay đổi Compatibility Level
3.  Đặt  database lại mode multi-user

    Về cơ bản, việc thay đổi Compatibility level lên mức cao hơn là công việc thực sự có liên quan và được coi là nâng cấp thực sự. Việc này buộc bạn phải kiểm tra ứng dụng của mình và tìm bất kỳ tính năng SQL nào mà nó sử dụng, rồi cập nhật nó nếu có vấn đề xảy ra. Hãy thử và tìm user hiểu rõ ứng dụng  để test từ A đến Z của ứng dụng, đồng thời, developer cần check code để xem có vấn đề gì có thể gặp phải khi nâng cấp.
###  Coi chừng việc âm thầm upgrade
   Compatibility level cuối cùng không dùng nữa. Khi version SQL Server mới không hỗ trợ compatibility level cũ, database với compatibility level cũ được restored có thể được âm thầm upgrade lên compatibility level thấp nhất mà server hỗ trợ. Ví dụ: nếu bạn restore database SQL Server 2005 (compatibility level 90) vào version SQL Server 2014, nó sẽ được âm thầm upgrade từ 90 lên 100. Bởi 100 là level thấp nhất SQL Server 2014 hỗ trợ.
### Test ứng dụng của bạn
   Ngay cả khi không thay đổi compatibility level, bạn cũng phải luôn kiểm tra ứng dụng của mình. Bởi vì rất có thể nó sẽ cho kết quả khong mong muốn khi chạy nó và bạn sẽ phải sửa chúng trước khi tuyên bố migration thành công. Tất cả phụ thuộc vào các tính năng dữ liệu mà ứng dụng sử dụng. 
    Compatibility level luôn được dùng khi chạy Stored Procedures. Trong thực tế, tất cả chúng được recompiled khi nó thay đổi. Vì thế hãy test bất kỳ và tất cả Stored Procedures mà ứng dụng executes.
### Cú pháp thay đổi Compatibility Level bằng query
```
ALTER DATABASE YourDatabaseName  
SET COMPATIBILITY_LEVEL = { 150 | 140 | 130 | 120 | 110 | 100 | 90 }//LevelWantSetTo;  
GO 
```
Đừng nghĩ rằng backup và restore database sang instance mới hơn là tất cả những gì cần thiết để migrate database. Đây là nguyên nhân của nhiều lỗi ứng dụng ẩn và không ngờ đến. Nếu ứng dụng bị lỗi sau khi restore database, bạn hãy check lại compatibility level. Nếu có sự thay đổi thì bạn đã biết lý do rồi đấy. Compatibility level thật sự rất quan trọng trong  SQL Server.
## Link tham khảo
https://www.spiria.com/en/blog/web-applications/understanding-sql-server-compatibility-levels/

https://docs.microsoft.com/ja-jp/sql/relational-databases/databases/view-or-change-the-compatibility-level-of-a-database?view=sql-server-2017

https://docs.microsoft.com/ja-jp/sql/t-sql/statements/alter-database-transact-sql-compatibility-level?view=sql-server-2017