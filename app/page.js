import Head from "next/head";
import Wheel from "../components/Wheel";

export default function Home() {
	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-red-500"
			style={{ backgroundSize: "200% 200%" }}
		>
			<Head>
				<title>Wheel of Fortune</title>
			</Head>

			<Wheel />
		</div>
	);
}
