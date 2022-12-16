Nhắc đến sắp xếp thì các lập trình viên hầu như biết đến 3, 4 thuật toán hoặc nhiều hơn từ khi còn đi học.

Bẵng đi vài năm làm việc mà không dùng đến nó, ai trong các bạn có thể khẳng định mình sẽ viết lại đúng hết các thuật toán mà mình đã từng học, từng biết, hay đã từng nghe thấy.

Trong bài viết này mình sẽ triển khai lại một số thuật toán sắp xếp cơ bản bằng `javascript` cùng ý tưởng của thuật toán đó.

### 1. Bubble Sort
Sắp xếp nổi bọt
Ý tưởng: Thuật toán sắp xếp bubble sort thực việc hiện sắp xếp mảng bằng cách lặp lại công việc đổi chỗ 2 vị trí liên tiếp nhau nếu chúng đứng sai thứ tự (số vị trí sau bé hơn vị trí trước với trường hợp sắp xếp tăng dần) cho đến khi mảng được sắp xếp.
![](https://images.viblo.asia/ca095c9c-0493-409e-b530-3f0e306ab136.gif)

Triển khai:
```js
function bubbleSort(arr) {
    const len = arr.length;
    for (let i = len-1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (arr[j-1] > arr[j]) {
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
```

### 2. Selection Sort
Sắp xếp lựa chọn
Ý tưởng: duyệt mảng từ vị trí đầu tiên, tìm vị trí có giá trị nhỏ nhất, đổi chỗ của nó với vị trí đầu tiên. Lặp lại bước vừa rồi nhưng từ vị trí thứ 2 tới cuối mảng. Cứ tiếp tục như vậy tới vị trí cuối cùng của mảng, mảng sẽ được sắp xếp.

![](https://images.viblo.asia/0ab0ebd3-dfe7-44a4-9be1-ad89211b4742.gif)

Triển khai:
```js
function selectionSort(arr) {
    let minIndex, temp,
        len = arr.length;

    for (let i = 0; i < len; i++) {
        minIndex = i;
        // tìm index của giá trị nhỏ nhất
        for (let  j = i+1; j < len; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Đổi chỗ
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
```

### 3. Insertion Sort
Ý tưởng: Sắp xếp chèn là một giải thuật sắp xếp dựa trên so sánh in-place. Ở đây, một danh sách con luôn luôn được duy trì dưới dạng đã qua sắp xếp. Sắp xếp chèn là chèn thêm một phần tử vào danh sách con đã qua sắp xếp. Phần tử được chèn vào vị trí thích hợp sao cho vẫn đảm bảo rằng danh sách con đó vẫn sắp theo thứ tự.

Với cấu trúc dữ liệu mảng, chúng ta tưởng tượng là: mảng gồm hai phần: một danh sách con đã được sắp xếp và phần khác là các phần tử không có thứ tự. Giải thuật sắp xếp chèn sẽ thực hiện việc tìm kiếm liên tiếp qua mảng đó, và các phần tử không có thứ tự sẽ được di chuyển và được chèn vào vị trí thích hợp trong danh sách con (của cùng mảng đó).

![](https://images.viblo.asia/e55a6b2c-197d-4fbe-b905-b758fa1d4b69.gif)

Triển khai:
```js
function insertionSort(arr) {
    let i, len = arr.length, el, j;

    for (i = 1; i < len; i++) {
        el = arr[i];
        j = i;

        while (j > 0 && arr[j-1] > toInsert) {
            arr[j] = arr[j-1];
            j--;
        }

        arr[j] = el;
    }

    return arr;
}
```

### 4. Merge Sort
Sắp xếp trộn

Ý tưởng: Giống như Quick sort, Merge sort là một thuật toán chia để trị. Thuật toán này chia mảng cần sắp xếp thành 2 nửa. Tiếp tục lặp lại việc này ở các nửa mảng đã chia. Sau cùng gộp các nửa đó thành mảng đã sắp xếp.

Công việc của chúng ta bao gồm 2 phần: chia mảng và gộp (trộn) các mảng lại

![](https://images.viblo.asia/3c104b67-d8dd-4e3a-98fb-122ab568210c.png)

Triển khai:
```js
function mergeSort(arr){
    let len = arr.length;
    if (len <2) {
        return arr;
    }

    let mid = Math.floor(len/2),
        left = arr.slice(0,mid),
        right =arr.slice(mid);
    //send left and right to the mergeSort to broke it down into pieces
    //then merge those

    return merge(mergeSort(left),mergeSort(right));
}


function merge(left, right){
    let result = [],
        lLen = left.length,
        rLen = right.length,
        l = 0,
        r = 0;

    while (l < lLen && r < rLen) {
        if(left[l] < right[r]) {
            result.push(left[l++]);
        } else {
            result.push(right[r++]);
        }
    }
    //remaining part needs to be addred to the result
    return result.concat(left.slice(l)).concat(right.slice(r));
}
```

### 5. Quick Sort

Giống như `Merge sort`, thuật toán sắp xếp `quick sort` là một thuật toán chia để trị. Nó chọn một phần tử trong mảng làm điểm đánh dấu (`pivot`). Thuật toán sẽ thực hiện chia mảng thành các mảng con dựa vào `pivot` đã chọn. Việc lựa chọn `pivot` ảnh hưởng rất nhiều tới tốc độ sắp xếp. Nhưng máy tính lại không thể biết khi nào thì nên chọn theo cách nào. Dưới đây là một số cách để chọn `pivot` thường được sử dụng:

- Luôn chọn phần tử đầu tiên của mảng.
- Luôn chọn phần tử cuối cùng của mảng. (Được sử dụng trong bài viết này)
- Chọn một phần tử random.
- Chọn một phần tử có giá trị nằm giữa mảng(median element).

Triển khai:
Bước 1: Lấy phần tử chốt là phần tử ở cuối danh sách.
Bước 2: Chia mảng theo phần tử chốt.
Bước 3: Sử dụng sắp xếp nhanh một cách đệ qui với mảng con bên trái.
Bước 4: Sử dụng sắp xếp nhanh một cách đệ qui với mảng con bên phải.

```js
function quickSort(arr, left, right) {
    let len = arr.length,
        pivot,
        partitionIndex;


    if (left < right) {
        pivot = right;
        partitionIndex = partition(arr, pivot, left, right);

        //sort left and right
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }

    return arr;
}

function partition(arr, pivot, left, right) {
    let pivotValue = arr[pivot],
        partitionIndex = left;

    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }

    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

### Một số thuật toán sắp xếp khác
- Heap Sort
- Bucket Sort
- Shell Sort
- PigenHole Sort
- BinaryTree Sort
- Radix Sort
- Cocktail Sort