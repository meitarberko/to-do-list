"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.default.Schema.Types.ObjectId },
    assignmentName: { type: String }
});
exports.assignmentSchema = mongoose_1.default.model('Assignment', mongoSchema);
//# sourceMappingURL=assignment.js.map