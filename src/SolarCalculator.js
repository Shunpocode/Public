export const SolarCalculator = function (elem) {
    var host = "https://test.webkiev.com";
    this.parent = elem;
    this.form = document.createElement("form");
    this.form.id = "SolarCalcApiForm";
    (async () => {
        this.form.innerHTML = await fetch(`${host}/api/calc/html`).then((data) => data.text());
        this.solarResponse = this.form.querySelector("#solarResponse");
        this.parent.append(this.form);
    })();
    this.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        var formData = new FormData(this.form);
        if (!Number(formData.get("value"))) {
            this.form.querySelector("#CalcInputs")?.setAttribute("errValue", "");
            setTimeout(() => {
                this.form.querySelector("#CalcInputs")?.removeAttribute("errValue");
            }, 150);
            return;
        }
        this.solarResponse.innerHTML = await fetch(`${host}/api/calc/?value=${formData.get("value")}&type=${formData.get("type")}`).then((data) => data.text());
    });
};
//# sourceMappingURL=SolarCalculator.js.map