/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ParseUnit {
    /**
     * @param {?} str
     * @param {?=} unitMap
     * @param {?=} caseSensitive
     * @return {?}
     */
    static checkUnit(str, unitMap = ParseUnit.UNIT_MAP, caseSensitive) {
        if (!unitMap || !str) {
            return;
        }
        if (!caseSensitive) {
            str = str.toLocaleLowerCase();
        }
        /** @type {?} */
        let i;
        /** @type {?} */
        let isMatch = false;
        for (i = str.length - 1; i >= 0; i--) {
            /** @type {?} */
            const ascii = str.charCodeAt(i);
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
    }
}
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
if (false) {
    /** @type {?} */
    ParseUnit.UNIT_MAP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VVbml0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdyMi1tYXJrZG93bi8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9wYXJzZVVuaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxTQUFTOzs7Ozs7O0lBc0xwQixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQVcsRUFBRSxVQUFlLFNBQVMsQ0FBQyxRQUFRLEVBQUUsYUFBdUI7UUFJdEYsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNqQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQUU7O1lBQ2xELENBQVM7O1lBQUUsT0FBTyxHQUFHLEtBQUs7UUFDOUIsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQzlCLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU07YUFDUDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFBRSxNQUFNO2lCQUFFO2dCQUN0QyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNGO1FBQ0QsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixNQUFNLEVBQUUsTUFB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Z0JBQ0wsR0FBRyxFQUFFO29CQUNILEtBQUssRUFBRSxJQUFJO29CQUNYLEtBQUssRUFBRSxFQUNOO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELEdBQUcsRUFBRTtZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFO2dCQUNMLEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsRUFDTjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxHQUFHLEVBQUU7WUFDSCxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRTtnQkFDTCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLEtBQUs7b0JBQ1osS0FBSyxFQUFFO3dCQUNMLEdBQUcsRUFBRTs0QkFDSCxLQUFLLEVBQUUsS0FBSzs0QkFDWixLQUFLLEVBQUU7Z0NBQ0wsR0FBRyxFQUFFO29DQUNILEtBQUssRUFBRSxJQUFJO29DQUNYLEtBQUssRUFBRSxFQUNOO2lDQUNGOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO2dCQUNELEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxLQUFLLEVBQUUsRUFDTjtpQkFDRjtnQkFDRCxHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLEVBQ047aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDOzs7SUFuTEYsbUJBbUxFIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFBhcnNlVW5pdCB7XHJcbiAgc3RhdGljIFVOSVRfTUFQID0ge1xyXG4gICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgY2hpbGQ6IHtcclxuICAgICAgJ2InOiB7XHJcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAndic6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICdjJzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ2knOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ3AnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAnaCc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICdjJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICdsJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAncic6IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAndic6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICdpJzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ3YnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAnbSc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICdlJzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAncic6IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnbSc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnYyc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICduJzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ2knOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICAgICdtJzoge1xyXG4gICAgICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgICAgJ3YnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICdwJzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ2EnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAnYyc6IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgJ3EnOiB7XHJcbiAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICd0Jzoge1xyXG4gICAgICAgIGV4aXN0OiBmYWxzZSxcclxuICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgJ3AnOiB7XHJcbiAgICAgICAgICAgIGV4aXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAndyc6IHtcclxuICAgICAgICBleGlzdDogZmFsc2UsXHJcbiAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICd2Jzoge1xyXG4gICAgICAgICAgICBleGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgJ3gnOiB7XHJcbiAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAnYSc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBjaGlsZDoge1xyXG4gICAgICAgICAgICAgICdtJzoge1xyXG4gICAgICAgICAgICAgICAgZXhpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgICAgJ3YnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnZSc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAncCc6IHtcclxuICAgICAgICAgICAgZXhpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgY2hlY2tVbml0KHN0cjogc3RyaW5nLCB1bml0TWFwOiBhbnkgPSBQYXJzZVVuaXQuVU5JVF9NQVAsIGNhc2VTZW5zaXRpdmU/OiBib29sZWFuKToge1xyXG4gICAgdW5pdDogc3RyaW5nLFxyXG4gICAgbnVtYmVyOiBudW1iZXJcclxuICB9IHtcclxuICAgIGlmICghdW5pdE1hcCB8fCAhc3RyKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7IHN0ciA9IHN0ci50b0xvY2FsZUxvd2VyQ2FzZSgpOyB9XHJcbiAgICBsZXQgaTogbnVtYmVyLCBpc01hdGNoID0gZmFsc2U7XHJcbiAgICBmb3IgKGkgPSBzdHIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgYXNjaWkgPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgaWYgKGFzY2lpID49IDQ4ICYmIGFzY2lpIDw9IDU3KSB7XHJcbiAgICAgICAgaXNNYXRjaCA9IHVuaXRNYXAuZXhpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCF1bml0TWFwLmNoaWxkW3N0cltpXV0pIHsgYnJlYWs7IH1cclxuICAgICAgICB1bml0TWFwID0gdW5pdE1hcC5jaGlsZFtzdHJbaV1dO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNNYXRjaCA/IHtcclxuICAgICAgdW5pdDogc3RyLnN1YnN0cihpICsgMSksXHJcbiAgICAgIG51bWJlcjogTnVtYmVyLnBhcnNlSW50KHN0ci5zdWJzdHIoMCwgaSArIDEpLCAxMClcclxuICAgIH0gOiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=