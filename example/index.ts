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


import {wasm_alloc, wasm_free, request, log, cookie, LogLevel, response} from '../easegress'

export {
	// must export these two functions
	wasm_alloc,
	wasm_free,
}

// The entry of the code, must be exported with the name 'wasm_run'
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

	request.setBody( String.UTF8.encode("i have a body now") )
	return 0;
}