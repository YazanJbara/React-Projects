import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CiteiesContext";

function CityList() {
  const {cities , isLodaing} = useCities();
  if (isLodaing) return <Spinner />;

  if(!cities.length) return <Message message="Add your First city by clicking on a city on the map "/>

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
