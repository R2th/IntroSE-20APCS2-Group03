### Nguồn [https://stackjava.com/httpcomponents/gui-request-voi-httpclient.html](https://stackjava.com/httpcomponents/gui-request-voi-httpclient.html)

# Apache HttpComponents là gì?
Apache HttpComponent là một dự án (thư viện) dùng để gửi http request và các giao thức liên quan bằng ngôn ngữ Java.

Apache HttpComponent được tạo bảo Apache, viết bằng Java và miễn phí.

(Xem thêm các thư viện khác của Apache: https://stackjava.com/category/apache)

Với thư viện Apache HttpComponent bạn có thể dễ dàng tạo các ứng dụng REST client như Postman, kiểm thử hiệu năng giống như Apache JMeter, thực hiện demo ví dụ DDOS (gửi nhiều request tới 1 server)…

# Các thành phần của HttpComonents
![](https://stackjava.com/wp-content/uploads/2018/05/httpcomponents-structure-768x169.png)
 Apache HttpComponents là gì? Hướng dẫn sử dụng Apache HttpComponents.
HttpCore là một tập hợp các thành phần tương ứng với xử lý HTTP ở mức tối thiểu như định nghĩa request, response…

HttpClient được cài đặt dựa trên HttpCore, được sử dụng để quản lý trạng thái, kết nối HTTP

Asynch HttpClient cài đặt dựa trên HttpCore và HttpClient dùng để xử lý những trường hợp có nhiều kết nối đồng thời.

Commons HttpClient hay phiên bản HttpClient 3.x. (Hiện tại được khuyên dùng chuyển sang HttpClient 4.x.)

# Code ví dụ
Ví dụ gửi http GET request với HttpClient Fluent API

```
public class FluentGet {
  public static void main(String[] args) throws ClientProtocolException, IOException {
    Response response = Request.Get("https://www.google.com.vn/").execute();
    HttpResponse httpResponse = response.returnResponse();
    
    System.out.println("Protocol: " + httpResponse.getProtocolVersion());
    System.out.println("Status:" + httpResponse.getStatusLine().toString());
    System.out.println("Content type:" + httpResponse.getEntity().getContentType());
    System.out.println("Locale:" + httpResponse.getLocale());
    System.out.println("Headers:");
    for(Header header : httpResponse.getAllHeaders()) {
      System.out.println("          " + header.getName()+": " + header.getValue());
    }
    System.out.println("Content:");
    String content = IOUtils.toString(httpResponse.getEntity().getContent(), "UTF-8");
//    String content = response.returnContent().asString();
    System.out.println(content);
    
  }
}
```
Ví dụ gửi http POST request với HttpClient Fluent API
```
public static void basicPost(String url) throws ClientProtocolException, IOException {
  CloseableHttpClient client = HttpClients.createDefault();
  HttpPost httpPost = new HttpPost(url);
  List<NameValuePair> params = new ArrayList<NameValuePair>();
  params.add(new BasicNameValuePair("username", "your_username"));
  params.add(new BasicNameValuePair("password", "your_password"));
  httpPost.setEntity(new UrlEncodedFormEntity(params));
  CloseableHttpResponse response = client.execute(httpPost);
  client.close();
}
```

[Code ví dụ gửi http get request bằng Java (HttpClient). ](https://stackjava.com/httpcomponents/code-vi-du-gui-http-get-request-bang-java-httpclient.html)

[Code ví dụ download file bằng Java (HttpClient) (Áp dụng để tạo phần mềm download file)](https://stackjava.com/httpcomponents/code-vi-du-download-file-voi-java-apache-httpcomponents-httpclient.html)

[Code ví dụ gửi http request (method POST: html form, json data)](https://stackjava.com/httpcomponents/code-vi-du-gui-http-post-request-bang-java-httpclient.html)

[Code ví dụ upload file với HttpClient (Áp dụng để tạo phần mềm upload file)](https://stackjava.com/httpcomponents/code-vi-du-upload-file-bang-java-voi-httpclient.html)


-----------------------------------------------------

**Nguồn** [https://stackjava.com/httpcomponents/gui-request-voi-httpclient.html](https://stackjava.com/httpcomponents/gui-request-voi-httpclient.html)