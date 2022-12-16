**Package** trong Java được sử dụng nhằm tránh mâu thuẫn trong cách đặt tên và kiểm soát truy cập của các class, sub-class và interface.
Bằng việc sử dụng các package, lập trình viên sẽ dễ dàng sắp xếp và tìm kiếm các class, đồng thời package cung cấp một cấu trúc tốt cho dự án, đặc biệt với các dự án có lượng class và file lớn

Package được chia thành 2 phần chính:

***Built-in packages:*** Trong java đã định nghĩa sẵn rất nhiều package, và các package  này chứa 1 lượng lớn các class, intertfaces cho lập trình viên sử dụng
***User-defined packages:*** Được tạo ra và định nghĩa bởi người dùng, lập trình viên.
Built-in packages
Những package đi kèm với JDK/ JRD hoặc người dùng tải thêm được biết đến như là những built-in packages. Những built-in package này được lưu ở dạng file .JAR và khi người dùng giải nén các file .JAR này, người dùng có thể dễ dàng nhìn thấy các package như lang, io, util, SQL, v..v.. Java cung cấp rất nhiều built-in packages như java.awt

![image.png](https://images.viblo.asia/302db3c9-c316-4024-af5c-6750cb9c03de.png)

### Một vài ví dụ về Built-in Package
- `java.sql`: Cung cấp các class nhằm truy xuất và xử lý dữ liệu lưu trữ trong database. Các classe phổ biến như Connection, DriverManager, PreparedStatement, ResultSet, Statement,..v...v.
- `java.lang`: Chứa những class và interface là thành phần cơ bản để thiết kế ngôn ngữ lập trình Java. Các classe phổ biến như String, StringBuffer, System, Math, Integer, v..v.
- `java.util`: Chứa những class hỗ trợ, collections, số như ArrayList, LinkedList, HashMap, Calendar, Date, Time Zone, ..v..v.
- `java.net`: Cung cấp những class hỗ trợ triển khai các ứng dụng mạng như Authenticator, HTTP Cookie, Socket, URL, URLConnection, URLEncoder, URLDecoder, ..v...v.
- `java.io`: Cung cấp những class thao tác với  input/output của hệ thống như BufferedReader, BufferedWriter, File, InputStream, OutputStream, PrintStream, Serializable, ..v...v
- `java.awt`: Chứa những class tạo ra giai diện người dùng và vẽ hình ảnh như Button, Color, Event, Font, Graphics, Image, ..v...v

### Ví dụ về các package với code 😀😀😀
1. Java.Awt
```java
import java.awt.*;
public class AWTExample{
AWTExample()
{
	Frame fr1=new Frame();
	Label la = new Label("Welcome to the java graphics VIBLO");
	fr1.add(la);				
	fr1.setSize(200, 200);
	fr1.setVisible(true);
}
public static void main(String args[])
{
	Testawt tw = new Testawt();
}
}

```

2. Java.net

```java
// using DatagramSocket under java.net package
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

public class UDP {
	public static void main(String[] args)
		throws IOException
	{
		// Create a socket to listen at port 4567
		int port_no = 4567;
		DatagramSocket ds = new DatagramSocket(port_no);
		byte[] receive = new byte[65535];
		DatagramPacket DpReceive = null;

		while (true) {
			// create a DatgramPacket to receive the data.
			DpReceive = new DatagramPacket(receive,
										receive.length);
			// receive the data in byte buffer.
			ds.receive(DpReceive);
			System.out.println("DATA:- " + data(receive));
			// Clear the buffer after every message.
			receive = new byte[65535];
		}
	}
}

```

3. Java.sql

```java
import java.sql.*;

public class JavaSQL {
	
static final String URL = "jdbc:mysql://localhost/VibloDB";
static final String USER = "user";
static final String PASSWORD = "123";
static final String QUERY = "SELECT ID, NAME, ADDRESS FROM STUDENTS";

public static void main(String[] args) {
	// Open a connection
	try(
		Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
		Statement stm = con.createStatement();
		ResultSet rs = stm.executeQuery(QUERY);) {
		
		while (rs.next()) {
			// Retrieving data from column name
			System.out.print("ID: " + rs.getInt("id"));
			System.out.print(",NAME: " + rs.getInt("name"));
			System.out.println(",ADDRESS: " + rs.getString("address"));
		}
	} catch (SQLException e) {
		e.printStackTrace();
	}
}
}

```
4. Java.IO

```java
import java.io.Console;

class example_io {
	
public static void main(String args []) {
	Console cons = System.console();
	System.out.println("Enter your favorite color");
	String colour ;
	colour = cons.readLine();
	System.out.println("Favorite colour is " + colour);
	}
}

```