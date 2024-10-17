const input = document.querySelector("#search")
const searchBtn = document.querySelector(".search")
const result = document.querySelector(".result")
const temp = document.querySelector(".temp")
const loc = document.querySelector(".loc")
const desc = document.querySelector(".description")

async function getWeather(location) {
	try {
		let response = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=UHZX76YK7CG8YKR5JACFNGS2X`
		)
		let data = await response.json()

		const tempF = data.currentConditions.temp
		const tempC = Math.round(((tempF - 32) * 5) / 9)
		const description = data.description
		const completeAddress = data.resolvedAddress

		const weather = {
			completeAddress,
			description,
			tempF,
			tempC,
		}

		return weather
	} catch {
		result.classList.remove("hidden")
		desc.textContent = "Not found."
	}
}

searchBtn.addEventListener("click", async (e) => {
	const searchValue = input.value

	if (searchValue.length >= 3) {
		e.preventDefault()
		input.value = ""
		const { completeAddress, description, tempF, tempC } = await getWeather(
			searchValue
		)
		temp.textContent = `${tempF}°F | ${tempC}°C`
		loc.textContent = completeAddress
		desc.textContent = description

		result.classList.remove("hidden")
	}
})
