Khi nghĩ tới trình bày dữ liệu theo từng dòng, từng cột một cách có khoa học, người ta thường nghĩ ngay tới việc sử dụng bảng biểu. Tuy nhiên việc tạo bảng theo cách thông thường (dùng `<table>` mặc định) tốn khá nhiều công sức và nếu bảng phức tạp thì việc code trở nên dài dòng và phức tạp là điều khó tránh khỏi.

Nếu dự án sử dụng nhiều bảng biểu khác nhau, bạn hoàn toàn có thể tạo riêng cho mình một thư viện dùng cho toàn hệ thống. Tuy nhiên việc này yêu cầu bạn phải có kiến  một chút để có thể tạo được một thư viện có đầy đủ chức năng. Ngoài cách đó, bạn có thể tham khảo thư viện **ag-Grid**, chức năng sẵn có của thư viện này hỗ trợ từ những chức năng cơ bản đến phức tạp mà một bảng biểu cần phải có như:
- Tạo cột, điều chỉnh chiều rộng, chiều cao, wrap text
- Sort, filter dữ liệu, kéo thả vị trí các cột trên UI, đặt cố định một số cột
- Nhập liệu trực tiếp, format dữ liệu...

Hoặc bạn có thể tuỳ ý thêm các tính năng khác cho grid như: 
- Validate dữ liệu nhập
- Tạo custom input gắn liền với từng cells
- Chèn công thức tính toán như trên excel

Trong series này, tôi sẽ giới thiệu về cách sử dụng cơ bản cũng như cách để thêm tính năng cho ag-Grid như đã nêu trên. ag-Grid hỗ trợ các framwork chính hiện nay như Angular, React và Vue, bạn cũng có thể sử dụng với pure Javascript nếu muốn. Nội dung của bài viết sẽ chỉ đề cập đến cách sử dụng trong Angular. Version hiện tại angular 7.3.9, ag-Grid 21.0.1

-----
## Phần 1: Cài đặt và cách sử dụng cơ bản

### 1. Cài đặt
**Bước 1: Cài đặt ag-Grid bằng npm**
```
npm install --save ag-grid-community ag-grid-angular
```
ag-Grid có bản Community (miễn phí) và Enterprise (mất phí) (tham khảo tại [đường dẫn này](https://www.ag-grid.com/license-pricing.php)). Bản Enterprise có thêm một số các tính năng hỗ trợ cao cấp hơn (như xuất file excel, thay vì chỉ được xuất csv ở bản miễn phí). Tuy nhiên để học và tìm hiểu hoặc làm project nhỏ thì bản Community đã quá đầy đủ các chức năng cần thiết rồi.

**Bước 2: Thêm ag-Grid vào app**
- Thêm vào app.module.ts
```typescript:app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

- Import theme mặc định của ag-Grid trong style.scss
```scss:style.scss
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-balham.css";
```

Tới đây thì bạn đã có thể hoàn toàn có thể sử dụng ag-Grid ngay được giống như trong hướng dẫn tại [document của ag-Grid](https://www.ag-grid.com/angular-getting-started). Tuy nhiên, việc sử dụng như vậy sẽ làm giảm khả năng customize sau này hoặc nếu muốn có một setting cho tất cả các bảng ag-Grid thì sẽ phải copy các setting đó mang đi tất cả các component.

Cách tiếp cận tôi lựa chọn là tạo một component common để tuỳ chỉnh ag-Grid và dùng lại component đó. Tôi đã tạo một repository github, để tham khảo tại [đây](https://github.com/minhha0317/ag-grid-example). Cụ thể như sau:

**Bước 3: Customize**
- ag-grid-common.component.html
```html:ag-grid-common.component.html
<ag-grid-angular
  style="width: 500px; height: 500px;"
  class="ag-theme-balham"
  [columnDefs]="gridColDef"
  (gridReady)="gridReady($event)"
>
</ag-grid-angular>
```

- ag-grid-common.component.ts
```typescript:ag-grid-common.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid-common.component.html',
  styleUrls: ['./ag-grid-common.component.scss']
})
export class AgGridCommonComponent implements OnInit {
  @Input() gridColDef: Array<any>;
  @Input() rowData: Array<any>;

  @Output() gridRendered = new EventEmitter<any>();

  params: any;

  constructor() { }

  ngOnInit() {
  }

  gridReady(params) {
    this.params = params;
    this.gridRendered.emit(params);
  }
}
```

- `(gridReady)`: Event được trigger khi khi khởi tạo grid, method này sẽ emit một object (ở đây goi là params), trong đó có chứa các method và các giá trị về grid đã được khởi tạo để tác động, điều chỉnh lại grid trong quá trình sử dụng sau này.
- `gridColDef`: Array define các cột trong bảng.

### 2. Sử dụng cơ bản
![Kết quả](https://images.viblo.asia/a2d71216-a754-49ba-b871-a7514087bba8.png)

Tạo component `basic-grid`.
- basic-grid.component.html
```html:basic-grid.component.html
<app-ag-grid (gridRendered)="gridRendered($event)" [gridColDef]="gridColDef"></app-ag-grid>
```

- basic-grid.component.ts
```typescript:basic-grid.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss']
})
export class BasicGridComponent implements OnInit {
  gridColDef;
  data;

  constructor() { }

  ngOnInit() {
    this.gridColDef = [
      { headerName: 'Make', field: 'make' },
      { field: 'model' },
      { headerName: 'Price', field: 'price' }
    ];
    this.data = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }

  gridRendered(params) {
    params.api.setRowData(this.data);
  }
}
```

Object `params` của ag-Grid (đã nói ở trên) được dùng để call method setRowData(), ghép dữ liệu vào trong bảng.

Ngoài ra, ag-Grid còn hỗ trợ một số thuộc tính khác của cột giúp điều chỉnh chiều rộng, chiều cao, chia nhóm cột, cho phép kéo thả các cột trên UI, filter, ... có thể tham khảo thông tin thêm tại [đây](https://www.ag-grid.com/javascript-grid-column-definitions/).

Trong phần sau tôi sẽ giới thiệu thêm về cách sử dụng một số chức năng sâu hơn của ag-Grid, cũng như một vài ứng dụng thực tế với API. Mong rằng các thông tin này sẽ trở nên hữu ích cho các bạn sau này, xin cảm ơn!