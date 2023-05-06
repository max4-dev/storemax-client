export const paginationList = (NumberOfPages: number) => {
  let list = [];
  for (let i = 1; i <= NumberOfPages; i++) {
    list.push(i);
  }
  return list;
}