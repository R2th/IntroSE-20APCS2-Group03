**I. Khái niệm**

`Pipes` là một API trong `NestJS`. `Pipes` có cấu trúc là một class được annotated với @Injectable() decorator, và implement từ  `PipeTransform`  interface.

`Pipes` được sử dụng trong 2 trường hợp:

- *transformation:* Chuyển đổi dữ liệu đầu vào thành dạng mong muốn.(vd: dữ liệu đầu vào là string của một integer, thì được chuyển sang integer).

- *validation:* Kiểm tra dữ liệu đầu vào, nếu không thỏa mãn thì báo lỗi.

Trong 2 trường hợp trên: `Pipes` hoạt động dựa vào đối số đầu vào(agruments) được xử lý bởi [controller route handler](https://docs.nestjs.com/controllers#route-parameters). 

Từ đó có thể thấy! Khi một method được gọi `Pipes` sẽ chạy trước. Nó sẽ nhận toàn bộ các đối số đầu vào của method và hoạt động trên chúng.
Khi đó, bất kỳ hoạt động *transformation* hay *validation* nào của `Pipes` đối với các đối số đầu vào cũng sẽ ảnh hưởng đến dữ liệu đầu vào của method.

- NestJS có sẵn một số built-in pipes mặc định cho bạn sử dụng. Ngoài ra, ta cũng có thể customer một `Pipes`

**II. Built-in pipes**

Như đã nói ở trên *NestJS có sẵn một số built-in pipes mặc định cho bạn sử dụng.*

Gói `Built-in pipes` này bao gồm một số method mặc định được exported từ `@nestjs/common package`:

- `ValidationPipe`
- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`

**III. Ví dụ về  trường hợp sử dụng `Built-in pipes` cơ bản để  `transformation` và `validation`**

Giả sử một trường hợp cơ bản: ta cần viết một API trả về thông tin của một User, API có thể được triển khai như sau:
```
// user.controller.ts

@Get(':id')
async findUserById(@Param('id') id: number) {
    return this.userServics.findOne(id)
}
```
Trong ví dụ trên, mặc định id nhận về từ params trong request sẽ không tồn tại ở dạng number mà sẽ ở dạng string, chúng ta cần chuyển đổi id sang dạng number để đảm bảo ham findUserById trả về đúng kết quả. Chúng ta có thể viết một Pipe cho trường hợp này.
```
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
Trong ví dụ trên, chúng ta thực hiện cùng lúc 2 vai trò của Pipe, đó là chuyển đổi và kiểm tra dữ liệu đầu vào, Pipe sẽ trả về error trong trường hợp kết quả truyền vào không thoả mãn, thường sẽ là một Http error và sẽ được gửi ngay về client. Lưu ý kết quả thực thi một pipe luôn phải được thực hiện bên trong phương thức transform.
Sau khi đã khai báo Pipe, chúng ta sẽ sử dụng bên trong hàm xử lý API ở trên như sau.
```
import { ParseDataToIntPipe } from './parse-to-string.pipe.ts'

@Get(':id')
async findUserById(@Param('id', ParseDataToIntPipe) id: number) {
    return this.userServices.findOne(id)
}
```

**Nguồn**

[https://docs.nestjs.com/pipes](https://docs.nestjs.com/pipes)