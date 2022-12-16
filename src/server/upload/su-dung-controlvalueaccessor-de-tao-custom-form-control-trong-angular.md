Trong công việc của một DEV Angular chắc hẳn các bạn đã từng cần phải tạo ra các component FormControl để phục vụ các nhu cầu riêng biệt mà các FormControl default của angular không đáp ứng được? Có nhiều cách để tạo được một custom form control, nhưng trong bài viết này mình sẽ nói về **ControlValueAccessor**, một cách khá thú vị và chuyên nghiệp để tạo các form control trong angular.
## Chúng ta sẽ làm gì?
Trong bài viết này mình sẽ tạo một custom selectbox có chức năng chọn ra các tỉnh, thành phố theo điều kiện (tỉnh, thành phố đó có phải là thành phố trực thuộc trung ương không?)
## Sử dụng ControlValueAccessor như thế nào?
**ControlValueAccessor** là một interface đóng vai trò là cầu nối giữa Form API của angular với các native element trên DOM. Nó định nghĩa các phương thức để ghi giá trị và lắng nghe những thay đổi trên dữ liệu của các input element.

Chúng ta sẽ sử dụng interface này để tạo các lệnh điều khiển cho custom form control một cách đồng nhất với Angular.

Để sử dụng **ControlValueAccessor** chúng ta cần đăng ký một provider là **NG_VALUE_ACCESSOR** và implements các phương thức của **ControlValueAccessor** trong custom component.

```typescript
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'province-select',
  templateUrl: './province-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceSelect),
      multi: true
    }
  ]
})
export class ProvinceSelect implements ControlValueAccessor {

  writeValue(obj: any) {
  }

  registerOnChange(fn: any) {
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }
  
}
```

**ControlValueAccessor** định nghĩa 4 phương thức chính
- **writeValue()** để ghi giá trị cho element
- **registerOnChange()** để đăng ký hàm callback được gọi để thông báo cho angular khi có sự thay đổi của giá trị
- **registerOnTouched()** để đăng ký hàm callback được gọi để thông báo cho angular khi element có sự thao tác
- **setDisabledState()** để gán giá trị cho thuộc tính [disabled]

Đối với **writeValue()** nó sẽ được gọi ngay sau khi chúng ta sử dụng FormControlDirective, FormControlName hoặc NgModel directives.

VD: `<province-select [(ngModel)]="provinceModel" name="provinceModel"></province-select>` lúc này **writeValue()** sẽ nhận vào giá trị của ngModel là giá trị của biến provinceModel.

Chúng ta triển khai component `<province-select>` như sau:

```typescript
// province-select.component.ts
export class ProvinceSelect implements ControlValueAccessor {
  provincesList: { id: number, name: string, type: 'central' | 'province' }[] = [
    { id: 1, name: 'Hà Nội', type: 'central' },
    { id: 2, name: 'TP Hồ Chí Minh', type: 'central' },
    { id: 3, name: 'Đà Nẵng', type: 'central' },
    { id: 4, name: 'Lào Cai', type: 'province' },
    { id: 5, name: 'Yên Bái', type: 'province' },
    { id: 6, name: 'Quảng Bình', type: 'province' },
    { id: 7, name: 'Thái Nguyên', type: 'province' },
    { id: 8, name: 'Daklak', type: 'province' },
    { id: 9, name: 'Nghệ An', type: 'province' },
    { id: 10, name: 'Hà Tĩnh', type: 'province' }
  ];
  private provinceData: { id: number, name: string, type: 'central' | 'province' };
  onChange: (provinceData: any) => void;
  onTouched: () => void;
  isDisabled: boolean;

  isSelect(provinceId: number): boolean {
    return !this.provinceData ? false : (provinceId === this.provinceData.id);
  }

  writeValue(obj: any) {
    this.provinceData = obj;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  handleOnProvinceChange(e) {
    const provinceId = parseInt(e.target.value);
    const provinceSelect = this.provincesList.find(province => province.id === provinceId);
    this.writeValue(provinceSelect);
    this.onChange(provinceSelect);
  }

}
```

```html
<!--province-select.component.html-->
<select (change)="handleOnProvinceChange($event)" (focus)="onTouched()" [disabled]="isDisabled">
  <option disabled hidden>-- Select a province --</option>
  <option *ngFor="let province of provincesList" [value]="province.id" [selected]="isSelect(province.id)">{{province.name}}</option>
</select>
```

```html
<!--app.component.html-->
<province-select [(ngModel)]="provinceModel" name="provinceModel" #provinceEl="ngModel"></province-select>
<span>{{provinceEl.touched ? 'touched' : 'none touch'}}</span>
```
- **onChange** được đăng ký là hàm callback của **registerOnChange()** và được gọi trong hàm **handleOnProvinceChange()** khi chúng ta thay đổi giá trị của select. Khi **onChange** được gọi, nó sẽ phát ra một event và có thể nhận được qua Subject **valueChanges** của **#provinceEl**.
- **onTouched** được đăng ký là hàm callback của **registerOnTouched()** và được gọi khi chúng ta focus vào select. Khi **onTouched** được gọi, nó sẽ thay đổi giá trị **touched** của  **#provinceEl**.
- Khi chúng ta thêm thuộc tính [disabled] vào province-select `<province-select [disabled]="true"></province-select>` thì **setDisabledState()** được gọi và thay đổi giá trị cho isDisabled;

## Implement Validator
Để tạo các custom validator cho formControl, chúng ta cần đăng ký provider **NG_VALIDATORS** và implement interface **Validator** của angular.

```typescript
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, Validator, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'province-select',
  templateUrl: './province-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceSelect),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProvinceSelect),
      multi: true
    }
  ]
})
export class ProvinceSelect implements ControlValueAccessor, Validator {
  // ...
  @Input('type') type: 'central' | 'province';
  
  validate(c: FormControl) {
    if (!this.type || !this.provinceData) {
      return null;
    }
    return this.provinceData.type === this.type ? null : {
      type: {
        valid: false,
        actual: c.value
      }
    }
  }
  
  // ...
}
```

Interface **Validator** định nghĩa một phương thức **validate()** trả về giá trị null hoặc một object mô tả trạng thái kết quả validate.

```html
<!--app.component.html-->
<province-select [(ngModel)]="provinceModel" name="provinceModel" #provinceEl="ngModel" [type]="'central'"></province-select>
<span>{{provinceEl.touched ? 'touched' : 'none touch'}}</span>
<p style="color:red" *ngIf="provinceEl.invalid && provinceEl.errors.type">Type is not correct</p>
```

Khi chúng ta thêm một input [type] chỉ ra kiểu mà Province được chấp nhận thì hàm **validate()** sẽ thực hiện kiểm tra tính đúng đắn của dữ liệu.

## Demo

[Xem ví dụ tại đây](https://stackblitz.com/edit/custom-form-control-angular)