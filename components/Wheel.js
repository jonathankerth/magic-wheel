"use client";
import { useState } from "react";

export default function Wheel() {
	const segments = 12;
	const [rotation, setRotation] = useState(0);
	const [selectedNumber, setSelectedNumber] = useState(null);
	const [spinning, setSpinning] = useState(false);
	const spinDuration = 4000; // Spin time

	const spinWheel = () => {
		setSpinning(true);
		const spins = Math.floor(Math.random() * 10 + 5) * 360; // Full spins
		const landingSegment = Math.floor(Math.random() * segments); // The landing segment
		const newRotation = spins - (landingSegment * 360) / segments; // Calculate the new rotation
		setRotation(rotation + newRotation);
		setTimeout(() => {
			setSelectedNumber((segments - landingSegment) % segments);
			setSpinning(false);
		}, spinDuration);
	};

	return (
		<div className="flex flex-col items-center">
			{/* Display Selected Number */}
			{selectedNumber !== null && (
				<div className="mb-4 p-2 bg-gray-200 text-black rounded border border-black">
					Selected Number: {selectedNumber + 1}
				</div>
			)}
			<div className="relative w-64 h-64 rounded-full overflow-visible">
				<svg
					className="relative transform transition-transform"
					style={{
						transform: `rotate(${rotation}deg)`,
						transitionDuration: `${spinDuration}ms`,
						transitionTimingFunction: spinning
							? "cubic-bezier(0.23, 1, 0.32, 1)"
							: "unset",
					}}
					viewBox="0 0 200 200"
					width="200"
					height="200"
				>
					{Array.from({ length: segments }, (_, index) => (
						<g key={index}>
							<path
								d={`M 100 100 L ${
									100 + 100 * Math.cos(((2 * Math.PI) / segments) * index)
								} ${
									100 + 100 * Math.sin(((2 * Math.PI) / segments) * index)
								} A 100 100 0 0 1 ${
									100 + 100 * Math.cos(((2 * Math.PI) / segments) * (index + 1))
								} ${
									100 + 100 * Math.sin(((2 * Math.PI) / segments) * (index + 1))
								} Z`}
								fill={
									selectedNumber === index
										? "gold"
										: index % 2 === 0
										? "red"
										: "white"
								}
							/>
							<text
								x={
									100 +
									70 * Math.cos(((2 * Math.PI) / segments) * (index + 0.5))
								}
								y={
									100 +
									70 * Math.sin(((2 * Math.PI) / segments) * (index + 0.5))
								}
								textAnchor="middle"
								fill="black"
								transform={`rotate(${(360 / segments) * index} ${
									100 +
									70 * Math.cos(((2 * Math.PI) / segments) * (index + 0.5))
								} ${
									100 +
									70 * Math.sin(((2 * Math.PI) / segments) * (index + 0.5))
								})`}
							>
								{index + 1}
							</text>
						</g>
					))}
				</svg>
			</div>
			<button
				className="mt-4 p-2 bg-blue-500 text-white rounded"
				onClick={spinWheel}
			>
				Spin the Wheel
			</button>
		</div>
	);
}
