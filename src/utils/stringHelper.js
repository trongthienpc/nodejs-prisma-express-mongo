export const createAliasString = (str) => {
  // Convert the string to lowercase and replace spaces with hyphens
  let alias = str.trim().toLowerCase().replace(/\s+/g, "-");
  // Replace Vietnamese characters with their corresponding English characters
  alias = alias.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
  alias = alias.replace(/[èéẹẻẽêềếệểễ]/g, "e");
  alias = alias.replace(/[ìíịỉĩ]/g, "i");
  alias = alias.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
  alias = alias.replace(/[ùúụủũưừứựửữ]/g, "u");
  alias = alias.replace(/[ỳýỵỷỹ]/g, "y");
  alias = alias.replace(/đ/g, "d");
  return alias;
};
