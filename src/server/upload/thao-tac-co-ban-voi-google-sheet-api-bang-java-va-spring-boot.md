# Giới thiệu chung
   Hiện nay Google Sheet là một ứng dụng trang tính rất phổ biến và hữu ích cho người dùng. Nó tiện lợi cho việc xây dựng các danh sách quản lý, báo cáo, xây dựng biểu đồ, vv ..... và dễ dàng chia sẻ cũng như truy cập, rất tiện lợi cho làm việc nhóm và hoàn toàn miễn phí.
Google sheet API  sinh ra để giúp các nhà phát triển có thể tạo ra các ứng dụng tương tác với Google Sheet dễ dàng, để khai thác các tính năng rất hưu ích của nó. Về cơ bản tương tác với Google Sheet Api theo các đơn vị bảng tính (spreadsheet), trang tính (sheet), vùng giá trị (range) và  ô trang tính (cell). Với 4 phương thúc gốc tương ứng với các API: 
- batchUpdate	<POST /v4/spreadsheets/{spreadsheetId}:batchUpdate>  :  dùng cập nhật áp dụng cho một hay nhiều bảng tính.
- create	<POST /v4/spreadsheets> :  tạo một bảng tính , trả lại bảng tính vừa mới tạo.
- get	<GET /v4/spreadsheets/{spreadsheetId}>: trả lại  bảng tính với id đã cho.
- getByDataFilter	<POST /v4/spreadsheets/{spreadsheetId}:getByDataFilter> : trả lại bảng tính với id đã cho, dùng để lọc dữ liệu.
# Thao tác cơ bản với Google Sheet Api bằng java và spring boot
Ở phần  mình sẽ giới thiệu một vài thao tác cơ bản với Google Sheet Api bằng java sử dụng framework spring boot. Ở đây mặc định là các bạn đã biết về java, framework spring boot và sử dụng được maven hoặc gradle.
## 1. Tạo App với tài khoản Google
Điều kiện là bạn đã có một khoản Goolge (tài khoản gmail của bạn). Nếu chưa có bạn hãy tạo một tài khoản rồi tiếp tục các bước bên dưới.
Truy cập link đây : https://developers.google.com/sheets/api/quickstart/java
Kick vào nút:  Enable the Google Sheets API, làm theo các bước. Cuối cùng download  file credentials.json.
![](https://images.viblo.asia/64c43324-d648-4c19-b072-9b13214cdb18.JPG)

## 2. Chuẩn bị một ứng dụng cơ bản
- Các bạn có thể dùng IDE để tạo hoặc dùng Spring Cli để tạo  hoặc follow các bước dưới đây<br>
Điều kiện các bạn đã setup sẵn:
    - Java 1.8 or greater.
    - Gradle 2.3 or greater.
Bật terminal của bạn lên và thực hiện các câu lệnh cơ bản<br>
> gradle init --type basic 
> mkdir -p src/main/java src/main/resources  
Tiếp theo copy file credentials.json đã download ở trên vào thư mục src/main/resources/
Mở file build.gradle và copy source sau đây!
```
apply plugin: 'java'
apply plugin: 'application'

mainClassName = 'SheetsQuickstart'
sourceCompatibility = 1.8
targetCompatibility = 1.8
version = '1.0'

repositories {
    mavenCentral()
}

dependencies {
    compile 'com.google.api-client:google-api-client:1.30.4'
    compile 'com.google.oauth-client:google-oauth-client-jetty:1.30.4'
    compile 'com.google.apis:google-api-services-sheets:v4-rev581-1.25.0'
}
```

## 3. Tạo phương thức xác thực lấy quyền tương tác với google sheet
Trong thư mục  src/main/java/ tạo  class SheetsQuickstart.java như dưới đây
```
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

public class SheetsQuickstart {
    private static final String APPLICATION_NAME = "Google Sheets API Java Quickstart";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
   // Đây là đường dẫn thư mục sẽ lưu tạo file xác thực khi bạn đăng nhập lần đầu tiên
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    /**
     * Đây là thuộc tính chỉ phạm vi quyền thực hiện với trang tính, hiện đang để là chỉ đọc
     * Nếu sửa đổi quyền thì bạn cần xóa thư mục  tokens/ để đăng nhập lại
     */
    private static final List<String> SCOPES = Collections.singletonList(SheetsScopes.SPREADSHEETS_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    /**
     * Đây là function để lấy quyền xác thực 
     *Creates an authorized Credential object.
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = SheetsQuickstart.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    /**
      *Tương tác thử với một bảng tính để đọc dữ liệu bên trong
     * Prints the names and majors of students in a sample spreadsheet:
     * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     */
    public static void main(String... args) throws IOException, GeneralSecurityException {
        // Build a new authorized API client service.
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        final String spreadsheetId = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms";
        final String range = "Class Data!A2:E";
        Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();
        ValueRange response = service.spreadsheets().values()
                .get(spreadsheetId, range)
                .execute();
        List<List<Object>> values = response.getValues();
        if (values == null || values.isEmpty()) {
            System.out.println("No data found.");
        } else {
            System.out.println("Name, Major");
            for (List row : values) {
                // Print columns A and E, which correspond to indices 0 and 4.
                System.out.printf("%s, %s\n", row.get(0), row.get(4));
            }
        }
    }
}
```
## 4. Thao tác cơ bản
### a, Tạo một sheet
Ở đây ta một trang tính (sheet) với tên là Sheet Test (mặc định sẽ là Sheet1)
```
Spreadsheet spreadsheet = new Spreadsheet()
        .setProperties(new SpreadsheetProperties()
                .setTitle("Sheet Test"));
spreadsheet = service.spreadsheets().create(spreadsheet)
        .setFields("spreadsheetId")
        .execute();
System.out.println("Spreadsheet ID: " + spreadsheet.getSpreadsheetId());
```
### b, Lấy giá trị bảng tính
Ở đây chúng ta sẽ đọc dữ liệu trong bảng tính Sheet Test  từ cột A tới B , dòng 1 tới 3 tương tứng range = "Sheet Test!A1:B3"
```
ValueRange result = service.spreadsheets().values().get(spreadsheetId, "Sheet Test!A1:B3").execute();
int numRows = result.getValues() != null ? result.getValues().size() : 0;
System.out.printf("%d rows retrieved.", numRows);
```
### c, Write một trang tính
Ta ghi giá trị vào bảng tính Sheet Test từ cột A tới C, bắt đầu từ dòng 1 tương ứng với range = "Sheet Test!A1:C"
```
List<List<Object>> values = Arrays.asList(
        Arrays.asList(
                "1", "2", "3"
        ), 
        Arrays.asList(
                "4", "5", "6"
        ), 
          Arrays.asList(
                "7", "8", "9"
        ), 
);
ValueRange body = new ValueRange()
        .setValues(values);
UpdateValuesResponse result =
        service.spreadsheets().values().update(spreadsheetId, range, body)
                .setValueInputOption(valueInputOption)
                .execute();
System.out.printf("%d cells updated.", result.getUpdatedCells());
```
### d, Thêm dự liệu vào các dòng tiếp theo
 Thêm dũ liệu với range = "Sheet Test!A:C"
```
List<List<Object>> values = Arrays.asList(
        Arrays.asList(
                "1", "2", "3"
        ), 
        Arrays.asList(
                "4", "5", "6"
        ), 
          Arrays.asList(
                "7", "8", "9"
        ), 
);
ValueRange body = new ValueRange()
        .setValues(values);
AppendValuesResponse result =
        service.spreadsheets().values().append(spreadsheetId, range, body)
                .setValueInputOption(valueInputOption)
                .execute();
```
Ở đây nó sẽ tự động thêm dự liệu vào sau dòng cuối cùng đã có dữ liệu
### e, Chèn giá trị vào ô trang tính (cell)
Ở đây mình sẽ update ô  cell ở vị trí cột A dòng 1 tương tứng với : Các bạn chú ý ô cell ở cột i , dòng j thì startColumnIndex(i-1), setEndColumnIndex(i), startRowIndex(j-1), endRowIndex(j), với i, j bầu từ 1. Vậy cột A(côt 1), dòng 1 thì sẽ là :startColumnIndex(0), setEndColumnIndex(1), startRowIndex(0), endRowIndex(1).
```    
        ExtendedValue extendedValue = new ExtendedValue();
        extendedValue.setStringValue("Hi"),
        GridRange gridRange = new GridRange();
         gridRange.setSheetId(0);
         gridRange.setStartRowIndex(0);
         gridRange.setEndRowIndex(1);
         gridRange.setStartColumnIndex(0);
         gridRange.setEndColumnIndex(0);
         CellData cellData = new CellData();
         cellData.setUserEnteredValue(extendedValue);
         RepeatCellRequest repeatCellRequest = new RepeatCellRequest();
          repeatCellRequest.setFields("*");
          repeatCellRequest.setRange(gridRange);
          repeatCellRequest.setCell(cellData);
          BatchUpdateSpreadsheetRequest batchUpdateRequest = new BatchUpdateSpreadsheetRequest();
          batchUpdateRequest.setRequests(Arrays.asList(new Request().setRepeatCell(repeatCellRequest)));
          service.spreadsheets().batchUpdate("spreadsheetId", batchUpdateRequest).execute();
```
## 5. Kết luật 
Như vậy qua bài viết nay mình đã khái quát cho các bạn về Google Sheet Api và những thao các cơ bản với Google Sheet Api bằng java  sử dụng framework spring boot. Khi vọng nó sẽ giúp ích cho các bạn. Để tìm hiểu chi tiết hơn các bạn có thể đọc tài liệu dưới đây<br>:
Tài liệu tham khảo: https://developers.google.com/sheets/api/quickstart/java