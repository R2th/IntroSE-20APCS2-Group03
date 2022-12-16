![](https://images.viblo.asia/1aeab53b-6647-4b95-afc8-fd5fe9e28874.png)
Trong bài viết này mình sẽ giới thiệu với các bạn cách xử dụng GenServer trong elixir.

## GenServer

GenServer là process giống như bất kỳ process nào trong Elixir, Nó được  sử dụng để thực thi mã không đồng  v.v. Ưu điểm của việc sử dụng server proces chung (GenServer)  là nó sẽ có một bộ interface functions chuẩn và bao gồm những functions để theo dõi và báo cáo lỗi của processs. Nó cũng sẽ phù hợp với một quá trình giám sát (supervision tree) processs.

GenServer trong elixir khá đơn giản. Nó có một giao thức cho phép bạn tạo ra một máy chủ ảo để gửi tin nhắn và nhận phản hồi bất đồng bộ.

Để hiểu rõ hơn về genserver chúng ta cùng xây dựng một ứng dựng đơn giản giúp gửi và nhận tín nhắn thông qua genserver.

## Xây dựng ứng dụng genserver

GenServer có 2 phần, 1 là phần của client, 2 là phần của server.  đầu tiên chúng ta sẽ đi xây dựng phía client, nơi mà users có thể gọi vào để truyền data hay command

### Public api for client

GenServer luôn luôn sử dụng PID để quản lý proceess của mình, mỗi genserver chạy sẽ tạo ra một PID khác nhau.

- Đầu tiên bạn cần tạo một file example.ex
```elixir
defmodule BatchQueue do
  use GenServer
  
  // Public api, user will be call to this fucntion
  def add(pid, item) do  
    GenServer.cast(pid, {:add, item})
  end
  def list(pid) do 
    GenServer.call(pid, :list)
  end
  def length(pid) do  
    GenServer.call(pid, :length)
  end
  def fetch(pid) do  
    GenServer.call(pid, :fetch)
  end
end
```

- Chúng ta sử dụng các hàm `GenServer.cast` và `GenServer.call` để gửi command và dữ liệu đến server.
- Phần code phía trên định nghĩ 4 method, trong đó có 3 methods sử dụng `GenServer.cast` và 1 sử dụng `GenServer.call`
- `GenServer.cast` cho phép GenServer sử lý bất đồng bộ.
-  `GenServer.call` sẽ xử lý đồng bộ FIFO (first in fisrt out).

> Chú ý cần hiểu rõ mục đích của bài toán để xử dụng phần `call và cast` cho hợp lý.


### Server

Phần server chính là nơi sẽ tiếp nhận dữ liệu được gửi tới từ `public api` thông qua 2 functions là `GenServer.cast` và `GenServer.call` đã nói ở trên

```elixir
defmodule BatchQueue do
  use GenServer
  
 #Public api, user will be call to this fucntion
  def add(pid, item) do  
    GenServer.cast(pid, {:add, item})
  end
  def list(pid) do 
    GenServer.call(pid, :list)
  end
  def length(pid) do  
    GenServer.call(pid, :length)
  end
  def fetch(pid) do  
    GenServer.call(pid, :fetch)
  end
end

# Server
def handle_cast({:add, item}, queue) do
{:noreply, :queue.in(item, queue)}
end

 def handle_call(:list, _from, queue) do
    {:reply, :queue.to_list(queue), queue}
  end
  
  def handle_call(:length, _from, queue) do
    {:reply, :queue.len(queue), queue}
  end
  
  def handle_call(:fetch, _from, queue) do
    with {{:value, item}, new_queue} <- :queue.out(queue) do
      {:reply, item, new_queue}
    else
      {:empty, _} ->
        {:reply, :empty, queue}
    end
  end
```

Phía client có 4 method sẽ tương ứng với 4 methods phía server.

- Nếu client sử dụng `cast` thì server cũng phải sử dụng `handle_cast`, nếu client là `call` thì server phải sử dụng `handle_call`
- Các hàm phía server đều là những hàm đơn giản, mình xin giải thích qua một chút như sau:

- `handle_cast/:add`: Hàm này sẽ thêm `data` được gửi từ public api đến server vào `:queue` (:queue này là một module của erlang), hàm này chạy bất động bộ.
- `handle_call/:list`: Hàm náy sẽ trả ra danh sách những data đã được thêm vào. Hàm này thự thi lần lượt, FIFO
- `handle_call/:fetch và handle_call/:length` cũng giống với :list ở trên, fetch sẽ trả ra 1 item trong :queue, còn length sẽ đếm số items có trong :queue


Cuối cùng trong GenServer chúng ta luôn cần 2 hàm sau để chạy:

```elixir
  def init(queue) do
    {:ok, queue}
  end
  
def start_link() do
   GenServer.start_link(__MODULE__, :queue.new())
end
```

Đầu tiên là `start_link`, hàm này chính là phần khởi tạo server lên, hàm này sẽ trả về 1 PID nếu thành công.

sau khi `start_link` thành công, thì hàm `init` mặc định sẽ được thực hiện tiếp theo để trả về 1 `state`.

Như vậy đã xây đựng xong 1 Genserver đơn giản, chúng ta cùng chạy xem sao:

```command
iex(1)> {:ok, pid} = BatchQueue.start_link()
{:ok, #PID<0.115.0>}
iex(2)> BatchQueue.length(pid)
0
iex(3)> BatchQueue.add(pid, "item-1")
:ok
iex(4)> BatchQueue.length(pid)
1
iex(5)> BatchQueue.add(pid, "item-2")
:ok
iex(6)> BatchQueue.length(pid)
2
iex(7)> BatchQueue.list(pid)
["item-1", "item-2"]
iex(8)> BatchQueue.fetch(pid)
"item-1"
iex(9)> BatchQueue.list(pid)
["item-2"]
iex(10)> BatchQueue.length(pid)
1
```

Như vậy là GenServer gửi và nhận data hoàn toàn OK

## Tài Liệu
- https://hexdocs.pm/elixir/GenServer.html
- https://becoming-functional.com/getting-started-with-elixirs-genserver-ed05a9202bef