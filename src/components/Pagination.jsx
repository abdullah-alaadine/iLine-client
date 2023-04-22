const Pagination = ({ currentPage, numberOfPages, onPageChange }) => {
    const pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return <div className="flex flex-wrap gap-1 bg-slate-200">{pages}</div>;
  }
  