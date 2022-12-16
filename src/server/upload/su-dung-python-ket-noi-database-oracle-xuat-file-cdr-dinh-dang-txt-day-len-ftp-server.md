Một nghiệp vụ mà anh em vận hành các hệ thống ứng dụng hay phải thực hiện là đẩy CDR giữa các hệ thống phục vụ các công việc: đối soát, report ... vv. Hôm nay mình sẽ viết một bài hướng dẫn về việc sử dụng Python để thực hiện công việc đó.

Mô hình thực hiện:
1. Database Oracle lưu trữ dữ liệu của ứng dụng hệ thống mình quản lý.
2. Server FTP mình được bên khác cấp thông tin account/ thư mục để đẩy CDR lên.
3. Nghiệp vụ export dữ liệu từ Database Oracle ghi ra file định dạng txt đẩy lên thư mục trên Server FTP (thư mục định dạng theo  yyyy-mm), trong trường hợp đến tháng mới tự động tạo thư mục mới trước khi đẩy file CDR. 

![image.png](https://images.viblo.asia/bbdf8d56-3f2c-4424-a169-474890e17f8a.png)

Trong đoạn code Python mình sử dụng các thư viện (cách cài đặt thêm các thư viện mình có note trong đoạn code):
* **configparser** cho việc đọc các giá trị của biến trong properties file 
* **cx_Oracle** cho việc kết nối Database Oracle
* **ftplib** kết nối FTP Server

Nội dung properties file: config.properties
```
[database]
ip_db=xxxx
port_db=1521
service_name=xxxx
user_db=xxxx
password_db=xxxx

[ftp]
ip_ftp=xxxx
user_ftp=xxxx
password_ftpd=xxxx
```

Nội dung file main.py
Nội dung source code: import thư viện, đọc các giá trị từ properties file
```
###Lib date###
import time
import datetime
import os
##pip install cx_Oracle
import cx_Oracle
import csv
## pip install configparser
import configparser

##pip install ftplib
import ftplib

##
today = datetime.date.today()
date_export = today - datetime.timedelta(1)

# Database connection variable.
connect = None

## read and get values configparser
config = configparser.ConfigParser()
config.read('config.properties')

db_url=config.get("database", "ip_db")
service_name=config.get("database", "service_name")
user_db=config.get("database", "user_db")
password_db=config.get("database", "password_db")

##
dsn_tns = cx_Oracle.makedsn(db_url, '1521', service_name=service_name)

# File path and name.
filePath = '/home/media/scripts/export_cdr_bigdatagw/cdr/'
```

Nội dung source code: check đường dẫn export file trên server tồn tại sẽ thực hiện kết nối database oracle, chạy lệnh export dữ liệu đã được định nghĩa, ghi ra file cdr định dạng txt (các giá trị biến trong file cdr cách nhau dấu ,)
```
# Check if the file path exists.
if os.path.exists(filePath):
    try:
        # Connect to database.
        connect = cx_Oracle.connect(user=user_db, password=password_db, dsn=dsn_tns)

    except cx_Oracle.DatabaseError as e:
        # Confirm unsuccessful connection and stop program execution.
        print("Database connection unsuccessful.")
        quit()
        
    # Cursor to execute query.
    cursor = connect.cursor()
    
    try:
        gen_sql_export = "SELECT SOURCE, DEST, TO_CHAR(SENT_TIME,'YYYY-MM-DD HH24:MI:SS') FROM sms_ads.SMS_LOG partition (sms_log_"+str(date_export.strftime('%Y%m%d'))+") where status = 'SENT' and contract_type_id = 1 and telco_id = 1"
        print(gen_sql_export)
        fileName =str(date_export.strftime('%Y-%m-%d'))+'.txt'
        #print(fileName)
        print("Start export cdr "+str(date_export.strftime('%Y-%m-%d')))

        # Execute query.
        cursor.execute(gen_sql_export)

        # Fetch the data returned.
        results = cursor.fetchall()

        # Extract the table headers.
        #headers = [i[0] for i in cursor.description]

        # Open text file for writing.
        textFile = csv.writer(open(filePath + fileName, 'w', newline=''),
                                    delimiter=',', lineterminator='\r\n',
                                 quoting=csv.QUOTE_NONE, escapechar='\\')

        # Add the headers and data to the text file.
        #textFile.writerow(headers)
        textFile.writerows(results)
        # Message stating export successful.
        print("Data export successful.")

    except cx_Oracle.DatabaseError as e:

        # Confirm error retrieving person information and stop program execution.
        print("Error retrieving person information.")
        quit()

    finally:

        # Close database connection.
        connect.close()

else:

    # Message stating file path does not exist.
    print("File path does not exist.")
```

Nội dung source code: đẩy file cdr lên ftp server, trong trường hợp thư mục trên ftp server chưa được khởi tạo, sẽ thực hiện khởi tạo thư mục có định dạng tên 'yyyy-mm' trước khi đẩy file cdr.
```
#####################
ip_ftp=config.get("ftp", "ip_ftp")
user_ftp=config.get("ftp", "user_ftp")
password_ftp=config.get("ftp", "password_ftpd")

month_export=str(date_export.strftime('%Y-%m'))

#ftp = FTP(ip_ftp)
#ftp.login(user_ftp, password_ftp)

os.chdir(filePath)

with ftplib.FTP(ip_ftp) as ftp:
    
    filecdr = fileName
    
    try:    
        ftp.login(user_ftp, password_ftp)  
        
        if month_export in ftp.nlst() : #check if 'foo' month_export inside 'www'
            print('YES')
            ftp.cwd(month_export)  # change into "foo" directory
            print("before upload\n", ftp.retrlines("LIST"))
            with open(filecdr, 'rb') as fp:
                res = ftp.storlines('STOR ' + filecdr, fp)
                if not res.startswith('226 Transfer complete'):
                    print('Upload failed')
            print("after upload\n", ftp.retrlines("LIST"))
            ftp.close

        else : 
            print('NO')
            ftp.mkd(month_export) #Create a new directory called foo on the server.
            ftp.cwd(month_export) # change into 'foo' directory
            print("before upload\n", ftp.retrlines("LIST"))
            with open(filecdr, 'rb') as fp:
                res = ftp.storlines('STOR ' + filecdr, fp)
                if not res.startswith('226 Transfer complete'):
                    print('Upload failed')           
            print("after upload\n", ftp.retrlines("LIST"))
            ftp.close

    except ftplib.all_errors as e:
        print('FTP error:', e)
```

Vậy là đã hoàn thành công việc, khi đặt crontab chạy bạn có thể ghi lại logs để monitor job đẩy CDR trên.