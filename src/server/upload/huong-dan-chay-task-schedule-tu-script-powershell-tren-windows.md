# Giới thiệu
Xin chào! Gần đây thì mình có làm mấy con batch mà phải chạy thường xuyên để update dữ liệu vào database. Vì phải chạy thường xuyên, batch chạy trên **Windows Server** nên nó được cài đặt để chạy từ **Task Schedule của Windows.** Cài đặt bằng tay thì lúc nào cũng thủ công và mất thời gian, nên hôm nay mình sẽ viết script để nó có thể chạy bằng command (dùng script **Powershell**).
Ý tưởng ban đầu của mình là sẽ chạy 1 application từ **Task Schedule bằng script PowerShell,** sau đó nữa thì sẽ set nó để chạy ở **Docker Windows Container.** Nhưng phần docker có lẽ sẽ để bài viết sau.
## Powershell script
**PowerShell** là 1 ứng dụng cho phép thực hiện các command line của Windows trên nền .NET. **PowerShell** giúp system administrator thực hiện một cách nhanh chóng và tự động các Task của hệ thống. **PowerShell** command giúp bạn quản lý máy tính của bạn thông qua các command line, giúp bạn access data, ví dụ như registry và certificate store, file system. **PowerShell** cũng được coi như một scripting language, và nó *open-source* https://github.com/powershell/powershell

## Task Schedule
**Task Scheduler** cho phép một cách tự động thực hiện các task ở các mốc thời gian cài đặt trước đó bằng cách khởi động task và thực hiện nó khi các điều kiện set trước đó đúng.
**Task Scheduler** có thể dùng để thực hiện các task như khởi động 1 application, gửi email hoặc hiện thị message box.

# App để log data
Ở đây mình làm 1 app đơn giản để log lại thời gian mỗi lần app chạy. Thời gian sẽ được append vào cuối file, tên file theo format yyyyMMdd.log. Source code mình để ở đây https://github.com/furytara/DockerVolumeTest
```
Module DockerVolumeTest

    Sub Main()
        Dim now As DateTime = DateTime.Now
        Dim logFileName = now.ToString("yyyyMMdd") & ".log"
        Dim content = now.ToString() & Environment.NewLine

        Dim aPath As String = AppDomain.CurrentDomain.BaseDirectory

        Dim writer As New StreamWriter(aPath & "\Log\" & logFileName, True, Text.Encoding.UTF8)
        writer.Write(content)
        writer.Close()
    End Sub

End Module

```
Ví dụ nội dung file 20190324.log
```
2019/03/24 20:28:55
2019/03/24 20:30:09
2019/03/24 20:30:11
2019/03/24 20:30:18
```
# Viết script PowerShell
Dưới đây là đoạn Script **PowerShell** để tạo **Task Schedule**, mình lưu nó với tên **viblo_test_schedule.ps1**
```
$action = New-ScheduledTaskAction -Execute 'C:\Users\hongocdoanh\Documents\viblo\code\2\VibloDockerTest\VibloDockerTest\bin\Debug\VibloDockerTest.exe'
$trigger =  New-ScheduledTaskTrigger -Once -At 5:08pm -RepetitionInterval (New-TimeSpan -Minutes 1)
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "VibloTestAppLog" -Description "Log time each 60s"
```
Khi tạo 1 Task Schedule thì đơn giản bạn cần tạo 1 action và 1 trigger. Action để xác định ứng dụng được khởi chạy và Trigger để xác định khi nào thì ứng dụng đó được chạy.
Ở  đây mình tạo 1 Schedule với action là chạy App log mình đã viết ở trên, và nó sẽ chạy 1 lần ngay thời gian mình chỉ định (5:08pm) và chạy mỗi mỗi phút (1 minute inteval). Như vậy khi mình check file log, thấy nó write log thời gian mỗi 1 phút là okie.

# Chạy script
- Đầu tiền thì bạn cần mở powershell bằng Administrator.
- Sau đó cấp quyền để Windows cho phép PowerShell script chạy (file ps1) 
```
Set-ExecutionPolicy Unrestricted
```
- Sau đó thì execute file viblo_test_schedule.ps1
```
C:\Users\hongocdoanh\Documents\viblo\code\2\VibloDockerTest\viblo_test_schedule.ps1
```
Như vậy là 1 Task Schedule tên VibloTestAppLog đã được tạo ra và sẽ execute ngay vào lúc 5:08pm, sau đó execute cứ mỗi phút.
![](https://images.viblo.asia/51ead619-3d58-4598-a2c9-d332a8dac378.png)

Lưu ý thì khi muốn Disable Task thì bạn có thể chạy câu lệnh sau
```
Disable-ScheduledTask -taskname "VibloTestAppLog"
```
# Kết quả
- Vào TaskSchedule kiểm tra thì ta thấy kết quả đã có 1 TaskSchedule với tên "VibloTestAppLog" được tạo ra.
![](https://images.viblo.asia/4b8cfbf9-2630-41c5-ba88-eae8839d559c.png)

- Sau đó thì vào thư mục \Log kiểm tra xem chương trình có log lại mỗi phút 1 lần thời gian chạy app không? Nếu có thì bạn đã thành công. Happy scripting.