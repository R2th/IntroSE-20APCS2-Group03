Bài viết được dịch từ [nguồn](https://dev.to/vovaspace/dependency-injection-in-typescript-4mbf#:~:text=The%20D%20letter%20in%20SOLID,this%20principle%20is%20Dependency%20Injection)

> Chữ D trong quy tắc thiết kế phần mềm `SOLID` chính là quy tắc `Dependency Inversion`. Nó giúp chúng ta có thể tách các modules ra khỏi nhau nhằm tránh sự phụ thuộc giữa chúng.

Một trong những kĩ thuật giúp chúng ta thực hiện quy tắc `Dependency Inversion` nêu trên chính là `Dependency Injection`

### Dependencies là gì ?

Để dễ hiểu chúng ta sẽ định nghĩa dependency như bất kì modules nào mà chúng ta sẽ sử dụng trong chương trình của chúng ta. Hãy cùng xem hàm dưới đây (hàm này nhận vào hai số và trả về một số ngẫu nhiên nằm trong khoảng giữa của hai số nhận vào).

```TS
const getRandomInRange = (min: number, max: number): number => Math.random() * (max - min) + min;
```

Hàm này `phụ thuộc` vào hai tham số là `min`, `max`.

Thế nhưng bạn có thể thấy hàm này không những phụ thuộc vào hai tham số như đã nói ở trên mà còn phụ thuộc vào hàm `Math.random`. Nếu hàm `Math.random` không hoạt động vì một lí do nào đó thì hàm `getRandomInRange` của chúng ta cũng sẽ không hoạt động theo. Và đây chính là dẫn chứng cụ thể về việc phụ thuộc vào chức năng của một module khác. Do đó `Math.random` còn được gọi là **dependency**.

Chúng ta hãy cùng nhau thử truyền dependency thông qua tham số hàm xem sao.

```TS
const getRandomInrange = (
  min: number,
  max: number,
  random: () => number,
): number => random() * (max - min) + min;
```

Bây giờ khi muốn gọi đến hàm `getRandomInRange` ta cần truyền tham số như sau:

```TS
const result = getRandomInRange(1, 10, Math.random);
```

Để tránh việc lúc nào cũng phải truyền hàm `Math.random` vào như trên, ta có thể thiết lập nó như là giá trị mặc định (default value) cho tham số cuối cùng của hàm là `random`.

```TS
const getRandomInRange = (
  min: number,
  max: number,
  random: () => number = Math.random
): number => random() * (max - min) + min;
```

**Đây chính là cách triển khai cơ bản nhất của Dependency Inversion**. Đó là chúng ta sẽ truyền vào module của chúng ta tất cả những dependencies mà nó cần.

### Tại sao nó lại cần thiết ?

Tại sao chúng ta lại phải truyền hàm `Math.random` vào như một tham số ? Tại sao lại không sử dụng nó trực tiếp trong thân hàm luôn ? Có hai lí do cho điều này:

#### Testability

Khi các dependencies được định nghĩa một cách tường minh như vậy sẽ giúp cho công việc test của chúng ta trở nên dễ dàng hơn. Cụ thể là chúng ta có thể thấy được cần chuẩn bị những gì để test. Chúng ta biết phần nào sẽ ảnh hưởng đến module để từ đó có thể:
- Thay thế chúng bằng một implementation đơn giản hơn

hoặc

- Thay thế chúng bằng các mock implementations

Mock implementation khiến cho việc test trở nên dễ dàng hơn. Đôi khi chúng ta không thể test nếu thiếu chúng. Cụ thể là với hàm `getRandomInRange`, chúng ta không thể test chính xác kết quả cuối cùng vì ... nó là hàm random.

Việc triển khai mock có thể được thực hiện như sau:

```TS
// Tạo mock implementation cho Math.random
const mockRandom = () => 0.1;

// gọi hàm cần test và truyền vào đó hàm mock ta đã tạo ở trên
const result = getRandomInRange(1, 10, mockRandom);

expect(result).toBe(1) // → true
```

#### Thay thế depedency này bằng dependency khác

Chúng ta thường chỉ thay thế dependencies khi có các lí do rất đặc biệt.
Nếu dependency mới có chức năng tương tự như dependency cũ thì chúng ta có thể làm như sau:

```TS
const otherRandom = (): number => {
  // Implementation of random
}
const result = getRandomInRange(1, 10, otherRandom);
```

Ở đây chúng ta có thể chắc chắn rằng dependency mới sẽ có cùng chức năng như dependency cũ là vì argument type của nó cũng là `() => number`. Đó là vì chúng ta đang sử dụng Typescript chứ không phải Javascript. Types và interfaces được links giữa các modules với nhau.

### Dependencies on Abstractions

Các phần trên có thể tương đối phức tạp với bạn. Nhưng trên thực tế, với cách tiếp cận:
- Modules trở nên ít phụ thuộc vào các dependencies
- Chúng ta phải thiết kế behavior / chức năng của các modules trước khi bắt đầu code

Khi thiết kế các behavior, chúng ta sẽ sử dụng abstract convention. Dưới các conventions này, chúng ta sẽ thiết kết `modules của chúng ta` hoặc `adpater cho third-party library`. Điều này cho phép ta có thể thay thế một phần của hệ thống mà không cần phải viết lại chúng 100%.

### Dependency Injection

Chúng ta hãy cùng nhau viết một counter khác. Counter này có thể `tăng` hoặc `giảm`. Đồng thời nó cũng có thể log ra state hiện thời.

```TS
class Counter {
  public state: number = 0;
  
  public increase(): void {
    this.state += 1;
    console.log(`State increased. Current state is ${this.state}.`);
  }
  
  public decrease(): void {
    this.state -= 1;
    console.log(`State decreased. Current state is ${this.state}.`;
  }
}
```

Ở đây chúng ta không chỉ sử dụng  `state` mà còn sử dụng module `console`. Do đó chúng ta phải **inject** dependency này.

Nếu với hàm ta truyền dependency vào thông qua tham số thì với class ta sẽ "inject" nó vào thông qua constructor.

Class `counter` của chúng ta sử dụng `log` method của `console` object. Điều đó có nghĩa rằng, chúng ta cần truyền vào một object nào đó có method `log` như là một dependency. Nó không nhất thiết phải là `console` - vì chúng ta muốn đảm bảo tính dễ test và dễ thay thế của module.

```TS
interface Logger {
  log(message: string): void;
}

class Counter {
  constructor(private logger: Logger) {}
  
  public state: number = 0;
  
  public increase(): void {
    this.state += 1;
    this.logger.log(`State increased. Current state is ${this.state}.`);
  }
  
  public decrease(): void {
    this.state -= 1;
    this.logger.log(`State increased. Current state is ${this.state}.`);
  }
}
```

Khi khởi tạo một instance mới, ta sẽ làm như sau:

```TS
const counter = new Counter(console);
```

Còn nếu bạn muốn thay thế `console` bằng một module khác, bạn cần đảm bảo rằng module mới này cũng triển khai `Logger interaface`.

```TS
const alertLogger: Logger = {
  log: (message: string): void => {
    alert(message);
  } 
}

const counter = new Counter(alertLogger);
```

### Automatic Injections và DI containers

Hiện tại ta đã có thể truyền một cách tường minh các dependencies vào module. Thế nhưng ta vẫn phải làm điều đó một cách thủ công và trong trường hợp có nhiều dependencies thì ta cũng cần phải chú ý đến thứ tự truyền vào của chúng.

Điều này có thể được giải quyết bằng việc sử dụng `DI container`. Cụ thể như sau, `DI container` là một module có chức năng cung cấp depedencies cho các modules khác.

`DI container` biết rằng module nào cần nhưng dependencies nào để từ đó tạo depedencies và `inject` vào module. Lúc này module không cần thiết phải quan tâm đến việc `inject` depedencies vào chính mình nữa.

### Automatic Injections In Practice

Chúng ta sẽ sử dụng [Brandi DI Container](https://brandi.js.org/) , nó sẽ đảm nhận công việc `Automatic Injection` như đã nói ở trên.

Hãy bắt đầu bằng việc tạo `Logger` interface và tạo `ConsoleLogger` implementation.

```TS
/* Logger.ts */

export interface Logger {
  log(message: string): void;
}

export class ConsoleLogger implements Logger {
  public log(message: string): void {
    console.log(message);
  }
}
```

Bây giờ chúng ta cần phải biết về các tokens. Các tokens sẽ được sử dụng để bind các dependencies với các implemenation của chúng. Do code của chúng ta sẽ được compile từ TS → JS nên ở đây sẽ không có interfaces hay types.

```TS
/* tokens.ts */

import { token } from 'brandi';

import { Logger } from './Logger';
import { Counter } from './Counter';

export const TOKENS = {
  logger: token<Logger>('logger'),
  counter: token<Counter>('counter'),
};
```

Dưới đây sẽ là cách ta `inject` Logger vào Counter class

```TS
/* Counter.ts */

import { injected } from 'brandi';

import { TOKENS } from './tokens';
import { Logger } from './Logger';

export class Counter {
  constructor(
    private logger: Logger,
  ) {}
  
  // Other code
}

injected(Counter, TOKENS.logger);
```

Vì tokens là typed, nên ta không thể inject một dependency với interface hoàn toàn khác, điều này sẽ khiến quá trình compile code gặp lỗi.

Cuối cùng hãy cùng nhau configure container:

```TS
/* container.ts */

import { Container } from 'brandi';
 
import { TOKENS } from './tokens';
import { ConsoleLogger } from './logger';
import { Counter } from './counter';

export const container = new Container();

container
    .bind(TOKENS.logger)
    .toInstance(ConsoleLogger)
    .inTrasientScope();
    
container
    .bind(TOKENS.counter)
    .toInstance(Counter)
    .inTransientScope();
```


Chúng ta đang map tokens với các implementations tương ứng.
Bây giờ khi chugns ta lấy instance từ container, depedencies của nó sẽ được tự động inject.

```TS
/* index.ts */

import { TOKENS } from './tokens';
import { container } from './container';

const counter = container.get(TOKENS.counter);

counter.increase();
```

**`inTransientScope()`  dùng để làm gì ?**

Transient là một trạng thái trong lifecycle của instance mà container sẽ tạo ra.
- `inTransientScope()`: một instance mới sẽ luôn được tạo ra mỗi khi nó được lấy ra từ container.
- `inSingletonScope()`: mỗi lần lấy ra sẽ trả về cùng một instance.

### Lợi ích của Container

Lợi ích đầu tiên là ta có thể thay đổi implemenation trong mói modules chỉ với một dòng code. Điều này chính là nguyên tắc cuối cùng mà SOLID nói tới.

Ví dụ: nếu chúng ta muốn thay đổi `Logger` implementation trong mọi chỗ sử dụng interface này, ta chỉ cần thay đổi binding trong container là được.

```TS
// New implementation of Logger
class AlertLogger implements Logger {
  public log(message: string): void {
    alert(message);
  }
}

container
    .bind(TOKENS.logger)
    .toInstance(AlertLogger)
    .inTransientScope();
```

Hơn nữa chúng ta cũng không cần phải truyền các dependencies bằng tay cũng như phải quan tâm đến thứ tự truyền dependencies vào trong constructor. Các modules giờ đây đã trở nên ít phụ thuộc vào nhau hơn.

### Liệu có nên sử dụng DI?

Sau khi đã thấy được lợi ích cũng như các đánh đổi khi sử dụng DI. Bạn sẽ phải viết các `infrastructure code` nhưng bù lại code của bạn sẽ bớt đi sự ràng buộc giữa các modules cũng như dễ dàng hơn cho quá trình kiểm thử.