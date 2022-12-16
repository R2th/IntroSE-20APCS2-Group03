## 1. Sử dụng pgjdbc-ng để cải thiện chi phí
pgjdbc-ng là giải pháp hoàn hảo khi sử dụng Postgresql LISTEN và NOTIFY. Tôi có nhu cầu được thông báo khi một bảng có một hàng được insert Sau khi được thông báo tôi có thể đọc dữ liệu được insert để hoàn tất quá trình xử lý của mình. Ý tưởng ban đầu là thăm dò cơ sở dữ liệu cứ sau 10 giây để xem nếu một hàng mới được insert vào. Lựa chọn này sẽ làm việc nhưng quá nhiều chi phí. pgjdbc-ng là những gì tôi cần.
    
## 2. Đúng thứ tôi cần
 Nhìn xung quanh tôi thấy rằng Postgresql có các câu lệnh LISTEN và NOTIFY hỗ trợ xử lý sự kiện mà tôi đang tìm kiếm. Một vấn đề, mặc định JDBC Postgresql driver không chặn chờ đợi sự kiện xảy ra. Thay vào đó, bạn cần tiếp tục thăm dò cơ sở dữ liệu cho các sự kiện. Tốt hơn về chi phí vì không có truy vấn nào thực sự được thực thi nhưng không tối ưu. Tôi thấy rằng pgjdbc_ng là  JDBC driver được viết lại, nó chặn và chờ đợi một sự kiện xảy ra. Giải pháp hoàn hảo! Ngoài ra, như một lưu ý phụ, các thư viện Postgresql C hoạt động hơi khác một chút. Dưới đây là một ví dụ về việc thực hiện C.


### Điều gì cần thiết để thực hiện công việc này bằng cách sử dụng pgjdbc-ng?

1. Bảng để theo dõi
2. PSQL function để gửi sự kiện thông báo với tải trọng
3. Kích hoạt PSQL để gọi function trên và trên một hàng insert
4. Mã Java để nghe các sự kiện

### Tạo bảng Notification
```
CREATE TABLE notification
(
  book_id    CHAR(8) NOT NULL
    CONSTRAINT notifycation_pkey
    PRIMARY KEY,
  updated_date TIMESTAMP
);
``` 

### PSQL function để gửi sự kiện thông báo với tải trọng
```
CREATE OR REPLACE FUNCTION book_update_notify() RETURNS TRIGGER AS $realtime_book_disable$
BEGIN
  IF NEW.book_id IN (
    SELECT n.book_id FROM notifycation n
  ) THEN
    UPDATE notification SET updated_date=now() WHERE book_id=new.book_id
  ELSE
    INSERT INTO notification(book_id , updated_date) VALUES (new.book_id, now());
  END IF;
  PERFORM pg_notify('permit_update', json_build_object('table', TG_TABLE_NAME, 'book_id', new.book_id, 'type', TG_OP)::text);
  RETURN NEW;
END;
$realtime_book_disable$ LANGUAGE plpgsql;
``` 

### Kích hoạt PSQL để gọi function trên và trên một hàng insert
```
CREATE TRIGGER users_notify_update AFTER UPDATE OF public_state ON book FOR EACH ROW EXECUTE PROCEDURE book_update_notify();
``` 

### Mã Java để nghe các sự kiện
```
import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
public class ListenNotify {
//     Create the queue that will be shared by the producer and consumer
    private BlockingQueue queue = new LinkedBlockingDeque<>();
    // Database connection
    PGConnection connection;
    public ListenNotify() {
// Get database info from environment variables
        String DBHost = "localhost";
        String DBName = "test";
        String DBUserName = "postgres";
        String DBPassword = "postgres";
// Create the listener callback
        PGNotificationListener listener = new PGNotificationListener() {
            @Override
            public void notification(int processId, String channelName, String payload) {
// Add event and payload to the queue
                queue.add("/channels/" + channelName + " " + payload);
            }
        };
        try
        {
// Create a data source for logging into the db
            PGDataSource dataSource = new PGDataSource();
            dataSource.setHost(DBHost);
            dataSource.setPort(5432);
            dataSource.setDatabase(DBName);
            dataSource.setUser(DBUserName);
            dataSource.setPassword(DBPassword);
// Log into the db
            connection = (PGConnection) dataSource.getConnection();
// add the callback listener created earlier to the connection
            connection.addNotificationListener(listener);
// Tell Postgres to send NOTIFY book_update to our connection and listener
            Statement statement = connection.createStatement();
            statement.execute("LISTEN book_update");
            statement.close();
        }
        catch (SQLException e)
        {
            e.printStackTrace();
        }
    }
    public BlockingQueue getQueue()
    {
        return queue;
    }
    public static void main(String[] args)
    {
// Create a new listener
        ListenNotify ln = new ListenNotify();
// Get the shared queue
        BlockingQueue queue = ln.getQueue();
// Loop forever pulling messages off the queue
        while (true)
        {
            try
            {
// queue blocks until something is placed on it
                String msg = (String) queue.take();
// Do something with the event
                System.out.println(msg);
            }
            catch (InterruptedException e)
            {
                e.printStackTrace();
            }
        }
    }
}
```
### Kiểm tra
```
insert into permit values ('Bi quyết tán gái', 150000);
```
**Bạn sẽ thấy đầu ra như sau:**
`/channels/book_update{“table” : “book”, “action” : “UPDATE”, “data” : {“bookId”:6,”name”:"Bi quyet tan gai","price":150000}}`