let kelurahan = '';

function pilihKelurahanHandler() {
	document.getElementById("kelurahan").addEventListener("change",function() {
		
		kelurahan = this.value;
	});
}

function clickTombolHandler() {
	document.querySelectorAll('.btn').forEach(btn => {
		btn.addEventListener("click", async function() {
			
			this.textContent = `Sending request .... please wait.`;
			this.style.backgroundColor = "#888";

			await getDataWtu_or_koordinat(this.id);
			
			this.id === "wtu" ? this.textContent = `UNDUH DATA WTU` : this.textContent = `UNDUH DATA KOORDINAT`;
			this.id === "wtu" ? this.style.backgroundColor = "#b3cc33" : this.style.backgroundColor = "#34495e";
		});
	});
}

function closeTemplate() {
	document.getElementById("tutup").addEventListener("click", () => {
		document.querySelector(".dataTemplate").style.display = "none";
	});
}


function dataTemplateOpen(judul) {
	document.getElementById("seeData").addEventListener("click", () => {
		document.querySelector(".dataTemplate").style.display = "block";
		document.getElementById("judul").innerHTML = `${judul} <div class="hero-buttons"><a href="#" class="btn green" id="update">UPDATE SELECTED DATA</a></div>`;
		closeTemplate();
		updateBtnHandler();
	});
}

function cekAllHandler() {
	document.getElementById("selectAll").addEventListener("change", function() {
		let status;

		this.checked ? status = true : status = false;

		document.querySelectorAll(".itemCek").forEach((el) => {
			el.checked = status;
		});
	});
}

/*
function trClickHandler() {
	document.querySelectorAll(".items").forEach(item => {
		item.addEventListener("click", function() {
			//console.log(this.id);
			let checkbox = document.getElementById(`cek${this.id}`);
			checkbox.checked = !checkbox.checked;

			checkbox.checked ? checkbox.checked = true : checkbox.checked = false;
		});
	});
}
*/

function trClickHandler() {
	document.querySelectorAll(".items").forEach(item => {
		item.forEach(elem => {
			elem.addEventListener("click", function() {
				console.log(this.className);
				/*
				let checkbox = document.getElementById(`cek${this.id}`);
				checkbox.checked = !checkbox.checked;

				checkbox.checked ? checkbox.checked = true : checkbox.checked = false;
				*/
			});		

		});
	});
}

function updateBtnHandler() {
	
	document.getElementById("update").addEventListener("click", () => {
		let checkedArr = [];

		document.querySelectorAll(".itemCek").forEach(item => {
			let parent = item.parentElement.parentElement
			item.checked ? checkedArr.push([item.value, parent.children[3].textContent, parent.children[10].children[0].value]) : '';
		});

		console.log(checkedArr);
	});

}


function pilihOpsi(val) {
	const opsi = ["", "SAH", "BATAL"];
	let str = `<select>`;

	for (let i in opsi) {
		if (i === val) {
			str += `<option value=${i} selected>${i}</option>`;
		} else {
			str += `<option value=${i}>${i}</option>`;
		}
	}

	str += `</select>`;

	return str;
}


async function getDataWtu_or_koordinat(menu) {
	//let api = "https://script.google.com/macros/s/AKfycbxMcX8HycMduVzPOTb3kRJxJ-dOxKslvqHfKtkWd7BgHr2FWVFSM_nHmzI57ks5Fuk0/exec";
	let api = "https://script.google.com/macros/s/AKfycbxXxh8VxpYZqDZvw1KCJBUKVQkDeDAvlcxEf2X9pSWMO0FFJBLBCrymTnu3V4LLBBT3/exec";

	let box = document.querySelector(".downloadBox");
	box.style.display = "none";
	let strTable = ``;
	
	await fetch(`${api}?kelurahan=${kelurahan}&menu=${menu}`,{
		method : 'POST'
	}).then(data => data.json()).then(data => {
		console.log(data.datas);

		box.style.display = "block";
		box.innerHTML = `
			<a href="${data.downloadUrl}" class="linkdl" target="_blank">Click to download -> ${menu}_${kelurahan}.csv</a><br>
			<a href=# class="linkdl" id="seeData">See The Datascsv</a>
		`;

		dataTemplateOpen(`Data ${menu} Kelurahan ${kelurahan}`);

		data.datas.forEach((item,id) => {
			strTable += `
				<tr>
					<td>${item[0]} <input type="checkbox" class="itemCek" id="cek${id}" name="cek${id}" value="${item[0]}"></td>
					<td class="item ${id}">${item[1]}</td>
					<td class="item ${id}">${item[2]}</td>
					<td class="item ${id}">${item[3]}</td>
					<td class="item ${id}">${item[4]}</td>
					<td class="item ${id}">${item[5]}</td>
					<td class="item ${id}">${item[6]}</td>
					<td class="item ${id}">${item[7]}</td>
					<td class="item ${id}">${item[8]}</td>
					<td class="item ${id}">${item[9]}</td>
					<td>${item[10] === "CC" ? '<select><option value="" selected></option><option value="SAH">SAH</option><option value="BATAL">BATAL</option></select>' : pilihOpsi(val)}</td>
					<td class="item ${id}">${item[11]}</td>
					<td class="item ${id}">${item[12]}</td>
				</tr>
			`;
		});
		document.getElementById('tableBody').innerHTML = strTable;
		cekAllHandler();
		trClickHandler();
	});
	
}


(async function main() {
	let api = "https://script.google.com/macros/s/AKfycbxxWf-43TUg5XvBOes_r89pANhi6fCOQgqhF_SwEmjJMWSIvv9BSDEsX2ZCpUGQDMRg/exec";

	let str = `
	    <div class="select-wrapper">
	        <div class="select-container">
	            <select id="kelurahan" class="styled-select">
    `;


	await fetch(api).then(response => response.json()).then(data => {
		
		data.data.forEach((el,idx) => {
			idx === 0 ? str += `<option value="">Pilih Kelurahan</option>` : str += `<option value="${el[0]}">${el[0]}</option>`;
			
		});
	});

	str += `	</select>
	        </div>
   		</div>
   	`;

	document.querySelector(".sub-header").innerHTML = `${str}`;

	pilihKelurahanHandler();
	clickTombolHandler();



})();