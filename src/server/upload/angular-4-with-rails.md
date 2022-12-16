Trong dự án hiện tại, khi chuẩn bị start thì bọn mình được yêu cầu là làm với Rails và Angular 4. Nên mình đã có 1 tuần cùng với mọi người dựng base project. Nay mình viết bài viết này trước là để chia sẻ những vấn đề mà bọn mình cần phải giải quyết với mọi người, sau là mình note lại cho những lần sử dụng sau. Base này chỉ là do mình và mọi người trong team cùng nhau quyết định nên cũng có thể không phù hợp với mọi người hoặc nó cũng chưa được hoàn hảo. Vậy nếu ai thấy có vấn đề hoặc thấy gì không phù hợp thì để lại comment cho mình sửa và thay đổi nhé. Giờ thì chúng ta bắt tay vào làm thôi :D.
> Rất tiếc là 1 tuần để dựng base xong thì bọn mình lại không sử dụng Angular 4 với Rails nữa mà chuyển sang dùng Rails thuần ERB :smile:!

# Setup project

## Ruby on Rails

Đầu tiên, chúng ta vẫn dựng project Rails như bình thường. Nhưng không quan tâm đến phần view nữa (do view dùng Angular 4) nên chúng ta sẽ setup với tham số `--api` để sử dụng Rails với API. Project lần này mình dùng Ruby 2.5.1 và Rails mới nhất (5.2.0):

```
rails new angular4-with-rails-5/ --api --skip-yarn --skip-action-cable --skip-coffee --skip-javascript --skip-test --skip-system-test -d mysql
```

Như vậy là đã xong phần RoR. Giờ chúng ta sang phần Angular 4.

## Angular 4

Do có yêu cầu nên bọn mình không sử dụng Angular mới nhất lúc đó mà sử dụng Angular 4. Nếu các bạn sử dụng Angular CLI tạo một ứng dụng mới nó sẽ tạo Angular 5. Nên chúng ta cần cài Angular CLI bản thấp hơn để tạo Angular 4. Khi cài Angular CLI, chúng ta cần sử dụng Node.JS >= 8.6 và NPM >= 5.5.1

```
sudo npm i -g @angular/cli@1.4.10
```

Sau khi cài xong Angular CLI. Chúng ta thực hiện tạo project Angluar ở trong project Rails. Ở đây, chúng mình lựa chọn là build luôn Angular code thành các file `.js` vào thư mục public và dev trên cổng 3000 mặc định của Rails thay vì chạy song song hai cổng là 4200 (của Angular) và 3000 (mặc định của Rails):

```
ng new angular --skip-commit=true
```

Sau khi tạo xong, chúng ta cần cấu hình một chút. Đầu tiên, bạn cần sửa `outDir` trong file `angular/.angular-cli.json` từ `dist` sang `../public`. Sau đó, thêm một vài file sau vào `.gitignore`

```
# Angular 4 dist
/public/*.bundle.*
/public/assets
```

Sau khi xong, bạn có thể thử bằng cách `cd` vào thư mục `angular` rồi thực hiện build project bằng lệnh dưới rồi chạy `rails server` và truy cập vào http://localhost:3000 để xem thử:

```
cd angular/ && ng build -aot -dop false -sm false
```

Nếu bạn thấy giao diện chào mừng của Angular là đã thành công rồi. Vậy là tạm thời đã xong phần setup project. Bây giờ chúng ta đi vào giải quyết các vấn đề mà bọn mình đã gặp phải trong 1 tuần tạo base nhé.

# Issues

## Angular build rake task

Khi bạn thực hiện dev. Bạn có thể chạy song song 2 terminal để thực hiện lệnh `rails server` và `ng build -w`. Nhưng bọn mình đã viết một rake task để thực hiện việc này trong 1 terminal. Đầu tiên, bạn tạo một task với namespace là `dev` với 2 task là `start` và `stop`:

```
rails g task dev start stop
```

Rồi chúng ta thực hiện sửa file `lib/tasks/dev.rake` với nội dung sau:

```ruby
namespace :dev do
  desc "Start development (include Angular build and Rails server)"
  task start: :environment do
    stop_rails_server_and_angular_build
    puts "Start Angular build..."
    angular_pid = spawn "cd angular/ && ng build -dop false -aot -sm false -w"

    puts "Start Rails server..."
    begin
      system "rails server"
    rescue SystemExit, Interrupt
      stop_rails_server_and_angular_build
    end

    Process.detach angular_pid
  end

  desc "Stop development (kill Angular build process and stop Rails server)"
  task stop: :environment do
    stop_rails_server_and_angular_build
  end
end

def stop_rails_server_and_angular_build
  rails_server_pid = File.read Rails.root.join("tmp", "pids", "server.pid") rescue nil
  angular_build_pids = `ps ax | grep -w '[n]g' | awk '{print $1}'`.split("\n")
    .join(" ")

  puts "Stop Rails server..."
  system "kill -9 #{rails_server_pid}"
  puts "Stop Angular build process..."
  system "kill -9 #{angular_build_pids}"
end
```

Trong task trên, mình sẽ giải thích một số điều sau:

* Sao chúng ta chỉ detach mỗi Angular build PID mà không detach cả Rails server PID cho đỡ tốn terminal. Đó là do khi build Angular code, chúng ta không cần phải tương tác gì với nó cả. Còn với Rails server, chúng ta đôi khi phải binding để debug code. Nên mình không detach để chúng ta có thể thực hiện tương tác với lệnh binding khi debug Rails :smiley:!
* Tại sao lại gọi `stop_rails_server_and_angular_build` khi bắt đầu start. Là để đảm bảo có một lý do nào đó mà Angular build process không bị tắt đi sẽ gây ra khi bạn chạy Angular build mới, lúc save nó vẫn nhận ở process cũ.
* Tại sao lại try catch ở phần start Rails server? Mình chỉ try 2 trường hợp là thoát terminal Rails server hoặc nhấn Ctrl+C thì sẽ kill các PID không cần thiết (để đỡ phải dùng `rake dev:stop` ấy mà :rofl:)

Vậy là xong. Mỗi khi bạn bắt đầu dev. Thay vì bạn chạy 2 lệnh ở 2 terminal là: `cd angular/ && ng build -dop false -aot -sm false -w` và `rails server` thì bạn có thể thực hiện 1 lệnh đơn giản là: `bundle exec rake dev:start`. Ngon chứ nhỉ :smile:!

Tiếp theo, chúng ta sẽ sang vấn đề khác. Đó là I18n với thằng Angular.

## Angular I18n

Tại sao chúng ta lại sử dụng Angular I18n? Vâng, vì server chỉ thực hiện mỗi API và không tương tác gì với view. Mọi view đã có Angular lo nên chúng ta không sử dụng được I18n của Rails (thế mới đau). Và I18n mặc định của Angular thì rất là khoai, nó không sáng sủa cho lắm nên chúng ta sử dụng thư viện `ngx-translate`. Mình sẽ hướng dẫn mọi người cài đặt và sử dụng nó.

Đầu tiên, chúng ta cần cài 2 packages là: `@ngx-translate/core` và `@ngx-translate/http-loader` phù hợp với Angular 4:

```
cd angular/ && npm i -S @ngx-translate/core@^7.2.2 @ngx-translate/http-loader@^1.1.0
```

Sau khi cài xong các packages cần thiết, chúng ta thực hiện sửa code ở một số file sau:

```javascript
// angular/src/app/app.module.ts

// Import các modules cần thiết
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// Khởi tạo factory cho TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

// Import các modules vào Angular
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // ... modules
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  // ...
})
```

Sử dụng `TranslateService` ở component:

```javascript
// angular/src/app/app.component.ts

// Import TranslateService
import { TranslateService } from "@ngx-translate/core";

// Khởi tạo TranslateService và ngôn ngữ mặc định

export class AppComponent {
  // ...
  constructor(public translateSvc: TranslateService) {
    translateSvc.setDefaultLang("en");
    translateSvc.use("en");
  }
  
  // Thêm method đổi ngôn ngữ để test thử
  switchLanguage(language: string) {
    this.translateSvc.use(language)
  }
}
```

Sau khi cài đặt xong, chúng ta tạo thư mục `angular/src/assets/i18n/` rồi thêm file `en.json` và `vi.json` với nội dung test như sau:

```json
{
  "index": {
    "title": "Welcome to Angular 4"
  },
  "languages": {
    "english": "English",
    "vietnamese": "Vietnamese"
  }
}
```

```json
{
  "index": {
    "title": "Chào mừng bạn đến với Angular 4"
  },
  "languages": {
    "english": "Tiếng Anh",
    "vietnamese": "Tiếng Việt"
  }
}
```

Tiếp, chúng ta mở file `angular/src/app/app.component.ts` và thêm đoạn HTML sau để thử nhé

```html
<div>
  <h1>{{ "index.title" | translate }}</h1>
  <button (click)="switchLanguage('vi')">{{ "languages.vietnamese" | translate }}</button>
  <button (click)="switchLanguage('en')">{{ "languages.english" | translate }}</button>
</div>
```

Xong, bây giờ bạn có thể refresh lại http://localhost:3000 để xem :smile:! Giờ chúng ta sang phần khác. Đó là validation với I18n messages.

## Validation with I18n

Tiếp tục, chúng ta sang phần I18n với validation messages. Phần này mình phải xử lý khá nhiều, và cũng chưa chắc là đã xử lý được hết những trường hợp sẽ xảy ra. Nhưng cũng đã xử lý được những trường hợp căn bản. Mọi người cùng tham khảo nhé.

Đầu tiên, chúng ta tạo một component xử lý việc hiển thị message trên form.

```
cd angular/ && ng g component ./components/control-messages --spec false -is true
```

Tiếp theo, chúng ta update lại file `app.module.ts`:

```javascript
// angular/src/app/app.module.ts

// ...
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

// ...

@NgModule({
  // ...
  imports: [
    // ...
    FormsModule,
    ReactiveFormsModule
  ],
})
```

Tiếp, chúng ta đi tạo validation service để thực hiện viết các validations trong này:

```
cd angular/ && ng g service ./services/validation --spec false
```

Rồi thực hiện viết service như sau:

```typescript
import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ValidationService {

  constructor(private translateSvc: TranslateService) { }

  getValidatorErrorMessage(validatorName: string, fieldName: any, validatorValue?: any) {
    fieldName = this.translateSvc.instant("form_controls.labels." + fieldName);

    let errorMessage: string = this.translateSvc.instant("validation_error_messages." + validatorName, {fieldName: fieldName});

    return this.replaceExtendedParams(errorMessage, validatorValue);
  }

  private replaceExtendedParams(errorMessage: string, validatorValue?: any): string {
    let extraParams: Array<string>|null = errorMessage.match(/validatorValue\.\w+/g);

    if (extraParams && extraParams.length) {
      extraParams.forEach(function(extraParam: any, idx: number) {
        extraParam = extraParam.split(".");

        let validatorValueKey: string = extraParam[1];
        let interpolationRegEx: RegExp = new RegExp("\\{{2}validatorValue\\." + validatorValueKey + "\\}{2}", "g");

        errorMessage = errorMessage.replace(interpolationRegEx, validatorValue[validatorValueKey]);
      })
    }

    return errorMessage;
  }
}
```

Tiếp theo, thực hiện viết component `angular/src/app/components/control-messages/control-messages.component.ts`:

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ValidationService } from "./../../services/validation.service";

@Component({
  selector: 'app-control-messages',
  templateUrl: "./control-messages.component.html",
  providers: [ValidationService]
})
export class ControlMessagesComponent implements OnInit {
  @Input() control: FormControl;
  @Input() field: string;

  constructor(private validationSvc: ValidationService) {}

  ngOnInit() {
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.validationSvc.getValidatorErrorMessage(propertyName, this.field, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
```

Bây giờ chúng ta thử nhé.Tạo một Register component

```
cd angular/ && ng g component ./components/register --spec false -is true
```

Thực hiện edit file `angular/src/app/components/register/register.component.html`

```html
<form [formGroup]="userForm" (submit)="saveUser()">
  <div>
    <label for="name">{{ "form_controls.labels.name" | translate }}</label>
    <input type="text" id="name" formControlName="name">
    <app-control-messages [control]="userForm.controls.name" [field]="'name'"></app-control-messages>
  </div>
  <div>
    <label for="email">{{ "form_controls.labels.email" | translate }}</label>
    <input type="text" id="email" formControlName="email">
    <app-control-messages [control]="userForm.controls.email" [field]="'email'"></app-control-messages>
  </div>
  <div>
    <label for="password">{{ "form_controls.labels.password" | translate }}</label>
    <input type="password" id="password" formControlName="password">
    <app-control-messages [control]="userForm.controls.password" [field]="'password'"></app-control-messages>
  </div>
</form>
```

Tiếp là `angular/src/app/components/register/register.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationService } from "./../../services/validation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  userForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, ValidationService.emailValidator]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() {
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert("OK :D");
    }
  }
}
```

Tiếp, chúng ta thêm một số nội dung vào 2 file `angular/src/assets/i18n/en.json` và `angular/src/assets/i18n/vi.json`:

```json
"form_controls": {
    "labels": {
      "name": "Name",
      "email": "Email",
      "password": "Password"
    }
  },
  "validation_error_messages": {
    "required": "{{fieldName}} is required",
    "minlength": "Minimum length of {{fieldName}} is {{validatorValue.actualLength}}/{{validatorValue.requiredLength}}",
    "invalidEmailAddress": "Invalid email address"
  }
```

```json
"form_controls": {
    "labels": {
      "name": "Tên",
      "email": "Địa chỉ email",
      "password": "Mật khẩu"
    }
  },
  "validation_error_messages": {
    "required": "{{fieldName}} không được để trống",
    "minlength": "Độ dài tối thiểu của {{fieldName}} phải là {{validatorValue.requiredLength}}. Bạn đã nhập {{validatorValue.actualLength}}",
    "invalidEmailAddress": "Không phải là một địa chỉ email hợp lệ"
  }
```

Cuối cùng, chúng ta thêm `<app-register></app-register>` vào `angular/src/app/app.component.html` là xong. Bây giờ bạn hãy refresh lại trang và test thử xem sao :heart_eyes:!

# Lời kết

Bài viết đến đây cũng khá dài rồi. Mình xin hẹn mọi người ở bài viết tiếp theo với 4 vấn đề còn lại mà bọn mình gặp phải trong quá trình làm base là tương tác với Rails API, login, dynamic layout và Angular routes nhé. Chào thân ái và quyết thắng :wave:!

Link Github: https://github.com/namnv609/angular4-with-rails-5

> Original post: https://namnv609.cf/posts/angular-4-with-rails.html