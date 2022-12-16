# Đặt vấn đề
Trong các dự án iOS sử dụng authenticator, việc đăng nhập thường hay được sử dụng bằng access token sau khi đã đăng nhập thành công bằng tài khoản và mật khẩu. Cách làm này khá phổ biến và rộng rãi hiện nay. Một tình huống điển hình là nếu đăng nhập rồi không sử dụng app dẫn đến access token hết hạn (thường sẽ có giới hạn thời gian) thì ứng dụng sẽ văng ra ngoài màn login và tiến hành đăng nhập lại. Với trường hợp này thì chúng ta thường tạo thêm 1 API refresh token để lấy lại access token mới, và ngay sau đó gọi lại api cũ để không cần phải đăng nhập lại. Hoặc là tự động login nếu khi kill app mà chưa đăng xuất. Việc xử lý này chính là retry lại API trong trường hợp call api bị failed. Hôm nay mình sẽ hướng dẫn mọi người cách xử lý tình huống này trên frameword RxSwift sử dụng thư viện AlamoreFire.
# Trường hợp Ví dụ
Trường hợp này xảy ra khi chúng ta:
- Gọi 1 API sử dụng access token, nhưng bị failed do access token đã quá hạn
- Tiếp tục gọi một API để refresh lại access token với mục đích lấy về access token mới
- Đến bước này có hai trường hợp xảy ra:
+ Một là API refresh thành công, access token mới sẽ được dùng để call api trước đó, app lại chạy bình thường (1)
+ Trường hợp thứ 2 là cái API refresh cũng bị lỗi luôn, vậy chúng ta cần xử lý tiếp, thường là bắn về màn Login, bắt đăng nhập lại.
# Xử lý token hết hạn
Chúng ta có hàm gọi và lấy dữ liệu từ API như sau:

```
static func request<T: Codable> (_ urlConvertible: URLRequestConvertible) -> Observable<T> {
                return Observable<T>.create { observer in
                let request = AF.request(urlConvertible)
                    .validate(statusCode: 200..<300)
                    .responseJSON { (response) in
                    switch response.result {
                    case .success(let value):
                        observer.onNext(value)
                        observer.onCompleted()
                        return
                    case .failure(let error):
                        observer.onError(error)
                    }
                }
                return Disposables.create {
                    request.cancel()
                }
```

Khi accesstoken hết hạn, chúng ta dùng retryWhen{} của RxSwift để xử lý. Gọi API refresh token và lưu lại access token mới, sau đó gọi lại api lúc đầu.

```
static func request<T: Codable> (_ urlConvertible: URLRequestConvertible) -> Observable<T> {
                return Observable<T>.create { observer in
                let request = AF.request(urlConvertible)
                    .validate(statusCode: 200..<300)
                    .responseJSON { (response) in
                    switch response.result {
                    case .success(let value):
                        observer.onNext(value)
                        observer.onCompleted()
                        return
                    case .failure(let error):
                        observer.onError(error)
                    }
                }
                return Disposables.create {
                    request.cancel()
                }.retryWhen { error -> Observable<Error> in
            return error.flatMapLatest { error-> Observable<Error> in
                    return refreshToken()
                    .flatMapLatest { respone -> Observable<Error> in
                    //save respone
                        return Observable.error(error)
                    }
                } else {
                    return Observable.error(error)
                }
            }
```

Đối với cách xử lý này chúng ta phải viết thêm 1 hàm resfresh token riêng, để tránh bị lặp vô hạn

```
func refreshToken() -> Observable<Respone> {
    return renewToken()
}

static func renewToken(_ urlConvertible: URLRequestConvertible) -> Observable<Respone> {
        return Observable.create { observer in
            let request = AF.request(urlConvertible)
                .validate(statusCode: 200..<300)
                .responseJSON { (response) in
                    switch response.result {
                    case .success(let value):
                        observer.onNext(data)
                        observer.onCompleted()
                        return
                    case .failure(let error):
                        observer.onError(error)
                    }
                }
            
            return Disposables.create {
                request.cancel()
            }
        }
    }
```

# Xử lý refresh token hết hạn
Tình huống thứ 2 xảy ra là  API refresh cũng bị lỗi luôn, vậy chúng ta cần xử lý tiếp, thường là bắn về màn Login, bắt đăng nhập lại.
 Khi đó chúng ta chỉ viêc xử lý lỗi ở observale gọi refreshToken
 ```
static func request<T: Codable> (_ urlConvertible: URLRequestConvertible) -> Observable<T> {
                return Observable<T>.create { observer in
                let request = AF.request(urlConvertible)
                    .validate(statusCode: 200..<300)
                    .responseJSON { (response) in
                    switch response.result {
                    case .success(let value):
                        observer.onNext(value)
                        observer.onCompleted()
                        return
                    case .failure(let error):
                        observer.onError(error)
                    }
                }
                return Disposables.create {
                    request.cancel()
                }.retryWhen { error -> Observable<Error> in
            return error.flatMapLatest { error-> Observable<Error> in
                    return refreshToken().do(onError: { error in
                       //Handle getout to login screen
                    }).flatMapLatest { respone -> Observable<Error> in
                        //save respone
                        return Observable.error(error)
                    }
            }
        }
```

Trên đây là hướng dẫn xử lý token hết hạn của mình, hi vọng sẽ giúp các bạn xử lý được tình huống tương tự nếu gặp phải. Xin cám ơn đã đọc !