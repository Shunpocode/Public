interface ISolarCalculator {
  /**
   * Родитель для элемента формы и ответа из неё
   */
  parent: HTMLElement;
  form: HTMLFormElement;
  solarResponse: HTMLElement;
  value: string;
}

interface SolarCalculatorConstructor {
  new (parent: HTMLElement): ISolarCalculator;
}

export const SolarCalculator: SolarCalculatorConstructor = function (
  this: ISolarCalculator,
  elem: HTMLElement
) {
  var host = "https://test.webkiev.com";
  this.parent = elem;
  this.form = document.createElement("form");
  this.form.id = "SolarCalcApiForm";

  (async () => {
    this.form.innerHTML = await fetch(`${host}/api/calc/html`).then((data) =>
      data.text()
    );
    this.solarResponse = this.form.querySelector(
      "#solarResponse"
    ) as HTMLElement;
    this.parent.append(this.form);
  })();
  this.form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    var formData = new FormData(this.form);
    if (!Number(formData.get("value"))) {
      this.form.querySelector("#CalcInputs")?.setAttribute("errValue", "");
      setTimeout(() => {
        this.form.querySelector("#CalcInputs")?.removeAttribute("errValue");
      }, 150);
      return;
    }
    this.solarResponse.innerHTML = await fetch(
      `${host}/api/calc/?value=${formData.get("value")}&type=${formData.get(
        "type"
      )}`
    ).then((data) => data.text());
  });
} as any;
