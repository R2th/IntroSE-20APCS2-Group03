Lần trước mình đã giới thiệu đến các bạn về Framework Nestjs. Các bạn có thể xem lại [tại đây](https://viblo.asia/p/framework-nestjs-gioi-thieu-part-1-GrLZDkAwKk0). Hôm nay mình sẽ tiếp tục tìm hiểu về Provider nhé.
# Provider
Provider là một khái niệm cơ bản trong Nest. Có rất nhiều class cơ bản của Nest có thể coi là 1 provider như: services, repositories. factories, helpers... Idea của provider là có thể  inject dependencies - điều này có nghĩa là các object có thể tạo ra các quan hệ với nhau, và việc tạo các instance của các object được Nest thực hiện tự động. Một provider đơn giản là 1 class được liên kết với 1 decorator @Injectable().

Trong phần trước, mình đã xây dựng một controller đơn giản. Controller chỉ nên đảm nhận xử lý request và ủy thác các nhiệm vụ phứt tạp cho providers. 
## Services
Hãy bắt đầu tạo service đơn giản. `CatsService` - Service này sẽ đảm nhận lưu trử và trả về dữ liệu, và được thiết kế để sử dụng bởi `CatsController`, vì vậy chúng ta nên tạo 1 provider để 2 class này có thể tạo quan hệ với nhau.

```
// cats.service.ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

> HINT: Có thể tạo một service bằng cách sử dụng CLI: `nest g service cats`
 `@Injectable()`  decorator sẽ giúp Nest biết rằng đây là 1 provider. Vì thế Nest sẽ tự động tạo 1 instance của class này và truyền vào `CatsController`:

```
// cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

Tại hàm khởi tạo có 1 cú pháp mới của TypeScript là `private readonly`.Đây là một cách ngắn để định nghĩa và khởi tạo thành viên `catsService ` cùng một lúc.

## Dependency injection
Nest được xây dựng xung quang mẫu thiết kế mạnh mẽ được gọi là **Dependency injection**. Mình khuyên bạn nên đọc một bài viết tuyệt với về khái niệm này trong tài liệu chính thức của [Angular](https://angular.io/guide/dependency-injection).

Trong Nest, nhờ vào khả năng của TypeScript nó dể dàng quản lý các dependencies nhờ type của chúng. Nest sẽ xử lý `catsService ` bằng cách tạo và trả về 1 instance của `CatsService `. Trong mẫu singleton, thì sẽ trả về 1 instance nếu nó đã tồn tại ở một nơi nào khác. Dependency này được xử lý và truyền qua hàm khởi tạo của controller.
```
constructor(private readonly catsService: CatsService) {}
```
## Scopes
Provider thông thường sẽ có vòng đời đồng bộ với vòng đời của ứng dụng. Khi một ứng dụng được khởi động, tất cả dependency phải được giải quyết, do đó mọi provider phải được khởi tạo. Tương tự khi ứng dụng tắt. thì tất cả provider bị phá hủy. Tuy nhiên có cách để làm cho các provider cả bạn có vòng đời theo chu kỳ của request - response. Bạn có thể đọc thêm[ tại đây](https://docs.nestjs.com/fundamentals/injection-scopes)
## Custom providers
Nest đã xây dựng 1 Containẻ để giải quyết các quan hệ giữa các provider. Tính năng này là gốc rễ của tính năng dependency injection đã mô tả bên trên. `@Injectable()` decorator  chỉ là phần nỗi nhỏ nhắn để sử dụng, và nó không phải là cách duy nhất để định nghĩa một provider. Trong thực tế bạn có thể sử dụng 1 giá trị nguyên thủy, class, và factories đồng bộ hoặc bất đồng bộ. Bạn có thể xem thêm[ tại đây](https://docs.nestjs.com/fundamentals/custom-providers)
## Optional providers
Thỉnh thoảng bạn có những dependencies  mà nó không cần phải được giải quyết. Ví dụ, class của bạn có depend vào ** configuration object**. Nhưng nếu nó không được  tuyền, thì giá trị mặt định sẽ được sử dụng. Trong trường hợp này dependency  sẽ trở thành tùy chọn. Để chỉ ra rằng một provider là tùy chọn, sử dụng `@Optional()` decorator  phá trước dependency  đó.
```
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T
  ) {}
}
```
Chú ý trong ví dụ trên chúng ta đã sử dụng một custom provider, đó là lý do chúng ta đã bao gồm token `HTTP_OPTIONS `. 
## Property-based injection
Kỹ thuật chúng ta đã sử dụng cho đến nay được gọi là constructor-based injection - một provider sẽ được inject thông qua hàm constructor. Thỉnh thoảng, property-based injection có thể hửu dụng. Ví dụ: nếu ở class cha depend một hoặc nhiều provider, thì việc truyền tất cả chúng bằng cách gọi super() trong class con tại hàm khởi tại là rất tệ. Để tránh điều này, bạn có thể sử dụng `@Inject()` decorator trước thuộc tính.
```
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```
## Provider registration
Bây giờ chúng ta đã định nghĩa một `CatsService` provider và sử dụng nó tại `CatsController`, Chúng ta cần đăng ký provider với Nest để nó có thể thực hiện injection. Chúng ta làm điều này bằng các sửa `AppModule ` module.
```
// app.module.ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```
Nest bây giờ có thể giải quyết dependencies  của `CatsController` class.

Cuối cùng dưới đây là cấu trúc thư mục của ứng dụng:
```
src
    cats
        dto
            create-cat.dto.ts
        interfaces
            cat.interface.ts
        cats.service.ts
        cats.controller.ts
    app.module.ts
    main.ts
```
# Final
Hẹn gặp các bạn tại phần sau nhé :D