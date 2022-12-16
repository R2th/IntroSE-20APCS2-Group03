Chúng ta ắt hẳn đều thường xuyên làm việc với Google sheet hàng ngày, trong bài viết này, hãy cùng mình tìm hiểu các để tự động hóa những công việc trên Google Sheet trong Kotlin nhé!

Đầu tiên hãy nghía qua [Google Sheets API Docs](https://developers.google.com/sheets/api/reference/rest) một chút.

Trước tiên hãy xem chúng ta có những cách nào để truy cập Google Sheets API và hãy chọn cho mình một phương pháp phù hợp nhé:

* API keys
* Service Accounts
* OAuth 2.0 Client IDs

Trong bài viết này mình sẽ giới thiệu cho các bạn cách số 2 dùng Service Accounts. Còn 2 cách còn lại các bạn có thể tham khảo tại [đây](https://developers.google.com/sheets/api/guides/authorizing)
# Truy cập Google Sheets API bằng cách sử dụng Service Accounts

### Bước 1: Google Cloud

Đi đến trang [Google Cloud Console](https://console.cloud.google.com/) và cài đặt project mới cho riêng bạn.

### Bước 2: Kích hoạt Google Sheets

Đầu tiên, click vào search bar và tìm kiếm "Google Sheets API"

![image.png](https://images.viblo.asia/88c00579-2374-4991-a558-1c579b78e7ff.png)

Tiếp theo chọn "Enable"

![image.png](https://images.viblo.asia/abbc7039-240a-4f7e-a634-cb573d0d78c4.png)

### Bước 3: Tạo Service Account

Bây giờ, hãy tạo Service Account để chúng ta có thể xác nhận ứng dụng của chúng ta sau này.

![image.png](https://images.viblo.asia/60d79630-327e-4891-98f0-a5b6e05e6e7a.png)

Ở mục lựa chọn đầu tiên, hãy chọn "Google Sheets API".

**Ta sẽ truy cập vào data nào?** Hãy ghi nhớ rằng service account sẽ sao chép các hành động của người dùng. Nó không cho phép bạn truy cập vào dữ liệu của người dùng.

![image.png](https://images.viblo.asia/47cf4739-ec19-437d-9ee8-3b548472ec90.png)

> Dữ liệu thuộc về người dùng Google, như địa chỉ email hoặc tuổi. Cần có sự đồng ý của người dùng. Điều này sẽ tạo ra một client OAuth. Bạn có thể sử dụng GCE, GKE hay các sản phẩm khác của Google .. tùy ý.

![image.png](https://images.viblo.asia/6022ede9-c31a-463b-b8fd-34b1700de149.png)

Chọn Next

![image.png](https://images.viblo.asia/b3871c45-87a7-4e2c-900e-dad84cc8f24e.png)

Tìm trong "Detail" và chọn "CREATE AND CONTINUE"

![image.png](https://images.viblo.asia/5c9ae546-0adb-42f6-ae3e-c1c0a5228f39.png)

Chọn Owner hoặc Editor. Phần còn lại thì cứ để như tùy chỉnh default.

### Bước 4: Lấy credentials locally

![image.png](https://images.viblo.asia/ef065e11-a295-4672-87b1-8aa5b97985cd.png)

Đơn giản chỉ cần copy email ID và lưu nó ở đâu đó. Sau đấy thì click vào đây

![image.png](https://images.viblo.asia/73832f24-a681-4cb4-9ce2-940687114451.png)

Tại đây, chọn "KEYS" và "ADD KEYS".

Chọn "CREATE NEW KEY" và chọn "JSON":

![image.png](https://images.viblo.asia/1b4ab063-1a9f-4c10-b74b-7f472d542bfe.png)

Tải và lưu file JSON vào trong folder app của bạn. Sau đó đổi tên file thành "cred.json"

### Bước 5: Chia sẻ Sheet cho Service Account

Cũng giống như bất kỳ Google Account nào khác, Service Account cần quyền truy cập vào bất kỳ tệp nào từ Tài khoản Google của bạn. Nó hoạt động như một con người riêng biệt hay nói cách khác nó là một con BOT. Vì vậy, mình hy vọng bạn vẫn lưu lại ID email ở trên. Bây giờ hãy dùng nó để chia sẻ file cho service account.

Để làm điều này, ta cần mở Google Sheet mà bạn muốn cấp quyền cho Service Account, chọn "share"

![image.png](https://images.viblo.asia/359d65a2-d29e-4e4a-b8df-a473855018af.png)

Hãy dán Service Account ID vào 

![image.png](https://images.viblo.asia/042be955-f036-4c9b-bddb-20c4fba148c0.png)

Chọn "Editor" và "Send"

> Lưu ý là id của Sheet rất quan trọng. Chúng ta sẽ sử dụng id của Sheet trong Script. Bạn có thể sử dụng Service Account cho nhiều Google Sheeet và xác định mỗi Sheet theo id thực của nó trong code. 

### Bước 6: Code

Đầu tiên thêm package Google api client.
```
// Google
implementation("com.google.api-client:google-api-client:1.30.4")
implementation("com.google.apis:google-api-services-sheets:v4-rev581-1.25.0")
```

Thêm file cred.json vào folder resources và code như ví dụ sau:

```
class GoogleService {
    private val spreadsheetId = "1ncYGCMaF-lYdSuUv0TAD_dhbnhCEU9WHW4U2NvUavd8" // id của file google của bạn 
    private val range = "'Trang tính2'!B2:G5" // Phạm vi bạn muốn đọc dữ liệu ở sheet google
    private val scopes = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY)

    fun getData(): List<Any>? {
        val jsonFactory = JacksonFactory.getDefaultInstance()

        val resourceAsStream: InputStream = GoogleService::class.java.getResourceAsStream("/cred.json")
            ?: throw Exception()

        val credential = fromStream(resourceAsStream).createScoped(scopes)

        return try {
            credential.refreshToken()

            val service = Sheets.Builder(GoogleNetHttpTransport.newTrustedTransport(), jsonFactory, credential)
            val response = service.build().spreadsheets().values()
                .get(spreadsheetId, range).execute()
           return response.getValues()
        } catch (e: Exception) {
            // create log error
        }
    }
}
```
Mình sẽ giải thích cụ thể về đoạn code trên:
* Scopes: Ở đây chúng ta chỉ cần đọc dữ liệu của google sheet nên scopes chỉ cần read only. cụ thể hơn là 1 mảng 1 phần tử ("https://www.googleapis.com/auth/spreadsheets.readonly"). Khi chúng ta cần ghi vào google sheet thì chúng ta sẽ thêm các scope khác. Cụ thể về các loại scope các bạn xem thêm tại [đây](https://developers.google.com/identity/protocols/oauth2/scopes?hl=fi)
* credential: Sau khi đọc data từ file cred.json và chuyển thành GoogleCredential. kết quả như ảnh đính kèm sau ![image.png](https://images.viblo.asia/8a9a0048-1ec5-4f10-860b-076d1c493e35.png)
* refreshToken: Nếu bạn muốn access vào google sheet, bạn cần có 1 access_token khi call api get data google sheet. `credential.refreshToken()` sẽ dùng các thông tin credential và thực hiện call api "https://oauth2.googleapis.com/token" để lấy access_token, nếu thành công sẽ return `true`. Khi đó credential sẽ như ảnh sau: ![image.png](https://images.viblo.asia/e0f1b254-e389-480b-9a17-42334d7bfbc8.png) 

  Thường nếu không setting gì thì expired của token sẽ hết hạn sau 1 tiếng.
* Các bước tiếp theo, chúng ta dùng credential để get data của sheet phụ thuộc và sheetId và range đã được chỉ định trước đó.

Trường hợp cần bảo mật các thông tin ở trong file cred.json chúng ta không nên thêm file này vào trong folder của project, vì thế bạn có thể chuyển đổi file thành kiểu chuỗi String Base64 sau đó lưu biến này vào file .env
Khi đó code  sẽ như sau:
```
class GoogleServiceImpl {
    private val credentialBase64 = "example" // Bạn phải convert file cred.json thành kiểu Base64 sau đó lưu vào biến .env hoặc props ở file *.yml
    private val spreadsheetId = "1ncYGCMaF-lYdSuUv0TAD_dhbnhCEU9WHW4U2NvUavd8" // id của file google của bạn 
    private val range = "'Trang tính2'!B2:G5" // Phạm vi bạn muốn đọc dữ liệu ở sheet google
    private val scopes = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY)

    fun getData(): List<Any>? {
        val jsonFactory = JacksonFactory.getDefaultInstance()

        val credential = try {
            fromStream(ByteArrayInputStream(Base64.decodeBase64(credentialBase64))).createScoped(scopes)
        } catch (e: Exception) {
            // create log error
        }

        return try {
            credential.refreshToken()

            val service = Sheets.Builder(GoogleNetHttpTransport.newTrustedTransport(), jsonFactory, credential)
            val response = service.build().spreadsheets().values()
                .get(spreadsheetId, range).execute()
           return response.getValues()
        } catch (e: Exception) {
            // create log error
        }
    }
}
```

**Note:**  Bạn có thể tìm hiểu thêm ở cách diễn đạt dùng HTTP/REST tại [đây](https://developers.google.com/identity/protocols/oauth2/service-account#httprest)

Bài viết của mình đến đây là hết, nếu có thắc mắc gì hãy để lại comment bên dưới nhé.

Bài viết sử dụng ảnh và các bước tạo service account từ [nguồn!](https://owaisqureshi.medium.com/access-google-sheets-api-in-python-using-service-account-3a0c6d89d5fc)