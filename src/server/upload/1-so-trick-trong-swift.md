## 1. Autosize UILabel
Bạn có 1 UILabel và bạn muốn linh hoạt mở rộng và thu gọn nội dung của textField như hình bên dưới:
![](https://images.viblo.asia/9937108e-1fbf-446e-a47d-20af47523161.png)
![](https://images.viblo.asia/c6d6ad14-33dd-4847-9143-5692dc184caa.png)

Trước tiên tạo 1 UILabel có các thuộc tính như sau :

![](https://images.viblo.asia/3b59cea2-4b7c-4f0c-b282-c66b8c9a3110.png)
![](https://images.viblo.asia/88fe3e84-d915-4955-8a2a-1cea7760f698.png)

UILabel ban đầu có 3 lines
Và đoạn code sau sẽ giúp mở rộng label khi bắt sự kiện ấn vào UILabel:
```
            self.descriptionLabel.numberOfLines = 0
            self.descriptionLabel.sizeToFit()
```
## 2. Upload image with multi params alamofire
Trong ứng dụng có chức năng update thông tin user, trong đó cần update cả avatar. Bạn cần dùng alamofire để upload avatar với multipart như sau:
```
func updateUserInfo(displayName : String, sex : Int, birthday : String, email : String, phone : String, avatar : Data) ->Promise<UserInfo> {
        let params : JSONDictionary = [
            "display_name" : "vungocduy126",
            "birthday" : "1993-06-12",
            "email" : email,
            "phone_number" : "0982637***",
        ]
        
        let fullUrl = self.baseURLString + EndPoint.Account.UpdateUserInfo
        
        return Promise<UserInfo> { seal in
            
            Alamofire.upload(multipartFormData: { (multipartFormData) in
                
                multipartFormData.append(avatar, withName: "avatar", fileName: "avatar.png" , mimeType: "image/png")
                for (key, value) in params {
                    multipartFormData.append((value as AnyObject).data(using: String.Encoding.utf8.rawValue)!, withName: key)
                }
            }, to: fullUrl, method: .post, headers: headers_Account) { (result) in
                switch result {
                case .success(let upload, _, _):
                    print("the status code is :")
                    
                    upload.uploadProgress(closure: { (progress) in
                        print("something")
                    })
                    
                    upload.responseJSON { response in
                        
                        switch response.result {
                        case .failure(let error):
                            seal.reject(error)
                            UIApplication.shared.topViewController()?.showAlertView(title: MS_TITLE_ALERT, message: self.getDisplayMessage(error: error), okTitle: "OK", cancelTitle: nil)
                            
                        case .success(let responseObject):
                            let dictionary = responseObject as! NSDictionary
                            let data = UserInfo(dictionary: dictionary["data"] as! Dictionary)
                            DataManager.shared.userInfo = data
                            seal.fulfill(data!)
                            break
                        }
                    }
                    break
                case .failure(let encodingError):
                    seal.reject(encodingError)
                }
            }
        }
    }

```

## 3. add static UITableView on UIViewController
Đôi khi bạn cần add 1 static UITableView vào trong UIViewController, tuy nhiêu static UITableView chỉ được sử dụng trong UITableViewController. Có 1 cách để chúng ta khắc phục điều này là chúng ta sẽ add 1 UITableViewController vào trong UIViewController thông qua Container View
![](https://images.viblo.asia/cd7a3e58-2c73-49aa-84ff-0f239d5484f4.png)
# Tổng kết
Trên đây là số trick trong quá trình làm học tập và việc mình đúc kết ra được, hy vọng sẽ giúp ích cho các bạn. Cảm ơn các bạn đã theo dõi. Hẹn gặp lại trong bài viết lần sau.