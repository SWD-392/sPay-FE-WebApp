import Image from "next/image";
import styles from "./search.module.css";
import searchIcon from "@public/icon/search.svg";

const Search = () => {
  return (
    <div className={`${styles.searchGroup} me-2 mb-2`}>
      <form
        action=""
        className="nd-header-search-form"
        //    onSubmit={onSearch}
      >
        <input
          type="text"
          name="query"
          className="search-auto "
          placeholder="Tìm kiếm..."
          autoComplete="off"
          id=""
          //   onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input type="hidden" name="type" value="product" />
        <button className="btn btn-default" type="submit" aria-label="Tìm kiếm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4057 12.4769C16.0756 10.1337 15.8595 6.85958 13.7572 4.75736C11.4141 2.41421 7.61509 2.41421 5.27195 4.75736C2.9288 7.1005 2.9288 10.8995 5.27195 13.2426C7.37417 15.3449 10.6483 15.561 12.9915 13.8911L18.707 19.6066L20.1212 18.1924L14.4057 12.4769ZM12.343 6.17157C13.9051 7.73367 13.9051 10.2663 12.343 11.8284C10.7809 13.3905 8.24826 13.3905 6.68616 11.8284C5.12406 10.2663 5.12406 7.73367 6.68616 6.17157C8.24826 4.60948 10.7809 4.60948 12.343 6.17157Z"
              fill="#333333"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
