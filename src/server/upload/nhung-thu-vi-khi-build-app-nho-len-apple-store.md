> Chắc hẳn đối với những iOS kì cựu cũng như iOS non tơ thì cũng đã đang và sẽ phát triển một app cho riêng mình để có thể đẩy lên store apple đúng không ạ?

> Nay mình cũng chia sẽ những thú vị, thách thức và khó khăn khi phát triển một app cá nhân.

> Bài viết chủ yếu là dành cho các newbie mới tập tễnh code chứ các bác pro rồi thì gạch đá nhẹ tay.

# Xây dựng app.
> Mình sẽ xoay quanh một app đơn giản giống như các app hỏi troll trên store gồm:

- Đưa ra câu hỏi
- Đưa cho 4 đáp án cho người dùng trả lời
- Kiểm tra đúng sai khi người dùng trả lời.
- Trả lời đúng thì next câu hỏi.
- Trả lời sai thì trừ điểm với điểm được cho sẵn mỗi khi cài app là X điểm.
- Có 3 sự trợ giúp là share Facebook - không bị trừ điểm, 50-50 bị trừ điểm, và bỏ qua cũng bị trừ điểm.

> Một app rất đơn giản đúng không nào. 

> Đọc qua thấy rất easy nhưng mà đối với mình cũng sinh ra một đống việc cũng chẳng nhẹ nhàng gì cho lắm từ xử lý dữ liệu, logic cũng như UI cũng đủ mệt và đủ lười đối với mình rồi =))

# Chuẩn bị
> Với một yêu cầu project thế kia thì chúng ta cần chuẩn bị những gì để có thể phát triển ???

## Cơ sở dữ liệu
> Các bạn có băn khoăn chúng ta sẽ lưu cơ sở dữ liệu ở đâu chưa ??? 

### Firebase
> Trong đầu mình loé ngay ra ý tưởng đó là lưu ở firebase. Vậy tại sao lại lưu ở firebase ?

**Ưu điểm**
- Thứ nhất: Firebase là database online mà chúng ta có thể sửa đổi mà không cần build lại app.
- Thứ 2: Chúng ta dễ dàng phát triển thêm các tính năng online sau này như đăng nhập, bảng xếp hạng, thay đổi config app ....
- Thứ 3: Có thể config offline.
- *Giảm dung lượng app build do không phải lưu ở local.*

> Việc giảm dung lượng thì mình không chắc chắn 100%

> Bởi vì app mình build tuy rằng code không là bao nhưng việc sử dụng thư viện thứ 3 khiến app có dung lượng rất cao. Và mình cũng lười chưa có time để xem và giảm dung lượng =))

> Tuy nhiên về mặt lý thuyết mình nghĩ việc sử dụng firebase sẽ làm giảm dung lượng app. 

> Còn nếu dung lượng app của việc sử dụng thư viện còn lớn hơn việc lưu local thì chắc mh sẽ chuyển qua local thôi =))

**Hạn chế**
- App phải có mạng để có thể request đến firebase database. Tuy nhiên có thể khắc phục bằng cách config offline.

Mình nghĩ đây là điểm hạn chế lớn nhất của firebase so với việc sử dụng local trong ứng dụng này nói riêng.

> Rồi chúng ta đã xong phần chọn cơ sở dữ liệu rồi. Vậy đến cấu trúc cơ sở dữ liệu thì sao nhỉ ????

### Cấu trúc lưu trữ - Data của app.
- Việc này cũng đau đầu không kém việc lựa chọn cách lưu data là mấy. Ví dụ như:
- Cấu trúc lưu trữ như nào? Tại sao ư? Nếu bạn chưa có kinh nghiệm với firebase như mình thì nó thực sự là một vấn đề lớn và cũng ảnh hưởng rất nhiều đến tính năng app của bạn.

- Như ban đầu mình làm là sẽ có *Level*. Bên trong level sẽ có list *question* và bên trong 1 question sẽ có list *answers*. Vì mh nghĩ sẽ quản lý app câu hỏi theo level. 
- Tuy nhiên, sau đó mình nghĩ lại là quản lý level lại phức tạp hơn nhiều từ *query data, phân loại level, sắp xếp câu hỏi, next level....*. Ti tỉ thứ phải nghĩ và code. Thế là mình bỏ level đi và chỉ còn list *questions* thôi.

> Cái này thuộc về tư duy app cá nhân của bạn nên đôi khi khó khăn của mình chưa chắc đã là khó khăn của các bạn.

> Hãy tự nghĩ cho mình cấu trúc data phù hợp nhất với bạn.

> Mình sẽ chia sẻ cấu trúc data mà mình đang lưu trữ như sau:

```
{
  "questions" : [ {
    "answers" : [ {
      "id" : 1,
      "name" : "Đôi mắt"
    }, {
      "id" : 2,
      "name" : "Chuyện ấy"
    }, {
      "id" : 3,
      "name" : "Ngoái mũi"
    }, {
      "id" : 4,
      "name" : "Ăn trứng vịt lộn"
    } ],
    "id" : 1,
    "question" : "Trên lông dưới lông \n. Tối lồng làm một. \n Là cái gì?",
    "suggest" : "Này này. Cấm nghĩ bậy",
    "true_answer" : 1
  }, {
    "answers" : [ {
      "id" : 1,
      "name" : "Chuyện ấy"
    }, {
      "id" : 2,
      "name" : "Mút kem"
    }, {
      "id" : 3,
      "name" : "Ăn mía"
    }, {
      "id" : 4,
      "name" : "Đánh răng"
    } ],
    "id" : 2,
    "question" : "Hai tay bưng lấy khư khư \n Bụng thì bảo dạ rằng ư đút vào \n Đút vào nó sướng làm sao \n Rập lên, rập xuống nó trào nước ra \n Làm gì?",
    "suggest" : "Những đứa đầu óc đen tối thì cũng ra trò đấy.",
    "true_answer" : 3
  }]
}
```

### Code query Firebase
> Có cấu trúc data rồi giờ thì query thôi chứ nhỉ :v: 

> Với request Firebase mình sử dụng singleton design pattern request như sau:

```
import Foundation
import FirebaseDatabase
import ObjectMapper
import FirebaseStorage

private struct Constants {
    static let errorMappingLevel = "Mapping level fail"
    static let errorMappingQuestion = "Mapping questions fail"
}

struct ResponseError {
    var errorCode: ApiErrorResponse?
    var message = ""

    init(errorCode: ApiErrorResponse = .errorMapping, msg: String = "") {
        self.errorCode = errorCode
        self.message = msg
    }
}

enum ApiErrorResponse: Int {
    case errorFirebase
    case errorMapping
}

class FirebaseManager {
    static let shared = FirebaseManager()
    private var ref: DatabaseReference!
    private var storageRef: StorageReference!

    private init() {
        ref = Database.database().reference()
    }
    
    func getQuestions(idNextQuestion: Int, limit: UInt = 50, success: (([QuestionModel]) -> Void)?, fail: ((ResponseError) -> Void)?) {
        self.ref.child("questions")
            .queryOrdered(byChild: "id")
            .queryLimited(toFirst: limit)
            .queryStarting(atValue: idNextQuestion, childKey: "id")
            .observeSingleEvent(of: .value, with: { snapshot in
                Log.debugLog("Result: \(String(describing: snapshot.value))")
                guard let arrJson = snapshot.value as? [Any] else {
                    fail?(ResponseError(errorCode: .errorMapping, msg: Constants.errorMappingQuestion))
                    return
                }
                var questionsJson = [[String: Any]]()
                arrJson.forEach({ item in
                    if let json = item as? [String: Any] {
                        questionsJson.append(json)
                    }
                })
                let questions = Mapper<QuestionModel>().mapArray(JSONArray: questionsJson)
                success?(questions)
            }) { error in
                fail?(ResponseError(errorCode: .errorFirebase, msg: error.localizedDescription))
            }
    }
}

class Log {
    static func debugLog (_ log: String) {
        print(log)
        print("\n")
    }
}
```

### Build UI 
> Xong data rồi. Thế giờ build UI thế vẹo nào ta ??? 

> Vấn đề đau đầu lại nảy ra :v. Bạn sẽ sắp xếp UI làm sao trông app chuyên nghiệp, đẹp mà không quá lỗi thời so với các app trên store hiện tại =))

> Thực chất nếu bạn là dev không có tý thẩm mĩ về app design như mình thì thực sự bạn sẽ mất 2-3 ngày không biết làm gì vì không có design mà code đấy :v: 

**Giải quyết**
- Mình đã mất khoảng 2 - 4 ngày để ngồi tìm khắp store, google để kiếm design mình cảm thấy tương thích.
- Cuối cùng mình đã tự thiết kế app trên *sketch (trên mac)* nhìn gọi là tạm ổn so với mình =))

![](https://images.viblo.asia/14f137a4-2f99-46ee-95e3-e2668b96b18b.png)

> Đấy nó đấy =)) Bạn nhìn thấy nó cũng đơn giản đúng không nào =)).

> Hãy thử làm đi rồi bạn sẽ tìm ra vấn đề của mình :v 

> Đến đây mới thấy nghề design cũng khá là vất vả và đau đầu đấy =))

### Code Main Screen.
> Rồi rồi! Data có rồi, design có rồi thế giờ code thôi chứ làm gì.

> Bạn hãy dựa vào những logic bạn đã vạch ra để code. Cứ tằng tằng mà code thôi. Những điều khó khăn ban đầu cũng đã được giải quyết rồi cơ mà.

**Khó khăn**
- Khó khăn nhất ở màn này đó là logic trả lời câu hỏi đúng và sai. Mình giải quyết bằng cách sử dụng **UITableview** để xử lý hiển thị cũng như xử lý lựa chọn của người dùng. Đó là cách của mình.
- Còn bạn đương nhiên có thể xử lý cách nào bạn cảm thấy tốt nhất như dùng luôn 4 button chẳng hạn. Chẳng sao cả. Miễn là bạn cảm thấy dễ dàng.
- App của mình còn có 1 chức năng nữa là shareFacebook. Khó khăn phần này đó là chụp màn hình và xử lý config FacebookApp để có thể shared sử dụng API của Facebook.

Mình sẽ chia sẻ một chút code shared facebook ở đây. Vì nếu share của màn main thì vừa dài và bạn chắc gì đã đọc đến đây =))

> Code share facebook

```
import Foundation
import FacebookShare

class FacebookShareManger {
    static let shared = FacebookShareManger()

    private init() {}

    func sharedPhoto(urlStore: String, viewController: UIViewController,
                     completion: (() -> Void)?, fail: (() -> Void)?) {
        guard let screenShot = UIApplication.shared.screenshot else {
            self.sharedPostLinkText(urlStore: urlStore, completion: completion, fail: fail)
            fail?()
            return
        }
        let photo = Photo(image: screenShot, userGenerated: true)
        let content = PhotoShareContent(photos: [photo])
        do {
            try ShareDialog.show(from: viewController, content: content, completion: { result in
                switch result {
                case .success:
                    completion?()
                default:
                    fail?()
                }
            })
        } catch {
            self.sharedPostLinkText(urlStore: urlStore, completion: completion, fail: fail)
        }
    }

    func sharedPostLinkText(urlStore: String, completion: (() -> Void)?, fail: (() -> Void)?) {
        guard let url = URL(string: urlStore) else {
            fail?()
            return
        }
        let content = LinkShareContent(url: url)
        let shareDialong = ShareDialog(content: content)
        shareDialong.mode = .automatic
        shareDialong.failsOnInvalidData = true
        shareDialong.completion = { result in
            switch result {
            case .success:
                completion?()
            default:
                fail?()
            }
        }
        do {
            try shareDialong.show()
        } catch {
            fail?()
        }
    }
}
```

> Code ScreenShot

```
extension UIApplication {
    var screenshot: UIImage? {
        UIGraphicsBeginImageContextWithOptions(UIScreen.main.bounds.size, false, 0)
        guard let context = UIGraphicsGetCurrentContext() else { return nil }
        for window in windows {
            window.layer.render(in: context)
        }
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return image
    }
}
```

> Rồi rồi. Cũng kha khá rồi đấy nhỉ. Bạn đã hoàn thành được phần nào chưa :V 

## Admod - Google ads - Add quảng cáo.
> Vâng chắc hẳn bạn tự hỏi: "Mịa app thì chưa có gì đòi đặt quảng cáo rồi?".

> Nhưng hãy có tư tưởng vừa làm vừa học. Nếu bạn không làm thì bao giờ mới làm??

**Tài liệu**
- Việc add quảng cáo bạn search sẽ ra rất nhiều như tài liệu của google cũng rất sẵn sàng.
- Nếu bạn chưa có kinh nghiệm việc add quảng cáo thì cũng hơi khó khăn 1 chút trong việc quản lý và test quảng cáo. :v Hãy cố gắng nhé. 
- Nếu gặp khó khăn bạn có thể comment ở dưới. Mình biết mh sẽ trả lời =)) Hehe ^^!

## Lần đầu làm chuyện ấy. Đẩy app lên appleStore. Kết quả: Rejected =))
> Sau hòm hòm chức năng thì mh quyết định mượn tài khoản của 1 anh cũng công ty đẩy thử lên appleStore.

> Dưới sự hướng dẫn của anh thì mình cũng đẩy được 1 lần lên cho apple review. Hehe ^^!

> Công đoạn này cũng khá là vất vả cho những bạn mới bắt đầu.

**Việc cần làm**
- Khó khăn lớn nhất chắc là tài khoản 99$ =)) 
- Đến đây thì Design lại lên ngồi =)) Bạn cần gì? Cần một cái Icon App xịn xò =)). Lại đau đầu thiết kế IconApp sao bây giờ? :v Cái này lại tự bạn phải làm thôi. :v Chả ai giúp được bạn nữa. À có đấy. Đôla thần trưởng =)) Thuê design.
- Chụp màn hình. Vâng! Review app thì bạn cần chụp màn hình app để đẩy lên Apple review. Công đoạn mất nhiều time vãi chưởng =))
- Tuy nhiên công đoạn này bạn có thể sử dụng *fastlane* để auto hoá quy trình đẩy app. Tuy nhiên config cũng không kém phần nặng nhọc =)). Hãy thử đi. Bạn sẽ có kinh nghiệm sau này đây

**Kết quả**

> Rejected

=)) Vâng lần đầu được tận hưởng cảm giác *Rejected* =)).

**Lý do**
- App mang nội dung 18+ =)). Tại sao? Câu hỏi của mình mang tính chất 18+ đố troll nên bị reject luôn. Buồn quá buồn mà vẫn chưa sửa =)). Lười.
- Chức năng button không đúng mục đích. Có một số chức năng mình chưa làm nên để button và khi bấm vào chỉ alert lên thôi -> Bị reject luon. 

> Cũng kha khá rồi. Thôi chắc chia sẻ thế thôi nhỉ =)) Nếu lần sửa tới app lên store mh sẽ có bài review về việc tiếp tục phát triển app khi đã lên được store cho mọi người. 

> LƯỜI =))