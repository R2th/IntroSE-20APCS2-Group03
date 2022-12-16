Ở part lần trước, mình đã giới thiệu các kỹ thuật cơ bản mà tài liệu [facebook-graph-api](https://developers.facebook.com/docs/graph-api/using-graph-api/) cung cấp gồm : `READ/CREATE/UPDATE/DELETE `với các `nodes` và `edges` , `Read after write` , `Multiple ids lookup` , `Nested request` . 

Ở bài viết lần này, có 2 nội dung chính mà mình sẽ làm:
* Mình sẽ tích hợp `facebook-graph-api` vào trong `app` của mình và chỉ cho các bạn **cách sử dụng** các chức năng kể trên bằng `code Ruby`, thay vì dùng `tool explorer` như ở [part 1](https://viblo.asia/p/rails-question-sep-chu-part1-em-lam-cho-anh-cai-demo-de-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj). 
* Ngoài các chức năng kể trên, mình sẽ giới thiệu thêm 1 chức năng nâng cao: `batch-api-request` . Chức năng này cần thao tác khá rườm rà khi thực hiện trên `tool explorer`, vì vậy mình cố ý để nó được giới thiệu ở part-2 cho dễ hiểu. Đối với mình, `batch-api-request` là một chức năng **rất quyền lực**. Mình sẽ sử dụng nó để làm 1 cái app khá thú vị ở part 3. 

Bây giờ chúng ta cùng đi từng bước để tích hợp `facebook-graph-api` vào một cái `rails app` bất kỳ. Thông qua cái `rails app` đó, chúng ta có thể làm được những việc dưới đây có liên quan đến `facebook` :
* Đăng nhập `rails app` bằng facebook (Qua chức năng này, app cần lấy về được `access_token` và lưu nó vào `database` như 1 thuộc tính của `user` .)
* Publish 1 chiếc post lên trang fanpage mà **user sử dụng app** có quyền `admin`
* Edit chiếc post đó.
* Delete chiếc post đó.
* Đồng thời like, và tạo nhiều comment lên chiếc post đó. **(Batch-api-request)**

### 1. Tạo và cài đặt app trên trang Facebook for developer
Bây giờ giả sử các bạn đã có phần `code` của một cái `rails app` ở máy local của chính mình rồi. Việc các bạn cần làm là đăng ký và cài đặt nó trên trang [facebook for developer](https://developers.facebook.com) . Mình đã nói về cách đăng ký nó ở bài lần trước nên lần này mình sẽ nói về việc cài đặt một vài tham số cần thiết. 
Đầu tiên, trong phần thông số cơ bản, bạn hãy cài đặt tên miền ứng dụng của bạn. 

![](https://images.viblo.asia/927a9104-4d7e-446e-bf07-3d70fc4c0b98.png)

Nếu bạn chỉ đang để `rails app` trong trạng thái `development`, bạn có thể để tên miền là `http://0.0.0.0:3000/` cũng được. Nhưng sẽ có một vài điều hay ho sẽ xảy ra, và mình sẽ tiết lộ những điều ấy vào thời điểm khiến bạn dễ hiểu nhất. 

Tiếp theo, bạn cần kích hoạt tính năng **Đăng nhập facebook** ở phần **bảng điều khiển** bằng cách click vào nút **thiết lập**  :

![](https://images.viblo.asia/5eb2e086-8e9a-4a0e-bd78-58d16b821ca2.png)

Sau đó, ở trong cửa sổ hiện lên, bạn chỉ cần cài đặt và save cái tên miền trang web cho mình là được, đừng làm những bước đằng sau:

![](https://images.viblo.asia/665b1b46-fa85-4c6f-8c93-ab1c264ffcc1.png)

Ok, thế là xong, giờ chúng ta có thể bắt đầu code chức năng đăng nhập facebook.

### 2. Đăng nhập bằng facebook(thủ công)
Bây giờ, mình sẽ làm chức năng đăng nhập `app` của mình thông qua `facebook `, mục đích là để gửi các yêu truy nhập thông tin ( `permissions` ) cho phía `user` và lấy về `access_token` . Toàn bộ quá trình sẽ diễn ra theo flow thế này:

![](https://images.viblo.asia/226087a9-6c18-41dd-807a-1eaa2acb20e6.png)

Lúc đầu, mình định sử dụng `gem omniauth` để thực hiện chức năng nói trên. Tuy nhiên, sau khi tìm hiểu về cách [đăng nhập thủ công qua facebook](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow?locale=vi_VN) , mình cảm thấy nó có lợi hơn cho bài viết lần này ở 2 điểm:
* Thứ nhất, so với việc sử dụng `gem omniauth` , **mình thấy** việc cấu hình [thủ công](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow?locale=vi_VN) **đơn giản** và **dễ sửa đổi** hơn.
* Thứ hai, khi sử dụng `gem omniauth` , mình không thực sự hiểu được flow của quá trình đăng nhập `facebook` như mình đã vẽ ở trên. Vì vậy, nếu phải sử dụng một ngôn ngữ `backend` khác như `PHP`hoặc `Java` , mình sẽ không code được chức năng này.

Vì vậy , mình quyết định sẽ làm chức năng này theo **cách thủ công**. 

Bước đầu tiên, muốn tạo chức năng đăng nhập, chúng ta phải có 1 cái button `Sign in with facebook` để mà click vào. Cái `button` ấy đại loại được `code` như thế này:
```Ruby
<%= link_to "Sign in with facebook", %q(https://www.facebook.com/v3.2/dialog/oauth?client_id=#{your_app_id]}&scope#{your_app_permissions}&redirect_uri=#{redirect_uri}"), class:  "btn btn-primary"%>
```

Như các bạn đã thấy, để cái `button` trên hoạt động, chúng ta cần 3 **tham số quan trọng** :
* `client_id` : app_id đăng ký trên trang `facebook for developers` của bạn.
* `scope` : Các `permissions` mà `app` của bạn muốn yêu cầu từ `user` .
* `redirect_uri` : Sau khi quá trình user xác nhận cấp các `permissions` kết thúc tại trang ủy quyền của `facebook` ,  trình duyệt sẽ chuyển về một đường dẫn khác (thường là chuyển về đường dẫn đến `app` của bạn) và đường dẫn này chính là `redirect_uri`.

Lưu ý, để `button` `Sign in with facebook` **hoạt động**, chúng ta bắt buộc phải có 2 tham số: `client_id` và `redirect_uri` . Tham số `scope` là không bắt buộc, tuy nhiên nó vẫn rất quan trọng vì nó liên quan trực tiếp đến **quyền hạn về các loại dữ liệu** mà `app` của chúng ta có thể sử dụng.

Mình sẽ đi vào cách để lấy từng tham số một. Đầu tiên là `clien_id` . Trước hết các bạn phải đăng ký `app` của mình trên trang [facebook for developer](https://developers.facebook.com/)  như ở [part 1](https://viblo.asia/p/rails-question-sep-chu-part1-em-lam-cho-anh-cai-demo-de-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj) mình đã hướng dẫn. 
Sau đó, bạn có thể lấy `app_id` của mình ở trong dashboard như hình dưới đây:

![](https://images.viblo.asia/c1e458dd-8850-47ed-95c8-d911aa26cb3c.png)

Thế là xong việc lấy `app_id` . Tiếp theo, mình sẽ xác định tham số `redirect_uri` . Cụ thể là sau khi kết thúc quá trình xác nhận quyền truy cập dữ liệu của `user` , mình muốn xử lý **những bước tiếp theo** ở trong `facebooks_controller` và `action` `login` mà mình sẽ tạo. Điều đó đồng nghĩa với việc, `redirect_uri` là đường dẫn mà sẽ đưa trình thông dịch Ruby nhảy vào `action` `facebooks#login` . 
Để cấu hình đường dẫn này, trước hết, trong `routes.rb`, mình tạo 1 cái `singular resource` tên là `facebook` , đồng thời tạo 1 `facebooks_controller` tương ứng :
```Ruby
#routes.rb
get "/facebook/login", to: "facebooks#login", as: "login"
resource :facebook
```
```Ruby
class FacebooksController < ApplicationController
  def login
  end

  def new
  end
end
```

Với phần cấu hình như trên, `redirect_uri ` của mình chính là `login_url` , được tạo ra bởi method `get "/facebook/login", to: "facebooks#login", as: "login"` . 
Bạn phải đăng ký redirect_uri của mình  trên trang [facebook for developer](https://developers.facebook.com/) nữa. Bạn vào phần **Đăng nhập facebook** , cài đặt `URI chuyển hướng OAuth hợp lệ` như hình dưới đây:

![](https://images.viblo.asia/58b51cc2-b769-43c5-a0f2-70725b18f1ba.png)

Tạm thời mình cứ để `redirect_uri` là `http://0.0.0.0:3000/facebook/login` , như thế là xong phần cài đặt về tham số này.

Cuối cùng, chỉ còn lại tham số `scope` . Dựa trên các chức năng của app, các bạn có thể chọn các permissions phù hợp( xem danh sách các permissions được cập nhật liên tục ở [đây)](https://developers.facebook.com/docs/facebook-login/permissions/). Ở trong bài viết này, vì mình muốn làm các chức năng **CRUD** liên quan đến `page` mà mình có quyền admin, nên mình sẽ chỉ cần các quyền sau: 
```Ruby
?scope='publish_pages,manage_pages,pages_manage_cta,pages_manage_instant_articles,pages_show_list'`
```

Cuối cùng, sau khi xác định xong **3 tham số** , mình sẽ viết được nút `Sign in with facebook` đầy đủ ở file `facebooks/new.html.erb` của mình như sau:
```Ruby
<%= link_to "Sign in with facebook", %q(https://www.facebook.com/v3.2/dialog/oauth?client_id=#{ENV["app_id"]}&scope='publish_pages,manage_pages,pages_manage_cta,pages_manage_instant_articles,pages_show_list'&redirect_uri=#{login_url}) %>
```

Bấy giờ để hiểu hơn về flow của quá trình đăng nhập, việc của bạn là click vào cái nút vừa tạo.

![](https://images.viblo.asia/e74ee07e-311d-463b-a01e-c364135ed4d3.png)

Cùng xem chuyện gì sẽ xảy ra nhé:

![](https://images.viblo.asia/72d1dd93-08e7-495b-8c39-693e01676815.png)

Như vậy là Facebook đã báo cho mình biết, cái `rails app` của mình đang chạy trên 1 đường dẫn **không an toàn** , cụ thể là không có `https` . Nguyên nhân là vì mình đang chạy `rails app` của mình ở môi trường `development` với đường dẫn `http://0.0.0.0:3000/` . Để sửa được lỗi này, đơn giản bạn chỉ cần làm cách nào đấy để app của bạn chạy với 1 cái domain có `https` . Có rất nhiều cách mà bạn có thể nghĩ đến : 
* [ Bật https trên localhost.](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec)
* Mua domain xịn và deploy app của bạn.
* Nếu lười mua domain thì có thể sử dụng các dịch vụ dạng Paas như `heroku` mà deploy
* Dùng `ngrok` : Một phần mềm cung cấp cho local web của bạn một cái `public_url`(có cả http và https) .

Trong các giải pháp mình nghĩ ra, mình chọn sử dụng `ngrok` . Sử dụng nó rất đơn giản, bạn chỉ cần tải nó về và cài đặt ở [đây](https://ngrok.com/) . Sau khi bạn login trong trang chủ của nó, thì nó có hướng dẫn cụ thể những điều cần làm luôn:

![](https://images.viblo.asia/cc0d72da-e72f-402a-8646-d9171c353775.png)

Sau khi làm xong các bước `setup` đơn giản, bạn chỉ cần `rails s` để chạy app trong môi trường development, sau đó chạy lệnh `./ngrok http your_localweb_port` . Thế là bạn đã có 1 chiếc `url` có `https` mà bạn muốn:

![](https://images.viblo.asia/b6ad10f7-76dd-4672-9e4e-d3ae23235971.png)

Bây giờ, hãy lấy chiếc url đó và đăng ký lại tên miền trên trang [facebook for developer](https://developers.facebook.com/) cho cái app của bạn, ở mục **Thông tin cơ bản** :

![](https://images.viblo.asia/2d0c1bf8-3c53-4951-84fb-f99d51ccfeba.png)

Vào phần Đăng nhập facebook, đăng ký lại cả `redirect_uri` nữa: 

![](https://images.viblo.asia/e74b01c6-5501-4f7e-95dc-ee7d6daac740.png)

Đó, bây giờ thì cùng thử click lại vào button `Sign in with facebook` xem điều gì sẽ xảy ra:

![](https://images.viblo.asia/72d1dd93-08e7-495b-8c39-693e01676815.png)

Như các bạn thấy, trình duyệt đã redirect đến `login dialog` của `facebook` .  Cụ thể thì `facebook_api` đang giúp `rails app` hỏi thằng `user`(ở đây là chính bạn) rằng: "Mày có muốn cấp giấy phép( permissions) sử dụng những cái thông tin này cho thằng `rails app` không? Nếu mày muốn thì ấn **tiếp tục**, ko thì lướt."  Ở đây mình giả sử là bạn sẽ ấn nút **Tiếp tục** , theo flow thì bây giờ browser của bạn sẽ được chuyển hướng đến đường dẫn `redirect_uri`  , cụ thể là `login_url`  của` rails app`, đồng nghĩa với việc nó sẽ thực hiện `action` `facebooks#login` . Cùng thử nhìn vào log ở hành động này xem có gì đặc biệt nhé:

```Ruby
Processing by FacebooksController#login as HTML
  Parameters: {"code"=>"AQDe5OYrkPRErlFaVTRo6FEzJfjfq4y6QXO8JMQb_......"}
  Completed 500 Internal Server Error in 273ms (ActiveRecord: 0.0ms)
```

Bạn thấy đấy, khi chuyển đến `redirect_uri`, `facebook_api` gửi kèm theo đường dẫn này một tham số `code` . Chúng ta sẽ cần tham số `code` này để lấy về `access_token` (thứ đóng vai trò quan trọng để có thể sử dụng được `graph-api` như mình đã nói ở bài trước).  Ở trong `action login` này, bạn có thể dễ dàng lấy được giá trị của `code` , nó chính là `params[:code]` . Bạn cần thêm 2 tham số là `client_id` và `client_secret` và thực hiện lấy về `access_token ` bằng cách thực hiện `HTTP Request` sau:

```
GET https://graph.facebook.com/v3.3/oauth/access_token?
   client_id={app-id}
   &redirect_uri={redirect-uri}
   &client_secret={app-secret}
   &code={code-parameter}
```

Sau khi thực hiện `HTTP Request` này **thành công**, `response` trả về sẽ bao gồm giá trị `access_token `.

Để thực hiện `HTTP Request` này trong `Rails ` , mình chọn sử dụng thư viện [Net::HTTP](https://ruby-doc.org/stdlib-2.6.3/libdoc/net/http/rdoc/Net/HTTP.html) vốn được tích hợp sẵn trong `Ruby` . Trong `facebooks_controller` mình sẽ viết một `private method` `get_api_request` như sau:

```Ruby
class FacebooksController < ApplicationController

  private
  def get_api_request endpoint
    uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
    response_body = JSON.parse Net::HTTP.get_response(uri).body
  end
end

```
`method`này sẽ thực hiện 1 `request` đến 1 `api endpoint` mà chúng ta chỉ định, sau đó nó trả về `body` của `response` nhận được . Tiếp theo, trong `login action` , mình sẽ thực hiện `HTTP Request` bên trên: 

```Ruby
class FacebooksController < ApplicationController

  def login
    response_body = get_api_request "oauth/access_token?
    client_id=#{ENV["app_id"]}&client_secret=#{ENV["app_secret"]}&code=#{params[:code]}&redirect_uri=https://71696d90.ngrok.io/facebook/login"
    access_token = response_body["access_token"]
  end

  private
  def get_api_request endpoint
    uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
    response_body = JSON.parse Net::HTTP.get_response(uri).body
  end
end

```

Với đoạn code bên trên, nếu `HTTP Request` **thành công** , mình sẽ lưu được giá trị của `access_token` vào một biến local cùng tên. Giá trị của `response_body` khi `request` thành công sẽ như thế này:
```Ruby
(byebug) response_body
{"access_token"=>"EAAFqhQvI4voBADzGSrqoizXG...........", "token_type"=>"bearer", "expires_in"=>5183847}
```
Như bạn đã thấy, ngoài `access_token`, chúng ta còn nhận được giá trị `token_type`  và `expires_in`. Hai giá trị này thì mình ko nghĩ ra cách để sử dụng nó trong app, nhưng ít nhất giá trị `"expires_in" ` cho mình biết, cái `access_token` này chỉ sử dụng được trong 5183847s (tương đương với 6 ngày) .  Vì vậy, nếu muốn sử dụng các chức năng liên quan đến `graph-api` thì `user` nên được update `access_token` trong khoảng thời gian cần thiết. 

Sau khi lấy được `access_token` rồi, chúng ta chỉ còn một bước cuối cùng phải làm để hoàn tất quá trình đăng nhập, đó là đăng nhập và lưu `access_token` vào `database` của `current_user`. Trước hết, hãy thêm `field` `access_token` vào bảng `User` trong `database` của bạn Đến đây thì có hai trường hợp sẽ xảy ra:
* **Trường hợp 1**: `user` đang thực hiện đăng nhập đã tồn tại trong `database` của app. Trong trường hợp này, ta chỉ cần `update_attribute` `access_token`
* **Trường hợp 2**:   user không tồn tại trong `database` của app . Ở trường hợp này, ta phải tạo 1 `record` mới trong database với các thuộc tính `email` và `access_token` 

Để biết `user` đã tồn tại hay chưa chúng ta sẽ tìm nó trong `database` thông qua `email`. Vậy câu hỏi là, làm sao chúng ta lấy được `email` của `user` từ `facebook` ? Câu trả lời **của mình** là  phải dùng chức năng `GET node` của` facebook-graph-api` .  Mình sẽ tạo một request như sau để lấy về email:
```Ruby
 details = get_api_request "me?fields=email,name&access_token=#{access_token}"
```
Và toàn bộ `action facebooks#login` được viết hoàn chỉnh như sau:

```Ruby
class FacebooksController < ApplicationController
  def login
    response_body = get_api_request "oauth/access_token?
    client_id=#{ENV["app_id"]}&client_secret=#{ENV["app_secret"]}&code=#{params[:code]}&redirect_uri=https://71696d90.ngrok.io/facebook/login"
    access_token = response_body["access_token"]
    details = get_api_request "me?fields=email,name&access_token=#{access_token}"
    user = User.find_by email: details["email"]
    if !user
      user = User.create email: details["email"], name: details["name"], password: Devise.friendly_token, access_token: access_token
    else
      user.update_attributes access_token: access_token
    end
    sign_in user
    redirect_to new_facebook_path
  end

  private
  def get_api_request endpoint
    uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
    response_body = JSON.parse Net::HTTP.get_response(uri).body
  end
end

```

Lưu ý một chút, ở đây mình dùng `devise` để làm chức năng đăng nhập, nên mình sử  dụng method `sign_in` của `Devise` để thực hiện đăng nhập `user` cho nhẹ nhàng. Nếu bạn làm chức năng đăng nhập bằng một cách khác, thì hãy thay thế dòng `sign_in user` bằng method của bạn nhé.

Thế là xong phần 1 rồi đó. Khi sử dụng `facebook-graph-api`, lấy được `access_token` về chính là phần khó nhất. Giờ chúng ta sẽ đi vào làm những phần dễ hơn, đó là tìm cách để tạo` lời gọi api` bằng `code Ruby`.

###  3.  Các cách để tạo lời gọi API bằng code Ruby.
Như mình đã nói ở [part 1](https://viblo.asia/p/rails-question-sep-part1-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj), việc tạo `lời gọi API` có rất nhiều cách làm. Vì bản chất của nó chỉ là `HTTP Request` , nên bạn có thể tạo `lời gọi API` với bất kỳ một ngôn ngữ, một `framework` , một `tools` nào đó có hỗ trợ một `HTTP library`. Đặc biệt, trong `Ruby on Rails` hỗ trợ khá nhiều `library`, `gem` mà bạn có thể sử dụng để tạo `HTTP request`  ví dụ như : [HTTP gem](https://github.com/httprb/http), [HTTParty](https://github.com/jnunemaker/httparty), [Restclient](https://github.com/rest-client/rest-client),....
Như bạn đã thấy ở phần trên, mình đã tạo một `GET api request ` thông qua method sau: 
```Ruby
def get_api_request endpoint
  uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
  response_body = JSON.parse Net::HTTP.get_response(uri).body
end
```
Ở đây mình sử dụng thư viện `Net::HTTP` tích hợp sẵn trong `ruby` cho đỡ phải kéo thêm `package` nào về . Tuy nhiên, khi cố gắng thực hiện `DELETE  HTTP request` , mình bắt đầu gặp một số vấn đề. Cụ thể là mình ko tạo được cú pháp chính xác để thực hiện `DELETE HTTP request` với thư viện này. Thế nên là mình đã cố gắng đi tìm 1 cách khác. Lúc đầu, mình chỉ đơn giản định sử dụng 1 thư viện khác. Nhưng trong lúc tìm kiếm, mình phát hiện ra một thứ quyền lực hơn nhiều, đó là` gem koala` . [Koala](https://github.com/arsduo/koala) là một `gem` được tạo ra để tích hợp một số facebook-api(**nhưng chủ yếu là Graph API**) vào `rails app`  . [Koala](https://github.com/arsduo/koala) cung cấp nhiều `method` quyền lực với cú pháp rất đơn giản để thực hiện các api request , nên ở phần còn lại của bài viết này, mình sẽ sử dụng nó để làm 4 chức năng như mình đã nói ở đầu bài viết:
* Publish 1 chiếc post lên trang fanpage mà **user sử dụng app** có quyền `admin`
* Edit chiếc post đó.
* Delete chiếc post đó.
* Đồng thời like, và tạo nhiều comment lên chiếc post đó. **(Batch-api-request)**

### 4. Sử dụng gem Koala
Để cài đặt `gem koala` trong `rails app` , bạn thêm dòng này vào trong `Gemfile` của `app` :
```Ruby
gem "koala"
```
Sau đó chạy `bundle install` . 
Tiếp theo mình cấu hình `app_secret` và `app_id` cho `method` `initialize` của `class Koala::Facebook::API` :
```
Koala.configure do |config|
  config.app_id = MY_APP_ID
  config.app_secret = MY_APP_SECRET
end
```

Như thế là cài đặt xong, giờ mình sẽ hướng dẫn các bạn cách để tạo `lời gọi api` với `gem` này. Để tạo ra một `lời gọi api` đơn giản với `koala` bạn cần **2 bước**:
* Bước 1: Tạo ra một `api object`.
* Bước 2: Sử dụng `api object` để gọi các `instance method` tương ứng với kiểu `lời gọi api` mà bạn muốn. 
`Api object` ở đây là một đối tượng của `class` `Koala::Facebook::API` . `Class` này được mix với [module Koala::Facebook::GraphAPIMethods](https://www.rubydoc.info/github/arsduo/koala/master/Koala/Facebook/GraphAPIMethods), một `module` định nghĩa rất nhiều `instance method` tương ứng với các kiểu `lời gọi api` khác nhau. Các `instance method` này thực hiện được đầy đủ tất cả các chức năng mà mình đã nói ở [part 1](https://viblo.asia/p/rails-question-sep-part1-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj). Ví dụ, để tạo một `get api request` đơn giản với `node me` , chúng ta có `instance method` `get_object` :
```Ruby
#Bước 1:
@graph = Koala::Facebook::API.new(user.access_token)

#Để khởi tạo object này, chúng ta cần ít nhất 2 tham số là access_token và app_secret. Nhưng nếu bạn không truyền app_secret vào
#như mình làm ở trên, nó sẽ lấy mặc định app_secret = Koala.config.app_secret

#Bước 2:
response = @graph.get_object "me"
```
Giá trị của biến `response` chắc các bạn cũng đoán được:
```Ruby
(byebug) response
{"name"=>"Hiếu Hoàng Trọng", "id"=>"257334039*******"}
```
Tương tự để `GET edges` chúng ta có method `get_connections` , để `POST edges, node`  chúng ta có `put_object `và `put_connections` . Ngoài ra chúng ta còn có các `method` khá hữu dụng như : `get_picture` ,` get_picture_data`, `put_comments`, `put_like` , ..... Các bạn có thể tìm hiểu thêm tất cả các method này tại [đây](https://www.rubydoc.info/github/arsduo/koala/master/Koala/Facebook/GraphAPIMethods) . 
Còn bây giờ, mình sẽ dùng các `method` này, để thực hiện tạo một bài post trên fanpage của mình.

###  5. Publish post lên trang fanpage thông qua app. 
Đầu tiên, mình sẽ thêm `action new` vào trong `facebooks_controller` của mình và tạo một trang `view` tương ứng :
Trong `facebook_controllers.rb` :
```Ruby
class FacebooksController < ApplicationController

  def new
  end

  def login
    #........
  end

  private
  def get_api_request endpoint
    #........
  end
end

```
Trong file` new.html.erb`:
```
<% unless user_signed_in? %>
// login_button
<% else %>
<div class="form-facebook">
  <%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "message", "Message", class: "form-label" %>
    <%= text_field_tag "message", nil , class: "form-control" %>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Publish to page</button>
  <% end %>
</div>
<% end %>
```
Ở đây mình làm 1 cái form và truyền vào `parameter` cần thiết để tạo `post`, đó là `message`

Ta sẽ có một cái view như thế này:

![](https://images.viblo.asia/05d408ff-011f-4ff2-b5a7-b6a2cb295c9b.png)

Từ cái view này, mình sẽ giải thích một chút về flow của chức năng mình đang làm. :

![](https://images.viblo.asia/993aadca-e681-4628-a4ba-b2cf4aae4d55.png)

Như các bạn đã thấy, sau khi click vào `button` `Publish to page` , mình sẽ phải xử lý tất cả các hành động còn lại trong `action facebooks#create`. Cụ thể là 3 hành động:
* Lấy page_access_token .
* Tạo lời gọi api `POST me/feed?message=your_message`
* Xử lý redirect về bài post vừa tạo. 
Code trong `action create` của mình như sau: 
```Ruby
class FacebooksController < ApplicationController
#.....
 def create
   #Lấy page_access_token
   graph = Koala::Facebook::API.new current_user.access_token
   responses = graph.get_connections "me", "accounts"
   graph_page = Koala::Facebook::API.new responses[0]["access_token"]

   # Tạo lời gọi api `POST me/feed?message=your_message`
   responses = graph_page.put_connections "me","feed", message: params[:message]

   #Xử lý redirect về bài post vừa tạo.
   redirect_to "https://www.facebook.com/#{responses["id"]}"
 end

#.....
end

```

Đó, chỉ đơn giản vậy thôi, và thành quả sẽ như thế này:

![](https://images.viblo.asia/ca8d1e80-4a9e-4f77-a2d7-203f6c2dc52f.png)

### 6. Edit chiếc post vừa tạo. 
Quá trình `edit` chiếc post vừa tạo diễn ra hoàn toàn tương tự với quá trình `publish` nó. Mình sẽ thêm vào trong `view` một cái `form` tương tự với `form` `Publish to page` :
Trong `new.html.erb`
```Ruby
//.......
<%= hidden_field_tag "publish", nil %>
//.......

<div class="form-facebook">
  <%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "message", "Message", class: "form-label" %>
    <%= text_field_tag "message", nil , class: "form-control" %>
    <%= hidden_field_tag "edit", nil %>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Edit most recent post</button>
  <% end %>
</div>
</div>
```

Ở đây, vì lười tách code ra nhiều view nên mình quyết định để chức năng `edit` ở trong file `new.html.erb` luôn. Và mình đã thêm 2 cái `hidden_field_tag` `publish` và `edit` để trong `controller` có thể hiểu được đâu là hành động `edit` , đâu là hành động `publish` (Làm như thế này sẽ rất là **không clean**, vi phạm chuẩn RESTful. Nhưng mà ngay từ đầu cái demo này đã không clean rồi, nên thôi kệ. :) . Miễn các bạn hiểu được cách nó hoạt động là ok.  ).

Và bây giờ chúng ta có 1 cái view như này:

![](https://images.viblo.asia/295f30cd-238b-42bb-af69-de603ea562f5.png)

Bây giờ trong controller, mình sẽ xử lý như thế này:

```Ruby
class FacebooksController < ApplicationController
  def create
    #Lấy page_access_toke
    responses = @graph.get_connections "me", "accounts"
    graph_page = Koala::Facebook::API.new responses[0]["access_token"]

    #Tạo post thì nhảy vào đây
    if params[:publish]
      responses = graph_page.put_connections "me","feed", message: params[:message]

    #Edit post thì nhảy vào đây
    elsif params[:edit]
      most_recent_post = graph_page.get_connections("me", "feed")[0]
      responses = graph_page.put_object nil, most_recent_post, message: params[:message]
    end

    #Redirect đến post vừa tạo/edit
    redirect_to "https://www.facebook.com/#{responses["id"]}"
  end
end

```

Đến đây, bạn đã có thể nhập message vào và click vào button `Edit most recent post`  . Chúng ta cùng kiểm tra kết quả:

![](https://images.viblo.asia/a9047bb6-993a-46e2-930f-735c00c8570e.png)

Mình đã edit thành công chiếc post vừa tạo, tuy nhiên có một lỗi nhỏ, đó là sau khi click vào button `Edit most recent post`, đường dẫn được redirect đến không phải là đường dẫn vào post vừa edit như mình mong đợi. Để tìm hiểu lý do, chúng ta cùng `byebug` thử vào đoạn code xử lý `lời gọi edit` và xem giá trị của biến `responses` :

```Ruby
 most_recent_post = graph_page.get_connections("me", "feed")[0]
 responses = graph_page.put_object nil, most_recent_post["id"], message: params[:message]
(byebug) responses
{"success"=>true}
(byebug) responses["id"]
nil
```

Chúng ta có thể thấy, lý do là vì giá trị responses["id"] bằng `nil` . Như mình đã nói ở part-1, `response` của lời gọi `DELETE` hoặc `EDIT`  không chứa nhiều thông tin. Để cái response này sinh động hơn, chúng ta phải sử dụng chức năng [READ AFTER WRITE](https://developers.facebook.com/docs/graph-api/advanced/) , bằng cách thêm một tham số `?fields=id` vào sau `lời gọi api` . Ta xử lý như sau:
```Ruby
responses = graph_page.put_object nil, most_recent_post["id"], message: params[:message], fields: "id"
```
Đó, thế là đã hoàn thành chức năng edit. 

### 7. Delete chiếc post vừa tạo
Việc tạo chức năng delete hoàn toàn tương tự 2 chức năng trên, chỉ thay method `put_object` thành `delete_object` mà thôi. Vì vậy mình sẽ không giải thích nữa mà cho các bạn xem code luôn:
Trong `new.html.erb`:
```Ruby
<% unless user_signed_in? %>
// login_button
<% else %>
//.....
  <%= form_tag facebook_path, method: :post, multipart: true do %>
  <%= hidden_field_tag "delete" %>
  <button type="submit" class="btn btn-danger btn-block">Publish to page</button>
<% end %>
```

Trong controller:
```Ruby
 #Delete post thì nhảy vào đây
elsif params[:delete]
  most_recent_post = graph_page.get_connections("me", "feed")[0]
  responses = graph_page.delete_object most_recent_post["id']
end
```

### 8. Batch api request
Và chúng ta cùng đến với chức năng cuối cùng mà mình muốn giới thiệu, đó là `batch_api_request` .` Batch requests` đơn giản là một *"bó*" gồm **nhiều** `api_request` được thực hiện ở các luồng riêng biệt, tuy nhiên nó chỉ được tính là **một request** cho các mục đích về hiệu năng. 
Để sử dụng tính năng này trên `tools-explorer`, các bạn có thể tham khảo [tài liệu này](https://developers.facebook.com/docs/graph-api/making-multiple-requests/?locale=en_US) . 
Còn bây giờ mình sẽ hướng dẫn các bạn sử dụng chức năng này với `gem koala` .  Cụ thể, mình sẽ tạo ra một bó 4 api_request bao gồm:
* **3 api request đầu tiên**: Dùng acc của trang fanpage, tạo 3 comment lên bài post mới nhất trên trang fanpage.
* **api_request số 4**: Tự like chiếc post đó.
Đầu tiên, mình sẽ lại tạo một cái form để nhập **mảng các comment** vào và sử dụng hidden_field_tag "batch" làm điều kiện để xử lý ở controller ( tương tự với edit, delete) .

Trong `new.html.erb`
```Ruby
.....
<div class="form-facebook">
<%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "comment", "Multi comment", class: "form-label" %>
    <%= text_field_tag "comment", nil , class: "form-control" %>
    <%= hidden_field_tag "batch", nil %>
    <%= hidden_field_tag "fields", "id" %>
    <%= hidden_field_tag "access_token" , @current_user.access_token, class: "form-control"%>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Add multi comments</button>
<% end %>
</div>
.......
```

Và được một cái view như này:

![](https://images.viblo.asia/30e16bbe-07e5-4575-8ad8-7974a4ca42c1.png)

Chúng ta sẽ nhập mảng các comment vào trường `multi comment`,  cụ thể, mình sẽ để từng comment tách nhau bởi dấu chấm phẩy, ví dụ:

![](https://images.viblo.asia/ab6c9e20-5cfa-467c-bdc1-5e80f091b9ec.png)

Bây giờ mình sẽ xử lý phần controller như sau:
```Ruby
elsif params[:batch]
  #Lấy ra bài post gần đây nhất trên fanpage
  most_recent_post = graph_page.get_connections("me", "feed")[0]

  #Tạo batch_api_request với method "batch" của Koala
  responses = graph_page.batch do |batch_api|

    #Xử lý params[:comment] thành mảng ["comment 1", "comment 2", "comment 3"]
    params[:comment].split(";").each do |comment|
      # 3 request đầu tiên.
      batch_api.put_comment most_recent_post["id"], comment
    end
    #request cuối cùng.
    batch_api.put_like most_recent_post["id"]
  end

      #Lấy response là comment đầu tiên, để thực hiện redirect đến comment đó sau khi thực hiện xong batch request
      responses = responses[0]
end
redirect_to "https://www.facebook.com/#{responses["id"]}"

```

Và đây là thành quả:

![](https://images.viblo.asia/b59f85b3-49f8-4a71-8fcd-6addce1408dc.png)

Với batch_api_requets, bạn có thể nghĩ ra được nhiều chức năng khá hữu ích, ví dụ bạn có một fanpage bán giày, bạn có thể làm chức năng autoreply khách comment trên bài post. Nếu bạn là nghệ sỹ và trang fanpage đó là trang truyền thông của bạn, nhưng bạn lỡ đăng quá nhiều ảnh người yêu cũ với caption **trẻ trâu**, sau này xem lại, bạn muốn xóa hết tất cả chúng đi chỉ bằng 1 vài thao tác đơn giản, bạn có thể dùng batch_api_request . 
Ở bài viết lần này, mình mới chỉ mô phỏng lại các chức năng cơ bản để giúp các bạn hiểu cách graph-api hoạt động. Đến với part-3, mình sẽ cố gắng làm một ứng dụng thực sự hay ho bằng việc sử dụng graph-api. Còn bây giờ trước khi tạm biệt, mình gửi các bạn **bản không che** phần code 2 file quan trọng nhất trong  demo này: 

File `new.html.erb`
```Ruby
<% unless user_signed_in? %>
<div class="form-facebook login">
<%= form_tag "https://www.facebook.com/v3.2/dialog/oauth", method: :get do %>
  <div class="form-group">
    <%= hidden_field_tag "client_id", ENV["app_id"] %>
    <%= hidden_field_tag "scope", Settings.facebook.permissions %>
    <%= hidden_field_tag "redirect_uri", login_url %>
  </div>
  <button type="submit" class="btn btn-primary btn-block">Login facebook</button>
<% end %>
</div>
<% else %>

<div class="form-facebook">
<%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "message", "Message", class: "form-label" %>
    <%= text_field_tag "message", nil , class: "form-control" %>
    <%= hidden_field_tag "publish", nil %>
    <%= hidden_field_tag "fields", "id" %>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Publish to page</button>
<% end %>
</div>

<div class="form-facebook">
<%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "message", "Message", class: "form-label" %>
    <%= text_field_tag "message", nil , class: "form-control" %>
    <%= hidden_field_tag "edit", nil %>
    <%= hidden_field_tag "fields", "id" %>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Edit most recent post</button>
<% end %>
</div>

<div class="form-facebook">
<%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "comment", "Multi comment", class: "form-label" %>
    <%= text_field_tag "comment", nil , class: "form-control" %>
    <%= hidden_field_tag "batch", nil %>
    <%= hidden_field_tag "fields", "id" %>
    <%= hidden_field_tag "access_token" , @current_user.access_token, class: "form-control"%>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Add multi comments</button>
<% end %>
</div>
<% end %>

```

File `facebooks_controller.rb` :
```Ruby
class FacebooksController < ApplicationController

  def login
    response_body = get_api_request "oauth/access_token?
    client_id=#{ENV["app_id"]}&client_secret=#{ENV["app_secret"]}&code=#{params[:code]}&redirect_uri=https://3dfc2809.ngrok.io/facebook/login"
    access_token = response_body["access_token"]
    details = get_api_request "me?fields=email,name&access_token=#{access_token}"
    user = User.find_by email: details["email"]
    if !user
      user = User.create email: details["email"], name: details["name"], password: Devise.friendly_token, access_token: access_token
    else
      user.update_attributes access_token: access_token
    end
    sign_in user
    redirect_to new_facebook_path
  end

  def new
  end

  def create
     graph = Koala::Facebook::API.new current_user.access_token
     responses = graph.get_connections "me", "accounts"
     graph_page = Koala::Facebook::API.new responses[0]["access_token"]
     most_recent_post = graph_page.get_connections("me", "feed")[0]
    if params[:publish]
      responses = graph_page.put_connections "me","feed", message: params[:message]
    elsif params[:edit]
      responses = graph_page.put_object nil, most_recent_post["id"], message: params[:message], fields: "id"
    elsif params[:batch]
      responses = graph_page.batch do |batch_api|
        params[:comment].split(";").each do |comment|
          batch_api.put_comment most_recent_post["id"], comment
        end
        batch_api.put_like most_recent_post["id"]
      end
      responses = responses[0]
    end
    redirect_to "https://www.facebook.com/#{responses["id"]}"
  end
  
  private

    def get_api_request endpoint
      uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
      response_body = JSON.parse Net::HTTP.get_response(uri).body
    end
end

```

Còn bây giờ thì tạm biệt. Cùng chờ đón part-3 của mình nhé. 


-----

References:

Graph-api-officialdoc: https://developers.facebook.com/docs/graph-api/using-graph-api/

Koala: https://github.com/arsduo/koala

GraphAPIMethod module: https://www.rubydoc.info/github/arsduo/koala/master/Koala/Facebook/GraphAPIMethods