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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var assignment_1 = require("./assignment");
var dal_1 = __importDefault(require("./dal"));
var app = express_1.default();
app.set('port', 27017);
app.listen(27017, function () {
    console.log('app listening on port 27017!');
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//allows us to relax default security rules which prevent HTTP calls from being made between different servers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.get('/api/todos', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var assignments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assignment_1.assignmentSchema.find().then(function (assignments) {
                        res.send(assignments).status(200);
                    }).catch(function (err) {
                        {
                            console.log({ err: err });
                            res.send('there was an error, please try again').status(400);
                        }
                    })];
                case 1:
                    assignments = _a.sent();
                    return [2 /*return*/, dal_1.default.close()];
            }
        });
    });
});
app.post('/api/todos', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newAssignment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newAssignment = new assignment_1.assignmentSchema({
                        assignmentName: req.body.assignmentName
                    });
                    return [4 /*yield*/, newAssignment.save().then(function () {
                            res.send(newAssignment).status(201);
                            console.log(newAssignment);
                        }).catch(function (err) {
                            console.log({ err: err });
                            res.send('there was an error, please try again').status(400);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, dal_1.default.close()];
            }
        });
    });
});
app.put('api/todos/id:', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var updateAssignment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateAssignment = new assignment_1.assignmentSchema({
                        id: req.params.id,
                        assignmentName: req.body.assignmentName
                    });
                    return [4 /*yield*/, assignment_1.assignmentSchema.updateOne({ id: req.params.id }, updateAssignment).
                            then(function () {
                            res.send(updateAssignment).status(200);
                        }).catch(function (err) {
                            console.log({ err: err });
                            res.send('there was an error, please try again').status(400);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, dal_1.default.close()];
            }
        });
    });
});
app.delete('api/todos/id:', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assignment_1.assignmentSchema.deleteOne({ id: req.params.id }).then(function () {
                res.status(200).json({
                    message: "assignment deleted succsesfully!"
                });
            }).catch(function (err) {
                console.log({ err: err });
                res.send('there was an error, please try again').status(400);
            });
            return [2 /*return*/, dal_1.default.close()];
        });
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map