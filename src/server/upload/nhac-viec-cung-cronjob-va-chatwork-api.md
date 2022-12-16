![](https://images.viblo.asia/dacbd7d8-a7cf-450e-8566-c59f36c1c1a6.png)

## Mục tiêu:

Mình muốn tạo ra một con bot nhắc nhở công việc và động viên vào đúng lúc cần thiết =))

Mình đơn giản là dùng một account chatwork clone để gửi tin nhắn động viên, cronjob để set lịch chạy định kì khi nào sẽ gửi tin nhắn. Hết.

Lý thuyết là vậy đó, bắt đầu luôn nào (go)

## 1.Tạo chatwork clone
Đơn giản lắm, bạn vào  https://go.chatwork.com/ rồi đăng kí như hướng dẫn thôi =))

Tiếp theo, chúng ta phải kết bạn với tài khoản chính của mình để gửi tin nhắn

![](https://images.viblo.asia/e8f00d86-91f8-4ad1-984a-def50e43f0d1.png)

Và bước quan trọng nhất chính là lấy API Token, chỉ những tài khoản cá nhân mới có thể lấy API token dễ dàng được

Với những tài khoản của domain như `sun-asterisk` thì bạn cần phải có sự phê duyệt của admin thì mới có thể lấy

**Xử lí thôi:**

Các bạn nhấp vào profile của mình ở góc trên bên phải -> API setting -> API Token

Chatwork bắt bạn nhập mật khẩu để hiển thị API Token

Nếu thành công chúng ta sẽ có được như này:

![](https://images.viblo.asia/05cc3ec1-d7c0-4b36-9afd-c7f184c9f392.jpeg)

Với API Token này, chúng ta có thể lấy được bất kì message nào mà tài khoản đó có thể truy cập, hoặc có thể gửi tin nhắn trong những box mình có quyền truy cập.

## 2. Gửi message chatwork bằng `curl`

- Làm xong các bước ở phần 1 thì chúng ta sẽ có API token, cái này là nguyên liệu để mình làm tiếp bước 2, đó là gửi tin nhắn cho account chatwork chính của mình bằng lệnh `curl`

- Mọi người có thể tÌm hiểu một chút về chatwork api ở  [đây](http://developer.chatwork.com/vi/index.html) nhé, Doc khá cụ thể mà dễ đọc.

- Trong bài viết này thì mình chỉ quan tâm đến api post để gửi tin nhắn đến tài khoản chính thôi. Vậy nên mình sẽ tìm đến api post chat kèm message,  [đây nè](http://developer.chatwork.com/vi/endpoint_rooms.html#POST-rooms-room_id-messages)

- Cú pháp của API đó sẽ là 

```
curl -X POST -H "X-ChatWorkToken: API token" -d "body=Hello+ChatWork%21" "https://api.chatwork.com/v2/rooms/{room_id}/messages"
```

Đầu vào thì chúng ta cần có `API token`, `room_id`(id của room chat, kể cả có là chat private với nhau thì cũng được tính là room), `body` (là message chúng ta sẽ gửi cho nhau tình thương mến thương)

**Xử lí thôi:**

Chúng ta thử chạy câu lệnh trên nào:

```
curl -X POST -H "X-ChatWorkToken: xxxxxxxxxxxxxxxxxxx" -d "body=Hello+ChatWork%21" "https://api.chatwork.com/v2/rooms/170206592/messages"
```

Với `xxxxxxxxxxxxxxxxxxxxxxxx` là API Token mình vừa lấy được

![](https://images.viblo.asia/4cfd9c97-9d9f-4e7e-91d0-1c1304cb97bf.jpeg)

Kết quả này:

![](https://images.viblo.asia/35948805-cc18-4cb7-8c53-6e2f0126d42c.png)

Có message đàng hoàng luôn =))

Vậy là oki rồi đó, chúng ta sang bước tiếp theo nào =))


## 3. Tạo file sh để lúc hẹn giờ sẽ chạy cronjob

File `.sh ` là viết tắt của shell script. Một shell script là một file text chứa một chuỗi các lệnh cho hệ thống dựa trên UNIX / Debian / Linux / Ubuntu.

Ai muốn tìm hiểu thêm thì vào [đây nhé](https://viblo.asia/p/lam-quen-voi-shell-script-ZabG9zYzvzY6)

**Xử lí thôi:**

Mình sẽ viết một đoạn file đơn giản thôi

Tạo file:

```
vi /etc/call_me.sh
```

nội dung trong file đó sẽ là câu lệnh bên trên của mình

```
#!/bin/bash

curl -X POST -H "X-ChatWorkToken: xxxxxxxxxxxxxxxxxxx" -d "body=Hello+ChatWork%21" "https://api.chatwork.com/v2/rooms/170206592/messages"
```

Sau đó mình sẽ chạy file đó để kiểm tra xem file đó có thể gọi từ bên ngoài không

Chạy thôi:

![](https://images.viblo.asia/f69ae14a-3622-4607-a630-c85d477d7d90.png)

Với `/etc/call_me.sh` là đường dẫn file của mình

Kết quả:

![](https://images.viblo.asia/a3e32790-2bb6-4897-bed3-d2e849ed7888.png)

Vậy là chúng ta đã hoàn thành được 70% quá trình rồi đó, còn một buớc nữa thôi, đó là viết cronjob (len3)

## 4.Tạo file cronjob

Cronjob là chức năng dùng để thực thi định kì lệnh nào đó trong một khoảng thời gian được xác định trước bởi người sử dụng

Bạn có thể tìm hiểu thêm ở đây [nè](https://hocvps.com/tong-quat-ve-crontab/)

Một crontab file thường có 5 trường xác định thời gian (có thể là 6)

![](https://images.viblo.asia/089a8753-9005-4674-9d53-0d4e5f6c95f1.png)

Nếu một cột được gán ký tự `*`, nó có nghĩa là tác vụ sau đó sẽ được chạy ở mọi giá trị cho cột đó.

Bạn có thể dùng để test ở https://crontab.guru/, trang này hiển thị rất đầy đủ thông tin mà mọi người cần.

Lí thuyết vậy thôi, mình sẽ bắt đầu viết file crontab

**Xử lí thôi:**

Mình sẽ chỉnh sửa file cronjob bằng lệnh 

```
crontab -e
```

Sau đó sẽ nhập đoạn code bên dưới

```
0 8,11,13,16,18 * * * sh /etc/call_me.sh >/dev/null 2>&1
```

Nhìn đoạn code trên thì ta có thể thấy là mình sẽ hẹn giờ chạy file `/etc/call_me.sh` vào lúc 8h (Lúc vừa đến), 11h (chuẩn bị giờ cơm trưa), 13h (mới ngủ dậy), 16h (chuẩn bị giờ về), 18h (ở lại muộn)

Đọạn code:

```
>/dev/null 2>&1
```

Để nó sẽ không gửi log đến email, trong tài liệu của hocvps đã có ghi ở trên rồi

Giờ dùng 

```
crontab -l
```

Để kiểm ta lại file job đã viết nhé

và chạy lệnh

```
sudo service cron restart
```

để restart lại service cron sau khi đã chỉnh sửa

Vấn đề cuối chính là, làm sao để gửi các tin nhắn khác nhau vào các khung giờ khác nhau, tất nhiên là mình phải sửa lại file sh trên rồi 

```
#!/bin/bash

hour=$(date +%H)

if [ "$hour" = "08" ]
then
body="[info][title]Let's go !!![/title]Báo cáo công việc hôm nay nào anh ơi, Let's go!!![/info]"
elif [ "$hour" = "11" ]
then
body="[info][title]Keep moving forward!!![/title]Làm việc cẩn thận anh ơi, Keep moving forward!!![/info]"
elif [ "$hour" = "13" ]
then
body="[info][title]Keep moving forward!!![/title]Cố lên anh ơi, Keep moving forward!!![/info]"
elif [ "$hour" = "16" ]
then
body="[info][title]Keep moving forward!!![/title]Báo cáo nào anh ơi, Keep moving forward!!![/info]"
elif [ "$hour" = "18" ]
then
body="[info][title]Toang rồi!!![/title]18h rồi đấy, giờ sao nào[/info]"
fi

curl -X POST -H "X-ChatWorkToken: 3f10faa0e371f25b89bc135d5817596b" -d "body=$body" "https://api.chatwork.com/v2/rooms/170206592/messages"
```

Thành quả nào:

![](https://images.viblo.asia/de5a2548-7757-4c1b-9418-a6142199b60b.png)


Giải thích một chút:

Mình viêt file cronjob để hẹn giờ chạy file `call_me.sh` và khi file này được gọi đến, mình sẽ lấy giờ hiện tại để có thể custom cho từng message, vì format nó định dạng là 2 chữ số, nên sẽ là "08" chứ không phải chỉ là "8")

Lưu ý là cronjob chỉ chạy khi máy của bạn đang bật, nếu bạn tắt máy thì cronjob sẽ không thể chạy nữa. Vậy là phù hợp với việc đi làm phải không nào, thứ 7, chủ nhật sẽ không bị quấy rầy nữa

Vậy đó, thế là hoàn thành task hôm nay rồi

Cảm ơn mọi người đã theo dõi =))