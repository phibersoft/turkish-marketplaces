"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trendyol = void 0;
var axios_1 = require("axios");
var helpers_service_1 = require("../helpers.service");
var Trendyol = /** @class */ (function () {
    function Trendyol(apiKey, apiSecret, firmId) {
        var headers = {
            Authorization: helpers_service_1.IntegrationHelpers.basicAuth(apiKey, apiSecret),
            "User-Agent": "".concat(firmId, " - SelfIntegration"),
        };
        this._api = axios_1.default.create({
            baseURL: "https://api.trendyol.com/sapigw",
            headers: headers,
        });
        this._apiWithSupplier = axios_1.default.create({
            baseURL: "https://api.trendyol.com/sapigw/suppliers/".concat(firmId),
            headers: headers,
        });
    }
    Trendyol.prototype.getOrders = function (params) {
        var _this = this;
        var today = new Date();
        var _endDate = this.timeFormatter(today);
        today.setDate(today.getDate() - 1);
        var _startDate = this.timeFormatter(today);
        var _params = __assign(__assign({}, params), { size: params.size || 200, page: params.page || 0, startDate: params.startDate || _startDate, endDate: params.endDate || _endDate });
        return helpers_service_1.IntegrationHelpers.wrapper(function () {
            return _this._apiWithSupplier.get("/orders?".concat(helpers_service_1.IntegrationHelpers.objectToQuery(_params)));
        });
    };
    Trendyol.prototype.getProducts = function (params) {
        var _this = this;
        var defParams = __assign(__assign({}, params), { page: params.page || 0, size: params.size || 5000, approved: params.approved || true, archived: params.archived || false });
        return helpers_service_1.IntegrationHelpers.wrapper(function () {
            return _this._apiWithSupplier.get("products?".concat(helpers_service_1.IntegrationHelpers.objectToQuery(defParams)));
        });
    };
    Trendyol.prototype.getOrdersBulk = function (params, middleware) {
        return __awaiter(this, void 0, void 0, function () {
            var firstResults, orders, i, nextResults, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, this.getOrders(__assign(__assign({}, params), { page: 0, size: 200 }))];
                    case 1:
                        firstResults = _a.sent();
                        if (!(firstResults.success === true)) return [3 /*break*/, 9];
                        orders = __spreadArray([], __read(firstResults.data.content), false);
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i < firstResults.data.totalPages && i < 1000)) return [3 /*break*/, 8];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        middleware === null || middleware === void 0 ? void 0 : middleware(i, firstResults.data.totalPages);
                        return [4 /*yield*/, helpers_service_1.IntegrationHelpers.sleeper(250)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.getOrders(__assign(__assign({}, params), { page: i }))];
                    case 5:
                        nextResults = _a.sent();
                        if (nextResults.success === true) {
                            orders.push.apply(orders, __spreadArray([], __read(nextResults.data.content), false));
                        }
                        else {
                            throw new Error("Loop Error: ".concat(nextResults.message));
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: e_1.message,
                            }];
                    case 7:
                        i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, {
                            success: true,
                            data: orders,
                        }];
                    case 9: return [2 /*return*/, firstResults];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: e_2.message,
                            }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Trendyol.prototype.timeFormatter = function (date) {
        return date.toTimeString();
    };
    Trendyol.prototype.getProductsBulk = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var defParams, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defParams = __assign(__assign({}, params), { page: 0, size: 99999 });
                        return [4 /*yield*/, this.getProducts(defParams)];
                    case 1:
                        results = _a.sent();
                        if (results.success === true) {
                            return [2 /*return*/, {
                                    success: true,
                                    data: results.data.content,
                                }];
                        }
                        else {
                            return [2 /*return*/, results];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Trendyol;
}());
exports.Trendyol = Trendyol;
