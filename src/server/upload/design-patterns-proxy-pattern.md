Trong proxy pattern, Có 1 class đại diện cho chức năng của lớp khác. Kiểu design thuộc nhóm structural pattern. Proxy Pattern  cung cấp một đại diện hoặc placeholder cho một đối tượng khác để kiểm soát quyền truy cập vào nó.
Proxy pattern , chúng ta tạo 1 object có original object để giao tiếp chức năng của nó với thế giới bên ngoài.
# Thực hiện:
Dưới dây là những ví dụ điển hiên phổ biến có thể áp dụng Proxy :
1. Một  proxy remove cung cấp 1 đại diện cục bộ cho object nàm trong 1 địa chỉ khác. Đây là mã "Stub" trong RPC và CORBA cung cấp.
2. Một proxy virtual là placeholer  chỗ cho các  "expensive to create" object . Object  thực sự chỉ được tạo khi một khách hàng đầu tiên yêu cầu / truy cập đối tượng.
3. Proxy protective  kiểm soát quyền truy cập vào master object. Object "surrogate" kiểm tra xem người gọi có quyền truy cập cần thiết trước khi chuyển tiếp yêu cầu hay không.
4. Một proxy smart sẽ bổ sung thêm các hành động khi một đối tượng được truy cập.
![](https://images.viblo.asia/abaf01d8-1fc2-458c-93d8-3302e23eb475.png)
# Code demo:
```
package com.java2novice.dp.proxy;
 
public interface Internet {
 
    public void connectTo(String host) throws Exception;
}
```
### Proxy internet class
```
package com.java2novice.dp.proxy;
 
import java.util.ArrayList;
import java.util.List;
 
public class InternetProxy implements Internet {
 
    private Internet internet = new RealInternet();
    private static List<String> restrictedSites;
     
    static {
        restrictedSites = new ArrayList<String>();
        restrictedSites.add("jumbxyz.com");
        restrictedSites.add("testme.com");
        restrictedSites.add("adult-site.com");
        restrictedSites.add("bad-site.com");
    }
     
    @Override
    public void connectTo(String host) throws Exception {
         
        if(!restrictedSites.contains(host.toLowerCase())){
            internet.connectTo(host);
        }
        throw new Exception("Company restricted this site view");
 
    }
 
}
```
### proxy demo class
```
package com.java2novice.dp.proxy;
 
public class ProxyDemo {
 
    public static void main(String a[]){
         
        Internet intConn = new InternetProxy();
        try {
            intConn.connectTo("java2novice.com");
            intConn.connectTo("adult-site.com");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```
## Kết quả:
Connecting to java2novice .com
Company restricted this site view
Link tham khảo: https://www.tutorialspoint.com/design_pattern/proxy_pattern.htm