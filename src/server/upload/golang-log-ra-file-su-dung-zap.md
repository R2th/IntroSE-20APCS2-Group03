## Tại sao lại cần log ra file
* Hiện tại đa số anh em develop khi phát triển chức năng phần lớn là chỉ logging ra console, sau đó lên các môi trường như dev, pro,.. thì dùng các tool sẽ hỗ trợ việc collector mà không cần quan tâm gì cả.
* Khi anh em dev trong những hệ thống mà không có những ứng dụng hỗ trợ việc collector thì anh em cần log ra file.
* Mình cần cài đặt 2 thư viện: [zap](https://github.com/uber-go/zap) và [lumberjack](https://github.com/natefinch/lumberjack)

## Code
1. Config logger đơn giản:
```
type ConfigLogger struct {
	Mode              string `yaml:"mode" mapstructure:"mode"`
	DisableCaller     bool   `yaml:"disable_caller" mapstructure:"disable_caller"`
	DisableStacktrace bool   `yaml:"disable_stacktrace" mapstructure:"disable_stacktrace"`
	Encoding          string `yaml:"encoding" mapstructure:"encoding"`
	Level             string `yaml:"level" mapstructure:"level"`
	ZapType           string `yaml:"zap_type" mapstructure:"zap_type"`
}
```
2. Map log level:
```
var loggerLevelMap = map[string]zapcore.Level{
	"debug":  zapcore.DebugLevel,
	"info":   zapcore.InfoLevel,
	"warn":   zapcore.WarnLevel,
	"error":  zapcore.ErrorLevel,
	"dpanic": zapcore.DPanicLevel,
	"panic":  zapcore.PanicLevel,
	"fatal":  zapcore.FatalLevel,
}
```
3. Tạo interface các function:
```
type ILogger interface {
	Debug(args ...interface{})
	Debugf(template string, args ...interface{})
	Info(args ...interface{})
	Infof(template string, args ...interface{})
	Warn(args ...interface{})
	Warnf(template string, args ...interface{})
	Error(args ...interface{})
	Errorf(template string, args ...interface{})
	DPanic(args ...interface{})
	DPanicf(template string, args ...interface{})
	Fatal(args ...interface{})
	Fatalf(template string, args ...interface{})
}
```
4. Tạo instance logger:
```
var Logger *logger = &logger{}
```
5. Get đường dẫn của file log:
```
func getPath() string {
	path := ""
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	path = dir + "/logs"
	if _, err := os.Stat(path); os.IsNotExist(err) {
		err := os.Mkdir(path, os.ModeDir)
		if err != nil {
			panic(err)
		}
	}
	if strings.Contains(runtime.GOOS, "window") {
		path = path + "\\"
	} else {
		path = path + "/"
	}
	return path + "log.log"
}
``` 
* hàm *Getwd* là lấy đường dẫn hiện tại khi chạy chương trình.
* hàm *os.Stat* kiểm tra đường dẫn có tồn tại hay không.
* hàm *os.Mkdir* tạo folder với đường dẫn trên.

6. Khi logging thì mỗi api cần có một uuid.
```
func (l *logger) SetLogID(key string) {
	l.key = key
}
``` 
* sau này khi viết API, trong 1 api chúng ta log ra 5 message chẳng hạn, thì set *SetLogID* để khi filter dựa vào id này để search.
* hàm này đa số sẽ được sử dụng trong *middleware*

7. Implement các function trong interface: code này dài anh em xem trong [link](https://github.com/ducnpdev/golang-demo/blob/logger/logger/log.go).

8. Hàm configure để log ra file:
```
func configure() zapcore.WriteSyncer {
	path := getPath()
	fmt.Println(path)
	w := zapcore.AddSync(&lumberjack.Logger{
		Filename:   path,
		MaxSize:    1, // megabytes
		MaxBackups: 3,
	})
	return zapcore.NewMultiWriteSyncer(
		zapcore.AddSync(os.Stderr),
		zapcore.AddSync(w),
	)
}
```
* *MaxSize* là size của file, mặc định là 100 megabytes, demo nên mình để 1 megabytes.
* *MaxBackups* là tổng số lượng file sẽ được lưu lại, hiện tại mình để 3 có nghĩa là trong folder *logs* sẽ có 3 file lưu trữ lại: 1.log, 2.log, 3.log . Khi có một file mới 4.log thì file 1.log sẽ mất.
 
9. Cuối cùng là hàm New:
```
func Newlogger(cfg ConfigLogger) ILogger {
	logLevel, exist := loggerLevelMap[cfg.Level]
	if !exist {
		logLevel = zapcore.DebugLevel
	}

	var encoderCfg zapcore.EncoderConfig
	if cfg.Mode == "pro" {
		encoderCfg = zap.NewProductionEncoderConfig()
	} else {
		encoderCfg = zap.NewDevelopmentEncoderConfig()

	}
	encoderCfg.LevelKey = "LEVEL"
	encoderCfg.CallerKey = "CALLER"
	encoderCfg.TimeKey = "TIME"
	encoderCfg.NameKey = "NAME"
	encoderCfg.MessageKey = "MESSAGE"
	encoderCfg.EncodeDuration = zapcore.NanosDurationEncoder
	encoderCfg.EncodeTime = zapcore.ISO8601TimeEncoder
	encoderCfg.FunctionKey = "FUNC"
	var encoder zapcore.Encoder
	if cfg.Encoding == "console" {
		encoder = zapcore.NewConsoleEncoder(encoderCfg)
	} else {
		encoder = zapcore.NewJSONEncoder(encoderCfg)
	}

	core := zapcore.NewCore(encoder, configure(), zap.NewAtomicLevelAt(logLevel))
	loggerzap := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(0))
	sugarLogger := loggerzap.Sugar()

	logging := &logger{
		sugarLogger: sugarLogger,
		logger:      loggerzap,
		key:         uuid.NewString(),
		zapSugar:    strings.Contains(cfg.ZapType, "sugar"),
	}

	Logger = logging
	return logging
}
```

## Test
1. Tạo main.go function:
```
func main() {
	forever := make(chan int)
	logger.Newlogger(logger.ConfigLogger{})
	log := logger.GetLogger()
	for tick := range time.Tick(time.Millisecond) {
		log.Debug(tick)
	}
	<-forever
}
```
* tạo một chan forever để giữ function main không exit.
* một vòng lặp *time.Tick* cứ 1 *millisecond* thì sẽ write vào file.

2. Tạo folder logs: 
```
mkdir logs
```
3. run:
```
go run main.go
```
* folder logs sẽ tự split các file khi size đủ 1MB
![](https://images.viblo.asia/c335433e-590c-40ac-963d-5f7f22f80c19.png)

**Source**
https://github.com/ducnpdev/golang-demo/tree/logger

Tks anh,em:

**Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang