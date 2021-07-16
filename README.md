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

5. Add `--use abort=` to the `asc` in `package.json`, for example:

```json
"asbuild:untouched": "asc assembly/index.ts --target debug --use abort=",
"asbuild:optimized": "asc assembly/index.ts --target release --use abort=",
```

6. Copy this into assembly/index.ts, note to replace `PATH_TO_SDK_REPO` with the path in the first step:

```typescript
import {wasm_alloc, wasm_free, request, log, cookie, LogLevel, response} from 'PATH_TO_SDK_REPO/easegress'

// As required by Easegress, these two functions must be exported.
export { wasm_alloc, wasm_free }

// The entry point of the code,
// must be exported with the name 'wasm_run' as required by Easegress.
export function wasm_run(): i32 {
	let v = request.getHeader( "Foo" )
	if( v.length > 10 ) {
		log( LogLevel.Warning, "The length of Foo is greater than 10" )
	}
	if( v.length > 0 ) {
		request.addHeader( "Wasm-Added", v )
	}

	let c = request.getCookie( "hello" )
	if( !c ) {
		log( LogLevel.Error, "cookie 'hello' does not exist" )
	} else {
		c.name = "goodbye"
		request.addCookie( c )
	}

	request.setBody( String.UTF8.encode("i have a new body now") )
	return 0;
}
```

7. Build with this command

```bash
npm run asbuild
```

If everything is right, `untouched.wasm` (the debug version) and `optimized.wasm` (the release version) will be generated at the `build` folder.

## Deploy and execute

Please refer [the documentation of `WasmHost`](https://github.com/megaease/easegress/blob/main/doc/wasmhost.md) for deploying and executing the compiled Wasm code.
