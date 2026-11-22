import { useState } from "react"
import "./App.css"

const App = () => {
	const [dnaOligo, setDnaOligo] = useState("");	
	
	const [molarConcentration, setMolarConcentration] = useState("");
	
	const [meltingTemperature, setMeltingTemperature] = useState("--");
	
	const [gibbsFreeEnergy, setGibbsFreeEnergy] = useState("--");
	
	const [gcContent, setGcContent] = useState("--");
	
	const calculateDnaOligoProperties = () => {
		const dnaOligoLength = dnaOligo.length;
		
		const dnaOligoRegex = /^[atgc]*$/i;
		
		const idealGasConstant = 1.987;
		
		let enthalpy = 0;
		
		let entropy = 0;
		
		let gibbsFreeEnergyValue = 0;
		
		if(!dnaOligoRegex.test(dnaOligo)) {
			alert("DNA oligo must contain only the letters A, T, G or C.");
			
			return;
		}
		else if(molarConcentration < 0) {
			alert("Molar concentration must be at least 0.");
			
			return;
		}
		else if(dnaOligoLength < 2) {
			alert("DNA oligo must have a length of at least 2.");
			
			return;
		}
		
		for(let i = 2; i <= dnaOligoLength; ++i) {
			switch(dnaOligo.substring(i - 2, i)) {
				case "AA":
				case "TT":
					enthalpy -= 7.9;
					
					entropy -= 22.2;
					
					gibbsFreeEnergyValue -= 1.00;
					
					break;
				case "AT":
					enthalpy -= 7.2;
					
					entropy -= 20.4;
					
					gibbsFreeEnergyValue -= 0.88;
					
					break;
				case "TA":
					enthalpy -= 7.2;
					
					entropy -= 21.3;
					
					gibbsFreeEnergyValue -= 0.58;
					
					break;
				case "TG":
				case "CA":
					enthalpy -= 8.5;
					
					entropy -= 22.7;
					
					gibbsFreeEnergyValue -= 1.45;
					
					break;
				case "AC":
				case "GT":
					enthalpy -= 8.4;
					
					entropy -= 22.4;
					
					gibbsFreeEnergyValue -= 1.44;
					
					break;
				case "AG":
				case "CT":
					enthalpy -= 7.8;
					
					entropy -= 21.0;
					
					gibbsFreeEnergyValue -= 1.28;
					
					break;
				case "TC":
				case "GA":
					enthalpy -= 8.2;
					
					entropy -= 22.2;
					
					gibbsFreeEnergyValue -= 1.30;
					
					break;
				case "CG":
					enthalpy -= 10.6;
					
					entropy -= 27.2;
					
					gibbsFreeEnergyValue -= 2.17;
					
					break;
				case "GC":
					enthalpy -= 9.8;
					
					entropy -= 24.4;
					
					gibbsFreeEnergyValue -= 2.24;
					
					break;
				case "CC":
				case "GG":
					enthalpy -= 8.0;
					
					entropy -= 19.9;
					
					gibbsFreeEnergyValue -= 1.84;
					
					break;
			}
		}
		
		const start = dnaOligo[0];
		
		const end = dnaOligo[dnaOligoLength - 1];
		
		if(start === "A" || start === "T") {
			enthalpy += 2.3;
			
			entropy += 4.1;
			
			gibbsFreeEnergyValue += 1.03;
		}
		else if(start === "G" || start === "C") {
			enthalpy += 0.1;
			
			entropy -= 2.8;
			
			gibbsFreeEnergyValue += 0.98;
		}
		
		if(end === "A" || end === "T") {
			enthalpy += 2.3;
			
			entropy += 4.1;
			
			gibbsFreeEnergyValue += 1.03;
		}
		else if(end === "G" || end === "C") {
			enthalpy += 0.1;
			
			entropy -= 2.8;
			
			gibbsFreeEnergyValue += 0.98;
		}
		
		const meltingTemperatureValue = (1000 * enthalpy) / (entropy + idealGasConstant * Math.log(molarConcentration / 4000000)) - 273.15;
		
		setMeltingTemperature(meltingTemperatureValue.toFixed(3));
		
		setGibbsFreeEnergy(gibbsFreeEnergyValue.toFixed(3));
		
		let gc = 0;
		
		for(let i of dnaOligo) {
			if(i === "C" || i === "G") {
				++gc;
			}
		}
		
		setGcContent((100 * gc / dnaOligoLength).toFixed(3));
	}
	
	return (
		<>
			<h1>DNA Oligo Properties Calculator</h1>
			<div className="input-group">
				<label htmlFor="dna-oligo">DNA Oligo</label>
				<textarea id="dna-oligo" value={dnaOligo} onChange={(e) => setDnaOligo(e.target.value.toUpperCase())} placeholder="Enter DNA oligo (5' → 3')" />
				<label htmlFor="molar-concentration">Molar Concentration</label>
				<input id="molar-concentration" type="number" min="0" step="0.01" value={molarConcentration} onChange={(e) => setMolarConcentration(e.target.value)} placeholder="Enter molar concentration (µM)" />
				<button onClick={calculateDnaOligoProperties}>Calculate</button>
			</div>
			<div>
				<p>Melting temperature: {meltingTemperature} °C</p>
				<p>Gibbs free energy: {gibbsFreeEnergy} kcal/mol</p>
				<p>GC content: {gcContent}%</p>
			</div>
		</>
	)
}

export default App
