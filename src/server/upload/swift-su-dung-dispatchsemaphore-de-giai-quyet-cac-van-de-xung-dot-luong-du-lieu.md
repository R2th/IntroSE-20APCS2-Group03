Swift: Sử dụng DispatchSemaphore để giải quyết các vấn đề xung đột luồng dữ liệu

Bài toán đơn giản: Lấy tất cả các video có dưới thiết bị và hiển thị chúng lên màn hình

Bước đầu, chúng ta sẽ tạo 1 function có tên là performGetLocalVideos  để thực hiện việc lấy videos  từ local, và giả sử ta đã có được 1 mảng các PHAsset

```
func performGetLocalVideos() {
	//do some code to get a [PHAsset]
	
	let  assets:[PHAsset]
}
```

Sau khi có được 1 mảng các PHAsset rồi thì chúng ta sẽ đi lấy thêm thông tin của từng assert để convert thành model với tên gọi là Video mà lưu lại dùng.

Ta sử dụng hàm sau của PHImageManager class để request từng asset.
```

open func requestAVAsset(forVideo asset: PHAsset, options: PHVideoRequestOptions?, resultHandler: @escaping (AVAsset?, AVAudioMix?, [AnyHashable : Any]?) -> Void) -> PHImageRequestID
```


Code bây giờ sẽ như sau

```
func performGetLocalVideos() {
	//do some code to get a [PHAsset]
	
	let  assets: [PHAsset] = PHAsset.fetchAssets(...)
	let manager = PHImageManager()
	var videos: [Video] = []
	for asset in assets {
        manager.requestAVAsset(forVideo: asset, options: nil, resultHandler: { (asset, _, _) in
            //convert asset to Video
            let video = convertedVideoFrom(asset)
            videos.append(video)

            NotificationCenter.default.post(name: NSNotification.Name.didGetLocalVideosSuccess,
                                                object: videos)

        })
    }
}
```

Đến đây, thì mọi thứ gần như là ngon lành và đạt đủ yêu cầu.  Bạn có thể resolve task và chuyển cho Tester

Sau khi đến tay Tester, khi trong máy chỉ có vài video thì mọi thứ đều hoạt động một cách ổn định, nhưng đến khi số lượng video nó tăng lên đến 1 lượng nhất định thì việc xử lý trở nên khó khăn, nặng nề hơn cho thiết bị và có nguy cơ dẫn đến crash app.

Nguyên nhân có thể sẽ không debug cụ thể được, mà chỉ nhận được 1 thông báo chung chung đại loại như “Terminate app because has memory issue”

Tìm đọc lại đoạn code trên thì ta nhận ra được rằng biến videos là 1 biến được khai báo ở ngoài vòng lặp for và sau mỗi lần request được 1 asset mới thì ta lại thay đổi giá trị của nó bằng lệnh append , mà ta đã biết rằng những block của lệnh request thì được gọi trên các luồng(thread) tuỳ chọn, thường là ở background.
 
 
Vậy, việc 1 biến bị thay đổi giá trị, hay nói cách khác là được truy xuất, ở các luồng khác nhau trong cùng 1 thời điểm thì sẽ làm cho hệ thống bị “bối rối” không biết chọn luồng nào, nên nó tắt luôn app cho khoẻ.

Vì thế, để giải quyết vấn đề tắt app đột ngột này thì chúng ta chỉ cần để biến videos này được truy xuất trên 1 luồng là được, và thứ được chọn là DispatchSemaphore. Chức năng của nó giống với ý nghĩa nói ở trên.

Tạo 1 semaphore
```

	let semaphore = DispatchSemaphore(value: 1)

```

Lưu ý số lần gọi *wait()* phải bằng với số lần gọi *signal()*, nếu không sẽ gây ra lỗi EXC_BAD_INSTRUCTION

Như vậy function của chúng ta sẽ là


```
func performGetLocalVideos() {
	//do some code to get a [PHAsset]
	
	let  assets: [PHAsset] = PHAsset.fetchAssets(...)
	let manager = PHImageManager()

    let semaphore = DispatchSemaphore(value: 1)

	var videos: [Video] = []
	for asset in assets {
        manager.requestAVAsset(forVideo: asset, options: nil, resultHandler: { (asset, _, _) in
            //convert asset to Video
            let video = convertedVideoFrom(asset)

            semaphore.wait()
            videos.append(video)
            semaphore.signal()


            NotificationCenter.default.post(name: NSNotification.Name.didGetLocalVideosSuccess,
                                                object: videos)

        })
    }
}
```


Vậy là xong,  bây giờ mỗi thời điểm access vào biến videos thì chỉ có 1 thread duy nhất được phép access vào và tất nhiên lỗi crash đó sẽ không xảy ra nữa.

Trong thực tế, DispatchSemaphore được áp dụng thường xuyên nhất là trong user authentication, lưu thông tin của session lúc register hoặc login.
Ví dụ: 
```

struct UserSession {
    let accessToken: String
    let refreshToken: String
    let expiredDate: String
}

func login() {
    let semaphore = DispatchSemaphore(value: 0)
    _ = API.login(input) { session in
        semaphore.wait()
        //Do: Save session(is UserSession) to local
        ...
        semaphore.signal()
    }
}

...
```
.

P/S: Bye bye, my lovely teammates.