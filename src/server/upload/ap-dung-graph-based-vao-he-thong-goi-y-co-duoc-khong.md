Chào mọi người, hôm nay mình sẽ chia sẻ cho mọi người về một bài toán mà mình nghĩ đa phần các doanh nghiệp đều quan tâm: hệ thống gợi ý. Ở bài viết này mình chia sẻ về các áp dụng **graph-based** vào hệ thống gợi ý.  Các công ty như amazon hay google, ... đều đã và đang áp dụng **graph-based** vào hệ thống gợi ý của công ty họ và mọi người cũng biết rồi đấy hệ thống gợi ý của những công ty này cực kỳ đỉnh luôn :D. Giờ thì bắt đầu thôi nào :D. 

# Ưu điểm của graph-based 

Đối với các hệ thống gợi ý truyền thống: lịch sử tương tác, lịch sử giao dịch của khách hàng đều được update theo lịch được quy định sẵn của công ty như mỗi ngày, mỗi tuần hay là mỗi tháng một lần, ... Sau mỗi lần cập nhật dữ liệu thì lại phải tiến hành re-trained lại model cho hệ thống gợi ý như vậy tốn khá nhiều thời gian và cũng làm cho doanh thu không tốt bằng nếu như  chúng ta có thể cập nhật realtime. Đối với graph database chúng ta có thể tính toán trong thời gian thực để có thể tương tác với khách hàng nhanh nhất có thể, giống như mang lại cho khách hàng cảm giác giống như đang nói chuyện với nhân viên bán hàng vậy, tăng tính cá nhân hóa của khách hàng. 


**Graph database** là một hệ thống quản lý trên mô hình dữ liệu đồ thị. Không giống như các databases khác, các mối quan hệ luôn được ưu tiên hàng đầu trong **graph database**. Với **graph based**  là sự biểu diễn, sử dụng và tồn tại các mối quan hệ giữa các phần tử dữ liệu. Ví dụ như với một user A rating cho bộ phim Naruto, Onepieces, .... thì chúng ta sẽ tạo đồ thị dữ liệu biểu diễn mối quan hệ giữa user A và  2 bộ phim Naruto và Onepieces. 


Về lý thuyết graph tác giả[ Phan Hoàng đã viết bài cực kỳ chi tiết ở đây](https://viblo.asia/p/deep-learning-graph-neural-network-a-literature-review-and-applications-6J3ZgP0qlmB) mọi người có thể tham khảo mình sẽ không đề cập về lý thuyết graph ở đây nữa :D. 

# Dữ liệu 
Ở đây mình sử dụng tập dữ liệu movielens 20M mọi người [downloads tại đây](https://grouplens.org/datasets/movielens/20m/). Dữ liệu gồm thông tin của users, movies, genres và dữ liệu users đã rated cho movies. 
![](https://images.viblo.asia/83c907fd-0333-43c4-afb5-b279e4833a19.png)
Hình: Ví dụ về graph quan hệ giữa user và movie của tập dữ liệu 20M 

## movies data
Dữ liệu movies có chứa thông tin của từng bộ phim: tên bộ phim và thể loại. 
```
movies_data = pd.read_csv("data/movies.csv")
movies_data.head()
```
![](https://images.viblo.asia/d2ff8959-8459-4a62-ab50-3c56ca5ad368.png)
Hình: thông tin của movies data 

## ratings data 
Dữ liệu rating là từng user đã rated cho các bộ phim có thang rating từ 1 -> 5. 
```
ratings_data = pd.read_csv("data/ratings.csv")
ratings_data.head()
```
![](https://images.viblo.asia/635e21b4-ca47-415a-8566-9780cd224036.png)
Hình: thông tin ratings data 
# Create graph cho dữ liệu movielens 20M 
Ở đây mình sử dụng neo4j để tạo graph database. 
## install neo4j 
Mọi người install neo4j theo [link này ](https://datawookie.netlify.app/blog/2016/09/installing-neo4j-on-ubuntu-16.04/). 
Đầu tiên phải install java trước 
```
sudo apt install default-jre default-jre-headless
sudo update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/bin/java
sudo update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac
```

Sau đó sẽ install neo4j 
```
wget --no-check-certificate -O - https://debian.neo4j.org/neotechnology.gpg.key | sudo apt-key add -
echo 'deb http://debian.neo4j.org/repo stable/' | sudo tee /etc/apt/sources.list.d/neo4j.list
sudo apt update
sudo apt install neo4j
```

Bật neo4j lên: 
```
sudo service neo4j start
```

Khi không muốn dùng nữa thì stop đi: 

```
sudo service neo4j stop
```
Để tạo graph database bằng code python thì bạn cài thêm package py2neo nữa: 

```
pip install py2neo==2020.0.0
```

Sau khi đã cài đặt xong thì chúng ta bắt đầu code thôi nào! let's go!

## Kết nối với Neo4j 
```
import csv
from py2neo import Graph, Node
import os
import time

HOST = os.environ.get("NEO4J_HOST", "localhost")
PORT = 7687
USER = "neo4j"
PASS = "neo4j" #default

graph = Graph("bolt://" + HOST + ":7687", auth=(USER, PASS))
```
## Tạo Node Movie
Bước đầu tiên để tạo graph relationship thì chúng ta phải tạo Node trước. Đầu tiên mình sẽ tạo node các movies :D 
```
def loadMovies():
    with open('data/movies.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        next(readCSV, None)  # skip header
        for i, row in enumerate(readCSV):
            createMovieNodes(row)

            if i >= 1000:
                break

def createMovieNodes(row):
    movieData = parseRowMovie(row)
    id = movieData[0]
    title = movieData[1]
    year = movieData[2]
    mov = Node("Movie", id=id, title=title, year=year)
    graph.create(mov)
def parseRowMovie(row):
        id = row[0]
        year = row[1][-5:-1]
        title = row[1][:-7]

        return (id, title, year)
```
```
loadMovies()
```
Sau khi tạo node thì bên trong neo4j sẽ hiển thị như dưới đây: 
![](https://images.viblo.asia/1af4e355-ef26-4eb6-9ba2-82cb5e85fbde.png)
Hình: Movies Node sau khi tạo 

## Tạo Node genres 
```
def createGenreNodes():
    allGenres = ["Action", "Adventure", "Animation", "Children's", "Comedy", "Crime",
                 "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror", "Musical",
                 "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western"]

    for genre in allGenres:
        gen = Node("Genre", name=genre)
        graph.create(gen)

```

```
createGenreNodes()
```
![](https://images.viblo.asia/54d32d93-27fa-4278-97a0-5d883cb936f7.png)
Hình: Genres Node sau khi tạo

## Tạo Genre & Movies relationships
```
def createGenreMovieRelationships(row):
    movieId = row[0]
    movieGenres = row[2].split("|")

    for movieGenre in movieGenres:
        graph.run('MATCH (g:Genre {name: {genre}}), (m:Movie {id: {movieId}}) CREATE (g)-[:IS_GENRE_OF]->(m)',
            genre=movieGenre, movieId=movieId)

def parseRowGenreMovieRelationships(row):
    movieId = row[0]
    movieGenres = row[2].split("|")

    return (movieId, movieGenres)
```
```
def loadGenreMovieRelationships():
    with open('data/movies.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        next(readCSV, None)  # skip header
        for i, row in enumerate(readCSV):
            createGenreMovieRelationships(row)

            if i >= 1000:
                break
```
```
loadGenreMovieRelationships()
```

Sau khi tạo **relationships giữa movies và genres** chúng ta sẽ có graph như hình dưới đây: 

![](https://images.viblo.asia/5b6e4db9-8586-4da9-bf71-f73a740cfb1d.png)
Hình: Tạo relationships giữa movies và genres

Sau khi mình thử click để xem mối quan hệ giữa **Comedy genre** với các bộ phim thì sẽ ra được hình như dưới đây. Nhìn mà rối tung đầu =))) 

![](https://images.viblo.asia/72c405a2-24bb-46b8-9e15-4fac1b51b6e8.png)
Hình: mối quan hệ giữa **Comedy genre** với các bộ phim

## Tạo relationship Rating
Ở đây có nghĩa là tạo graph quan hệ giữa user và movie dựa vào action rating của mỗi người dùng cho các bộ phim khác nhau. Dựa vào đây chúng ta có thể dễ dàng đưa ra gợi ý phim cho từng user. Mình sẽ tạo luôn user node ở đây luôn nhé :D. 
```
def createUserNodes(row):
    user = Node("User", id="User " + row[0])
    graph.merge(user, "User", "id")

def createRatingRelationship(row):
    ratingData = parseRowRatingRelationships(row)

    graph.run(
        'MATCH (u:User {id: {userId}}), (m:Movie {id: {movieId}}) CREATE (u)-[:RATED { rating: {rating}, timestamp: {timestamp} }]->(m)',
        userId=ratingData[0], movieId=ratingData[1], rating=ratingData[2], timestamp=ratingData[3])

def parseRowRatingRelationships(row):
    userId = "User " + row[0]
    movieId = row[1]
    rating = float(row[2])
    timestamp = row[3]

    return (userId, movieId, rating, timestamp)
```
```
def loadRatings():
    with open('data/ratings.csv') as csvfile:
         readCSV = csv.reader(csvfile, delimiter=',')
         next(readCSV, None) #skip header
         for i,row in enumerate(readCSV):
#              print(row)
             createUserNodes(row)
             createRatingRelationship(row)

             if (i >= 1000):
                 break
```
```
loadRatings()
```
Sau khi tạo xong ở browers của neo4j sẽ xuất hiện thêm Node Users và graph relationships **Rating**
![](https://images.viblo.asia/1e249748-fb65-4959-9395-2b3423412d09.png)
Hình: Node Users sau khi tạo 

![](https://images.viblo.asia/f2ffedb1-aab2-4483-9c96-325ae93df57e.png)
Hình: Ví dụ về một user đã rated các bộ phim 

# Recommendation system sử dụng graph-based
Sau khi tạo xong graph database mình sẽ bắt đầu với việc sử dụng để làm hệ thống gợi ý. Ở đây mình sử dụng theo hướng user-based và công thức tính độ tương đồng giữa 2 users ( ví dụ như user A xem phim Naruto và onepieces User B cũng xem onepieces và 1 vài bộ phim khác thì 2 users A và B có độ tương đồng là vì cùng xem onepieces)  mình sử dụng [Pearson Similarity ](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient) Sau đó mình sẽ sắp xếp lại theo thứ tự bộ phim có độ tương đồng cao nhất cho đến thấp nhất và lấy ra từ trên xuống để recommended cho user đó . 
![](https://images.viblo.asia/27461c16-ebf5-438d-a5b9-088b921ec6ab.png)
Hình: user-based 

Ở hình trên: 
Giả sử**User 1** xem các bộ phim: **movie 1**,**movie 2** và **movie 10**. **User 2** xem các bộ phim: **movie 2**, **movie 5**, **movie 6** và **movie 10**. Chúng ta có thể thấy rằng cả 2 **User 1** và **User 2** đều có điểm chung là xem phim: 
**movie 2** và **movie 10**. Vì vậy chúng ta sẽ gợi ý cho **User 1** thêm 2 bộ phim **movie 6** và **movie 5** nhưng để lựa chọn gợi ý bộ phim nào đẩy lên đầu tiên thì chúng ta sẽ sử dụng công thức pearson để tính điểm 2 movie này, tương tự với **User 2**.

Câu lệnh query mọi người có thể tham khảo tại [Build a Cypher Recommendation Engine](https://neo4j.com/developer/cypher/guide-build-a-recommendation-engine/). 
```
    rec = graph.run(
                    # Tính toán số movie được u1 rated và tính rating trung bình (u1_mean)
                    'MATCH (u1:User {id:{userid}})-[r:RATED]->(m:Movie) '
                    'WITH u1, avg(r.rating) AS u1_mean '
                    # Lấy ra những user có số bộ phim đều rated giống nhau lớn hơn 5 
                    'MATCH (u1)-[r1:RATED]->(m:Movie)<-[r2:RATED]-(u2) '
                    'WITH u1, u1_mean, u2, COLLECT({r1: r1, r2: r2}) AS ratings WHERE size(ratings) > 5 '
                    # Sau khi tìm được u2 => Tính rating trung bình của những bộ phim u2 rated 
                    'MATCH (u2)-[r:RATED]->(m:Movie) '
                    'WITH u1, u1_mean, u2, avg(r.rating) AS u2_mean, ratings '
                    'UNWIND ratings AS r '
                    # Tính dựa theo công thức pearson 
                    'WITH sum( (r.r1.rating-u1_mean) * (r.r2.rating-u2_mean) ) AS nom, '
                    'sqrt( sum( (r.r1.rating - u1_mean)^2) * sum( (r.r2.rating - u2_mean) ^2)) AS denom, u1, u2 WHERE denom <> 0 '
                    'WITH u1, u2, nom/denom AS pearson '
                    'ORDER BY pearson DESC LIMIT 10 '
                    # Lấy hết tất cả các bộ phim từ u2 nhưng u1 chưa từng rated
                    'MATCH (u2)-[r:RATED]->(m:Movie) WHERE NOT EXISTS( (u1)-[:RATED]->(m) ) '
                    # Dựa và số movies bạn muốn lấy ra bao nhiêu để recommended cho u1 thì chúng ta lấy trên xuống khi đã tính toán score
                    'RETURN m.title AS title, SUM( pearson * r.rating) AS score '
                    'ORDER BY score DESC LIMIT toInt({n});', userid=userid, n=n)
                    
```

Tiếp theo chúng ta thử recommended xem thế nào nhé 
```
userid = 'User 1'
n = 10
```

Sau đây là 10 bộ phim được recommeded cho **User 1**:

![](https://images.viblo.asia/0f0faa4c-84bb-423c-922b-ccff456c249f.png)
Hình: !0 bộ phim recommeded cho User 1

# Kết Luận 
Cảm ơn mọi người đã đọc bài viết của mình, mong nhận được sự góp ý của mọi người. Bên cạnh đó nếu bài viết hữu ích thì ngại gì không cho mình 1 Upvoted.  

# Reference
https://www.kernix.com/article/an-efficient-recommender-system-based-on-graph-database/

https://github.com/tkcsdvd/neo4j-movielens

https://neo4j.com/docs/