Các function, method xuất hiện rất nhiều trong lập trình và phần clean code của phần này cũng là một phần mình thấy khá khó. Trong bài viết mình đưa ra một vài nguyên tắc và **cố gắng clean code chính mình theo các nguyên tắc đó** và tất nhiên các đoạn code mình tối ưu **chưa phải là tốt nhất** :D.

Trước hết hãy xem đoạn code xử lý bước login sau (Xứ lý với framework FuelPHP nhé): Tống tất cả vào 1 hàm:
 ```php
public function post_login()
{
    $input = array();
    $vali = $this->_vali();

    $check_vali = $vali->run();
    // was the login form posted?
    if (\Input::method() == 'POST') {

        if ($check_vali) {
            // check the credentials.
            if (\Auth::instance()->login(\Input::param('username'), \Input::param('password'))) {
                // did the user want to be remembered?
                if (\Input::param('remember', false)) {
                    // create the remember-me cookie
                    \Auth::remember_me();
                } else {
                    // delete the remember-me cookie if present
                    \Auth::dont_remember_me();
                }
                // logged in, go back to the page the user came from, or the
                // application dashboard if no previous page can be detected
                \Response::redirect_back('/');
            } else {
                // login failed, show an error message
                //\Messages::error(__('login.failure'));
                $errorMessage = 'Username or password not right!';
                $data = [
                    'errorMessage' => $errorMessage,
                ];

                return Response::forge(View::forge('login/index')->set($data));
            }
        } else {
            $errors = $vali->error();
            $oldRequest = $vali->validated();
            $data = [
                'errors' => $errors,
                'oldRequest' => $oldRequest,
            ];

            return Response::forge(View::forge('login/index')->set($data));
        }
    }

    // display the login page
    return \View::forge('login/index');
}
```
Đoạn code chạy ổn (tất nhiên là phải chạy ổn mới dám nghĩa tới clean code chứ :v) nhưng ta sẽ tối ưu nó ngon hơn hiện tại :D
# 1. Small!!!
Nguyên tắc đầu tiên viết hàm là hàm đỏ nên nhỏ và nguyên tắc thứ 2 là hàm đó nên nhỏ hơn nữa. Vậy thế nào là nhỏ? Trong cuốn clean code, tác giả có đề cập đến đoạn code xử lý 1 trò chơi. Nó cung cấp một hiệu ứng ảo nhìn rất đẹp, khi bạn di chuyển chuột, có các hình lấp lánh rơi xuống dưới màn hình như các đũa thần. Tác giả viết gộp tất cả vào khoảng 3000 dòng và sau khi tham khảo đoạn code của 1 người bạn để học các clean code, người bạn đó chia code thành các function cực nhỏ, nhỏ đến mức mỗi hàm chỉ 2,3 dòng. 

Khỏi lấy ví dụ đâu xa, hãy xem code trong Laravel xem function của họ nhỏ đến mức nào. Trích code của trait **ThrottlesLogins** trong Laravel:
```php
/**
     * Get the throttle key for the given request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function throttleKey(Request $request)
    {
        return Str::lower($request->input($this->username())).'|'.$request->ip();
    }

    /**
     * Get the rate limiter instance.
     *
     * @return \Illuminate\Cache\RateLimiter
     */
    protected function limiter()
    {
        return app(RateLimiter::class);
    }

    /**
     * Get the maximum number of attempts to allow.
     *
     * @return int
     */
    public function maxAttempts()
    {
        return property_exists($this, 'maxAttempts') ? $this->maxAttempts : 5;
    }

    /**
     * Get the number of minutes to throttle for.
     *
     * @return int
     */
    public function decayMinutes()
    {
        return property_exists($this, 'decayMinutes') ? $this->decayMinutes : 1;
    }
```
Vì vậy đừng lo hàm của bạn có 1,2 dòng và thật vô nghĩa. Nên chia hàm thành các hàm nhỏ, nhỏ và nhỏ hơn nữa.

## 1.1. Blocks and Indenting

Bạn có thấy nếu bạn sử dụng quá nhiều if như đoạn code trên, code phồng khá to và gây khó đọc. **Một nguyên tắc nữa là thực hiện với if, else, while .. sau đó chỉ nên có 1 dòng. Dòng này nên được gọi hàm**. Điều này không chỉ giúp hàm trở nên small mà nó còn làm tài liệu có giá trị vì hàm được gọi bên trong block có 1 cái tên miêu tả rất đẹp:
```Java
public static String renderPageWithSetupsAndTeardowns(
    PageData pageData, boolean isSuite) throws Exception {
    if (isTestPage(pageData))
        includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```

# 2. Do one thing!!!

Hàm nên được rõ ràng và chỉ nên đảm nhiệm làm 1 thứ. Tư tưởng này đã xuất hiện từ hơn 30 năm về trước **"FUNCTIONS SHOULD DO ONE THING . THEY SHOULD DO IT WELL .THEY SHOULD DO IT ONLY.**" Hàm đó có thể tạo các bộ nhớ đệm, chỉ format dữ liệu, chỉ render ra HTML ... Tuy nhiên định nghĩa thế nào là làm 1 việc lại là vấn đề khó.

Nhìn lại ví dụ trong 1.1 ta thấy hàm thực hiện:
* 1. Determining whether the page is a test page.
* 2. If so, including setups and teardowns.
* 3. Rendering the page in HTML.

Như vậy hàm đó thực hiện một việc hay nhiều việc. Hãy để ý rằng, 3 bước này là 3 bước để thực hiện một việc, mỗi bước được gọi một tên hàm @@. Như vậy nó thực hiện 1 việc. Chúng ta có thể mô tả hàm đó bằng đoạn văn TO sau:

```
*TO RenderPageWithSetupsAndTeardowns, we check to see whether the page is a test page 
and if so, we include the setups and teardowns. In either case we render the page in 
HTML.*
```
Hơi hack não một chút xíu. Nếu như bạn thực hiện theo kiểu từng bước như trên dưới dạng các hàm, hàm đó rõ ràng thực hiện 1 việc (Nguyên bản:v It should be very clear that Listing 3-1 contains steps at many different levels of abstraction. So it is clearly doing more than one thing).

# 3. One Level of Abstraction per Function
Để chắc chắn rằng 1 hàm làm 1 việc, bạn nên chỉ gọi 1 level hàm trong 1 hàm :v. Khó giải thích quá nhưng tóm lại là không nên gọi hàm trong hàm trong một hàm =)). OK nói thế này cho dễ hình dung nhé.
## 3.1. Reading Code from Top to Bottom: The Stepdown Rule
Quy tắc này hiểu đơn giản là chúng ta muốn đọc chương trình của bạn từ trên xuống như là tập các đoạn văn bắt đầu là **TO**, mỗi bước miêu tả "current level of abstraction" ở hiện tại và các miêu tả các bước con ở level tiếp theo và mỗi hàm chỉ nên dừng lại ở 1 level của sự trừu tượng.
Mô tả đoạn code như sau (theo các level):
```

To include the setups and teardowns, we include setups, then we include the test 
page content, and then we include the teardowns.

    To include the setups, we include the suite setup if this is a suite, then we 
    include the regular setup.
    To include the suite setup, we search the parent hierarchy for the “SuiteSetUp” 
    page and add an include statement with the path of that page. 
    To search the parent. . .
```
Từng **TO** như vậy ta có thể hiểu mỗi **TO** sẽ là một hàm và nên dùng lại ở **1 level TO thụt vào** cho mỗi miêu tả theo nguyên tắc số 3 này. Rất khó để lập trình viên có thể tuân theo nguyên tắc này, nhưng đó chính là thứ giúp bạn có thể cụ thể hóa cái mỗi hàm chỉ làm 1 việc.

# 4. Ứng dụng để clean đoạn code ban đầu
OK, chúng ta nhớ 2 thứ trong phần bài viết này đó là 1 hàm cần small và small hơn nữa. Thứ 2 là một hàm cần "DO ONE THING", làm 1 việc như thế nào thì hãy sử dụng các đoạn văn TO, đọc code từ trên xuống dưới để dễ hình dung.

OK vậy pha login ta mô tả đoạn văn TO như sau:
```
TO đăng nhập, bạn cần phải kiểm tra dữ liệu sau đó mới đăng nhập
    TO kiểm tra dữ liệu, bạn cần xây dựng các rules và chạy nó
        TO xây dựng các rules ... khoan đã, chỉ 1 level abstract trong 1 hàm, 
        cái này mô tả vẫn được nhưng cần tách nó ra 1 hàm với cái bên trên để 
        đảm bảo nguyên tắc này
    TO để đăng nhập bạn cần gọi API đăng nhập
    TO đăng nhập lỗi thì xử lý nó
```
Nhìn qua ta cần xây dựng các hàm login, kiểm tra dữ liệu, tác biệt riêng, không nên để chung hết như phần mở đầu. Cơ bản đoạn TO trên mô tả như sau:
```php
public function post_login()
{
    // TO kiểm tra dữ liệu
    $checkVali = $this->_vali_login();

    if ($checkVali) {
        // TO đăng nhập (tách hàm riêng cho dễ đọc)
        $this->handleLoginEvent();
    } else {
        // TO đăng nhập lỗi
        return $this->handleFailedValidateResponse($vali);
    }
}
```
Trong mô tả trên có đoạn ở level 2, bây giờ ta mới mô tả:
```
TO kiểm tra dữ liệu, bạn cần xây dựng các rules và chạy nó
    TO xây dựng các roles, đã có API :D
    TO chạy nó, ta dùng hàm run() :D
(không có level 2 là ngon rồi)
```
Viết hàm validate thôi:
```php
private function _vali_login()
    {
        // TO xây dựng các rules trong hàm login
        $vali = Validation::forge();

        $vali->add_field('username', 'Your username', 'required');
        $vali->add_field('password', 'Your password', 'required|min_length[3]|max_length[10]');
        // TO chạy, gọi methods run
        return $vali->run();
    }
```
Tương tự xử lý các pha login, ta có đoạn code đầy đủ sau:
```php

// Đây là hàm xử lý login, các phương thức sau mang tính chất bổ trợ và small, small, small
public function post_login()
{
    $checkVali = $$this->_vali_login();

    if ($checkVali) {
        $this->handleLoginEvent();
    } else {
        return $this->handleFailedValidateResponse($vali);
    }
}

// Small
private function _vali_login()
{
    $vali = Validation::forge();

    $vali->add_field('username', 'Your username', 'required');
    $vali->add_field('password', 'Your password', 'required|min_length[3]|max_length[10]');

    return $vali->run();
}

private function login($username, $password)
{
    return \Auth::instance()->login($username, $password);
}

private function handleLoginEvent()
{
    $username = \Input::param('username');
    $password = \Input::param('password');
    $checkLogin = $this->login($username, $password);

    if ($checkLogin) {
        $this->handleRememberMe(\Input::param('remember', false));

        \Response::redirect_back('/');
    } else {
        $this->handleFailedLoginResponse();
    }
}

private function handleFailedValidateResponse($vali)
{
    $errors = $vali->error();
    $oldRequest = $vali->validated();
    $data = array(
        'errors' => $errors,
        'oldRequest' => $oldRequest,
    );

    return Response::forge(View::forge('login/index')->set($data));
}
private function handleFailedLoginResponse()
{
    Session::set_flash('errorMessage', 'Username or password not right!');
    return Response::redirect('login/login');
}
private function handleRememberMe($remeberMe = true)
{
    if ($remeberMe) {
        \Auth::remember_me();
    } else {
        \Auth::dont_remember_me();
    }

}
```

# Tổng kết
Với Function bạn cần nhớ
* Small.
* DO ONE THINGS? Đoạn văn TO.
# Tài liệu tham khảo
Chapter 3: [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882).