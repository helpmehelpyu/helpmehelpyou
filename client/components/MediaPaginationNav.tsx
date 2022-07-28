interface Props {
  currentPageNumber: number;
  totalPages: number;
  setCurrentPageNumber: (val: number) => void;
}

export function MediaPaginationNav({
  currentPageNumber,
  setCurrentPageNumber,
  totalPages,
}: Props) {
  const pages: JSX.Element[] = [];
  const pageCountLimit = 7;
  const pagePaddingCount = Math.floor(pageCountLimit / 2); // TODO find a better variable name for this

  let endPageNum = Math.min(totalPages, 7);
  let startPageNum = 0;
  if (currentPageNumber + 1 >= pageCountLimit) {
    endPageNum = Math.min(totalPages, currentPageNumber + pagePaddingCount + 1);
    startPageNum = Math.max(currentPageNumber - pagePaddingCount, 0);
  }

  pages.push(
    <li
      key="prev"
      className="rounded-full flex justify-center items-center aspect-square text-xl select-none hover:bg-slate-200 w-20 h-20 cursor-pointer transition duration-500"
      onClick={() => setCurrentPageNumber(Math.max(currentPageNumber - 1, 0))}
    >
      ❮
    </li>
  );
  for (let i = startPageNum; i < endPageNum; i++) {
    pages.push(
      <li
        key={i}
        className={
          'rounded-full flex justify-center items-center aspect-square text-2xl select-none hover:bg-slate-200 w-20 h-20 cursor-pointer transition duration-500' +
          (i == currentPageNumber ? ' font-bold' : '')
        }
        onClick={() => setCurrentPageNumber(i)}
      >
        {i + 1}
      </li>
    );
  }
  pages.push(
    <li
      key="next"
      className="rounded-full flex justify-center items-center aspect-square text-xl select-none hover:bg-slate-200 w-20 h-20 cursor-pointer transition duration-500"
      onClick={() =>
        setCurrentPageNumber(Math.min(currentPageNumber + 1, totalPages - 1))
      }
    >
      ❯
    </li>
  );

  return (
    <div className="hidden md2:flex md2:justify-center md2:w-full">
      <ul className="flex justify-center items-center">{pages}</ul>
    </div>
  );
}
