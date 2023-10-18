# typedoc-plugin-rename-defaults

A [TypeDoc](https://github.com/TypeStrong/typedoc) plugin that renames the `default` exports to their original name.

## Why?

Since TypeDoc 0.20, the `default` exports fields do not get documented with their original names, but with the name "default". This plugin restores the behavior of TypeDoc 0.19 by keeping the original field name in the documentation. See [typedoc#1521](https://github.com/TypeStrong/typedoc/issues/1521) for more context.

## Usage

Install the plugin:

```console
npm install --save-dev typedoc-plugin-rename-defaults
```

Then, add `--plugin typedoc-plugin-rename-defaults` (required since TypeDoc 0.24) and `--entrypointStrategy expand` (required since TypeDoc 0.22) to the `typedoc` command. Example:

```jsonc
// package.json

{
  "scripts": {
    "build-docs": "typedoc --plugin typedoc-plugin-rename-defaults --entryPointStrategy expand src/"
  }
}
```

## Credits

The initial implementation of this plugin was proposed by [@Gerrit0](https://github.com/Gerrit0) at [typedoc#1521](https://github.com/TypeStrong/typedoc/issues/1521#issuecomment-791971444).
