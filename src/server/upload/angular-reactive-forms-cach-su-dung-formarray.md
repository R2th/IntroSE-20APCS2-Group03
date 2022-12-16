Trong bài viết này chúng ta sẽ tìm hiểu khi nào và cách sử dụng `FormArray`, cả trong Component và trong Template, ngoài ra chúng ta sẽ xem cách để custom validation cho nó. 

*Lưu ý: Để bài viết đem lại hiệu quả nhất, thì hãy tự trang bị cho mình thêm 1 chút kiến thức cơ bản về `FormGroup` và `FormControl` nhé.*
## Vì sao chúng ta cần sử dụng `FormArray`
Có thể bạn đã biết, khi chúng ta tạo một `AbstractControl` như `FormGroup` hay `FormControl`, chúng ta có thể sử dụng mảng như một giá trị. Ví dụ
```
@Component({ template: '' })
export class SkillsComponent {
  control = new FormControl(['some', 'value']);

  group = new FormGroup({
    skills: ['some', 'value']
  });
}
```
Tuy nhiên, cách khai báo này sẽ gây khó khăn để sử dụng Angular API cho từng phần tử trong mảng, cũng như đồng bộ giá trị hay sử dụng API validate. Đó là khi ta cần dùng đến `FormArray`
## `FormArray` là gì
`FormArray` có trách nhiệm quản lý một tập hợp các `AbstractControl`, có thể là `FormGroup`, `FormControl` hoặc `FormArray` khác.

Cũng giống như `FormGroup`, nhóm các đối tượng `AbstractControl` trong một đối tượng, `FormArray` cũng làm tương tự nhưng trong một mảng. Angular có các API cụ thể để giúp bạn quản lý tập hợp này mà chúng ta sẽ nói rõ hơn ở phần sau. Giờ hãy xem cách sử dụng nó.
## Làm việc với `FormArray`
Giả sử chúng ta muốn hiển thị một form mà người dùng có thể thêm, sửa, xóa từ một danh sách kĩ năng
```
@Component({ template: '' })
export class SkillsComponent {
  skills = new FormArray([]);
}
```
Chúng ta tạo một `FormArray` với giá trị khởi tạo là một mảng rỗng. Giờ hãy xem các thuộc tính của `skills`:
```
{
  controls: [],
  valid: true,
  disabled: false,
  value: [],
  invalid: false,
  ...
}
```
Giống như `FormControl` hay `FormGroup`, `FormArray` cũng được kế thừa từ class `AbstractControl`, nên cũng có nhiều thuộc tính giống nhau, như `valid`, `dirty`, `disabled`,... Ngoài ra, nó có thêm 1 thuộc tính `controls` để chứa mảng các phần tử của `AbstractControl`. 

GIờ hãy thêm 1 skill:
```
@Component({ template: '' })
export class SkillsComponent {
  skills = new FormArray([]);

  addSkill() {
    this.skills.push(new FormControl(''));
  }
}
```
Mỗi lần gọi đến phương thức `addSkill`, chúng ta sẽ thêm 1 `FormControl` mới vào mảng `controls`. Giờ hãy sử dụng nó trong template. Đầu tiên, chúng ta cần một vòng lặp cho thuộc tính `controls` của `FormArray`:
```
<div *ngFor="let control of skills.controls; index as i">
  ...
</div>
```
Giờ, chúng ta thêm vào mỗi control directive `formControl` để đồng bộ mỗi control với phần tử tương ứng.
```
<div *ngFor="let control of skills.controls; index as i">
    <input [formControl]="skills.controls[i]" />
</div>
```
![](https://images.viblo.asia/61989a60-f51b-41b4-813b-77c4ebf13f72.gif)
Thật đơn giản phải không. Giờ hãy thử vài phương thức khác mà chúng ta có thể sử dụng luôn: 
* `removeAt(index)`: Phương thức này nhận vào `index` và loại bỏ `AbstractControl` tương ứng. 
```
@Component()
export class SkillsComponent {
  skills = new FormArray([]);

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
}
```
```
<div *ngFor="let control of skills.controls; index as i">
    <input [formControl]="skills.controls[i]" />
    <button (click)="removeSkill(i)">x</button>
```
* `insert(index, AbstracControl)`: trái ngược với `removeAt()`, nó thêm 1 `AbstractControl` mới vào vị trí index trong mảng controls
```
export class SkillsComponent {
  skills = new FormArray([]);

  prepend() {
    this.skills.insert(0, new FormControl(''));
  }
}
```
* `clear()`: loại bỏ tất cả phần tử trong mảng
```
export class SkillsComponent {
  skills = new FormArray([]);

  clear() {
    this.skills.clear();
  }
}
```
* `setControl(index, AbstractControl)`: không giống với phương thức `insert`, nó thay thế control đã có bằng `AbstractControl` truyền vào. Trong ví dụ dưới đây, nó được sử dụng trong phương thức `replace()`, để thay thế control đầu tiên bằng một cái mới vừa tạo.
```
export class SkillsComponent {
  skills = new FormArray([]);

  replace() {
    this.skills.setControl(0, new FormControl(''));
  }
}
```
* `at(index)`: trà về `AbstracControl` ở vị trí index của mảng. Trong ví dụ dưới đây sẽ trả về control đầu tiên
```
export class SkillsComponent {
  skills = new FormArray([]);

  getFirst() {
    return this.skills.get(0);
  }
}
```
## Thêm FormGroup
Trong phần trước, chúng ta đã biết cách để quản lý tập hợp `FormControls`, giờ hãy xem cách để quản lý đối tượng `FormGroup` trong `FormArray`:
```
export class SkillsComponent {
  skills = new FormArray([]);

  addSkill() {
    const group = new FormGroup({
      level: new FormControl(''),
      name: new FormControl('')
    });

    this.skills.push(group);
  }
}
```
Thay vì truyền vào `FormControl`, chúng ta truyền vào `FormGroup`. Còn trong template:
```
<div *ngFor="let skill of skills.controls;">
  <ng-container [formGroup]="skill">
    <input formControlName="level" />
    <input formControlName="name" />
  </ng-container>
</div>
```
Chúng ta chạy vòng lặp mỗi control, như trong ví dụ là `FormGroup`, và truyền nó vào directive `formGroup`. Tiếp đó chỉ là đồng bộ dữ liệu bằng cách quen thuộc - truyền tên control vào directive `formControlName`.
## Sử dụng FormArray trong FormGroup
Giờ khi đã quen với những điều cơ bản, hãy xem xét một số ví dụ thực tế hơn, trong đó ta thường sử dụng `FormGroup` bên trong `FormArray`
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([])
  });
}
```
Không có gì đặc biệt ở đây, chỉ là tạo một `FormGroup` bình thường. Hãy nhìn vào template
```
<form [formGroup]="user">
  <input formControlName="name" />
</form>
```
Chúng ta thêm directive `formGroup` vào form, và bên trong, chúng ta liên kết control `name` thông qua directive `formControlName`. Tương tự, để liên kết với các control của `FormArray`, chúng ta cần làm theo 3 bước sau:
```
<form [formGroup]="user">
  <input formControlName="name" />

  <ng-container formArrayName="skills">
    ...
  </ng-container>
</form>
```
Đầu tiên, ta cần thêm `formArrayName` vào phần tử cha, nó giống như chạy `user.get(skills)`.

Tiếp theo, giống như ví dụ trước, chúng ta cần chạy vòng lặp các control trong `FormArray`:
```
<form [formGroup]="user">
  <input formControlName="name" />

  <ng-container formArrayName="skills">
    <div *ngFor="let skill of skills.controls">
      ...
    </div>
  </ng-container>
</form>
```
Trước khi đến với bước cuối cùng, hãy định nghĩa thuộc tính `skills` trong component. Theo cách truyền thống là sử dụng hàm `getter` để tham chiếu tới control `FormArray` từ thằng cha `FormGroup`.
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([])
  });

  get skills() {
    return this.user.get('skills') as FormArray;
  }
}
```
Hoặc ta có thể khai báo nó như 1 biến
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([])
  });

  skills = this.user.get('skills') as FormArray;
}
```
Giờ là bước cuối cùng:
```
<form [formGroup]="user">
  <input formControlName="name" />

  <ng-container formArrayName="skills">
    <div *ngFor="let _ of skills.controls; index as i">
      <input [formControlName]="i" />
    </div>
  </ng-container>
</form>
```
Directive `formControlName` lấy tên của control mà chúng ta muốn đồng bộ với phần tử của form. Khi làm việc với `FormGroup`, chúng ta truyền vào tên key của đối tượng, ví dụ:
```
<form [formGroup]="user">
  <input formControlName="name" />
</form>
```
Nó sẽ tìm kiểu `user.get('name')`. Nhưng trong trường hợp này, nó là `FormArray` nên tên sẽ là index. Trong JS, mảng là một đối tượng đặc biệt, có key là số (dựa trên index của chúng), vì vậy code sẽ giống như thế này: `user.get('skills')[index] => FormControl`.

Giờ hãy xem quy trình tương tự với `FormArray` chứa tập hợp các `FormGroup`:
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        level: new FormControl('')
      })
    ])
  });

  skills = this.user.get('skills') as FormArray;
}
```
```
<form [formGroup]="user">
  <input formControlName="name" />

  <ng-container formArrayName="skills">
    <div *ngFor="let _ of skills.controls; index as i">
      <ng-container [formGroupName]="i">
        <input formControlName="name" />
      </ng-container>
    </div>
  </ng-container>
</form>
```
Vì `FormArray` giờ chứa `FormGroup` nên chúng ta cần dùng directive `formGroupName`: `user.get('skills')[index] => FormGroup`.

Khi chúng ta sử dụng `formControlName`, nó sẽ tìm kiếm `ControlContainer` cha gần nhất, trong trường hợp này là đối tượng `FormGroup` cha hiện tại.
## FormArray Validation
Như đã đề cập từ đầu, ta có thể áp dụng validation vào mỗi `AbstractControl` như chúng ta thường làm:
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([])
  });

  skills = this.user.get("skills") as FormArray;

  addSkill() {
    cost control = new FormControl('', Validators.required);
    this.skills.push(control);
  }
}
```
Trong trường hợp này, tính hợp lệ của `FormArray` dựa trên tính hợp lệ của các `AbstractControl`. Vì vậy, chỉ cần có 1 `AbstractControl` không hợp lệ, tính hợp lệ của `FormArray` sẽ được set là false.

Chúng ta cũng có thể áp dụng validate ở trực tiếp `FormArray`, ví dụ cần validate kích thước mảng:
```
function validateSize(arr: FormArray) {
  return arr.length > 3 ? {
    invalidSize: true
  } : null;
}

export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([], validateSize)
  });

  skills = this.user.get('skills') as FormArray;

  addSkill() {
    cost control = new FormControl('', Validators.required);
    this.skills.push(control);
  }
}
```
Như với bất kì `AbstractControl` nào, chúng ta có thể truyền hàm validate, trong trường hợp này nó sẽ nhận vào `FormArray` mỗi lần thay đổi, và trả về null nếu mảng hợp lệ, ngược lại, trả về một đối tượng cho biết cụ thể lỗi.
## FormArray với Server Data
Hãy tóm tắt lại mọi thứ bằng một ví dụ khá phổ biến là chúng ta cần tạo các control của `FormArray` từ dữ liệu server trả về.

Trong trường hợp này chúng ta không thể sử dụng `patchValue()` hay `setValue()`, vì các phương thức này dùng để cập nhật giá trị của các controls đã tồn tại, trong khi các control tương ứng với dữ liệu trả về vẫn chưa được tạo. Thay vào đó, chúng ta cần tạo `FormArray` từ đầu và set giá trị cho từng controls
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl('')
  });

  skills = this.user.get('skills') as FormArray;

  ngOnInit() {
    store.select('skills').subscribe(skills => {
      const controls = skills.map(skill => {
        return new FormControl(skill, Validators.required);
      });

      this.user.registerControl('skills', new FormArray(controls));
    })
  }
}
```
Trong trường hợp chúng ta đã có sẵn các control trong `FormArray`, chúng ta đơn giản chỉ cần tạo các control cần thêm, sau đó thêm nó vào mảng:
```
export class UserComponent {
  user = new FormGroup({
    name: new FormControl(''),
    skills: new FormArray([])
  });

  skills = this.user.get('skills') as FormArray;

  ngOnInit() {
    store.select('skills').subscribe(skills => {
      for(const skill of skills) {
        this.skills.push(new FormControl(skill, Validators.required));
      }
    })
  }
}
```
*Bài viết khá đơn giản với những kiến thức cơ bản, hy vọng nó có ích với bạn, nếu có gì khó hiểu hãy comment để mình giúp bạn giải đáp nha! :grin:*

Nguồn: https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a