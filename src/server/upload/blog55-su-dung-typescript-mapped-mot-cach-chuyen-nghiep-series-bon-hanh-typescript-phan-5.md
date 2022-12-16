![image.png](https://images.viblo.asia/d0666ca5-8610-478f-87e3-15439e1638ee.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Chào mừng bạn đến với loạt bài **Làm chủ TypeScript**. Được nằm trong Series **BÓN HÀNH TYPESCRIPT**, những bài viết này sẽ giới thiệu về kiến ​​thức và kỹ thuật cốt lõi của TypeScript **dưới dạng Animations** sinh động. 

OK GÉT GÔ

Vấn đề
----

Bạn đã sử dụng Partial, Required, Readonly, and Pick utility types chưa?

![image.png](https://images.viblo.asia/0a00d0d2-67f6-4fa4-8d38-17db642431ba.png)

Nếu bạn muốn làm chủ chúng một cách thuần thục và tạo ra các `utility types` cho riêng mình thì đừng bỏ qua nội dung được đề cập trong bài viết này.

Tạo một type `User` là một kịch bản phổ biến trong công việc hàng ngày. Ở đây, chúng ta có thể sử dụng TypeScript để xác định loại User trong đó tất cả các khóa được yêu cầu.

```javascript
type User = {
  name: string; 
  password: string; 
  address: string; 
  phone: string;
};
```

Thông thường, đối với Type User đã được khai báo, chúng ta chỉ cho phép sửa đổi một số thông tin. Tại thời điểm này, chúng ta có thể xác định một loại UserPartial mới đại diện cho loại đối tượng User cần cập nhật, trong đó tất cả các khóa là tùy chọn.

```javascript
type UserPartial = {
  name?: string; 
  password?: string; 
  address?: string; 
  phone?: string; 
};
```

Đối với kịch bản xem thông tin user, chúng ta hy vọng rằng tất cả các khóa trong loại đối tượng tương ứng với đối tượng user đều ở chế độ chỉ đọc (**Readonly**). Đối với yêu cầu này, chúng ta có thể xác định loại User chỉ đọc.

```javascript
type ReadonlyUser = {
  readonly name: string;
  readonly password: string;
  readonly address: string;
  readonly phone: string;
};
```

Xem lại ba Type liên quan đến user đã được xác định, bạn sẽ thấy rằng chúng chứa rất nhiều code trùng lặp.

![1_kkDPP22K4ZNHpFbczoZWXQ.gif](https://images.viblo.asia/8f45775e-04a3-4c18-a375-7e88cc1a2d10.gif)

![image.png](https://images.viblo.asia/530dc652-0d88-4020-941c-b06e4b1c88c9.png)

Vậy làm cách nào để có thể giảm bớt code trùng lặp trong các loại trên? Câu trả lời là bạn có thể sử dụng các Mapped Types, là các Type chung có thể được sử dụng để **ánh xạ** loại đối tượng ban đầu sang loại đối tượng mới.

![1_-kLV6wQGC2-ahfgSwHXlsA.gif](https://images.viblo.asia/384c09e6-499a-44ba-b8d7-97bec2f3675e.gif)

![image.png](https://images.viblo.asia/4956c5f5-3278-4d53-9628-e9e026531405.png)

![1_TtKLifeeVvG3Us9g_S8DEw.gif](https://images.viblo.asia/80216de9-2584-4275-bdc4-9f5fd5a5670a.gif)

![image.png](https://images.viblo.asia/ac4561bd-ea22-4658-bf8d-ef9f6ef8095c.png)

Mapped Type
----

Cú pháp cho các loại ánh xạ như sau:

![image.png](https://images.viblo.asia/8acfe302-9882-4c7b-ba8b-f9f660333285.png)

Trường hợp `P in K` tương tự như câu lệnh `in` trong JavaScript, được sử dụng để lặp qua tất cả các loại trong loại K và biến loại T, được sử dụng để biểu thị bất kỳ loại nào trong TypeScript.

![1_YK9f_jV3ETabwSDqHUSCmQ.gif](https://images.viblo.asia/fe03de1a-b379-43c4-912b-ee5a19da1040.gif)

Bạn cũng có thể sử dụng các cú pháp sửa đổi bổ sung chỉ đọc và dấu chấm hỏi (?) trong quá trình mapping. Các cú pháp sửa đổi tương ứng được thêm vào và loại bỏ bằng cách thêm các tiền tố dấu cộng(+) và dấu trừ(-). **Mặc định là sử dụng dấu cộng nếu không thêm tiền tố.**

Bây giờ chúng ta có thể tóm tắt cú pháp của các loại Mapping phổ biến.

```javascript
{ [ P in K ] : T }
{ [ P in K ] ?: T }
{ [ P in K ] -?: T }
{ readonly [ P in K ] : T }
{ readonly [ P in K ] ?: T }
{ -readonly [ P in K ] ?: T }
```

Sau khi xem cú pháp của các loại `Mapped Types`, giờ hãy đến một số ví dụ.

![image.png](https://images.viblo.asia/915130f8-7731-4038-9496-0a8fdf783571.png)

Hãy xem cách xác định lại loại `UserPartial` bằng cách sử dụng các Mapped Types.

```javascript
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};
type UserPartial = MyPartial<User>;
```

Trong đoạn code trên, chúng ta xác định Mapped Types `MyPartial` và sau đó sử dụng nó để ánh xạ loại User thành loại `UserPartial`. Toán tử keyof được sử dụng để lấy tất cả các khóa của một loại và kiểu trả về của nó là kiểu kết hợp. Biến loại P thay đổi thành một loại khác với mỗi lần duyệt, `T[P]`, tương tự như cú pháp truy cập Properties và được sử dụng để lấy loại value tương ứng với một Properties của loại đối tượng.

Hãy xem ảnh minh họa quy trình thực thi hoàn chỉnh của Mapped Types `MyPartial`, nếu chưa rõ, bạn có thể xem nhiều lần để hiểu sâu hơn về Mapped Types TypeScript.

![1_vWOMJV3WyfaS8C8fqpm33A.gif](https://images.viblo.asia/7a060ff9-be3e-4959-9493-5c212d78e88e.gif)

![image.png](https://images.viblo.asia/e5848ac3-602d-482c-8259-fa3e3a7aa19b.png)

TypeScript 4.1 cho phép chúng ta ánh xạ lại các khóa trong các Mapped Types bằng mệnh đề `as`. Cú pháp của nó như sau:

```javascript
type MappedTypeWithNewKeys<T> = {
    [K in keyof T as NewKeyType]: T[K]
    //            ^^^^^^^^^^^^^
    //            New Syntax！
}
```

Trong đó loại `NewKeyType` phải là một kiểu con của string | number | symbol union type. Sử dụng mệnh đề `as`, chúng ta có thể xác định **Getters utility type** và tạo ra loại Getter tương ứng cho loại đối tượng.

```javascript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};
interface Person {
    name: string;
    age: number;
    location: string;
}
type LazyPerson = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

![1_Jc_axCACQuR7yZyr3FvfbQ.gif](https://images.viblo.asia/f3bf5086-4fe5-4c75-ade9-3cfc00273c4d.gif)

![image.png](https://images.viblo.asia/6e4f78eb-167c-4109-9819-637f13f85678.png)

Trong đoạn code trên, vì loại được trả về bởi `keyof T` có thể chứa kiểu ký hiệu (Symbol type) và kiểu Viết hoa chữ cái đầu (Capitalize utility). Nó yêu cầu kiểu được xử lý cần phải là một kiểu con của loại `string`, nên cần phải lọc kiểu bằng toán tử `&`.

**Ngoài ra, trong quá trình Mapping lại các Keys, chúng ta có thể lọc các Keys bằng cách trả về `never type`.**

```javascript
// Remove the 'kind' property
type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};
interface Circle {
    kind: "circle";
    radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;
//   type KindlessCircle = {
//       radius: number;
//   };
```

![1_L4ygMaGCnXdNUk4ZVlJ9nA.gif](https://images.viblo.asia/5cc9c9d6-5319-44c3-b154-119c154a43db.gif)

![image.png](https://images.viblo.asia/2a26beef-5639-4e9a-8ee1-67e865845b54.png)

Sau khi đọc bài viết này, mình chắc rằng bạn đã hiểu chức năng của các `mapped types` và cách implement một số `utility types` bên trong TypeScript.

**Mapping là một trong những kiến thức nền tảng và cốt lõi để bạn có thể tiến xa hơn trên con đường chinh phục những khái niệm nâng cao khác trong Typescript.**

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
----
* https://tuan200tokyo.blogspot.com/2022/12/blog55-su-dung-typescript-mapped-mot.html