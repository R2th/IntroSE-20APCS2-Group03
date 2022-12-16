![image.png](https://images.viblo.asia/79c2bbe2-ba44-4954-9750-230638038041.png)

*Câu chuyện cảm động của mình về việc tại sao lại nghiên cứu PHP core*

**Các bạn có thể xuống luôn phần dưới để đọc nội dung chính**

Nếu bạn là lập trình viên hay thậm chí là người hoạt động trong lĩnh vực công nghệ thông tin thì chắc hẳn PHP không còn là xa lạ. PHP là một ngôn ngữ lập trình phía server và được sử dụng rộng rãi cho việc lập trình web. PHP hiện tại là ngôn ngữ sử dụng phổ biến nhất vì nó dễ học, dễ tiếp cận và cũng dễ sử dụng nữa. Để sử dụng nó ta chỉ việc cài đặt XAMPP (trên Windows) hoặc cài các gói Apache hoặc NGNIX (trên Linux) và thêm file PHP là đã có thể có một demo đơn giản. Công việc cài đặt rất dễ dàng trên cả môi trường Windows và Linux và cú pháp của PHP rất thông dụng nên nó đã trở thành ngôn ngữ thông dụng trong hiện tại.

Mình được tiếp cận với PHP khi còn đang ngồi trên ghế nhà trường. Lúc mới tiếp cận, mình làm cho hiển thị ra dòng chữ **Hello World!** là đã nghĩ rằng: ta sắp thành ông hoàng PHP rồi, quá dễ :D. Sau một thời gian sử dụng vào đọc code PHP của người khác mình nhận ra rằng: PHP còn rất nhiều tính năng và hàm mà mình chưa sử dụng đến. Lúc này, mình mới nhận ra rằng mình cần phải trau dồi, học hỏi thêm nhiều, kiến thức của mình còn nông cạn quá.

Thời gian thấm thoát trôi và giờ mình đã không ngồi trên ghế nhà trường, trong lúc đang nghiên cứu code để tìm lỗ hổng. Thì mình gặp một đoạn code tự như sau:

```php
<?php
    $id = $_GET['id'];
    
    if (is_numeric($id)) {
        $sql = "SELECT * FROM $table WHERE id = {$id}";
        $result = $wpdb->query($sql);
        .....
    }
    .....
```

Lúc này, trong đầu mình lóe lên một vài câu hỏi: Không biết hàm `is_numeric` kia hoạt động như nào? Liệu mình có bypass được nó không nhỉ?

Thế là mình đã quyết định tìm hiểu xem liệu hàm `is_numeric` kia được viết ra sao?

Bài viết này, mình chia sẻ những gì mình tìm hiểu được. Với những gì được trình bày trong bài, nó có thể sẽ là nền tảng giúp những người có ý định đào sâu vào nghiên cứu code PHP mà đang chưa biết bắt đầu từ đâu.

Có một điều mình cần nói trước khi đi vào chi tiết đó là PHP được viết bằng ngôn ngữ **C** và **open source**.
# Tìm hiểu is_numeric
> Hàm `is_numeric` được xử lý như nào?

Để giải đáp các thắc mắc thì điều đầu tiên là mình cần tìm source code của PHP (vì PHP là **open source** nên source code ai cũng có thể tìm và đọc).

![image.png](https://images.viblo.asia/c2fbb96e-5edd-4eac-8ed6-2951d4c5f585.png)

Để tìm được code PHP theo mình nghĩ nó rất đơn giản, chỉ cần lên google và gõ vào ô tìm kiếm là ta có thể thấy ngay được kết quả cần tìm.

Tiếp đó, mình truy cập vào github, nhập từ khóa và chỉ tìm trong repository **php-src**

![image.png](https://images.viblo.asia/e8f7eb07-7a15-4427-b9b7-b2155b9d6eeb.png)

Với từ khóa này, có 16 kết quả tương ứng.

![image.png](https://images.viblo.asia/730bafc0-bf98-478d-a965-b3c4774b5945.png)

Sau một hồi tìm đọc và xem qua thì mình đã tìm được một nơi nhìn có vẻ là code tạo ra hàm `is_numeric`

![image.png](https://images.viblo.asia/e18cdfa4-8e4f-4c93-8d3f-7d3bd3c3a267.png)

Mình đi vào và xem kỹ hơn để xem liệu đây có chính xác là nơi đã tạo ra hàm mình cần tìm hay không? Nhưng khi mình nhìn vào **PHP_FUNCTION** thì mình khá là chắc chắn đây là nơi tạo ra hàm của PHP. Để tiếp tục xác nhận suy đoán của mình, mình tìm kiếm xem **PHP_FUNCTION** kia nó là cái gì? Ở đây, bạn cần phải có một chút kiến thức cơ bản về **C**. Trong **C** trong có từ khóa nào như vậy cả, đây có là là cái mà PHP tự định nghĩa. Mà tự định nghĩa và viết thế kia được thì nó là macro trong C rồi.

![image.png](https://images.viblo.asia/f95b0a95-3142-4b48-8a46-2a148bc0a6e4.png)

Với kết quả hiển thị ra thì **PHP_FUNCTION** là được định nghĩa bằng một macro khác. Lại tiếp tục tìm thôi!

![image.png](https://images.viblo.asia/8d7de489-098f-45e0-949e-6bbaa441695b.png)

![image.png](https://images.viblo.asia/76721de1-8960-4852-adef-49333b778351.png)

![image.png](https://images.viblo.asia/4e886632-472e-4c2c-b4db-612b8b7fc240.png)

Sau một hồi tìm kiếm thì **PHP_FUNCTION** nó là một kiểu fastcall (Cái này mọi người tự tìm hiểu thêm). Đến đây thì mình cũng rất là chắc chắn đây là hàm rồi. Nhưng vì chưa có kinh nghiệm về cái này nên mình vẫn chưa tin 100% được. Để chắc hơn nữa mình đi đến đọc đoạn code trong hàm **PHP_FUNCTION(is_numeric)** ở trên để xác thực thêm.

> /ext/standard/type.c
```c
/* {{{ Returns true if value is a number or a numeric string */
PHP_FUNCTION(is_numeric)
{
	zval *arg;

	ZEND_PARSE_PARAMETERS_START(1, 1)
		Z_PARAM_ZVAL(arg)
	ZEND_PARSE_PARAMETERS_END();

	switch (Z_TYPE_P(arg)) {
		case IS_LONG:
		case IS_DOUBLE:
			RETURN_TRUE;
			break;

		case IS_STRING:
			if (is_numeric_string(Z_STRVAL_P(arg), Z_STRLEN_P(arg), NULL, NULL, 0)) {
				RETURN_TRUE;
			} else {
				RETURN_FALSE;
			}
			break;

		default:
			RETURN_FALSE;
			break;
	}
}
/* }}} */
```

Mới đầu đọc code mình cũng thấy rất bỡ ngỡ vì chưa quen lắm, nhưng ngay lập tức mình không cần quan tâm nhiều đến những thứ mình làm mình bối rối (cái đoạn đầu trong hàm). Mình đọc và thấy rằng đây chỉ là quá trình **parse argument** nên bỏ qua. Mình chú ý vào phần trọng tâm đó là đoạn `switch ... case`. Trong này có hàm đáng chú ý là `is_numeric_string` (vì mình muốn truyền `string` để khai thác SQLi).

Lại tiếp tục công việc tìm code trong github. Lần này thì tìm cực hơn, mình phải sang tận trang 2 thì mới thấy code của nó.

![image.png](https://images.viblo.asia/94d19e1e-57e8-4ac9-a74c-3b0a2eab24a7.png)

Đoạn code như sau
> /Zend/zend_operators.h
```c
ZEND_API zend_uchar ZEND_FASTCALL _is_numeric_string_ex(const char *str, size_t length, zend_long *lval,
	double *dval, bool allow_errors, int *oflow_info, bool *trailing_data);

.....

static zend_always_inline zend_uchar is_numeric_string_ex(const char *str, size_t length, zend_long *lval,
	double *dval, bool allow_errors, int *oflow_info, bool *trailing_data)
{
	if (*str > '9') {
		return 0;
	}
	return _is_numeric_string_ex(str, length, lval, dval, allow_errors, oflow_info, trailing_data);
}

static zend_always_inline zend_uchar is_numeric_string(const char *str, size_t length, zend_long *lval, double *dval, bool allow_errors) {
    return is_numeric_string_ex(str, length, lval, dval, allow_errors, NULL, NULL);
}
```

Luồng của đoạn code trên như sau: `is_numeric_string` -> `is_numeric_string_ex` -> `_is_numeric_string_ex`

Trong này `_is_numeric_string_ex` chỉ là định nghĩ hàm mà không thấy đoạn code xử lý ở đâu. Ở đây, mình có thể tiếp tục sử dụng phương pháp tìm kiếm như trên để tìm cho ra code xử lý của hàm này. Nhưng có một điều cần để ý nữa là mình đang ở file **zend_operators.h**. Trong C, thường những file **.h** sẽ là nơi định nghĩa hàm, còn file **.c** sẽ viết code xử lý của hàm.

![image.png](https://images.viblo.asia/3410cd15-8434-48a6-92a8-42450a08e8fb.png)

Làm theo dự đoán, mình copy `_is_numeric_string_ex` và tìm kiếm trong file **zend_operators.c**

![image.png](https://images.viblo.asia/1a6cb81d-eb06-4d0d-9926-6bb0a577bc75.png)

```c
ZEND_API zend_uchar ZEND_FASTCALL _is_numeric_string_ex(const char *str, size_t length, zend_long *lval,
	double *dval, bool allow_errors, int *oflow_info, bool *trailing_data) /* {{{ */
{
	const char *ptr;
	int digits = 0, dp_or_e = 0;
	double local_dval = 0.0;
	zend_uchar type;
	zend_ulong tmp_lval = 0;
	int neg = 0;

	if (!length) {
		return 0;
	}

	if (oflow_info != NULL) {
		*oflow_info = 0;
	}
	if (trailing_data != NULL) {
		*trailing_data = false;
	}

	/* Skip any whitespace
	 * This is much faster than the isspace() function */
	while (*str == ' ' || *str == '\t' || *str == '\n' || *str == '\r' || *str == '\v' || *str == '\f') {
		str++;
		length--;
	}
	ptr = str;

	if (*ptr == '-') {
		neg = 1;
		ptr++;
	} else if (*ptr == '+') {
		ptr++;
	}

	if (ZEND_IS_DIGIT(*ptr)) {
		/* Skip any leading 0s */
		while (*ptr == '0') {
			ptr++;
		}

		/* Count the number of digits. If a decimal point/exponent is found,
		 * it's a double. Otherwise, if there's a dval or no need to check for
		 * a full match, stop when there are too many digits for a long */
		for (type = IS_LONG; !(digits >= MAX_LENGTH_OF_LONG && (dval || allow_errors)); digits++, ptr++) {
check_digits:
			if (ZEND_IS_DIGIT(*ptr)) {
				tmp_lval = tmp_lval * 10 + (*ptr) - '0';
				continue;
			} else if (*ptr == '.' && dp_or_e < 1) {
				goto process_double;
			} else if ((*ptr == 'e' || *ptr == 'E') && dp_or_e < 2) {
				const char *e = ptr + 1;

				if (*e == '-' || *e == '+') {
					ptr = e++;
				}
				if (ZEND_IS_DIGIT(*e)) {
					goto process_double;
				}
			}

			break;
		}

		if (digits >= MAX_LENGTH_OF_LONG) {
			if (oflow_info != NULL) {
				*oflow_info = *str == '-' ? -1 : 1;
			}
			dp_or_e = -1;
			goto process_double;
		}
	} else if (*ptr == '.' && ZEND_IS_DIGIT(ptr[1])) {
process_double:
		type = IS_DOUBLE;

		/* If there's a dval, do the conversion; else continue checking
		 * the digits if we need to check for a full match */
		if (dval) {
			local_dval = zend_strtod(str, &ptr);
		} else if (!allow_errors && dp_or_e != -1) {
			dp_or_e = (*ptr++ == '.') ? 1 : 2;
			goto check_digits;
		}
	} else {
		return 0;
	}

	if (ptr != str + length) {
		const char *endptr = ptr;
		while (*endptr == ' ' || *endptr == '\t' || *endptr == '\n' || *endptr == '\r' || *endptr == '\v' || *endptr == '\f') {
			endptr++;
			length--;
		}
		if (ptr != str + length) {
			if (!allow_errors) {
				return 0;
			}
			if (trailing_data != NULL) {
				*trailing_data = true;
			}
		}
	}

	if (type == IS_LONG) {
		if (digits == MAX_LENGTH_OF_LONG - 1) {
			int cmp = strcmp(&ptr[-digits], long_min_digits);

			if (!(cmp < 0 || (cmp == 0 && *str == '-'))) {
				if (dval) {
					*dval = zend_strtod(str, NULL);
				}
				if (oflow_info != NULL) {
					*oflow_info = *str == '-' ? -1 : 1;
				}

				return IS_DOUBLE;
			}
		}

		if (lval) {
			if (neg) {
				tmp_lval = -tmp_lval;
			}
			*lval = (zend_long) tmp_lval;
		}

		return IS_LONG;
	} else {
		if (dval) {
			*dval = local_dval;
		}

		return IS_DOUBLE;
	}
}
/* }}} */
```

Đây là đoạn code cuối cùng của hàm `is_numeric`. Và sau nhiều ngày đọc code muốn nổ con mắt thì mình chẳng phát hiện được là cái hàm này có lỗi hay không? Thế là ước mơ bypass để có SQLi của mình chắc là đã tan vỡ. Mong là lần sau sẽ may mắn tìm được hàm khác ngon mà lại có lỗi. =)))

Vậy là bài của mình đã hết!