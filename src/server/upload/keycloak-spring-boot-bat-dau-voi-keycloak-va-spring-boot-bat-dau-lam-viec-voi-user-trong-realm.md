**Note:** Chuỗi bài viết chủ yếu mang tính lưu trữ kiến thức cho bản thân và chia sẻ lại cho các bạn. Vì khi mình bắt đầu làm việc với Keycload thì rất khó tìm các hướng dẫn bằng tiếng việt. Bài viết có tham khảo từ nhiều nguồn khác nhau. Thanks !

## 1. Keycloak là gì?
Cơ bản Keycloak là một Open Source Identity và Access Management cho Modern Applications và Services. Dùng để quản lý nhận dạng và truy cập vào các ứng dụng/ dịch vụ.
<br>
Về hướng dẫn cài đặt, cách thêm realm, client, role, user trên giao diện web của Keycloak thì các bạn có thể check google hoặc tại đây: [Link1](https://viblo.asia/p/keycloack-loadbalancer-springboot-angular-L4x5xV91ZBM)  hoặc tại đây: [Link2](https://huongdanjava.com/vi/keycloak) ( Các bạn ấy viết rất đầy đủ và chi tiết về các thông số hiển thị trên giao diện của Keycloak)
## 2. Vậy đã có hướng dẫn rồi thì mình viết về vấn đề gì?
Nếu một ngày đẹp trời, bạn cho phép một người ( đơn vị) thứ 3 nhảy vào thao tác với ứng dụng Keycload của bạn nhưng lại không muốn cho họ có quyền vào thẳng ứng dụng của bạn để thực hiện.... Chà. Vậy bạn cần 1 ứng dụng/APIs cho họ gọi để thao tác với Keycloak.
Vậy bạn cần tương tác với Keycloak từ code chứ không phải từ giao diện. 
## 3. Nếu đây là vấn đề bạn quan tâm => vậy bắt đầu thôi!
Để bắt đầu, Mình khuyên các bạn nên đọc qua hai bài viết mình đã giới thiệu và tạo được realm, client, role và 1 user cho client.
<br>
**Chú ý!!!!! Mình đã mất nửa ngày cho vấn đề đơn giản này** => Đó là Role Mapping của user

Như ảnh bên dưới, 1 user có 2 kiểu role  **Realm Roles**  và **Client Roles**
<br>
**Realm Roles** : Các bạn sẽ tạo được khi tạo xong Realm
<br>
**Client Roles**: Đây là vấn đề chính. Để user có quyền thao tác và call API của Keycloak các bạn phải set client role cho user đó, có rất nhiều loại quyền, các bạn có thể đọc chi tiết. 
<br>Ở bài demo này mình sẽ sử dụng quyền realm-management và Available Roles là realm-admin
<br>
                ![](https://images.viblo.asia/fba75abe-d4ac-4a8f-84a1-91c4e7b71b90.png)
                
###  3.1 Dependency
Để sử dụng Keycloak trong Spring boot thì các bạn cần:
1. Đương nhiên 1 ứng dụng spring cơ bản rồi, Gradle hay Maven đều được
2. Dependency của Keycloak
 <br>
Với Gradle các bạn thêm vào file build.gradle
<br>
```
	implementation group: 'org.keycloak', name: 'keycloak-spring-boot-starter', version: '16.1.0'
	implementation group: 'org.keycloak', name: 'keycloak-admin-client', version: '16.1.0'
```
Với Maven thì các bạn thêm vào file pom
<br>
```
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-spring-boot-starter</artifactId>
    <version>16.1.0</version>
</dependency>
<dependency>
    <groupId>org.keycloak</groupId>
    <artifactId>keycloak-admin-client</artifactId>
    <version>16.1.0</version>
</dependency>
```
<br>
Thêm config vào file yml 

<br>

```
# Keycloak settings
keycloak:
  realm: DemoKeycloak
  auth-server-url: http://localhost:8080/auth
  ssl-required: none
  resource: demo-app
  use-resource-role-mappings: true
  bearer-only: true
  cors: true
  principal-attribute: preferred_username
```
<br>

###  3.2 Tạo Keycloak Instance
<br>
Mình sẽ viết 1 hàm để lấy ra instance của Keycloak. ***env*** là biến môi trường để lấy ra dữ liệu đã lưu trong file .properties hoặc .yaml ( Dùng Spring thì 100% các bạn thừa biết rồi , cứ vẽ vời thêm chuyện!!!!)
<br>
Hàm để lấy ra instance có dạng này Keycloak.getInstance(serverUlr, realm, username, password, clientId, clientSecret)
<br>
Các bạn nên viết 1 file utils như này
<br>

```
    @Autowired
    Environment env;
    
    public Keycloak getKeycloakInstance() {
        return Keycloak.getInstance(
                env.getProperty("keycloak.auth-server-url"),
                env.getProperty("keycloak.realm"),
                env.getProperty("keycloak-config.username"),
                env.getProperty("keycloak-config.password"),
                env.getProperty("keycloak.resource"),
                env.getProperty("keycloak-config.client-secret"));
    }
```

<br>
Sau đó các bạn cần dùng ở đâu thì gọi ra thôi
<br>

```
 @Autowired
    KeycloakUtils keycloakUtils;

    public void getListUser(UserRegisterRequest request) {

        Keycloak keycloak = keycloakUtils.getKeycloakInstance();
        .....
```

### 3.2 Lấy token ( nếu cần)
Token phục vụ api login
<br>
```
keycloak.tokenManager().getAccessToken().getToken();
keycloak.tokenManager().getAccessToken().getExpiresIn();

```

### 3.3 Lấy danh sách users
**Lưu ý: các bạn chỉ có thể lấy ra danh sách user của client mà user admin đã dùng để lấy Keycloak instance thôi nhé!!!!**

<br>

```
 try {
        keycloak = getKeycloakInstance();
        List<UserRepresentation>   userRepresentations = keycloak.realm(env.getProperty("keycloak.realm")).users().list();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (keycloak != null) {
                keycloak.close();
            }
        }
```

<br>
Quá đơn giản đúng không, các bạn nhớ phải gọi  keycloak.close();  để đóng instance sau khi call xong nhé
<br>

###  3.4 Lấy user

Thường thì 1 user sẽ có thể định danh bởi 2 trường, **userId** và **userName**

<br>
Nếu lấy theo userName:

<br>

  ```
  keycloak = getKeycloakInstance();
  res = keycloak.realm(env.getProperty("keycloak.realm")).users().search(request.getParam()).get(0);
  
  ```
 
<br>
Nếu lấy theo userId: các bạn không thể truyền vào id để get trực tiếp như user được, nên ở đây mình lọc ra từ danh sách user luôn ( hơi bị củ chuối):
<br>


```
           UserRepresentation user = new UserRepresentation();
           keycloak = getKeycloakInstance();
           List<UserRepresentation> userRepresentations = keycloak.realm(env.getProperty("keycloak.realm")).users().list();
            for (UserRepresentation lts : userRepresentations) {
                if (lts.getId().equalsIgnoreCase(request.getParam())) {
                    user = lts;
                    break;
                }
            }
```


### 3.5 Add User

Để thêm mới một user các bạn làm như sau:
<br>
Các bạn cần có 1 model AddUserDTO như sau ( mình xài Lombok nên không có Get/Set j cả nha):

<br>

```
public class AddUserDTO  {
    private String userName;
    private String email;
    private String phoneNumber;
    private String password;
    private String firstname;
    private String lastName;
}
```

<br>
Như các bạn thấy mình có 1 biến statusCode ở cuối cùng, Keycload sẽ trả về status theo chuẩn HTTP để chúng ta dễ hanlling nhé
<br>

```
            keycloak = getKeycloakInstance();
            UsersResource userResource = keycloak.realm(env.getProperty("keycloak.realm")).users();
            CredentialRepresentation credential = Credentials
                    .createPasswordCredentials(request.getPassword());
            UserRepresentation user = new UserRepresentation();
            user.setUsername(request.getUserName());
            user.setFirstName(request.getFirstname());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setCredentials(Collections.singletonList(credential));
            user.setEnabled(true);
            Response res = userResource.create(user);
            int statusCode = res.getStatus();
            
```


### 3.6 Update User

Để update một user các bạn làm như sau:
<br>
Cần Model UpdateUserDTO như sau:


```
public class UpdateUserDTO  {
   private String userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private String password;
    private String firstname;
    private String lastName;
}
```

Làm thôi
<br>

```
                UsersResource userResource = keycloak.realm(env.getProperty("keycloak.realm")).users();
                CredentialRepresentation credential = Credentials
                        .createPasswordCredentials(request.getPassword());
                UserRepresentation user = new UserRepresentation();
                user.setUsername(request.getUserName());
                user.setFirstName(request.getFirstname());
                user.setLastName(request.getLastName());
                user.setEmail(request.getEmail());
                user.setCredentials(Collections.singletonList(credential));
                 userResource.get(request.getUserId()).update(user);
```


### 3.7 Remove User

```
           UsersResource userResource = keycloak.realm(env.getProperty("keycloak.realm")).users();
            UserRepresentation user = new UserRepresentation();
            userResource.get(userId).remove();
```


## 4 Các thao tác quan trọng khác
 <br>
 Khi thao tác với user không chỉ CRUD là đủ, các bạn cần set quyền hạn ( Role), set trạng thái ( enable/disable), thêm các attribute cho user
 <br>
 Mình sẽ hướng dẫn về trạng thái và attribute, còn role sẽ để bài sau nhé:
 
 ###  Trạng thái của user
 <br>
 Data của khách hàng là cực kì quan trọng, do đó trên thực tế việc remove ít khi được thực hiện, thay vào đó người ta thường chuyển trạng thái hoạt động về disable
 <br>
 Cho nên các bạn chỉ cần set trạng thái của user về disable là user đó sẽ không thể đăng nhập hệ thống được nữa:
 
 <br>
 
 ```
  user.setEnabled(false);
  ```
  

  
  ###  Attribute của user
  
  Trên thực tế các  thông tin khi tạo mới user bao gồm fistName, lastName, email là không đủ. Các bạn cần thêm một số trường  như SĐT, Địa chỉ.......
  <br>
  Vậy các bạn làm như sau (: 
  <br>
  Ở bước thêm mới:
  <br>
  ```
  //tạo mới mapp Attribute
    Map<String, List<String>> attribute = new HashMap<>();
    //tạo các attribute
    List<String> phone = Arrays.asList(request.getPhoneNumber());
    List<String> mobileDevice = Arrays.asList(request.getMobileDevice());
    
    //đẩy vào Map
    attribute.put(Constants.PHONE_NUMBER, phone);
    attribute.put(Constants.DEVICE, device);
    attribute.put(Constants.MOBILE_DEVICE, mobileDevice);
    
    //set att
    user.setAttributes(attribute);
    
  ```
  Ở bước Update các bạn cần lấy ra attribute cũ và cập nhật lại giá trị cần xử lý thôi nhé, làm như bước tạo mới là nó clear cả dữ liệu không cần update đó
  <br>
  **Note:** Kiểu dữ liệu của attribute là varchar(255) :) nên các bạn muốn lưu j dài hơn nhớ thay đổi trong db của Keycloak nhé
  
  
  
  
## 5 Tóm tắt bài viết
  
 
 Bài viết này mình hướng dẫn các bạn tạo user và các thao tác với user của Kecload thông qua Spring boot. Hi vọng có thể giúp đỡ được các bạn trong quá trình làm việc. 
 <br>
 Có sai sót ở đâu các bạn giúp đỡ mình nhé
 
 Tham khảo:
 <br>
 https://huongdanjava.com/vi/keycloak
 <br>
 https://www.baeldung.com/spring-boot-keycloak
 <br>
 https://medium.com/teamarimac/how-to-secure-spring-boot-application-with-keycloak-3ffed7e500a4