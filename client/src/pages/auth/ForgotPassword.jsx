import React, { useEffect, useState } from "react";
import fire from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../../components/nav/Loading";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleReset = async (e) => {
    console.log(email);
    e.preventDefault();
    setLoading(true);

    const ActionCodeSettings = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await fire
      .auth()
      .sendPasswordResetEmail(email, ActionCodeSettings)

      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(
          "Verifier le lien dans votre boite email pour changer de mot de pass"
        );
        history.push("/login");
      })

      .catch((error) => {
        setLoading(false);
        console.error("ERROR MSG IN FORGOT PASSWORD", error);
        toast.error(error.message);
      });
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
                Mot de pass oublier
              </h2>
            </div>

            <form onSubmit={handleReset}>
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
                type="submit"
                className="fadeIn fourth"
                value="Valider"
                disabled={!email}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
