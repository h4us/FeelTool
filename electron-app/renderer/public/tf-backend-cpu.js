/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-core'), require('seedrandom')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-core', 'seedrandom'], factory) :
    (global = global || self, factory(global.tf = global.tf || {}, global.tf, global.seedrandom));
}(this, (function (exports, tf, seedrandom) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function assertNotComplex(tensor, opName) {
        if (!Array.isArray(tensor)) {
            tensor = [tensor];
        }
        tensor.forEach(function (t) {
            if (t != null) {
                tf.util.assert(t.dtype !== 'complex64', function () { return opName + " does not support complex64 tensors in the CPU backend."; });
            }
        });
    }

    /**
     * @license
     * Copyright 2017 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var nonMaxSuppressionV3Impl = tf.kernel_impls.nonMaxSuppressionV3Impl;
    var split = tf.kernel_impls.split;
    var tile = tf.kernel_impls.tile;
    var topkImpl = tf.kernel_impls.topkImpl;
    var whereImpl = tf.kernel_impls.whereImpl;
    var MathBackendCPU = /** @class */ (function (_super) {
        __extends(MathBackendCPU, _super);
        function MathBackendCPU() {
            var _this = _super.call(this) || this;
            _this.blockSize = 48;
            _this.firstUse = true;
            _this.data = new tf.DataStorage(_this, tf.engine());
            return _this;
        }
        MathBackendCPU.prototype.write = function (values, shape, dtype) {
            if (this.firstUse) {
                this.firstUse = false;
                if (tf.env().get('IS_NODE')) {
                    tf.backend_util.warn('\n============================\n' +
                        'Hi there 👋. Looks like you are running TensorFlow.js in ' +
                        'Node.js. To speed things up dramatically, install our node ' +
                        'backend, which binds to TensorFlow C++, by running ' +
                        'npm i @tensorflow/tfjs-node, ' +
                        'or npm i @tensorflow/tfjs-node-gpu if you have CUDA. ' +
                        'Then call require(\'@tensorflow/tfjs-node\'); (-gpu ' +
                        'suffix for CUDA) at the start of your program. ' +
                        'Visit https://github.com/tensorflow/tfjs-node for more details.' +
                        '\n============================');
                }
            }
            var dataId = {};
            this.data.set(dataId, { values: values, dtype: dtype, refCount: 1 });
            return dataId;
        };
        /**
         * Create a data bucket in cpu backend.
         * @param shape Shape of the `TensorInfo`.
         * @param dtype DType of the `TensorInfo`.
         * @param values The value of the `TensorInfo` stored as a flattened array.
         */
        MathBackendCPU.prototype.makeTensorInfo = function (shape, dtype, values) {
            var outId;
            if (dtype === 'string' && values != null && values.length > 0 &&
                tf.util.isString(values[0])) {
                var encodedValues = values.map(function (d) { return tf.util.encodeString(d); });
                outId = this.write(encodedValues, shape, dtype);
            }
            else {
                outId = this.write(values, shape, dtype);
            }
            return { dataId: outId, shape: shape, dtype: dtype };
        };
        /** Increase refCount of a `TensorData`. */
        MathBackendCPU.prototype.incRef = function (dataId) {
            var tensorData = this.data.get(dataId);
            tensorData.refCount++;
        };
        /** Decrease refCount of a `TensorData`. */
        MathBackendCPU.prototype.decRef = function (dataId) {
            if (this.data.has(dataId)) {
                var tensorData = this.data.get(dataId);
                tensorData.refCount--;
            }
        };
        MathBackendCPU.prototype.move = function (dataId, values, shape, dtype) {
            this.data.set(dataId, { values: values, dtype: dtype, refCount: 1 });
        };
        MathBackendCPU.prototype.numDataIds = function () {
            return this.data.numDataIds();
        };
        MathBackendCPU.prototype.read = function (dataId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.readSync(dataId)];
                });
            });
        };
        MathBackendCPU.prototype.readSync = function (dataId) {
            var _a = this.data.get(dataId), dtype = _a.dtype, complexTensorInfos = _a.complexTensorInfos;
            if (dtype === 'complex64') {
                var realValues = this.readSync(complexTensorInfos.real.dataId);
                var imagValues = this.readSync(complexTensorInfos.imag.dataId);
                return tf.backend_util.mergeRealAndImagArrays(realValues, imagValues);
            }
            return this.data.get(dataId).values;
        };
        MathBackendCPU.prototype.bufferSync = function (t) {
            var data = this.readSync(t.dataId);
            var decodedData = data;
            if (t.dtype === 'string') {
                try {
                    // Decode the bytes into string.
                    decodedData = data.map(function (d) { return tf.util.decodeString(d); });
                }
                catch (_a) {
                    throw new Error('Failed to decode encoded string bytes into utf-8');
                }
            }
            return tf.buffer(t.shape, t.dtype, decodedData);
        };
        MathBackendCPU.prototype.makeOutput = function (values, shape, dtype) {
            var dataId = this.write(values, shape, dtype);
            return tf.engine().makeTensorFromDataId(dataId, shape, dtype, this);
        };
        MathBackendCPU.prototype.disposeData = function (dataId) {
            if (this.data.has(dataId)) {
                var complexTensorInfos = this.data.get(dataId).complexTensorInfos;
                if (complexTensorInfos != null) {
                    this.disposeData(complexTensorInfos.real.dataId);
                    this.disposeData(complexTensorInfos.imag.dataId);
                }
                this.data.delete(dataId);
            }
        };
        MathBackendCPU.prototype.disposeIntermediateTensorInfo = function (tensorInfo) {
            var dataId = tensorInfo.dataId;
            if (this.data.has(dataId)) {
                var tensorData = this.data.get(dataId);
                tensorData.refCount--;
                if (tensorData.refCount < 1) {
                    this.disposeData(dataId);
                }
            }
        };
        MathBackendCPU.prototype.time = function (f) {
            return __awaiter(this, void 0, void 0, function () {
                var start, kernelMs;
                return __generator(this, function (_a) {
                    start = tf.util.now();
                    f();
                    kernelMs = tf.util.now() - start;
                    return [2 /*return*/, { kernelMs: kernelMs }];
                });
            });
        };
        MathBackendCPU.prototype.memory = function () {
            return {
                // Unreliable due to automatic gc. The numbers above are cumulative.
                unreliable: true,
                reasons: ['The reported memory is an upper bound. Due to automatic garbage ' +
                        'collection, the true allocated memory may be less.']
            };
        };
        MathBackendCPU.prototype.stridedSlice = function (x, begin, end, strides) {
            assertNotComplex(x, 'stridedSlice');
            var outShape = tf.slice_util.computeOutShape(begin, end, strides);
            if (outShape.some(function (axis) { return axis === 0; })) {
                return tf.tensor([], outShape);
            }
            var buffer = tf.buffer(outShape, x.dtype);
            var xBuf = this.bufferSync(x);
            for (var i = 0; i < buffer.size; i++) {
                var loc = buffer.indexToLoc(i);
                var newLoc = new Array(loc.length);
                for (var j = 0; j < newLoc.length; j++) {
                    newLoc[j] = loc[j] * strides[j] + begin[j];
                }
                buffer.set.apply(buffer, [xBuf.get.apply(xBuf, newLoc)].concat(loc));
            }
            return buffer.toTensor();
        };
        MathBackendCPU.prototype.diag = function (x) {
            var xVals = this.readSync(x.dataId);
            var buffer = tf.buffer([x.size, x.size], x.dtype);
            var vals = buffer.values;
            for (var i = 0; i < xVals.length; i++) {
                vals[i * x.size + i] = xVals[i];
            }
            return buffer.toTensor();
        };
        MathBackendCPU.prototype.unstack = function (x, axis) {
            var num = x.shape[axis];
            var outShape = new Array(x.rank - 1);
            var outIndex = 0;
            for (var i = 0; i < x.rank; i++) {
                if (i !== axis) {
                    outShape[outIndex++] = x.shape[i];
                }
            }
            var begin = new Array(x.rank).fill(0);
            var size = x.shape.slice();
            size[axis] = 1;
            var res = new Array(num);
            for (var i = 0; i < res.length; i++) {
                begin[axis] = i;
                res[i] = tf.slice(x, begin, size).reshape(outShape);
            }
            return res;
        };
        MathBackendCPU.prototype.reverse = function (x, axis) {
            assertNotComplex(x, 'reverse');
            var buffer = tf.buffer(x.shape, x.dtype);
            var xBuf = this.bufferSync(x);
            var _loop_1 = function (i) {
                var outLoc = buffer.indexToLoc(i);
                var inLoc = outLoc.slice();
                axis.forEach(function (ax) { return inLoc[ax] = x.shape[ax] - 1 - inLoc[ax]; });
                buffer.set.apply(buffer, [xBuf.get.apply(xBuf, inLoc)].concat(outLoc));
            };
            for (var i = 0; i < buffer.size; i++) {
                _loop_1(i);
            }
            return buffer.toTensor();
        };
        MathBackendCPU.prototype.neg = function (x) {
            assertNotComplex(x, 'neg');
            // TODO(lina128): Use mul directly once neg is modularized.
            return tf.mul(tf.scalar(-1), x);
        };
        MathBackendCPU.prototype.addN = function (tensors) {
            var _this = this;
            assertNotComplex(tensors, 'addN');
            var vals = tensors.map(function (t) { return _this.readSync(t.dataId); });
            var result = tf.buffer(tensors[0].shape, tensors[0].dtype);
            var resultVals = result.values;
            for (var i = 0; i < tensors.length; i++) {
                var currVals = vals[i];
                for (var j = 0; j < resultVals.length; j++) {
                    resultVals[j] += currVals[j];
                }
            }
            return result.toTensor();
        };
        MathBackendCPU.prototype.softmax = function (logits, dim) {
            var axes = tf.util.parseAxisParam([dim], logits.shape);
            // TODO(annxingyuan): Call maxImpl rather than op as part of softmax kernel
            // modularization.
            var maxLogit = tf.max(logits, axes);
            var expandedShape = tf.backend_util.expandShapeToKeepDim(maxLogit.shape, axes);
            // TODO(lina128): Use sub directly once softmax is modularized.
            var a = tf.sub(logits, maxLogit.reshape(expandedShape));
            var b = tf.exp(a);
            var sumExp = this.sum(b, axes).reshape(expandedShape);
            // TODO(annxingyuan): Call divImpl rather than op as part of softmax
            // kernel modularization.
            return tf.div(b, sumExp);
        };
        MathBackendCPU.prototype.pow = function (a, b) {
            assertNotComplex([a, b], 'pow');
            return this.broadcastedBinaryOp(a, b, a.dtype, function (aValue, bValue) { return Math.pow(aValue, bValue); });
        };
        MathBackendCPU.prototype.floorDiv = function (a, b) {
            assertNotComplex([a, b], 'floorDiv');
            var op = function (a, b) { return Math.floor(a / b); };
            var outputDtype = 'int32';
            return this.broadcastedBinaryOp(a, b, outputDtype, op);
        };
        MathBackendCPU.prototype.sum = function (x, axes) {
            assertNotComplex(x, 'sum');
            tf.backend_util.assertAxesAreInnerMostDims('sum', axes, x.rank);
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var resultDtype = tf.upcastType(x.dtype, 'int32');
            var result = tf.zeros(outShape, resultDtype);
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var sum = 0;
                for (var j = 0; j < reduceSize; ++j) {
                    sum += aVals[offset + j];
                }
                vals[i] = sum;
            }
            return result;
        };
        MathBackendCPU.prototype.prod = function (x, axes) {
            assertNotComplex(x, 'sum');
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var resultDtype = tf.upcastType(x.dtype, 'int32');
            var result = tf.zeros(outShape, resultDtype);
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var prod = 1;
                for (var j = 0; j < reduceSize; ++j) {
                    prod *= aVals[offset + j];
                }
                vals[i] = prod;
            }
            return result;
        };
        MathBackendCPU.prototype.unsortedSegmentSum = function (x, segmentIds, numSegments) {
            assertNotComplex(x, 'unsortedSegmentSum');
            var res = [];
            // Reshape the segment id's so that they can be broadcast with
            // x. The new shape should be [segmentIds.shape, 1, ..., 1]
            var numIters = x.rank - segmentIds.rank;
            for (var i = 0; i < numIters; ++i) {
                segmentIds = segmentIds.expandDims(i + 1);
            }
            for (var i = 0; i < numSegments; ++i) {
                var segmentId = tf.scalar(i, 'int32');
                var mask = tf.equal(segmentId, segmentIds).asType('float32');
                var sum = mask.mul(x).sum(0);
                res.push(sum);
            }
            return tf.stack(res);
        };
        MathBackendCPU.prototype.argMin = function (x, axis) {
            assertNotComplex(x, 'argMin');
            var axes = [axis];
            tf.backend_util.assertAxesAreInnerMostDims('argMin', axes, x.rank);
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var result = tf.zeros(outShape, 'int32');
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var min = aVals[offset];
                var minIndex = 0;
                for (var j = 0; j < reduceSize; ++j) {
                    var value = aVals[offset + j];
                    if (value < min) {
                        min = value;
                        minIndex = j;
                    }
                }
                vals[i] = minIndex;
            }
            return result;
        };
        MathBackendCPU.prototype.argMax = function (x, axis) {
            assertNotComplex(x, 'argMax');
            var axes = [axis];
            tf.backend_util.assertAxesAreInnerMostDims('argMax', axes, x.rank);
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var result = tf.zeros(outShape, 'int32');
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var max_1 = aVals[offset];
                var maxIndex = 0;
                for (var j = 0; j < reduceSize; ++j) {
                    var value = aVals[offset + j];
                    if (value > max_1) {
                        max_1 = value;
                        maxIndex = j;
                    }
                }
                vals[i] = maxIndex;
            }
            return result;
        };
        MathBackendCPU.prototype.cumsum = function (x, axis, exclusive, reverse) {
            assertNotComplex(x, 'cumsum');
            if (axis !== x.rank - 1) {
                throw new Error("backend.cumsum in CPU expects an inner-most axis=" + (x.rank - 1) + " " +
                    ("but got axis=" + axis));
            }
            var resultDtype = tf.upcastType(x.dtype, 'int32');
            var result = tf.zeros(x.shape, resultDtype);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            var finalDim = x.shape[x.rank - 1];
            var indexAdjuster = reverse ?
                function (i, j) { return i + finalDim - j - 1; } :
                function (i, j) { return i + j; };
            for (var i = 0; i < aVals.length; i += finalDim) {
                for (var j = 0; j < finalDim; j++) {
                    var idx = indexAdjuster(i, j);
                    if (j === 0) {
                        vals[idx] = exclusive ? 0 : aVals[idx];
                    }
                    else {
                        var prevIdx = indexAdjuster(i, j - 1);
                        vals[idx] = exclusive ? aVals[prevIdx] + vals[prevIdx] :
                            aVals[idx] + vals[prevIdx];
                    }
                }
            }
            return result;
        };
        MathBackendCPU.prototype.equal = function (a, b) {
            assertNotComplex([a, b], 'equal');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return (aVal === bVal) ? 1 : 0;
            });
        };
        MathBackendCPU.prototype.notEqual = function (a, b) {
            assertNotComplex([a, b], 'notEqual');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return (aVal !== bVal) ? 1 : 0;
            });
        };
        MathBackendCPU.prototype.less = function (a, b) {
            assertNotComplex([a, b], 'less');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return (aVal < bVal) ? 1 : 0;
            });
        };
        MathBackendCPU.prototype.lessEqual = function (a, b) {
            assertNotComplex([a, b], 'lessEqual');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return (aVal <= bVal) ? 1 : 0;
            });
        };
        MathBackendCPU.prototype.greater = function (a, b) {
            assertNotComplex([a, b], 'greater');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return (aVal > bVal) ? 1 : 0;
            });
        };
        MathBackendCPU.prototype.greaterEqual = function (a, b) {
            assertNotComplex([a, b], 'greaterEqual');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return (aVal >= bVal) ? 1 : 0;
            });
        };
        MathBackendCPU.prototype.logicalAnd = function (a, b) {
            assertNotComplex([a, b], 'logicalAnd');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return aVal && bVal;
            });
        };
        MathBackendCPU.prototype.logicalOr = function (a, b) {
            assertNotComplex([a, b], 'logicalOr');
            return this.broadcastedBinaryOp(a, b, 'bool', function (aVal, bVal) {
                return aVal || bVal;
            });
        };
        MathBackendCPU.prototype.select = function (condition, a, b) {
            assertNotComplex([condition, a, b], 'select');
            var values = this.readSync(condition.dataId);
            var aValues = this.readSync(a.dataId);
            var bValues = this.readSync(b.dataId);
            var result = tf.zeros(a.shape, tf.upcastType(a.dtype, b.dtype));
            var newValues = this.readSync(result.dataId);
            var index = 0;
            var offset = condition.rank === 0 || condition.rank > 1 || a.rank === 1 ?
                1 :
                tf.util.sizeFromShape(a.shape.slice(1));
            for (var i = 0; i < values.length; i++) {
                for (var j = 0; j < offset; j++) {
                    if (values[i] === 1) {
                        newValues[index++] = aValues[i];
                    }
                    else {
                        newValues[index++] = bValues[i];
                    }
                }
            }
            return result;
        };
        MathBackendCPU.prototype.where = function (condition) {
            assertNotComplex([condition], 'where');
            var condVals = this.readSync(condition.dataId);
            return whereImpl(condition.shape, condVals);
        };
        MathBackendCPU.prototype.topk = function (x, k, sorted) {
            assertNotComplex(x, 'topk');
            var xVals = this.readSync(x.dataId);
            return topkImpl(xVals, x.shape, x.dtype, k, sorted);
        };
        MathBackendCPU.prototype.min = function (x, axes) {
            assertNotComplex(x, 'min');
            tf.backend_util.assertAxesAreInnerMostDims('min', axes, x.rank);
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var result = tf.zeros(outShape, x.dtype);
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var min = aVals[offset];
                for (var j = 0; j < reduceSize; ++j) {
                    var value = aVals[offset + j];
                    if (value < min) {
                        min = value;
                    }
                }
                vals[i] = min;
            }
            return result;
        };
        MathBackendCPU.prototype.minimum = function (a, b) {
            assertNotComplex([a, b], 'minimum');
            return this.broadcastedBinaryOp(a, b, a.dtype, function (aVal, bVal) { return Math.min(aVal, bVal); });
        };
        MathBackendCPU.prototype.mod = function (a, b) {
            assertNotComplex([a, b], 'mod');
            return this.broadcastedBinaryOp(a, b, a.dtype, function (aVal, bVal) {
                var rem = aVal % bVal;
                if ((aVal < 0 && bVal < 0) || (aVal >= 0 && bVal >= 0)) {
                    return rem;
                }
                else {
                    return (rem + bVal) % bVal;
                }
            });
        };
        MathBackendCPU.prototype.maximum = function (a, b) {
            assertNotComplex([a, b], 'maximum');
            return this.broadcastedBinaryOp(a, b, a.dtype, function (aVal, bVal) { return Math.max(aVal, bVal); });
        };
        MathBackendCPU.prototype.all = function (x, axes) {
            assertNotComplex(x, 'all');
            tf.backend_util.assertAxesAreInnerMostDims('all', axes, x.rank);
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var result = tf.zeros(outShape, x.dtype);
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var all = aVals[offset];
                for (var j = 0; j < reduceSize; ++j) {
                    var value = aVals[offset + j];
                    all = all && value;
                }
                vals[i] = all;
            }
            return result;
        };
        MathBackendCPU.prototype.any = function (x, axes) {
            assertNotComplex(x, 'any');
            tf.backend_util.assertAxesAreInnerMostDims('any', axes, x.rank);
            var _a = tf.backend_util.computeOutAndReduceShapes(x.shape, axes), outShape = _a[0], reduceShape = _a[1];
            var result = tf.zeros(outShape, x.dtype);
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var vals = this.readSync(result.dataId);
            var aVals = this.readSync(x.dataId);
            for (var i = 0; i < vals.length; ++i) {
                var offset = i * reduceSize;
                var anyVal = aVals[offset];
                for (var j = 0; j < reduceSize; ++j) {
                    var value = aVals[offset + j];
                    anyVal = anyVal || value;
                }
                vals[i] = anyVal;
            }
            return result;
        };
        MathBackendCPU.prototype.squaredDifference = function (a, b) {
            assertNotComplex([a, b], 'squaredDifference');
            return this.broadcastedBinaryOp(a, b, a.dtype, function (aVal, bVal) {
                var diff = aVal - bVal;
                return diff * diff;
            });
        };
        MathBackendCPU.prototype.eluDer = function (dy, y) {
            assertNotComplex([dy, y], 'eluDer');
            var resultValues = new Float32Array(y.size);
            var values = this.readSync(y.dataId);
            var dyValues = this.readSync(dy.dataId);
            for (var i = 0; i < values.length; ++i) {
                var v = values[i];
                if (v >= 1) {
                    resultValues[i] = dyValues[i];
                }
                else {
                    resultValues[i] = dyValues[i] * (v + 1);
                }
            }
            return this.makeOutput(resultValues, y.shape, 'float32');
        };
        MathBackendCPU.prototype.atan2 = function (a, b) {
            assertNotComplex([a, b], 'atan2');
            return this.broadcastedBinaryOp(a, b, a.dtype, function (aValue, bValue) { return Math.atan2(aValue, bValue); });
        };
        MathBackendCPU.prototype.tile = function (x, reps) {
            assertNotComplex(x, 'tile');
            return tile(this.bufferSync(x), reps);
        };
        MathBackendCPU.prototype.gather = function (x, indices, axis) {
            assertNotComplex([x, indices], 'gather');
            var newShape = x.shape.slice();
            var indicesValues = this.readSync(indices.dataId);
            newShape[axis] = indicesValues.length;
            var result = tf.buffer(newShape, x.dtype);
            var xBuf = this.bufferSync(x);
            for (var i = 0; i < result.size; ++i) {
                var newLoc = result.indexToLoc(i);
                var originalLoc = newLoc.slice();
                originalLoc[axis] = indicesValues[newLoc[axis]];
                var originalIndex = xBuf.locToIndex(originalLoc);
                result.values[i] = xBuf.values[originalIndex];
            }
            return result.toTensor();
        };
        MathBackendCPU.prototype.batchToSpaceND = function (x, blockShape, crops) {
            assertNotComplex([x], 'batchToSpaceND');
            var prod = blockShape.reduce(function (a, b) { return a * b; });
            var reshaped = tf.backend_util.getReshaped(x.shape, blockShape, prod);
            var permuted = tf.backend_util.getPermuted(reshaped.length, blockShape.length);
            var reshapedPermuted = tf.backend_util.getReshapedPermuted(x.shape, blockShape, prod);
            var sliceBeginCoords = tf.backend_util.getSliceBeginCoords(crops, blockShape.length);
            var sliceSize = tf.backend_util.getSliceSize(reshapedPermuted, crops, blockShape.length);
            return tf.transpose(x.reshape(reshaped), permuted)
                .reshape(reshapedPermuted)
                .slice(sliceBeginCoords, sliceSize);
        };
        MathBackendCPU.prototype.pool3d = function (x, convInfo, poolType) {
            assertNotComplex(x, 'pool3d');
            var strideDepth = convInfo.strideDepth;
            var strideHeight = convInfo.strideHeight;
            var strideWidth = convInfo.strideWidth;
            var dilationDepth = convInfo.dilationDepth;
            var dilationHeight = convInfo.dilationHeight;
            var dilationWidth = convInfo.dilationWidth;
            var effectiveFilterDepth = convInfo.effectiveFilterDepth;
            var effectiveFilterHeight = convInfo.effectiveFilterHeight;
            var effectiveFilterWidth = convInfo.effectiveFilterWidth;
            var padFront = convInfo.padInfo.front;
            var padTop = convInfo.padInfo.top;
            var padLeft = convInfo.padInfo.left;
            var initialValue = (poolType === 'max' ? Number.NEGATIVE_INFINITY :
                Number.POSITIVE_INFINITY);
            var xValues = this.readSync(x.dataId);
            var output = tf.buffer(convInfo.outShape, x.dtype);
            var outputVals = output.values;
            var outputBatchStrides = convInfo.outShape[1] * convInfo.outShape[2] *
                convInfo.outShape[3] * convInfo.outShape[4];
            var outputDepthStrides = convInfo.outShape[2] * convInfo.outShape[3] * convInfo.outShape[4];
            var outputRowStrides = convInfo.outShape[3] * convInfo.outShape[4];
            var outputColStrides = convInfo.outShape[4];
            for (var batch = 0; batch < convInfo.batchSize; ++batch) {
                var outputBatchOffset = batch * outputBatchStrides;
                var inputBatchOffset = batch * x.strides[0];
                for (var channel = 0; channel < convInfo.inChannels; ++channel) {
                    for (var yDepth = 0; yDepth < convInfo.outDepth; ++yDepth) {
                        var xDepthCorner = yDepth * strideDepth - padFront;
                        var xDepthMin = xDepthCorner;
                        while (xDepthMin < 0) {
                            xDepthMin += dilationDepth;
                        }
                        var xDepthMax = Math.min(convInfo.inDepth, effectiveFilterDepth + xDepthCorner);
                        var outputDepthOffset = outputBatchOffset + yDepth * outputDepthStrides;
                        for (var yRow = 0; yRow < convInfo.outHeight; ++yRow) {
                            var xRowCorner = yRow * strideHeight - padTop;
                            var xRowMin = xRowCorner;
                            while (xRowMin < 0) {
                                xRowMin += dilationHeight;
                            }
                            var xRowMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRowCorner);
                            var outputRowOffset = outputDepthOffset + yRow * outputRowStrides;
                            for (var yCol = 0; yCol < convInfo.outWidth; ++yCol) {
                                var xColCorner = yCol * strideWidth - padLeft;
                                var xColMin = xColCorner;
                                while (xColMin < 0) {
                                    xColMin += dilationWidth;
                                }
                                var xColMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xColCorner);
                                // Shader code begins
                                var outputColOffset = outputRowOffset + yCol * outputColStrides;
                                var minMaxValue = initialValue;
                                var avgValue = 0;
                                var count = 0;
                                for (var xDepth = xDepthMin; xDepth < xDepthMax; xDepth += dilationDepth) {
                                    var xDepthOffset = inputBatchOffset + xDepth * x.strides[1];
                                    for (var xRow = xRowMin; xRow < xRowMax; xRow += dilationHeight) {
                                        var xRowOffset = xDepthOffset + xRow * x.strides[2];
                                        for (var xCol = xColMin; xCol < xColMax; xCol += dilationWidth) {
                                            var xColOffset = xRowOffset + xCol * x.strides[3];
                                            var pixel = xValues[xColOffset + channel];
                                            if ((poolType === 'max' && pixel > minMaxValue)) {
                                                minMaxValue = pixel;
                                            }
                                            else if (poolType === 'avg') {
                                                avgValue += pixel;
                                                count++;
                                            }
                                            if (isNaN(minMaxValue)) {
                                                break;
                                            }
                                        }
                                        if (isNaN(minMaxValue)) {
                                            break;
                                        }
                                    }
                                    if (isNaN(minMaxValue)) {
                                        break;
                                    }
                                }
                                var outputOffset = outputColOffset + channel;
                                outputVals[outputOffset] =
                                    poolType === 'avg' ? avgValue / count : minMaxValue;
                            }
                        }
                    }
                }
            }
            return output.toTensor();
        };
        MathBackendCPU.prototype.avgPool3d = function (x, convInfo) {
            assertNotComplex(x, 'avgPool3d');
            return this.pool3d(x, convInfo, 'avg').toFloat();
        };
        MathBackendCPU.prototype.avgPool3dBackprop = function (dy, x, convInfo) {
            assertNotComplex([dy, x], 'avgPool3dBackprop');
            var strideDepth = convInfo.strideDepth;
            var strideHeight = convInfo.strideHeight;
            var strideWidth = convInfo.strideWidth;
            var filterDepth = convInfo.filterDepth;
            var filterHeight = convInfo.filterHeight;
            var filterWidth = convInfo.filterWidth;
            var dilationDepth = convInfo.dilationDepth;
            var dilationHeight = convInfo.dilationHeight;
            var dilationWidth = convInfo.dilationWidth;
            var effectiveFilterDepth = convInfo.effectiveFilterDepth;
            var effectiveFilterHeight = convInfo.effectiveFilterHeight;
            var effectiveFilterWidth = convInfo.effectiveFilterWidth;
            var padFront = effectiveFilterDepth - 1 - convInfo.padInfo.front;
            var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
            var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
            var dx = tf.buffer(x.shape, 'float32');
            var avgMultiplier = 1 / (filterDepth * filterHeight * filterWidth);
            var dyBuf = this.bufferSync(dy);
            for (var batch = 0; batch < convInfo.batchSize; ++batch) {
                for (var channel = 0; channel < convInfo.inChannels; ++channel) {
                    for (var dxDepth = 0; dxDepth < convInfo.inDepth; ++dxDepth) {
                        for (var dxRow = 0; dxRow < convInfo.inHeight; ++dxRow) {
                            for (var dxCol = 0; dxCol < convInfo.inWidth; ++dxCol) {
                                // Shader code begins.
                                var dyDepthCorner = dxDepth - padFront;
                                var dyRowCorner = dxRow - padTop;
                                var dyColCorner = dxCol - padLeft;
                                var dotProd = 0;
                                for (var wDepth = 0; wDepth < effectiveFilterDepth; wDepth += dilationDepth) {
                                    var dyDepth = (dyDepthCorner + wDepth) / strideDepth;
                                    if (dyDepth < 0 || dyDepth >= convInfo.outDepth ||
                                        Math.floor(dyDepth) !== dyDepth) {
                                        continue;
                                    }
                                    for (var wRow = 0; wRow < effectiveFilterHeight; wRow += dilationHeight) {
                                        var dyRow = (dyRowCorner + wRow) / strideHeight;
                                        if (dyRow < 0 || dyRow >= convInfo.outHeight ||
                                            Math.floor(dyRow) !== dyRow) {
                                            continue;
                                        }
                                        for (var wCol = 0; wCol < effectiveFilterWidth; wCol += dilationWidth) {
                                            var dyCol = (dyColCorner + wCol) / strideWidth;
                                            if (dyCol < 0 || dyCol >= convInfo.outWidth ||
                                                Math.floor(dyCol) !== dyCol) {
                                                continue;
                                            }
                                            var pixel = dyBuf.get(batch, dyDepth, dyRow, dyCol, channel);
                                            dotProd += pixel;
                                        }
                                    }
                                }
                                dx.set(dotProd * avgMultiplier, batch, dxDepth, dxRow, dxCol, channel);
                            }
                        }
                    }
                }
            }
            return dx.toTensor();
        };
        MathBackendCPU.prototype.maxPool3d = function (x, convInfo) {
            assertNotComplex(x, 'maxPool3d');
            return this.pool3d(x, convInfo, 'max').toFloat();
        };
        MathBackendCPU.prototype.maxPool3dPositions = function (x, convInfo) {
            var maxPositions = tf.buffer(convInfo.outShape, 'int32');
            var strideDepth = convInfo.strideDepth;
            var strideHeight = convInfo.strideHeight;
            var strideWidth = convInfo.strideWidth;
            var dilationDepth = convInfo.dilationDepth;
            var dilationHeight = convInfo.dilationHeight;
            var dilationWidth = convInfo.dilationWidth;
            var effectiveFilterDepth = convInfo.effectiveFilterDepth;
            var effectiveFilterHeight = convInfo.effectiveFilterHeight;
            var effectiveFilterWidth = convInfo.effectiveFilterWidth;
            var padFront = convInfo.padInfo.front;
            var padTop = convInfo.padInfo.top;
            var padLeft = convInfo.padInfo.left;
            var xBuf = this.bufferSync(x);
            for (var batch = 0; batch < convInfo.batchSize; ++batch) {
                for (var channel = 0; channel < convInfo.inChannels; ++channel) {
                    for (var yDepth = 0; yDepth < convInfo.outDepth; ++yDepth) {
                        var xDepthCorner = yDepth * strideDepth - padFront;
                        var xDepthMin = xDepthCorner;
                        while (xDepthMin < 0) {
                            xDepthMin += dilationDepth;
                        }
                        var xDepthMax = Math.min(convInfo.inDepth, effectiveFilterDepth + xDepthCorner);
                        for (var yRow = 0; yRow < convInfo.outHeight; ++yRow) {
                            var xRowCorner = yRow * strideHeight - padTop;
                            var xRowMin = xRowCorner;
                            while (xRowMin < 0) {
                                xRowMin += dilationHeight;
                            }
                            var xRowMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRowCorner);
                            for (var yCol = 0; yCol < convInfo.outWidth; ++yCol) {
                                var xColCorner = yCol * strideWidth - padLeft;
                                var xColMin = xColCorner;
                                while (xColMin < 0) {
                                    xColMin += dilationWidth;
                                }
                                var xColMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xColCorner);
                                // Shader code begins
                                var maxValue = Number.NEGATIVE_INFINITY;
                                var maxPosition = -1;
                                for (var xDepth = xDepthMin; xDepth < xDepthMax; xDepth += dilationDepth) {
                                    var wDepth = xDepth - xDepthCorner;
                                    for (var xRow = xRowMin; xRow < xRowMax; xRow += dilationHeight) {
                                        var wRow = xRow - xRowCorner;
                                        for (var xCol = xColMin; xCol < xColMax; xCol += dilationWidth) {
                                            var wCol = xCol - xColCorner;
                                            var pixel = xBuf.get(batch, xDepth, xRow, xCol, channel);
                                            if (pixel >= maxValue) {
                                                maxValue = pixel;
                                                maxPosition = wDepth * effectiveFilterHeight *
                                                    effectiveFilterWidth +
                                                    wRow * effectiveFilterHeight + wCol;
                                            }
                                        }
                                    }
                                }
                                maxPositions.set(maxPosition, batch, yDepth, yRow, yCol, channel);
                            }
                        }
                    }
                }
            }
            return maxPositions.toTensor();
        };
        MathBackendCPU.prototype.maxPool3dBackprop = function (dy, x, y, convInfo) {
            assertNotComplex([x, y], 'maxPool3dBackprop');
            var maxPositions = this.maxPool3dPositions(x, convInfo);
            var strideDepth = convInfo.strideDepth;
            var strideHeight = convInfo.strideHeight;
            var strideWidth = convInfo.strideWidth;
            var dilationDepth = convInfo.dilationDepth;
            var dilationHeight = convInfo.dilationHeight;
            var dilationWidth = convInfo.dilationWidth;
            var effectiveFilterDepth = convInfo.effectiveFilterDepth;
            var effectiveFilterHeight = convInfo.effectiveFilterHeight;
            var effectiveFilterWidth = convInfo.effectiveFilterWidth;
            var padFront = effectiveFilterDepth - 1 - convInfo.padInfo.front;
            var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
            var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
            var dx = tf.buffer(x.shape, 'float32');
            var maxPosBuf = this.bufferSync(maxPositions);
            var dyBuf = this.bufferSync(dy);
            for (var batch = 0; batch < convInfo.batchSize; ++batch) {
                for (var channel = 0; channel < convInfo.inChannels; ++channel) {
                    for (var dxDepth = 0; dxDepth < convInfo.inDepth; ++dxDepth) {
                        for (var dxRow = 0; dxRow < convInfo.inHeight; ++dxRow) {
                            for (var dxCol = 0; dxCol < convInfo.inWidth; ++dxCol) {
                                // Shader code begins
                                var dyDepthCorner = dxDepth - padFront;
                                var dyRowCorner = dxRow - padTop;
                                var dyColCorner = dxCol - padLeft;
                                var dotProd = 0;
                                for (var wDepth = 0; wDepth < effectiveFilterDepth; wDepth += dilationDepth) {
                                    var dyDepth = (dyDepthCorner + wDepth) / strideDepth;
                                    if (dyDepth < 0 || dyDepth >= convInfo.outDepth ||
                                        Math.floor(dyDepth) !== dyDepth) {
                                        continue;
                                    }
                                    for (var wRow = 0; wRow < effectiveFilterHeight; wRow += dilationHeight) {
                                        var dyRow = (dyRowCorner + wRow) / strideHeight;
                                        if (dyRow < 0 || dyRow >= convInfo.outHeight ||
                                            Math.floor(dyRow) !== dyRow) {
                                            continue;
                                        }
                                        for (var wCol = 0; wCol < effectiveFilterWidth; wCol += dilationWidth) {
                                            var dyCol = (dyColCorner + wCol) / strideWidth;
                                            if (dyCol < 0 || dyCol >= convInfo.outWidth ||
                                                Math.floor(dyCol) !== dyCol) {
                                                continue;
                                            }
                                            var maxPos = effectiveFilterDepth *
                                                effectiveFilterHeight * effectiveFilterWidth -
                                                1 -
                                                maxPosBuf.get(batch, dyDepth, dyRow, dyCol, channel);
                                            var curPos = wDepth * effectiveFilterHeight * effectiveFilterWidth +
                                                wRow * effectiveFilterWidth + wCol;
                                            var mask = maxPos === curPos ? 1 : 0;
                                            if (mask === 0) {
                                                continue;
                                            }
                                            var pixel = dyBuf.get(batch, dyDepth, dyRow, dyCol, channel);
                                            dotProd += pixel * mask;
                                        }
                                    }
                                }
                                dx.set(dotProd, batch, dxDepth, dxRow, dxCol, channel);
                            }
                        }
                    }
                }
            }
            return dx.toTensor();
        };
        MathBackendCPU.prototype.resizeBilinear = function (x, newHeight, newWidth, alignCorners) {
            assertNotComplex(x, 'resizeBilinear');
            var _a = x.shape, batch = _a[0], oldHeight = _a[1], oldWidth = _a[2], numChannels = _a[3];
            var xValues = this.readSync(x.dataId);
            var result = new Float32Array(tf.util.sizeFromShape([batch, newHeight, newWidth, numChannels]));
            var effectiveInputSize = [
                (alignCorners && newHeight > 1) ? oldHeight - 1 : oldHeight,
                (alignCorners && newWidth > 1) ? oldWidth - 1 : oldWidth
            ];
            var effectiveOutputSize = [
                (alignCorners && newHeight > 1) ? newHeight - 1 : newHeight,
                (alignCorners && newWidth > 1) ? newWidth - 1 : newWidth
            ];
            var outputIdx = 0;
            var effectiveRowSizeRatio = effectiveInputSize[0] / effectiveOutputSize[0];
            var effectiveColSizeRatio = effectiveInputSize[1] / effectiveOutputSize[1];
            for (var b = 0; b < batch; b++) {
                for (var r = 0; r < newHeight; r++) {
                    var sourceFracRow = effectiveRowSizeRatio * r;
                    var sourceRowFloor = Math.floor(sourceFracRow);
                    var rowFrac = sourceFracRow - sourceRowFloor;
                    var sourceRowCeil = Math.min(oldHeight - 1, Math.ceil(sourceFracRow));
                    var topRowOffset = b * x.strides[0] + sourceRowFloor * x.strides[1];
                    var botRowOffset = b * x.strides[0] + sourceRowCeil * x.strides[1];
                    for (var c = 0; c < newWidth; c++) {
                        var sourceFracCol = effectiveColSizeRatio * c;
                        var sourceColFloor = Math.floor(sourceFracCol);
                        var colFrac = sourceFracCol - sourceColFloor;
                        var sourceColCeil = Math.min(oldWidth - 1, Math.ceil(sourceFracCol));
                        var topLeftOffest = topRowOffset + sourceColFloor * x.strides[2];
                        var botLeftOffset = botRowOffset + sourceColFloor * x.strides[2];
                        var topRightOffset = topRowOffset + sourceColCeil * x.strides[2];
                        var botRightOffest = botRowOffset + sourceColCeil * x.strides[2];
                        for (var d = 0; d < numChannels; d++) {
                            // Begin shader.
                            // Compute the fractional index of the source.
                            var topLeft = xValues[topLeftOffest + d];
                            var bottomLeft = xValues[botLeftOffset + d];
                            var topRight = xValues[topRightOffset + d];
                            var bottomRight = xValues[botRightOffest + d];
                            var top_1 = topLeft + (topRight - topLeft) * colFrac;
                            var bottom = bottomLeft + (bottomRight - bottomLeft) * colFrac;
                            var newValue = top_1 + (bottom - top_1) * rowFrac;
                            result[outputIdx++] = newValue;
                        }
                    }
                }
            }
            return tf.tensor(result, [batch, newHeight, newWidth, numChannels]);
        };
        MathBackendCPU.prototype.resizeBilinearBackprop = function (dy, x, alignCorners) {
            assertNotComplex([dy, x], 'resizeBilinearBackprop');
            var _a = x.shape, batch = _a[0], xHeight = _a[1], xWidth = _a[2], depth = _a[3];
            var _b = dy.shape, yHeight = _b[1], yWidth = _b[2];
            var output = new Float32Array(batch * xHeight * xWidth * depth);
            // In the backwards pass, we want to find the pixels that were generated
            // for each pixel in the input image the forward pass and add the
            // corresponding coefficient from dy to the gradient (with some
            // interpolation).
            var effectiveXSize = [
                (alignCorners && yHeight > 1) ? xHeight - 1 : xHeight,
                (alignCorners && yWidth > 1) ? xWidth - 1 : xWidth
            ];
            var effectiveYSize = [
                (alignCorners && yHeight > 1) ? yHeight - 1 : yHeight,
                (alignCorners && yWidth > 1) ? yWidth - 1 : yWidth
            ];
            var heightScale = effectiveXSize[0] / effectiveYSize[0];
            var widthScale = effectiveXSize[1] / effectiveYSize[1];
            // Reference implementation
            // tslint:disable-next-line:max-line-length
            // https://github.com/tensorflow/tensorflow/blob/3039375c86a5bbc9610c7725dcaa95d635f87ba2/tensorflow/core/kernels/resize_bilinear_op.cc#L275
            var dyValues = this.readSync(dy.dataId);
            var offset = 0;
            for (var b = 0; b < batch; b++) {
                var bOffset = b * x.strides[0];
                for (var r = 0; r < yHeight; r++) {
                    var dxR = r * heightScale;
                    var topDxRIndex = Math.floor(dxR);
                    var bottomDxRIndex = Math.min(Math.ceil(dxR), xHeight - 1);
                    var topDxROffset = bOffset + topDxRIndex * x.strides[1];
                    var bottomDxROffset = bOffset + bottomDxRIndex * x.strides[1];
                    var dxRLerp = dxR - topDxRIndex;
                    var inverseDxRLerp = 1.0 - dxRLerp;
                    for (var c = 0; c < yWidth; c++) {
                        var dxC = c * widthScale;
                        var leftDxCIndex = Math.floor(dxC);
                        var rightDxCIndex = Math.min(Math.ceil(dxC), xWidth - 1);
                        var dxCLerp = dxC - leftDxCIndex;
                        var inverseDxCLerp = 1.0 - dxCLerp;
                        var topLeftRCOffset = topDxROffset + leftDxCIndex * x.strides[2];
                        var topRightRCOffset = topDxROffset + rightDxCIndex * x.strides[2];
                        var bottomLeftRCOffset = bottomDxROffset + leftDxCIndex * x.strides[2];
                        var bottomRightRCOffset = bottomDxROffset + rightDxCIndex * x.strides[2];
                        var inverseDxRLerpTimesInverseDxCLerp = inverseDxRLerp * inverseDxCLerp;
                        var inverseDxRLerpTimesDxCLerp = inverseDxRLerp * dxCLerp;
                        var dxRLerpTimesInverseDxCLerp = dxRLerp * inverseDxCLerp;
                        var dxRLerpTimesDxCLerp = dxRLerp * dxCLerp;
                        for (var d = 0; d < depth; d++) {
                            var dyVal = dyValues[offset++];
                            output[topLeftRCOffset + d] +=
                                dyVal * inverseDxRLerpTimesInverseDxCLerp;
                            output[topRightRCOffset + d] += dyVal * inverseDxRLerpTimesDxCLerp;
                            output[bottomLeftRCOffset + d] +=
                                dyVal * dxRLerpTimesInverseDxCLerp;
                            output[bottomRightRCOffset + d] += dyVal * dxRLerpTimesDxCLerp;
                        }
                    }
                }
            }
            return tf.tensor4d(output, [batch, xWidth, xHeight, depth], x.dtype);
        };
        MathBackendCPU.prototype.resizeNearestNeighbor = function (x, newHeight, newWidth, alignCorners) {
            assertNotComplex(x, 'resizeNearestNeighbor');
            var _a = x.shape, batch = _a[0], oldHeight = _a[1], oldWidth = _a[2], numChannels = _a[3];
            var xValues = this.readSync(x.dataId);
            var output = new Float32Array(batch * newHeight * newWidth * numChannels);
            var effectiveInputSize = [
                (alignCorners && newHeight > 1) ? oldHeight - 1 : oldHeight,
                (alignCorners && newWidth > 1) ? oldWidth - 1 : oldWidth
            ];
            var effectiveOutputSize = [
                (alignCorners && newHeight > 1) ? newHeight - 1 : newHeight,
                (alignCorners && newWidth > 1) ? newWidth - 1 : newWidth
            ];
            var effectiveRowSizeRatio = effectiveInputSize[0] / effectiveOutputSize[0];
            var effectiveColSizeRatio = effectiveInputSize[1] / effectiveOutputSize[1];
            var outputOffset = 0;
            for (var b = 0; b < batch; b++) {
                var batchOffset = b * x.strides[0];
                for (var r = 0; r < newHeight; r++) {
                    var sourceFracRow = effectiveRowSizeRatio * r;
                    var sourceNearestRow = Math.min(oldHeight - 1, alignCorners ? Math.round(sourceFracRow) :
                        Math.floor(sourceFracRow));
                    var rowOffset = batchOffset + sourceNearestRow * x.strides[1];
                    for (var c = 0; c < newWidth; c++) {
                        var sourceFracCol = effectiveColSizeRatio * c;
                        var sourceNearestCol = Math.min(oldWidth - 1, alignCorners ? Math.round(sourceFracCol) :
                            Math.floor(sourceFracCol));
                        var colOffset = rowOffset + sourceNearestCol * x.strides[2];
                        for (var d = 0; d < numChannels; d++) {
                            // Begin shader.
                            // Compute the fractional index of the source.
                            var newVal = xValues[colOffset + d];
                            output[outputOffset++] = newVal;
                        }
                    }
                }
            }
            return tf.tensor(output, [batch, newHeight, newWidth, numChannels], x.dtype);
        };
        MathBackendCPU.prototype.resizeNearestNeighborBackprop = function (dy, x, alignCorners) {
            assertNotComplex([dy, x], 'resizeNearestNeighborBackprop');
            var _a = x.shape, batch = _a[0], xHeight = _a[1], xWidth = _a[2], depth = _a[3];
            var _b = dy.shape, yHeight = _b[1], yWidth = _b[2];
            var output = new Float32Array(batch * xHeight * xWidth * depth);
            var dyValues = this.readSync(dy.dataId);
            // In the backwards pass, we want to find the pixels that were generated
            // for each pixel in the input image the forward pass
            var effectiveXSize = [
                (alignCorners && yHeight > 1) ? xHeight - 1 : xHeight,
                (alignCorners && yWidth > 1) ? xWidth - 1 : xWidth
            ];
            var effectiveYSize = [
                (alignCorners && yHeight > 1) ? yHeight - 1 : yHeight,
                (alignCorners && yWidth > 1) ? yWidth - 1 : yWidth
            ];
            var heightScale = effectiveXSize[0] / effectiveYSize[0];
            var widthScale = effectiveXSize[1] / effectiveYSize[1];
            var invHeightScale = 1 / heightScale;
            var invWidthScale = 1 / widthScale;
            // This defines the size of the window of values around a particular
            // index in dy that we want to search for contributions to dx.
            var winHeight = (Math.ceil(invHeightScale) * 2) + 2;
            var winWidth = (Math.ceil(invWidthScale) * 2) + 2;
            // Loop over the output space.
            for (var b = 0; b < batch; b++) {
                var batchOffset = b * x.strides[0];
                for (var r = 0; r < xHeight; r++) {
                    var rowOffset = batchOffset + r * x.strides[1];
                    // Compute bounds for where in dy we will look
                    var startRLerp = Math.floor(r * invHeightScale);
                    var startDyR = Math.floor(startRLerp - (winHeight / 2));
                    for (var c = 0; c < xWidth; c++) {
                        var colOffset = rowOffset + c * x.strides[2];
                        // Compute bounds for where in dy we will look
                        var startCLerp = Math.floor(c * invWidthScale);
                        var startDyC = Math.floor(startCLerp - (winWidth / 2));
                        for (var d = 0; d < depth; d++) {
                            var accum = 0;
                            // loop over dy
                            for (var dyRIndex = 0; dyRIndex < winHeight; dyRIndex++) {
                                var dyR = dyRIndex + startDyR;
                                // Guard against the window exceeding the bounds of dy
                                if (dyR < 0 || dyR >= yHeight) {
                                    continue;
                                }
                                var dyROffset = batchOffset + dyR * dy.strides[1];
                                var sourceFracRow = dyR * heightScale;
                                var sourceNearestRow = Math.min(xHeight - 1, alignCorners ? Math.round(sourceFracRow) :
                                    Math.floor(sourceFracRow));
                                if (r !== sourceNearestRow) {
                                    continue;
                                }
                                for (var dyCIndex = 0; dyCIndex < winWidth; dyCIndex++) {
                                    var dyC = dyCIndex + startDyC;
                                    // Guard against the window exceeding the bounds of dy
                                    if (dyC < 0 || dyC >= yWidth) {
                                        continue;
                                    }
                                    var dyCOffset = dyROffset + dyC * dy.strides[2];
                                    var sourceFracCol = dyC * widthScale;
                                    var sourceNearestCol = Math.min(xWidth - 1, alignCorners ? Math.round(sourceFracCol) :
                                        Math.floor(sourceFracCol));
                                    if (c === sourceNearestCol) {
                                        accum += dyValues[dyCOffset + d];
                                    }
                                }
                            }
                            output[colOffset + d] = accum;
                        }
                    }
                }
            }
            return tf.tensor4d(output, x.shape, x.dtype);
        };
        MathBackendCPU.prototype.localResponseNormalization4D = function (x, depthRadius, bias, alpha, beta) {
            assertNotComplex(x, 'localResponseNormalization4D');
            var channels = x.shape[3];
            var maxD = channels - 1;
            var xValues = this.readSync(x.dataId);
            var size = x.size;
            var result = new Float32Array(size);
            function sumAcrossChannels(offset) {
                var currentChannel = offset % channels;
                var beginSumOffset = offset - currentChannel + Math.max(0, currentChannel - depthRadius);
                var endSumOffset = offset - currentChannel +
                    Math.min(currentChannel + depthRadius, maxD);
                var sum = 0.0;
                for (; beginSumOffset <= endSumOffset; beginSumOffset++) {
                    var z = xValues[beginSumOffset];
                    sum += z * z;
                }
                return sum;
            }
            for (var offset = 0; offset < size; offset++) {
                var sum = sumAcrossChannels(offset);
                var val = xValues[offset] * Math.pow(bias + alpha * sum, -beta);
                result[offset] = val;
            }
            return tf.tensor4d(result, x.shape);
        };
        MathBackendCPU.prototype.LRNGrad = function (dy, inputImage, outputImage, depthRadius, bias, alpha, beta) {
            assertNotComplex(dy, 'LRNGrad');
            var channels = dy.shape[3];
            var dyValues = this.readSync(dy.dataId);
            var inputImageValues = this.readSync(inputImage.dataId);
            var outputImageValues = this.readSync(outputImage.dataId);
            var result = new Float32Array(dy.size);
            var size = dy.size;
            for (var offset = 0; offset < size; offset++) {
                var currentChannel = offset % channels;
                var depthBegin = (offset - currentChannel) + Math.max(0, currentChannel - depthRadius);
                var depthEnd = (offset - currentChannel) +
                    Math.min(channels, currentChannel + depthRadius + 1);
                var norm = 0;
                for (var k = depthBegin; k < depthEnd; k++) {
                    norm += Math.pow(inputImageValues[k], 2);
                }
                norm = alpha * norm + bias;
                for (var k = depthBegin; k < depthEnd; k++) {
                    var dyi = -2 * alpha * beta * inputImageValues[k] *
                        outputImageValues[offset] / norm;
                    if (offset === k) {
                        dyi += Math.pow(norm, -beta);
                    }
                    dyi *= dyValues[offset];
                    result[k] += dyi;
                }
            }
            return tf.tensor4d(result, dy.shape);
        };
        MathBackendCPU.prototype.multinomial = function (logits, normalized, numSamples, seed) {
            assertNotComplex(logits, 'multinomial');
            var probabilities = normalized ? logits : tf.softmax(logits);
            var batchSize = probabilities.shape[0];
            var numEvents = probabilities.shape[1];
            var res = tf.zeros([batchSize, numSamples], 'int32');
            var resVals = this.readSync(res.dataId);
            var probVals = this.readSync(probabilities.dataId);
            for (var b = 0; b < batchSize; ++b) {
                var offset = b * numEvents;
                // The cdf won't include the last event. It will be implicit if no other
                // event happened.
                var cdf = new Float32Array(numEvents - 1);
                cdf[0] = probVals[offset];
                for (var event_1 = 1; event_1 < cdf.length; ++event_1) {
                    cdf[event_1] = cdf[event_1 - 1] + probVals[offset + event_1];
                }
                var random = seedrandom.alea(seed.toString());
                var outOffset = b * numSamples;
                for (var sampleId = 0; sampleId < numSamples; ++sampleId) {
                    var r = random();
                    // Assume last event happened by default.
                    resVals[outOffset + sampleId] = cdf.length;
                    for (var event_2 = 0; event_2 < cdf.length; event_2++) {
                        if (r < cdf[event_2]) {
                            resVals[outOffset + sampleId] = event_2;
                            break;
                        }
                    }
                }
            }
            return res;
        };
        MathBackendCPU.prototype.oneHot = function (indices, depth, onValue, offValue) {
            assertNotComplex(indices, 'oneHot');
            var res = new Float32Array(indices.size * depth);
            res.fill(offValue);
            var indicesVal = this.readSync(indices.dataId);
            for (var event_3 = 0; event_3 < indices.size; ++event_3) {
                if (indicesVal[event_3] >= 0 && indicesVal[event_3] < depth) {
                    res[event_3 * depth + indicesVal[event_3]] = onValue;
                }
            }
            return tf.tensor2d(res, [indices.size, depth], 'int32');
        };
        MathBackendCPU.prototype.nonMaxSuppression = function (boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
            assertNotComplex(boxes, 'nonMaxSuppression');
            var boxesVals = this.readSync(boxes.dataId);
            var scoresVals = this.readSync(scores.dataId);
            return nonMaxSuppressionV3Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold);
        };
        MathBackendCPU.prototype.depthToSpace = function (x, blockSize, dataFormat) {
            tf.util.assert(dataFormat === 'NHWC', function () { return "Only NHWC dataFormat supported on CPU for depthToSpace. Got " + dataFormat; });
            tf.util.assert(blockSize > 1, function () {
                return "blockSize should be > 1 for depthToSpace, but was: " + blockSize;
            });
            var batchSize = x.shape[0];
            var inputHeight = x.shape[1];
            var inputWidth = x.shape[2];
            var inputDepth = x.shape[3];
            var outputHeight = inputHeight * blockSize;
            var outputWidth = inputWidth * blockSize;
            var outputDepth = inputDepth / (blockSize * blockSize);
            var xValues = this.readSync(x.dataId);
            var result = new Float32Array(batchSize * outputHeight * outputWidth * outputDepth);
            var outputIdx = 0;
            for (var b = 0; b < batchSize; ++b) {
                for (var h = 0; h < outputHeight; ++h) {
                    var inH = Math.floor(h / blockSize);
                    var offsetH = (h % blockSize);
                    for (var w = 0; w < outputWidth; ++w) {
                        var inW = Math.floor(w / blockSize);
                        var offsetW = (w % blockSize);
                        var offsetD = (offsetH * blockSize + offsetW) * outputDepth;
                        for (var d = 0; d < outputDepth; ++d) {
                            var inD = d + offsetD;
                            var inputIdx = inD + inputDepth * (inW + inputWidth * (inH + inputHeight * b));
                            result[outputIdx++] = xValues[inputIdx];
                        }
                    }
                }
            }
            return tf.tensor4d(result, [batchSize, outputHeight, outputWidth, outputDepth]);
        };
        MathBackendCPU.prototype.broadcastedBinaryOp = function (a, b, dtype, op) {
            var newShape = tf.backend_util.assertAndGetBroadcastShape(a.shape, b.shape);
            var result = tf.buffer(newShape, dtype);
            var aVals = this.readSync(a.dataId);
            var bVals = this.readSync(b.dataId);
            var aBroadcastDims = tf.backend_util.getBroadcastDims(a.shape, newShape);
            var bBroadcastDims = tf.backend_util.getBroadcastDims(b.shape, newShape);
            var resVals = result.values;
            if (aBroadcastDims.length + bBroadcastDims.length === 0) {
                for (var i = 0; i < resVals.length; ++i) {
                    resVals[i] = op(aVals[i % aVals.length], bVals[i % bVals.length]);
                }
            }
            else {
                var aBuf = this.bufferSync(a);
                var bBuf = this.bufferSync(b);
                var _loop_2 = function (i) {
                    var loc = result.indexToLoc(i);
                    var aLoc = loc.slice(-a.rank);
                    aBroadcastDims.forEach(function (d) { return aLoc[d] = 0; });
                    var aIndex = aBuf.locToIndex(aLoc);
                    var bLoc = loc.slice(-b.rank);
                    bBroadcastDims.forEach(function (d) { return bLoc[d] = 0; });
                    var bIndex = bBuf.locToIndex(bLoc);
                    resVals[i] = op(aVals[aIndex], bVals[bIndex]);
                };
                for (var i = 0; i < resVals.length; ++i) {
                    _loop_2(i);
                }
            }
            return result.toTensor();
        };
        MathBackendCPU.prototype.split = function (x, sizeSplits, axis) {
            return split(x, sizeSplits, axis);
        };
        MathBackendCPU.prototype.dispose = function () { };
        MathBackendCPU.prototype.floatPrecision = function () {
            return 32;
        };
        /** Returns the smallest representable number.  */
        MathBackendCPU.prototype.epsilon = function () {
            return _super.prototype.epsilon.call(this);
        };
        MathBackendCPU.prototype.cropAndResize = function (images, boxes, boxIndex, cropSize, method, extrapolationValue) {
            var _a = images.shape, batch = _a[0], imageHeight = _a[1], imageWidth = _a[2], numChannels = _a[3];
            var numBoxes = boxes.shape[0];
            var cropHeight = cropSize[0], cropWidth = cropSize[1];
            var output = tf.buffer([numBoxes, cropHeight, cropWidth, numChannels], 'float32');
            var boxVals = this.readSync(boxes.dataId);
            var boxIndVals = this.readSync(boxIndex.dataId);
            var imageVals = this.readSync(images.dataId);
            var inStride = images.strides; // to calculate flat indexes into image
            var outStride = output.strides; // to calculate flat indexes into output
            // Reference implementation
            // tslint:disable-next-line:max-line-length
            // https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/kernels/crop_and_resize_op.cc
            for (var b = 0; b < numBoxes; b++) {
                var startInd = b * 4;
                var y1 = boxVals[startInd];
                var x1 = boxVals[startInd + 1];
                var y2 = boxVals[startInd + 2];
                var x2 = boxVals[startInd + 3];
                var bInd = boxIndVals[b];
                if (bInd >= batch) {
                    continue;
                }
                var heightScale = (cropHeight > 1) ?
                    (y2 - y1) * (imageHeight - 1) / (cropHeight - 1) :
                    0;
                var widthScale = (cropWidth > 1) ? (x2 - x1) * (imageWidth - 1) / (cropWidth - 1) : 0;
                for (var y = 0; y < cropHeight; y++) {
                    var yInd = (cropHeight > 1) ?
                        y1 * (imageHeight - 1) + y * (heightScale) :
                        0.5 * (y1 + y2) * (imageHeight - 1);
                    if (yInd < 0 || yInd > imageHeight - 1) {
                        for (var x = 0; x < cropWidth; x++) {
                            for (var c = 0; c < numChannels; c++) {
                                var ind = c + x * outStride[2] + y * outStride[1] + b * outStride[0];
                                output.values[ind] = extrapolationValue;
                            }
                        }
                        continue;
                    }
                    if (method === 'bilinear') {
                        var topInd = Math.floor(yInd);
                        var bottomInd = Math.ceil(yInd);
                        var yLerp = yInd - topInd;
                        for (var x = 0; x < cropWidth; x++) {
                            var xInd = (cropWidth > 1) ?
                                x1 * (imageWidth - 1) + x * widthScale :
                                0.5 * (x1 + x2) * (imageWidth - 1);
                            if (xInd < 0 || xInd > imageWidth - 1) {
                                for (var c = 0; c < numChannels; c++) {
                                    var ind = c + x * outStride[2] + y * outStride[1] + b * outStride[0];
                                    output.values[ind] = extrapolationValue;
                                }
                                continue;
                            }
                            var leftInd = Math.floor(xInd);
                            var rightInd = Math.ceil(xInd);
                            var xLerp = xInd - leftInd;
                            for (var c = 0; c < numChannels; c++) {
                                var ind = c + leftInd * inStride[2] + topInd * inStride[1] +
                                    bInd * inStride[0];
                                var topLeft = imageVals[ind];
                                ind = c + rightInd * inStride[2] + topInd * inStride[1] +
                                    bInd * inStride[0];
                                var topRight = imageVals[ind];
                                ind = c + leftInd * inStride[2] + bottomInd * inStride[1] +
                                    bInd * inStride[0];
                                var bottomLeft = imageVals[ind];
                                ind = c + rightInd * inStride[2] + bottomInd * inStride[1] +
                                    bInd * inStride[0];
                                var bottomRight = imageVals[ind];
                                var top_2 = topLeft + (topRight - topLeft) * xLerp;
                                var bottom = bottomLeft + (bottomRight - bottomLeft) * xLerp;
                                ind = c + x * outStride[2] + y * outStride[1] + b * outStride[0];
                                output.values[ind] = top_2 + ((bottom - top_2) * yLerp);
                            }
                        }
                    }
                    else { // method == "nearest"
                        for (var x = 0; x < cropWidth; ++x) {
                            var xInd = (cropWidth > 1) ?
                                x1 * (imageWidth - 1) + x * widthScale :
                                0.5 * (x1 + x2) * (imageWidth - 1);
                            if (xInd < 0 || xInd > imageWidth - 1) {
                                for (var c = 0; c < numChannels; c++) {
                                    var ind = c + x * outStride[2] + y * outStride[1] + b * outStride[0];
                                    output.values[ind] = extrapolationValue;
                                }
                                continue;
                            }
                            var closestX = Math.round(xInd);
                            var closestY = Math.round(yInd);
                            for (var c = 0; c < numChannels; c++) {
                                var inInd = c + closestX * inStride[2] +
                                    closestY * inStride[1] + bInd * inStride[0];
                                var outInd = c + x * outStride[2] + y * outStride[1] + b * outStride[0];
                                output.values[outInd] = imageVals[inInd];
                            }
                        }
                    }
                }
            }
            return output.toTensor();
        };
        MathBackendCPU.prototype.sparseToDense = function (sparseIndices, sparseValues, outputShape, defaultValue) {
            var _a = tf.backend_util.calculateShapes(sparseValues, sparseIndices, outputShape), sliceRank = _a.sliceRank, numUpdates = _a.numUpdates, sliceSize = _a.sliceSize, strides = _a.strides, outputSize = _a.outputSize;
            var sumDupeIndices = false;
            return this.scatter(sparseIndices, sparseValues, outputShape, outputSize, sliceSize, numUpdates, sliceRank, strides, defaultValue, sumDupeIndices);
        };
        MathBackendCPU.prototype.gatherND = function (x, indices) {
            var indicesShape = indices.shape;
            var sliceRank = indicesShape[indicesShape.length - 1];
            var _a = tf.backend_util.prepareAndValidate(x, indices), resultShape = _a[0], numSlices = _a[1], sliceSize = _a[2], strides = _a[3];
            if (numSlices === 0) {
                return tf.tensor([], resultShape, x.dtype);
            }
            var buffer = new tf.TensorBuffer([numSlices, sliceSize], x.dtype);
            var indicesData = this.readSync(indices.dataId);
            var xData = this.readSync(x.dataId);
            for (var i = 0; i < numSlices; i++) {
                var index = [];
                var flattenIndex = 0;
                for (var j = 0; j < sliceRank; j++) {
                    var dim = indicesData[i * sliceRank + j];
                    flattenIndex += dim * strides[j];
                    index.push(dim);
                }
                if (flattenIndex < 0 || flattenIndex >= x.size / sliceSize) {
                    throw new Error("Invalid indices: " + index + " does not index into " + x.shape);
                }
                for (var k = 0; k < sliceSize; k++) {
                    buffer.values[i * sliceSize + k] = xData[flattenIndex * sliceSize + k];
                }
            }
            return buffer.toTensor().reshape(resultShape);
        };
        MathBackendCPU.prototype.scatterND = function (indices, updates, shape) {
            var _a = tf.backend_util.calculateShapes(updates, indices, shape), sliceRank = _a.sliceRank, numUpdates = _a.numUpdates, sliceSize = _a.sliceSize, strides = _a.strides, outputSize = _a.outputSize;
            var defaultValue = tf.scalar(0);
            var sumDupeIndices = true;
            return this.scatter(indices, updates, shape, outputSize, sliceSize, numUpdates, sliceRank, strides, defaultValue, sumDupeIndices);
        };
        MathBackendCPU.prototype.onesLike = function (x) {
            if (x.dtype === 'string') {
                throw new Error('onesLike is not supported for string tensors');
            }
            else {
                // TODO(lina128): Use fill kernel directly once this kernel is
                // modularized.
                return tf.fill(x.shape, 1, x.dtype);
            }
        };
        MathBackendCPU.prototype.zerosLike = function (x) {
            var values = tf.util.getArrayFromDType(x.dtype, tf.util.sizeFromShape(x.shape));
            return this.makeOutput(values, x.shape, x.dtype);
        };
        MathBackendCPU.prototype.linspace = function (start, stop, num) {
            return tf.backend_util.linspaceImpl(start, stop, num);
        };
        MathBackendCPU.prototype.scatter = function (indices, updates, shape, outputSize, sliceSize, numUpdates, sliceRank, strides, defaultValue, sumDupeIndices) {
            var flattenShape = [outputSize / sliceSize, sliceSize];
            var indicesData = this.readSync(indices.dataId);
            var updatesData = this.readSync(updates.dataId);
            if (outputSize === 0) {
                return tf.tensor([], shape, updates.dtype);
            }
            var buffer = new tf.TensorBuffer(flattenShape, updates.dtype);
            buffer.values.fill(this.readSync(defaultValue.dataId)[0]);
            for (var i = 0; i < numUpdates; i++) {
                var index = [];
                var flattenIndex = 0;
                for (var j = 0; j < sliceRank; j++) {
                    var dim = indicesData[i * sliceRank + j];
                    index.push(dim);
                    flattenIndex += dim * strides[j];
                }
                if (flattenIndex < 0 || flattenIndex >= outputSize / sliceSize) {
                    throw new Error("Invalid indices: " + index + " does not index into " + shape);
                }
                for (var k = 0; k < sliceSize; k++) {
                    if (sumDupeIndices) {
                        buffer.values[flattenIndex * sliceSize + k] +=
                            updatesData[i * sliceSize + k];
                    }
                    else {
                        buffer.values[flattenIndex * sliceSize + k] = updates.rank === 0 ?
                            updatesData[0] :
                            updatesData[i * sliceSize + k];
                    }
                }
            }
            return buffer.toTensor().reshape(shape);
        };
        return MathBackendCPU;
    }(tf.KernelBackend));

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function simpleAbsImpl(vals) {
        var resultValues = new Float32Array(vals.length);
        for (var i = 0; i < vals.length; ++i) {
            resultValues[i] = Math.abs(vals[i]);
        }
        return resultValues;
    }
    var abs = function (args) {
        var x = args.inputs.x;
        var cpuBackend = args.backend;
        var resultValues = new Float32Array(tf.util.sizeFromShape(x.shape));
        if (x.dtype !== 'complex64') {
            var values = cpuBackend.data.get(x.dataId).values;
            resultValues = simpleAbsImpl(values);
        }
        else {
            var complexVals = cpuBackend.data.get(x.dataId);
            var real = complexVals.complexTensorInfos.real;
            var imag = complexVals.complexTensorInfos.imag;
            var realVals = cpuBackend.data.get(real.dataId).values;
            var imagVals = cpuBackend.data.get(imag.dataId).values;
            for (var i = 0; i < realVals.length; i++) {
                var real_1 = realVals[i];
                var imag_1 = imagVals[i];
                resultValues[i] = Math.hypot(real_1, imag_1);
            }
        }
        return cpuBackend.makeOutput(resultValues, x.shape, 'float32');
    };
    var absConfig = {
        kernelName: tf.Abs,
        backendName: 'cpu',
        kernelFunc: abs,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    /**
     * Template that creates implementation for binary ops. Supports broadcast.
     */
    function createSimpleBinaryKernelImpl(op) {
        return function (aShape, bShape, aVals, bVals, dtype) {
            var newShape = tf.backend_util.assertAndGetBroadcastShape(aShape, bShape);
            var resultRank = newShape.length;
            var resultStrides = tf.util.computeStrides(newShape);
            var resultSize = tf.util.sizeFromShape(newShape);
            var result = tf.util.getTypedArrayFromDType(dtype, resultSize);
            var aRank = aShape.length;
            var bRank = bShape.length;
            var aStrides = tf.util.computeStrides(aShape);
            var bStrides = tf.util.computeStrides(bShape);
            var aBroadcastDims = tf.backend_util.getBroadcastDims(aShape, newShape);
            var bBroadcastDims = tf.backend_util.getBroadcastDims(bShape, newShape);
            if (aBroadcastDims.length + bBroadcastDims.length === 0) {
                for (var i = 0; i < result.length; ++i) {
                    result[i] = op(aVals[i % aVals.length], bVals[i % bVals.length]);
                }
            }
            else {
                var _loop_1 = function (i) {
                    var loc = tf.util.indexToLoc(i, resultRank, resultStrides);
                    var aLoc = loc.slice(-aRank);
                    aBroadcastDims.forEach(function (d) { return aLoc[d] = 0; });
                    var aIndex = tf.util.locToIndex(aLoc, aRank, aStrides);
                    var bLoc = loc.slice(-bRank);
                    bBroadcastDims.forEach(function (d) { return bLoc[d] = 0; });
                    var bIndex = tf.util.locToIndex(bLoc, bRank, bStrides);
                    result[i] = op(aVals[aIndex], bVals[bIndex]);
                };
                for (var i = 0; i < result.length; ++i) {
                    _loop_1(i);
                }
            }
            return [result, newShape];
        };
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function complex(args) {
        var inputs = args.inputs, backend = args.backend;
        var real = inputs.real, imag = inputs.imag;
        var realVals = backend.data.get(real.dataId).values;
        var imagVals = backend.data.get(imag.dataId).values;
        var complexInfo = backend.makeTensorInfo(real.shape, 'complex64');
        var complex = backend.data.get(complexInfo.dataId);
        // The complex tensor owns the underlying real and imag tensorInfos, only the
        // complex tensor tracks refCount, when complexData is disposed the
        // underlying tensorData will be disposed.
        complex.complexTensorInfos = {
            real: backend.makeTensorInfo(real.shape, 'float32', realVals),
            imag: backend.makeTensorInfo(imag.shape, 'float32', imagVals)
        };
        return complexInfo;
    }
    var complexConfig = {
        kernelName: tf.Complex,
        backendName: 'cpu',
        kernelFunc: complex
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function identity(args) {
        var inputs = args.inputs, backend = args.backend;
        var x = inputs.x;
        backend.incRef(x.dataId);
        return { dataId: x.dataId, shape: x.shape, dtype: x.dtype };
    }
    var identityConfig = {
        kernelName: tf.Identity,
        backendName: 'cpu',
        kernelFunc: identity
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function real(args) {
        var inputs = args.inputs, backend = args.backend;
        var input = inputs.input;
        var real = backend.data.get(input.dataId).complexTensorInfos.real;
        var realVal = backend.data.get(real.dataId).values;
        // When complex tensor is disposed, its underlying parts will be disposed too.
        // Make new tensor out of the real value of the complex. This makes sure the
        // value is still accessible even if complex tensor is disposed.
        return backend.makeTensorInfo(real.shape, real.dtype, realVal);
    }
    var realConfig = {
        kernelName: tf.Real,
        backendName: 'cpu',
        kernelFunc: real
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function cast(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        var dtype = attrs.dtype;
        // Casting to complex64.
        if (dtype === 'complex64') {
            if (x.dtype === 'complex64') {
                return identity({ inputs: { x: x }, backend: backend });
            }
            // TODO(lina128): Import kernel function once zeros is modularized.
            var zerosTensor = tf.zeros(x.shape);
            var floatX = cast({ inputs: { x: x }, backend: backend, attrs: { dtype: 'float32' } });
            var result = complex({ inputs: { real: floatX, imag: zerosTensor }, backend: backend });
            zerosTensor.dispose();
            backend.disposeIntermediateTensorInfo(floatX);
            return result;
        }
        // Casting from complex64
        if (x.dtype === 'complex64') {
            var realPart = real({ inputs: { input: x }, backend: backend });
            var result = cast({ inputs: { x: realPart }, backend: backend, attrs: { dtype: dtype } });
            backend.disposeIntermediateTensorInfo(realPart);
            return result;
        }
        if (!tf.util.hasEncodingLoss(x.dtype, dtype)) {
            // We don't change the underlying data, since we cast to higher
            // precision.
            var result = identity({ inputs: { x: x }, backend: backend });
            return { dataId: result.dataId, shape: result.shape, dtype: dtype };
        }
        if (dtype === 'int32') {
            var values = backend.data.get(x.dataId).values;
            var resultValues = Int32Array.from(values);
            return backend.makeTensorInfo(x.shape, 'int32', resultValues);
        }
        if (dtype === 'bool') {
            // This is essentially the result of notEqual(x, 0). We avoid using
            // kernel notEqual to avoid circular dependency, i.e. binary_utils ->
            // cast -> notEqual -> binary_utils.
            var xVals = backend.data.get(x.dataId).values;
            var zero = tf.util.toTypedArray([0], x.dtype);
            var _a = createSimpleBinaryKernelImpl(function (a, b) { return (a !== b) ? 1 : 0; })(x.shape, [], xVals, zero, 'bool'), resultData = _a[0], resultShape = _a[1];
            return backend.makeTensorInfo(resultShape, 'bool', resultData);
        }
        throw new Error("Error in Cast: failed to cast " + x.dtype + " to " + dtype);
    }
    var castConfig = {
        kernelName: tf.Cast,
        backendName: 'cpu',
        kernelFunc: cast
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    /**
     * Template that creates a `KernelFunc` for binary ops.
     * @param name Kernel name.
     * @param binaryKernelImpl A `SimpleBinaryKernelImpl` for the kernel.
     * @param binaryKernelComplexImpl Optional. If exists, represents a
     *     `ComplexBinaryKernelImpl` for the kernel, will be used when input dtype
     *     is `complex64`.
     * @param dtype Optional. If set, the result has this dtype. Otherwise, the
     *     result has the same dtype as the first input. This is mainly used in
     *     comparison kernels, such as Equal, Less, Greater, etc.
     */
    function binaryKernelFunc(name, simpleImpl, complexImpl, dtype) {
        if (complexImpl == null) {
            return function (_a) {
                var inputs = _a.inputs, backend = _a.backend;
                var _b = inputs, a = _b.a, b = _b.b;
                var cpuBackend = backend;
                assertNotComplex([a, b], name);
                var aVals = cpuBackend.data.get(a.dataId).values;
                var bVals = cpuBackend.data.get(b.dataId).values;
                var $dtype = dtype || a.dtype;
                var _c = simpleImpl(a.shape, b.shape, aVals, bVals, $dtype), resultData = _c[0], resultShape = _c[1];
                return cpuBackend.makeTensorInfo(resultShape, $dtype, resultData);
            };
        }
        return function (_a) {
            var inputs = _a.inputs, backend = _a.backend;
            var _b = inputs, a = _b.a, b = _b.b;
            var cpuBackend = backend;
            if (a.dtype === 'complex64' || b.dtype === 'complex64') {
                var $aComplex = cast({ inputs: { x: a }, backend: cpuBackend, attrs: { dtype: 'complex64' } });
                var $aComplexVals = cpuBackend.data.get($aComplex.dataId);
                var aReal = $aComplexVals.complexTensorInfos.real;
                var aImag = $aComplexVals.complexTensorInfos.imag;
                var aRealVals = cpuBackend.data.get(aReal.dataId).values;
                var aImagVals = cpuBackend.data.get(aImag.dataId).values;
                var $bComplex = cast({ inputs: { x: b }, backend: cpuBackend, attrs: { dtype: 'complex64' } });
                var $bComplexVals = cpuBackend.data.get($bComplex.dataId);
                var bReal = $bComplexVals.complexTensorInfos.real;
                var bImag = $bComplexVals.complexTensorInfos.imag;
                var bRealVals = cpuBackend.data.get(bReal.dataId).values;
                var bImagVals = cpuBackend.data.get(bImag.dataId).values;
                var _c = complexImpl(a.shape, b.shape, aRealVals, aImagVals, bRealVals, bImagVals), resultRealData = _c[0], resultImagData = _c[1], resultShape = _c[2];
                var resultReal = cpuBackend.makeTensorInfo(resultShape, 'float32', resultRealData);
                var resultImag = cpuBackend.makeTensorInfo(resultShape, 'float32', resultImagData);
                var result = complex({ inputs: { real: resultReal, imag: resultImag }, backend: cpuBackend });
                cpuBackend.disposeIntermediateTensorInfo($aComplex);
                cpuBackend.disposeIntermediateTensorInfo($bComplex);
                cpuBackend.disposeIntermediateTensorInfo(resultReal);
                cpuBackend.disposeIntermediateTensorInfo(resultImag);
                return result;
            }
            else {
                var aVals = cpuBackend.data.get(a.dataId).values;
                var bVals = cpuBackend.data.get(b.dataId).values;
                var $dtype = dtype || a.dtype;
                var _d = simpleImpl(a.shape, b.shape, aVals, bVals, $dtype), resultData = _d[0], resultShape = _d[1];
                return cpuBackend.makeTensorInfo(resultShape, $dtype, resultData);
            }
        };
    }
    /**
     * Template that creates the complex type implementation for binary ops.
     * Supports broadcast.
     */
    function createComplexBinaryKernelImpl(op) {
        return function (aShape, bShape, aRealVals, aImagVals, bRealVals, bImagVals) {
            var resultShape = tf.backend_util.assertAndGetBroadcastShape(aShape, bShape);
            var resultSize = tf.util.sizeFromShape(resultShape);
            var resultRank = resultShape.length;
            var resultStrides = tf.util.computeStrides(resultShape);
            var resultRealVals = tf.util.getTypedArrayFromDType('float32', resultSize);
            var resultImagVals = tf.util.getTypedArrayFromDType('float32', resultSize);
            var aBroadcastDims = tf.backend_util.getBroadcastDims(aShape, resultShape);
            var bBroadcastDims = tf.backend_util.getBroadcastDims(bShape, resultShape);
            var aVals = tf.backend_util.mergeRealAndImagArrays(aRealVals, aImagVals);
            var bVals = tf.backend_util.mergeRealAndImagArrays(bRealVals, bImagVals);
            var aRank = aShape.length;
            var aStrides = tf.util.computeStrides(aShape);
            var bRank = bShape.length;
            var bStrides = tf.util.computeStrides(bShape);
            if (aBroadcastDims.length + bBroadcastDims.length === 0) {
                for (var i = 0; i < resultRealVals.length; i++) {
                    var aIdx = i % aVals.length;
                    var bIdx = i % bVals.length;
                    var result = op(aVals[aIdx * 2], aVals[aIdx * 2 + 1], bVals[bIdx * 2], bVals[bIdx * 2 + 1]);
                    resultRealVals[i] = result.real;
                    resultImagVals[i] = result.imag;
                }
            }
            else {
                var _loop_1 = function (i) {
                    var loc = tf.util.indexToLoc(i, resultRank, resultStrides);
                    var aLoc = loc.slice(-aRank);
                    aBroadcastDims.forEach(function (d) { return aLoc[d] = 0; });
                    var aIndex = tf.util.locToIndex(aLoc, aRank, aStrides);
                    var bLoc = loc.slice(-bRank);
                    bBroadcastDims.forEach(function (d) { return bLoc[d] = 0; });
                    var bIndex = tf.util.locToIndex(bLoc, bRank, bStrides);
                    var opResult = op(aVals[aIndex * 2], aVals[aIndex * 2 + 1], bVals[bIndex * 2], bVals[bIndex * 2 + 1]);
                    resultRealVals[i] = opResult.real;
                    resultImagVals[i] = opResult.imag;
                };
                for (var i = 0; i < resultRealVals.length; i++) {
                    _loop_1(i);
                }
            }
            return [resultRealVals, resultImagVals, resultShape];
        };
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var addImpl = createSimpleBinaryKernelImpl((function (a, b) { return a + b; }));
    var addComplexImpl = createComplexBinaryKernelImpl((function (aReal, aImag, bReal, bImag) {
        return { real: aReal + bReal, imag: aImag + bImag };
    }));
    var add = binaryKernelFunc(tf.Add, addImpl, addComplexImpl);
    var addConfig = {
        kernelName: tf.Add,
        backendName: 'cpu',
        kernelFunc: add
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    /**
     * Template that creates implementation for unary op.
     */
    function createSimpleUnaryImpl(op) {
        return function (values, dtype, attrs) {
            var newValues = tf.util.getTypedArrayFromDType(dtype, values.length);
            for (var i = 0; i < values.length; ++i) {
                newValues[i] = op(values[i], attrs);
            }
            return newValues;
        };
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    /**
     * Template that creates a `KernelFunc` for unary ops.
     * @param name Kernel name.
     * @param op A `SimpleUnaryOperation` for the kernel.
     * @param dtype Optional. If set, the result has this dtype. Otherwise, the
     *     result has the same dtype as the input. This is mainly used in certain
     *     kernels that return bool type, such as isFinite, isInf, etc.
     */
    function unaryKernelFunc(name, op, dtype) {
        return function (_a) {
            var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
            var x = inputs.x;
            assertNotComplex(x, name);
            if (x.dtype === 'string' || dtype === 'string') {
                throw new Error('unaryKernelFunc does not support string input/output');
            }
            var cpuBackend = backend;
            var values = cpuBackend.data.get(x.dataId).values;
            var xSize = tf.util.sizeFromShape(x.shape);
            var $dtype = dtype || x.dtype;
            var newValues = tf.util.getArrayFromDType($dtype, xSize);
            for (var i = 0; i < xSize; ++i) {
                newValues[i] = op(values[i], attrs);
            }
            return cpuBackend.makeTensorInfo(x.shape, $dtype, newValues);
        };
    }
    /**
     * Template that creates a `KernelFunc` for unary ops from the given
     * `SimpleUnaryImpl`..
     * @param name Kernel name.
     * @param unaryImpl A `SimpleUnaryImpl` that implements the op.
     * @param dtype Optional. If set, the result has this dtype. Otherwise, the
     *     result has the same dtype as the input. This is mainly used in certain
     *     kernels that return bool type, such as isFinite, isInf, etc.
     */
    function unaryKernelFuncFromImpl(name, unaryImpl, dtype) {
        return function (_a) {
            var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
            var x = inputs.x;
            assertNotComplex(x, name);
            if (x.dtype === 'string' || dtype === 'string') {
                throw new Error('unaryKernelFunc does not support string input/output');
            }
            var cpuBackend = backend;
            var values = cpuBackend.data.get(x.dataId).values;
            var $dtype = dtype || x.dtype;
            var newValues = unaryImpl(values, $dtype, attrs);
            return cpuBackend.makeTensorInfo(x.shape, $dtype, newValues);
        };
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var ceilImpl = createSimpleUnaryImpl(function (xi) { return Math.ceil(xi); });
    var ceil = unaryKernelFuncFromImpl(tf.Ceil, ceilImpl);
    var ceilConfig = {
        kernelName: tf.Ceil,
        backendName: 'cpu',
        kernelFunc: ceil,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var expImpl = createSimpleUnaryImpl(function (xi) { return Math.exp(xi); });
    var exp = unaryKernelFuncFromImpl(tf.Exp, expImpl);
    var expConfig = {
        kernelName: tf.Exp,
        backendName: 'cpu',
        kernelFunc: exp,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var expm1Impl = createSimpleUnaryImpl(function (xi) { return Math.expm1(xi); });
    var expm1 = unaryKernelFuncFromImpl(tf.Expm1, expm1Impl);
    var expm1Config = {
        kernelName: tf.Expm1,
        backendName: 'cpu',
        kernelFunc: expm1,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var floorImpl = createSimpleUnaryImpl(function (xi) { return Math.floor(xi); });
    var floor = unaryKernelFuncFromImpl(tf.Floor, floorImpl);
    var floorConfig = {
        kernelName: tf.Floor,
        backendName: 'cpu',
        kernelFunc: floor,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var logImpl = createSimpleUnaryImpl(function (xi) { return Math.log(xi); });
    var log = unaryKernelFuncFromImpl(tf.Log, logImpl);
    var logConfig = {
        kernelName: tf.Log,
        backendName: 'cpu',
        kernelFunc: log,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function maxImpl(aVals, reduceSize, outShape, dtype) {
        var vals = tf.util.getTypedArrayFromDType(dtype, tf.util.sizeFromShape(outShape));
        for (var i = 0; i < vals.length; ++i) {
            var offset = i * reduceSize;
            var max = aVals[offset];
            for (var j = 0; j < reduceSize; ++j) {
                var value = aVals[offset + j];
                if (value > max) {
                    max = value;
                }
            }
            vals[i] = max;
        }
        return vals;
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var multiplyImpl = createSimpleBinaryKernelImpl((function (aValue, bValue) { return aValue * bValue; }));
    var multiplyComplexImpl = createComplexBinaryKernelImpl((function (aReal, aImag, bReal, bImag) {
        return {
            real: aReal * bReal - aImag * bImag,
            imag: aReal * bImag + aImag * bReal
        };
    }));
    var multiply = binaryKernelFunc(tf.Multiply, multiplyImpl, multiplyComplexImpl);
    var multiplyConfig = {
        kernelName: tf.Multiply,
        backendName: 'cpu',
        kernelFunc: multiply
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var notEqualImpl = createSimpleBinaryKernelImpl((function (a, b) { return (a !== b) ? 1 : 0; }));
    var notEqual = binaryKernelFunc(tf.NotEqual, notEqualImpl, null /* complexOp */, 'bool');
    var notEqualConfig = {
        kernelName: tf.NotEqual,
        backendName: 'cpu',
        kernelFunc: notEqual
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var rsqrtImpl = createSimpleUnaryImpl(function (xi) { return 1 / Math.sqrt(xi); });
    var rsqrt = unaryKernelFuncFromImpl(tf.Rsqrt, rsqrtImpl);
    var rsqrtConfig = {
        kernelName: tf.Rsqrt,
        backendName: 'cpu',
        kernelFunc: rsqrt,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function sliceImpl(vals, begin, size, shape, dtype) {
        var isContinous = tf.slice_util.isSliceContinous(shape, begin, size);
        var length = tf.util.sizeFromShape(size);
        var xStrides = tf.util.computeStrides(shape);
        if (isContinous) {
            var flatOffset = tf.slice_util.computeFlatOffset(begin, xStrides);
            return vals.subarray(flatOffset, flatOffset + length);
        }
        var outVals = tf.util.getTypedArrayFromDType(dtype, length);
        for (var i = 0; i < length; ++i) {
            var rank = size.length;
            var strides = tf.util.computeStrides(size);
            var loc = tf.util.indexToLoc(i, rank, strides);
            var xLoc = loc.map(function (idx, j) { return idx + begin[j]; });
            var xIndex = tf.util.locToIndex(xLoc, shape.length, xStrides);
            outVals[i] = vals[xIndex];
        }
        return outVals;
    }
    function slice(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        var begin = attrs.begin, size = attrs.size;
        assertNotComplex(x, 'slice');
        var _a = tf.slice_util.parseSliceParams(x, begin, size), $begin = _a[0], $size = _a[1];
        tf.slice_util.assertParamsValid(x, $begin, $size);
        var vals = backend.data.get(x.dataId).values;
        var outVals = sliceImpl(vals, $begin, $size, x.shape, x.dtype);
        return backend.makeTensorInfo($size, x.dtype, outVals);
    }
    var sliceConfig = {
        kernelName: tf.Slice,
        backendName: 'cpu',
        kernelFunc: slice
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var squaredDifferenceImpl = createSimpleBinaryKernelImpl((function (a, b) {
        var diff = a - b;
        return diff * diff;
    }));
    var squaredDifference = binaryKernelFunc(tf.SquaredDifference, squaredDifferenceImpl);
    var squaredDifferenceConfig = {
        kernelName: tf.SquaredDifference,
        backendName: 'cpu',
        kernelFunc: squaredDifference
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var subImpl = createSimpleBinaryKernelImpl((function (aValue, bValue) { return aValue - bValue; }));
    var subComplexImpl = createComplexBinaryKernelImpl((function (aReal, aImag, bReal, bImag) {
        return { real: aReal - bReal, imag: aImag - bImag };
    }));
    var sub = binaryKernelFunc(tf.Sub, subImpl, subComplexImpl);
    var subConfig = {
        kernelName: tf.Sub,
        backendName: 'cpu',
        kernelFunc: sub
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function transposeImpl(xVals, xShape, dtype, perm, newShape) {
        var xRank = xShape.length;
        var xSize = tf.util.sizeFromShape(xShape);
        var xStrides = tf.util.computeStrides(xShape);
        var newStrides = tf.util.computeStrides(newShape);
        var result = tf.util.getTypedArrayFromDType(dtype, tf.util.sizeFromShape(newShape));
        for (var i = 0; i < xSize; ++i) {
            var loc = tf.util.indexToLoc(i, xRank, xStrides);
            // Permute location.
            var newLoc = new Array(loc.length);
            for (var i_1 = 0; i_1 < newLoc.length; i_1++) {
                newLoc[i_1] = loc[perm[i_1]];
            }
            var newIndex = tf.util.locToIndex(newLoc, xRank, newStrides);
            result[newIndex] = xVals[i];
        }
        return result;
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function uniqueImpl(values, axis, shape, dtype) {
        // Normalize and validate axis.
        var $axis = tf.util.parseAxisParam(axis, shape)[0];
        // Calculate the new shape that is suitable for extracting data along the
        // given axis.
        //
        // The rank is 3.
        // The size of the 1st dimension is the size of all the axes < the given axis.
        // The size of the 2nd dimension is the same as the size of the given axis.
        // The size of the 3rd dimension is the size of all the axes > the given axis.
        //
        // For example, for a 4D tensor with shape=[2, 3, 5, 4] and axis=2, the
        // newShape would be: [2*3, 5, 4].
        //
        // Note that this is not the final output shape. This will be the shape for an
        // intermediate TensorBuffer (see inputBuffer below) to allow us to extract
        // values along the given axis. To demonstrate how it works, consider the
        // following example:
        //
        // Input: a 3D tensor, with shape [1, 2, 3]
        // [
        //   [
        //      [1,2,3],
        //      [4,5,6]
        //   ]
        // ]
        // Axis: 2 (the last axis).
        // Along axis 2, we expect to extract 3 tensors: [1,4], [2,5], [3,6].
        //
        // For this example, newShape would be: [2, 3, 1], where 2 is calculated from
        // 1*2. The re-shaped data would look like:
        //
        // [
        //   [
        //     [1], [2], [3]
        //   ],
        //   [
        //     [4], [5], [6]
        //   ]
        // ]
        //
        // Then, we can construct a 3-level nested loop by the following dimension
        // order to extract the values along the axis (dimension1):
        // i: dimension1       // 0,1,2 (newShape[1])
        //   m: dimension0     // 0,1   (newShape[0])
        //     n: dimension2   // 0     (newShape[2])
        //
        //                       m, i, n
        //                      ---------
        // Iteration 0: data at [0, 0, 0] => "1"
        // Iteration 1: data at [1, 0, 0] => "4"
        // We got [1,4].
        // Iteration 2: data at [0, 1, 0] => "2"
        // Iteration 3: data at [1, 1, 0] => "5"
        // We got [2,5].
        // Iteration 4: data at [0, 2, 0] => "3"
        // Iteration 5: data at [1, 2, 0] => "6"
        // We got [3,6].
        var newShape = [1, shape[0], 1];
        for (var i = 0; i < $axis; i++) {
            newShape[0] *= shape[i];
        }
        newShape[1] = shape[$axis];
        for (var i = $axis + 1; i < shape.length; i++) {
            newShape[2] *= shape[i];
        }
        // A map from unique elements (their string representations) to their values
        // in "indices" (below).
        var uniqueElements = {};
        // The indices of each unique element in the original tensor along the given
        // axis. It is 1D and has the same size as the given axis.
        var indices = new Int32Array(shape[$axis]);
        // Create a buffer so we can easily extract value at a given location.
        var inputBuffer = new tf.TensorBuffer(newShape, dtype, values);
        // The indices along the given axis that have unique elements. This is a
        // de-duped version of "indices" above.
        var uniqueIndices = [];
        var is1DTensor = newShape[0] === 1 && newShape[2] === 1;
        for (var i = 0; i < shape[$axis]; i++) {
            // Extract values along the axis.
            var element = void 0;
            if (is1DTensor) {
                // Fast path for 1D tensor input.
                element = values[i].toString();
            }
            else {
                var axisValues = [];
                for (var m = 0; m < newShape[0]; m++) {
                    for (var n = 0; n < newShape[2]; n++) {
                        axisValues.push(inputBuffer.get(m, i, n));
                    }
                }
                element = axisValues.join(',');
            }
            // Dedup and update various indices.
            if (uniqueElements[element] !== undefined) {
                indices[i] = uniqueElements[element];
            }
            else {
                var uniqueIndex = Object.keys(uniqueElements).length;
                uniqueElements[element] = uniqueIndex;
                indices[i] = uniqueIndex;
                uniqueIndices.push(i);
            }
        }
        // Now we know where each of the unique elements are located along the axis
        // (uniqueIndices). Extract them from input buffer and store them in the
        // output buffer.
        var outputTmpShape = newShape.slice();
        outputTmpShape[1] = Object.keys(uniqueElements).length;
        var outputBuffer = new tf.TensorBuffer(outputTmpShape, dtype);
        uniqueIndices.forEach(function (uniqueElementIndex, i) {
            for (var m = 0; m < newShape[0]; m++) {
                for (var n = 0; n < newShape[2]; n++) {
                    outputBuffer.set(inputBuffer.get(m, uniqueElementIndex, n), m, i, n);
                }
            }
        });
        // The output shape can be calculated from the input shape with the size of
        // the given axis replaced by the number of unique elements along that axis.
        var outputShape = shape.slice();
        outputShape[$axis] = outputTmpShape[1];
        return {
            outputValues: outputBuffer.values,
            outputShape: outputShape,
            indices: indices,
        };
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */

    var shared = {
        __proto__: null,
        simpleAbsImpl: simpleAbsImpl,
        addImpl: addImpl,
        ceilImpl: ceilImpl,
        expImpl: expImpl,
        expm1Impl: expm1Impl,
        floorImpl: floorImpl,
        logImpl: logImpl,
        maxImpl: maxImpl,
        multiplyImpl: multiplyImpl,
        notEqualImpl: notEqualImpl,
        rsqrtImpl: rsqrtImpl,
        sliceImpl: sliceImpl,
        squaredDifferenceImpl: squaredDifferenceImpl,
        subImpl: subImpl,
        transposeImpl: transposeImpl,
        uniqueImpl: uniqueImpl
    };

    /** @license See the LICENSE file. */
    // This code is auto-generated, do not modify this file!
    var version = '2.7.0';

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    // Side effects for default initialization of MathBackendCPU
    tf.registerBackend('cpu', function () { return new MathBackendCPU(); }, 1 /* priority */);

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var elu = unaryKernelFunc(tf.Elu, function (xi) { return xi >= 0 ? xi : (Math.exp(xi) - 1); });
    var eluConfig = {
        kernelName: tf.Elu,
        backendName: 'cpu',
        kernelFunc: elu,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var preluImpl = createSimpleBinaryKernelImpl(function (xValue, aValue) { return xValue < 0 ? aValue * xValue : xValue; });
    function prelu(args) {
        var inputs = args.inputs, backend = args.backend;
        var x = inputs.x, alpha = inputs.alpha;
        assertNotComplex([x, alpha], 'prelu');
        var aVals = backend.data.get(x.dataId).values;
        var bVals = backend.data.get(alpha.dataId).values;
        var _a = preluImpl(x.shape, alpha.shape, aVals, bVals, x.dtype), resultData = _a[0], resultShape = _a[1];
        return backend.makeTensorInfo(resultShape, x.dtype, resultData);
    }
    var preluConfig = {
        kernelName: tf.Prelu,
        backendName: 'cpu',
        kernelFunc: prelu,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var relu = unaryKernelFunc(tf.Relu, function (xi) { return Math.max(0, xi); });
    var reluConfig = {
        kernelName: tf.Relu,
        backendName: 'cpu',
        kernelFunc: relu,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var relu6 = unaryKernelFunc(tf.Relu6, function (xi) { return Math.min(Math.max(0, xi), 6); });
    var relu6Config = {
        kernelName: tf.Relu6,
        backendName: 'cpu',
        kernelFunc: relu6,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function applyActivation(backend, x, activation, preluActivationWeights) {
        if (activation === 'linear') {
            return identity({ inputs: { x: x }, backend: backend });
        }
        else if (activation === 'relu') {
            return relu({ inputs: { x: x }, backend: backend });
        }
        else if (activation === 'elu') {
            return elu({ inputs: { x: x }, backend: backend });
        }
        else if (activation === 'relu6') {
            return relu6({ inputs: { x: x }, backend: backend });
        }
        else if (activation === 'prelu') {
            return prelu({ inputs: { x: x, alpha: preluActivationWeights }, backend: backend });
        }
        throw new Error("Activation " + activation + " has not been implemented for the CPU backend.");
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function reshape(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        var shape = attrs.shape;
        var xSize = tf.util.sizeFromShape(x.shape);
        var $shape = tf.util.inferFromImplicitShape(shape, xSize);
        var $xSize = tf.util.sizeFromShape($shape);
        tf.util.assert(xSize === $xSize, function () { return "The new shape (" + $shape + ") has " + $xSize + " elements and the old " +
            ("shape (" + x.shape + ") has " + xSize + " elements. The new shape and old ") +
            "shape must have the same number of elements."; });
        backend.incRef(x.dataId);
        var xData = backend.data.get(x.dataId);
        if (xData.complexTensorInfos != null) {
            var real = xData.complexTensorInfos.real;
            var imag = xData.complexTensorInfos.imag;
            real.shape = $shape;
            imag.shape = $shape;
        }
        return { dataId: x.dataId, shape: $shape, dtype: x.dtype };
    }
    var reshapeConfig = {
        kernelName: tf.Reshape,
        backendName: 'cpu',
        kernelFunc: reshape
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function batchMatMul(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var a = inputs.a, b = inputs.b;
        var transposeA = attrs.transposeA, transposeB = attrs.transposeB;
        assertNotComplex([a, b], 'matMul');
        var aRank = a.shape.length;
        var bRank = b.shape.length;
        var innerShapeA = transposeA ? a.shape[aRank - 2] : a.shape[aRank - 1];
        var innerShapeB = transposeB ? b.shape[bRank - 1] : b.shape[bRank - 2];
        var outerShapeA = transposeA ? a.shape[aRank - 1] : a.shape[aRank - 2];
        var outerShapeB = transposeB ? b.shape[bRank - 2] : b.shape[bRank - 1];
        var outerDimsA = a.shape.slice(0, -2);
        var outerDimsB = b.shape.slice(0, -2);
        var batchDimA = tf.util.sizeFromShape(outerDimsA);
        var batchDimB = tf.util.sizeFromShape(outerDimsB);
        var batchDimsCompatible = batchDimA === batchDimB || batchDimA === 1 || batchDimB === 1;
        tf.util.assert(aRank >= 2 && bRank >= 2 && batchDimsCompatible, function () { return "Error in matMul: the input batch dimensions must either be the " +
            "same or at least one input batch dimension must be 1. Got input " +
            ("batch dimensions of (" + outerDimsA + ") and (" + outerDimsB + ")."); });
        var outShapeOuterDims = batchDimA > batchDimB ? a.shape.slice(0, -2) : b.shape.slice(0, -2);
        var outShape = outShapeOuterDims.concat([outerShapeA, outerShapeB]);
        tf.util.assert(innerShapeA === innerShapeB, function () { return "Error in matMul: inner shapes (" + innerShapeA + ") and (" +
            (innerShapeB + ") of Tensors with shapes " + a.shape + " and ") +
            (b.shape + " and transposeA=" + transposeA) +
            (" and transposeB=" + transposeB + " must match."); });
        var a3dShape = transposeA ? [batchDimA, innerShapeA, outerShapeA] :
            [batchDimA, outerShapeA, innerShapeA];
        var b3dShape = transposeB ? [batchDimB, outerShapeB, innerShapeB] :
            [batchDimB, innerShapeB, outerShapeB];
        // The rest of the implementation is designed to operate on rank-3 tensors
        var a3d = reshape({ inputs: { x: a }, backend: backend, attrs: { shape: a3dShape } });
        var b3d = reshape({ inputs: { x: b }, backend: backend, attrs: { shape: b3dShape } });
        var sharedDim = transposeA ? a3d.shape[1] : a3d.shape[2];
        var leftDim = transposeA ? a3d.shape[2] : a3d.shape[1];
        var rightDim = transposeB ? b3d.shape[1] : b3d.shape[2];
        var batchDim = Math.max(batchDimA, batchDimB);
        var a3dValues = backend.data.get(a3d.dataId).values;
        var b3dValues = backend.data.get(b3d.dataId).values;
        var a3dStrides = tf.util.computeStrides(a3d.shape);
        var b3dStrides = tf.util.computeStrides(b3d.shape);
        var _a = transposeA ?
            [a3dStrides[0], 1, a3dStrides[1]] :
            [a3dStrides[0], a3dStrides[1], 1], aBatch = _a[0], aOuterStep = _a[1], aInnerStep = _a[2];
        var _b = transposeB ?
            [1, b3dStrides[1], b3dStrides[0]] :
            [b3dStrides[1], 1, b3dStrides[0]], bInnerStep = _b[0], bOuterStep = _b[1], bBatch = _b[2];
        var size = leftDim * rightDim;
        var result = tf.buffer([batchDim, leftDim, rightDim], a3d.dtype);
        var resVals = result.values;
        var blockSize = backend.blockSize;
        for (var bi = 0; bi < batchDim; bi++) {
            for (var i0 = 0; i0 < leftDim; i0 += blockSize) {
                for (var j0 = 0; j0 < rightDim; j0 += blockSize) {
                    for (var k0 = 0; k0 < sharedDim; k0 += blockSize) {
                        // for when blockSize doesn't evenly divide the input
                        var iBlock = Math.min(i0 + blockSize, leftDim);
                        var jBlock = Math.min(j0 + blockSize, rightDim);
                        var kBlock = Math.min(k0 + blockSize, sharedDim);
                        for (var i = i0; i < iBlock; i++) {
                            for (var j = j0; j < jBlock; j++) {
                                var sum = 0.0;
                                for (var k = k0; k < kBlock; k++) {
                                    var batchOffsetA = Math.min(bi, batchDimA - 1) * aBatch;
                                    var batchOffsetB = Math.min(bi, batchDimB - 1) * bBatch;
                                    var aVal = a3dValues[batchOffsetA + i * aOuterStep + k * aInnerStep];
                                    var bVal = b3dValues[k * bInnerStep + j * bOuterStep + batchOffsetB];
                                    sum += aVal * bVal;
                                }
                                resVals[bi * size + (i * rightDim + j)] += sum;
                            }
                        }
                    }
                }
            }
        }
        backend.disposeIntermediateTensorInfo(a3d);
        backend.disposeIntermediateTensorInfo(b3d);
        // set correct shape on output.
        return backend.makeTensorInfo(outShape, result.dtype, result.values);
    }
    var batchMatMulConfig = {
        kernelName: tf.BatchMatMul,
        backendName: 'cpu',
        kernelFunc: batchMatMul,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function _fusedMatMul(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var a = inputs.a, b = inputs.b, bias = inputs.bias, preluActivationWeights = inputs.preluActivationWeights;
        var transposeA = attrs.transposeA, transposeB = attrs.transposeB, activation = attrs.activation;
        var current;
        var addRes;
        var activationRes;
        var intermediates = [];
        var matMulRes = batchMatMul({ inputs: { a: a, b: b }, attrs: { transposeA: transposeA, transposeB: transposeB }, backend: backend });
        current = matMulRes;
        if (bias) {
            addRes = add({ inputs: { a: current, b: bias }, backend: backend });
            intermediates.push(current);
            current = addRes;
        }
        if (activation) {
            activationRes =
                applyActivation(backend, current, activation, preluActivationWeights);
            intermediates.push(current);
            current = activationRes;
        }
        for (var _i = 0, intermediates_1 = intermediates; _i < intermediates_1.length; _i++) {
            var i = intermediates_1[_i];
            backend.disposeIntermediateTensorInfo(i);
        }
        return current;
    }
    var _fusedMatMulConfig = {
        kernelName: tf._FusedMatMul,
        backendName: 'cpu',
        kernelFunc: _fusedMatMul,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var acos = unaryKernelFunc(tf.Acos, function (xi) { return Math.acos(xi); });
    var acosConfig = {
        kernelName: tf.Acos,
        backendName: 'cpu',
        kernelFunc: acos,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var acosh = unaryKernelFunc(tf.Acosh, function (xi) { return Math.acosh(xi); });
    var acoshConfig = {
        kernelName: tf.Acosh,
        backendName: 'cpu',
        kernelFunc: acosh,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var asin = unaryKernelFunc(tf.Asin, function (xi) { return Math.asin(xi); });
    var asinConfig = {
        kernelName: tf.Asin,
        backendName: 'cpu',
        kernelFunc: asin,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var asinh = unaryKernelFunc(tf.Asinh, function (xi) { return Math.asinh(xi); });
    var asinhConfig = {
        kernelName: tf.Asinh,
        backendName: 'cpu',
        kernelFunc: asinh,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var atan = unaryKernelFunc(tf.Atan, function (xi) { return Math.atan(xi); });
    var atanConfig = {
        kernelName: tf.Atan,
        backendName: 'cpu',
        kernelFunc: atan,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var atanh = unaryKernelFunc(tf.Atanh, function (xi) { return Math.atanh(xi); });
    var atanhConfig = {
        kernelName: tf.Atanh,
        backendName: 'cpu',
        kernelFunc: atanh,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function pool(xValues, xShape, dtype, strides, convInfo, poolType) {
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var initialValue = (poolType === 'max' ? Number.NEGATIVE_INFINITY :
            Number.POSITIVE_INFINITY);
        var output = tf.buffer(convInfo.outShape, dtype);
        var outputVals = output.values;
        var outputBatchStrides = convInfo.outShape[1] * convInfo.outShape[2] * convInfo.outShape[3];
        var outputRowStrides = convInfo.outShape[2] * convInfo.outShape[3];
        var outputColStrides = convInfo.outShape[3];
        for (var b = 0; b < convInfo.batchSize; ++b) {
            var outputBatchOffset = b * outputBatchStrides;
            var inputBatchOffset = b * strides[0];
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                    var xRCorner = yR * strideHeight - padTop;
                    var xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRCorner);
                    var outputRowOffset = outputBatchOffset + yR * outputRowStrides;
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var xCCorner = yC * strideWidth - padLeft;
                        var xCMin = Math.max(0, xCCorner);
                        var xCMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xCCorner);
                        var minMaxValue = initialValue;
                        var avgValue = 0;
                        var count = 0;
                        for (var xR = xRMin; xR < xRMax; xR += dilationHeight) {
                            var xROffset = inputBatchOffset + xR * strides[1];
                            for (var xC = xCMin; xC < xCMax; xC += dilationWidth) {
                                var xCOffset = xROffset + xC * strides[2];
                                var pixel = xValues[xCOffset + d];
                                if ((poolType === 'max' && pixel > minMaxValue)) {
                                    minMaxValue = pixel;
                                }
                                else if (poolType === 'avg') {
                                    avgValue += pixel;
                                    count++;
                                }
                            }
                            if (isNaN(minMaxValue)) {
                                break;
                            }
                        }
                        var outputOffset = outputRowOffset + yC * outputColStrides + d;
                        outputVals[outputOffset] =
                            poolType === 'avg' ? avgValue / count : minMaxValue;
                    }
                }
            }
        }
        return output;
    }
    function maxPoolPositions(xValues, xShape, dtype, convInfo, flattenPositions, includeBatchInIndex) {
        if (flattenPositions === void 0) { flattenPositions = false; }
        if (includeBatchInIndex === void 0) { includeBatchInIndex = false; }
        var maxPositions = tf.buffer(convInfo.outShape, 'int32');
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var xBuf = tf.buffer(xShape, dtype, xValues);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                    var xRCorner = yR * strideHeight - padTop;
                    var xRMin = xRCorner;
                    while (xRMin < 0) {
                        xRMin += dilationHeight;
                    }
                    // const xRMin = Math.max(0, xRCorner);
                    var xRMax = Math.min(convInfo.inHeight, effectiveFilterHeight + xRCorner);
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var xCCorner = yC * strideWidth - padLeft;
                        var xCMin = xCCorner;
                        while (xCMin < 0) {
                            xCMin += dilationWidth;
                        }
                        var xCMax = Math.min(convInfo.inWidth, effectiveFilterWidth + xCCorner);
                        var maxValue = Number.NEGATIVE_INFINITY;
                        var maxPosition = -1;
                        for (var xR = xRMin; xR < xRMax; xR += dilationHeight) {
                            var wR = xR - xRCorner;
                            for (var xC = xCMin; xC < xCMax; xC += dilationWidth) {
                                var wC = xC - xCCorner;
                                var pixel = xBuf.get(b, xR, xC, d);
                                if (pixel > maxValue) {
                                    maxValue = pixel;
                                    if (flattenPositions) {
                                        maxPosition = includeBatchInIndex ?
                                            ((b * convInfo.inHeight + xR) * convInfo.inWidth + xC) *
                                                convInfo.inChannels +
                                                d :
                                            (xR * convInfo.inWidth + xC) * convInfo.inChannels + d;
                                    }
                                    else {
                                        maxPosition = wR * effectiveFilterWidth + wC;
                                    }
                                }
                            }
                        }
                        maxPositions.set(maxPosition, b, yR, yC, d);
                    }
                }
            }
        }
        return maxPositions;
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function avgPool(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        assertNotComplex(x, 'avgPool');
        var filterSize = attrs.filterSize, strides = attrs.strides, pad = attrs.pad, dimRoundingMode = attrs.dimRoundingMode;
        var dilations = 1;
        tf.util.assert(tf.backend_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in avgPool: Either strides or dilations must be 1. ' +
            ("Got strides " + strides + " and dilations '" + dilations + "'"); });
        var convInfo = tf.backend_util.computePool2DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode);
        var res;
        if (convInfo.filterWidth === 1 && convInfo.filterHeight === 1 &&
            tf.util.arraysEqual(convInfo.inShape, convInfo.outShape)) {
            res = identity({ inputs: { x: x }, backend: backend });
        }
        else {
            var xValues = backend.data.get(x.dataId).values;
            var strides_1 = tf.util.computeStrides(x.shape);
            var buffer = pool(xValues, x.shape, x.dtype, strides_1, convInfo, 'avg');
            res = backend.makeTensorInfo(convInfo.outShape, x.dtype, buffer.values);
        }
        return res;
    }
    var avgPoolConfig = {
        kernelName: tf.AvgPool,
        backendName: 'cpu',
        kernelFunc: avgPool
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function avgPoolBackprop(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var dy = inputs.dy, input = inputs.input;
        var x = input;
        assertNotComplex([dy, input], 'avgPoolBackprop');
        var filterSize = attrs.filterSize, strides = attrs.strides, pad = attrs.pad;
        var convInfo = tf.backend_util.computePool2DInfo(x.shape, filterSize, strides, 1 /* dilations */, pad);
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
        var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
        var dx = tf.buffer(x.shape, 'float32');
        var avgMultiplier = 1 / (filterHeight * filterWidth);
        var dyData = backend.data.get(dy.dataId).values;
        var dyBuf = tf.buffer(dy.shape, 'float32', dyData);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var dxR = 0; dxR < convInfo.inHeight; ++dxR) {
                    for (var dxC = 0; dxC < convInfo.inWidth; ++dxC) {
                        // Shader code begins.
                        var dyRCorner = dxR - padTop;
                        var dyCCorner = dxC - padLeft;
                        var dotProd = 0;
                        for (var wR = 0; wR < effectiveFilterHeight; wR += dilationHeight) {
                            var dyR = (dyRCorner + wR) / strideHeight;
                            if (dyR < 0 || dyR >= convInfo.outHeight ||
                                Math.floor(dyR) !== dyR) {
                                continue;
                            }
                            for (var wC = 0; wC < effectiveFilterWidth; wC += dilationWidth) {
                                var dyC = (dyCCorner + wC) / strideWidth;
                                if (dyC < 0 || dyC >= convInfo.outWidth ||
                                    Math.floor(dyC) !== dyC) {
                                    continue;
                                }
                                var pixel = dyBuf.get(b, dyR, dyC, d);
                                dotProd += pixel;
                            }
                        }
                        dx.set(dotProd * avgMultiplier, b, dxR, dxC, d);
                    }
                }
            }
        }
        return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
    }
    var avgPoolBackpropConfig = {
        kernelName: tf.AvgPoolBackprop,
        backendName: 'cpu',
        kernelFunc: avgPoolBackprop
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function batchNorm(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, scale = inputs.scale, offset = inputs.offset, mean = inputs.mean, variance = inputs.variance;
        tf.util.assert(mean.shape.length === variance.shape.length, function () { return 'Batch normalization gradient requires mean and variance to have ' +
            'equal ranks.'; });
        tf.util.assert(offset == null || mean.shape.length === offset.shape.length, function () { return 'Batch normalization gradient requires mean and offset to have ' +
            'equal ranks.'; });
        tf.util.assert(scale == null || mean.shape.length === scale.shape.length, function () { return 'Batch normalization gradient requires mean and scale to have ' +
            'equal ranks.'; });
        assertNotComplex([x, mean, variance, scale, offset], 'batchNorm');
        var varianceEpsilon = attrs.varianceEpsilon;
        if (varianceEpsilon == null) {
            varianceEpsilon = 0.001;
        }
        var xVals = backend.data.get(x.dataId).values;
        var mVals = backend.data.get(mean.dataId).values;
        var varVals = backend.data.get(variance.dataId).values;
        var sVals = scale ? backend.data.get(scale.dataId).values :
            new Float32Array([1]);
        var offVals = offset ?
            backend.data.get(offset.dataId).values :
            new Float32Array([0]);
        var outVals = new Float32Array(xVals.length);
        var offValsLength = offVals.length;
        var sValsLength = sVals.length;
        var varValsLength = varVals.length;
        var mValsLength = mVals.length;
        var offi = 0;
        var mi = 0;
        var si = 0;
        var vi = 0;
        for (var i = 0; i < xVals.length; ++i) {
            outVals[i] = offVals[offi++] +
                (xVals[i] - mVals[mi++]) * sVals[si++] /
                    Math.sqrt(varVals[vi++] + varianceEpsilon);
            if (offi >= offValsLength) {
                offi = 0;
            }
            if (mi >= mValsLength) {
                mi = 0;
            }
            if (si >= sValsLength) {
                si = 0;
            }
            if (vi >= varValsLength) {
                vi = 0;
            }
        }
        return backend.makeTensorInfo(x.shape, x.dtype, outVals);
    }
    var batchNormConfig = {
        kernelName: tf.FusedBatchNorm,
        backendName: 'cpu',
        kernelFunc: batchNorm,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var clip = unaryKernelFunc(tf.ClipByValue, function (xi, attrs) {
        var clipAttrs = attrs;
        if (xi > clipAttrs.clipValueMax) {
            return clipAttrs.clipValueMax;
        }
        return xi < clipAttrs.clipValueMin ? clipAttrs.clipValueMin : xi;
    });
    var clipConfig = {
        kernelName: tf.ClipByValue,
        backendName: 'cpu',
        kernelFunc: clip,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function imag(args) {
        var inputs = args.inputs, backend = args.backend;
        var input = inputs.input;
        var imag = backend.data.get(input.dataId).complexTensorInfos.imag;
        var imagVal = backend.data.get(imag.dataId).values;
        // When complex tensor is disposed, its underlying parts will be disposed too.
        // Make new tensor out of the imag value of the complex. This makes sure the
        // value is still accessible even if complex tensor is disposed.
        return backend.makeTensorInfo(imag.shape, imag.dtype, imagVal);
    }
    var imagConfig = {
        kernelName: tf.Imag,
        backendName: 'cpu',
        kernelFunc: imag
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function concat(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var axis = attrs.axis;
        var $axis = tf.util.parseAxisParam(axis, inputs[0].shape)[0];
        var outShape = tf.backend_util.computeOutShape(inputs.map(function (t) { return t.shape; }), $axis);
        if (tf.util.sizeFromShape(outShape) === 0) {
            return backend.makeTensorInfo(outShape, inputs[0].dtype, []);
        }
        // Keep only non-empty tensors (ignore tensors with 0 in their shape).
        var $inputs = inputs.filter(function (t) { return tf.util.sizeFromShape(t.shape) > 0; });
        if ($inputs.length === 1) {
            return $inputs[0];
        }
        var shapes = $inputs.map(function (t) { return t.shape; });
        tf.backend_util.assertParamsConsistent(shapes, $axis);
        if ($inputs[0].dtype === 'complex64') {
            var reals = $inputs.map(function (t) { return real({ inputs: { input: t }, backend: backend }); });
            var imags = $inputs.map(function (t) { return imag({ inputs: { input: t }, backend: backend }); });
            var realConcated = concat({ inputs: reals, backend: backend, attrs: { axis: $axis } });
            var imagConcated = concat({ inputs: imags, backend: backend, attrs: { axis: $axis } });
            var result = complex({ inputs: { real: realConcated, imag: imagConcated }, backend: backend });
            reals.forEach(function (r) { return backend.disposeIntermediateTensorInfo(r); });
            imags.forEach(function (i) { return backend.disposeIntermediateTensorInfo(i); });
            backend.disposeIntermediateTensorInfo(realConcated);
            backend.disposeIntermediateTensorInfo(imagConcated);
            return result;
        }
        // Any concat of n-dimensional tensors across any axis can be reduced to
        // a concatenation of two-dimensional tensors across the axis 1 by first
        // partitioning the axes of the original tensors into those less than the
        // axis to be concatenated and the rest. Then reshape the tensors
        // into a two-dimensional tensor by collapsing these two sets of axes and
        // concatenate the resulting matrices across the axis 1, finally reshaping
        // the result to have the proper shape.
        var inputs2D = $inputs.map(function (t) {
            var innerSize = tf.util.sizeFromShape(t.shape.slice($axis));
            var shape = [-1, innerSize];
            return reshape({ inputs: { x: t }, backend: backend, attrs: { shape: shape } });
        });
        // Concats 2d tensors along axis=1.
        outShape =
            tf.backend_util.computeOutShape(inputs2D.map(function (t) { return t.shape; }), 1 /* axis */);
        var outVals = tf.util.getTypedArrayFromDType($inputs[0].dtype, tf.util.sizeFromShape(outShape));
        if (inputs2D[0].shape[0] === 1) {
            // Use built-in TypedArray.set() method for speed.
            var offset_1 = 0;
            inputs2D.forEach(function (t) {
                var val = backend.data.get(t.dataId).values;
                var size = tf.util.sizeFromShape(t.shape);
                outVals.set(val, offset_1);
                offset_1 += size;
            });
        }
        else {
            var colOffset_1 = 0;
            inputs2D.forEach(function (t) {
                var tVals = backend.data.get(t.dataId).values;
                var tIdx = 0;
                for (var row = 0; row < t.shape[0]; ++row) {
                    var resIdx = row * outShape[1] + colOffset_1;
                    for (var col = 0; col < t.shape[1]; ++col) {
                        outVals[resIdx + col] = tVals[tIdx++];
                    }
                }
                colOffset_1 += t.shape[1];
            });
        }
        var finalOutShape = tf.backend_util.computeOutShape($inputs.map(function (t) { return t.shape; }), $axis);
        var outInfo = backend.makeTensorInfo(finalOutShape, inputs[0].dtype, outVals);
        inputs2D.forEach(function (t) { return backend.disposeIntermediateTensorInfo(t); });
        return outInfo;
    }
    var concatConfig = {
        kernelName: tf.Concat,
        backendName: 'cpu',
        kernelFunc: concat
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function conv2D(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, filter = inputs.filter;
        var strides = attrs.strides, pad = attrs.pad, dataFormat = attrs.dataFormat, dilations = attrs.dilations, dimRoundingMode = attrs.dimRoundingMode;
        assertNotComplex([x, filter], 'conv2d');
        var $dataFormat = tf.backend_util.convertConv2DDataFormat(dataFormat);
        var convInfo = tf.backend_util.computeConv2DInfo(x.shape, filter.shape, strides, dilations, pad, dimRoundingMode, false /* depthwise */, $dataFormat);
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var padLeft = convInfo.padInfo.left;
        var padTop = convInfo.padInfo.top;
        var isChannelsLast = convInfo.dataFormat === 'channelsLast';
        var y = new tf.TensorBuffer(convInfo.outShape, x.dtype);
        var xStrides = tf.util.computeStrides(x.shape);
        var filterStrides = tf.util.computeStrides(filter.shape);
        var xBatchStride = xStrides[0];
        var xRowStride = isChannelsLast ? xStrides[1] : xStrides[2];
        var xColStride = isChannelsLast ? xStrides[2] : 1;
        var xChannelStride = isChannelsLast ? 1 : xStrides[1];
        var yBatchStride = y.strides[0];
        var yRowStride = isChannelsLast ? y.strides[1] : y.strides[2];
        var yColStride = isChannelsLast ? y.strides[2] : 1;
        var yChannelStride = isChannelsLast ? 1 : y.strides[1];
        var xVals = backend.data.get(x.dataId).values;
        var wVals = backend.data.get(filter.dataId).values;
        var yVals = y.values;
        for (var b = 0; b < convInfo.batchSize; ++b) {
            var xOffset1 = b * xBatchStride;
            var yOffset1 = b * yBatchStride;
            for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                var yOffset2 = yOffset1 + yR * yRowStride;
                var xRCorner = yR * convInfo.strideHeight - padTop;
                for (var wR = 0; wR < filterHeight; ++wR) {
                    var xR = xRCorner + wR * dilationHeight;
                    if (xR < 0 || xR >= convInfo.inHeight) {
                        continue;
                    }
                    var wOffset1 = wR * filterStrides[0];
                    var xOffset2 = xOffset1 + xR * xRowStride;
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var yOffset3 = yOffset2 + yC * yColStride;
                        var xCCorner = yC * convInfo.strideWidth - padLeft;
                        for (var wC = 0; wC < filterWidth; ++wC) {
                            var xC = xCCorner + wC * dilationWidth;
                            if (xC < 0 || xC >= convInfo.inWidth) {
                                continue;
                            }
                            var wOffset2 = wOffset1 + wC * filterStrides[1];
                            var xOffset3 = xOffset2 + xC * xColStride;
                            var wOffset3 = wOffset2;
                            for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                                var xVal = xVals[xOffset3 + d1 * xChannelStride];
                                for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                                    yVals[yOffset3 + d2 * yChannelStride] +=
                                        xVal * wVals[wOffset3 + d2];
                                }
                                wOffset3 += convInfo.outChannels;
                            }
                        }
                    }
                }
            }
        }
        return backend.makeTensorInfo(y.shape, y.dtype, yVals);
    }
    var conv2DConfig = {
        kernelName: tf.Conv2D,
        backendName: 'cpu',
        kernelFunc: conv2D
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function conv2DBackpropFilter(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, dy = inputs.dy;
        var strides = attrs.strides, pad = attrs.pad, dataFormat = attrs.dataFormat, dimRoundingMode = attrs.dimRoundingMode, filterShape = attrs.filterShape;
        assertNotComplex([x, dy], 'conv2dBackpropFilter');
        var $dataFormat = tf.backend_util.convertConv2DDataFormat(dataFormat);
        var convInfo = tf.backend_util.computeConv2DInfo(x.shape, filterShape, strides, 1 /* dilations */, pad, dimRoundingMode, false /* depthwise */, $dataFormat);
        var strideHeight = convInfo.strideHeight, strideWidth = convInfo.strideWidth, filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth;
        var isChannelsLast = convInfo.dataFormat === 'channelsLast';
        var dW = new tf.TensorBuffer(convInfo.filterShape, 'float32');
        var leftPad = convInfo.padInfo.left;
        var topPad = convInfo.padInfo.top;
        var xVals = backend.data.get(x.dataId).values;
        var dyVals = backend.data.get(dy.dataId).values;
        var xBuf = new tf.TensorBuffer(x.shape, x.dtype, xVals);
        var dyBuf = new tf.TensorBuffer(dy.shape, dy.dtype, dyVals);
        for (var wR = 0; wR < filterHeight; ++wR) {
            var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
            var yRMax = Math.min(convInfo.outHeight, (convInfo.inHeight + topPad - wR) / strideHeight);
            for (var wC = 0; wC < filterWidth; ++wC) {
                var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
                var yCMax = Math.min(convInfo.outWidth, (convInfo.inWidth + leftPad - wC) / strideWidth);
                for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                    for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                        var dotProd = 0;
                        for (var b = 0; b < convInfo.batchSize; ++b) {
                            for (var yR = yRMin; yR < yRMax; ++yR) {
                                var xR = wR + yR * strideHeight - topPad;
                                for (var yC = yCMin; yC < yCMax; ++yC) {
                                    var xC = wC + yC * strideWidth - leftPad;
                                    if (isChannelsLast) {
                                        dotProd += xBuf.get(b, xR, xC, d1) *
                                            dyBuf.get(b, yR, yC, d2);
                                    }
                                    else {
                                        dotProd += xBuf.get(b, d1, xR, xC) *
                                            dyBuf.get(b, d2, yR, yC);
                                    }
                                }
                            }
                        }
                        dW.set(dotProd, wR, wC, d1, d2);
                    }
                }
            }
        }
        return backend.makeTensorInfo(dW.shape, dW.dtype, dW.values);
    }
    var conv2DBackpropFilterConfig = {
        kernelName: tf.Conv2DBackpropFilter,
        backendName: 'cpu',
        kernelFunc: conv2DBackpropFilter
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function conv2DBackpropInput(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var dy = inputs.dy, filter = inputs.filter;
        var inputShape = attrs.inputShape, strides = attrs.strides, pad = attrs.pad, dataFormat = attrs.dataFormat, dimRoundingMode = attrs.dimRoundingMode;
        assertNotComplex([dy, filter], 'conv2dBackpropInput');
        var filterStrides = tf.util.computeStrides(filter.shape);
        var dyStrides = tf.util.computeStrides(dy.shape);
        var $dataFormat = tf.backend_util.convertConv2DDataFormat(dataFormat);
        var convInfo = tf.backend_util.computeConv2DInfo(inputShape, filter.shape, strides, 1 /* dilations */, pad, dimRoundingMode, false, $dataFormat);
        var dx = new tf.TensorBuffer(convInfo.inShape, 'float32');
        var dxValues = dx.values;
        var dyValues = backend.data.get(dy.dataId).values;
        var fltValues = backend.data.get(filter.dataId).values;
        var fltS0 = filterStrides[0], fltS1 = filterStrides[1], fltS2 = filterStrides[2];
        var batchSize = convInfo.batchSize, filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth, inChannels = convInfo.inChannels, inHeight = convInfo.inHeight, inWidth = convInfo.inWidth, outChannels = convInfo.outChannels, outHeight = convInfo.outHeight, outWidth = convInfo.outWidth, strideHeight = convInfo.strideHeight, strideWidth = convInfo.strideWidth;
        $dataFormat = convInfo.dataFormat;
        var topPad = filterHeight - 1 - convInfo.padInfo.top;
        var leftPad = filterWidth - 1 - convInfo.padInfo.left;
        var isChannelsLast = $dataFormat === 'channelsLast';
        var xBatchStride = dx.strides[0];
        var xRowStride = isChannelsLast ? dx.strides[1] : dx.strides[2];
        var xColStride = isChannelsLast ? dx.strides[2] : 1;
        var xChannelStride = isChannelsLast ? 1 : dx.strides[1];
        var yBatchStride = dyStrides[0];
        var yRowStride = isChannelsLast ? dyStrides[1] : dyStrides[2];
        var yColStride = isChannelsLast ? dyStrides[2] : 1;
        var yChannelStride = isChannelsLast ? 1 : dyStrides[1];
        for (var b = 0; b < batchSize; ++b) {
            for (var d1 = 0; d1 < inChannels; ++d1) {
                for (var xR = 0; xR < inHeight; ++xR) {
                    var xRCorner = xR - topPad;
                    var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
                    var yRMax = Math.min(outHeight, (filterHeight + xRCorner) / strideHeight);
                    for (var xC = 0; xC < inWidth; ++xC) {
                        var xCCorner = xC - leftPad;
                        var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
                        var yCMax = Math.min(outWidth, (filterWidth + xCCorner) / strideWidth);
                        var dotProd = 0;
                        for (var yR = xRMin; yR < yRMax; ++yR) {
                            var wR = yR * strideHeight - xRCorner;
                            for (var yC = xCMin; yC < yCMax; ++yC) {
                                var wC = yC * strideWidth - xCCorner;
                                var dyOffset = yBatchStride * b + yRowStride * yR + yColStride * yC;
                                var fltOffset = fltS0 * (filterHeight - 1 - wR) +
                                    fltS1 * (filterWidth - 1 - wC) + fltS2 * d1;
                                for (var d2 = 0; d2 < outChannels; ++d2) {
                                    var pixel = dyValues[dyOffset + yChannelStride * d2];
                                    var weight = fltValues[fltOffset + d2];
                                    dotProd += pixel * weight;
                                }
                            }
                        }
                        var dxOffset = xBatchStride * b + xRowStride * xR +
                            xColStride * xC + xChannelStride * d1;
                        dxValues[dxOffset] = dotProd;
                    }
                }
            }
        }
        return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
    }
    var conv2DBackpropInputConfig = {
        kernelName: tf.Conv2DBackpropInput,
        backendName: 'cpu',
        kernelFunc: conv2DBackpropInput
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function conv3D(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, filter = inputs.filter;
        var strides = attrs.strides, pad = attrs.pad, dilations = attrs.dilations;
        assertNotComplex([x, filter], 'conv3d');
        var convInfo = tf.backend_util.computeConv3DInfo(x.shape, filter.shape, strides, dilations, pad);
        var filterDepth = convInfo.filterDepth, filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth, dilationDepth = convInfo.dilationDepth, dilationHeight = convInfo.dilationHeight, dilationWidth = convInfo.dilationWidth, padInfo = convInfo.padInfo;
        var padFront = padInfo.front;
        var padLeft = padInfo.left;
        var padTop = padInfo.top;
        var y = new tf.TensorBuffer(convInfo.outShape, x.dtype);
        var xVals = backend.data.get(x.dataId).values;
        var wVals = backend.data.get(filter.dataId).values;
        var yVals = y.values;
        var xStrides = tf.util.computeStrides(x.shape);
        var filterStrides = tf.util.computeStrides(filter.shape);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            var xOffset1 = b * xStrides[0];
            var yOffset1 = b * y.strides[0];
            for (var yF = 0; yF < convInfo.outDepth; ++yF) {
                var yOffset2 = yOffset1 + yF * y.strides[1];
                var xFCorner = yF * convInfo.strideDepth - padFront;
                for (var wF = 0; wF < filterDepth; ++wF) {
                    var xF = xFCorner + wF * dilationDepth;
                    if (xF < 0 || xF >= convInfo.inDepth) {
                        continue;
                    }
                    var wOffset1 = wF * filterStrides[0];
                    var xOffset2 = xOffset1 + xF * xStrides[1];
                    for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                        var yOffset3 = yOffset2 + yR * y.strides[2];
                        var xRCorner = yR * convInfo.strideHeight - padTop;
                        for (var wR = 0; wR < filterHeight; ++wR) {
                            var xR = xRCorner + wR * dilationHeight;
                            if (xR < 0 || xR >= convInfo.inHeight) {
                                continue;
                            }
                            var wOffset2 = wOffset1 + wR * filterStrides[1];
                            var xOffset3 = xOffset2 + xR * xStrides[2];
                            for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                                var yOffset4 = yOffset3 + yC * convInfo.outChannels;
                                var xCCorner = yC * convInfo.strideWidth - padLeft;
                                for (var wC = 0; wC < filterWidth; ++wC) {
                                    var xC = xCCorner + wC * dilationWidth;
                                    if (xC < 0 || xC >= convInfo.inWidth) {
                                        continue;
                                    }
                                    var wOffset3 = wOffset2 + wC * filterStrides[2];
                                    var xOffset4 = xOffset3 + xC * convInfo.inChannels;
                                    var wOffset4 = wOffset3;
                                    for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                                        var xVal = xVals[xOffset4 + d1];
                                        for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                                            yVals[yOffset4 + d2] += xVal * wVals[wOffset4 + d2];
                                        }
                                        wOffset4 += convInfo.outChannels;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return backend.makeTensorInfo(y.shape, y.dtype, y.values);
    }
    var conv3DConfig = {
        kernelName: tf.Conv3D,
        backendName: 'cpu',
        kernelFunc: conv3D
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function conv3DBackpropFilterV2(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, dy = inputs.dy;
        var strides = attrs.strides, pad = attrs.pad, filterShape = attrs.filterShape;
        assertNotComplex([x, dy], 'conv3dBackpropFilterV2');
        var xStrides = tf.util.computeStrides(x.shape);
        var dyStrides = tf.util.computeStrides(dy.shape);
        var convInfo = tf.backend_util.computeConv3DInfo(x.shape, filterShape, strides, 1 /* dilations */, pad);
        var strideDepth = convInfo.strideDepth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var filterDepth = convInfo.filterDepth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var dw = new tf.TensorBuffer(convInfo.filterShape, 'float32');
        var dwValues = dw.values;
        var _a = dw.strides, dwS0 = _a[0], dwS1 = _a[1], dwS2 = _a[2], dwS3 = _a[3];
        var dyValues = backend.data.get(dy.dataId).values;
        var dyS0 = dyStrides[0], dyS1 = dyStrides[1], dyS2 = dyStrides[2], dyS3 = dyStrides[3];
        var xValues = backend.data.get(x.dataId).values;
        var xS0 = xStrides[0], xS1 = xStrides[1], xS2 = xStrides[2], xS3 = xStrides[3];
        var frontPad = convInfo.padInfo.front;
        var leftPad = convInfo.padInfo.left;
        var topPad = convInfo.padInfo.top;
        for (var wF = 0; wF < filterDepth; ++wF) {
            var yFMin = Math.max(0, Math.ceil((frontPad - wF) / strideDepth));
            var yFMax = Math.min(convInfo.outDepth, (convInfo.inDepth + frontPad - wF) / strideDepth);
            var wOffset1 = wF * dwS0;
            for (var wR = 0; wR < filterHeight; ++wR) {
                var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
                var yRMax = Math.min(convInfo.outHeight, (convInfo.inHeight + topPad - wR) / strideHeight);
                var wOffset2 = wR * dwS1 + wOffset1;
                for (var wC = 0; wC < filterWidth; ++wC) {
                    var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
                    var yCMax = Math.min(convInfo.outWidth, (convInfo.inWidth + leftPad - wC) / strideWidth);
                    var wOffset3 = wC * dwS2 + wOffset2;
                    for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                        var wOffset4 = d1 * dwS3 + wOffset3;
                        for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                            var dotProd = 0;
                            for (var b = 0; b < convInfo.batchSize; ++b) {
                                var xOffset1 = b * xS0;
                                var yOffset1 = b * dyS0;
                                for (var yF = yFMin; yF < yFMax; ++yF) {
                                    var xF = wF + yF * strideDepth - frontPad;
                                    var xOffset2 = xF * xS1 + xOffset1;
                                    var yOffset2 = yF * dyS1 + yOffset1;
                                    for (var yR = yRMin; yR < yRMax; ++yR) {
                                        var xR = wR + yR * strideHeight - topPad;
                                        var xOffset3 = xR * xS2 + xOffset2;
                                        var yOffset3 = yR * dyS2 + yOffset2;
                                        for (var yC = yCMin; yC < yCMax; ++yC) {
                                            var xC = wC + yC * strideWidth - leftPad;
                                            var xOffset4 = xC * xS3 + xOffset3;
                                            var yOffset4 = yC * dyS3 + yOffset3;
                                            dotProd += xValues[xOffset4 + d1] * dyValues[yOffset4 + d2];
                                        }
                                    }
                                }
                            }
                            dwValues[wOffset4 + d2] = dotProd;
                        }
                    }
                }
            }
        }
        return backend.makeTensorInfo(dw.shape, dw.dtype, dw.values);
    }
    var conv3DBackpropFilterV2Config = {
        kernelName: tf.Conv3DBackpropFilterV2,
        backendName: 'cpu',
        kernelFunc: conv3DBackpropFilterV2
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function conv3DBackpropInputV2(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var dy = inputs.dy, filter = inputs.filter;
        var pad = attrs.pad, strides = attrs.strides, inputShape = attrs.inputShape;
        assertNotComplex([dy], 'conv3dBackpropInputV2');
        var dyStrides = tf.util.computeStrides(dy.shape);
        var filterStrides = tf.util.computeStrides(filter.shape);
        var convInfo = tf.backend_util.computeConv3DInfo(inputShape, filter.shape, strides, 1 /* dilations */, pad);
        var dx = new tf.TensorBuffer(convInfo.inShape, 'float32');
        var dxValues = dx.values;
        var _a = dx.strides, dxS0 = _a[0], dxS1 = _a[1], dxS2 = _a[2], dxS3 = _a[3];
        var dyValues = backend.data.get(dy.dataId).values;
        var dyS0 = dyStrides[0], dyS1 = dyStrides[1], dyS2 = dyStrides[2], dyS3 = dyStrides[3];
        var fltValues = backend.data.get(filter.dataId).values;
        var fltS0 = filterStrides[0], fltS1 = filterStrides[1], fltS2 = filterStrides[2], fltS3 = filterStrides[3];
        var batchSize = convInfo.batchSize, filterDepth = convInfo.filterDepth, filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth, inChannels = convInfo.inChannels, inDepth = convInfo.inDepth, inHeight = convInfo.inHeight, inWidth = convInfo.inWidth, outChannels = convInfo.outChannels, outDepth = convInfo.outDepth, outHeight = convInfo.outHeight, outWidth = convInfo.outWidth, strideDepth = convInfo.strideDepth, strideHeight = convInfo.strideHeight, strideWidth = convInfo.strideWidth;
        var frontPad = filterDepth - 1 - convInfo.padInfo.front;
        var topPad = filterHeight - 1 - convInfo.padInfo.top;
        var leftPad = filterWidth - 1 - convInfo.padInfo.left;
        for (var b = 0; b < batchSize; ++b) {
            for (var d1 = 0; d1 < inChannels; ++d1) {
                // Frames of depth
                for (var xF = 0; xF < inDepth; ++xF) {
                    var xFCorner = xF - frontPad;
                    var xFMin = Math.max(0, Math.ceil(xFCorner / strideDepth));
                    var yFMax = Math.min(outDepth, (filterDepth + xFCorner) / strideDepth);
                    // Rows as per standard 2d matrix notation
                    for (var xR = 0; xR < inHeight; ++xR) {
                        var xRCorner = xR - topPad;
                        var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
                        var yRMax = Math.min(outHeight, (filterHeight + xRCorner) / strideHeight);
                        // Columns as per standard 2d matrix notation
                        for (var xC = 0; xC < inWidth; ++xC) {
                            var xCCorner = xC - leftPad;
                            var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
                            var yCMax = Math.min(outWidth, (filterWidth + xCCorner) / strideWidth);
                            var dotProd = 0;
                            for (var yF = xFMin; yF < yFMax; ++yF) {
                                var wF = yF * strideDepth - xFCorner;
                                for (var yR = xRMin; yR < yRMax; ++yR) {
                                    var wR = yR * strideHeight - xRCorner;
                                    for (var yC = xCMin; yC < yCMax; ++yC) {
                                        var wC = yC * strideWidth - xCCorner;
                                        var dyOffset = dyS0 * b + dyS1 * yF + dyS2 * yR + dyS3 * yC;
                                        var fltOffset = fltS0 * (filterDepth - 1 - wF) +
                                            fltS1 * (filterHeight - 1 - wR) +
                                            fltS2 * (filterWidth - 1 - wC) + fltS3 * d1;
                                        for (var d2 = 0; d2 < outChannels; ++d2) {
                                            var pixel = dyValues[dyOffset + d2];
                                            var weight = fltValues[fltOffset + d2];
                                            dotProd += pixel * weight;
                                        }
                                    }
                                }
                            }
                            dxValues[dxS0 * b + dxS1 * xF + dxS2 * xR + dxS3 * xC + d1] =
                                dotProd;
                        }
                    }
                }
            }
        }
        return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
    }
    var conv3DBackpropInputV2Config = {
        kernelName: tf.Conv3DBackpropInputV2,
        backendName: 'cpu',
        kernelFunc: conv3DBackpropInputV2
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var cos = unaryKernelFunc(tf.Cos, function (xi) { return Math.cos(xi); });
    var cosConfig = {
        kernelName: tf.Cos,
        backendName: 'cpu',
        kernelFunc: cos,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var cosh = unaryKernelFunc(tf.Cosh, function (xi) { return Math.cosh(xi); });
    var coshConfig = {
        kernelName: tf.Cosh,
        backendName: 'cpu',
        kernelFunc: cosh,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function depthwiseConv2dNative(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, filter = inputs.filter;
        var strides = attrs.strides, pad = attrs.pad, dilations = attrs.dilations, dimRoundingMode = attrs.dimRoundingMode;
        assertNotComplex([x, filter], 'depthwiseConv2DNative');
        var xStrides = tf.util.computeStrides(x.shape);
        var filterStrides = tf.util.computeStrides(filter.shape);
        var $dilations = dilations;
        if ($dilations == null) {
            $dilations = [1, 1];
        }
        tf.util.assert(tf.backend_util.eitherStridesOrDilationsAreOne(strides, $dilations), function () { return 'Error in depthwiseConv2d: Either strides or dilations must be ' +
            ("1. Got strides " + strides + " and dilations '" + $dilations + "'"); });
        var convInfo = tf.backend_util.computeConv2DInfo(x.shape, filter.shape, strides, $dilations, pad, dimRoundingMode, true /* depthwise */);
        var filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth, dilationHeight = convInfo.dilationHeight, dilationWidth = convInfo.dilationWidth, padInfo = convInfo.padInfo;
        var padLeft = padInfo.left;
        var padTop = padInfo.top;
        var chMul = convInfo.outChannels / convInfo.inChannels;
        var y = new tf.TensorBuffer(convInfo.outShape, x.dtype);
        var xVals = backend.data.get(x.dataId).values;
        var wVals = backend.data.get(filter.dataId).values;
        var yVals = y.values;
        for (var b = 0; b < convInfo.batchSize; ++b) {
            var xOffset1 = b * xStrides[0];
            var yOffset1 = b * y.strides[0];
            for (var yR = 0; yR < convInfo.outHeight; ++yR) {
                var yOffset2 = yOffset1 + yR * y.strides[1];
                var xRCorner = yR * convInfo.strideHeight - padLeft;
                for (var wR = 0; wR < filterHeight; ++wR) {
                    var xR = xRCorner + wR * dilationHeight;
                    if (xR < 0 || xR >= convInfo.inHeight) {
                        continue;
                    }
                    var wOffset1 = wR * filterStrides[0];
                    var xOffset2 = xOffset1 + xR * xStrides[1];
                    for (var yC = 0; yC < convInfo.outWidth; ++yC) {
                        var yOffset3 = yOffset2 + yC * y.strides[2];
                        var xCCorner = yC * convInfo.strideWidth - padTop;
                        for (var wC = 0; wC < filterWidth; ++wC) {
                            var xC = xCCorner + wC * dilationWidth;
                            if (xC < 0 || xC >= convInfo.inWidth) {
                                continue;
                            }
                            var wOffset2 = wOffset1 + wC * filterStrides[1];
                            var xOffset3 = xOffset2 + xC * convInfo.inChannels;
                            var yOffset4 = yOffset3;
                            var wOffset3 = wOffset2;
                            for (var d1 = 0; d1 < convInfo.inChannels; ++d1) {
                                var xVal = xVals[xOffset3 + d1];
                                for (var q = 0; q < chMul; ++q) {
                                    yVals[yOffset4 + q] += xVal * wVals[wOffset3 + q];
                                }
                                yOffset4 += chMul;
                                wOffset3 += chMul;
                            }
                        }
                    }
                }
            }
        }
        return backend.makeTensorInfo(y.shape, y.dtype, y.values);
    }
    var depthwiseConv2dNativeConfig = {
        kernelName: tf.DepthwiseConv2dNative,
        backendName: 'cpu',
        kernelFunc: depthwiseConv2dNative
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function depthwiseConv2dNativeBackpropFilter(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, dy = inputs.dy;
        var strides = attrs.strides, dilations = attrs.dilations, pad = attrs.pad, dimRoundingMode = attrs.dimRoundingMode, filterShape = attrs.filterShape;
        assertNotComplex([x, dy], 'depthwiseConv2dNativeBackpropFilter');
        var convInfo = tf.backend_util.computeConv2DInfo(x.shape, filterShape, strides, dilations, pad, dimRoundingMode, true /* depthwise */);
        var strideHeight = convInfo.strideHeight, strideWidth = convInfo.strideWidth, filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth;
        var dW = new tf.TensorBuffer(convInfo.filterShape, 'float32');
        var leftPad = convInfo.padInfo.left;
        var topPad = convInfo.padInfo.top;
        var chMul = convInfo.outChannels / convInfo.inChannels;
        var xVals = backend.data.get(x.dataId).values;
        var xBuf = new tf.TensorBuffer(x.shape, x.dtype, xVals);
        var dyVals = backend.data.get(dy.dataId).values;
        var dyBuf = new tf.TensorBuffer(dy.shape, dy.dtype, dyVals);
        for (var wR = 0; wR < filterHeight; ++wR) {
            var yRMin = Math.max(0, Math.ceil((topPad - wR) / strideHeight));
            var yRMax = Math.min(convInfo.outHeight, (convInfo.inHeight + topPad - wR) / strideHeight);
            for (var wC = 0; wC < filterWidth; ++wC) {
                var yCMin = Math.max(0, Math.ceil((leftPad - wC) / strideWidth));
                var yCMax = Math.min(convInfo.outWidth, (convInfo.inWidth + leftPad - wC) / strideWidth);
                for (var d2 = 0; d2 < convInfo.outChannels; ++d2) {
                    var d1 = Math.trunc(d2 / chMul);
                    var dm = d2 % chMul;
                    var dotProd = 0;
                    for (var b = 0; b < convInfo.batchSize; ++b) {
                        for (var yR = yRMin; yR < yRMax; ++yR) {
                            var xR = wR + yR * strideHeight - topPad;
                            for (var yC = yCMin; yC < yCMax; ++yC) {
                                var xC = wC + yC * strideWidth - leftPad;
                                dotProd += xBuf.get(b, xR, xC, d1) *
                                    dyBuf.get(b, yR, yC, d2);
                            }
                        }
                    }
                    dW.set(dotProd, wR, wC, d1, dm);
                }
            }
        }
        return backend.makeTensorInfo(dW.shape, dW.dtype, dW.values);
    }
    var depthwiseConv2dNativeBackpropFilterConfig = {
        kernelName: tf.DepthwiseConv2dNativeBackpropFilter,
        backendName: 'cpu',
        kernelFunc: depthwiseConv2dNativeBackpropFilter
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function depthwiseConv2dNativeBackpropInput(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var dy = inputs.dy, filter = inputs.filter;
        var strides = attrs.strides, dilations = attrs.dilations, pad = attrs.pad, dimRoundingMode = attrs.dimRoundingMode, inputShape = attrs.inputShape;
        assertNotComplex([dy, filter], 'depthwiseConv2DNativeBackpropInput');
        var dyStrides = tf.util.computeStrides(dy.shape);
        var filterStrides = tf.util.computeStrides(filter.shape);
        var convInfo = tf.backend_util.computeConv2DInfo(inputShape, filter.shape, strides, dilations, pad, dimRoundingMode, true /* depthwise */);
        var dx = new tf.TensorBuffer(convInfo.inShape, 'float32');
        var dxValues = dx.values;
        var _a = dx.strides, dxS0 = _a[0], dxS1 = _a[1], dxS2 = _a[2];
        var dyValues = backend.data.get(dy.dataId).values;
        var dyS0 = dyStrides[0], dyS1 = dyStrides[1], dyS2 = dyStrides[2];
        var fltValues = backend.data.get(filter.dataId).values;
        var fltS0 = filterStrides[0], fltS1 = filterStrides[1], fltS2 = filterStrides[2];
        var batchSize = convInfo.batchSize, filterHeight = convInfo.filterHeight, filterWidth = convInfo.filterWidth, inChannels = convInfo.inChannels, inHeight = convInfo.inHeight, inWidth = convInfo.inWidth, outChannels = convInfo.outChannels, outHeight = convInfo.outHeight, outWidth = convInfo.outWidth, strideHeight = convInfo.strideHeight, strideWidth = convInfo.strideWidth;
        var topPad = filterHeight - 1 - convInfo.padInfo.top;
        var leftPad = filterWidth - 1 - convInfo.padInfo.left;
        var chMul = outChannels / inChannels;
        for (var b = 0; b < batchSize; ++b) {
            for (var d1 = 0; d1 < inChannels; ++d1) {
                for (var xR = 0; xR < inHeight; ++xR) {
                    var xRCorner = xR - topPad;
                    var xRMin = Math.max(0, Math.ceil(xRCorner / strideHeight));
                    var yRMax = Math.min(outHeight, (filterHeight + xRCorner) / strideHeight);
                    for (var xC = 0; xC < inWidth; ++xC) {
                        var xCCorner = xC - leftPad;
                        var xCMin = Math.max(0, Math.ceil(xCCorner / strideWidth));
                        var yCMax = Math.min(outWidth, (filterWidth + xCCorner) / strideWidth);
                        var dotProd = 0;
                        for (var yR = xRMin; yR < yRMax; ++yR) {
                            var wR = yR * strideHeight - xRCorner;
                            for (var yC = xCMin; yC < yCMax; ++yC) {
                                var wC = yC * strideWidth - xCCorner;
                                var dyOffset = dyS0 * b + dyS1 * yR + dyS2 * yC;
                                var fltOffset = fltS0 * (filterHeight - 1 - wR) +
                                    fltS1 * (filterWidth - 1 - wC) + fltS2 * d1;
                                for (var dm = 0; dm < chMul; ++dm) {
                                    var d2 = d1 * chMul + dm;
                                    var pixel = dyValues[dyOffset + d2];
                                    var weight = fltValues[fltOffset + dm];
                                    dotProd += pixel * weight;
                                }
                            }
                        }
                        dxValues[dxS0 * b + dxS1 * xR + dxS2 * xC + d1] = dotProd;
                    }
                }
            }
        }
        return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
    }
    var depthwiseConv2dNativeBackpropInputConfig = {
        kernelName: tf.DepthwiseConv2dNativeBackpropInput,
        backendName: 'cpu',
        kernelFunc: depthwiseConv2dNativeBackpropInput
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var dilation2dConfig = {
        kernelName: tf.Dilation2D,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
            var _b = inputs, x = _b.x, filter = _b.filter;
            var _c = attrs, strides = _c.strides, pad = _c.pad, dilations = _c.dilations;
            var cpuBackend = backend;
            var xVals = cpuBackend.data.get(x.dataId).values;
            var xRank = x.shape.length;
            var filterVals = cpuBackend.data.get(filter.dataId).values;
            var filterRank = filter.shape.length;
            var _d = tf.backend_util.computeDilation2DInfo(x.shape, filter.shape, strides, pad, 'NHWC' /* dataFormat */, dilations), batchSize = _d.batchSize, inHeight = _d.inHeight, inWidth = _d.inWidth, inChannels = _d.inChannels, outHeight = _d.outHeight, outWidth = _d.outWidth, padInfo = _d.padInfo, strideHeight = _d.strideHeight, strideWidth = _d.strideWidth, filterHeight = _d.filterHeight, filterWidth = _d.filterWidth, dilationHeight = _d.dilationHeight, dilationWidth = _d.dilationWidth, outShape = _d.outShape;
            var outSize = tf.util.sizeFromShape(outShape);
            var outRank = outShape.length;
            var outputVals = tf.util.getArrayFromDType(x.dtype, outSize);
            // Upsampling the input by fill in `dilation size - 1` values between each
            // input value.
            // This implementation follows the TF c++ implementation:
            // https://github.com/tensorflow/tensorflow/blob/d9a3a849edc198e90172bc58eb293de457f9d986/tensorflow/core/kernels/dilation_ops.cc
            for (var b = 0; b < batchSize; ++b) {
                for (var hOut = 0; hOut < outHeight; ++hOut) {
                    var hBeg = hOut * strideHeight - padInfo.top;
                    for (var wOut = 0; wOut < outWidth; ++wOut) {
                        var wBeg = wOut * strideWidth - padInfo.left;
                        for (var d = 0; d < inChannels; ++d) {
                            var curVal = Number.MIN_SAFE_INTEGER;
                            for (var h = 0; h < filterHeight; ++h) {
                                var hIn = hBeg + h * dilationHeight;
                                if (hIn >= 0 && hIn < inHeight) {
                                    for (var w = 0; w < filterWidth; ++w) {
                                        var wIn = wBeg + w * dilationWidth;
                                        if (wIn >= 0 && wIn < inWidth) {
                                            var xIndex = tf.util.locToIndex([b, hIn, wIn, d], xRank, tf.util.computeStrides(x.shape));
                                            var filterIndex = tf.util.locToIndex([h, w, d], filterRank, tf.util.computeStrides(filter.shape));
                                            var val = xVals[xIndex] + filterVals[filterIndex];
                                            if (val > curVal) {
                                                curVal = val;
                                            }
                                        }
                                    }
                                }
                            }
                            var outputIndex = tf.util.locToIndex([b, hOut, wOut, d], outRank, tf.util.computeStrides(outShape));
                            outputVals[outputIndex] = curVal;
                        }
                    }
                }
            }
            var dataId = cpuBackend.write(tf.util.toTypedArray(outputVals, x.dtype), outShape, x.dtype);
            return { dataId: dataId, shape: outShape, dtype: x.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var dilation2dBackpropFilterConfig = {
        kernelName: tf.Dilation2DBackpropFilter,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
            var _b = inputs, x = _b.x, filter = _b.filter, dy = _b.dy;
            var _c = attrs, strides = _c.strides, pad = _c.pad, dilations = _c.dilations;
            var cpuBackend = backend;
            var $x = tf.util.toNestedArray(x.shape, cpuBackend.data.get(x.dataId).values);
            var $filter = tf.util.toNestedArray(filter.shape, cpuBackend.data.get(filter.dataId).values);
            var _d = tf.backend_util.computeDilation2DInfo(x.shape, filter.shape, strides, pad, 'NHWC' /* dataFormat */, dilations), batchSize = _d.batchSize, inHeight = _d.inHeight, inWidth = _d.inWidth, inChannels = _d.inChannels, outHeight = _d.outHeight, outWidth = _d.outWidth, padInfo = _d.padInfo, strideHeight = _d.strideHeight, strideWidth = _d.strideWidth, filterHeight = _d.filterHeight, filterWidth = _d.filterWidth, dilationHeight = _d.dilationHeight, dilationWidth = _d.dilationWidth, outShape = _d.outShape;
            tf.util.assert(dy.rank === outShape.length, function () { return "Error in " + tf.Dilation2DBackpropFilter + ", dy " +
                ("must have the same rank as output " + outShape.length + ", but got ") +
                ("" + dy.rank); });
            var $dy = tf.util.toNestedArray(outShape, cpuBackend.data.get(dy.dataId).values);
            // The computed filter gradients has the same dimensions as the filter:
            // [filterHeight, filterWidth, depth]
            var gradients = tf.util.makeZerosNestedTypedArray(filter.shape, filter.dtype);
            // In the case of multiple argmax branches, we only back-propagate along the
            // last branch, i.e., the one with largest value of `h * filter_cols + w`,
            // similarly to the max-pooling backward routines.
            // This implementation follows the TF c++ implementation:
            // https://github.com/tensorflow/tensorflow/blob/d9a3a849edc198e90172bc58eb293de457f9d986/tensorflow/core/kernels/dilation_ops.cc
            for (var b = 0; b < batchSize; ++b) {
                for (var hOut = 0; hOut < outHeight; ++hOut) {
                    var hBeg = hOut * strideHeight - padInfo.top;
                    for (var wOut = 0; wOut < outWidth; ++wOut) {
                        var wBeg = wOut * strideWidth - padInfo.left;
                        for (var d = 0; d < inChannels; ++d) {
                            var curVal = Number.MIN_SAFE_INTEGER;
                            var hMax = 0;
                            var wMax = 0;
                            for (var h = 0; h < filterHeight; ++h) {
                                var hIn = hBeg + h * dilationHeight;
                                if (hIn >= 0 && hIn < inHeight) {
                                    for (var w = 0; w < filterWidth; ++w) {
                                        var wIn = wBeg + w * dilationWidth;
                                        if (wIn >= 0 && wIn < inWidth) {
                                            var val = $x[b][hIn][wIn][d] + $filter[h][w][d];
                                            if (val > curVal) {
                                                curVal = val;
                                                hMax = h;
                                                wMax = w;
                                            }
                                        }
                                    }
                                }
                            }
                            gradients[hMax][wMax][d] += $dy[b][hOut][wOut][d];
                        }
                    }
                }
            }
            var dataId = cpuBackend.write(tf.util.toTypedArray(gradients, x.dtype), filter.shape, filter.dtype);
            return { dataId: dataId, shape: filter.shape, dtype: filter.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var dilation2dBackpropInputConfig = {
        kernelName: tf.Dilation2DBackpropInput,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
            var _b = inputs, x = _b.x, filter = _b.filter, dy = _b.dy;
            var _c = attrs, strides = _c.strides, pad = _c.pad, dilations = _c.dilations;
            var cpuBackend = backend;
            var $x = tf.util.toNestedArray(x.shape, cpuBackend.data.get(x.dataId).values);
            var $filter = tf.util.toNestedArray(filter.shape, cpuBackend.data.get(filter.dataId).values);
            var _d = tf.backend_util.computeDilation2DInfo(x.shape, filter.shape, strides, pad, 'NHWC' /* dataFormat */, dilations), batchSize = _d.batchSize, inHeight = _d.inHeight, inWidth = _d.inWidth, inChannels = _d.inChannels, outHeight = _d.outHeight, outWidth = _d.outWidth, padInfo = _d.padInfo, strideHeight = _d.strideHeight, strideWidth = _d.strideWidth, filterHeight = _d.filterHeight, filterWidth = _d.filterWidth, dilationHeight = _d.dilationHeight, dilationWidth = _d.dilationWidth, outShape = _d.outShape;
            tf.util.assert(dy.rank === outShape.length, function () { return "Error in " + tf.Dilation2DBackpropInput + ", dy " +
                ("must have the same rank as output " + outShape.length + ", but got ") +
                ("" + dy.rank); });
            var $dy = tf.util.toNestedArray(outShape, cpuBackend.data.get(dy.dataId).values);
            // The computed gradients has the same dimensions as the input:
            // [batch, inputHeight, inputCols, inChannel]
            var gradients = tf.util.makeZerosNestedTypedArray(x.shape, x.dtype);
            // In the case of multiple argmax branches, we only back-propagate along the
            // last branch, i.e., the one with largest value of `h * filter_cols + w`,
            // similarly to the max-pooling backward routines.
            // This implementation follows the TF c++ implementation:
            // https://github.com/tensorflow/tensorflow/blob/d9a3a849edc198e90172bc58eb293de457f9d986/tensorflow/core/kernels/dilation_ops.cc
            for (var b = 0; b < batchSize; ++b) {
                for (var hOut = 0; hOut < outHeight; ++hOut) {
                    var hBeg = hOut * strideHeight - padInfo.top;
                    for (var wOut = 0; wOut < outWidth; ++wOut) {
                        var wBeg = wOut * strideWidth - padInfo.left;
                        for (var d = 0; d < inChannels; ++d) {
                            var curVal = Number.MIN_SAFE_INTEGER;
                            var hInMax = (hBeg < 0) ? 0 : hBeg;
                            var wInMax = (wBeg < 0) ? 0 : wBeg;
                            for (var h = 0; h < filterHeight; ++h) {
                                var hIn = hBeg + h * dilationHeight;
                                if (hIn >= 0 && hIn < inHeight) {
                                    for (var w = 0; w < filterWidth; ++w) {
                                        var wIn = wBeg + w * dilationWidth;
                                        if (wIn >= 0 && wIn < inWidth) {
                                            var val = $x[b][hIn][wIn][d] + $filter[h][w][d];
                                            if (val > curVal) {
                                                curVal = val;
                                                hInMax = hIn;
                                                wInMax = wIn;
                                            }
                                        }
                                    }
                                }
                            }
                            gradients[b][hInMax][wInMax][d] += $dy[b][hOut][wOut][d];
                        }
                    }
                }
            }
            var dataId = cpuBackend.write(tf.util.toTypedArray(gradients, x.dtype), x.shape, x.dtype);
            return { dataId: dataId, shape: x.shape, dtype: x.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var divImpl = createSimpleBinaryKernelImpl(function (a, b) { return a / b; });
    var div = binaryKernelFunc(tf.Div, divImpl);
    var divConfig = {
        kernelName: tf.Div,
        backendName: 'cpu',
        kernelFunc: div
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var p = tf.backend_util.ERF_P;
    var a1 = tf.backend_util.ERF_A1;
    var a2 = tf.backend_util.ERF_A2;
    var a3 = tf.backend_util.ERF_A3;
    var a4 = tf.backend_util.ERF_A4;
    var a5 = tf.backend_util.ERF_A5;
    var erf = unaryKernelFunc(tf.Erf, function (xi) {
        var sign = Math.sign(xi);
        var v = Math.abs(xi);
        var t = 1.0 / (1.0 + p * v);
        return sign *
            (1.0 -
                (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t *
                    Math.exp(-v * v));
    });
    var erfConfig = {
        kernelName: tf.Erf,
        backendName: 'cpu',
        kernelFunc: erf,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    /**
     * Calculate FFT of inner most elements of batch tensor.
     */
    function fftBatch(input, inverse, cpuBackend) {
        var inputShape = input.shape;
        var batch = inputShape[0];
        var innerDim = inputShape[1];
        var inputVals = cpuBackend.data.get(input.dataId);
        var real2D = inputVals.complexTensorInfos.real;
        var imag2D = inputVals.complexTensorInfos.imag;
        // Collects real and imaginary values separately.
        var resultShape = [batch, innerDim];
        var resultSize = tf.util.sizeFromShape(resultShape);
        var resultReal = tf.util.getTypedArrayFromDType('float32', resultSize);
        var resultImag = tf.util.getTypedArrayFromDType('float32', resultSize);
        for (var b = 0; b < batch; b++) {
            // TODO: Support slice ops for complex type.
            var r = slice({
                inputs: { x: real2D },
                backend: cpuBackend,
                attrs: { begin: [b, 0], size: [1, innerDim] }
            });
            var i = slice({
                inputs: { x: imag2D },
                backend: cpuBackend,
                attrs: { begin: [b, 0], size: [1, innerDim] }
            });
            var input_1 = complex({ inputs: { real: r, imag: i }, backend: cpuBackend });
            // Run FFT by batch element.
            var _a = fftImpl(input_1, inverse, cpuBackend), real_1 = _a.real, imag_1 = _a.imag;
            var res = tf.backend_util.mergeRealAndImagArrays(real_1, imag_1);
            for (var d = 0; d < innerDim; d++) {
                var c = tf.backend_util.getComplexWithIndex(res, d);
                resultReal[b * innerDim + d] = c.real;
                resultImag[b * innerDim + d] = c.imag;
            }
            cpuBackend.disposeIntermediateTensorInfo(r);
            cpuBackend.disposeIntermediateTensorInfo(i);
            cpuBackend.disposeIntermediateTensorInfo(input_1);
        }
        var $realInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', resultReal);
        var $imagInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', resultImag);
        var result = complex({ inputs: { real: $realInfo, imag: $imagInfo }, backend: cpuBackend });
        cpuBackend.disposeIntermediateTensorInfo($realInfo);
        cpuBackend.disposeIntermediateTensorInfo($imagInfo);
        return result;
    }
    function fftImpl(input, inverse, cpuBackend) {
        var inputSize = tf.util.sizeFromShape(input.shape);
        var inputVals = cpuBackend.data.get(input.dataId);
        var realVals = cpuBackend.data.get(inputVals.complexTensorInfos.real.dataId).values;
        var imagVals = cpuBackend.data.get(inputVals.complexTensorInfos.imag.dataId).values;
        if (isExponentOf2(inputSize)) {
            var result = fftRadix2(realVals, imagVals, inputSize, inverse, cpuBackend);
            var resultShape = [input.shape[0], input.shape[1]];
            if (inverse) {
                var realInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', result.real);
                var imagInfo = cpuBackend.makeTensorInfo(resultShape, 'float32', result.imag);
                var sizeInfo = cpuBackend.makeTensorInfo([], 'float32', tf.util.createScalarValue(inputSize, 'float32'));
                var sizeInfoCopy = identity({ inputs: { x: sizeInfo }, backend: cpuBackend });
                var divRealInfo = divConfig.kernelFunc({ inputs: { a: realInfo, b: sizeInfo }, backend: cpuBackend });
                var divImagInfo = divConfig.kernelFunc({ inputs: { a: imagInfo, b: sizeInfoCopy }, backend: cpuBackend });
                var divRealVals = cpuBackend.data.get(divRealInfo.dataId).values;
                var divImagVals = cpuBackend.data.get(divImagInfo.dataId).values;
                cpuBackend.disposeIntermediateTensorInfo(realInfo);
                cpuBackend.disposeIntermediateTensorInfo(imagInfo);
                cpuBackend.disposeIntermediateTensorInfo(sizeInfo);
                cpuBackend.disposeIntermediateTensorInfo(sizeInfoCopy);
                cpuBackend.disposeIntermediateTensorInfo(divRealInfo);
                cpuBackend.disposeIntermediateTensorInfo(divImagInfo);
                return { real: divRealVals, imag: divImagVals };
            }
            return result;
        }
        else {
            var data = tf.backend_util.mergeRealAndImagArrays(realVals, imagVals);
            var rawOutput = fourierTransformByMatmul(data, inputSize, inverse);
            return tf.backend_util.splitRealAndImagArrays(rawOutput);
        }
    }
    function isExponentOf2(size) {
        return (size & size - 1) === 0;
    }
    // FFT using Cooley-Tukey algorithm on radix 2 dimensional input.
    function fftRadix2(realVals, imagVals, size, inverse, cpuBackend) {
        if (size === 1) {
            return { real: realVals, imag: imagVals };
        }
        var data = tf.backend_util.mergeRealAndImagArrays(realVals, imagVals);
        var half = size / 2;
        var evenComplex = tf.backend_util.complexWithEvenIndex(data);
        var evenRealVals = evenComplex.real;
        var evenImagVals = evenComplex.imag;
        var evenShape = [evenRealVals.length];
        var evenRealInfo = cpuBackend.makeTensorInfo(evenShape, 'float32', evenRealVals);
        var evenImagInfo = cpuBackend.makeTensorInfo(evenShape, 'float32', evenImagVals);
        var evenTensorInfo = complex({ inputs: { real: evenRealInfo, imag: evenImagInfo }, backend: cpuBackend });
        var oddComplex = tf.backend_util.complexWithOddIndex(data);
        var oddRealVals = oddComplex.real;
        var oddImagVals = oddComplex.imag;
        var oddShape = [oddRealVals.length];
        var oddRealInfo = cpuBackend.makeTensorInfo(oddShape, 'float32', oddRealVals);
        var oddImagInfo = cpuBackend.makeTensorInfo(oddShape, 'float32', oddImagVals);
        var oddTensorInfo = complex({ inputs: { real: oddRealInfo, imag: oddImagInfo }, backend: cpuBackend });
        // Recursive call for half part of original input.
        var $evenComplex = fftRadix2(evenRealVals, evenImagVals, half, inverse, cpuBackend);
        var $evenRealVals = $evenComplex.real;
        var $evenImagVals = $evenComplex.imag;
        var $evenShape = [$evenRealVals.length];
        var $evenRealInfo = cpuBackend.makeTensorInfo($evenShape, 'float32', $evenRealVals);
        var $evenImagInfo = cpuBackend.makeTensorInfo($evenShape, 'float32', $evenImagVals);
        var $evenTensorInfo = complex({
            inputs: { real: $evenRealInfo, imag: $evenImagInfo },
            backend: cpuBackend
        });
        var $oddComplex = fftRadix2(oddRealVals, oddImagVals, half, inverse, cpuBackend);
        var $oddRealVals = $oddComplex.real;
        var $oddImagVals = $oddComplex.imag;
        var $oddShape = [$oddRealVals.length];
        var $oddRealInfo = cpuBackend.makeTensorInfo($oddShape, 'float32', $oddRealVals);
        var $oddImagInfo = cpuBackend.makeTensorInfo($oddShape, 'float32', $oddImagVals);
        var $oddTensorInfo = complex({ inputs: { real: $oddRealInfo, imag: $oddImagInfo }, backend: cpuBackend });
        var e = tf.backend_util.exponents(size, inverse);
        var eShape = [e.real.length];
        var eRealInfo = cpuBackend.makeTensorInfo(eShape, 'float32', e.real);
        var eImagInfo = cpuBackend.makeTensorInfo(eShape, 'float32', e.imag);
        var complexInfo = complex({ inputs: { real: eRealInfo, imag: eImagInfo }, backend: cpuBackend });
        var exponentInfo = multiply({ inputs: { a: complexInfo, b: $oddTensorInfo }, backend: cpuBackend });
        var addPart = add({
            inputs: { a: $evenTensorInfo, b: exponentInfo },
            backend: cpuBackend
        });
        var subPart = sub({
            inputs: { a: $evenTensorInfo, b: exponentInfo },
            backend: cpuBackend
        });
        var addPartReal = real({ inputs: { input: addPart }, backend: cpuBackend });
        var subPartReal = real({ inputs: { input: subPart }, backend: cpuBackend });
        var addPartImag = imag({ inputs: { input: addPart }, backend: cpuBackend });
        var subPartImag = imag({ inputs: { input: subPart }, backend: cpuBackend });
        var $real = concat({
            inputs: [addPartReal, subPartReal],
            backend: cpuBackend,
            attrs: { axis: 0 }
        });
        var $imag = concat({
            inputs: [addPartImag, subPartImag],
            backend: cpuBackend,
            attrs: { axis: 0 }
        });
        var $realVals = cpuBackend.data.get($real.dataId).values;
        var $imagVals = cpuBackend.data.get($imag.dataId).values;
        cpuBackend.disposeIntermediateTensorInfo(evenRealInfo);
        cpuBackend.disposeIntermediateTensorInfo(evenImagInfo);
        cpuBackend.disposeIntermediateTensorInfo(evenTensorInfo);
        cpuBackend.disposeIntermediateTensorInfo(oddRealInfo);
        cpuBackend.disposeIntermediateTensorInfo(oddImagInfo);
        cpuBackend.disposeIntermediateTensorInfo(oddTensorInfo);
        cpuBackend.disposeIntermediateTensorInfo($evenRealInfo);
        cpuBackend.disposeIntermediateTensorInfo($evenImagInfo);
        cpuBackend.disposeIntermediateTensorInfo($evenTensorInfo);
        cpuBackend.disposeIntermediateTensorInfo($oddRealInfo);
        cpuBackend.disposeIntermediateTensorInfo($oddImagInfo);
        cpuBackend.disposeIntermediateTensorInfo($oddTensorInfo);
        cpuBackend.disposeIntermediateTensorInfo(eRealInfo);
        cpuBackend.disposeIntermediateTensorInfo(eImagInfo);
        cpuBackend.disposeIntermediateTensorInfo(complexInfo);
        cpuBackend.disposeIntermediateTensorInfo(exponentInfo);
        cpuBackend.disposeIntermediateTensorInfo(addPart);
        cpuBackend.disposeIntermediateTensorInfo(subPart);
        cpuBackend.disposeIntermediateTensorInfo(addPartReal);
        cpuBackend.disposeIntermediateTensorInfo(addPartImag);
        cpuBackend.disposeIntermediateTensorInfo(subPartReal);
        cpuBackend.disposeIntermediateTensorInfo(subPartImag);
        cpuBackend.disposeIntermediateTensorInfo($real);
        cpuBackend.disposeIntermediateTensorInfo($imag);
        return { real: $realVals, imag: $imagVals };
    }
    // Calculate fourier transform by multplying sinusoid matrix.
    function fourierTransformByMatmul(data, size, inverse) {
        var ret = new Float32Array(size * 2);
        // TODO: Use matmul instead once it supports complex64 type.
        for (var r = 0; r < size; r++) {
            var real_2 = 0.0;
            var imag_2 = 0.0;
            for (var c = 0; c < size; c++) {
                var e = tf.backend_util.exponent(r * c, size, inverse);
                var term = tf.backend_util.getComplexWithIndex(data, c);
                real_2 += term.real * e.real - term.imag * e.imag;
                imag_2 += term.real * e.imag + term.imag * e.real;
            }
            if (inverse) {
                real_2 /= size;
                imag_2 /= size;
            }
            tf.backend_util.assignToTypedArray(ret, real_2, imag_2, r);
        }
        return ret;
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function fft(args) {
        var inputs = args.inputs, backend = args.backend;
        var input = inputs.input;
        var inputSize = tf.util.sizeFromShape(input.shape);
        // Collapse all outer dimensions to a single batch dimension.
        var innerDimensionSize = input.shape[input.shape.length - 1];
        var batch = inputSize / innerDimensionSize;
        var input2D = reshape({
            inputs: { x: input },
            backend: backend,
            attrs: { shape: [batch, innerDimensionSize] }
        });
        var result = fftBatch(input2D, false, backend);
        var resultReshaped = reshape({ inputs: { x: result }, backend: backend, attrs: { shape: input.shape } });
        backend.disposeIntermediateTensorInfo(input2D);
        backend.disposeIntermediateTensorInfo(result);
        return resultReshaped;
    }
    var fftConfig = {
        kernelName: tf.FFT,
        backendName: 'cpu',
        kernelFunc: fft
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function fill(args) {
        var backend = args.backend, attrs = args.attrs;
        var shape = attrs.shape, value = attrs.value, dtype = attrs.dtype;
        var $dtype = dtype || tf.util.inferDtype(value);
        var values = tf.util.getArrayFromDType($dtype, tf.util.sizeFromShape(shape));
        fillValues(values, value, $dtype);
        return backend.makeTensorInfo(shape, $dtype, values);
    }
    var fillConfig = {
        kernelName: tf.Fill,
        backendName: 'cpu',
        kernelFunc: fill
    };
    function fillValues(values, value, dtype) {
        if (dtype === 'string') {
            values.fill(value);
        }
        else {
            values.fill(value);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var flipLeftRightConfig = {
        kernelName: tf.FlipLeftRight,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
            var image = inputs.image;
            var cpuBackend = backend;
            var output = tf.util.getTypedArrayFromDType(image.dtype, tf.util.sizeFromShape(image.shape));
            var _b = image.shape, batch = _b[0], imageHeight = _b[1], imageWidth = _b[2], numChannels = _b[3];
            var imageVals = cpuBackend.data.get(image.dataId).values;
            for (var batchIdx = 0; batchIdx < batch; batchIdx++) {
                var batchOffset = batchIdx * imageWidth * imageHeight * numChannels;
                for (var row = 0; row < imageHeight; row++) {
                    var rowOffset = row * (imageWidth * numChannels);
                    for (var col = 0; col < imageWidth; col++) {
                        var colOffset = col * numChannels;
                        for (var channel = 0; channel < numChannels; channel++) {
                            var coords = [batch, row, col, channel];
                            var x = coords[2];
                            var coordX = Math.round(imageWidth - x);
                            var outIdx = batchOffset + rowOffset + colOffset + channel;
                            var outputValue = imageVals[outIdx];
                            // If the coordinate position falls within the image boundaries...
                            if (coordX >= 0 && coordX < imageWidth) {
                                // set the output to the image value at the coordinate position.
                                var rotatedColOffset = coordX * numChannels;
                                var imageIdx = batchOffset + rowOffset + rotatedColOffset + channel;
                                outputValue = imageVals[imageIdx];
                            }
                            output[outIdx] = outputValue;
                        }
                    }
                }
            }
            var dataId = cpuBackend.write(output, image.shape, image.dtype);
            return { dataId: dataId, shape: image.shape, dtype: image.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function fusedConv2D(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, filter = inputs.filter, bias = inputs.bias, preluActivationWeights = inputs.preluActivationWeights;
        var strides = attrs.strides, pad = attrs.pad, dataFormat = attrs.dataFormat, dilations = attrs.dilations, dimRoundingMode = attrs.dimRoundingMode, activation = attrs.activation;
        var result = conv2D({
            inputs: { x: x, filter: filter },
            backend: backend,
            attrs: { strides: strides, pad: pad, dataFormat: dataFormat, dilations: dilations, dimRoundingMode: dimRoundingMode }
        });
        if (bias) {
            var resultOld = result;
            result = add({ inputs: { a: result, b: bias }, backend: backend });
            backend.disposeIntermediateTensorInfo(resultOld);
        }
        if (activation) {
            var resultOld = result;
            result =
                applyActivation(backend, result, activation, preluActivationWeights);
            backend.disposeIntermediateTensorInfo(resultOld);
        }
        return result;
    }
    var fusedConv2DConfig = {
        kernelName: tf.FusedConv2D,
        backendName: 'cpu',
        kernelFunc: fusedConv2D
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function fusedDepthwiseConv2D(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x, filter = inputs.filter, bias = inputs.bias, preluActivationWeights = inputs.preluActivationWeights;
        var strides = attrs.strides, pad = attrs.pad, dataFormat = attrs.dataFormat, dilations = attrs.dilations, dimRoundingMode = attrs.dimRoundingMode, activation = attrs.activation;
        var result = depthwiseConv2dNative({
            inputs: { x: x, filter: filter },
            backend: backend,
            attrs: { strides: strides, pad: pad, dataFormat: dataFormat, dilations: dilations, dimRoundingMode: dimRoundingMode }
        });
        if (bias) {
            var oldResult = result;
            result = add({ inputs: { a: result, b: bias }, backend: backend });
            backend.disposeIntermediateTensorInfo(oldResult);
        }
        if (activation) {
            var oldResult = result;
            result =
                applyActivation(backend, result, activation, preluActivationWeights);
            backend.disposeIntermediateTensorInfo(oldResult);
        }
        return result;
    }
    var fusedDepthwiseConv2DConfig = {
        kernelName: tf.FusedDepthwiseConv2D,
        backendName: 'cpu',
        kernelFunc: fusedDepthwiseConv2D
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function ifft(args) {
        var inputs = args.inputs, backend = args.backend;
        var input = inputs.input;
        var inputSize = tf.util.sizeFromShape(input.shape);
        // Collapse all outer dimensions to a single batch dimension.
        var innerDimensionSize = input.shape[input.shape.length - 1];
        var batch = inputSize / innerDimensionSize;
        var input2D = reshape({
            inputs: { x: input },
            backend: backend,
            attrs: { shape: [batch, innerDimensionSize] }
        });
        var result = fftBatch(input2D, true, backend);
        var resultReshaped = reshape({ inputs: { x: result }, backend: backend, attrs: { shape: input.shape } });
        backend.disposeIntermediateTensorInfo(input2D);
        backend.disposeIntermediateTensorInfo(result);
        return resultReshaped;
    }
    var ifftConfig = {
        kernelName: tf.IFFT,
        backendName: 'cpu',
        kernelFunc: ifft
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var isFinite = unaryKernelFunc(tf.IsFinite, function (xi) { return Number.isFinite(xi) ? 1 : 0; }, 'bool');
    var isFiniteConfig = {
        kernelName: tf.IsFinite,
        backendName: 'cpu',
        kernelFunc: isFinite,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var isInf = unaryKernelFunc(tf.IsInf, function (xi) { return Math.abs(xi) === Infinity ? 1 : 0; }, 'bool');
    var isInfConfig = {
        kernelName: tf.IsInf,
        backendName: 'cpu',
        kernelFunc: isInf,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var isNaN$1 = unaryKernelFunc(tf.IsNan, function (xi) { return Number.isNaN(xi) ? 1 : 0; }, 'bool');
    var isNaNConfig = {
        kernelName: tf.IsNan,
        backendName: 'cpu',
        kernelFunc: isNaN$1,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var log1p = unaryKernelFunc(tf.Log1p, function (xi) { return Math.log1p(xi); });
    var log1pConfig = {
        kernelName: tf.Log1p,
        backendName: 'cpu',
        kernelFunc: log1p,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var logicalNot = unaryKernelFunc(tf.LogicalNot, function (xi) { return xi ? 0 : 1; }, 'bool');
    var logicalNotConfig = {
        kernelName: tf.LogicalNot,
        backendName: 'cpu',
        kernelFunc: logicalNot,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var maxConfig = {
        kernelName: tf.Max,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
            var x = inputs.x;
            var _b = attrs, reductionIndices = _b.reductionIndices, keepDims = _b.keepDims;
            var cpuBackend = backend;
            var xShape = x.shape;
            var xRank = xShape.length;
            var origAxes = tf.util.parseAxisParam(reductionIndices, xShape);
            var axes = origAxes;
            var permutedAxes = tf.backend_util.getAxesPermutation(axes, xRank);
            var xVals = cpuBackend.data.get(x.dataId).values;
            if (permutedAxes != null) {
                var newShape = new Array(xRank);
                for (var i = 0; i < newShape.length; i++) {
                    newShape[i] = xShape[permutedAxes[i]];
                }
                xVals = transposeImpl(xVals, xShape, x.dtype, permutedAxes, newShape);
                axes = tf.backend_util.getInnerMostAxes(axes.length, xRank);
                xShape = newShape;
            }
            assertNotComplex(x, 'max');
            tf.backend_util.assertAxesAreInnerMostDims('max', axes, xRank);
            var _c = tf.backend_util.computeOutAndReduceShapes(xShape, axes), maxOutShape = _c[0], reduceShape = _c[1];
            var reduceSize = tf.util.sizeFromShape(reduceShape);
            var result = maxImpl(xVals, reduceSize, maxOutShape, x.dtype);
            var dataId = cpuBackend.write(result, maxOutShape, x.dtype);
            var outShape = maxOutShape;
            if (keepDims) {
                // reshape
                var newShape = tf.backend_util.expandShapeToKeepDim(maxOutShape, origAxes);
                outShape = newShape;
            }
            return { dataId: dataId, shape: outShape, dtype: x.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function maxPool(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        assertNotComplex(x, 'maxPool');
        var filterSize = attrs.filterSize, strides = attrs.strides, pad = attrs.pad, dimRoundingMode = attrs.dimRoundingMode;
        var dilations = 1;
        tf.util.assert(tf.backend_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in maxPool: Either strides or dilations must be 1. ' +
            ("Got strides " + strides + " and dilations '" + dilations + "'"); });
        var convInfo = tf.backend_util.computePool2DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode);
        var res;
        if (convInfo.filterWidth === 1 && convInfo.filterHeight === 1 &&
            tf.util.arraysEqual(convInfo.inShape, convInfo.outShape)) {
            res = identity({ inputs: { x: x }, backend: backend });
        }
        else {
            var xValues = backend.data.get(x.dataId).values;
            var strides_1 = tf.util.computeStrides(x.shape);
            var buffer = pool(xValues, x.shape, x.dtype, strides_1, convInfo, 'max');
            res = backend.makeTensorInfo(convInfo.outShape, x.dtype, buffer.values);
        }
        return res;
    }
    var maxPoolConfig = {
        kernelName: tf.MaxPool,
        backendName: 'cpu',
        kernelFunc: maxPool
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function maxPoolBackprop(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var dy = inputs.dy, input = inputs.input, output = inputs.output;
        var x = input;
        assertNotComplex([input, output], 'maxPoolBackprop');
        var filterSize = attrs.filterSize, strides = attrs.strides, pad = attrs.pad, dimRoundingMode = attrs.dimRoundingMode;
        var convInfo = tf.backend_util.computePool2DInfo(x.shape, filterSize, strides, 1 /* dilations */, pad, dimRoundingMode);
        var xValues = backend.data.get(x.dataId).values;
        var maxPosBuf = tf.buffer(convInfo.outShape, x.dtype, maxPoolPositions(xValues, x.shape, x.dtype, convInfo).values);
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var effectiveFilterHeight = convInfo.effectiveFilterHeight;
        var effectiveFilterWidth = convInfo.effectiveFilterWidth;
        var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
        var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
        var dx = tf.buffer(x.shape, 'float32');
        var dyData = backend.data.get(dy.dataId).values;
        var dyBuf = tf.buffer(dy.shape, 'float32', dyData);
        for (var b = 0; b < convInfo.batchSize; ++b) {
            for (var d = 0; d < convInfo.inChannels; ++d) {
                for (var dxR = 0; dxR < convInfo.inHeight; ++dxR) {
                    for (var dxC = 0; dxC < convInfo.inWidth; ++dxC) {
                        // Shader code begins.
                        var dyRCorner = dxR - padTop;
                        var dyCCorner = dxC - padLeft;
                        var dotProd = 0;
                        for (var wR = 0; wR < effectiveFilterHeight; wR += dilationHeight) {
                            var dyR = (dyRCorner + wR) / strideHeight;
                            if (dyR < 0 || dyR >= convInfo.outHeight ||
                                Math.floor(dyR) !== dyR) {
                                continue;
                            }
                            for (var wC = 0; wC < effectiveFilterWidth; wC += dilationWidth) {
                                var dyC = (dyCCorner + wC) / strideWidth;
                                if (dyC < 0 || dyC >= convInfo.outWidth ||
                                    Math.floor(dyC) !== dyC) {
                                    continue;
                                }
                                var maxPos = effectiveFilterHeight * effectiveFilterWidth - 1 -
                                    maxPosBuf.get(b, dyR, dyC, d);
                                var curPos = wR * effectiveFilterWidth + wC;
                                var mask = maxPos === curPos ? 1 : 0;
                                if (mask === 0) {
                                    continue;
                                }
                                var pixel = dyBuf.get(b, dyR, dyC, d);
                                dotProd += pixel * mask;
                            }
                        }
                        dx.set(dotProd, b, dxR, dxC, d);
                    }
                }
            }
        }
        return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
    }
    var maxPoolBackpropConfig = {
        kernelName: tf.MaxPoolBackprop,
        backendName: 'cpu',
        kernelFunc: maxPoolBackprop
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function maxPoolWithArgmaxImpl(xValues, xShape, dtype, includeBatchInIndex, convInfo) {
        var strides = tf.util.computeStrides(xShape);
        var maxPools = pool(xValues, xShape, dtype, strides, convInfo, 'max');
        var maxPositions = maxPoolPositions(xValues, xShape, dtype, convInfo, true, includeBatchInIndex);
        return [maxPools.values, maxPositions.values];
    }

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var maxPoolWithArgmaxConfig = {
        kernelName: tf.MaxPoolWithArgmax,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
            var x = inputs.x;
            var _b = attrs, filterSize = _b.filterSize, strides = _b.strides, pad = _b.pad, includeBatchInIndex = _b.includeBatchInIndex;
            var cpuBackend = backend;
            assertNotComplex(x, 'MaxPoolWithArgmax');
            var values = cpuBackend.data.get(x.dataId).values;
            var convInfo = tf.backend_util.computePool2DInfo(x.shape, filterSize, strides, [1, 1], pad);
            var _c = maxPoolWithArgmaxImpl(values, x.shape, x.dtype, includeBatchInIndex, convInfo), pooled = _c[0], indexes = _c[1];
            var pooledDataId = cpuBackend.write(pooled, convInfo.outShape, x.dtype);
            var indexesDataId = cpuBackend.write(indexes, convInfo.outShape, x.dtype);
            return [
                { dataId: pooledDataId, shape: convInfo.outShape, dtype: x.dtype },
                { dataId: indexesDataId, shape: convInfo.outShape, dtype: 'int32' }
            ];
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function mirrorPad(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        var paddings = attrs.paddings, mode = attrs.mode;
        assertNotComplex(x, 'mirrorPad');
        var outShape = paddings.map(function (p, i) { return p[0] /* beforePad */ + x.shape[i] + p[1]; } /* afterPad */);
        var start = paddings.map(function (p) { return p[0]; });
        var end = paddings.map(function (p, i) { return p[0] + x.shape[i]; });
        var offset = mode === 'reflect' ? 0 : 1;
        var xVals = backend.data.get(x.dataId).values;
        var xRank = x.shape.length;
        var xStrides = tf.util.computeStrides(x.shape);
        var resultSize = tf.util.sizeFromShape(outShape);
        var resultRank = outShape.length;
        var resultStrides = tf.util.computeStrides(outShape);
        var resVals = tf.util.getTypedArrayFromDType(x.dtype, resultSize);
        for (var i = 0; i < resultSize; i++) {
            var coords = tf.util.indexToLoc(i, resultRank, resultStrides);
            for (var i_1 = 0; i_1 < resultRank; i_1++) {
                if (coords[i_1] < start[i_1]) {
                    coords[i_1] = start[i_1] * 2 - coords[i_1] - offset;
                }
                else if (coords[i_1] >= end[i_1]) {
                    coords[i_1] = (end[i_1] - 1) * 2 - coords[i_1] + offset;
                }
            }
            coords = coords.map(function (c, i) { return c - start[i]; });
            var inIndex = tf.util.locToIndex(coords, xRank, xStrides);
            resVals[i] = xVals[inIndex];
        }
        var outId = backend.write(resVals, outShape, x.dtype);
        return { dataId: outId, shape: outShape, dtype: x.dtype };
    }
    var mirrorPadConfig = {
        kernelName: tf.MirrorPad,
        backendName: 'cpu',
        kernelFunc: mirrorPad
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var nonMaxSuppressionV4Impl = tf.kernel_impls.nonMaxSuppressionV4Impl;
    var nonMaxSuppressionV4Config = {
        kernelName: tf.NonMaxSuppressionV4,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
            var _b = inputs, boxes = _b.boxes, scores = _b.scores;
            var _c = attrs, maxOutputSize = _c.maxOutputSize, iouThreshold = _c.iouThreshold, scoreThreshold = _c.scoreThreshold, padToMaxOutputSize = _c.padToMaxOutputSize;
            var cpuBackend = backend;
            assertNotComplex(boxes, 'NonMaxSuppressionPadded');
            var boxesVals = cpuBackend.data.get(boxes.dataId).values;
            var scoresVals = cpuBackend.data.get(scores.dataId).values;
            var _d = nonMaxSuppressionV4Impl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize), selectedIndices = _d.selectedIndices, validOutputs = _d.validOutputs;
            return [selectedIndices, validOutputs];
        }
    };

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var nonMaxSuppressionV5Impl = tf.kernel_impls.nonMaxSuppressionV5Impl;
    var nonMaxSuppressionV5Config = {
        kernelName: tf.NonMaxSuppressionV5,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, backend = _a.backend, attrs = _a.attrs;
            var _b = inputs, boxes = _b.boxes, scores = _b.scores;
            var _c = attrs, maxOutputSize = _c.maxOutputSize, iouThreshold = _c.iouThreshold, scoreThreshold = _c.scoreThreshold, softNmsSigma = _c.softNmsSigma;
            var cpuBackend = backend;
            assertNotComplex(boxes, 'NonMaxSuppressionWithScore');
            var boxesVals = cpuBackend.data.get(boxes.dataId).values;
            var scoresVals = cpuBackend.data.get(scores.dataId).values;
            var maxOutputSizeVal = maxOutputSize;
            var iouThresholdVal = iouThreshold;
            var scoreThresholdVal = scoreThreshold;
            var softNmsSigmaVal = softNmsSigma;
            var _d = nonMaxSuppressionV5Impl(boxesVals, scoresVals, maxOutputSizeVal, iouThresholdVal, scoreThresholdVal, softNmsSigmaVal), selectedIndices = _d.selectedIndices, selectedScores = _d.selectedScores;
            return [selectedIndices, selectedScores];
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function padV2(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        var paddings = attrs.paddings, constantValue = attrs.constantValue;
        assertNotComplex(x, 'pad');
        var outShape = paddings.map(function (p, i) { return p[0] /* beforePad */ + x.shape[i] + p[1]; } /* afterPad */);
        var start = paddings.map(function (p) { return p[0]; });
        var xVals = backend.data.get(x.dataId).values;
        var xSize = tf.util.sizeFromShape(x.shape);
        var xRank = x.shape.length;
        var xStrides = tf.util.computeStrides(x.shape);
        var resultSize = tf.util.sizeFromShape(outShape);
        var resultRank = outShape.length;
        var resultStrides = tf.util.computeStrides(outShape);
        var resVals = tf.util.getTypedArrayFromDType(x.dtype, resultSize);
        if (constantValue !== 0) {
            resVals.fill(constantValue);
        }
        for (var i = 0; i < xSize; i++) {
            var coords = tf.util.indexToLoc(i, xRank, xStrides);
            var outCoords = coords.map(function (c, i) { return c + start[i]; });
            var outIndex = tf.util.locToIndex(outCoords, resultRank, resultStrides);
            resVals[outIndex] = xVals[i];
        }
        var outId = backend.write(resVals, outShape, x.dtype);
        return { dataId: outId, shape: outShape, dtype: x.dtype };
    }
    var padV2Config = {
        kernelName: tf.PadV2,
        backendName: 'cpu',
        kernelFunc: padV2
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var reciprocal = unaryKernelFunc(tf.Reciprocal, function (xi) { return 1 / xi; });
    var reciprocalConfig = {
        kernelName: tf.Reciprocal,
        backendName: 'cpu',
        kernelFunc: reciprocal,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var rotateWithOffsetConfig = {
        kernelName: tf.RotateWithOffset,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, attrs = _a.attrs, backend = _a.backend;
            var image = inputs.image;
            var _b = attrs, radians = _b.radians, fillValue = _b.fillValue, center = _b.center;
            var cpuBackend = backend;
            var output = tf.util.getTypedArrayFromDType(image.dtype, tf.util.sizeFromShape(image.shape));
            var _c = image.shape, batch = _c[0], imageHeight = _c[1], imageWidth = _c[2], numChannels = _c[3];
            var _d = tf.backend_util.getImageCenter(center, imageHeight, imageWidth), centerX = _d[0], centerY = _d[1];
            var fullOpacityValue = 255;
            var sinFactor = Math.sin(radians);
            var cosFactor = Math.cos(radians);
            var imageVals = cpuBackend.data.get(image.dataId).values;
            for (var batchIdx = 0; batchIdx < batch; batchIdx++) {
                var batchOffset = batchIdx * imageWidth * imageHeight * numChannels;
                for (var row = 0; row < imageHeight; row++) {
                    var rowOffset = row * (imageWidth * numChannels);
                    for (var col = 0; col < imageWidth; col++) {
                        var colOffset = col * numChannels;
                        for (var channel = 0; channel < numChannels; channel++) {
                            var coords = [batch, row, col, channel];
                            var x = coords[2];
                            var y = coords[1];
                            // coordX/coordY are the result of rotating and translating x/y.
                            var coordX = (x - centerX) * cosFactor - (y - centerY) * sinFactor;
                            var coordY = (x - centerX) * sinFactor + (y - centerY) * cosFactor;
                            coordX = Math.round(coordX + centerX);
                            coordY = Math.round(coordY + centerY);
                            var outputValue = fillValue;
                            if (typeof fillValue !== 'number') {
                                if (channel === 3) {
                                    outputValue = fullOpacityValue;
                                }
                                else {
                                    outputValue = fillValue[channel];
                                }
                            }
                            // If the coordinate position falls within the image boundaries...
                            if (coordX >= 0 && coordX < imageWidth && coordY >= 0 &&
                                coordY < imageHeight) {
                                // set the output to the image value at the coordinate position.
                                var rotatedRowOffset = coordY * (imageWidth * numChannels);
                                var rotatedColOffset = coordX * numChannels;
                                var imageIdx = batchOffset + rotatedRowOffset + rotatedColOffset + channel;
                                outputValue = imageVals[imageIdx];
                            }
                            var outIdx = batchOffset + rowOffset + colOffset + channel;
                            output[outIdx] = outputValue;
                        }
                    }
                }
            }
            var dataId = cpuBackend.write(output, image.shape, image.dtype);
            return { dataId: dataId, shape: image.shape, dtype: image.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var round = unaryKernelFunc(tf.Round, function (xi) {
        // The algorithm is based on banker's rounding.
        var base = Math.floor(xi);
        if (xi - base < 0.5) {
            return Math.floor(xi);
        }
        else if (xi - base > 0.5) {
            return Math.ceil(xi);
        }
        else {
            if (base % 2.0 === 0.0) {
                return base;
            }
            else {
                return base + 1.0;
            }
        }
    });
    var roundConfig = {
        kernelName: tf.Round,
        backendName: 'cpu',
        kernelFunc: round,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var scaleAlpha = tf.backend_util.SELU_SCALEALPHA;
    var scale = tf.backend_util.SELU_SCALE;
    var selu = unaryKernelFunc(tf.Selu, function (xi) {
        if (xi >= 0) {
            return scale * xi;
        }
        else {
            return scaleAlpha * (Math.exp(xi) - 1);
        }
    });
    var seluConfig = {
        kernelName: tf.Selu,
        backendName: 'cpu',
        kernelFunc: selu,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var sigmoid = unaryKernelFunc(tf.Sigmoid, function (xi) { return 1 / (1 + Math.exp(-xi)); });
    var sigmoidConfig = {
        kernelName: tf.Sigmoid,
        backendName: 'cpu',
        kernelFunc: sigmoid,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var sign = unaryKernelFunc(tf.Sign, function (xi) {
        if (xi < 0) {
            return -1;
        }
        else if (xi > 0) {
            return 1;
        }
        else {
            return 0;
        }
    });
    var signConfig = {
        kernelName: tf.Sign,
        backendName: 'cpu',
        kernelFunc: sign,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var sin = unaryKernelFunc(tf.Sin, function (xi) { return Math.sin(xi); });
    var sinConfig = {
        kernelName: tf.Sin,
        backendName: 'cpu',
        kernelFunc: sin,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var sinh = unaryKernelFunc(tf.Sinh, function (xi) { return Math.sinh(xi); });
    var sinhConfig = {
        kernelName: tf.Sinh,
        backendName: 'cpu',
        kernelFunc: sinh,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    // mirrors the implementation of tf.nn.softplus: https://goo.gl/vkcvwX
    // epsilon is the difference between 1.0 and the next representable float.
    // For a single precision 32 bit float this should be 2^-23, see:
    // https://math.byu.edu/~schow/work/IEEEFloatingPoint.htm
    var epsilon = 1.1920928955078125e-7;
    var threshold = Math.log(epsilon) + 2.0;
    var softplus = unaryKernelFunc(tf.Softplus, function (xi) {
        // Value above which exp(x) may overflow, but softplus(x) == x
        // is within machine epsilon.
        var tooLarge = xi > -threshold;
        // Value below which exp(x) may underflow, but softplus(x) == exp(x)
        // is within machine epsilon.
        var tooSmall = xi < threshold;
        var expX = Math.exp(xi);
        var result;
        if (tooSmall) {
            result = expX;
        }
        else if (tooLarge) {
            result = xi;
        }
        else {
            result = Math.log(1.0 + expX);
        }
        return result;
    });
    var softplusConfig = {
        kernelName: tf.Softplus,
        backendName: 'cpu',
        kernelFunc: softplus,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function transpose(args) {
        var inputs = args.inputs, attrs = args.attrs, backend = args.backend;
        var x = inputs.x;
        var perm = attrs.perm;
        assertNotComplex(x, 'transpose');
        var xRank = x.shape.length;
        var newShape = new Array(xRank);
        for (var i = 0; i < newShape.length; i++) {
            newShape[i] = x.shape[perm[i]];
        }
        var values = backend.data.get(x.dataId).values;
        var result = transposeImpl(values, x.shape, x.dtype, perm, newShape);
        var dataId = backend.write(result, newShape, x.dtype);
        return { dataId: dataId, shape: newShape, dtype: x.dtype };
    }
    var transposeConfig = {
        kernelName: tf.Transpose,
        backendName: 'cpu',
        kernelFunc: transpose
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function spaceToBatchND(args) {
        var inputs = args.inputs, backend = args.backend, attrs = args.attrs;
        var x = inputs.x;
        var blockShape = attrs.blockShape, paddings = attrs.paddings;
        assertNotComplex([x], 'spaceToBatchND');
        var prod = tf.util.sizeFromShape(blockShape);
        var completePaddings = [[0, 0]];
        completePaddings.push.apply(completePaddings, paddings);
        for (var i = 1 + blockShape.length; i < x.shape.length; ++i) {
            completePaddings.push([0, 0]);
        }
        var paddedX = padV2Config.kernelFunc({
            inputs: { x: x },
            backend: backend,
            attrs: { paddings: completePaddings, constantValue: 0 }
        });
        var reshapedPaddedShape = tf.backend_util.getReshaped(paddedX.shape, blockShape, prod, false);
        var permutedReshapedPaddedPermutation = tf.backend_util.getPermuted(reshapedPaddedShape.length, blockShape.length, false);
        var flattenShape = tf.backend_util.getReshapedPermuted(paddedX.shape, blockShape, prod, false);
        var reshapeInputs = { x: paddedX };
        var reshapeAttrs = { shape: reshapedPaddedShape };
        var paddedXReshaped = reshape({ inputs: reshapeInputs, backend: backend, attrs: reshapeAttrs });
        var transposeInputs = { x: paddedXReshaped };
        var transposeAttrs = { perm: permutedReshapedPaddedPermutation };
        var paddedXT = transpose({ inputs: transposeInputs, backend: backend, attrs: transposeAttrs });
        var resultReshapeInputs = { x: paddedXT };
        var resultReshapeAttrs = { shape: flattenShape };
        var result = reshape({ inputs: resultReshapeInputs, backend: backend, attrs: resultReshapeAttrs });
        backend.disposeIntermediateTensorInfo(paddedX);
        backend.disposeIntermediateTensorInfo(paddedXReshaped);
        backend.disposeIntermediateTensorInfo(paddedXT);
        return result;
    }
    var spaceToBatchNDConfig = {
        kernelName: tf.SpaceToBatchND,
        backendName: 'cpu',
        kernelFunc: spaceToBatchND
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var sqrt = unaryKernelFunc(tf.Sqrt, function (xi) { return Math.sqrt(xi); });
    var sqrtConfig = {
        kernelName: tf.Sqrt,
        backendName: 'cpu',
        kernelFunc: sqrt,
    };

    /**
     * @license
     * Copyright 2019 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var squareConfig = {
        kernelName: tf.Square,
        backendName: 'cpu',
        kernelFunc: function (_a) {
            var inputs = _a.inputs, backend = _a.backend;
            var x = inputs.x;
            var cpuBackend = backend;
            assertNotComplex(x, 'square');
            var values = cpuBackend.data.get(x.dataId).values;
            var newValues = new Float32Array(values.length);
            for (var i = 0; i < values.length; ++i) {
                var value = values[i];
                newValues[i] = value * value;
            }
            var dataId = cpuBackend.write(newValues, x.shape, x.dtype);
            return { dataId: dataId, shape: x.shape, dtype: x.dtype };
        }
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var step = unaryKernelFunc(tf.Step, function (xi, attrs) {
        var stepAttrs = attrs;
        if (isNaN(xi)) {
            return NaN;
        }
        else {
            return xi > 0 ? 1 : stepAttrs.alpha;
        }
    });
    var stepConfig = {
        kernelName: tf.Step,
        backendName: 'cpu',
        kernelFunc: step,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var tan = unaryKernelFunc(tf.Tan, function (xi) { return Math.tan(xi); });
    var tanConfig = {
        kernelName: tf.Tan,
        backendName: 'cpu',
        kernelFunc: tan,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    var tanh = unaryKernelFunc(tf.Tanh, function (xi) { return Math.tanh(xi); });
    var tanhConfig = {
        kernelName: tf.Tanh,
        backendName: 'cpu',
        kernelFunc: tanh,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the License);
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an AS IS BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    function unique(args) {
        var inputs = args.inputs, attrs = args.attrs, backend = args.backend;
        var axis = attrs.axis;
        var x = inputs.x;
        assertNotComplex(x, 'unique');
        var values = backend.data.get(x.dataId).values;
        var _a = uniqueImpl(values, axis, x.shape, x.dtype), outputValues = _a.outputValues, outputShape = _a.outputShape, indices = _a.indices;
        return [
            backend.makeTensorInfo(outputShape, x.dtype, outputValues),
            backend.makeTensorInfo([indices.length], 'int32', indices),
        ];
    }
    var uniqueConfig = {
        kernelName: tf.Unique,
        backendName: 'cpu',
        kernelFunc: unique,
    };

    /**
     * @license
     * Copyright 2020 Google LLC. All Rights Reserved.
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     * =============================================================================
     */
    // List all kernel configs here
    var kernelConfigs = [
        _fusedMatMulConfig,
        absConfig,
        acosConfig,
        acoshConfig,
        addConfig,
        asinConfig,
        asinhConfig,
        atanConfig,
        atanhConfig,
        avgPoolConfig,
        avgPoolBackpropConfig,
        batchMatMulConfig,
        batchNormConfig,
        castConfig,
        ceilConfig,
        clipConfig,
        complexConfig,
        concatConfig,
        conv2DBackpropFilterConfig,
        conv2DBackpropInputConfig,
        conv2DConfig,
        conv3DBackpropFilterV2Config,
        conv3DBackpropInputV2Config,
        conv3DConfig,
        cosConfig,
        coshConfig,
        depthwiseConv2dNativeConfig,
        depthwiseConv2dNativeBackpropFilterConfig,
        depthwiseConv2dNativeBackpropInputConfig,
        dilation2dConfig,
        dilation2dBackpropInputConfig,
        dilation2dBackpropFilterConfig,
        divConfig,
        eluConfig,
        erfConfig,
        expConfig,
        expm1Config,
        fftConfig,
        fillConfig,
        flipLeftRightConfig,
        floorConfig,
        fusedConv2DConfig,
        fusedDepthwiseConv2DConfig,
        identityConfig,
        ifftConfig,
        imagConfig,
        isFiniteConfig,
        isInfConfig,
        isNaNConfig,
        logConfig,
        log1pConfig,
        logicalNotConfig,
        maxPoolConfig,
        maxPoolBackpropConfig,
        maxPoolWithArgmaxConfig,
        maxConfig,
        mirrorPadConfig,
        multiplyConfig,
        nonMaxSuppressionV4Config,
        nonMaxSuppressionV5Config,
        notEqualConfig,
        padV2Config,
        preluConfig,
        realConfig,
        reciprocalConfig,
        reluConfig,
        relu6Config,
        reshapeConfig,
        rotateWithOffsetConfig,
        roundConfig,
        rsqrtConfig,
        seluConfig,
        sigmoidConfig,
        signConfig,
        sinConfig,
        sinhConfig,
        sliceConfig,
        softplusConfig,
        spaceToBatchNDConfig,
        sqrtConfig,
        squareConfig,
        squaredDifferenceConfig,
        stepConfig,
        subConfig,
        tanConfig,
        tanhConfig,
        transposeConfig,
        uniqueConfig,
    ];
    for (var _i = 0, kernelConfigs_1 = kernelConfigs; _i < kernelConfigs_1.length; _i++) {
        var kernelConfig = kernelConfigs_1[_i];
        tf.registerKernel(kernelConfig);
    }

    exports.MathBackendCPU = MathBackendCPU;
    exports.shared = shared;
    exports.version_cpu = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tf-backend-cpu.js.map
