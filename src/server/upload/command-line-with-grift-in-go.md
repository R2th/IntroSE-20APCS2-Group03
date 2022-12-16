### Grift là gì?

Grift là một lib rất đơn giản cho phép bạn viết script `task` đơn giản trong Go và chạy nó bởi tên mà không cần viết bao ngoài bởi `main`. Grift tương tự và phát triển theo [Rake](https://github.com/ruby/rake) của Ruby on Rails.

### Tại sao sử dụng Grift?

Khi chúng ta build app sẽ có thời điểm bạn cần một số script để làm một số thứ. Ví dụ: bạn cần một script để seed database hoặc một script để phân tích logs, vv....

Grift cho phép bạn viết các script đó trong Go theo một cách thực tiễn, đơn giản và có thể mở rộng.

### Cài đặt

Chỉ cần sử dụng `go get`

```
$ go get github.com/markbates/grift
```

Để chứng minh đã cài đặt thành công:

```
grift jim
```

Nó sẽ xuất hiện một ảnh tạo bở các ký tự và có nội dung giới thiệu bởi tác giả như sau.

```
....Ảnh...

Grift was inspired by the Ruby program, Rake. (http://rake.rubyforge.org)

Rake was written by one of the kindest and generous people any tech community
was lucky to have, Jim Weirich.

We miss you Jim.

https://en.wikipedia.org/wiki/Jim_Weirich
```

### Cách sử dụng

Sau khi cài đặt lib thành công chỉ cần require package đó trong `grifts`. Chỉ vậy thôi há :v 

Chạy command sau:

```
$ grift init
```

Khi chạy sub-command `init` Grift sẽ sinh ra `grift` package và tạo một số mẫu cho bạn.

#### Để xem danh dách sub-command
```
$ grift list
```

Ví dụ: In ra chữ `Hello World!`
```
$ grift hello
```

Hãy vào trong thư mục mà đã sinh bởi command `grift init`, ở đây mình đã tạo một thư mục bên ngoài nữa là `cmd_app`

```
cmd_app
├── go.mod
├── go.sum
├── grifts
│   └── example.go
```

Khi mở file `example.go` các bạn sẽ thấy nội dung sau:

```

package grifts

import (
	"fmt"
	"os"
	"strings"

	. "github.com/markbates/grift/grift"
)

var _ = Desc("hello", "Say Hello!")
var _ = Add("hello", func(c *Context) error {
	fmt.Println("Hello World!")
	return nil
})

var _ = Namespace("env", func() {
	Desc("print", "Prints out all of the ENV variables in your environment. Pass in the name of a particular ENV variable to print just that one out. (e.g. grift env:print GOPATH)")
	Add("print", func(c *Context) error {
		if len(c.Args) >= 1 {
			for _, e := range c.Args {
				fmt.Printf("%s=%s\n", e, os.Getenv(e))
			}
		} else {
			for _, e := range os.Environ() {
				pair := strings.Split(e, "=")
				fmt.Printf("%s=%s\n", pair[0], os.Getenv(pair[0]))
			}
		}

		return nil
	})
})
```

- sub-command `hello` sẽ in ra text `"Hello World!"`
- sub-command `env:print` có namespace `env` và task `print` sẽ in ra các tham số ENV mà bạn set trong terminal.

### Create migration và migrate database

Trước tiền sẽ sử dụng [Goose](https://github.com/pressly/goose) là công cụ để hỗ trợ database migration.

Giá sử đã có db tên là `cmd_app` trong mysql sẵn, chúng ta sẽ tạo một file `db.go` trong thư mục `grifts` với nội dung sau:

```
package grifts

import (
	"fmt"
	"flag"
	"os"
	"log"

	. "github.com/markbates/grift/grift"
	"github.com/pressly/goose"
	_ "github.com/go-sql-driver/mysql"
)

var (
	flags    = flag.NewFlagSet("grifts", flag.ExitOnError)
  dbstring = flags.String("dbstring", "root:123456@/cmd_app?parseTime=true", "connection string")
	dir      = flags.String("dir", "./migrations", "directory with migration files")
)

var _ = Namespace("db", func() {
    Desc("migration", "Generate file migration")
	Set("migration", func(c *Context) error {
		flags.Parse(c.Args[:])
		args := flags.Args()

		if len(args) < 1 {
			flags.Usage()
			return nil
		}

		db, err := goose.OpenDBWithDriver("mysql", *dbstring)
			
			if err != nil {
				log.Fatalf("goose: failed to open DB: %v\n", err)
			}
		
			defer func() {
				if err := db.Close(); err != nil {
					log.Fatalf("goose: failed to close DB: %v\n", err)
				}
			}()

		command := "create"
		
		if err := goose.Run(command, db, *dir, args...); err != nil {
			log.Fatalf("goose %v: %v", command, err)
		}

		return nil
	})
}
```

Để tạo một file migration chỉ cần chạy

```
$ grift db:migration create_post sql
2020/07/21 23:18:29 Created new file: migrations/20200721231829_create_post.sql
```

Sau đó sẽ sinh ra 1 một file trong thư mục `./migrations`
```
migrations
├── 20200721231829_create_post.sql
```

Vào file migration thêm nội dung tạo bảng post

```
-- +goose Up
-- +goose StatementBegin
CREATE TABLE post (
    id int NOT NULL,
    title text,
    body text,
    PRIMARY KEY(id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE post;
-- +goose StatementEnd

```

Tiếp đến để migrate vào database chung ta sẽ tạo một command nữa là `migrate`

```
// db.go

Desc("migrate", "Migrates the databases")
	Set("migrate", func(c *Context) error {
		flags.Parse(c.Args[:])
		args := flags.Args()

		flags.Usage()

		db, err := goose.OpenDBWithDriver("mysql", *dbstring)
			
		if err != nil {
			log.Fatalf("goose: failed to open DB: %v\n", err)
		}
	
		defer func() {
			if err := db.Close(); err != nil {
				log.Fatalf("goose: failed to close DB: %v\n", err)
			}
		}()

		command := "up"
		
		if err := goose.Run(command, db, *dir, args...); err != nil {
			log.Fatalf("goose %v: %v", command, err)
		}

		return nil
	})
...
```

Cuối cùng chạy command vừa viết

```
$ grift db:migrate
```

Vào check trong mysql

```
mysql> show tables;
+-------------------+
| Tables_in_cmd_app |
+-------------------+
| goose_db_version  |
| post              |
+-------------------+

mysql> DESCRIBE post;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| id    | int(11) | NO   | PRI | NULL    |       |
| title | text    | YES  |     | NULL    |       |
| body  | text    | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

### Refererences

- [Grift](https://github.com/markbates/grift)
- [Goose](https://github.com/pressly/goose)
- Inspiration from [post](https://viblo.asia/p/managing-database-migration-in-go-aWj5336b56m) by @norin