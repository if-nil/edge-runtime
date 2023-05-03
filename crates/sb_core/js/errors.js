import DOMException from "ext:deno_web/01_dom_exception.js";

const core = globalThis.Deno.core;

const knownErrors = {
    Interrupted: core.Interrupted,
    BadResource: core.BadResource,
};

const buildErrorClass = (name) => {
    const classErr = class extends Error {
        constructor(msg) {
            super(msg);
            this.name = name;
        }
    }
    classErr.getName = () => name;
    knownErrors[name] = classErr;
    return classErr;
}

const buildDomErrorClass = (name) => class extends DOMException {
    constructor(msg) {
        super(msg, name);
    }
}

const NotFound = buildErrorClass('NotFound');
const PermissionDenied = buildErrorClass('PermissionDenied');
const ConnectionRefused = buildErrorClass('ConnectionRefused');
const ConnectionReset = buildErrorClass('ConnectionReset');
const ConnectionAborted = buildErrorClass('ConnectionAborted');
const NotConnected = buildErrorClass('NotConnected');
const AddrInUse = buildErrorClass('AddrInUse');
const AddrNotAvailable = buildErrorClass('AddrNotAvailable');
const BrokenPipe = buildErrorClass('BrokenPipe');
const AlreadyExists = buildErrorClass('AlreadyExists');
const InvalidData = buildErrorClass('InvalidData');
const TimedOut = buildErrorClass('TimedOut');
const WriteZero = buildErrorClass('WriteZero');
const WouldBlock = buildErrorClass('WouldBlock');
const UnexpectedEof = buildErrorClass('UnexpectedEof');
const Http = buildErrorClass('Http');
const Busy = buildErrorClass('Busy');
const NotSupported = buildErrorClass('NotSupported');
const DOMExceptionOperationError = buildDomErrorClass('OperationError');
const DOMExceptionQuotaExceededError = buildDomErrorClass('QuotaExceededError');
const DOMExceptionNotSupportedError = buildDomErrorClass('NotSupported');
const DOMExceptionNetworkError = buildDomErrorClass('NetworkError');
const DOMExceptionAbortError = buildDomErrorClass('AbortError');
const DOMExceptionInvalidCharacterError = buildDomErrorClass('InvalidCharacterError');
const DOMExceptionDataError = buildDomErrorClass('DOMExceptionDataError');

function registerErrors() {
    core.registerErrorClass("NotFound", NotFound);
    core.registerErrorClass("PermissionDenied", PermissionDenied);
    core.registerErrorClass("ConnectionRefused", ConnectionRefused);
    core.registerErrorClass("ConnectionReset", ConnectionReset);
    core.registerErrorClass("ConnectionAborted", ConnectionAborted);
    core.registerErrorClass("NotConnected", NotConnected);
    core.registerErrorClass("AddrInUse", AddrInUse);
    core.registerErrorClass("AddrNotAvailable", AddrNotAvailable);
    core.registerErrorClass("BrokenPipe", BrokenPipe);
    core.registerErrorClass("AlreadyExists", AlreadyExists);
    core.registerErrorClass("InvalidData", InvalidData);
    core.registerErrorClass("TimedOut", TimedOut);
    core.registerErrorClass("Interrupted", core.Interrupted);
    core.registerErrorClass("WriteZero", WriteZero);
    core.registerErrorClass("UnexpectedEof", UnexpectedEof);
    core.registerErrorClass("BadResource", core.BadResource);
    core.registerErrorClass("Http", Http);
    core.registerErrorClass("Busy", Busy);
    core.registerErrorClass("NotSupported", NotSupported);
    core.registerErrorBuilder(
        "DOMExceptionOperationError",
        DOMExceptionOperationError
    );
    core.registerErrorBuilder(
        "DOMExceptionQuotaExceededError",
        DOMExceptionQuotaExceededError
    );
    core.registerErrorBuilder(
        "DOMExceptionNotSupportedError",
        DOMExceptionNotSupportedError
    );
    core.registerErrorBuilder(
        "DOMExceptionNetworkError",
        DOMExceptionNetworkError
    );
    core.registerErrorBuilder(
        "DOMExceptionAbortError",
        DOMExceptionAbortError
    );
    core.registerErrorBuilder(
        "DOMExceptionInvalidCharacterError",
        DOMExceptionInvalidCharacterError
    );
    core.registerErrorBuilder(
        "DOMExceptionDataError",
        DOMExceptionDataError
    );
}

const errors = knownErrors;

export { registerErrors, errors };