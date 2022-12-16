Class và Inteface là hai cấu trúc mạnh mẽ không chỉ trong lập trình hướng đối tượng mà còn type - checking trong TypeScript . Từ một Class chúng ta có thể tạo ra các Object có cùng cấu trúc  phương thức và các thuộc tính . Một Interface là một nhóm thuộc tính phương thức liên mô tả một Object nhưng không triển khai hoặc khởi tạo giá trị cho chúng.

Class và Interface đều dùng để xác định thành phần cấu trúc của một Object , trong TypeScript cả hai đều có thể được sử dụng. Để quyết định sửa dụng Class hay Interface thực sử phụ thuộc vào từ trường hợp của chúng ta.

### Sử dụng TypeScript Class 

Chúng ta có thể sử dụng class như một Object . Một Class định nghĩa một Object trong như thế nào , các hành động và thực hiện khởi tạo một Class và các phương thức . Chúng ta nhận được một Object có các chức năng , hành động mà các thuộc tính đã được xác định. 

1.  Oke  giờ bạn hãy nhìn và một định nghĩ Class `ShippingInfo` ở dưới đây nhé .
```Javascrip
export class ShippingInfo {

    public driverInfo: string;

    public driverDeviceId: string;

    public invoiceNo: string;
    
    public total: number;

}
```

`ShippingInfo` là một Class đơn giản nó khởi tạo một Object có các thuộc tính như `driverInfo`  `driverDeviceId` `invoiceNo` `invoiceNo` .

2. Bây giờ tử hỏi làm sao để chúng ta có thể sử dụng được class `ShippingInfo` nhỉ ?

Rất đơn giản chúng ta chỉ cần tạo một Object bằng new `ShippingInfo`  nghĩa là bây giờ bạn đã khởi tạo một Object `shipInfo` có đầu đủ các thuộc tính, hành động của `ShippingInfo` chúng ta tạm xem `shipInfo`   như một bản sao của `ShippingInfo`. 
```
const shipInfo= new ShippingInfo() ;
```

3. Và tự hỏi vậy bây giờ muốn khởi tạo giá trị cho Object `shipInfo` phải làm sao nhỉ ?
 
 Khi bạn đã thự hiện `new ShippingInfo()` giờ đây bạn muốn khởi tạo giá trị của shipInfo bạn chỉ cần thực hiện : 
 
```
 shipInfo.driverInfo = 'Sách lập trình';
  shipInfo.driverDeviceId = 1;
  shipInfo.invoiceNo = 2 ;
   shipInfo.total = 500.000 ;
```
vậy là chúng ta đã khởi tạo giá trị cho Object `shipInfo` bạn có thể khởi tạo các thuộc tính ít hơn  `ShippingInfo` nhưng sẽ không thể khởi tạo nhưng thuộc tính mà  `ShippingInfo` không có.
 
 Vậy bây giờ có có trường hợp dữ liệu api trả về quá nhiều vậy nếu chúng ta gán từng thuộc tính vậy sao ??? ôi không giờ chúng ta chỉ cần thực kiện kiểm tra kiểm dữ liệu và gán chúng lại với nhau là xong rồi !!!
 
 Mình ví dụ đây là dữ liệu server trả về cho bạn vậy làm thế nào để bạn gán nó với `ShippingInfo`.
 ```
 export class ShippingInfoService {
    private data: ShippingInfo;
   
    constructor( ) { }
    public getData(): ShippingInfo {
        return this.data;
    }

 ```
 
  ```
   shippingInfo: ShippingInfo;
    ngOnInit() {
        this.shippingInfo = this.shippingInfoService.getData();
        }
   ```

vậy là bây giờ dự liệu trả về từ server đã được gán cho class `shippingInfo` vậy là giờ bạn có thể sử dụng Object `shippingInfo` bất kì đâu để load dữ liệu ra view.

4. Bây giờ chúng ta muốn can thiệp thay đổi dự liệu server trả về thì phải làm thế nào ?

```Javascrip
export class ShippingInfo {

    public driverInfo: string;

    public driverDeviceId: string;

    public invoiceNo: string;
    
    public total: number;

   get changeTotal(): number{
   
    return this.total * 2;
    
   }
   
}
```

vậy là dữ liệu của bạn đã được thay đổi bằng cách sử dụng class thì chúng ta có thể dễ dàng thực hiện những hành động xử lý dữ liệu mà chúng ta muốn .

5.  Trong trường hợp bây giờ chúng ta muốn thêm thuộc tính " tên người giao hàng " vào Object  `ShippingInfo` thì phải làm thế nào ?

```Javascrip
export class ShippingInfoEx extends ShippingInfo {

    public deliverName: string;
    
}
```

và bây giờ bạn đã có một class `ShippingInfoEx` kế thừa từ `ShippingInfo` và có thêm thuộc tính `deliverName`