### Giới thiệu:
Trong guide của laravel, mặc định đã hỗ trợ từ A-Z tính năng này, bạn chỉ việc chạy `php artisan make:auth` thì sẽ có đầy đủ view model controlller và migration để triển khai tính năng.
Tuy nhiên nó sẽ chỉ dùng guard mặc định của laravel, giả sử nếu bạn có đến 3 loại user khác nhau (admin, teacher, student) và muốn làm tính năng này cho hết cả 3 loại, chúng ta cần thực hiện các custom.

### Giải pháp:
1) Đối với tính năng forget password:
- Trong ForgotPasswordController.php có hàm :
````
public function showLinkRequestForm(Request $request)
    {
        $type = $request->type;
        return view('web.auth.forgetpass', compact('type'));
    }
````
Đây là nơi show view để bạn họ nhập email, bạn truyền thêm request type là loại user muốn change pass.

- Tạo thêm hàm send mail cũng trong controller đó :
````
    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail($type, Request $request)
    {
        $this->validateEmail($type, $request);

        $typeToBroker = [
            'admin' => 'admin',
            'student' => 'users',
            'teacher' => 'teacher',
        ];
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker($typeToBroker[$type])->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
                    ? $this->sendResetLinkResponse($request, $response)
                    : $this->sendResetLinkFailedResponse($request, $response);
    }
````
Trên là hàm thực thi việc send main, hãy để ý `$this->broker` đây hàm gửi loại driver cho việc change password, bao gồm việc khởi tạo driver cho token, nó là function trong class PasswordBrokerManager.php, mặc định nó sẽ dùng driver auth default `$name = $name ?: $this->getDefaultDriver();`, vì vậy việc của ta là truyền tham số guard thích hợp cho loại change password, như thế nó mới sinh token đúng được,

Tiếp theo ta cần viết đề cách thức broker từ parrent class, để nó có thể lựa cọn broker theo guard:
````
    /**
     * Get the broker to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\PasswordBroker
     */
    public function broker($type)
    {
        return Password::broker($type);
    }
````

2) Đối với tính năng verify bằng email, ta cần custom lại **trait VerifiesEmails** :
````
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function verify(Request $request)
    {
        if ($request->route('id')) {
            $userId = $request->route('id');
            $type = $request->type;
            if ($type == config('setting.role.student')) {
                $user = User::find($userId);
                if ($user) {
                    $user->markEmailAsVerified();
                    event(new Verified($user));
                    Auth::guard('student')->loginUsingId($userId);
                    return redirect()->route('student.changePassFirst')->with('verified', true);
                }
            } else if ($type == config('setting.role.teacher')) {
                $user = Teacher::find($userId);
                if ($user) {
                    $user->markEmailAsVerified();
                    event(new Verified($user));
                    Auth::guard('teacher')->loginUsingId($userId);
                    return redirect()->route('teacher.changePassFirst')->with('verified', true);
                }
            } else if ($type == config('setting.role.admin')) {
                $user = Admin::find($userId);
                if ($user) {
                    $user->markEmailAsVerified();
                    event(new Verified($user));
                    Auth::guard('admin')->loginUsingId($userId);
                    return redirect()->route('admin.changePassFirst')->with('verified', true);
                }
            }
        }

        return redirect($this->redirectPath())->with('verified', true);
    }
````

Trong mỗi model eloquent ta cần pass thêm type user, để link email có thể đính kèm thêm loại user, phục vụ việc verify chính xác:
````
public function sendEmailVerificationNotification()
    {
        $payload = [
            'name' => $this->name,
            'type' => config('setting.role.student'),
        ];

        $this->notify(new EmailVerify($payload));
    }
````

Trong class **EmailVerify** cần bổ sung thêm loại user trong link:
````
    /**
     * Get the verification URL for the given notifiable.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(60),
            [
                'id' => $notifiable->getKey(),
                'type' => $this->type,
            ]
        );
    }
````

Hy vọng sẽ giúp ích được mọi người (cheer)