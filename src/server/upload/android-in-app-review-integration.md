Chào mọi người,
Hôm nay mình sẽ giới thiệu cho mọi người 1 API của Google, đó là In-App Review :D

Ok nó đây
![](https://images.viblo.asia/a363abde-477e-412f-99c9-75a140a124c3.png)
Mình thấy có 1 vài bài có nói về cái này rồi, nhưng hầu như là dịch từ trang khác qua.
Cái này thì mình cũng đã implement rồi, nên hôm nay mình sẽ nói bằng kinh nghiệm của mình.

Ok, đầu tiên thì implement thư viện vô.
```
app/build.gradle 
implementation "com.google.android.play:core:1.8.0"
implementation "com.google.android.material:material:1.3.0-alpha02"
```

Tiếp theo, init Review flow, get được reviewInfo.
Thường thì đoạn này sẽ run trước, để khi mình muốn show dialog lên, nó sẽ mượt hơn, không bị delay màn hình
```
private var manager: ReviewManager? = null
private var reviewInfo: ReviewInfo? = null
private fun initReviewFlow() {
        manager = ReviewManagerFactory.create(context!!)
        val requestFlow = manager?.requestReviewFlow()
        requestFlow?.addOnCompleteListener { request ->
            if (request.isSuccessful) {
                reviewInfo = request.result
            } else {
                logError(request.exception)
            }
        }?.addOnFailureListener { e ->
            logError(e)
        }
    }
```

Sau khi init xong, có được reviewInfo rồi thì mình sẽ gọi để show Dialog lên, mình sẽ giải thích trong comment nha
```
    private fun launchReviewFlow() {
        if (reviewInfo != null) {
            val flow = manager?.launchReviewFlow(activity!!, reviewInfo)
            flow?.addOnCompleteListener {
            //Nếu mọi thứ OK, và nhận về isSuccessful thì Dialog đã hiển thị lên rồi
                if (!it.isSuccessful) {
                    logError(it.exception) *1
                }
            }
            flow?.addOnFailureListener { e ->
                logError(e) *2
            }
        }
    }
```
Ở 2 errors *1 và *2, các bạn có thể show 1 custom dialog hoặc thông báo gì đó chẳng hạn. Tùy yêu cầu

Code thì đơn giản vậy thôi ha, cái khó nhất của phần ni là testing.
Có những yêu cầu như sau:
1. Phải build app và up lên GG play, các bạn có thể dùng chức năng  Internal Testing hoặc Internal App Sharing để test
2. Account rating phải là account đã từng download app, và chưa rating app này lần nào cả
3. Account rating phải là account chính của device

Các bạn tham khảo thêm cách test ở đây nha. 
https://developer.android.com/guide/playcore/in-app-review/test


Thanks, chúc các bạn thành công.