### Xử lý Sự kiện với Chức năng Azure
Bây giờ đến phần thú vị của việc đăng ký các sự kiện. Trình xử lý đầu tiên của chúng tôi sẽ là một chức năng Azure. Để tìm hiểu các khái niệm cơ bản về tạo một hàm, xem bit.ly/2A6pFgu. Đối với tình huống này, tôi muốn đăng ký cụ thể các sự kiện cho nhân viên được thêm vào gần đây. Thêm vào đó, và cũng rất quan trọng, trình xử lý này chỉ được gọi cho nhân viên thuộc bộ phận kỹ thuật.

Hầu hết các ví dụ đi qua việc tạo ra một chức năng bằng cách sử dụng Azure Portal - đó là siêu dễ dàng và nhanh chóng. Tôi muốn cho bạn thấy làm thế nào để làm điều này tại local, từ Visual Studio. Điều này sẽ mở đường cho mã sản xuất sẵn sàng hơn. Tôi cũng sẽ sử dụng một tiện ích được gọi là ngrok (xem ngrok.com) để hỗ trợ debug local với Event Grid.

Nếu bạn muốn làm theo, bạn sẽ cần ngrok, cũng như một phiên bản cập nhật của Visual Studio (Tôi đã sử dụng phiên bản 15.5.2 cho bài viết này). Hãy bắt đầu bằng cách tạo một dự án mới và chọn Azure Functions từ các mẫu của Cloud. Trong hộp thoại New Project, chọn tùy chọn HTTP trigger và giữ các giá trị mặc định.

Cập nhật mã cho các chức năng để phản ánh những gì được biểu diễn trong Hình 6. Bạn có thể đổi tên tệp để phản ánh tên chức năng.

```
Figure 6 Implementation for the New Employee Event Handler>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
namespace NewEmployeeApp
{
  public static class NewEmployeeHandler
  {
    public class GridEvent<T> where T : class
    {
      public string Id { get; set; }
      public string EventType { get; set; }
      public string Subject { get; set; }
      public DateTime EventTime { get; set; }
      public T Data { get; set; }
      public string Topic { get; set; }
    }
      [FunctionName("newemployeehandler")]
      public static async Task<HttpResponseMessage> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]
        HttpRequestMessage req,
        TraceWriter log)
         {
          log.Info("New Employee Handler Triggered");
          // Retrieve the contents of the request and
          // deserialize it into a grid event object.
          var jsonContent = await req.Content.ReadAsStringAsync();
          var gridEvent =
            JsonConvert.DeserializeObject<List<GridEvent<Dictionary<string,
              string>>>>(jsonContent)
              ?.SingleOrDefault();
            // Check to see if the event is available and
            // return an error response if its missing.
            if (gridEvent == null)
            {
              return req.CreateErrorResponse(HttpStatusCode.BadRequest,
                $@"Missing event details");
            }
          // Check the header to identify the type of request
          // from Event Grid. A subscription validation request
          // must echo back the validation code.
          var gridEventType = req.Headers.GetValues("Aeg-Event-Type"). 
            FirstOrDefault();
          if (gridEventType == "SubscriptionValidation")
          {
            var code = gridEvent.Data["validationCode"];
            return req.CreateResponse(HttpStatusCode.OK,
              new { validationResponse = code });
          }
          else if (gridEventType == "Notification")
          {
            // Pseudo code: place message into a queue
            // for further processing.
            return req.CreateResponse(HttpStatusCode.OK);
          }
          else
          {
            return req.CreateErrorResponse(HttpStatusCode.BadRequest,
              $@"Unknown request type");
          }
        }
  }
}


```

Có một số code quan trọng để xem xét ở đây. Lúc đầu là một lớp được gọi là GridEvent nhằm phản ánh sơ đồ trọng tải và sự kiện từ Event Grid. Tôi sẽ đặt lớp này vào một thư viện chung để nó có thể được sử dụng lại. Đối với ví dụ này, nó được sử dụng để deserialize nội dung của yêu cầu vào một đối tượng type mạnh.

Sự kiện Lưới sẽ gửi tới các subscribers của mình hai loại yêu cầu-SubscriptionValidation and Notification- mà bạn có thể xác định bằng cách kiểm tra một giá trị từ tiêu đề. Yêu cầu Validation là rất quan trọng để đảm bảo rằng tất cả các subscriber được thêm một cách rõ ràng. Tất cả tôi phải làm ở đây là echo lại mã xác nhận để xác nhận rằng tôi có thể nhận được tin nhắn:

```
var code = gridEvent.Data["validationCode"];
return req.CreateResponse(HttpStatusCode.OK,
  new { validationResponse = code });
```

Yêu cầu Validation cũng có thể được xác định theo loại sự kiện của họ: Microsoft.EventGrid.SubscriptionValidationEvent. Nếu loại sự kiện là Notification, sau đó tôi tiến hành thực hiện business logic. Cách tiếp cận lập trình phòng thủ này rất được khuyến cáo khi tiết lộ các thiết bị đầu cuối cho các dịch vụ khác.

Các chức năng được lưu trữ trong Azure và được tham chiếu với miền azurewebsites.net, không yêu cầu logic validation đăng ký. Thay vào đó, họ sẽ được đưa vào danh sách trắng bởi Event Grid cùng với một số dịch vụ khác như Logic Apps và callbacks từ Azure Automation run books. Bởi vì tôi có kế hoạch để thử nghiệm tại local, tôi cần phải echo trở lại mã xác nhận cho sự kiện Grid để thừa nhận chức năng như là một điểm cuối hợp lệ.

Cuối cùng Event Grid runtime SDK sẽ xử lý nhiều thiết lập này, từ các sự kiện deserializing và tạo các đối tượng typed Event Grid mạnh, để tự động xác nhận các điểm cuối. Khi viết bài này, SDK thời gian chạy cập nhật chưa có sẵn.

### Local Function Testing
Hãy bắt đầu chức năng từ Visual Studio để nó chạy local trên cổng 7071. Một khi nó đang chạy, mở một dấu nhắc lệnh và sử dụng ngrok để tạo một đường hầm an toàn:

```
ngrok http -host-header=localhost 7071
```

Tôi sẽ lấy lại địa chỉ HTTPS từ ngrok để sử dụng làm điểm cuối subscriber. Địa chỉ nên giống như https://d69f6bed.ngrok.io, nhưng với một tên miền phụ khác nhau mỗi khi lệnh ngrog được thực thi. Nối thêm tuyến đường của hàm vào URL để nó giống với một cái gì đó như https: // <generated-value> .ngrok.io / api / newemployeehandler. Đây sẽ là địa chỉ điểm cuối của đăng ký sự kiện.

Với chức năng chạy và đường hầm an toàn tại chỗ, bây giờ tôi có thể tạo đăng ký sự kiện từ CLI hoặc Azure Cloud Shell:

```
az eventgrid event-subscription create --name <event-subscription-name> \
  --resource-group <resource group name> \
  --topic-name <topic name> \
  --subject-ends-with engineering \
  --included-event-type employeeAdded \
  --endpoint <function endpoint>
```

Tùy chọn, tôi có thể thêm một đăng ký sự kiện từ cổng thông tin bằng cách điền vào hộp thoại, như thể hiện trong hình 7.
![](https://images.viblo.asia/b9627e18-eecc-4dc9-bec0-231c389c9e1c.png)

### Sự kiện Xử lý: Ứng dụng Logic và WebHook

Đăng ký sự kiện tiếp theo là một Ứng dụng Logic. Giống như ví dụ về Chức năng Azure, nó chỉ quan tâm đến loại sự kiện nhân viên được thêm vào. Nó sẽ không tận dụng các bộ lọc tiền tố hoặc hậu tố, bởi vì tôi muốn gửi một thông báo cho nhân viên từ tất cả các phòng ban. Phiên bản hoàn chỉnh của Ứng dụng Logic được hiển thị trong Hình 8.

![](https://images.viblo.asia/94d890e6-96e5-40fe-8982-4a006c2c40a1.png)
Ứng dụng Logic bắt đầu với một Event Grid trigger. Chọn Microsoft.EventGrid.topics làm loại tài nguyên sẽ cho phép tôi chọn từ chủ đề tùy chỉnh trong đăng ký.

Hành động Parse JSON sẽ hữu ích trong việc truy cập các thuộc tính trong đối tượng Data. Tôi sẽ sử dụng tải trọng mẫu này để tạo ra giản đồ:

```
{
  "id": "40000",
  "eventType": "employeeAdded",
  "subject": "department/finance",
  "eventTime": "2017-12-20T10:10:20+00:00",
  "data":{
    "employeeId": "24",
    "employeeName": "David St. Hubbins",
    "employeeEmail": "david@contoso.com",
    "manager": "finance@contoso.com",
    "managerId": "10"
  }
}
```

Tiếp theo, bộ lọc cho kiểu sự kiện phải được thực hiện với hành động điều kiện. Đây là một sự khác biệt nhỏ so với cách đăng ký sự kiện đã được tạo bằng Chức năng bởi vì không có cách nào để chọn tùy chọn này trong Trình kích hoạt sự kiện Grid.

Bước cuối cùng sẽ gửi email cho nhân viên. Nó sử dụngproperties đã được lấy ra từ bước thứ hai để điền địa chỉ người nhận và chủ đề của email. Để kiểm tra ứng dụng Logic, nhấp Chạy từ nhà thiết kế và gửi một thông báo tới điểm cuối như trước.

Đăng ký sự kiện cuối cùng là một cuộc gọi lại HTTP cơ bản hoặc WebHook. Tôi sẽ cập nhật một ứng dụng ASP.NET Core hiện có với một Web API cho các sự kiện sắp tới. Mã cho WebHook sẽ rất giống với chức năng Azure tôi đã viết trước đó. Một số khác biệt tinh tế bao gồm các giá trị tiêu đề của đường được lấy ra để kiểm tra kiểu yêu cầu, như trong hình 9.

```
Figure 9 A Web API Controller That Receives Events

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace EmployeeRecords.Controllers
{
  public class GridEvent<T> where T : class
  {
    public string Id { get; set; }
    public string Subject { get; set; }
    public string EventType { get; set; }
    public T Data { get; set; }
    public DateTime EventTime { get; set; }
  }
  [Produces("application/json")]
  [Route("api/EmployeeUpdates")]
  public class EmployeeUpdatesController : Controller
  {
    private bool EventTypeSubcriptionValidation
      => HttpContext.Request.Headers["aeg-event-type"].FirstOrDefault() ==
        "SubscriptionValidation";
    private bool EventTypeNotification
      => HttpContext.Request.Headers["aeg-event-type"].FirstOrDefault() ==
        "Notification";
    [HttpPost]
    public async Task<HttpResponseMessage> Post()
    {
      using (var reader = new StreamReader(Request.Body, Encoding.UTF8))
      {
        var jsonContent = await reader.ReadToEndAsync();
        var gridEvent =
          JsonConvert.DeserializeObject<List<GridEvent<Dictionary<string,
          string>>>>(jsonContent)
            .SingleOrDefault();
        if (gridEvent == null)
        {
          return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest};
        }
        // Check the event type from Event Grid.
        if (EventTypeSubcriptionValidation)
        {
          // Retrieve the validation code and echo back.
          var validationCode = gridEvent.Data["validationCode"];
          var validationResponse =
            JsonConvert.SerializeObject(new { validationResponse =
            validationCode });
          return new HttpResponseMessage
          {
            StatusCode = HttpStatusCode.OK,
            Content = new StringContent(validationResponse)
          };
        }
        else if (EventTypeNotification)
        {
          // Pseudo code: Update records
          return new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
        }
        else
        {
          return new HttpResponseMessage { StatusCode = HttpStatusCode.BadRequest };
        }
      }
    }
  }
}


```

Khi tạo đăng ký sự kiện, loại sự kiện đã đăng ký phải là employeeRemoved. Thay đổi này đáp ứng yêu cầu người xử lý chỉ muốn nhận tin nhắn cho một nhân viên đã bị xóa khỏi tổ chức. Cũng lưu ý rằng không có bộ lọc tiền tố và hậu tố được sử dụng vì người đăng ký muốn được thông báo cho mỗi lần xảy ra, bất kể bộ phận:

```
az eventgrid event-subscription create --name <event-subscription-name> \
  --resource-group <resource group name> \
  --topic-name <topic name> \
  --included-event-type employeeRemoved \
  --endpoint <function endpoint>
```

Cuối cùng, hãy nhớ rằng endpoint  của đăng ký sự kiện phải đảm bảo. Nếu bạn tham chiếu Dịch vụ ứng dụng trên Azure, bạn phải chỉ định HTTPS trong địa chỉ hoặc thêm đăng ký sẽ không thành công.

### Đóng gói

Azure Event Grid thực sự là một dịch vụ game-changing. Trong bài này, tôi đã đề cập đến một kịch bản tích hợp ứng dụng chung. Lưới sự kiện đã được sử dụng làm công nghệ cho phép kết nối ứng dụng với các dịch vụ khác như Chức năng Azure, Ứng dụng logic và thậm chí một WebHook tùy chỉnh có thể ở bất cứ đâu. Khi được bổ sung với các ứng dụng không có máy chủ, Event Grid thực sự tỏa sáng, vì cả hai cùng nhau có thể tận dụng các tính năng tích hợp và tích hợp cực mạnh mà Azure hỗ trợ. Mã trong bài viết này có thể được tìm thấy tại github.com/dbarkol/AzureEventGrid.

Source https://msdn.microsoft.com/en-us/magazine/mt829271