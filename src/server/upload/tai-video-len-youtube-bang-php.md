YouTube là trang web chia sẻ video phổ biến nhất cho phép người dùng tải lên, xem và chia sẻ video trực tuyến. Nếu ứng dụng web của bạn có chức năng tải lên video và bạn muốn giảm dung lượng của máy chủ, việc tải video lên YouTube sẽ là một ý tưởng tuyệt vời. Bằng cách tải video lên YouTube, bạn sẽ nhận được các tiện ích sau.

Không gian máy chủ sẽ không được sử dụng cho các tệp video.
Video có thể dễ dàng được nhúng trên trang web.
Video có thể được chia sẻ dễ dàng.
API dữ liệu YouTube cung cấp một cách dễ dàng để tải video lên YouTube từ trang web bằng Thư viện ứng dụng khách API của Google . Trong hướng dẫn này, chúng tôi sẽ chỉ cho bạn cách tải video lên YouTube từ ứng dụng web bằng cách sử dụng PHP. Mã ví dụ của chúng tôi sẽ sử dụng Thư viện ứng dụng khách PHP API của Google để tải video lên YouTube từ trang web bằng cách sử dụng PHP.

Trong tập lệnh tải lên video YouTube ví dụ, chức năng sau sẽ được triển khai.

Template HTML để thu thập tiêu đề, mô tả, thẻ và tệp video.
Tải video lên YouTube từ tập lệnh PHP với tiêu đề, mô tả và thẻ.
Nhúng video đã tải lên trên trang web.
Trước khi bắt đầu xây dựng một tập lệnh PHP để tải video lên YouTube bằng cách sử dụng thư viện OAuth PHP , hãy xem cấu trúc tệp.
![](https://images.viblo.asia/b1c514f7-ba01-4b8c-957e-50803caf98d5.png)

**Tạo Dự án Google và Bật API dữ liệu YouTube**

Bạn cần tạo dự án và bật API dữ liệu YouTube trên Google Developers Console để sử dụng Thư viện khách hàng API của Google.

1. Truy cập [Bảng điều khiển dành cho nhà phát triển của Google ](https://console.developers.google.com/) .
2. Chọn dự án hiện có từ trình đơn thả xuống của dự án hoặc tạo dự án mới bằng cách nhấp vào Tạo dự án (+) :
*     Nhập **Project name** và nhấn **Create** để tiếp tục.
*     Dưới  **Project name**, bạn sẽ thấy bảng điều khiển API của Google đã tạo ID dự án. Tùy chọn bạn có thể thay đổi ID dự án này bằng liên kết Chỉnh sửa. Nhưng ID dự án phải là duy nhất.
*     Nhấp vào nút **Create** và dự án sẽ được tạo trong vài giây.
3. Chọn dự án mới được tạo và bật dịch vụ API dữ liệu YouTube.
*     Trong thanh bên, hãy chọn Thư viện trong phần **APIs & Services** .
*     Tìm kiếm dịch vụ **YouTube Data API v3** trong danh sách API và chọn **YouTube Data API v3** .
*     Nhấp vào nút ENABLE để làm cho Thư viện API dữ liệu YouTube v3 có sẵn.
4. Trong thanh bên, hãy chọn **Credentials** trong phần  **APIs & Services**.
5. Chọn tab **OAuth consent screen** . Chọn địa chỉ Email , nhập  Product name và nhấp vào lưu .
6. Chọn tab **Credentials**  , nhấp vào trình đơn thả xuống  **Create credentials** và chọn **OAuth client ID**. .
7. Trong phần Loại ứng dụng, chọn Ứng dụng web .
*     Trong trường URI chuyển hướng được ủy quyền , nhập URL chuyển hướng.
*     Nhấp vào nút Tạo .
8. Một hộp thoại sẽ xuất hiện với các chi tiết máy khách OAuth, sao chép ID ứng dụng khách và bí mật của Khách hàng . Bí mật Client ID và Client cho phép bạn truy cập API Google.
![](https://images.viblo.asia/07d8948e-17d3-42ec-a9bd-54c29e7a6306.png)

**Link video hướng dẫn**
https://www.youtube.com/watch?v=f7wcKoEbUSA

**Thư viện ứng dụng khách API của Google cho PHP**

Thư viện ứng dụng khách API của Google cho phép bạn làm việc với API dữ liệu YouTube. Vì vậy, nó cần phải được bao gồm để truy cập API dữ liệu YouTube. Tất cả các tệp Thư viện ứng dụng khách PHP API của Google bắt buộc được đặt trong thư mục google-api-php .
**Tạo bảng cơ sở dữ liệu**
Bạn cần tạo một bảng trong cơ sở dữ liệu để lưu trữ thông tin video. SQL sau tạo một videosbảng trong cơ sở dữ liệu MySQL

```
CREATE TABLE `videos` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `description` text COLLATE utf8_unicode_ci NOT NULL,
 `tags` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `youtube_video_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

**Class DB (DB.class.php)**

Lớp DB xử lý tất cả các công việc liên quan đến cơ sở dữ liệu, như tìm nạp, chèn và cập nhật dữ liệu bằng cách sử dụng PHP và MySQL. Chỉ định máy chủ lưu trữ cơ sở dữ liệu ($dbHost), tên người dùng ($dbUsername), mật khẩu ($dbPassword) và tên ($dbName) theo thông tin cơ sở dữ liệu MySQL. Ngoài ra, chỉ định tên bảng (tblName) nơi bạn muốn lưu trữ dữ liệu của video.

*     getRow () - Lấy dữ liệu video dựa trên ID. Nếu ID không được cung cấp, ID sẽ trả về hàng cuối cùng.
*     insert () - Chèn thông tin video vào cơ sở dữ liệu.
*     update () - Cập nhật thông tin video dựa trên ID.
```

<?php
class DB {
    public $tblName = 'videos';
    
    function __construct(){
        // Database configuration
        $dbHost = 'localhost';
        $dbUsername = 'root';
        $dbPassword = 'root';
        $dbName = 'codexworld';
        
        // Connect database
        $conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
        if($conn->connect_error){
            die("Failed to connect with MySQL: " . $conn->connect_error);
        }else{
            $this->db = $conn;
        }
    }
    
    function getRow($id = ''){
        $con = !empty($id)?" WHERE id = $id ":" ORDER BY id DESC LIMIT 1 ";
        $sql = "SELECT * FROM $this->tblName $con";
        $query = $this->db->query($sql);
        $result = $query->fetch_assoc();
        if($result){
            return $result;
        }else{
            return false;
        }
    }
    
    function insert($title, $desc, $tags, $file_name){
        $sql = "INSERT INTO $this->tblName (title,description,tags,file_name) VALUES('".$title."','".$desc."','".$tags."','".$file_name."')";
        $insert = $this->db->query($sql);
        return $insert?$this->db->insert_id:false;
    }
    
    function update($id, $youtube_video_id){
        $sql = "UPDATE  $this->tblName SET youtube_video_id = '".$youtube_video_id."' WHERE id = ".$id;
        $update = $this->db->query($sql);
        return $update?true:false;
    }
}
?>
```
**Cấu hình Google OAuth (config.php)**

Trong config.php 
* OAuth Client ID ($oauthClientID) // client id Google API Console
* OAuth Client Secret ($oauthClientSecret) Client Google API Console
* Base URL ($baseURL) //Url gốc
* Callback URL ($redirectURL) // Url call back mà chúng ta vừa setup trên Google API Console

```
<?php


$oauthClientID = 'Your_Project_Client_ID';
$oauthClientSecret = 'Your_Project_Client_Secret';
$baseURL = 'http://localhost/upload_video_to_youtube_php/';
$redirectURL = 'http://localhost/upload_video_to_youtube_php/upload.php';

define('OAUTH_CLIENT_ID',$oauthClientID);
define('OAUTH_CLIENT_SECRET',$oauthClientSecret);
define('REDIRECT_URL',$redirectURL);
define('BASE_URL',$baseURL);

// Include google client libraries
require_once 'google-api-php-client/vendor/autoload.php';
require_once 'google-api-php-client/src/Google/Client.php';
require_once 'google-api-php-client/vendor/google/apiclient-services/src/Google/Service/YouTube.php';

session_start();

$client = new Google_Client();
$client->setClientId(OAUTH_CLIENT_ID);
$client->setClientSecret(OAUTH_CLIENT_SECRET);
$client->setScopes('https://www.googleapis.com/auth/youtube');
$client->setRedirectUri(REDIRECT_URL);

//Định nghĩ 1 object sẽ được sử dụng để thực hiện tất cả API request
$youtube = new Google_Service_YouTube($client);
?>
```
**Video Upload Form (index.php)**

```
<?php
//destroy previous session data
if(session_id() != '') session_destroy();

//get file upload status
if(isset($_GET['err'])){
    if($_GET['err'] == 'bf'){
        $errorMsg = 'Please select a video file to upload.';
    }elseif($_GET['err'] == 'ue'){
        $errorMsg = 'Sorry, there was an error on uploading your file.';
    }elseif($_GET['err'] == 'fe'){
        $errorMsg = 'Sorry, only MP4, AVI, MPEG, MPG, MOV and WMV files are allowed.';
    }else{
        $errorMsg = 'Some problems occurred, please try again.';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Upload video to YouTube using PHP</title>
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
</head>
<body>
    <div class="video-box">
        <h1>Upload Video to YouTube using PHP</h1>
        <form method="post" enctype="multipart/form-data" action="upload.php">
            <?php echo (!empty($errorMsg))?'<p class="err-msg">'.$errorMsg.'</p>':''; ?>
            <label for="title">Title:</label><input type="text" name="title" value="" />
            <label for="description">Description:</label> <textarea name="description" cols="20" rows="2" ></textarea>
            <label for="tags">Tags:</label> <input type="text" name="tags" value="" />
            <label for="file">Choose Video File:</label> <input type="file" name="file" >
            <input name="videoSubmit" type="submit" value="Upload">
        </form>
    </div>
</body>
</html>
```
**Upload Video lên YouTube (upload.php)**
File **upload.php** tập tin xử lý các quá trình tải lên. Các chức năng sau đây được triển khai để tải video lên YouTube và nhúng video YouTube trên trang web.

*     Tệp được tải lên máy chủ cục bộ và thông tin được lưu trữ trong cơ sở dữ liệu.
*     Người dùng cần xác thực bằng tài khoản Google của họ.
*     Sau khi xác thực, tệp video được tải lên YouTube bằng API dữ liệu YouTube.
*     ID video YouTube được cập nhật lên cơ sở dữ liệu.
*     Khi tải lên YouTube thành công, tệp video sẽ bị xóa khỏi máy chủ cục bộ.
*     Video YouTube tải lên có tiêu đề, mô tả và thẻ được hiển thị cho người dùng.
```
<?php

//include api config file
require_once 'config.php';

//include database class
require_once 'DB.class.php';

//create an object of database class
$db = new DB;

//if the form is submitted
if(isset($_POST['videoSubmit'])){
    //video info
    $title = $_POST['title'];
    $desc = $_POST['description'];
    $tags = $_POST['tags'];
    
    //check whether file field is not empty
    if($_FILES["file"]["name"] != ''){
        //file upload path
        $fileName = str_shuffle('codexworld').'-'.basename($_FILES["file"]["name"]);
        $filePath = "videos/".$fileName;
        
        //check the file type
        $allowedTypeArr = array("video/mp4", "video/avi", "video/mpeg", "video/mpg", "video/mov", "video/wmv", "video/rm");
        if(in_array($_FILES['file']['type'], $allowedTypeArr)){
            //upload file to local server
            if(move_uploaded_file($_FILES['file']['tmp_name'], $filePath)){
                //insert video data in the database
                $insert = $db->insert($title, $desc, $tags, $fileName);
                
                //store db row id in the session
                $_SESSION['uploadedFileId'] = $insert;
            }else{
                header("Location:".BASE_URL."index.php?err=ue");
                exit;
            }
        }else{
            header("Location:".BASE_URL."index.php?err=fe");
            exit;
        }
    }else{
        header('Location:'.BASE_URL.'index.php?err=bf');
        exit;
    }
}

// get uploaded video data from database
$videoData = $db->getRow($_SESSION['uploadedFileId']);

// Check if an auth token exists for the required scopes
$tokenSessionKey = 'token-' . $client->prepareScopes();
if (isset($_GET['code'])) {
  if (strval($_SESSION['state']) !== strval($_GET['state'])) {
    die('The session state did not match.');
  }

  $client->authenticate($_GET['code']);
  $_SESSION[$tokenSessionKey] = $client->getAccessToken();
  header('Location: ' . REDIRECT_URL);
}

if (isset($_SESSION[$tokenSessionKey])) {
  $client->setAccessToken($_SESSION[$tokenSessionKey]);
}

// Check to ensure that the access token was successfully acquired.
if ($client->getAccessToken()) {
  $htmlBody = '';
  try{
    // REPLACE this value with the path to the file you are uploading.
    $videoPath = 'videos/'.$videoData['file_name'];
    
    if(!empty($videoData['youtube_video_id'])){
        // uploaded video data
        $videoTitle = $videoData['title'];
        $videoDesc = $videoData['description'];
        $videoTags = $videoData['tags'];
        $videoId = $videoData['youtube_video_id'];
    }else{
        // Create a snippet with title, description, tags and category ID
        // Create an asset resource and set its snippet metadata and type.
        // This example sets the video's title, description, keyword tags, and
        // video category.
        $snippet = new Google_Service_YouTube_VideoSnippet();
        $snippet->setTitle($videoData['title']);
        $snippet->setDescription($videoData['description']);
        $snippet->setTags(explode(",",$videoData['tags']));
    
        // Numeric video category. See
        // https://developers.google.com/youtube/v3/docs/videoCategories/list
        $snippet->setCategoryId("22");
    
        // Set the video's status to "public". Valid statuses are "public",

        $status = new Google_Service_YouTube_VideoStatus();
        $status->privacyStatus = "public";
    
        // Associate the snippet and status objects with a new video resource.
        $video = new Google_Service_YouTube_Video();
        $video->setSnippet($snippet);
        $video->setStatus($status);
    
        // Specify the size of each chunk of data, in bytes. Set a higher value for
        // reliable connection as fewer chunks lead to faster uploads. Set a lower
        // value for better recovery on less reliable connections.
        $chunkSizeBytes = 1 * 1024 * 1024;
    
        // Setting the defer flag to true tells the client to return a request which can be called
        // with ->execute(); instead of making the API call immediately.
        $client->setDefer(true);
    
        // Create a request for the API's videos.insert method to create and upload the video.
        $insertRequest = $youtube->videos->insert("status,snippet", $video);
    
        // Create a MediaFileUpload object for resumable uploads.
        $media = new Google_Http_MediaFileUpload(
            $client,
            $insertRequest,
            'video/*',
            null,
            true,
            $chunkSizeBytes
        );
        $media->setFileSize(filesize($videoPath));
    
    
        // Read the media file and upload it chunk by chunk.
        $status = false;
        $handle = fopen($videoPath, "rb");
        while (!$status && !feof($handle)) {
          $chunk = fread($handle, $chunkSizeBytes);
          $status = $media->nextChunk($chunk);
        }
    
        fclose($handle);
    
        // If you want to make other calls after the file upload, set setDefer back to false
        $client->setDefer(false);
        
        // update youtube video id to database
        $db->update($videoData['id'],$status['id']);
        
        // delete video file from local server
        @unlink("videos/".$videoData['file_name']);
        
        // uploaded video data
        $videoTitle = $status['snippet']['title'];
        $videoDesc = $status['snippet']['description'];
        $videoTags = implode(",",$status['snippet']['tags']);
        $videoId = $status['id'];
    }
    
    // uploaded video embed html
    $htmlBody .= "<p class='succ-msg'>Video Uploaded to YouTube</p>";
    $htmlBody .= '<embed width="400" height="315" src="https://www.youtube.com/embed/'.$videoId.'"></embed>';
    $htmlBody .= '<ul><li><b>Title: </b>'.$videoTitle.'</li>';
    $htmlBody .= '<li><b>Description: </b>'.$videoDesc.'</li>';
    $htmlBody .= '<li><b>Tags: </b>'.$videoTags.'</li></ul>';
    $htmlBody .= '<a href="logout.php">Logout</a>';

  } catch (Google_Service_Exception $e) {
    $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>',
        htmlspecialchars($e->getMessage()));
  } catch (Google_Exception $e) {
    $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>',
        htmlspecialchars($e->getMessage()));
    $htmlBody .= 'Please reset session <a href="logout.php">Logout</a>';
  }

  $_SESSION[$tokenSessionKey] = $client->getAccessToken();
} elseif ($OAUTH2_CLIENT_ID == 'REPLACE_ME') {
  $htmlBody = <<<END
  <h3>Client Credentials Required</h3>
  <p>
    You need to set <code>\$OAUTH2_CLIENT_ID</code> and
    <code>\$OAUTH2_CLIENT_ID</code> before proceeding.
  <p>
END;
} else {
  // If the user hasn't authorized the app, initiate the OAuth flow
  $state = mt_rand();
  $client->setState($state);
  $_SESSION['state'] = $state;

  $authUrl = $client->createAuthUrl();
  $htmlBody = <<<END
  <h3>Authorization Required</h3>
  <p>You need to <a href="$authUrl">authorize access</a> before proceeding.<p>
END;
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Upload video to YouTube using PHP</title>
<link rel="stylesheet" type="text/css" href="css/style.css"/>
</head>
<body>
<div class="video-box">
    <h1>Upload video to YouTube using PHP</h1>
    <div class="uplink"><a href="<?php echo BASE_URL; ?>">New Upload</a></div>
    <div class="content">
        <!-- display uploaded video info -->
        <?php echo $htmlBody; ?>
    </div>
</div>
</div>
</body>
</html>
```
**Logout (logout.php)**
File này sử dụng để xóa token và session
```
<?php
//include api config file
require_once 'config.php';

//revoke token & destroy session
$client->revokeToken();
session_destroy();

//redirect to the homepage
header("Location:index.php"); exit;
?>
```

**Tham khảo tại**

https://www.codexworld.com/upload-video-to-youtube-using-php/
https://github.com/huuhau95/upload-video-youtube-php
https://developers.google.com/youtube/v3/code_samples/php

Như vậy chúng ta đã xong phần phần upload video lên youtube qua API. Cảm ơn các bạn đã theo dõi bài viết của mình