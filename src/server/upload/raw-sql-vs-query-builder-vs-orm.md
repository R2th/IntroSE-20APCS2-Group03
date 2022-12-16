# Giới thiệu
Cơ sở dữ liệu là thành phần cốt lõi của việc lưu trữ trạng thái cho tất cả các trang web. Vì lí do đó, việc quan tâm đến sự tương tác dến cơ sở dữ liệu là vô cùng quan trọng để đảm bảo hệ thống luôn chạy ổn định. Cách tương tác phổ biến nhất với cơ sở dữ liệu quan hệ có lẽ là SQL - Structured Query Language. SQL làm cho việc chuyển đổi hệ thống hoặc client vô cùng đơn giản. Đơn giản là SQL ở mọi nơi. Bạn cần 1 driver cho cơ sở dữ liệu và sau đó bạn thể làm các phương thức CRUD điển hình : **C**reate, **R**ead, **U**pdate, **D**elete. 

Sau khi đọc xong bài viết này, bạn sẽ biết khi nào nên dùng raw SQL, query builder và một ORM. Bạn cũng biết cách để sử dụng từng loại đó trong Python.

# Raw SQL
![](https://images.viblo.asia/3319f199-9108-41d2-bfbd-9a22bf4f306e.jpeg)

Raw SQL thỉnh thoảng được gọi là native SQL, là cách thức cơ bản nhất, low-level nhất để tương tác với cơ sở dữ liệu. Bạn có thể nói với cơ sở dữ liệu điều nó cần phải làm với ngôn ngữ của cơ sở dữ liệu. Hầu hết các developer đều biết SQL cơ bản. Đó là, tạo bảng, view, cách SELECT và JOIN dữ liệu, cách UPDATE, DELETE dữ liệu. Những thứ phức tạp hơn như stored-procedures, T-SQL, PL-SQL, kiến thức sâu về indices vvaf ảnh hưởng của chúng, bạn sẽ khó khăn hơn để tìm những người có kiến thức như vậy. SQL có sức mạnh hơn nhiều developer nghĩ. 

Để minh họa vấn đề với việc sử dụng raw SQL, chúng ta sẽ lấy ví dụ về một cổng thông tin sách. Người dùng có thể nhìn thấy dũ liệu về các quyển sách( tiêu đề, ngôn ngữ, tác giả )

![](https://images.viblo.asia/3915dccc-b82e-4657-af8a-377db5143d3d.png)

Trên trang tác giả, chúng ta đưa ra một `authors.id` và muốn xem danh sách tất cả `books.title` được viết bởi tác giả đó:
```python
import os
from typing import List

import pymysql.cursors


def db_connection(f):
    """
    Supply the decorated function with a database connection.
    Commit/rollback and close the connection after the function call.
    """

    def with_connection_(*args, **kwargs):
        con = pymysql.connect(
            host="localhost",
            user=os.environ["DB_USER"],
            password=os.environ["DB_PASSWORD"],
            db="books",
        )
        try:
            rv = f(con, *args, **kwargs)
        except Exception:
            con.rollback()
            raise
        else:
            con.commit()
        finally:
            con.close()

        return rvcự

    return with_connection_


@db_connection
def get_titles_by_author(con, author_id: int) -> List[str]:
    cur = con.cursor(pymysql.cursors.DictCursor)
    cur.execute(f"SELECT * FROM books WHERE author_id = %s", author_id)
    titles = [row["title"] for row in cur.fetchall()]
    return titles


if __name__ == "__main__":
    print(get_titles_by_author(1))
```

Decorator là một tiện ích code mà dự án sẽ sử dụng rất nhiều.
Về mặc tích cực chúng ta có thể thấy rõ ràng chúng ta đang làm những gì với raw SQL. Bạn chỉ cần chút hiểu biết về Python và SQL. Bạn không cần hiểu sâu về các thư viện thứ 3. Tuy nhiên có tới ít nhất 6 mặt tiêu cực về việc sử dụng raw SQL mà chúng ta cần ý thức được.

### Vấn đề 1: SQL injections
![](https://images.viblo.asia/6e3ae4c0-4a71-4c1f-8843-9953f32611d1.png)

SQL Injection là một hình thức tấn công dịch vụ khi sử dụng truy vấn SQL, khi đó kẻ tấn công có thể sử dụng truy vấn SQL cho các mục đích khác nhau. Ví dụ:
`sql = "SELECT user_id FROM users WHERE name='{name}' AND pw='{pw}';"`

Với một cách tiếp cận như vậy, kẻ tấn công có thể điền `' OR name='admin' AND '1'='1` cho cột `pw` và rỗng cho tên. Chúng ta sẽ có câu query sau: 
```sql
SELECT user_id 
FROM users
WHERE name='' AND pw=''
OR name='admin' AND '1'='1'
```
Điều này đơn giản nói cho ứng dụng biết rằng chúng ta cần thông tin của các admin. 

Tất nhiên việc escaping dấu nháy, và bạn không trực tiếp sử dụng dữ liệu được nhập từ người dùng là điều bạn nên làm. Nhưng nhiều developers vẫn phạm sai lầm. Raw SQL rất để để mắc sai lầm này.

### Vấn đề 2: Lỗi cú pháp trong câu lệnh SQL
Các cân truy vấn không thể trực tiếp được phát hiện bởi làm :
`sql = "SELECT * FROM books;"`

### Vấn đề 3: Thiếu sự trợ giúp từ Editor
Điều này vẫn là 1 vấn đề mở với nhiều ngôn ngữ/editor: Khi developer viết câu SQL của họ trong 1 string, làm thế nào editor biết strings cần được phân tích. Làm thế nào editor biết họ muộn highlight syntax, ...
Bạn có thể vừa thấy ví dụ ở trên syntax-highlight bị thiếu, nhưng đây là ảnh chụp màn hình của vài editor phổ biến :

![](https://images.viblo.asia/2ca19641-a0f2-4cf3-a331-6c89f16084c4.png)

Ngược lại, đây là câu query tương tự trong file `query.sql`: 

![](https://images.viblo.asia/36b6874a-9cac-404d-a7b4-43455bed0148.png)

Như vậy có thể thấy các editor trên không nhận diện đoạn string chứa SQL.

### Vấn đề 4: Lỗi tên bảng, cột
`sql = "SELECT * from boks;"`
Các lỗi này rất khó để tìm ra ví đơn giản đó là 1 chuỗi thuần.

### Vấn đề 5: Quản lí thay đổi
Cơ sỡ dữ liệu thay đổi theo thời gian. Với raw SQL, bạn không có sự trợ giúp cho việc đó. Bạn phải tự viết lại các câu raw SQL của mình.

### Vấn đề 6: Tiện ích mở rộng của câu truy vấn
Nếu bạn có câu truy vấn để thực hiện mục đích phân tích dữ liệu, sẽ thật là tuyệt vời nếu bạn có thể áp dụng sự thay đổi nhỏ lên nó. Ví dụ một hệ thống tracking nơi bạn muốn biết một button được người dùng click bao nhiêu lần. Giả sử bạn có một câu truy vấn làm cơ sở. Tùy từng hoàn cảnh bạn có thể lọc theo những đặc điểm kĩ  thuật khác nhau. Chúng ta cỏ thể mở rộng câu truy vấn ban đầu nhưng điều đó là rất cồng kềnh. 

# Query Builder
Những thư viện được viết trong các ngôn ngữ lập trình mà bạn dùng các class, function tạo ra các câu truy vấn SQL gọi là *query builder*. Các câu raw SQL có thể viết lại bằng cách sử dụng chuỗi hàm.
```sql
query = Query.from_(books) \
             .select("*") \
             .where(books.author_id == aid)
```

Pypika là thư viện query builder trong Python. Ví dụ ở trên có thể được viết lại như sau:

```python
# Core Library modules
from typing import List

# Third party modules
import pymysql.cursors
from pypika import Query, Table

# First party modules
from raw_sql import db_connection


@db_connection
def get_titles_by_author(con, author_id: int) -> List[str]:
    books = Table()
    q = Query.from_(books).select("*").where(books.author_id == author_id)
    cur = con.cursor(pymysql.cursors.DictCursor)
    query = q.get_sql(quote_char=None)
    cur.execute(query)
    titles = [row["title"] for row in cur.fetchall()]
    return titles


if __name__ == "__main__":
    print(get_titles_by_author(1))
```

Lưu ý rằng, kết quả truy vấn vẫn giống với raw SQL. Chúng ta chỉ xây dựng lại cách sinh ra các câu truy vấn. Qúa trình xây dựng các câu query không phức tạp do đó hiệu năng của ứng dụng nhìn về mặt tổng thể vẫn được giữ nguyên.

Như các bạn có thể thấy query builder sẽ phòng tránh các lỗi sai đến từ khóa query `select`, `from`, `where`. Query Bulder giải quyết được vấn 1, 2, 3 nhưng chưa giải quyết được vấn đề 4, 5.

# ORM: Object-Relational Mapper
ORMs tạo ta một object cho mỗi bảng trong cơ sở dữ liệu. 
ORMs thực sự rất phổ biến trong nhiều ngôn ngữ : Java có Hibernate, PHP có Eloquent, Ruby có activerecord, Python có SQLAlchemy, ...

Sau đây là ví dụ với SQLAlchemy:

```python
# Core Library modules
import os
from typing import List

# Third party modules
import sqlalchemy
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


def db_connection(f):
    """
    Supply the decorated function with a database connection.
    Commit/rollback and close the connection after the function call.
    """

    def with_connection_(*args, **kwargs):
        # https://martin-thoma.com/sql-connection-strings/
        user = os.environ["DB_USER"]
        password = os.environ["DB_PASSWORD"]
        engine = create_engine(f"mysql+pymysql://{user}:{password}@localhost/books")
        Session = sessionmaker(bind=engine)
        session = Session()
        try:
            rv = f(session, *args, **kwargs)
        except Exception:
            session.rollback()
            raise
        else:
            session.commit()
        finally:
            session.close()

        return rv

    return with_connection_


class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    author_id = Column(Integer)


@db_connection
def get_titles_by_author(session, author_id: int) -> List[str]:
    books = session.query(Book).filter(Book.author_id == author_id).all()
    return [book.title for book in books]


if __name__ == "__main__":
    print(get_titles_by_author(1))
```
Ban đầu chúng ta cần nhiều thời gian hơn để đại diện các cơ sở dữ liệu trong code. Sau nỗ lực ban đầu, chúng ta giảm tải gánh nặng về sau khi đồng bộ cơ sỡ dữ liệu. 

Nhưng khi sử dụng ORMs, chúng ta cũng đặc biệt cần lưu ý đến vấn đề over-fetching và N+1 query, 
Trong nhiều trường hợp, ORMs DSL không đem lại performance tốt, chúng ta vẫn có thể sử dụng raw SQL để truy vấn nhằm nâng cao hiệu năng của ứng dụng.

# Kết luận
Raw SQL chắc chắn là cách mạnh nhất để tương tác với cơ sở dữ liệu. Nhưng các hạn chế của nó như chúng ta đã phân tích ở trên đó là vấn đề chuyển đổi cơ sở dữ liệu, sai cú pháp, thiếu đi syntax highlight. Mở rộng các câu truy vấn có sẵn rất cồng kềnh và dễ bị SQL injection. 

Query Builders đã đưa ra một vài sự cải thiện nhỏ để giải quyết một vài vấn đề với raw SQL.

ORMs cung cấp sự trừu tượng cap nhất cho ứng dụng, ngăn ngừa trường hợp sai cú pháp không chỉ ở các từ khóa SQL mà còn ở tên bảng, cột. Nhưng cũng bởi vì chúng trừu tượng rất nhiều dẫn đến việc dễ xảy ra vấn đề liên quan đến over-fetching, N+1.

Make your choice !!!