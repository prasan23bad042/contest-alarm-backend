"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const CODECHEF_API = 'https://www.codechef.com/api/list/contests/all';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log('Fetching CodeChef contests...');
        const response = yield axios_1.default.get(CODECHEF_API, {
            timeout: 10000,
            headers: {
                'User-Agent': 'ContestAlarm/1.0',
                'Accept': 'application/json',
            },
        });
        console.log('STATUS:', response.status);
        console.log('CONTENT TYPE:', response.headers['content-type']);
        const data = response.data;
        console.log('\nTOP LEVEL KEYS:');
        console.log(Object.keys(data));
        console.log('\nFUTURE CONTEST COUNT:', (_a = data.future_contests) === null || _a === void 0 ? void 0 : _a.length);
        console.log('\n========== FUTURE CONTESTS ==========\n');
        console.log(JSON.stringify(data.future_contests, null, 2));
    });
}
main().catch((error) => {
    var _a, _b;
    console.error('\nERROR:');
    console.error(((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) ||
        error.message);
    if ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) {
        console.error(error.response.data);
    }
    process.exit(1);
});
