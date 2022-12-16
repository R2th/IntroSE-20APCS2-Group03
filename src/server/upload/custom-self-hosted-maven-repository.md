# Giới thiệu
Đối với một số ứng dụng sử dụng nhiều Micro Service bên trong, những Class, Function,... có thể  dụng lại cho tất cả service khác thì việc copy past rất là bất tiện và khó khăn.
<br>
Có rất nhiều cách để triển khai thành một thư viện cho chính chúng ta, nhưng hầu hết sẽ được public trên Maven Central.
<br>
<br>
Nên hôm nay mình sẽ trình bày cách làm thế nào để tạo ra thư viện của riêng chúng ta và sử dụng một cách riêng tư (private) đối với một số công ty hoặc project không muốn public ra bên ngoài
<br>

 Mình sẽ sử dụng open source là [Reposilite](https://reposilite.com).<br>
Reposilite là một kho quản trí lưu trữ nhẹ dành cho các Maven artifact.<br>

Ở bài viết này mình sẽ trình bày từng bước cài đặt và triển khai artifact một cách cụ thể.

Let go~.
# Cài Đặt

Tải file .jar của Reposilite tại [Github](https://github.com/dzikoysk/reposilite/releases)
<br>
<br>
Ở đây mình sẽ tải xuống bản mới nhất là **Reposilite 3.0.0-alpha.23**
<br>
*Lưu ý: Hãy đặt file .jar vào thư mục rỗng vì khi run sẽ tự sinh ra một số file khác.*
<br>
<br>
Mở terminal và cd vào đường dẫn mà bạn lưu trữ file .jar và chạy dòng lệnh:
```
$ java -Xmx32M -jar reposilite-3.0.0-alpha.23-all.jar
```

<br>

**Sau khi khởi tạo:**
<br>
<br>
Terminal sẽ cung cấp giao diện CLI để người dùng tương tác.
<br>
![](https://images.viblo.asia/91347f04-b3e6-45af-ac9f-cc8abd856e5d.png)

Ứng dụng sẽ chạy mặc định trên localhost với port 80 (http://localhost:80)
<br>
![Screen Shot 2022-03-21 at 13.29.22.png](https://images.viblo.asia/95196e86-ed5c-4589-b749-370060d47c5e.png)
<br>

# Authorization
Để sử dụng thì trước hết chúng ta phải tạo một access token.
<br>
Có rất nhiều cách phân quyền và quản lí trên Reposilite, tham khảo tại [Authorization](https://reposilite.com/docs/authorization)
<br>
Còn ở đây mình sẽ tạo một user với một quyền cao nhất là admin.
<br>
<br>
Để tạo chạy câu lệnh dưới dây trên giao diện CLI:
<br>
```
token-generate [--secret=<secret>] <name> [<permissions>]
```

**E.g:**
```
token-generate admin m
```

```m``` được đánh dấu user đó như là một quản trị viên, sẽ có tất cả quyền hạn như truy cấp vào tất cả các path trong kho lưu trữ của Reposilite và cho phép truy cập CLI từ xa thông qua dashboard.
<br>

![Screen Shot 2022-03-21 at 13.51.03.png](https://images.viblo.asia/12b94327-7690-455d-bc66-650fc0ad79b3.png)
<br>
*Reposilite sẽ tạo cho chúng ta một access token.*
<br>
<br>
Quay trở lại giao diện ứng dụng của Reposilite(http://localhost:80) và Sign in bằng name và access token mà bạn vừa tạo ra, bạn sẽ thấy index ```release``` lúc này đang rỗng.
<br>

![Screen Shot 2022-03-21 at 13.55.07.png](https://images.viblo.asia/f29215ec-2a6c-4e8c-a98d-937d99dda4f1.png)
<br>
# Deployment
 Ở đây mình sẽ tạo một project bằng framework [Quarkus](https://quarkus.io) của Java.
 <br>
 
![Screen Shot 2022-03-21 at 14.08.55.png](https://images.viblo.asia/0c82d7c0-0c6e-4aac-ab89-8c78ad09a6f4.png)
<br>
Mình sẽ viết một Class đơn giản như cộng trừ nhân chia chẳng hạn :D

```
package org.reposilite;

public class Operation {

    public Integer plus(int number1,int number2) {
        return number1 + number2;
    }

    public Integer minus(int number1,int number2) {
        return number1 - number2;
    }

    public Integer divide(int number1,int number2) {
        if(number2 == 0)
            return null;

        return number1 / number2;
    }

    public Integer multiply(int number1,int number2) {
        return number1 * number2;
    }
}
```

Ví dụ như Class này sẽ có nhiều service sử dụng lại, thay vì phải copy paste thì bây giờ mình sẽ triển khai nó như một thư viện để sử dụng cho tất cả các project sau này nhưng không public ra bên ngoài ;)

**Deploy bằng cách sử dụng mvn deploy**

Trong project của bạn tại file ```pom.xml``` thêm vào :

```
<project>
...
  <distributionManagement>
    <repository>
      <id>my-repository</id>
      <url>http://localhost:80/releases</url>
    </repository>
  </distributionManagement>
...
</project>
```

```id``` là id repository mà bạn muốn đặt tên.
<br>
```url``` là đường dẫn đến repository server.
<br>

<br>

Trong file ```~/m2/settings.xml``` trên máy của bạn thêm vào:

```
<server>
  <!-- id phải trùng khớp với id được định nghĩa ở file pom.xml trong project-->
  <id>my-repository</id>
  <username>{alias}</username>
  <password>{token}</password>
</server>
```

```alias``` và ```token``` bạn đã tạo ra ở bước Authorization, vậy ta có:

```
<server>
  <!-- id phải trùng khớp với id được định nghĩa ở file pom.xml trong project của bạn-->
  <id>my-repository</id>
  <username>admin</username>
  <password>IEnfkPeMfUjU0dlt2eMPFEBvw0Hm16nCPdB0FbvHMOFBAIk3c4AIA00Lir7g01Hk</password>
</server>
```

![Screen Shot 2022-03-21 at 14.49.35.png](https://images.viblo.asia/64db6d7b-9cca-4a91-8f00-8097198fb359.png)
<br>

Chạy câu lệnh để triển khai project của bạn lên Reposilite:

```
mvn deploy
``` 

<br>

![Screen Shot 2022-03-21 at 14.46.07.png](https://images.viblo.asia/71b6f538-f5d4-4188-a9a3-e9a941bdf747.png)
<br>

Vậy là hoàn tất quá trình deploy, ta quay lại giao diện Reposilite kiểm tra:
<br>

![Screen Shot 2022-03-21 at 14.47.22.png](https://images.viblo.asia/a9bf0da5-aea7-40bd-b64f-a509b8fc0ca6.png)
<br>

Vậy là lên rồi :D

# Cách sử dụng

Bây giờ mình sẽ tạo project khác và sử dụng thư viện mà ta vừa deploy :P
<br>
Hai thư viện mình sử dụng thêm ở đây là:
* RESTEasy Jackson
* SmallRye OpenAPI

<br>

![Screen Shot 2022-03-21 at 15.00.25.png](https://images.viblo.asia/17e9efd9-eee8-4b1f-86a3-e9bb9154bad6.png)
<br>


Ở giao diện Reposilite ta copy dependency vào file ```pom.xml``` của project mới vừa tạo.

![Screen Shot 2022-03-21 at 15.08.39.png](https://images.viblo.asia/756e92a6-67f1-4adb-b6a4-58610248c40e.png)
<br>

```
<dependencies>
    <dependency>
      <groupId>org.reposilite</groupId>
      <artifactId>my-practice-repo</artifactId>
      <version>1.0.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```

Và:
```
<repositories>
<!--Your custom maven repo-->
    <repository>
        <id>my-repository</id>
        <name>My custom maven repo</name>
        <url>http://localhost:80</url>
    </repository>
</repositories>
```

Chạy câu lệnh để cài đặt các thư viện trong file ```pom.xml```
```
mvn clean install
```

<br>

Sau đó thử gõ Class Operation xem gợi ý không:
<br>

![Screen Shot 2022-03-21 at 15.22.25.png](https://images.viblo.asia/917ea3de-3c36-4f1b-bbae-b9a67470efab.png)
<br>
Vậy là có rồi :D

Tiếp theo mình sẽ khởi tạo một api đơn giản tại ```src/main/java/me/repo/practice/MyPracticeResource```
```
package me.repo.practice;

import org.reposilite.Operation;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/operator")
public class MyPracticeResource {

    Operation operator = new Operation();

    @POST
    @Path("plus")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Integer plus(@QueryParam("a") int numberA,@QueryParam("b") int numberB) {
        return operator.plus(numberA,numberB);
    }

    @GET
    @Path("minus")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Integer minus(@QueryParam("a") int numberA,@QueryParam("b") int numberB) {
        return operator.minus(numberA,numberB);
    }
}
```


Chạy câu lệnh để khởi động project:
<br>
```
mvn quarkus:dev
```
<br>

Gọi thử API minus  và xem kết quả nhé :
```
curl -X 'GET' 'http://localhost:8080/operator/minus?a=10&b=2' -H 'accept: application/json'
```
<br>

![Screen Shot 2022-03-21 at 15.35.10.png](https://images.viblo.asia/5eebf1f3-b0d4-4073-9c8f-3a083a6459c0.png)
<br>

Và ta có kết quả là 8 

# References
https://kihats.medium.com/custom-self-hosted-maven-repository-cbb778031f68
<br>
https://reposilite.com

Do là lần đầu viết bài và mới tiếp cận Java được 4-5 tuần nên có gì sai sót gì về tên gọi hay sai ở đâu mọi người góp ý giúp mình cải thiện nhé :D
<br>
Chúc mọi người nhiều sức khoẻ <3

# Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.
 
Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình `duy.nguyenduc@hoang-phuc.net`.

Cảm ơn các bạn đã đọc.