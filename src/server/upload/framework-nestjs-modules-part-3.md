Tiếp tục [Series Framework Nestjs](https://viblo.asia/s/framework-nestjs-yEZkg8PYZQ0). Hôm nay mình sẽ tiếp tục tìm hiểu về Modules nhé.
# Modules
Một module là một class được gắn với một decorator `@Module()`. Decorator `@Module()` cung cấp metadata cho **Nest**  sử dụng để tổ chức cấu trúc ứng dụng.

![](https://images.viblo.asia/77bb7e6a-5442-4694-95d7-0c4485d47f07.png)

Mỗi ứng dụng có ít nhất một module - **Root module**. Root module là điểm bắt đầu mà Nest sử dụng để xây dựng biểu đồ ứng dụng, hay còn gọi là cấu trúc dữ liệu ban đầu mà Nest sử dụng để giải quyết các denpendencies và relationship của các provider và module khác. Nest nhấn mạnh rằng module là được khuyến nghị để tố chức các component của ứng dụng của bạn một cách hiểu quả. Mỗi module sẽ đóng gói một bộ các chức năng liên quan chặt chẽ.

Decorator `@Module()` lấy 1 object gồm các thuộc tính sau:

* `providers` - các providers sẽ được khởi tạo bởi Nest injector - Trình khởi tạo và có thể được chia sẽ trên toàn module này.
* `controllers` - các controller được định nghĩa trong module này, và cũng sẽ được khởi tạo bởi Nest injector.
* `imports` - các module khác sẽ được import vào module này. Sau khi import vào, module này có thể sử dụng những gì mà các module kia đã exports ra.
* `exports` - một bộ con các `providers` của module này sẽ mở ra cho các module khác có thể sử dụng khi chúng import module này. 

Mặc định module đóng gói các providers. Có nghĩa bên trong module chỉ có thể inject các providers của  chính mình hoặc được exports từ các module đã import vào.
# Feature modules
`CatsController` và `CatsService` cùng thuộc một ứng dụng và chúng quan hệ gần gửi với nhau, đây là trường hợp lý tưởng để gom chúng lại cùng một feature module. Một feature module đơn giản là tổ chức code có liên quan cho một tính năng cụ thể, giữ cho mã được tổ chức và thiết lập ranh giới rõ ràng. Điều này giúp chúng ta quản lý sự phức tạp và phát triển với nguyên tắc [SOLID](https://en.wikipedia.org/wiki/SOLID).

Chúng ta sẽ tạo `CatsModule`.
```
// cats/cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

*HINT* để tạo một module bằng CLI, đơn giản thực thi lệnh `$ nest g module cats`.

Ở trên chúng ta đã định nghĩa `CatsModule` trong file `cats.module.ts`, và di chuyển tất các mọi thứ liên quan module này vào trong thư mục `cats`. Điều cuối cùng chúng ta cần làm là import module này vào trong root module - `AppModule` trong file `app.module.ts`.
```
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

Dưới đây là cấu trúc ứng dụng mà chúng ta đã xây dựng được cho đến nay.

![](https://images.viblo.asia/1b6ab85a-5fb9-4441-b599-2803a1382ce5.jpg)
# Shared modules
Trong Nest, module là **singletons** bởi mặc định, và vì vậy bạn có thể chia sẽ cùng một instance của bất kỳ provider nào giữa các module dể dàng.

![](https://images.viblo.asia/583732c8-fa30-4c56-abad-53f4971a8301.png)

Mỗi module tự động là **shared module**. Chúng được khởi tạo một lần và có thẻ sử dụng lại ở bất kỳ module nào. Hảy tưởng tượng rằng chúng ta muốn chia sẽ một instance của `CatsService` giữa một vài module khác. Để làm điều này, đầu tiên chúng ta cần export provider `CatsService` bằng cách thêm nó vào `exports` của module, như dưới:

```
// cats.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```

Bây giờ bất kì module nào import `CatsModule` vào đều có thể truy cập `CatsService` và sẽ sử dụng cùng một instance với tất cả module khác đã import nó.
# Module re-exporting

Như ở trên, module có thể export các providers của chính nó. Ngoài ra module có thể re-export các module mà nó đã import. Ví dụ, `CommonModule`  vừa được import vào là export ra từ `CoreModule`, để làm nó có sẳn khi các module khác chỉ cần một cái là đủ.
```
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```
# Dependency injection
Một class module có thể **inject** các providers

```
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
```

Tuy nhiên, ở chiều ngược lại thì bản thân các class module không thể inject vào các nhà cung cấp do [circular dependency](https://docs.nestjs.com/fundamentals/circular-dependency)

# Global modules
Nếu bạn đã import cùng một bộ các module ở rất nhiều nơi, nó là khá kinh khủng, Không giống Nest - Angular, các providers được đăng kí trong phạm vi global. Sau khi định nghĩa, chúng có sẳn ở mọi nơi. Nest thì đóng gói các providers bên trong phạm vi module. Bạn không thể sử dụng các providers ở các nơi khác mà không import module đã đóng gói chúng.

Khi bạn muốn cung cấp một bộ các providers mà sẽ có sẳn ở tất cả mọi nơi (ví dụ, database connection, pagination...), hãy tạo một **global** module  bằng các sử dụng decorator `@Global()`

```
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

Decorator `@Global` làm cho module này có phạm vi toàn cầu. Global module nên được đăng kí một lần duy nhất. Ở ví dụ trên, provider `CatsService` sẽ có mặt ở khắp mọi nơi và các module muốn inject nó sẽ không cần phải import `CatsModule`.
# Dynamic modules

Hệ thống module của Nest bao gồm một tính năng mạnh mẽ được gọi là **dynamic modules**. Đây là một tính năng cho phép bạn dể dàng tạo một module tùy chỉnh mà có thể đăng kí và cấu hình provider động. Dynamic module được hướng dẫn chi tiết [tại đây](https://docs.nestjs.com/fundamentals/dynamic-modules). Trong chương này chúng ta chỉ lấy cái nhìn tổng quan để hoàn thành hướng dẫn về modules.

Ví dụ sau là cách định nghĩa một dynamic module - `DatabaseModule`:
```
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

Module này định nghĩa một provider `Connection` bởi mặc định.  Nhưng ngoài ra, phụ thuộc vào entities và options truyền vào method `forRoot()` - trả về một bộ các providers, ví dụ như các repositories. Chú ý rằng các thuộc tính trả về bởi dynamic module phải **extend** base module, tức là bao gồm các thuộc tính như decorator `@Module()`.  Đó là cách vừa định nghĩa tĩnh một provider `Connection` và định nghĩa động các providers repositories. 

Nếu bạn muốn đăng kí một dynamic module trong phạm vi toàn cầu, hãy thiết lập thuộc tính `global: true`. 

```
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}
```
Sử dụng dynamic module:
```
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

Re-export dynamic module:
```
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```
[Code example](https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules)
# Final
Hẹn gặp các bạn tại phần sau nhé :D