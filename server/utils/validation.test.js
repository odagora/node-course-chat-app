const expect = require('expect');
//import isRealString
const {isRealString} = require('./validation');

//isRealString tests:
describe('isRealString', () => {
    it('should reject non-string values', () => {
      var str = 12345;
      var string = isRealString(str);
      expect(string).toBe(false);
    });
    it('should reject string with only spaces', () => {
      var string = isRealString('    ');
      expect(string).toBe(false);
    });
    it('should allow string with non-space characters', () => {
      var string = isRealString('   daniel  ');
      expect(string).toBe(true);
    });
});
