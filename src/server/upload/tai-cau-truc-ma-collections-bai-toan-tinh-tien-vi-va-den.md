Collection hiểu đơn giản là một tập các dữ liệu không cùng kiểu. Bạn sẽ gặp nó rất nhiều trong lập trình nói chung và các ứng dụng Laravel nói riêng. Collection được Laravel hỗ trợ các phương thức mạnh mẽ, việc của chúng ta là áp dụng nó cùng các kĩ thuật liên quan đến tái cấu trúc mã nguồn cho đẹp mắt.

Về phần lý thuyết của vấn đề Refactoring to collections, bạn có thể tham khảo tại [Slide này](https://viblo.asia/p/slide-only-refactoring-to-collections-Qbq5Qr9LKD8) hoặc tại [đây](https://minhnv2306.github.io/categories/Clean-our-code/Refactoring-to-Collections/). Bài toán tôi trình bày ở đây là áp dụng các phương pháp đó để giải quyết việc tái cấu trúc mã nguồn với collections.
# Bài toán

Bài toán: Cho 1 JSON là products từ 1 cửa hàng, tính toán giá tiền của loại (variants) đèn đơn và ví 

Ví dụ `JSON`:
```JSON
{
    "products": [
        {
            "title": "Small Rubber Wallet",
            "product_type": "Wallet",
            "variants": [
                { "title": "Blue", "price": 29.33 },
                { "title": "Turquoise", "price": 18.50 }
            ]
        },
        {
            "title": "Sleek Cotton Shoes",
            "product_type": "Shoes",
            "variants": [
                { "title": "Sky Blue", "price": 20.00 }
            ]
        },
        {
            "title": "Intelligent Cotton Wallet",
            "product_type": "Wallet",
            "variants": [
                { "title": "White", "price": 17.97 }
            ]
        },
        {
            "title": "Enormous Leather Lamp",
            "product_type": "Lamp",
            "variants": [
                { "title": "Azure", "price": 65.99 },
                { "title": "Salmon", "price": 1.66 }
            ]
        },
        // ...
    ]
}
```
Như vậy chúng ra có các tập sản phẩm, 1 vài cái có `product_type` là "Lamp" hoặc "Wallet" và 1 vài thì không. Mỗi sản phẩm cũng có số lượng "variants" và `variants` là cái thực tế sẽ có giá. Cách giải quyết đơn giản:
```php
$totalCost = 0;

// Loop over every product
foreach ($products as $product) {
    $productType = $product['product_type'];
    // If the product is a lamp or wallet...
    if ($productType == 'Lamp' || $productType == 'Wallet') {
        // Loop over the variants and add up their prices
        foreach ($product['variants'] as $productVariant) {
            $totalCost += $productVariant['price'];
        }
    }
}

return $totalCost;
```
OK bây giờ chúng ta cùng cải thiện vấn đề này nhé.

# Replace Conditional with Filter (cái này dễ đoán)

Mục đích của chúng ta là phá vỡ `foreach` to và tìm cách cho vào chuỗi các bước đơn giản, độc lập, liên kết:
```php
$lampsAndWallets = $products->filter(function ($product) {
    $productType = $product['product_type'];
    return $productType == 'Lamp' || $productType == 'Wallet';
});

$totalCost = 0;

foreach ($lampsAndWallets as $product) {
    foreach ($product['variants'] as $productVariant) {
        $totalCost += $productVariant['price'];
    }
}
return $totalCost;
```

# Replace || with Contains (contains methods)

Một sự khéo léo nhẹ ở đây là sử dụng `in_array` để check trong hàm filter ở trên:
```php
$lampsAndWallets = $products->filter(function ($product) {
    return in_array($product['product_type'], ['Lamp', 'Wallet']);
});
```
Trong collection thì `in_array` là `contains`, 1 sự cải tiến tuyệt vời vì nó xóa đi một vài sự mơ hồ trong thứ tự tham số:
```php
$lampsAndWallets = $products->filter(function ($product) {
    return collect(['Lamp', 'Wallet'])->contains($product['product_type']);
});
```

# Reduce to Sum

OK phần `filter` ngon rồi, giờ tới phần dưới nào:
```php
/**
$lampsAndWallets = $products->filter(function ($product) {
    $productType = $product['product_type'];
    return $productType == 'Lamp' || $productType == 'Wallet';
});
**/
$totalCost = 0;

foreach ($lampsAndWallets as $product) {
    foreach ($product['variants'] as $productVariant) {
        $totalCost += $productVariant['price'];
    }
}

return $totalCost;
```
Đoạn code này đang được tách biệt thành 2 phần
- Lấy giá của mỗi product variant
- Tính tổng giá để lấy tổng chung

Chúng ta có thể chia như sau, và chúng ta có thể sử dụng `reduce` để thay thế bước 2	
```php
// Get all of the product variant prices
$prices = collect();

foreach ($lampsAndWallets as $product) {
    foreach ($product['variants'] as $productVariant) {
        $prices[] = $productVariant['price'];
    }
}

// Sum the prices to get a total cost
$totalCost = $prices->reduce(function ($total, $price) {
    return $total + $price;
}, 0);

return $totalCost;
```
Hãy nhớ rằng những gì tôi đã nói sớm hơn về chúng ta có thể thay thế `reduce` bằng nhưng toán tử giàu tính biểu đạt hơn. Thực ra thì thay reduce bằng `sum` nhanh hơn
```php
return $prices->sum();
```

# Replace Nested Loop with FlatMap

Bây giờ còn đoạn lấy ra giá các sản phẩm ở giữa
```php
/**
// Get all of the product variant prices
**/
$prices = collect();

foreach ($lampsAndWallets as $product) {
    foreach ($product['variants'] as $productVariant) {
        $prices[] = $productVariant['price'];
    }
}
/**
// Sum the prices to get a total cost
$totalCost = $prices->sum()

return $totalCost;
**/
```
Nhìn qua thì có vẻ như chỉ cần map product variants với giá của nó nhưng chúng ta lại đang làm việc với tập `products` chứ không phải là với `variants`. Vậy chúng ta có thể làm ntn xây dựng 1 collection là tập variants và sau đó map chúng với giá là ngon :D.

Ừ ok, dùng map lấy ra
```php
$variants = $lampsAndWallets->map(function ($product) {
    return $product['variants'];
});
```
Vấn đề là bây giờ chúng ta có 1 colelction của mảng các `variants`, không phải mảng các `vartiants`
```php
[
    //
    ...
    [
        { "title": "Blue", "price": 29.33 },
        { "title": "Turquoise", "price": 18.50 }
    ],
    [
        { "title": "Sky Blue", "price": 20.00 }
    ],
    [
        { "title": "White", "price": 17.97 }
    ],
        { "title": "Azure", "price": 65.99 },
        { "title": "Salmon", "price": 1.66 }
    ],
    // ...
]
```
Thật may khi chúng ta có 1 toán tử "làm phẳng" 1 collection về 1 level. Và kết hợp với `map` nữa thì nó là `flatMap`. Sử dụng nó để thay thế 2 cái `foreach`:
```php
$variants = $lampsAndWallets->flatMap(function ($product) {
    return $product['variants'];
});

$prices = $variants->map(function ($productVariant) {
    return $productVariant['price'];
});
```
Rồi OK, đến thời điểm này có thể đặp tất cả mọi thứ thành 1 "đường ống" đơn, 1 luồng:
```php
return $products->filter(function ($product) {
    return collect(['Lamp', 'Wallet'])->contains($product['product_type']);
})->flatMap(function ($product) {
    return $product['variants'];
})->map(function ($productVariant) {
    return $productVariant['price'];
})->sum();
```
Haha, nhìn có vẻ ngon rồi nhỉ. Nhưng tin tôi đi, vẫn có thể ngon hơn đó.

# Plucking for Fun and Profit

`pluck` là shortcut của mapping 1 trường đơn với mỗi phần tử của collection. Ví dụ
```php
$emails = $users->map(function ($user) {
    return $user['email'];
});
```
Thì tương đương với:
```php
$emails = $users->pluck('email');
```
Do đó có thể thay thế đoạn map trên bằng pluck
```php
return $products->filter(function ($product) {
    return collect(['Lamp', 'Wallet'])->contains($product['product_type']);
})->flatMap(function ($product) {
    return $product['variants'];
})->pluck('price')->sum();
```
Xong vẫn chưa hết, ta lại có thể thay thế `->pluck('price')->sum()` bằng `->sum('price')` , và kết quả cuối cùng
```php
return $products->filter(function ($product) {
    return collect(['Lamp', 'Wallet'])->contains($product['product_type']);
})->flatMap(function ($product) {
    return $product['variants'];
})->sum('price');
```
Không có vòng lặp đơn, điều kiện hay biến tạm thời nào được tìm thấy. Rất là thanh lịch nếu bạn hỏi tôi :D

# Tổng kết vấn đề

Đoạn code ban đầu
```php
$totalCost = 0;

// Loop over every product
foreach ($products as $product) {
    $productType = $product['product_type'];
    // If the product is a lamp or wallet...
    if ($productType == 'Lamp' || $productType == 'Wallet') {
        // Loop over the variants and add up their prices
        foreach ($product['variants'] as $productVariant) {
            $totalCost += $productVariant['price'];
        }
    }
}

return $totalCost;
```
 và sau khi được refactor:
 ```php
return $products->filter(function ($product) {
    return collect(['Lamp', 'Wallet'])->contains($product['product_type']);
})->flatMap(function ($product) {
    return $product['variants'];
})->sum('price');
```

## Các helper đã được dùng:

**flatten()**: san phẳng mảng đa chiều thành mảng 1 chiều. Bạn cũng có thể truyền "độ sâu" của mảng như 1 đối số
```php
$collection = collect([
    'Apple' => [
        ['name' => 'iPhone 6S', 'brand' => 'Apple'],
    ],
    'Samsung' => [
        ['name' => 'Galaxy S7', 'brand' => 'Samsung']
    ],
]);

$products = $collection->flatten(1);

$products->values()->all();

/*
    [
        ['name' => 'iPhone 6S', 'brand' => 'Apple'],
        ['name' => 'Galaxy S7', 'brand' => 'Samsung'],
    ]
*/
```

**flatMap()**:
* Sự kết hợp giữa map để xử lý dữ liệu
* Sau đó "san phẳng" chúng thành 1 mảng.

**pluck()**: mapping 1 các trường cho mỗi phần tử trong 1 collection

**sum()**

**contains()**: kiểm tra 1 collection có chưa 1 phần tử nhận vào hay không. Nó rất hữu ích để sử dụng cho phép hoặc (||)

**reduce()**: thu nhỏ, cắt giảm cả collection thành một giá trị đơn duy nhất.

# Tài liệu tham khảo

* The book: [Refactoring to collections](https://adamwathan.me/refactoring-to-collections/)
* [My demo project](https://github.com/minhnv2306/refactoring-to-collections)