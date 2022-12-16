Đôi khi bạn sẽ cần chèn 1 mảng vào giữa 1 mảng khác tại vị trí index nào đó.

Ví dụ bạn cần chèn mảng B vào mảng a tại index = 2 trong mảng A: 
```js
const B = [10,20,30,40,50];
let A = [1,2,3,4,5];
```

* Nếu bạn đặt câu hỏi vào Stack Overflow (SO) sẽ nhận được 1 cú pháp rất đơn giản như sau :

https://stackoverflow.com/questions/7032550/javascript-insert-an-array-inside-another-array

```js
(CÁCH 1)  A.splice(2,0,...B); //kết quả [1,2,10,20,30,40,50,3,4,5]
```

* Đây là accepted answer trên SO nhưng bạn hãy THỬ DÙNG CÁCH NÀY TRONG TRƯỜNG HỢP BẠN CẦN XỬ LÝ 1 MẢNG SỐ LIỆU RẤT LỚN. Dự án thực tế của tôi xử lý đến hơn 200k phần tử :
```js
let C = [];

for(let i=0;i<200000;i++){
    C.push(i);
}

A.splice(2,0,...C);
```

Bạn sẽ nhận được lỗi : RangeError: Maximum call stack size exceeded. Nghĩa là có quá nhiều biến được truyền vào hàm splice vì bản chất của Spead Operator là tách các phần tử trong mảng ra làm một dãi các biến độc lập truyền vào 1 hàm nào đó.

* CÁCH TÔI GIẢI QUYẾT ĐƠN GIẢN LÀ TẠO 1 FUNCTION :
```js
//*function chèn 1 array vào giữa 1 array

(CÁCH 2)

function insertArray(origin,index,inserted){

    if(index>0 && index<origin.length-1){

        const chunk1 = origin.slice(0,index);

        const chunk2 = origin.slice(index);

        return [].concat(chunk1,inserted,chunk2);
    
    }

    return null;

}
```

* kiểm tra lại :

```js
const rs = insertArray(A,2,C);

console.log(rs.length); //kết quả 200010 => bạn có thể log ra vài phần tử để kiểm chứng.
```js

* Thực tế, nếu khi bạn biết chắc dữ liệu của mình có số lượng phần tử cố định hãy áp dụng cách 1, còn không để chắc ăn không bị dính lỗi thì bạn nên kiểm tra đầu vào như sau :

//*chèn 1 array vào giữa 1 array

function insertArray(origin,index,inserted){

    if(inserted.length>100000){

        if(index>0 && index<origin.length-1){

            const chunk1 = origin.slice(0,index);

            const chunk2 = origin.slice(index);

            return [].concat(chunk1,inserted,chunk2);

        }else{
        
            return null;
        
        }

    }else{

        return origin.splice(index,0,...inserted);

    }

}

Trên đây tôi xin chia sẽ một chú ý rất quan trọng trong lập trình thực tế trên JS. Xin cám ơn mọi người!