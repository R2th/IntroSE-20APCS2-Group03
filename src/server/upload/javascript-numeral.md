Numeral.js là một thư viện javascript dùng để format số. Để dùng được thư viện này bạn cần phải import `numeral.min.js` . Tải về file min.js ở [đây](http://numeraljs.com/)
```
<script src="numeral.min.js"></script>
```
hoặc include từ cdnjs
```
<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
```
### convert từ integer hoặc string thành số
`var myNumeral2 = numeral('value');`

| đầu vào | đầu ra | 
| -------- | -------- |
| numeral(120)     | 120     | 
| numeral("50B") |50  |
| numeral("13rd") |13  |
| numeral("53,123.56") |53123.56  |
| numeral("-10%") | 10 |
| numeral("11:20:41") | NaN |
### Format số
```
let testNumeral = numeral(10000);
testNumeral.format('0,0');
>> 10,000
```

| value | format | đầu ra |
| -------- | -------- | -------- |
|12345  | 0,0.0000  |  12,345.0000 |
| 12345.23 | 0,0 | 12,345 |
| 12345 | 0,0.0 | 12,345.0 |
| 12345.12345 | 0.000 | 12345.123 |
| 123.123 | 00000 | 00123 |
| 123.123 | 000000,0 | 000,123 |
| 123.123 | 0[.]00000 | 123.12300 |
| -0.23 | .00 | -.23 |
| -0.23 | (.00) | (.23) |
| 1212121 | '0.0a' | 1.2m |
| 1234 | 0a | 1k |
| -1234 | 0a | -1k |
| 1 | 0o | 1st |
| 100 | 0o | 100th |

### Format currency
```
testNumeral = numeral(10000);
testNumeral.format('$0,0.00');
>> $10,000.00
```
| value | Format |	đầu ra |
| -------- | -------- | -------- |
| 12345.123 | 0,0.00đ | 12,345.12đ |
| 12345.1 | 0,0[.]00đ | 12,345.10đ|
| 12345 | 0,0[.]00đ |  12,345đ |
| 12345.123 | (0,0đ) | (12,345đ) |
| 1234567 | 0.00 a đ | 1.23m đ |

### Format byte

```
testNumeral = numeral(1024);
testNumeral.format(' 0b');
>>1KB
```

| value | Format | String |
| -------- | -------- | -------- |
| 123 | 0b | 123B |
| 1024 | 0b | 1KB |
| 2048 | 0 ib | 2 KiB |
| 3072 | 0.0 b | 3.1 KB |
| 7884486213 | 0.00b | 7.88GB |
| 3467479682787 | 0.000 ib | 3.154 TiB |

### Format %
| value | Format | String |
| -------- | -------- | -------- |
| 1 | 0% | 100% |
| 0.12345 | 0.00% | 12.34% |
| -0.43 | 0 % | -43 % |
| 0.1 | 0.000 % | 10.000% |
### Format thời gian
| value | Format | String |
| -------- | -------- | -------- |
| 25 |	00:00:00 |	0:00:25 |
| 238	| 00:00:00	| 0:03:58 |
| 63846 | 00:00:00 | 17:44:06 |

Tài liệu tìm hiểu thêm :

https://dzone.com/articles/format-and-manipulate-numbers-with-numeraljs

http://numeraljs.com/

https://github.com/adamwdraper/Numeral-js/tree/master/locales