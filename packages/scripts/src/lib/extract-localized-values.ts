const langCodeDictionary: any = {
	"DE-DE": "de",
	"EN-US": "en",
	"ES-ES": "es",
	"FR-FR": "fr",
	"KO-KR": "ko",
	"PL-PL": "pl",
	"PT-BR": "pt",
	"RU-RU": "ru",
	"ZH-CN": "zh",
};

export default (tuv: any) =>
	Object.fromEntries(
		new Map(
			tuv.map((obj: any) => [langCodeDictionary[obj["@xml:lang"]], obj.seg])
		)
	);
