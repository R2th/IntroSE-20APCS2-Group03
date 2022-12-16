Trong bài viết trước (link tại [đây](https://viblo.asia/p/ag-grid-the-best-javascript-grid-in-the-world-angular-tutorial-p2-QpmledqVZrd)), tôi đã đề cập đến cách cài đặt và sử dụng cơ bản của thư viện AgGrid, một thư viện rất hữu ích trong việc tạo bảng biểu. Các ví dụ trong bài viết lần này được viết tiếp dựa trên source code của phần trước, đây là [link github của source code](https://github.com/minhha0317/ag-grid-example), các bạn có thể tải về và tham khảo.

Trong bài viết lần này, tôi sẽ đề cập đến cách **validation** dữ liệu được người dùng nhập vào ag-grid trước khi gửi lên server

---

## Phần 3: Validate dữ liệu nhập
>  Data validation is the process of ensuring data have undergone data cleansing to ensure they have data quality, that is, that they are both correct and useful
>  
>  -- *Wikipedia*

Theo như định nghĩa trên thì Data Validation có nghĩa là việc đảm bảo dữ liệu đầu vào đã được thông qua các bước sàng lọc (cleansing) để đảm bảo chất lượng và tính hữu ích của dữ liệu. 

Validate dữ liệu đầu vào là một bước không thể thiếu trong tất cả các hệ thống cho phép người sử dụng nhập liệu, không chỉ để đảm bảo dữ liệu đúng và hỗ trợ người dùng phát hiện lỗi hay dữ liệu không đảm bảo, mà validation (nếu được sử dụng hiệu quả) còn giúp tạo thêm một lớp bảo vệ cho dữ liệu và hệ thống.

Ag-grid cho phép người dùng có thể nhập thẳng dữ liệu vào trong bảng, tuy nhiên, để có thể validate dữ liệu, ta cần phải tạo một service riêng để thực hiện việc này.

## 1. Chuẩn bị
- Tạo bảng Ag-Grid có dữ liệu và cho phép user nhập liệu

``` typescript:example-article-3.ts
this.gridColDef = [
      { headerName: 'Make', field: 'make', width: 80 },
      { headerName: 'Model', field: 'model', editable: true, width: 80 },
      {
        headerName: 'Price', field: 'price', width: 100,
        cellStyle: { textAlign: 'right' },
        valueFormatter: params => params.value.toLocaleString()
      },
      { headerName: 'In Stock', field: 'inStock', editable: true, width: 80 },
      {
        headerName: 'Value', field: 'value', width: 100, cellStyle: { textAlign: 'right' },
        valueFormatter: params => params.value.toLocaleString()
      },
      {
        headerName: 'New Arrival', field: 'newArrival', width: 120,
        cellRenderer: params => params.value ? 'Yes' : 'No'
      },
      {
        headerName: 'Last Modified', field: 'lastModified', width: 120,
        cellStyle: { textAlign: 'right' },
        cellRenderer: params => this.formatDate(params.value)
      }
];
```

- Cài đặt ngx-toastr cho việc hiển thị validation. Bạn có thể sử dụng bất cứ cách nào khác để hiển thị dữ liệu, tuy nhiên trong ví dụ này tôi chọn sử dụng toastr vì dễ setup và sử dụng. Hướng dẫn cài đặt xem ở [đây](https://www.npmjs.com/package/ngx-toastr).

## 2. Tạo Validation Service
- Tạo ag-validate enum để lưu các loại validator:
```typescript:ag-validate
export enum AgValidate {
  Required = 'required',
  Number = 'number'
}
```

- Tạo validators service:
```typescript:ag-validation.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AgValidate } from '../constants/ag-validate';

@Injectable({
  providedIn: 'root'
})
export class AgValidationService {

  constructor(private toast: ToastrService) {
  }

  private validateEachRow(params, columnToValidate, dataToValidate) {
    for (let i = 0; i < dataToValidate.length; i++) {
      const rowIndex = i;
      for (const key in columnToValidate) {
        /**
         * Required
         */
        if (columnToValidate[key].validators.indexOf(AgValidate.Required) > -1 && !dataToValidate[i][key]) {
          this.toast.error(`Trường ${columnToValidate[key].headerName} là bắt buộc, kiểm tra lại dòng sô ${rowIndex + 1}`);
          params.api.setFocusedCell(rowIndex, key);
          return false;
        }

        /**
         * Number
         */
        if (dataToValidate[i][key] && columnToValidate[key].validators.indexOf(AgValidate.Number) > -1) {
          const NUMBER_REGEX = /^\d+$/g;
          if (!NUMBER_REGEX.test(dataToValidate[i][key].toString())) {
            this.toast
              .error(`Chỉ được nhập số nguyên vào trường ${columnToValidate[key].headerName}, kiểm tra lại dòng sô ${rowIndex + 1}`);
            params.api.setFocusedCell(rowIndex, key);
            return false;
          }
        }
      }
    }
  }

  private getColumnToValidate(fieldGrid) {
    const columnToValidate = {};
    fieldGrid.forEach(colDef => {

      if (colDef.validators && colDef.validators.length > 0) {
        columnToValidate[colDef.field] = { headerName: colDef.headerName, validators: colDef.validators };
        if (colDef.maxLength) {
          columnToValidate[colDef.field] = Object.assign(columnToValidate[colDef.field], { maxLength: colDef.maxLength });
        }
      }
    });
    return columnToValidate;
  }

  validateDataGrid(params, fieldGrid, displayedData) {
    return this.validateEachRow(params, this.getColumnToValidate(fieldGrid), displayedData);
  }
}
```

- Cách sử dụng: 
```typescript:example-article-3.component
submitGridData() {
    const gridData = this.getAllData(this.gridParams);
    if (this.agValidation.validateDataGrid(this.gridParams, this.gridColDef, gridData)) {
      return;
    }

    console.log(gridData);
}
```

Function validateDataGrid sẽ trả giá trị true/false tương ứng với khi không hoặc có dữ liệu không thoả mãn điều kiện. Có thể tạo mới các loại validate khác bằng regex và thêm vào trong hàm validateEachRow của service.
Source code của ví dụ tại [đây](https://github.com/minhha0317/ag-grid-example).