Hiện tại có rất nhiều tool để test độ chịu tải của server, Hôm nay mình xin giới thiệu với các bạn 1 tool khá hay để test scale của server là tsung (http://tsung.erlang-projects.org/2017/08/tsung-1.7.0-released/)

## Tsung là gì
- Tsung là một mã nguồn mở, nó được viết bằng ngôn ngữ Erlang, tsung có thế tạo ra hàng nghìn kết nối một lúc tới server, hơn thế nữa nó còn cho phép chạy song song nhiều máy (clients hoặc server) một lúc để test.
- Tsung hỗ trợ nhiều giao thức như HTTP, WebDAV, SOAP, PostgreSQL, MySQL, LDAP, Jabber/XMPP

Hôm nay mình xin giới thiệu dùng tsung để kết nối vào websocket.

## Cài đặt
Bạn thực hiện lần lượt các bước sau để cài đặt tsung.
### Cài đặt apache
- Nếu trên máy bạn chưa có apache thì chạy lệnh sau để cài đặt:
> Chú ý: Cái này dùng để xem biểu đồ được trực quan hơn thôi chứ không bắt buộc
```
  sudo apt-get install apache2
```

### Cài đặt tsung
Bạn chạy các lệnh sau đây để cài đặt
```
    sudo apt-get install -y build-essential erlang gnuplot libtemplate-perl
    sudo apt-get update
    wget http://tsung.erlang-projects.org/dist/tsung-1.7.0.tar.gz
    tar zxvf ./tsung-1.7.0.tar.gz
    cd ./tsung-1.7.0
   ./configure
   make
   sudo make install
```

sau khi cài xong bạn gõ `tsung -v` nếu thấy xuất hiện chữ `Tsung version 1.7.0` là xong rồi.

> Hiện nay version tsung mới nhất là 1.7, bạn có thể thay đổi nó để có version mới nhất `http://tsung.erlang-projects.org/dist/`

Sau khi cài đặt sau thì chạy lệnh tiếp theo để tạo thư mục tsung:
```
sudo mkdir ~/.tsung
cd ~/.tsung
```

lệnh này sẽ tạo ra một thư mục ẩn trong máy của bạn.

## Config

Tsung sử dụng xml để cấu hình:
Tạo một file là tsung.xml trong thư mục ~/.tsung với nội dung như sau
```
<?xml version="1.0"?>
<!DOCTYPE tsung SYSTEM "/usr/share/tsung/tsung-1.0.dtd">
<tsung loglevel="debug" version="1.0">
    <clients>
       <client host="localhost" use_controller_vm="true" maxusers="100000" />
    </clients>

    <servers>
        <server host="example.com" port="443" type="ssl" />
    </servers>
    <load>
        <arrivalphase phase="1" duration="200" unit="second">
            <users maxnumber="100000" arrivalrate="1000" unit="second" />
        </arrivalphase>
    </load>

    <options>
        <option name="ports_range" min="1025" max="65535"/>
    </options>

    <sessions>
        <session name="websocket" probability="100" type="ts_websocket">
            <request>
                <websocket type="connect" path="/socket/websocket"></websocket>
            </request>

            <request subst="true">
                <websocket type="message">{"topic": "room:2" "payload": {}, "ref": "1"}</websocket>
            </request>
 
            <request subst="true">
                <websocket type="message">{"topic": "room:2", "event": "new_mess", "payload": {"message" : "new users join %%ts_user_server:get_unique_id%%" }, "ref": "13"}</websocket>
            </request>
       <for var="i" from="1" to="10" incr="1">
        <thinktime value="10"/>
          <request>
               <websocket ack="no_ack" type="message">{"topic":"","event":"heartbeat","payload":{},"ref":"3"}</websocket>
         </request>
      </for>
        </session>
    </sessions>
</tsung>
```

Mình xin giải thích một chút những thông số ở trên:

- Đầu tiền là: `/usr/share/tsung/tsung-1.0.dtd` cái này là nơi tsung dc cài đặt nếu ở ubuntu thì không cần thay đổi, nếu là hệ điều hành khác thì có thể gõ `locate tsung-1.0.dtd` để xem nó đang ở đâu
```
<clients>
       <client host="localhost" use_controller_vm="true" maxusers="100000" />
</clients>
```

ở đây chỉ định xem client là gì, mình sử dụng localhost chính là máy tính cá nhận của mình thôi, có thể thay đổi là 1 vps nào đó dc cài tsung cũng dc.

```
 <servers>
        <server host="example.com" port="443" type="ssl" />
</servers>
```

Phần này chính là thông tin server của bạn muốn tes

```
<load>
    <arrivalphase phase="1" duration="100" unit="second">
        <users maxnumber="100000" arrivalrate="1000" unit="second" />
    </arrivalphase>
</load>
```

Đoạn này là số request/ 1 giây mà tsung sẽ request vào server của bạn. `arrivalrate` là thực hiện 1000 request / 1 giây, tổng thời gian test là `duration` ==> nó có thể tạo dc 100k users join vào server của bạn.

Phần sessiong chính là url nào mà bạn muốn tsung join vào thôi, có thể config tùy thuộc vào url của bạn

Sau khi thực hiện cấu hình xong thì bạn chạy lệnh sau trong thư muc ~/.tsung

```
tsung -f tsung.xml start
```


![](https://images.viblo.asia/5df38f20-935d-4336-8368-5665e2a1e48c.png)


Khi chạy xong bạn vào url sau để xem số kết nối tsung đã thực hiện được: http://localhost:8091/

## Chú ý
- Thông thường máy tính sẽ set ulimit có giới hạn, đối với ubuntu là 1024, còn mac là 256, nên khi chạy tsung chỉ có thể gennerate dc max kết nối bằng với ulimit, bạn có thể kiểm tra bằng cách gõ lệnh sau:

```
ulimit -n
```

để set lại ulimit trong session chạy đó bạn chạy lệnh:

```
ulimit -n 4000000
```

Lệnh này chỉ set ulimit trong session của terminal đó, khi tắt đi nó sẽ hết.

Bài viết của mình đến đây là hết, nếu có thắc mắc gì bạn vui lòng để lại comment phía dưới.