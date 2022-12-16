### Using LIKE statement
Cách phổ biến nhất để tìm kiếm dữ diệu là sử dụng từ khóa `LIKE`, ví dụ trong trường hợp muốn tìm tất cả các `issues` có `title` bắt đầu bằng từ khóa `WIP:`, bạn thường sẽ viết câu query:
```sql
SELECT *
FROM issues
WHERE title LIKE 'WIP:%';
```
Trong `PostgreSQL`, `LIKE` phân biệt chữ hoa thường, ở `MySQL` thì việc phân biệt hoa thường dựa vào `collation`, nhưng thường là **KHÔNG** phân biệt hoa thường. Để thực hiện câu lệnh tìm kiếm không phân biệt hoa-thường thì trong `PostgreSQL` chúng ta phải sử dụng `ILIKE` thay vì `LIKE` như bình thường. Nhưng câu lệnh này lại không được `MySQL` support.
Giải pháp được đưa ra là sử dụng `Arel` thay vì `ActiveRecord` như bình thường, `Arel` đủ thông minh để sử dụng `ILIKE` cho `PostgreSQL` và `LIKE` cho `MySQL`
Thay vì: 
```ruby
Issue.where 'title LIKE ?', 'WIP:%'
```
thì chúng ta sẽ dùng:
```ruby
table = Issue.arel_table
Issue.where table[:title].matches('WIP:%').or table[:foo].matches('WIP:%')
```
Đối với `PostgreSQL` thì đoạn code trên sẽ sinh ra câu query:
```sql
SELECT *
FROM issues
WHERE (title ILIKE 'WIP:%' OR foo ILIKE 'WIP:%');
```
còn đối với `MySQL` thì đoạn query lại là:
```sql
SELECT *
FROM issues
WHERE (title LIKE 'WIP:%' OR foo LIKE 'WIP:%');
```

### LIKE & Indexes
Cả `PostgreSQL` cũng như `MySQL` sẽ không sử dụng được `INDEX` khi sử dụng `LIKE/ILIKE` với `wildcard` đứng ở đầu trong string query. Ví dụ, `INDEX` sẽ không đựoc dùng với câu query như:
```sql
SELECT *
FROM issues
WHERE title ILIKE '%WIP:%';
```
Vì khi sử dụng `ILIKE` với `wildcard` ở đầu như vậy, `PostgreSQL` sẽ không thể xác định sẽ phải bắt đầu tìm kiếm trong `INDEX` từ vị trí nào.

`MySQL` không cung cấp bất kì một giải pháp nào cho trường hợp này, tuy nhiên `PostgreSQL` thì lại khác, nó cung cấp 1 giaỉ pháp: `trigram GIN indexes`. Indexes có thể được sinh ra bằng:
```sql
CREATE INDEX [CONCURRENTLY] index_name_here
ON table_name
USING GIN(column_name gin_trgm_ops);
```
Phần key đựoc tạo ra là `GIN(column_name gin_trgm_ops)`. Indexes này có thể được sử dụng bởi `LIKE/ILIKE`, giúp cải thiện performance.
Khuyết điểm của phương pháp này là data để sử dụng cho việc đánh `INDEX` này khá lớn. 

Để tên của `INDEX` là duy nhất, chúng ta nên sử dụng pattern sau cho `INDEX name`:
```sql
index_TABLE_on_COLUMN_trigram
```
Ví dụ như trường hợp trên chúng ta muốn đánh `INDEX` cho trường `title`, tên của `INDEX` nên là: `index_issues_on_title_trigram`

Do việc đánh `INDEX` tốn khá nhiều thời gian nên nó sẽ được thực hiện `CONCURRENT`. Chúng ta sẽ sử dụng `CREATE INDEX CONCURRENTLY` thay vì `CREATE INDEX` như bình thường. 
Concurrent indexes không thể được tạo ra trong `TRANSACTION`, vì vậy chúng ta phải disable nó đi:
```ruby
class MigrationName < ActiveRecord::Migration
    disable_ddl_transaction!
end
```

Ví dụ như:
```ruby
class AddUsersLowerUsernameEmailIndexes < ActiveRecord::Migration
    disable_ddl_transaction!
    
    def up
        return unless Gitlab::Database.postgresql?
        execute 'CREATE INDEX CONCURRENTLY index_on_users_lower_username ON users (LOWER(username));'
        execute 'CREATE INDEX CONCURRENTLY index_on_users_lower_email ON users (LOWER(email));'
    end
    
    def down
        return unless Gitlab::Database.postgresql?
        
        remove_index :users, :index_on_users_lower_username
        remove_index :users, :index_on_users_lower_email
    end
end
```

### Plucking IDs

**KHÔNG** bao giờ được sử dụng `ActiveRecord`'s `pluck` để `pluck` ra các giá trị vào trong memory chỉ để sử dụng như là một params cho các câu query khác. Ví dụ:
```ruby
projects = Project.all.pluck(:id)
MergeRequest.where source_project_id: projects
```
Việc này làm giảm performance, gây lãng phí bộ nhớ.
Sử dụng subquery sẽ tốt hơn:
```ruby
MergeRequest.where source_project_id: Project.all.select(:id)
```
Trường hợp duy nhất mà bạn nên sử dụng `pluck` là bạn cần phải xử lý các giá trị `pluck` ra bằng code Ruby (ví dụ ghi ra file CSV). Trong tất cả các trường hợp còn lại hãy sử dụng `subquery`.

### Use UINONs
Trong các ứng dụng Rails thì việc sử dụng `UNION` không nhiều lắm, nhưng chúng vô cùng mạnh và hữu ích. Trong hầu hết các ứng dụng thì việt sử dụng `JOIN` để sử dụng cho việc query trên nhiều bảng quan hệ với nhau, tuy nhiên việc sử dụng `JOIN` thì data phình to rất nhanh.

Ví dụ, trong trường hợp bạn muốn query các `Project` có tên chứa từ `gitlab` hoặc là namespace name có chứa `gitlab`, đa số người sẽ viết là:
```SQL
SELECT *
FROM projects 
JOIN namespaces ON projects.namespace_id = namespaces.id
WHERE projects.name ILIKE '%gitlab%'
OR namespaces.name ILIKE '%gitlab%';
```
Ở `Gitlab` với một database lớn, câu query trên chạy mất `800 milliseconds`. Chúng ta sẽ viết lại câu query trên bằng `UNION` như sau:
```sql
SELECT *
FROM projects 
WHERE projects.name ILIKE `%gitlab%`

UNION

SELECT *
FROM projects
JOIN namespaces ON namespaces.id = projects.namespace_id
WHERE namespaces.name ILIKE '%gitlab%';
```

Câu query trên chỉ cần `15 milliseconds` để chạy, và return cùng một data với câu trên. (batngo)

Không phải lúc nào cũng nên sử dụng `UNION`, tuy nhiên, luôn suy nghĩ về việc sử dụng JOIN khi mà sử dụng quá nhiều `JOIN`.

Gitlab sử dụng `Gitlab::SQL::Union` class để sử join `UNION` trên nhiều object `ActiveRecord::Relation`:
```ruby
    union = Gitlab::SQL::Union.new [projects, more_projects, ...]
    Project.from "(#{union.to_sql}) projects"
```

### Order by Creation Date
Khi `ORDER` các record theo thời gian tạo trong database, chúng ta đơn giản order theo column `id` thay vì `created_at`.
Bởi vì, `id` luôn luôn unique, và tăng theo thứ tự mà các record được add vào database, vì vậy việc sử dụng `id` là chính xác nhất. Vì vậy, việc đánh `INDEX` trên column `created_at` là không cần thiết, vì column `id` đã được mặc định đánh `INDEX`

### Use WHERE EXIST instead of WHERE IN
`WHERE EXIST` và `WHERE IN` có thể cho cùng một kết quả, tuy nhiên, việc sử dụng `WHERE EXIST` được khuyến khích hơn `WHERE IN`, về cơ bản, việc database thực hiện tối ưu khi sử dụng `WHERE EXIST` là tốt hơn so với `WHERE IN`
Trong Rails:
```ruby
Project.where('EXISTS (?)', User.select(1).where('projects.creator_id = users.id AND users.foo = X'))
```
Đoạn code trên sẽ sinh ra đoạn query phía dưới:
```sql
SELECT *
FROM projects
WHERE EXISTS (
    SELECT 1
    FROM users
    WHERE projects.creator_id = users.id
    AND users.foo = X
);
```

### `find_or_create_by` is not atomic
Những methods như `.find_or_create_by` hoặc `.first_or_create` không đảm bảo tính atomic. Nó sẽ chạy câu lệnh `SELECT` trước, sau đó nếu không có kết quả nào sẽ chạy câu lệnh `INSERT`. Trong các concurrent process, sẽ dẫn đến tình trạng, 2 record sẽ đồng thời được `INSERT` vào database, dẫn đến câu query fail do `CONSTRAINT VIOLATION`.
Sử dụng `TRANSACTION` không giải quyết được vấn đề này, tuy nhiên, giải pháp sau đây thì được.
```ruby
Project.transaction do
    begin
        User.find_or_create_by(username: 'foo')
    rescue ActiveRecord::RecordNotUnique
        retry
    end     
end
```