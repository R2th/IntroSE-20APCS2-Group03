Nối tiếp Phần một về Schema Difinition Language của GraphQL, bài viết này trình bày tiếp các khái niệm được sử dụng để định nghĩa GraphQL Schema

## 1. Interfaces
 * Cũng giống như khái niệm **Interface** ở các language khác, trong GraphQL, một **Interface** là một **asbstract type** có thể bao gồm một tập nhất định các field mà các type khi **implement** nó cũng phải bao gồm các field đó.
 * Ví dụ, bạn có một interface `Character` đại diện cho bất kì nhân vật nào trong Star Wars

    ```GraphQL
    interface Character {
      id: ID!
      name: String!
      friends: [Character]
      appearsIn: [Episode]!
    }
    ```
    
    Bất kì type nào mà **Implements**  `Characters` cần phải có đầy đủ các trường trên với cùng tham số hay cùng type.
* Ví dụ, các type sau đây có thể implement `Character`

    ```graphQL
    type Human implements Character {
      id: ID!
      name: String!
      friends: [Character]
      appearsIn: [Episode]!
      starships: [Starship]
      totalCredits: Int
    }

    type Droid implements Character {
      id: ID!
      name: String!
      friends: [Character]
      appearsIn: [Episode]!
      primaryFunction: String
    }
    ```

    Cả 3 type này đều có tất cả các trường từ `Character` interface, đồng thời cũng có các trường bổ sung như `totalCredits`, `starships`, `primaryFunction` giúp xác định các loại Character cụ thể.

* **Interface** hữu ích khi mà bạn muốn trả về một object hay là một bộ các object, nhưng chúng lại có các trường khác nhau.
* Ví dụ, câu query sau sẽ sinh ra lỗi

    QUERY DEFINITION
    ```
    type Query {
      hero(episode: Episode): Character
    }
    ```
    
    CLIENT CALL QUERY
    ```GraphQL
    query HeroForEpisode($ep: Episode!) {
      hero(episode: $ep) {
        name
        primaryFunction
      }
    }
    ```
    VARIABLES
    ```JSON
    {
      "ep": "JEDI"
    }
    ```

    RESULT
    ```JSON
    {
      "errors": [
        {
          "message": "Cannot query field \"primaryFunction\" on type \"Character\". Did you mean to use an inline fragment on \"Droid\"?",
          "locations": [
            {
              "line": 4,
              "column": 5
            }
          ]
        }
      ]
    }
    ```
    

* Trường `hero` trả về một kiểu `Character`, nó có thể là `Human` hay `Droid` tùy thuộc vào biến `episode`. Trong câu query trên bạn chỉ có thể chỉ định trả về những field mà tồn tại trong `Character` interface, như vậy sẽ không có `primaryFunction` 
* Để yêu cầu trả về các trường trong một object type cụ thể, sử dụng **inline fragments**

    ![](https://images.viblo.asia/f9323cb9-6614-4d99-9c68-871541290b3d.png)

## 2. Union types
* Ví dụ
    ```GraphQL
    union SearchResult = Human | Droid | Starship
    ```
* Bất cứ khi nào chúng ta trả về một loại `Search Result` trong schema, SearchResult này có thể là một `Human`, `Droid`,  hoặc một `Starship`. Các thành phần của một **union type**  cần phải là một loại đối tượng cụ thể, không được là một **interface** hay là một **union** khác
* Khi phía client query một field mà trả về một union type là `SearchResult`, chúng ta cần phải sử dụng **inline fragment** để có thể query bất kì trường nào.

    CLIENT QERRY


    ```graphQL
    {
      search(text: "an") {
        __typename
        ... on Human {
          name
          height
        }
        ... on Droid {
          name
          primaryFunction
        }
        ... on Starship {
          name
          length
        }
      }
    }
    ```
    
    RESULT
    ```JSON

      "data": {
        "search": [
          {
            "__typename": "Human",
            "name": "Han Solo",
            "height": 1.8
          },
          {
            "__typename": "Human",
            "name": "Leia Organa",
            "height": 1.5
          },
          {
            "__typename": "Starship",
            "name": "TIE Advanced x1",
            "length": 9.2
          }
        ]
      }
    }
    ```

* Trường **__typename** là một **String** giúp bạn phân biệt sự khác nhau giữa các object type ở Client
* Ở ví dụ này, vì `Human` và `Droid` cùng implement một interface chung là `Character` nên bạn có thể query những trường chung của 2 object type này ở chỉ một chỗ mà không cần lặp lại các trường giống nhau ở mỗi type, ví dụ sau đây cho kết quả như bên trên:
    ```graphQL
    {
      search(text: "an") {
        __typename
        ... on Character {
          name
        }
        ... on Human {
          height
        }
        ... on Droid {
          primaryFunction
        }
        ... on Starship {
          name
          length
        }
      }
    }
    ```
    Lưu ý: Trường `name` vẫn phải được chỉ định đối với Starship bởi `Starship` không phải là một `Character`
    
## 3.Input types
* Từ đầu đến giờ, chúng ta chỉ nói về truyền vào một field các argument thuộc về kiểu scalar như enums hay strings. Tuy nhiên bạn có thể truyền argument là một object phức tạp. Điều này cực kì hữu ích khi bạn muốn truyền vào toàn bộ object để tạo cái gì đó.
* Trong GraphQL SDL,  **input types** nhìn sẽ giống một **object types** thông tường nhưng với keyword **input** thay vì **type**
    ```graphQL
    input ReviewInput {
      stars: Int!
      commentary: String
    }
    ```
* Ví dụ sử dụng **input type** trong một **mutation**

    MUTATION DEFINITION

    ```graphQL
    mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
      createReview(episode: $ep, review: $review) {
        stars
        commentary
      }
    }
    ```

    VARIABLES

    ```json
    {
      "ep": "JEDI",
      "review": {
        "stars": 5,
        "commentary": "This is a great movie!"
      }
    }
    ```

    RESULT

    ```json
    {
      "data": {
        "createReview": {
          "stars": 5,
          "commentary": "This is a great movie!"
        }
      }
    }
    ```
## 4. Kết luận
* Quan hai phần của chủ đề này, mình đã trình bày các khái niệm được sử dụng trong Schema Difinition Language. Mình tin là những khái niệm này đủ để bạn có thể tự định nghĩa một schema cơ bản của mình. Mong bài viết có ích đối với các bạn
* Nguồn tham khảo
    * https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51
    * https://graphql.org/learn/schema