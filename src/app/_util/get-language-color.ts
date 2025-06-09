export const getLanguageColor = (language: string = "") => {
  switch (language.toLowerCase()) {
    case "python":
      return "bg-blue-50 text-blue-800";
    case "javascript":
      return "bg-yellow-50 text-yellow-800";
    case "java":
      return "bg-orange-50 text-orange-800";
    case "node.js":
      return "bg-purple-50 text-purple-800";
    default:
      return "bg-gray-50 text-gray-800";
  }
};
