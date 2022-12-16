AWS Lambda và Amazon API-Gateway dùng để tạo RESTful web service trong Java mà không cần thiết tạo các cấu hình Java framework phức tạp, hay phải cài đặt và quản lý các web service như Tomcat, WebSphere, v.v. Một kết hợp của Lambda và API Gateway giúp ta dễ dàng tạo các API và quản lý môi trường staging một cách đơn giản giống như môi trường Dev, Test, và cả Product nữa.
## 1. Webservice là gì?
Web Service là một dịch vụ web, nó là một khái niệm rộng hơn so với khái niệm web thông thường, nó cung cấp các thông tin thô, và khó hiểu với đa số người dùng, chính vì vậy nó được sử dụng bởi các ứng dụng. Các ứng dụng này sẽ chế biến các dữ liệu thô trước khi trả về cho người dùng cuối cùng.

Ví dụ bạn vào một trang web ABC nào đó để xem thông tin về thời tiết và chứng khoán. Trang web đó sẽ hiển thị cho bạn các thông tin bạn cần. Để có được các dữ liệu về thời tiết ứng dụng ABC cần phải lấy thông tin từ một nguồn nào đó, nó có thể là một dịch vụ web chuyên cung cấp các số liệu thời tiết ứng với các vùng miền khác nhau.
Tương tự như vậy để có các số liệu về chứng khoán ứng dụng ABC cũng cần phải liên hệ với dịch vụ cung cấp các số liệu này. Các dữ liệu sẽ được chế biến trước khi trả về cho bạn là một trang web hoàn chỉnh.

Các Web Service thường cung cấp các dữ liệu thô mà nó khó hiểu đối với đa số người dùng thông thường, chúng thường được trả về dưới dạng XML hoặc JSON.
![](https://images.viblo.asia/68ee8e3e-7708-49d0-9fba-64dcfaee0c73.png)

## 2. RESTful Web Service là gì?
RESTful Web Service là các Web Service được viết dựa trên kiến trúc REST (REpresentational State Transfer). REST đã được sử dụng rộng rãi thay thế cho các Web Service dựa trên SOAP và WSDL.

REST định nghĩa các quy tắc kiến trúc để bạn thiết kế Web services, chú trọng vào tài nguyên hệ thống, bao gồm các trạng thái tài nguyên được định dạng như thế nào và được truyền tải qua HTTP, và được viết bởi nhiều ngôn ngữ khác nhau. Nếu tính theo số dịch vụ mạng sử dụng, REST đã nổi lên trong vài năm qua như là một mô hình thiết kế dịch vụ chiếm ưu thế. Trong thực tế, REST đã có những ảnh hưởng lớn và gần như thay thế SOAP và WSDL vì nó đơn giản và dễ sử dụng hơn rất nhiều.

REST là một bộ quy tắc để tạo ra một ứng dụng Web Service, mà nó tuân thủ 4 nguyên tắc thiết kế cơ bản sau:
* Sử dụng các phương thức HTTP một cách rõ ràng: POST, GET, PUT, DELETE
* Phi trạng thái (nghĩa là nó không lưu giữ thông tin của client)
* Hiển thị cấu trúc thư mục như các URls: cấu trúc của một URI nên được đơn giản, có thể dự đoán, và dễ hiểu.
(`http://myservice.com/weather/chicago/2016-09-27, http://myservice.com/weather/hanoi/2016-11-11`)
* Truyền tải JSON, XML hoặc cả hai.

## 3. Tạo RESTful APIs đơn giản với API Gateway và AWS Lambda.
Yêu cầu môi trường cần thiết gồm Java 8, Eclipse IDE, và AWS Toolkit cho Eclipse.
### Bước 1: Tạo Lambda Function
Khởi động Eclipse IED đã cài đặt AWS Toolkit, click vào icon AWS trên toolbar chính, và chọn "New AWS Lambda Project".
![](https://images.viblo.asia/204fa04a-227e-403b-8bf3-fd4a6ede9a80.png)

Nhập tên project vào ô Project name: REST-API-HelloWorld, nhập các thông tin mục Maven configurations. Chọn "Stream Request Handler" trong mục Input type.

Giờ ta click nút "Finish", source code ví dụ sẽ tự động sinh ra. Ta update handleRequest() method như sau: 
```Java
package com.amazonaws.lambda.demo;

import java.io.IOException;
...
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class LambdaFunctionHandler implements RequestStreamHandler {

   JSONParser parser = new JSONParser();

   @Override
   public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
       LambdaLogger logger = context.getLogger();
       logger.log("Loading Java Lambda handler of ProxyWithStream");
       String proxy = null;
       String param1 = null;
       String param2 = null;

       BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

       JSONObject responseJson = new JSONObject();

       String responseCode = "200";

       JSONObject event = null;

       try {
           event = (JSONObject)parser.parse(reader);

           if (event.get("pathParameters") != null) {
               JSONObject pps = (JSONObject)event.get("pathParameters");

               if ( pps.get("proxy") != null) {
                   proxy = (String)pps.get("proxy");
               }

           }

           if (event.get("queryStringParameters") != null) {
               JSONObject qps = (JSONObject)event.get("queryStringParameters");

               if ( qps.get("param1") != null) {
                   param1 = (String)qps.get("param1");
               }
           }

           if (event.get("queryStringParameters") != null) {
               JSONObject qps = (JSONObject)event.get("queryStringParameters");
               if ( qps.get("param2") != null) {
                   param2 = (String)qps.get("param2");
               }
           }
       }

       catch(Exception pex) {
          responseJson.put("statusCode", "400");
          responseJson.put("exception", pex);
       }

       // Implement your logic here
       int output = 0;
       if (proxy.equals("sum")) {
          output = sum(Integer.parseInt(param1), Integer.parseInt(param2));
       } else if (proxy.equals("subtract")) {
          output = subtract(Integer.parseInt(param1), Integer.parseInt(param2));
       }

       JSONObject responseBody = new JSONObject();
       responseBody.put("input", event.toJSONString());
       responseBody.put("message", "Output is" + output);

       JSONObject headerJson = new JSONObject();
       headerJson.put("x-custom-header", "my custom header value");
       headerJson.put("Access-Control-Allow-Origin", "*");
       responseJson.put("isBase64Encoded", false);
       responseJson.put("statusCode", responseCode);
       responseJson.put("headers", headerJson);
       responseJson.put("body", responseBody.toString());

       OutputStreamWriter writer = new OutputStreamWriter(outputStream, "UTF-8");
       writer.write(responseJson.toJSONString());

       writer.close();
   }

   public int sum(int a, int b) {
       return a+b;
   }

   public int subtract(int a, int b) {
       return a-b;
   }
}
```
Đăng nhập vào https://aws.amazon.com và tạo Lambda function trong AWS console với tên "REST_API_HelloWorld".

### Bước 2: Tạo API Gateway điểm cuối.
Từ menu Services của AWS console, clich chọn API-Gateway -> Create API.

Tick chọn New API, và nhập API name (HelloWorldAPI).

Sau khi nhập đủ thông tin, click button Create API thì API mới được tạo. Ta tạo Resource cho API mới này.
![](https://images.viblo.asia/619a6a9d-8f3d-4abc-8c6f-3acd5467fe6f.png)
Lưu ý là ta cần chọn "Configure as proxy resource".

Màn hình tiếp theo là màn hình cài đặt cho phương thức ANY. Chọn Lambda Function Proxy.

Bạn có thể chọn thời gian Timeout mặc định hoặc thay đổi nó.

Chọn Region la nơi bạn sẽ deploy API của bạn.

Cuối cùng là nhập Lambda Function "REST_API_HelloWorld" là function mà ta đã tạo ở Bước 1.
![](https://images.viblo.asia/1721cf26-5a88-4358-aaa0-bc8d55bdb06b.png)

Giờ thì ta deploy API của ta lên môi trường Staging. Clich chọn "Actions" -> "Deploy API".
![](https://images.viblo.asia/99c64336-c9bc-4b4d-ada1-3ac943b62fc9.png)

Chọn [New Stage] và nhập Stage name là "Dev". Nhập Stage description, Deployment description rồi click button "Deploy".
![](https://images.viblo.asia/accb9a16-cc99-46e3-9d9f-1618274ced11.png)

Việc deploy API đã hoàn tất. Để kiểm tra API ta copy "Invoke URL", nhập thông tên proxy, và các pram mà ta muốn gửi đến Lambda.
* Format: `https://5yv20hbz44.execute-api.eu-west-1.amazonaws.com/Dev/{proxy}?{set_of_params_separated_by_&}`
* Ví dụ: `https://a54xxzwu68.execute-api.ap-northeast-1.amazonaws.com/Dev/sum?param1=100&param2=200`

Kết quả trả về.
```
input	"{\"path\":\"\\/sum\",\"headers\":{\"accept-language\":\"en-US,en;q=0.5\",\"upgrade-insecure-requests\":\"1\",\"User-Agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko\\/20100101 Firefox\\/61.0\",\"X-Forwarded-Proto\":\"https\",\"X-Forwarded-For\":\"1.55.216.55\",\"Host\":\"a54xxzwu68.execute-api.ap-northeast-1.amazonaws.com\",\"X-Forwarded-Port\":\"443\",\"accept-encoding\":\"gzip, deflate, br\",\"X-Amzn-Trace-Id\":\"Root=1-5b78e798-ccc816406e0330b8b693b710\",\"accept\":\"text\\/html,application\\/xhtml+xml,application\\/xml;q=0.9,*\\/*;q=0.8\"},\"pathParameters\":{\"proxy\":\"sum\"},\"isBase64Encoded\":false,\"requestContext\":{\"resourceId\":\"yd1l5t\",\"resourcePath\":\"\\/{proxy+}\",\"httpMethod\":\"GET\",\"extendedRequestId\":\"L2kf1FpFNjMFlHQ=\",\"requestTime\":\"19\\/Aug\\/2018:03:44:24 +0000\",\"path\":\"\\/Dev\\/sum\",\"accountId\":\"798019395217\",\"protocol\":\"HTTP\\/1.1\",\"stage\":\"Dev\",\"requestTimeEpoch\":1534650264579,\"requestId\":\"2a407628-a362-11e8-b748-2ddf17508889\",\"identity\":{\"cognitoIdentityPoolId\":null,\"accountId\":null,\"cognitoIdentityId\":null,\"caller\":null,\"sourceIp\":\"1.55.216.55\",\"accessKey\":null,\"cognitoAuthenticationType\":null,\"cognitoAuthenticationProvider\":null,\"userArn\":null,\"userAgent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko\\/20100101 Firefox\\/61.0\",\"user\":null},\"apiId\":\"a54xxzwu68\"},\"resource\":\"\\/{proxy+}\",\"httpMethod\":\"GET\",\"queryStringParameters\":{\"param1\":\"100\",\"param2\":\"100\"},\"stageVariables\":null,\"body\":null}"
message	"Output is200"
```

Các nền tảng Serverless như AWS Lambda rất phổ biến ngày nay. Nhiều tổ chức yêu các kỹ sư phát triển của họ phát triển các ứng dụng mà không cần có server vì nó làm giảm thời gian cần thiết để thiết lập cơ sở hạ tầng phần cứng / phần mềm, do đó làm giảm thời gian phân phối dự án.

### Tài liệu tham khảo.
* [dzone - Developing RESTful APIs With Microservices in Java](https://dzone.com/articles/developing-restful-apis-in-java-using-amazon-api-g)
* [o7planning - RESTful Webservice là gì](https://o7planning.org/vi/10773/restful-web-service-la-gi)
* [AWS Lambda](https://aws.amazon.com/documentation/lambda)