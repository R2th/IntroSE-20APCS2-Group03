![](https://images.viblo.asia/4464baa5-9d3b-4a8f-9375-e0b6125f46c1.png)

Trong [phần 1](https://viblo.asia/p/hook-android-native-phan-1-yZjJYjjpLOE) chúng ta đã tìm hiểu về cách hook vào hàm Native của một ứng dụng Android. Với 2 cấp độ hook thì chúng ta có thể lựa chọn cách hook thích hợp cho từng trường hợp. Tuy nhiên, kể cả khi hook trực tiếp vào phần code Native thì vẫn có những trường hợp chúng ta không hook vào được hàm chúng ta cần hoặc chưa đáp ứng được mục tiêu khi chúng ta thực hiện việc hook. Để giải quyết vấn đề này, mình sẽ giới thiệu thêm 3 kỹ thuật nữa có thể sử dụng khi hook vào phần code Native. Với 3 kỹ thuật này thì chắc chắn việc hook các hàm Native sẽ thoải mái hơn nhiều.

# 1. Tìm địa chỉ của hàm Native trong bộ nhớ
## 1.1. Base Address và Offset
Trong phần mình đã giới thiệu API **Module.getExportByName** để tìm kiếm hàm Native cần hook trong một thư viện, hoặc thực hiện tìm kiếm trên toàn bộ chương trình đang chạy. Tuy nhiên không phải lúc nào chúng ta cũng có thể tìm được đúng tên hàm, vì trong quá trình biên dịch thì code C/C++ có thể sẽ bị thay đổi một chút. Điều này có thể khiến tên hàm bị thay đổi, hoặc một số hàm có thể bị tối ưu dẫn đến "biến mất". Để xử lý vấn đề này thì thay vì cố gắng tìm xem hàm đó ở đâu, chúng ta sẽ chủ động xác định địa chỉ của hàm đó trong bộ nhớ.

![](https://images.viblo.asia/94a766f8-0f7f-476e-aa97-45f28289a171.jpg)

![](https://images.viblo.asia/bb56858c-3675-45d4-a587-d3fdff76b462.gif)

Khi một chương trình khởi động thì toàn bộ các dữ liệu, mã lệnh,... của nó sẽ được tải vào trong bộ nhớ của thiết bị. Hệ điều hành sẽ cấp cho chương trình một vị trí ở trên RAM. Bên trong bộ nhớ của thiết bị thì được chia thành các ô nhớ đều nhau. Mỗi chương trình sẽ được chỉ định một khu vực để tải vào bộ nhớ, khu vực này được đánh dấu với một **địa chỉ cơ sở - base address là địa chỉ của ô nhớ mà dòng lệnh đầu tiên trong chương trình được tải vào**.

![](https://images.viblo.asia/bc60f355-f7bc-45ce-b5b7-da59a702d5b9.png)

Các hàm, biến,... trong chương trình được đánh dấu bằng offset. **Offset có thể hiểu đơn giản là khoảng cách tính từ địa chỉ cơ sở tới ô nhớ** đó. Để tính được địa chỉ của 1 hàm trong bộ nhớ thì chúng ta chỉ cần lấy địa chỉ cơ sở cộng thêm giá trị offset của hàm đó, giá trị offset của 1 hàm sẽ không thay đổi sau khi mã nguồn Native được biên dịch thành thư viện có đuôi **.so**.

Không có quy tắc nào cho việc một chương trình sẽ được nạp vào địa chỉ nào trong bộ nhớ, do đó địa chỉ cơ sở sẽ thay đổi, dẫn đến địa chỉ các hàm trong mỗi lần chạy cũng sẽ thay đổi theo. Tuy nhiên offset của hàm không đổi, nên chỉ cần tìm được địa chỉ cơ sở của thư viện rồi cộng thêm giá trị offset vào địa chỉ đó là chúng ta sẽ có địa chỉ của hàm trong lần chạy chương trình đó.

## 1.2. API enumerateExports

API enumerateExports() cho phép chúng ta liệt kê toàn bộ các hàm được tải từ thư viện. Với mỗi hàm sẽ có rất nhiều thông tin để xem, nhưng mình chỉ cần theo dõi chủ yếu 2 thông tin là: tên hàm và địa chỉ trong bộ nhớ.

![](https://images.viblo.asia/63873a11-601a-49f1-9cea-ef3fd72c2ff6.png)

```javascript
var functionRealAddress;
Module.enumerateExports("libdemo_hook_native.so", { 
    onMatch: function(e) {
        console.log("[+] Function: " + e.name + " - Address: " + e.address);
    }, 
    onComplete: function() { 
    } 
});
```

Kết quả của API khi chạy sẽ trông như sau:

![](https://images.viblo.asia/73a33848-223e-45af-856e-d8e1ef699c58.png)

Nhược điểm mình chưa tìm được cách khắc phục là chúng ta phải tìm tên hàm bằng cơm. Cứ nhìn toét mắt ra thôi, mà không phải lúc nào tên hàm cũng sẽ đẹp như kia để chúng ta tìm ra. Đôi khi tên hàm sẽ bị làm rối đi, thường hay có đoạn **"Z..."** và còn có thể thêm vài đoạn loằng ngoằng ở sau nữa. Do đó việc tìm bằng cơm khá đau mắt.

Sau khi tìm được rồi thì chúng ta có thể sửa code đi, thay vì cho in hết ra thì chúng ta đặt vào một biểu thức điều kiện IF. Nếu tên hàm đúng như giá trị chúng ta mong muốn thì sẽ lưu lại địa chỉ của hàm để tiến hành hook về sau

```javascript
var functionRealAddress;
Module.enumerateExports("libdemo_hook_native.so", { 
    onMatch: function(e) {
        if (e.name == "Java_cyber_sunasterisk_demo_1hook_1native_MainActivity_stringFromJNI"){
            functionRealAddress = e.address;
        }
    }, 
    onComplete: function() { 
    } 
});
```

## 1.3. Lệnh nm
Lệnh **nm** là một lệnh tự động chạy debug được cài sẵn trên môi trường Linux và MacOS. Lệnh nm có thể cho chúng ta biết một hàm thuộc phân vùng mã nguồn nào, offset của hàm đó là gì,... Tuy nhiên, tương tự như khi sử dụng API enumerateExports, lệnh nm không phải lúc nào cũng chuyển được tên hàm về nguyên gốc ban đầu, chúng ta vẫn cần kiểm tra và xác định dựa theo kinh nghiệm.

![](https://images.viblo.asia/d0c258a9-ae6f-4d10-85e8-6c9f3c939169.png)

Để sử dụng lệnh nm thì chúng ta cần decompile file apk của ứng dụng bằng apktool trước. Việc này là để lấy được thư viện .so của ứng dụng. Sau đó chạy lệnh: ```nm --demangle --dynamic <đường-dẫn-tới-file-thư-viện>```

![](https://images.viblo.asia/c08212f1-2797-4b49-9638-4fa3739e958b.png)

Khi có được offset của hàm rồi thì chúng ta kết hợp với API `Module.findBaseAddress(<tên-module>) ` và `NativePointer.add(<offset>)` để tính toán ra địa chỉ thực tế của hàm trong lần chạy đó.

```javascript
var baseAddr = Module.findBaseAddress("libdemo_hook_native.so");
var FuncAddr = baseAddr.add(0x0000ca10);
Interceptor.attach(FuncAddr, {
    onEnter: function(args) {
        console.log('hooked in testString');
    },
    onLeave: function(retval) {
    }
});
```

## 1.4. API DebugSymbol.fromName
Trong trường hợp chúng ta đã có đá được Debug symbol (phần mình đã khoanh vàng trong ảnh ở phần 1.3) của một hàm (có thể là qua dịch ngược, lệnh nm, API enumerateExports,..) thì cũng có thể trực tiếp tìm ra địa chỉ của hàm đó mà không cần tìm offset và base address của thư viện. API DebugSymbol có khá nhiều hàm hữu ích để chúng ta có thể mày mò sử dụng. Việc sử dụng DebugSymbol.fromName chỉ là một trong số những hàm rất tiện lợi của nhóm API DebugSymbol mà thôi.

![](https://images.viblo.asia/78a65027-8df0-42dd-990f-ba10fe5b0817.png)

![](https://images.viblo.asia/7a57d75e-093b-49c2-b825-c92f1d729d05.png)

```javascript
var FuncAddr = DebugSymbol.fromName('_Z10testStringNSt6__ndk112basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE').address;
Interceptor.attach(FuncAddr, {
    onEnter: function(args) {
        console.log('hooked in testString');
    },
    onLeave: function(retval) {
    }
});
```

Chúng ta cũng có thể sử dụng API `DebugSymbol.findFunctionsMatching` để tìm kiếm theo regex debug symbol mong muốn như sau:

```javascript
console.log(DebugSymbol.findFunctionsMatching('*testString*'))
console.log(DebugSymbol.fromName('_Z10testStringNSt6__ndk112basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE').address)
```

![](https://images.viblo.asia/76b3d624-2341-4c07-8e13-e1cf58e94b95.png)

Như vậy chúng ta đã có trong tay 3 - 4 cách để tìm địa chỉ của hàm trong bộ nhớ khi ứng dụng hoạt động rồi. Bên cạnh những cách trên, chúng ta còn có thể tìm kiếm offset của hàm thông qua việc dịch ngược tệp tin .so bằng các công cụ như: ghidra, IDA, cutter,... Một số công cụ dịch ngược sẽ đặt địa chỉ cơ sở của tệp tin khác `00000000`, khi đó chúng ta cần trừ đi giá trị mặc định này, hoặc đặt lại địa chỉ cơ sở về `00000000`.

![](https://images.viblo.asia/b175d2da-4796-4821-a39d-9d41c1bc919b.png)

![](https://images.viblo.asia/b8cdb80d-9a93-4824-8e08-2a7f6a0c28bc.png)

![](https://images.viblo.asia/6000e331-27b1-43a0-b361-86cca8929867.png)

# 2. Hook thẳng vào địa chỉ hàm Native
API Interceptor.attach đã được mình đề cập đến ở phần 1 rồi, lần này chúng ta sẽ tìm hiểu sâu hơn về cách sử dụng của API này.

![](https://images.viblo.asia/5db11c45-7009-4560-9e8a-fdeee42d48cc.png)

API Interceptor.attach sẽ hook vào một đối tượng có kiểu dữ liệu là NativePointer. NativePointer về cơ bản là một con trỏ đến một ô nhớ trong bộ nhớ, do đó nó sẽ có dạng một chuỗi hex bắt đầu với 0x và đi theo sau là 8 ký tự 0-9a-z. Vậy về bản chất, chỉ cần chúng ta truyền vào Interceptor.attach một địa chỉ ô nhớ thì API này sẽ hook tới hàm nằm tại địa chỉ đó.

```javascript
var baseAddr = Module.findBaseAddress("libdemo_hook_native.so");
var FuncAddr = baseAddr.add(0x0000ca10);
Interceptor.attach(FuncAddr, {
    onEnter: function(args) {
        console.log('hooked in testString');
    },
    onLeave: function(retval) {
        console.log(Memory.readUtf8String(retval));
    }
});
```

{@embed: https://www.youtube.com/watch?v=ISlMV-f5nTI}

### Đen thôi đỏ quên đi
Khi chúng ta đã có địa chỉ hàm trong bộ nhớ rồi thì việc hook vào là gần như không trượt đi đâu được. Chỉ có một số trường hợp nhỏ vài hàm không thể hook vào được do chúng... không có gì. Có thể trong quá trình biên dịch, trình biên dịch kiểm tra và nhận thấy phần code của các hàm đó quá... đơn giản chẳng hạn. Khi này trình biên dịch sẽ tối ưu hoá mã nguồn, và điều này vô tình làm hàm đó trở thành 1 cái xác không. VD như mã nguồn gốc của ứng dụng demo mình gửi cho các bạn trong series này như sau:

![](https://images.viblo.asia/c7889eee-c0f7-4b2d-b307-7ae37206d095.png)

"Theo như mã nguồn trên thì kết quả chuỗi được tạo ra bởi hàm **testString** sẽ phụ thuộc vào kết quả của hàm **testInt**. Hàm testInt sẽ sinh ngẫu nhiên 1 số tự nhiên, sau đó cộng số này với giá trị được truyền vào hàm. Ở đây giá trị truyền vào hàm testInt đã được cố định là **1** => đoạn gọi hàm testInt(1) sẽ tương đương với việc hệ điều hành sinh ngẫu nhiên 1 số rồi cộng thêm 1. Mà hàm testInt cũng chỉ được gọi đúng bởi hàm testString, do đó trình biên dịch có thể đặt mã lệnh vào thẳng hàm testString luôn. Như thế đỡ tốn khoảng trống trong bộ nhớ cho 1 hàm mà hệ thống có thể tự xử lý sẵn." - theo như cách giải thích của những đàn anh mà mình đi hỏi thì là như vậy.

Do đó, nếu như chúng ta muốn chắc chắn hook đúng hàm có giá trị và hook được vào đó thì vẫn nên khởi đầu từ việc ném file vào các công cụ dịch ngược như IDA, ghidra,...

# 3. Thay đổi đối số truyền vào hàm Native
Kỹ thuật cuối cùng mình muốn giới thiệu là thay đổi đối số truyền vào hàm. Khi lời gọi hàm được thực thi thì các đối số cũng đã được truyền vào hàm luôn rồi. Trong event onEnter chúng ta chỉ có thể đọc được giá trị của các đối số truyền vào, với đối số truyền vào đầu tiên là **`args[1]`**, tiếp theo là **`args[2]`**, cứ thế lần lượt cho tới đối số cuối cùng. Mình đã thử thay đổi đối số ngay tại event onEnter nhưng không thành công. Hiểu đơn giản là: khi chúng ta hook được hàm thì gạo đã nấu thành cơm. Giờ làm sao biến được cơm thành gạo để đổi lượng cơm? Giải pháp có lẽ là nấu lại nồi mới thôi.

Vậy để "nấu lại nồi cơm mới" thì mình sử dụng phương pháp gọi thêm hàm đó 1 lần nữa. Ta gọi hàm hook được là hàm gốc do chương trình gọi, ký hiệu là A; chúng ta sẽ gọi lại đúng hàm này 1 lần nữa, nhưng lần này do chúng ta chủ động gọi hàm nên tất nhiên chúng ta có thể điều khiển giá trị truyền vào, hàm này sẽ được gọi là B.

Giải pháp là: trong event onLeave của A, chúng ta sẽ gọi hàm B với đối số truyền vào mới, khác với đối số đã truyền vào A. Sau đó thay thế retval - giá trị trả về của A bằng giá trị trả về của B. Như vậy quá trình biến A thành B đã hoàn tất.

```javascript
var baseAddr = Module.findBaseAddress("libdemo_hook_native.so");
var FuncAddr = baseAddr.add(0x0000ca70);
var testString = new NativeFunction(ptr(FuncAddr), 'pointer', ['pointer']);
Interceptor.attach(FuncAddr, {
    onEnter: function(args) {
        console.log('hooked in testString');
        console.log('- Args: ' + Memory.readUtf8String(args[1]));
    },
    onLeave: function(retval) {
        const strArg = Memory.allocUtf8String(" Hooked...");
        console.log(testString(strArg).readUtf8String());
    }
});
```

{@embed: https://www.youtube.com/watch?v=ID0c4SWyPYM}

Điểm cần chú ý trong phần script trên là cách gọi hàm bằng API của Frida. Để gọi hàm chúng ta sẽ dùng API **NativeFunction**. API này nhận vào 3 giá trị, lần lượt là:
- Địa chỉ của hàm muốn gọi. Đây là một giá trị kiểu NativePointer.
- Kiểu giá trị trả về.
- Kiểu và số lượng tham số cần thiết, được đặt trong một mảng, số phần tử của mảng tương ứng với số lượng tham số của hàm.

Danh sách các kiểu biến được hỗ trợ có thể đọc thêm tại [tài liệu của Frida về NativeFunction](https://frida.re/docs/javascript-api/#nativefunction).

![](https://images.viblo.asia/b8a8e719-3411-4115-b5e9-849a4b30de0e.png)

-----

Tới đây đã khép lại series bài viết về Hook Android Native của mình. Trong tương lai, nếu như học được thêm kỹ thuật gì mới thì chắc là mình sẽ viết phần 3. Mong là nếu có thì không bị cao su tận 2 năm.

Nếu gặp bất cứ vấn đề gì, hãy bình luận xuống phía dưới để chúng ta cùng thảo luận nhé. Cảm ơn mọi người đã đọc bài viết của mình, nếu thấy hữu ích thì đừng quên ấn mũi tên upvote để ủng hộ mình, bấm biểu tượng bookmark để lưu lại bài viết rồi sau này có thể đọc lại, và theo dõi luôn tài khoản của mình để được thông báo về các bài viết mới trong tương lai nhé.