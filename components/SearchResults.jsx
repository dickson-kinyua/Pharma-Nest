import Link from "next/link";

const SearchResults = ({ results }) => {
  // console.log(results);

  return (
    <ul className="flex flex-col gap-2 px-3 py-5 border absolute top-[46px] bg-slate-50 w-full z-20  shadow-gray-500  shadow-inner">
      {results.map((result) => (
        <Link href={`/listing/${result._id}`} key={result._id}>
          <li
            className="flex flex-row border-b items-center
             border-gray-300 gap-3"
          >
            <img
              src={result.imageUrl}
              alt={result.title}
              className="w-10 h-10"
            />
            <p className="w-24 truncate">{result.title}</p>
            <p className="font-bold">In</p>
            <p className="w-20">{result.category}</p>
            <p>↗</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchResults;
