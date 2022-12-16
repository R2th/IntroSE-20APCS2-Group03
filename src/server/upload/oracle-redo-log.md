### I.  Các khái niệm cơ bản
<br>
Khi các khối dữ liệu (data block – đơn vị lưu trữ nhỏ nhất trong cơ sở dữ liệu) được cập nhật, Oracle sẽ ghi lại những thay đổi dưới dạng các vector, các vector này được gọi là "redo record". 
<br><br>
Redo log file là một file chứa các redo record, ghi lại những thay đổi của cơ sở dữ liệu. Redo log file sẽ bảo vệ tính toàn vẹn dữ liệu trong trường hợp cơ sở dữ liệu gặp trục trặc như: mất điện, hỏng ổ đĩa, … Cụ thể, sau khi cơ sở dữ liệu được phục hồi nhờ bản backup tại một thời điểm bất kỳ, Oracle sẽ apply các redo log file đã lưu trữ trong khoảng thời gian từ thời điểm đó đến lúc gặp trục trặc, giúp trạng thái của cơ sở dữ liệu đồng bộ với trạng thái ngay trước lúc xảy ra sự cố.
<br><br>
Redo log file được phân chia thành các nhóm, gọi là redo log group.

### II. Quy trình ghi redo log

![image.png](https://images.viblo.asia/d12c82b6-6531-464d-830a-474ac70c0373.png)
<br>
Khi có transaction hay bất kì action nào tác động làm thay đổi các khối dữ liệu trong cơ sở dữ liệu, redo log record sẽ được sinh ra và lưu vào “Redo log buffer” trong Global System Area (SGA). Log Writer Process (LGWR) sau đó sẽ ghi record vào các redo log file trong các group. 
<br><br>
Lưu ý rằng redo logs ảnh hưởng rất lớn tới hiệu suất hoạt động của cơ sở dữ liệu bởi chỉ khi các thay đổi được ghi vào redo log, thì việc commit mới được hoàn thành. Do đó, người quản trị nên cấu hình vị trí lưu redo log ở ổ đĩa có tốc độ đọc/ghi lớn nhất.
<br><br>
Bạn có thể kiểm tra vị trí lưu trữ redo logs khi truy vấn giá trị của tham số: 
`db_create_online_log_dest_n`
Với  1 <= n <=5
<br><br>
Ví dụ:
<br>
`SHOW PARAMETER db_create_online_log_dest_1;`
<br><br>
Cập nhật vị trí lưu redo logs:
<br>
`ALTER SYSTEM SET db_create_online_log_dest_1= '/your/path/'`