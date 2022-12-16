## Introduction
Trước tiên chúng ta cần hình dung lại hai khái niệm: **Amazon CloudFront** và **Rails Assets Pipeline**:
* **Amazon CloudFront** là dịch vụ mạng phân phối nội dung (CDN) nhanh giúp phân phối dữ liệu, video, ứng dụng và API đến khách hàng trên toàn cầu một cách bảo mật, với độ trễ thấp, tốc độ truyền cao, tất cả trong một môi trường thân thiện với nhà phát triển.
* **Rails Asset Pipeline** cung cấp một framework cho phép kết nối, nén hay giảm bớt những tài nguyên về CSS hay JS  thành 1 file để hạn chế lượng request của browser lên server. Nó còn cho phép chúng ta có thể viết CSS, JS bằng một số ngôn ngữ khác nữa như CoffeeScript, Sass hay ERB.

Với sự hỗ trợ của **Amazon CloudFront**, chúng ta hoàn toàn có thể sử dụng `CDN` như một `Asset host`, nhằm tăng performance cho quá trình `Asset Delivery` của server.

## Asset Pipeline: how it works
Khi chúng ta deploy một rails app lên môi trường production, `assets` sẽ được precompile thủ công với lệnh: `rake assets:precompile`, hoặc khi deploy với gem `Capistrano` , `assets` sẽ tự precompile với config `load 'deploy/assets'`.

Với mỗi `asset` trong `app/assets`, **Assets Pipeline** sẽ lần lượt:
* **Compiles it**: trong trường hợp content chứa các nội dung về javascipt hay css, nó sẽ gộp các files nhỏ liên quan vào thành một file JS/CSS tương ứng.
* **Computes the file's digest** hay còn gọi là **Fingerprinting**: một kỹ thuật `caching` dùng để xác định version của file bằng cách chèn thêm chuỗi digest vào cuối tên file. Khi nội dung file thay đổi, chuỗi digest sẽ thay đổi theo và ngược lại.
* **Copies the compiled file**: file sau khi được `compile` và chèn thêm `fingerprinting` sẽ được copy sang thư mục `public/assets` tương ứng.
* **Adds the asset to public/assets/manifest.json**: đường dẫn của file gốc sẽ được map với phiên bản `compiled` tương ứng, vd: `"photo.png":"photo-a6c9ef.jpg"`


![](https://images.viblo.asia/3de704d0-44e2-4add-b845-fff253b2883d.png)

Khi phía client thực hiện request lấy `photo.jpg` thông qua `image_path` helper, `Pipeline` sẽ check `manifest.json`  để lấy ra digest version dựa trên `logical path` của file đó. Nếu như `Pipeline` tìm thấy mapping `"photo.png":"photo-a6c9ef.jpg"`, nó sẽ trả về `digest asset`, và ngược lại trong trường hợp không tìm thấy, nó sẽ trả về `non-digest asset` phù hợp với `logical path` ban đầu.

## Using CloudFront as an Asset Host
Dù **Assets Pipeline** rất hữu ích trong việc giảm thiểu tối đa các `Static Assests Request` song song lên server,  nhưng với trường hợp site sử dụng quá nhiều `Static Assets` và `media`, việc xử lí contents từ webserver sẽ ngày càng nặng nề hơn, vì về cơ bản, các `Static Assets Request` này vẫn đi thẳng tới server.

Tuy nhiên, với việc chỉ định `Asset Host` khác nhau tương ứng với từng request từ các vị trí địa lý khác nhau, sẽ giảm tải được cho server rất nhiều. Để làm được điều này, chúng ta sẽ cần đến **Amazon CloudFront**.

**Amazon CloudFront** hiện cung cấp khoảng 52 `edge locations` trên khắp thế giới. Các `static content` sẽ được `cached` tại các `edge location` phù hợp. Khi bất cứ `Static Assets Request` được gửi đến, `Rails` sẽ chuyển hướng request đến các `CDN` tương ứng.

Về cơ bản, chúng ta sẽ sửa lại config assets host trong hệ thống thành `Cloudfront Endpoint` của aws mà ta đã đăng kí (vd: `assets.yoursite.com`) :
```
config.action_controller.asset_host = "assets.yoursite.com"
```
Chúng ta sẽ được sơ đồ các step như sau:

![](https://images.viblo.asia/1b15c891-3a9d-4fd0-960e-b8f43aeb3c4b.png)

1. Khi có request đến homepage `home#index` bao gồm các `Static Assets Request` liên quan (vd: *photo.jpg*), **Assest Pipeline** sẽ được kích hoạt, dựa vào `manifest.json` và `Asset Host config` để mapping `digest version`(*photo-a6c9ef.jpg*) tương ứng từ file gốc và biến "*photo.jpg*" request trở thành `Assets host(assets.yoursite.com/assets/photo-a6c9ef.jpg)` request.
2. Với việc sử dụng **DNS provider**, browser sẽ xử lý `assets.yoursite.com` tới các **CloudFront distribution** domain name (được config bằng cách tạo `CNAME` record trong `Route53`).
3. **CloudFront distribution** sẽ check lại cache tương ứng với file được yêu cầu. Nếu cached file không thể tìm thấy, nó sẽ gửi `Asset Request` đến Origin Server (`yoursite.com`).
4. Rails server nhận được "*/assets/photo-a6c9ef.jpg*" request từ CloudFront, tuy nhiên **Asset Pipeline** lúc này sẽ không tạo ra thêm request đến `CDN` nữa (để tránh gây ra infinitive loop), bởi vì "*/assets/photo-a6c9ef.jpg*" không phải là `logical path` trong `manifest.json`, thay vào đó Rails sẽ check file trong `public/assets` folder, và trả lại "*public/assets/photo-a6c9ef.jpg*" về cho `CDN`.
5. CloudFront sẽ cache lại `Assets file`("*/assets/photo-a6c9ef.jpg*") nhận được từ Rails app, và trả về bản copy của asset cho phía client, hoàn thành request ban đầu.

Từ những lần sau, mỗi khi client lặp lại request tương tự, steps #1-3 vẫn sẽ thực thi như bình thường, tuy nhiên `CloudFront` lúc này đã cached được file requested từ lần trước, do đó nó sẽ ngay lập tức trả về `asset` file phù hợp, bỏ qua steps #4-5, giảm tải cho Origin Server.

Một điều khá thú vị nữa là do tính năng `Fingerprinting` của **Asset Pipeline** nên file version lúc nào cũng được cập nhật cùng lúc với origin server sau mỗi lần deploy, nhằm tránh việc CloudFront trả về những file đã cũ hoặc hết hạn.

## Implement
Để sử dụng CloudFront như là một `Asset Host` cho các `Static Assets`, phía app cần thêm/sửa lại trong config: `config/environments/production.rb`
```
config.action_controller.asset_host = ENV['CLOUDFRONT_ENDPOINT']
```
Rails sẽ hiểu rằng chúng ta muốn sử dụng `CloudFront EndPoint` như là một hostname cho các `Static assets`.

Còn về phía server, trước tiên chúng ta sẽ phải tạo `CloudFront Distribution`, các bạn có thể tham khảo thêm tại [đây](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html).

Sau đó chúng ta sẽ phải thêm `environment variable` pair:
* **Key**: CLOUDFRONT_ENDPOINT
* **Value**: URL CloudFront endpoint của bạn (available in the CloudFront console) vd: `thanos.cloudfront.net`

Sau khi deploy app, chúng ta check page source sẽ thấy nếu trước đây: 
```
<link data-turbolinks-track="true" href="/assets/application-0f3bf7fe135e88baa2cb9deb7a660251.css" media="all" rel="stylesheet" />
<script data-turbolinks-track="true" src="/assets/application-2ab5007aba477451ae5c38028892fd78.js"></script>
```
Giờ sẽ trở thành:
```
<link data-turbolinks-track="true" href="http://thanos.cloudfront.net/assets/application-bfe54945dee8eb9f51b20d52b93aa177.css" media="all" rel="stylesheet" />
<script data-turbolinks-track="true" src="http://thanos.cloudfront.net/assets/application-4984ddfbabfbae63ef17d0c8dca28d6c.js"></script>
```
tương ứng với code trong app:
```
<%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track' => true %>
<%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
```

## Summary
Bài viết nhằm chia sẻ về kỹ thuật ứng dụng **Amazon Cloudfront** trong việc caching **Rails Asset Pipeline** nhằm giảm tải các `Static Assets Request` lên Origin server, từ đó tăng performance của hệ thống.

Bài viết còn nhiều thiếu sót, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn và tài liệu tham khảo:
* https://guides.rubyonrails.org/asset_pipeline.html
* https://aws.amazon.com/blogs/developer/caching-the-rails-asset-pipeline-with-amazon-cloudfront/
* http://blog.davidelner.com/rails-asset-pipeline-serve-assets-easily-and-cheaply-from-cloudfront/