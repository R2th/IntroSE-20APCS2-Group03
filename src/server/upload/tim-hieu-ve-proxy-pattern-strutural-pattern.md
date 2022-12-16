Bài viết đầu tiên của mình trên Viblo, lí do mình viết bài này do các bài viết về Proxy Pattern còn khá ít và giải thích khá khó hiểu. Bản thân bài viết này cũng được biên soạn lại từ một bài viết khác trên Viblo theo cách hiểu của mình cho ngắn gọn dễ hiểu hơn và có tham khảo một số thông tin bên ngoài. Mong các bạn ủng hộ và cập nhật cho mình nếu có lỗi sai. Xin cảm ơn.

*Ngôn ngữ ví dụ trong bài viết này mình sẽ sử dụng Typescript*
## Proxy
> Proxy cung cấp một class ảo đứng trước class thực sự mà chúng ta muốn làm việc để xử lí, tăng thêm tính bảo mật và cải thiện performance cho hệ thống khi xử lí dữ liệu liên quan đến class mà chúng ta làm việc

### 1. Khi nào nên sử dụng Proxy Pattern?
- Khi muốn thêm một số bước bảo mật, quản lí sự truy cập/truy xuất dữ liệu ra vào đối tượng
- Linh hoạt cách truy xuất/truy cập dữ liệu (Lazy Loading,...)

### 2. Các loại ứng dụng của Proxy Pattern
- **Remote Proxy**: Cung cấp một đại diện cho object nhưng nằm trong 1 địa chỉ khác
- **Virtual Proxy**: Áp dụng cho các dữ liệu tốn nhiều chi phí khởi tạo, loại proxy này cung cấp các phương pháp lấy dữ liệu linh hoạt, chỉ thực sự khởi tạo/truy xuất dữ liệu khi được người dùng yêu cầu thay vì khởi tạo dữ liệu từ đầu. Một số ứng dụng như Lazy Loading,...
- **Protective Proxy**: Kiểm soát quyền truy cập vào object gốc. Loại proxy này tạo thêm các hàng rào kiểm soát nhằm đảo bảo bảo mật cho object
- **Smart Proxy**: Bổ sung thêm các hành động, phần mở rộng khi truy cập/truy xuất dữ liệu trong đối tượng
### 3. Cấu trúc
![](https://images.viblo.asia/1067fe3e-79e8-483b-a0f6-7c1fc9e665ea.png)

##### Các đối tượng tham gia vào Proxy Pattern:
- **Subject**: Interface giữ vai trò tạo xương sống cho **RealSubject** (đối tượng thực sự) và **Proxy**
- **RealSubject**: Đối tượng thực sự mà người dùng làm việc
- **Proxy**: Triển khai xương sống từ **Subject** và là class đứng trước (đại diện) **RealSubject** nhằm thực hiện các tiền/hậu xử lí, bảo mật cho **RealSubject**. Proxy duy trì một tham chiếu đến đối tượng của **RealSubject** nhằm truy cập/truy xuất dữ liệu

### 4. Ví dụ
- Tạo interface **IItem** và class **Item** triển khai interface đó
- **Item** là một class không tốn nhiều chi phí khởi tạo đối tượng nhưng giá trị **content** bên trong Item lại tốn nhiều chi phí khởi tạo (tưởng tượng rằng mỗi khi muốn lấy giá trị content thì phải request lên server để lấy giá trị, điều đó gây nên chi phí, thời gian kết nối đến server, có thể xem đối tượng IItem là index/id của giá trị content)
```js
interface IItem {
    delaytoResponseContent(): Promise<number>;
    content: number;
}

class Item implements IItem {
    // Giá trị của content nằm trên server
    protected _content: number = Math.round(Math.random() * 10);
    get content() {
        return this._content;
    }
    set content(n: number) {
        this._content = n;
    }
    
    // Trả về giá trị của content mất nhiều chi phí
    async delaytoResponseContent() : Promise<number> {
        await this.sleep(1000);
        return this.content;
    }
    
    // Tạo chi phí kết nối
    sleep(ms: number) {
        return new Promise((resolve) =>
            setTimeout(resolve, ms)
        )
    }
}
```
- Tạo interface **Subject** và class **RealSubject**, **Proxy**
```js
interface Subject {
    data: Array<IItem>;
    Request(index: number): any;
}

class RealSubject {
    constructor(private _data: Array<IItem>) { }
    get data() : Array<IItem> {
        return this._data;
    }

    Request(index: number) : Promise<number> {
        return this.data[index].delaytoResponseContent();
    }
}

class SubjectProxy implements Subject {
    // Khai báo cho đúng cấu trúc nhưng không sử dụng
    data!: Array<IItem>;
    // Duy trì một kết nối đến RealSubject để xử lí dữ liệu
    private realSubject!: RealSubject;

    // Kết nối đến host thông qua RealSubject
    constructor(data: Array<IItem>) {
        this.realSubject = new RealSubject(data);
    }

    // - Ghi đè lại phương thức Request
    // - Thay vì lấy về giá trị content mất nhiều chi phí
    //   thì ta chỉ lấy về index/id của giá trị đó
    // - Khi nào người dùng cần giá trị content thì mới
    //   sử dụng phương thức delaytoResponseContent để
    //   lấy giá trị content về
    Request(index: number) : IItem {
        return this.realSubject.data[index];
    }
}
```
- Tạo một host giả có chứa và index Item
```js
// Tạo một host giả có chứa content và index Item
let data : Array<IItem> = [
    new Item(),
    new Item(),
    new Item(),
    new Item(),
    new Item(),
    new Item(),
];
```
- Khi không sử dụng Proxy. Giả sử đường truyền yếu chỉ có thể tại được 1 content 1 lần và ta phải tải hết dữ liệu về để hiển thị trong khi người dùng muốn xem dữ liệu thứ 4 trước tiên
```js
let realSubject = new RealSubject(data);
(async () => {
    let wanted : number = 3;
    for(let i = 0; i < 5; i++) {
        await realSubject.Request(i).then(
            res => {
                if(i!=wanted)
                    console.log("Result: "+res)
                else
                    console.log("Wanted result: "+res)
            }
        );
    }
})();
```
- Kết quả khi không dùng Proxy
```js
Result: 4
Result: 5
Result: 5
Wanted result: 4
Result: 9
```
- Khi sử dụng Proxy và ứng dụng Lazy Loading (Virtual Proxy). Dữ liệu cần thiết sẽ được tải trước, các dữ liệu còn lại sẽ được tải sau
```js
let proxy = new SubjectProxy(data);
(async () => {
    let wanted : number = 3;
    let results : Array<IItem> = new Array<IItem>();
    for(let i = 0; i < 5; i++) {
        results.push(proxy.Request(i));
        if(i==wanted)
            results[i].delaytoResponseContent()
                .then(res => console.log("Wanted result via proxy: "+res));
    }
    for(let i = 0; i < 5; i++)
        if(i!=wanted)
            results[i].delaytoResponseContent()
                .then(res => console.log("Result via proxy: "+res))
})();
```
- Kết quả khi sử dụng Proxy
```js
Wanted result via proxy: 1
Result via proxy: 0
Result via proxy: 7
Result via proxy: 2
Result via proxy: 1
```
- Ngoài ra ta có thể cài đặt thêm các tính năng bảo mật, kiểm tra lỗi cho proxy để tăng tính bảo mật hơn cho hệ thống (Smart Proxy)

### 5. So sánh với pattern cùng loại (Structural Pattern)
Ta có thể thấy Proxy Pattern khá giống với **Adapter Patern** và **Decorator Pattern** nên ta cần phân biệt chúng:
- Khác với **Adapter Pattern**: Thông thường mẫu Adapter cung cấp một giao diện khác với đối tượng gốc, còn Proxy cung cấp cùng một giao diện giống như đối tượng gốc
- Khác với **Decorator Pattern**: Có thể cài đặt tương tự như Proxy, nhưng Decorator được dùng cho mục đích khác. Decorator bổ sung thêm nhiều nhiệm vụ cho một đối tượng nhưng ngược lại Proxy điều khiển truy cập đến một đối tượng. Proxy tuỳ biến theo nhiều cấp khác nhau mà có thể được cài đặt giống như một Decorator:
    - **Protection Proxy, Smart Proxy**: Có thể được cài đặt như một Decorator
    - **Remote Proxy**: Sẽ không tham chiếu trực tiếp đến đối tượng thực sự tham chiếu gián tiếp, giống như ID của host và địa chỉ trên host vậy
    - **Virtural Proxy**: Tham chiếu gián tiếp chẳng hạn như tên file, index và sẽ tham chiếu trực tiếp khi cần thiết
___
*Biên soạn lại từ một bài viết khác trên Viblo: [https://viblo.asia/p/design-patterns-proxy-pattern-OeVKBR8rKkW](https://viblo.asia/p/design-patterns-proxy-pattern-OeVKBR8rKkW)*

*Tham khảo: [https://viblo.asia/p/tim-hieu-ve-proxy-pattern-va-ung-dung-yMnKMyQgK7P](https://viblo.asia/p/tim-hieu-ve-proxy-pattern-va-ung-dung-yMnKMyQgK7P)*