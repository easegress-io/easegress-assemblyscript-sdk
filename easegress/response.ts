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
import {pointer, marshalString, unmarshalString, marshalAllHeader, unmarshalAllHeader, marishalData, unmarshalData, marshalCookie} from './marshal'

@external("easegress", "host_resp_get_status_code") declare function host_resp_get_status_code(): i32;
export function getStatusCode(): i32 {
	return host_resp_get_status_code()
}


@external("easegress", "host_resp_set_status_code") declare function host_resp_set_status_code(code: i32): void;
export function setStatusCode(code: i32): void {
	host_resp_set_status_code(code)
}


@external("easegress", "host_resp_get_header") declare function host_resp_get_header(addr: pointer): pointer;
export function getHeader(name: string): string {
	let ptr = marshalString(name)
	ptr = host_resp_get_header(ptr)
	return unmarshalString(ptr)
}


@external("easegress", "host_resp_get_all_header") declare function host_resp_get_all_header(): pointer;
export function getAllHeader(): Map<string, Array<string>> {
	let ptr = host_resp_get_all_header()
	return unmarshalAllHeader(ptr)
}


@external("easegress", "host_resp_set_header") declare function host_resp_set_header(addr: pointer): void;
export function setHeader(name: string, value: string): void {
	let ptr = marshalString(name + '\0' + value)
	host_resp_set_header(ptr)
}


@external("easegress", "host_resp_set_all_header") declare function host_resp_set_all_header(addr: pointer): void;
export function setAllHeader(headers: Map<string, Array<string>>): void {
	let ptr = marshalAllHeader(headers)
	host_resp_set_all_header(ptr)
}


@external("easegress", "host_resp_add_header") declare function host_resp_add_header(addr: pointer): void;
export function addHeader(name: string, value: string): void {
	let ptr = marshalString(name + '\0' + value)
	host_resp_add_header(ptr)
}


@external("easegress", "host_resp_del_header") declare function host_resp_del_header(addr: pointer): void;
export function delHeader(name: string): void {
	let ptr = marshalString(name)
	host_resp_del_header(ptr)
}


@external("easegress", "host_req_set_cookie") declare function host_resp_set_cookie(addr: pointer): void;
export function setCookie(c: Cookie): void {
	let ptr = marshalCookie(c)
	host_resp_set_cookie(ptr)
}


@external("easegress", "host_resp_get_body") declare function host_resp_get_body(): pointer;
export function getBody(): ArrayBuffer {
	let ptr = host_resp_get_body()
	return unmarshalData(ptr)
}


@external("easegress", "host_resp_set_body") declare function host_resp_set_body(addr: pointer): void;
export function setBody(body: ArrayBuffer): void {
	let ptr = marishalData(body)
	host_resp_set_body(ptr)
}
