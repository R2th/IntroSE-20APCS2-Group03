Testing is a crucial part of software development and Go support for testing was built right into the language itself by providing a **testing** packages along with the command line tool, **go test**, to run test suites. The standard tool-chain also includes benchmarking and statement based code coverage.

### 1. Unit Testing
Coming from the other languages, testing in Go might feel a little bit out of place as the syntax deliberately avoids the use of assertions and leaves the responsibility for checking values and behaviour to the developer. Here is an example.

```Go
// main.go
package main

func Sum(x, y int) int {
    return x + y
}
```

```Go
// main_test.go
package main

import "testing"

func TestSum(t *testing.T) {
    sum := Sum(10, 20)
    if sum != 30 {
        t.Fail()
    }
}
```

To write test in Go you need to follow a fews rules

1. Put test code into a separate file name ended in **_test.go**
2. There is only one parameter for test function and it needs to be ***testing.T**
3. Each function must begin with **Test** follow by a word or phrase starting with a capital letter
4. Call one of **T** function such as **t.Fail** or **t.Error** to indicate testing failure

The test code can be placed into the same package or different package.

### 2. Testing Table
A testing table is a set of test cases where each entry in the table is a complete test case with input, output and expected value. This help remove the needs of copy and paste as you cover many difference cases.

```Go
func TestSum(t *testing.T) {
    table := []struct{
        x int
        y int
        n int
    }{
        {1,2,3},
        {2,3,5},
        {3,4,7},
    }
    
    for _, row := range table {
        n := Sum(row.x, row.y)
        if n != row.n {
            t.Errorf("Sum of %d + %d was not equal to %d. Got %d",
            row.x, row.y, row.n, n)
        }
    }
}
```

### 3. Run the Test
There are two ways to run test. One is to run the test in the same directory this will pick up any test files in current directory

```SH
$ go test
```

or run it with fully qualify package name like this

```SH
$ go test some/package/path
```

to get a verbos output append **-v** flag to the above command.<br /><br />

You may feel a little awkward leaving the test files in the same package, but rest assured Go won't pick them up when you build your application.

### 4. Code Coverage
The **go test** has built-in support for code coverage as well. To try out with the above example just append **-cover** flag. It will gives something similar to the following output.

```SH
$ go test -cover
PASS
coverage: 50.0% of statements
ok  	tt	0.005s
```

There is an other cool feature to Go **go test** and that is the ability to generate **HTML** coverage report. Take the above testing for example, to generate html content run these two commands.

```SH
$ go test -cover -coverprofile=coverage.prof
$ go tool cover -html=coverage.prof -o coverage.html
```

You can open the html file and see which part of your code is covered and which part isn't.