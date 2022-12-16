## Đầu tiên.
Upload từ UIImagePickerController bạn sẽ cần một file data từ Image Picker.

Đầu tiên bạn sẽ cần ```UIImagePickerControllerDelegate ``` , ```UINavigationControllerDelegate```  và thêm ```Privacy-Photo Library Usage Description ``` trong file info.plist.

Trước khi gọi function imagePickerController, bạn cần thêm delegate UIImagePickerController bên trong function của bạn. Ví dụ mình có một function ```handleProfilePicker```

```Swift
func handleProfilePicker() {
    let picker = UIImagePickerController()
    picker.delegate = self
    picker.allowsEditing = true
    ....(your custom code for navigationBar in Picker color)
    self.present(picker,animated: true,completion: nil)
}
```

Sau khi thêm delegate bạn có thể gọi function ```imagePickerController didFinishPickingMediaWithInfo``` . Function này để giữ file image từ thư viện photo của bạn

```Swift
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
}
```

Mình có một đoạn code mẫu khi hoàn thành việc chọn ảnh từ picker để xử lý giá trị Image được *edit* và chưa *edit*:

```Swift
func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
  var selectedImage: UIImage?
  if let editedImage = info["UIImagePickerControllerEditedImage"]   as? UIImage {
      selectedImage = editedImage
  } else if let originalImage = info["UIImagePickerControllerOriginalImage"] as? UIImage {
      selectedImage = originalImage
  }
  if let selectedImages = selectedImage {
  ....
  }
}
```

Sau khi thành công chọn ảnh từ picker, việc thứ hai là biết data images. UIImageJPEGRepresentation sẽ return image được chọn từ picker thành JPEG image và nén nó lại 

```Swift
if let data = UIImageJPEGRepresentation(selectedImages,1) {
}
```

## Parameters
Chúng ta sẽ upload image từ picker khi yêu cần cần có asscess token

```Swift
if let data = UIImageJPEGRepresentation(selectedImages,1) {
   let parameters: Parameters = [
   "access_token" : "YourToken"
   ]
   // You can change your image name here, i use NSURL image and convert into string
   let imageURL = info[UIImagePickerControllerReferenceURL] as! NSURL
   let fileName = imageURL.absouluteString
   // Start Alamofire
   Alamofire.upload(multipartFormData: { multipartFormData in 
   for (key,value) in parameters {
        multipartFormData.append((value as! String).data(using: .utf8)!, withName: key)
   }
   multipartFormData.append(data, withName: "avatar", fileName: fileName!,mimeType: "image/jpeg")
  },
  usingTreshold: UInt64.init(),
  to: "YourURL",
  method: .put,
  encodingCompletion: { encodingResult in 
  switch encodingResult {
    case .success(let upload, _, _):
          upload.responJSON { response in
          debugPrint(response)
          }
    case .failure(let encodingError):
         print(encodingError)
    }
  })
 } 
```


-----

Đảm bảm key của bạn trong tham số cùng với sever và tất nhiên tham số ```withName``` trong multipartFormData là giống nhau.
Mình hi vọng bạn sẽ thành công upload ảnh từ picker với ```Alamofire```

Source: https://medium.com/@hanifsgy/alamofire-multipart-with-parameters-upload-image-from-uiimagepickercontroller-swift-a4abada24ae