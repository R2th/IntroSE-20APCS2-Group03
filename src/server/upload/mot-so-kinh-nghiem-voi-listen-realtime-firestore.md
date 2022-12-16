## Giới thiệu
Sau 1 hồi làm việc với onSnapshot của firestore (listen realtime), mình đúc kết được vài thứ cơ bản sau đây, mong là giúp ích được cho ai mới làm quen hoặc ai pro thì vào chỉ giáo thêm :clap:

## Các vấn đề
Để listen realtime trong firestore thì chúng ta dùng hàm onSnapshot cung cấp sẵn, cách dùng rất đơn giản
https://firebase.google.com/docs/firestore/query-data/listen

Listen 1 doc chỉ định
```
db.collection("cities").doc("SF")
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.data());
  });
```

Listen nhiều docs 1 lúc
```
db.collection("cities").where("state", "==", "CA")
  .onSnapshot((querySnapshot) => {
    var cities = [];
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
    });
    console.log("Current cities in CA: ", cities.join(", "));
  });
```

Nhìn code cũng dễ hiểu phải không nào? onSnapshot sẽ lắng nghe 1 query, nếu có thay đổi thì trả về những docs (hoặc 1 doc) đã thay đổi.
Đúng rồi đó, nó lắng nghe 1 câu query. Bạn có thể listen bất cứ query nào mình muốn. Ví dụ listen 1 list orders có status là 'waiting' và price > 1000:
```
const query = db.collection('orders').where('status', '==', 'waiting').where('price', '>', 1000)
query.onSnapshot()
```

Và chúng ta sẽ listen trong useEffect() hay componentDidMount()
```
useEffect(() => {
  const query = db.collection('orders')
    .where('status', '==', 'waiting')
    .where('price', '>', 1000)

  const unsubscribe = query.onSnapshot((querySnapshot) => {
    const listChanged = querySnapshot.map((change) => ({
      id: change.id,
      type: change.type,
      ...change.doc.data()
    }))
    
    dispatch(setNewList(listChanged))
  })

  return unsubscribe
}, [])
```
Sau khi listen chúng ta cần unsubscribe nó đi, tránh việc đã ra khỏi component rồi mà hàm listen vẫn chạy làm tốn tài nguyên máy không cần thiết.
Ok, cách listen thì là như vậy, còn handle data đã thay đổi thì sao?
onSnapshot đã trả về type của data change, bao gồm 'added', 'modified', 'removed'. Nhìn từ là biết ý nghĩa rồi nhỉ
https://firebase.google.com/docs/firestore/query-data/listen#view_changes_between_snapshots
Như đoạn  type: change.type ở trên, mình sẽ gán type vào item changed luôn, và ta sẽ dispatch để set lại list, param là listChanged
Ta sẽ forEach listChanged và check nếu item có type là 'added' thì push vào list cũ, 'removed' thì xóa khỏi list và 'modified' thì thay thế item tương ứng trong list
Nhưng phải chú ý cái này, chúng ta listen 1 câu query, nên 'added' nghĩa là có thêm doc thỏa mãn query kia, tương ứng với các type còn lại
Ví dụ 1 doc có status là 'new' ban đầu ko được lấy về vì query theo status = 'waiting', sau đó doc này đc cập nhật status thành 'waiting', thì lúc này nó sẽ đc 'added' vào list change. Hãy nhớ kỹ là listen theo query đánh tránh hiểu lầm với việc doc được tạo mới hay xóa nhé.

Bài toán khác khó hơn 1 chút là như này: listen 1 đám orders, có những orders thỏa mãn query mình cần thì dùng đám orders đó (id của các orders) để listen 1 đám data khác, ví dụ order detail (1 order sẽ có nhiều order detail, nhận biết detail thuộc order nào = cách mỗi order detail sẽ có trường order_id). Chắc là mọi người sẽ nghĩ đến việc useEffect() lần đầu listen orders, lấy đc orders rồi ta sẽ cho vào useEffect() số 2, lặp từng order và listen những order detail của order tương ứng? Nhưng như thế làm sao để unsubsribe hàng loạt hàm listen trên?
firestore thật tốt là có 1 kiểu query đáp ứng: 'in'
`db.collection('order_details').where('order_id', 'in', [đám order id lấy từ useEffect 1])`
'in' giúp ta lấy tất cả order detail có order_id thuộc mảng order đã đc listen trước đó => vậy là đã giải quyết được = 1 câu query duy nhất rồi, và unsubscribe nó cũng rất đơn giản.

```
useEffect(() => {
  if (!orders.length) {
    return
  }

  const orderIDs = orders.map((order) => order.id)
  const query = db.collection('order_details')
    .where('order_id', 'in', [orderIDs])

  const unsubscribe = query.onSnapshot((querySnapshot) => {
    const listChanged = querySnapshot.map((change) => ({
      id: change.id,
      type: change.type,
      ...change.doc.data()
    }))

    dispatchEvent(setNewOrderDetails(listChanged))
  })

  return unsubscribe
}, [orders])
```

Tạm đến đây thôi, còn những bài toán khác nhau nhưng chắc là mn cũng hiểu được ý tưởng để thực hiện rồi. Chúc mn vui vẻ :hugs: