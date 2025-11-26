import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;
const fadeMeshes = (group, opacity) => {
	if (!group) return;
	group.traverse((child) => {
		if (child.isMesh) {
			child.material.transparent = true;
			gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
		}
	});
};
const moveGroup = (group, x) => {
	if (!group) return;
	gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};
const ModelSwitcher = ({ scale, isMobile }) => {
	const smallMacookRef = useRef();
	const largeMacookRef = useRef();
	const SCALE_LARGE_DESKTOP = 0.08;
	const SCALE_LARGE_MOBILE = 0.05;
	const showLargeMacbook = scale ===SCALE_LARGE_DESKTOP|| scale == SCALE_LARGE_MOBILE;
	useGSAP(() => {
		if (showLargeMacbook) {
			moveGroup(smallMacookRef.current, -OFFSET_DISTANCE);
			moveGroup(largeMacookRef.current, 0);
			fadeMeshes(smallMacookRef.current, 0);
			fadeMeshes(largeMacookRef.current, 1);
		} else {
			moveGroup(smallMacookRef.current, 0);
			moveGroup(largeMacookRef.current, OFFSET_DISTANCE);
			fadeMeshes(smallMacookRef.current, 1);
			fadeMeshes(largeMacookRef.current, 0);
		}
	}, [scale]);
	let controlsConfig = {
		snap: true,
		speed: 1,
		zoom: 1,
		polar: [-Math.PI, Math.PI],
		azimuth: [-Infinity, Infinity],
		config: {
			mass: 1,
			tension: 0,
			friction: 26,
		},
	};
	return (
		<>
			<PresentationControls {...controlsConfig}>
				<group ref={largeMacookRef}>
					<MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
				</group>
			</PresentationControls>
			<PresentationControls>
				<group ref={smallMacookRef} {...controlsConfig}>
					<MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
				</group>
			</PresentationControls>
		</>
	);
};

export default ModelSwitcher;
