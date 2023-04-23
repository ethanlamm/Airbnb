#### Prisma 与 MongoDB Atlas

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



#### ESLint

✨插件：[ESLint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) => 检测、提示作用

一、[React + ESLint](https://react.dev/learn/editor-setup#linting)

[`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app)：核心、规则(rule)

This package includes the shareable ESLint configuration used by [Create React App](https://create-react-app.dev/).

The easiest way to use this configuration is with [Create React App](https://create-react-app.dev/), which includes it by default.

**You don’t need to install it separately in Create React App projects.**

> **Make sure that you’ve enabled all the [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) rules for your project.** They are essential and catch the most severe bugs early. 

**The recommended [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app) preset already includes them.**



二、[Next.js + ESLint](https://nextjs.org/docs/basic-features/eslint)

when you create a Next.js project with `npx create-next-app@latest` and select ESLint option, Next.js will automatically install `eslint` and `eslint-config-next` as development dependencies in your application and create an `.eslintrc.json` file in the root of your project that includes your selected configuration.

The default configuration **(`eslint-config-next`) includes everything you need** to have an optimal out-of-the-box linting experience in Next.js

Recommended rule-sets from the following ESLint plugins are all used **within(在内部，在里面)** `eslint-config-next`:

- [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react)
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [`eslint-plugin-next`](https://www.npmjs.com/package/@next/eslint-plugin-next)

This will take precedence over the configuration from `next.config.js`.

> 1）使用 `eslint-config-next` (rule) 即可
>
> 2）We recommend using an appropriate [integration](https://eslint.org/docs/user-guide/integrations#editors) to view warnings and errors directly in your code editor during development.

[`next/core-web-vitals`](https://nextjs.org/docs/basic-features/eslint#core-web-vitals)

[additional-configurations](https://nextjs.org/docs/basic-features/eslint#additional-configurations)
