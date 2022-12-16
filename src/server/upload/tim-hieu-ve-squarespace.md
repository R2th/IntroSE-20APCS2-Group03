Chào các bạn, thời gian tới mình được tham gia 1 dự án mới, nên được tiếp cận với công nghệ mới, đó chính là squarespace (yahoo!!!). Vì đây là lần đầu tiên được nghe và biết đến nó nên mình cũng rất hào hứng khi được tìm hiểu nó. Bây giờ mình sẽ cùng các bạn tìm hiểu nó là gì nhé

**1) Squarespace là gì**

Trước hết, theo thông tin mình tìm được trên màng:

`Squarespace là công cụ xây dựng website chuyên nghiệp có khả năng giúp bạn xây dựng trang web của mình với giao diện đẹp mắt và đầy đủ các tính năng cơ bản. Squarespace có nhận thức rất tốt về tính hiện đại và những lựa chọn thiết kế tuyệt vời với các mẫu temple đơn giản.`

Nghe giống wordpress nhể, thôi không sao, kệ nó, cứ dùng thử đã rồi chúng ta sẽ biết được nó khác ở đâu

**2) Cài đặt** 

Chúng ta vào link sau để bắt đầu nhé: https://developers.squarespace.com/, rồi chọn WEB PLATFORM, các bạn sẽ được chuyển đến quick start. Ở đây chúng ta sẽ được hướng dẫn cài đặt và sử dụng squarespace lần đầu tiên. Trước tiên bạn phải bật chế độ developer, sau đó bạn sẽ clone template về để xem.

Ở đây khi bạn clone về nó sẽ yêu cầu bạn nhập id và pass, id là tài khoản git của bạn nhưng pass thì bạn phải vào link https://support.squarespace.com/hc/en-us/articles/360000044827-Protect-your-account-with-two-factor-authentication#toc-generate-an-app-password để được hướng dẫn lấy pass và không bị mất 30p cuộc đời giống mình (chỉ để tìm pass) nhé T.T

Sau khi làm xong các bước trên, bạn đã clone đước template của squarespace về rồi đấy.

Giờ chúng ta cùng xem cấu trúc của nó nhé

**3) Cấu trúc**
- **a) file có đuôi .region**

Cụ thể ở đây là file site.region, các file như vậy có chức năng xác định bố cục các trang mẫu, chứa header, footer và sidebar của trang. Mỗi mẫu sẽ có ít nhất 1 tệp .region. Thông thường thì site.region được sử dụng để làm bố cục mặc định
```
<!doctype html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="initial-scale=1">
    <!--Include sqs scripts, meta tags, and user content from the code injection tab.-->
    {squarespace-headers}
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h1 class="site-title">
          <a href="/">
          {website.siteTitle}
          </a>
        </h1>
      </header>
      <main class="content">
        <section id="page" role="main" data-content-field="main-content">
          {squarespace.main-content}
        </section>
      </main>
    </div>
    <!--Injection point for tracking scripts and user content from the code injection tab.-->
    {squarespace-footers}
  </body>
</html>
```
 **b) file template.conf**

File này dùng JSON để config cho các thành phần thiết yếu của template, bao gồm các thành phần như:

- Tên trang của bạn
- Layout của trang
- Thêm navigation sections
- thêm các file stylesheet được thêm trong ``site.css``

```
{
  "name" : "Demo Square Space",
  "author" : "Tran Hoang Loc",
  "layouts" : {
    "default" : {
      "name" : "Default",
      "regions" : [ "site" ]
    }
  },
  "stylesheets": [],
  "navigations" : [
    {
      "title" : "Main Navigation",
      "name" : "mainNav"
    }
  ],
}
```

**4) Chỉnh sửa UI**

Mặc dù có thể chỉnh sửa thông qua code (các bạn có thể tham khảo ở đây: https://developers.squarespace.com/beginner-tutorial ). Nhưng squarespace vẫn cung cấp cho user, những người không biết code, vẫn có thể tự do chỉnh sửa được UI.

Trước tiên, hãy tạo 1 account squarespace, nhớ là chọn developer mode nhé

Chọn Create website
![](https://images.viblo.asia/1abd4b00-d11b-454c-a279-25ba1191880a.PNG)

Tại đây, squarespace cung cấp cho chúng ta rất nhiều template thuộc nhiều chủ đề khác nhau, bạn có thể chọn 1 cái bất kì
![](https://images.viblo.asia/4ef16894-4834-462f-8f32-bc8149253961.PNG)
![](https://images.viblo.asia/8bbce5c0-4a31-4475-ac72-f6d1a374c169.PNG)

Sau khi chọn xong, nó sẽ hiện ra trang template đó, ở đây mình đã xóa hết template và edit lại theo ý mình :v , nên các bạn sẽ không tìm thấy dc cái template nào giống vậy đâu. Bấm vào edit để có thể edit được UI
![](https://images.viblo.asia/e60870e2-f4dd-4f3e-a176-1541a63891d3.PNG)
![](https://images.viblo.asia/b3d8e12b-0d34-43c2-9705-ad87109789c1.PNG)

Khi bấm vào các block text hay hình bạn có thể sửa được nội dung, color, thậm chí là cả animation:
![](https://images.viblo.asia/9003d03b-a412-4ba4-b81c-f86c82508d5d.PNG)

**5)Kết**

Thật sự mà nói, nếu làm 1 bài hướng dẫn về việc chỉnh sửa UI của squarespace thì mình nghĩ không đáng tí nào (vì nó khá đơn giản, viết ra thì lại mang tiếng câu view :| ).

Tuy nhiên, squarespace không chỉ có mỗi chức năng đó. Lần tới nếu có dịp,  mình sẽ giới thiệu thêm cho các bạn những thứ hay ho về squarespace. Cảm ơn các bạn đã theo dõi bài viết của mình :D