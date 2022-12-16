Trước tiên, để tiếp cận nhanh hơn với data model trong Firestore, hãy cùng ôn lại sơ qua về các kỹ thuật cơ bản trong NoSQL nhé.
# Một vài kỹ thuật cơ bản trong NoSQL
## Duplication
Lặp lại data là một kỹ thuật khá phổ biến để giảm thiểu việc phải đọc nhiều document. 
Lấy twitter làm ví dụ, chúng ta sẽ lưu username trong mỗi tweet doc để tránh tạo query thứ 2 đến collection user để lấy thông tin . Hoặc chúng ta có thể lặp lại 20 tweets gần đây nhất trong user document để hiển thị trong user profile. Kỹ thuật này sẽ giúp đọc nhanh hơn, nhưng việc ghi sẽ bị chậm hơn. Khi sử dụng chúng hãy cân nhắc nhé, chúng ta có thể đọc được tất cả data trong 1 document, nhưng phải update rất nhiều document khi data liên quan thay đổi.
## Aggregation
Tổng hợp data là quá trình phân tích một collection, và lưu kết quả trên document khác. Ví dụ đơn giản nhất là có thể lưu biến đếm count của tổng số document trong một collection. Đọc thêm về nó ở [đây](https://fireship.io/lessons/firestore-cloud-functions-data-aggregation/) 
## Composite Key
Key kết hợp hiểu đơn giản là sự kết hợp giữa 1 hoặc nhiều id để tạo ra 1 key duy nhất trong document, ví dụ `userXYZ_postABC`. Nó đặc biệt hữu dụng cho  những mô hình quan hệ vì nó sẽ thực thi một mối quan hệ duy nhất giữa 2 document.

## Bucketing
Bucketing là một dạng của duplication/aggregation, chia collection thành các phần nhỏ hơn. Lấy Twitter làm ví dụ, hãy tưởng tượng, chúng ta có collection `tweets` lưu trữ các tweet, nhưng  muốn truy vấn tweet của người dùng theo từng tháng. Cấu trúc như dưới sẽ giúp chúng ta truy vấn tweet với tháng cho trước rất thuận tiện, nhưng nhược điểm là chúng ta sẽ phải đảm bảo tất cả dữ liệu được đồng hộ hoá khi có cập nhật trên document cha. Ví dụ như khi sửa 1 tweet, thì lúc này sẽ phải cập nhật ở 2 document.

```
tweets/{tweetId}
  tweetData (any)

februaryTweets/{userId}
  userId
  tweets [
    { tweetData }
  ]
```

## Sharding
Ở nhiều NoSQL database, bạn phải chia nhỏ để scale app. Sharing là quá trình chia database thành nhiều khối nhỏ hơn để cải thiện hiệu năng.

Ở firestore, sharding được xử lý tự động. Chỉ có 1 case bạn cần phải xử lý sharing đó là khi có nhiều thao tác ghi xảy ra trong khoảng thời gian dưới 1s, vì trong Cloud Firestore, bạn chỉ có thể update một document khoảng một lần mỗi giây, Hãy tưởng tượng các yêu cầu tính toán của việc cập nhật số lượt thích trên một tweet mới từ Selena Gomez. Đọc thêm về giải pháp tại [đây](https://firebase.google.com/docs/firestore/solutions/counters) nhé

## Pipelining
Một tính năng khá ngầu của Firebase SDK là khả năng tạo request đọc với cơ chế non-blocking được gọi là [pipelining, được giải thích bởi Frank van Puffelen](https://stackoverflow.com/questions/35931526/speed-up-fetching-posts-for-my-social-network-app-by-using-query-instead-of-obse/35932786#35932786).  Khi bạn truy vấn Firestore, bạn không cần phải đợi reponse A hoàn thành rồi mới gửi đi request B. Bạn có thể gửi tất cả các request  độc lập. Và Firebase sẽ trả data về sớm nhất khi mọi thứ đã sẵn sàng.

Pipeling không phải một kỹ thuật cấu trúc dữ liệu, nó là một ưu điểm, lợi thế để bạn quyết định có sử dụng Firestore hay không.

Hãy tưởng tượng bạn có một mảng các document id. Bạn có thể pipeline mỗi request từ component con bằng cách lặp qua các ids, sau đó đọc ra document từ child component, như  `afs.doc('items/' + id)`. Bởi vì các request đều là non-blocking, nên bạn sẽ không cần phải lo lắng về vấn đề performance.
```
<parent-comp>
  <child-comp *ngFor="let id of documentIds">
    <!-- afs.doc('items/' + id) -->
  </child-comp>
</parent-comp>
```


# Group Collection Query
Group collection query xảy ra khi bạn muốn truy vấn một subcollection thông qua  tất cả parent của nó. Ví dụ, bạn cần đọc tất cả các bog post của tất cả các user có chủ đề là Angular với data model đang có dạng như thế này
```
users
  - userData (any)
  ++ posts/{postID}
    -- content
    -- category: angular
```

Hmm, nghe vẻ khó đây. Nhưng đừng lo, Firebase hiện tại đã support việc này. Việc query trở nên dễ dàng hơn bao giờ hết bằng cách
```
db.collectionGroup('posts')
                .where('category', '==', 'angular')
```
Một lưu ý quan trọng đó là hãy nhớ tạo index khi truy vấn trong subcollection như ví dụ trên nhé. 
Bạn có thể tìm hiểu kỹ hơn tại [đây](https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query).

# Bài toán giỏ hàng
Xây dựng giải pháp cho thương mại điện tử chưa bao giờ là một việc dễ dàng, đối với cả SQL và NoSQL. Trong ví dụ này, chúng ta sẽ cùng tìm hiểu cấu trúc cơ bản nhất của bài toán giỏ hàng. Trước hết, các data model sẽ gồm có: **user** (người dùng), **cart** (giỏ hàng), **product** (sản phẩm) và **order** (đơn hàng). Chúng ta sẽ cùng xem xét mối quan hệ của chúng.

* 1- 1: 1 user có 1 cart
* Nhiều - Nhiều: 1 product có thể được nhiều user đặt và 1 user cũng có thể có nhiều product
* 1- Nhiều: 1 user đặt được nhiều orrder

## Data Model
Bài toán đưa ra là:
Giá sản phẩm có thể thay đổi và cần được phản ánh trong giỏ hàng. Số lượng hàng hóa tồn kho là có giới hạn.

```
products/{productID}
  -productInfo (any)
  -- amountInStock (number)

users/{userID}
  -- userInfo (any)
  ++ orders
     -- items [
       { product: productID, qty: 23 }
     ]

carts/{userID}
  -- total (number)
  -products {
      productId: quantity
    }
  ]
```
**Users (root collection)**:  Thông tin cơ bản của người dùng

**Products (root collection)**:  Dữ liệu sản phẩm và tình trạng tồn kho

**Carts (root collection)**: Mối quan hệ 1 -1 được tạo bời việc cài đặt `userID` === `cartID`, điều này đảm bảo 1 user chỉ có 1 cart duy nhất. Khi một order được chốt, dữ liệu product trong cart có thể bị xóa.

**Orders (user subcollection)**: Khi một order được tạo và được xác nhận, bạn có thể chạy cloud function để giảm số lượng sản phẩm tồn kho (`amountInStock`). 

# Hệ thống User Follow/Unfollow 
Dễ hiểu nhất, hãy lấy Twitter làm ví dụ của chúng ta. Chúng ta có thể tận dụng composite key để quản lý mối quan hệ  giữa follower và followed trong collection. Sử dụng 1 ID duy nhất `followerID_followedID`  để để nói rằng  `userFoo` đang theo dõi `userBar`.

Data Model
```
users/{userID}
  -- userInfo (any)
  -- followerCount (number)
  -- followedCount (number)


relationships/{followerID_followedID}
  -- followerId (string)
  -- followedId (string)
  -- createdAt  (timestamp)
```
**Users (root collection):** Dữ liệu người dùng cơ bản với lượng follower, followed

**Relationships (root collection)**: Nó sẽ hoạt động tương tự như một bảng trung gian trong SQL, với composite key để thực thi tính duy nhất cho mỗi mối quan hệ người follow với người được follow.

## Một số mẫu truy vấn
Kiểm tra UserA follow UserB:

```
db.collection('relationships').doc(`${followerId}_${followedId}`);
```
Lấy ra 50 followers gần nhất
```
db.collection('relationships')
  .where('followedId', '==', userId)
  .orderBy('createdAt', 'desc')
  .limit(50);
```
Lấy danh sách các user đang được follow
```
db.collection('relationships').where('followerId', '==', userId);
```
# Bài toán cấu trúc cây
Giả sử bài toán cấu trúc cây của bạn là về comment lồng nhau trên Hacker News.

Cách thực hiện ở đây là sẽ sử dụng pipelining trong Firebase - thay vì việc request lần lượt trên từng collection riêng lẻ, chúng ta sẽ request một loạt các document độc lập với nhau.
![](https://images.viblo.asia/0f07b056-fe8c-4836-b07e-15d113f15112.gif)



## Data Model
```
posts/{postId}
  ++ comments/{commentB}
    -- createdAt (date)
    parent: commentA
    children: [ commentC, commentD ]
```
## Recursive Query Structure in Angular
Đầu tiên, hãy bắt đầu với việc truy vấn các root comment với `comments.where('parent', '==', null)`, rồi truyền chúng vào trong component

```
  <app-comment *ngFor="let comment of comments | async"
                [commentId]="comment.id">
  </app-comment>
```
Tiếp theo, chúng ta sẽ xây dựng một component đệ quy (component gọi lại chính nó) để render ra cấu trúc cây. 

```
@Component({
  selector: 'app-comment',
  template: `
    <div *ngIf="comment | async as c" class="indent">
      {{ c.text }}

      <div *ngIf="c.children">

        <app-comment *ngFor="let kid of c.children" 
          [commentId]="kid">
        </app-comment>
      </div>
    </div>
  `,
  styles: []
})
export class CommentComponent implements OnInit {
  @Input() commentId;

  comment;

  constructor(private db: AngularFireStore) {}

  ngOnInit() {
    this.comment = this.db.doc('comments/' + this.commentId);
  }
}
```
# Tags hoặc hash tags
Cùng quay trở lại ví dụ về Twitter, và giờ cùng thử cấu trúc cho hashtags trong Firestore. 
Mỗi khi có tweet mới được tạo, chúng ta có thể sử dụng cloud function để tổng hợp postCount trong mỗi tag document.

## Data Model
```
tweets/{tweetId}
  -- content (string)
  -- tags: {
       angular: true,
       firebase: true
  }

tags/{content}
  -- content (string)
  -- tweetCount (number)
```

## Một số mẫu truy vấn
Lấy tất cả các tweet theo tag

```
db.collection('tweets').where('tags.angular', '==', true);
```
// Hoặc
```
db.collection('tweets').orderBy('tags.angular');
```
Lấy những tag phổ biến nhất

```
db.collection('tags').orderBy('tweetCount', 'desc');
```
Lấy 1 tag cụ thể

```
tagId = 'SomeCoolTag'.toLowerCase();
db.doc('tags/' + tagId);
```
Bài viết đến đây là hết. Hi vọng sẽ giúp ích cho các bạn trong quá trình thiết kế database cho Firestore.

Cảm ơn các bạn đã theo dõi.

Tham khảo: https://fireship.io/lessons/advanced-firestore-nosql-data-structure-examples/