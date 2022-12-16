### Mở đầu

Chào các bạn,

Chắc hẳn các bạn sẽ còn nhớ những bài toán tính tổ hợp, xác suất thường học ngày cấp 3. Những bài toán về ma trận sẽ được học vào năm nhất hay năm hai Đại học.
Đôi khi chúng ta học Đại học chuyên ngành Công nghệ thông tin về Toán sơ cấp hay cao cấp mà không biết mai sau có ứng dụng gì nhiều trong tương lai không, có ứng dụng nhiều vào những gì mình làm trong tương lai không. Và đa số đều học chỉ để cho qua phải không?

Hôm nay mình chia sẻ với các bạn về tính ứng dụng của bài toán về tổ hợp và ma trận mà chúng ta sẽ gặp trong lập trình.

### Nội dung bài toán

Khách hàng yêu cầu làm một màn hình với chức năng về download và export data ra file CSV dựa vào config như sau:
![](https://images.viblo.asia/e9049eb5-9b07-47a2-9357-7f9cb72af662.png)

Chúng ta hãy để ý các `json_table_name` bị trùng lặp nhau gồm:  **product_infos**, **maekaku_status**, **service_infos** và format data của nó như bên dưới.

- **"product_infos"** sẽ gồm nhiều data của customize15, customize16, customize17.

Format data như sau:
```
product_infos : {
	0 : {
		customize15: Data_customize15,
		customize16: Data_customize16,
		customize17: Data_customize17,
	},
	1 : {
		customize15: Data_customize15_1,
		customize16: Data_customize16_1,
		customize17: Data_customize17_1,
	},
	2 : {
		customize15: Data_customize15_2,
		customize16: Data_customize16_2,
		customize17: Data_customize17_2,
	},
	3 : {
		customize15: Data_customize15_3,
		customize16: Data_customize16_3,
		customize17: Data_customize17_3,
	}
}
```

- **"maekaku_status"** sẽ gồm nhiều data của customize49, customize50.

Format data như sau:
```
maekaku_status : {
	0 : {
		customize49: Data_customize49,
		customize50: Data_customize50,
	},
	1 : {
		customize49: Data_customize49_1,
		customize50: Data_customize50_1,
	}
}
```

- **"service_infos"** sẽ gồm nhiều data của customize29, customize30, customize31.

Format data như sau:
```
service_infos : {
	0 : {
		customize29: Data_customize29,
		customize30: Data_customize30,
		customize31: Data_customize31,
	},
	1 : {
		customize29: Data_customize29_1,
		customize30: Data_customize30_1,
		customize31: Data_customize31_1,
	},
	2 : {
		customize29: Data_customize29_2,
		customize30: Data_customize30_2,
		customize31: Data_customize31_2,
	}
}
```

Header của CSV như sau:
`"Order number","Product type","Product name","Product name2","Product name3","Customer name","Apoelia","Pre-confidence day","Pre-confidence day3","Review OK date","Service item order date","Service item destination","Service item order source"`

Kết quả họ đang làm số dòng trên file CSV là khoảng hơn **1000** dòng. Điều này là hoàn toàn sai. 

=> Khách hàng yêu cầu họ muốn data ở các  `json_table_name` sẽ phải đi theo cặp với nhau. Như vậy tức số dòng sẽ được ghi ra file CSV tương ứng là `4*2*3` là **24** dòng.

### Cách giải quyết bài toán

Bình thường thì chúng ta sẽ dựa vào code cũ của khách hàng để phát triển tiếp.
Nhất là đối dự án theo tính chất maintain vì không muốn sửa lại hoàn toàn code cũ của KH để phải giải trình, nói lại cho KH mục đích của việc sửa code cũ. Vì KH họ đặc biệt không muốn mình viết mới hoàn toàn đoạn code cũ, đơn giản vì hiện tại hệ thống đang chạy ổn định, họ nghĩ rằng khi mình sửa liệu có vấn đề gì phát sinh khi mình release lên production không?

Đó là tâm lý chung của KH thôi, nhưng chúng ta vẫn cứ nên mạnh dạn đập toàn bộ cái code mà thấy nó củ chuối đi nhé :D. Tuy nhiên bạn phải chắc chắn hiểu rõ về hệ thống thì mới đập đi làm lại đoạn code của chuối kia nhé =))

Mình tiếp nhận code và dựa theo code cũ của KH để code tiếp, nhưng mất hơn 1 ngày để theo cái code cũ mà không thể giải quyết bài toán, do đó mình đành phải bỏ đoạn code cũ của KH đi.

Đầu tiên mình nghĩ là sẽ phải dùng các vòng loop thì sẽ giải quyết được bài toán, mình đã thử và thật sự để giải quyết nó thì mình sẽ phải lặp đi lặp lại các vòng for, foreach, hay while cực kỳ lâu và khó chịu. Tất nhiên đây cũng là một cách giải quyết.

Để tìm giải pháp tối ưu, cuối cùng thì bài toán này phải đưa về bài toán tổ hợp và ma trận để giải quyết, cái này mình cũng cần một chút sự giúp đỡ của member trong team. Không teamwork thì khó giải quyết gọn bài toán này được. :)


 - **Input bài toán**

Input của bài toán này như sau:

```
$product_infos = array(0, 1, 2, 3);
$maekaku_status = array(0, 1, 2);
$service_infos = array(0, 1);
```

- **Output bài toán**

Output của bài toán là một ma trận như bên dưới:


| product_infos | maekaku_status | service_infos |
| -------- | -------- | -------- |
| 0 | 0 | 0
| 0 | 0 | 1
| 0 | 1 | 0
| 0 | 1 | 1
| 0 | 2 | 0
| 0 | 2 | 1
| 1 | 0 | 0
| 1 | 0 | 1
| 1 | 1 | 0
| 1 | 1 | 1
| 1 | 2 | 0
| 1 | 2 | 1
| 2 | 0 | 0
| 2 | 0 | 1
| 2 | 1 | 0
| 2 | 1 | 1
| 2 | 2 | 0
| 2 | 2 | 1
| 3 | 0 | 0
| 3 | 0 | 1
| 3 | 1 | 0
| 3 | 1 | 1
| 3 | 2 | 0
| 3 | 2 | 1

- **Function giải quyết**

1. **Function sử dụng đệ quy**

```
function combinations($arrays, $i = 0) {
    if (!isset($arrays[$i])) {
        return array();
    }
    if ($i == count($arrays) - 1) {
        return $arrays[$i];
    }

    // get combinations from subsequent arrays
    $tmp = combinations($arrays, $i + 1);

    $result = array();

    // concat each array from tmp with each element from $arrays[$i]
    foreach ($arrays[$i] as $v) {
        foreach ($tmp as $t) {
            $result[] = is_array($t) ? 
                array_merge(array($v), $t) :
                array($v, $t);
        }
    }

    return $result;
}

print_r(
    combinations(
        array(
            $product_infos, 
            $maekaku_status, 
            $service_infos
        )
    )
);
```
2. **Function không sử dụng đệ quy**

```
$arrCountRows = array(
    $product_infos, 
    $maekaku_status, 
    $service_infos
);
function indexMatrix($arrCountRows)
{
    // Tính số dòng sẽ được export ra file CSV
	$counts = array_map("count", $arrCountRows);
	$total = array_product($counts);

	$result = array();
	$combinations = array();
	$curCombs = $total;

	foreach ($arrCountRows as $field => $vals) {
		$curCombs = $curCombs / $counts[$field];
		$combinations[$field] = $curCombs;
	}

    // Mảng sẽ chứa ma trận kết quả
	for ($i = 0; $i < $total; $i++) {
		foreach ($arrCountRows as $field => $vals) {
			$result[$i][$field] = $vals[($i / $combinations[$field]) % $counts[$field]];
		}
	}

	return array(
		'total' => $total,
		'result' => $result
	);
}
```

Sau khi sử dụng function trên, file CSV sẽ có nội dụng như sau:

![](https://images.viblo.asia/9b2ecf6b-614b-4f74-bdc4-e7dfa44b4c32.png)

Như vậy sẽ có 24 dòng được ghi, đúng như yêu cầu đặt ra của KH.


Trên đây là mình chia sẻ lại bài toán mình gặp phải, hi vọng sẽ giúp ích cho các bạn khi lập trình mà gặp bài toán tương tự.
 
 
Tham khảo tại: [How to generate in PHP all combinations of items in multiple arrays](https://stackoverflow.com/questions/8567082/how-to-generate-in-php-all-combinations-of-items-in-multiple-arrays)