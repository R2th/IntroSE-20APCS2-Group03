## Giới thiệu
Chào các bạn tới với series về Serverless, ở bài trước chúng ta đã nói về cách sử dụng S3 để hosting một trang Single Page Application và lưu trữ hình ảnh, cách sử dụng Lambda để upload file lên trên S3. Và do tất cả url của ta đều là public nên bất cứ ai cũng có thể vào trang create để tạo dữ liệu và upload file lên trên S3 cả, mà ta sẽ không muốn như vậy. Nên ở bài này chúng ta sẽ tìm hiểu về một thành phần tiếp theo được sử dụng để thực hiện việc authentication và quản lý user, là AWS Cognito.

Hệ thống mà ta sẽ xây dựng như sau.

![](https://images.viblo.asia/46c81e8c-b164-4922-8428-62b7b6f73e34.jpg)

Ở bài trước, ta đã dựng được phần API Gateway + Lambda + DynamoDB + S3.

![](https://images.viblo.asia/8f884988-93a9-4a9b-a36d-32634fdbe489.jpg)

Ở bài này ta sẽ thêm vào AWS Cognito.

![](https://images.viblo.asia/01a0763d-0540-4fa1-bc08-926f3cd12363.jpg)

## AWS Cognito
AWS Cognito là một dịch vụ của AWS mà được sử dụng cho việc chứng thực (authentication) user. Sử dụng nó sẽ giúp ta trong việc xây dựng luồng sign-in, sign-up, verify email, change password, restart password, v...v... một cách dễ dàng hơn, thay vì ta phải tự xây dựng DB cho user và tự làm nhiều thứ như JWT, hash password, send mail verify, v...v...

Một usecase phổ biến của AWS Cognito là sử dụng cho hệ thống SSO (single sign-on). Ví dụ là hệ thống của ta có 3 dịch vụ khác nhau, mỗi dịch vụ đều có một trang đăng nhập và DB user riêng, khi hệ thống ta phát triển lên tới mấy chục dịch vụ, việc xây dựng mỗi hệ thống đều sử dụng thằng authentication của riêng nó sẽ khiến ta rất khó để quản lý user. Giải pháp là ta sẽ xậy dựng hệ thống SSO, ta chỉ quản lý user ở một chỗ, sau khi đăng nhập vào hệ thống SSO này, token của nó sẽ được sử dụng cho nhiều dịch vụ khác nhau đằng sau.

![](https://images.viblo.asia/b31526aa-c526-4b17-b793-db4f1a08eb47.jpg)

*<div align="center">Hình từ trang sphereinc.com</div>*

AWS Cognito sẽ có hai thành phần chính: user pool với identity pool.
+ User pool thì giống như là một DB chứa user của chúng ta, ta sẽ thực hiện việc sign-up, sign-in với user pool này và nó sẽ trả cho ta một token, ở bài này ta sẽ sử dụng user pool.
+ Identity pool thì cũng giống với user pool là đều dùng để chứa user, nhưng có một điểm khác biệt là token được trả về từ identity pool có được dùng để truy cập vào các dịch vụ khác của AWS.

## Một số cách triển khai Cognito
### Front-end + AWS Cognito
Ở cách này FE sẽ tương tác trực tiếp với AWS Cognito sử dụng Aws Amplify framework.

![](https://images.viblo.asia/43793425-ae40-4a96-a057-6aa6f06742b9.png)

Ưu điểm:
+ Chỉ cần tạo AWS Cognito trên AWS, DevOps không cần phải operation gì cả.
+ AWS sẽ quản lý việc scale theo workload của user.
+ Chỉ cần code FE.

Nhược điểm:
+ AWS Cognito phải tạo với public mode.
+ Hoặc tạo với private mode thì secret key để kết nối với AWS Cognito phải lưu dưới source code của FE.
+ Bảo mật kém.

### Front-end + API Gateway + AWS Lambda + AWS Cognito
Ở cách này ta sẽ dùng lambda để tương tác với AWS Cognito, nếu có secret key thì ta sẽ lưu trên AWS và truyền vào Lambda như một biến env để đảm bảo security.

![](https://images.viblo.asia/4d202f41-9c01-4303-8b93-879f1b03e454.png)

Ưu điểm:
+ Bảo mật hơn so với mô hình FE + AWS Cognito.
+ Ít phải operation, chỉ cần quản lý một function là login.

Nhược điểm:
+ AWS Lambda ở Region Singapore chỉ thực hiện tối đa được 500 concurrency một phút.
+ Không tự control được vấn đề scale.

Sẽ có một vài cách khác nữa nhưng mình sẽ không nói ở đây. Ở bài này vì ta đang học về Lambda nên ta sẽ xài cách **Front-end + API Gateway + AWS Lambda + AWS Cognito** 😂.

## Tạo user pool
Truy cập AWS Console, tìm kiếm Cognito, bấm vào Cognito và bấm create user pool. Ta sẽ thấy UI như sau.

![image.png](https://images.viblo.asia/d8eb624e-d5be-475c-9a1a-2d4f85f07f33.png)

Chỉ check vào Cognito user pool. Kéo xuống ở mục Cognito user pool sign-in options, check chọn email, bấm Next.

![image.png](https://images.viblo.asia/5c4249b1-c33a-4626-be1f-13dc3ce2958e.png)

Qua bước 2, ở phần Multi-factor authentication, chọn No MFA. Mấy mục còn lại để mặc định.

![image.png](https://images.viblo.asia/c57345a8-6c7c-4e19-9fa0-8bae4ee5d155.png)

Bước 3, bỏ check Enable self-registration, mấy mục còn lại để mặc định, bấm Next.

![image.png](https://images.viblo.asia/2acd1a80-3118-46c0-84a8-2aff5eb4c97d.png)

Bước 4, ở mục Email chọn Send mail with Cognito.

![image.png](https://images.viblo.asia/973d07e4-eb8f-4c09-af88-65939519eb52.png)

Bước 5, ở mục User pool name và App client name, bạn điền gì cũng được, mình điền tên là cognito-serverless-series.

![image.png](https://images.viblo.asia/6e8a2253-7b85-455b-a5b9-05a6c8d2796e.png)

Ở mục Initial app client điền vào cognito-serverless-series. 

![image.png](https://images.viblo.asia/58ae5b44-673b-43ca-9b75-d53d73c9617b.png)

Ở mục Authentication flows, nhớ chọn thêm mục ALLOW_USER_PASSWORD_AUTH.

![image.png](https://images.viblo.asia/9fbd41a0-7698-4384-bcef-e26e733c163e.png)

Sau khi điền xong bạn bấm Next để qua bước 6. Review và bấm Create user pool.

![image.png](https://images.viblo.asia/89c3a1d4-7dcd-45a9-b774-4d55b866246c.png)

Ok, sau khi ta tạo xong user pool, bước tiếp theo ta sẽ dựng lại hệ thống ở bài trước và viết code cho Lambda login function, thêm vào API Gateway đường dẫn login, cập nhật lại đường dẫn create books cần phải có authentication.

## Provisioning previous system
Mình sẽ dùng terraform để tạo lại hệ thống, nếu các bạn muốn biết cách tạo bằng tay từng bước thì các bạn xem từ [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git.

Di chuyển tới folder bai-5/terraform-start. Ở file policies/lambda_policy.json, dòng `"Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books"`, cập nhật lại <ACCOUNT_ID> với account id của bạn. Xong sau đó chạy câu lệnh.

```
terraform init
terraform apply -auto-approve
```

Sau khi Terraform chạy xong, nó sẽ in ra terminal API Gateway URL và Website URL.

```
base_url = {
  "api" = "https://kvpspx1bw0.execute-api.us-west-2.amazonaws.com/staging"
  "web" = "http://serverless-series-spa.s3-website-us-west-2.amazonaws.com"
}
```

Sau khi Terraform chạy xong ta sẽ có các resource sau đây.

![image.png](https://images.viblo.asia/e95a1212-9099-4deb-8542-f1c1b6b5e69a.png)
*<div align="center">Lambda</div>*

![image.png](https://images.viblo.asia/acdc0daf-a1c6-46e7-a060-ee9851f772ca.png)
*<div align="center">API Gateway</div>*

![image.png](https://images.viblo.asia/10994714-97a0-44ca-acc5-72361ed70bd5.png)
*<div align="center">DynamoDB</div>*

![image.png](https://images.viblo.asia/6050d4bc-7f1f-45e3-b864-d767daec3a4a.png)
*<div align="center">S3 bucket</div>*

Tiếp theo ta copy dường dẫn api ở terminal trên, di chuyển tới thư mục bai-5/front-end, ở file `.env-cmdrc`, cập nhật lại trường `staging.REACT_APP_API_URL: https://kvpspx1bw0.execute-api.us-west-2.amazonaws.com/staging`. Sau đó chạy câu lệnh.

```
yarn install
yarn build:staging
```

Nó sẽ build code FE và tạo ra folder build, ta upload build folder lên trên S3 serverless-series-spa bucket.

```
aws s3 cp build s3://serverless-series-spa/ --recursive
```

Oke, giờ ta truy cập http://serverless-series-spa.s3-website-us-west-2.amazonaws.com thì sẽ thấy được trang SPA của ta ở bài trước. Các bạn nên đọc các [bài trước](https://viblo.asia/s/W65GEjG6ZDO) đó để hiểu rõ về từng resource ở trên.

## Integrate Cognito
### Create user
Trước tiên để tương tác với Cognito thì ta sẽ tạo một user cho Cognito user pool, ta có thể viết một Lambda để thực hiện việc tạo user này, ở đây thì ta sẽ dùng AWS Console Web để tạo user cho nhanh. Truy cập Cognito, ở mục Users, bấm Create user.

![image.png](https://images.viblo.asia/435bc302-2b64-4d32-aab7-9c17fcc2ab64.png)

Ta sẽ thấy UI như sau.

![](https://images.viblo.asia/f46aab90-a974-453b-a46f-b3e5d3aa6d7e.png)

Chọn như trong hình, và điền vào email và password của user, xong bấm tạo.

![](https://images.viblo.asia/b9eaf3fd-046c-42cd-9de9-ba5085aa65b7.png)

Ta sẽ thấy có dòng chữ màu xanh là **Force change password**, user được tạo trong Cognito bắt buộc khi đăng nhập lần đầu tiên thì ta phải thay đổi password của nó, vì vậy ta mới có hàm change-password. Oke, sau khi tạo user xong thì bây giờ ta sẽ tiến hành viết code.

### Implement Lambda change-password
Ta viết code cho hàm change-password, di chuyển tới folder bai-5/code.

```
├── change-password
│   ├── build.sh
│   ├── go.mod
│   ├── go.sum
│   └── main.go
└── login
    ├── build.sh
    ├── go.mod
    ├── go.sum
    └── main.go
```

Cập nhật lại file change-password/main.go như sau.

```change-password/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
)

type Body struct {
	Username    string `json:"username"`
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

func ChangePassword(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body Body
	b64String, _ := base64.StdEncoding.DecodeString(req.Body)
	rawIn := json.RawMessage(b64String)
	bodyBytes, err := rawIn.MarshalJSON()
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       err.Error(),
		}, nil
	}

	json.Unmarshal(bodyBytes, &body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       err.Error(),
		}, nil
	}

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	cip := cognitoidentityprovider.NewFromConfig(cfg)
	authInput := &cognitoidentityprovider.InitiateAuthInput{
		AuthFlow: "USER_PASSWORD_AUTH",
		ClientId: aws.String("6jk1bh3me5h1onmbjhqalmtpp8"), // Should os.Getenv("CLIENT_ID")
		AuthParameters: map[string]string{
			"USERNAME": body.Username,
			"PASSWORD": body.OldPassword,
		},
	}
	authResp, err := cip.InitiateAuth(context.TODO(), authInput)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	challengeInput := &cognitoidentityprovider.RespondToAuthChallengeInput{
		ChallengeName: "NEW_PASSWORD_REQUIRED",
		ClientId:      aws.String("6jk1bh3me5h1onmbjhqalmtpp8"),
		ChallengeResponses: map[string]string{
			"USERNAME":     body.Username,
			"NEW_PASSWORD": body.NewPassword,
		},
		Session: authResp.Session,
	}
	challengeResp, err := cip.RespondToAuthChallenge(context.TODO(), challengeInput)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	res, _ := json.Marshal(challengeResp)
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(ChangePassword)
}
```

Đầu tiên, vì ở bài trước ta đã thêm vào Binary Media Types giá trị `*/*`.

![image.png](https://images.viblo.asia/e7000454-a2c2-41f2-beb0-aa06586950be.png)

Nên request sẽ được encoded và ta không thể lấy req.body ra bằng hàm `json.Unmarshal([]byte(req.Body), &body)` được, mà ta phải làm như sau.

```go
var body Body
b64String, _ := base64.StdEncoding.DecodeString(req.Body)
rawIn := json.RawMessage(b64String)
bodyBytes, err := rawIn.MarshalJSON()
if err != nil {
    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusBadRequest,
        Body:       err.Error(),
    }, nil
}

json.Unmarshal(bodyBytes, &body)
if err != nil {
    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusBadRequest,
        Body:       err.Error(),
    }, nil
}
```

Để tương tác với Cognito, trước hết ta sẽ tạo cognito client bằng hàm `cip := cognitoidentityprovider.NewFromConfig(cfg)`. Sau đó, ta tiến hành lấy thông tin chứng thực của user bằng đoạn code.

```go
authInput := &cognitoidentityprovider.InitiateAuthInput{
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: aws.String("6jk1bh3me5h1onmbjhqalmtpp8"), // Should os.Getenv("CLIENT_ID")
    AuthParameters: map[string]string{
        "USERNAME": body.Username,
        "PASSWORD": body.OldPassword,
    },
}
authResp, err := cip.InitiateAuth(context.TODO(), authInput)
if err != nil {
    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusInternalServerError,
        Body:       err.Error(),
    }, nil
}
```

Sau khi lấy được thông tin của user rồi, ta sẽ tiến hành đổi mật khẩu bằng đoạn code.

```go
challengeInput := &cognitoidentityprovider.RespondToAuthChallengeInput{
    ChallengeName: "NEW_PASSWORD_REQUIRED",
    ClientId:      aws.String("6jk1bh3me5h1onmbjhqalmtpp8"),
    ChallengeResponses: map[string]string{
        "USERNAME":     body.Username,
        "NEW_PASSWORD": body.NewPassword,
    },
    Session: authResp.Session,
}
challengeResp, err := cip.RespondToAuthChallenge(context.TODO(), challengeInput)
if err != nil {
    return events.APIGatewayProxyResponse{
        StatusCode: http.StatusInternalServerError,
        Body:       err.Error(),
    }, nil
}
```

Sau đó ta trả về kết quả chứng thực của user cho client. Giá trị ClientId, ta lấy ở phần App integration trong Cognito.

![image.png](https://images.viblo.asia/437b46e4-8735-4416-803f-443259c251be.png)

Khi làm thực tế các bạn nên dùng `os.Getenv("CLIENT_ID")` thay vì điền trực tiếp trong function. Sau khi viết code xong thì ta init package và update lại AWS Lambda function.

```
go get
sh build.sh
aws lambda update-function-code --function-name change_password --zip-file fileb://change-password.zip --region us-west-2
```

Giờ ta sẽ kiểm tra thử hàm change-password của ta chạy đúng không.

```
curl -sX POST -d '{"username":"hoalongnatsu@gmail.com", "old_password": "12345678@aA", "new_password": "87654321@bB"}' https://kvpspx1bw0.execute-api.us-west-2.amazonaws.com/staging/change-password
```

Kết quả trả về.

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

Nếu bạn thấy kết quả trên thì hàm của ta đã chạy đúng

### Implement Lambda login
Tiếp theo ta sẽ viết code cho hàm login, cập nhật lại file login/main.go như sau.

```login/main.go
package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cognitoidentityprovider"
)

type Body struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func login(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body Body
	b64String, _ := base64.StdEncoding.DecodeString(req.Body)
	rawIn := json.RawMessage(b64String)
	bodyBytes, err := rawIn.MarshalJSON()
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       err.Error(),
		}, nil
	}

	json.Unmarshal(bodyBytes, &body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       err.Error(),
		}, nil
	}

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error while retrieving AWS credentials",
		}, nil
	}

	cip := cognitoidentityprovider.NewFromConfig(cfg)
	authInput := &cognitoidentityprovider.InitiateAuthInput{
		AuthFlow: "USER_PASSWORD_AUTH",
		ClientId: aws.String("6jk1bh3me5h1onmbjhqalmtpp8"), // Should os.Getenv("CLIENT_ID")
		AuthParameters: map[string]string{
			"USERNAME": body.Username,
			"PASSWORD": body.Password,
		},
	}
	authResp, err := cip.InitiateAuth(context.TODO(), authInput)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}

	res, _ := json.Marshal(authResp)
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(res),
	}, nil
}

func main() {
	lambda.Start(login)
}
```

Hàm login thì tương tự với hàm change-password. Sau khi cập nhật code xong  thì ta init package và update lại AWS Lambda function.

```
go get
sh build.sh
aws lambda update-function-code --function-name login --zip-file fileb://login.zip --region us-west-2
```

Ta kiểm tra thử hàm login của ta.

```
curl -sX POST -d '{"username":"hoalongnatsu@gmail.com", "password": "87654321@bB"}' https://kvpspx1bw0.execute-api.us-west-2.amazonaws.com/staging/login
```

Kết quả.

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

Oke, hàm của ta đã chạy được 😁. Giá trị ở trong trường AuthenticationResult sẽ được sử dụng khi ta cần gọi API mà có authentication. Ở phần này thì ta chỉ làm tới đoạn login và change-password.

## Kết luận
Vậy là ta đã tìm hiểu xong Cognito là gì, và cách integrate Lambda với nó. Sử dụng Cognito sẽ giúp ta đơn giản hơn nhiều trong việc quản lý và chứng thực user. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Ở phần hai mình sẽ nói tiếp về cách integrate API Gateway với Cognito để nó tự động xác thực user cho ta. 
Hẹn gặp mọi người ở phần hai của bài này.

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