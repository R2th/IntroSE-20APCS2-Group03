<h1>Trường hợp mảng gồm các phần tử có kiểu dữ liệu primitive</h1>

javascript có 7 kiểu primitive là  string, number, boolean, undefined, null, symbol, bigint.

```javascript
    const input = [3, 5, 7, 9];
```
**1.** Dùng toán tử spread
```javascript
    const outputA1 = [...input];
```
**2.** Dùng slice không đối số
```javascript
    const outputA2 = input.slice();
```
:arrow_right: Đây là 2 cách tốt nhất, không những tối ưu về mặt hiệu năng mà cú pháp lại ngắn.

![](https://images.viblo.asia/e738c707-def4-4b08-afde-80e1d48fc448.png)


**3.** Một số cách khác
```javascript
    const outputA3 = [].concat(input);

    const outputA4 = Array.from(input);

    const outputA5 = input.map(x => x);
    const outputA6 = input.filter(() => true);
```
**4.** Sử dụng thư viện [lodash](https://lodash.com/)
```javascript
    const outputA7 = _.clone(input);
```
**5.** Không nên dùng `JSON.parse` &` JSON.stringify` để copy mảng chỉ chứa phần tử primitive
```javascript
    const outputA8 = JSON.parse(JSON.stringify(input));
```
Nó vẫn chạy và trả về kết quả như mong muốn nhưng không cần phải *"dùng dao mổ trâu giết gà"*. Cách này nên sử dụng để copy object hoặc mảng object.

____________________________________________________________________________________________________________________________________________________________________

Nhưng đời không như lý thuyết, thực tế rất ít trường hợp thao tác với mảng chỉ toàn kiểu dữ liệu primitive mà chỉ toàn thao tác với mảng object.

 <h1>Trường hợp mảng gồm các phần tử là object</h1>

```javascript
const input2 = [{ name: "tony", age: 18 }, { name: "lisa", age: 19 }]
```
Đối với mảng chứa các phần tử là object nếu sử dụng những cách bên trên thì mảng mới được tạo ra chỉ chứa địa chỉ ô nhớ của các phần tử trước đó. Những phần tử là object ban đầu (lưu trong heap) vẫn chỉ có 1, chỉ là địa chỉ ô nhớ của nó được copy mà thôi, trường hợp này gọi là **shallow copy**, dịch ra tiếng Việt là copy một phần, copy không hoàn toàn,... Đây là kiểu copy không không an toàn vì nó vẫn còn "lưu luyến" với object cũ, thay đổi thuộc tính của phần tử trong mảng mới lại khiến mảng cũ bị thay đổi theo vì cùng trỏ tới 1 object trong heap.

Để xử lý trường hợp này ta cần phải tìm giải pháp **deep copy** được hiểu như cách mà bạn đang kỳ vọng, copy theo đúng nghĩa đen, copy hoàn toàn một object, không liên quan gì đến mảng cũ cả.
________________

**1.** Sử dung hàm `structuredClone`, đây là nativeAPI phạm vi global có sẵn trong javascript hỗ trợ hầu hết mọi trình duyệt ngoài trừ Internet Explorer & Samsung Internet.

```javascript
const outputB1 = structuredClone(input2);
```
**2.** Đây mới là lúc sử dụng JSON.parse & JSON.stringify

```javascript
 const outputB2 = JSON.parse(JSON.stringify(input2));
```
**3.** Sử dụng lodash
```javascript
const outputB3 = _cloneDeep(input2);
```

<h1>Trường hợp copy object có thuộc tính là các object lồng nhau nhiều cấp</h1>

```javascript
const input3 = {
    name: "lisa",
    location: {
        province: {
            id: "HCM",
            name: "HCM City",
            zipCode: 700000
        }
    }
}
```

Đây là lúc thích hợp sử dụng `JSON.parse`/`JSON.stringify` như ưu tiên sử dụng `structuredClone` để giải quyết trường hợp này.

```javascript
const outputC1 = structuredClone(input3);
const outputC2 = JSON.parse(JSON.stringify(input3));
```
:arrow_right: Tóm lại **deep clone** object bằng `structuredClone` là cách chính thống nhất. `JSON.parse` & `JSON.stringify` trông có vẻ như một trick, mẹo vặt.
`JSON.parse`/`JSON.stringify` có nhược điểm là không thể copy object trong trường hợp thuộc tính của object đó là functions, undefined , Infinity , NaN, RegExps, Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Array, ...
__________________
Nếu bạn hiểu rõ cơ chế lưu data vào bộ nhớ stack, heap, nguyên lý phép gán, truyền tham chiếu, truyền tham trị, ... thì sẽ dễ dàng phân biệt được **shallow copy** và **deep copy**. Mình sẽ giải thích kỹ phần này ở post tiếp theo. Cái mà bạn nên quan tâm là phương pháp copy nào mang lại hiệu năng cao nhất, nhanh nhất khi xử lý một mảng khổng lồ mà API trả về, ví dụ như API này: https://finfo-api.vndirect.com.vn/v4/stock_prices?sort=date%3Adesc&q=floor%3AHOSE%2CHNX~type%3ASTOCK&fields=code%2Cdate%2Copen%2Chigh%2Clow%2Cclose%2CnmVolume%2Cchange%2CpctChange&size=100000&page=1