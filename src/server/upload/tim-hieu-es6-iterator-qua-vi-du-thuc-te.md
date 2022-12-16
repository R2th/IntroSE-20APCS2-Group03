**Iterators** nôm na là 1 cách mới để duyệt các phần tử trong bất kỳ collection nào trong Javascript.

Chúng ta sẽ đi tìm hiểu iterators là gì, khi nào nên sử dụng chúng với ví dụ cụ thể.

## 1. **Bắt đầu**

Chúng ta có 1 array các categories của Lazada như thế này:


```
const Categories = [
    'Mobiles',
    'Tables',
    'Laptops',
    'Desktops'
];
```

Ở một số trường hợp, chúng ta muốn lấy tất cả giá trị của categories, in ra màn hình, chỉnh sửa,.... Vậy chúng ta làm thế nào ? ... Quá dễ !. Chỉ cần dùng vòng lặp for, while, for-of,... là oke ngay đúng không. 


Giờ thì thay thế array trên bằng 1 data structure như thế này :
```
const Categories = {
    allCategories: {
        'Electronic Devices':
            [
                'Mobiles',
                'Tables',
                'Laptops',
                'Desktops'
            ],
        'Electronic Accessories':
            [
                'Mobile Accessories',
                'Computer Accessories',
                'Network Components',
                'Computer Components'
            ],
        'TV & Home Appliances':
            [
                'TV & Video Devices',
                'Home Audio',
                'Large Appliances',
                'Cooling air & Treatment'
            ],
        'Health & Beauty':
            [
                'Markup',
                'Skincare',
                'Hair care',
                'Beauty tools'
            ]
    }
};
```


**Categories**  bây giờ là 1 object chứa 1 object khác là allCategories. allCategories chứa 3 array với các key lần lượt là *'Electronic Devices', 'Electronic Accessories', 'TV & Home Appliances', 'Health & Beauty'.*

Trở về vấn đề đặt ra ban đầu, bây giờ với thì các bạn sẽ làm các nào để lấy tất cả các *sub categories* ? Lồng vài vòng lặp ? 

Chúng ta có 1 cách tốt hơn để làm việc đó bằng cách biến Categories object trở thành iterable object. Còn như thế nào thì mời các bạn theo dõi phần tiếp theo.

## 2. **Iterables and Iterators là gì**


Ở phần trên, chúng ta muốn có 1 hàm nào đó mà cho phép chúng ta có thể lấy tất cả sub-categories ( giá trị internals ) 1 cách tuần tự, 1 hàm kiểu như là iteratorMethod nào đó.


Và ES6 cung cấp cho ta **Symbol.iterator** để giải quyết việc duyệt các phần tử trong các custom objects dạng như ví dụ của chúng ta. **Symbol.iterator** sẽ trả về 1 object gọi là **iterator**. **Iterator** này sẽ có 1 method **next()** mà khi thực thi sẽ trả về 1 object gồm có 2 key là *value* và *done*.

*Value* key sẽ chứa giá trị hiện tại còn *done* thì chứa giá trị boolean và có tác dụng để xác định những giá trị của object đã được duyệt hết hay chưa.

**Iterable** là 1 data structure mà mục đích của nó làm cho các phần tử có thể truy xuất ra bên ngoài bằng cách implement 1 method là Symbol.iterator - method này là 1 factory để tạo ra các iterators.

**Iterator** là 1 con trỏ để duyệt qua các phần tử của cấu trúc dữ liệu iterable

Các bạn có thể tham khảo sơ đồ bên dưới để nắm rõ hơn flow của iterator :
![](https://images.viblo.asia/03c2d0b8-3c5d-4061-8ae8-bfcb92d9865e.png)
## 3. Từ Object => iterable Object

Để thực hiện việc này, chúng ta cần sử dụng method gọi là Symbol.iterator.  

Dưới dây là đoạn ví dụ trực quan cho các bạn dễ hình 
dung: 
```
const Category = {
    allCategories: {
        'Electronic Devices':
            [
                'Mobiles',
                'Tables',
                'Laptops',
                'Desktops'
            ],
        'Electronic Accessories':
            [
                'Mobile Accessories',
                'Computer Accessories',
                'Network Components',
                'Computer Components'
            ],
        'TV & Home Appliances':
            [
                'TV & Video Devices',
                'Home Audio',
                'Large Appliances',
                'Cooling air & Treatment'
            ],
        'Health & Beauty':
            [
                'Markup',
                'Skincare',
                'Hair care',
                'Beauty tools'
            ]
    },
    [Symbol.iterator]() {
        // Lấy tất cả  liệu Category trong arr
        const categories = Object.values(this.allCategories);

        // Lưu giữ giá trị index của subCategory và Category hiện tại.
        let currentSubCategoryIndex = 0;
        let currentCategoryIndex = 0;

        return {
            // Khai báo method next()
            next() {
                // Get subCategories của categories theo currentCategoryIndex
                const subCategories = categories[currentCategoryIndex];

                // Giá trị doNothaveMoreSubCategories true là khi subCategories đã được duyệt hết.
                const doNotHaveMoreSubCategories = !(currentSubCategoryIndex < subCategories.length);
                if (doNotHaveMoreSubCategories) {
                    // Khi hết subCategories thì tăng index lên để chuyển sang category tiếp
                    currentCategoryIndex++;
                    // và reset currentSubCategoryIndex về 0
                    currentSubCategoryIndex = 0;
                }

                // Nếu tất cả categories được duyệt hết chúng ta sẽ trả về object mà done được set true.
                const doNotHaveMoreCategories = !(currentCategoryIndex < categories.length);
                if (doNotHaveMoreCategories) {
                    return {
                        value: undefined,
                        done: true
                    };
                }


                // Tiếp tục category tiếp theo
                return {
                    value: categories[currentCategoryIndex][currentSubCategoryIndex++],
                    done: false
                }
            }
        };
    }
};



for (const subCategory of Category) {
    console.log(subCategory);
}


console.log(...Category);
// Mobiles Tables Laptops Desktops Mobile Accessories Computer Accessories Network Components Computer Components TV & Video Devices Home Audio Large Appliances Cooling air & Treatment Markup Skincare Hair care Beauty tools


```



Qua bài viết này, các bạn đã phần nào hiểu rõ hơn về iterator, cách nó hoạt động và ứng dụng của nó trong trường hợp cụ thể. 
Nếu thấy hơi khó hiểu thì hãy thử run và debug ví dụ bên trên để hiểu rõ hơn nhé. 



*Tham khảo :*

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
https://codeburst.io/javascript-es6-iterables-and-iterators-de18b54f4d4
https://viblo.asia/p/iterator-in-javascript-XQZGxAdLewA