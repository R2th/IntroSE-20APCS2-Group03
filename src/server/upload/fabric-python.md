# Introduction
Fabric là một library mạnh mẽ của Python được sử dụng như một công cụ tương tác giữa SSH và computer system một cách dễ dàng hơn. Nó sẽ giúp tự động hóa một loạt các tác vụ từ deploy app cho tới system administration.

Fabric script là một file Python cơn bản: `fabfile.py`. Sau khi cài xong Fabric, bạn có thể sử dụng CLI: "fab".

Một ví dụ cơ bản:

```py
# fabfile.py
from fabric.api import local

def hello_world():
	local("echo 'HelloWorld'")
```

Mình định nghĩ là task hello_world, task này print text "HelloWord". Để run nó rất đơn giản:

```sh
$ fab hello_world
[localhost] local: echo 'HelloWorld'
HelloWorld

Done.
```

# Fabric's Features

Như các bạn cũng biết, Python là một ngôn ngữ rất linh hoạt. Bất kể câu lệnh Python nào và module Python nào đều có thể sử dụng thông qua Fabric. Các bạn có thể hiểu đơn giản là: Bạn dùng code Python và Fabric module để tương tác với system. Điều này có thể dễ dàng hơn nhiều việc sử dụng shell thuần túy.

Fabric cung cấp tập hợp nhiều commands rất cơ bản nhưng rất mạnh. Dưới đây là một số command điển hình:

## run (fabric.operations.run/fabric.api.run)

Example:

```py
from fabric.api import run
# from fabric.operations import run

# Create a directory "test"
run("mkdir ~/test")

# Get username logged in on console
run("whoiam")

# List file/directory in /var/www/html
run("ls -a /var/www/html")

# Check if command failed
reulst = run("touch /usr/test.txt")
if result.failed:
	print("Create file test.txt failed!")
if result.succeeded:
	print("Create file test.txt successfully!")
```

Qua ví dụ trên có thể thấy: `run` 2 tác dụng:
- Thực hiện command shell.
- Control được command đó có được thực hiện hay không?

## sudo (fabric.operations.sudo/fabric.api.sudo)

Example:

```py
from fabric.api import sudo
# from fabric.operations import sudo

# Create a directory "test"
sudo("mkdir ~/test", user="test-admin")

# Get username logged in on console
sudo("whoiam")

# List file/directory in /var/www/html
sudo("ls -a /var/www/html")

# Check if command failed
reulst = sudo("touch /usr/test.txt")
if result.failed:
	print("Create file test.txt failed!")
if result.succeeded:
	print("Create file test.txt successfully!")
```

Có lẽ điểm khác biệt duy nhất giữ `run` và `sudo` khác nhau ở chỗ  `sudo` đúng như tên của nó. Nó cung cấp nhiều quyền hơn khi thực hiện command shell.

## local (fabric.operations.local/fabric.api.local)

Example:

```py
from fabric.api import local
# from fabric.operations import local

# Create a directory "test"
local("mkdir ~/test", user="test-admin")

# Get username logged in on console
local("whoiam")

# List file/directory in /var/www/html
local("ls -a /var/www/html")

# Check if command failed
reulst = local("touch /usr/test.txt")
if result.failed:
	print("Create file test.txt failed!")
if result.succeeded:
	print("Create file test.txt successfully!")

```

Đến đây sẽ nhiều bạn cảm thấy bối rối: `run`, `sudo`, `local` nó quá giống nhau. Tuy nhiên, bạn chỉ cần hiểu đơn giản nó là:
- `local`: chỉ thực thi một local command.
- `run`: thực thi một remote command.
- `sudo`: thực thi một sudo remote command.


## get (fabric.operations.get/fabric.api.get)

Example:

```py
from fabric.api import get
# from fabric.operations import get

# Download a error logs
get(remote_path="/home/server/myapp/error.tar.gz", local_path="/logs/error.tar.gz")


# Download a backup database
get("/backup/db_02022017.gz", "./db.gz")
```

`get` command này khá giống với `scp` command. Mục đích chính của nó là copy/move file(s) từ remote system tới máy bạn. Khi sử dụng `get` thì bạn cần chú ý 2 parameter:
- `remote_path`
- `local_path`

## put (fabric.operations.put/fabric.api.put)

Example:

```py
from fabric.api import put
# from fabric.operations import put

# Upload database to remote server
put("~/myapp/backup/db_backup_02022017.tar.gz", "/var/www/html/db_backup_02022017.tar.gz")

# Upload and set permission file
result = put("~/myapp/requirements.txt", "requirements.txt", mode=755)

# Verify 
if result.failed:
	print("Upload file requirements.txt failed!")
if result.succeeded:
	print("Upload file requirements.txt successfully!")

```

Ok. Dễ dàng thấy, `put` và `get` ngược nhau. Nó khá giống như `scp` = `put` + `get` :D. `put` thì đẩy dữ liệu lên remote còn `get` thì kéo dữ liệu từ remote về.

## prompt (fabric.operations.prompt/fabric.api.prompt)

Example:

```py
from fabric.api import prompt
# from fabric.operations import prompt

# Prompt the user want to use
port = prompt("Which port would you like to use?")

# Prompt the user want to use with defaults and validation
port = prompt("Which port would you like to use?", default=8080, validate=int)

```

Đơn giản, `prompt` thực thi đúng cái tên của nó. Nhắc người dùng nếu họ muốn custom và trả về một input. Cái này giống với `raw_input` trong bashshell. 

## reboot (fabric.operations.reboot/fabric.api.reboot)

Example:

```py
from fabric.api import reboot
# from fabric.operations import reboot

# Reboot the remote system
reboot()

# Reboot after 60 seconds
reboot(wait=60)

```

Cái tên `reboot` cũng nói lên tác dụng của command này. Nó sẽ reboot the remote system. Default, sau khi thực hiện lệnh reboot sau 2 min. Bạn có thể setup time wait đó bằng parameter `wait`.

## cd (fabric.context_managers.cd/fabric.api.cd)


Example:

```py
from fabric.api import cd
# from fabric.context_managers import cd

# List file(s) in directory /var/www/html
with cd("/var/www/html"):
    items = sudo("ls -l")

```

`cd` cho phép đi tới một thự mục và thực hiện các hoạt động tại thư mục đó. Syntax của lệnh này là:

```py
with cd("xxx"):
    with cd("xxx"):
	    ...
```

## lcd (fabric.context_managers.lcd/fabric.api.lcd)

Example:

```py
from fabric.api import lcd
# from fabric.context_managers import lcd

# List file(s) in directory /var/www/html
with lcd("/var/www/html"):
    items = sudo("ls -l")

```

`lcd` khác với `cd` là comamnd này chỉ work ở local system.

## prefix (fabric.context_managers.prefix/fabric.api.prefix)

Example:

```py
from fabric.api import prefix
# from fabric.context_managers import prefix


with prefix('workon myvenv'):
	run('./manage.py syncdb')

```

`prefix` wrapped `run`/`sudo` + thêm `&&`. Như ví dụ trên, ngoài shell nó sẽ tương đương:

```sh
$ workon myvenv && ./manage.py syncdb
```

Trên đây là một số  command/function được sử dụng phổ biến. Những command khác các bạn có thể truy cập vào `fabric.api` để vọc nhé.

# Connecting to remote servers

Đầu tiên, để kết nối với remote servers, bạn cần import `env` từ `fabric.api`

```py
from fabric.api import env
```

Sau đó, config hosts: username/password:

```py

# Set the host/IP
env.hosts = [
    'server.framgia.ltd',
]

# Set the username
env.user = "root"

# Set the password [NOT RECOMMENDED] =))
env.password = "passwd"

```

Ok. 

# Exmaple 

Dưới đây mình sẽ tạo 1 project simple trên server sử dụng Fabric

```py
from fabric.api import *


# Set the host/IP
env.hosts = [
    'server.framgia.ltd',
]

# Set the username
env.user = "root"

# Set the password [NOT RECOMMENDED] =))
env.password = "passwd"

def setup_enviroment():
	with cd('/home/ec2-user'):
		run('mkdir myapp')
		run('wget https://bootstrap.pypa.io/get-pip.py')
		sudo('python get-pip.py')
		sudo('pip install virtualenv')
		run('virtualenv venv')
		with prefix('source venv/bin/activate'):
			run('pip install django')


def start():
	with cd('/home/ec2-user'):
		with prefix('source venv/bin/activate'):
			run('python manage.py runserver')

def setup_project():
	# setup enviroment
	setup_enviroment()

	# runserver
	start()
```

Sau khi tạo xong file `fabfile.py` có nội dung như trên. Bạn chạy lệnh sau để nó tự động thực hiện:
```sh
fab setup_project
```

Đến đây, mình xin dừng bài giới thiệu ở đây. 
Bạn có thể  tham khảo đầy đủ document của Fabric [tại đây](http://docs.fabfile.org/en/1.14/index.html)

Thanks for reading :)