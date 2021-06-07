import Header from "../components/header";
import Map from "../components/map";
import "./app.css";

export const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-wrapper__content-container">
        <Map />
      </div>
    </div>
  );
};
