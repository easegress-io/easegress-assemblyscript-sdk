/*
 * Copyright (c) 2017, MegaEase
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Program, createProgram } from ".";
import { pointer, unmarshalMultipleString } from "./marshal";

// Allocate memory from wasm linear memory,
// this function must be re-exported by user code
export function wasm_alloc(size: i32): pointer {
	let buffer = new ArrayBuffer(size);
	let ptr = changetype<usize>(buffer);
	return __pin(ptr);
}

// Free memory allocated by wasm_alloc,
// this function must be re-exported by user code
export function wasm_free(ptr: pointer): void {
	__unpin(ptr);
}

var program: Program

export function wasm_init(ptr: pointer): void {
	let params = new Map<string, string>()
	let strs = unmarshalMultipleString(ptr)
	for(let i = 0; i + 1 < strs.length; i += 2) {
		params.set(strs[i], strs[i+1])
	}
	program = createProgram(params)
}

//The entry of user code, has to be defined by user
export function wasm_run(): i32 {
	return program.run()
}
