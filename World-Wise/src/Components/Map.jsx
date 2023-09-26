import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
// Programmatic navigation means to move to an URL without having to click in any click
// we can

function Map() {
  // reading the lat and lng (see CityItem)
 const navigate =  useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
      <h1>
        {" "}
        position : {lat} , {lng}{" "}
      </h1>
    </div>
  );
}

export default Map;
