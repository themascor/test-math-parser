import { TestBed, inject } from '@angular/core/testing';

import { PreserService } from './preser.service';

describe('PreserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreserService]
    });
  });


  it('should be created', inject([PreserService], (service: PreserService) => {
    expect(service).toBeTruthy();
  }));
  describe('isNumber', () => {
    it(`isNumber() = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isNumber(''); // service as any - because is private method
        expect(rpn).toBeFalsy();
      }));
    it(`isNumber(5) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isNumber('5');
        expect(rpn).toBeTruthy();
      }));
    it(`isNumber(-1) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isNumber('-1');
        expect(rpn).toBeTruthy();
      }));
    it(`isNumber(0) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isNumber('0');
        expect(rpn).toBeTruthy();
      }));
    it(`isNumber(s1) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isNumber('s1');
        expect(rpn).toBeFalsy();
      }));
  })
  describe('isFunction', () => {
    it(`isFunction(+) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isFunction('+');
        expect(rpn).toBeFalsy();
      }));
    it(`isFunction(s1) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isFunction('s1');
        expect(rpn).toBeFalsy();
      }));
    it(`isFunction() = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isFunction('');
        expect(rpn).toBeFalsy();
      }));
    it(`isFunction(cos) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isFunction('cos');
        expect(rpn).toBeTruthy();
      }));
  })
  describe('isOperation', () => {
    it(`isOperation(+) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isOperation('+');
        expect(rpn).toBeTruthy();
      }));
    it(`isOperation(s1) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isOperation('s1');
        expect(rpn).toBeFalsy();
      }));
    it(`isOperation() = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isOperation('');
        expect(rpn).toBeFalsy();
      }));
    it(`isOperation(cos) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isOperation('cos');
        expect(rpn).toBeFalsy();
      }));
  })
  describe('isSepar', () => {
    it(`isSepar(,) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isSepar(',');
        expect(rpn).toBeTruthy();
      }));
    it(`isSepar(s1) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isSepar('s1');
        expect(rpn).toBeFalsy();
      }));
    it(`isSepar() = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isSepar('');
        expect(rpn).toBeFalsy();
      }));
    it(`isSepar(cos) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).isSepar('cos');
        expect(rpn).toBeFalsy();
      }));
  })
  describe('symCompare', () => {
    it(`symCompare(RkTV79v96W2NH,RkTV79v96W2NH) = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare('RkTV79v96W2NH', 'RkTV79v96W2NH');
        expect(rpn).toBeTruthy();
      }));
      it(`symCompare(' ',' ') = true`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare(' ', ' ');
        expect(rpn).toBeTruthy();
      }));
      it(`symCompare('','') = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare('', '');
        expect(rpn).toBeFalsy();
      }));
    it(`symCompare(s1,s2) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare('s1', 's2');
        expect(rpn).toBeFalsy();
      }));
    it(`symCompare(s1,'') = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare('s1', '');
        expect(rpn).toBeFalsy();
      }));
    it(`symCompare('','11') = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare(' ', '11');
        expect(rpn).toBeFalsy();
      }));
         it(`symCompare('',s1) = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare('', 's1');
        expect(rpn).toBeFalsy();
      }));
    it(`symCompare(' ', '_') = false`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).symCompare(' ', '_');
        expect(rpn).toBeFalsy();
      }));
  })
  describe('toRPN', () => {
    it(`(2+2)*2^2/2^cos(4-2^2) => ['2', '2', '+', '2', '2', '^', '*', '2', '4', '2', '2', '^', '-', 'cos', '^', '/']`,
      inject([PreserService], (service: PreserService) => {
        const rpn = (service as any).toRPN('(2+2)*2^2/2^cos(4-2^2)');
        expect(rpn).toEqual(['2', '2', '+', '2', '2', '^', '*', '2', '4', '2', '2', '^', '-', 'cos', '^', '/']);

      }));
  })

  describe('parse', () => {
    it(' () => throw error', inject([PreserService], (service: PreserService) => {
      service.pars('()', [])
        .then((rez) => {
          expect(rez).toBe(-2);
        })
        .catch((err) => {
          expect(true).toBe(true);
        });
    }));
    it(' "" => throw error', inject([PreserService], (service: PreserService) => {
      service.pars('', [])
        .then((rez) => {
          expect(rez).toBe(-2);
        })
        .catch((err) => {
          expect(true).toBe(true);
        });
    }));
    it('-2 = -2', inject([PreserService], (service: PreserService) => {
      service.pars('-2', [])
        .then((rez) => {
          expect(rez).toBe(-2);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
    it('2+2 = 4', inject([PreserService], (service: PreserService) => {
      service.pars('2+2', [])
        .then((rez) => {
          expect(rez).toBe(4);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));

    it('2+2*2 = 6', inject([PreserService], (service: PreserService) => {
      service.pars('2+2*2', [])
        .then((rez) => {
          expect(rez).toBe(6);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));

    it('(2+2)*2 = 8', inject([PreserService], (service: PreserService) => {
      service.pars('(2+2)*2', [])
        .then((rez) => {
          expect(rez).toBe(8);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
    it('(2+2)*2^2 = 16', inject([PreserService], (service: PreserService) => {
      service.pars('(2+2)*2^2', [])
        .then((rez) => {
          expect(rez).toBe(16);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
    it('(2+2)*2^2/2 = 8', inject([PreserService], (service: PreserService) => {
      service.pars('(2+2)*2^2/2', [])
        .then((rez) => {
          expect(rez).toBe(8);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
    it('cos(0) = 1', inject([PreserService], (service: PreserService) => {
      service.pars('cos(0)', [])
        .then((rez) => {
          expect(rez).toBe(1);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
    it('cos(4-2^2) = 1', inject([PreserService], (service: PreserService) => {
      service.pars('cos(4-2^2)', [])
        .then((rez) => {
          expect(rez).toBe(1);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
    it('(2+2)*2^2/2^cos(4-2^2) = 8', inject([PreserService], (service: PreserService) => {
      service.pars('(2+2)*2^2/2^cos(4-2^2)', [])
        .then((rez) => {
          expect(rez).toBe(8);
        })
        .catch((err) => {
          expect(false).toBe(true);
        });
    }));
  })
});
