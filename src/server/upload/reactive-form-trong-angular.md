### Mở đầu
Ttrong bài viết trước, chúng ta đã tìm hiểu về **Template Driven Form** (mọi người có thể xem lại [tại đây](https://viblo.asia/p/lam-quen-voi-forms-trong-angular-bWrZn0mb5xw)). Trong bài viết ngày hôm nay thì mình sẽ giới thiệu nốt với mọi người về form còn lại trong Angular đó là **Model Driven Form**

### Model-driven forms

**Model Driven Forms** hay còn được gọi là **Reactive Forms**

Phương pháp này tránh việc sử dụng các directive như là **ngModel**, **required**... thay vào đó tạo các Object Model ở trong Component, rồi tạo ra form từ chúng.
    
Cấu trúc cơ bản của 1 **Reactive Form**:
<br/>

![](https://images.viblo.asia/cc518795-3e98-4122-9c09-97751cef8e11.png)

Như mọi người có thể thấy trong sơ đồ trên, ban đầu chúng ta tạo toàn bộ form control tree ở trong code bằng cách tạo mới các instance như là **FormGroup**, **FormControl**..., sau đó để liên kết các instance này với các element ở bên template thì chúng ta tiếp tục sử dụng các directive **formGroup**, **formControlName**...

Về control tree hay còn gọi là **AbstractControl**, nó cung cấp các hành vi, thuộc tính chung cho các lớp con, trong Reactive form có 3 lớp con là: **FormControl**, **FormGroup**, và **FormArray**:

![](https://images.viblo.asia/26576b08-80a6-47d1-a214-875e6b738760.png)

- **FormControl** là lớp thấp nhất, nó tương ứng với một HTML form control như input, select, text area...

- **FormGroup** là nơi lưu giữ giá trị và trạng thái hợp lệ của một nhóm các đối tượng thuộc **AbstractControl** – có thể là **FormControl**, **FormGroup**, hay **FormArray** – đây là một dạng composite. Ở level cao nhất của một form trong component của bạn là một **FormGroup**.

- **FormArray** là nơi lưu giữ giá trị và trạng thái hợp lệ của một mảng các đối tượng thuộc AbstractControl giống như **FormGroup**. Nó cũng là một dạng composite. Nhưng nó không phải là thành phần ở level cao nhất.

### Ví dụ
    
Để có thể sử dụng các APIs mà Angular cung cấp cho việc thao tác với **Reactive forms**, chúng ta cần import ReactiveFormsModule từ package @angular/forms như sau:
    
```js
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...],
  imports: [
    ...,
    ReactiveFormsModule,
  ],
  providers: [...],
  bootstrap: [...]
})
export class AppModule { }
```
    
Đầu tiên chúng ta cần khởi tạo form trong ngOnInit:

![](https://images.viblo.asia/9a2b992f-46e1-4056-b88e-fe1d0b10149a.png)

Ở trong đoạn code phía trên, chúng ta đã tạo ra một instance formGroup là **bookForm**, trong bookForm sẽ có 1 FormControl là **name** với giá trị khởi tạo là 1 string rỗng, kèm theo đó là 1 validation là required. Tiếp theo trong bookForm ta còn tạo thêm 1 FormGroup khác là **property** với 2 FormControl bên trong nó là **year** và **stars**. 

Như vậy là ta đã khởi tạo xong 1 **AbstractControl**. Việc tiếp theo đó là ta cần phải liên kết các Control này với element bên Template

![](https://images.viblo.asia/796fe8c1-1431-4f7d-8263-52d5040670e1.png)

Do instance **bookForm** - FormGroup là lớp cao nhất cho nên chúng ta cần phải dùng directive **formGroup** để liên kết form bên template với **bookForm**
```js
[formGroup]="bookForm"
```
Các **formControl** là lớp nhỏ nhất nên ta sẽ dùng directive là **formControlName** để liên kết
```js
<input formControlName ="name" type="text" id="bookName" />
...
<input formControlName ="year" type="text" id="year" />
...
<input formControlName ="stars" type="text" id="stars" />
```
Còn đối với  **property**, tuy nó cũng là 1 instance formGroup, nhưng không phải là lớp cao nhất trong control tree của chúng ta nên ta sẽ sử dụng directive **formGroupName** để liên kết
```js
<fieldset formGroupName ="property">
...
</fieldset>
```

### Update value
Để update value cho formControl thì có ta 2 cách đó là sử dụng **patchValue** hoặc **setValue**. Về bản chất patchValue chính là gọi lại setValue. Trong khi patchValue chỉ update lại những object value được chỉ định thì setValue sẽ set lại tất cả object value trong form, nếu như thiếu hoặc thừa 1 control nào đó thì hàm setValue sẽ bị báo lỗi. Ví dụ:
```js
bookForm.patchValue({name: 'Harry Potter'});
```
nhưng nếu như sử dụng setValue với cùng object value như trên thì sẽ báo lỗi, do bị thiếu mất các formControl khác, thay vào đó, để sử dụng setValue ta sẽ bắt buộc phải truyền chính xác object có cấu trúc giống như cấu trúc của form:
```js
bookForm.patchValue({name: 'Harry Potter', property: {year: 1998, stars: 5} });
```
### Form Builder
Ngoài cách sử dụng phương thức new để khởi tạo 1 instance cho formControl thì Angular form còn cung cấp cho chúng ta 1 cách khác để tạo ra Form model 1 cách nhanh chóng và tiện lợi hơn, đó là **Form Builder**. 

Bằng cách inject **FormBuilder** vào class mà chúng ta muốn tạo form ta có thể sử dụng các API như **group**, **array**, **control** để tạo form.

```js
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
...
constructor(private fb: FormBuilder) {
}

this.bookForm = this.fb.group({
    name: ('', Validators.required),
    property: this.fb.group({
        year: '',
        stars: '',
    })
})
```

*Note: Đối với API **control** thì có thể không cần phải ghi chi tiết ra mà thay vào đó ta chỉ cần khai báo giá trị khởi tạo của nó là được*

### Validators

Trong Reactive Form tồn tại 2 loại validator đó là: **Sync Validator** và **Async Validator**:
- **Sync Validator**: Giống như tên gọi của nó thì đây là loại validator đồng bộ, bao gồm các validator trực tiếp với form như là: required, minLength, maxLength... 
- **Async Validator**: Validator bất đồng bộ tức là nó sẽ phải chờ 1 tác vụ bất đồng bộ nào đó xử lý xong thì mới tiến hành validate được. Ví dụ như để kiểm tra email trong form đăng ký xem đã tồn tại trong database hay chưa thì chúng ta bắt buộc phải gọi 1 API lên server để kiểm tra, sau khi có kết quả trả về thì lúc này ta mới validate được cho form đăng ký đó.

Ví dụ: Do trường name là formControl nên để thêm validators là required và min length 16 ký tự cho trường name của bookForm ta sẽ làm như sau:
```js
this.bookForm = this.fb.group({
    name: ('', [Validators.required, Validators.minLength(16)]),
    property: this.fb.group({
        year: '',
        stars: '',
    })
})
```

Giải thích 1 chút cách viết trên nhé, nếu như ngó qua doc của FormBuilder thì ta có thể thấy rằng formControl nó sẽ nhận vào 3 params. Param đầu tiên là state của nó, 2 param tiếp theo lần lượt là sync validators (hoặc 1 mảng sync validators) và async validators. 

![](https://images.viblo.asia/afef843c-8a05-4d37-b9f5-c99848ad636e.png)

Vậy đối với FormGroup và FormArray thì chúng ta sẽ viết Validators cho chúng như nào? Lại tiếp tục ngó qua doc của FormGroup

![](https://images.viblo.asia/ef603840-0e41-4731-b716-f454ea07a771.png)

Ta có thể thấy FormGroup nhận vào 2 param, param thứ nhất là các control bên trong nó, param thứ 2 là 1 object với các key là asyncValidator, updateOn, validator. Vậy để tất cả các field trong form không được để trống thì ta có thể thêm Validator cho FormGroup như sau:

```js
this.bookForm = this.fb.group({
    name: '',
    property: this.fb.group({
        year: '',
        stars: '',
    })
}, {
    validator: Validators.required
})
```

### Custom Validators

Để có thể tạo ra validators theo ý của mình thì trước hết chúng ta cần phải tìm hiểu xem 1 validator có cấu trúc như nào, để nắm được điều này thì ta có thể vào doc Validator để tìm hiểu.

![](https://images.viblo.asia/f47a42f4-d0ca-4998-a621-f5fbf9fbdcf7.png)

Đoạn code bên trên chính là Validator required mà chúng ta hay dùng nhất, ta có thể thấy 1 Validator nhận vào 1 param là **AbstractControl** và trả ra 1 giá trị có kiểu **ValidationErrors** hoặc **null**

Vậy bây giờ chúng ta thử tạo 1 Validator với nội dung là người dùng chỉ được nhập số, không được phép nhập ký tự khác cho field **year** trong **bookForm** nhé:

```js
export const yearValidation = (control: FormGroup): { [key: string]: boolean } | null => {
    const year = control.get('year');
    return year.match(/\D.*/) ? { isError: true } : null;
}
```    
Sau khi tạo xong ta chỉ cần sử dụng như những Validator bình thường:
```js
this.bookForm = this.fb.group({
    name: '',
    property: this.fb.group({
        year: ('', yearValidation),
        stars: '',
    })
}, {
    validator: Validators.required
})
```
Ok, như vậy là chúng ta đã custom thành công 1 validator cho riêng mình rồi đó :D
### Kết
Trong bài viết ngày hôm nay thì mình đã giới thiệu với mọi người về **Model-Driven Form** hay còn gọi là **Reactive Form**. Có thể thấy thằng Reactive Form khá là linh hoạt trong cách sử dụng, do form được tạo trong component cho nên các thao tác với form đều sử dụng js và điều này làm mình cảm thấy thoải mái hơn nhiều so với việc phải thao tác trong template html. Và điểm mạnh có Reactive form đó là bên cạnh các Validators có sẵn thì chúng ta có thể tạo ra các Validators vô cùng mạnh mẽ và hiệu quả, đây có lẽ cũng chính là đặc điểm mà nhiều người ưa sử dụng Reactive form hơn là **Template-driven form**.