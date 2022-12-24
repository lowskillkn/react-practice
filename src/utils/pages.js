export default function getPageCount(totalCount, limit) {
  return Math.ceil(totalCount / limit)
}