/** Base error for all Oack API errors. */
export class OackError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "OackError";
	}
}

/** Non-2xx response from the Oack API. */
export class APIError extends OackError {
	constructor(
		public readonly statusCode: number,
		message: string,
	) {
		super(message || `oack API error (${statusCode})`);
		this.name = "APIError";
	}
}

export class AuthenticationError extends APIError {
	constructor(message = "unauthorized") {
		super(401, message);
		this.name = "AuthenticationError";
	}
}

export class ForbiddenError extends APIError {
	constructor(message = "forbidden") {
		super(403, message);
		this.name = "ForbiddenError";
	}
}

export class NotFoundError extends APIError {
	constructor(message = "not found") {
		super(404, message);
		this.name = "NotFoundError";
	}
}

export class ConflictError extends APIError {
	constructor(message = "conflict") {
		super(409, message);
		this.name = "ConflictError";
	}
}

export class RateLimitError extends APIError {
	public readonly retryAfter: number | null;
	constructor(message = "rate limited", retryAfter: number | null = null) {
		super(429, message);
		this.name = "RateLimitError";
		this.retryAfter = retryAfter;
	}
}

const STATUS_MAP: Record<number, new (message: string) => APIError> = {
	401: AuthenticationError,
	403: ForbiddenError,
	404: NotFoundError,
	409: ConflictError,
};

export function parseError(statusCode: number, body: string, retryAfter: number | null = null): APIError {
	let message = "";
	try {
		const data = JSON.parse(body) as Record<string, unknown>;
		message = (data.error as string) || (data.message as string) || "";
	} catch {
		message = body;
	}

	if (statusCode === 429) {
		return new RateLimitError(message || "rate limited", retryAfter);
	}
	const Cls = STATUS_MAP[statusCode];
	if (Cls) {
		return new Cls(message);
	}
	return new APIError(statusCode, message);
}
