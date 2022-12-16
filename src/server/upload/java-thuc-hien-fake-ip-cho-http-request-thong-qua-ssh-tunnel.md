Tiếp theo bài viết trước sử dụng c# để fake ip cho trình duyệt, trong bài viết này mình sẽ giới thiệu fake ip cho http request bằng ngôn ngữ java, đầu tiên giới thiệu qua về ssh
# SSH port forwarding
Có 3 loại SSH port forwarding
* **Local port forwarding**: là dạng kết nối từ phía SSH client được chuyển tiếp qua SSH server, rồi đi đến host/server đích.
 ---> Thường sử dụng khi server có chặn chỉ cho phép ip nào đó access hoặc proxy
* **Remote port forwarding**: kết nối từ phía SSH server được chuyển tiếp qua SSH client, rồi đi đến host/server đích.
---> Nếu bạn hay làm việc với RDS aws mà cần debug code, thì cần sử dụng cái này để mở kết nối
* **Dynamic port forwarding**: tương tự “local port forwarding”, kết nối từ phía SSH client được chuyển tiếp qua SSH server, rồi đến đích tuỳ ý không định trước.
---> Dùng để fake ip address cho browser or pc

Trong bài viết này mình sẽ giới thiệu về ** Dynamic port forwarding**
Mở kết nối ssh tới ssh server với tuỳ chọn “-D port” với port ở đây là cổng ở phía ssh client được bật lên như socket của SOCKS server. Thông qua SOCKS này chúng ta có thể đi tới bất kỳ đâu mà ở phía ứng dụng đích đó chỉ biết chúng ta đi ra từ server B, chứ không hề biết thực sự kết nối được khởi tạo từ A.

`ssh -D 1080 username@103.89.91.8`

# Ứng dụng nhỏ thực hiện fake ip cho request http
Thư viện sử dụng
https://www.chilkatsoft.com/java.asp

## Load native code

```
static {
        try {
            System.loadLibrary("chilkat");
        } catch (UnsatisfiedLinkError e) {
            System.err.println("Native code library failed to load.\n" + e);
            System.exit(1);
        }
    }
```

## Unblock bundle

```
CkGlobal chilkatGlob = new CkGlobal();
boolean success = chilkatGlob.UnlockBundle("Anything for 30-day trial.");
if (success != true) {
    System.out.println(chilkatGlob.lastErrorText());
    return;
}
```

## Connect ssh tunnel

```
String hostname = "10.0.0.2";
String username = "www";
String password = "www";

CkSshTunnel tunnel = new CkSshTunnel();

//  Connect to an SSH server and establish the SSH tunnel:
success = tunnel.Connect(hostname,22);
if (success != true) {
    System.out.println(tunnel.lastErrorText());
    return;
}

//  Authenticate with the SSH server via a login/password
//  or with a public key.
//  This example demonstrates SSH password authentication.
success = tunnel.AuthenticatePw(username,password);
if (success != true) {
    System.out.println(tunnel.lastErrorText());
    return;
}
```

## Turn on DynamicPortForwarding
```
tunnel.put_DynamicPortForwarding(true);

// 1080: ở đây mở port 1080 để http có thể đi qua, bạn có thể mới các loại port, có thể tạo nhiều thread để mở các port khác nhau
success = tunnel.BeginAccepting(1080);
if (success != true) {
    System.out.println(tunnel.lastErrorText());
    return;
}
```

## Connect through port 1080

```
String url = "http://lumtest.com/myip.json";

CkHttp http = new CkHttp();

//  Indicate that the HTTP object is to use our portable SOCKS proxy/SSH tunnel running in our background thread.
http.put_SocksHostname("localhost");
http.put_SocksPort(1080);
http.put_SocksVersion(5);

http.put_SendCookies(true);
http.put_SaveCookies(true);
http.put_CookieDir("memory");

//  Do the HTTPS page fetch (through the SSH tunnel)
String html = http.quickGetStr(url);
if (http.get_LastMethodSuccess() != true) {
    System.out.println(http.lastErrorText());
    return;
}
```

Bạn có thể sử dụng các thư viện java http client khác mà có add socks để đi qua port 1080.


Mình đã sử dụng và làm nhiều ứng dụng liên quan đến fake ip, ngoài sử dụng https://www.bitvise.com/ là connect ổn định thì thằng chilkat khá là ổn định về mặt kết nối, và kết nối khá là nhanh
Trên là ví dụ cơ bản, bạn có thể mở rộng nó bằng cách mở rộng thêm, tạo 1 chương trình multi thread multi port. 
Bài viết tiếp theo mình sẽ sử dụng PHP hoặc python :D

## Souce code
https://github.com/ngodinhngoc/Java_SSH_Tunnel