# I. Giới thiệu
Firebase hay Algolia không còn quá xa lạ với các lập trình viên. Sau khi tìm hiểu, mình nhận thấy 2 bạn này thật sự rất thú vị dù tính ra chi phí khi dùng là khá đắt đỏ. Cụ thể là dù Firebase vẫn có gói free cho bạn nhưng nếu bạn muốn dùng Firebase kết hợp với bên thứ ba (ở đây là Algolia) thì bạn phải nâng cấp dự án Firebase của bạn lên gói trả phí. Và ngay đến số lượng truy cập đọc ghi vào DB Firebase hay DB của Algolia cũng giới hạn ở 1 mức quota nhất định mỗi tháng thậm chí là mỗi ngày nên với những lập trình viên muốn thử kết hợp 2 bạn này với nhau để phục vụ cho việc tìm hiểu thêm kiến thức chẳng hạn thì phần chi phí bỏ ra khá là đáng suy ngẫm.

May mắn thay mình thời gian gần đây mình đã có cơ hội làm việc kết hợp giữa Firebase và Algolia (yay). Thực tế đối với người lần đầu tiếp xúc thì mình thấy phần documents của mỗi bạn là khá nhiều và rõ ràng. Dù vậy, khi bắt tay vào code mình cũng phải research khá là nhiều những bài viết và blog về việc quản lý data ở Cloud Firestore và data ở Algolia như thế nào để có được sự đồng bộ và hiệu quả nhất. Kết quả là trong bài viết này, mình sẽ chia sẻ thử cách làm của mình về việc đưa data từ Cloud Firestore lên Algolia thông qua Firebase Functions nhé. Mình xin phép không đi qua những khái niệm về Firebase và Algolia là gì vì đã có rất nhiều bài giới thiệu rồi và docs của 2 bạn này cũng nhiều (mình sẽ để link docs bên dưới). Tiền đề của bài viết này là các kiến thức cơ bản khi bạn đã làm việc với Cloud Firestore, Firebase Functions, Algolia rồi nhé :) 

* Cloud Firestore: https://firebase.google.com/docs/firestore
* Cloud Functions for Firebase (mình hay gọi là Firebase Functions): https://firebase.google.com/docs/functions/
* Algolia: https://www.algolia.com/doc/guides/getting-started/how-algolia-works/

# II. Thử nghiệm
Còn một note to bự trước khi bước vào thực nghiệm đó là việc mình là 1 java-dev và thời gian gần đây đang học thêm js. Đây là lần đầu tiên mình thử sức với code js nên xử lý còn nhiều chỗ chuối và chưa clear thì các bạn ném đá nhẹ nhàng mình thôi nhé :) Giờ bắt đầu nào!

Cơ bản của cách làm làm này gồm có 4 bước:
1. Tạo 1 account Algolia mới trên trang algolia.com
2. Tạo 1 index mới trên Algolia để lưu data sắp đưa từ Cloud Firestore sang
3. Tạo Firebase Functions lắng nghe các sự thay đổi (create, update, delete) data ở collection (bạn đang muốn đưa lên Algolia) trên Cloud Firestore của bạn, sau đó copy chúng sang Algolia bằng các hàm mà Algolia đã cung cấp sẵn.
4. Tạo mới vài data ở Cloud Firestore để test lại sự hoạt động đưa data lên Algolia
![](https://images.viblo.asia/6b8fb380-5c56-484a-8483-1ff2e9872f8d.png)

## Bước 1: Tạo account Algolia
Cũng không có quá nhiều điều cần nói ở bước này :) Tuy nhiên mình cũng có vài lưu ý cho các bạn đó là sau bước tạo một project mới

![](https://images.viblo.asia/687e7d56-1b7f-4a0a-b4e9-ac7f435e6754.png)

là đến phần chọn vùng mà Algolia sẽ lưu data của bạn thì bạn nên chú ý chọn vùng gần mình nhất để tốc độ truy vấn data và search ra ở Algolia là nhanh nhất. Số 60ms (miliseconds) ở đây là thời gian response lại từ vị trí vùng của bạn nên số này càng thấp là càng tốt bạn nhé.
![](https://images.viblo.asia/3adcff7b-d9b3-4b49-ba79-4e5d64bc81a8.png)

## Bước 2: Tạo index mới trên Algolia
Có thể hiểu index trên Algolia tương tự như các collection chứa data  của Cloud Firestore và tất nhiên data lưu trên Algolia không nhất thiết phải giống hoàn toàn với data lưu ở Cloud Firestore mà chỉ cần ở index của Algolia có chứa các data cần cho việc search full text là được.

Vd: Ở Cloud Firestore mình có 1 collection "user" như sau:
![](https://images.viblo.asia/f7141d78-2230-4a86-8cef-e532a80f0f0d.png)

Trên màn hình chức năng search full-text mà bạn đang xây dựng chỉ quan tâm và cho phép search thông tin của 
* name
* email
* tel_no 

còn các thông tin 
* is_admin
* created_date
* updated_date
* deleted_flag 

là trong suốt với người dùng và không cần thiết cho việc search, vậy thì trên Algolia bạn có thể xây dựng 1 index "user" và đưa data lên và lưu lại từ FireStore data của 3 field name, email, tel_no mà thôi. Tên của index có thể là bất kì từ gì bạn muốn mà không bắt buộc phải giống với tên collection ở Firestore đâu. Tuy nhiên để đơn giản và tránh nhầm lẫn, ở đây mình sẽ tạo 1 index có tên user tương ứng với collection user đã có trước đó ở Cloud Firestore.
![](https://images.viblo.asia/9136b337-7ce0-4031-94fb-bb7082c2e73d.png)

Và bên trong index "user" vừa tạo của bạn
![](https://images.viblo.asia/e5e06bb4-95de-4ece-9fcb-2163ecbd3969.png)

## Bước 3: Tạo Firebase Functions
Ở project, các bạn follow các bước cài đặt firebase function cơ bản nhé và mình không đi sâu phần này
```
$ npm install -g firebase-tool
$ firebase login
$ firebase init functions
```

Tiếp theo là cài đặt algoliasearch
```
npm i algoliasearch --save
```

Vào mục API Keys trên Algolia để biết được các thông tin Algolia key của project của bạn nhé
![](https://images.viblo.asia/1b03c221-5262-4dfd-b97b-937c9da4fcf5.png)

Ở function, đầu tiên mình config các thông tin liên quan đến Firebase và Algolia nhé
```
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = 'Điền vào đây Application ID';
const ALGOLIA_ADMIN_KEY = 'Điền vào đây Admin API Key';

const ALGOLIA_INDEX_USER = 'user';
const USER_COLLECTION = 'user/{userId}';
const algolia = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
```

Sau đó bắt đầu thử viết function lắng nghe thay đổi ở firestore và đưa data lên Algolia
```
admin.initializeApp(functions.config().firebase);

// Update the search index every time one record data user is create.
exports.onUserCreated = functions.firestore.document(USER_COLLECTION).onCreate((snap, context) => {
  const dataSearch = snap.data();
  dataSearch.objectID = context.params.userId;
  const index = algolia.initIndex(ALGOLIA_INDEX_USER);
  return index.addObject(dataSearch);
})
```

Mình dùng onCreate của Firebase Functions để lắng nghe thay đổi của document "user" trên Cloud Firestore. Mỗi 1 record data được index trên Algolia đều sẽ có 1 objectID duy nhất. Nếu lúc đưa data lên các bạn không quy định cho nó 1 giá trị nhất định thì  Algolia sẽ tự sinh ra 1 objectID nhé. Ở đây mình dùng luôn key của document_id của user để làm objectID trên Algolia.

Và vì mình đã khai báo
`const USER_COLLECTION = 'user/{userId}';`

nên đoạn set objectID của mình sẽ là `dataSearch.objectID = context.params.userId;`

Okay, giờ deploy Firebase Functions lên để test thử

```
firebase deploy --only functions:onUserCreated
```
Deploy thành công thì function onUserCreated sẽ xuất hiện bên ở dashboard của mục Functions trên Firebase nhé
![](https://images.viblo.asia/471c27e9-c3b1-428e-9ed6-fe2a0e4a9afe.png)

## Bước 4: Tạo data ở Cloud Firestore và test thử
Tạo data và test thử nào!

Như hình bên dưới, sau khi mình save data ở Cloud Firestore thành công và load lại Algolia thì trên Algolia cũng đã có được toàn bộ data của record vừa tạo đó, vậy nghĩa là function chúng  ta viết ở trên đã chạy ok rồi

![](https://images.viblo.asia/d001aa33-4adb-44ea-bf52-c11c5225df55.gif)

Log function cũng báo thành công nè :)
![](https://images.viblo.asia/f49dcbf9-3424-4203-a08f-05446496f2f4.png)

## Bước  Bonus:
Cơ bản việc đưa data lên Algolia bằng Firebase Functions chỉ có vậy. Mình sẽ note thêm một số điều mình tìm hiểu được ra sau đây nhé

**Bonus 1:**
Tương tự cho việc update và delete, tuy nhiên tùy vào mỗi hành động mà mình sẽ thay đổi method tương ứng
```
// Update the search index every time one record data user is update.
exports.onUserUpdate = functions.firestore.document(USER_COLLECTION).onUpdate((change, context) => {
  const dataSearch = change.after.data();
  dataSearch.objectID = context.params.userId;
  const index = algolia.initIndex(ALGOLIA_INDEX_USER);
  return index.saveObject(dataSearch);
});

// Update the search index every time one record data user is delete.
exports.onUserDelete = functions.firestore.document(USER_COLLECTION).onDelete((snap, context) => {
  const index = algolia.initIndex(ALGOLIA_INDEX_USER);
  return index.deleteObject(context.params.userId);
});
```

**Bonus 2:**
Trường hợp xảy ra sự cố gì đấy mà data của Cloud Firestore và Algolia bị bất đồng độ thì mình có thể viết thêm function để sync lại data:
```
// call https://us-central1-xxx.cloudfunctions.net/syncUserToAlgolia to run functions sync all user into Algolia
exports.syncUserToAlgolia = functions.https.onRequest((req, res) => {
  const arr = [];
  admin.firestore().collection('user').get().then(docs => {
    docs.forEach(doc => {
      const dataSearch = doc.data();
      dataSearch.objectID = doc.id;
      arr.push(dataSearch);
    });

    const index =  algolia.initIndex(ALGOLIA_INDEX_USER);
    index.saveObjects(arr, (err, content) => {
      if (err) res.status(500);

      res.status(200).send(content);
    });
  });
});
```

**Bonus 3:**
Các method của Algolia đều có thể áp dụng cho số nhiều ví dụ `addObjects` và `addObject`
Chi tiết về các method này các bạn có thể xem thêm ở đây: https://www.algolia.com/doc/api-client/methods/indexing/

Và Algolia cũng có thể thông qua `index.setSettings({ ... })` để setting nhiều thuộc tính khác nhau trên mỗi index để phục vụ cho từng mục đích dùng của mỗi index.

**Bonus 4:**
Việc sử dụng method addObject (và một số method khác) thực tế chính là việc gọi sang các API của Algloia để làm việc và sẽ xảy ra vấn đề sau:

Khi create object trên Algolia (add 1 object vào 1 index trên Algolia) thì đây là 1 quá trình bất đồng bộ (do Algolia định nghĩa). Method tạo ra và trả về 2 thông tin là objectID (chứa data) và taskID (task xử lý bất đồng bộ để add vào server của Algolia)

Cụ thể với method addObject sẽ là gọi sang API POST /1/indexes/user sẽ tạo ra objectID: kWFn1XYjqdHqu2z3l3e6 và taskID:243957230 để xử lý trên Algolia (task đã tạo tuy nhiên chưa thực hiện xong) nên objectID chưa sẵn sàng để search mặc dù đã có objectID như hình: 
![](https://images.viblo.asia/cdc8fb92-3103-4a4b-adc9-27dbda0bb5d5.png)

Việc sẵn sàng để search phải đợi taskID finish mới thực hiện được trên Algolia.

Vì vậy, mặc dù Processing time khi xem chi tiết API này chúng ta thấy chỉ tốn 1ms thực tế nó tốn 1ms để tạo ra ObjectID nhưng lúc này nó vẫn chưa thể search được trên Algolia. (Docs của Algolia cũng có nhắn đến việc này nè: https://www.algolia.com/doc/rest-api/search/?language=javascript#add-object-without-id)

Nói cách khác processing time = 1ms không phản ánh đúng được việc "add data vào Algolia và CÓ THỂ SEARCH ĐƯỢC" -> nó chỉ phản ánh được việc đã tạo ra 2 thằng objectID: kWFn1XYjqdHqu2z3l3e6 và taskID:243957230 mà thôi. Để biết khi nào thì data đã sẵn sàng search được thì lại phụ thuộc vào taskID và tốn tầm vài s để xử lý.

Và khi bạn muốn biết khi nào  taskID sẽ thực hiện xong thì Algolia có cung cấp cho bạn một method waitTask làm nhiệm vụ lắng nghe lắng nghe status của taskID đó và cho đến khi response của taskID trả về là
```
{
status: "published",
pendingTask: false
}
```
thì lúc này taskID mới gọi là finish và data mới sẵn sàng search :)

Mình sẽ thử đưa waitTask vào trong code thử nè:
```
// Update the search index every time one record data user is create.
exports.onUserCreated = functions.firestore.document(USER_COLLECTION).onCreate((snap, context) => {
  const dataSearch = snap.data();
  dataSearch.objectID = context.params.userId;
  const index = algolia.initIndex(ALGOLIA_INDEX_USER);
  return index.addObject(dataSearch, (err, { taskID, objectID } = {}) => {
    index.waitTask(taskID, () => {
      // do something with objectID indexed and available for search
      if (!err) console.log(`object ${objectID} indexed`)
    })
  })
})
```

Chạy lại và xem log, các bạn sẽ thấy đoạn log đó hiển thị cách thời gian function thực hiện xong tầm vài s và đây chính là thời gian taskID đã finish và bạn đã có thể dùng data vừa add để search rồi nè
![](https://images.viblo.asia/12cbf07c-498d-4f97-ac05-2ecd57d38c37.png)
![](https://images.viblo.asia/19964e99-7e01-42cc-b837-ce2ce943180f.png)

Các bạn cũng có thể nhận thấy thời gian hoàn thành taskID của mỗi lần index là không giống nhau. Độ trễ của taskID còn phụ thuộc vào lượng data các bạn index trong cùng một thời lần request nhé!
# III. Kết luận
Mình chỉ mới được tiếp xúc và làm việc với Firebase, Algolia trong thời gian 1 2 tháng gần đây nên ở vẫn còn nhiều hạn chế. Bài viết cũng như xử lý còn nhiều chỗ chưa được tối ưu. Nếu các bạn nhận thấy chỗ nào còn thiếu xót hay cần cải tiến hơn hãy chỉ ra ngay giúp mình nhé, mình rất cảm ơn ạ. Và các bạn nào đã từng làm việc thành thạo hoặc gặp nhiều issue và tìm được hướng giải quyết với Firebase, Algolia hãy comment cho mình biết để tiện trao đổi và học hỏi thêm từ nhau nhé. Cảm ơn các bạn đã đọc đến đây :)

# IV. Tài liệu tham khảo
* https://firebase.google.com/docs/firestore
* https://firebase.google.com/docs/functions/
* https://www.algolia.com/doc/guides/getting-started/how-algolia-works/
* https://itnext.io/how-to-add-fast-realtime-search-to-your-firebase-app-with-algolia-2491f7698d52