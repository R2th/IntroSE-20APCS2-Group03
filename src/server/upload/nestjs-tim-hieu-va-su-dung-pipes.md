### I. Giới thiệu
Trong bài viết này, mình chia sẻ   **Pipes** - một **API** có vai trò quan trọng trong ứng dụng **NestJS**.  
Trước tiên, một **Pipe** được định nghĩa là một **class** được chú thích bởi một **@Injectable() decorator**, và **implement** từ **PipeTransform interface**.  
**Pipes** thường được sử dụng trong hai trường hợp cơ bản sau:  
* **transformation**: chuyển đổi dữ liệu đầu vào thành dạng dữ liệu mong muốn, ví dụ chuyển đổi từ dạng **string** sang **integer**.  
* **validation**: Kiểm tra dữ liệu đầu vào và báo lỗi nếu như dữ liệu đó không thoả mãn điều kiện.  

Để hiểu rõ hơn về hai trường hợp sử dụng trên, chúng ta phân tích kĩ hơn qua các ví dụ cụ thể nhé.  

### II. Các trường hợp Sử dụng Pipe 
Giả sử một trường hợp cơ bản: ta cần viết một **API** trả về thông tin của một **User**, **API** có thể được triển khai như sau:  
```ts
// user.controller.ts

@Get(':id')
async findUserById(@Param('id') id: number) {
    return this.userServics.findOne(id)
}
```
Trong ví dụ trên, mặc định **id** nhận về từ **params** trong **request** sẽ không tồn tại ở dạng **number** mà sẽ ở dạng **string**, chúng ta cần chuyển đổi **id** sang dạng **number** để đảm bảo ham **findUserById** trả về đúng kết quả. Chúng ta có thể viết một **Pipe** cho trường hợp này.  
```ts
// parse-to-string.pipe.ts
import { PipeTransform, BadRequestException } from '@nestjs/common';

export declare class ParseDataToIntPipe implements PipeTransform {
    transform(value: any): number {
        const transformedValue = parseInt(number, 10)
        if (isNaN(transformedValue)) {
            throw new BadRequestException('cannot transform input data to number')
        }
        return transformedValue
    };
}
```
Trong ví dụ trên, chúng ta thực hiện cùng lúc 2 vai trò của **Pipe**, đó là chuyển đổi và kiểm tra dữ liệu đầu vào, **Pipe** sẽ trả về **error** trong trường hợp kết quả truyền vào không thoả mãn, thường sẽ là một **Http error** và sẽ được gửi ngay về **client**. Lưu ý kết quả thực thi một **pipe** luôn phải được thực hiện bên trong phương thức **transform**.  
Sau khi đã khai báo **Pipe**, chúng ta sẽ sử dụng bên trong hàm xử lý **API** ở trên như sau.
```ts
import { ParseDataToIntPipe } from './parse-to-string.pipe.ts'

@Get(':id')
async findUserById(@Param('id', ParseDataToIntPipe) id: number) {
    return this.userServices.findOne(id)
}
```
Một ví dụ khác, giả sử bạn muốn lấy danh sách công việc dựa theo trạng thái (**status**) hiện tại, ta sẽ triển khai **API** như sau:  
```ts
// task.controller.ts
export enum TaskStatus {
    OPEN = 'OPEN',
    INPROGRESS = 'INPROGRESS',
    RESOLVED = 'RESOLVED'
}

@Get('/task/status/:status')
async findTasksByStatus(@Param('status') status: TaskStatus) {
    return this.taskServices.findByStatus(status)
}
```
Để kiểm tra và chuyển đổi **param** truyền vào đúng với định nghĩa **status** trong **enum**, chúng ta có thể viết một **Pipe** như sau:  
```ts
// task-status-validation.pipe.ts
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from './task.controller.ts'

export declare class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.INPROGRESS,
        TaskStatus.RESOLVED,
    ]

    transform(value: any): TaskStatus {
        value = value.toUpperCase()
        if (!isValidStatus) {
            throw new BadRequestException(`${value} is not a valid task status`)
        }
        return transformedValue
    };
    
    isValidStatus(status) {
        return this.allowedStatuses.indexOf(status) > -1
    }
}
```
Sau đó đơn giản là sử dụng **Pipe** vừa tạo bên trong phương thức bên trong **controller**
```ts
@Get('/task/status/:status')
async findTasksByStatus(@Param('status', TaskStatusValidationPipe) status: TaskStatus) {
    return this.taskServices.findByStatus(status)
}
```
### III. Một số Pipe được cung cấp sẵn  
**NestJS** cung cấp sẵn cho chúng ta một số **Pipe** mặc định, giúp chúng ta xử lý một số trường hợp cơ bản hay gặp, giống như ví dụ thứ nhất của mình chẳng hạn, bạn thực tế sẽ không cần viết riêng một **Pipe** cho bài toán hay gặp đó :D. Các **Pipe** được cung cấp sẵn bởi **NestJS** lần lượt là:  
* **ValidationPipe**: 
* **ParseIntPipe**
* **ParseBoolPipe**
* **ParseArrayPipe**
* **ParseUUIDPipe**
* **DefaultValuePipe**
  
Trong 6 **pipe** được cung cấp sẵn bởi **NestJS** thì 4 **pipe** từ thứ 2 tới thứ 4 có chức năng tương tự ví dụ ban đầu của mình, tất nhiên là chúng ta nên sử dụng những **pipe** có sẵn này khi cần thiết thay vì tự viết lại.  Mình sẽ lấy ví dụ về 2 **pipe** còn lại nhé.  
#### DefaultValuePipe  
Đây là một **pipe** cho phép chúng ta chỉ định giá trị mặc định của dữ liệu trong trường hợp dữ liệu truyền vào ở dạng **null** hay **undefined**. Ví dụ trong bài toán phân trang dữ liệu, nếu như giá trị **page** không được truyền vào, chúng ta sẽ xử lý để luông trả về dữ liệu của **page** đầu tiên (**page = 0**)
```ts
// task.controller.ts
import { Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common'

@Get('tasks')
async getTasks(@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number) {
    // ...
}
```
Ví dụ trên sử dụng liên tiếp 2 **Pipe** mặc định của **nestjs**, đảm bảo giá trị của **page** luôn tồn tại và sẽ là một giá trị **number**.

#### ValidationPipe  
**ValidationPipe** sử dụng 2 thư viện trên **npm** là **[class-validator](https://www.npmjs.com/package/class-validator)** và **[class-transformer](https://www.npmjs.com/package/class-transformer)** giúp quá trình **validate** dữ liệu phức tạp trở nên đơn giản, tự động và dễ dàng tuỳ chỉnh, kế thừa hay mở rộng.   
Giả sử chúng ta có bài toán viết **API** đăng ký thông tin **user** như sau:  
```ts
// user.controller.ts
import { Controller, Post, ValidationPipe, Body, UsePipes } from '@nestjs/common'

class CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

@Controller('users')
export class UserController {
    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
      // ...
    }
}
```
Mặc định thì thì dữ liệu truyền vào chưa được **validate**, trước hết chúng ta sử dụng các **decorator** có sẵn từ thư viện **class-validator** trong **CreateUserDto**.  
```ts
// ...
import { IsEmail, IsNotEmpty, Match } from 'class-validator'

class CreateUserDto {
    @IsNotEmpty()
    first_name: string;
    
    @IsNotEmpty()
    last_name: string;
    
   @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)
    password: string;
}
// ...
```
Sau khi đã thiết lập các **rule** cho việc **validate**. **ValidatePipe** sẽ tự động sử dụng **CreateUserDto** để kiểm tra dữ liệu và trả về một **Bad Request** nếu như dữ liệu truyền vào không chính xác, giả sử với trường hợp **email** không đúng định dạng:
```
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["email must be an email"]
}
```

### III. Kết luận
Trong bài viết này mình đã giới thiệu về **Pipe** và một số trường hợp sử dụng **Pipe** trong ứng dụng **NestJS**. Để tìm hiểu kĩ hơn về **Pipe**, bạn có thể tham khảo hai đường link bên dưới:
* https://docs.nestjs.com/pipes
* https://docs.nestjs.com/techniques/validation