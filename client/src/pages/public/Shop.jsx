import React, { useEffect, useState } from "react";
import { getVoituresByValidationCount } from "../../JS/actions/voiture";
import Loading from "../../components/nav/Loading";
import { EyeOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card } from "antd";

const Shop = () => {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVoitures();
  }, []);

  const loadVoitures = async () => {
    setLoading(true);
    await getVoituresByValidationCount(true, 12).then((res) => {
      setVoitures(res.data);
      setLoading(false);
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
          {voitures.map((v) => (
            <div className="row pt-4" key={v._id}>
              <div className="col-md-4">
                <Card className="card-image">
                  <h4
                    className="p-3 bg-light"
                    style={{
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textAlign: "center",
                      width: "280px",
                    }}
                  >
                    {v.marque + "~~" + v.modèle}
                  </h4>

                  {v.images && (
                    <img
                      alt="img"
                      src={v.images[0].url}
                      key={v.images[0].public_id}
                      style={{ width: "280px", height: "180px" }}
                    />
                  )}
                </Card>
              </div>
              <div className="col-md-8">
                <Card
                  style={{ fontSize: "16px", color: "#186291" }}
                  className="mb-3 card-image"
                  actions={[
                    <Link style={{ color: "green" }} to="/contact">
                      <PhoneOutlined /> <br /> Contacter
                    </Link>,
                    <Link className="text-info" to={`/voiture/${v._id}`}>
                      <EyeOutlined /> <br /> Voir Plus
                    </Link>,
                  ]}
                >
                  <ul className="list-group">
                    <li
                      className=" bg-light list-group-item d-flex justify-content-between align-items-center"
                      style={{
                        fontWeight: "600",
                        color: "black",
                        letterSpacing: "0.2em",
                      }}
                    >
                      Prix{" "}
                      <span className="label label-default label-pill pull-xs-right ">
                        € {v.prix}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Kilométrage{" "}
                      <span className="label label-default label-pill pull-xs-right ">
                        KM {v.kilométrage}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Type Moteur{" "}
                      <span className="label label-default label-pill pull-xs-right ">
                        {v.motorisation}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Modèle{" "}
                      <span className="label label-default label-pill pull-xs-right ">
                        {v.année}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Version{" "}
                      <span className="label label-default label-pill pull-xs-right ">
                        {v.version}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Carrosserie{" "}
                      <span className="label label-default label-pill pull-xs-right ">
                        {v.carrosserie}
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col text-center pt-5 pb-5">
              <hr />
              <h4>MORE DESIGN</h4>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
