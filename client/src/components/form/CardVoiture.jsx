import React, { useEffect, useState } from "react";
import { getVoiture } from "../../JS/actions/voiture";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { PhoneOutlined, EyeOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Loading from "../nav/Loading";

const { TabPane } = Tabs;

const CardVoiture = ({ match }) => {
  const [voiture, setVoiture] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    _id,
    marque,
    modèle,
    année,
    carrosserie,
    motorisation,
    version,
    kilométrage,
    delai,
    prix,
    images,
    autre,
  } = voiture;

  useEffect(() => {
    loadVoiture();
  }, []);

  const loadVoiture = () => {
    setLoading(true);
    getVoiture(match.params._id).then((res) => {
      setLoading(false);
      setVoiture(res.data);
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container-fluide p-3"
          style={{ backgroundColor: "white" }}
        >
          <div className="row pt-4" key={_id}>
            <div className="col-md-7">
              <Carousel showArrows={true} infiniteLoop autoPlay>
                {images &&
                  images.map((i) => (
                    <img alt={i.url} src={i.url} key={i.public_id} />
                  ))}
              </Carousel>
              <Tabs type="card">
                <TabPane tab="Information" key="1">
                  {autre ? autre : ""}
                </TabPane>
                <TabPane tab="Vente" key="2">
                  {delai ? delai : ""}
                </TabPane>
              </Tabs>
            </div>
            <div className="col-md-5">
              <h4
                className="p-3"
                style={{
                  fontWeight: "600",
                  color: "#e87524",
                  backgroundColor: "#186291",
                  letterSpacing: "0.2em",
                  textAlign: "center",
                }}
              >
                {marque + "~~" + modèle}
              </h4>
              <Card
                style={{ fontSize: "18px" }}
                className="mb-3 card-image"
                actions={[
                  <Link style={{ color: "green" }} to="/contact">
                    <PhoneOutlined /> <br /> Contacter
                  </Link>,
                  <Link className="text-info" to="/shop">
                    <EyeOutlined /> <br /> Ajouter au favoris
                  </Link>,
                ]}
              >
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Prix{" "}
                    <span className="label label-default label-pill pull-xs-right ">
                      € {prix}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    kilométrage{" "}
                    <span className="label label-default label-pill pull-xs-right ">
                      KM {kilométrage}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Type Moteur{" "}
                    <span className="label label-default label-pill pull-xs-right ">
                      {motorisation}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Modèle{" "}
                    <span className="label label-default label-pill pull-xs-right ">
                      {année}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Version{" "}
                    <span className="label label-default label-pill pull-xs-right ">
                      {version}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Carrosserie{" "}
                    <span className="label label-default label-pill pull-xs-right ">
                      {carrosserie}
                    </span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
          <div className="row">
            <div className="col text-center pt-5 pb-5"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardVoiture;
