import React from "react";

const faqs = [
	{
		question: "Czym jest destylacja alkoholu?",
		answer:
			"Destylacja to proces oddzielania składników mieszaniny na podstawie różnic w temperaturze wrzenia. W przypadku alkoholu pozwala uzyskać czystszy i mocniejszy trunek.",
	},
	{
		question: "Jak bezpiecznie przechowywać domowe alkohole?",
		answer:
			"Domowe alkohole należy przechowywać w szczelnie zamkniętych, czystych butelkach, z dala od światła i źródeł ciepła.",
	},
	{
		question: "Jakie są najpopularniejsze rodzaje alkoholi domowych?",
		answer:
			"Najczęściej spotykane to nalewki, wina owocowe, piwa domowe oraz destylaty takie jak bimber czy whisky.",
	},
	{
		question: "Czy produkcja alkoholu w domu jest legalna?",
		answer:
			"W Polsce produkcja alkoholu na własny użytek jest nielegalna, z wyjątkiem piwa i wina. Przed rozpoczęciem produkcji warto zapoznać się z obowiązującym prawem.",
	},
	{
		question: "Jak poprawić smak domowego alkoholu?",
		answer:
			"Na smak wpływa jakość składników, czystość sprzętu oraz odpowiedni czas leżakowania. Warto eksperymentować z dodatkami, np. owocami, przyprawami czy drewnem.",
	},
];

const KacikKonesera: React.FC = () => {
	return (
		<div className="max-w-2xl mx-auto p-8 bg-black rounded-lg shadow-lg border-4 border-orange-500 mt-8">
			<h1 className="text-3xl font-bold text-White-500 mb-6 text-center">
				FAQ o Alkoholach
			</h1>
			<div className="space-y-6">
				{faqs.map((faq, idx) => (
					<div key={idx} className="bg-gray-900 rounded p-4">
						<h2 className="text-xl text-White-400 font-semibold mb-2">
							{faq.question}
						</h2>
						<p className="text-gray-200">{faq.answer}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default KacikKonesera;