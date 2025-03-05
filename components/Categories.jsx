const Categories = () => {
  return (
    <select className="w-fit bg-blue-500 text-white p-2">
      <option>All</option>
      <option>Liquid</option>
      <option>Tablet</option>
      <option>Capsule</option>
      <option>Topical</option>
      <option>Suppository</option>
      <option>Inhaler</option>
      <option>Injection</option>
      <option>Drop</option>
    </select>

    // <ul className="flex flex-row gap-3 flex-wrap">
    //   <li className="bg-blue-100 py-1 px-2">Liquid</li>
    //   <li className="bg-blue-100 py-1 px-2">Tablet</li>
    //   <li className="bg-blue-100 py-1 px-2">Capsule</li>
    //   <li className="bg-blue-100 py-1 px-2">Topical</li>
    //   <li className="bg-blue-100 py-1 px-2">Suppository</li>
    //   <li className="bg-blue-100 py-1 px-2">Inhaler</li>
    //   <li className="bg-blue-100 py-1 px-2">Injection</li>
    //   <li className="bg-blue-100 py-1 px-2">Drop</li>
    // </ul>
  );
};

export default Categories;
