![](https://images.viblo.asia/11ee6bf1-4eae-4699-9f4e-cf9a53429214.png)

Bắt đầu luôn nào (quaylen)

## 1.Spread operator 

Sử dụng dấu 3 chấm `...` để triển khai các phần tử bên trong một hàm cũng như một đối tượng.

Công thức này rất đơn giản, trực quan

**Ví dụ:**

Nếu như bạn muốn show hết danh sách món ăn ưa thích mà không được tạo vòng lặp, đây chính là giải pháp chất lượng nhất rồi ^_^: 

```
const favoriteFood = ['Pizza', 'Fries', 'Swedish-meatballs'];
console.log(...favoriteFood);

// Pizza Fries Swedish-meatballs
```

## 2. Sử dụng `for...of` trong vòng lặp

Cấu trúc `for...of` sử dụng vòng lặp thông qua collection, và cung cấp cho bạn khả năng chỉnh sửa item đã xác định. Nó chắc chắn sẽ thay thế được cách truyền thống như `for...loop`

Cách này giúp code dễ đọc, sạch sẽ, trực quan sinh động. 

**Ví dụ:**

Bây giờ bạn đang có một hộp dụng cụ (toolbox), bạn muốn show tất cả các công cụ bên trong, `for...of` sẽ làm nó trở nên dễ dàng hơn

```
const  toolBox = ['Hammer', 'Screwdriver', 'Ruler'];

for(const item of toolBox){
    console.log(item)
}

// Hammer
// Screwdriver
// Ruler
```

## 3. Hàm `includes()`

Hàm này có nhiệm vụ kiểm tra sự tồn tại của đoạn string trong collection, nếu tồn tại return true, nếu không tồn tại thì return false

Có một điều cần lưu ý là: nếu trong collection có từ `SCHOOL`, và bạn search từ `school`, hàm này sẽ trả về `false`

**Ví dụ:**

Giả sử bạn có một hệ thống quản lý xe riêng trong garage, bạn muốn kiểm tra xem nó có còn trong garage không hay ai vợ bạn lấy đi chợ mất rồi. Hãy để việc đấy chó `includes`

```
const garage = ['BMW', 'AUDI', 'VOLVO'];

const findCar = garage.includes('BMW');
console.log(findCar);

// true
```

## 4. Hàm `some()`

Hàm `some()` cũng kiểm tra sự tồn tại trong mảng, trả về true nếu tồn tại và ngược lại sẽ trả về false. Nghe qua có vẻ giống hàm `includes()` bên trên, nhưng đối số của hàm `some()` này là `function` không phải string như hàm `includes()` bên trên

**Ví dụ:**

Bạn là chủ của quán club, bạn muốn đảm bảo trong số khách hàng của mình phải có người trên 18 tuổi, còn lại lợi nhuận là trên hết  :v 

ES5:
```
const age = [16, 14, 18];

age.some(function(person){
    return person>=18
});

// true
```

ES6:
```
const age = [16, 14, 18];
age.some((person) => person>=18);

// true
```

## 5. Hàm `every()`

Hàm `every()` sử dụng vòng lặp trong mảng, kiểm tra mọi phần tử, và trả về giá trị `true`, `false`. Nghe qua lại thấy giống hàm `some()`, nhưng nó có một điểm khác biệt là tất cả các phần tử trong mảng đều phải thỏa mãn điều kiện, nếu có một và chỉ một phần tử không thỏa mãn, kết quả sẽ là `false`

**Ví dụ:**

Bạn là cảnh sát và muốn kiểm tra một club nọ tất cả mọi người có đủ 18+ chưa, bạn nên sử dụng `every()` ngay:

ES5:

```
const age = [15, 20, 19];

age.every(function(person){
    return person >= 18;
});

// false
```

ES6:

```
const age = [15, 20, 19];
age.every((person) => person >=18);

//false
```

## 6. Hàm `filter()`

Hàm `filter()` tạo một mảng mới với các phần tử thỏa mãn điều kiện của nó.

Với `filter()`, ta có thể lấy được các phần tử cần thiết và tránh được việc thay đổi mảng ban đầu.

**Ví dụ:**

Bạn đi shopping với mẹ và mẹ bạn không muốn món đồ quá 30$. Vậy nên, mình giới thiệu bác nên sử dụng hàm `filter()`

ES5:

```
const prices = [25, 30, 15, 55, 40, 10];

prices.filter(function(price){
    return price >= 30;
});

// [30, 55, 40]
```

ES6:

```
const prices = [25, 30, 15, 55, 40, 10];
prices.filter((price) => price >= 30);

// [30, 55, 40]
```

## 7. Hàm `map()`

Hàm `map()` tương tự như hàm `filter()` là việc tạo ra một mảng mới. Chỉ khác là nhiệm vụ chính của hàm `map()` là thay đổi giá trị phần tử.

**Ví dụ:**

Bạn có một list giá cố định của từng sản phẩm. Vậy, sau khi safe off 25%, list giá kia thay đổi như thế nào, sử dụng `map()` ngay và luôn nào:

ES5:

```
const productPriceList = [200, 350, 1500, 5000];

productPriceList.map(function(item){
    return item*0.75;
});

// [150, 262.5, 1125, 3750]
```

ES6: 

```
const productPriceList = [200, 350, 1500, 5000];
productPriceList.map((item) => item*0.75);

// [150, 262.5, 1125, 3750]
```

Đây cũng là phần cuối của bài viết và cũng hết 8p rồi, cảm ơn mọi người đã quan tâm theo dõi. 
Hi vọng bài viết giúp ích cho bạn trên con đường trờ thành master javascripts (bye)(bye)

## Tài liệu tham khảo
https://medium.freecodecamp.org/7-javascript-methods-that-will-boost-your-skills-in-less-than-8-minutes-4cc4c3dca03f