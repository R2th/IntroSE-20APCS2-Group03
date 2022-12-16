## Ý tưởng
- Hệ thống gợi ý (Recommender Systems) là một thành phần trong hệ thống thông tin. Mục đích của nó là hỗ trợ người dùng tìm kiếm được đúng thông tin cần thiết, dự đoán sở thích hay xếp hạng mà người dùng có thể dành cho một mục thông tin (item) nào đó mà họ chưa xem xét tới trong quá khứ. Trong viết này mình sẽ cài đặt thuật toán NBCF trên ngôn ngữ PHP
- NBCF viết tắt là Neighborhood-based Collaborative Filtering 
- Ý tưởng cơ bản của NBCF là xác định mức độ quan tâm của một user tới một item dựa trên các users khác gần giống với user này. Việc gần giống nhau giữa các users có thể được xác định thông qua mức độ quan tâm của các users này tới các items khác mà hệ thống đã biết. Ví dụ, A, B đều thích phim Cảnh sát hình sự, tức đều rate bộ phim này 5 sao. Ta đã biết A cũng thích Người phán xử, vậy nhiều khả năng B cũng thích bộ phim này.
- Hai câu hỏi quan trọng nhất trong một hệ thống Neighborhood-based Collaborative Filtering là:
  - Làm thế nào xác định được sự giống nhau giữa hai users?
  - Khi đã xác định được các users gần giống nhau (similar users) rồi, làm thế nào dự đoán được mức độ quan tâm của một user lên một item? .

## Cài đặt

### Similarity Functions 
Công việc quan trọng nhất phải làm trước tiên là phải xác định được sự giống nhau (similarity) giữa hai users. Dữ liệu duy nhất chúng ta có là Utility matrix Y

![image](https://user-images.githubusercontent.com/55786352/72884421-a68ddf80-3d38-11ea-8a50-af7418d210bd.png)

Hình ảnh trên là ví dụ về một ma trận dựa trên số điểm của một người dùng đánh giá cho một sản phẩm. Một cách trực quan, hành vi của u0 gần giống với u1 hơn là u2,u3,u4,u5,u6 . Từ đó có thể dự đoán rằng u0 sẽ quan tâm tới i2 vì u1 cũng quan tâm tới item này . Đặt mức độ giống nhau của hai users ui , uj là sim(ui , uj).

### Cosine Similarity
Hàm số để đo sim được sử dụng trong bài research này là hàm Cosine Similarity. Đây là hàm được sử dụng nhiều nhất , công thức tính cos của góc giữa hai vector a , b 

![image](https://user-images.githubusercontent.com/55786352/72884528-dccb5f00-3d38-11ea-943f-6722dc6d7bae.png)

![image](https://user-images.githubusercontent.com/55786352/72884587-f40a4c80-3d38-11ea-8f18-e27888be51d4.png)

### Chuẩn hóa dữ liệu

Ở hình ảnh trên , hàng cuối cùng trong hình a) là giá trị trung bình của ratings cho mỗi user. Giá trị cao tương ứng với các user dễ tính và ngược lại . Khi đó , nếu tiếp tục trừ từ mỗi rating đi giá trị này và thay các giá trị chưa biết bằng 0 ta sẽ được normalized utility matrix nhưng trong hình b) .

### Xác định độ quan tâm

Công thức phổ biến được sử dụng để dự đoán rating của u cho i là

![image](https://user-images.githubusercontent.com/55786352/72884648-0edcc100-3d39-11ea-982f-13fd16ebdb9f.png)

Trong đó N(u,i) là tập hợp k users trong neighborhood ( tức có similarity cao nhất ) của u mà đã rated i.
Một ví dụ về việc tính normalized rating của u1 cho i1 được cho trong hình e) với số k = 2 các bước thực hiện là:
- Xác định các users đã rated i1, đó là u0 , u3 , u5
- Xác định similarities của u1 với các users này ta nhận được 0.83 , -0.40 , -0.23 . Hai ( k = 2 ) giá trị lớn - nhất là 0.83 và -0.23 tương ứng với u0 và u5.
- Xác định các normalized ratings của u0, u5 cho i1, ta thu được hai giá trị lần lượt là 0.75 và 0.5
- Dự đoán kết quả

![image](https://user-images.githubusercontent.com/55786352/72884716-25831800-3d39-11ea-858f-f0d7cdd25c33.png)

Việc quy đổi các giá trị ratings đã chuẩn hóa về thang 5 có thể được thực hiện bằng cách cộng các cột của ma trận với giá trị rating trung bình của mỗi user như đã tính trong hình a).

## Logic function
- Đối với thuật toán trên trong hệ thống được áp dụng cho chức năng gợi ý sản phẩm tương tự . Hệ thống đo sự giống nhau giữa 2 người dùng rồi gợi ý các sản phẩm.
- Thư viện mình sử dụng là https://github.com/algenza/cosine-similarity

| Tên hàm | Đầu vào | Đầu ra | Mô tả |
| --- | --- | --- | --- |
| getSimilarity() | Ma trận người dùng đánh giá sản phẩm, Người dùng cần gợi ý, Người dùng khác | Độ giống nhau giữa 2 người dùng , Kết quả hàm số cosin góc giữa 2 vector trong khoảng [-1;1] | Trả về kết quả so sánh giữa người dùng cần gợi ý với người dùng khác . Ở cài đặt trên hệ thống này , chỉ tính toán  các kết quả có độ giống nhau > 0.5 |
| getRecommendation() | Ma trận người dùng đánh giá sản phẩm , Người dùng cần gợi ý | Mảng các sản phẩm dự đoán người dùng có thể yêu thích | Trả về mảng sản phẩm người dùng có thể yêu thích với điểm dự đoán > 3 |

```php
function getSimilarity($matrix, $item, $otherProduct)
{
	$vectorUser = array();
	$vectorOtherUser = array();
	$match = 0;
	foreach ($matrix[$item] as $key => $value) {
		if (array_key_exists($key, $matrix[$otherProduct])) {
			$vectorUser[] = $value;
			$vectorOtherUser[] = $matrix[$otherProduct][$key];
			$match++;
		} else {
			$vectorUser[] = $value;
			$vectorOtherUser[] = 0;
		}
	}

	foreach ($matrix[$otherProduct] as $key => $value) {
		if (array_key_exists($key, $matrix[$item])) { } else {
			$vectorOtherUser[] = $value;
			$vectorUser[] = 0;
		}
	}
	$data =  Cosine::similarity($vectorUser, $vectorOtherUser);
	if ($match == 0 || $temp < 0.5) {
		return -1;
	}

	return $data;
}
```

```php
function getRecommendation($matrix, $user)
{
	$total = array();
	$simsums = array();
	$ranks = array();
	foreach ($matrix as $otherUser => $value) {
		if ($otherUser != $user) {
			$sim = getSimilarity($matrix, $user, $otherUser);
			// "Độ gần giống : " . $otherUser . " với " . $user . " là : " . $sim . "<br/>";
			if ($sim == -1) continue;
			foreach ($matrix[$otherUser] as $key => $value) {
				if (!array_key_exists($key, $matrix[$user])) {
                    if (!array_key_exists($key, $total)) {
                        $total[$key] = 0;
                    }
                    $total[$key] += $matrix[$otherUser][$key] * $sim;

                    if (!array_key_exists($key, $simsums)) {
                        $simsums[$key] = 0;
                    }
                    $simsums[$key] += $sim;
				}
			}
		}
	}

	foreach ($total as $key => $value) {
		$ranks[$key] = $value / $simsums[$key];
	}
	array_multisort($ranks, SORT_DESC);
	return $ranks;
}
```

Đoạn code ở trên mình cài đặt có thể chưa optimize cho lắm nếu có ý tưởng hay hơn hãy đóng góp ở dưới giúp mình nhé :D