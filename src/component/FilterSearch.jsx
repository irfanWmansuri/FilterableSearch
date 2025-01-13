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

    const found = userData.some((user) =>
      searchUser(user, keyword)
    );
    setIsKeywordFound(found);
  };

  const searchUser = (user, keyword) => {
    // Flatten relevant user fields for easier search
    const searchFields = [
      user.id,
      user.name,
      user.username,
      user.email,
      user.address.city,
      user.phone,
      user.website,
      user.company.name,
    ];

    return searchFields.some((field) =>
      String(field).toLowerCase().includes(keyword)
    );
  };

  const isRowHighlighted = (user, keyword) => {
    return searchUser(user, keyword);
  };

  return (
    <>
      {isLoading ? (
        <p className="text-bold">Loading ...</p>
      ) : (
        <>
          {!isKeywordFound && text ? (
            <h1 className="text-red-500 text-3xl text-center">
              {text ? `"${text}"` : null} Keyword Is Not Found
            </h1>
          ) : (
            <table className="p-5 bg-black border-solid box-border w-full">
              <thead>
                <tr className="text-white">
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
                  <tr
                    key={user.id}
                    className={
                      text && isRowHighlighted(user, text) ? "bg-yellow-400 text-black" : "bg-black text-green-500"} >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <div className="inputbox w-2/5 m-auto text-center">
            <input
              type="text"
              placeholder="Search by Name..."
              className="rounded-md"
              onChange={handleSearch}
            />
            <h1 className="text-3xl font-bold mt-5">
              You Searched <span>{text ? `"${text}"` : null}</span>
            </h1>
          </div>
        </>
      )}
    </>
  );
}
