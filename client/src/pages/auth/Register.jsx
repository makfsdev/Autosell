import React, { useState } from "react";
import { Link } from "react-router-dom";
import fire from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../JS/actions/authaction";
import { LOGGED_IN_USER } from "../../JS/constants/actionTypes";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // console.log(email, password);

    try {
      await fire.auth().createUserWithEmailAndPassword(email, password);

      toast.success(`Inscription terminer avec succssé par  ${email}.
       `);
      const user = await fire.auth().currentUser;

      const idTokenResult = await user.getIdTokenResult();
      console.log(idTokenResult);

      // Redux
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
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
        })
        .catch((err) => console.log(err));

      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="wrapper fadeInDown mt-4">
      <div id="formContent">
        <div className="fadeIn first">
          <h2 className="text-center" id="icon">
            déjà inscrit ? <Link to="/login"> S'identifier</Link>
          </h2>
          <br />
          <h2 className="text-center" id="icon">
            Inscrivez-vous gratuitement maintenant
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
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
          <input type="submit" className="fadeIn fourth" value="S'inscrire" />
        </form>
      </div>
    </div>
  );
};

export default Register;
