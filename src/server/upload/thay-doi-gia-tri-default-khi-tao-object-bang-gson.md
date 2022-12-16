Khi sử dụng Gson (https://github.com/google/gson), nhiều trường hợp mình cần phải thay đổi những giá trị mặc định mà Gson gán cho một field nào đó trong quá trình tạo ra Object từ json string. Chẳng hạn nhận được null hoặc rỗng thì cần gán cho nó một giá trị mặc định. Ở đây mình có một ví dụ đơn giản, trong một trường hợp đơn giản.

Object:
```
public class VideoInfo {
	public int id;
	public String name;
	public String time;
}
```

Input jsonString:
`{"id":1,"name":"Nhím xù","time":null}`

Thông thường nếu dùng 

`VideoInfo videoInfo = new Gson().fromJson(jsonString, VideoInfo.class);`

thì "time" vẫn bằng null. 

Để có thể set được giá trị cho nó thì có thể custom một TypeAdapter (https://google.github.io/gson/apidocs/com/google/gson/TypeAdapter.html) và có thể xử lý tất cả những gì bạn muốn ở trong này:

```
public static class VideoInfoAdapter extends TypeAdapter<VideoInfo> {
		public VideoInfo read(JsonReader reader) throws IOException {
			VideoInfo videoInfo = new VideoInfo();
			String name = null;
			while (reader.hasNext()) {
				JsonToken nextToken = reader.peek();
				if (JsonToken.BEGIN_OBJECT.equals(nextToken)) {
					reader.beginObject();
				} else if (JsonToken.NAME.equals(nextToken)) {
					name = reader.nextName();
				} else if (JsonToken.STRING.equals(nextToken)) {
					if (name == null) continue;
					switch (name) {
						case "name":
							videoInfo.name = reader.nextString();
							break;
						case "time":
							String time = reader.nextString();
							if (time.isEmpty()) {
								videoInfo.time = String.valueOf(System.currentTimeMillis());
							}
							break;
					}
				} else if (JsonToken.NULL.equals(nextToken)) {
					if (name == null) continue;
					switch (name) {
						case "time":
							reader.nextNull();
							videoInfo.time = String.valueOf(System.currentTimeMillis());
							break;
					}
				} else if (JsonToken.NUMBER.equals(nextToken)) {
					if (name == null) continue;
					switch (name) {
						case "id":
							videoInfo.id = reader.nextInt();
							break;
					}
				}
			}
			return videoInfo;
		}
		
		public void write(JsonWriter writer, VideoInfo value) {
		}
	}
```

Chẳng hạn mình có một cái TypeAdapter đơn giản như trên, nếu trong jsonString, value của key "time" rỗng hoặc null thì sẽ gán cho field "time" của object giá trị mặc định là thời gian hiện tại.
Để sử dụng cần register nó vào GsonBuider:
```
GsonBuilder gsonBuilder = new GsonBuilder().registerTypeAdapter(VideoInfo.class, new VideoInfoAdapter());
Gson gson = gsonBuilder.create();
VideoInfo videoInfo = gson.fromJson(jsonString, VideoInfo.class);
```

Kết quả: 
![](https://images.viblo.asia/1ba5c805-70d5-4c04-836b-0492b8842f98.PNG)

### ***Thank for reading***