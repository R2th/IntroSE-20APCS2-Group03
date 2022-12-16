# Lý do có series này
Đơn giản là muốn nhờ Viblo note lại những kiến thức học được trong một ngày thôi. Đây không phải là các bài blog chia sẻ hoàn chỉnh nên mọi người có thể không cần để ý đến nó

# Modeling Tweeter với Dgraph 
## Phân tích chút 
Đầu tiên phải xem một Tweeter message thì có format như thế nào. Nó trông như thế này 

![](https://images.viblo.asia/9e41e33d-1658-4427-90c2-41110b560040.png)

Ta thấy để tweet trên có các thành phần, có thể chia thành các entities:
* **Author**: chính là user có tên **Karthic Rao** tên đăng nhập `@hackintoshrao`
* **Body** chính là nội dung của tweet đó 
* **Hash tags** là các tags liên quan đến tweet đó như bên trên là `#GraphDB` và `#GraphQL` 
* **Mention** một tweet có thể mention đến một tweeter user khác như trong hình trên là mention đến thằng `@dgraphlabs` và thằng `@francesc`
## Thiết kế database 
### Dựng các nodes 
Dễ dàng nhận thấy có thể xây dựng database cho ứng dụng trên bao gồm 3 nodes:
* **User node** biểu diễn thông tin của User cũng chính là biểu diễn Author và các thằng được mention 
* **Tweet node** biểu diễn thông tin của một tweet 
* **Hashtag node** biểu diễn thông tin của một tag 
Dựng sẵn 3 node lên trước sau đó ta sẽ vẽ relation giữa*  chúng 

![](https://docs.dgraph.io//images/tutorials/5/a-nodes.jpg)
### Dựng các relation 

Xây dựng các relation tức là đi tìm các cạnh liên kết giữa các node với nhau. Dễ thấy 
* `Tweet` và `User` có quan hệ hai chiều tức là một User sẽ là tác giả của một Tweet (authored) và một Tweet sẽ mention đến nhiều User (mentioned)

![](https://docs.dgraph.io//images/tutorials/5/a-tweet-user.jpg)

* `Tweet` và `Hashtag` node cũng sẽ có quan hệ. Một Tweet sẽ được tag với các Hashtag với relationship `tagged_with`

![](https://docs.dgraph.io//images/tutorials/5/a-tagged.jpg)

Đây là biểu đồ mô hình giống như tweet phía trên 

![](https://docs.dgraph.io//images/tutorials/5/c-tweet-model.jpg)


## Tạo thử database 
Tạo thử thôi 
```json 
{
  "set": [
    {
      "user_handle": "hackintoshrao",
      "user_name": "Karthic Rao",
      "uid": "_:hackintoshrao",
      "authored": [
        {
          "tweet": "Test tweet for the fifth episode of getting started series with @dgraphlabs. Wait for the video of the fourth one by @francesc the coming Wednesday!\n#GraphDB #GraphQL",
          "tagged_with": [
            {
              "uid": "_:graphql",
              "hashtag": "GraphQL"
            },
            {
              "uid": "_:graphdb",
              "hashtag": "GraphDB"
            }
          ],
          "mentioned": [
            {
              "uid": "_:francesc"
            },
            {
              "uid": "_:dgraphlabs"
            }
          ]
        }
      ]
    },
    {
      "user_handle": "francesc",
      "user_name": "Francesc Campoy",
      "uid": "_:francesc",
      "authored": [
        {
          "tweet": "So many good talks at #graphqlconf, next year I'll make sure to be *at least* in the audience!\nAlso huge thanks to the live tweeting by @dgraphlabs for alleviating the FOMO😊\n#GraphDB ♥️ #GraphQL",
          "tagged_with": [
            {
              "uid": "_:graphql"
            },
            {
              "uid": "_:graphdb"
            },
            {
              "hashtag": "graphqlconf"
            }
          ],
          "mentioned": [
            {
              "uid": "_:dgraphlabs"
            }
          ]
        }
      ]
    },
    {
      "user_handle": "dgraphlabs",
      "user_name": "Dgraph Labs",
      "uid": "_:dgraphlabs",
      "authored": [
        {
          "tweet": "Let's Go and catch @francesc at @Gopherpalooza today, as he scans into Go source code by building its Graph in Dgraph!\nBe there, as he Goes through analyzing Go source code, using a Go program, that stores data in the GraphDB built in Go!\n#golang #GraphDB #Databases #Dgraph ",
          "tagged_with": [
            {
              "hashtag": "golang"
            },
            {
              "uid": "_:graphdb"
            },
            {
              "hashtag": "Databases"
            },
            {
              "hashtag": "Dgraph"
            }
          ],
          "mentioned": [
            {
              "uid": "_:francesc"
            },
            {
              "uid": "_:dgraphlabs"
            }
          ]
        },
        {
          "uid": "_:gopherpalooza",
          "user_handle": "gopherpalooza",
          "user_name": "Gopherpalooza"
        }
      ]
    }
  ]
}

```

Đây là đồ thị vừa mới xây dựng 
![](https://docs.dgraph.io//images/tutorials/5/x-all-tweets.png)

Trong đó nút xanh dương là `user node` nốt xanh lá cây là `tweet node` còn node màu tìm là `hashtag node`

Query thử lấy ra danh sách những user 

```json 
{
  tweet_graph(func: has(user_handle)) {
     user_handle
  }
}
```

![](https://docs.dgraph.io//images/tutorials/5/j-users.png)

Query thêm cả các tweet và hashtag tương ứng 

```json 
{
  tweet_graph(func: has(user_handle)) {
  	user_handle
    authored {
      tweet
      tagged_with {
        hashtag
      }
    }
  }
}
```
thu được kết quả 
![](https://docs.dgraph.io//images/tutorials/5/y-author-tweet.png)

## Đánh index 

### Hash index 

Bây giờ muốn search với các user_handle nhất định thì cần phải đánh index. Ở đây search chính xác nên cần phải đánh index `hash`
![](https://docs.dgraph.io//images/tutorials/5/k-hash.png)

Sau đó thêm vào câu query `eq(user_handle, "hackintoshrao")`

```json
{
  tweet_graph(func: eq(user_handle, "hackintoshrao")) {
  	user_handle
    authored {
      tweet
      tagged_with {
        hashtag
      }
    }
  }
}
```

Thu được kết quả 

![](https://images.viblo.asia/c8dae235-1eee-4fff-bc91-a7461e55abd3.png)

Sau đó muốn query thêm cả các thằng mentioned nữa thì thêm vào query 
```json 
{
  tweet_graph(func: eq(user_handle, "hackintoshrao")) {
     user_name
     authored {
      tweet
      tagged_with {
        hashtag
      }
      mentioned {
        user_name
      }
    }
  }
}
```

thu được kết quả 
![](https://docs.dgraph.io//images/tutorials/5/l-hash-query.png)
### Exact index 

**Hash index** chỉ hỗ trợ query `eq` trong khi muốn query `gt, ge, lt, le` thì cần phải dùng đến index dạng `exact`. Chuyển lại `user_handle` sang `exact` ta có 

![](https://docs.dgraph.io//images/tutorials/5/p-set-exact.png)

> **Lưu ý:** Mặc dù Dgraph cho phép thay đổi index nhưng hạn chế việc thay đổi vì khi thay đổi thì sẽ mất thời gian để đánh lại index cũng như tất cả các xử lý mutations (thêm, sửa, xoá) sẽ bị dừng lại trong quá trình đánh lại index 

Sau khi đánh lại index thì thu được kết quả như sau 
![](https://docs.dgraph.io//images/tutorials/5/q-exact-gt.png)

Theo thứ tự alphabet thì các node có `user_handle` lớn hơn `dgraphlabs` là `francesc, gopherpalooza` và `hackintoshrao`

### Term index 

`term` index cho phép chúng ta search nội dung cần tìm kiếm theo 1 hoặc nhiều keywords. Đầu tiên thử đánh index `term` cho predicate `tweet`

![](https://docs.dgraph.io//images/tutorials/5/r-term-set.png)

Dgraph cung cấp hai tuỳ chọn để query với `term index` đó là `allofterms` và `anyofterms`. Ngoài hai hàm trên ra thì `term index` chỉ support thêm operator là `eq` 

Find thử 

```json 
{
  find_tweets(func: anyofterms(tweet, "Go Graph")) {
    tweet
  }
}
```
câu truy vấn tìm tất cả các tweet có chứa từ `Go` hoặc `Graph`
Kết quả thu được 

```json
{
        "tweet": "Let's Go and catch @francesc at @Gopherpalooza today, as he scans into Go source code by building its Graph in Dgraph!\nBe there, as he Goes through analyzing Go source code, using a Go program, that stores data in the GraphDB built in Go!\n#golang #GraphDB #Databases #Dgraph "
}
```

![](https://docs.dgraph.io//images/tutorials/5/s-go-graph.png)

Ngược lại với `anyofterms` thì `allofterms` sẽ tìm tất cả các bài tweet mà chứa tất cả các keywords trong truy vấn 

```json 
{
  find_tweets(func: allofterms(tweet, "Go GraphQL")) {
    tweet
  }
}
```

Kết quả không có tweet nào 

![](https://docs.dgraph.io//images/tutorials/5/u-allofterms.png)

Thay thử từ khoá `Go` trong câu truy vấn bằng `graphdb` thì ta thu được 

![](https://docs.dgraph.io//images/tutorials/5/v-graphdb-graphql.png)

> **Chú ý:** query với term index bằng `allofterms` và `anyofterm` không phân biệt chữ hoa, chữ thường và được loại bỏ các kí tự đặc biệt ở đầu và cuối mỗi keywords 

# Tìm kiếm nâng cao 
## Full-text search 

Muốn chuyển sang mode `fulltext` thì thực hiện giống như các lần đánh index trước 

![](https://docs.dgraph.io//images/tutorials/6/a-set-index.png)

Sau đó hãy thử query 

```json 
{
  search_tweet(func: alloftext(tweet, "graph data and analyze it in graphdb")) {
    tweet
  }
}
```
ta thấy thu được kết quả 

![](https://docs.dgraph.io//images/tutorials/6/b-full-text-query-1.png)

Tương ứng với đoạn tweet sau 
![](https://images.viblo.asia/1531ae05-51ac-46ce-b868-a169b61c8017.png)

Có thể nhận thấy không phải tất cả các từ trong search string đều có mặt trong tweet matched. Đây là tác dụng của full text search 

## Tìm kiếm với regex 

Ngoài việc hỗ trợ tìm kiếm với các thể loại trên thì thằng Dgraph này còn hỗ trợ tìm kiếm với regex. Đầu tiên list tất cả các hashtag 

```json 
{
  hash_tags(func: has(hashtag)) {
    hashtag
  }
}
```

![](https://docs.dgraph.io//images/tutorials/6/has-hashtag.png)

Chúng ta thấy có tổng cộng 4 hash tag có chứa substring `graph` là `Dgraph, GraphQL, graphqlconf, graphDB` chúng ta có thể sử dụng built-in `regexp` để tìm kiếm các hashtag dạng này 
với cấu trúc sử dụng là `regexp(predicate, /regular-expression/)`. Cùng query thử 

```json 
{
  reg_search(func: regexp(hashtag, /^.*graph.*$/)) {
    hashtag
  }
}
```

![](https://docs.dgraph.io//images/tutorials/6/trigram-error.png)

Có vẻ như chúng ta đã quên mất đánh index `trigram` cho hashtag . 

![](https://docs.dgraph.io//images/tutorials/6/set-trigram.png)
Sau khi đánh index `trigram` xong thì query lại thu được kết quả 

![](https://docs.dgraph.io//images/tutorials/6/regex-query-1.png)


# Tổng kết và nhận xét

* Mô hình hoá một vấn đề khá đơn giản với graph 
* Query trực quan, thuận tiện cho việc phát triển backend.
* Hỗ trợ sẵn các kiểu index cho bài toán tìm kiếm string khá tiện, với mục đích tìm kiếm cơ bản thì chức năng cũng giống như một số third partty khác như Elasticsearch tuy nhiên chưa tìm hiểu được cách custom tokenizer cho đa ngôn ngữ hoặc config các thông số cho full text search 
* Nhìn chung thấy  chưa có nhiều điểm đặc sắc nên hi vọng sẽ có những khám phá mới mẻ hơn trong những ngày tới