export function getGitHubColorClass(count: number) {
  if (count === 0)
    return "bg-gray-100  text-gray-400 border border-gray-200 hover:bg-gray-200 ";
  if (count === 1)
    return "bg-green-100  text-green-700  border border-green-200  hover:bg-green-200 ";
  if (count <= 3)
    return "bg-green-300  text-green-800  border border-green-400  hover:bg-green-400 ";
  if (count <= 6)
    return "bg-green-500  text-white border border-green-600 hover:bg-green-600 ";
  return "bg-green-900  text-white border border-green-900 hover:bg-green-900 ";
}
