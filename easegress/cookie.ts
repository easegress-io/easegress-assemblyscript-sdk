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

export enum SameSite {
	DefaultMode = 0,
	LaxMode,
	StrictMode,
	NoneMode,
}

export class Cookie {
	private _name: string = ""
	get name(): string {
		return this._name;
	}
	set name(val: string) {
		this._name = val;
	}

	private _value: string = ""
	get value(): string {
		return this._value;
	}
	set value(val: string) {
		this._value = val;
	}

	private _path: string = ""
	get path(): string {
		return this._path;
	}
	set path(val: string) {
		this._path = val;
	}

	private _domain: string = ""
	get domain(): string {
		return this._domain;
	}
	set domain(val: string) {
		this._domain = val;
	}

	// TODO: AssemblyScript does not support timezones currently,
	// so we regards 'expires' as a string and use the name 'rawExpires',
	// the name 'expires' is reserved for the Date representation. 
	private _rawExpires: string = ""
	get rawExpires(): string {
		return this._rawExpires;
	}
	set rawExpires(val: string) {
		this._rawExpires = val;
	}

	private _maxAge: i32 = 0
	get maxAge(): i32 {
		return this._maxAge;
	}
	set maxAge(val: i32) {
		this._maxAge = val;
	}

	private _secure: bool = false
	get secure(): bool {
		return this._secure;
	}
	set secure(val: bool) {
		this._secure = val;
	}

	private _httpOnly: bool = false
	get httpOnly(): bool {
		return this._httpOnly;
	}
	set httpOnly(val: bool) {
		this._httpOnly = val;
	}

	private _sameSite: SameSite = SameSite.DefaultMode
	get sameSite(): SameSite {
		return this._sameSite;
	}
	set sameSite(val: SameSite) {
		this._sameSite = val;
	}

	marshal(): string {
		assert(this.name.length > 0, "cookie name must be specified")

		let str = this.name + "=" + this.value

		if (this.path.length > 0) {
			str += "; Path=" + this.path
		}

		if (this.domain.length > 0) {
			str += "; Domain=" + this.domain
		}

		if (this.rawExpires.length > 0) {
			str += "; Expires=" + this.rawExpires
		}

		if (this.maxAge > 0) {
			str += "; Max-Age=" + this.maxAge.toString()
		} else if (this.maxAge < 0) {
			str += "; Max-Age=0"
		}

		if (this.secure) {
			str += "; Secure"
		}

		if (this.httpOnly) {
			str += "; HttpOnly"
		}

		switch (this.sameSite) {
			case SameSite.NoneMode:
				str += "; SameSite=None"
				break
			case SameSite.LaxMode:
				str += "; SameSite=Lax"
				break
			case SameSite.StrictMode:
				str += "; SameSite=Strict"
				break
		}

		return str
	}


	static unmarshal(str: string): Cookie | null {
		let parts = str.split(";")
		let kv = parts[0].trim().split("=")
		if (kv.length != 2) {
			return null
		}

		let c = new Cookie()
		c.name = kv[0]
		c.value = kv[1]

		for (let i = 1; i < parts.length; i++) {
			kv = parts[i].trim().split("=")
			if (kv.length != 2) {
				continue
			}

			let k = kv[0].toLowerCase()
			if (k == "path") {
				c.path = kv[1]
			} else if (k == "domain") {
				c.domain = kv[1]
			} else if (k == "expires") {
				c.rawExpires = kv[1]
			} else if (k == "max-age") {
				c.maxAge = i32(parseInt(kv[1]))
			} else if (k == "secure") {
				c.secure = true
			} else if (k == "httponly") {
				c.httpOnly = true
			} else if (k == "samesite") {
				let v = kv[1].toLowerCase()
				if (v == "lax") {
					c.sameSite = SameSite.LaxMode
				} else if (v == "strict") {
					c.sameSite = SameSite.StrictMode
				} else if (v == "none") {
					c.sameSite = SameSite.NoneMode
				} else {
					c.sameSite = SameSite.DefaultMode
				}
			}
		}

		return c
	}
}
