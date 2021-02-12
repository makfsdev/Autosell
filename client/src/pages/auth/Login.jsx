import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fire from "../../firebase";
import { toast } from "react-toastify";
import Loading from "../../components/nav/Loading";
import { createOrUpdateUser } from "../../JS/actions/authaction";

import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../JS/constants/actionTypes";

const Login = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);

    try {
      const result = await fire
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log(res);
          dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      toast.info(`Bienvenue de nouveau ${email.split("@")[0]} .`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="wrapper fadeInDown mt-4">
          <div id="formContent">
            <div className="fadeIn first">
              <h2 className="text-center" id="icon">
                S'identifier
              </h2>
            </div>

            <form onSubmit={handleLogin}>
              <input
                value={email}
                type="email"
                id="login"
                className="fadeIn second form-control"
                name="login"
                placeholder="Email"
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                type="password"
                required
                id="password"
                className="fadeIn third form-control"
                name="login"
                placeholder="Mot de pass"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                className="fadeIn fourth"
                value="Connecter"
              />
            </form>

            <div id="formFooter">
              <Link className="underlineHover" to="/forgot/password">
                mot de pass oublier?
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
