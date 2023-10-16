import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const UpdateUser = () => {
  /* this user get from AllUsers page after clicking Edit button. Then fetch from the server using the id (app.get)  */
  const toBeUpdatedUser = useLoaderData();

  const navigate = useNavigate();

  console.log(toBeUpdatedUser);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    const user = { email, password };

    /**
     * If get
     *  PUT http://localhost:5000/users/652906d5990d874d85431421 net::ERR_CONNECTION_REFUSED
     * Error the check is the server running or not
     * */

    /* send to backend via 'http://localhost:5000/users' */
    fetch(`http://localhost:5000/users/${toBeUpdatedUser._id}`, {
      /* if use put then must the property values are present in the database user object. To modify & add new property use PATCH */
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          alert("user updated");

          navigate("/allUsers");
        }
      });
  };

  return (
    <section>
      <div className="m-10 min-h-screen">
        <Link to="/allUsers" className="btn btn-accent">
          <MdKeyboardDoubleArrowLeft /> All Users
        </Link>
        <div className="hero-content flex-col items-start max-w-5xl my-10 mx-auto">
          <div className="card w-full">
            <h2 className="text-4xl text-center">
              Update User: {toBeUpdatedUser.email}
            </h2>
            <form onSubmit={handleUpdateUser} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  defaultValue={toBeUpdatedUser.email}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  defaultValue={toBeUpdatedUser.password}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
