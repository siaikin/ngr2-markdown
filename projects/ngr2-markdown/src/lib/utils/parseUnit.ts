export class ParseUnit {
  static UNIT_MAP = {
    exist: false,
    child: {
      'b': {
        exist: false,
        child: {
          'v': {
            exist: true,
            child: {
            }
          }
        }
      },
      'c': {
        exist: false,
        child: {
          'i': {
            exist: true,
            child: {
            }
          },
          'p': {
            exist: true,
            child: {
            }
          }
        }
      },
      'h': {
        exist: false,
        child: {
          'c': {
            exist: true,
            child: {
            }
          },
          'l': {
            exist: true,
            child: {
              'r': {
                exist: true,
                child: {
                }
              }
            }
          },
          'v': {
            exist: true,
            child: {
            }
          }
        }
      },
      'i': {
        exist: false,
        child: {
          'v': {
            exist: true,
            child: {
            }
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
                child: {
                }
              }
            }
          },
          'm': {
            exist: true,
            child: {
            }
          },
          'c': {
            exist: true,
            child: {
            }
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
                    child: {
                    }
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
                child: {
                }
              },
            }
          },
        }
      },
      'q': {
        exist: true,
        child: {
        }
      },
      't': {
        exist: false,
        child: {
          'p': {
            exist: true,
            child: {
            }
          }
        }
      },
      'w': {
        exist: false,
        child: {
          'v': {
            exist: true,
            child: {
            }
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
                    child: {
                    }
                  }
                }
              }
            }
          },
          'e': {
            exist: true,
            child: {
            }
          },
          'p': {
            exist: true,
            child: {
            }
          }
        }
      }
    }
  };

  static checkUnit(str: string, unitMap: any = ParseUnit.UNIT_MAP, caseSensitive?: boolean): {
    unit: string,
    number: number
  } {
    if (!unitMap || !str) { return; }
    if (!caseSensitive) { str = str.toLocaleLowerCase(); }
    let i: number, isMatch = false;
    for (i = str.length - 1; i >= 0; i--) {
      const ascii = str.charCodeAt(i);
      if (ascii >= 48 && ascii <= 57) {
        isMatch = unitMap.exist;
        break;
      } else {
        if (!unitMap.child[str[i]]) { break; }
        unitMap = unitMap.child[str[i]];
      }
    }
    return isMatch ? {
      unit: str.substr(i + 1),
      number: Number.parseInt(str.substr(0, i + 1), 10)
    } : null;
  }
}
