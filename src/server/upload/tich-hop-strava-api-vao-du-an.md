# Step 1. Create your application.
Login tài khoản Strava của bạn và vào đường dẫn https://www.strava.com/settings/api#.
Ở đây bạn sẽ thấy form tạo ứng dụng. Điền các thông tin như tên ứng dụng, category của nó, website ... Sau đó nhấn Create
![](https://images.viblo.asia/42595e7e-f599-44eb-89ba-b8a72d986d19.png)

Và bạn sẽ nhận được một đống code/token cần thiết để làm việc với API trong app của bạn.
![](https://images.viblo.asia/4927ddf5-f300-4ef7-bd46-29781b8201e6.png)

# Step 2. Using Postman to create an API request
Request đầu tiên bạn sẽ thực hiện là request GET với https://www.strava.com/api/v3/athlete sử dụng access token.
Bạn sẽ định dạng request bằng Header có Authorization key như hình dưới đây. 
Giá trị "Bearer" phải được theo sau bởi access token của bạn. Hãy nhớ rằng access token sẽ hết hạn sau 6 giờ.
![](https://images.viblo.asia/8ed15ba7-d4a2-4cca-9f16-bc9ed2ca1993.png)

Nó sẽ trả output là 1 JSON object bao gồm dữ liệu athlete của bạn. Cool !

Sẽ ngon hơn nếu ta kéo được các hoạt động từ 1 người dùng như doc hướng dẫn ở đây http://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
![](https://images.viblo.asia/0e75f09b-ab3e-4e15-b83d-ab126b5eafad.png)

Tuy nhiên nhìn vào đây thì document bắt quyền read_all trong khi quyền của ta chỉ là read
![](https://images.viblo.asia/edcfdfd2-5f81-4215-a6ba-ea6bba2d4b50.png)

# Step 3. Get authorization code — update scope to 'read_all'
Ta cần cập nhật lại quyền read_all bằng cách thay đổi scope trên url từ **scope=read** sang **scope=activity:read_all**.
*http://www.strava.com/oauth/authorize?clientid=[REPLACEWITHYOURCLIENTID]&responsetype=code&redirecturi=http://localhost/exchangetoken&approvalprompt=force&scope=read*

Một khi scope đã được update thành read_all, sử dụng client ID vào url trên bạn sẽ thấy như sau
![](https://images.viblo.asia/2d507b08-83d3-4994-afcb-35ec6860df23.png)

Click Authorize bạn sẽ tới 1 trang chứa code ![](https://images.viblo.asia/3c2db9a4-69e6-4c34-9c81-814df5b59581.png)
Sử dụng code trên url để thực hiện bước tiếp theo
# Step 4. Exchange authorization code for a new access token
Tiếp tục dùng postman để gọi API với POST. Điền các params như client_id, client_secret, code, grant_type
![](https://images.viblo.asia/071ed5ee-7eeb-4f79-aaf0-5ad65c2a378f.png)
Ta sẽ nhận được JSON object bao gồm thông tin của athlete, access_token và refresh_token. Access_token này sẽ được dùng ở bước kế tiếp
# Step 5. GET user’s data
Dùng postman hoặc browser truy cập vào được dẫn https://www.strava.com/api/v3/athlete/activities?access_token=[ACCESS_TOKEN]
Đây là dữ liệu activity ta cần :
![](https://images.viblo.asia/28a16e05-0df7-495a-b439-a8b318b5fa07.png)
![](https://images.viblo.asia/421361b4-d2fc-4632-b0a5-cbf519134815.png)

Ngoài ra Strava còn cung cấp API docs chứa nhiều thông tin mà developer cần.
![](https://images.viblo.asia/76901fec-91f2-44b2-abe7-b7fa66b3931a.png)


# References
http://developers.strava.com/docs/reference/