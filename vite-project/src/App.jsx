import { useState } from 'react';
import Header from "./component/Header";
import Category from "./component/Category";
import CategorySlider from './pages/CategorySlider';
import TopRest from "./pages/TopRest";
import OnlineDelivery from "./pages/OnlineDelivery";
import Loader from "./component/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Category setLoading={setLoading} />
      <CategorySlider/>
      <TopRest />
      <OnlineDelivery />
    </>
  );
}

export default App;