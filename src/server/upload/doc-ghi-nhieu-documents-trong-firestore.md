## Giới thiệu
Như tiêu đề thì bài này mình muốn chia sẻ cách thao tác đọc ghi với nhiều documents 1 lúc trong firestore. Docs của firebase mọi người có thể search ra dễ dàng nhưng mới làm chắc sẽ có vài câu hỏi, mình mới làm qua nên share cho ae tham khảo :v 

## Lý thuyết
Các hành động đọc ghi của firestore là bất đồng bộ:

```
var docRef = db.collection(COLLECTION).doc(id);

docRef.get().then((doc) => {
    if (doc.exists) {
        ...
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    ...
});
```

Đây là ví dụ get 1 document trên docs của firebase, mình có thể chuyển thành async/await như này

```
async function() {
var docRef = db.collection(COLLECTION).doc(id);

const respon = await docRef.get();

if (respon.exist) { ... }
}
```

Và để get nhiều documents khi biết id của chúng thì ta có thể dùng Promise all như này:

```
async function(ids) {
const promise = ids.map(id => {
  const docRef = db.collection(COLLECTION).doc(id);
  return await docRef.get();
}

const docsRespon = await Promise.all(promise);
}
```

Chúng ta sẽ thu đc 1 mảng docsRespon, và ta có thể lặp để lấy data của từng doc. Với các hàm update, set, delete cũng có thể làm tương tự.
Tuy nhiên sẽ có những bài toán ghi nhiều docs 1 lúc, nhưng khi 1 doc bị ghi lỗi, cần rollback tất cả những gì đã ghi trước đó thì Promise all sẽ ko đáp ứng được (ghi thôi chứ get thì vẫn dùng được ko liên quan gì).
Lúc này firebase có transaction và batch https://firebase.google.com/docs/firestore/manage-data/transactions?hl=en

Những thứ các bạn cần nhớ kĩ là 2 thứ này giúp ghi nhiều documents 1 lúc, tự rollback khi có 1 action lỗi, tối đa số lần ghi trong 1 lần chạy là 500.
- Transaction thì cho phép đọc trước khi ghi, và phải là đọc xong mới đc phép ghi. Ví dụ bạn muốn cập nhật 100 docs, bạn phải get hết 100 docs đó về trước (= Promise all), sau đó kiểm tra xem chúng có tồn tại hay lỗi gì đó ko, rồi mới đi update. 
> The transaction read a document that was modified outside of the transaction. In this case, the transaction automatically runs again. The transaction is retried a finite number of times.
Đây là cái hay của transaction, chẳng may mà có 2 user cùng sửa đến docs nào đó 1 lúc, transaction sẽ nhận biết được và chạy lại từ các lệnh get mà ta đã kiểm tra các điều kiện trước đó, và sẽ báo fail giúp ta tránh đc các bug ko hiểu từ đâu mà ra.
- Batch thì chỉ cho phép ghi, nếu muốn check gì đó trước khi chạy batch thì chỉ có cách thêm await function check trước đó.
Batch phù hợp với tạo mới nhiều docs 1 lúc, còn transaction hợp với update, set, delete.

Nghe có vẻ ổn ổn cho bài toán rollback rồi, nhưng còn 1 vấn đề nữa:
> Each transaction or batch of writes can write to a maximum of 500 documents

Lúc này chúng ta phải tìm cách chia batch thành nhiều lần commit (mỗi lần gồm 500 actions)
Đây là bài tập bonus nhé các bạn :v hãy thử tìm hiểu xem sao