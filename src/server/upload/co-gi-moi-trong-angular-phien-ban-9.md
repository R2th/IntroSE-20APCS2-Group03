Kể từ khi ra mắt Angular (một Javascript Framework của ông lớn Google), nó đã được Google nâng cấp lên rất nhiều phiên bản và mới nhất là phiên bản 9. Trong bài viết lần này, chúng ta hãy cùng xem trong phiên bản 9 lần này, Google đã cải tiến Angular ra sao và nó có thêm các tính năng gì so với phiên bản trước đó nhé :)

## Default Ivy
Nếu như bạn đã biết ở Angular 8, Ivy renderer đã được tích hợp vào Angular, nhưng để có thể dùng được chúng ta sẽ cần phải config lại trong file **tsconfig.json** như sau:

```javascript:tsconfig.json
"angularCompilerOptions": { "enableIvy": true }
```

Tuy nhiên, ở trong Angular 9 lần này Ivy renderer đã được tích hợp vào một cách mặc định, chúng ta không cần phải thay đổi config trong file **tsconfig.json** để dùng nữa.

## ModuleWithProviders
Nếu bạn đã sử dụng `ModuleWithProviders` trước Angular 9, bạn có thể hoặc không khai báo nó, nhưng bây giờ trong phiên bản này, bạn phải luôn sử dụng generic `ModuleWithProviders<T>` để định nghĩa loại module của mình. Ví dụ:

**Trước Angular 9:**

```typescript
@NgModule({ ...}) export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [{ provide: SomeConfig, useValue: config }]
    };
  }
}
```

**Trong Angular 9**

```typescript
@NgModule({ ...}) export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<**SomeModule**> {
    return {
      ngModule: SomeModule,
      providers: [{ provide: SomeConfig, useValue: config }]
    };
  }
}
```

## Angular Forms
Đối với Angular Forms trong phiên bản 9, cặp thẻ `<ngForm></ngForm>` không còn được hỗ trợ nữa, thay vào đó chúng ta có thể dùng `<ng-form></ng-form>` để thay thế. Ngoài ra `FormsModule.withConfig` cũng đã được loại bỏ và bây giờ chúng ta có thể dùng `FormsModule` một cách trực tiếp.

## Dependency Injection
Đối với **Dependency Injection**, phiên bản mới của Angular cũng đi kèm với một chút cải tiến. Đây không phải là một thay đổi lớn, nhưng một vài giá trị đã được thêm vào `providedIn`

```javascript
@Injectable({ providedIn: 'platform' })  class MyService {...}
```

-----
***Tài liệu tham khảo:*** https://www.telerik.com/blogs/top-new-features-of-angular-9