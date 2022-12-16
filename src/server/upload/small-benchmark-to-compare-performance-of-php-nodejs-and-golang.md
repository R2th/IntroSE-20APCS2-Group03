Hello everyone,

Golang is said that has a great performance. So I decide to create a small benchmark to compare performance of PHP, NodeJS, and Golang.

# My Environment
- MacOS 3.1 GHz Intel Core i5
- PHP 7.2.6
- NodeJS 10.7.0
- Go 1.11.2

# Implementation code
## PHP Code
```php
function calc($total) {
	$before = microtime(true);
	$sum = 0;
	for ($i = 0; $i < $total; $i++) { 
		$sum += $i;
	}

	$after = microtime(true);

	echo (round($after - $before, 3) * 1000);
	echo "\n";
}
```

## NodeJS Code
```javascript
function calc(total) {
	var before = Date.now(),
		sum = 0;

	for (var i = 0; i < total; i++) {
		sum += i;
	}

	var after = Date.now();

	console.log(after - before);
}
```

## Golang Code
```go
func calc(total int) {
	before := time.Now().UnixNano()
	sum := 0
	for i := 0; i < total; i++ {
		sum += i
	}
	after := time.Now().UnixNano()
	fmt.Println((after - before) / 1000000)
}
```

# Benchmark

| No. Calculations (total) | PHP | NodeJS | Golang |
| -------- | -------- | -------- | -------- |
| 500M | 8064ms | 594ms | 222ms |
| 1B | 15821ms | 1178ms | 319ms |
| 10B | 170337ms | 11889ms | 3179ms |