![](https://images.viblo.asia/fc39fa39-38b4-411a-a575-279c96306433.png)

# 1. Fragment trong GraphQL là gì?
* Trong GraphQL có một khái niệm hay được sử dụng là **Fragment**. Trong bài viết ngày hôm nay chúng ta hãy cùng đi tìm hiểu khái niệm này là như thế nào nhé.
* Một GraphQL Fragment là một phần tử có thể tái sử dụng trong **GraphQL Query**.
* Trong GraphQL sẽ có những lúc bạn gặp phải những tình huống mà bạn cần phải query các **field** giống nhau trong các câu query khác nhau. Khi mà bạn nhận thấy các câu query của bạn có nhiều các field bị lặp lại tại nhiều vị trí khác nhau. Bạn có thể tóm chúng lại thành một đơn vị có thể tái sử dụng gọi là **Fragment**.
* Một GraphQL Fragment cho phép bạn khai báo một bộ các field và sử dụng chúng trong nhiều câu query. Bạn có thể liên tưởng **Fragment** trong GraphQL có nét tương đồng như là **function** trong nhiều ngôn ngữ lập trình. Bạn khai báo function ở một chỗ và bạn gọi đến function ở nhiều chỗ dùng đến nó. Chúng đều là các phần tử tái sử dụng được.
# 2. Các thành phần của một Fragment
* Chúng ta hãy đi vào tìm hiểu các thành phần của một Fragment với cấu trúc mẫu bên dưới
    ```graphQL
    fragment Name on TypeName {
      field1
      field2
      field3
    }
    ```
* Một Fragment sẽ bao gồm 3 thành phần sau
    * Name: Tên riêng biệt cho 1 Fragment (mỗi một Fragment có 1 tên riêng)
    * TypeName: Kiểu của object trong **GraphQL Schema** mà Fragment được tạo ra từ đó, hay được lồng trong đó
    * Body: Body của Fragment định nghĩa các trường nào sẽ được query (field1, field2, field3)
# 3. Lợi ích của việc sử dụng GraphQL Fragment
Tại sao Fragment lại là một khái niệm rất "cool" trong GraphQL
* Thứ nhất, bởi tính tái sử dụng của Fragment: Với Fragment, bạn có thể cấu trúc các câu query của bạn thành các phần tử có thể sử dụng được ở nhiều chỗ mà không cần phải viết lặp đi lặp lại.
* Caching: **GraphQL Client** tận dụng các **Fragment** để cung cấp các option caching. Xem thêm apollographql.com/docs/react/caching/cache-interaction/
# 4. Tạo GraphQL Fragment
* Chúng ta hãy cùng học cách tạo một GraphQL Fragment qua một vài ví dụ nhé. Trong những ví dụ trong bài viết này, mình sử dụng [Github's public API](https://docs.github.com/en/graphql) và viết query dựa trên nó. Bạn cũng có thể chạy các câu query trên [Github GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)
    ```graphql
    {
      googleRepo: repository (owner:"google", name:"WebFundamentals") {
        name
        owner {
          id,
          avatarUrl
          resourcePath
          url
        }
      }
      facebookRepo: repository (owner:"facebook", name:"react") {
        name
        owner {
          id,
          avatarUrl
          resourcePath
          url
        }
      }
    }
    ```
    
    Chúng ta nhận thấy ở đây là chúng ta đang query cùng các field bên trong field `owner` nhiều lần. Đây là lúc thích hợp để chúng ta sử dụng **Fragment**
* Chúng ta sẽ tạo một fragment gọi là `ownerInfo` với từ khoá `fragment`. Để tạo một Fragment chúng ta phải nói cho GraphQL biết rằng Fragment này được tạo ra trên **field** nào. Trong trường hợp này, chúng ta sẽ tạo 1 Fragment trên field`RepositoryOwner`
* Trong Body của Fragment, chúng ta có thể bao gồm tất cả các field của đối tượng `RepositoryOwner`. Ở đây chúng ta định nghĩa các field là `id`, `avatarUrl`, `resourcePath`, `url` là các field của fragment `ownerInfo`
    ```graphql
    // fragment ownerInfo for RepositoryOwner fields
    fragment ownerInfo on RepositoryOwner {
      id
      avatarUrl
      resourcePath
      url
    }
    ```
# 5. Sử dụng một GraphQL Fragment
* Chúng ta có thể sử dụng Fragment mà chúng ta sử dụng ở ví dụ trước trong phạm vi một query bằng việc sử dụng toán tử `...` và theo sau là tên của Fragment
    ```graphql
    // GraphQL Query with fragments

    {
      googleRepo: repository(owner: "google", name: "WebFundamentals") {
        name
        owner {
          ...ownerInfo //fragment
        }
      }
      facebookRepo: repository(owner: "facebook", name: "react") {
        name
        owner {
         ...ownerInfo //fragment
        }
      }
    }
    ```
* Response của query khi chúng ta sử dụng Fragment sẽ không thay đổi so với khi chúng ta không sử dụng Fragment. Fragment chỉ đơn giản là làm cho câu query được clean hơn, dễ đọc, và tái sử dụng
    ```json
    // GraphQL JSON Response

    {
      "data": {
        "googleRepo": {
          "name": "WebFundamentals",
          "owner": {
            "id": "MDEyOk9yZ2FuaXphdGlvbjEzNDIwMDQ=",
            "avatarUrl": "https://avatars1.githubusercontent.com/u/1342004?v=4",
            "resourcePath": "/google",
            "url": "https://github.com/google"
          }
        },
        "facebookRepo": {
          "name": "react",
          "owner": {
            "id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
            "avatarUrl": "https://avatars3.githubusercontent.com/u/69631?v=4",
            "resourcePath": "/facebook",
            "url": "https://github.com/facebook"
          }
        }
      }
    }
    ```
# 6. Kết luận
* Fragment là một khái niệm rất thú vị trong GraphQL, nó cho phép tái sử dụng trong khi viết các câu query, loại bỏ các đoạn mã phải viết đi viết lại, giúp các câu query dễ đọc dễ hiểu hơn. Mong qua bài viết này, các bạn sẽ hiểu hơn về khái niệm Fragment và có thể sử dụng Fragment khi viết GraphQL Schema cũng như không bỡ ngỡ mỗi khi đọc Schema có sử dụng Fragment
* Nguồn tham khảo
    * https://blog.logrocket.com/graphql-fragments-explained/
    * https://graphql.org/learn/queries/#fragments