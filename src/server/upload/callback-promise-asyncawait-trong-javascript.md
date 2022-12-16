Xin chào mọi người, hôm nay mình sẽ giới thiệu về Callback, Promise, Async/Await trong JS, mong mọi người theo dõi

Trước khi tìm hiểu về Callback, Promise, Async/Await trong Javascript thì chúng ta sẽ đi qua một ví dụ sau:
Giả sử bạn cần xin số điện thoại của một người mình tạm gọi là bạn ABC từ người bạn của mình là bạn XYZ

**Ví dụ**

```js
const xinSdt = () => {
    let sdt;
    console.log('1 - Gọi điện cho thằnng bạn XYZ, cho tao xin số của thằng ABC');

    console.log('2 - XYZ đang tìm số của ABC cho bạn');
    
    // Giả sử thời gian tìm số  điện thoại của ABC mất khoảng 1s
    setTimeout(() => {
        sdt = 123456789;
        console.log('3 - XYZ đã tìm thấy số của ABC');
    }, 1000);

    console.log(`4 - Số điện thoại của ABC là ${sdt}`);
};

// Gọi hàm để xem kết quả
xinSdt();
```

**Kết quả:**

![](https://images.viblo.asia/d3141aad-7081-46b0-a55f-ba136c3002c9.png)


Như mọi người thấy thì trước thì thứ tự log ra nó đang là **1243** chứ không phải **1234**, vì sao lại  như vậy, là vì Javascript là một ngôn như đơn luồng và bất đồng bộ, như ở trong ví dụ trên thì trong code mình có setTimeout cho một đoạn code thì khi hàm xinSdt được thực thi thì nó sẽ không đợi phần mình setTimeout được chạy xong rồi nó mới chạy tiếp mà nó sẽ chạy xuống dưới luôn dẫn tới việc kết quả hiển thị ra là 1243, trong thực tế khi làm việc với JS thì sẽ rất nhiều lúc xẩy ra trường hợp này, ví dụ như khi bạn gọi một API nào đó thì do trong quá trình gọi sẽ mất một khoảng thời gian nào đó để server trả kết quả về thì lúc đó cũng xẩy ra trong hợp tương tự như trên
Để giải quyết được vấn đề này trên cho kết quả hiển thị về 1234 thì ta có thể dùng Callback, Promise, Async/Await

### 1) Callback

Callback function có thể được hiểu như sau: khi ta truyền một đoạn code (Hàm A) này vào một đoạn code khác (Hàm B). Tới một thời điểm nào đó, Hàm A sẽ được hàm B gọi lại (callback). Lý thuyết là vậy giờ chúng ta cùng đi vào ví dụ nhé

**Ví dụ 1**
Mình sẽ áp dụng callback vào ví dụ ở trên xem thử nó có như mong muốn của chúng ta không nhé
```js
const xinSdt = (callback) => {
    let sdt;
    console.log('1 - Gọi điện cho thằnng bạn XYZ, cho tao xin số của thằng ABC');

    console.log('2 - XYZ đang tìm số của ABC cho bạn');
    
    // Giả sử thời gian tìm số  điện thoại của ABC mất khoảng 1s
    setTimeout(() => {
        sdt = 123456789;
        console.log('3 - XYZ đã tìm thấy số của ABC');
        
        callback(sdt);
    }, 1000);
};

const hienThiSdtSauKhiNhan = sdt => console.log(`4 - Số điện thoại của ABC là ${sdt}`);

// Gọi hàm để xem kết quả
xinSdt(hienThiSdtSauKhiNhan);
```

Kết quả:
![](https://images.viblo.asia/195d6133-9625-4e8b-bc71-048416e8c811.png)

Giờ thì nó đã hiển thị ra đúng như ta mong muốn là **1234**

Trong đoạn code trên thì mình có tách phần hiển thị số điện thoại khi nhận được ra một hàm riêng sau đó mình truyền nó là một tham số của hàm **xinSdt** thì sau khi mà XYZ tìm được số điện thoại xong thì mới gọi đến hàm **hienThiSdtSauKhiNhan** thì mình sẽ không bị hiển thị sai kết quả nữa

Nếu mà Callback có thể xử lý được bất đồng bộ rồi thì người ta còn sinh ra Promise với Async/Await làm gì nữa, thì chúng ta sẽ đi vào ví dụ sau:

**Ví dụ 2**

Giả sử khi XYZ tìm được số điện thoại rồi nhưng mà điện thoại lại hết pin không thể báo lại được cho bạn nữa mà cần phải sạc pin xong mới gọi báo lại được cho mình

```js
const xinSdt = (sacPin) => {
    let sdt;
    console.log('Gọi điện cho thằnng bạn XYZ, cho tao xin số của thằng ABC')   ;

    console.log('XYZ đang tìm số của ABC cho bạn');

    // Giả sử thời gian tìm số  điện thoại của ABC mất khoảng 1s
    setTimeout(() => {
        sdt = 123456789;
        console.log('XYZ đã tìm thấy số của ABC')

        sacPin(sdt, hienThiSdtSauKhiNhan);
    }, 1000);
}

const sacPin = (sdt, hienThiSdtSauKhiNhan) => {
    console.log('Đang sạc Pin');

    setTimeout(() => {
        console.log('Pin đầy, XYZ bắt đầu gọi điện thoại cho bạn để báo số điện thoại');

        hienThiSdtSauKhiNhan(sdt);
    }, 2000);
}

const hienThiSdtSauKhiNhan = (sdt) => {
    console.log(`Đã nhận được số điện thoại của ABC là ${sdt}`);
}

xinSdt(sacPin);

```

Kết quả:

![](https://images.viblo.asia/ab9eb331-08d2-4f43-9c69-f49a9b63d8bd.png)


Trong ví dụ trên thì khi mà XYZ daxdd tìm được số điện thoại của ABC rồi định gọi điện cho bạn nhưng phát sinh hành động là điện thoại hết pin không thể gọi cho bạn, mà cần phải sạc pin xong mới gọi được cho bạn, giả sử trong quá trình gọi cho bạn mà lại phát sinh thêm các vấn đề khác thì lúc này code sẽ sẽ khá là rối và khó kiểm soát được trong trường hợp này người ta gọi là callback hell. Để code được nhìn dễ dàng hơn thì người ta đã snh ra Promise, vậy chúng ta cùng qua Promise xem xử lý thế nào nhé

### 2) Promise
- **Promise** là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell hay pyramid of doom, là tình trạng các hàm callback lồng vào nhau ở quá nhiều tầng.


Cú pháp

```js
const promise = new Promise(function(resolve, reject) {
  // Code here
});
```

Trong đó:

- Hàm được truyền vào **new Promise** gọi là **executor**.

- Ban đầu, **Promise** có **state** là **pending** và kết quả value là **undefined**. Khi executor kết thúc công việc, nó sẽ gọi đến 1 trong 2 hàm được truyền vào:

    - **resolve(value)**: để xác định rằng công việc đã thực hiện thành công

        - **state** chuyển thành **fulfilled**
        - kết quả là **value**

    - **reject(error)**: để xác định rằng đã có lỗi xảy ra

        - **state** chuyển thành **rejected**
        - kết quả là **error**

Giờ chúng ta sẽ sử dụng **Promise** để xử lý bài toán ở trên xem thế nào nhé

**Ví dụ**

```js
const xinSdt = () => {
    console.log('Gọi điện cho thằnng bạn XYZ, cho tao xin số của thằng ABC');
    console.log('XYZ đang tìm số của ABC cho bạn');

    // Giả sử thời gian tìm số  điện thoại của ABC mất khoảng 1s
    // phần tìm kiếm này mình sẽ sử dụng Promise

    const thaoTacTimKiem = new Promise((resolve, reject) => {
        // Giả sử là tìm thấy số điện thoại của ABC
        let daTimThaySdt = true;

        setTimeout(() => {
            if (daTimThaySdt) {
                sdt = 123456789;

                console.log(`XYZ đã tìm thấy số của ABC`);
                resolve(sdt);
            } else {
                reject('XYZ đã tìm và không có số điện thoại của ABC')
            }
        }, 1000);
    });

    return thaoTacTimKiem;
}

// Sac Pin
const sacPin = (sdt) => {
    console.log('Đang sạc Pin');

    // Giả sử sạc pin không bị hỏng
    let sacPinBiHong = false;

    // Phần sạc pin này mình sẽ sử dụng Promise
    const thaoTacSacPin = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!sacPinBiHong) { // Pin đã được sạc đầy
                console.log('Pin đầy, XYZ bắt đầu gọi điện thoại cho bạn để báo số điện thoại');

                resolve(sdt);
            } else {
                // Sạc pin bị hỏng

                reject('Sạc Pin bị hỏng rồi');
            }
        }, 2000);
    });

    return thaoTacSacPin;
}

const hienThiSdtSauKhiNhan = (sdt) => console.log(`Đã nhận được số điện thoại của ABC là ${sdt}`);

// Gọi hàm để xem kết quả

xinSdt()
    .then(sdt => {
        return sacPin(sdt);
    })
    .then((sdt) => hienThiSdtSauKhiNhan(sdt))
    .catch(error => {
        console.log(error);
    });
```

Kết quả:

![](https://images.viblo.asia/d6708900-9582-4af2-aa4b-4017de427149.png)

Khi áp dụng Promise vào thì ta thấy code sẽ dễ theo dõi và xử lý hơn

### 3) Async/await

- Được giới thiệu trong ES8
- Async/await là một cú pháp đặc biệt giúp bạn làm việc với Promise dễ dàng hơn. Khi sử dụng async/await, cấu trúc chương trình xử lý bất đồng bộ sẽ giống với chương trình xử lý đồng bộ hơn.

Giờ chúng ta sẽ sử dụng Async/await để xử lý bài toán trên xem thế nào nhé

**Ví dụ**

```js
const xinSdt = () => {
    console.log('Gọi điện cho thằnng bạn XYZ, cho tao xin số của thằng ABC');
    console.log('XYZ đang tìm số của ABC cho bạn');

    // Giả sử thời gian tìm số  điện thoại của ABC mất khoảng 1s
    // phần tìm kiếm này mình sẽ sử dụng Promise

    const thaoTacTimKiem = new Promise((resolve, reject) => {
        // Giả sử là tìm thấy số điện thoại của ABC
        let daTimThaySdt = true;

        setTimeout(() => {
            if (daTimThaySdt) {
                sdt = 123456789;

                console.log(`XYZ đã tìm thấy số của ABC`);
                resolve(sdt);
            } else {
                reject('XYZ đã tìm và không có số điện thoại của ABC')
            }
        }, 1000);
    });

    return thaoTacTimKiem;
}

// Sac Pin
const sacPin = () => {
    console.log('Đang sạc Pin');

    // Giả sử sạc pin không bị hỏng
    let sacPinBiHong = false;

    // Phần sạc pin này mình sẽ sử dụng Promise
    const thaoTacSacPin = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!sacPinBiHong) { // Pin đã được sạc đầy
                console.log('Pin đầy, XYZ bắt đầu gọi điện thoại cho bạn để báo số điện thoại');

                resolve(sdt);
            } else {
                // Sạc pin bị hỏng

                reject('Sạc Pin bị hỏng rồi');
            }
        }, 2000);
    });

    return thaoTacSacPin;
}

const hienThiSdtSauKhiNhan = (sdt) => console.log(`Đã nhận được số điện thoại của ABC là ${sdt}`);

// Gọi hàm để hiển thị kết quả

const hanhDong = async () => {
    try {
        const sdt  = await xinSdt();
        
        await sacPin(sdt);
        hienThiSdtSauKhiNhan(sdt);
    } catch (error) {
        console.log(error);
    }
}

hanhDong();
```

Kết quả:

![](https://images.viblo.asia/a8727e79-0b88-432b-83a4-47aacc6a3ece.png)

Nhìn vào logic ở trên ta thấy nó rõ ràng và mạch lạc hơn một chút so với Promise

**Lời kết**

Trên đây là một số kiến thức cơ bản về xử lý bất đồng bộ trong JavaScript với callback, promise và async/await chứ chưa đầy đủ về Promise hay async/await mà chỉ giúp bạn thấy được cách sử dụng cơ bản, cũng như ưu điểm của chúng so với việc sử dụng callback thông thường. các bạn có thể tiềm hiểu chi tiết hơn ở phía dưới. Cám ơn các bạn đã theo dõi

**Nguồn tham khảo**

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://javascript.info/promise-basics
- https://javascript.info/async-await