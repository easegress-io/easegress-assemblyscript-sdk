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

import {Cookie} from './cookie'
import {wasm_free} from '.'


export type pointer = usize;


export function marshalString(str: string): pointer {
	let buf = String.UTF8.encode(str + '\0')
	return changetype<pointer>(buf)
}


export function unmarshalString(ptr: pointer): string {
	let buf = changetype<ArrayBuffer>(ptr);
	wasm_free(ptr);
	buf = buf.slice(0, buf.byteLength - 1)
	return String.UTF8.decode(buf);
}


export function marshalAllHeader(headers: Map<string, Array<string>>): pointer {
	let str = ""
	let keys = headers.keys()
	for (let i = 0; i < keys.length; i++) {
		let k = keys[i];
		let v = headers.get(k)
		for (let j = 0; j < v.length; j++) {
			str += k + ": " + v[j] + "\r\n"
		}
	}
	return marshalString(str)
}


export function unmarshalAllHeader(ptr: pointer): Map<string, Array<string>> {
	let buf = changetype<ArrayBuffer>(ptr)
	wasm_free(ptr)
	buf = buf.slice(0, buf.byteLength - 1)

	let headers = String.UTF8.decode(buf).split("\r\n")

	let result = new Map<string, Array<string>>()
	for (let i = 0; i < headers.length; i++) {
		let kv = headers[i].split(": ")
		if (kv.length != 2) {
			continue;
		}

		if (result.has(kv[0])) {
			result.get(kv[0]).push(kv[1])
		} else {
			let a = new Array<string>()
			a.push(kv[1])
			result.set(kv[0], a)
		}
	}

	return result;
}


export function marishalData(data: ArrayBuffer): pointer {
	let buf = new ArrayBuffer(data.byteLength + sizeof<i32>())

	let view = new DataView(buf)
	view.setInt32(0, data.byteLength, true)

	let dst = changetype<pointer>(buf)
	let src = changetype<pointer>(data)
	memory.copy(dst + sizeof<i32>(), src, data.byteLength)

	return changetype<pointer>(buf)
}


export function unmarshalData(ptr: pointer): ArrayBuffer {
	let buf = changetype<ArrayBuffer>(ptr)
	wasm_free(ptr)
	return buf.slice(sizeof<i32>())
}


export function marshalCookie(c: Cookie): pointer {
	let str = c.marshal()
	return marshalString(str)
}


export function unmarshalCookie(ptr: pointer): Cookie | null {
	let str = unmarshalString(ptr)
	if (str == "") {
		return null
	}
	return Cookie.unmarshal(str)
}

