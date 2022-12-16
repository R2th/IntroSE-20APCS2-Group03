![](https://images.viblo.asia/effed11c-e2ba-4535-83c6-d3052df6e27d.png)
 
 <br>
 <br>
 
[Các Trạng Thái Của Một Transaction Ethereum Và Cách Điều Hướng Chúng Bằng Dfuse](https://viblo.asia/p/cac-trang-thai-cua-mot-transaction-ethereum-va-cach-dieu-huong-chung-bang-dfuse-ByEZkV6yKQ0)

<br>

Như bài trước thì mình đã làm rõ được các trạng thái trong lifecycle của một transaction và giới thiệu về [Dfuse](https://www.dfuse.io/en). Hiện dfuse đang hỗ trợ cho 2 nền tảng là Ethereum và EOSIO thì trong bài viết này mình sẽ đi vào cách sử dụng của thằng dfuse trên nền tảng Ethereum.

# Tạo tài khoản free
### 1. đăng ký
Mọi người truy cập đến  https://app.dfuse.io để tạo tại khoản

![](https://images.viblo.asia/01eb2213-0088-4aa7-b46f-10eeb6ed34fb.png)


Tại thời điểm viết bài này thì mình không đăng ký (Sign Up) bằng email được có thể là do lỗi tạm thời của nhà phát triển. Ngoài cách đăng ký bình thường thì vẫn có 2 cách Oauth là bằng Google và Github, mình lựa chọn bằng google

![](https://images.viblo.asia/78c2a229-114d-49ce-8e6a-5caeece04309.png)

Điền các thông tin cần thiết và chọn "Create Account"

Sau khi tạo xong sẽ có giao diện như sau 

![](https://images.viblo.asia/db225830-4762-4527-8c24-5d6f046bd05e.png)

### 2. tạo API key

Truy cập https://app.dfuse.io/keys --> chọn "CREATE NEW KEY"

![](https://images.viblo.asia/99eb513d-17e8-4578-a872-37117e1911b9.png)

kết quả sẽ như sau

![](https://images.viblo.asia/7b34d524-2d71-4461-96d4-8ff148b7f327.png)

### 3. Các cách Authentication

Có 2 loại key trong cách sử dụng dfuse:
- Loại có thể tồn tại lâu API key - sẽ có dạng `server_abcdef123123123000000000000000000`, từ loại này thì có thể tạo ra được loại key tồn tại thời gian ngắn JWT.
- Loại tồn tại trong thời gian ngắn JWT - sẽ có dạng như sau:
    ```
   eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTYxMzI4MjAsImp0aSI6IjQwNWVmOTUxLTAwZTYtNGJmNC1hZWMxLTU0NTU1ZWMzMTUwMiIsImlhdCI6MTU1NjA0NjQyMCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiJ1aWQ6MHdlbnU2NmUwNzU4OWRhODY4MWNlIiwiYWtpIjoiM2NhYWEzYzA3M2FlZjVkMmYxOGUwNjJmZDkzYzg3YzMzYWIxYzA1YzEzNjI3NjU2OTgzN2Y5NDc5NzZlMjM0YSIsInRpZXIiOiJmcmVlLXYxIiwic3RibGsiOi0zNjAwLCJ2IjoxfQ.000HeTujIuS_LRvvPN6ZRCmtoZqZyV6P1enNBviwK8v7Tf7BLHJIrEpQoEREKSIMdZWPrMQl_OE55yJP0MxUDA
    ```
    
    
Thì từ API key chúng ta có thể lấy được JWT bằng cách tạo request lên `https://auth.dfuse.io/v1/auth/issue` 

```shell
    
curl -XPOST \
  -H "Content-Type: application/json" \
  --data '{"api_key":"<API-KEY>"}' \
  "https://auth.dfuse.io/v1/auth/issue"

```

Response trả về 

```json
    
{
  "token":"eyJhbGciOiJLTVNFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTYxMzI4MjAsImp0aSI6IjQwNWVmOTUxLTAwZTYtNGJmNC1hZWMxLTU0NTU1ZWMzMTUwMiIsImlhdCI6MTU1NjA0NjQyMCwiaXNzIjoiZGZ1c2UuaW8iLCJzdWIiOiJ1aWQ6MHdlbnU2NmUwNzU4OWRhODY4MWNlIiwiYWtpIjoiM2NhYWEzYzA3M2FlZjVkMmYxOGUwNjJmZDkzYzg3YzMzYWIxYzA1YzEzNjI3NjU2OTgzN2Y5NDc5NzZlMjM0YSIsInRpZXIiOiJmcmVlLXYxIiwic3RibGsiOi0zNjAwLCJ2IjoxfQ.000HeTujIuS_LRvvPN6ZRCmtoZqZyV6P1enNBviwK8v7Tf7BLHJIrEpQoEREKSIMdZWPrMQl_OE55yJP0MxUDA",
  "expires_at":1556132820
}
```

Hãy nhớ rằng loại JWT này sẽ có thời gian hết hạn, trường response `expires_at` ở trên chính là thời gian mà token này hết hạn. Vì vậy trước khi sử dụng chúng ta cần xem lại trường này xem ngày hiện tại đã hết hoặc gần hết chưa để tạo một token mới. Cách đơn giản để xem thời gian hết hạn là sử dụng các trang convert timestamp online [here](https://www.unixtimestamp.com/index.php)

<br>

##### REST Authentication

Đối với REST API chúng ta có thể set token vào header của request như sau

```shell
curl -H "Authorization: Bearer <YOURTOKENHERE>" -u https://mainnet.eos.dfuse.io/v0/state/... [ ... ]
```

<br>

##### WebSocket Authentication
Con trong websocket thì ta sử dụng như sau

```shell
ws wss://mainnet.eos.dfuse.io/v1/stream?token=<YOURTOKENHERE>
```

# Explore ETH thông qua dfuse

Cách tốt nhất để biết dfuse có thể làm được những gì đó chính là hãy dùng thử các tính năng của nó. **GraphiQL** là một công cụ cho phép bạn có thể viết và thực thi query GraphQL từ browser. Nó thì đã được tích hợp sẵn xác thực JWT ẩn danh nên vấn đề xác thực chúng ta không cần quan tâm, công việc bây giờ là cần tìm hiểu về [documented GraphQL schema ](https://docs.dfuse.io/reference/ethereum/graphql/) để có thể viết được các câu query như mong muốn. Cái này thì có hỗ trợ `Ctrl+<Space>` nha, để truy cập GraphiQL thì bấm vào link ảnh bên dưới.

[![](https://images.viblo.asia/f2e52f05-f6d6-464c-8b94-a052d4b510ec.png)](https://mainnet.eth.dfuse.io/graphiql/)

Dưới đây sẽ là một vài ví dụ

#### Fetch 

- Get thông tin của transaction bằng mã hash

    ```json
    {
      transaction(hash: "0x1f73b43dc9c48cc131a931fac7095de9e5eba0c5184ec0c5c5f1f32efa2a6bab") {
        from
        to
        gasPrice(encoding: ETHER)
      }
    }
    ```
[<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=ewogIHRyYW5zYWN0aW9uKGhhc2g6ICIweDFmNzNiNDNkYzljNDhjYzEzMWE5MzFmYWM3MDk1ZGU5ZTVlYmEwYzUxODRlYzBjNWM1ZjFmMzJlZmEyYTZiYWIiKSB7CiAgICBmcm9tCiAgICB0bwogICAgZ2FzVXNlZAogICAgZ2FzUHJpY2UoZW5jb2Rpbmc6IEVUSEVSKQogIH0KfQo=)

- Get block
  ```json
    {
      blockByNumber(number: 7280000) {
        hash
        header { parentHash difficulty }
      }
    }
    ```

[<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=ewogIGJsb2NrQnlOdW1iZXIobnVtYmVyOiA3MjgwMDAwKSB7CiAgICBoYXNoCiAgICBoZWFkZXIgewogICAgICBwYXJlbnRIYXNoCiAgICAgIGRpZmZpY3VsdHkKICAgIH0KICB9Cn0K)
    

#### Stream

- Stream blocks (sau mỗi 12s sẽ get về một lần)
  ```json
    subscription{
      blocks(lowBlockNum:-1){
        node{
          number hash
          transactionTraces { edges { node { hash } } }
          uncles { hash }
        }
      }
    }
    ```

[<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=c3Vic2NyaXB0aW9uIHsKICBibG9ja3MobG93QmxvY2tOdW06IC0xKSB7CiAgICBub2RlIHsKICAgICAgbnVtYmVyCiAgICAgIGhhc2gKICAgICAgdHJhbnNhY3Rpb25UcmFjZXMgewogICAgICAgIGVkZ2VzIHsKICAgICAgICAgIG5vZGUgewogICAgICAgICAgICBoYXNoCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9CiAgICAgIHVuY2xlcyB7CiAgICAgICAgaGFzaAogICAgICB9CiAgICB9CiAgfQp9Cg==)

- Stream transactions bằng câu lệnh query

    ```json
     subscription {
         searchTransactions(indexName: CALLS, query: "-value:0", lowBlockNum: -1) {
            undo cursor
            node {
              block { number }
              matchingCalls { from to value(encoding: ETHER) }
            }
          }
     }
    ```
    
#### Search

Các truy vấn tìm kiếm (hoặc stream data thông qua subscription GraphQL hay paginated phân trang thông qua GraphQL query) thì được xây dựng bằng [dfuse Search Query Language](https://docs.dfuse.io/guides/core-concepts/search-query-language/). Hãy xem tài liệu tại  [Ethereum Search Terms Reference](https://docs.dfuse.io/reference/ethereum/search-terms/) để biết danh sách đầy đủ các thuật ngữ sẽ được chấp nhận. 

Mọi người có thể truyền các truy vấn tìm kiếm nào vào trực tiếp  https://ethq.app hoặc truyền vào các phần tham số của phương thức `searchTransaction` trong GraphiQL.

![](https://images.viblo.asia/c284bbda-a7b3-4807-8f29-33b22810a936.png)


Dfuse thì có 2 kiểu indexe riêng biệt là: **CALLS** và **LOGS**

- Tìm kiếm các transactions có transfer ETHER( tức là amount khác 0) từ một địa chỉa hoặc đến một địa chỉ nào đó.

    ```ruby
    # with indexName = CALLS
    -value:0 (to:0x32be343b94f860124dc4fee278fdcbd38c102d88 OR
              from:0x32be343b94f860124dc4fee278fdcbd38c102d88)
    ```
    
[<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=ewogIHNlYXJjaFRyYW5zYWN0aW9ucyhpbmRleE5hbWU6IENBTExTLCBxdWVyeTogIih0bzoweDMyYmUzNDNiOTRmODYwMTI0ZGM0ZmVlMjc4ZmRjYmQzOGMxMDJkODggT1IgZnJvbToweDMyYmUzNDNiOTRmODYwMTI0ZGM0ZmVlMjc4ZmRjYmQzOGMxMDJkODgpIC12YWx1ZTowIiwgbG93QmxvY2tOdW06IDAsIGhpZ2hCbG9ja051bTogLTEsIGxpbWl0OiA1LCBzb3J0OiBERVNDKSB7CiAgICBlZGdlcyB7CiAgICAgIG5vZGUgewogICAgICAgIHZhbHVlKGVuY29kaW5nOiBFVEhFUikKICAgICAgICBoYXNoCiAgICAgICAgbm9uY2UKICAgICAgICBnYXNMaW1pdAogICAgICAgIGdhc1ByaWNlCiAgICAgICAgdG8KICAgICAgICBibG9jayB7CiAgICAgICAgICBudW1iZXIKICAgICAgICAgIGhhc2gKICAgICAgICAgIGhlYWRlciB7CiAgICAgICAgICAgIHRpbWVzdGFtcAogICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBtYXRjaGluZ0NhbGxzIHsKICAgICAgICAgIGluZGV4CiAgICAgICAgICBwYXJlbnRJbmRleAogICAgICAgICAgY2FsbFR5cGUKICAgICAgICAgIGZyb20KICAgICAgICAgIHRvCiAgICAgICAgICB2YWx1ZShlbmNvZGluZzogRVRIRVIpCiAgICAgICAgICBnYXNDb25zdW1lZAogICAgICAgICAgcmV0dXJuRGF0YQogICAgICAgICAgbG9ncyB7CiAgICAgICAgICAgIGFkZHJlc3MKICAgICAgICAgICAgdG9waWNzCiAgICAgICAgICAgIGRhdGEKICAgICAgICAgIH0KICAgICAgICAgIGJhbGFuY2VDaGFuZ2VzIHsKICAgICAgICAgICAgYWRkcmVzcwogICAgICAgICAgICBvbGRWYWx1ZShlbmNvZGluZzogRVRIRVIpCiAgICAgICAgICAgIG5ld1ZhbHVlCiAgICAgICAgICAgIHJlYXNvbgogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KfQo=)

[<p align="right" float="left">Try it on ETHQ</p>](https://ethq.app/search?q=-value%3A0%20%28to%3A0x32be343b94f860124dc4fee278fdcbd38c102d88%20OR%20from%3A0x32be343b94f860124dc4fee278fdcbd38c102d88%29)

- Tìm kiếm các giao dịch có chứa method `transfer(address, uint256)` trên token contract ERC-20 đã biết
    ```ruby
    # with indexName = CALLS
    method:'transfer(address,uint256)' to:0xdac17f958d2ee523a2206206994597c13d831ec7
    ```
    
    [<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=c3Vic2NyaXB0aW9uIHsKICBzZWFyY2hUcmFuc2FjdGlvbnMoaW5kZXhOYW1lOiBDQUxMUywgcXVlcnk6ICIodG86MHgzMmJlMzQzYjk0Zjg2MDEyNGRjNGZlZTI3OGZkY2JkMzhjMTAyZDg4IE9SIGZyb206MHgzMmJlMzQzYjk0Zjg2MDEyNGRjNGZlZTI3OGZkY2JkMzhjMTAyZDg4KSAtdmFsdWU6MCIsIGxvd0Jsb2NrTnVtOiAtNSwgaGlnaEJsb2NrTnVtOiAtMSwgc29ydDogQVNDKSB7CiAgICBjdXJzb3IKICAgIHVuZG8KICAgIG5vZGUgewogICAgICB2YWx1ZShlbmNvZGluZzogRVRIRVIpCiAgICAgIGhhc2gKICAgICAgbm9uY2UKICAgICAgZ2FzTGltaXQKICAgICAgZ2FzUHJpY2UKICAgICAgdG8KICAgICAgYmxvY2sgewogICAgICAgIG51bWJlcgogICAgICAgIGhhc2gKICAgICAgICBoZWFkZXIgewogICAgICAgICAgdGltZXN0YW1wCiAgICAgICAgfQogICAgICB9CiAgICAgIG1hdGNoaW5nQ2FsbHMgewogICAgICAgIGluZGV4CiAgICAgICAgcGFyZW50SW5kZXgKICAgICAgICBjYWxsVHlwZQogICAgICAgIGZyb20KICAgICAgICB0bwogICAgICAgIHZhbHVlKGVuY29kaW5nOiBFVEhFUikKICAgICAgICBnYXNDb25zdW1lZAogICAgICAgIHJldHVybkRhdGEKICAgICAgICBsb2dzIHsKICAgICAgICAgIGFkZHJlc3MKICAgICAgICAgIHRvcGljcwogICAgICAgICAgZGF0YQogICAgICAgIH0KICAgICAgICBiYWxhbmNlQ2hhbmdlcyB7CiAgICAgICAgICBhZGRyZXNzCiAgICAgICAgICBvbGRWYWx1ZShlbmNvZGluZzogRVRIRVIpCiAgICAgICAgICBuZXdWYWx1ZQogICAgICAgICAgcmVhc29uCiAgICAgICAgfQogICAgICB9CiAgICB9CiAgfQp9Cg==)
    
    [<p align="right" float="left">Try it on ETHQ</p>](https://ethq.app/search?q=method%3A%27transfer%28address%2Cuint256%29%27%20to%3A0xdac17f958d2ee523a2206206994597c13d831ec7&ts=1573141723074)

> Method cũng có thể được chỉ định với tiền tố 8 bit of hàm băm keccak, ví dụ: `method:a9059cbb` 

- Tìm kiếm các transaction được ký bởi một địa chỉ nhất định :

    ```ruby
    # with indexName = CALLS
    signer:0x59a5208B32e627891C389EbafC644145224006E8
    ```
    
    [<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=c3Vic2NyaXB0aW9uIHsKICBzZWFyY2hUcmFuc2FjdGlvbnMoaW5kZXhOYW1lOiBDQUxMUywgcXVlcnk6ICJzaWduZXI6MHg1OWE1MjA4QjMyZTYyNzg5MUMzODlFYmFmQzY0NDE0NTIyNDAwNkU4IiwgbG93QmxvY2tOdW06IDAsIGhpZ2hCbG9ja051bTogLTEsIGxpbWl0OiAxMCwgc29ydDogREVTQykgewogICAgY3Vyc29yCiAgICB1bmRvCiAgICBub2RlIHsKICAgICAgdmFsdWUoZW5jb2Rpbmc6IEVUSEVSKQogICAgICBoYXNoCiAgICAgIG5vbmNlCiAgICAgIGdhc0xpbWl0CiAgICAgIGdhc1ByaWNlCiAgICAgIHRvCiAgICAgIGJsb2NrIHsKICAgICAgICBudW1iZXIKICAgICAgICBoYXNoCiAgICAgICAgaGVhZGVyIHsKICAgICAgICAgIHRpbWVzdGFtcAogICAgICAgIH0KICAgICAgfQogICAgICBmbGF0Q2FsbHMgewogICAgICAgIGluZGV4CiAgICAgICAgcGFyZW50SW5kZXgKICAgICAgICBjYWxsVHlwZQogICAgICAgIGZyb20KICAgICAgICB0bwogICAgICAgIHZhbHVlCiAgICAgICAgZ2FzQ29uc3VtZWQKICAgICAgICByZXR1cm5EYXRhCiAgICAgICAgbG9ncyB7CiAgICAgICAgICBhZGRyZXNzCiAgICAgICAgICB0b3BpY3MKICAgICAgICAgIGRhdGEKICAgICAgICB9CiAgICAgICAgYmFsYW5jZUNoYW5nZXMgewogICAgICAgICAgYWRkcmVzcwogICAgICAgICAgb2xkVmFsdWUoZW5jb2Rpbmc6RVRIRVIpCiAgICAgICAgICBuZXdWYWx1ZQogICAgICAgIH0KICAgICAgICBzdG9yYWdlQ2hhbmdlcyB7CiAgICAgICAgICBrZXkKICAgICAgICAgIGFkZHJlc3MKICAgICAgICAgIG9sZFZhbHVlCiAgICAgICAgICBuZXdWYWx1ZQogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KfQo=)
    
   [ <p align="right" float="left">Try it on ETHQ</p>](https://ethq.app/search?q=signer%3A0x59a5208B32e627891C389EbafC644145224006E8)
   
 - Tìm kiếm các transaction cung cấp đầu vào cho một contract nhất định:

    ```ruby
    # with indexName = CALLS
    input.0:0x84ae8708798c74ef8d00f540c4012963955106ff to:0x06012c8cf97bead5deae237070f9587f8e7a266d
    ```
    
    
    [<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=c3Vic2NyaXB0aW9uIHsKICBzZWFyY2hUcmFuc2FjdGlvbnMoaW5kZXhOYW1lOiBDQUxMUywgcXVlcnk6ICJpbnB1dC4wOjB4ODRhZTg3MDg3OThjNzRlZjhkMDBmNTQwYzQwMTI5NjM5NTUxMDZmZiB0bzoweDA2MDEyYzhjZjk3YmVhZDVkZWFlMjM3MDcwZjk1ODdmOGU3YTI2NmQiLCBsb3dCbG9ja051bTogMCwgaGlnaEJsb2NrTnVtOiAtMSwgc29ydDogREVTQywgbGltaXQ6IDEpIHsKICAgIGN1cnNvcgogICAgdW5kbwogICAgbm9kZSB7CiAgICAgIGhhc2gKICAgICAgbm9uY2UKICAgICAgZ2FzTGltaXQKICAgICAgZ2FzUHJpY2UKICAgICAgdG8KICAgICAgYmxvY2sgewogICAgICAgIG51bWJlcgogICAgICAgIGhhc2gKICAgICAgICBoZWFkZXIgewogICAgICAgICAgdGltZXN0YW1wCiAgICAgICAgfQogICAgICB9CiAgICAgIG1hdGNoaW5nQ2FsbHMgewogICAgICAgIGluZGV4CiAgICAgICAgcGFyZW50SW5kZXgKICAgICAgICBjYWxsVHlwZQogICAgICAgIGZyb20KICAgICAgICB0bwogICAgICAgIHZhbHVlKGVuY29kaW5nOiBFVEhFUikKICAgICAgICBzdG9yYWdlQ2hhbmdlcyB7CiAgICAgICAgICBrZXkKICAgICAgICAgIGFkZHJlc3MKICAgICAgICAgIG9sZFZhbHVlCiAgICAgICAgICBuZXdWYWx1ZQogICAgICAgIH0KICAgICAgfQogICAgfQogIH0KfQo=)
    
   [ <p align="right" float="left">Try it on ETHQ</p>](https://ethq.app/search?q=input.0%3A0x84ae8708798c74ef8d00f540c4012963955106ff%20to%3A0x06012c8cf97bead5deae237070f9587f8e7a266d)
   
   
   
- Tìm kiếm các giao dịch khớp với một topic cụ thể trong **logs** của các cuộc gọi đến EVM:

    ```ruby
    # with indexName = LOGS
    topic.0:0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    ```
   
   [<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=c3Vic2NyaXB0aW9uIHsKICBzZWFyY2hUcmFuc2FjdGlvbnMoaW5kZXhOYW1lOiBMT0dTLCBxdWVyeTogInRvcGljLjA6MHhkZGYyNTJhZDFiZTJjODliNjljMmIwNjhmYzM3OGRhYTk1MmJhN2YxNjNjNGExMTYyOGY1NWE0ZGY1MjNiM2VmIiwgbG93QmxvY2tOdW06IDAsIGhpZ2hCbG9ja051bTogLTEsIHNvcnQ6IERFU0MsIGxpbWl0OiAxKSB7CiAgICBjdXJzb3IKICAgIHVuZG8KICAgIG5vZGUgewogICAgICBoYXNoCiAgICAgIG5vbmNlCiAgICAgIGdhc0xpbWl0CiAgICAgIGdhc1ByaWNlCiAgICAgIHRvCiAgICAgIGJsb2NrIHsKICAgICAgICBudW1iZXIKICAgICAgICBoYXNoCiAgICAgICAgaGVhZGVyIHsKICAgICAgICAgIHRpbWVzdGFtcAogICAgICAgIH0KICAgICAgfQogICAgICBtYXRjaGluZ0xvZ3MgewogICAgICAgIGFkZHJlc3MKICAgICAgICB0b3BpY3MKICAgICAgICBkYXRhCiAgICAgICAgYmxvY2tJbmRleAogICAgICAgIHRyYW5zYWN0aW9uSW5kZXgKICAgICAgfQogICAgfQogIH0KfQo=)
   

- Tìm kiếm các giao dịch khớp với một đoạn dữ liệu cụ thể (32 byte) trong **logs** của EVM:

    ```ruby
    # with indexName = LOGS
    data.0:0x0000000000000000000000004a220e6096b25eadb88358cb44068a3248254675
    ```
    
    [<p align="right">Try it on GraphiQL</p>](https://mainnet.eth.dfuse.io/graphiql/?query=c3Vic2NyaXB0aW9uIHsKICBzZWFyY2hUcmFuc2FjdGlvbnMoaW5kZXhOYW1lOiBMT0dTLCBxdWVyeTogImRhdGEuMDoweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDRhMjIwZTYwOTZiMjVlYWRiODgzNThjYjQ0MDY4YTMyNDgyNTQ2NzUiLCBsb3dCbG9ja051bTogMCwgaGlnaEJsb2NrTnVtOiAtMSwgc29ydDogREVTQywgbGltaXQ6IDEpIHsKICAgIGN1cnNvcgogICAgdW5kbwogICAgbm9kZSB7CiAgICAgIGhhc2gKICAgICAgbm9uY2UKICAgICAgZ2FzTGltaXQKICAgICAgZ2FzUHJpY2UKICAgICAgdG8KICAgICAgYmxvY2sgewogICAgICAgIG51bWJlcgogICAgICAgIGhhc2gKICAgICAgICBoZWFkZXIgewogICAgICAgICAgdGltZXN0YW1wCiAgICAgICAgfQogICAgICB9CiAgICAgIG1hdGNoaW5nTG9ncyB7CiAgICAgICAgYWRkcmVzcwogICAgICAgIHRvcGljcwogICAgICAgIGRhdGEKICAgICAgICBibG9ja0luZGV4CiAgICAgICAgdHJhbnNhY3Rpb25JbmRleAogICAgICB9CiAgICB9CiAgfQp9Cg==s)
    
    
# Bắt đầu nhanh với JavaScript
Bài demo này mình sẽ hướng dẫn trong môi trường node về cách để theo dõi khi có bất kỳ một transaction mới được gửi lên mạng. Dfuse hiện hỗ trợ cho Ethereum là mạng `mainnet` và `ropsten`. Chúng ta có thể test thử 2 mạng này

### 1. create project

```shell
mkdir -p example-dfuse-javascript
cd example-dfuse-javascript
npm init -y
```

### 2. get API key Dfuse

Như hướng dẫn get key ở trên mình xin phép không nhắc lại phần này nữa mọi người có thể kéo lên trên và thực hiện tương tự

### 3. add các thư viện cần thiết 


Install package dfuse

```shell
npm install @dfuse/client
```
    
    
Trong môi trường `nodejs` bạn sẽ cần thêm 2 thư viện nữa dó là `node-fetch` package phục vụ cho request HTTP và  `ws` phục vụ cho connect WebSocket.

```shell
npm install node-fetch ws
```
    
    
### 4. Create the client

Đầu tiên cần tạo một file main để cho ứng dụng có thể chạy. mình sẽ tạo file có tên `app.js`, sau khi tạo xong sẽ là các import và thiết lập API cho client

```js
// app.js

const { createDfuseClient } = require("@dfuse/client")

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY,
  network: "mainnet.eth.dfuse.io", // ở đây có thể để là ropsten nếu trong môi trường test
})
```

Để sử dụng đươc biện môi tường `DFUSE_API_KEY` như trên chúng ta cần tạo file biến môi trường `.env` và cài đặt thêm package `dotenv`
```shell
# file .env

# nhớ thay API-KEY của bạn vào đây nha
DFUSE_API_KEY=server_abcdef12345678900000000000 
```

### 5. Định nghĩa GraphQL operation

Đầu tiên hãy chúng ta cần định nghĩa GraphQL operation dưới dạng string mà chúng ta sẽ sử dụng để thực hiện subscription GraphQL. Ở đây chúng ta sẽ định nghĩa những thành phần nào mà ta muốn nhận về sau khi đã subscription.

```js
// app.js

...

const operation = `subscription($cursor: String!) {
  searchTransactions(indexName:CALLS, query:"-value:0 type:call", lowBlockNum: -1, cursor: $cursor) {
    undo cursor
    node { hash matchingCalls { from to value(encoding:ETHER) } }
  }
}`

...

```


Tiếp đến là chúng ta cần subscription GraphQL để  stream transfers. Sẽ cần sử dụng đến thao tác `searchTransactions` với query  `"-value:0 type:call"`. Query này có thể hiểu là sẽ nhận về tất cả các transaction gửi lên mạng mà trường `value` có gá trị khác `0`

```js
// app.js

...

async function main() {
  const stream = await client.graphql(operation, (message) => {
    if (message.type === "data") {
      const { undo, cursor, node: { hash, value, matchingCalls }} = message.data.searchTransactions
      matchingCalls.forEach(({ from, to, value }) => {
        console.log(`Transfer ${from} -> ${to} [${value} Ether]${undo ? " REVERTED" : ""}`)
      })

      stream.mark({ cursor })
    }

    if (message.type === "error") {
      console.log("An error occurred", message.errors, message.terminal)
    }

    if (message.type === "complete") {
      console.log("Completed")
    }
  })

  // Nó sẽ đợi đến khi nào srteam hoàn tất hoặc mãi mãi
  await stream.join()
  await client.release()
  
  main().catch((error) => console.log("Unexpected error", error))
}

...

```


### File app.js đầy đủ

```js
global.fetch = require('node-fetch');
global.WebSocket = require('ws');
const dotenv = require('dotenv');
dotenv.config();

const { createDfuseClient } = require('@dfuse/client');

const client = createDfuseClient({
  apiKey: process.env.DFUSE_API_KEY,
  // network: 'ropsten.eth.dfuse.io'
  network: 'mainnet.eth.dfuse.io'
});

const operation = `subscription($cursor: String!) {
    searchTransactions(indexName:CALLS, query:"-value:0 type:call", lowBlockNum: -1, cursor: $cursor) {
      undo cursor
      node { hash matchingCalls { from to value(encoding:ETHER) } }
    }
  }`;

async function main() {
  const stream = await client.graphql(operation, (message) => {
    if (message.type === 'data') {
      const {
        undo,
        cursor,
        node: { hash, value, matchingCalls }
      } = message.data.searchTransactions;
      matchingCalls.forEach(({ from, to, value }) => {
        console.log(`Transfer ${from} -> ${to} [${value} Ether]${undo ? ' REVERTED' : ''}`);
      });

      stream.mark({ cursor });
    }

    if (message.type === 'error') {
      console.log('An error occurred', message.errors, message.terminal);
    }

    if (message.type === 'complete') {
      console.log('Completed');
    }
  });

  await stream.join();
  await client.release();
}

main().catch((error) => console.log('Unexpected error', error));

```

kết qủa chạy ứng dụng sẽ như sau

![](https://images.viblo.asia/87f379fe-ff56-478e-90d5-c9aa155d0626.png)


### Track transaction lifecycle real-time
trong docs của dfuse thì có một mẫu và bài hướng dẫn chi tiết về cách tracking lifecycle của một transaction các bạn có thể đón đọc tại https://docs.dfuse.io/guides/ethereum/tutorials/lifecycle/

Và có thể xem chi tiết code bằng cách clone docs và vào thư mục như đường dẫn bên dưới đây

```shell
git clone https://github.com/dfuse-io/docs.git
cd docs/tutorials/eth/lifecycle
```
# Kết luận
Bài viết là những suy nghĩ và những tính năng hay mình chọn lọc được từ docs của dfuse rất mong có thể cho bạn cái nhìn tổng quát và biết cách sử dụng thằng này. Rất vui và hiện gặp lại các bạn trong những bài viết tiếp theo 

<br>
<br>

##### Nguồn : https://docs.dfuse.io/