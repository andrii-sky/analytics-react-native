export const chunk = (array, size) => {
  if (!array.length || !size) {
    return [];
  }

  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(array.length / size));

  while (index < array.length) {
    result[resIndex++] = array.slice(index, index += size);
  }

  return result;
};
export const getAllPlugins = timeline => {
  const allPlugins = Object.values(timeline.plugins);

  if (allPlugins.length) {
    return allPlugins.reduce(function () {
      let prev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let curr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return prev.concat(curr);
    });
  }

  return [];
};
export const getPluginsWithFlush = timeline => {
  if (!timeline) {
    return [];
  }

  const allPlugins = getAllPlugins(timeline); // checking for the existence of .flush()

  const eventPlugins = allPlugins === null || allPlugins === void 0 ? void 0 : allPlugins.filter(f => f.flush);
  return eventPlugins;
};
//# sourceMappingURL=util.js.map