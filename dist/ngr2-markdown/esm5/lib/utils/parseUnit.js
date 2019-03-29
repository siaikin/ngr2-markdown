/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ParseUnit = /** @class */ (function () {
    function ParseUnit() {
    }
    /**
     * @param {?} str
     * @param {?=} unitMap
     * @param {?=} caseSensitive
     * @return {?}
     */
    ParseUnit.checkUnit = /**
     * @param {?} str
     * @param {?=} unitMap
     * @param {?=} caseSensitive
     * @return {?}
     */
    function (str, unitMap, caseSensitive) {
        if (unitMap === void 0) { unitMap = ParseUnit.UNIT_MAP; }
        if (!unitMap || !str) {
            return;
        }
        if (!caseSensitive) {
            str = str.toLocaleLowerCase();
        }
        /** @type {?} */
        var i;
        /** @type {?} */
        var isMatch = false;
        for (i = str.length - 1; i >= 0; i--) {
            /** @type {?} */
            var ascii = str.charCodeAt(i);
            if (ascii >= 48 && ascii <= 57) {
                isMatch = unitMap.exist;
                break;
            }
            else {
                if (!unitMap.child[str[i]]) {
                    break;
                }
                unitMap = unitMap.child[str[i]];
            }
        }
        return isMatch ? {
            unit: str.substr(i + 1),
            number: Number.parseInt(str.substr(0, i + 1), 10)
        } : null;
    };
    ParseUnit.UNIT_MAP = {
        exist: false,
        child: {
            'b': {
                exist: false,
                child: {
                    'v': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'c': {
                exist: false,
                child: {
                    'i': {
                        exist: true,
                        child: {}
                    },
                    'p': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'h': {
                exist: false,
                child: {
                    'c': {
                        exist: true,
                        child: {}
                    },
                    'l': {
                        exist: true,
                        child: {
                            'r': {
                                exist: true,
                                child: {}
                            }
                        }
                    },
                    'v': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'i': {
                exist: false,
                child: {
                    'v': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'm': {
                exist: false,
                child: {
                    'e': {
                        exist: true,
                        child: {
                            'r': {
                                exist: true,
                                child: {}
                            }
                        }
                    },
                    'm': {
                        exist: true,
                        child: {}
                    },
                    'c': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'n': {
                exist: false,
                child: {
                    'i': {
                        exist: true,
                        child: {
                            'm': {
                                exist: false,
                                child: {
                                    'v': {
                                        exist: true,
                                        child: {}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'p': {
                exist: false,
                child: {
                    'a': {
                        exist: false,
                        child: {
                            'c': {
                                exist: true,
                                child: {}
                            },
                        }
                    },
                }
            },
            'q': {
                exist: true,
                child: {}
            },
            't': {
                exist: false,
                child: {
                    'p': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'w': {
                exist: false,
                child: {
                    'v': {
                        exist: true,
                        child: {}
                    }
                }
            },
            'x': {
                exist: false,
                child: {
                    'a': {
                        exist: false,
                        child: {
                            'm': {
                                exist: false,
                                child: {
                                    'v': {
                                        exist: true,
                                        child: {}
                                    }
                                }
                            }
                        }
                    },
                    'e': {
                        exist: true,
                        child: {}
                    },
                    'p': {
                        exist: true,
                        child: {}
                    }
                }
            }
        }
    };
    return ParseUnit;
}());
export { ParseUnit };
if (false) {
    /** @type {?} */
    ParseUnit.UNIT_MAP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VVbml0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9wYXJzZVVuaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBQUE7SUE0TUEsQ0FBQzs7Ozs7OztJQXRCUSxtQkFBUzs7Ozs7O0lBQWhCLFVBQWlCLEdBQVcsRUFBRSxPQUFpQyxFQUFFLGFBQXVCO1FBQTFELHdCQUFBLEVBQUEsVUFBZSxTQUFTLENBQUMsUUFBUTtRQUk3RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FBRTs7WUFDbEQsQ0FBUzs7WUFBRSxPQUFPLEdBQUcsS0FBSztRQUM5QixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDOUIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksS0FBSyxJQUFJLEVBQUUsSUFBSSxLQUFLLElBQUksRUFBRSxFQUFFO2dCQUM5QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsTUFBTTthQUNQO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUFFLE1BQU07aUJBQUU7Z0JBQ3RDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7UUFDRCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FB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Q0QsR0FBRyxFQUFFO2dCQUNILEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRTtvQkFDTCxHQUFHLEVBQUU7d0JBQ0gsS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLEVBQ047cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELEdBQUcsRUFBRTtnQkFDSCxLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUU7b0JBQ0wsR0FBRyxFQUFFO3dCQUNILEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxFQUNOO3FCQUNGO2lCQUNGO2FBQ0Y7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFO29CQUNMLEdBQUcsRUFBRTt3QkFDSCxLQUFLLEVBQUUsS0FBSzt3QkFDWixLQUFLLEVBQUU7NEJBQ0wsR0FBRyxFQUFFO2dDQUNILEtBQUssRUFBRSxLQUFLO2dDQUNaLEtBQUssRUFBRTtvQ0FDTCxHQUFHLEVBQUU7d0NBQ0gsS0FBSyxFQUFFLElBQUk7d0NBQ1gsS0FBSyxFQUFFLEVBQ047cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsR0FBRyxFQUFFO3dCQUNILEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxFQUNOO3FCQUNGO29CQUNELEdBQUcsRUFBRTt3QkFDSCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxLQUFLLEVBQUUsRUFDTjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7S0FDRixDQUFDO0lBd0JKLGdCQUFDO0NBQUEsQUE1TUQsSUE0TUM7U0E1TVksU0FBUzs7O0lBQ3BCLG1CQW1MRSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQYXJzZVVuaXQge1xyXG4gIHN0YXRpYyBVTklUX01BUCA9IHtcclxuICAgIGV4aXN0OiBmYWxzZSxcclxuICAgIGNoaWxkOiB7XHJcbiAgICAgICdiJzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ3YnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAnYyc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICdpJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICdwJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgJ2gnOiB7XHJcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAnYyc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnbCc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgJ3InOiB7XHJcbiAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ3YnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAnaSc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICd2Jzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgJ20nOiB7XHJcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAnZSc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgJ3InOiB7XHJcbiAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ20nOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ2MnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAnbic6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICdpJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAnbSc6IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICAgICd2Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAncCc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICdhJzoge1xyXG4gICAgICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgJ2MnOiB7XHJcbiAgICAgICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICdxJzoge1xyXG4gICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAndCc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICdwJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgJ3cnOiB7XHJcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAndic6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICd4Jzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ2EnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAnbSc6IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICAgICd2Jzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ2UnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ3AnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNoZWNrVW5pdChzdHI6IHN0cmluZywgdW5pdE1hcDogYW55ID0gUGFyc2VVbml0LlVOSVRfTUFQLCBjYXNlU2Vuc2l0aXZlPzogYm9vbGVhbik6IHtcclxuICAgIHVuaXQ6IHN0cmluZyxcclxuICAgIG51bWJlcjogbnVtYmVyXHJcbiAgfSB7XHJcbiAgICBpZiAoIXVuaXRNYXAgfHwgIXN0cikgeyByZXR1cm47IH1cclxuICAgIGlmICghY2FzZVNlbnNpdGl2ZSkgeyBzdHIgPSBzdHIudG9Mb2NhbGVMb3dlckNhc2UoKTsgfVxyXG4gICAgbGV0IGk6IG51bWJlciwgaXNNYXRjaCA9IGZhbHNlO1xyXG4gICAgZm9yIChpID0gc3RyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IGFzY2lpID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgIGlmIChhc2NpaSA+PSA0OCAmJiBhc2NpaSA8PSA1Nykge1xyXG4gICAgICAgIGlzTWF0Y2ggPSB1bml0TWFwLmV4aXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdW5pdE1hcC5jaGlsZFtzdHJbaV1dKSB7IGJyZWFrOyB9XHJcbiAgICAgICAgdW5pdE1hcCA9IHVuaXRNYXAuY2hpbGRbc3RyW2ldXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzTWF0Y2ggPyB7XHJcbiAgICAgIHVuaXQ6IHN0ci5zdWJzdHIoaSArIDEpLFxyXG4gICAgICBudW1iZXI6IE51bWJlci5wYXJzZUludChzdHIuc3Vic3RyKDAsIGkgKyAxKSwgMTApXHJcbiAgICB9IDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19