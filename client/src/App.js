import { useEffect, lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

// import Home from "./pages/public/Home";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Header from "./components/nav/Header";
// import Footer from "./components/nav/Footer";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import UserRoute from "./components/routes/UserRoutes";
// import AdminRoute from "./components/routes/AdminRoute";
// import Marque from "./pages/admin/Marque";
// import Dashboard from "./pages/admin/Dashboard";
// import Modèle from "./pages/admin/Modèle";
// import VoitureUpdate from "./pages/admin/VoitureUpdate";
// import CardVoiture from "./components/form/CardVoiture";
// import FormAuto from "./pages/public/FormAuto";
// import Contact from "./pages/public/Contact";
// import Shop from "./pages/public/Shop";

import fire from "./firebase";
import { LOGGED_IN_USER } from "./JS/constants/actionTypes";
import { useDispatch } from "react-redux";
import { currentUser } from "./JS/actions/authaction";
import { LoadingOutlined } from "@ant-design/icons";

const Home = lazy(() => import("./pages/public/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Header = lazy(() => import("./components/nav/Header"));
const Footer = lazy(() => import("./components/nav/Footer"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Marque = lazy(() => import("./pages/admin/Marque"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Modèle = lazy(() => import("./pages/admin/Modèle"));
const VoitureUpdate = lazy(() => import("./pages/admin/VoitureUpdate"));
const CardVoiture = lazy(() => import("./components/form/CardVoiture"));
const FormAuto = lazy(() => import("./pages/public/FormAuto"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Shop = lazy(() => import("./pages/public/Shop"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        currentUser(idTokenResult.token)
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
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ React Redux App __ AUTO~F
          <LoadingOutlined />
          UR~SELL __
        </div>
      }
    >
      <Header />
      <ToastContainer />
      <div className="row mt-3" style={{ minHeight: "80vh" }}>
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot/password" component={ForgotPassword} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/formauto" component={FormAuto} />
            <Route exact path="/voiture/:_id" component={CardVoiture} />
            <Route exact path="/contact" component={Contact} />
            <AdminRoute exact path="/marque" component={Marque} />
            <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
            <AdminRoute exact path="/modele" component={Modèle} />
            <AdminRoute
              exact
              path="/admin/dashboard/:_id"
              component={VoitureUpdate}
            />
          </Switch>
        </div>
        <div className="col-md-1"></div>
      </div>
      <Footer />
    </Suspense>
  );
};

export default App;
