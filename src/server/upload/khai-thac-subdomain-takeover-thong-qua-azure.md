Hey! Chào các bạn. Chào mừng các bạn đã quay trở lại chủ đề **Subdomain takeover** của mình. Ở bài trước mình có viết bài chia sẻ cách mình chiếm subdomain của trường MIT (*[link](https://viblo.asia/p/toi-da-danh-cap-ten-mien-cua-mit-nhu-the-nao-924lJ24blPM)*). Trong bài đó mình có trình bày cơ bản về quá trình phân giải DNS và giải thích tại sao lỗi lại xảy ra, cuối cùng là demo với mục tiêu là trường MIT. Để chiếm được subdomain của trường MIT mình đã khai thác thông **tính năng github page của github**. Người quản trị đã không xóa DNS trỏ tới github page khi github page đã xóa từ đó mình đăng ký lại và đã chiếm được subdomain.

Trong bài này mình sẽ giới thiệu đến các bạn cách chiếm domain thông qua dịch vụ **Azure** của Microsoft. Để hiểu được tại sao lỗi xảy ra các bạn có thể đọc qua [bài này của mình](https://viblo.asia/p/toi-da-danh-cap-ten-mien-cua-mit-nhu-the-nao-924lJ24blPM). Để tiện theo dõi mình xin nhắc lại.
> Lỗi xảy ra khi quả trị viên trỏ domain **subdomain.target.com** tới domain **service.provider.com** của nhà cung cấp dịch vụ nào đó như: **Amazon**, **Microsoft**,... Khi **service.provider.com** đã xóa mà bản ghi DNS vẫn chưa xóa. Khi đó, ta đăng ký lại domain **service.provider.com** thì sẽ chiếm được domain **subdomain.target.com**.

Trong quá trình viết bài mình đã giành ra rất nhiều thời gian để tìm mục tiêu để demo cho bạn đọc có cái nhìn trực quan hơn. Mình đã lang thang trên google đã rất hên xui kiếm được một target để POC lại :').

# Tìm kiếm mục tiêu
Mục tiêu thì tùy mỗi người có một cách chọn. Mình lên google gõ vài từ khóa và tìm mục tiêu nào trông có vẻ to thì mình tấn công vào. Vì mục tiêu to thì có nhiều dịch vụ, nhiều domain nên khả năng tìm được lỗi sẽ cao hơn. Khi tìm được mục tiêu rồi thì mình tiến hành tìm subdomain và lọc ra các domain còn sống và lưu vào một file.

Tool tìm subdomain:
+ assetfinder
+ subfinder
+ amass

Lọc domain còn sống:
+ httpx

Câu lệnh mình chạy
```bash
assetfinder -d target.com | httpx --threads 100 | tee target.com.alive
```

# Tìm lỗi
Sau khi đã có list subdomain tiếp tục mình dùng tool **nuclei** để tìm lỗi  subdomain takeover.
```bash
cat target.com.alive | nuclei -t ~/nuclei-templates -o target.com.nuclei
```

![](https://images.viblo.asia/bc51df72-a53a-43a6-811e-27395da53c5b.png)

Sau khi đã có kết quả mình tiến hành kiểm tra lại.
```bash
dig subdomain.target.com
```

![](https://images.viblo.asia/c987a316-543a-4908-9264-8b4105ac3a0f.png)

**Đến đây là mình đã chắc chắn có thể chiếm được subodomain này rồi! :scream:**

# Khai thác lỗi
Trong ví dụ này, subdomain được trỏ tới dịch vụ **Web service** của Azure. Nên mình sẽ đăng ký dịch vụ **web service** với tên là **xxx** tương ứng với **CNAME** là **xxx.azurewebsites.net**. Có lẽ các bạn sẽ tự hỏi tại sao mình lại biết đó là dịch vụ gì? Để biết thêm chi tiết các bạn tham khảo [link](https://docs.microsoft.com/en-us/azure/security/fundamentals/azure-domains).

![](https://images.viblo.asia/f4a6b08c-1886-44cc-9d79-e5c2e1aad9d7.png)


Các bước khai thác sẽ được mô tả bằng hình ảnh ở dưới.

![](https://images.viblo.asia/4d51a566-f9b2-4429-8569-94d6b46e62fc.png)

![](https://images.viblo.asia/2c23e09c-31d2-4927-941e-cbb82a4fc386.png)

![](https://images.viblo.asia/7bc50f3a-6eb1-4da7-b946-0392345156dc.png)

Nếu có thể tạo được dịch vụ sẽ có dấu tích xanh như hình. Tiếp đó ta chọn các trường **\* đỏ** theo yêu cầu và chọn **Review + create**. Như vậy là đã chiếm subdomain thành công.

Do tài khoản của mình tạo nhiều dịch vụ quá đã hết phần sử dụng miễn phí nên đã bị disable. Nên sẽ không có phần hiển thị đã khai thác thành công. Nhưng các bạn yên tâm đến bước này là chắc chắn khai thác thành công rồi. 

Bài của mình xin tạm dừng tại đây. Các bạn hãy tự tìm mục tiêu riêng cho mình và POC lại nhé.

Cảm ơn các bạn đã đọc bài.

# Tham khảo
Các bạn có thể đọc thêm để tham khảo
https://godiego.tech/posts/STO/#azure-websites