import ItemContext from "@/Context/ItemContext";
import { useContext } from "react";

export default function Pagination() {
  const ctx = useContext(ItemContext);

  const allPages = [];
  for (let i = 1; i <= Math.ceil(ctx.filteredArr.length / 8); i++) {
    allPages.push(i);
  }

  return (
    <nav className="w-11/12 px-4 my-3 flex items-center justify-between sm:px-0">
      <div className="w-0 flex-1 flex mt-2">
        {ctx.page > 1 && (
          <a
            onClick={() => {
              ctx.setPage(ctx.page - 1);
            }}
            className="inline-flex items-center px-8 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ← Previous
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {allPages.map((el) => (
          <a
            onClick={() => {
              ctx.setPage(el);
            }}
            className={
              el === ctx.page
                ? "border-blue-500 text-blue-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            }
          >
            {el}
          </a>
        ))}
        {/* Current: "border-blue-500 text-blue-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
      </div>
      <div className=" w-0 flex-1 mt-2 flex justify-end">
        {ctx.filteredArr?.length > 0 && ctx.page !== allPages.length && (
          <button
            className="inline-flex items-center px-8 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              ctx.setPage(ctx.page + 1);
            }}
          >
            Next ➜
          </button>
        )}
      </div>
    </nav>
  );
}
