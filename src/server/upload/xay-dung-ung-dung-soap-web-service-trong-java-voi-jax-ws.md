Từ phiên bản JavaEE 6 đã cung cấp sẵn 2 API cho web service là JAX-WS và JAX-RS.

* JAX-WS: dành cho SOAP web service. Có 2 cách để viết ứng dụng JAX-WS: RPC style và Document style. JAX-WS là API Java dựa trên XML để xây dựng ứng dụng Client-Server.
* JAX-RS: dành cho RESTful web service. Có 2 implementation chủ yếu để viết ứng dụng JAX-RS: Jersey and RESTeasy. JAX-RS sử dụng các Annotation để đơn giản hóa việc phát triển và triển khai các web service.

![](https://images.viblo.asia/1e6fc1d7-e526-4540-99d0-8bcd348aa7c5.png)

Trong bài này, chúng ta sẽ cùng tìm hiểu về JAX-WS để tạo SOAP web service.

Link bài viết gốc:  https://gpcoder.com/5615-java-web-services-jax-ws-soap/

## Tạo Web Service và tạo Client truy cập Web service sử dụng Eclipse

### Tạo project web service

Tạo một dynamic web project:

![](https://images.viblo.asia/016f0d54-2285-4400-b7d9-4a7e69a943bd.png)

Nhập tên project và chọn Target runtime. Nếu chưa có thì tiến hành tạo mới.

![](https://images.viblo.asia/0f3e02f4-8ab9-4e4c-9d0d-7678ece56748.png)

### Tạo web service và client

Giả sử chúng ta cần cung cấp một web service sayHelloWorld. Tạo một class HelloWorld:

```
package com.gpcoder;
 
public class HelloWorld {
     
    public String sayHelloWorld(String name) {
        return "Hello " + name;
    }
}
```

Chúng ta có cấu trúc project như sau:

![](https://images.viblo.asia/c44c9e48-72cb-468d-8a37-afa09a33d664.png)

Tạo web service từ class trên: Nhấn chuột phải lên project –> chọn New -> Other -> Chọn web service

![](https://images.viblo.asia/31f00476-3004-4934-af31-130f14d3baeb.png)

Chọn service implementation và kéo slider tới maximum level. Khi kéo bạn sẽ thấy khung Configuration mô tả các cấu hình sẽ được thiết lập tương ứng với level bạn chọn.

![](https://images.viblo.asia/1e88b836-eeb6-4c1d-ae10-38d34173e7b7.png)

Nhấn Next --> Chọn Document style hoặc RPC style tùy theo nhu cầu của bạn. Trong ví dụ này, tôi sẽ chọn Document Style.

Chọn Finish, chúng ta sẽ có một file WebContent/wsdl/HelloWorld.wsdl được tạo ra và một project SoapWebServiceExampleClient được tạo ra.

![](https://images.viblo.asia/b6a010fe-34ff-40b2-9be2-1fb82be835b5.png)

Nội dung file HelloWorld.wsdl mô tả đầy đủ các thông tin để gọi web service, kiểu dữ liệu nhận và trả về như sau:

```
<?xml version="1.0" encoding="UTF-8"?>
<wsdl:definitions targetNamespace="https://gpcoder.com" xmlns:apachesoap="http://xml.apache.org/xml-soap" xmlns:impl="https://gpcoder.com" xmlns:intf="https://gpcoder.com" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <!--WSDL created by Apache Axis version: 1.4 Built on Apr 22, 2006 (06:55:48 PDT) -->
    <wsdl:types>
        <schema elementFormDefault="qualified" targetNamespace="https://gpcoder.com" xmlns="http://www.w3.org/2001/XMLSchema">
            <element name="sayHelloWorld">
                <complexType>
                    <sequence>
                        <element name="name" type="xsd:string" />
                    </sequence>
                </complexType>
            </element>
            <element name="sayHelloWorldResponse">
                <complexType>
                    <sequence>
                        <element name="sayHelloWorldReturn" type="xsd:string" />
                    </sequence>
                </complexType>
            </element>
        </schema>
    </wsdl:types>
 
    <wsdl:message name="sayHelloWorldRequest">
 
        <wsdl:part element="impl:sayHelloWorld" name="parameters">
 
        </wsdl:part>
 
    </wsdl:message>
 
    <wsdl:message name="sayHelloWorldResponse">
 
        <wsdl:part element="impl:sayHelloWorldResponse" name="parameters">
 
        </wsdl:part>
 
    </wsdl:message>
 
    <wsdl:portType name="HelloWorld">
 
        <wsdl:operation name="sayHelloWorld">
 
            <wsdl:input message="impl:sayHelloWorldRequest" name="sayHelloWorldRequest">
 
            </wsdl:input>
 
            <wsdl:output message="impl:sayHelloWorldResponse" name="sayHelloWorldResponse">
 
            </wsdl:output>
 
        </wsdl:operation>
 
    </wsdl:portType>
 
    <wsdl:binding name="HelloWorldSoapBinding" type="impl:HelloWorld">
 
        <wsdlsoap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http" />
 
        <wsdl:operation name="sayHelloWorld">
 
            <wsdlsoap:operation soapAction="" />
 
            <wsdl:input name="sayHelloWorldRequest">
 
                <wsdlsoap:body use="literal" />
 
            </wsdl:input>
 
            <wsdl:output name="sayHelloWorldResponse">
 
                <wsdlsoap:body use="literal" />
 
            </wsdl:output>
 
        </wsdl:operation>
 
    </wsdl:binding>
 
    <wsdl:service name="HelloWorldService">
 
        <wsdl:port binding="impl:HelloWorldSoapBinding" name="HelloWorld">
 
            <wsdlsoap:address location="http://localhost:8080/SoapWebServiceExample/services/HelloWorld" />
 
        </wsdl:port>
 
    </wsdl:service>
 
</wsdl:definitions>
```

Bạn có thể truy cập file trên ở Browser ở đường dẫn: http://localhost:8080/SoapWebServiceExample/services/HelloWorld?wsdl

### Test Web service sử dụng tool có sẵn của Eclipse

Mở cửa sổ Server: Window –> Show View -> Server -> Nhấn chuột phải lên Server Tomcat -> Start/ Restart:

![](https://images.viblo.asia/f70110d2-db04-4a8c-abe2-a1bcf39254ac.png)

Sau khi Start server -> Chọn tên service để test bên trái -> Nhập giá trị cần test -> Chọn Invoke. Chúng ta có kết quả như sau:

![](https://images.viblo.asia/66ed8ca0-39bd-44fb-9027-7039d9e3c061.png)

Bạn cũng có thể mở trình duyệt và truy cập vào địa chỉ sau để test: http://localhost:8080/SoapWebServiceExampleClient/sampleHelloWorldProxy/TestClient.jsp

Một cách khác để test là nhấn chuột phải lên tên file .wsdl -> chọn Web services -> Test with web service explorer:

![](https://images.viblo.asia/346da71f-4df8-4683-a52f-9d2c54a25c6d.png)

## Tạo Web Service và tạo Client truy cập Web service với JAX-WS API


Trong phần trên chúng ta đã cùng tìm hiểu về cách tạo Web service (WS) sử dụng công cụ có sẵn của Eclipse. Nó giúp chúng ta tạo ứng dụng WS nhanh chóng, nhưng khá khó khăn khi áp dụng vào dự án thực tế, do mỗi lần thay đổi code chúng ta phải build lại Client.

Trong phần tiếp theo này, chúng ta sẽ cùng tìm hiểu cách tự tạo WS.

### Tạo web service

Giả sử chúng ta cần cung cấp service cho các hệ thống khác có thể thêm/ sửa/ xóa/ lấy danh sách user.

Tạo project Java và lần lượt tạo các class sau:

User.java
```
package com.gpcoder.ws;
 
import lombok.Data;
 
@Data
public class User {
 
    private Integer id;
    private String username;
}
```

UserService.java
```
package com.gpcoder.ws;
 
import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
 
@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface UserService {
 
    @WebMethod
    int insert(User user);
 
    @WebMethod
    boolean update(User user);
 
    @WebMethod
    boolean delete(int id);
 
    @WebMethod
    User get(int id);
 
    @WebMethod
    User[] getAll();
}
```

UserServiceImpl.java
```
package com.gpcoder.ws;
 
import java.util.HashMap;
import java.util.Map;
 
import javax.jws.WebService;
 
@WebService(endpointInterface = "com.gpcoder.ws.UserService")
public class UserServiceImpl implements UserService {
 
    private static final Map<Integer, User> USERS = new HashMap<>();
 
    @Override
    public int insert(User user) {
        Integer id = generateUniqueId();
        user.setId(id);
        USERS.put(id, user);
        return id;
    }
 
    private int generateUniqueId() {
        return USERS.keySet().stream().max((x1, x2) -> x1 - x2).orElse(0) + 1;
    }
 
    @Override
    public boolean update(User user) {
        return USERS.put(user.getId(), user) != null;
    }
 
    @Override
    public boolean delete(int id) {
        return USERS.remove(id) != null;
    }
 
    @Override
    public User get(int id) {
        return USERS.getOrDefault(id, new User());
    }
 
    @Override
    public User[] getAll() {
        return USERS.values().toArray(new User[0]);
    }
}
```

Ý nghĩa các Annotation trên:

* WebService : đánh dấu class này như một Web service. Đối số endpointInterface xác định đây là một implementation của một WS Interface cụ thể.
* WebMethod : đánh dấu đây là các phương thức của web service.
* SOAPBinding : xác định web service này theo RPC style hoặc Document style.
* Sau khi đã tạo xong các class cần thiết để xử lý cho Business của WS. Chúng ta sẽ publish WS:

SoapPublisher.java
```
package com.gpcoder.ws;
 
import javax.xml.ws.Endpoint;
 
public class SoapPublisher {
 
    public static final String WS_URL = "http://localhost:8080/ws/users";
 
    public static void main(String[] args) {
        Endpoint.publish(WS_URL, new UserServiceImpl());
    }
}
```

Trong ví dụ này, WS của chúng ta được publish tại địa chỉ http://localhost:8080/ws/users. Chạy chương trình trên, truy cập địa chỉ http://localhost:8080/ws/users?wsdl:

```
This XML file does not appear to have any style information associated
with it. The document tree is shown below.
<!-- Published by JAX-WS RI (http://jax-ws.java.net). RI's version is JAX-WS RI 2.2.9-b130926.1035 svn-revision#5f6196f2b90e9460065a4c2f4e30e065b245e51e. -->
<!-- Generated by JAX-WS RI (http://jax-ws.java.net). RI's version is JAX-WS RI 2.2.9-b130926.1035 svn-revision#5f6196f2b90e9460065a4c2f4e30e065b245e51e. -->
<definitions xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wsp="http://www.w3.org/ns/ws-policy" xmlns:wsp1_2="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://ws.gpcoder.com/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://schemas.xmlsoap.org/wsdl/" targetNamespace="http://ws.gpcoder.com/" name="UserServiceImplService">
    <types>
        <xsd:schema>
            <xsd:import namespace="http://ws.gpcoder.com/" schemaLocation="http://localhost:8080/ws/users?xsd=1" />
        </xsd:schema>
    </types>
    <message name="get">
        <part name="arg0" type="xsd:int" />
    </message>
    <message name="getResponse">
        <part name="return" type="tns:user" />
    </message>
    <message name="update">
        <part name="arg0" type="tns:user" />
    </message>
    <message name="updateResponse">
        <part name="return" type="xsd:boolean" />
    </message>
    <message name="delete">
        <part name="arg0" type="xsd:int" />
    </message>
    <message name="deleteResponse">
        <part name="return" type="xsd:boolean" />
    </message>
    <message name="insert">
        <part name="arg0" type="tns:user" />
    </message>
    <message name="insertResponse">
        <part name="return" type="xsd:int" />
    </message>
    <message name="getAll" />
    <message name="getAllResponse">
        <part name="return" type="tns:userArray" />
    </message>
    <portType name="UserService">
        <operation name="get">
            <input wsam:Action="http://ws.gpcoder.com/UserService/getRequest" message="tns:get" />
            <output wsam:Action="http://ws.gpcoder.com/UserService/getResponse" message="tns:getResponse" />
        </operation>
        <operation name="update">
            <input wsam:Action="http://ws.gpcoder.com/UserService/updateRequest" message="tns:update" />
            <output wsam:Action="http://ws.gpcoder.com/UserService/updateResponse" message="tns:updateResponse" />
        </operation>
        <operation name="delete">
            <input wsam:Action="http://ws.gpcoder.com/UserService/deleteRequest" message="tns:delete" />
            <output wsam:Action="http://ws.gpcoder.com/UserService/deleteResponse" message="tns:deleteResponse" />
        </operation>
        <operation name="insert">
            <input wsam:Action="http://ws.gpcoder.com/UserService/insertRequest" message="tns:insert" />
            <output wsam:Action="http://ws.gpcoder.com/UserService/insertResponse" message="tns:insertResponse" />
        </operation>
        <operation name="getAll">
            <input wsam:Action="http://ws.gpcoder.com/UserService/getAllRequest" message="tns:getAll" />
            <output wsam:Action="http://ws.gpcoder.com/UserService/getAllResponse" message="tns:getAllResponse" />
        </operation>
    </portType>
    <binding name="UserServiceImplPortBinding" type="tns:UserService">
        <soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="rpc" />
        <operation name="get">
            <soap:operation soapAction="" />
            <input>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </input>
            <output>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </output>
        </operation>
        <operation name="update">
            <soap:operation soapAction="" />
            <input>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </input>
            <output>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </output>
        </operation>
        <operation name="delete">
            <soap:operation soapAction="" />
            <input>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </input>
            <output>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </output>
        </operation>
        <operation name="insert">
            <soap:operation soapAction="" />
            <input>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </input>
            <output>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </output>
        </operation>
        <operation name="getAll">
            <soap:operation soapAction="" />
            <input>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </input>
            <output>
                <soap:body use="literal" namespace="http://ws.gpcoder.com/" />
            </output>
        </operation>
    </binding>
    <service name="UserServiceImplService">
        <port name="UserServiceImplPort" binding="tns:UserServiceImplPortBinding">
            <soap:address location="http://localhost:8080/ws/users" />
        </port>
    </service>
</definitions>
```

### Tạo web service client

Bây giờ, chúng ta sẽ viết ứng dụng Client để truy cập các phương thức được cung cấp bởi WS này.

SoapClient.java
```
package com.gpcoder.ws;
 
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
 
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
 
public class SoapClient {
 
    public static void main(String[] args) throws MalformedURLException {
        // Create URL of .wsdl file
        URL wsdlURL = new URL(SoapPublisher.WS_URL + "?wsdl");
 
        // Create a QName using targetNamespace and name
        QName qname = new QName("http://ws.gpcoder.com/", "UserServiceImplService");
 
        // Creates a Service instance with the specified WSDL document location and
        // service qualified name
        Service service = Service.create(wsdlURL, qname);
 
        // We need to pass interface and model beans to client
        UserService userService = service.getPort(UserService.class);
 
        User user1 = new User();
        user1.setId(1);
        user1.setUsername("gpcoder.com");
 
        User user2 = new User();
        user2.setId(2);
        user2.setUsername("gpcoder.com");
 
        System.out.println("Insert User : " + userService.insert(user1));
        System.out.println("Insert User : " + userService.insert(user2));
 
        System.out.println("Get User : " + userService.get(user1.getId()));
 
        user1.setUsername("gpcoder edited");
        System.out.println("Update User : " + userService.update(user1));
 
        System.out.println("Get all Users : " + Arrays.asList(userService.getAll()));
 
        System.out.println("Delete User : " + userService.delete(user1.getId()));
 
    }
}
```

Chạy chương trình trên, chúng ta có kết quả như sau:

```
Insert User : 1
Insert User : 2
Get User : User(id=1, username=gpcoder.com)
Update User : true
Get all Users : [User(id=1, username=gpcoder edited), User(id=2, username=gpcoder.com)]
Delete User : true
```

Trong ví dụ trên, Cient của chúng ta cùng project với WS. Giả sử bây giờ chúng ta chỉ được cung cấp địa chỉ của file .wsdl, không có bất kỳ class java nào. Chúng ta sẽ gọi các phương thức WS như thế nào?

Để dễ dàng theo dõi, tôi tạo thêm một project khác: SoapWebServiceExample2Client. Tiếp theo, mở cmd và chạy lệnh sau ở thư mục src\main\java của project.

`wsimport -s . http://localhost:8080/ws/users?wsdl`

Sau khi chạy xong, chúng ta sẽ có các class tương ứng để có thể gửi request và nhận response từ web service.

Cuối cùng, code để truy cập WS sử dụng các file được tạo ra ở bước trên:

```
package com.gpcoder.ws.client;
 
import java.util.Arrays;
 
import com.gpcoder.ws.User;
import com.gpcoder.ws.UserService;
import com.gpcoder.ws.UserServiceImplService;
 
/**
 * Run the following command to generate java classes file from .wsdl file
 * 
 * wsimport -s . http://localhost:8080/ws/users?wsdl
 */
public class SoapClient {
 
    public static void main(String[] args) {
        UserServiceImplService userServiceImplService = new UserServiceImplService();
        UserService userService = userServiceImplService.getUserServiceImplPort();
         
        User user1 = new User();
        user1.setId(1);
        user1.setUsername("gpcoder.com");
 
        User user2 = new User();
        user2.setId(2);
        user2.setUsername("gpcoder.com");
 
        System.out.println("Insert User : " + userService.insert(user1));
        System.out.println("Insert User : " + userService.insert(user2));
 
        System.out.println("Get User : " + userService.get(user1.getId()));
 
        user1.setUsername("gpcoder edited");
        System.out.println("Update User : " + userService.update(user1));
 
        System.out.println("Get all Users : " + Arrays.asList(userService.getAll()));
 
        System.out.println("Delete User : " + userService.delete(user1.getId()));
    }
```

Toàn bộ cấu trúc source code của 2 ví dụ trên:

![](https://images.viblo.asia/0d1d7b15-da83-4815-908b-d60bded437ed.png)

Link bài viết gốc:  https://gpcoder.com/5615-java-web-services-jax-ws-soap/