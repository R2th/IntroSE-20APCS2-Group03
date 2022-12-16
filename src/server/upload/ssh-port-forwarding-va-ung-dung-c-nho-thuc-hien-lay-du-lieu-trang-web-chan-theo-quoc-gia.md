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

Sau khi tạo xong kết nối, chúng ta có thể sử dụng SOCKS này để ra Internet an toàn, ví dụ có thể cấu hình vào Firefox như hình bên dưới.
![](https://images.viblo.asia/0ef16a50-860f-4c1f-bf94-691d91845463.PNG)

# Ứng dụng c# lấy dữ liệu trang web có chặn ip
Các thư viện sẽ sử dụng

1. http://raw.github.com/NLog/NLog/
1. https://github.com/sshnet/SSH.NET
1. https://www.nuget.org/packages/Selenium.WebDriver/3.11.2

## Tạo ForwardedPortDynamic với SSH.NET

```
private void btnConnect_Click(object sender, EventArgs e)
        {
            btnConnect.Enabled = false;

            _client = new SshClient(txip.Text.Trim(), txusername.Text.Trim(), txpwd.Text.Trim());
            _client.Connect();
            ForwardedPortDynamic port = new ForwardedPortDynamic("127.0.0.1", 1080);
            _client.AddForwardedPort(port);
            if (_client.IsConnected)
            {
                port.Start();
            }
        }
```

=>> Rất đơn giản, chỉ cần tạo ForwardedPortDynamic như trên thì firefox đã setting như trên sẽ đi qua địa chỉ IP của ssh được sử dụng

## Source ví dụ get html

```
public void getHtml()
        {
            try
            {
                var ffService = FirefoxDriverService.CreateDefaultService(Directory.GetCurrentDirectory(), "geckodriver.exe");
                ffService.HideCommandPromptWindow = true;
                FirefoxOptions ffOptions = new FirefoxOptions();
                _driver = new FirefoxDriver(ffService, ffOptions, TimeSpan.FromSeconds(6));
                _driver.Navigate().GoToUrl(txUrl.Text.Trim());
                textHtml.Text = _driver.PageSource;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                _driver.Quit();
            }
        }
```
===> Sử dụng selenium + firefox để lấy html 

## Giao diện ví dụ
![](https://images.viblo.asia/ad8cecaf-d211-4d81-ab2c-6511b88d224b.PNG)

Link down demo: https://github.com/ngodinhngoc/SSH_Tunnel_selenium/blob/debug/Debug.zip

## Souce code
https://github.com/ngodinhngoc/SSH_Tunnel_selenium

Trên là ví dụ sử dụng c#, bài viết tới tôi sẽ sử dụng Java hoặc PHP