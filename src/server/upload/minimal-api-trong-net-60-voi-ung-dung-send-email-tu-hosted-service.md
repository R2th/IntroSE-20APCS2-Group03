Microsoft vừa phát hành Visual Studio 2022 bản Preview, khá là ngon, đi kèm với nó là .NET 6.0, rất nhiều tính năng mới, mạnh mẽ.
Mình khá thích Minimal API của NET 6, nên mình muốn thông qua ví dụ nhỏ này, giới thiệu đến mọi người tính năng mà mình đánh giá khá hay của NET 6

Trong tutorial này, chúng ta sẽ giải quyết 1 case study thường gặp, đó là gửi email. Vậy có những vấn đề gì với case này ?
Như chúng ta đã biết, việc gửi email chúng ta có thể làm bằng nhiều cách khác nhau, ví dụ : Gửi bằng STMP, Gửi bằng 3rd party...vv
Cách nào cũng vậy, đều có độ trễ nhất định để delivery một email, và case study mình gặp như sau :
*  Có 1 task làm 1 công việc gì đó tầm 3~5s, sau đó gửi email
*  Vì task đó đã mất tầm 3~5s, mình nới tay cho hẳn 5s luôn, email gửi mất thêm tầm 1s ~ 2s (tính riêng request gửi, chưa tính effort xử lý template email như binding model...vv)
=> Độ trễ nếu dùng async - await cho những action trên sẽ là 5+2 = 7s, ít nhất là 7 giây cho 1 request API, nghe rất lậu :(
Đó là chưa kể, nếu action gửi mail đó cần gửi cho nhiều người khác nhau, mỗi người 1 nội dung email khác nhau nữa, ko lẽ 2 * n với n là số email cần gửi ???
=> Câu trả lời là ta có thể optimize request đó về 3~5s đúng theo cái task cần làm, còn việc await email ta có thể gửi xuống 1 Hosted Service để xử lý
Hoặc mạnh dạn hơn, ta có thể gửi luôn cái Task 3~5s đó xuống 1 Hosted Service khác, và notify cho Client bằng SignalR, nhưng cái đó out scope của tutorial này ^^ Hẹn các bạn trong bài khác
Vậy, phương án xử lý cho vấn đề trên, ta sẽ dùng Hosted Service, gửi mail thì mình dùng MailJet Service nhé
Công cụ cần thiết cho bài tutorial này
1. Visual Studio 2012 Preview (Mình xài bản Enterprise)
2. MailJet Account (dùng để gửi email) - https://www.mailjet.com/
======
Ok, bắt đầu thôi, tạo mới một dự án
![image.png](https://images.viblo.asia/f34fca31-61dd-413a-b68c-4698ca6741ef.png)
Chọn ASP.NET Core Web API

Tiếp theo, đặt tên cho project
![image.png](https://images.viblo.asia/f0a93ced-31df-45e0-b695-29dc3b058709.png)

Bỏ tick phần "Use controllers..." => Vì chúng ta muốn viết API gọn nhẹ như NODE.JS , sử dụng Minimal API
![image.png](https://images.viblo.asia/e2e4fffc-ab18-4af2-8c7c-b408ba9ade80.png)


Mở Program.cs lên và nhìn code ví dụ của Microsoft, khá ngắn gọn cho endpoint **GetWeatherForecast**
```
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
       new WeatherForecast
       (
           DateTime.Now.AddDays(index),
           Random.Shared.Next(-20, 55),
           summaries[Random.Shared.Next(summaries.Length)]
       ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

internal record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```

Okay, bây giờ ta sẽ  tạo một Class Library tên là "**SendEmail.Core**", và sẽ đặt code nghiệp vụ gửi Email tại đây
Right click vào Solution -> Add -> New Project
![image.png](https://images.viblo.asia/fe7c9c69-b1d6-47e3-9566-077ca98f6fad.png)

Sau đó, chọn "**Class Library**", bấm Next
![image.png](https://images.viblo.asia/d2f05780-5bb9-43c4-8f72-94dab12a1c0e.png)

Đặt tên project là "**SendEmail.Core**"
![image.png](https://images.viblo.asia/4b7ddb9e-3b37-496d-ac8e-064d3a412a81.png)

Bây giờ Solution chúng ta sẽ có 2 project
![image.png](https://images.viblo.asia/44399661-6243-4a94-9c97-a5117db1ef07.png)

Okay, trong **SendEmail.Core**, đầu tiên tạo Model cho Email
![image.png](https://images.viblo.asia/bd67ad6a-37e7-4348-9b25-084a0e09ee8b.png)

Nội dung của lớp EmailModel.cs
```
namespace SendEmail.Core.Common.EmailModel
{
    public class EmailModel
    {
        public string EmailAddress { get; set; } = String.Empty;
        public string Subject { get; set; } = String.Empty;
        public string Body { get; set; } = String.Empty;
        public IEnumerable<MyAttachment>? Attachments { get; set; }
    }
    public class MyAttachment
    {
        public string ContentType { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public byte[] Data { get; set; } = new byte[10];
    }
}

```

Tiếp theo, chúng ta sẽ tạo một abstract class là **MailSender**, trách nhiệm của nó là sẽ gửi email
![image.png](https://images.viblo.asia/34c7ecd2-8d7f-4b5e-aa60-e59bae4169db.png)
Nội dung file MailSender.cs
```
 public abstract class MailSender : IMailSender
    {
        
    }
```

Tạo interface để implement
![image.png](https://images.viblo.asia/57ce7183-17f8-4d8b-a283-e7472b20f6e1.png)
Nội dung file IMailSender.cs
```
using SendEmail.Core.Common.EmailModel;

namespace SendEmail.Core.Interfaces
{
    public interface IMailSender
    {
        Task SendEmail(string address, string subject, string text);
        Task SendEmail(EmailModel email);
    }
}
```

Sau đó, quay lại MailSender để implement interface, trước tiên, ta cần library của Mailjet để gửi email, add bằng Nuget
Tại project "**SendEmail.Core**", right click vào **Dependencies -> Manage Nuget Packages...**
![image.png](https://images.viblo.asia/aaf3910c-83c3-49cd-9068-fec955af5c57.png)

Chọn tab "Browser", gõ vào "Mailjet"
![image.png](https://images.viblo.asia/7e8a5fe9-1669-423c-afa6-5dc702d3e8a0.png)
Tiến hành cài đặt Mailjet.Api

Sau đó, quay lại MailSender.cs, khai báo function static để tạo mới Client gửi email

```
 using Mailjet.Client;
using SendEmail.Core.Interfaces;

namespace SendEmail.Core.Common.MailSender
{
    public abstract class MailSender : IMailSender
    {
        public static MailjetClient CreateMailJetV3Client()
        {
            return new MailjetClient("<API KEY>", "<SECRET KEY>");
        }
        protected abstract Task Send(EmailModel.EmailModel email);
        public Task SendEmail(string address, string subject, string text)
        {
            return SendEmail(new EmailModel.EmailModel { EmailAddress = address, Subject = subject, Body = text });
        }

        public Task SendEmail(EmailModel.EmailModel email)
        {
            return Send(email);
        }
    }
}

```
Chú ý :
**ApiKey** và **Secret** Key các bạn tự điền vào, các bạn có thể get từ MailJet

Xong, việc tiếp theo, là chúng ta sẽ implement function virtual "Send" của lớp MailSender, vì chúng ta đang xài MailJet nên chúng ta sẽ implement cái action Send này theo kiểu Mailjet, sau này, nếu có thêm nhiều service cần hỗ trợ như :Send Grid, Custom SMTP...vv thì ta sẽ implement tiếp ^^

Tạo 1 lớp MailJetService.cs
![image.png](https://images.viblo.asia/d7521d2c-bf6e-4759-ad54-0ca5470e586e.png)
Chú ý: Vì trong class này có sử dụng JArray, JObject, nên các bạn cần cài thêm **Newtonsoft.Json** vào project **SendEmail.Core **tương tự cách cài **Mailjet.Client **nhé

Nội dung lớp MailjetService.cs
```
using Mailjet.Client;
using Newtonsoft.Json.Linq;
using SendEmail.Core.Interfaces;

namespace SendEmail.Core.Common.EmailProvider
{
    public class MailJetService : MailSender.MailSender, IMailSender
    {
        protected override async Task Send(EmailModel.EmailModel email)
        {
            try
            {
                JArray jArray = new JArray();
                JArray attachments = new JArray();
                if (email.Attachments != null && email.Attachments.Count() > 0)
                {

                    email.Attachments.ToList().ForEach(attachment =>
                    attachments.Add(
                        new JObject {
                            new JProperty("Content-type",attachment.ContentType),
                            new JProperty( "Filename",attachment.Name),
                            new JProperty("content",Convert.ToBase64String(attachment.Data))
                    }));
                }

                jArray.Add(new JObject {
                            {
                            "FromEmail",
                            "<your email configuration on MailJet>"
                            }, {
                            "FromName",
                            "<Your Name>"
                            }, {
                            "Recipients",
                            new JArray {
                                new JObject {
                                {
                                    "Email",
                                    email.EmailAddress
                                }, {
                                    "Name",
                                   email.EmailAddress
                                }
                                }
                            }
                            }, {
                            "Subject",
                            email.Subject
                            }, {
                            "Text-part",
                            email.Body
                            }, {
                            "Html-part",
                            email.Body
                            },  {
                            "Attachments",
                            attachments
                            }});

                var client = MailSender.MailSender.CreateMailJetV3Client();
                MailjetRequest request = new MailjetRequest
                {
                    Resource = Mailjet.Client.Resources.Send.Resource,
                }
                 .Property(Mailjet.Client.Resources.Send.Messages, jArray);

                var response = await client.PostAsync(request);
                Console.WriteLine(response.StatusCode);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

```
==============================================
Phần trên là business gửi Email, bây giờ, ta sẽ tạo một HostedService để thực thi việc này trong background
HostedService là một interface đến từ **Microsoft.Extensions.Hosting** , các bạn cũng cần cài nó từ **Nuget Packages**
![image.png](https://images.viblo.asia/4f1f998e-d53a-4e77-b285-b0d9005de2f3.png)

Sau đó implement các method missing của interfaces
```
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SendEmail.Core.Common.EmailModel;
using SendEmail.Core.Common.EmailProvider;
using SendEmail.Core.Interfaces;
using System.Threading.Tasks.Dataflow;

namespace SendEmail.Core.HostedService
{
    public class EmailHostedService : IHostedService, IDisposable
    {
        private Task? _sendTask;
        private CancellationTokenSource? _cancellationTokenSource;
        private readonly BufferBlock<EmailModel> _mailQueue;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly IMailSender _mailSender;

        public EmailHostedService(IServiceScopeFactory serviceScopeFactory)
        {

            _mailSender = new MailJetService(); ;
            _serviceScopeFactory = serviceScopeFactory;
            _cancellationTokenSource = new CancellationTokenSource();
            _mailQueue = new BufferBlock<EmailModel>();
        }
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}

```

Tiến hành code cho các method này, đầu tiên, khi **Dispose**, chúng ta sẽ hủy các Task
```
  private void DestroyTask()
        {
            try
            {
                if (_cancellationTokenSource != null)
                {
                    _cancellationTokenSource.Cancel();
                    _cancellationTokenSource = null;
                }
                Console.WriteLine("[EMAIL HOSTED SERVICE] DESTROY SERVICE");
            }
            catch
            {

            }
        }
        public void Dispose()
        {
            DestroyTask(); throw new NotImplementedException();
        }
```

Khi khởi động Service, ta sẽ thực hiện viện lắng nghe action gửi mail thông qua BufferBlock
```
 private async Task BackgroundSendEmailAsync(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                try
                {
                    var email = await _mailQueue.ReceiveAsync();
                    await _mailSender.SendEmail(email);
                }
                catch (OperationCanceledException)
                {
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[BACKGROUND EMAIL SERVICE] {ex.Message}", "EmailHostedService");
                }
                Console.WriteLine("[BACKGROUND EMAIL SERVICE] END SEND", "EmailHostedService");
            }
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _sendTask = BackgroundSendEmailAsync(_cancellationTokenSource!.Token);
            return Task.CompletedTask;
        }
```

Và kill task khi StopService
```
public async Task StopAsync(CancellationToken cancellationToken)
        {
            DestroyTask();
            await Task.WhenAny(_sendTask!, Task.Delay(Timeout.Infinite, cancellationToken));
        }
```
Cuối cùng, add function để gọi action gửi mail của Hosted Service từ các Controller khác
```
  public async Task SendEmailAsync(EmailModel emailWithAddress)
        {
            await _mailQueue.SendAsync(emailWithAddress);
            Console.WriteLine($"SEND {emailWithAddress.EmailAddress}");
        }
```

Okay, vậy là phần core gửi mail của chúng ta đã xong, quay lại project "**SendEmail.WebAPI**" để tích hợp thôi nào
Xóa code mẫu của MS, tạo một code mới của chúng ta
```
app.MapGet("/test-email", () =>
{
    return Results.Ok();
})
```
Tiến hành inject HostedService
![image.png](https://images.viblo.asia/51a5557c-2c97-4ce5-b750-7b79200803ce.png)
Resolve error
![image.png](https://images.viblo.asia/f1646844-ab7e-4c18-9f80-2bad8492d2d2.png)

Gọi Service đã được inject ở trong request
![image.png](https://images.viblo.asia/bd7ee3bd-1574-4723-9fef-7f5e7b44878a.png)

Xong ! Chạy và test thôi, request vào endpoint rất nhanh
![image.png](https://images.viblo.asia/45aad88c-3a09-4235-9982-c82df7aa3e98.png)
Background nhận lệnh và gửi email
![image.png](https://images.viblo.asia/b6887db0-4113-4e2c-b60a-1d38cce3a6d4.png)
Và kết quả nhận đc
![image.png](https://images.viblo.asia/e1cb578a-e8ef-40a1-a98f-cc02f18b9439.png)

Vậy, chúng ta đã xử lý được việc transparent cái quá trình gửi Email với phía Client, bảo vệ được request time rất nhanh, ko phụ thuộc vào action SendEmail

Nhưng, có 1 số vấn đề chúng ta cần care:
- Giả sử khi Email đang được Hosted Service xử lý nhưng chúng ta restart App, những email trong queue sẽ bị mất, không được gửi => thất lạc email
- Những email gửi đến cho MailJet xử lý, gửi được hay không là do MailJet => Ta muốn lưu những email không gửi thành công để kiểm tra (k muốn dựa vào Dashboard của Mailjet), muốn thống kê riêng...vv ?
===>
Đó là những vấn đề ta cần giải quyết, trong bài viết tiếp theo, mình sẽ trình bày giải pháp của mình, mong các bạn góp ý

Thân chào, chúc các bạn thành công !