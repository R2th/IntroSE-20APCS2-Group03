> Sơ lược về Cognito: **Amazon Cognito** là dịch vụ của Amazon Web Services cung cấp xác thực, ủy quyền và quản lý người dùng cho các ứng dụng web và di động của bạn. Người dùng có thể đăng nhập trực tiếp bằng tên người dùng và mật khẩu hoặc thông qua bên thứ ba như Facebook, Amazon, Google hoặc Apple.

### Prerequisite:
1. Cognito App trên AWS: https://aws.amazon.com/cognito/
2.  Account Azure: https://portal.azure.com/
## I. Cấu hình trên Azure
1. Chọn Single sign-on, sau đó chọn SAML
![image.png](https://images.viblo.asia/c810b51b-d1e7-41fa-be05-12edaa42f81a.png)

2. Ở step 1, chọn edit
![image.png](https://images.viblo.asia/847af71d-8dc6-4500-9833-7abfde8fd67f.png)

3. Identifier (Entity ID), điền User Pool Id từ Cognito theo định dạng sau
`urn:amazon:cognito:sp:<yourUserPoolID>`

![image.png](https://images.viblo.asia/cc187a5d-6e36-4b6e-9e20-604ebefbf1d3.png)

4. Reply URL điền theo định dạng:
`https://<yourDomainPrefix>.auth.<yourRegion>.amazoncognito.com/saml2/idpresponse` và `https://<yourDomainPrefix>.auth.<yourRegion>.amazoncognito.com/oauth2/idpresponse`

![image.png](https://images.viblo.asia/7ee87e57-53f5-480c-9ef0-d87715f5a4b6.png)

5. Điền Logout URL (optional), đây là 

![image.png](https://images.viblo.asia/c5439597-1c76-48d8-add7-17fd0a04a032.png)

6. Lưu lại cấu hình và download meta file ở Step 3

![image.png](https://images.viblo.asia/c7088df0-3eb2-4842-999a-0e430849ea1a.png)

7. Ở bước tiếp theo, ta thêm user email vào azure, những email đã được thêm vào Azure app mới có thể login bằng azure. Vào "Users and groups", chọn Add user/group

![image.png](https://images.viblo.asia/4561f3b5-4044-49a1-a489-4ab79ea828a6.png)

8. Chọn None Selected

![image.png](https://images.viblo.asia/bf847237-2093-4012-9977-538ddb063e9d.png)

9. Điền user email và chọn select, sau đó nhấn Assign

![image.png](https://images.viblo.asia/33127b98-8c2f-4dea-96fc-ac01d72ded52.png)


## II. Cấu hình trên Azure Cognito
1. Vào Amazon Cogino, chọn User pools, chọn pool đã tạo
2. Chọn Sign-in experience
3. Ở block Federated identity provider sign-in, chọn Add identity provider
4. Chọn option SAML, sau đó nhập provider name và upload meta document (upload file đã download trước đó từ Azure)
5. Ở block **Map attributes between your SAML provider and your user pool**, nhập attributes, ở đây mình điền User pool attribute mặc định là `email` và SAML attribute là `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`
- Sau đó click Add identity provider để lưu

![image.png](https://images.viblo.asia/ab4eb8ef-4616-4303-a9fb-3bb88c6f1afd.png)

![image.png](https://images.viblo.asia/1a4bf796-a7bc-475e-ad48-9f6a2f00cd0d.png)

6. Tiếp đến là chúng ta sẽ kích hoạt login bằng SAML đã config ở trên. Chọn tab `App Integration`, ở block `App clients and analytics` chọn app client đã tạo
- Giao diện App client

![image.png](https://images.viblo.asia/d8803c48-3754-4ee1-a87f-a97001c0e651.png)

7. Chọn edit `Hosted UI`, chúng ta điền `Allowed callback URLs` và `Allowed sign-out URLs - optional`

![image.png](https://images.viblo.asia/5dbe7712-9bc8-42b8-b319-87c2f3f8ba60.png)

8. Tiếp đến ở block `Identity providers`, thêm app Azure đã tạo, ở đây mình đã có app Google đã tạo trước đó:

![image.png](https://images.viblo.asia/db36c77e-beee-480f-97aa-7e9ee877f9ca.png)

9. Chọn tiếp các config dưới đây và lưu lại cấu hình

![image.png](https://images.viblo.asia/2e80ed0b-6b4f-4008-9bfa-e8422b40f586.png)

## III. Kiểm tra
1. Ở Cognito ở tab `Hosted UI` chọn `View Hosted UI`

![image.png](https://images.viblo.asia/62edf45f-5e97-4371-8390-48a950919e13.png)

2. Login bằng **Microsoft**

![image.png](https://images.viblo.asia/09919d74-f331-4a10-ac28-6b89db36e5dd.png)

3. Nếu Login thành công Cognito sẽ redirect về url mà bạn đã config ở Cognito với query string ?code=XXX, sau đó bạn có thể dùng code để lấy access_token, id_token, refresh_token... (tài liệu: [tại đây](https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html))


<br><br>
**Mình đã hướng dẫn các bạn setup login với Azure thông qua Cognito, hẹn gặp các bạn ở các series tiếp theo**

### Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:

+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

<br>
Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:

+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.


Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email `khalx.se@gmail.com` của mình nha .

Cảm ơn các bạn đã đọc.