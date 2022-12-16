## Ngoại lệ
Mã Dart của bạn có thể throw và catch ngoại lệ. Ngoại lệ là lỗi chỉ ra rằng một cái gì đó bất ngờ đã xảy ra. Nếu ngoại lệ không bị catch, [isolate](https://dart.dev/guides/language/language-tour#isolates) (tạm hiểu là thread) chạy ngoại lệ bị đình chỉ và thông thường, isolate và chương trình của nó bị chấm dứt.

Trái ngược với Java, tất cả các ngoại lệ của Dart đều là các ngoại lệ unchecked. Các phương thức không khai báo ngoại lệ nào chúng có thể throw và bạn không bắt buộc phải catch bất kỳ ngoại lệ nào.

Dart cung cấp các loại Ngoại lệ và Lỗi , cũng như nhiều kiểu con được xác định trước. Tất nhiên, bạn có thể xác định ngoại lệ của riêng bạn. Tuy nhiên, các chương trình Dart có thể ném bất kỳ đối tượng không null nào - không chỉ là ngoại lệ và các đối tượng Lỗi - như một ngoại lệ.

### Throw
Đây là một ví dụ về throw, hoặc nâng cao , một ngoại lệ:

```
throw FormatException('Expected at least 1 section');
```
Bạn cũng có thể ném các đối tượng tùy ý:

```
throw 'Out of llamas!';
```
> Lưu ý: Code production thường ném các kiểu implement từ Lỗi hoặc Ngoại lệ .

Vì throw ngoại lệ là một biểu thức, bạn có thể throw ngoại lệ vào các câu lệnh =>, cũng như bất kỳ nơi nào khác cho phép biểu thức:

```
void distanceTo(Point other) => throw UnimplementedError();
```
### Catch
Catch một ngoại lệ nghĩa là ngăn chặn ngoại lệ lan truyền (trừ khi bạn throw lại ngoại lệ). Catch một ngoại lệ cho bạn một cơ hội để xử lý nó:

```
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```
Để xử lý mã có thể throw nhiều loại ngoại lệ, bạn có thể chỉ định nhiều mệnh đề catch. Mệnh đề catch đầu tiên khớp với loại của đối tượng throw sẽ xử lý ngoại lệ. Nếu mệnh đề catch không chỉ định một loại, mệnh đề đó có thể xử lý bất kỳ loại đối tượng throw nào:
```
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```
Như đoạn code trước cho thấy, bạn có thể sử dụng một trong hai on hoặc catch hoặc cả hai. Sử dụng on khi bạn cần chỉ định loại ngoại lệ. Sử dụng catch khi xử lý ngoại lệ của bạn cần đối tượng ngoại lệ.

Bạn có thể chỉ định một hoặc hai tham số catch(). Đầu tiên là ngoại lệ được throw và thứ hai là stack trace (một đối tượng StackTrace ).

```
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```
Để xử lý một phần ngoại lệ, trong khi cho phép nó lan truyền, hãy sử dụng từ khóa rethrow.

```
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
``` 
### Finally
Để đảm bảo rằng một số mã chạy cho dù có ngoại lệ hay không, hãy sử dụng finally. Nếu không có catch nào khớp với ngoại lệ, thì ngoại lệ được lan truyền sau khi finally chạy:

```
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```
Các finally chạy sau khi matching với bất kỳ catch nào:

```
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```
Tìm hiểu thêm bằng cách đọc phần [Ngoại lệ](https://dart.dev/guides/libraries/library-tour#exceptions).

## Typedefs
Trong Dart, các hàm là các đối tượng, giống như các chuỗi và các số là các đối tượng. Một typedef , hoặc gọi là bí danh kiểu hàm, cung cấp cho một kiểu hàm một tên mà bạn có thể sử dụng khi khai báo các trường và các kiểu trả về. Một typedef giữ lại thông tin của kiểu khi một kiểu hàm được gán cho một biến.

Hãy xem xét đoạn mã sau không sử dụng typedef:

```
class SortedCollection {
  Function compare;

  SortedCollection(int f(Object a, Object b)) {
    compare = f;
  }
}

// Initial, broken implementation.
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);

  // All we know is that compare is a function,
  // but what type of function?
  assert(coll.compare is Function);
}
```
Thông tin về kiểu bị mất khi gán f cho compare. Kiểu f là (Object, Object)→ int (trong đó → có nghĩa là trả về), nhưng loại compare là Function. Nếu chúng ta thay đổi mã để sử dụng tên rõ ràng và giữ lại thông tin kiểu, cả nhà phát triển và công cụ đều có thể sử dụng thông tin đó.

```
typedef Compare = int Function(Object a, Object b);

class SortedCollection {
  Compare compare;

  SortedCollection(this.compare);
}

// Initial, broken implementation.
int sort(Object a, Object b) => 0;

void main() {
  SortedCollection coll = SortedCollection(sort);
  assert(coll.compare is Function);
  assert(coll.compare is Compare);
}
```
> Lưu ý: Hiện tại, typedefs bị hạn chế đối với các kiểu hàm. Google hy vọng điều này sẽ thay đổi.

Vì typedefs chỉ đơn giản là bí danh, chúng cung cấp một cách để kiểm tra loại của bất kỳ chức năng nào. Ví dụ:

```
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

Nguồn https://dart.dev/guides/language/language-tour#exceptions

(Còn tiếp)