Trong kiểm thử phần mềm, để xác minh tính đúng của trường hợp kiểm thử có đúng hay không? Chúng ta cần phải truy vấn vào cơ sở dữ liệu để so sánh. Tương tự như kiểm thử thủ công, trong kiểm thử tự động, chúng ta cũng có thể truy vấn vào cơ sở dữ liệu một cách dễ dàng. Sau đây mình sẽ giới thiệu với các bạn cách truy vấn vào cơ sở dữ liệu cho công cụ kiểm thử tự động Katalon Studio.
### 1. Cách kết nối vào cơ sở dữ liệu (Database)
- Đầu tiên, chúng ta vào thư mục "Keywords" tạo mới một package đặt tên là "database". Từ package này chúng ta tạo mới một "Keyword" đặt tên là "ConnectDB". <br>
-> Sau đó Katalon sẽ tạo 1 class tên là ConnectDB.groovy cho phép chúng ta có thể viết các method vào trong đó, như ảnh dưới đây:


 ![](https://images.viblo.asia/07c84398-5134-406e-bfd1-4d34ac46ab53.PNG)
 
 - Tiếp theo, ta cần import các thư viện cần thiết cho việc kết nối đến database:

```
import java.sql.Connection
import java.sql.DriverManager
import java.sql.Statement
import java.sql.ResultSet
import java.sql.SQLException
```

-  Sau khi import các thư viện trên thì chúng ta có thể viết các method để kết nối đến Database và truy vấn dữ liệu:
```
public class ConnectDB {
	private static Connection connection = null;

	@Keyword
	def connectDB(String url, String dbname, String port, String username, String password){

		//Load driver class for your specific database type

		String conn = "jdbc:mysql://" + url + ":" + port + "/" + dbname

		//Class.forName("org.sqlite.JDBC")

		//String connectionString = "jdbc:sqlite:" + dataFile

		if(connection != null && !connection.isClosed()){

			connection.close()

		}

		connection = DriverManager.getConnection(conn, username, password)

		return connection

	}

	@Keyword
	def executeQuery(String queryString) {

		Statement stm = connection.createStatement()

		ResultSet rs = stm.executeQuery(queryString)

		return rs

	}
	@Keyword
	def closeDatabaseConnection() {

		if(connection != null && !connection.isClosed()){

			connection.close()

		}

		connection = null

	}
	@Keyword
	def execute(String queryString) {

		Statement stm = connection.createStatement()

		boolean result = stm.execute(queryString)

		return result

	}

}

```
- Bản chất của Katalon Studio là kiểm thử hướng từ khóa, nên các method được viết đều phải có @Keyword mới có thể add được vào các testcase.
- Vào thư mục "Test Cases" tạo mới 1 testcase, tương tự như hình dưới, mình đặt tên là Invalidate trong mục chứa test case của phần Search:

![](https://images.viblo.asia/19282df8-f6ad-4734-8373-423ac8cfe888.PNG)

- Mở test case lên, bật chế độ script, thực hiện câu lệnh mở kết nối đến cơ sở dữ liệu:
```
CustomKeywords.'database.ConnectDB.connectDB'('localhost', 'project1', '3306', 'root', '')
```
Do cơ sở dữ liệu của mình nằm trên local, nên url ở đây sẽ là localhost, tên database mình đặt là "project1", cổng 3306 của cơ sở dữ liệu MySQL, username ở đây là "root" và password sẽ là rỗng. Nếu các bạn dùng cơ sở dữ liệu khác như SQL SERVER hay Oracle thì cách kết nối tương tự, mà chúng ta sẽ thay số cổng là 1433 và 1521 tương ứng với cổng của SQL SERVER và Oracle, username và password là khi cài đặt các bạn đặt.

### 2. Cách thực hiện truy vấn và lấy kết quả từ truy vấn (query)

- Sau khi đã kết nối đến cơ sở dữ liệu thành công. Chúng ta có thể thực hiện các truy vấn.
- Mình sẽ lấy ví dụ về phần "Tìm kiếm" trên một trang web bán điện thoại di động, với test case là nhập tên sản phẩm có tồn tại trong database: <br>
+Trong kiểm thử thủ công, thì chúng ta sẽ thực hiện theo các bước sau:
    1.  Nhập tên sản phẩm đó vào ô tìm kiếm ví dụ: Samsung galaxy s9
    2.  Nhấn vào button "Tìm kiếm"
    3. Kiểm tra kết quả trả về có đúng hay không <br>
-> Tại bước 3, cần truy vấn vào database để xem kết quả hiện lên màn hình có đúng hay không? <br>

  +Đối với kiểm thử tự động, chúng ta cũng sẽ thực hiện như vậy:
```
String txtSearch = 'Samsung galaxy s9'
WebUI.openBrowser(null)
WebUI.maximizeWindow()
WebUI.navigateToUrl('http://127.0.0.1:8000')
WebUI.click(findTestObject('Object Repository/Search/Page_Home/input_ng k_search'))
//gán text vào ô search
WebUI.setText(findTestObject('Object Repository/Search/Page_Home/input_ng k_search'), txtSearch)
//nhấn button search
WebUI.click(findTestObject('Object Repository/Search/Page_Home/icon_search'))
WebUI.scrollToPosition(600, 600)
WebUI.delay(5)
```
```
//truy vấn vào database để so sánh với kết quả hiện thị trên màn hình
String query = "select count(*) as numberOfProducts from products where name like '%"+txtSearch.trim()+"%'";

ResultSet result = CustomKeywords.'database.ConnectDB.executeQuery'(query)
//sử dụng ResultSet để lấy kết quả trả về
result.first()
int countProducts= result.getInt(1)

WebDriver driver = DriverFactory.getWebDriver()
//so sánh kết quả giữa Database và trên màn hình
if(countProducts==driver.findElements(By.xpath("//*[@class='product-grid product-loop']")).size()){
	println ("Passed!")
}
else{
	println ("Failed!")
}
WebUI.closeBrowser()
```

Vậy là trên đây mình đã hướng dẫn cho các bạn cách kiểm thử database với Katalon Studio rồi. Chúc các bạn thành công! Và đón xem series tiếp theo của mình nhé!

### 3. Tài liệu tham khảo
https://docs.katalon.com/katalon-studio/docs/connect_db_gui_testing.html