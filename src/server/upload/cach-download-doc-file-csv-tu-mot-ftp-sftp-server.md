Hôm nay mình xin chia sẻ kinh nghiệm cách download file csv từ 1 FTP, SFTP server về local của mình và đọc file csv đó,sau đó sẽ hiển thị ra dữ liệu.<br>
Hiện tại trên FTP, SFTP server mình đã uploaded sẵn 1 file csv có tên là SampleCSV.csv,<br>
bên dưới đây là các bước kết nối đến FTP,SFTP server, download về local, hiển thị dữ liệu.<br>
**1. Thực hiện kết nối đến FTP server**
```PHP
// 1. Kết nối và login to FTP server
$ftp_server = "Your host name";
$ftp_conn = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");
$login = ftp_login($ftp_conn, 'Your user name', 'Your password');
ftp_pasv($ftp_conn, TRUE);

// 2.Khái báo 2 biến như bên dưới
$local_file = $_SERVER['DOCUMENT_ROOT']."/SampleCSV.csv"; // Đường dẫn dến file csv trên local của mình(Ban đầu chưa có file nhé)
$server_file = "SampleCSV.csv";//tên file csv trên FPT server

// 3.Cấp quyền cho file csv
if (file_exists($local_file)) {
        chmod($local_file, 0777);
}

// 4. Thực hiện download file về local
if (ftp_get($ftp_conn, $local_file, $server_file, FTP_ASCII)) {
            if (file_exists($local_file)) {
                if (($handle = fopen($local_file, "r")) !== FALSE) {
                    while (($data = fgetcsv($handle, 99999, ",")) !== FALSE) {
                        echo "<pre>";
                        print_r($data); // hiển thị dữ liệu tương ứng với mỗi row trong file csv
                        echo "</pre>";
                    }
                    fclose($handle);
                }
            } else {
                echo "File không tồn tại dưới local";
            }

    } else {
        echo "Xẩy ra lỗi trong quá trình download file về local";
    }
```
**2. Thực hiện kết nối đến SFTP server bằng libssh2 library**<br>
Do mình sẽ dùng libssh2 library để kết nối đến SFTP server, hiện tại trên server local của mình(xampp) chưa cài đặt libssh2 library,<br>
do đó mình sẽ thực hiện download và cài đặt trên server local của mình trước nhé.<br>
Link download: https://pecl.php.net/package/ssh2<br>
Version mới nhất ở thời điểm mình làm ví dụ là 1.3.1 như ảnh bên dưới và click vào icon windows màu xanh có chứ DLL.<br><br>
![](https://images.viblo.asia/7e3d3ade-4925-4d36-9714-6e4226688207.png)

Màn hình tiếp theo mình sẽ chọn bản phù hợp với phiên bản php hiện tại mình đang dùng là php 7.4<br><br>
![](https://images.viblo.asia/79de1118-4363-4d31-bc49-d4c5437f61ab.png)

Giải nén file vừa download về và copy 2 files php_ssh2.dll, php_ssh2.pdb trong folder giải nén vào thư mục xampp\php\ext trên server local  như ảnh bên dưới.<br><br>
![](https://images.viblo.asia/f2feff1c-0864-44c9-81da-44d91bf11771.png)

Bước tiếp theo để sử dụng được thư viện này chúng ta phải vào file php.ini để thêm dòng ở  ô màu đỏ bên dưới để enable thư viện đó nhé.<br><br>
![](https://images.viblo.asia/41e2b3ce-5b53-4d6c-b7f6-dc824a18a661.png)

Bây giờ mình sẽ khơi động lại xampp để viết code sử dụng thư viện libssh2 nhé!<br>

**Source code:**<br>
```PHP
    $connection = ssh2_connect('Your host name');
     
    // Kiểm tra login
    if (!ssh2_auth_password($connection, 'Your user name', 'Your password')) {
        throw new Exception('Unable to connect.');
    } else {
        echo "connected";
    }

    // Tạo kết nối đến SFTP server
    if (!$sftp = ssh2_sftp($connection)) {
        throw new Exception('Unable to create SFTP connection.');
    } else {
        echo "connected2";
    }

    //Biến chứa danh sách các files sẽ lấy từ SFTP server
    $files = array();
    //Đường dẫn thư mục chứa file csv trên SFTP server
    $dirHandle = opendir("ssh2.sftp://$sftp/csv/");
     
    // Tìm các files trong thư mục, bỏ qua các files có đuôi kiểu (. & ..)
    while (false !== ($file = readdir($dirHandle))) {
        if ($file != '.' && $file != '..') {
            $files[] = $file;
        }
    }

    // Đường dẫn dến file csv trên local của mình(Ban đầu chưa có file nhé)
    $local_file = $_SERVER['DOCUMENT_ROOT']."/localDirectory/SampleCSV.csv";
    if (count($files)) {
        foreach ($files as $fileName) {
            if ($fileName == "SampleCSV.csv") {
                // Remote stream
                if (!$remoteStream = @fopen("ssh2.sftp://$sftp/csv/$fileName", 'r')) {
                    throw new Exception("Unable to open remote file: $fileName");
                } 
         
                // Local stream
                if (!$localStream = @fopen($_SERVER['DOCUMENT_ROOT']."/localDirectory/$fileName", 'w')) {
                    throw new Exception("Unable to open local file for writing: /localDirectory/$fileName");
                }
         
                // Write from our remote stream to our local stream
                $read = 0;
                $fileSize = filesize("ssh2.sftp://$sftp/csv/$fileName");
                while ($read < $fileSize && ($buffer = fread($remoteStream, $fileSize - $read))) {
                    // Increase our bytes read
                    $read += strlen($buffer);
         
                    // Write to our local file
                    if (fwrite($localStream, $buffer) === FALSE) {
                        throw new Exception("Unable to write to local file: /localDirectory/$fileName");
                    } else {
                        if (file_exists($local_file)) {
                            if (($handle = fopen($local_file, "r")) !== FALSE) {
                                    while (($branch = fgetcsv($handle, 99999, ",")) !== FALSE) {
                                        echo "<pre>";
                                        print_r($branch);
                                        echo "</pre>";
                                    }
                            }
                        }
                    }
                }
         
                // Close our streams
                fclose($localStream);
                fclose($remoteStream);
            }
        }
    }

```

Như vậy là mình đã hoàn thành một ví dụ đơn giản về cách kết nối, download, đọc file csv từ FTP, SFTP server khác,<br>
do kiến thức của mình có hạn,nếu có gì thiếu sót và thắc mắc mọi người hay comment cho mình nhé!