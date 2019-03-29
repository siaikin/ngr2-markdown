export declare class ParseUnit {
    static UNIT_MAP: {
        exist: boolean;
        child: {
            'b': {
                exist: boolean;
                child: {
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'c': {
                exist: boolean;
                child: {
                    'i': {
                        exist: boolean;
                        child: {};
                    };
                    'p': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'h': {
                exist: boolean;
                child: {
                    'c': {
                        exist: boolean;
                        child: {};
                    };
                    'l': {
                        exist: boolean;
                        child: {
                            'r': {
                                exist: boolean;
                                child: {};
                            };
                        };
                    };
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'i': {
                exist: boolean;
                child: {
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'm': {
                exist: boolean;
                child: {
                    'e': {
                        exist: boolean;
                        child: {
                            'r': {
                                exist: boolean;
                                child: {};
                            };
                        };
                    };
                    'm': {
                        exist: boolean;
                        child: {};
                    };
                    'c': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'n': {
                exist: boolean;
                child: {
                    'i': {
                        exist: boolean;
                        child: {
                            'm': {
                                exist: boolean;
                                child: {
                                    'v': {
                                        exist: boolean;
                                        child: {};
                                    };
                                };
                            };
                        };
                    };
                };
            };
            'p': {
                exist: boolean;
                child: {
                    'a': {
                        exist: boolean;
                        child: {
                            'c': {
                                exist: boolean;
                                child: {};
                            };
                        };
                    };
                };
            };
            'q': {
                exist: boolean;
                child: {};
            };
            't': {
                exist: boolean;
                child: {
                    'p': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'w': {
                exist: boolean;
                child: {
                    'v': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
            'x': {
                exist: boolean;
                child: {
                    'a': {
                        exist: boolean;
                        child: {
                            'm': {
                                exist: boolean;
                                child: {
                                    'v': {
                                        exist: boolean;
                                        child: {};
                                    };
                                };
                            };
                        };
                    };
                    'e': {
                        exist: boolean;
                        child: {};
                    };
                    'p': {
                        exist: boolean;
                        child: {};
                    };
                };
            };
        };
    };
    static checkUnit(str: string, unitMap?: any, caseSensitive?: boolean): {
        unit: string;
        number: number;
    };
}
