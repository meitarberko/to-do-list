"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@todolistcluster.fay4n.mongodb.net/<dbname>?retryWrites=true&w=majority");
var conn = mongoose_1.default.connection;
mongoose_1.default.connection.on('connected', function () {
    console.log("you are connected to db!");
    console.log(mongoose_1.default.connection.readyState);
});
exports.default = conn;
//# sourceMappingURL=dal.js.map