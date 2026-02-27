import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
