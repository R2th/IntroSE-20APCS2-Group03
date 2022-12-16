Trong quá trình phát triển, sẽ không thiếu những lúc mà chúng ta cần chạy định kỳ một vài script hoặc chạy một tác vụ nào đó vào thời gian nhất định. Những lúc như vậy thì Cron là một công cụ vô cùng hữu hiệu. 

Cron cũng rất dễ sử dụng. Tuy nhiên khi đóng gói cronjob vào Docker thì mình đã gặp một vài khó khăn và phải thử qua mấy solution mới làm nó chạy được. Do vậy mình viết bài này để ghi chú lại cách dễ thực hiện nhất, tiện sử dụng về sau, cũng như hy vọng có thể giúp được cho những bạn đang hoang mang giống mình :) 

# Cron là gì?
**Cron** là một công cụ **lập lịch công việc dựa trên thời gian** trong các hệ điều hành tương tự Unix. Cron cho phép người dùng Linux và Unix chạy các command hoặc script vào một ngày giờ nhất định cũng như lên lịch để chạy các lệnh một cách định kỳ. 

**Crontab** là danh sách các lệnh mà bạn muốn chạy theo lịch trình và cũng là tên của lệnh được sử dụng để quản lý danh sách đó. 

**python-crontab** là module Python cho phép chúng ta đọc/ viết các file crontab, cũng như truy cập cron của hệ thống một cách tự động và đơn giản bằng cách sử dụng API trực tiếp. Nó cũng cho phép chạy một crontab như một tiến trình nền nếu cài đặt thêm croniter. Nhờ thế mà mình tránh được việc phải thêm các command bằng tay để config cron của container khi viết Dockerfile, nói chung là khá tiện, gọn và không phải nhớ nhiều 😂 

(Nếu build Docker từ base image là python-alpine thì sẽ có sẵn cron nhưng nếu base image là python thì phải tự cài đặt và setting vài thứ)

# Chạy cronjob với Python trong Docker container

Mình bắt đầu với một task python cần chạy định kỳ, ví dụ in ra chữ "hello!"

**hello.py**
```
import datetime
print(datetime.datetime.now(), "------ hello!")
```

Các package cần thiết:

**requirements.txt**
```
croniter 
python-crontab
```

File crontab định nghĩa công việc, ở đây là chạy file hello.py mỗi phút một lần. 

**crontab.tab**
```
* * * * * python /full/path/to/hello.py >> /full/path/to/cron.log

```
**cron_run.py**
```
from datetime import datetime
from crontab import CronTab
tab = CronTab(tabfile='crontab.tab')
for result in tab.run_scheduler():
    print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
```
**Dockerfile**
```
FROM python:3.8
# 
WORKDIR /cronjob

# 
COPY . /cronjob

# 
RUN pip install --no-cache-dir --upgrade -r requirements.txt 

#
CMD ["python", "cron_run.py"]
```
**cron.log**
```
2022-09-26 06:00:32.478099 ------ hello!
2022-09-26 06:01:32.754784 ------ hello!
2022-09-26 06:02:33.057975 ------ hello!
2022-09-26 06:03:33.360725 ------ hello!
2022-09-26 06:04:33.781451 ------ hello!
2022-09-26 06:05:34.107770 ------ hello!
2022-09-26 06:06:34.381700 ------ hello!
2022-09-26 06:07:34.702155 ------ hello!
2022-09-26 06:08:34.997329 ------ hello!
2022-09-26 06:09:35.275052 ------ hello!
2022-09-26 06:10:35.669773 ------ hello!
```
# Notes
- Các bạn có thể tham khảo thêm các cú pháp của crontab một cách trưc quan tại [đây](https://crontab.guru/) 
- Các cronjob được schedule theo local time zone của hệ thống => cần chú ý điểm này khi làm việc với các hệ thống cho user nước ngoài
- Mỗi cronjob sẽ chạy trong một shell sessions biệt lập nên nếu muốn xem output của nó thì cần in ra file. 
- **NÊN** sử dụng đường dẫn tuyệt đối cho các script và output file

References: 

https://www.geeksforgeeks.org/how-to-schedule-python-scripts-as-cron-jobs-with-crontab/?ref=rp

https://www.geeksforgeeks.org/create-multiple-jobs-using-python-crontab/

https://nschdr.medium.com/running-scheduled-python-tasks-in-a-docker-container-bf9ea2e8a66c

https://stackoverflow.com/questions/37458287/how-to-run-a-cron-job-inside-a-docker-container