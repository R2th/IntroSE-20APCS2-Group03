## ** Tại sao Redis và Golang**

Hiện tại sự kết hợp giữa golang và redis là cực mạnh và rất phổ biến để tăng hiệu năng cho ứng dụng. Hầu như tất cả các công ty tuyển dụng đều yêu cầu về việc đã từng làm qua với redis. 

## **Dựng Redis local**

1. Dùng docker:
*  Create file docker name: *Dockerfile* và copy đoạn text sau vao
```
FROM redis:latest
```
* Run lệnh:
```
docker build -t redis-viblo .
```
* Kiểm tra image đã thành công:
```
docker images
```
tại trường *repository* xuất hiện redis là đã thành công.
* Run image thành container:
```
docker run --name redis-viblo -p 6379:6379 -d redis-viblo
```
* Kiểm tra container thành công:
```
docker ps
```
tại trường NAMES thấy *redis-viblo* là xong.

2. Cài trực tiếp trên máy:  thực hiện tuần tự từng lệnh.
```
brew install redis
brew services start redis
brew services info redis
redis-cli
```
=> kết quả:
![](https://images.viblo.asia/8f99c9e1-21f2-4dc9-8e3d-fa8c0c780962.png)

## **Golang Connect**
### **Init Redis**
1. Source code: sài source này lúc trước mình đã làm [source](https://viblo.asia/p/docker-golang-create-and-build-image-don-gian-Eb85oAD6Z2G)
2. Cài thư viện:
```
go get github.com/go-redis/redis/v8
```
3. Kết nối đến redis:
```
func InitRedis() {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	fmt.Println(rdb)
	rdb.Set(context.Background(), "abc", "value-abc", time.Duration(time.Second*199))
}
```
=> sau khi connect thì lưu xuống redis *key* abc và *value* value-abc
4. Check redis-cli:
![](https://images.viblo.asia/3adf3a73-f453-464d-969a-3f29dbd4d6d7.png)

### Get - Set thông qua api****
**1. Set value**
Code:
```
func Set(w http.ResponseWriter, req *http.Request) {
	cmdR := redislocal.RedisIn.Set(context.Background(), "set", "value-set", time.Duration(time.Second*199))
	valueResut := []byte("")
	if cmdR.Err() != nil {
		tem := []byte("redis set error \n")
		valueResut = append(valueResut, tem...)
	} else {
		tem := []byte("redis set ok \n")
		valueResut = append(valueResut, tem...)
	}
	w.Write(valueResut)
}
```
curl:
```
curl localhost:8100/set
```

=> redis set ok là set value vào redis ok, * redis-cli* execute *keys *  sẽ thấy key là set
![](https://images.viblo.asia/0b169f07-6c4d-434e-9f08-adf0e11e7556.png)

**2. Get value**
code:
```

func Get(w http.ResponseWriter, req *http.Request) {
	cmdR := redislocal.RedisIn.Get(context.Background(), "set")
	valueResut := []byte("Get ")
	if cmdR.Err() != nil {
		tem := []byte("redis get not found \n")
		valueResut = append(valueResut, tem...)
	} else {
		value, err := cmdR.Bytes()
		if err != nil {
			tem := []byte("redis get err, err:")
			tem = append(tem, []byte(err.Error())...)
			valueResut = append(valueResut, tem...)
		} else {
			text := []byte("redis get ok, value:")
			text = append(text, value...)
			valueResut = append(valueResut, text...)
		}
	}
	line := []byte("\n")
	valueResut = append(valueResut, line...)
	w.Write(valueResut)
}
```
curl:
```
curl localhost:8100/get
```
* kết quả key tồn tại: *Get redis get ok, value:value-set*
* key không tồn tại: *Get redis get not found*

SourceCode: https://github.com/ducnpdev/golang-demo

Tham Khao:
https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/
https://github.com/go-redis/redis