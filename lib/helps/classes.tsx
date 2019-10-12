function classes(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

interface Options {
  extra: string | undefined
}

interface ClassToggles{
  [k: string]: boolean
}

function scopedClassMaker(prefix: string) {
  return function (name: string | ClassToggles, options?: Options) {
    const result = Object
      .entries(name instanceof Object ? name: {[name]:true})
      .filter(kv => kv[1])
      .map(kv => kv[0])
      .map(name => [prefix, name]
        .filter(Boolean)
        .join('-'))
      .join(' ')

    if (options && options.extra) {
      return [result, options && options.extra].filter(Boolean).join(' ');
    } else {
      return result;
    }
  };
}

export default classes;
export {scopedClassMaker};