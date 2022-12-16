# Vấn đề
* Bạn hãy đặt mình trong trường hợp bạn cần viết một hàm nhận vào số lượng các đối số là không giới hạn.
* Điều này không khó, bởi Javascript cung cấp cho chúng ta một object **arguments** - chứa một mảng các đối số được sử khi hàm được gọi. Lưu ý là **arguments** ở đây là một **Array-like Object** (có thể truy cập theo index, có thuộc tính length nhưng lại không áp dụng được các phương thức của array).
* Chúng ta đi đến một ví dụ, tạo một phương thức tính tổng của các số, không giới hạn bao nhiêu số có thể truyền vào.
    ```js
    function sumOf(){
        var sum = 0; 
        for (var i = 0; i < arguments.length; i++){
             sum += arguments[i];
        }

        return sum;
    }
    ```
   
   
    Và kết quả:
    ```
    sumOf(1,2,3,4,5);//15
    sumOf(1,2);//3
    ```
    
* Tuy nhiên, bạn lại muốn có một method mà nhận vào một tham số và không giới hạn số lượng các đối số sau nó, kiểu như chúng ta muốn quyết định dựa vào tham số thứ nhất rằng chúng ta sẽ làm gì với tất cả các tham số còn lại
    ```js
    function execute(action, <param1, param2, param3,...>){
        if (action === <something>){
            doSomething(<param1, param2, param3, ...>)
        }
    }
    ```
    
* Bạn có thể xử lý với **apply()** (https://www.w3schools.com/js/js_function_apply.asp)
    ![](https://images.viblo.asia/b6ec35f4-af0d-409c-8191-8b61471e228d.png)
* Cách làm như trên có nhược điểm là ta phải xử lý quá nhiều.
    * Phải xóa bỏ tham số thứ nhất từ danh sách tham số
    ```js
    var parameters = Array.from(arguments);
    parameters.shift(); //Remove the first argument
    ```
    
    * Bởi vì **arguments** ở đây chỉ là **array-like**, không áp dụng được hàm shift() hay splice(), chúng ta phải convert nó thành array trước, rồi mới xóa bỏ tham số đầu tiên.
    * Vậy có cách nào ngắn hơn đẹp hơn để xử lý trong trường hợp này không? Câu trả lời là chúng ta sẽ dùng ES6 với sự magic của (...) spread syntax.
# Sử dụng Spread syntax như thế nào?
## 1. Sử dụng như Rest parameter.
Đây là lợi ích quan trọng nhất của cú pháp (...)
* Rest parameter cho phép các hafm nhận vào số lượng vô định các đối số như là một mảng
    ```js
    function <function name> (…args)
    ```
* Không giống **arguments**, Rest parameter
    * Là một instances của Array, có thể áp dụng các hàm xây dựng sẵn cho Array
    * arguments chứ tất cả các tham số truyền vào hàm, trong khi Rest parameter thì không.
    ```js
    function printMe(a,b,c){
    console.log(arguments); 
    //will print all passed parameters respectively as a, b, c
    }
    function printMeSpread(a, ...args){
        console.log(args);
        //Will only print from 2nd passed parameters onwards
    }
    printMe(1,2,3);// [1,2,3]
    printMeSpread(1,2,3); //[2,3]
    ```
Do  đó, thay vì chuyển **arguments** thành array, loại bỏ phần tử đầu tiên, chúng ta chỉ cần viết lại khai báo hàm như sau:
```
function executeWithSpread(type, ...params){....}
```
* Không cần phải sử dụng hàm apply() nữa, thay vào đó
```
function executeWithSpread(type, ...params){
    var actions = {
        sumOf: Sum
    };
    
    if (actions[type]){
        var result = actions[type](...params);
        console.log(result);
    }
}
```
Ở đây chúng ta sử dụng cú pháp '...' như tiền tố của **params**, tất cả các phần tử của params sẽ được trải ra(mở rộng) như là các đối số, thay vì một đối số **params**.
* Nếu ở đây bạn vẫn muốn sử dụng **apply()**, bạn có thể làm như sau:
```
function executeWithSpread(type, ...params){
    var actions = {
        sumOf: Sum
    };
    
    if (actions[type]){
        actions[type].apply(null, params);
    }
}
```

Tuy nhiên ở đây lưu ý rằng phải truyền vào apply() **params**, vì hàm apply() nhận vào tham số là array.

* Như vậy với spread syntax ta có code clean hơn, ít bug hơn, spread syntax là một công cụ cực kì mạnh mẽ. Ngoài ra ta còn có có thể sử dụng cú pháp này với những mục đích hữu ích khác sau đây.
## 2. Clone một object
* Một trong những cách phổ biến hay dùng để copy một object là sử dụng **object.asign()** để tạo một phiên bản clone của object:
![](https://images.viblo.asia/ae48a473-c0b0-4783-9b4f-1d03c8c0fdc8.png)
* Với spread syntax, chúng ta có cách viết ngắn hơn và  clean hơn:
![](https://images.viblo.asia/78a3e099-5a85-4aa3-b0c3-aaec3dfe4161.png)
* Tương tự như **Object.assign()**, sử dụng spread (...) syntax sẽ chỉ khởi tạo bản sao chép các thuộc tính của object đó tới một object mới. 
## 3. Clone một array
* Thay vì sử dụng Array.slice(0) để copy một array

![](https://images.viblo.asia/ab8f203a-aff5-4cd9-964e-bc62016c7f7e.png)

* Hoặc sử dụng **Array.from()**

![](https://images.viblo.asia/fe4a372c-8bbc-4c7e-868a-1c8f79383d1f.png)

* Chúng ta có thể sử dụng Spread syntax

![](https://images.viblo.asia/b4517e37-03d2-4b70-bb0a-43d70aa974e9.png)

## 4. Chuyển kiểu một đối tượng lặp (iterable object) thành mảng
* Chúng ta có thể sử dụng hàm này nhiều lần rồi, hàm loại bỏ các phần tử lặp trong một mảng:

![](https://images.viblo.asia/daf732f0-aad3-4603-96fa-a5c7a7b54e9b.png)
* Thay vì sử dụng một vòng lặp và sao chép từng phần tử sang mảng mới, chúng ta có thể viết code ngắn gọn hơn với spread syntax như bên trên. Nó sẽ "trải" tất cả các phần tử của Set thành một mảng mới tương ứng mà không cần nhiều nỗ lực và đương nhiên sẽ ít bug hơn.
* Tương tự có thể chuyển đổi một đối tượng Map thành mảng

![](https://images.viblo.asia/f7b554e3-8a7b-41ca-b0d2-09a98dfead5b.png)

* Lưu ý: chỉ áp dụng được đối với iterable object, còn đối với Object thì không.
## 5. Merge arrays
* Thông thường nếu chúng ta muốn merge 2 array hoặc nhiều hơn thành một, hoặc khi muốn nối một mảng này với một mảng khác, ta có thể sử dụng:
    * `Array.prototype.concat()` sẽ trả về một mảng mới mà các phần tử của mảng thêm vào sẽ được thêm vào đuôi của mảng gốc. Điều này sẽ không thay đổi mảng gốc.
    
    ![](https://images.viblo.asia/dae044ef-d3c1-4d8d-bdc0-2f30bcef98a0.png)
    
  *  `Array.prototype.unshift()`   thêm tất cả các phần tử của mảng bổ sung vòa đầu của mảng gốc.
    Tuy nhiên hàm này thay đổi mảng ban đầu.
    
    ![](https://images.viblo.asia/48ca99b1-bec1-42d7-9e53-9a5f77b3f350.png)
   
    *    Tuy nhiên với Spread syntax, chúng ta có thể merge các mảng theo thứ tự như ý muốn:
    
            ![](https://images.viblo.asia/610d1060-e25c-4638-9c05-d841646a275c.png)
            
            Lưu ý: với cách làm như trên, **cả 2 mảng đều không thay đổi.**
## 6. Merge các thuộc tính của các object.
* Với cách thông thường, làm **thay đổi object ban đầu**
    ```js
    for(var key in obj2){
       obj1[key] = obj2[key];
    }
    ```
    hoặc 
    ```js
    Object.assign(obj1, obj2)
    ```
    
*   Tuy nhiên với spread syntax, sẽ không làm thay đổi object ban đầu.
    ```js
    var mereObj = {...obj1, ...obj2}
    ```
##     7. Sử dụng với constructor
* Khi sử dụng constructor với cú pháp `new` , trong ES5, để tạo mảng mới từ mảng hiện có, chúng ta phải làm như sau:
    ```js
    var arr = new (Function.prototype.bind.apply(Array, [null].concat([1,2,3,4])));
    ```
*    Hơi bối rối một tí, May mắn thay, Spread syntax cho chúng ta một phép màu:
        ```js
        var arr = new Array(...[1,2,3,4]);
        ```
## 8. Các cách sử dụng hỗn hợp khác
* Với spread syntax, chúng ta sẽ có nhiều sức mạnh hơn khi làm việc với mảng lặp, khi mà các phương thức push, splice, concat,... không giúp gì chusgn ta được
    ```js
    var arr1 = ['hello', 'there'];
    var arr2 = ['today', 'is', 'good', 'day', ...arr1, 'how', 'are', 'you']
    console.log(arr2); //['today', 'is', 'good', 'day', 'hello', 'there', 'how', 'are', 'you']
#     Kết luân
* Cú pháp spread đem lại nhiều ích lợi so với các cách truyền thống trước đây - những cách mà yêu cầu nhiều dòng code mà nếu bạn không cẩn thận bạn sẽ có những cái bug mà không có thông báo.
Tuy nhiên đổi lấy sự sạch đẹp và thuận tiện thì nhiều khi bạn có thể cảm thấy khó hiểu đối với cú pháp spread này.
* Nguồn tham khảo:
https://medium.com/front-end-weekly/es6-magical-stuffs-spread-syntax-in-depth-afdd0118ebd0