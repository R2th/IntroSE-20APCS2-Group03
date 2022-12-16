Khi lập trình dart và flutter chắc hẳn bạn đã gặp và sử dụng `abstract class`, `interface(implements class)` và `mixin` nhưng liệu bạn đã hiểu rõ sự khác nhau giữa chúng, hãy cùng mình đi so sánh để làm rõ điểm khác biệt nhé

Mình có ví dụ như sau

```dart
abstract class AbstractClass() {
    abstractFun();
    normalFun() {}
}
```

## extends

```dart
class C1 extends AbstractClass {
  @override
  abstractFun() {}
}
```

Khi bạn extends thì bạn sẽ
- Chỉ có thể `extends` 1 class
- Phải `override abstract fun` hoặc C1 là `abstract class`
- Dùng lại `normal fun`

## implements

```dart
class C2 implements AbstractClass {
  @override
  abstractFun() {}

  @override
  normalFun() {}
}
```

Khi bạn `implements` thì bạn sẽ
- Có thể `implements` nhiều class
- Phải `override` lại **tất cả** fun, cả `normal fun` chứ không dùng lại được, hoặc C2 là `abstract class`

## mixin

`mixin` là một cách sử dụng lại code của dart, tận dụng ưu điểm và khắc phục nhược điểm của `extends` và `implements`

```dart
mixin M1 {
  doWork() {}
  stop() {}
}

class C3 with M1 {
}
```

Khi bạn `with` mixin thì bạn sẽ
- Dùng lại được code
- Có thể `with` nhiều `mixin`
- Có thể giới hạn class sử dụng mixin với `on Class`
- Không thể `extends mixin`
- Nếu `implements mixin` thì phải `override` lại **tất cả** fun hoặc C3 là `abstract class`, chứ không dùng lại được code
- Trường hợp `with` nhiều `mixin` có chung `fun`, `fun` của `mixin` **cuối cùng** trong list mixin sẽ được thực thi

Ở ví dụ trên thì parent class là abstract class, trường hợp parent class là normal class thì cũng tương tự, các bạn khám phá nhé.