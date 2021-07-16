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
import {pointer, marshalString, unmarshalString, marshalAllHeader, unmarshalAllHeader, marishalData, unmarshalData, marshalCookie, unmarshalCookie} from './marshal'

@external("easegress", "host_req_get_real_ip") declare function host_req_get_real_ip(): pointer;
export function getRealIp(): string {
	let ptr = host_req_get_real_ip()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_get_scheme") declare function host_req_get_scheme(): pointer;
export function getScheme(): string {
	let ptr = host_req_get_scheme()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_get_proto") declare function host_req_get_proto(): pointer;
export function getProto(): string {
	let ptr = host_req_get_proto()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_get_method") declare function host_req_get_method(): pointer;
export function getMethod(): string {
	let ptr = host_req_get_method()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_set_method") declare function host_req_set_method(addr: pointer): void;
export function setMethod(method: string): void {
	let ptr = marshalString(method)
	host_req_set_method(ptr)
}


@external("easegress", "host_req_get_host") declare function host_req_get_host(): pointer;
export function getHost(): string {
	let ptr = host_req_get_host()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_set_host") declare function host_req_set_host(addr: pointer): void;
export function setHost(host: string): void {
	let ptr = marshalString(host)
	host_req_set_host(ptr)
}


@external("easegress", "host_req_get_path") declare function host_req_get_path(): pointer;
export function getPath(): string {
	let ptr = host_req_get_path()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_set_path") declare function host_req_set_path(addr: pointer): void;
export function setPath(path: string): void {
	let ptr = marshalString(path)
	host_req_set_path(ptr)
}


@external("easegress", "host_req_get_escaped_path") declare function host_req_get_escaped_path(): pointer;
export function getEscapedPath(): string {
	let ptr = host_req_get_escaped_path()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_get_query") declare function host_req_get_query(): pointer;
export function getQuery(): string {
	let ptr = host_req_get_query()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_set_query") declare function host_req_set_query(addr: pointer): void;
export function setQuery(query: string): void {
	let ptr = marshalString(query)
	host_req_set_query(ptr)
}


@external("easegress", "host_req_get_fragment") declare function host_req_get_fragment(): pointer;
export function getFragment(): string {
	let ptr = host_req_get_fragment()
	return unmarshalString(ptr)
}


@external("easegress", "host_req_get_header") declare function host_req_get_header(addr: pointer): pointer;
export function getHeader(name: string): string {
	let ptr = marshalString(name)
	ptr = host_req_get_header(ptr)
	return unmarshalString(ptr)
}


@external("easegress", "host_req_get_all_header") declare function host_req_get_all_header(): pointer;
export function getAllHeader(): Map<string, Array<string>> {
	let ptr = host_req_get_all_header()
	return unmarshalAllHeader(ptr)
}


@external("easegress", "host_req_set_header") declare function host_req_set_header(addr: pointer): void;
export function setHeader(name: string, value: string): void {
	let ptr = marshalString(name + '\0' + value)
	host_req_set_header(ptr)
}


@external("easegress", "host_req_set_all_header") declare function host_req_set_all_header(addr: pointer): void;
export function setAllHeader(headers: Map<string, Array<string>>): void {
	let ptr = marshalAllHeader(headers)
	host_req_set_all_header(ptr)
}


@external("easegress", "host_req_add_header") declare function host_req_add_header(addr: pointer): void;
export function addHeader(name: string, value: string): void {
	let ptr = marshalString(name + '\0' + value)
	host_req_add_header(ptr)
}


@external("easegress", "host_req_del_header") declare function host_req_del_header(addr: pointer): void;
export function delHeader(name: string): void {
	let ptr = marshalString(name)
	host_req_del_header(ptr)
}


@external("easegress", "host_req_get_cookie") declare function host_req_get_cookie(addr: pointer): pointer;
export function getCookie(name: string): Cookie | null {
	let ptr = marshalString(name)
	ptr = host_req_get_cookie(ptr)
	return unmarshalCookie(ptr)
}


@external("easegress", "host_req_get_all_cookie") declare function host_req_get_all_cookie(): pointer;
export function getAllCookie(): Array<Cookie> {
	let result = new Array<Cookie>()
	let ptr = host_req_get_all_cookie()
	let buf = changetype<ArrayBuffer>(ptr);
	buf = buf.slice(sizeof<u32>())

	let strs = String.UTF8.decode(buf).split("\0")
	for (let i = 0; i < strs.length; i++) {
		let c = Cookie.unmarshal(strs[i])
		if (c != null) {
			result.push(c)
		}
	}

	return result
}


@external("easegress", "host_req_add_cookie") declare function host_req_add_cookie(addr: pointer): void;
export function addCookie(c: Cookie): void {
	let ptr = marshalCookie(c)
	host_req_add_cookie(ptr)
}


@external("easegress", "host_req_get_body") declare function host_req_get_body(): pointer;
export function getBody(): ArrayBuffer {
	let ptr = host_req_get_body()
	return unmarshalData(ptr)
}


@external("easegress", "host_req_set_body") declare function host_req_set_body(addr: pointer): void;
export function setBody(body: ArrayBuffer): void {
	let ptr = marishalData(body)
	host_req_set_body(ptr)
}
