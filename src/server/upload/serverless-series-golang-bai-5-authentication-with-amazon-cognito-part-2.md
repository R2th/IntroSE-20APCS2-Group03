## Giới thiệu
Chào các bạn tới với series về Serverless, tiếp tục ở phần trước sau khi ta đã implement được hai hàm là change password và login, thì ở phần này ta sẽ xây dựng tiếp phần authentication cho những API mà ta muốn user phải cần đăng nhập thì mới gọi tới được.

Hệ thống mà ta đang xây dựng như sau.

![](https://images.viblo.asia/46c81e8c-b164-4922-8428-62b7b6f73e34.jpg)

Phần tiếp theo ta sẽ làm là phần check token.

![](https://images.viblo.asia/c00f453f-3813-4cf7-8ba7-b7f76f6c5163.jpg)

Thông thường, đối với những trang SPA, khi ta làm một chức năng liên quan tới phần authentication, thì sau khi làm xong phần trả về được token cho user khi user đăng nhập, ta phải làm tiếp chức năng middleware để xác thực lại token đó khi mà user gọi tới những API mà yêu cầu phải đăng nhập. Tùy vào yêu cầu bảo mật của chúng ta thì việc implement middleware sẽ là rất dễ hoặc rất khó. Thì để tránh mất thời gian, ta có thể sử dụng chức năng xác thực token có sẵn của API Gateway khi kết hợp nó với Cognito.

## Securing API Gateway with Cognito
Hệ thống của ta sẽ có hai API mà ta muốn user cần đăng nhập thì mới gọi được là POST /books và DELETE /books, vì ta không muốn ai truy cập vào trang của ta cũng có thể tạo dữ liệu và xóa dữ liệu được cả, chỉ user nào đăng nhập thì mới có thể tạo dữ liệu.

Ta sẽ làm các bước sau để bảo mật cho POST /books và DELETE /books.

1. Truy cập API Gateway console https://console.aws.amazon.com/apigateway.
2. Bấm vào books-api
3. Ở mục **API: books-api** chọn **Authorizers**.

![image.png](https://images.viblo.asia/d371b005-1f45-4198-8d8a-f75d10166ed3.png)

4. Bấm vào nút **Create New Authorizer**, ta sẽ thấy UI như sau.

![image.png](https://images.viblo.asia/90323a53-2788-4a89-a725-27212554586a.png)

Điền tên theo ý của bạn, chỗ **Type** các ta chọn Cognito, chỗ **Cognito User Pool** chọn cognito-serverless-series mà ta đã tạo ở bài trước. Chỗ Token Source, điền vào theo ý bạn, nếu ta điền là Authorization thì khi ta gọi request tới API Gateway, ta cần truyền token vào header với key là Authorization.

5. Bấm tạo

Oke, giờ ta đã integrate được Cognito vào API Gateway để nó có thể secure một endpoints bất kì nào mà ta muốn. Để chỉ định API nào mà sẽ thực hiện việc kiểm tra token của một request, ta làm như sau.

1. Di chuyển tới **API: books-api** chọn **Resources**.
2. Ở mục Resources bấm vào POST method.

![image.png](https://images.viblo.asia/aa153794-e304-4ac6-9ccb-49d10f217248.png)

3. Bấm vào Method Request
4. Ở mục Authorization, chọn Cognito mà ta vừa mới tạo.

![image.png](https://images.viblo.asia/bb999641-5dae-4a17-bc0b-4cd76edee154.png)

5. Các mục còn lại để mặc định và bấm Deploy lại API.

![image.png](https://images.viblo.asia/a2745e7a-9271-46c2-a91f-a1355be1e025.png)

Sau khi deploy xong, giờ khi bạn gọi lại API POST /books, nó sẽ trả về lỗi là Unauthorized.

![image.png](https://images.viblo.asia/9b8f8162-b59d-418a-8260-a4f1d9e2b2d2.png)

Oke, vậy là đã đúng được mục đích mà ta muốn.

Để gọi được API mà có set Authorization, ta sẽ truyền token được trả về từ API login vào headers khi gọi API. Kết quả trả về của hàm login.

```
{
    "AuthenticationResult": {
        "AccessToken": "eyJ...",
        "ExpiresIn": 3600,
        "IdToken": "eyJ...",
        "NewDeviceMetadata": null,
        "RefreshToken": "eyJ...",
        "TokenType": "Bearer"
    },
    "ChallengeName": "",
    "ChallengeParameters": {},
    "Session": null,
    "ResultMetadata": {}
}
```

Giá trị mà ta sẽ sử dụng là trường IdToken. Khi gọi tới API POST /books, ta truyền thêm vào headers với key là `{ "Authorization": Bearer <IdToken> }`, sau đó API Gateway sẽ tự động gọi tới Cognito để thực hiện việc kiểm tra token tự động cho ta, ta không cần phải tự viết hàm middleware 😁.

## Lambda Environment
Ta sẽ cập nhật lại function của ta một chút để nó dễ sử dụng hơn. Ở đoạn code kết nối tới Cognito của hàm login và change-password thì ta đang fix cứng ClientId, như vậy khi ta cần thay đổi ClientId thì ta phải build lại code và update nó lên lại Lambda, việc đó khá mất công. Nên ta sẽ sử dụng Lambda Environment để truyền các giá trị cấu hình vào hàm của ta.

Truy cập Lambda Console, bấm vào change_password function. Bấm qua tab Configuration, chọn Edit.

![image.png](https://images.viblo.asia/9471e8a5-23e4-4b0d-8b75-c0cd537e71e1.png)

Chọn Add environment variable, điền vào Key là COGNITO_CLIENT_ID và Value là giá trị của client id của Cognito. Bấm Save.

![image.png](https://images.viblo.asia/b7180ad4-17a6-4508-9c74-8e6483a19d37.png)

Sau đó ta cập nhật lại change-password function như sau.

```change-password/main.go
...
authInput := &cognitoidentityprovider.InitiateAuthInput{
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: aws.String(os.Getenv("COGNITO_CLIENT_ID")),
    AuthParameters: map[string]string{
        "USERNAME": body.Username,
        "PASSWORD": body.OldPassword,
    },
}
...

challengeInput := &cognitoidentityprovider.RespondToAuthChallengeInput{
    ChallengeName: "NEW_PASSWORD_REQUIRED",
    ClientId:      aws.String(os.Getenv("COGNITO_CLIENT_ID")),
    ChallengeResponses: map[string]string{
        "USERNAME":     body.Username,
        "NEW_PASSWORD": body.NewPassword,
    },
    Session: authResp.Session,
}
...
```

Build code lại và update lại AWS Lambda function.

```
sh build.sh
aws lambda update-function-code --function-name change_password --zip-file fileb://change-password.zip --region us-west-2
```

Các bạn làm tương tự cho hàm login nhé. Sau đó các bạn nhớ kiểm tra lại xem function có hoạt động đúng như cũ không nha.

## Kết luận
Vậy là ta đã tìm hiểu cách kết hợp API Gateway và Cognito để secutiry cho một API, như các bạn thấy thay vì ta phải làm tùm lum thứ cho chức năng authentication như đăng nhập, đăng ký, quên mật khẩu, xác nhận email, xác thực token, chọn phương thức để hash password, v..v... thì Cognito có sẵn những chức năng này cho ta, và rất dễ dàng xài. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221
+ Manual QC. https://tuyendung.hoang-phuc.com/job/seniorjunior-manual-qc-1039

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.