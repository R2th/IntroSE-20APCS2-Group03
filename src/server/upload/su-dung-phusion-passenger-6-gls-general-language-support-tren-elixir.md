Phusion Passenger vừa ra mắt phiên bản 6.0.0 vào cuối tháng 11 vừa rồi, đã đánh dấu một tính năng cho phép sử dụng với rất nhiều ngôn ngữ khác nhau.

Mình xin phép được dịch bài hướng dẫn cho Elixir trên trang chủ Passenger

Bài gốc: https://www.phusionpassenger.com/docs/advanced_guides/gls/elixir.html
# Sử dụng Passenger GLS with Elixir
Để sử dụng Passenger với Elixir, bạn cần sử dụng một web framework được viết trên Elixir.

Trong ví dụ này, ta sẽ sẽ sử dụng Phoenix - web framework phổ biến nhất của Elixir

## Bước 1: Cài đặt Elixir
Thật không may là các phiên bản mới nhất của Elixir không có sẵn ở hầu hết trên gói phần mềm của các hệ điều hành, vì vậy ta phải hơi tốn công chút. Ngoài ra bởi vì tên các gói package và cách phân phối Elixir và Erlang, cài đặt Elixir từ dòng lệnh liên quan đến số phiên bản, cho nên hướng dẫn này trở nên phức tạp hơn các ngôn ngữ khác.

### Debian & Ubuntu
```shell
apt install -y wget gnupg2 unzip curl
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb
dpkg -i erlang-solutions_1.0_all.deb
rm erlang-solutions_1.0_all.deb
apt update
apt install -y erlang

mkdir -p /opt/elixir
cd /opt/elixir
wget "https://github.com/$(curl -fsSL https://github.com/elixir-lang/elixir/releases/latest | grep -Eoe '/elixir-lang/elixir/releases/download/[^/]+/Precompiled.zip')"
unzip Precompiled.zip
rm Precompiled.zip
export PATH="$PATH:/opt/elixir/bin"
```

### CentOS
```shell
yum install -y epel-release yum-utils
yum-config-manager --enable epel
yum install -y wget unzip

wget https://packages.erlang-solutions.com/erlang-solutions-1.0-1.noarch.rpm
rpm -Uvh erlang-solutions-1.0-1.noarch.rpm
rm erlang-solutions-1.0-1.noarch.rpm
yum install -y erlang

mkdir -p /opt/elixir
cd /opt/elixir
wget "https://github.com/$(curl -fsSL https://github.com/elixir-lang/elixir/releases/latest | grep -Eoe '/elixir-lang/elixir/releases/download/[^/]+/Precompiled.zip')"
unzip Precompiled.zip
rm Precompiled.zip
export PATH="$PATH:/opt/elixir/bin"
```

### RHEL
```shell
subscription-manager register --username $USERNAME_EMAIL --password $PASSWORD --auto-attach
subscription-manager repos --enable rhel-*-devtools-rpms --enable "rhel-*-optional-rpms" --enable "rhel-*-extras-rpms"
yum install -y wget unzip https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

rpm --import http://binaries.erlang-solutions.com/debian/erlang_solutions.asc
cd /etc/yum.repos.d
wget http://packages.erlang-solutions.com/rpm/centos/erlang_solutions.repo
sed 's/$releasever/7/g' -i erlang_solutions.repo
yum install -y erlang

mkdir -p /opt/elixir
cd /opt/elixir
wget "https://github.com/$(curl -fsSL https://github.com/elixir-lang/elixir/releases/latest | grep -Eoe '/elixir-lang/elixir/releases/download/[^/]+/Precompiled.zip')"
unzip Precompiled.zip
rm Precompiled.zip
export PATH="$PATH:/opt/elixir/bin"
```

### macOS

Để sử dụng Homebrew cài đặt Elixir trên macOS, bạn sẽ cần cài "command line tools", cũng như Homebrew.

Nếu bạn đang ngồi trực tiếp ở may mac:
```shell
xcode-select --install
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install elixir
```

Những dòng lệnh sau sẽ cài đặt mọi thứ từ cli, nên bạn sẽ có thể cài chúng qua ssh:
```shell
touch /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress
softwareupdate -i $(softwareupdate -l | grep "\*.*Command Line" | grep $(sw_vers -productVersion) | awk -F"*" '{print $2}' | sed -e 's/^ *//' | tr -d '\n') --verbose
rm /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install elixir
```

## Bước 2: Cài đặt Phoenix
```shell
mix local.hex --force
mix archive.install hex phx_new 1.4.0 --force
```

## Bước 3: Tạo project
```
mix phx.new hello_world --no-webpack --no-ecto --no-html
```

## Bước 4: Hello world
Sửa file `lib/hello_web/router.ex` để chứa nội dung sau:

```elixir
defmodule HelloWorldWeb.Router do
  use HelloWorldWeb, :router

  pipeline :api do
    plug :accepts, ["json", "html"]
  end

  scope "/", HelloWorldWeb do
    pipe_through :api
    get "/", PageController, :index
  end

end
```

`lib/hello_world_web/controllers/page_controller.ex`

```elixir
defmodule HelloWorldWeb.PageController do
  use HelloWorldWeb, :controller

  def index(conn, _params) do
      text(conn, "Hello, world!")
  end
end
```

## Bước 5: Build và chạy
Chạy các dòng lệnh sau để khởi tạo web app ở cổng 4000, sau đó kiểm tra app của bạn đang chạy bằng cách tạo request từ một terminal khác.

```shell
cd hello_world
mix phx.server
# in another terminal
curl http://localhost:4000/
```

## Bước 6: Thêm Passenger
Bạn sẽ cần Passenger đã được cài đặt, theo hướng dẫn tại [đây](https://www.phusionpassenger.com/docs/tutorials/installation/ruby/)
Sau đó bạn cần chạy web app bằng Passenger bằng `cd` đến thư mục của app và chạy câu lệnh sau: `passenger start --app-start-command 'env PORT=$PORT MIX_ENV=prod mix phx.server'`.

Do đoạn cuối bài hướng dẫn viết hơi khó hiểu nên mình xin phép để nguyên văn
> Passenger requires that applications listen on a particular port that Passenger has chosen, which it provides to the application by replacing the `$PORT` string in its startup command with the actual port number. Regardless of how your app accepts port arguments, the startup string must be able to convert from a cli argument to what works for your app. In our example we converted the port argument to an envvar to show how one may need to change how the port is passed to your app.

Bạn có thể kiểm tra rằng mọi thứ đang hoạt động bằng cách `curl http://localhost:3000`. Để dừng Passenger chỉ cần Ctrl+C ở terminal bạn đang khởi chạy Passenger.

Dưới đây là các commands: 
```shell
passenger start --app-start-command 'env PORT=$PORT MIX_ENV=prod mix phx.server'
# in another terminal
curl http://localhost:3000
```