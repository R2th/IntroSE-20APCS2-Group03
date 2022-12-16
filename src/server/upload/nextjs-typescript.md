# Tạo project với Next.js và TypeScript

Bài viết này mình viết như một ghi chú cho những lần cần tạo project. Các bạn có thể tham khảo hoặc nếu thấy phù hợp ^^

Lúc trước thì mình hay sử dụng `js` hơn là `ts`, đôi lúc có ác cảm với `ts` vì thấy nó khá là lằng nhằng, tuy nhiên khi sử dụng một thời gian rồi thì mình cảm thấy khá thú vị.

Với những bạn giống mình và muốn thử xem `ts` có gì vui thì có thể setup một cái project và tự cảm nhận nhé :D
- Next v13
	- Node 14.6.0 or newer.
	- MacOS, Windows (including WSL), and Linux are supported.
- TypeScript v4.9.

## Bắt đầu
Có 2 cách để setup TypeScript với Nextjs:
- Sử dụng `create-next-app`.
- Thêm TypeScript vào dự án hiện tại.
### `create-next-app`
Chúng ta có thể bắt đầu dự án Next.js với TypeScript bằng cách sử dụng CLI tool `create-next-app` và thêm cờ `--typescript` hoặc `--ts` phía sau.
```
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app --typescript
```
### Thêm TypeScript vào dự án Next.js hiện tại
Đầu tiên, chúng ta cần tạo file `tsconfig.json` ở thư mục gốc của dự án: `touch tsconfig.json`

Sau đó bạn chạy lệnh để start application, ở đây `scripts` để start application của mình là `yarn dev`.

Next.js sẽ thông báo và cố gắng cài các package liên quan đến TypeScript.
```
It looks like you're trying to use TypeScript but do not have the required package(s) installed.  
Installing dependencies  
  
If you are not trying to use TypeScript, please remove the tsconfig.json file from your package root (and any TypeScript files in your pages directory).  
  
  
Installing devDependencies (yarn):  
- typescript  
- @types/react  
- @types/node  
  
[1/4] Resolving packages...  
[2/4] Fetching packages...
```
Sau khi cài đặt hoàn thành, mở file `tsconfig.json` các bạn sẽ thấy nó giống bên dưới:
```json
{
	"compilerOptions": {
		"target": "es5",
		"lib": [
			"dom",
			"dom.iterable",
			"esnext"
		],
		"allowJs": true,
		"skipLibCheck": true,
		"strict": false,
		"forceConsistentCasingInFileNames": true,
		"noEmit": true,
		"incremental": true,
		"esModuleInterop": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"jsx": "preserve"
	},
	"include": [
		"next-env.d.ts",
		"**/*.ts",
		"**/*.tsx"
	],
	"exclude": ["node_modules"]
}
```
Nếu bạn để ý thì sẽ thấy một file `next-env.d.ts`, file này đảm bảo Next.js types sẽ được trình biên dịch TypeScript chọn.

Tới đây thì việc thêm TypeScript vào dự án Next.js đã xong. Các bạn bắt đầu code được rồi.

Đối với các bạn mới mới dùng TypeScript và Next.js thì có thể tham khảo thêm 2 link dưới đây để thực hành ^^

React + TypeScript cheatsheet: https://react-typescript-cheatsheet.netlify.app/

NextJS + TypeScript: https://nextjs.org/docs/basic-features/typescript

## Kết Luận
Việc cài đặt Next.js với TypeScript thật sự không quá khó phải không nào,

Trong lúc cài đặt thì có thể có một số lỗi liên quan đến version Next.js và TypeScript, tuy nhiên cũng không quá phức tập để giải quyết.

Hẹn gặp lại các bạn ở các bài viết khác !!!