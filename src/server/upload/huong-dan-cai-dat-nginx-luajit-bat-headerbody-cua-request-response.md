Hướng dẫn cài đặt Nginx + LuaJIT bắt Header #tuanduong122

> Bài toán đặt ra của mình: 
Nhiều lúc mình ko biết thằng vẹo Internet nào nó chèn header bậy vào hệ thống. Hoặc gặp mấy cái API đắng được bàn giao - ông đối tác bảo em cũng mới nhận code, mà ko biết nó hoạt động như nào. Mình sẽ chèn nginx (đứng trước/đứng sau) để bắt xem Header, Body chúng nó hoạt động ra sao. Từ đó ông Sys sẽ hiểu hệ thống hoạt động hơn (khổ).

![](https://images.viblo.asia/d2056a00-d3a6-402f-a3ad-6a7a88e4fcd4.PNG)


```
Mình xin đưa nguồn tham khảo trước, mình dựa vào các hướng dẫn để tối ưu vào cài đặt của mình.
1. https://cuongquach.com/cau-hinh-nginx-ghi-log-thong-tin-header-http.html #Cường Quách , có rất nhiều bài viết hay
2. Tham khảo cấu hình: https://www.hardill.me.uk/wordpress/2018/03/14/logging-requests-and-response-with-nginx/
3. Tham khảo cài đặt: https://linuxscriptshub.com/nginx-httpguard-to-block-cc-attack-centos-6-9/  #trang web nhiều cái hay :D
4. Tham khảo cài đặt: https://tarunlalwani.com/post/building-nginx-with-lua/
```


```
Version mình sử dụng:
- Nginx-1.17.10 (Bản stable mới nhất tính đến 04.2020)
- LuaJIT-2.0.5
- lua-nginx-module-0.10.13
- ngx_devel_kit-0.3.1rc1
- Áp dụng cho cả Centos6/7. Ở đây mình đang test trên bản 7 (CentOS 6 mình cũng cài đặt thành công)
```

### Bước 1: Cài đặt thư viện cơ bản hỗ trợ nginx:

```
yum install wget readline-devel pcre pcre-devel openssl openssl-devel zlib zlib-devel gcc 
```

### Bước 2: Cài đặt / Chuẩn bị LuaJIT

```
- Tải LuaJIT về và giải nén
cd /opt
wget http://luajit.org/download/LuaJIT-2.0.5.tar.gz
tar zxf LuaJIT-2.0.5.tar.gz
cd LuaJIT-2.0.5

- Chèn export ở trên đầu, lưu file lại
vim Makefile
export PREFIX= /opt/luajit-2.0.5

- Thực hiện Compile LuaJIT
make 
make install
```

Set biến môi trường tạm thời
```
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.0
```


### Bước 3: Cài đặt nginx và các thư viện:

```
cd /opt
wget http://nginx.org/download/nginx-1.17.10.tar.gz
wget https://github.com/openresty/lua-nginx-module/archive/v0.10.13.tar.gz
wget https://github.com/simplresty/ngx_devel_kit/archive/v0.3.1rc1.tar.gz
tar -xvzf nginx-1.17.10.tar.gz 
tar -xvzf v0.10.13.tar.gz 
tar -xvzf v0.3.1rc1.tar.gz 

cd nginx-1.17.10
mkdir -p /opt/nginx
mkdir /opt/nginx/logs/
mkdir /run

- Thực hiện Compile Nginx, ở đây mình đặt Nginx ở thư mục OPT ưa thích (không phải /etc)

./configure  --sbin-path=/usr/bin/nginx --prefix=/opt/nginx --conf-path=/opt/nginx/nginx.conf --error-log-path=/opt/nginx/logs/error.log --http-log-path=/opt/nginx/logs/access.log --with-pcre --pid-path=/var/run/nginx.pid --with-http_ssl_module --with-http_realip_module --with-http_stub_status_module --with-http_stub_status_module --with-http_gzip_static_module --with-http_realip_module  --with-ld-opt="-Wl,-rpath,/usr/local/lib" --add-module=/opt/lua-nginx-module-0.10.13 --add-module=/opt/ngx_devel_kit-0.3.1rc1
make
make install
```

**Tạo file khởi động cho nginx (init file)**
```
touch /etc/init.d/nginx
chmod 755 /etc/init.d/nginx
vim /etc/init.d/nginx
```
```
#!/bin/sh
#
# nginx - this script starts and stops the nginx daemon
#
# chkconfig:   - 85 15 
# description:  Nginx is an HTTP(S) server, HTTP(S) reverse \
#               proxy and IMAP/POP3 proxy server
# processname: nginx
# config:      /etc/nginx/nginx.conf
# config:      /etc/sysconfig/nginx
# pidfile:     /var/run/nginx.pid
 
# Source function library.
. /etc/rc.d/init.d/functions
 
# Source networking configuration.
. /etc/sysconfig/network
 
# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0
 
nginx="/usr/bin/nginx"
prog=$(basename $nginx)
 
NGINX_CONF_FILE="/opt/nginx/nginx.conf"
 
[ -f /etc/sysconfig/nginx ] && . /etc/sysconfig/nginx
 
lockfile=/var/lock/subsys/nginx
 
make_dirs() {
   # make required directories
   user=`$nginx -V 2>&1 | grep "configure arguments:" | sed 's/[^*]*--user=\([^ ]*\).*/\1/g' -`
   if [ -z "`grep $user /etc/passwd`" ]; then
       useradd -M -s /bin/nologin $user
   fi
   options=`$nginx -V 2>&1 | grep 'configure arguments:'`
   for opt in $options; do
       if [ `echo $opt | grep '.*-temp-path'` ]; then
           value=`echo $opt | cut -d "=" -f 2`
           if [ ! -d "$value" ]; then
               # echo "creating" $value
               mkdir -p $value && chown -R $user $value
           fi
       fi
   done
}
 
start() {
    [ -x $nginx ] || exit 5
    [ -f $NGINX_CONF_FILE ] || exit 6
#    make_dirs
    echo -n $"Starting $prog: "
    daemon $nginx -c $NGINX_CONF_FILE
    retval=$?
    echo
    [ $retval -eq 0 ] && touch $lockfile
    return $retval
}
 
stop() {
    echo -n $"Stopping $prog: "
    killproc $prog -QUIT
    retval=$?
    echo
    [ $retval -eq 0 ] && rm -f $lockfile
    return $retval
}
 
restart() {
    configtest || return $?
    stop
    sleep 1
    start
}
 
reload() {
    configtest || return $?
    echo -n $"Reloading $prog: "
    killproc $nginx -HUP
    RETVAL=$?
    echo
}
 
force_reload() {
    restart
}
 
configtest() {
  $nginx -t -c $NGINX_CONF_FILE
}
 
rh_status() {
    status $prog
}
 
rh_status_q() {
    rh_status >/dev/null 2>&1
}
 
case "$1" in
    start)
        rh_status_q && exit 0
        $1
        ;;
    stop)
        rh_status_q || exit 0
        $1
        ;;
    restart|configtest)
        $1
        ;;
    reload)
        rh_status_q || exit 7
        $1
        ;;
    force-reload)
        force_reload
        ;;
    status)
        rh_status
        ;;
    condrestart|try-restart)
        rh_status_q || exit 0
            ;;
    *)
        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
        exit 2
esac
```


**Test nginx syntax**
```
[root@localhost setup]# nginx -t
nginx: the configuration file /opt/nginx/nginx.conf syntax is ok
nginx: configuration file /opt/nginx/nginx.conf test is successful
#>>>>>>> NGON, Tạm ổn
```
**Add nginx vào systemctl và restart**
```
/etc/init.d/nginx status
Sẽ lỗi: Unit nginx.service could not be found.
--
systemctl daemon-reload
/etc/init.d/nginx restart
```
**Dọn rác khi cài:**
```
mkdir /opt/setup
cd /opt
mv LuaJIT-2.0.5                 /opt/setup/
mv LuaJIT-2.0.5.tar.gz          /opt/setup/
mv lua-nginx-module-0.10.13     /opt/setup/
mv nginx-1.17.10                /opt/setup/
mv nginx-1.17.10.tar.gz         /opt/setup/
mv ngx_devel_kit-0.3.1rc1       /opt/setup/
mv v0.10.13.tar.gz              /opt/setup/
mv v0.3.1rc1.tar.gz             /opt/setup/
```


### Bước4 : Cấu hình test LUA

(Có thể bỏ qua bước này và đi luôn vào BƯỚC 5 - ở đây mình muốn test lua hoạt động oke chưa)

Thêm location này vào nginx (có thể bỏ qua bước này và copy nguyên file config của mình ở bước dưới - BƯỚC 5):

`vim /opt/nginx/nginx.conf`

```
	location /sum {
	  content_by_lua_block {
	    local args = ngx.req.get_uri_args();
	    ngx.say(args.a + args.b)
	  }
	}
```
Test syntax nginx và reload lại
```
[root@localhost opt]# nginx -t
nginx: the configuration file /opt/nginx/nginx.conf syntax is ok
nginx: configuration file /opt/nginx/nginx.conf test is successful

[root@localhost opt]# /etc/init.d/nginx reload
Reloading nginx configuration (via systemctl):             [  OK  ]
```

TEST LUA:
```
curl "http://localhost/sum/?a=10&b=20"
Kết quả ra : 30, vậy là Lua đã hoạt động - OK :heart_eyes:
```

### Bước 5 : Cấu hình log Header/Body


Cấu hình full nginx.conf
```
#user  nobody;
worker_processes  auto;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

log_format log_req_resp '$remote_addr - $remote_user [$time_local] '
' "$request" $status $body_bytes_sent ${request_time}ms '
'| PRINT_REQUEST_BODY: $request_body '
'| PRINT_REQUEST_HEADER:"$req_header" '
'| PRINT_RESPONSE_HEADER:"$resp_header" '
'| PRINT_RESPONSE_BODY:"$resp_body" ';
                      
    access_log  logs/access.log log_req_resp;

    sendfile        on;
    keepalive_timeout  65;

#Cấu hình web_server listen Port_80
    server {
        listen       80;
        server_name  _;
	
	#Step1: Test Lua Sum
	location /sum {
	   content_by_lua_block {
	     local args = ngx.req.get_uri_args();
	     ngx.say(args.a + args.b)
	  }
	}



    location / {
       	#Step2: Config REPSONSE_BODY
       	lua_need_request_body on;
      
       	set $resp_body "";
       	body_filter_by_lua '
       	  local resp_body = string.sub(ngx.arg[1], 1, 1000)
       	  ngx.ctx.buffered = (ngx.ctx.buffered or "") .. resp_body
       	  if ngx.arg[2] then
       	     ngx.var.resp_body = ngx.ctx.buffered
       	  end
       	';
      
       	#Step3: Config REQUEST_HEADER, RESPONSE_HEADER
       	set $req_header "";
       	set $resp_header "";
       	header_filter_by_lua ' 
       	  local h = ngx.req.get_headers()
       	  for k, v in pairs(h) do
       	      ngx.var.req_header = ngx.var.req_header .. k.."="..v.." "
       	  end
       	  local rh = ngx.resp.get_headers()
       	  for k, v in pairs(rh) do
       	      ngx.var.resp_header = ngx.var.resp_header .. k.."="..v.." "
       	  end
       	';		
        
        	proxy_pass http://localhost:8080/;	  # ở đây tôi proxy vào 1 con tomcat8 test     
        }



        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```

Kiểm tra test lại nginx #nginx_syntax
```
[root@localhost nginx]# nginx -t
nginx: the configuration file /opt/nginx/nginx.conf syntax is ok
nginx: configuration file /opt/nginx/nginx.conf test is successful 

[root@localhost opt]# /etc/init.d/nginx reload
Reloading nginx configuration (via systemctl):             [  OK  ]
```


Bước: Test POST chả hạn
```
[root@localhost ROOT]# curl -X POST  -H "Host:tuanduong122.wordpress.com" -H "Tuanda:hehehe" -d '{"DUONGANHTUAN_BODY":"123"}' localhost
Kết quả: APACHE TOMCAT8 BODY
```

vào đọc log accesss:
```
tail /opt/nginx/logs/access.log
127.0.0.1 - - [24/Apr/2020:19:04:26 -0400]  "POST / HTTP/1.1" 200 20 0.346ms | PRINT_REQUEST_BODY: {\x22DUONGANHTUAN_BODY\x22:\x22123\x22} | PRINT_REQUEST_HEADER:"host=tuanduong122.wordpress.com content-type=application/x-www-form-urlencoded tuanda=hehehe accept=*/* content-length=27 user-agent=curl/7.29.0 " | PRINT_RESPONSE_HEADER:"content-length=20 set-cookie=JSESSIONID=C94254D1F47723462F60222FE865D9FB; Path=/; HttpOnly content-type=text/html;charset=ISO-8859-1 connection=keep-alive " | PRINT_RESPONSE_BODY:"APACHE TOMCAT8 BODY\x0A"
```

Phân tích Kết quả: 

**PRINT_REQUEST_BODY:** {\x22DUONGANHTUAN_BODY\x22:\x22123\x22} 

**PRINT_REQUEST_HEADER:**"host=tuanduong122.wordpress.com content-type=application/x-www-form-urlencoded tuanda=hehehe accept=*/* content-length=27 user-agent=curl/7.29.0 "

**PRINT_RESPONSE_HEADER:**"content-length=20 set-cookie=JSESSIONID=C94254D1F47723462F60222FE865D9FB; Path=/; HttpOnly content-type=text/html;charset=ISO-8859-1 connection=keep-alive "

**PRINT_RESPONSE_BODY:**"APACHE TOMCAT8 BODY\x0A"

### Other: Lua Show Request Body as Response

```
     location = /request_body {
         client_max_body_size 50k;
         client_body_buffer_size 50k;

         content_by_lua_block {
             ngx.req.read_body()  -- explicitly read the req body
             local data = ngx.req.get_body_data()
             if data then
                 ngx.say("body data:")
                 ngx.print(data)
                 return
             end

             -- body may get buffered in a temp file:
             local file = ngx.req.get_body_file()
             if file then
                 ngx.say("body is in file ", file)
             else
                 ngx.say("no body found")
             end
         }
     }
```

```
[root@tuanda conf]# curl -X GET -d '{test:123}' localhost/request_body
body data:
{test:123}
```

Lua_Nginx : https://github.com/openresty/lua-nginx-module