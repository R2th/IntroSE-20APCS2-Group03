Debugging is an essential part of software development. Coming from a dynamic world of **Ruby** like myself where one  can just drop in **binding.pry** or **byebug** and play around with context, debuging in **Golang** is a bit ... daunting. So today I would like share a bit of what I found useful during my time of working with Golang.

## 1. fmt Package
The most basic tool for printing value of variable in golang is **fmt** package. This package offers quite a few functions to work with printing and formating output and what we are interested in here are printing related functions **Print**, **Println** and **Printf**. **Print** and **Println** write the value to standard output using **default** formats or its operands while **Printf** let us specify fotmated string we wanted to use, this quite useful because we can put in various format along with custom message to get a verbose output when debugging. Below is a table of special format character that we can used.<br /><br />

### 1.1 Interface
Example: **[]int{10,20}**
| Format | Output | Description |
| -------- | -------- | -------- |
| %v     | [10 20]     | Default format used in **Print** and **Println**    |
| %#v | []int{10,20} | Go-syntax format |
| %T | []int | Type of the value |
<br />

### 1.2 String or Byte Slice
Example: **"Hello"**
| Format | Output | Description |
| ---- | ---- | ---- |
| %s | Hello | Plain string |
| %10s | ␣␣Hello | 10 width, right justify |
| %-10s | Hello␣␣ | 10 width, left justify |
| %x| 48656c6c6f | Hex dump of byte value |
<br />

### 1.3 Integer
Example: **10**
| Format | Output | Description |
| ---- | ---- | ---- |
| %d | 10 | Plain integer |
| %10d | ␣␣10 | 10 width padded with space, right justify |
| %-10d | 10␣␣ | 10 width padded with space, left justify |
| %05d| 00010 | 5 width padded with zero |
| %b| 1010 | Binary value of 10 |
| %o| 12 | Octal value of 10 |
| %x| a | Hexadecimal value of 10 |
<br />

### 1.4 Float
Example: **15.5**
| Format | Output | Description |
| ---- | ---- | ---- |
| %f | 15.500000 | Plain float |
| %.2f| 15.50 | Default width, precision 2 |
| %e | 1.550000e+01 | Scientific notation |
<br />

Use **%p** for pointer value

## 2. log Package
Development is not the only time you want to debug something, infact it is quite common to debug in other environment as well such as **staging** or **production**, so printing to the standard output is not a viable options, we want to log the debug info to a file so that we can digest that file later on to find out what's going on. There many opinions and disscusions about what is the stadard format for logging out there so I won't go into details here. <br /><br />
What we want to at least include in the log is date & time along with logging info. Fortunately **log** package has just what we need to do this. Below is how to create a logger instance.

```Go
f, err := os.Create("/path/to/file.log")
if err != nil {
    panic(err)
}
info := log.New(f, "INFO: ", log.LstdFlags)
```
The first argument to **New** is any type that implement an **io.Writer** interface, the second argument is the prefix string and the last one is the output flag

### 2.1 Logger Flag
Below table show what each flag can used to include more information into each log.

| Flag | Output |
| -------- | -------- |
| Ldate     | 2019/03/24  |
| Ltime     | 10:23:51  |
| Lmicroseconds     | 10:23:51.123123  |
| Llongfile     | /a/b/c/d.go:23  |
| Lshortfile     | d.go:23  |
| LUTC     | UTC rather than the local time zone when using with Ldate or Ltime  |
| LstdFlags     | Ldate\|Ltime  |
<br />

And here we can use a newly created instance to log info to file
```Go
info.Print("something")
// INFO: 2019/03/24 10:23:51 something
```

Beside **Print[f,ln]** family, **log.Logger** also has **Fatal[f,ln]**, **Panic[f,ln]** family methods along with **Output**.

### 2.2 Encapsulate logger struct
**log.Looger** provided us with basic logging functionalities, but in real world application we need something more that just a basic. We need to a separate logging level like **debug**, **info**, **error** and so on. To get this we need our own custom logger type. Here is the minimal implementation to get what we need.
```Go
type Logger struct {
    log *log.Logger
    m   *sync.Mutex
}

func New(out io.Writer, flags int) *Logger {
    return &Logger{
        log: log.New(out, "", flags),
        m:   &sync.Mutex{},
    }
}

func (l *Logger) Info(v ...interface{}) {
    l.logInfo("INFO: ", v...)
}

func (l *Logger) Error(v ...interface{}) {
    l.logInfo("ERROR: ", v...)
}

func (l *Logger) Debug(v ...interface{}) {
    l.logInfo("DEBUG: ", v...)
}

func (l *Logger) logInfo(prefix string, v ...interface{}) {
    l.m.Lock()
    defer l.m.Unlock()

    l.log.SetPrefix(prefix)
    l.log.Print(v...)
}
```
Mutex is used to protected **SetPrefix** from multiple goroutines

## 3. Conclusion
Debuggin in Golang might not be as fun as in Ruby or other languages, but with the right tool we can still get what we want. In the next post I will talk about some error handling techinique I found useful as well as take a look at Golang **debugger** where you can set a break point and have some fun.