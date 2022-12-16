# Làm thế nào để đặt biến môi trường trong XCode.

Các bạn sẽ hẳn rất quên thuộc đối với Preprocessor Directive. 

```
#if DEBUG
    print("print debug value", x)
#endif
```

Nhưng hôm này mình sẽ giới thiệu ProcessInfo để sử dụng trong dự án.

## Process Info 
> The process information agent can return information such as arguments, environment variables, host name, and process name. The processInfo class method returns the shared agent for the current process—that is, the process whose object sent the message. For example, the following line returns the NSProcessInfo object, which then provides the name of the current process

## Biến môi trường là gì?
Biến môi trường (Enviroment Variables) là các giá trị có thể được thêm vào chương trình của bạn trong thời gian chạy. Dùng nó để sử dụng cấu hình dự án thì rất ngon nhé. Bạn có thể sử dụng Biến môi trường để đặt các tùy chọn này một cách rất đơn giản.

## Cách cài đặt

1. Chọn Scheme và Edit Scheme đó.
2. Thêm key và value ở phần Run / Enviroment Variables 

![](https://images.viblo.asia/11ce2ddb-4506-4091-9088-8bd8d84a77bc.png)


## Sử dụng 

Ở trong dự án, bạn chỉ cần truy cập như đoạn code sau.

```
ProcessInfo.processInfo.environment["verbose_level"]
```

ProcessInfo.processInfo.environment cung cấp cho chúng ta 1 dictionary <String, String>. Vì vậy để sử dụng, bạn cần key và parse qua kiểu dữ liệu mà bạn mong muốn.

```
if ProcessInfo.processInfo.environment["verbose_level"] == "verbose"
{
   print("debug statements")
}
```

Bạn có thể dùng nó để config về API, chế độ Debug / Release ...

## Tuy nhiên ...

Ở trên thì bạn phải hardCode, nó ko phải là cách hay. Chúng ta có thể thay bằng enum như sau.

```
enum EnvironmentVariables: String {
   case verbose_level
   var value: String {
      let v = ProcessInfo.processInfo.environment[rawValue]
      return v ?? “”
   }
}

// Use case
if EnvironmentVariables.verbose_level.value == "verbose" {
   print("debug info")
}
```


#### Nguồn:
https://derrickho328.medium.com/xcode-custom-environment-variables-681b5b8674ec