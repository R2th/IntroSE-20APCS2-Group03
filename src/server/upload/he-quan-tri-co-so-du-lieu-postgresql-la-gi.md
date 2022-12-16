## POSTGRESQL LÀ GÌ ?
![](https://images.viblo.asia/c72fe9af-02c2-4946-9178-2c17820cda3d.jpg)


PostgreSQL là một hệ quản trị cơ sở dữ liệu quan hệ và đối tượng. Nó là một hệ quản trị cơ sở dữ liệu miễn phí (open source) phổ biến nhất hiện nay. Với hơn 30 năm phát triển mạnh mẽ nó đã đạt được độ tin cậy cao, tính năng mạnh mẽ và hiệu suất cao.

## Tại sao nên dùng PostgreSQL cho dự án của bạn
*  Ngoài việc miễn phí và mã nguồn mở, PostgreSQL có khả năng mở rộng cao. Nó còn đi kèm với một số tính năng hỗ trợ rất tốt trong việc phát triển dự án, trong series này mình sẽ giới thiệu đến các bạn đầy đủ và thực hành ở các bài viết tiếp theo nhé.

## Một số thông tin về PostgreSQL

* Phát triển bởi: PostgreSQL Global Development Group
* Phát hành lần đầu: 08/07/1996
* Phiên bản hiện tại: 15 phát hành vào ngày 29-09-2022
* Viết bằng ngôn ngữ lập trình C
* Operating System: FreeBSD, Linux, macOS, OpenBSD, Windows
* Loại phần mềm: RDBMS
* License: PostgreSQL License (free and open-source, permissive)
* Website: postgresql.org

## Dưới đây là đẩy đủ các tính năng mà PostgreSQL cung cấp.
### Data types (kiểu dữ liệu)

* Primitives: Integer, Numeric, String, Boolean
* Structured: Date/Time, Array, Range / Multirange, UUID
* Document: JSON/JSONB, XML, Key-value (Hstore)
* Geometry: Point, Line, Circle, Polygon
* Customizations: Composite, Custom Types
### Data Integrity (toàn vẹn dữ liệu)
* UNIQUE, NOT NULL
* Primary Keys
* Foreign Keys
* Exclusion Constraints
* Explicit Locks, Advisory Locks
### Concurrency, Performance (tính đồng thời và hiệu suất)
* Indexing: B-tree, Multicolumn, Expressions, Partial
* Advanced Indexing: GiST, SP-Gist, KNN Gist, GIN, BRIN, Covering indexes, Bloom filters
* Sophisticated query planner / optimizer, index-only scans, multicolumn statistics
* Transactions, Nested Transactions (via savepoints)
* Multi-Version concurrency Control (MVCC)
* Parallelization of read queries and building B-tree indexes
* Table partitioning
* All transaction isolation levels defined in the SQL standard, including Serializable
* Just-in-time (JIT) compilation of expressions
### Reliability, Disaster Recovery
* Write-ahead Logging (WAL)
* Replication: Asynchronous, Synchronous, Logical
* Point-in-time-recovery (PITR), active standbys
* Tablespaces
### Security
* Authentication: GSSAPI, SSPI, LDAP, SCRAM-SHA-256, Certificate, and more
* Robust access-control system
* Column and row-level security
* Multi-factor authentication with certificates and an additional method
### Extensibility
* Stored functions and procedures
* Procedural Languages: PL/PGSQL, Perl, Python (and many more)
* SQL/JSON path expressions
* Foreign data wrappers: connect to other databases or streams with a standard SQL 
### Internationalisation, Text Search
* Support for international character sets, e.g. through ICU collations
* Case-insensitive and accent-insensitive collations
* Full-text search

***Trong series này mình sẽ đi hết tất cả các tính năng mình liệt kê ở trên, anh em nhớ theo dõi series này nhé, càng về sau sẽ càng có nhiều thứ hay ho 🫣🤗***

Cảm ơn anh em đã đọc tới đây, nếu thấy hữu ích, cho mình 1 upvote để có động lực ra thêm các bài tiếp theo nhé.

Ở bài tiếp theo mình sẽ hướng dẫn cài đặt PostgresSQL trên Docker, macOS và Windows, những trang bị đầu tiên để chiến đấu cho anh em.

Cài đặt PostgresSQL: https://viblo.asia/p/cai-dat-he-quan-tri-co-so-du-lieu-postgressql-y37LdAX2Vov