import "../styles/globals.css";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { VotingProvider } from "../context/Voter";
import NavBar from "../components/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  // The landing page (/) has its own NavBar rendered inside landing.jsx
  // All other pages use the global NavBar from _app.js
  const isLandingPage = router.pathname === "/";

  return (
    <VotingProvider>
      <div>
        {!isLandingPage && <NavBar />}
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </VotingProvider>
  );
};

export default MyApp;
