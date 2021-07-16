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

import {pointer, marshalString} from './marshal'
import * as cookie from './cookie'
import * as request from './request'
import * as response from './response'

// Allocate memory from wasm linear memory,
// this function must be re-exported by user code
function wasm_alloc(size: i32): pointer {
	let buffer = new ArrayBuffer(size);
	let ptr = changetype<usize>(buffer);
	return __pin(ptr);
}

// Free memory allocated by wasm_alloc,
// this function must be re-exported by user code
function wasm_free(ptr: pointer): void {
	__unpin(ptr);
}

// The entry of user code, has to be defined by user
// function wasm_run(): i32 {
//    return run()
// }


@external("easegress", "host_add_tag") declare function host_add_tag(addr: pointer): void;
function addTag(tag: string): void {
	let ptr = marshalString(tag)
	host_add_tag(ptr)
}


enum LogLevel {
	Debug = 0,
	Info,
	Warning,
	Error,
}

@external("easegress", "host_log") declare function host_log(level: i32, msg: pointer): void;
function log(level: LogLevel, msg: string): void {
	let ptr = marshalString(msg)
	host_log(level, ptr)
}

export {
	wasm_alloc,
	wasm_free,

	cookie,
	request,
	response,

	addTag,
	LogLevel,
	log,
}