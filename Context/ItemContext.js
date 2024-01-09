import { createContext, useState } from "react";

export const ItemContext = createContext({
  items: [],
  setItems: () => {},
  filteredArr: [],
  setFilteredArr: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  page: 1,
  setPage: () => {},
});
export const ItemContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);

  const changeItems = (items) => {
    setItems(items);
  };
  const changeFilterArr = (arr) => {
    setFilteredArr(arr);
  };

  const changeAdmin = (status) => {
    setIsAdmin(status);
  };
  const changePage = (page) => {
    setPage(page);
  };
  return (
    <ItemContext.Provider
      value={{
        items: items,
        setItems: changeItems,
        filteredArr: filteredArr,
        setFilteredArr: changeFilterArr,
        isAdmin: isAdmin,
        setIsAdmin: changeAdmin,
        page: page,
        setPage: changePage,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};
export default ItemContext;
