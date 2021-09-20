# typedoc-plugin-rename-defaults

A TypeDoc plugin that renames the `default` exports to their original name.

## Why?

Since TypeDoc 0.20, the `default` exports fields do not get documented with their original names, but with the name "default". This plugin restores the behavior of TypeDoc 0.19 by keeping the original field name in the documentation. See [typedoc#1521](https://github.com/TypeStrong/typedoc/issues/1521).

This is especially useful with the [typedoc-plugin-merge-modules](https://github.com/krisztianb/typedoc-plugin-merge-modules), as without it, multiple `default` exports would cause overlapping issues in the documentation generated. See [typedoc-plugin-merge-modules#1](https://github.com/krisztianb/typedoc-plugin-merge-modules/issues/1).

## Usage

Just install the plugin and TypeDoc will load it automatically.

```console
npm install --save-dev typedoc-plugin-rename-defaults
```

For TypeDoc 0.22.x, you will need to add `--entrypointStrategy expand` to the `typedoc` command. Example:

```jsonc
// package.json

{
    "scripts": {
        "build-docs": "typedoc --entryPointStrategy expand src/"
    }
}
```

## Credits

The implementation of this plugin was proposed by [@Gerrit0](https://github.com/Gerrit0) at [#1521 (comment)](https://github.com/TypeStrong/typedoc/issues/1521#issuecomment-791971444).
