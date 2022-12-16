![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/08/cubes-2492010_1920.jpeg?w=1920&ssl=1)
Dạo này mình đang học một cái gì đó mới. Vì cũng đang làm việc ở backend với vai trò chính là CRUD cho dự án cùng Django, nên mình chọn một cách làm backend khác, với một ngôn ngữ khác, đó chính là NestJS cùng typescript. 

Và thế là một thế giới mới xuất hiện 😅

Mình làm một project demo nho nhỏ với chat service, chính là là API tạo room, rồi lấy các message trong room, …

Trong bài viết hôm nay, mình sẽ làm việc trên API lấy tất cả các tin nhắn trong một room, và cùng viết lại một cách validation mà mình thấy khá hay từ NestJS. 

Mình sẽ đi theo hướng tiếp cận của người chưa biết gì về NestJS cũng như cách mình tiếp cận document và áp dụng cách validations xịn xò từ bạn ấy.

## GET /{roomId}/messages/?limit={x}&offset={y}
Ở trên là một endpoint dùng để lấy tất cả messages trong room có id là roomId, với các query param là limit, offset, limit có giá trị mặc định là 10, còn offset mặc định lấy từ đầu là 0.

Với limit là số message nhận được còn offset sẽ là bắt đầu lấy từ message nào.

Vậy thì vì sao lại cần kiểm tra kiểu dữ liệu của limit và offset ở đây?
Mình đoán bạn từng làm API thì sẽ biết, query param sẽ có kiểu dữ liệu là string. Cơ mà limit, offset khi mình dùng để gọi khi mình lấy dữ liệu từ database(Moongo), ví dụ model.find().limit(x).skip(y), thì bắt buộc x, y là number.

Do đó, nếu mình không kiểm tra và chuyển string ’10’ về số 10 thì sẽ bị lỗi khi query database.

Okie, vậy là đã hiểu vì sao cần validation ở đây rồi, tiếp theo mình sẽ đi qua các cách validation mình thử nghiệm:

### Cách 1: Kiểm tra và chuyển về kiểu số bằng cơm
Mình sẽ đưa ra 3 snippets code cho version đầu tiên mình làm:

file room.controller.ts:
```ts
  @Get(":roomId/messages")
  async findMessages(
    @Query() { limit, offset }: MessagePaginationParam,
    @Param("roomId") roomId: number
  ) {
    return this.service.findMessages(roomId, limit, offset)
  }
với MessagePaginationParam được định nghĩa như sau:

class PaginationParam {
  static DEFAULT_LIMIT: number = 10;
  static DEFAULT_OFFSET: number = 0;

  limit?: number
  offset?: number
}
```

tiếp đến là room.service.ts:

```ts
  async findMessages(
    roomId: number,
    limit?: number,
    offset?: number
  ): Promise<MessagePagination> {

    let limit = limit || MessagePaginationParam.DEFAULT_LIMIT;
    let offset = offset || MessagePaginationParam.DEFAULT_OFFSET;

    if (typeof(limit) === "string") {
      limit = parseInt(limit)
    }

    if (typeof(offset) === "string") {
      offset = parseInt(offset)
    }

    const results = await this.model.find(
       { roomId: roomId }
    ).limit(limit).skip(offset).exec()

    return {
      count: results.length,
      results: results
    }
  }
```

Ở version đầu tiên, bạn có thể thấy mình làm 2 việc:

– Một là, nếu không có giá trị limit, offset truyền vào, mình sẽ gán nó bằng giá trị mặc định từ lớp PaginationParam

– Hai là, kiểm tra kiểu của limit, offset bằng tay, tức là mình check typeof của nó có bằng “string” không rồi dùng parseInt() để chuyển về số nguyên. 

Sẽ có trường hợp nó nhận giá trị mặc định là MessagePaginationParam.DEFAULT_LIMIT, là số nên cần kiểm tra kiểu dữ liệu trước khi chuyển đổi.

## Cách 2: Bắt đầu tiếp cận với pipe validation của NestJS
Bạn có thể đọc thêm về Pipes trong NestJS ở [đây](https://docs.nestjs.com/pipes).Thì có thể hiểu nôm na là pipe là các đường ống, nó sẽ dẫn dữ liệu của mình qua đó trước, làm sạch gì đó rồi mới đi đến các nơi khác.

Ở đây, mình đã dùng ParseIntPipe để chuyển string về số integer, đồng thời sử dụng giá trị mặc định của query param ngay trong room.controller.ts

```ts
  import { ParseIntPipe } from "@nestjs/common";

  @Get(":roomId/messages")
  @ApiOkResponse({
    description: "List Messages Paginated",
    type: ResponseMessageListDto,
  })
  async findMessages(
    @Param("roomId", ParseIntPipe) roomId: number,
    @Query("limit", ParseIntPipe) limit: number = Constant.DEFAULT_LIMIT,
    @Query("offset", ParseIntPipe) offset: number = Constant.DEFAULT_OFFSET,
  ): Promise<ResponseMessageListDto> {
    return this.roomService.findMessages(roomId, limit, offset);
  }
```

Các giá trị mặc định của mình giờ đã được bỏ vào lớp Constant

```ts
export enum Constant {
  DEFAULT_LIMIT = 10,
  DEFAULT_OFFSET = 0,
}
```

Và room.service.ts đã ngắn gọn hơn nhờ không cần kiểm tra và chuyển đổi dữ liệu nữa:

```ts
  async findMessages(
    roomId: number,
    limit?: number,
    offset?: number
  ): Promise<MessagePagination> {
    const results = await this.model.find(
       { roomId: roomId }
    ).limit(limit).skip(offset).exec()

    return {
      count: results.length,
      results: results
    }
  }
```

## Cách 3: Thêm query params startedAt, endedAt để lọc message theo time range
Code version 2 đã khá ổn với tớ cho đến khi tớ cần thêm một vài query params nữa. startedAt và endedAt là hai query params giúp lọc các message trong một khoảng thời gian nhất định.

Khi đó code trong room.controller.ts của tớ như thế này:

```ts
  @Get(":roomId/messages")
  async findMessages(
    @Param("roomId", ParseIntPipe) roomId: number,
    @Query("limit", ParseIntPipe) limit: number = Constant.DEFAULT_LIMIT,
    @Query("offset", ParseIntPipe) offset: number = Constant.DEFAULT_OFFSET,
    @Query("startedAt") startedAt?: string,
    @Query("endedAt") endedAt?: string,
  ): Promise<ResponseMessageListDto> {
    const optionals: QueryParamsFindMessage = {
      limit: limit,
      offset: offset,
      startAt: startedAt,
      endAt: endedAt
    }
    return this.roomService.findMessages(roomId, optionals);
  }
```

Có thể thấy mình có 4 query params, và mình đã sử dụng một type QueryParamsFindMessage để kiểm tra kiểu dữ liệu của các params và đặt nó chung vào một object là optionals để truyền nó đi cho gọn.

```ts
export type QueryParamsFindMessage = {
  limit: number,
  offset: number,
  startedAt?: string,
  endedAt?: string
}
```
Và tiếp theo trong room.service.ts mình cũng đã thực hiện lọc message theo time range.

```ts
async findMessages(
    roomId: number,
    optionals: QueryParamsFindMessage,
  ): Promise<ResponseMessageListDto> {
    const room = await this.roomModel.findOne({ problemId: roomId });

    if (!room) {
      throw new NotFoundException();
    }

    let { limit, offset, startAt, endAt } = optionals

    const results = await this.messageModel
      .find({
        problemId: roomId,
        createdAt: {
          $gte: startAt ? new Date(startAt) : room.startedAt,
          $lte: endAt ? new Date(endAt) : room.endedAt,
        }
      })
      .limit(limit)
      .skip(offset);

    return {
      count: results.length,
      results: results
    }
  }
 ```
 
Ở đây, nếu để ý mọi người sẽ thấy mình chuyển kiểu dữ liệu string của startedAt và endedAt thành kiểu object Date bằng cách tạo new Date() với giá trị string đó.

## Cách 4: Sử dụng Dto và validator, transformer trong Dto
Những tưởng cách trên đã xịn xò rồi, nhưng đồng bọn của mình góp ý là có một cách là có thể validate và transform trên Dto luôn. Cho nên mình đã đọc thêm kỹ hơn về [class-validator](https://docs.nestjs.com/pipes#class-validator), và tìm kiếm quanh quanh và làm được version tạm gọi là cuối cùng này.

Đây là room.controller.ts với tất cả query params quy về một object tên là filterMessageDto. 
```ts
  @Get(":roomId/messages")
  @ApiOkResponse({
    description: "List Messages Paginated",
    type: ResponseMessageListDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMessages(
    @Param("roomId", ParseIntPipe) roomId: number,
    @Query() filerMessageDto: FilterMessageDto
  ): Promise<ResponseMessageListDto> {
    return this.roomService.findMessages(roomId, filerMessageDto);
  }
```
Xịn chưa, vậy là không còn bị một mớ query params nữa. À, một lưu ý nhỏ là dòng:

`@UsePipes(new ValidationPipe({ transform: true }))`

chính là cách mình cho phép controller của mình sử dụng validation pipe và cho phép transform data.

Còn đây là FilterMessageDto dùng để vừa kiểm tra type, vừa validate và còn cả transformer nữa.
```ts
import { Type } from "class-transformer";
import { IsOptional, IsInt, IsDate } from "class-validator";
import { Constant } from "../../common/constant";

export class FilterMessageDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = Constant.DEFAULT_LIMIT;


  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number = Constant.DEFAULT_OFFSET;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startedAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endedAt?: Date;
}
```

Ở đây, mình đã dùng transformer với *@Type()* để chuyển các loại params về kiểu mình mong muốn. Đồng thời cũng dùng *@IsOptional()* để nó bỏ qua khi truyền vào null/undefined.

Cuối cùng là trong room.service.ts mình không còn cần phải chuyển string qua Date cho startedAt, endedAt nữa.
```ts
  async findMessages(
    roomId: number,
    filerMessageDto: FilterMessageDto,
  ): Promise<ResponseMessageListDto> {
    const room = await this.roomModel.findOne({ problemId: roomId });

    if (!room) {
      throw new NotFoundException();
    }

    const { limit, offset, startedAt, endedAt } = filerMessageDto;

    const results = await this.messageModel
      .find({
        problemId: roomId,
        createdAt: {
          $gte: startedAt || room.startedAt,
          $lte: endedAt || room.endedAt,
        },
      })
      .limit(limit)
      .skip(offset);
      
      return {
        count: results.length,
        results: results
      }
    }
```
Vậy là mình đã cùng nhau thực hành qua cách validation khi làm việc với query params rồi, đúng là có nhiều cách ghê nhỉ. 

Cơ mà NestJS mạnh ghê ha, code nhìn sạch đẹp hẳn ấy. Mình thích điều đó 😀

Và [bài gốc của nội dung này](https://beautyoncode.com/nestjs-tips-validation-query-params/) nằm trên blog cá nhân của tớ nhé!

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!