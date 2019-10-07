let importAll = (requireContext) => requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('../icons/', true, /\.svg$/))
} catch (error) {
  /**
   *
   * 单元测试 没有require.context 导致控制台报错，所以注销
   *
   *
   * */

  // console.log(error)
}