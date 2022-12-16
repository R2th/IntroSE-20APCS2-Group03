### Generic Repository Pattern
Khi làm việc với JavaScript chúng ta thường gặp phải vấn đề là việc share code giữa các app của chúng ta, chúng ta thường viết lại một đoạn code (lặp lại) ở một project khác. Pattern sẽ giúp chúng ta viết thành data abstraction, khi chúng ta có một hoặc nhiều class và việc tái sử dụng sẽ tốt và dễ dàng hơn.

Nói về **Repository Pattern** đóng vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng (CRUD). Thông thường thì các phần truy vấn dữ liệu với database năm rải rác ở trong code nhưng với với Repository thì khi cần thực hiện các thao tác với database, nó không trực tiếp gọi tới database drivers và nếu chúng ta sử dụng nhiều database, hoặc nhiều database trong 1 transaction, app của bạn sẽ gọi thông qua các method được định nghĩa bởi Repository.

Cũng giống như vậy, nhưng Generic Repository thì chúng ta sẽ chỉ có 1 abstraction, 1 Base Class chứa tất cả những operations chung và EntityRepository của bạn sẽ extends base class. Theo như nguyên lý SOLID thì pattern này chính là Open / Closed principle.
### When to use a Generic Repository ?
Điều này phụ thuộc vào Business model của bạn. Ý kiến của tôi (tác giả) thì pattern này sẽ chú trọng vào việc mở rộng và cho phép bạn dùng 1 class để viết tất cả các operations chung (thường dùng nhất) như CRUD.
### When don’t use Generic Repository ?
Cùng xem ví dụ cụ thể sau:
- Bạn có 2 model sau: `People` và `Account`
- User có thể xóa `People`
- User không thể update `Account` (ví dụ như sửa số tiền trong đó)

Nếu cả 2 class trên đều extend từ base class (có methods update và delete) như vậy thì bussiness logic của bạn sẽ không còn đúng nữa.
### Generics with Typescript
> Components that are capable of working on the data of today as well as the data of tomorrow will give you the most flexible capabilities for building up large software systems 

Theo như documentation của Typescript thì generics cho phép bạn build một flexible component (hoặc type). Chúng ta cùng xem qua ví dụ để hiểu hơn:
```typescript
function identity(arg: number): number {
    return arg;
}
```
Như trên, Chúng ta có một function cố định. Nó nhận vào một số và trả về kết quả là số đó (cùng type). Nếu chúng ta muốn nó nhận argument là một string chẳng hạn thì chúng ta phải viết một function khác với code implement tương tự (lặp code).

Với việc implement Generics thì chúng ta làm như sau:
```typescript
function identity<T>(arg: T): T {
  return arg;
}

// call
const result = identity<string>('Hello world');
console.log(result); // Hello world

const resultNumber = identity<number>(200);
console.log(resultNumber); // 200
```
Nếu bạn không quan tâm tới type của argument truyền vào thì có thể dùng `any` thay cho `T`.
### Creating a real project with Generic Repository and Node.js
Sau khi cài đặt môi trường xong, chúng ta cùng chia thư mục như sau cho dễ quản lý:
```
.
├── entities 
├── package.json
├── repositories
│ ├── base 
│ └── interfaces 
└── tsconfig.json
```
Phần config trong file tsconfig.json, mọi người có thể tham khảo [ở đây](https://github.com/kominam/nodeJs-starter/blob/master/tsconfig.json)

Về folder `entities` là nơi chứa model của app, `repositories` là nơi chứa các operations tương tác với database. Bây giờ chúng ta cùng tạo model có tên là `Spartan.ts`:
```typescript
export class Spartan {
  private name: string;
  private kills: number;

  constructor(name: string, kills: number) {
    this.name = name;
    this.kills = kills;
  }
}
```
Bây giờ trong folder `repositories/interfaces`, chúng ta tạo 2 files với nhiệm vụ là read và write:
```typescript
export interface IWrite<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
```
```typescript
export interface IRead<T> {
  find(item: T): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
```
Sau khi tạo interface xong, chúng ta tạo base class để implements những operations trên và áp dụng cho tất cả các model của app. Tạo file `BaseClassRepository.ts`:
```typescript
// import all interfaces
import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    create(item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
}
```
Chúng ta cần tạo phần implement cho tất cả các methods trên. 
We should now create the implementations for all methods. 

Trong constructor (hàm khởi tạo), chúng ta thêm 2 args là db và collectionName:
```typescript
import { IWrite } from '../interfaces/IWrite';
import { IRead } from '../interfaces/IRead';

import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: Collection;

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }

  async create(item: T): Promise<boolean> {
    const result: InsertOneWriteOpResult = await this._collection.insert(item);
    return !!result.result.ok; // return true/false
  }
  ...
}
```
Bây giờ chúng ta tạo Repository file cho từng model cụ thể:
```typescript
import { BaseRepository } from "./base/BaseRepository";
import { Spartan } from "../entities/Spartan";

export class SpartanRepository extends BaseRepository<Spartan>{
    countOfSpartans(): Promise<number> {
        return this._collection.count({});
    }
}
```
Để test repository trên và logic của nó chúng ta tạo file `index.ts` ở thư mục gốc của project và gọi repository đó:
```typescript
import { MongoClient } from 'mongodb';

import { SpartanRepository } from './repositories/SpartanRepository'
import { Spartan } from './entities/Spartan';

(async () => {
    const connection = await MongoClient.connect('mongodb://localhost');
    const db = connection.db('warriors');

    const spartan = new Spartan('Leonidas', 1020);

    // initializing the repository
    const repository = new SpartanRepository(db, 'spartans');

    // call create method from generic repository
    const result = await repository.create(spartan);
    console.log(result); //  true

    //call specific method from spartan class
    const count = await repository.countOfSpartans();
    console.log(count); // 1
})();
```
Để chạy được app chúng ta cần chạy câu lệnh `tsc` hoặc `tsc watch` ở terminal để transpile từ Typescript sang js file. Sau đó thì chạy `node dist/index.js`.

Để thấy rõ hơn tác dụng của việc dùng pattern này chúng ta sẽ tạp thêm 1 repository nữa có tên là `HeroRepository.ts` và 1 model là `Hero.ts`:
```typescript
export class Hero {
    private name: string;
    private savedLifes: number;

    constructor(name: string, savedLifes: number) {
        this.name = name;
        this.savedLifes = savedLifes;
    }
}
```
```typescript
import { BaseRepository } from "./base/BaseRepository";
import { Hero } from "../entities/Hero"

export class HeroRepository extends BaseRepository<Hero>{

}
```
Giờ thì gọi nó ở trong file `Index.ts`:
```typescript
import { MongoClient } from 'mongodb';

import { SpartanRepository } from './repositories/SpartanRepository';
import { HeroRepository } from './repositories/HeroRepository';

import { Spartan } from './entities/Spartan';
import { Hero } from './entities/Hero';

(async () => {
    const connection = await MongoClient.connect('mongodb://localhost');
    const db = connection.db('warriors');
    ...
    
    const hero = new Hero('Spider Man', 200);
    const repositoryHero = new HeroRepository(db, 'heroes');
    const resultHero = await repositoryHero.create(hero);
    console.log(resultHero); // true 
})();
```
### Conclusion
Trên đây là một ví dụ áp dụng Repository design pattern trong ứng dụng Nodejs với Typescript (Generic). Khi bắt đầu học Nodejs mình cũng bắt đầu với Typescript để tiện cho việc học design pattern :D (ví dụ như áp dụng cho mailer,...). Happy coding !
### References
https://hackernoon.com/generic-repository-with-typescript-and-node-js-731c10a1b98e