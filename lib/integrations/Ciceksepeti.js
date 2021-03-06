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
exports.Ciceksepeti = void 0;
var axios_1 = require("axios");
var helpers_service_1 = require("../helpers.service");
var Ciceksepeti = /** @class */ (function () {
    function Ciceksepeti(apiKey) {
        var _this = this;
        this.getProducts = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var _params;
                var _this = this;
                return __generator(this, function (_a) {
                    _params = __assign(__assign({}, params), { PageSize: Number(params.PageSize) || 60, Page: Number(params.Page) || 0 });
                    return [2 /*return*/, helpers_service_1.IntegrationHelpers.wrapper(function () {
                            return _this.api.get("/api/v1/Products?".concat(helpers_service_1.IntegrationHelpers.objectToQuery(_params)));
                        })];
                });
            });
        };
        this.getProductsBulk = function (params, middleware) {
            if (params === void 0) { params = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var PageSize, firstResults, secureArea, products, i, nextResults, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            PageSize = this._getRandomPageSize();
                            return [4 /*yield*/, this.getProducts(__assign(__assign({}, params), { PageSize: PageSize, Page: 0 }))];
                        case 1:
                            firstResults = _a.sent();
                            if (!(firstResults.success === true)) return [3 /*break*/, 10];
                            secureArea = Number((firstResults.data.totalCount / PageSize + 2).toFixed());
                            products = __spreadArray([], __read(firstResults.data.products), false);
                            i = 1;
                            return [4 /*yield*/, helpers_service_1.IntegrationHelpers.sleeper(6000)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(i < secureArea)) return [3 /*break*/, 9];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 7, , 8]);
                            middleware === null || middleware === void 0 ? void 0 : middleware(i, secureArea);
                            return [4 /*yield*/, this.getProducts(__assign(__assign({}, params), { PageSize: PageSize, Page: i }))];
                        case 5:
                            nextResults = _a.sent();
                            if (nextResults.success === true) {
                                products.push.apply(products, __spreadArray([], __read(nextResults.data.products), false));
                            }
                            else {
                                throw new Error("Loop Error: ".concat(nextResults.message));
                            }
                            return [4 /*yield*/, helpers_service_1.IntegrationHelpers.sleeper(6000)];
                        case 6:
                            _a.sent();
                            i++;
                            return [3 /*break*/, 8];
                        case 7:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_1.message,
                                }];
                        case 8: return [3 /*break*/, 3];
                        case 9: return [2 /*return*/, {
                                success: true,
                                data: helpers_service_1.IntegrationHelpers.uniquer(products, "productCode"),
                            }];
                        case 10: return [2 /*return*/, firstResults];
                    }
                });
            });
        };
        this.getOrders = function (params) {
            if (params === void 0) { params = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var today, _endDate, _startDate, randomPageSize, _params;
                var _this = this;
                return __generator(this, function (_a) {
                    today = new Date();
                    _endDate = this.timeFormatter(today);
                    today.setDate(today.getDate() - 1);
                    _startDate = this.timeFormatter(today);
                    randomPageSize = this._getRandomPageSize();
                    _params = __assign(__assign({}, params), { startDate: params.startDate || _startDate, endDate: params.endDate || _endDate, pageSize: Number(params.pageSize) || randomPageSize, page: Number(params.page) || 0 });
                    return [2 /*return*/, helpers_service_1.IntegrationHelpers.wrapper(function () { return _this.api.post("/api/v1/Order/GetOrders", _params); })];
                });
            });
        };
        this.getOrdersBulk = function (params, middleware) {
            if (params === void 0) { params = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var pageSize, firstResults, orders, i, nextResults, e_2, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 12, , 13]);
                            pageSize = this._getRandomPageSize();
                            return [4 /*yield*/, this.getOrders(__assign(__assign({}, params), { pageSize: pageSize, page: 0 }))];
                        case 1:
                            firstResults = _a.sent();
                            return [4 /*yield*/, helpers_service_1.IntegrationHelpers.sleeper(6000)];
                        case 2:
                            _a.sent();
                            if (!(firstResults.success === true)) return [3 /*break*/, 10];
                            orders = __spreadArray([], __read(firstResults.data.supplierOrderListWithBranch), false);
                            i = 1;
                            _a.label = 3;
                        case 3:
                            if (!(i < firstResults.data.pageCount + 1)) return [3 /*break*/, 9];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 7, , 8]);
                            middleware === null || middleware === void 0 ? void 0 : middleware(i, firstResults.data.pageCount);
                            return [4 /*yield*/, helpers_service_1.IntegrationHelpers.sleeper(6000)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, this.getOrders(__assign(__assign({}, params), { pageSize: pageSize, page: i }))];
                        case 6:
                            nextResults = _a.sent();
                            if (nextResults.success === true) {
                                if (nextResults.data.supplierOrderListWithBranch.length > 0) {
                                    orders.push.apply(orders, __spreadArray([], __read(nextResults.data.supplierOrderListWithBranch), false));
                                }
                                else {
                                    return [3 /*break*/, 9];
                                }
                            }
                            else {
                                throw new Error("Loop Error: ".concat(nextResults.message));
                            }
                            return [3 /*break*/, 8];
                        case 7:
                            e_2 = _a.sent();
                            console.log(e_2);
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_2.message,
                                }];
                        case 8:
                            i++;
                            return [3 /*break*/, 3];
                        case 9: return [2 /*return*/, {
                                success: true,
                                data: orders,
                            }];
                        case 10: return [2 /*return*/, firstResults];
                        case 11: return [3 /*break*/, 13];
                        case 12:
                            e_3 = _a.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    message: e_3.message,
                                }];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        this.timeFormatter = function (date) {
            return date.toISOString();
        };
        this._getRandomPageSize = function () {
            // return integer between 45-60
            return Math.floor(Math.random() * (60 - 45 + 1)) + 45;
        };
        this.api = axios_1.default.create({
            baseURL: "https://apis.ciceksepeti.com",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
        });
    }
    return Ciceksepeti;
}());
exports.Ciceksepeti = Ciceksepeti;
