Ở bài viết này chúng ta sẽ tìm hiểu về 1 số ultility types trong Typescript.
 
###  Pick<T,K>

Sử dụng `pick` để tạo ra type mới từ 1 type trước đó với chỉ 1 số key cần thiết.

```
 type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

```
type Person = { name: string; age: number }
type Name = Pick<Person , 'name'>;

const n: Name = {name: 'John'}; // ok
const err: Name = {name: 'John', age: 26} // error
 ```
 
 ### Omit<T,K>
 
 Sử dụng `Pick` rất tiện lợi. Tuy nhiên đôi khi chúng ta muốn làm ngược lại.
 Chúng ta cần tạo 1 type bao gồm tất cả trừ 1 vài field từ 1 type trước đó.
 
 ```
 type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
 ```
 
 ```
type Person = { name: string; age: number }

type Name = Omit<Person , 'age'>;

const n: Name = {name: 'John'}; // ok
const err: Name = {name: 'John', age: 26} // error
 ```