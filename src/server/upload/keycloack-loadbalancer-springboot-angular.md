### **Hướng Dẫn Sử Dụng Keycloak**

**1.	Giới thiệu**

**1.	Mục Đích**

Xây dựng module SSO(Single-Sign-On) bao gồm 2 chức năng chính : Xác thực và Phân quyền cho các Web application.

**2.	Các khái niệm chính**

**User** : Người dùng là các thực thể có thể đăng nhập vào hệ thống . 
* Các thuộc tính  :  Email,Username,Password, Address,PhoneNumber, DateOfBirth.
* User có thể được gán vào Group có các Role cụ thể.
* User có thể được gán Role cụ thể.

**Authentication** : Quá trình xác định và xác thực người dùng

**Authorization** : Quá trình cấp quyền truy cập cho người dùng.

**Credentials** : Thông tin xác thực là những phần dữ liệu mà Keycloak sử dụng để xác minh danh tính của người dùng. Một số ví dụ là mật khẩu, mật khẩu dùng một lần, chứng chỉ kỹ thuật số hoặc thậm chí cả dấu vân tay.

**Roles** : Vai trò xác định một loại hoặc danh mục người dùng.

**User role mapping** : Gán user vào các role mà user đó có thể có.

**Composite roles** : Thể hiện sự kế thừa trong việc phân quyền (quyền to hơn có thể thực hiện được quyền nhỏ hơn khi đã thực hiện mapping role)

**Groups** : Groups quản lý các nhóm người dùng. Các thuộc tính có thể được xác định cho một nhóm. Có thể gán các Role cho một Group.Người dùng trong một nhóm kế thừa các thuộc tính và Role mà nhóm đó xác định.

**Realms** : Một lĩnh vực quản lý một tập hợp User, Credential , Role và Group. Một người dùng thuộc về và đăng nhập vào một lĩnh vực. Các lĩnh vực không thể giao tiếp với nhau.

**Clients** : Client là các thực thể có thể yêu cầu Keycloak xác thực người dùng. Thông thường, client là các ứng dụng(application) và dịch vụ (service).

**Consent** : Consent là khi bạn với tư cách là quản trị viên muốn người dùng cấp quyền cho một client  trước khi ứng dụng đó có thể tham gia vào quá trình xác thực. Sau khi người dùng cung cấp thông tin đăng nhập của họ, Keycloak sẽ bật lên màn hình xác định khách hàng yêu cầu đăng nhập và thông tin nhận dạng nào được yêu cầu của người dùng. Người dùng có thể quyết định có cấp yêu cầu hay không.

**Client scopes** : Khi một client đã  đăng ký, scope xác định phạm vi vai trò cho ứng dụng khách.

**Client role** : Client có thể xác định role cụ thể cho client.

**Identity token** : g cấp thông tin nhận dạng về người dùng.

**Access token** : Cung cấp quyền truy cập vào dịch vụ đang được gọi.

**Assertion** : Thông tin về người dung  trong phản hồi xác thực SAML đã cung cấp siêu dữ liệu nhận dạng về người dùng đã được xác thực.

**Service account** : Mỗi khách hàng có một tài khoản dịch vụ tích hợp cho phép khách hàng có được access token.

**Direct grant** : Một cách để khách hàng có được access token thay mặt cho người dùng thông qua lệnh gọi REST.

**Protocol mappers**  : OIDC hoặc SAML. 

**Session** : Khi người dùng đăng nhập, một phiên được tạo để quản lý phiên đăng nhập. Một phiên chứa thông tin như thời điểm người dùng đăng nhập và những ứng dụng nào đã tham gia trong một lần đăng nhập trong phiên đó. Cả quản trị viên và người dùng đều có thể xem thông tin phiên.

**User federation provider** : Keycloak có thể lưu trữ và quản lý người dùng.  LDAP hoặc Active Directory để lưu trữ thông tin người dùng và thông tin xác thực.

**Identity provider** : Nhà cung cấp danh tính (IDP) là một dịch vụ có thể xác thực người dùng. Keycloak là một IDP.

**Identity provider federation** : Keycloak có thể được định cấu hình để ủy quyền xác thực cho một hoặc nhiều IDP ( Facebook Google ) .Keycloak có thể ủy quyền xác thực cho bất kỳ OpenID Connect hoặc SAML 2.0 IDP nào khác.

**Identity provider mappers** : Khi thực hiện liên kết IDP, bạn có thể ánh xạ các mã thông báo và xác nhận đến với các thuộc tính người dùng và phiên. Điều này giúp bạn truyền thông tin nhận dạng từ IDP bên ngoài đến khách hàng của bạn yêu cầu xác thực.

**Required actions** : Các hành động mà người dùng phải thực hiện trong quá trình xác thực. Người dùng không thể kết thúc quá trình xác thực nếu không required actions.

**Authentication flows** : Các luồng xác thực là các luồng công việc mà người dùng phải thực hiện khi tương tác với các khía cạnh nhất định của hệ thống.

**Events**  : Sự kiện là các luồng kiểm tra mà admin có thể xem và tham gia.

**Themes** : Keycloak cung cấp themer mặc định . Có thể sửa themes.

**2.	Sử Dụng**

**1.	Server deploy with loadbalancer**

 	Chọn chế độ hoạt động  trong 6 chế độ hoạt động sau để phù hợp với bài toán. (Ở đây chọn chế độ 2).
    
**Standalone Mode** : Chế độ hoạt động độc lập chỉ hữu ích khi chạy một và chỉ một server instance Keycloak. 

**Standalone Clustered Mode** : Chế độ hoạt động nhóm độc lập khi muốn chạy Keycloak trong một cluster. Chế độ này yêu cầu bạn có một bản sao Keycloak trên mỗi máy bạn muốn chạy một server instance. 

**Domain Clustered Mode** : Chế độ miền là một cách để quản lý tập trung và public cấu hình cho máy chủ.

**Cross-Datacenter Replication Mode** : Cho phép chạy Keycloak trong một cụm trên nhiều trung tâm dữ liệu, thường là sử dụng các trang web trung tâm dữ liệu ở các vùng địa lý khác nhau. Khi sử dụng chế độ này, mỗi trung tâm dữ liệu sẽ có một cluster máy chủ Keycloak riêng.

**CLI Embedded Mode** : Có thể ra lệnh trong khi máy chủ không hoạt động, Có thể nhúng máy chủ vào CLI và thực hiện các thay đổi trong một chế độ đặc biệt không cho phép các yêu cầu đến.

**CLI GUI Mode** : Chế độ GUI khởi chạy ứng dụng Swing cho phép bạn xem và chỉnh sửa đồ họa toàn bộ mô hình quản lý của một máy chủ đang chạy.

 	Sau đó thực hiện tạo user để quản lý server  
Linux : add-user.sh

Window: add-user.bat

Deploy server và 2 instance

**Linux/Unix**

$ .../bin/domain.sh --host-config=host-master.xml

$ .../bin/domain.sh --host-config=host-slave.xml

**Windows**

> ...\bin\domain.bat --host-config=host-master.xml
> ...\bin\domain.bat --host-config=host-slave.xml


Truy cập: http://localhost:9990
Chúng ta có 2 instance của Keycloak và 1 cổng load-balancer 

Truy cập vào server default sẽ là : http://127.0.0.1:8230

Đăng kí user admin để có quyền truy cập vào hệ thống.
		 
Trở lại truy cập cổng load-balancer :  http://localhost:8080

Và đăng nhập bằng user vừa tạo . 

**2.	Tích hợp Keycloak với bài toán** 
**Keycloak**

**Tạo Reaml** : SSO_VTLM : Click vào Add reaml

**Tạo clients**

**Tạo ClientRoles**  : Clients >> Roles >> Add role

**Tạo Reaml Roles** : Roles >> Add Role

**Mapping Reaml Roles với client Roles để phân cấp Role**

**Tạo Group**  : Groups >> New…>>Save

**Gán Realm Roles cho Group**

**Tạo user** : Click vào add user >> Set password cho user 

**Join User vào Group >> Keycloak sẽ tự động set các Roles mapping với Group cho User đó**

**SpringBoot Application**
* Thêm vào file pom các thư viện của Keycloak  
* Setting application.properties
* Chú ý : thuộc tính keycloak.credentials.secret 
* File securityConfig 
* Run Application : getToken do Keycloak trả về rồi thực hiện call API

 **Angular Application** : 
* Để redirect được sang màn hình Login của Keycloak .
* Add Client .
* Setting môi trường Keycloak cho Angular.
* App.module.ts.
* Package.json thêm thư viện Keycloak .
* npm i --save keycloak-js.
* npm i --save keycloak-angular.
* Service.
* Run ng server or npm start  : >> redirect localhost:4200 >> keycloak .