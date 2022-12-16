Lần trước mình đã cùng tìm hiểu về cách tạo user, database và phân quyền cho MySQL/MariaDB rồi.
Hôm nay vẫn là chủ đề cũ nhưng với một DB khác cũng cực kì phổ biến là PostgreSQL nhé.

Phần trước ở đây nếu bạn cần nhé.

[Tạo user, DB và phân quyền cho MySQL/MariaDB, tất cả những gì bạn cần biết](https://viblo.asia/p/tao-user-va-phan-quyen-cho-mysqlmariadb-gAm5ymoL5db)

## Tạo user

User trong Postgres được gọi là `ROLE`. Có 2 loại role là *login role* và *non-login role*.
Nghe tên thì cũng đoán được một cái thì login được còn cái kia thì không rồi. Khi bạn tạo `USER` trong postgres thì tức
là bạn đang tạo một *login role* đó.

Để tạo một user (hay login role) mới thì bạn dùng `CREATE ROLE`. Ví dụ để tạo user **myuser** thì bạn làm thế này.

```sql
CREATE ROLE myuser WITH LOGIN;
```

Mặc định thì một role sẽ là *no-login role* nên bạn cần thêm `LOGIN` để tạo một *login role*.
Bạn cũng có thể dùng `CREATE USER` thay vì `ROLE` như này.

```sql
CREATE USER myuser;
```

Để set password thì bạn thêm option `PASSWORD` như này.

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
-- Hoặc là như này
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';
```

Ngoài `LOGIN` và `PASSWORD` thì còn nhiều option khác nữa, bạn có thể xem tất cả ở [đây](https://www.postgresql.org/docs/13/sql-createrole.html).

Bạn có thể thấy là không có option `IF NOT EXISTS` nào cả. Nên để viết script tạo user chỉ khi user chưa tồn tại sẽ hơi
phức tạp hơn chút như này.

```sql
DO $$
BEGIN
    CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';
EXCEPTION WHEN DUPLICATE_OBJECT THEN
    RAISE NOTICE 'Role myuser already exists, skipping';
END
$$;
```

Postgres thì không có set được authenticate theo từng host như MySQL/MariaDB. Tuy nhiên, bạn vẫn có thể set một số
config tương tự như chỉ cho phép login hoặc yêu cầu password/certificate tùy theo host ở file `pg_hba.conf`.
Document đầy đủ ở [đây](https://www.postgresql.org/docs/13/auth-pg-hba-conf.html) nhé.

## Tạo DB

Để tạo DB thì chúng ta dùng query `CREATE DATABASE` quen thuộc. Các object trong postgres đều có owner, thường thì
người nào tạo ra nó sẽ là owner luôn. Với DB thì chỉ có user với quyền `createdb` mới tạo được nên để tạo DB cho một
user khác chúng ta sẽ thêm option `OWNER`.

Ví dụ để tạo DB `mydatabase` với owner là `myusser` thì query của chúng ta sẽ như thế này.

```sql
CREATE DATABASE mydatabase OWNER myuser;
```

Bạn có thể xem tất cả các option ở [đây](https://www.postgresql.org/docs/13/sql-createdatabase.html) nhé.

Tương tự như `CREATE USER`, `CREATE DATABASE` cũng không có option `IF NOT EXISTS`. Tuy nhiên, khác với query trước,
`CREATE DATABASE` còn không được phép chạy trong một transaction khác nữa, vậy nên chúng ta không thể dùng cách trên
để tạo DB chỉ khi nó chưa tồn tại được.

Nếu chạy từ shell script thì bạn có thể dùng `psql` để tạo DB như thế này.

```sh
echo "SELECT 'CREATE DATABASE mydb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mydb')\gexec" | psql
```

Nếu phải chạy trong SQL script thì sẽ hơi phức tạp một chút. Chúng ta sẽ cần đến extension `dblink`.
Bạn sẽ phải tự connect đến server DB hiện tại để chạy query thay vì chạy trực tiếp 🤣.

```sql
DO $$
BEGIN
    PERFORM dblink_exec('password=yourpassword', 'CREATE DATABASE mydb OWNER myuser');
EXCEPTION WHEN DUPLICATE_DATABASE THEN
    RAISE NOTICE 'Database mydb already exists, skipping';
END
$$;
```

Ngoài ra trong mỗi database còn có các *schema* nữa. Mặc định thì mỗi DB sẽ được tạo với một schema public. Ai có quyền
truy cập DB cũng sẽ truy cập được schema này. Bạn có thể tạo schema với query `CREATE SCHEMA`.

```sql
CREATE SCHEMA myschema;
```

Bạn có thể xem tất cả option ở [đây](https://www.postgresql.org/docs/13/sql-createschema.html) nhé.

## Phân quyền cho user

Hệ thống phân quyền của Postgres khá là phức tạp 🙄.
Chúng ta sẽ có quyền với DB, với schema, thậm chí tới từng object (table,...).

Ngoài owner và superuser ra thì các user khác sẽ không có quyền gì với các object mới được tạo ra.
Để cấp quyền cho user thì chúng ta dùng query `GRANT`.

Có các quyền như sau

- `CONNECT`: connect tới DB
- `USAGE`: cái này hơi bị phức tạp, bạn chịu khó xem docs nhé 😜
- `CREATE`/`SELECT`/`INSERT`/`UPDATE`/`DELETE`/`TRUNCATE`: được chạy các query tương ứng
- `EXECUTE`: gọi function
- `REFERENCES`/`TRIGGER`/`TEMP`/`TEMPORARY`: quyền tạo foreign key, trigger, bảng tạm thời
- `ALL PRIVILEGES`: tất cả mọi quyền có thể `GRANT`

Chi tiết thì ở [đây](https://www.postgresql.org/docs/13/sql-grant.html) nhé.

Để thêm quyền xem (readonly) cho một user chúng ta cần những query như thế này.

```sql
GRANT CONNECT ON DATABASE mydb TO my_readonly;
GRANT USAGE ON SCHEMA public TO my_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO my_readonly;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO my_readonly;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO my_readonly;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO my_readonly;
```

Bạn có thể thấy là quyền phải được `GRANT` theo tận schema chứ không phải cả DB. Bạn có thể thay `public` bằng schema
khác.

Ngoài ra còn một tính năng hay ho nữa. Mỗi *role* trong postgres vừa có thể là user mà cũng có thể là một group nữa.
Các user trong cùng group sẽ được "kế thừa" những quyền của group đó. Ví dụ sau khi đã có user *my_readonly* ở trên rồi,
mình muốn tạo một user *my_readwrite* với cả quyền ghi nữa, thì thay vì phải lặp lại các quyền như trên, mình chỉ cần
`GRANT` cho nó các quyền của *my_readonly* thôi 😉.

```sql
GRANT my_readonly TO my_readwrite;
```

Sau đó thêm vài quyền nữa là xong;

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO my_readwrite;
```

### Privilege cho các object được tạo về sau

Nhưng không phải thêm quyền thôi là xong đâu nhé 🙄.
Như mình có nói ở trên thì mặc định chỉ có superuser và owner mới có quyền với các object mới được tạo ra thôi.
Nghĩa là dù đã cấp quyền cho schema và tất cả table bên trong nó thì khi một table mới được tạo ra, các user đã được
cấp quyền trước đó đều không có quyền với các table mới.

Để giải quyết vấn đề này bạn cần thay đổi quyền mặc định (`DEFAULT PRIVILEGES`) của các object trong schema để khi
có object mới được tạo nó sẽ có ngay quyền cho các user mà bạn muốn.

Ví dụ để thêm quyền readonly mặc định cho các table mới được tạo ra thì mình dùng các query thế này.

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE myuser IN SCHEMA public GRANT SELECT ON TABLES TO my_readonly;
ALTER DEFAULT PRIVILEGES FOR ROLE myuser IN SCHEMA public GRANT SELECT ON SEQUENCES TO my_readonly;
ALTER DEFAULT PRIVILEGES FOR ROLE myuser IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO my_readonly;
```

Như bạn thấy thì *default prvileges* cũng chỉ áp dụng khi object được tạo bởi một user nhất định thôi 🤣.
Vậy nên bạn cần thay đổi nó cho tất cả các user có quyền `CREATE` trong schema của bạn nhé.

### Phân quyền theo group

Ở phần đầu tiên thì mình có nhắc đến một loại role khác là *no-login role*. Chúng ta đã biết *user* là alias cho
*login role* rồi. Và một role thì ngoài user ra còn có thể là một group nữa. Vậy *no-login role* hẳn là được dùng
để tạo group rồi 😃.

Mình có thể tạo group với các quyền như *readonly*, *readwrite*, hay thậm chí là cả *owner* để assign cho các user khác.
Ví dụ mình có thể tạo db với nhiều owner bằng cách assign quyền *my_owner* cho các user khác như thế này.

```sql
CREATE ROLE my_owner;
CREATE DATABASE mydb OWNER my_owner;
GRANT my_owner TO john_smith;
GRANT my_owner TO whoever;
```

Các `DEFAULT PRIVILEGES` cấp quyền cho cả group nên các user trong group cũng sẽ được kế thừa quyền luôn nhé.
Ví dụ với default privileges như thế này.

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE myuser IN SCHEMA public GRANT SELECT ON TABLES TO my_readonly;
```

Thì các user của group *my_readonly* sẽ có quyền select trên tất cả table mới được tạo bời *myuser*.
Tuy nhiên, trong trường hợp ngược lại, nếu table được tạo bởi một user khác trong group *myuser* thì default privileges
sẽ không có tác dụng đâu nhé.

Hết rồi. Cũng không khó tí nào phải không 😉. Chúc bạn thành công nhé.