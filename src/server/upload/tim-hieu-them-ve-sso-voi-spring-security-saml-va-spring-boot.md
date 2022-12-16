Hiện nay việc login thông qua SSO bằng SAML version 2 với Spring được hỗ trợ rất nhiều, thông qua một Spring Boot sample chính thức của Spring và liên tục được hỗ trợ trên stackoverflow thông qua project có link git :
```
https://github.com/ulisesbocchio/spring-boot-security-saml-samples/tree/master/spring-security-saml-sample
```
Mình viết bài này để chia sẻ một số vấn đề liên quan dựa trên sample project này :

Để bên Service Provider(bên website mà mình quản lý sẽ gửi yêu cầu xác thực lúc người dùng muốn đăng nhập thông qua SSO) và bên Identity Provider/Idp(Bên cung cấp xác thực. Chẳng hạn như Google, Facebook, Okta, SsoCircle,...vv. Sample hiện tại đang sử dụng SSOCircle) có thể trao đổi với nhau(về thông tin login URL mặc định, logout mặc định, thông tin trả về, chữ ký điện tử,...vv) thì mỗi bên phải setting thông tin của nhau. Việc setting này tùy vào Idp mà sẽ cho phép mình manual config bằng cách tự nhập tay các thông tin, hoặc thông qua việc import 1 file meta-data.xml. Ở sample hiện tại, file mete-data.xml của circle có thể lấy được ở đường dẫn :
```
https://idp.ssocircle.com/meta-idp.xml
```
Và được setting ở bên mình(Service Provider/SP) trong source ở đoạn sau trong WebSecurityConfig.java :
```
// Get data từ 1 online URL
```
![](https://images.viblo.asia/6c7e25ff-986a-4e4d-9e22-07d72e1b5b17.png)
Hoặc :
```
// Get data từ 1 file xml trong hệ thống của mình
```
![](https://images.viblo.asia/f8df1a5c-bd55-45b0-92f9-264142ab3d3b.png)

Bên Idp SSOCircle thì việc setting SP-metadata.xml của bên mình thông qua việc import file xml ở đường dẫn https://idp.ssocircle.com/sso/hos/SPMetaInter.jsp, trong đó **Enter the FQDN of the ServiceProvider** nên là địa chỉ URL bên mình(và should be unique), **Attributes sent in assertion (optional)** chọn data mà ta muốn Idp trả về cho bên mình(assertion data), text area cuối cùng là nội dung SP-metadata.xml bên mình :

![](https://images.viblo.asia/616f9c0b-07bb-4340-8a76-ddc9b7bfaba8.png)

Ta có thể generate ra file SP-metadata.xml của bên mình thông qua URL sau : `http://localhost:8080/saml/metadata.`

Ngoài ra còn một số thông tin config quan trọng chúng ta cần để ý như sau :
```
Keystore là nơi chứa các loại digital sign(khóa điện tử), certificate key dùng để chứng thực của bên Idp. Thậm chí là cả các thông tin bên mình(maybe :S)
Vì certificate của SSOCircle liên tục thay đổi nên chúng ta sẽ phải update thông tin đó bằng cách run command line với file update-certifcate.sh(step này cũng được nhắc đến trong readme của sample).
Bên trong file update-certifcate.sh, ta có thể thấy một số thông tin cơ bản :
- CERTIFICATE_FILE=ssocircle1.cert => File chứa thông tin certificate của Idp trước khi được mã hóa và vứt vào keystore
- KEYSTORE_FILE => name file keystore
- KEYSTORE_PASSWORD => password để có thể access vào 1 file keystore. Khi bạn thao tác lấy ngược thông tin từ keystore để check lại thì cũng có yêu cầu nhập password tương tự
```
![](https://images.viblo.asia/198cabce-9c9b-448c-badc-bf4dadbe1b39.png)

Thông tin lấy ngược từ file keystore, certificate có thể được generate mới(mình quên command line rồi các bạn ạ, google...) :
![](https://images.viblo.asia/faee65f2-a36a-4234-a4bc-3d5d81c21272.png)

Bean quản lý keystore :
![](https://images.viblo.asia/a4a7bf40-3ec5-4d04-9d52-e82e17dbe50a.png)

Bean quản lý info của SP-metadata.xml :
![](https://images.viblo.asia/ba633967-4ca0-4a13-9aa2-5bcc982bf9bf.png)

![](https://images.viblo.asia/28d43a07-6e43-46d1-89f1-ca0aa560f484.png)

![](https://images.viblo.asia/655bf8a9-8fa2-43e6-9ca7-fdf28ec0e004.png)

![](https://images.viblo.asia/8e25e626-bfe8-4b80-b5fe-cff2d814f41b.png)

![](https://images.viblo.asia/5121f39b-b809-4f39-9d91-9d5fe984ac3e.png)

Các thông tin Default URL login, logout, generate metadata,...vv :
![](https://images.viblo.asia/5a6d91bb-a871-4b6e-b347-5502f2c5cc3f.png)

Data gửi đi và trả về đều được set vào trong các class do Spring cung cấp, nên chúng ta sẽ khó hình dung được thông tin, cấu trúc mà một AuthenRequest và ResponseRequest được trao đổi giữa 2 bên.
Ta có thể debug và xem xét thông tin được parse thành các file XML cổ điển bằng đoạn code sau :
- Đối với AuthenRequest data : 
`XMLHelper.nodeToString(SAMLUtil.marshallMessage(request) trong class WebSSOProfileImpl tại dòng cuối cùng hàm getAuthnRequest()`
- Đối với Response data :
```
XMLHelper.nodeToString(SAMLUtil.marshallMessage(credential.getAuthenticationAssertion())); trong class SAMLUserDetailsServiceImpl, trong hàm loadUserBySAML(SAMLCredential credential)
```

Nếu login/send request thành công, các bạn hãy vào xem data trong 2 file này, sẽ phần nào dễ dàng nắm chắc hơn về flow của SSO. Thanks.

Nguồn : https://github.com/vdenotaris/spring-boot-security-saml-sample