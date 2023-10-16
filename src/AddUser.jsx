import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const navigate = useNavigate();

  const handleAddUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    const user = { email, password };

    /* send to backend via 'http://localhost:5000/users' */
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
            
          /* To show toast after navigate to all users page */
          setTimeout(() => {
            toast("user inserted successfully.");
          }, 2000);

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
            <h2 className="text-4xl text-center">Add User</h2>
            <form onSubmit={handleAddUser} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
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
                <button className="btn btn-primary">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AddUser;
