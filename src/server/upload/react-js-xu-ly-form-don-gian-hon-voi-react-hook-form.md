Quản lý form state form trong react js luôn là 1 vấn đề phức tạp, trước đây xử lý form với formilk trong react khá phổ biến nhưng trong thời gian gần đây, React-hook-form nổi lên khá mạnh mẽ với 1 số ưu điểm: cách viết đơn giản, linh động do sử dụng hook, dung lượng rất nhẹ, ngoài ra vấn đề Performance của react-hook-form cũng là tốt hơn rất nhiều, [tham khảo tại đây](https://blog.logrocket.com/react-hook-form-vs-formik-comparison/).

![](https://images.viblo.asia/4b81b71c-d9f4-44f4-8b99-3d5f3f4e0a64.png)

## Tạo form với react-hook-form

Cài đặt react-hook-form
> npm install react-hook-form

Để tạo 1 đối tượng quản lý state trong react-hook-form ta dùng hook useForm. Có 1 số thuộc tính cần lưu ý:
- register: hàm nhận vào name của field và trả về object bao gồm các thuộc tính name, onChange, onBlur, max/minLenght, required... dùng để đăng ký cho form lắng nghe các thay đổi của element.
- handleSubmit: xử lý việc submit form, ngăn form submit khi chưa validate, nhận vào callback xử lý logic submit form với data từ các field.
- formState: trạng thái khi có sự kiện thay đổi, bao gồm các thuộc tính errors, isValid, touchedFields,...
```
const form = useForm();

const {
    register,
    handleSubmit,
    formState: { errors },
} = form;
```

Gắn các thuộc tính form vào các field tương ứng.
```
 <FormControl isInvalid={errors.email}>
    <FormLabel htmlFor="email">Email</FormLabel>
    <Input {...register("email")} />
    {errors.email && (
        <FormErrorMessage>
            {errors.email.message}
        </FormErrorMessage>
    )}
</FormControl>

 <FormControl isInvalid={errors.phone}>
    <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
    <Input {...register("phone")} />
    {errors.phone && (
        <FormErrorMessage>
            {errors.phone.message}
        </FormErrorMessage>
    )}
</FormControl>
```

## Validate react-hook-form với yup
Thay vì tự tạo các schema để validate form thì mình thường sử dụng yup, nó sẽ khá nhanh chóng và dễ sử dụng.
Cài đặt resolver của react-hoom-form và yup:
> npm install @hookform/resolvers yup

Tạo schema và gắn resolver vào form
```
const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Vui lòng nhập đúng định dạng email.")
        .required("Vui lòng nhập email."),
    phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại.")
        .matches(
            phoneRegExp,
            "Vui lòng nhập đúng định dạng số điện thoại."
        ),
});

const form = useForm({
    resolver: yupResolver(schema),
});
```

Code toàn bộ form hoàn chỉnh, mình có dùng thêm thư viện chakra-ui cho đẹp 😅
```
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

FormPage.propTypes = {};

function FormPage(props) {
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Vui lòng nhập đúng định dạng email.")
            .required("Vui lòng nhập email."),
        phone: yup
            .string()
            .required("Vui lòng nhập số điện thoại.")
            .matches(
                phoneRegExp,
                "Vui lòng nhập đúng định dạng số điện thoại."
            ),
    });

    const form = useForm({
        resolver: yupResolver(schema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const handleSubmitForm = (data) => {
        console.log(data);
        console.log("Handle submit....");
    };

    return (
        <Flex justify={"center"} direction={"column"} align={"center"}>
            <Heading>Form</Heading>

            <Box w={"600px"}>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Flex direction={"column"} gap={5}>
                        <FormControl isInvalid={errors.email}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input {...register("email")} />
                            {errors.email && (
                                <FormErrorMessage>
                                    {errors.email.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={errors.phone}>
                            <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                            <Input {...register("phone")} />
                            {errors.phone && (
                                <FormErrorMessage>
                                    {errors.phone.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <Box>
                            <Button type="submit">Submit</Button>
                        </Box>
                    </Flex>
                </form>
            </Box>
        </Flex>
    );
}

export default FormPage;
```
Preview:
![](https://images.viblo.asia/18000b67-2f97-4c09-8c9b-c30821a2ae0a.gif)

Bài viết này mình có đề cập qua cách đơn giản để sử dụng react-hook-form trong react, nhìn chung nếu so sánh với các thư viện khác thì đây là một thư viện khá tốt, nhược điểm duy nhất chắc là nó là hook nên không dùng được trong class component, còn lại thì không có  gì để chê 🤗.
![](https://images.viblo.asia/2ed2e6e2-1c3b-45e8-a901-bc2176800523.png)