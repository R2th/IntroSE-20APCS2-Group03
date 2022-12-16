## Giới thiệu
https://viblo.asia/p/doc-ghi-nhieu-documents-trong-firestore-m68Z0ABMlkG
Ở bài trước mình có nói về batch trong firestore limit write 500 docs 1 lần commit. Bài này mình sẽ chia sẻ 1 cách để vượt limit :v: 
> Each transaction or batch of writes can write to a maximum of 500 documents

## Lý thuyết
Đây là ví dụ về batch: https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes

```
var batch = db.batch();

// Set the value of 'NYC'
var nycRef = db.collection("cities").doc("NYC");
batch.set(nycRef, {name: "New York City"});

// Update the population of 'SF'
var sfRef = db.collection("cities").doc("SF");
batch.update(sfRef, {"population": 1000000});

// Delete the city 'LA'
var laRef = db.collection("cities").doc("LA");
batch.delete(laRef);

// Commit the batch
batch.commit().then(() => {
    // ...
});
```

Sẽ có 3 phần:
- Khai báo batch ```var batch = db.batch();```
- Làm gì đó với batch đã khai báo (update, delete...)
- Cuối cùng là commit batch trên ```batch.commit()```

Không thể *làm gì đó* quá 500 lần được, nên giải pháp cho việc *vượt rào* sẽ là chia thành nhiều cái batch, mỗi cái batch sẽ có 500 lần *làm gì đó*
=> làm 1 cái counter mỗi lần write

```
let operationCounter = 0; // biến counter
  const batches = []; // chứa những cái batch đã nói ở trên, mỗi cái 500
  batches.push(db.batch()); // đầu tiên sẽ thêm 1 batch vào batches
  let batchIndex = 0; // tạo current batch index
  const checkBatchLimit = () => {
    operationCounter++;
    if (operationCounter === BATCH_LIMIT - 1) { // đạt đến limit
      batches.push(db.batch()); // thêm 1 cái batch mới vào batches
      batchIndex++; // current batch sẽ tương ứng với cái batch mới vừa thêm bên trên
      operationCounter = 0; // đếm lại từ 0
    }
  };
  
  ...
  batches[batchIndex].set(ref, data); // *làm gì đó*
  checkBatchLimit(); // check limit mỗi lần write
  ...
  
  // đến cuối cùng ta sẽ có mảng batches gồm nhiều cái batch riêng đảm bảo limit
  // việc còn lại là commit từng cái batch trong đó
  const batchesCommit = batches.map(async (batch) => {
    await batch.commit();
  });

  await Promise.all(batchesCommit);
```

## Kết luận
Thú thực là mình cũng không chắc đây có phải cách tốt nhất không, nhưng mình đã làm thử và chạy ổn :v: 
Mọi người ai có cách làm hay hơn thì comment giúp mình và người khác nữa nhé :heart_eyes: