# Giới thiệu
(1 phút dành cho quảng cáo) Trong lúc rảnh rỗi, mình và bạn @bs90 có làm một số game websocket nho nhỏ với mục tiêu vừa giải trí vừa học hỏi công nghệ mới và để mọi người có những giờ phút chơi game với nhau :smiley: 

![](https://matrix.heasygame.com/images/ogimage.png)

- Trang chủ: [Heasygame - We make hard easy games ](http://heasygame.com/)
- [Matrix game](https://matrix.heasygame.com/) (original)
- [Blokus](https://blokus.heasygame.com/) (implement của Blokus Classic và Blokus Duo: [Wikipedia](https://en.wikipedia.org/wiki/Blokus))

Hai game đều được viết bằng [Phoenix](https://phoenixframework.org/) và deploy qua [Gigalixir](https://gigalixir.com) (và còn kha khá lỗi, rất mong nhận được feedback của mọi người :smiley:). Trong bài này mình muốn tóm tắt cách đưa MessagePack vào làm serializer cho Phoenix Socket để tối ưu băng thông đường truyền.

# Tại sao lại là MessagePack?

Thông thường, khi giao tiếp bằng websocket, chúng ta vẫn dùng phổ biến nhất đó là JSON. JSON có cấu trúc đơn giản, dễ hiểu cho người code (human readable), được hỗ trợ rộng rãi, thuận tiện cho việc parse dữ liệu. Tuy nhiên, đối với những dữ liệu JSON lớn (> 1MB chẳng hạn) thì việc sử dụng JSON có thể là không hiệu quả, hoặc tần số gửi nhận packet giữa client và server là nhiều (VD trong những game socket cần realtime như http://slither.io/) thì việc tối ưu băng thông là cần thiết.

Thay vì sử dụng JSON, chúng ta có thể dùng binary để tránh bị over-head khi parse dữ liệu (data serialization). Có rất nhiều các lựa chọn khác nhau cho việc này: ProtoBuff, FlatBuffers, BSON,... tham khảo thêm tại [đây](https://www.sitepoint.com/data-serialization-comparison-json-yaml-bson-messagepack/) còn mình sẽ dùng thử [MessagePack](https://msgpack.org/) kết hợp với gzip để nén dữ liệu.

![](https://msgpack.org/images/intro.png)

[MessagePack](https://msgpack.org/) được quảng cáo là `It's like JSON.but fast and small.` (đúng là nhỏ hơn thật :v)
# Phoenix Socket

Thông thường chúng ta sẽ định nghĩa transport cho websocket trong Phoenix như sau:

```elixir
# lib/blokus_game_web/channels/player_socket.ex

defmodule BlokusGameWeb.PlayerSocket do
  use Phoenix.Socket

  ## Channels
  channel("lobby", BlokusGameWeb.LobbyChannel)
  channel("game:*", BlokusGameWeb.GameChannel)

  ## Transports
  transport(:websocket, Phoenix.Transports.WebSocket)
```

tức là mặc định là JSON serializer. Ta có thể sử dụng custom serializer bằng cách khai báo như sau:

```elixir
  transport(:websocket, Phoenix.Transports.WebSocket, serializer: [{BlokusGame.MsgpaxSerializer, "~> 2.0.0"}])
```

và định nghĩa `BlokusGame.MsgpaxSerializer` để thực hiện encode/decode packet truyền đến. Theo [document](https://hexdocs.pm/phoenix/Phoenix.Transports.WebSocket.html#module-serializer), module này cần phải implement `Phoenix.Transports.Serializer` behaviour (tương tự interface trong các ngôn ngữ khác).

> Serializer
> 
> By default, JSON encoding is used to broker messages to and from clients. A custom serializer may be given as a module which implements the `encode!/1` and `decode!/2` functions defined by the Phoenix.Transports.Serializer behaviour.
> The `encode!/1` function must return a tuple in the format `{:socket_push, :text | :binary, String.t | binary}`.

Cụ thể là các hàm sau:

- `decode!(iodata, options)` : Decodes iodata into Phoenix.Socket.Message struct
- `encode!(arg0)`: Encodes Phoenix.Socket.Message struct to transport representation
- `fastlane!(arg0)`: Translates a Phoenix.Socket.Broadcast struct to fastlane format

# Cài đặt MessagePack phía server

Ta cần thêm package [msgpax](https://hexdocs.pm/msgpax/Msgpax.html) vào trong project:

```elixir
# mix.exs

  defp deps do
    [
      ...
      {:msgpax, "~> 2.0"}
    ]
  end
```

Chạy `mix deps.get` để fetch package về. Ta sẽ thêm một file `lib/blokus_game/msgpax_serializer.ex` với nội dung như sau:

```elixir
# lib/blokus_game/msgpax_serializer.ex

defmodule BlokusGame.MsgpaxSerializer do
  @moduledoc false
  @behaviour Phoenix.Transports.Serializer

  alias Phoenix.Socket.Reply
  alias Phoenix.Socket.Message
  alias Phoenix.Socket.Broadcast

  @gzip_threshold 512

  @doc """
  Translates a `Phoenix.Socket.Broadcast` into a `Phoenix.Socket.Message`.
  """
  def fastlane!(%Broadcast{} = msg) do
    msg = %Message{topic: msg.topic, event: msg.event, payload: msg.payload}

    {:socket_push, :binary, pack_data(encode_v1_fields_only(msg))}
  end

  @doc """
  Encodes a `Phoenix.Socket.Message` struct to MessagePack binary.
  """
  def encode!(%Reply{} = reply) do
    msg = %Message{
      topic: reply.topic,
      event: "phx_reply",
      ref: reply.ref,
      payload: %{status: reply.status, response: reply.payload}
    }

    {:socket_push, :binary, pack_data(encode_v1_fields_only(msg))}
  end

  def encode!(%Message{} = msg) do
    {:socket_push, :binary, pack_data(encode_v1_fields_only(msg))}
  end

  @doc """
  Decodes MessagePack binary into `Phoenix.Socket.Message` struct.
  """
  def decode!(message, _opts) do
    message
    |> Msgpax.unpack!()
    |> Phoenix.Socket.Message.from_map!()
  end

  defp encode_v1_fields_only(%Message{} = msg) do
    msg
    |> Map.take([:topic, :event, :payload, :ref])
    |> Msgpax.pack!(iodata: false)
  end

  defp pack_data(data) do
    gzip_data(data, byte_size(data))
  end

  defp gzip_data(data, size) when size < @gzip_threshold, do: data
  defp gzip_data(data, _size), do: :zlib.gzip(data)
end
```

Logic chính khi encode nằm ở `encode_v1_fields_only/1` thực hiện việc encode dữ liệu từ server trả về thành binary (do chúng ta truyền vào `iodata: false`, còn mặc định sẽ đưa về Erlang term). Khi decode chúng ta đơn giản là làm ngược lại.

Chú ý: Khi encode thì cần đưa struct của Game về dạng Map, ví dụ như sau:

```elixir
# lib/blokus_game/game.ex

def serialize(game) do
  %{
    game | grid: serialize_grid(game)
  }
  |> Map.from_struct
end
```

Sau khi đã pack dữ liệu, ta có thể tiến thêm 1 bước tối ưu nữa bằng các nén dữ liệu. Ở đây mình dùng `gzip` đã có sẵn trong thư viện của Erlang với mức threadhold là 512 bytes, nghĩa là các dữ liệu nhỏ hơn sẽ không được nén. Tham khảo google thì thấy recommend là từ 150 ~ 1000 bytes. Nén dữ liệu dưới 150 bytes ngược lại còn làm dữ liệu to ra :smiley:

Vậy là xong phía server.

# Cài đặt MessagePack phía client

Khi thực hiện kết nối websocket phía client trong phoenix, sử dụng `phoenix.js` ta thường làm như sau:

```js
let socket = new Socket("/socket", {params: {id: window.PlayerId}})
```

Khi đó sẽ sử dụng mặc định hàm encode/decode trong `phoenix.js`:

```js

// assets/node_modules/phoenix/assets/js/phoenix.js

let Serializer = {
  encode(msg, callback){
    let payload = [
      msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload
    ]
    return callback(JSON.stringify(payload))
  },

  decode(rawPayload, callback){
    let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload)

    return callback({join_ref, ref, topic, event, payload})
  }
}
```

vậy 2 hàm này sẽ nhận vào 2 tham số: `msg` là dữ liệu truyền vào, sau khi đã encode/decode xong thì thực hiện `callback`.

Ta định nghĩa hàm encode/decode riêng như sau:

```js
let socket = new Socket("/socket", {params: {id: window.PlayerId}, encode: encodeMessage, decode: decodeMessage})
socket.connect()
socket.conn.binaryType = 'arraybuffer'
```

Chú ý set `arraybuffer` để đưa transport sang binary. Cài đặt [msgpack-js-browser](https://www.npmjs.com/package/msgpack-js-browser) bằng `npm i msgpack-js-browser` và định nghĩa custom serializer như sau:

```js
const msgpack = require('msgpack-js-browser')

...

let encodeMessage = function (rawdata, callback) {
  if (!rawdata) {
    return;
  }

  let msg = msgpack.encode(rawdata);

  return callback(msg);
}

let decodeMessage = function (rawdata, callback) {
  if (!rawdata) {
    return;
  }

  let binary = new Uint8Array(rawdata);
  let data;
  //check for gzip magic bytes
  if (binary.length > 2 && binary[0] === 0x1F && binary[1] === 0x8B) {
    let inflate = new Zlib.Gunzip(binary);
    data = inflate.decompress();
    console.log('compressed:', binary.length, 'bytes | inflated:', data.length, 'bytes');
  } else {
    console.log('plain msgpacked:', binary.length, 'bytes');
    data = binary;
  }
  let msg = msgpack.decode(data.buffer);

  return callback(msg);
}
```

với dữ liệu từ client đẩy lên có kích thước nhỏ, ta sẽ chỉ pack lại và đẩy lên. Dữ liệu server trả vè sẽ được kiểm tra xem đã được nén chưa, có thì giải nén trước rồi mới decode.
Thêm `<script src='https://rawgithub.com/imaya/zlib.js/master/bin/gunzip.min.js'></script>` vào phần meta của trang để có thể dùng thư viện nén này.

# Kết quả

![](https://images.viblo.asia/c79e0644-e2d3-4fcc-b646-8b64ff012fab.png)

với dữ liệu 1786 bytes, sau khi nén lại chỉ còn 827 bytes (~ 46%) khá tốt đấy chứ nhỉ :smiley:. Tất nhiên, tỉ lệ nén còn phụ thuộc và nội dung của dữ liệu, cũng như ta hoàn toàn có thể tối ưu dữ liệu chỉ trả về những thứ cần thiết nhưng việc đưa vào sử dụng messagepack cũng là một phương án đáng xem xét.


# Tham khảo

- https://nerds.stoiximan.gr/2016/11/23/binary-data-over-phoenix-sockets/
- https://strongwing.studio/2018/07/07/setting-up-phoenix-channels-to-use-messagepack-for-serialization/
- http://blog.infinite-lee.com/2017/10/19/flatbuffers-with-phoenix-channels-and-presence/
- https://www.sitepoint.com/data-serialization-comparison-json-yaml-bson-messagepack/