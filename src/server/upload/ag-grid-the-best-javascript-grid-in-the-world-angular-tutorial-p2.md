Trong bài viết trước (link tại [đây](https://viblo.asia/p/ag-grid-the-best-javascript-grid-in-the-world-angular-tutorial-p1-djeZ14yjKWz)), tôi đã đề cập đến cách cài đặt và sử dụng cơ bản của thư viện AgGrid, một thư viện rất hữu ích trong việc tạo bảng biểu. Các ví dụ trong bài viết lần này  được viết tiếp dựa trên source code của phần trước, đây là [link github của source code](https://github.com/minhha0317/ag-grid-example), các bạn có thể tải về và tham khảo.

Trong bài viết lần này, tôi sẽ tiếp tục đề cập đến các tính năng sâu hơn của AgGrid trong thực tế như **format lại dữ liệu** của nhận về từ server trước khi hiển thị ra màn hình và **sửa thông tin trực tiếp trên bảng AgGrid**.

-----


## Phần 2: Một ví dụ về cách sử dụng trong thực tế

### 1. Format lại dữ liệu

- Để bắt đầu với ví dụ lần này, tôi đã tạo ra một component mới trong đó có chứa bảng AgGrid như sau:

**`example-article-2 component`**:
```html:example-article-2.component.html
<app-ag-grid (gridRendered)="gridRendered($event)" [gridColDef]="gridColDef"></app-ag-grid>
```

```typescript:example-article-2.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-article',
  templateUrl: './example-article-2.component.html',
  styleUrls: ['./example-article-2.component.scss']
})
export class ExampleArticle2Component implements OnInit {
  gridColDef;
  gridParams;
  data;

  constructor() { }

  ngOnInit() {
    this.gridColDef = [
      { headerName: 'Make', field: 'make', width: 100 },
      { field: 'model', width: 100 },
      { headerName: 'Price', field: 'price', width: 100 },
      { field: 'newArrival', width: 100 },
      { field: 'lastModified', width: 100 }
    ];
    this.data = [
      { newArrival: false, make: 'Toyota', model: 'Celica',
      price: 35000, lastModified: new Date().getTime() },
      { newArrival: true, make: 'Ford', model: 'Mondeo',
      price: 32000, lastModified: new Date().getTime() },
      { newArrival: false, make: 'Porsche', model: 'Boxter',
      price: 72000, lastModified: new Date().getTime() }
    ];
  }

  gridRendered(params) {
    this.gridParams = params;
    this.gridParams.api.setRowData(this.data);
  }
}
```

Dưới đây là kết quả của bảng AgGrid với cách tạo như trên:
![](https://images.viblo.asia/ba507442-12f0-4292-aaab-e18f7dcc6cd9.png)

Dữ liệu các cột `Make`, `Model` đang ổn, tuy nhiên, các cột như `Price`, `New Arrival`, `Last Modified` đang hiển thị ở dạng mà user sẽ rất khó đọc.

**=> Cần thiết phải format lại dữ liệu như sau:**
- Price: Có dấu phân cách hàng nghìn
- Out of stock: Từ `boolean` thành "Yes" hoặc "No"
- Last modified: Từ `timestamp` thành `string` dạng **"DD/MM/YYY"**

Mỗi object trong array `gridColDef` có hai thuộc tính có thể giúp hoàn thành việc này: `valueFormatter` và `cellRenderer`. Cả hai đều dùng để format dữ liệu hiển thị, tuy nhiên điểm khác biệt là **cellRenderer sẽ làm thay đổi dữ liệu**, còn **valueFormatter chỉ làm thay đổi dữ liệu về mặt hiển thị**.

Cả `valueFormatter` và `cellRenderer` đều là hai callback method có argument là params cấu tạo nên từng dòng trong bảng AgGrid. Cách dùng như sau:

```typescript:example-article-2.component.ts
this.gridColDef = [
      { headerName: 'Make', field: 'make', width: 100 },
      { field: 'model', width: 100 },
      
      { headerName: 'Price', field: 'price', width: 100,
        cellStyle: {textAlign: 'right'},
        valueFormatter: params => params.value.toLocaleString() },
        
      { field: 'newArrival', width: 100,
        cellRenderer: params => params.value ? 'Yes' : 'No' },
        
      { field: 'lastModified', width: 100,
        cellRenderer: params => this.formatDate(params.value) }
    ];
```

Đây là kết quả sau khi dữ liệu được format:
![](https://images.viblo.asia/73710ec6-5f92-4bc1-b531-6b817baabcd6.png)

### 2. Edit trực tiếp trên AgGrid

- AgGrid cho phép sửa dữ liệu trực tiếp trên bảng, để bật tính năng này, bạn chỉ cần thêm thuộc tính `editable: true` vào các field ô cần cho phép edit. Mặc định thì thuộc tính này sẽ là false. Để dễ minh hoạ, hãy thêm cột `inStock` và `value` vào trong bảng.

```typescript:example-article-2.component.ts
...
this.gridColDef = [
  { field: 'make', width: 80 },
  { field: 'model', width: 80 },
  {
    field: 'price', width: 100,
    cellStyle: {textAlign: 'right'},
    valueFormatter: params => params.value.toLocaleString()
  },
  { field: 'inStock', editable: true, width: 80 },
  {
    field: 'value', width: 100, cellStyle: {textAlign: 'right'},
    valueFormatter: params => params.value.toLocaleString()
  },
  {
    field: 'newArrival', width: 120,
    cellRenderer: params => params.value ? 'Yes' : 'No'
  },
  {
    field: 'lastModified', width: 120,
    cellStyle: {textAlign: 'right'},
    cellRenderer: params => this.formatDate(params.value)
  }
];
this.data = [
  { newArrival: false, make: 'Toyota', model: 'Celica', price: 35000, inStock: 5, value: 175000, lastModified: 1565370000000 },
  { newArrival: true, make: 'Ford', model: 'Mondeo', price: 32000, inStock: 3, value: 96000, lastModified: 1565542800000 },
  { newArrival: false, make: 'Porsche', model: 'Boxter', price: 72000, inStock: 8, value: 576000, lastModified: 1566274312323 }
];
...
```

- Sử dụng event có sẵn của AgGrid là `(cellEditingStarted)` và `(cellEditingStopped)`. Đúng như tên gọi, hai event sẽ được gọi khi bắt đầu hoặc kết thúc edit một ô (cell) bất kỳ trong AgGrid.

``` html:ag-grid-common.component.html
<ag-grid-angular
  style="width: 700px; height: 500px;"
  class="ag-theme-balham"
  [columnDefs]="gridColDef"
  [frameworkComponents]="frameworkComponents"

  (gridReady)="gridReady($event)"
  (cellEditingStarted)="cellEditingStarted.emit($event)"
  (cellEditingStopped)="cellEditingStopped.emit($event)"
>
</ag-grid-angular>
```

- Bắt edit event trong component
```html:example-article-2.component.html
<app-ag-grid [gridColDef]="gridColDef"
             (gridRendered)="gridRendered($event)"
             (cellEditingStopped)="cellEditingStopped($event)"
></app-ag-grid>
```

```typescript:example-article-2.component.ts
...
cellEditingStopped(params) {
  const field = params.colDef.field;
  if (field === 'price' || field === 'inStock') {
    params.data.value = +params.data.price * +params.data.inStock;
    params.api.refreshCells();
  }
}
...
```
Giờ hãy thử edit ô trong cột `price` hoặc `inStock` và xem kết quả, giá trị cột `value` sẽ được cập nhật ngay sau khi kết thúc edit. 

-----

Trên đây là 2 trong số các tính năng mà có khả năng cao là bạn sẽ được yêu cầu thực hiện trong dự án của mình. Toàn bộ dữ liệu được edit sẽ chỉ được lưu ở front-end, để lưu lại dữ liệu thay đổi ta cần phải gửi request lên server. Thông thường, trước khi gửi request lên server thì việc đầu tiên cần làm đó là validate dữ liệu, trong bài tiếp theo tôi sẽ đề cập đến vấn đề này cũng như gắn vào cell một số loại input của form thường sử dụng như checkbox, select.

Xin cảm ơn các bạn đã dành thời gian đọc!