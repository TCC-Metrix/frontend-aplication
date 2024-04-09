import "../BasicInput/BasicInput.css";
import "./BasicInputFilter.css";

function BasicInputFilter() {
  const items = [
    {
      description: "Paquímetro",
    },
    {
      description: "Paquímetro",
    },
    {
      description: "Paquímetro",
    },
    {
      description: "Paquímetro",
    },
  ];

  const setSelectedValue = (option: an) => {};

  return (
    <div>
      <div className="classe-little">
        <div className="entryarea">
          <input className="text-input" required />
          <div className="label-line text-major">sss</div>
        </div>
        <div className="search-itens no-absolut">
          <ul className="options-list">
            {items.map((option) => (
              <li onClick={() => setSelectedValue(option)}>
                {"name" in option ? option.name : option.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BasicInputFilter;
