import { useState, useEffect } from "react";

export default function FilterSearch() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [isKeywordFound, setIsKeywordFound] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let url = "https://jsonplaceholder.typicode.com/users";
      let response = await fetch(url);
      let admin = await response.json();
      setUserData(admin);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setText(keyword);

    // Check if the keyword exists in any row
    const found = userData.some((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(keyword)
      )
    );
    setIsKeywordFound(found);
  };

  const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", color:"#000" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {!isKeywordFound && text ? (
            <h1 className="text-red-500 text-3xl text-center">
              "{text}" Doesn't Exist in The Data.
            </h1>
          ) : (
            <table className="p-5 bg-black border-solid box-border">
              <thead>
                <tr className="text-red-50">
                  <th>id</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.id} className="text-green-600">
                    <td>{highlightText(user.id.toString(), text)}</td>
                    <td>{highlightText(user.name, text)}</td>
                    <td>{highlightText(user.username, text)}</td>
                    <td>{highlightText(user.email, text)}</td>
                    <td>{highlightText(user.address.city, text)}</td>
                    <td>{highlightText(user.phone, text)}</td>
                    <td>{highlightText(user.website, text)}</td>
                    <td>{highlightText(user.company.name, text)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      <br />
      <div className="inputbox w-2/5 m-auto text-center">
        <input
          type="text"
          placeholder="Search by keyword..."
          className="rounded-md"
          onChange={handleSearch}
        />
        <h1 className="text-3xl font-bold mt-5">
          You Searched <span>"{text}"</span>
        </h1>
      </div>
    </>
  );
}
