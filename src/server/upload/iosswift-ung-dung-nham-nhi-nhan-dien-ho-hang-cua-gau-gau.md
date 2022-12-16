## DogDetector (1 phút quảng cáo) ##
**Bạn là người yêu chó**, nhưng tình yêu vốn mù quáng, bạn k thể phân biệt nổi con này giống gì, tuy bạn vẫn ăn nó mỗi tuần

**Crush của bạn yêu chó**, tất cả những gì bạn cần là bắt đầu làm quen bằng 1 câu chuyện liên quan tới con vật đầy ngon lành kia để có 1 kết thúc đẹp với 1 món hải sản khác ngon hơn.

![](https://images.viblo.asia/afd0a3a8-b8d2-4613-88ae-5e812edbc95d.jpg)

**Tất cả những gì bạn cần** chỉ là 1 con iPhone (**iOS 11 trở lên**) 

> _ "Nhưng **+** ơi, chúng ta lấy đâu ra tiền mà mua?"  - **Vinh nhổn** said (tên nhân vật đã bị mã hóa để tránh làm ảnh hưởng đời sống cá nhân)
> 
> _ "Đây, tiền đây" (bài viết mang tính học thuật cao siêu + nghiêm túc nên hệ thống đã tự động xóa ảnh 2 ngón tay)

(nói rồi tôi dẫn anh tới dịch vụ cầm thận **Tuấn tài chính**) (lưu ý tên dịch vụ đã bị che mờ, nhưng dịch vụ này hết sức uy tín, đặc biệt là vào mùa **iPhone** mới)

**Mảnh ghép cuối cùng mà bạn còn thiếu để dẫn tới thành công** không khó hiểu khi nó không phải là Grab (để đi từ Đê La Thành xuống) mà chính là **DogDetector** - Ứng nhận nhận dạng chó hàng đầu Việt Nam

- **DogDetector** - Mang chó đến gần nhau hơn
- **DogDetector** - Nhận diện chó trước khi nó cắn bạn
- **DogDetector** - Nhận diện chó trước khi nó vào nồi
- **DogDetector** - Nhận diện chó nhanh hơn cả cách crush của bạn lấy chồng

##### Các bạn đi Exciter (135cc, 150cc, ...) vui lòng không sử dụng ứng dụng vào trong công việc #####

## Start ##
Phần này nặng về kỹ thuật nên những gì bạn cần chỉ là download (https://github.com/quocnb/DogDetector/archive/1.0.0.zip) về chạy cho lẹ. 

Mọi trường hợp nhận vơ (Anh tự làm cái này, bố anh mới mua cái này 1 tỉ ...) hay copy code đều được chấp nhận mà không cần xin phép. 

**Vì lười nên code k theo 1 chuẩn convention nào, copy paste mọi lúc mọi nơi, vui lòng không làm theo dưới bất kỳ hình thức nào**

#### Prepare ####
- Swift 4.1
- Device (hoặc Simulator cũng được, vì phần này chưa cần support Realtime Detect) **iOS 11 trở lên**
- Vào đây để tick sao cho tác giả model  https://github.com/jamesrequa/Dog-Breed-Classifier
- Đọc thêm về `Vision` để biết nó k phải là tên xe của Honda https://developer.apple.com/documentation/vision
- Cho 1 số bạn thích tự code (down đi cho lẹ, code làm gì cho mệt)  https://www.raywenderlich.com/164213/coreml-and-vision-machine-learning-in-ios-11-tutorial
#### Ngắn gọn về DogBreadModel ####
Bạn chỉ cần hình dung đơn giản rằng, `DogBreadModel` này là 1 cái vùng kín. Việc của chúng ta là cho 1 cái **ảnh `"gâu gâu"`** vào, và nhận kết quả là **1 tên gọi hết sức khoa học** về chó (hay còn gọi là `giống chó`). 

Nếu bạn có hứng thú tìm hiểu sâu hơn vào vùng kín thì có thể tìm đọc cái bài viết về nhận diện ảnh (mà bài đơn giản nhất là nhận diện chữ số viết tay từ ảnh) trên chính Viblo.

#### Nhận diện  #####

##### 1. Tạo model #####
Việc tạo ra 1 `model` nhận diện chó là hết sức phức tạp và vất vả. 

Người ta:
>- Thu thập dữ liệu (lên tới hàng GB ảnh)
>-  Tạo nhãn cho từng ảnh (lên tới hàng nghìn ảnh)
>-  Tạo model detect
>-  Convert sang mlmodel

Bạn :
>- Download -> Kéo thả vào project.

Xem qua em nó 1 chút xem mình vừa ném cái gì vào Project
![](https://images.viblo.asia/5d3914ef-1fa7-4433-8650-7758fd6a0992.png)

*Một số thông tin quan trọng*
- Model này của bác `James Requa` (cảm ơn anh đã tặng cho đời 1 món quà tuyệt vời), mọi thông tin về License vui lòng qua github (của bác ấy) để xem
- Model nhận diện được 133 loài
- Input để nhận diện phải là color image, size (224x224)
- Output : Tên loài và Dictionary` [loài: tỉ lệ]`  -> ở đây chúng ta sẽ chỉ lấy kết quả `classLabel` (là phần từ có % lớn nhất trong `classLabelProbs`

##### 2. Apply model to project #####
Để đỡ phức tạp, đầu tiên chúng ta sẽ add 1 cái ảnh test vào
![](https://images.viblo.asia/d64de79c-7616-49ee-a6b3-26621988d40d.jpg)

Một người đam mê ẩm thực về chó như tôi cũng không thể biết đây là loại gì, nên tôi sẽ nhờ model làm việc này

```Swift
// Dont forget to import framework
import CoreML
import Vision
```

Detect `Dog Bread` từ ảnh đầu vào qua 4 bước đơn giản
1. Khởi tạo (đọc) model
2. Tạo request. Request sẽ nhận output từ model và trả về dưới dạng `closure`
3. Khởi tạo input (dưới dạng cgImage)
4. Ghép input và output

```Swift
@IBAction func didSelectDetectButton(_ sender: UIButton) {
    guard let cgImage = self.imageView.image?.cgImage else {
        print("No image?")
        return
    }
    // 1
    guard let model = try? VNCoreMLModel(for: StudentDogModel().model) else {
        print("can't load Places ML model")
        return
    }
    // 2
    let request = VNCoreMLRequest(model: model) { [weak self](request, error) in
        if error != nil {
            print(error?.localizedDescription)
            return
        }
        let result = request.results as? [VNClassificationObservation]
        // TODO: Display to label
        print(result?.first)
    }
    // 3
    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    // 4
    DispatchQueue.global(qos: .userInteractive).async {
        do {
            try handler.perform([request])
        } catch {
            print(error)
        }
    }
}
```

OK, và kết quả là

```Swift
6441EAF0-1BD8-4ACF-B168-2E0F26FF03EE 0.998094 "Golden_retriever" (0.998094))
```
![](https://images.viblo.asia/606915f7-f3d2-4a24-a084-2b4683266dd4.jpeg)

Google con `Golden retriever` thì thấy cũng giống giống (có khi đúng, tận 99% cơ mà).
Vì không rõ chó này là loại gì nên tôi cho nó là đúng rồi nhé. 

##### 3. Testing #####

Chúng ta sẽ mở rộng phạm vi test bằng việc cho phép chọn ảnh từ `Photos Library`
```Swift
@IBAction func didSelectChooseImage(_ sender: Any) {
    let imagePicker = UIImagePickerController()
    imagePicker.sourceType = .photoLibrary
    imagePicker.delegate = self
    self.present(imagePicker, animated: true, completion: nil)
}
 
extension ViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        guard let image = info[UIImagePickerControllerOriginalImage] as? UIImage else {
            return
        }
        self.dismiss(animated: true) {
            self.resultLabel.text = ""
            self.imageView.image = image
        }
    }
}

```
```Swift
// Change in //TODO: to display result to label
guard let result = (request.results as? [VNClassificationObservation])?.first else {
    print("can not detect")
    return
}
DispatchQueue.main.async {
   self?.resultLabel.text = "Detected: " + result.identifier
}
```
![](https://images.viblo.asia/05873528-0d43-4ec2-b9ea-a47dd6928e43.jpg)
Mọi việc có vẻ ổn với hàng loạt các chú "gâu" được đưa lên bàn test, cho đến khi tôi lỡ tay ấn nhầm ảnh thần tượng của mình 

![](https://images.viblo.asia/2dfa2625-3ef3-4adb-b848-5a4ff3b53b85.jpg)

Wait. What. `American_eskimo_dog`. Are you fucking kidding me?

![](https://images.viblo.asia/3b87a2ef-afa4-4698-872a-c463cb2c8515.jpg)


Sau 1 tháng trời tức giận bỏ app, tình cờ đọc 1 bài báo trên mạng, tôi mới nhận ra. Thì ra ứng dụng này k phải antifan, nó đơn giản chỉ là
1. Phân tích ảnh đầu vào thành 1 mảng các pixel
2. Sử dụng mảng pixel trên làm input cho thuật toán đã được đào tạo từ trước.
3. Trả về kết quả là 1 mảng các label và % trùng khớp (chính là cái `classLabelProbs`)

Do đó, với 1 cái ảnh bất kỳ (không chỉ là ảnh người yêu cũ của bạn) nó vẫn trả về tên 1 loài chó. Quả nhiên là 1 **ứng dụng nhảm nhí**.

Để giảm thiểu tối đa sự nhảm nhí của ứng dụng, chúng ta sẽ tiến hành filter input trước khi đưa vào detect

#### 4. Điều chỉnh đầu vào ####
Vì `Dog Bread Model` của chúng ta chỉ đơn giản là nhận diện các giống chó, nên chúng ta phải thêm 1 bước bổ sung để check xem nó có phải là chó hay không để giảm sự nhảm nhí của ứng dụng.

Để đơn giản hóa bước này, chúng ta có thể sử dụng sẵn 1 trong số các `MLModel` sẵn có  [ở đây](https://developer.apple.com/machine-learning/). 

Trong phạm vị bài này, chúng ta sẽ sử dụng `Resnet50`.

Chúng ta sẽ sửa lại code 1 chút để tiến hành nhận diện `"gâu gâu" or not "gâu gâu"` trước :
```Swift
// Phần này dễ các bạn tự làm đi nhé, 
// đừng như tôi, chỉ copy paste lại cái ở trên
// hãy refactor code nhé
```

Nếu bạn vẫn chưa làm được, hint đây
```Swift
// 1. Get the first result that detected by Resnet50
// 2. List all dog-able label of Resnet50
// 3. Check if result at 1 is belong to list at 2 -> detect by Dog Model
```


Sau khi điều chỉnh, chúng ta đã đạt được kết quả 
![](https://images.viblo.asia/da6b70b8-06d0-4796-80eb-238cf96b15c8.jpg)


**NOTE**

Trong quá trình sử dụng, ứng dụng sẽ có các sự nhầm lẫn nên vui lòng không blame tác giả =))

- Bản thân model sẽ có sai số nhất định dẫn tới kết quả sai
- model nhận diện này chỉ hữu hạn trong phạm vi kha khá (nhưng không đầy đủ) các giống chó (chính xác là **133** loại), do vậy, sẽ có những giống chó không có trong danh sách dẫn tới kết quả nhầm lẫn. 
- Không nhận diện ảnh chó manga, anime ... vì nó không phải chó

## Nâng cao / Self-training ##

### Nâng cao level 1: Realtime support ###
Bạn không thể mỗi lần như thế lại chụp ảnh để nhận diện được, hãy nhận diện realtime (Phần 2 chăng)

### Nâng cao level 10: Nhận diện chó (sau khi đã qua chế biến 7 món)
Hướng dẫn nâng cao :
1. Mua iPhone X
2. Gọi bạn ra quán thịt chó, khao máy mới
3. Mở ứng dụng **DogDetector**
4. Hỏi bạn nhậu tên chó để cho ra 1 kết quả chính xác nhất
 
*(Vui lòng không sử dụng ứng dụng để nhận diện bạn nhậu)*

### Nâng cao level 100 : Nhận diện người yêu cũ, người bạn cũ vay tiền chưa (không) trả .... ###
Ứng dụng có thể gây mất đoàn kết nội bộ, vui lòng không tiến hành nghiên cứu hay thực hiện dưới bất cứ hình thức nào. 

## Kết ##

Cạch **DogDetector** - Mang chó đến gần nhau hơn
 
 
  ## ##
- *Tất cả tên nhân vật trong bài đều đã bị bôi đen, mã hóa, thay đổi*
- *Exciter để thõa mãn đam mê tốc độ, không phải để hành nghề*