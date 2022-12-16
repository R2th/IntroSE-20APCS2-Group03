https://qiita.com/knjname/items/fc83a4248f459f1b052e






Source dùng cho bài viết : https://github.com/knjname/2020-09-03_growingtsd

Bạn đã từng gặp trường hợp mà trong đó việc compile cho project TypeScript của CI tốn hơn 1 giờ vẫn chưa xong?
Tôi thì gặp nhiều rồi.

Tôi nghĩ là những ai dùng những framework kiểu TypeScript mà chưa hoạt động chuẩn thì sẽ dễ gặp tình trạng này.
Còn những framework mà đã hoạt động chuẩn thì sẽ ít gặp hơn.
Thế thì cụ thể framework chưa hoạt động chuẩn là thế nào?
Đó là những framework mà sẽ xử lý xoay vòng những dòng code có tính động như sau (mobx-state-tree  chẳng hạn):



```
export type ItemDefinitions<D = {}> = {
  define<T>(args: T): ItemDefinitions<D & { [P in keyof T]: T[P] }>;
};
const item = {} as ItemDefinitions

// Cách dùng
// Khi đưa object đến method, thì tùy theo object mà type sẽ được sinh ra 
const loginForm = item.define({
  userName: "",
  password: "",
  passwordForConfirm: "",
})
// => ItemDefinitions<{} & {
//   userName: string,
//   password: string,
//   passwordforConfirm: string
// }>
```

Mẫu như trên khá tốt vì nó tận dụng hết tác dụng của TypeScript. Nhưng ngay cả khi mẫu code này trông có vẻ ổn khi dự án còn nhỏ, 
một khi codebase của dự án to lên, performance của complier có lẽ sẽ không duy trì được.


Ví dụ như trong case dưới đây, tốc độ của TypeScript compiler đã không thể theo kịp


```

const loginPage = item.define({
  loginState: loginState,
  loginForm: loginForm, ...
})

const app = item.define({
  loginPage: loginPage,
  welcomePage: welcomePage, ...
})

```

Trong quá trình trưởng thành với tư cách là 1 coder, tôi đã vô tình tạo ra những source code mà không thể hoàn thành compile trong vòng 1 giờ.

Ban đầu tôi nghĩ "Do webpack nặng?" nhưng rồi không phải webpack, mà là TypeScript đã quá nặng và không thể kết thúc.
Vì complement của VS code và bundle dùng để phát triển đã chạy rồi, cho nên tôi đã ko để ý đến CI.

Thực nghiệm việc TypeScript compile bị nặng hơn do lỗi con người

Để tái hiện hiện tượng compile bị nặng như trên, tôi đã viết đoạn code sau:

```
export const recurse = <T>(itemDef: ItemDefinitions<T>) =>
  itemDef.define({
    a: itemDef,
    b: itemDef,
  });

```

Nó sẽ trông như sau:

```

export const item1 = recurse(item)
// => ItemDefinitions<{a: ItemDefinitions<{}>, b: ItemDefinitions<{}>}>
export const item2 = recurse(item1)
// => ItemDefinitions<{a: ItemDefinitions<{a: ItemDefinitions<{}>, b: ItemDefinitions<{}>}>, b: ItemDefinitions<{a: ItemDefinitions<{}>, b: ItemDefinitions<{}>}>>

```

Thông tin type bị tăng đột ngột.
Tôi đã lặp lại đoạn code trên 17 lần, và xem coi tốc độ compile của tsc bị thay đổi thế nào  (Có export *.js / *.d.ts)
![](https://images.viblo.asia/a0f3473e-4701-43cd-ae1f-22cf448ac859.png)

```
0: 1.66s
1: 1.97s
2: 1.29s
3: 1.57s
4: 1.63s
5: 2.86s
6: 4.39s
7: 6.04s
8: 12.80s
9: 42.14s
10: 76.45s
11: 96.01s
12: 126.75s
13: 175.48s
14: 225.90s
15: 257.27s
16: 301.13s
17: 371.20s
```
Tuy nửa số lần sau có cải thiện tốc độ nhưng nhìn chung vẫn rất khó chấp nhận trong thục tế. 
Phía bên file *.d.ts cũng tăng lên quá 10MB. 
Cứ cái đà này thì sẽ ko kết thúc  TypeScript Project Compile 
Nếu chỉ là transcompiler thì nó chạy ổn, nhưng những phần như production build của CRA thì hoàn toàn không chạy.

Source code gốc:

```
import { item0, recurse } from "./lib"
export const item1 = recurse(item0);
export const item2 = recurse(item1);
export const item3 = recurse(item2);
export const item4 = recurse(item3);
export const item5 = recurse(item4);
export const item6 = recurse(item5);
export const item7 = recurse(item6);
export const item8 = recurse(item7);
export const item9 = recurse(item8);
export const item10 = recurse(item9);
export const item11 = recurse(item10);
export const item12 = recurse(item11);
export const item13 = recurse(item12);
export const item14 = recurse(item13);
export const item15 = recurse(item14);
export const item16 = recurse(item15);
export const item17 = recurse(item16);
```

Tại sao lại nặng thế?

Khi xem file *.d.ts sau, bạn sẽ thấy, tất cả các type được mở rộng trong trạng thái mà nó được suy đoán.
![](https://images.viblo.asia/8e83e867-97bf-40bf-8147-2db777a72a69.png)


Tránh nặng hơn bằng cách nào?

Phải cố gắng tránh việc mở rộng.

Như trong lần này thì không để cho type được suy luận mà viết bằng tay .
(Tôi nghĩ tùy theo framework mà bạn sử dụng thì sẽ có nhiều cách khác)


```

import { item0, recurse, ItemDefinitions } from "./lib"
export const item1: ItemDefinitions<{a: typeof item0, b: typeof item0}> = recurse(item0);
export const item2: ItemDefinitions<{a: typeof item1, b: typeof item1}> = recurse(item1);
export const item3: ItemDefinitions<{a: typeof item2, b: typeof item2}> = recurse(item2);
export const item4: ItemDefinitions<{a: typeof item3, b: typeof item3}> = recurse(item3);
export const item5: ItemDefinitions<{a: typeof item4, b: typeof item4}> = recurse(item4);
export const item6: ItemDefinitions<{a: typeof item5, b: typeof item5}> = recurse(item5);
export const item7: ItemDefinitions<{a: typeof item6, b: typeof item6}> = recurse(item6);
export const item8: ItemDefinitions<{a: typeof item7, b: typeof item7}> = recurse(item7);
export const item9: ItemDefinitions<{a: typeof item8, b: typeof item8}> = recurse(item8);
export const item10: ItemDefinitions<{a: typeof item9, b: typeof item9}> = recurse(item9);
export const item11: ItemDefinitions<{a: typeof item10, b: typeof item10}> = recurse(item10);
export const item12: ItemDefinitions<{a: typeof item11, b: typeof item11}> = recurse(item11);
export const item13: ItemDefinitions<{a: typeof item12, b: typeof item12}> = recurse(item12);
export const item14: ItemDefinitions<{a: typeof item13, b: typeof item13}> = recurse(item13);
export const item15: ItemDefinitions<{a: typeof item14, b: typeof item14}> = recurse(item14);
export const item16: ItemDefinitions<{a: typeof item15, b: typeof item15}> = recurse(item15);
export const item17: ItemDefinitions<{a: typeof item16, b: typeof item16}> = recurse(item16);
export const item18: ItemDefinitions<{a: typeof item17, b: typeof item17}> = recurse(item17);

```

 .d.ts file sẽ như sau

![](https://images.viblo.asia/928f4587-7412-4bb7-870f-2b4ab33d9ad9.png)



Tốc độ sẽ như sau
![](https://images.viblo.asia/a130b134-72d9-45c8-87ac-a22fdd4e9371.png)

0: 1.00s
1: 1.38s
2: 1.05s
3: 1.17s
4: 1.13s
5: 1.41s
6: 1.11s
7: 1.02s
8: 1.03s
9: 1.08s
10: 1.19s
11: 1.11s
12: 1.09s
13: 1.07s
14: 1.19s
15: 1.07s
16: 1.16s
17: 1.15s

Kết luận: Với những project TypeScript nặng thì không nên để nó được suy luận ra,
đặt tên cho type và browse chúng.