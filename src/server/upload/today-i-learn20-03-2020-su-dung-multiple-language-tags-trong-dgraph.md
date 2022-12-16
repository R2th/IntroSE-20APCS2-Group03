# Lý do có series này 

Đơn giản là muốn nhờ Viblo note lại những kiến thức học được trong một ngày thôi. Đây không phải là các bài blog chia sẻ hoàn chỉnh nên mọi người có thể không cần để ý đến nó

# String và languages tags 

Tất cả các predicate kiểu string trong Dgraph đều được encode với UTF-8. Dgraph cũng support giá trị cho string với nhiều ngôn ngữ khác nhau. Khả năng đa ngôn ngữ đặc biệt hữu ích để xây dựng các tính năng, đòi hỏi chúng ta phải lưu trữ cùng một thông tin bằng nhiều ngôn ngữ. Build thử một graph cho ứng dụng review thực ăn đơn giản với các thành phần như sau:

![](https://docs.dgraph.io//images/tutorials/4/a-graph-model.jpg)

Graph phía trên bao gồm 3 thực thể là Food, Country và Comment và các liên hệ như sau:
* Tất cả các `food node` liên kết với `comment node` thông qua cạnh `review`
* Tất cả các `food node` liên kết với `country node` thông qua cạnh `origin`

Add thử một vài dữ liệu 


```json 
{
  "set": [
    {
      "food_name": "Hamburger",
      "review": [
        {
          "comment": "Tastes very good"
        }
      ],
      "origin": [
        {
          "country": "United states of America"
        }
      ]
    },
    {
      "food_name": "Carrillada",
      "review": [
        {
          "comment": "Sabe muy sabroso"
        }
      ],
      "origin": [
        {
          "country": "Spain"
        }
      ]
    },
    {
      "food_name": "Pav Bhaji",
      "review": [
        {
          "comment": "स्वाद बहुत अच्छा है"
        }
      ],
      "origin": [
        {
          "country": "India"
        }
      ]
    },
    {
      "food_name": "Borscht",
      "review": [
        {
          "comment": "очень вкусно"
        }
      ],
      "origin": [
        {
          "country": "Russia"
        }
      ]
    },
    {
      "food_name": "mapo tofu",
      "review": [
        {
          "comment": "真好吃"
        }
      ],
      "origin": [
        {
          "country": "China"
        }
      ]
    }
  ]
}

```

Ta thu được graph như sau

![](https://docs.dgraph.io//images/tutorials/4/a-full-graph.png)

Trong đó có 5 node xanh dương là `food node`, các node màu xanh lá biểu diễn `country node` và các node màu hồng biểu diễn `review node`

Giờ bật thử sang tab Schema để xem các kiểu dữ liệu đã được tự động detected 

![](https://docs.dgraph.io//images/tutorials/4/c-schema.png)

Chúng ta querry tất cả các `food node` kèm theo `review node` và `country node` tương ứng 

```json 
{
  food_review(func: has(food_name)) {
    food_name
      review {
        comment
      }
      origin {
        country
      }
  }
}
```

Và thu được kết quả như sau 
![](https://images.viblo.asia/ca9e3a44-4292-4a2c-8cd0-3176003d8ae7.png)

Các comment đã ở những ngôn ngữ khác nhau. Bây giờ lại muốn lấy tất cả các comment base trên ngôn ngữ nhất định. Ví dụ muốn lấy tất cácr comment bằng tiếng Nhật thì cần phải thêm một cái gọi là **language tags** 

Thêm  một vài dữ liệu với language tags 

```json 
{
  "set": [
    {
      "food_name": "Sushi",
      "review": [
        {
          "comment": "Tastes very good",
          "comment@jp": "とても美味しい",
          "comment@ru": "очень вкусно"
        }
      ],
      "origin": [
        {
          "country": "Japan"
        }
      ]
    }
  ]
}
```
Sử dụng language tags với cú pháp `@tag` sau tên của predicate tương ứng. Ví dụ như trên
* `comment@ru` là comment bằng  tiếng Nga
* `comment@ja` là comment bằng tiếng Nhật 
* `comment` mặc định bằng tiếng Anh 

Khi chạy thử thì sẽ thấy báo lỗi 

![](https://docs.dgraph.io//images/tutorials/4/d-lang-error.png)

Lỗi này do chưa cho phép predicate `comment` nhận chỉ thị ngôn ngữ. Vào trong Schema setting lại thì sẽ thêm được bình thường 

![](https://docs.dgraph.io//images/tutorials/4/e-update-lang.png)

**Chú ý:**
* Ví dụ trên add 1 comment nhưng cho 3 ngôn ngữ khác nhau chứ không phải là 3 comment khác nhau
* Có thể sử dung bất kì kí hiệu nào cho language tags tuy nhiên khuyến khích sử dụng theo ISO Standard code [tại đây](https://www.w3schools.com/tags/ref_language_codes.asp)

# Truy vấn sử dụng language tags 

Muốn sử dụng truy vấn trên string trước tiến cần phải add index vào các predicate cần truy vấn đã. Ở đây là `food_name`

![](https://docs.dgraph.io//images/tutorials/4/g-hash.png)

Sau đó để query với một language tags thì sử dụng câu truy vấn như sau 

```json 
{
  food_review(func: eq(food_name,"Sushi")) {
    food_name
    review {
      comment@jp
    }
  }
}
```

Thu được kết quả 

![](https://docs.dgraph.io//images/tutorials/4/i-japanese.png)

Để query tất cả comment bằng các ngôn ngữ khác nhau 

```json 
{
  food_review(func: eq(food_name,"Sushi")) {
    food_name
    review {
      comment@*
    }
  }
}
```
Thu được kết quả như sau 
![](https://docs.dgraph.io//images/tutorials/4/k-star.png)

Một vài kiểu query với lanuage tags khác được mô tả trong bảng sau 
![](https://images.viblo.asia/2448a48c-2267-4b95-8d7e-c06f7115acfc.png)

# Bình luận 
* Nhìn chung khá dễ dàng để triển khai đa ngôn ngữ 
* Cú pháp dễ dùng 
* Chưa có nhiều thứ mới lạ lắm, hi vọng sẽ tìm thấy trong bài tiếp theo của Dgraph Docs