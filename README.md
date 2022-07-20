# Easegress AssemblyScript SDK

- [Easegress AssemblyScript SDK](#easegress-assemblyscript-sdk)
	- [Prerequisites](#prerequisites)
	- [Local Development](#local-development)
	- [Deploy and execute](#deploy-and-execute)

This is the [AssemblyScript](https://www.assemblyscript.org/) SDK for [Easegress](https://github.com/megaease/easegress), it can be used to extend the ability of Easegress.

## Prerequisites

The following assumes that a recent version of [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) and its package manager [npm](https://www.npmjs.com/) are installed. Basic knowledge about writing and working with TypeScript modules, which is very similar, is a plus.

## Local Development

1. Clone this repo to somewhere on disk.

2. Switch to a new directory and initialize a new node module:

```bash
npm init
```

3. Install the AssemblyScript compiler using npm, assume that the compiler is not required in production and make it a development dependency:

```bash
npm install --save-dev assemblyscript
```

4. Once installed, the compiler provides a handy scaffolding utility to quickly set up a new AssemblyScript project, for example in the directory of the just initialized node module:

```bash
npx asinit .
```

5. Add `--use abort=` to the end `asc assembly/index.ts ...` command in `package.json`, for example,

Before add `--use abort=`:
```json
...
    "scripts": {
        "test": "node tests",
        "asbuild:debug": "asc assembly/index.ts --target debug",
        "asbuild:release": "asc assembly/index.ts --target release",
        "asbuild": "npm run asbuild:debug && npm run asbuild:release",
        "start": "npx serve ."
    },
...
```
After add `--use abort=`:
```json
...
    "scripts": {
        "test": "node tests",
        "asbuild:debug": "asc assembly/index.ts --target debug --use abort=",
        "asbuild:release": "asc assembly/index.ts --target release --use abort=",
        "asbuild": "npm run asbuild:debug && npm run asbuild:release",
        "start": "npx serve ."
    },
...
```

6. Copy this into assembly/index.ts, note to replace `PATH_TO_SDK_REPO` with the path in the first step:

```typescript
// As required by Easegress, these functions must be exported
// Use relative path here, like ../../easegress-assemblyscript-sdk/easegress/proxy
export * from 'PATH_TO_SDK_REPO/easegress/proxy'

// Use relative path here, like ../../easegress-assemblyscript-sdk/easegress
import { Program, request, LogLevel, log, registerProgramFactory } from 'PATH_TO_SDK_REPO/easegress'

class AddHeaderAndSetBody extends Program {
    constructor(params: Map<string, string>) {
        super(params)
    }

    run(): i32 {
        super.run()
        let v = request.getHeader( "Foo" )
        if( v.length > 10 ) {
            log( LogLevel.Warning, "The length of Foo is greater than 10" )
        }
        if( v.length > 0 ) {
            request.addHeader( "Wasm-Added", v )
        }
        request.setBody( String.UTF8.encode("I have a new body now") )
        return 0
    }
}

registerProgramFactory((params: Map<string, string>) => {
    return new AddHeaderAndSetBody(params)
}
```

7. Build with this command

```bash
npm run asbuild
```

If everything is right, `debug.wasm` (the debug version) and `release.wasm` (the release version) will be generated at the `build` folder.

## Deploy and execute

Please refer [the documentation of `WasmHost`](https://github.com/megaease/easegress/blob/main/doc/reference/wasmhost.md) for deploying and executing the compiled Wasm code.
