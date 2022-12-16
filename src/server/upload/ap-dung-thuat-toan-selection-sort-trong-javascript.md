Chào các bạn, đây là một bài viết trong series [ áp dụng các thuật toán sắp xếp trong Javascript](https://viblo.asia/s/ap-dung-cac-thuat-toan-sap-xep-trong-javascript-Am5yqPgw5db). Ở bài viết này, mình sẽ giới thiệu các bạn về thuật toán **`Selection Sort`**, một thuật toán khá là phổ biến, nhưng cũng tương đối đơn giản.

## Các features của ES6 được sử dụng trong bài viết này
1. Arrow Function.
2. Const + Let.

## Cách hoạt động của Selection Sort
Ý tưởng đằng sau **Selection Sort** khá đơn giản. Để có thể sắp xếp được một mảng, chúng ta sẽ cần: 

### Bước 1:
Chúng ta sẽ cần chạy một vòng lặp lần lượt qua từng giá trị của mảng đó. Trong mỗi vòng lặp, chúng ta sẽ so sánh giá trị hiện tại của nó với các giá trị còn lại của mảng trên.

### Bước 2:
Chúng ta sẽ hoán đổi vị trí của giá trị hiện tại của vòng lặp ở trên với các giá trị còn lại của mảng  với một hoặc nhiều điều kiện khác nhau tùy vào mục đích sắp xếp của mọi người.

## Áp dụng Selection Sort trong Javascript
Việc hình dung hóa cách hoạt động của **Selection Sort** bằng ảnh khá là mất thời gian, nên chúng ta sẽ đi vào ví dụ luôn nhé. Trong ví dụ dưới đây, mình sẽ sắp xếp một mảng các số nguyên theo thứ tự `ascending` (thứ tự từ nhỏ đến lớn).

Như mình đã miêu tả ở trên. Đầu tiên, Chúng ta sẽ chạy một vòng lặp lần lượt qua từng giá trị của một mảng và so sánh giá trị hiện tại của vòng lặp đó với từng giá trị còn lại của mảng bằng cách chạy thêm một vòng lặp nữa lặp qua các giá trị còn lại của mảng. Vì mình sẽ sắp xếp các giá trị theo thứ tự từ nhỏ đến lớn, nên nếu giá trị hiện tại của vòng lặp thứ 1 lớn hơn giá trị hiện tại của vòng lặp thứ 2, mình sẽ hoán đổi vị trí của chúng với nhau.

```js
function selectionSort(arr) {
    let currentValueNewIndex;

    // *** chạy một vòng lặp qua từng giá trị của mảng
    for (let i = 0; i < arr.length; i++) {
        /*
            *** biến này sẽ chứa giá trị của vị trí sau khi được hoán đổi
                của giá trị hiện tại của vòng lặp đầu tiên
        */
        currentValueNewIndex = i;

        /*
            *** chạy thêm một vòng lặp qua các giá trị còn lại của mảng để
                so sánh chúng với giá trị hiện tại của vòng lặp thứ nhất
        */
        for (let j = i + 1; j < arr.length; j++) {
            /*
                *** đổi index của giá trị hiện tại của vòng lặp thứ 1 với
                    index của giá trị của vòng lặp 2
            */
            if (arr[currentValueNewIndex] > arr[j]) {
                currentValueNewIndex = j;
            }
        }
    }
    
    // *** trả về mảng đã được sắp xếp
    return arr;
}
```

Bước tiếp theo, cũng là bước cuối cùng chính là thực hiện việc hoán đổi hai giá trị với nhau.

```js
function selectionSort(arr) {
    let currentValueNewIndex;

    // *** chạy một vòng lặp qua từng giá trị của mảng
    for (let i = 0; i < arr.length; i++) {
        /*
            *** biến này sẽ chứa giá trị của vị trí sau khi được hoán đổi
                của giá trị hiện tại của vòng lặp đầu tiên
        */
        currentValueNewIndex = i;

        /*
            *** chạy thêm một vòng lặp qua các giá trị còn lại của mảng để
                so sánh chúng với giá trị hiện tại của vòng lặp thứ nhất
        */
        for (let j = i + 1; j < arr.length; j++) {
            /*
                *** đổi index của giá trị hiện tại của vòng lặp thứ 1 với
                    index của giá trị của vòng lặp 2
            */
            if (arr[currentValueNewIndex] > arr[j]) {
                currentValueNewIndex = j;
            }
        }
        
        /*
            *** nếu ví trị của giá trị hiện tại của vòng lặp thứ 1
                được update thì ta sẽ tiến hành việc hoán đổi
        */
        if (i !== currentValueNewIndex) {
            let temp = arr[i];
            arr[i] = arr[currentValueNewIndex];
            arr[currentValueNewIndex] = temp;
        }
    }
    
    // *** trả về mảng đã được sắp xếp
    return arr;
}
```

### test:

```js
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(selectionSort(arr)); // *** => [3, 9, 10, 27, 38, 43, 82]
```

## Lời kết

Vậy là mình đã giới thiệu cho các bạn thêm được một thuật toán hay ho nữa rồi :beers::beers::beers:. Qua bài viết lần này, mình mong các bạn sẽ nắm được cách hoạn động của thuật toán **Selection Sort**. Nếu thấy hay và bổ ích, các bạn hãy cho mình một `like`, một `sub`... À nhầm, một `follow` các bạn nhé :joy::joy::joy:. Chúc các bạn một ngày vui vẻ và tràn đầy sức khoẻ.