## Giới thiệu
Chào các bạn tới với series về Serverless, ở [bài trước](https://viblo.asia/p/serverless-series-golang-bai-5-authentication-with-amazon-cognito-part-2-E375zPnbZGW) chúng ta đã tìm hiểu về cách security một API bằng cách kết hợp API Gateway và Cognito. Ở bài này chúng ta sẽ tìm hiểu về thành phần tiếp theo để tăng tốc độ tải của trang SPA của ta (bằng cách sử dụng một dịch vụ CDN của AWS), là CloudFront.

Hệ thống mà ta sẽ xây dựng như sau.

![](https://images.viblo.asia/9d63b79c-bc89-4f9c-a31a-b5e2d8038f2f.jpg)

Ở bài trước ta đã xây dựng được phần API Gateway + Lambda + S3 + Cognito.

![](https://images.viblo.asia/a604f063-c8e2-4fe4-9924-2041ca022c14.jpg)

Ở bài này ta sẽ xây dựng thêm phần CloudFront + Lambda@Edge.

![](https://images.viblo.asia/9671e378-a3b6-4f8c-b447-bb2532043cba.jpg)

## Provisioning previous system
Mình sẽ dùng terraform để tạo lại hệ thống, nếu các bạn muốn biết cách tạo bằng tay từng bước thì các bạn xem từ [bài 2](https://viblo.asia/p/serverless-series-golang-bai-2-build-rest-api-with-aws-api-gateway-6J3Zga3L5mB) nhé. Các bạn tải source code ở git repo này https://github.com/hoalongnatsu/serverless-series.git.

Di chuyển tới folder bai-6/terraform-start. Ở file policies/lambda_policy.json, dòng "Resource": "arn:aws:dynamodb:us-west-2:<ACCOUNT_ID>:table/books", cập nhật lại <ACCOUNT_ID> với account id của bạn. Xong sau đó chạy câu lệnh.

```
terraform init
terraform apply -auto-approve
```

Sau khi Terraform chạy xong, nó sẽ in ra terminal URL của  API Gateway và website.

```
base_url = {
  "api" = "https://kvpspx1bw0.execute-api.us-west-2.amazonaws.com/staging"
  "web" = "http://serverless-series-spa.s3-website-us-west-2.amazonaws.com"
}
```

Và hệ thống của ta sau khi chạy Terraform như sau.

![](https://images.viblo.asia/46c81e8c-b164-4922-8428-62b7b6f73e34.jpg)

Oke, giờ ta truy cập http://serverless-series-spa.s3-website-us-west-2.amazonaws.com thì sẽ thấy được trang SPA của ta.

![image.png](https://images.viblo.asia/cae096cd-faf3-483e-8bb2-bc237469eda8.png)

Tiếp theo ta sẽ tiến hành dựng phần CloudFront.

## CloudFront
Amazon CloudFront là một dịch vụ CDN (content delivery network) mà cho phép chúng ta tăng tốc tộ tải của của thành phần static trong một trang web như là các file .html, .css, .js, và hình ảnh. Vì trang Single Page Application của ta hoàn toàn là static file, và xu hướng hiện giờ là tách phần FE với BE ra riêng, FE thường được build bằng React, Vue hoặc Angular.  Nên sử dụng CloudFront để cache lại trang SPA là rất phù hợp.

![image.png](https://images.viblo.asia/4131d307-1f60-45bc-a832-8ad89774dbb6.png)

CloudFront sẽ phân phối static content của một trang web tới toàn bộ Edge (đây là nơi lưu trữ cache của static content), và khi user truy cập trang web của ta mà có sử dụng CloudFront, thì request user sẽ được chuyển tới Edge gần nhất và Edge sẽ trả về static content cho user hay vì phải gọi tới server.

AWS có một mạng lưới Global Edge rất rộng, vì vậy khi ta dùng CloudFront thì các user ở xa bị trí server của ta vẫn có thể truy cập được trang web rất nhanh. Ví dụ hệ thống mà ta đang xây dựng, trang SPA được hosting bằng S3 nằm ở tận US West, nên khi user ở Việt Nam truy cập thì sẽ bị chậm 1 2 giây, nếu ta dùng CloudFront thì mạng lưới Edge sẽ có một thằng nằm ở Singapore, và trang SPA của ta sẽ được cache ở Singapore, khi người dùng Việt Nam truy cập trang web của ta thì họ sẽ truy cập tới Singapore chứ không phải tận bên 
US West.

![image.png](https://images.viblo.asia/fb3765d1-6f12-45d1-9b37-7a69159440de.png)

### Fix security S3 bucket
Trước khi tiến hành tạo CloudFront thì ta sẽ fix một số vấn đề liên quan tới security S3 bucket ta dùng để hosting trang SPA . Các bạn để ý là thằng serverless-series-spa bucket mà ta dùng để hosting trang SPA nó sẽ có warning  màu đỏ là **Public**.

![image.png](https://images.viblo.asia/d2889db3-e82a-4d86-84b3-8783d880a324.png)

Lý do là vì ở phần **Block public access** ta không có block gì cả.

![image.png](https://images.viblo.asia/2a029000-98b0-487b-ab1e-cc689ae51e75.png)

Đối với AWS thì khi mà ta tạo một S3 mà để public access thì đó sẽ là bad security, do ở bài trước ta cần phải truy cập được vào trang SPA của ta, nên ta mới để nó là public để ai cũng có thể truy cập được, mà cách làm vậy chỉ dành cho mục đích test, còn làm thực tế thì ta không nên để S3 bucket của ta là public access, cho dù ta có dùng nó để hosting static website. Vậy thì sao ta truy cập trang web của ta được?

Câu trả lời là ta sẽ truy cập nó thông qua CloudFront, và S3 sẽ nằm ở đằng sau CloudFront. Khi user truy cập thì sẽ truy cập vào CloudFront, và CloudFront sẽ request tới S3 để lấy content sau đó nó lưu content mà lấy được từ S3 về vào cache, và sau đó khi user truy cập trang web thì user sẽ lấy dữ liệu từ CloudFront ra.

Oke, giờ ta sẽ làm các bước sau để disable public access của S3 bucket.
1. Truy cập https://console.aws.amazon.com/s3/.
2. Bấm vào **serverless-series-spa** bucket.
3. Chọn qua tab **Permissions**.
4. Kéo xuống phần **Block public access (bucket settings)**, bấm Edit.
5. Check vào **Block all public access**. Và bấm save.

![image.png](https://images.viblo.asia/5286fa65-64dc-49c0-a34e-f5538065a7bf.png)

6. Chọn confirm.

Tiếp theo ta sẽ cập nhật lại **Bucket policy**.
1. Ở tab **Permissions**.
2. Kéo xuống phần **Bucket policy**.
3. Bấm edit.
4. Xóa hết nội dung của policy.
5. Bấm save. Chắc chắn là policy thành rỗng nhé.

![image.png](https://images.viblo.asia/fa0551de-e322-4793-a2e8-922529aee9db.png)

Lúc này khi kiểm tra lại bucket thì ta sẽ thấy nó mục Access của nó là **Bucket and objects not public**.

![image.png](https://images.viblo.asia/a1f51ad0-2700-4171-9ddb-aa7f66e3a852.png)

Nếu bây giờ ta truy cập vào url của s3 bucket lại, thì nó sẽ trả về lỗi là 403 Forbidden. Đúng với mục đích của ta cần.

![image.png](https://images.viblo.asia/1322b6e4-09a8-4c98-a827-d0534110bc75.png)

### Setting CloudFront for S3 bucket
Sau khi fix security cho S3 xong thì giờ ta sẽ tiến hành tạo CloudFront cho nó. Đầu tiên ta truy cập vào console của CloudFront https://console.aws.amazon.com/cloudfront. Lúc mình viết bài này thì UI nó như sau.

![image.png](https://images.viblo.asia/56378b43-6a02-4937-9437-627694b748dd.png)

Ta bấm vào nút **Create a CloudFront distribution** nó sẽ dẫn ta qua phần tạo distribution cho CloudFront. Ta sẽ thấy UI như hình dưới, ở mục **Origin** ta chọn serverless-series-spa của ta. Phần **Origin path** ta để rỗng.

![image.png](https://images.viblo.asia/b630c5d8-8273-466b-87f1-200d13e2f844.png)

Tiếp theo là phần quan trọng để CloudFront có thể truy cập được vào S3 bucket. Là phần S3 bucket access.

![image.png](https://images.viblo.asia/af24102c-c7d3-4dd7-a541-ca1dd17b8f4c.png)

Ta chọn sang radio **Yes use OAI (bucket can restrict access to only CloudFront)**, ở phần **Bucket policy** chọn sang radio **Yes, update the bucket policy**, ở ô **Origin access identity**, bấm **Create new OAI**, nó sẽ hiện lên cái modal tạo, bấm tạo.

![image.png](https://images.viblo.asia/3dd01caf-97d9-4362-b4e5-0e5025a98c07.png)

Các mục còn lại tạm thời ta cứ để mặc định, kéo xuống phần Settings, ở ô **Default root object** điền vào index.html

![image.png](https://images.viblo.asia/90c67048-6bf1-4449-8b67-263e87797d9e.png)

Sau đó bấm Create distribution. Ta sẽ thấy CloudFront của ta.

![image.png](https://images.viblo.asia/ce583c17-3d88-4366-affc-69a80e54b3e1.png)

Ở phần General -> Distribution domain name ta sẽ thấy url của CloudFront. Truy cập url này ta sẽ thấy được trang web của ta. Bây giờ thì nó đã có cache, nếu bạn để ý thì lúc này nếu ta F5 lại trang web thì hình ảnh nó tải rất nhanh so với lúc ta không dùng CloudFront.

Mọi thứ có vẻ ok, nhưng khi bạn dùng CloudFront với S3 mà để hosting một trang SPA thì nó sẽ bị một vấn đề rất phổ biến là nếu bạn truy cập vào một đường dẫn khác, ví dụ như và /login chẳng hạn.

![image.png](https://images.viblo.asia/2cefdd24-321d-41fc-8dd0-36ec81c94e6b.png)

Thì nó vẫn tải được trang web bình thường, nhưng nếu bạn reload trang lại ngay tại đường dẫn login, thì nó sẽ báo lỗi.

![image.png](https://images.viblo.asia/700baf22-ca38-493d-9a49-0102f97fb323.png)

Lý do là vì với static website thì khi ta dùng CloudFront , nó sẽ truy cập ở root của S3 bucket là file index.html, khi nó tải được file này thì những file khác mới có thể tải được. Đối với SPA thì khi ta click trên giao diện để chuyển trang, ví dụ nhảy qua đường dẫn /login, thì thật ra nó sẽ gọi một file khác nằm trong dường dẫn js có tồn tại ở trên S3 bucket, nên trang của ta vẫn tải được. Nhưng khi ở dường dẫn /login, ta reload lại trang, lúc này CloudFront hiểu là ta truy cập vào thư mục login ở trên S3 bucket, mà S3 bucket của ta không hề có thư mục này, nên ta sẽ bị lỗi. Cấu trúc folder mà ta đã upload lên S3 bucket.

![image.png](https://images.viblo.asia/6fbcd332-e04f-4ff7-8b0a-8b00455c6172.png)

Vì vậy nên khi hosting một trang SPA, nếu bạn dùng nginx thì ta sẽ thường config thế này.

```
location / {
  index  index.html;
  try_files $uri $uri/ /index.html;
}
```

Chỗ try_files nghĩa là nếu ta đi tới dường dẫn gì thì nó cũng sẽ dẫn về index.html, do đó nếu ta có truy cập tới dường dẫn /login thì nó vẫn nhảy về index.html và tải trang của ta lên, sau ở code của SPA nó sẽ phát hiện là ta đang ở đường dẫn là /login, nó sẽ tiếp tục request file ở trong folder js.

Vậy thì vấn đề ở đây là ta đang dùng CloudFront chứ không có dùng server để hosting trang SPA, thế ta sẽ thực hiện công việc redirect bất kì dường dẫn nào đều quay về index.html như thế nào? Để làm được việc đó, thì AWS có cung cấp cho ta Lambda@Edge.

## Lambda@Edge
Lambda@Edge thì cũng giống như Lambda, nó là một function sẽ được thực thi khi có một event nào đó xảy ra, khác ở chỗ là Lambda@Edge sẽ được thực thi ở trên Edge. Ta có thể config Lambda@Edge được trigger bởi CloudFront khi một request đi tới CloudFront, như trong hình phía dưới.

![image.png](https://images.viblo.asia/f61f8e77-054e-4ca8-a2b9-533110355b80.png)

Có 4 event mà CloudFront sẽ trigger Lambda@Edge là:
+ CloudFront Viewer Request: Lambda@Edge sẽ được gọi khi CloudFront nhận request từ client.
+ CloudFront Origin Request: Lambda@Edge sẽ được gọi khi CloudFront gửi request tới origin phía sau.
+ CloudFront Origin Response: Lambda@Edge sẽ được gọi CloudFront nhận request từ origin.
+ CloudFront Viewer Response: Lambda@Edge sẽ được gọi trước khi CloudFront trả về response cho client.

Ta đang muốn modify lại request của user khi user request tới dường dẫn nào thì cũng sẽ quay về index.html, vì vậy nên ta sẽ dùng event là CloudFront Viewer Request.

Ok, giờ ta sẽ tiến hành thực hiện tạo Lambda@Edge để modify lại request của user. Ta làm theo các bước như sau.
1. Truy cập https://console.aws.amazon.com/cloudfront/home#/functions. Đây là chỗ để ta tạo một Lambda@Edge.

![image.png](https://images.viblo.asia/0978d142-75b0-4419-81db-c2640ae90721.png)

2. Bấm **Create function**.
3. Ở ô Name, điền vào là cloudfront-redirect.

![image.png](https://images.viblo.asia/a46c4bb5-7891-4756-9737-b27abb8736ec.png)

4. Bấm **Create function**.

5. Lúc này thì trên UI nó sẽ dẫn ta qua mục viết function.

![image.png](https://images.viblo.asia/24b894c5-3f8a-4ed1-be24-0dfbf43135e8.png)

Bạn copy đoạn code sau vào.

```
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/') || !uri.includes('.')) {
      request.uri = '/index.html';
  }

  return request;
}
```

Chỗ `!uri.includes('.'))` là được dùng để kiểm tra nếu một dường dẫn mà nó có chứa extension thì ta sẽ không redirect về index.html.

![image.png](https://images.viblo.asia/57c3386f-9e07-4474-b3fc-0395f48d5e2c.png)

Sau đó bấm **Save changes**. 

6. Chọn qua tab **Publish**, bấm Publish function, sau đó nó sẽ hiển thị cho ta phần **Associated distributions**.

![image.png](https://images.viblo.asia/5d295328-6dea-40c2-bc54-19aba7d3f917.png)

7. Bấm vào **Add association**, nó sẽ hiện lện một modal, chọn Distribution của ta, event type chọn Viewer Request, Cache behavior ta chọn Default. Sau đó bấm Add association.

![image.png](https://images.viblo.asia/472ed46e-9735-4581-a1cb-e2f69fb6e9d8.png)

![image.png](https://images.viblo.asia/98711bfa-cf49-4e71-85aa-c7c190079ad9.png)

Oke, giờ thì ta đã implement Lambda@Edge để modify request của user thành công, bây giờ thì bạn truy cập trang web của ta, nhảy qua page /login, giờ thì bạn reload trang, ta sẽ thấy là trang web của ta sẽ không bị lỗi nữa 😁. Hình minh họa hoạt động của phần CloudFront.

![image.png](https://images.viblo.asia/fe6daf38-b2eb-4609-85d9-9568f30e2d29.png)

## Kết luận
Vậy là ta đã tìm hiểu xong cách sử dụng CloudFront và Lambda@Edge. Sử dụng CloudFront sẽ giúp cho trang web của ta tải nhanh hơn và fix được một số security của S3, ngoài ra nó sẽ giúp ta giảm request tới S3 => giảm cost khi sử dụng S3. Sử dụng Lambda@Edge với CloudFront sẽ giúp ta nhiều vấn đề, ở đây ta chỉ dùng để modify request uri, nhưng nó sẽ có rất nhiều lợi ít khác nữa như là ta sử dụng nó để giảm size của hình ảnh khi upload, customized content với high performance, v...v... Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo.

## Mục tìm kiếm đồng đội
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

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.