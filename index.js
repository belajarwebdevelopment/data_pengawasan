function pilihKelurahanHandle() {
	document.getElementById("kelurahan").addEventListener("change",function() {
		console.log(this.value);
	});
}

(async function main() {
	let api = "https://script.google.com/macros/s/AKfycbxxWf-43TUg5XvBOes_r89pANhi6fCOQgqhF_SwEmjJMWSIvv9BSDEsX2ZCpUGQDMRg/exec";

	let str = `<select id="kelurahan" class="minimalist-orange-select">`;
	await fetch(api).then(response => response.json()).then(data => {
		
		data.data.forEach((el,idx) => {
			idx === 0 ? str += `<option value="">Pilih Kelurahan</option>` : str += `<option value="${el[0]}">${el[0]}</option>`;
			
		});
	});

	str += `</select>`;

	document.querySelector(".sub-header").innerHTML = `Kelurahan ${str}`;

	pilihKelurahanHandle();



})();