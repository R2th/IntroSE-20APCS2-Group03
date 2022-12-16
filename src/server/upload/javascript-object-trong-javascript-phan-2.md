Chào các bạn, mình có 1 vấn đề như ví dụ sau :
```
    // Khai báo Object objA có Object nested là a
    const objA = { ten:'Tam'}
    
    // gán objB bằng với objA
    const objB = objA;
    
    // thay đổi property Object của objA
    objA.ten = 'Nguyen';
    
    // kiểm tra kết quả thu được của objA
    console.log('objA',objA);

    // kiểm tra kết quả thu được của objB
    console.log('objB',objB);
```

Các bạn sẽ thấy vấn đề khi chạy đoạn **code** trên, **objB** cũng bị thay đổi theo **objA**, mình sẽ không giải thích lại lý do vì sao lại như vậy, bạn đọc lại trong [[JavaScript] Value và Reference trong Javascript
](https://viblo.asia/p/javascript-value-va-reference-trong-javascript-YWOZr6BrZQ0) nếu chưa hiểu vấn đề nhé. 

# Copy Object trong Javascript #
Trong [[JavaScript] Value và Reference trong Javascript](https://viblo.asia/p/javascript-value-va-reference-trong-javascript-YWOZr6BrZQ0), thì các bạn đã biết, **Array** và **Object** đều là **kiểu dữ liệu phức hợp**, nên mình sẽ làm việc với **Object** cho nhanh, ta sẽ có 2 kiểu **copy** dữ liệu :

## Shallow copy ##
**ý nghĩa rằng sau khi copy, biến mới hoặc các thành phần của biến mới vẫn còn quan hệ dây mơ rễ má với biến ban đầu.**

**Ví dụ :**
```
    // Khai báo Object objA có Object nested là a
    const objA = { ten:'Tam'}
    
    // đây được gọi là Shallow copy
    const objB = objA;
    
    // thay đổi property Object của objA
    objA.ten = 'Nguyen';
    
    // kiểm tra kết quả thu được của objA
    console.log('objA',objA);

    // kiểm tra kết quả thu được của objB
    console.log('objB',objB);
```
Theo mình thì, **objB** được **copy** từ **objA** nó vẫn sẽ có **reference** ( Tham chiếu vùng nhớ ) giống như nhau, chứ không hề tạo ra **reference** mới,  nguy hiểm quá nhỉ, 

và còn nguy hiểm hơn nữa là nếu làm việc với **ReactJs** bạn rất dễ gặp tình trạng thay đổi **state** của **component** mà **component** không **render** lại.

## Deep copy ##
**Tạm dịch là sao chép sâu nhỉ, khi sử dụng cách này, thì 2 Object sẽ không còn dây mơ rễ má gì với nhau nữa cả, Object được copy sẽ có  reference mới và khác với Object nguồn .**

### Object.assign() ###
Bạn có thể tham khảo [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), để hiểu thêm về nó 

Đây là một cách dùng phổ biến trước khi **Spread operator** được phát minh ra, cũng cho ra kết quả tương tự. Nhưng lưu ý, các thành phần của **đối số đầu tiên** vẫn có thể thay đổi được, thế nên **Object** cần **copy** nên ở **đối số thứ 2** trở đi, bạn có thể **assign Object** cần **copy** với một **Object** rỗng **{}**, đây là các thường dùng.

```
// Khai báo Object objA
const objA = { ten:'Tam'}

// mình sử dụng Object.assign, và đây được gọi là Deep copy
const objB = Object.assign({},objA)

// thay đổi property Object của objA
objA.ten = 'Nguyen';

// kiểm tra kết quả thu được của objA
console.log('objA',objA);

// kiểm tra kết quả thu được của objB
console.log('objB',objB);
```

Kết quả trả về sẽ 2 **Object** khác nhau hoàn toàn, 
- nhưng đối với trường hợp **nested Object** (Object con lồng bên trong Object lớn), thì sao nhỉ, cùng làm ví dụ và kiểm tra nào :
```
// Khai báo Object objA có Object nested là a
const objA = { ten:{ nestedA:'Tâm' } }

// mình sử dụng Object.assign, và đây được gọi là Deep copy
const objB = Object.assign({},objA)

// thay đổi property Object nested của objA
objA.ten.nestedA = 'Nguyen';

// kiểm tra kết quả thu được của objA
console.log('objA',objA);

// kiểm tra kết quả thu được của objB
console.log('objB',objB);
```

**Vậy kết luận, Với cách Object.assign(), các Properties ở lớp đầu tiên của Object gốc đều được copy sang giá trị với tham chiếu mới, nhưng các nested Object bên trong vẫn tham chiếu tới cùng 1 chỗ.**

### Spread operator ###
**Spread operator** (Toán tử 3 chấm) là một điều tuyệt vời của **ES6**, bạn có thể sử dụng nó để** deep copy** một **Object** như ví dụ :


```
// Khai báo Object objA 
const objA = { ten:'Tam'}

// mình sử dụng Spread operator, và đây được gọi là Deep copy
const objB = {...objA}

// thay đổi property Object của objA
objA.ten = 'Nguyen';

// kiểm tra kết quả thu được của objA
console.log('objA',objA);

// kiểm tra kết quả thu được của objB
console.log('objB',objB);
```
Kết quả trả về sẽ 2 **Object** khác nhau hoàn toàn, 
- nhưng đối với trường hợp **nested Object** (Object con lồng bên trong Object lớn), thì sao nhỉ, cùng làm ví dụ và kiểm tra nào :
```
// Khai báo Object objA có Object nested là nestedA
const objA = { ten:{ nestedA:'Tâm' } }

// mình sử dụng Spread operator, và đây được gọi là Deep copy
const objB = {...objA}

// thay đổi property Object nested của objA
objA.ten.nestedA = 'Nguyen';

// kiểm tra kết quả thu được của objA
console.log('objA',objA);

// kiểm tra kết quả thu được của objB
console.log('objB',objB);
```

**Vậy kết luận, Với cách Spread operator, các Properties ở lớp đầu tiên của Object gốc đều được copy sang giá trị với tham chiếu mới, nhưng các nested Object bên trong vẫn tham chiếu tới cùng 1 chỗ.**

### JSON.parse(JSON.stringify(object)); ###
Cách này chúng ta dùng hàm **JSON.stringify()** biến nó thành **JSON**, lúc đó nó sẽ không liên quan gì đến cái **Object** gốc cả, sau đó lại **parse** lại thành **Object** bằng hàm **JSON.parse()**.

```
// Khai báo Object objA
const objA = { ten:'Tam'}

// mình sử dụng JSON.parse, và đây được gọi là Deep copy
const objB = JSON.parse(JSON.stringify(objA));

// thay đổi property Object của objA
objA.ten = 'Nguyen';

// kiểm tra kết quả thu được của objA
console.log('objA',objA);

// kiểm tra kết quả thu được của objB
console.log('objB',objB);
```
Kết quả trả về sẽ 2 **Object** khác nhau hoàn toàn, 
- Nhưng đối với trường hợp **nested Object** (Object con lồng bên trong Object lớn), thì sao nhỉ, cùng làm ví dụ và kiểm tra nào :

```
// Khai báo Object objA có Object nested là nestedA
const objA = { ten:{ nestedA:'Tâm' } }

// mình sử dụng JSON.parse, và đây được gọi là Deep copy
const objB = JSON.parse(JSON.stringify(objA));

// thay đổi property Object nested của objA
objA.ten.nestedA = 'Nguyen';

// kiểm tra kết quả thu được của objA
console.log('objA',objA);

// kiểm tra kết quả thu được của objB
console.log('objB',objB);
```
**Vậy kết luận, Với cách sử dụng JSON.parse, các Properties ở lớp đầu tiên và nested Object của Object đều được copy sang giá trị với tham chiếu mới.**
- Đối với các **Method** của **Object** thì sử dụng cách này được không nhỉ, thử xem nào : 
```
// Khai báo Object objA
const objA = { ten:function(){ return 'Function Default' } }

// mình sử dụng JSON.parse, và đây được gọi là Deep copy
const objB =  JSON.parse(JSON.stringify(objA));

// thay đổi property Object của objA
objA.ten = function(){
  return 'Function Edit'
}

// kiểm tra kết quả thu được của objA
console.log('objA',objA.ten());

// kiểm tra kết quả thu được của objB
console.log('objB',objB.ten());
```
**Vậy kết luận, Với cách sử dụng JSON.parse, ta không thể copy item Object là method nhỉ ? mình chưa hiểu lý do lắm**
# Tổng kết #
Vậy việc **copy item** trong **Object** cũng là vấn đề khá phức tạp nhỉ ? cũng nhiều phương pháp, nhưng những cách mình sử dụng ở trên không có cách nào trọn vẹn cả :">, Các bạn có thể tìm hiểu thêm bằng cách sử dụng **[cloneDeep Lodash](https://lodash.com/docs/#cloneDeep)** hoặc **[immutability-helper](https://github.com/kolodny/immutability-helper)** thử xem ??
mình có sử dụng nguồn bài viết tại :

https://viblo.asia/p/su-khac-nhau-giua-deep-copy-va-shallow-copy-trong-javascript-4dbZN3qylYM

https://scotch.io/bar-talk/copying-objects-in-javascript

**Xin cảm ơn !!**