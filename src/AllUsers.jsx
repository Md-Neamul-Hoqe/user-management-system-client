import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  MdOutlineModeEdit,
  MdClose,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* import cssTransition from react-toastify & add any animation from https://animista.net/ in style file */
const swirl = cssTransition({
  enter: "swirl-in-fwd",
  exit: "swirl-out-bck",
});

const AllUsers = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (id) => {
    const confirmation = confirm("Are you confirm to delete the user?");

    if (confirmation) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            setUsers(users.filter((user) => user._id !== id));

            toast(`The user with id: ${id} is deleted.`, { transition: swirl });
          }
        });
    }
  };

  return (
    <section className="my-10 mx-10">
      <Link className="btn btn-accent" to="/addUser">
        {" "}
        <MdKeyboardDoubleArrowLeft /> Add User
      </Link>
      <table className="table table-fixed max-w-5xl mx-auto my-10">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th></th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users?.map((user, idx) => (
              <tr className="border" key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td className="text-center">
                  <Link
                    to={`/updateUser/${user._id}`}
                    className="btn text-blue-800 shadow-sm mr-1">
                    <MdOutlineModeEdit className="text-blue-800 text-xl font-extrabold" />
                  </Link>
                  <button
                    className="btn shadow-sm mr-1"
                    onClick={() => handleDelete(user._id)}>
                    <MdClose className="text-red-800 text-xl font-extrabold" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </section>
  );
};

export default AllUsers;
