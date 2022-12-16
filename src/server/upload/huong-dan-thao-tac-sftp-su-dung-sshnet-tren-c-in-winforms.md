SFTP là viết tắt của SSH File Transfer Protocol hoặc Secure File Transfer Protocol, là một giao thức riêng biệt được đóng gói với SSH hoạt động theo cách tương tự trên một kết nối hoàn toàn an toàn. Mặc dù SFTP được tích hợp vào nhiều công cụ đồ họa mà người dùng có thể sử dụng, nếu bạn là một developer thì bạn có thể tích hợp tính năng này trong ứng dụng của mình. Bằng cách này, bạn có thể làm ứng dụng của bạn thêm phong phú hơn.

Trong bài viết này, tôi sẽ hướng dẫn bạn cách cài đặt và thực hiện các thao tác đơn giản với SFTP trong WinForms C#, sử dụng thư viện SSH.NET.

## 1. Install SSH.NET

Bước đầu tiên, tiến hành cài đặt thư viện SSH.NET trong dự án của bạn thông qua NuGET. SSH.NET là một thư viện Secure Shell (SSH) cho .NET, được tối ưu hóa cho xử lý đa luồng. Dự án này được lấy cảm hứng từ thư viện Sharp.SSH được chuyển từ java và có vẻ như nó không được hỗ trợ trong một thời gian dài. Thư viện này là viết lại hoàn toàn bằng cách sử dụng .NET 4.0, không có bất kỳ phụ thuộc bên thứ ba nào, sử dụng xử lý đa luồng để đạt được hiệu suất tốt nhất có thể. Nó cung cấp chức năng SFTP cho cả hai hoạt động đồng bộ và không đồng bộ, đó chính xác là những gì chúng ta cần.

Mở dự án của bạn trong Visual Studio và đi đến Solution Explorer ở phía trên bên phải của cửa sổ và nhấp chuột phải vào giải pháp của dự án của bạn. Từ trình đơn, chọn tùy chọn Manage NuGet packages:

![](https://images.viblo.asia/1c3b318d-0900-4612-bea7-f6d6ff2ad358.png)

Từ cửa sổ xuất hiện (hoặc tab) điều hướng đến tab Browse và tìm kiếm SSH.NET. Từ danh sách kết quả, hãy chọn tùy chọn đầu tiên bằng authro Renci và tiến hành cài đặt:

![](https://images.viblo.asia/ecfaa8ce-e708-427a-87ea-68f98b3fbd86.png)

Sau khi cài đặt xong thư viện, bạn sẽ có thể sử dụng nó trên dự án của mình mà không gặp vấn đề gì. Đừng quên bao gồm các loại SshNet ở đầu lớp học của bạn (nơi bạn muốn sử dụng nó) và những người khác:

## 2. Usage

Việc sử dụng sẽ được hiển thị cơ bản với rất nhiều ví dụ về cách bạn có thể đạt được các tác vụ mang tính tipical nhất mà bạn cần đạt được với SFTP:

*List files from a directory*

Bạn có thể liệt kê nội dung của một thư mục bằng cách sử dụng đoạn mã sau (đồng bộ) sử dụng phương thức SFTPClient.ListDirectory:

```csharp
/// <summary>
/// List a remote directory in the console.
/// </summary>
private void listFiles()
{
    string host = @"yourSftpServer.com";
    string username = "root";
    string password = @"p4ssw0rd";

    string remoteDirectory = "/some/example/directory";

    using (SftpClient sftp = new SftpClient(host, username, password))
    {
        try
        {
            sftp.Connect();

            var files = sftp.ListDirectory(remoteDirectory);

            foreach (var file in files)
            {
                Console.WriteLine(file.Name);
            }

            sftp.Disconnect();
        }
        catch (Exception e)
        {
            Console.WriteLine("An exception has been caught " + e.ToString());
        }
    }
}
```

Hoặc không đồng bộ bằng cách chạy mã trong một chuỗi khác:

```csharp
Thread myThread = new System.Threading.Thread(delegate () {
    string remoteDirectory = "/some/example/directory";

    string host = @"yourSftpServer.com";
    string username = "root";
    string password = @"p4ssw0rd";

    using (SftpClient sftp = new SftpClient(host, username, password))
    {
        try
        {
            sftp.Connect();

            var files = sftp.ListDirectory(remoteDirectory);

            foreach (var file in files)
            {
                Console.WriteLine(file.Name);
            }

            sftp.Disconnect();
        }
        catch (Exception er)
        {
            Console.WriteLine("An exception has been caught " + er.ToString());
        }
    }
});

myThread.Start();
```

Kết nối với tệp và mật khẩu khóa. Nếu bạn sử dụng tệp khóa cá nhân và đồng thời mật khẩu để kết nối với máy chủ SFTP của mình thì bạn có thể sử dụng đoạn mã sau để tạo kết nối của mình:

```csharp
string host = @"yourSftpServer.com";
string username = "root";
string password = @"p4ssw0rd";

PrivateKeyFile keyFile = new PrivateKeyFile(@"path/to/OpenSsh-RSA-key.ppk");
var keyFiles = new[] { keyFile };

var methods = new List<AuthenticationMethod>();
methods.Add(new PasswordAuthenticationMethod(username, password));
methods.Add(new PrivateKeyAuthenticationMethod(username, keyFiles));

ConnectionInfo con = new ConnectionInfo(host, 22, username, methods.ToArray());
using (var client = new SftpClient(con))
{
    client.Connect();

    // Do what you need with the client !

    client.Disconnect();
}
```

*Downloading a single file*


Để download một file bạn có thể sử dụng hàm `SFTPClient.DownloadFile` và write nó vào bộ nhớ local bằng hàm `System.IO.File.OpenWrite`.

```csharp
/// <summary>
/// Downloads a file in the desktop synchronously
/// </summary>
public void downloadFile()
{
    string host = @"yourSftpServer.com";
    string username = "root";
    string password = @"p4ssw0rd";

    // Path to file on SFTP server
    string pathRemoteFile = "/var/www/vhosts/some-folder/file_server.txt";
    // Path where the file should be saved once downloaded (locally)
    string pathLocalFile = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "download_sftp_file.txt");

    using (SftpClient sftp = new SftpClient(host, username, password))
    {
        try
        {
            sftp.Connect();

            Console.WriteLine("Downloading {0}", pathRemoteFile);

            using (Stream fileStream = File.OpenWrite(pathLocalFile))
            {
                sftp.DownloadFile(pathRemoteFile, fileStream);
            }

            sftp.Disconnect();
        }
        catch (Exception er)
        {
            Console.WriteLine("An exception has been caught " + er.ToString());
        }
    }
}
```

Bạn có thể thực hiện hành động downloadfile một cách không đồng bộ bằng cách gọi nó trong một Thread mới:

```csharp
Thread myThread = new System.Threading.Thread(delegate () {
    string host = @"yourSftpServer.com";
    string username = "root";
    string password = @"p4ssw0rd";

    // Path to file on SFTP server
    string pathRemoteFile = "/var/www/vhosts/some-folder/file_server.txt";
    // Path where the file should be saved once downloaded (locally)
    string pathLocalFile = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "download_sftp_file.txt");

    using (SftpClient sftp = new SftpClient(host, username, password))
    {
        try
        {
            sftp.Connect();

            Console.WriteLine("Downloading {0}", pathRemoteFile);

            using (Stream fileStream = File.OpenWrite(pathLocalFile))
            {
                sftp.DownloadFile(pathRemoteFile, fileStream);
            }

            sftp.Disconnect();
        }
        catch (Exception er)
        {
            Console.WriteLine("An exception has been caught " + er.ToString());
        }
    }
});

myThread.Start();
```

*Downloading an entire directory*

Nếu bạn cần tải xuống toàn bộ thư mục (ngay cả thư mục con và tệp phụ), bạn sẽ cần tạo 2 hàm và một trong số chúng đệ quy. Hàm đầu tiên sẽ là DownloadFile, cho phép bạn thông qua một thư mục từ xa và đường dẫn cục bộ làm đối số tải xuống tệp. Các hàm thứ hai là phương thức DownloadDirectory, sẽ liệt kê tất cả các tệp trong thư mục providen và sẽ lặp lại chúng. Tương ứng, nếu mục đó là một tệp thì nó sẽ sử dụng phương thức DownloadFile để tải nó xuống hoặc nếu nó là một thư mục, thì nó sẽ tạo ra nó:

```csharp
/// <summary>
/// Downloads a remote directory into a local directory
/// </summary>
/// <param name="client"></param>
/// <param name="source"></param>
/// <param name="destination"></param>
private void DownloadDirectory(SftpClient client, string source, string destination, bool recursive = false)
{
    // List the files and folders of the directory
    var files = client.ListDirectory(source);

    // Iterate over them
    foreach (SftpFile file in files)
    {
        // If is a file, download it
        if (!file.IsDirectory && !file.IsSymbolicLink)
        {
            DownloadFile(client, file, destination);
        }
        // If it's a symbolic link, ignore it
        else if (file.IsSymbolicLink)
        {
            Console.WriteLine("Symbolic link ignored: {0}", file.FullName);
        }
        // If its a directory, create it locally (and ignore the .. and .=) 
        //. is the current folder
        //.. is the folder above the current folder -the folder that contains the current folder.
        else if (file.Name != "." && file.Name != "..")
        {
            var dir = Directory.CreateDirectory(Path.Combine(destination, file.Name));
            // and start downloading it's content recursively :) in case it's required
            if (recursive)
            {
                DownloadDirectory(client, file.FullName, dir.FullName);
            }
        }
    }
}

/// <summary>
/// Downloads a remote file through the client into a local directory
/// </summary>
/// <param name="client"></param>
/// <param name="file"></param>
/// <param name="directory"></param>
private void DownloadFile(SftpClient client, SftpFile file, string directory)
{
    Console.WriteLine("Downloading {0}", file.FullName);

    using (Stream fileStream = File.OpenWrite(Path.Combine(directory, file.Name)))
    {
        client.DownloadFile(file.FullName, fileStream);
    }
}
```

Tiếp theo, bạn có thể tiến hành tạo ứng dụng khách bằng thông tin xác thực của bạn và bắt đầu tải xuống thư mục từ xa của bạn bằng phương thức đã tạo trước đó. Lưu ý rằng khi tải xuống toàn bộ thư mục sẽ mất thời gian, bạn nên sử dụng nó theo cách không đồng bộ (tạo một chuỗi), tuy nhiên đây chỉ là một đề xuất và bạn có thể mở mã:

```csharp
Thread myThread = new System.Threading.Thread(delegate () {
    string host = @"yourSftpServer.com";
    string username = "root";
    string password = @"p4ssw0rd";

    // Path to folder on SFTP server
    string pathRemoteDirectory = "/var/www/vhosts/some-folder-to-download";
    // Path where the file should be saved once downloaded (locally)
    string pathLocalDirectory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "example-local-folder");

    using (SftpClient sftp = new SftpClient(host, username, password))
    {
        try
        {
            sftp.Connect();

            // By default, the method doesn't download subdirectories
            // therefore you need to indicate that you want their content too
            bool recursiveDownload = true;

            // Start download of the directory
            DownloadDirectory(
                sftp,
                pathRemoteDirectory,
                pathLocalDirectory,
                recursiveDownload
            );
            
            sftp.Disconnect();
        }
        catch (Exception er)
        {
            Console.WriteLine("An exception has been caught " + er.ToString());
        }
    }
});

myThread.Start();
```

*Delete remote file*

Delete file từ remote sử dụng hàm `SFTPClient.DeleteFile`:

```csharp
/// <summary>
/// Delete a remote file
/// </summary>
private void deleteFile()
{
    string host = @"yourSftpServer.com";
    string username = "root";
    string password = @"p4ssw0rd";

    // Path to folder on SFTP server
    string pathRemoteFileToDelete = "/var/www/vhosts/folder/somefile.txt";

    using (SftpClient sftp = new SftpClient(host, username, password))
    {
        try
        {
            sftp.Connect();

            // Delete file
            sftp.DeleteFile(pathRemoteFileToDelete);

            sftp.Disconnect();
        }
        catch (Exception er)
        {
            Console.WriteLine("An exception has been caught " + er.ToString());
        }
    }
}
```

Happy coding !