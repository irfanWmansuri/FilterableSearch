import { useState, useEffect } from "react"

export default function FilterSearch() {
  const [text, setText] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function search() {
      let url = "https://jsonplaceholder.typicode.com/users";
      let response = await fetch(url)

      // if(response.status == 200){
      let admin = await response.json();
      setUserData(admin);
      setIsLoading(false);
      console.log(admin);
      // }
    }
    search();
  }, [])

  return (
    <>
      {isLoading ? <p>Loading ...</p> : (
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
      )
      }
      <br />
      <div className="inputbox w-2/5 m-auto text-center">
        <input type="text" placeholder="Search by keyword" className="rounded-md" onChange={e => { setText(e.target.value) }} />
        <button type="submit" className="text-green-600 bg-black ml-1 rounded-md">Search</button>
        <h1 className="text-3xl font-bold mt-5">You Searched <span>{text}</span></h1>
      </div>
    </>
  )
}
