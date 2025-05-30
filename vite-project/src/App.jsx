import { useState } from 'react';
import Header from "./component/Header";
import Category from "./component/Category";
import TopRest from "./component/TopRest";
import OnlineDelivery from "./component/OnlineDelivery";
import Loader from "./component/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader />}
      <Header />
      <Category setLoading={setLoading} />
      <TopRest />
      <OnlineDelivery />
    </>
  );
}

export default App;