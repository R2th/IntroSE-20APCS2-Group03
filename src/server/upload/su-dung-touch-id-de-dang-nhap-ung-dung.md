Hiện tại phần lớn các ứng dụng đều cho phép người dùng tạo tài khoản, theo đó là việc đăng nhập vào tài khoản. Vậy làm thế nào để việc đăng nhập ứng dụng thật đơn giản và nhanh chóng hơn, ít thao tác hơn? Câu trả lời là bạn có thể sử dụng Touch ID, với công nghệ này bạn chỉ cần đặt ngón tay lên phím home của device thay vì cứ mỗi lần đăng nhập bạn lại phải nhập user name và password, thực sự rất mệt mỏi phải không. Đơn giản mình lấy ví dụ nếu bạn nghiện một ứng dụng nào đó mà hay sử dụng như ứng dụng facebook chẳng hạn. Bạn sẽ rất mệt mỏi, vất vả khi nhập thông tin đăng nhập, chưa kể nếu bạn quên thì việc đăng nhập lại càng trở lên khó khăn hơn.

Với giới hạn bài viết này mình sẽ hướng dẫn các bạn sử dụng Touch ID để đăng nhập ứng dụng một cách đơn giản và nhanh chóng hơn rất nhiều cách đăng nhập thông thường (nhập username, password). Mình sẽ demo cả hai cách, các bạn có thể xác nhận bằng cách xem video cuối bài nhé.

### Bài viết bao gồm các phần sau:

##### 1. Xây dựng giao diện ứng dụng demo
##### 2. Tìm hiểu việc lưu trữ thông tin sử dụng **Keychain**
##### 3. Đăng ký account, login và kiểm tra đăng nhập
##### 4. Kết thúc ứng dụng và đánh giá.


Chúng ta cùng bắt đầu nhé:

# 1. Xây dựng giao diện ứng dụng demo
- Các bạn có thể nhìn ứng dụng một cách tổng quát để có thể hình dung ra chúng ta sẽ làm gì.

![](https://images.viblo.asia/cd30d8f6-d983-4e17-b924-ac9fa197c03f.png)

- Như hình vẽ trên chúng ta sẽ cần xây dựng một ứng dụng bao gồm 3 màn hình:

    - Màn hình đăng ký tài khoản
    - Màn hình đăng nhập
    - Màn hình hiển thị kết quả đăng nhập.

- Chú ý một chút chúng ta cần nhúng 1 navigation bar vào để có thể push và pop giữa các màn hình dễ dàng.
    
##### 1.1. Màn hình đăng ký tài khoản

- Với màn hình này mục đích cho phép người dùng nhập thông tin để đăng ký account. Ở bài viết này mình chỉ làm đơn giản là người dùng cần cung cấp 2 thông tin là username và password thôi.
- Đầu vào là username và password.
- Đầu ra là việc đăng ký có thành công hay không. Ở đây mình sẽ lưu lại thông tin đầu vào vào keychain. Việc lưu thành công tương đương với việc đăng nhập thành công và ngược lại. Đối với những ứng dụng có sử dụng api để request đăng ký thì cũng tương tự như vậy.
- Vậy chúng ta cần làm giao diện như sau:

![](https://images.viblo.asia/d3c1a53f-fb93-492a-880c-503c40388571.png)

- Khi bạn nhấn vào register thì ứng dụng tiến hành lưu trữ thông tin và kiểm tra xem việc lưu trữ có thành công không.

##### 1.2. Màn hình đăng nhập

- Ở màn hình đăng nhập này. Vì mình sẽ demo 2 cách đăng nhập (một cách truyền thống và một cách sử dụng Touch ID nên giao diện sẽ bao gồm 2 button login và touch id.
- Và bạn cũng cần 2 textfield để phục vụ cho việc login thông thường.
- Ở đây việc sử dụng Touch ID mình thêm button thì nó sẽ thừa ra một bước trước khi đăng nhập đó là bạn phải nhấn vào touch id. Còn trong trường hợp ứng dụng của bạn thì bạn chỉ cần gọi login bằng touch id luôn khi vào màn hình, như vậy bạn đã tiết kiệm được 1 action của người dùng mà vẫn đáp ứng được mục đích.
- Nhưng ở đây với giới hạn là cần so sánh với đăng nhập thông thường nên mình làm thêm một button touch id.
- Các bạn có thể tham khảo giao diện mình kéo thả như sau:

![](https://images.viblo.asia/5da947c4-a03b-431a-9031-8315cf92af16.png)

##### 1.3 Màn hình hiển thị kết quả đăng nhập.

- Ở màn hình này đơn giản cho phép hiển thị password để bạn nhận biết được là đăng nhập thành công hay không. Thành công tức là mình có lấy được password tương ứng với username trong kho lưu trữ (lưu trữ lúc đăng ký tài khoản)
- Vì vậy giao diện chỉ đơn giản như sau:

![](https://images.viblo.asia/96417237-5fdc-431a-83c1-c1a8754391c0.png)

# 2. Tìm hiểu việc lưu trữ thông tin sử dụng Keychain

- Sau bước 1 chúng ta đã có giao diện để chuẩn bị demo. Nhưng để demo được thì chúng ta cần phải xây dựng logic cho nó đã.
- Để có thể xây dựng logic đăng ký, đăng nhập và kiểm tra đăng nhập chúng ta cùng tìm hiểu một chút về **KeychainPasswordItem** đã nhé.
- Thực tế thì **KeychainPasswordItem** wrapper lại **Keychain** thôi. Các bạn có thể tải tại link [GenericKeychain](https://developer.apple.com/library/content/samplecode/GenericKeychain/Listings/GenericKeychain_KeychainPasswordItem_swift.html#//apple_ref/doc/uid/DTS40007797-GenericKeychain_KeychainPasswordItem_swift-DontLinkElementID_7) 
- Vậy **Keychain** trong iOS là gì? Keychain là giải pháp thay thế an toàn để lưu trữ dữ liệu nhạy cảm, quan trọng chẳng hạn như username, password thay vì sử dụng NSUserDefaults hay plist với độ an toàn dường như bằng zero.
- Như chúng ta đã biết thì NSUserDefaults là giải pháp lưu trữ đơn giản, nhỏ và rất nhỏ như NSNumber, NSString... Nhưng khi sử dụng NSUserDefaults thì độ an toàn là không có.
- Còn với Keychain thì theo Apple là thế này:

>  “…an encrypted container that securely stores small chunks of data on behalf of apps and secure services.”

and 

> “…simply a database stored in the file system.”

- Còn rất nhiều lý do để bạn biết là bạn nên sử dụng **Keychain** và các bạn cũng có thể tự tìm hiểu xem lợi ích nó còn những gì nữa.
- Quay trở lại với **KeychainPasswordItem** là wrapper **Keychain**. Vậy nó có những gì? Chúng ta cần quan tâm ít nhất 3 method sau: init, save and read.

```
init(service: String, account: String, accessGroup: String? = nil)
```
- Service ở đây chỉ là cái tên để định danh cho ứng dụng của bạn trong hệ thống Keychain thôi
- Account chính là username của bạn.

```
func savePassword(_ password: String) throws
```

```
func readPassword() throws -> String
```

- Với 3 method trên là đủ để bạn xây dựng hệ thống đăng ký, đăng nhập được rồi.

# 3. Đăng ký account, login và kiểm tra đăng nhập
##### 3.1 Đăng ký account
- Ở đây mình có viết một method để lưu lại thông tin tài khoản với đầu vào là username, password và đầu ra là việc lưu trữ thành công hay không. Các bạn cùng quan sát đoạn code sau nhé:

```
    private func saveAccountToKeychain(userName: String?, password: String?, finished: (() -> ())?) {
        guard let userName = userName?.trimmingCharacters(in: .whitespaces), !userName.isEmpty else {
            // show error
            return
        }
        guard let password = password?.trimmingCharacters(in: .whitespaces), !password.isEmpty else {
            // show error
            return
        }
        // Lưu username vào UserDefaults
        UserDefaults.standard.set(userName, forKey: "lastAccessedUserName")
        // Khởi tạo Keychain
        let passwordItem = KeychainPasswordItem(
            service: KeychainConfiguration.serviceName,
            account: userName,
            accessGroup: KeychainConfiguration.accessGroup
        )
        do {
            // thực hiện lưu vào keychain
            try passwordItem.savePassword(password)
            // call back là success
            finished?()
        } catch {
            // khi có lỗi
            print("Error saving password")
        }
    }
```
- Trường hợp có lỗi thì các bạn tự handle nhé, ở đây mình chỉ in ra console thôi
- Trường hợp lưu trữ success thì bạn sẽ nhận được 1 call back về để biết đó là success.
- Vậy khi nhấn vào button register thì chúng ta làm như sau:

```
    @IBAction func didTouchUpInsideRegisterButton(_ sender: Any) {
        saveAccountToKeychain(userName: userNameTextField.text, password: passwordTextField.text) { [weak self] in
            self?.performSegue(withIdentifier: "PushToLogin", sender: nil)
        }
    }
```
- Khi lưu trữ thành công thì sẽ push qua màn hình đăng nhập.

##### 3.2 Đăng nhập tài khoản và kiểm tra đăng nhập

- Trước hết giả sử dụng ta đã cần 1 method để load password từ keychain ra. Nó sẽ như sau:

```
    private func loadPasswordFromKeychainAuthenticateUser(userName: String, finished:((_ password: String?) -> ())?) {
        let passwordItem = KeychainPasswordItem(
            service: KeychainConfiguration.serviceName,
            account: userName,
            accessGroup: KeychainConfiguration.accessGroup
        )
        do {
            let storedPassword = try passwordItem.readPassword()
            finished?(storedPassword)
        } catch {
            finished?(nil)
        }
    }
```
Đầu vào là username và đầu ra là password tương ứng với username đó. Các bạn có thể nhìn vào callback **finished**

* **a/**  Đăng nhập sử dụng Touch ID

```
let context = LAContext()
        guard context.canEvaluatePolicy(.deviceOwnerAuthentication, error: nil) else {
            return
        }
        guard let lastAccessedUserName = UserDefaults.standard.object(forKey: "lastAccessedUserName") as? String else {
            return
        }
        context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: lastAccessedUserName) { [weak self] (success, error) in
            if success {
                self?.loadPasswordFromKeychainAuthenticateUser(userName: lastAccessedUserName, finished: { (password) in
                    DispatchQueue.main.async {
                        let message = (nil == password) ? "An error occurred, login fail" : "Login success with pass: \(password!)"
                        self?.performSegue(withIdentifier: "PushTopViewController", sender: message)
                    }
                })
            }
        }
```
- Việc sử dụng touch id để check thì bạn lại cần check xem có support touchid không đã. Nếu có thì bạn sẽ lấy username ra và bắt đầu xác thực, thành công bạn sẽ load password ra theo method mình giải thích bên trên.
- Việc push bạn cần call trên main thread (các bạn chú ý cái này, nếu không sẽ xảy ra vấn đề lỗi được log ra console là việc sử dụng layout được chạy trên thread không phải main)

* **b/** Đăng nhập theo cách thông thường

```
    guard let userName = userNameTextField.text?.trimmingCharacters(in: .whitespaces), !userName.isEmpty else {
            // show error
            return
        }
        guard let password = passwordTextField.text?.trimmingCharacters(in: .whitespaces), !password.isEmpty else {
            // show error
            return
        }
        loadPasswordFromKeychainAuthenticateUser(userName: userName) { [weak self] (storedPassword) in
            DispatchQueue.main.async {
                let message = (password != storedPassword) ? "An error occurred, login fail" : "Login success with pass: \(password)"
                self?.performSegue(withIdentifier: "PushTopViewController", sender: message)
            }
        }
```
- Bạn chỉ cần load password và check so với password người dùng nhập vào thôi.
- Sau khi kiểm tra đăng nhập xong bạn hãy gửi kết quả qua màn hình kết quả đăng nhập nhé.

```
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if "PushTopViewController" == segue.identifier {
            let topViewController = segue.destination as? TopViewController
            topViewController?.message = sender as? String
        }
    }
```

# 4. Kết thúc ứng dụng và đánh giá.

- Các bạn có thể xem tại [Video demo sử dụng Touch ID để đăng nhập ứng dụng](https://youtu.be/Qn_NfJPXag4)
- Trên đây là video mình thực hiện demo và upload youtube các bạn có thể xem.
- Nhìn vào video thì việc đăng nhập bằng TouchID đơn giản hơn rất nhiều so với kiểu đăng nhập truyền thống đúng không?

Tổng kết: Mình xin phép kết thúc bài viết ở đây. Các ơn các bạn đã đọc.