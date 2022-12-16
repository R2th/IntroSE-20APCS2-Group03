# State Management
Ở bài viết này mình sẽ chỉ ra chi tiết về cách **Session State** được quản lý cũng như các cách nó được quản lý ở **ASP.NET**

Hãy bắt đầu. Đầu tiên chúng ta phải hiểu tại sao chúng ta cần duy trì state của ứng dụng và tại sao lại cần quản lý state đó. Như chúng ta biết, ứng dụng web của chúng ta là "**Stateless**", nói theo cách khác 1 instance của web page class được tạo lại (recreated) mỗi lần page gửi request tới server. **HTTP** là 1 phương thức **stateless** và nó không thể giữ thông tin của client trên page. Ví dụ, nếu user chèn 1 số thông tin vào 1 page và sau đó đi sang page khác, thì data được chèn vào đó sẽ bị mất, user không thể lấy được thông tin đó.

Vì vậy cơ bản ở đây chúng ta cần 1 cái gì đó để giữ state của ứng dụng. Đây chính là nhiệm vụ chính của "**session state**". Đơn giản 1 session là 1 biến được sử dụng giữa client và server mà được lưu trữ phía server. Nó có thể được lưu trên IIS server by default ("**inproc**" mode) hoặc nó có thể lưu ở stateserver hoặc SQL Server ("**outproc**" mode). Chúng ta sẽ bàn về cả 2, "inproc" và "outproc" mode chi tiết ở ngay phần tiếp theo đây.
 
Vậy là session giúp chúng ta duy trì state và data của user trong suốt ứng dụng bằng cách lưu các thông tin đó trên server memory. Ngoài ra 1 session có thể lưu bất kì thông tin trên server side và có thể truy cập dễ dàng trong toàn bộ ứng dụng web.
 
Bây giờ hãy xem bối cảnh xảy đến của state và data của 1 user được duy trì như thế nào trong session state. Đầu tiên khi user request đến application hay 1 page,  "Application" bắt đầu fire event trong get state và application object chứa session state được share trong toàn bộ ứng dụng web. Mỗi object được lưu trong application cơ bản theo dạng Key Value. Khi một user request đến trang thì session sẽ trả về 1 data khác, khi 1 user khác request đến thì nó cũng trả về data khác, vì cơ bản data chứa 2 user này là 2 key khác nhau. Để xem các event fires khi ứng dụng được khởi tạo và thông tin session, hãy thử xem ở "**Global.asax**" khi ứng dụng bắt đầu.
 
Quá trình duy trì session state được mô tả như dưới đây. Đầu tiên client truy cập vào website và thông tin được lưu trong session. Sau đó 1 Session table được tạo ra mặc định trên IIS Server và các ID của session của các user ghé thăm trang sẽ được lưu luôn trên Server. Và lần tới khi client yêu cầu 1 vài thông tin tương ứng với session ID từ phía server, server sẽ tìm trong session provider và trả về thông tin session.
 
![](https://images.viblo.asia/5c67f532-f103-4d45-825a-a9d12ebd36fb.jpg)
FIG: PROCESS FOR MAINTAINING THE SESSION STATE IN THE APPLICATION
 
Bây giờ hãy xem cách lưu và nhận data trong session.
# Storing and retrieving data from session
Đoạn code dưới đây dùng để lưu và nhận data ở session
```
// Storing Username in session.Session[ "UserName" ] = txtUser.Text;  
// Retreiving  
values  
from  
session.// Check whether session variable null  
or not if(Session[ "UserName" ] != null) { // Retreiving UserName  
from  
session lblWelcome.text = "Welcome: +Session[" UserName "];  
}  
else  
{  
//Do something else  
} 
```
Như chúng ta biết thì những giá trị này sẽ được mặc định lưu và nhận từ session trên IIS server 
Bây giờ để có thế cấu hình web chạy load balance, chúng ta cần loại bỏ đi việc lưu Session trên IIS Server. Vì vậy chúng ta cần "**outproc**" mode. Chúng ta sẽ phân tích "**inproc**" và "**outproc**" khác nhau như thế nào khi quản lý state.

![](https://images.viblo.asia/53643d37-c9f7-49a0-b906-ddf3426532c2.jpg)
FIG: INPROC AND OUTPROC MODES IN SESSION STATE AND THEIR RESPECTIVE STATE PROVIDERS
# InProc Session Mode in Session State
![](https://images.viblo.asia/90975541-54b7-46ee-8b1a-2e2b18a5c401.jpg)
 
FIG: INPROC SESSION MODE
 
 Đây là chế độ quản lý session default ở ASP.NET. Nó lưu thông tin session ở bộ nhớ memory trong server ứng dụng IIS. Vì vậy nó rất nhanh chóng, dễ dàng và phù hợp nhất với performance của web application, nhưng điểm yếu lớn nhất là vì tất cả thông tin được lưu trữ trên server side trong cùng 1 domain application, nếu bạn khởi động lại server, tất cả data session của user sẽ bị mất. Khi client request data, State Provider đọc tất cả data từ object in-memory và trả về client. **Trong web.config, chúng ta cần chỉ cụ thể session mode và timeout.**
 ![](https://images.viblo.asia/d3d6bcaf-99c9-415e-b60c-396a5994e8c3.png)
 
**Advantages**
* Nó lưu  dữ liệu session trong object memory của cùng domain ứng dụng. Vì vậy access vào data rất nhanh và dễ dàng.
* Không yêu cầu việc serialize data lưu trữ bằng "InProc" mode
* Việc triển khai  "InProc" mode khá là dễ dàng, vì nó default, tương tự sử dụng ViewState.

**Disadvantages**
Mặc dù cơ chế "InProc" dùng để lưu trữ session là nhanh nhanh, được dùng nhiều và là default, nhưng nó có khá nhiều điểm bất lợi như sau:
* Nếu worker process hoặc domain ứng dụng bị recycled (khởi động lại), tất cả session data sẽ bị mất.
* Mặc dù nó nhanh, nhưng nhiều dữ liệu session và nhiều user có thể ảnh hưởng lớn đền performance, nếu bộ nhớ RAM của máy chủ không đủ lớn.
* Chúng ta không sử dụng được chế độ này với [Web Garden scenarios ](https://www.c-sharpcorner.com/uploadfile/nipuntomar/web-farm-and-web-garden/)
* Chế độ này cũng không phù hợp với [web Farm scenarios.](https://docs.microsoft.com/en-us/iis/web-hosting/scenario-build-a-web-farm-with-iis-servers/overview-build-a-web-farm-with-iis-servers)

Vậy chúng ta có thể kết luận là "InProc" mode có điểm mạnh là lưu trữ và nhận data session khá nhanh và thuận tiện cho việc phát triển ứng dụng web nhỏ. Nhưng InProc session data có thể bị mất nếu chúng ta khởi động lại server, hoặc là application domain bị recycled. Nó cũng không phù hợp với mô hình Web Farm hay Web Garden.

Bây giờ chúng ta sẽ xem xét với 1 option khác để giải quyết nhược điểm của InProc mode. Giải pháp đầu tiên đó là StateServer mode.
# State Server Mode (OutProc Mode)
![](https://images.viblo.asia/21763a58-7038-4ade-9e31-ade37299ec26.jpg)
![](https://images.viblo.asia/87322f73-abdd-474a-ae3a-5a0283e36921.jpg)
FIGURE: STATE SERVER MODE IN SESSION STATE 
 
StateServer còn được gọi là Out-Proc session mode. StateServer sử dụng 1 Windows Service riêng biệt độc lập với IIS và có thể chạy trên 1 server riêng biệt. Session state ở đây hoàn toàn được quản lý bởi aspnet_state.exe. Server này có thể chạy trên cùng hệ thống với web server, nhưng nó nằm ngoài vùng ảnh hưởng của application domain nơi mà web application đang chạy. Điều này có nghĩa nếu bạn khởi động lại ASP.NET process, session data của bạn vẫn còn ở đó, không bị mất như ở InProc mode. Việc triển khai OutProc có điểm bất lợi là phải serialization và deserialization các data giữa stateServer application domain, mỗi lần user muộn nhận session data, application phải chạy 1 process khác để access session data.

## Configuration for StateServer session mode

Trong StateServer mode, session data được lưu trữ ở 1 server riêng biệt, độc lập với IIS và dược hanlde bởi *aspnetstate.exe*. Process này được chạy như 1 Windows Service. Bạn có thể chạy service này từ Windows MMC hoặc từ command prompt.
![](https://images.viblo.asia/523f5055-c911-4a0c-9bed-33e95d3bbe04.jpg)
 
 Mặc định thì "Startup Type" của ASP.NET state service được set là Manual, chúng ta cần set cho nó chạy Automatic.
 ![](https://images.viblo.asia/358fcd35-e5c3-4467-8365-e6dc9808787a.jpg)
 
 Từ command prompt, gõ "net start aspnet_state". Mặc định, service này lắng nghe TCP ở cổng 42424, nhưng chúng ta có thể đổi port từ Registry editors như hình dưới đây:
 ![](https://images.viblo.asia/2db22be4-eff9-4181-b300-96f724d91b6f.jpg)
 
Bây giờ bạn hãy nhìn vào file web.config phần config cho StateServer. Chúng ta cần chỉ rõ stateConnectionString. Việc này sẽ chỉ rõ lưu session bằng state server. Mặc định thì stateConnectionString sử dụng IP 127.0.0.1 (localhost) và port 42424.
```
<configuration>  
    <system.web>  
        <sessionstate mode="StateServer"    time out="30" stateConnectionstring="tcpip=127.0.0.1"  
"tcpip=localhost:42424"  </sessionstate>  
    </system.web>  
</configuration>  
```
# Kết luận
Hi vọng bài viết có ích cho các bạn đang gặp vấn đề về quản lý State bằng Server State. 

Happy Learning! Bài viết tham khảo từ nguồn https://www.c-sharpcorner.com/UploadFile/484ad3/session-state-in-Asp-Net/