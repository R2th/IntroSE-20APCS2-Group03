Chắc hẳn nhiều người cũng đã từng làm 1 ứng dụng trả lời Survey bằng việc sử dụng thư viện hay service bên thứ 3 như Google Form.

Nếu không có yêu cầu gì đặc biệt thì Google Form quả thực quá đủ. Nhưng mà để hiển thị kết quả Survey bằng realtime thì có lẽ Google Form không phải là sự lựa chọn hợp lý.

Vậy cùng xem các kĩ sư ZOZO đã tạo ra ứng dụng Survey realtime như thế nào nhé.

## Bối cảnh
[ZOZO](https://zozo.jp/) là 1 trang web bán hàng online gần như lớn nhất Nhật Bản. Công ty được thành lập vào năm 1998, đến nay đã đạt hơn 1000 nhân viên.

Đa số các công ty Nhật bản, họ thường tổ chức bữa tiệc tổng kết cuối năm để báo cáo tình hình tài chính, giới thiệu dịch vụ công ty đang vận hành đến toàn thể nhân viên.

Và ZOZO cũng vậy. Vào buổi tổng kết cuối năm, họ quay video giới thiệu về dịch vụ trong công ty. Và mỗi khi kết thúc 1 phần nào đó trong video, họ tổ chức 1 cái Survey thăm dò ý kiến của toàn bộ nhân viên, và sẽ hiển thị kết quả ra màn hình 1 cách realtime. Và cái Survey này sẽ được chèn vào giữa các đoạn trong video.

Đây là toàn bộ khung cảnh hội trường lúc đó. Công ty to có khác, hội trường trông hoành tráng quá.

![](https://images.viblo.asia/035a38b0-4870-4322-b8bf-97dc5d68616d.jpg)
![](https://images.viblo.asia/54950cb7-1030-432a-bc2a-c5786451bde6.jpg)
![](https://images.viblo.asia/e47d4f79-34b1-4bb3-8335-151013025308.jpg)
![](https://images.viblo.asia/1af062b5-4373-40c6-affd-b2b329394791.jpg)
![](https://images.viblo.asia/7eea6e9f-2d70-4eee-8c65-71497cc02b8a.jpg)

## Điều kiện khi thực hiện Survey
Trước buổi tổng kết 2 tuần thì đã nhận được 1 số request từ bên admin như sau:

* Ở hội trường sẽ thực hiện làm survey ở trên web 1 cách realtime, kết quả thống kê sẽ hiển thị ngay lập tức trên màn hình hội trường.
* Câu trả lời chỉ có YES hoặc NO
* Có khoảng từ 7 đến 8 câu hỏi
* Có thể trả lời thông qua smartphone bằng cách quét mã QR Code
* Muốn hiển thị kết quả trên màn hình hội trường với UI dễ nhìn, bắt mắt.
* Câu hỏi và câu trả lời sẽ thực hiện giữa các đoạn video.

## Hướng giải quyết
Sau khi nhận được 1 số request từ bên admin, các kĩ sư ZOZO đã đưa ra 1 số giải pháp như sau:

1. Dùng tool [Polly](https://www.polly.ai/) trên Slack, mọi người vào đó trả lời Survey. Rồi thông qua Slack API sẽ thống kê và hiển thị kết quả lên màn hình.
Ở công ty cũng có người không có account slack nên việc thực hiện là không thể. => Loại

2. Dùng 1 dịch vụ của bên thứ 3 chuyên về Survey đó là  [respon](https://respon.jp/biz/). Nhưng mà tool này lại không biết là có thể dễ dàng customize được hay không, với cả thời gian lần này chỉ có 2 tuần nên có thể sẽ không thể làm xong hoàn toàn được => Loại

3. Team Frontend đang vận hành [zozo](https://zozo.com/) sẽ đảm nhiệm. Vì team này đã từng có kinh nghiệm với Firebase, hơn nữa Firebase có thể thống kê kết quả realtime. Nên team đã quyết định chọn Firebase để giải quyết vấn đề này.

## Tổng kết lại điều kiện khi làm Survey
Sau khi chọn Firebase làm giải pháp chính, thì mình sẽ tổng hợp lại yêu cầu khi làm Survey như sau:

* Có tổng từ 7 đến 8 câu hỏi
* Chèn câu hỏi vào giữa các đoạn trong video
* Đáp án trả lời sẽ có 2 lựa chọn là YES và NO
* Có thể quyét mã QR code để hiển thị trang web Survey.
* Kết quả trả lời Survey sẽ được thống kê và hiển thị ra màn hình hội trường ngay lập tức
* Khi chuyển sang câu hỏi tiếp theo sẽ không reload lại page
* Việc thay đổi câu hỏi sẽ được thực hiện thông qua màn hình quản lý
* Trên smartphone chỉ được trả lời 1 lần duy nhất, và không thể xoá
* Thời gian trả lời câu hỏi là 15s (Thời gian hiển thị câu hỏi là 10s, còn 5s sẽ hiển thị count down)
* Kết quả sẽ hiển thị tỉ lệ phần trăm của YES/NO

## Những việc cần chuẩn bị
Để buổi tổng kết không có vấn đề gì xảy ra, các kĩ sư ZOZO đã tổng kết lại quy mô hệ thống và những việc cần thiết nên chuẩn bị như sau:

* Số lượng người tham gia: 1000 người
* Chuẩn bị mạng Internet có thể chịu được 1000 người
* Spec về độ phân giải màn hình: 1920×1080
* Số lượng màn hình: 4 màn hình
* Buổi hôm đó có thể demo được không? => Từ 15:00 có thể demo được từ 30~40p
* Thực hiện việc test tải hệ thống (với quy mô là 1000 người)
* Nếu có bug xảy ra thì làm thế nào? => Chuẩn bị 1 slide về toàn các câu hỏi, và nhờ mọi người làm trên đó.
* Thực hiện test việc hiển thị trên 1 số loại smartphone

## Công nghệ sử dụng
Vì team Frontend ZOZO quyết định tự build lấy nên họ đã quyết định chọn 1 số công nghệ dưới đây:

* Data Management:  [Firebase](https://firebase.google.com/)
* Frontend:  [Vuejs](https://vuejs.org/)
* Animation khi hiển thị kết quả:  [Tweenmax](https://greensock.com/tweenmax)

## Design màn hình
ZOZO đã chuẩn bị ra 3 màn hình:

1. Màn hình trả lời câu hỏi
* Mỗi người dùng sẽ trả lời câu hỏi trên smartphone
* Sẽ enable/disable màn hình khi câu hỏi bắt đầu và kết thúc

![](https://images.viblo.asia/67824236-8b11-464e-8e35-0468eb9a9239.png)

2. Màn hình kết quả

* Hiển thị câu hỏi và kết quả ra màn hình
![](https://images.viblo.asia/41a9af8c-3d3a-4444-ae2f-70256a0ee159.png)

3. Màn hình quản lý

* Màn hình dùng cho Admin thể thay đổi được câu hỏi
* Khi thay đổi câu hỏi thì cũng setting luôn thời gian kết thúc câu hỏi

![](https://images.viblo.asia/fa359ec8-4bcf-4e76-957c-093e0ea2eac8.gif)

## Setting Firebase
**Điều kiện**: Cần phải có tài khoản Google.

Đầu tiên cần login vào trong tài khoản Google, sau đó từ  [Firebase Console](https://console.firebase.google.com/) sẽ tạo ra 1 project.

* Nhập tên project
* Check vào những mục điều khoản sau đó ấn vào nút Create Project

![](https://images.viblo.asia/42ddbefd-bb70-4612-9067-d1142f57c1bc.png)

Sau khi tạo xong sẽ đi đến màn hình Project Dashboard.

Mặc định thì đang dùng Plan là Spark. Với ứng dụng nào ít request thì mình thấy plan này cũng đủ dùng.

Nhưng mà do quy mô lần này là 1000 người, nên để an toàn ZOZO đã quyết định dùng plan Blaze (Pay as you go – dùng đến đâu trả tiền đến đó)

## Setting FireStore
Tiếp theo mình sẽ đi cài đặt thằng FireStore.

Ở menu bên trái màn hình, chọn **Develop** -> **Database**

![](https://images.viblo.asia/ef73a63d-8862-480d-afe5-efc5ab670b09.png)

Về chỗ **Security rules**: Do lần này thực hiện ở trong công ty nên không cần để ý đến security cũng được. Do đó sẽ chọn **Start in test mode**.

Sau khi tạo xong thì 1 database (Giống như RDS) đã được tạo ra. FireStore là NoSQL nên không cần thiết phải tạo schema.

Bước tiếp theo mình sẽ liên kết với phần Web Application. Trong màn hình chính, chúng ta click vào cái nút </> ở trong hình ảnh bên dưới.

![](https://images.viblo.asia/af960e0d-46b2-4ca8-9ef8-d6264768f08a.png)

Và thực hiện theo các bước trong hình, cuối cùng chúng ta sẽ add cái đoạn javascript vào trong file src/main.js.

![](https://images.viblo.asia/06d4c33f-6b4e-4e93-a171-b71474de22da.png)

Do ở phía Application mình vẫn chưa tạo, ở đây mình sẽ tạo bằng VueJs. Về cách tạo ứng dụng VueJS ở trên mạng khá nhiều nên ở đây mình sẽ không nói lại nữa. Các bạn có thể Google để tìm hiểu nhé.

Sau khi có ứng dụng VueJS rồi thì bước tiếp theo là nhúng đoạn Javascript phía trên vào file src/main.js.

![](https://images.viblo.asia/f3045db6-396e-4a16-b06b-ee5f2ad22ebf.jpg)

## Setting Firebase Hosting
Về hosting của web application, ZOZO cũng quyết định dùng luôn hosting của firebase.

So với Firestore thì Firebase Hosting cài đặt khá đơn giản.

Ở menu, chọn **Develop** -> **Hosting**. Sau đó ấn vào nút **Get Started** và thực hiện 1 số câu lệnh ở bên dưới màn hình.

![](https://images.viblo.asia/28f073e8-1de0-46b3-9ff3-4ab5343e9282.png)
![](https://images.viblo.asia/e6a8a52c-c923-4739-b6e2-b65b040fc7d1.png)

```
$ firebase login
$ firebase init hosting
```

Sau khi thực hiện xong 2 câu lệnh trên thì chúng ta sẽ thấy 1 file được tạo ra đó là **firebase.json**. Trong file này thì **hosting.public** đó chính là đối tượng sẽ được deploy.

Nhưng do VueJS đang sử dụng webpack để build, và thư mục sau khi build xong là **dist** nên trong **firebase.json** chúng ta sẽ chuyển **hosting.public** thành **dist**. Cụ thể sẽ như sau:

```
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

Tiếp theo chúng ta cùng thực hiện deploy firebase nhé:
```
$ npm run build
$ firebase deploy
```

Sau khi deploy xong thì ở màn hình Hosting sẽ hiển thị ra domain đã được deploy, và có thể access được từ URL đó.

Vậy việc cài đặt Firebase đến đây là kết thúc.

## Liên kết màn hình với Firestore
Tiếp theo chúng ta đến bước liên kết màn hình web với firestore nhé.

Cấu trúc của FireStore sẽ đặt như sau:

* id của câu hỏi hiện tại
* thời gian kết thúc câu trả lời
* câu trả lời của người dùng

・Thực tế cấu trúc dữ liệu không phải dạng JSON, nhưng để dễ hiểu mình sẽ viết lại dưới dạng JSON
```
{
  "questions": {
    "current": {
      "id": 1, // id câu hỏi hiện tại
      "endTime": 1545906141 // thời gian kết thúc câu trả lời
    },
  },
  "votes": { // câu trả lời của mỗi người dùng
    "001EjYAwtSMXlrWWTP5r": { // (ID mà Firestore đã sinh ra)
      "answerId": 0, // id câu trả lời
      "questionId": 2 // id câu hỏi
    },
    "004gO0YzXUJ2bNFSbc5y": {
      "answerId": 1,
      "questionId": 3
    },
    .
    .
    .
  }
}
```

・Update dữ liệu tại màn hình kết quả
```
import firebase from 'firebase'
 
export default {
  .
  .
  .
  created() {
    // this.db = firebase.firestore()
    this.unsubscribe = this.db.collection('questions').doc('current')
      .onSnapshot((doc) => {
        const currentQuestion = doc.data()
        // =>
        //   {
        //     "id": 1,
        //     "endTime": 1545906141
        //   }
      })
  }
  .
  .
  .
}
```

・Câu trả lời của mỗi người dùng:

```
import firebase from 'firebase'
 
const db = firebase.firestore()
export default {
  .
  .
  .
  created() {
    // this.db = firebase.firestore()
    this.db.collection('votes').onSnapshot((collection) => {
      this.votes = collection.docChanges().reduce((votes, c) => {
        const vote = c.doc.data()
        // =>
        //   {
        //     "answerId": 0,
        //     "questionId": 2
        //   }
        return {
          ...votes,
          [vote.questionId]: [...(votes[vote.questionId] || []), vote]
        }
      }, this.votes)
      // =>
      //   {
      //     .
      //     .
      //     .
      //     "2": [ // thống kê dựa vào từng id của câu hỏi
      //       {
      //         "answerId": 0,
      //         "questionId": 2
      //       },
      //       .
      //       .
      //       .
      //     ],
      //     "3": [
      //       {
      //         "answerId": 1,
      //         "questionId": 3
      //       },
      //       .
      //       .
      //       .
      //     ],
      //     .
      //     .
      //     .
      //   }
    })
  }
}
```

Tại màn hình kết quả sẽ đi thống kê dữ liệu dựa vào từng id câu hỏi. Đối với dữ liệu của câu trả lời, để làm tối thiểu cost nên ZOZO đã sử dụng hàm docChanges() để chỉ lấy cái sự khác nhau của từng kết quả.

・ Ở màn hình Admin, sẽ tiến hành việc ghi dữ liệu câu hỏi vào trong FireStore

```
import firebase from 'firebase'
import moment from 'moment'
 
export default {
  .
  .
  .
  methods: {
    setQuestion() {
      db.collection('questions').doc('current').set({
        id: questionId,
        endTime: moment().add(questionTime, 'second').unix()
      })
    }
  }
  .
  .
  .
}
```

Ở màn hình Admin khi mà bắt đầu 1 câu hỏi, khi đó nó sẽ ghi question_id với endTime vào trong FireStore.

Sau khi ghi vào FireStore xong, ngay lập tức sẽ gửi thông báo đến toàn bộ smartphone và thời gian bắt đầu câu hỏi sẽ được bắt đầu. Và khi thời gian kết thúc, màn hình hiển thị câu hỏi sẽ bị mất đi và sẽ đi đến màn hình kết quả.

OK, vậy phần liên kết FireStore với màn hình đến đây đã xong.

Và đây là phòng điều hành buổi tổng kết. Nhìn đã thấy sự chuyên nghiệp rồi. Đúng là nước ngoài có khác. Họ làm gì cũng thấy chuyên nghiệp

![](https://images.viblo.asia/78073163-fc62-4211-ae72-d4caeb8d9114.jpg)

## Về Pricing của Firebase
Sau khi event kết thúc, vào màn hình Firebase để xác nhận xem mất bao nhiêu tiền.

**0.02$**

Làm đc 1 ứng dụng như vậy mà chỉ mất có 0.02$. Quá kinh khủng.

## Tổng kết
Nếu bạn nào đang có ý định làm 1 ứng dụng trả lời survey realtime thì có thể tham khảo bài viết này nhé.

Chúc các bạn thành công.

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

👉👉👉 [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.

Nguồn: https://nghethuatcoding.com/2019/05/04/zozo-da-tao-ung-dung-survey-realtime-xu-ly-1000-nguoi-dong-thoi-nhu-the-nao/