import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Showcase from "./components/Showcase";
gsap.registerPlugin(ScrollTrigger);
const App = () => {
	return (
		<main>
			<Navbar />
			<Hero />
			<ProductViewer />
			<Showcase />
		</main>
	);
};

export default App;
