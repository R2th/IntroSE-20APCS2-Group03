Xin chào các bạn hôm nay mình xin chia sẽ những tính năng rất hay của TypeScript (TS), các bạn cùng tìm hiểu nhé!

Nói về **TypeScript** thì hiện nay cũng rất phổ biến, nhiều dự án như **React** đã áp dụng **TypeScript** (TS) thay vì **Javascript** (JS) như bình thường và nhiều bạn mới tìm hiểu sơ qua (như mình trước đây) rất là bức xúc và khó chịu khi mà lúc code đã mệt rồi mà còn phải đi fix mấy cái lỗi của TS nữa hết mất thời gian :D, nhưng rồi khi vào dự án React mà phải viết TS thì mình cũng đành chịu mà viết thôi thế là phải đi tìm hiểu TS là gì? Rồi tập tành vào code thôi, nhưng dần về sau TS rất hiệu quả nha các bạn.

Ngoài việc set **Type** cho **biến, tham số hay function** thì ví dụ khi bạn nhìn vào một tham số của hàm bạn sẽ nhận ra **params** nhận vào là loại giá trị gì rồi nên rất dể cho mình xử lý...vâng vâng...

Rồi nói tào lao cũng nhiều giờ vào chủ đề chính nhé! Bài này các bạn chưa từng học về TS cũng có thể dể dàng hiểu nha, nhưng sau khi xem xong thì hãy thực hành nhiều mới thấm nha mn.

# 1. Unions
**Unions** là một trong những tính năng rất dể hiểu trong TS, nó kiểu như toán tử "||" trong JS, là có thể set được nhiều Type

Ví dụ nhé:

```typescript
function myFn(id: string | number) {
  console.log('id', id);
}
```

**Giải thích**: Nhìn vào trên bạn có thể thấy là tham số **id** có thể nhận vào 2 kiểu giá trị là **string** hoặc là **number**

**Unions** cũng rất hữu ích khi ta biểu diễn type là **nullable**:

```typescript
function myFn(id: string | undefined) {
  if(!id) {
    console.error('no identifier found');
  } else {
    console.log('id', id);
  }
}
```

**Giải thích**: Ở đoạn code trên bạn có thể nhân ra rằng id chỉ có thể có 2 giá trị là **string** hoặc là **undefined**, điều này giúp bạn xử lý đoạn code phía trong dể dàng hơn vì ta đã biết được **output type** của nó rồi.

Tương tự bạn cũng có thể áp dụng **Unions** cho **interface**:

```typescript
enum Vehicles {
    bike,
    plane
}

interface Vehicle {
    speed: number;
    type: Vehicles;
}

interface Bike extends Vehicle {
    ride: () => void;
    type: Vehicles.bike;
}

interface Plane extends Vehicle {
    fly: () => void;
    type: Vehicles.plane;
}

function useVehicle(vehicle: Bike | Plane) {
    if (vehicle.type === Vehicles.bike) {
        vehicle.ride();
    }

    if (vehicle.type === Vehicles.plane) {
        vehicle.fly();
    }
}
```

# 2. Generics
Như bạn có thể thấy ở **Unions** bạn có thể set **mutile types** nhưng đó cũng không phải là hay khi bạn muốn set nhiều type và sự dụng cho nhiều biến, điều này khá rờm rà như vậy nè

```typescript
function myFn(id: string | string[], name: string | string[], address: string | string[]) {
 //...
}
```

Khá là dài dòng phải không các bạn, vậy thì mình dùng **Generics** xem sao nhé!

```typescript
function myFn<T extends string | string[]>(id: T, name: T, address: T) {
 //...
}
```

Vậy bây giờ bạn có thể sử dụng dể dàng rồi, khi nào vào thằng này **<T extends string | string[]** có vẻ khó hiểu nhỉ, thật ra thì dể hiểu thôi bạn cứ hiểu là cái thằng **T** này type của nó chỉ được là **string** hoặc là một **array** mà trong nó là các phần tử có type chỉ là **string** thôi.

# 3. Tuples
Khi nói đến **Tuples** thì có 2 điều cần nói đó là: Explicitly và Implicitly

**Explicitly**: Nghĩa là thằng biến **array** mi chỉ có thể là một array và chỉ có 2 phần tử thôi, phần tử đầu tiên là **string**,  thứ 2 là **number**

```typescript
const array: [string, number] = ['test', 12];
```

**Implicitly**: Thằng **array** mày chỉ là **read-only** thôi không đc sửa, xóa gì hết nha :D

```typescript
const array = ['test', 12] as const;
```

Ngoài ra bạn có thể áp dụng vào **function**:

```typescript
function foo(x: [startIndex: number, endIndex: number]) {
  ...
}
```

Tóm lại **Tuples** có chức năng là giới hạn **lengh** của một array hoặc setting là **read-only**.

# 4. Mapped Types
**Mapped Types** said:

> Đôi khi mày cần phải nhìn hạnh phúc của người khác để tìm hạnh phúc cho bản thân mình :D

Có nghĩa là một **variable** có thể sử dụng type của **type** hoặc **interface** khác cho chính bản thân nó.

Ví dụ:

```typescript
interface Teacher {
  name: string;
  email: string;
}

type ReadonlyTeacher = Readonly<Teacher>;

const t: ReadonlyTeacher = { name: 'jose', email: 'jose@test.com'};

t.name = 'max'; // Error: Cannot assign to 'name' because it is a read-only property.(2540)
```

Ngoài ra, còn có rất nhiều **utility types** khác: **Omit, Partial, Readonly, Readonly, Exclude, Extract, NonNullable, ReturnType.**

Bạn có thể kết hợp với **Generics**:

```typescript
interface Teacher {
  readonly name: string;
  readonly email: string;
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

const t: Writeable<Teacher> = { name: 'jose', email: 'jose@test.com' };

t.name = 'max'; // works fine
```

**Giải thích**: **Writeable** sử dụng type của **Teacher** ( name, email của đang là  readonly), bạn có thể thấy **-readonly** có nghĩa là bỏ đi readonly nên ta có thể thay đổi thuộc tính **name** được

# Tổng kết
Tóm lại trên đây là những tính năng hay của TypeScript hy vọng bài viết sẽ giúp ích cho các bạn trong quá trình làm việc của mình, hẹn các bạn ở những bài viết khác. Mình cảm ơn <3