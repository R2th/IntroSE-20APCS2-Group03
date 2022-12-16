Chắc hẳn cronjob đã không còn xa lạ gì với dân dev như chúng ta, hôm nay mình xin giới thiệu việc quản lý các cronjob ứng dụng trong dự án python với package  python-crontab.
# 1. Crontab là gì
Trong quá trình quản trị hệ thống, cần phải thực hiện các background jobs trên máy chủ để thực hiện các tác vụ thông thường. Cron là một quá trình hệ thống được sử dụng để thực hiện các background tasks trên cơ sở thường xuyên. Cron yêu cầu một tệp có tên là crontab chứa danh sách các tác vụ được thực thi tại một thời điểm cụ thể. Tất cả các job này được thực hiện trong background  tại thời điểm quy định.

Cron là một tiện ích phần mềm cho phép chúng ta lên lịch các tác vụ trên các hệ thống giống Unix. Tên này bắt nguồn từ từ tiếng Hy Lạp "Chronos", có nghĩa là "thời gian". Các task trong Cron được định nghĩa trong một crontab, là một tệp văn bản chứa các lệnh được thực hiện.

Python giới thiệu cho chúng ta module crontab để quản lý các job đã lên lịch thông qua Cron. Các chức năng có sẵn trong nó cho phép chúng ta truy cập Cron, tạo công việc, đặt giới hạn, xóa công việc và hơn thế nữa. Trong bài này, chúng tôi sẽ giới thiệu cho các bạn cách sử dụng các hoạt động, chi tiết docs ở https://pypi.python.org/pypi/python-crontab.
# 2. Cú pháp trong crontab
Để xem các cron jobs đang chạy trên hệ thống của bạn: crontab -l

Lệnh trên hiển thị danh sách các job trong tệp crontab. Để thêm job cron mới vào crontab: crontab -e

Cron sử dụng một cú pháp cụ thể để xác định thời gian biểu. Nó bao gồm năm lĩnh vực, được phân cách bằng khoảng trắng. Các trường là:
```
Minute Hour Day Month Day_of_the_Week  

┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23) 
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday;
│ │ │ │ │                                       7 is also Sunday on some systems)
│ │ │ │ │
│ │ │ │ │
* * * * *  command to execute
```
giống cú pháp của gem whenever trong rails phải không =))

Cron cũng chấp nhận các ký tự đặc biệt để bạn có thể tạo ra các lịch trình thời gian phức tạp hơn. Các ký tự đặc biệt có ý nghĩa sau:

| Character | Meaning |
| Comma | Để tách nhiều giá trị |
| Hyphen     | Để chỉ ra một loạt các giá trị     |
| Asterisk     | Để chỉ ra tất cả các giá trị có thể     |
| Forward slash     | Để chỉ EVERY   |

ví dụ:
1.  ** * * * * * ** có nghĩa là: mỗi phút của mỗi giờ mỗi ngày trong tháng cho mỗi tháng cho mỗi ngày trong tuần.
2.  0 16 1,10,22 * * yêu cầu cron chạy một task lúc 4 giờ chiều (đó là giờ thứ 16) vào ngày 1, 10 và 22 hàng tháng.

# 3. Cài đặt
```bash
pip install python-crontab
```
import vào chương trình 
```bash
from crontab import CronTab
```
# 4. Truy cập vào Crontab
Có năm cách để bao gồm một job trong cron. Trong số đó, ba công trình trên Linux chỉ và hai công trình cũng có thể được sử dụng trên Windows:

Cách đầu tiên để truy cập cron là sử dụng tên người dùng. Cú pháp như sau:
```python
cron = CronTab(user='username')  
# or
cron = CronTab()
# or
cron = CronTab(user=True)  
```
Có thêm hai cú pháp cũng sẽ hoạt động trên Windows.
```python
cron = CronTab(tabfile='filename.tab')  

cron = CronTab(tab="""* * * * * command""")  
```

# 5. Tạo cronjob mới
Tạo một chương trình Python có tên là writeDate.py. Bên trong writeDate.py, để in ngày và giờ hiện tại vào một tệp
```python
import datetime
 
with open('dateInfo.txt','a') as outFile:
    outFile.write('\n' + str(datetime.datetime.now()))
```
 để writeDate.py chạy mỗi phút. Tạo một tệp có tên scheduleCron.py.
```python
from crontab import CronTab
 
my_cron = CronTab(user='nguyenchithanh')
job = my_cron.new(command='python /home/writeDate.py')
job.minute.every(1)
 
my_cron.write()
```
để chạy lập lịch
```bash
python scheduleCron.py
```
Đợi một chút và kiểm tra xem tệp dateInfo.txt với ngày giờ hiện tại. Tệp này sẽ được cập nhật từng phút và ngày và giờ hiện tại sẽ được thêm vào nội dung hiện có.
# 6. Cập nhật một job Cron hiện có
Để cập nhật một cronjob hiện có, bạn cần tìm cronjob bằng cách sử dụng lệnh hoặc bằng cách sử dụng một Id. Bạn có thể đặt Id thành cronjob dưới dạng comment khi tạo cronjob bằng python-crontab. Đây là cách bạn có thể tạo một cron job với một comment:
```python
job = my_cron.new(command='python /home/roy/writeDate.py', comment='dateinfo')
```
cập nhật cronjob:
```python
from crontab import CronTab
 
my_cron = CronTab(user='nguyenchithanh')
for job in my_cron:
    if job.comment == 'dateinfo':
    job.hour.every(10)
    my_cron.write()
    print 'Cron job modified successfully'
```
# 7. Xóa job khỏi Crontab
```python
from crontab import CronTab
 
my_cron = CronTab(user='nguyenchithanh')
for job in my_cron
    if job.comment == 'dateinfo':
        my_cron.remove(job)
        my_cron.write()
 ```
 hoặc 
```python
my_cron.remove(comment='dateinfo')

my_cron.remove_all()
```
# 8. Kiểm tra lịch job
Để làm việc này, bạn sẽ cần module croniter được cài đặt trên hệ thống của bạn.
Khi bạn đã cài đặt croniter, hãy gọi phương thức lịch biểu trên job để nhận lịch biểu job.
```python
import datetime
from crontab import CronTab
 
my_crons = CronTab(user='jay')
for job in my_crons:
    sch = job.schedule(date_from=datetime.datetime.now())
    print sch.get_next()
```
Bạn thậm chí có thể lấy lịch trước đó bằng cách sử dụng phương thức get_prev.

# 9. Đặt giới hạn
Một trong những ưu điểm chính của việc sử dụng mô-đun crontab của Python là chúng ta có thể thiết lập các hạn chế thời gian mà không cần phải sử dụng cú pháp của cron.
chúng tôi đã thấy cách thiết lập job mỗi phút.
```python
job.minute.every(minutes)  
```
Chúng tôi cũng có thể thiết lập nhiệm vụ để chạy vào những ngày nhất định trong tuần
```python
job.dow.on('SUN', 'FRI')  
```
Một điều quan trọng cần xem xét là mỗi khi chúng tôi đặt ra giới hạn thời gian, chúng tôi sẽ hủy bỏ giới hạn trước đó
```python
job.hour.every(5)  
job.hour.every(7)  
```
Trừ khi, chúng tôi thêm lịch biểu vào lịch trước đó
```python
job.hour.every(15)  
job.hour.also.on(3)  
```
# 10. Enabling and Disabling a Job
Để bật job: 
```python
job.enable ()
```
Để tắt job: 
```python
job.enable (False)
để kiểm tra : job.is_enabled()  

```
#11. Kiểm tra hiệu lực và tìm kiếm 
xác thực 
```python
job.is_valid()  
```
Tìm kiếm :
```python
cron.find_command("command name")  
Here 'command name' can be a sub-match or a regular expression.

Find according to comment:

cron.find_comment("comment")  
Find according to time:

cron.find_time(time schedule)  
```
nguồn: http://stackabuse.com/scheduling-jobs-with-python-crontab/,

https://code.tutsplus.com/tutorials/managing-cron-jobs-using-python--cms-28231