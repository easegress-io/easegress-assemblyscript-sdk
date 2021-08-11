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

import {pointer, marshalString, unmarshalString, marishalData, unmarshalData} from './marshal'


@external("easegress", "host_cluster_get_binary") declare function host_cluster_get_binary(addr: pointer): pointer;
export function getBinary(key: string): ArrayBuffer {
	let ptr = marshalString(key)
	ptr = host_cluster_get_binary(ptr)
	return unmarshalData(ptr)
}


@external("easegress", "host_cluster_put_binary") declare function host_cluster_put_binary(keyAddr: pointer, valAddr: pointer): void;
export function putBinary(key: string, val: ArrayBuffer): void {
	let ptrKey = marshalString(key)
	let ptrVal = marishalData(val)
	host_cluster_put_binary(ptrKey, ptrVal)
}


@external("easegress", "host_cluster_get_string") declare function host_cluster_get_string(addr: pointer): pointer;
export function getString(key: string): string {
	let ptr = marshalString(key)
	ptr = host_cluster_get_string(ptr)
	return unmarshalString(ptr)
}


@external("easegress", "host_cluster_put_string") declare function host_cluster_put_string(keyAddr: pointer, valAddr: pointer): void;
export function putString(key: string, val: string): void {
	let ptrKey = marshalString(key)
	let ptrVal = marshalString(val)
	host_cluster_put_string(ptrKey, ptrVal)
}


@external("easegress", "host_cluster_get_integer") declare function host_cluster_get_integer(addr: pointer): i64;
export function getInteger(key: string): i64 {
	let ptr = marshalString(key)
	return host_cluster_get_integer(ptr)
}


@external("easegress", "host_cluster_put_integer") declare function host_cluster_put_integer(addr: pointer, val:i64): void;
export function putInteger(key: string, val: i64): void {
	let ptr = marshalString(key)
	host_cluster_put_integer(ptr, val)
}


@external("easegress", "host_cluster_add_integer") declare function host_cluster_add_integer(addr: pointer, val:i64): i64;
export function addInteger(key: string, val: i64): i64 {
	let ptr = marshalString(key)
	return host_cluster_add_integer(ptr, val)
}


@external("easegress", "host_cluster_get_float") declare function host_cluster_get_float(addr: pointer): f64;
export function getFloat(key: string): f64 {
	let ptr = marshalString(key)
	return host_cluster_get_float(ptr)
}


@external("easegress", "host_cluster_put_float") declare function host_cluster_put_float(addr: pointer, val:f64): void;
export function putFloat(key: string, val: f64): void {
	let ptr = marshalString(key)
	host_cluster_put_float(ptr, val)
}


@external("easegress", "host_cluster_add_float") declare function host_cluster_add_float(addr: pointer, val:f64): f64;
export function addFloat(key: string, val: f64): f64 {
	let ptr = marshalString(key)
	return host_cluster_add_float(ptr, val)
}


@external("easegress", "host_cluster_count_key") declare function host_cluster_count_key(addr: pointer): i32;
export function countKey(prefix: string): i32 {
	let ptr = marshalString(prefix)
	return host_cluster_count_key(ptr)
}
