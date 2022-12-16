Giải thích về issue: Khi validate data có dạng array object, bạn dùng validation form có rules như bên dưới.
```
public function rules()
{
        return [
                'timestamp' => 'nullable|max:20|date_format:Y/m/d H:i:s',
                'count' => 'nullable|integer',
                'data' => 'required|array',
                'data.*.id' => 'required|max:100',
                'data.*.type' => 'required|max:20',
                'data.*.name' => 'required|max:100',
        ]
}
```

Giả sử trong array data, ở object thứ 5 có key name giá trị null.
Thay vì báo trả về message lỗi có dạng với key và giá trị của data.4.name thì ở laravel 5.7 sẽ trả về giá trị của cả mảng data. 

Cụ thể bạn có thể xem issue đó tại đây . https://github.com/laravel/ideas/issues/1993
Một contributer của laravel có nói thì đây không phải bug mà là feature, nên laravel vẫn chơi theo logic này, mình thì không nghĩ vậy, khách hàng của mình cũng thế, nên mình đã fix lại.

Chúng ta chỉ cần ghi đè function invalidJson trong class App\Exceptions\Handler

```
protected function invalidJson($request, ValidationException $exception)
{
        return response()->json([
            'message' => $exception->getMessage(),
            'errors' => $this->transformErrors($e),,
        ], $exception->status);
}

private function transformErrors(ValidationException $exception)
{
        $errors = [];

        foreach ($exception->errors() as $field => $message) {
                $errors[] = [
                    'field' => $field,
                    'data' => $this->getTrueFieldValue(
                       $exception->validator->attributes(),
                       explode('.', $field)
                    ),
                    'message' => $message[0], // mình chỉ cần trả 1 message mỗi field, nếu bạn muốn thay đổi hãy ghi đè. 
                ];
        }

        return $errors;
    }

    private function getTrueFieldValue($data, $keyPaths)
    {
        if (count($keyPaths) == 0) {
            return $data;
        }
        $key = array_shift($keyPaths);

        return $this->getTrueFieldValue($data[$key] ?? null, $keyPaths);
    }
```