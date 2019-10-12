import classes, {scopedClassMaker} from '../classes';

describe('classes', () => {
  it('接受 1 个 className', () => {
    const result = classes('a')
    expect(result).toEqual('a');
  });
  it('接受 2 个 className', () => {
    const result = classes('a', 'b')
    expect(result).toEqual('a b');
  });
  it('接受 0 个 className', () => {
    const result = classes()
    expect(result).toEqual('');
  });
  it('接受 undefined 结果不出现 undefined', () => {
    const result = classes('a', undefined)
    expect(result).toEqual('a');
  });
  it('接受 undefined null false 中文 等特殊值', () => {
    const result = classes('a', undefined, false, null, '晴天')
    expect(result).toEqual('a 晴天');
  });
});
describe('scopedClassMaker', () => {
  it('接受字符串或对象', () => {
    const sc = scopedClassMaker('theone-test')
    expect(sc('')).toEqual('theone-test');
    expect(sc('x')).toEqual('theone-test-x');
    expect(sc({y: true, z: false})).toEqual('theone-test-y');
    expect(sc({y: true, z: true})).toEqual('theone-test-y theone-test-z')
    expect(sc({y: true, z: true}, {extra: 'red'})).toEqual('theone-test-y theone-test-z red')
  })
})