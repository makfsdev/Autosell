import React, { useEffect, useState } from "react";
import magasin from "../../magasin.png";
import { Button, Pagination } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import ReactTypingEffect from "react-typing-effect";
import Icons from "../../components/Icons";
import ListeMarque from "../../components/marque/ListeMarque";
import smile from "../../image marque voiture/cars-pic/design/smile.jpg";
import { getVoitures, getVoituresCount } from "../../JS/actions/voiture";
import VoitureCard from "../../components/form/VoitureCard";
import car from "../../image marque voiture/cars-pic/design/car-icon.png";

const Home = ({ history }) => {
  const [voitures, setVoitures] = useState([]);
  const [voituresCount, setVoituresCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadVoitures();
  }, [page]);
  useEffect(() => {
    getVoituresCount().then((res) => setVoituresCount(res.data));
  }, []);

  const loadVoitures = () => {
    getVoitures(true, "createdAt", "desc", page)
      .then((res) => {
        setVoitures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row mt-3 mb-3 p-3" style={{ backgroundColor: "#2d576f" }}>
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <ReactTypingEffect
            speed={100}
            eraseSpeed={100}
            typingDelay={1000}
            cursor={
              <img
                src={car}
                alt="icon"
                style={{
                  width: "150px",
                  height: "50px",
                  objectFit: "cover",
                  transform: "scale(1.9)",
                }}
              />
            }
            text={[
              "Évaluation Gratuite De Votre Voiture",
              "Estimation De Prix Par Nos Experts!!",
            ]}
            cursorRenderer={(cursor) => <h1>{cursor}</h1>}
            displayTextRenderer={(text, i) => {
              return (
                <h1>
                  {text.split("").map((char, i) => {
                    const key = `${i}`;
                    return (
                      <span
                        key={key}
                        style={
                          i % 2 === 0
                            ? { color: "#e87524" }
                            : { color: "white" }
                        }
                      >
                        {char}
                      </span>
                    );
                  })}
                </h1>
              );
            }}
          />
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="vision mt-3 mb-3">
        <img src={magasin} alt="magasin" />
        <Button
          className="btn-vision"
          onClick={() => history.push("/formauto")}
        >
          Estimer gratuitement <PlayCircleOutlined style={{ float: "right" }} />
        </Button>
      </div>
      <hr />
      <Icons />
      <hr />
      <div className="row smile">
        <img src={smile} alt="smile" />
        <Button className="btn-smile" onClick={() => history.push("/shop")}>
          Acheter au meilleur prix{" "}
          <PlayCircleOutlined style={{ float: "right" }} />
        </Button>
      </div>
      <div className="fluid  ">
        <hr />
        <div className="row card-container">
          {voitures.map((v) => (
            <div className="card" key={v._id}>
              <VoitureCard voiture={v} />
            </div>
          ))}
        </div>
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center p-3">
            <Pagination
              current={page}
              total={(voituresCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>

        <hr />
      </div>
      <ListeMarque />
      <hr />
    </>
  );
};

export default Home;
