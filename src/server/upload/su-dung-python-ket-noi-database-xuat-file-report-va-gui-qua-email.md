Trong quá trình làm việc, có một số yêu cầu gửi báo cáo định kỳ hàng ngày, hàng tháng, hàng quý từ Kinh doanh sang anh em Vận hành hệ thống.

Hôm nay mình sẽ viết một bài hướng dẫn sử dụng Python để kết nối đến database xuất file báo cáo và gửi file báo cáo qua email.
Ở đây mình sử dụng database Mysql, định dạng file export là xls.

![image.png](https://images.viblo.asia/6f6cffe1-ccd7-4f6e-8785-76488db8b706.png)

**1. Chuẩn bị**
* Cài đặt thư viện mysql-connector cho việc kết nối database mysql: pip install mysql-connector-python
* Cài đặt thư viện xlwt cho việc xử lý file excel: pip install xlwt
* Cài đặt thư viện smtplib cho việc gửi email: pip install smtplib

**2. Code xử lý**

Tạo file report_python.py,  nội dung file như dưới. 

Import thư viện
```
#!/usr/bin/python
# -*- coding: utf8 -*-

import mysql.connector
import xlwt
#import datetime
from datetime import date, timedelta
import time

###Lib smpp###
import smtplib
import os.path as op
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate
from email import encoders
```

Hàm export file xls từ database Mysql
```
workbook = xlwt.Workbook(encoding ='utf-8') # workbook is the carrier on which sheet depends.
def main(sql,sheet,sheet_name):
     myconn = mysql.connector.connect(host = "10.144.xxxx.xxxx", user = "xxxx",
     passwd = "xxxx", database= "xxxx")
     cursor = myconn.cursor()
     result = cursor.execute(sql)
     #Search all results
     results = cursor.fetchall()
     # Get the data field name in MYSQL
     fields = cursor.description
     sheet = workbook.add_sheet(sheet_name,cell_overwrite_ok=True)
     # Write field information
     for field in range(0,len(fields)):
          sheet.write(0,field,fields[field][0])
         # Get and write data segment information
     row = 1
     col = 0
     for row in range(1,len(results)+1):
          for col in range(0,len(fields)):
               sheet.write(row,col,u'%s'%results[row-1][col])
     workbook.save(out_path)
```

Hàm gửi email
```
####Email##
def send_mail(send_from, send_to, subject, message, files=[],
              server="localhost", port=587, username='', password='',
               use_tls=True):
     """Compose and send email with provided info and attachments.
     Args:
        subject (str): message title
        message (str): message body
        files (list[str]): list of file paths to be attached to email
        server (str): mail server host name
        port (int): port number
        username (str): server auth username
        password (str): server auth password
        use_tls (bool): use TLS mode
     """
     msg = MIMEMultipart()
     msg['From'] = send_from
     msg['To'] = COMMASPACE.join(send_to)
     msg['Date'] = formatdate(localtime=True)
     msg['Subject'] = subject

     msg.attach(MIMEText(message))

     for path in files:
          part = MIMEBase('application', "octet-stream")
          with open(path, 'rb') as file:
               part.set_payload(file.read())
          encoders.encode_base64(part)
          part.add_header('Content-Disposition',
                        'attachment; filename="{}"'.format(op.basename(path)))
          msg.attach(part)

     smtp = smtplib.SMTP(server, port)
     if use_tls:
          smtp.starttls()
     smtp.login(username, password)
     smtp.sendmail(send_from, send_to, msg.as_string())
     smtp.quit()
```

Hàm main
```
yesterday=date.today() - timedelta(1)
filename = 'report_'+time.strftime("%Y-%m-%d")+'.xls'
out_path = '/home/ht_anhln/scripts/file/report_'+time.strftime("%Y-%m-%d")+'.xls'
sheet01 = 'report'+time.strftime("%Y-%m-%d")

#Get the data whose release time and system time are the same month
sql01 = "Câu lệnh sql các bạn cần export dữ liệu từ database"

if name == 'main':   
     main(sql01,sheet01,sheet01)
     ##Body
     localtime = time.asctime( time.localtime(time.time()) )
     Body = "File report ABC ngày: " + time.strftime("%Y-%m-%d")
     send_mail('anhln12@xxxx.vn', ['anhln12@xxxx.vn','a@xxxx.vn','b@xxxx.vn','c@xxxx.vn'], 'File report hàng ngày', Body,[out_path],'email.xxxx.vn',587,'anhln12@xxxx.vn','Password','True')
```

**3. Kết quả**
Mình đặt crontab chạy report và gửi email hàng ngày

![image.png](https://images.viblo.asia/6b649f88-2f0b-474d-a324-b0ba243ca181.png)

Bài sau mình sẽ hướng dẫn kết nối Database Oracle.