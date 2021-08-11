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
import * as cluster from './cluster'


class Program {
	constructor(params: Map<string, string>) {
	}

	run(): i32 {
		return 0
	}
}

var programFactory: (params: Map<string, string>)=>Program

function createProgram(params: Map<string, string>): Program {
	return programFactory(params)
}

function registerProgramFactory(factory: (params: Map<string, string>)=>Program): void {
	programFactory = factory
}


// Calling Date.parse from member functions result in a compile error,
// should be a bug of AssemblyScript.
// We use a wrapper function as workaround
function parseDate(str: string): Date {
	return Date.parse(str)
}


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

@external("easegress", "host_get_unix_time_in_ms") declare function host_get_unix_time_in_ms(): i64;
function getUnixTimeInMs(): i64 {
	return host_get_unix_time_in_ms()
}

@external("easegress", "host_rand") declare function host_rand(): f64;
function rand(): f64 {
	return host_rand()
}

export {
	parseDate,

	Program,
	createProgram,
	registerProgramFactory,

	cookie,
	request,
	response,
	cluster,

	addTag,
	LogLevel,
	log,
	getUnixTimeInMs,
	rand,
}