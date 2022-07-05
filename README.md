# typedoc-plugin-rename-defaults

A [TypeDoc](https://github.com/TypeStrong/typedoc) plugin that renames the `default` exports to their original name.

## Why?

Since TypeDoc 0.20, the `default` exports fields do not get documented with their original names, but with the name "default". This plugin restores the behavior of TypeDoc 0.19 by keeping the original field name in the documentation. See [typedoc#1521](https://github.com/TypeStrong/typedoc/issues/1521) for more context.

## Usage

Just install the plugin and TypeDoc will load it automatically.

```console
npm install --save-dev typedoc-plugin-rename-defaults
```

For TypeDoc 0.22 and up, you will need to add `--entrypointStrategy expand` to the `typedoc` command. Example:

```jsonc
// package.json

{
    "scripts": {
        "build-docs": "typedoc --entryPointStrategy expand src/"
    }
}
```

## Credits

The initial implementation of this plugin was proposed by [@Gerrit0](https://github.com/Gerrit0) at [typedoc#1521](https://github.com/TypeStrong/typedoc/issues/1521#issuecomment-791971444).
