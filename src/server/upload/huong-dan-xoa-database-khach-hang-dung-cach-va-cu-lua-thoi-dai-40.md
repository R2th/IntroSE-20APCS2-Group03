Xin chào! Lại là mình đây, và mình là một thằng đi code thuê thôi :D 

Hôm nay mình sẽ viết về một chủ đề khá là hay, khá là kiểu giật tít như tiêu đề đấy. Không phải các bạn đọc nhầm đâu nhé. :D

Để xóa database khách hàng đúng cách thì trước tiên chúng ta cần backup database đó, và chính vì thế bài viết của mình hôm nay sẽ hướng dẫn các bạn backup database bằng python :3

Nào bắt đầu thôi.

# Giới thiệu

Bạn là lập trình viên? hoặc có thể là ai đó khác nhưng có động tới database, thì điều đầu tiên sợ nhất là một ngày nọ bạn nghịch ngu và xóa luôn database. Dẫ n  đến việc sếp mắng, công ty đuổi việc, đồng nghiệp cùng team bị vạ lây ( đó là mình đang nói nếu các bạn ngu đến nỗi xóa database khách hàng thật :3 ). Còn trong bài này mình không hướng dẫn các bạn nghịch ngu như thế đâu, yên tâm đi.

Bài này của mình sẽ hướng dẫn các bạn code ra một 'tool', nói là 'tool' nghe to tát vl. Thực ra là hướng dẫn viết mấy dòng code để backup database ( phạm vi bài viết chỉ hướng dẫn backup MYSQL các bạn nhé ) cho thuận tiện, thế nhé.

Tiêu đề là mình giật tít đấy :3!

# Demo

{@embed: https://www.youtube.com/watch?v=TvaxWhRdVBI}

# Bắt đầu

Thì với mình là một thằng code Python nên trong bài viết này mình xin được phép sẽ dùng Python để múa rìu qua mắt thợ.

* Chuẩn bị: `Những thứ chuẩn bị ở đây anh/em code python chắc chắn biết cài rồi nên mình chỉ liệt kê mà không hưóng dẫn nữa nhé`
  * Python 3.6
  * Cài đặt thư viện fbchat và requests:

    ```bash
    pip install PyMySQL python-dotenv
    ```

  * **Tạo file `main.py`**: Đây là file mình sẽ code chương trình chính.
  * **Tạo file `backup.py`**: Đây là file viết code về phần backup database.
  * **Tạo file `libs.py`**: Đây là file mình sẽ code mình code cái gì cần râu ria cho project, ví dụ ở dây mình code phần gửi mail.
  * **Tạo file `.env`**: Đây là file đặt các biến môi trường.

  ![alt text](https://lh3.googleusercontent.com/7GtPxfH68M6tL2qu4iTqTWz9AFopoj7R4m6fVFbx_7HypLZjMqp0q0mzib1WakHEy_oLTmgxK5jKH5-aHZHaPCCiMG77uN3clshd3g9MC2mSFKYrM-SUxhb3Kd8ccMeJz_jQqQeUVKfzzUULvz8h8MPBWAD8eUTDKwHHqZAid73xA9urprxvEd8682EEmrXbsc-mRw5wzue6CUHDZ5uoYD5I59ov6cVKuXVlsv45uL6ldO_NADXd-eicfA6RqC5O6X9HGfZ9bHzpnT_-4X6LASGR53jzAGbg_MdLR5GWCEVYtI10NfCXILnegEJx97-I8lFyN8uKlBg0GELdAZMumIAh7GZJiTxFaBYZMN2yJ2NBPv3bCQiEGJfmoKtHTsyccFQ6TWGgBqF_Olrjcd3B1N8oWHsrlYnjf6lI_vOHmiI31MkQs59TSxZqKmjvVbF-VibYLgcR_C9pyHXyKHmZ9FF8bZT1WwhUgLamxM28qYE9rLG7PUYyKjGnQF6cw1b3-gLdvv7K1xZYPtOoo7fsMJGVkjm1i1bJqHqP-TBGd8Mpo5_7mYJ5n2S3iOqrz57FiupDe9h2wPMi88sA5qvxwQ90vrkgG55dU4Oan9tmHnoZ1BLiwov_74OiNEy0Nk1R1XTRzBUWS-5MviRm2f9MxBK82IWNxbc=w345-h304-no "Folder")

# Triển khai code

* Nội dung file `.env`

```env
#Config Mail
SMTP_SERVER="smtp.gmail.com"
SMTP_PORT="465"
SSL_TLS=ssl
FROM_MAIL=""
MAIL_PASSWORD=""
MAIL_ENCRYPTION=ssl
MAIL_RECEIVED=""
MAIL_SUBJECT="Backup Databases"
MAIL_MSG="Databases đã được backup!"

#Config Database
DB_HOST="localhost"
DB_USER=""
DB_PASSWORD=""
#DB_BACKUP_NAME có nhiều db, giữa 2 db cách nhau 1 dấu ,
DB_BACKUP_NAME=""
```

* Code `backup.py`

```python class:"lineNo"
#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import time

import pymysql as MySQLdb


def backup_mysql(user='', password='', host='', db_name=None):
    # Một số biến cần dùng cho việc xử lý bên dưới
    list_bk = []
    dbs_systems = ['information_schema', 'sys', 'performance_schema', 'mysql']
    list_db_name = []
    if db_name:
        list_db_name = db_name.split(',')

    # Cụm này chỉ là connect tới database lấy đống database vào biến results rồi đóng nó lại thôi nhé
    conn = MySQLdb.connect(host, user, password)
    cursor = conn.cursor()
    cursor.execute("SHOW DATABASES")
    results = cursor.fetchall()
    cursor.close()
    conn.close()

    # Lấy thời gian hiện tại chỉ là năm-tháng-ngày rồi tạo một folder để chứa filde backup
    timestamp = time.strftime('%Y-%m-%d')
    backup_folder = 'BK_{}'.format(timestamp)
    cmd_folder = 'mkdir -p {}'.format(backup_folder)
    os.system(cmd_folder)

    # Đoạn code backup dữ liệu chính
    for result in results:
        if db_name:
        # Nếu muốn backup theo tên một số database cụ thể
            if result[0] in list_db_name:
                backup_file_name = '{}_{}.sql.gz'.format(result[0], timestamp)

                cmd_echo = "echo 'Backup {} database to {}'".format(result[0], backup_file_name)
                os.system(cmd_echo)
                cmd_dump = 'mysqldump -u {} -h {} -p{} {} | gzip -9 --rsyncable > ./{}/{}'.format(
                    user,
                    host,
                    password,
                    result[0],
                    backup_folder,
                    backup_file_name
                )
                os.system(cmd_dump)
                print("Backup {}".format(result[0]))
                list_bk.append("{}/{}".format(backup_folder,backup_file_name))
        else:
            # Backup toàn bộ database nếu không truyền db_name vào
            if result[0] not in dbs_systems:
                backup_file_name = '{}_{}.sql.gz'.format(result[0], timestamp)
                cmd_echo = "echo 'Backup {} database to {}'".format(result[0], backup_file_name)
                os.system(cmd_echo)
                cmd_dump = 'mysqldump -u {} -h {} -p{} {} | gzip -9 --rsyncable > ./{}/{}'.format(
                    user,
                    host,
                    password,
                    result[0],
                    backup_folder,
                    backup_file_name
                )
                os.system(cmd_dump)
                print("Đã backup {}".format(result[0]))
                list_bk.append("{}/{}".format(backup_folder,backup_file_name))

    return timestamp, list_bk
```

* Code `libs.py`

```python
#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.utils import formatdate
from email import encoders

from dotenv import load_dotenv

load_dotenv()

def create_mail(mail_received, subject, text, attachs:list = None):
    msg = MIMEMultipart()

    msg['Subject'] = subject
    msg['From'] = os.getenv('FROM_MAIL')
    msg['To'] = mail_received
    msg['Date'] = formatdate()

    msg.attach(MIMEText(text, 'plain', 'utf-8'))

    if attachs:
        for attach in attachs:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(open(attach, 'rb').read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition','attachment', filename=os.path.basename(attach))

            msg.attach(part)

    return msg


def send_mail(mail_received, msg) -> None:
    if os.getenv('MAIL_ENCRYPTION') == 'ssl':
        smtp_server = smtplib.SMTP_SSL(os.getenv('SMTP_SERVER'), os.getenv('SMTP_PORT'))
        smtp_server.login(os.getenv('FROM_MAIL'), os.getenv('MAIL_PASSWORD'))
        smtp_server.sendmail(os.getenv('FROM_MAIL'), mail_received, msg.as_string())
        smtp_server.close()
    else:
        smtp_server = smtplib.SMTP(os.getenv('SMTP_SERVER'), os.getenv('SMTP_PORT'))
        smtp_server.login(os.getenv('FROM_MAIL'), os.getenv('MAIL_PASSWORD'))
        smtp_server.sendmail(os.getenv('FROM_MAIL'), mail_received, msg.as_string())
        smtp_server.close()
```

* Code `main.py`

```python
#!/usr/bin/python
# -*- coding: utf-8 -*-
import os

from dotenv import load_dotenv

from backup import backup_mysql
from libs import create_mail, send_mail

load_dotenv()

if __name__ == "__main__":

    timestamp, bks = backup_mysql(
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        db_name=os.getenv('DB_BACKUP_NAME')
    )
    if bks:
        msg = create_mail(
            mail_received=os.getenv('MAIL_RECEIVED'),
            subject=os.getenv('MAIL_SUBJECT'),
            text="{}:{}".format(timestamp, os.getenv('MAIL_MSG')),
            attachs=bks
        )
        send_mail(mail_received=os.getenv('MAIL_RECEIVED'), msg=msg)
```

# Giải thích code

* File `.env` là file cấu hình các biến môi trường. Có một số cái các bạn cầu chú ý:
  * `FROM_MAIL`: Là mail các bạn dùng để gửi đi.
  * `MAIL_PASSWORD`: Là mật khẩu mail gửi đi. Mình dùng gmail nên cần phải vào trang này để tạo mật khẩu ứng dụng <https://support.google.com/accounts/answer/185833?hl=vi>
  * `MAIL_RECEIVED`: Mail nhận file backup
  * `DB_HOST`: Tên của host database cần connect tới để backup.
  * `DB_USER`: Username để connect tới database.
  * `DB_PASSWORD`: Mật khẩu để connect database.
  * `DB_BACKUP_NAME`: Danh sách database bạn cần backup, giữa các database ngăn cách nhau bằng dấu `,`. Nếu để trống thì sẽ backup toàn bộ database nhé.

* File `backup.py` cần chú ý:
  * Biến `dbs_systems` là danh sách mấy cái db của mysql sinh ra nên không cần quan tâm mình vứt vào để loại nó ra trong quá trình backup.
  * Biến `list_bk` mình dùng để lưu lại danh sách database đã được backup thôi, anh em đọc code chắc là hiểu.
  * Biến `list_db_name` là danh sách database muốn backup.
  * Logic của nó đơn giản là: Connect tới host chứa database, xong lấy hết database có trong đó vứt vào biết `results` xong chạy 1 vòng `for` để duyệt được hết `results`, mỗi lần duyệt thì check xem tên của database đang duyệt tới đó có nằm trong danh sách mà đống tên `db_name` mà mình muốn lấy không? nếu có thì nhảy vào backup từng cái một. Nếu không thì backup toàn bộ database. Cuối cùng là trả về thời gian backup và danh sách đường dẫn file đã backup.

* File `libs.py` cần chú ý:
  * Nó là cái gửi mail cơ bản trong python thôi nên là cũng không có gì chú ý mấy. Trừ việc biến `attachs` là danh sách đường dẫn của file backup thôi :D

* File `main.py` cần chú ý:
  * File này cũng không cần chú ý nhiều, nó chỉ là gọi 2 file kia ra và dùng hàm trong đó thôi

# Chạy code

Bây giờ bạn chỉ việc điền hết cấu hình vào file `.env` và chạy:

```shell
python main.py
```

# Kết quả

* Source code: <https://github.com/nguyenmanh1997/backup-database-python>
* Sau khi làm các bước như của mình viết ở trên thì chúng ta đã có một mớ hộn độn code dùng để backup database kiểu xịn sò.
* Các bạn có thể viết cấu hình cron job cho nó chạy mỗi ngày 1 lần backup database.

==> Chúc các bạn thành công!

# Bài học rút ra

* Tiêu đề chỉ mang tính chất xào lòng là chính
* Đừng bao giờ xóa database của khách hàng!
* Đọc một bài viết thì nên đọc nội dung, đừng nên chỉ đọc mỗi tiêu đề.