Hiện tại, có nhiều cách để thực hiện việc lưu lại change data khi thực hiện Insert, Update, Delete như :  triggers , so sánh bảng nguồn và bảng đích, cdc, change tracking, Row version, time stamps,… Mỗi solution đều có ưu và nhược điểm, và nhà phát triển cần lựa chọn cho phù hợp với từng hệ thống
Tài liệu này sẽ giới thiệu về cdc
1. Cơ chế hoạt động

![](https://images.viblo.asia/18908a13-04c0-43da-be8c-5a5dd99f0204.PNG)
         
Khi enable cdc, ta sẽ có 2 job. 1 capture job thực hiện ghi nhận thay đổi và 1 clean job thực hiện clear log thay đổi, để tránh quá tải hệ thống

Thứ nhất là Job capture:  
Job này sẽ thực hiện exec sp sys.sp_MScdc_capture_job để xác định parameter sau:

Continuous (default 1): 1 nếu capture job cấu hình chạy liên tục, 0 nếu chỉ chạy 1 lần

Maxtrans (default 500): số lượng transaction tối đa trong mỗi lượt scan log

Maxscans (default 10): số lượt scan log trong mỗi scan phase trước khi pausing (nếu continuous = 1) hoặc ngừng hẳn ( nếu continuous = 0)

Pollinginterval (default 5): thời gian pausing (giây) giữa mỗi scan phase

Sau khi xác định các param thì exec sp sys.sp_cdc_scan. Sp này thực hiện 2 việc là exec sp sys.sp_replcmds để đọc log, và insert log vào các bảng cdc. Mỗi lần thực hiện xong 2 việc trên là 1 lần scan maxtrans hay còn gọi là 1 log scan session 
        
![](https://images.viblo.asia/4ee3d444-eb20-44c9-881f-5d129a1d1f92.PNG)
        
![](https://images.viblo.asia/4ee3d444-eb20-44c9-881f-5d129a1d1f92.PNG)
        
 Vì Capture Process (đọc log và viết log ra bảng cdc) đọc dữ liệu từ transaction log, nên sẽ có độ trễ giữa thời điểm transaction xảy ra và thời điểm Capture Process ghi nhận thay đổi cũng như thời điểm log được ghi nhận trên cdc.table_CT. Ta sẽ nói rõ hơn về việc tối ưu độ trễ ở mục cấu hình job cdc ở phần dưới
 
Với Cleanup Job: thực hiện clean các bảng change table và mặc định là chạy định kì lúc 2h sáng để change data chỉ lưu tối đa 3 ngày. Job này sẽ được cấu hình bởi 2 tham số

Retention: thời gian(phút) bản ghi log được lưu lại trên bảng cdc

Threshold: số lượng tối đa bản ghi log trên bảng cdc bị delete ở mỗi lươt cleanup. Mỗi lần clean job chạy, sẽ có nhiều lượt cleanup để đảm bảo giá trị Retention

2. Cấu hình cdc

Để enble cdc, ta thực hiện enable cdc trên database và trên table mà ta muốn capture change data
USE MyDB  
GO  
EXEC sys.sp_cdc_enable_db  
GO  
USE MyDB  
GO  
  
EXEC sys.sp_cdc_enable_table  
@source_schema = N'dbo',  
@source_name   = N'MyTable',  
@role_name     = N'MyRole',  
@filegroup_name = N'MyDB_CT',  
@supports_net_changes = 1  
GO  
Để kiểm tra các tham số cấu hình job, ta select ở bảng msdb.dbo.cdc_jobs
       
![](https://images.viblo.asia/e2837ccf-e5f6-4f84-aaf0-df07f176c2b9.PNG)
       
Để thay đổi các tham số trên, ta thực hiện câu lệnh sau:

EXEC sp_cdc_change_job @job_type='capture', @maxtrans = 500, @maxscans = 10, @continuous = 1, @pollinginterval = 5

EXEC sp_cdc_change_job @job_type='cleanup', @retention = 4320, @threshold = 5000

Chú ý: sau khi setup lại các tham số trên, cần stop và start lại capture job

Để disable cdc trên bảng hoặc trên cả database
USE MyDB  
GO  
EXEC sys.sp_cdc_disable_db  
GO  
USE MyDB  
GO  
EXEC sys.sp_cdc_disable_table  
@source_schema = N'dbo',  
@source_name   = N'MyTable',  
@capture_instance = N'dbo_MyTable'  
GO  
3. Kết luận

Như vậy, ta đã nắm được cơ chế hoạt động và cách cấu hình cdc. Ở bài tiếp theo, chúng ta sẽ tìm hiểu cách tối ưu các tham số trong cdc