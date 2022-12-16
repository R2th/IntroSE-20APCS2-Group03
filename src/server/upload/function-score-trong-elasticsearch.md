## 1. Giới thiệu.
Trái tim của trình search Elasticsearch chính là khái niệm score, như đa phần những gì chúng ta được biết TF-IDF

> Score ám chỉnh độ liên quan của document tới từ khoá search.

> function score cho phép chỉnh sửa giá trị score của document trả về, từ đó dễ dàng custom được độ ảnh hưởng và cho ra kết quả chính xác với requirement hơn.


## 2. Các usecase thực tế của function score.

### 2.1 Thêm độ ảnh hưởng của lượt view trong kết quả tìm kiếm note.
> Trong một ứng dụng về note, ngoài việc search text trong note, chúng ta cần bổ sung lượt view note vào độ ảnh hưởng score, note view nhiều, càng có xu hướng muốn search ra lại.

Bổ sung lượt view vào kết quả search, rồi dùng SUM để tính tổng lượt view với score hiện tại để làm score mới
```
score new = score cũ + number view
```

```
GET wnote/_search
{
  "query": {
    "function_score": {
      "query": {
        "match": {
          "rawTextSearch": "and"
        }
      },
      "script_score": {
        "script": {
          "source": "doc['views'].value"
        }
      },
      "score_mode": "sum",
      "boost_mode": "sum"
    }
  }
}
```
![](https://images.viblo.asia/c228345c-c5f6-463d-90d5-84b293b4b917.png)

Tuy nhiên cách trên có 1 chút bất lợi, việc dùng add thêm số views cho score đến 1 lúc sẽ làm cho score quá lớn so với mặt bằng chung, dẫn tới kết quả có lượt view quá cao sẽ overwrite các kết quả trong mặt bằng chung, gây bão hoà  và làm mất đi kết quả mà user thật sự mong muốn.

```
GET wnote/_search
{
  "_source": ["_score"],
  "query": {
    "function_score": {
      "query": {
        "match": {
          "rawTextSearch": "and"
        }
      },
      "script_score": {
        "script":  "_score * Math.log10(doc['views'].value + 1)"
      },
      "score_mode": "sum",
      "boost_mode": "sum"
    }
  }
}
```

**Giải pháp:**

Thêm function log , để giảm tính ảnh hưởng của score đến từ view, đồ thị của hàm logarit như sau:
> Như vậy độ tăng score sẽ bị phản ánh trên 1 chiều scale thấp hơn, việc đó đảm bảo giá trị view không ảnh hưởng quá nhiều đến giá trị score.

![](https://images.viblo.asia/9a6dd83e-4599-4027-ba3d-4368fedb9d47.png)

Ví dụ:
   - 10 views:  log10(10) = 1 => score = score + 1
   - 20 views:  log10(20) = 1 => score = score + 1.3
   - 50 views:  log10(50) = 1 => score = score + 1.69
   - 100 views:  log10(20) = 1 => score = score + 2

Base logarihm càng thấp giá trị score được cộng càng tăng, chúng ta cùng khảo sát bảng biến thiên sau:
![](https://images.viblo.asia/ffe03be6-0ea0-483e-9c55-03c1f7ecb739.png)

### 2.2 Sử dụng saturation để giá trị được cộng thêm không vượt quá ngưỡng mong muốn.
Đối khi, các document mà lượng score không chênh lệch nhau nhiều, với độ chênh lệch score thấp như vậy, chúng ta có thể sử dùng function saturation để áp đặt sự ảnh hưởng không nên vượt quá 1 con số mong muốn (hay còn gọi là đến 1 giá trị nào đó, cần làm bão hoà sự ảnh hưởng của một đại lượng để đảm bảo tính cân bằng cần thiết cho công thức tính score)

Công thức 
```
saturation(value,k) = value/(k + value)
```

Đồ thị:
![](https://images.viblo.asia/71d2cd90-d71e-4222-8f42-2d9a6b026c58.png)

Theo trên 0 < saturation < 1, nên chỉ cần xác định hệ số t (ngưỡng trên) thì có thể xác định giá trị bão hoà bằng t * saturation, VD: ko muốn ảnh hưởng của view vượt quá 5, thì 

```
score mới = score cũ + 5 * saturation(views, 1)
```

### 2.3 Dùng gauss function để nâng score theo ngưỡng tập trung.
Bạn muốn tạo tính năng search mà ở đó, chúng ta nâng score cho 1 phân vùng (VD: thời gian) nhất định, VD: chúng ta nâng score cho các note có thời gian cập nhật trong 24h gần đây, 
và càng gần thời điểm quan trọng (thời gian mà user mong muốn, trong gauss function chính là khái niệm origin) là (Ví dụ) **11/13/2020 @ 12:00am (UTC)**, càng xa thời điểm này, score càng giảm, scale trong khoảng 24h quanh thời điểm origin, ngoài khoảng scale này chúng ta ko cần chú ý nâng score nữa.

![](https://images.viblo.asia/e6c03653-995a-4619-b09d-92ae33b7786d.png)

![](https://images.viblo.asia/64eda74d-5622-4ea5-b078-04fedc3fd721.png)


```
GET wnote/_search
{
  "_source": ["_score", "shortContent.shortText", "views"],
  "query": {
    "function_score": {
      "query": {
        "match": {
          "rawTextSearch": "in"
        }
      },
      "functions": [
        {
          "gauss": {
            "updatedAt": {
              "origin": "1605225600000",
              "scale": "86400000",
              "offset": "3600000",
              "decay": 0.5
            }
          }
        }
      ],
      "score_mode": "sum",
      "boost_mode": "sum"
    }
  }
}
```


Các đại lượng thời gian mình quy đổi theo milisecond nhé :D 
24h => 86400000ms ...


## ...
Trên đây là một số usecase trong việc dùng function score, hy vọng các bạn có thể thấy 1 chút hữu ích :D