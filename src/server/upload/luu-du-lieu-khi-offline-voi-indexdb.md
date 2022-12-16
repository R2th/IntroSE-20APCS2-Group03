Chào các bạn, ở hai bài trước thì mình có giới thiệu về service worker, workbox và cách giúp bạn cache những tài nguyên trong web để có thể chạy được trang web kể cả khi không có mạng. Tại bại lần này thì mình sẽ giới thiệu cho bạn cách lưu dữ liệu khi đang ở trạng thái offline với indexDB

## IndexDB là gì
IndexDB là một kho lưu trữ dưới trình duyệt người dùng (giống như localStorage vậy). Các dữ liệu trong indexDB sẽ được lưu dưới dạng key - value. Khái niệm khá là đơn giản phải không nào, giờ hãy bắt tay vào việc chính thôi nhỉ

## Cách sử dụng
Các bạn hãy clone project này về nhé: https://github.com/hoangdm-2060/index-db-demo. Các bạn mở file main.js sẽ thấy mình kiểm tra xem trình duyệt của bạn có hỗ trợ indexDb không, nhưng chắc hẳn là sẽ hỗ trợ thôi, vì indexDB giờ đã chạy được gần như có thể chạy được trên mọi trình duyệt

```javascript
if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
}
```

Để có thể chạy được demo kia thì bạn cần cài `http-server`
```
npm install http-server -g
```
Sau đó là cd vào thư mục project và chạy 
```
http-server -p 8080 -a localhost -c 0
```

### Tạo kết nối
Đầu tiện để tạo ra 1 kết nối thì bạn có thể làm như sau
```javascript
const dbPromise = idb.open('products', 1);
```
Trong đó `products` là tên kết nối, `1` là version. Bạn hãy f5 lại, vào phần `Application` trong inspect sẽ thấy 1 mục là IndexedDB

![](https://images.viblo.asia/0f81fff9-dd69-484c-bb6e-e07751486fac.png)

Vậy là chúng ta đã mở được 1 kết nối thành công

### Tạo một object để lưu trữ (object stores)
Giờ trong kết nối đã tạo, chúng ra sẽ tạo thêm 1 object để lưu trữ dữ liệu liên quan tới đồ nội thất nhé. Update đoạn code trên một chút nhỉ
```javascript
const dbPromise = idb.open('products', 2, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
        case 0:
            //chạy nếu db không tồn tại
        case 1:
            console.log('Creating the products object store');
            upgradeDb.createObjectStore('furniture', {keyPath: 'id'});
    }
});
````

Bạn sẽ thấy version giờ đã lên là 2, tại sao vậy? Vì để đảm bảo tính toàn vẹn của dữ liệu object stores và indexes sẽ chỉ được tạo trong quá trình database upgrade. Điều này có nghĩa chúng sẽ được tạo ra trong upgrade callback function trong `idb.open`. Callback này sẽ chỉ chạy khi version (lúc này là 2) lớn hơn version hiện tại trên trình duyệt hoặc db đó không tồn tại. Và bạn cũng sẽ thấy trong từng case đều không có break, điều này để đảm bảo tất cả các case sau case đầu tiên được chạy đều sẽ được thực thi.


### Thêm dữ liệu
Giờ mình sẽ thêm 1 ít dữ liệu vào nhé
```javascript
function addProducts() {
        alert(1);
        dbPromise.then(function(db) {
            const tx = db.transaction('furniture', 'readwrite');
            const store = tx.objectStore('furniture');
            const items = [
                {
                    name: 'Couch',
                    id: 'cch-blk-ma',
                    price: 499.99,
                    color: 'black',
                    material: 'mahogany',
                    description: 'A very comfy couch',
                    quantity: 3
                },
                {
                    name: 'Armchair',
                    id: 'ac-gr-pin',
                    price: 299.99,
                    color: 'grey',
                    material: 'pine',
                    description: 'A plush recliner armchair',
                    quantity: 7
                },
                {
                    name: 'Stool',
                    id: 'st-re-pin',
                    price: 59.99,
                    color: 'red',
                    material: 'pine',
                    description: 'A light, high-stool',
                    quantity: 3
                },
                {
                    name: 'Chair',
                    id: 'ch-blu-pin',
                    price: 49.99,
                    color: 'blue',
                    material: 'pine',
                    description: 'A plain chair for the kitchen table',
                    quantity: 1
                },
                {
                    name: 'Dresser',
                    id: 'dr-wht-ply',
                    price: 399.99,
                    color: 'white',
                    material: 'plywood',
                    description: 'A plain dresser with five drawers',
                    quantity: 4
                },
                {
                    name: 'Cabinet',
                    id: 'ca-brn-ma',
                    price: 799.99,
                    color: 'brown',
                    material: 'mahogany',
                    description: 'An intricately-designed, antique cabinet',
                    quantity: 11
                }
            ];
            return Promise.all(items.map(function(item) {
                    console.log('Adding item: ', item);
                    return store.add(item);
                })
            ).catch(function(e) {
                tx.abort();
                console.log(e);
            }).then(function() {
                console.log('All items added successfully!');
            });
        });
    }
```
Và giờ hãy ấn button `add Products` và kiểm tra lại nhé :smile:

### Tìm kiếm
Giờ hãy thử làm chức năng tìm kiếm nhé. Trước tiên chúng ta phải tạo thêm vài index để tìm kiếm theo nó nhé.
```javascript
   const dbPromise = idb.open('products', 3, function(upgradeDb) {
        switch (upgradeDb.oldVersion) {
            case 0:
            //chạy nếu db không tồn tại
            case 1:
                console.log('Creating the products object store');
                upgradeDb.createObjectStore('furniture', {keyPath: 'id'});
            case 2:
                console.log('Creating a name index');
                var store = upgradeDb.transaction.objectStore('products');
                store.createIndex('name', 'name', {unique: true});
            case 3:
                console.log('Creating a price index');
                const storeV1 = upgradeDb.transaction.objectStore('furniture');
                storeV1.createIndex('price', 'price', {unique: true});
            case 4:
                console.log('Creating a description index');
                const storeV2 = upgradeDb.transaction.objectStore('furniture');
                storeV2.createIndex('description', 'description', {unique: true});
        }
    });
```

Giờ hãy thêm những function này 
```javascript
    function getByName(key) {
        return dbPromise.then(function (db) {
            const tx = db.transaction('furniture', 'readonly');
            const store = tx.objectStore('furniture');
            const index = store.index('name');

            return index.get(key);
        });

    }

    function getByPrice() {

        var lower = document.getElementById('priceLower').value;
        var upper = document.getElementById('priceUpper').value;
        var lowerNum = Number(document.getElementById('priceLower').value);
        var upperNum = Number(document.getElementById('priceUpper').value);

        if (lower === '' && upper === '') {
            return;
        }
        var range;
        if (lower !== '' && upper !== '') {
            range = IDBKeyRange.bound(lowerNum, upperNum);
        } else if (lower === '') {
            range = IDBKeyRange.upperBound(upperNum);
        } else {
            range = IDBKeyRange.lowerBound(lowerNum);
        }
        var s = '';
        dbPromise.then(function (db) {
            var tx = db.transaction('furniture', 'readonly');
            var store = tx.objectStore('furniture');
            var index = store.index('price');
            return index.openCursor(range);
        }).then(function showRange(cursor) {
            if (!cursor) {
                return;
            }
            console.log('Cursored at:', cursor.value.name);
            s += '<h2>Price - ' + cursor.value.price + '</h2><p>';
            for (var field in cursor.value) {
                s += field + '=' + cursor.value[field] + '<br/>';
            }
            s += '</p>';
            return cursor.continue().then(showRange);
        }).then(function () {
            if (s === '') {
                s = '<p>No results.</p>';
            }
            document.getElementById('results').innerHTML = s;
        });

    }

    function getByDesc() {
        var key = document.getElementById('desc').value;
        if (key === '') {
            return;
        }
        var range = IDBKeyRange.only(key);
        var s = '';
        dbPromise.then(function (db) {
        }).then(function () {
            if (s === '') {
                s = '<p>No results.</p>';
            }
            document.getElementById('results').innerHTML = s;
        });
    }

    function displayByName() {
        var key = document.getElementById('name').value;
        if (key === '') {
            return;
        }
        var s = '';
        getByName(key).then(function (object) {
            console.log(object);
            if (!object) {
                return;
            }

            s += '<h2>' + object.name + '</h2><p>';
            for (var field in object) {
                s += field + ' = ' + object[field] + '<br/>';
            }
            s += '</p>';

        }).then(function () {
            if (s === '') {
                s = '<p>No results.</p>';
            }
            document.getElementById('results').innerHTML = s;
        });
    }
```

Viết theo cách này thì chỉ là demo nên hơi dở 1 chút, vì nó sẽ chỉ search được đúng theo tên đầy đủ đươc lưu :( cái này nếu có thời gian chắc mình sẽ update sau

Với 3 bài viết về offline này mong sẽ giúp ích được các bận nhiều. Cảm ơn các bạn đã quan tâm tới bài viết của mình