Tiếp nối 2 bài viết về Neo4j trong quá khứ  [Bài 1](https://viblo.asia/p/bat-dau-voi-neo4j-4P856Ny35Y3), [Bài 2](https://viblo.asia/p/neo4j-cypher-djeZ1PzQKWz), bài viết này sẽ dùng Neo4j để xem dữ liệu cá nhân tài khoản Twitter của mình.

Graph Your Network app là công cụ để giúp mình có thể xem được Twitter data của cá nhân. Theo như cách mô tả của họ thì họ có setup Neo4j Docker container cho mỗi một user, container này thì chạy trên ECS.

Khi người dùng visits địa chỉ trang web được public thì users được điểu hướng sang một trong các con instances neo4j-twitter-head để login tài khoản Twitter. Sau đó sẽ là bước login thành công và ủy quyền cho phép ứng dụng truy cập vào Twitter data.

Kế tiếp họ sẽ tạo một new instance dùng để chạy neo4j-twitter docker image, con này làm nhiệm vụ start Neo4j và chạy Python script để bắt đẩu đổ data từ Twitter vào trong Neo4j. Sau khi Neo4j đã đc khởi chạy thì credentials cũng sẽ được reset và một URL, username kèm password sẽ được đưa đến cho users. Các queries lấy data của mình thì sẽ được đảm nhiệm bởi con neo4j-twitter-head dùng thư viện của python py2neo.

Tổng quan về hệ thống:

![](https://images.viblo.asia/c50ac4c3-2e3e-456d-85be-1d72e590f426.png)

Mình sẽ truy cập con Neo4j sử dụng url, username và password mà họ cung cấp cho mình, con instance mà họ tạo cho mình chỉ tồn tại được trong vài ngày mà thôi, hình phía dưới là giao diện của Neo4j

![](https://images.viblo.asia/659b7d8e-6525-4cba-8d2f-5d0a9e30df37.png)


Cuối cùng sẽ là phần show mine personal Twitter account, trước khi đi vào chi tiết thì dưới đây là hình minh họa data model.

![](https://images.viblo.asia/f963b143-3730-48a8-8546-4ce6b25039d2.png)

Các hình tròn sẽ biểu diễn cho các Nodes, các hình mũi tên sẽ biểu diễn cho các Relationships giữa các nodes với nhau. Mình sẽ loading data Tweets từ Twitter API và sau đó bắt đầu truy vấn data....

1. Mình đang follow ai trên Twitter ?

```neo4j
MATCH(u:User)-[me_follows:FOLLOWS]->(followers:User)
RETURN followers
```

Kết quả: 

![](https://images.viblo.asia/825c8dca-99e5-4000-afd7-15ba1a99b737.png)


2. 10 hashtags mà mình đã dùng, với mỗi hashtags hãy đếm số lần nó xuất hiện ?

```neo4j
MATCH(h:Hashtag)<-[:TAGS]-(t:Tweet)<-[:POSTS]-(u:User:Me)
WITH h, COUNT(h) AS Hashtags
ORDER BY Hashtags DESC
LIMIT 10
RETURN h.name, Hashtags
```

Kết quả:

![](https://images.viblo.asia/eff3647b-306d-4746-8269-ac0e3fdfed65.png)

3. Top 10 Mine mentions ?

```neo4j
MATCH(u:Me:User)-[p:POSTS]->(t:Tweet)-[:MENTIONS]->(m:User)
WITH u,p,t,m, COUNT(m.screen_name) AS count
ORDER BY count DESC
RETURN u,p,t,m
LIMIT 10
```

Kết quả:

![](https://images.viblo.asia/01a52b7b-0a99-41c5-8833-84093929c917.png)

4. Top 10 tw với thời gian tạo tăng dần

```neo4j
MATCH(t:Tweet)
WHERE t.text is not Null
RETURN t.text
ORDER By t.created_at ASC
LIMIT 10
```

Kết quả:

![](https://images.viblo.asia/e6c4d3f0-5ec6-489e-a5a4-42f836613fe8.png)

5. Những text mà mình đã retweet 

```neo4j
MATCH(retw:Tweet)<-[:RETWEETS]-(t:Tweet)
RETURN t.text
```

Kết quả:

![](https://images.viblo.asia/939ef927-ca0b-4733-ae94-a69057e9ab0f.png)

6. Tỉ lệ Followback (tỉ lệ người ta follow lại mình khi mình follow người ta)

```neo4j
MATCH (me:User:Me)-[:FOLLOWS]->(f)
WITH me, f, size((f)-[:FOLLOWS]->(me)) as doesFollowBack
RETURN SUM(doesFollowBack) / toFloat(COUNT(f))  AS followBackRate
```

![](https://images.viblo.asia/f6ae5ea3-e056-422e-9bb2-5042b8cbabfd.png)

tỉ lệ thấp xịt @@

7. Đây là toàn bộ data đã được đồ thị hóa

![](https://images.viblo.asia/ae45096e-1901-48e6-8f8d-48fa33874d1f.png)

Tổng kết lại nhờ Neo4j thì mình biết được sau gần 2 năm dùng Twitter  thì mình đã follows 148 users, Post Tweets: 96 lần, Post Tweets kèm links: 33 lần, Post Tweets kèm hashtags: 12 lần, Post Tweets sử dụng source: 3 lần. được retweet: 3 lần.