function classes(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

interface Options {
  extra: string | undefined
}

interface ClassToggles {
  [k: string]: boolean
}

const scopedClassMaker = (prefix: string) =>
  (name: string | ClassToggles, options?: Options) =>
    Object
      .entries(name instanceof Object ? name : {[name]: true})
      .filter(kv => kv[1])
      .map(kv => kv[0])
      .map(name => [prefix, name]
        .filter(Boolean)
        .join('-'))
      .concat(options && options.extra || [])
      .join(' ');


export default classes;
export {scopedClassMaker};