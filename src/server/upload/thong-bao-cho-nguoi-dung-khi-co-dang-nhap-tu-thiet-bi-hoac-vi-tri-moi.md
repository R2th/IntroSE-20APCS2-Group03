# 1. Giới thiệu
Trong bài viết này, chúng ta sẽ tìm ra cách để có thể nhận biết nếu người dùng đang đăng nhập từ một thiết bị hoặc một vị trí mới.

Chúng ta sẽ gửi cho họ một thông báo để người dùng biết được rằng chúng ta có thể phát hiện ra những truy cập bất thường từ tài khoản của họ.

# 2. Vị trí của người dùng và thông tin thiết bị
Có 2 thứ chúng ta bắt buộc phải có nếu muốn thực hiện tính năng này đó là vị trí của người dùng và thông tin chi tiết về thiết bị mà họ thường xuyên đăng nhập.

Xem xét đến việc chúng ta đang sử dụng HTTP để trao đổi thông điệp với người dùng của mình, chúng ta sẽ phải dựa vào yêu cầu HTTP đến và metadata của nó để truy xuất thông tin này.

Thật may cho chúng ta là header của HTTP là nơi chứa những thông tin như thế này.

## 2.1 Vị trí thiết bị
Trước khi chúng ta có thể ước chừng vị trí, chúng ta cần lấy được địa chỉ IP gốc của họ.

Chúng ta có thể làm điều đó bằng cách sử dụng những phướng pháp sau:
* ***[X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)***: là công cụ để chúng ta có thể xác định địa chỉ IP gốc của client kết nối với máy chủ web thông qua proxy HTTP hoặc bộ cân bằng tải.
*  ***[ServletRequest.getRemoteAddr()](https://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html#getRemoteAddr())***: Một hàm có thể trả về địa chỉ IP của client hoặc proxy cuối cùng đã gửi request.

Việc trích xuất địa chỉ IP của người dùng từ request HTTP đôi khi không đáng tin cậy vì chúng có thể bị giả mạo. Tuy nhiên, hãy đơn giản hóa điều này trong bài viết của chúng ta và giả định rằng những người dùng của chúng ta sẽ hoàn toàn "thành thật" trong việc truy cập web.

Khi chúng ta đã truy xuất địa chỉ IP, chúng ta có thể chuyển đổi địa chỉ đó sang vị trí trong thế giới thực thông qua ***[Geolocation](https://en.wikipedia.org/wiki/Geopositioning)***

## 2.2 Thông tin thiết bị
Tương tự như cách lấy địa chỉ IP, trong HTTP header cũng có chứa thông tin về thiết bị mà người dùng gửi lên cho chúng ta, nó được gọi là ***[User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)***.

Một cách ngắn gọn thì nó sẽ mang thông tin cho phép chúng ta xác định loại ứng dụng, hệ điều hành và nhà cung cấp phần mềm, phiên bản của user-agent.

Dưới đây là một ví dụ về việc User-Agent sẽ trông như thế nào:
```
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 
  (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
```

Trong ví dụ bên trên, thiết bị đang chạy trên hệ điều hành Mac OS X 10.14 và sử dụng Chrome 71.0 để gửi request.

Thay vì triển khai parser User-Agent từ đầu một cách thủ công, chúng ta sẽ sử dụng các giải pháp hiện có đã được thử nghiệm và đáng tin cậy hơn.

# 3 Phát hiện thiết bị hoặc vị trí mới
Bây giờ chúa ta đã có được thông tin chúng ta cần. Hãy thay đổi file ***[AuthenticationSuccessHandler ](https://www.baeldung.com/spring_redirect_after_login)*** để tiến hành validatesau khi người dùng đăng nhập:
```
public class MySimpleUrlAuthenticationSuccessHandler 
  implements AuthenticationSuccessHandler {
    //...
    @Override
    public void onAuthenticationSuccess(
      final HttpServletRequest request,
      final HttpServletResponse response,
      final Authentication authentication)
      throws IOException {
        handle(request, response, authentication);
        //...
        loginNotification(authentication, request);
    }

    private void loginNotification(Authentication authentication, 
      HttpServletRequest request) {
        try {
            if (authentication.getPrincipal() instanceof User) { 
                deviceService.verifyDevice(((User)authentication.getPrincipal()), request); 
            }
        } catch(Exception e) {
            logger.error("An error occurred verifying device or location");
            throw new RuntimeException(e);
        }
    }
    //...
}
```

Chúng ta đơn giản sẽ gọi tới một component mới ***DeviceService***. Component này sẽ đóng gói mọi thứ mà chúng ta cần để xác định thiết bị, vị trí mới và báo cho người dùng.

Bên cạnh đó, trước khi chúng ta xem xét kỹ ***DeviceService***, hãy tạo entity ***DeviceMetadata*** để duy trì dữ liệu của người dùng theo thời gian:
```
@Entity
public class DeviceMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private String deviceDetails;
    private String location;
    private Date lastLoggedIn;
    //...
}
```

Và Reponsitory của nó:
```
public interface DeviceMetadataRepository extends JpaRepository<DeviceMetadata, Long> {
    List<DeviceMetadata> findByUserId(Long userId);
}
```

Sau khi tạo Entity và Repository, chúng ta đã có thể thu thập thông tin chúng ta cần để lưu thiết bị của người dùng và vị trí của họ.

# 4. Giải nén thông tin vị trí của user
Trước khi chúng ta có thể ước tính vị trí địa lý của user, chúng ta cần lấy IP của họ:
```
private String extractIp(HttpServletRequest request) {
    String clientIp;
    String clientXForwardedForIp = request
      .getHeader("x-forwarded-for");
    if (nonNull(clientXForwardedForIp)) {
        clientIp = parseXForwardedHeader(clientXForwardedForIp);
    } else {
        clientIp = request.getRemoteAddr();
    }
    return clientIp;
}
```

Nếu có ***X-Forwarded-For*** header ở trong request, chúng ta sẽ dùng nó để lấy thông tin IP. Nếu không chúng ta sẽ sử dụng hàm ***getRemoteAddr()***

Một khi chúng ta có địa chỉ IP của họ, chúng ta có thể ước tính vị trí địa lý với sự trợ giúp của ***[Maxmind](https://www.baeldung.com/geolocation-by-ip-with-maxmind)***
```
private String getIpLocation(String ip) {
    String location = UNKNOWN;
    InetAddress ipAddress = InetAddress.getByName(ip);
    CityResponse cityResponse = databaseReader
      .city(ipAddress);
        
    if (Objects.nonNull(cityResponse) &&
      Objects.nonNull(cityResponse.getCity()) &&
      !Strings.isNullOrEmpty(cityResponse.getCity().getName())) {
        location = cityResponse.getCity().getName();
    }    
    return location;
}
```

# 5. Thông tin về thiết bị của người dùng
Một khi User-Agent còn chứa toàn bộ thông tin chúng ta cần, thì điều cần quan tâm sẽ chỉ là làm sao để lấy nó ra. Và như chúng ta đã nói ở trên, với sự trợ giúo của những công cụ có sẵn (ở đây là ***[uap-java](https://search.maven.org/search?q=g:com.github.ua-parser%20AND%20a:uap-java)***) việc lấy những thông tin này trở nên vô cùng đơn giản.
```
private String getDeviceDetails(String userAgent) {
    String deviceDetails = UNKNOWN;
    
    Client client = parser.parse(userAgent);
    if (Objects.nonNull(client)) {
        deviceDetails = client.userAgent.family
          + " " + client.userAgent.major + "." 
          + client.userAgent.minor + " - "
          + client.os.family + " " + client.os.major
          + "." + client.os.minor; 
    }
    return deviceDetails;
}
```

# 6. Gửi thông tin cho người dùng
Để gửi thông tin cho người dùng, chúng ta cần so sánh thông tin chúng ta đã lấy ra được ở trên và thông tin cũ của người dùng để kiểm tra xem những thiết bị hay vị trí này đã từng xuất hiện trong quá khứ chưa.

Hãy nhìn qua hàm ***DeviceService.vẻifyDevice()*** sau:
```
public void verifyDevice(User user, HttpServletRequest request) {
    
    String ip = extractIp(request);
    String location = getIpLocation(ip);

    String deviceDetails = getDeviceDetails(request.getHeader("user-agent"));
        
    DeviceMetadata existingDevice
      = findExistingDevice(user.getId(), deviceDetails, location);
        
    if (Objects.isNull(existingDevice)) {
        unknownDeviceNotification(deviceDetails, location,
          ip, user.getEmail(), request.getLocale());

        DeviceMetadata deviceMetadata = new DeviceMetadata();
        deviceMetadata.setUserId(user.getId());
        deviceMetadata.setLocation(location);
        deviceMetadata.setDeviceDetails(deviceDetails);
        deviceMetadata.setLastLoggedIn(new Date());
        deviceMetadataRepository.save(deviceMetadata);
    } else {
        existingDevice.setLastLoggedIn(new Date());
        deviceMetadataRepository.save(existingDevice);
    }
}
```

Sau khi lấy được thông tin, chúng ta so sánh chuhngs với data tồn tại trong ***DeviceMetadata*** để kiểm tra xem nếu data đã tồn tại hay chưa
```
private DeviceMetadata findExistingDevice(
  Long userId, String deviceDetails, String location) {
    List<DeviceMetadata> knownDevices
      = deviceMetadataRepository.findByUserId(userId);
    
    for (DeviceMetadata existingDevice : knownDevices) {
        if (existingDevice.getDeviceDetails().equals(deviceDetails) 
          && existingDevice.getLocation().equals(location)) {
            return existingDevice;
        }
    }
    return null;
}
```

Nếu chưa, chúng ta cần gửi thông tin về cho người dùng để họ biết là chúng ta đá phát hiện ra thao tác đăng nhập bất thường từ tài khoản của họ. Nếu không chúng ta chỉ đơn giản là cập nhật trường ***lastLogingedIn*** vào thiết bị tương ứng.

# 7. Kết luận
Trong bài viết này, chúng ta đã tìm hiểu làm cách nào để gửi thông báo cho người dùng trong trường hợp chúng ta phát hiện ra truy cập bất thường từ tài khoản người dùng.

Nếu có thắc mắc gì hãy comment bên dưới nhé.

Source:  https://www.baeldung.com/spring-security-login-new-device-location?fbclid=IwAR0N11S-D56rZXIEaFKndMrqouyz-zjIi8iqt-r0egCjhH2Ub6BKqXE5IUk