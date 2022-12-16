Hi chào các bạn, dạo này mình hay gặp vấn đề **Port Already in Use** trên Windows do mình sử dụng hơi nhiều chương trình cùng một lúc, tức là mình không thể mở chương trình vì đang có chương trình khác chiếm port đó rồi. Cái này khá là khó chịu, đôi khi bạn không biết chương trình nào đang sử dụng port đấy để mà tắt đi. Nay mình sẽ hướng dẫn các bạn xử lý vấn đề này nhé

Mình thấy có 2 cách xử lý chính:
- Bạn đang cần mở chương trình A sử dụng port 8080, tuy nhiên chương trình B đã chiếm port 8080 từ bao giờ rồi. Vậy bạn có thể tắt chương trình B đi để mở được chương trình A
- Tình huống như bên trên, tuy nhiên bạn có thể config lại chương trình A sử dụng port khác đang trống để khởi động chương trình A lên

Cá nhân mình thấy (và mình đã gặp rất nhiều trường hợp) việc config lại port default mất khá nhiều thời gian, config lại chương trình đó xong nó kéo theo các vấn đề khác nữa nên khá là mệt. Cho nên mình thường xem xét chương trình B mình có cần sử dụng nữa không thì tắt quách nó đi. Tuy nhiên giữa 1 đống service, 1 đống chương trình đang chạy ngầm thì bạn không biết được chương trình nào đang sử dụng cái port kia để tắt đi đúng không, sau đây mình sẽ hướng dẫn các bạn kiểm tra xem port đó đang chạy với chương trình nào nhé
## Đối với Linux
Ví dụ ở đây mình đang sử dụng port 8081 để mở http.server trên python
```bash
┌──(minhtuan㉿MinhTuan-ACER)-[~]
└─$ python3 -m http.server 8080                                                                                   130 ⨯
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

Giờ mình quên mất là mình đang mở nó, có rất nhiều cách để kiểm tra
### Cách 1: netstat

Sử dụng lệnh `netstat -paten` để kiểm tra các port đang sử dụng
```bash
┌──(minhtuan㉿MinhTuan-ACER)-[/mnt/c/Users/minht]
└─$ sudo netstat -paten
[sudo] password for minhtuan:
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode      PID/Program name

tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1000       16551      77/python3
```
Kiểm tra đã thấy port 8080 đang được sử dụng bởi `PID=77`, chương trình **python3**  
Kill PID 77 đi là chúng ta có thể sử dụng port 8080 rồi ;) (nhớ dùng quyền sudo đó nhé)
```bash
sudo kill -9 77
```
### Cách 2: fuser
Có cách khác là sử dụng lệnh `fuser`, tuy nhiên lệnh này không show cho chúng ta program name là gì nhưng các bạn có thể sử dụng
```bash
┌──(minhtuan㉿MinhTuan-ACER)-[/mnt/c/Users/minht]
└─$ sudo fuser 8081/tcp                                                                                             1 ⨯
8081/tcp:               77
```
Kill tương tự lệnh kill bên trên, hoặc sử dụng lệnh `sudo fuser -k 8080/tcp` là kill process được :D
### Cách 3: lsof
List các process đang lắng nghe port 8080:
```bash
┌──(minhtuan㉿MinhTuan-ACER)-[/mnt/c/Users/minht]
└─$ sudo lsof -i:8080                                                                                                    1 ⨯
COMMAND PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
python3  77 minhtuan    3u  IPv4  16551      0t0  TCP *:tproxy (LISTEN)
```
Kill toàn bộ process đang lắng nghe ở port 8080:
```bash
sudo kill $(lsof -t -i:8080)
```
## Đối với Windows
Windows thì phức tạp hơn một chút, cũng sẽ có lệnh cho các bạn sử dụng, tuy nhiên người dùng Windows không hay gõ lệnh lắm mà sử dụng giao diện, mình sẽ giới thiệu cả 2 cách nhé
### Sử dụng Task Manager
Mở **Task Manager** bằng cách chuột phải vào startbar và chọn **Task Manager**  
Mở giao diện **Resource Monitor** bằng cách chọn tab Performance và chọn nó

![](https://images.viblo.asia/0883bf70-b877-47f5-a540-bceb0c733756.png)

Sang tab Network

![](https://images.viblo.asia/dc066b24-ae01-4f78-a2ba-6e6e2f840ed0.png)

Ở đây có thể check được những port nào đang mở, PID chương trình đang sử dụng port đó là bao nhiêu, tuy nhiên mình không thể kill PID ở màn hình này được, cần chuyển sang tab **Details** của **Task Manager**

![](https://images.viblo.asia/15b02981-fb75-468c-a735-1b2a45fc5ab8.png)

Xác định được PID nào bạn muốn kill thì chuột phải chọn End task là xong

![](https://images.viblo.asia/527bf3c5-54d3-45e6-9448-1fc0dcd21558.png)


### Sử dụng Command line
Tương tự như với Linux, Windows cũng có thể sử dụng command line để tìm kiếm và kill process  
Vẫn sử dụng netstat 
```powershell
➜  ~ netstat -aon | findstr "8080"
  TCP    127.0.0.1:6767         127.0.0.1:8080         ESTABLISHED     16792
  TCP    127.0.0.1:8080         0.0.0.0:0              LISTENING       2408
  TCP    127.0.0.1:8080         127.0.0.1:6767         ESTABLISHED     2408
  ```
Cột cuối cùng chính là giá trị của PID, kill PID sử dụng câu lệnh bên dưới
```powershell
➜  ~ taskkill /PID <process_id> /F
```

### Khác
Đối với Windows thì có nhiều phần mềm có thể hiển thị và giúp chúng ta check rồi kill process dễ dàng hơn, các bạn có thể sử dụng những phần mềm đó, tuy nhiên vẫn cần phải đảm bảo an toàn nhé.
## Kết
Qua đây là một vài cách mà các bạn có thể tìm kiếm, kiểm tra và kill những process không cần thiết đang chiếm port của mình. Cảm ơn các bạn đã đọc tới đây :D. Hẹn gặp lại.