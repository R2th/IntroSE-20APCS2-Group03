Bài viết này mình sẽ tìm hiểu và trình bày về Spring Boot Actuator. Chúng ta sẽ tìm hiểu cách sử dụng, cấu hình và mở rộng công cụ giám sát này trong Spring Boot 1.x, so sánh với Boot 2.x.
Nội dung bài viết:
- Actuator là gì?
- Spring Boot 1.x Actuator
- Spring Boot 2.x Actualto

## 1. Actuator là gì?
Spring Boot Actuator là một sub-probject của Spring Boot. Actuator cho phép ta theo dõi, giám sát ứng dụng, thu thập số liệu, lưu lượng truy cập hay trạng thái cơ sở dữ liệu, v.v. mà không cần thêm bất kỳ dòng code nào.
Một khi project của ta được cấu hình Spring Actuator thì mặc định ta sẽ có sẵn 16 endpoint để quản lý và theo dõi ứng dụng của ta. Danh sách 16 endpont này sẽ được giới thiệu dưới đây. Trong trường hợp ta muốn có thêm những kiểm soát khác cho ứng dụng thì ta có thể thêm endpoint mới của riêng mình.

### Cấu hình Actuator trong Spring Boot
Để sử dụng Actuator chúng ta chỉ việc thêm `spring-boot-actuator` trong file Maven quản lý dependency.
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## 2. Spring Boot Actuator trong Boot 1.x
Ở version 1.x, Actuator theo một R/W model, điều đó có nghĩa là chúng ta có thể đọc hoặc ghi từ vào nó. Ví dụ, chúng ta có lấy Metrics - số liệu hay health của ứng dụng. Ngoài ra, chúng ta có thể ngừng ứng dụng hay thay đổi cấu hình log của ứng dụng một cách đơn giản, dễ dàng.

Actuator yêu cầu Spring MVC để lộ các endpoint thông qua HTTP mà không có công nghệ nào khác được hỗ trợ.

### 2.1 Endpoint mặc định
Boot version 1.x có mô hình bảo mật của riêng nó. Nó tận dụng những cấu trúc của Spring Security, nhưng nó cần được cấu hình độc lập với phần còn lại của ứng dụng. Ngoài ra, hầu hết các Endpoint đều nhạy cảm, có nghĩa là chúng không hoàn toàn công khai hay nói một cách khác, hầu hết thông tin sẽ bị bỏ qua, chỉ một số ít không như vậy, ví dụ endpoint `/info`.
Sau đây là một số enpoint mặc định tiêu biểu:
- */health*: Cho biết thông tin "sức khỏe" của ứng dụng như một trạng thái khi truy cập thông qua kết nối không xác thực, hay toàn bộ chi tiết tin message khi xác thực. Nó không nhạy cảm theo mặc định.
- */info*: Nó hiển thị thông tin của ứng dụng một cách tùy ý.
- */metricts*: Hiển thị thông tin "số liệu" của ứng dụng tại thời điểm hiện tại.
- */trace*: Hiển thị thông tin những request HTTP cuối cùng.
- */beans*: Hiển thị các bean đã được cấu hình của ứng dụng.
- */loggers*: Hiển thị và thay đổi cấu hình log của ứng dụng.
- */mappings*: Hiển thị danh sách toàn bộ path của ứng dụng `@RequestMapping`.
- */shutdown*: Nó cho phép ứng dụng được shutdown một cách bình thường.

### 2.2 Cấu hình endpoint
Mỗi endpoint có thể được tùy biến các thuộc tính bằng cách sử dụng format: `endpoints.[endpoint name].[property to customize]`
Ba thuộc tính cho phép:
- id: id mà endpoint này truy cập thông qua HTTP.
- enabled: giá trị `true` là có thể truy cập, ngược lại thì không.
- sensitive: nếu là true thì cần xác thực để hiển thị thông tin quan trọng thông qua HTTP.
Ví dụ về tùy biến endpoint `/beans`:
```
endpoints.beans.id=springbeans
endpoints.beans.sensitive=false
endpoints.beans.enabled=true
```
### 2.3 Endpoint */health*
Endpoint `/health` dùng để kiểm tra health hay state của ứng dụng đang hoạt động. Nó thường được thi bởi phần mềm giám sát khác nhằm cảnh báo chúng ta nếu ứng dụng đang hoạt động bỗng nhiên dừng, hay hoạt động bất thường bởi những lý khác. Ví dụ, vấn đề về kết nối với database, thiếu dung lượng ổ đĩa. v.v.

Mặc định chỉ thông tin trạng thái việc truy cập không xác thực thông qua HTTP được hiển thị.
```
{
    "status" : "UP"
}
```
Thông tin health của ứng dụng được thu thập từ tất cả các bean phát triển từ interface HealthIndicator được cấu hình trong context.

Một số thông tin được cung cấp bở HealthIndicator có tính chất nhạy cảm, nhưng chúng ta có thể cấu hình endpoint.health.sensitive=false để lộ ra nhiều thông tin chi tiết hơn như dung lượng trống của ổ đĩa, các kết nối messaging brocker, v.v.

### 2.4 Endpoint */info*
Chúng ta cũng có thể tùy biến endpoint /info như sau.
```
info.app.name=Spring Sample Application
info.app.description=This is my first spring boot application
info.app.version=1.0.0
```
Và kết quả đầu ra.
```
{
    "app" : {
        "version" : "1.0.0",
        "description" : "This is my first spring boot application",
        "name" : "Spring Sample Application"
    }
}
```
### 2.5 Endpoint */metrics*
Endpoint này cung cấp thông tin về OS, JVM như là chỉ số của ứng dụng. Sau khi kích hoạt endpoint này chúng ta nhận thông tin như memory, heap, các processor, các thread, các class đã load, các class chưa được load, các thread pool cùng với một số chỉ số HTTP.

Sau đây là thông tin mà /metrics có thể cung cấp.
```
{
    "mem" : 193024,
    "mem.free" : 87693,
    "processors" : 4,
    "instance.uptime" : 305027,
    "uptime" : 307077,
    "systemload.average" : 0.11,
    "heap.committed" : 193024,
    "heap.init" : 124928,
    "heap.used" : 105330,
    "heap" : 1764352,
    "threads.peak" : 22,
    "threads.daemon" : 19,
    "threads" : 22,
    "classes" : 5819,
    "classes.loaded" : 5819,
    "classes.unloaded" : 0,
    "gc.ps_scavenge.count" : 7,
    "gc.ps_scavenge.time" : 54,
    "gc.ps_marksweep.count" : 1,
    "gc.ps_marksweep.time" : 44,
    "httpsessions.max" : -1,
    "httpsessions.active" : 0,
    "counter.status.200.root" : 1,
    "gauge.response.root" : 37.0
}
```

## 2.6 Tạo một Endpoint mới
Bên cạnh việc sử dụng các endpoint mặc định sẵn có do Spring Boot cung cấp, chúng ta có thể tạo endpoint mới.
Để tạo endpoint mới chúng ta cần implement Interface Endpoint<T>.
```
@Component
public class CustomEndpoint implements Endpoint<List<String>> {
     
    @Override
    public String getId() {
        return "customEndpoint";
    }
 
    @Override
    public boolean isEnabled() {
        return true;
    }
 
    @Override
    public boolean isSensitive() {
        return true;
    }
 
    @Override
    public List<String> invoke() {
        // Custom logic to build the output
        List<String> messages = new ArrayList<String>();
        messages.add("This is message 1");
        messages.add("This is message 2");
        return messages;
    }
}
```
Và kết quả output của enpoint mới của ta như sau.
```
[ "This is message 1", "This is message 2" ]
```
## 3. Actuator trong Boot 2.x
Đến Spring Boot 2.x, Actuator giữ những mục đích cơ bản của nó, nhưng đơn giản hóa mô hình của nó, mở rộng những khả năng của mình và kết hợp các giá trị mặc định tốt hơn ở phiên bản 1.x.

Trước tiên, phiên bản này trở thành công nghệ bất khả tri. Ngoài ra, nó đơn giản hóa mô hình bảo mật bằng cách hợp nhất nó với ứng dụng làm một.

Sau nữa, trong các thay đổi khác nhau, điều quan trọng cần lưu ý là một số trong số đó đang phá vỡ. Bao gồm các request/response HTTP như các API Java. Phiên bản mới hỗ trợ mô hình CRUD, trái ngược với mô hình RW cũ.

###  Những thay đổi quan trọng
Không giống phiên bản trước, Actuator trong Boot 2.x đã vô hiệu hóa hầu hết các endpoint mặc định. Do đó, chỉ còn hai endpoint mặc định là /health và /info.

Để kích hoạt chúng, ta có thể thiết lập thông số `management.endpoints.web.exposure.include=*` cho toàn bộ endpoint, hay liệt kê từng endpoint muốn bật.

**Tài liệu tham khảo**

- [baeldung-Spring boot actuator](http://www.baeldung.com/spring-boot-actuators)
- [Spring doc - Endpoint](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html)