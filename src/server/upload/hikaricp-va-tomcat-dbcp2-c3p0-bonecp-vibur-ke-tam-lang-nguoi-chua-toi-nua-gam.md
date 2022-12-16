**HikariCP** và **Tomcat**, **DBCP2**, **C3P0**, **BoneCP**, **Vibur** là các thư viện giúp tạo ***database connection pool*** trong Java và hơn hết chúng đều là open-source!

*"Kẻ tám lạng, người chưa tới nửa gam!"*

Nên sử dụng hay không? Và nếu sử dụng thì nên là thư viện nào? (Thật ra mình đang cường điệu một tý chứ không đến nỗi 8 lạng ~ 0.5 gam như thế đâu ạ :joy:)

Chúng ta sẽ lần lượt tìm hiểu và trả lời các câu hỏi trên bạn nhé ;)
![](https://images.viblo.asia/a7d74bce-e8af-4c62-98de-ff2a177d0b91.png)
## 1. Sơ lược về Database Connection Pool
***Connection Pool là gì? Khái niệm connection pool trong database?***

Trong kỹ thuật phần mềm, một connection là một bộ đệm duy trì các kết nối tới database. Các kết nối tới database sau khi sử dụng sẽ không đóng lại ngay mà sẽ được dùng lại khi được yêu cầu trong tương lai.

Cơ chế hoạt động của nó như sau: Khi một connection được tạo, nó sẽ được đưa vào pool (tiếng Việt mình dịch là hồ bơi ;)) và sử dụng lại cho các yêu cầu kết nối tiếp theo và chỉ bị đóng khi hết thời gian timeout.

Ví dụ: max pool size = 10 (số lượng tối đa connection trong pool là 10).

Bây giờ user kết nối tới database (truy vấn database), hệ thống sẽ kiểm tra trong connection pool có kết nối nào đang rảnh không?

* Trường hợp chưa có kết nối nào trong connection pool hoặc tất cả các kết nối đều bận (đang được sử dụng bởi user khác) và số lượng connection trong connection pool < 10 thì sẽ tạo một connection mới tới database để kết nối tới database, đồng thời kết nối đó sẽ được đưa vào connection pool.
* Trường hợp tất cả các kết nối đang bận và số lượng connection trong connection pool = 10 thì người dùng phải đợi cho các user dùng xong để được dùng.

> Sau khi một kết nối được tạo và sử dụng xong nó sẽ không đóng lại mà sẽ duy trì trong connection pool để dùng lại cho lần sau và chỉ thực sự bị đóng khi hết thời gian timeout (lâu quá không dùng đến nữa).

***Vậy có nên dùng không?***

Chắc hẳn đến đây bạn có thể tự trả lời câu hỏi trên rồi nhỉ. Câu trả lời của mình là "nên" và phải luôn sử dụng để đảm bảo phần mềm của chúng ta hoạt động tốt nhất có thể.

![](https://images.viblo.asia/f6c88560-ae42-454c-9ced-3a21eef2cce3.png)

***Có thể cho tôi biết nên sử dụng thư viện nào trong số các thư viện đã giới thiệu ở trên không?***

*Dục tốc bất đạt!* :P

Trước tiên, chúng ta hãy cùng xem lại cách tạo một connection pool đơn giản đã nhé.

#### Các bước tạo connection pool đơn giản trong JDBC
* Tạo **Configuration** class để lưu trữ Database Configuration
```
package com.ngockhuong.utils;
 
public class Configuration {

    public String DB_USER_NAME;

    public String DB_PASSWORD;

    public String DB_URL;

    public String DB_DRIVER;

    public Integer DB_MAX_CONNECTIONS;

    public Configuration() {
        init();
    }

    private static Configuration configuration = new Configuration();

    public static Configuration getInstance() {
        return configuration;
    }

    private void init() {
        DB_USER_NAME = "root";
        DB_PASSWORD = "root";
        DB_URL = "jdbc:mysql://localhost:3306/ngockhuong";
        DB_DRIVER = "com.mysql.jdbc.Driver";
        DB_MAX_CONNECTIONS = 5;
    }

}
```
* Tạo **JdbcConnectionPool** class để tạo và quản lý các connection
```
package com.ngockhuong.db;
 
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ngockhuong.utils.Configuration;
import com.mysql.jdbc.Connection;

public class JdbcConnectionPool {

    List<Connection> availableConnections = new ArrayList<Connection>();

    public JdbcConnectionPool() {
        initializeConnectionPool();
    }

    private void initializeConnectionPool() {
        while (!checkIfConnectionPoolIsFull()) {
            availableConnections.add(createNewConnectionForPool());
        }
    }

    private synchronized boolean checkIfConnectionPoolIsFull() {
        final int MAX_POOL_SIZE = Configuration.getInstance().DB_MAX_CONNECTIONS;

        if (availableConnections.size() < MAX_POOL_SIZE) {
            return false;
        }

        return true;
    }

    //Creating a connection
    private Connection createNewConnectionForPool() {
        Configuration config = Configuration.getInstance();
        try {
            Class.forName(config.DB_DRIVER);
            Connection connection = (Connection) DriverManager.getConnection(
                    config.DB_URL, config.DB_USER_NAME, config.DB_PASSWORD);
            return connection;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;

    }

    public synchronized Connection getConnectionFromPool() {
        Connection connection = null;
        if (availableConnections.size() > 0) {
            connection = (Connection) availableConnections.get(0);
            availableConnections.remove(0);
        }
        return connection;
    }

    public synchronized void returnConnectionToPool(Connection connection) {
        availableConnections.add(connection);
    }
}
```
* Tạo **DataSource** class để lấy connection ra dùng và trả lại connection vào connection pool khi dùng xong
```
package com.ngockhuong.db;
 
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

public class DataSource {

    static JdbcConnectionPool pool = new JdbcConnectionPool();

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Connection connection = pool.getConnectionFromPool();
        return connection;
    }

    public static void returnConnection(Connection connection) {
        pool.returnConnectionToPool(connection);
    }
}
```
Các thư viện connection pool cũng có cơ chế hoạt động như vậy, tuy nhiên chúng đã được thêm mắm dặm muối (với những kỹ thuật tân tiến) để chạy nhanh hơn, ổn định hơn, đạt hiệu suất cao hơn. Do vậy, thay vì tự viết ra connection pool, tự dùng thì nên sử dụng các thư viện có sẵn để đảm bảo được chất lượng của sản phẩm bạn nhé ;)
## 2. Giới thiệu HikariCP
[**HikariCP**](https://brettwooldridge.github.io/HikariCP/) là JDBC connection pool có hiệu năng cao, rất nhẹ (chỉ khoảng 130kb), được phát triển bởi [Brett Wooldridge](https://github.com/brettwooldridge) (năm 2012) và vẫn đang được cập nhật liên tục. HikariCP có nhiều tính năng mà chính tác giả cũng đã ca ngợi:
* Kiểm tra các kết nối tại chính method getConnection()
* Đóng gói các internal pool query (bao gồm test query và initSQL query) trong transaction của chúng
* Theo dõi và đóng các đối tượng Statement (đã hết sử dụng)  tại Connection.close()
* Thực hiện rollback() trên các Connection được trả về trong pool
* Xóa SQL warning trước khi trả một Connection về cho client
* Thiết lập mặc định auto-commit, mức cô lập cho transaction, catalog và trạng thái chỉ đọc (read-only)
* Kiểm tra các đối tượng SQLException để tìm ra các lỗi mất kết nối

## 3. Tomcat, DBCP2, C3P0, BoneCP, Vibur thì sao
Tomcat, DBCP2, C3P0, BoneCP, Vibur là các đàn anh lão làng trước HikariCP, cũng là các thư viện connection pool nổi tiếng, tuy nhiên tất thẩy chúng đều có điểm thua người em HikariCP. Chúng ta sẽ cùng xem thử nhé.

* **C3P0** là một trong những thư viện lâu đời nhất và nổi tiếng nhất, nhưng theo báo đài đưa tin thì việc cấu hình nó quá phức tạp. Một khi cấu hình sai, C3P0 có thể có những vấn đề về hiệu năng, thậm chí là bế tắc (đây là một ví dụ: [C3p0 APPARENT DEADLOCK exception](https://stackoverflow.com/questions/18100414/c3p0-apparent-deadlock-exception)). Nó cũng có khá nhiều lỗi và một codebase quá lớn.

* **DBCP Apache Commons (DBCP2)** dường như cung cấp hầu hết các tính năng của một connection pool và có tài liệu chi tiết. Tuy nhiên, cộng đồng người dùng khá nhỏ và thêm vào đó, **JDBC Tomcat** connection pool xuất hiện, mới hơn ([dựa trên code của Apache Commons DBCP](http://stackoverflow.com/questions/4711943/tomcat-dbcp-vs-commons-dbcp)) và hiện được sử dụng rộng rãi hơn.

* **BoneCP** và **Vibur** cũng là connection pool có nhiều tính năng, có tính ổn định và hiệu suất. Tuy nhiên, cộng đồng người dùng của cả hai lại rất nhỏ. Với BoneCP, chính tác giả thư viện này cũng đã tuyên bố rằng ông sẽ không dùng cũng như không phát triển thư viện của mình nữa và ***HikariCP là lựa chọn tốt hơn***.

Hơn nữa, tại chính trang [wiki](https://github.com/brettwooldridge/HikariCP/wiki/Pool-Analysis) của **HikariCP**, tác giả Brett Wooldridge cũng đã phân tích các pool, đưa ra được những điểm yếu của các thư viện này so với HikariCP. Các bạn có thể tham khảo thêm [ở đây](https://github.com/brettwooldridge/HikariCP/wiki/Pool-Analysis).
## 4. Nói thêm một tý
Dưới đây là ảnh ghi lại kết quả điểm chuẩn để so sánh hiệu suất của HikariCP với connection pool khác như c3p0, dbcp2, tomcat và Vibur. (https://github.com/brettwooldridge/HikariCP-benchmark)

![](https://images.viblo.asia/c9846942-bf16-4aff-b042-96f19a8e6104.png)

Theo đó có thể thấy, HikariCP hơn hẳn các đàn anh đi trước. Và điều này cũng được chứng thực khi Spring Boot 2.x đã sử dụng mặc định HikariCP thay cho JDBC Tomcat connection pool trong dependency của nó :100:

> **Vậy từ nay bạn sẽ dùng HikariCP chứ ;)**

Một số tài liệu mình đã tham khảo:
* https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-connect-to-production-database
*  https://github.com/brettwooldridge/HikariCP
* https://github.com/brettwooldridge/HikariCP/wiki/Pool-Analysis
* https://techblog.topdesk.com/coding/choosing-a-database-connection-pool/