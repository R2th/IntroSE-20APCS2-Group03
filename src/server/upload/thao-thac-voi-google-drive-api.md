Xin chào các bạn, trong bài viết này, mình sẽ giới thiệu cách sử dụng Java để viết các chức năng liên quan đến Google Drive API. Giúp chúng ta sử dụng, quản lý các file trên Google Drive thông qua Google Drive API.<br>
### Giới thiệu về Google Drive API
 Google Drive API cho phép các bạn tạo các ứng dụng tận dụng lưu trữ đám mây của  Google Drive. Bạn có thể phát triển ứng dụng của mình tích hợp với  Google Drive, và tạo các chức năng trong ứng dụng của bạn sử dụng  Google Drive.<br>
 Hãy cùng xem qua hình ảnh thể hiện quan hệ giữa ứng dụng của bạn, Google Drive, và Google Drive API:<br>
 ![](https://images.viblo.asia/1d77558c-b646-42f4-9289-f4c570364018.png)
 <br>
*  `Google Drive`: Dịch vụ lưu trữ tệp đám mây của Google cung cấp cho người dùng không gian lưu trữ cá nhân, được gọi là My Drive và tùy chọn truy cập các thư mục chia sẻ cộng tác, được gọi là ổ đĩa chung.<br>
*  `Google Drive API`: Là REST API cho phép bạn tận dụng bộ nhớ Google Drive từ trong ứng dụng của mình.<br>
*  `Google Drive app`: Một ứng dụng tận dụng Google Drive làm giải pháp lưu trữ.<br>
*  `Google Drive UI`: Giao diện người dùng của Google quản lý các tệp được lưu trữ trên Google Drive. Nếu ứng dụng của bạn là ứng dụng loại trình chỉnh sửa, chẳng hạn như ứng dụng bảng tính hoặc trình xử lý văn bản, bạn có thể tích hợp với Giao diện người dùng để tạo và mở tệp trong ứng dụng của mình.<br>
 `My Drive`: Vị trí lưu trữ Google Drive mà người dùng cụ thể sở hữu. Các tệp được lưu trữ trên My Drive có thể được chia sẻ với những người dùng khác, nhưng quyền sở hữu nội dung vẫn dành riêng cho một người dùng cá nhân.<br>
* ` OAuth 2.0:` Giao thức ủy quyền mà Google Drive API yêu cầu để xác thực người dùng ứng dụng của bạn. Nếu ứng dụng của bạn sử dụng Đăng nhập Google, nó sẽ xử lý luồng OAuth 2.0 và mã thông báo truy cập ứng dụng.<br>
### Bạn có thể làm gì với Google Drive API?
* Download và Upload file lên Google Drive
* Tìm kiếm file, thư mục trên Google Drive.
* User có thể chia sẻ file, thư mục hợp tác về nội dung trên Google Drive.
* Kết hợp với API Google Picker để tìm kiếm tất cả các tệp trong Google Drive, sau đó trả lại tên tệp, URL, ngày sửa đổi cuối cùng và người dùng.
* Tạo các phím tắt là các liên kết bên ngoài đến dữ liệu được lưu trữ bên ngoài Drive, trong một kho lưu trữ dữ liệu hoặc hệ thống lưu trữ đám mây khác.
* Tạo thư mục Drive chuyên dụng để lưu trữ dữ liệu của ứng dụng để ứng dụng không thể truy cập tất cả nội dung của người dùng được lưu trữ trong Google Drive. Xem Lưu trữ dữ liệu dành riêng cho ứng dụng.
* Tích hợp với Giao diện người dùng Google Drive, là giao diện người dùng web tiêu chuẩn của Google mà bạn có thể sử dụng để tương tác với các tệp Drive.
###  Turn on the Drive API
Đầu tiên, để có thể làm việc được với Google Drive API, các bạn cần phải khởi tạo một service account và generate key cho phép sevice account đó có thể truy cập được Google Drive.<br>
Vì thao tác trên Google Drive API sẽ thông qua sevice account của tài khoản Google của bạn mà không phải trực tiếp từ tài khoản Google chính. Mình sẽ hướng dẫn các bạn generate ra `.p12` key của service account, thông qua file này chúng ta có thể setup để service account có thể thao tác trực tiếp với Google Drive:<br>
Truy cập website: https://console.developers.google.com/
Chọn 1 project, nếu chưa có, hãy tạo 1 project mới.
![](https://images.viblo.asia/73a06ee2-0aa0-4db7-ba60-60518f30ff14.jpg)
Tiếp tục chọn `Credentials` → `Create credentials` → `Service account key`
![](https://images.viblo.asia/7794c84d-90b3-48db-9d9f-9d1e76d2c8e3.jpg)
Chọn loại P12 và tạo service mới sau đó click vào nút `Create`.
![](https://images.viblo.asia/859d9b07-f55c-49c9-be36-93a6855dde45.jpg)
Cuối cùng, lưu lại file p12 và nhớ lưu trữ lại service account ID của bạn cho `google-drive.service-account` property (sẽ được dùng trong ứng dụng).<br>
### Setup application
Tiếp theo, mình sẽ hướng dẫn cách để setup ứng dụng Spring boot để có thể thao tác với Google Drive<br>
Thêm dependency vào ứng dụng của bạn giúp chúng ta có thể sử dụng các thư viện để thao tác Google Drive API:
```
<dependency>
            <groupId>com.google.apis</groupId>
            <artifactId>google-api-services-drive</artifactId>
            <version>v3-rev136-1.25.0</version>
</dependency>
```
Setup Bean cho Drive:
```
    @Autowired
    private GoogleCredential googleCredential;

    @Bean
    public Drive getService() throws GeneralSecurityException, IOException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        return new Drive.Builder(HTTP_TRANSPORT,
                JacksonFactory.getDefaultInstance(), googleCredential)
                .build();
    }

    @Bean
    public GoogleCredential googleCredential() throws GeneralSecurityException, IOException {
        Collection<String> elenco = new ArrayList<String>();
        elenco.add("https://www.googleapis.com/auth/drive");
        HttpTransport httpTransport = new NetHttpTransport();
        JacksonFactory jsonFactory = new JacksonFactory();
        return new GoogleCredential.Builder()
                .setTransport(httpTransport)
                .setJsonFactory(jsonFactory)
                .setServiceAccountId("account_service_cua_ban@account_sercie_cua_ban.iam.gserviceaccount.com")
                .setServiceAccountScopes(elenco)
                .setServiceAccountPrivateKeyFromP12File(new File("path/to/google-service-key.p12"))
                .build();
    }
```
Nhớ rằng `account_service_cua_ban@account_sercie_cua_ban.iam.gserviceaccount.com` là google-drive.service-account mà lúc generate file p12 mình đã nhắc tới.<br>
`path/to/google-service-key.p12` là đường dẫn tới file .p12 mà chúng ta mới download ở trên.<br>
Đến đây, chúng ta có thể dễ dàng thao tác với Google Drive bằng thư viện `com.google.api.services.drive.Drive` mà chúng ta đã khởi tạo Bean ở trên cho ứng dụng Spring boot:
```
    @Autowired
    private Drive googleDrive;
```
### Sử dụng một số hàm cơ bản
**Get all file:**
```
private List<File> getAllGoogleDriveFiles() throws IOException {
        FileList result = googleDrive.files().list()
                .setFields("nextPageToken, files(id, name, parents, mimeType)")
                .execute();
        return result.getFiles();
    }
```
hàm `setFields` chỉ định những field chúng ta có thể get ra từ File nhận được. Ví dụ bạn sử dụng `.setFields("files(id, name, parents, mimeType)")` lúc này, chúng ta có thể get Id bằng cách sử dụng hàm `file.getId()`<br>
**Tạo folder mới:**
```
    private String createNewFolder(String folderName) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(folderName);
        fileMetadata.setMimeType("application/vnd.google-apps.folder");

        File file = googleDrive.files().create(fileMetadata).setFields("id").execute();
        return file.getId();
    }
```
**Upload file:**
```
        File newGGDriveFile = new File();
        newGGDriveFile.setParents(parents).setName(fileName);
        FileContent mediaContent = new FileContent("application/zip", fileToUpload);
        File file = googleDrive.files().create(newGGDriveFile, mediaContent).setFields("id,webViewLink").execute();
```
`fileName` là tên file sẽ được upload lên Google Drive<br>
`fileToUpload` là đối tượng `java.io.File` chỉ định file sẽ được upload lên Google Drive<br>
`FileContent mediaContent = new FileContent("application/zip", fileToUpload);`: chỉ định file upload lên là định dạng zip file<br>
`parents`: là list các id của folder cha mà bạn muốn upload lên.<br>
sau đó bạn có thể lấy url của file bằng cách sử dụng `file.getWebViewLink()` do trước đó chúng ta đã set giá trị của webViewLink trả ra:`setFields("id,webViewLink")`<br>
**Delete file**<br>
```
  private static void deleteFile(String fileId) {
    try {
      googleDrive.files().delete(fileId).execute();
    } catch (IOException e) {
      System.out.println("An error occurred: " + e);
    }
  }
```
`fileId`: id của file cần xóa trên Google Drive.<br>
**Download file**
```
String fileId = "0BwwA4oUTeiV1UVNwOHItT0xfa4G";
OutputStream outputStream = new ByteArrayOutputStream();
googleDrive.files().get(fileId)
    .executeMediaAndDownloadTo(outputStream);
```
**Lưu ý**: Khi thao tác trên Google Drive chúng ta sử dụng account service. Vì vậy các folder là của account service, account service không có giao diện cụ thể như tài khoản Goolge chính nên bạn sẽ không xem được trực tiếp các file bằng Google Drive. Dể có thể xem được bạn có thể tạo 1 folder trên Google Drive bằng tài khoản Google chính sau đó share quyền cho tài khoản account service. Tiếp đó ứng dụng của chúng ta sẽ thao tác trên folder đó, lúc này bạn sẽ có thể vào Google Drive xem các file của mình một cách bình thường.<br>
### Kết luận
Bài biết trên chỉ là một phần mình tìm hiểu về Google Drive API và hướng dẫn cách sử dụng Java để thao tác với Google Drive API. Các bạn có thể tham khảo [Google Drive API document V3](https://developers.google.com/drive/api/v3/about-sdk) để tìm hiểu thêm nhiều chức năng cũng như việc sử dụng các ngôn ngữ khác nữa của Google Drive API. Hy vọng bài viết sẽ giúp ích cho các bạn trong học tập và công việc.