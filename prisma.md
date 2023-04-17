Prisma 与 MongoDB Atlas

一、[安装](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb#set-up-prisma)

```sh
pnpm add prisma -D
```

```sh
pnpm prisma init
```

生成以下文件

```
prisma
	-- schema.prisma：配置schema信息
.env：配置DATABASE_URL
```

二、[Prisma插件](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)：代码高亮、代码提示、格式化

三、提交

配置好 `prisma/schema.prisma` 和 `.env` 后进行 MongoDB Atlas  连接

[npx prisma generate very slow](https://github.com/prisma/prisma/issues/13377)

```sh
1.pnpm add @prisma/client -D
2.pnpm prisma db push
```



