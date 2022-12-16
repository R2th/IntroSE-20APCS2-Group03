Câu chuyện của bài post lần này đơn giản là sếp mình muốn mình tìm hiểu về cách sử dụng graph-api của facebook. (Hình ảnh chỉ mang tính chất minh họa)
![](https://images.viblo.asia/30f26d1e-3bd5-481c-8d2d-78ca4424f295.png)
Mình đã cố gắng nghiên cứu kỹ câu hỏi này trong 4 ngày làm việc và mình sẽ mô tả cụ thể quá trình tìm hiểu này cho các bạn.  Chúng ta sẽ đi từ lý thuyết khô khan cho đến việc mô phỏng ứng dụng thực tế. Cụ thể, qua 2 part của bài viết lần này, các bạn sẽ hiểu được:
1. Facebook graph-api là cái gì? Tại sao phải sử dụng nó?
2. Hai cách để sử dụng facebook-graph-api : 
     *  Cách 1: Sử dụng `explorer tools` của facebook (**Part 1**)
     *  Cách 2: Sử dụng `gem koala` để tích hợp api vào trong rails app. **(Part 2**)

Cùng bắt đầu với part 1 của bài viết nào. hí hí!

## Part I: Facebook graph-api là cái gì? Cách sử dụng facebook-explorer-tool để thực hiện lời gọi graph-api?
### 1. API là gì?
Đầu tiên, chúng ta cùng đi tìm hiểu về khái niệm **API** . Nếu mà các bạn lên wiki để tìm câu trả lời, thì nó sẽ liệt kê ra một tràng dài dằng dặc các tài liệu về khái niệm này. Nó quả thực là một khái niệm khá phức tạp để hiểu kỹ. Tuy nhiên để phục vụ mục đích của bài viết lần này, các bạn chỉ cần hiểu như sau:
> API đơn giản là một phần mềm trung gian, nó giúp **các phần mềm** có thể giao tiếp với nhau.
Để mình lấy 2 ví dụ cho các bạn dễ hình dung nhé:
*  Ví dụ số 1: Bạn có một phần mềm tên là `app1` với khả năng tạo file text dạng `.docx, .txt,.... ` . Bạn muốn cái `app` của bạn tích hợp khả năng upload file đã tạo lên `onedrive` (một phần mềm cung cấp dịch vụ lưu trữ nổi tiếng của `Microsoft`) . Vậy tức là phần mềm `app1` của bạn cần **GIAO TIẾP** với phần mềm `onedrive` của Microsoft. Làm thế nào giao tiếp được? Làm thế nào tích hợp tính năng này được? Câu trả lời chính là: sử dụng `onedrive api` của `Microsoft` . Các bạn có thể đọc tài liệu về api này [tại đây](https://developer.microsoft.com/en-us/onedrive)

![](https://images.viblo.asia/1711616d-d18b-421f-adde-e77e441f7aaf.png)

API này cho phép bạn tích hợp tính năng upload file lên `onedrive` chỉ bằng một **lời gọi API** rất đơn giản.


* Ví dụ số 2:  Chúng ta đều biết facebook là một sản phẩm phi thường thành công. Chức năng "**Sign in with facebook**" xuất hiện ở hầu hết các ứng dụng hiện đại như foody, instagram, whatsapp, quora,.... và tất nhiên có thể xuất hiện trong **apps của bạn**. Giờ bạn có một cái app tên là `app2`, muốn sử dụng chức năng "**Sign in with facebook**". Điều đó đồng nghĩa với việc, `app2` của bạn phải **GIAO TIẾP** với `facebook` để lấy những thông tin cần thiết cho chức năng **đăng nhập**.  Việc **GIAO TIẾP** này tất nhiên không phải việc của bạn hay của `app2` , mà là việc của `facebook-login API`. Facebook cung cấp một API như vậy để lấy các thông tin như `name`, `email`, `gender`, `hometown`,.... từ cơ sở dữ liệu của `facebook`(nếu có sự chấp thuận của user) và trả lại bằng một `response` cho `app2`.  `App2` sẽ sử dụng những thông tin trong `response` để đăng ký một tài khoản mới trong **cơ sở dữ liệu của nó** và thực hiện chức năng đăng nhập . Các bạn có thể đọc về `facebook-login api` [tại đây](https://developers.facebook.com/docs/facebook-login/)


Các bạn thấy đấy, việc **GIAO TIẾP** giữa phần mềm của bạn và `facebook ` hay `onedrive` **không phải là việc mà một mình bạn có thể làm được**, nó cần có sự đồng ý của cả bạn và bên phần mềm còn lại. Ngoài ra, khối lượng công việc cần làm để 2 phần mềm có thể **GIAO TIẾP** với nhau cũng không ít. Ví dụ, bạn muốn phần mềm của bạn giao tiếp với một hệ điều hành(cũng là một phần mềm vô cùng phức tạp), để hệ điều hành này thao tác trực tiếp với phần cứng, khi đó bạn sẽ phải tìm hiểu kỹ về cấu trúc máy tính, các nguyên tắc hoạt động của bộ nhớ máy tính, rồi tìm hiểu về mã nhị phân,........ Úi xời đất ơi, nổ mẹ nó não. Nó là **một công việc khá phức tạp.** . Mỗi hệ điều hành sẽ được tích hợp sẵn rất nhiều API , và các bạn hãy cảm ơn các nhà phát triển đã tạo ra các API đó, đơn giản vì câu chuyện **GIAO TIẾP** với hệ điều hành thực sự rất khó tưởng tượng . 

Vậy nên chốt lại, các bạn cần nhớ đúng một điều về **lợi ích của API:**
> API xuất hiện khi hai hay nhiều phần mềm cần **GIAO TIẾP** với nhau. Sự **GIAO TIẾP** này là một công việc phức tạp. và API biến nó thành một việc đơn giản.

### 2. Facebook-graph api là gì? Nó dùng để làm gì?
Tài liệu chính thống về graph-api của facebook rất đầy đủ và liên tục được update, nên cách tốt để trả lời đầy đủ câu hỏi nói trên là các bạn vào trang chủ của nó mà đọc cho kỹ: [Facebook graph-api](https://developers.facebook.com/docs/graph-api/) . Còn nếu bạn lười đọc thì cũng không sao, cứ đọc hết hai bài viết của mình là được. 

Đầu tiên, **facebook api là gì?**
> Facebook-graph api là một api, nó **GIAO TIẾP** với `facebook` để bạn có thể **thực hiện nhiều thao tác trong giới hạn cho phép** với cơ sở dữ liệu của `facebook `. 

Để tìm hiểu xem các **thao tác** nói trên là gì, bạn cần hiểu về khái niệm **dữ liệu** trong `facebook`. Dữ liệu trong `facebook` tồn tại dưới dạng `social graph` (đồ thị xã hội) một đồ thị được tạo ra dựa trên ba khái niệm: `node` , `edge` và `field`.

![](https://images.viblo.asia/4f037fdc-c752-4ce5-b4a7-76ba3a243171.jpg)

**Hình 1: Social graph - khái niệm về dữ liệu trên nền tảng facebook.**

*  `Node` : `Node` là bất kỳ một object riêng biệt nào trên `facebook` . `Node` khá tương đồng với khái niệm `Model` trong `Rails` và thường tương ứng với một bảng trong cơ sở dữ liệu. Ví dụ một `User`, một `photo`, một `comment` , hoặc một bài `post` . Đường dẫn đến các node trên facebook là như sau:
```
#Tổng quát:
https://www.facebook.com/{node-id}
#Node me: đường dẫn đến trang cá nhân của bạn.
https://www.facebook.com/me
#Node photo: đường dẫn đến 1 bức ảnh bất kỳ
https://www.facebook.com/{photo-id}

```
*  `Edge` : Nếu ta có một `node` chỉ định sẵn, thì `edge` là một tập hợp **các liên kết** giữa các `node` có liên quan đến `node` đó.  Ví dụ, nếu node chỉ định à `me` (đại diện cho đối tượng là account của chúng ta trên facebook) , thì ta có các`edge` : `me/photos` (những bức ảnh chúng ta đã đăng) , `me/accounts` (các page mà chúng ta có quyền admin), `me/conversations`(những tin nhắn mà chúng ta đã gửi trên `messengers` )
```
#Sử dụng đường dẫn này sẽ dẫn các bạn để trang lưu trữ ảnh của bản thân trên facebook(Nhớ là khi bạn đã đăng nhập)
https://www.facebook.com/me/photos
```
* `Fields` : `field` ở đây giống với khái niệm `field` trong bảng cơ sở dữ liệu. Đơn giản nó là các thuộc tính của node. Ví dụ với node `User`, nó có các thuộc tính `name` , `email`, `gender`, ........ 

Vậy chốt lại, **cơ sở dữ liệu** trong `facebook` sẽ liên quan đến `node`, `edge` và `field`  và `facebook-graph api` có thể làm các hành động **CRUD** (**nếu được cho phép**) với các `node`, `edge` và `field` đó . Cụ thể: 
* **READ** : Lấy ra dữ liệu từ bất kỳ `node` hoặc `edge` nào của `facebook` (lấy ra danh sách bạn bè, tin nhắn đã gửi, toàn bộ các lượt like, toàn bộ comment, toàn bộ các địa điểm checkin,......)
* **CREATE** : Tạo một `node` hoặc `edge` mới( tạo album ảnh mới, tạo một bài post mới, tạo một tin nhắn mới, ......)
* **UPDATE**: Sửa và cập nhật bất kỳ `node` hoặc `edge` nào .
*  **DELETE**: Xóa các `node` hoặc `edge` đang tồn tại.

Đến đây thì các bạn đã hiểu cơ bản `facebook-graph api` dùng để làm gì rồi phải không. Với nội dung tiếp theo mình sẽ giới thiệu cho các bạn một vài cách để sử dụng nó.

### 3. Các cách để sử dụng facebook-graph api .
Để sử dụng `facebook-graph api` thực hiện các hành động **CRUD** với cơ sở dữ liệu của facebook, đơn giản có hai bước: 
* Bước 1: Tìm một công cụ có thể thực hiện lời gọi cho `facebook-graph-api` .
* Bước 2: Thực hiện **lời gọi api** bằng cú pháp tổng quát 
```
POST/GET/DELETE + https://graph.facebook.com/{node-id}/{edge-id}..........
```

`facebook graph-api` là một `api` dựa trên nền HTTP, vì vậy các bạn có thể sử dụng nó với bất kỳ công cụ nào có hỗ trợ một `HTTP library` như `curl `hay `urllib`.  Nếu chỉ với hành động **READ** (sử dụng phương thức GET) để lấy và đọc dữ liệu trả về, bạn có thể thực hiện **lời gọi api** ngay trên trình duyệt của bạn. Ví dụ, bạn có thể thử **READ** dữ liệu của `node` `/facebook/picture` bằng cách truy cập vào đường dẫn dưới đây:
```
https://graph.facebook.com/facebook/picture?redirect=false
```
Kết quả trả về sẽ là :
```
{
   "data": {
      "height": 50,
      "is_silhouette": false,
      "url": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/31562081_10157324683366729_5005221974700457984_n.png?_nc_cat=1&_nc_ht=scontent.xx&oh=38a74c83e23bdc78a44395213a3f354c&oe=5D0B3855",
      "width": 50
   }
}
```
Đây là một `response` kiểu JSON, chứa các giá trị liên quan đến `node` chúng ta muốn **GET** về. Cụ thể, `node` này chính là `profile picture` của `facebook fanpage` . 

Với hành động **READ** sử dụng phương thức **GET** , thì chúng ta có thể thực hiện rất đơn giản trên trình duyệt. Nhưng với các hành động **CREATE** , **UPDATE**  và **DELETE** (sử dụng các phương thức **POST** và **DELETE**) thì không thể mô phỏng nó ngay trên thanh địa chỉ của trình duyệt mà bạn cần có sự trợ giúp của một công cụ nào đó. Vậy vấn đề ở đây là bạn phải tìm ra một công cụ có thể gửi được các `HTTP request` với ít nhất 3 dạng phương thức `GET, POST, DELETE`. 

Có rất nhiều công cụ có thể giải quyết được vấn đề này, bạn có thể dùng `curl` với vài dòng lệnh trong `console` , cũng có thể sử dụng `form tag` của `HTML` , ........ Tuy nhiên mình sẽ giới thiệu cho các bạn hai công cụ mà mình sẽ sử dụng trong hai part của bài viết lần này để **thực hiện các lời gọi api**, đó là: `facebook-explorer-tool` và `gem koala ` . 

### 4. Tạo một app bất kỳ để GIAO TIẾP với facebook.
Trước khi đi vào thực hiện các **lời gọi api**, chúng ta cùng nhớ lại một chút về mục đích mà API được tạo ra. Đúng rồi, nó được tạo ra để giúp các phần mềm có thể **GIAO TIẾP** với nhau dễ dàng hơn. Cụ thể trong bài viết này, chúng ta muốn **app của chúng ta** có thể giao tiếp với `facebook` thông qua `facebook-graph-api`. Vậy điều đầu tiên cần làm trước khi đi vào demo các chức năng, đó là đăng ký một cái app bất kỳ trên trang `facebook for developers` . Chúng ta truy cập vào [link này](https://developers.facebook.com/) . Sau đó đăng nhập bằng tài khoản facebook của mình. 
Ở thank `dropdown` **Ứng dụng của tôi**, các bạn chọn **"Tạo ứng dụng mới"** , và cửa sổ sau đây hiện ra. 

![](https://images.viblo.asia/90d3d4e7-a618-44c8-9ed6-e1ee317d3828.png)

Các bạn điền tên app của mình vào phần **tên hiển thị** , rồi click vào **"Tạo ID ứng dụng"** . Thế là xong, những setup khác thì để sau.

### 5. Sử dụng facebook-explorer-tool để lấy access_token.

Đầu tiên, các bạn phải hiểu `facebook-explorer-tool` là gì? Nó đơn giản là một công cụ mà đội ngũ phát triển của`facebook` tạo ra để giúp chúng ta có thể khám phá toàn bộ các chức năng liên quan đến `facebook-graph-api` .Các bạn có thể sử dụng nó bằng cách truy cập vào đường [link này](https://developers.facebook.com/tools/explorer) . 

Giao diện của nó sẽ như thế này:

![](https://images.viblo.asia/4be1bf7d-9b7a-40e6-8303-d2d230ac5e09.png)

Giờ để mình thử request `GET` + `/facebook/picture` như ví dụ ở trên nhé, để xem kết qủa như nào:

![](https://images.viblo.asia/a4e0e60a-f458-4ee5-ae7c-a9f0549edb39.png)

Kết quả chẳng có gì khác cách sử dụng trình duyệt, chỉ màu mè và gọn gàng hơn một chút. Tuy nhiên, để mình thử request `GET` + `/me` xem nó dư nào:

```
{
   "error": {
      "message": "An active access token must be used to query information about the current user.",
      "type": "OAuthException",
      "code": 2500,
      "fbtrace_id": "CLlusT1qkPT"
   }
}
```
Ứ ừ, `response` trả về nói với chúng ta rằng : "Mày cần có một cái `access_token` để có thể truy vấn dữ liệu về thằng current_user của mày" . Vậy câu hỏi bây giờ là:
> Ô, vậy là bây giờ để thực hiện các **lời gọi api** sẽ phải có một cái`access_token`. Nhưng access_token là cái gì và dùng để làm gì?

Trong tài liệu [Using graph-api](https://developers.facebook.com/docs/graph-api/using-graph-api/) nói rất kỹ về điều này, các bạn có thể đọc để tìm hiểu rõ hơn. Ở đây mình sẽ trả lời ngắn gọn cho các bạn là thế này. `Facebook-graph-api` được tạo ra là để cho `các app` có thể thao tác với cơ sở dữ liệu của `facebook`. Tuy nhiên, nếu nó cho phép `các app` này thêm, sửa , xóa dữ liệu của tất cả người dùng **THÌ CÓ MÀ LOẠN**. Bạn có thể kiện chết cm thằng `facebook` ngay vì tội bán thông tin của khách hàng. Nó phải hỏi bạn xem bạn có cho phép các app này làm gì đó với dữ liệu của bạn không thì nghe nó mới **hợp tình hợp lý**, và trên thực tế thì nó đã làm vậy. Nó làm vậy bằng cách nào? Câu trả lời chính là:
> `Facebook` cấp quyền sử dụng thông tin của một `node` nào đó cho các app thông qua `access_token`.
Để lấy được `access_token` có nhiều cách, nhưng bất kỳ cách nào thì cũng cần phải thực hiện hai bước:
* **Bước 1**: User cung cấp một scope các `permissions` (quyền sử dụng thông tin) cho server `facebook`. 
* **Bước 2**: Server `facebook` trả về một `response` và trong response ấy sẽ có `access_token`

Ở bước 1, có nhắc đến khái niệm `permissions`, nó có ý nghĩa gì? `Permissions` ở đây là một hệ thống các quyền sử dụng dữ liệu được facebook xây dựng. Ví dụ:
* Muốn truy vấn đến các`field` `gender` , `birthday`, `hometown` của một `user` thì phải được user đó cấp các quyền `user_gender` , `user_birthday` , `user_hometown` .
* Muốn truy vấn đến `edge` `photos` của `user` thì phải được cấp quyền `user_photo` .
* Muốn thông qua một `page` để post bài thì phải được admin của `page` đó cấp quyền `publish_page`,....

Sau khi được cấp quyền rồi, làm sao để có thể lấy được `access_token`? Mình tìm hiểu được 2 cách , tuy nhiên trong part 1 này, các bạn chỉ cần biết một cách, đó là sử dụng `facebook-explorer-tool`. Cụ thể các bạn nhìn vào thanh `sidebar` ở bên phải của tool:

![](https://images.viblo.asia/f5192fb3-5063-450e-8c41-5df4fad25993.png)

Thanh sidebar này có cung cấp đủ hệ thống permissions cho bạn lựa chọn, sau khi lựa chọn xong các permissions cần thiết, bạn ấn vào nút `Get access token` . Sau đó một `pop up` sẽ hiện lên như thế này:

![](https://images.viblo.asia/05f27da0-aba5-4a1f-a486-05235b3b10e9.png)

Nó hỏi bạn để xác nhận lại về các quyền mà bạn cho phép facebook-api có thể thực hiện với dữ liệu của bạn. Sau khi xác nhận **tiếp tục**, cửa sổ này sẽ đóng lại và bạn sẽ nhận được access_token ở khung cuối cùng của thanh sidebar. Thế là xong, bạn đã có access_token. 

### 6. Chức năng READ (GET dữ liệu về)
Chúng ta có thể **GET** dữ liệu từ một `node` về với lời gọi API như sau:
```
https://graph.facebook.com/{node-id}?access_token={your-user-access-token}
```
Ví dụ, mình thử với node `me` trên explorer-tool, kết quả sẽ là:

![](https://images.viblo.asia/79c22ea4-27bc-481a-8a8c-aafdd036e0c4.png)

Ta thấy kết quả trả về là một JSON object với hai `fields` mặc định là `name` và `id` . Để chỉ định các `fields` được trả về, chúng ta có thể tự cấu hình tham số `fields=` như sau:

```
https://graph.facebook.com/{node-id}?fields={your-specific-fields}&access_token={your-user-access-token}
```

kết quả trả về trong response sẽ bao gồm `fields` **được chỉ định** cùng với field `id`( luôn được trả về) . Ví dụ:
```
//Request:
GET + /me?fields=gender,hometown&access_token={your-user-access-token}

//response
{
  "gender": "male",
  "birthday": "12/18/1996",
  "id": "2573340392737278"
}
```

Tương tự, chúng ta có thể **GET** dữ liệu từ một `edge ` như sau:

```
https://graph.facebook.com/{node-id}/{edge}?fields={your-specific-fields}&access_token={your-user-access-token}
```

Ví dụ, chúng ta có thể **GET** về `edge` `photos` của `node` `me` , và chỉ lấy về các `fields: height , width, link, id` bằng một **lời gọi api** như sau:
```
https://graph.facebook.com/me/photos?fields=height,width,link&access_token={your-user-access-token}
```
Kết quả trả về:
```
{
  "data": [
    {
      "height": 316,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=357627218176517&set=p.357627218176517&type=3",
      "id": "357627218176517"
    },
    {
      "height": 479,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=934377109966956&set=a.934376923300308&type=3",
      "id": "934377109966956"
    },
    {
      "height": 540,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=934377009966966&set=a.934376923300308&type=3",
      "id": "934377009966966"
    },
    {
      "height": 540,
      "width": 720,
      "link": "https://www.facebook.com/ncentury95/photos/a.624623040969788/823635807735176/?type=3",
      "id": "823635807735176"
    },
    {
      "height": 480,
      "width": 720,
      "link": "https://www.facebook.com/CDAclub/photos/a.381812535209660/779773208746922/?type=3",
      "id": "779773208746922"
    },
    {
      "height": 396,
      "width": 450,
      "link": "https://www.facebook.com/CDAclub/photos/a.576679272389651/942785635779011/?type=3",
      "id": "942785635779011"
    },
    {
      "height": 537,
      "width": 720,
      "link": "https://www.facebook.com/CDAclub/photos/a.576679272389651/941506222573619/?type=3",
      "id": "941506222573619"
    },
    {
      "height": 720,
      "width": 480,
      "link": "https://www.facebook.com/CDAclub/photos/a.576679272389651/878596412197934/?type=3",
      "id": "878596412197934"
    },
    {
      "height": 720,
      "width": 404,
      "link": "https://www.facebook.com/photo.php?fbid=811409148930420&set=a.811408175597184&type=3",
      "id": "811409148930420"
    },
    {
      "height": 720,
      "width": 404,
      "link": "https://www.facebook.com/photo.php?fbid=811409018930433&set=a.811408175597184&type=3",
      "id": "811409018930433"
    },
    {
      "height": 404,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=811409012263767&set=a.811408175597184&type=3",
      "id": "811409012263767"
    },
    {
      "height": 720,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=811408745597127&set=a.811408175597184&type=3",
      "id": "811408745597127"
    },
    {
      "height": 404,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=811408605597141&set=a.811408175597184&type=3",
      "id": "811408605597141"
    },
    {
      "height": 404,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=811408545597147&set=a.811408175597184&type=3",
      "id": "811408545597147"
    },
    {
      "height": 480,
      "width": 720,
      "link": "https://www.facebook.com/CDAclub/photos/a.847629868627922/847630311961211/?type=3",
      "id": "847630311961211"
    },
    {
      "height": 480,
      "width": 640,
      "link": "https://www.facebook.com/photo.php?fbid=799417193462949&set=a.345985502139456&type=3",
      "id": "799417193462949"
    },
    {
      "height": 405,
      "width": 720,
      "link": "https://www.facebook.com/CDAclub/photos/a.576679272389651/782931101764466/?type=3",
      "id": "782931101764466"
    },
    {
      "height": 720,
      "width": 405,
      "link": "https://www.facebook.com/CDAclub/photos/a.576679272389651/782931088431134/?type=3",
      "id": "782931088431134"
    },
    {
      "height": 720,
      "width": 480,
      "link": "https://www.facebook.com/CDAclub/photos/a.771763459547897/773143396076570/?type=3",
      "id": "773143396076570"
    },
    {
      "height": 720,
      "width": 404,
      "link": "https://www.facebook.com/photo.php?fbid=715696588501677&set=a.715696415168361&type=3",
      "id": "715696588501677"
    },
    {
      "height": 720,
      "width": 404,
      "link": "https://www.facebook.com/photo.php?fbid=715696571835012&set=a.715696415168361&type=3",
      "id": "715696571835012"
    },
    {
      "height": 720,
      "width": 404,
      "link": "https://www.facebook.com/photo.php?fbid=715696551835014&set=a.715696415168361&type=3",
      "id": "715696551835014"
    },
    {
      "height": 375,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=711399462264723&set=a.711399358931400&type=3",
      "id": "711399462264723"
    },
    {
      "height": 720,
      "width": 480,
      "link": "https://www.facebook.com/photo.php?fbid=702871423117527&set=a.702871376450865&type=3",
      "id": "702871423117527"
    },
    {
      "height": 396,
      "width": 720,
      "link": "https://www.facebook.com/photo.php?fbid=701871956550807&set=a.701871923217477&type=3",
      "id": "701871956550807"
    }
  ],
  "paging": {
    "cursors": {
      "before": "QVFIUlViTGdnX01RWjg1VXZAVVWF2YzZArOTZADNzFrNHRkQXFIZAnpkaWFraXBxWDFjUURPNXdnbGVnMW13QWNIMnQ4V2t1TlFKc1ppOUhiblhiWDVYbExTM2Jn",
      "after": "QVFIUmhtYk0yUzQ3TnRiMllZASkw0TzlXbDk5UWZAtS0xYS1ZABMzJvY09jTGtwYTVoN0UtLWpVd3RWVkZA2ZAUlTZA3RpbVNjYkFDSHlzNjNOR0FtUEYxX2dWb3RB"
    },
    "next": "https://graph.facebook.com/v3.2/2573340392737278/photos?access_token=EAAFqhQvI4voBAOoV7AzK8RSYkTn7JZA7ovAebYFw8OW5hk2lsIIX5BeAd3KnBCdb9uWqLGOGBPX2fkjhjYwKvHNiYB66IjymefXXDZCJlLYD7FJ8HYRYZAJWL4COTKA6szLYoQHQvyslhH381uSPZCVmKdjR4ahmjfGGMOuf9VpdcHrDJzp73LWlkJ5so1MZD&pretty=0&fields=height%2Cwidth%2Clink&limit=25&after=QVFIUmhtYk0yUzQ3TnRiMllZASkw0TzlXbDk5UWZAtS0xYS1ZABMzJvY09jTGtwYTVoN0UtLWpVd3RWVkZA2ZAUlTZA3RpbVNjYkFDSHlzNjNOR0FtUEYxX2dWb3RB"
  }
}
```

Ta thấy rằng, kết quả trả về là một JSON object, chứa 2 cặp `key, value` . Đó là:
* `"data"` : Ứng với key `data` , `value` của nó là một `JSON array`. Mỗi phần tử của `array` đại diện cho một bức ảnh mà `current_user`(cụ thể là mình) đã đăng trên `facebook`. 
* `"paging"`  Ứng với key `paging` , `value` của nó là một JSON object - chứa dữ liệu của `phần tử phân trang`. Tại sao nó lại xuất hiện ở đây? Lý do là vì số lượng ảnh mà mình đã post lên facebook chắc chắn không dưới 1000, thế nên việc trả về toàn bộ 1000 object vào một JSON object là không khả thi. Việc phân trang là mặc định với hầu hết các `response` phải trả về nhiều phần tử (số lượng mặc định là 50 phần tử trên 1 trang) . Về paging, bạn có thể đọc thêm về nó ở phần cuối của [tài liệu này](https://developers.facebook.com/docs/graph-api/using-graph-api/) . Điều mà mình cần bạn quan tâm trong phần tử `paging` này là nó thường có một key `next`, chứa **lời gọi api** để đi đến trang tiếp theo , và nó cũng có một key `previous` với vai trò tương tự.

Nếu bạn muốn giới hạn số lượng phần tử trả về trong 1 trang khi lấy ra dữ liệu của một `edge` , có thể dùng cú pháp như sau để thực hiện **lời gọi api** :
```
https://graph.facebook.com/me?fields=photos.limit(5)
```
Lời gọi bên trên cũng tương tự với lời gọi `https://graph.facebook.com/me/photos` , chỉ khác ở chỗ, mỗi trang nó trả về 5 một mảng 5 phần tử trên một trang, thay vì 50 phần tử như mặc định. Cùng xem kết quả:
```
{
  "data": [
    {
      "created_time": "2019-02-26T09:45:44+0000",
      "id": "357627218176517"
    },
    {
      "created_time": "2019-02-01T00:56:51+0000",
      "name": "Hem 1 ai. :D",
      "id": "346464872626085"
    },
    {
      "created_time": "2015-10-31T08:31:23+0000",
      "id": "934377109966956"
    },
    {
      "created_time": "2015-10-31T08:31:20+0000",
      "id": "934377009966966"
    },
    {
      "created_time": "2015-10-11T11:17:31+0000",
      "name": "Cảm ơn tất cả các bạn đã đến với buổi casting mặc dù thời tiết có hơi lạnh và mưa 😝 Hơi tiếc một chút vì trong ảnh không có đông đủ tất cả các bạn ngày hôm nay :(

Kết quả sẽ được thông báo trên fanpage của chúng mình. Rất sớm thôi ;) Mọi người hãy cùng theo dõi để biết ai sẽ trở thành thế hệ tiếp theo của N.C Team nhé ;) Và đừng quên đón chờ sản phẩm mới của chúng mình nha >:D<",
      "id": "823635807735176"
    }
  ],
  "paging": {
    "cursors": {
      "before": "QVFIUlViTGdnX01RWjg1VXZAVVWF2YzZArOTZADNzFrNHRkQXFIZAnpkaWFraXBxWDFjUURPNXdnbGVnMW13QWNIMnQ4V2t1TlFKc1ppOUhiblhiWDVYbExTM2Jn",
      "after": "QVFIUkMzeEZAJNjdlZA0t6RDFTalJjbV96NkxyMzAyQldsZAkdXSC1aWmVEelpzODVkZAjBwQjRTdjBsWGdCeXpTNDltamZAMZAXRNOENWbEQzWTdjeWVGQUlfUmV3"
    },
    "next": "https://graph.facebook.com/v3.2/2573340392737278/photos?access_token=EAAFqhQvI4voBAGgzLqZCg7DH6t7s5GHItl5VZAsikXc23905TEfoE8RdXWB9SuiaIcImYOAoAWCUQ6sG5PI20pbhi4YXkBHwwdPpnk01Xy2osmxvlPNZCwkFSXG40FKiEqKTMyGrul47sPYg0WasEhvHX77KZAPAysrN4dDPn3j5vLht5x3uf1aQ66vCVqsZD&pretty=0&limit=5&after=QVFIUkMzeEZAJNjdlZA0t6RDFTalJjbV96NkxyMzAyQldsZAkdXSC1aWmVEelpzODVkZAjBwQjRTdjBsWGdCeXpTNDltamZAMZAXRNOENWbEQzWTdjeWVGQUlfUmV3"
  }
}
```

Đấy là cơ bản về khả năng `GET` dữ liệu của `facebook graph-api` . Chức năng `GET` này nếu chỉ dùng trên `explorer-tools` thì có vẻ hơi vô dụng, vì chẳng ai đọc mấy cái dữ liệu vớ vẩn ấy để làm gì. Vậy câu hỏi đặt ra là:
> Lợi ích thực tế của chức năng GET dữ liệu qua API này là gì?

Câu trả lời là khi chúng ta tích hợp chức năng này vào một **app** thực tế, thì bạn sẽ thấy được công dụng thực sự của nó. Ví dụ, chúng ta có một app hẹn hò như `Tinder` chẳng hạn. Với dữ liệu về `quê quán, vị trí, tuổi tác và giới tính` của bạn đã đăng ký trên `facebook`, Tinder sẽ sử dụng dữ liệu này để tính toán ghép cặp cho bạn với các account phù hợp. Hoặc có một số app sẽ lấy thông tin về `nghề nghiệp` và `các vấn đề bạn quan tâm` để nó đặt quảng cáo cho phù hợp, giả sử bạn là một `web developer` thì nó sẽ đặt quảng cáo trên các video bạn click vào về những thứ liên quan như `khóa học sql `, `sách javascript` , `bàn phím cơ gõ code sướng tay` , `giấy ăn`, ..... Đấy nói chung với dữ liệu GET về được từ `facebook-graph-api` bạn có thể một số việc hay ho.

### 7. Chức năng CREATE 
Bạn có thể create một `node` nào đó(nếu được cho phép) như một bài` post`, một `comment`, một chiếc `like` bằng việc sử dụng **lời gọi api** . Ví dụ, mình sẽ tạo một bài post mới trên newsfeed của một page do mình quản lý bằng **lời gọi api** như sau:
```
POST /
https://graph.facebook.com/{your-page-id}/feed
    ?message=Hieu dep trai
    &access_token={your-page-access-token}
```
Để tạo được **lời gọi api** này, bạn phải lấy được một cái `page_access_token` , câu chuyện này khá đơn giản khi làm trên `explorer-tool`, bạn chỉ cần thay đổi lựa chọn trên thanh `sidebar ` phần "Người dùng hoặc trang":

![](https://images.viblo.asia/1da7fb4d-4ff0-4dbd-b9ec-9439398662c8.png)

Như các bạn thấy, mình đã đổi nó thành tên trang của mình `TRouble H` , giờ để lấy `page_access_token` bạn chỉ cần ấn vào nút `Get Access Token` ở bên dưới là được. 

Tiếp theo, bạn để ý trong lời gọi bên trên, mình có để `field` `?message=Hieu dep trai` , trường này lưu nội dung bài post mà chúng ta muốn tạo. Sau khi thực hiện xong lời gọi thì `response` trả về như thế này:
```
{
  "id": "2779270585446576_2793488410691460"
}
```
`response` trả về là một `JSON object` chứa `id` của bài` post` chúng ta vừa tạo (đọc kỹ các response là phần khá quan trọng, nó liên quan đến logic của các hàm mà mình sẽ viết ở part 2) .  Và thử lên tường của page nhà mình xem xem nhé:

![](https://images.viblo.asia/fed5cdfc-d042-4d93-8f5a-58fb29f0e970.png)

Đến đây các bạn sẽ tự hỏi, tại sao mình không tạo luôn `post` lên  tường nhà mình cho dễ, đỡ phải lấy `page_access_token` ? Hehe, mình và sếp mình cũng muốn làm điều đấy lắm, mình lên youtube xem tutorial thấy tháng 12 năm 2018 người ta vẫn còn làm được trò đấy, tuy nhiên bây giờ thì không được. Không tin bạn cứ thử với lời gọi API như thế này:
```
POST /
https://graph.facebook.com/me/feed
    ?message=Hieu dep trai
    &access_token={your-user-access-token}
```
Response trả về sẽ như này:
```
{
  "error": {
    "message": "(#200) If posting to a group, requires app being installed in the group, and \
          either publish_to_groups permission with user token, or both manage_pages \
          and publish_pages permission with page token; If posting to a page, \
          requires both manage_pages and publish_pages as an admin with \
          sufficient administrative permission",
    "type": "OAuthException",
    "code": 200,
    "fbtrace_id": "HY1s2P8QrId"
  }
}
```

Hy vọng trong tương lai gần, chúng ta sẽ lại làm được cái trò này. Ngoài ra, mình đã thử tạo `comment `và `like` bằng **api request** , nhưng vẫn chỉ có thể làm với `page` chứ chưa thể làm với `user` . Cách tạo `comment` và `like`,  `album` mới thông qua node `page` cũng tương tự với việc tạo `post` thôi. Các bạn tự tìm hiểu nhé. Nếu không tìm hiểu thì có thể xem part-2 của mình, mình sẽ làm lại đầy đủ các chức năng này bằng `gem koala` . Giờ thì đến với chức năng tiếp theo.

### 8. Chức năng UPDATE
Chức **EDIT/UPDATE** so với chức năng **CREATE** khá tương đồng với nhau về mặt cú pháp. Giả sử mình muốn sửa cái `post` mà mình vừa mới tạo ở ví dụ của chức năng **CREATE**, thì mình có thể sử dụng cú pháp như sau:

```
POST \
  "https://graph.facebook.com/{your-page-post-id}
    ?message=Sua lai ne
    &access_token={your-page-access-token}"
```

chúng ta dễ dàng lấy được id của bài post muốn sửa ở bên trên là `id": "2779270585446576_2793488410691460` , và cùng xem `response` trả về:

```
{
  "success": true
}
```
Kết quả trả về trên tường nhà mình:

![](https://images.viblo.asia/e2ef6b19-1b68-43fb-8d63-27a0ef53aad2.png)

Ta thấy `response` trả về ở bên trên có vẻ hơi không có ích lắm, nếu chúng ta muốn thay đổi nó, chỉ cần thêm một parameter `fields` vào **lời gọi api** ban đầu như thế này:

```
POST \
  "https://graph.facebook.com/{your-page-post-id}
    ?message=Sua lai lan 2 ne&fields=message,id
    &access_token={your-page-access-token}"
```
Và cùng xem kết quả:

```
{
  "message": "Sua lai lan nua ne",
  "id": "2779270585446576_2793488410691460"
}
```
Việc thêm `fields` chỉ định vào response trả về sau lời gọi **EDIT/UPDATE** được facebook định nghĩa là chức năng **Read-After-Write** . Các bạn sẽ thấy chức năng này rất hữu dụng khi mình xử lý `redirect` cho `rails app` của mình ở part 2. Giờ thì chúng ta cùng đến với chức năng cuối cùng của bài viết ngày hôm nay.

### 9. DELETE
Chức năng này rất đơn giản, nó y hệt chức năng **EDIT/UPDATE** , chỉ đơn giản là bạn thay method **POST** bằng method **DELETE** , và **DELETE** thì chẳng có fields message nào cả.

```
DELETE \
  "https://graph.facebook.com/{your-page-post-id}
   ?fields=message,id
    &access_token={your-page-access-token}"
```
`response` của hành động **DELETE** cũng giống với **EDIT/UPDATE** .
```
{
  "success": true
}
```
Và đồng thời, **Read-After-Write** cũng hỗ trợ cho chức năng **DELETE** . 

### 10. Multiple ids READ Request (Advanced use)
Từ đầu bài viết đến giờ, chúng ta mới chỉ thực hiện bộ các chức năng **CRUD** liên quan đến 1 `node `hoặc 1 `edge`. Câu hỏi đặt ra bây giờ là: 
> Liệu chúng ta có thể sử dụng **chỉ một câu truy vấn**, nhưng lại thực hiện hành động với nhiều `node` hoặc nhiều `edge` khác nhau?

Qua việc đọc tài liệu về [Advance use](https://developers.facebook.com/docs/graph-api/advanced) của `facebook-graph-api` cập nhật mới nhất đến ngày 24/02/2019, thì đây là **câu trả lời của mình** : 
> Điều đó là hoàn toàn có thể với hành động **READ** ( còn các hành động khác thì mình hem biết) :) . Giải pháp là sử dụng một `function` , được `facebook` đặt tên là `multiple id lookup` .

Việt sử dụng `multiple id lookup` với nhiều `node` được thực hiện với cú pháp **lời gọi api** như sau:
```
GET graph.facebook.com
  /?ids={node-1-id},{node-2-id},.....
```
Ví dụ, mình muốn` GET` về dữ liệu của 2 `node` `me` và `platform` . Cùng xem `response` trả về:
```
{
  "me": {
    "name": "Hiếu Hoàng Trọng",
    "id": "2573340392737278"
  },
  "platform": {
    "name": "Facebook for Developers",
    "id": "19292868552"
  }
}
```
Mình không cần phải giải thích về `response` này nữa đúng không. Nó khá là rõ ràng rồi. 

Tiếp theo, nếu bạn muốn GET về dữ liệu của cùng một `edge`trên nhiều `node` khác nhau. Bạn có thể sử dụng cú pháp sau: 
```
GET graph.facebook.com
  /{edge}?ids={node-1-id},{node-2-id},.....
```
Điều kiện ở đây là `edge` đó **phải tồn tại trên tất cả các** node được gọi. Ví dụ, mình muốn lấy về dữ liệu của `edge` `/photos` trên 2 node : `me` và `2779270585446576`(page mà mình làm admin) thì tất nhiên là sẽ lấy được.
```
GET graph.facebook.com
  /photos?ids=me,2779270585446576
```
Kết quả trả về:
```
 {
  "me": {
    "data": [
      {
        "created_time": "2019-02-26T09:45:44+0000",
        "id": "357627218176517"
      },
      {
        "created_time": "2019-02-01T00:56:51+0000",
        "name": "Hem 1 ai. :D",
        "id": "346464872626085"
      },
      {
        "created_time": "2015-10-31T08:31:23+0000",
        "id": "934377109966956"
      },
      {
        "created_time": "2015-10-31T08:31:20+0000",
        "id": "934377009966966"
      },
      {
        "created_time": "2015-10-11T11:17:31+0000",
        "name": "Cảm ơn tất cả các bạn đã đến với buổi casting mặc dù thời tiết có hơi lạnh và mưa 😝 Hơi tiếc một chút vì trong ảnh không có đông đủ tất cả các bạn ngày hôm nay :(

Kết quả sẽ được thông báo trên fanpage của chúng mình. Rất sớm thôi ;) Mọi người hãy cùng theo dõi để biết ai sẽ trở thành thế hệ tiếp theo của N.C Team nhé ;) Và đừng quên đón chờ sản phẩm mới của chúng mình nha >:D<",
        "id": "823635807735176"
      },
      {
        "created_time": "2014-10-13T02:02:14+0000",
        "name": "Dù năm này qua năm khác, Chúng ta đều không thể quên nổi khoảnh khắc thử thách bản thân, trải qua 3 vòng thi tuyển và chính thức trở thành 1 CDAer <3
Những gương mặt này, những nụ cười này... Các bạn còn nhớ? :3
--------------------------------------------
From: Vòng 3- Teamwork
Tuyển thành viên D14 :3",
        "id": "779773208746922"
      },
      {
        "created_time": "2015-08-13T15:58:12+0000",
        "name": "Sắp tới thì có chương trình \"Tôi yêu Tổ quốc tôi\" do Thành Đoàn HN tổ chức, nhằm chào mừng quốc khánh 2-9 với sự tham gia của 15.000 sinh viên trên địa bàn Hà Nội. 
Trường mình đăng kí 500 sinh viên, vì vậy, hy vọng mọi người sẽ tham gia chương trình, vì đây là một sự kiện rất lớn, bổ ích, có ý nghĩa và thú vị, sẽ giúp các bạn có thêm nhiều trải nghiệm mới mẻ :)
Xin cảm ơn!

Thông tin chi tiết:
- Chương trình Điểm hẹn Thanh niên: \"Tôi yêu Tổ quốc tôi\"
- Đơn vị tổ chức: Thành đoàn Hà Nội
- Thời gian: 7h30 - 16h ngày 30/8/2015
- Địa điểm: Sân vận động Mỹ Đình
- Nội dung: Tham dự hát quốc ca, đoàn ca, xếp hình cờ Đảng, cờ Tổ quốc,... 
- Lịch luyện tập dự kiến các ngày 15,16,17/8/2015 tại trường ĐH Hà Nội, sau đó tham gia tổng duyệt tại SVĐ Mỹ Đình theo lịch chung của BTC
- Quyền lợi:

+ Giao lưu và kết bạn với sinh viên trong trường và các trường đại học trên địa bàn Hà Nội
+ Được hỗ trợ chi phí (ăn uống, sức khỏe,...)
+ Cơ hội lên TV
+ Góp phần thể hiện hình ảnh sinh viên PTIT năng động, nhiệt tình với các trường khác và Thành đoàn HN

- Đăng ký trước 20h ngày 14/8/2015 

- Điền form đăng ký: 
1.Họ tên: 
2.Lớp:
3.SĐT: 

Mọi người gửi vào hòm mail: dangkien9294@gmail.com
===> Ai có thắc mắc gì xin liên hệ với: Nguyễn Đăng Kiên . 
Tel: 0987332394 \"",
        "id": "942785635779011"
      },
      {
        "created_time": "2015-08-11T13:34:13+0000",
        "id": "941506222573619"
      },
      {
        "created_time": "2015-04-06T01:00:00+0000",
        "name": "[VINAPHONE-KHÔNG NGỪNG VƯƠN XA]]
Các bạn hãy cùng chờ đón và cổ vũ cho team chúng mình nhé!",
        "id": "878596412197934"
      },
      {
        "created_time": "2015-02-23T02:01:18+0000",
        "id": "811409148930420"
      },
      {
        "created_time": "2015-02-23T02:01:01+0000",
        "id": "811409018930433"
      },
      {
        "created_time": "2015-02-23T02:01:00+0000",
        "id": "811409012263767"
      },
      {
        "created_time": "2015-02-23T02:00:07+0000",
        "id": "811408745597127"
      },
      {
        "created_time": "2015-02-23T01:59:53+0000",
        "id": "811408605597141"
      },
      {
        "created_time": "2015-02-23T01:59:43+0000",
        "id": "811408545597147"
      },
      {
        "created_time": "2015-02-09T06:39:55+0000",
        "id": "847630311961211"
      },
      {
        "created_time": "2015-01-31T15:12:36+0000",
        "name": "Đang vui.. đổi ava phát....
Thằng trong ảnh là \"Hiếu\" ko phải Ruốc... :3",
        "id": "799417193462949"
      },
      {
        "created_time": "2014-10-18T03:41:47+0000",
        "id": "782931101764466"
      },
      {
        "created_time": "2014-10-18T03:41:47+0000",
        "id": "782931088431134"
      },
      {
        "created_time": "2014-10-01T15:40:24+0000",
        "id": "773143396076570"
      },
      {
        "created_time": "2014-08-30T12:52:39+0000",
        "id": "715696588501677"
      },
      {
        "created_time": "2014-08-30T12:52:38+0000",
        "id": "715696571835012"
      },
      {
        "created_time": "2014-08-30T12:52:36+0000",
        "id": "715696551835014"
      },
      {
        "created_time": "2014-08-22T13:58:30+0000",
        "name": "Ruốc là người có phong cách thực tiễn và truyền thống.Anh ấy ko quan tâm nhiều đến lý thuyết mà chỉ tin tưởng những ví dụ thực tiễn.Anh ấy là 1 người chăm chỉ và có tư chất lãnh đạo.....
(Ruốc của Google đấy m.n ạ.. :v
Cơ mà cũng khá giống Ruốc của ngoài đời...)",
        "id": "711399462264723"
      },
      {
        "created_time": "2014-08-05T09:23:50+0000",
        "id": "702871423117527"
      }
    ],
    "paging": {
      "cursors": {
        "before": "QVFIUlViTGdnX01RWjg1VXZAVVWF2YzZArOTZADNzFrNHRkQXFIZAnpkaWFraXBxWDFjUURPNXdnbGVnMW13QWNIMnQ4V2t1TlFKc1ppOUhiblhiWDVYbExTM2Jn",
        "after": "QVFIUlMzM1FNeS1vUGpvc09yRE0zbWd6STdGa0RiTVpqdFhXVVExXzFpMUJBYW9LQW10elBvWEhXcUZAmUmxKMnJGVGlKR0cwNngtUzdaMXRSZAHVxNEIxM05B"
      },
      "next": "https://graph.facebook.com/v3.2/2573340392737278/photos?access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&pretty=0&limit=25&after=QVFIUlMzM1FNeS1vUGpvc09yRE0zbWd6STdGa0RiTVpqdFhXVVExXzFpMUJBYW9LQW10elBvWEhXcUZAmUmxKMnJGVGlKR0cwNngtUzdaMXRSZAHVxNEIxM05B"
    }
  },
  "2779270585446576": {
    "data": [
      {
        "created_time": "2019-03-19T06:37:40+0000",
        "id": "2779272488779719"
      },
      {
        "created_time": "2019-03-19T06:36:48+0000",
        "id": "2779271298779838"
      },
      {
        "created_time": "2019-03-19T06:36:31+0000",
        "id": "2779270662113235"
      }
    ],
    "paging": {
      "cursors": {
        "before": "QVFIUktoNjB6V25GSzF0akxsYmpJRVFGWDM2TzdIcHc5b09TRzEtS1JmWjNkUXdXRWU2VjdDc3A0bWhIWDNQQmRzdnp3WGQ2U3A4OFppMVB5aUNiVlVUNktB",
        "after": "QVFIUndURnV0T1ZAHMG5rNzU1YmVvYmRONWc4UXZASZAXMtemVKMTVxcmpfSjJfTEN6bkVKbkdRV3dSYmtfaEhwRGIydGMzYWJsN1pmQVQ1OVgzZA2N5UE1BTS13"
      }
    }
  }
 ```
 
 `response` trả về 2 JSON object chứa dữ liệu đại diện cho toàn bộ các file ảnh mà **mình** và **page của mình** đã up lên. Bạn hoàn toàn có thể giới hạn số phần tử trả về bằng hàm `.limit` như mình đã nói ở phần về **chức năng READ** , cú pháp như sau:

```
GET graph.facebook.com
  /?ids=me,2779270585446576&fields=photos.limit(2)
```
Kết quả trả về nhẹ nhàng hơn rất nhiều:

```
{
  "me": {
    "photos": {
      "data": [
        {
          "created_time": "2019-02-26T09:45:44+0000",
          "id": "357627218176517"
        },
        {
          "created_time": "2019-02-01T00:56:51+0000",
          "name": "Hem 1 ai. :D",
          "id": "346464872626085"
        }
      ],
      "paging": {
        "cursors": {
          "before": "QVFIUlViTGdnX01RWjg1VXZAVVWF2YzZArOTZADNzFrNHRkQXFIZAnpkaWFraXBxWDFjUURPNXdnbGVnMW13QWNIMnQ4V2t1TlFKc1ppOUhiblhiWDVYbExTM2Jn",
          "after": "QVFIUnQ5TEtxMlh2NjllVHBMYlZAIYkNZAbDlkZA0lQYm1RVmpXNEdCNmdFaGg1M2VoVzZALWjhBWUVZATG4yVGlRQXR6eWd0TW1pT2tKVllSQlBGQXpNODhrdUpR"
        },
        "next": "https://graph.facebook.com/v3.2/2573340392737278/photos?access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&pretty=0&limit=2&after=QVFIUnQ5TEtxMlh2NjllVHBMYlZAIYkNZAbDlkZA0lQYm1RVmpXNEdCNmdFaGg1M2VoVzZALWjhBWUVZATG4yVGlRQXR6eWd0TW1pT2tKVllSQlBGQXpNODhrdUpR"
      }
    },
    "id": "2573340392737278"
  },
  "2779270585446576": {
    "photos": {
      "data": [
        {
          "created_time": "2019-03-19T06:37:40+0000",
          "id": "2779272488779719"
        },
        {
          "created_time": "2019-03-19T06:36:48+0000",
          "id": "2779271298779838"
        }
      ],
      "paging": {
        "cursors": {
          "before": "QVFIUktoNjB6V25GSzF0akxsYmpJRVFGWDM2TzdIcHc5b09TRzEtS1JmWjNkUXdXRWU2VjdDc3A0bWhIWDNQQmRzdnp3WGQ2U3A4OFppMVB5aUNiVlVUNktB",
          "after": "QVFIUkdpRHBCTXJtZAUN6RW5xSzZAuTHhVbXJOM05HNGgteTMwRXhOYW41UXRWNWRxRWpVQlJkSmh1cUJ4N3RtZAVVoUHBndlU2dHlpOTVhcy1ILUl5aHlrOER3"
        },
        "next": "https://graph.facebook.com/v3.2/2779270585446576/photos?access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&pretty=0&limit=2&after=QVFIUkdpRHBCTXJtZAUN6RW5xSzZAuTHhVbXJOM05HNGgteTMwRXhOYW41UXRWNWRxRWpVQlJkSmh1cUJ4N3RtZAVVoUHBndlU2dHlpOTVhcy1ILUl5aHlrOER3"
      }
    },
    "id": "2779270585446576"
  }
}
```

Bây giờ mình thử lấy về dữ liệu của `edge` `accounts`( đại diện cho các `page` mà `node` đó có quyền `admin` ) của cùng 2 `node` như ví dụ bên trên, chúng ta cùng xem kết quả:
```
GET /accounts?ids=me,2779270585446576

//response:
{
  "error": {
    "message": "(#100) Tried accessing nonexisting field (accounts) on node type (Page)",
    "type": "OAuthException",
    "code": 100,
    "fbtrace_id": "CAHLWRJ7tIn"
  }
}
```
`response` trả về một lỗi, nói rằng `edge /accounts` **không tồn tại** trên `node` dạng page ( cụ thể ở đây là `node 2779270585446576` ) .

Miễn là `edge` đó **tồn tại** trên các `node ` được gọi, các bạn có thể GET về dữ liệu của `nhiều edge` trên `nhiều node` khác nhau với cú pháp tổng quát:
```
GET graph.facebook.com
  /?ids={node-1-id},{node-2-id},.....&fields={edge-1},{edge-2},.....
```
Các bạn hoàn toàn có thể chỉ định thêm các `fields` mà bạn muốn trả về ở trong `parameter fields` . 
Như vậy tóm lại, chúng ta có thể dùng `function` `multiple ids lookup` để `GET` về dữ liệu của nhiều `edge` trên nhiều `node`, **chỉ trong 1 câu truy vấn duy nhất.** . 

###  11. Nested request
Nested request là một kỹ thuật để mở rộng các kết quả trả về trong một **lời gọi api** . Cú pháp tổng quát của nó như sau:
```
GET graph.facebook.com
  /{node-id}?
    fields=<first-level>{<second-level>}
```

Các `<first-level>`, `<second-level>` ở đây có thể là nhiều `edge ` hoặc `fields` được tách nhau bởi dấu phẩy. Ví dụ:
 
```
GET graph.facebook.com
  /me?
    fields=albums.limit(5){name, photos.limit(2)},posts.limit(5)
```
Với lời gọi trên, bạn sẽ lấy về được dữ liệu từ edge `albums` và edge `posts` của `node` `me`. Các trường trả về trong edge `posts` sẽ là mặc định, còn trong `edge` `albums` sẽ là field `name,id ` và edge `photos` ứng với mỗi phần tử của mảng `albums`. Cùng xem kết quả trả về:

```
{
  "albums": {
    "data": [
      {
        "name": "Timeline Photos",
        "photos": {
          "data": [
            {
              "created_time": "2019-03-16T14:01:01+0000",
              "id": "2570105363060781"
            },
            {
              "created_time": "2019-03-07T01:51:41+0000",
              "name": "Định mệnh ở đây rồi mà vẫn có HR vào chèo kéo đi làm. :)))
Inbox các thứ luôn. Giờ e mới hỉu nỗi khổ của các chị HR.",
              "id": "2552120108192640"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MjU3MDEwNTM2MzA2MDc4MQZDZD",
              "after": "MjU1MjEyMDEwODE5MjY0MAZDZD"
            },
            "next": "https://graph.facebook.com/v3.2/345985502139456/photos?access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&pretty=0&limit=2&after=MjU1MjEyMDEwODE5MjY0MAZDZD"
          }
        },
        "id": "345985502139456"
      },
      {
        "name": "Cover Photos",
        "photos": {
          "data": [
            {
              "created_time": "2019-03-14T02:16:21+0000",
              "id": "2565097440228240"
            },
            {
              "created_time": "2018-09-17T11:08:23+0000",
              "name": "Ngày training đầu tiên và tôi đã thấm nhuần tư tưởng của bác Hồ Chí Ri$m",
              "id": "2209380915799896"
            }
          ],
          "paging": {
            "cursors": {
              "before": "MjU2NTA5NzQ0MDIyODI0MAZDZD",
              "after": "MjIwOTM4MDkxNTc5OTg5NgZDZD"
            },
            "next": "https://graph.facebook.com/v3.2/346346385436701/photos?access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&pretty=0&limit=2&after=MjIwOTM4MDkxNTc5OTg5NgZDZD"
          }
        },
        "id": "346346385436701"
      }
    ],
    "paging": {
      "cursors": {
        "before": "MzQ1OTg1NTAyMTM5NDU2",
        "after": "MzQ2MzQ2Mzg1NDM2NzAx"
      },
      "next": "https://graph.facebook.com/v3.2/2573340392737278/albums?access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&pretty=0&fields=name%2C+photos.limit%282%29&limit=2&after=MzQ2MzQ2Mzg1NDM2NzAx"
    }
  },
  "posts": {
    "data": [
      {
        "message": "pùm.
",
        "created_time": "2019-03-25T10:10:54+0000",
        "id": "2573340392737278_2588183847919599"
      },
      {
        "message": "Viblo hay lỗi server đúng lúc mình save thế nhỉ. =_=",
        "created_time": "2019-03-24T09:00:38+0000",
        "id": "2573340392737278_2586035134801137"
      }
    ],
    "paging": {
      "previous": "https://graph.facebook.com/v3.2/2573340392737278/posts?format=json&limit=2&since=1553508654&access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&__paging_token=enc_AdBRWGJVIapZCgG1ZArPR00CQTqxvfDUgZBfAObnrXG15LwBxzIGy7ZB3NK6CLHREuhzRkhFkzU3CFSjeSCd8jTmNuf1VwJdOTlxPsbL9uFrZAZAbbwgZDZD&__previous=1",
      "next": "https://graph.facebook.com/v3.2/2573340392737278/posts?format=json&limit=2&access_token=EAAFqhQvI4voBAABvH9eneOOMJfbqOrjFj8oG05NR4ZAqg1gFmmfZBFLkX1jZC5xwqhReMaVhOjZAsNMPMSJ2BmJUJhitrGMKVIkRKAOpq5bn4j5ZC7p6xBHQNtZCxrBGrJh3bZAUhPlCV4ckXrTrDId16CUBaeMiL7JPzu4xsqcx3tgCWDi59lVqeAszxuwkFx27hv3xWz1otgtgYTcR1njKg8kn1iaxrJ86QmJch965gZDZD&until=1553418038&__paging_token=enc_AdBox4EnnARlScenKApXSyg467hdB5WsaNFL7Bp8k8RxL7g9tmiDSrMjiGOZBCVc7L5aPP339n425wFAjdzGaFfGAH2F4EI5Fa3uMKYpw9a7GFgZDZD"
    }
  },
  "id": "2573340392737278"
}
```

Đó là tất cả những gì mình hiểu về chức năng **Nested Request**.

### 12. Kết của part 1.

Như thế là mình đã giải thích xong các chức năng cơ bản của `facebook-graph-api` qua việc sử dụng `facebook-explorer-tools` . Tuy nhiên `explorer-tools`  như đúng tên gọi của nó, chỉ dùng để chúng ta **khám phá** các chức năng của `graph- API`. Trong thực tế, khi viết chức năng cho apps, chúng ta sẽ không sử dụng `facebook-explorer-tools`. Vậy làm sao để tích hợp `graph-api` vào `app` thực tế, hãy cùng chờ part-2 của bài viết với tựa đề:
> Sử dụng `gem koala ` để tích hợp `facebook-graph-api` vào rails app.

Bài viết của mình còn nhiều thiếu xót do giới hạn về mặt trình độ, rất mong nhận được ý kiến phản hồi từ tất cả các bạn. Còn bây giờ thì tạm piệt. ahihi.

-----

References:

Using graph-api: https://developers.facebook.com/docs/graph-api/using-graph-api/

What is an api?: https://www.mulesoft.com/resources/api/what-is-an-api