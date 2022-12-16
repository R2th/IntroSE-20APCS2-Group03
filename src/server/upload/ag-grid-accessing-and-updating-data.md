## Introduction
![](https://images.viblo.asia/2936dd04-abff-418d-a880-45537baf7b41.png)

Tiếp theo nội dung từ phần [trước](https://viblo.asia/p/ag-grid-client-and-server-side-data-Eb85oog652G) về **Client Side Data** và **Server Side Data**, ở phần này mình sẽ tiếp tục giới thiệu về quá trình **Accessing** và **Updating** trong Ag-grid.

## Accessing Data
Với mỗi lần data được truyền vào Grid, Grid sẽ gói gọn lại từng data item trong một `rowNode` object. Ví dụ data được truyền vào gồm 20 rows, thì Grid sẽ tạo ra tương ứng 20 `rowNode` objects, mỗi `rowNode` sẽ chứa 1 data item.

Việc accessing đến các `rowNode` này cũng khá là thuận tiện. Ví dụ như nếu chúng ta muốn select 1 row, ta có thể dùng `rowNode.setSelected(true)`

### Accessing Row Node API Methods
Có khá nhiều cách khác nhau để access đến `rowNode`, được bao gồm trong bảng sau:

| API Methods | Description |
| -------- | -------- |
| getRowNode(id)  | Trả về `rowNode` với `id` tương ứng.  `Id` của `rowNode` chính là kết quả trả về của callback `getRowNodeId(data)` , nếu không thì `id` sẽ được Grid tự động sinh ra khi row data được set. |
| forEachNode((node, index))  |Chạy vòng lặp qua từng node (row) trong Grid. Hàm này hoạt động tương tự như `forEach` của javascript array, nó gọi đến từng node, bỏ qua bất cứ filtering hay sorting nào đã áp dụng vào Grid trước đó. Nếu dùng `infinite rowModel`, thì nó sẽ được gọi cho từng page đã load tương ứng với từng page cache |
|forEachNodeAfterFilter((node, index))  | Cơ chế giống như `forEachNode()` ngoại trừ việc nó sẽ bỏ qua tất cả các filtered data|
| forEachLeafNode((node, index)) | Cơ chế giống như `forEachNode()`, ngoại trừ việc nó sẽ list ra tất cả các leaf nodes. Nó duyệt qua tất cả data truyền vào Grid trước khi Grid thực hiện quá trình grouping |
| getDisplayedRowAtIndex(index) | Trả về `rowNode` được hiển thị ở vị trí trùng với gía trị `index` được truyền vào |
|getDisplayedRowCount()  | Trả về tổng số rows được hiển thị |
| getFirstDisplayedRow() | Lấy giá trị `index` của row được hiển thị đầu tiên trong quá trình scrolling (bao gồm cả những row không hiển thị trong buffer) |
| getLastDisplayedRow() | Cơ chế giống như hàm `getFirstDisplayedRow()` nhưng là `index` của row cuối cùng |

### Accessing RowNode by ID
Cách đơn giản nhất để lấy ra 1 `rowNode` là bằng `id` của nó. `Id` được tạo bởi việc sử dụng callback `getRowNodeId()` hoặc tạo bởi internal sequence của Grid: 
```javascript
// callback tells the grid to use the 'id' attribute for id's
// id's should always be strings
gridOptions.getRowNodeId = function(data) {
    return data.id;
};

// get the row node with ID 55
var rowNode = api.getRowNode('55');

// do something with the row, eg select it
rowNode.setSelected(true);
```
Việc access 1 `rowNode` bằng `id` chỉ được cho phép trong **Client-side Row Model**

### Iterating Rows
Để chạy vòng lặp qua tất cả các `rowNode` trong Grid, ta có thể sử dụng grid's iteration APIs. Các iteration APIs này sẽ chạy qua tất cả `rowNode`, bất kể `rowNode` có được hiển thị ra hay không. Ví dụ như nếu nhóm lại 1 group và group đó bị closed, thì Grid sẽ không hiển thị các element con của group đó, tuy nhiên các element con này sẽ vẫn được tính trong các hàm lặp "for-each":
```javascript
// iterate through every node in the grid
api.forEachNode( function(rowNode, index) {
    console.log('node ' + rowNode.data.athlete + ' is in the grid');
});

// iterate only nodes that pass the filter
api.forEachNodeAfterFilter( function(rowNode, index) {
    console.log('node ' + rowNode.data.athlete + ' passes the filter');
});

// iterate only nodes that pass the filter and ordered by the sort order
api.forEachNodeAfterFilterAndSort( function(rowNode, index) {
    console.log('node ' + rowNode.data.athlete + ' passes the filter and is in this order');
});

// iterate through every leaf node in the grid
api.forEachLeafNode( function(rowNode, index) {
    console.log('node ' + rowNode.data.athlete + ' is not a group!');
});
```
* vd thực tế về cách sử dụng for-each: [link](https://www.ag-grid.com/javascript-grid-accessing-data/#example-using-for-each)
* vd thực tế về cách accessing displayed row: [link](https://www.ag-grid.com/javascript-grid-accessing-data/#example-get-displayed-row)

Tất cả các methods ở trên đều có thể dùng được với **Client-side Row Model**. Với các `rowModel` khác (Viewport, Infinite và Server-side) thì chỉ hỗ trợ 1 method duy nhất là `api.forEachNode()` và nó sẽ chỉ trả về các `rowNode` được loaded trong bộ nhớ của trình duyệt.

## Updating Data
### Updating RowNodes Data
Ta có thể trực tiếp set data của `rowNode` bằng các API method:
* `rowNode.setData(data)`: thay đổi data của `rowNode`, Grid sẽ refresh toàn bộ rendered row đang được hiển thị sau khi quá trình set data hoàn tất.
* `rowNode.setDataValue(colKey, value)`: thay đổi data của `rowNode` ở một column cụ thể được chỉ định. Sau khi quá trình set data hoàn tất, Grid sẽ chỉ refresh rendered cell của required row.

Việc update thông qua các `rowNode` methods trên được hỗ trợ với toàn bộ row models. Quá trình này sẽ refresh required rows nếu chúng đang được hiển thị, tuy nhiên các chức năng grids sorting, filtering hoặc grouping sẽ không được cập nhật. Vì thế cho nên chúng ta cần sử dụng update transaction.

Nếu đang sử dụng **Client-side Row Model** và ta muốn Grid update lại sorting hoặc filtering ngay sau khi quá trình update hoàn tất, ta phải gọi đến `api.refreshClientSideRowModel(step)` với các step tương ứng với: group, filter, map, aggregate, sort, pivot. 

**Client-side Row Model** có các stages theo thứ tự như sau:
* Group => Filter => Pivot => Aggregate => Sort => Map

Vd về updating row node data: [link](https://www.ag-grid.com/javascript-grid-data-update/#example-updating-row-nodes)

Điều đó có nghĩa là nếu như chúng ta gọi `api.refreshClientSideRowModel('filter')`, nó cũng sẽ execute pivot, aggregate, sort và map.

### Full CRUD & Bulk Updating
Nếu ta muốn add, remove hoặc update nhiều row cùng 1 lúc, thì chúng ta có các option sau:
* **Method 1 - Row Data (Normal)**
Thay đổi tất cả row data trong Grid bằng cách gọi `api.setRowData(newData)` hoặc binding new data vào row data property (trong trường hợp sử dụng Angular hoặc React cho phép cơ chế data binding). Đây là method mặc định, Grid sẽ bỏ tất cả data cũ trước đó và tạo lại `rowNode`.
* **Method 2 - Transaction**
Method transaction này sẽ truyền 1 transaction object vào Grid chứa các rows để add, remove và update bằng cách gọi `api.updateRowData(transaction)`. Grid sẽ giữ lại tất cả các stages hiện tại đang được active của row data được impacted. Update bằng transaction là phương pháp tốt nhất trong trường hợp cần update số lượng lớn, lúc này Grid sẽ chỉ refresh những row data cần thiết, việc này đảm bảo performance của hệ thống.
* **Method 3 - Delta Row Data**
Method này sử dụng đến cơ chế của method 2 (transaction) nhưng khác ở chỗ là nó có thêm property `deltaRowDataMode=true`. Khi deltaRowDataMode có giá trị true, Grid sẽ so sánh new row data với current row data và tạo ra 1 transaction object, sau đó execute những thay đổi với cơ chế như update transaction, bao gồm cả việc giữ lại các selections, filters...Method này được sử dụng trong trường hợp muốn manage data nằm ngoài Grid (vd Redux store) và để Grid xử lý những thay đổi nào cần để data luôn là mới nhất.
* **Method 4 - Batch Update**
Method này được sử dụng trong trường hợp cần update nhiều các update nhỏ cùng 1 lúc nhưng vẫn đảm bảo performance, bằng cách gọi `batchUpdateRowData()`.

Tiếp theo chúng ta sẽ đi chi tiết vào từng method.
### Bulk Method 1 - Row Data (Normal)
Đây là update method đơn giản nhất. Khi gọi `api.setRowData(newData)`, Grid sẽ xóa bỏ tất cả selections, filters.. trước đó và tiến hành overwrite lại data cũ. Chúng ta nên sử dụng method này với mục đích load Grid với những data mới hoàn toàn. Method này chỉ hoạt động với **Client-side Row Model**.
### Bulk Method 2 - Transaction
method `api.updateRowData(transaction)` sẽ lấy chi tiết những data items nào cần update và trả về tất cả impacted `rowNode`:
```javascript
// API method for updating data
function updateRowData(rowDataTransaction: RowDataTransaction): RowNodeTransaction;

// params for above
interface RowDataTransaction {

    // rows to add
    add?: any[];

    // index for rows to add
    addIndex?: number;

    // rows to remove
    remove?: any[];

    // rows to update
    update?: any[];
}

// result for above
interface RowNodeTransaction {

    // Row Nodes added
    add: RowNode[];

    // Row Nodes removed
    remove: RowNode[];

    // Row Nodes updated
    update: RowNode[];
}
```
* Grid sẽ tạo ra row mới cho từng item trong `transaction.add` array.
* Grid sẽ remove 1 row cho từng item trong `transaction.remove` array. Nếu `rowNode` ID's được cung cấp thông qua callback `getRowNodeId()` thì Grid sau đó truyền 1 array các object vào với các keys tương ứng với `rowNode` ID được chỉ định bởi `getRowNodeId` và values khớp với các rows mà ta muốn remove. Nếu không có ID's, thì Grid sẽ match các rows dựa trên mối quan hệ khác giữa các object.
* Grid sẽ update từng row cho mỗi item trong `transaction.update` array, trong đó Grid sẽ gọi đến `rowNode.setRowData(newData)`. Tương tự như khi remove, Grid sẽ sử dụng node ID's nếu chúng ta cung cấp ID's, nếu không thì sẽ dùng đến object reference để xác định các rows.
* **Client-side Row Model** support toàn bộ `api.updateRowData()`, **Infinite Row Model** chỉ support 'Add', **Viewport Row Model** và **Server-side Row Model** không support transaction updates.

Vd về updating với transaction: [link](https://www.ag-grid.com/javascript-grid-data-update/#example-updating-with-transaction)
### Bulk Method 3 - Delta Row Data
Nếu trong trường hợp `deltaRowDataMode=true`, sau đó ta gọi `api.setRowData(rowData)` Grid sẽ check những item nào sẽ được add, remove và update. Để làm được điều này thì data phải luôn cố định, tức là thay vì update records, ta nên thay thế record cũ bằng record mới hoàn toàn.

Để `deltaRowDataMode` hoạt động, ta phải cung cấp ID's cho các row nodes bằng cách sử dụng callback `getRowNodeId()`. Grid sẽ xử lý logic delta changes theo các quy luật sau:
* Nếu ID của item mới không match với item đang có sẵn trong Grid, thì nó sẽ là **add**
* Nếu ID của item mới match với item sẵn có trong Grid, sẽ tiến hành so sánh object references. Nếu object references của 2 item này khác nhau, nó sẽ là **update**, còn giống thì bỏ qua.
* Nếu có item trong Grid không match với bất cứ item nào trong data mới, thì nó sẽ là **remove**
### Bulk Method 4 - Batch Transactions
Bất cứ khi nào data của Grid được update, Grid sẽ rework lại toàn bộ aggregations, sorts và filters. Sử dụng batch transaction sẽ giúp tăng tốc trong quá trình update, do nó sẽ gộp các lần update vào từng batch.

Khi chúng ta gọi  `batchUpdateRowData()`, sau khoảng 50ms. Grid sẽ tiến hành update cùng với các lần update khác được cung cấp cũng bằng cách gọi `batchUpdateRowData()`.

Khoảng thời gian giữa mỗi batch mặc định là 50ms, chúng ta có thể thay đổi nó bằng cách thay đổi property `batchUpdateWaitMillis`. 

Dưới đây là ví dụ về cách dùng giữa `updateRowData()` và `batchUpdateRowData()`, một cái là execute ngay lập tức, cái còn lại là execute sau 1 khoảng thời gian và sử dụng callback để show ra kết quả:
```javascript
// normal updateRowData takes a RowDataTransaction and returns a RowNodeTransaction
updateRowData(rowDataTransaction: RowDataTransaction): RowNodeTransaction

// batch takes a RowDataTransaction and the result is provided some time later via a callback
batchUpdateRowData(rowDataTransaction: RowDataTransaction, callback?: (res: RowNodeTransaction)=>void): void
```

Vd về sử dụng batch transaction: [link](https://www.ag-grid.com/javascript-grid-data-update/#example-batch-transaction)
## Summary
Bài viết nhằm giới thiệu về 2 cơ chế **Accessing** và **Updating** data của Grid. Bài viết còn nhiều hạn chế, cảm ơn bạn đã dành thời gian theo dõi. Nguồn và tài liệu tham khảo:
* https://www.ag-grid.com/javascript-grid-accessing-data
* https://www.ag-grid.com/javascript-grid-data-update