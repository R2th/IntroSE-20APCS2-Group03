### 1. Mở đầu:
Đối với một người dùng, khi phải thường xuyên nhớ tài khoản và mật khẩu của từng ứng dụng luôn là vấn đề đau đầu, ngày xưa thì thường hay viết vào trong một cuốn sổ hay viết trong một tờ lịch nhưng đó không phải là một cách tốt vì nếu mất sổ hay chữ phai màu theo thời gian thì sẽ gây ra mất tài khoản và mật khẩu đó nên vào năm 2006 Twitter đã phát triển hệ thống openId và thống nhất một "chuẩn" với nhiều bên như Facebook và Google (từ 2006 đến hiện tại chuẩn này đã xảy ra nhiều biến cố lịch sử và hiện giờ lấy với tên gọi là Oauth 2), hệ thống này cho phép ứng dụng bên thứ 3 có thể truy cập vào API của họ một cách dễ dàng hơn và nhờ có điều này mà việc nhớ tài khoản và mật khẩu không còn là vấn đề nữa, khi mà phải nhớ nhiều tài khoản cùng một lúc, ta chỉ cần nhớ một tài khoản và đăng nhập nhiều ứng dụng khác nhau, rất tiện lợi đúng không.

### 2. Áp dụng:
- Đầu tiên tất nhiên là phải có project rồi và tất nhiên là các bạn biết cách tạo một project trong rails nên mình không cần nói lại chỗ này. Ta tạo một controller là sessions (dùng lệnh `rails g controller sessions` thì rails cũng tạo giúp ta một views với thư mục là sessions), một model User (dùng lệnh `rails g model user` thì rails cũng giúp ta một file migrate)
- À trước khi có thể đăng nhập bằng tài khoản Facebook ta phải đăng ký với ứng dụng Facebook để có thể được ủy từ họ và Facebook bằng đường link: https://developers.facebook.com/apps họ có hỗ trợ 3 cách đăng nhập gồm: iOS, Android, Web và Khác (khác ở đây như smartTV, Window Phone, trò chơi trên Facebook ...)
- Làm theo hướng dẫn:
    - Đầu tiên ta tạo một ứng dụng 
        - ![](https://images.viblo.asia/89a34d2e-a06c-4735-bf41-c54d8762aa4a.png)
    - Nhập tên cần hiển thị và nhấn nút "tạo ID ứng dụng"
    - Xác nhận bạn không phải Robot và gửi
    - Khi đã hoàn thành Facebook chuyển bạn tới một trang
        - ![](https://images.viblo.asia/ab6a02a4-5469-4505-a342-1aa39f7ea67a.png)
    - Đăng nhập bằng Facebook là thứ bạn quan tâm lúc này (bạn có thể vào đọc tài liệu hoặc chọn thiết lập)
    - Khi chọn thiết lập sẽ chuyển qua trang chọn nền tảng bạn đang dùng và tùy theo ứng dụng bạn đang sử dụng mà bạn chọn cho phù hợp
        - ![](https://images.viblo.asia/39254e4a-aa0f-4987-86b0-b98590e2efd5.png)
    - Khi đã chọn được nền tảng phù hợp thì làm theo các bước hướng dẫn
        - Bước đầu khi yêu cầu cần một đường link url trả về nếu bạn dùng là localhost có port 3000 (hoặc port khác thì bạn nhập port đó vào) thì nhập: http://localhost:3000/ vào là được. Save và tiếp tục cho đến hết
        - Khi đã có link url trả về ở phần "cài đặt > thông tin cơ bản" ID ứng dụng là thứ ta cần, quay lại project bắt đầu viết mã lệnh
    - Trong routes:
    ```
    root "sessions#index"
    get '/login', to: 'sessions#create'
    resources :sessions
    ```
    - Trong file migrate:
    ```
    // Tùy theo giá trị trả về mà ta lưu xuống db
    t.string :provider
    t.string :user_id
    t.text :oauth_token
    t.integer :expires_in
    t.integer :reauthorize_required_in
    t.text :signed_request
    ```
    - Trong controller:
    ```
    before_action :current_user, only: %i(index)
    after_action :current_user, only: %i(create)

    def index; end

    def create
      // tùy theo giá trị trả về mà ta lưu xuống database
      @user = User.create provider: params[:provider], user_id: params[:user_id],
        oauth_token: params[:oauth_token], expires_in: params[:expires_in],
        reauthorize_required_in: params[:reauthorize_required_in],
        signed_request: params[:signed_request]
      session[:user_id] = @user.id
      redirect_to '/'
    end

    def destroy
      session[:user_id] = nil
      cookies.delete "_oauth2_session"
      redirect_to "/"
    end

  private

    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
    ```
    - Tạo một file `index.html.erb` chứa đoạn mã sau:
    ```
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Oauth 2</title>
      </head>

      <body>
        <% if @current_user %>
          <div class="status"></div>
          <div style="word-break: break-word">
            <strong>Your token:</strong> <%= @current_user.oauth_token %>
          </div>
          <div>
            <strong>Your uid:</strong> <%= @current_user.user_id %>
          </div>
          <div>
            <strong>From:</strong> <%= @current_user.provider %>
          </div>
          <%= link_to "Sign out", "/sessions/#{@current_user.id}", method: :delete %>
        <% else %>
          <fb:login-button onlogin="checkLoginState();"></fb:login-button>
        <% end %>
      </body>
    </html>

    <script>
      function statusChangeCallback(response) {
        if (response.status === 'connected') {
          testAPI(response);
        } else {
          // Nếu chưa đăng nhập thì sẽ mời người dùng đăng nhập
          // Bạn có thể làm điều khác không bắt buộc
          document.getElementById('status').innerHTML = 'Please log into this app';
        }
      }

      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
      }

      window.fbAsyncInit = function() {
        FB.init({
          appId      : '2007330456007975',
          cookie     : true,  // bật cookie để máy chủ có thể truy cập application của bạn
          xfbml      : true,  // Kiểm tra các plugin của ứng dụng
          version    : 'v3.0' // sử dụng api phiên bản 3.0
        });
      };

      (function(d, s, id) {
        // Khởi tạo biến js và fjs
        var js, fjs = d.getElementsByTagName(s)[0]; // fjs được lấy từ document với tag name script vị trí 0
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js"; // liên kêt tới sdk của facebook
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      function testAPI(response) {
        $.ajax({
          url: '/login',
          type: 'GET',
          data: {
            provider: 'facebook',
            name: name,
            user_id: response.authResponse.userID, // user_id của người dùng bên facebook
            oauth_token: response.authResponse.accessToken, // chứa mã truy cập cho người dùng
            expires_in: response.authResponse.expiresIn, // cho biết thời gian UNIX khi mã hết hạn và cần được gia hạn
            reauthorize_required_in: response.authResponse.reauthorize_required_in, // khoảng thời gian trước khi phiên đăng nhập kết thúc và cần ủy quyền lại, tính bằng giây
            signed_request: response.authResponse.signedRequest // một thông số được đánh dấu chứa thông tin về người dùng ứng dụng
          }
        }).success(function () {
          window.location.reload(); // thành công thì tải lại trang
        });
      }
    </script>
    ```
    - Giao diện:
        - Chưa login: 
            - ![](https://images.viblo.asia/e46c01f1-8f59-4c2b-b24c-b36bde07336d.png)
        - Đã login:
            - ![](https://images.viblo.asia/36a7f1df-261e-445a-bb22-95e09e4ae0fd.png)
    - `params` và giá trị lưu xuống db:
        - ![](https://images.viblo.asia/72612390-6a10-405c-9e04-5bce03fbd7ff.png)
### 3. Kết luận:
- Oauth2 không chỉ là một "protocol" mà còn là một "framework", đòi hỏi bạn phải implement cả ở phía server và client. Ngoài ra việc oauth2 tách authorization server và resource server ra cũng khiến cho việc implement khá là mất công nếu làm từ đầu.
- Ngoài ra thì Oauth2 cũng có khá nhiều nhược điểm , đặc biệt là liên quan đến security. Tuy nhiên việc các công ty đứng đầu như facebook, twitter hay google đi tiên phong trong việc implement oauth2 khiến chúng ta không thể tránh khỏi cái framework này, nên việc hiểu rõ nó là khá quan trọng.
- Ở rails ta có các gem hỗ trợ về Oauth 2 này rất tốt và không phải mất công đi viết lại từ đầu đó là gem Omniauth, mọi người có thể tham khảo: https://github.com/omniauth/omniauth

### 4. Link Tham khảo:
https://kipalog.com/posts/Tro-lai-co-ban--Oauth-2
https://developers.facebook.com/docs/facebook-login/web#checklogin